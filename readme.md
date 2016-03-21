# React Workshop

Ce workshop permet de découvrir [React](https://facebook.github.io/react/) et son écosystème par la pratique, étape par étape !

## Le sujet

Lors de ce workshop, nous allons développer une application web permettant de gérer ses vins préférés !

Les principales fonctionnalités de l'application sont :

* Lister les vins par région viticole,
* Afficher la fiche détaillée d'un vin,
* Aimer un vin,
* Ajouter un commentaire sur un vin.


## Les pré-requis techniques

Les pré-requis techniques sont les suivants :

* Node (version 4.x ou 5.x) et NPM (version 3.x)
* Git
* Atom
* React Developer Tools

### Node.js

Téléchargez et installez la version de Node.js correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://nodejs.org/en/download/](https://nodejs.org/en/download/)  

Vérifiez l'installation en lançant les commandes suivantes dans un terminal :

```
$ node -v
v4.4.0

$ npm -v
3.8.1
```

Si npm n'est pas en version 3.x, vous pouvez effectuer la mise à jour grâce à la commande suivante : `npm upgrade -g npm`

### Git

Téléchargez et installez la version de Git correspondant à votre système d'exploitation, en suivant les indications disponibles sur le site officiel : [https://git-scm.com/downloads](https://git-scm.com/downloads)  

Vérifiez l'installation en lançant la commande suivantes dans un terminal :

```
$ git --version
git version 2.7.3
```

### Atom

L'éditeur préconisé pour le workshop est [Atom](https://atom.io).

Téléchargez et installez Atom, puis installez les packages suivants :

* language-javascript-jsx
* linter-eslint

*Pour savoir comment gérer les packages d'Atom : [https://atom.io/docs/latest/using-atom-atom-packages](https://atom.io/docs/latest/using-atom-atom-packages)*


### React Developer Tools

Afin de disposer d'outils spécifiques à React dans votre navigateur web, installez **React Developer Tools** :

* [React Developer Tools pour Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [React Developer Tools pour Mozilla Firefox](https://addons.mozilla.org/fr/firefox/addon/react-devtools/)

## Pré-installer les dépendances

Pour pré-installer les dépendances NPM à l'avance, vous pouvez lancer le script `install.sh` qui lancera les commandes `npm install` dans les différentes étapes du workshop.

## API

L'application web s'appuie sur une API REST disponible dans le dossier [api](/api).

Pour démarrer le serveur exposant l'API, lancez les commandes suivantes :

```
$ cd api
$ npm install
$ npm start
```

Rendez-vous ensuite sur http://localhost:3000 pour parcourir la documentation des différentes routes disponibles.


## Les étapes du workshop

* [Etape 0](/step-0)
  * Mise en place des outils de build
    * webpack
    * webpack-dev-server
    * babel
    * eslint
  * Création du premier composant React
* [Etape 1](/step-1)
  * observation du premier composant (si step 0 bypassé)
  * ajout de tests sur le composant (mocha, chai, react-test-utils, jsdom)
* TODO: step 2
  * utilisation de l'api
    * recherche, liste, détails
  * création de composants et composition sans librairie
  * introduction aux concepts react
    * penser découpage composants
    * proptypes, createClass, etc ...
    * dumb components vs smart component
* TODO: step 3
  * introduction de react-router => spa
    * refactoring
* TODO: step 4
  * ajout de features
    * like
    * commentaires
    * ...
* TODO: step 5
  * introduction de redux
    * refactoring
* TODO: step 6
  * nouveaux patterns
    * classes
    * HOC
    * stateless components
    * contexts
