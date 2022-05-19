import ConstruireParSymetrie from '../6e/_Construire_par_symetrie.js'
export const titre = 'Construire l’image d’une figure par symétrie centrale'
export const dateDeModificationImportante = '14/11/2021'
/**
 * @author Jean-Claude Lhote
 * Fonction générale pour les exercices de construction de symétriques (centrale/axiale et points/triangles)
 * références  6G24-1, 6G24-2, 5G10-1, 5G10-2, 5G11-1 et 5G11-2
 * Permet une sortie html/pdf sur petits carreaux/gros carreaux/papier blanc
 */
export default class ConstruireParSymetrieCentraleFigure extends ConstruireParSymetrie {
  constructor () {
    super()
    this.version = 5
    this.figure = true
    this.besoinFormulaireNumerique = false
    this.besoinFormulaire3Numerique = false
  }
}
