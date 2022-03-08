import problemesTrigoLongueur from '../3e/3G32-0.js'
export const titre = "Calculer la hauteur d'une falaise"
export { interactifReady, interactifType } from '../3e/3G32-0.js'
// export { amcReady, amcType } from '../3e/3G32-0.js'

/**
 * @author Guillaume Valmont
 * reference 3G32-3
 */
export default function calculHauteurFalaise () {
  problemesTrigoLongueur.call(this)
  this.titre = titre
  this.sup2 = 4
  this.besoinFormulaire2Numerique = false
}
