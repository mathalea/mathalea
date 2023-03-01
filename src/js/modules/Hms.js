class Hms {
  constructor ({ hour = 0, minute = 0, second = 0, sign = '' } = {}) {
    this.hour = hour
    this.minute = minute
    this.second = second
    this.sign = sign
  }

  static fromString (text) {
    const hms = new Hms()
    text = text.replaceAll('&nbsp;', '')
    text = text.replaceAll('{\\:\\text{h}\\:}', 'h')
    text = text.replaceAll('{\\:\\text{min}\\:}', 'min')
    text = text.replaceAll('{\\:\\text{s}\\:}', 's')
    if (text.includes('min') && !text.includes('s')) {
      // Format sans le s pour les secondes 4min33, 5h3min15
      const regex = /(?:(?<sign>[+,-]))?(?:(?<hour>\d+)\s*h\s*)?(?:(?<minute>\d+)\s*min\s*)?(?:(?<second>\d+))?/gm
      for (const match of text.matchAll(regex)) {
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.hour))) { hms.hour = parseInt(match.groups.hour) }
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.minute))) { hms.minute = parseInt(match.groups.minute) }
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.second))) { hms.second = parseInt(match.groups.second) }
        if (match.groups !== undefined && (match.groups.sign === '+' || match.groups.sign === '-')) { hms.sign = match.groups.sign }
      }
    } else if (text.includes('h') && !text.includes('min') && !text.includes('s')) {
      // Format sans le min pour les minutes 5h13
      const regex = /(?:(?<sign>[+,-]))?(?:(?<hour>\d+)\s*h\s*)?(?:(?<minute>\d+))?/gm
      for (const match of text.matchAll(regex)) {
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.hour))) { hms.hour = parseInt(match.groups.hour) }
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.minute))) { hms.minute = parseInt(match.groups.minute) }
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.second))) { hms.second = parseInt(match.groups.second) }
        if (match.groups !== undefined && (match.groups.sign === '+' || match.groups.sign === '-')) { hms.sign = match.groups.sign }
      }
    } else {
      // Format HMS classique
      const regex = /(?:(?<sign>[+,-]))?(?:(?<hour>\d+)\s*h\s*)?(?:(?<minute>\d+)\s*min\s*)?(?:(?<second>\d+)\s*s)?/gm
      for (const match of text.matchAll(regex)) {
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.hour))) { hms.hour = parseInt(match.groups.hour) }
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.minute))) { hms.minute = parseInt(match.groups.minute) }
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.second))) { hms.second = parseInt(match.groups.second) }
        if (match.groups !== undefined && (match.groups.sign === '+' || match.groups.sign === '-')) { hms.sign = match.groups.sign }
      }
    }
    return hms
  }

  toString () {
    let result = ''
    if (this.hour > 0) {
      // Ce code fait buguer le build:dicos de la v2 : this.hour % 24 ?? 0
      if (this.hour % 24 === 0) {
        result += '0 h'
      } else {
        result += `${this.hour} h`
      }
      if (this.minute > 0 || this.second > 0) { result += ' ' }
    }
    if (this.minute > 0) {
      result += (this.minute > 9) ? `${this.minute} min` : `0${this.minute} min`
      if (this.second > 0) { result += ' ' }
    }
    if (this.second > 0) { result += `${this.second} s` }
    return result
  }

  /** Sortie string sans la dernière unité si elle n'est pas seule
     * Exemples : 4 h 12 ou 2 min 54
     */
  toString2 () {
    if (this.hour > 0 && this.second === 0) { return this.toString().replace(' min', '') } else if (this.minute > 0) { return this.toString().replace(' s', '') } else { return this.toString() }
  }

  isGreaterThan (time) {
    return (this.toSeconds() > time.toSeconds())
  }

  isEqual (time) {
    return (this.toSeconds() === time.toSeconds())
  }

  /** Durées identiques et écrites de la même manière
  * 1 min et 60 s => false
  */
  isTheSame (time) {
    return (this.hour === time.hour && this.minute === time.minute && this.second === time.second)
  }

  isEquivalentToString (text) {
    return Hms.fromString(text).toSeconds() === this.toSeconds()
  }

  toSecondsString () {
    return `${this.toSeconds()} s`
  }

  toSeconds () {
    return this.hour * 3600 + this.minute * 60 + this.second
  }

  /**
     * Normalise l'écriture au format HMS. Les secondes et les minutes seront inférieures à 60
     */
  normalize () {
    this.minute += Math.floor(this.second / 60)
    this.second = this.second % 60
    this.hour += Math.floor(this.minute / 60)
    this.minute = this.minute % 60
  }

  add (time) {
    const result = new Hms()
    result.second = this.toSeconds() + time.toSeconds()
    result.normalize()
    return result
  }

  /**
     * Renvoie la valeur absolue de la différence des temps au format HMS
     * @param time HMS
     * @returns HMS
     */
  substract (time) {
    const result = new Hms()
    result.second = Math.abs(this.toSeconds() - time.toSeconds())
    result.normalize()
    return result
  }
}
export default Hms
