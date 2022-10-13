/** @module polygones */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES POLYGONES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import earcut from 'earcut'
import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites.js'
import { context } from '../context.js'
import { barycentre } from './barycentre.js'
import { longueur } from './calculs.js'
import { codageAngleDroit, codageSegments } from './codages.js'
import { labelPoint } from './labelPoint.js'
import { pattern } from './motif.js'
import { point } from './point.js'
import { pointSurSegment } from './pointSur.js'
import { segment } from './segment.js'
import { latexParCoordonnees, texteParPoint, texteParPositionEchelle } from './textes.js'
import { rotation } from './transformations.js'
import { aireTriangle } from './triangle.js'

/**
 * polygone(A,B,C,D,E) //Trace ABCDE
 * polygone([A,B,C,D],"blue") // Trace ABCD en bleu
 * polygone([A,B,C,D],"blue","red","green") // Trace ABCD en bleu, rempli en rouge et hachuré en vert.
 * @author Rémi Angot*
 * @class
 */
export function Polygone (...points) {
  ObjetMathalea2D.call(this, { })
  this.opaciteDeRemplissage = 1
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
      if (this.couleurDeRemplissage[0] === '' || this.couleurDeRemplissage[0] === undefined) {
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

    if (this.couleurDeRemplissage[1] !== '' && this.couleurDeRemplissage[1] !== 'none') {
      tableauOptions.push(`preaction={fill,color = ${this.couleurDeRemplissage[1]}${this.opaciteDeRemplissage !== 1 ? ', opacity = ' + this.opaciteDeRemplissage : ''}}`)
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
