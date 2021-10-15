import QuestionsPrix from './beta6C12.js'
export const titre = 'Résoudre des problèmes de prix'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * @author Eric Elter
 * référence à déterminer
 * Date octobre 2021
 */
export default function QuestionsPrixCM () {
  QuestionsPrix.call(this)
  this.titre = titre
  this.sup = '1-2-3-4-5-6' // Par défaut, pas de divisions
  this.sup3 = false // Par défaut, que des entiers
}
