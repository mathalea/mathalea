/** @module couleurs */

import { isInteger } from 'mathjs'
import { choice } from './arrays'

/**
 * couleurAleatoire() renvoie le code d'une couleur au hasard
 *
 * @author Rémi Angot
 */
export function couleurAleatoire () {
  return choice(['white', 'black', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow'])
}

/**
   * couleurTab() renvoie :
   * soit le code d'une couleur au hasard, ainsi que sa traduction française au masculin et au féminin,
   * soit le code d'une couleur imposée, ainsi que sa traduction française au masculin et au féminin.
   * @example couleurTab() peut renvoyer ['black','noir','noire'].
   * @example couleurTab(0) renverra de façon certaine ['black','noir','noire'].
   * @author Eric Elter
   */
export function couleurTab (choixCouleur = 999) {
  const panelCouleurs = [
    ['black', 'noir', 'noire'],
    ['red', 'rouge', 'rouge'],
    ['green', 'vert', 'verte'],
    ['blue', 'bleu', 'bleue'],
    ['HotPink', 'rose', 'rose'],
    ['Sienna', 'marron', 'marron'],
    ['darkgray', 'gris', 'grise'],
    ['DarkOrange', 'orange', 'orange']
  ]
  return (choixCouleur === 999 || choixCouleur >= panelCouleurs.length || !isInteger(choixCouleur)) ? choice(panelCouleurs) : panelCouleurs[choixCouleur]
}

export function arcenciel (i, fondblanc = true) {
  let couleurs
  if (fondblanc) couleurs = ['violet', 'purple', 'blue', 'green', 'lime', '#f15929', 'red']
  else couleurs = ['violet', 'indigo', 'blue', 'green', 'yellow', '#f15929', 'red']
  return couleurs[i % 7]
}
export function texcolors (i, fondblanc = true) {
  const couleurs = ['black', 'blue', 'GreenYellow', 'brown', 'LightSlateBlue', 'cyan', 'darkgray', 'HotPink', 'LightSteelBlue', 'Chocolate', 'gray', 'green', 'lightgray', 'lime', 'magenta', 'olive', 'DarkOrange', 'pink', 'purple', 'red', 'teal', 'violet', 'white', 'yellow']
  if (fondblanc && i % couleurs.length >= couleurs.length - 2) i += 2
  return couleurs[i % couleurs.length]
}
