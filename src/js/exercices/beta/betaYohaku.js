import { mathalea2d, fixeBordures, segment, point, texteParPosition, tracePoint, latexParCoordonnees } from '../../modules/2d.js'
import { choice, contraindreValeur, listeQuestionsToContenu, randint, stringNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { calculer } from '../../modules/outilsMathjs.js'
import { create, all } from 'mathjs'
export const titre = 'Générateur de Yohaku'
const math = create(all)
class Yohaku {
  constructor ({ type = 'entiers', largeur = 2, hauteur = 2, taille = 3, Case = null, cellules = [], resultats = [], operation = 'addition', valeurMax = 50, solution = false }) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.Case = Case
    this.cellules = cellules
    this.resultats = resultats
    this.taille = taille || 2
    this.operation = operation || 'addition'
    this.valeurMax = valeurMax || 50
    this.solution = solution
    this.type = type
    console.log(this.type, this.valeurMax)

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
  }

  // méthode qui calcule les résultats si on le veut (sinon on peut les renseigner dans this.resultats manuellement)
  calculeResultats () {
    let valeurs
    for (let i = 0; i < this.taille; i++) {
      valeurs = []
      for (let j = 0; j < this.taille; j++) {
        valeurs.push(this.cellules[i + j * this.taille])
      }
      this.operate(valeurs, i)
    }
    for (let i = this.taille; i < this.taille * 2; i++) {
      valeurs = []
      for (let j = 0; j < this.taille; j++) {
        valeurs.push(this.cellules[(i - this.taille) * this.taille + j])
      }
      this.operate(valeurs, i)
    }
  }

  operate (valeurs, i) {
    let initialValue
    switch (this.operation) {
      case 'addition':
        if (this.type !== 'littéraux') {
          if (this.type.substring(0, 4) === 'frac') {
            initialValue = math.fraction('0')
            this.resultats[i] = valeurs.reduce((previous, current) => math.fraction(math.add(previous, current)), initialValue)
          } else {
            initialValue = math.number(0)
            this.resultats[i] = valeurs.reduce((previous, current) => math.add(previous, current), initialValue)
          }
        } else {
          initialValue = math.parse('0')
          this.resultats[i] = valeurs.reduce((previous, current) => calculer(`${previous.toString()}+${current.toString()}`).printResult, initialValue)
        }
        break
      case 'multiplication':
        if (this.type !== 'littéraux') {
          if (this.type.substring(0, 4) === 'frac') {
            initialValue = math.fraction('1')
            this.resultats[i] = valeurs.reduce((previous, current) => math.fraction(math.multiply(previous, current)), initialValue)
          } else {
            initialValue = math.number(1)
            this.resultats[i] = valeurs.reduce((previous, current) => math.multiply(previous, current), initialValue)
          }
        } else {
          initialValue = math.parse('1')
          this.resultats[i] = valeurs.reduce((previous, current) => calculer(`(${previous.toString()})*(${current.toString()})`).printResult, initialValue)
        }
        break
    }
    console.log(this.resultats)
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
          resultats[i] = latexParCoordonnees(this.resultats[i].toLatex().replace('frac', 'dfrac'), (i + 0.5) * this.largeur, -(0.5 + this.taille) * this.hauteur)
        } else {
          resultats[i] = latexParCoordonnees(this.resultats[i], (i + 0.5) * this.largeur, -(0.5 + this.taille) * this.hauteur)
        }
      }
    }
    for (let i = this.taille; i < 2 * this.taille; i++) {
      if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
        resultats[i] = texteParPosition(this.resultats[i], (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur)
      } else {
        if (this.type !== 'littéraux') {
          resultats[i] = latexParCoordonnees(this.resultats[i].toLatex().replace('frac', 'dfrac'), (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur)
        } else {
          resultats[i] = latexParCoordonnees(this.resultats[i], (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur)
        }
      }
    }
    if (this.Case !== null) {
      if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
        donnees.push(texteParPosition(stringNombre(this.cellules[this.Case]), (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur))
      } else {
        if (this.type !== 'littéraux') {
          donnees.push(latexParCoordonnees(this.cellules[this.Case].toLatex().replace('frac', 'dfrac'), (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur))
        } else {
          donnees.push(latexParCoordonnees(this.cellules[this.Case], (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur))
        }
      }
    }
    if (this.solution) {
      for (let i = 0; i < this.cellules.length; i++) {
        if (this.type !== 'littéraux' && this.type.substring(0, 4) !== 'frac') {
          if (i !== this.Case) donnees.push(texteParPosition(stringNombre(this.cellules[i]), (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur))
        } else {
          if (this.type !== 'littéraux') {
            if (i !== this.Case) donnees.push(latexParCoordonnees(this.cellules[i].toLatex().replace('frac', 'dfrac'), (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur))
          } else {
            if (i !== this.Case) donnees.push(latexParCoordonnees(this.cellules[i], (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur))
          }
        }
      }
    }
    return mathalea2d(Object.assign({}, fixeBordures([...lignes, ...colonnes, ...resultats, ...donnees, operateur])), operateur, ...lignes, ...colonnes, ...resultats, ...donnees)
  }
}

export default function FabriqueAYohaku () {
  Exercice.call(this)
  this.nbQuestions = 3
  this.sup = 30
  this.sup2 = 1
  this.sup3 = 3
  this.sup4 = false
  this.type = 'entiers'
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
      const largeur = this.type === 'littéraux' ? 4 : 2
      const yohaku = new Yohaku({ type, taille, largeur, operation: operateur, cellules: donnees, Case, valeurMax })
      yohaku.calculeResultats()
      texte = operateur === 'addition'
        ? 'Les nombres en bout de ligne ou de colonne sont les sommes des nombres contenus dans la ligne ou la colonne.'
        : 'Les nombres en bout de ligne ou de colonne sont les produits des nombres contenus dans la ligne ou la colonne.'
      texte += '<br>Compléter la grille avec des nombres qui conviennent (plusieurs solutions possibles).'
      texte += yohaku.representation()
      texteCorr = 'La grille ci-dessous n\'est donnnée qu\'à titre d\'exemple, il y a d\'autres solutions'
      yohaku.solution = true
      texteCorr += yohaku.representation()
      if (this.questionJamaisPosee(i, ...donnees)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
