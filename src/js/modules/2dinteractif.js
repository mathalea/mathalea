import { ObjetMathalea2D, point, tracePoint } from './2d.js'

function PointCliquable (x, y, { over = { opacity: 0.5 }, out = { opacity: 0 }, clic = { opacity: 1 }, rayon = 1, epaisseur = 1, color = 'black', taille = 3, style = 'x' } = {}) {
  ObjetMathalea2D.call(this)
  const A = point(x, y)
  this.svg = function (coeff) {
    let code
    const trace = tracePoint(A)
    trace.color = color
    trace.epaisseur = epaisseur
    trace.taille = taille
    trace.isVisible = false
    trace.style = style
    code = `<g id="${this.id}">\n`
    code += trace.svg(coeff) + '\n'
    // Le cercle est la zone d'effet pour les évènements
    // Comme fill est à none, il faut ajouter pointer-events="visible" cf https://www.smashingmagazine.com/2018/05/svg-interaction-pointer-events-property/
    code += `<circle cx="${A.xSVG(coeff)}" cy="${A.ySVG(coeff)}" r="${rayon * coeff}" fill="none" pointer-events="visible" />\n`
    code += '</g>'
    return code
  }
  document.addEventListener('svgAffiche', () => {
    let etat = false // Est-ce que le point a déjà été cliqué ?
    const groupe = document.getElementById(`${this.id}`)
    // On initialise avec le style de out
    if (groupe) {
      for (const key in out) {
        groupe.style[key] = out[key]
      }
      groupe.addEventListener('mouseover', mouseOverEffect)
      groupe.addEventListener('mouseout', mouseOutEffect)
      groupe.addEventListener('click', mouseClick)
      function mouseOverEffect () {
        for (const key in over) {
          this.style[key] = over[key]
        }
      }
      function mouseOutEffect () {
        for (const key in out) {
          this.style[key] = out[key]
        }
      }
      function mouseClick () {
        if (etat) {
          // On désactive le point
          groupe.addEventListener('mouseover', mouseOverEffect)
          groupe.addEventListener('mouseout', mouseOutEffect)
          // On lui remet le style de out
          for (const key in out) {
            this.style[key] = out[key]
          }
          etat = false
        } else {
          // On désactive les listeners
          groupe.removeEventListener('mouseover', mouseOverEffect)
          groupe.removeEventListener('mouseout', mouseOutEffect)
          // On applique le style de clic
          for (const key in clic) {
            this.style[key] = clic[key]
          }
          etat = true
        }
      }
    }
  })
}

export function pointCliquable (...args) {
  return new PointCliquable(...args)
}
