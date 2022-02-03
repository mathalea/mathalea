import ParalleleEtPerpendiculaires from './6G12-1.js'
export const titre = 'Tracer des parallèles'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC

/**
 * @author Jean-Claude Lhote (AMC par Eric Elter en septembre 2021)
 * référence 6G12
 */
export default class TracerDesParalleles extends ParalleleEtPerpendiculaires {
  constructor () {
    super()
    this.titre = titre
    this.sup = 1
    this.type = 2
  }
}
