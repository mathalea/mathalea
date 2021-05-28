import Divisions_euclidiennes from './6C11.js'
export const amcReady = true
export const amcType = 3 // type de question AMC

export const titre = 'Divisions euclidiennes - Niveau 2'

/**
 * @author Rémi Angot
 * référence 6C21
*/

export default function DivisionsEuclidiennesNiv2 () {
  Divisions_euclidiennes.call(this)
  this.sup = 2
  this.titre = titre
  this.tailleDiaporama = 100
}
