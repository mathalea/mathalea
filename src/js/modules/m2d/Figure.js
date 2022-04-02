import { Line } from './elements/lines/Line'
import { TextByPosition } from './elements/texts/TextByPosition'
import { moveDrag, stopDrag } from './pointerAction/drag'
import { handlePointerAction, initMessageAction } from './pointerAction/handlePointerAction'
import { newPointByCoords } from './pointerAction/newPointByCoords'
import { Coords } from './elements/others/Coords'
import { Cross } from './elements/others/Cross'
export class Figure {
  constructor ({ width = 600, height = 400, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true, dx = 1, dy = 1 } = {}) {
    this.width = width
    this.height = height
    this.lastId = 0
    this.save = {}
    this.dictionnary = {}
    this.pixelsPerUnit = pixelsPerUnit
    this.xMin = xMin
    this.xMax = xMin + width / pixelsPerUnit
    this.yMin = yMin
    this.yMax = yMin + height / pixelsPerUnit
    this.dx = dx
    this.dy = dy
    this.isDynamic = isDynamic
    this.set = new Set()
    this.selectedElements = []
    this._pointerAction = 'drag'
    this.pointerSetOptions = { color: 'black', thickness: 1 }
    this.setInDrag = new Set()
    this.isDraging = false
    this.startDragCoords = new Coords(Infinity, Infinity)
    this.messageElement = null
    this.pointerX = null
    this.pointerY = null
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.style.width = `${this.width}px`
    this.svg.style.height = `${this.height}px`
    this.svg.setAttribute('viewBox', `${this.xToSx(this.xMin)} ${this.yToSy(this.yMax)} ${this.width} ${this.height}`)
    this.svg.style.touchAction = 'none'
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    this.svg.appendChild(style)
    style.type = 'text/css'
    style.innerHTML = '.onlyOver:hover { opacity: 1; }'
    if (this.isDynamic) { this.listenPointer() }
  }

  xToSx (x) {
    return x * this.pixelsPerUnit
  }

  yToSy (y) {
    return -y * this.pixelsPerUnit
  }

  sxTox (x) {
    return x / this.pixelsPerUnit
  }

  syToy (y) {
    return -y * this.pixelsPerUnit
  }

  getPointerCoord (event) {
    event.preventDefault()
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    return [pointerX, pointerY]
  }

  listenPointer () {
    this.svg.addEventListener('pointerdown', (event) => {
      handlePointerAction(this, event)
    })
    this.svg.addEventListener('pointerup', (event) => {
      if (this.pointerAction === 'drag' && this.isDraging) { stopDrag(this) }
    })
    this.svg.addEventListener('pointermove', (event) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      if (this.pointerAction === 'drag') { moveDrag(this, pointerX, pointerY) }
    })
  }

  get pointerAction () {
    return this._pointerAction
  }

  set pointerAction (action) {
    this._pointerAction = action
    this.clearSelectedElements()
    initMessageAction(this, action)
    if (action === 'pointByCoords') { newPointByCoords(this) }
    if (action === 'save') { console.log(JSON.stringify(this.save)) }
    this.updateStyleCursor()
  }

  updateStyleCursor () {
    const action = this.pointerAction
    for (const e of this.set) {
      if (action === 'drag' && e instanceof Cross && e.draggable) { e.g.style.cursor = 'move' } else if (action === 'drag' && e instanceof Cross && !e.draggable) { e.g.style.cursor = 'default' } else if (action === 'drag' && e instanceof Line && e.A.draggable && e.B.draggable) { e.g.style.cursor = 'move' } else { e.g.style.cursor = 'pointer' }
    }
  }

  clearSelectedElements () {
    for (const e of this.selectedElements) {
      e.unSelect()
    }
  }

  displayMessage (text, { dx = 1, dy = 1 } = {}) {
    if (this.messageElement) {
      this.messageElement.text = text
      this.messageElement.x = this.xMin + dx
      this.messageElement.y = this.yMax - dy
    } else {
      const message = new TextByPosition(this, this.xMin + dx, this.yMax - dy, text, { anchor: 'start', draggable: false, color: 'gray' })
      this.messageElement = message
      this.set.delete(this.messageElement)
    }
  }

  get latex () {
    let latex = '\\begin{tikzpicture}'
    latex += `\n\t\\clip(${this.xMin}, ${this.yMin}) rectangle (${this.xMax}, ${this.yMax});`
    for (const e of this.set) {
      latex += e.latex
    }
    latex += '\n\\end{tikzpicture}'
    latex = latex.replace(/\d+\.\d+/g, (number) => (Math.round(1000 * parseFloat(number)) / 1000).toString())
    return latex
  }
}
// # sourceMappingURL=Figure.js.map
