import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire le symétrique dn point par rapport à une droite'
export const dateDeModificationImportante = '14/11/2021'
/**
 * Référence 6G10-1
 * @author Jean-Claude Lhote
 */
export default class SymetrieAxialePoint5e extends ConstruireParSymetrie {
  constructor () {
    super()
    this.figure = false
    this.sup = 4
    this.besoinFormulaireNumerique = ['Type de questions', 4, '1 : Axe horizontal ou vertical\n2 : Axe oblique à 45°\n3 : Axe avec une légère pente\n4 : Mélange']
  }
}
