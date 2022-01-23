import { number, add, unequal, largerEq, fraction, equal, multiply, inv, matrix, max } from 'mathjs'
import { calcul, arrondi, ecritureAlgebrique, egal, randint, rienSi1, ecritureAlgebriqueSauf1, choice } from './outils.js'
/**
* Convertit un angle de radian vers degrés et fonction inverse
* @Example
* // PI->180
* @author Jean-Claude Lhote
*/
export function degres (radians) {
  return radians * 180 / Math.PI
}
export function radians (degres) {
  return degres * Math.PI / 180
}

/**
   * @param {number} a angle en degrés
   * @returns flottant : le cosinus de l'angle
   * @author Jean-Claude Lhote
   */
export function cos (a) {
  return calcul(Math.cos(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : le sinus de l'angle
   * @author Jean-Claude Lhote
   */
export function sin (a) {
  return calcul(Math.sin(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : la tangente de l'angle
   * @author Jean-Claude Lhote
   */
export function tan (a) {
  return calcul(Math.tan(radians(a)))
}
/**
   * @param {number} un nombre qui correspond au cosinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function acos (x) {
  return arrondi(degres(Math.acos(x)), 1)
}
/**
   * @param {number} un nombre qui correspond au sinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function asin (x) {
  return arrondi(degres(Math.asin(x)), 1)
}
/**
   * @param {number} un nombre qui correspond à la tangente de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function atan (x) {
  return arrondi(degres(Math.atan(x)), 1)
}
/**
 * retourne un décimal sans décimales bizarres
 * @author Jean-Claude Lhote
 */
export function calcule (a, arrondir = false) {
  if (!arrondir) {
    if (typeof a === 'string') {
      return parseFloat(Number(a).toFixed(6))
    } else {
      return parseFloat(a.toFixed(6))
    }
  } else {
    if (typeof a === 'string') {
      return parseFloat(Number(a).toFixed(arrondir))
    } else {
      return parseFloat(a.toFixed(arrondir))
    }
  }
}

/**
 * retourne une chaine contenant le résultat du calcul avec la virgule comme séparateur et pas de décimales bizarres
 * @author Jean-Claude Lhote
 */
export function calculeS (a, arrondir = false) {
  let result
  if (!arrondir) {
    if (typeof a === 'string') {
      result = Number(a).toFixed(6).split('.')
    } else {
      result = a.toFixed(6).split('.')
    }
  } else {
    if (typeof a === 'string') {
      result = Number(a).toFixed(arrondir).split('.')
    } else {
      result = a.toFixed(arrondir).split('.')
    }
  }
  result[1] = result[1].replace(/[0]*$/, '')
  if (result[1].length !== 0) { return result[0] + ',' + result[1] } else return result[0]
}
/**
 * delta(true) retourne dans un tableau des valeurs de a, b, c telles que b*b-4*a*c >0
 * delta(false) retourne dans un tableau des valeurs de a, b, c telles que b*b-4*a*c <0
 * @author Jean-Claude Lhote
 */
export function choisiDelta (positif) {
  let d, a, b, c
  do {
    a = randint(-5, 5, 0)
    b = randint(-5, 5, 0)
    c = randint(-5, 5, 0)
    d = b * b - 4 * a * c
  } while (positif ? d <= 0 : d >= 0)
  return [a, b, c]
}
/**
 * onction qui retourne un polynome du second degré correctement écrit.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {string}
 */
export function expTrinome (a, b, c) {
  let expr = ''
  if (typeof a === 'number') {
    switch (a) {
      case 0:
        break
      case -1:
        expr += '-x^2'
        break
      case 1:
        expr += 'x^2'
        break
      default:
        expr += `${a}x^2`
        break
    }
  } else {
    expr += `${a}x^2`
  }
  if (typeof b === 'number') {
    switch (b) {
      case 0:
        break
      case -1:
        expr += '-x'
        break
      case 1:
        expr += '+x'
        break
      default:
        if (a === 0) {
          expr += `${b}`
        } else expr += `${ecritureAlgebrique(b)}x`
        break
    }
  } else {
    if (a === 0) {
      expr += `${b}x`
    } else {
      expr += `+${b}x`
    }
  }
  if (typeof c === 'number') {
    if (a === 0 && b === 0) {
      expr += `${c}`
    } else {
      if (c !== 0) {
        expr += `${ecritureAlgebrique(c)}`
      }
    }
  } else {
    expr += `+${c}`
  }
  return expr
}

/**
 * inspiré de l'article 'Algorithme de calcul d'une courbe spline de lissage'
 * de cet article 'spline' de wikipedia : https://fr.wikipedia.org/wiki/Spline
 * ça fonctionne quand les noeuds sont 'bien répartis'... ce qui n'est pas évident...
 * Les noeuds sont des couples (x,y)
 * On lui préférera la Spline de Catmull-Rom ci-dessous.
 * Adaptation pour Mathalea
 * @author Jean-Claude Lhote
 */
class Spline {
  constructor (tabNoeuds) {
    const x = []
    const y = []
    const h = []
    const F = matrix()
    const R = matrix()

    let n
    for (let i = 0; i < tabNoeuds.length; i++) {
      x[i] = tabNoeuds[i][0]
      y[i] = tabNoeuds[i][1]
    }
    if (trieCouples(x, y)) { // On mets les couples (x,y) dans l'ordre des x croissants.
      n = x.length
    } else {
      console.log('il y a un problème avec ce tableau des noeuds')
      return false
    }
    for (let i = 0; i < n; i++) {
      console.log('(', x[i], ';', y[i], ')')
    }
    for (let i = 0; i < n - 1; i++) {
      h[i] = x[i + 1] - x[i] // on calcule les amplitudes des intervalles.
    }
    console.log(' Les intervalles :\n ', h)
    F.resize([n], 0)
    for (let i = 2; i < n; i++) { // On construit la matrice des dérivées secondes
      F._data[i - 1] = (y[i] - y[i - 1]) / h[i - 1] - (y[i - 1] - y[i - 2]) / h[i - 2]
    }
    console.log('La matrice des dérivéées secondes :\n', F)
    R.resize([n, n], 0)
    for (let i = 1; i <= n; i++) { // On construit la matrice carrée de calcul
      if (i === 1) {
        R._data[0][0] = 1 // seul le premier élément de la première ligne n'est pas nul
      } else if (i === n) {
        R._data[n - 1][n - 1] = 1 // seul le dernier élément de la dernière ligne n'est pas nul
      } else { // on Construit les diagonales n = 2 .. n-1
        R._data[i - 1][i - 1] = (h[i - 2] + h[i - 1]) / 3
        R._data[i - 1][i] = h[i - 1] / 6
        R._data[i - 1][i - 2] = h[i - 2] / 6
      }
    }
    console.log('LA matrice R :\n', R)
    const Rinv = inv(R)
    console.log('La matrice inverse de R :\n', Rinv)
    const M = multiply(Rinv, F)
    console.log('La matrice M = Rinv*F :\n', M)
    const C = matrix()
    const C2 = matrix()
    C.resize([n - 1], 0)
    C2.resize([n - 1], 0)
    for (let i = 1; i <= n - 1; i++) {
      C._data[i - 1] = (y[i] - y[i - 1]) / h[i - 1] - h[i - 1] * (M._data[i] - M._data[i - 1]) / 6
      C2._data[i - 1] = y[i - 1] - M._data[i - 1] * h[i - 1] * h[i - 1] / 6
    }
    console.log('La matrice C :\n', C)
    console.log('La matrice C2 :\n', C2)
    this.F = F
    this.R = R
    this.M = M
    this.h = h
    this.C = C
    this.C2 = C2
    this.x = x
    this.y = y

    this.image = function (X) {
      let trouveK = false
      let k = 0; let f
      for (let i = 2; i <= n; i++) {
        if (X >= x[i - 2] && X <= x[i - 1]) {
          k = i
          trouveK = true
          break
        }
      }
      if (!trouveK) {
        return false
      } else {
        const i = k
        f = a => (F._data[i - 1] * (a - x[i - 2]) ** 3 + F._data[i - 2] * (x[i - 1] - a) ** 3) / (6 * h[i - 1]) + (y[i - 1] / h[i - 1] - F._data[i - 1] * h[i - 1] / 6) * (a - x[i - 2]) + (y[i - 2] / h[i - 1] - F._data[i - 2] * h[i - 1] / 6) * (x[i - 1] - a)
        return f(X)
      }
    }

    // une autre façon de calculer l'image... laquelle est la plus rapide ?
    /*  this.image = function (X) {
      let trouveK = false
      let k = 0
      for (let i = 0; i < n - 1; i++) {
        if (X > x[i] && X < x[i + 1]) {
          k = i
          trouveK = true
          break
        } else if (egal(X, x[i])) {
          return y[i]
        } else if (egal(X, x[i + 1])) {
          return y[i + 1]
        }
      }
      if (!trouveK) {
        return false
      } else {
        return (M._data[k - 1] * (x[k] - X) ** 3 + M._data[k] * (X - x[k - 1]) ** 3) / (6 * h[k - 1]) + C._data[k - 1] * (X - x[k - 1]) + C2._data[k - 1]
      }
    }
*/
  }
}

export function spline (tabNoeuds) {
  return new Spline(tabNoeuds)
}

/**
 * Fonction qui trie des couples de coordonnées pour les remettre dans l'ordre des x croissant
 * @author Jean-Claude Lhote
 */
export function trieCouples (x, y) {
  let xInter, yInter
  for (let i = 0; i < x.length - 1; i++) {
    for (let j = i + 1; j < x.length; j++) {
      if (x[i] > x[j]) {
        xInter = x[i]
        x[i] = x[j]
        x[j] = xInter
        yInter = y[i]
        y[i] = y[j]
        y[j] = yInter
      } else if (egal(x[i], x[j])) {
        console.log('Deux couples ont la même valeur de x ! je ne peux pas trier')
        return false
      }
    }
  }
  return true
}

/**
 * inspiré de https://yahiko.developpez.com/tutoriels/introduction-interpolation/?page=page_8#L8-3
 * La spline de Catmull-Rom utilise ici un tableau d'ordonnées successives pour des abscisses équiréparties.
 * Donc on donne le tableau des valeurs de y, l'abscisse correspondant à la première valeur de y et le pas (step) permettant de passer d'une abscisse à la suivante.
 * Adaptation pour Mathalea
 * @author Jean-Claude Lhote
 */
class SplineCatmullRom {
  constructor ({ tabY = [], x0 = -5, step = 1 }) {
    this.x = []
    this.y = []
    this.f = []

    const n = tabY.length // on a n valeurs de y et donc de x, soit n-1 intervalles numérotés de 1 à n-1.
    for (let i = 0; i < n; i++) {
      this.x[i] = x0 + step * i
      this.y[i] = tabY[i]
    }

    this.image = function (x) {
      let trouveK = false
      let k = 0
      let y0, y1, y2, y3, t
      for (let i = 2; i <= n; i++) {
        if (x >= this.x[i - 2] && x <= this.x[i - 1]) {
          k = i
          trouveK = true
          break
        }
      }
      if (!trouveK) {
        return false
      } else {
        const i = k - 1
        if (i === 1) { // on est dans l'intervalle [x0,x1] le premier intervalle. i est le numéro de l'intervalle.
          y1 = this.y[i - 1]
          y2 = this.y[i]
          y0 = 2 * y1 - y2
          y3 = this.y[i + 1]
        } else if (i === n - 1) { // on est dans le dernier intervalle [xn-2,xn-1]
          y0 = this.y[i - 2]
          y1 = this.y[i - 1]
          y2 = this.y[i]
          y3 = 2 * y2 - y1
        } else {
          y0 = this.y[i - 2]
          y1 = this.y[i - 1]
          y2 = this.y[i]
          y3 = this.y[i + 1]
        }

        t = calcul((x - this.x[i - 1]) / (this.x[i] - this.x[i - 1]))
        const t2 = t * t
        const t3 = t2 * t
        const b0 = -t + 2 * t2 - t3
        const b1 = 2 - 5 * t2 + 3 * t3
        const b2 = t + 4 * t2 - 3 * t3
        const b3 = -t2 + t3
        return calcul((b0 * y0 + b1 * y1 + b2 * y2 + b3 * y3) / 2)
      }
    }
  }
}

export function splineCatmullRom ({ tabY = [], x0 = -5, step = 1 }) {
  return new SplineCatmullRom({ tabY: tabY, x0: x0, step: step })
}

/**
* @param {boolean} rand Donner true si on veut un polynôme aléatoire
* @param {number} deg à fournir >=0 en plus de rand === true pour fixer le degré
* @param {Array} coeffs liste de coefficients par ordre de degré croissant OU liste de couples [valeurMax, relatif?]
* @author Jean-Léon Henry, Jean-Claude Lhote
* @example Polynome({ coeffs:[0, 2, 3] }) donne 3x²+2x
* @example Polynome({ rand:true, deg:3 }) donne un ax³+bx²+cx+d à coefficients entiers dans [-10;10]\{0}
* @example Polynome({ rand:true, coeffs:[[10, true], [0], [5, false]] }) donne un ax²+b avec a∈[1;5] et b∈[-10;10]\{0}
* Les monomes sont maintenant stockés sous forme de fractions (même pour les entiers)
*/
export class Polynome {
  constructor ({ rand = false, deg = -1, coeffs = [[10, true], [10, true]] }) {
    if (rand) {
      if (largerEq(deg, 0)) {
        // on construit coeffs indépendamment de la valeur fournie
        coeffs = new Array(deg + 1)
        coeffs.fill([10, true])
      }
      // Création de this.monomes
      this.monomes = coeffs.map(function (el, i) {
        if (equal(el[0], 0)) { return fraction(0) } else { return el[1] ? fraction(choice([-1, 1]) * randint(1, number(el[0]))) : fraction(randint(1, number(el[0]))) }
      })
    } else {
      // les coeffs sont fourni
      this.monomes = coeffs.map(function (el, i) {
        return fraction(el)
      })
    }
    this.deg = this.monomes.length - 1
  }

  isMon () { return this.monomes.filter(el => unequal(el, 0)).length === 1 }

  /**
  * @param {boolean} alg si true alors le coefficient dominant est doté de son signe +/-
  * @returns {string} expression mathématique
  */
  toMathExpr (alg = false) {
    let res = ''
    let maj = ''
    for (const [i, c] of this.monomes.entries()) {
      switch (i) {
        case this.deg: {
          const coeffD = alg ? ecritureAlgebriqueSauf1(fraction(c)) : this.deg === 0 ? fraction(c).toLatex() : rienSi1(fraction(c))
          switch (this.deg) {
            case 1:
              maj = equal(c, 0) ? '' : `${coeffD}x`
              break
            case 0:
              maj = equal(c, 0) ? '' : `${coeffD}`
              break
            default:
              maj = equal(c, 0) ? '' : `${coeffD}x^${i}`
          }
          break
        }
        case 0:
          maj = equal(c, 0) ? '' : ecritureAlgebrique(fraction(c))
          break
        case 1:
          maj = equal(c, 0) ? '' : `${ecritureAlgebriqueSauf1(fraction(c))}x`
          break
        default:
          maj = equal(c, 0) ? '' : `${ecritureAlgebriqueSauf1(fraction(c))}x^${i}`
          break
      }
      res = maj + res
    }
    return res
  }

  /**
   * Polynome type conversion to String
   * @returns le résultat de toMathExpr()
   */
  toString () {
    return this.toMathExpr()
  }

  /**
  * Ajoute un Polynome ou une constante
  * @param {Polynome|number|Fraction} p
  * @example p.add(3) pour ajouter la constante 3 à p
  * @returns {Polynome} this+p
  */
  add (p) {
    if (typeof p === 'number' || p.type === 'Fraction') {
      const coeffs = this.monomes
      coeffs[0] = add(this.monomes[0], p)
      return new Polynome({ coeffs })
    } else if (p instanceof Polynome) {
      const degSomme = max(this.deg, p.deg)
      const pInf = equal(p.deg, degSomme) ? this : p
      const pSup = equal(p.deg, degSomme) ? p : this
      const coeffSomme = pSup.monomes.map(function (el, index) { return index <= pInf.deg ? fraction(add(el, pInf.monomes[index])) : fraction(el) })
      return new Polynome({ coeffs: coeffSomme })
    } else {
      window.notify('Polynome.add(arg) : l\'argument n\'est ni un nombre, ni un polynome', { p })
    }
  }

  /**
 *
 * @param {Polynome|number|Fraction} q Polynome, nombre ou fraction
 * @example poly = poly.multiply(fraction(1,3)) divise tous les coefficients de poly par 3.
 * @returns q fois this
 */
  multiply (q) {
    let coeffs
    if (typeof q === 'number' || q.type === 'Fraction') {
      coeffs = this.monomes.map(function (el, i) { return fraction(multiply(el, q)) })
    } else if (q instanceof Polynome) {
      coeffs = new Array(this.deg + q.deg + 1)
      coeffs.fill(0)
      for (let i = 0; i <= this.deg; i++) {
        for (let j = 0; j <= q.deg; j++) {
          coeffs[i + j] = add(coeffs[i + j], multiply(this.monomes[i], q.monomes[j]))
        }
      }
    } else {
      window.notify('Polynome.multiply(arg) : l\'argument n\'est ni un nombre, ni un polynome', { q })
    }
    return new Polynome({ coeffs })
  }

  /**
  * Retourne la dérivée
  * @returns {Polynome} dérivée de this
  */
  derivee () {
    const coeffDerivee = this.monomes.map(function (el, i) { return fraction(multiply(i, el)) })
    coeffDerivee.shift()
    return new Polynome({ coeffs: coeffDerivee })
  }

  /**
  * Appelle toMathExpr
  * @param {Array} coeffs coefficients du polynôme par ordre de degré croissant
  * @param {boolean} alg si true alors le coefficient dominant est doté de son signe +/-
  * @returns {string} expression du polynome
  */
  static print (coeffs, alg = false) {
    const p = new Polynome({ coeffs })
    return p.toMathExpr(alg)
  }
}
