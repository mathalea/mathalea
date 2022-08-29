import CalculDeLongueur from '../3e/3G30.js'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3G30.js'
export const titre = 'Utiliser le cosinus pour calculer une longueur dans un triangle rectangle'

/**
 * @author Jean-Claude Lhote
 * 4G40 Exercice refait avec mathalea2d l'ancien exo MG32 porte la référence 4G40-MG32
 */
export const uuid = '3303a'
export const ref = '4G40'
export default function CalculDeLongueur4e () {
  CalculDeLongueur.call(this)
  this.titre = titre
  this.level = 4
  this.sup = 1
}
