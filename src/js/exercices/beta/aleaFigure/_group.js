/**
 * @class
 * @classdesc Méthodes for groups of elements from differents classes
 */
export class Group {
  constructor (...args) {
    this.elements = args || []
  }

  show () {
    this.elements.forEach(x => { x.visible = true })
    return this
  }

  addElement (...elements) {
    elements.forEach(element => this.elements.push(element))
  }
}
