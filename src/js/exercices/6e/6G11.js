import ParalleleEtPerpendiculaires from './6G12-1.js'
export const titre = 'Tracer des perpendiculaires'

/**
 * @author Jean-Claude Lhote
 * référence 6G11
 */
export default function TracerDesPerpendiculaires () {
  ParalleleEtPerpendiculaires.call(this)
  this.titre = titre
  this.sup = 1
  this.type = 1
}
