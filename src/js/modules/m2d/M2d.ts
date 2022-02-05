import { Segment } from './elements/Segment'
import { Point } from './elements/Point'

type GeometryElement = { svg : (coeff?: number) => SVGElement | HTMLElement }

class M2d {
    width: number
    height: number
    k: number
    id: string
    list: GeometryElement[] = []
    constructor ({width = 600, height = 400, k = 30, id = 'm2d'} : {width?: number, height?: number, k?: number, id?: string} = {}) {
        this.width = width
        this.height = height
        this.k = k
        this.id = id
    }

    get svg () {
        const elementSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
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

const m2d = new M2d()
m2d.id = 'xyz'
const A = new Point(0,0)
const B = new Point(1, 0)
const C = new Point(0,1)
const s = new Segment(A, B)
const s2 = new Segment(A, C)
m2d.list = [s, s2]
console.log(m2d.svg)
const div = document.createElement('div')
document.querySelector('h1').after(div)
document.querySelector('div').appendChild(m2d.svg)