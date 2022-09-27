import CalculDAngle from '../3e/3G31.js'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3G31.js'
export const titre = 'Utiliser le cosinus pour calculer la mesure d\'un angle dans un triangle rectangle'

/**
 * @author Jean-Claude Lhote
 * 3G31
 * Calcul d'angle dans le triangle rectangle
 * Le niveau 1 se limite à l'utilisation de Arccos
 * Le niveau 2 utilise la fonction trigo la plus pertinente pour un calcul direct
 */
export const uuid = '22810'
export const ref = '4G41'
export default function CalculDAngle4e () {
  CalculDAngle.call(this)
  this.level = 4
  this.sup = true
  this.titre = titre
}
