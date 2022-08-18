import TablesDeMultiplications from './_Tables_de_multiplications.js'

export const titre = 'Réviser les tables de multiplication'
export { interactifReady, interactifType, amcReady, amcType } from './_Tables_de_multiplications.js'

/**
 * Tables de multiplication classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @author Rémi Angot (ES6 : Loïc Geeraerts)
 * Référence 6C10-1
 */
export default function TablesParametres () {
  TablesDeMultiplications.call(this, '2-3-4-5-6-7-8-9')
  this.titre = titre
  this.sup2 = 2
  this.tailleDiaporama = 3
}
