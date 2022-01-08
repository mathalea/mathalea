# La Classe FractionX est une extension de la classe Fraction de mathjs.

Pour définir un objet FractionX (une instance de la classe) on peut utiliser les mêmes syntaxes que pour l'objet Fraction de mathjs à savoir :

`new Fraction(numérateur, dénominateur)`

`new Fraction(valeur décimale)`

`new Fraction(String)` // où String est une chaine décrivant un rationnel. Par exemple '0.(1)' c'est 1/9

Attention : Le signe de la fraction est déterminé à partir du numérateur et du dénominateur mais ceux-ci ne sont pas modifiés. la propriété texFraction affichera la fraction avec les numérateurs et dénominateurs passés ici en argument à la création (voir les propriétés FSD, FSP ou ecritureAlgebrique pour une autre écriture)

Avec la classe FractionX, le numérateur et le dénominateur peuvent aussi être des FractionX !

Donc vous pouvez créer un quotient de fractions.

Par exemple : `new Fraction(new Fraction(1,2), new Fraction(4,5))` -> $\frac{\frac{1}{2}}{\frac{4}{3}}$

Pour explorer les propriétés de la classe, voici un exemple : 

Note : certaines redondances peuvent apparaître : c'est du à un soucis de compatibilité avec l'ancienne classe Fraction

`const f = new FractionX(-6, 12)` // FractionX {s: -1, n: 1, d: 2, num: -6, den: 12, …}

## Propriétés

`f.num` // -6

`f.den` // 12

`f.texFraction` // '\dfrac{-6}{12}'

`f.texFSD` // '-\dfrac{6}{12}' // à la différence de texFractionSignee, si la fraction est positive, il n'y aura pas de signe

`f.texFractionSignee` // '-\dfrac{6}{12}' // si la fraction est positive, alors il y aura un + devant (c'est redondant avec ecritureAlgebrique car des exos l'utilisent)

`f.texFSP` // '(-\dfrac{6}{12})' // littéralement 'texFractionSigneeParentheses' Ajoute des parenthèses à texFractionSignee

`f.numIrred` // -1 c'est f.num simplifié au maximum avec son signe

`f.denIrred` // 2 c'est f.den simplifié au maximum avec son signe

`f.s` // -1 (hérité de Fraction)

`f.signe` // -1 (redondant pour cause d'utilisation dans des exercices.)

`f.n` // 1 (hérité de Fraction) numérateur réduit positif (mathjs simplifie automatiquement les fractions et en extrait le signe)

`f.d` // 2 (hérité de Fraction) dénominateur réduit positif

`f.pourcentage` // -50 valeur de la fraction en % arrondi à 6 chiifres

`f.signeString` // '-' caractère du signe

`f.texFractionSimplifiee` // '-\dfrac{1}{2}' redondant avec toLatex() (plus pratique : c'est une propriété et ça n'est pas recalculé) de plus, elle était utilisée par des exos

`f.ecritureAlgebrique` // '-\dfrac{6}{12}' redondant avec f.texFractionSignee et avec la fonction ecritureAlgebrique(argument) qui accepte maintenant les arguments FractionX

`f.ecritureParentheseSiNegatif` // '\left(-\dfrac{6}{12}\right)' redondant avec la fonction ecritureParentheseSiNegatif qui accepte maintenant les arguments de type FractionX

`f.valeurDecimale` // -0.5 valeur décimale si elle existe NaN sinon

`f.estEntiere` // false (true si f.d===1)

`f.estParfaite` // false (true si la racine carrée de la fraction est une fraction)

`f.estIrreductible` // false (true si pgcd(num,den)===1)
## Methodes :

`f.toLatex()` // '-\dfrac{1}{2}' (méthode héritée de Fraction mais modifiée \dfrac remplaçant \frac)

`f.toFraction()` // {s: -1, n: 1, d: 2} convertit l'objet FractionX et crée un nouvel objet Fraction (mathjs) (quel intérêt ?)

`f.valeurAbsolue()` // {s: 1, n: 1, d: 2, num: 6, den: 12...} nouvel objet FractionX (f || -f) à numérateur et dénominateur positifs.

`f.simplifie()` // {s: -1, n: 1, d: 2, num: -1, den: 2...} nouvel objet FractionX numIrre//num et denIrre//den conserve les signes au même endroit.

`f.oppose()` // {s: 1, n: 1, d: 2, num: 1, den: 2...} nouvel objet FractionX num -> -num

`f.fractionEgale(k)` // {s: -1, n: 1, d: 2, num: -6*k, den: 12*k...} multiplie le num et le den par k. k peut être un entier, un décimal, une FractionX

`f.egal(f2)` // true par exemple si f2=f.simplifie() false si f !== f2

`f.differenceFraction(f2)` // nouvel objet FractionX obtenu en faisant f - f2. (note : le nouvel objet est irréductible)

`f.multiplieEntier(n)` // nouvel objet FractionX tel que num = num * n (note : le dénominateur est le même que celui de f)

`f.entierDivise(n)` // nouvel objet FractionX tel que den = den * n (note : le numérateur est le même que celui de f)

`f.ajouteEntier(n)` // nouvel objet FractionX obtenu en ajoutant n * den au numérateur (note : le dénominateur est le même que celui de f)

`f.entierMoinsFraction(n)` // nouvel objet FractionX obtenu en mettant n * den - num au numérateur (note : le dénominateur est le même que celui de f)

`f.superieurLarge(f2)` // true si f >= f2 (Note : f2 peut être une FractionX ou un nombre quelconque par exemple 1)

`f.estUneSimplification(f2)` // true si f2 = f avec abs(f.num) < abs(f2.num)>

`f.sommeFraction(f2)` // nouvel objet FractionX = f + f2 (note : le résultat est une fraction irréductible car la somme est simplifiée)

`f.sommeFractions(f2,f3,f4)` // nouvel objet FractionX = f + f2 + f3 + f4 (note : le résultat est une fraction irréductible car la somme est simplifiée)

`f.produitFraction(f2)` // nouvel objet FractionX = f * f2 (note : le résultat est une fraction irréductible car la somme est simplifiée)

`f.produitFractions(f2,f3,f4)` // nouvel objet FractionX = f * f2 * f3 * f4 (note : le résultat est une fraction irréductible car le produit est simplifiée)

`f.fractionDecimale()` // nouvel objet FractionX égal à f dont le dénominateur est la plus petite puissance de 10 permettant l'écriture de la valeur décimale de 
`f. retourne NaN si f n'est pas un nombre décimal.

`f.texRacineCarree(detail)` // retourne la chaine Latex correspondant à la racine carrée de f. Si detail est true alors, le calcul détaillé précède le résultat. Valeur par défaut detail = false.

`f.racineCarree()` // false (si la racine carrée de f n'est pas une fraction) sinon l'objet FractionX correspondant à la racine carrée de f

`f.representation(x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '')` // renvoie un tableau d'objets 2d qui donne une représentation de la fraction au point (x,y).
    rayon détermine le rayon du disque ou la taille du segment ou du rectangle
    depart détermine le n° du secteur à partir duquel le coloriage commence (par défaut 0 correspondant au 0° trigo)
    type est au choix : 'gateau' pour un disque, 'segment' pour un segment, 'barre' pour un rectangle
    unite0 et unite1 sont des nombres permettant de définir le pas de graduation : 
        0 et 1 permettent de graduer un segment de longueur int(f.num/f.den)+1 en coupant chaque unité en f.den parts. 
        0 et 10 permettent de graduer un segment d'extrémité 0 et 10 et de colorier la fraction f de ce segment. littéralement la fraction f de 10 (exemple 1/2 de 10)
    scale est la taille pour le texte
    label est un texte à écrire sous la graduation marquant l'extrémité droite du segment. par exemple 'x ?'

`f.representationIrred(x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '')` // renvoie un tableau d'objets 
    c'est la même chose que f.representation() mais le numérateur et le dénominateur sont simplifiés avant de graduer.








