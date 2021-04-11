/* global iepLoad */

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

  /**
   * Renvoie le script xml
   *
   */
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

  /**
   * Renvoie le code HTML de l'animation
   * @param {int} numeroExercice - Numéro de l'exercice
   * @param {int} i - Numéro de la question
   */
  this.html = function (id1, id2) {
    if (window.sortie_html) {
      const id = `IEP_${id1}_${id2}`
      window.listeScriptsIep[id] = this.script() // On ajoute le script
      const codeHTML = `<div id="IEPContainer${id}" ></div>`
      window.listeAnimationsIepACharger.push(id)
      return codeHTML
    }
  }

  /**
   *
   * @param {int} numeroExercice - Numéro de l'exercice
   * @param {int} i - Numéro de la question
   * @return Code HTML avec le bouton qui affiche ou masque un div avec l'animation
   */
  this.htmlBouton = function (id1, id2 = '') {
    if (window.sortie_html) {
      const id = `IEP_${id1}_${id2}`
      window.listeScriptsIep[id] = this.script() // On ajoute le script
      const codeHTML = `<br><button class="ui mini compact button" id="btnAnimation${id}" onclick="toggleVisibilityIEP('${id}')"><i class="large play circle outline icon"></i>Voir animation</button>
            <div id="IEPContainer${id}" style="display: none;" ></div>`
      if (!window.toggleVisibilityIEP) {
        window.toggleVisibilityIEP = function (id) {
          const element = document.getElementById(`IEPContainer${id}`)
          const elementBtn = document.getElementById(`btnAnimation${id}`)
          const xml = window.listeScriptsIep[id]
          if (element.style.display === 'none') {
            element.style.display = 'block'
            elementBtn.innerHTML = '<i class="large stop circle outline icon"></i>Masquer animation'
            console.log(element, xml)
            iepLoad(element, xml, { zoom: true }, (error)=>{console.log(error)})
          } else {
            element.style.display = 'none'
            elementBtn.innerHTML = '<i class="large play circle outline icon"></i>Voir animation'
          }
        }
      }
      return codeHTML
    } else {
      return ''
    }
  }

  /**
 **************************
 *** FONCTIONS COMMUNES ***
 **************************
 */

  /**
   *
   * @param {string} objet - 'regle', 'equerre', 'requerre, 'compas', 'rapporteur' ou 'crayon'
   * @param {point} A - Point (0, 0) par défaut
   * @param {objet} options - { tempo : 10 }
   */
  this.montrer = function (objet, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    if (!this[objet].visibilite || this[objet].position !== A) { // On ajoute une ligne xml que si l'objet est caché ou doit apparaitre à un autre endroit
      let codeXML = ''
      let A1
      if (typeof A === 'undefined') { // A1 est une copie de A ou (0,0) si A n'est pas défini
        A1 = this[objet].position
      } else {
        A1 = A
      }
      if (this[objet].visibilite) { // S'il est déjà visible, montrer devient un déplcer
        this.deplacer(objet, A1, { tempo: tempo, vitesse: vitesse })
      } else {
        codeXML = `<action objet="${objet}" mouvement="montrer" abscisse="${this.x(A1)}" ordonnee="${this.y(A1)}" tempo="${tempo}" />`
        this[objet].visibilite = true
      }
      this[objet].position = A1
      this.liste_script.push(codeXML)
    }
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.regleMontrer = function (A, options) {
    this.montrer('regle', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.crayonMontrer = function (A, options) {
    this.montrer('crayon', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.equerreMontrer = function (A, options) {
    this.montrer('equerre', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.requerreMontrer = function (A, options) {
    this.montrer('requerre', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.compasMontrer = function (A, options) {
    this.montrer('compas', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.rapporteurMontrer = function (A, options) {
    this.montrer('rapporteur', A, options)
  }

  /**
   *
   * @param {string} objet
   * @param {objet} param1
   */
  this.masquer = function (objet, { tempo = this.tempo } = {}) {
    if (this[objet].visibilite) { // On ajoute une ligne xml que si l'objet est visible
      const codeXML = `<action objet="${objet}" mouvement="masquer" tempo="${tempo}" />`
      this[objet].visibilite = false
      this.liste_script.push(codeXML)
    }
  }
  /**
   *
   * @param {objet} options
   */
  this.regleMasquer = function (options) {
    this.masquer('regle', options)
  }
  /**
   *
   * @param {objet} options
   */
  this.crayonMasquer = function (options) {
    this.masquer('crayon', options)
  }
  /**
   *
   * @param {objet} options
   */
  this.equerreMasquer = function (options) {
    this.masquer('equerre', options)
  }
  /**
   *
   * @param {objet} options
   */
  this.requerreMasquer = function (options) {
    this.masquer('requerre', options)
  }
  /**
   *
   * @param {objet} options
   */
  this.compasMasquer = function (options) {
    this.masquer('compas', options)
  }
  /**
   *
   * @param {objet} options
   */
  this.rapporteurMasquer = function (options) {
    this.masquer('rapporteur', options)
  }

  /**
 *
 * @param {string} objet
 * @param {point} A
 * @param {objet} options
 */
  this.deplacer = function (objet, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    if (this[objet].position !== A) { // On n'ajoute une commande xml que s'il y a vraiment un déplacement
      const codeXML = `<action objet="${objet}" mouvement="translation" abscisse="${this.x(A)}" ordonnee="${this.y(A)}" tempo="${tempo}" vitesse="${vitesse}" />`
      this[objet].position = A
      this.liste_script.push(codeXML)
    }
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.regleDeplacer = function (A, options) {
    this.deplacer('regle', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.texteDeplacer = function (id, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    const codeXML = `<action objet="texte" id="${id}" mouvement="translation" abscisse="${this.x(A)}" ordonnee="${this.y(A)}" tempo="${tempo}" vitesse="${vitesse}" />`
    this.liste_script.push(codeXML)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.crayonDeplacer = function (A, options) {
    this.deplacer('crayon', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.equerreDeplacer = function (A, options) {
    this.deplacer('equerre', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.requerreDeplacer = function (A, options) {
    this.deplacer('requerre', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.compasDeplacer = function (A, options) {
    this.deplacer('compas', A, options)
  }
  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  this.rapporteurDeplacer = function (A, options) {
    this.deplacer('rapporteur', A, options)
  }

  /**
 *
 * @param {string} objet
 * @param {int} angle
 * @param {objet} options
 */
  this.rotation = function (objet, a, { tempo = this.tempo, sens = calcul(this.vitesse / 2, 0) } = {}) {
    let angle
    if (a.typeObjet === 'point') {
      const d = droite(this[objet].position, a)
      angle = d.angleAvecHorizontale
    } else {
      angle = a
    }
    if (this[objet].angle !== a) { // Si la rotation est inutile, on ne la fait pas
      // Les angles de MathALEA2D et de IEP sont opposés !!!!!
      const codeXML = `<action objet="${objet}" mouvement="rotation" angle="${-1 * angle}" tempo="${tempo}" sens="${sens}" />`
      this[objet].angle = angle
      if (typeof angle === 'number' && isFinite(angle)) {
        this.liste_script.push(codeXML)
      } else {
        console.log('Angle de rotation non défini.')
      }
    }
  }
  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  this.regleRotation = function (angle, options) {
    this.rotation('regle', angle, options)
  }
  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  this.crayonRotation = function (angle, options) {
    this.rotation('crayon', angle, options)
  }
  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  this.equerreRotation = function (angle, options) {
    this.rotation('equerre', angle, options)
  }
  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  this.requerreRotation = function (angle, options) {
    this.rotation('requerre', angle, options)
  }
  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  this.compasRotation = function (angle, options) {
    this.rotation('compas', angle, options)
  }
  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  this.rapporteurRotation = function (angle, options) {
    this.rotation('rapporteur', angle, options)
  }
  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  this.regleZoom = function (k, { tempo = 0 } = {}) {
    this.regle.zoom = k
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="regle" tempo="${tempo}" />`)
  }
  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  this.equerreZoom = function (k, { tempo = 0 } = {}) {
    this.equerre.zoom = k
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="equerre" tempo="${tempo}" />`)
  }
  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  this.requerreZoom = function (k, { tempo = 0 } = {}) {
    this.requerre.zoom = k
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="requerre" tempo="${tempo}" />`)
  }
  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  this.rapporteurZoom = function (k, { tempo = 0 } = {}) {
    this.rapporteur.zoom = k
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="rapporteur" tempo="${tempo}" />`)
  }
  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  this.compasZoom = function (k, { tempo = 0 } = {}) {
    this.compas.zoom = k
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="compas" />`)
  }

  /**
 **************************
 ********* POINT **********
 **************************
 */

  /**
 * Crééer un point avec la croix pour le situer et son nom en bas à droite par défaut. L'id sera sauvegardé dans l'objet point. S'il n'est pas défini alors on prend le premier entier disponible.
 * @param {point} A
 * @param {objet} options { label: A.nom, tempo: this.tempo, couleur: this.couleurPoint, couleurLabel: this.couleurTexte, id }
 *
 */
  this.pointCreer = function (A, { label = A.nom, tempo = this.tempo, couleur = this.couleurPoint, couleurLabel = this.couleurTexte, id } = {}) {
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
  /**
 * Création de plusieurs points
 *
 * @param  {...any} points Points séparés par des virgules
 */
  this.pointsCreer = function (...points) {
    for (const point of points) {
      this.pointCreer(point, { tempo: 0 })
    }
  }
  /**
 * Masquer un point
 * @param {point} A
 * @param {objet} options Défaut : { tempo: 0 }
 */
  this.pointMasquer = function (A, { tempo = 0 } = {}) {
    this.liste_script.push(`<action id="${A.id}" mouvement="masquer" objet="point" tempo="${tempo}" />`)
  }
  /**
   * Montrer un point qui aurait été caché
   * @param {point} A
   * @param {objet} options Défaut ; { tempo : this.tempo }
   */
  this.pointMontrer = function (A, { tempo = this.tempo } = {}) {
    this.liste_script.push(`<action id="${A.id}" mouvement="montrer" objet="point" tempo="${tempo}" />`)
  }
  /**
   * Anime la translation d'un point
   * @param {point} A
   * @param {int} x Abscisse du point d'arrivée
   * @param {int} y Ordonnée du point d'arrivée
   * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse }
   */
  this.pointDeplacer = function (A, x, y, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    const B = point(x, y)
    this.liste_script.push(`<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" id="${A.id}" mouvement="translation" objet="point" tempo="${tempo}" vitesse="${vitesse}" />`)
  }
  /**
   * Ajoute un label au point
   * @param {point} A
   * @param {string} nom
   * @param {objet} options dx pour le déplacement vertical du nom du point, dy pour le déplacemetn horizontal, couleur: this.couleurPoint, tempo: this.tempo
   */
  this.pointNommer = function (A, nom, { dx, dy, couleur = this.couleurPoint, tempo = this.tempo } = {}) {
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
* Change l'orientation du compas. Par défaut, elle est vers la droite. L'orientation courante du compas est sauvegardée dans this.compas.orientation
* @param {objet} options Défaut : { tempo: this.tempo}
*/
  this.compasRetourner = function ({ tempo = this.tempo } = {}) {
    const codeXML = `<action mouvement="retourner" objet="compas" tempo="${tempo}" />`
    if (this.compas.orientation === 'droite') {
      this.compas.orientation = 'gauche'
    } else {
      this.compas.orientation = 'droite'
    }
    this.liste_script.push(codeXML)
  }
  /**
   *
   * @param {int} longueur écartement en cm
   * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse }
   */
  this.compasEcarter = function (l, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    const codeXML = `<action ecart="${calcul(l * 30, 1)}" mouvement="ecarter" objet="compas" tempo="${tempo}" vitesse="${vitesse}" />`
    this.compas.ecartement = l
    this.liste_script.push(codeXML)
  }
  /**
   * Fais apparaitre la règle à l'horizontale, met le compas vertical et écarte le compas le long de la règle pour lire son écartement
   * @param {int} longueur
   * @param {*} options Défaut : { tempo: this.tempo, vitesse: this.vitesse, sens : this.vitesse / 2 }
   */
  this.compasEcarterAvecRegle = function (l, { tempo = this.tempo, vitesse = this.vitesse, sens = this.vitesse / 2 } = {}) {
    this.regleRotation(0, { tempo: 0, sens: sens })
    this.regleMontrer(this.compas.position, { tempo: 0 })
    this.regleDeplacer(this.compas.position, { tempo: 0, vitesse: vitesse })
    this.compasMontrer()
    this.compasRotation(0, { tempo: 0, sens: sens })
    this.compasEcarter(l, { tempo: tempo, vitesse: vitesse, sens: sens })
  }
  /**
 *
 * @param {point} A Pointe du compas
 * @param {point} B Mine du compas
 * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse, sens : this.vitesse / 2 }
 */
  this.compasEcarter2Points = function (A, B, { tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2) } = {}) {
    this.compasMontrer(A)
    this.compasDeplacer(A, { tempo: tempo, vitesse: vitesse })
    const s = segment(A, B)
    s.isVisible = false
    const angle = s.angleAvecHorizontale
    this.compasRotation(angle, { tempo: tempo, sens: sens })
    this.compasEcarter(longueur(A, B), { tempo: tempo, vitesse: vitesse })
  }
  /**
 * Remettre le compas en position standard. Son état est sauvegardé dans le booléen this.compas.leve.
 * @param {objet} options Défaut : { tempo: this.tempo }
 */
  this.compasLever = function ({ tempo = this.tempo } = {}) {
    if (!this.compas.leve) { // On ne fait rien si le compas est déjà levé
      const codeXML = `<action mouvement="lever" objet="compas" tempo="${tempo} />`
      this.compas.leve = true
      this.liste_script.push(codeXML)
    }
  }
  /**
 * Voir le compas en vue de dessus avant qu'il trace un arc de cercle
 * @param {objet} options Défaut : { tempo: this.tempo }
 */
  this.compasCoucher = function ({ tempo = this.tempo } = {}) {
    if (this.compas.leve) { // On ne fait rien si le compas est déjà levé
      const codeXML = `<action mouvement="coucher" objet="compas" tempo="${tempo}" />`
      this.compas.leve = false
      this.liste_script.push(codeXML)
    }
  }
  /**
 * Trace un arc de cercle en gardant l'écartement et le centre actuel. L'angle de départ sera choisi pour être le plus proche de l'angle actuel
 * @param {int} angle1
 * @param {int} angle2
 * @param {objet} options Défaut : { tempo: this.tempo, sens: this.vitesse / 2, epaisseur: this.epaisseur, couleur: this.couleurCompas, pointilles: this.pointilles }
 * @return {id}
 */
  this.compasTracerArc2Angles = function (angle1, angle2, { tempo = this.tempo, sens = calcul(this.vitesse / 2, 0), epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = this.pointilles } = {}) {
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
   * Trace un arc de cercle autour d'un point. La longueur de l'arc est déterminée par l'option delta en degré qui est ajoutée de part et d'autre du point
   * @param {point} centre
   * @param {point} point
   * @param {objet} options Défaut : { delta: 10, tempo: this.tempo, sens: this.vitesse / 2, epaisseur: this.epaisseur, couleur: this.couleurCompas, pointilles: this.pointilles }
   * @return {id}
   */
  this.compasTracerArcCentrePoint = function (centre, point, { delta = 10, tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2, 0), epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = this.pointilles } = {}) {
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
  /**
 *
 * @param {point} centre
 * @param {point} point Point de départ du tracé du cercle
 * @param {objet} options Défaut : { tempo: this.tempo, sens: this.vitesse / 2, epaisseur: this.epaisseur, couleur: this.couleurCompas, pointilles: this.pointilles }
 */
  this.compasCercleCentrePoint = function (centre, point, { tempo = this.tempo, couleur = this.couleur, vitesse = this.vitesse, sens = calcul(this.vitesse / 2), epaisseur = this.epaisseur, pointilles = this.pointilles } = {}) {
    this.compasEcarter2Points(centre, point, { vitesse: vitesse, tempo: tempo })
    const d = droite(centre, point)
    const angle1 = d.angleAvecHorizontale
    this.compasTracerArc2Angles(angle1, angle1 + 360, { tempo: tempo, vitesse: vitesse, sens: sens, epaisseur: epaisseur, couleur: couleur, pointilles: pointilles })
  }

  /**
 **************************
 ******** REQUERRE ********
 **************************
 */

  /**
   *
   * @param {int} déplacement en nombre de cm (le déplacement peut être positif ou négatif)
   * @param {*} options Défaut : { tempo: this.tempo, vitesse: this.vitesse }
   */
  this.requerreGlisserEquerre = function (a, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    this.liste_script.push(`<action abscisse="${a * 30}" mouvement="glisser" objet="requerre" tempo="${tempo}" vitesse="${vitesse}" />`)
  }

  /**
 **************************
 ******* RAPPORTEUR *******
 **************************
 */

  // Non pris en charge par le lecteur JS
  // this.rapporteurCirculaire = function (tempo=this.tempo) {
  // //     this.liste_script.push(`<action mouvement="circulaire" objet="rapporteur" tempo="${tempo}"/>`)
  // }
  // this.rapporteurSemiCirculaire = function (tempo=this.tempo) {
  // //     this.liste_script.push(`<action mouvement="semicirculaire" objet="rapporteur" tempo="${tempo}"/>`)
  // }

  /**
   * Masque la graduation externe du rapporteur (laisse l'autre graduation visible)
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.rapporteurMasquerGraduationsExterieures = function ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="masquer_nombres" objet="rapporteur" tempo="${tempo}"/>`)
  }
  /**
   * Montre la graduation extérieure si elle avait été précédemment cachée
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.rapporteurMontrerGraduationsExterieures = function ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="montrer_nombres" objet="rapporteur" tempo="${tempo}"/>`)
  }
  /**
   * Masque la graduation interne du rapporteur (laisse l'autre graduation visible)
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.rapporteurMasquerGraduationsInterieures = function ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="vide" objet="rapporteur" tempo="${tempo}"/>`)
  }
  /**
   * Montre la graduation interne si elle avait été précédemment cachée
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.rapporteurMontrerGraduationsInterieures = function ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="graduations" objet="rapporteur" tempo="${tempo}"/>`)
  }
  /**
 * Met le rapporteur en position avec le centre en A et le 0 de droite alogné avec le point B
 * @param {point} A
 * @param {point} B
 * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse, sens : this.vitesse / 2 }
 */
  this.rapporteurDeplacerRotation2Points = function (A, B, { tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.tempo / 2) } = {}) {
    const d = droite(A, B)
    d.isVisible = false
    this.rapporteurMontrer()
    this.rapporteurDeplacer(A, { tempo: tempo, vitesse: vitesse })
    this.rapporteurRotation(d.angleAvecHorizontale, { tempo: tempo, vitesse: vitesse, sens: sens })
  }
  /**
 * Fais une petite marque (couleur et épaisseur d'un trait de construction) sur une graduation du rapporteur
 * @param {int} angle
 * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse, couleur: this.couleurTraitsDeConstruction, epaisseur: this.epaisseurTraitsDeConstruction }
 */
  this.rapporteurCrayonMarqueAngle = function (angle, { tempo = this.tempo, vitesse = this.vitesse, couleur = this.couleurTraitsDeConstruction, epaisseur = this.epaisseurTraitsDeConstruction } = {}) {
    const O = this.rapporteur.position
    const M = pointAdistance(O, 5.2, angle + this.rapporteur.angle)
    const N = pointAdistance(O, 5.5, angle + this.rapporteur.angle)
    this.crayonMontrer()
    this.crayonDeplacer(M, { tempo: tempo, vitesse: vitesse })
    this.tracer(N, { tempo: tempo, vitesse: vitesse, couleur: couleur, epaisseur: epaisseur })
  }
  /**
 * Le crayon va faire une marque sur la graduation du rapporteur, le rapporteur va se cacher et on trace une demi-droite dont on peut choisir la "longueur" (par défaut 90% de celle de la règle)
 * @param {point} A Centre du rapporteur
 * @param {point} B Point avec lequel le 0 de droite sera aligné
 * @param {int} angle
 * @param {objet} options { longueur: 0.9 * this.regle.longueur, couleur: this.couleur, tempo: this.tempo, vitesse: this.vitesse, sens : this.vitesse / 2, epaisseur: this.epaisseur, pointilles: this.pointilles }
 */
  this.rapporteurTracerDemiDroiteAngle = function (A, B, angle, { longueur = 0.9 * this.regle.longueur, couleur = this.couleur, tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2), epaisseur = this.epaisseur, pointilles = this.pointilles } = {}) {
    this.rapporteurDeplacerRotation2Points(A, B, { tempo: tempo, vitesse: vitesse, sens: sens })
    this.rapporteurCrayonMarqueAngle(angle, { tempo: tempo, vitesse: vitesse, sens: sens })
    const d = droite(A, B)
    d.isVisible = false
    const M = pointAdistance(A, calcul(5.2 * this.rapporteur.zoom / 100, 1), d.angleAvecHorizontale + angle)
    this.rapporteurMasquer({ tempo: tempo })
    this.regleDemiDroiteOriginePoint(A, M, { longueur: longueur, couleur: couleur, tempo: tempo, vitesse: vitesse, sens: sens, epaisseur: epaisseur, pointilles: pointilles })
  }

  /**
 **************************
 ********* REGLE **********
 **************************
 */

  /**
 * Masquer les graduations sur la règle
 * @param {objet} options Défaut : { tempo: this.tempo }
 */
  this.regleMasquerGraduations = function ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="vide" objet="regle" tempo="${tempo}"/>`)
  }
  /**
 * Montrer les graduations sur la règle si elles avaient été masquées
 * @param {objet} options Défaut : { tempo: this.tempo }
 */
  this.regleMontrerGraduations = function ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="graduations" objet="regle" tempo="${tempo}"/>`)
  }
  /**
   * Modifie la taille de la règle
   * @param {int} longueur
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.regleModifierLongueur = function (longueur = 20, { tempo = this.tempo } = {}) {
    this.regle.longueur = longueur
    this.liste_script.push(`<action mouvement="modifier_longueur" objet="regle" longueur="${longueur}" tempo="${tempo}"/>`)
  }
  /**
 * Trace une demi-droite d'origine O passant par A (ou en direction de A si les points sont trop éloignés)
 * @param {point} O Origine
 * @param {point} A Direction
 * @param {objet} options Défaut {longueur: this.regle.longueur, tempo : this.tempo, vitesse: this.vitesse, sens: this.vitesse / 2}
 */
  this.regleDemiDroiteOriginePoint = function (O, A, options = {}) {
    if (!options.longueur) {
      options.longueur = this.regle.longueur
    }
    const M = pointSurSegment(O, A, options.longueur)
    this.regleSegment(O, M, options)
  }
  this.regleDroite = function (A, B, options = {}) {
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
  /**
 * Avec la règle, on prolonge le segment de l cm du coté de la 2e extrémité si l est positif sinon du côté de la première extrémité
 * @param {point} A
 * @param {point} B
 * @param {objet} options Défaut {longueur: 3, tempo: this.tempo, vitesse: this.vitesse, sens: this.vitesse / 2}
 */
  this.regleProlongerSegment = function (A, B, options = {}) {
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
 * Le crayon trace un trait de sa position courante jusqu'au point B
 * @param {point} B
 * @param {objet} options Défaut { tempo: this.tempo, vitesse: this.vitesse, epaisseur: this.epaisseur, couleur: this.couleur, pointilles: this.pointilles, vecteur: false }
 * @return {id} id utilisée pour le tracé
 */
  this.tracer = function (B, { tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = this.pointilles, vecteur = false } = {}) {
    const pointillesTexte = pointilles ? 'pointille="tiret"' : ''
    const vecteurTexte = vecteur ? 'style="vecteur"' : ''
    this.idIEP += 1
    const codeXML = `<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" epaisseur="${epaisseur}" couleur="${couleur}" mouvement="tracer" objet="crayon" tempo="${tempo}" vitesse="${vitesse}"  ${pointillesTexte} ${vecteurTexte} id="${this.idIEP}" />`
    this.crayon.position = B
    this.liste_script.push(codeXML)
    return this.idIEP
  }
  /**
   * Trace au crayon le segment [AB]
   * @param {point} A Première extrémité
   * @param {point} B Deuxième extrémité
   * @param {*} options
   * @return {id} id utilisée pour le tracé
   */
  this.trait = function (A, B, options = {}) {
    this.crayonDeplacer(A, options)
    return this.tracer(B, options)
  }
  /**
   * Trace au crayon le segment [AB] sans tempo et avec une vitesse multipliée par 1 000
   * @param {point} A Première extrémité
   * @param {point} B Deuxième extrémité
   * @param {*} options
   * @return {id} id utilisée pour le tracé
   */
  this.traitRapide = function (A, B, options = {}) {
    options.tempo = 0
    options.vitesse = 10000
    this.crayonDeplacer(A, options)
    return this.tracer(B, options)
  }
  /**
 * Masque le trait d'id fourni
 * @param {int} id
 * @param {objet} options Défaut : { tempo: 0, vitesse: 200 }
 */
  this.traitMasquer = function (id, { tempo = 0, vitesse = 200 } = {}) {
    this.liste_script.push(`<action mouvement="masquer" objet="trait" id="${id}" vitesse="${vitesse}" />`)
  }
  /**
   *
   * @param {segment/point} Segment à tracer ou première extrémité
   * @param {objet/point} options ou deuxième extrémité
   * @param {objet} options si les deux premiers arguments étaient des points
   * @returns {id} identifiant utilisé pour le trait
   */
  this.regleSegment = function (arg1, arg2, arg3) {
    let A, B, options, id
    if (arg1.typeObjet === 'segment') {
      A = arg1.extremite1
      B = arg1.extremite2
      options = arg2
    } else {
      A = arg1
      B = arg2
      options = arg3
    }
    if (A.x < B.x) { // Toujours avoir la règle de gauche à droite
      this.regleMontrer(A, options)
      this.regleRotation(B, options)
    } else {
      this.regleMontrer(B, options)
      this.regleRotation(A, options)
    }
    if (longueur(this.crayon.position, A) < longueur(this.crayon.position, B)) { // Le crayon ira au point le plus proche
      this.crayonMontrer(A, options)
      id = this.tracer(B, options)
    } else {
      this.crayonMontrer(B, options)
      id = this.tracer(A, options)
    }
    return id
  }
  /**
   * Trace un polygone avec les options par défaut que l'on ne peut pas changer ici
   * @param  {...points} sommets du polygonne séparés par des virgules
   */
  this.polygoneTracer = function (...sommets) {
    for (let i = 0; i < sommets.length - 1; i++) {
      this.regleSegment(sommets[i], sommets[i + 1])
    }
    this.regleSegment(sommets[sommets.length - 1], sommets[0])
  }

  /**
   * Trace un polygone avec traitRapide()
   * @param  {...points} sommets du polygonne séparés par des virgules
   */
  this.polygoneRapide = function (...sommets) {
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

  /**
   * Ecris un texte collé au point. On peut choisir un fond, un cadre, l'opacité du fond, la police...
   * @param {string} texte
   * @param {point} A
   * @param {objet} options Défaut : { tempo: this.tempo, police: false, couleur: this.couleurTexte, couleurFond, opaciteFond, couleurCadre, epaisseurCadre, marge, margeGauche, margeDroite, margeHaut, margeBas }
   * @return {id}
   */
  this.textePoint = function (texte, A, { tempo = this.tempo, police = false, couleur = this.couleurTexte, taille, couleurFond, opaciteFond, couleurCadre, epaisseurCadre, marge, margeGauche, margeDroite, margeHaut, margeBas } = {}) {
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
    if (typeof taille !== 'undefined') {
      options += ` taille="${taille}"`
    }
    let codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" id="${this.idIEP}" mouvement="creer" objet="texte" />`
    codeXML += `\n<action ${policeTexte} couleur="${couleur}" texte="${texte}" id="${this.idIEP}" mouvement="ecrire" objet="texte" ${options} tempo="${tempo}" />`
    this.liste_script.push(codeXML)
    return this.idIEP
  }
  /**
   * Ecris un texte collé au point de coordonnées (x,y). On peut choisir un fond, un cadre, l'opacité du fond, la police...
   * @param {string} texte
   * @param {int} x Abscisse du coin en haut à gauche
   * @param {int} y Ordonnée du coin en haut à gauche
   * @param {objet} options Défaut : { tempo: this.tempo, police: false, couleur: this.couleurTexte, couleurFond, opaciteFond, couleurCadre, epaisseurCadre, marge, margeGauche, margeDroite, margeHaut, margeBas }
   */
  this.textePosition = function (texte, x, y, options) {
    const A = point(x, y)
    return this.textePoint(texte, A, options)
  }

  /**
 * Masque le trait d'id fourni
 * @param {int} id
 * @param {objet} options Défaut : { tempo: 0 }
 */
  this.texteMasquer = function (id, { tempo = 0 } = {}) {
    this.liste_script.push(`<action mouvement="masquer" objet="texte" id="${id}"  />`)
  }

  /**
   * Met l'animation en pause forçant l'utilisateur à appuyer sur lecture pour voir la suite
   */
  this.pause = function () {
    this.liste_script.push('<action mouvement="pause" />')
  }

  /**
 **************************
 ******* CODAGES **********
 **************************
 */

  /**
   *
   * @param {segment/point} Segment à coder ou première extrémité
   * @param {objet/point} options ou deuxième extrémité
   * @param {objet} options si les deux premiers arguments étaient des points. Défaut : { tempo: this.tempo, couleur: this.couleurCodage, codage: '//', }
   * @return {id}
  */
  this.segmentCodage = function (arg1, arg2 = {}, arg3 = {}) {
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
    this.idIEP++
    const id = this.idIEP
    const M = milieu(s.extremite1, s.extremite2)
    const codeXML = `<action abscisse="${this.x(M)}" ordonnee="${this.y(M)}" forme="${options.codage}"  couleur="${options.couleur}" id="${id}" tempo="${options.tempo}" mouvement="creer" objet="longueur" />`
    this.liste_script.push(codeXML)
    return id
  }
  /**
   *
   * @param {int} id Identifiant du codage
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.segmentCodageMasquer = function (id, { tempo = this.tempo } = {}) {
    this.liste_script.push(`<action id="${id}" mouvement="masquer" objet="longueur" tempo="${tempo}" />`)
  }
  /**
   *
   * @param {int} id Identifiant du codage
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  this.segmentCodageMontrer = function (id, { tempo = this.tempo } = {}) {
    this.liste_script.push(`<action id="${id}" mouvement="montrer" objet="longueur" tempo="${tempo}" />`)
  }
  /**
   * Trace le petit carré au crayon
   * @param {point} A Point sur un côté de l'angle
   * @param {point} B Sommet de l'angle
   * @param {point} C Point sur un côté de l'angle
   * @param {objet} options Défaut : {longueur : 0.3, couleur: this.couleurCodage}
   * @return {array} [idTrait1, idTrait2]
   */
  this.codageAngleDroit = function (A, B, C, options = {}) {
    this.crayonMontrer()
    if (options.longueur === undefined) {
      options.longueur = 0.3
    }
    if (options.couleur === undefined) {
      options.couleur = this.couleurCodage
    }
    const C1 = pointSurSegment(B, C, options.longueur)
    const A1 = pointSurSegment(B, A, options.longueur)
    const M = translation2Points(A1, B, C1)
    const options1 = { ...options } // On recopie options pour ouvoir en changer le tempo du premier tracé
    options1.tempo = 0
    const trait1 = this.trait(C1, M, options1)
    const trait2 = this.trait(M, A1, options)
    return [trait1, trait2]
  }
  /**
   * Masque le codage d'un angle droit
   * @param {int} id Identifiant du codage d'un angle droit
   * @param {objet} options Défaut { tempo: 0 }
   */
  this.codageAngleDroitMasquer = function (id, { tempo = 0 } = {}) {
    this.traitMasquer(id[0], { tempo: tempo })
    this.traitMasquer(id[1], { tempo: tempo })
  }

  /**
   * Code un angle. L'option codage peut être "simple", "/", "//", "///", "O"
   * "double", "double/", "double//", "double///", "doubleO"
   * "triple", "triple/", "triple//", "triple///", "tripleO"
   * "plein", "plein/", "plein//", "plein///", "pleinO"
   * @param {point} A Point sur un côté de l'angle
   * @param {point} B Sommet de l'angle
   * @param {point} C Point sur un côté de l'angle
   * @param {objet} options Défaut : { rayon : 1, couleur: this.couleurCodage, codage: 'plein'}
   * @return {id} L'identifiant correspond à l'identifiant des 3 points de l'angle séparés par _
   */
  this.angleCodage = function (B, A, C, { couleur = this.couleurCodage, codage = 'plein', rayon = 1, tempo = this.tempo } = {}) {
    const id = B.id + '_' + A.id + '_' + C.id
    const d1 = droite(A, B)
    const d2 = droite(A, C)
    d1.isVisible = false
    d2.isVisible = false
    const angle1 = -d1.angleAvecHorizontale
    const angle2 = -d2.angleAvecHorizontale
    const codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" rayon="${rayon * 30}" angle1="${angle1}" angle2="${angle2}" forme="${codage}"  couleur="${couleur}" id="${id}" tempo="${tempo}" mouvement="creer" objet="angle" />`
    this.liste_script.push(codeXML)
    return id
  }

  /**
   * Masque un codage préalablement créé
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {objet} options Défaut { tempo: 0 }
   */
  this.angleCodageMasquer = function (B, A, C, { tempo = 0 } = {}) {
    const id = B.id + '_' + A.id + '_' + C.id
    this.liste_script.push(`<action id="${id}" mouvement="masquer" objet="angle" tempo="${tempo}" />`)
  }
  /**
   * Montre un codage préalablement créé
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {objet} options Défaut { tempo: 0 }
   */
  this.angleCodageMontrer = function (B, A, C, { tempo = 0 } = {}) {
    const id = B.id + '_' + A.id + '_' + C.id
    this.liste_script.push(`<action id="${id}" mouvement="montrer" objet="angle" tempo="${tempo}" />`)
  }

  /**
 *****************************************
 ********* MACROS-CONSTRUCTIONS **********
 *****************************************
 */

  /**
   * Trace la parallèle à (AB) passant par C avec la règle et l'équerre. Peut prolonger le segment [AB] si le pied de la hauteur est trop éloigné des extrémités du segment
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {*} options
   */
  this.paralleleRegleEquerre2points3epoint = function (A, B, C, options) {
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
    }

    this.equerreMontrer(H1)
    if (M.x > C1.x) {
      this.equerreRotation(d.angleAvecHorizontale - 90)
    } else {
      this.equerreRotation(d.angleAvecHorizontale + 90)
    }
    if (H1.y > C1.y) {
      if (this.regle.visibilite) {
        this.regleDeplacer(H1, { vitesse: this.vitesse, tempo: 0 })
        this.regleRotation(C1, { sens: this.vitesse / 2, tempo: 0 })
      } else {
        this.regleDeplacer(H1, { vitesse: 1000, tempo: 0 })
        this.regleRotation(C1, { sens: 1000, tempo: 0 })
      }
    } else {
      const C12 = pointSurSegment(C1, H1, -2) // On monte un peu plus la règle pour que ça soit plus crédible
      if (this.regle.visibilite) {
        this.regleDeplacer(C12, { vitesse: this.vitesse, tempo: 0 })
        this.regleRotation(H1, { sens: this.vitesse / 2, tempo: 0 })
      } else {
        this.regleDeplacer(C12, { vitesse: 1000, tempo: 0 })
        this.regleRotation(H1, { sens: 1000, tempo: 0 })
      }
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
 * Trace la médiatrice de [AB] au compas. Le paramétrage des longueurs correspond à la distance entre le milieu du segment et le point d'intersection des arcs de cercles
 *
 * @param {point} A
 * @param {point} B
 * @param {objet} options Défaut : {longueur1: 3, longueur2: 3, codage: 'X', couleurCodage : this.couleurCodage, couleurCompas: this.couleurCompas}
 * @return {array} [arc1, arc2, arc3, arc4, codage1, codage2, codageCarre]
  */
  this.mediatriceAuCompas = function (A, B, options = {}) {
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
      options.couleurCodage = this.couleurCodage
    }
    if (options.couleurCompas === undefined) {
      options.couleurCompas = this.couleurCompas
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
    const codage1 = this.segmentCodage(A, O, { codage: options.codage, couleur: options.couleurCodage, tempo: options.tempo })
    const codage2 = this.segmentCodage(O, B, { codage: options.codage, couleur: options.couleurCodage, tempo: options.tempo })
    const codageCarre = this.codageAngleDroit(A, O, O2, { couleur: options.couleurCodage, tempo: options.tempo, vitesse: options.vitesse })
    return [arc1, arc2, arc3, arc4, codage1, codage2, codageCarre]
  }

  this.mediatriceRegleEquerre = function (A, B, codage = 'X') {
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
  this.hauteur = function (A, B, C, codage = true) {
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

  this.mediane = function (A, B, C, options = {}) {
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

  this.bissectriceAuCompas = function (A, B, C, { codage = '/', l = 2, couleur = this.couleur, tempo = this.tempo, vitesse = this.vitesse, sens = calcul(this.vitesse / 2, 0), epaisseur = this.epaisseur, pointilles = this.pointilles, couleurCodage = this.couleurCodage, masquerTraitsDeConstructions = true } = {}) {
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

  this.cercleCirconscrit = function (A, B, C, options = {}) {
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

  /**
   * Macro de construction d'un triangle à partir de ses 3 dimensions. Le premier point aura pour coordonnées (6,0).
   * @param {string} ABC Une chaine de caractère de 3 lettre
   * @param {*} AB Distance entre le 1er et le 2e sommet
   * @param {*} AC Distance entre le 1er et le 3e sommet
   * @param {*} BC Distance entre le 2e et le 3e sommet
   * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
   * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
   */
  this.triangle3longueurs = function (ABC, AB, AC, BC, description = true) {
    const A = point(6, 0)
    const B = pointAdistance(A, AB, randint(-20, 20))
    const p = triangle2points2longueurs(A, B, AC, BC)
    const C = p.listePoints[2]
    if (ABC.length !== 3) {
      description = false
    } else {
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
  /**
   * Macro de construction d'un triangle rectangle (l'angle droit est le 2e point dans l'ordre du nom)
   *  à partir de la donnée de la longueur d'un côté et de la longueur de l'hypoténuse.
   *  Le premier sommet aura pour coordonnées (6, 0)
   * @param {string} ABC Une chaine de caractère de 3 lettre
   * @param {*} AB Distance entre le 1er et le 2e sommet
   * @param {*} AC Distance entre le 1er et le 3e sommet (hypoténuse)
   * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
   * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
   */
  this.triangleRectangleCoteHypotenuse = function (ABC, AB, AC, description = true) { // Triangle rectangle en B
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
    } else {
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
    this.codageAngleDroit(A, B, C)
    this.crayonMasquer()
    if (description) this.textePosition(`${A.nom + C.nom} = ${nombreAvecEspace(AC)} cm donc ${C.nom} appartient au cercle de centre ${A.nom} et de rayon ${nombreAvecEspace(AC)} cm.`, 0, -4)
    this.compasMontrer(A)
    this.compasEcarterAvecRegle(AC)
    this.couleur = 'forestgreen'
    this.epaisseur = 2
    this.compasTracerArcCentrePoint(A, C)
    this.couleur = 'blue'
    this.epaisseur = 2
    if (description) this.textePosition(`${C.nom} est à une intersection de la perpendiculaire et du cercle.`, 0, -5)
    this.crayonMontrer(C)
    this.pointCreer(C)
    this.compasMasquer()
    this.regleSegment(A, C)
    this.regleMasquer()
    this.crayonMasquer()
    return [A, B, C]
  }

  /**
   * Macro de construction d'un triangle rectangle (l'angle droit est le 2e point dans l'ordre du nom)
   *  à partir de la donnée de la longueur d'un côté et de la longueur de l'hypoténuse.
   *  Le premier sommet aura pour coordonnées (6, 0)
   * @param {string} ABC Une chaine de caractère de 3 lettre
   * @param {*} AB Distance entre le 1er et le 2e sommet
   * @param {*} AC Distance entre le 1er et le 3e sommet (hypoténuse)
   * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
   * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
   */
  this.triangleRectangle2Cotes = function (ABC, AB, BC, description = true) { // Triangle rectangle en B
    const A = point(6, 0)
    const B = pointAdistance(A, AB, randint(-20, 20))
    const dAB = droite(A, B)
    dAB.isVisible = false
    const dBC = droiteParPointEtPerpendiculaire(B, dAB)
    dBC.isVisible = false
    const cBC = cercle(B, BC)
    cBC.isVisible = false
    const C = pointIntersectionLC(dBC, cBC)
    const c = homothetie(C, B, 1.2)
    if (ABC.length !== 3) {
      description = false
    } else {
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
    this.codageAngleDroit(A, B, C)
    if (description) this.textePosition(`${B.nom + C.nom} = ${nombreAvecEspace(BC)} cm donc ${C.nom} est à ${nombreAvecEspace(BC)} cm de ${B.nom} sur la perpendiculaire à (${A.nom + B.nom}) passant par ${B.nom}.`, 0, -4)
    this.regleMontrer(B)
    this.regleRotation(C)
    this.crayonDeplacer(C)
    this.pointCreer(C)
    this.couleur = 'blue'
    this.epaisseur = 2
    this.compasMasquer()
    this.regleSegment(A, C)
    this.regleMasquer()
    this.crayonMasquer()

    return [A, B, C]
  }
  /**
   * Macro de construction d'un triangle à partir d'une longueur et des 2 angles adajcents au côté connu. Le premier point aura pour coordonnées (2,0).
   * @param {string} ABC Une chaine de caractère de 3 lettre
   * @param {*} AB Distance entre le 1er et le 2e sommet
   * @param {*} BAC Angle au 1er sommet
   * @param {*} CBA Angle au 2e sommet
   * @param {boolean} description Affichage d'un texte descriptif des étapes de la construction
   * @return {array} [A, B, C] les 3 sommets du triangle (objets MathALEA2D)
   */
  this.triangle1longueur2angles = function (NOM, AB, BAC, CBA, description = true, mesure = false) {
    const angle = randint(-20, 20)
    const a1 = BAC
    const a2 = CBA
    const A = point(6, 0)
    const B = pointAdistance(A, AB, angle)
    const D = pointAdistance(A, 5.2, a1 + angle)
    console.log(a1 + angle)
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
    } else {
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
    if (description && mesure) this.textePosition(`On peut mesurer ${A.nom + C.nom} ≈ ${nombreAvecEspace(longueur(A, C, 1))} cm et ${B.nom + C.nom} ≈ ${nombreAvecEspace(longueur(B, C, 1))} cm.`, 0, -7)

    return [A, B, C]
  }
  /**
   * Trace un triangle équilatéral à partir de la donnée de 2 points
   * @param {point} A
   * @param {point} B
   * @param {string} nomC
   * @return {array} [A, B, C]
   */
  this.triangleEquilateral2Sommets = function (A, B, nomC = '') {
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
    return [A, B, C]
  }
  /**
   * Trace un triangle équilatéral à partir de la donnée de la longueur du côté
   * @param {string} NOM
   * @param {number} AB
   * @return {array} [A, B, C]
   */

  this.triangleEquilateral = function (NOM, AB) {
    const A = point(6, 0)
    const B = pointAdistance(A, AB, randint(-20, 20))
    const C = rotation(B, A, 60)
    if (NOM.length === 3) {
      A.nom = NOM[0]
      B.nom = NOM[1]
      C.nom = NOM[2]
    }
    this.regleSegment(A, B)
    this.pointCreer(A)
    this.pointCreer(B)
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
    return [A, B, C]
  }

  /**
 ************************************************
 ************** PARALLELOGRAMMES ****************
 ************************************************
 */

  /**
   * Trace un parallélogramme à partir de la donnée de 3 sommets consécutifs
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {string} nomD
   * @param {boolean} description
   * @param {boolean} cotesDejaTraces À true (par défaut), les 2 côtés seront faits immédiatement, sinon, on les tracera à la règle.
   */
  this.parallelogramme3sommetsConsecutifs = function (A, B, C, nomD = '', description = true, cotesDejaTraces = true) {
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
  /**
   * Trace le parallélogramme ABCD de centre O à partir de [AB] et O.
   * @param {point} A
   * @param {point} B
   * @param {point} O
   * @param {string} nomC
   * @param {string} nomD
   * @param {boolean} description
   */
  this.parallelogramme2sommetsConsecutifsCentre = function (A, B, O, nomC = '', nomD = '', description = true) {
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
  /**
   * Trace la parallélogramme ABCD de centre O en partant de [AD), [AB) et O (mais sans voir la position de B et D au départ)
   * @param {point} D
   * @param {point} A
   * @param {point} B
   * @param {point} O
   */
  this.parallelogrammeAngleCentre = function (D, A, B, O) {
    const B1 = pointSurSegment(A, B, longueur(A, B) + 2)
    const D1 = pointSurSegment(A, D, longueur(A, D) + 2)
    const C = translation2Points(B, A, D)
    this.traitRapide(A, B1)
    this.traitRapide(A, D1)
    this.pointCreer(O, { tempo: 0 })
    this.pointCreer(A, { tempo: 0 })
    this.regleDemiDroiteOriginePoint(A, O, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1, pointilles: true })
    this.pointilles = false
    this.regleMasquer()
    this.crayonMasquer()
    this.compasEcarter2Points(A, O)
    this.compasTracerArcCentrePoint(O, C, { couleur: this.couleurTraitsDeConstruction })
    this.compasMasquer()
    this.paralleleRegleEquerre2points3epoint(B1, A, C, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
    this.equerreMasquer()
    this.regleDroite(C, D, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
    this.paralleleRegleEquerre2points3epoint(A, D1, C, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
    this.equerreMasquer()
    this.regleDroite(C, B, { couleur: this.couleurTraitsDeConstruction, epaisseur: 1 })
    this.pointCreer(D, { tempo: 0 })
    this.pointCreer(B, { tempo: 0 })
    this.pointCreer(C, { tempo: 0 })
    this.regleSegment(B, C)
    this.regleSegment(C, D)
    this.regleMasquer()
    this.crayonMasquer()
  }
}
