import { Element2D } from '../Element2D'
import { Cross } from '../others/Cross'
import { TextByPoint } from '../texts/TextByPoint'
import { Measure } from '../measures/Measure'
import { Const } from '../measures/Const'
import { RoundMark } from '../others/RoundMark'
export class Point extends Element2D {
  constructor (figure, x, y, { label, style = 'x', size = 0.15, thickness = 3, color = 'blue', draggable = true, temp = false, snapToGrid = false, labelDx = -0.3, labelDy = 0.3, exist = true } = {}) {
    super(figure)
    if (typeof x === 'number' && typeof y === 'number') { this.parentFigure.save[this.id] = { className: 'Point', arguments: [x, y], thickness, color } }
    if (typeof x === 'number') { this._x = new Const(figure, x) } else { this._x = x }
    if (typeof y === 'number') { this._y = new Const(figure, y) } else { this._y = y }
    this.traces = []
    this.group = []
    this.labelElement = null
    this._label = ''
    this._style = style
    this.thickness = thickness
    this.temp = temp
    this.exist = exist
    this._size = size
    this.mark = null
    this.color = color || (draggable ? 'blue' : 'black')
    this.draggable = draggable
    this.snapToGrid = snapToGrid
    if (!this.temp) {
      this.parentFigure.set.add(this)
      this.style = style
    } else {
      this.style = ''
    }
    if (this.g.childElementCount > 0 && !this.temp) {
      this.parentFigure.svg.appendChild(this.g)
      if (this.draggable) { this.g.style.cursor = 'move' }
    }
    this.label = label || ''
    this.labelDx = labelDx
    this.labelDy = labelDy
    if (label !== undefined) { this.label = label }
    this.trace = false
    if (x instanceof Measure) { x.addChild(this) }
    if (y instanceof Measure) { y.addChild(this) }
    this.parentFigure.updateStyleCursor()
  }

  update () {
    try {
      this.moveTo(this.x, this.y)
    } catch (error) {
      console.log('Erreur dans Point.update()', error)
      this.exist = false
    }
  }

  isOnFigure () {
    try {
      return (this.x < this.parentFigure.xMax && this.x > this.parentFigure.xMin && this.y < this.parentFigure.yMax && this.y > this.parentFigure.yMin)
    } catch (error) {
      console.log('Erreur dans Point.isOnFigure()', error)
      this.exist = false
    }
  }

  moveTo (x, y) {
    try {
      this.x = x
      this.y = y
      if (this.trace && this.exist) {
        const M = new Point(this.parentFigure, x, y, { style: 'o', size: 0.02 })
        this.g.appendChild(M.g)
        this.removeChild(M)
      }
      if ((this.mark instanceof Cross || this.mark instanceof RoundMark) && this.exist) {
        ;
        [this.mark.x, this.mark.y] = [x, y]
        this.mark.update()
      }
    } catch (error) {
      console.log('Erreur dans Point.moveTo()', error)
      this.exist = false
    }
    this.notifyAllChilds()
  }

  notifyPointerMove (x, y) {
    this.moveTo(x, y)
  }

  distancePointer (pointerX, pointerY) {
    return Math.sqrt((this.x - pointerX) ** 2 + (this.y - pointerY) ** 2)
  }

  changeStyle (style) {
    if (this.mark !== null) { this.parentFigure.set.delete(this.mark) }
    this.g.remove()
    if (style === 'x' && this.exist) {
      const X = new Cross(this.parentFigure, this.x, this.y)
      X.draggable = this.draggable
      this.mark = X
      this.group.push(X)
      this.g = X.g
      this.mark.color = this.color
      this.mark.thickness = this.thickness
    }
    if (style === 'o' && this.exist) {
      const o = new RoundMark(this.parentFigure, this.x, this.y)
      this.mark = o
      this.group.push(o)
      this.g = o.g
      this.mark.color = this.color
      this.mark.thickness = this.thickness
    }
  }

  hide (changeIsVisible = true) {
    super.hide(changeIsVisible)
    if (this.labelElement) { this.labelElement.hide(changeIsVisible) }
  }

  show (changeIsVisible = true) {
    super.show(changeIsVisible)
    if (this.labelElement) { this.labelElement.show(changeIsVisible) }
  }

  get label () {
    return this._label
  }

  set label (label) {
    if (this.labelElement) {
      this.labelElement.g.innerHTML = label
    } else if (this._label) {
      this.labelElement = new TextByPoint(this, label, { dx: this.labelDx, dy: this.labelDy })
      this.parentFigure.svg.appendChild(this.labelElement.g)
    }
    this._label = label
  }

  get style () {
    return this._style
  }

  set style (style) {
    this.changeStyle(style)
    this._style = style
  }

  get size () {
    return this._size
  }

  set size (size) {
    this._size = size
    this.changeStyle(this._style)
  }

  get x () {
    return this._x.value
  }

  set x (x) {
    this._x.value = x
  }

  get y () {
    return this._y.value
  }

  set y (y) {
    this._y.value = y
  }

  static distance (A, B) {
    try {
      return Math.hypot(A.x - B.x, A.y - B.y)
    } catch (error) {
      return NaN
    }
  }
}
// # sourceMappingURL=Point.js.map
