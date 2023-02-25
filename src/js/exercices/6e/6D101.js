import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Hms from '../../modules/Hms.js'
export const titre = 'Utiliser les heures décimales'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
/**
 * Convertir une heure décimale dans le format HMS
 *
 * La partie décimale est 25, 75 ou un seul chiffre
 * @author Rémi Angot
 * Rendre l'exercice interactif Laurence Candille
 * Référence 6D101
 */
export const uuid = '6b3e4'
export const ref = '6D101'
export default function HeuresDecimales () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Compléter les égalités suivantes.'
  this.spacing = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, partieEntiere, partieDecimale, minutes, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      partieEntiere = randint(1, 12)
      partieDecimale = choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 75])
      texte = `$${partieEntiere},${partieDecimale}~\\text{h}=$`
      texte += ajouteChampTexteMathLive(this, i, 'inline clavierHms')
      texte += '<br>'

      if (partieDecimale === 25) {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{1}{4}~\\text{h}`
        texteCorr += `=${partieEntiere}~\\text{h}~15~\\text{min}$`
        minutes = 15
      } else if (partieDecimale === 75) {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{3}{4}~\\text{h}`
        texteCorr += `=${partieEntiere}~\\text{h}~45~\\text{min}$`
        minutes = 45
      } else if (partieDecimale === 5) {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{1}{2}~\\text{h}`
        texteCorr += `=${partieEntiere}~\\text{h}~30~\\text{min}$`
        minutes = 30
      } else {
        texteCorr = `$${partieEntiere},${partieDecimale}~\\text{h}=${partieEntiere}~\\text{h}+\\dfrac{${partieDecimale}}{10}~\\text{h}`
        texteCorr += `=${partieEntiere}~\\text{h}+${partieDecimale}\\times6~\\text{min}=${partieEntiere}~\\text{h}~${partieDecimale * 6}~\\text{min}$`
        minutes = partieDecimale * 6
      }
      if (!context.isAmc) {
        setReponse(this, i, new Hms({ hour: partieEntiere, minute: minutes }), { formatInteractif: 'hms' })
      } else {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [
            {
              type: 'AMCNum',
              propositions: [{
                texte: texteCorr,
                statut: '',
                reponse: {
                  texte: "Nombre d'heures",
                  valeur: partieEntiere,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Nombre de minutes',
                  valeur: minutes,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            }
          ]
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
