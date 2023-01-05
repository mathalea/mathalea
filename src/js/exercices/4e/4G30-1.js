import RelationDeThales from './_RelationDeThales.js'
export { titre } from './_RelationDeThales.js'

/**
 * Relation de Thalès
 * @author Sébastien LOZANO
 * Référence 4G30-1
*/

export default function RelationDeThales4e () {
  RelationDeThales.call(this)
  this.level = 4
  this.besoinFormulaireNumerique = false
}
