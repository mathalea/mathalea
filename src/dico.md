# src/tasks/buildDicos.js

```shell
# Construire le dico avec toutes les propriétés
pnpm build:dicos
```

La commande construit **src/js/modules/dictionnaireDesExercicesAleatoires.js** et lève les incoherences amcReady/amcType et interactifReady/interactifType.
Elle construit aussi un fichier markdown listant tous les exos interactifReady et amcReady : **src/exosAmcInteractifs.md**

Pour construire un dico spécifique à une propriété:

```js
// Par exemple si dictionnaireDesExercicesAleatoires.js contient la propriété constToFilter
const dictionnaireSpecifique = {}
Object.entries(dictionnaireDesExercicesAleatoires).forEach(([id, props]) => {
  if (props.constToFilter) dictionnaireSpecifique[id] = props
})
```