import problemesTrigoLongueur from '../3e/3G32-0.js'
export const titre = 'Calculer la largeur d\'une rivière'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3G32-0.js'

/**
 * @author Guillaume Valmont
 * reference 3G32
 */
export default function calculHauteurMontagne () {
  problemesTrigoLongueur.call(this)
  this.titre = titre
  this.sup2 = 1
  this.besoinFormulaire2Numerique = false
}
