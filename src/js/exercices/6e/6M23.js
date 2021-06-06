import ExerciceConversionsAires from './_Exercice_conversions_aires.js'

export const titre = 'Conversions d’aires'
export const amcReady = true
export const amcType = 1 // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
/**
 * @author Rémi Angot
 * référence 6M23
 *
*/
export default function Reglages6M23 () {
  ExerciceConversionsAires.call(this)
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup = 3
  this.nbColsCorr = 1
}
