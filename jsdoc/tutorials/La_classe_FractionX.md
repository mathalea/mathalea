La Classe FractionX est une extension de la classe Fraction de mathjs.
Pour définir un objet FractionX (une instance de la classe) on peut utiliser les mêmes syntaxes que pour l'objet Fraction de mathjs à savoir :
new Fraction(numérateur, dénominateur)
new Fraction(valeur décimale)
new Fraction(String) // où String est une chaine décrivant un rationnel. Par exemple '0.(1)' c'est 1/9
Avec la classe FractionX, le numérateur et le dénominateur peuvent aussi être des FractionX !
donc vous pouvez créer un quotient de fractions. // par exemple new Fraction(new Fraction(1,2), new Fraction(4,5)) -> $\frac{\frac{1}{2}}{\frac{4}{3}}$
Pour explorer les propriétés de la classe, voici un exemple : 
Note : certaines redondances peuvent apparaître : c'est du à un soucis de compatibilité avec l'ancienne classe Fraction

const f = new FractionX(-6, 12) // FractionX {s: -1, n: 1, d: 2, num: -6, den: 12, …}
f.num // -6
f.den // 12
f.texFraction // '\dfrac{-6}{12}'
f.texFSD // '-\dfrac{6}{12}' // à la différence de texFractionSignee, si la fraction est positive, il n'y aura pas de signe
f.texFractionSignee // '-\dfrac{6}{12}' // si la fraction est positive, alors il y aura un + devant (c'est redondant avec ecritureAlgebrique car des exos l'utilisent)
f.texFSP // '(-\dfrac{6}{12})' // littéralement 'texFractionSigneeParentheses' Ajoute des parenthèses à texFractionSignee
f.numIrred // -1 c'est f.num simplifié au maximum avec son signe
f.denIrred // 2 c'est f.den simplifié au maximum avec son signe
f.s // -1 (hérité de Fraction)
f.signe // -1 (redondant pour cause d'utilisation dans des exercices.)
f.n // 1 (hérité de Fraction) numérateur réduit positif (mathjs simplifie automatiquement les fractions et en extrait le signe)
f.d // 2 (hérité de Fraction) dénominateur réduit positif
f.pourcentage // -50 valeur de la fraction en % arrondi à 6 chiifres
f.signeString // '-' caractère du signe
f.texFractionSimplifiee // '-\dfrac{1}{2}' redondant avec toLatex() (plus pratique : c'est une propriété et ça n'est pas recalculé) de plus, elle était utilisée par des exos
f.ecritureAlgebrique // '-\dfrac{6}{12}' redondant avec f.texFractionSignee et avec la fonction ecritureAlgebrique(argument) qui accepte maintenant les arguments FractionX
f.ecritureParentheseSiNegatif // '\left(-\dfrac{6}{12}\right)' redondant avec la fonction ecritureParentheseSiNegatif qui accepte maintenant les arguments de type FractionX
f.valeurDecimale // -0.5 valeur décimale si elle existe NaN sinon
f.estEntiere // false (true si f.d===1)
f.estParfaite // false (true si la racine carrée de la fraction est une fraction)
f.estIrreductible // false (true si pgcd(num,den)===1)


Methodes :
f.toLatex() // '-\dfrac{1}{2}' (méthode héritée de Fraction mais modifiée \dfrac remplaçant \frac)
f.toFraction() // {s: -1, n: 1, d: 2} convertit l'objet FractionX et crée un nouvel objet Fraction (mathjs) (quel intérêt ?)
f.valeurAbsolue() // {s: 1, n: 1, d: 2, num: 6, den: 12...} nouvel objet FractionX (f || -f) à numérateur et dénominateur positifs.
f.simplifie() // {s: -1, n: 1, d: 2, num: -1, den: 2...} nouvel objet FractionX numIrre//num et denIrre//den conserve les signes au même endroit.
f.oppose() // {s: 1, n: 1, d: 2, num: 1, den: 2...} nouvel objet FractionX num -> -num
f.fractionEgale(k) // {s: -1, n: 1, d: 2, num: -6*k, den: 12*k...} multiplie le num et le den par k. k peut être un entier, un décimal, une FractionX
f.egal(f2) // true par exemple si f2=f.simplifie() false si f !== f2
f.differenceFraction(f2) // nouvel objet FractionX obtenu en faisant f - f2. (note : le nouvel objet est irréductible)
f.multiplieEntier(n) // nouvel objet FractionX tel que num = num * n (note : le dénominateur est le même que celui de f)
f.entierDivise(n) // nouvel objet FractionX tel que den = den * n (note : le numérateur est le même que celui de f)
f.ajouteEntier(n) // nouvel objet FractionX obtenu en ajoutant n * den au numérateur (note : le dénominateur est le même que celui de f)
f.entierMoinsFraction(n) // nouvel objet FractionX obtenu en mettant n * den - num au numérateur (note : le dénominateur est le même que celui de f)
f.superieurLarge(f2) // true si f >= f2
 


