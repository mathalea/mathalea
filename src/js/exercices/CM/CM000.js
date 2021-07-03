import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, miseEnEvidence, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
// on importait amcReady de 5L10 cf commit cf25dab mais mieux vaut le déclarer explicitement

export const titre = 'Additions et de soustractions'
export const interactifReady = true
export const interactifType = 'numerique'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Additions et/ou soustractions classique et/ou à trou.
 *
 * Par défaut c'est un mélange d'additions, soustractions avec et sans trou avec des nombres jusqu'à 20.
 * @author Rémi Angot
 * Référence CM000
 */
export default function TablesAdditionsSoustractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 20
  this.sup2 = 6 // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.consigne = 'Calculer'
  this.spacing = 2
  this.tailleDiaporama = 100
  this.interactif = true

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

      switch (listeTypeDeQuestions[i]) {
        case 'addition':
          texte = `$${a} + ${b} = \\dotfill$`
          if (this.interactif && context.isHtml) {
            texte = ajouteChampTexte(this, i, {
              texte: `$${a} + ${b} = $`
            })
          }
          texteCorr = `$${a} + ${b} = ${a + b}$`
          setReponse(this, i, a + b)
          break
        case 'addition_a_trou':
          texte = `$${a} + \\ldots\\ldots = ${a + b}$`
          if (this.interactif && context.isHtml) {
            texte = ajouteChampTexte(this, i, {
              texte: `$${a}~+ $`,
              texteApres: `$= ${a + b}$`
            })
          }
          texteCorr = `$${a} + ${miseEnEvidence(b)} = ${a + b}$`
          setReponse(this, i, b)
          break
        case 'soustraction':
          if (a === b) {
            a = randint(2, this.sup, b)
          }
          if (a < b) {
            b = [a, (a = b)][0] // échange les variables a et b
          }
          texte = `$${a} - ${b} = \\dotfill$`
          if (this.interactif && context.isHtml) {
            texte = ajouteChampTexte(this, i, {
              texte: `$${a} - ${b} = $`
            })
          }
          texteCorr = `$${a} - ${b} = ${a - b}$`
          setReponse(this, i, a - b)
          break
        case 'soustraction_a_trou':
          if (a === b) {
            a = randint(2, this.sup, b)
          }
          if (a < b) {
            b = [a, (a = b)][0] // échange les variables a et b
          }
          texte = `$${a} - \\ldots\\ldots = ${a - b}$`
          if (this.interactif && context.isHtml) {
            texte = ajouteChampTexte(this, i, {
              texte: `$${a}~- $`,
              texteApres: `$= ${a - b}$`
            })
          }
          texteCorr = `$${a} - ${miseEnEvidence(b)} = ${a - b}$`
          setReponse(this, i, b)
          break
      }

      if (context.isDiaporama) {
        texte = texte.replace('= \\dotfill', '')
      }
      this.autoCorrection[i].reponse.param = { digits: nombreDeChiffresDansLaPartieEntiere(this.autoCorrection[i].reponse.valeur), decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
      this.autoCorrection[i].enonce = texte
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
}
