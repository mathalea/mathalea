import { segment, point, texteParPosition, tracePoint, latexParCoordonnees } from '../../modules/2d.js'
import { choice, contraindreValeur, lettreMinusculeDepuisChiffre, listeQuestionsToContenu, randint, sp, stringNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { calculer } from '../../modules/outilsMathjs.js'
import { create, all } from 'mathjs'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import * as pkg from '@cortex-js/compute-engine'
import { fractionLatexToMathjs } from '../../modules/fonctionsMaths.js'
import { context } from '../../modules/context.js'
const { ComputeEngine } = pkg
let engine
if (context.versionMathalea) engine = new ComputeEngine()
export const titre = 'Générateur de Yohaku'
export const interactifReady = true
export const interactifType = 'custom'
const math = create(all)
export class Yohaku {
  constructor ({ type = 'entiers', largeur = 2, hauteur = 2, taille = 3, Case = null, cellules = [], resultats = [], operation = 'addition', valeurMax = 50, solution = false, cellulesPreremplies = [] }) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.Case = Case
    this.resultats = resultats
    this.taille = taille || 2
    this.operation = operation || 'addition'
    this.valeurMax = valeurMax || 50
    this.solution = solution
    this.type = type
    this.cellulesPreremplies = cellulesPreremplies
    // Si les cellules ne sont pas données, on en calcule le contenu aléatoirement.
    if (cellules === undefined || cellules.length === 0) {
      const den = randint(2, this.valeurMax)
      for (let i = 0; i < this.taille ** 2; i++) {
        switch (this.type) {
          case 'entiers' :
            cellules.push(randint(1, this.valeurMax))
            break
          case 'entiers relatifs' :
            cellules.push(randint(-this.valeurMax, this.valeurMax, 0))
            break
          case 'littéraux' :
            cellules.push(calculer(`${randint(1, this.valeurMax)}x + ${randint(1, this.valeurMax)}`).printResult)
            break
          case 'fractions dénominateurs multiples':
            cellules.push(math.fraction(randint(1, this.valeurMax), den))
            break
          case 'fractions positives dénominateurs premiers':
            cellules.push(math.fraction(randint(1, this.valeurMax), choice([2, 3, 5, 7])))
            break

          case 'fractions positives' :
            cellules.push(math.fraction(randint(1, this.valeurMax), randint(2, this.valeurMax)))
            break
          case 'fractions relatives' :
            cellules.push(math.fraction(randint(-this.valeurMax, this.valeurMax, 0), randint(2, this.valeurMax)))
            break
        }
      }
    } else { // si elles sont définies, on complète éventuellement la grille aléatoirement.
      for (let i = this.cellules.length; i < this.taille ** 2; i++) {
        switch (this.type) {
          case 'entiers' :
            cellules.push(randint(1, this.valeurMax))
            break
          case 'entiers relatifs' :
            cellules.push(randint(-this.valeurMax, this.valeurMax, 0))
            break
          case 'littéraux' :
            cellules.push(calculer(`${randint(1, this.valeurMax)}x + ${randint(1, this.valeurMax)}`).printResult)
            break
          case 'fractions dénominateurs multiples':
            cellules.push(math.fraction(randint(1, this.valeurMax), cellules[i - 1].d))
            break
          case 'fractions positives dénominateurs premiers':
            cellules.push(math.fraction(randint(1, this.valeurMax), choice([2, 3, 5, 7])))
            break
          case 'fractions positives' :
            cellules.push(math.fraction(randint(1, this.valeurMax), randint(2, this.valeurMax)))
            break
          case 'fractions relatives' :
            cellules.push(math.fraction(randint(-this.valeurMax, this.valeurMax, 0), randint(2, this.valeurMax)))
            break
        }
      }
    }
    this.cellules = cellules
  }

  // méthode qui calcule les résultats si on le veut (sinon on peut les renseigner dans this.resultats manuellement)
  calculeResultats () {
    let valeurs
    for (let i = 0; i < this.taille; i++) {
      valeurs = []
      for (let j = 0; j < this.taille; j++) {
        valeurs.push(this.cellules[i + j * this.taille])
      }
      this.resultats[i] = this.operate(valeurs)
    }
    for (let i = this.taille; i < this.taille * 2; i++) {
      valeurs = []
      for (let j = 0; j < this.taille; j++) {
        valeurs.push(this.cellules[(i - this.taille) * this.taille + j])
      }
      this.resultats[i] = this.operate(valeurs)
    }
  }

  // fonction utilisée par calculeResultats
  operate (valeurs) {
    let initialValue
    switch (this.operation) {
      case 'addition':
        if (this.type !== 'littéraux') {
          if (this.type.substring(0, 4) === 'frac') {
            initialValue = math.fraction('0')
            return valeurs.reduce((previous, current) => math.fraction(math.add(previous, current)), initialValue)
          } else {
            initialValue = math.number(0)
            return valeurs.reduce((previous, current) => math.add(previous, current), initialValue)
          }
        } else {
          initialValue = math.parse('0')
          return valeurs.reduce((previous, current) => calculer(`${previous.toString()}+${current.toString()}`).printResult, initialValue)
        }
      case 'multiplication':
        if (this.type !== 'littéraux') {
          if (this.type.substring(0, 4) === 'frac') {
            initialValue = math.fraction('1')
            return valeurs.reduce((previous, current) => math.fraction(math.multiply(previous, current)), initialValue)
          } else {
            initialValue = math.number(1)
            return valeurs.reduce((previous, current) => math.multiply(previous, current), initialValue)
          }
        } else {
          initialValue = math.parse('1')
          return valeurs.reduce((previous, current) => calculer(`(${previous.toString()})*(${current.toString()})`).printResult, initialValue)
        }
    }
  }

  representation () {
    const lignes = []
    const colonnes = []
    const resultats = []
    const donnees = []
    const operateur = tracePoint(point((this.taille + 0.5) * this.largeur, -(this.taille + 0.5) * this.hauteur))
    operateur.style = this.operation === 'addition' ? '+' : 'x'
    operateur.taille = 4
    for (let i = 0; i <= this.taille; i++) {
      lignes[i] = segment(0, -i * this.hauteur, (this.taille + 1) * this.largeur, -i * this.hauteur, 'black')
      colonnes[i] = segment(i * this.largeur, 0, i * this.largeur, -(this.taille + 1) * this.hauteur, 'black')
    }
    for (let i = 0; i < this.taille; i++) {
      if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
        resultats[i] = texteParPosition(this.resultats[i], (i + 0.5) * this.largeur, -(0.5 + this.taille) * this.hauteur)
      } else {
        if (this.type !== 'littéraux') {
          resultats[i] = latexParCoordonnees(this.resultats[i].toLatex().replace('frac', 'dfrac'), (i + 0.5) * this.largeur, -(0.5 + this.taille) * this.hauteur, 'black', 20)
        } else {
          resultats[i] = latexParCoordonnees(this.resultats[i], (i + 0.5) * this.largeur, -(0.5 + this.taille) * this.hauteur, 'black', operateur === 'addition' ? 50 : 80)
        }
      }
    }
    for (let i = this.taille; i < 2 * this.taille; i++) {
      if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
        resultats[i] = texteParPosition(this.resultats[i], (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur)
      } else {
        if (this.type !== 'littéraux') {
          resultats[i] = latexParCoordonnees(this.resultats[i].toLatex().replace('frac', 'dfrac'), (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur, 'black', 20)
        } else {
          resultats[i] = latexParCoordonnees(this.resultats[i], (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur, 'black', operateur === 'addition' ? 50 : 80)
        }
      }
    }
    if (this.Case !== null) {
      if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
        donnees.push(texteParPosition(stringNombre(this.cellules[this.Case]), (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur))
      } else {
        if (this.type !== 'littéraux') {
          donnees.push(latexParCoordonnees(this.cellules[this.Case].toLatex().replace('frac', 'dfrac'), (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur, 'black', 20))
        } else {
          donnees.push(latexParCoordonnees(this.cellules[this.Case], (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur, 'black', 50))
        }
      }
    }
    if (this.solution) {
      for (let i = 0; i < this.cellules.length; i++) {
        if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
          if (i !== this.Case) donnees.push(texteParPosition(stringNombre(this.cellules[i]), (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur))
        } else {
          if (this.type !== 'littéraux') {
            if (i !== this.Case) donnees.push(latexParCoordonnees(this.cellules[i].toLatex().replace('frac', 'dfrac'), (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur, 'black', 20))
          } else {
            if (i !== this.Case) donnees.push(latexParCoordonnees(this.cellules[i], (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur, 'black', 50))
          }
        }
      }
    } else if (this.cellulesPreremplies.length !== 0) {
      for (let i = 0; i < this.cellulesPreremplies.length; i++) {
        if (i !== this.Case) donnees.push(texteParPosition(this.cellulesPreremplies[i], (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur))
      }
    }
    return mathalea2d(Object.assign({}, fixeBordures([...lignes, ...colonnes, ...resultats, ...donnees, operateur])), operateur, ...lignes, ...colonnes, ...resultats, ...donnees)
  }
}

export const uuid = '3a377'
export const ref = 'Yohaku'
export default function FabriqueAYohaku () {
  Exercice.call(this)
  this.nbQuestions = 3
  this.sup = 30
  this.sup2 = 1
  this.sup3 = 3
  this.sup4 = false
  this.type = 'entiers'
  this.yohaku = []
  this.besoinFormulaireNumerique = ['Valeur maximale des données', 999]
  this.besoinFormulaire2Numerique = ['Opération', 2, '1 : Addition\n2 : Multiplication']
  this.besoinFormulaire3Numerique = ['Taille de la grille (nombre de cases horizontales)', 5]
  this.besoinFormulaire4CaseACocher = ['Avec aide', false]
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const type = this.type
    for (let i = 0, cpt = 0, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      const donnees = []
      const taille = contraindreValeur(2, 5, this.sup3, 3)
      const valeurMax = contraindreValeur(taille ** 2 + 1, 999, this.sup, 30)
      const operateur = parseInt(this.sup2) === 1 ? 'addition' : 'multiplication'
      const Case = this.sup4 ? randint(0, taille ** 2 - 1) : null
      /* for (let j = 0; j < taille; j++) {
        for (let k = 0; k < taille; k++) {
          donnees.push(randint(2, max, donnees))
        }
      }
*/
      const cellulesPreremplies = []
      if (this.interactif) {
        for (let k = 0; k < taille ** 2; k++) {
          cellulesPreremplies[k] = lettreMinusculeDepuisChiffre(k + 1)
        }
      }
      const largeur = this.type === 'littéraux' ? operateur === 'addition' ? 4 : 5 : 2
      const yohaku = new Yohaku({ type, taille, largeur, operation: operateur, cellules: donnees, Case, valeurMax, cellulesPreremplies })
      yohaku.calculeResultats()
      const mot = type === 'littéraux' ? 'expressions' : 'nombres'
      texte = operateur === 'addition'
        ? `Les ${mot} en bout de ligne ou de colonne sont les sommes des ${mot} contenus dans la ligne ou la colonne.`
        : `Les ${mot} en bout de ligne ou de colonne sont les produits des ${mot} contenus dans la ligne ou la colonne.`
      texte += `<br>Compléter la grille avec des ${mot} qui conviennent (plusieurs solutions possibles).<br>`
      texte += yohaku.representation()
      for (let k = 0; k < yohaku.cellulesPreremplies.length; k++) {
        texte += ajouteChampTexteMathLive(this, i * taille ** 2 + k, 'largeur10 inline nospacebefore', { texte: `${lettreMinusculeDepuisChiffre(k + 1)}=`, tailleExtensible: true })
        texte += sp(4)
      }
      texteCorr = 'La grille ci-dessous n\'est donnnée qu\'à titre d\'exemple, il y a d\'autres solutions.<br>'
      yohaku.solution = true
      texteCorr += yohaku.representation()
      this.yohaku[i] = yohaku
      if (this.questionJamaisPosee(i, ...donnees)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.correctionInteractive = i => {
    const taille = parseInt(this.sup3)
    const champsTexte = []
    const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${(i + 1) * taille * taille - 1}`)
    const saisies = []
    for (let k = 0; k < taille ** 2; k++) {
      champsTexte[k] = document.getElementById(`champTexteEx${this.numeroExercice}Q${i * taille ** 2 + k}`)
      saisies[k] = champsTexte[k].value.replace(',', '.').replace(/\((\+?-?\d+)\)/, '$1')
    }
    let resultat
    if (this.saisieCoherente(saisies, taille, i)) {
      divFeedback.innerHTML = '😎'
      resultat = 'OK'
    } else {
      divFeedback.innerHTML = '☹️'
      resultat = 'KO'
    }
    return resultat
  }
  this.saisieCoherente = function (saisies, taille, question) {
    let resultatOK = true
    let valeurs
    for (let i = 0; i < taille; i++) {
      valeurs = []
      for (let j = 0; j < taille; j++) {
        if (this.yohaku[question].type !== 'littéraux' && this.yohaku[question].type.substring(0, 4) !== 'frac') {
          valeurs.push(Number(saisies[i + j * taille]))
        } else {
          if (this.yohaku[question].type.substring(0, 4) === 'frac') {
            const test = saisies[i + j * taille].indexOf('frac') === -1 ? Number(saisies[i + j * taille]) : fractionLatexToMathjs(saisies[i + j * taille])
            valeurs.push(test)
          } else {
            valeurs.push(engine.parse(saisies[i + j * taille]).canonical.toString())
          }
        }
      }
      if (this.yohaku[question].type.substring(0, 4) === 'frac') {
        resultatOK = resultatOK && math.equal(this.yohaku[question].operate(valeurs), (this.yohaku[question].resultats[i]))
      } else {
        resultatOK = resultatOK && (this.yohaku[question].operate(valeurs) === this.yohaku[question].resultats[i])
      }
    }
    for (let i = taille; i < taille * 2; i++) {
      valeurs = []
      for (let j = 0; j < taille; j++) {
        if (this.yohaku[question].type !== 'littéraux' && this.yohaku[question].type.substring(0, 4) !== 'frac') {
          valeurs.push(Number(saisies[(i - taille) * taille + j]))
        } else {
          if (this.yohaku[question].type.substring(0, 4) === 'frac') {
            const test = saisies[(i - taille) * taille + j].indexOf('frac') === -1 ? Number(saisies[(i - taille) * taille + j]) : fractionLatexToMathjs(saisies[(i - taille) * taille + j])
            valeurs.push(test)
          } else {
            valeurs.push(engine.parse(saisies[(i - taille) * taille + j]).canonical.toString())
          }
        }
      }
      if (this.yohaku[question].type.substring(0, 4) === 'frac') {
        resultatOK = resultatOK && math.equal(this.yohaku[question].operate(valeurs), (this.yohaku[question].resultats[i]))
      } else {
        resultatOK = resultatOK && (this.yohaku[question].operate(valeurs) === (this.yohaku[question].resultats[i]))
      }
    }
    return resultatOK
  }
}
