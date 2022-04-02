import { Element2D } from '../Element2D'
export class Grid extends Element2D {
  constructor (figure, { xMin = figure.xMin, xMax = figure.xMax, yMin = figure.yMin, yMax = figure.yMax, dx = figure.dx, dy = figure.dy, color = 'gray', opacity = 0.2, dashed = false, thickness = 1 } = {}) {
    super(figure)
    this.xMin = xMin
    this.xMax = xMax
    this.yMin = yMin
    this.yMax = yMax
    this.dx = dx
    this.dy = dy
    for (let x = xMin; x <= xMax; x += dx) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', `${figure.xToSx(x)}`)
      line.setAttribute('y1', `${figure.yToSy(yMin)}`)
      line.setAttribute('x2', `${figure.xToSx(x)}`)
      line.setAttribute('y2', `${figure.yToSy(yMax)}`)
      this.g.appendChild(line)
    }
    for (let y = yMin; y <= yMax; y += dy) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', `${figure.xToSx(xMin)}`)
      line.setAttribute('y1', `${figure.yToSy(y)}`)
      line.setAttribute('x2', `${figure.xToSx(xMax)}`)
      line.setAttribute('y2', `${figure.yToSy(y)}`)
      this.g.appendChild(line)
    }
    figure.svg.appendChild(this.g)
    figure.set.add(this)
    this.color = color
    this.opacity = opacity
    this.dashed = dashed
    this.thickness = thickness
  }

  update () {
  }

  get latex () {
    let latex = '\n\n\t% Grid'
    const tikzOptions = this.tikzOptions
    for (let x = this.xMin; x <= this.xMax; x += this.dx) {
      latex += `\n\t\\draw${tikzOptions} (${x}, ${this.yMin}) -- (${x}, ${this.yMax});`
    }
    for (let y = this.yMin; y <= this.yMax; y += this.dy) {
      latex += `\n\t\\draw${tikzOptions} (${this.xMin}, ${y}) -- (${this.xMax}, ${y});`
    }
    return latex
  }
}
// # sourceMappingURL=Grid.js.map
