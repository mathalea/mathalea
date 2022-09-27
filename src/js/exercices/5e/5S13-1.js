import calculEffectifFrequence from '../3e/3S12.js'
export const titre = 'Calculer des effectifs et des fréquences'

/**
 * Calculer des effectifs et des fréquences
 * @author Guillaume Valmont
 * reference 5S13-1
 * Publié le 08/08/2021
 */
export const uuid = '7d429'
export const ref = '5S13-1'
export default function CalculEffectifFrequence5e () {
  calculEffectifFrequence.call(this)
  this.titre = titre
  this.sup = 1
}
