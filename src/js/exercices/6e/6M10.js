import ExercicePerimetresEtAires from './_Exercice_perimetres_et_aires.js'
export const titre = 'Calculer des périmètres et des aires de figures usuelles'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_perimetres_et_aires.js'

/**
 * @author Rémi Angot
 * Référence 6M10
 */
export default function Reglages6M10 () {
  ExercicePerimetresEtAires.call(this)
  this.titre = titre
  this.sup = 1
  this.interactif = true
}
