# Step 6 : redux, redux-thunk et les devtools

## Pré-requis

Le code disponible dans cette étape correspond au résultat attendu des étapes 0, 1, 2, 3, 4, et 5.

Pour lancer l'application de l'étape 5, exécutez la commande `npm start` (après avoir fait un `npm install`). Ouvrez ensuite l'URL http://localhost:8080 dans votre navigateur. Vous avez également besoin de l'API (lancez la commande `npm start` dans le dossier `api`).

## Objectif

Maintenant que vous maitrisez `redux`, vous pouvez vous lancer dans un gros refactoring pour que tout l'état applicatif soit contenu dans le store `redux`.

## L'état global de l'application

## appels asynchrones et `redux-thunk`

## redux-devtools

Une fois que vous aurez réussi vous pourrez installer [`redux-devtools`](https://github.com/gaearon/redux-devtools) et jouer avec le `time travelling` rendu possible par `redux` et sa gestion d'état immutable.

## A vous de jouer !

Surtout ne restez pas bloqués ! N'hésitez pas à demander de l'aide aux organisateurs du workshop ou bien à jetter un oeil au code disponible dans l'étape suivante ;-)

## Bonus

Vous pouvez profiter du passage au mode full redux pour faire de la mise en cache d'appels de services.

Vous pouvez facilement arriver à ce résultat en gérant le cache au niveau des actions permettant de récupérer les régions ainsi que les vins d'une région.

Voici à quoi pourrait ressembler votre état global

```javascript

```
