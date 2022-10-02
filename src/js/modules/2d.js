import { calcul, arrondi, egal, randint, rangeMinMax, unSiPositifMoinsUnSinon, lettreDepuisChiffre, nombreAvecEspace, stringNombre, inferieurouegal, numberFormat, nombreDeChiffresDe, superieurouegal, combinaisonListes, texcolors, texNombre, enleveElement } from './outils.js'
import { radians } from './fonctionsMaths.js'
import { context } from './context.js'
import { fraction, Fraction, max, ceil, isNumeric, floor, random, round, abs } from 'mathjs'
import earcut from 'earcut'
import FractionX from './FractionEtendue.js'
import Decimal from 'decimal.js'
import { colorToLatexOrHTML, ObjetMathalea2D, vide2d } from './2dGeneralites.js'
import { apparitionAnimee, translationAnimee } from './2dAnimation.js'

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
 * @author Rémi Angot
 * @class
 */
function Point (arg1, arg2, arg3, positionLabel = 'above') {
  this.typeObjet = 'point'
  ObjetMathalea2D.call(this, { classe: false })
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

  /**
   * Teste l'appartenance d'un point à tout type de polygone (non convexe ou convexe). Pour info, la fonction utilise une triangulation du polygone réalisée par la librairie earcut Copyright (c) 2016, Mapbox.
   * @memberof Point
   * @param {Polygone} p Polygone dont on veut tester l'appartenance avec le point
   * @example M.estDansPolygone(p1) // Renvoie true si M appartient au polygone p1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estDansPolygone = function (p) {
    const listeTriangles = earcut(polygoneToFlatArray(p))
    for (let i = 0; i < listeTriangles.length; i += 3) {
      if (this.estDansTriangle(p.listePoints[listeTriangles[i]], p.listePoints[listeTriangles[i + 1]], p.listePoints[listeTriangles[i + 2]])) return true
    }
    return false
  }

  /**
   * Teste l'appartenance d'un point dans un triangle
   * @memberof Point
   * @param {Point} A Premier sommet du triangle
   * @param {Point} B Deuxième sommet du triangle
   * @param {Point} C Troisième sommet du triangle
   * @example M.estDansTriangle(V, S, T) // Renvoie true si M appartient au triangle VST, false sinon
   * @author Eric Elter
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estDansTriangle = function (A, B, C) {
    const vMA = vecteur(this, A)
    const vMB = vecteur(this, B)
    const vMC = vecteur(this, C)
    const x1 = vMB.x * vMC.y - vMB.y * vMC.x
    const x2 = vMC.x * vMA.y - vMC.y * vMA.x
    const x3 = vMA.x * vMB.y - vMA.y * vMB.x
    return (superieurouegal(x1, 0) && superieurouegal(x2, 0) && superieurouegal(x3, 0)) || (inferieurouegal(x1, 0) && inferieurouegal(x2, 0) && inferieurouegal(x3, 0))
  }

  /**
   * Teste l'appartenance d'un point à un polygone convexe
   * @memberof Point
   * @param {Polygone} p Polygone dont on veut tester l'appartenance avec le point
   * @example M.estDansPolygoneConvexe(p1) // Renvoie true si M appartient au polygone convexe p1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estDansPolygoneConvexe = function (p) {
    const l = p.listePoints.length
    if (l === 3) {
      return this.estDansTriangle(...p.listePoints)
    } else {
      const A = p.listePoints[0]
      const B = p.listePoints[1]
      const C = p.listePoints[l - 1]
      const p2 = polygone(...p.listePoints.slice(1))
      if (this.estDansTriangle(A, B, C)) return true
      else return this.estDansPolygoneConvexe(p2)
    }
  }

  /**
   * Teste l'appartenance d'un point dans un quadrilatère
   * @memberof Point
   * @param {Point} A Premier sommet du quadrilatère
   * @param {Point} B Deuxième sommet du quadrilatère
   * @param {Point} C Troisième sommet du quadrilatère
   * @param {Point} D Quatrième sommet du quadrilatère
   * @example M.estDansQuadrilatere(F, G, H, I) // Renvoie true si M appartient au quadrilatère FGHI, false sinon
   * @author Eric Elter
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estDansQuadrilatere = function (A, B, C, D) {
    return this.estDansTriangle(A, B, C) || this.estDansTriangle(A, C, D)
  }

  /**
   * Teste l'appartenance d'un point sur un segment, un cercle, une droite ou une demi-droite
   * @memberof Point
   * @param {Segment | Cercle | Droite | DemiDroite} objet Objet géométrique dont on veut tester si le point en fait partie
   * @example M.estSur(s) // Renvoie true si M appartient au segment s (au préalablement défini), false sinon
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estSur = function (objet) {
    if (objet instanceof Droite) return (egal(objet.a * this.x + objet.b * this.y + objet.c, 0, 0.000001))
    if (objet instanceof Segment) {
      const prodvect = (objet.extremite2.x - objet.extremite1.x) * (this.y - objet.extremite1.y) - (this.x - objet.extremite1.x) * (objet.extremite2.y - objet.extremite1.y)
      const prodscal = (this.x - objet.extremite1.x) * (objet.extremite2.x - objet.extremite1.x) + (this.y - objet.extremite1.y) * (objet.extremite2.y - objet.extremite1.y)
      const prodscalABAB = (objet.extremite2.x - objet.extremite1.x) ** 2 + (objet.extremite2.y - objet.extremite1.y) ** 2
      return (egal(prodvect, 0, 0.00001) && superieurouegal(prodscal, 0) && inferieurouegal(prodscal, prodscalABAB))
    }
    if (objet instanceof DemiDroite) {
      const OM = vecteur(objet.extremite1, this)
      const vd = vecteur(objet.extremite1, objet.extremite2)
      const prodscal = OM.x * vd.x + OM.y * vd.y
      const prodvect = OM.x * vd.y - OM.y * vd.x
      return (egal(prodvect, 0, 0.000001) && superieurouegal(prodscal, 0, 0.000001))
    }
    if (objet instanceof Cercle) return egal(longueur(this, objet.centre), objet.rayon, 0.000001)
  }
}
/**
 * Crée un objet Point ayant les propriétés suivantes :
 * @param {number} x abscisse
 * @param {number} y ordonnée
 * @param {string} A son nom qui apparaîtra
 * @param {string} positionLabel Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
 * @return {Point}
 */
export function point (x, y, A, positionLabel = 'above') {
  return new Point(x, y, A, positionLabel)
}
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
  ObjetMathalea2D.call(this, { })
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

/**  Nomme les points passés en argument, le nombre d'arguments n'est pas limité.
 * @param  {...any} args Points mis à la suite
 * @param {string} [color = 'black'] Couleur des points : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur des points. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} taille Taille de la boite contenant le nom des points
 * @property {number} largeur Largeur de la boite contenant le nom des points
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Septembre 2022
function LabelPoint (...points) {
  ObjetMathalea2D.call(this, { })
  if (!this.taille) this.taille = 10
  if (!this.largeur) this.largeur = 10
  if (typeof points[points.length - 1] === 'string') {
    this.color = colorToLatexOrHTML(points[points.length - 1])
    points.length--
  } else this.color = colorToLatexOrHTML('black')
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

/**  Nomme les points passés en argument, le nombre d'arguments n'est pas limité.
 * @param  {...any} args Points mis à la suite
 * @param {string} [color = 'black'] Couleur des points : du type 'blue' ou du type '#f15929'
 * @example labelPoint(A,B,C) // Retourne le nom des points A, B et C en noir
 * @example labelPoint(A,B,C,'red') // Retourne le nom des points A, B et C en rouge
 * @example labelPoint(A,B,C,'#f15929') // Retourne le nom des points A, B et C en orange (code couleur HTML : #f15929)
 * @author Rémi Angot
 * @return {LabelPoint}
 */
// JSDOC Validee par EE Septembre 2022
export function labelPoint (...args) {
  return new LabelPoint(...args)
}

/**
 * Associe à tous les points passés en paramètre, son label, défini préalablement en Latex. Par exemple, si besoin de nommer le point A_1.
 * @param {number} [distance=1.5] Taille de l'angle
 * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
 * @param {Object} parametres À saisir entre accolades
 * @param {Point|Point[]} [parametres.points = []] Point ou tableau de points
 * @param {string} [parametres.color = 'black'] Couleur du label : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.taille = 8] Taille du label
 * @param {number} [parametres.largeur = 10] Largeur en pixels du label à des fins de centrage
 * @param {number} [parametres.hauteur = 10] Hauteur en pixels du label à des fins de centrage
 * @param {string} [parametres.couleurDeRemplissage=''] Couleur de fond de ce label : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du label. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} taille Taille du label
 * @property {number} largeur Largeur en pixels du label à des fins de centrage
 * @property {number} hauteur Hauteur en pixels du label à des fins de centrage
 * @property {string} couleurDeRemplissage Couleur de fond de ce label. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot et Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
function LabelLatexPoint ({ points = [], color = 'black', taille = 8, largeur = 10, hauteur = 10, couleurDeRemplissage = '' } = {}) {
  ObjetMathalea2D.call(this, { })
  this.taille = taille
  this.largeur = largeur
  this.hauteur = hauteur
  this.couleurDeRemplissage = couleurDeRemplissage
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
        objets.push(latexParCoordonnees(A.nom, x - offset, y, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'below':
        objets.push(latexParCoordonnees(A.nom, x, y - offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'above':
        objets.push(latexParCoordonnees(A.nom, x, y + offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'above right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y + offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'below left':
        objets.push(latexParCoordonnees(A.nom, x - offset, y - offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      case 'below right':
        objets.push(latexParCoordonnees(A.nom, x + offset, y - offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
        break
      default:
        objets.push(latexParCoordonnees(A.nom, x - offset, y + offset, this.color, this.largeur, this.hauteur, this.couleurDeRemplissage, this.taille))
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
 * Associe à tous les points passés en paramètre, son label, défini préalablement en Latex. Par exemple, si besoin de nommer le point A_1.
 * @param {number} [distance=1.5] Taille de l'angle
 * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
 * @param {Object} parametres À saisir entre accolades
 * @param {Point|Point[]} [parametres.points] Point ou tableau de points
 * @param {string} [parametres.color = 'black'] Couleur du label : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.taille = 8] Taille du label
 * @param {number} [parametres.largeur = 10] Largeur en pixels du label à des fins de centrage
 * @param {number} [parametres.hauteur = 10] Hauteur en pixels du label à des fins de centrage
 * @param {string} [parametres.couleurDeRemplissage=''] Couleur de fond de ce label : du type 'blue' ou du type '#f15929'
 * @author Rémi Angot et Jean-Claude Lhote
 * @return {LabelLatexPoint}
 */
// JSDOC Validee par EE Juin 2022
export function labelLatexPoint ({ points, color = 'black', taille = 8, largeur = 10, hauteur = 10, background = '' } = {}) {
  return new LabelLatexPoint({ points: points, color: color, taille: taille, largeur: largeur, hauteur: hauteur, background: background })
}

/**
 * Crée le barycentre d'un polygone
 * @param {Polygone} p Polygone dont on veut créer le barycentre
 * @param {string} [nom = ''] Nom du barycentre
 * @param {string} [positionLabel = 'above'] Position du nom par rapport au point
 * @example G = barycentre(pol) // Crée G, le barycentre du polygone pol, sans lui donner de nom
 * @example G = barycentre(pol,'G','below') // Crée G, le barycentre du polygone pol, en notant G sous le point, s'il est tracé et labellisé.
 * @author Jean-Claude Lhote
 * @return {Point}
 */
// JSDOC Validee par EE Juin 2022
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
 * @author
 */

/**  Trace la demi-droite d'origine A passant par B
 * @param {Point | number} arg1 Premier point de la droite OU BIEN coefficient a de l'équation de la droite ax+by+c=0
 * @param {Point | number} arg2 Deuxième point de la droite OU BIEN coefficient b de l'équation de la droite ax+by+c=0
 * @param {string | number} arg3 Nom affichée de la droite OU BIEN coefficient c de l'équation de la droite ax+by+c=0
 * @param {string} arg4 Couleur de la droite : du type 'blue' ou du type '#f15929' OU BIEN nom affichée de la droite si arg1 est un nombre
 * @param {string} arg5 Couleur de la droite : du type 'blue' ou du type '#f15929' si arg1 est un nombre
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {number} a Coefficient a de l'équation de la droite ax+by+c=0
 * @property {number} b Coefficient b de l'équation de la droite ax+by+c=0
 * @property {number} c Coefficient c de l'équation de la droite ax+by+c=0
 * @property {number} x1 Abscisse de arg1 (si ce point existe)
 * @property {number} y1 Ordonnée de arg1 (si ce point existe)
 * @property {number} x2 Abscisse de arg2 (si ce point existe)
 * @property {number} y2 Ordonnée de arg2 (si ce point existe)
 * @property {string} nom Nom affichée de la droite
 * @property {string} color Couleur de la droite. À associer obligatoirement à colorToLatexOrHTML().
 * @property {Vecteur} normal Vecteur normal de la droite
 * @property {Vecteur} directeur Vecteur directeur de la droite
 * @property {number} angleAvecHorizontale Valeur de l'angle orienté entre la droite et l'horizontale
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Aout 2022
function Droite (arg1, arg2, arg3, arg4, arg5) {
  let a, b, c

  ObjetMathalea2D.call(this, { })
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
  } else { // arguments.length === 5
    if (isNaN(arg1) || isNaN(arg2) || isNaN(arg3)) window.notify('Droite : (attendus : a, b, c et "nom") les arguments de sont pas des nombres valides', { arg1, arg2, arg3 })
    this.a = arg1
    this.b = arg2
    this.c = arg3
    a = arg1
    b = arg2
    c = arg3
    this.nom = arg4
    this.color = colorToLatexOrHTML(arg5)
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
      case 5:
        tableauOptions.push(' dashed ')
        break
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

/**  Trace une droite définie par 2 points OU BIEN par les coefficients de son équation
 * @param {Point | number} arg1 Premier point de la droite OU BIEN coefficient a de l'équation de la droite ax+by+c=0 avec (a,b)!=(0,0)
 * @param {Point | number} arg2 Deuxième point de la droite OU BIEN coefficient b de l'équation de la droite ax+by+c=0 avec (a,b)!=(0,0)
 * @param {string | number} arg3 Nom affichée de la droite OU BIEN coefficient c de l'équation de la droite ax+by+c=0
 * @param {string} arg4 Couleur de la droite : du type 'blue' ou du type '#f15929' OU BIEN nom affichée de la droite si arg1 est un nombre
 * @param {string} arg5 Couleur de la droite : du type 'blue' ou du type '#f15929' si arg1 est un nombre
 * @example droite(M, N, '(d1)') // Trace la droite passant par M et N se nommant (d1) et de couleur noire
 * @example droite(M, N, '(d1)','blue') // Trace la droite passant par M et N se nommant (d1) et de couleur bleue
 * @example droite(m, n, p) // Trace la droite définie par les coefficients de mx+ny+p=0 et de couleur noire
 * @example droite(m, n, p, '(d1)', 'red') // Trace la droite définie par les coefficients de mx+ny+p=0, se nommant (d1) et de couleur rouge
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
export function droite (...args) {
  return new Droite(...args)
}

/**  Donne la position du point A par rapport à la droite d
 * @param {droite} d
 * @param {point} A
 * @param {number} [tolerance = 0.0001] Seuil de tolérance pour évaluer la proximité entre d et A.
 * @example dessousDessus(d1, M) // Renvoie la position de M par rapport à d1 parmi ces 5 possibilités : 'sur', 'droite', 'gauche', 'dessous', 'dessus'
 * @example dessousDessus(d1, M, 0.005) // Renvoie la position de M par rapport à d1 parmi ces 5 possibilités : 'sur', 'droite', 'gauche', 'dessous', 'dessus' (avec une tolérance de 0,005)
 * @return {'sur' | 'droite' | 'gauche' | 'dessous' | 'dessus'}
 */
// JSDOC Validee par EE Aout 2022

export function dessousDessus (d, A, tolerance = 0.0001) {
  if (egal(d.a * A.x + d.b * A.y + d.c, 0, tolerance)) return 'sur'
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
 * @param {droite} d
 * @param {number} param1 les bordures de la fenêtre
 * @return {Point} le point qui servira à placer le label.
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

/**  Trace la droite passant par le point A et de vecteur directeur v
 * @param {Point} A Point de la droite
 * @param {Vecteur} v Vecteur directeur de la droite
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtVecteur(M, v1) // Trace la droite passant par le point M et de vecteur directeur v1
 * @example droiteParPointEtVecteur(M, v1, 'd1', 'red') // Trace, en rouge, la droite d1 passant par le point M et de vecteur directeur v1
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtVecteur (A, v, nom = '', color = 'black') {
  const B = point(A.x + v.x, A.y + v.y)
  return new Droite(A, B, nom, color)
}

/**  Trace la droite parallèle à d passant par le point A
 * @param {Point} A Point de la droite
 * @param {Droite} d Droite
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtParallele(M, d2) // Trace la droite parallèle à d2 passant par le point M
 * @example droiteParPointEtParallele(M, d2, 'd1', 'red') // Trace, en rouge, la droite d1 parallèle à d2 passant par le point M
 * @author Jean-Claude Lhote
 * @return {droiteParPointEtVecteur}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtParallele (A, d, nom = '', color = 'black') {
  return droiteParPointEtVecteur(A, d.directeur, nom, color)
}

/**  Trace la droite perpendiculaire à d passant par le point A
 * @param {Point} A Point de la droite
 * @param {Droite} d Droite
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtPerpendiculaire(M, d2) // Trace la droite perpendiculaire à d2 passant par le point M
 * @example droiteParPointEtPerpendiculaire(M, d2, 'd1', 'red') // Trace, en rouge, la droite d1 perpendiculaire à d2 passant par le point M
 * @author Jean-Claude Lhote
 * @return {droiteParPointEtVecteur}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtPerpendiculaire (A, d, nom = '', color = 'black') {
  return droiteParPointEtVecteur(A, d.normal, nom, color)
}

/**  Trace la droite horizontale passant par le point A
 * @param {Point} A Point de la droite
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteHorizontaleParPoint(M) // Trace la droite horizontale passant par le point M
 * @example droiteHorizontaleParPoint(M, 'd1', 'red') // Trace, en rouge, la droite horizontale d1 passant par le point M
 * @author Jean-Claude Lhote
 * @return {droiteParPointEtPente}
 */
// JSDOC Validee par EE Aout 2022
export function droiteHorizontaleParPoint (A, nom = '', color = 'black') {
  return droiteParPointEtPente(A, 0, nom, color)
}

/**  Trace la droite verticale passant par le point A
 * @param {Point} A Point de la droite
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteVerticaleParPoint(M) // Trace la droite verticale passant par le point M
 * @example droiteVerticaleParPoint(M, 'd1', 'red') // Trace, en rouge, la droite verticale d1 passant par le point M
 * @author Jean-Claude Lhote
 * @return {droiteParPointEtVecteur}
 */
// JSDOC Validee par EE Aout 2022
export function droiteVerticaleParPoint (A, nom = '', color = 'black') {
  return droiteParPointEtVecteur(A, vecteur(0, 1), nom, color)
}

/**  Trace la droite passant par le point A et de pente k
 * @param {Point} A Point de la droite
 * @param {number} k Pente de la droite
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtPente(M, p) // Trace la droite passant par le point M et de pente p
 * @example droiteParPointEtPente(M, p, 'd1', 'red') // Trace, en rouge, la droite d1 passant par le point M et de pente p
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtPente (A, k, nom = '', color = 'black') {
  const B = point(A.x + 1, A.y + k)
  return new Droite(A, B, nom, color)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% LES DROITES REMARQUABLES %%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Code le milieu d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @param {boolean} [mil=true] Trace ou nom le point du milieu.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageMilieu (A, B, color = 'black', mark = '×', mil = true) {
  if (longueur(A, B) < 0.1) window.notify('CodageMilieu : Points trop rapprochés pour créer ce codage', { A, B })
  ObjetMathalea2D.call(this, { })
  this.color = color
  const O = milieu(A, B)
  const d = droite(A, B)
  const M = tracePointSurDroite(O, d, this.color)
  const v = codageSegments(mark, this.color, A, O, O, B)
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
 * Code le milieu d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color = 'black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark = 'x'] Symbole posé de part et d'autre du milieu du segment
 * @param {boolean} [mil = true] Trace ou nom le point du milieu.
 * @example codageMilieu(M,N) // Code, en noir, le milieu du segment[MN] avec les marques 'x', en plaçant le milieu
 * @example codageMilieu(M,N,'red','oo',false) // Code, en rouge, le milieu du segment[MN] avec les marques 'oo', sans placer le milieu.
 * @author Jean-Claude Lhote
 * @return {CodageMilieu}
 */
// JSDOC Validee par EE Juin 2022
export function codageMilieu (A, B, color = 'black', mark = '×', mil = true) {
  return new CodageMilieu(A, B, color, mark, mil)
}

/**
 * Trace la médiatrice d'un segment, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [nom = ''] Nom affichée de la droite
 * @param {string} [couleurMediatrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction = 'black'] Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [construction = false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail = false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [markmilieu = 'x'] Symbole posé sur les deux parties du segment
 * @param {string} [markrayons = '||'] Symbole posé sur les quatre rayons (si détail est true)
 * @param {number} [epaisseurMediatrice = 1] Epaisseur de la médiatrice
 * @param {number} [opaciteMediatrice = 1] Taux d'opacité de la médiatrice
 * @param {number} [pointillesMediatrice = 0] Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurMediatrice Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
 * @property {number} epaisseurMediatrice Epaisseur de la médiatrice
 * @property {number} opaciteMediatrice Taux d'opacité de la médiatrice
 * @property {number} pointillesMediatrice Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
 * @property {string} couleurConstruction Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
 * @class
 */
// JSDOC Validee par EE Juin 2022
function Mediatrice (
  A,
  B,
  nom = '',
  couleurMediatrice = 'red',
  color = 'blue',
  couleurConstruction = 'black',
  construction = false,
  detail = false,
  markmilieu = '×',
  markrayons = '||',
  epaisseurMediatrice = 1,
  opaciteMediatrice = 1,
  pointillesMediatrice = 0
) {
  if (longueur(A, B) < 0.1) window.notify('ConstructionMediatrice : Points trop rapprochés pour créer cet objet', { A, B })
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.couleurMediatrice = couleurMediatrice
  this.epaisseurMediatrice = epaisseurMediatrice
  this.opaciteMediatrice = opaciteMediatrice
  this.pointillesMediatrice = pointillesMediatrice
  this.couleurConstruction = couleurConstruction
  const O = milieu(A, B)
  const m = rotation(A, O, 90)
  const n = rotation(A, O, -90)
  const M = pointSurSegment(O, m, longueur(A, B) * 0.785)
  const N = pointSurSegment(O, n, longueur(A, B) * 0.785)
  const d = droite(M, N, nom, this.couleurMediatrice)
  if (arguments.length < 5) {
    return d
  } else {
    d.isVisible = false
    d.epaisseur = this.epaisseurMediatrice
    d.opacite = this.opaciteMediatrice
    d.pointilles = this.pointillesMediatrice
    const objets = [d]
    if (construction) {
      const arcm1 = traceCompas(A, M, 20, this.couleurConstruction)
      const arcm2 = traceCompas(B, M, 20, this.couleurConstruction)
      const arcn1 = traceCompas(A, N, 20, this.couleurConstruction)
      const arcn2 = traceCompas(B, N, 20, this.couleurConstruction)
      arcm1.isVisible = false
      arcm2.isVisible = false
      arcn1.isVisible = false
      arcn2.isVisible = false
      const codage = codageMediatrice(A, B, this.color, markmilieu)
      codage.isVisible = false
      objets.push(arcm1, arcm2, arcn1, arcn2, d, codage)
    }
    if (detail) {
      const sAM = segment(A, M, this.couleurConstruction)
      sAM.pointilles = 5
      const sBM = segment(B, M, this.couleurConstruction)
      sBM.pointilles = 5
      const sAN = segment(A, N, this.couleurConstruction)
      sAN.pointilles = 5
      const sBN = segment(B, N, this.couleurConstruction)
      sBN.pointilles = 5
      const codes = codageSegments(markrayons, this.color, A, M, B, M, A, N, B, N)
      objets.push(sAM, sBM, sAN, sBN, codes)
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
}

/**
 * Trace la médiatrice d'un segment, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [nom=''] Nom affichée de la droite
 * @param {string} [couleurMediatrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction='black'] Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [markmilieu='x'] Symbole posé sur les deux parties du segment
 * @param {string} [markrayons='||'] Symbole posé sur les quatre rayons (si détail est true)
 * @param {number} [epaisseurMediatrice = 1] Epaisseur de la médiatrice
 * @param {number} [opaciteMediatrice = 1] Taux d'opacité de la médiatrice
 * @param {number} [pointillesMediatrice = 0] Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
 * @example mediatrice(M,N)
 * // Trace, en rouge, la médiatrice du segment[MN], d'épaisseur 1, avec une opacité de 100 % sans autre option
 * @example mediatrice(M,N,'d','blue')
 * // Trace, en bleu, la médiatrice du segment[MN], d'épaisseur 1, avec une opacité de 100 % et qui s'appelle 'd'
 * @example mediatrice(M,N,'','blue','red','green',true,true,'OO','XX',2,0.5,3)
 * // Trace, en bleu, la médiatrice du segment[MN], d'épaisseur 2, avec une opacité de 50 % sans nom
 * // Les traits de construction sont dessinés en vert avec la marque 'OO' pour le segment initial et la marque 'XX' pour les rayons, toutes ces marques étant rouge.
 * @author Rémi Angot {amendée par Eric Elter en juin 2022}
 * @return {Mediatrice}
*/
// JSDOC Validee par EE Juin 2022
export function mediatrice (A, B, nom = '', couleurMediatrice = 'red', color = 'blue', couleurConstruction = 'black', construction = false, detail = false, markmilieu = '×', markrayons = '||', epaisseurMediatrice = 1, opaciteMediatrice = 1, pointillesMediatrice = 0) {
  if (arguments.length < 5) return new Mediatrice(A, B, nom, couleurMediatrice)
  else return new Mediatrice(A, B, nom, couleurMediatrice, color, couleurConstruction, construction, detail, markmilieu, markrayons, epaisseurMediatrice, opaciteMediatrice, pointillesMediatrice)
}

/**
 * Code la médiatrice d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @author  Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageMediatrice (A, B, color = 'black', mark = '×') {
  if (longueur(A, B) < 0.1) window.notify('CodageMediatrice : Points trop rapprochés pour créer ce codage', { A, B })
  ObjetMathalea2D.call(this, { })
  this.color = color
  const O = milieu(A, B)
  const M = rotation(A, O, 90)
  const c = codageAngleDroit(M, O, B, this.color)
  const v = codageSegments(mark, this.color, A, O, O, B)
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
 * Code la médiatrice d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @example codageMediatrice(M,N) // Code, en noir, la médiatrice du segment[MN] avec les marques 'x'
 * @example codageMediatrice(M,N,'red','oo') // Code, en rouge, la médiatrice du segment[MN] avec les marques 'oo'
 * @author  Rémi Angot
 * @return {CodageMediatrice}
 */
// JSDOC Validee par EE Juin 2022
export function codageMediatrice (A, B, color = 'black', mark = '×') {
  return new CodageMediatrice(A, B, color, mark)
}

/**
 * Trace la bissectrice d'un angle, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {string} [couleurBissectrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction = 'black'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
 * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [mark='×'] Symbole posé sur les arcs
 * @param {number} [tailleLosange = 5] Longueur d'un côté du losange de construction
 * @param {number} [epaisseurBissectrice = 1] Epaisseur de la bissectrice
 * @param {number} [opaciteBissectrice = 1] Taux d'opacité de la bissectrice
 * @param {number} [pointillesBissectrice = 0] Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} couleurBissectrice Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurConstruction Couleur de la médiatrice. À associer obligatoirement à colorToLatexOrHTML(). Si 'none' ou '', pas de hachures.
 * @property {string} mark Symbole posé sur les arcs
 * @property {number} tailleLosange Longueur d'un côté du losange de construction
 * @property {number} epaisseurBissectrice Epaisseur de la bissectrice
 * @property {number} opaciteBissectrice Taux d'opacité de la bissectrice
 * @property {number} pointillesBissectrice Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
 * @author Rémi Angot (amendée par Eric Elter en juin 2022)
 * @class
 */
// JSDOC Validee par EE Juin 2022
function Bissectrice (
  A,
  O,
  B,
  couleurBissectrice = 'red',
  color = 'blue',
  couleurConstruction = 'black',
  construction = false,
  detail = false,
  mark = '×',
  tailleLosange = 5,
  epaisseurBissectrice = 1,
  opaciteBissectrice = 1,
  pointillesBissectrice = ''
) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.tailleLosange = tailleLosange
  this.mark = mark
  this.couleurBissectrice = couleurBissectrice
  this.epaisseurBissectrice = epaisseurBissectrice
  this.couleurConstruction = couleurConstruction
  this.opaciteBissectrice = opaciteBissectrice
  this.pointillesBissectrice = pointillesBissectrice
  if (longueur(A, O) < 0.001 || longueur(O, B) < 0.001) window.notify('Bissectrice : points confondus', { A, O, B })
  // Construction de la bissectrice
  const demiangle = angleOriente(A, O, B) / 2
  const m = pointSurSegment(O, A, 3)
  const X = rotation(m, O, demiangle)
  const d = demiDroite(O, X, this.couleurBissectrice)
  // Fin de construction de la bissectrice
  if (arguments.length < 5) {
    return d
  } else {
    d.epaisseur = this.epaisseurBissectrice
    d.opacite = this.opaciteBissectrice
    d.pointilles = this.pointillesBissectrice
    const objets = [d]
    const M = pointSurSegment(O, A, this.tailleLosange)
    const N = pointSurSegment(O, B, this.tailleLosange)
    const dMN = droite(M, N)
    dMN.isVisible = false
    const P = symetrieAxiale(O, dMN)
    if (construction || detail) {
      if (!M.estSur(segment(O, A))) {
        const sOM = segment(O, M, this.couleurConstruction)
        objets.push(sOM)
      }
      if (!N.estSur(segment(O, B))) {
        const sON = segment(O, N, this.couleurConstruction)
        objets.push(sON)
      }
      if (construction) {
        const codage = codageBissectrice(A, O, B, this.color, mark)
        const tNP = traceCompas(N, P, 20, this.couleurConstruction)
        const tMP = traceCompas(M, P, 20, this.couleurConstruction)
        const tOM = traceCompas(O, M, 20, this.couleurConstruction)
        const tON = traceCompas(O, N, 20, this.couleurConstruction)
        objets.push(codage, tNP, tMP, tOM, tON)
      }
      if (detail) {
        const sMP = segment(M, P, this.couleurConstruction)
        const sNP = segment(N, P, this.couleurConstruction)
        sMP.pointilles = 5
        sNP.pointilles = 5
        const codes = codageSegments(this.mark, this.color, O, M, M, P, O, N, N, P)
        objets.push(sMP, sNP, codes)
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
  }
}

/**
 * Trace la bissectrice d'un angle, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {string} [couleurBissectrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction = 'black'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [mark='×'] Symbole posé sur les arcs
 * @param {number} [tailleLosange = 5] Longueur d'un côté du losange de construction
 * @param {number} [epaisseurBissectrice = 1] Epaisseur de la bissectrice
 * @param {number} [opaciteBissectrice = 1] Taux d'opacité de la bissectrice
 * @param {number} [pointillesBissectrice = 0] Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
 * @example bissectrice(N,R,J)
 * // Trace, en rouge, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %, sans autre option
 * @example bissectrice(N,R,J,'blue')
 * // Trace, en bleu, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %, sans autre option
 * @example bissectrice(N,R,J,'blue','red','green',true,true,'||',6,2,0.5,3)
 * // Trace, en rouge, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %. Les traits de construction sont dessinés en vert avec les marques '||' en rouge.
 * @author Rémi Angot (amendée par Eric Elter en juin 2022)
 * @return {Bissectrice}
 */
// JSDOC Validee par EE Juin 2022
export function bissectrice (A, O, B, couleurBissectrice = 'red', color = 'blue', couleurConstruction = 'black', construction = false, detail = false, mark = '×', tailleLosange = 5, epaisseurBissectrice = 1, opaciteBissectrice = 1, pointillesBissectrice = '') {
  return new Bissectrice(A, O, B, couleurBissectrice, color, couleurConstruction, construction, detail, mark, tailleLosange, epaisseurBissectrice, opaciteBissectrice, pointillesBissectrice)
}

/**
 * Code la bissectrice d'un angle
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {string} [color = 'black'] Couleur de la bissectrice : du type 'blue' ou du type '#f15929'
 * @param {string} [mark = 'x'] Symbole posé sur les arcs
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de la bissectrice. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} mark Symbole posé sur les arcs
 * @property {Point} centre Sommet de l'angle
 * @property {Point} depart Point sur un côté de l'angle (équivalent au point A)
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageBissectrice (A, O, B, color = 'black', mark = 'x') {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.mark = mark
  this.centre = O
  this.depart = pointSurSegment(O, A, 1.5)
  const demiangle = angleOriente(A, O, B) / 2
  const lieu = rotation(this.depart, O, demiangle)

  this.svg = function (coeff) {
    const a1 = codageAngle(pointSurSegment(this.centre, this.depart, 30 / coeff), O, demiangle, 30 / coeff, this.mark, this.color, 1, 1)
    const a2 = codageAngle(pointSurSegment(this.centre, lieu, 30 / coeff), O, demiangle, 30 / coeff, this.mark, this.color, 1, 1)
    return (
      a1.svg(coeff) +
      '\n' +
      a2.svg(coeff) +
      '\n'
    )
  }
  this.tikz = function () {
    const a1 = codageAngle(pointSurSegment(this.centre, this.depart, 1.5 / context.scale), O, demiangle, 1.5 / context.scale, this.mark, this.color, 1, 1)
    const a2 = codageAngle(pointSurSegment(this.centre, lieu, 1.5 / context.scale), O, demiangle, 1.5 / context.scale, this.mark, this.color, 1, 1)
    return a1.tikz() + '\n' + a2.tikz() + '\n'
  }
}

/**
 * Code la bissectrice d'un angle
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {string} [color = 'black'] Couleur de la bissectrice : du type 'blue' ou du type '#f15929'
 * @param {string} [mark='x'] Symbole posé sur les arcs
 * @example codagebissectrice(M,N,P) // Code, en noir, la bissectrice de l'angle MNP avec les marques 'x'
 * @example codagebissectrice(M,N,P,'red','oo') // Code, en rouge, la bissectrice de l'angle MNP avec les marques 'oo'
 * @author Jean-Claude Lhote
 * @return {CodageBissectrice}
 */
// JSDOC Validee par EE Juin 2022
export function codageBissectrice (A, O, B, color = 'black', mark = 'x') {
  return new CodageBissectrice(A, O, B, color, mark)
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
  ObjetMathalea2D.call(this, { })
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
    xmin = Math.min(xmin, unPoint.x)
    xmax = Math.max(xmax, unPoint.x)
    ymin = Math.min(ymin, unPoint.y)
    ymax = Math.max(ymax, unPoint.y)
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
      case 5:
        tableauOptions.push(' dashed ')
        break
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
%%%%%% 3D EN PERSPECTIVE CAVALIERES %%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 *
 * @param {int} Longueur
 * @param {int} largeur
 * @param {int} profondeur
 *
 */
function Pave (L = 10, l = 5, h = 5, origine = point(0, 0), cote = true, angleDeFuite = 30, coefficientDeFuite = 0.5) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const A = origine; const B = point(A.x + L, A.y); const C = point(B.x, B.y + l); const D = point(A.x, A.y + l)
  const p = polygone(A, B, C, D)
  const E = pointAdistance(A, h * coefficientDeFuite, angleDeFuite)
  const F = translation(B, vecteur(A, E))
  const G = translation(C, vecteur(A, E))
  const H = translation(D, vecteur(A, E))
  const sAE = segment(A, E)
  const sBF = segment(B, F)
  const sCG = segment(C, G)
  const sDH = segment(D, H)
  const sEF = segment(E, F)
  const sFG = segment(F, G)
  const sGH = segment(G, H)
  const sHE = segment(H, E)
  sAE.pointilles = 5
  sEF.pointilles = 5
  sHE.pointilles = 5

  objets.push(p, sAE, sBF, sCG, sDH, sEF, sFG, sGH, sHE)
  if (cote) {
    objets.push(afficheCoteSegment(segment(B, A), '', 1))
    objets.push(afficheCoteSegment(segment(A, D), '', 1))
    objets.push(afficheCoteSegment(segment(F, B), h + ' cm', 1))
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      objet.color = this.color
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

export function pave (...args) {
  return new Pave(...args)
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
  ObjetMathalea2D.call(this, { })
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
  ObjetMathalea2D.call(this, { })
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
 * s = segment(A, B) //Segment d'extrémités A et B
 * s = segment(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
 * s = segment(x1,y1,x2,y2) //Segment défini par les coordonnées des deux extrémités
 * s = segment(x1,y1,x2,y2,'blue') //Segment défini par les coordonnées des deux extrémités et de couleur bleue
 * @class
 * @author Rémi Angot
 */
function Segment (arg1, arg2, arg3, arg4, color, styleExtremites = '') {
  ObjetMathalea2D.call(this, { })

  /**
   * Teste si un segment coupe un cercle, une droite, une demi-cercle ou un autre segment
   * @memberof Segment
   * @param {Segment | Droite | DemiDroite | Cercle} objet Objet géométrique dont on veut tester l'intersection avec le segment
   * @example s1.estSecant(d1) // Renvoie true si s1 est sécant avec d1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  this.estSecant = function (objet) {
    const ab = droite(this.extremite1, this.extremite2)
    if (objet instanceof Cercle) {
      const P1 = pointIntersectionLC(ab, objet, '', 1)
      const P2 = pointIntersectionLC(ab, objet, '', 2)
      return ((P1 instanceof Point && P1.estSur(this)) || (P2 instanceof Point && P2.estSur(this)))
    }
    let I
    if (objet instanceof Droite) {
      I = pointIntersectionDD(ab, objet)
    } else {
      const cd = droite(objet.extremite1, objet.extremite2)
      I = pointIntersectionDD(ab, cd)
    }
    if (!I) return false
    else return I.estSur(objet) && I.estSur(this)
  }

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
    this.styleExtremites = styleExtremites
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
      case 5:
        tableauOptions.push(' dashed ')
        break
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

/**  Trace la demi-droite d'origine A passant par B
 * @param {Point} A Origine de la droite
 * @param {Point} B Point de la demi-droite, autre que l'origine
 * @param {string} [color = 'black'] Couleur de la demi-droite : du type 'blue' ou du type '#f15929'
 * @param {boolean} [extremites = false] Trace (ou pas) l'origine de la demi-droite
 * @property {string} color Couleur de la demi-droite. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
function DemiDroite (A, B, color = 'black', extremites = false) {
  ObjetMathalea2D.call(this, { })
  const B1 = pointSurSegment(B, A, -10)
  this.color = color
  if (extremites) return new Segment(A, B1, this.color, '|-')
  else return new Segment(A, B1, this.color)
}

/**  Trace la demi-droite d'origine A passant par B
 * @param {Point} A
 * @param {Point} B
 * @param {string} [color='black'] Facultatif, 'black' par défaut
 * @param {boolean} [extremites = false] Trace (ou pas) l'origine de la demi-droite
 * @example demiDroite(M, N) // Trace la demi-droite d'origine M passant par N et de couleur noire
 * @example demiDroite(M, N, 'blue', true) // Trace la demi-droite d'origine M passant par N et de couleur bleue, en traçant le trait signifiant l'origine de la demi-droite
 * @author Rémi Angot
 * @return {DemiDroite}
 */
// JSDOC Validee par EE Aout 2022
export function demiDroite (A, B, color = 'black', extremites = false) {
  return new DemiDroite(A, B, color, extremites)
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
 * @author Rémi Angot*
 * @class
 */
function Polygone (...points) {
  ObjetMathalea2D.call(this, { })
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
    if (typeof points[points.length - 1] === 'string') {
      this.color = points[points.length - 1]
      points.splice(points.length - 1, 1)
    }
    this.listePoints = points
    this.nom = this.listePoints.join()
    this.couleurDeRemplissage = colorToLatexOrHTML('none')
    this.hachures = false
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
  this.triangulation = function () { // retourne une liste de triangles pavant le polygone
    const flat = polygoneToFlatArray(this)
    const trianglesIndices = earcut(flat)
    const triangles = []
    for (let i = 0; i < trianglesIndices.length; i += 3) {
      triangles.push(polygone([point(flat[trianglesIndices[i] * 2], flat[trianglesIndices[i] * 2 + 1]), point(flat[trianglesIndices[i + 1] * 2], flat[trianglesIndices[i + 1] * 2 + 1]), point(flat[trianglesIndices[i + 2] * 2], flat[trianglesIndices[i + 2] * 2 + 1])]))
    }
    return triangles
  }
  this.aire = function () {
    const triangles = this.triangulation()
    let aire = 0
    for (let i = 0; i < triangles.length; i++) {
      aire += aireTriangle(triangles[i])
    }
    return aire
  }
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
      if (this.couleurDeRemplissage === '' || this.couleurDeRemplissage === undefined) {
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
      case 5:
        tableauOptions.push(' dashed ')
        break
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity=${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' && this.couleurDeRemplissage[1] !== 'none') {
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
 * @return {Polygone} objet Polygone
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
 * @return {array} [p, p.sommets]
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
 * Pour tracer le polygone régulier indirect de côté [AB], on iversera A et B
 * @param {Point} A
 * @param {Point} B
 * @param {integer} n Nombre de côtés
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
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
  return new Polygone(listePoints, color)
}

/**
 * Trace un carré
 * @param {Point} A Un sommet du carré
 * @param {Point} B Un sommet du carré, consécutif au précédent
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @example carre(M,N)
 *  // Trace le carré noir de sommets consécutifs M et N dans le sens direct
 * @example carre(N,M)
 *  // Trace le carré noir de sommets consécutifs M et N dans le sens indirect
 * @example carre(M,N,'blue')
 *  // Trace le carré bleu de sommets consécutifs M et N dans le sens direct
 * @return {polygoneRegulier}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function carre (A, B, color = 'black') {
  return polygoneRegulier(A, B, 4, color)
}

/**
 * Code un carré
 * @param {Polygone} c Carré à coder
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @param {string} [mark='x'] Symbole posé sur les côtés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageCarre (c, color = 'black', mark = '×') {
  const objets = []
  objets.push(codageSegments(mark, color, c.listePoints))
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

/**
 * Met un codage complet sur un carré
 * @param {Polygone} c Carré à coder
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @param {string} [mark='x'] Symbole posé sur les côtés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @example codageCarre(carre) // Code, en noir, le carré carre.
 * @example codageCarre(carre,'red','||') // Code, en rouge, le carré carre avec la marque || sur les côtés
 * @return {CodageCarre}
*/
// JSDOC Validee par EE Juin 2022
export function codageCarre (c, color = 'black', mark = '×') {
  return new CodageCarre(c, color, mark)
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
 * @class
 * @author Jean-Claude Lhote
 */
class Boite {
  constructor ({ Xmin = 0, Ymin = 0, Xmax = 1, Ymax = 1, color = 'black', colorFill = 'none', opaciteDeRemplissage = 0.7, texteIn = '', tailleTexte = 1, texteColor = 'black', texteOpacite = 0.7, texteMath = false, echelleFigure = 1 } = {}) {
    ObjetMathalea2D.call(this, { })
    this.forme = polygone([point(Xmin, Ymin), point(Xmax, Ymin), point(Xmax, Ymax), point(Xmin, Ymax)], color)
    this.bordures = this.forme.bordures
    if (colorFill !== 'none') {
      this.forme.couleurDeRemplissage = colorToLatexOrHTML(colorFill)
      this.forme.opaciteDeRemplissage = opaciteDeRemplissage
    }
    if (texteIn !== '') {
      if (texteIn.charAt(0) === '$') {
        this.texte = latexParCoordonnees(texteIn.replaceAll('$', ''), (Xmin + Xmax) / 2, (Ymin + Ymax) / 2, texteColor)
      } else {
        this.texte = texteParPositionEchelle(texteIn, (Xmin + Xmax) / 2, (Ymin + Ymax) / 2, 'milieu', texteColor, tailleTexte, 'middle', texteMath, echelleFigure)
        this.texte.opacite = texteOpacite
      }
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
/**
 * Crée un rectangle positionné horizontal/vertical avec possibilité d'écrire du texte dedans
 * @param {number} [Xmin = 0] abscisse du sommet en bas à gauche
 * @param {number} [Ymin = 0] ordonnée du sommet en bas à gauche
 * @param {number} [Xmax = 1] abscisse du sommet en haut à droite
 * @param {number} [Ymax = 1] ordonnée du sommet en haut à droite
 * @param {string} [color = 'black'] couleur du cadre
 * @param {string} [colorFill = 'none'] couleur de remplissage
 * @param {number} [opaciteDeRemplissage = 0.7] comme son nom l'indique utilisé si colorFill !== 'none'
 * @param {string} texteIn Texte à afficher (On peut passer du latex si texteIn commence et finit par $)
 * @param {number} [tailleTexte = 1] permet de modifier la taille du texteIn
 * @param {string} [texteColor = 'black'] permet de choisir la couleur du texteIn
 * @param {number} [texteOpacite = 0.7] indice d'opacité du texte de 0 à 1
 * @param {boolean} [texteMa = false] Si le texte n'est pas du latex, change la police pour mettre un style mathématique si true
 * @param {number} [echelleFigure = 1] permet de passer le scale utilisé dans la fonction mathalea2d afin d'adapter la taille du texte en latex
 * @return {Boite}
 * @author Rémi Angot et Frédéric Piou
 */
export function boite ({ Xmin = 0, Ymin = 0, Xmax = 1, Ymax = 1, color = 'black', colorFill = 'none', opaciteDeRemplissage = 0.7, texteIn = '', tailleTexte = 1, texteColor = 'black', texteOpacite = 0.7, texteMath = false, echelleFigure = 1 } = {}) {
  return new Boite({ Xmin: Xmin, Ymin: Ymin, Xmax: Xmax, Ymax: Ymax, color: color, colorFill: colorFill, opaciteDeRemplissage: opaciteDeRemplissage, texteIn: texteIn, tailleTexte: tailleTexte, texteColor: texteColor, texteOpacite: texteOpacite, texteMath: texteMath, echelleFigure: echelleFigure })
}

/**
 * @param {Polygone} P
 * @return {number[]} retourne la liste des coordonnées des sommets de P dans un seul tableau.
 * @author Jean-Claude Lhote
 */
export function polygoneToFlatArray (P) {
  const flatArray = []
  for (let i = 0; i < P.listePoints.length; i++) {
    flatArray.push(P.listePoints[i].x, P.listePoints[i].y)
  }
  return flatArray
}
/**
 *
 * @param {number[]} [data = []] tableau à une seule dimension (flat array) contenant les coordonnées des sommets (extérieurs et intérieurs) du polygone
 * @param {number[]} [holes = []] tableau à une seule dimension contenant les indices des points qui démarrent un 'trou' dans le tableau data (exemple : holes = [4, 8] indique que les points 4 à 7 définissent un trou ainsi que 8 et suivants, donc les coordonnées 8 à 15 et 16 à ...(ne pas oublier que 1 point = 2 coordonnées))
 * @param {string} [noms = ''] chaine donnant les noms des sommets
 * @param {string} [color = 'black'] couleur du polygone
 * @param {string} [couleurDeRemplissage = ' blue'] la couleur de remplissage
 * @param {string} [couleurDeFond = 'white'] la couleur des trous
 * @class
 */
function PolygoneATrous ({ data = [], holes = [], noms = '', color = 'black', couleurDeRemplissage = 'blue', couleurDeFond = 'white' }) {
  ObjetMathalea2D.call(this, { })
  const triangles = earcut(data, holes) // on crée le pavage de triangles grâce à Mapbox/earcut
  this.triangulation = function () { // retourne la liste de triangles 2d.
    const triangles2d = []
    for (let i = 0, triangle; i < triangles.length; i += 3) {
      triangle = polygone([point(data[triangles[i] * 2], data[triangles[i] * 2 + 1]), point(data[triangles[i + 1] * 2], data[triangles[i + 1] * 2 + 1]), point(data[triangles[i + 2] * 2], data[triangles[i + 2] * 2 + 1])])
      triangle.color = colorToLatexOrHTML(color)
      triangle.couleurDeRemplissage = colorToLatexOrHTML('none')
      triangles2d.push(triangle)
    }
    return triangles2d
  }
  const sommetsContour = [] // on crée le polygone extérieur
  for (let i = 0; i < 2 * holes[0]; i += 2) {
    sommetsContour.push(point(data[i], data[i + 1]))
    if (noms.length >= data.length << 1) {
      sommetsContour[i >> 1].nom = noms[i << 1]
    }
  }
  // On cherche les bordures
  for (let i = 0, xmin = 1000, xmax = -1000, ymin = 1000, ymax = -1000; i < data.length; i += 2) {
    xmin = Math.min(xmin, data[i])
    xmax = Math.max(xmax, data[i])
    ymin = Math.min(ymin, data[i + 1])
    ymax = Math.max(ymax, data[i + 1])
    this.bordures = [xmin, ymin, xmax, ymax]
  }
  this.contour = polygone(...sommetsContour)
  this.trous = []
  this.color = color
  this.couleurDeRemplissage = couleurDeRemplissage
  this.contour.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.contour.color = colorToLatexOrHTML(this.color)
  this.couleurDeFond = couleurDeFond
  const trous = []
  let trou, trouPol
  for (let i = 0; i < holes.length; i++) {
    trous[i] = []
    for (let j = holes[i] * 2; j < (i !== holes.length - 1 ? holes[i + 1] * 2 : data.length); j += 2) {
      trou = point(data[j], data[j + 1])
      if (noms.length >= data.length >> 1) {
        trou.nom = noms[j >> 1]
      }
      trous[i].push(trou)
    }
    trouPol = polygone(...trous[i])
    trouPol.color = colorToLatexOrHTML(this.color)
    trouPol.couleurDeRemplissage = colorToLatexOrHTML(this.couleurDeFond)
    this.trous.push(trouPol)
  }
  this.aire = function () { // retourne l'aire du polygone à trou
    let aire = this.contour.aire()
    for (let i = 0; i < this.trous.length; i++) {
      aire -= this.trous[i].aire()
    }
    return aire
  }
  this.svg = function (coeff) {
    let code = this.contour.svg(coeff)
    for (let i = 0; i < this.trous.length; i++) {
      code += this.trous[i].svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = this.contour.tikz()
    for (let i = 0; i < this.trous.length; i++) {
      code += '\n\t' + this.trous[i].tikz()
    }
    return code
  }
}
/**
 * Cet objet permet de créer un polygone avec une surface contenant des 'trous' eux-mêmes polygonaux
 * cerise sur le gâteau, la propriété this.triangulation fournit une liste de triangles pavant le polygone
 * @param {number[]} [data = []] contient la liste des coordonnées des sommets (contour puis trous) 2 coordonnées par point dans l'ordre abscisse, ordonnée
 * @param {number[]}  [holes = []] tableau à une seule dimension contenant les indices des points qui démarrent un 'trou' dans le tableau data (exemple : holes = [4, 8] indique que les points 4 à 7 définissent un trou ainsi que 8 et suivants, donc les coordonnées 8 à 15 et 16 à ...(ne pas oublier que 1 point = 2 coordonnées))
 * @param {string} [noms = ''] contient les noms des sommets
 * @param {string} [color = 'black'] est la couleur des bords
 * @param {string} [couleurDeRemplissage = 'blue'] est la couleur de la surface
 * @param {string} [couleurDeFond = 'white'] est la couleur de remplissage des trous
 * @return {PolygoneaTrou} un polygone à trous (ou pas : il peut ne pas y avoir de trou !)
 */
export function polygoneATrous ({ data = [], holes = [], noms = '', color = 'black', couleurDeRemplissage = 'blue', couleurDeFond = 'white' }) {
  return new PolygoneATrous({ data, holes, noms, color, couleurDeRemplissage, couleurDeFond })
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
 * @return {objet} {triangle, pied}
 */
export function triangle2points1hauteur (A, B, h, d, n = 1, color = 'black') {
  if (d === undefined) {
    d = randint(0, floor(longueur(A, B)))
  }
  const H = pointSurSegment(A, B, d)
  const C = similitude(A, H, 90 * (3 - n * 2), h / longueur(A, H))
  return { triangle: polygone([A, B, C], color), pied: H }
}

/**
 * @param {Point} A
 * @param {Point} B
 * @param {number} l1
 * @param {number} l2
 * @param {number} [n=1] Si n = 1 (défaut), C a la plus grande ordonnée possible, si n = 2, C a la plus petite ordonnée possible
 * @return {Polygone} objet Polygone ABC
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
  return polygone([A, B, C], color)
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
  return polygone([A, B, C], color)
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
  return polygone([A, B, Q], color)
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
  return polygone([A, B, M], color)
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
 * @return {polygoneAvecNom}
 */
export function parallelogramme3points (NOM, A, B, C, color = 'black') {
  const D = translation(A, vecteur(B, C), NOM[3])
  A.nom = NOM[0]
  B.nom = NOM[1]
  C.nom = NOM[2]
  return polygoneAvecNom([A, B, C, D], color)
}
/**
 * parallelogramme2points1hauteur(A,B,5) renvoie un parallélogramme ABCD de base [AB] et de hauteur h
 * parallelogramme2points1hauteur(A,7,5) renvoie un parallélogramme ABCD de base 7cm (le point B est choisi sur le cercle de centre A et de rayon 7cm) et de hauteur h
 *
 * @param {String} NOM
 * @param {objet} A
 * @param {objet} B
 * @param {number} h
 * @return {polygoneAvecNom}
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
  return polygoneAvecNom([A, B, C, D], color)
}

/**
 * nommePolygone (p,'ABCDE',0.5,'red') nomme les sommets du polygone p. Les labels sont placés à une distance paramètrable en cm des sommets (0.5 par défaut)
 * @author Jean-Claude Lhote
 */
function NommePolygone (p, nom = '', k = 0.5, color = 'black') {
  ObjetMathalea2D.call(this, { })
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
      code += '\n\t' + texteParPoint(p.listePoints[i].nom, P, 'milieu', 'black', 1, 'middle', true).svg(coeff)
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

/**  Déplace les labels des sommets d'un polygone s'ils sont mal placés nativement
 * @param {Polygone} p Polygone sur lequel les labels de ses sommets sont mal placés
 * @param {string} nom Points mal placés sous la forme, par exemple, 'AB'. Chaque point doit être représenté par un SEUL caractère.
 * @param {string} positionLabel Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
 * @example deplaceLabel(p1,'MNP','below') // S'il y a des points nommés 'M', 'N' ou 'P' dans le polygone p1, leur nom sera mis en dessous du point.
 * // Ne fonctionne pas avec les points du type A1 ou A_1.
 * @author Rémi Angot
 */
// JSDOC Validee par EE Aout 2022
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
 * Retourne l'aire du triangle si p est un triangle, false sinon.
 * @param {Polygone} p Triangle
 * @example aireTriangle(poygone(A,B,C)) // Retourne l'aire du triangle ABC
 * @example aireTriangle(poygone(A,B,C,D)) // Retourne false car le polygone n'est pas un triangle
 * @author Jean-Claude Lhote
 * @return {boolean|number}
 */
// JSDOC Validee par EE Juin 2022
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
 * Construit le cercle (ou le disque) de centre O, de rayon r
 * @param {Point} O Centre du cercle
 * @param {number} r Rayon du cercle
 * @param {string} [color = 'black'] Couleur du cercle ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [couleurDeRemplissage = 'none'] Couleur de remplissage ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {number} [epaisseur = 1] Epaisseur du cercle
 * @param {number} [pointilles = 0] Style des pointillés du cercle (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @param {number} [opacite = 1] Opacité du cercle
 * @param {number} [opaciteDeRemplissage = 1.1] Opacité du disque si couleur de remplissage choisie.
 * @param {number} [epaisseurDesHachures = 1] Epaisseur des hachures si couleur de hachures choisie.
 * @param {number} [distanceDesHachures = 10] Distance des hachures si couleur de remplissage choisie.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} centre Centre du cercle
 * @property {number} rayon Rayon du cercle
 * @property {string} color Couleur du cercle ou 'none'. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur de remplissage ou 'none'. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} epaisseur Epaisseur du cercle
 * @property {number} pointilles Style des pointillés du cercle (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {number} opacite Opacité du cercle
 * @property {number} opaciteDeRemplissage Opacité du disque si couleur de remplissage choisie.
 * @property {string} hachures Hachures ou pas ?
 * @property {string} couleurDesHachures Couleur des hachures ou 'none'. À associer obligatoirement à colorToLatexOrHTML(). Si 'none' ou '', pas de hachures.
 * @property {number} epaisseurDesHachures Epaisseur des hachures si couleur de hachures choisie.
 * @property {number} distanceDesHachures Distance des hachures si couleur de remplissage choisie.
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
function Cercle (O, r, color = 'black', couleurDeRemplissage = 'none', couleurDesHachures = 'none', epaisseur = 1, pointilles = 0, opacite = 1, opaciteDeRemplissage = 1.1, epaisseurDesHachures = 1, distanceDesHachures = 10) {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.centre = O
  this.rayon = r
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.hachures = couleurDesHachures !== 'none' && couleurDesHachures !== ''
  this.couleurDesHachures = colorToLatexOrHTML(couleurDesHachures)
  this.epaisseurDesHachures = epaisseurDesHachures
  this.distanceDesHachures = distanceDesHachures
  this.bordures = [O.x - r, O.y - r, O.x + r, O.y + r]
  this.epaisseur = epaisseur
  this.pointilles = pointilles
  this.opacite = opacite

  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
      case 5:
        tableauOptions.push(' dashed ')
        break
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' && this.couleurDeRemplissage[1] !== 'none') {
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
 * Construit le cercle (ou le disque) de centre O, de rayon r
 * @param {Point} O Centre du cercle
 * @param {number} r Rayon du cercle
 * @param {string} [color = 'black'] Couleur du cercle ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [couleurDeRemplissage = 'none'] Couleur de remplissage ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {number} [epaisseur = 1] Epaisseur du cercle
 * @param {number} [pointilles = 0] Style des pointillés du cercle (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @param {number} [opacite = 1] Opacité du cercle
 * @param {number} [opaciteDeRemplissage = 1.1] Opacité du disque si couleur de remplissage choisie.
 * @param {number} [epaisseurDesHachures = 1] Epaisseur des hachures si couleur de hachures choisie.
 * @param {number} [distanceDesHachures = 10] Distance des hachures si couleur de remplissage choisie.
 * @example cercle (A,5)
 * // Construit un cercle c1 noir de centre A et de rayon 5
 * @example cercle (A,5,'red','blue','#f15929',3,2,0.3,0.8)
 * // Construit un disque de centre A et de rayon 5, de bord rouge à 30 % d'opacité et en pointillés, rempli en bleu à 80 % d'opacité, et avec des hachures orange de 1 d'épaisseur et avec 10 d'écart entre deux hachures
 * @example cercle (A,5,'red','blue','#f15929',3,2,0.3,0.8,2,12)
 * // Construit un disque de centre A et de rayon 5, de bord rouge à 30 % d'opacité et en pointillés, rempli en bleu à 80 % d'opacité, et avec des hachures orange de 2 d'épaisseur et avec 12 d'écart entre deux hachures
 * @return {Cercle}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function cercle (O, r, color = 'black', couleurDeRemplissage = 'none', couleurDesHachures = 'none', epaisseur = 1, pointilles = 0, opacite = 1, opaciteDeRemplissage = 1.1, epaisseurDesHachures = 1, distanceDesHachures = 10) {
  return new Cercle(O, r, color, couleurDeRemplissage, couleurDesHachures, epaisseur, pointilles, opacite, opaciteDeRemplissage, epaisseurDesHachures, distanceDesHachures)
}

/**  Trace l'ellipse de centre O et de rayon rx et ry (la construction, dite “par réduction d’ordonnée”, montre que l'ellipse est la transformée de Newton de 2 cercles concentriques)
 * @param {Point} O Centre de l'ellipse
 * @param {number} rx Premier rayon de l'ellipse
 * @param {number} ry Second rayon de l'ellipse
 * @param {string} [color = 'black'] Couleur de l'ellipse : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} centre Centre du cercle
 * @property {number} rx Premier rayon de l'ellipse
 * @property {number} ry Second rayon de l'ellipse
 * @property {string} color Couleur de l'ellipse. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur de remplissage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Opacité de l'ellipse si couleur de remplissage choisie.
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
function Ellipse (O, rx, ry, color = 'black') {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.centre = O
  this.rx = rx
  this.ry = ry
  this.couleurDeRemplissage = colorToLatexOrHTML('none')
  this.opaciteDeRemplissage = 1
  this.bordures = [O.x - rx, O.y - ry, O.x + rx, O.y + ry]
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
      case 5:
        tableauOptions.push(' dashed ')
        break
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
    }
    if (this.couleurDeRemplissage !== '' && this.couleurDeRemplissage[1] !== 'none') {
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

/**  Trace l'ellipse de centre O et de rayon rx et ry (la construction, dite “par réduction d’ordonnée”, montre que l'ellipse est la transformée de Newton de 2 cercles concentriques)
 * @param {Point} O Centre de l'ellipse
 * @param {number} rx Premier rayon de l'ellipse
 * @param {number} ry Second rayon de l'ellipse
 * @param {string} [color = 'black'] Couleur de l'ellipse : du type 'blue' ou du type '#f15929'
 * @example ellipse(M, 1, 3) // Trace, en noir, l'ellipse de centre M et de rayons 1 et 3
 * @example ellipse(M, 1, 3, 'red') // Trace, en rouge, l'ellipse de centre M et de rayons 1 et 3
 * @author Rémi Angot
 * @return {Ellipse}
 */
// JSDOC Validee par EE Aout 2022
export function ellipse (O, rx, ry, color = 'black') {
  return new Ellipse(O, rx, ry, color)
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
  if (egal(b, 0, 0.000001)) {
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
 * Construit le cercle (ou le disque) de centre O, passant par M
 * @param {Point} O Centre du cercle
 * @param {number} M Point du cercle
 * @param {string} [color = 'black'] Couleur du cercle ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [couleurDeRemplissage = 'none'] Couleur de remplissage ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {number} [epaisseur = 1] Epaisseur du cercle
 * @param {number} [pointilles = 0] Style des pointillés du cercle (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @param {number} [opacite = 1] Opacité du cercle
 * @param {number} [opaciteDeRemplissage = 1.1] Opacité du disque si couleur de remplissage choisie.
 * @param {number} [epaisseurDesHachures = 1] Epaisseur des hachures si couleur de hachures choisie.
 * @param {number} [distanceDesHachures = 10] Distance des hachures si couleur de remplissage choisie.
 * @example cercleCentrePoint (A,B)
 * // Construit un cercle c1 noir de centre A, passant par B
 * @example cercleCentrePoint (A,B,'red','blue','#f15929',3,2,0.3,0.8)
 * // Construit un disque de centre A, passant par B, de bord rouge à 30 % d'opacité et en pointillés, rempli en bleu à 80 % d'opacité, et avec des hachures orange de 1 d'épaisseur et avec 10 d'écart entre deux hachures
 * @example cercleCentrePoint (A,B,'red','blue','#f15929',3,2,0.3,0.8,2,12)
 * // Construit un disque de centre A, passant par B, de bord rouge à 30 % d'opacité et en pointillés, rempli en bleu à 80 % d'opacité, et avec des hachures orange de 2 d'épaisseur et avec 12 d'écart entre deux hachures
 * @return {Cercle}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function cercleCentrePoint (O, M, color = 'black', couleurDeRemplissage = 'none', couleurDesHachures = 'none', epaisseur = 1, pointilles = 0, opacite = 1, opaciteDeRemplissage = 1.1, epaisseurDesHachures = 1, distanceDesHachures = 10) {
  return new Cercle(O, longueur(O, M), color, couleurDeRemplissage, couleurDesHachures, epaisseur, pointilles, opacite, opaciteDeRemplissage, epaisseurDesHachures, distanceDesHachures)
}

/** Trace un arc de cercle, connaissant une extrémité, son centre et la mesure de l'angle
 * @param {Point} M Extrémité de départ de l'arc
 * @param {Point} Omega Centre de l'arc
 * @param {number} angle Mesure de l'angle compris entre -360 et 360 (valeur négative = sens indirect)
 * @param {boolean} [rayon = false] Booléen. Si true, les rayons délimitant l'arc sont ajoutés.
 * @param {string} [couleurDeRemplissage = 'none'] Couleur ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage = 0.2] Opacité de remplissage de 0 à 1.
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none', pas de hachures.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de l'arc ou 'none'. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur ou 'none'. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Opacité de remplissage de 0 à 1.
 * @property {string} hachures Hachures ou pas ?
 * @property {string} couleurDesHachures Couleur des hachures ou 'none'. À associer obligatoirement à colorToLatexOrHTML(). Si 'none' ou '', pas de hachures.
 * @property {number} [opacite = 1] Opacité du cercle de 0 à 1.
 * @property {number} [epaisseurDesHachures = 1] Epaisseur des hachures si couleur de hachures choisie.
 * @property {number} [distanceDesHachures = 10] Distance des hachures si couleur de remplissage choisie.
 * @property {number} [pointilles = 0] Type de pointillés choisis (entre 1 et 5). Si autre nombre, pas de pointillés.
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Jean-Claude Lhote
 * @class
 **/
// JSDOC Validee par EE Juin 2022
function Arc (M, Omega, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2, couleurDesHachures = 'none') {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.opacite = 1
  this.hachures = couleurDesHachures !== 'none' && couleurDesHachures !== ''
  this.couleurDesHachures = colorToLatexOrHTML(couleurDesHachures)
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  this.pointilles = 0
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
        case 5:
          this.style += ' stroke-dasharray="5 5" '
          break
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
        if (this.couleurDeRemplissage === '' || this.couleurDeRemplissage === undefined) {
          this.style += ' fill="none" '
        } else {
          this.style += ` fill="${this.couleurDeRemplissage[0]}" `
          this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
        }
        return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${l * coeff} ${l * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${Omega.xSVG(coeff)} ${Omega.ySVG(coeff)} Z" stroke="${this.color[0]}" ${this.style}/>`
      }
    }
  } else {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }
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
        case 5:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      if (this.couleurDeRemplissage === '' || this.couleurDeRemplissage === undefined) {
        this.style += ' fill="none" '
      } else {
        this.style += ` fill="${this.couleurDeRemplissage[0]}" `
        this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
      }
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
      case 5:
        tableauOptions.push(' dashed ')
        break
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

/** Trace un arc de cercle, connaissant une extrémité, son centre et la mesure de l'angle
 * @param {Point} M Extrémité de départ de l'arc
 * @param {Point} Omega Centre de l'arc
 * @param {number} angle Mesure de l'angle compris entre -360 et 360 (valeur négative = sens indirect)
 * @param {boolean} [rayon = false] Booléen. Si true, les rayons délimitant l'arc sont ajoutés.
 * @param {string} [couleurDeRemplissage = 'none'] Couleur ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage = 0.2] Opacité de remplissage de 0 à 1.
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none', pas de hachures.
 * @example arc(M,0,35)
  // Trace l'arc en noir de centre 0, d'extrémité M et d'angle orienté 35° (sans remplissage et sans hachures)
 * @example arc(M,O,true,-40,'red','green',0.8,'white')
  // Trace l'arc en vert de centre 0, d'extrémité M et d'angle orienté -40°, rempli en rouge à 80 %, avec des hachures blanches
 * @return {Arc}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022
export function arc (M, Omega, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2, couleurDesHachures = 'none') {
  return new Arc(M, Omega, angle, rayon, couleurDeRemplissage, color, opaciteDeRemplissage, couleurDesHachures)
}

/** Trace un arc de cercle, connaissant deux extrémités et la mesure de l'angle
 * @param {Point} M Première extrémité de l'arc
 * @param {Point} N Deuxième extrémité de l'arc
 * @param {number} angle Mesure de l'angle compris entre -360 et 360 (valeur négative = sens indirect)
 * @param {boolean} [rayon = false] Booléen. Si true, les rayons délimitant l'arc sont ajoutés.
 * @param {boolean} [couleurDeRemplissage = 'none'] Couleur ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage = 0.2] Opacité de remplissage de 0 à 1.
 * @param {string} [couleurDesHachures = 'none'] Couleur des hachures ou 'none' : du type 'blue' ou du type '#f15929' Si 'none', pas de hachures.
 * @example arcPointPointAngle(A,B,35)
  // Trace l'arc en noir d'extrémités A et B (dans cet ordre) et d'angle orienté 35° (sans remplissage et sans hachures)
 * @example arcPointPointAngle(A,B,true,-40,'red','green',0.8,'white')
  // Trace l'arc en vert d'extrémités A et B (dans cet ordre) et d'angle orienté -40°, rempli en rouge à 80 %, avec des hachures blanches
 * @return {Arc}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022
export function arcPointPointAngle (M, N, angle, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2, couleurDesHachures = 'none') {
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
  return new Arc(M, Omega, angle, rayon, couleurDeRemplissage, color, opaciteDeRemplissage)
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
  pointilles = ''
) {
  const B = rotation(A, O, -angle / 2)
  const a = arc(B, O, angle, false)
  a.epaisseur = epaisseur
  a.opacite = opacite
  a.color = colorToLatexOrHTML(color)
  a.pointilles = pointilles
  return a
}
/**
 * @param {Point} centre centre de l'ellipse
 * @param {number} Rx rayon en X
 * @param {number} Ry rayon en Y
 * @param {string} hemisphere 'nord' pour tracer au dessus du centre, 'sud' pour tracer en dessous
 * @param {boolean | number} pointilles Si false, l'ar est en trait plein, sinon en pointillés
 * @param {boolean} rayon Si true, alors l'arc est fermé par un segment.
 * @param {string} color Facultatif, 'black' par défaut
 * @param {string} couleurDeRemplissage si 'none' alors pas de remplissage.
 * @param {number} opaciteDeRemplissage Transparence de remplissage de 0 à 1. Facultatif, 0.2 par défaut
 * @author Jean-Claude Lhote
 * @return {SemiEllipse} Objet SemiEllipse
 */
function SemiEllipse ({ centre, Rx, Ry, hemisphere = 'nord', pointilles = false, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.opaciteDeRemplissage = opaciteDeRemplissage
  this.hachures = false
  this.couleurDesHachures = colorToLatexOrHTML('black')
  this.epaisseurDesHachures = 1
  this.distanceDesHachures = 10
  this.pointilles = pointilles
  const angle = hemisphere === 'nord' ? 180 : -180
  const M = point(centre.x + Rx, centre.y)
  const med = homothetie(rotation(M, centre, angle / 2), centre, Ry / Rx)

  let large = 0; let sweep = 0
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
  const N = rotation(M, centre, angle)
  this.bordures = [Math.min(M.x, N.x, med.x) - 0.1, Math.min(M.y, N.y, med.y) - 0.1, Math.max(M.x, N.x, med.x) + 0.1, Math.max(M.y, N.y, med.y) + 0.1]
  if (rayon) {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }

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
        case 5:
          this.style += ' stroke-dasharray="5 5" '
          break
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
        }) + `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${Rx * coeff} ${Ry * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${centre.xSVG(coeff)} ${centre.ySVG(coeff)} Z" stroke="${this.color[0]}"  ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
      } else {
        if (this.opacite !== 1) {
          this.style += ` stroke-opacity="${this.opacite}" `
        }
        if (this.couleurDeRemplissage !== 'none') {
          this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
        }

        return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${Rx * coeff} ${Ry * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)} L ${centre.xSVG(coeff)} ${centre.ySVG(coeff)} Z" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" ${this.style}/>`
      }
    }
  } else {
    this.svg = function (coeff) {
      this.style = ''
      if (this.epaisseur !== 1) {
        this.style += ` stroke-width="${this.epaisseur}" `
      }

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
        case 5:
          this.style += ' stroke-dasharray="5 5" '
          break
      }
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `

      return `<path d="M${M.xSVG(coeff)} ${M.ySVG(coeff)} A ${Rx * coeff} ${Ry * coeff} 0 ${large} ${sweep} ${N.xSVG(coeff)} ${N.ySVG(coeff)}" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" ${this.style} id="${this.id}" />`
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
      case 5:
        tableauOptions.push(' dashed ')
        break
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    if ((this.couleurDeRemplissage !== 'none' || this.couleurDeRemplissage !== '')) {
      tableauOptions.push(`fill opacity = ${this.opaciteDeRemplissage}`)
      tableauOptions.push(`fill = ${this.couleurDeRemplissage[1]}`)
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
    if (couleurDeRemplissage !== 'none') return `\\filldraw  ${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}]; -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}];`
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
    const r = longueur(centre, M)
    for (let k = 0, variation; abs(k) <= abs(angle) - 2; k += angle < 0 ? -2 : 2) {
      variation = (random(0, 2) - 1) / r * amp / 10
      P = rotation(homothetie(M, centre, 1 + variation), centre, k)
      code += `${round(P.xSVG(coeff), 2)} ${round(P.ySVG(coeff), 2)}, `
      compteur++
    }
    P = rotation(M, centre, angle)
    if (compteur % 2 === 0) code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}, ` // Parce qu'on utilise S et non C dans le path
    code += `${P.xSVG(coeff)} ${P.ySVG(coeff)}`
    code += `" stroke="${this.color[0]}" ${this.style}/>`
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
    if (this.couleurDeRemplissage[1] !== 'none') return `\\filldraw  ${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}]; -- cycle ;`
    else return `\\draw${optionsDraw} (${M.x},${M.y}) arc [start angle=0, end angle = ${angle}, x radius = ${Rx}, y radius = ${Ry}];`
  }
}

/**
 * @param {Point} centre centre de l'ellipse
 * @param {number} Rx rayon en X
 * @param {number} Ry rayon en Y
 * @param {string} hemisphere 'nord' pour tracer au dessus du centre, 'sud' pour tracer en dessous
 * @param {boolean | number} pointilles Si false, l'ar est en trait plein, sinon en pointillés
 * @param {boolean} rayon Si true, alors l'arc est fermé par un segment.
 * @param {string} color Facultatif, 'black' par défaut
 * @param {string} couleurDeRemplissage si 'none' alors pas de remplissage.
 * @param {number} opaciteDeRemplissage Transparence de remplissage de 0 à 1. Facultatif, 0.2 par défaut
 * @author Jean-Claude Lhote
 * @return {SemiEllipse} Objet SemiEllipse
 */
export function semiEllipse ({ centre, Rx, Ry, hemisphere = 'nord', pointilles = false, rayon = false, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  return new SemiEllipse({ centre, Rx, Ry, hemisphere, pointilles, rayon, couleurDeRemplissage, color, opaciteDeRemplissage })
}

/**
 * Trace un cône
 * @param {Point} centre Centre de la base
 * @param {number} Rx Rayon sur l'axe des abscisses
 * @param {number} hauteur Distance verticale entre le centre et le sommet.
 * @param {string} [color = 'black'] Facultatif, 'black' par défaut
 * @param {string} [couleurDeRemplissage = 'none'] none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage = 0.2] Taux d'opacité du remplissage
 * @author Jean-Claude Lhote
 * @private
 */
function Cone ({ centre, Rx, hauteur, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  ObjetMathalea2D.call(this, { })
  const sommet = point(centre.x, centre.y + hauteur)
  this.color = color
  this.couleurDeRemplissage = couleurDeRemplissage
  this.opaciteDeRemplissage = opaciteDeRemplissage
  const objets = [
    semiEllipse({ centre, Rx, Ry: Rx / 3, hemisphere: 'nord', rayon: false, pointilles: 1, couleurDeRemplissage, color: this.color, opaciteDeRemplissage }),
    semiEllipse({ centre, Rx, Ry: Rx / 3, hemisphere: 'sud', rayon: false, pointilles: false, couleurDeRemplissage, color: this.color, opaciteDeRemplissage }),
    segment(point(centre.x + Rx, centre.y + 0.1), sommet, this.color),
    segment(point(centre.x - Rx, centre.y + 0.1), sommet, this.color)
  ]

  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      objet.color = colorToLatexOrHTML(this.color)
      code += objet.svg(coeff) + '\n'
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      objet.color = this.color
      code += objet.tikz() + '\n\t'
    }
    return code
  }
}

// Cette fonction donne un rendu correct que si la hauteur est suffisamment grande
export function cone ({ centre, Rx, hauteur, couleurDeRemplissage = 'none', color = 'black', opaciteDeRemplissage = 0.2 }) {
  return new Cone({ centre, Rx, hauteur, couleurDeRemplissage, color, opaciteDeRemplissage })
}
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%% LES COURBES DE BÉZIER %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/* INUTLISEE - A SUPPRIMER ?
function CourbeDeBezier (A, B, C) {
   ObjetMathalea2D.call(this, { })
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
*/

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%% LES TRANSFORMATIONS %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

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

function Rapporteur ({ x = 0, y = 0, taille = 7, depart = 0, semi = false, avecNombre = 'deuxSens', precisionAuDegre = 1, stepGraduation = 10, rayonsVisibles = true, color = 'gray' }) {
  ObjetMathalea2D.call(this, { })
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
 * sens Le sens (+1 ou -1) de la rotation. +1=sens trig
 */
function SensDeRotation (A1, centre, sens, color = 'black') {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const arc1 = arc(A1, centre, 20 * sens)
  arc1.color = colorToLatexOrHTML(color)
  const A2 = rotation(A1, centre, 20 * sens)
  const F1 = similitude(A2, centre, -5 * sens, 0.95)
  const F2 = similitude(A2, centre, -5 * sens, 1.05)
  const s1 = segment(A2, F1, color)
  const s2 = segment(A2, F2, color)
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
export function sensDeRotation (A, O, sens, color = 'black') {
  return new SensDeRotation(A, O, sens, color)
}
/** Construit l'image d'un objet par homothétie
 * @param {Point|Segment|Droite|Polygone|Vecteur} Objet Objet MathAlea2d choisi parmi un point, un segment, une droite, un polygone ou un vecteur
 * @param {oint} O Centre de l'homothétie
 * @param {number} k Rapport de l'homothétie
 * @param {string} [nom = ''] Nom du point-image
 * @param {string} [positionLabel = 'above'] Position du point-image. Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
 * @param {string} [color='black']  Couleur de l'image : du type 'blue' ou du type '#f15929' (non valable pour un point et pour un vecteur)
 * @example p2 = homothetie(p1 ,I ,2)
 * // p2 est l'image de p1 par une homothétie de centre I et de rapport 2
 * @example N = homothetie(M, I, 0.5, 'point N', 'right')
 * // N est l'image de M par une homothétie de centre I et de rapport 0.5.  Le point sera affiché comme "point N" et ce nom sera écrit à droite de sa position.
 * @example s = homothetie(segment(A, B), I, -0.5, '', '','blue')
 * // s est l'image du segment [AB] par une homothétie de centre I et de rapport -0.5.  s sera en bleu.
 * @author Rémi Angot
 * @return {Point|Segment|Droite|Polygone|Vecteur}
 */
export function homothetie (Objet, O, k, nom = '', positionLabel = 'above', color = 'black') {
  if (Objet.constructor === Point) {
    const x = O.x + k * (Objet.x - O.x)
    const y = O.y + k * (Objet.y - O.y)
    return new Point(x, y, nom, positionLabel)
  }
  if (Objet.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < Objet.listePoints.length; i++) {
      p2[i] = homothetie(Objet.listePoints[i], O, k)
      p2[i].nom = Objet.listePoints[i].nom + '\''
    }
    return polygone(p2, color)
  }
  if (Objet.constructor === Droite) {
    const M = homothetie(point(Objet.x1, Objet.y1), O, k)
    const N = homothetie(point(Objet.x2, Objet.y2), O, k)
    return droite(M, N, '', color)
  }
  if (Objet.constructor === Segment) {
    const M = homothetie(Objet.extremite1, O, k)
    const N = homothetie(Objet.extremite2, O, k)
    const s = segment(M, N, color)
    s.styleExtremites = Objet.styleExtremites
    return s
  }
  if (Objet.constructor === Vecteur) {
    const x = Objet.x
    const y = Objet.y
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

/**  Donne la distance entre le point A et la droite d
 * @param {point} A
 * @param {droite} d
 * @example distancePointDroite (M, d1) // Retourne la distance entre le point M et la droite d1
 * @author Jean-Claude Lhote
 * @return {longueur}
 */
// JSDOC Validee par EE Aout 2022
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
 * Construit l'image d'un objet par affinité orthogonale
 * @param {Point|Segment|Droite|Polygone|Vecteur} Objet Objet MathAlea2d choisi parmi un point, un segment, une droite, un polygone ou un vecteur
 * @param {number} d Direction de l'affinité
 * @param {number} k Rapport de l'affinité
 * @param {string} [nom=''] Nom de l'image (uniquement valable pour un point)
 * @param {string} [positionLabel = 'above'] Position de l'image (uniquement valable pour un point)
 * @param {string} [color='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929' (non valable pour un point et pour un vecteur)
 * @author Jean-Claude Lhote
 * @example p2 = affiniteOrtho(p1,droite(B, C),k)
 * // p2 est l'image de p1 par une affinité orthogonale dont la direction est la droite (BC) et de rapport k
 * @example N = affiniteOrtho(M,d,0.5,'point N','right')
 * // N est l'image du point M par une affinité orthogonale de direction d et de rapport 0.5. Le point sera affiché comme "point N" et ce nom sera écrit à droite de sa position.
 * @example s = affiniteOrtho(segment(A, B),d,0.1,'','','red')
 * // s est l'image du segment [AB] par une affinité orthogonale de direction d et de rapport 0.1. s sera rouge.
 * @return {Point|Segment|Droite|Polygone|Vecteur} Retourne un objet du même type que le paramètre objet de la fonction
 */
// JSDOC Validee par EE Juin 2022
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
    return new Point(x, y, nom, positionLabel)
  }
  if (A.constructor === Polygone) {
    const p2 = []
    for (let i = 0; i < A.listePoints.length; i++) {
      p2[i] = affiniteOrtho(A.listePoints[i], d, k)
      p2[i].nom = A.listePoints[i].nom + '\''
    }
    return new Polygone(p2, color)
  }
  if (A.constructor === Droite) {
    const M = affiniteOrtho(point(A.x1, A.y1), d, k)
    const N = affiniteOrtho(point(A.x2, A.y2), d, k)
    return new Droite(M, N, color)
  }
  if (A.constructor === Segment) {
    const M = affiniteOrtho(A.extremite1, d, k)
    const N = affiniteOrtho(A.extremite2, d, k)
    return new Segment(M, N, color, A.styleExtremites)
  }
  if (A.constructor === Vecteur) {
    let O
    if (egal(b, 0)) {
      O = point(-c / a, 0)
    } else O = point(0, -c / b)
    const M = translation(O, A)
    const N = affiniteOrtho(M, d, k)
    return new Vecteur(O, N)
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
 * Crée le centre de gravité du triangle ABC
 * @param {Point} A Premier sommet du triangle
 * @param {Point} B Deuxième sommet du triangle
 * @param {Point} C Troisième sommet du triangle
 * @param {string} [nom=''] Nom du centre
 * @param {string} [positionLabel = 'above'] Position du nom par rapport au point
 * @example G = centreGraviteTriangle(F,C,N)
 * // Crée G, le centre de gravité du triangle FCN,sans être nommé.
 * @example G = centreGraviteTriangle(F,C,N,'G','below')
 * // Crée G, le centre de gravité du triangle FCN, en notant G sous le point, s'il est tracé et labellisé.
 * @return {Point}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022
export function centreGraviteTriangle (A, B, C, nom = '', positionLabel = 'above') {
  const d = medianeTriangle(B, A, C)
  const e = medianeTriangle(A, B, C)
  d.isVisible = false
  e.isVisible = false
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return new Point(x, y, nom, positionLabel)
}

/**  Trace la hauteur issue de A relative à [BC]
 * @param {Point} A Point dont est issue la hauteur
 * @param {Point} B Première extrémité du segment dont est relative la hauteur
 * @param {Point} C Seconde extrémité du segment dont est relative la hauteur
 * @param {string} [color = 'black'] Couleur de cette hauteur : du type 'blue' ou du type '#f15929'
 * @example hauteurTriangle (M, N, P) // Trace, en noir, la hauteur issue de M relative à [NP]
 * @example hauteurTriangle (M, N, P, 'red') // Trace, en rouge, la hauteur issue de M relative à [NP]
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function hauteurTriangle (A, B, C, color = 'black') {
  const d = droite(B, C)
  d.isVisible = false
  const p = projectionOrtho(A, d)
  return new Droite(p, A, '', color)
}

/**
 * Code la hauteur d'un triangle
 * @param {Point} A Premier sommet d'un triangle
 * @param {Point} B Deuxième sommet d'un triangle
 * @param {Point} C Troisième sommet d'un triangle
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur des codages. À associer obligatoirement à colorToLatexOrHTML().
 * @class
 */
// JSDOC Validee par EE Juin 2022
export function CodageHauteurTriangle (A, B, C, color = 'black') {
  ObjetMathalea2D.call(this, { })
  this.color = color
  const d = droite(B, C)
  const p = projectionOrtho(A, d)
  const q = rotation(A, p, -90)
  if (B.x < C.x) {
    if (p.x > C.x || p.x < B.x) {
      d.isVisible = true
      d.pointilles = 5
    } else d.isVisible = false
  } else if (C.x < B.x) {
    if (p.x < C.x || p.x > B.x) {
      d.isVisible = true
      d.pointilles = 5
    } else d.isVisible = false
  } else if (B.y < C.y) {
    if (p.y > C.y || p.y < B.y) {
      d.isVisible = true
      d.pointilles = 5
    } else d.isVisible = false
  } else if (C.y < B.y) {
    if (p.y < C.y || p.y > B.y) {
      d.isVisible = true
      d.pointilles = 5
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

/**
 * Code la hauteur d'un triangle
 * @param {Point} A Premier sommet d'un triangle
 * @param {Point} B Deuxième sommet d'un triangle
 * @param {Point} C Troisième sommet d'un triangle
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @example codageHauteurTriangle(M,N,P) // Code, en noir, la hauteur du triangle MNP.
 * @example codageHauteurTriangle(M,N,P,'red') // Code, en rouge, la hauteur du triangle MNP.
 * @return {CodageHauteurTriangle}
 */
// JSDOC Validee par EE Juin 2022
export function codageHauteurTriangle (A, B, C, color = 'black') {
  return new CodageHauteurTriangle(A, B, C, color)
}

/**
 * Code la médiane d'un triangle
 * @param {Point} B Première extrémité du segment dont la médiane est relative
 * @param {Point} C Seconde extrémité du segment dont la médiane est relative
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @param {string} [mark = '//'] Symbole posé de part et d'autre du milieu du segment
 * @param {boolean} [mil = false] Trace ou nom le point du milieu.
 * @example codageMedianeTriangle(M,N) // Code, en noir, la médiane d'un triangle relative au côté [MN], avec les symboles //
 * @example codageMedianeTriangle(M,N,P,'red','oo') // Code, en rouge, la médiane d'un triangle relative au côté [MN], avec les symboles oo
 * @return {CodageSegments}
 */
// JSDOC Validee par EE Juin 2022
export function codageMedianeTriangle (A, B, color = 'black', mark = '×', mil = false) {
  return new CodageMilieu(A, B, color, mark, mil)
}

/**
 * Orthocentre du triangle ABC
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} nom
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
 * Crée le centre du cercle circonscrit au triangle ABC
 * @param {Point} A Premier sommet du triangle
 * @param {Point} B Deuxième sommet du triangle
 * @param {Point} C Troisième sommet du triangle
 * @param {string} [nom=''] Nom du centre
 * @param {string} [positionLabel = 'above'] Position du nom par rapport au point
 * @example G = centreCercleCirconscrit(F,C,N)
 * // Crée G, le centre du cercle circonscrit au triangle FCN,sans être nommé.
 * @example G = centreCercleCirconscrit(F,C,N,'G','below')
 * // Crée G, le centre du cercle circonscrit au triangle FCN, en notant G sous le point, s'il est tracé et labellisé.
 * @return {Point}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function centreCercleCirconscrit (A, B, C, nom = '', positionLabel = 'above') {
  const d = mediatrice(A, B)
  const e = mediatrice(B, C)
  d.isVisible = false
  e.isVisible = false
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return new Point(x, y, nom, positionLabel)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% LES CODAGES %%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Code un angle droit
 * @param {Point} A Point sur un côté de l'angle droit
 * @param {Point} O Sommet de l'angle droit
 * @param {Point} B Point sur l'autre côté de l'angle droit
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'
 * @param {number} [d=0.4] Taille du codage de l'angle droit
 * @param {number} [epaisseur=0.5] Epaisseur du trait
 * @param {number} [opacite=1] Opacité du trait
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=1] Taux d'opacité du remplissage entre 0 et 1
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} depart Point sur un côté de l'angle droit
 * @property {Point} sommet Sommet de l'angle droit
 * @property {Point} arrivee Point sur l'autre côté de l'angle droit
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} taille Taille du codage de l'angle droit
 * @property {string} couleurDeRemplissage 'none' si on ne veut pas de remplissage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Taux d'opacité du remplissage entre 0 et 1
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageAngleDroit (A, O, B, color = 'black', d = 0.4, epaisseur = 0.5, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 1) {
  ObjetMathalea2D.call(this, { })
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
 * Code un angle droit
 * @param {Point} A Point sur un côté de l'angle droit
 * @param {Point} O Sommet de l'angle droit
 * @param {Point} B Point sur l'autre côté de l'angle droit
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'
 * @param {number} [d=0.4] Taille du codage de l'angle droit
 * @param {number} [epaisseur=0.5] Epaisseur du trait
 * @param {number} [opacite=1] Opacité du trait
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=1] Taux d'opacité du remplissage
 * @example codageAngleDroit(A,J,T)
 * // Trace un codage d'angle droit pour l'angle direct AJT, de couleur noire, de taille 0,4, d'épaisseur 0,5 avec une opacité de 100 %, sans remplissage
 * @example codageAngleDroit(A,J,T,'pink',1,0.2,0.6,'blue',0.2)
 * // Trace un codage d'angle droit pour l'angle direct AJT, de couleur rose, de taille 1, d'épaisseur 0,2 avec une opacité de 60 %, rempli en bleu avec une opacité de 20%.
 * @return {CodageAngleDroit}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function codageAngleDroit (A, O, B, color = 'black', d = 0.4, epaisseur = 0.5, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 1) {
  return new CodageAngleDroit(A, O, B, color, d, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage)
}

/**
 * Affiche la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous.
 * @param  {Point} A Première extrémité du segment
 * @param  {Point} B Seconde extrémité du segment
 * @param  {string} [color='black'] Couleur de la longueur affichée : du type 'blue' ou du type '#f15929'.
 * @param  {number} [d=0.5] Distance entre l'affichage de la longueur et le segment.
 * @param  {string} [unite='cm'] Affiche cette unité après la valeur numérique de la longueur.
 * @param  {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de la longueur affichée. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
function AfficheLongueurSegment (A, B, color = 'black', d = 0.5, unite = 'cm', horizontal = false) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  const O = milieu(A, B)
  const M = rotation(A, O, -90)
  const s = segment(A, B)
  let angle
  s.isVisible = false
  const l = stringNombre(s.longueur, 1)
  const longueurSeg = `${l}${unite !== '' ? ' ' + unite : ''}`
  this.distance = horizontal ? (d - 0.1 + longueurSeg.length / 10) : d
  if (horizontal) {
    angle = 0
  } else if (B.x > A.x) {
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
 * Affiche la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous.
 * @param  {Point} A Première extrémité du segment
 * @param  {Point} B Seconde extrémité du segment
 * @param  {string} [color='black'] Couleur affichée de la longueur affichée : du type 'blue' ou du type '#f15929'.
 * @param  {number} [d=0.5] Distance entre l'affichage de la longueur et le segment.
 * @param  {string} [unite='cm'] Affiche cette unité après la valeur numérique de la longueur.
 * @param  {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @example  afficheLongueurSegment(A,B)
 * // Affiche la longueur du segment [AB] (en noir, à 0,5 "cm" du segment, complétée par l'unité cm et parallèlement au segment).
 * @example  afficheLongueurSegment(A,B,'blue',1,'mm',true)
 * // Affiche la longueur du segment [AB], en bleu, à 1 "cm" du segment, complétée par l'unité mm et horizontalement.
 * @return {AfficheLongueurSegment}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function afficheLongueurSegment (A, B, color = 'black', d = 0.5, unite = 'cm', horizontal = false) {
  return new AfficheLongueurSegment(A, B, color, d, unite, horizontal)
}

/**
 * texteSurSegment('mon texte',A,B) // Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon en dessous, ou alors horizontalement
 *
 * @author Rémi Angot
 */
function TexteSurSegment (texte, A, B, color = 'black', d = 0.5, horizontal = false) {
  ObjetMathalea2D.call(this, { })
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
  ObjetMathalea2D.call(this, { })
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
export function texteSurArc (texte, A, B, angle, color = 'black', d = 0.5, horizontal = false) {
  return new TexteSurArc(texte, A, B, angle, color, d, horizontal)
}

/**
 * Affiche la mesure de l'angle ABC arrondie au degré près
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} B Sommet de l'angle
 * @param {Point} C Point sur l'autre côté de l'angle
 * @param {string} [color='black'] Couleur de la mesure de l'angle : du type 'blue' ou du type '#f15929'.
 * @param {number} [distance=1.5] Taille de l'angle
 * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.ecart=0.5] Distance entre l'arc et sa mesure
 * @param {boolean} [parametres.saillant=true] True si on veut l'angle saillant, false si on veut l'angle rentrant.
 * @param {string} [parametres.colorArc='black']  Couleur de l'arc  : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [parametres.rayon=false] True pour fermer l'angle, par deux rayons (en vue de colorier l'intérieur).
 * @param {string} [parametres.couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'.
 * @param {number} [parametres.opaciteDeRemplissage=0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.arcEpaisseur=1] Epaisseur de l'arc
 * @param {boolean} [parametres.mesureEnGras=false] True pour mettre en gras la mesure affichée
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} depart Point sur un côté de l'angle
 * @property {Point} sommet Sommet de l'angle
 * @property {Point} arrivee Point sur l'autre côté de l'angle
 * @property {number} distance Taille de l'angle
 * @property {number} ecart Distance entre l'arc et sa mesure
 * @property {boolean} saillant True si on veut l'angle saillant, false si on veut l'angle rentrant.
 * @property {number} epaisseur Epaisseur de l'arc
 * @class
 */
// JSDOC Validee par EE Juin 2022
function AfficheMesureAngle (A, B, C, color = 'black', distance = 1.5, label = '', { ecart = 0.5, mesureEnGras = false, saillant = true, colorArc = 'black', rayon = false, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.5, arcEpaisseur = 1 } = {}) {
  ObjetMathalea2D.call(this, { })
  this.depart = A
  this.arrivee = C
  this.sommet = B
  this.distance = distance
  const angle = saillant ? angleOriente(this.depart, this.sommet, this.arrivee) : angleOriente(this.depart, this.sommet, this.arrivee) > 0 ? angleOriente(this.depart, this.sommet, this.arrivee) - 360 : 360 + angleOriente(this.depart, this.sommet, this.arrivee)
  this.ecart = ecart
  this.saillant = saillant
  this.epaisseur = arcEpaisseur
  this.svg = function (coeff) {
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(pointSurSegment(this.sommet, M, this.distance + this.ecart * 20 / coeff), this.sommet, angle / 2, '', 'center')
    let mesureAngle
    if (label !== '') {
      mesureAngle = label
    } else {
      mesureAngle = Math.round(this.saillant ? angle(this.depart, this.sommet, this.arrivee) : 360 - angle(this.depart, this.sommet, this.arrivee)) + '°'
    }
    const mesure = texteParPoint(mesureAngle, N, 'milieu', color, 1, 'middle', true)
    const marque = arc(M, B, angle, rayon, couleurDeRemplissage, colorArc, opaciteDeRemplissage)
    mesure.contour = mesureEnGras
    mesure.couleurDeRemplissage = colorToLatexOrHTML(color)
    marque.epaisseur = this.epaisseur
    return '\n' + mesure.svg(coeff) + '\n' + marque.svg(coeff)
  }
  this.tikz = function () {
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(pointSurSegment(this.sommet, M, this.distance + this.ecart), this.sommet, angle / 2, '', 'center')
    let mesureAngle
    if (label !== '') {
      mesureAngle = label
    } else {
      mesureAngle = Math.round(this.saillant ? angle(this.depart, this.sommet, this.arrivee) : 360 - angle(this.depart, this.sommet, this.arrivee)) + '\\degree'
    }
    const mesure = texteParPoint(mesureAngle, N, 'milieu', color, 1, 'middle', true)
    const marque = arc(M, B, angle, rayon, couleurDeRemplissage, colorArc, opaciteDeRemplissage)
    mesure.contour = mesureEnGras
    mesure.couleurDeRemplissage = colorToLatexOrHTML(color)
    marque.epaisseur = this.epaisseur
    return '\n' + mesure.tikz() + '\n' + marque.tikz()
  }
}
/**
 * Affiche la mesure de l'angle ABC arrondie au degré près
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} B Sommet de l'angle
 * @param {Point} C Point sur l'autre côté de l'angle
 * @param {string} [color='black'] Couleur de la mesure de l'angle : du type 'blue' ou du type '#f15929'.
 * @param {number} [distance=1.5] Rayon de l'arc de cercle.
 * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.ecart=0.5] Distance entre l'arc et sa mesure
 * @param {boolean} [parametres.saillant=true] True si on veut l'angle saillant, false si on veut l'angle rentrant.
 * @param {string} [parametres.colorArc='black']  Couleur de l'arc  : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [parametres.rayon=false] True pour fermer l'angle, par deux rayons (en vue de colorier l'intérieur).
 * @param {string} [parametres.couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'.
 * @param {number} [parametres.opaciteDeRemplissage=0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.arcEpaisseur=1] Epaisseur de l'arc
 * @param {boolean} [parametres.mesureEnGras=false] True pour mettre en gras la mesure affichée
 * @example afficheMesureAngle(M,N,O)
 * // Affiche la mesure de l'angle MNO (en noir, avec un arc de rayon 1,5 "cm").
 * @example afficheMesureAngle(M,N,O,'red',2,'pop',{ecart:1,saillant:false,colorArc:'blue',rayon:true,couleurDeRemplissage:'#f15929',opaciteDeRemplissage:0.8,arcEpaisseur:2,mesureEnGras:true})
 * // Affiche le label pop en gras et rouge, sur l'angle rentrant MNO, avec un arc bleu, epais de 2 et de rayon 2 "cm", à 1 "cm" de l'arc rempli en orange avec une opacité de 80%, cerné par ses rayons.
 * @return {AfficheMesureAngle}
 */
// JSDOC Validee par EE Juin 2022
export function afficheMesureAngle (A, B, C, color = 'black', distance = 1.5, label = '', { ecart = 0.5, mesureEnGras = false, saillant = true, colorArc = 'black', rayon = false, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.5, arcEpaisseur = 1 } = {}) {
  return new AfficheMesureAngle(A, B, C, color, distance, label, { ecart, mesureEnGras, saillant, colorArc, rayon, couleurDeRemplissage, opaciteDeRemplissage, arcEpaisseur })
}

/**
 * Affiche la côte d'un segment sous la forme d'une flèche à double sens et d'une valeur associée.
 * @param {Segment} s Segment pour lequel on affiche la côte
 * @param {string} [Cote=''] Si '', alors la longueur en cm est affichée, sinon c'est cette valeur qui s'affiche (et cela peut être une variable).
 * @param {number} [positionCote = 0.5] Position de la flèche par rapport au segment. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurCote='black'] Couleur de la flèche  : du type 'blue' ou du type '#f15929'.
 * @param {number} [epaisseurCote=1] Epaisseur de la flèche.
 * @param {number} [positionValeur=0.5] Position de la valeur par rapport à la flèche. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurValeur='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [horizontal=false]  Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
function AfficheCoteSegment (
  s,
  Cote = '',
  positionCote = 0.5,
  couleurCote = 'black',
  epaisseurCote = 1,
  positionValeur = 0.5,
  couleurValeur = 'black',
  horizontal = false
) {
  ObjetMathalea2D.call(this, { })
  const positionCoteSVG = positionCote * 20 / context.pixelsParCm
  const positionCoteTIKZ = positionCote / context.scale

  this.svg = function (coeff) {
    let valeur
    const A = s.extremite1
    const B = s.extremite2
    const v = similitude(vecteur(A, B), A, 90, positionCoteSVG / s.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (Cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur,
        'cm',
        horizontal
      )
    } else {
      valeur = texteSurSegment(
        Cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur,
        horizontal
      )
    }
    return '\n\t' + cote.svg(coeff) + '\n\t' + valeur.svg(coeff)
  }

  this.tikz = function () {
    let valeur
    const A = s.extremite1
    const B = s.extremite2
    const v = similitude(vecteur(A, B), A, 90, positionCoteTIKZ / s.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (Cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur
      )
    } else {
      valeur = texteSurSegment(
        Cote,
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur
      )
    }
    return '\n\t' + cote.tikz() + '\n\t' + valeur.tikz()
  }
}
/**
 * Affiche la côte d'un segment sous la forme d'une flèche à double sens et d'une valeur associée.
 * @param {Segment} s Segment pour lequel on affiche la côte
 * @param {string} [Cote=''] Si '', alors la longueur en cm est affichée, sinon c'est cette valeur qui s'affiche (et cela peut être une variable).
 * @param {number} [positionCote = 0.5] Position de la flèche par rapport au segment. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurCote='black'] Couleur de la flèche  : du type 'blue' ou du type '#f15929'.
 * @param {number} [epaisseurCote=1] Epaisseur de la flèche.
 * @param {number} [positionValeur=0.5] Position de la valeur par rapport à la flèche. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurValeur='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [horizontal=false]  Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @example afficheCoteSegment(s)
 * // Affiche la côte du segment s (avec une flèche noire d\'épaisseur 1 "cm", placée 0.5 "cm" sous le segment, avec la longueur du segment, en cm, écrite en noir, 0,5 "cm" au-dessus, et parallèle au segment.
 * @example afficheCoteSegment(s,'x',-1,'red',2,1,'blue',true)
 * // Affiche la côte du segment s, avec une flèche rouge d\'épaisseur 2 "cm", placée 1 "cm" sous le segment, avec le texte 'x' écrit en bleu, 1 "cm" au-dessus, et horizontalement.
 * @return {AfficheCoteSegment}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022

export function afficheCoteSegment (s, Cote = '', positionCote = 0.5, couleurCote = 'black', epaisseurCote = 1, positionValeur = 0.5, couleurValeur = 'black', horizontal = false) {
  return new AfficheCoteSegment(s, Cote, positionCote, couleurCote, epaisseurCote, positionValeur, couleurValeur, horizontal)
}

/**
 * Code un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [mark='||'] Symbole posé sur le segment
 * @param {string} [color='black'] Couleur du symbole : du type 'blue' ou du type '#f15929'
 * @example codageSegment(H,K) // Code le segment [HK] avec la marque noire '||'
 * @example codageAngle(H,K,'x','green') // Code le segment [HK] avec la marque verte 'x'
 * @author Rémi Angot
 * @return {TexteParPoint}
 */
// JSDOC Validee par EE Juin 2022
export function codageSegment (A, B, mark = '||', color = 'black') {
  const O = milieu(A, B)
  const s = segment(A, B)
  s.isVisible = false
  let angle
  if (B.x > A.x) {
    angle = -parseInt(s.angleAvecHorizontale)
  } else {
    angle = -parseInt(s.angleAvecHorizontale) + 180
  }
  return new TexteParPoint(mark, O, angle, color)
}

/**
 * Code plusieurs segments de la même façon
 * @param {string} [mark = '||'] Symbole posé sur le segment
 * @param {string} [color = 'black'] Couleur du symbole : : du type 'blue' ou du type '#f15929'
 * @param  {Point|Point[]|Segment} args Les segments différement codés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageSegments (mark = '||', color = 'black', ...args) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    let code = ''
    if (Array.isArray(args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < args[0].length - 1; i++) {
        const codage = codageSegment(args[0][i], args[0][i + 1], mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
      const codage = codageSegment(args[0][args[0].length - 1], args[0][0], mark, color)
      codage.isVisible = false
      code += codage.svg(coeff)
      code += '\n'
    } else if (args[0].constructor === Segment) {
      for (let i = 0; i < args.length; i++) {
        const codage = codageSegment(args[i].extremite1, args[i].extremite2, mark, color)
        codage.isVisible = false
        code += codage.svg(coeff)
        code += '\n'
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        const codage = codageSegment(args[i], args[i + 1], mark, color)
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
        code += codageSegment(args[0][i], args[0][i + 1], mark, color).tikz()
        code += '\n'
      }
      code += codageSegment(
        args[0][args[0].length - 1],
        args[0][0],
        mark,
        color
      ).tikz()
      code += '\n'
    } else if (args[0].constructor === Segment) {
      for (let i = 0; i < args.length; i++) {
        code += codageSegment(
          args[i].extremite1,
          args[i].extremite2,
          mark,
          color
        ).tikz()
        code += '\n'
      }
    } else {
      for (let i = 0; i < args.length; i += 2) {
        code += codageSegment(args[i], args[i + 1], mark, color).tikz()
        code += '\n'
      }
    }
    return code
  }
}

/**
 * Code plusieurs segments de la même façon
 * @param {string} [mark = '||'] Symbole posé sur le segment
 * @param {string} [color = 'black'] Couleur du symbole : : du type 'blue' ou du type '#f15929'
 * @param  {Points|Point[]|Segments} args Les segments différement codés. Voir exemples.
 * @example codageSegments('×','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
 * @example codageSegments('×','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé, pratique pour des polygones pas pour des lignes brisées)
 * @example codageSegments('×','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
 * @example codageSegments('×','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
 * @author Rémi Angot
 * @return {CodageSegments}
 */
// JSDOC Validee par EE Juin 2022
export function codageSegments (mark = '||', color = 'black', ...args) {
  return new CodageSegments(mark, color, ...args)
}

/**
 * Code un angle
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
 * @param {number} [taille=0.8] Taille de l'angle
 * @param {string} [mark=''] Marque sur l'angle
 * @param {string} [color='black'] Couleur de l'angle : du type 'blue' ou du type '#f15929'
 * @param {number} [epaisseur=1] Epaisseur du tracé de l'angle
 * @param {number} [opacite=1] Opacité de la couleur du tracé de l'angle
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=0.2] Opacité de la couleur de remplissage de l'angle
 * @param {boolean} [mesureOn=false] Affichage de la mesure de l'angle
 * @param {boolean} [noAngleDroit=false] Pour choisir si on veut que l'angle droit soit marqué par un carré ou pas
 * @param {string} [texteACote=''] Pour mettre un texte à côté de l'angle à la place de la mesure de l'angle
 * @param {number} [tailleTexte=1] Pour choisir la taille du texte à côté de l'angle
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} debut Point sur un côté de l'angle
 * @property {Point} centre Sommet de l'angle
 * @property {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
 * @property {number} taille Taille de l'angle
 * @property {string} mark Marque sur l'angle
 * @property {string} color Couleur de l'angle. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} epaisseur Epaisseur du tracé de l'angle
 * @property {number} opacite Opacité de la couleur du tracé de l'angle
 * @property {string} couleurDeRemplissage À associer obligatoirement à colorToLatexOrHTML(). 'none' si on ne veut pas de remplissage.
 * @property {number} opaciteDeRemplissage Opacité de la couleur de remplissage de l'angle
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CodageAngle (debut, centre, angle, taille = 0.8, mark = '', color = 'black', epaisseur = 1, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.2, mesureOn = false, texteACote = '', tailleTexte = 1) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.debut = debut
  this.centre = centre
  this.taille = taille
  this.mark = mark
  this.epaisseur = epaisseur
  this.opacite = opacite
  this.couleurDeRemplissage = couleurDeRemplissage
  this.opaciteDeRemplissage = opaciteDeRemplissage
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
    const arcangle = arc(depart, this.centre, this.angle, this.couleurDeRemplissage !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.isVisible = false
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    objets.push(arcangle)
    if (this.mark !== '') {
      const t = texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color)
      t.isVisible = false
      objets.push(t)
    }
    if (mesureOn && texteACote === '') {
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
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).svg(coeff) + '\n'
    if (mesureOn && texteACote === '') code += texteParPoint(mesure, M, 'milieu', this.color).svg(coeff) + '\n'
    if (texteACote !== '') code += texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte).svg(coeff) + '\n'
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
    const arcangle = arc(depart, this.centre, this.angle, this.couleurDeRemplissage !== 'none', this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    if (this.mark !== '') code += texteParPoint(mark, P, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (mesureOn && texteACote === '') code += texteParPoint(mesure, M, 'milieu', this.color).tikz() + '\n'
    if (texteACote !== '') code += texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte).tikz() + '\n'
    code += arcangle.tikz()
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    const depart = pointSurSegment(this.centre, this.debut, this.taille / context.scale)
    const M = rotation(depart, this.centre, this.angle / 2)
    const mesure = Math.round(Math.abs(angle)) + '°'
    const d = droite(this.centre, M)
    d.isVisible = false
    const arcangle = arc(depart, this.centre, this.angle, false, this.couleurDeRemplissage, this.color)
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    if (this.mark !== '') code += texteParPoint(mark, M, 90 - d.angleAvecHorizontale, this.color).tikz() + '\n'
    if (mesureOn && texteACote === '') code += texteParPoint(mesure, M, 'milieu', this.color).tikz() + '\n'
    if (texteACote !== '') code += texteParPoint(texteACote, M, 'milieu', this.color, tailleTexte).tikz() + '\n'
    code += arcangle.tikzml(amp)
    return code
  }
}

/**
 * Code un angle
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
 * @param {number} [taille=0.8] Taille de l'angle
 * @param {string} [mark=''] Marque sur l'angle
 * @param {string} [color='black'] Couleur de l'angle : du type 'blue' ou du type '#f15929'
 * @param {number} [epaisseur=1] Epaisseur du tracé de l'angle
 * @param {number} [opacite=1] Opacité de la couleur du tracé de l'angle
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=0.2] Opacité de la couleur de remplissage de l'angle
 * @param {boolean} [mesureOn=false] Affichage de la mesure de l'angle
 * @param {boolean} [noAngleDroit=false] Pour choisir si on veut que l'angle droit soit marqué par un carré ou pas
 * @param {string} [texteACote=''] Pour mettre un texte à côté de l'angle à la place de la mesure de l'angle
 * @param {number} [tailleTexte=1] Pour choisir la taille du texte à côté de l'angle
 * @example codageAngle(H,K,30)
 * // Code l'angle de centre K, avec H sur un côté de l'angle et avec 30° comme mesure d'angle orienté,
 * // en noir, avec une épaisseur de 1, une opacité de 100 %, un rayon d'arc de 0,8, sans autre option.
 * @example codageAngle(H,K,G)
 * // Code l'angle HKG, en noir, avec une épaisseur de 1, une opacité de 100 %, un rayon d'arc de 0,8, sans autre option.
 * @example codageAngle(H,K,G,2,'x','red',0.5,0.2,'blue',0.8,true,true)
 * // Code l'angle HKG, en rouge, avec une épaisseur de 0.5 et une opacité de 20 %, rempli en bleu avec une opacité de 80 %
 * // avec un arc de cercle de rayon 2, avec une marque 'x' sur l'angle, en affichant la mesure de l'angle et sans faire apparaître d'angle droit le cas échéant.
 * @example codageAngle(H,K,G,2,'x','red',0.5,0.2,'blue',0.8,true,true,'?',2)
 * // Code l'angle HKG, en rouge, avec une épaisseur de 0.5 et une opacité de 20 %, rempli en bleu avec une opacité de 80 %
 * // avec un arc de cercle de rayon 2, avec une marque 'x' sur l'angle, en affichant le texte '?' d'une taille de 2 et sans faire apparaître d'angle droit le cas échéant.
 * @author Jean-Claude Lhote
 * @return {CodageAngle|CodageAngleDroit}
 */
// JSDOC Validee par EE Juin 2022
export function codageAngle (A, O, angle, taille = 0.8, mark = '', color = 'black', epaisseur = 1, opacite = 1, couleurDeRemplissage = 'none', opaciteDeRemplissage = 0.2, mesureOn = false, noAngleDroit = false, texteACote = '', tailleTexte = 1) {
  if (typeof (angle) !== 'number') {
    angle = angleOriente(A, O, angle)
  }
  if ((angle === 90 || angle === -90) && !noAngleDroit) {
    return new CodageAngleDroit(A, O, rotation(A, O, angle), color, taille, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage)
  } else return new CodageAngle(A, O, angle, taille, mark, color, epaisseur, opacite, couleurDeRemplissage, opaciteDeRemplissage, mesureOn, texteACote, tailleTexte)
}

function NomAngleParPosition (nom, x, y, color, s) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  objets.push(texteParPosition(nom, x, y, 'milieu', color, 1, 'middle', true))
  const s1 = segment(x - 0.6, y + 0.4 - s / 10, x + 0.1, y + 0.4 + s / 10, color)
  const s2 = segment(x + 0.1, y + 0.4 + s / 10, x + 0.8, y + 0.4 - s / 10, color)
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
function DroiteGraduee ({
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

/**  Trace une grille quadrillée dont le coin en bas à gauche est (xmin, ymin) et celui à droite est au maximum (xmax, ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de la grille
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de la grille
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de la grille
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de la grille
 * @param {string} [color = 'gray'] Couleur de la grille : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de la grille : entre 0 et 1
 * @param {number} [step = 1] Pas de la grille
 * @param {number} [pointilles = 0] Style des pointillés de la grille (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de la grille. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de la grille : entre 0 et 1
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
function Grille (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = 0) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = xmin; i <= xmax; i = arrondi(i + step)) {
    const s = segment(i, ymin, i, ymax, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
    }
    objets.push(s)
  }
  for (let i = ymin; i <= ymax; i = arrondi(i + step)) {
    const s = segment(xmin, i, xmax, i, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
    }
    objets.push(s)
  }
  // this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${this.color}, opacite = ${this.opacite}, pas = ${step})`
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

/**  Trace une grille quadrillée dont le coin en bas à gauche est (xmin, ymin) et celui à droite est au maximum (xmax, ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de la grille
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de la grille
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de la grille
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de la grille
 * @param {string} [color = 'gray'] Couleur de la grille : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de la grille : entre 0 et 1
 * @param {number} [step = 1] Pas de la grille
 * @param {number} [pointilles = 0] Style des pointillés de la grille (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @example grid = grille() // Trace une grille avec toutes les options par défaut
 * @example grid = grille(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace une grille avec toutes les options différentes de celles par défaut
 * @author Rémi Angot
 * @return {Grille}
 */
// JSDOC Validee par EE Aout 2022
export function grille (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = 0) {
  return new Grille(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

/**  Trace des parallèles à l'axe des abscisses
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de ces parallèles. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de ces parallèles : entre 0 et 1
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
function LignesHorizontales (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = ''
) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = ymin; i <= ymax; i += step) {
    const s = segment(xmin, i, xmax, i, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
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

/**  Trace des parallèles à l'axe des abscisses
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @example grid = lignesHorizontales() // Trace des parallèles à l'axe des abscisses avec toutes les options par défaut
 * @example grid = lignesHorizontales(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace des parallèles à l'axe des abscisses avec toutes les options différentes de celles par défaut
 * @author Rémi Angot
 * @return {LignesHorizontales}
 */
// JSDOC Validee par EE Aout 2022
export function lignesHorizontales (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = '') {
  return new LignesHorizontales(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

/**  Trace des verticales à l'axe des ordonnées
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de ces parallèles. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de ces parallèles : entre 0 et 1
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
function LignesVerticales (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = '') {
  ObjetMathalea2D.call(this, { })
  this.color = color
  this.opacite = opacite
  const objets = []
  for (let i = xmin; i <= xmax; i = i + step) {
    const s = segment(i, ymin, i, ymax, this.color)
    s.opacite = this.opacite
    if (pointilles) {
      s.pointilles = 5
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
 * LignesVerticales(xmin,ymin,xmax,ymax,color,opacite,pas)
 *
 * @author Rémi Angot
 */
/**  Trace des parallèles à l'axe des ordonnées
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @example grid = lignesHorizontales() // Trace des parallèles à l'axe des ordonnées avec toutes les options par défaut
 * @example grid = lignesHorizontales(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace des parallèles à l'axe des ordonnées avec toutes les options différentes de celles par défaut
 * @author Rémi Angot
 * @return {LignesVerticales}
 */
// JSDOC Validee par EE Aout 2022
export function lignesVerticales (xmin = -30, ymin = -30, xmax = 30, ymax = 30, color = 'gray', opacite = 0.4, step = 1, pointilles = '') {
  return new LignesVerticales(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

function Seyes (xmin = 0, ymin = 0, xmax = 15, ymax = 15, opacite1 = 0.5, opacite2 = 0.2) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  for (let y = ymin; y <= ymax; y = y + 0.25) {
    if (y % 1 !== 0) {
      const d = segment(xmin, y, xmax, y, 'red')
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
  ObjetMathalea2D.call(this, { })
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

/**
 * Trace un graphique cartésien dans un repère
 *
 *
 * @param {array} data
 * @param {object} repere
 * @author Rémi Angot
 */
function TraceGraphiqueCartesien (data, repere = {}, {
  couleurDesPoints = 'red',
  couleurDuTrait = 'blue',
  styleDuTrait = '', // plein par défaut
  epaisseurDuTrait = 2,
  styleDesPoints = 'x', // croix par défaut
  tailleDesPoints = 3

} = {}) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const listePoints = []
  for (const [x, y] of data) {
    const M = pointDansRepere(x, y, repere)
    listePoints.push(M)
    const t = tracePoint(M, couleurDesPoints)
    t.style = styleDesPoints
    t.taille = tailleDesPoints
    t.isVisible = false
    M.isVisible = false
    objets.push(t)
  }
  const l = polyline(...listePoints)
  l.isVisible = false
  l.epaisseur = epaisseurDuTrait
  l.color = colorToLatexOrHTML(couleurDuTrait)
  if (styleDuTrait === 'pointilles') {
    l.pointilles = 5
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
 * Pour colors, c'est propre à Latex : color, colorC = blue!15, colorL = green!15
    colorL (comme couleur de la ligne) pour la zone 1
    colorV (comme couleur de la variable) pour la zone 2
    colorC (comme couleur de la colonne) pour la zone 3
    colorT (comme couleur du tableau) pour la zone 4.

 * @param {*} param0
 * @author Jean-Claude Lhote
 */
function TableauDeVariation ({ tabInit, tabLines, lgt, escpl, deltacl, colors, hauteurLignes, colorBackground }) {
  ObjetMathalea2D.call(this, { })
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
                      p = polygone([point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)])
                      p.couleurDeRemplissage = colorToLatexOrHTML('gray')
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
  ObjetMathalea2D.call(this, { })
  const p = hauteur === 0 ? vide2d(x, 0) : polygone([point(x - epaisseur / 2, 0), point(x - epaisseur / 2, hauteur * unite), point(x + epaisseur / 2, hauteur * unite), point(x + epaisseur / 2, 0)])
  p.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = colorToLatexOrHTML(color)
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
  ObjetMathalea2D.call(this, { })
  const p = longueur === 0 ? vide2d(0, y) : polygone([point(0, y - epaisseur / 2), point(0, y + epaisseur / 2), point(unite * longueur, y + epaisseur / 2), point(unite * longueur, y - epaisseur / 2)])
  p.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = colorToLatexOrHTML(color)
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

/** Trace un diagramme en barres
 * @param {number[]} hauteursBarres Tableau des effectifs
 * @param {string[]} etiquettes Tableau des labels pour chaque effectif
 * @param {Object} parametres À saisir entre accolades
 * @param {boolean} [parametres.reperageTraitPointille = false] Présence (ou non) du trait en pointillés, reliant le haut de chaque barre à l'axe des ordonnées
 * @param {string} [parametres.couleurDeRemplissage = 'blue'] Couleur de remplissage de toutes les barres : du type 'blue' ou du type '#f15929'.
 * @param {number} [parametres.titreAxeVertical = ''] Titre de l'axe des ordonnées
 * @param {boolean} [parametres.titre = ''] Titre du diagramme
 * @param {boolean} [parametres.hauteurDiagramme = 5] Hauteur du diagramme
 * @param {string[]} [parametres.coeff = 2] Largeur entre deux barres
 * @param {string} [parametres.axeVertical = true] Présence (ou non) de l'axe vertical
 * @param {boolean[]} [parametres.etiquetteValeur = true] Présence (ou non) de l'effectif sur chaque barre
 * @param {boolean[]} [parametres.labelAxeVert = true] Présence (ou non) des labels numériques sur l'axe vertical
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @class
 */
function DiagrammeBarres (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 5, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  ObjetMathalea2D.call(this, { })
  const diagramme = []
  for (let j = 0; j < hauteursBarres.length; j++) {
    const abscisseBarre = j * coeff
    const hauteurBarre = hauteursBarres[j] * hauteurDiagramme / max(hauteursBarres)
    diagramme.push(traceBarre(abscisseBarre, hauteurBarre, etiquettes[j], { couleurDeRemplissage: couleurDeRemplissage }))
    if (reperageTraitPointille) {
      const ligne = segment(-1, hauteurBarre, abscisseBarre, hauteurBarre)
      ligne.pointilles = 5
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

    if (labelAxeVert) diagramme.push(labelY(0, max(hauteursBarres), (fraction(hauteurDiagramme, max(hauteursBarres))).mul(step), 'black', -3, max(hauteursBarres) / hauteurDiagramme))
    if (axeVertical) diagramme.push(axeY(0, hauteurDiagramme + 1, 0.2, (fraction(hauteurDiagramme, max(hauteursBarres))).mul(step), 0.2, 'black', ytick, titreAxeVertical))
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
/** Trace un diagramme en barres
 * @param {number[]} hauteursBarres Tableau des effectifs
 * @param {string[]} etiquettes Tableau des labels pour chaque effectif
 * @param {Object} parametres À saisir entre accolades
 * @param {boolean} [parametres.reperageTraitPointille = false] Présence (ou non) du trait en pointillés, reliant le haut de chaque barre à l'axe des ordonnées
 * @param {string} [parametres.couleurDeRemplissage = 'blue'] Couleur de remplissage de toutes les barres : du type 'blue' ou du type '#f15929'.
 * @param {number} [parametres.titreAxeVertical = ''] Titre de l'axe des ordonnées
 * @param {boolean} [parametres.titre = ''] Titre du diagramme
 * @param {boolean} [parametres.hauteurDiagramme = 5] Hauteur du diagramme
 * @param {string[]} [parametres.coeff = 2] Largeur entre deux barres
 * @param {string} [parametres.axeVertical = true] Présence (ou non) de l'axe vertical
 * @param {boolean[]} [parametres.etiquetteValeur = true] Présence (ou non) de l'effectif sur chaque barre
 * @param {boolean[]} [parametres.labelAxeVert = true] Présence (ou non) des labels numériques sur l'axe vertical
 * @example diagrammeBarres([15, 25, 30, 10, 20], ['Compas', 'Rapporteur', 'Règle', 'Crayon', 'Gomme'])
 * // Trace un diagramme en barres avec les options par défaut
 * @example diagrammeBarres([15, 25, 30, 10, 20], ['Compas', 'Rapporteur', 'Règle', 'Crayon', 'Gomme'],{
 * reperageTraitPointille: true, couleurDeRemplissage: 'red', titreAxeVertical: 'Nombre de réponses',
 * titre = 'Matériel mathématique dans sa trousse', * hauteurDiagramme: 10, coeff: 3, etiquetteValeur: false }})
 * // Trace un diagramme en barres avec modification de quelques options par défaut
 * @return {DiagrammeBarres}
 */
export function diagrammeBarres (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 5, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  return new DiagrammeBarres(hauteursBarres, etiquettes, { reperageTraitPointille: reperageTraitPointille, couleurDeRemplissage: couleurDeRemplissage, titreAxeVertical: titreAxeVertical, titre: titre, hauteurDiagramme: hauteurDiagramme, coeff: coeff, axeVertical: axeVertical, etiquetteValeur: etiquetteValeur, labelAxeVert: labelAxeVert })
}

/** Trace un diagramme circulaire
 * @param {Object} parametres À saisir entre accolades
 * @param {number[]} parametres.effectifs Liste des effectifs à donner impérativement
 * @param {number} [parametres.x = 0] Abscisse du point en bas à gauche
 * @param {number} [parametres.y = 0] Ordonnée du point en bas à gauche
 * @param {number} [parametres.rayon = 4] Rayon du diagramme circulaire
 * @param {boolean} [parametres.semi = false] True pour un semi-circulaire, false pour un circulaire
 * @param {boolean} [parametres.legendeAffichage = true] Présence (ou non) de la légende (ensemble des labels)
 * @param {string[]} [parametres.labels = []] Labels associés aux effectifs respectifs. Tableau de même taille que effectifs.
 * @param {string} [parametres.legendePosition = 'droite'] Position de la légende à choisir parmi : 'droite', 'dessus' ou 'dessous'
 * @param {boolean[]} [parametres.mesures = []] Présence (ou non) de la mesure de chaque secteur. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.visibles = []] Découpe (ou non) du secteur (pour créer des diagrammes à compléter). Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.pourcents = []] Présence (ou non) du pourcentage de l'effectif total associé au secteur. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.valeurs = []] Présence (ou non) de des valeurs de l'effectif. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.hachures = []] Présence (ou non) de hachures dans le secteur associé. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.remplissage = []] Présence (ou non) d'une couleur de remplissage dans le secteur associé. Tableau de même taille que effectifs.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {number} x Abscisse du point en bas à gauche
 * @property {number} y Ordonnée du point en bas à gauche
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @class
 */
function DiagrammeCirculaire ({ effectifs, x = 0, y = 0, rayon = 4, labels = [], semi = false, legendeAffichage = true, legendePosition = 'droite', mesures = [], visibles = [], pourcents = [], valeurs = [], hachures = [], remplissage = [] } = {}) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const listeHachuresDisponibles = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10]
  const listeMotifs = combinaisonListes(listeHachuresDisponibles, effectifs.length)
  this.bordures = [1000, 1000, -1000, -1000]
  this.x = x
  this.y = y
  const centre = point(this.x + rayon, this.y + (semi ? 0 : rayon))
  const depart = point(this.x + 2 * rayon, (semi ? this.y : this.y + rayon))
  const contour = semi ? arc(translation(centre, vecteur(rayon, 0)), centre, 180, true, 'white', 'black') : cercle(centre, rayon, 'black')
  let positionLegende // On prévoit l'emplacement de la légende si celle-ci est demandée
  switch (legendePosition) {
    case 'droite':
      positionLegende = { x: this.x + 2 * rayon + 1, y: this.y }
      break
    case 'dessus':
      positionLegende = { x: this.x, y: this.y + semi ? rayon + 1 : 2 * rayon + 1 }
      break
    case 'dessous':
      positionLegende = { x: this.x, y: this.y - 1.5 }
      break
  }
  let T = point(positionLegende.x, positionLegende.y)
  const angleTotal = semi ? 180 : 360
  const effectifTotal = effectifs.reduce((somme, valeur) => somme + valeur)
  const secteurs = []
  const legendes = []
  const etiquettes = []
  const etiquettes2 = []
  const etiquettes3 = []
  let alpha = 0 // alpha est l'angle à partir duquel démarre le secteur
  let legendeMax = 0
  for (let i = 0, a, angle, legende, textelegende, hachure; i < effectifs.length; i++) {
    // on crée les secteurs
    angle = angleTotal * effectifs[i] / effectifTotal
    a = arc(rotation(depart, centre, alpha), centre, angle, true)
    if (hachures[i]) {
      hachure = motifs(listeMotifs[i])
      a.hachures = hachure
      a.couleurDesHachures = colorToLatexOrHTML(texcolors(i + 1))
      a.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i + 2))
    } else {
      hachure = ''
      a.hachures = ''
    }
    a.opaciteDeRemplissage = 0.7
    if (remplissage[i]) a.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i + 1))
    if (visibles[i]) secteurs.push(a)
    if (valeurs[i]) {
      etiquettes.push(latexParPoint(texNombre(effectifs[i]), similitude(depart, centre, alpha + angle * 3 / 4, 0.8), 'black', 20, 12, 'yellow', 8))
    }
    if (pourcents[i]) {
      etiquettes2.push(latexParPoint(texNombre(100 * effectifs[i] / effectifTotal, 0) + '\\%', similitude(depart, centre, alpha + angle / 4, 0.8), 'black', 20, 12, 'yellow', 8))
    }
    if (mesures[i]) {
      etiquettes3.push(latexParPoint(texNombre(angle, 0) + '\\degree', similitude(depart, centre, alpha + angle / 2, 0.6), 'black', 20, 12, 'yellow', 8))
    }
    alpha += angle

    // on crée les légendes
    switch (legendePosition) {
      case 'droite':
        legende = carre(translation(T, vecteur(0, 1.5 * i)), translation(T, vecteur(1, 1.5 * i)), 'black')
        textelegende = texteParPoint(labels[i], translation(T, vecteur(1.2, i * 1.5 + 0.5)), 0, 'black', 1.5, 'gauche', false)
        legendeMax = Math.max(legendeMax, labels[i].length * 0.6)
        break
      default:
        legende = carre(T, translation(T, vecteur(1, 0)), 'black')
        textelegende = texteParPoint(labels[i], translation(T, vecteur(1.2, 0.5)), 0, 'black', 1.5, 'gauche', false)
        T = translation(T, vecteur(labels[i].length * 0.6 + 1, 0))
        legendeMax = legendeMax + labels[i].length * 0.6 + 2.2
        break
    }

    legende.couleurDeRemplissage = a.couleurDeRemplissage
    legende.couleurDesHachures = a.couleurDesHachures
    legende.hachures = hachure
    legende.opaciteDeRemplissage = 0.7
    legendes.push(legende, textelegende)
  }
  objets.push(contour)
  objets.push(...secteurs)
  if (legendeAffichage) objets.push(...legendes)
  objets.push(...etiquettes, ...etiquettes2, ...etiquettes3)
  // calcul des bordures
  this.bordures[0] = this.x - 0.5
  this.bordures[1] = this.y - 0.5 - (legendeAffichage ? (legendePosition === 'dessous' ? 2 : 0) : 0)
  this.bordures[2] = this.x + rayon * 2 + 1 + (legendeAffichage ? (legendePosition === 'droite' ? legendeMax : (Math.max(legendeMax, this.x + rayon * 2 + 1) - (this.x + rayon * 2 + 1))) : 0)
  this.bordures[3] = this.y + (semi ? rayon : rayon * 2) + (legendeAffichage ? (legendePosition === 'dessus' ? 2 : (legendePosition === 'droite' ? Math.max(this.y + (semi ? rayon : rayon * 2), effectifs.length * 1.5) - (this.y + (semi ? rayon : rayon * 2)) : 0)) : 0)
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

/** Trace un diagramme circulaire
 * @param {Object} parametres À saisir entre accolades
 * @param {number[]} parametres.effectifs Liste des effectifs à donner impérativement
 * @param {number} [parametres.x = 0] Abscisse du point en bas à gauche
 * @param {number} [parametres.y = 0] Ordonnée du point en bas à gauche
 * @param {number} [parametres.rayon = 4] Rayon du diagramme circulaire
 * @param {boolean} [parametres.semi = false] True pour un semi-circulaire, false pour un circulaire
 * @param {boolean} [parametres.legendeAffichage = true] Présence (ou non) de la légende (ensemble des labels)
 * @param {string[]} [parametres.labels = []] Labels associés aux effectifs respectifs. Tableau de même taille que effectifs.
 * @param {string} [parametres.legendePosition = 'droite'] Position de la légende à choisir parmi : 'droite', 'dessus' ou 'dessous'
 * @param {boolean[]} [parametres.mesures = []] Présence (ou non) de la mesure de chaque secteur. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.visibles = []] Découpe (ou non) du secteur (pour créer des diagrammes à compléter). Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.pourcents = []] Présence (ou non) du pourcentage de l'effectif total associé au secteur. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.valeurs = []] Présence (ou non) de des valeurs de l'effectif. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.hachures = []] Présence (ou non) de hachures dans le secteur associé. Tableau de même taille que effectifs.
 * @param {boolean[]} [parametres.remplissage = []] Présence (ou non) d'une couleur de remplissage dans le secteur associé. Tableau de même taille que effectifs.
 * @example diagrammeCirculaire({ rayon: 7, semi: false, legendePosition: 'dessous',
 * effectifs: [15, 25, 30, 10, 20],
 * labels: ['Compas', 'Rapporteur', 'Règle', 'Crayon', 'Gomme'],
 * mesures: [true, true, true, false, true],
 * visibles: [true, false, true, true, true],
 * pourcents: [true, true, true, false, true],
 * valeurs: [true, false, true, true, false],
 * hachures: [true, true, true, false, true],
 * remplissage: [false, true, true, true, true] })
 * // Trace un diagramme semi-circulaire de rayon 7 avec différentes options
 * @return {DiagrammeCirculaire}
 */
export function diagrammeCirculaire ({ effectifs, x = 0, y = 0, rayon = 4, labels = [], semi = false, legendeAffichage = true, legendePosition = 'droite', mesures = [], visibles = [], pourcents = [], valeurs = [], hachures = [], remplissage = [] } = {}) {
  return new DiagrammeCirculaire({ effectifs: effectifs, x: x, y: y, rayon: rayon, labels: labels, semi: semi, legendeAffichage: legendeAffichage, legendePosition: legendePosition, mesures: mesures, visibles: visibles, pourcents: pourcents, valeurs: valeurs, hachures: hachures, remplissage: remplissage })
}
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES COURBES DE FONCTIONS %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

function LectureImage (x, y, xscale = 1, yscale = 1, color = 'red', textAbs = '', textOrd = '') {
  ObjetMathalea2D.call(this, { })
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
    Sx.pointilles = 5
    Sy.pointilles = 5
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
    Sx.pointilles = 5
    Sy.pointilles = 5
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
    Sx.pointilles = 5
    Sy.pointilles = 5
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
    Sx.pointilles = 5
    Sy.pointilles = 5
    return '\t\n' + Sx.tikzml(amp) + '\t\n' + Sy.tikzml(amp) + '\t\n' + texteParPosition(this.textAbs, x0, -1 / context.scale, 'milieu', this.color).tikz() + '\t\n' + texteParPosition(this.textOrd, -1 / context.scale, y0, 'milieu', this.color).tikz()
  }
}
export function lectureImage (...args) {
  return new LectureImage(...args)
}

function LectureAntecedent (x, y, xscale, yscale, color = 'black', textOrd, textAbs) {
  // 'use strict'
  ObjetMathalea2D.call(this, { })
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
    Sx.pointilles = 5
    Sy.pointilles = 5
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
    Sx.pointilles = 5
    Sy.pointilles = 5
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
    Sx.pointilles = 5
    Sy.pointilles = 5
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
    Sx.pointilles = 5
    Sy.pointilles = 5
    return '\t\n' + Sx.tikzml(amp) + '\t\n' + Sy.tikzml(amp) + '\t\n' + texteParPosition(this.textAbs, x0, -1 / context.scale, 'milieu', this.color).tikz() + '\t\n' + texteParPosition(this.textOrd, -1 / context.scale, y0, 'milieu', this.color).tikz()
  }
}
export function lectureAntecedent (...args) {
  return new LectureAntecedent(...args)
}

/**
 * Trace la courbe d'une fonction dans un repère
 * @param {function} f fonction à tracer comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du tracé de la courbe. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
function Courbe (f, {
  repere = {},
  color = 'black',
  epaisseur = 2,
  step = false,
  xMin = repere.xMin,
  xMax = repere.xMax,
  yMin = repere.yMin,
  yMax = repere.yMax,
  xUnite = 1,
  yUnite = 1
} = {}) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  let xunite, yunite // Tout en minuscule pour les différencier des paramètres de la fonction
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
  for (let x = xMin; inferieurouegal(x, xMax); x += pas
  ) {
    if (isFinite(f(x))) {
      if (f(x) < yMax + 1 && f(x) > yMin - 1) {
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

/**
 * Trace la courbe d'une fonction dans un repère
 * @param {function} f Fonction à tracer comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere = {}] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @example courbe(g, {repere: r})
 * // Trace, en noir avec une épaisseur de 2, la courbe g dans le repère r, tous deux précédemment définis.
 * @example courbe(g, {repere: r, epaisseur: 5, color: 'blue'})
 * // Trace la courbe g dans le repère r, tous deux précédemment définis, en bleu, avec une épaisseur de 5.
 * @author Rémi Angot
 * @return {Courbe}
 */
// JSDOC Validee par EE Aout 2022
export function courbe (f, { repere = {}, color = 'black', epaisseur = 2, step = false, xMin, xMax, yMin, yMax, xUnite = 1, yUnite = 1 } = {}) {
  return new Courbe(f, { repere: repere, color: color, epaisseur: epaisseur, step: step, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, xUnite: xUnite, yUnite: yUnite })
}

/**
 * Trace l'aire entre la courbe d'une fonction et l'axe des abscisses
 * @param {function} f fonction dont on veut tracer l'aire entre sa courbe et l'axe des abscisses comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du contour de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du contour de l'aire
 * @param {string} [parametres.couleurDeRemplissage = 'blue']  Couleur de l'intérieur de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.opacite = 0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.hachures = 0] Style des hachures dans cette aire (entier entre 0 et 10).
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses pour tracer l'aire est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.a = 0]  Abscisse minimale du tracé de la courbe avec a < b
 * @param {number} [parametres.b = 1]  Abscisse maximale du tracé de la courbe avec a < b
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du contour de l'aire. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur de l'intérieur de l'aire. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} xUnite Unité des abscisses du repère
 * @property {number} yUnite Unité des ordonnées du repère
 * @property {number} ymin Ordonnée minimale du repère
 * @property {number} ymax Ordonnée maximale du repère
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
function Integrale (f, { repere = {}, color = 'black', couleurDeRemplissage = 'blue', epaisseur = 2, step = false, a = 0, b = 1, opacite = 0.5, hachures = 0 } = {}) {
  ObjetMathalea2D.call(this, { })
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

/**
 * Trace l'aire entre la courbe d'une fonction et l'axe des abscisses
 * @param {function} f fonction dont on veut tracer l'aire entre sa courbe et l'axe des abscisses comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du contour de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du contour de l'aire
 * @param {string} [parametres.couleurDeRemplissage = 'blue']  Couleur de l'intérieur de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.opacite = 0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.hachures = 0] Style des hachures dans cette aire (entier entre 0 et 10).
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses pour tracer l'aire est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.a = 0]  Abscisse minimale du tracé de la courbe avec a < b
 * @param {number} [parametres.b = 1]  Abscisse maximale du tracé de la courbe avec a < b
 * @example integrale(g, {repere: r})
 * // Trace avec une épaisseur de 2, l'aire entre la courbe de la fonction g et l'axe des abscisses dans le repère r, tous deux précédemment définis.
 * @example integrale(g,  {repere: r, epaisseur: 5, color: 'blue', couleurDeRemplissage: 'red'})
 * // Trace avec une épaisseur de 5, l'aire entre la courbe de la fonction g et l'axe des abscisses dans le repère r, tous deux précédemment définis. L'aire est entourée de bleu et remplie de rouge.
 * @author Rémi Angot
 * @return {Integrale}
 */
// JSDOC Validee par EE Juin 2022
export function integrale (f, { repere = {}, color = 'black', couleurDeRemplissage = 'blue', epaisseur = 2, step = false, a = 0, b = 1, opacite = 0.5, hachures = 0 } = {}) {
  return new Integrale(f, { repere: repere, color: color, couleurDeRemplissage: couleurDeRemplissage, epaisseur: epaisseur, step: step, a: a, b: b, opacite: opacite, hachures: hachures })
}

/**
 * Trace la courbe d'une fonction, précédemment définie comme Spline, dans un repère
 * @param {function} f fonction à tracer défine, au préalable, avec splineCatmullRom()
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @param {boolean} [parametres.traceNoeuds = true]  Place (ou non) les points définis dans le paramètre f.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du tracé de la courbe. À associer obligatoirement à colorToLatexOrHTML().
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CourbeSpline (f, { repere = {}, color = 'black', epaisseur = 2, step = false, xMin = repere.xMin, xMax = repere.xMax, yMin = repere.yMin, yMax = repere.yMax, xUnite = 1, yUnite = 1, traceNoeuds = true } = {}) {
  ObjetMathalea2D.call(this, { })
  this.color = color
  const noeuds = []
  let points = []
  let xunite, yunite // Tout en minuscule pour les différencier des paramètres de la fonction
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
  for (let x = xMin; inferieurouegal(x, xMax); x = x + pas) {
    y = f.image(x)
    if (!isNaN(y)) {
      if (y < yMax + 1 && y > yMin - 1) {
        points.push(point(x * xunite, y * yunite))
      } else if (points.length > 0) {
        p = polyline([...points], this.color)
        p.epaisseur = epaisseur
        p.opacite = 0.7
        objets.push(p)
        points = []
      }
    } else {
      x += 0.05
    }
  }
  p = polyline([...points], this.color)
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

/**
 * Trace la courbe d'une fonction, précédemment définie comme Spline, dans un repère
 * @param {function} f fonction à tracer défine, au préalable, avec splineCatmullRom()
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @param {boolean} [parametres.traceNoeuds = true]  Place (ou non) les points définis dans le paramètre f.
 * @example courbeSpline(g, {repere: r})
 * // Trace, en noir avec une épaisseur de 2, la courbe spline g dans le repère r, tous deux précédemment définis.
 * @example courbeSpline(g, {repere: r, epaisseur: 5, color: 'blue'})
 * // Trace la courbe spline g dans le repère r, tous deux précédemment définis, en bleu, avec une épaisseur de 5.
 * @author Jean-Claude Lhote
 * @return {CourbeSpline}
 */
// JSDOC Validee par EE Juin 2022
export function courbeSpline (f, { repere = {}, color = 'black', epaisseur = 2, step = false, xMin = repere.xMin, xMax = repere.xMax, yMin = repere.yMin, yMax = repere.yMax, xUnite = 1, yUnite = 1, traceNoeuds = true } = {}) {
  return new CourbeSpline(f, { repere: repere, color: color, epaisseur: epaisseur, step: step, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, xUnite: xUnite, yUnite: yUnite, traceNoeuds: traceNoeuds })
}

/**
 * @SOURCE : https://gist.github.com/ericelliott/80905b159e1f3b28634ce0a690682957
 * @private
 */
// y1: start value
// y2: end value
// mu: the current frame of the interpolation,
//     in a linear range from 0-1.
const cosineInterpolate = (y1, y2, mu) => {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2
  return y1 * (1 - mu2) + y2 * mu2
}

/**
 * Trace la courbe d'une fonction interpolée, linéaire par parties, dans un repère
 * @param {Array.number[]} tableau Ce tableau de tableaux contient les coordonnées des points à rejoindre comme par exemple : [[-5,2],[-1,-7],[2,5],[3,-1]]
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = { xMin: -1, yMin: 1 }] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
function CourbeInterpolee (
  tableau,
  {
    color = 'black',
    epaisseur = 2,
    repere = { xMin: -1, yMin: 1 },
    xMin = repere.xMin,
    xMax = repere.xMax
  } = {}) {
  ObjetMathalea2D.call(this, { })
  const mesCourbes = []
  for (let i = 0; i < tableau.length - 1; i++) {
    const x0 = tableau[i][0]
    const y0 = tableau[i][1]
    const x1 = tableau[i + 1][0]
    const y1 = tableau[i + 1][1]
    const f = (x) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
    let depart, fin
    xMin > x0 ? (depart = xMin) : (depart = x0)
    xMax < x1 ? (fin = xMax) : (fin = x1)
    const c = courbe(f, { repere, xMin: depart, xMax: fin, color, epaisseur })
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
 * Trace la courbe d'une fonction interpolée, linéaire par parties, dans un repère
 * @param {Array.number[]} tableau Ce tableau de tableaux contient les coordonnées des points à rejoindre comme par exemple : [[-5,2],[-1,-7],[2,5],[3,-1]]
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @example courbeInterpolee(tab, {repere: r})
 * // Trace, en noir avec une épaisseur de 2, la courbe de la fonction interpolée sur les intervalles définis dans tab, dans le repère r, tous deux précédemment définis.
 * @example courbeInterpolee(tab, {repere: r, epaisseur: 5, color: 'blue'})
 * // Trace la courbe de la fonction interpolée sur les intervalles définis dans tab, dans le repère r, tous deux précédemment définis, en bleu avec une épaisseur de 5.
 * @author Rémi Angot
 * @return {CourbeInterpolee}
 */
// JSDOC Validee par EE Juin 2022
export function courbeInterpolee (tableau, { color = 'black', epaisseur = 1, repere = {}, xMin = -10, xMax = 10 } = {}) {
  return new CourbeInterpolee(tableau, { color: color, epaisseur: epaisseur, repere: repere, xMin: xMin, xMax: xMax })
}

function GraphiqueInterpole (
  tableau, {
    color = 'black',
    epaisseur = 1,
    repere = {}, // repère par défaut : le laisser...
    step = 0.2
  } = {}

) {
  ObjetMathalea2D.call(this, { })
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
    const c = courbe(f, { repere: repere, step: step, xMin: depart, xMax: fin, color: color, epaisseur: epaisseur, xUnite: repere.xUnite, yUnite: repere.yUnite, yMin: repere.yMin, yMax: repere.yMax })
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
  ObjetMathalea2D.call(this, { })
  this.epaisseur = 2
  this.color = colorToLatexOrHTML(color)
  this.taille = 0.2
  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
  ObjetMathalea2D.call(this, { })
  this.epaisseur = 2
  this.color = colorToLatexOrHTML(color)
  this.taille = 0.2

  this.svg = function (coeff) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
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
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
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
  ObjetMathalea2D.call(this, { })
  this.color = colorToLatexOrHTML(color)
  this.contour = false
  this.taille = 10 * scale
  this.opacite = 1
  this.couleurDeRemplissage = this.color
  this.opaciteDeRemplissage = this.opacite
  if (typeof texte === 'number' || texte instanceof Decimal) texte = stringNombre(texte)
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
  ObjetMathalea2D.call(this, { })
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
  ObjetMathalea2D.call(this, { })
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
      code = `\\draw (${x},${y}) node[anchor = center] {\\colorbox ${this.colorBackground[1]}{${taille}  $\\color${this.color[1]}{${texte}}$}};`
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
 * Renvoie la mesure d'angle en degré
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {integer} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle
 * @example x = angle(H,E,T)
 * // x contient la mesure en degré de l'angle HET, arrondi au centième
 * @example x = angle(H,E,T,0)
 * // x contient la mesure en degré de l'angle HET, arrondi à l'unité
 * @return {number}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function angle (A, O, B, precision = 2) {
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
    return arrondi((Math.acos(arrondi((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 12)) * 180) / Math.PI, precision)
  }
}

/**
 * Convertit un nombre de degrés quelconque en une mesure comprise entre -180 et 180
 * @param {number} a Valeur en degrés dont on cherche la valeur entre -180 et 180
 * @example x = angleModulo(170)
 * // x contient 170
 * @example x = angleModulo(190)
 * // x contient -170
 * @example x = angleModulo(3690)
 * // x contient 90
 * @example x = angleModulo(180)
 * // x contient 180
 * @example x = angleModulo(-180)
 * // x contient 180
 * @return {number}
 */
// JSDOC Validee par EE Juin 2022
export function angleModulo (a) {
  while (a <= -180) a = a + 360
  while (a > 180) a = a - 360
  return a
}

/**
 * Retourne la valeur signée de la mesure d'un angle en degré
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {integer} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle orienté
 * @example x = angleOriente(H,E,T)
 * // x contient la valeur de la mesure de l'angle orienté HET, arrondie au centième
 * @example x = angleOriente(H,E,T,0)
 * // x contient la valeur de la mesure de l'angle orienté HET, arrondie à l'unité
 * @return {number}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022
export function angleOriente (A, O, B, precision = 2) {
  const A2 = rotation(A, O, 90)
  const v = vecteur(O, B); const u = vecteur(O, A2)
  return arrondi(unSiPositifMoinsUnSinon(arrondi(v.x * u.x + v.y * u.y, 10)) * angle(A, O, B), precision)
}

/**
 * Retourne la valeur la mesure d'un angle en radian
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {integer} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle orienté
 * @example x = angleradian(H,E,T)
 * // x contient la valeur de la mesure de l'angle HET en radians, arrondie au centième
 * @example x = angleradian(H,E,T,0)
 * // x contient la valeur de la mesure de l'angle HET en radians, arrondie à l'unité
 * @return {number}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function angleradian (A, O, B, precision = 2) {
  const OA = longueur(O, A)
  const OB = longueur(O, B)
  const AB = longueur(A, B)
  return calcul(Math.acos(arrondi((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB), 12)), precision)
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
            <circle cx="3" cy="3" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="8" cy="3" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="3" cy="8" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="8" cy="8" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            </pattern>`
        break
      case 'crosshatch dots':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="12" y="12" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="8" cy="2" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="5" cy="5" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="2" cy="8" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="8" cy="8" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="5" cy="11" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="11" cy="5" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="11" cy="11" r="1.5" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
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
          <polygon points="4,4 8,4 8,0 4,0 "  fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}" />
          <polygon points="0,4 4,4 4,8 0,8 "  fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}" />
        
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

/**  Crée un labyrinthe de nombres.
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.taille = 1]
 * @param {string} [parametres.color = 'texte']
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Jean-Claude Lhote & Eric Elter (améliorée par EE pour choisir le nombre de lignes et de colonnes)
 * Publié le 6/12/2020
 * @class
 */
// JSDOC Validee par EE Septembre 2022
function Labyrinthe (
  {
    taille = 1,
    color = 'brown',
    nbLignes = 3,
    nbColonnes = 6
  } = {}
) {
  this.nombres = [[]] // Le tableau de nombres doit être de format [6][3]

  function arrayCopy (arr) {
    return JSON.parse(JSON.stringify(arr))
  }

  // Permet de tester si un tableau est contenu dans un autre.
  // tableauDansTableau([0, 1, 0, 0, 1, 1, 1, 0],[1, 1]) Permet de tester si [1, 1] est contenu dans [[0, 1], [0, 0], [1, 1], [1, 0]]
  function tableauDansTableau (gdTableau, petitTableau) {
    let test = false
    let k = 0
    do {
      if (gdTableau[k] === petitTableau[0] && gdTableau[k + 1] === petitTableau[1]) test = true
      k++
      k++
    } while (!test && k < gdTableau.length)
    return test
  }

  let cheminsEE = [[1, 0]] // [[colonne,ligne]]
  const casesVoisinesTableau = [[-1, 0], [0, 1], [1, 0], [0, -1]] // Nord ; Est ; Sud ; Ouest

  function rechercheCheminsPossibles (caseActuelle, indiceCheminActuel, dejaParcourus) {
    const casesPossibles = []
    let prochaineCasePossible = []

    for (const element of Visitables) {
      prochaineCasePossible = [caseActuelle[0] + element[0], caseActuelle[1] + element[1]] // Test de l'ouest
      if (prochaineCasePossible[0] === nbColonnes) { // On est arrivé
        return [nbColonnes, prochaineCasePossible[1]]
      } else if (!tableauDansTableau(dejaParcourus, prochaineCasePossible)) {
        if (prochaineCasePossible[0] < nbColonnes + 1 && prochaineCasePossible[0] > 0 && prochaineCasePossible[1] < nbLignes && prochaineCasePossible[1] > -1) {
          const casesVoisines = []
          const elementPrecedent = [-1 * element[0], -1 * element[1]] // D'où vient la case actuelle ?
          for (let k = 0; k < 4; k++) {
            if (!(casesVoisinesTableau[k][0] === elementPrecedent[0] && casesVoisinesTableau[k][1] === elementPrecedent[1])) casesVoisines.push(casesVoisinesTableau[k])
          }

          let nonVoisin = true // Les cases voisines sont accessibles
          for (const element2 of casesVoisines) { // Recherche si les cases voisines à la prochaine case possible n'ont pas déjà été parcourues.
            nonVoisin &&= !tableauDansTableau(dejaParcourus, [prochaineCasePossible[0] + element2[0], prochaineCasePossible[1] + element2[1]])
          }
          if (nonVoisin) casesPossibles.push(prochaineCasePossible) // Cette prochaine case possible est validée.
        }
      }
    }
    if (casesPossibles.length === 0) {
      return [0, 0] // Case impossible, retour en arriere
    } else {
      let cheminAVenir
      const tableauIndiceFuturChemin = []
      for (let ee = casesPossibles.length - 1; ee > 0; ee--) { // Préparation à la création d'un nouveau chemin
        cheminsEE.push([])
        tableauIndiceFuturChemin[ee] = cheminsEE.length - 1
      }
      for (let ee = casesPossibles.length - 1; ee > 0; ee--) {
        cheminsEE[tableauIndiceFuturChemin[ee]] = cheminsEE[indiceCheminActuel].concat(casesPossibles[ee]) // Le début du nouveau chemin correspond au chemin déjà en cours
        cheminAVenir = rechercheCheminsPossibles(casesPossibles[ee], tableauIndiceFuturChemin[ee], dejaParcourus.concat(casesPossibles[ee]))
        if (cheminAVenir !== undefined) {
          cheminsEE[tableauIndiceFuturChemin[ee]].push(cheminAVenir[0])
          cheminsEE[tableauIndiceFuturChemin[ee]].push(cheminAVenir[1])
        }
      }
      cheminsEE[indiceCheminActuel].push(casesPossibles[0][0])
      cheminsEE[indiceCheminActuel].push(casesPossibles[0][1])
      const prochainChemin = rechercheCheminsPossibles(casesPossibles[0], indiceCheminActuel, dejaParcourus.concat(casesPossibles[0]))
      if (prochainChemin !== undefined) {
        cheminsEE[indiceCheminActuel].push(prochainChemin[0])
        cheminsEE[indiceCheminActuel].push(prochainChemin[1])
      }
    }
  }
  let cheminDejaParcouru = [1, 0]
  const Visitables = [[1, 0], [0, -1], [-1, 0], [0, 1]] // Nord ; Est ; Sud ; Ouest
  cheminsEE[0].push(rechercheCheminsPossibles([1, 0], 0, cheminDejaParcouru))
  enleveElement(cheminsEE[0], undefined) // Obligé d'enlever un undefined qui traine sans savoir pourquoi.
  let cheminTableauSimple = [[]]
  cheminTableauSimple = arrayCopy(cheminsEE)

  for (let k = 1; k < nbLignes; k++) {
    cheminsEE = [[1, k]]
    cheminDejaParcouru = [1, k]
    cheminsEE[0].push(rechercheCheminsPossibles([1, k], 0, cheminDejaParcouru))
    enleveElement(cheminsEE[0], undefined) // Obligé d'enlever un undefined qui traine sans savoir pourquoi.
    cheminTableauSimple = cheminTableauSimple.concat(cheminsEE)
  }

  for (let k = cheminTableauSimple.length - 1; k >= 0; k--) { // On élimine les voies sans issues, celles se terminant par 0, 0
    if (cheminTableauSimple[k][cheminTableauSimple[k].length - 2] === 0) cheminTableauSimple.splice(k, 1)
  }
  cheminTableauSimple.sort((a, b) => b.length - a.length) // On trie les chemins du plus court au plus long...

  const chemins = []
  let elementchemin = []

  // Le passage ci-dessous est obligatoire pour passer d'un tableau 2d à un tableau 3d
  // afin d'être en adéquation avec la fonction Labyrinthe() Version 1

  for (let i = 0; i < cheminTableauSimple.length; i++) { // on double le nombre de chemins par Symétrie.
    elementchemin = []
    for (let j = 0; j < cheminTableauSimple[i].length / 2; j++) {
      elementchemin.push([cheminTableauSimple[i][2 * j], cheminTableauSimple[i][2 * j + 1]])
    }
    chemins.push(elementchemin)
  }

  // Gestion des vitesses : Escargot, ..., Guépard

  let tableauDeVitesses = [] // Plus la vitesse est grande, moins le trajet est long
  const vitessePetite = cheminTableauSimple[0].length
  const vitesseGrande = cheminTableauSimple[cheminTableauSimple.length - 1].length
  const ecartVitesse = (vitessePetite - vitesseGrande) / 4
  for (let k = 0; k < 4; k++) {
    tableauDeVitesses.push(cheminTableauSimple.findIndex((element) => element.length < vitessePetite - k * ecartVitesse))
  }
  tableauDeVitesses[4] = cheminTableauSimple.length
  tableauDeVitesses = tableauDeVitesses.map(element => element - 1)
  console.log(tableauDeVitesses)
  this.choisitChemin = function (niveau) { // retourne un chemin en fonction du niveau de difficulté
    let choixchemin
    switch (niveau) {
      case 1: choixchemin = randint(0, tableauDeVitesses[0])
        break
      case 2:
      case 3:
      case 4:
      case 5:
        choixchemin = randint(tableauDeVitesses[niveau - 2] + 1, tableauDeVitesses[niveau - 1])
        break
      case 6: choixchemin = randint(0, cheminTableauSimple.length - 1)
        break
    }
    return chemins[choixchemin]
  }

  // Retourne le tableau d'objets des murs en fonction du point d'entrée de chemin
  this.construitMurs = function (chemin) {
    const objets = []; let s1; let s2
    const choix = chemin[0][1]
    for (let i = 0; i < nbColonnes; i++) { // Construction des T supérieurs et inférieurs
      // T inférieurs
      s1 = segment(point(i * 3, 1), point(i * 3, 2))
      s1.epaisseur = 2
      objets.push(s1)
      // T supérieurs
      s2 = segment(point(i * 3, 1 + 3 * nbLignes), point(i * 3, 3 * nbLignes))
      s2.epaisseur = 2
      objets.push(s2)
    }

    // Construction du bord gauche entre le départ et le labyrinthe
    s1 = segment(point(0, 1 + 3 * nbLignes), point(0, 3 + choix * 3))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(0, 1), point(0, 2 + choix * 3))
    s1.epaisseur = 3
    objets.push(s1)

    // Construction case départ
    s1 = segment(point(-3, 1 + choix * 3), point(0, 1 + choix * 3), 'green')
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(-3, 1 + choix * 3), point(-3, 4 + choix * 3), 'green')
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(-3, 4 + choix * 3), point(0, 4 + choix * 3), 'green')
    s1.epaisseur = 3
    objets.push(s1)
    objets.push(texteParPoint('Départ', point(-1.5, 2.5 + choix * 3), 'milieu', 'blue', taille, 0, false))

    // les croix centrales communes à A et B
    for (let i = 1; i < nbColonnes; i++) {
      for (let k = 0; k < nbLignes - 1; k++) {
        s1 = segment(point(i * 3, 5 + 3 * k), point(i * 3, 3 + 3 * k), 'black')
        s1.epaisseur = 2
        s2 = segment(point(i * 3 - 0.5, 4 + 3 * k), point(i * 3 + 0.5, 4 + 3 * k), 'black')
        s2.epaisseur = 2
        objets.push(s2, s1)
      }
    }
    // le pourtour commun
    s1 = segment(point(0, 1 + 3 * nbLignes), point(3 * nbColonnes, 1 + 3 * nbLignes))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(3 * nbColonnes, 1 + 3 * nbLignes - 1), point(3 * nbColonnes, 1 + 3 * nbLignes))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(3 * nbColonnes, 1), point(3 * nbColonnes, 2))
    s1.epaisseur = 3
    objets.push(s1)
    s1 = segment(point(0, 1), point(3 * nbColonnes, 1))
    s1.epaisseur = 3
    objets.push(s1)

    // les sorties
    // La partie verticale
    for (let i = 0; i < nbLignes - 1; i++) {
      s1 = segment(point(3 * nbColonnes, 3 + i * 3), point(3 * nbColonnes, 5 + i * 3))
      s1.epaisseur = 3
      objets.push(s1)
    }
    // La partie horizontale
    for (let i = 0; i < nbLignes; i++) {
      s1 = segment(point(3 * nbColonnes, 2 + i * 3), point(3 * nbColonnes + 2, 2 + i * 3))
      s1.epaisseur = 3
      s2 = segment(point(3 * nbColonnes, 3 + i * 3), point(3 * nbColonnes + 2, 3 + i * 3))
      s2.epaisseur = 3
      objets.push(s1, s2)
    }
    // Le texte
    for (let i = 1; i <= nbLignes; i++) {
      objets.push(texteParPoint(`Sortie ${i}`, point(3 * nbColonnes + 1.5, 2.5 + 3 * nbLignes - 3 * i), 'milieu', 'blue', taille, 0, false))
    }
    return objets
  }

  // Retourne le tableau d'objets du chemin correction
  this.traceChemin = function (monchemin) {
    let y = monchemin[0][1]
    let x = 0; const chemin2d = []; let s1
    for (let j = 0; j < monchemin.length; j++) {
      s1 = segment(point(x * 3 - 1.5, y * 3 + 2.5), point(monchemin[j][0] * 3 - 1.5, monchemin[j][1] * 3 + 2.5), color)
      s1.pointilles = 5
      s1.stylePointilles = 2
      s1.epaisseur = 5
      s1.opacite = 0.3
      chemin2d.push(s1)
      x = monchemin[j][0]
      y = monchemin[j][1]
    }
    s1 = segment(point(x * 3 - 1.5, y * 3 + 2.5), point(x * 3 + 1.5, y * 3 + 2.5), color)
    s1.pointilles = 5
    s1.stylePointilles = 2
    s1.epaisseur = 5
    s1.opacite = 0.3
    chemin2d.push(s1)
    return chemin2d
  }
  // Retourne le tableau d'objets des nombres
  this.placeNombres = function (nombres, taille) {
    const objets = []
    for (let a = 1; a < nbColonnes + 1; a++) {
      for (let b = 0; b < nbLignes; b++) {
        if (typeof (nombres[a - 1][b]) === 'number') {
          objets.push(texteParPoint(nombreAvecEspace(nombres[a - 1][b]), point(-1.5 + a * 3, 2.5 + b * 3), 'milieu', 'black', taille, 0, true))
        } else if (typeof (nombres[a - 1][b]) === 'string') { // écriture mode Maths
          objets.push(texteParPosition(nombres[a - 1][b], -1.5 + a * 3, 2.5 + b * 3, 'milieu', 'black', taille, 0, true))
        } else {
          objets.push(latexParCoordonnees(nombres[a - 1][b].texFraction, -1.5 + a * 3, 2.5 + b * 3, 'black', 20, 20, 'white', 6))
        }
      }
    }
    return objets
  }
} // fin de la classe labyrinthe
export function labyrinthe ({ taille = 1, color = 'brown', nbLignes = 3, nbColonnes = 6 } = {}) {
  return new Labyrinthe({ taille: taille, color: color, nbLignes: nbLignes, nbColonnes: nbColonnes })
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
            P4 = polygoneRegulier(C, B, 4)
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
            P2 = polygoneRegulier(B, A, 8)
            P3 = translation(P1, v)
            P4 = translation(P2, v)
            P5 = polygoneRegulier(C, B, 4)
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
      this.tracesCentres.push(tracePoint(this.barycentres[i], 'blue'))
      this.tracesCentres[i].opacite = 0.5
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
  ObjetMathalea2D.call(this, { })
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
  ObjetMathalea2D.call(this, { })
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
