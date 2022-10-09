import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { context } from '../context'
import { milieu } from './barycentre'
import { longueur } from './calculs'
import { cercle } from './cercle'
import { Droite, droite, droiteParPointEtPerpendiculaire } from './droites'
import { Point, point } from './point'
import { pointSurSegment } from './pointsur'
import { carre } from './polygone'
import { segment } from './segment'
import { rotation } from './transformations'

/**
 * @author Jean-Claude Lhote
 * @param {number} x abscisse
 * @param {number} y ordonnée
 * @param {object} param2 permet de définir le rayon du 'plot', sa couleur, sa couleur de remplissage
 */
function Plot (x, y, { rayon = 0.05, couleur = 'black', couleurDeRemplissage = 'black', opacite = 1, opaciteDeRemplissage = 1 } = {}) {
  ObjetMathalea2D.call(this, { })
  if (isNaN(x) || isNaN(y)) window.notify('Plot : les coordonnées ne sont pas valides', { x, y })
  this.color = colorToLatexOrHTML(couleur) // EE : 08/05/2022
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.rayon = rayon
  this.x = x
  this.y = y
  this.bordures = [x - rayon, y - rayon, x + rayon, y + rayon]
  this.opacite = opacite
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.svg = function (coeff) {
    if (this.couleurDeRemplissage === '') {
      return `\n\t <circle cx="${this.x * coeff}" cy="${-this.y * coeff}" r="${this.rayon * coeff}" stroke="${this.color[0]}" stroke-opacity="${this.opacite || 1}"/>`
    } else {
      return `\n\t <circle cx="${this.x * coeff}" cy="${-this.y * coeff}" r="${this.rayon * coeff}" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" stroke-opacity="${this.opacite || 1}" fill-opacity="${this.opaciteDeRemplissage || 1}"/>`
    }
  }
  this.tikz = function () {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line-width=${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity=${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity=${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '') {
      tableauOptions.push(`fill=${this.couleurDeRemplissage[1]}`)
    }
    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\n\t \\filldraw${optionsDraw} (${this.x},${this.y}) circle (${this.rayon});`
  }
}
export function plot (x, y, { rayon = 0.05, couleur = 'black', couleurDeRemplissage = 'black', opacite = 1, opaciteDeRemplissage = 1 } = {}) {
  return new Plot(x, y, { rayon: rayon, couleur: couleur, couleurDeRemplissage: couleurDeRemplissage, opacite: opacite, opaciteDeRemplissage: opaciteDeRemplissage })
}
/**
   * tracePoint(A) // Place une croix à l'emplacement du point A
   * tracePoint(A,B,C,D) // Place une croix pour les différents points
   * tracePoint(A,B,C,D,'blue') // Place une croix pour les différents points
   * Après coup, on peut notamment changer l'épaissseur, le style et l'opacité du point par :
   * pt = tracePoint(A)
   * pt.epaisseur = 5 (par défaut : 1)
   * pt.opacite = 0.2 (par défaut : 0.8 = 80%)
   * pt.style = '#' (choix parmi 'x','o','#','|','+','.' et par défaut : 'x')
   * @author Rémi Angot et Jean-Claude Lhote
   */
function TracePoint (...points) {
  ObjetMathalea2D.call(this, { })
  this.taille = 3
  this.tailleTikz = this.taille / 30
  this.epaisseur = 1
  this.opacite = 0.8
  this.style = 'x'
  let xmin = 1000
  let xmax = -1000
  let ymin = 1000
  let ymax = -1000
  let lePoint
  if (typeof points[points.length - 1] === 'string') {
    this.color = colorToLatexOrHTML(points[points.length - 1])
    points.length--
  } else this.color = colorToLatexOrHTML('black')
  for (const unPoint of points) {
    if (unPoint.typeObjet !== 'point3d' && unPoint.typeObjet !== 'point') window.notify('TracePoint : argument invalide', { ...points })
    lePoint = unPoint.typeObjet === 'point' ? unPoint : unPoint.c2d
    xmin = Math.min(xmin, lePoint.x - this.taille / context.pixelsParCm)
    xmax = Math.max(xmax, lePoint.x + this.taille / context.pixelsParCm)
    ymin = Math.min(ymin, lePoint.y - this.taille / context.pixelsParCm)
    ymax = Math.max(ymax, lePoint.y + this.taille / context.pixelsParCm)
  }
  this.bordures = [xmin, ymin, xmax, ymax]
  this.svg = function (coeff) {
    const objetssvg = []; let s1; let s2; let p1; let p2; let c, A
    for (const unPoint of points) {
      if (unPoint.typeObjet === 'point3d') {
        A = unPoint.c2d
      } else {
        A = unPoint
      }
      if (A.constructor === Point) {
        if (this.style === 'x') {
          s1 = segment(point(A.x - this.taille / coeff, A.y + this.taille / coeff),
            point(A.x + this.taille / coeff, A.y - this.taille / coeff), this.color[0])
          s2 = segment(point(A.x - this.taille / coeff, A.y - this.taille / coeff),
            point(A.x + this.taille / coeff, A.y + this.taille / coeff), this.color[0])
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetssvg.push(s1, s2)
          s1.isVisible = false
          s2.isVisible = false
        } else if (this.style === 'o') {
          p1 = point(A.x, A.y)
          c = cercle(p1, this.taille / coeff, this.color[0])
          c.isVisible = false
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = this.color[0]
          c.opaciteDeRemplissage = this.opacite / 2
          objetssvg.push(c)
        } else if (this.style === '#') {
          p1 = point(A.x - this.taille / coeff, A.y - this.taille / coeff)
          p2 = point(A.x + this.taille / coeff, A.y - this.taille / coeff)
          c = carre(p1, p2, this.color[0])
          c.isVisible = false
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = this.color[0]
          c.opaciteDeRemplissage = this.opacite / 2
          objetssvg.push(c)
        } else if (this.style === '+') {
          s1 = segment(point(A.x, A.y + this.taille / coeff),
            point(A.x, A.y - this.taille / coeff), this.color[0])
          s2 = segment(point(A.x - this.taille / coeff, A.y),
            point(A.x + this.taille / coeff, A.y), this.color[0])
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetssvg.push(s1, s2)
        } else if (this.style === '|') {
          s1 = segment(point(A.x, A.y + this.taille / coeff),
            point(A.x, A.y - this.taille / coeff), this.color[0])
          s1.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          objetssvg.push(s1)
        } else if (this.style === '.') {
          s1 = plot(A.x, A.y, { couleur: this.color[0], rayon: this.epaisseur * 0.05, couleurDeRemplissage: this.color[0] })
        }
      }
    }
    let code = ''
    for (const objet of objetssvg) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">` + code + '</g>'
    return code
  }
  this.tikz = function () {
    const objetstikz = []; let s1; let s2; let p1; let p2; let c, A
    for (const unPoint of points) {
      if (unPoint.typeObjet === 'point3d') {
        A = unPoint.c2d
      } else {
        A = unPoint
      }

      if (A.constructor === Point) {
        if (this.style === 'x') {
          s1 = segment(point(A.x - this.tailleTikz, A.y + this.tailleTikz),
            point(A.x + this.tailleTikz, A.y - this.tailleTikz), this.color[1])
          s2 = segment(point(A.x - this.tailleTikz, A.y - this.tailleTikz),
            point(A.x + this.tailleTikz, A.y + this.tailleTikz), this.color[1])
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetstikz.push(s1, s2)
        } else if (this.style === 'o') {
          p1 = point(A.x, A.y)
          c = cercle(p1, this.tailleTikz, this.color[1])
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = this.color[1]
          c.opaciteDeRemplissage = this.opacite / 2
          objetstikz.push(c)
        } else if (this.style === '#') {
          p1 = point(A.x - this.tailleTikz, A.y - this.tailleTikz)
          p2 = point(A.x + this.tailleTikz, A.y - this.tailleTikz)
          c = carre(p2, p1, this.color[1])
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = this.color[1]
          c.opaciteDeRemplissage = this.opacite / 2
          objetstikz.push(c)
        } else if (this.style === '+') {
          s1 = segment(point(A.x, A.y + this.tailleTikz),
            point(A.x, A.y - this.tailleTikz), this.color[1])
          s2 = segment(point(A.x - this.tailleTikz, A.y),
            point(A.x + this.tailleTikz, A.y), this.color[1])
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetstikz.push(s1, s2)
        } else if (this.style === '|') {
          s1 = segment(point(A.x, A.y + this.tailleTikz),
            point(A.x, A.y - this.tailleTikz), this.color[1])
          s1.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          objetstikz.push(s1)
        } else if (this.style === '.') {
          s1 = plot(A.x, A.y, { couleur: this.color[1], rayon: this.epaisseur * 0.05, couleurDeRemplissage: this.color[1] })
        }
      }
    }
    let code = ''
    for (const objet of objetstikz) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}
/**
   * @param  {Point} args Points précédemment créés. Si le dernier argument est une chaîne de caractère, définit la couleur des points tracés.
   * @return  {TracePoint} TracePoint
   * @example tracePoint(A,B,C,'red) // Trace les points A,B,C précédemment créés en rouge
   * @example tracePoint(A).style = '|' // Le style du point A sera '|' et non 'x' par défaut.
   * @example tracePoint(A).epaisseur = 5 // L'épaisseur du style du point sera 5 et non 1 par défaut.
   * @example tracePoint(A).opacite = 0.4 // L'opacité du style du point sera 40% et non 80%(0.8) par défaut.
    */
export function tracePoint (...args) {
  return new TracePoint(...args)
}

/**
   * P=tracePointSurDroite(A,d) //Ajoute un trait perpendiculaire à d supposée tracée marquant la posiion du point A
   * P=tracePointSurDroite(A,B) //Ajoute un trait perpendiculaire à la droite (AB) supposée tracée marquant la posiion du point A
   *
   * @author Rémi Angot et Jean-Claude Lhote
   */
function TracePointSurDroite (A, O, color = 'black') {
  ObjetMathalea2D().call(this, { })
  this.color = color
  this.lieu = A
  this.taille = 0.2
  this.x = A.x
  this.y = A.y
  let M, d
  this.bordures = [A.x - 0.2, A.y - 0.2, A.x + 0.2, A.x + 0.2]

  if (O instanceof Point) {
    if (longueur(this.lieu, O) < 0.001) window.notify('TracePointSurDroite : points trop rapprochés pour définir une droite', { A, O })
    M = pointSurSegment(this.lieu, O, 1)
    this.direction = rotation(M, this.lieu, 90)
  }
  if (O instanceof Droite) {
    d = droiteParPointEtPerpendiculaire(this.lieu, O)
    d.isVisible = false
    this.direction = pointSurSegment(point(d.x1, d.y1), point(d.x2, d.y2), 1)
  }
  this.svg = function (coeff) {
    const A1 = pointSurSegment(this.lieu, this.direction, this.taille * 20 / coeff)
    const A2 = pointSurSegment(this.lieu, this.direction, -this.taille * 20 / coeff)
    const s = segment(A1, A2, this.color)
    this.id = s.id
    return s.svg(coeff)
  }
  this.tikz = function () {
    const A1 = pointSurSegment(this.lieu, this.direction, this.taille / context.scale)
    const A2 = pointSurSegment(this.lieu, this.direction, -this.taille / context.scale)
    const s = segment(A1, A2, this.color)
    return s.tikz()
  }
}
export function tracePointSurDroite (A, O, color = 'black') {
  return new TracePointSurDroite(A, O, color)
}

export function traceMilieuSegment (A, B) {
  return new TracePointSurDroite(milieu(A, B), droite(A, B))
}
