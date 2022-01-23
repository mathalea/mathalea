import { arrondi, obtenirListeFacteursPremiers, quotientier, extraireRacineCarree, fractionSimplifiee } from './outils.js'
import { point, vecteur, segment, carre, cercle, arc, translation, rotation, texteParPosition } from './2d.js'
import { Fraction, equal, largerEq, subtract, add, abs, multiply, gcd, larger, smaller, round } from 'mathjs'
import { fraction } from './fractions.js'

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
export default class FractionX extends Fraction {
  constructor (...args) {
    super(...args)
    if (args.length === 2) { // deux arguments : numérateur et dénominateur qui peuvent être fractionnaires.
      if (['Fraction', 'FractionX'].includes(args[0].type)) this.num = fraction(args[0].num || args[0].n * args[0].s, args[0].den || args[0].d)
      else
      if (!Number.isNaN(args[0])) this.num = args[0]
      else window.notify('FractionX : Numérateur incorrect ', { args })

      if (['Fraction', 'FractionX'].includes(args[0].type)) this.den = fraction(args[1].num || args[1].n * args[1].s, args[1].den || args[1].d)
      else
      if (!Number.isNaN(args[1])) this.den = args[1]
      else window.notify('FractionX : Dénominateur incorrect ', { args })
    } else { // un seul argmument : valeur décimale de la fraction -> Fraction de mathjs.
      this.num = this.n * this.s
      this.den = this.d
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
      if (!texFraction) texFraction = `\\dfrac{${this.num}}{${this.den}}`
      return texFraction
    })

    /**
       * num/den mais avec simplification des signes (numérateur et dénominateur positifs, signe - eventuellement devant.)
       * @property texFSD littéralement texFractionSigneDevant (si c'est un moins sinon rien... pour avoir le + devant, utiliser ecritureAlgebrique)
       * @type {string}
       */
    let texFSD
    definePropRo(this, 'texFSD', () => {
      if (!texFSD) texFSD = this.s === -1 ? Math.abs(this.den) === 1 ? '-' + String(Math.abs(this.num)) : `-\\dfrac{${Math.abs(this.num)}}{${Math.abs(this.den)}}` : Math.abs(this.den) === 1 ? String(Math.abs(this.num)) : `\\dfrac{${Math.abs(this.num)}}{${Math.abs(this.den)}}`
      return texFSD
    })

    /**
     * + n/d si positif, - n/d si négatif
     * @property texFractionSignee
     * @type {string}
     * propriété qui n'est pas très utile puisque ecritureAlgebrique gère les fractions maintenant (défini pour compatibilité avec les exos qui l'utilisent)
     */
    let texFractionSignee
    definePropRo(this, 'texFractionSignee', () => {
      if (!texFractionSignee) texFractionSignee = (this.s === -1) ? this.texFSD : '+' + this.texFSD
      return texFractionSignee
    })

    /**
     * n/d si positif, (- n/d) sinon
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
     * @property ecritureAlgebrique
     * @type {string}
     * Pour compatibilité avec les anciens exos... la fonction de outils.js ecritureAlgebrique() est compatible avec les fractions
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
      if (!estIrreductible) estIrreductible = gcd(this.num, this.den) === 1
      return estIrreductible
    })

    /**
   * basé sur la méthode toLatex() de mathjs, on remplace \frac par \dfrac plus joli.
   * @returns la chaine Latex pour écrire la fraction (signe devant)
   */
    this.toLatex = () => super.toLatex().replace('\\frac', '\\dfrac')
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
  simplifie () { return fraction(this.n * this.s / gcd(this.n, this.d), this.d / gcd(this.n, this.d)) }

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
    } else if ([this.den, f2.den].indexOf(gcd(this.den, f2.den)) !== -1) { // un dénominateur est multiple de l'autre
      if (this.den === gcd(this.den, f2.den)) { // c'est this qui a le dénominateur commun.
        return fraction(this.num + f2.num * round(this.den / f2.den), this.den)
      } else { // c'est f2 qui a le dénominateur commun
        return fraction(f2.num + this.num * round(f2.den / this.den), f2.den)
      }
    } else { // besoin d'établir le dénominateur commun.
      return fraction(this.num * round(gcd(this.den, f2.den) / this.den) + f2.num * round(gcd(this.den, f2.den) / f2.den), gcd(this.den, f2.den))
    }
  }

  /**
  * @param {FractionX | Fraction | nombre} f2
  * @returns f * FractionX  // retourne un résultat simplifié
  */
  produitFraction (f2) { return fraction(multiply(this, f2)) }

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

  /*
    * @param {Fraction} f2 la fraction qui multiplie.
    * @return {string} Le calcul du produit de deux fractions avec étape intermédiaire
    */
  texProduitFraction (f2) {
    return `${this.texFraction}\\times ${f2.texFraction}=\\dfrac{${this.num + '\\times' + f2.num}}{${this.den + '\\times' + f2.den}}=\\dfrac{${this.num * f2.num}}{${this.den * f2.den}}`
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
    if (this.n !== 0) return fraction(this.den, this.num)
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
    if (['Fraction', 'FractionX'].indexOf(f2.type) !== -1) {
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
      const g = segment(A, B)
      g.color = couleur
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
        a = segment(O, point(O.x + Math.min(num, this.denIrred) * rayon / this.denIrred, O.y))
        a.color = couleur
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
      a = segment(O, point(O.x + Math.min(this.numIrred, this.denIrred) * rayon / this.denIrred, O.y))
      a.color = couleur
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
            dep = carre(O, C)
            dep.color = 'black'
            dep.couleurDeRemplissage = couleur
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
            dep = carre(O, C)
            dep.color = 'black'
            objets.push(dep)
          }
        }
        for (let i = 0; i < num; i++) {
          O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
          C = translation(O, vecteur(rayon / diviseur, 0))
          dep = carre(O, C)
          dep.color = 'black'
          dep.couleurDeRemplissage = couleur
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
      const g = segment(A, B)
      g.color = couleur
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
        a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y))
        a.color = couleur
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
      a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y))
      a.color = couleur
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
            dep = carre(O, C)
            dep.color = 'black'
            dep.couleurDeRemplissage = couleur
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
            dep = carre(O, C)
            dep.color = 'black'
            objets.push(dep)
          }
        }
        for (let i = 0; i < num; i++) {
          O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
          C = translation(O, vecteur(rayon / diviseur, 0))
          dep = carre(O, C)
          dep.color = 'black'
          dep.couleurDeRemplissage = couleur
          dep.opaciteDeRemplissage = 0.4
          objets.push(dep)
        }
      }
    }
    return objets
  }
}
