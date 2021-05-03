const { normalize } = require('helpers/text')
/**
 * Pilotage d'une liste déroulante dans le dom
 * @class
 */
class ListeDeroulanteHandler {
  /**
   * @param page
   * @param id
   * @constructor
   */
  constructor (page, id) {
    /** @type {Page} */
    this.page = page
    /** @type {string} id principal de la ListeDeroulante */
    this.id = id
    /** @type {ElementHandle[]} */
    this.choices = []
    // on supprime la ref à une page fermée
    page.on('close', () => { this.page = null })
    // et on ajoute la liste en arrière plan
    this.container = null
  }

  async _init () {
    if (this.container) return true
    await this.page.waitForSelector(`#${this.id}`)
    this.container = await this.page.$(`#${this.id}`)
    return Boolean(this.container)
  }

  /**
   * @return {Promise<boolean>}
   */
  async isOpen () {
    await this._init()
    return await this.page.$eval(`#${this.id} div.choix`, (elt) => elt && elt.style.visibility === 'visible')
  }

  /**
   * Déroule la liste déroulante
   * @return {Promise<boolean>}
   */
  async show () {
    await this._init()
    if (!this.page || !this.container) return false
    const isOpen = await this.isOpen()
    if (isOpen) return true
    await this.page.click(`#${this.id} td.choixim`) // le bouton à droite de "choisir"
    return true
  }

  /**
   * Retourne les textes des options de choix (liste vide si on l'a pas trouvée)
   * @return {Promise<string[]>}
   */
  async getTexts () {
    await this._init()
    const texts = []
    if (await this.show()) {
      const elements = await this.page.$$(`#${this.id} div.choix:visible`)
      for (const elt of elements) {
        texts.push(await elt.innerText())
      }
    }
    return texts
  }

  /**
   * Déroule la liste et sélectionne text
   * @param text
   * @return {Promise<boolean>}
   */
  async selectText (text) {
    await this.show()
    const elements = await this.page.$$(`#${this.id} div.choix:visible`)
    text = normalize(text)
    for (const elt of elements) {
      const itemText = await elt.innerText()
      if (normalize(itemText) === text) {
        await elt.click()
        return true
      }
    }
    // pas trouvé
    return false
  }
}

module.exports = ListeDeroulanteHandler
