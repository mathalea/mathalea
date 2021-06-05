import { texFractionSigne, unSiPositifMoinsUnSinon, arrondi, fractionSimplifiee, obtenirListeFacteursPremiers, calcul, texFraction, quotientier } from './outils.js'
import { point, vecteur, segment, carre, cercle, arc, translation, rotation, texteParPosition } from './2d.js'

const definePropRo = (obj, prop, get) => {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get,
    set: () => { throw Error(`${prop} est en lecture seule`) }
  })
}

/**
 * @class
 * @param {number} num numérateur
 * @param {number} den dénominateur
 * @author Jean-Claude Lhote et Sébastien Lozano
*/
class Fraction {
  constructor (num, den) {
    /**
     * Numérateur (0 par défaut)
     * @type {number}
     */
    this.num = num || 0
    if (typeof this.num !== 'number' || Number.isNaN(this.num)) throw Error(`Numérateur invalide ${this.num}`)
    /**
     * Dénominateur (1 par défaut)
     * @type {number}
     */
    this.den = den || 1
    if (typeof this.den !== 'number' || Number.isNaN(this.den)) throw Error(`Dénominateur invalide ${this.den}`)
    if (this.den === 0) throw Error('Dénominateur nul impossible')
    // pour ne pas faire ces calculs à chaque instanciation de Fraction, on passe par defineProperty
    // (qui permet de ne faire le calcul qu'à la première lecture de la propriété)
    /**
     * Numérateur réduit
     * @property numIrred
     * @type {number}
     */
    let numIrred
    definePropRo(this, 'numIrred', () => {
      if (!numIrred) numIrred = fractionSimplifiee(this.num, this.den)[0]
      return numIrred
    })
    /**
     * Dénominateur réduit
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
      if (!pourcentage) pourcentage = calcul(this.numIrred * 100 / this.denIrred)
      return pourcentage
    })
    /**
     * le signe de la fraction : -1, 0 ou 1
     * @type {number}
     */
    this.signe = (this.num === 0) ? 0 : unSiPositifMoinsUnSinon(this.num * this.den)
    /**
     * n/d si positif -n/d si négatif
     * @property texFraction
     * @type {string}
     */
    let texFraction
    definePropRo(this, 'texFraction', () => {
      if (!texFraction) texFraction = texFractionSigne(this.num, this.den)
      return texFraction
    })
    /**
     * +n/d si positif, -n/d si négatif
     * @property texFractionSignee
     * @type {string}
     */
    let texFractionSignee
    definePropRo(this, 'texFractionSignee', () => {
      if (!texFractionSignee) texFractionSignee = (this.signe === -1) ? this.texFraction : '+' + this.texFraction
      return texFractionSignee
    })
    /**
     * n/d si positif, (-n/d) sinon
     * @property texFractionSigneeParentheses
     * @type {string}
     */
    let texFractionSigneeParentheses
    definePropRo(this, 'texFractionSigneeParentheses', () => {
      if (!texFractionSigneeParentheses) texFractionSigneeParentheses = (this.signe >= 0) ? this.texFraction : `(${this.texFractionSignee})`
      return texFractionSigneeParentheses
    })
    /**
     * le code LaTeX de la fraction simplifiée
     * @property texFractionSimplifiee
     * @type {string}
     */
    let texFractionSimplifiee
    definePropRo(this, 'texFractionSimplifiee', () => {
      if (!texFractionSimplifiee) texFractionSimplifiee = texFractionSigne(this.numIrred, this.denIrred)
      return texFractionSimplifiee
    })
    /**
     * Valeurs avec 6 décimales
     * @type {number}
     */
    this.valeurDecimale = arrondi(this.num / this.den, 6)
  }

  /**
   * Retourne la fraction réduite
   * @return {Fraction}
   */
  simplifie () {
    return new Fraction(this.numIrred, this.denIrred)
  }

  /**
   * @param {number} k Le nombre par lequel, le numérateur et le dénominateur sont multipliés.
   * @return {Fraction} La fraction "complexifiée" d'un rapport k
   */
  fractionEgale (k) {
    return new Fraction(calcul(this.num * k), calcul(this.den * k))
  }

  /**
   * Retourne l'opposé de la fraction
   * @return {Fraction}
   */
  oppose () {
    return new Fraction(-this.num, this.den)
  }

  /**
   * Retourne l'opposé de la fraction réduite
   * @return {Fraction}
   */
  opposeIrred () {
    return new Fraction(-this.numIrred, this.denIrred)
  }

  /**
   * Retourne l'inverse de la fraction
   * @return {Fraction}
   */
  inverse () {
    return new Fraction(this.den, this.num)
  }

  /**
   * Retourne l'inverse de la fraction simplifiée
   * @return {Fraction}
   */
  inverseIrrred () {
    return new Fraction(this.denIrred, this.numIrred)
  }

  /**
   * Retourne la somme de la fraction courante et f2
   * @param {object} f2 La fraction qui s'ajoute
   * @return {Fraction} La somme des fractions
   */
  sommeFraction (f2) {
    return new Fraction(this.num * f2.den + f2.num * this.den, this.den * f2.den)
  }

  /**
   * @param  {Fraction[]} fractions Liste des fractions à ajouter à la fraction
   * @return {Fraction} La somme de toutes les fractions
   */
  sommeFractions (...fractions) {
    let s = new Fraction(this.num, this.den)
    for (const f of fractions) {
      s = s.sommeFraction(f)
    }
    return s
  }

  /**
   * @param {Fraction} f2  La fraction par laquelle est multipliée la fraction
   * @return {Fraction} Le produit des deux fractions
   */
  produitFraction (f2) {
    return new Fraction(this.num * f2.num, this.den * f2.den)
  }

  /**
   * @param {Fraction} f2 la fraction qui multiplie.
   * @return {string} Le calcul du produit de deux fractions avec étape intermédiaire
   */
  texProduitFraction (f2) {
    return `${this.texFraction}\\times ${f2.texFraction}=${texFraction(this.num + '\\times' + f2.num, this.den + '\\times' + f2.den)}=${texFraction(this.num * f2.num, this.den * f2.den)}`
  }

  /**
   * @param {number} n l'exposant de la fraction
   * @return {Fraction} La puissance n de la fraction
   */
  puissanceFraction (n) {
    return new Fraction(this.num ** n, this.den ** n)
  }

  /**
   * @param  {Fraction[]} fractions Les fractions qui multiplient la fraction
   * @return {Fraction} Le produit des fractions
   */
  produitFractions (...fractions) {
    let p = new Fraction(this.num, this.den)
    for (const f of fractions) {
      p = p.produitFraction(f)
    }
    return p
  }

  /**
   * @param {Fraction} f2 est la fracion qui est soustraite de la fraction
   * @return {Fraction} La différence des deux fractions
   */
  differenceFraction (f2) {
    return this.sommeFraction(f2.oppose())
  }

  /**
   *
   * @param {Fraction} f2
   * @return {Fraction}
   */
  diviseFraction (f2) {
    return this.produitFraction(f2.inverse())
  }

  /**
   *
   * @param {Fraction} f2
   * @return {string}
   */
  texQuotientFraction (f2) {
    return `${this.texFraction}\\div ${f2.texFraction}=${this.texFraction}\\times ${f2.inverse().texFraction}=${texFraction(this.num + '\\times' + f2.den, this.den + '\\times' + f2.num)}=${texFraction(this.num * f2.den, this.den * f2.num)}`
  }

  /**
   * Retourne une fraction avec comme dénominateur une puissance de 10 ou 'NaN' si la fraction n'a pas de valeur décimale
   * @return {Fraction}
   */
  fractionDecimale () {
    const den = this.denIrred
    const liste = obtenirListeFacteursPremiers(den)
    let n2 = 0; let n5 = 0
    for (const n of liste) {
      if (n === 2) { n2++ } else if (n === 5) { n5++ } else { return 'NaN' }
    }
    if (n5 === n2) { return new Fraction(this.numIrred, this.fractionDecimale.denIrred) } else if (n5 > n2) { return new Fraction(this.numIrred * 2 ** (n5 - n2), this.denIrred * 2 ** (n5 - n2)) } else { return new Fraction(this.numIrred * 5 ** (n2 - n5), this.denIrred * 5 ** (n2 - n5)) }
  }

  /**
   *
   * @param {number} n entier par lequel multiplier la fraction
   * @return {Fraction} fraction multipliée par n
   */
  multiplieEntier (n) {
    return new Fraction(n * this.num, this.den)
  }

  /**
   *
   * @param {number} n entier par lequel multiplier la fraction
   * @return {Fraction} fraction multipliée par n simplifiée
   */
  multiplieEntierIrred (n) {
    return new Fraction(n * this.num, this.den).simplifie()
  }

  /**
   * @param {number} n entier qui divise la fraction
   * @return {Fraction} fraction divisée par n
   */
  entierDivise (n) {
    return new Fraction(this.num, n * this.den)
  }

  /**
   * Retourne la fraction divisée par n et réduite si possible
   * @param {integer} n entier qui divise la fraction
   * @return {Fraction}
   */
  entierDiviseIrred (n) {
    return new Fraction(this.num, n * this.den).simplifie()
  }

  /**
   * @param {number} n entier divisé par la fraction
   * @return {Fraction} n divisé par fraction
   */
  diviseEntier (n) {
    return new Fraction(n * this.den, this.num)
  }

  /**
   *
   * @param {number} n
   * @return {Fraction}
   */
  diviseEntierIrred (n) {
    return new Fraction(n * this.den, this.num).simplifie()
  }

  /**
   * @param {number} n entier à ajouter à la fraction
   * @return {Fraction} la fraction augmentée de n
   */
  ajouteEntier (n) {
    return new Fraction(this.num + this.den * n, this.den)
  }

  /**
   * @param {number} n l'entier duqel on soustrait la fraction
   * @return {Fraction} n moins la fraction
   */
  entierMoinsFraction (n) {
    return new Fraction(n * this.den - this.num, this.den)
  }

  /**
   * fonctions de comparaison avec une autre fraction.
   * @param {Fraction} f2
   * @return {boolean}
   */
  superieurstrict (f2) {
    return (this.num / this.den) > (f2.num / f2.den)
  }

  /**
   * Retourne true si la fraction courante est supérieure ou égale à f2
   * @param {Fraction} f2
   * @return {boolean}
   */
  superieurlarge (f2) {
    return (this.num / this.den) >= (f2.num / f2.den)
  }

  /**
   * Retourne true si la fraction courante est strictement inférieure à f2
   * @param {Fraction} f2
   * @return {boolean}
   */
  inferieurstrict (f2) {
    return (this.num / this.den) < (f2.num / f2.den)
  }

  /**
   * Retourne true si la fraction est égale et "plus simple"
   * @param {Fraction} f2
   * @return {boolean}
   */
  estUneSimplification (f2) {
    return this.egal(f2) && (Math.abs(this.num) < Math.abs(f2.num))
  }

  /**
   * Retourne true si la fraction courante est inférieure ou égale à f2
   * @param {Fraction} f2
   * @return {boolean}
   */
  inferieurlarge (f2) {
    return (this.num / this.den) < (f2.num / f2.den)
  }

  /**
   * Retourne true si les deux fractions sont égales (différence < 1e-10)
   * @param {Fraction} f2
   * @return {boolean}
   */
  egal (f2) {
    return Math.abs((this.num / this.den) - (f2.num / f2.den)) < 1e-10
  }

  /**
   *
   * @author Jean-Claude Lhote
   * @param x
   * @param y
   * @param rayon
   * @param {number} depart N° de la première part coloriée (0 correspond à la droite du centre)
   * @param {string} type 'gateau' ou 'segment' ou 'barre'
   * @param couleur
   * @param unite0
   * @param unite1
   * @param scale
   * @param label
   * @return {Object[]}
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
      if (this.num % this.den !== 0) {
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
          for (let h = 0; h < calcul(this.denIrred / diviseur); h++) {
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
          for (let h = 0; h < calcul(this.denIrred / diviseur); h++) {
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
   * Représente une fraction sous forme de disque (gateau), de segment ou de rectangle
   * @param x
   * @param y
   * @param rayon
   * @param depart sert pour la représentation disque à fixer l'azimut du premier secteur : 0 correspond à 12h.
   * @param {string} type gateau|segment|barre
   * @param couleur
   * @param unite0 sert pour la représentation 'segment'. On peut ainsi choisir les délimiteurs de l'unité, ce sont habituellement 0 et 1, à ce moment la, chaque entier est affiché sous sa graduation. Si ce sont des variable de type string, il n'y a que ces deux étiquettes qui sont écrites.
   * @param unite1 idem
   * @param scale
   * @param label
   * @return {Object[]}
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
          for (let h = 0; h < calcul(this.den / diviseur); h++) {
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
          for (let h = 0; h < calcul(this.den / diviseur); h++) {
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

export default Fraction
