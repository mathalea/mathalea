import problemesTrigoLongueur from '../3e/3G32-0.js'
export const titre = "Calculer la hauteur d'un objet vu sous un angle donné"
export { interactifReady, interactifType } from '../3e/3G32-0.js'
export { amcReady, amcType } from '../3e/3G32-0.js'

/**
 * @author Guillaume Valmont
 * reference 3G32-2
 */
export default function calculHauteurObjet () {
  problemesTrigoLongueur.call(this)
  this.titre = titre
  this.sup2 = 3
  this.besoinFormulaireCaseACocher = false
}
