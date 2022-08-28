import ParalleleEtPerpendiculaires from './6G12-1.js'
export const titre = 'Tracer des perpendiculaires'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC

/**
 * @author Jean-Claude Lhote  (AMC par Eric Elter en septembre 2021)
 * @ Loïc Geeraerts (Refactoring (ES6))
 * référence 6G11
 */
export const uuid = '7ff97'
export const ref = '6G11'
export default class TracerDesPerpendiculaires extends ParalleleEtPerpendiculaires {
  constructor () {
    super()
    this.titre = titre
    this.sup = 1
    this.type = 1
  }
}
