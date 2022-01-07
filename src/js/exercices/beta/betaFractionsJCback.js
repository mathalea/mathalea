import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, arrondi, ecritureAlgebrique, extraireRacineCarree, obtenirListeFacteursPremiers, quotientier } from '../../modules/outils.js'
import { number, fraction, multiply, round, subtract, add, abs, equal, largerEq, Fraction, gcd } from 'mathjs'
import { arc, carre, cercle, point, rotation, segment, texteParPosition, translation, vecteur } from '../../modules/2d.js'
export const titre = 'Tests avec les fractions'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot et Matthieu Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.spacing = 3
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let texte = ''
    const texteCorr = ''

    // Je fais des tests avec la classe Fraction de math.js

    Object.defineProperty(Fraction.prototype, 'texFraction', {
      get: function () { return this.d === 1 ? `${this.n * this.s}` : `\\dfrac{${this.n * this.s}}{${this.d}}` }
    })
    Object.defineProperty(Fraction.prototype, 'numIrred', {
      get: function () { return this.simplify().n }
    })
    Object.defineProperty(Fraction.prototype, 'denIrred', {
      get: function () { return this.simplify().d }
    })
    Object.defineProperty(Fraction.prototype, 'pourcentage', {
      get: function () { return round(this.n * 100 / this.d, 6) }
    })
    Object.defineProperty(Fraction.prototype, 'signeString', {
      get: function () { return this.s < 0 ? '-' : '+' }
    })
    Object.defineProperty(Fraction.prototype, 'texFSD', {
      get: function () { return this.d === 1 ? String(this.n * this.s) : (this.s > 0 && this.n * this.d > 0) ? `\\dfrac{${Math.abs(this.n)}}{${Math.abs(this.d)}}` : (this.n === 0) ? '0' : `-\\dfrac{${Math.abs(this.n)}}{${Math.abs(this.d)}}` }
    })
    Object.defineProperty(Fraction.prototype, 'texFractionSignee', {
      get: function () { return this.d === 1 ? ecritureAlgebrique(this.n * this.s) : (this.s > 0 && this.n * this.d > 0) ? `+\\dfrac{${Math.abs(this.n)}}{${Math.abs(this.d)}}` : (this.n === 0) ? '+0' : `-\\dfrac{${Math.abs(this.n)}}{${Math.abs(this.d)}}` }
    })
    Object.defineProperty(Fraction.prototype, 'texFractionSigneeParentheses', {
      get: function () { return (this.s >= 0) ? this.texFraction : `(${this.texFractionSignee})` }
    })
    Object.defineProperty(Fraction.prototype, 'texFractionSimplifiee', {
      get: function () { return fraction(this.n * this.s, this.d).texFSD }
    })
    Object.defineProperty(Fraction.prototype, 'ecritureAlgebrique', {
      get: function () { return this.s * this.d * this.n < 0 ? this.texFSD : '+' + this.texFSD }
    })
    Object.defineProperty(Fraction.prototype, 'valeurDecimale', {
      get: function () { return arrondi(number(this), 6) }
    })
    Fraction.prototype.simplifie = function () { return fraction(this.n * this.s, this.d) }
    Fraction.prototype.oppose = function () { return fraction(-1 * this.n * this.s, this.d) }
    Fraction.prototype.fractionEgale = function (k) {
      const f = new Fraction()
      f.s = this.s
      f.d = this.d * k
      f.n = this.n * k
      return f
    }
    Fraction.prototype.estEntiere = function () { return fraction(this.n, this.d).d === 1 }
    Fraction.prototype.estParfaite = function () { return this.racineCaree() !== false }
    Fraction.prototype.egal = function (f) { return equal(this, f) }
    Fraction.prototype.estIrreductible = function () { return gcd(this.n, this.d) === 1 }
    Fraction.prototype.differenceFraction = function (f) { return fraction(subtract(this, f)) }
    Fraction.prototype.multiplieEntier = function (n) { return fraction(this.n * n * this.s, this.d) }
    Fraction.prototype.entierDivise = function (n) { return fraction(this.n * this.s, n * this.d) }
    Fraction.prototype.ajouteEntier = function (n) { return fraction(this.n * this.s + n * this.d, n * this.d) }
    Fraction.prototype.entierMoinsFraction = function (n) { return fraction(n * this.d - this.n * this.signe, n * this.d) }
    Fraction.prototype.superieurlarge = function (f) { return largerEq(this, f) }
    Fraction.prototype.stUneSimplification = function (f) { return (equal(this, f) && abs(this.n) < abs(f.n)) }
    Fraction.prototype.sommeFraction = function (f) { return fraction(add(this, f)) }
    Fraction.prototype.sommeFractions = function (...fractions) {
      let s = fraction(this.s * this.n, this.d)
      for (const f of fractions) {
        s = fraction(add(s, f))
      }
      return s
    }
    Fraction.prototype.produitFraction = function (f) { return fraction(multiply(this, f)) }
    Fraction.prototype.produitFractions = function (...fractions) {
      let s = fraction(this.s * this.n, this.d)
      for (const f of fractions) {
        s = fraction(multiply(s, f))
      }
      return s
    }
    Fraction.prototype.fractionDecimale = function () {
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
    Fraction.prototype.racineCaree = function () {
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

    Fraction.prototype.texRacineCaree = function (detaillee = false) {
      if (this.s * this.d * this.n < 0) return false
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

        if (arrondi(factoNum[1] / factoDen[1], 6) === 1) {
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
    Fraction.prototype.representationIrred = function (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '') {
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
    Fraction.prototype.representation = function (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray', unite0 = 0, unite1 = 1, scale = 1, label = '') {
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

    // La ligne suivante crée la fraction - 1/2
    const maFraction = new Fraction(-8, 16)
    // Si on veut manipuler (-8)/16, on doit définir n, d et s ainsi :
    maFraction.n = 8
    maFraction.d = 16
    maFraction.s = 1 // Le signe (devant la fraction)est positif car il est passé sur le numérateur.
    texte += 'Je définis maFraction = new Fraction() -> sa valeur sera 0 {s: 1, n: 0, : 1}<br>'
    texte += `je modifie ses attributs : {n: 8, d: 16} -> j'obtiens $${maFraction.texFraction}$ avec maFraction.texFraction<br>`
    texte += `j'obtiens $${maFraction.texFractionSigneDevant}$ avec maFraction.texFractionSigneDevant<br>`
    texte += `j'obtiens $${maFraction.toLatex()}$ avec maFraction.toLatex() car mathjs utilise \\frac<br>`
    texte += `Voici maFraction.pourcentage : $${maFraction.pourcentage}$<br>`
    texte += `Voici maFraction.texRacineCarree(true) : $${maFraction.texRacineCaree(true)}$<br>`
    const f2 = multiply(maFraction, 32)
    texte += 'Je crée une nouvelle fraction f2 = multiply(maFraction, 32)<br>'
    texte += `Voici f2.texFraction : $${f2.texFraction}$ et voici f2.toLatex() : $${f2.toLatex()}$<br>`
    const f3 = multiply(maFraction, fraction(-1, 3))
    texte += 'Je crée une nouvelle fraction f3 = multiply(maFraction, fraction(-1,3))<br>'
    texte += `Voici f3.texFraction : $${f3.texFraction}$ et voici f3.toLatex() : $${f3.toLatex()}$<br>`
    texte += 'mathjs simplifie les fractions dès que possible. Si on veut travailler avec des fractions non simplifiées, il faut fixer le numérateur et le dénominateur directement.<br>'
    texte += `Si j'avais défini maFraction = new Fraction(8,16), j'aurais obtenu ceci : $${fraction(8, 16).texFraction}$ avec maFraction.texFraction car maFraction = {s: 1, n: 1, d: 2}<br>`

    console.log(maFraction)
    console.log(maFraction.inverse())
    console.log(maFraction.simplifie())
    console.log(maFraction.texRacineCaree(true))
    console.log(fraction(-5, 4))
    console.log(fraction(-2, -3))
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
