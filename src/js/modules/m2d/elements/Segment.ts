import { Point} from './Point'

export class Segment {
    x1: number
    y1: number
    x2: number
    y2: number
    x1Svg: number
    x2Svg: number
    y1Svg: number
    y2Svg: number
    constructor(A: Point, B: Point) {
        this.x1 = A.x
        this.y1 = A.y
        this.x2 = B.x
        this.y2 = B.y
    }

    svg (coeff = 30) {
        this.x1Svg = this.x1 * coeff
        this.x2Svg = this.x2 * coeff
        this.y1Svg = - this.y1 * coeff
        this.y2Svg = - this.y2 * coeff
        const segment = document.createElementNS("http://www.w3.org/2000/svg",'line')
        segment.setAttribute('x1', `${this.x1Svg}`)
        segment.setAttribute('y1', `${this.y1Svg}`)
        segment.setAttribute('x2', `${this.x2Svg}`)
        segment.setAttribute('y2', `${this.y2Svg}`)
        segment.setAttribute('stroke','black')
        segment.setAttribute('stroke-width', '3')
        return segment
    }
}