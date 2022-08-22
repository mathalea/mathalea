/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES LUTINS %%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { angleModulo, point } from './2d.js'
import { colorToLatexOrHTML, ObjetMathalea2D } from './2dGeneralites.js'
import { context } from './context.js'
import { radians } from './fonctionsMaths.js'

/**
 * Renvoie la mesure d'angle (entre -180° et 180°) dans le cercle trigonométrique à partir d'une mesure d'angle donnée en degrés, qu'utilise Scratch.
 * Parce que le 0 angulaire de Scratch est dirigé vers le Nord et qu'il croît dans le sens indirect
 * @param {number} x Angle Scratch
 * @example x=angleScratchTo2d(0) // x=90
 * @example x=angleScratchTo2d(90) // x=0
 * @example x=angleScratchTo2d(-90) // x=180
 * @example x=angleScratchTo2d(-120) // x=-150
 * @return {angleModulo}
 */
// JSDOC Validee par EE Juin 2022
export function angleScratchTo2d (x) {
  const angle2d = 90 - x
  return angleModulo(angle2d)
}

function ObjetLutin () {
  ObjetMathalea2D.call(this, { })
  this.x = 0
  this.y = 0
  this.xMin = 0
  this.xMax = 0
  this.yMin = 0
  this.yMax = 0
  this.xSVG = function (coeff) {
    return this.x * coeff
  }
  this.ySVG = function (coeff) {
    return -this.y * coeff
  }
  this.orientation = 0
  this.historiquePositions = []
  this.crayonBaisse = false
  this.isVisible = true
  this.costume = ''
  this.listeTraces = [] // [[x0,y0,x1,y1,style]...]
  this.color = colorToLatexOrHTML('black')
  this.epaisseur = 2
  this.pointilles = ''
  this.opacite = 1
  this.style = ''
  this.animation = ''
  this.svg = function (coeff) {
    let code = ''
    for (const trace of this.listeTraces) {
      const A = point(trace[0], trace[1])
      const B = point(trace[2], trace[3])
      const color = colorToLatexOrHTML(trace[4])
      const epaisseur = trace[5]
      const pointilles = trace[6]
      const opacite = trace[7]
      let style = ''
      if (epaisseur !== 1) {
        style += ` stroke-width="${epaisseur}" `
      }
      if (pointilles) {
        style += ' stroke-dasharray="4 3" '
      }
      if (opacite !== 1) {
        style += ` stroke-opacity="${opacite}" `
      }
      code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${B.xSVG(coeff)}" y2="${B.ySVG(coeff)}" stroke="${color[0]}" ${style}  />`
    }
    if (this.isVisible && this.animation !== '') {
      code += '\n <g>' + this.animation + '</g>'
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const trace of this.listeTraces) {
      const A = point(trace[0], trace[1])
      const B = point(trace[2], trace[3])
      const color = colorToLatexOrHTML(trace[4])
      const epaisseur = trace[5]
      const pointilles = trace[6]
      const opacite = trace[7]
      let optionsDraw = []
      const tableauOptions = []
      if (color[1].length > 1 && color[1] !== 'black') {
        tableauOptions.push(`color =${color[1]}`)
      }
      if ((!isNaN(epaisseur)) && epaisseur !== 1) {
        tableauOptions.push(`line width = ${epaisseur}`)
      }
      if ((!isNaN(opacite)) && opacite !== 1) {
        tableauOptions.push(`opacity = ${opacite}`)
      }
      if (pointilles) {
        tableauOptions.push('dashed')
      }
      if (tableauOptions.length > 0) {
        optionsDraw = '[' + tableauOptions.join(',') + ']'
      }
      code += `\n\t\\draw${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`
    };
    return code
  }
}
/**
   * Crée une nouvelle instance de l'objet lutin
   * @param  {...any} args En fait, il n'y a pas d'argument... il faudra les renseigner après la création de l'objet.
   * Voire l'objet lutin pour la liste de ses attributs (lutin.x, lutin.y, lutin.orientation, ...)
   * @returns {object} Instance d'un lutin
   */
export function creerLutin (...args) {
  return new ObjetLutin(...args)
}

/**
   * Fait avancer le lutin de d unités de lutin dans la direction de son orientation
   * @param {number} d Nombre d'unités choisi pour avancer
   * @param {ObjetLutin} lutin Lutin
   * @example avance(5, lutin) // Fait avancer le lutin de 5 unités
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Juin 2022
export function avance (d, lutin = context.lutin) { // A faire avec pointSurCercle pour tenir compte de l'orientation
  const xdepart = lutin.x
  const ydepart = lutin.y
  lutin.x = lutin.x + d / context.unitesLutinParCm * Math.cos(radians(lutin.orientation))
  lutin.y = lutin.y + d / context.unitesLutinParCm * Math.sin(radians(lutin.orientation))
  lutin.historiquePositions.push([lutin.x, lutin.y])
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, ydepart, lutin.x, lutin.y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.xMin = Math.min(lutin.xMin, lutin.x)
  lutin.yMin = Math.min(lutin.yMin, lutin.y)
  lutin.xMax = Math.max(lutin.xMax, lutin.x)
  lutin.yMax = Math.max(lutin.yMax, lutin.y)
}

/**
   * Fait entrer le lutin dans le mode "trace"
   * @param {ObjetLutin} lutin
   * @example baisseCrayon(lutin) // Met lutin en mode "trace"
   */
export function baisseCrayon (lutin = context.lutin) {
  lutin.crayonBaisse = true
}
/**
   * Fait sortir le lutin du mode "trace"
   * @param {ObjetLutin} lutin
   * @example leveCrayon(lutin) // Sort lutin du mode "trace"
   */
// JSDOC Validee par EE Juin 2022
export function leveCrayon (lutin = context.lutin) {
  lutin.crayonBaisse = false
}
/**
   * Fixe l'orientation du lutin à a degrés (au sens Mathalea2d=trigo)
   * Voire la fonction angleScratchTo2d(angle_scratch) pour la conversion
   * @param {number} a
   * @param {ObjetLutin} lutin
   */
export function orienter (a, lutin = context.lutin) {
  lutin.orientation = angleModulo(a)
}
/**
   * Fait tourner de a degrés le lutin dans le sens direct
   * @param {number} a
   * @param {ObjetLutin} lutin
   */
export function tournerG (a, lutin = context.lutin) {
  lutin.orientation = angleModulo(lutin.orientation + a)
}
/**
   * Fait tourner de a degrés le lutin dans le sens indirect
   * @param {number} a
   * @param {ObjetLutin} lutin
   */
export function tournerD (a, lutin = context.lutin) {
  lutin.orientation = angleModulo(lutin.orientation - a)
}
/**
   * Déplace le lutin de sa position courante à (x;y)
   * @param {number} x Nouvelle abscisse
   * @param {number} y Nouvelle ordonnée
   * @param {ObjetLutin} lutin Lutin
   * @example allerA(10,-5,lutin) // Le lutin prend pour coordonnées (10 ; -5).
   */
// JSDOC Validee par EE Juin 2022
export function allerA (x, y, lutin = context.lutin) {
  const xdepart = lutin.x
  const ydepart = lutin.y
  lutin.x = x / context.unitesLutinParCm
  lutin.y = y / context.unitesLutinParCm
  lutin.historiquePositions.push([lutin.x, lutin.y])
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, ydepart, lutin.x, lutin.y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.xMin = Math.min(lutin.xMin, lutin.x)
  lutin.yMin = Math.min(lutin.yMin, lutin.y)
  lutin.xMax = Math.max(lutin.xMax, lutin.x)
  lutin.yMax = Math.max(lutin.yMax, lutin.y)
}
/**
   * Change en x à l'abscisse du lutin
   * @param {number} x Nouvelle abscisse
   * @param {ObjetLutin} lutin Lutin
   * @example mettrexA(10,lutin) // L'abscisse de lutin devient 10.
   */
export function mettrexA (x, lutin = context.lutin) {
  const xdepart = lutin.x
  lutin.x = x / context.unitesLutinParCm
  lutin.historiquePositions.push([lutin.x, lutin.y])
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, lutin.y, lutin.x, lutin.y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.xMin = Math.min(lutin.xMin, lutin.x)
  lutin.xMax = Math.max(lutin.xMax, lutin.x)
}
/**
   * change en y l'ordonnée du lutin
   * @param {number} y Nouvelle ordonnée
   * @param {ObjetLutin} lutin Lutin
   * @example mettreyA(10,lutin) // L'ordonnée de lutin devient 10.
   */
export function mettreyA (y, lutin = context.lutin) {
  const ydepart = lutin.y
  lutin.y = y / context.unitesLutinParCm
  lutin.historiquePositions.push([lutin.x, lutin.y])
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([lutin.x, ydepart, lutin.x, lutin.y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.yMin = Math.min(lutin.yMin, lutin.y)
  lutin.yMax = Math.max(lutin.yMax, lutin.y)
}
/**
   * Ajoute x à l'abscisse du lutin
   * @param {number} x Valeur à ajouter à l'abscisse
   * @param {ObjetLutin} lutin Lutin
   * @example ajouterAx(10,lutin) // L'abscisse de lutin est augmentée de 10.
   */
// JSDOC Non Validee EE Juin 2022 (impossible à tester car non utilisée)
export function ajouterAx (x, lutin = context.lutin) {
  const xdepart = lutin.x
  lutin.x += x / context.unitesLutinParCm
  lutin.historiquePositions.push([lutin.x, lutin.y])
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([xdepart, lutin.y, lutin.x, lutin.y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.xMin = Math.min(lutin.xMin, lutin.x)
  lutin.xMax = Math.max(lutin.xMax, lutin.x)
}
/**
   * Ajoute y à l'ordonnée du lutin
   * @param {number} y Valeur à ajouter à l'ordonnée
   * @param {ObjetLutin} lutin Lutin
   * @example ajouterAy(10,lutin) // L'ordonnée de lutin est augmentée de 10.
   */
// JSDOC Non Validee EE Juin 2022 (impossible à tester car non utilisée)
export function ajouterAy (y, lutin = context.lutin) {
  const ydepart = lutin.y
  lutin.y += y / context.unitesLutinParCm
  lutin.historiquePositions.push([lutin.x, lutin.y])
  if (lutin.crayonBaisse) {
    lutin.listeTraces.push([lutin.x, ydepart, lutin.x, lutin.y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.yMin = Math.min(lutin.yMin, lutin.y)
  lutin.yMax = Math.max(lutin.yMax, lutin.y)
}

/**
   * Fait "vibrer" le lutin, tempo fois autour de sa position courante
   * @param {number} tempo Nombre de vibrations
   * @param {ObjetLutin} lutin Lutin
   * @example attendre(5, lutin) // Fait "vibrer" 5 fois le lutin
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Juin 2022
export function attendre (tempo, lutin = context.lutin) {
  const x = lutin.x; const y = lutin.y
  lutin.listeTraces.push([x, y, x + 0.08, y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  for (let i = 0; i < tempo; i++) {
    lutin.listeTraces.push([x + 0.08, y, x + 0.08, y + 0.08, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
    lutin.listeTraces.push([x + 0.08, y + 0.08, x - 0.08, y + 0.08, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
    lutin.listeTraces.push([x + 0.08, y + 0.08, x - 0.08, y + 0.08, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
    lutin.listeTraces.push([x - 0.08, y + 0.08, x - 0.08, y - 0.08, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
    lutin.listeTraces.push([x - 0.08, y - 0.08, x + 0.08, y - 0.08, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
    lutin.listeTraces.push([x + 0.08, y - 0.08, x + 0.08, y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
  }
  lutin.listeTraces.push([x + 0.03, y, x, y, lutin.color, lutin.epaisseur, lutin.pointilles, lutin.opacite])
}

/**
 * fork de https://javascript.developpez.com/actu/94357/JavaScript-moins-Realiser-une-copie-parfaite-d-objet/
 * Ne fonctionne pas complètement : ne copie pas les méthodes svg et tikz...
 * @param {ObjetMathalea2D} originalObject
 * @returns {object} copie de cet objet.
 */
export function clone (obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Array) {
    const copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i])
    }
    return copy
  }
  if (obj instanceof Object) {
    const copy = {}
    for (const attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = clone(obj[attr])
    }
    return copy
  }
  throw new Error('Unable to copy obj this object.')
}
