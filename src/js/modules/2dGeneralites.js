/**
 * convertHexToRGB convertit une couleur en héxadécimal (sans le #) en un tableau RVB avec des valeurs entre 0 et 255.
 * @param {string} [Couleur='000000'] Code couleur HTML sans le #
 * @example convertHexToRGB('f15929')=[241,89,41]
 * @author Eric Elter
 * @return {number[]}
 */

import { context } from './context'

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
