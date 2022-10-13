import { calcul } from './outils/texNombres'

/**
 * @class
 * @param {number} mesure
 * @param {string} unite (cm, cm^2, m^3, L, kg)
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
   * La conversion se fait entre dérivées de la même unité
   * @param {string} unite2 (cm, cm^2...)
   * @returns {Longueur}
   */
  convertirEnAncien (unite2) {
    const unite2Parsee = parseUnite(unite2)
    if (unite2Parsee.puissanceUnite === this.puissanceUnite && unite2Parsee.uniteDeReference === this.uniteDeReference) {
      return new Grandeur(calcul(this.mesure * 10 ** ((this.puissancePrefixe - unite2Parsee.puissancePrefixe) * this.puissanceUnite)), unite2)
    } else {
      // console.log('Conversion impossible')
    }
  }

  /**
   * La conversion se fait entre dérivées de la même unité
   * et entre dérivées de m³ et des dérivées de L
   * et entre dérivées de m² et des ares ou hectares
   * @param {string} uniteConversion (cm, cm^2...)
   * @returns {Longueur}
   * @author Modifiée par Eric Elter
   */
  convertirEn (uniteConversion) {
    const uniteConversionParsee = parseUnite(uniteConversion) // Unité de conversion (issue de la saisie)
    if (uniteConversionParsee.puissanceUnite === this.puissanceUnite && uniteConversionParsee.uniteDeReference === this.uniteDeReference) { // Mêmes unités
      return new Grandeur(calcul(this.mesure * 10 ** ((this.puissancePrefixe - uniteConversionParsee.puissancePrefixe) * this.puissanceUnite)), uniteConversion)
    } else if (uniteConversionParsee.uniteDeReference === 'm^3' & this.uniteDeReference === 'L') { // On met tout en litres.
      return new Grandeur(calcul(this.mesure * 10 ** ((this.puissancePrefixe - uniteConversionParsee.puissancePrefixe - 3) * this.puissanceUnite)), 'L')
    } else if (uniteConversionParsee.uniteDeReference === 'L' & this.uniteDeReference === 'm^3') { // On met tout en m³.
      return new Grandeur(calcul(this.mesure * 10 ** (this.puissancePrefixe * this.puissanceUnite + 3)), 'm^3')
    } else if (uniteConversionParsee.uniteDeReference === 'm^2' & this.uniteDeReference === 'a') { // On met tout en m².
      return new Grandeur(calcul(this.mesure * 10 ** (this.puissancePrefixe + 2)), 'm^2')
    } else if (uniteConversionParsee.uniteDeReference === 'a' & this.uniteDeReference === 'm^2') { // On met tout en a.
      return new Grandeur(calcul(this.mesure * 10 ** (this.puissancePrefixe * this.puissanceUnite - 2)), 'a')
    }
  }

  estEgal (unite2) {
    const u1 = this.convertirEn(this.uniteDeReference)
    const u2 = unite2.convertirEn(this.uniteDeReference)
    if (u1 && u2) {
      return u1.mesure === u2.mesure
    } else {
      return false
    }
  }

  estUneApproximation (unite2, precision) {
    const u1 = this.convertirEn(this.uniteDeReference)
    const u2 = unite2.convertirEn(this.uniteDeReference)
    if (u1 && u2) {
      if (Math.abs(u1.mesure - u2.mesure) <= precision + precision / 10) return true
    } else {
      return false
    }
  }
}

export default Grandeur

function parseUnite (unite) {
  let puissanceUnite, avantPuissanceUnite
  if (unite === '°') {
    puissanceUnite = 1
    avantPuissanceUnite = '°'
  }
  if (unite.indexOf('^') > 0) { // m² ou m³ et ses dérivées
    puissanceUnite = unite.split('^')[1]
    avantPuissanceUnite = unite.split('^')[0]
  } else if (unite.indexOf('ha') === 0) { // hectares
    puissanceUnite = 1
    avantPuissanceUnite = 'ha'
  } else if (unite.indexOf('a') === 0) { // ares
    puissanceUnite = 1
    avantPuissanceUnite = 'a'
  } else if (unite.indexOf('ca') === 0) { // centiares
    puissanceUnite = 1
    avantPuissanceUnite = 'ca'
  } else { // m, g, L et leurs dérivées
    puissanceUnite = 1
    avantPuissanceUnite = unite
  }
  const prefixe = ['t', 'q'].includes(unite) ? unite : avantPuissanceUnite.substring(0, avantPuissanceUnite.length - 1) // Pour prendre en compte la tonne aussi.
  const puissancePrefixe = prefixeToPuissance(prefixe, unite)
  const uniteDeReference = ['t', 'q'].includes(unite) ? 'g' : unite.substring(prefixe.length)
  return { prefixe, uniteDeReference, puissanceUnite, puissancePrefixe }
}

function prefixeToPuissance (prefixe, unite) {
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
    case 'q': // quintal
      puissancePrefixe = unite === 'q' ? 5 : false
      break
    case 't': // tonne
      puissancePrefixe = unite === 't' ? 6 : false
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
