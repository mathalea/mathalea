
## <a id="12" href="#12">#</a> Dans le cas d'un exercice normal

Pour rendre un exercice interactif en utilisant MathLive, il suffit de :
1. Placer en en-tête :
```js
import { setReponse, ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
```
2. mettre dans la boucle principale `setReponse(this, i, maRéponse)` avec maRéponse un string LaTeX ou une valeur numérique (donc sans `texNombre` ou des équivalents)
3. faire `texte += ajouteChampTexteMathLive(this, i)` pour ajouter le champ de réponse.

Par défaut, on compare des expressions littérales ou des nombres. <a id="13" href="#13">#</a>
- Pour comparer des textes sans traitement, on fait `setReponse(this, i, '+', { formatInteractif: 'texte' })`. La réponse doit être saisie sans les $ délimiteurs du LaTeX.
- Pour comparer des fractions et attendre exactement une forme, on fait `setReponse(this, i, '+', { formatInteractif: 'fraction' })` et la réponse doit être un objet fraction (créé avec `new Fraction(a, b)`)
- Pour comparer des fractions, on peut aussi faire `setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fractionPlusSimple' })` et la réponse doit être un objet fraction égale à la réponse mais avec un numérateur strictement inférieur (on compare les valeurs absolues).
- Pour comparer des fractions, on peut aussi faire `setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fractionEgale' })` et la réponse doit être un objet fraction égale à la réponse.
- Pour comparer des longueurs (ou des aires), on peut faire `setReponse(this, i, new Grandeur(4, 'cm'), { formatInteractif: 'longueur' })` et personnaliser le champ texte avec `ajouteChampTexteMathLive(this, i, 'longueur')`

**<a id="15" href="#15">#</a> Si une réponse correcte est considérée fausse**

Le fonctionnement de MathLive peut parfois donner un résultat étonnant. Alors qu'on attend la réponse, "1h45min", `verifieQuestionMathLive` peut lui attendre "1h45\\min" par exemple.

Si vous vous trouvez dans la situation où une réponse correcte est considérée fausse, voici la procédure à suivre :
* Ouvrir l'inspecteur (CTRL+MAJ+C sur Firefox et Chrome, Command+Option+I sur Safari)
* Sur l'onglet débugueur. Chercher dans l'onglet sources `webpack/src/js/modules/gestionInteractifs.js`
* Mettre un point d'arrêt sur la ligne 95 juste après le `let saisie = champTexte.value` (clic droit sur 95 puis sur Ajouter un point d'arrêt)
* Cliquer sur Actualiser
* Saisir la réponse attendue dans le champ et valider la saisie
* Mettre le curseur sur `saisie` pour visualiser la saisie qu'il a récupéré [capture d'écran](img/Interactif-1.png)

## <a id="14" href="#14">#</a> Dans le cas d'un exercice simple fait pour utilisé dans une Course aux Nombre (`this.typeExercice = 'simple'`)

Il suffit de
* Mettre votre énoncé dans `this.question`
* Mettre votre correction dans `this.correction`
* Mettre la réponse attendue dans `this.reponse`

**Pour changer le format**, il suffit de placer après le `Exercice.call(this)` :
* `this.formatInteractif = ` et de compléter avec un des formats vus <a href="#13">ci-dessus</a> : `'texte'`, `'fraction'`, `'fractionPlusSimple'`, `'fractionEgale'`, `'longueur'` (voir /js/exercices/can/can6C15.js par exemple).
* `this.formatChampTexte = 'largeur10 inline'` pour personnaliser le champTexte (10 % de la largeur sans retour à la ligne dans cet exemple)
* `this.optionsChampTexte = { texte: 'l = ', texteApres: ' cm'}` permet d'avoir du texte avant et après le champTexte MathLive.


## <a id="10" href="#10">#</a> Avoir deux champs de réponse sur une question, c'est possible !
Il suffit d'avoir un compteur indépendant du compteur `i` de la boucle qui augmente de `1` pour les questions à un champ de réponse et qui augmente de `2` pour les questions à deux champs de réponse.

Supposons qu'on nomme cet autre compteur `j`.

Au lieu de faire `setReponse(this, i, maRéponse)` et `texte += ajouteChampTexteMathLive(this, i)`, il suffit de faire `setReponse(this, j, maRéponse)` et `texte += ajouteChampTexteMathLive(this, j)`

Le soucis, c'est que pour l'instant chaque formulaire rapporte un point au niveau du score. Il y aura donc des questions à 2 points et d'autres à 1 point.
