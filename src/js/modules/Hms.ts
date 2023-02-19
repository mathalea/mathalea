class HMS {
  hour: number
  minute: number
  second: number
  sign: '' | '+' | '-'
  constructor ({ hour = 0, minute = 0, second = 0, sign = '' }: { hour?: number, minute?: number, second?: number, sign?: '+' | '-' | '' } = {}) {
    this.hour = hour
    this.minute = minute
    this.second = second
    this.sign = sign
  }

  static fromString (text: string): HMS {
    const hms = new HMS()
    text = text.replaceAll('&nbsp;', '')
    if (text.includes('min') && !text.includes('s')) {
      // Format sans le s pour les secondes 4min33, 5h3min15
      const regex = /(?:(?<sign>[+,-]))?(?:(?<hour>\d+)\s*h\s*)?(?:(?<minute>\d+)\s*min\s*)?(?:(?<second>\d+))?/gm
      for (const match of text.matchAll(regex)) {
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.hour))) hms.hour = parseInt(match.groups.hour)
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.minute))) hms.minute = parseInt(match.groups.minute)
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.second))) hms.second = parseInt(match.groups.second)
        if (match.groups !== undefined && (match.groups.sign === '+' || match.groups.sign === '-')) hms.sign = match.groups.sign
      }
    } else if (text.includes('h') && !text.includes('min') && !text.includes('s')) {
      // Format sans le min pour les minutes 5h13
      const regex = /(?:(?<sign>[+,-]))?(?:(?<hour>\d+)\s*h\s*)?(?:(?<minute>\d+))?/gm
      for (const match of text.matchAll(regex)) {
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.hour))) hms.hour = parseInt(match.groups.hour)
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.minute))) hms.minute = parseInt(match.groups.minute)
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.second))) hms.second = parseInt(match.groups.second)
        if (match.groups !== undefined && (match.groups.sign === '+' || match.groups.sign === '-')) hms.sign = match.groups.sign
      }
    } else {
      // Format HMS classique
      const regex = /(?:(?<sign>[+,-]))?(?:(?<hour>\d+)\s*h\s*)?(?:(?<minute>\d+)\s*min\s*)?(?:(?<second>\d+)\s*s)?/gm
      for (const match of text.matchAll(regex)) {
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.hour))) hms.hour = parseInt(match.groups.hour)
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.minute))) hms.minute = parseInt(match.groups.minute)
        if (match.groups !== undefined && Number.isInteger(parseInt(match.groups.second))) hms.second = parseInt(match.groups.second)
        if (match.groups !== undefined && (match.groups.sign === '+' || match.groups.sign === '-')) hms.sign = match.groups.sign
      }
    }
    return hms
  }

  toString (): string {
    let result = ''
    if (this.hour > 0) {
      result += `${this.hour % 24 ?? 0} h`
      if (this.minute > 0 || this.second > 0) result += ' '
    }
    if (this.minute > 0) {
      result += (this.minute > 9) ? `${this.minute} min` : `0${this.minute} min`
      if (this.second > 0) result += ' '
    }
    if (this.second > 0) result += `${this.second} s`
    return result
  }

  /** Sortie string sans la dernière unité si elle n'est pas seule
   * Exemples : 4 h 12 ou 2 min 54
   */
  toString2 (): string {
    if (this.hour > 0 && this.second === 0) return this.toString().replace(' min', '')
    else if (this.minute > 0) return this.toString().replace(' s', '')
    else return this.toString()
  }

  isGreaterThan (time: HMS): boolean {
    return (this.toSeconds() > time.toSeconds())
  }

  isEqual (time: HMS): boolean {
    return (this.toSeconds() === time.toSeconds())
  }

  isEquivalentToString (text: string): boolean {
    return HMS.fromString(text).toSeconds() === this.toSeconds()
  }

  toSecondsString (): string {
    return `${this.toSeconds()} s`
  }

  toSeconds (): number {
    return this.hour * 3600 + this.minute * 60 + this.second
  }

  /**
   * Normalise l'écriture au format HMS. Les secondes et les minutes seront inférieures à 60
   */
  normalize (): void {
    this.minute += Math.floor(this.second / 60)
    this.second = this.second % 60
    this.hour += Math.floor(this.minute / 60)
    this.minute = this.minute % 60
  }

  add (time: HMS): HMS {
    const result = new HMS()
    result.second = this.toSeconds() + time.toSeconds()
    result.normalize()
    return result
  }

  /**
   * Renvoie la valeur absolue de la différence des temps au format HMS
   * @param time HMS
   * @returns HMS
   */
  substract (time: HMS): HMS {
    const result = new HMS()
    result.second = Math.abs(this.toSeconds() - time.toSeconds())
    result.normalize()
    return result
  }
}

export default HMS
