/** @module grilles */

/**  Trace une grille quadrillée dont le coin en bas à gauche est (xmin, ymin) et celui à droite est au maximum (xmax, ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de la grille
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de la grille
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de la grille
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de la grille
 * @param {string} [color = 'gray'] Couleur de la grille : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de la grille : entre 0 et 1
 * @param {number} [step = 1] Pas de la grille
 * @param {number} [pointilles = 0] Style des pointillés de la grille (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de la grille. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de la grille : entre 0 et 1
 * @author Rémi Angot
 * @class
 */

import { ObjetMathalea2D } from '../2dGeneralites'
import { arrondi } from '../outils/nombres'
import { segment } from './segment'
import { plot } from './tracePoint'

// JSDOC Validee par EE Aout 2022
function Grille (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = 0) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = xmin; i <= xmax; i = arrondi(i + step)) {
    const s = segment(i, ymin, i, ymax, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
    }
    objets.push(s)
  }
  for (let i = ymin; i <= ymax; i = arrondi(i + step)) {
    const s = segment(xmin, i, xmax, i, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
    }
    objets.push(s)
  }
  // this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${this.color}, opacite = ${this.opacite}, pas = ${step})`
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
  this.svgml = function (coeff, amp) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}

/**  Trace une grille quadrillée dont le coin en bas à gauche est (xmin, ymin) et celui à droite est au maximum (xmax, ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
   * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de la grille
   * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de la grille
   * @param {number} [xmax = 30] Abscisse du coin en haut à droite de la grille
   * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de la grille
   * @param {string} [color = 'gray'] Couleur de la grille : du type 'blue' ou du type '#f15929'
   * @param {number} [opacite = 0.4] Opacité de la grille : entre 0 et 1
   * @param {number} [step = 1] Pas de la grille
   * @param {number} [pointilles = 0] Style des pointillés de la grille (entier entre 1 et 5). Si autre chose, pas de pointillés.
   * @example grid = grille() // Trace une grille avec toutes les options par défaut
   * @example grid = grille(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace une grille avec toutes les options différentes de celles par défaut
   * @author Rémi Angot
   * @return {Grille}
   */
// JSDOC Validee par EE Aout 2022
export function grille (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = 0) {
  return new Grille(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

/**  Trace des parallèles à l'axe des abscisses
   * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
   * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
   * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
   * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
   * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
   * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
   * @param {number} [step = 1] Pas de ces parallèles
   * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur de ces parallèles. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} opacite Opacité de ces parallèles : entre 0 et 1
   * @author Rémi Angot
   * @class
   */
// JSDOC Validee par EE Aout 2022
function LignesHorizontales (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = ''
) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = ymin; i <= ymax; i += step) {
    const s = segment(xmin, i, xmax, i, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
    }
    objets.push(s)
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**  Trace des parallèles à l'axe des abscisses
   * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
   * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
   * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
   * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
   * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
   * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
   * @param {number} [step = 1] Pas de ces parallèles
   * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
   * @example grid = lignesHorizontales() // Trace des parallèles à l'axe des abscisses avec toutes les options par défaut
   * @example grid = lignesHorizontales(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace des parallèles à l'axe des abscisses avec toutes les options différentes de celles par défaut
   * @author Rémi Angot
   * @return {LignesHorizontales}
   */
// JSDOC Validee par EE Aout 2022
export function lignesHorizontales (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = '') {
  return new LignesHorizontales(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

/**  Trace des verticales à l'axe des ordonnées
   * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
   * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
   * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
   * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
   * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
   * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
   * @param {number} [step = 1] Pas de ces parallèles
   * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {string} color Couleur de ces parallèles. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} opacite Opacité de ces parallèles : entre 0 et 1
   * @author Rémi Angot
   * @class
   */
// JSDOC Validee par EE Aout 2022
function LignesVerticales (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = '') {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = xmin; i <= xmax; i = i + step) {
    const s = segment(i, ymin, i, ymax, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
    }
    objets.push(s)
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
   * LignesVerticales(xmin,ymin,xmax,ymax,color,opacite,pas)
   *
   * @author Rémi Angot
   */
/**  Trace des parallèles à l'axe des ordonnées
   * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
   * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
   * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
   * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
   * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
   * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
   * @param {number} [step = 1] Pas de ces parallèles
   * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
   * @example grid = lignesHorizontales() // Trace des parallèles à l'axe des ordonnées avec toutes les options par défaut
   * @example grid = lignesHorizontales(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace des parallèles à l'axe des ordonnées avec toutes les options différentes de celles par défaut
   * @author Rémi Angot
   * @return {LignesVerticales}
   */
// JSDOC Validee par EE Aout 2022
export function lignesVerticales (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = '') {
  return new LignesVerticales(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

function Seyes (xmin = 0, ymin = 0, xmax = 15, ymax = 15, opacite1 = 0.5, opacite2 = 0.2) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  for (let y = ymin; y <= ymax; y = y + 0.25) {
    if (y % 1 !== 0) {
      const d = segment(xmin, y, xmax, y, 'red')
      d.opacite = opacite2
      objets.push(d)
    }
  }
  objets.push(grille(xmin, ymin, xmax, ymax, 'blue', opacite1, 1))
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
   * Fais un quadrillage avec des grands carreaux.
   *
   * Pour une sortie LaTeX, il faut penser à ajouter scale = .8
   *
   * @param {integer} xmin
   * @param {integer} ymin
   * @param {integer} xmax
   * @param {integer} ymax
   * @author Rémi Angot
   */
export function seyes (...args) {
  return new Seyes(...args)
}
function PapierPointe ({
  xmin = -10,
  xmax = 10,
  ymin = -10,
  ymax = 10,
  xstep = 1,
  ystep = 1,
  type = 'quad',
  pointColor = 'black',
  pointRayon = 0.05,
  opacite = 1,
  opaciteDeRemplissage = 1
}) {
  ObjetMathalea2D.call(this, { })
  this.listeCoords = []
  const plots = []
  let xstep1, xstep2, ystep1, stepper
  switch (type) {
    case 'quad':
      for (let x = xmin; x <= xmax; x += xstep) {
        for (let y = ymin; y <= ymax; y += ystep) {
          plots.push(plot(x, y, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
          this.listeCoords.push([x, y])
        }
      }
      break
    case 'hexa':
      stepper = false
      ystep1 = Math.min(xstep, ystep)
      xstep1 = 0.866 * ystep1
      xstep2 = 1.732 * ystep1
      for (let x = xmin; x <= xmax; x += xstep2) {
        for (let y = ymin; y <= ymax; y += 1.5 * ystep1) {
          stepper = !stepper
          if (stepper) {
            plots.push(plot(x, y, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            plots.push(plot(x + xstep1, y + ystep1 / 2, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            plots.push(plot(x + xstep1, y + ystep1 * 1.5, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            this.listeCoords.push([x, y], [x + xstep1, y + ystep1 / 2], [x + xstep1, y + ystep1 * 1.5])
          } else {
            plots.push(plot(x, y + ystep1 / 2, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            this.listeCoords.push([x, y + ystep1 / 2])
          }
        }
        stepper = !stepper
      }
      break
    case 'equi':
      stepper = false
      ystep1 = Math.min(xstep, ystep)
      xstep1 = 0.866 * ystep1
      xstep2 = 1.732 * ystep1
      for (let x = xmin; x <= xmax; x = x + xstep2) {
        for (let y = ymin; y <= ymax; y = y + 1.5 * ystep1) {
          stepper = !stepper
          if (stepper) {
            plots.push(plot(x, y, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            plots.push(plot(x, y + ystep1, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            plots.push(plot(x + xstep1, y + ystep1 / 2, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            plots.push(plot(x + xstep1, y + ystep1 * 1.5, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            this.listeCoords.push([x, y], [x, y + ystep1], [x + xstep1, y + ystep1 / 2], [x + xstep1, y + ystep1 * 1.5])
          } else {
            plots.push(plot(x + xstep1, y + ystep1, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            plots.push(plot(x, y + ystep1 / 2, { rayon: pointRayon, couleur: pointColor, opacite: opacite, couleurDeRemplissage: '', opaciteDeRemplissage: opaciteDeRemplissage }))
            this.listeCoords.push([x + xstep1, y + ystep1], [x, y + ystep1 / 2])
          }
        }
        stepper = !stepper
      }
      break
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of plots) {
      code += objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of plots) {
      code += objet.tikz()
    }
    return code
  }
}

export function papierPointe ({
  xmin = -10,
  xmax = 10,
  ymin = -10,
  ymax = 10,
  xstep = 1,
  ystep = 1,
  type = 'quad',
  pointColor = 'black',
  pointRayon = 0.05,
  opacite = 0.4,
  opaciteDeRemplissage = 0.4
}) {
  return new PapierPointe({
    xmin: xmin,
    xmax: xmax,
    ymin: ymin,
    ymax: ymax,
    xstep: xstep,
    ystep: ystep,
    type: type,
    pointColor: pointColor,
    pointRayon: pointRayon,
    opacite: opacite,
    opaciteDeRemplissage: opaciteDeRemplissage
  })
}
