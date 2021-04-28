# Génération de la documentation

jsdoc permet de générer de la doc à partir des commentaires du code.

Pour pouvoir commenter une fct (ça devrait être systématique, pour avoir la doc sur les arguments dans l'IDE) mais ne pas voir ça dans la sortie de la doc (car c'est une fct interne qui n'apportera rien à un dev d'exos mathalea), il suffit de lui ajouter un tag `@private` :
```js
/**
 * Retourne une distance
 * @private
 * @param {number} x ordonnée
 * @param {number} y abscisse
 * @return {number} distance 
 */
function distance (x, y) {
  return Math.sqrt(x * x + y * y)
}
```

Pour générer différentes documentations
* une pour ceux qui veulent inclurent mathalea dans autre chose
* une pour les devs d'exo
* une pour les dev du core ou d'outils internes
* etc.
il suffit de faire plusieurs json dans jsdoc, avec un dossier de sortie ≠ et des fichiers en entrée ≠
  
Au 27/04/2021 ça plante (out of memory) avec 
```json
  "source": {
    "include": [
      "./src/js",
      "./DEV.md"
    ],
    "exclude": [
      "./src/js/modules/MathJax"
    ]
  },
```
probablement à cause de giac qui est monstrueux et devrait pas trop être rangé là (c'est une lib externe qu'il vaudrait mieux mettre à part).
