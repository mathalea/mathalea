
import { ceil, fraction, Fraction } from 'mathjs'
import { ObjetMathalea2D } from '../2dGeneralites'
import { context } from '../context'
import FractionX from '../FractionEtendue'
import { arrondi, nombreAvecEspace, rangeMinMax, stringNombre } from '../outils'
import { point } from './point'
import { segment } from './segment'
import { latexParCoordonnees, texteParPoint, texteParPosition } from './textes'
import { tracePoint } from './tracePoint'

/**  Trace un axe gradué
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.Unite = 10] Nombre de cm par unité
 * @param {number} [parametres.Min = 10] Valeur minimum labelisée sur l'axe (les graduations commencent un peu avant)
 * @param {number} [parametres.Max = 10] Valeur maximum labelisée sur l'axe (les graduations finissent un peu après)
 * @param {number} [parametres.x = 0] Abscisse du point de départ du tracé
 * @param {number} [parametres.y = 0] Ordonnée du point de départ du tracé
 * @param {number} [parametres.axeEpaisseur = 2] Épaisseur de l'axe gradué
 * @param {string} [parametres.axeCouleur = 'black'] Couleur de l'axe gradué : du type 'blue' ou du type '#f15929'
 * @param {string} [parametres.axeStyle = '->'] Style final de l'axe gradué
 * @param {number} [parametres.axeHauteur = 4] Définit la "largeur" de l'axe, celle des graduations et du style final
 * @param {string} [parametres.axePosition = 'H'] Position de l'axe : 'H' pour horizontal, 'V' pour vertical
 * @param {number} [parametres.thickEpaisseur = 2] Épaisseur des graduations
 * @param {string} [parametres.thickCouleur = axeCouleur] Couleur des graduations : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.thickDistance = 1] Distance entre deux graduations principales
 * @param {number} [parametres.thickOffset = 0] Décalage de toutes les graduations sur l'axe (pour, par exemple, faire coïncider le début de l'axe avec une graduation)
 * @param {boolean} [parametres.thickSec = false] Affichage (ou pas) des graduations secondaires
 * @param {number} [parametres.thickSecDist = 0.1] Distance entre deux graduations secondaires
 * @param {boolean} [parametres.thickTer = false] Affichage (ou pas) des graduations secondaires
 * @param {number} [parametres.thickTerDist = 0.1] Distance entre deux graduations tertiaires, false sinon
 * @param {Array} [parametres.pointListe = []] Liste de points à mettre sur l'axe comme, par exemple, [[3.4,'A'],[3.8,'B']]. Les noms se placent au-dessus de l'axe.
 * @param {number} [parametres.labelPointTaille = 10] Taille (hauteur) de la police des points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
 * @param {number} [parametres.labelPointLargeur = 20] Largeur de la boîte où sont affichés les points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
 * @param {string} [parametres.pointCouleur = 'blue'] Couleur des points de la liste pointListe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.pointTaille = 4] Taille en pixels des points de la liste  pointListe
 * @param {string} [parametres.pointStyle = '+'] Style des points de la liste pointListe
 * @param {number} [parametres.pointOpacite = 0.8] Opacité des points de la liste pointListe
 * @param {number} [parametres.pointEpaisseur = 2] Épaisseur des points de la liste pointListe
 * @param {boolean} [parametres.labelsPrincipaux = true] Présence (ou non) des labels numériques principaux
 * @param {boolean} [parametres.labelsSecondaires = false] Présence (ou non) des labels numériques secondaires
 * @param {number} [parametres.step1 = 1] Pas des labels numériques principaux
 * @param {number} [parametres.step2 = 1] Pas des labels numériques secondaires
 * @param {number} [parametres.labelDistance = (axeHauteur + 10) / context.pixelsParCm] Distance entre les labels et l'axe
 * @param {Array} [parametres.labelListe = []] Liste de labels à mettre sous l'axe comme, par exemple, [[2.8,'x'],[3.1,'y']]. Les noms se placent en-dessous de l'axe.
 * @param {string} [parametres.Legende = ''] Légende de l'axe
 * @param {number} [parametres.LegendePosition = (Max - Min) * Unite + 1.5] Position de la légende
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {number} Unite Nombre de cm par unité
 * @property {number} Min Valeur minimum labelisée sur l'axe (les graduations commencent un peu avant)
 * @property {number} Max Valeur maximum labelisée sur l'axe (les graduations finissent un peu après)
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Aout 2022
export function DroiteGraduee ({
  Unite = 10, Min = 0, Max = 2, x = 0, y = 0, axeEpaisseur = 2, axeCouleur = 'black', axeStyle = '->', axeHauteur = 4, axePosition = 'H',
  thickEpaisseur = 2, thickCouleur = axeCouleur, thickDistance = 1, thickOffset = 0,
  thickSecDist = 0.1, thickSec = false, thickTerDist = 0.01, thickTer = false,
  pointListe = [], labelPointTaille = 10, labelPointLargeur = 20, pointCouleur = 'blue', pointTaille = 4,
  pointStyle = '+', pointOpacite = 0.8, pointEpaisseur = 2,
  labelsPrincipaux = true, labelsSecondaires = false, step1 = 1, step2 = 1,
  labelDistance = (axeHauteur + 10) / context.pixelsParCm,
  labelListe = [], Legende = '', LegendePosition = (Max - Min) * Unite + 1.5
} = {}) {
  ObjetMathalea2D.call(this, { })

  // Les propriétés exportables
  this.Unite = Unite
  this.Min = Min
  this.Max = Max

  const objets = []; let S; let T; let P; let i
  let longueurTotale = (Max - Min) * Unite + 0.5 // la longueur totale de l'axe flèche comprise
  let absord = [1, 0] // Constantes pour gérer la verticalité ou l'horizontalité de l'axe
  if (axePosition !== 'H') absord = [0, 1]
  // dessin de l'axe
  if (axeStyle === '->') {
    longueurTotale += 0.2
    S = segment(point(x - 0.2 * absord[0], y - 0.2 * absord[1]), point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]), axeCouleur)
    S.styleExtremites = '->'
    S.tailleExtremites = axeHauteur
    S.epaisseur = axeEpaisseur
  } else {
    S = segment(point(x, y), point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]), axeCouleur)
    S.styleExtremites = axeStyle || '|->'
    S.epaisseur = axeEpaisseur
    S.tailleExtremites = axeHauteur
  }
  objets.push(S)
  let factor
  const r = 10 / context.pixelsParCm
  if (thickTer) factor = 1 / thickTerDist
  else if (thickSec) factor = 1 / thickSecDist
  else factor = 1 / thickDistance

  const Min2 = Math.round((Min + thickOffset) * factor) // début des graduations (ne coïncide pas nécéssairement avec le début de la droite)
  const Max2 = Math.round((Max - thickOffset) * factor) // fin des graduations
  const pas1 = Math.round(thickDistance * factor); const pas2 = Math.round(thickSecDist * factor)
  for (let j = Min2; j <= Max2; j++) {
    i = (j - Min * factor) / factor
    if (j % pas1 === 0) { // Graduation principale
      S = segment(point(x + i * Unite * absord[0] - axeHauteur / 8 * r * absord[1], y - axeHauteur / 8 * r * absord[0] + i * Unite * absord[1]), point(x + i * Unite * absord[0] + axeHauteur / 8 * r * absord[1], y + axeHauteur / 8 * r * absord[0] + i * Unite * absord[1]), thickCouleur)
      S.epaisseur = thickEpaisseur
      objets.push(S)
    } else if (j % pas2 === 0 && thickSec) { // Graduation secondaire
      S = segment(point(x + i * Unite * absord[0] - axeHauteur / 12 * r * absord[1], y - axeHauteur / 12 * r * absord[0] + i * Unite * absord[1]), point(x + i * Unite * absord[0] + axeHauteur / 12 * r * absord[1], y + axeHauteur / 12 * r * absord[0] + i * Unite * absord[1]), thickCouleur)
      S.epaisseur = thickEpaisseur / 2
      S.opacite = 0.8
      objets.push(S)
    } else if (thickTer) { // Graduation tertiaire
      S = segment(point(x + i * Unite * absord[0] - axeHauteur / 16 * r * absord[1], y - axeHauteur / 16 * r * absord[0] + i * Unite * absord[1]), point(x + i * Unite * absord[0] + axeHauteur / 16 * r * absord[1], y + axeHauteur / 16 * r * absord[0] + i * Unite * absord[1]), thickCouleur)
      S.epaisseur = thickEpaisseur / 4
      S.opacite = 0.6
      objets.push(S)
    }
  }
  // Les labels principaux
  if (labelsPrincipaux) {
    for (let j = Min2; j <= Max2; j++) {
      if (j % (step1 * pas1) === 0) {
        i = (j - Min * factor) / factor
        T = texteParPosition(`${nombreAvecEspace(arrondi(Min + i, 3))}`, x + i * Unite * absord[0] - labelDistance * absord[1], y + i * Unite * absord[1] - labelDistance * absord[0])
        objets.push(T)
      }
    }
  }
  if (labelsSecondaires) {
    for (let j = Min2; j <= Max2; j++) {
      if (j % (step2 * pas2) === 0 && j % (step1 * pas1) !== 0) {
        i = (j - Min * factor) / factor
        T = texteParPosition(`${nombreAvecEspace(arrondi(Min + i, 3))}`, x + i * Unite * absord[0] - labelDistance * absord[1], y + i * Unite * absord[1] - labelDistance * absord[0])
        objets.push(T)
      }
    }
  }
  // Les labels facultatifs
  let t
  if (labelListe.length !== 0) {
    for (const p of labelListe) {
      t = texteParPosition(p[1], x - labelDistance * absord[1] + (p[0] - Min) * absord[0] * Unite, y - labelDistance * absord[0] + (p[0] - Min) * absord[1] * Unite)
      objets.push(t)
    }
  }
  if (Legende !== '') {
    objets.push(texteParPosition(Legende, x + LegendePosition * absord[0], y + LegendePosition * absord[1]))
  }
  if (pointListe.length !== 0) {
    let lab
    for (const p of pointListe) {
      P = point(x + (p[0] - Min) * absord[0] * Unite, y + (p[0] - Min) * absord[1] * Unite, p[1])
      T = tracePoint(P, pointCouleur)
      T.taille = pointTaille
      T.tailleTikz = Math.max(T.taille / 30, 0.3)
      T.opacite = pointOpacite
      T.style = pointStyle
      T.epaisseur = pointEpaisseur
      lab = latexParCoordonnees(p[1], x - 0.8 * absord[1] + (p[0] - Min) * absord[0] * Unite, y + 0.8 * absord[0] + (p[0] - Min) * absord[1] * Unite, pointCouleur, labelPointLargeur, labelPointTaille, '', labelPointTaille)
      objets.push(T, lab)
    }
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
  this.svgml = function (coeff, amp) {
    let code = ''
    for (const objet of objets) {
      if (typeof (objet.svgml) === 'undefined') code += '\t' + objet.svg(coeff) + '\n'
      else code += '\t' + objet.svgml(coeff, amp) + '\n'
    }
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    for (const objet of objets) {
      if (typeof (objet.tikzml) === 'undefined') code += '\t' + objet.tikz() + '\n'
      else code += '\t' + objet.tikzml(amp) + '\n'
    }
    return code
  }
}
/**  Trace un axe gradué
   * @param {Object} parametres À saisir entre accolades
   * @param {number} [parametres.Unite = 10] Nombre de cm par unité
   * @param {number} [parametres.Min = 10] Valeur minimum labelisée sur l'axe (les graduations commencent un peu avant)
   * @param {number} [parametres.Max = 10] Valeur maximum labelisée sur l'axe (les graduations finissent un peu après)
   * @param {number} [parametres.x = 0] Abscisse du point de départ du tracé
   * @param {number} [parametres.y = 0] Ordonnée du point de départ du tracé
   * @param {number} [parametres.axeEpaisseur = 2] Épaisseur de l'axe gradué
   * @param {string} [parametres.axeCouleur = 'black'] Couleur de l'axe gradué : du type 'blue' ou du type '#f15929'
   * @param {string} [parametres.axeStyle = '->'] Style final de l'axe gradué
   * @param {number} [parametres.axeHauteur = 4] Définit la "largeur" de l'axe, celle des graduations et du style final
   * @param {string} [parametres.axePosition = 'H'] Position de l'axe : 'H' pour horizontal, 'V' pour vertical
   * @param {number} [parametres.thickEpaisseur = 2] Épaisseur des graduations
   * @param {string} [parametres.thickCouleur = axeCouleur] Couleur des graduations : du type 'blue' ou du type '#f15929'
   * @param {number} [parametres.thickDistance = 1] Distance entre deux graduations principales
   * @param {number} [parametres.thickOffset = 0] Décalage de toutes les graduations sur l'axe (pour, par exemple, faire coïncider le début de l'axe avec une graduation)
   * @param {boolean} [parametres.thickSec = false] Affichage (ou pas) des graduations secondaires
   * @param {number} [parametres.thickSecDist = 0.1] Distance entre deux graduations secondaires
   * @param {boolean} [parametres.thickTer = false] Affichage (ou pas) des graduations secondaires
   * @param {number} [parametres.thickTerDist = 0.1] Distance entre deux graduations tertiaires, false sinon
   * @param {Array} [parametres.pointListe = []] Liste de points à mettre sur l'axe comme, par exemple, [[3.4,'A'],[3.8,'B']]. Les noms se placent au-dessus de l'axe.
   * @param {number} [parametres.labelPointTaille = 10] Taille (hauteur) de la police des points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
   * @param {number} [parametres.labelPointLargeur = 20] Largeur de la boîte où sont affichés les points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
   * @param {string} [parametres.pointCouleur = 'blue'] Couleur des points de la liste pointListe : du type 'blue' ou du type '#f15929'
   * @param {number} [parametres.pointTaille = 4] Taille en pixels des points de la liste  pointListe
   * @param {string} [parametres.pointStyle = '+'] Style des points de la liste pointListe
   * @param {number} [parametres.pointOpacite = 0.8] Opacité des points de la liste pointListe
   * @param {number} [parametres.pointEpaisseur = 2] Épaisseur des points de la liste pointListe
   * @param {boolean} [parametres.labelsPrincipaux = true] Présence (ou non) des labels numériques principaux
   * @param {boolean} [parametres.labelsSecondaires = false] Présence (ou non) des labels numériques secondaires
   * @param {number} [parametres.step1 = 1] Pas des labels numériques principaux
   * @param {number} [parametres.step2 = 1] Pas des labels numériques secondaires
   * @param {number} [parametres.labelDistance = (axeHauteur + 10) / context.pixelsParCm] Distance entre les labels et l'axe
   * @param {Array} [parametres.labelListe = []] Liste de labels à mettre sous l'axe comme, par exemple, [[2.8,'x'],[3.1,'y']]. Les noms se placent en-dessous de l'axe.
   * @param {string} [parametres.Legende = ''] Légende de l'axe
   * @param {number} [parametres.LegendePosition = (Max - Min) * Unite + 1.5] Position de la légende
   * @example droiteGraduee({
          x: 0,
          y: 3,
          Min: -2.7,
          Max: 12 + 0.2,
          thickSec: true,
          Unite: 3,
          thickCouleur: 'red',
          axeCouleur: 'blue',
          axeHauteur: 4,
          labelsPrincipaux: false,
          labelListe: [[0, 'O'], [1, 'I']],
          pointListe: [[-1, 'A'], [5, 'B'], [7.2, 'C']],
          pointTaille: 6,
          pointCouleur: 'gray',
          pointStyle: '|',
          pointEpaisseur: 3
        })
    // Trace une droite graduée avec différentes options
   * @author Jean-Claude Lhote
   * @return {DroiteGraduee}
   */
// JSDOC Validee par EE Aout 2022
export function droiteGraduee ({
  Unite = 10, Min = 0, Max = 2, x = 0, y = 0, axeEpaisseur = 2, axeCouleur = 'black', axeStyle = '->', axeHauteur = 4, axePosition = 'H',
  thickEpaisseur = 2, thickCouleur = axeCouleur, thickDistance = 1, thickOffset = 0,
  thickSecDist = 0.1, thickSec = false, thickTerDist = 0.01, thickTer = false,
  pointListe = [], labelPointTaille = 10, labelPointLargeur = 20, pointCouleur = 'blue', pointTaille = 4,
  pointStyle = '+', pointOpacite = 0.8, pointEpaisseur = 2,
  labelsPrincipaux = true, labelsSecondaires = false, step1 = 1, step2 = 1,
  labelDistance = (axeHauteur + 10) / context.pixelsParCm,
  labelListe = [], Legende = '', LegendePosition = (Max - Min) * Unite + 1.5
} = {}) {
  return new DroiteGraduee({
    Unite: Unite,
    Min: Min,
    Max: Max,
    x: x,
    y: y,
    axeEpaisseur: axeEpaisseur,
    axeCouleur: axeCouleur,
    axeStyle: axeStyle,
    axeHauteur: axeHauteur,
    axePosition: axePosition,
    thickEpaisseur: thickEpaisseur,
    thickCouleur: thickCouleur,
    thickDistance: thickDistance,
    thickOffset: thickOffset,
    thickSecDist: thickSecDist,
    thickSec: thickSec,
    thickTerDist: thickTerDist,
    thickTer: thickTer,
    pointListe: pointListe,
    labelPointTaille: labelPointTaille,
    labelPointLargeur: labelPointLargeur,
    pointCouleur: pointCouleur,
    pointTaille: pointTaille,
    pointStyle: pointStyle,
    pointOpacite: pointOpacite,
    pointEpaisseur: pointEpaisseur,
    labelsPrincipaux: labelsPrincipaux,
    labelsSecondaires: labelsSecondaires,
    step1: step1,
    step2: step2,
    labelDistance: labelDistance,
    labelListe: labelListe,
    Legende: Legende,
    LegendePosition: LegendePosition
  })
}

/**
   * Trace un repère orthonormé
   * @param {number} [xmin=-30] Valeur minimale sur l'axe des abscisses
   * @param {number} [ymin=-30] Valeur minimale sur l'axe des ordonnées
   * @param {number} [xmax=30] Valeur maximale sur l'axe des abscisses
   * @param {number} [ymax=30] Valeur maximale sur l'axe des ordonnées
   * @param {number} [thick=0.2] Demi-longueur des tirets de chaque graduation
   * @param {number} [xstep=1] Pas sur l'axe des abscisses
   * @param {number} [ystep=1] Pas sur l'axe des ordonnées
   * @param {number} [epaisseur=2] Epaisseur des deux axes
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {number} [tailleExtremites=4] Taille des flèches à l'extrémité des axes.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @author Rémi Angot
   * @class
  */
// JSDOC Validee par EE Juin 2022
function Axes (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  thick = 0.2,
  xstep = 1,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
  tailleExtremites = 4
) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  let yabscisse
  ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0)
  let xordonnee
  xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0)
  const abscisse = segment(xmin, yabscisse, xmax, yabscisse, color)
  abscisse.styleExtremites = '->'
  abscisse.tailleExtremites = tailleExtremites
  abscisse.epaisseur = epaisseur
  const ordonnee = segment(xordonnee, ymin, xordonnee, ymax, color)
  ordonnee.styleExtremites = '->'
  ordonnee.epaisseur = epaisseur
  ordonnee.tailleExtremites = tailleExtremites
  objets.push(abscisse, ordonnee)
  for (let x = xmin; x < xmax; x = x + xstep) {
    const s = segment(x, yabscisse - thick, x, yabscisse + thick, color)
    s.epaisseur = epaisseur
    objets.push(s)
  }
  for (let y = ymin; y < ymax; y = y + ystep) {
    const s = segment(xordonnee - thick, y, xordonnee + thick, y, color)
    s.epaisseur = epaisseur
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
  // this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`
}

/**
   * Trace un repère orthonormé
   * @param {number} [xmin=-30] Valeur minimale sur l'axe des abscisses
   * @param {number} [ymin=-30] Valeur minimale sur l'axe des ordonnées
   * @param {number} [xmax=30] Valeur maximale sur l'axe des abscisses
   * @param {number} [ymax=30] Valeur maximale sur l'axe des ordonnées
   * @param {number} [thick=0.2] Demi-longueur des tirets de chaque graduation
   * @param {number} [xstep=1] Pas sur l'axe des abscisses
   * @param {number} [ystep=1] Pas sur l'axe des ordonnées
   * @param {number} [epaisseur=2] Epaisseur des deux axes
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @example axes()
   * // Trace un repère orthonormé dont les axes des abscisses et des ordonnées ont pour minimum -30, maximum -30, épaisseur 2, avec un pas de 1 et de couleur noire. Le tiret de chaque graduation mesure 0,4.
   * @example axes(-10,-5,20,3,0.25,2,0.5,1,'red')
   * // Trace un repère orthonormé rouge dont les axes des abscisses et des ordonnées ont pour épaisseur 1 et dont le tiret de chaque graduation mesure 0,5.
   * // L'axe des abscisses va de -10 à 20 avec un pas de 2. L'axe des ordonnées va de -5 à 3 avec un pas de 0,5.
   * @return {Axes}
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function axes (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  thick = 0.2,
  xstep = 1,
  ystep = 1,
  epaisseur = 2,
  color = 'black'
) {
  return new Axes(xmin, ymin, xmax, ymax, thick, xstep, ystep, epaisseur, color)
}

/**
   * Trace une droite verticale graduée
   * @param {number} [ymin=-2] Valeur minimale sur l'axe vertical
   * @param {number} [ymax=5] Valeur maximale sur l'axe vertical
   * @param {number} [thick=0.2] Largeur des tirets de chaque graduation principale
   * @param {number} [ystep=1] Pas sur l'axe des ordonnées
   * @param {number} [epaisseur=2] Epaisseur des deux axes
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {number} [ytick=2] Nombre de partage entre deux graduations principales
   * @param {string} [titre=''] Titre de l'axe
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
   * @author Frédéric Piou
   * @class
  */
// JSDOC Validee par EE Juin 2022
function AxeY (
  ymin = -2,
  ymax = 5,
  thick = 0.2,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
  ytick = 2,
  titre = ''
) {
  if (!(ystep instanceof Fraction || ystep instanceof FractionX)) ystep = fraction(ystep)
  if (!(ytick instanceof Fraction || ytick instanceof FractionX)) ytick = fraction(ytick)
  ObjetMathalea2D.call(this, { })
  const objets = []
  objets.push(texteParPoint(titre, point(-1 - thick - 0.1, ymax), 'gauche', color))
  const ordonnee = segment(-1, ymin, -1, ymax, color)
  ordonnee.styleExtremites = '->'
  ordonnee.epaisseur = epaisseur
  objets.push(ordonnee)
  for (let y = ymin; y < ymax; y = fraction(y).add(ystep)) {
    const s = segment(-1 - thick, y, -1, y, color)
    s.epaisseur = epaisseur
    objets.push(s)
  }
  for (let y = ymin; y < ymax; y = fraction(y).add(ystep.div(ytick))) {
    const s = segment(-1 - thick / 2, y, -1, y, color)
    s.epaisseur = epaisseur
    objets.push(s)
  }
  this.bordures = [1000, 1000, -1000, -1000]
  for (const objet of objets) {
    if (objet.bordures !== undefined) { this.bordures = [Math.min(this.bordures[0], objet.bordures[0]), Math.min(this.bordures[1], objet.bordures[1]), Math.max(this.bordures[2], objet.bordures[2]), Math.max(this.bordures[3], objet.bordures[3])] }
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
   * Trace une droite verticale graduée
   * @param {number} [ymin=-2] Valeur minimale sur l'axe vertical
   * @param {number} [ymax=5] Valeur maximale sur l'axe vertical
   * @param {number} [thick=0.2] Largeur des tirets de chaque graduation principale
   * @param {number} [ystep=1] Pas sur l'axe des ordonnées
   * @param {number} [epaisseur=2] Epaisseur des deux axes
   * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
   * @param {number} [ytick=2] Nombre de partage entre deux graduations principales
   * @param {string} [titre=''] Titre de l'axe
   * @example axeY()
   * // Trace un axe noir vertical gradué de -2 à 5, de 1 en 1, avec une petite graduation entre deux graduations principales (de longueur 0.2 et d'épaisseur 2), et sans titre
   * @example axeY(0,10,0.25,2,1,'red',5,'titre')
   * // Trace un axe rouge vertical gradué de 0 à 10, de 2 en 2, avec quatre petites graduations entre deux graduations principales (de longueur 0.25 et d'épaisseur 1), et avec comme titre de l'axe : titre
   * @author Frédéric Piou
   * @return {AxeY}
  */
// JSDOC Validee par EE Juin 2022
export function axeY (
  ymin = -2,
  ymax = 5,
  thick = 0.2,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
  ytick = 2,
  titre = ''
) {
  return new AxeY(ymin, ymax, thick, ystep, epaisseur, color, ytick, titre)
}

/**  Place des labels sur un axe vertical précédemment
   * @param  {number} [ymin = 1] Ordonnée minimale sur l'axe
   * @param  {number} [ymax = 20] Ordonnée maximale sur l'axe
   * @param  {number} [step = 1] Pas entre chaque label
   * @param {string} [color = 'black'] Couleur des labels : du type 'blue' ou du type '#f15929'
   * @param  {number} [pos = -0.6] Décalage entre les labels et l'axe vertical
   * @param  {number} [coeff = 1] Coefficient multiplicatif sur chaque label
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @author Rémi Angot modifié par Frédéric Piou
   * @class
   */
// JSDOC Validee par EE Septembre 2022
function LabelY (ymin = 1, ymax = 20, step = 1, color = 'black', pos = -0.6, coeff = 1) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  for (let y = ceil(ymin / coeff);
    y * coeff <= ymax;
    y = y + step
  ) {
    objets.push(
      texteParPoint(
        stringNombre(y * coeff, 3),
        point(pos, y),
        'gauche',
        color, 1, 'middle', true
      )
    )
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

/**  Place des labels sur un axe vertical précédemment
   * @param  {number} [ymin = 1] Ordonnée minimale sur l'axe
   * @param  {number} [ymax = 20] Ordonnée maximale sur l'axe
   * @param  {number} [step = 1] Pas entre chaque label
   * @param {string} [color = 'black'] Couleur des labels : du type 'blue' ou du type '#f15929'
   * @param  {number} [pos = -0.6] Décalage entre les labels et l'axe vertical
   * @param  {number} [coeff = 1] Coefficient multiplicatif sur chaque label
   * @example labelY()
   * // Note, sur un axe (prédéfini de 1 en 1), des labels noirs, de 0 à 20, de 2 en 2, avec un décalage de -0,6 par rapport à l'axe
   * @example labelY(0, 160, 2, 'red', -2, 20)
   * // Note, sur un axe (prédéfini de 1 en 1), des labels rouges, de 0 à 160, de 40 (2*20) en 40, avec un décalage de -2 par rapport à l'axe.
   * @author Rémi Angot modifié par Frédéric Piou
   * @return {LabelY}
   */
// JSDOC Validee par EE Septembre 2022
export function labelY (ymin = 1, ymax = 20, step = 1, color = 'black', pos = -0.6, coeff = 1) {
  return new LabelY(ymin, ymax, step, color, pos, coeff)
}

/**
 * repere({xUnite, yUnite, xMin, xMax, yMin, yMax, axeX, axeY, axesEpaisseur, axesCouleur, axeXStyle, axeYStyle, thickEpaisseur,
 * thickHauteur, thickCouleur, xThickDistance, xThickListe, xThickMin, xThickMax, yThickDistance, yThickListe,
 * yThickMin, yThickMax, xLabelDistance, xLabelListe, xLabelMin, xLabelMax, yLabelDistance, yLabelListe,
 * yLabelMin, yLabelMax, xLegende,xLegendePosition, yLegende, yLegendePosition, grille, grilleDistance,
 * grilleCouleur,grilleOpacite, grilleEpaisseur, grilleSecondaire, grilleSecondaireDistance, grilleSecondaireCouleur,
 * grilleSecondaireOpacite, grilleSecondaireEpaisseur, grilleX, grilleXListe, grilleXDistance, grilleXMin, grilleXMax,
 * grilleXCouleur, grilleXOpacite, grilleY, grilleYListe, grilleYDistance, grilleYMin, grilleYMax, grilleYCouleur,
 * grilleYOpacite, grilleSecondaireX, grilleSecondaireXListe, grilleSecondaireXDistance, grilleSecondaireXMin, grilleSecondaireXMax,
 * grilleSecondaireXCouleur, grilleSecondaireXOpacite, grilleSecondaireY, grilleSecondaireYListe, grilleSecondaireYDistance,
 * grilleSecondaireYMin, grilleSecondaireYMax, grilleSecondaireYCouleur, grilleSecondaireYOpacite})
 *
 * repere() trace un repère classique. De nombreux paramètres permettent d'en modifier l'aspect
 *
 * @author Rémi Angot
 */

function Repere ({
  xUnite = 1,
  yUnite = 1,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  axeXisVisible = true,
  axeYisVisible = true,
  axesEpaisseur = 2,
  axesCouleur = 'black',
  axeXStyle = '->',
  axeYStyle = '->',
  thickEpaisseur = 2,
  thickHauteur = 0.2,
  thickCouleur = axesCouleur,
  xThickDistance = 1,
  xThickListe = false,
  xThickMin = xMin + xThickDistance,
  xThickMax = xMax - xThickDistance,
  yThickDistance = 1,
  yThickListe = false,
  yThickMin = yMin + yThickDistance,
  yThickMax = yMax - yThickDistance,
  xLabelDistance = xThickDistance,
  xLabelListe = false,
  xLabelMin = xThickMin,
  xLabelMax = xThickMax,
  yLabelDistance = yThickDistance,
  yLabelListe = false,
  yLabelMin = yThickMin,
  yLabelMax = yThickMax,
  precisionLabelX = 1,
  precisionLabelY = 1,
  xLabelEcart = 0.5,
  yLabelEcart = 0.5,
  xLegende = '',
  xLegendePosition = [xMax * xUnite + 0.5, 0.5],
  yLegende = '',
  yLegendePosition = [0.5, yMax * yUnite + 0.5],
  grille = true,
  grilleDistance = false,
  grilleCouleur = 'black',
  grilleOpacite = 0.5,
  grilleEpaisseur = 1,
  grilleSecondaire = false,
  grilleSecondaireDistance = false,
  grilleSecondaireCouleur = 'gray',
  grilleSecondaireOpacite = 0.3,
  grilleSecondaireEpaisseur = 1,
  grilleX = grille,
  grilleXListe = false,
  grilleXDistance = grilleDistance,
  grilleXMin = false,
  grilleXMax = false,
  grilleXCouleur = grilleCouleur,
  grilleXOpacite = grilleOpacite,
  grilleY = grille,
  grilleYListe = false,
  grilleYDistance = grilleDistance,
  grilleYMin = false,
  grilleYMax = false,
  grilleYCouleur = grilleCouleur,
  grilleYOpacite = grilleOpacite,
  grilleSecondaireX = grilleSecondaire,
  grilleSecondaireXListe = false,
  grilleSecondaireXDistance = grilleSecondaireDistance,
  grilleSecondaireXMin = false,
  grilleSecondaireXMax = false,
  grilleSecondaireXCouleur = grilleSecondaireCouleur,
  grilleSecondaireXOpacite = grilleSecondaireOpacite,
  grilleSecondaireY = grilleSecondaire,
  grilleSecondaireYListe = false,
  grilleSecondaireYDistance = grilleSecondaireDistance,
  grilleSecondaireYMin = false,
  grilleSecondaireYMax = false,
  grilleSecondaireYCouleur = grilleSecondaireCouleur,
  grilleSecondaireYOpacite = grilleSecondaireOpacite
}) {
  ObjetMathalea2D.call(this, { })

  // Les propriétés exportables
  this.xUnite = xUnite
  this.yUnite = yUnite
  this.xMin = xMin
  this.xMax = xMax
  this.yMin = yMin
  this.yMax = yMax

  this.bordures = [xMin * xUnite - 1, yMin * yUnite - 1, xMax * xUnite + 1 + xLegende.length / 3, yMax * yUnite + 1]

  const objets = []
  // LES AXES
  const ordonneeAxe = Math.max(0, yMin)
  xLegendePosition = [xMax * xUnite + 0.5, 0.5 + ordonneeAxe]
  const axeX = segment(xMin * xUnite, ordonneeAxe * yUnite, xMax * xUnite, ordonneeAxe * yUnite, axesCouleur)
  axeX.epaisseur = axesEpaisseur
  axeX.styleExtremites = axeXStyle
  const abscisseAxe = Math.max(0, xMin)
  yLegendePosition = [0.5 + abscisseAxe, yMax * yUnite + 0.5]
  const axeY = segment(abscisseAxe * xUnite, yMin * yUnite, abscisseAxe * xUnite, yMax * yUnite, axesCouleur)
  axeY.epaisseur = axesEpaisseur
  axeY.styleExtremites = axeYStyle
  if (axeXisVisible) objets.push(axeX)
  if (axeYisVisible) objets.push(axeY)
  // Cache les objets intermédiaires pour ne pas les afficher en double dans mathalea2d.html
  axeX.isVisible = false
  axeY.isVisible = false
  // GRILLE PRINCIPALE

  // Les traits horizontaux
  if (grilleY) {
    if (!grilleYListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof (grilleYMin) !== 'number') {
        grilleYMin = yThickMin
      }
      if (typeof (grilleYMax) !== 'number') {
        grilleYMax = yThickMax
      }
      if (!grilleYDistance) {
        grilleYDistance = yThickDistance
      }
      // On créé la liste avec ces valeurs
      grilleYListe = rangeMinMax(grilleYMin, grilleYMax, [], grilleYDistance)
    }
    for (const y of grilleYListe) {
      if (y !== 0 || !axeXisVisible) {
        const traitH = segment(xMin * xUnite, y * yUnite, xMax * xUnite, y * yUnite, grilleYCouleur)
        traitH.isVisible = false
        traitH.opacite = grilleYOpacite
        traitH.epaisseur = grilleEpaisseur
        if (grilleY === 'pointilles') {
          traitH.pointilles = 5
        }
        objets.push(traitH)
      }
    }
  }
  // Les traits verticaux
  if (grilleX) {
    if (!grilleXListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof (grilleXMin) !== 'number') {
        grilleXMin = xThickMin
      }
      if (typeof (grilleXMax) !== 'number') {
        grilleXMax = xThickMax
      }
      if (typeof (grilleXDistance) !== 'number') {
        grilleXDistance = xThickDistance
      }
      // On créé la liste avec ces valeurs
      grilleXListe = rangeMinMax(grilleXMin, grilleXMax, [], grilleXDistance)
    }
    for (const x of grilleXListe) {
      if (x !== 0 || !axeYisVisible) {
        const traitV = segment(x * xUnite, yMin * yUnite, x * xUnite, yMax * yUnite, grilleXCouleur)
        traitV.isVisible = false
        traitV.opacite = grilleXOpacite
        traitV.epaisseur = grilleEpaisseur
        if (grilleX === 'pointilles') {
          traitV.pointilles = 5
        }
        objets.push(traitV)
      }
    }
  }

  // GRILLE SECONDAIRE

  // Les traits horizontaux
  if (grilleSecondaireY) {
    if (!grilleSecondaireYListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof (grilleSecondaireYMin) !== 'number') {
        grilleSecondaireYMin = yThickMin
      }
      if (typeof (grilleSecondaireYMax) !== 'number') {
        grilleSecondaireYMax = yThickMax
      }
      if (typeof (grilleSecondaireYDistance) !== 'number') {
        grilleSecondaireYDistance = yThickDistance / 2
      }
      // On créé la liste avec ces valeurs
      grilleSecondaireYListe = rangeMinMax(grilleSecondaireYMin, grilleSecondaireYMax, grilleYListe, grilleSecondaireYDistance)
    }
    for (const y of grilleSecondaireYListe) {
      const traitH = segment(xMin * xUnite, y * yUnite, xMax * xUnite, y * yUnite, grilleSecondaireYCouleur)
      traitH.isVisible = false
      traitH.opacite = grilleSecondaireYOpacite
      traitH.epaisseur = grilleSecondaireEpaisseur
      if (grilleSecondaireY === 'pointilles') {
        traitH.pointilles = 5
      }
      objets.push(traitH)
    }
  }
  // Les traits verticaux
  if (grilleSecondaireX) {
    if (!grilleSecondaireXListe) {
      // Ceux qui ne sont pas définis reprennent les valeurs de thick
      if (typeof (grilleSecondaireXMin) !== 'number') {
        grilleSecondaireXMin = xThickMin
      }
      if (typeof (grilleSecondaireXMax) !== 'number') {
        grilleSecondaireXMax = xThickMax
      }
      if (typeof (grilleSecondaireXDistance) !== 'number') {
        grilleSecondaireXDistance = xThickDistance / 2
      }
      // On créé la liste avec ces valeurs
      grilleSecondaireXListe = rangeMinMax(grilleSecondaireXMin, grilleSecondaireXMax, grilleXListe, grilleSecondaireXDistance)
    }
    for (const x of grilleSecondaireXListe) {
      const traitV = segment(x * xUnite, yMin * yUnite, x * xUnite, yMax * yUnite, grilleSecondaireXCouleur)
      traitV.isVisible = false
      traitV.opacite = grilleSecondaireXOpacite
      traitV.epaisseur = grilleSecondaireEpaisseur
      if (grilleSecondaireX === 'pointilles') {
        traitV.pointilles = 5
      }
      objets.push(traitV)
    }
  }
  // LES THICKS
  if (axeXisVisible) {
    if (!xThickListe) {
      xThickListe = rangeMinMax(xThickMin, xThickMax, [0], xThickDistance)
    }
    for (const x of xThickListe) {
      const thick = segment(x * xUnite, ordonneeAxe * yUnite - thickHauteur, x * xUnite, ordonneeAxe * yUnite + thickHauteur, thickCouleur)
      thick.isVisible = false
      thick.epaisseur = thickEpaisseur
      objets.push(thick)
    }
  }
  if (axeYisVisible) {
    if (!yThickListe) {
      yThickListe = rangeMinMax(yThickMin, yThickMax, [0], yThickDistance)
    }
    for (const y of yThickListe) {
      const thick = segment(abscisseAxe * xUnite - thickHauteur, y * yUnite, abscisseAxe * xUnite + thickHauteur, y * yUnite, thickCouleur)
      thick.isVisible = false
      thick.epaisseur = thickEpaisseur
      objets.push(thick)
    }
  }
  // LES LABELS
  if (axeXisVisible) {
    if (!xLabelListe) {
      xLabelListe = rangeMinMax(xLabelMin, xLabelMax, [0], xLabelDistance)
    }
    for (const x of xLabelListe) {
      const l = texteParPosition(`${stringNombre(x, precisionLabelX)}`, x * xUnite, ordonneeAxe * yUnite - xLabelEcart, 'milieu', 'black', 1, 'middle', true)
      l.isVisible = false
      objets.push(l)
    }
  }
  if (axeYisVisible) {
    if (!yLabelListe) {
      yLabelListe = rangeMinMax(yLabelMin, yLabelMax, [0], yLabelDistance)
    }
    for (const y of yLabelListe) {
      const l = texteParPosition(`${stringNombre(y, precisionLabelY)}`, abscisseAxe * xUnite - yLabelEcart, y * yUnite, 'milieu', 'black', 1, 'middle', true)
      l.isVisible = false
      objets.push(l)
    }
  }
  // LES LÉGENDES
  if (xLegende.length > 0) {
    objets.push(texteParPosition(xLegende, xLegendePosition[0], xLegendePosition[1], 'droite'))
  }
  if (yLegende.length > 0) {
    objets.push(texteParPosition(yLegende, yLegendePosition[0], yLegendePosition[1], 'droite'))
  }

  // LES SORTIES TiKZ et SVG
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
      if (typeof (objet.svgml) === 'undefined') code += '\n\t' + objet.svg(coeff)
      else code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    for (const objet of objets) {
      if (typeof (objet.tikzml) === 'undefined') code += '\n\t' + objet.tikz()
      else code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}
/**
   *
   * @param {object} param0
   * @return {object}
   */
export function repere ({
  xUnite = 1,
  yUnite = 1,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  axeXisVisible = true,
  axeYisVisible = true,
  axesEpaisseur = 2,
  axesCouleur = 'black',
  axeXStyle = '->',
  axeYStyle = '->',
  thickEpaisseur = 2,
  thickHauteur = 0.2,
  thickCouleur = axesCouleur,
  xThickDistance = 1,
  xThickListe = false,
  xThickMin = xMin + xThickDistance,
  xThickMax = xMax - xThickDistance,
  yThickDistance = 1,
  yThickListe = false,
  yThickMin = yMin + yThickDistance,
  yThickMax = yMax - yThickDistance,
  xLabelDistance = xThickDistance,
  xLabelListe = false,
  xLabelMin = xThickMin,
  xLabelMax = xThickMax,
  yLabelDistance = yThickDistance,
  yLabelListe = false,
  yLabelMin = yThickMin,
  yLabelMax = yThickMax,
  precisionLabelX = 1,
  precisionLabelY = 1,
  xLabelEcart = 0.5,
  yLabelEcart = 0.5,
  xLegende = '',
  xLegendePosition = [xMax * xUnite + 0.5, 0.5],
  yLegende = '',
  yLegendePosition = [0.5, yMax * yUnite + 0.5],
  grille = true,
  grilleDistance = false,
  grilleCouleur = 'black',
  grilleOpacite = 0.5,
  grilleEpaisseur = 1,
  grilleSecondaire = false,
  grilleSecondaireDistance = 0.1,
  grilleSecondaireCouleur = 'gray',
  grilleSecondaireOpacite = 0.3,
  grilleSecondaireEpaisseur = 1,
  grilleX = grille,
  grilleXListe = false,
  grilleXDistance = grilleDistance,
  grilleXMin = false,
  grilleXMax = false,
  grilleXCouleur = grilleCouleur,
  grilleXOpacite = grilleOpacite,
  grilleY = grille,
  grilleYListe = false,
  grilleYDistance = grilleDistance,
  grilleYMin = false,
  grilleYMax = false,
  grilleYCouleur = grilleCouleur,
  grilleYOpacite = grilleOpacite,
  grilleSecondaireX = grilleSecondaire,
  grilleSecondaireXListe = false,
  grilleSecondaireXDistance = grilleSecondaireDistance,
  grilleSecondaireXMin = false,
  grilleSecondaireXMax = false,
  grilleSecondaireXCouleur = grilleSecondaireCouleur,
  grilleSecondaireXOpacite = grilleSecondaireOpacite,
  grilleSecondaireY = grilleSecondaire,
  grilleSecondaireYListe = false,
  grilleSecondaireYDistance = grilleSecondaireDistance,
  grilleSecondaireYMin = false,
  grilleSecondaireYMax = false,
  grilleSecondaireYCouleur = grilleSecondaireCouleur,
  grilleSecondaireYOpacite = grilleSecondaireOpacite
} = {}) {
  return new Repere({
    xUnite,
    yUnite,
    xMin,
    xMax,
    yMin,
    yMax,
    axeXisVisible,
    axeYisVisible,
    axesEpaisseur,
    axesCouleur,
    axeXStyle,
    axeYStyle,
    thickEpaisseur,
    thickHauteur,
    thickCouleur,
    xThickDistance,
    xThickListe,
    xThickMin,
    xThickMax,
    yThickDistance,
    yThickListe,
    yThickMin,
    yThickMax,
    xLabelDistance,
    xLabelListe,
    xLabelMin,
    xLabelMax,
    yLabelDistance,
    yLabelListe,
    yLabelMin,
    yLabelMax,
    precisionLabelX,
    precisionLabelY,
    xLabelEcart,
    yLabelEcart,
    xLegende,
    xLegendePosition,
    yLegende,
    yLegendePosition,
    grille,
    grilleDistance,
    grilleCouleur,
    grilleOpacite,
    grilleEpaisseur,
    grilleSecondaire,
    grilleSecondaireDistance,
    grilleSecondaireCouleur,
    grilleSecondaireOpacite,
    grilleSecondaireEpaisseur,
    grilleX,
    grilleXListe,
    grilleXDistance,
    grilleXMin,
    grilleXMax,
    grilleXCouleur,
    grilleXOpacite,
    grilleY,
    grilleYListe,
    grilleYDistance,
    grilleYMin,
    grilleYMax,
    grilleYCouleur,
    grilleYOpacite,
    grilleSecondaireX,
    grilleSecondaireXListe,
    grilleSecondaireXDistance,
    grilleSecondaireXMin,
    grilleSecondaireXMax,
    grilleSecondaireXCouleur,
    grilleSecondaireXOpacite,
    grilleSecondaireY,
    grilleSecondaireYListe,
    grilleSecondaireYDistance,
    grilleSecondaireYMin,
    grilleSecondaireYMax,
    grilleSecondaireYCouleur,
    grilleSecondaireYOpacite
  })
}

/**
   * Place un point dans un repère (en récupérant xUnite et yUnite d'un objet repère)
   *
   *
   * @param {integer} x
   * @param {integer} y
   * @param {object} repere
   * @author Rémi Angot
   */
export function pointDansRepere (x, y, repere = { xUnite: 1, yUnite: 1 }) {
  return point(x * repere.xUnite, y * repere.yUnite)
}
