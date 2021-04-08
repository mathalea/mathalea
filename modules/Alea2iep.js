import { point, pointAdistance, droite, droiteParPointEtPerpendiculaire, segment, triangle2points2longueurs, cercle, pointIntersectionLC, homothetie, longueur, milieu, pointSurSegment, rotation, pointIntersectionDD, translation2Points, droiteParPointEtParallele, projectionOrtho, centreCercleCirconscrit, angleOriente } from './2d.js'
import { calcul, randint, nombre_avec_espace as nombreAvecEspace } from './outils.js'

/*
 * Classe parente de tous les objets Alea2iep
 *
 * @Auteur Rémi Angot
 */
export default function Alea2iep () {
  this.idIEP = 0 // Identifiant pour les tracés
  this.idHTML = 0 // Identifiant pour les div et le svg
  this.tempo = 5 // Pause par défaut après une instruction
  this.vitesse = 10 // Vitesse par défaut pour les déplacements d'instruments
  this.couleur = 'blue' // Couleur par défaut
  this.couleurCompas = 'forestgreen'
  this.couleurTexte = 'black'
  this.couleurPoint = 'black' // Couleur du nom des points
  this.couleurCodage = '#f15929'
  this.couleurTraitsDeConstruction = 'gray'
  this.epaisseur = 2
  this.epaisseurTraitsDeConstruction = 1
  this.pointilles = false
  this.liste_script = [] // Liste des instructions xml mise à jour par les méthodes

  this.translationX = 0
  this.translationY = 10 // Par défaut l'angle en haut à gauche est le point de coordonnées (0,10)

  this.recadre = function (xmin, ymax) {
    this.translationX = 1 - xmin
    this.translationY = ymax + 3
  }

  // Garde en mémoire les coordonnées extrêmes des objets créés
  this.xMin = 0
  this.yMin = 0
  this.xMax = 0
  this.yMax = 0
  // Transforme les coordonnées MathALEA2D en coordonnées pour le XML d'IEP
  this.x = function (A) {
    const x = calcul((A.x + this.translationX) * 30, 0)
    if (x > this.xMax) {
      this.xMax = x
    }
    if (x < this.xMin) {
      this.xMin = x
    }
    return x
  }
  this.y = function (A) {
    const y = calcul((-A.y + this.translationY) * 30, 0)
    if (y < this.yMin) {
      this.yMin = y
    }
    if (y > this.yMax) {
      this.yMax = y
    }
    return y
  }

  // Sauvegarde de l'état des instruments
  this.regle = {
    visibilite: false,
    position: point(0, 0),
    angle: 0,
    longueur: 15,
    zoom: 100
  }

  this.crayon = {
    visibilite: false,
    position: point(0, 0),
    angle: 0,
    zoom: 100
  }

  this.equerre = {
    visibilite: false,
    position: point(0, 0),
    angle: 0,
    zoom: 100
  }

  this.requerre = {
    visibilite: false,
    position: point(0, 0),
    angle: 0,
    zoom: 100
  }

  this.rapporteur = {
    visibilite: false,
    position: point(0, 0),
    angle: 0,
    zoom: 100
  }

  this.compas = {
    visibilite: false,
    position: point(0, 0),
    angle: 0,
    orientation: 'droite',
    ecartement: 0,
    leve: false,
    zoom: 100
  }

  this.xml = ''

  this.script = function () {
    if (this.xml.length > 1) {
      return this.xml
    } else {
      let codeXML = '<?xml version="1.0" encoding="UTF-8"?>\n'
      codeXML += '<INSTRUMENPOCHE version="2">\n'
      codeXML += this.liste_script.join('\n')
      codeXML += '\n</INSTRUMENPOCHE>'
      return codeXML
    }
  }

  this.html = function (numeroExercice, i) {
    if (window.sortie_html) {
      const id = `${numeroExercice}_${i}`
      window.listeIEP.push([id, calcul(this.xMax - this.xMin), calcul(this.yMax - this.yMin)]) // Sauvegard le liste de toutes les animations à ajouter aux exercices
      const codeHTML = `<script id="figurexml${numeroExercice}_${i}" type="text/xml">
                ${this.script()}
            </script>
            <br>
            <div id="IEPContainer${id}" ></div>`
      return codeHTML
    }
  }

  this.htmlBouton = function (numeroExercice, i) {
    if (window.sortie_html) {
      const id = `${numeroExercice}_${i}`
      window.listeIEP.push([id, calcul(this.xMax - this.xMin), calcul(this.yMax - this.yMin)]) // Sauvegard le liste de toutes les animations à ajouter aux exercices
      const codeHTML = `<script id="figurexml${numeroExercice}_${i}" type="text/xml">
                ${this.script()}
            </script>
            <br>
            <button class="ui mini compact button" id="btnAnimation${id}" onclick="toggleVisibilityIEP(IEPContainer${id},btnAnimation${id})""><i class="large play circle outline icon"></i>Voir animation</button>
            <div id="IEPContainer${id}" style="display: none;" ></div>`

      window.toggleVisibilityIEP = function (idElement, idBtn) {
        // Pourquoi un string se transforme en élément du DOM !?
        // let element = document.getElementById(idElement)
        // let elementBtn = document.getElementById(idBtn)
        if (idElement.style.display === 'none') {
          idElement.style.display = 'block'
          idBtn.innerHTML = '<i class="large stop circle outline icon"></i>Masquer animation'
        } else {
          idElement.style.display = 'none'
          idBtn.innerHTML = '<i class="large play circle outline icon"></i>Voir animation'
        }
      }

      return codeHTML
    } else {
      return ''
    }
  }
}

/**
 **************************
 *** FONCTIONS COMMUNES ***
 **************************
 */

/**
* montrer(objet, A, 10) |montrerRegle(A) | montrerCrayon(A) | montrerEquerre(A) | montrerCompas(A) | montrerRapporteur(A)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.montrer = function (objet, A, { tempo = this.tempo } = {}) {
  if (!this[objet].visibilite || this[objet].position !== A) { // On ajoute une ligne xml que si l'objet est caché ou doit apparaitre à un autre endroit
    let codeXML = ''
    let A1
    if (typeof A === 'undefined') { // A1 est une copie de A ou (0,0) si A n'est pas défini
      A1 = this[objet].position
    } else {
      A1 = A
    }
    if (this[objet].visibilite) { // S'il est déjà visible, montrer devient un déplcer
      this.deplacer(objet, A1, { tempo: tempo })
    } else {
      codeXML = `<action objet="${objet}" mouvement="montrer" abscisse="${this.x(A1)}" ordonnee="${this.y(A1)}" tempo="${tempo}" />`
      this[objet].visibilite = true
    }
    this[objet].position = A1
    this.liste_script.push(codeXML)
  }
}

Alea2iep.prototype.regleMontrer = function (A, options) {
  this.montrer('regle', A, options)
}

Alea2iep.prototype.crayonMontrer = function (A, options) {
  this.montrer('crayon', A, options)
}

Alea2iep.prototype.equerreMontrer = function (A, options) {
  this.montrer('equerre', A, options)
}

Alea2iep.prototype.requerreMontrer = function (A, options) {
  this.montrer('requerre', A, options)
}

Alea2iep.prototype.compasMontrer = function (A, options) {
  this.montrer('compas', A, options)
}

Alea2iep.prototype.rapporteurMontrer = function (A, options) {
  this.montrer('rapporteur', A, options)
}

/**
* masquer(objet, A, 10) | regleMasquer(A) | crayonMasquer(A) | equerreMasquer(A) | compasMasquer(A) | rapporteurMasquer(A)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.masquer = function (objet, { tempo = this.tempo } = {}) {
  if (this[objet].visibilite) { // On ajoute une ligne xml que si l'objet est visible
    const codeXML = `<action objet="${objet}" mouvement="masquer" tempo="${tempo}" />`
    this[objet].visibilite = false
    this.liste_script.push(codeXML)
  }
}

Alea2iep.prototype.regleMasquer = function (options) {
  this.masquer('regle', options)
}

Alea2iep.prototype.crayonMasquer = function (options) {
  this.masquer('crayon', options)
}

Alea2iep.prototype.equerreMasquer = function (options) {
  this.masquer('equerre', options)
}

Alea2iep.prototype.requerreMasquer = function (options) {
  this.masquer('requerre', options)
}

Alea2iep.prototype.compasMasquer = function (options) {
  this.masquer('compas', options)
}

Alea2iep.prototype.rapporteurMasquer = function (options) {
  this.masquer('rapporteur', options)
}

/**
* regleDeplacer(A,tempo,vitesse) | crayonDeplacer(A,tempo,vitesse) | equerreDeplacer(A,tempo,vitesse) | compasDeplacer(A,tempo,vitesse) | rapporteurDeplacer(A,tempo,vitesse)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.deplacer = function (objet, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
  if (this[objet].position !== A) { // On n'ajoute une commande xml que s'il y a vraiment un déplacement
    const codeXML = `<action objet="${objet}" mouvement="translation" abscisse="${this.x(A)}" ordonnee="${this.y(A)}" tempo="${tempo}" vitesse="${vitesse}" />`
    this[objet].position = A
    this.liste_script.push(codeXML)
  }
}

Alea2iep.prototype.regleDeplacer = function (A, options) {
  this.deplacer('regle', A, options)
}

Alea2iep.prototype.crayonDeplacer = function (A, options) {
  this.deplacer('crayon', A, options)
}

Alea2iep.prototype.equerreDeplacer = function (A, options) {
  this.deplacer('equerre', A, options)
}

Alea2iep.prototype.requerreDeplacer = function (A, options) {
  this.deplacer('requerre', A, options)
}

Alea2iep.prototype.compasDeplacer = function (A, options) {
  this.deplacer('compas', A, options)
}

Alea2iep.prototype.rapporteurDeplacer = function (A, options) {
  this.deplacer('rapporteur', A, options)
}

/**
* regleRotation(angle,tempo,vitesse) | crayonRotation(angle,tempo,vitesse) | equerreRotation(angle, tempo,vitesse) | compasRotation(angle,tempo,vitesse) | rapporteurRotation(angle,tempo,vitesse)
* Pour IEP un angle positif est indirect
* @Auteur Rémi Angot
*/

Alea2iep.prototype.rotation = function (objet, a, { tempo = this.tempo, sens = calcul(this.vitesse / 2, 0) } = {}) {
  let angle
  if (a.typeObjet === 'point') {
    const d = droite(this[objet].position, a)
    angle = d.angleAvecHorizontale
  } else {
    angle = a
  }
  if (this[objet].angle !== a) { // Si la rotation est inutile, on ne la fait pas
    // Les angles de MathALEA2D et de IEP sont opposés !!!!!
    angle = Math.round(angle, 2)
    const codeXML = `<action objet="${objet}" mouvement="rotation" angle="${-angle}" tempo="${tempo}" sens="${sens}" />`
    this[objet].angle = angle
    if (typeof angle === 'number' && isFinite(angle)) {
      this.liste_script.push(codeXML)
    } else {
      console.log('Angle de rotation non défini.')
    }
  }
}

Alea2iep.prototype.regleRotation = function (angle, options) {
  this.rotation('regle', angle, options)
}

Alea2iep.prototype.crayonRotation = function (angle, options) {
  this.rotation('crayon', angle, options)
}

Alea2iep.prototype.equerreRotation = function (angle, options) {
  this.rotation('equerre', angle, options)
}

Alea2iep.prototype.requerreRotation = function (angle, options) {
  this.rotation('requerre', angle, options)
}

Alea2iep.prototype.compasRotation = function (angle, options) {
  this.rotation('compas', angle, options)
}

Alea2iep.prototype.rapporteurRotation = function (angle, options) {
  this.rotation('rapporteur', angle, options)
}

Alea2iep.prototype.regleZoom = function (k, { tempo = 0 } = {}) {
  this.regle.zoom = k
  this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="regle" tempo="${tempo}" />`)
}
Alea2iep.prototype.equerreZoom = function (k, { tempo = 0 } = {}) {
  this.equerre.zoom = k
  this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="equerre" tempo="${tempo}" />`)
}
Alea2iep.prototype.requerreZoom = function (k, { tempo = 0 } = {}) {
  this.requerre.zoom = k
  this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="requerre" tempo="${tempo}" />`)
}
Alea2iep.prototype.rapporteurZoom = function (k, { tempo = 0 } = {}) {
  this.rapporteur.zoom = k
  this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="rapporteur" tempo="${tempo}" />`)
}
Alea2iep.prototype.compasZoom = function (k, { tempo = 0 } = {}) {
  this.compas.zoom = k
  this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="compas" />`)
}

/**
 **************************
 ********* POINT **********
 **************************
 */

/**
* pointCreer(A, nom, tempo)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.pointCreer = function (A, { label = A.nom, tempo = this.tempo, couleur = this.couleurPoint, couleurLabel = this.couleurTexte, id } = {}) {
  if (typeof id !== 'undefined') {
    A.id = id
  } else {
    this.idIEP++
    A.id = this.idIEP
  }
  let codeXML
  if (label) {
    codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" couleur="${couleur}" id="${A.id}" mouvement="creer" objet="point" />`
    codeXML += `\n<action couleur="${couleurLabel}" nom="${label}" id="${this.idIEP}" mouvement="nommer" objet="point" tempo="${tempo}"  />`
  } else {
    codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" couleur="${couleur}" id="${A.id}" mouvement="creer" objet="point" tempo="${tempo}" />`
  }
  this.liste_script.push(codeXML)
}

Alea2iep.prototype.pointsCreer = function (...points) {
  for (const point of points) {
    this.pointCreer(point, { tempo: 0 })
  }
}

Alea2iep.prototype.pointMasquer = function (A, { tempo = 0 } = {}) {
  this.liste_script.push(`<action id="${A.id}" mouvement="masquer" objet="point" tempo="${tempo}" />`)
}
Alea2iep.prototype.pointMontrer = function (A, { tempo = this.tempo } = {}) {
  this.liste_script.push(`<action id="${A.id}" mouvement="montrer" objet="point" tempo="${tempo}" />`)
}
Alea2iep.prototype.pointDeplacer = function (A, x, y, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
  const B = point(x, y)
  this.liste_script.push(`<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" id="${A.id}" mouvement="translation" objet="point" tempo="${tempo}" vitesse="${vitesse} />`)
}
Alea2iep.prototype.pointNommer = function (A, nom, { dx, dy, couleur = this.couleurPoint, tempo = this.tempo } = {}) {
  let coordonneesTexte = ''
  if (typeof dx !== 'undefined' && typeof dy !== 'undefined') {
    coordonneesTexte = `abscisse="${dx * 30}" ordonnee="${-dy * 30}"`
  }
  this.liste_script.push(`<action couleur="${couleur}" nom="${nom}" id="${A.id}" mouvement="nommer" objet="point" tempo="${tempo}" ${coordonneesTexte} />`)
}

/**
 **************************
 ********* COMPAS *********
 **************************
 */

/**
* compasRetourner(tempo)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasRetourner = function ({ tempo = this.tempo } = {}) {
  const codeXML = `<action mouvement="retourner" objet="compas" tempo="${tempo}" />`
  if (this.compas.orientation === 'droite') {
    this.compas.orientation = 'gauche'
  } else {
    this.compas.orientation = 'droite'
  }
  this.liste_script.push(codeXML)
}
/**
* compasEcarter(l, tempo)
*
* @Auteur Rémi Angot
*/
Alea2iep.prototype.compasEcarter = function (l, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
  const codeXML = `<action ecart="${calcul(l * 30, 1)}" mouvement="ecarter" objet="compas" tempo="${tempo}" vitesse="${vitesse}" />`
  this.compas.ecartement = l
  this.liste_script.push(codeXML)
}

/**
* compasEcarterAvecRegle(l, tempo)
*
* @Auteur Rémi Angot
*/
Alea2iep.prototype.compasEcarterAvecRegle = function (l, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
  this.regleRotation(0, { tempo: 0 })
  this.regleMontrer(this.compas.position, { tempo: 0 })
  this.regleDeplacer(this.compas.position, { tempo: 0 })
  this.compasMontrer()
  this.compasRotation(0, { tempo: 0 })
  this.compasEcarter(l, { tempo: tempo, vitesse: vitesse })
}

/**
* compasEcarter2Points(A, B, tempo)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasEcarter2Points = function (A, B, { tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2) } = {}) {
  this.compasMontrer(A)
  this.compasDeplacer(A, { tempo: tempo, vitesse: vitesse })
  const s = segment(A, B)
  s.isVisible = false
  const angle = s.angleAvecHorizontale
  this.compasRotation(angle, { tempo: tempo, sens: sens })
  this.compasEcarter(longueur(A, B), { tempo: tempo, vitesse: vitesse })
}

/**
* compasLever(tempo)
*
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasLever = function ({ tempo = this.tempo } = {}) {
  if (!this.compas.leve) { // On ne fait rien si le compas est déjà levé
    const codeXML = `<action mouvement="lever" objet="compas" tempo="${tempo} />`
    this.compas.leve = true
    this.liste_script.push(codeXML)
  }
}

/**
* compasCoucher(tempo)
*
* @Auteur Rémi Angot
*/
Alea2iep.prototype.compasCoucher = function ({ tempo = this.tempo } = {}) {
  if (this.compas.leve) { // On ne fait rien si le compas est déjà levé
    const codeXML = `<action mouvement="coucher" objet="compas" tempo="${tempo}" />`
    this.compas.leve = false
    this.liste_script.push(codeXML)
  }
}

/**
* compasTracerArc2Angles(angle1, angle2, tempo, vitesse, epaisseur, couleur, pointilles)
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasTracerArc2Angles = function (angle1, angle2, { tempo = this.tempo, sens = calcul(this.vitesse / 2, 0), epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = this.pointilles } = {}) {
  const pointillesTexte = pointilles ? 'pointille="tiret"' : ''
  this.idIEP += 1
  if (Math.abs(this.compas.angle - angle1) > Math.abs(this.compas.angle - angle2)) { // On cherche à commencer par le point le plus proche de la position courante du compas
    [angle1, angle2] = [angle2, angle1]
  }
  let codeXML = `<action sens="${sens}" angle="${-angle1}" mouvement="rotation" objet="compas" tempo="${tempo}" />\n`
  codeXML += '<action mouvement="lever" objet="compas" />\n'
  codeXML += `<action sens="${sens}" angle="${-angle1}" mouvement="rotation" objet="compas" />\n`
  let sensTexte
  if (angle2 > angle1) {
    sensTexte = sens
  } else {
    sensTexte = -1 * sens
  }
  codeXML += `<action couleur="${couleur}" epaisseur="${epaisseur}" sens="${sensTexte}" debut="${-angle1}" fin="${-angle2}" mouvement="tracer" objet="compas"  ${pointillesTexte} id="${this.idIEP}" />\n`
  codeXML += `<action mouvement="coucher" objet="compas" tempo="${tempo}"/>`
  this.compas.angle = angle2
  this.liste_script.push(codeXML)
  return this.idIEP
}

/**
* compasTracerArcCentrePoint(centre, point, delta, tempo, vitesse, epaisseur, couleur)
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasTracerArcCentrePoint = function (centre, point, { delta = 10, tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2, 0), epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = this.pointilles } = {}) {
  this.compasMontrer()
  this.compasDeplacer(centre, { tempo: tempo, vitesse: vitesse })
  const s = segment(centre, point)
  s.visibility = false
  const angle1 = s.angleAvecHorizontale - delta
  const angle2 = s.angleAvecHorizontale + delta
  if ((Math.abs(this.compas.ecartement - longueur(this.compas.position, point))) > 0.1) {
    this.compasEcarter(longueur(centre, point), { tempo: tempo, vitesse: vitesse })
  }
  return this.compasTracerArc2Angles(angle1, angle2, { tempo: tempo, vitesse: vitesse, epaisseur: epaisseur, sens: sens, couleur: couleur, pointilles: pointilles })
}

Alea2iep.prototype.compasCercleCentrePoint = function (centre, point, { tempo = this.tempo, couleur = this.couleur, vitesse = this.vitesse, epaisseur = this.epaisseur, pointilles = this.pointilles } = {}) {
  this.compasEcarter2Points(centre, point, { vitesse: vitesse, tempo: tempo })
  const d = droite(centre, point)
  const angle1 = d.angleAvecHorizontale
  this.compasTracerArc2Angles(angle1, angle1 + 360, { tempo: tempo, vitesse: vitesse, epaisseur: epaisseur, couleur: couleur, pointilles: pointilles })
}

/**
 **************************
 ******** REQUERRE ********
 **************************
 */

Alea2iep.prototype.requerreGlisserEquerre = function (a, { tempo = this.tempo } = {}) {
  this.liste_script.push(`<action abscisse="${a * 30}" mouvement="glisser" objet="requerre" tempo="${tempo}" />`)
}

/**
 **************************
 ******* RAPPORTEUR *******
 **************************
 */

// Non pris en charge par le lecteur JS
// Alea2iep.prototype.rapporteurCirculaire = function (tempo=this.tempo) {
// //     this.liste_script.push(`<action mouvement="circulaire" objet="rapporteur" tempo="${tempo}"/>`)
// }
// Alea2iep.prototype.rapporteurSemiCirculaire = function (tempo=this.tempo) {
// //     this.liste_script.push(`<action mouvement="semicirculaire" objet="rapporteur" tempo="${tempo}"/>`)
// }
Alea2iep.prototype.rapporteurMasquerGraduationsExterieures = function ({ tempo = this.tempo } = {}) {
  this.liste_script.push(`<action mouvement="masquer_nombres" objet="rapporteur" tempo="${tempo}"/>`)
}
Alea2iep.prototype.rapporteurMontrerGraduationsExterieures = function ({ tempo = this.tempo } = {}) {
  this.liste_script.push(`<action mouvement="montrer_nombres" objet="rapporteur" tempo="${tempo}"/>`)
}
Alea2iep.prototype.rapporteurMasquerGraduationsInterieures = function ({ tempo = this.tempo } = {}) {
  this.liste_script.push(`<action mouvement="vide" objet="rapporteur" tempo="${tempo}"/>`)
}
Alea2iep.prototype.rapporteurMontrerGraduationsInterieures = function ({ tempo = this.tempo } = {}) {
  this.liste_script.push(`<action mouvement="graduations" objet="rapporteur" tempo="${tempo}"/>`)
}

Alea2iep.prototype.rapporteurDeplacerRotation2Points = function (A, B, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
  const d = droite(A, B)
  d.isVisible = false
  this.rapporteurMontrer()
  this.rapporteurDeplacer(A, { tempo: tempo, vitesse: vitesse })
  this.rapporteurRotation(d.angleAvecHorizontale, { tempo: tempo, vitesse: vitesse })
}

Alea2iep.prototype.rapporteurCrayonMarqueAngle = function (angle, { tempo = this.tempo, vitesse = this.vitesse, couleur = this.couleurTraitsDeConstruction, epaisseur = this.epaisseurTraitsDeConstruction } = {}) {
  const O = this.rapporteur.position
  const M = pointAdistance(O, 5.2, angle + this.rapporteur.angle)
  const N = pointAdistance(O, 5.5, angle + this.rapporteur.angle)
  this.crayonMontrer()
  this.crayonDeplacer(M, { tempo: tempo, vitesse: vitesse })
  this.tracer(N, { tempo: tempo, vitesse: vitesse, couleur: couleur, epaisseur: epaisseur })
}

Alea2iep.prototype.rapporteurTracerDemiDroiteAngle = function (A, B, angle, { longueur = 0.9 * this.regle.longueur, couleur = this.couleur, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, pointilles = this.pointilles } = {}) {
  this.rapporteurDeplacerRotation2Points(A, B, { tempo: tempo, vitesse: vitesse })
  this.rapporteurCrayonMarqueAngle(angle, { tempo: tempo, vitesse: vitesse })
  const d = droite(A, B)
  d.isVisible = false
  const M = pointAdistance(A, calcul(5.2 * this.rapporteur.zoom / 100, 1), d.angleAvecHorizontale + angle)
  this.rapporteurMasquer()
  this.regleDemiDroiteOriginePoint(A, M, { longueur: longueur, couleur: couleur, tempo: tempo, vitesse: vitesse, epaisseur: epaisseur, pointilles: pointilles })
}

/**
 **************************
 ********* REGLE **********
 **************************
 */

Alea2iep.prototype.regleMasquerGraduations = function ({ tempo = this.tempo } = {}) {
  this.liste_script.push(`<action mouvement="vide" objet="regle" tempo="${tempo}"/>`)
}
Alea2iep.prototype.regleMontrerGraduations = function ({ tempo = this.tempo } = {}) {
  this.liste_script.push(`<action mouvement="graduations" objet="regle" tempo="${tempo}"/>`)
}
Alea2iep.prototype.regleModifierLongueur = function ({ tempo = this.tempo, longueur = 20 } = {}) {
  this.regle.longueur = longueur
  this.liste_script.push(`<action mouvement="modifier_longueur" objet="regle" longueur="${longueur}" tempo="${tempo}"/>`)
}

Alea2iep.prototype.regleDemiDroiteOriginePoint = function (O, A, options = {}) {
  if (!options.longueur) {
    options.longueur = this.regle.longueur
  }
  const M = pointSurSegment(O, A, options.longueur)
  this.regleSegment(O, M, options)
}
Alea2iep.prototype.regleDroite = function (A, B, options = {}) {
  if (!options.longueur) {
    options.longueur = this.regle.longueur
  }
  const M = homothetie(B, A, calcul((-options.longueur * 0.5 + longueur(A, B) * 0.5) / longueur(A, B)))
  const N = homothetie(A, B, calcul((-options.longueur * 0.5 + longueur(A, B) * 0.5) / longueur(A, B)))
  this.regleMontrer()
  if (this.x(A) < this.x(B)) {
    this.regleDeplacer(A, options)
    this.regleRotation(N, options)
    this.regleSegment(M, N, options)
  } else {
    this.regleDeplacer(B, options)
    this.regleRotation(M, options)
    this.regleSegment(N, M, options)
  }
}

Alea2iep.prototype.regleProlongerSegment = function (A, B, options = {}) {
  if (!options.longueur) {
    options.longueur = this.regle.longueur - 3
  }
  if (options.longueur > 0) {
    const B1 = pointSurSegment(B, A, 3)
    const B2 = pointSurSegment(B, A, -1 * options.longueur)
    this.regleSegment(B1, B2, options)
  } else {
    const A1 = pointSurSegment(A, B, 3)
    const A2 = pointSurSegment(A, B, options.longueur)
    this.regleSegment(A1, A2, options)
  }
}

/**
 **************************
 ********* TRAITS *********
 **************************
 */

/**
* tracer(B,tempo=tempoIEP ,vitesse=10,epaisseur=0,couleur=0) // Trace le segment du point courant vers B
* @Auteur Rémi Angot
*/

Alea2iep.prototype.tracer = function (B, { tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = this.pointilles, vecteur = false } = {}) {
  const pointillesTexte = pointilles ? 'pointille="tiret"' : ''
  const vecteurTexte = vecteur ? 'style="vecteur"' : ''
  this.idIEP += 1
  const codeXML = `<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" epaisseur="${epaisseur}" couleur="${couleur}" mouvement="tracer" objet="crayon" tempo="${tempo}" vitesse="${vitesse}"  ${pointillesTexte} ${vecteurTexte} id="${this.idIEP}" />`
  this.crayon.position = B
  this.liste_script.push(codeXML)
}
Alea2iep.prototype.trait = function (A, B, options = {}) {
  this.crayonDeplacer(A, options)
  this.tracer(B, options)
}

Alea2iep.prototype.traitRapide = function (A, B, options = {}) {
  options.tempo = 0
  options.vitesse = 10000
  this.crayonDeplacer(A, options)
  this.tracer(B, options)
}

Alea2iep.prototype.traitMasquer = function (id, { tempo = 0, vitesse = 200 } = {}) {
  this.liste_script.push(`<action mouvement="masquer" objet="trait" id="${id}" vitesse="${vitesse}" />`)
}
/**
 * segmetTracer(A,B)
 * regleSegment(s)
 * regleSegment(A,B,tempo, vitesse, epaisseur, couleur, pointilles)
 */

Alea2iep.prototype.regleSegment = function (arg1, arg2, arg3) {
  let A, B, options
  if (arg1.typeObjet === 'segment') {
    A = arg1.extremite1
    B = arg1.extremite2
    options = arg2
  } else {
    A = arg1
    B = arg2
    options = arg3
  }
  if (B.x < A.x) { // Toujours tracer le segment de la gauche vers la droite
    this.regleSegment(B, A, options)
  } else {
    const d = droite(A, B)
    d.isVisible = false
    const angle = d.angleAvecHorizontale
    this.regleMontrer(A, options)
    this.regleRotation(angle, options)
    this.crayonMontrer(A, options)

    if (longueur(this.crayon.position, A) < longueur(this.crayon.position, B)) { // Le crayon ira au point le plus proche
      this.crayonDeplacer(A, options)
      this.tracer(B, options)
    } else {
      this.crayonDeplacer(B, options)
      this.tracer(A, options)
    }
  }
}

// Pas d'options possibles pour PolygoneTracer
Alea2iep.prototype.polygoneTracer = function (...sommets) {
  for (let i = 0; i < sommets.length - 1; i++) {
    this.regleSegment(sommets[i], sommets[i + 1])
  }
  this.regleSegment(sommets[sommets.length - 1], sommets[0])
}

// Pas d'options possibles pour PolygoneRapide
Alea2iep.prototype.polygoneRapide = function (...sommets) {
  for (let i = 0; i < sommets.length - 1; i++) {
    this.traitRapide(sommets[i], sommets[i + 1])
  }
  this.traitRapide(sommets[sommets.length - 1], sommets[0])
}

/**
 **************************
 ********* TEXTE **********
 **************************
 */

Alea2iep.prototype.textePoint = function (texte, A, { tempo = this.tempo, police = false, couleur = this.couleurTexte, couleurFond, opaciteFond, couleurCadre, epaisseurCadre, marge, margeGauche, margeDroite, margeHaut, margeBas } = {}) {
  this.idIEP++
  const policeTexte = police ? `police="${police}"` : ''
  let options = ''
  if (typeof couleurFond !== 'undefined') {
    options += ` couleur_fond="${couleurFond}"`
  }
  if (typeof opaciteFond !== 'undefined') {
    options += ` opacite_fond="${opaciteFond}"`
  }
  if (typeof couleurCadre !== 'undefined') {
    options += ` couleur_cadre="${couleurCadre}"`
  }
  if (typeof epaisseurCadre !== 'undefined') {
    options += ` epaisseur_cadre="${epaisseurCadre}"`
  }
  if (typeof marge !== 'undefined') {
    options += ` marge="${marge}"`
  }
  if (typeof margeGauche !== 'undefined') {
    options += ` marge_gauche="${margeGauche}"`
  }
  if (typeof margeDroite !== 'undefined') {
    options += ` marge_droite="${margeDroite}"`
  }
  if (typeof margeBas !== 'undefined') {
    options += ` marge_bas="${margeBas}"`
  }
  if (typeof margeHaut !== 'undefined') {
    options += ` marge_haut="${margeHaut}"`
  }
  let codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" id="${this.idIEP}" mouvement="creer" objet="texte" />`
  codeXML += `\n<action ${policeTexte} couleur="${couleur}" texte="${texte}" id="${this.idIEP}" mouvement="ecrire" objet="texte" ${options} tempo="${tempo}" />`
  this.liste_script.push(codeXML)
}

Alea2iep.prototype.textePosition = function (texte, x, y, options) {
  const A = point(x, y)
  this.textePoint(texte, A, options)
}

/**
 **************************
 ********* PAUSE **********
 **************************
 */

Alea2iep.prototype.pause = function () {
  this.liste_script.push('<action mouvement="pause" />')
}

/**
 **************************
 ******* CODAGES **********
 **************************
 */

/**
 * segmentCodage(s, codage='\\', couleur = this.couleurCodage, tempo = this.tempo))
 * @param {*} s
 * @param {*} codage
 * @param {*} couleur
 * @param {*} tempo
 */

Alea2iep.prototype.segmentCodage = function (arg1, arg2 = {}, arg3 = {}) {
  let s
  let options = {}
  if (arg1.typeObjet === 'segment') {
    s = arg1
    options = arg2
  } else {
    s = segment(arg1, arg2)
    options = { ...arg3 }
  }
  if (options.tempo === undefined) {
    options.tempo = this.tempo
  }
  if (options.couleur === undefined) {
    options.couleur = this.couleurCodage
  }
  if (options.codage === undefined) {
    options.codage = '\\'
  }
  if (options.codage === undefined) {
    options.codage = '\\'
  }
  if (options.couleurCodage === undefined) {
    options.couleurCodage = this.couleurCodage
  }
  let id
  if (s.id) {
    id = s.id
  } else {
    this.idIEP++
    id = this.idIEP
  }
  const M = milieu(s.extremite1, s.extremite2)

  const codeXML = `<action abscisse="${this.x(M)}" ordonnee="${this.y(M)}" forme="${options.codage}"  couleur="${options.couleur}" id="${id}" tempo="${options.tempo}" mouvement="creer" objet="longueur" />`
  this.liste_script.push(codeXML)
}

Alea2iep.prototype.segmentCodageMasquer = function (s, { tempo = this.tempo } = {}) {
  this.liste_script.push(`<action id="${s.id}" mouvement="masquer" objet="longueur" tempo="${tempo}" />`)
}
Alea2iep.prototype.segmentCodageMontrer = function (s, { tempo = this.tempo } = {}) {
  this.liste_script.push(`<action id="${s.id}" mouvement="montrer" objet="longueur" tempo="${tempo}" />`)
}

Alea2iep.prototype.codageAngleDroit = function (A, B, C, options = {}) {
  if (options.longueur === undefined) {
    options.longueur = 0.3
  }
  if (options.couleur === undefined) {
    options.couleur = this.couleurCodage
  }
  const C1 = pointSurSegment(B, C, options.longueur)
  const A1 = pointSurSegment(B, A, options.longueur)
  const M = translation2Points(A1, B, C1)
  this.trait(C1, M, options)
  this.trait(M, A1, options)
}

/**
 *
 * formes = "simple", "/", "//", "///", "O"
 * "double", "double/", "double//", "double///", "doubleO"
 * "triple", "triple/", "triple//", "triple///", "tripleO"
 * "plein", "plein/", "plein//", "plein///", "pleinO"
 */
Alea2iep.prototype.angleCodage = function (B, A, C, { couleur = this.couleurCodage, codage = 'plein', r = 1, tempo = this.tempo } = {}) {
  const id = B.id + '_' + A.id + '_' + C.id
  const d1 = droite(A, B)
  const d2 = droite(A, C)
  d1.isVisible = false
  d2.isVisible = false
  const angle1 = -d1.angleAvecHorizontale
  const angle2 = -d2.angleAvecHorizontale
  const codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" rayon="${r * 30}" angle1="${angle1}" angle2="${angle2}" forme="${codage}"  couleur="${couleur}" id="${id}" tempo="${tempo}" mouvement="creer" objet="angle" />`
  this.liste_script.push(codeXML)
}

Alea2iep.prototype.angleCodageMasquer = function (B, A, C, { tempo = this.tempo } = {}) {
  const id = B.id + '_' + A.id + '_' + C.id
  this.liste_script.push(`<action id="${id}" mouvement="masquer" objet="angle" tempo="${tempo}" />`)
}
Alea2iep.prototype.angleCodageMontrer = function (B, A, C, tempo = this.tempo) {
  const id = B.id + '_' + A.id + '_' + C.id
  this.liste_script.push(`<action id="${id}" mouvement="montrer" objet="angle" tempo="${tempo}" />`)
}

/**
 *****************************************
 ********* MACROS-CONSTRUCTIONS **********
 *****************************************
 */

Alea2iep.prototype.paralleleRegleEquerre2points3epoint = function (A, B, C, options) {
  let G, D, H1
  // G est le point le plus à gauche, D le plus à droite et H le projeté de C sur (AB)
  // H1 est un point de (AB) à gauche de H, c'est là où seront la règle et l'équerre avant de glisser
  if (A.x < B.x) {
    G = A
    D = B
  } else {
    G = B
    D = A
  }
  const d = droite(A, B)
  const H = projectionOrtho(C, d)
  if (H.x < D.x) {
    H1 = pointSurSegment(H, D, -2) // H1 sera plus à gauche que H
  } else {
    H1 = pointSurSegment(H, D, 2)
  }
  const C1 = projectionOrtho(H1, droiteParPointEtParallele(C, d))
  // C1 est le point d'arrivée de l'équerre après avoir glissé
  const M = pointSurSegment(C1, C, 6)
  // Le tracé de la parallèle ne fera que 6 cm pour ne pas dépassr de l'équerre. M est la fin de ce tracé

  if (H.x < G.x && longueur(H, G) > 3) { // Si le pied de la hauteur est trop à gauche
    this.regleProlongerSegment(D, G)
    this.regleMasquer()
  }
  if (H.x > D.x && longueur(H, D) > 3) { // Si le pied de la hauteur est trop à gauche
    this.regleProlongerSegment(G, D)
    this.regleMasquer()
  }

  this.equerreMontrer(H1)
  this.equerreRotation(d.angleAvecHorizontale - 90)
  if (H1.y > C1.y) {
    this.regleDeplacer(H1, { vitesse: 1000, tempo: 0 })
    this.regleRotation(C1, { sens: 1000, tempo: 0 })
  } else {
    const C12 = pointSurSegment(C1, H1, -2) // On monte un peu plus la règle pour que ça soit plus crédible
    this.regleDeplacer(C12, { vitesse: 1000, tempo: 0 })
    this.regleRotation(H1, { sens: 1000, tempo: 0 })
  }
  this.regleMontrer()
  this.equerreDeplacer(C1, options)
  this.crayonMontrer()
  this.crayonDeplacer(C1, options)
  this.tracer(M, options)
}

/**
 *****************************************
 ********* DROITES REMARQUABLES **********
 *****************************************
 */

/**
 * le paramétrage des longueurs correspond à la distance entre le milieu du segment et le point d'intersection des arcs de cercles
 *
 * @param {point} A
 * @param {point} B
 * @param {booléen} codage
 * @param {int} l1
 * @param {int} l2
 */
Alea2iep.prototype.mediatriceAuCompas = function (A, B, options = {}) {
  if (options.longueur1 === undefined) {
    options.longueur1 = 3
  }
  if (options.longueur2 === undefined) {
    options.longueur2 = -3
  }
  if (options.codage === undefined) {
    options.codage = 'X'
  }
  if (options.couleurCodage === undefined) {
    options.couleurCodage = 'forestgreen'
  }
  if (options.couleurCompas === undefined) {
    options.couleurCompas = 'forestgreen'
  }
  const O = milieu(A, B)
  const O2 = rotation(A, O, -90)
  const M = pointSurSegment(O, O2, options.longueur1)
  const N = pointSurSegment(O, O2, options.longueur2)
  this.compasMontrer()
  this.compasDeplacer(A, options)
  let arc1, arc2, arc3, arc4
  if (options.longueur1 === -1 * options.longueur2) { // Si la distance est la même des deux côtés, on peut faire les arcs de part et d'autre
    this.compasEcarter(longueur(A, M), { vitesse: options.vitesse, sens: options.vitesse })
    arc1 = this.compasTracerArcCentrePoint(A, M, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
    arc2 = this.compasTracerArcCentrePoint(A, N, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
    arc3 = this.compasTracerArcCentrePoint(B, M, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
    arc4 = this.compasTracerArcCentrePoint(B, N, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
  } else {
    this.compasEcarter(longueur(A, M), options)
    arc1 = this.compasTracerArcCentrePoint(A, M, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
    arc2 = this.compasTracerArcCentrePoint(B, M, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
    arc3 = this.compasTracerArcCentrePoint(B, N, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
    arc4 = this.compasTracerArcCentrePoint(A, N, { delta: options.delta, couleur: options.couleurCompas, sens: options.sens, vitesse: options.vitesse, tempo: options.tempo })
  }
  this.compasMasquer()
  this.regleDroite(M, N, options)
  this.regleMasquer()
  this.segmentCodage(A, O, { codage: options.codage, couleur: options.couleurCodage, tempo: options.tempo })
  this.segmentCodage(O, B, { codage: options.codage, couleur: options.couleurCodage, tempo: options.tempo })
  this.codageAngleDroit(A, O, O2, { couleur: options.couleurCodage, tempo: options.tempo, vitesse: options.vitesse })
  return [arc1, arc2, arc3, arc4]
}

Alea2iep.prototype.mediatriceRegleEquerre = function (A, B, codage = 'X') {
  const O = milieu(A, B)
  this.regleMontrer()
  this.regleDeplacer(A)
  this.regleRotation(B)
  this.crayonMontrer()
  const O2 = rotation(A, O, -90)
  const O3 = rotation(A, O, 90)
  const M = pointSurSegment(O, O2, 0.2)
  const N = pointSurSegment(O, O3, 0.2)
  if (this.y(M) > this.y(N)) {
    this.trait(O, M)
  } else {
    this.trait(O, N)
  }
  this.regleMasquer()
  if (this.x(A) < this.x(B)) {
    this.equerreDeplacer(A)
    this.equerreMontrer()
    this.equerreRotation(B)
  } else {
    this.equerreDeplacer(B)
    this.equerreMontrer()
    this.equerreRotation(A)
  }
  this.equerreDeplacer(O)
  this.crayonDeplacer(O)
  this.trait(O, O2)
  this.equerreMasquer()
  this.regleDroite(O2, O3)
  this.regleMasquer()
  this.segmentCodage(A, O, codage)
  this.segmentCodage(O, B, codage)
  this.codageAngleDroit(A, O, O2)
}
Alea2iep.prototype.hauteur = function (A, B, C, codage = true) {
  const d = droite(A, B)
  d.isVisible = false
  const H = projectionOrtho(C, d)
  let G, D
  if (this.x(A) < this.x(B)) {
    G = A
    D = B
  } else {
    G = B
    D = A
  }
  if (this.x(H) < this.x(G)) { // si le pied de la hauteur est trop à gauche
    this.regleProlongerSegment(D, G, longueur(G, H) + 2, this.couleur, this.tempo, this.vitesse, this.epaisseurTraitsDeConstruction, true)
  }
  if (this.x(H) > this.x(D)) { // si le pied de la hauteur est trop à droite
    this.regleProlongerSegment(G, D, longueur(D, H) + 2, this.couleur, this.tempo, this.vitesse, this.epaisseurTraitsDeConstruction, true)
  }
  if (this.x(H) < this.x(G) || this.x(H) > this.x(D)) {
    this.regleMasquer()
  }
  if (this.x(A) < this.x(B)) {
    this.equerreDeplacer(A)
    this.equerreMontrer()
    this.equerreRotation(B)
  } else {
    this.equerreDeplacer(B)
    this.equerreMontrer()
    this.equerreRotation(A)
  }
  this.equerreDeplacer(H)
  this.crayonMontrer()
  this.crayonDeplacer(H)
  this.trait(H, C)
  this.equerreMasquer()
  if (codage) {
    this.codageAngleDroit(A, H, C)
  }
  this.crayonMasquer()
}

Alea2iep.prototype.mediane = function (A, B, C, options = {}) {
  if (options.codage === undefined) {
    options.codage = 'X'
  }
  if (options.couleurTraitsDeConstruction === undefined) {
    options.couleurTraitsDeConstruction = this.couleurTraitsDeConstruction
  }
  if (options.epaisseurTraitsDeConstruction === undefined) {
    options.epaisseurTraitsDeConstruction = this.epaisseurTraitsDeConstruction
  }
  const O = milieu(A, B)
  this.regleMontrer(A, options)
  this.regleRotation(B, options)
  this.crayonMontrer()
  const O2 = rotation(A, O, -90)
  const O3 = rotation(A, O, 90)
  const M = pointSurSegment(O, O2, 0.2)
  const N = pointSurSegment(O, O3, 0.2)
  if (M.y > N.y) {
    this.trait(O, M, { vitesse: options.vitesse, tempo: options.tempo, couleur: options.couleurTraitsDeConstruction, epaisseur: options.epaisseurTraitsDeConstruction })
  } else {
    this.trait(O, N, { vitesse: options.vitesse, tempo: options.tempo, couleur: options.couleurTraitsDeConstruction, epaisseur: options.epaisseurTraitsDeConstruction })
  }
  this.regleSegment(O, C, options)
  if (options.codage) {
    this.segmentCodage(A, O, options)
    this.segmentCodage(O, B, options)
  }
}

Alea2iep.prototype.bissectriceAuCompas = function (A, B, C, { codage = '/', l = 2, couleur = this.couleur, tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2, 0), epaisseur = this.epaisseur, pointilles = this.pointilles, couleurCodage = this.couleurCodage, masquerTraitsDeConstructions = true } = {}) {
  const A1 = pointSurSegment(B, A, l)
  const C1 = pointSurSegment(B, C, l)
  // const demiangle = calcul(angleOriente(A, B, C) / 2);
  const angle = angleOriente(A, B, C)
  const M = rotation(B, A1, -(180 - angle))
  const options = { couleur: couleur, tempo: tempo, vitesse: vitesse, sens: sens, pointilles: false }
  const arc1 = this.compasTracerArcCentrePoint(B, A1, options)
  const arc2 = this.compasTracerArcCentrePoint(B, C1, options)
  const arc3 = this.compasTracerArcCentrePoint(A1, M, options)
  const arc4 = this.compasTracerArcCentrePoint(C1, M, options)
  this.compasMasquer()
  this.regleDemiDroiteOriginePoint(B, M, { longueur: longueur(B, A), couleur: couleur, tempo: tempo, vitesse: vitesse, sens: sens, epaisseur: epaisseur, pointilles: pointilles })
  this.regleMasquer()
  this.crayonMasquer()
  if (codage) {
    this.angleCodage(A, B, M, { couleur: couleurCodage, codage: codage, tempo: tempo })
    this.angleCodage(M, B, C, { couleur: couleurCodage, codage: codage, tempo: tempo })
  }
  if (masquerTraitsDeConstructions) {
    this.traitMasquer(arc1)
    this.traitMasquer(arc2)
    this.traitMasquer(arc3)
    this.traitMasquer(arc4)
  }
  return { arc1: arc1, arc2: arc2, arc3: arc3, arc4: arc4 }
}

Alea2iep.prototype.cercleCirconscrit = function (A, B, C, options) {
  if (options.couleur === undefined) {
    options.couleur = this.couleur
  }
  if (options.couleurMediatrice === undefined) {
    options.couleurMediatrice = options.couleur
  }
  if (options.couleurCercle === undefined) {
    options.couleurCercle = options.couleur
  }
  options.codage = 'X'
  options.couleur = options.couleurMediatrice
  const m1 = this.mediatriceAuCompas(A, B, options)
  this.traitMasquer(m1[0]) // On cache les arcs de cercle une fois la médiatrice tracée
  this.traitMasquer(m1[1])
  this.traitMasquer(m1[2])
  this.traitMasquer(m1[3])
  options.codage = '||'
  const m2 = this.mediatriceAuCompas(B, C, options)
  this.traitMasquer(m2[0])
  this.traitMasquer(m2[1])
  this.traitMasquer(m2[2])
  this.traitMasquer(m2[3])
  options.codage = '///'
  const m3 = this.mediatriceAuCompas(A, C, options)
  this.traitMasquer(m3[0])
  this.traitMasquer(m3[1])
  this.traitMasquer(m3[2])
  this.traitMasquer(m3[3])
  const O = centreCercleCirconscrit(A, B, C)
  options.couleur = options.couleurCercle
  this.compasCercleCentrePoint(O, A, options)
}

/**
 *****************************************
 ************** TRIANGLES ****************
 *****************************************
 */

Alea2iep.prototype.triangle3longueurs = function (ABC, AB, AC, BC, description = true) {
  const A = point(6, 0)
  const B = pointAdistance(A, AB, randint(-20, 20))
  const p = triangle2points2longueurs(A, B, AC, BC)
  const C = p.listePoints[2]
  if (ABC.length !== 3) {
    description = false
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]
  }

  if (description) this.textePosition(`${A.nom + B.nom} = ${nombreAvecEspace(AB)} cm`, 0, -2)
  this.pointCreer(A)
  // this.regleRotation(droite(A,B).angleAvecHorizontale)
  // this.regleMontrer(A)
  this.regleSegment(A, B)
  this.pointCreer(B)
  this.crayonMasquer()
  if (description) this.textePosition(`${A.nom + C.nom} = ${nombreAvecEspace(AC)} cm donc ${C.nom} appartient au cercle de centre ${A.nom} et de rayon ${nombreAvecEspace(AC)} cm.`, 0, -3)
  this.couleur = 'forestgreen'
  this.epaisseur = 2
  this.compasMontrer(A)
  this.compasEcarterAvecRegle(AC)
  this.compasTracerArcCentrePoint(A, C, 40)
  if (description) this.textePosition(`${B.nom + C.nom} = ${nombreAvecEspace(BC)} cm donc ${C.nom} appartient au cercle de centre ${B.nom} et de rayon ${nombreAvecEspace(BC)} cm.`, 0, -4)
  this.compasDeplacer(B)
  this.compasEcarterAvecRegle(BC)
  this.compasTracerArcCentrePoint(B, C)
  this.compasMasquer()
  this.couleur = 'blue'
  this.epaisseur = 3
  if (description) this.textePosition(`Le point ${C.nom} est à une intersection des deux cercles.`, 0, -5)
  this.pointCreer(C)
  this.regleSegment(B, C)
  this.regleSegment(C, A)
  this.crayonMasquer()
  this.regleMasquer()
  return [A, B, C]
}

Alea2iep.prototype.triangleRectangleCoteHypotenuse = function (ABC, AB, AC, description = true) { // Triangle rectangle en B
  const A = point(6, 0)
  const B = pointAdistance(A, AB, randint(-20, 20))
  const dAB = droite(A, B)
  dAB.isVisible = false
  const dBC = droiteParPointEtPerpendiculaire(B, dAB)
  dBC.isVisible = false
  const cAC = cercle(A, AC)
  cAC.isVisible = false
  const C = pointIntersectionLC(dBC, cAC)
  const c = homothetie(C, B, 1.2)
  if (ABC.length !== 3) {
    description = false
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]
  }

  if (longueur(A, C) > 8) this.equerreZoom(150)
  if (description) this.textePosition(`${A.nom + B.nom} = ${nombreAvecEspace(AB)} cm`, 0, -2)
  this.equerreRotation(dAB.angleAvecHorizontale)
  this.pointCreer(A)
  this.regleSegment(A, B)
  this.pointCreer(B)
  if (description) this.textePosition(`${A.nom + B.nom + C.nom} est un triangle rectangle en ${B.nom} donc ${C.nom} appartient à la perpendiculaire à (${A.nom + B.nom}) passant par ${B.nom}.`, 0, -3)
  this.equerreMontrer(A)
  this.equerreDeplacer(B)
  this.tracer(c)
  this.equerreMasquer()
  if (description) this.textePosition(`${A.nom + C.nom} = ${nombreAvecEspace(AC)} cm donc C appartient au cercle de centre A et de rayon ${nombreAvecEspace(AC)} cm.`, 0, -4)
  this.compasMontrer(A)
  this.compasEcarterAvecRegle(AC)
  this.couleur = 'forestgreen'
  this.epaisseur = 2
  this.compasTracerArcCentrePoint(A, C)
  this.couleur = 'blue'
  this.epaisseur = 2
  if (description) this.textePosition(`${C.nom} est à une intersection de la perpendiculaire et du cercle.`, 0, -5)
  this.pointCreer(C)
  this.compasMasquer()
  this.regleSegment(A, C)
  this.regleMasquer()
  this.crayonMasquer()
}

Alea2iep.prototype.triangle1longueur2angles = function (NOM, AB, BAC, CBA, description = true) { // Triangle dont on connait AB et les deux angles adjacents
  const angle = randint(-20, 20)
  const a1 = BAC
  const a2 = CBA
  const A = point(2, 0)
  const B = pointAdistance(A, AB, angle)
  const D = pointAdistance(A, 5.2, a1 + angle)
  const D2 = pointSurSegment(A, D, 10)
  const D1 = pointSurSegment(D, D2, 0.4)
  const E = pointAdistance(B, 3, 180 - a2 + angle)
  const E2 = pointSurSegment(B, E, 10)
  const E1 = pointSurSegment(E, E2, -0.4)
  const F = pointAdistance(B, 5.2, 180 - a2 + angle)
  const F1 = pointSurSegment(F, E2, 0.4)
  const d = rotation(droite(A, B), A, a1)
  D.isVisible = false
  const d2 = rotation(droite(B, A), B, -a2)
  d2.isVisible = false
  const C = pointIntersectionDD(d, d2)
  if (NOM.length !== 3) {
    description = false
    A.nom = NOM[0]
    B.nom = NOM[1]
    C.nom = NOM[2]
  }
  this.couleur = 'blue'
  this.epaisseur = 3
  this.pointCreer(A)
  if (description) this.textePosition(`On trace le côté [${A.nom + B.nom}] de ${nombreAvecEspace(AB)} cm.`, 0, -4)
  this.regleSegment(A, B)
  this.pointCreer(B)
  this.couleur = 'grey'
  this.epaisseur = 1
  this.rapporteurMontrer(A)
  this.rapporteurDeplacer(A)
  this.rapporteurRotation(angle)
  if (description) this.textePosition(`On place un repère à ${a1} degrés pour tracer la demi-droite [${A.nom + C.nom}).`, 0, -5)
  this.epaisseur = 3
  this.trait(D, D1, 20)
  this.epaisseur = 1
  this.rapporteurMasquer()
  this.regleSegment(A, D2)
  this.regleMasquer()
  this.angleCodage(B, A, C)
  this.rapporteurMontrer(A)
  this.rapporteurDeplacer(B)
  if (description) this.textePosition(`On place un repère à ${a2} degrés pour tracer la demi-droite [${B.nom + C.nom}).`, 0, -6)
  this.epaisseur = 3
  this.trait(E, E1, 10)
  this.trait(F, F1, 20)
  this.epaisseur = 1
  this.rapporteurMasquer()
  this.regleMontrer(B)
  this.regleSegment(B, E2)
  this.angleCodage(C, B, A)
  this.pointCreer(C, '', 0)
  this.pointNommer(C, C.nom, -0.5, 1)
  this.couleur = 'blue'
  this.epaisseur = 3
  this.regleSegment(B, C)
  this.regleSegment(C, A)
  this.regleMasquer()
  this.crayonMasquer()
}

Alea2iep.prototype.triangleEquilateral2Sommets = function (A, B, nomC = '') {
  const C = rotation(B, A, 60)
  C.nom = nomC
  this.traitRapide(A, B)
  this.pointCreer(A, A.nom, 0)
  this.pointCreer(B, B.nom, 0)
  this.compasEcarter2Points(A, B)
  this.compasTracerArcCentrePoint(A, C)
  this.compasTracerArcCentrePoint(B, C)
  this.pointCreer(C)
  this.compasMasquer()
  this.regleSegment(A, C)
  this.regleSegment(C, B)
  this.regleMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, B)
  this.segmentCodage(A, C)
  this.segmentCodage(B, C)
}

/**
 ************************************************
 ************** PARALLELOGRAMMES ****************
 ************************************************
 */

Alea2iep.prototype.parallelogramme3sommetsConsecutifs = function (A, B, C, nomD = '', description = true, cotesDejaTraces = true) {
  const D = translation2Points(C, B, A)
  D.nom = nomD
  const xMin = Math.min(A.x, B.x, C.x, D.x)
  const yMin = Math.min(A.y, B.y, C.y, D.y)
  // const xMax = Math.max(A.x, B.x, C.x, D.x)
  // const yMax = Math.max(A.y, B.y, C.y, D.y)
  this.traitRapide(A, B)
  this.traitRapide(B, C)
  this.pointCreer(A, A.nom, 0)
  this.pointCreer(B, B.nom, 0)
  this.pointCreer(C, C.nom, 0)
  this.textePosition(`${A.nom + B.nom + C.nom + D.nom} est un parallélogramme donc ses côtés opposés sont de même longueur.`, xMin - 1, yMin - 1)
  this.compasEcarter2Points(B, A)
  this.textePosition(`${B.nom + A.nom} = ${C.nom + D.nom}`, xMin - 1, yMin - 2)
  this.compasTracerArcCentrePoint(C, D)
  this.compasEcarter2Points(B, C)
  this.textePosition(`${B.nom + C.nom} = ${A.nom + D.nom}`, xMin - 1, yMin - 3)
  this.compasTracerArcCentrePoint(A, D, 10)
  this.pointCreer(D)
  this.compasMasquer()
  this.regleSegment(C, D)
  this.regleSegment(D, A)
  this.regleMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, B, { codage: '///', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(D, C, { codage: '///', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(B, C, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(A, D, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
}

Alea2iep.prototype.parallelogramme2sommetsConsecutifsCentre = function (A, B, O, nomC = '', nomD = '', description = true) {
  const C = translation2Points(O, A, O)
  C.nom = nomC
  const D = translation2Points(O, B, O)
  D.nom = nomD
  const nom = A.nom + B.nom + C.nom + D.nom
  if (longueur(A, C) > 12 || longueur(B, D) > 12) {
    this.regleModifierLongueur(30)
  }
  const xMin = Math.min(A.x, B.x, C.x, D.x)
  const yMin = Math.min(A.y, B.y, C.y, D.y)
  // const xMax = Math.max(A.x, B.x, C.x, D.x)
  // const yMax = Math.max(A.y, B.y, C.y, D.y)
  this.traitRapide(A, B)
  this.pointCreer(A, { tempo: 0 })
  this.pointCreer(B, { tempo: 0 })
  this.pointCreer(O, { tempo: 0 })
  if (description && nom.length === 4) {
    this.textePosition(`${A.nom + B.nom + C.nom + D.nom} est un parallélogramme donc ses diagonales se coupent en leur milieu.`, xMin - 1, yMin - 1)
  }
  this.pointilles = true
  this.epaisseur = 1
  this.couleur = this.couleurTraitsDeConstruction
  this.regleDemiDroiteOriginePoint(A, O, { longueur: longueur(A, C) + 3 })
  this.regleMasquer()
  this.crayonMasquer()
  this.compasEcarter2Points(A, O)
  if (description && nom.length === 4) {
    this.textePosition(`${A.nom + O.nom} = ${O.nom + C.nom}`, xMin - 1, yMin - 2)
  }
  this.pointilles = false
  this.compasTracerArcCentrePoint(O, C)
  this.compasMasquer()
  this.pointilles = true
  this.regleDemiDroiteOriginePoint(B, O, { longueur: longueur(B, D) + 3 })
  this.regleMasquer()
  this.crayonMasquer()
  this.pointilles = false
  this.compasEcarter2Points(B, O)
  if (description && nom.length === 4) {
    this.textePosition(`${B.nom + O.nom} = ${O.nom + D.nom}`, xMin - 1, yMin - 3)
  }
  this.compasTracerArcCentrePoint(O, D)
  this.compasMasquer()
  this.couleur = 'blue'
  this.epaisseur = 3
  this.pointCreer(D)
  this.regleSegment(A, D)
  this.regleSegment(D, C)
  this.regleSegment(C, B)
  this.regleMasquer()
  this.compasMasquer()
  this.crayonMasquer()
  this.segmentCodage(A, O, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(O, C, { codage: '//', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(B, O, { codage: 'O', couleur: this.couleurCodage, tempo: 0 })
  this.segmentCodage(O, D, { codage: 'O', couleur: this.couleurCodage, tempo: 0 })
}

Alea2iep.prototype.parallelogrammeAngleCentre = function (D, A, B, O) {
  const B1 = pointSurSegment(A, B, longueur(A, B) + 2)
  const D1 = pointSurSegment(A, D, longueur(A, D) + 2)
  const C = translation2Points(B, A, D)
  this.traitRapide(A, B1)
  this.traitRapide(A, D1)
  this.pointCreer(O, { tempo: 0 })
  this.pointCreer(A, { tempo: 0 })
  this.pointilles = true
  this.couleur = 'gray'
  this.epaisseur = 1
  this.regleDemiDroiteOriginePoint(A, O)
  this.pointilles = false
  this.regleMasquer()
  this.crayonMasquer()
  this.compasEcarter2Points(A, O)
  this.compasTracerArcCentrePoint(O, C)
  this.compasMasquer()
  this.paralleleRegleEquerre2points3epoint(B, A, C)
  this.equerreMasquer()
  this.regleDroite(C, D)
  this.paralleleRegleEquerre2points3epoint(A, D, C)
  this.equerreMasquer()
  this.regleDroite(C, B)
  this.pointCreer(D, { tempo: 0 })
  this.pointCreer(B, { tempo: 0 })
  this.pointCreer(C, { tempo: 0 })
  this.epaisseur = 3
  this.couleur = 'blue'
  this.regleSegment(B, C)
  this.regleSegment(C, D)
  this.regleMasquer()
  this.crayonMasquer()
}
