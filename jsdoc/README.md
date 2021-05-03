# Génération de la documentation

jsdoc permet de générer de la doc à partir des commentaires du code.
On peut l'exécuter avec `jsdoc -c jsdoc/mathaleaInstrumEnPoche.json` ou `pnpm run doc`.

Pour pouvoir commenter une fonction (ça devrait être systématique, pour avoir la doc sur les arguments dans l'IDE) mais ne pas voir ça dans la sortie de la documentation (car c'est une fonction interne qui n'apportera rien à un développeur d'exercices mathalea), il suffit de lui ajouter un tag `@private` :

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
