import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire le symétrique d’un point par rapport à une droite'
export const dateDeModificationImportante = '14/11/2021'
export { amcReady, amcType } from '../6e/_Construire_par_symetrie.js'
/**
 * Référence 6G24-1
 * @author Jean-Claude Lhote
 * Relecture : Novembre 2021 par EE
 */
export default class SymetrieAxialePoint6e extends ConstruireParSymetrie {
  constructor () {
    super()
    this.figure = false
    this.sup = 1
    this.besoinFormulaireNumerique = ['Type de questions', 4, '1 : Axe horizontal ou vertical\n2 : Axe oblique à 45°\n3 : Axe avec une légère pente\n4 : Toutes les symétries axiales']
  }
}
