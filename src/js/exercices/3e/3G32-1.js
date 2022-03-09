import problemesTrigoLongueur from '../3e/3G32-0.js'
export const titre = 'Calcul d\'un parallèle terrestre'

export { interactifReady, interactifType, amcReady, amcType } from '../3e/3G32-0.js'

/**
 * @author Guillaume Valmont
 * reference 3G32-1
 */
export default function calculParalleleTerrestre () {
  problemesTrigoLongueur.call(this)
  this.titre = titre
  this.sup2 = 2
  this.besoinFormulaireCaseACocher = false
}
