
import { context } from './context'

/*
  MathALEA2D
 @name      mathalea2d.js
 @author    Rémi Angot et Jean-Claude Lhote
 @license   MIT License - CC-BY-SA
 @homepage  https://coopmaths.fr/mathalea2d.html
 */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJET PARENT %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

let numId = 0 // Créer un identifiant numérique unique par objet SVG

/*
 * Classe parente de tous les objets de MathALEA2D
 *
 * @author Rémi Angot
 */
export function ObjetMathalea2D ({ classe = true }) {
  this.positionLabel = 'above'
  this.isVisible = true
  this.color = colorToLatexOrHTML('black')
  this.style = '' // stroke-dasharray="4 3" pour des hachures //stroke-width="2" pour un trait plus épais
  // this.styleTikz = ''
  this.epaisseur = 1
  this.opacite = 1
  this.pointilles = ''
  this.id = numId
  numId++
  if (classe) context.objets2D.push(this)
}

/**
 * mathalea2d(xmin,xmax,ymin,ymax,objets)
 *
 * @author Rémi Angot
 *
 *
 * Le paramètre optionsTikz est un tableau de strings contenant exclusivement des options Tikz à ajouter
 */
export function mathalea2d (
  { xmin = 0, ymin = 0, xmax = 15, ymax = 6, pixelsParCm = 20, scale = 1, zoom = 1, optionsTikz, mainlevee = false, amplitude = 1, style = 'display: block', id = '' } = {},
  ...objets
) {
  let code = ''
  if (context.isHtml) {
    code = `<svg class="mathalea2d" id="${id}" width="${(xmax - xmin) * pixelsParCm * zoom}" height="${(ymax - ymin) * pixelsParCm * zoom
      }" viewBox="${xmin * pixelsParCm} ${-ymax * pixelsParCm} ${(xmax - xmin) * pixelsParCm
      } ${(ymax - ymin) * pixelsParCm}" xmlns="http://www.w3.org/2000/svg" ${style ? `style="${style}"` : ''}>\n`
    for (const objet of objets) {
      if (Array.isArray(objet)) {
        for (let i = 0; i < objet.length; i++) {
          if (Array.isArray(objet[i])) { // EE : Test nécessaire pour les cubes 3d
            for (let j = 0; j < objet[i].length; j++) {
              try {
                if (objet[i][j].isVisible) {
                  if ((!mainlevee) || typeof (objet[i][j].svgml) === 'undefined') code += '\t' + objet[i][j].svg(pixelsParCm) + '\n'
                  else { code += '\t' + objet[i][j].svgml(pixelsParCm, amplitude) + '\n' }
                }
              } catch (error) { }
            }
          } else {
            try {
              if (objet[i].isVisible) {
                if ((!mainlevee) || typeof (objet[i].svgml) === 'undefined') code += '\t' + objet[i].svg(pixelsParCm) + '\n'
                else { code += '\t' + objet[i].svgml(pixelsParCm, amplitude) + '\n' }
              }
            } catch (error) { }// console.log('premiere boucle', error.message, objet[i], i) }
          }
        }
      } else {
        try {
          if (objet.isVisible) {
            if ((!mainlevee) || typeof (objet.svgml) === 'undefined') code += '\t' + objet.svg(pixelsParCm) + '\n'
            else { code += '\t' + objet.svgml(pixelsParCm, amplitude) + '\n' }
          }
        } catch (error) { console.log('le try tout seul', error.message, objet) }
      }
    }
    code += '\n</svg>'
    code = code.replace(/\\thickspace/gm, ' ')
    //  pixelsParCm = 20;
  } else {
    // si scale existe autre que 1 il faut que le code reste comme avant
    // sinon on ajoute scale quoi qu'il en soit quitte à ce que xscale et yscale viennent s'ajouter
    // de cette manière d'autres options Tikz pourront aussi être ajoutées
    // si il n'y a qu'une optionsTikz on peut passer un string
    const listeOptionsTikz = []
    if (optionsTikz !== undefined) {
      if (typeof optionsTikz === 'string') {
        listeOptionsTikz.push(optionsTikz)
      } else {
        optionsTikz.forEach(e => listeOptionsTikz.push(e))
      };
    }
    if (scale === 1) {
      // if (listeOptionsTikz.length==0) {
      //   code = `\\begin{tikzpicture}[baseline]\n`;
      // } else {
      code = '\\begin{tikzpicture}[baseline'
      for (let l = 0; l < listeOptionsTikz.length; l++) {
        code += `,${listeOptionsTikz[l]}`
      }
      code += ']\n'
      // }
    } else {
      // if (listeOptionsTikz.length==0) {
      //   code = `\\begin{tikzpicture}[baseline,scale = ${scale}]\n`;
      // } else {
      code = `\\begin{tikzpicture}[baseline,scale = ${scale}`
      for (let l = 0; l < listeOptionsTikz.length; l++) {
        code += `,${listeOptionsTikz[l]}`
      }
      code += ']\n'
      // }
    }

    code += `
    \\tikzset{
      point/.style={
        thick,
        draw,
        cross out,
        inner sep=0pt,
        minimum width=5pt,
        minimum height=5pt,
      },
    }
    \\clip (${xmin},${ymin}) rectangle (${xmax},${ymax});


    `
    // code += codeTikz(...objets)
    for (const objet of objets) {
      if (Array.isArray(objet)) {
        for (let i = 0; i < objet.length; i++) {
          try {
            if (objet[i].isVisible) {
              if (!mainlevee || typeof (objet[i].tikzml) === 'undefined') code += '\t' + objet[i].tikz(scale) + '\n'
              else code += '\t' + objet[i].tikzml(amplitude, scale) + '\n'
            }
          } catch (error) { }
        }
      }
      try {
        if (objet.isVisible) {
          if (!mainlevee || typeof (objet.tikzml) === 'undefined') code += '\t' + objet.tikz(scale) + '\n'
          else code += '\t' + objet.tikzml(amplitude, scale) + '\n'
        }
      } catch (error) { }
    }
    code += '\n\\end{tikzpicture}'
  }
  return code
}

class Vide2d {
  constructor (x, y) {
    this.bordures = [x, y, x, y]
    this.tikz = function () {
      return ''
    }
    this.svg = function () {
      return ''
    }
  }
}
export function vide2d (x = 0, y = 0) {
  return new Vide2d(x, y)
}

// NON UTILISEE - A SUPPRIMER ?
/*
 *
 * @param {url} url de l'image
 * @param {number} x tous ces nombres sont en pixels
 * @param {number} y Attention à l'orientation de l'axe SVG
 * @param {number} largeur
 * @param {number} hauteur
 *

function FondEcran (url, x, y, largeur, hauteur) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    return `<image xlink:href="${url}" x="${x}" y="${y}" height="${hauteur}" width="${largeur}" />`
  }
  this.tikz = function () {
    return `\\node[inner sep=0pt] at (${x},${y})
    {\\includegraphics[width= 15 cm]{${url}};`
  }
}

export function fondEcran (url, x = 0, y = 0, largeur = context.fenetreMathalea2d.xMax - context.fenetreMathalea2d.xMin, hauteur = context.fenetreMathalea2d.yMax - context.fenetreMathalea2d.yMin) {
  return new FondEcran(url, x, y, largeur, hauteur)
}
*/

/**
 * convertHexToRGB convertit une couleur en héxadécimal (sans le #) en un tableau RVB avec des valeurs entre 0 et 255.
 * @param {string} [Couleur='000000'] Code couleur HTML sans le #
 * @example convertHexToRGB('f15929')=[241,89,41]
 * @author Eric Elter
 * @return {number[]}
 */
// JSDOC Validee par EE Juin 2022
function convertHexToRGB (couleur = '000000') {
  const hexDecoupe = couleur.match(/.{1,2}/g)
  const hexToRGB = [
    parseInt(hexDecoupe[0], 16),
    parseInt(hexDecoupe[1], 16),
    parseInt(hexDecoupe[2], 16)
  ]
  return hexToRGB
}

/**
   * colorToLatexOrHTML prend en paramètre une couleur sous forme prédéfinie ('red','yellow',...) ou sous forme HTML en hexadécimal (avec #, genre '#f15929')
   * La sortie de cette fonction est un tableau où :
   * - le premier élément est cette couleur exploitable en SVG, donc en HTML.
   * - le second élément est cette couleur exploitable en TikZ, donc en Latex.
   * @param {string} couleur Une couleur du type 'blue' ou du type '#f15929'
   * @example colorToLatexOrHTML('red')=['red','{red}']
   * @example colorToLatexOrHTML('#f15929')=['#f15929','{rgb,255:red,241;green,89;blue,41}']
   * @example colorToLatexOrHTML('')=''
   * @example colorToLatexOrHTML('none')=['none','none']
   * @author Eric Elter
   * @return {string[]}
   */
// JSDOC Validee par EE Juin 2022
export function colorToLatexOrHTML (couleur) {
  const tabCouleur = []
  let rgb = []
  if (Array.isArray(couleur)) return couleur // Si jamais une fonction rappelle une couleur qui aurait déjà été transformée par cette même fonction
  else if (couleur === '') return ''
  else if (couleur === 'none') return ['none', 'none']
  else {
    tabCouleur[0] = couleur
    if (couleur[0] === '#') {
      rgb = convertHexToRGB(couleur.replace('#', ''))
      tabCouleur[1] = '{rgb,255:red,' + rgb[0] + ';green,' + rgb[1] + ';blue,' + rgb[2] + '}'
    } else {
      tabCouleur[1] = '{' + couleur + '}'
    }
    return tabCouleur
  }
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES FONCTIONS - FORMATAGE %%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * codeSvg(segment(A,B),polygone(D,E,F),labelPoints(A,B))
 *
 * @author Rémi Angot
 * @private
 */
// JSDOC Validee par EE Juin 2022
export function codeSvg (fenetreMathalea2d, pixelsParCm, mainlevee, ...objets) {
  let code = ''
  const fenetrexmin = fenetreMathalea2d[0]
  const fenetreymin = fenetreMathalea2d[3] * -(1)
  const fenetrexmax = fenetreMathalea2d[2]
  const fenetreymax = fenetreMathalea2d[1] * (-1)

  code = `<svg width="${(fenetrexmax - fenetrexmin) * pixelsParCm}" height="${(fenetreymax - fenetreymin) * pixelsParCm}" viewBox="${fenetrexmin * pixelsParCm} ${fenetreymin * pixelsParCm} ${(fenetrexmax - fenetrexmin) * pixelsParCm} ${(fenetreymax - fenetreymin) * pixelsParCm}" xmlns="http://www.w3.org/2000/svg">\n`
  for (const objet of objets) {
    if (Array.isArray(objet)) {
      for (let i = 0; i < objet.length; i++) {
        try {
          if (objet[i].isVisible) {
            if (!mainlevee || typeof (objet[i].svgml) === 'undefined') code += '\t' + objet[i].svg(pixelsParCm) + '\n'
            else {
              code += '\t' + objet[i].svgml(pixelsParCm, context.amplitude) + '\n'
            }
          }
        } catch (error) { }
      }
    }
    try {
      if (objet.isVisible) {
        if (!mainlevee || typeof (objet.svgml) === 'undefined') code += '\t' + objet.svg(pixelsParCm) + '\n'
        else code += '\t' + objet.svgml(pixelsParCm, context.amplitude) + '\n'
      }
    } catch (error) { }
  }
  code += '</svg>'
  return code
}

/**
 * codeTikz(segment(A,B),polygone(D,E,F),labelPoints(A,B))
 *
 * @author Rémi Angot
 * @private
 */
// JSDOC Validee par EE Juin 2022
export function codeTikz (fenetreMathalea2d, scale, mainlevee, ...objets) {
  let code = ''
  const fenetrexmin = fenetreMathalea2d[0]
  const fenetreymin = fenetreMathalea2d[3] * -(1)
  const fenetrexmax = fenetreMathalea2d[2]
  const fenetreymax = fenetreMathalea2d[1] * (-1)
  const sortie = context.isHtml
  // eslint-disable-next-line no-global-assign
  context.isHtml = false
  if (scale === 1) {
    code += '\\begin{tikzpicture}[baseline]\n'
  } else {
    code += `\\begin{tikzpicture}[baseline,scale = ${scale}]\n`
  }
  code += `\\tikzset{
    point/.style={
      thick,
      draw,
      cross out,
      inner sep=0pt,
      minimum width=5pt,
      minimum height=5pt,
    },
  }
  \\clip (${fenetrexmin},${fenetreymin}) rectangle (${fenetrexmax},${fenetreymax});

  \n\n`

  for (const objet of objets) {
    if (Array.isArray(objet)) {
      for (let i = 0; i < objet.length; i++) {
        try {
          if (objet[i].isVisible) {
            if (!mainlevee || typeof (objet[i].tikzml) === 'undefined') code += '\t' + objet[i].tikz(scale) + '\n'
            else code += '\t' + objet[i].tikzml(context.amplitude) + '\n'
          }
        } catch (error) { }
      }
    }
    try {
      if (objet.isVisible) {
        if (!mainlevee || typeof (objet.tikzml) === 'undefined') code += '\t' + objet.tikz(scale) + '\n'
        else code += '\t' + objet.tikzml(context.amplitude) + '\n'
      }
    } catch (error) { }
  }
  code += '\\end{tikzpicture}\n'
  // eslint-disable-next-line no-global-assign
  context.isHtml = sortie
  return code
}

/**
 * @param {number} rxmin marge à gauche 0.5 par défaut (peut être fixée à 0 si on veut)
 * @param {number} rxmax marge à droite 0.5 par défaut
 * @param {number} rymin marge en bas 0.5 par défaut (peut être fixée à 0 si on veut)
 * @param {number} rymax marge en haut 0.5 par défaut
 * @param {number} rzoom facteur multiplicatif des marges... implémenté en cas de problème avec le zoom ?
 * @param {object} objets // tableau contenant les objets à afficher
 * Les objets affichables doivent avoir un attribut this.bordures = [xmin, ymin, xmax, ymax] 4 nombres dans cet ordre.
 * Si this.bordures n'est pas défini ou n'est pas un tableau de 4 éléments, l'objet est ignoré
 * Si aucun objet passé en argument n'a de "bordures" alors la fonction retourne une zone inaffichable et un message d'erreur est créé
 * @return {object} {xmin, ymin, xmax, ymax}
 */
export function fixeBordures (objets, { rxmin = undefined, rymin = undefined, rxmax = undefined, rymax = undefined, rzoom = 1 } = {}) {
  let xmin = 1000; let ymin = 1000; let xmax = -1000; let ymax = -1000
  let bordures = false
  rxmin = rxmin !== undefined ? rxmin : -0.5
  rymin = rymin !== undefined ? rymin : -0.5
  rxmax = rxmax !== undefined ? rxmax : 0.5
  rymax = rymax !== undefined ? rymax : 0.5
  for (const objet of objets) {
    if (Array.isArray(objet.bordures) && objet.bordures.length === 4) {
      xmin = Math.min(xmin, objet.bordures[0])
      xmax = Math.max(xmax, objet.bordures[2])
      ymin = Math.min(ymin, objet.bordures[1])
      ymax = Math.max(ymax, objet.bordures[3])
      bordures = true
    }
  }
  if (!bordures) window.notify('fixeBordures : aucun objet ne définit de bordures valides', { ...objets })
  return { xmin: xmin + rxmin * rzoom, xmax: xmax + rxmax * rzoom, ymin: ymin + rymin * rzoom, ymax: ymax + rymax * rzoom }
}
