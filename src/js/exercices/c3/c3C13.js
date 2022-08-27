import QuestionsPrix from '../6e/6C12.js'
export const titre = 'Résoudre des problèmes de prix'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

// Gestion de la date de publication initiale
export const dateDePublication = '02/11/2021'

/**
 * @author Eric Elter
 * Référence c3C13
 * Date octobre 2021
 */
export const uuid = 'b0311'
export const ref = 'c3C13'
export default function QuestionsPrixCM () {
  QuestionsPrix.call(this)
  this.titre = titre
  this.sup = '1-2-3-4-5-6' // Par défaut, pas de divisions
  this.sup3 = false // Par défaut, que des entiers
}
