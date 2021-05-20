import TablesDeMultiplications from '../6e/_Tables_de_multiplications.js'

export const titre = 'Tables de multiplication'
export const interactifReady = true
export const amcReady = true
export const amcType = 4 // Question numérique

/**
 * Tables de multiplications classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @author Rémi Angot
 * Référence 6C10-1
 */
export default function TablesParametres (tables_par_defaut = '2-3-4-5-6-7-8-9') {
  TablesDeMultiplications.call(this, tables_par_defaut)
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.tailleDiaporama = 100
}
