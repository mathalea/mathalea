# Ce qui reste à développer

## passage à webpack

Il reste à gérer SemanticUI et JQuery.
Le paquet SemanticUI n'étant plus utilisable, on pourrait importer son code

### dossier dnb
Attention, pour le moment il faut créer un dossier dnb dans le projet (éventuellement vide), sinon la compilation webpack plante (il veut compiler les js qui sont dedans puisque mathalea.js les charge).

## autres améliorations possibles
* Ajouter jsdoc pour générer automatiquement la documentation
* ~~Ajouter des tests unitaires (avec mocha/chai ou un autre moteur de tests)~~ (abandonné ?)
* Finaliser les tests fonctionnels avec [playwright](https://playwright.dev/)
* Finaliser MathALEA2D (bouton de téléchargement, aller-retour entre l’aperçu plein écran et l’éditeur)
* (Améliorer MathALEA2D avec sval)
* Ajouter MathAleaInstrumEnPoche
* Ajouter AMC
* Intégrer https://github.com/Sphinxxxx/cm-resize pour code-mirror (ou un équivalent)
* Faire le lien avec GoHugo pour le site CoopMaths
* Réfléchir à l’intégration optionnel des exercices de DNB (pour alléger le paquet des programmeurs)
* Gérer le Hot Reload

```
if (module.hot) {
  // ce code n'est exécuté qu'en mode devServer
  // le if complet est viré du build en mode production
}
```

## Bugs connus
* Il faut vérifier l'intégration de SVG.js. 3F21-1 amène une erreur non comprise