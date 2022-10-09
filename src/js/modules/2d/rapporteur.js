import { ObjetMathalea2D } from '../2dGeneralites'
import { arc } from './arc'
import { point } from './point'
import { pointSurSegment } from './pointsur'
import { segment } from './segment'
import { texteParPoint } from './textes'
import { homothetie, rotation } from './transformations'

function Rapporteur ({ x = 0, y = 0, taille = 7, depart = 0, semi = false, avecNombre = 'deuxSens', precisionAuDegre = 1, stepGraduation = 10, rayonsVisibles = true, color = 'gray' }) {
  ObjetMathalea2D().call(this, { })
  this.x = x
  this.y = y
  this.taille = taille
  this.opacite = 0.7
  this.color = color
  const objets = []
  let numero
  let azimut
  let rayon
  let nbDivisions
  let arcPlein
  if (semi) {
    arcPlein = 180
    nbDivisions = 18
  } else {
    arcPlein = 360
    nbDivisions = 36
  }

  const centre = point(this.x, this.y)
  azimut = rotation(point(this.x + 1, this.y), centre, depart)
  let azimut2 = pointSurSegment(centre, azimut, this.taille)
  const arc1 = arc(azimut, centre, arcPlein - 0.1, false, 'none', this.color)
  const arc2 = arc(azimut2, centre, arcPlein - 0.1, false, 'none', this.color)
  // objets.push(segment(centre, azimut2, this.color))
  objets.push(segment(azimut2, rotation(azimut2, centre, 180), this.color))
  rayon = segment(azimut, azimut2, this.color)
  if (rayonsVisibles) objets.push(arc1)
  // objets.push(arc2, rayon)
  objets.push(arc2)
  for (let i = 0; i < nbDivisions; i++) {
    if (avecNombre !== '') {
      if (avecNombre === 'deuxSens') {
        if (i === 0) {
          numero = texteParPoint(arcPlein, rotation(homothetie(azimut2, centre, 0.8), centre, 2), -depart, this.color)
          numero.contour = true
          objets.push(numero)
        }
        if (i === nbDivisions - 1) {
          numero = texteParPoint(arcPlein - (1 + i) * 10, rotation(homothetie(azimut2, centre, 0.8), centre, arcPlein / nbDivisions - 2), -depart, this.color)
          numero.contour = true
          objets.push(numero)
        } else if ((arcPlein - (1 + i) * 10) % stepGraduation === 0) {
          numero = texteParPoint(arcPlein - (1 + i) * 10, rotation(homothetie(azimut2, centre, 0.8), centre, arcPlein / nbDivisions), 90 - (1 + i) * 10 - depart, this.color)
          numero.contour = true
          objets.push(numero)
        }
      }
      if (i === 0) {
        numero = texteParPoint('0', rotation(homothetie(azimut2, centre, 0.9), centre, 2), -depart, this.color)
        numero.contour = true
        objets.push(numero)
      }
      if (i === nbDivisions - 1) {
        numero = texteParPoint((1 + i) * 10, rotation(homothetie(azimut2, centre, 0.9), centre, arcPlein / nbDivisions - 2), -depart, this.color)
        numero.contour = true
        objets.push(numero)
      } else if ((i + 1) * 10 % stepGraduation === 0) {
        numero = texteParPoint((1 + i) * 10, rotation(homothetie(azimut2, centre, 0.9), centre, arcPlein / nbDivisions), 90 - (1 + i) * 10 - depart, this.color)
        numero.contour = true
        objets.push(numero)
      }
    }
    for (let s = 1, r; s < 10; s++) {
      if (s === 5 && precisionAuDegre < 10) {
        r = segment(homothetie(rotation(azimut2, centre, s), centre, 0.92), homothetie(rotation(azimut2, centre, s), centre, 0.99), this.color)
        r.opacite = 0.6
        objets.push(r)
      } else if (precisionAuDegre === 1) {
        r = segment(homothetie(rotation(azimut2, centre, s), centre, 0.96), homothetie(rotation(azimut2, centre, s), centre, 0.99), this.color)
        r.opacite = 0.6
        objets.push(r)
      }
    }
    if ((i !== 0) && (i !== 36) && (i !== 18)) objets.push(rayon)
    azimut = rotation(azimut, centre, arcPlein / nbDivisions)
    azimut2 = rotation(azimut2, centre, arcPlein / nbDivisions)
    if (rayonsVisibles) rayon = segment(azimut, azimut2, this.color)
    else rayon = segment(homothetie(azimut2, centre, 0.9), azimut2, this.color)
    rayon.opacite = this.opacite
  }
  if (!semi) {
    rayon = segment(homothetie(rotation(azimut, centre, -90), centre, -0.2), homothetie(rotation(azimut, centre, -90), centre, 0.2), this.color)
    objets.push(rayon)
    rayon = segment(homothetie(azimut, centre, -0.2), homothetie(azimut, centre, 0.2), this.color)
  } else {
    rayon = segment(centre, homothetie(rotation(azimut, centre, -90), centre, 0.2), this.color)
  }
  objets.push(rayon)
  this.bordures = [x - taille - 1, y - taille - 1, x + taille + 1, y + taille + 1]

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
   * place un rapporteur centré en (x,y) avec le zéro orienté à depart degrés.
   * @param {boolean} semi si semi === false alors les graduations vont de 0 à 180° sinon de 0 à 360°
   * @param {string} avecNombre === "", il n'y a pas de graduations, si avecNombre === "deuxSens" il est gradué dans les deux directions
   * si avecNombre === "unSens" il est gradué dans le sens trigo.
   * @param {number} precisionAuDegre === 10 alors il n'y aura pas de graduations entre les multiples de 10°, les autres valeurs sont 5 et 1.
   * @param {number} stepGraduation est un multiple de 10 qui divise 180 (c'est mieux) donc 10 (par défaut), ou 20, ou 30, ou 60 ou 90.
   * @param {boolean} rayonsVisibles = false permet de supprimer les rayons et le cercle central
   * @param {object} param0 = {x: 'number', y: 'number', taille: 'number', semi: boolean, avecNombre: string}
   * @return {Rapporteur} // crée un instance de l'objet 2d Rapporteur
   */
export function rapporteur ({ x = 0, y = 0, taille = 7, depart = 0, semi = false, avecNombre = 'deuxSens', precisionAuDegre = 1, stepGraduation = 10, rayonsVisibles = true, color = 'gray' }) {
  return new Rapporteur({ x, y, taille, depart, semi, avecNombre, precisionAuDegre, stepGraduation, rayonsVisibles, color })
}
