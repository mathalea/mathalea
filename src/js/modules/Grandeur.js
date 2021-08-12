import { calcul } from './outils.js'

/**
 * @class
 * @param {number} mesure
 * @param {string} unite (cm, cm^2, m^3, L, kg, dam^2)
 * @author Jean-Claude Lhote et Sébastien Lozano
*/
class Grandeur {
  constructor (mesure, unite) {
    this.mesure = mesure
    this.unite = unite
    const uniteParsee = parseUnite(unite)
    this.puissanceUnite = uniteParsee.puissanceUnite
    this.uniteDeReference = uniteParsee.uniteDeReference
    this.prefixe = uniteParsee.prefixe
    this.puissancePrefixe = uniteParsee.puissancePrefixe
  }

  /**
   *
   * @param {string} unite2 (cm, cm^2...)
   * @returns {Longueur}
   */
  convertirEn (unite2) {
    const unite2Parsee = parseUnite(unite2)
    if (unite2Parsee.puissanceUnite === this.puissanceUnite && unite2Parsee.uniteDeReference === this.uniteDeReference) {
      return new Grandeur(calcul(this.mesure * 10 ** ((this.puissancePrefixe - unite2Parsee.puissancePrefixe) * this.puissanceUnite)), unite2)
    } else {
      console.error('Conversion impossible')
    }
  }

  estEgal (unite2) {
    const u1 = this.convertirEn(this.uniteDeReference)
    const u2 = unite2.convertirEn(this.uniteDeReference)
    return u1.mesure === u2.mesure
  }
}

export default Grandeur

function parseUnite (unite) {
  let puissanceUnite, avantPuissanceUnite
  if (unite.indexOf('^') > 0) {
    puissanceUnite = unite.split('^')[1]
    avantPuissanceUnite = unite.split('^')[0]
  } else {
    puissanceUnite = 1
    avantPuissanceUnite = unite
  }
  const prefixe = avantPuissanceUnite.substring(0, avantPuissanceUnite.length - 1)
  const puissancePrefixe = prefixeToPuissance(prefixe)
  const uniteDeReference = unite.substring(prefixe.length)
  return { prefixe, uniteDeReference, puissanceUnite, puissancePrefixe }
}

function prefixeToPuissance (prefixe) {
  let puissancePrefixe
  switch (prefixe) {
    case 'm':
      puissancePrefixe = -3
      break
    case 'c':
      puissancePrefixe = -2
      break
    case 'd':
      puissancePrefixe = -1
      break
    case '':
      puissancePrefixe = 0
      break
    case 'da':
      puissancePrefixe = 1
      break
    case 'h':
      puissancePrefixe = 2
      break
    case 'k':
      puissancePrefixe = 3
      break
    case 'M':
      puissancePrefixe = 6
      break
    case 'G':
      puissancePrefixe = 9
      break
    case 'T':
      puissancePrefixe = 12
      break
    case '\\mu{}':
      puissancePrefixe = -6
      break
    case 'n':
      puissancePrefixe = -9
      break
    default:
      puissancePrefixe = false
  }
  return puissancePrefixe
}
