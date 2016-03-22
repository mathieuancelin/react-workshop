# Step 5 : redux

dans cette étape, nous allons intégrer [Redux](http://redux.js.org/index.html) a notre magnifique application.

[Redux](http://redux.js.org/index.html) est un container d'état global pour des applications JavaScript.
Redux peut être utilisé dans n'importe quel environnement et ne dépend pas de React. Redux possède quelques
propriétés très intéressantes en matière de cohérence, de prévisibilité et d'expérience du développeur.

Redux peut être vu comme une implémentation du [pattern Flux](https://facebook.github.io/flux/docs/overview.html) avec cependant quelques variations, notamment au niveau de la complexité de mise en place bien moindre que Flux. Redux s'inspire également de patterns propre au langage Elm

Redux fourni un concept de `store` de données unique pour l'application (singleton), auquel nos composants vont s'abonner. Il est ensuite possible de dispatcher des `actions` sur ce `store` qui déclencheront une mutation de l'état contenu dans le `store`. Une fois la mutation effectuée, le `store` notifiera tous ses abonnés du changement d'état. L'intérêt d'un tel pattern devient évident lorsqu'une application grossit et que plusieurs composants React ont besoin d'une même source de données. Il est alors plus simple de gérer l'état `fonctionnel` de l'application en dehors des composants et de s'y abonner.

Pour fonctionner Redux utilise une notion de `reducer` qui fonctionne exactement de la même facon qu'une fonction de réduction sur une collection. Si on visualise l'état de l'application comme une collection de mutations, le `reducer` est simplement la fonction qui prend en paramètre l'état précédant et retourne le prochain état via un second paramètre qui dans notre cas est une `action`. Un `reducer` est donc une fonction pure avec la signature suivante `(state, action) => state` qui décrit comment une action transforme l'état courant en un nouvel état.

Regardons un exemple simple

```javascript
import { createStore } from 'redux'

/**
 * Ici nous avons un unique reducer qui va gérer un état de type number. On note que l'état initial est fourni
 * on utilise un switch pour gérer les différentes actions, mais ce n'est absolument pas obligatoire
 * A noter qu'il est impératif lors d'une mutation d'état de renvoyer un nouvel état et non l'ancien état muté.
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Ici nous créons un store pour notre application se basant sur le reducer `counter`
// l'API du store est la suivante { subscribe, dispatch, getState }.
let store = createStore(counter)

// Maintenant nous pouvons nous abonner aux modifications de l'état contenu dans le store.
// Un cas d'usage pourrait être un composant react qui veut afficher l'état courant du compteur.
// On note que le nouvel état n'est pas véhiculer dans le callback mais qu'il faut aller le chercher
// directement sur le store.
store.subscribe(() =>
  console.log(store.getState())
)

// Maintenant, le seul moyen de muter l'état interne du store est de lui envoyer une action
store.dispatch({ type: 'INCREMENT' })
// afficher 1 dans la console
store.dispatch({ type: 'INCREMENT' })
// afficher 2 dans la console
store.dispatch({ type: 'DECREMENT' })
// afficher 1 dans la console
```

Il est bien évidemment possible d'avoir plusieurs `reducers`, ou de faire en sorte qu'un reducer ne soit en charge que d'une partie de l'état global, etc ...

Pour plus de détails et explications sur Redux, vous pouvez consulter la [documentation de la librairie](http://redux.js.org/index.html) qui est très bien faite.

## Mise en pratique

Commencez par installer redux et react-redux, dans le fichier `package.json` ajoutez la dépendance suivante :

```json
"dependencies": {
    ...
    "react-redux": "4.4.1",
    "redux": "3.3.1",
    ...
}
```

ou via la ligne de commande

```
npm install --save redux react-redux
```

Dans le cadre de notre application, nous allons afficher des informations statistiques globales concernant notre application. A savoir le nombre global de likes et le nombre global de commentaire. Ces données serons mises a jour en temps réel.

![View 1](https://raw.githubusercontent.com/mathieuancelin/react-workshop/master/step-5/view1.png)

L'état de notre application contenu dans un store `redux` sera le suivant

```json
{
  "comments": 42,
  "likes": 42
}
```

Nous allons donc avoir besoin de deux reducers chacun gérant respectivement le compteur de commentaires et le compteur de likes.

Nous allons également avoir besoin d'actions permettant de muter notre état applicatif.

Globalement, pour chacun des compteur nous avons besoin d'une action initial qui sera lancée après un appel HTTP et qui changera l'état pour lui donner une valeur initiale prevenant du serveur. Ensuite nous aurons besoin d'une action permettant d'incrémenter le compteur et d'une action permettant de décrémenter le compteur.

Vous pouvez maintenant implémenter toutes vos actions dans un fichier `src/actions/index.js` tel que suivant (ici, pour un exemple de compteur classique)

```javascript
export const incrementCounter = () => {
  return {
    type: 'INCREMENT_COUNTER',
    incrementValue: 2
  };
}

export const decrementCounter = () => {
  return {
    type: 'DECREMENT_COUNTER',
    decrementValue: 1
  };
}
```

puis vous pouvez créé vos reducers dans des fichiers respectivement nommés `src/reducers/comments.js` et `src/reducers/likes.js`. Chaque `reducer` gèrera un compteur avec une valeur initiale à 0.

Il s'agit maintenant de créer un `reducer` global, pour cela commencer par créer un fichier `src/reducers/index.js` avec le contenu suivant

```javascript
import { combineReducers } from 'redux';
import comments from './comments';
import likes from './likes';

const reducer = combineReducers({
  comments: comments,
  likes: likes
});

export default reducer;
```

ici la fonction `combineReducers` permet de créer un reducer global à partir de différent reducers responsable de différentes parties de l'état global, dans notre cas `comments` et `likes`.

Il ne nous reste plus qu'à créer le store de notre application, par exemple dans le fichier `src/app.js`.

```javascript
import { createStore } from 'redux';
import app from './reducers';

const store = createStore(app);
```

il ne reste plus qu'a faire deux appels HTTP aux apis

* `http://localhost:3000/api/likes`
* `http://localhost:3000/api/comments`

afin d'initialiser le store avec les bonnes valeurs.


```javascript
import { createStore } from 'redux';
import app from './reducers';
import { setCounterValue } from './actions';

const store = createStore(app);

fetch(`http://localhost:3000/api/count`)
  .then(r => r.json())
  .then(r => store.dispatch(setCounterValue(r.count)));
```

Nous avons maintenant un état global correctement alimenté. Il ne nous reste qu'à le connecter à l'UI

## react-redux

Connecter un composant react à notre est finalement très simple. Il suffit simplement d'abonner le composant au store une fois monté dans le DOM, le désabonner lors de sa disparition du DOM et mettre a jour son état a chaque notification du store

```javascript
const Component = React.createClass({
  propTypes: {
    store: PropTypes.shape({
      subscribe: PropTypes.func,
      getState: PropTypes.func
    })
  },
  getInitialState() {
    return {
      counter: 0
    };
  },
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this.updateViewFromRedux);
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  updateViewFromRedux() {
    const { counter } = this.props.store.getState();
    this.setState({ counter });
  },
  render() {
    return (
      <div>
        <span>counter : {this.state.counter}</span>
      </div>
    );
  }
});
```

Cependant tout ce boilerplate peut se réveler fastidieux et rébarbatif à écrire à la longue.
Pour éviter tout ce code inutile, la librairie `react-redux` permet de fournir un store a un arbre de composants `react` et de connecter un composant `react` a ce store, voir même de mapper automatiquement des propriété de l'état du `store` sur des propriétés du composant.

La première chose a faire et de fournir le store a notre arbre de composants. Nous allons utiliser un composant `<Provider store={...} />` fournit par `react-redux` que nous allons placer a la racine de l'application

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import WineApp from './components/wine-app';
import { RegionsPage } from './components/regions';
import { WineListPage } from './components/wine-list';
import { WinePage } from './components/wine';
import { NotFound } from './components/not-found';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './reducers';

const store = createStore(app);

...

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={WineApp}>
        <IndexRoute component={RegionsPage} />
        <Route path="regions/:regionId" component={WineListPage} />
        <Route path="regions/:regionId/wines/:wineId" component={WinePage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('main')
);
```

Provider va simplement alimenter le context `react` avec un champ `store`. (pour plus de détails sur le contexte `react`, voir [https://facebook.github.io/react/docs/context.html](https://facebook.github.io/react/docs/context.html))

Il faut maintenant être capable de récupérer le store dans un composant afin de pouvoir

* dispatcher des actions
* récupérer l'état du store

Pour celà, `redux` propose une fonction `connect` permettant de créer un composant wrapper (Higher Order Component) qui fera le lien entre le store présent dans le contexte `react` et le componsant wrappé.

```javascript
import { incrementCounter } from '../actions';
import { connect } from 'react-redux';

const SimpleComponent = React.createElement({
  propTypes: {
    dispatch: PropTypes.func
  },
  handleButtonClick() {
    dispatch(incrementCounter(42));
  },
  render() {
    ...
  }
});

export const ConnectedToStoreComponent = connect()(SimpleComponent);
```

ici le fait d'appeler `connect` avec le composant original en paramètre créé une nouvelle classe de composant comportant la logique d'abonnement et mise a jour du composant nécessaire à `redux`. Lorsque `connect` est appelé sans premier argument, le composant wrappé se voit ajouté une propriété `dispatch` permettant de dispatcher une action sur le store.

Cependant ici, pas moyen de récupérer l'état du store. Pour ce faire, il est nécessaire de spécifier une fonction de mapping permettant d'extraire un ensemble de propriété depuis l'état du store `redux` avec quelles soient ajoutées aux propriétés du composant wrappé

```javascript
import { incrementCounter } from '../actions';
import { connect } from 'react-redux';

const SimpleComponent = React.createElement({
  propTypes: {
    dispatch: PropTypes.func,
    simpleCounter: PropTypes.number
  },
  handleButtonClick() {
    dispatch(incrementCounter(42));
  },
  render() {
    return <div>{this.props.counter}</div>
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    simpleCounter: state.counter
  }
};

export const ConnectedToStoreComponent = connect(mapStateToProps)(SimpleComponent);
```

Il ne nous reste donc plus qu'a émettre les différentes actions aus bons moment pour muter l'état de notre `store` (ajout de commentaire, ajout de like, retrait de like) et de rajouter un composant global (dans `<WineApp>` par exemple) affichant le nombre global de likes et de commentaires dans l'application.

A vous de jouer ;-)
