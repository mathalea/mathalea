import { GVPoint, GVPolygon, GVSegment, GVLine } from './elements.js'
import { GVGrandeur } from './grandeurs.js'
export function circularPermutation (arg, n = Math.random() * arg.length) {
  if (typeof arg === 'string') {
    arg = arg.split('')
  }
  n = parseInt((n % arg.length).toString())
  return arg.concat(arg).splice(n, arg.length)
}
export function getDimensions (...figures) {
  const listePoints = []
  const listeXPoints = []
  const listeYPoints = []
  for (const fig of figures) {
    if (fig instanceof GVPoint) {
      listePoints.push(fig)
      listeXPoints.push(fig.x)
      listeYPoints.push(fig.y)
    } else if (fig instanceof GVPolygon) {
      listePoints.push(...fig.vertices)
      listeXPoints.push(fig.getDimensions()[0], fig.getDimensions()[2])
      listeYPoints.push(fig.getDimensions()[1], fig.getDimensions()[3])
    }
  }
  const xmin = Math.min(...listeXPoints)
  const xmax = Math.max(...listeXPoints)
  const ymin = Math.min(...listeYPoints)
  const ymax = Math.max(...listeYPoints)
  return [xmin, ymin, xmax, ymax]
}
export function quotient (x, y) {
  return x - x % y
}
export function name (s, ...p) {
  p = p.map((x, k) => {
    console.log(x instanceof GVSegment)
    if (x instanceof GVGrandeur) {
      return String.raw`${s.raw[k]}` + x.name
    } else if (x instanceof GVSegment) {
      return String.raw`${s.raw[k]}` + `${x.name}`
    } else if (x instanceof GVLine) {
      return String.raw`${s.raw[k]}` + `${x.name}`
    } else if (x instanceof GVPoint || x instanceof GVPolygon) {
      return String.raw`${s.raw[k]}` + `${x.name}`
    } else {
      return String.raw`${s.raw[k]}` + `${x}`
    }
  })
  return p.join('') + s.raw[s.length - 1]
}
