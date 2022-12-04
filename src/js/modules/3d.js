import { point, vecteur, droite, segment, polyline, polygone, polygoneAvecNom, longueur, distancePointDroite, tracePoint, translation, norme, pointSurSegment, renommePolygone, labelPoint, pointIntersectionDD } from './2d.js'
import { matrix, multiply, norm, cross, dot } from 'mathjs'
import { context } from './context.js'
import { assombrirOuEclaircir, colorToLatexOrHTML, vide2d } from './2dGeneralites.js'
import { arrondi, choisitLettresDifferentes } from './outils.js'
const math = { matrix: matrix, multiply: multiply, norm: norm, cross: cross, dot: dot }

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJET PARENT %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*
 * Classe parente de tous les objets de MathALEA2D
 *
 * @author Rémi Angot
 */
let numId = 0
function ObjetMathalea2D () {
  this.positionLabel = 'above'
  this.isVisible = true
  this.color = colorToLatexOrHTML('black')
  this.style = '' // stroke-dasharray="4 3" pour des hachures //stroke-width="2" pour un trait plus épais
  this.styleTikz = ''
  this.epaisseur = 1
  this.opacite = 1
  this.pointilles = false
  this.id = numId
  numId++
  //   mesObjets.push(this);
  context.objets2D.push(this)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS DE BASE %%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * LE POINT
 *
* @author Jean-Claude Lhote
* Point de l'espace défini par ses trois coordonnées (Si deux sont données seulement, le point est dans le plan XY)
* le paramètre visible définit si ce point est placé devant (par défaut) ou derrière une surface. Il sera utilisé pour définir la visibilité des arêtes qui en partent
*/
class Point3d {
  constructor (x, y, z, visible, label, positionLabel) {
    const alpha = context.anglePerspective * Math.PI / 180 // context.anglePerspective peut être changé globalement pour modifier la perspective
    const rapport = context.coeffPerspective // idem pour context.coefficientPerspective qui est la réduction sur l'axe y.
    const MT = math.matrix([[1, rapport * Math.cos(alpha), 0], [0, rapport * Math.sin(alpha), 1]]) // La matrice de projection 3d -> 2d
    this.x = x
    this.y = y
    this.z = z
    this.visible = visible
    this.label = label
    this.typeObjet = 'point3d'
    const V = math.matrix([this.x, this.y, this.z])
    const W = math.multiply(MT, V)
    this.c2d = point(W._data[0], W._data[1], this.label, positionLabel)
  }
}
export function point3d (x, y, z = 0, visible = true, label = '', positionLabel = 'above left') {
  return new Point3d(x, y, z, visible, label, positionLabel)
}

/**
   * LE VECTEUR
   *
   * @author Jean-Claude Lhote
   * le vecteur3d est sans doute l'objet le plus important de cette base d'objets
   * On les utilise dans tous les objets complexes et dans toutes les transformations
   * Ils servent notament à définir la direction des plans.
   *
   * 3 usages : vecteur3d(A,B) ou vecteur3d(x,y,z) ou vecteur3d(math.matrix([x,y,z]))
   * A et B sont deux objets de type Point3d
   * x,y et z sont trois nombres
   * la commande math.matrix([x,y,z]) crée une matrice colonne.
   *
   * L'objet créé est de type Vecteur3d
   * sa propriété p2d est un objet Vecteur (2 dimensions : c'est la projection du vecteur)
   * sa propriété this.representant(A) est le dessin du représentant d'origine A.
   * exemples :
   * let v = vecteur3d(3,5,1) -> définit un vecteur de composantes (3;5;1)
   * let w = vecteur(point3d(0,0,0),point3d(1,1,1)) -> définit un vecteur d'origine O et d'extrémité M(1;1;1)
   * let fleche = w.representant(point3d(5,0,0)) -> fleche est un objet 2d qui représente le vecteur w au point (5;0;0)
   */
class Vecteur3d {
  constructor (...args) {
    const alpha = context.anglePerspective * Math.PI / 180
    const rapport = context.coeffPerspective
    const MT = math.matrix([[1, rapport * Math.cos(alpha), 0], [0, rapport * Math.sin(alpha), 1]]) // ceci est la matrice de projection 3d -> 2d
    if (args.length === 2) {
      this.x = args[1].x - args[0].x
      this.y = args[1].y - args[0].y
      this.z = args[1].z - args[0].z
    } else {
      if (typeof (args[0]) === 'number') {
        this.x = args[0]
        this.y = args[1]
        this.z = args[2]
      } else if (args.length === 1) {
        this.x = args[0]._data[0]
        this.y = args[0]._data[1]
        this.z = args[0]._data[2]
      }
    }
    this.matrice = math.matrix([this.x, this.y, this.z]) // On exporte cette matrice colonne utile pour les calculs vectoriels qui seront effectués par math.js
    this.norme = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) // la norme du vecteur
    const W = math.multiply(MT, this.matrice) // voilà comment on obtient les composantes du projeté 2d du vecteur
    this.c2d = vecteur(W._data[0], W._data[1]) // this.c2d est l'objet 2d qui représente l'objet 3d this
    this.representant = function (A) { // méthode pour construire un représentant d'origine A (un point 3d)
      const B = translation3d(A, this)
      return vecteur(A.c2d, B.c2d).representant(A.c2d) // qui retourne un représentant de vecteur 2d (objet dessiné)
    }
  }
}

export function vecteur3d (...args) { // A,B deux Point3d ou x,y,z les composantes du vecteur
  return new Vecteur3d(...args)
}

/**
   * L'ARETE
   * @author Jean-Claude lhote
   * Une telle arête est définie par deux points
   * Si l'un des deux points n'est pas visible (propriété visible à false) alors l'arête aura aussi visible à false
   * sa propriété p2d est un segment en pointillé ou en trait plein suivant sa visibilité.
   */
class Arete3d {
  constructor (point1, point2, color, visible) {
    this.extremite1 = point1
    this.extremite2 = point2
    this.color = color
    this.visible = visible
    if (!point1.visible || !point2.visible || !this.visible) {
      this.visible = false
    } else {
      this.visible = true
    }
    this.c2d = segment(point1.c2d, point2.c2d, this.color)
    if (!this.visible) {
      this.c2d.pointilles = 2
    } else {
      this.c2d.pointilles = false
    }
  }
}
// l'arête est visible par défaut sauf si p1 ou p2 sont invisibles
export function arete3d (p1, p2, color = 'black', visible = true) {
  return new Arete3d(p1, p2, color, visible)
}

/**
   * LA DROITE
   *
   * @author Jean-claude Lhote
   * Droite de l'espace définie par point et vecteur directeur droite3d(A,v)
   * Droite de l'espace définie par 2 points droite3d(A,B)
   * Les droites servent principalement à définir des axes de rotation dans l'espace
   */
class Droite3d {
  constructor (point3D, vecteur3D) {
    if (vecteur3D.constructor === Vecteur3d) {
      this.directeur = vecteur3D
    } else if (vecteur3D.constructor === Point3d) {
      this.directeur = vecteur3d(point3D, vecteur3D)
    }
    this.origine = point3D
    const M = translation3d(this.origine, this.directeur)
    this.point = M
    this.c2d = droite(this.origine.c2d, M.c2d) // la droite correspndant à la projection de cette droite dans le plan Mathalea2d
    this.c2d.isVisible = false
  }
}

export function droite3d (point3D, vecteur3D) {
  return new Droite3d(point3D, vecteur3D)
}

/**
 * LE DEMI-CERCLE
 *
 *@author Jean-Claude Lhote
 * Le nom est trompeur, il s'agit le plus souvent d'une demi-ellipse représentant un cercle projeté
 * Utilisé pour représenter un cercle dont une moitié est visible mais pas l'autre.
 *
 * normal et rayon sont deux vecteurs 3d
 * normal est un vecteur normal au plan du cercle
 * rayon est le vecteur qui part du centre et qui joint la 1ere extremité visible.
 * cote est soit 'caché' soit 'visible' et déterminera dans quel sens on crée le demi-cercle.
 * Si cote='caché' alors on tourne dans le sens direct et le tracé est en pointillés
 * Si cote='visible' alors on tourne dans le sens indirect et le tracé est plein.
 *
 */
export function demicercle3d (centre, normal, rayon, cote, color, angledepart = context.anglePerspective) {
  let signe; const M = []; const listepoints = []
  if (cote === 'caché') {
    signe = 1
  } else {
    signe = -1
  }
  const d = droite3d(centre, normal)
  M.push(rotation3d(translation3d(centre, rayon), d, angledepart))
  listepoints.push(M[0].c2d)

  for (let i = 1; i < 19; i++) {
    M.push(rotation3d(M[i - 1], d, 10 * signe))
    listepoints.push(M[i].c2d)
  }
  const demiCercle = polyline(listepoints, color)
  if (cote === 'caché') {
    demiCercle.pointilles = 2
    demiCercle.opacite = 0.3
  }
  return demiCercle
}

// Cette fonction est provisoire... en attente de validation de tous les tests pour remplacer celle du dessus.
export function demicercle3dEE (centre, normal, rayon, sens, estCache = false, color, angledepart = context.anglePerspective) {
  let signe; const M = []; const listepoints = []
  const listePoints3d = []
  if (sens === 'direct') {
    signe = 1
  } else {
    signe = -1
  }
  const d = droite3d(centre, normal)
  M.push(rotation3d(translation3d(centre, rayon), d, angledepart))
  listePoints3d.push(M[0])
  listepoints.push(M[0].c2d)

  for (let i = 1; i < 19; i++) {
    M.push(rotation3d(M[i - 1], d, 10 * signe))
    listePoints3d.push(M[i])
    listepoints.push(M[i].c2d)
  }
  const demiCercle = polyline(listepoints, color)
  if (estCache) {
    demiCercle.pointilles = 2
    demiCercle.opacite = 0.9
  }
  //  return [demiCercle, listePoints3d]
  return demiCercle
}

/**
 * L'ARC
 *
 *@author Mickael Guironnet
 * Le nom est trompeur, il s'agit le plus souvent d'un morceau d'ellipse représentant un arc projeté
 * Utilisé pour représenter un arc dont une moitié est visible mais pas l'autre.
 *
 * normal et rayon sont deux vecteurs 3d
 * normal est un vecteur normal au plan du cercle
 * rayon est le vecteur qui part du centre et qui joint la 1ere extremité visible.
 * cote est soit 'caché' soit 'visible'
 *
 */
export function arc3d (centre, normal, rayon, cote, color, angledepart, angledefin) {
  const M = []; const listepoints = []
  const d = droite3d(centre, normal)
  M.push(rotation3d(translation3d(centre, rayon), d, angledepart))
  listepoints.push(M[0].c2d)

  const nbr = Math.floor((angledefin - angledepart) / 10)
  for (let i = 1; i <= nbr; i++) {
    M.push(rotation3d(M[i - 1], d, 10))
    listepoints.push(M[i].c2d)
  }
  const arc = polyline(listepoints, color)
  if (cote === 'caché') {
    arc.pointilles = 2
    arc.opacite = 0.3
  }
  return arc
}

/**
    * LE CERCLE
    *
    * @author Jean-Claude Lhote
    *
    * C'est la version entière du cercle : soit totalement visible, soit totalement caché.
    * visible est un booléen
    *
    */
export function cercle3d (centre, normal, rayon, visible = true, color = 'black') {
  const M = []; const listepoints = []; const listepoints3d = []
  const d = droite3d(centre, normal)
  M.push(rotation3d(translation3d(centre, rayon), d, context.anglePerspective))
  listepoints3d.push(M[0])
  listepoints.push(M[0].c2d)
  for (let i = 1; i < 36; i++) {
    M.push(rotation3d(M[i - 1], d, 10))
    listepoints3d.push(M[i])
    listepoints.push(M[i].c2d)
  }
  const C = polygone(listepoints, color)
  if (!visible) {
    C.pointilles = 2
  }
  return [C, listepoints3d, listepoints]
}

/**
   * LE POLYGONE
   *
   * @author Jean-Claude Lhote
   * usages : polygone3d([A,B,C,...],color) ou polygone3d(A,B,C...) où A,B,C ... sont des point3d. color='black' par défaut.
   */
class Polygone3d {
  constructor (...args) {
    if (Array.isArray(args[0])) {
      // Si le premier argument est un tableau
      this.listePoints = args[0]
      if (args[1]) {
        this.color = args[1]
      }
    } else {
      this.listePoints = args
      this.color = 'black'
    }
    const segments3d = []; let A; const segments = []
    A = this.listePoints[0]
    this.listePoints2d = [A.c2d]
    for (let i = 1; i < this.listePoints.length; i++) {
      segments3d.push(arete3d(A, this.listePoints[i], this.color))
      segments.push(segments3d[i - 1].c2d)
      A = this.listePoints[i]
      this.listePoints2d.push(A.c2d)
    }
    segments3d.push(arete3d(A, this.listePoints[0], this.color))
    segments.push(segments3d[this.listePoints.length - 1].c2d)
    this.aretes = segments3d
    this.c2d = segments
  }
}

export function polygone3d (...args) {
  return new Polygone3d(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
   * LA SPHERE
   *
   * @author Jean-Claude Lhote
   * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
   * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
   * @param {Point3d} centre
   * @param {Number} rayon
   * @param {Number} nbParalleles
   * @param {Number} nbMeridiens
   * @param {string} color
   */
function Sphere3d (centre, rayon, nbParalleles, nbMeridiens, color) {
  ObjetMathalea2D.call(this, { })
  this.centre = centre
  this.rayon = vecteur3d(rayon, 0, 0)
  this.normal = vecteur3d(0, 0, 1)
  this.color = color
  this.nbMeridiens = nbMeridiens
  this.nbParalleles = nbParalleles
  this.c2d = []; let c1; let c2; let c3; let c4; let C; let D
  const prodvec = vecteur3d(math.cross(this.normal.matrice, this.rayon.matrice))
  const rayon2 = vecteur3d(math.cross(this.rayon.matrice, math.multiply(prodvec.matrice, 1 / math.norm(prodvec.matrice))))
  const R = rayon
  const cote1 = 'caché'
  const cote2 = 'visible'
  for (let k = 0, rayon3; k < 1; k += 1 / (this.nbParalleles + 1)) {
    C = point3d(centre.x, centre.y, centre.z + R * Math.sin(k * Math.PI / 2))
    D = point3d(centre.x, centre.y, centre.z + R * Math.sin(-k * Math.PI / 2))
    rayon3 = vecteur3d(R * Math.cos(k * Math.PI / 2), 0, 0)
    c1 = demicercle3d(C, this.normal, rayon3, cote1, this.color, context.anglePerspective)
    c2 = demicercle3d(C, this.normal, rayon3, cote2, this.color, context.anglePerspective)
    c3 = demicercle3d(D, this.normal, rayon3, cote1, this.color, context.anglePerspective)
    c4 = demicercle3d(D, this.normal, rayon3, cote2, this.color, context.anglePerspective)
    this.c2d.push(c1, c2, c3, c4)
  }
  for (let k = 0, V; k < 181; k += 90 / this.nbMeridiens) {
    V = rotationV3d(prodvec, this.normal, context.anglePerspective + k)
    c1 = demicercle3d(this.centre, V, rayon2, cote2, this.color, 0)
    c2 = demicercle3d(this.centre, V, rayon2, cote1, this.color, 0)
    this.c2d.push(c1, c2)
  }
}
export function sphere3d (centre, rayon, nbParalleles, nbMeridiens, color = 'black') {
  return new Sphere3d(centre, rayon, nbParalleles, nbMeridiens, color)
}
// nbParalleles/180 est l'angle entre chaque parallele

function Sphere3dEE (centre, rayon, colorEquateur = 'red', colorEnveloppe = 'blue', nbParalleles = 0, colorParalleles = 'gray', nbMeridiens = 0, colorMeridiens = 'gray', affichageAxe = false, colorAxe = 'black') {
  ObjetMathalea2D.call(this, { })
  this.centre = centre
  this.rayon = rayon
  this.colorEquateur = colorEquateur
  this.colorEnveloppe = colorEnveloppe
  this.nbParalleles = nbParalleles
  this.colorParalleles = colorParalleles
  this.nbMeridiens = nbMeridiens
  this.colorMeridiens = colorMeridiens
  this.affichageAxe = affichageAxe
  this.colorAxe = colorAxe
  const poleNord = point3d(0, 0, this.rayon, true, choisitLettresDifferentes(1, 'OQWX' + this.centre.label), 'left')
  const poleSud = point3d(0, 0, -this.rayon, true, choisitLettresDifferentes(1, 'OQWX' + this.centre.label + poleNord.label), 'left')

  const nbParallelesDeConstruction = 36 // Ce nb de paralleles permet de construire l'enveloppe de la sphère (le "cercle" apparent de la sphère)
  let unDesParalleles
  let centreParallele
  let rayonDuParallele
  let normal
  const paralleles = {
    listepts2d: [],
    ptCachePremier: [],
    indicePtCachePremier: [],
    ptCacheDernier: [],
    indicePtCacheDernier: []
  }
  const enveloppeSphere1 = []
  let enveloppeSphere2 = []
  let premierParallele = 100
  let indicePremier
  let indiceDernier
  this.c2d = []

  // Construction de tous les paralleles

  // Construction du parallèle le plus proche du pôle nord
  centreParallele = point3d(this.centre.x, this.centre.y, this.centre.z + this.rayon * Math.sin((nbParallelesDeConstruction - 1) / nbParallelesDeConstruction * Math.PI / 2))
  rayonDuParallele = vecteur3d(this.rayon * Math.cos((nbParallelesDeConstruction - 1) / nbParallelesDeConstruction * Math.PI / 2), 0, 0)
  normal = vecteur3d(0, 0, 1)
  unDesParalleles = cercle3d(centreParallele, normal, rayonDuParallele)
  paralleles.listepts2d.push(unDesParalleles[1])
  paralleles.ptCachePremier.push('')
  paralleles.indicePtCachePremier.push('')
  paralleles.ptCacheDernier.push('')
  paralleles.indicePtCacheDernier.push('')

  // Construction de tous les autres parallèles jusqu'au plus proche du pôle sud
  for (let k = nbParallelesDeConstruction - 2, p, j = 1; k > -nbParallelesDeConstruction; k -= 1) {
    centreParallele = point3d(this.centre.x, this.centre.y, this.centre.z + this.rayon * Math.sin(k / nbParallelesDeConstruction * Math.PI / 2))
    rayonDuParallele = vecteur3d(this.rayon * Math.cos(k / nbParallelesDeConstruction * Math.PI / 2), 0, 0)
    normal = vecteur3d(0, 0, 1)
    p = unDesParalleles[2]
    unDesParalleles = cercle3d(centreParallele, normal, rayonDuParallele)
    paralleles.listepts2d.push(unDesParalleles[1])
    for (let ee = 0; ee < paralleles.listepts2d[0].length; ee++) {
      paralleles.listepts2d[j][ee].visible = !(paralleles.listepts2d[j][ee].c2d.estDansPolygone(polygone(p)))
    }
    paralleles.ptCachePremier.push('')
    paralleles.indicePtCachePremier.push('')
    paralleles.ptCacheDernier.push('')
    paralleles.indicePtCacheDernier.push('')

    for (let ee = 0, s, s1, jj, pt; ee < paralleles.listepts2d[0].length; ee++) {
      s = segment(paralleles.listepts2d[j][ee].c2d, paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].c2d)

      // Recherche du point d'intersection entre le parallèle actuel et le précédent.
      if ((!paralleles.listepts2d[j][ee].visible) && (paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].visible)) {
        jj = ee - 3
        s1 = segment(paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj) % paralleles.listepts2d[0].length].c2d, paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj - 1) % paralleles.listepts2d[0].length].c2d)
        // Le point d'intersection avec ce segment précis du parallèle actuel est avec l'un des 7 (nombre totalement empirique) segments les plus proches du parallèle précédent.
        while (!s.estSecant(s1)) {
          jj++
          s1 = segment(paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj) % paralleles.listepts2d[0].length].c2d, paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj - 1) % paralleles.listepts2d[0].length].c2d)
        }

        // s étant secant avec s1, on mène plusieurs actions :
        pt = pointIntersectionDD(droite(paralleles.listepts2d[j][ee].c2d, paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].c2d), droite(paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj) % paralleles.listepts2d[0].length].c2d, paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj - 1) % paralleles.listepts2d[0].length].c2d))
        // 1) Tout d'abord, ce point d'intersection est donc la frontière entre le visible et le caché et on l'enregistre comme élément de l'enveloppe de la sphère
        enveloppeSphere1.push(pt)
        //  2) Ensuite, si pt est le tout premier point d'intersection trouvé, on enregistre quel est le premier parallèle et quel est son indice
        // Ces informmations serviront pour le tracé de l'enveloppe près du pôle Nord.
        if (premierParallele >= j) {
          premierParallele = j
          indicePremier = jj % paralleles.listepts2d[0].length
        }
        // 3) On note ce point pour le futur tracé du parallèle, si besoin
        paralleles.ptCachePremier[j] = pt
        paralleles.indicePtCachePremier[j] = ee
      } else if ((paralleles.listepts2d[j][ee].visible) && (!paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].visible)) {
        // Si le point précédent était l'entrée dans la partie cachée, alors celui-ci sera celui de l'entrée dans la partie visible (ou inversement)
        // car pour chaque parallèle intersecté avec le précédent, il y a "forcément" deux points sauf tangence mais ce n'est pas un pb.
        jj = ee - 3
        s1 = segment(paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj) % paralleles.listepts2d[0].length].c2d, paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj - 1) % paralleles.listepts2d[0].length].c2d)
        // On recherche le point d'intersection
        while (!s.estSecant(s1)) {
          jj++
          s1 = segment(paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj) % paralleles.listepts2d[0].length].c2d, paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj - 1) % paralleles.listepts2d[0].length].c2d)
        }
        // s étant secant avec s1, on mène plusieurs actions :
        pt = pointIntersectionDD(droite(paralleles.listepts2d[j][ee].c2d, paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].c2d), droite(paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj) % paralleles.listepts2d[0].length].c2d, paralleles.listepts2d[j - 1][(paralleles.listepts2d[0].length + jj - 1) % paralleles.listepts2d[0].length].c2d))
        // 1) Tout d'abord, ce point d'intersection est donc la frontière entre le visible et le caché et on l'enregistre comme élément de l'enveloppe de la sphère
        enveloppeSphere2.push(pt)
        // 2) Ensuite, si pt est le tout premier point d'intersection trouvé, on enregistre quel est le premier parallèle et quel est son indice
        // Ces informmations serviront pour le tracé de l'enveloppe près du pôle Sud.
        if (premierParallele >= j) {
          premierParallele = j
          indiceDernier = jj
        }
        // 3) On note ce point pour le futur tracé du parallèle, si besoin
        paralleles.ptCacheDernier[j] = pt
        paralleles.indicePtCacheDernier[j] = ee
      }
    }
    j++
  }

  if (this.nbParalleles !== 0) {
    let t = tracePoint(poleNord.c2d, this.colorParalleles)
    t.style = 'o'
    t.taille = 0.5
    this.c2d.push(t)
    t = tracePoint(poleSud.c2d, assombrirOuEclaircir(this.colorParalleles, 50))
    t.style = 'o'
    t.taille = 0.5
    this.c2d.push(t)
  }

  const divisionParalleles = this.nbParalleles !== 0 ? Math.round(2 * nbParallelesDeConstruction / this.nbParalleles) : 1
  // Construction des parallèles demandés
  for (let k = nbParallelesDeConstruction, j = -1; k > -nbParallelesDeConstruction; k -= 1) {
    if ((this.nbParalleles !== 0 || k === 0) && (k !== nbParallelesDeConstruction) && (k % divisionParalleles === 0)) { // k=0 : C'est l'équateur
      for (let ee = 0, s; ee < paralleles.listepts2d[0].length; ee++) {
        if (paralleles.indicePtCachePremier[j] === ee) {
          s = segment(paralleles.listepts2d[j][ee].c2d, paralleles.ptCachePremier[j], this.colorParalleles)
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient pas dans les petits cercles
          s.opacite = 0.5
          if (k === 0) {
            s.color = colorToLatexOrHTML(this.colorEquateur)
            s.epaisseur = 2
          }
          this.c2d.push(s)
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient pas dans les petits cercles
          s.opacite = 0.5
          s = segment(paralleles.ptCachePremier[j], paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].c2d, this.colorParalleles)
        } else if (paralleles.indicePtCacheDernier[j] === ee) {
          s = segment(paralleles.listepts2d[j][ee].c2d, paralleles.ptCacheDernier[j], this.colorParalleles)
          if (k === 0) {
            s.color = colorToLatexOrHTML(this.colorEquateur)
            s.epaisseur = 2
          }
          this.c2d.push(s)
          s = segment(paralleles.ptCacheDernier[j], paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].c2d)
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient pas dans les petits cercles
          s.opacite = 0.5
        } else {
        // Tracé des pointilles ou pas des parallèles
          s = segment(paralleles.listepts2d[j][ee].c2d, paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].c2d, this.colorParalleles)
          if ((!paralleles.listepts2d[j][ee].visible) && (!paralleles.listepts2d[j][(ee + 1) % paralleles.listepts2d[0].length].visible)) {
            s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient pas dans les petits cercles
            s.opacite = 0.5
          }
        }
        if (k === 0) {
          s.color = colorToLatexOrHTML(this.colorEquateur)
          s.epaisseur = 2
        }
        this.c2d.push(s)
      }
    }
    j++
  }

  // Construction des méridiens demandés
  if (this.nbMeridiens !== 0) {
    const divisionMeridiens = Math.round(36 / this.nbMeridiens)
    for (let k = 0; k < 18; k += divisionMeridiens) {
      for (let ee = 1, s; ee < paralleles.listepts2d.length - 1; ee++) {
        // Affichage des méridiens sans le dernier segment relié aux pôles
        s = segment(paralleles.listepts2d[ee][k].c2d, paralleles.listepts2d[(ee + 1) % paralleles.listepts2d.length][k].c2d, this.colorMeridiens)
        if ((!paralleles.listepts2d[ee][k].visible) && (!paralleles.listepts2d[(ee + 1) % paralleles.listepts2d.length][k].visible)) {
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
          s.opacite = 0.5
        }
        this.c2d.push(s)
        s = segment(paralleles.listepts2d[ee][k + 18].c2d, paralleles.listepts2d[(ee + 1) % paralleles.listepts2d.length][k + 18].c2d, this.colorMeridiens)
        if ((!paralleles.listepts2d[ee][k + 18].visible) && (!paralleles.listepts2d[(ee + 1) % paralleles.listepts2d.length][k + 18].visible)) {
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
          s.opacite = 0.5
        }
        this.c2d.push(s)

        // Affichage de la partie reliée au pôle Nord
        s = segment(poleNord.c2d, paralleles.listepts2d[1][k].c2d, this.colorMeridiens)
        this.c2d.push(s)
        s = segment(paralleles.listepts2d[1][k + 18].c2d, poleNord.c2d, this.colorMeridiens)
        this.c2d.push(s)

        // Affichage de la partie reliée au pôle Sud
        s = segment(poleSud.c2d, paralleles.listepts2d[paralleles.listepts2d.length - 1][k].c2d, this.colorMeridiens)
        if (!paralleles.listepts2d[paralleles.listepts2d.length - 1][0].visible) {
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
          s.opacite = 0.5
        }
        this.c2d.push(s)
        s = segment(paralleles.listepts2d[paralleles.listepts2d.length - 1][k + 18].c2d, poleSud.c2d, this.colorMeridiens)
        if (!paralleles.listepts2d[paralleles.listepts2d.length - 1][k].visible) {
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
          s.opacite = 0.5
        }
        this.c2d.push(s)
      }
    }
  }

  // L'enveloppe finale contiendra les points de l'enveloppe 1 + les points de l'enveloppe 2 inversée (sinon le polygone serait croisé)
  // A cela, il faut ajouter les points autour des pôles car les premiers parallèles ne s'intersectent pas forcément.
  enveloppeSphere2 = enveloppeSphere2.reverse()
  const enveloppeSphere = [...enveloppeSphere1]

  // Pour trouver les points du cercle apparent près du pôle sud
  // On va prendre les points du premier parallèle intersecté entre l'indice du premier point d'intersection et l'indice du dernier point d'intersection.
  let ii = 1
  while ((indiceDernier + paralleles.listepts2d[0].length / 2 + ii) % paralleles.listepts2d[0].length < (indicePremier + paralleles.listepts2d[0].length / 2) % paralleles.listepts2d[0].length) {
    enveloppeSphere.push(paralleles.listepts2d[2 * nbParallelesDeConstruction - 1 - premierParallele][(indiceDernier + paralleles.listepts2d[0].length / 2 + ii) % paralleles.listepts2d[0].length].c2d)
    ii++
  }
  enveloppeSphere.push(...enveloppeSphere2)
  // Pour trouver les points du cercle apparent près du pôle nord
  // On va prendre les points du premier parallèle intersecté entre l'indice du premier point d'intersection et l'indice du dernier point d'intersection.
  // La gestion des indices est plus compliquée car il arrive de repasser de 35 à 0 (36 modulo 36) d'où cette double gestion.

  if (indiceDernier > indicePremier) {
    ii = 1
    while (indiceDernier + ii < indicePremier + paralleles.listepts2d[0].length) {
      enveloppeSphere.push(paralleles.listepts2d[premierParallele][(indiceDernier + ii) % paralleles.listepts2d[0].length].c2d)
      ii++
    }
  } else {
    ii = 1
    while (indiceDernier + ii < indicePremier) {
      enveloppeSphere.push(paralleles.listepts2d[premierParallele][indiceDernier + ii].c2d)
      ii++
    }
  }
  const p = polygone(enveloppeSphere, this.colorEnveloppe)
  p.epaisseur = 2
  this.c2d.push(p)

  if (affichageAxe) {
    const l = longueur(poleNord.c2d, poleSud.c2d)
    let ee = 1
    while (ee < 2 && pointSurSegment(poleNord.c2d, poleSud.c2d, ee * l).estDansPolygone(polygone(enveloppeSphere))) {
      ee += 0.01
    }

    let s = segment(poleNord.c2d, pointSurSegment(poleNord.c2d, poleSud.c2d, Math.max(ee - 0.01, 1) * l), colorAxe)
    s.pointilles = 2
    this.c2d.push(s)
    s = segment(poleSud.c2d, pointSurSegment(poleNord.c2d, poleSud.c2d, 1.1 * l), colorAxe)
    this.c2d.push(s)
    s = segment(poleNord.c2d, pointSurSegment(poleNord.c2d, poleSud.c2d, -0.1 * l), colorAxe)
    this.c2d.push(s)
  }
}
export function sphere3dEE (centre, rayon, colorEquateur = 'red', colorEnveloppe = 'blue', nbParalleles = 0, colorParalleles = 'gray', nbMeridiens = 0, colorMeridiens = 'black', affichageAxe = false, colorAxe = 'black') {
  return new Sphere3dEE(centre, rayon, colorEquateur, colorEnveloppe, nbParalleles, colorParalleles, nbMeridiens, colorMeridiens, affichageAxe, colorAxe)
}

/**
    * LE CONE (jamais utilisé)
    *
    * @author Jean-Claude Lhote
    *
    * centrebase est le centre du disque de base
    * sommet est le sommet du cône
    * normal est un vecteur 3d normal au plan du disque (il détermine avec rayon de quel côté se trouve la partie visible)
    *
    */
/*
function Cone3d (centrebase, sommet, rayon, generatrices = 18) {
  ObjetMathalea2D.call(this, { })
  this.sommet = sommet
  this.centrebase = centrebase
  this.normal = vecteur3d(centrebase, sommet)
  if (typeof (rayon) === 'number') {
    this.rayon = vecteur3d(rayon, 0, 0)
  } else {
    this.rayon = rayon
  }
  this.c2d = []
  let s, color1, color2
  const prodvec = vecteur3d(math.cross(this.normal.matrice, this.rayon.matrice))
  const prodscal = math.dot(prodvec.matrice, vecteur3d(0, 1, 0).matrice)
  let cote1, cote2
  if (prodscal > 0) {
    cote1 = 'caché'
    color1 = 'gray'
    cote2 = 'visible'
    color2 = 'black'
  } else {
    cote2 = 'caché'
    cote1 = 'visible'
    color1 = 'black'
    color2 = 'gray'
  }
  const c1 = demicercle3d(this.centrebase, this.normal, this.rayon, cote1, color1)
  const c2 = demicercle3d(this.centrebase, this.normal, this.rayon, cote2, color2)

  for (let i = 0; i < c1.listePoints.length; i++) {
    if (i % generatrices === 0) {
      s = segment(this.sommet.c2d, c1.listePoints[i])
      if (cote1 === 'caché') {
        s.pointilles = 2
        s.color = colorToLatexOrHTML('gray')
      } else {
        s.color = colorToLatexOrHTML('black')
      }
      this.c2d.push(s)
    }
  }
  for (let i = 0; i < c2.listePoints.length; i++) {
    if (i % generatrices === 0) {
      s = segment(this.sommet.c2d, c2.listePoints[i])
      if (cote2 === 'caché') {
        s.pointilles = 2
        s.color = colorToLatexOrHTML('gray')
      } else {
        s.color = colorToLatexOrHTML('black')
      }
      this.c2d.push(s)
    }
  }
  this.c2d.push(c1, c2)
}
export function cone3d (centre, sommet, rayon, generatrices = 18) {
  return new Cone3d(centre, sommet, rayon, generatrices)
}
*/

/**
   * Crée un cône
   * @param {Point3d} centre centre de la base du cône
   * @param {Point3d} sommet Sommet du cône
   * @param {Vecteur3d} rayon Rayon de la base du cône
   * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageAxe = true] Permet (ou pas) l'affichage de l'axe du cône.
   * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
   * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
   * @property {Point3d} centre centre de la base du cône
   * @property {Point3d} sommet Sommet du cône
   * @property {Vecteur3d} rayon Rayon de la base du cône
   * @property {string} color Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe du cône.
   * @property {string} colorAxe Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
   * @property {string} colorCone Couleur du cône : du type 'blue' ou du type '#f15929'
   * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
   * @author Jean-Claude Lhote (optimisé par Eric Elter)
   * @class
   */
function Cone3dEE (centre, sommet, rayon, color = 'black', affichageAxe = true, colorAxe = 'black', colorCone = 'gray') {
  ObjetMathalea2D.call(this, { })
  this.centre = centre
  this.sommet = sommet
  this.rayon = rayon
  this.color = color
  this.colorAxe = colorAxe
  this.colorCone = colorCone

  const pt1 = translation3d(this.centre, this.rayon)
  const ptsBase = [pt1]
  const nbSommets = 36
  for (let ee = 1; ee < nbSommets; ee++) {
    ptsBase.push(rotation3d(pt1, droite3d(this.centre, vecteur3d(this.sommet, this.centre)), ee * 360 / (nbSommets)))
  }
  const p = polygone3d(ptsBase, this.color)
  this.c2d = pyramide3d(p, this.sommet, this.color, this.centre, affichageAxe, this.colorAxe, false, true, this.colorCone).c2d
}

/**
   * Crée un cône
   * @param {Point3d} centre centre de la base du cône
   * @param {Point3d} sommet Sommet du cône
   * @param {Vecteur3d} rayon Rayon de la base du cône
   * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageAxe = true] Permet (ou pas) l'affichage de l'axe du cône.
   * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
   * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
   * @author Eric Elter
   * @return {Cone3dEE}
   */
export function cone3dEE (centre, sommet, rayon, color = 'black', affichageAxe = true, colorAxe = 'black', colorCone = 'gray') {
  return new Cone3dEE(centre, sommet, rayon, color, affichageAxe, colorAxe, colorCone)
}

/**
   * Crée un cylindre de révolution défini par les centres de ses 2 bases
   * Permet en faisant varier les rayons des deux bases de créer des troncs de cônes (A VERIFIER)
   * @param {Point3d} centrebase1 Centre de la première base
   * @param {Point3d} centrebase2 Centre de la seconde base
   * @param {Vecteur3d} rayon1 Vecteur correspondant au rayon de la première base
   * @param {Vecteur3d} rayon2 Vecteur correspondant au rayon de la seconde base
   * @param {string} [color = 'black'] Couleur des "bords" du cylindre : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageGeneratrices = true] Permet (ou pas) l'affichage de génératrices du cylindre
   * @param {boolean} [affichageCentreBases = false] Permet (ou pas) l'affichage des centres respectifs de chaque base
   * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe du cylindre
   * @param {string} [colorAxe = 'black'] Couleur de l'axe et des centres respectifs de chaque base du cylindre : du type 'blue' ou du type '#f15929'
   * @param {boolean} [cylindreColore = false] Permet (ou pas) de colorier le cylindre
   * @param {string} [colorCylindre = 'lightgray'] Couleur du cylindre (avec gestion intégrée de la nuance de couleurs): du type 'blue' ou du type '#f15929'
   * @property {Point3d} centrebase1 Centre de la première base
   * @property {Point3d} centrebase2 Centre de la seconde base
   * @property {Vecteur3d} rayon1 Vecteur correspondant au rayon de la première base
   * @property {Vecteur3d} rayon2 Vecteur correspondant au rayon de la seconde base
   * @property {string} color Couleur des "bords" du cylindre : du type 'blue' ou du type '#f15929'
   * @property {boolean} affichageGeneratrices Permet (ou pas) l'affichage de génératrices du cylindre
   * @property {boolean} affichageCentreBases Permet (ou pas) l'affichage des centres respectifs de chaque base
   * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe du cylindre
   * @property {string} colorAxe Couleur de l'axe et des centres respectifs de chaque base du cylindre : du type 'blue' ou du type '#f15929'
   * @property {boolean} cylindreColore Permet (ou pas) de colorier le cylindre
   * @property {string} colorCylindre Couleur du cylindre (avec gestion intégrée de la nuance de couleurs): du type 'blue' ou du type '#f15929'
   * @property {number} angleDepart Angle de rotation à partir duquel les demis-cercles formant la base sont tracés
   * @property {Points[]} pointsBase1 Liste des points formant la ligne de la base 1
   * @property {Points[]} pointsBase2 Liste des points formant la ligne de la base 2
   * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
   * @author Jean-Claude Lhote (optimisé par Eric Elter)
   * @class
   */
function Cylindre3d (centrebase1, centrebase2, rayon1, rayon2, color = 'black', affichageGeneratrices = true, affichageCentreBases = false, affichageAxe = false, colorAxe = 'black', cylindreColore = false, colorCylindre = 'lightgray') {
  ObjetMathalea2D.call(this, { })
  this.centrebase1 = centrebase1
  this.centrebase2 = centrebase2
  this.rayon1 = rayon1
  this.rayon2 = rayon2
  this.color = color
  this.affichageGeneratrices = affichageGeneratrices
  this.affichageCentreBases = affichageCentreBases
  this.affichageAxe = affichageAxe
  this.colorAxe = colorAxe
  this.cylindreColore = cylindreColore
  this.colorCylindre = colorCylindre
  this.c2d = []
  let s
  this.normal = vecteur3d(this.centrebase1, this.centrebase2)
  const prodvec = vecteur3d(math.cross(this.normal.matrice, this.rayon1.matrice))
  const prodscal = math.dot(prodvec.matrice, vecteur3d(0, 1, 0).matrice)
  let cote1, cote2
  const centre1PlusBasQueCentre2 = this.centrebase1.c2d.y !== this.centrebase2.c2d.y ? this.centrebase1.c2d.y < this.centrebase2.c2d.y : (context.anglePerspective > 0)
  if (prodscal * context.anglePerspective > 0) {
    cote1 = centre1PlusBasQueCentre2 ? 'direct' : 'indirect'
    cote2 = centre1PlusBasQueCentre2 ? 'indirect' : 'direct'
  } else {
    cote2 = centre1PlusBasQueCentre2 ? 'direct' : 'indirect'
    cote1 = centre1PlusBasQueCentre2 ? 'indirect' : 'direct'
  }
  cote2 = (this.rayon1.x === 0 && this.rayon1.y === 0) ? 'indirect' : cote2
  cote1 = (this.rayon1.x === 0 && this.rayon1.y === 0) ? 'direct' : cote1
  // Cette partie permet de chercher le bon angle de départ pour le tracé des demi-bases
  // Recherche du premier point visible sur la demi-base visible
  let angleDepart = 0
  let distanceMax = 0
  const d = droite3d(this.centrebase1, this.normal)
  let ptReference = rotation3d(translation3d(this.centrebase1, this.rayon1), d, angleDepart)
  const secondPt = rotation3d(translation3d(this.centrebase1, this.rayon1), d, angleDepart + 1)
  const sensRecherche = distancePointDroite(ptReference.c2d, d.c2d) < distancePointDroite(secondPt.c2d, d.c2d) ? 1 : -1
  while ((distancePointDroite(ptReference.c2d, d.c2d) > distanceMax)) {
    distanceMax = distancePointDroite(ptReference.c2d, d.c2d)
    angleDepart = angleDepart + sensRecherche
    ptReference = rotation3d(translation3d(this.centrebase1, this.rayon1), d, angleDepart)
  }
  angleDepart = angleDepart - sensRecherche
  // angleDepart est donc l'angle qui permet d'avoir un tracé de demicercle3d idéal
  this.angleDepart = angleDepart
  // Description de chaque demi-base en position verticale
  // c1 : cercle bas derrière
  const c1 = demicercle3dEE(this.centrebase1, this.normal, this.rayon1, cote1, true, this.color, angleDepart)
  // c3 : cercle haut derrière
  const c3 = demicercle3dEE(this.centrebase2, this.normal, this.rayon2, cote1, false, this.color, angleDepart)
  // c2 : cercle bas devant
  const c2 = demicercle3dEE(this.centrebase1, this.normal, this.rayon1, cote2, false, this.color, angleDepart)
  // c4 : cercle haut devant
  const c4 = demicercle3dEE(this.centrebase2, this.normal, this.rayon2, cote2, false, this.color, angleDepart)
  this.pointsBase1 = [...c1.listePoints, ...c2.listePoints]
  this.pointsBase2 = [...c3.listePoints, ...c4.listePoints]
  if (this.cylindreColore) {
    let polygon = [...c4.listePoints]
    for (let i = c2.listePoints.length - 1; i >= 0; i--) {
      polygon.push(c2.listePoints[i])
    }
    const faceColoree = polygone(polygon, 'white')
    faceColoree.couleurDeRemplissage = colorToLatexOrHTML(this.colorCylindre)
    this.c2d.push(faceColoree)

    polygon = [...c3.listePoints]
    for (let i = c4.listePoints.length - 1; i >= 0; i--) {
      polygon.push(c4.listePoints[i])
    }
    const baseColoree = polygone(polygon, 'white')
    baseColoree.couleurDeRemplissage = colorToLatexOrHTML(assombrirOuEclaircir(this.colorCylindre, 25))
    this.c2d.push(baseColoree)
  }

  if (this.affichageGeneratrices) {
    for (let i = 1; i < c1.listePoints.length - 1; i += 2) {
      s = segment(c3.listePoints[i], c1.listePoints[i], this.color)
      s.pointilles = 2
      s.opacite = 0.3
      this.c2d.push(s)
    }
  }

  s = segment(c4.listePoints[0], c2.listePoints[0], this.color)
  this.c2d.push(s)

  if (this.affichageGeneratrices) {
    for (let i = 1; i < c2.listePoints.length - 1; i++) {
      s = segment(c4.listePoints[i], c2.listePoints[i], this.color)
      this.c2d.push(s)
    }
  }

  s = segment(c4.listePoints[c2.listePoints.length - 1], c2.listePoints[c2.listePoints.length - 1], this.color)
  this.c2d.push(s)

  this.c2d.push(c1, c2, c3, c4)

  if (this.affichageCentreBases) {
    this.c2d.push(tracePoint(this.centrebase1.c2d, this.centrebase2.c2d, this.colorAxe))
  }

  if (this.affichageAxe) {
    let distanceMin = 9999
    const pt = c2.listePoints
    let i = 0
    while ((distancePointDroite(pt[i], d.c2d) < distanceMin)) {
      distanceMin = distancePointDroite(pt[i], d.c2d)
      i++
    }
    s = segment(this.centrebase2.c2d, pt[i - 1], this.colorAxe)
    s.pointilles = 2
    s.opacite = 0.7
    this.c2d.push(s)
    const v = vecteur(this.centrebase2.c2d, this.centrebase1.c2d)
    s = segment(pt[i - 1], translation(pt[i - 1], vecteur(v.x / norme(v), v.y / norme(v))), this.colorAxe)
    this.c2d.push(s)
    s = segment(this.centrebase2.c2d, translation(translation(this.centrebase2.c2d, vecteur(pt[i - 1], this.centrebase1.c2d)), vecteur(-v.x / norme(v), -v.y / norme(v))), this.colorAxe)
    this.c2d.push(s)
  }
}

/**
   * Crée un cylindre de révolution défini par les centres de ses 2 bases
   * Permet en faisant varier les rayons des deux bases de créer des troncs de cônes (A VERIFIER)
   * @param {Point3d} centrebase1 Centre de la première base
   * @param {Point3d} centrebase2 Centre de la seconde base
   * @param {Vecteur3d} rayon1 Vecteur correspondant au rayon de la première base
   * @param {Vecteur3d} rayon2 Vecteur correspondant au rayon de la seconde base
   * @param {string} [color = 'black'] Couleur des "bords" du cylindre : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageGeneratrices = true] Permet (ou pas) l'affichage de génératrices du cylindre
   * @param {boolean} [affichageCentreBases = false] Permet (ou pas) l'affichage des centres respectifs de chaque base
   * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe du cylindre
   * @param {string} [colorAxe = 'black'] Couleur de l'axe et des centres respectifs de chaque base du cylindre : du type 'blue' ou du type '#f15929'
   * @param {boolean} [cylindreColore = false] Permet (ou pas) de colorier le cylindre
   * @param {string} [colorCylindre = 'lightgray'] Couleur du cylindre (avec gestion intégrée de la nuance de couleurs): du type 'blue' ou du type '#f15929'
   * @example cylindre3d(A, B, v, v, 'blue')
   * // Retourne un cylindre à bords bleus dont les bases ont pour centre respectif A et B et le rayon est donné par le vecteur v.
   * @example cylindre3d(A, B, v, v, 'green', false, true, true, 'red', true, 'lightblue')
   * // Retourne un cylindre à bords verts dont les bases ont pour centre respectif A et B et le rayon est donné par le vecteur v.
   * // Les génératrices sont invisibles, les centres et axe sont visibles et rouges, le cylindre est coloré en bleu.
   * @author Jean-Claude Lhote (optimisé par Eric Elter)
   * @return {Cylindre3d}
   */
export function cylindre3d (centrebase1, centrebase2, rayon, rayon2, color = 'black', affichageGeneratrices = true, affichageCentreBases = false, affichageAxe = false, colorAxe = 'black', cylindreColore = false, colorCylindre = 'lightgray') {
  return new Cylindre3d(centrebase1, centrebase2, rayon, rayon2, color, affichageGeneratrices, affichageCentreBases, affichageAxe, colorAxe, cylindreColore, colorCylindre)
}

/**
   * LE PRISME - FONCTION DEPRECIEE
   *
   * @author Jean-Claude Lhote
   * Crée un prisme à partir du base Polygone3d et d'un vecteur3d d'extrusion (on peut faire des prismes droits ou non droits)
   */
/* class Prisme3d {
  constructor (base, vecteur, color) {
    ObjetMathalea2D.call(this, { })

    this.color = color
    base.color = colorToLatexOrHTML(this.color)
    this.base1 = base
    this.base2 = translation3d(base, vecteur)
    this.base2.color = this.base1.color
    this.c2d = []; let s
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      this.c2d.push(this.base1.c2d[i])
    }
    for (let i = 0; i < this.base2.listePoints.length; i++) {
      this.c2d.push(this.base2.c2d[i])
    }
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      s = arete3d(this.base1.listePoints[i], this.base2.listePoints[i], this.color)
      this.c2d.push(s.c2d)
    }
  }
}

export function prisme3d (base, vecteur, color = 'black') {
  return new Prisme3d(base, vecteur, color)
} */

/**
   * Crée un prisme droit (en version 2)
   * Ce prisme droit est optimisé dans son tracé des arêtes cachées pour des bases dans le plan (xOy) et son vecteur normal selon (Oz)
   * Pour d'autres usages, il faut approfondir la fonction mais laissé en l'état car justement pas d'autre usage demandé.
   * @param {Polygone3d} base Une des deux bases du prisme droit
   * @param {Vecteur3d} vecteur Vecteur normal à la base dont la norme indique la hauteur du prisme droit.
   * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du prisme.
   * @property {Polygone3d} base1 La base entièrement visible du prisme droit
   * @property {Vecteur3d} vecteur Vecteur normal à la base dont la norme indique la hauteur du prisme droit.
   * @property {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @property {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du prisme.
   * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
   * @property {string} nom Nom du prisme
   * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
   * @class
   */
class Prisme3d {
  constructor (base, vecteur, color, affichageNom = false) {
    ObjetMathalea2D.call(this, { })
    this.affichageNom = affichageNom
    this.color = color
    base.color = colorToLatexOrHTML(this.color)
    this.vecteur = vecteur
    this.base1 = this.vecteur.z >= 1 ? base : translation3d(base, vecteur3d(this.vecteur.x, this.vecteur.y, -this.vecteur.z))
    this.base2 = this.vecteur.z < 1 ? base : translation3d(base, this.vecteur)
    this.base2.color = this.base1.color
    this.c2d = []; let s
    // On trace this.base1 (toujours visible)
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      this.c2d.push(this.base1.c2d[i])
    }
    // On cherche les sommets cachés de this.base2
    let toutesLesAretesSontVisibles = true
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      const areteVisibleOuPas = pointSurSegment(this.base1.listePoints[i].c2d, this.base2.listePoints[i].c2d, longueur(this.base1.listePoints[i].c2d, this.base2.listePoints[i].c2d) / 50).estDansPolygone(polygone(this.base1.listePoints2d))
      this.base2.listePoints[i].visible = !areteVisibleOuPas
      toutesLesAretesSontVisibles = !areteVisibleOuPas & toutesLesAretesSontVisibles
    }
    // On trace les arêtes de this.base2
    for (let i = 0; i < this.base2.listePoints.length; i++) {
      s = arete3d(this.base2.listePoints[i], this.base2.listePoints[i + 1 === this.base2.listePoints.length ? 0 : i + 1], this.color)
      if (toutesLesAretesSontVisibles) { // Cas particulier où aucun sommet de this.base2 n'est caché (cas de certains tétraèdres)
        let areteVisibleOuPas = true
        for (let ee = 0; ee < this.base1.listePoints.length; ee++) {
          const areteLiaison = segment(this.base1.listePoints[ee].c2d, this.base2.listePoints[ee].c2d)
          areteVisibleOuPas &&= (areteLiaison.estSecant(s.c2d))
        }
        s = arete3d(this.base2.listePoints[i], this.base2.listePoints[i + 1 === this.base2.listePoints.length ? 0 : i + 1], this.color, !areteVisibleOuPas)
      }
      this.c2d.push(s.c2d)
    }
    // On trace les arêtes de liaison entre les bases
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      s = arete3d(this.base1.listePoints[i], this.base2.listePoints[i], this.color)
      this.c2d.push(s.c2d)
    }

    if (this.affichageNom) {
      let p = polygone(this.base1.listePoints2d)
      const nomBase1 = choisitLettresDifferentes(this.base1.listePoints.length, 'OQWX')
      renommePolygone(p, nomBase1)
      for (let ee = 0; ee < this.base1.listePoints2d.length; ee++) {
        this.base1.listePoints2d[ee].positionLabel = 'above'
      }
      this.c2d.push(labelPoint(...p.listePoints))
      p = polygone(this.base2.listePoints2d)
      const nomBase2 = choisitLettresDifferentes(this.base1.listePoints.length, 'OQWX' + nomBase1)
      renommePolygone(p, nomBase2)
      for (let ee = 0; ee < this.base2.listePoints2d.length; ee++) {
        this.base2.listePoints2d[ee].positionLabel = 'below'
      }
      this.c2d.push(labelPoint(...p.listePoints))
      this.nom = nomBase1 + nomBase2
    }
  }
}

/**
   * Crée un prisme droit
   * Ce prisme droit est optimisé dans son tracé des arêtes cachées pour des bases dans le plan (xOy) et son vecteur normal selon (Oz)
   * Pour d'autres usages, il faut approfondir la fonction mais laissé en l'état car justement pas d'autre usage demandé.
   * @param {Polygone3d} base Une des deux bases du prisme droit
   * @param {Vecteur3d} vecteur Vecteur normal à la base dont la norme indique la hauteur du prisme droit.
   * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du prisme.
   * @example prisme3d(p, v)
   * // Retourne un prisme droit de base p dont un vecteur normal à la base est v.
   * @example prisme3d(p, v, 'blue', true)
   * // Retourne un prisme droit de base p dont un vecteur normal à la base est v, de couleur V et dont les sommets sont nommés
   * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
   * @return {Prisme3d}
   */
export function prisme3d (base, vecteur, color = 'black', affichageNom = false) {
  return new Prisme3d(base, vecteur, color, affichageNom)
}
/**
   * La pyramide  - FONCTION DEPRECIEE
   *
   * @author Jean-Claude Lhote
   * Crée une pyramide à partir d'une base Polygone3d et d'un sommet
   */
/*
class Pyramide3d {
  constructor (base, sommet, color) {
    ObjetMathalea2D.call(this, { })

    this.color = color
    base.color = colorToLatexOrHTML(color)
    this.base = base
    this.aretes = []
    this.sommet = sommet
    this.c2d = []; let s
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = this.base.c2d[i]
      if (this.base.listePoints[i].visible) {
        s.pointilles = false
      } else {
        s.pointilles = 2
      }
      this.c2d.push(s)
    }
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = arete3d(this.base.listePoints[i], this.sommet, this.color, true)
      if (this.base.listePoints[i].visible) {
        s.c2d.pointilles = false
      } else {
        s.c2d.pointilles = 2
      }
      this.c2d.push(s.c2d)
    }
  }
}

export function pyramide3d (base, vecteur, color = 'black') {
  return new Pyramide3d(base, vecteur, color)
}
*/

/**
   * Crée une pyramide
   * (optimisée au niveau des pointillés pour une base sur le plan xOy et un sommet plus haut ou plus bas que la base)
   * @param {Polygone3d} base Base de la pyramide
   * @param {Point3d} sommet Sommet de la pyramide
   * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @param {Point3d} [centre] Centre de la pyramide... Entraine l'affichage de ce centre
   * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la pyramide. Ne fonctionne que si centre est défini.
   * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets de la pyramide.
   * @param {boolean} [estCone = false] Permet (ou pas) de considérer la pyramide comme un cône
   * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
   * @property {Polygone3d} base Base de la pyramide
   * @property {Point3d} sommet Sommet de la pyramide
   * @property {string} color Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @property {Point3d} centre Centre de la pyramide... Entraine l'affichage de ce centre
   * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe de la pyramide. Ne fonctionne que si centre est défini.
   * @property {string} colorAxe Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
   * @property {boolean} affichageNom Permet (ou pas) l'affichage du nom des sommets de la pyramide.
   * @property {string} nom Nom de la pyramide (si affichageNom = true)
   * @property {string} colorCone Couleur du cône : du type 'blue' ou du type '#f15929'
   * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
   * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
   * @class
   */
class Pyramide3d {
  constructor (base, sommet, color, centre, affichageAxe = false, colorAxe = 'black', affichageNom = false, estCone = false, colorCone = 'gray') {
    ObjetMathalea2D.call(this, { })

    base.color = colorToLatexOrHTML(color)
    this.base = base
    this.sommet = sommet
    this.color = color
    this.centre = centre
    this.affichageAxe = affichageAxe
    this.colorAxe = colorAxe
    this.affichageNom = affichageNom
    this.estCone = estCone
    this.colorCone = colorCone
    this.c2d = []
    this.nom = ''
    let s

    // Stockage de toutes les arêtes issues du sommet
    const aretesSommet = []
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = arete3d(this.base.listePoints[i], this.sommet, this.color, true)
      aretesSommet.push(s)
    }

    // Stockage de toutes les arêtes de la base
    const aretesBase = []
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = arete3d(this.base.listePoints[i], this.base.listePoints[(i + 1) % this.base.listePoints.length], this.color, true)
      aretesBase.push(s)
    }
    // Recherche des sommets arrières (donc toutes les arêtes issues de ce point sont cachées)
    let sommetCache = false
    let sommetCacheAvant
    const angleReference = [0, 0]
    const sommetGeneratriceCone = []
    if (sommet.z > this.base.listePoints[0].z) { // Si le sommet est au-dessus de la base
      for (let i = 0; i < this.base.listePoints.length; i++) {
        sommetCacheAvant = sommetCache
        sommetCache = false
        for (let j = 1; j < this.base.listePoints.length - 1; j++) {
          sommetCache = sommetCache || this.base.listePoints[i].c2d.estDansPolygone(polygone(this.sommet.c2d, this.base.listePoints[(i + j) % this.base.listePoints.length].c2d, this.base.listePoints[(i + j + 1) % this.base.listePoints.length].c2d))
        }
        if (this.estCone && sommetCacheAvant !== sommetCache && i !== 0) {
          if (sommetCache) sommetGeneratriceCone.push(aretesSommet[(aretesSommet.length + i - 1) % aretesSommet.length])
          else sommetGeneratriceCone.push(aretesSommet[i])
          if (sommetCache) angleReference[1] = i
          else angleReference[0] = i
        }
        if (sommetCache) {
          aretesSommet[i].c2d.pointilles = 2
          aretesBase[i].c2d.pointilles = 2
          aretesBase[(this.base.listePoints.length + i - 1) % this.base.listePoints.length].c2d.pointilles = 2
        }
      }
    }

    if (this.estCone && angleReference[1] < angleReference[0]) { angleReference[1] += this.base.listePoints.length }

    if (this.estCone && sommetGeneratriceCone.length === 1) {
      sommetGeneratriceCone.push(aretesSommet[aretesSommet.length - 1])
      angleReference[1] = aretesSommet.length - 1
    }
    if (this.estCone) {
      const premierPlan = [this.sommet.c2d]
      for (let i = angleReference[0]; i < angleReference[1]; i++) {
        premierPlan.push(this.base.listePoints[i % this.base.listePoints.length].c2d)
      }
      const faceAv = polygone(premierPlan, this.colorCone)
      faceAv.couleurDeRemplissage = colorToLatexOrHTML(this.colorCone)
      this.c2d.push(faceAv)
    }

    if (!this.estCone) {
      if (sommet.z > this.base.listePoints[0].z) { // Si le sommet est au-dessus de la base
      // Recherche de l'arête cachée possible issue de deux sommets non cachés.
        let longueurSegment
        for (let i = 0; i < this.base.listePoints.length; i++) {
          sommetCache = false
          longueurSegment = longueur(this.base.listePoints[i].c2d, this.base.listePoints[(i + 1) % this.base.listePoints.length].c2d)
          s = segment(pointSurSegment(this.base.listePoints[i].c2d, this.base.listePoints[(i + 1) % this.base.listePoints.length].c2d, longueurSegment / 20), pointSurSegment(this.base.listePoints[i].c2d, this.base.listePoints[(i + 1) % this.base.listePoints.length].c2d, 19 * longueurSegment / 20))
          for (let j = 0; j < aretesSommet.length; j++) {
            sommetCache = sommetCache || s.estSecant(aretesSommet[j].c2d)
          }
          if (sommetCache) aretesBase[i].c2d.pointilles = 2
        }
      }
      for (let i = 0; i < this.base.listePoints.length; i++) {
        this.c2d.push(aretesSommet[i].c2d)
      }
    } else {
      for (let i = 0; i < sommetGeneratriceCone.length; i++) {
        this.c2d.push(sommetGeneratriceCone[i].c2d)
      }
    }

    for (let i = 0; i < this.base.listePoints.length; i++) {
      this.c2d.push(aretesBase[i].c2d)
    }

    if (this.centre !== undefined && this.centre.constructor === Point3d) {
      this.c2d.push(tracePoint(this.centre.c2d, this.colorAxe))
      if (this.centre.label === '') this.centre.label = choisitLettresDifferentes(1, 'OQWX')
      this.c2d.push(labelPoint(this.centre.c2d))

      if (affichageAxe) { // Axe affiché que si centre précisé
        let intersectionTrouvee = false
        let ee = 0
        // Recherche du point d'intersection visuelle entre l'axe et une arête visible de la base
        while (!intersectionTrouvee && ee < aretesBase.length) {
          s = aretesBase[ee].c2d
          if (s.pointilles !== 2) { // L'arête coupée doit être visible
            intersectionTrouvee = s.estSecant(droite(this.centre.c2d, this.sommet.c2d))
          }
          ee++
        }
        if (ee < aretesBase.length) {
          ee--
          const ptBase = pointIntersectionDD(droite(this.base.listePoints[ee].c2d, this.base.listePoints[(ee + 1) % this.base.listePoints.length].c2d), droite(this.centre.c2d, this.sommet.c2d))
          s = segment(ptBase, this.sommet.c2d, this.colorAxe)
          s.pointilles = 2
          this.c2d.push(s)
          s = segment(ptBase, translation(ptBase, vecteur(this.centre.c2d, ptBase)), this.colorAxe)
          this.c2d.push(s)
          s = segment(this.sommet.c2d, translation(this.sommet.c2d, vecteur(ptBase, this.centre.c2d)), this.colorAxe)
          this.c2d.push(s)
        }
      }
    }

    if (this.affichageNom) {
      const p = polygone(this.base.listePoints2d)
      if (this.centre.label === '' || this.centre.label === this.sommet.label) this.sommet.label = choisitLettresDifferentes(1, 'OQWX')
      const nomBase = choisitLettresDifferentes(this.base.listePoints.length, 'OQWX' + this.sommet.label + this.centre.label)
      renommePolygone(p, nomBase)
      for (let ee = 0; ee < this.base.listePoints2d.length; ee++) {
        this.base.listePoints2d[ee].positionLabel = 'below'
      }
      this.c2d.push(labelPoint(...p.listePoints))
      this.c2d.push(labelPoint(this.sommet))
      this.nom = nomBase.join('') + this.sommet.label
    }
  }
}

/**
   * Crée une pyramide
   * @param {Polygone3d} base Base de la pyramide
   * @param {Point3d} sommet Sommet de la pyramide
   * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
   * @param {Point3d} [centre] Centre de la pyramide... Entraine l'affichage de ce centre
   * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la pyramide. Ne fonctionne que si centre est défini.
   * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
   * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets de la pyramide.
   * @param {boolean} [estCone = false] Permet (ou pas) de considérer la pyramide comme un cône
   * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
   * @author Eric Elter
   * @return {Pyramide3d}
   */
export function pyramide3d (base, vecteur, color = 'black', centre, affichageAxe = false, colorAxe = 'black', affichageNom = false, estCone = false, colorCone = 'gray') {
  return new Pyramide3d(base, vecteur, color, centre, affichageAxe, colorAxe, affichageNom, estCone, colorCone)
}

/**
   * La pyramide tronquée
   *
   * @author Jean-Claude Lhote
   * Crée une pyramide à partir d'une base Polygone3d d'un sommet et d'un coefficient compris entre 0 et 1
   * un coefficient de 0.5 coupera la pyramide à mi-hauteur (valeur par défaut).
   */
class PyramideTronquee3d {
  constructor (base, sommet, coeff = 0.5, color = 'black') {
    ObjetMathalea2D.call(this, { })

    this.color = color
    base.color = colorToLatexOrHTML(color)
    this.base = base
    this.coeff = coeff
    this.aretes = []
    this.sommet = sommet
    this.c2d = []
    const sommetsBase2 = []
    for (let i = 0, pointSection; i < this.base.listePoints.length; i++) {
      pointSection = homothetie3d(sommet, base.listePoints[i], coeff)
      pointSection.visible = true
      sommetsBase2.push(pointSection)
    }
    this.base2 = polygone3d(...sommetsBase2)
    this.c2d.push(...this.base.c2d)
    for (let i = 0; i < base.listePoints.length; i++) {
      this.aretes.push(arete3d(base.listePoints[i], this.base2.listePoints[i], this.color, base.listePoints[i].visible))
      this.c2d.push(this.aretes[i].c2d)
    }
    this.c2d.push(...this.base2.c2d)
  }
}
export function pyramideTronquee3d (base, sommet, coeff = 0.5, color = 'black') {
  return new PyramideTronquee3d(base, sommet, coeff, color)
}
/**
   * LE cube
   * @author Jean-Claude Lhote
   * usage : cube(x,y,z,c,color) construit le cube d'arète c dont le sommet en bas à gauche a les coordonnées x,y,z.
   * le face avant est dans le plan xz
   *
*/
class Cube3d {
  constructor (x, y, z, c, color = 'black', colorAV = 'lightgray', colorTOP = 'white', colorDr = 'darkgray', aretesCachee = true, affichageNom = false, nom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
    ObjetMathalea2D.call(this, { })
    this.affichageNom = affichageNom
    const A = point3d(x, y, z)
    A.c2d.nom = nom[0]
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)
    const B = translation3d(A, vx)
    B.c2d.nom = nom[1]
    const C = translation3d(B, vz)
    C.c2d.nom = nom[2]
    const D = translation3d(A, vz)
    D.c2d.nom = nom[3]
    let pointsFace = [A.c2d, B.c2d, C.c2d, D.c2d]
    const faceAV = this.affichageNom ? polygoneAvecNom(...pointsFace) : polygone(pointsFace, color)
    if (this.affichageNom) faceAV[0].color = colorToLatexOrHTML(color)
    const E = translation3d(A, vy)
    E.c2d.nom = nom[4]
    const F = translation3d(E, vx)
    F.c2d.nom = nom[5]
    const G = translation3d(F, vz)
    G.c2d.nom = nom[6]
    const H = translation3d(D, vy)
    H.c2d.nom = nom[7]
    pointsFace = [E.c2d, F.c2d, G.c2d, H.c2d]
    const faceArr = this.affichageNom ? polygoneAvecNom(...pointsFace) : vide2d

    const faceDr = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
    const faceTOP = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
    const areteEH = segment(E.c2d, H.c2d, color)
    areteEH.pointilles = 2
    const areteEF = segment(E.c2d, F.c2d, color)
    areteEF.pointilles = 2
    const areteEA = segment(E.c2d, A.c2d, color)
    areteEA.pointilles = 2
    this.sommets = [A, B, C, D, E, F, G, H]
    // Les 8 sommets sont indispensables pour pouvoir les utiliser ensuite.

    if (aretesCachee) {
      faceAV.couleurDeRemplissage = colorToLatexOrHTML(colorAV)
      faceTOP.couleurDeRemplissage = colorToLatexOrHTML(colorTOP)
      faceDr.couleurDeRemplissage = colorToLatexOrHTML(colorDr)
      this.c2d = [faceAV.length === 2 ? faceAV[0] : faceAV, faceAV.length === 2 ? faceAV[1] : vide2d, faceDr, faceTOP]
    } else {
      this.c2d = [faceAV.length === 2 ? faceAV[0] : faceAV, faceAV.length === 2 ? faceAV[1] : vide2d, faceDr, faceTOP, faceArr.length === 2 ? faceArr[1] : vide2d, areteEH, areteEF, areteEA]
    }
  }
}
export function cube3d (x, y, z, c, color = 'black', colorAV = 'lightgray', colorTOP = 'white', colorDr = 'darkgray', aretesCachee = true, affichageNom = false, nom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
  return new Cube3d(x, y, z, c, color, colorAV, colorTOP, colorDr, aretesCachee, affichageNom, nom)
}
/**
 * @author Jean-Claude Lhote
 * Créer une barre de l cubes de c de côté à partir du point (x,y,z)
 * La barre est positionnée suivant l'axe x
 */
class Barre3d {
  constructor (x, y, z, c, l, color = 'black') {
    ObjetMathalea2D.call(this, { })
    let B, C, D, E, F, G, H, faceAv, faceTop
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)
    let A = point3d(x, y, z)

    for (let i = 0; i < l; i++) {
      B = translation3d(A, vx)
      C = translation3d(B, vz)
      D = translation3d(A, vz)
      E = translation3d(A, vy)
      F = translation3d(E, vx)
      G = translation3d(F, vz)
      H = translation3d(D, vy)
      faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
      faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
      faceAv.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
      faceTop.couleurDeRemplissage = colorToLatexOrHTML('white')
      this.c2d.push(faceAv, faceTop)
      A = translation3d(A, vx)
    }
    const faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
    faceD.couleurDeRemplissage = colorToLatexOrHTML('darkgray')
    this.c2d.push(faceD)
  }
}

export function barre3d (x, y, z, c, l, color = 'black') {
  return new Barre3d(x, y, z, c, l, color)
}

/**
 * @author Jean-Claude Lhote
 * Crée une plaque de cubes de côtés c de dimensions l suivant x et p suivant y
 */
class Plaque3d {
  constructor (x, y, z, c, l, p, color = 'black') {
    ObjetMathalea2D.call(this, { })
    let A, B, C, D, F, G, H, faceAv, faceTop, faceD
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < p; j++) {
        A = point3d(x + i * c, y + j * c, z)
        B = translation3d(A, vx)
        C = translation3d(B, vz)
        D = translation3d(A, vz)
        F = translation3d(B, vy)
        G = translation3d(F, vz)
        H = translation3d(D, vy)
        if (j === 0) {
          faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
          faceAv.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
          this.c2d.push(faceAv)
        }
        if (i === l - 1) {
          faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
          faceD.couleurDeRemplissage = colorToLatexOrHTML('darkgray')
          this.c2d.push(faceD)
        }
        faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
        faceTop.couleurDeRemplissage = colorToLatexOrHTML('white')
        this.c2d.push(faceTop)
      }
    }
  }
}

export function plaque3d (x, y, z, c, l, p, color = 'black') {
  return new Plaque3d(x, y, z, c, l, p, color)
}

class PaveLPH3d {
  constructor (x, y, z, c, l, p, h, color = 'black') {
    ObjetMathalea2D.call(this, { })
    let A, B, C, D, F, G, H, faceAv, faceTop, faceD
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < p; j++) {
        for (let k = 0; k < h; k++) {
          A = point3d(x + i * c, y + j * c, z + k * c)
          B = translation3d(A, vx)
          C = translation3d(B, vz)
          D = translation3d(A, vz)
          F = translation3d(B, vy)
          G = translation3d(F, vz)
          H = translation3d(D, vy)
          if (j === 0) {
            faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
            faceAv.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            this.c2d.push(faceAv)
          }
          if (i === l - 1) {
            faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
            faceD.couleurDeRemplissage = colorToLatexOrHTML('darkgray')
            this.c2d.push(faceD)
          }
          if (k === h - 1) {
            faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
            faceTop.couleurDeRemplissage = colorToLatexOrHTML('white')
            this.c2d.push(faceTop)
          }
        }
      }
    }
  }
}
/**
 *
 * @param {number} x coordonnées du sommet en bas à gauche
 * @param {number} y
 * @param {number} z
 * @param {number} c longueur de l'unité
 * @param {number} p profondeur
 * @param {number} l longueur
 * @param {number} h hauteur
 * @param {*} color couleur
 * @returns {object}
 */
export function paveLPH3d (x, y, z, c, l, p, h, color = 'black') {
  return new PaveLPH3d(x, y, z, c, l, p, h, color)
}

/**
 * @author Erwan Duplessis et Jean-Claude Lhote
 * Attention !
 * Cette Classe définit un objet cube dans une représentation en perspective axonométrique paramétrée par alpha et beta
 * et non pas context.anglePerspective (contrairement à l'objet cube3d ci-dessus ou l'objet pave3d ci-dessous)
 * Il ne s'agit pas à proprement parler d'un objet 3d, c'est un objet 2d avec sa méthode svg() et sa méthode tikz()
 * Utilisée par exemple dans 6G43
 */
class Cube {
  constructor (x, y, z, alpha, beta, colorD, colorT, colorG) {
    ObjetMathalea2D.call(this, { })
    this.x = x
    this.y = y
    this.z = z
    this.alpha = alpha
    this.beta = beta
    this.colorD = colorToLatexOrHTML(colorD)
    this.colorG = colorToLatexOrHTML(colorG)
    this.colorT = colorToLatexOrHTML(colorT)

    this.lstPoints = []
    this.lstPolygone = []
    function proj (x, y, z, alpha, beta) {
      const cosa = Math.cos(alpha * Math.PI / 180)
      const sina = Math.sin(alpha * Math.PI / 180)
      const cosb = Math.cos(beta * Math.PI / 180)
      const sinb = Math.sin(beta * Math.PI / 180)
      return point(cosa * x - sina * y, -sina * sinb * x - cosa * sinb * y + cosb * z)
    }

    this.lstPoints.push(proj(this.x, this.y, this.z, this.alpha, this.beta)) // point 0 en bas
    this.lstPoints.push(proj(this.x + 1, this.y, this.z, this.alpha, this.beta)) // point 1
    this.lstPoints.push(proj(this.x + 1, this.y, this.z + 1, this.alpha, this.beta)) // point 2
    this.lstPoints.push(proj(this.x, this.y, this.z + 1, this.alpha, this.beta)) // point 3
    this.lstPoints.push(proj(this.x + 1, this.y + 1, this.z + 1, this.alpha, this.beta)) // point 4
    this.lstPoints.push(proj(this.x, this.y + 1, this.z + 1, this.alpha, this.beta)) // point 5
    this.lstPoints.push(proj(this.x, this.y + 1, this.z, this.alpha, this.beta)) // point 6
    let p
    p = polygone([this.lstPoints[0], this.lstPoints[1], this.lstPoints[2], this.lstPoints[3]], 'black')
    p.opaciteDeRemplissage = 1
    p.couleurDeRemplissage = this.colorD
    this.lstPolygone.push(p)
    p = polygone([this.lstPoints[2], this.lstPoints[4], this.lstPoints[5], this.lstPoints[3]], 'black')
    p.couleurDeRemplissage = this.colorG
    p.opaciteDeRemplissage = 1
    this.lstPolygone.push(p)
    p = polygone([this.lstPoints[3], this.lstPoints[5], this.lstPoints[6], this.lstPoints[0]], 'black')
    p.couleurDeRemplissage = this.colorT
    p.opaciteDeRemplissage = 1
    this.lstPolygone.push(p)
    this.c2d = this.lstPolygone
  }
}
export function cube (x = 0, y = 0, z = 0, alpha = 45, beta = -35, { colorD = 'green', colorT = 'white', colorG = 'gray' } = {}) {
  return new Cube(x, y, z, alpha, beta, colorD, colorG, colorT)
}

/**
   * LE PAVE
   * @author Jean-Claude Lhote (optimisé par Eric Elter)
   * usage : pave(A,B,D,E) construit le pavé ABCDEFGH dont les arêtes [AB],[AD] et [AE] délimitent 3 faces adjacentes.
   * La gestion des arêtes cachées est prise en compte et n'est pas forcément E.
   * En travaillant sur le signe de context.anglePerspective et sur celui de la hauteur (B.z), on peut avoir une vision de haut, de bas, de gauche, de droite comme dans l'exercice....
*/
class Pave3d {
  constructor (A, B, D, E, color, affichageNom = false, nom = 'ABCDEFGH') {
    ObjetMathalea2D.call(this, { })
    this.affichageNom = affichageNom
    const v1 = vecteur3d(A, B)
    const v2 = vecteur3d(A, E)
    const C = translation3d(D, v1)
    const H = translation3d(D, v2)
    const G = translation3d(C, v2)
    const F = translation3d(B, v2)

    // Determination du point caché
    function distanceMoyenne4points (pt) {
      const dist1 = longueur(pt.c2d, A.c2d, 5)
      const dist2 = longueur(pt.c2d, B.c2d, 5)
      const dist3 = longueur(pt.c2d, C.c2d, 5)
      const dist4 = longueur(pt.c2d, D.c2d, 5)
      return arrondi((dist1 + dist2 + dist3 + dist4) / 4, 5)
    }
    E.visible = !E.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    F.visible = !F.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    G.visible = !G.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    H.visible = !H.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    if (E.visible && F.visible && G.visible && H.visible) {
      const minimum = Math.min(distanceMoyenne4points(E), distanceMoyenne4points(F), distanceMoyenne4points(G), distanceMoyenne4points(H))
      E.visible = minimum !== distanceMoyenne4points(E)
      F.visible = minimum !== distanceMoyenne4points(F)
      G.visible = minimum !== distanceMoyenne4points(G)
      H.visible = minimum !== distanceMoyenne4points(H)
    }
    // Fin de determination du point caché

    this.sommets = [A, B, C, D, E, F, G, H]
    this.color = color
    this.base = polygone3d([A, B, F, E])
    this.hauteur = vecteur3d(A, D)
    this.c2d = []
    this.aretes = [arete3d(A, B, color), arete3d(A, D, color), arete3d(A, E, color), arete3d(C, B, color), arete3d(F, B, color), arete3d(C, D, color), arete3d(C, G, color), arete3d(F, G, color), arete3d(F, E, color), arete3d(H, G, color), arete3d(H, E, color), arete3d(H, D, color)]
    for (const arete of this.aretes) {
      this.c2d.push(arete.c2d)
    }
    if (this.affichageNom) {
      let pointsFace = [A.c2d, B.c2d, C.c2d, D.c2d]
      A.c2d.nom = nom[0]
      B.c2d.nom = nom[1]
      C.c2d.nom = nom[2]
      D.c2d.nom = nom[3]
      E.c2d.nom = nom[4]
      F.c2d.nom = nom[5]
      G.c2d.nom = nom[6]
      H.c2d.nom = nom[7]

      // const faceAV = polygoneAvecNom(...pointsFace)
      const faceAV = polygoneAvecNom(...pointsFace, context.isHtml ? 0.5 : 1.5)
      pointsFace = [E.c2d, F.c2d, G.c2d, H.c2d]
      const faceArr = polygoneAvecNom(...pointsFace, context.isHtml ? 0.5 : 1.5)
      // const faceArr = polygoneAvecNom(...pointsFace)
      // faceAV[0].color = colorToLatexOrHTML('none')
      // faceArr[0].color = colorToLatexOrHTML('none')
      this.c2d.push(faceAV[1], faceArr[1])
    }
  }
}

export function pave3d (A, B, D, E, color = 'black', affichageNom = false, nom = 'ABCDEFGH') {
  return new Pave3d(A, B, D, E, color, affichageNom, nom)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% TRANSFORMATIONS%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
   * LA ROTATION VECTORIELLE
   *
   * @author Jean-Claude Lhote
   * Cette rotation se distingue de la rotation d'axe (d) par le fait qu'on tourne autour d'une droite vectorielle
   * Elle sert à faire tourner des vecteurs essentiellement.
   * Si on l'utilise sur un point, alors il tournera autour d'une droite passant par l'origine.
   *
   * @param {*} point3D pour l'instant, cette fonction ne fait tourner qu'un point3d ou un vecteur3d
   * @param {*} vecteur3D vecteur directeur de l'axe de rotation (l'axe passe par l'origine, pour tourner autour d'une droite particulière on utilise rotation3d())
   * @param {*} angle Angle de rotation
   */
export function rotationV3d (point3D, vecteur3D, angle) { // point = ce qu'on fait tourner (Point3d) ; vecteur = directeur de l'axe de rotation [x,y,z] et angle de rotation en degrés
  let V, p2
  const norme = math.norm(vecteur3D.matrice)
  const unitaire = math.multiply(vecteur3D.matrice, 1 / norme)
  const u = unitaire._data[0]; const v = unitaire._data[1]; const w = unitaire._data[2]
  const c = Math.cos(angle * Math.PI / 180); const s = Math.sin(angle * Math.PI / 180)
  const k = 1 - c
  const matrice = math.matrix([[u * u * k + c, u * v * k - w * s, u * w * k + v * s], [u * v * k + w * s, v * v * k + c, v * w * k - u * s], [u * w * k - v * s, v * w * k + u * s, w * w * k + c]])
  if (point3D.constructor === Point3d) {
    V = math.matrix([point3D.x, point3D.y, point3D.z])
    p2 = math.multiply(matrice, V)
    return point3d(p2._data[0], p2._data[1], p2._data[2])
  } else if (point3D.constructor === Vecteur3d) {
    V = point3D
    p2 = math.multiply(matrice, V.matrice)
    return vecteur3d(p2._data[0], p2._data[1], p2._data[2])
  }
}

/**
   * LA ROTATION D'AXE UNE DROITE
   *
   * @author Jean-Claude Lhote
   *
   * @param {Point3d} point3D Pour l'instant on ne fait tourner qu'un point3d
   * Remarque : ça n'a aucun sens de faire tourner un vecteur autour d'une droite particulière, on utilise la rotation vectorielle pour ça.
   * @param {Droite3d} droite3D Axe de rotation
   * @param {Number} angle Angle de rotation
   * @param {string} color couleur du polygone créé. si non précisé la couleur sera celle du polygone argument
   */
export function rotation3d (point3D, droite3D, angle, color) {
  const directeur = droite3D.directeur
  const origine = droite3D.origine
  const p = []
  if (point3D.constructor === Point3d) {
    const V = vecteur3d(origine, point3d(0, 0, 0))
    const W = vecteur3d(point3d(0, 0, 0), origine)
    const M = translation3d(point3D, V)
    const N = rotationV3d(M, directeur, angle)
    return translation3d(N, W)
  } else if (point3D.constructor === Vecteur3d) {
    return rotationV3d(point3D, directeur, angle)
  } else if (point3D.constructor === Polygone3d) {
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(rotation3d(point3D.listePoints[i], droite3D, angle))
    }
    if (typeof (color) !== 'undefined') {
      return polygone3d(p, color)
    } else { return polygone3d(p, point3D.color) }
  }
}

/**
 * @author Jean-Claude Lhote
 * Crée une flèche en arc de cercle pour montrer un sens de rotation autour d'un axe 3d
 * cette flèche est dessinée dans le plan orthogonal à l'axe qui passe par l'origine de l'axe
 * le rayon est ici un vecteur 3d qui permet de fixer le point de départ de la flèche par translation de l'origine de l'axe
 * l'angle définit l'arc formé par la flèche
 * son sens est définit par le vecteur directeur de l'axe (changer le signe de chaque composante de ce vecteur pour changer le sens de rotation)
 */
function SensDeRotation3d (axe, rayon, angle, epaisseur, color) {
  ObjetMathalea2D.call(this, { })
  this.epaisseur = epaisseur
  this.color = color
  this.c2d = []
  let M; let N; let s
  M = translation3d(axe.origine, rayon)
  for (let i = 0; i < angle; i += 5) {
    N = rotation3d(M, axe, 5)
    s = segment(M.c2d, N.c2d, this.color)
    s.epaisseur = this.epaisseur
    this.c2d.push(s)
    M = N
  }
  N = rotation3d(M, axe, 5)
  s = segment(M.c2d, N.c2d, this.color)
  s.epaisseur = this.epaisseur
  this.c2d.push(s)
  const d = droite3d(N, axe.directeur)
  const A = rotation3d(M, d, 30)
  const B = rotation3d(M, d, -30)
  s = segment(N.c2d, A.c2d, this.color)
  s.epaisseur = this.epaisseur
  this.c2d.push(s)
  s = segment(N.c2d, B.c2d, this.color)
  s.epaisseur = this.epaisseur
  this.c2d.push(s)
}
export function sensDeRotation3d (axe, rayon, angle, epaisseur, color) {
  return new SensDeRotation3d(axe, rayon, angle, epaisseur, color)
}

/**
   * LA TRANSLATION
   *
   * @author Jean-Claude Lhote
   * @param {Point3d} point3D Pour l'instant on ne translate qu'un point3d ou un polygone3d
   * @param {Vecteur3d} vecteur3D
   */
export function translation3d (point3D, vecteur3D) {
  if (point3D.constructor === Point3d) {
    const x = point3D.x + vecteur3D.x
    const y = point3D.y + vecteur3D.y
    const z = point3D.z + vecteur3D.z
    return point3d(x, y, z)
  } else if (point3D.constructor === Polygone3d) {
    const p = []
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(translation3d(point3D.listePoints[i], vecteur3D))
    }
    return polygone3d(p, point3D.color)
  }
}

/**
 * L'homothetie
 * @author Jean-Claude Lhote
 * La même chose qu'ne 2d, mais en 3d...
 * Pour les points3d les polygones ou les vecteurs (multiplication scalaire par rapport)
 */
export function homothetie3d (point3D, centre, rapport, color) {
  let V
  const p = []
  if (point3D.constructor === Point3d) {
    V = vecteur3d(centre, point3D)
    V.x *= rapport
    V.y *= rapport
    V.z *= rapport
    return translation3d(centre, V)
  } else if (point3D.constructor === Vecteur3d) {
    V = vecteur3d(point3D.x, point3D.y, point3D.z)
    V.x *= rapport
    V.y *= rapport
    V.z *= rapport
    return V
  } else if (point3D.constructor === Polygone3d) {
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(homothetie3d(point3D.listePoints[i], centre, rapport, color))
    }
    if (typeof (color) !== 'undefined') {
      return polygone3d(p, color)
    } else { return polygone3d(p, point3D.color) }
  }
}
export class CodageAngleDroit3D extends ObjetMathalea2D {
  constructor (A, B, C, color = 'black', taille = 1) {
    super()
    const BA = vecteur3d(B, A)
    const BC = vecteur3d(B, C)
    const k1 = BA.norme
    const k2 = BC.norme
    const M1 = homothetie3d(A, B, taille * 0.5 / k1)
    const M3 = homothetie3d(C, B, taille * 0.5 / k2)
    const BM1 = vecteur3d(B, M1)
    const BM3 = vecteur3d(B, M3)
    const x = B.x + BM1.x + BM3.x
    const y = B.y + BM1.y + BM3.y
    const z = B.z + BM1.z + BM3.z
    const M2 = point3d(x, y, z)
    const M1M2 = arete3d(M1, M2, color)
    const M2M3 = arete3d(M2, M3, color)
    this.svg = function (coeff) {
      return M1M2.c2d.svg(coeff) + M2M3.c2d.svg(coeff)
    }
    this.tikz = function () {
      return M1M2.c2d.tikz() + M2M3.c2d.tikz()
    }
  }
}
