import { PointByTranslation } from './../points/PointByTranslation'
import { Distance } from './Distance'
import { CalculDynamic } from './CalculDynamic'
import { Segment } from '../lines/Segment'
import { Point } from '../points/Point'
import { PointOnSegment } from '../points/PointOnSegment'
import { DisplayMeasure } from '../texts/DisplayMeasure'
import { Measure } from './Measure'
export class Cursor extends Measure {
  constructor (svgContainer, x, y, { min = 0, max = 1, step = 0.1, length = 2, value = 0 } = {}) {
    super(svgContainer)
    const factor = Math.round(length / step)
    if (!Number.isInteger(length / step)) {
      length = factor * step
    }
    this.length = length
    this.step = step
    this.max = max
    this.min = min
    const M = new Point(svgContainer, x, y, { temp: true })
    const N = new PointByTranslation(M, length, 0, { temp: true, draggable: false })
    this.origin = M
    this.end = N
    this.line = new Segment(M, N)
    this.line.lineType = 'Cursor'
    this.line.thickness = 4
    this.line.color = 'black'
    this.tab = new PointOnSegment(this.line, { draggable: true, style: 'o', color: 'blue', length: length * (Math.max(Math.min(value, max), min) - min) / (max - min) })
    this.line.g.setAttribute('stroke-linecap', 'round')
    this.position = new Distance(M, this.tab)
    this.calcul = new CalculDynamic((args) => this.min + Math.round((this.max - this.min) * args[0].value / this.length / this.step) * this.step, [this.position])
    this.value = this.calcul.value
    this.display = new DisplayMeasure(this.end.x + 0.5, this.tab.y, this, { precision: 2, draggable: true })
    this.tab.addChild(this.display)
    this.tab.addChild(this)
    this.tab.addChild(this.calcul)
  }

  update () {
    this.value = this.calcul.value
    this.display.x = this.end.x + 0.5
    this.display.y = this.tab.y
    this.notifyAllChilds()
  }
}
// # sourceMappingURL=Cursor.js.map
