import { arrondi, obtenirListeFacteursPremiers, quotientier, extraireRacineCarree, fractionSimplifiee, unSiPositifMoinsUnSinon } from './outils.js'
import { point, vecteur, segment, carre, cercle, arc, translation, rotation, texteParPosition } from './2d.js'
import { Fraction, equal, largerEq, subtract, add, abs, multiply, gcd } from 'mathjs'
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
 * f = new Fraction ('0.(3)') // crée la fraction $\frac{1}{3}$
 * f = fraction(12,15) // crée la fraction $\frac{12}{15}$ (Remarque : new Fraction(12,15) crée $\frac{4}{5}$)
 * f = fraction(0.4) // crée la fraction $\frac{2}{5}$
 */
export default class FractionX extends Fraction {
  constructor (...args) {
    super(...args)
    if (args.length === 2) {
      this.s = 1
      this.n = args[0]
      this.d = args[1]
    }
    // pour ne pas faire ces calculs à chaque instanciation de Fraction, on passe par defineProperty
    // (qui permet de ne faire le calcul qu'à la première lecture de la propriété)
    /**
     * Numérateur réduit
     * @property numIrred
     * @type {number}
     */
    let numIrred
    definePropRo(this, 'numIrred', () => {
      if (!numIrred) numIrred = fractionSimplifiee(this.n, this.d)[0]
      return numIrred
    })
    /**
     * Dénominateur réduit
     * @property denIrred
     * @type {number}
     */
    let denIrred
    definePropRo(this, 'denIrred', () => {
      if (!denIrred) denIrred = fractionSimplifiee(this.n, this.d)[1]
      return denIrred
    })
    /**
        * Valeur de la fraction × 100
        * @property pourcentage
        * @type {number}
        */
    let pourcentage
    definePropRo(this, 'pourcentage', () => {
      if (!pourcentage) pourcentage = arrondi(this.n * 100 / this.d, 2)
      return pourcentage
    })
    /**
     * le signe de la fraction : -1 pour négatif , 0 ou 1 pour positif
     * @type {number}
     */
    let sign
    definePropRo(this, 'signe', () => {
      if (!sign) sign = this.s * unSiPositifMoinsUnSinon(this.n) * unSiPositifMoinsUnSinon(this.d)
      return sign
    })
    let signeString
    definePropRo(this, 'signeString', () => {
      if (!signeString) signeString = this.signe === -1 ? '-' : '+'
      return signeString
    })
    /**
     * num/den
     * @property texFraction
     * @type {string}
     */
    let texFraction
    definePropRo(this, 'texFraction', () => {
      if (!texFraction) texFraction = `\\dfrac{${this.n}}{${this.d}}`
      return texFraction
    })
    /**
       * num/den mais avec simplification des signes
       * @property texFSD littéralement texFractionSigneDevant (si c'est un moins sinon rien... pour avoir le + devant, utiliser ecritureAlgebrique)
       * @type {string}
       */
    let texFSD
    definePropRo(this, 'texFSD', () => {
      if (!texFSD) texFSD = this.signe === -1 ? Math.abs(this.d) === 1 ? '-' + String(Math.abs(this.n)) : `-\\dfrac{${Math.abs(this.n)}}{${Math.abs(this.d)}}` : Math.abs(this.d) === 1 ? String(Math.abs(this.n)) : `\\dfrac{${Math.abs(this.n)}}{${Math.abs(this.d)}}`
      return texFSD
    })
    /**
     * +n/d si positif, -n/d si négatif
     * @property texFractionSignee
     * @type {string}
     * propriété qui n'est pas très utile puisque ecritureAlgebrique gère les fractions maintenant (défini pour compatibilité avec les exos qui l'utilisent)
     */
    let texFractionSignee
    definePropRo(this, 'texFractionSignee', () => {
      if (!texFractionSignee) texFractionSignee = (this.signe === -1) ? this.texFSD : '+' + this.texFSD
      return texFractionSignee
    })
    /**
     * n/d si positif, (-n/d) sinon
     * @property texFSP littéralement texFractionSigneParentheses
     * @type {string}
     */
    let texFSP
    definePropRo(this, 'texFSP', () => {
      if (!texFSP) texFSP = (this.signe >= 0) ? this.texFSD : `(${this.texFractionSignee})`
      return texFSP
    })
    /**
     * le code LaTeX de la fraction simplifiée
     * @property texFractionSimplifiee
     * @type {string}
     */
    let texFractionSimplifiee
    definePropRo(this, 'texFractionSimplifiee', () => {
      if (!texFractionSimplifiee) texFractionSimplifiee = (new FractionX(this.numIrred*this.s, this.denIrred)).texFSD
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
      if (!ecritureAlgebrique) ecritureAlgebrique = this.signe === 1 ? '+' + this.texFSD : this.texFSD
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
  }
  /**
   * basé sur la méthode toLatex() de mathjs, on remplace \frac par \dfrac plus joli.
   * @returns la chaine Latex pour écrire la fraction (signe devant)
   */
  toLatex = () => super.toLatex().replace('\\frac','\\dfrac')
}

/**
 * Convertit la FractionX en Fraction
 * @returns un objet Fraction (mathjs)
 */
function toFraction () { return new Fraction(this.n*this.s,this.d)}
FractionX.prototype.toFraction = toFraction

/**
 * @returns la FractionX positive.
 */
function valeurAbsolue () { return fraction(abs(this.n), abs(this.d))}
FractionX.prototype.valeurAbsolue = valeurAbsolue

/**
 * @returns la FractionX irreductible
 */
function simplifie () {return fraction(this.n * this.s / gcd(this.n,this.d), this.d / gcd(this.n,this.d))}
FractionX.prototype.simplifie = simplifie

/**
 * @returns l'opposé de la FractionX
 */
function oppose () { return fraction(-1 * this.n * this.s, this.d)}
FractionX.prototype.oppose = oppose

/**
 * On pourra utiliser k = 0.5 pour simplifier par 2 la fraction par exemple.
 * @param {coefficient} k 
 * @returns La FractionX dont le numérateur et le dénominateur ont été multipliés par k.
 */
function fractionEgale(k) {
    const f = fraction(0, 1)
    f.s = this.s
    f.d = arrondi(this.d * k,6)
    f.n = arrondi(this.n * k,6)
    return f
}
FractionX.prototype.fractionEgale = fractionEgale

/**
 * @returns true si la FractionX est un entier.
 */
function estEntiere (){
    const f = new Fraction(this.n, this.d)
    return f.d === 1
  } 
FractionX.prototype.estEntiere = estEntiere

/**
 * @returns true si la racine carrée de la FractionX est une FractionX
 */
function estParfaite () { return this.racineCarree() !== false}
FractionX.prototype.estParfaite = estParfaite

/**
 * @param {FractionX ou Fraction} f 
 * @returns true si la FractionX est égale à la fraction passée en argument.
 */
function estEgal (f) { return equal(this, f)}
FractionX.prototype.egal = estEgal

/**
 * @returns true si la FractionX est irréductible
 */
function estIrreductible () { return gcd(this.n, this.d) === 1}
FractionX.prototype.estIrreductible = estIrreductible

/**
 * @param {FractionX ou Fraction} f 
 * @returns la fractionX - f résultat simplifié
 */
function differenceFraction (f) { return  fraction(subtract(this, f))}
FractionX.prototype.differenceFraction = differenceFraction // retourne un résultat simplifié

/**
 * @param {coefficient} n 
 * @returns La fractionX multipliée par n (numérateur n fois plus grand)
 */
function multiplieEntier (n) { return fraction(this.n * n * this.s, this.d)}
FractionX.prototype.multiplieEntier = multiplieEntier

/**
 * @param {coefficient} n 
 * @returns La FractionX divisée par n (denominateur n fois plus grand)
 */
function entierDivise (n) { return fraction(this.n * this.s, n * this.d)}
FractionX.prototype.entierDivise = entierDivise
/**
 * 
 * @param {number} n 
 * @returns n + la FractionX
 */
function ajouteEntier (n) { return fraction(this.n * this.s + n * this.d, n * this.d)}
FractionX.prototype.ajouteEntier = ajouteEntier

/**
 * @param {number} n 
 * @returns n - la FractionX
 */
function entierMoinsFraction (n) { return fraction(n * this.d - this.n * this.signe, n * this.d)}
FractionX.prototype.entierMoinsFraction = entierMoinsFraction
/**
 * 
 * @param {FractionX ou Fraction ou nombre} f 
 * @returns true si FractionX >= f
 */
function superieurlarge (f) { return largerEq(this, f)}
FractionX.prototype.superieurlarge = superieurlarge

/**
 * 
 * @param {FractionX} f 
 * @returns true si FractionX = f et FractionX est plus réduite que f
 */
function estUneSimplification (f) { return  (equal(fraction(this), f) && abs(this.n) < abs(f.n))}
FractionX.prototype.estUneSimplification = estUneSimplification

/**
 * 
 * @param {FractionX} f 
 * @returns f + FractionX
 */
function sommeFraction(f) { return fraction(add(this, f)) }
FractionX.prototype.sommeFraction = sommeFraction

/**
 * @param  {...any} fractions 
 * @returns FractionX + ...fractions (ajoute plusieurs fractions à la FractionX)
 */
function sommeFractions(...fractions) { // retourne un résultat simplifié
    let s = fraction(this.s * this.n, this.d)
    for (const f of fractions) {
      s = fraction(add(s, f))
    }
    return s.simplifie()
  }
FractionX.prototype.sommeFractions = sommeFractions

/**
 * @param {FractionX} f 
 * @returns f * FractionX
 */
function produitFraction(f){ return fraction(multiply(this, f))}
FractionX.prototype.produitFraction = produitFraction

/**
 * @param  {...any} fractions 
 * @returns produit de FractionX par toutes les fractions passées en argument.
 */
function produitFractions (...fractions) { // retourne un résultat simplifié
    let s = fraction(this.s * this.n, this.d)
    for (const f of fractions) {
      s = fraction(multiply(s, f))
    }
    return s.simplifie()
  }
FractionX.prototype.produitFractions = produitFractions

/**
 * @returns NaN si la Fraction n'est pas un nombre décimal sinon retourne une FractionX avec la bonne puissance de 10 au dénominateur
 */
function fractionDecimale()  {
    const den = this.simplifie().d
const num = this.simplifie().n
const signe = this.simplifie().s
const liste = obtenirListeFacteursPremiers(den)
let n2 = 0; let n5 = 0
for (const n of liste) {
  if (n === 2) { n2++ } else if (n === 5) { n5++ } else { return 'NaN' }
}
if (n5 === n2) {
  return fraction(num * signe, den)
} else if (n5 > n2) {
  return fraction(signe * num * 2 ** (n5 - n2), den * 2 ** (n5 - n2))
} else {
  return fraction(signe * num * 5 ** (n2 - n5), den * 5 ** (n2 - n5))
}
}
FractionX.prototype.fractionDecimale = fractionDecimale

/**
   * Retourne la chaine latex contenant la racine carrée de la fraction
   * @param {boolean} detaillee Si detaillee est true, une étape de calcul se place avant le résultat.
   * @return {Fraction}
   */
 function texRacineCarree (detaillee = false) {
    let factoDen = extraireRacineCarree(Math.abs(this.d))
    let factoNum
    if (factoDen[1] !== 1) {
      factoNum = extraireRacineCarree(Math.abs(this.n * factoDen[1]))
      factoDen = extraireRacineCarree(Math.abs(this.d * factoDen[1]))
    } else {
      factoNum = extraireRacineCarree(Math.abs(this.n))
    }
    const k = fraction(factoNum[0], factoDen[0]).simplifie()
    const r = fraction(factoNum[1], factoDen[1]).simplifie()
    let etape = ''
    if (this.s === -1) {
      return false
    } else if (this.s === 0) {
      return '0'
    } else {
      if (detaillee) {
        if (this.d !== 1) {
          etape = `\\sqrt{\\dfrac{${this.n}}{${this.d}}}=`
        } else {
          if (factoNum[0] !== 1) {
            etape = `\\sqrt{${this.n}}=`
          } else {
            etape = ''
          }
        }
        if (k.valeurDecimale !== 1) {
          if (k.d === 1) {
            etape += `\\sqrt{${factoNum[0]}^2\\times${factoNum[1]}}=`
          } else {
            if (factoNum[0] !== 1) {
              etape += `\\sqrt{\\dfrac{${factoNum[0]}^2\\times${factoNum[1]}}{${factoDen[0]}^2\\times${factoDen[1]}}}=`
            } else {
              if (factoDen[1] !== 1) {
                etape += `\\sqrt{\\dfrac{${factoNum[1]}}{${factoDen[0]}^2\\times${factoDen[1]}}}=`
              } else {
                etape += `\\sqrt{\\dfrac{${factoNum[1]}}{${factoDen[0]}^2}}=`
              }
            }
          }
        }
      }

      if (arrondi(factoNum[1] / factoDen[1],6) === 1) {
        return etape + k.texFraction
      } else {
        if (k.n === 1 && k.d !== 1) {
          if (r.d === 1) {
            return (k.valeurDecimale === 1 ? etape : etape + `\\dfrac{\\sqrt{${r.n}}}{${k.d}}`)
          } else {
            return (k.valeurDecimale === 1 ? etape : etape + k.texFraction) + `\\sqrt{${r.texFraction}}`
          }
        } else {
          return (k.valeurDecimale === 1 ? etape : etape + k.texFraction) + `\\sqrt{${r.texFraction}}`
        }
      }
    }
  }
  FractionX.prototype.texRacineCarree = texRacineCarree
 
  /**
   * Retourne la racine carrée de la fraction si c'est une fraction et false sinon
   * @param {boolean} detaillee Si detaillee est true, une étape de calcul se place avant le résultat.
   * @return {Fraction}
   */
  function  racineCarree () {
    const factoNum = extraireRacineCarree(Math.abs(this.n))
    const factoDen = extraireRacineCarree(Math.abs(this.d))
    const k = fraction(factoNum[0], factoDen[0]).simplifie()
    const r = fraction(factoNum[1], factoDen[1]).simplifie()
    if (r.valeurDecimale !== 1 || this.s === -1) {
      return false
    } else {
      return k
    }
  }
FractionX.prototype.racineCarree = racineCarree

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
function representationIrred(x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = ''){
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
FractionX.prototype.representationIrred = representationIrred


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
function representation(x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '') {
    const objets = []
    let num, k, dep, s, a, O, C
    const n = quotientier(this.n, this.d)
    num = this.n
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
        for (let i = 0; i < this.d; i++) {
          s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - i * 360 / this.d))
          objets.push(s)
        }
        dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - depart * 360 / this.d)
        for (let j = 0; j < Math.min(this.d, num); j++) {
          a = arc(dep, O, -360 / this.d, true, couleur)
          a.opacite = 0.3
          dep = rotation(dep, O, -360 / this.d)
          objets.push(a)
        }
        num -= this.d
      }
      if (this.n % this.d !== 0) {
        const O = point(x + k * 2 * (rayon + 0.5), y)
        const C = cercle(O, rayon)
        objets.push(C)
        for (let i = 0; i < this.d; i++) {
          s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - i * 360 / this.d))
          objets.push(s)
        }
  
        dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90 - depart * 360 / this.d)
        if (this.n % this.d !== 0) {
          for (let j = 0; j < Math.min(this.d, num); j++) {
            a = arc(dep, O, -360 / this.d, true, couleur)
            a.opacite = 0.3
            dep = rotation(dep, O, -360 / this.d)
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
        for (let i = 0; i < this.d; i++) {
          s = segment(translation(O, vecteur(i * rayon / this.d, 0)), translation(O, vecteur((i + 1) * rayon / this.d, 0)))
          s.styleExtremites = '|-'
          objets.push(s)
        }
        a = segment(O, point(O.x + Math.min(num, this.d) * rayon / this.d, O.y))
        a.color = couleur
        a.opacite = 0.4
        a.epaisseur = 6
        objets.push(a)
        num -= this.d
      }
      O = point(x + k * rayon, y)
      C = translation(O, vecteur(rayon, 0))
      s = segment(O, C)
      s.styleExtremites = '-|'
      objets.push(s)
      for (let i = 0; i < this.d; i++) {
        s = segment(translation(O, vecteur(i * rayon / this.d, 0)), translation(O, vecteur((i + 1) * rayon / this.d, 0)))
        s.styleExtremites = '|-'
        objets.push(s)
      }
      a = segment(O, point(O.x + Math.min(num, this.d) * rayon / this.d, O.y))
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
        if (label !== '') { objets.push(texteParPosition(label, x + rayon * this.n / this.d, y - 0.6, 'milieu', 'black', scale)) }
      }
    } else { // Type barre
      let diviseur
      if (this.d % 6 === 0) { diviseur = 6 } else if (this.d % 5 === 0) { diviseur = 5 } else if (this.d % 4 === 0) { diviseur = 4 } else if (this.d % 3 === 0) { diviseur = 3 } else if (this.d % 2 === 0) { diviseur = 2 } else { diviseur = 1 }
  
      for (k = 0; k < n; k++) {
        for (let j = 0; j < diviseur; j++) {
          for (let h = 0; h < arrondi(this.d / diviseur); h++) {
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
          for (let h = 0; h < arrondi(this.d / diviseur); h++) {
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
  
FractionX.prototype.representation = representation