import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, miseEnEvidence } from '../../modules/outils.js'
import { ajoutChampTexte, exerciceInteractif } from '../../modules/gestionQcm.js'

export const titre = 'Additions et de soustractions'

/**
 * Additions et/ou soustractions classique et/ou à trou.
 *
 * Par défaut c'est un mélange d'additions, soustractions avec et sans trou avec des nombres jusqu'à 20.
 * @Auteur Rémi Angot
 * Référence CM000
 */
export default function TablesAdditionsSoustractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 20
  this.sup2 = 6 // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = titre
  this.consigne = 'Calculer'
  this.spacing = 2
  this.tailleDiaporama = 100
  this.modeQcm = true
  this.qcmDisponible = true

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions = []
    if (this.sup2 === 1) {
      listeTypeDeQuestions = combinaisonListes(
        ['addition'],
        this.nbQuestions
      )
    }
    if (this.sup2 === 2) {
      listeTypeDeQuestions = combinaisonListes(
        ['addition_a_trou'],
        this.nbQuestions
      )
    }
    if (this.sup2 === 3) {
      listeTypeDeQuestions = combinaisonListes(
        ['soustraction'],
        this.nbQuestions
      )
    }
    if (this.sup2 === 4) {
      listeTypeDeQuestions = combinaisonListes(
        ['soustraction_a_trou'],
        this.nbQuestions
      )
    }
    if (this.sup2 === 5) {
      listeTypeDeQuestions = combinaisonListes(
        ['addition', 'soustraction'],
        this.nbQuestions
      )
    }
    if (this.sup2 === 6) {
      listeTypeDeQuestions = combinaisonListes(
        ['addition', 'addition_a_trou', 'soustraction', 'soustraction_a_trou'],
        this.nbQuestions
      )
    }
    for (let i = 0, a, b, texte, texteCorr; i < this.nbQuestions; i++) {
      a = randint(2, this.sup)
      b = randint(2, this.sup)
      this.autoCorrection[i] = {}
      this.autoCorrection[i].reponse = {}

      switch (listeTypeDeQuestions[i]) {
        case 'addition':
          texte = `$${a} + ${b} = \\dotfill$`
          if (this.modeQcm) {
            texte = ajoutChampTexte({
              texte: `$${a} + ${b} = $`,
              numeroExercice: this.numeroExercice,
              i
            })
          }
          texteCorr = `$${a} + ${b} = ${a + b}$`
          this.autoCorrection[i].reponse.value = a + b
          break
        case 'addition_a_trou':
          texte = `$${a} + \\ldots\\ldots = ${a + b}$`
          if (this.modeQcm) {
            texte = ajoutChampTexte({
              texte: `$${a}~+ $`,
              texteApres: `$= ${a + b}$`,
              numeroExercice: this.numeroExercice,
              i
            })
          }
          texteCorr = `$${a} + ${miseEnEvidence(b)} = ${a + b}$`
          this.autoCorrection[i].reponse.value = b
          break
        case 'soustraction':
          if (a === b) {
            a = randint(2, this.sup, b)
          }
          if (a < b) {
            b = [a, (a = b)][0] // échange les variables a et b
          }
          texte = `$${a} - ${b} = \\dotfill$`
          if (this.modeQcm) {
            texte = ajoutChampTexte({
              texte: `$${a} - ${b} = $`,
              numeroExercice: this.numeroExercice,
              i
            })
          }
          texteCorr = `$${a} - ${b} = ${a - b}$`
          this.autoCorrection[i].reponse.value = a - b
          break
        case 'soustraction_a_trou':
          if (a === b) {
            a = randint(2, this.sup, b)
          }
          if (a < b) {
            b = [a, (a = b)][0] // échange les variables a et b
          }
          texte = `$${a} - \\ldots\\ldots = ${a - b}$`
          if (this.modeQcm) {
            texte = ajoutChampTexte({
              texte: `$${a}~- $`,
              texteApres: `$= ${a - b}$`,
              numeroExercice: this.numeroExercice,
              i
            })
          }
          texteCorr = `$${a} - ${miseEnEvidence(b)} = ${a - b}$`
          this.autoCorrection[i].reponse.value = b
          break
      }

      if (context.isDiaporama) {
        texte = texte.replace('= \\dotfill', '')
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 9999] // Texte, tooltip
  this.besoinFormulaire2Numerique = [
    'Style de questions',
    6,
    '1 : Additions\n2: Additions à trous\n3: Soustractions\n4 : Soustractions à trous\n5 : Additions et soustractions \n6 : Additions et soustractions avec ou sans trous'
  ]
  exerciceInteractif(this)
}
