import { context } from '../../../modules/context.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import { calcul, listeQuestionsToContenu, randint, texNombre, texNombrec, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver un ordre de grandeur (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6C01
 */
export const uuid = 'de779'
export const ref = 'can6C01'
export default function OrdreDeGrandeur () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const a = randint(3, 7)
    const b = randint(2, 9)
    const c = randint(1, 9)
    const d = randint(5, 9)
    const resultat = calcul((a * 100 + b * 10 + c) * d)
    let texte = `$${texNombrec(a * 100 + b * 10 + c)}\\times ${d}$<br> 
    
    Choisir la bonne réponse sans effectuer précisément le calcul.<br>`
    // Ajout avant l'ajout des propositions de réponse
    // ça serait mieux en uniformisant avec this.question pour tous les exos can
    this.canEnonce = texte
    this.autoCorrection[0] = {
      enonce: texte,
      propositions: [
        {
          texte: `$${texNombre(resultat)}$`,
          statut: true
        },
        {
          texte: `$${texNombrec(d * 1000 + a * 100 + b * 10 + c)}$`,
          statut: false
        },
        {
          texte: `$${texNombrec((a * 1000 + b * 100 + c) * d)}$`,
          statut: false
        }
      ]
    }
    if (!context.isAmc) {
      texte += propositionsQcm(this, 0).texte
    }
    let texteCorr = `$${texNombrec(a * 100 + b * 10 + c)} \\times ${d} = ${texNombre(resultat)}$<br>
        `
    if (a * 100 + b * 10 + c > a * 100 + 50) {
      texteCorr += texteEnCouleur(`
    Mentalement : <br>
On remplace le premier facteur $${a * 100 + b * 10 + c}$ par $${(a + 1) * 100}$, on calcule
$${(a + 1) * 100}\\times ${d}=${((a + 1) * 100) * d}$ et on sélectionne le résultat qui s'en rapproche le plus. 
    `)
    } else {
      texteCorr += texteEnCouleur(`
    Mentalement : <br>
    On remplace le premier facteur $${a * 100 + b * 10 + c}$ par $${a * 100}$, on calcule
    $${a * 100}\\times ${d}=${a * 100 * d}$ et on sélectionne le résultat qui s'en rapproche le plus. 
           `)
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
    // Ajout en dernier
    this.canReponseACompleter = propositionsQcm(this, 0).texte
  }
}
