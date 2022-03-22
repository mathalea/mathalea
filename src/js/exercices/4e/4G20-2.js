import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Déterminer la racine carrée d’un carré parfait (calcul mental)'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * Déterminer la racine carrée d'un carré parfait compris entre 1 et 256
 * @author Stéphane Guyon et Guillaume Valmont
 * Référence 4G20-2
 * Mis à jour le 08/08/2021
 */
export default function RacineCareeDeCarresParfaits () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.besoinFormulaireNumerique = ['Formulation de la question', 3, '1 : Calculer la racine de ...\n2 : Trouver le nombre positif dont le carré est ...\n3 : Mélange']
  this.besoinFormulaire2Numerique = ['Entier maximum', 2, '1 : 144\n2 : 256']
  this.sup = 1
  this.sup2 = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeRacines = []
    let listeQuestions = []
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    if (this.sup === 1) {
      listeQuestions = [1]
    } else if (this.sup === 2) {
      listeQuestions = [2]
    } else if (this.sup === 3) {
      listeQuestions = [1, 2]
    }
    listeQuestions = combinaisonListes(listeQuestions, this.nbQuestions) // pour varier les questions
    if (this.sup2 === 1) {
      listeRacines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    } else {
      listeRacines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    }
    listeRacines = combinaisonListes(listeRacines, this.nbQuestions) // pour avoir une meilleure randomisation que randint
    for (let i = 0, texte, texteCorr, a, c, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = listeRacines[i]
      c = a * a
      if (listeQuestions[i] === 1) {
        texte = `Calculer de tête $\\sqrt{${c}}=$` + ajouteChampTexte(this, i)
      } else if (listeQuestions[i] === 2) {
        texte = `Quel est le nombre positif dont le carré est $${c}$ ?` + ajouteChampTexte(this, i)
      }
      texteCorr = `$\\sqrt{${c}}=${a}$`
      setReponse(this, i, a)

      if (this.listeQuestions.indexOf(texte) === -1) {
        if (context.isAmc) {
          if (listeQuestions[i] === 1) {
            this.autoCorrection[i].enonce = `$\\sqrt{${c}}=\\dots$`
            this.autoCorrection[i].propositions = [{ texte: `$\\sqrt{${c}}=${a}$`, statut: '' }]
          } else {
            this.autoCorrection[i].enonce = `$${c} = \\dots^2$`
            this.autoCorrection[i].propositions = [{ texte: `$${c}=${a}^2$`, statut: '' }]
          }
          this.autoCorrection[i].reponse.param = { digits: 2, decimals: 0, exposantNbChiffres: 0, exposantSigne: false, signe: false }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
