import { Segment } from './elements/Segment'
import { Point } from './elements/Point'
import M2d from './M2d'

const m2d = new M2d()
m2d.id = 'xyz'
const A = new Point(0, 0)
const B = new Point(1, 0)
const C = new Point(0, 1)
const s = new Segment(A, B)
const s2 = new Segment(A, C)
m2d.list = [s, s2]
console.log(m2d.svg)
const div = document.createElement('div')
document.body.appendChild(div)
div.appendChild(m2d.svg)
