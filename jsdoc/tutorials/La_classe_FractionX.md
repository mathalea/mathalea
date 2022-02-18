# La Classe FractionX est une extension de la classe Fraction de Mathjs.

On distinguera l'objet Fraction de Mathjs créé avec la fonction fraction() de Mathjs et l'objet FractionX qui en hérite et qui est créé par la fonction fraction() du module fractions.js. FractionX hérite de l'objet Fraction et lui ajoute des propriétés et méthodes.

Dans la suite de cette documentation fraction() fait référence à la fonction du module fractions.js qui crée un objet FractionX.

```Javascript
const f1 = new FractionX(7, 8) // {s: 1, n: 7, d: 8, num: 7, den: 8, ...}

const f2 = fraction(0.8) // {s: 1, n: 4, d: 5, num: 4, den: 5, ...}

const f3 = fraction('0.(1)') // {s: 1, n: 1, d: 9, num: 1, den: 9, ...}

const f4 = fraction(-12,28) // {s:-1, n: 3, d: 7, num: -12, den: 28, ...} Voici la différence fondamentale entre Fraction et FractionX : les premières sont irréductibles.

const f5 = fraction(fraction(1,2), fraction(4,5)) // {s: 1, n: 5, d: 8, num: FractionX, den: FractionX, ...} num et den peuvent être des fractions ou des nombres décimaux...
```

Attention : Le signe de la fraction est déterminé à partir du numérateur et du dénominateur mais ceux-ci ne sont pas modifiés. la propriété texFraction affichera la fraction avec les numérateurs et dénominateurs passés ici en argument à la création (voir les propriétés FSD, FSP ou ecritureAlgebrique pour une autre écriture)

Pour explorer les propriétés de la classe, voici un exemple : 

Note : certaines redondances peuvent apparaître : c'est du à un soucis de compatibilité avec l'ancienne classe Fraction de Mathalea.

## Propriétés

```Javascript

const f = new FractionX(-6, 12) // FractionX {s: -1, n: 1, d: 2, num: -6, den: 12, …}
console.log(f.num)  // -6
console.log(f.den) // 12
console.log(f.texFraction) // '\dfrac{-6}{12}'
console.log(f.texFSD) // '-\dfrac{6}{12}' // à la différence de texFractionSignee, si la fraction est positive, il n'y aura pas de signe
console.log(f.texFractionSignee) // '-\dfrac{6}{12}' // si la fraction est positive, alors il y aura un + devant (c'est redondant avec ecritureAlgebrique car des exos l'utilisent)
console.log(f.texFSP) // '\left(-\dfrac{6}{12}\right)' // littéralement 'texFractionSigneeParentheses' Ajoute des parenthèses à texFractionSignee
console.log(f.numIrred) // -1 c'est f.num simplifié au maximum avec son signe
console.log(f.denIrred) // 2 c'est f.den simplifié au maximum avec son signe
console.log(f.s) // -1 (hérité de Fraction)
console.log(f.signe) // -1 (redondant pour cause d'utilisation dans des exercices.)
console.logf.n) // 1 (hérité de Fraction) numérateur réduit positif (mathjs simplifie automatiquement les fractions et en extrait le signe)
console.log(f.d) // 2 (hérité de Fraction) dénominateur réduit positif

console.log(f.pourcentage) // -50 valeur de la fraction en % arrondi à 6 chiifres

console.log(f.signeString) // '-' caractère du signe

console.log(f.texFractionSimplifiee) // '-\dfrac{1}{2}' redondant avec toLatex() (plus pratique : c'est une propriété et ça n'est pas recalculé) de plus, elle était utilisée par des exos

console.log(f.ecritureAlgebrique) // '-\dfrac{6}{12}' redondant avec f.texFractionSignee et avec la fonction ecritureAlgebrique(argument) qui accepte maintenant les arguments FractionX

console.log(f.ecritureParentheseSiNegatif) // '\left(-\dfrac{6}{12}\right)' redondant avec la fonction ecritureParentheseSiNegatif qui accepte maintenant les arguments de type FractionX

console.log(f.valeurDecimale) // -0.5 valeur décimale si elle existe NaN sinon

console.log(f.estEntiere) // false (true si f.d===1)

console.log(f.estParfaite) // false (true si la racine carrée de la fraction est une fraction)

console.log(f.estIrreductible) // false (true si pgcd(num,den)===1)
```
## Methodes :

```Javascript
console.log(f.toLatex()) // '-\dfrac{1}{2}' (méthode héritée de Fraction mais modifiée \dfrac remplaçant \frac)

console.log(f.toFraction()) // {s: -1, n: 1, d: 2} convertit l'objet FractionX et crée un nouvel objet Fraction (mathjs) (quel intérêt ?)

console.log(f.valeurAbsolue()) // {s: 1, n: 1, d: 2, num: 6, den: 12...} nouvel objet FractionX (f || -f) à numérateur et dénominateur positifs.

console.log(f.simplifie()) // {s: -1, n: 1, d: 2, num: -1, den: 2...} nouvel objet FractionX numIrre//num et denIrre//den conserve les signes au même endroit.

console.log(f.oppose()) // {s: 1, n: 1, d: 2, num: 1, den: 2...} nouvel objet FractionX num -> -num

console.log(f.reduire(10)) // {s: -1, n: 1, d: 2, num: -60, den: 120...} multiplie le num et le den par k. k peut être un entier, un décimal, une FractionX

const f2 = fraction(1,3)

console.log(f.isEqual(f2)) // false car f !== f2

console.log(f.differenceFraction(f2)) // {s: -1, n: 5, d: 6, num: -5, den: 6, ... }. (note : le nouvel objet est irréductible, le signe est mis sur num par défaut.)

console.log(f.multiplieFacteur(5)) // {s: -1, n:5, d: 2, num: -30, den: 12, ...} // 5*f
console.log(f.multiplieFacteur(-5)) // {s: 1, n:5, d: 2, num: 30, den: 12, ...}
console.log(f.multiplieFacteur(0.5)) // {s: -1, n: 5, d: 4, num: -3, den: 12}

console.log(f.entierDivise(5)) // {s: -1, n: 1, d: 10, num: -6, den: 60, ... } // f/5

console.log(f.ajouteEntier(n)) // nouvel objet FractionX obtenu en ajoutant n * den au numérateur (note : le dénominateur est le même que celui de f)

console.log(f.entierMoinsFraction(n)) // nouvel objet FractionX obtenu en mettant n * den - num au numérateur (note : le dénominateur est le même que celui de f)

console.log(f.superieurLarge(f2)) // true si f >= f2 (Note : f2 peut être une FractionX ou un nombre quelconque par exemple 1)

console.log(f.estUneSimplification(f2)) // true si f2 = f avec abs(f.num) < abs(f2.num)>

console.log(f.sommeFraction(f2)) // nouvel objet FractionX = f + f2 (note : le résultat est une fraction irréductible car la somme est simplifiée)

console.log(f.sommeFractions(f2,f3,f4)) // nouvel objet FractionX = f + f2 + f3 + f4 (note : le résultat est une fraction irréductible car la somme est simplifiée)

console.log(f.produitFraction(f2)) // nouvel objet FractionX = f * f2 (note : le résultat est une fraction irréductible car la somme est simplifiée)

console.log(f.produitFractions(f2,f3,f4)) // nouvel objet FractionX = f * f2 * f3 * f4 (note : le résultat est une fraction irréductible car le produit est simplifiée)

console.log(f.fractionDecimale()) // nouvel objet FractionX égal à f dont le dénominateur est la plus petite puissance de 10 permettant l'écriture de la valeur décimale de f. retourne NaN si f n'est pas un nombre décimal.

console.log(f.texRacineCarree(detail)) // retourne la chaine Latex correspondant à la racine carrée de f. Si detail est true alors, le calcul détaillé précède le résultat. Valeur par défaut detail = false.

console.log(f.racineCarree()) // false (si la racine carrée de f n'est pas une fraction) sinon l'objet FractionX correspondant à la racine carrée de f

console.log(f.representation(x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '')) // renvoie un tableau d'objets 2d qui donne une représentation de la fraction au point (x,y).
//    rayon détermine le rayon du disque ou la taille du segment ou du rectangle
//    depart détermine le n° du secteur à partir duquel le coloriage commence (par défaut 0 correspondant au 0° trigo)
//    type est au choix : 'gateau' pour un disque, 'segment' pour un segment, 'barre' pour un rectangle
//    unite0 et unite1 sont des nombres permettant de définir le pas de graduation : 
//        0 et 1 permettent de graduer un segment de longueur int(f.num/f.den)+1 en coupant chaque unité en f.den parts. 
//        0 et 10 permettent de graduer un segment d'extrémité 0 et 10 et de colorier la fraction f de ce segment. littéralement la fraction f de 10 (exemple 1/2 de 10)
//    scale est la taille pour le texte
//    label est un texte à écrire sous la graduation marquant l'extrémité droite du segment. par exemple 'x ?'

console.log(f.representationIrred(x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '')) // renvoie un tableau d'objets 
 //   c'est la même chose que f.representation() mais le numérateur et le dénominateur sont simplifiés avant de graduer.
```
## usages
On veut utiliser la classe fraction pour travailler avec une écriture fractionnaire : $\frac{4.2}{5.3}$
```Javascript
let f = fraction(42,53).reduire(0.1) // f.n = 42, f.d = 53, f.num = 4.2 et f.den = 5.3
```
Ne pas utiliser directement fraction(4.2, 5.3). En effet, le constructeur tolère très mal les numérateurs et dénominateurs décimaux. Il essayera de trouver un rationnel le plus proche de 4.2/5.3 et pour une raison obscure, on aura de meilleurs résultats avec fraction(4.2/5.3)






