/* global $ */
/* eslint-disable camelcase */
import { calcul, texNombrec, texFractionSigne, stringNombre } from './outils.js'
import katex from 'katex'
import { SVG } from '@svgdotjs/svg.js'
import { context } from './context.js'

/**
 * Trace un axe vertical gradué
 * @param {string} mon_svg l'id du svg
 * @param {number} start ordonnée du début de l'axe en pixels (end-start=longueur del'axe)
 * @param {number} end ordonnée de fin del'axe en pixels
 * @param {number} absO position en abscisse de l'axe en pixels
 * @param {number} DeltaY Nombre entier de graduations à faire sur la longueur de l'axe.
 * @author Jean-Claude Lhote
 */
export function SVG_Axe_vertical (mon_svg, start, end, absO, DeltaY, subY) {
  const droite = mon_svg.line(absO, start + 2, absO, end)
  droite.stroke({ color: 'black', width: 2, linecap: 'round' })
  for (let i = 0; i < DeltaY; i++) {
    const line = mon_svg.line(absO - 2, (DeltaY - i) * ((end - start) / DeltaY), absO + 2, (DeltaY - i) * ((end - start) / DeltaY))
    line.stroke({ color: 'black', width: 2, linecap: 'round' })
    if (subY != 1) {
      for (let k = 1; k < subY; k++) {
        const line = mon_svg.line(absO - 2, ((end - start) / DeltaY) * (DeltaY - i - k / subY), absO + 2, ((end - start) / DeltaY) * (DeltaY - i - k / subY))
        line.stroke({ color: 'black', width: 1, linecap: 'round' })
      }
    }
  }
}
/**
   * Trace un axe horizontal gradué
   * @param {string} mon_svg l'id du svg
   * @param {number} start abscisse du début de l'axe en pixels (end-start=longueur del'axe)
   * @param {number} end abscisse de fin del'axe en pixels
   * @param {number} absO position en ordonnée de l'axe en pixels
   * @param {number} DeltaX Nombre entier de graduations à faire sur la longueur de l'axe.
   * @author Jean-Claude Lhote
   */
export function SVG_Axe_horizontal (mon_svg, start, end, ordO, DeltaX, subX) {
  const droite = mon_svg.line(start, ordO, end - 2, ordO)
  droite.stroke({ color: 'black', width: 2, linecap: 'round' })
  for (let i = 1; i <= DeltaX; i++) {
    const line = mon_svg.line(start + (DeltaX - i) * ((end - start) / DeltaX), ordO - 2, start + (DeltaX - i) * ((end - start) / DeltaX), ordO + 2)
    line.stroke({ color: 'black', width: 2, linecap: 'round' })
    if (subX != 1) {
      for (let k = 1; k < subX; k++) {
        const line = mon_svg.line(start + (DeltaX - i + k / subX) * ((end - start) / DeltaX), ordO - 2, start + (DeltaX - i + k / subX) * ((end - start) / DeltaX), ordO + 2)
        line.stroke({ color: 'black', width: 1, linecap: 'round' })
      }
    }
  }
}

/**
   * Place une grille de points dans un repère au sein d'un SVG
   * @param {string} mon_svg  l'id du svg
   * @param {number} absO abscisse du point de départ de la grille (normalement 0)
   * @param {number} ordO ordonnée du point de départ de la grille (normalement 0)
   * @param {number} tailleX largeur totale de la grille en pixels
   * @param {number} tailleY hauteur totale de la grille en pixels
   * @param {number} DeltaX nombre de graduations horizontales
   * @param {number} DeltaY nombre de graduations verticales
   * @param {number} subX coefficient de fractionnement de la grille en abscisse
   * @param {number} subY coefficient de fractionnement de la grille en ordonéée
   * @author Jean-Claude Lhote
   */
export function SVG_grille (mon_svg, absO, ordO, tailleX, tailleY, DeltaX, DeltaY, subX, subY) {
  let line_grille
  for (let i = 0; i <= DeltaX; i++) {
    line_grille = mon_svg.line(absO + i * (tailleX / DeltaX), 0, absO + i * (tailleX / DeltaX), tailleY)
    line_grille.stroke({ color: 'lightgray', width: 1 })
  }
  for (let i = 0; i < DeltaX; i++) {
    if (subX != 1) {
      for (let k = 0; k < subX; k++) {
        line_grille = mon_svg.line(absO + i * (tailleX / DeltaX) + k * (tailleX / DeltaX / subX), 0, absO + i * (tailleX / DeltaX) + k * (tailleX / DeltaX / subX), tailleY)
        line_grille.stroke({ color: 'lightgray', width: 0.5, linecap: 'round' })
      }
    }
  }
  for (let j = 0; j <= DeltaY; j++) {
    line_grille = mon_svg.line(20, ordO + j * (tailleY / DeltaY), 20 + tailleX, ordO + j * (tailleY / DeltaY))
    line_grille.stroke({ color: 'lightgray', width: 1 })
  }
  for (let j = 0; j < DeltaY; j++) {
    if (subY != 1) {
      for (let l = 0; l < subY; l++) {
        line_grille = mon_svg.line(20, ordO + j * (tailleY / DeltaY) + l * (tailleY / DeltaY / subY), 20 + tailleX, ordO + j * (tailleY / DeltaY) + l * (tailleY / DeltaY / subY))
        line_grille.stroke({ color: 'lightgray', width: 0.5, linecap: 'round' })
      }
    }
  }
}

/** Trace une graduation sur le SVG
  * @param mon_svg Objet SVG
  * @param origine abscisse en pixel de la première graduation
  * @param pas distance en pixels entre deux graduations
  * @param derniere_graduation abscisse limite en pixel
  * @param taille taille verticale
  * @param y ordonnée de la droite
  * @param couleur couleur de la graduation
  * @param width largeur de la graduation
  * @author Rémi Angot
  */
export function SVG_graduation (mon_svg, origine, pas, derniere_graduation, taille = 10, y = 50, couleur = 'black', width = 5) {
  for (let i = origine; i < derniere_graduation; i += pas) {
    const line = mon_svg.line(i, y - taille / 2, i, y + taille / 2)
    line.stroke({ color: couleur, width: width, linecap: 'round' })
  }
}

/**
   * Ecris des nombres ou des textes à une position donnée dans un SVG
   * @param {array} liste_d_abscisses [[nombre à écrire,abscisse,ordonnée]]
   * @param {number} y leading pour position du texte sur la ligne
   * @param {string} couleur couleur du nombre
   * @param {number} opacite valeur d'opacité entre 0 et 1
   * @author Rémi Angot
   */
export function SVG_label (mon_svg, liste_d_abscisses, y, couleur, opacite) {
  'use strict'
  for (let i = 0; i < liste_d_abscisses.length; i++) {
    let text
    if (typeof liste_d_abscisses[i][0] === 'number') text = mon_svg.text((liste_d_abscisses[i][0]).toString())
    else text = mon_svg.text(liste_d_abscisses[i][0])
    y = parseInt(y)
    text.move(liste_d_abscisses[i][1], liste_d_abscisses[i][2]).font({
      fill: couleur,
      family: 'Helvetica',
      size: 14,
      anchor: 'middle',
      leading: y,
      opacity: opacite
    })
  }
}
/**
   * Ecris une fraction dans un SVG
   * @param {any} mon_svg l'Id du SVG
   * @param {number} num le numérateur de la fraction
   * @param {number} den le dénominateur de la fraction
   * @param {number} x l'abscisse de sa position
   * @param {number} y l'ordonnée de sa position
   * @param {string} couleur la couleur de la fraction
   * @author Rémi Angot
   */
export function SVG_fraction (mon_svg, num, den, x, y, couleur) {
  'use strict'
  const longueur = num.toString().length
  const line = mon_svg.line(x - longueur * 5, y - 7, x + longueur * 5, y - 7)
  line.stroke({ color: couleur, width: 2, linecap: 'round' })
  const num_text = mon_svg.text(num.toString()).attr({ x: x, y: y - 10 })
  num_text.font({
    fill: couleur,
    family: 'Helvetica',
    size: 20,
    anchor: 'middle',
    leading: 0
  })
  const den_text = mon_svg.text(den.toString()).attr({ x: x, y: y + 10 })
  den_text.font({
    fill: couleur,
    family: 'Helvetica',
    size: 20,
    anchor: 'middle',
    leading: 0
  })
}

/**
   *
   * @param {any} mon_svg L'id du SVG
   * @param {number} x l'abscisse du point
   * @param {number} y l'ordonnée du point
   * @param {string} nom le nom du point
   * @param {string} couleur la couleur du point
   * @param {number} shiftxnom décallage en abscisse pour le nom du point
   * @param {number} shiftynom décallage en ordonnée pour le nom du point
   * @param {array} montrer_coord cas 1 : [false] rien n'est ajouté, cas 2 : [true, absAxeX, ordAxeY] trace des flèches jusqu'aux axes
   * @author Rémi Angot et Jean-Claude Lhote
   */
export function SVG_tracer_point (mon_svg, x, y, nom, couleur, shiftxnom, shiftynom, montrer_coord) {
  // creer un groupe pour la croix
  const point = mon_svg.group()
  const c1 = point.line(-3, 3, 3, -3)
  c1.stroke({ color: couleur, width: 2, linecap: 'round', opacity: 1 })
  const c2 = point.line(-3, -3, 3, 3)
  c2.stroke({ color: couleur, width: 2, linecap: 'round', opacity: 1 })
  // déplace la croix
  point.move(x - 3, y - 3)
  // point.dmove(-3,-3)
  const text = mon_svg.text(nom).attr({ x: x + shiftxnom, y: y + shiftynom, fill: couleur, opacity: 0.7 })
  // ecrit le nom
  text.font({
    color: couleur,
    'font-weight': 'bolder',
    family: 'Helvetica',
    size: 14,
    anchor: 'middle',
    leading: -1
  })
  if (montrer_coord[0]) { // montrer_coord=[true,abs_axe,ord_axe] ou [false]
    if ((y != montrer_coord[2]) && (x != montrer_coord[1])) SVG_tracer_droite_flecheV(mon_svg, x, y, x, montrer_coord[2], couleur, 3)
    if ((x != montrer_coord[1]) && (y != montrer_coord[2])) SVG_tracer_droite_flecheH(mon_svg, x, y, montrer_coord[1], y, couleur, 3)
  }
}

/**
   * Trace une flèche dans le SVG pour une demi-droite graduée
   * @param {any} mon_svg l'identifiant du SVG
   * @param {number} x l'abscisse de la pointe
   * @param {number} y l'ordonnée de la pointe
   * @author Rémi Angot
   */
function SVG_tracer_flecheH (mon_svg, x, y) {
  // creer un groupe pour la fleche
  const fleche = mon_svg.group()
  const c1 = fleche.line(x - 5, y - 5, x, y)
  c1.stroke({ color: 'black', width: 3, linecap: 'round' })
  const c2 = fleche.line(x - 5, y + 5, x, y)
  c2.stroke({ color: 'black', width: 3, linecap: 'round' })
}
/**
   *
   * @param {string} mon_svg l'identifiant du SVG
   * @param {number} x l'abscisse de la pointe de la flèche
   * @param {number} y l'ordonnée de la pointe de la flèche
   * @author Jean-Claude Lhote
   */
export function SVG_tracer_flecheV (mon_svg, x, y) {
  // creer un groupe pour la fleche
  const fleche = mon_svg.group()
  const c1 = fleche.line(-5, 5, 0, 0)
  c1.stroke({ color: 'black', width: 3, linecap: 'round' })
  const c2 = fleche.line(5, 5, 0, 0)
  c2.stroke({ color: 'black', width: 3, linecap: 'round' })
  // déplace la croix
  fleche.move(x, y)
  fleche.dmove(-5, 5)
}

/**
   *
   * @param {string} mon_svg l'identifiant du SVG
   * @param {number} x1 (x1,y1)=point de départ de la flèche verticale (x1=x2 en général)
   * @param {number} y1
   * @param {number} x2 (x2,y2)=point d'arrivée de la flèche
   * @param {number} y2
   * @param {string} couleur couleur de la flèche
   * @param {number} pointilles longueur des pointillés et des espaces entre les pointillés
   * @author Jean-Claude Lhote
   */
export function SVG_tracer_droite_flecheV (mon_svg, x1, y1, x2, y2, couleur, pointilles) {
  const fleche = mon_svg.group()
  const c1 = fleche.line(x1, y1, x2, y2)
  c1.stroke({ color: couleur, width: 1, linecap: 'round', dasharray: pointilles, opacity: 0.5 })
  if (y2 < y1) {
    const c2 = fleche.line(x2 - 3, y2 + 5, x2, y2)
    c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
    const c3 = fleche.line(x2 + 3, y2 + 5, x2, y2)
    c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
  } else {
    const c2 = fleche.line(x2 - 3, y2 - 5, x2, y2)
    c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
    const c3 = fleche.line(x2 + 3, y2 - 5, x2, y2)
    c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
  }
}

/**
   *
   * @param {string} mon_svg l'identifiant du SVG
   * @param {number} x1 (x1,y1)=point de départ de la flèche horizontale (y1=y2 en général)
   * @param {number} y1
   * @param {number} x2 (x2,y2)=point d'arrivée de la flèche
   * @param {number} y2
   * @param {string} couleur couleur de la flèche
   * @param {number} pointilles longueur des pointillés et des espaces entre les pointillés
   * @author Jean-Claude Lhote
   */
export function SVG_tracer_droite_flecheH (mon_svg, x1, y1, x2, y2, couleur, pointilles) {
  const fleche = mon_svg.group()
  const c1 = fleche.line(x1, y1, x2, y2)
  c1.stroke({ color: couleur, width: 1, linecap: 'round', dasharray: pointilles, opacity: 0.5 })
  if (x2 < x1) {
    const c2 = fleche.line(x2 + 5, y2 + 3, x2, y2)
    c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
    const c3 = fleche.line(x2 + 5, y2 - 3, x2, y2)
    c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
  } else {
    const c2 = fleche.line(x2 - 5, y2 + 3, x2, y2)
    c2.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
    const c3 = fleche.line(x2 - 5, y2 - 3, x2, y2)
    c3.stroke({ color: couleur, width: 1, linecap: 'round', opacity: 0.5 })
  }
}

/**
  * Trace une graduation sur le SVG
  * @param origine la première abscisse de la droite ou demi-droite
  * @param longueur le nombre d'intervalles entre l'origine et la dernière graduation
  * @param pas1 le fractionnement de l'unité utilisé : 10 pour 0,1 ; 2 pour 0,5 ...
  * @param pas2 Idem pas1 pour la petite graduation
  * @param points_inconnus tableau tableau [Nom,nb_pas1,nb_pas2,affiche_ou_pas]
  * @param points_connus tableau [valeur,nb_pas1,nb_pas2]
  * @param fraction booléen : true pour fractions, false pour décimaux
  * @author Jean-Claude Lhote
  */
export function SvgReperageSurUnAxe (id_du_div, origine, longueur, pas1, pas2, points_inconnus, points_connus, fraction) {
  let arrondir = 1 + Math.round(Math.log10(pas1))
  if (arrondir < 1) arrondir = 1
  const longueur_pas1 = 600 / longueur
  const longueur_pas2 = 600 / longueur / pas2
  let distance, valeur, nom
  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 800, 150).size('100%', '100%')
      // Droite
      const droite = mon_svg.line(100, 50, 750, 50)
      droite.stroke({ color: 'black', width: 2, linecap: 'round' })
      // Graduation secondaire
      SVG_graduation(mon_svg, 100, longueur_pas2, 750, 5, 50, 'black', 2)
      // Graduation principale
      SVG_graduation(mon_svg, 100, longueur_pas1, 750, 10, 50, 'black', 5)
      SVG_tracer_flecheH(mon_svg, 750, 50)
      // Nombres visibles
      SVG_label(mon_svg, [[stringNombre(origine), 100, 50]], 2, 'black', 1)
      for (let i = 0; i < points_connus.length; i++) {
        valeur = stringNombre(points_connus[i][0])
        distance = calcul(longueur_pas1 * points_connus[i][1] + longueur_pas2 * points_connus[i][2])
        SVG_label(mon_svg, [[valeur, 100 + distance, 50]], 2, 'black', 1)
      }
      // Points inconnus
      let position = 1
      for (let i = 0; i < points_inconnus.length; i++) {
        distance = longueur_pas1 * points_inconnus[i][1] + longueur_pas2 * points_inconnus[i][2]
        nom = points_inconnus[i][0]
        SVG_tracer_point(mon_svg, 100 + distance, 50, nom, '#f15929', 0, 0, [false])
        if (points_inconnus[i][3] == true) {
          if (!fraction) { // affichage décimal
            valeur = stringNombre(calcul(origine + points_inconnus[i][1] / pas1 + points_inconnus[i][2] / pas1 / pas2))
            SVG_label(mon_svg, [[valeur, 100 + distance, 50]], 3 + position, '#f15929', 1)
            SVG_tracer_droite_flecheV(mon_svg, 100 + distance, 75 + 15 * position, 100 + distance, 55, '#f15929', 3)
          } else { // affichage fractionnaire
            SVG_fraction(mon_svg, (origine + points_inconnus[i][1]) * pas2 + points_inconnus[i][2], pas2, 100 + distance, 115 + 15 * position, '#f15929')
            SVG_tracer_droite_flecheV(mon_svg, 100 + distance, 80 + 15 * position, 100 + distance, 55, '#f15929', 3)
          }
          position = 1 - position
        }
      }
      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}

/**
  * Trace un axe gradué horizontal avec des points placés dessus en Latex
  * @param origine la première abscisse de la droite ou demi-droite
  * @param pas1 le fractionnement de l'unité utilisé : 10 pour 0,1 ; 2 pour 0,5 ...
  * @param pas2 Idem pas1 pour la petite graduation
  * @param points_inconnus tableau tableau [Nom,nb_pas1,nb_pas2,affiche_ou_pas]
  * @param points_connus tableau [valeur,nb_pas1,nb_pas2]
  * @param fraction booléen : true pour fraction, false pour décimaux
  * @author Jean-Claude Lhote
  */
export function LatexReperageSurUnAxe (zoom, origine, pas1, pas2, points_inconnus, points_connus, fraction) {
  'use strict'
  let result = `\\begin{tikzpicture}[scale=${zoom}]`
  let valeur
  let decalage

  result += `\n\t \\tkzInit[xmin=${origine},xmax=${calcul(origine + 7 / pas1)},ymin=-0.5,ymax=0.5,xstep=${calcul(1 / pas1)}]`

  if (origine == 0) result += '\n\t \\tkzDrawX[tickwd=2pt,label={}];'
  else result += '\n\t \\tkzDrawX[left space=0.2,tickwd=2pt,label={}];'
  result += '\n\t \\tikzset{arr/.style={postaction=decorate,	decoration={markings,mark=at position 1 with {\\arrow[thick]{#1}}}}}'

  if (origine < 0) decalage = origine * pas1
  else decalage = 0
  result += `\n\t \\foreach \\x in {0,${calcul(1 / pas2)},...,7}`
  result += `\n\t {\\draw (${decalage}+\\x,-0.05)--(${decalage}+\\x,0.05);}` // result+=`\n\t {\\draw (${origine*pas1}+\\x,-0.05)--(${origine*pas1}+\\x,0.05);}`

  for (let i = 0; i < points_connus.length; i++) {
    valeur = calcul(origine + points_connus[i][1] / pas1 + calcul(points_connus[i][2] / pas1 / pas2))
    result += `\n\t \\tkzDefPoint(${valeur},0){A}`
    result += `\n\t \\tkzLabelPoint[color = black,below,inner sep = 5pt,font=\\scriptsize](A){$${texNombrec(valeur)}$}`
  }
  // Points inconnus
  let position = 6
  for (let i = 0; i < points_inconnus.length; i++) {
    valeur = calcul(origine + points_inconnus[i][1] / pas1 + calcul(points_inconnus[i][2] / pas1 / pas2))
    result += `\n\t \\tkzDefPoint(${valeur},0){A}`
    result += `\n\t \\tkzDefPoint(${valeur},-0.3-${position * 0.02}){B}`
    result += '\n\t \\tkzDrawPoint[shape=cross out,color=blue,size=8](A)'
    result += `\n\t \\tkzLabelPoint[above](A){$${points_inconnus[i][0]}$}`
    if (points_inconnus[i][3]) {
      if (!fraction) { // affichage décimal
        result += `\n\t \\tkzLabelPoint[color = blue,below=${15 + position}pt,inner sep = 5pt,font=\\scriptsize](A){$${texNombrec(valeur)}$}`
        result += '\n\t \\tkzDrawSegment[color=blue,arr=stealth](B,A)'
      } else { // affichage fractionnaire
        result += `\n\t \\tkzLabelPoint[color = blue,below=${15 + position}pt,inner sep = 5pt,font=\\scriptsize](A){$${texFractionSigne((origine + points_inconnus[i][1]) * pas2 + points_inconnus[i][2], pas2)}$}`
        result += '\n\t \\tkzDrawSegment[color=blue,arr=stealth](B,A)'
      }
    }
    position = 6 - position
  }
  result += '\n\t \\end{tikzpicture}'
  return result
}

/**
 * Renvoie deux engrenages en HTML pour le moment
 * @param {string} id_du_div id unique pour éviter les doublons, généré dans l'exo; à revoir?
 * @param {number} w largeur du conteneur
 * @param {number} h hauteur du conteneur
 * @author Sébastien Lozano
 */
export function SVG_engrenages (id_du_div, w, h) {
  'use strict'
  if (context.isHtml) {
    if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
    // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
    window.SVGExist[id_du_div] = setInterval(function () {
      if ($(`#${id_du_div}`).length) {
        $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
        document.getElementById(id_du_div).innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ` + w + ' ' + h + '" width="' + w + `">
                      <g id="surface1">
                      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 106.5625 0.125 C 106.289062 0.175781 105.386719 0.289062 104.5625 0.363281 C 103.738281 0.449219 103.023438 0.550781 102.960938 0.613281 C 102.761719 0.8125 102 8.164062 102 9.988281 C 102 10.476562 101.9375 10.914062 101.851562 11.023438 C 101.761719 11.136719 101.238281 11.324219 100.6875 11.4375 C 100.136719 11.5625 99.300781 11.800781 98.8125 11.960938 C 97.664062 12.386719 94.125 14.039062 93.226562 14.585938 C 92.800781 14.835938 92.4375 14.976562 92.351562 14.925781 C 92.261719 14.875 90.375 13.351562 88.148438 11.523438 C 85.9375 9.710938 84.074219 8.25 84.011719 8.273438 C 83.949219 8.300781 83.226562 8.863281 82.414062 9.523438 C 80.75 10.886719 78.3125 13.414062 76.699219 15.425781 C 75.75 16.613281 75.636719 16.8125 75.789062 16.988281 C 75.886719 17.101562 76.425781 17.773438 77.011719 18.5 C 77.585938 19.226562 79.023438 20.976562 80.210938 22.414062 C 81.398438 23.835938 82.375 25.039062 82.375 25.085938 C 82.375 25.125 82.148438 25.523438 81.863281 25.976562 C 81.199219 27.011719 80.113281 29.238281 79.773438 30.1875 C 79.574219 30.789062 78.75 33.425781 78.5625 34.074219 C 78.539062 34.148438 77.351562 34.3125 75.601562 34.488281 C 71.3125 34.886719 68.273438 35.273438 68.0625 35.425781 C 67.613281 35.761719 67.351562 40.875 67.625 43.8125 C 67.800781 45.699219 68.023438 47.113281 68.175781 47.300781 C 68.261719 47.414062 69.050781 47.539062 70.5625 47.675781 C 76.101562 48.164062 78.324219 48.386719 78.449219 48.425781 C 78.523438 48.449219 78.625 48.710938 78.675781 49.011719 C 78.726562 49.300781 78.863281 49.800781 78.988281 50.113281 C 79.113281 50.425781 79.425781 51.335938 79.675781 52.136719 C 80.164062 53.648438 81.175781 55.800781 82.011719 57.050781 C 82.273438 57.449219 82.5 57.824219 82.5 57.886719 C 82.5 57.949219 81.363281 59.363281 79.976562 61.023438 C 77.148438 64.425781 76.6875 64.988281 76.210938 65.636719 L 75.875 66.085938 L 76.636719 67.074219 C 78.5625 69.574219 81.164062 72.175781 83.613281 74.050781 C 84.324219 74.601562 84.4375 74.648438 84.664062 74.5 C 85 74.289062 88.789062 71.164062 90.835938 69.414062 C 91.738281 68.636719 92.585938 68 92.726562 68 C 92.863281 68 93.550781 68.324219 94.261719 68.738281 C 95.851562 69.625 97.960938 70.488281 99.863281 71 C 101.125 71.335938 101.75 71.5625 101.75 71.664062 C 101.75 72.476562 102.824219 81.9375 102.9375 82.113281 C 102.960938 82.175781 103.8125 82.289062 104.8125 82.375 C 106.960938 82.5625 112.511719 82.476562 114.0625 82.226562 L 115.050781 82.0625 L 115.148438 81.625 C 115.199219 81.386719 115.414062 79.210938 115.625 76.8125 C 115.835938 74.398438 116.050781 72.210938 116.101562 71.9375 C 116.210938 71.335938 116.273438 71.300781 118.363281 70.6875 C 120.226562 70.148438 122.625 69.085938 124.113281 68.164062 C 125.023438 67.585938 125.226562 67.5 125.425781 67.625 C 125.550781 67.699219 126.363281 68.375 127.238281 69.125 C 129.101562 70.710938 133.5 74.25 133.625 74.25 C 133.664062 74.25 134.148438 73.925781 134.699219 73.523438 C 136.113281 72.488281 141.414062 66.851562 141.988281 65.761719 C 142.101562 65.5625 141.75 65.074219 139.476562 62.351562 C 138.023438 60.613281 136.511719 58.8125 136.113281 58.363281 C 135.699219 57.898438 135.375 57.4375 135.375 57.324219 C 135.375 57.199219 135.710938 56.449219 136.113281 55.648438 C 137.113281 53.6875 138.074219 51.238281 138.398438 49.851562 C 138.613281 48.960938 138.710938 48.699219 138.925781 48.625 C 139.074219 48.5625 139.886719 48.460938 140.75 48.386719 C 145.675781 47.976562 149.324219 47.574219 149.398438 47.460938 C 149.476562 47.324219 149.523438 47 149.773438 44.6875 C 149.976562 42.699219 150.039062 40.136719 149.886719 39.25 C 149.8125 38.800781 149.699219 37.761719 149.625 36.9375 C 149.550781 36.101562 149.425781 35.375 149.335938 35.300781 C 149.25 35.210938 147.074219 34.960938 144.0625 34.6875 C 140.039062 34.324219 138.898438 34.1875 138.789062 34.039062 C 138.699219 33.925781 138.550781 33.449219 138.4375 32.976562 C 138.011719 31.113281 136.5625 27.601562 135.5 25.851562 C 135.363281 25.625 135.25 25.3125 135.25 25.164062 C 135.25 24.988281 136.460938 23.414062 138.550781 20.863281 C 141.074219 17.789062 141.835938 16.789062 141.75 16.636719 C 141.488281 16.148438 139.851562 14.300781 138.335938 12.773438 C 136.960938 11.375 133.886719 8.664062 133.324219 8.351562 C 133.175781 8.261719 129.636719 11.023438 126.699219 13.539062 C 125.8125 14.289062 125.023438 14.914062 124.949219 14.925781 C 124.875 14.925781 123.601562 14.335938 122.125 13.601562 C 119.664062 12.363281 118.039062 11.75 116.476562 11.4375 C 116.085938 11.363281 116.164062 11.800781 115.6875 6.875 C 115.261719 2.523438 115.011719 0.710938 114.851562 0.613281 C 114.699219 0.511719 114.335938 0.476562 112.0625 0.238281 C 110.375 0.0625 107.175781 -0.0117188 106.5625 0.125 Z M 113.1875 26.425781 C 116.261719 27.335938 119.238281 29.460938 121.261719 32.175781 C 126.011719 38.523438 124.863281 47.886719 118.75 52.914062 C 115.613281 55.488281 112.164062 56.648438 108.210938 56.460938 C 103.449219 56.25 99.5 54.125 96.625 50.25 C 93.289062 45.75 92.710938 39.4375 95.199219 34.460938 C 95.925781 33.011719 96.710938 31.914062 97.976562 30.613281 C 100.335938 28.148438 102.5 26.875 105.375 26.238281 C 106.273438 26.039062 106.863281 26.011719 109.25 26.050781 C 111.875 26.085938 112.136719 26.113281 113.1875 26.425781 Z M 113.1875 26.425781 "/>
                      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 106.386719 28.5625 C 103.1875 29.261719 100.199219 31.261719 98.460938 33.863281 C 96.726562 36.460938 96.050781 39.050781 96.261719 42.261719 C 96.613281 47.523438 100.648438 52.363281 105.875 53.773438 C 106.800781 54.011719 107.226562 54.050781 109.0625 54.050781 C 111.5 54.039062 112.449219 53.851562 114.210938 53.011719 C 115.613281 52.335938 116.613281 51.636719 117.835938 50.460938 C 119.175781 49.175781 119.988281 48.074219 120.675781 46.613281 C 122.335938 43.074219 122.238281 38.5625 120.4375 35.136719 C 118.738281 31.898438 115.148438 29.25 111.523438 28.550781 C 110.363281 28.324219 107.449219 28.335938 106.386719 28.5625 Z M 110.960938 31.574219 C 112.3125 31.851562 113.386719 32.3125 114.648438 33.148438 C 116.4375 34.351562 117.699219 36 118.335938 37.960938 C 118.585938 38.738281 118.675781 39.289062 118.726562 40.613281 C 118.851562 44.0625 118.074219 46.085938 115.789062 48.25 C 114.023438 49.925781 112.386719 50.726562 110.164062 51.011719 C 107.539062 51.351562 104.898438 50.550781 102.789062 48.761719 C 100.550781 46.886719 99.4375 44.625 99.289062 41.675781 C 99.175781 39.398438 99.6875 37.511719 100.925781 35.636719 C 101.675781 34.511719 102.386719 33.800781 103.511719 33.050781 C 105.738281 31.574219 108.414062 31.050781 110.960938 31.574219 Z M 110.960938 31.574219 "/>
                      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 58.5 55.886719 C 58.011719 57.148438 57.023438 59.835938 56.300781 61.875 C 55.585938 63.898438 54.925781 65.761719 54.835938 66 L 54.675781 66.4375 L 52.4375 66.511719 C 48.898438 66.636719 45.476562 67.125 43.164062 67.824219 C 42.386719 68.0625 41.699219 68.25 41.648438 68.25 C 41.585938 68.25 41.011719 67.5 40.375 66.585938 C 38.375 63.75 33.585938 57.1875 33.449219 57.101562 C 33.300781 57 32.289062 57.375 30.789062 58.074219 C 30.148438 58.375 29.585938 58.625 29.539062 58.625 C 29.476562 58.625 28.789062 59 28 59.449219 C 27.210938 59.914062 25.976562 60.625 25.25 61.039062 C 22.886719 62.386719 19.875 64.636719 19.875 65.0625 C 19.875 65.226562 20.550781 66.699219 24.085938 74.289062 L 25.523438 77.375 L 24.449219 78.5 C 23.863281 79.125 23.0625 80.011719 22.6875 80.476562 C 22.3125 80.9375 21.6875 81.675781 21.300781 82.125 C 20.476562 83.085938 18.699219 85.738281 18.136719 86.835938 C 17.925781 87.273438 17.699219 87.625 17.648438 87.625 C 17.601562 87.625 15.8125 87.324219 13.6875 86.949219 C 7.726562 85.898438 4.101562 85.351562 4 85.460938 C 3.863281 85.613281 2.726562 88.476562 2.210938 89.949219 C 1.699219 91.425781 0.914062 95.199219 0.386719 98.75 C 0.25 99.613281 0.113281 100.398438 0.0742188 100.5 C 0.0117188 100.664062 0.9375 101.0625 4.835938 102.550781 C 7.511719 103.574219 10.398438 104.6875 11.289062 105.039062 L 12.875 105.648438 L 12.875 107.300781 C 12.886719 110.324219 13.226562 112.851562 14.136719 116.5625 C 14.414062 117.664062 14.625 118.613281 14.625 118.6875 C 14.625 118.75 14.414062 118.960938 14.148438 119.136719 C 11.625 120.875 3.949219 126.449219 3.75 126.6875 C 3.449219 127.039062 5.761719 131.738281 7.925781 135.1875 C 8.851562 136.675781 10.585938 139.175781 11.273438 140.039062 L 11.5625 140.386719 L 13.75 139.375 C 19.039062 136.914062 23.851562 134.75 24.050781 134.75 C 24.175781 134.75 25 135.4375 25.898438 136.289062 C 27.9375 138.210938 29.011719 139.011719 31.8125 140.726562 C 33.398438 141.6875 34.074219 142.175781 34.101562 142.351562 C 34.125 142.488281 33.886719 144.136719 33.574219 146.023438 C 33.261719 147.898438 32.800781 150.863281 32.550781 152.601562 C 32.164062 155.273438 32.113281 155.789062 32.261719 155.886719 C 33.136719 156.449219 37.523438 157.835938 41.0625 158.675781 C 43.199219 159.1875 47.238281 159.9375 47.3125 159.851562 C 47.488281 159.625 50.574219 151.5 51.6875 148.3125 C 51.960938 147.550781 52.238281 146.898438 52.300781 146.851562 C 52.375 146.800781 53.3125 146.75 54.375 146.75 C 57.539062 146.75 59.710938 146.4375 63.085938 145.488281 L 64.925781 144.976562 L 65.25 145.335938 C 65.425781 145.539062 67.261719 148.101562 69.335938 151.023438 L 73.125 156.351562 L 75.25 155.375 C 78.074219 154.074219 79.726562 153.1875 81.675781 151.914062 C 83.386719 150.800781 86 148.851562 86.460938 148.351562 L 86.726562 148.0625 L 85.75 145.875 C 85.226562 144.675781 84.011719 142.023438 83.0625 140 C 82.125 137.976562 81.289062 136.136719 81.210938 135.914062 C 81.085938 135.511719 81.113281 135.488281 82.199219 134.3125 C 84.363281 132 86.238281 129.488281 87.386719 127.351562 C 87.738281 126.710938 88.101562 126.101562 88.199219 126 C 88.398438 125.789062 88.101562 125.75 95.6875 127 C 98.648438 127.5 101.300781 127.925781 101.574219 127.960938 L 102.085938 128.023438 L 102.5 126.988281 C 103.039062 125.574219 104.386719 121.386719 104.851562 119.6875 C 105.164062 118.539062 105.761719 115.386719 106.050781 113.289062 C 106.125 112.773438 106.113281 112.75 105.664062 112.523438 C 105.0625 112.210938 102.585938 111.273438 97.625 109.4375 C 95.460938 108.636719 93.5625 107.898438 93.414062 107.800781 C 93.136719 107.625 93.125 107.550781 93.125 105.648438 C 93.125 102.824219 92.75 100.074219 91.925781 96.835938 C 91.75 96.175781 91.625 95.5 91.648438 95.351562 C 91.675781 95.164062 92.550781 94.460938 94.550781 93.039062 C 96.925781 91.335938 102.273438 87.351562 102.664062 87 C 102.875 86.8125 101.039062 82.886719 99.550781 80.300781 C 98.125 77.8125 95.011719 73.5 94.664062 73.5 C 94.414062 73.5 90.75 75.136719 86.625 77.085938 C 84.523438 78.085938 82.664062 78.9375 82.476562 78.960938 C 82.175781 79.023438 81.9375 78.835938 80.523438 77.476562 C 78.898438 75.886719 76.761719 74.199219 75.1875 73.273438 C 74.363281 72.789062 73.25 72.039062 72.738281 71.625 C 72.476562 71.414062 72.375 72.125 73.875 62.6875 C 74.210938 60.488281 74.539062 58.488281 74.574219 58.226562 L 74.636719 57.773438 L 72.726562 57.023438 C 70.449219 56.136719 67.761719 55.25 67.335938 55.25 C 67.164062 55.25 66.8125 55.164062 66.550781 55.050781 C 66.050781 54.835938 61.3125 53.835938 60.113281 53.6875 L 59.398438 53.601562 Z M 55.664062 86.9375 C 61.8125 87.738281 66.976562 90.976562 69.988281 95.914062 C 71.335938 98.113281 72.460938 100.914062 72.886719 103.0625 C 73 103.636719 73.0625 104.800781 73.0625 106.4375 C 73.050781 108.710938 73.023438 109.074219 72.699219 110.4375 C 71.710938 114.699219 70.175781 117.664062 67.625 120.238281 C 64.648438 123.25 60.539062 125.351562 56.261719 126.0625 C 52.601562 126.675781 47.773438 125.8125 43.988281 123.863281 C 38.3125 120.925781 34.289062 114.898438 33.625 108.3125 C 33.273438 104.863281 34.300781 100.125 36.125 96.8125 C 38.800781 91.949219 44.085938 88.1875 49.726562 87.136719 C 51.976562 86.710938 53.550781 86.664062 55.664062 86.9375 Z M 55.664062 86.9375 "/>
                      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 51.875 89.835938 C 49.851562 90.050781 47.925781 90.648438 45.875 91.699219 C 41.324219 94.011719 38.789062 97.289062 37.4375 102.5625 C 36.523438 106.125 36.5625 108.800781 37.585938 111.851562 C 38.625 114.949219 41.324219 118.449219 44.136719 120.324219 C 49.289062 123.75 55.664062 124.1875 61.0625 121.460938 C 65.613281 119.1875 68.851562 115.023438 69.898438 110.113281 C 70.125 109.050781 70.175781 108.414062 70.175781 106.5625 C 70.175781 104.523438 70.148438 104.1875 69.835938 102.960938 C 68.6875 98.386719 65.761719 94.335938 62 92.125 C 59.238281 90.488281 54.898438 89.511719 51.875 89.835938 Z M 54.898438 93.9375 C 56.726562 94.136719 59.136719 95.039062 60.761719 96.125 C 63.050781 97.664062 65.113281 100.636719 65.898438 103.511719 C 66.148438 104.425781 66.1875 104.835938 66.175781 106.625 C 66.164062 108.324219 66.113281 108.863281 65.898438 109.675781 C 65.300781 111.863281 63.675781 114.539062 62.164062 115.851562 C 59.539062 118.113281 57.210938 119.101562 54.175781 119.210938 C 52.386719 119.289062 51.351562 119.136719 49.449219 118.539062 C 45.824219 117.398438 43.164062 114.789062 41.636719 110.914062 C 40.761719 108.664062 40.585938 105.726562 41.1875 103.335938 C 41.449219 102.351562 42.3125 100.511719 43.011719 99.488281 C 44.976562 96.574219 48.710938 94.300781 52.261719 93.886719 C 53.164062 93.789062 53.449219 93.789062 54.898438 93.9375 Z M 54.898438 93.9375 "/>
                      </g>
                      </svg>
                      `
        clearInterval(window.SVGExist[id_du_div])// Arrête le timer
      }
    }, 100) // Vérifie toutes les 100ms
  }
}

/**
 * Crée un diagramme pour une fonction arithmétique à deux étapes produit puis somme
 * @param {string} id_du_div id du div contenant le SVG
 * @param {number} w largeur du div du svg
 * @param {numer} h hauteur du div du svg
 * @param {string} nom nom de la fonction
 * @param {string} xAnt antécédent de départ
 * @param {array} etapesExpressions tableau contenant les opérations et les expressions algébriques des étapes
 * @author Sébastien Lozano
 */
export function SVG_machine_diag_3F12 (id_du_div, w, h, nom, xAnt, etapesExpressions) {
  'use strict'
  const interligne = 10// w/80; //h/10; // unité d'espacement
  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      // on crée un rectangle dont la taille est adaptée au texte
      // let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
      document.getElementById(id_du_div).innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ` + w + ' ' + h + '" width="' + w + `">
                      <g>
                          <path d="M0 ` + 5 * interligne + 'L0 ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 7 * interligne + 'L0 ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + interligne + '" height="' + h / 2 + '" x="' + 2.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + xAnt + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <line x1="` + 5 * interligne + '" y1="' + 5 * interligne + '" x2="' + 7 * interligne + '" y2="' + 5 * interligne + `" stroke-width="3" stroke="#f15929">
                          </line>
                          <circle r="` + 2 * interligne + '" cx="' + 9 * interligne + '" cy="' + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </circle>
                          <path d="M` + 11 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne - interligne / 2) + 'M' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 4 * interligne + '" height="' + h / 2 + '" x="' + 7.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">×` + etapesExpressions[0][0] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <path d="M` + 13 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 3 * interligne + 'L' + 21 * interligne + ' ' + 3 * interligne + 'L' + 21 * interligne + ' ' + 7 * interligne + 'L' + 13 * interligne + ' ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 2.5 * interligne + '" height="' + h / 2 + '" x="' + 16 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + etapesExpressions[0][1] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <line x1="` + 21 * interligne + '" y1="' + 5 * interligne + '" x2="' + 23 * interligne + '" y2="' + 5 * interligne + `" stroke-width="3" stroke="#f15929">
                          </line>
                          <circle r="` + 2 * interligne + '" cx="' + 25 * interligne + '" cy="' + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </circle>
                          <path d="M` + 27 * interligne + ' ' + 5 * interligne + 'L' + 29 * interligne + ' ' + 5 * interligne + 'L' + (29 * interligne - interligne / 2) + ' ' + (5 * interligne - interligne / 2) + 'M' + 29 * interligne + ' ' + 5 * interligne + 'L' + (29 * interligne - interligne / 2) + ' ' + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 4 * interligne + '" height="' + h / 2 + '" x="' + 23.5 * interligne + '" y="' + h / 4 + `">
                          <body xmlns="http://www.w3.org/1999/xhtml">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">+` + etapesExpressions[1][0] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                              </body>
                          </foreignObject>
                      </g>
                      <g>
                          <path d="M` + 29 * interligne + ' ' + 5 * interligne + 'L' + 29 * interligne + ' ' + 3 * interligne + 'L' + 44 * interligne + ' ' + 3 * interligne + 'L' + 44 * interligne + ' ' + 7 * interligne + 'L' + 29 * interligne + ' ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 12 * interligne + '" height="' + h / 2 + '" x="' + 31 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + nom + '<span class="mopen">(</span>' + xAnt + '<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>' + etapesExpressions[1][1] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                  </svg>	
                  `

      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}

/**
* Crée une flèche orange pour la fonction machine
* @param {object} groupe groupe svg
* @param {string} chemin path pour la ligne
* @param {string} couleur couleur
* @author Sébastien Lozano
*/
export function SVG_fleche_machine_maths (groupe, chemin, couleur) {
  'use strict'
  return groupe.path(chemin).fill(couleur).stroke({ color: couleur, width: 1, linecap: 'round', linejoin: 'null' })
}

/** Trace un chemin pour un groupe donné avec une couleur donnée
  * @param {object} groupe groupe
  * @param {string} chemin path
  * @param {string} couleur couleur
  * @author Sébastien Lozano
  */
export function SVG_chemin (groupe, chemin, couleur) {
  'use strict'
  return groupe.path(chemin).fill('none').stroke({ color: couleur, width: 1, linecap: 'round', linejoin: 'null' })
}

/**
   * Crée un diagramme pour une fonction arithmétique à une étape produit
   * @param {string} id_du_div id du div contenant le SVG
   * @param {number} w largeur du div du svg
   * @param {numer} h hauteur du div du svg
   * @param {string} nom nom de la fonction
   * @param {string} xAnt antécédent de départ
   * @param {array} etapesExpressions tableau contenant les opérations et les expressions algébriques des étapes
   * @author Sébastien Lozano
   */
export function SVG_machine_diag_3F1_act_mono (id_du_div, w, h, nom, xAnt, etapesExpressions) {
  'use strict'
  const interligne = 10// w/80; //h/10; // unité d'espacement
  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      // on crée un rectangle dont la taille est adaptée au texte
      // let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
      document.getElementById(id_du_div).innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ` + w + ' ' + h + '" width="' + w + `">
                      <g>
                          <path d="M0 ` + 5 * interligne + 'L0 ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 7 * interligne + 'L0 ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + interligne + '" height="' + h / 2 + '" x="' + 2.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + xAnt + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <line x1="` + 5 * interligne + '" y1="' + 5 * interligne + '" x2="' + 7 * interligne + '" y2="' + 5 * interligne + `" stroke-width="3" stroke="#f15929">
                          </line>
                          <circle r="` + 2 * interligne + '" cx="' + 9 * interligne + '" cy="' + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </circle>
                          <path d="M` + 11 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne - interligne / 2) + 'M' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 4 * interligne + '" height="' + h / 2 + '" x="' + 7.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">×` + etapesExpressions[0][0] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <path d="M` + 13 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 3 * interligne + 'L' + 27 * interligne + ' ' + 3 * interligne + 'L' + 27 * interligne + ' ' + 7 * interligne + 'L' + 13 * interligne + ' ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 12 * interligne + '" height="' + h / 2 + '" x="' + 16 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  
                                                  <span class="mord mathdefault">` + nom + '<span class="mopen">(</span>' + xAnt + '<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>' + etapesExpressions[0][1] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                  </svg>	
                  `

      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}

/**
   * Fonction pour particulariser une police svg et ses paramètres
   * @param {string} font
   * @param {string} interligne
   * @param {string} ancre
   * @param {string} f_style
   * @param {string} f_weight
   * @author Sébastien Lozano
   */
export function my_svg_font (font, interligne, ancre, f_style, f_weight) {
  'use strict'
  return {
    family: font,
    size: interligne,
    anchor: ancre,
    style: f_style,
    //, leading : 0.5
    weight: f_weight
  }
}

/**
   * Fonction pour créer une machine mathématique SVG, une fonction!
   * gestion du rendu KaTeX temporaire avec insertion manuelle de balises foreignObject pour les textes
   * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
   * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
   * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
   * @param {string} id_du_div id_du_div
   * @param {number} w width du svg
   * @param {number} h height du svg
   * @param {string} nom nom de la fonction
   * @param {string} etape1 etape 1 du procédé de calcul
   * @param {string} etape2 etape 2 du procédé de calcul
   * @param {string} etape3 etape 3 du procédé de calcul
   * @param {string} xLigne1 antécédent ligne1
   * @param {string} xLigne2 antécédent ligne2
   * @param {string} yLigne1 image ligne1
   * @param {string} yLigne2 image ligne2
   * @author Sébastien Lozano
   */
export function SVG_machine_maths (id_du_div, w, h, nom, etape1, etape2, etape3, xLigne1, xLigne2, yLigne1, yLigne2) {
  'use strict'
  const interligne = 15 // pour un interligne uniforme
  const prop_font = my_svg_font('Helvetica', interligne, 'start', 'normal', 'normal')
  const prop_font_nom = my_svg_font('Helvetica', interligne, 'start', 'normal', 'bold')
  const prop_font_etape = my_svg_font('Helvetica', 4 * interligne / 5, 'start', 'normal', 'normal')

  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      // const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h).size('100%','100%');
      const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h)
      // on trace un cadre pour le debug
      // mon_svg.path('M0,0 L'+w+',0L'+w+','+h+'L0,'+h+'Z').fill('none').stroke({ color: '#f15929', width: 1, linecap: 'round', linejoin:'null'});

      // path pour créer des fleches
      const path_fleche = 'm0,0 l-' + interligne / 2 + ',-' + interligne + ' l' + interligne + ',' + interligne + ' l-' + interligne + ',' + interligne + ' l' + interligne / 2 + ',-' + interligne + 'z'

      // On crée une timeline
      const timeline = new SVG.Timeline()

      // ------------CREATION DES GROUPES----------------------
      // ------------Antécédent--------------------------------
      const ant = mon_svg.group()

      // ------------Image-------------------------------------
      const im = mon_svg.group()

      // ------------PREPARATION DES DIMENSIONS NECESSAIRES----
      // ------------Dimension Antécédent----------------------
      const ant_ligne1 = ant.text(xLigne1).font(prop_font)
      const ant_ligne2 = ant.text(xLigne2).font(prop_font)
      const w_ant = Math.max(ant_ligne1.length(), ant_ligne2.length()) + interligne
      ant_ligne1.clear()
      ant_ligne2.clear()

      // ------------Dimension Image---------------------------
      const im_ligne1 = im.text(yLigne1).font(prop_font)
      const im_ligne2 = im.text(yLigne2).font(prop_font)
      const w_im = Math.max(im_ligne1.length(), im_ligne2.length()) + interligne
      im_ligne1.clear()
      im_ligne2.clear()

      // ------------Dimension Machine-------------------------
      // on crée des variables pour le texte à afficher sur la machine afin de récupérer leur taille
      // pour ajuster celle de la machine.
      let W_machine_nom, machine_nom, machine_etape1, w_machine_etape1, machine_etape2, w_machine_etape2, machine_etape3, w_machine_etape3
      if (nom != '') {
        machine_nom = mon_svg.text(nom).font(prop_font_nom)
        w_machine_nom = machine_nom.length()
        machine_nom.clear()
      } else {
        w_machine_nom = 0
      }
      if (etape1 != '') {
        machine_etape1 = mon_svg.text(etape1).font(prop_font_etape)
        w_machine_etape1 = machine_etape1.length()
        machine_etape1.clear()
      } else {
        w_machine_etape1 = 0
      }
      if (etape2 != '') {
        machine_etape2 = mon_svg.text(etape2).font(prop_font_etape)
        w_machine_etape2 = machine_etape2.length()
        machine_etape2.clear()
      } else {
        w_machine_etape2 = 0
      }
      if (etape3 != '') {
        machine_etape3 = mon_svg.text(etape3).font(prop_font_etape)
        w_machine_etape3 = machine_etape3.length()
        machine_etape3.clear()
      } else {
        w_machine_etape3 = 0
      }

      const w_etape_max = Math.max(w_machine_nom, w_machine_etape1, w_machine_etape2, w_machine_etape3, w_ant + interligne, w_im + interligne) + 1.5 * interligne

      // ------------GROUPE ANTECEDENT-------------------------
      const ant_ligne = ant.foreignObject(w_ant, h).attr({ x: '0', y: '0' })
      const antDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      katex.render(xLigne1 + '\\newline ' + xLigne2, antDiv, {
        displayMode: true, throwOnError: true, errorColor: '#CC0000', strict: 'ignore', trust: false
      })
      ant_ligne.add(antDiv)
      ant_ligne.dmove(0, -antDiv.offsetHeight / 2)
      const fleche_ant = SVG_fleche_machine_maths(ant, path_fleche, '#f15929')
      fleche_ant.dmove(antDiv.offsetWidth + interligne / 2, interligne)
      // on positionne le groupe antécédent
      ant.dmove(0, h / 2 - interligne)

      // ------------GROUPE IMAGE-------------------------
      const im_ligne = im.foreignObject(w_im, h).attr({ x: '0', y: '0' })
      const imDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      katex.render(yLigne1 + '\\newline ' + yLigne2, imDiv, {
        displayMode: true, throwOnError: true, errorColor: '#CC0000', strict: 'ignore', trust: false
      })
      im_ligne.add(imDiv)
      im_ligne.dmove(0, -imDiv.offsetHeight / 2)
      const fleche_im = SVG_fleche_machine_maths(im, path_fleche, '#f15929')
      fleche_im.dmove(-interligne / 2, interligne)
      // on positionne le groupe image
      im.dmove(w / 2 - imDiv.offsetWidth / 2, h / 2 - interligne)

      // ------------GROUPE MACHINE-------------------------
      // const path_machine = 'M-5,0 L-5,-5 L-5,5 M-5,0 L10,0 L10,-40 L100,-40 L100,0 L120,0 L115,-5 L120,0 L115,5 L120,0 L100,0 L100,40 L10,40 L10,0';
      const path_machine = 'M-10,0 L-10,-5 L-10,5 M-10,0 L10,0 L10,-' + (h / 2 - 5) + ' L' + (w_etape_max + 20) + ',-' + (h / 2 - 5) + ' L' + (w_etape_max + 20) + ',0 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 35) + ',-5 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 35) + ',5 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 20) + ',0 L' + (w_etape_max + 20) + ',' + (h / 2 - 5) + ' L10,' + (h / 2 - 5) + ' L10,0'
      const machine = mon_svg.path(path_machine).fill('#fff').stroke({ color: '#f15929', width: 3, linecap: 'round', linejoin: 'round' })
      machine.dmove(w / 2 - w_etape_max / 2 - 20 + interligne / 2, h / 2) // w/2;  60 est la moitié de la taille de la machine en largeur

      const fobj_machine = mon_svg.foreignObject(w_etape_max, h).attr({ x: w / 2 - w_etape_max / 2, y: '0' })
      const machineDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      katex.render('\\mathbf{' + nom + '}\\newline ' + etape1 + '\\newline ' + etape2 + '\\newline ' + etape3, machineDiv, {
        displayMode: true, throwOnError: true, errorColor: '#CC0000', strict: 'ignore', trust: false
      })
      fobj_machine.add(machineDiv)
      fobj_machine.dmove(0, h / 2 - interligne - machineDiv.offsetHeight / 2)

      // ------------ANIMATION-------------------------
      ant.timeline(timeline)
      im.timeline(timeline)

      const runner1 = ant.animate(8000, 0, 'absolute').dmove(w / 2 - w_ant / 2, 0)
      const runner2 = im.animate(8000, 0, 'after').dmove(w - w_im / 2, 0)

      runner1.loop(true, false, 8000)
      runner2.loop(true, false, 8000)

      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}
