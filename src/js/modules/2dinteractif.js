import { point, polygone, tracePoint } from './2d.js'
import { colorToLatexOrHTML, ObjetMathalea2D } from './2dGeneralites.js'
import { context } from './context.js'

/**
 * @author Rémi ANGOT
 * @param {number} x abscisse du point
 * @param {number} y ordonnée du point
 * @param {object} options over, out et click sont des objets pour le style css des évènements de la souris, radius, width, color, opacite, size, style sont les paramètres possibles pour la trace du point
 */
function PointCliquable (x, y, options) {
  ObjetMathalea2D.call(this, { })
  const A = point(x, y)
  this.point = A
  if (!options) options = {}
  const out = options.out || { opacity: 0 }
  const over = options.over || { opacity: 0.5 }
  const click = options.click || { opacity: options.opacite || 1 }
  this.etat = false // Pour récupérer si le point est affiché ou pas
  this.svg = function (coeff) {
    let code
    const trace = tracePoint(A, options.color || options.couleur || 'black')
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

/**
 * @author Rémi ANGOT
 * @param {number} x abscisse du point
 * @param {number} y ordonnée du point
 * @param {object} options over, out et click sont des ojets pour le style css des évènements de la souris, radius, width, color, size, style sont les paramètres possibles pour la trace du point
 */
function RectangleCliquable (x1, y1, x2, y2, options) {
  ObjetMathalea2D.call(this, { })
  const A = point(x1, y1)
  const B = point(x2, y1)
  const C = point(x2, y2)
  const D = point(x1, y2)
  const rectangle = polygone(A, B, C, D)
  const bordure = polygone(A, B, C, D)
  if (!options) options = {}
  const out = options.out || { opacity: 0 }
  const over = options.over || { opacity: 0.2 }
  const click = options.click || { opacity: 1 }
  const couleur = options.couleur || '#f15929'
  const cliquable = (options.cliquable !== undefined) ? options.cliquable : true
  rectangle.hachures = options.hachures || false
  rectangle.epaisseurDesHachures = options.epaisseurDesHachures || 4
  bordure.epaisseur = options.epaisseur || 1
  this.etat = options.etat || false // Pour récupérer si le rectangle est cliqué ou pas
  this.svg = function (coeff) {
    let code
    rectangle.couleurDeRemplissage = colorToLatexOrHTML(options.color || options.couleur || options.couleurDeRemplissage || '#f15929')
    rectangle.epaisseur = 0
    rectangle.isVisible = false
    code = `<g id="rectangle${this.id}">\n`
    code += rectangle.svg(coeff) + '\n'
    code += '</g>'
    code += bordure.svg(coeff)
    return code
  }
  this.tikz = (coeff) => {
    if (this.etat) bordure.couleurDeRemplissage = colorToLatexOrHTML(couleur)
    bordure.hachures = rectangle.hachures
    return bordure.tikz(coeff)
  }
  const moi = this // Pour utiliser this dans les fonctions
  const gestionDeLaSouris = () => {
    document.removeEventListener('exercicesAffiches', gestionDeLaSouris)
    const groupe = document.getElementById('rectangle' + this.id)
    const changeEtatPoint = (etat) => {
      this.etat = etat
    }
    if (groupe) {
      // On initialise avec le style de out ou de click suivant l'état
      for (const key in out) {
        groupe.style[key] = (this.etat) ? click[key] : out[key]
      }
    }
    if (groupe && cliquable) {
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

export function rectangleCliquable (...args) {
  return new RectangleCliquable(...args)
}

export function fractionCliquable (x, y, unites, denominateur, options) {
  const objets = []
  if (!options) options = {}
  const longueur = options.longueur || 4
  const ecart = options.ecart || 1
  const hauteur = options.hauteur || 1
  const liste1 = options.liste1 || []
  const liste2 = options.liste2 || []
  let couleur1 = options.couleur1 || '#f15929'
  let couleur2 = options.couleur2 || '#1DA962'
  if (!context.isHtml) {
    couleur1 = options.couleur1 || 'gray'
    couleur2 = options.couleur2 || 'lightgray'
  }
  const hachures1 = options.hachures1 || false
  const hachures2 = options.hachures2 || false
  const couleur = options.couleur || couleur1
  const cliquable = (options.cliquable !== undefined) ? options.cliquable : true
  let O
  for (let i = 0; i < unites; i++) {
    O = point(x + i * (longueur + ecart), y)
    for (let j = 0; j < denominateur; j++) {
      if (liste1.includes(i * denominateur + j + 1)) {
        objets.push(rectangleCliquable(O.x + j * longueur / denominateur, y, O.x + (j + 1) * longueur / denominateur, y + hauteur,
          { cliquable, etat: true, couleur: couleur1, hachures: hachures1 }))
      } else if (liste2.includes(i * denominateur + j + 1)) {
        objets.push(rectangleCliquable(O.x + j * longueur / denominateur, y, O.x + (j + 1) * longueur / denominateur, y + hauteur,
          { cliquable, etat: true, couleur: couleur2, hachures: hachures2 }))
      } else {
        objets.push(rectangleCliquable(O.x + j * longueur / denominateur, y, O.x + (j + 1) * longueur / denominateur, y + hauteur, { cliquable, couleur, etat: false }))
      }
    }
  }
  return objets
}
