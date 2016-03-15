# Etape 0 - Installation et premier composant

## Package.json

Créez un fichier `package.json`, en déclarant les dépendances React :

```json
{
    "name": "react-workshop",
    "description": "React Workshop",
    "version": "0.1.0",
    "dependencies": {
        "react": "0.14.7",
        "react-dom": "0.14.7"
    }
}
```

Lancez ensuite la commande `npm install` afin de télécharger localement les dépendances (elles se trouvent dans le répertoire `node_modules`)


## Premier componsant

### wine.js

Dans le répertoire `src/components`, créez le fichier `wine.js` qui contient le code de notre premier componsant, nommé `Wine` :  

```javascript
import React from 'react';

const WineStyle = {
  padding: 8,
  boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
};

const Wine = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div style={WineStyle}>
          {this.props.name}
      </div>
    );
  }
});

export default Wine;
```

Ce premier composant est volontairement très simple (de type "hello world"), il retourne simplement le nom du vin dans un élément HTML `<div>`.
Le nom du vin est passé au composant grâce à une propriété `name`. Cette propriété est définie comme étant de type `string` et obligatoire (partie `propTypes` du composant).

Un style est également appliqué au componsant via l'attribut `style`.

Vous pouvez également utiliser directement la fonction `createElement` de l'API `React` :

```javascript
render() {
    return React.createElement(
        'div',
        {style: WineStyle},
        this.props.name
    );
}
```

### index.html

Dans le dossier `public`, créez une page HTML basique et ajoutez-y une `<div>` (possédant l'identifiant `main`) dans laquelle nous effectuerons le rendu de notre composant.  

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>React Workshop</title>
</head>
<body>
<h1>Wines</h1>

<div id="main"></div>

</body>
</html>
```

### app.js

A la racine du répertoire `src`, créez le fichier `app.js` qui contient le code nécessaire au rendu du componsant `Wine` dans la `<div>` créée précédemment :

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Wine from './components/wine';

ReactDOM.render(
    <Wine name="Château Chevrol Bel Air"/>,
    document.getElementById('main')
);
```

Vous pouvez également utiliser directement la fonction `createElement` de l'API `React` :

```javascript
ReactDOM.render(
    React.createElement(
        Wine,
        {name:'Château Chevrol Bel Air'}
    ),
    document.getElementById('main')
);
```

## Build avec Webpack

Nous utilisons l'outil [Webpack](https://webpack.github.io/) afin de construire notre application.

En complément de Webpack, nous utilisons [Babel](https://babeljs.io/), un compilateur Javascript qui permet d'utiliser les dernières nouveautés du langage.
Dans notre cas, nous utilisons les plugins `react` et `es2015`.

Dans le fichier `package.json`, ajoutez les dépendances de développement nécessaires au build Webpack :

```json
"devDependencies": {
    "webpack": "1.12.9",
    "babel-loader": "6.2.0",
    "babel-preset-es2015": "6.1.18",
    "babel-preset-react": "6.1.18"
}
```

Créez le fichier `webpack.config.js` permettant de configurer Webpack et Babel :

```javascript
var webpack = require('webpack');

module.exports = {
    output: {
        path: './public/js/',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    entry: {
        app: ['./src/app.js']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
```

La configuration de Webpack est simple :

* Le point d'entrée est le fichier `src/app.js`
* Le fichier `bundle.js` est généré dans le répertoire `public/js`
* Le build exécute le lanceur `babel` avec les plugins `react` et `es2015`
    * *Remarque : les plugins babel peuvent également être définis dans le fichier de configuration `.babelrc`*

Vous pouvez ajouter les commandes Webpack sous forme de scripts dans le fichier `package.json`. Par exemple :

```json
"scripts": {
    "bundle": "webpack -p --colors --progress"
}
```

Ainsi, la commande `npm run bundle` permet de construire le fichier `bundle.js`


Enfin, pensez à référencer le script `bundle.js` dans le fichier `index.html` :

```html
<body>
<h1>Wines</h1>

<div id="main"></div>

<script src="/js/bundle.js"></script>
</body>
```

## Exécution avec Webpack Dev Server

Afin de rendre la page `index.html` dans un navigateur, nous utilisons [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html).

Ajoutez la dépendance à `webpack-dev-server` dans le fichier `package.json` :

```json
"devDependencies": {
    "webpack-dev-server": "1.14.0"
}
```
Ajoutez un nouveau script permettant de lancer le serveur Webpack :

```json
"scripts": {
    "start": "webpack-dev-server -d --colors --inline --content-base public"
}
```

Lancez enfin la commande `npm start` et ouvrez la page `http://localhost:8080`.

Modifiez le code du composant `Wine` et observez les modifications en live dans votre navigateur !

## ESLint

[ESLint](http://eslint.org/) est un outil qui permet d'analyser votre code Javascript selon un certains nombre de règles.

Dans notre cas, nous allons l'utiliser avec le plugin [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) qui propose des règles spécifiques au développement de composants React.

Pour commencer, ajoutez les dépendances nécessaires dans le fichier `package.json` :

```json
"devDependencies": {
    "eslint": "1.10.3",
    "eslint-plugin-react": "3.11.3"
}
```

Créez ensuite le fichier `.eslintrc` qui permet de configurer ESLint :

```json
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "react"
  ],
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "rules": {
    "react/prop-types": 1,
  }
}
```

* L'attribut `extends` permet d'hériter d'une configuration existante. `eslint:recommended` contient les règles recommandée par ESLint.
* La partie `env` permet de définir quelles variables globales sont potentiellement utilisées dans le code. Ici nous ajoutons celles du navigateur et celle de node.
* La partie `plugins` permet d'ajouter des plugins ESLint. Ici nous ajoutons le plugin React.
* La partie `ecmaFeatures` permet de définir les options du langage Javascript supportées lors de l'analyse. Ici nous activons la syntaxe JSX ainsi que les modules ES6.
* La partie `rules` permet de définir les règles à appliquer lors de l'analyse du code. Pour plus de détails sur les règles disponibles : [https://www.npmjs.com/package/eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

Il est possible d'exclure certains fichiers ou dossiers de l'analyse, grâce au fichier `.eslintignore`. Exemple :

```
node_modules
webpack.config.js
public
```

Enfin, ajoutez un script dans le fichier `package.json` permettant d'exécuter ESLint grâce à la commande `npm run lint` :

```json
"scripts": {
  "lint": "eslint src"
}
```
