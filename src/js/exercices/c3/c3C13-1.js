import QuestionsMasses from '../6e/6C12-1.js'
export const titre = 'Résoudre des problèmes de masses'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

// Gestion de la date de publication initiale
export const dateDePublication = '02/11/2021'

/**
 * @author Eric Elter
 * Référence c3C13-1
 * Date octobre 2021
 */
export const uuid = 'ec3cc'
export const ref = 'c3C13-1'
export default function QuestionsMassesCM () {
  QuestionsMasses.call(this)
  this.titre = titre
  this.sup = '1-2-3-4-5-6' // Par défaut, pas de divisions
  this.sup3 = false // Par défaut, que des entiers
}
