import CalculDeVolumes from '../6e/6M30.js'

export const titre = 'Calculs de volumes'
export { interactifReady, interactifType } from '../6e/6M30.js'
export { amcReady, amcType } from '../6e/6M30.js'

/**
 * @author Jean-claude Lhote
 */
export default function CalculDeVolumes4e () {
  CalculDeVolumes.call(this)
  this.titre = titre
  this.sup = 1
  this.classe = 4
  this.besoinFormulaire4Texte = ['Type de solides', 'Nombres séparés par des tirets\n1  : Cubes\n2 : Pavés droits\n3 : Cylindres\n4 : Prismes droits\n5 : Cônes\n6 : Pyramides\n7 : Mélange']
}
