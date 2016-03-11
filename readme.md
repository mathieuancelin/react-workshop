# React Workshop

## Pré-requis

* installer node (v 4.x ou 5.x) et npm 3 (npm upgrade -g npm)
* installer git
* installer atom + packages linter-eslint et language-javascript-jsx
* installer un navigateur digne de ce nom avec les react-devtools

### Node.js

Téléchargez et installez la version de Node.js correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://nodejs.org/en/download/](https://nodejs.org/en/download/)  

Vérifiez l'installation en lançant les commandes suivantes dans un terminal :

```
$ node -v
v4.2.2

$ npm -v
2.14.7
```

### Git

Téléchargez et installez la version de Git correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://git-scm.com/downloads](https://git-scm.com/downloads)  

Vérifiez l'installation en lançant la commande suivantes dans un terminal :

```
$ git --version
git version 2.6.4
```

### Atom

L'éditeur préconisé pour le workshop est [Atom](https://atom.io).

Téléchargez et installez Atom, puis installez les packages suivants :

* react
* linter-eslint

*Pour savoir comment gérer les packages d'Atom : [https://atom.io/docs/latest/using-atom-atom-packages](https://atom.io/docs/latest/using-atom-atom-packages)*


### React Developer Tools

Afin de disposer d'outils spécifiques à React dans votre navigateur web, installez **React Developer Tools** :

* [React Developer Tools pour Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [React Developer Tools pour Mozilla Firefox](https://addons.mozilla.org/fr/firefox/addon/react-devtools/)


## Agenda

* [Etape 0](/step-0)
  * mise en place des outils de build (webpack, dev-server, babel, eslint)
  * creation du premier composant
* [Etape 1](/step-1)
  * observation du premier composant (si step 0 bypassé)
  * ajout de tests sur le composant (mocha, chai, react-test-utils, jsdom)
* step 2
  * utilisation de l'api
    * recherche, liste, détails
  * création de composants et composition sans librairie
  * introduction aux concepts react
    * penser découpage composants
    * proptypes, createClass, etc ...
    * dumb components vs smart component
* step 3
  * introduction de react-router => spa
    * refactoring
* step 4
  * ajout de features
    * like
    * commentaires
    * ...
* step 5
  * introduction de redux
    * refactoring
* step 6
  * nouveaux patterns
    * classes
    * HOC
    * stateless components
    * contexts
