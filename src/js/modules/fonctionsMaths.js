import { number, add, unequal, largerEq, fraction, equal, multiply, inv, matrix, max, polynomialRoot, round, acos, abs } from 'mathjs'
import FractionX from './FractionEtendue.js'
import { calcul, arrondi, ecritureAlgebrique, egal, randint, rienSi1, ecritureAlgebriqueSauf1, choice } from './outils.js'
import { ObjetMathalea2D } from './2dGeneralites.js'
import { Courbe, Segment } from './2d.js'
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
export function degCos (a) {
  return calcul(Math.cos(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : le sinus de l'angle
   * @author Jean-Claude Lhote
   */
export function degSin (a) {
  return calcul(Math.sin(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : la tangente de l'angle
   * @author Jean-Claude Lhote
   */
export function degTan (a) {
  return calcul(Math.tan(radians(a)))
}
/**
   * @param {number} un nombre qui correspond au cosinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function degAcos (x) {
  return arrondi(degres(Math.acos(x)), 1)
}
/**
   * @param {number} un nombre qui correspond au sinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function degAsin (x) {
  return arrondi(degres(Math.asin(x)), 1)
}
/**
   * @param {number} un nombre qui correspond à la tangente de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function degAtan (x) {
  return arrondi(degres(Math.atan(x)), 1)
}
/**
 * retourne un décimal sans décimales bizarres
 * Déprécié -> utiliser la classe Decimal de Decimal.js pour travailler avec de vrais décimaux
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
 * déprécié -> utiliser Decimal.toString() pour travailler avec les décimaux
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

export function fractionLatexToMathjs (fractionLatex) {
  const parts = fractionLatex.split('{')
  const num = Number(parts[1].substring(0, parts[1].length - 1))
  const den = Number(parts[2].substring(0, parts[2].length - 1))
  return new FractionX(num, den)
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
 * @property {number[]} x liste des abscisses des noeuds (rempli à partir de x0 et step)
 * @property {number[]} y liste des ordonnées des noeuds
 * @property {number} n nombre de noeuds
 * @property {Polynome[]} polys liste des polynomes correspondants à chaque intervalle
 * @property {Function[]} fonctions liste des fonctions correspondantes à chaque polynome
 * @method  {(number)=>number[]} solve(y) retourne les antécédents de y
 * @methode {number=>number} image(x) retourne l'image de x par la fonction
 * @author Jean-Claude Lhote
 */
class SplineCatmullRom {
  /**
   *
   * @param {number[]} tabY liste des valeurs de y au niveau des noeuds (sa longueur détermine le nombre d'intervalles
   * @param {number} x0 l'abscisse du début de l'intervalle de définition
   * @param {number} step le pas entre chaque valeur de x pour les différents noeuds successifs
   */
  constructor ({ tabY = [], x0 = -5, step = 1 }) {
    this.x = []
    this.y = []
    this.n = tabY.length // on a n valeurs de y et donc de x, soit n-1 intervalles numérotés de 1 à n-1.
    this.step = step // on en a besoin pour la dérivée...

    for (let i = 0; i < this.n; i++) {
      this.x[i] = x0 + step * i
      this.y[i] = tabY[i]
    }
    this.polys = this.definePolys()
    this.fonctions = this.convertPolyFunction()
  }

  /**
   * définis les polynomes de CatMulRom
   * @returns {Polynome[]}
   */
  definePolys () {
    const polys = []
    for (let i = 1; i < this.n; i++) {
      let y0, y1, y2, y3
      if (i === 1) { // on est dans l'intervalle [x0,x1] le premier intervalle. i est le numéro de l'intervalle.
        y1 = this.y[i - 1]
        y2 = this.y[i]
        y0 = 2 * y1 - y2
        y3 = this.y[i + 1]
      } else if (i === this.n - 1) { // on est dans le dernier intervalle [xn-2,xn-1]
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
      // t = (x - this.x[i - 1]) / (this.x[i] - this.x[i - 1])
      const k = 1 / (this.x[i] - this.x[i - 1])
      const t0 = new Polynome({ isUseFraction: false, coeffs: [-this.x[i - 1], 1] })
      const t = t0.multiply(k)
      const t2 = t.multiply(t)
      const t3 = t2.multiply(t)
      const b0 = t.multiply(-1).add(t2.multiply(2)).add(t3.multiply(-1)) // -t + 2 * t2 - t3
      const b1 = t3.multiply(3).add(t2.multiply(-5)).add(2) // b1 = 2 - 5 * t2 + 3 * t3
      const b2 = t.add(t2.multiply(4)).add(t3.multiply(-3)) // b2 = t + 4 * t2 - 3 * t3
      const b3 = t3.add(t2.multiply(-1)) // b3 = -t2 + t3 // tous les bi sont de degré 3 en x
      // pol est le polynome de degré 3 pour cet intervalle !
      const pol = b0.multiply(y0).add(b1.multiply(y1)).add(b2.multiply(y2)).add(b3.multiply(y3)).multiply(0.5)//  (b0 * y0 + b1 * y1 + b2 * y2 + b3 * y3) / 2
      polys.push(pol)
    }
    return polys
  }

  /**
   * convertit les polynomes en fonctions
   * @returns {Function[]}
   */
  convertPolyFunction () {
    const f = []
    for (let i = 0; i < this.n - 1; i++) {
      f.push(this.polys[i].fonction)
    }
    return f
  }

  solve (y) {
    const antecedents = []
    for (let i = 0; i < this.polys.length; i++) {
      const polEquation = this.polys[i].add(-y) // Le polynome dont les racines sont les antécédents de y
      // Algebrite n'aime pas beaucoup les coefficients decimaux...
      try {
        const liste = polynomialRoot(...polEquation.monomes)
        for (const valeur of liste) {
          let arr
          if (typeof valeur === 'number') {
            arr = round(valeur, 3)
          } else { // complexe !
            const module = valeur.toPolar().r
            if (module < 1e-5) { // module trop petit pour être complexe, c'est 0 !
              arr = 0
            } else {
              if (abs(valeur.arg()) < 0.01 || (abs(valeur.arg() - acos(-1)) < 0.01)) { // si l'argument est proche de 0 ou de Pi
                arr = round(valeur.re, 3) // on prend la partie réelle
              } else {
                arr = null // c'est une vraie racine complexe, du coup, on prend null
              }
            }
          }
          if (arr !== null && arr >= this.x[i] && arr <= this.x[i + 1]) {
            if (!antecedents.includes(arr)) {
              antecedents.push(arr)
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    return antecedents
  }

  get fonction () {
    return x => this.image(x)
  }

  image (x) {
    let trouveK = false
    let k = 0
    for (let i = 0; i < this.n - 1; i++) {
      if (x >= this.x[i] && x <= this.x[i + 1]) {
        k = i
        trouveK = true
        break
      }
    }
    if (!trouveK) {
      const intervalle = `D = [${this.x[0]} ; ${this.x[this.n - 1]}]`
      window.notify('SplineCatmullRom : la valeur de x fournie n\'est pas dans lìntervalle de définition de la fonction', { x, intervalle })
      return NaN
    } else {
      return this.fonctions[k](x)
    }
  }

  /**
   * retourne une nouvelle splineCatmulRom correspondant à la fonction dérivée de this.
   */
  get derivee () {
    const derivees = []
    for (let i = 0; i < this.n; i++) {
      derivees.push(this.polys[Math.min(i, this.n - 2)].derivee().fonction(this.x[i]))
    }
    const maSpline = new SplineCatmullRom({ tabY: derivees, x0: this.x[0], step: this.step, repere: this.repere })
    for (let i = 0; i < this.n - 1; i++) { // on redéfinit les polynomes
      maSpline.polys[i] = this.polys[i].derivee()
    }
    maSpline.fonctions = maSpline.convertPolyFunction() // on remets les 'bonnes' fonctions
    return maSpline
  }

  courbe ({
    repere,
    step = 0.1,
    color = 'black',
    epaisseur = 1
  } = {}) {
    return new Trace(this, {
      repere,
      step,
      color,
      epaisseur
    })
  }
}
/**
 * inspiré de https://yahiko.developpez.com/tutoriels/introduction-interpolation/?page=page_8#L8-3
 * La spline de Catmull-Rom utilise ici un tableau d'ordonnées successives pour des abscisses équiréparties.
 * Donc on donne le tableau des valeurs de y, l'abscisse correspondant à la première valeur de y et le pas (step) permettant de passer d'une abscisse à la suivante.
 * Adaptation pour Mathalea
 * @property {number[]} x liste des abscisses des noeuds (rempli à partir de x0 et step)
 * @property {number[]} y liste des ordonnées des noeuds
 * @property {number} n nombre de noeuds
 * @property {Polynome[]} polys liste des polynomes correspondants à chaque intervalle
 * @property {Function[]} fonctions liste des fonctions correspondantes à chaque polynome
 * @method  {(number)=>number[]} solve(y) retourne les antécédents de y
 * @methode {number=>number} image(x) retourne l'image de x par la fonction
 * @author Jean-Claude Lhote
 *
 * @param {number[]} tabY liste des valeurs de y au niveau des noeuds (sa longueur détermine le nombre d'intervalles
 * @param {number} x0 l'abscisse du début de l'intervalle de définition
 * @param {number} step le pas entre chaque valeur de x pour les différents noeuds successifs
 */
export function splineCatmullRom ({ tabY = [], x0 = -5, step = 1 } = {}) {
  return new SplineCatmullRom({ tabY, x0, step })
}

/**
 * @class
 * crée la courbe de la spline
 */
class Trace extends ObjetMathalea2D {
  /**
   * @param spline La splineCatmulRom dont on veut la Trace
   * @param repere le repère associé
   * @param step le pas entre deux points
   * @param color la couleur
   * @param epaisseur son épaisseur
   */
  constructor (spline, {
    repere,
    step = 0.1,
    color = 'black',
    epaisseur = 1
  } = {}) {
    super()
    const objets = []
    for (let i = 0; i < spline.n - 1; i++) {
      if (spline.polys[i].deg > 1) {
        objets.push(new Courbe(spline.fonctions[i], {
          repere,
          epaisseur,
          color,
          step,
          xMin: spline.x[i],
          xMax: spline.x[i + 1]
        }))
      } else {
        const s = new Segment(spline.x[i] * repere.xUnite, spline.y[i] * repere.yUnite, spline.x[i + 1] * repere.xUnite, spline.fonctions[i](spline.x[i + 1]) * repere.yUnite, color)
        s.epaisseur = epaisseur
        objets.push(s)
      }
    }
    this.svg = function (coeff) {
      let code = ''
      for (const objet of objets) {
        code += '\n\t' + objet.svg(coeff)
      }
      return code
    }
    this.tikz = function () {
      let code = ''
      for (const objet of objets) {
        code += '\n\t' + objet.tikz()
      }
      return code
    }
  }
}

/**
 * @param {boolean} useFraction si false, les coefficients ne seront pas convertis en fractions. (true par défaut, rendant l'expression mathématique inutilisable avec Algebrite)
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
  constructor ({ isUseFraction = true, rand = false, deg = -1, coeffs = [[10, true], [10, true]] }) {
    this.isUseFraction = isUseFraction
    if (rand) {
      if (largerEq(deg, 0)) {
        // on construit coeffs indépendamment de la valeur fournie
        coeffs = new Array(deg + 1)
        coeffs.fill([10, true])
      }
      // Création de this.monomes
      this.monomes = coeffs.map(function (el, i) {
        if (isUseFraction) {
          if (equal(el[0], 0)) {
            return fraction(0)
          } else {
            return el[1] ? fraction(choice([-1, 1]) * randint(1, number(el[0]))) : fraction(randint(1, number(el[0])))
          }
        } else {
          if (equal(el[0], 0)) {
            return 0
          } else {
            return el[1] ? choice([-1, 1]) * randint(1, number(el[0])) : randint(1, number(el[0]))
          }
        }
      })
    } else {
      // les coeffs sont fourni
      this.monomes = coeffs.map(function (el, i) {
        if (isUseFraction) {
          return fraction(el)
        } else {
          return el
        }
      })
    }
    this.deg = this.monomes.length - 1
  }

  isMon () { return this.monomes.filter(el => unequal(el, 0)).length === 1 }
  /**
   * @param {boolean} alg si true alors le coefficient dominant est doté de son signe +/-
   * @returns {string} expression mathématique compatible avec Algebrite
   */
  toMathExpr (alg = false) {
    let res = ''
    let maj = ''
    for (const [i, c] of this.monomes.entries()) {
      switch (i) {
        case this.deg: {
          const coeffD = alg ? ecritureAlgebriqueSauf1(c) : this.deg === 0 ? ecritureAlgebrique(c) : rienSi1(c)
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
          maj = equal(c, 0) ? '' : ecritureAlgebrique(c)
          break
        case 1:
          maj = equal(c, 0) ? '' : `${ecritureAlgebriqueSauf1(c)}x`
          break
        default:
          maj = equal(c, 0) ? '' : `${ecritureAlgebriqueSauf1(c)}x^${i}`
          break
      }
      maj = maj.replace(/\s/g, '').replace(',', '.')
      res = maj + res
    }
    return res
  }

  /**
  * @param {boolean} alg si true alors le coefficient dominant est doté de son signe +/-
  * @returns {string} expression mathématique
  */
  toLatex (alg = false) {
    let res = ''
    let maj = ''
    for (const [i, c] of this.monomes.entries()) {
      switch (i) {
        case this.deg: {
          const coeffD = alg ? ecritureAlgebriqueSauf1(this.isUseFraction ? fraction(c) : c) : this.deg === 0 ? (this.isUseFraction ? fraction(c).toLatex() : c) : rienSi1(this.isUseFraction ? fraction(c) : c)
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
          maj = equal(c, 0) ? '' : ecritureAlgebrique(this.isUseFraction ? fraction(c) : c)
          break
        case 1:
          maj = equal(c, 0) ? '' : `${ecritureAlgebriqueSauf1(this.isUseFraction ? fraction(c) : c)}x`
          break
        default:
          maj = equal(c, 0) ? '' : `${ecritureAlgebriqueSauf1(this.isUseFraction ? fraction(c) : c)}x^${i}`
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
    return this.toLatex()
  }

  /**
  * Ajoute un Polynome ou une constante
  * @param {Polynome|number|Fraction} p
  * @example p.add(3) pour ajouter la constante 3 à p
  * @returns {Polynome} this+p
  */
  add (p) {
    const isUseFraction = this.isUseFraction
    if (typeof p === 'number' || p.type === 'Fraction') {
      const coeffs = this.monomes
      coeffs[0] = add(this.monomes[0], p)
      return new Polynome({ isUseFraction, coeffs })
    } else if (p instanceof Polynome) {
      const degSomme = max(this.deg, p.deg)
      const pInf = equal(p.deg, degSomme) ? this : p
      const pSup = equal(p.deg, degSomme) ? p : this
      const coeffSomme = isUseFraction
        ? pSup.monomes.map(function (el, index) { return index <= pInf.deg ? fraction(add(el, pInf.monomes[index])) : fraction(el) })
        : pSup.monomes.map(function (el, index) { return index <= pInf.deg ? add(el, pInf.monomes[index]) : el })
      return new Polynome({ isUseFraction, coeffs: coeffSomme })
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
    const isUseFraction = this.isUseFraction
    let coeffs
    if (typeof q === 'number' || q.type === 'Fraction') {
      coeffs = isUseFraction
        ? this.monomes.map(function (el, i) { return fraction(multiply(el, q)) })
        : this.monomes.map(function (el, i) { return multiply(el, q) })
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
    return new Polynome({ isUseFraction, coeffs })
  }

  /**
  * Retourne la dérivée
  * @returns {Polynome} dérivée de this
  */
  derivee () {
    const coeffDerivee = this.isUseFraction
      ? this.monomes.map(function (el, i) { return fraction(multiply(i, el)) })
      : this.monomes.map(function (el, i) { return multiply(i, el) })
    coeffDerivee.shift()
    return new Polynome({ isUseFraction: this.isUseFraction, coeffs: coeffDerivee })
  }

  /**
  * Appelle toMathExpr
  * @param {Array} coeffs coefficients du polynôme par ordre de degré croissant
  * @param {boolean} alg si true alors le coefficient dominant est doté de son signe +/-
  * @returns {string} expression du polynome
  */
  static print (coeffs, alg = false) {
    const p = new Polynome({ coeffs })
    return p.toLatex(alg)
  }

  /**
   * la fonction à utiliser pour tracer la courbe par exemple ou calculer des valeurs comme dans pol.image()
   * const f = pol.fonction est une fonction utilisable dans courbe()
   * @returns {function(number): number}
   */
  get fonction () {
    return x => this.monomes.reduce((val, current) => val + current * x ** this.monomes.findIndex(coeff => coeff === current))
  }

  /**
   * Pour calculer l'image d'un nombre
   * @param x
   * @returns {math.Fraction | number | int} // à mon avis ça ne retourne que des number...
   */
  image (x) {
    return this.fonction(x)
  }
}

function angleOppose (angle) { // retourne l'angle opposé d'un angle du premier cadrant (sinon, on pourrait avoir plusieurs signe '-' collés ensemble)
  if (angle.degres === '0') {
    return angle
  } else {
    return new Angle({ degres: '-' + angle.degres, cos: angle.cos, sin: angle.sin === '0' ? angle.sin : opposeStringArray(angle.sin), tan: angle.tan === '0' ? angle.tan : '-' + angle.tan, radians: '-' + angle.radians })
  }
}
function complementaireRad (angleEnRadian) { // retourne la mesure en radians du complémentaire d'un angle du premier quadrant donné également en radians
  switch (angleEnRadian) {
    case '\\dfrac{\\pi}{4}':
      return angleEnRadian
    case '\\dfrac{\\pi}{6}':
      return '\\dfrac{\\pi}{3}'
    case '\\dfrac{\\pi}{3}':
      return '\\dfrac{\\pi}{6}'
    case '\\dfrac{\\pi}{2}' :
      return '0'
    case '0' :
      return '\\dfrac{\\pi}{2}'
  }
}
function supplementaireRad (angleEnRadian) { // retourne la mesure en radians du supplémentaire d'un angle du premier quadrant donné également en radians
  switch (angleEnRadian) {
    case '\\dfrac{\\pi}{4}':
      return '\\dfrac{3\\pi}{4}'
    case '\\dfrac{\\pi}{6}':
      return '\\dfrac{5\\pi}{6}'
    case '\\dfrac{\\pi}{3}':
      return '\\dfrac{2\\pi}{3}'
    case '\\dfrac{\\pi}{2}' :
      return '\\dfrac{\\pi}{2}'
    case '0' :
      return '\\pi'
  }
}

function inverseTan (angle) {
  switch (angle.tan) {
    case '\\infin':
    case '-\\infin':
      return '0'
    case '1': return '1'
    case '\\sqrt{3}': return '\\dfrac{\\sqrt{3}}{3}'
    case '\\dfrac{\\sqrt{3}}{3}': return '\\sqrt{3}'
  }
}
function angleComplementaire (angle) { // retourne l'angle complémentaire d'un angle du premier cadrant
  return new Angle({ degres: (90 - parseInt(angle.degres)).toString(), cos: angle.sin, sin: angle.cos, tan: inverseTan(angle), radians: complementaireRad(angle.radians) })
}
function angleSupplementaire (angle) { // retourne l'angle supplémentaire d'un angle du premier cadrant
  return new Angle({ degres: (180 - parseInt(angle.degres)).toString(), cos: angle.cos === '0' ? '0' : opposeStringArray(angle.cos), sin: angle.sin, tan: angle.tan === '\\infin' ? '\\infin' : '-' + angle.tan, radians: supplementaireRad(angle.radians) })
}

function opposeStringArray (value) {
  if (Array.isArray(value)) {
    const result = []
    for (const e of value) {
      result.push('-' + e)
    }
    return result
  } else return '-' + value
}

/**
 * @class
 * Crée un objet qui contient les propriétés suivantes : degres, cos, sin, tan et radians.
 */
export class Angle {
  /**
   * @constructor
   * @param {object} param
   * @param {string} [param.degres] mesure de l'angle en degrés sous forme de string
   * @param {string} [param.cos] valeur du cosinus sous forme de string
   * @param {string} [param.sin] valeur du sinus sous forme de string
   * @param {string} [param.tan] valeur de la tangente sous forme de string
   * @param {string} [param.radians] mesure de l'angle en radians sous forme de string
   * @example const a = new Angle({ degres: '90', radians: '\\dfrac{5\\pi}{2}' }) => {degres: '90', cos: '0', sin: '1', tan: '\\infin', radians: '\\dfrac{5\\pi}{2}'}
   * @author Jean-Claude Lhote
   */
  constructor ({ degres, cos, sin, tan, radians }) { // il faut au moins fournir la mesure en degrés
    this.degres = degres
    const anglesDeBase = [
      { degres: '90', cos: '0', sin: '1', tan: '\\infin', radians: '\\dfrac{\\pi}{2}' },
      { degres: '45', cos: '\\dfrac{\\sqrt{2}}{2}', sin: '\\dfrac{\\sqrt{2}}{2}', tan: '1', radians: '\\dfrac{\\pi}{4}' },
      { degres: '60', cos: ['\\dfrac{1}{2}', '0.5'], sin: '\\dfrac{\\sqrt{3}}{2}', tan: '\\sqrt{3}', radians: '\\dfrac{\\pi}{3}' },
      { degres: '30', sin: ['\\dfrac{1}{2}', '0.5'], cos: '\\dfrac{\\sqrt{3}}{2}', tan: '\\dfrac{\\sqrt{3}}{3}', radians: '\\dfrac{\\pi}{6}' },
      { degres: '0', cos: '1', sin: '0', tan: '0', radians: '0' }
    ]
    const angle = anglesDeBase.find(el => el.degres === (parseInt(degres) % 360).toString())
    if (angle === undefined) { // si ce n'est pas un des anglesDeBase, alors il faut les autres arguments.
      this.cos = cos
      this.sin = sin
      this.tan = tan
      this.radians = radians
    } else { // si l'angle en degré est fourni, on aura par défaut les valeurs de l'angle de base si les paramètres ne sont pas donnés
      this.cos = cos || angle.cos
      this.sin = sin || angle.sin
      this.tan = tan || angle.tan
      this.radians = radians || angle.radians
    }
  }
}
export const anglesDeBase = [
  new Angle({ degres: '90', cos: '0', sin: '1', tan: '\\infin', radians: '\\dfrac{\\pi}{2}' }),
  new Angle({ degres: '45', cos: '\\dfrac{\\sqrt{2}}{2}', sin: '\\dfrac{\\sqrt{2}}{2}', tan: '1', radians: '\\dfrac{\\pi}{4}' }),
  new Angle({ degres: '60', cos: ['\\dfrac{1}{2}', '0.5'], sin: '\\dfrac{\\sqrt{3}}{2}', tan: '\\sqrt{3}', radians: '\\dfrac{\\pi}{3}' }),
  new Angle({ degres: '30', sin: ['\\dfrac{1}{2}', '0.5'], cos: '\\dfrac{\\sqrt{3}}{2}', tan: '\\dfrac{\\sqrt{3}}{3}', radians: '\\dfrac{\\pi}{6}' }),
  new Angle({ degres: '0', cos: '1', sin: '0', tan: '0', radians: '0' })
]

function moduloDeg (angleEnDegre, k) {
  const coef = 360 / parseInt(angleEnDegre)
  if (angleEnDegre === '0') {
    return ((2 * k) * 180).toString()
  } else return ((coef * k + 1) * parseInt(angleEnDegre)).toString()
}

function moduloRad (angleEnDegre, k) {
  const coef = 360 / parseInt(angleEnDegre)
  if (angleEnDegre === '0') {
    return `${2 * k}\\pi`
  } else return `\\dfrac{${coef * k + 1}\\pi}{${coef / 2}}`
}
/**
 *
 * @param {Angle} angle
 * @param {number} k On part de l'objet angle et on ajoute 2 * k * pi
 * @returns {Angle}
 */
function angleModulo (angle, k) {
  return new Angle({ degres: moduloDeg(angle.degres, k), cos: angle.cos, sin: angle.sin, tan: angle.tan, radians: moduloRad(angle.degres, k) })
}
/**
 * @param {object} param
 * @param {boolean} [param.associes] false pour niveau1 (quart de cercle) uniquement, true pour ajouter niveau2 (cercle trigo)
 * @param {number[]} [param.modulos] liste des k à utiliser pour ajouter les angles modulo 2k*Pi
 * @returns {{liste1: string[], liste2: string[], liste3: string[]}} liste1, liste2, liste3 les listes (niveau2 contient niveau1 et niveau3 contient niveau2)
 * @author Jean-Claude Lhote
 */
export function valeursTrigo ({ associes = true, modulos = [-1, 1] }) {
  let mesAngles = anglesDeBase.slice()
  const mesAnglesNiv1 = mesAngles.slice()
  const nombreAnglesDeBase = mesAngles.length

  // ici on complète la liste avec tous les angles associés en faisant attention de ne pas ajouter deux fois les mêmes.
  for (let i = 0; i < nombreAnglesDeBase; i++) {
    mesAngles.push(angleOppose(mesAngles[i]), angleComplementaire(mesAngles[i]), angleSupplementaire(mesAngles[i]))
  }
  // On supprime les doublons en comparant la mesure en degrés
  mesAngles = [...new Map(mesAngles.map(item => [item.degres, item])).values()]
  const mesAnglesNiv2 = mesAngles.slice()

  for (let i = 0; i < nombreAnglesDeBase; i++) {
    for (const k of modulos) {
      if (k !== 0) mesAngles.push(angleModulo(mesAngles[i % nombreAnglesDeBase], k))
    }
  }
  const mesAnglesNiv3 = mesAngles.slice()
  return { liste1: mesAnglesNiv1, liste2: mesAnglesNiv2, liste3: mesAnglesNiv3 }
}
