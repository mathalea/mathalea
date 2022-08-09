import { mathalea2d, fixeBordures, segment, point, texteParPosition, tracePoint } from '../../modules/2d.js'
import { contraindreValeur, listeQuestionsToContenu, randint, stringNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const titre = 'Générateur de Yohaku'

class Yohaku {
  constructor ({ largeur = 2, hauteur = 2, taille = 3, Case = null, cellules = [], operation = 'addition', valeurMax = 50, solution = false }) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.Case = Case
    this.cellules = cellules
    this.resultats = []
    this.taille = taille || 2
    this.operation = operation || 'addition'
    this.valeurMax = valeurMax || 50
    this.solution = solution
    // Si les cellules ne sont pas données, on en calcule le contenu aléatoirement.
    if (cellules === undefined || cellules.lenght === 0) {
      for (let i = 0; i < this.taille ** 2; i++) {
        cellules.push(randint(1, this.valeurMax))
      }
    } else { // si elles sont définies, on complète éventuellement la grille aléatoirement.
      for (let i = this.cellules.length; i < this.taille ** 2; i++) {
        cellules.push(randint(1, this.valeurMax))
      }
    }
    // On calcule les résultats
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
        initialValue = 0
        this.resultats[i] = valeurs.reduce((previous, current) => previous + current, initialValue)
        break
      case 'multiplication':
        initialValue = 1
        this.resultats[i] = valeurs.reduce((previous, current) => previous * current, initialValue)
        break
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
      resultats[i] = texteParPosition(this.resultats[i], (i + 0.5) * this.largeur, -(0.5 + this.taille) * this.hauteur)
    }
    for (let i = this.taille; i < 2 * this.taille; i++) {
      resultats[i] = texteParPosition(this.resultats[i], (this.taille + 0.5) * this.largeur, (this.taille - 0.5 - i) * this.hauteur)
    }
    if (this.Case !== null) {
      donnees.push(texteParPosition(stringNombre(this.cellules[this.Case]), (this.Case % this.taille + 0.5) * this.largeur, -(Math.floor(this.Case / this.taille) + 0.5) * this.hauteur))
    }
    console.log(this.Case)
    if (this.solution) {
      for (let i = 0; i < this.cellules.length; i++) {
        if (i !== this.Case) donnees.push(texteParPosition(stringNombre(this.cellules[i]), (i % this.taille + 0.5) * this.largeur, -(Math.floor(i / this.taille) + 0.5) * this.hauteur))
      }
    }

    return mathalea2d(Object.assign({}, fixeBordures([...lignes, ...colonnes, ...resultats, ...donnees, operateur])), operateur, ...lignes, ...colonnes, ...resultats, ...donnees)
  }
}

export default function fabriqueAYohaku () {
  Exercice.call(this)
  this.nbQuestions = 3
  this.sup = 30
  this.sup2 = 1
  this.sup3 = 3
  this.sup4 = false
  this.besoinFormulaireNumerique = ['Valeur maximale des données', 999]
  this.besoinFormulaire2Numerique = ['Opération', 2, '1 : Addition\n2 : Multiplication']
  this.besoinFormulaire3Numerique = ['Taille de la grille (nombre de cases horizontales)', 5]
  this.besoinFormulaire4CaseACocher = ['Avec aide', false]
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    for (let i = 0; i < this.nbQuestions; i++) {
      const donnees = []
      const taille = contraindreValeur(2, 5, this.sup3, 3)
      const max = contraindreValeur(taille ** 2 + 1, 999, this.sup, 30)
      const operateur = this.sup2 === 1 ? 'addition' : 'multiplication'
      const Case = this.sup4 ? randint(0, taille ** 2 - 1) : null
      for (let j = 0; j < taille; j++) {
        for (let k = 0; k < taille; k++) {
          donnees.push(randint(2, max, donnees))
        }
      }

      const yohaku = new Yohaku({ taille, operation: operateur, cellules: donnees, Case })
      this.listeQuestions.push(yohaku.representation())
      yohaku.solution = true
      this.listeCorrections.push(yohaku.representation())
    }
    listeQuestionsToContenu(this)
  }
}
