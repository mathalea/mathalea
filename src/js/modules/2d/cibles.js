
/**  Retourne un couple de coordonnées correspondant au centre d'une cible, connaissant les coordonnées du point réponse et de la cellule dans laquelle on veut qu'il soit
 * @param {number} x Abscisse du point réponse
 * @param {number} y Ordonnée du point réponse
 * @param {number} rang Nombre de cases en largeur
 * @param {number} taille Taille des cases
 * @param {string} cellule Cellule de la réponse, chaine définie par exemple comme 'A1' ou 'B3'
 * @example dansLaCibleCarree(-1, -3, 4, 0.6, 'B2')
  // Retourne les coordonnées du centre d'une cible carrée de rang 4 et de taille 0.6 dont la réponse est le point (-1;-3) dans la cellule B2
  * @return {number[]|string} Ce sont les coordonnées du centre de la cible ou bien 'Cette cellule n'existe pas dans la cible'
 * @author Jean-Claude Lhote
 */

import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { arrondi, lettreDepuisChiffre, nombreAvecEspace, randint } from '../outils'
import { arc } from './arc'
import { milieu } from './barycentre'
import { longueur } from './calculs'
import { cercle } from './cercle'
import { grille } from './grilles'
import { labelPoint } from './labelpoint'
import { point } from './point'
import { pointSurSegment } from './pointsur'
import { segment } from './segment'
import { texteParPoint, texteParPosition } from './textes'
import { rotation, similitude } from './transformations'

// JSDOC Validee par EE Aout 2022
export function dansLaCibleCarree (x, y, rang, taille, cellule) {
  const lettre = cellule[0]; const chiffrelettre = lettre.charCodeAt(0) - 64
  const chiffre = parseInt(cellule[1])
  // dx et dy étaient utilisés pour décentrer le point dans la cellule... cela pouvait entrainer des points très proches des cellules voisines
  // en recentrant les points dans les cellules, on tolère une plus grande marge d'erreur.
  const dx = 0 // Devenu inutile
  const dy = 0 // Devenu inutile
  const delta = taille / 2
  if (chiffre > rang || chiffrelettre > rang) return 'Cette cellule n\'existe pas dans la cible'
  else {
    return [x + dx - chiffrelettre * taille + delta + rang * delta, y + dy - chiffre * 2 * delta + (rang + 1) * delta]
  }
}

/**
   * Crée une cible carrée pour l'auto-correction
   * @param {number} [x=0] Abscisse du point au centre de la cible
   * @param {number} [y=0] Ordonnée du point au centre de la cible
   * @param {number} [rang=4] Nombre de cases en largeur
   * @param {number} [num] Numéro (ou rien) pour identifier la cible (quand il y en a plusieurs)
   * @param {number} [taille=0.6] Taille des cases
   * @param {string} [color='gray'] Couleur de la cible. Code couleur HTML acceptée
   * @param {number} [opacite=0.5] Opacité de la cible
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {number} x Abscisse du point au centre de la cible
   * @property {number} y Ordonnée du point au centre de la cible
   * @property {number} rang Nombre de cases en largeur
   * @property {number} taille Taille des cases
   * @property {string} color Couleur de la cible. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} opacite Opacité de la cible
   * @author Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CibleCarree ({ x = 0, y = 0, rang = 4, num, taille = 0.6, color = 'gray', opacite = 0.5 }) {
  ObjetMathalea2D.call(this, { })
  this.x = x
  this.y = y
  this.rang = rang
  this.taille = taille
  this.color = color
  this.opacite = opacite
  const objets = []
  let numero
  // Si un numéro est donné, alors on l'ajoute en filigrane.
  if (typeof (num) !== 'undefined') {
    numero = texteParPosition(num, this.x - this.rang * this.taille / 4, this.y - this.rang * this.taille / 4, 'milieu', this.color)
    numero.opacite = 0.5
    numero.taille = 30 * this.taille
    numero.contour = true
    objets.push(numero)
  }
  let lettre, chiffre
  // la grille de la cible
  objets.push(grille(arrondi(this.x - this.rang * this.taille / 2), arrondi(this.y - this.rang * this.taille / 2), arrondi(this.x + this.rang * this.taille / 2), arrondi(this.y + this.rang * this.taille / 2), this.color, this.opacite, this.taille, false))
  for (let i = 0; i < rang; i++) {
    lettre = texteParPosition(lettreDepuisChiffre(1 + i), this.x - this.rang * this.taille / 2 + (2 * i + 1) * this.taille / 2, this.y - (this.rang + 1) * this.taille / 2, 'milieu')
    chiffre = texteParPosition(i + 1, this.x - (this.rang + 1) * this.taille / 2, this.y - this.rang * this.taille / 2 + (2 * i + 1) * this.taille / 2, 'milieu')
    lettre.taille = 10 * this.taille
    chiffre.taille = 10 * this.taille
    objets.push(lettre)
    objets.push(chiffre)
  }
  // on définit les bordures (important car les cibles se placent souvent aléatoirement)
  let xmin = 1000
  let ymin = 1000
  let xmax = -1000
  let ymax = -1000
  for (const objet of objets) {
    if (objet.bordures !== undefined) {
      xmin = Math.min(xmin, objet.bordures[0])
      ymin = Math.min(ymin, objet.bordures[1])
      xmax = Math.max(xmax, objet.bordures[2])
      ymax = Math.max(ymax, objet.bordures[3])
    }
  }
  this.bordures = [xmin, ymin, xmax, ymax]
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
   * Crée une cible carrée pour l'auto-correction
   * @param {number} [x = 0] Abscisse du point au centre de la cible
   * @param {number} [y = 0] Ordonnée du point au centre de la cible
   * @param {number} [rang = 4] Nombre de cases en largeur
   * @param {number} [num] Numéro (ou rien) pour identifier la cible (quand il y en a plusieurs)
   * @param {number} [taille = 0.6] Taille des cases
   * @param {string} [color = 'gray'] Couleur de la cible. Code couleur HTML acceptée
   * @param {number} [opacite = 0.5] Opacité de la cible
   * @example cibleCarree({})
   * // Crée une cible Carree, de centre (0,0), avec 4 carrés en largeur dont chacune a pour côté 0.6, de couleur grise avec une opacité de 50 %
   * @example cibleCarree({ x: 2, y: -1, rang: 5, num: 17, taille: 0.5, color: 'blue', opacite: 0.8 })
   * // Crée une cible Carree, de centre (2,-1), avec 5 carrés en largeur dont chacune a pour côté 0.5, de couleur bleue avec une opacité de 80 %, portant le numéro 17
   * @author Jean-Claude Lhote
   * @return {CibleCarree}
   */
// JSDOC Validee par EE Juin 2022
export function cibleCarree ({ x = 0, y = 0, rang = 4, num, taille = 0.6, color = 'gray', opacite = 0.5 }) {
  return new CibleCarree({ x: x, y: y, rang: rang, num: num, taille: taille, color: color, opacite: opacite })
}

/**  Retourne un couple de coordonnées correspondant au centre d'une cible, connaissant les coordonnées du point réponse et de la cellule dans laquelle on veut qu'il soit
   * @param {number} x Abscisse du point réponse
   * @param {number} y Ordonnée du point réponse
   * @param {number} rang Nombre de cases sur une couronne
   * @param {number} taille Différence entre deux rayons successifs
   * @param {string} cellule Cellule de la réponse, chaine définie par exemple comme 'A1' ou 'B3'
   * @example dansLaCibleCarree(-1, -3, 4, 0.6, 'B2')
    // Retourne les coordonnées du centre d'une cible ronde de rang 4 et de taille 0.6 dont la réponse est le point (-1;-3) dans la cellule B2
   * @return {number[]|string} Ce sont les coordonnées du centre de la cible ou bien 'Cette cellule n'existe pas dans la cible'
   * @author Jean-Claude Lhote
   */
// JSDOC Validee par EE Aout 2022
export function dansLaCibleRonde (x, y, rang, taille, cellule) {
  const lettre = cellule[0]; const chiffrelettre = lettre.charCodeAt(0) - 64
  const chiffre = parseInt(cellule[1])
  const drayon = 0
  const dangle = randint(-7, 7)
  const angle = (chiffrelettre - 1) * 45 - 157.5 + dangle
  const rayon = taille / 2 + (chiffre - 1) * taille + drayon
  const P = similitude(point(1, 0), point(0, 0), angle, rayon)
  P.x += x
  P.y += y
  if (chiffre > rang || chiffrelettre > 8) return 'Cette cellule n\'existe pas dans la cible'
  else {
    return [P.x, P.y]
  }
}

/**
   * Crée une cible ronde pour l'auto-correction
   * @param {number} [x=0] Abscisse du point au centre de la cible
   * @param {number} [y=0] Ordonnée du point au centre de la cible
   * @param {number} [rang=3] Nombre de cercles centrés sur le centre de la cible
   * @param {number} [taille=0.3] Distance entre le centre de la cible et le premier cercle (et entre chaque cercle consécutif)
   * @param {string} [color='gray'] Couleur de la cible. Code couleur HTML acceptée
   * @param {number} [opacite=0.5] Opacité de la cible
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {number} x Abscisse du point au centre de la cible
   * @property {number} y Ordonnée du point au centre de la cible
   * @property {number} rang Nombre de cercles centrés sur le centre de la cible
   * @property {number} taille Distance entre le centre de la cible et le premier cercle (et entre chaque cercle consécutif)
   * @property {string} color Couleur de la cible. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} opacite Opacité de la cible
   * @author Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CibleRonde ({ x = 0, y = 0, rang = 3, num, taille = 0.3, color = 'gray', opacite = 0.5 }) {
  ObjetMathalea2D.call(this, { })
  this.x = x
  this.y = y
  this.taille = taille
  this.rang = rang
  this.opacite = opacite
  this.color = color
  const objets = []
  let c
  let rayon
  const centre = point(this.x, this.y)
  const azimut = point(this.x + this.rang * this.taille, this.y)
  objets.push(labelPoint(centre))
  const azimut2 = pointSurSegment(centre, azimut, longueur(centre, azimut) + 0.3)
  this.bordures = [this.x - this.rang * this.taille - 1, this.y - this.rang * this.taille - 1, this.x + this.rang * this.taille + 1, this.y + this.rang * this.taille + 1]
  for (let i = 0; i < 8; i++) {
    rayon = segment(centre, rotation(azimut, centre, 45 * i), this.color)
    rayon.opacite = this.opacite
    objets.push(rayon)
    objets.push(texteParPoint(lettreDepuisChiffre(1 + i), rotation(azimut2, centre, 45 * i + 22.5), 'milieu'))
  }
  for (let i = 0; i < this.rang; i++) {
    c = cercle(centre, arrondi(this.taille * (1 + i)), this.color)
    c.opacite = this.opacite
    objets.push(c)
  }
  const numero = texteParPosition(nombreAvecEspace(num), this.x, this.y, 0, this.color)
  numero.opacite = 0.5
  numero.taille = 30
  numero.contour = true
  objets.push(numero)
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
   * Crée une cible ronde pour l'auto-correction
   * @param {number} [x=0] Abscisse du point au centre de la cible
   * @param {number} [y=0] Ordonnée du point au centre de la cible
   * @param {number} [rang=3] Nombre de cercles centrés sur le centre de la cible
   * @param {number} [taille=0.3] Distance entre le centre de la cible et le premier cercle (et entre chaque cercle consécutif)
   * @param {string} [color='gray'] Couleur de la cible. Code couleur HTML acceptée
   * @param {number} [opacite=0.5] Opacité de la cible
   * @example cibleRonde({})
   * // Crée une cible ronde, de centre (0,0), possédant 3 cercles, avec une distance de 0,3 entre chaque cercle consécutifu cercle intérieur est 5, de couleur grise avec une opacité de 50 %.
   * @example cibleRonde({ x: 2, y: -1, rang: 10, taille: 1, color: 'blue', opacite: 0.8 })
   * // Crée une cible ronde, de centre (2,-1), possédant 10 cercles, avec une distance de 1 entre chaque cercle consécutifu cercle intérieur est 5, de couleur bleue avec une opacité de 80 %.
   * @author Jean-Claude Lhote
   * @return {CibleRonde}
   */
// JSDOC Validee par EE Juin 2022
export function cibleRonde ({ x = 0, y = 0, rang = 3, num = 1, taille = 0.3, color = 'gray', opacite = 0.5 }) {
  return new CibleRonde({ x, y, rang, num, taille, color, opacite })
}
/**
   * Crée une cible couronne pour l'auto-correction
   * @param {number} [x=0] Abscisse du point au centre de la cible
   * @param {number} [y=0] Ordonnée du point au centre de la cible
   * @param {number} [taille=5] Rayon du cercle intérieur
   * @param {number} [taille2=1] Longueur des segments dans la couronne
   * @param {number} [depart=0] Valeur angulaire en degré du départ de la couronne
   * @param {number} [nbDivisions=18] Nombre de divisions de la couronne
   * @param {number} [nbSubDivisions=3] Nombre de subdivisions dans chaque division de la couronne
   * @param {boolean} [semi=false] Pour obtenir une cible semi-circulaire ou circulaire
   * @param {boolean} [label=true] Pour faire apparaître ou disparaître les lettres dans la couronne
   * @param {string} [color='gray'] Couleur de la cible. Code couleur HTML acceptée
   * @param {number} [opacite=0.5] Opacité de la cible
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {number} x Abscisse du point au centre de la cible
   * @property {number} y Ordonnée du point au centre de la cible
   * @property {number} depart Valeur angulaire en degré du départ de la couronne
   * @property {number} taille Rayon du cercle intérieur
   * @property {number} taille2 Longueur des segments dans la couronne
   * @property {string} color Couleur de la cible. À associer obligatoirement à colorToLatexOrHTML().
   * @property {number} opacite Opacité de la cible
   * @author Jean-Claude Lhote
   * @class
   */
// JSDOC Validee par EE Juin 2022
function CibleCouronne ({ x = 0, y = 0, taille = 5, taille2 = 1, depart = 0, nbDivisions = 18, nbSubDivisions = 3, semi = false, label = true, color = 'gray', opacite = 0.5 }) {
  ObjetMathalea2D.call(this, { })
  this.x = x
  this.y = y
  this.taille = taille
  this.taille2 = taille2
  this.opacite = opacite
  this.color = color
  this.depart = depart
  const objets = []
  let numero
  let azimut
  let rayon
  const arcPlein = semi ? 180 : 360
  const centre = point(this.x, this.y)
  azimut = rotation(point(this.x + this.taille, this.y), centre, this.depart)
  let azimut2 = pointSurSegment(centre, azimut, longueur(centre, azimut) + this.taille2)
  const rayons = []
  const arc1 = arc(azimut, centre, arcPlein - 0.1, false, 'none', this.color)
  const arc2 = arc(azimut2, centre, arcPlein - 0.1, false, 'none', this.color)
  rayon = segment(azimut, azimut2)

  objets.push(arc1, arc2, rayon)
  for (let i = 0; i < nbDivisions; i++) {
    for (let j = 1; j < nbSubDivisions; j++) {
      rayons[j - 1] = rotation(rayon, centre, j * arcPlein / nbDivisions / nbSubDivisions, this.color)
      rayons[j - 1].pointilles = 5
      rayons[j - 1].opacite = this.opacite
      objets.push(rayons[j - 1])
    }
    if (label) {
      numero = texteParPoint(lettreDepuisChiffre(1 + i), rotation(milieu(azimut, azimut2), centre, arcPlein / nbDivisions / 2), 'milieu')
      numero.contour = true
      objets.push(numero)
    }
    rayon.color = colorToLatexOrHTML(this.color)
    rayon.opacite = this.opacite
    objets.push(rayon)
    azimut = rotation(azimut, centre, arcPlein / nbDivisions)
    azimut2 = rotation(azimut2, centre, arcPlein / nbDivisions)
    rayon = segment(azimut, azimut2, this.color)
  }
  if (semi) {
    objets.push(rayon)
  }
  this.bordures = [this.x - taille - 1, this.y - this.taille - 1, this.x + this.taille + 1, this.y + this.taille + 1]

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
   * Crée une cible couronne pour l'auto-correction
   * @param {number} [x=0] Abscisse du point au centre de la cible
   * @param {number} [y=0] Ordonnée du point au centre de la cible
   * @param {number} [taille=5] Rayon du cercle intérieur
   * @param {number} [taille2=1] Longueur des segments dans la couronne
   * @param {number} [depart=0] Valeur angulaire en degré du départ de la couronne
   * @param {number} [nbDivisions=18] Nombre de divisions de la couronne
   * @param {number} [nbSubDivisions=3] Nombre de subdivisions dans chaque division de la couronne
   * @param {boolean} [semi=false] Pour obtenir une cible semi-circulaire ou circulaire
   * @param {boolean} [label=true] Pour faire apparaître ou disparaître les lettres dans la couronne
   * @param {string} [color='gray'] Couleur de la cible. Code couleur HTML acceptée
   * @param {number} [opacite=0.5] Opacité des segments de divisions et subdivisions
   * @example cibleCouronne({})
   * // Crée une cible couronne circulaire, de centre (0,0), dont le rayon du cercle intérieur est 5, la longueur des segments est 1, la première lettre démarre à 0°,
   * //    le nombre de divisions de la couronne est 18, le nombre de subdivisions est 3, leur opacité est 50 %, avec les lettres apparentes, de couleur grise
   * @example cibleCouronne({ x: 2, y: -1, taille: 4, taille2: 2, depart: 35, nbDivisions: 12, nbSubDivisions: 2, semi: true, label: false, color: 'blue', opacite: 0.8 })
   * // Crée une cible couronne semi-circulaire, de centre (2,-1), dont le rayon du cercle intérieur est 4, la longueur des segments est 2, la première lettre démarre à 35°,
   * //    le nombre de divisions de la couronne est 12, le nombre de subdivisions est 2, leur opacité est 80 %, avec les lettres non apparentes, de couleur bleue
   * @author Jean-Claude Lhote
   * @return {CibleCouronne}
   */
// JSDOC Validee par EE Juin 2022
export function cibleCouronne ({ x = 0, y = 0, taille = 5, taille2 = 1, depart = 0, nbDivisions = 18, nbSubDivisions = 3, semi = false, label = true, color = 'gray', opacite = 0.5 }) {
  return new CibleCouronne({ x, y, taille, taille2, depart, nbDivisions, nbSubDivisions, semi, label, color, opacite })
}
