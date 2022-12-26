
import { context } from './context.js'

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
export function ObjetMathalea2D ({ classe = true } = {}) {
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
 * si scale existe autre que 1 il faut que le code reste comme avant
 * sinon on ajoute scale quoi qu'il en soit quitte à ce que xscale et yscale viennent s'ajouter
 * de cette manière d'autres options Tikz pourront aussi être ajoutées
 * si il n'y a qu'une optionsTikz on peut passer un string
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
      code = '\\begin{tikzpicture}[baseline'
      for (let l = 0; l < listeOptionsTikz.length; l++) {
        code += `,${listeOptionsTikz[l]}`
      }
      code += ']\n'
    } else {
      code = '\\begin{tikzpicture}[baseline'
      for (let l = 0; l < listeOptionsTikz.length; l++) {
        code += `,${listeOptionsTikz[l]}`
      }
      code += `,scale = ${scale}`
      code += ']\n'
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

/**
   * Convertit un code couleur en sa valeur hexadecimale
   * @param {string} color Une couleur du type 'blue' et uniquement de ce type
   * @example convertCodeCouleurToHex('beige')='#f5f5dc'
   * @author Eric Elter
   * @return {boolean||string} Retourne false si le code couleur ne peut pas être converti car non trouvé dans la liste
   */
// JSDOC Validee par EE Novembre 2022
export function convertCodeCouleurToHex (color) {
  const colours = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    'indianred ': '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
  }
  if (typeof colours[color.toLowerCase()] !== 'undefined') { return colours[color.toLowerCase()] }
  return false
}

/**
   * Assombrit ou éclaircit une couleur
   * @param {string} couleur Une couleur du type 'blue' ou du type '#f15929'
   * @param {number} coefficient Plus grand est un coefficient positif et plus on éclaircit. Plus petit est un coefficient négatif et plus on assombrit.
   * @example assombrirOuEclaircir('beige',20) renvoie une couleur beige plus claire.
   * @example assombrirOuEclaircir('f15929',-30) renvoie une couleur orange plus foncée.
   * @author Eric Elter
   * @return {string} Retourne le code hexadecimal de la nouvelle couleur
   */
// JSDOC Validee par EE Novembre 2022
export function assombrirOuEclaircir (couleur, coefficient) {
  const convertCodeCouleur = convertCodeCouleurToHex(couleur)
  if (convertCodeCouleur !== false) couleur = convertCodeCouleur
  couleur = couleur.replace('#', '')
  if (couleur.length === 6) {
    const decimalColor = parseInt(couleur, 16)
    let r = (decimalColor >> 16) + coefficient
    r > 255 && (r = 255)
    r < 0 && (r = 0)
    let g = (decimalColor & 0x0000ff) + coefficient
    g > 255 && (g = 255)
    g < 0 && (g = 0)
    let b = ((decimalColor >> 8) & 0x00ff) + coefficient
    b > 255 && (b = 255)
    b < 0 && (b = 0)
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`
  } else {
    return couleur
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
