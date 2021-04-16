# Ce qui reste à développer

## passage à webpack

Il faudrait remplacer tous les scripts chargés dans le <head> des html par des import des modules correspondants (sauf s'il n'existent pas, mais ça doit être rarissime)

C'est commencé pour jQuery dans mathalea.js, mais pas trouvé tous les widgets jquery-ui à charger.
Pour tous les autres js qui utilisent jQuery il faudrait ajouter un `import $ from 'jquery'` au début de tous les fichiers. Si y'en a trop on peut l'ajouter globalement dans webpack (et on aura alors un window.$ ou un window.jQuery ou les deux)

À noter que l'on peut se passer de jQuery la plupart du temps, en tout cas pour tout ce qui est de la sélection d'éléments dans le dom un `element.querySelectorAll(selector)` (cf [doc](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll)) sera plus efficace (attention ça retourne des HTMLElement, pas des objets jQuery)

### dossier dnb
Attention, pour le moment il faut créer un dossier dnb dans le projet (éventuellement vide), sinon la compilation webpack plante (il veut compiler les js qui sont dedans puisque mathalea.js les charge).

## autres améliorations possibles
* Ajouter jsdoc pour générer automatiquement la documentation
* Ajouter des tests unitaires (avec mocha/chai ou un autre moteur de tests)
* Ajouter éventuellement des tests fonctionnels avec [playwright](https://playwright.dev/)
