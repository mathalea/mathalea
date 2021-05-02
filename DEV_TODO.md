# Ce qui reste à développer



### dossier dnb
Attention, pour le moment il faut créer un dossier dnb dans le projet (éventuellement vide), sinon la compilation webpack plante (il veut compiler les js qui sont dedans puisque mathalea.js les charge).

## autres améliorations possibles
* Finaliser les tests fonctionnels avec [playwright](https://playwright.dev/)
* Améliorer MathALEA2D avec sval
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