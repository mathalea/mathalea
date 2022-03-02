import problemesTrigoLongueur from '../3e/3G32-0.js'
export const titre = 'Calculer la hauteur d\'une montagne'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3G32-0.js'

/**
 * @author Guillaume Valmont
 * reference 3G32-4
 */
export default function calculHauteurMontagne () {
  problemesTrigoLongueur.call(this)
  this.titre = titre
  this.sup2 = 5
  this.besoinFormulaire2Numerique = false
}
