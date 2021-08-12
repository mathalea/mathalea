import Thales2D from './_Thales2D.js'
export const amcReady = true
export const amcType = 'AMCOpenNum' // type de question AMC

export const titre = 'Calculer des longueurs avec la propriété de Thalès'

/**
 * Calcul de longueurs avec le théorème de Thalès
 * @author Rémi Angot
 * Référence 4G30
*/

export default function Thales2D4e () {
  Thales2D.call(this)
  this.besoinFormulaireNumerique = false
  this.titre = titre
  this.amcType = amcType
  this.amcReady = amcReady
}
