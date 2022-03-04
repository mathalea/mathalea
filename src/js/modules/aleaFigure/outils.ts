import { GVPoint, GVPolygon } from './elements'
import { subtract, mod, Fraction } from 'mathjs'

export function circularPermutation(arg: any[] | string, n: number = Math.random()*arg.length): any[] {
    if (typeof arg === 'string') {
        arg = arg.split('')
    }
    n = parseInt((n % arg.length).toString())
    return arg.concat(arg).splice(n, arg.length)
}

export function getDimensions(...figures) {
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
        listeXPoints.push(fig.getDimensions()[0],fig.getDimensions()[2])
        listeYPoints.push(fig.getDimensions()[1],fig.getDimensions()[3])
      }
    }
    const xmin = Math.min(...listeXPoints)
    const xmax = Math.max(...listeXPoints)
    const ymin = Math.min(...listeYPoints)
    const ymax = Math.max(...listeYPoints)
    return [xmin, ymin, xmax, ymax]
}

/**
 * 
 * @param x 
 * @returns 
 */
export function quotient (x: number, y: number) {
  return x - x % y
}