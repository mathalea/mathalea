
type GeometryElement = { svg : (coeff?: number) => SVGElement | HTMLElement }
type M2dOptions = {width?: number, height?: number, k?: number, id?: string}

class M2d {
    width: number
    height: number
    k: number
    id: string
    list: GeometryElement[] = []

    constructor ({ width = 600, height = 400, k = 30, id = 'm2d' } : M2dOptions = {}) {
      this.width = width
      this.height = height
      this.k = k
      this.id = id
    }

    get svg () {
      const elementSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      elementSvg.style.width = `${this.width}px`
      elementSvg.style.height = `${this.height}px`
      elementSvg.id = this.id
      elementSvg.setAttribute('viewBox', `-200 -200 ${this.width} ${this.height}`)
      for (const element of this.list) {
        elementSvg.appendChild(element.svg())
      }
      return elementSvg
    }
}

export default M2d
