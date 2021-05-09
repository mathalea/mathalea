import Calcul_de_longueur from '../3e/3G30.js'
export const amcReady = true
export const amcType = 5 // type de question AMC

export const titre = 'Utiliser le cosinus pour calculer une longueur dans un triangle rectangle'

/**
 * @auteur Jean-Claude Lhote
 * 4G40 Exercice refait avec mathalea2d l'ancien exo MG32 porte la référence 4G40-MG32
 */
export default function Calcul_de_longueur_4e() {
  Calcul_de_longueur.call(this);
  this.titre = titre;
  this.level = 4;
  this.sup=1
}
