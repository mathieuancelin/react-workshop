# Etape 3 : SPA et react-router

Maintenant que notre application possède les fonctionnalités de base, nous allons commencer a nous attaquer à la navigation.

En effet pour le moment notre application regroupe toute les foncitonnalités dans une seul et même écran, ce qui s'avère très pratique d'un point de vue technique mais qui n'est pas génial d'un point de vue utilisateur.

Nous allons donc découper notre application en 3 écrans successifs, permettant de choisir la region d'un vin, puis le vin a consulter et enfin la fiche de consultation du vin. Ici chaque sélection entrainera la navigation jusqu'à l'écran suivant, etc ...

Mais comme nous sommes dans un contexte frontend et que nous ne sommes pas la pour coder du backend, nous allons développer tout ca sous forme d'une SPA (single page application).

Une SPA est une application web (front) accessible via une page unique. Le but est d'éviter le chargement d'une nouvelle page à chaque action demandée et donc de fluidifier l'expérience utilisateur.

Il va donc nous falloir un moyen de router l'utilisateur à travers divers écrans.

Un moyen simple pourrait être d'avoir un composant technique au plus haut niveau de notre application pour gérer la navigation. Ce composant gérerait la pile d'appel et la vue courante dans son `state` et proposerai une API pour être piloté depuis les diverses vues.

Par exemple, nous pourrions définir un composant comme suivant :

```javascript
const Navigator = React.createElement({
  propTypes: {
    initialRoute: React.PropTypes.shape(
      component: React.PropTypes.func.isRequired,
      title: React.PropTypes.string,
      props: React.PropTypes.object,
    ).isRequired,
  },
  getInitialState() {
    return {
      component: null,
      title: null,
      props: null,
    };
  },
  componentDidMount() {
    this.setState({
      component: this.props.initialRoute.component,
      title: this.props.initialRoute.title,
      props: this.props.initialRoute.props,
    });
  },
  navigateTo({ component, title, props }) {
    this.setState({ component, title, props });
  },
  render() {
    const Component = this.state.component;
    const { title, props } = this.state;
    return (
      <Component
        {...props}
        navTitle={title}
        navigator={{ navigateTo: this.navigateTo }} />
    );
  }
});

const Page2 = React.createElement({
  ...
});

const Page1 = React.createElement({
  gotoNext() {
    this.props.navigator.navigateTo({
      title: 'Page 2',
      component: Page2,
      props: {
        foo: 'bar',
      },
    });
  },
  render() {
    return (
      <div>
        <h2>Hello World!</h2>
        <button onClick={this.gotoNext}>Next</button>
      </div>
    );
  }
});

ReactDOM.render(
  <Navigator initialRoute= {{ title: 'Page 1', component: Page1 }} />,
  document.getElementById('main')
);
```

Cependant, ce genre d'approche a l'inconvénient de perdre la navigation courante lorsque l'on recharge la page. Du coup il existe de meilleures solutions, notamment, [React Router](https://github.com/reactjs/react-router) que nous allons utiliser pour gérer la navigation de notre application.

Commençons par ajouter une dépendance pour `react-router` dans l'application.

Dans le fichier `package.json` ajoutez la dépendance suivante :

```json
"dependencies": {
    ...
    "react-router": "^2.0.1",
    ...
}
```

vous pouvez évidemment l'ajouter via la ligner de commande :

```
npm install --save react-router
```

Maintenant nous pouvons commencer l'intégration du router. Pour ce faire, commençons par lire [l'introduction](https://github.com/reactjs/react-router/blob/master/docs/Introduction.md) à `react-router` puis importont les APIs dans `app.js`

```javascript
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
```

l'initialisation du routeur se fera de la façon suivante :

```javascript
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import NotFound from './components/not-found';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={???}>
      <IndexRoute component={???} />
      ...
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('main')
);
```

Ici nous configurons le routeur pour utiliser les ancres du navigateur comme URL de routage côté client

```javascript
<Router history={hashHistory}> ... </Router>
```

puis nous spécifions un container qui aura le role d'afficher la vue courante du router et qui sera le point d'entrée de l'application.

```javascript
<Route path="/" component={???}> ... </Route>
```

D'après le tutorial de `react-router`, ce genre de composant peut s'écrire de la façon suivante :

```javascript
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    )
  }
});
```

ensuite nous spécifions la vue à afficher sur pour une navigation vers `/`
```javascript
<IndexRoute component={???} />
```

et enfin nous spécifions une route permettant d'attraper tous les appels n'ayant pu être routés

```javascript
<Route path="*" component={NotFound} />
```

Pour notre application, nous vous proposons de respecter les schéma d'url suivant :

* / => vue des régions
* /regions/:regionId => vue des vins de la région
* /regions/:regionId/wines/:wineId => vue du vin selectionné

Ce routage est défini dans le routeur via l'utilisation du composant

```javascript
<Route path="/mon/path" component={MonComponent} />
```

Pour passer des paramètres aux routes et les récupérer, vous pouvez déclarer vos routes comme ceci

```javascript
<Route path="/mon/path/:monId" component={MonComponent} />

const MonComponent = React.createClass({
  render() {
    return (
      <div>Valeur de monId: {this.props.params.monId}</div>
    );
  }
})
```

enfin vous pouvez créer des liens en utilisant l'API

```javascript
<Link to="/mon/path/1234">Chose 1234</Link>
```

de `react-router`

A vous de jouer ;-)
