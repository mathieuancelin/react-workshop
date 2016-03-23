# Etape 1 - Testing

## Pré-requis

L'étape 0 du workshop a permis de développer un composant React basique `Wine` :

```javascript
const Wine = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  render() {
    return (
      <div style={WineStyle}>
          {this.props.name}
      </div>
    );
  }
});
```

Le code disponible ici correspond au résultat attendu de l'étape 0. L'objectif de l'étape 1 est de le compléter pour ajouter le test unitaire du composant `Wine`.

Pour lancer l'application de l'étape 0, exécutez la commande `npm start` (après avoir fait un `npm install`). Ouvrez ensuite l'URL http://localhost:8080 dans votre navigateur.

## Test unitaire

Les tests unitaires sont primordiaux dans le développement. Ils ne doivent en aucun cas être négligés, c'est pourquoi nous les introduisons dès le début du workshop.

L'objectif est de mettre en place le test unitaire du composant `Wine`. Pour cela, nous allons nous appuyer sur les librairies suivantes :

* [react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html) : addon React facilitant les tests de composants React.
* [jsdom](https://github.com/tmpvar/jsdom) : librairie implémentant les standards DOM et HTML, qui permettra de créer un document HTML dans lequel faire le rendu des componsants à tester.
* [Chai](http://chaijs.com/) : librairie d'assertions, orientée BDD/TDD.
* [Mocha](http://mochajs.org/) : framework Javascript de tests unitaires.
* [babel-register](https://babeljs.io/docs/setup/#mocha) : permet d'utiliser Babel lors de l'exécution des tests avec Mocha.

Commencez par ajouter ces librairies au fichier package.json :

```json
"devDependencies": {
    "babel-register": "6.3.13",
    "jsdom": "7.2.0",
    "mocha": "2.3.4",
    "chai": "3.4.1",
    "react-addons-test-utils": "0.14.3"
}
```

vous pouvez évidemment les ajouter via la ligner de commande :

```
npm install --save-dev babel-register jsdom mocha chai react-addons-test-utils
```

Ajoutez la configuration nécessaire à `babel-register` dans le fichier `.babelrc` :

```json
{
  "presets": ["es2015", "react"]
}
```

Cette configuration est globale pour babel et sera utilisée si aucune autre configuration n'est passée aux outils babel. Ainsi vous pouvez enlever la partie configuration du `babel-loader` dans `webpack.config.js` afin que tous vos outils utilisent la même configuration babel.


Créez un dossier `tests` dédiés aux tests unitaires de vos composants. Ecrivez ensuite le test du composant `Wine` dans un fichier `wine.spec.js`, en utilisant :

* la syntaxe Mocha pour décrire le test,
* ReactTestUtils pour effectuer le rendu et parcourir l'arbre DOM du composant `Wine`,
* Chai pour vérifier le texte affiché.

```javascript
import React from 'react';
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

import Wine from '../../src/components/wine';

describe('Wine', () => {
  it('affiche le nom du vin', () => {
    const wine = ReactTestUtils.renderIntoDocument(<Wine name="Un bon Bourgogne" />);
    const div = ReactTestUtils.findRenderedDOMComponentWithTag(wine, 'div');
    expect(div.textContent).to.be.equal('Un bon Bourgogne');
  });
});
```

Pour s'exécuter correctement, le test précédent nécessite de disposer globalement des objets `window` et `window.document`, ainsi que de la fonction `window.document.createElement`.
Pour cela, créez un fichier `bootstrap.js` qui se base sur la librairie `jsdom` pour créer l'environnement DOM nécessaire au bon fonctionnement de ReactTestUtils.

```javascript
import jsdom from 'jsdom';

export function bootstrapEnv(body = '') {
  const doc = jsdom.jsdom(`<!doctype html><html><body>${body}</body></html>`);
  const win = doc.defaultView;
  function propagateToGlobal(window) {
    for (const key in window) {
      if (!window.hasOwnProperty(key)) continue;
      if (key in global) continue;
      global[key] = window[key];
    }
  }
  global.document = doc;
  global.window = win;
  propagateToGlobal(win);
  console.log('\nENV setup is done !!!');
}
```

Créez enfin un fichier `index.js`, point d'entrée permettant d'exécuter l'ensemble des tests unitaires :

```javascript
import { bootstrapEnv } from './bootstrap';

bootstrapEnv();

const tests = [
  require('./components/wine.spec.js')
];
```

## Exécution des tests via NPM

Ajoutez un nouveau script dans le fichier `package.json` permettant de lancer les tests à l'aide de la commande `npm test` :

```json
"scripts": {
    "test": "mocha --compilers js:babel-register tests/index.js"
}
```

Vous pouvez également préciser à ESLint qu'il doit désormais également traiter le dossier `tests` :

```json
"scripts": {
    "lint": "eslint src tests"
}
```

## Pour plus tard ...

`ReactTestUtils` permet également de simuler des clics sur des éléments du DOM :

```javascript
ReactTestUtils.Simulate.click(button);
```
