# Etape 1 - Testing

Les tests unitaires sont primordiaux dans le développement. Ils ne doivent en aucun cas être négligés, c'est pourquoi nous les introduisons dès l'étape 0 du workshop.

L'objectif est de mettre en place le test unitaire du composant `Todo`. Pour cela, nous allons nous appuyer sur les librairies suivantes :

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

Ajoutez la configuration nécessaire à `babel-register` dans le fichier `.babelrc` :

```json
{
  "presets": ["es2015", "react"]
}
```

Ecrivez ensuite le test du composant `Todo`, en utilisant :

* la syntaxe Mocha pour décrire le test,
* ReactTestUtils pour effectuer le rendu et parcourir l'arbre DOM du composant `Todo`,
* Chai pour vérifier le texte affiché.

```javascript
var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var expect = chai.expect;

var Todo = require('../../src/components/todo');

describe('Todo', function() {
  it('affiche le texte de la tâche', function() {
    var todo = ReactTestUtils.renderIntoDocument(<Todo text="Un Todo de test..."/>);
    var div = ReactTestUtils.findRenderedDOMComponentWithTag(todo, 'div');
    expect(div.textContent).to.be.equal('Un Todo de test...');
  });
});
```

Regardez également les fichiers suivants :

* `bootstrap.js` : fichier permettant de créer le contexte nécessaire au fonctionnement de ReactTestUtils.
* `index.js` : point d'entrée permettant d'exécuter l'ensemble des tests unitaires.

Ajoutez un nouveau script dans le fichier `package.json` permettant de lancer les tests à l'aide de la commande `npm test` :

```json
"scripts": {
    "test": "mocha --compilers js:babel-register tests/index.js"
}
```
