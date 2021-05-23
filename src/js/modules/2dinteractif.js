import { ObjetMathalea2D, point, tracePoint } from './2d.js'

/**
 * @author Rémi ANGOT
 * @param {number} x abscisse du point
 * @param {number} y ordonnée du point
 * @param {object} options over, out et click sont des ojets pour le style css des évènements de la souris, radius, width, color, size, style sont les paramètres possibles pour la trace du point
 */
function PointCliquable (x, y, options) {
  ObjetMathalea2D.call(this)
  const A = point(x, y)
  if (!options) options = {}
  const out = options.out || { opacity: 0 }
  const over = options.over || { opacity: 0.5 }
  const click = options.click || { opacity: 1 }
  this.etat = false // Pour récupérer si le point est affiché ou pas
  this.svg = function (coeff) {
    let code
    const trace = tracePoint(A)
    trace.color = options.color || options.couleur || 'black'
    trace.epaisseur = options.width || options.epaisseur || 1
    trace.taille = options.size || options.taille || 3
    trace.isVisible = false
    trace.style = options.style || 'x'
    code = `<g id="${this.id}">\n`
    code += trace.svg(coeff) + '\n'
    // Le cercle est la zone d'effet pour les évènements
    // Comme fill est à none, il faut ajouter pointer-events="visible" cf https://www.smashingmagazine.com/2018/05/svg-interaction-pointer-events-property/
    code += `<circle cx="${A.xSVG(coeff)}" cy="${A.ySVG(coeff)}" r="${(options.radius || options.rayon || 1) * coeff}" fill="none" pointer-events="visible" />\n`
    code += '</g>'
    return code
  }
  const moi = this // Pour utiliser this dans les fonctions
  const gestionDeLaSouris = () => {
    document.removeEventListener('exercicesAffiches', gestionDeLaSouris)
    const groupe = document.getElementById(`${this.id}`)
    const changeEtatPoint = (etat) => {
      this.etat = etat
    }
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
        if (moi.etat) {
          // On désactive le point
          groupe.addEventListener('mouseover', mouseOverEffect)
          groupe.addEventListener('mouseout', mouseOutEffect)
          // On lui remet le style de out
          for (const key in out) {
            this.style[key] = out[key]
          }
          moi.etat = false
          changeEtatPoint(false)
        } else {
          // On désactive les listeners
          groupe.removeEventListener('mouseover', mouseOverEffect)
          groupe.removeEventListener('mouseout', mouseOutEffect)
          // On applique le style de click
          for (const key in click) {
            this.style[key] = click[key]
          }
          moi.etat = true
        }
      }
    }
  }
  document.addEventListener('exercicesAffiches', gestionDeLaSouris)
  this.stopCliquable = () => {
    const groupe = document.getElementById(`${this.id}`)
    // On retire tous les listener en le remplaçant par un clone
    groupe.replaceWith(groupe.cloneNode(true))
  }
}

export function pointCliquable (...args) {
  return new PointCliquable(...args)
}
