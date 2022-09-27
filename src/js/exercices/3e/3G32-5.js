import problemesTrigoLongueur from '../3e/3G32-0.js'
export const titre = 'Triangle rectangle inscrit dans un triangle rectangle'
export { interactifReady, interactifType } from '../3e/3G32-0.js'
export { amcReady, amcType } from '../3e/3G32-0.js'

/**
 * @author Guillaume Valmont
 * reference 3G32-5
 */
export const uuid = '8ba77'
export const ref = '3G32-5'
export default function CalculHauteurMontagne () {
  problemesTrigoLongueur.call(this)
  this.titre = titre
  this.sup2 = 6
  this.besoinFormulaireCaseACocher = false
}
