# Etape 4 - Ajout de fonctionnalités

## Pré-requis

Vous devez maîtriser l'étape 3 du workshop afin de pouvoir réaliser l'étape 4.

Le code disponible dans cette étape correspond au résultat attendu de l'étape 3. Vous pouvez partir de cette base pour développer l'étape 4.

Pour lancer l'application de l'étape 3, exécutez la commande `npm start` (après avoir fait un `npm install`). Ouvrez ensuite l'URL http://localhost:8080 dans votre navigateur.

## Objectif

L'objectif de cette étape est d'ajouter des fonctionnalités sur la fiche de description d'un vin, à savoir :

* Aimer / ne plus aimer le vin
* Visualiser les commentaires sur le vin
* Ajouter un nouveau commentaire

![mockup](./mockup.png)


## Like

Les composants impactés par la fonctionnalité "Aimer / ne plus aimer" un vin sont `Wine` et `WinePage`.

Faites évoluer le composant `Wine` :

* Ajout d'une nouvelle propriété : `liked`.
* Ajout d'un bouton "like / unlike" dans le rendu du composant se basant sur la valeur de la propriété `liked`.
* Gestion de l'événement `onClick` sur le bouton.

Faites évoluer le composant `WineApp` :

* Ajout dans le `state` d'un attribut `liked`.
* Evolution du code de la méthode `componentDidMount()` pour aller chercher la valeur de `liked` sur le serveur.
* Gestion du click sur le bouton "like / unlike" du composant `Wine` dans une nouvelle méthode `handleToggleLike()`.


## Comment

Créez un nouveau composant `Comments` permettant :

* d'afficher la liste des commentaire d'un vin,
* d'ajouter un nouveau commentaire sur le vin.

Ce composant sera directement utilisé dans le rendu du composant `WinePage`, de la manière suivante :

```javascript
render() {
  // ...
  return (
    <div>
      <Wine ... />
      <Comments wineId={this.state.wine.id} />
    </div>
  );
}
```

## A vous de jouer !

Surtout ne restez pas bloqués ! N'hésitez pas à demander de l'aide aux organisateurs du workshop ou bien à jetter un oeil au code disponible dans l'étape suivante ;-)
