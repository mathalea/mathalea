import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export { interactifReady, interactifType } from '../6e/6M30.js'
export { amcReady, amcType } from '../6e/6M30.js'

/**
 * @author Jean-claude Lhote
 */
export const uuid = 'e26ca'
export const ref = '5M20'
export default function CalculDeVolumes5e () {
  CalculDeVolumes.call(this)
  this.sup = 1
  this.titre = titre
  this.classe = 5
  this.besoinFormulaire4Texte = ['Type de solides', 'Nombres séparés par des tirets\n1  : Cubes\n2 : Pavés droits\n3 : Cylindres\n4 : Prismes droits\n5 : Mélange']
}
