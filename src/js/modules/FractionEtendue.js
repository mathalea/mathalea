import { arrondi, obtenirListeFacteursPremiers, quotientier, extraireRacineCarree, fractionSimplifiee, listeDiviseurs, pgcd, nombreDeChiffresDansLaPartieDecimale, calcul, miseEnEvidence, ecritureParentheseSiNegatif, signeMoinsEnEvidence, texNombre, egal } from './outils.js'
import { point, vecteur, segment, carre, cercle, arc, translation, rotation, texteParPosition } from './2d.js'
import { Fraction, equal, largerEq, subtract, add, abs, multiply, gcd, larger, smaller, round, lcm, max, min, pow } from 'mathjs'
import { fraction } from './fractions.js'
import { colorToLatexOrHTML } from './2dGeneralites.js'

// Fonction écrite par Daniel Caillibaud pour créer ajouter les propriétés à la première utilisation de celles-ci.
const definePropRo = (obj, prop, get) => {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get,
    set: () => { throw Error(`${prop} est en lecture seule`) }
  })
}
/**
 * La classe FractionX est une extension de la classe Fraction de mathjs
 * @author Jean-Claude Lhote
 * Merci à Daniel Caillibaud pour son aide.
 * Pour créer une instance de la classe FractionX on peut utiliser la fonction fraction() qui se trouve dans le fichier modules/fractions.js
 * Ou utiliser la syntaxe f = new FractionX () qui crée une fraction nulle.
 * On peut utiliser tous les arguments utilisables par Fraction :
 * f = new FractionX ('0.(3)') // crée la fraction $\frac{1}{3}$
 * f = fraction(12,15) // crée la fraction $\frac{12}{15}$ (Remarque : new FractionX(12,15) crée $\frac{4}{5}$)
 * f = fraction(0.4) // crée la fraction $\frac{2}{5}$
 */
class FractionX extends Fraction {
  constructor (...args) {
    let num, den
    if (args.length > 2) {
      window.notify('FractionX : nombre d\'arguments incorrect', { args })
      super(NaN)
    } else {
      if (args.length === 1) { // un seul argument qui peut être un nombre (décimal ou pas)
        num = args[0]
        den = 1
      } else {
        num = args[0]
        den = args[1]
      }
      if (!isNaN(num) && !isNaN(den)) { // Si ce sont des nombres, on les rend entiers si besoin.
        num = Number(num)
        den = Number(den)
        let maxDecimalesNumDen = max(nombreDeChiffresDansLaPartieDecimale(num), nombreDeChiffresDansLaPartieDecimale(den))
        if (maxDecimalesNumDen > 9) { // On peut estimer que num et/ou den ne sont pas décimaux. Essayons de les diviser car peut-être que leur quotient est mieux.
          const quotientNumDen = calcul(num / den, 12)
          // console.log(quotientNumDen)
          if (nombreDeChiffresDansLaPartieDecimale(quotientNumDen) < 9) { // On peut estimer que le quotient aboutit à un décimal. Ex. dans fraction(7/3,14/3)
            num = quotientNumDen
            den = 1
            maxDecimalesNumDen = max(nombreDeChiffresDansLaPartieDecimale(num), nombreDeChiffresDansLaPartieDecimale(den))
          } else { // On peut estimer que le quotient n'aboutit pas à un décimal. Essayons par l'inverse du quotient.
            const quotientDenNum = calcul(den / num, 12)
            // console.log(quotientDenNum)
            if (nombreDeChiffresDansLaPartieDecimale(quotientDenNum) < 9) { // On peut estimer que l'inverse du quotient aboutit à un décimal. Ex. dans fraction(7/3,7/9)
              den = quotientDenNum
              num = 1
              maxDecimalesNumDen = max(nombreDeChiffresDansLaPartieDecimale(num), nombreDeChiffresDansLaPartieDecimale(den))
            } else { // num et/ou den non décimaux et leurs quotients n'aboutissent pas à un décimal. Essayons par l'inverse de chaque nombre.
              const inverseNum = calcul(1 / num, 12)
              const inverseDen = calcul(1 / den, 12)
              maxDecimalesNumDen = max(nombreDeChiffresDansLaPartieDecimale(inverseNum), nombreDeChiffresDansLaPartieDecimale(inverseDen))
              if (maxDecimalesNumDen < 13) { // Ex. dans fraction(1/3,1/7)
                den = inverseNum
                num = inverseDen
              // console.log(inverseNum, ' ', inverseDen)
              } else { // Méthode plus bourrin
                const testMAX = 2000 // Voir explications ci-dessous
                // Ici, JCL, cela veut dire qu'on traite toutes les fractions de fractions où chaque numérateur ou dénominateur est inférieur à 1000.
                // Si tu veux davantage que 1000, il faut augmenter ce nombre et dimininuer alors le nb de décimales de test fixé ici à 9.
                let iDen = 1
                let denTest = den
                let inverseDenTest = inverseDen
                // console.log(denTest, ' ', inverseDenTest)
                while (min(nombreDeChiffresDansLaPartieDecimale(denTest), nombreDeChiffresDansLaPartieDecimale(inverseDenTest)) > 9 & iDen < testMAX) {
                  iDen += (iDen % 5 === 3) ? 4 : 2
                  denTest = calcul(den * iDen, 10)
                  inverseDenTest = calcul(inverseDen * iDen, 10)
                // while (min(nombreDeChiffresDansLaPartieDecimale(denTest), nombreDeChiffresDansLaPartieDecimale(inverseDenTest)) > 13 & iDen < testMAX) {
                }
                let iNum = 1
                let numTest = num
                let inverseNumTest = inverseNum
                // console.log(numTest, ' ', inverseNumTest)
                // console.log(iNum, ' ', numTest, ' ', inverseNumTest)
                while (min(nombreDeChiffresDansLaPartieDecimale(numTest), nombreDeChiffresDansLaPartieDecimale(inverseNumTest)) > 9 & iNum < testMAX) {
                  iNum += (iNum % 5 === 3) ? 4 : 2
                  numTest = calcul(num * iNum, 10)
                  inverseNumTest = calcul(inverseNum * iNum, 10)
                }
                // console.log(iNum, ' ', numTest, ' ', inverseNumTest)
                if (nombreDeChiffresDansLaPartieDecimale(numTest) < 10) {
                  if (nombreDeChiffresDansLaPartieDecimale(denTest) < 10) { // Ex. console.log(new FractionX(11 / 9, 17 / 13))
                  // console.log('toto')
                    num = calcul(numTest * iDen, 10)
                    den = calcul(denTest * iNum, 10)
                  } else { // Ex. console.log(new FractionX(11 / 9, 13 / 17))
                  // console.log('titi')
                    num = calcul(numTest * inverseDenTest, 10)
                    den = iDen * iNum
                  }
                } else {
                  if (nombreDeChiffresDansLaPartieDecimale(denTest) < 10) { // Ex. console.log(new FractionX(9 / 11, 17 / 13))
                  // console.log('tata')
                    den = calcul(denTest * inverseNumTest, 10)
                    num = iDen * iNum
                  } else { // Ex. console.log(new FractionX(9 / 11, 13 / 17))
                  // console.log('tutu')
                    den = calcul(inverseNumTest * iDen, 10)
                    num = calcul(inverseDenTest * iNum, 10)
                  }
                }
                maxDecimalesNumDen = max(nombreDeChiffresDansLaPartieDecimale(num), nombreDeChiffresDansLaPartieDecimale(den))
              // console.log(num, ' ', den)
              }
            }
          }
        }
        den = round(den * pow(10, maxDecimalesNumDen))
        num = round(num * pow(10, maxDecimalesNumDen))
        super(num, den)
        this.num = num
        this.den = den
      } else {
        super(NaN)
      }
    }
    this.type = 'FractionX'
    // pour ne pas faire ces calculs à chaque instanciation de Fraction, on passe par defineProperty
    // (qui permet de ne faire le calcul qu'à la première lecture de la propriété)
    /**
     * Numérateur réduit // Le numérateur réduit peut être négatif
     * @property numIrred
     * @type {number}
     */
    let numIrred
    Object.defineProperty(this, 'numIrred', {
      enumerable: true,
      get: () => {
        if (!numIrred) numIrred = fractionSimplifiee(this.num, this.den)[0]
        return numIrred
      },
      set: () => { throw Error('\'numIrred\' est en lecture seule') }
    })

    /**
     * Dénominateur réduit // le dénominateur réduit est toujours positif.
     * @property denIrred
     * @type {number}
     */
    let denIrred
    definePropRo(this, 'denIrred', () => {
      if (!denIrred) denIrred = fractionSimplifiee(this.num, this.den)[1]
      return denIrred
    })

    /**
        * Valeur de la fraction × 100
        * @property pourcentage
        * @type {number}
        */
    let pourcentage
    definePropRo(this, 'pourcentage', () => {
      if (!pourcentage) pourcentage = arrondi(this.s * this.n * 100 / this.d, 2)
      return pourcentage
    })

    /**
     * le signe de la fraction : -1 pour négatif , 0 ou 1 pour positif
     * @type {number}
     */
    let sign
    definePropRo(this, 'signe', () => {
      if (!sign) sign = this.s
      return sign
    })
    let signeString
    definePropRo(this, 'signeString', () => {
      if (!signeString) signeString = this.s === -1 ? '-' : '+'
      return signeString
    })

    /**
     * num/den
     * @property texFraction
     * @type {string}
     */
    let texFraction // num/den mais sans traitement des signes des numérateur et dénominateur
    definePropRo(this, 'texFraction', () => {
      if (!texFraction) texFraction = this.den === 1 ? `${texNombre(this.num)}` : `\\dfrac{${texNombre(this.num)}}{${texNombre(this.den)}}`
      return texFraction
    })

    /**
     * num/den
     * @property texFractionSR
     * @type {string}
     */
    let texFractionSR // num/den mais sans traitement des signes des numérateur et dénominateur
    definePropRo(this, 'texFractionSR', () => {
      if (!texFractionSR) texFractionSR = `\\dfrac{${signeMoinsEnEvidence(this.num)}}{${signeMoinsEnEvidence(this.den)}}`
      return texFractionSR
    })

    /**
       * num/den mais avec simplification des signes (numérateur et dénominateur positifs, signe - eventuellement devant.)
       * @property texFSD littéralement texFractionSigneDevant (si c'est un moins sinon rien... pour avoir le + devant, utiliser ecritureAlgebrique)
       * @type {string}
       */
    let texFSD
    definePropRo(this, 'texFSD', () => {
      if (!texFSD) texFSD = this.s === -1 ? Math.abs(this.den) === 1 ? '-' + String(texNombre(Math.abs(this.num))) : `-\\dfrac{${texNombre(Math.abs(this.num))}}{${texNombre(Math.abs(this.den))}}` : Math.abs(this.den) === 1 ? String(texNombre(Math.abs(this.num))) : `\\dfrac{${texNombre(Math.abs(this.num))}}{${texNombre(Math.abs(this.den))}}`
      return texFSD
    })

    /**
     * + n/d si positif, - n/d si négatif
     * propriété qui n'est pas très utile puisque ecritureAlgebrique gère les fractions maintenant (défini pour compatibilité avec les exos qui l'utilisent)
     * @property texFractionSignee
     * @type {string}
     */
    let texFractionSignee
    definePropRo(this, 'texFractionSignee', () => {
      if (!texFractionSignee) texFractionSignee = (this.s === -1) ? this.texFSD : '+' + this.texFSD
      return texFractionSignee
    })

    /**
     * -1 => '-'
     * 1 => ''
     * inchangé sinon
     * permet d'écrire le coefficient devant une lettre ou une parenthèse
     * @property texFractionSaufUn
     * @type {string}
     */
    let texFractionSaufUn
    definePropRo(this, 'texFractionSaufUn', () => {
      if (!texFractionSaufUn) texFractionSaufUn = (this.valeurDecimale === -1) ? '-' : (this.valeurDecimale === 1) ? '' : this.texFSD
      return texFractionSaufUn
    })

    /**
     * -1 => '-'
     * 1 => '+'
     * texFractionSignee sinon
     * permet d'écrire le coefficient devant une lettre ou une parenthèse
     * @property texFractionSaufUnSignee
     * @type {string}
     */
    let texFractionSaufUnSignee
    definePropRo(this, 'texFractionSaufUnSignee', () => {
      if (!texFractionSaufUnSignee) texFractionSaufUnSignee = (this.valeurDecimale === -1) ? '-' : (this.valeurDecimale === 1) ? '+' : this.texFractionSignee
      return texFractionSaufUnSignee
    })

    /**
     * num/den si positif, (- num/den) sinon
     * @property texFSP littéralement texFractionSigneParentheses
     * @type {string}
     */
    let texFSP
    definePropRo(this, 'texFSP', () => {
      if (!texFSP) texFSP = (this.s > 0) ? this.texFSD : '\\left(' + this.texFSD + '\\right)'
      return texFSP
    })
    /**
 * retourne la fraction mis entre parenthèses notamment pour l'exponentiation.
 */
    let texParentheses
    definePropRo(this, 'texParentheses', () => {
      if (!texParentheses) texParentheses = this.den === 1 && this.s === 1 ? this.texFSD : '\\left(' + this.texFSD + '\\right)'
      return texParentheses
    })

    /**
     * le code LaTeX de la fraction simplifiée
     * @property texFractionSimplifiee
     * @type {string}
     */
    let texFractionSimplifiee
    definePropRo(this, 'texFractionSimplifiee', () => {
      if (!texFractionSimplifiee) texFractionSimplifiee = (new FractionX(this.numIrred, this.denIrred)).texFSD
      return texFractionSimplifiee
    })

    /**
     * le code LaTeX de l'écriture algébrique de la fraction
     * Pour compatibilité avec les anciens exos... la fonction de outils.js ecritureAlgebrique() est compatible avec les fractions
     * @property ecritureAlgebrique
     * @type {string}
     */
    let ecritureAlgebrique
    definePropRo(this, 'ecritureAlgebrique', () => {
      if (!ecritureAlgebrique) ecritureAlgebrique = this.s === 1 ? '+' + this.texFSD : this.texFSD
      return ecritureAlgebrique
    })

    /**
     * le code LaTeX de l'écriture avec parenthèse si négatif
     * @property ecritureParentheseSiNegatif
     * @type {string}
     */
    let ecritureParentheseSiNegatif
    definePropRo(this, 'ecritureParentheseSiNegatif', () => {
      if (!ecritureParentheseSiNegatif) ecritureParentheseSiNegatif = this.s === 1 ? this.texFSD : '\\left(' + this.texFSD + '\\right)'
      return ecritureParentheseSiNegatif
    })

    /**
     * Valeur décimale de la fraction (arrondie à la sixième décimale)
     * @property valeurDecimale
     * @type {number}
     */
    let valeurDecimale
    definePropRo(this, 'valeurDecimale', () => {
      if (!valeurDecimale) valeurDecimale = arrondi(this.n * this.s / this.d, 6)
      return valeurDecimale
    })

    /**
     * true si la fraction est un entier false sinon
     */
    let estEntiere
    definePropRo(this, 'estEntiere', () => {
      if (!estEntiere) estEntiere = this.d === 1
      return estEntiere
    })
    /**
 * @returns true si la FractionX est le carré d'une fractionX
 */
    let estParfaite
    definePropRo(this, 'estParfaite', () => {
      if (!estParfaite) estParfaite = this.racineCarree() !== false
      return estParfaite
    })

    /**
 * @returns true si la FractionX est irréductible
 */
    let estIrreductible
    definePropRo(this, 'estIrreductible', () => {
      if (!estIrreductible) estIrreductible = gcd(this.num, this.den) === 1 && this.den !== 1
      return estIrreductible
    })

    /**
   * basé sur la méthode toLatex() de mathjs, on remplace \frac par \dfrac plus joli.
   * @returns la chaine Latex pour écrire la fraction (signe devant)
   */
  }

  toLatex () {
    const text = super.toLatex()
    return text.replace('\\frac', '\\dfrac')
  }

  sommeFractions (...fractions) { // retourne un résultat simplifié
    let s = fraction(this.s * this.n, this.d)
    for (const f of fractions) {
      s = fraction(add(s, f))
    }
    return s.simplifie()
  }

  /**
 * @returns la FractionX irreductible
 */
  simplifie () { return new FractionX(abs(this.num) * this.s / gcd(abs(this.num), abs(this.den)), abs(this.den) / gcd(abs(this.num), abs(this.den))) }

  /**
 * Convertit la FractionX en Fraction
 * @returns un objet Fraction (mathjs)
 */
  toFraction () { return new Fraction(this.n * this.s, this.d) }

  /**
 * Convertit la FractionX en Fraction
 * @returns un objet Fraction (mathjs)
 */
  valeurAbsolue () { return fraction(abs(this.n), abs(this.d)) }
  /**
 * @returns l'opposé de la FractionX
 */
  oppose () { return fraction(-1 * this.num, this.den) }
  /**
 * On pourra utiliser k = 0.5 pour simplifier par 2 la fraction par exemple.
 * @param {coefficient} k
 * @returns La FractionX dont le numérateur et le dénominateur ont été multipliés par k.
 */
  reduire (k) {
    const num = multiply(this.num, k)
    const den = multiply(this.den, k)
    return fraction(num, den)
  }

  /**
 * @param {FractionX | Fraction} f
 * @returns true si la FractionX est égale à la fraction passée en argument.
 */
  isEqual (f2) { return equal(this, f2) }
  /**
 * @param {FractionX | Fraction} f
 * @returns la fractionX - f résultat simplifié
 */
  differenceFraction (f) { return fraction(subtract(this, f)) }

  /**
 * @param {coefficient} n
 * @returns La fractionX multipliée par n (numérateur n fois plus grand)
 */
  multiplieEntier (n) { return fraction(this.num * n, this.den) }

  /**
  * @param {coefficient} n
  * @returns La FractionX divisée par n (denominateur n fois plus grand)
  */
  entierDivise (n) { return fraction(this.num, n * this.den) }
  /**
  *
  * @param {number} n
  * @returns n + la FractionX
  */
  ajouteEntier (n) { return fraction(this.num + n * this.den, this.den) }

  /**
  * @param {number} n
  * @returns n - la FractionX
  */
  entierMoinsFraction (n) { return fraction(n * this.den - this.num, this.den) }

  /**
  *
  * @param {FractionX | Fraction | nombre} f
  * @returns true si FractionX >= f
  */
  superieurLarge (f2) { return largerEq(this, f2) }

  /**
    * fonctions de comparaison avec une autre fraction.
    * @param {FractionX | Fraction | nombre} f2
    * @return {boolean} true si
    */
  superieurstrict (f2) {
    return (larger(this, f2))
  }

  /**
    * Retourne true si la fraction courante est strictement inférieure à f2
    * @param {FractionX | Fraction | nombre} f2
    * @return {boolean}
    */
  inferieurstrict (f2) {
    return (smaller(this, f2))
  }

  /**
    * Retourne true si la fraction courante est inférieure ou égale à f2
    * @param {FractionX | Fraction | nombre} f2
    * @return {boolean}
    */
  inferieurlarge (f2) {
    return (this.n / this.d) < (f2.n / f2.d)
  }

  /**
  *
  * @param {FractionX} f2
  * @returns true si f2 = f et  f2 est plus réduite que f
  */
  estUneSimplification (f2) { return (equal(this, f2) && abs(this.num) < abs(f2.num)) }

  /**
  *
  * @param {FractionX | Fraction | nombre} f2
  * @returns f + FractionX
  */
  sommeFraction (f2) {
    if (this.den === f2.den) { // on ajoute 2 fractions de même dénominateur
      return fraction(this.num + f2.num, f2.den)
    } else if ([this.den, f2.den].indexOf(lcm(this.den, f2.den)) !== -1) { // un dénominateur est multiple de l'autre
      if (this.den === lcm(this.den, f2.den)) { // c'est this qui a le dénominateur commun.
        return fraction(this.num + f2.num * round(this.den / f2.den), this.den) // on transforme f2
      } else { // c'est f2 qui a le dénominateur commun
        return fraction(f2.num + this.num * round(f2.den / this.den), f2.den) // on transforme this
      }
    } else { // besoin d'établir le dénominateur commun.
      return fraction(this.num * round(lcm(this.den, f2.den) / this.den) + f2.num * round(lcm(this.den, f2.den) / f2.den), lcm(this.den, f2.den))
    }
  }

  /**
  * @param {FractionX | Fraction | nombre} f2
  * @returns f * FractionX  // retourne un non résultat simplifié
  */
  produitFraction (f2) {
    if (f2 instanceof FractionX) {
      return new FractionX(this.num * f2.num, this.den * f2.den)
    } else if (f2 instanceof Fraction) {
      return new FractionX(this.num * f2.d * f2.s, this.den * f2.d)
    } else if (typeof f2 === 'number') {
      return new FractionX(this.num * f2, this.den)
    } else {
      window.notify('FractionX.produitFraction() a reçu un argument bizarre', { f2 })
      return null
    }
  }

  /**
  * @param  {...any} fractions
  * @returns produit de FractionX par toutes les fractions passées en argument.
  */
  produitFractions (...fractions) { // retourne un résultat simplifié
    let s = fraction(this.s * this.n, this.d)
    for (const f of fractions) {
      s = fraction(multiply(s, f))
    }
    return s.simplifie()
  }

  /**
    * @param {Fraction} f2 la fraction qui multiplie.
    *  @param {string} simplification true si on veut afficher la simplification par décomposition false si on veut celle par le pgcd et 'none' si on ne veut pas simplifier
    * @return {string} Le calcul du produit de deux fractions avec étape intermédiaire
    */
  texProduitFraction (f2, simplification = 'none') {
    if (this.estEntiere) {
      return `${this.texFraction}\\times ${f2.texFSP}=\\dfrac{${this.simplifie().num + '\\times' + ecritureParentheseSiNegatif(f2.num)}}{${ecritureParentheseSiNegatif(f2.den)}}
      ${simplification === 'none' || this.produitFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.num * f2.num + '}{' + this.den * f2.den + '}'
      : this.produitFraction(f2).texSimplificationAvecEtapes(simplification)}`
    } else {
      return `${this.texFraction}\\times ${f2.texFSP}=\\dfrac{${this.num + '\\times' + ecritureParentheseSiNegatif(f2.num)}}{${this.den + '\\times' + ecritureParentheseSiNegatif(f2.den)}}
    ${simplification === 'none' || this.produitFraction(f2).estIrreductible
    ? '=\\dfrac{' + this.num * f2.num + '}{' + this.den * f2.den + '}'
    : this.produitFraction(f2).texSimplificationAvecEtapes(simplification)}`
    }
  }

  /**
  * @param {FractionX} f2 la fraction qui multiplie.
  * @param {string} simplification true si on veut afficher la simplification par décomposition false si on veut celle par le pgcd et 'none' si on ne veut pas simplifier
  *  @param {string} symbole '/' pour la forme fractionnaire de la division, ':' ou autre chose pour l'obèle
  * @return {string} Le calcul du produit de deux fractions avec étape intermédiaire
  */
  texDiviseFraction (f2, simplification = 'none', symbole = '/') {
    const space = '\\phantom{\\dfrac{(_(^(}{(_(^(}}' // Utilisé pour mettre de l'espace dans une fraction de fraction
    const space2 = '\\phantom{(_(^(}' // Utilisé pour mettre de l'espace dans une fraction de fraction lorsque le numérateur ou le dénominateur est entier
    if (this.estEntiere) {
      if (f2.inverse().estEntiere && f2.num === 1) {
        if (symbole === '/') {
          return `\\dfrac{${space2 + this.texFraction + space2}}{${(f2.estEntiere ? space2 : space) + f2.texFraction + (f2.estEntiere ? space2 : space)}}=${this.simplifie().texFSD}\\times ${f2.inverse().simplifie().texFSP}=${this.simplifie().num * f2.inverse().simplifie().num}`
          // pas de simplification : on multiplie deux entiers !
        } else {
          return `${this.simplifie().texFraction}\\div${f2.texFraction}=${this.simplifie().texFSD}\\times ${f2.inverse().simplifie().texFSP}=${this.simplifie().num * f2.inverse().simplifie().num}`
          // pas de simplification : on multiplie deux entiers !
        }
      } else {
        if (symbole === '/') {
          return `\\dfrac{${space2 + this.texFraction + space2}}{${(f2.estEntiere ? space2 : space) + f2.texFraction + (f2.estEntiere ? space2 : space)}}=${this.texFractionSimplifiee}\\times ${f2.inverse().texFraction}=\\dfrac{${this.texFractionSimplifiee + '\\times ' + ecritureParentheseSiNegatif(f2.den)}}{${ecritureParentheseSiNegatif(f2.num)}}
      ${simplification === 'none' || this.diviseFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.simplifie().num * f2.den + '}{' + f2.num + '}'
      : this.simplifie().diviseFraction(f2).texSimplificationAvecEtapes(simplification)}`
        } else {
          return `${this.texFraction}\\div${f2.texFraction}=${this.texFractionSimplifiee}\\times ${f2.inverse().texFraction}=\\dfrac{${this.texFractionSimplifiee + '\\times ' + ecritureParentheseSiNegatif(f2.den)}}{${ecritureParentheseSiNegatif(f2.num)}}
      ${simplification === 'none' || this.diviseFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.simplifie().num * f2.den + '}{' + f2.num + '}'
      : this.simplifie().diviseFraction(f2).texSimplificationAvecEtapes(simplification)}`
        }
      }
    } else {
      if (f2.inverse().estEntiere && f2.num === 1) {
        if (symbole === '/') {
          return `\\dfrac{${space + this.texFraction + space}}{${(f2.estEntiere ? space2 : space) + f2.texFraction + (f2.estEntiere ? space2 : space)}}=${this.texFraction}\\times ${f2.inverse().simplifie().texFSP}=\\dfrac{${this.num + '\\times ' + f2.inverse().simplifie().texFSP}}{${this.den}}
      ${simplification === 'none' || this.diviseFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.num * f2.den + '}{' + this.den * f2.num + '}'
      : this.diviseFraction(f2).texSimplificationAvecEtapes(simplification)}`
        } else {
          return `${this.texFraction}\\div${f2.texFraction}=${this.texFraction}\\times ${f2.inverse().texFractionSimplifiee}=\\dfrac{${this.num + '\\times ' + f2.inverse().texFractionSimplifiee}}{${this.den}}
      ${simplification === 'none' || this.diviseFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.num * f2.den + '}{' + this.den * f2.num + '}'
      : this.diviseFraction(f2).texSimplificationAvecEtapes(simplification)}`
        }
      } else {
        if (symbole === '/') {
          return `\\dfrac{${space + this.texFraction + space}}{${(f2.estEntiere ? space2 : space) + f2.texFraction + (f2.estEntiere ? space2 : space)}}=${this.texFraction}\\times ${f2.inverse().texFraction}=\\dfrac{${this.num + '\\times ' + ecritureParentheseSiNegatif(f2.den)}}{${this.den + '\\times ' + ecritureParentheseSiNegatif(f2.num)}}
      ${simplification === 'none' || this.diviseFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.num * f2.den + '}{' + this.den * f2.num + '}'
      : this.diviseFraction(f2).texSimplificationAvecEtapes(simplification)}`
        } else {
          return `${this.texFraction}\\div${f2.texFraction}=${this.texFraction}\\times ${f2.inverse().texFraction}=\\dfrac{${this.num + '\\times ' + f2.den}}{${this.den + '\\times ' + f2.num}}
      ${simplification === 'none' || this.diviseFraction(f2).estIrreductible
      ? '=\\dfrac{' + this.num * f2.den + '}{' + this.den * f2.num + '}'
      : this.diviseFraction(f2).texSimplificationAvecEtapes(simplification)}`
        }
      }
    }
  }

  /**
    * @param {number} n l'exposant de la fraction
    * @return {FractionX} La puissance n de la fraction
    */
  puissanceFraction (n) {
    return fraction(this.num ** n, this.den ** n)
  }

  /**
  * @returns l'inverse de la fraction
  */
  inverse () {
    const f = this
    if (this.n !== 0) return new FractionX(this.den, this.num)
    else {
      window.notify('FractionX.inverse() : division par zéro', { f })
      return NaN
    }
  }

  /**
    *
    * @param {Fraction} f2
    * @return {Fraction} f/f2
    */
  diviseFraction (f2) {
    if (['Fraction', 'FractionX'].indexOf(f2.type) === -1) {
      window.notify('FractionX.diviseFraction() : l\'argument n\'est pas une fraction', { f2 })
      if (!Number().isNaN(f2)) return this.multiplieEntier(1 / f2)
      else window.notify('FractionX.diviseFraction() : l\'argument n\'est pas un nombre', { f2 })
    } else return this.produitFraction(f2.inverse())
  }

  /**
    * @param {number} n entier divisé par la fraction
    * @return {Fraction} n divisé par fraction
    */
  diviseEntier (n) {
    return new FractionX(n * this.d, this.n)
  }

  /**
    *
    * @param {FractionX} f2
    * @return {string} Calcul f/f2 avec les étapes mais sans simplification
    */
  texQuotientFraction (f2) {
    return `${this.texFraction}\\div ${f2.texFraction}=${this.texFraction}\\times ${f2.inverse().texFraction}=\\dfrac{${this.num + '\\times' + f2.den}}{${this.den + '\\times' + f2.num}}=\\dfrac{${this.num * f2.den}}{${this.den * f2.num}}`
  }

  /**
 * Si la fraction est réductible, retourne une suite d'égalités permettant d'obtenir la fraction irréductible
 */
  texSimplificationAvecEtapes (factorisation = false) {
    if (this.estIrreductible && this.num > 0 && this.den > 0) return '' // irreductible et positifs
    else if (this.estIrreductible && this.num * this.den < 0) { // irréductible mais négatifs
      return `=${this.texFSD}`
    } else {
      if (factorisation) {
        const signe = this.signe === -1 ? '-' : ''
        const num = Math.abs(this.num)
        const den = Math.abs(this.den)
        const listenum = obtenirListeFacteursPremiers(num)
        const listeden = obtenirListeFacteursPremiers(den)
        let result = '='
        const listeNumvf = []
        const listeDenvf = []
        listenum.forEach(function aAjouterDansListeAvf (element) {
          listeNumvf.push([element, true])
        })
        listeden.forEach(function aAjouterDansListeBvf (element) {
          listeDenvf.push([element, true])
        })

        for (let index = 0; index < listeden.length;) {
          for (let j = 0; j <= listenum.length;) {
            if (listeden[index] === listenum[j]) {
              listeDenvf[index] = [listeden[index], false]
              listeNumvf[j] = [listenum[j], false]
              listenum[j] = 1
              listeden[index] = 1
              break
            }
            j++
          }
          index++
        }

        let a = 1
        let b = 1
        for (const k of listenum) {
          a = a * k
        }
        for (const k of listeden) {
          b = b * k
        }

        let numerateur = ''
        let denominateur = ''

        for (const j in listeNumvf) {
          if (listeNumvf[j][1] === true) {
            numerateur += listeNumvf[j][0] + '\\times'
          } else {
            numerateur += '\\cancel{' + listeNumvf[j][0] + '}\\times'
          }
        }
        numerateur = numerateur.substring(0, numerateur.length - 6)

        for (const j in listeDenvf) {
          if (listeDenvf[j][1] === true) {
            denominateur += listeDenvf[j][0] + '\\times'
          } else {
            denominateur += '\\cancel{' + listeDenvf[j][0] + '}\\times'
          }
        }
        denominateur = denominateur.substring(0, denominateur.length - 6)

        result += `${signe}\\dfrac{${numerateur}}{${denominateur}}`
        result += `=${signe}${new FractionX(a, b).simplifie().texFraction}`
        return result
      } else {
        const signe = this.signe === -1 ? '-' : ''
        const num = Math.abs(this.num)
        const den = Math.abs(this.den)
        const pgcd = gcd(num, den)
        if (pgcd !== 1) {
          let redaction = `=${signe}\\dfrac{${num / pgcd}${miseEnEvidence('\\times' + ecritureParentheseSiNegatif(pgcd))} }{${den / pgcd}${miseEnEvidence('\\times' + ecritureParentheseSiNegatif(pgcd))}}=`
          if (Math.abs(den / pgcd) !== 1) redaction += `${signe}\\dfrac{${Math.abs(num / pgcd)}}{${Math.abs(den / pgcd)}}`
          else redaction += `${signe}${Math.abs(num / pgcd)}`
          return redaction
        } else {
          if (!egal(Math.abs(den / pgcd), 1)) return `=${signe}\\dfrac{${Math.abs(num / pgcd)}}{${Math.abs(den / pgcd)}}`
          else return `=${signe}${Math.abs(num / pgcd)}`
        }
      }
    }
  }

  /**
  * @returns NaN si la FractionX n'est pas un nombre décimal sinon retourne une FractionX avec la bonne puissance de 10 au dénominateur
  */
  fractionDecimale () {
    const f = this
    const den = this.simplifie().d
    const num = this.simplifie().n
    const signe = this.simplifie().s
    const liste = obtenirListeFacteursPremiers(den)
    let n2 = 0; let n5 = 0
    for (const n of liste) {
      if (n === 2) { n2++ } else if (n === 5) { n5++ } else {
        window.notify('FractionX.valeurDecimale : Fraction non décimale', { f })
        return NaN
      }
    }
    if (n5 === n2) {
      return fraction(num * signe, den)
    } else if (n5 > n2) {
      return fraction(signe * num * 2 ** (n5 - n2), den * 2 ** (n5 - n2))
    } else {
      return fraction(signe * num * 5 ** (n2 - n5), den * 5 ** (n2 - n5))
    }
  }

  /**
    * Retourne la chaine latex contenant la racine carrée de la fraction
    * @param {boolean} detaillee Si detaillee est true, une étape de calcul se place avant le résultat.
    * @return {FractionX}
    */
  texRacineCarree (detaillee = false) {
    if (this.s === -1) return false
    let factoDen = extraireRacineCarree(Math.abs(this.den))
    let factoNum
    let etape
    if (this.d !== 1) {
      etape = detaillee ? `\\sqrt{\\dfrac{${this.num}}{${this.den}}}=` : ''
    } else {
      factoNum = extraireRacineCarree(Math.abs(this.num))
      if (factoNum[0] !== 1) {
        etape = detaillee ? `\\sqrt{${this.num}}=` : ''
      } else {
        etape = ''
      }
    }
    if (factoDen[1] !== 1) {
      if (this.d !== 1) {
        etape += detaillee ? `\\sqrt{\\dfrac{${Math.abs(this.num)}\\times ${factoDen[1]}}{${Math.abs(this.den)}\\times ${factoDen[1]}}}=` : ''
        etape += detaillee ? `\\sqrt{\\dfrac{${Math.abs(this.num * factoDen[1])}}{${Math.abs(this.den * factoDen[1])}}}=` : ''
      }
      factoNum = extraireRacineCarree(Math.abs(this.num * factoDen[1]))
      factoDen = extraireRacineCarree(Math.abs(this.den * factoDen[1]))
    } else {
      factoNum = extraireRacineCarree(Math.abs(this.num))
    }
    const k = fraction(factoNum[0], factoDen[0]).simplifie()
    const r = fraction(factoNum[1], factoDen[1]).simplifie()

    if (detaillee) {
      if (k.valeurDecimale !== 1) {
        if (k.d === 1) {
          etape += detaillee ? `\\sqrt{${factoNum[0]}^2\\times${factoNum[1]}}=` : ''
          etape += detaillee ? `${factoNum[0]}${factoNum[1] !== 1 ? '\\sqrt{' + factoNum[1] + '}' : '}'}` : ''
        } else {
          if (factoNum[0] !== 1) {
            etape += detaillee ? `\\sqrt{\\dfrac{${factoNum[0]}^2${factoNum[1] !== 1 ? '\\times ' + factoNum[1] : ''}}{${factoDen[0]}^2${factoDen[1] !== 1 ? '\\times' + factoDen[1] : ''}}}=` : ''
            etape += detaillee ? `\\dfrac{${factoNum[0]}${factoNum[1] !== 1 ? '\\times\\sqrt{' + factoNum[1] + '}' : ''}}{${factoDen[0]}${factoDen[1] !== 1 ? '\\times\\sqrt{' + factoDen[1] + '}' : ''}}=` : ''
          } else {
            if (factoDen[1] !== 1) {
              etape += detaillee ? `\\sqrt{\\dfrac{${factoNum[1]}}{${factoDen[0]}^2\\times ${factoDen[1]}}}=` : ''
            } else {
              etape += detaillee ? `\\sqrt{\\dfrac{${factoNum[1]}}{${factoDen[0]}^2}}=` : ''
            }
          }
        }
      }
    }

    if (arrondi(factoNum[1] / factoDen[1], 6) === 1) {
      return etape + k.texFraction
    } else {
      if (k.n === 1 && k.d !== 1) {
        if (r.d === 1) {
          return (k.valeurDecimale === 1 ? etape : etape + `\\dfrac{\\sqrt{${r.n}}}{${k.d}}`)
        } else {
          return (k.valeurDecimale === 1 ? etape : etape + k.texFraction) + `\\sqrt{${r.toLatex()}}`
        }
      } else {
        return (k.valeurDecimale === 1 ? etape : etape + k.texFraction) + `\\sqrt{${r.toLatex()}}`
      }
    }
  }

  /**
    * Retourne la racine carrée de la fraction si c'est une fraction et false sinon
    * @param {boolean} detaillee Si detaillee est true, une étape de calcul se place avant le résultat.
    * @return {FractionX}
    */
  racineCarree () {
    const factoNum = extraireRacineCarree(Math.abs(this.num))
    const factoDen = extraireRacineCarree(Math.abs(this.den))
    const k = fraction(factoNum[0], factoDen[0]).simplifie()
    const r = fraction(factoNum[1], factoDen[1]).simplifie()
    if (r.valeurDecimale !== 1 || this.s === -1) {
      return false
    } else {
      return k
    }
  }

  /**
  *
  * @param {number} x position du dessin
  * @param {number} y
  * @param {number} rayon rayon du disque
  * @param {number} depart numéro du secteur où commence le coloriage
  * @param {string} type type parmis : 'gateau', 'segment' et 'barre'
  * @param {string} couleur
  * @param {number} unite0 Nombre marquant le départ du segment
  * @param {number} unite1 Nombre marquant le point unité du segment
  * @param {number} scale échelle
  * @param {string} label ce qu'il faut écrire sous le segment ... x ?
  * @returns objets mathalea2d
  */
  representationIrred (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '') {
    let num, k, dep, s, a, O, C
    const objets = []
    const n = quotientier(this.numIrred, this.denIrred)
    num = this.numIrred
    const unegraduation = function (x, y, couleur = 'black', epaisseur = 1) {
      const A = point(x, y + 0.2)
      const B = point(x, y - 0.2)
      const g = segment(A, B, couleur)
      g.epaisseur = epaisseur
      return g
    }
    if (type === 'gateau') {
      for (k = 0; k < n; k++) {
        O = point(x + k * 2 * (rayon + 0.5), y)
        C = cercle(O, rayon)
        objets.push(C)
        for (let i = 0; i < this.denIrred; i++) {
          s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - i * 360 / this.denIrred))
          objets.push(s)
        }
        dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - depart * 360 / this.denIrred)
        for (let j = 0; j < Math.min(this.denIrred, num); j++) {
          a = arc(dep, O, -360 / this.denIrred, true, couleur)
          a.opacite = 0.3
          dep = rotation(dep, O, -360 / this.denIrred)
          objets.push(a)
        }
        num -= this.denIrred
      }
      if (this.n % this.d !== 0) {
        O = point(x + k * 2 * (rayon + 0.5), y)
        C = cercle(O, rayon)
        objets.push(C)
        for (let i = 0; i < this.denIrred; i++) {
          s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - i * 360 / this.denIrred))
          objets.push(s)
        }
        dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - depart * 360 / this.denIrred)
        for (let j = 0; j < Math.min(this.denIrred, num); j++) {
          a = arc(dep, O, -360 / this.denIrred, true, couleur)
          a.opacite = 0.3
          dep = rotation(dep, O, -360 / this.denIrred)
          objets.push(a)
        }
      }
    } else if (type === 'segment') {
      for (k = 0; k < n; k++) {
        O = point(x + k * rayon, y)
        C = translation(O, vecteur(rayon, 0))
        s = segment(O, C)
        s.styleExtremites = '-|'
        objets.push(s)
        for (let i = 0; i < this.denIrred; i++) {
          s = segment(translation(O, vecteur(i * rayon / this.denIrred, 0)), translation(O, vecteur((i + 1) * rayon / this.denIrred, 0)))
          s.styleExtremites = '|-'
          objets.push(s)
        }
        a = segment(O, point(O.x + Math.min(num, this.denIrred) * rayon / this.denIrred, O.y), couleur)
        a.opacite = 0.4
        a.epaisseur = 6
        objets.push(a)
        num -= this.denIrred
      }
      O = point(x + k * rayon, y)
      C = translation(O, vecteur(rayon, 0))
      s = segment(O, C)
      s.styleExtremites = '-|'
      objets.push(s)
      for (let i = 0; i < this.denIrred; i++) {
        s = segment(translation(O, vecteur(i * rayon / this.denIrred, 0)), translation(O, vecteur((i + 1) * rayon / this.denIrred, 0)))
        s.styleExtremites = '|-'
        objets.push(s)
      }
      a = segment(O, point(O.x + Math.min(this.numIrred, this.denIrred) * rayon / this.denIrred, O.y), couleur)
      a.opacite = 0.4
      a.epaisseur = 6
      objets.push(a)
      objets.push(unegraduation(x, y))
      if (typeof (unite0) === 'number' && typeof (unite1) === 'number') {
        for (k = 0; k <= n + 1; k++) {
          objets.push(texteParPosition(unite0 + k * (unite1 - unite0), x + rayon * k, y - 0.6, 'milieu', 'black', scale))
        }
      } else {
        if (unite0 !== '') { objets.push(texteParPosition(unite0, x, y - 0.6, 'milieu', 'black', scale)) }
        if (unite1 !== '') { objets.push(texteParPosition(unite1, x + rayon, y - 0.6, 'milieu', 'black', scale)) }
        if (label !== '') { objets.push(texteParPosition(label, x + rayon * this.numIrred / this.denIrred, y - 0.6, 'milieu', 'black', scale)) }
      }
    } else {
      let diviseur
      if (this.denIrred % 6 === 0) { diviseur = 6 } else if (this.denIrred % 5 === 0) { diviseur = 5 } else if (this.denIrred % 4 === 0) { diviseur = 4 } else if (this.denIrred % 3 === 0) { diviseur = 3 } else if (this.denIrred % 2 === 0) { diviseur = 2 } else { diviseur = 1 }

      for (k = 0; k < n; k++) {
        for (let j = 0; j < diviseur; j++) {
          for (let h = 0; h < arrondi(this.denIrred / diviseur); h++) {
            O = point(x + k * (rayon + 1) + j * rayon / diviseur, y + h * rayon / diviseur)
            C = translation(O, vecteur(rayon / diviseur, 0))
            dep = carre(O, C, 'black')

            dep.couleurDeRemplissage = colorToLatexOrHTML(couleur)
            dep.opaciteDeRemplissage = 0.4
            objets.push(dep)
          }
        }
        num -= this.d
      }
      if (num > 0) {
        for (let j = 0; j < diviseur; j++) {
          for (let h = 0; h < arrondi(this.denIrred / diviseur); h++) {
            O = point(x + k * (rayon + 1) + j * rayon / diviseur, y + h * rayon / diviseur)
            C = translation(O, vecteur(rayon / diviseur, 0))
            dep = carre(O, C, 'black')

            objets.push(dep)
          }
        }
        for (let i = 0; i < num; i++) {
          O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
          C = translation(O, vecteur(rayon / diviseur, 0))
          dep = carre(O, C, 'black')

          dep.couleurDeRemplissage = colorToLatexOrHTML(couleur)
          dep.opaciteDeRemplissage = 0.4
          objets.push(dep)
        }
      }
    }
    return objets
  }

  /**
  *
  * @param {number} x position du dessin
  * @param {number} y
  * @param {number} rayon rayon du disque
  * @param {number} depart numéro du secteur où commence le coloriage
  * @param {string} type type parmis : 'gateau', 'segment' et 'barre'
  * @param {string} couleur
  * @param {number} unite0 Nombre marquant le départ du segment
  * @param {number} unite1 Nombre marquant le point unité du segment
  * @param {number} scale échelle
  * @param {string} label ce qu'il faut écrire sous le segment ... x ?
  * @returns objets mathalea2d
  */
  representation (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '') {
    const objets = []
    let num, k, dep, s, a, O, C
    const n = quotientier(this.num, this.den)
    num = this.num
    const unegraduation = function (x, y, couleur = 'black', epaisseur = 1) {
      const A = point(x, y + 0.2)
      const B = point(x, y - 0.2)
      const g = segment(A, B, couleur)
      g.epaisseur = epaisseur
      return g
    }
    if (type === 'gateau') {
      for (k = 0; k < n; k++) {
        const O = point(x + k * 2 * (rayon + 0.5), y)
        const C = cercle(O, rayon)
        objets.push(C)
        let s, a
        for (let i = 0; i < this.den; i++) {
          s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - i * 360 / this.den))
          objets.push(s)
        }
        dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - depart * 360 / this.den)
        for (let j = 0; j < Math.min(this.den, num); j++) {
          a = arc(dep, O, -360 / this.den, true, couleur)
          a.opacite = 0.3
          dep = rotation(dep, O, -360 / this.den)
          objets.push(a)
        }
        num -= this.den
      }
      if (this.num % this.den !== 0) {
        const O = point(x + k * 2 * (rayon + 0.5), y)
        const C = cercle(O, rayon)
        objets.push(C)
        for (let i = 0; i < this.den; i++) {
          s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - i * 360 / this.den))
          objets.push(s)
        }

        dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - depart * 360 / this.den)
        if (this.num % this.den !== 0) {
          for (let j = 0; j < Math.min(this.den, num); j++) {
            a = arc(dep, O, -360 / this.den, true, couleur)
            a.opacite = 0.3
            dep = rotation(dep, O, -360 / this.den)
            objets.push(a)
          }
        }
      }
    } else if (type === 'segment') {
      for (k = 0; k < n; k++) {
        O = point(x + k * rayon, y)
        C = translation(O, vecteur(rayon, 0))
        s = segment(O, C)
        s.styleExtremites = '-|'
        objets.push(s)
        for (let i = 0; i < this.den; i++) {
          s = segment(translation(O, vecteur(i * rayon / this.den, 0)), translation(O, vecteur((i + 1) * rayon / this.den, 0)))
          s.styleExtremites = '|-'
          objets.push(s)
        }
        a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y), couleur)
        a.opacite = 0.4
        a.epaisseur = 6
        objets.push(a)
        num -= this.den
      }
      O = point(x + k * rayon, y)
      C = translation(O, vecteur(rayon, 0))
      s = segment(O, C)
      s.styleExtremites = '-|'
      objets.push(s)
      for (let i = 0; i < this.den; i++) {
        s = segment(translation(O, vecteur(i * rayon / this.den, 0)), translation(O, vecteur((i + 1) * rayon / this.den, 0)))
        s.styleExtremites = '|-'
        objets.push(s)
      }
      a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y), couleur)
      a.opacite = 0.4
      a.epaisseur = 6
      objets.push(a)
      objets.push(unegraduation(x, y))
      if (typeof (unite0) === 'number' && typeof (unite1) === 'number') {
        for (k = 0; k <= n + 1; k++) {
          objets.push(texteParPosition(unite0 + k * (unite1 - unite0), x + rayon * k, y - 0.6, 'milieu', 'black', scale))
        }
      } else {
        if (unite0 !== '') { objets.push(texteParPosition(unite0, x, y - 0.6, 'milieu', 'black', scale)) }
        if (unite1 !== '') { objets.push(texteParPosition(unite1, x + rayon, y - 0.6, 'milieu', 'black', scale)) }
        if (label !== '') { objets.push(texteParPosition(label, x + rayon * this.num / this.den, y - 0.6, 'milieu', 'black', scale)) }
      }
    } else { // Type barre
      let diviseur
      if (this.den % 6 === 0) { diviseur = 6 } else if (this.den % 5 === 0) { diviseur = 5 } else if (this.den % 4 === 0) { diviseur = 4 } else if (this.den % 3 === 0) { diviseur = 3 } else if (this.den % 2 === 0) { diviseur = 2 } else { diviseur = 1 }

      for (k = 0; k < n; k++) {
        for (let j = 0; j < diviseur; j++) {
          for (let h = 0; h < arrondi(this.den / diviseur); h++) {
            O = point(x + k * (rayon + 1) + j * rayon / diviseur, y + h * rayon / diviseur)
            C = translation(O, vecteur(rayon / diviseur, 0))
            dep = carre(O, C, 'black')

            dep.couleurDeRemplissage = colorToLatexOrHTML(couleur)
            dep.opaciteDeRemplissage = 0.4
            objets.push(dep)
          }
        }
        num -= this.den
      }
      if (num > 0) {
        for (let j = 0; j < diviseur; j++) {
          for (let h = 0; h < arrondi(this.den / diviseur); h++) {
            O = point(x + k * (rayon + 1) + j * rayon / diviseur, y + h * rayon / diviseur)
            C = translation(O, vecteur(rayon / diviseur, 0))
            dep = carre(O, C, 'black')

            objets.push(dep)
          }
        }
        for (let i = 0; i < num; i++) {
          O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
          C = translation(O, vecteur(rayon / diviseur, 0))
          dep = carre(O, C, 'black')

          dep.couleurDeRemplissage = colorToLatexOrHTML(couleur)
          dep.opaciteDeRemplissage = 0.4
          objets.push(dep)
        }
      }
    }
    return objets
  }

  /**
 * Renvoie un array avec l'ensemble de réponses possibles correspondant à un couple de fractions et de leurs différentes simplifications afin de pouvoir les placer dans un setReponse
 * Exemple ['-\\frac{a}{b};\\frac{c}{d}', '\\frac{-a}{b};\\frac{c}{d}', '\\frac{a}{-b};\\frac{c}{d}', '\\frac{c}{d};-\\frac{a}{b}', '\\frac{c}{d};\\frac{-a}{b}', '\\frac{c}{d};\\frac{a}{-b}' ...
 * @author Guillaume Valmont
 * @param {number} n1 numérateur de la 1e fraction
 * @param {number} d1 dénominateur de la 1e fraction
 * @param {number} n2 numérateur de la 2e fraction
 * @param {number} d2 dénominateur de la 2e fraction
 * @returns array avec la liste des couples de fractions égales et simplifiées sous la forme '\\frac{n1}{d1};\\frac{n2}{d2}'
 */
  static texArrayReponsesCoupleDeFractionsEgalesEtSimplifiees (n1, d1, n2, d2) {
    return this.texArrayReponsesCoupleDeFractions(n1, d1, n2, d2, true)
  }

  /**
 * Fonction destinée à être utilisée conjointement avec setReponse
 * Exemple [\\frac{18}{6}, \\frac{-18}{-6}, -\\frac{-18}{6}, -\\frac{18}{-6}, \\frac{9}{3}, \\frac{-9}{-3}, -\\frac{-9}{3}, -\\frac{9}{-3}, 3]
 * @author Guillaume Valmont
 * @param {number} n numérateur
 * @param {number} d dénominateur
 * @returns array avec la liste des fractions égales et simplifiées sous la forme '\\frac{n}{d}'
 */
  static texArrayReponsesFractionsEgalesEtSimplifiees (n, d) {
    const fractionsSimplifiees = this.listerFractionsSimplifiees(n, d)
    const liste = []
    for (const fractionSimplifiee of fractionsSimplifiees) {
      const reponses = this.texArrayReponsesFraction(fractionSimplifiee[0], fractionSimplifiee[1])
      for (const reponse of reponses) {
        liste.push(reponse)
      }
    }
    return liste
  }

  /**
 * Renvoie un array avec l'ensemble de réponses possibles correspondant à un couple de fractions afin de pouvoir les placer dans un setReponse
 * Exemple ['-\\frac{a}{b};\\frac{c}{d}', '\\frac{-a}{b};\\frac{c}{d}', '\\frac{a}{-b};\\frac{c}{d}', '\\frac{c}{d};-\\frac{a}{b}', '\\frac{c}{d};\\frac{-a}{b}', '\\frac{c}{d};\\frac{a}{-b}' ...
 * @author Guillaume Valmont
 * @param {number} n1 numérateur 1
 * @param {number} d1 dénominateur 1
 * @param {number} n2 numérateur 1
 * @param {number} d2 dénominateur 1
 * @param {boolean} egalesEtSimplifiees true si on veut inclure l'ensemble des fractions égales et simplifiées
 * @returns array avec la liste des couples de fractions sous la forme '\\frac{n1}{d1};\\frac{n2}{d2}'
 */
  static texArrayReponsesCoupleDeFractions (n1, d1, n2, d2, egalesEtSimplifiees = false) {
    let listeFraction1, listeFraction2
    if (egalesEtSimplifiees) {
      listeFraction1 = this.texArrayReponsesFractionsEgalesEtSimplifiees(n1, d1)
      listeFraction2 = this.texArrayReponsesFractionsEgalesEtSimplifiees(n2, d2)
    } else {
      listeFraction1 = this.texArrayReponsesFraction(n1, d1)
      listeFraction2 = this.texArrayReponsesFraction(n2, d2)
    }
    const listeCouples = []
    for (const ecriture1 of listeFraction1) {
      for (const ecriture2 of listeFraction2) {
        listeCouples.push(ecriture1 + ';' + ecriture2, ecriture2 + ';' + ecriture1)
      }
    }
    return listeCouples
  }

  /**
 * Fonction destinée à lister l'ensemble des possibilités d'écriture d'une même fraction pour être comparées dans un setReponse
 * @author Guillaume Valmont
 * @param {number} numerateur
 * @param {number} denominateur
 * @returns array avec l'ensemble des possibilités d'écriture d'une même fraction au format LateX
 */
  static texArrayReponsesFraction (numerateur, denominateur) {
    const n = Math.abs(numerateur)
    const d = Math.abs(denominateur)
    if (d === 1) {
      return [(numerateur * denominateur).toString()]
    } else {
      if (numerateur * denominateur > 0) {
        return [`\\frac{${n}}{${d}}`, `\\frac{${-n}}{${-d}}`, `-\\frac{${-n}}{${d}}`, `-\\frac{${n}}{${-d}}`]
      } else if (numerateur * denominateur < 0) {
        return [`-\\frac{${n}}{${d}}`, `-\\frac{${-n}}{${-d}}`, `\\frac{${-n}}{${d}}`, `\\frac{${n}}{${-d}}`]
      } else {
        return ['0']
      }
    }
  }

  /**
 * Renvoie l'ensemble des fractions égales et simplifiées
 * Ne change pas et ne déplace pas les signes (s'il y a un "-" au dénominateur, il restera au dénominateur)
 * @author Guillaume Valmont
 * @param {number} n
 * @param {number} d
 * @returns array de couples [numerateur, denominateur] de l'ensemble des fractions égales et simplifiées
 */
  static listerFractionsSimplifiees (n, d) {
    if (pgcd(n, d) === 1) {
      return [[n, d]]
    } else {
      const liste = []
      for (const diviseur of listeDiviseurs(pgcd(n, d))) {
        liste.push([n / diviseur, d / diviseur])
      }
      return liste
    }
  }
}

export default FractionX
