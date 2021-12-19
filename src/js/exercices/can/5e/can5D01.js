import { ajouteChampTexteMathLive, setReponse } from '../../../modules/gestionInteractif'
import { calcul, choice, listeQuestionsToContenuSansNumero, randint, sp, texNombrec } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Convertir en heures/minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can5D01
 */
export default function ConversionHeuresDecimalesMinutes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(1, 3)
    const b = choice([0.25, 0.5, 0.75])
    const d = calcul(b * 60)
    if (!this.interactif) {
      this.listeQuestions[0] = `Convertir en heures/minutes : <br>$${texNombrec(a + b)}$ h $=$ ..... h..... min`
      this.listeCorrections[0] = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60  = ${a}$ h $${d}$ min`
    } else {
      this.listeQuestions[0] = `Convertir en heures/minutes : <br>$${texNombrec(a + b)}$ h $=$` + ajouteChampTexteMathLive(this, 0, 'largeur10 inline', { texteApres: sp(5) + 'h' }) + ajouteChampTexteMathLive(this, 1, 'largeur10 inline', { texteApres: sp(5) + 'min' })
      this.listeCorrections[0] = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60  = ${a}$ h $${d}$ min`
      setReponse(this, 0, a)
      setReponse(this, 1, d)
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
