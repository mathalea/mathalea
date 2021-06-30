import ParalleleEtPerpendiculaires from './6G12-1.js'
export const titre = 'Tracer des parallèles'

/**
 * @author Jean-Claude Lhote
 * référence 6G12
 */
export default function TracerDesParalleles () {
  ParalleleEtPerpendiculaires.call(this)
  this.titre = titre
  this.sup = 1
  this.type = 2
}
