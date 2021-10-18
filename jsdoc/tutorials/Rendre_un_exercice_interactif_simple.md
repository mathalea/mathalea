---

MathAlea permet de rendre un exercice interactif. Directement sur l'interface Web, l'élève saisit une réponse (dans un champ, dans une liste déroulante, en cochant une case ou bien encore en cliquant sur une figure). Celle-ci est vérifiée automatiquement et le score de toutes les réponses à l'exercice peut éventuellement être récupéré par son professeur ([documentation de la gestion des scores](https://coopmaths.fr/mathalea.html?v=scores)).

---

 Les actions obligatoires à mener, pour permettre à un exercice d'être interactif, sont décrites ci-dessous et explicitées, plus bas, en détail.

1. [Charger le code nécessaire](#1)
1. [Configurer le `typeInteractivite` choisi](#2)
    1. [`mathlive`](#3)
        1. [Lignes de code spécifiques](#4)
        1. [Gestion des différentes types de réponse](#4)
    1. [`qcm`](#5)
    1. [`numerique`](#6)
    1. [`cliqueFigure`](#7)
    1. [`listeDeroulante`](#7)
    1. [`custom`](#7)

## <a id="1" href="#1"></a> 1. Charger le code nécessaire pour rendre un exercice interactif

* **types `'qcm'`

* **type `'listeDeroulante'`** (Interactif) **:** Ici, l'utilisateur devra sélectionner une réponse dans un menu déroulant dont les différentes options sont définies par la fonction `choixDeroulant` et dont les bonnes réponses sont définies par la fonction `setReponse` à importer toutes les deux de `'../../modules/gestionInteractif.js'` (voir ex. 6N43-4)

```js

texte = 'Choisir une bonne réponse parmi ' + choixDeroulant(this, i, 0, [a, b, c, d]) // Si on veut avoir plusieurs menus déroulants dans la même question, il suffit d'incrémenter le troisième paramètre comme choixDeroulant(this, i, 1, [a, b, c, d]) (voir ex. 6N43-4)
texteCorr = `Les bonnes réponses sont ${a} et ${d}.`
setReponse(this, i, [a, d]) // S'il y a plusieurs menus déroulants, le troisième paramètre peut être une liste de listes comme setReponse(this, i, [[a, d], [c, d])
```

Pour charger le code nécessaire pour rendre un exercice interactif, il faut ajouter ces deux lignes de code juste après les `import` de début d'exercice :
```js
export const interactifReady = true // pour définir qu'exercice peut s'afficher en mode interactif.
export const interactifType = 'typeInteractivite'
```

Même si le `typeInteractivite` le plus simple à utiliser pour rendre un exercice interactif est `'mathLive'`, on peut utiliser tous les choix décrits ci-dessous.

|Choix de `'typeInteractivite'`|Description de ce choix|Exercices-témoins|
|-----|-----|-----|
|`'mathLive'`|pour proposer un champ de réponses avec un clavier virtuel et vérification possible d'égalité formelle|4C10-4|
|`'qcm'`|pour proposer un qcm|5L10-2|
|`'numerique'`|pour proposer une réponse numérique|4G20-2|
|`'cliqueFigure'`|pour proposer des figures à cliquer|6G10-3|
|`'listeDeroulante'`|pour proposer une liste déroulante avec la réponse et différents autres choix possibles|6N43-4|
|`'custom'`|pour proposer une réponse originale, différente des précédentes, en appelant `this.correctionInteractive()` |4G20-2|

> **Remarque** : pour définir le mode dans lequel l'exercice va s'afficher par défaut (interactif ou pas), on initialisera le booléen `this.interactif = false` placé de la sorte :
> ```js
> Exercice.call(this)
> ..... // D'autres instructions
> this.interactif = false // true ou false
> ..... // D'autres instructions
> this.nouvelleVersion = function () {
> ```

## <a id="2" href="#2"></a> 2. Configurer le `typeInteractivite` choisi

Selon le `typeInteractivite` choisi, la programmation est différente. Les paragraphes suivant détaillent chacune des configurations.

>>## <a id="3" href="#3"></a> 2. 1. `mathLive`

Pour rendre un exercice interactif en utilisant MathLive, il faut rajouter 3 nouvelles lignes de code, gérer les types de réponses attendues.

>>>>## <a id="4" href="#4"></a> 2. 1. 1. Lignes de code spécifiques

1. Rajouter un import dans l'en-tête comme ceci :
```js
import { setReponse, ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
```
2. Initialiser la variable `setReponse` dans la boucle principale, pour chaque question, de la sorte :
```js 
setReponse(this, i, maReponse) 
```
`maReponse` est une chaîne de caractère LaTeX (de type `'${x1}'`) ou une valeur numérique (donc sans formatage avec `texNombre` par exemple).

3. Ajouter, pour chaque question, le champ de réponse avec le clavier virtuel après l'énoncé de la sorte :
```js 
texte += ajouteChampTexteMathLive(this, i)
```

>>>>## <a id="5" href="#5"></a> 2. 1. 2. Gestion des différentes types de réponses attendues

Toutes les réponses sont traitées en comparant la saisie de l'élève avec la réponse (ou les réponses) choisie(s) par le concepteur de l'exercice.
Le fonctionnement par défaut est de comparer des expressions littérales ou des nombres, de façon intuitive.
- Pour comparer des textes sans traitement, on code ainsi `setReponse(this, i, '+', { formatInteractif: 'texte' })`. La réponse doit être saisie sans les $ délimiteurs du LaTeX.
- Pour comparer des fractions, il y a trois méthodes différentes pour coder.
-  `setReponse(this, i, maFractionReponse, { formatInteractif: 'fraction' })` et `maFractionReponse` doit être un objet fraction (créé avec `new Fraction(a, b)`).
-  `setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fractionPlusSimple' })` et la réponse doit être un objet fraction égale à la réponse mais avec un numérateur strictement inférieur (on compare les valeurs absolues).
-  `setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fractionEgale' })` et la réponse doit être un objet fraction égale à la réponse.
- Pour comparer des longueurs (ou des aires), on peut faire `setReponse(this, i, new Grandeur(4, 'cm'), { formatInteractif: 'longueur' })` et personnaliser le champ texte avec `ajouteChampTexteMathLive(this, i, 'longueur')`

Non non NON ????

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
