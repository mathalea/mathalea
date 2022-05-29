import { calcul, arrondi, egal, randint, choice, rangeMinMax, unSiPositifMoinsUnSinon, lettreDepuisChiffre, nombreAvecEspace, stringNombre, premierMultipleSuperieur, premierMultipleInferieur, inferieurouegal, numberFormat, nombreDeChiffresDe, abs } from './outils.js'
import { radians } from './fonctionsMaths.js'
import { context } from './context.js'
import { fraction, max, ceil, isNumeric, random, round, floor } from 'mathjs'

/*
  MathALEA2D
 @name      mathalea2d.js
 @author    Rémi Angot & Jean-Claude Lhote
 @license   MIT License - CC-BY-SA
 @homepage  https://copmaths.fr/mathalea2d.html
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
export function ObjetMathalea2D () {
  this.positionLabel = 'above'
  this.isVisible = true
  this.color = colorToLatexOrHTML('black')
  this.style = '' // stroke-dasharray="4 3" pour des hachures //stroke-width="2" pour un trait plus épais
  // this.styleTikz = ''
  this.epaisseur = 1
  this.opacite = 1
  this.pointilles = false
  this.id = numId
  numId++
  context.objets2D.push(this)
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
/**
 *
 * @param {url} url de l'image
 * @param {number} x tous ces nombres sont en pixels
 * @param {number} y Attention à l'orientation de l'axe SVG
 * @param {number} largeur
 * @param {number} hauteur
 */
function FondEcran (url, x, y, largeur, hauteur) {
  ObjetMathalea2D.call(this)
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
/**
 * fork de https://javascript.developpez.com/actu/94357/JavaScript-moins-Realiser-une-copie-parfaite-d-objet/
 * Ne fonctionne pas complètement : ne copie pas les méthodes svg et tikz...
 * @param {ObjetMathalea2D} originalObject
 * @returns copie de cet objet.
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
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%% LES POINTS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * A = point('A') //son nom
 * A = point(x,y) //ses coordonnées
 * A = point(x,y,'A') //ses coordonnées et son nom
 * A = point(x,y,'A',below') //ses coordonnées,son nom et la position de son label
 *
 * @author Rémi Angot
 */
function Point (arg1, arg2, arg3, positionLabel = 'above') {
  this.typeObjet = 'point'
  numId++
  this.id = numId
  if (arguments.length === 1) {
    this.nom = arg1
  } else if (arguments.length === 2) {
    if (isNaN(arg1) || isNaN(arg2)) window.notify('Point : les coordonnées ne sont pas valides', { arg1, arg2 })
    this.x = arg1
    this.y = arg2
  } else {
    if (isNaN(arg1) || isNaN(arg2)) window.notify('Point : les coordonnées ne sont pas valides', { arg1, arg2 })
    this.x = arg1
    this.y = arg2
    this.nom = arg3
  }
  this.positionLabel = positionLabel
  this.bordures = [this.x, this.y, this.x, this.y]
  this.xSVG = function (coeff) {
    return this.x * coeff
  }
  this.ySVG = function (coeff) {
    return -this.y * coeff
  }
  if (!this.nom) {
    this.nom = ' ' // Le nom d'un point est par défaut un espace
    // On pourra chercher tous les objets qui ont ce nom pour les nommer automatiquement
  }
}
/**
 * Crée un objet Point ayant les propriétés suivantes :
 * @param {number} x abscisse
 * @param {number} y ordonnée
 * @param {string} A son nom qui apparaîtra
 * @param {string} labelPosition Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
 * @returns {Point}
 */
export function point (x, y, A, labelPosition = 'above') {
  return new Point(x, y, A, labelPosition)
}
/**
 * @author Jean-Claude Lhote
 * @param {number} x abscisse
 * @param {number} y ordonnée
 * @param {object} param2 permet de définir le rayon du 'plot', sa couleur, sa couleur de remplissage
 */
function Plot (x, y, { rayon = 0.05, couleur = 'black', couleurDeRemplissage = 'black', opacite = 1, opaciteDeRemplissage = 1 } = {}) {
  ObjetMathalea2D.call(this)
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
 * @author Rémi Angot & Jean-Claude Lhote
 */
function TracePoint (...points) {
  ObjetMathalea2D.call(this)
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
    this.color = points[points.length - 1]
    points.length--
  } else this.color = 'black'
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
            point(A.x + this.taille / coeff, A.y - this.taille / coeff), this.color)
          s2 = segment(point(A.x - this.taille / coeff, A.y - this.taille / coeff),
            point(A.x + this.taille / coeff, A.y + this.taille / coeff), this.color)
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetssvg.push(s1, s2)
          s1.isVisible = false
          s2.isVisible = false
        } else if (this.style === 'o') {
          p1 = point(A.x, A.y)
          c = cercle(p1, this.taille / coeff, this.color)
          c.isVisible = false
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = colorToLatexOrHTML(this.color)[0]
          c.opaciteDeRemplissage = this.opacite / 2
          objetssvg.push(c)
        } else if (this.style === '#') {
          p1 = point(A.x - this.taille / coeff, A.y - this.taille / coeff)
          p2 = point(A.x + this.taille / coeff, A.y - this.taille / coeff)
          c = carre(p1, p2, this.color)
          c.isVisible = false
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = colorToLatexOrHTML(this.color)[0]
          c.opaciteDeRemplissage = this.opacite / 2
          objetssvg.push(c)
        } else if (this.style === '+') {
          s1 = segment(point(A.x, A.y + this.taille / coeff),
            point(A.x, A.y - this.taille / coeff), this.color)
          s2 = segment(point(A.x - this.taille / coeff, A.y),
            point(A.x + this.taille / coeff, A.y), this.color)
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetssvg.push(s1, s2)
        } else if (this.style === '|') {
          s1 = segment(point(A.x, A.y + this.taille / coeff),
            point(A.x, A.y - this.taille / coeff), this.color)
          s1.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          objetssvg.push(s1)
        } else if (this.style === '.') {
          s1 = plot(A.x, A.y, { couleur: this.color, rayon: this.epaisseur * 0.05, couleurDeRemplissage: this.color })
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
            point(A.x + this.tailleTikz, A.y - this.tailleTikz), this.color)
          s2 = segment(point(A.x - this.tailleTikz, A.y - this.tailleTikz),
            point(A.x + this.tailleTikz, A.y + this.tailleTikz), this.color)
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetstikz.push(s1, s2)
        } else if (this.style === 'o') {
          p1 = point(A.x, A.y)
          c = cercle(p1, this.tailleTikz, this.color)
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = colorToLatexOrHTML(this.color)[1]
          c.opaciteDeRemplissage = this.opacite / 2
          objetstikz.push(c)
        } else if (this.style === '#') {
          p1 = point(A.x - this.tailleTikz, A.y - this.tailleTikz)
          p2 = point(A.x + this.tailleTikz, A.y - this.tailleTikz)
          c = carreIndirect(p1, p2, this.color)
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = colorToLatexOrHTML(this.color)[1]
          c.opaciteDeRemplissage = this.opacite / 2
          objetstikz.push(c)
        } else if (this.style === '+') {
          s1 = segment(point(A.x, A.y + this.tailleTikz),
            point(A.x, A.y - this.tailleTikz), this.color)
          s2 = segment(point(A.x - this.tailleTikz, A.y),
            point(A.x + this.tailleTikz, A.y), this.color)
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetstikz.push(s1, s2)
        } else if (this.style === '|') {
          s1 = segment(point(A.x, A.y + this.tailleTikz),
            point(A.x, A.y - this.tailleTikz), this.color)
          s1.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          objetstikz.push(s1)
        } else if (this.style === '.') {
          s1 = plot(A.x, A.y, { couleur: this.color, rayon: this.epaisseur * 0.05, couleurDeRemplissage: this.color })
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
 * @returns  {TracePoint} TracePoint
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
 * @author Rémi Angot & Jean-Claude Lhote
 */
function TracePointSurDroite (A, O, color = 'black') {
  ObjetMathalea2D.call(this)
  this.color = color
  this.lieu = A
  this.taille = 0.2
  this.x = A.x
  this.y = A.y
  let M, d
  this.bordures = [A.x - 0.2, A.y - 0.2, A.x + 0.2, A.x + 0.2]

  if (O.constructor === Point) {
    if (longueur(this.lieu, O) < 0.001) window.notify('TracePointSurDroite : points trop rapprochés pour définir une droite', { A, O })
    M = pointSurSegment(this.lieu, O, 1)
    this.direction = rotation(M, this.lieu, 90)
  }
  if (O.constructor === Droite) {
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

/**
 * M = milieu(A,B) //M est le milieu de [AB]
 * M = milieu(A,B,'M') //M est le milieu [AB] et se nomme M
 * M = milieu(A,B,'M','below') //M est le milieu [AB], se nomme M et le nom est en dessous du point
 *
 * @author Rémi Angot
 */
export function milieu (A, B, nom, positionLabel = 'above') {
  if (isNaN(longueur(A, B))) window.notify('milieu : Quelque chose ne va pas avec les points', { A, B })
  const x = (A.x + B.x) / 2
  const y = (A.y + B.y) / 2
  return new Point(x, y, nom, positionLabel)
}

/**
 * M = pointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
 * M = pointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
 * M = pointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
 *
 * M = pointSurSegment(A,B,'h','M') // M est un point au hasard sur [AB] (on peut écrire n'importe quel texte à la place de 'h')
 * M = pointSurSegment(A,B) // M est un point au hasard sur [AB]
 * Sécurité ajoutée par Jean-Claude Lhote : si AB=0, alors on retourne A
 * @author Rémi Angot
 */
export function pointSurSegment (A, B, l, nom = '', positionLabel = 'above') {
  if (isNaN(longueur(A, B))) window.notify('pointSurSegment : Quelque chose ne va pas avec les points', { A, B })
  if (longueur(A, B) === 0) return A
  if (l === undefined || typeof l === 'string') {
    l = (longueur(A, B) * randint(15, 85)) / 100
  }
  return homothetie(B, A, l / longueur(A, B), nom, positionLabel)
}

/**
 * Est-ce que le point C appartient au segment [AB] ?
 * C'est ce que dira cette fonction
 * @author Jean-Claude Lhote
 */

export function appartientSegment (C, A, B) {
  const prodvect = (B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)
  const prodscal = (C.x - A.x) * (B.x - A.x) + (C.y - A.y) * (B.y - A.y)
  const prodscalABAB = (B.x - A.x) ** 2 + (B.y - A.y) ** 2
  if (prodvect === 0 && prodscal > 0 && prodscal < prodscalABAB) return true
  else return false
}
/**
 * Est-ce que le point C appartient à la droite (AB) ?
 * C'est ce que dira cette fonction
 * @author Jean-Claude Lhote
 */
export function appartientDroite (C, A, B) {
  const prodvect = (B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)
  if (prodvect === 0) return true
  else return false
}
/**
 * Est-ce que le point C appartient à la demi-droite [AB) ?
 * C'est ce que dira cette fonction
 * @author Jean-Claude Lhote
 */
export function appartientDemiDroite (C, A, B) {
  const prodvect = (B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)
  const prodscal = (C.x - A.x) * (B.x - A.x) + (C.y - A.y) * (B.y - A.y)
  if (prodvect === 0 && prodscal > 0) return true
  else return false
}

/**
 *
 * @param {Cercle} c
 * @param {number} angle
 * @param {string} nom
 * @param {string} positionLabel
 * M = pointSurCercle(c,'','M') // M est un point choisi au hasard sur le cercle c et se nomme M.
 * N = pointSurCercle(c,90) // N est le point du cercle c situé à 90° par rapport à l'horizontale, donc au dessus du centre de c
 * P = pointSurCercle(c,-90) // P est le point du cercle c situé à l'opposé du point N précédent.
 * @author Jean-Claude Lhote
 */
export function pointSurCercle (c, angle, nom, positionLabel = 'above') {
  if (typeof angle !== 'number') angle = randint(-180, 180)
  const x = c.centre.x + c.rayon * Math.cos(radians(angle))
  const y = c.centre.y + c.rayon * Math.sin(radians(angle))
  return point(x, y, nom, positionLabel)
}
/**
 * Retourne un point sur la droite d dont l'abscisse est x. Si c'est impossible (droite verticale) alors ce sera le point dont l'ordonnée vaut x.
 * @param {Droite} d
 * @param {number} x Abscisse du point
 * @param {string} nom Nom du point
 * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
 * @return {Point} Point de la droite d dont l'abscisse est x
 * @author Jean-Claude Lhote
 */
export function pointSurDroite (d, x, nom, positionLabel = 'above') {
  // si d est parallèle à l'axe des ordonnées, le paramètre x servira pour y.
  if (d.b === 0) return point(-d.c / d.a, x, nom, positionLabel)
  else if (d.a === 0) return point(x, -d.c / d.b, nom, positionLabel)
  else return point(x, (-d.c - d.a * x) / d.b, nom, positionLabel)
}

/**
 * Renvoie 'M' le point d'intersection des droites d1 et d2
 * @param {Droite} d1
 * @param {Droite} d2
 * @param {string} [M=''] Nom du point d'intersection. Facultatif, vide par défaut.
 * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
 * @return {Point} Point 'M' d'intersection de d1 et de d2
 * @author Jean-Claude Lhote
 */
export function pointIntersectionDD (d, f, nom = '', positionLabel = 'above') {
  let x, y
  if (f.a * d.b - f.b * d.a === 0) {
    console.log('Les droites sont parallèles, pas de point d\'intersection')
    return false
  } else { y = (f.c * d.a - d.c * f.a) / (f.a * d.b - f.b * d.a) }
  if (d.a === 0) { // si d est horizontale alors f ne l'est pas donc f.a<>0
    x = (-f.c - f.b * y) / f.a
  } else { // d n'est pas horizontale donc ...
    x = (-d.c - d.b * y) / d.a
  }
  return point(x, y, nom, positionLabel)
}
/**
 * @example pointAdistance(A,d,angle,nom="",positionLabel="above") // Seuls le point A et la distance d sont obligatoires, angle peut être choisi : il s'agit de l'angle signé avec l'axe [OI) sinon, il est choisi aléatoirement.
 * @example p=pointAdistance(A,5,'M') // Place un point aléatoirement à 5 unités de A et lui donne le nom de 'M'.
 * @author Jean-Claude Lhote
 */
export function pointAdistance (...args) {
  const l = args.length
  const angle = randint(1, 360)
  const A = args[0]
  const B = point(A.x + 1, A.y)
  const d = args[1]
  if (l < 2) { return false }
  if (l === 2) { return similitude(B, A, angle, d) } else
  if (l === 3) {
    if (typeof (args[2]) === 'number') { return similitude(B, A, args[2], d) } else { return similitude(B, A, angle, d, args[2]) }
  } else
  if (l === 4) {
    if (typeof (args[2]) === 'number') { return similitude(B, A, args[2], d, args[3]) } else { return similitude(B, A, angle, d, args[2], args[3]) }
  } else { return similitude(B, A, args[2], d, args[3], args[4]) }
}

/**
 * labelPoint(A,B) pour nommer les points A et B
 * Le nombre d'arguments n'est pas limité
 *
 * @author Rémi Angot
 */
function LabelPoint (...points) {
  ObjetMathalea2D.call(this)
  if (!this.taille) this.taille = 10
  if (!this.largeur) this.largeur = 10
  if (typeof points[points.length - 1] === 'string') {
    this.color = colorToLatexOrHTML(points[points.length - 1])
    points.length--
  }
  let xmin = 1000
  let xmax = -1000
  let ymin = 1000
  let ymax = -1000
  let lePoint
  for (const unPoint of points) {
    if (unPoint.typeObjet !== 'point3d' && unPoint.typeObjet !== 'point') window.notify('LabelPoint : argument invalide', { ...points })
    lePoint = unPoint.typeObjet === 'point' ? unPoint : unPoint.c2d
    xmin = Math.min(xmin, lePoint.x - lePoint.positionLabel.indexOf('left') !== -1 ? 1 : 0)
    xmax = Math.max(xmax, lePoint.x + lePoint.positionLabel.indexOf('right') !== -1 ? 1 : 0)
    ymin = Math.min(ymin, lePoint.y - lePoint.positionLabel.indexOf('below') !== -1 ? 1 : 0)
    ymax = Math.max(ymax, lePoint.y + lePoint.positionLabel.indexOf('above') !== -1 ? 1 : 0)
  }
  this.bordures = [xmin, ymin, xmax, ymax]
  this.svg = function (coeff) {
    let code = ''; let x; let y, A
    if (Array.isArray(points[0])) {
      // Si le premier argument est un tableau
      this.listePoints = points[0]
    } else {
      this.listePoints = points
    }
    for (const unPoint of this.listePoints) {
      if (unPoint.typeObjet === 'point3d') {
        A = unPoint.c2d
      } else {
        A = unPoint
      }
      x = A.x
      y = A.y
      switch (A.positionLabel) {
        case 'left':
          code += texteParPosition(A.nom, x - 10 / coeff, y, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'right':
          code += texteParPosition(A.nom, x + 10 / coeff, y, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'below':
          code += texteParPosition(A.nom, x, y - 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'above':
          code += texteParPosition(A.nom, x, y + 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'above left':
          code += texteParPosition(A.nom, x - 10 / coeff, y + 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'above right':
          code += texteParPosition(A.nom, x + 10 / coeff, y + 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'below left':
          code += texteParPosition(A.nom, x - 10 / coeff, y - 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        case 'below right':
          code += texteParPosition(A.nom, x + 10 / coeff, y - 10 / coeff, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
        default:
          code += texteParPosition(A.nom, x, y, 'milieu', this.color[0], 1, 'middle', true).svg(coeff) + '\n'
          break
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''; let A
    let style = ''
    if (this.color[0] !== 'black') {
      style = `,color=${this.color[1]}`
    }
    for (const unPoint of points) {
      if (unPoint.typeObjet === 'point3d') {
        A = unPoint.c2d
      } else {
        A = unPoint
      }
      code += `\t\\draw (${A.x},${A.y}) node[${A.positionLabel}${style}] {$${A.nom}$};\n`
    }
    return code
  }
}
/**
 * Nomme les points passés en argument, le nombre d'arguments n'est pas limité.
 * @param  {...any} args Points
 * @param {string} [color='black']
 * @returns {LabelPoint} LabelPoint
 * @example labelPoint(A,B,C) // Retourne le nom des points A, B et C en noir
 * @example labelPoint(A,B,C,'red') // Retourne le nom des points A, B et C en rouge
 * @example labelPoint(A,B,C,'#f15929') // Retourne le nom des points A, B et C en orange (code couleur HTML : #f15929)
 * @author Rémi Angot
 */
export function labelPoint (...args) {
  return new LabelPoint(...args)
}
/**
 * labelLatexPoint(A,B) pour nommer les points A et B
 * Le nombre d'arguments n'est pas limité
 * A utiliser par exemple si le label est A_1
 * @author Rémi Angot & Jean-Claude Lhote
 */
function LabelLatexPoint ({ points = [], color = 'black', taille = 8, largeur = 10, hauteur = 10, background = '' }) {
  ObjetMathalea2D.call(this)
  this.taille = taille
  this.largeur = largeur
  this.hauteur = hauteur
  this.background = background
  this.color = color

  const offset = 0.25 * Math.log10(this.taille) // context.pixelsParCm ne correspond pas forcément à la valeur utilisée par mathalea2d... cela peut entrainer un trés léger écart
  let x
  let y
  let A
  const objets = []
  if (Array.isArray(points[0])) {
    // Si le premier argument est un tableau
    this.listePoints = points[0]
  } else {
    this.listePoints = points
  }
  for (const unPoint of this.listePoints) {
    if (unPoint.typeObjet === 'point3d') {
      A = unPoint.c2d
    } else {
      A = unPoint
    }
    x = A.x
    y = A.y
    switch (A.positionLabel) {
      case 'left':
        objets.push(latexParCoordonnees(A.nom, x - offset, y, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      case 'right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      case 'below':
        objets.push(latexParCoordonnees(A.nom, x, y - offset, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      case 'above':
        objets.push(latexParCoordonnees(A.nom, x, y + offset, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      case 'above right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y + offset, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      case 'below left':
        objets.push(latexParCoordonnees(A.nom, x - offset, y - offset, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      case 'below right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y - offset, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
      default:
        objets.push(latexParCoordonnees(A.nom, x - offset, y + offset, this.color, this.largeur, this.hauteur, this.background, this.taille))
        break
    }
  }

  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += objet.svg(coeff) + '\n'
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += objet.tikz() + '\n'
    }
    return code
  }
}
/**
 * Nomme les points passés en argument, le nombre d'arguments n'est pas limité.
 * @param  {objext} points: un tableau des points dont on veut afficher les labels
 * color: leur couleur
 * taille: la taille du texte (voir latexParCoordonnees)
 * largeur: la largeur en pixels du label (par défaut 10) a des fins de centrage
 * hauteur: la hauteur en pixels du label à des fins de centrage
 * background: transparent si '' sinon une couleur
 * @returns {LabelLatexPoint} LabelLatexPoint
 * @author Rémi Angot & Jean-Claude Lhote
 */
export function labelLatexPoint ({ points, color = 'black', taille = 8, largeur = 10, hauteur = 10, background = '' }) {
  return new LabelLatexPoint({ points: points, color: color, taille: taille, largeur: largeur, hauteur: hauteur, background: background })
}

/**
 * P = barycentre(p,'P','below') Crée le point P barycentre du polygone p, son nom 'P' sera placé sous le point si il est tracé et labelisé.
 * @param {Polygone} p
 * @author Jean-Claude Lhote
 */
export function barycentre (p, nom = '', positionLabel = 'above') {
  let sommex = 0
  let sommey = 0
  let nbsommets = 0
  for (const point of p.listePoints) {
    sommex += point.x
    sommey += point.y
    nbsommets++
  }
  const x = sommex / nbsommets
  const y = sommey / nbsommets
  return new Point(x, y, nom, positionLabel)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES DROITES %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * d = droite(A,B) // La droite passant par A et B
 * d = droite(A,B,'(d)') // La droite passant par A et B se nommant (d)
 * d = droite(a,b,c,'(d)') // La droite définie par les coefficients de ax +by + c=0 (équation de la droite (a,b)!==(0,0))
 * d = droite(A,B,'(d)','blue') //La droite passant par A et B se nommant (d) et de couleur bleue
 *
 * @author Jean-Claude Lhote
 */
function Droite (arg1, arg2, arg3, arg4) {
  let a, b, c

  ObjetMathalea2D.call(this)
  if (arguments.length === 2) {
    if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Droite : (attendus : A et B) les arguments de sont pas des points valides', { arg1, arg2 })
    this.nom = ''
    this.x1 = arg1.x
    this.y1 = arg1.y
    this.x2 = arg2.x
    this.y2 = arg2.y
    this.a = this.y1 - this.y2
    this.b = this.x2 - this.x1
    this.c = (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
  } else if (arguments.length === 3) {
    if (typeof arg1 === 'number') {
      if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3)) window.notify('Droite : (attendus : a, b et c) les arguments de sont pas des nombres valides', { arg1, arg2, arg3 })

      // droite d'équation ax +by +c =0
      this.nom = ''
      this.a = arg1
      this.b = arg2
      this.c = arg3
      a = arg1
      b = arg2
      c = arg3
      if (egal(a, 0)) {
        this.x1 = 0
        this.x2 = 1
        this.y1 = -c / b
        this.y2 = -c / b
      } else if (egal(b, 0)) {
        this.y1 = 0
        this.y2 = 1
        this.x1 = -c / a
        this.x2 = -c / a
      } else {
        this.x1 = 0
        this.y1 = -c / b
        this.x2 = 1
        this.y2 = (-c - a) / b
      }
    } else {
      if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Droite : (attendus : A, B et "nom") les arguments de sont pas des points valides', { arg1, arg2 })
      this.x1 = arg1.x
      this.y1 = arg1.y
      this.x2 = arg2.x
      this.y2 = arg2.y
      this.a = this.y1 - this.y2
      this.b = this.x2 - this.x1
      this.c = (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
      this.nom = arg3
    }
  } else if (arguments.length === 4) {
    if (typeof arg1 === 'number') {
      if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3)) window.notify('Droite : (attendus : a, b, c et "nom") les arguments de sont pas des nombres valides', { arg1, arg2, arg3 })
      this.a = arg1
      this.b = arg2
      this.c = arg3
      a = arg1
      b = arg2
      c = arg3
      this.nom = arg4
      if (egal(a, 0)) {
        this.x1 = 0
        this.x2 = 1
        this.y1 = -c / b
        this.y2 = -c / b
      } else if (egal(b, 0)) {
        this.y1 = 0
        this.y2 = 1
        this.x1 = -c / a
        this.x2 = -c / a
      } else {
        this.x1 = 0
        this.y1 = -c / b
        this.x2 = 1
        this.y2 = (-c - a) / b
      }
    } else {
      if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Droite : (attendus : A, B, "nom" et "couleur") les arguments de sont pas des points valides', { arg1, arg2 })
      this.x1 = arg1.x
      this.y1 = arg1.y
      this.x2 = arg2.x
      this.y2 = arg2.y
      this.a = this.y1 - this.y2
      this.b = this.x2 - this.x1
      this.c = (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
      this.nom = arg3
      this.color = colorToLatexOrHTML(arg4)
    }
  }
  if (this.b !== 0) this.pente = -this.a / this.b
  let xsav, ysav
  if (this.x1 > this.x2) {
    xsav = this.x1
    ysav = this.y1
    this.x1 = this.x2 + 0
    this.y1 = this.y2 + 0
    this.x2 = xsav
    this.y2 = ysav
  }
  this.normal = vecteur(this.a, this.b)
  this.directeur = vecteur(this.b, -this.a)
  this.angleAvecHorizontale = angleOriente(
    point(1, 0),
    point(0, 0),
    point(this.directeur.x, this.directeur.y)
  )
  let absNom, ordNom, leNom
  if (this.nom !== '') {
    if (egal(this.b, 0, 0.1)) { // ax+c=0 x=-c/a est l'équation de la droite
      absNom = -this.c / this.a + 0.8 // l'abscisse du label est décalé de 0.8
      ordNom = context.fenetreMathalea2d[1] + 1 // l'ordonnée du label est ymin +1
    } else if (egal(this.a, 0, 0.1)) { // by+c=0 y=-c/b est l'équation de la droite
      absNom = context.fenetreMathalea2d[0] + 0.8 // l'abscisse du label est xmin +1
      ordNom = -this.c / this.b + 0.8 // l'ordonnée du label est décalée de 0.8
    } else { // a et b sont différents de 0 ax+by+c=0 est l'équation
      // y=(-a.x-c)/b est l'aquation cartésienne et x=(-by-c)/a
      const y0 = (-this.a * (context.fenetreMathalea2d[0] + 1) - this.c) / this.b
      const y1 = (-this.a * (context.fenetreMathalea2d[2] - 1) - this.c) / this.b
      const x0 = (-this.b * (context.fenetreMathalea2d[1] + 1) - this.c) / this.a
      const x1 = (-this.b * (context.fenetreMathalea2d[3] - 1) - this.c) / this.a
      if (y0 > context.fenetreMathalea2d[1] && y0 < context.fenetreMathalea2d[3]) {
        absNom = context.fenetreMathalea2d[0] + 1
        ordNom = y0 + this.pente
      } else {
        if (y1 > context.fenetreMathalea2d[1] && y1 < context.fenetreMathalea2d[3]) {
          absNom = context.fenetreMathalea2d[2] - 1
          ordNom = y1 - this.pente
        } else {
          if (x0 > context.fenetreMathalea2d[0] && x0 < context.fenetreMathalea2d[2]) {
            absNom = x0
            ordNom = context.fenetreMathalea2d[1] + Math.abs(this.pente)
          } else {
            if (x1 > context.fenetreMathalea2d[0] && x1 < context.fenetreMathalea2d[2]) {
              absNom = x1
              ordNom = context.fenetreMathalea2d[3] + this.pente
            } else {
              absNom = (context.fenetreMathalea2d[0] + context.fenetreMathalea2d[2]) / 2
              ordNom = pointSurDroite(this, absNom).y
            }
          }
        }
      }
    }
    leNom = texteParPosition(this.nom, absNom, ordNom, 'milieu', this.color, 1, 'middle', true)
  } else leNom = vide2d()
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)
    if (this.nom === '') {
      return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
        coeff
      )}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} id ="${this.id}" />`
    } else {
      return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
      coeff
    )}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} id ="${this.id}" />` + leNom.svg(coeff)
    }
  }
  this.tikz = function () {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break
        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)

    if (this.nom !== '') { return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});` + leNom.tikz() } else { return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});` }
  }
  this.svgml = function (coeff, amp) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)
    const s = segment(A1, B1, this.color[0])
    s.isVisible = this.isVisible
    return s.svgml(coeff, amp) + leNom.svg(coeff)
  }
  this.tikzml = function (amp) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)
    const s = segment(A1, B1, this.color[1])
    s.isVisible = this.isVisible
    return s.tikzml(amp) + leNom.tikz()
  }
}
/**
 * @param  {...any} args Deux points ou les coefficients a, b, c de ax + by + c = 0 où (a,b) !== (0,0)
 * @param {string} nom Facultatif
 * @param {string} color Facultatif
 * @returns {Droite} Droite
 * @example droite(A,B,'(d)') // La droite passant par A et B se nommant (d)
 * @example droite(a,b,c,'(d)') // La droite définie par les coefficients de ax +by + c = 0 (équation de la droite (a,b)!==(0,0))
 * @example droite(A,B,'(d)','blue') // La droite passant par A et B se nommant (d) et de couleur bleue
 * @author Jean-Claude Lhote
 */
export function droite (...args) {
  return new Droite(...args)
}
/**
 * fonction qui analyse si le point A est au-dessus ou en dessous de la droite d
 * retourne 'sur', 'dessus', 'dessous' ou 'gauche' ou 'droite" si la droite est verticale.
 * @param {droite} d
 * @param {point} A
 */
export function dessousDessus (d, A) {
  if (egal(d.a * A.x + d.b * A.y + d.c, 0)) return 'sur'
  if (egal(d.b, 0)) {
    if (A.x < -d.c / d.a) return 'gauche'
    else return 'droite'
  } else {
    if (d.a * A.x + d.b * A.y + d.c < 0) return 'dessous'
    else return 'dessus'
  }
}
/**
 *
 * @param {point} A
 * @param {droite} d
 * @returns true si A appartient à d
 * @author Jean-Claude Lhote
 */
export function estSurDroite (A, d) {
  return dessousDessus(d, A) === 'sur'
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
 * @returns {object} {xmin, ymin, xmax, ymax}
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

/**
 *
 * @param {droite} d
 * @param {{number}} param1 les bordures de la fenêtre
 * @returns le point qui servira à placer le label.
 */
export function positionLabelDroite (d, { xmin = 0, ymin = 0, xmax = 10, ymax = 10 }) {
  let xLab, yLab
  let fXmax, fYmax, fXmin, fYmin
  if (d.b === 0) { // Si la droite est verticale son équation est x = -d.c/d.a on choisit un label au Nord.
    xLab = -d.b / d.c - 0.5
    yLab = ymax - 0.5
  } else { // la droite n'étant pas verticale, on peut chercher ses intersections avec les différents bords.
    const f = x => (-d.c - d.a * x) / d.b
    fXmax = f(xmax)
    if (fXmax <= ymax && fXmax >= ymin) { // la droite coupe le bord Est entre ymin+1 et ymax-1
      xLab = xmax - 0.8
      yLab = f(xLab)
    } else {
      fXmin = f(xmin)
      if (fXmin <= ymax && fXmin >= ymin) {
        xLab = xmin + 0.8
        yLab = f(xLab)
      } else { // la droite ne coupe ni la bordue Est ni la bordure Ouest elle coupe donc les bordures Nord et Sud
        const g = y => (-d.c - d.b * y) / d.a
        fYmax = g(ymax)
        if (fYmax <= xmax && fYmax >= xmin) {
          yLab = ymax - 0.8
          xLab = g(yLab)
        } else {
          fYmin = g(ymin)
          if (fYmin <= xmax && fYmin >= xmin) {
            yLab = ymin + 0.8
            xLab = g(yLab)
          } else { // La droite ne passe pas dans la fenêtre on retourne un objet vide
            return vide2d()
          }
        }
      }
    }
  }
  const position = translation(point(xLab, yLab), homothetie(vecteur(d.a, d.b), point(0, 0), 0.5 / norme(vecteur(d.a, d.b))))
  return position
}
/**
 * d = droiteParPointEtVecteur(A,v,'d1',red') //Droite passant par A, de vecteur directeur v et de couleur rouge
 * @author Jean-Claude Lhote
 */
export function droiteParPointEtVecteur (A, v, nom = '', color = 'black') {
  const B = point(A.x + v.x, A.y + v.y)
  return droite(A, B, nom, color)
}
/**
 * Trace en color la droite nom parallèle à d passant par A
 * @param {Point} A
 * @param {Droite} d
 * @param {string} [nom=''] Facultatif, vide par défaut
 * @param {string} [color='black'] Facultatif, 'black' par défaut
 * @return {Droite}
 * @example droiteParPointEtParallele(A,d,'d1',red') // Trace en rouge la droite d1 parallèle à la droite d passant par A
 * @author Jean-Claude Lhote
 */
export function droiteParPointEtParallele (A, d, nom = '', color = 'black') {
  return droiteParPointEtVecteur(A, d.directeur, nom, color)
}
/**
 * d = droiteParPointEtPerpendiculaire(A,d,'d1',red') // Trace en rouge la perpendiculaire à la droite (d) passant par A
 * @author Jean-Claude Lhote
 */
export function droiteParPointEtPerpendiculaire (A, d, nom = '', color = 'black') {
  return droiteParPointEtVecteur(A, d.normal, nom, color)
}
/**
 * d = droiteHorizontaleParPoint(A,'d1',red') // Trace en rouge la droite horizontale passant par A
 * @author Jean-Claude Lhote
 */
export function droiteHorizontaleParPoint (A, nom = '', color = 'black') {
  return droiteParPointEtPente(A, 0, nom, color)
}
/**
 * d = droiteVerticaleParPoint(A,'d1',red') // Trace en rouge la droite verticale passant par A
 * @author Jean-Claude Lhote
 */
export function droiteVerticaleParPoint (A, nom = '', color) {
  return droiteParPointEtVecteur(A, vecteur(0, 1), nom, color)
}

/**
 * d = droiteParPointEtPente(A,p,'d1',red') //Droite passant par A, de pente p et de couleur rouge
 *@author Jean-Claude Lhote
 */
export function droiteParPointEtPente (A, k, nom = '', color = 'black') {
  const B = point(A.x + 1, A.y + k)
  return droite(A, B, nom, color)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES DROITES REMARQUABLES %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Renvoie la médiatrice de [AB] nommée nom de couleur color
 * @param {Point} A
 * @param {Point} B
 * @param {string} [nom=''] Facultatif, vide par défaut
 * @param {string} [color='black'] Facultatif, 'black' par défaut
 * @return {Droite} Droite
 * @author Rémi Angot
 */
export function mediatrice (A, B, nom = '', color = 'black') {
  if (longueur(A, B) < 0.001) window.notify('mediatrice : Points trop rapprochés pour créer cet objet', { A, B })
  const O = milieu(A, B)
  const M = rotation(A, O, 90)
  const N = rotation(A, O, -90)
  return droite(M, N, nom, color)
}

/**
 * m = codageMediatrice(A,B,'blue','×') // Ajoute le codage du milieu et de l'angle droit pour la médiatrice de [AB] en bleu
 *
 * @author Rémi Angot
 */
function CodageMediatrice (A, B, color = 'black', mark = '×') {
  if (longueur(A, B) < 0.1) window.notify('CodageMediatrice : Points trop rapprochés pour créer ce codage', { A, B })
  ObjetMathalea2D.call(this)
  this.color = color
  const O = milieu(A, B)
  const M = rotation(A, O, 90)
  const c = codageAngleDroit(M, O, B, this.color)
  const v = codeSegments(mark, this.color, A, O, O, B)
  c.isVisible = false
  v.isVisible = false
  this.svg = function (coeff) {
    const code = `<g id="${this.id}">${c.svg(coeff) + '\n' + v.svg(coeff)}</g>`
    return code
  }
  this.tikz = function () {
    return c.tikz() + '\n' + v.tikz()
  }
  this.svgml = function (coeff, amp) {
    return c.svgml(coeff, amp) + '\n' + v.svg(coeff)
  }
  this.tikzml = function (amp) {
    return c.tikzml(amp) + '\n' + v.tikz()
  }
}
/**
 *  Ajoute le codage du milieu et de l'angle droit pour la médiatrice de [AB]
 * @param {Point} A
 * @param {Point} B
 * @param {string} [color='black'] Couleur du codage. Code couleur HTML accepté aussi.
 * @param {string} [mark='x'] Peut être '||' ou 'x'.
 * @exemple m = codageMediatrice(A,B,'blue','×') // en bleu
 * @author Rémi Angot
 */

export function codageMediatrice (...args) {
  return new CodageMediatrice(...args)
}
/**
 * c=codageMilieu(A,B,'red','||',false) marque les deux moitiés du segment [AB] avec || en rouge, le milieu n'est pas tracé car dernier argument à false.
 * m=codageMilieu(C,D) marque l'emplacement du milieu de [CD] et marque avec X les deux moitiés.
 * @author Jean-Claude Lhote
 */
function CodageMilieu (A, B, color = 'black', mark = '×', mil = true) {
  if (longueur(A, B) < 0.1) window.notify('CodageMilieu : Points trop rapprochés pour créer ce codage', { A, B })
  ObjetMathalea2D.call(this)
  this.color = color
  const O = milieu(A, B)
  const d = droite(A, B)
  const M = tracePointSurDroite(O, d, this.color)
  const v = codeSegments(mark, this.color, A, O, O, B)
  let code = ''
  this.svg = function (coeff) {
    if (mil) code = M.svg(coeff) + '\n' + v.svg(coeff)
    else code = v.svg(coeff)
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    if (mil) return M.tikz() + '\n' + v.tikz()
    else return v.tikz()
  }
}
/**
 * Marque les deux moitiés du segment [AB] avec mark en color en traçant éventuellement le milieu
 * @param {Point} A
 * @param {Point} B
 * @param {string} [color='black'] Couleur du codage. Code couleur HTML accepté aussi.
 * @param {string} [mark='x'] Peut être '||' ou 'x'.
 * @param {boolean} [mil=true] Trace ou nom le point du milieu.
 * @returns CodageMilieu
 * @example codageMilieu(A,B,'red','||',false) marque les deux moitiés du segment [AB] avec || en rouge, le milieu n'est pas tracé car dernier argument à false.
 */
export function codageMilieu (...args) {
  return new CodageMilieu(...args)
}
/**
 * m = constructionMediatrice(A,B,true,'blue', '×', '||', 'red', 1) // Trace et code la médiatrice en laissant apparent les traits de construction au compas
 *
 * @author Rémi Angot
 */
function ConstructionMediatrice (
  A,
  B,
  detail = false,
  color = 'blue',
  markmilieu = '×',
  markrayons = '||',
  couleurMediatrice = 'red',
  epaisseurMediatrice = 1
) {
  if (longueur(A, B) < 0.1) window.notify('ConstructionMediatrice : Points trop rapprochés pour créer cet objet', { A, B })

  ObjetMathalea2D.call(this)
  this.couleurMediatrice = couleurMediatrice
  this.color = color
  const O = milieu(A, B)
  const m = rotation(A, O, 90)
  const n = rotation(A, O, -90)
  const M = pointSurSegment(O, m, longueur(A, B) * 0.785)
  const N = pointSurSegment(O, n, longueur(A, B) * 0.785)
  const arcm1 = traceCompas(A, M)
  const arcm2 = traceCompas(B, M)
  const arcn1 = traceCompas(A, N)
  const arcn2 = traceCompas(B, N)
  const d = mediatrice(A, B)
  d.color = colorToLatexOrHTML(this.couleurMediatrice)
  d.epaisseur = epaisseurMediatrice
  const codage = codageMediatrice(A, B, this.color, markmilieu)
  const objets = [arcm1, arcm2, arcn1, arcn2, d, codage]
  if (detail) {
    const sAM = segment(A, M, this.color)
    sAM.pointilles = true
    const sBM = segment(B, M, this.color)
    sBM.pointilles = true
    const sAN = segment(A, N, this.color)
    sAN.pointilles = true
    const sBN = segment(B, N, this.color)
    sBN.pointilles = true
    const codes = codeSegments(markrayons, this.color, A, M, B, M, A, N, B, N)
    objets.push(sAM, sBM, sAN, sBN, codes, codage)
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">${code}</g>`
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

export function constructionMediatrice (...args) {
  return new ConstructionMediatrice(...args)
}
/**
 * d = bissectrice(A,O,B) // Bissectrice de l'angle AOB
 * d = bissectrice(A,O,B,'blue') // Bissectrice de l'angle AOB en bleu
 *
 * @author Rémi Angot
 */
export function bissectrice (A, O, B, color = 'black') {
  const demiangle = angleOriente(A, O, B) / 2
  const m = pointSurSegment(O, A, 3)
  const M = rotation(m, O, demiangle)
  return demiDroite(O, M, color)
}
/**
 * m = codagebissectrice(A,O,B,'blue','oo') ajoute des arcs marqués de part et d'autre de la bissectrice mais ne trace pas celle-ci.
 * @author Jean-Claude Lhote
 */
function CodageBissectrice (A, O, B, color = 'black', mark = '×') {
  ObjetMathalea2D.call(this)
  this.color = color
  this.mark = mark
  this.centre = O
  this.depart = pointSurSegment(O, A, 1.5)
  this.demiangle = angleOriente(A, O, B) / 2
  this.lieu = rotation(this.depart, O, this.demiangle)
  this.arrivee = pointSurSegment(O, B, 1.5)

  this.svg = function (coeff) {
    const a1 = codeAngle(pointSurSegment(this.centre, this.depart, 30 / coeff), O, this.demiangle, 30 / coeff, this.mark, this.color, 1, 1)
    const a2 = codeAngle(pointSurSegment(this.centre, this.lieu, 30 / coeff), O, this.demiangle, 30 / coeff, this.mark, this.color, 1, 1)
    return (
      a1.svg(coeff) +
      '\n' +
      a2.svg(coeff) +
      '\n'
    )
  }
  this.tikz = function () {
    const a1 = codeAngle(pointSurSegment(this.centre, this.depart, 1.5 / context.scale), O, this.demiangle, 1.5 / context.scale, this.mark, this.color, 1, 1)
    const a2 = codeAngle(pointSurSegment(this.centre, this.lieu, 1.5 / context.scale), O, this.demiangle, 1.5 / context.scale, this.mark, this.color, 1, 1)
    return a1.tikz() + '\n' + a2.tikz() + '\n'
  }
}

export function codageBissectrice (...args) {
  return new CodageBissectrice(...args)
}

/**
 * m = constructionBissectrice(A,O,B,false,'blue','×',tailleLosange,couleurBissectrice,epaisseurBissectrice,couleurConstruction) // Trace et code la bissectrice en laissant apparent les traits de construction au compas
 *
 * @author Rémi Angot
 */
function ConstructionBissectrice (
  A,
  O,
  B,
  detail = false,
  color = 'blue',
  mark = '×',
  tailleLosange = 5,
  couleurBissectrice = 'red',
  epaiseurBissectrice = 1,
  couleurConstruction = 'black'
) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.tailleLosange = tailleLosange
  this.mark = mark
  this.couleurBissectrice = couleurBissectrice
  this.epaiseurBissectrice = epaiseurBissectrice
  this.couleurConstruction = couleurConstruction
  if (longueur(A, O) < 0.001 || longueur(O, B) < 0.001) window.notify('ConstructionBissectrice : points confondus', { A, O, B })
  const d = bissectrice(A, O, B, this.couleurBissectrice)
  d.epaisseur = this.epaiseurBissectrice
  const objets = [d]
  if (detail) {
    const M = pointSurSegment(O, A, this.tailleLosange)
    const N = pointSurSegment(O, B, this.tailleLosange)
    const sOM = segment(O, M, this.couleurConstruction)
    const sON = segment(O, N, this.couleurConstruction)
    sOM.styleExtremites = '-|'
    sON.styleExtremites = '-|'
    const dMN = droite(M, N)
    const P = symetrieAxiale(O, dMN)
    const tNP = traceCompas(N, P)
    tNP.color = colorToLatexOrHTML(this.couleurConstruction)
    const tMP = traceCompas(M, P)
    tMP.color = colorToLatexOrHTML(this.couleurConstruction)
    const sMP = segment(M, P, this.couleurConstruction)
    const sNP = segment(N, P, this.couleurConstruction)
    sMP.pointilles = true
    sNP.pointilles = true
    const codes = codeSegments(this.mark, this.color, O, M, M, P, O, N, N, P)
    objets.push(sOM, sON, tNP, tMP, sMP, sNP, codes)
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

export function constructionBissectrice (...args) {
  return new ConstructionBissectrice(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES LIGNES BRISÉES %%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * polyline(A,B,C,D,E) //Trace la ligne brisée ABCDE
 *
 * @author Rémi Angot
 */
function Polyline (...points) {
  ObjetMathalea2D.call(this)
  if (Array.isArray(points[0])) {
    // Si le premier argument est un tableau
    this.listePoints = points[0]
    this.color = colorToLatexOrHTML(points[1])
  } else {
    this.listePoints = points
    this.color = colorToLatexOrHTML('black')
  }
  let xmin = 1000
  let xmax = -1000
  let ymin = 1000
  let ymax = -1000
  for (const unPoint of this.listePoints) {
    if (unPoint.typeObjet !== 'point') window.notify('Polyline : argument invalide', { ...points })
    xmin = Math.min(xmin, unPoint.x - this.taille / context.pixelsParCm)
    xmax = Math.max(xmax, unPoint.x + this.taille / context.pixelsParCm)
    ymin = Math.min(ymin, unPoint.y - this.taille / context.pixelsParCm)
    ymax = Math.max(ymax, unPoint.y + this.taille / context.pixelsParCm)
  }
  this.bordures = [xmin, ymin, xmax, ymax]
  this.nom = ''
  if (points.length < 15) {
    // Ne nomme pas les lignes brisées trop grandes (pratique pour les courbes de fonction)
    for (const point of points) {
      this.nom += point.nom
    }
  }
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `${point.x * coeff},${-point.y * coeff} `
    }
    return `<polyline points="${binomeXY}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
  }
  this.tikz = function () {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break
        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2)
    return `\\draw${optionsDraw} ${binomeXY};`
  }
  this.svgml = function (coeff, amp) {
    let code = ''; let s
    for (let k = 1; k < this.listePoints.length; k++) {
      s = segment(this.listePoints[k - 1], this.listePoints[k], this.color)
      s.epaisseur = this.epaisseur
      s.opacite = this.opacite
      code += s.svgml(coeff, amp)
    }
    return code
  }
  this.tikzml = function (amp) {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , segment length=3pt, amplitude = ${amp}pt}`)

    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2)
    return `\\draw${optionsDraw} ${binomeXY};`
  }
}
/**
 * Trace une ligne brisée
 * @example polyline(A,B,C,D,E) // Trace la ligne brisée ABCDE en noir
 * @example polyline([A,B,C,D,E],'blue') // Trace la ligne brisée ABCDE en bleu
 * @example polyline([A,B,C,D,E],'#f15929') // Trace la ligne brisée ABCDE en orange (code couleur HTML : #f15929)
 * @author Rémi Angot
 */
export function polyline (...args) {
  return new Polyline(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES VECTEURS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * v = vecteur('V') // son nom
 * v = vecteur(x,y) // ses composantes
 * v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * v = vecteur(x,y,'v') // son nom et ses composantes.
 * v.representant(E,'blue') // Dessine le vecteur v issu de E, en bleu.
 * Commenter toutes les méthodes possibles
 * @author Jean-Claude Lhote et Rémi Angot
 */
function Vecteur (arg1, arg2, nom = '') {
  ObjetMathalea2D.call(this)
  if (arguments.length === 1) {
    this.nom = arg1
  } else {
    if (typeof arg1 === 'number') {
      this.x = arg1
      this.y = arg2
    } else {
      this.x = arg2.x - arg1.x
      this.y = arg2.y - arg1.y
    }
    this.nom = nom
  }
  this.norme = function () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  this.oppose = function () {
    this.x = -this.x
    this.y = -this.y
  }
  this.xSVG = function (coeff) {
    return this.x * coeff
  }
  this.ySVG = function (coeff) {
    return -this.y * coeff
  }
  this.representant = function (A, color = 'black') {
    const B = point(A.x + this.x, A.y + this.y)
    const s = segment(A, B, color, '|->')
    return s
  }
  this.representantNomme = function (A, nom, taille = 1, color = 'black') {
    let s, angle, v
    const B = point(A.x + this.x, A.y + this.y)
    const M = milieu(A, B)
    s = segment(A, B, color)
    angle = s.angleAvecHorizontale
    v = similitude(this, A, 90, 0.5 / this.norme())
    if (Math.abs(angle) > 90) {
      s = segment(B, A, color)
      angle = s.angleAvecHorizontale
      v = similitude(this, A, -90, 0.5 / this.norme())
    }
    const N = translation(M, v)
    return nomVecteurParPosition(nom, N.x, N.y, taille, 0, color)
  }
}
/**
 * @example v = vecteur('V') // son nom
 * @example v = vecteur(x,y) // ses composantes
 * @example v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * @example v = vecteur(x,y,'v') // son nom et ses composantes.
 * @author Jean-Claude Lhote et Rémi Angot
 */
export function vecteur (arg1, arg2, nom = '') {
  return new Vecteur(arg1, arg2, nom)
}
/**
 * @author Jean-Claude Lhote le 31/01/2021
 * crée un nom de vecteur avec sa petite flèche
 * l'angle formé par avec l'horizontale est à donner comme argument, par défaut c'est 0
 * la taille impactera le nom et la flèche en proportion.
 * (x,y) sont les coordonnées du centre du nom.
 */
function NomVecteurParPosition (nom, x, y, taille = 1, angle = 0, color = 'black') {
  ObjetMathalea2D.call(this)
  this.nom = nom
  this.x = x
  this.y = y
  this.color = color
  this.angle = angle
  this.taille = taille
  const objets = []
  const t = texteParPosition(this.nom, this.x, this.y, -this.angle, this.color, this.taille, 'middle', true)
  const M = point(this.x, this.y)
  const P = point(M.x + 0.25 * this.nom.length, M.y)
  const M0 = similitude(P, M, 90 + this.angle, 2 / this.nom.length)
  const M1 = rotation(translation(M0, vecteur(P, M)), M0, this.angle)
  const M2 = rotation(M1, M0, 180)
  const s = segment(M1, M2, this.color)
  s.styleExtremites = '->'
  s.tailleExtremites = 3
  objets.push(t, s)
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
export function nomVecteurParPosition (nom, x, y, taille = 1, angle = 0, color = 'black') {
  return new NomVecteurParPosition(nom, x, y, taille, angle, color)
}
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES SEGMENTS %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * s = segment(A,B) //Segment d'extrémités A et B
 * s = segment(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
 * s = segment(x1,y1,x2,y2) //Segment défini par les coordonnées des deux extrémités
 * s = segment(x1,y1,x2,y2,'blue') //Segment défini par les coordonnées des deux extrémités et de couleur bleue
 *
 * @author Rémi Angot
 */
function Segment (arg1, arg2, arg3, arg4, color, styleExtremites = '') {
  ObjetMathalea2D.call(this)
  this.typeObjet = 'segment'
  this.styleExtremites = styleExtremites
  this.tailleExtremites = 4
  if (arguments.length === 2) {
    if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Segment : (attendus : A et B) les arguments de sont pas des points valides', { arg1, arg2 })
    this.x1 = arg1.x
    this.y1 = arg1.y
    this.x2 = arg2.x
    this.y2 = arg2.y
  } else if (arguments.length === 3) {
    if (isNaN(arg1.x) || isNaN(arg1.y) || isNaN(arg2.x) || isNaN(arg2.y)) window.notify('Segment : (attendus : A, B et "couleur") les arguments de sont pas des points valides', { arg1, arg2 })
    this.x1 = arg1.x
    this.y1 = arg1.y
    this.x2 = arg2.x
    this.y2 = arg2.y
    this.color = colorToLatexOrHTML(arg3)
  } else if (arguments.length === 4) {
    if (isNaN(arg3)) {
      this.x1 = arg1.x
      this.y1 = arg1.y
      this.x2 = arg2.x
      this.y2 = arg2.y
      this.color = colorToLatexOrHTML(arg3)
      this.styleExtremites = arg4
    } else {
      if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3) || isNaN(arg4)) window.notify('Segment : (attendus : x1, y1, x2 et y2) les arguments de sont pas des nombres valides', { arg1, arg2 })
      this.x1 = arg1
      this.y1 = arg2
      this.x2 = arg3
      this.y2 = arg4
    }
  } else {
    // Au moins 5 arguments
    if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3) || isNaN(arg4)) window.notify('Segment : (attendus : x1, y1, x2, y2 et "couleur") les arguments de sont pas des nombres valides', { arg1, arg2 })
    this.x1 = arg1
    this.y1 = arg2
    this.x2 = arg3
    this.y2 = arg4
    this.color = colorToLatexOrHTML(color)
    this.styleExtremites = arg4
  }
  this.bordures = [Math.min(this.x1, this.x2) - 0.2, Math.min(this.y1, this.y2) - 0.2, Math.max(this.x1, this.x2) + 0.2, Math.max(this.y1, this.y2) + 0.2]
  this.extremite1 = point(this.x1, this.y1)
  this.extremite2 = point(this.x2, this.y2)
  this.longueur = Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2)
  this.angleAvecHorizontale = angleOriente(
    point(this.x1 + 1, this.y1),
    this.extremite1,
    this.extremite2
  )

  this.codeExtremitesSVG = function (coeff) {
    let code = ''
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const h = this.tailleExtremites
    if (this.styleExtremites.length > 1) {
      if (this.styleExtremites.substr(-1) === '|') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(B, A, h * this.epaisseur / context.pixelsParCm)
        const B1 = rotation(M, B, 90)
        const B2 = rotation(M, B, -90)
        code += `<line x1="${B1.xSVG(coeff)}" y1="${B1.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites.substr(-1) === '>') {
        // si ça termine par > on rajoute une flèche en B
        const M = pointSurSegment(B, A, h * this.epaisseur / context.pixelsParCm)
        const B1 = rotation(B, M, 90)
        const B1EE = pointSurSegment(B, rotation(B, M, 90), -this.epaisseur / 2 / context.pixelsParCm)
        const B2 = rotation(B, M, -90)
        const B2EE = pointSurSegment(B, rotation(B, M, -90), this.epaisseur / 2 / context.pixelsParCm)
        code += `<line x1="${B1EE.xSVG(coeff)}" y1="${B1EE.ySVG(
            coeff
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${B2EE.xSVG(coeff)}" y1="${B2EE.ySVG(
              coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]}" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites.substr(-1) === '<') {
        // si ça termine par < on rajoute une flèche inversée en B
        const M = pointSurSegment(B, A, -h * this.epaisseur / context.pixelsParCm)
        const B1 = rotation(B, M, 90)
        const B2 = rotation(B, M, -90)
        code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites[0] === '<') {
        // si ça commence par < on rajoute une flèche en A
        const M = pointSurSegment(A, B, h * this.epaisseur / context.pixelsParCm)
        const A1 = rotation(A, M, 90)
        const A1EE = pointSurSegment(A, rotation(A, M, 90), -this.epaisseur / 2 / context.pixelsParCm)
        const A2 = rotation(A, M, -90)
        const A2EE = pointSurSegment(A, rotation(A, M, -90), this.epaisseur / 2 / context.pixelsParCm)
        code += `<line x1="${A1EE.xSVG(coeff)}" y1="${A1EE.ySVG(
            coeff
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${A2EE.xSVG(coeff)}" y1="${A2EE.ySVG(
              coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites[0] === '>') {
        // si ça commence par > on rajoute une flèche inversée en A
        const M = pointSurSegment(A, B, -h * this.epaisseur / context.pixelsParCm)
        const A1 = rotation(A, M, 90)
        const A2 = rotation(A, M, -90)
        code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
      if (this.styleExtremites[0] === '|') {
        // si ça commence par | on le rajoute en A
        const N = pointSurSegment(A, B, h * this.epaisseur / context.pixelsParCm)
        const A1 = rotation(N, A, 90)
        const A2 = rotation(N, A, -90)
        code += `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(
          coeff
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${this.color[0]
          }" stroke-width="${this.epaisseur}" />`
      }
    }
    return code
  }

  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    let code = this.codeExtremitesSVG(coeff)
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)

    code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${B.xSVG(
      coeff
    )}" y2="${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} />`
    if (this.styleExtremites.length > 0) {
      code = `<g id="${this.id}">${code}</g>`
    } else {
      code = code.replace('/>', `id="${this.id}" />`)
    }
    return code
  }

  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color =${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break

        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }
    if (this.styleExtremites.length > 1) {
      tableauOptions.push(this.styleExtremites)
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\\draw${optionsDraw} (${this.x1},${this.y1})--(${this.x2},${this.y2});`
  }
  this.svgml = function (coeff, amp) {
    this.style = 'fill="none"'
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }

    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const l = longueur(A, B)
    const dx = (B.xSVG(coeff) - A.xSVG(coeff)) / l / 2; const dy = (B.ySVG(coeff) - A.ySVG(coeff)) / l / 2
    let code = `<path d="M ${A.xSVG(coeff)}, ${A.ySVG(coeff)} Q ${Math.round(A.xSVG(coeff), 0)}, ${A.ySVG(coeff)} `
    let p = 1
    for (let k = 0; k < 2 * l + 0.25; k += 0.5) {
      p++
      code += `${Math.round(A.xSVG(coeff) + k * dx + randint(-2, 2, 0) * amp)}, ${Math.round(A.ySVG(coeff) + k * dy + randint(-2, 2, 0) * amp)} `
    }
    if (p % 2 === 1) code += ` ${Math.round(B.xSVG(coeff), 0)}, ${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style}/>`
    else code += ` ${Math.round(B.xSVG(coeff), 0)}, ${B.ySVG(coeff)} ${B.xSVG(coeff)}, ${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style}/>`
    code += this.codeExtremitesSVG(coeff)
    return code
  }
  this.tikzml = function (amp) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color =${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.styleExtremites.length > 1) {
      tableauOptions.push(this.styleExtremites)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)
    optionsDraw = '[' + tableauOptions.join(',') + ']'

    const code = `\\draw${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`
    return code
  }
}
/**
 * @param {...args} args Points ou coordonnées + couleur facultative en dernier
 * @example segment(A,B,'blue') // Segment [AB] de couleur bleu
 * @example segment(x1,y1,x2,y2,'#f15929') // Segment dont les extrémités sont respectivement (x1,y1) et (x2,y2), de couleur orange (#f15929)
 * @author Rémi Angot
 */

export function segment (...args) {
  return new Segment(...args)
}

/**
 * @param {...args} args Points ou coordonnées
 * @param {string} color Facultatif
 * @example segmentAvecExtremites(A,B,'blue')
 * @example segmentAvecExtremites(x1,y1,x2,y2,'#f15929')
 * @author Rémi Angot
 */
export function segmentAvecExtremites (...args) {
  const s = segment(...args)
  s.styleExtremites = '|-|'
  return s
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%% LES DEMI-DROITES %%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Trace la demi-droite d'origine A passant par B et de couleur color
 * @param {Point} A
 * @param {Point} B
 * @param {string} [color='black'] Facultatif, 'black' par défaut
 * @example demiDroite(A,B,'blue') // Demi-droite d'origine A passant par B et de couleur bleue
 * @author Rémi Angot
 */
export function demiDroite (A, B, color = 'black') {
  const B1 = pointSurSegment(B, A, -10)
  return segment(A, B1, color)
}

/**
 * Trace la demi-droite d'origine A passant par B avec l'origine marquée
 * @param {Point} A
 * @param {Point} B
 * @param {string} [color='black'] Facultatif, 'black' par défaut
 * @example demiDroite(A,B,'blue') // Demi-droite d'origine A passant par B et de couleur bleue
 * @author Rémi Angot
 */
export function demiDroiteAvecExtremite (A, B, color = 'black') {
  const B1 = pointSurSegment(B, A, -10)
  const s = segment(A, B1, color)
  s.styleExtremites = '|-'
  return s
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES POLYGONES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * polygone(A,B,C,D,E) //Trace ABCDE
 * polygone([A,B,C,D],"blue") // Trace ABCD en bleu
 * polygone([A,B,C,D],"blue","red","green") // Trace ABCD en bleu, rempli en rouge et hachuré en vert.
 * @author Rémi Angot
 */
function Polygone (...points) {
  ObjetMathalea2D.call(this)
  this.opaciteDeRemplissage = 1.1
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  if (Array.isArray(points[0])) {
    // Si le premier argument est un tableau
    this.listePoints = points[0]
    if (points[1]) {
      this.color = colorToLatexOrHTML(points[1])
    }
    if (points[2]) {
      this.couleurDeRemplissage = colorToLatexOrHTML(points[2])
    } else {
      this.couleurDeRemplissage = colorToLatexOrHTML('none')
    }
    if (points[3]) {
      this.couleurDesHachures = colorToLatexOrHTML(points[3])
      this.hachures = true
    } else {
      this.couleurDesHachures = colorToLatexOrHTML('black')
      this.hachures = false
    }
    this.nom = this.listePoints.join()
  } else {
    this.listePoints = points
    this.nom = this.listePoints.join()
  }
  let xmin = 1000
  let xmax = -1000
  let ymin = 1000
  let ymax = -1000
  for (const unPoint of this.listePoints) {
    if (unPoint.typeObjet !== 'point') window.notify('Polygone : argument invalide', { ...points })
    xmin = Math.min(xmin, unPoint.x)
    xmax = Math.max(xmax, unPoint.x)
    ymin = Math.min(ymin, unPoint.y)
    ymax = Math.max(ymax, unPoint.y)
  }
  this.bordures = [xmin, ymin, xmax, ymax]

  this.binomesXY = function (coeff) {
    let liste = ''
    for (const point of this.listePoints) {
      liste += `${point.x * coeff},${-point.y * coeff} `
    }
    return liste
  }
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }

    if (this.hachures) {
      if (this.couleurDeRemplissage.length < 1) {
        this.couleurDeRemplissage = colorToLatexOrHTML('none')
      }
      return pattern({
        motif: this.hachures,
        id: this.id,
        distanceDesHachures: this.distanceDesHachures,
        epaisseurDesHachures: this.epaisseurDesHachures,
        couleurDesHachures: this.couleurDesHachures[0],
        couleurDeRemplissage: this.couleurDeRemplissage[0],
        opaciteDeRemplissage: this.opaciteDeRemplissage
      }) + `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color[0]}" ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
    } else {
      if (this.couleurDeRemplissage === '') {
        this.style += ' fill="none" '
      } else {
        this.style += ` fill="${this.couleurDeRemplissage[0]}" `
        this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
      }
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      return `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
    }
  }
  this.tikz = function () {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break
        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity=${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' & this.couleurDeRemplissage[1] !== 'none') {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}}`)
    }

    if (this.hachures) {
      tableauOptions.push(pattern({
        motif: this.hachures,
        id: this.id,
        distanceDesHachures: this.distanceDesHachures,
        couleurDesHachures: this.couleurDesHachures[1],
        couleurDeRemplissage: this.couleurDeRemplissage[1],
        opaciteDeRemplissage: this.opaciteDeRemplissage
      }))
    }
    let optionsDraw = []
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }

    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${point.x},${point.y})--`
    }
    // if (this.couleurDeRemplissage === '') {
    return `\\draw${optionsDraw} ${binomeXY}cycle;`
    // } else {
    //  return `\\filldraw ${optionsDraw} ${binomeXY}cycle;`
    // }
  }
  this.svgml = function (coeff, amp) {
    let code = ''; let segmentCourant
    let A, B
    for (let k = 1; k <= this.listePoints.length; k++) {
      B = this.listePoints[k % this.listePoints.length]
      A = this.listePoints[k - 1]
      segmentCourant = segment(A, B, this.color)
      segmentCourant.epaisseur = this.epaisseur
      segmentCourant.opacite = this.opacite
      code += segmentCourant.svgml(coeff, amp)
    }
    return code
  }
  this.tikzml = function (amp) {
    let code = ''; let segmentCourant
    let A, B
    for (let k = 1; k <= this.listePoints.length; k++) {
      B = this.listePoints[k % this.listePoints.length]
      A = this.listePoints[k - 1]
      segmentCourant = segment(A, B, this.color)
      segmentCourant.isVisible = true
      segmentCourant.epaisseur = this.epaisseur
      segmentCourant.opacite = this.opacite
      code += '\t' + segmentCourant.tikzml(amp) + '\n'
    }
    return code
  }
}
/**
 * Propriétés possibles : .color, .opacite, .epaisseur, .couleurDeRemplissage, .opaciteDeRemplissage, .hachures (true or false), .distanceDesHachures, .epaisseurDesHachures,.couleurDesHachures
 * @returns {Polygone} objet Polygone
 * @example polygone(A,B,C,D,E) //Trace ABCDE
 * @example polygone([A,B,C,D],"blue") // Trace ABCD en bleu
 * @example polygone([A,B,C,D],"#f15929") // Trace ABCD en orange (code couleur HTML : #f15929)
 * @author Rémi Angot
 */
export function polygone (...args) {
  return new Polygone(...args)
}
/**
 * Crée un groupe d'objets contenant le polygone et ses sommets
 * @param  {...any} args
 * @returns [p, p.sommets]
 */
export function polygoneAvecNom (...args) {
  const p = polygone(...args)
  p.sommets = nommePolygone(p)
  p.sommets.bordures = []
  p.sommets.bordures[0] = p.bordures[0] - 1
  p.sommets.bordures[1] = p.bordures[1] - 1
  p.sommets.bordures[2] = p.bordures[2] + 1
  p.sommets.bordures[3] = p.bordures[3] + 1
  return [p, p.sommets]
}

/**
 * Renomme en une fois tous les sommets d'un polygone avec le tableau de string fourni
 */
export function renommePolygone (p, noms) {
  for (let i = 0; i < p.listePoints.length; i++) {
    if (noms[i] !== undefined) {
      p.listePoints[i].nom = noms[i]
    }
  }
}

/**
 * Trace le polygone régulier direct à n côtés qui a pour côté [AB]
 * @param {Point} A
 * @param {Point} B
 * @param {integer} n Nombre de côtés
 * @param {string} [color='black'] Facultatif
 * @author Rémi Angot
 **/
export function polygoneRegulier (A, B, n, color = 'black') {
  const listePoints = [A, B]
  for (let i = 1; i < n - 1; i++) {
    listePoints[i + 1] = rotation(
      listePoints[i - 1],
      listePoints[i],
      -180 + 360 / n
    )
  }
  return polygone(listePoints, color)
}

/**
 * polygoneRegulierIndirect(A,B,n) //Trace le polygone régulier indirect à n côtés qui a pour côté [AB]
 *
 * @author Rémi Angot
 */
export function polygoneRegulierIndirect (A, B, n, color = 'black') {
  const listePoints = [A, B]
  for (let i = 1; i < n - 1; i++) {
    listePoints[i + 1] = rotation(
      listePoints[i - 1],
      listePoints[i],
      180 - 360 / n
    )
  }
  return polygone(listePoints, color)
}

/**
 * Trace en 'color' le carré direct qui a pour côté [AB].
 * @param {Point} A
 * @param {Point} B
 * @param {string} color facultatif
 * @author Rémi Angot
 */
export function carre (A, B, color) {
  return polygoneRegulier(A, B, 4, color)
}

/**
 * carreIndirect(A,B) //Trace le carré indirect qui a pour côté [AB]
 */
export function carreIndirect (A, B, color) {
  return polygoneRegulierIndirect(A, B, 4, color)
}

function CodageCarre (c, color = 'black', mark = '×') {
  const objets = []
  objets.push(codeSegments(mark, color, c.listePoints))
  objets.push(
    codageAngleDroit(
      c.listePoints[0],
      c.listePoints[1],
      c.listePoints[2],
      color
    )
  )
  objets.push(
    codageAngleDroit(
      c.listePoints[1],
      c.listePoints[2],
      c.listePoints[3],
      color
    )
  )
  objets.push(
    codageAngleDroit(
      c.listePoints[2],
      c.listePoints[3],
      c.listePoints[0],
      color
    )
  )
  objets.push(
    codageAngleDroit(
      c.listePoints[3],
      c.listePoints[0],
      c.listePoints[1],
      color
    )
  )

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

export function codageCarre (...args) {
  return new CodageCarre(...args)
}

/**
 * polygoneRegulierParCentreEtRayon(O,r,n) //Trace le polygone régulier à n côtés et de rayon r
 *
 * @author Rémi Angot
 */
export function polygoneRegulierParCentreEtRayon (O, r, n, color = 'black') {
  const p = []
  p[0] = point(O.x + r, O.y)
  for (let i = 1; i < n; i++) {
    p[i] = rotation(p[i - 1], O, -360 / n)
  }
  return polygone(p, color)
}
/**
 * Objet composé d'un rectangle horizontal et d'un texte optionnel à l'intérieur
 * Les paramètres sont les suivants :
 * Xmin, Ymin : coordonnées du sommet en bas à gauche
 * Xmax,Ymax : coordonnées du sommet en haut à droite
 * color : la couleur de la bordure
 * colorFill : 'none' sinon, la couleur de remplissage (exemple : 'orange') Code couleur HTML accepté
 * opaciteDeRemplissage : valeur de 0 (transparent) à 1 (opaque)
 * texteIn : texte à mettre à l'intérieur
 * tailleTexte : comme son nom l'indique la taille du texte (1 par défaut)
 * texteColor : sa couleur
 * textMath : un booléen qui détermine la police (true -> Book Antiqua Italic)
 * echelleFigure : pour passer la valeur de scale de tikzPicture (valeur scale de la commande mathalea) afin d'adapter la taille du texte dans la boite à la résolution
 * @author Jean-Claude Lhote
 */
class Boite {
  constructor ({ Xmin = 0, Ymin = 0, Xmax = 1, Ymax = 1, color = 'black', colorFill = 'none', opaciteDeRemplissage = 0.7, texteIn = '', tailleTexte = 1, texteColor = 'black', texteOpacite = 0.7, texteMath = false, echelleFigure = 1 } = {}) {
    ObjetMathalea2D.call(this)
    this.forme = polygone([point(Xmin, Ymin), point(Xmax, Ymin), point(Xmax, Ymax), point(Xmin, Ymax)], color)
    this.bordures = this.forme.bordures
    if (colorFill !== 'none') {
      this.forme.couleurDeRemplissage = colorToLatexOrHTML(colorFill)
      this.forme.opaciteDeRemplissage = opaciteDeRemplissage
    }
    if (texteIn !== '') {
      this.texte = texteParPositionEchelle(texteIn, (Xmin + Xmax) / 2, (Ymin + Ymax) / 2, 'milieu', texteColor, tailleTexte, 'middle', texteMath, echelleFigure)
      this.texte.opacite = texteOpacite
    } else {
      this.texte = false
    }
    this.svg = function (coeff) {
      return this.texte ? this.forme.svg(coeff) + this.texte.svg(coeff) : this.forme.svg(coeff)
    }
    this.tikz = function () {
      return this.texte ? this.forme.tikz() + this.texte.tikz() : this.forme.tikz()
    }
  }
}

export function boite ({ Xmin = 0, Ymin = 0, Xmax = 1, Ymax = 1, color = 'black', colorFill = 'none', opaciteDeRemplissage = 0.7, texteIn = '', tailleTexte = 1, texteColor = 'black', texteOpacite = 0.7, texteMath = false, echelleFigure = 1 } = {}) {
  return new Boite({ Xmin: Xmin, Ymin: Ymin, Xmax: Xmax, Ymax: Ymax, color: color, colorFill: colorFill, opaciteDeRemplissage: opaciteDeRemplissage, texteIn: texteIn, tailleTexte: tailleTexte, texteColor: texteColor, texteOpacite: texteOpacite, texteMath: texteMath, echelleFigure: echelleFigure })
}

/*********************************************/
/** ***************Triangles ******************/
/*********************************************/

/**
 * retourne un objet contenant le triangle ABC et le pied de la hauteur H
 * @param {point} A première extrémité de la base
 * @param {point} B deuxième extrémité de la base
 * @param {number} h hauteur du triangle en cm
 * @param {number} d valeur algébrique de AH où H est le pied de la hauteur
 * @param {*} n = 1 ou 2 permet de choisir le côté pour C.
 * @author Jean-Claude Lhote
 * @returns {objet} {triangle, pied}
 */
export function triangle2points1hauteur (A, B, h, d, n = 1, color = 'black') {
  if (d === undefined) {
    d = randint(0, floor(longueur(A, B)))
  }
  const H = pointSurSegment(A, B, d)
  const C = similitude(A, H, 90 * (3 - n * 2), h / longueur(A, H))
  return { triangle: polygone(A, B, C, color), pied: H }
}

/**
 * @param {Point} A
 * @param {Point} B
 * @param {number} l1
 * @param {number} l2
 * @param {number} [n=1] Si n = 1 (défaut), C a la plus grande ordonnée possible, si n = 2, C a la plus petite ordonnée possible
 * @returns {Polygone} objet Polygone ABC
 * @example t = triangle2points2longueurs(A,B,4,7,2) // Récupère t le triangle ABC tel que AC = 4 cm et BC = 7 cm avec C qui a l'ordonnée la plus petite possible
 * @example C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
 * @author Rémi Angot
 */
export function triangle2points2longueurs (A, B, l1, l2, n = 1, color = 'black') {
  const c1 = cercle(A, l1)
  const c2 = cercle(B, l2)
  let C
  if (n === 1) {
    C = pointIntersectionCC(c1, c2)
  } else {
    C = pointIntersectionCC(c1, c2, '', 2)
  }
  c1.isVisible = false
  c2.isVisible = false
  return polygone(A, B, C, color)
}

/**
 * t = triangle2points2angles(A,B,40,60) // Trace le triangle ABC tel que CAB = +40° et CBA = -60°
 * C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
 * t = triangle2points2angles(A,B,40,60,2) // Trace le triangle ABC tel que CAB = -40° et CBA = 60°
 * @author Rémi Angot
 */
export function triangle2points2angles (A, B, a1, a2, n = 1, color = 'black') {
  if (n === 1) {
    a2 *= -1
  } else {
    a1 *= -1
  }
  const a = pointSurSegment(A, B, 1)
  const c1 = rotation(a, A, a1)
  const b = pointSurSegment(B, A, 1)
  const c2 = rotation(b, B, a2)
  const dAc1 = droite(A, c1)
  const dBc2 = droite(B, c2)
  dAc1.isVisible = false
  dBc2.isVisible = false
  const C = pointIntersectionDD(dAc1, dBc2, 'C')
  return polygone(A, B, C, color)
}
/**
 *
 * @param {Point} A Le sommet pour l'angle donné = première extrémité du segment de base du triangle
 * @param {Point} B L'autre extrémité du segment de base
 * @param {number} a l'angle au sommet A (angle compris entre 0 et 180 sinon il y est contraint)
 * @param {number} l la longueur du deuxième côté de l'angle
 * @param {number} n n=1 l'angle a est pris dans le sens direct, n différent de 1, l'angle a est pris dans le sens indirect.
 * t = triangle2points1angle1longueur(A,B,40,6) // Trace le triangle ABC tel que CAB = 40° et AC=6
 * @author Jean-Claude Lhote
 */
export function triangle2points1angle1longueur (A, B, a, l, n = 1, color = 'black') {
  if (n === 1) {
    a = Math.abs(a) % 180
  } else {
    a = -(Math.abs(a) % 180)
  }
  const P = pointSurSegment(A, B, l)
  const Q = rotation(P, A, a)
  return polygone(A, B, Q, color)
}
/**
 * @param {Point} A Le sommet pour l'angle donné = première extrémité du segment de base du triangle
 * @param {Point} B L'autre extrémité du segment de base
 * @param {number} a l'angle au sommet A (angle compris entre 0 et 180 sinon il y est contraint)
 * @param {number} l la longueur du côté opposé à l'angle
 * @param {number} n n=1 l'angle a est pris dans le sens direct et le point est le plus près de A
 * n=2 l'angle est pris dans le sens indirect et le point est le plus près de A
 * n=3 l'angle a est pris dans le sens direct et le point est le plus loin de A
 * n=4 l'angle est pris dans le sens indirect et le point est le plus loin de A
 * t = triangle2points1angle1longueurOppose(A,B,40,6) // Trace le triangle ABC tel que CAB = 40° et BC=6 Le point C est celui des deux points possible le plus près de A
 * @author Jean-Claude Lhote
 */
export function triangle2points1angle1longueurOppose (A, B, a, l, n = 1, color = 'black') {
  let M
  if (n % 2 === 1) {
    a = Math.abs(a) % 180
  } else {
    a = -(Math.abs(a) % 180)
  }
  const d = droite(A, B)
  const e = rotation(d, A, a)
  const c = cercle(B, l)
  d.isVisible = false
  e.isVisible = false
  c.isVisible = false
  if ((n + 1) >> 1 === 1) M = pointIntersectionLC(e, c, '', 1)
  else M = pointIntersectionLC(e, c, '', 2)
  return polygone(A, B, M, color)
}

/*********************************************/
/** ************* Parallélogrammes ***********/
/*********************************************/
/**
 * fonction qui retourne le parallélogramme ABCD dont on donne les 3 premiers points A, B et C
 *
 * @param {string} NOM
 * @param {objet} A
 * @param {objet} B
 * @param {objet} C
 * @returns {polygoneAvecNom}
 */
export function parallelogramme3points (NOM, A, B, C, color = 'black') {
  const D = translation(A, vecteur(B, C), NOM[3])
  A.nom = NOM[0]
  B.nom = NOM[1]
  C.nom = NOM[2]
  return polygoneAvecNom(A, B, C, D, color)
}
/**
 * parallelogramme2points1hauteur(A,B,5) renvoie un parallélogramme ABCD de base [AB] et de hauteur h
 * parallelogramme2points1hauteur(A,7,5) renvoie un parallélogramme ABCD de base 7cm (le point B est choisi sur le cercle de centre A et de rayon 7cm) et de hauteur h
 *
 * @param {String} NOM
 * @param {objet} A
 * @param {objet} B
 * @param {number} h
 * @returns {polygoneAvecNom}
 */
export function parallelogramme2points1hauteur (NOM, A, B, h, color = 'black') {
  if (typeof B === 'number') {
    B = pointAdistance(A, B, randint(-180, 180))
  }
  A.nom = NOM[0]
  B.nom = NOM[1]
  let H = rotation(B, A, 90)
  H = pointSurSegment(A, H, h)
  const D = translation(H, homothetie(vecteur(A, B), A, randint(-4, 4, 0) / 10), NOM[3])
  const C = translation(D, vecteur(A, B), NOM[2])
  return polygoneAvecNom(A, B, C, D, color)
}

/**
 * nommePolygone (p,'ABCDE',0.5,'red') nomme les sommets du polygone p. Les labels sont placés à une distance paramètrable en cm des sommets (0.5 par défaut)
 * @author Jean-Claude Lhote
 */
function NommePolygone (p, nom = '', k = 0.5, color = 'black') {
  ObjetMathalea2D.call(this)
  this.poly = p
  this.dist = k
  for (let i = 0; i < p.listePoints.length; i++) {
    if (nom !== '') p.listePoints[i].nom = nom[i]
  }
  this.svg = function (coeff) {
    let code = ''
    let P; const p = this.poly; const d = this.dist
    const G = barycentre(p)
    for (let i = 0; i < p.listePoints.length; i++) {
      P = pointSurSegment(G, p.listePoints[i], longueur(G, p.listePoints[i]) + d * 20 / coeff)
      P.positionLabel = 'center'
      code += '\n\t' + texteParPoint(p.listePoints[i].nom, P, 'milieu', color, 1, 'middle', true).svg(coeff)
    }
    return code
  }

  this.tikz = function () {
    let code = ''
    let P; const p = this.poly; const d = this.dist
    const G = barycentre(p)
    for (let i = 0; i < p.listePoints.length; i++) {
      P = pointSurSegment(G, p.listePoints[i], longueur(G, p.listePoints[i]) + d / context.scale)
      code += '\n\t' + texteParPoint(`$${p.listePoints[i].nom}$`, P, 'milieu', color).tikz()
    }
    return code
  }
}

export function nommePolygone (...args) {
  return new NommePolygone(...args)
}

/**
 * deplaceLabel(p1,'AB','below') // S'il y a un point nommé 'A' ou 'B' dans le polygone, son nom sera mis en dessous du point.
 * @author Rémi Angot
 */
export function deplaceLabel (p, nom, positionLabel) {
  for (let i = 0; i < p.listePoints.length; i++) {
    for (const lettre in nom) {
      if (p.listePoints[i].nom === nom[lettre]) {
        p.listePoints[i].positionLabel = positionLabel
        labelPoint(p.listePoints[i])
      }
    }
  }
}
/**
 * aireTriangle(p) retourne l'aire du triangle si p est un triangle, false sinon.
 * @author Jean-Claude Lhote
 */
export function aireTriangle (p) {
  if (p.listePoints.length !== 3) return false
  const A = p.listePoints[0]
  const B = p.listePoints[1]
  const C = p.listePoints[2]
  return (
    (1 / 2) * Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y))
  )
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES CERCLES ET ARCS %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * c = cercle(O,r) //Cercle de centre O et de rayon r
 * @author Rémi Angot
 */
function Cercle (O, r, color = 'black', couleurDeRemplissage = 'none', couleurDesHachures = 'none') {
  ObjetMathalea2D.call(this)
  this.color = colorToLatexOrHTML(color)
  this.centre = O
  this.rayon = r
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = 1.1
  this.hachures = couleurDesHachures !== 'none' & couleurDesHachures !== ''
  this.couleurDesHachures = colorToLatexOrHTML(couleurDesHachures)
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  this.bordures = [O.x - r, O.y - r, O.x + r, O.y + r]
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }

    if (this.hachures) {
      if (this.couleurDeRemplissage.length < 1) {
        this.couleurDeRemplissage = colorToLatexOrHTML('none')
      }
      return pattern({
        motif: this.hachures,
        id: this.id,
        distanceDesHachures: this.distanceDesHachures,
        epaisseurDesHachures: this.epaisseurDesHachures,
        couleurDesHachures: this.couleurDesHachures[0],
        couleurDeRemplissage: this.couleurDeRemplissage[0],
        opaciteDeRemplissage: this.opaciteDeRemplissage
      }) + `<circle cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" r="${r * coeff}" stroke="${this.color[0]}" ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
    } else {
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      if (this.couleurDeRemplissage === '') {
        this.style += ' fill="none" '
      } else {
        this.style += ` fill="${this.couleurDeRemplissage[0]}" `
        this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
      }

      return `<circle cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" r="${r * coeff
        }" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
    }
  }
  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break
        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' & this.couleurDeRemplissage[1] !== 'none') {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}}`)
    }

    if (this.hachures) {
      tableauOptions.push(pattern({
        motif: this.hachures,
        id: this.id,
        distanceDesHachures: this.distanceDesHachures,
        epaisseurDesHachures: this.epaisseurDesHachures,
        couleurDesHachures: this.couleurDesHachures[1],
        couleurDeRemplissage: this.couleurDeRemplissage[1],
        opaciteDeRemplissage: this.opaciteDeRemplissage
      }))
    }

    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\\draw${optionsDraw} (${O.x},${O.y}) circle (${r});`
  }
  this.svgml = function (coeff, amp) {
    this.style = ''
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }

    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    this.style += ' fill="none" '
    let code = `<path d="M ${O.xSVG(coeff) + r * coeff} ${O.ySVG(coeff)} S ${O.xSVG(coeff) + r * coeff} ${O.ySVG(coeff)}, `
    let compteur = 1
    for (let k = 1, variation; k < 181; k++) {
      variation = (random(0, 2) - 1) * amp / 10
      code += `${O.xSVG(coeff) + round((r + variation) * Math.cos(2 * k * Math.PI / 180) * coeff, 2)} ${O.ySVG(coeff) + round((r + variation) * Math.sin(2 * k * Math.PI / 180) * coeff, 2)}, `
      compteur++
    }
    if (compteur % 2 === 0) code += ` ${O.xSVG(coeff) + r * coeff} ${O.ySVG(coeff)}, `
    code += ` ${O.xSVG(coeff) + r * coeff} ${O.ySVG(coeff)} Z" stroke="${this.color[0]}" ${this.style}"/>`
    return code
  }
  this.tikzml = function (amp) {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)
    optionsDraw = '[' + tableauOptions.join(',') + ']'

    const code = `\\draw${optionsDraw} (${O.x},${O.y}) circle (${r});`
    return code
  }
}
/**
 * Construit le cercle de centre O, de rayon r et de couleur color
 * @param {Point} O Centre du cercle
 * @param {number} r Rayon du cercle
 * @param {string} [color='black'] Les couleurs sont cette forme '#f15929' sont acceptées aussi
 * @returns {Cercle} objet Cercle
 */
export function cercle (O, r, color = 'black', couleurDeRemplissage = 'none', couleurDesHachures = 'none') {
  return new Cercle(O, r, color, couleurDeRemplissage, couleurDesHachures)
}

/**
 * c = ellipse(O,rx,ry) //Ellipse de centre O et de rayon rx et ry
 * @author Rémi Angot
 */
function Ellipse (O, rx, ry, color = 'black') {
  ObjetMathalea2D.call(this)
  this.color = colorToLatexOrHTML(color)
  this.centre = O
  this.rx = rx
  this.ry = ry
  this.couleurDeRemplissage = ''
  this.opaciteDeRemplissage = 1.1
  this.bordures = [O.x - rx, O.y - ry, O.x + rx, O.y + ry]
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    if (this.couleurDeRemplissage === '') {
      this.style += ' fill="none" '
    } else {
      this.style += ` fill="${this.couleurDeRemplissage[0]}" `
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
    }

    return `<ellipse cx="${O.xSVG(coeff)}" cy="${O.ySVG(coeff)}" rx="${rx * coeff}" ry="${ry * coeff}" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
  }
  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break
        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' & this.couleurDeRemplissage[1] !== 'none') {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}}`)
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\\draw${optionsDraw} (${O.x},${O.y}) ellipse (${rx}cm and ${ry}cm);`
  }
  this.svgml = function (coeff, amp) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }

    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }

    let code = `<path d="M ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)} C ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)}, `
    let compteur = 1
    for (let k = 1, variation; k < 181; k++) {
      variation = (random(0, 2) - 1) * amp / 10
      code += `${O.xSVG(coeff) + round((rx + variation) * Math.cos(2 * k * Math.PI / 180) * coeff, 2)} ${O.ySVG(coeff) + round((ry + variation) * Math.sin(2 * k * Math.PI / 180) * coeff, 2)}, `
      compteur++
    }
    if (compteur % 2 === 0) code += ` ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)}, `
    code += ` ${O.xSVG(coeff) + rx * coeff} ${O.ySVG(coeff)} Z" stroke="${this.color[0]}" ${this.style}"/>`
    return code
  }
  this.tikzml = function (amp) {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)
    optionsDraw = '[' + tableauOptions.join(',') + ']'

    const code = `\\draw${optionsDraw} (${O.x},${O.y}) ellipse (${rx}cm and ${ry}cm);`
    return code
  }
}
export function ellipse (...args) {
  return new Ellipse(...args)
}

/**
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @example I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
 * @author Jean-Claude Lhote
 */
export function pointIntersectionLC (d, C, nom = '', n = 1) {
  const O = C.centre
  const r = C.rayon
  const a = d.a
  const b = d.b
  const c = d.c
  const xO = O.x
  const yO = O.y
  let Delta, delta, xi, yi, xiPrime, yiPrime
  if (egal(a, 0, 0.000001)) {
    // la droite est verticale
    xi = -c / a
    xiPrime = xi
    Delta = 4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r)
    if (Delta < 0) return false
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      yi = yO + Math.sqrt(Delta) / 2
      yiPrime = yi
    } else {
      // deux points d'intersection
      yi = yO - Math.sqrt(Delta) / 2
      yiPrime = yO + Math.sqrt(Delta) / 2
    }
  } else if (egal(a, 0, 0.0000001)) {
    // la droite est horizontale
    yi = -c / b
    yiPrime = yi
    Delta = 4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r)
    if (Delta < 0) return false
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      xi = xO + Math.sqrt(Delta) / 2
      xiPrime = xi
    } else {
      // deux points d'intersection
      xi = xO - Math.sqrt(Delta) / 2
      xiPrime = xO + Math.sqrt(Delta) / 2
    }
  } else {
    // cas général
    Delta = (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 - 4 * (1 + (a / b) ** 2) * (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r)
    if (Delta < 0) return false
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      delta = Math.sqrt(Delta)
      xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) / (2 * (1 + (a / b) ** 2))
      xiPrime = xi
      yi = (-a * xi - c) / b
      yiPrime = yi
    } else {
      // deux points d'intersection
      delta = Math.sqrt(Delta)
      xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) / (2 * (1 + (a / b) ** 2))
      xiPrime = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) / (2 * (1 + (a / b) ** 2))
      yi = (-a * xi - c) / b
      yiPrime = (-a * xiPrime - c) / b
    }
  }
  if (n === 1) {
    if (yiPrime > yi) {
      return point(xiPrime, yiPrime, nom)
    } else {
      return point(xi, yi, nom)
    }
  } else {
    if (yiPrime > yi) {
      return point(xi, yi, nom)
    } else {
      return point(xiPrime, yiPrime, nom)
    }
  }
}

/**
 * M = pointIntersectionCC(c1,c2,'M') // M est le point d'intersection le plus haut des cercles c1 et c2
 * M = pointIntersectionCC(c1,c2,'M',2) // M est le point d'intersection le plus bas des cercles c1 et c2
 * La fonction ne renvoie rien si les cercles n'ont pas de points d'intersection
 * @author Rémi Angot
 * @Source https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
 */
export function pointIntersectionCC (c1, c2, nom = '', n = 1) {
  const O1 = c1.centre
  const O2 = c2.centre
  const r0 = c1.rayon
  const r1 = c2.rayon
  const x0 = O1.x
  const x1 = O2.x
  const y0 = O1.y
  const y1 = O2.y
  const dx = x1 - x0
  const dy = y1 - y0
  const d = Math.sqrt(dy * dy + dx * dx)
  if (d > r0 + r1) {
    return false
  }
  if (d < Math.abs(r0 - r1)) {
    return false
  }
  const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d)
  const x2 = x0 + (dx * a) / d
  const y2 = y0 + (dy * a) / d
  const h = Math.sqrt(r0 * r0 - a * a)
  const rx = -dy * (h / d)
  const ry = dx * (h / d)
  const xi = x2 + rx
  const xiPrime = x2 - rx
  const yi = y2 + ry
  const yiPrime = y2 - ry
  if (n === 1) {
    if (yiPrime > yi) {
      return point(xiPrime, yiPrime, nom)
    } else {
      return point(xi, yi, nom)
    }
  } else {
    if (yiPrime > yi) {
      return point(xi, yi, nom)
    } else {
      return point(xiPrime, yiPrime, nom)
    }
  }
}

/**
 *  c = cercleCentrePoint(O,A) //Cercle de centre O passant par A
 *  c = cercleCentrePoint(O,A,'blue') //Cercle de centre O passant par A en bleu
 *
 * @author Rémi Angot
 */
function CercleCentrePoint (O, M, color = 'black') {
  Cercle.call(this, O, longueur(O, M), color)
}
export function cercleCentrePoint (...args) {
  return new CercleCentrePoint(...args)
}

/**
 * @author Jean-Claude Lhote
 * @param {object} M point de départ de l'arc
 * @param {object} Omega centre de l'arc
 * @param {number} angle compris entre -360 et 360 valeur négative = sens indirect
 * @param {boolean} rayon booléen si true, les rayons délimitant l'arc sont ajoutés
 * @param {boolean} couleurDeRemplissage
 * @param {string} color
 * @param {number} fillOpacite // transparence de remplissage de 0 à 1.
 * @param {string} couleurDesHachures
 */

function Arc (M, Omega, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', fillOpacite = 0.2, couleurDesHachures = 'none') {
  ObjetMathalea2D.call(this)
  this.color = colorToLatexOrHTML(color)
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = fillOpacite
  this.hachures = couleurDesHachures !== 'none' & couleurDesHachures !== ''
  this.couleurDesHachures = colorToLatexOrHTML(couleurDesHachures)
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  this.pointilles = false
  const med = rotation(M, Omega, angle / 2)
  if (typeof (angle) !== 'number') {
    angle = angleOriente(M, Omega, angle)
  }
  const l = longueur(Omega, M); let large = 0; let sweep = 0
  const A = point(Omega.x + 1, Omega.y)
  const azimut = angleOriente(A, Omega, M)
  const anglefin = azimut + angle
  const angleSVG = angleModulo(angle)
  if (angle > 180) {
    sweep = 0 // option pour path : permet de savoir quel morceau de cercle tracé parmi les 2 possibles. Voir https://developer.mozilla.org/fr/docs/Web/SVG/Tutorial/Paths pour plus de détails
    large = 1 // option pour path : permet de savoir sur un morceau de cercle choisi, quel parcours prendre.
  } else if (angle < -180) {
    large = 1
    sweep = 1
  } else {
    large = 0
    sweep = 1 - (angle > 0)
  }
  const N = rotation(M, Omega, angleSVG)
  this.bordures = [Math.min(M.x, N.x, med.x) - 0.1, Math.min(M.y, N.y, med.y) - 0.1, Math.max(M.x, N.x, med.x) + 0.1, Math.max(M.y, N.y, med.y) + 0.1]
  if (rayon) {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }
      if (this.pointilles) {
        switch (this.pointilles) {
          case 1:
            this.style += ' stroke-dasharray="6 10" '
            break
          case 2:
            this.style += ' stroke-dasharray="6 3" '
            break
          case 3:
            this.style += ' stroke-dasharray="3 2 6 2 " '
            break
          case 4:
            this.style += ' stroke-dasharray="1 2" '
            break
          default:
            this.style += ' stroke-dasharray="5 5" '
            break
        }
      }
      if (this.hachures) {
        if (this.couleurDeRemplissage.length < 1) {
          this.couleurDeRemplissage = colorToLatexOrHTML('none')
        }

        return pattern({
          motif: this.hachures,
          id: this.id,
          distanceDesHachures: this.distanceDesHachures,
          epaisseurDesHachures: this.epaisseurDesHachures,
          couleurDesHachures: this.couleurDesHachures[0],
          couleurDeRemplissage: this.couleurDeRemplissage[0],
          opaciteDeRemplissage: this.opaciteDeRemplissage
        }) + `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color[0]}"  ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
      } else {
        if (this.opacite !== 1) {
          this.style += ` stroke-opacity="${this.opacite}" `
        }
        if (this.couleurDeRemplissage[0] !== 'none') {
          this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
        }

        return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" ${this.style}/>`
      }
    }
  } else {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }
      if (this.pointilles) {
        switch (this.pointilles) {
          case 1:
            this.style += ' stroke-dasharray="6 10" '
            break
          case 2:
            this.style += ' stroke-dasharray="6 3" '
            break
          case 3:
            this.style += ' stroke-dasharray="3 2 6 2 " '
            break
          case 4:
            this.style += ' stroke-dasharray="1 2" '
            break
          default:
            this.style += ' stroke-dasharray="5 5" '
            break
        }
      }
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      this.style += ' fill-opacity="0" '

      return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
    }
  }
  this.tikz = function () {
    let optionsDraw = []
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          tableauOptions.push(' dash dot ')
          break
        case 2:
          tableauOptions.push(' densely dash dot dot ')
          break
        case 3:
          tableauOptions.push(' dash dot dot ')
          break
        case 4:
          tableauOptions.push(' dotted ')
          break
        default:
          tableauOptions.push(' dashed ')
          break
      }
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (rayon && (this.couleurDeRemplissage[1] !== 'none' && this.couleurDeRemplissage !== '')) {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}}`)
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }

    if (this.hachures) {
      tableauOptions.push(pattern({
        motif: this.hachures,
        id: this.id,
        distanceDesHachures: this.distanceDesHachures,
        couleurDesHachures: this.couleurDesHachures[1],
        couleurDeRemplissage: this.couleurDeRemplissage[1],
        opaciteDeRemplissage: this.opaciteDeRemplissage
      }))
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    if (rayon) return `\\draw  ${optionsDraw} (${N.x},${N.y}) -- (${Omega.x},${Omega.y}) -- (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${longueur(Omega, M)}) ;`
  }
  let code, P

  this.svgml = function (coeff, amp) {
    this.style = ''
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    this.style += ' fill="none" '
    code = `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} S ${M.xSVG(coeff)} ${M.ySVG(coeff)}, `
    let compteur = 1
    const r = longueur(Omega, M)
    for (let k = 0, variation; abs(k) <= abs(angle) - 2; k += angle < 0 ? -2 : 2) {
      variation = (random(0, 2) - 1) / r * amp / 10
      P = rotation(homothetie(M, Omega, 1 + variation), Omega, k)
      code += `${round(P.xSVG(coeff), 2)} ${round(P.ySVG(coeff), 2)}, `
      compteur++
    }
    P = rotation(M, Omega, angle)
    if (compteur % 2 === 0) code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}, ` // Parce qu'on utilise S et non C dans le path
    code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}`
    code += `" stroke="${color}" ${this.style}/>`
    return code
  }

  this.tikzml = function (amp) {
    let optionsDraw = []
    const tableauOptions = []
    const A = point(Omega.x + 1, Omega.y)
    const azimut = arrondi(angleOriente(A, Omega, M), 1)
    const anglefin = arrondi(azimut + angle, 1)
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    tableauOptions.push(`decorate,decoration={random steps , amplitude = ${amp}pt}`)

    optionsDraw = '[' + tableauOptions.join(',') + ']'

    return `\\draw${optionsDraw} (${M.x},${M.y}) arc (${azimut}:${anglefin}:${arrondi(longueur(Omega, M), 2)}) ;`
  }
}

/**
 * @param {Point} M Point de départ de l'arc
 * @param {Point} Omega Centre de l'arc
 * @param {number} angle Compris entre -360 et 360. Valeur négative = sens indirect
 * @param {boolean} rayon Si true, les rayons délimitant l'arc sont ajoutés. Facultatif, false par défaut
 * @param {string} fill Facultatif, 'none' par défaut
 * @param {string} color Facultatif, 'black' par défaut
 * @param {number} fillOpacite Transparence de remplissage de 0 à 1. Facultatif, 0.2 par défaut
 * @param {string} couleurDesHachures Facultatif, 'black' par défaut
 * @author Jean-Claude Lhote
 * @return {Arc} Objet Arc
 */
export function arc (M, Omega, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', fillOpacite = 0.2, couleurDesHachures = 'none') {
  return new Arc(M, Omega, angle, rayon, couleurDeRemplissage, color, fillOpacite, couleurDesHachures)
}
/**
 *
 * @param {Point} M //première extrémité de l'arc
 * @param {Point} N //deuxième extrémité de l'arc
 * @param {number} angle //angle au centre de l'arc compris entre -360 et +360 !
 * @param {boolean} rayon //si true, l'arc est fermé par deux rayons aux extrémités
 * @param {string} fill //couleur de remplissage (par défaut 'none'= sans remplissage)
 * @param {string} color //couleur de l'arc
 * @param {number} fillOpacite // transparence de remplissage de 0 à 1.
 * @author Jean-Claude Lhote
 */
function ArcPointPointAngle (M, N, angle, rayon = false, fill = 'none', color = 'black', fillOpacite = 0.2) {
  let anglerot
  if (angle < 0) anglerot = (angle + 180) / 2
  else anglerot = (angle - 180) / 2
  const d = mediatrice(M, N, 'black')
  d.isVisible = false
  const e = droite(N, M)
  e.isVisible = false
  const f = rotation(e, N, anglerot)
  f.isVisible = false
  const determinant = d.a * f.b - f.a * d.b
  const Omegax = (d.b * f.c - f.b * d.c) / determinant
  const Omegay = (f.a * d.c - d.a * f.c) / determinant
  const Omega = point(Omegax, Omegay)
  Arc.call(this, M, Omega, angle, rayon, fill, color, fillOpacite)
}
export function arcPointPointAngle (...args) {
  return new ArcPointPointAngle(...args)
}
/**
 * m = traceCompas(O, A, 20) trace un arc de cercle de centre O qui commence 10° avant A et finit 10° après.
 *@author Jean-Claude Lhote
 */
export function traceCompas (
  O,
  A,
  angle = 20,
  color = 'gray',
  opacite = 1.1,
  epaisseur = 1,
  pointilles = false
) {
  const B = rotation(A, O, -angle / 2)
  const a = arc(B, O, angle, false)
  a.epaisseur = epaisseur
  a.opacite = opacite
  a.color = colorToLatexOrHTML(color)
  a.pointilles = pointilles
  return a
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES COURBES DE BÉZIER %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function CourbeDeBezier (A, B, C) {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    const code = `<path d="M${A.xSVG(coeff)} ${A.ySVG(coeff)} Q ${B.xSVG(
      coeff
    )} ${B.ySVG(coeff)}, ${C.xSVG(coeff)} ${C.ySVG(
      coeff
    )}" stroke="black" fill="transparent"/>`
    return code
  }
}

export function courbeDeBezier (...args) {
  return new CourbeDeBezier(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES TRANSFORMATIONS %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * retourne un couple de coordonnées correspondant au centre d'une cible
 * afin que le point (x,y) se trouve dans la case correspondante à cellule
 * cellule est une chaine comme 'A1' ou 'B3'
 * @author Jean-Claude Lhote
 */
export function dansLaCibleCarree (x, y, rang, taille, cellule) {
  const lettre = cellule[0]; const chiffrelettre = lettre.charCodeAt(0) - 64
  // const Taille = Math.floor(3 * taille)
  const chiffre = parseInt(cellule[1])
  // dx et dy étaient utilisés pour décentrer le point dans la cellule... cela pouvait entrainer des points très proches des cellules voisines
  // en recentrant les points dans les cellules, on tolère une plus grande marge d'erreur.
  const dx = 0 // randint(-Taille, Taille) / 10
  const dy = 0 // randint(-Taille, Taille) / 10
  const delta = taille / 2
  if (chiffre > rang || chiffrelettre > rang) return 'Cette cellule n\'existe pas dans la cible'
  else {
    return [x + dx - chiffrelettre * taille + delta + rang * delta, y + dy - chiffre * 2 * delta + (rang + 1) * delta]
  }
}
/**
 * Comme dansLaCibleCarree mais pour un cible ronde. (voir ci-dessus)
 * Cellule va de A1 à Hn où n est le rang de la cible.
 * taille c'est la différence entre deux rayons successifs.
 * x et y sont les coordonnées du point à cibler.
 * @author Jean-Claude Lhote
 */
export function dansLaCibleRonde (x, y, rang, taille, cellule) {
  const lettre = cellule[0]; const chiffrelettre = lettre.charCodeAt(0) - 64
  // const Taille = Math.floor(4 * taille)
  const chiffre = parseInt(cellule[1])
  const drayon = 0 // randint(-Taille, Taille) / 10
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

function CibleCarree ({ x = 0, y = 0, rang = 4, num, taille = 0.6, color = 'gray', opacite = 0.5 }) {
  ObjetMathalea2D.call(this)
  this.x = x
  this.y = y
  this.rang = rang
  this.taille = taille
  this.color = color
  this.opacite = opacite
  const objets = []
  let numero
  // Si un numéro est donné on l'ajoute en filigrane.
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
 * création d'une cible carrée pour l'auto-correction
 * @author Jean-Claude Lhote
 * @param {number} x
 * @param {number} y // les coordonnées du point au centre de la cible
 * @param {number} rang // le nombre de cases de large
 * @param {number} num // Un numéro ou rien pour identifier la cible (quand il y en a plusieurs)
 * @param {number} taille // en cm, la taille des cases
 * @param {string} color // la couleur de la cible
 * @param {number} opacite // l'opacité de la cible
 * @param {} param0
 */
export function cibleCarree ({ x = 0, y = 0, rang = 4, num, taille = 0.6, color = 'gray', opacite = 0.5 }) {
  return new CibleCarree({ x, y, rang, num, taille, color, opacite })
}

function CibleRonde ({ x = 0, y = 0, rang = 3, num, taille = 0.3, color = 'gray', opacite = 0.5 }) {
  ObjetMathalea2D.call(this)
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
 * création d'une cible ronde pour l'auto-correction
 * @author Jean-Claude Lhote
 * (x,y) sont les coordonnées du centre de la cible
 * Les zones de la cible fot 45°. Ils sont au nombre de rang*8
 * Repérage de A1 à Hn où n est le rang.
 * @author Jean-Claude Lhote
 * @param {number} x
 * @param {number} y // les coordonnées du point en bas à gauche de la cible
 * @param {number} rang // le nombre de cases de large
 * @param {number} num // Un numéro ou rien pour identifier la cible (quand il y en a plusieurs)
 * @param {number} taille // en cm, la taille des cases
 * @param {string} color // la couleur de la cible
 * @param {number} opacite // l'opacité de la cible
 * @param {} param0
 */
export function cibleRonde ({ x = 0, y = 0, rang = 3, num = 1, taille = 0.3, color = 'gray', opacite = 0.5 }) {
  return new CibleRonde({ x, y, rang, num, taille, color, opacite })
}
/**
 * création d'une cible couronne en forme de rapporteur ou semi-rapporteur pour l'auto-correction
 * @author Jean-Claude Lhote
 * (x,y) sont les coordonnées du centre de la cible
 */
function CibleCouronne ({ x = 0, y = 0, taille = 5, taille2 = 1, depart = 0, nbDivisions = 18, nbSubDivisions = 3, semi = false, label = true, color = 'gray', opacite = 0.5 }) {
  ObjetMathalea2D.call(this)
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
      rayons[j - 1].pointilles = true
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
 * création d'une cible couronne en forme de rapporteur ou semi-rapporteur pour l'auto-correction
 * @author Jean-Claude Lhote
 * (x,y) sont les coordonnées du centre de la cible
 * @param {number} taille distance entre le centre de la cible et l'arc intérieur
 * @param {number} taille2 distance entre l'arc intérieur et l'arc extérieur de la couronne
 * @param {number} depart angle pour démarrer la numérotation des zones 0 = est
 * @param {number} nbDivisions nombre de secteurs dans la couronne ou la semi-couronne
 * @param {number} nbSubDivisions nombre de graduations à l'intérieur de chaque zone pour un repérage plus précis
 * @param {boolean} semi si true alors seulement 180° sinon couronne à 360°
 * @param {boolean} label si true alors des lettres sont ajoutées pour identifier les zones
 * @param {string} color La couleur de la cible
 * @param {number} opacite son opacité.
 */
export function cibleCouronne ({ x = 0, y = 0, taille = 5, taille2 = 1, depart = 0, nbDivisions = 18, nbSubDivisions = 3, semi = false, label = true, color = 'gray', opacite = 0.5 }) {
  return new CibleCouronne({ x, y, taille, taille2, depart, nbDivisions, nbSubDivisions, semi, label, color, opacite })
}

function Rapporteur ({ x = 0, y = 0, taille = 7, depart = 0, semi = false, avecNombre = 'deuxSens', precisionAuDegre = 1, stepGraduation = 10, rayonsVisibles = true }) {
  ObjetMathalea2D.call(this)
  this.x = x
  this.y = y
  this.taille = taille
  this.opacite = 0.7
  this.color = 'gray'
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
  const arc1 = arc(azimut, centre, arcPlein - 0.1, false, 'none', 'gray')
  const arc2 = arc(azimut2, centre, arcPlein - 0.1, false, 'none', 'gray')
  objets.push(segment(centre, azimut2))
  rayon = segment(azimut, azimut2)
  if (rayonsVisibles) objets.push(arc1)
  objets.push(arc2, rayon)
  for (let i = 0; i < nbDivisions; i++) {
    if (avecNombre !== '') {
      if (avecNombre === 'deuxSens') {
        if (i === 0) {
          numero = texteParPoint(arcPlein, rotation(homothetie(azimut2, centre, 0.8), centre, 2), -depart, 'gray')
          numero.contour = true
          objets.push(numero)
        }
        if (i === nbDivisions - 1) {
          numero = texteParPoint(arcPlein - (1 + i) * 10, rotation(homothetie(azimut2, centre, 0.8), centre, arcPlein / nbDivisions - 2), -depart, 'gray')
          numero.contour = true
          objets.push(numero)
        } else if ((arcPlein - (1 + i) * 10) % stepGraduation === 0) {
          numero = texteParPoint(arcPlein - (1 + i) * 10, rotation(homothetie(azimut2, centre, 0.8), centre, arcPlein / nbDivisions), 90 - (1 + i) * 10 - depart, 'gray')
          numero.contour = true
          objets.push(numero)
        }
      }
      if (i === 0) {
        numero = texteParPoint('0', rotation(homothetie(azimut2, centre, 0.9), centre, 2), -depart, 'gray')
        numero.contour = true
        objets.push(numero)
      }
      if (i === nbDivisions - 1) {
        numero = texteParPoint((1 + i) * 10, rotation(homothetie(azimut2, centre, 0.9), centre, arcPlein / nbDivisions - 2), -depart, 'gray')
        numero.contour = true
        objets.push(numero)
      } else if ((i + 1) * 10 % stepGraduation === 0) {
        numero = texteParPoint((1 + i) * 10, rotation(homothetie(azimut2, centre, 0.9), centre, arcPlein / nbDivisions), 90 - (1 + i) * 10 - depart, 'gray')
        numero.contour = true
        objets.push(numero)
      }
    }
    for (let s = 1, r; s < 10; s++) {
      if (s === 5 && precisionAuDegre < 10) {
        r = segment(homothetie(rotation(azimut2, centre, s), centre, 0.92), homothetie(rotation(azimut2, centre, s), centre, 0.99))
        r.opacite = 0.6
        r.color = 'gray'
        objets.push(r)
      } else if (precisionAuDegre === 1) {
        r = segment(homothetie(rotation(azimut2, centre, s), centre, 0.96), homothetie(rotation(azimut2, centre, s), centre, 0.99))
        r.opacite = 0.6
        r.color = 'gray'
        objets.push(r)
      }
    }
    rayon.color = this.color
    rayon.opacite = this.opacite
    objets.push(rayon)
    azimut = rotation(azimut, centre, arcPlein / nbDivisions)
    azimut2 = rotation(azimut2, centre, arcPlein / nbDivisions)
    if (rayonsVisibles) rayon = segment(azimut, azimut2)
    else rayon = segment(homothetie(azimut2, centre, 0.9), azimut2)
  }
  objets.push(segment(centre, azimut2))
  if (!semi) {
    rayon = segment(homothetie(rotation(azimut, centre, -90), centre, -0.2), homothetie(rotation(azimut, centre, -90), centre, 0.2))
    objets.push(rayon)
    rayon = segment(homothetie(azimut, centre, -0.2), homothetie(azimut, centre, 0.2))
  } else {
    rayon = segment(centre, homothetie(rotation(azimut, centre, -90), centre, 0.2))
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
 * @returns {Rapporteur} // crée un instance de l'objet 2d Rapporteur
 */
export function rapporteur ({ x = 0, y = 0, taille = 7, depart = 0, semi = false, avecNombre = 'deuxSens', precisionAuDegre = 1, stepGraduation = 10, rayonsVisibles = true }) {
  return new Rapporteur({ x, y, taille, depart, semi, avecNombre, precisionAuDegre, stepGraduation, rayonsVisibles })
}

/**
 * M = translation(O,v) //M est l'image de O dans la translation de vecteur v
 * M = translation(O,v,'M') //M est l'image de O dans la translation de vecteur v et se nomme M
 * M = translation(O,v,'M','below') //M est l'image de O dans la translation de vecteur v, se nomme M et le nom est en dessous du point
 * @param {ObjecMathalea2d} O objet à translater (Point, Droite, Segment, Polygone ou Vecteur)
 * @param {Vecteur} v vecteur de translation
 * @param {string} nom nom du translaté pour un Point
 * @param {string} positionLabel Position du label pour un Point
 * @param {string} [color='black'] Code couleur HTML acceptée
 * @author Rémi Angot
 */
export function translation (O, v, nom = '', positionLabel = 'above', color = 'black') {
  if (O.constructor === Point) {
    const x = O.x + v.x
    const y = O.y + v.y
    return point(x, y, nom, positionLabel)
  }
  if (O.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < O.listePoints.length; i++) {
      p2[i] = translation(O.listePoints[i], v)
      p2[i].nom = O.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (O.constructor === Droite) {
    const M = translation(point(O.x1, O.y1), v)
    const N = translation(point(O.x2, O.y2), v)
    return droite(M, N, color)
  }
  if (O.constructor === Segment) {
    const M = translation(O.extremite1, v)
    const N = translation(O.extremite2, v)
    const s = segment(M, N, color)
    s.styleExtremites = O.styleExtremites
    return s
  }
  if (O.constructor === Vecteur) {
    return O
  }
}

/**
 * M = translation2Points(O,A,B) //M est l'image de O dans la translation qui transforme A en B
 * M = translation2Points(O,A,B,'M') //M est l'image de O dans la translation qui transforme A en B et se nomme M
 * M = translation2Points(O,A,B,'M','below') //M est l'image de O dans la translation qui transforme A en B, se nomme M et le nom est en dessous du point
 *
 * @author Rémi Angot
 */

export function translation2Points (O, A, B, nom = '', positionLabel = 'above', color = 'black') {
  if (O.constructor === Point) {
    const x = O.x + B.x - A.x
    const y = O.y + B.y - A.y
    return point(x, y, nom, positionLabel)
  }
  if (O.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < O.listePoints.length; i++) {
      p2[i] = translation2Points(O.listePoints[i], O, A, B)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (O.constructor === Droite) {
    const M = translation2Points(point(O.x1, O.y1), A, B)
    const N = translation2Points(point(O.x2, O.y2), A, B)
    return droite(M, N, color)
  }
  if (O.constructor === Segment) {
    const M = translation2Points(O.extremite1, A, B)
    const N = translation2Points(O.extremite2, A, B)
    const s = segment(M, N, color)
    s.styleExtremites = O.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    return A
  }
}

/**
 * @param A Point, Polygone, Droite, Segment ou Vecteur
 * @param {Point} O Centre de rotation
 * @param {number} angle Angle de rotation
 * @param {string} [nom=''] Nom de l'image
 * @param {string} [positionLabel='above']
 * @param {string} [color='black'] Code couleur HTML acceptée
 * @return L'image de A par la rotation de centre O et d'angle angle
 * @author Rémi Angot et Jean-Claude Lhote
 */
export function rotation (A, O, angle, nom = '', positionLabel = 'above', color = 'black') {
  if (A.constructor === Point) {
    const x = O.x +
      (A.x - O.x) * Math.cos((angle * Math.PI) / 180) -
      (A.y - O.y) * Math.sin((angle * Math.PI) / 180)
    const y = O.y +
      (A.x - O.x) * Math.sin((angle * Math.PI) / 180) +
      (A.y - O.y) * Math.cos((angle * Math.PI) / 180)
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = rotation(A.listePoints[i], O, angle)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = rotation(point(A.x1, A.y1), O, angle)
    const N = rotation(point(A.x2, A.y2), O, angle)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = rotation(A.extremite1, O, angle)
    const N = rotation(A.extremite2, O, angle)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    const x = A.x * Math.cos((angle * Math.PI) / 180) -
      A.y * Math.sin((angle * Math.PI) / 180)
    const y = A.x * Math.sin((angle * Math.PI) / 180) +
      A.y * Math.cos((angle * Math.PI) / 180)
    const v = vecteur(x, y)
    return v
  }
}

/**
 * @author Jean-Claude Lhote
 * A1 Le point de départ de la flèche
 * centre Le centre de la rotation
 * sens Le sens (+1 ou -1) de la rotation. +1=sens trigo
 */
function SensDeRotation (A1, centre, sens) {
  ObjetMathalea2D.call(this)
  const objets = []
  const arc1 = arc(A1, centre, 20 * sens)
  const A2 = rotation(A1, centre, 20 * sens)
  const F1 = similitude(A2, centre, -5 * sens, 0.95)
  const F2 = similitude(A2, centre, -5 * sens, 1.05)
  const s1 = segment(A2, F1)
  const s2 = segment(A2, F2)
  objets.push(arc1, s1, s2)

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
export function sensDeRotation (A, O, sens) {
  return new SensDeRotation(A, O, sens)
}
/**
 * M = homothetie(A,O,k) //M est l'image de A dans l'homothétie de centre O et de rapport k
 *
 * M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k et se nomme M
 *
 * M = homothetie(A,O,k,'M') //M est l'image de A dans l'homothétie de centre O et de rapport k, se nomme M et le nom est en dessous du point
 *
 * @param {point} A Point-antécédent de l'homothétie
 * @param {point} O Centre de l'homothétie
 * @param {number} k Rapport de l'homothétie
 * @param {string} [nom = ''] Nom du point-image
 * @param {string} [color = 'black']
 * @param {position} [positionLabel = 'above'] Position du point-image
 * @author Rémi Angot
 */
export function homothetie (A, O, k, nom = '', positionLabel = 'above', color = 'black') {
  if (A.constructor === Point) {
    const x = O.x + k * (A.x - O.x)
    const y = O.y + k * (A.y - O.y)
    return new Point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = homothetie(A.listePoints[i], O, k)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = homothetie(point(A.x1, A.y1), O, k)
    const N = homothetie(point(A.x2, A.y2), O, k)
    return droite(M, N, '', color)
  }
  if (A.constructor === Segment) {
    const M = homothetie(A.extremite1, O, k)
    const N = homothetie(A.extremite2, O, k)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    const x = A.x
    const y = A.y
    const v = vecteur(x * k, y * k)
    return v
  }
}

/**
 * Renvoie le point M symétrique du point A par la droite d.
 * @param {Point} A Objet de type Point (ses coordonnées x et y renseignées)
 * @param {droite} d Objet de type Droite (son équation ax+by+c=0 renseignée)
 * @param {string} M Nom de l'image. Facultatif, vide par défaut.
 * @param {string} positionLabel Facultatif, 'above' par défaut.
 * @return {Point} M image de A par la symétrie axiale d'axe d.
 * @param {string} [color='black'] Code couleur HTML acceptée
 * @author Jean-Claude Lhote
 */
export function symetrieAxiale (A, d, nom = '', positionLabel = 'above', color = 'black') {
  let x, y
  const a = d.a
  const b = d.b
  const c = d.c
  const k = 1 / (a * a + b * b)
  if (A.constructor === Point) {
    if (a === 0) {
      x = A.x
      y = -(A.y + (2 * c) / b)
    } else if (b === 0) {
      y = A.y
      x = -(A.x + (2 * c) / a)
    } else {
      x = k * ((b * b - a * a) * A.x - 2 * a * b * A.y - 2 * a * c)
      y = k * ((a * a - b * b) * A.y - 2 * a * b * A.x + (a * a * c) / b - b * c) - c / b
    }
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = symetrieAxiale(A.listePoints[i], d)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = symetrieAxiale(point(A.x1, A.y1), d)
    const N = symetrieAxiale(point(A.x2, A.y2), d)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = symetrieAxiale(A.extremite1, d)
    const N = symetrieAxiale(A.extremite2, d)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    let O
    if (egal(b, 0)) {
      O = point(-c / a, 0)
    } else O = point(0, -c / b)
    const M = translation(O, A)
    const N = symetrieAxiale(M, d)
    const v = vecteur(O, N)
    return v
  }
}

/**
 * Calcule la distance entre un point et une droite.
 * 1ere version utilisant la projection orthogonale
 * 2eme version utilisant la symétrie axiale (abandonnée)
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Droite} d
 * @returns {number} longueur
 */
export function distancePointDroite (A, d) {
  const M = projectionOrtho(A, d)
  return longueur(A, M, 9)
}
/**
 * N = projectionOrtho(M,d,'N','below left')
 *@author Jean-Claude Lhote
 */
export function projectionOrtho (M, d, nom = '', positionLabel = 'above') {
  const a = d.a
  const b = d.b
  const c = d.c
  const k = 1 / (a * a + b * b)
  let x, y
  if (M.constructor === Point) {
    if (a === 0) {
      x = M.x
      y = -c / b
    } else if (b === 0) {
      y = M.y
      x = -c / a
    } else {
      x = k * (b * b * M.x - a * b * M.y - a * c)
      y = k * (-a * b * M.x + a * a * M.y + (a * a * c) / b) - c / b
    }
    return point(x, y, nom, positionLabel)
  }
  if (M.constructor === Vecteur) {
    let O
    if (egal(b, 0)) O = point(-c / a, 0)
    else O = point(0, -c / b)
    const A = translation(O, M)
    const N = projectionOrtho(A, d)
    const v = vecteur(O, N)
    return v
  }
}
/**
 * N = affiniteOrtho(M,d,rapport,'N','rgiht')
 * @author = Jean-Claude Lhote
 */
export function affiniteOrtho (A, d, k, nom = '', positionLabel = 'above', color = 'black') {
  const a = d.a
  const b = d.b
  const c = d.c
  const q = 1 / (a * a + b * b)
  let x, y
  if (A.constructor === Point) {
    if (a === 0) {
      x = A.x
      y = k * A.y + (c * (k - 1)) / b
    } else if (b === 0) {
      y = A.y
      x = k * A.x + (c * (k - 1)) / a
    } else {
      x = q * (b * b * A.x - a * b * A.y - a * c) * (1 - k) + k * A.x
      y = q * (a * a * A.y - a * b * A.x + (a * a * c) / b) * (1 - k) + (k * c) / b + k * A.y - c / b
    }
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = affiniteOrtho(A.listePoints[i], d, k)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = affiniteOrtho(point(A.x1, A.y1), d, k)
    const N = affiniteOrtho(point(A.x2, A.y2), d, k)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = affiniteOrtho(A.extremite1, d, k)
    const N = affiniteOrtho(A.extremite2, d, k)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  if (A.constructor === Vecteur) {
    let O
    if (egal(b, 0)) {
      O = point(-c / a, 0)
    } else O = point(0, -c / b)
    const M = translation(O, A)
    const N = affiniteOrtho(M, d, k)
    const v = vecteur(O, N)
    return v
  }
}
/**
 *
 * @param {Point} A // Le point dont on veut l'image
 * @param {Point} O // Le centre de la similitude
 * @param {number} a // L'angle de la rotation
 * @param {number} k // le rapport de l'homothétie
 * @param {string} nom
 * @param {string} positionLabel
 * M = similitude(B,O,30,1.1,'M') // Le point M est l'image de B dans la similitude de centre O d'angle 30° et de rapport 1.1
 * @author Jean-Claude Lhote
 */
export function similitude (A, O, a, k, nom = '', positionLabel = 'above', color = 'black') {
  if (A.constructor === Point) {
    const ra = radians(a)
    const x = O.x + k * (Math.cos(ra) * (A.x - O.x) - Math.sin(ra) * (A.y - O.y))
    const y = O.y + k * (Math.cos(ra) * (A.y - O.y) + Math.sin(ra) * (A.x - O.x))
    return point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = similitude(A.listePoints[i], O, a, k)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = similitude(point(A.x1, A.y1), O, a, k)
    const N = similitude(point(A.x2, A.y2), O, a, k)
    return droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = similitude(A.extremite1, O, a, k)
    const N = similitude(A.extremite2, O, a, k)
    const s = segment(M, N, color)
    s.styleExtremites = A.styleExtremites
    return s
  }
  /* if (A.constructor==DemiDroite) {
      let M = similitude(A.extremite1,O,a,k)
      let N = similitude(A.extremite2,O,a,k)
      let s = demiDroite(M,N)
      s.styleExtremites = A.styleExtremites
      return s
    } */
  if (A.constructor === Vecteur) {
    const V = rotation(A, O, a)
    const v = homothetie(V, O, k)
    return v
  }
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES TRANSFORMATIONS ANIMÉES %%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * apparitionAnimee(objet, dur, pourcentage repeatCount)
 * apparitionAnimee([a,b,c])
 *
 * dur : durée de l'animation
 * pourcentage : pourcentage de la durée à partir de laquelle les objets sont visibles
 * @author Rémi Angot
 */
function ApparitionAnimee (liste, dur = 2, pourcentage = 0.5, repeat = 'indefinite') {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    let code = '<g> '
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += '\n' + objet.svg(coeff)
      }
    } else {
      // si ce n'est pas une liste
      code += '\n' + liste.svg(coeff)
      liste.color = 'orange'
      console.log(liste)
    }
    code += `<animate attributeType="CSS"
    attributeName="visibility"
    from="hidden" 
    to="hidden"
    values="hidden;visible;hidden"
    keyTimes="0; ${pourcentage}; 1"
    dur="${dur}"
    repeatCount="${repeat}"/>`
    code += '</g>'
    return code
  }
}
export function apparitionAnimee (...args) {
  return new ApparitionAnimee(...args)
}
/**
 * translationAnimee(s,v) //Animation de la translation de vecteur v pour s
 * translationAnimee([a,b,c],v) //Animation de la translation de vecteur v pour les objets a, b et v
 *
 * @author Rémi Angot
 */
function TranslationAnimee (liste, v, animation = 'begin="0s" dur="2s" repeatCount="indefinite"') {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    let code = '<g> '
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += '\n' + objet.svg(coeff)
      }
    } else {
      // si ce n'est pas une liste
      code += '\n' + liste.svg(coeff)
    }
    if (Array.isArray(v)) {
      code += '<animateMotion path="M 0 0 l'
      for (const vecteur of v) {
        code += ` ${vecteur.xSVG(coeff)} ${vecteur.ySVG(coeff)} `
      }
      code += `${animation} />`
    } else {
      code += `<animateMotion path="M 0 0 l ${v.xSVG(coeff)} ${v.ySVG(coeff)} " ${animation} />`
    }
    code += '</g>'
    return code
  }
}
export function translationAnimee (...args) {
  return new TranslationAnimee(...args)
}

/**
 * rotationAnimee(s,O,a) //Animation de la rotation de centre O et d'angle a pour s
 * rotationAnimee([a,b,c],O,a) //Animation de la rotation de centre O et d'angle a pour les objets a, b et c
 *
 * @author Rémi Angot
 */
function RotationAnimee (
  liste,
  O,
  angle,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    let code = '<g> '
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += '\n' + objet.svg(coeff)
      }
    } else {
      // si ce n'est pas une liste
      code += '\n' + liste.svg(coeff)
    }

    code += `<animateTransform
  attributeName="transform"
  type="rotate"
  from="0 ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
  to="${-angle} ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
  ${animation}
  />`
    code += '</g>'
    return code
  }
}
export function rotationAnimee (...args) {
  return new RotationAnimee(...args)
}
/**
 * homothetieAnimee(s,O,k) //Animation de la homothetie de centre O et de rapport k pour s
 * homothetieAnimee([a,b,c],O,k) //Animation de la homothetie de centre O et de rapport k pour les objets a, b et v
 *
 * @author Rémi Angot
 */
function HomothetieAnimee (
  p,
  O,
  k,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    const binomesXY1 = p.binomesXY(coeff)
    const p2 = homothetie(p, O, k)
    p2.isVisible = false
    const binomesXY2 = p2.binomesXY(coeff)
    const code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="${p.couleurDeRemplissage}" >
  <animate attributeName="points" ${animation}
  from="${binomesXY1}"
  to="${binomesXY2}"
  />
  </polygon>`
    return code
  }
}
export function homothetieAnimee (...args) {
  return new HomothetieAnimee(...args)
}

/**
 * symetrieAnimee(s,d) //Animation de la symetrie d'axe (d) pour s
 * symetrieAnimee([a,b,c],d) //Animation de la symetrie d'axe (d) pour les objets a, b et v
 *
 * @author Rémi Angot
 */
function SymetrieAnimee (
  p,
  d,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    const binomesXY1 = p.binomesXY(coeff)
    const p2 = symetrieAxiale(p, d)
    p2.isVisible = false
    const binomesXY2 = p2.binomesXY(coeff)
    const code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="${p.couleurDeRemplissage}" >
    <animate attributeName="points" ${animation}
    from="${binomesXY1}"
    to="${binomesXY2}"
    />
    </polygon>`
    return code
  }
}
export function symetrieAnimee (...args) {
  return new SymetrieAnimee(...args)
}

function AffiniteOrthoAnimee (
  p,
  d,
  k,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    const binomesXY1 = p.binomesXY(coeff)
    const p2 = affiniteOrtho(p, d, k)
    p2.isVisible = false
    const binomesXY2 = p2.binomesXY(coeff)
    const code = `<polygon stroke="${p.color}" stroke-width="${p.epaisseur}" fill="${p.couleurDeRemplissage}" >
    <animate attributeName="points" ${animation}
    from="${binomesXY1}"
    to="${binomesXY2}"
    />
    </polygon>`
    return code
  }
}
export function affiniteOrthoAnimee (...args) {
  return new AffiniteOrthoAnimee(...args)
}

/**
 * Rend visible un element d'après son id
 *
 * @author Rémi Angot
 * @param {string} id
 *
 */
export function montrerParDiv (id) {
  if (document.getElementById(id)) {
    document.getElementById(id).style.visibility = 'visible'
  } else {
    console.log(id + ' n\'existe pas et ne peut pas être rendu visible.')
  }
}

/**
 * Rend invisible un element d'après son id
 *
 * @author Rémi Angot
 * @param {string} id
 *
 */
export function cacherParDiv (id) {
  if (document.getElementById(id)) {
    document.getElementById(id).style.visibility = 'hidden'
  } else {
    console.log(id + ' n\'existe pas et ne peut pas être caché.')
  }
}

/**
 * Masque un objet puis l'affiche au bout de t0 s avant de recommencer r fois toutes les t secondes
 *
 *
 * @param {any} objet dont l'identifiant est accessible par objet.id
 * @param {number} [t0=1] temps en secondes avant l'apparition
 * @param {number} [t=5] temps à partir duquel l'animation recommence
 * @param {string} [r='Infinity'] nombre de répétition (infini si ce n'est pas un nombre)

 *
 *
 */
export function afficherTempo (objet, t0 = 1, t = 5, r = 'Infinity') {
  let compteur = 1 // Nombre d'animations
  const checkExist = setInterval(function () {
    if (document.getElementById(objet.id)) {
      clearInterval(checkExist)
      cacherParDiv(objet.id)
      if (r === 1) { // On le montre au bout de t0 et on ne le cache plus
        setTimeout(function () { montrerParDiv(objet.id) }, t0 * 1000)
      } else {
        const cacheRepete = setInterval(function () { cacherParDiv(objet.id) }, t * 1000) // On cache tous les t s
        setTimeout(function () {
          montrerParDiv(objet.id) // On attend t0 pour montrer
          const montreRepete = setInterval(function () {
            montrerParDiv(objet.id)
            compteur++
            if (typeof r === 'number') {
              if (compteur >= r) {
                clearInterval(cacheRepete)
                clearInterval(montreRepete)
              }
            }
          }, t * 1000) // On montre tous les t s (vu qu'on a décalé de t0)
        }, t0 * 1000) // Fin de l'animation en boucle
      }
    }
  }, 100) // vérifie toutes les  100ms que le div existe
}

/**
 * Masque un objet puis l'affiche au bout de t0 s avant de recommencer r fois toutes les t secondes
 *
 *
 * @param {any} objet dont l'identifiant est accessible par objet.id
 * @param {number} [t0=1] temps en secondes avant l'apparition
 * @param {number} [t=5] temps à partir duquel l'animation recommence
 * @param {string} [r='Infinity'] nombre de répétition (infini si ce n'est pas un nombre)

 *
 *
 */
export function afficherTempoId (id, t0 = 1, t = 5, r = 'Infinity') {
  let compteur = 1 // Nombre d'animations
  const checkExist = setInterval(function () {
    if (document.getElementById(id)) {
      clearInterval(checkExist)
      cacherParDiv(id)
      if (r === 1) { // On le montre au bout de t0 et on ne le cache plus
        setTimeout(function () { montrerParDiv(id) }, t0 * 1000)
      } else {
        const cacheRepete = setInterval(function () { cacherParDiv(id) }, t * 1000) // On cache tous les t s
        setTimeout(function () {
          montrerParDiv(id) // On attend t0 pour montrer
          const montreRepete = setInterval(function () {
            montrerParDiv(id)
            compteur++
            if (typeof r === 'number') {
              if (compteur >= r) {
                clearInterval(cacheRepete)
                clearInterval(montreRepete)
              }
            }
          }, t * 1000) // On montre tous les t s (vu qu'on a décalé de t0)
        }, t0 * 1000) // Fin de l'animation en boucle
      }
    }
  }, 100) // vérifie toutes les  100ms que le div existe
}

/**
 * Rend visible un element d'après son id
 *
 * @author Rémi Angot
 * @param {any} id
 *
 */
export function afficherUnParUn (objets, t = 1, r = 'Infinity', tApresDernier = 5) {
  let t0 = t
  const tf = objets.length * t + tApresDernier
  for (const objet of objets) {
    afficherTempo(objet, t0, tf, r)
    t0 += t
  }
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LE TRIANGLE %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Médiane issue de A relative à [BC]
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function medianeTriangle (A, B, C, color = 'black') {
  const I = milieu(B, C)
  return droite(A, I, '', color)
}

/**
 * Centre de gravité du triangle ABC
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function centreGraviteTriangle (A, B, C, nom = '') {
  const d = medianeTriangle(B, A, C)
  const e = medianeTriangle(A, B, C)
  d.isVisible = false
  e.isVisible = false
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return point(x, y, '', nom)
}

/**
 * Hauteur issue de A relative à [BC]
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function hauteurTriangle (A, B, C, color = 'black') {
  const d = droite(B, C)
  d.isVisible = false
  const p = projectionOrtho(A, d)
  return droite(p, A, '', color)
}
export function CodageHauteurTriangle (A, B, C, color = 'black') {
  ObjetMathalea2D.call(this)
  this.color = color
  const d = droite(B, C)
  const p = projectionOrtho(A, d)
  const q = rotation(A, p, -90)
  if (B.x < C.x) {
    if (p.x > C.x || p.x < B.x) {
      d.isVisible = true
      d.pointilles = true
    } else d.isVisible = false
  } else if (C.x < B.x) {
    if (p.x < C.x || p.x > B.x) {
      d.isVisible = true
      d.pointilles = true
    } else d.isVisible = false
  } else if (B.y < C.y) {
    if (p.y > C.y || p.y < B.y) {
      d.isVisible = true
      d.pointilles = true
    } else d.isVisible = false
  } else if (C.y < B.y) {
    if (p.y < C.y || p.y > B.y) {
      d.isVisible = true
      d.pointilles = true
    } else d.isVisible = false
  }
  const c = codageAngleDroit(A, p, q, this.color)
  this.svg = function (coeff) {
    if (d.isVisible) {
      return c.svg(coeff) + '\n\t' + d.svg(coeff)
    } else {
      return c.svg(coeff)
    }
  }
  this.tikz = function () {
    if (d.isVisible) {
      return c.tikz() + '\n\t' + d.tikz()
    } else {
      return c.tikz()
    }
  }
}
export function codageHauteurTriangle (...args) {
  return new CodageHauteurTriangle(...args)
}
function CodageMedianeTriangle (B, C, color = 'black', mark = '//') {
  ObjetMathalea2D.call(this)
  this.color = color
  const O = milieu(B, C)
  const c = codeSegments(mark, this.color, B, O, O, C)
  this.svg = function (coeff) {
    return c.svg(coeff)
  }
  this.tikz = function (coeff) {
    return c.tikz(coeff)
  }
}
export function codageMedianeTriangle (...args) {
  return new CodageMedianeTriangle(...args)
}

/**
 * Orthocentre du triangle ABC
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function orthoCentre (A, B, C, nom = '', positionLabel = 'above') {
  const d = hauteurTriangle(B, A, C)
  const e = hauteurTriangle(A, B, C)
  d.isVisible = false
  e.isVisible = false
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return point(x, y, nom, positionLabel)
}

/**
 * Centre du cercle circonscrit au triangle ABC
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function centreCercleCirconscrit (A, B, C, nom = '', positionLabel = 'above') {
  const d = mediatrice(A, B)
  const e = mediatrice(B, C)
  d.isVisible = false
  e.isVisible = false
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return point(x, y, nom, positionLabel)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES CODAGES %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * codageAngleDroit(A,O,B) //Fait un codage d'angle droit de 4 mm pour l'angle direct AOB
 * codageAngleDroit(A,O,B,.5) //Fait un codage d'angle droit de 5 mm pour l'angle direct AOB
 *
 * @author Rémi Angot
 */
function CodageAngleDroit (A, O, B, color = 'black', d = 0.4, epaisseur = 0.5, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 1) {
  ObjetMathalea2D.call(this)
  this.sommet = O
  this.depart = A
  this.arrivee = B
  this.taille = d
  this.color = color
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage

  this.svg = function (coeff) {
    const a = pointSurSegment(this.sommet, this.depart, this.taille * 20 / coeff)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille * 20 / coeff)
    let o = {}
    let result = {}
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    if (this.couleurDeRemplissage === 'none') result = polyline([a, o, b], this.color)
    else {
      result = polygone([this.sommet, a, o, b], this.color)
      result.couleurDeRemplissage = this.couleurDeRemplissage
      result.opaciteDeRemplissage = this.opaciteDeRemplissage
    }
    result.isVisible = false
    result.epaisseur = epaisseur
    result.opacite = opacite
    this.id = result.id
    return result.svg(coeff)
  }
  this.tikz = function () {
    const a = pointSurSegment(this.sommet, this.depart, this.taille / context.scale)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille / context.scale)
    let o = {}
    let result = {}
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    if (this.couleurDeRemplissage === 'none') return polyline([a, o, b], this.color).tikz()
    else {
      result = polygone([this.sommet, a, o, b], this.color)
      result.couleurDeRemplissage = this.couleurDeRemplissage
      result.opaciteDeRemplissage = this.opaciteDeRemplissage
      result.isVisible = false
      result.epaisseur = epaisseur
      result.opacite = opacite
      return result.tikz()
    }
  }
  this.svgml = function (coeff, amp) {
    const a = pointSurSegment(this.sommet, this.depart, this.taille * 20 / coeff)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille * 20 / coeff)
    let o = {}
    if (angleOriente(A, this.sommet, B) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    return polyline([a, o, b], this.color).svgml(coeff, amp)
  }
  this.tikzml = function (amp) {
    const a = pointSurSegment(this.sommet, this.depart, this.taille / context.scale)
    const b = pointSurSegment(this.sommet, this.arrivee, this.taille / context.scale)
    let o = {}
    if (angleOriente(A, this.sommet, B) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    return polyline([a, o, b], this.color).tikzml(amp)
  }
}
/**
 * Fait un codage d'angle droit pour l'angle direct AOB.
 * @param {Point} A
 * @param {Point} O
 * @param {Point} B
 * @param {string} [color='black']
 * @param {number} [d =0.4] Taille de l'angle droit en cm.
 * @param {number} [epaisseur=0.5] épaisseur du trait
 * @param {number} [opacite=1] opacité du trait
 * @param {string} [couleurDeRemplissage='none'] couleur de remplissage
 * @param {number} [opaciteDeRemplissage=1] opacité de remplissage
 * @returns {CodageAngleDroit} CodageAngleDroit
 * @author Rémi Angot
 */
export function codageAngleDroit (A, O, B, color = 'black', d = 0.4, epaisseur = 0.5, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 1) {
  return new CodageAngleDroit(A, O, B, color, d, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage)
}
/**
 * afficheLongueurSegment(A,B) // Note la longueur de [AB] au dessus si A est le point le plus à gauche sinon en dessous
 *
 * @author Rémi Angot
 */
function AfficheLongueurSegment (A, B, color = 'black', d = 0.5, unite = 'cm', horizontal = false) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.extremite1 = A
  this.extremite2 = B
  const O = milieu(this.extremite1, this.extremite2)
  const M = rotation(this.extremite1, O, -90)
  const s = segment(this.extremite1, this.extremite2)
  let angle
  s.isVisible = false
  const l = stringNombre(s.longueur, 1)
  const longueurSeg = `${l}${unite !== '' ? ' ' + unite : ''}`
  this.distance = horizontal ? (d - 0.1 + longueurSeg.length / 10) : d
  if (horizontal) {
    angle = 0
  } else if (this.extremite2.x > this.extremite1.x) {
    angle = -s.angleAvecHorizontale
  } else {
    angle = 180 - s.angleAvecHorizontale
  }
  this.svg = function (coeff) {
    const N = pointSurSegment(O, M, (this.distance * 20) / coeff)
    return texteParPoint(longueurSeg, N, angle, this.color, 1, 'middle', false).svg(coeff)
  }
  this.tikz = function () {
    const N = pointSurSegment(O, M, this.distance / context.scale)
    return texteParPoint(longueurSeg, N, angle, this.color, 1, 'middle', false).tikz()
  }
}
/**
 * Note la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous
 * @param  {Point} A
 * @param  {Point} B
 * @param  {string} [color='black'] Code couleur HTML accepté
 * @param  {number} [d=0.5] Distance entre l'étiquette et le segment.
 * @param {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment
 * @returns {AfficheLongueurSegment} objet AfficheLongueurSegment
 * @author Rémi Angot
 */
export function afficheLongueurSegment (...args) {
  return new AfficheLongueurSegment(...args)
}

/**
 * texteSurSegment('mon texte',A,B) // Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon en dessous, ou alors horizontalement
 *
 * @author Rémi Angot
 */
function TexteSurSegment (texte, A, B, color = 'black', d = 0.5, horizontal = false) {
  ObjetMathalea2D.call(this)
  if (longueur(A, B) < 0.1) window.notify('TexteSurSegment : Points trop proches pour cette fonction', { A, B })
  this.color = color
  this.extremite1 = A
  this.extremite2 = B
  this.texte = texte
  this.distance = horizontal ? (d - 0.1 + (isNumeric(this.texte) ? nombreDeChiffresDe(this.texte) : this.texte.length) / 10) : d
  const O = milieu(this.extremite1, this.extremite2)
  const M = rotation(this.extremite1, O, -90)
  const s = segment(this.extremite1, this.extremite2)
  let angle
  const pos = pointSurSegment(O, M, this.distance)
  const space = 0.2 * this.texte.length
  this.bordures = [pos.x - space, pos.y - space, pos.x + space, pos.y + space]
  if (horizontal) {
    angle = 0
  } else if (this.extremite2.x > this.extremite1.x) {
    angle = -s.angleAvecHorizontale
    angle = -s.angleAvecHorizontale
  } else {
    angle = 180 - s.angleAvecHorizontale
    angle = 180 - s.angleAvecHorizontale
  }
  this.svg = function (coeff) {
    const N = pointSurSegment(O, M, this.distance * 20 / coeff)
    return texteParPoint(this.texte, N, angle, this.color, 1, 'middle', true).svg(coeff)
  }
  this.tikz = function () {
    const N = pointSurSegment(O, M, this.distance / context.scale)
    return texteParPoint(this.texte, N, angle, this.color, 1, 'middle', true).tikz()
  }
}
/**
 * Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon au dessous ou bien horizontal
 * @param {string} texte
 * @param {Point} A
 * @param {Point} B
 * @param {string} [color='black'] Code couleur HTML accepté
 * @param {number} [d=0.5] Distance à la droite.
 * @param {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment
 * @return {object} LatexParCoordonnees si le premier caractère est '$', TexteParPoint sinon
 * @author Rémi Angot
 */
export function texteSurSegment (...args) {
  return new TexteSurSegment(...args)
}

/**
 * texteSurArc(texte, A, B, angle) // Écrit un texte au milieu de l'arc AB, au dessus si A est le point le plus à gauche sinon au dessous
 *
 * @author Rémi Angot et Frédéric Piou
 */
function TexteSurArc (texte, A, B, angle, color = 'black', d = 0.5, horizontal = false) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.extremite1 = A
  this.extremite2 = B
  this.distance = -d
  this.texte = texte
  let anglerot
  if (angle < 0) anglerot = (angle + 180) / 2
  else anglerot = (angle - 180) / 2
  const d1 = mediatrice(A, B)
  d1.isVisible = false
  const e = droite(A, B)
  e.isVisible = false
  const f = rotation(e, B, anglerot)
  f.isVisible = false
  const determinant = d1.a * f.b - f.a * d1.b
  const Omegax = (d1.b * f.c - f.b * d1.c) / determinant
  const Omegay = (f.a * d1.c - d1.a * f.c) / determinant
  const Omega = point(Omegax, Omegay)
  const s = segment(this.extremite1, this.extremite2)
  s.isVisible = false
  const p = rotation(A, Omega, angle / 2)
  const pos = pointSurSegment(p, Omega, this.distance)
  const space = 0.2 * texte.length
  this.bordures = [pos.x - space, pos.y - space, pos.x + space, pos.y + space]
  this.svg = function (coeff) {
    const N = pointSurSegment(p, Omega, this.distance * 20 / coeff)
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale
    } else {
      angle = 180 - s.angleAvecHorizontale
    }
    if (this.texte.charAt(0) === '$') {
      return latexParPoint(this.texte.substr(1, this.texte.length - 2), N, this.color, this.texte * 8, 12, '').svg(coeff)
    } else {
      return texteParPoint(this.texte, N, horizontal ? 0 : angle, this.color).svg(coeff)
    }
  }
  this.tikz = function () {
    const N = pointSurSegment(p, Omega, this.distance / context.scale)
    if (this.extremite2.x > this.extremite1.x) {
      angle = -s.angleAvecHorizontale
    } else {
      angle = 180 - s.angleAvecHorizontale
    }
    return texteParPoint(this.texte, N, angle, this.color).tikz()
  }
}
/**
 * Écrit un texte au "milieu" de l'arc AB au dessus si A est le point le plus à gauche sinon en dessous
 * @param {string} texte Texte à afficher (éviter les $$ pour les affichages diaporama)
 * @param {Point} A Extrémité de l'arc
 * @param {Point} B Extrémité de l'arc
 * @param {number} angle Angle au centre
 * @param {string} [color='black'] Code couleur HTML accepté
 * @param {number} [d=0.5] Distance à la droite.
 * @param {boolean} [horizontal = false] Décide si le texte est horizontal ou pas, quelle que soit la valeur de angle.
 * @return {object} LatexParCoordonnees si le premier caractère est '$', TexteParPoint sinon
 * @author Rémi Angot et Frédéric Piou
 */
export function texteSurArc (...args) {
  return new TexteSurArc(...args)
}

/**
 * afficheMesureAngle(A,B,C) // Affiche la mesure de l'angle ABC arrondie au degré près
 *
 * @author Rémi Angot
 */
function AfficheMesureAngle (A, B, C, color = 'black', distance = 1.5, label = '', { ecart = 0.5, mesureEnGras = false, saillant = true, colorArc = 'black', rayon = false, fill = 'none', fillOpacite = 0.5, arcEpaisseur = 1 } = {}) {
  ObjetMathalea2D.call(this)
  this.depart = A
  this.arrivee = C
  this.sommet = B
  this.distance = distance
  this.angle = saillant ? angleOriente(this.depart, this.sommet, this.arrivee) : angleOriente(this.depart, this.sommet, this.arrivee) > 0 ? angleOriente(this.depart, this.sommet, this.arrivee) - 360 : 360 + angleOriente(this.depart, this.sommet, this.arrivee)
  this.ecart = ecart
  this.saillant = saillant
  this.svg = function (coeff) {
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(pointSurSegment(this.sommet, M, this.distance + this.ecart * 20 / coeff), this.sommet, this.angle / 2, '', 'center')
    let mesureAngle
    if (label !== '') {
      mesureAngle = label
    } else {
      mesureAngle = Math.round(this.saillant ? angle(this.depart, this.sommet, this.arrivee) : 360 - angle(this.depart, this.sommet, this.arrivee)) + '°'
    }
    const mesure = texteParPoint(mesureAngle, N, 'milieu', color, 1, 'middle', true)
    const marque = arc(M, B, this.angle, rayon, fill, colorArc, fillOpacite)
    mesure.contour = mesureEnGras
    mesure.couleurDeRemplissage = color
    marque.epaisseur = arcEpaisseur
    return '\n' + mesure.svg(coeff) + '\n' + marque.svg(coeff)
  }
  this.tikz = function () {
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(pointSurSegment(this.sommet, M, this.distance + this.ecart), this.sommet, this.angle / 2, '', 'center')
    let mesureAngle
    if (label !== '') {
      mesureAngle = label
    } else {
      mesureAngle = Math.round(this.saillant ? angle(this.depart, this.sommet, this.arrivee) : 360 - angle(this.depart, this.sommet, this.arrivee)) + '\\degree'
    }
    const mesure = texteParPoint(mesureAngle, N, 'milieu', color, 1, 'middle', true)
    const marque = arc(M, B, this.angle, rayon, fill, colorArc, fillOpacite)
    mesure.contour = mesureEnGras
    mesure.couleurDeRemplissage = color
    marque.epaisseur = arcEpaisseur
    return '\n' + mesure.tikz() + '\n' + marque.tikz()
  }
}
/**
 * Affiche la mesure de l'angle ABC arrondie au degré près
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} [color='black'] 'black' couleur de la mesure.
 * @param {number} [distance=1.5] Taille de l'angle.
 * @param {string} [label=''] Si non vide, remplace la mesure de l'angle par ce label.
 * @param {number} [ecart=0.5] Distance entre l'arc et sa mesure.
 * @param {boolean} [saillant=true] false si on veut l'angle rentrant.
 * @param {string} [colorArc='black']  Couleur de l'arc.
 * @param {boolean} [rayon=false] true pour fermer l'angle en vue de colorier l'intérieur.
 * @param {string} [fill='none'] 'none' si on ne veut pas de remplissage, sinon une couleur.
 * @param {number} [fillOpacite=0.5] Taux d'opacité du remplissage.
 * @param {number} [arcEpaisseur=1] épaisseur de l'arc.
 * @param {boolean} [mesureEnGras=false] true pour mettre en gras la mesure affichée.
 * @returns {object} AfficheMesureAngle
 */
export function afficheMesureAngle (A, B, C, color = 'black', distance = 1.5, label = '', { ecart = 0.5, mesureEnGras = false, saillant = true, colorArc = 'black', rayon = false, fill = 'none', fillOpacite = 0.5, arcEpaisseur = 1 } = {}) {
  return new AfficheMesureAngle(A, B, C, color, distance, label, { ecart, mesureEnGras, saillant, colorArc, rayon, fill, fillOpacite, arcEpaisseur })
}
/**
 * macote=afficheCoteSegment(s,'x',-1,'red',2) affiche une côte sur une flèche rouge d'epaisseur 2 placée 1cm sous le segment s avec le texte 'x' écrit en noir (par defaut) 0,5cm au-dessus (par defaut)
 * @author Jean-Claude Lhote
 */
function AfficheCoteSegment (
  s,
  Cote = '',
  positionCote = 0.5,
  couleurCote = 'black',
  epaisseurCote = 1,
  positionValeur = 0.5,
  couleurValeur = 'black'
) {
  // let longueur=s.longueur
  ObjetMathalea2D.call(this)
  this.positionCoteSVG = positionCote * 20 / context.pixelsParCm
  this.positionCoteTIKZ = positionCote / context.scale
  this.positionValeur = positionValeur
  this.seg = s
  this.cote = Cote

  this.svg = function (coeff) {
    let valeur
    const A = this.seg.extremite1
    const B = this.seg.extremite2
    const v = similitude(vecteur(A, B), A, 90, this.positionCoteSVG / this.seg.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (this.cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        this.positionValeur
      )
    } else {
      valeur = texteSurSegment(
        this.cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        this.positionValeur
      )
    }
    return '\n\t' + cote.svg(coeff) + '\n\t' + valeur.svg(coeff)
  }

  this.tikz = function () {
    let valeur
    const A = this.seg.extremite1
    const B = this.seg.extremite2
    const v = similitude(vecteur(A, B), A, 90, this.positionCoteTIKZ / this.seg.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (this.cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        this.positionValeur
      )
    } else {
      valeur = texteSurSegment(
        this.cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        this.positionValeur
      )
    }
    return '\n\t' + cote.tikz() + '\n\t' + valeur.tikz()
  }
}
export function afficheCoteSegment (...args) {
  return new AfficheCoteSegment(...args)
}
/**
 * codeSegment(A,B,'×','blue') // Code le segment [AB] avec une croix bleue.
 *
 * Attention le premier argument ne peut pas être un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [mark='||'] Symbole posé sur le segment
 * @param {string} [color='black'] Couleur du symbole. Code Couleur HTML acceptée.
 *
 * @author Rémi Angot
 */
function CodeSegment (A, B, mark = '||', color = 'black') {
  ObjetMathalea2D.call(this)
  this.color = color
  const O = milieu(A, B)
  const s = segment(A, B)
  s.isVisible = false
  let angle
  if (B.x > A.x) {
    angle = -parseInt(s.angleAvecHorizontale)
  } else {
    angle = -parseInt(s.angleAvecHorizontale) + 180
  }
  return texteParPoint(mark, O, angle, this.color)
}
export function codeSegment (...args) {
  return new CodeSegment(...args)
}
/**
 * codeSegments('×','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
 *
 * codeSegments('×','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé, pratique pour des polygones pas pour des lignes brisées)
 *
 * codeSegments('×','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
 *
 * codeSegments('×','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
 *
 * @param {string} mark Symbole posé sur le segment
 * @param {string} color Couleur du symbole
 * @param  {...any} args Les segments différement codés. Voir exemples.
 *
 * @author Rémi Angot
 */
function CodeSegments (mark = '||', color = 'black', ...args) {
  ObjetMathalea2D.call(this)
  this.svg = function (coeff) {
    let code = ''
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        const codage = codeSegment(args[0][i], args[0][i + 1], mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
      const codage = codeSegment(args[0][args[0].length - 1], args[0][0], mark, color)
      codage.isVisible = false
      code += codage.svg(coeff)
      code += '\n'
    } else if (args[0].constructor === Segment) {
      for (let i = 0; i < args.length; i++) {
        const codage = codeSegment(args[i].extremite1, args[i].extremite2, mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        const codage = codeSegment(args[i], args[i + 1], mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        code += codeSegment(args[0][i], args[0][i + 1], mark, color).tikz()
        code += '\n'
      }
      code += codeSegment(
        args[0][args[0].length - 1],
        args[0][0],
        mark,
        color
      ).tikz()
      code += '\n'
    } else if (args[0].constructor === Segment) {
      for (let i = 0; i < args.length; i++) {
        code += codeSegment(
          args[i].extremite1,
          args[i].extremite2,
          mark,
          color
        ).tikz()
        code += '\n'
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        code += codeSegment(args[i], args[i + 1], mark, color).tikz()
        code += '\n'
      }
    }
    return code
  }
}
export function codeSegments (mark = '||', color = 'black', ...args) {
  return new CodeSegments(mark, color, ...args)
}
/**
 * m=codeAngle(A,O,45,'X','black',2,1,'red',0.4)
 * code un angle du point A dont le sommet est O et la mesure 45° (sens direct) avec une marque en X.
 *  la ligne est noire a une épaisseur de 2 une opacité de 100% et le remplissage à 40% d'opacité est rouge.
 * @author Jean-Claude Lhote
 */
function CodeAngle (debut, centre, angle, taille = 0.8, mark = '', color = 'black', epaisseur = 1, opacite = 1, fill = 'none', fillOpacite = 0.2, mesureOn = false, texteACote = '', tailleTexte = 1) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.debut = debut
  this.centre = centre
  this.taille = taille
  this.mark = mark
  this.epaisseur = epaisseur
  this.opacite = opacite

  if (fill !== 'none') {
    this.couleurDeRemplissage = fill
    this.opaciteDeRemplissage = fillOpacite
  } else { this.couleurDeRemplissage = 'none' }
  this.angle = angle

  this.svg = function (coeff) {
    let code = ''
    const objets = []
    const depart = pointSurSegment(this.centre, this.debut, this.taille * 20 / context.pixelsParCm)
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(this.centre, P, this.taille + 0.6 * 20 / coeff)
    const d = droite(this.centre, P)
    d.isVisible = false
    const mesure = Math.round(Math.abs(angle)) + '°'
    const arcangle = arc(depart, this.centre, this.angle, fill !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.isVisible = false
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = fillOpacite
    objets.push(arcangle)
    if (this.mark !== '') {
      const t = texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color)
      t.isVisible = false
      objets.push(t)
    }
    if (mesureOn) {
      const t = texteParPoint(mesure, M, 'milieu', this.color)
      t.isVisible = false
      objets.push(t)
    }
    if (texteACote !== '') {
      const texteACOTE = texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte)
      objets.push(texteACOTE)
    }
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    if (objets.length > 1) {
      code = `<g id="${this.id}">${code}</g>`
    } else {
      this.id = arcangle.id // Dans le cas où il n'y a pas de groupe, on récupère l'id
    }
    return code
  }

  this.svgml = function (coeff, amp) {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille * 20 / context.pixelsParCm)
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(this.centre, P, taille + 0.6 * 20 / coeff)
    const mesure = Math.round(Math.abs(angle)) + '°'
    const d = droite(this.centre, P)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, false, this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = fillOpacite
    if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).svg(coeff) + '\n'
    if (mesureOn) code += texteParPoint(mesure, M, 'milieu', this.color).svg(coeff) + '\n'
    code += arcangle.svgml(coeff, amp)
    return code
  }
  this.tikz = function () {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille / context.scale)
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(this.centre, P, taille + 0.6 / context.scale)
    const mesure = Math.round(Math.abs(angle)) + '°'
    const d = droite(this.centre, P)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, fill !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = fillOpacite
    if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (mesureOn) code += texteParPoint(mesure, M, 'milieu', this.color).tikz() + '\n'
    code += arcangle.tikz()
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille / context.scale)
    // const P = rotation(depart, this.centre, this.angle / 2)
    const M = rotation(depart, this.centre, this.angle / 2)
    // const M = pointSurSegment(this.centre, P, taille + 0.6 / context.scale)
    const mesure = Math.round(Math.abs(angle)) + '°'
    // const d = droite(this.centre, P)
    const d = droite(this.centre, M)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, fill !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = fillOpacite
    // if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (this.mark !== '') code += texteParPoint(mark, M, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (mesureOn) code += texteParPoint(mesure, M, 'milieu', this.color).tikz() + '\n'
    code += arcangle.tikzml(amp)
    return code
  }
}
/**
 * @param {Point} debut
 * @param {Point} centre
 * @param {number} angle
 * @param {number} [taille=0.8] Facultatif. 0.8 par défaut.
 * @param {string} [mark=''] Facultatif. Vide par défaut.
 * @param {string} [color='black'] Facultatif. 'black' par défaut.
 * @param {number} [epaisseur=1] Facultatif. 1 par défaut.
 * @param {number} [opacite=1] Facultatif. 1 par défaut.
 * @param {string} [fill='none'] Facultatif. 'none' par défaut
 * @param {number} [fillOpacite=0.2] Facultatif. 0.2 par défaut
 * @param {boolean} [mesureOn=false] Facultatif. false par défaut
 * @param {boolean} [noAngleDroit=false] Pour choisir si on veut que l'angle droit soit marqué par un carré (from EE)
 * @param {string} [texteACote=''] Pour mettre un texte à côté de l'angle (from EE) : encore optimisable
 * @param {number} [tailleTexte=1] Pour choisir la taille du texte à côté de l'angle (from EE)
 * @returns CodeAngle
 * @example codeAngle(A,O,45,0.8,'X','black',2,1,'red',0.4) // code un angle à partir du point A dont le sommet est O et la mesure 45° (sens direct) avec une marque en X. La ligne est noire a une épaisseur de 2 une opacité de 100% et le remplissage à 40% d'opacité est rouge.
 * @example codeAngle(A,O,B) // code l'angle AOB sans aucune autre option possible
 * @author Jean-Claude Lhote
 */
export function codeAngle (debut, centre, angle, taille = 0.8, mark = '', color = 'black', epaisseur = 1, opacite = 1, fill = 'none', fillOpacite = 0.2, mesureOn = false, noAngleDroit = false, texteACote = '', tailleTexte = 1) {
  if (typeof (angle) !== 'number') {
    angle = angleOriente(debut, centre, angle)
  }
  if ((angle === 90 || angle === -90) & !noAngleDroit) {
    return new CodageAngleDroit(debut, centre, rotation(debut, centre, angle), color, taille, epaisseur, opacite, fill, fillOpacite)
  } else return new CodeAngle(debut, centre, angle, taille, mark, color, epaisseur, opacite, fill, fillOpacite, mesureOn, texteACote, tailleTexte)
}

function NomAngleParPosition (nom, x, y, color, s) {
  ObjetMathalea2D.call(this)
  const objets = []
  objets.push(texteParPosition(nom, x, y, 'milieu', color, 1, 'middle', true))
  const s1 = segment(x - 0.6, y + 0.4 - s / 10, x + 0.1, y + 0.4 + s / 10)
  const s2 = segment(x + 0.1, y + 0.4 + s / 10, x + 0.8, y + 0.4 - s / 10)
  s1.color = color
  s2.color = color
  objets.push(s1, s2)
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
export function nomAngleSaillantParPosition (nom, x, y, color) {
  return new NomAngleParPosition(nom, x, y, color, 1)
}
export function nomAngleRentrantParPosition (nom, x, y, color) {
  return new NomAngleParPosition(nom, x, y, color, -1)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES REPERES ET GRILLE %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

// (Xorig,Yorig,'H' ou 'V', 'dd' ou 'd', longueur Unité, nombre de part, longueur totale, valeur origine, valeur première grosse graduation, label origine, label première grosse graduation, graduer ?, [Points à placer]...
/**
 *
 * @param {number} [x=0] Place le début en (x,y).
 * @param {number} [y=0]
 * @param {string} [position='H'] pour horizontale 'V' pour verticale
 * @param {string} [type='dd'] pour demi-droite 'd' ou n'importe quoi pour droite
 * @param {number} [longueurUnite=10] longueur en cm de la taille d import { ObjetMathalea2D } from '/modules/mathalea2d.js';
 * @param {number} [division=10] nombre de parts à faire entre deux grosses graduations
 * @param {number} [longueurTotale=15] longueur totale en cm utilisable
 * @param {number} [origin=0] valeur de la première graduation
 * @param {number} [unite=1] valeur de la deuxième graduation
 * @param {string} [labelGauche='O'] Ce qu'on écrit sous la première graduation
 * @param {string} [labelUnite='I'] Ce qu'on écrit sous la deuxième graduation
 * @param {boolean} gradue Si true, alors les grosses graduation à partir de la troisième auront l'abscisse renseignée
 * @param  {...any} args des points à placer au format ['M',xM]
 */
function DroiteGraduee (x = 0, y = 0, position = 'H', type = 'dd', longueurUnite = 10, division = 10, longueurTotale = 15, origin = 0, unite = 1, labelGauche = 'O', labelUnite = 'I', gradue = true, ...args) {
  ObjetMathalea2D.call(this)
  let absord = [1, 0]; let S; let M; let k; let g; let fleche
  const pasprincipal = unite - origin
  if (position !== 'H') absord = [0, 1]
  const objets = []
  for (let j = 0; j < args.length; j++) {
    objets.push(texteParPosition(args[j][0], x + (-origin + args[j][1]) * absord[0] * longueurUnite / pasprincipal + 0.8 * absord[1], y + (-origin + args[j][1]) * absord[1] * longueurUnite / pasprincipal + 0.8 * absord[0]))
    objets.push(texteParPosition('X', x + (-origin + args[j][1]) * absord[0] * longueurUnite / pasprincipal, y + (-origin + args[j][1]) * absord[1] * longueurUnite / pasprincipal, 'milieu', 'blue'))
  }
  fleche = segment(point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]), point(x + (longueurTotale - 0.3) * absord[0] + 0.3 * absord[1], y + (longueurTotale - 0.3) * absord[1] + 0.3 * absord[0]))
  fleche.epaisseur = 2
  objets.push(fleche)
  fleche = segment(point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]), point(x + (longueurTotale - 0.3) * absord[0] - 0.3 * absord[1], y + (longueurTotale - 0.3) * absord[1] - 0.3 * absord[0]))
  fleche.epaisseur = 2
  objets.push(fleche)
  const pas = longueurUnite / division
  if (type === 'dd') {
    S = segment(point(x, y), point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]))
  } else {
    S = segment(point(x - 0.5 * absord[0], y - 0.5 * absord[1]), point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]))
  }
  const O = texteParPosition(labelGauche, x - 0.8 * absord[1], y - 0.8 * absord[0])
  const I = texteParPosition(labelUnite, x - 0.8 * absord[1] + longueurUnite * absord[0], y - 0.8 * absord[0] + longueurUnite * absord[1])
  //  M=texteParPosition(labelPoint,x-0.8*absord[1]+abscissePoint*absord[0]*longueurUnite,y-0.8*absord[0]+abscissePoint*absord[1]*longueurUnite)
  k = 0
  for (let i = 0; i < longueurTotale; i += pas) {
    if (k % division === 0) {
      g = segment(point(x + i * absord[0] - 0.3 * absord[1], y - 0.3 * absord[0] + i * absord[1]), point(x + i * absord[0] + 0.3 * absord[1], y + 0.3 * absord[0] + i * absord[1]))
      g.epaisseur = 2
      objets.push(g)
      if (gradue && k !== 0 && k !== division) {
        objets.push(texteParPosition(nombreAvecEspace(arrondi(origin + i / longueurUnite * pasprincipal, 3)), x + i * absord[0] - 0.8 * absord[1], y + i * absord[1] - 0.8 * absord[0]))
      }
    } else {
      g = segment(point(x + i * absord[0] - 0.2 * absord[1], y - 0.2 * absord[0] + i * absord[1]), point(x + i * absord[0] + 0.2 * absord[1], y + 0.2 * absord[0] + i * absord[1]))
      objets.push(g)
    }
    k++
  }
  objets.push(S, O, I, M)

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
      if (!context.mainlevee || typeof (objet.svgml) === 'undefined') code += '\t' + objet.svg(coeff) + '\n'
      else code += '\t' + objet.svgml(coeff, amp) + '\n'
    }
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    for (const objet of objets) {
      if (!context.mainlevee || typeof (objet.tikzml) === 'undefined') code += '\t' + objet.tikz() + '\n'
      else code += '\t' + objet.tikzml(amp) + '\n'
    }
    return code
  }
}

export function droiteGraduee (...args) {
  return new DroiteGraduee(...args)
}
/**
 * @author Jean-Claude Lhote
 * Paramètres :
 * Unite : Nombre de cm par Unité
 * Min,Max : Valeur minimum et maximum labelisées sur l'axe (les graduations commencent un peu avant et finissent un peu après)
 * x,y : coordonnées du point de départ du tracé
 * axeEpaisseur,axeCouleur, axeStyle : épaisseur, couleur et syle de l'axe
 * axeHauteur : définit la "largeur" de l'axe, celle des graduations et de la flèche
 * axePosition : 'H' pour horizontal, 'V' pour vertical
 * thickEpaisseur,thickCouleur : grosseur et couleur des graduations
 * thickDistance : distance entre deux graduations principales
 * thickSecDist : distance entre deux graduations secondaires
 * thickTerDist : distance entre deux graduations tertiaires
 * thickSec : true si besoin de graduations secondaires, false sinon
 * thickTer : true si besoin de graduations tertiaires, false sinon
 * pointListe : Liste de points à mettre sur l'axe. Exemple [[3.4,'A'],[3.8,'B],....]. Les noms se placent au dessus de l'axe.
 * pointTaille, pointOpacite, pointCouleur : taille en pixels, opacité et couleurs des points de la pointListe
 * labelListe : pour ajouter des labels. Exemple [[2.8,'x'],[3.1,'y']] les labels se placent sous l'axe.
 * Legende : texte à écrire en bout de droite graduée
 * LegendePosition : position de la légende
 */

function DroiteGraduee2 ({
  Unite = 10, // nombre de cm pour une unité
  Min = 0, // Là où commence la droite
  Max = 2, // Là où finit la droite prévoir 0,5cm pour la flèche
  x = 0, y = 0, // les coordonnées du début du tracé dans le SVG
  axeEpaisseur = 2, axeCouleur = 'black', axeStyle = '->', axeHauteur = 4, axePosition = 'H', // Les caractéristiques de l'axe
  thickEpaisseur = 2, thickCouleur = axeCouleur, thickDistance = 1, thickOffset = 0, // Les caractéristiques des graduations principales
  thickSecDist = 0.1, thickSec = false, // Les caractéristiques des graduations secondaires. Pas de couleur, on joue sur l'opacité
  thickTerDist = 0.01, thickTer = false, // Les caractéristiques des graduations tertiaires. Pas de couleur, on joue sur l'opacité
  pointListe = false, labelPointTaille = 10, labelPointLargeur = 20, pointCouleur = 'blue', pointTaille = 4, pointStyle = '+', pointOpacite = 0.8, pointEpaisseur = 2, // Liste de points et caractéristiques des points de ces points
  labelsPrincipaux = true, labelsSecondaires = false, step1 = 1, step2 = 1,
  labelDistance = (axeHauteur + 10) / context.pixelsParCm,
  labelListe = false,
  Legende = '',
  LegendePosition = (Max - Min) * Unite + 1.5
} = {}) {
  ObjetMathalea2D.call(this)

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
    S.epaiseur = axeEpaisseur
  } else {
    S = segment(point(x, y), point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]), axeCouleur)
    S.styleExtremites = axeStyle || '|->'
    S.epaiseur = axeEpaisseur
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
  if (labelListe) {
    for (const p of labelListe) {
      t = texteParPosition(p[1], x - labelDistance * absord[1] + (p[0] - Min) * absord[0] * Unite, y - labelDistance * absord[0] + (p[0] - Min) * absord[1] * Unite)
      objets.push(t)
    }
  }
  if (Legende !== '') {
    objets.push(texteParPosition(Legende, x + LegendePosition * absord[0], y + LegendePosition * absord[1]))
  }
  if (pointListe) {
    let lab
    for (const p of pointListe) {
      P = point(x + (p[0] - Min) * absord[0] * Unite, y + (p[0] - Min) * absord[1] * Unite, p[1])
      T = tracePoint(P, pointCouleur)
      T.taille = pointTaille
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
export function droiteGraduee2 (...args) {
  return new DroiteGraduee2(...args)
}

/**
* axes(xmin,ymin,xmax,ymax,thick,xstep,ystep,epaisseur) // Trace les axes des abscisses et des ordonnées
*
* @author Rémi Angot
*/

function Axes (
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
  ObjetMathalea2D.call(this)
  const objets = []
  let yabscisse
  ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0)
  let xordonnee
  xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0)
  const abscisse = segment(xmin, yabscisse, xmax, yabscisse, color)
  abscisse.styleExtremites = '->'
  abscisse.epaisseur = epaisseur
  const ordonnee = segment(xordonnee, ymin, xordonnee, ymax, color)
  ordonnee.styleExtremites = '->'
  ordonnee.epaisseur = epaisseur
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
  this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`
}
export function axes (...args) {
  return new Axes(...args)
}

/**
 * @author Frédéric Piou
 * @param {*} xmin
 * @param {*} ymin
 * @param {*} xmax
 * @param {*} ymax
 * @param {*} thick
 * @param {*} xstep
 * @param {*} ystep
 * @param {*} epaisseur
 * @param {*} color
 * @param {*} ytick
 * @param {*} titre
 */
function AxeY (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  thick = 0.2,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
  ytick = ystep,
  titre = ''
) {
  ObjetMathalea2D.call(this)
  const objets = []
  objets.push(texteParPoint(titre, point(xmin - thick - 0.1, ymax), 'gauche', color))
  const ordonnee = segment(-1, ymin, -1, ymax, color)
  ordonnee.styleExtremites = '->'
  ordonnee.epaisseur = epaisseur
  objets.push(ordonnee)
  for (let y = ymin; y < ymax; y = fraction(y).add(ystep)) {
    const s = segment(xmin - thick, y, xmin, y, color)
    s.epaisseur = epaisseur
    objets.push(s)
  }
  for (let y = ymin; y < ymax; y = fraction(y).add(ystep.div(ytick))) {
    const s = segment(xmin - thick / 2, y, xmin, y, color)
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
  this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`
}

export function axeY (...args) {
  return new AxeY(...args)
}

function LabelX (
  xmin = 1,
  xmax = 20,
  step = 1,
  color = 'black',
  pos = -0.6,
  coeff = 1
) {
  ObjetMathalea2D.call(this)
  const objets = []
  for (let x = ceil(xmin / coeff);
    x * coeff <= xmax;
    x = x + step
  ) {
    objets.push(
      texteParPoint(
        Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 })
          .format(x * coeff)
          .toString(),
        point(x, pos),
        'milieu',
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
  this.commentaire = `labelX(xmin=${xmin},xmax=${xmax},step=${step},color=${color},pos=${pos},coeff=${coeff})`
}
/**
 * labelX(xmin,xmax,step,color,pos,coeff) // Place des graduations
 *
 * @author Rémi Angot
 */
export function labelX (...args) {
  return new LabelX(...args)
}

/**
 * labelY(ymin,ymax,step,color,pos,coeff) // Place des graduations
 *
 * @author Rémi Angot modifié par Frédéric Piou
 */
function LabelY (
  ymin = 1,
  ymax = 20,
  step = 1,
  color = 'black',
  pos = -0.6,
  coeff = 1
) {
  ObjetMathalea2D.call(this)
  const objets = []
  for (let y = ceil(ymin / coeff);
    y * coeff <= ymax;
    y = y + step
  ) {
    objets.push(
      texteParPoint(
        y * coeff,
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
  this.commentaire = `labelX(ymin=${ymin},ymax=${ymax},step=${step},color=${color},pos=${pos})`
}

export function labelY (...args) {
  return new LabelY(...args)
}
/**
 * grille(xmin,ymin,xmax,ymax,color,opacite,step,pointilles) // Trace les axes des abscisses et des ordonnées
 * @param {number} [xmin=-30]
 * @param {number} [ymin=-30]
 * @param {number} [xmax=30]
 * @param {number} [ymax=30]
 * @param {string} [color='gray']
 * @param {number} [opacite=0.4]
 * @param {number} [step=1]
 * @param {boolean} [pointilles=false]
 * @return Une grille quadrillée dont le coin en bas à gauche est (xmin,ymin) et celui à droite est au maximum (xmax,ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
 * @author Rémi Angot
 */
function Grille (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = false
) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = xmin; i <= xmax; i = arrondi(i + step)) {
    const s = segment(i, ymin, i, ymax, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = true
    }
    objets.push(s)
  }
  for (let i = ymin; i <= ymax; i = arrondi(i + step)) {
    const s = segment(xmin, i, xmax, i, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = true
    }
    objets.push(s)
  }
  this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${this.color}, opacite = ${this.opacite}, pas = ${step})`
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

/**
 * grille(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace les axes des abscisses et des ordonnées
 *
 * @author Rémi Angot
 */
export function grille (...args) {
  return new Grille(...args)
}

/**
 * grilleHorizontale(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace des parallèles à l'axe des ordonnées
 *
 * @author Rémi Angot
 */
function GrilleHorizontale (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = false
) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = ymin; i <= ymax; i += step) {
    const s = segment(xmin, i, xmax, i, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = true
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
 * grilleHorizontale(xmin,ymin,xmax,ymax,color,opacite,pas) // Trace des parallèles à l'axe des ordonnées
 *
 * @author Rémi Angot
 */
export function grilleHorizontale (...args) {
  return new GrilleHorizontale(...args)
}
function GrilleVerticale (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = false
) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = xmin; i <= xmax; i = i + step) {
    const s = segment(i, ymin, i, ymax, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = true
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
 * grilleVerticale(xmin,ymin,xmax,ymax,color,opacite,pas)
 *
 * @author Rémi Angot
 */
export function grilleVerticale (...args) {
  return new GrilleVerticale(...args)
}

function Seyes (xmin = 0, ymin = 0, xmax = 15, ymax = 15, opacite1 = 0.5, opacite2 = 0.2) {
  ObjetMathalea2D.call(this)
  const objets = []
  for (let y = ymin; y <= ymax; y = y + 0.25) {
    if (y % 1 !== 0) {
      const d = segment(xmin, y, xmax, y)
      d.color = 'red'
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
  ObjetMathalea2D.call(this)
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

/**
 * La fonction Repere n'est pas documentée. Elle est remplacée par la fonction Repere2 qui l'est. Voir ci-dessous.
 */
function Repere ({
  xmin = -10,
  xmax = 10,
  ymin = -10,
  ymax = 10,
  xscale = 1,
  yscale = 1,
  xstep = 1,
  ystep = 1,
  graduationColor = 'black',
  afficheZero = false,
  afficheNumeros = true,
  afficheLabelX = true,
  afficheLabelY = true,
  axesEpaisseur = 2,
  axesColor = 'black',
  grilleHorizontaleVisible = false,
  grillePrincipaleDistance = 1,
  grillePrincipaleColor = 'gray',
  grillePrincipaleOpacite = 1.1,
  grillePrincipalePointilles = false,
  grillePrincipaleVisible = true,
  grilleSecondaireDistance = 0.1,
  grilleSecondaireColor = 'gray',
  grilleSecondaireOpacite = 0.3,
  grilleSecondairePointilles = false,
  grilleSecondaireVisible = false,
  graduationsxMin = xmin,
  graduationsxMax = xmax,
  graduationsyMin = ymin,
  graduationsyMax = ymax,
  positionLabelX = -0.6,
  positionLabelY = -0.6,
  legendeX = 'x',
  legendeY = 'y',
  positionLegendeX,
  positionLegendeY
} = {}) {
  ObjetMathalea2D.call(this)
  let yabscisse
  ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0)
  let xordonnee
  xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0)
  if (yscale !== 1) {
    ymin = premierMultipleInferieur(yscale, ymin)
    ymax = premierMultipleSuperieur(yscale, ymax)
  }
  if (xscale !== 1) {
    xmin = premierMultipleInferieur(xscale, xmin)
    xmax = premierMultipleSuperieur(xscale, xmax)
  }
  this.svg = function (coeff) {
    let code = ''
    if (grillePrincipaleVisible) {
      if (grilleHorizontaleVisible) {
        code += grilleHorizontale(
          xmin / xscale,
          ymin / yscale,
          xmax / xscale,
          ymax / yscale,
          grillePrincipaleColor,
          grillePrincipaleOpacite,
          grillePrincipaleDistance,
          grillePrincipalePointilles
        ).svg(coeff)
      } else {
        code += grille(
          xmin / xscale,
          ymin / yscale,
          xmax / xscale,
          ymax / yscale,
          grillePrincipaleColor,
          grillePrincipaleOpacite,
          grillePrincipaleDistance,
          grillePrincipalePointilles
        ).svg(coeff)
      }
    }
    if (grilleSecondaireVisible) {
      code +=
        grille(
          xmin / xscale,
          ymin / yscale,
          xmax / xscale,
          ymax / yscale,
          grilleSecondaireColor,
          grilleSecondaireOpacite,
          grilleSecondaireDistance,
          grilleSecondairePointilles
        ).svg(coeff)
    }
    code +=
      axes(
        xmin / xscale,
        ymin / yscale,
        xmax / xscale,
        ymax / yscale,
        4 / coeff,
        xstep,
        ystep,
        axesEpaisseur,
        axesColor
      ).svg(coeff)
    if (afficheNumeros) {
      if (afficheZero) {
        if (afficheLabelX) {
          code += labelX(
            premierMultipleSuperieur(xstep, graduationsxMin),
            graduationsxMax,
            xstep,
            graduationColor,
            yabscisse / yscale + positionLabelX * 20 / coeff,
            xscale
          ).svg(coeff)
        }
        if (afficheLabelY) {
          code += labelY(
            premierMultipleSuperieur(ystep, graduationsyMin),
            graduationsyMax,
            ystep,
            graduationColor,
            xordonnee / xscale + positionLabelY * 20 / coeff,
            yscale
          ).svg(coeff)
        }
      } else {
        if (afficheLabelX) {
          code += labelX(
            premierMultipleSuperieur(xstep, graduationsxMin),
            -1,
            xstep,
            graduationColor,
            yabscisse / yscale + positionLabelX * 20 / coeff,
            xscale
          ).svg(coeff)
        }
        if (afficheLabelY) {
          code += labelY(
            premierMultipleSuperieur(ystep, graduationsyMin),
            -1,
            ystep,
            graduationColor,
            xordonnee / xscale + positionLabelY * 20 / coeff,
            yscale
          ).svg(coeff)
        }
        if (afficheLabelX) {
          code += labelX(
            Math.max(xstep, premierMultipleSuperieur(xstep, graduationsxMin)),
            graduationsxMax,
            xstep,
            graduationColor,
            yabscisse / yscale + positionLabelX * 20 / coeff,
            xscale
          ).svg(coeff)
        }
        if (afficheLabelY) {
          code += labelY(
            Math.max(ystep, premierMultipleSuperieur(ystep, graduationsyMin)),
            graduationsyMax,
            ystep,
            graduationColor,
            xordonnee / xscale + positionLabelY * 20 / coeff,
            yscale
          ).svg(coeff)
        }
      }
    }
    if (positionLegendeX === undefined) {
      positionLegendeX = [xmax + 4 / coeff, yabscisse + 6 / coeff]
    }
    if (positionLegendeY === undefined) {
      positionLegendeY = [xordonnee + 6 / coeff, ymax + 8 / coeff]
    }
    code += texteParPosition(
      legendeX,
      positionLegendeX[0] / xscale,
      positionLegendeX[1] / yscale,
      'droite', 'black', 1, 'middle', true
    ).svg(coeff)
    code += texteParPosition(
      legendeY,
      positionLegendeY[0] / xscale,
      positionLegendeY[1] / yscale,
      'droite', 'black', 1, 'middle', true
    ).svg(coeff)
    return code
  }
  this.tikz = function () {
    let code = ''
    if (grillePrincipaleVisible) {
      if (grilleHorizontaleVisible) {
        code += grilleHorizontale(
          xmin / xscale,
          ymin / yscale,
          xmax / xscale,
          ymax / yscale,
          grillePrincipaleColor,
          grillePrincipaleOpacite,
          grillePrincipaleDistance,
          grillePrincipalePointilles
        ).tikz()
      } else {
        code += grille(
          xmin / xscale,
          ymin / yscale,
          xmax / xscale,
          ymax / yscale,
          grillePrincipaleColor,
          grillePrincipaleOpacite,
          grillePrincipaleDistance,
          grillePrincipalePointilles
        ).tikz()
      }
    }
    if (grilleSecondaireVisible) {
      code +=
        grille(
          xmin / xscale,
          ymin / yscale,
          xmax / xscale,
          ymax / yscale,
          grilleSecondaireColor,
          grilleSecondaireOpacite,
          grilleSecondaireDistance,
          grilleSecondairePointilles
        ).tikz()
    }
    code +=
      axes(
        xmin / xscale,
        ymin / yscale,
        xmax / xscale,
        ymax / yscale,
        0.2 / context.scale,
        xstep,
        ystep,
        axesEpaisseur,
        axesColor
      ).tikz()

    if (afficheZero) {
      if (afficheLabelX) {
        code += labelX(
          premierMultipleSuperieur(xstep, graduationsxMin),
          graduationsxMax,
          xstep,
          graduationColor,
          yabscisse / yscale + positionLabelX / context.scale,
          xscale
        ).tikz()
      }
      if (afficheLabelY) {
        code += labelY(
          premierMultipleSuperieur(ystep, graduationsyMin),
          graduationsyMax,
          ystep,
          graduationColor,
          xordonnee / xscale + positionLabelY / context.scale,
          yscale
        ).tikz()
      }
    } else {
      if (afficheLabelX) {
        code += labelX(
          premierMultipleSuperieur(xstep, graduationsxMin),
          -1,
          xstep,
          graduationColor,
          yabscisse / yscale + positionLabelX / context.scale,
          xscale
        ).tikz()
      }
      if (afficheLabelY) {
        code += labelY(
          premierMultipleSuperieur(ystep, graduationsyMin),
          -1,
          ystep,
          graduationColor,
          xordonnee / xscale + positionLabelY / context.scale,
          yscale
        ).tikz()
      }
      if (afficheLabelX) {
        code += labelX(
          Math.max(xstep, premierMultipleSuperieur(xstep, graduationsxMin)),
          graduationsxMax,
          xstep,
          graduationColor,
          yabscisse / yscale + positionLabelX / context.scale,
          xscale
        ).tikz()
      }
      if (afficheLabelY) {
        code += labelY(
          Math.max(ystep, premierMultipleSuperieur(ystep, graduationsyMin)),
          graduationsyMax,
          ystep,
          graduationColor,
          xordonnee / xscale + positionLabelY / context.scale,
          yscale
        ).tikz()
      }
    }
    if (positionLegendeX === undefined) {
      positionLegendeX = [xmax + 0.2 / context.scale, yabscisse + 0.3 / context.scale]
    }
    if (positionLegendeY === undefined) {
      positionLegendeY = [xordonnee + 0.3 / context.scale, ymax + 0.2 / context.scale]
    }
    code += texteParPosition(
      legendeX,
      positionLegendeX[0] / xscale,
      positionLegendeX[1] / yscale,
      'droite', 'black', 1, 'middle', true
    ).tikz()
    code += texteParPosition(
      legendeY,
      positionLegendeY[0] / xscale,
      positionLegendeY[1] / yscale,
      'droite', 'black', 1, 'middle', true, true
    ).tikz()
    return code
  }

  this.xscale = xscale
  this.yscale = yscale
}

export function repere (...args) {
  return new Repere(...args)
}

/**
 * repere2({xUnite, yUnite, xMin, xMax, yMin, yMax, axeX, axeY, axesEpaisseur, axesCouleur, axeXStyle, axeYStyle, thickEpaisseur,
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
 * repere2() trace un repère classique. De nombreux paramètres permettent d'en modifier l'aspect
 *
 * @author Rémi Angot
 */

function Repere2 ({
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
} = {}) {
  ObjetMathalea2D.call(this)

  // Les propriétés exportables
  this.xUnite = xUnite
  this.yUnite = yUnite
  this.xMin = xMin
  this.xMax = xMax
  this.yMin = yMin
  this.yMax = yMax

  const objets = []
  // LES AXES
  const OrdonneeAxe = Math.max(0, yMin)
  const axeX = segment(xMin * xUnite, OrdonneeAxe * yUnite, xMax * xUnite, OrdonneeAxe * yUnite)
  axeX.epaisseur = axesEpaisseur
  axeX.styleExtremites = axeXStyle
  axeX.color = colorToLatexOrHTML(axesCouleur)
  const abscisseAxe = Math.max(0, xMin)
  const axeY = segment(abscisseAxe * xUnite, yMin * yUnite, abscisseAxe * xUnite, yMax * yUnite)
  axeY.epaisseur = axesEpaisseur
  axeY.styleExtremites = axeYStyle
  axeY.color = colorToLatexOrHTML(axesCouleur)
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
          traitH.pointilles = true
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
          traitV.pointilles = true
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
        traitH.pointilles = true
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
        traitV.pointilles = true
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
      const thick = segment(x * xUnite, OrdonneeAxe * yUnite - thickHauteur, x * xUnite, OrdonneeAxe * yUnite + thickHauteur, thickCouleur)
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
      const l = texteParPosition(`${stringNombre(x, precisionLabelX)}`, x * xUnite, OrdonneeAxe * yUnite - xLabelEcart, 'milieu', 'black', 1, 'middle', true)
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
 * @returns
 */
export function repere2 ({
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
} = {}) {
  return new Repere2({
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

/**
 * Trace un graphique cartésien dans un repère
 *
 *
 * @param {array} data
 * @param {object} repere
 * @author Rémi Angot
 */
function TraceGraphiqueCartesien (data, repere, {
  couleurDesPoints = 'red',
  couleurDuTrait = 'blue',
  styleDuTrait = '', // plein par défaut
  epaisseurDuTrait = 2,
  styleDesPoints = 'x', // croix par défaut
  tailleDesPoints = 3

} = {}) {
  ObjetMathalea2D.call(this)
  const objets = []
  const listePoints = []
  for (const [x, y] of data) {
    const M = pointDansRepere(x, y, repere)
    listePoints.push(M)
    const t = tracePoint(M)
    t.color = couleurDesPoints
    t.style = styleDesPoints
    t.taille = tailleDesPoints
    t.isVisible = false
    M.isVisible = false
    objets.push(t)
  }
  const l = polyline(...listePoints)
  l.isVisible = false
  l.epaisseur = epaisseurDuTrait
  l.color = couleurDuTrait
  if (styleDuTrait === 'pointilles') {
    l.pointilles = true
  }
  objets.push(l)

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

export function traceGraphiqueCartesien (...args) {
  return new TraceGraphiqueCartesien(...args)
}

/**
 * Classe TableauDeVariation Initiée par Sebastien Lozano, transformée par Jean-Claude Lhote
 * publié le 9/02/2021
 * tabInit est un tableau contenant sous forme de chaine les paramètres de la macro Latex \tabInit{}{}
 * tabLines est un tableau contenant sous forme de chaine les paramètres des différentes macro \tabLine{}
 * exemple :
 * tabInit:[[[texte1,taille1,long1],[texte2,taille2,long2]...],[valeur1,long1,valeur2,long2,valeur3,long3...]]
 * tabLines:[[type,long0,codeL1C1,long1,codeL1C2,long2,codeL1C3,long3...],[type,long0,codeL2C1,long1,codeL2C2,long2,codeL2C3,long3...]]
 * @param {*} param0
 * @author Jean-Claude Lhote
 */
function TableauDeVariation ({ tabInit, tabLines, lgt, escpl, deltacl, colors, hauteurLignes, colorBackground }) {
  ObjetMathalea2D.call(this)
  this.tabInit = tabInit
  this.tabLines = tabLines
  this.colors = colors
  this.lgt = lgt
  this.escpl = escpl
  this.deltacl = deltacl
  this.hauteurLignes = []
  if (hauteurLignes.length !== 0) { // On récupère les hauteurs de lignes
    this.hauteurLignes = hauteurLignes
  } else { // Si elles ne sont pas définies, on met 20 par défaut
    for (let i = 0; i < tabInit[0].length; i++) {
      this.hauteurLignes.push(10)
    }
  }

  this.svg = function (coeff) {
    const tabInit0 = this.tabInit[0]
    const tabInit1 = this.tabInit[1]
    const tabLines = this.tabLines
    let yLine = 0
    const segments = []; let index = 0; const textes = []; let texte; let long; let s; let p; let v; let fleches = []; let codeVar = []; let ZI = []; let ZIon; let zonesEstInterdit = []
    let code = ''
    const longueurTotale = this.lgt + (tabInit1.length / 2 - 1) * escpl + 2 * this.deltacl
    const MathToSVG = function (string) { // fonction qui traduit si possible la chaine Latex en un tableau de chaine
      // un seul élément si c'est du texte ou un nombre
      // deux éléments si il y a un signe - et du texte
      // trois élément si c'est une fraction les 2e et 3e sont le numérateur et le dénominateur. Le 1er est éventuellement un signe -
      if (string[0] === '$') string = string.substring(1, string.length - 1)
      return string
    }

    for (let i = -1; i < tabInit0.length && index < tabLines.length;) { // on s'arrête quand on dépasse le nombre de lignes prévues
      if (i === -1) { // ici on est dans la ligne d'entête
        i++
        // On crée une ligne horizontale et les séparations verticales de base
        segments.push(segment(0, yLine, longueurTotale, yLine))
        segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
        segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
        segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))

        texte = tabInit0[0][0]
        long = tabInit0[0][2]//
        textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt / 2, -tabInit0[0][1] * this.hauteurLignes[0] / 28, 'black', long, 8, colorBackground, 8))
        for (let j = 0; j < tabInit1.length / 2; j++) {
          texte = tabInit1[j * 2]
          long = tabInit1[j * 2 + 1]
          if (texte.indexOf('frac') !== -1) {
            textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * j, -tabInit0[0][1] * this.hauteurLignes[0] / 28, 'black', long, 30, colorBackground, 8))
          } else {
            textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * j, -tabInit0[0][1] * this.hauteurLignes[0] / 28, 'black', long, 15, colorBackground, 8))
          }
        }
        yLine -= tabInit0[0][1] * this.hauteurLignes[0] / 15
      } else { // On est dans les lignes 1 à n
        // Line et Var incrémente i de 1 et décrémente yLine de la hauteur de la ligne
        // Val, Ima et Slope incrémente index mais pas i
        switch (tabLines[index][0]) {
          case 'Line':
            i++
            long = tabInit0[i][2]
            textes.push(latexParCoordonnees(MathToSVG(tabInit0[i][0]), this.lgt / 2, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8)) // this.hauteurLignes[i],colorBackground))

            for (let k = 1; k < tabLines[index].length / 2; k++) {
              if (tabLines[index][k * 2] !== '') {
                texte = tabLines[index][k * 2]
                long = tabLines[index][k * 2 + 1]
                if (texte.length === 1) {
                  switch (texte[0]) {
                    case 'z':
                      textes.push(latexParCoordonnees('0', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8))
                      s = segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                      s.pointilles = 4
                      segments.push(s)
                      break
                    case 'd':
                      segments.push(segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                      segments.push(segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                      break
                    case 't':
                      s = segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                      s.pointilles = 4
                      segments.push(s)
                      break
                    case 'h':
                      p = polygone(point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                      p.couleurDeRemplissage = 'gray'
                      segments.push(p)
                      break
                    case '+':
                      textes.push(latexParCoordonnees('+', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8))

                      break
                    case '-':
                      textes.push(latexParCoordonnees('-', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8))

                      break
                  }
                } else if (texte === 'R/') {
                  // textes.push(latexParCoordonnees(texte, this.lgt + this.deltacl + this.escpl/2 * (k - 0.6), yLine-tabInit0[i][1] / 2))
                } else {
                  textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, this.hauteurLignes[i], colorBackground, 8))
                }
              }
            }
            // On crée une ligne horizontale et les séparations verticales de base
            segments.push(segment(0, yLine, longueurTotale, yLine))
            segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            yLine -= tabInit0[i][1] * this.hauteurLignes[i] / 15
            index++
            break
          case 'Var':
            i++ // index des lignes (ça démarre à -1 pour l'entête, ça passe à 0 pour la première ligne (celle sous l'entête) et c'est incrémenté à chaque nouvelle ligne)
            fleches = [] // les points qui marquent le départ et/ou l'arrivée d'une flèche (endroit où se situent les valeurs)
            ZI = [] // Liste de points (qui vont par deux : un sur la ligne du dessus, l'autre en dessous)
            ZIon = false // un booléen qui bascule à true si on entre dans une zone interdite et qui rebascule à false à la prochaine valeur
            // utilisé pour ajouter les deux points de droite servant à faire le rectangle hachuré/
            zonesEstInterdit = [] // Un tableau pour garder la trace des "zones interdites" où il ne doit pas y avoir de flèches
            for (let k = 1; k < tabLines[index].length / 2; k++) {
              textes.push(latexParCoordonnees(MathToSVG(tabInit0[i][0]), this.lgt / 2, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', tabInit0[i][2], 15, colorBackground, 8))
              if (tabLines[index][k * 2] !== '') {
                texte = tabLines[index][k * 2]
                long = tabLines[index][k * 2 + 1]
                codeVar = texte.split('/')
                switch (codeVar.length) {
                  case 1: // il n'y a qu'un code
                    // on ne fait rien, c'est la commande R/ ou un emplacement vide sans /
                    break
                  case 2: // Une seule expression (2 codes séparés par un seul /)
                    switch (codeVar[0]) {
                      case '+': // une expression
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-': // une expression
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '+C': // une expression sur une double barre (prolongement par continuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-C': // une expression sur une double barre (prolongement par continuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '+D': // une expression suivie d’une double barre (discontinuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-D': // une expression suivie d’une double barre (discontinuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '+H': // une expression suivie d’une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '-H': // une expression suivie d’une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case 'D-': // expression précédée d'une double barre discontinuité
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case 'D+':// expression précédée d'une double barre discontinuité
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-DH': // expression suivie d'une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '+DH': // expression suivie d'une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '-CH': // expression sur une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '+CH': // expression sur une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case 3: // 2 expressions sérarées par / /
                        switch (codeVar[0]) { // on regarde le code
                          case '':
                            break
                          case '-CD-': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+CD+': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 14, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 14, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-CD+': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+CD-': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-D-': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+D+': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-D+': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+D-': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-DC-': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+DC+': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-DC+': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+DC-': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-V-': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+V+': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-V+': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+V-': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                        }
                        break
                    }
                }
              }
            }
            for (let n = 0; n < fleches.length - 1; n++) {
              if (!zonesEstInterdit[n]) {
                v = vecteur(translation(fleches[n], vecteur(1.5, 0)), translation(fleches[n + 1], vecteur(-1.5, 0))).representant(translation(fleches[n], vecteur(1.5, 0)))
                v.styleExtremites = '->'
                segments.push(v)
              }
            }
            for (let n = 0; n <= ZI.length / 4 - 1; n++) {
              p = polygone(ZI[4 * n], ZI[4 * n + 2], ZI[4 * n + 3], ZI[4 * n + 1])
              p.opacite = 1
              p.hachures = 'north east lines'
              segments.push(p)
            }

            // On crée une ligne horizontale et les séparations verticales de base
            segments.push(segment(0, yLine, longueurTotale, yLine))
            segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            yLine -= tabInit0[i][1] * this.hauteurLignes[i] / 15
            index++
            break
          case 'Val': // ajouter un antécédent et son image sur la flèche. 6 paramètres + 'Val'
            // ['Val',antécédent du début de la flèche, antécédent de la fin de la flèche, position sur la flèche entre 0 et 1, 'antécédent', 'image',long]
            if (tabLines[index][5] !== '') {
              long = tabLines[index][6]
              textes.push(latexParCoordonnees(MathToSVG(tabLines[index][5]), this.lgt + this.deltacl + this.escpl * (tabLines[index][1] - 1) + 1 + (this.escpl - 2) * (tabLines[index][2] - tabLines[index][1]) * tabLines[index][3], yLine + 1.1 + tabLines[index][3] * tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, this.hauteurLignes[i], colorBackground, 8))
              textes.push(latexParCoordonnees(MathToSVG(tabLines[index][4]), this.lgt + this.deltacl + this.escpl * (tabLines[index][1] - 1) + 1 + (this.escpl - 2) * (tabLines[index][2] - tabLines[index][1]) * tabLines[index][3], -tabInit0[0][1] * this.hauteurLignes[i] / 30, 'black', long, this.hauteurLignes[i], colorBackground, 8))
            }
            index++
            break
          case 'Ima': // ajouter des valeurs sur la flèche...

            if (tabLines[index][3] !== '') {
              texte = tabLines[index][3]
              long = tabLines[index][4]
              if (texte.indexOf('frac') !== -1) {
                textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * ((tabLines[index][1] - 1) + (tabLines[index][2] - 1)) / 2, yLine + tabInit0[i][1] * this.hauteurLignes[i] / 30 - 0.1, 'black', long, 30, colorBackground, 8))
              } else {
                textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * ((tabLines[index][1] - 1) + (tabLines[index][2] - 1)) / 2, yLine + tabInit0[i][1] * this.hauteurLignes[i] / 30 - 0.1, 'black', long, 15, colorBackground, 8))
              }
            }
            index++
            break
          case 'Slope':
            /****************************************************************************/
            // Slope n'est pas implémenté... reste à faire (si quelqu'un en a besoin).
            /****************************************************************************/
            for (let k = 1; k < tabLines[index].length / 2; k++) {
              if (tabLines[index][k * 2] !== '') {
                texte = tabLines[index][k * 2]
                long = tabLines[index][k * 2 + 1]
              }
            }
            break
        }
      }
    }

    // On ferme le tableau en bas
    segments.push(segment(0, yLine, longueurTotale, yLine))
    // On écrit le code avec tous les éléments.
    for (let i = 0; i < segments.length; i++) {
      code += '\n\t' + segments[i].svg(coeff)
    }
    for (let i = 0; i < textes.length; i++) {
      code += '\n\t' + textes[i].svg(coeff)
    }
    return code
  }

  this.tikz = function () {
    let code = `\\tkzTabInit[lgt=${lgt},deltacl=${deltacl},espcl=${escpl}`
    for (let i = 0; i < this.colors.length; i++) {
      code += `,${this.colors[i]}`
    }
    code += ']{'
    const tabinit0 = this.tabInit[0]
    const tabinit1 = this.tabInit[1]
    let type
    for (let i = 0; i < tabinit0.length; i++) {
      if (tabinit0[i][0].indexOf(',') !== -1) {
        tabinit0[i][0] = `{${tabinit0[i][0]}}`
      }
      code += ` ${tabinit0[i][0]} / ${tabinit0[i][1]},`
    }
    code = code.substring(0, code.length - 1)
    code += '}{'
    for (let i = 0; i < tabinit1.length / 2; i++) {
      if (tabinit1[i * 2].indexOf(',') !== -1) {
        tabinit1[i * 2] = `{${tabinit1[i * 2]}}`
      }
      code += ` ${tabinit1[i * 2]},`
    }
    code = code.substring(0, code.length - 1)
    code += '}' + '\n\t'
    for (let i = 0; i < this.tabLines.length; i++) {
      type = this.tabLines[i][0]
      if (type === 'Val' || type === 'Ima') {
        code += `\\tkzTab${type}`
        for (let j = 1; j < this.tabLines[i].length - 1; j++) {
          if (this.tabLines[i][j].indexOf(',') !== -1) {
            this.tabLines[i][j] = `{${this.tabLines[i][j]}}`
          }
          code += `{${this.tabLines[i][j]}},`
        }
        code += '\n\t'
      } else if (type === 'Var' || type === 'Line') {
        code += `\\tkzTab${type}{ `
        for (let j = 2; j < this.tabLines[i].length; j += 2) {
          if (this.tabLines[i][j].indexOf(',') !== -1) {
            this.tabLines[i][j] = `{${this.tabLines[i][j]}}`
          }
          code += ` ${this.tabLines[i][j]},`
        }
        code = code.substring(0, code.length - 1)
        code += '}' + '\n\t'
      }
    }
    return code
  }
}
// tableauDeVariation crée une instance de la classe. voici le détail des paramètres.
// escpl=taille en cm entre deux antécédents, deltacl=distance entre la bordure et les premiers et derniers antécédents
// lgt = taille de la première colonne tout est en cm
// tabInit contient 2 tableaux
// le premier contient des triplets [chaine d'entête,hauteur de ligne,nombre de pixels de largeur estimée du texte pour le centrage]
// le deuxième contient une succession de chaines et de largeurs en pixels : ce sont les antécédent de la ligne d'entête
// tabLines contient des tableaux de la forme ['type',...]
// type est 'Line' pour une ligne de signes et valeurs. Les valeurs sont données avec à la suite leur largeur estimée en pixels.
// type est 'Var' pour une ligne de variations. Les variations sont des chaines respectant une syntaxe particulière.
// On intercale une largeur estimée pour le texte éventuel
// type est 'Ima' il faut 4 paramètres numériques : le 1er et le 2e sont les N° des antécédents entre lesquels on veut placer l'image
// le 3e est la valeur de l'image et le 4e est la largeur estimée en pixels
// type est 'Val' il faut 5 paramètres : Idem Ima pour les deux premiers, le 3e est l'antécédent à ajouter, le 4e son image et le 5e sa taille
// Pour plus d'info sur le codage des variations, voir ce tuto : https://zestedesavoir.com/tutoriels/439/des-tableaux-de-variations-et-de-signes-avec-latex/
// reste à faire les types  'Slope"

export function tableauDeVariation ({ tabInit = ['', ''], tabLines = [], lgt = 3.5, escpl = 5, deltacl = 0.8, colors = [], hauteurLignes = [], colorBackground = 'gray' }) {
  return new TableauDeVariation({ tabInit: tabInit, tabLines: tabLines, lgt: lgt, escpl: escpl, deltacl: deltacl, colors: colors, hauteurLignes: hauteurLignes, colorBackground: colorBackground })
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES STATISTIQUES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Trace une barre pour un histogramme
 *
 * @param {integer} x
 * @param {integer} hauteur
 * @param {string} legende
 * @param {integer} epaisseur
 * @param {string} couleur
 * @param {integer} opaciteDeRemplissage
 * @param {integer} angle
 * @author Rémi Angot
 */
function TraceBarre (x, hauteur, legende = '', { epaisseur = 0.6, couleurDeRemplissage = 'blue', color = 'black', opaciteDeRemplissage = 0.3, angle = 66, unite = 1, hachures = false } = {}) {
  ObjetMathalea2D.call(this)
  const p = hauteur === 0 ? vide2d(x, 0) : polygone(point(x - epaisseur / 2, 0), point(x - epaisseur / 2, hauteur * unite), point(x + epaisseur / 2, hauteur * unite), point(x + epaisseur / 2, 0))
  p.couleurDeRemplissage = couleurDeRemplissage
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = color
  if (hachures) {
    p.hachures = hachures
  }
  const texte = texteParPosition(legende, x, -0.2, angle, 'black', 1, 'gauche')
  this.bordures = [Math.min(p.bordures[0], texte.bordures[0]), Math.min(p.bordures[1], texte.bordures[1]), Math.max(p.bordures[2], texte.bordures[2]), Math.max(p.bordures[3], texte.bordures[3])]
  this.tikz = function () {
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff) {
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

export function traceBarre (...args) {
  return new TraceBarre(...args)
}

/**
 * Trace une barre horizontale pour un histogramme
 *
 * @param {integer} longueur
 * @param {integer} y
 * @param {string} legende
 * @param {integer} epaisseur
 * @param {string} couleur
 * @param {integer} opaciteDeRemplissage
 * @param {integer} angle
 * @author Rémi Angot
 */
function TraceBarreHorizontale (longueur, y, legende = '', { epaisseur = 0.6, couleurDeRemplissage = 'blue', color = 'black', opaciteDeRemplissage = 0.3, unite = 1, angle = 'gauche', hachures = false } = {}) {
  ObjetMathalea2D.call(this)
  const p = longueur === 0 ? vide2d(0, y) : polygone(point(0, y - epaisseur / 2), point(0, y + epaisseur / 2), point(unite * longueur, y + epaisseur / 2), point(unite * longueur, y - epaisseur / 2))
  p.couleurDeRemplissage = couleurDeRemplissage
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = color
  if (hachures) {
    p.hachures = hachures
  }
  const texte = texteParPosition(legende, -0.2, y, angle, 'black', 1, 'gauche')

  this.tikz = function () {
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff) {
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

export function traceBarreHorizontale (...args) {
  return new TraceBarreHorizontale(...args)
}

function DiagrammeBarres (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 5, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  ObjetMathalea2D.call(this)
  const diagramme = []
  for (let j = 0; j < hauteursBarres.length; j++) {
    const abscisseBarre = j * coeff
    const hauteurBarre = hauteursBarres[j] * hauteurDiagramme / max(hauteursBarres)
    diagramme.push(traceBarre(abscisseBarre, hauteurBarre, etiquettes[j], { couleurDeRemplissage: couleurDeRemplissage }))
    if (reperageTraitPointille) {
      const ligne = segment(-1, hauteurBarre, abscisseBarre, hauteurBarre)
      ligne.pointilles = true
      ligne.epaisseur = 0.2
      diagramme.push(ligne)
    }
    if (etiquetteValeur) {
      if (hauteursBarres[j] !== 0) {
        diagramme.push(texteParPoint(numberFormat(hauteursBarres[j]), point(abscisseBarre, hauteurBarre + 0.3))) // On écrit la valeur au dessus de la barre sauf pour une hauteur de 0
      }
    }
    // Calculs permettant de graduer l'axe vertical et de placer des valeurs
    const steps = [1, 2, 5, 10, 20]
    const yticks = [1, 2, 5, 5, 5]
    let istep = 1
    let step = 1
    let ytick = 1
    while (max(hauteursBarres) / step > 5 && istep < 5) {
      istep += 1
      step = steps[istep - 1]
      ytick = yticks[istep - 1]
    }
    if (istep === 5) istep = 2
    while (max(hauteursBarres) / step > 5) {
      istep = istep + 1
      step = istep * 10
      ytick = 5
    }
    if (labelAxeVert) diagramme.push(labelY(0, max(hauteursBarres), (fraction(hauteurDiagramme, max(hauteursBarres))).mul(step), 'black', -1.3, max(hauteursBarres) / hauteurDiagramme))
    if (axeVertical) diagramme.push(axeY(-1, 0, abscisseBarre, hauteurDiagramme + 1, 0.2, (fraction(hauteurDiagramme, max(hauteursBarres))).mul(step), 0.2, 'black', ytick, titreAxeVertical))
  }
  if (titre !== '') diagramme.push(texteParPoint(titre, point((hauteursBarres.length - 1) * coeff / 2, hauteurDiagramme + 1)))
  this.bordures = [1000, 1000, -1000, -1000]
  for (const objet of diagramme) {
    if (objet.bordures !== undefined) { this.bordures = [Math.min(this.bordures[0], objet.bordures[0]), Math.min(this.bordures[1], objet.bordures[1]), Math.max(this.bordures[2], objet.bordures[2]), Math.max(this.bordures[3], objet.bordures[3])] }
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of diagramme) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function (coeff) {
    let code = ''
    for (const objet of diagramme) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}
export function diagrammeBarres (...args) {
  return new DiagrammeBarres(...args)
}
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES COURBES DE FONCTIONS %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function LectureImage (x, y, xscale = 1, yscale = 1, color = 'red', textAbs = '', textOrd = '') {
  ObjetMathalea2D.call(this)
  this.x = x
  this.y = y
  this.xscale = xscale
  this.yscale = yscale
  if (textAbs === '') textAbs = x.toString()
  if (textOrd === '') textOrd = y.toString()
  this.textAbs = textAbs
  this.textOrd = textOrd
  this.color = color

  this.svg = function (coeff) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.color)
    const Sy = segment(M, Y, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.svg(coeff) + '\t\n' + Sy.svg(coeff) + '\t\n' + texteParPosition(this.textAbs, x0, -1 * 20 / coeff, 'milieu', this.color).svg(coeff) + '\t\n' + texteParPosition(this.textOrd, -1 * 20 / coeff, y0, 'milieu', this.color).svg(coeff)
  }
  this.tikz = function () {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.color)
    const Sy = segment(M, Y, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.tikz() + '\t\n' + Sy.tikz() + '\t\n' + texteParPosition(this.textAbs, x0, -1 / context.scale, 'milieu', this.color).tikz() + '\t\n' + texteParPosition(this.textOrd, -1 / context.scale, y0, 'milieu', this.color).tikz()
  }
  this.svgml = function (coeff, amp) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x, y)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.color)
    const Sy = segment(M, Y, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.svgml(coeff, amp) + '\t\n' + Sy.svgml(coeff, amp) + '\t\n' + texteParPosition(this.textAbs, x0, -1 * 20 / coeff, 'milieu', this.color).svg(coeff) + '\t\n' + texteParPosition(this.textOrd, -1 * 20 / coeff, y0, 'milieu', this.color).svg(coeff)
  }
  this.tikzml = function (amp) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x, y)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.color)
    const Sy = segment(M, Y, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.tikzml(amp) + '\t\n' + Sy.tikzml(amp) + '\t\n' + texteParPosition(this.textAbs, x0, -1 / context.scale, 'milieu', this.color).tikz() + '\t\n' + texteParPosition(this.textOrd, -1 / context.scale, y0, 'milieu', this.color).tikz()
  }
}
export function lectureImage (...args) {
  return new LectureImage(...args)
}

function LectureAntecedent (x, y, xscale, yscale, color = 'black', textOrd, textAbs) {
  // 'use strict'
  ObjetMathalea2D.call(this)
  this.x = x
  this.y = y
  this.xscale = xscale
  this.yscale = yscale
  if (textAbs === '') textAbs = this.x.toString()
  if (textOrd === '') textOrd = this.y.toString()
  this.textAbs = textAbs
  this.textOrd = textOrd
  this.color = color

  this.svg = function (coeff) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.color)
    const Sy = segment(Y, M, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.svg(coeff) + '\t\n' + Sy.svg(coeff) + '\t\n' + texteParPosition(this.textAbs, x0, -1 * 20 / coeff, 'milieu', this.color).svg(coeff) + '\t\n' + texteParPosition(this.textOrd, -1 * 20 / coeff, y0, 'milieu', this.color).svg(coeff)
  }
  this.tikz = function () {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.color)
    const Sy = segment(Y, M, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.tikz() + '\t\n' + Sy.tikz() + '\t\n' + texteParPosition(this.textAbs, x0, -1 / context.scale, 'milieu', this.color).tikz() + '\t\n' + texteParPosition(this.textOrd, -1 / context.scale, y0, 'milieu', this.color).tikz()
  }
  this.svgml = function (coeff, amp) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.color)
    const Sy = segment(Y, M, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.svgml(coeff, amp) + '\t\n' + Sy.svgml(coeff, amp) + '\t\n' + texteParPosition(this.textAbs, x0, -1 * 20 / coeff, 'milieu', this.color).svg(coeff) + '\t\n' + texteParPosition(this.textOrd, -1 * 20 / coeff, y0, 'milieu', this.color).svg(coeff)
  }
  this.tikzml = function (amp) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.color)
    const Sy = segment(Y, M, this.color)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = true
    Sy.pointilles = true
    return '\t\n' + Sx.tikzml(amp) + '\t\n' + Sy.tikzml(amp) + '\t\n' + texteParPosition(this.textAbs, x0, -1 / context.scale, 'milieu', this.color).tikz() + '\t\n' + texteParPosition(this.textOrd, -1 / context.scale, y0, 'milieu', this.color).tikz()
  }
}
export function lectureAntecedent (...args) {
  return new LectureAntecedent(...args)
}
/**
 * courbe(f,xmin,xmax,color,epaisseur,repere,step) // Trace la courbe de f
 *
 * @author Rémi Angot
 */

function Courbe (
  f,
  xmin = -20,
  xmax = 30,
  color = 'black',
  epaisseur = 2,
  r = [1, 1],
  step = 0.1
) {
  ObjetMathalea2D.call(this)
  // this.color = color
  let xscale, yscale
  this.xmin = xmin
  if (r.constructor === Repere) {
    xscale = r.xscale
    yscale = r.yscale
  } else {
    xscale = r[0]
    yscale = r[1]
  }
  const points = []
  for (
    let x = xmin / xscale;
    x <= xmax / xscale;
    // x = x + step
    x = arrondi(x + step)
  ) {
    if (isFinite(f(x * xscale))) {
      points.push(point(x, f(x * xscale) / yscale))
    }
  }
  // const p = polyline([...points], this.color)
  // const p = polyline([...points], 'red')
  const p = polyline([...points], 'red')
  p.epaisseur = epaisseur
  return p
}

export function courbe (
  f,
  xmin = -20,
  xmax = 30,
  color = 'black',
  epaisseur = 2,
  r = [1, 1],
  step = 0.1
) {
  return new Courbe(f,
    xmin,
    xmax,
    color,
    epaisseur,
    r,
    step)
}

/**
 * courbe2(f,{repere,color,epaisseur,step,xMin,xMax,yMin,yMax,xUnite,yUnite}) // Trace la courbe de f
 *
 * @author Rémi Angot
 */

function Courbe2 (f, {
  repere = {},
  color = 'black',
  epaisseur = 2,
  step = false,
  xMin,
  xMax,
  yMin,
  yMax,
  xUnite = 1,
  yUnite = 1
} = {}) {
  ObjetMathalea2D.call(this)
  this.color = color
  let xmin, ymin, xmax, ymax, xunite, yunite // Tout en minuscule pour les différencier des paramètres de la fonction
  if (typeof xMin === 'undefined') {
    xmin = repere.xMin
  } else xmin = xMin
  if (typeof yMin === 'undefined') {
    ymin = repere.yMin
  } else ymin = yMin
  if (typeof xMax === 'undefined') {
    xmax = repere.xMax
  } else xmax = xMax
  if (typeof yMax === 'undefined') {
    ymax = repere.yMax
  } else ymax = yMax

  xunite = repere.xUnite
  yunite = repere.yUnite

  if (isNaN(xunite)) { xunite = xUnite };
  if (isNaN(yunite)) { yunite = yUnite };
  const objets = []
  let points = []
  let pas
  let p
  if (!step) {
    pas = 0.2 / xUnite
  } else {
    pas = step
  }
  for (let x = xmin; inferieurouegal(x, xmax); x += pas
  ) {
    if (isFinite(f(x))) {
      if (f(x) < ymax + 1 && f(x) > ymin - 1) {
        points.push(point(x * xunite, f(x) * yunite))
      } else {
        p = polyline([...points], this.color)
        p.epaisseur = epaisseur
        objets.push(p)
        points = []
      }
    } else {
      x += 0.05
    }
  }
  p = polyline([...points], this.color)
  p.epaisseur = epaisseur
  objets.push(p)

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

export function courbe2 (...args) {
  return new Courbe2(...args)
}

/**
 * Integrale(f,{repere,color,couleurDeRemplissage,epaisseur,step,a,b,opacite,hachures}) // Trace la courbe de f
 * a et b sont les bornes (dans l'ordre croissant a<b)
 * opacite = 0.5 par défaut
 * hachures = 0 par défaut (= 'northeastlines')
 * @author Jean-Claude Lhote
 */

function Integrale (f, {
  repere = {},
  color = 'black',
  couleurDeRemplissage = 'blue',
  epaisseur = 2,
  step = false,
  a = 0,
  b = 1,
  opacite = 0.5,
  hachures = 0
} = {}) {
  ObjetMathalea2D.call(this)
  this.color = color
  this.couleurDeRemplissage = couleurDeRemplissage
  const ymin = repere.yMin
  const ymax = repere.yMax
  const xunite = repere.xUnite
  const yunite = repere.yUnite

  const objets = []
  const points = []
  let pas
  if (!step) {
    pas = 0.2 / xunite
  } else {
    pas = step
  }
  for (let x = a; inferieurouegal(x, b); x += pas
  ) {
    if (isFinite(f(x))) {
      if (f(x) < ymax + 1 && f(x) > ymin - 1) {
        points.push(point(x * xunite, f(x) * yunite))
      } else {
        window.notify('Erreur dans Integrale : Il semble que la fonction ne soit pas continue sur l\'intervalle', { f, a, b })
      }
    } else {
      x += 0.05
    }
  }
  points.push(point(b * xunite, f(b) * yunite), point(b * xunite, 0), point(a * xunite, 0))
  const p = polygone([...points], this.color)
  p.epaisseur = epaisseur
  p.couleurDeRemplissage = colorToLatexOrHTML(this.couleurDeRemplissage)
  p.opaciteDeRemplissage = opacite
  p.hachures = motifs(hachures)
  objets.push(p)

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

export function integrale (...args) {
  return new Integrale(...args)
}
/**
 * crée un objet correspondant au tracé de la fonction f de la classe Spline
 * f devra être définie avant...
 * @author Jean-Claude Lhote
 */
function CourbeSpline (f, {
  repere = {},
  color = 'black',
  epaisseur = 2,
  step = false,
  xMin,
  xMax,
  yMin,
  yMax,
  xUnite = 1,
  yUnite = 1,
  traceNoeuds = true
} = {}) {
  ObjetMathalea2D.call(this)
  const noeuds = []
  let points = []
  let xmin, ymin, xmax, ymax, xunite, yunite // Tout en minuscule pour les différencier des paramètres de la fonction
  if (typeof xMin === 'undefined') {
    xmin = repere.xMin
  } else xmin = xMin
  if (typeof yMin === 'undefined') {
    ymin = repere.yMin
  } else ymin = yMin
  if (typeof xMax === 'undefined') {
    xmax = repere.xMax
  } else xmax = xMax
  if (typeof yMax === 'undefined') {
    ymax = repere.yMax
  } else ymax = yMax

  xunite = repere.xUnite
  yunite = repere.yUnite

  if (isNaN(xunite)) { xunite = xUnite };
  if (isNaN(yunite)) { yunite = yUnite };
  const objets = []
  if (traceNoeuds) {
    for (let i = 0; i < f.x.length; i++) {
      noeuds[i] = tracePoint(point(f.x[i], f.y[i]), 'black')
      noeuds[i].taille = 3
      noeuds[i].style = '+'
      noeuds[i].epaisseur = 2
      noeuds.opacite = 0.5
      objets.push(noeuds[i])
    }
  }
  let pas
  let p, y
  if (!step) {
    pas = 0.2 / xUnite
  } else {
    pas = step
  }
  for (let x = xmin; inferieurouegal(x, xmax); x = x + pas) {
    y = f.image(x)
    if (!isNaN(y)) {
      if (y < ymax + 1 && y > ymin - 1) {
        points.push(point(x * xunite, y * yunite))
      } else {
        p = polyline([...points], color)
        p.epaisseur = epaisseur
        p.opacite = 0.7
        objets.push(p)
        points = []
      }
    } else {
      x += 0.05
    }
  }
  p = polyline([...points], color)
  p.epaisseur = epaisseur
  p.opacite = 0.7
  objets.push(p)

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

export function courbeSpline (...args) {
  return new CourbeSpline(...args)
}

/**
 * @SOURCE : https://gist.github.com/ericelliott/80905b159e1f3b28634ce0a690682957
 */
// y1: start value
// y2: end value
// mu: the current frame of the interpolation,
//     in a linear range from 0-1.
const cosineInterpolate = (y1, y2, mu) => {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2
  return y1 * (1 - mu2) + y2 * mu2
}

function CourbeInterpolee (
  tableau,
  color = 'black',
  epaisseur = 2,
  r = [1, 1],
  xmin,
  xmax
) {
  ObjetMathalea2D.call(this)
  const mesCourbes = []
  for (let i = 0; i < tableau.length - 1; i++) {
    const x0 = tableau[i][0]
    const y0 = tableau[i][1]
    const x1 = tableau[i + 1][0]
    const y1 = tableau[i + 1][1]
    const f = (x) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
    let depart, fin
    xmin > x0 ? (depart = xmin) : (depart = x0)
    xmax < x1 ? (fin = xmax) : (fin = x1)
    const c = courbe(f, depart, fin, color, epaisseur, r)
    mesCourbes.push(c)
    this.svg = function (coeff) {
      let code = ''
      for (const objet of mesCourbes) {
        code += '\n\t' + objet.svg(coeff)
      }
      return code
    }
    this.tikz = function () {
      let code = ''
      for (const objet of mesCourbes) {
        code += '\n\t' + objet.tikz()
      }
      return code
    }
  }
}
/**
 *
 * @param {array} tableau de coordonnées [x,y]
 * @param {string} couleur
 * @param {number} epaisseur
 * @param {objet} repere (ou tableau [xscale,yscale])
 * @param {number} xmin
 * @param {number} xmax
 *
 * @author Rémi Angot
 */
export function courbeInterpolee (...args) {
  return new CourbeInterpolee(...args)
}

function GraphiqueInterpole (
  tableau, {
    color = 'black',
    epaisseur = 1,
    repere = {},
    step = 0.2
  } = {}

) {
  ObjetMathalea2D.call(this)
  const mesCourbes = []
  for (let i = 0; i < tableau.length - 1; i++) {
    const x0 = tableau[i][0]
    const y0 = tableau[i][1]
    const x1 = tableau[i + 1][0]
    const y1 = tableau[i + 1][1]
    const f = (x) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
    let depart, fin
    repere.xMin > x0 ? (depart = repere.xMin) : (depart = x0)
    repere.xMax < x1 ? (fin = repere.xMax) : (fin = x1)
    const c = courbe2(f, { step: step, xMin: depart, xMax: fin, color: color, epaisseur: epaisseur, xUnite: repere.xUnite, yUnite: repere.yUnite, yMin: repere.yMin, yMax: repere.yMax })
    mesCourbes.push(c)
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of mesCourbes) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of mesCourbes) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}
/**
 *
 *
 * @author Rémi Angot
 */
export function graphiqueInterpole (...args) {
  return new GraphiqueInterpole(...args)
}
export function imageInterpolee (tableau, antecedent) {
  const x0 = tableau[0][0]
  const y0 = tableau[0][1]
  const x1 = tableau[1][0]
  const y1 = tableau[1][1]
  const f = (x) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
  return f(antecedent)
}

export function antecedentInterpole (tableau, image) {
  const x0 = tableau[0][0]
  const y0 = tableau[0][1]
  const x1 = tableau[1][0]
  const y1 = tableau[1][1]
  const f = (x) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
  return AntecedentParDichotomie(x0, x1, f, image, 0.01)
}

function AntecedentParDichotomie (xmin, xmax, f, y, precision = 0.01) {
  let xmoy, ymoy
  if (xmin > xmax) {
    xmoy = xmin
    xmin = xmax
    xmax = xmoy
  }
  xmoy = (xmax + xmin) / 2
  ymoy = f(xmoy)
  while (Math.abs(ymoy - y) > precision) {
    if (f(xmin) < f(xmax)) {
      if (ymoy > y) { xmax = xmoy } else { xmin = xmoy }
    } else
    if (ymoy > y) { xmin = xmoy } else { xmax = xmoy }
    xmoy = (xmin + xmax) / 2
    ymoy = f(xmoy)
  }
  return xmoy
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%% LES INTERVALLES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function CrochetD (A, color = 'blue') {
  ObjetMathalea2D.call(this)
  this.epaisseur = 2
  this.color = colorToLatexOrHTML(color)
  this.taille = 0.2
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }
    let code = `<polyline points="${A.xSVG(coeff) + this.taille * 20},${A.ySVG(coeff) +
      2 * this.taille * 20 / coeff * coeff
    } ${A.xSVG(coeff)},${A.ySVG(coeff) + 2 * this.taille * 20} ${A.xSVG(coeff)},${A.ySVG(coeff) +
      -2 * this.taille * 20
    } ${A.xSVG(coeff) + this.taille * 20},${A.ySVG(coeff) +
      -2 * this.taille * 20
    }" fill="none" stroke="${this.color[0]}" ${this.style} />`
    code += `\n\t<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff) +
      this.taille * 20 * 5
      }" text-anchor="middle" dominant-baseline="central" fill="${this.color[0]}">${A.nom
      }</text>\n `
    return code
  }
  this.tikz = function () {
    let code = `\\draw[very thick,color=${this.color[1]}] (${A.x + this.taille / context.scale},${A.y + this.taille / context.scale})--(${A.x
      },${A.y + this.taille / context.scale})--(${A.x},${A.y - this.taille / context.scale})--(${A.x + this.taille / context.scale},${A.y - this.taille / context.scale});`
    code += `\n\t\\draw[color=${this.color[1]}] (${A.x},${A.y - this.taille / context.scale}) node[below] {$${A.nom}$};`
    return code
  }
}
export function crochetD (...args) {
  return new CrochetD(...args)
}

function CrochetG (A, color = 'blue') {
  ObjetMathalea2D.call(this)
  this.epaisseur = 2
  this.color = colorToLatexOrHTML(color)
  this.taille = 0.2

  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.pointilles) {
      switch (this.pointilles) {
        case 1:
          this.style += ' stroke-dasharray="6 10" '
          break
        case 2:
          this.style += ' stroke-dasharray="6 3" '
          break
        case 3:
          this.style += ' stroke-dasharray="3 2 6 2 " '
          break
        case 4:
          this.style += ' stroke-dasharray="1 2" '
          break
        default:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
    }
    let code = `<polyline points="${A.xSVG(coeff) - this.taille * 20},${A.ySVG(coeff) +
      2 * this.taille * 20
    } ${A.xSVG(coeff)},${A.ySVG(coeff) + 2 * this.taille * 20} ${A.xSVG(coeff)},${A.ySVG(coeff) -
      2 * this.taille * 20
    } ${A.xSVG(coeff) - this.taille * 20},${A.ySVG(coeff) -
      2 * this.taille * 20
    }" fill="none" stroke="${this.color[0]}" ${this.style} />`
    code += `\n\t<text x="${A.xSVG(coeff)}" y="${A.ySVG(coeff) +
      5 * this.taille * 20
      }" text-anchor="middle" dominant-baseline="central" fill="${this.color[0]}">${A.nom
      }</text>\n `
    return code
  }
  this.tikz = function () {
    let code = `\\draw[very thick,color=${this.color[1]}] (${A.x - this.taille / context.scale},${A.y + this.taille / context.scale})--(${A.x
      },${A.y + this.taille / context.scale})--(${A.x},${A.y - this.taille / context.scale})--(${A.x - this.taille / context.scale},${A.y - this.taille / context.scale});`
    code += `\n\t\\draw[color=${this.color[1]}] (${A.x},${A.y - this.taille / context.scale}) node[below] {$${A.nom}$};`
    return code
  }
}
export function crochetG (...args) {
  return new CrochetG(...args)
}

export function intervalle (A, B, color = 'blue', h = 0) {
  const A1 = point(A.x, A.y + h)
  const B1 = point(B.x, B.y + h)
  const s = segment(A1, B1, color)
  // s.styleExtremites = '->'

  s.epaisseur = 3
  return s
}

/**
 * convertHexToRGB convertit une couleur en héxadécimal (sans le #) en un tableau RVB avec des valeurs entre 0 et 255.
 * @example convertHexToRGB('f15929')=[241,89,41]
 * @author Eric Elter
 */

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
 * @example colorToLatexOrHTML('red')=['red','{red}']
 * @example colorToLatexOrHTML('#f15929')=['#f15929','{rgb,255:red,241;green,89;blue,41}']
 * @author Eric Elter
 */

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
%%%%%%%%%%%%%% LES TEXTES %%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * texteParPoint('mon texte',A) // Écrit 'mon texte' avec A au centre du texte
 * texteParPoint('mon texte',A,'gauche') // Écrit 'mon texte' à gauche de A (qui sera la fin du texte)
 * texteParPoint('mon texte',A,'droite') // Écrit 'mon texte' à droite de A (qui sera le début du texte)
 * texteParPoint('mon texte',A,45) // Écrit 'mon texte' centré sur A avec une rotation de 45°
 * Si mathOn est true, la chaine est traitée par texteParPoint mais avec une police se rapprochant de la police Katex (quelques soucis d'alignement des caractères sur certains navigateurs)
 * Si le texte commence et finit par des $ la chaine est traitée par latexParPoint
 * @author Rémi Angot
 */
function TexteParPoint (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false) {
  ObjetMathalea2D.call(this)
  this.color = colorToLatexOrHTML(color)
  this.contour = false
  this.taille = 10 * scale
  this.opacite = 1
  this.couleurDeRemplissage = this.color
  this.opaciteDeRemplissage = this.opacite
  this.bordures = [A.x - texte.length * 0.2, A.y - 0.4, A.x + texte.length * 0.2, A.y + 0.4]
  if (typeof texte !== 'string') {
    texte = String(texte)
  }
  if (texte.charAt(0) === '$') {
    A.positionLabel = 'above'
    this.svg = function (coeff) {
      return latexParPoint(texte.substr(1, texte.length - 2), A, this.color, texte.length * 8, 12, '', 6).svg(coeff)
    }
    this.tikz = function () {
      let code = ''
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y
          }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale}]`
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y}) ${anchor} {${texte}};`
      }
      return code
    }
  } else {
    this.svg = function (coeff) {
      let code = ''; let style = ''
      if (mathOn) style = ' font-family= "Book Antiqua"; font-style= "italic" '
      if (this.contour) style += ` style="font-size: ${this.taille}px;fill: ${this.couleurDeRemplissage[0]};fill-opacity: ${this.opaciteDeRemplissage};stroke: ${this.color[0]};stroke-width: 0.5px;stroke-linecap: butt;stroke-linejoin:miter;stroke-opacity: ${this.opacite}" `
      else style += ` style="font-size:${this.taille}px;fill:${this.color[0]};fill-opacity:${this.opacite};${this.gras ? 'font-weight:bolder' : ''}" `
      if (typeof (orientation) === 'number') {
        code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
        coeff
      )}" text-anchor = "${ancrageDeRotation}" dominant-baseline = "central" fill="${this.couleurDeRemplissage[0]
        }" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(
          coeff
        )})" id="${this.id}" >${texte}</text>\n `
      } else {
        switch (orientation) {
          case 'milieu':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="middle" dominant-baseline="central" fill="${this.couleurDeRemplissage[0]
            }" id="${this.id}" >${texte}</text>\n `
            break
          case 'gauche':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="end" dominant-baseline="central" fill="${this.couleurDeRemplissage[0]
            }" id="${this.id}" >${texte}</text>\n `
            break
          case 'droite':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="start" dominant-baseline="central" fill="${this.couleurDeRemplissage[0]
            }" id="${this.id}" >${texte}</text>\n `
            break
        }
      }
      return code
    }
    this.tikz = function () {
      let code = ''
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y
          }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale}]`
        }
        if (mathOn) {
          code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y}) ${anchor} {$${texte}$};`
        } else {
          code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y}) ${anchor} {${texte}};`
        }
      }
      return code
    }
  }
}
export function texteParPoint (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false) {
  return new TexteParPoint(texte, A, orientation, color, scale, ancrageDeRotation, mathOn)
}

function TexteParPointEchelle (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false, scaleFigure) {
  ObjetMathalea2D.call(this)
  this.color = colorToLatexOrHTML(color)
  this.contour = false
  this.taille = 10 * scale
  this.opacite = 1
  this.couleurDeRemplissage = colorToLatexOrHTML(color)
  this.opaciteDeRemplissage = this.opacite
  this.bordures = [A.x - texte.length * 0.2, A.y - 0.4, A.x + texte.length * 0.2, A.y + 0.4]
  if (texte.charAt(0) === '$') {
    this.svg = function (coeff) {
      return latexParPoint(texte.substr(1, texte.length - 2), A, this.color, texte.length * 8, 10, '', this.taille * 0.8).svg(coeff)
    }
    this.tikz = function () {
      let code = ''
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y
          }) node[anchor = ${anchor}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale * scaleFigure * 1.25}]`
        }
        code = `\\draw [color=${this.color[1]}] (${A.x},${A.y}) ${anchor} {${texte}};`
      }
      return code
    }
  } else {
    this.svg = function (coeff) {
      let code = ''; let style = ''
      if (mathOn) style = ' font-family= "Book Antiqua"; font-style= "italic" '
      if (this.contour) style += ` style="font-size: ${this.taille}px;fill: ${this.couleurDeRemplissage[0]};fill-opacity: ${this.opaciteDeRemplissage};stroke: ${this.color[0]};stroke-width: 0.5px;stroke-linecap: butt;stroke-linejoin:miter;stroke-opacity: ${this.opacite}" `
      else style += ` style="font-size:${this.taille}px;fill:${this.color[0]};fill-opacity:${this.opacite};${this.gras ? 'font-weight:bolder' : ''}" `
      if (typeof (orientation) === 'number') {
        code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
        coeff
      )}" text-anchor = "${ancrageDeRotation}" dominant-baseline = "central" fill="${this.color[0]
        }" transform="rotate(${orientation} ${A.xSVG(coeff)} ${A.ySVG(
          coeff
        )})" id="${this.id}" >${texte}</text>\n `
      } else {
        switch (orientation) {
          case 'milieu':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="middle" dominant-baseline="central" fill="${this.color[0]
            }" id="${this.id}" >${texte}</text>\n `
            break
          case 'gauche':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="end" dominant-baseline="central" fill="${this.color[0]
            }" id="${this.id}" >${texte}</text>\n `
            break
          case 'droite':
            code = `<text ${style} x="${A.xSVG(coeff)}" y="${A.ySVG(
            coeff
          )}" text-anchor="start" dominant-baseline="central" fill="${this.color[0]
            }" id="${this.id}" >${texte}</text>\n `
            break
        }
      }

      return code
    }
    this.tikz = function () {
      let code = ''
      if (mathOn) texte = '$' + texte + '$'
      if (typeof orientation === 'number') {
        let anchor = 'center'
        if (ancrageDeRotation === 'gauche') {
          anchor = 'west'
        }
        if (ancrageDeRotation === 'droite') {
          anchor = 'east'
        }
        code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y
        }) node[anchor = ${anchor},scale=${scale * scaleFigure * 1.25}, rotate = ${-orientation}] {${texte}};`
      } else {
        let anchor = ''
        if (orientation === 'gauche') {
          anchor = `node[anchor = east,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'droite') {
          anchor = `node[anchor = west,scale=${scale * scaleFigure * 1.25}]`
        }
        if (orientation === 'milieu') {
          anchor = `node[anchor = center,scale=${scale * scaleFigure * 1.25}]`
        }
        code = `\\draw [color=${this.color[1]},fill opacity = ${this.opacite}] (${A.x},${A.y}) ${anchor} {${texte}};`
      }
      return code
    }
  }
}
export function texteParPointEchelle (texte, A, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false, scaleFigure = 1) {
  return new TexteParPointEchelle(texte, A, orientation, color, scale, ancrageDeRotation, mathOn, scaleFigure)
}
export function texteParPositionEchelle (texte, x, y, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false, scaleFigure = 1) {
  return texteParPointEchelle(texte, point(x, y, '', 'center'), orientation, color, scale, ancrageDeRotation, mathOn, scaleFigure)
}
/**
 * texteParPosition('mon texte',x,y) // Écrit 'mon texte' avec le point de coordonnées (x,y) au centre du texte.
 *
 * texteParPosition('mon texte',x,y,'gauche') // Écrit 'mon texte' à gauche du point de coordonnées (x,y) (qui sera la fin du texte)
 *
 * texteParPosition('mon texte',x,y,'droite') // Écrit 'mon texte' à droite du point de coordonnées (x,y) (qui sera le début du texte)
 *
 * texteParPosition('mon texte',x,y,45) // Écrit 'mon texte'  centré sur le point de coordonnées (x,y) avec une rotation de 45°
 *
 * @param {string} texte // Le texte qu'on veut afficher
 * @param {number} x // L'abscisse de la position initiale du texte
 * @param {number} y // L'ordonnée de la position initiale du texte
 * @param {string} orientation=['milieu'] // Angle d'orientation du texte ou bien 'milieu', gauche' ou 'droite'. Voir exemple
 * @param {string} [color='black'] // Couleur du texte
 * @param {number} [scale=1] // Echelle du texte.
 * @param {string} [ancrageDeRotation='middle'] // Choix parmi 'middle', 'start' ou 'end'. En cas d'orientation avec un angle, permet de savoir où est le centre de la rotation par rapport au texte.
 * @param {string} [mathOn=false] // Ecriture dans le style de Latex.
 *
 * @author Rémi Angot
 */
export function texteParPosition (texte, x, y, orientation = 'milieu', color = 'black', scale = 1, ancrageDeRotation = 'middle', mathOn = false) {
  return new TexteParPoint(texte, point(x, y), orientation, color, scale, ancrageDeRotation, mathOn)
}

/**
 * latexParPoint('\\dfrac{3}{5}',A,'black',12,20,"white") Ecrit la fraction 3/5 à l'emplacement du label du point A en noir, avec un fond blanc.
 * 12 est la largeur en pixels 20 la hauteur en pixels (utilisé à des fins de centrage). Pour un bon centrage sur A, il faut que A.positionLabel='center'.
 * si colorBackground="", le fond est transparent.
 * tailleCaracteres est à 8 par défaut et correspond à \footnotesize. tailleCaracteres va de 5 = \small à 20 = \huge
 * @author Rémi Angot
 */
export function latexParPoint (texte, A, color = 'black', largeur = 20, hauteur = 12, colorBackground = 'white', tailleCaracteres = 8) {
  let x; let y; const coeff = context.pixelsParCm
  const offset = 10 * Math.log10(tailleCaracteres)
  switch (A.positionLabel) {
    case 'above':
      x = A.x; y = A.y + offset / coeff
      break
    case 'below':
      x = A.x; y = A.y - offset / coeff
      break
    case 'left':
      x = A.x - offset / coeff; y = A.y
      break
    case 'right':
      x = A.x + offset / coeff; y = A.y
      break
    case 'above right':
      x = A.x + offset / coeff; y = A.y + offset / coeff
      break
    case 'above left':
      x = A.x - offset / coeff; y = A.y + offset / coeff
      break
    case 'below right':
      x = A.x + offset / coeff; y = A.y - offset / coeff
      break
    case 'below left':
      x = A.x - offset / coeff; y = A.y - offset / coeff
      break
    case 'center':
      x = A.x; y = A.y
      break
    default:
      x = A.x; y = A.y
      break
  }
  return latexParCoordonnees(texte, x, y, color, largeur, hauteur, colorBackground, tailleCaracteres)
}
/**
 * @param {String} texte Le code latex qui sera mis en mode math en ligne. Ex : '\\dfrac{4}{5}\\text{cm}'
 * @param {Number} x abscisse du point de centrage
 * @param {Number} y ordonnée du point de centrage
 * @param {String} [color] couleur
 * @param {Number} [largeur] Dimensions de la 'box' rectangulaire conteneur de la formule en pixels en considérant la taille de caractère 8='\footnotesize'
 * @param {Number} [hauteur] Idem pour la hauteur de la box. Prévoir 20 par exemple pour une fraction. Permet le centrage correct.
 * @param {String} [colorBackground] Couleur du fond de la box. Chaine vide pour un fond transparent.
 * @param {Number} [tailleCaracteres] Taille de la police utilisée de 5 = \small à 20=\huge... agit sur la box en en modifiant les paramètres hauteur et largeur
 */
function LatexParCoordonnees (texte, x, y, color, largeur, hauteur, colorBackground, tailleCaracteres) {
  ObjetMathalea2D.call(this)
  this.x = x
  this.y = y
  this.largeur = largeur * Math.log10(2 * tailleCaracteres)
  this.hauteur = hauteur * Math.log10(tailleCaracteres)
  this.colorBackground = colorToLatexOrHTML(colorBackground)
  this.color = colorToLatexOrHTML(color)
  this.texte = texte
  this.tailleCaracteres = tailleCaracteres
  this.bordures = [x - this.texte.length * 0.2, y - 0.02 * this.hauteur, x + this.texte.length * 0.2, y + 0.02 * this.hauteur]
  let taille
  if (this.tailleCaracteres > 19) taille = '\\huge'
  else if (this.tailleCaracteres > 16) taille = '\\LARGE'
  else if (this.tailleCaracteres > 13) taille = '\\Large'
  else if (this.tailleCaracteres > 11) taille = '\\large'
  else if (this.tailleCaracteres < 6) taille = '\\tiny'
  else if (this.tailleCaracteres < 8) taille = '\\scriptsize'
  else if (this.tailleCaracteres < 9) taille = '\\footnotesize'
  else if (this.tailleCaracteres < 10) taille = '\\small'
  else taille = '\\normalsize'
  this.svg = function (coeff) {
    const demiLargeur = this.largeur / 2
    const centrage = 0.4 * context.pixelsParCm * Math.log10(tailleCaracteres)
    if (this.colorBackground !== '') {
      return `<foreignObject style=" overflow: visible; line-height: 0;" x="${this.x * coeff - demiLargeur}" y="${-this.y * coeff - centrage - this.hauteur / 2}"  width="${this.largeur}" height="${this.hauteur}" id="${this.id}" ><div style="margin:auto;width:${this.largeur}px;height:${this.hauteur}px;position:fixed!important; text-align:center">
    $\\colorbox{${this.colorBackground[0]}}{$${taille} \\color{${this.color[0]}}{${this.texte}}$}$</div></foreignObject>`
    } else {
      return `<foreignObject style=" overflow: visible; line-height: 0;" x="${this.x * coeff - demiLargeur}" y="${-this.y * coeff - centrage - this.hauteur / 2}"  width="${this.largeur}" height="${this.hauteur}" id="${this.id}" ><div style="width:${this.largeur}px;height:${this.hauteur}px;position:fixed!important; text-align:center">
      $${taille} \\color{${this.color[0]}}{${this.texte}}$</div></foreignObject>`
    }
  }

  this.tikz = function () {
    let code
    if (this.colorBackground !== '') {
      code = `\\draw (${x},${y}) node[anchor = center] {\\colorbox{ ${colorBackground[1]}}{${taille}  $\\color${this.color[1]}{${texte}}$}};`
    } else {
      code = `\\draw (${x},${y}) node[anchor = center] {${taille} $\\color${this.color[1]}{${texte}}$};`
    };
    return code
  }
}

export function latexParCoordonnees (texte, x, y, color = 'black', largeur = 50, hauteurLigne = 20, colorBackground = 'white', tailleCaracteres = 8) {
  if (texte === '') return vide2d()
  else return new LatexParCoordonnees(texte, x, y, color, largeur, hauteurLigne, colorBackground, tailleCaracteres)
}

/**
 * Fonction dépréciée depuis que latexParCoordonnees() est au point.
 * x,y sont les coordonnées du début du trait de fraction, 0;0 par défaut
 * num et den sont les numérateurs et dénominateurs (1 et 2) par défaut
 * On peut changer la couleur (noir par défaut)
 * permet d'afficher une fraction à une position donnée en SVG et Latex
 * Les nombres ne sont pas en mode Maths
 *
 * @author Jean-Claude Lhote
 */

function FractionParPosition ({ x = 0, y = 0, fraction = { num: 1, den: 2 }, couleur = 'black' } = {}) {
  ObjetMathalea2D.call(this)
  const num = Math.abs(fraction.num)
  const den = Math.abs(fraction.den)
  const signe = fraction.signe
  const longueur = Math.max(Math.floor(Math.log10(num)) + 1, Math.floor(Math.log10(den)) + 1) * 10
  const offset = 10

  this.svg = function (coeff) {
    const s = segment(x - longueur / coeff / 2, y, x + longueur / coeff / 2, y, couleur)
    s.isVisible = false
    let code = s.svg(coeff)
    if (signe === -1) {
      code += segment(x - ((longueur + 15) / coeff / 2), y, x - ((longueur + 5) / coeff / 2), y, couleur).svg(coeff)
    }
    const t1 = texteParPosition(nombreAvecEspace(num), x, y + offset / coeff, 'milieu', couleur)
    code += t1.svg(coeff)
    const t2 = texteParPosition(nombreAvecEspace(den), x, y - offset / coeff, 'milieu', couleur)
    code += t2.svg(coeff)
    t1.isVisible = false
    t2.isVisible = false
    code = `<g id="${this.id}">${code}</g>`
    return code
  }

  this.tikz = function () {
    let code = segment(x, y, x + longueur / 30 / context.scale, y, couleur).tikz()
    if (signe === -1) {
      code += segment(x - ((longueur / 30 + 0.785) / context.scale / 2), y, x - ((longueur / 30 + 0.25) / context.scale / 2), y, couleur).tikz()
    }
    code += texteParPosition(nombreAvecEspace(num), x + longueur / 60 / context.scale, y + offset / 30 / context.scale, 'milieu', couleur).tikz()
    code += texteParPosition(nombreAvecEspace(den), x + longueur / 60 / context.scale, y - offset / 30 / context.scale, 'milieu', couleur).tikz()
    return code
  }
}

export function fractionParPosition (arg) {
  return new FractionParPosition(arg)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES FONCTIONS - CALCULS %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Renvoie la distance de A à B
 * @param {Point} A
 * @param {Point} B
 * @param {integer} [arrondi=2] Nombre de chiffres après la virgule. Facultatif, 2 par défaut.
 * @author Rémi Angot
 */
export function longueur (A, B, arrondi) {
  if (arrondi === undefined) {
    return Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)
  } else {
    return calcul(Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2), arrondi)
  }
}

/**
 * norme(V) renvoie la norme du vecteur
 *
 * @author Rémi Angot
 */
export function norme (v) {
  return Math.sqrt(v.x ** 2 + v.y ** 2)
}

/**
 * angle(A,O,B) renvoie l'angle AOB en degré
 *
 * @author Rémi Angot
 */
export function angle (A, O, B) {
  const OA = longueur(O, A)
  const OB = longueur(O, B)
  const AB = longueur(A, B)
  const v = vecteur(O, A)
  const w = vecteur(O, B)
  if (egal(v.x * w.y - v.y * w.x, 0)) { // vecteurs colinéaires à epsilon près pour éviter les effets de bords dus aux flottants.
    if (v.x * w.x > 0) return 0
    else if (v.x * w.x < 0) return 180
    else if (v.y * w.y > 0) return 0
    else return 180
  } else {
    return arrondi((Math.acos(arrondi((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 12)) * 180) / Math.PI, 2)
  }
}

/**
 * Retourne la valeur signée de l'angle AOB en degré.
 * @author Jean-Claude Lhote
 */
export function angleOriente (A, O, B) {
  const A2 = rotation(A, O, 90)
  const v = vecteur(O, B); const u = vecteur(O, A2)
  return arrondi(unSiPositifMoinsUnSinon(arrondi(v.x * u.x + v.y * u.y, 10)) * angle(A, O, B), 2)
}
/**
 * angleradian(A,O,B) renvoie l'angle AOB en radian
 *
 * @author Rémi Angot
 */
export function angleradian (A, O, B) {
  const OA = longueur(O, A)
  const OB = longueur(O, B)
  const AB = longueur(A, B)
  return calcul(Math.acos(arrondi((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 12)), 2)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES LUTINS %%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Parce que le 0 angulaire de Scratch est dirigé vers le Nord et qu'il croît dans le sens indirect
 * Et que le 0 angulaire de 2d est celui du cercle trigonométrique...
 * @param {number} x angle Scratch
 * @returns angle2d
 */
export function angleScratchTo2d (x) {
  let angle2d = 90 - x
  if (angle2d < -180) {
    angle2d += 360
  }
  return angleModulo(angle2d)
}
/**
 * Convertit un nombre de degrés quelconque en une mesure comprise entre -180 et 180
 * @param {number} a
 * @returns angle
 */
export function angleModulo (a) {
  if (a < -180) return a + 360
  else if (a > 180) return a - 360
  else return a
}

function ObjetLutin () {
  ObjetMathalea2D.call(this)
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
  this.color = 'black'
  this.epaisseur = 2
  this.pointilles = true
  this.opacite = 1
  this.style = ''
  this.animation = ''
  this.svg = function (coeff) {
    let code = ''
    for (const trace of this.listeTraces) {
      const A = point(trace[0], trace[1])
      const B = point(trace[2], trace[3])
      const color = trace[4]
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
      )}" x2="${B.xSVG(coeff)}" y2="${B.ySVG(coeff)}" stroke="${color}" ${style}  />`
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
 * Voir l'objet lutin pour la liste de ses attributs (lutin.x, lutin.y, lutin.orientation, ...)
 * @returns Instance d'un lutin
 */
export function creerLutin (...args) {
  return new ObjetLutin(...args)
}

/**
 * Fait avancer le lutin de d unités de lutin dans la direction de son orientation
 * @param {number} d
 * @param {objet} lutin
 */
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
 * @param {objet} lutin
 */
export function baisseCrayon (lutin = context.lutin) {
  lutin.crayonBaisse = true
}
/**
 * Fait sortir le lutin du mode "trace"
 * @param {objet} lutin
 */
export function leveCrayon (lutin = context.lutin) {
  lutin.crayonBaisse = false
}
/**
 * Fixe l'orientation du lutin à a degrés (au sens Mathalea2d=trigo)
 * Voire la fonction angleScratchTo2d(angle_scratch) pour la conversion
 * @param {number} a
 * @param {objet} lutin
 */
export function orienter (a, lutin = context.lutin) {
  lutin.orientation = angleModulo(a)
}
/**
 * Fait tourner de a degrés le lutin dans le sens direct
 * @param {number} a
 * @param {objet} lutin
 */
export function tournerG (a, lutin = context.lutin) {
  lutin.orientation = angleModulo(lutin.orientation + a)
}
/**
 * Fait tourner de a degrés le lutin dans le sens indirect
 * @param {number} a
 * @param {objet} lutin
 */
export function tournerD (a, lutin = context.lutin) {
  lutin.orientation = angleModulo(lutin.orientation - a)
}
/**
 * Déplace le lutin de sa position courante à (x;y)
 * @param {number} x
 * @param {number} y
 * @param {Objet} lutin
 */
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
 * @param {number} x
 * @param {Objet} lutin
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
 * @param {number} y
 * @param {Objet} lutin
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
 * @param {number} x
 * @param {Objet} lutin
 */
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
 * @param {number} y
 * @param {Objet} lutin
 */
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
 * fait "vibrer" le lutin tempo fois autour de sa position courante
 * @author Jean-Claude Lhote
 */
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
 * Traducteur scratch3 (Latex) -> scratchblocks
 * On lui passe une chaine de caractères contenant une série de commande Latex du package Latex Scratch3
 * Elle retourne une chaine de caractères contenant l'équivalent en langage scratchblocks si le contexte est isHtml !
 * Si le contexte est !isHtml alors elle retourne la chaine passée en argument.
 * http://mirrors.ctan.org/macros/latex/contrib/scratch3/scratch3-fr.pdf
 * https://scratchblocks.github.io
 * @author Jean-Claude Lhote.
 */

export function scratchblock (stringLatex) {
  const regex1 = /[\\{}]/
  const regex3 = /[[]<>]/
  const regex4 = /[{ ]/
  const litcommande = function (souschaine) {
    let extrait
    if (souschaine[0] === '}') {
      return '}'
    } else {
      extrait = souschaine.split(regex4)[0]
      return extrait
    }
  }

  /*****************************************************/
  /** ********* La fonction d'analyse récursive *********/
  /*****************************************************/
  const translatex = function (chaine, index, compteAccolades) {
    let resultat = []; let texte = []; let texte2 = []; let texte3 = []; let taille; let string; let fleche
    let compteur, debut // pour les boucles et les if
    const souschaine = chaine.substring(index)
    const commande = litcommande(souschaine)
    switch (commande.substring(0, 5)) {
      case '\\bloc':
        string = commande.split('{')[0]
        taille = string.length
        string = string.substring(6)
        compteAccolades++
        switch (string) {
          case 'stop':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`${texte[0]} ${texte2[0]} `, texte2[1], texte2[2]]
            break
          case 'move':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'variable':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'control':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'pen':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0] + ' :: pen', texte[1], texte[2]]
            break
          case 'list':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0] + ' :: list', texte[1], texte[2]]
            break
          case 'init':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'space\n':
            compteAccolades--
            resultat = ['\n', 11 + index, compteAccolades]
            break
          case 'if':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            texte3 = translatex(chaine, texte2[1], texte2[2])
            resultat = [`${texte[0]} ${texte2[0]} ${texte3[0]}`, texte3[1] + 1, texte3[2] - 1]
            compteAccolades = resultat[2]
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' fin'
            break

          case 'ifelse':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            texte3 = translatex(chaine, texte2[1], texte2[2])
            resultat = [`${texte[0]} ${texte2[0]} ${texte3[0]}`, texte3[1] + 1, texte3[2] - 1]
            compteAccolades = resultat[2]
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' sinon'
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' fin'
            break
          case 'repeat':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (texte[0].split(' ')[1] !== 'indéfiniment') {
              if (texte[0].split(' ')[1] !== "jusqu'à") {
                texte2 = translatex(chaine, texte[1], texte[2])
                texte3 = translatex(chaine, texte2[1], texte2[2])
                resultat = [`${texte[0]} ${texte2[0]} ${texte3[0]}`, texte3[1] + 1, texte3[2] - 1]
                compteAccolades = resultat[2]
              } else {
                texte2 = translatex(chaine, texte[1], texte[2])
                resultat = [`${texte[0]} ${texte2[0]} `, texte2[1] + 1, texte2[2] - 1]
                compteAccolades = resultat[2]
              }
            } else {
              resultat = [`${texte[0]} `, texte[1] + 1, texte[2] - 1]
              compteAccolades = resultat[2]
            }
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' fin'
            break
          default:
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
        }

        break
      case '\\oval':
        string = commande.split('{')[0]
        taille = string.length
        string = string.substring(5)
        compteAccolades++
        if (string.charAt(string.length - 1) === '*') {
          fleche = true
          string = string.substring(0, string.length - 1)
        } else fleche = false
        switch (string) {
          case 'num':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (isNaN(texte[0]) && texte[0].indexOf(regex3)) {
              resultat = [`[${texte[0]}]`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]})`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'moreblocks':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v)`, texte[1], texte[2]]
            } else {
              resultat = [`(${texte[0]})`, texte[1], texte[2]]
            }
            break
          case 'variable':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]})`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'sound':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v :: sound)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]} :: sound)`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'sensing':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v :: sensing)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]} :: sensing)`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'operator':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`(${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ')'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break

          default:
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]})`, texte[1] + 1, texte[2] - 1]
            }
            break
        }

        break
      case '\\bool':
        string = commande.split(/\{ /)[0]
        taille = string.length
        string = string.substring(5, 9)
        switch (string) {
          case 'oper':
            compteAccolades++
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`<${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ' :: operators boolean>'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break
          case 'empt':
            resultat = ['< vide :: operators boolean>', index + taille + 1, compteAccolades]
            break
          case 'sens':
            compteAccolades++
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`<${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ' :: sensing>'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break
          case 'list':
            compteAccolades++
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`<${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ' :: list>'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break
          default:
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [`<${texte[0]}>`, texte[1], texte[2]]
            break
        }
        break
      case '\\init':
        string = commande.split('{')[0]
        taille = string.length
        compteAccolades++
        texte = translatex(chaine, index + taille + 1, compteAccolades)
        texte2 = translatex(chaine, texte[1], texte[2])
        resultat = [`${texte[0]} ${texte2[0]} `, texte2[1], texte2[2]]
        break
      case '\\name':
        string = commande.split('{')[0]
        taille = string.length
        compteAccolades++
        texte = translatex(chaine, index + taille + 1, compteAccolades)
        texte2 = translatex(chaine, texte[1], texte[2])
        resultat = [`${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
        while (chaine.charAt(texte2[1]) !== '}') {
          texte2 = translatex(chaine, texte2[1], texte2[2])
          resultat[0] += ' ' + texte2[0]
        }
        resultat[1] = texte2[1] + 1
        resultat[2] = texte2[2] - 1
        break
      default:
        switch (commande) {
          case '}':
            compteAccolades--
            resultat = [' ', 1 + index, compteAccolades]
            break
          case '\\begin':
            compteAccolades++
            if (chaine.substring(15 + index)[0] === '[') {
              index = chaine.substring(15 + index).indexOf(']') + 16 + index
            } else {
              index += 15
            }
            resultat = [' <!-- Code Scratch  -->', index, compteAccolades]
            break
          case '\\end':
            compteAccolades--
            resultat = [' <!-- Fin du Code Scratch  -->\n', 13 + index, compteAccolades]
            break
          case '\\turnleft':
            resultat = ['gauche ', 11 + index, compteAccolades]
            break
          case '\\turnright':
            resultat = ['droite ', 12 + index, compteAccolades]
            break
          case '\\greenflag':
            resultat = [' @greenFlag ', 10 + index, compteAccolades]
            break
          case '\\selectmenu':
            compteAccolades++
            texte = translatex(chaine, 12 + index, compteAccolades)
            resultat = [`[${texte[0]} v]`, texte[1] + 1, texte[2] - 1]
            break
          default:
            string = chaine.substring(index).split(regex1)[0]
            resultat = [string, string.length + index, compteAccolades]
            break
        }
        break
    }
    return resultat
  }
  /*********************************************/
  /** *********** Fin de translatex *************/
  /*********************************************/

  // boucle pricipale de scratchblock2
  let codeScratch = ''
  let fin; let result = []; let index
  let compteur = 0
  if (!((stringLatex.match(/\{/g) || []).length === (stringLatex.match(/\}/g) || []).length)) {
    console.log("Il n'y a pas le même nombre de { que de }. Je préfère m'arrêter.")
    return false
  }
  if (!context.isHtml) {
    codeScratch = stringLatex
  } else {
    codeScratch = '<pre class=\'blocks\'>'
    index = 0
    fin = false
    while (!fin) {
      result = translatex(stringLatex, index, compteur)
      codeScratch += result[0]
      index = result[1]
      compteur = result[2]
      if (compteur === 0) fin = true
    }
    codeScratch += '</pre>\n'
  }
  return codeScratch
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%% LES INSTRUMENTS %%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Afficher le SVG d'un crayon avec la mine sur le point A
 *
 * @param {point} A
 *
 *
 *
 */
function AfficherCrayon (A) {
  ObjetMathalea2D.call(this)
  this.x = A.x
  this.y = A.y
  this.svg = function () {
    const code = `<g id="${this.id}" stroke="#000000" fill="none" transform="translate(${(this.x - 0.2) * context.pixelsParCm},${-60 - (this.y - 0.2) * context.pixelsParCm}) scale(.1) ">
   <path id="rect2990" d="m70.064 422.35 374.27-374.26 107.58 107.58-374.26 374.27-129.56 21.97z" stroke-width="30"/>
   <path id="path3771" d="m70.569 417.81 110.61 110.61" stroke-width="25"/>
   <path id="path3777" d="m491.47 108.37-366.69 366.68" stroke-width="25"/>
   <path id="path3763" d="m54.222 507.26 40.975 39.546" stroke-width="25"/>
  </g>`
    return code
  }
}

export function afficherCrayon (...args) {
  return new AfficherCrayon(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES FONCTIONS - FORMATAGE %%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

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
 */

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
    // code += codeSvg(...objets);
    for (const objet of objets) {
      if (Array.isArray(objet)) {
        for (let i = 0; i < objet.length; i++) {
          try {
            if (objet[i].isVisible) {
              if ((!mainlevee) || typeof (objet[i].svgml) === 'undefined') code += '\t' + objet[i].svg(pixelsParCm) + '\n'
              else { code += '\t' + objet[i].svgml(pixelsParCm, amplitude) + '\n' }
            }
          } catch (error) { }// console.log('premiere boucle', error.message, objet[i], i) }
        }
      }
      try {
        if (objet.isVisible) {
          if ((!mainlevee) || typeof (objet.svgml) === 'undefined') code += '\t' + objet.svg(pixelsParCm) + '\n'
          else { code += '\t' + objet.svgml(pixelsParCm, amplitude) + '\n' }
        }
      } catch (error) { console.log('le try tout seul', error.message, objet) }
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
/**
 *
 * @param {number} index Choix du motif
 * le nom du motif sert dans la fonction pattern
 * @author Jean-Claude Lhote
 */
export function motifs (index) {
  switch (index) {
    case 0: return 'north east lines'
    case 1: return 'horizontal lines'
    case 2: return 'vertical lines'
    case 3: return 'dots'
    case 4: return 'crosshatch dots'
    case 5: return 'fivepointed stars'
    case 6: return 'sixpointed stars'
    case 7: return 'bricks'
    case 8: return 'checkerboard'
    case 9: return 'grid'
    case 10: return 'crosshatch'
    default: return 'north east lines'
  }
}
/**
 *
 * @param {object} param0 paramètres de définition du motif de remplissage
 * définit un motif de remplissage pour les polygones, les rectangles... ou tout élément SVG qui se remplit.
 * @author Jean-Claude Lhote
 */
function pattern ({
  motif = 'north east lines',
  id,
  distanceDesHachures = 10,
  epaisseurDesHachures = 1,
  couleurDesHachures = 'black',
  couleurDeRemplissage = 'none',
  opaciteDeRemplissage = 0.5
}) {
  let myPattern = ''
  if (context.isHtml) {
    if (couleurDeRemplissage.length < 1) {
      couleurDeRemplissage = 'none'
    }
    switch (motif) {
      case 'north east lines':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <line x1="0" y1="0" x2="0" y2="${distanceDesHachures}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
            </pattern>`
        break
      case 'horizontal lines':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <line x1="0" y1="${distanceDesHachures / 2}" x2="${distanceDesHachures}" y2="${distanceDesHachures / 2}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
            </pattern>`
        break
      case 'vertical lines':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <line x1="0" y1="0" x2="0" y2="${distanceDesHachures}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
            </pattern>`
        break
      case 'dots':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="8" cy="3" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="3" cy="8" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="8" cy="8" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            </pattern>`
        break
      case 'crosshatch dots':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="12" y="12" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="8" cy="2" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="5" cy="5" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="2" cy="8" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="8" cy="8" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="5" cy="11" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="11" cy="5" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="11" cy="11" r="1.5" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
          </pattern>`
        break
      case 'fivepointed stars':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polygon points="10,5 6.2,4.2 6.6,0.2 4.6,3.6 1,2 3.6,5 1,8 4.6,6.4 6.6,9.8 6.2,5.8 " stroke="${couleurDesHachures}"  fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
          </pattern>`
        break
      case 'sixpointed stars':
        myPattern += `<pattern id="pattern${id}"  width="12" height="12" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
        <polygon points="10,5 7.6,3.4 7.6,0.6 5,2 2.6,0.6 2.4,3.4 0,5 2.4,6.4 2.6,9.4 5,8 7.6,9.4 7.6,6.4 " stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
        </pattern>`
        break
      case 'crosshatch':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polygon points="2,2 7.6,7.6 7,8.4 9.8,8.4 9.8,5.6 9,6.2 3.4,0.6 " stroke="${couleurDesHachures}"  fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
          </pattern>`
        break
      case 'bricks':
        myPattern += `<pattern id="pattern${id}" width="18" height="16" x="18" y="16" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <line x1="4" y1="2" x2="4" y2="4" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"  />
          <line x1="0" y1="4" x2="16" y2="4" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          <line x1="14" y1="4" x2="14" y2="12" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          <line x1="16" y1="12" x2="0" y2="12" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          <line x1="4" y1="12" x2="4" y2="16" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          </pattern>`
        break
      case 'grid':
        myPattern += `<pattern id="pattern${id}" width="10" height="10" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polyline points="8,8 0,8 0,0 " fill="none" stroke="${couleurDesHachures}" />
          </pattern>`
        break
      case 'checkerboard':
        myPattern += `<pattern id="pattern${id}" width="8" height="8" x="8" y="8" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polygon points="4,4 8,4 8,0 4,0 "  fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
          <polygon points="0,4 4,4 4,8 0,8 "  fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
        
          </pattern>`
        break
      default:
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
        <line x1="0" y1="0" x2="0" y2="${distanceDesHachures}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
        </pattern>`
        break
    }
    return myPattern
  } else if (context.sortieNB) {
    switch (motif) {
      case 'north east lines':
        myPattern = `pattern = ${motif}`
        break
      case 'horizontal lines':
        myPattern = `pattern = ${motif}`
        break
      case 'vertical lines':
        myPattern = `pattern = ${motif}`
        break
      case 'dots':
        myPattern = `pattern = ${motif}`
        break
      case 'crosshatch dots':
        myPattern = `pattern = ${motif}`
        break
      case 'fivepointed stars':
        myPattern = `pattern = ${motif}`
        break
      case 'sixpointed stars':
        myPattern = `pattern = ${motif}`
        break
      case 'crosshatch':
        myPattern = `pattern = ${motif}`
        break
      case 'bricks':
        myPattern = `pattern = ${motif}`
        break
      case 'grid':
        myPattern = `pattern = ${motif}`
        break
      case 'checkerboard':
        myPattern = `pattern = ${motif}`
        break
      default:
        myPattern = 'pattern = north east lines'
        break
    }
    return myPattern
  } else { // Sortie Latex
    switch (motif) {
      case 'north east lines':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'horizontal lines':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'vertical lines':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'dots':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'crosshatch dots':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'fivepointed stars':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'sixpointed stars':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'crosshatch':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'bricks':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'grid':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'checkerboard':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      default:
        myPattern = `pattern color = ${couleurDesHachures} , pattern = north east lines`
        break
    }
    return `${myPattern}`
  }
}
/**
 * Fonction créant un labyrinthe de nombres
 * Le tableau de nombres doit être de format [6][3]
 * Le niveau doit être un entier entre 1 et 6 inclus
 * @author Jean-Claude Lhote
 * Publié le 6/12/2020
 */
function Labyrinthe (
  {
    taille = 1,
    format = 'texte'
  }
) {
  this.murs2d = []
  this.chemin2d = []
  this.nombres2d = []
  this.chemin = []
  this.niveau = 3
  this.nombres = [[]]
  const couleur = 'brown'
  const chemins = [
    [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [5, 1], [6, 1]],
    [[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [5, 1], [6, 1]],
    [[1, 0], [2, 0], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
    [[1, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
    [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [6, 2]],
    [[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [5, 1], [5, 2], [6, 2]],
    [[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [5, 2], [6, 2]],
    [[1, 0], [2, 0], [3, 0], [3, 1], [4, 1], [5, 1], [5, 2], [6, 2]],
    [[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [6, 2]],
    [[1, 0], [2, 0], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2], [6, 2]],
    [[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
    [[1, 0], [1, 1], [2, 1], [3, 1], [4, 1], [4, 0], [5, 0], [6, 0]],
    [[1, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [6, 2]],
    [[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
    [[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [5, 2], [5, 1], [6, 1]],
    [[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [5, 1], [6, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [4, 1], [5, 1], [6, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [5, 1], [6, 1]],
    [[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [5, 2], [5, 1], [5, 0], [6, 0]],
    [[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [4, 1], [4, 0], [5, 0], [6, 0]],
    [[1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [4, 2], [5, 2], [5, 1], [5, 0], [6, 0]],
    [[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [4, 0], [5, 0], [6, 0]],
    [[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [6, 2]],
    [[1, 0], [1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [6, 2]]]
  let elementchemin
  for (let i = 0; i < 24; i++) { // on double le nombre de chemins par Symétrie.
    elementchemin = []
    for (let j = 0; j < chemins[i].length; j++) {
      elementchemin.push([chemins[i][j][0], 2 - chemins[i][j][1]])
    }
    chemins.push(elementchemin)
  }
  this.choisitChemin = function (niveau) { // retourne un chemin en fonction du niveau
    const choix = choice([0, 24]); let choixchemin
    switch (niveau) { // on choisit le chemin parmi les 23*2
      case 1: choixchemin = randint(0, 3) + choix
        break
      case 2: choixchemin = randint(4, 13) + choix
        break
      case 3: choixchemin = randint(14, 17) + choix
        break
      case 4: choixchemin = randint(18, 21) + choix
        break
      case 5: choixchemin = randint(22, 23) + choix
        break
      case 6: choixchemin = randint(0, 23) + choix
        break
    }
    return chemins[choixchemin]
  }

  // Retourne le tableau d'objets des murs en fonction du point d'entrée de chemin
  this.construitMurs = function (chemin) {
    let choix; const objets = []; let s1; let s2; let s3; let s4; let s5
    if (chemin[0][1] === 0) choix = 0
    else choix = 2
    for (let i = 0; i < 6; i++) {
      // éléments symétriques pour A et B
      if (choix === 0) {
        // T inférieurs
        s1 = segment(point(i * 3, 1), point(i * 3, 2))
        s1.epaisseur = 2
        // s1.styleExtremites = '-'
        objets.push(s1)

        // T supérieurs
        if (i > 0) {
          s2 = segment(point(i * 3, 10), point(i * 3, 9))
          s2.epaisseur = 2
          // s2.styleExtremites = '-|'
          objets.push(s2)
        }
      } else {
        // T supérieurs
        s1 = segment(point(i * 3, 10), point(i * 3, 9))
        s1.epaisseur = 2
        // s1.styleExtremites = '-|'
        objets.push(s1)

        // T inférieurs
        if (i > 0) {
          s2 = segment(point(i * 3, 1), point(i * 3, 2))
          s2.epaisseur = 2
          // s2.styleExtremites = '-|'
          objets.push(s2)
        }
      }
    }
    if (choix === 0) { // éléments uniques symétriques
      // bord gauche
      s1 = segment(point(0, 10), point(0, 3))
      s1.epaisseur = 3
      // s1.styleExtremites = '-|'
      objets.push(s1)
      // case départ
      s1 = segment(point(-3, 1), point(0, 1), 'green')
      s1.epaisseur = 3
      objets.push(s1)
      s1 = segment(point(-3, 1), point(-3, 4), 'green')
      s1.epaisseur = 3
      objets.push(s1)
      s1 = segment(point(-3, 4), point(0, 4), 'green')
      s1.epaisseur = 3
      objets.push(s1)
      objets.push(texteParPoint('Départ', point(-1.5, 2.5), 'milieu', 'blue', taille, 0, false))
    } else {
      // bord gauche
      s1 = segment(point(0, 1), point(0, 8))
      s1.epaisseur = 3
      // s1.styleExtremites = '-|'
      objets.push(s1)
      // case départ
      s1 = segment(point(-3, 10), point(0, 10), 'green')
      s1.epaisseur = 3
      objets.push(s1)
      s1 = segment(point(-3, 7), point(-3, 10), 'green')
      s1.epaisseur = 3
      objets.push(s1)
      s1 = segment(point(-3, 7), point(0, 7), 'green')
      s1.epaisseur = 3
      objets.push(s1)
      objets.push(texteParPoint('Départ', point(-1.5, 8.5), 'milieu', 'blue', taille, 0, false))
    }

    // les croix centrales communes à A et B
    for (let i = 1; i < 6; i++) {
      s1 = segment(point(i * 3, 8), point(i * 3, 6), 'black')
      s1.epaisseur = 2
      // s1.styleExtremites = '|-|'
      s2 = segment(point(i * 3 - 0.5, 7), point(i * 3 + 0.5, 7), 'black')
      s2.epaisseur = 2
      // s2.styleExtremites = '|-|'
      s3 = segment(point(i * 3, 5), point(i * 3, 3), 'black')
      s3.epaisseur = 2
      // s3.styleExtremites = '|-|'
      s4 = segment(point(i * 3 - 0.5, 4), point(i * 3 + 0.5, 4), 'black')
      s4.epaisseur = 2
      // s4.styleExtremites = '|-|'
      objets.push(s2, s3, s4, s1)
    }
    // le pourtour commun à A et B
    s1 = segment(point(18, 9), point(18, 10))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(0, 10), point(18, 10))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(18, 9), point(18, 10))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(18, 1), point(18, 2))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(0, 1), point(18, 1))
    s1.epaisseur = 3
    objets.push(s1)
    // les sorties communes à A et B
    for (let i = 0; i < 2; i++) {
      s1 = segment(point(18, 6 - i * 3), point(20, 6 - i * 3))
      s1.epaisseur = 3
      // s1.styleExtremites = '-|'
      s2 = segment(point(18, 7 - i * 3), point(17, 7 - i * 3))
      s2.epaisseur = 3
      // s2.styleExtremites = '-|'
      s3 = segment(point(18, 8 - i * 3), point(20, 8 - i * 3))
      s3.epaisseur = 3
      // s3.styleExtremites = '-|'
      s4 = segment(point(18, 8 - i * 3), point(18, 6 - i * 3))
      s4.epaisseur = 3
      s5 = segment(point(0, 7 - i * 3), point(1, 7 - i * 3))
      s5.epaisseur = 3
      // s5.styleExtremites = '-|'
      objets.push(s1, s2, s3, s4, s5)
    }
    for (let i = 1; i <= 3; i++) {
      objets.push(texteParPoint(`Sortie ${i}`, point(19.5, 11.5 - 3 * i), 'milieu', 'blue', taille, 0, false))
    }
    s1 = segment(point(18, 9), point(20, 9))
    s1.epaisseur = 3
    // s1.styleExtremites = '-|'
    s2 = segment(point(18, 2), point(20, 2))
    s2.epaisseur = 3
    // s2.styleExtremites = '-|'
    objets.push(s1, s2)
    return objets
  }

  // Retourne le tableau d'objets du chemin
  this.traceChemin = function (monchemin) {
    let y = monchemin[0][1]
    let x = 0; const chemin2d = []; let s1
    for (let j = 0; j < monchemin.length; j++) {
      s1 = segment(point(x * 3 - 1.5, y * 3 + 2.5), point(monchemin[j][0] * 3 - 1.5, monchemin[j][1] * 3 + 2.5), couleur)
      s1.pointilles = true
      s1.stylePointilles = 2
      s1.epaisseur = 5
      s1.opacite = 0.3
      chemin2d.push(s1)
      x = monchemin[j][0]
      y = monchemin[j][1]
    }
    s1 = segment(point(x * 3 - 1.5, y * 3 + 2.5), point(x * 3 + 1.5, y * 3 + 2.5), couleur)
    s1.pointilles = true
    s1.stylePointilles = 2
    s1.epaisseur = 5
    s1.opacite = 0.3
    chemin2d.push(s1)
    return chemin2d
  }
  // Retourne le tableau d'objets des nombres
  this.placeNombres = function (nombres, taille) {
    const objets = []
    for (let a = 1; a < 7; a++) {
      for (let b = 0; b < 3; b++) {
        if (typeof (nombres[a - 1][b]) === 'number') {
          objets.push(texteParPoint(nombreAvecEspace(nombres[a - 1][b]), point(-1.5 + a * 3, 2.5 + b * 3), 'milieu', 'black', taille, 0, true))
        } else if (typeof (nombres[a - 1][b]) === 'string') { // écriture mode Maths
          objets.push(texteParPosition(nombres[a - 1][b], -1.5 + a * 3, 2.5 + b * 3, 'milieu', 'black', taille, 0, true))
        } else {
          objets.push(fractionParPosition({ x: -1.5 + a * 3, y: 2.5 + b * 3, fraction: nombres[a - 1][b] }))
        }
      }
    }
    return objets
  }
} // fin de la classe labyrinthe
export function labyrinthe ({ taille = 1, format = 'texte' } = {}) {
  return new Labyrinthe({ taille, format })
}

/**
 * Classe Pavage : permet de créer des pavages de polygones en un tour de main et de manipuler les polygones qu'il contient
 * @author Jean-Claude Lhote
 * publié le 10/12/2020
 */
function Pavage () {
  this.type = 1
  this.polygones = []
  this.barycentres = []
  this.tracesCentres = []
  this.numeros = []
  this.coordonnees = []
  this.Nx = 1
  this.Ny = 1
  this.echelle = 20
  this.fenetre = {}

  this.construit = function (type = 1, Nx = 1, Ny = 1, taille = 3) {
    const nettoieObjets = function (objets) {
      let barywhite, baryblack // c'est drôle non ?
      for (let i = 0; i < objets.length; i++) {
        barywhite = barycentre(objets[i])
        for (let j = i + 1; j < objets.length;) {
          baryblack = barycentre(objets[j])
          if (egal(barywhite.x, baryblack.x, 0.1) && egal(barywhite.y, baryblack.y, 0.1)) {
            objets.splice(j, 1)
          } else j++
        }
      }
    }
    let A; let B; let v; let w; let C; let D; let XMIN = 0; let YMIN = 0; let XMAX = 0; let YMAX = 0; let P1; let P2; let P3; let P4; let P5; let P6; let P7; let P8; let P9; let P10; let P11; let P12
    A = point(0, 0)
    B = point(taille, 0)
    switch (type) {
      case 1: // triangles équilatéraux
        v = vecteur(A, B)
        w = rotation(v, A, -90)
        w = homothetie(w, A, 1.73205)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            P1 = polygoneRegulier(A, B, 3)
            P2 = rotation(P1, A, 60)
            P3 = rotation(P1, A, -60)
            P4 = rotation(P1, A, -120)
            this.polygones.push(P1, P2, P3, P4)
            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, v)
            B = translation(B, v)
          }
          A = translation(A, vecteur(-Nx * v.x, -2 * v.y))
          B = translation(B, vecteur(-Nx * v.x, -2 * v.y))
          A = translation(A, w)
          B = translation(B, w)
        }
        break

      case 2: // carrés
        v = vecteur(A, B)
        v = homothetie(v, A, 2)
        w = rotation(v, A, -90)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            P1 = polygoneRegulier(A, B, 4)
            P2 = rotation(P1, A, 90)
            P3 = rotation(P1, A, -90)
            P4 = rotation(P1, A, -180)
            this.polygones.push(P1, P2, P3, P4)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, v)
            B = translation(B, v)
          }
          A = translation(A, vecteur(-Nx * v.x, -2 * v.y))
          B = translation(B, vecteur(-Nx * v.x, -2 * v.y))
          A = translation(A, w)
          B = translation(B, w)
        }
        break

      case 3: // hexagones
        B = homothetie(B, A, 0.8)
        v = vecteur(A, B)
        v = homothetie(v, A, 2)
        w = rotation(v, A, -90)
        w = homothetie(w, A, 1.73205)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = similitude(B, A, 30, 1.1547)
            P1 = polygoneRegulier(A, C, 6)
            P2 = rotation(P1, A, -120)
            P3 = translation(P1, v)
            P4 = translation(P2, v)
            this.polygones.push(P1, P2, P3, P4)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, vecteur(2 * v.x, 0))
            B = translation(B, vecteur(2 * v.x, 0))
          }
          A = translation(A, vecteur(-Nx * 2 * v.x, w.y))
          B = translation(B, vecteur(-Nx * 2 * v.x, w.y))
        }
        break

      case 4: // Pavage 3².4.3.4
        v = vecteur(A, B)
        v = homothetie(v, A, 2.73205)
        w = rotation(v, A, -90)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(B, A, 60)
            P1 = polygoneRegulier(A, B, 3)
            P2 = rotation(P1, A, 150)
            P6 = rotation(P1, B, -150)
            P7 = rotation(P1, B, 60)
            P9 = rotation(P2, C, 150)
            P10 = rotation(P9, A, -60)
            P11 = rotation(P2, B, 60)
            P12 = rotation(P6, A, -60)
            P3 = polygoneRegulier(A, C, 4)
            P4 = polygoneRegulierIndirect(B, C, 4)
            P5 = rotation(P4, B, -150)
            P8 = rotation(P3, A, 150)

            this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P11.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }

            for (const p of P12.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P7.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P8.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P9.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P10.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, vecteur(v.x, 0))
            B = translation(B, vecteur(v.x, 0))
          }
          A = translation(A, vecteur(-Nx * v.x, w.y))
          B = translation(B, vecteur(-Nx * v.x, w.y))
        }
        break
      case 5: // 4.8²
        v = vecteur(A, B)
        v = homothetie(v, A, 2.4142)
        w = rotation(v, A, -90)

        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(A, B, -135)
            P1 = polygoneRegulier(A, B, 8)
            P2 = polygoneRegulierIndirect(A, B, 8)
            P3 = translation(P1, v)
            P4 = translation(P2, v)
            P5 = polygoneRegulierIndirect(B, C, 4)
            P6 = translation(P5, v)
            P7 = translation(P5, w)
            P8 = translation(P6, w)
            this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P7.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P8.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }

            A = translation(A, vecteur(2 * v.x, 0))
            B = translation(B, vecteur(2 * v.x, 0))
          }
          A = translation(A, vecteur(-Nx * 2 * v.x, 2 * w.y))
          B = translation(B, vecteur(-Nx * 2 * v.x, 2 * w.y))
        }
        break

      case 6: // Pavage hexagonal d'écolier
        v = vecteur(A, B)
        w = rotation(v, A, 60)
        v = vecteur(v.x + w.x, v.y + w.y) // v=AB+CB
        w = rotation(v, A, -60)

        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(A, B, 120)
            D = rotation(B, C, 60)
            P1 = polygone(A, B, C, D)
            P2 = rotation(P1, C, -60)
            P3 = rotation(P1, A, 60)
            P4 = translation(P2, v)
            P5 = translation(P1, v)
            P6 = translation(P3, v)
            P7 = translation(P1, w)
            P8 = translation(P2, w)
            P9 = translation(P3, w)
            this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8, P9)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P7.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P8.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P9.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, vecteur(w.x + v.x, w.y + v.y))
            B = translation(B, vecteur(w.x + v.x, w.y + v.y))
          }
          A = translation(A, vecteur(-Nx * (w.x + v.x) + 2 * w.x - v.x, 2 * w.y - v.y))
          B = translation(B, vecteur(-Nx * (w.x + v.x) + 2 * w.x - v.x, 2 * w.y - v.y))
        }
        break
      case 7:
        v = vecteur(A, B)
        v = homothetie(v, A, 2)
        w = rotation(v, A, -60)

        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(A, B, -120)
            D = rotation(B, C, -120)
            P1 = polygoneRegulier(A, B, 6)
            P2 = polygoneRegulier(C, B, 3)
            P3 = rotation(P2, C, 180)
            P4 = translation(P3, w)
            P5 = translation(P2, w)
            P6 = rotation(P1, B, 180)
            this.polygones.push(P1, P2, P3, P6, P5, P4)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, v)
            B = translation(B, v)
          }
          A = translation(A, vecteur(-Nx * v.x + 2 * w.x - v.x, 2 * w.y - v.y))
          B = translation(B, vecteur(-Nx * v.x + 2 * w.x - v.x, 2 * w.y - v.y))
        }
        break
    }
    this.echelle = 80 / Math.sqrt(XMAX - XMIN)
    this.fenetre = { xmin: XMIN - 0.5, ymin: YMIN - 0.5, xmax: XMAX + 0.5, ymax: YMAX + 0.5, pixelsParCm: this.echelle, scale: this.echelle / 30 }
    nettoieObjets(this.polygones) // On supprime les doublons éventuels (grâce à leur barycentre)
    // On ajoute les N°
    this.nb_polygones = this.polygones.length // Le nombre de polygones du pavage qui sert dans les boucles

    for (let i = 0; i < this.nb_polygones; i++) {
      this.barycentres.push(barycentre(this.polygones[i]))
      this.tracesCentres.push(tracePoint(this.barycentres[i]))
      this.tracesCentres[i].opacite = 0.5
      this.tracesCentres[i].color = 'blue'
      this.tracesCentres[i].taille = 2
      this.coordonnees.push([this.barycentres[i].x, this.barycentres[i].y])
      this.numeros.push(texteParPosition(nombreAvecEspace(i + 1), this.barycentres[i].x + 0.5, this.barycentres[i].y, 'milieu', 'black', 50 / this.echelle, 0, true))
    }
  }
}
export function pavage () {
  return new Pavage()
}

function flecheH (D, A, texte, h = 1) {
  const D1 = point(D.x, D.y + h)
  const A1 = point(A.x, A.y + h)
  const fleche = polyline(D, D1, A1)
  const eFleche = segment(A1, A)
  eFleche.styleExtremites = '->'
  const M = milieu(D1, A1)
  const objets = [fleche, eFleche]
  let t
  if (texte) {
    if (h > 0) {
      t = texteParPosition('$' + texte + '$', M.x, M.y + 0.5)
    } else {
      t = texteParPosition('$' + texte + '$', M.x, M.y - 0.8)
    }
    objets.push(t)
  }
  return objets
}

function flecheV (D, A, texte, h = 1) {
  const D1 = point(D.x + h, D.y)
  const A1 = point(A.x + h, A.y)
  const fleche = polyline(D, D1, A1)
  const eFleche = segment(A1, A)
  eFleche.styleExtremites = '->'
  const M = milieu(D1, A1)
  const objets = [fleche, eFleche]
  if (texte) {
    objets.push(texteParPoint(texte, point(M.x + h, M.y - 0.6), 'milieu', 'black', 'middle', true))
  }
  return objets
}

/**
 * Réalise un tableau typique des exercices de proportionnalité avec d'éventuelles flèches
 *
 * @author Rémi Angot
 */
function Tableau ({
  largeurTitre = 7,
  largeur = 3,
  hauteur = 2,
  nbColonnes = 3,
  origine = point(0, 0),
  ligne1 = [],
  ligne2 = [],
  flecheHaut = [], // [[1, 2, '\\times 6,4', 3], [2, 3, '\\div 6']]
  flecheBas = [],
  flecheDroite = false, // à remplacer par un string
  flecheDroiteSens = 'bas'
} = {}) {
  ObjetMathalea2D.call(this)
  if (ligne1 && ligne2) {
    nbColonnes = Math.max(ligne1.length, ligne2.length, nbColonnes)
  }
  const A = origine
  const B = point(A.x + largeurTitre + largeur * (nbColonnes - 1), A.y)
  const C = point(B.x, B.y + 2 * hauteur)
  const D = point(A.x, A.y + 2 * hauteur)
  // ABCD est le cadre extérieur (A en bas à gauche et B en bas à droite)
  const objets = []
  objets.push(polygone(A, B, C, D))
  objets.push(segment(point(A.x, A.y + hauteur), point(B.x, B.y + hauteur)))
  // trait horizontal au milieu
  let x = A.x + largeurTitre
  // x est l'abscisse de la première séparation verticale
  // Ecrit le texte dans les colonnes
  for (let i = 0; i < nbColonnes; i++) {
    objets.push(segment(point(x, A.y), point(x, C.y)))
    if (ligne1[i + 1]) objets.push(latexParCoordonnees(ligne1[i + 1], x + largeur / 2, A.y + 1.4 * hauteur))
    if (ligne2[i + 1]) objets.push(latexParCoordonnees(ligne2[i + 1], x + largeur / 2, A.y + 0.4 * hauteur))
    x += largeur
  }
  // Ecrit les titres
  if (ligne1[0]) {
    if (context.isHtml) {
      objets.push(latexParCoordonnees(ligne1[0], A.x + largeurTitre / 4, A.y + 1.4 * hauteur))
    } else {
      objets.push(latexParCoordonnees(ligne1[0], A.x + largeurTitre / 2, A.y + 1.4 * hauteur))// sortie LaTeX
    };
  }
  if (ligne2[0]) {
    if (context.isHtml) {
      objets.push(latexParCoordonnees(ligne2[0], A.x + largeurTitre / 4, A.y + 0.4 * hauteur))
    } else {
      objets.push(latexParCoordonnees(ligne2[0], A.x + largeurTitre / 2, A.y + 0.4 * hauteur))// sortie LaTeX
    };
  }
  for (const fleche of flecheHaut) {
    const Depart = point(A.x + largeurTitre + fleche[0] * largeur - 0.4 * largeur, A.y + 2.1 * hauteur)
    const Arrivee = point(A.x + largeurTitre + fleche[1] * largeur - 0.6 * largeur, A.y + 2.1 * hauteur)
    if (fleche[3]) {
      objets.push(...flecheH(Depart, Arrivee, fleche[2], fleche[3]))
    } else {
      objets.push(...flecheH(Depart, Arrivee, fleche[2]))
    }
  }
  for (const fleche of flecheBas) {
    const Depart = point(A.x + largeurTitre + fleche[0] * largeur - 0.4 * largeur, A.y - 0.1 * hauteur)
    const Arrivee = point(A.x + largeurTitre + fleche[1] * largeur - 0.6 * largeur, A.y - 0.1 * hauteur)
    let hFleche
    if (fleche[3]) {
      hFleche = -Math.abs(fleche[3])
    } else {
      hFleche = -1
    }
    objets.push(...flecheH(Depart, Arrivee, fleche[2], hFleche))
  }
  if (flecheDroite) {
    const Depart = point(A.x + largeurTitre + (nbColonnes - 1) * largeur + 0.2, A.y + 1.5 * hauteur)
    const Arrivee = point(A.x + largeurTitre + (nbColonnes - 1) * largeur + 0.2, A.y + 0.5 * hauteur)
    if (flecheDroiteSens === 'bas') {
      objets.push(...flecheV(Depart, Arrivee, flecheDroite))
    } else {
      objets.push(...flecheV(Arrivee, Depart, flecheDroite))
    }
  }

  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">${code}</g>`
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

export function tableau (...args) {
  return new Tableau(...args)
}

export function GlisseNombre (nombre = '', decalage = 0) {
  ObjetMathalea2D.call(this)
  const objets = []
  const chiffresADecaler = []
  const largeurColonne = 2
  const hauteurLigne = 1.5
  const hauteurPremiereLigne = 5.5
  const nbLignes = 3
  const nbColonnes = 12
  const A = point(3, 5)
  for (let i = 0; i < nbColonnes + 1; i++) {
    const trait = segment(point(A.x + i * largeurColonne, A.y), point(A.x + i * largeurColonne, A.y - (nbLignes - 1) * hauteurLigne - hauteurPremiereLigne))
    trait.isVisible = false
    objets.push(trait)
  }
  const traitDuHaut = segment(A, point(A.x + nbColonnes * largeurColonne, A.y))
  traitDuHaut.isVisible = false
  objets.push(traitDuHaut)
  for (let i = 1; i < nbLignes + 1; i++) {
    const trait = segment(point(A.x, A.y - (i - 1) * hauteurLigne - hauteurPremiereLigne), point(A.x + nbColonnes * largeurColonne, A.y - (i - 1) * hauteurLigne - hauteurPremiereLigne))
    trait.isVisible = false
    objets.push(trait)
  }

  const placeDansTableau = (texte, colonne, ligne, vertical = false, couleur = 'black') => {
    let textePlaceDansTableau = ''
    if (vertical) {
      textePlaceDansTableau = texteParPosition(texte, A.x + (colonne + 0.5) * largeurColonne, A.y - 0.9 * hauteurPremiereLigne, -90, couleur, 1, 'start')
    } else {
      textePlaceDansTableau = texteParPosition(texte, A.x + (colonne + 0.5) * largeurColonne, A.y - (ligne - 0.5) * hauteurLigne - hauteurPremiereLigne, 0, couleur)
    }
    textePlaceDansTableau.isVisible = false
    return textePlaceDansTableau
  }
  const labels = ['Millions', 'Centaines de milliers', 'Dizaines de milliers', 'Milliers', 'Centaines', 'Dizaines', 'Unités', 'Dixièmes', 'Centièmes', 'Millièmes', 'Dix-millièmes', 'Cent-Millièmes']
  for (let i = 0; i < nbColonnes; i++) {
    const couleur = (i === 6 || i === 6 - decalage) ? '#f15929' : 'black'
    const textePlaceDansTableau = placeDansTableau(labels[i], i, 0, true, couleur)
    textePlaceDansTableau.isVisible = false
    if (i === 6 || i === 6 - decalage) textePlaceDansTableau.gras = true
    objets.push(textePlaceDansTableau)
  }
  nombre = nombre.toString()
  const partieEntiere = nombre.split('.')[0]
  const partieDecimale = nombre.split('.')[1]
  const chiffreDesUnites = placeDansTableau(partieEntiere[partieEntiere.length - 1], 6, 1, false, '#f15929')
  const chiffreDesUnites2 = placeDansTableau(partieEntiere[partieEntiere.length - 1], 6, 2, false, '#f15929')
  chiffreDesUnites.isVisible = false
  chiffreDesUnites2.isVisible = false
  chiffreDesUnites.gras = true
  chiffreDesUnites2.gras = true
  objets.push(chiffreDesUnites)
  chiffresADecaler.push(chiffreDesUnites2)

  for (let i = 1; i < partieEntiere.length; i++) {
    const chiffre = placeDansTableau(partieEntiere[partieEntiere.length - 1 - i], 6 - i, 1)
    const chiffre2 = placeDansTableau(partieEntiere[partieEntiere.length - 1 - i], 6 - i, 2)
    chiffre.isVisible = false
    chiffre2.isVisible = false
    objets.push(chiffre)
    chiffresADecaler.push(chiffre2)
  }
  if (partieDecimale) {
    for (let i = 0; i < partieDecimale.length; i++) {
      const chiffre = placeDansTableau(partieDecimale[i], 7 + i, 1)
      const chiffre2 = placeDansTableau(partieDecimale[i], 7 + i, 2)
      chiffre.isVisible = false
      chiffre2.isVisible = false
      objets.push(chiffre)
      chiffresADecaler.push(chiffre2)
    }
    const texte1 = texteParPosition(',', A.x + 6.9 * largeurColonne, A.y - 0.3 * hauteurLigne - hauteurPremiereLigne, 'milieu', '#f15929', 3)
    const texte2 = texteParPosition(',', A.x + 6.9 * largeurColonne, A.y - 1.3 * hauteurLigne - hauteurPremiereLigne, 'milieu', '#f15929', 3)
    texte1.isVisible = false
    texte2.isVisible = false
    texte1.gras = true
    texte2.gras = true
    objets.push(texte1)
    objets.push(texte2)
  } else if (decalage < 0) { // pas de partie décimale mais une division alors virgule pour le 2e nombre
    const texte2 = texteParPosition(',', A.x + 6.9 * largeurColonne, A.y - 1.3 * hauteurLigne - hauteurPremiereLigne, 'milieu', '#f15929', 3)
    texte2.isVisible = false
    texte2.gras = true
    objets.push(apparitionAnimee(texte2, 6, 0.2))
  }
  const chiffresQuiGlissent = translationAnimee(chiffresADecaler, vecteur(-decalage * largeurColonne, 0), 'id="op" dur="1s" begin="0s;op.end+5s" fill="freeze"')
  chiffresQuiGlissent.isVisible = false
  objets.push(chiffresQuiGlissent)
  const nombreDeZeroPartieEntiere = partieDecimale ? decalage - partieDecimale.length : decalage
  const nombreDeZeroPartieDecimale = -partieEntiere.length - decalage + 1
  const zerosAAjouter = []
  for (let i = 0; i < nombreDeZeroPartieEntiere; i++) {
    const zero = placeDansTableau('0', 6 - i, 2, false, '#32CD32')// Lime Green
    zero.isVisible = false
    zero.gras = true
    zerosAAjouter.push(zero)
  }
  for (let i = 0; i < nombreDeZeroPartieDecimale; i++) {
    const zero = placeDansTableau('0', 6 + i, 2, false, '#32CD32')
    zero.isVisible = false
    zero.gras = true
    zerosAAjouter.push(zero)
  }
  objets.push(apparitionAnimee(zerosAAjouter, 6, 0.2))
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">${code}</g>`
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
export function glisseNombre (...args) {
  return new GlisseNombre(...args)
}
