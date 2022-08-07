import iepLoadPromise from 'instrumenpoche'
import { angleOriente, droite, homothetie, longueur, milieu, norme, point, pointAdistance, pointSurSegment, rotation, segment, translation, translation2Points, vecteur } from './2d.js'
import { context } from './context.js'
import { bissectriceAuCompas, cercleCirconscrit, hauteur, mediane, mediatriceAuCompas, mediatriceRegleEquerre } from './iepMacros/droitesRemarquables.js'
import { paralleleAuCompas, paralleleAuCompasAvecDescription, paralleleRegleEquerre2points3epoint, paralleleRegleEquerreDroitePointAvecDescription, perpendiculaireCompasPoint, perpendiculaireCompasPointSurLaDroite, perpendiculaireRegleEquerre2points3epoint, perpendiculaireRegleEquerreDroitePoint, perpendiculaireRegleEquerrePointSurLaDroite } from './iepMacros/parallelesEtPerpendiculaires.js'
import { parallelogramme2sommetsConsecutifsCentre, parallelogramme3sommetsConsecutifs, parallelogrammeAngleCentre, partageSegment } from './iepMacros/parallelogrammes.js'
import { carre1point1longueur } from './iepMacros/quadrilateres.js'
import { demiTourPoint, demiTourPolygone, homothetiePoint, homothetiePolygone, rotationPoint, rotationPolygone, symetrieAxialePoint, symetrieAxialePolygone, translationPoint, translationPolygone } from './iepMacros/transformations.js'
import { triangle1longueur2angles, triangle2longueurs1angle, triangle3longueurs, triangleEquilateral, triangleEquilateral2Sommets, triangleRectangle2Cotes, triangleRectangleCoteHypotenuse } from './iepMacros/triangles.js'

/*
 * Classe parente de tous les objets Alea2iep
 *
 * @author Rémi Angot
 */
export default class Alea2iep {
  constructor () {
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

    // Garde en mémoire les coordonnées extrêmes des objets créés
    this.xMin = 0
    this.yMin = 0
    this.xMax = 0
    this.yMax = 0

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
      rayon: 5.2,
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
  }
  /** **** Fin du constructeur */

  // Transforme les coordonnées MathALEA2D en coordonnées pour le XML d'IEP
  x (A) {
    const x = Math.round((A.x + this.translationX) * 30)
    if (A.x > this.xMax) {
      this.xMax = A.x
    }
    if (A.x < this.xMin) {
      this.xMin = A.x
    }
    return x
  }

  y (A) {
    const y = Math.round((-A.y + this.translationY) * 30)
    if (A.y < this.yMin) {
      this.yMin = A.y
    }
    if (A.y > this.yMax) {
      this.yMax = A.y
    }
    return y
  }

  /**
   * Renvoie le script xml
   *
   */
  script () {
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
  html (id1, id2) {
    if (context.isHtml) {
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
  htmlBouton (id1, id2 = '') {
    if (context.isHtml) {
      const id = `IEP_${id1}_${id2}`
      window.listeScriptsIep[id] = this.script() // On ajoute le script
      const codeHTML = `<br><button class="ui mini compact button" id="btnAnimation${id}" onclick="toggleVisibilityIEP('${id}')" style="margin-top:20px"><i class="large play circle outline icon"></i>Voir animation</button>
            <div id="IEPContainer${id}" style="display: none;" ></div>`
      if (!window.toggleVisibilityIEP) {
        window.toggleVisibilityIEP = function (id) {
          const element = document.getElementById(`IEPContainer${id}`)
          const elementBtn = document.getElementById(`btnAnimation${id}`)
          const xml = window.listeScriptsIep[id]
          if (element.style.display === 'none') {
            element.style.display = 'block'
            element.style.marginTop = '30px'
            // On ajoute une regle css max-width pour éviter le débordement
            element.style.maxWidth = '95%'
            elementBtn.innerHTML = '<i class="large stop circle outline icon"></i>Masquer animation'
            iepLoadPromise(element, xml, { zoom: true, autostart: true }).then(iepApp => {
              // la figure est chargée
              // On surcharge la propriété CSS min-width après que la promesse ait été satisfaite sinon ça marche pas !
              element.style.minWidth = '90%'
            }).catch(error => { console.log(error) })
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
 * @param {int} xmin
 * @param {int} ymax
 */
  recadre (xmin, ymax) {
    this.translationX = 1 - xmin
    this.translationY = ymax + 3
  }

  /**
   *
   * @param {int} width
   * @param {int} height
   */
  taille (width, height) {
    this.liste_script.push(`<viewBox width="${width}" height="${height}" />`)
  }

  /**
   *
   * @param {string} objet - 'regle', 'equerre', 'requerre, 'compas', 'rapporteur' ou 'crayon'
   * @param {point} A - Point (0, 0) par défaut
   * @param {objet} options - { tempo : 10 }
   */
  montrer (objet, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    if (!this[objet].visibilite || this[objet].position !== A) { // On ajoute une ligne xml que si l'objet est caché ou doit apparaitre à un autre endroit
      let codeXML = ''
      let A1
      if (typeof A === 'undefined') { // A1 est une copie de A ou (0,0) si A n'est pas défini
        A1 = this[objet].position
      } else {
        A1 = A
      }
      if (this[objet].visibilite) { // S'il est déjà visible, montrer devient un déplacer
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
  regleMontrer (A, options) {
    this.montrer('regle', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  crayonMontrer (A, options) {
    this.montrer('crayon', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  equerreMontrer (A, options) {
    this.montrer('equerre', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  requerreMontrer (A, options) {
    this.montrer('requerre', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  compasMontrer (A, options) {
    this.montrer('compas', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  rapporteurMontrer (A, options) {
    this.montrer('rapporteur', A, options)
  }

  /**
   *
   * @param {string} objet - 'regle', 'equerre', 'requerre, 'compas', 'rapporteur' ou 'crayon'
   * @param {objet} param1
   */
  masquer (objet, { tempo = this.tempo } = {}) {
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
  regleMasquer (options) {
    this.masquer('regle', options)
  }

  /**
   *
   * @param {objet} options
   */
  crayonMasquer (options) {
    this.masquer('crayon', options)
  }

  /**
   *
   * @param {objet} options
   */
  equerreMasquer (options) {
    this.masquer('equerre', options)
  }

  /**
   *
   * @param {objet} options
   */
  requerreMasquer (options) {
    this.masquer('requerre', options)
  }

  /**
   *
   * @param {objet} options
   */
  compasMasquer (options) {
    this.masquer('compas', options)
  }

  /**
   *
   * @param {objet} options
   */
  rapporteurMasquer (options) {
    this.masquer('rapporteur', options)
  }

  /**
 *
 * @param {string} objet - 'regle', 'equerre', 'requerre, 'compas', 'rapporteur' ou 'crayon'
 * @param {point} A
 * @param {objet} options
 */
  deplacer (objet, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
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
  regleDeplacer (A, options) {
    this.deplacer('regle', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  texteDeplacer (id, A, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    const codeXML = `<action objet="texte" id="${id}" mouvement="translation" abscisse="${this.x(A)}" ordonnee="${this.y(A)}" tempo="${tempo}" vitesse="${vitesse}" />`
    this.liste_script.push(codeXML)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  crayonDeplacer (A, options) {
    this.deplacer('crayon', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  equerreDeplacer (A, options) {
    this.deplacer('equerre', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  requerreDeplacer (A, options) {
    this.deplacer('requerre', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  compasDeplacer (A, options) {
    this.deplacer('compas', A, options)
  }

  /**
   *
   * @param {point} A
   * @param {objet} options
   */
  rapporteurDeplacer (A, options) {
    this.deplacer('rapporteur', A, options)
  }

  /**
 *
 * @param {string} objet - 'regle', 'equerre', 'requerre, 'compas', 'rapporteur' ou 'crayon'
 * @param {int} angle
 * @param {objet} options
 */
  rotation (objet, a, { tempo = this.tempo, sens = Math.round(this.vitesse / 2) } = {}) {
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
        console.log('Angle de rotation non défini pour l\'objet .', objet)
      }
    }
  }

  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  regleRotation (angle, options) {
    this.rotation('regle', angle, options)
  }

  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  crayonRotation (angle, options) {
    this.rotation('crayon', angle, options)
  }

  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  equerreRotation (angle, options) {
    this.rotation('equerre', angle, options)
  }

  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  requerreRotation (angle, options) {
    this.rotation('requerre', angle, options)
  }

  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  compasRotation (angle, options) {
    this.rotation('compas', angle, options)
  }

  /**
 *
 * @param {int} angle
 * @param {objet} options
 */
  rapporteurRotation (angle, options) {
    this.rotation('rapporteur', angle, options)
  }

  /**
 * @param {string} objet - 'regle', 'equerre', 'requerre, 'compas' ou 'rapporteur'
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  zoom (objet, echelle, { tempo = 0 } = {}) {
    this[objet].zoom = echelle
    this.liste_script.push(`<action echelle="${echelle}" mouvement="zoom" objet="${objet}" tempo="${tempo}" />`)
  }

  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  regleZoom (echelle, options) {
    this.zoom('regle', echelle, options)
    this.regle.longueur = this.regle.longueur * echelle / 100
  }

  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  equerreZoom (echelle, options) {
    this.zoom('equerre', echelle, options)
  }

  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  requerreZoom (echelle, options) {
    this.zoom('requerre', echelle, options)
  }

  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  rapporteurZoom (echelle, options) {
    this.zoom('rapporteur', echelle, options)
  }

  /**
 *
 * @param {int} pourcentage 200 pour doubler la taille
 * @param {objet} options tempo = 0 par défaut
 */
  compasZoom (echelle, options) {
    this.zoom('compas', echelle, options)
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
  pointCreer (A, { dx = 0.1, dy, label = A.nom, tempo = this.tempo, couleur = this.couleurPoint, couleurLabel = this.couleurTexte, id } = {}) {
    if (typeof id !== 'undefined') {
      A.id = id
    } else {
      this.idIEP++
      A.id = this.idIEP
    }
    let codeXML
    if (label) {
      codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" couleur="${couleur}" id="${A.id}" mouvement="creer" objet="point" tempo="${tempo}"/>`
      // codeXML += `\n<action couleur="${couleurLabel}" nom="${label}" id="${this.idIEP}" mouvement="nommer" objet="point" tempo="${tempo}"  />`
      const M = point(A.x, A.y)
      if (typeof dx !== 'undefined') {
        M.x += dx
      }
      if (typeof dy !== 'undefined') {
        M.y += dy
      }
      this.textePoint(`$${label}$`, M, { tempo: 0, couleur: couleurLabel })
    } else {
      codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" couleur="${couleur}" id="${A.id}" mouvement="creer" objet="point" tempo="${tempo}" />`
    }
    this.liste_script.push(codeXML)
  }

  /**
 * Création de plusieurs points
 * Le dernier argument peut être une option qui sera appliquée à tous les points
 *
 * @param  {...points} points Points séparés par des virgules
 */
  pointsCreer (...args) {
    if (args[args.length - 1].typeObjet === 'point') {
      for (const point of args) {
        this.pointCreer(point, { tempo: 0 })
      }
    } else {
      const options = args[args.length - 1]
      const enleveDernier = arr => arr.slice(0, -1)
      for (const point of enleveDernier(args)) {
        this.pointCreer(point, options)
      }
    }
  }

  /**
 * Masquer un point
 * @param {point} A
 * @param {objet} options Défaut : { tempo: 0 }
 */
  pointMasquer (...args) {
    const enleveDernier = arr => arr.slice(0, -1)
    if (args[args.length - 1].typeObjet === 'point') {
      for (const point of args) {
        this.liste_script.push(`<action id="${point.id}" mouvement="masquer" objet="point" tempo="0" />`)
      }
    } else {
      if (args[args.length - 1].tempo !== undefined) {
        const tempo = args[args.length - 1].tempo
        for (const point of enleveDernier(args)) {
          this.liste_script.push(`<action id="${point.id}" mouvement="masquer" objet="point" tempo="${tempo}" />`)
        }
      } else {
        for (const point of enleveDernier(args)) {
          this.liste_script.push(`<action id="${point.id}" mouvement="masquer" objet="point" tempo="0" />`)
        }
      }
    }
  }

  /**
   * Montrer un point qui aurait été caché
   * @param {point} A
   * @param {objet} options Défaut ; { tempo : this.tempo }
   */
  pointMontrer (A, { tempo = this.tempo } = {}) {
    this.liste_script.push(`<action id="${A.id}" mouvement="montrer" objet="point" tempo="${tempo}" />`)
  }

  /**
   * Anime la translation d'un point
   * @param {point} A
   * @param {int} x Abscisse du point d'arrivée
   * @param {int} y Ordonnée du point d'arrivée
   * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse }
   */
  pointDeplacer (A, x, y, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    const B = point(x, y)
    this.liste_script.push(`<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" id="${A.id}" mouvement="translation" objet="point" tempo="${tempo}" vitesse="${vitesse}" />`)
  }

  /**
   * Ajoute un label au point
   * @param {point} A
   * @param {string} nom
   * @param {objet} options dx pour le déplacement vertical du nom du point, dy pour le déplacemetn horizontal, couleur: this.couleurPoint, tempo: this.tempo
   */
  pointNommer (A, nom, { dx, dy, couleur = this.couleurPoint, tempo = this.tempo } = {}) {
    // const coordonneesTexte = ''
    const M = point(A.x, A.y)
    if (typeof dx !== 'undefined') {
      M.x += dx
    }
    if (typeof dy !== 'undefined') {
      M.y += dy
    }
    this.textePoint(`$${nom}$`, M, { tempo: tempo, couleur: couleur })
    // this.liste_script.push(`<action couleur="${couleur}" nom="${nom}" id="${A.id}" mouvement="nommer" objet="point" tempo="${tempo}" ${coordonneesTexte} />`)
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
  compasRetourner ({ tempo = this.tempo } = {}) {
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
  compasEcarter (l, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
    const codeXML = `<action ecart="${l * 30}" mouvement="ecarter" objet="compas" tempo="${tempo}" vitesse="${vitesse}" />`
    this.compas.ecartement = l
    this.liste_script.push(codeXML)
  }

  /**
* Fais apparaitre la règle à l'horizontale, met le compas vertical et écarte le compas le long de la règle pour lire son écartement
* @param {int} longueur
* @param {*} options Défaut : { tempo: this.tempo, vitesse: this.vitesse, sens : this.vitesse / 2 }
*/
  compasEcarterAvecRegle (l, { tempo = this.tempo, vitesse = this.vitesse, sens = this.vitesse / 2 } = {}) {
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
  compasEcarter2Points (A, B, { tempo = this.tempo, vitesse = this.vitesse, sens = this.vitesse / 2 } = {}) {
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
  compasLever ({ tempo = this.tempo } = {}) {
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
  compasCoucher ({ tempo = this.tempo } = {}) {
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
  compasTracerArc2Angles (angle1, angle2, { tempo = this.tempo, sens = Math.round(this.vitesse / 2), epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = this.pointilles } = {}) {
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
  compasTracerArcCentrePoint (centre, point, { delta = 10, tempo = this.tempo, vitesse = this.vitesse, sens = Math.round(this.vitesse / 2), epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = this.pointilles } = {}) {
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
  compasCercleCentrePoint (centre, point, { tempo = this.tempo, couleur = this.couleur, vitesse = this.vitesse, sens = Math.round(this.vitesse / 2), epaisseur = this.epaisseur, pointilles = this.pointilles } = {}) {
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
  requerreGlisserEquerre (a, { tempo = this.tempo, vitesse = this.vitesse } = {}) {
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
   * Montre ou masque les graduations du rapporteur
   * @param {point} A
   * @param {string} nom
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  // rapporteurGraduations ()

  /**
   * Masque la graduation externe du rapporteur (laisse l'autre graduation visible)
   * @param {objet} options Défaut : { tempo: this.tempo }
   */

  rapporteurMasquerGraduationsExterieures ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="masquer_nombres" objet="rapporteur" tempo="${tempo}"/>`)
  }

  /**
   * Montre la graduation extérieure si elle avait été précédemment cachée
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  rapporteurMontrerGraduationsExterieures ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="montrer_nombres" objet="rapporteur" tempo="${tempo}"/>`)
  }

  /**
   * Masque la graduation interne du rapporteur (laisse l'autre graduation visible)
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  rapporteurMasquerGraduationsInterieures ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="vide" objet="rapporteur" tempo="${tempo}"/>`)
  }

  /**
   * Montre la graduation interne si elle avait été précédemment cachée
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  rapporteurMontrerGraduationsInterieures ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="graduations" objet="rapporteur" tempo="${tempo}"/>`)
  }

  /**
 * Met le rapporteur en position avec le centre en A et le 0 de droite alogné avec le point B
 * @param {point} A
 * @param {point} B
 * @param {objet} options Défaut : { tempo: this.tempo, vitesse: this.vitesse, sens : this.vitesse / 2 }
 */
  rapporteurDeplacerRotation2Points (A, B, { tempo = this.tempo, vitesse = this.vitesse, sens = Math.round(this.vitesse / 2) } = {}) {
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
  rapporteurCrayonMarqueAngle (angle, { tempo = this.tempo, vitesse = this.vitesse, couleur = this.couleurTraitsDeConstruction, epaisseur = this.epaisseurTraitsDeConstruction } = {}) {
    const O = this.rapporteur.position
    const distanceBord = this.rapporteur.rayon * this.rapporteur.zoom / 100
    const M = pointAdistance(O, distanceBord, angle + this.rapporteur.angle)
    const N = pointAdistance(O, distanceBord + 0.3, angle + this.rapporteur.angle)
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
  rapporteurTracerDemiDroiteAngle (A, B, angle, { longueur = 0.9 * this.regle.longueur, couleur = this.couleur, tempo = this.tempo, vitesse = this.vitesse, sens = Math.round(this.vitesse / 2), epaisseur = this.epaisseur, pointilles = this.pointilles } = {}) {
    if (angle > 0) {
      this.rapporteurDeplacerRotation2Points(A, B, { tempo: tempo, vitesse: vitesse, sens: sens })
      this.rapporteurCrayonMarqueAngle(angle, { tempo: tempo, vitesse: vitesse, sens: sens })
    } else {
      const B2 = rotation(B, A, 180)
      this.rapporteurDeplacerRotation2Points(A, B2, { tempo: tempo, vitesse: vitesse, sens: sens })
      this.rapporteurCrayonMarqueAngle(180 - Math.abs(angle), { tempo: tempo, vitesse: vitesse, sens: sens })
    }
    const d = droite(A, B)
    d.isVisible = false
    const M = pointAdistance(A, this.rapporteur.rayon * this.rapporteur.zoom / 100, d.angleAvecHorizontale + angle)
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
  regleMasquerGraduations ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="vide" objet="regle" tempo="${tempo}"/>`)
  }

  /**
 * Montrer les graduations sur la règle si elles avaient été masquées
 * @param {objet} options Défaut : { tempo: this.tempo }
 */
  regleMontrerGraduations ({ tempo = this.tempo } = {}) {
    this.liste_script.push(`<action mouvement="graduations" objet="regle" tempo="${tempo}"/>`)
  }

  /**
   * Modifie la taille de la règle
   * @param {int} longueur
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  regleModifierLongueur (longueur = 20, { tempo = this.tempo } = {}) {
    this.regle.longueur = longueur
    this.liste_script.push(`<action mouvement="modifier_longueur" objet="regle" longueur="${longueur}" tempo="${tempo}"/>`)
  }

  /**
 * Trace une demi-droite d'origine O passant par A (ou en direction de A si les points sont trop éloignés)
 * @param {point} O Origine
 * @param {point} A Direction
 * @param {objet} options Défaut {longueur: this.regle.longueur, tempo : this.tempo, vitesse: this.vitesse, sens: this.vitesse / 2}
 */
  regleDemiDroiteOriginePoint (O, A, options = {}) {
    if (!options.longueur) {
      options.longueur = this.regle.longueur
    }
    const M = pointSurSegment(O, A, options.longueur)
    this.regleSegment(O, M, options)
  }

  /**
   * Trace une droite passanrt par les points A et B
   * @param {point} A
   * @param {point} B
   * @param {objet} options Défaut {longueur: this.regle.longueur, tempo : this.tempo, vitesse: this.vitesse, sens: this.vitesse / 2}
   */
  regleDroite (A, B, options = {}) {
    if (!options.longueur) {
      options.longueur = this.regle.longueur
    }
    const M = homothetie(B, A, (-options.longueur * 0.5 + longueur(A, B) * 0.5) / longueur(A, B))
    const N = homothetie(A, B, (-options.longueur * 0.5 + longueur(A, B) * 0.5) / longueur(A, B))
    if (this.x(A) <= this.x(B)) {
      this.regleMontrer(M)
      this.regleRotation(N, options)
      this.regleSegment(M, N, options)
    } else {
      this.regleMontrer(N)
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
  regleProlongerSegment (A, B, options = {}) {
    if (!options.longueur) {
      options.longueur = this.regle.longueur - 3
    }
    if (options.longueur > 0) {
      const B1 = pointSurSegment(B, A, 3)
      const B2 = pointSurSegment(B, A, -options.longueur)
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
  tracer (B, { tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = this.pointilles, vecteur = false } = {}) {
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
  trait (A, B, options = {}) {
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
  traitRapide (A, B, options = {}) {
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
  traitMasquer (id, { tempo = 0, vitesse = 200 } = {}) {
    this.liste_script.push(`<action mouvement="masquer" objet="trait" id="${id}" vitesse="${vitesse}" />`)
  }

  /**
   *
   * @param {segment/point} Segment à tracer ou première extrémité
   * @param {objet/point} options ou deuxième extrémité
   * @param {objet} options si les deux premiers arguments étaient des points
   * @returns {id} identifiant utilisé pour le trait
   */
  regleSegment (arg1, arg2, arg3) {
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
    if (A.x <= B.x) { // Toujours avoir la règle de gauche à droite
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
  polygoneTracer (...sommets) {
    for (let i = 0; i < sommets.length - 1; i++) {
      this.regleSegment(sommets[i], sommets[i + 1])
    }
    this.regleSegment(sommets[sommets.length - 1], sommets[0])
  }

  /**
   * Trace un polygone avec traitRapide()
   * @param  {...points} sommets du polygonne séparés par des virgules
   */
  polygoneRapide (...sommets) {
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
  textePoint (texte, A, { tempo = this.tempo, police = false, couleur = this.couleurTexte, taille, couleurFond, opaciteFond, couleurCadre, epaisseurCadre, marge, margeGauche, margeDroite, margeHaut, margeBas } = {}) {
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
  textePosition (texte, x, y, options) {
    const A = point(x, y)
    return this.textePoint(texte, A, options)
  }

  longueurSegment (A, B, dy, options) {
    const l = longueur(A, B)
    const v = vecteur(A, B)
    const w = vecteur(-v.y * dy / norme(v), v.x * dy / norme(v))
    const ancrage = translation(translation(pointSurSegment(A, B, l / 2 - 0.7), w), vecteur(0, 1))
    return this.textePoint(`${l} cm`, ancrage, options)
  }

  mesureAngle (A, O, B) {
    const a = angleOriente(A, O, B)
    const C = translation(homothetie(rotation(A, O, a / 2), O, 1.3 / longueur(O, A)), vecteur(-0.2, 0.5))
    return this.textePoint(Math.abs(a) + '°', C)
  }

  /**
 * Masque le trait d'id fourni
 * @param {array} id
 * @param {objet} options Défaut : { tempo: 0 }
 */
  texteMasquer (...args) {
    const enleveDernier = arr => arr.slice(0, -1)
    if (Number.isNaN(args[args.length - 1])) {
      if (args[args.length - 1].tempo !== undefined) {
        const tempo = args[args.length - 1].tempo
        for (const texte of enleveDernier(args)) {
          this.liste_script.push(`<action mouvement="masquer" objet="texte" id="${texte}" tempo="${tempo}" />`)
        }
      } else {
        for (const texte of enleveDernier(args)) {
          this.liste_script.push(`<action mouvement="masquer" objet="texte" id="${texte}" tempo="0" />`)
        }
      }
    } else {
      for (const texte of args) {
        this.liste_script.push(`<action mouvement="masquer" objet="texte" id="${texte}" tempo="0" />`)
      }
    }
  }

  /**
   * Change la couleur d'un texte déjà créé dont on donne l'id retourné par this.textePoint ou this.textePosition
   * Nécessité de redonner le texte car on réécrit le texte dans une autre couleur.
   * @param {string} texte
   * @param {number} id
   * @param {string} couleur
   */
  texteChangeCouleur (texte, id, couleur) {
    this.liste_script.push(`\n<action couleur="${couleur}" texte="${texte}" id="${id}" mouvement="ecrire" objet="texte" />`)
  }

  /**
   * Met l'animation en pause forçant l'utilisateur à appuyer sur lecture pour voir la suite
   */
  pause () {
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
  segmentCodage (arg1, arg2 = {}, arg3 = {}) {
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
  segmentCodageMasquer (id, { tempo = this.tempo } = {}) {
    this.liste_script.push(`<action id="${id}" mouvement="masquer" objet="longueur" tempo="${tempo}" />`)
  }

  /**
   *
   * @param {int} id Identifiant du codage
   * @param {objet} options Défaut : { tempo: this.tempo }
   */
  segmentCodageMontrer (id, { tempo = this.tempo } = {}) {
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
  codageAngleDroit (A, B, C, options = {}) {
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
  codageAngleDroitMasquer (id, { tempo = 0 } = {}) {
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
  angleCodage (B, A, C, { couleur = this.couleurCodage, codage = 'plein', rayon = 1, tempo = this.tempo } = {}) {
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
  angleCodageMasquer (B, A, C, { tempo = 0 } = {}) {
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
  angleCodageMontrer (B, A, C, { tempo = 0 } = {}) {
    const id = B.id + '_' + A.id + '_' + C.id
    this.liste_script.push(`<action id="${id}" mouvement="montrer" objet="angle" tempo="${tempo}" />`)
  }

  /**
   * Affiche une image (donnée par son URL) au point A
   * @param {string} url
   * @returns {id}
   */
  image (url, A = point(0, 0)) {
    this.idIEP++
    let codeXML
    codeXML = `<action id="${this.idIEP}" url="${url}" mouvement="chargement" objet="image" />`
    codeXML += `\n<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" id="${this.idIEP}" mouvement="translation" objet="image" vitesse="100000" />`
    this.liste_script.push(codeXML)
    return this.idIEP
  }
}

Alea2iep.prototype.symetrieAxialePoint = symetrieAxialePoint
Alea2iep.prototype.parallelogramme3sommetsConsecutifs = parallelogramme3sommetsConsecutifs
Alea2iep.prototype.parallelogramme2sommetsConsecutifsCentre = parallelogramme2sommetsConsecutifsCentre
Alea2iep.prototype.parallelogrammeAngleCentre = parallelogrammeAngleCentre
Alea2iep.prototype.partageSegment = partageSegment
Alea2iep.prototype.paralleleRegleEquerre2points3epoint = paralleleRegleEquerre2points3epoint
Alea2iep.prototype.paralleleRegleEquerre2points3epoint = paralleleRegleEquerre2points3epoint
Alea2iep.prototype.perpendiculaireRegleEquerre2points3epoint = perpendiculaireRegleEquerre2points3epoint
Alea2iep.prototype.perpendiculaireRegleEquerreDroitePoint = perpendiculaireRegleEquerreDroitePoint
Alea2iep.prototype.perpendiculaireRegleEquerrePointSurLaDroite = perpendiculaireRegleEquerrePointSurLaDroite
Alea2iep.prototype.perpendiculaireCompasPointSurLaDroite = perpendiculaireCompasPointSurLaDroite
Alea2iep.prototype.perpendiculaireCompasPoint = perpendiculaireCompasPoint
Alea2iep.prototype.paralleleRegleEquerreDroitePointAvecDescription = paralleleRegleEquerreDroitePointAvecDescription
Alea2iep.prototype.paralleleAuCompasAvecDescription = paralleleAuCompasAvecDescription
Alea2iep.prototype.paralleleAuCompas = paralleleAuCompas
Alea2iep.prototype.mediatriceAuCompas = mediatriceAuCompas
Alea2iep.prototype.mediatriceRegleEquerre = mediatriceRegleEquerre
Alea2iep.prototype.hauteur = hauteur
Alea2iep.prototype.mediane = mediane
Alea2iep.prototype.bissectriceAuCompas = bissectriceAuCompas
Alea2iep.prototype.cercleCirconscrit = cercleCirconscrit
Alea2iep.prototype.triangle3longueurs = triangle3longueurs
Alea2iep.prototype.triangleRectangleCoteHypotenuse = triangleRectangleCoteHypotenuse
Alea2iep.prototype.triangleRectangle2Cotes = triangleRectangle2Cotes
Alea2iep.prototype.triangle1longueur2angles = triangle1longueur2angles
Alea2iep.prototype.triangle2longueurs1angle = triangle2longueurs1angle
Alea2iep.prototype.triangleEquilateral2Sommets = triangleEquilateral2Sommets
Alea2iep.prototype.triangleEquilateral = triangleEquilateral
Alea2iep.prototype.carre1point1longueur = carre1point1longueur
Alea2iep.prototype.rotationPoint = rotationPoint
Alea2iep.prototype.translationPoint = translationPoint
Alea2iep.prototype.demiTourPoint = demiTourPoint
Alea2iep.prototype.homothetiePoint = homothetiePoint
Alea2iep.prototype.rotationPolygone = rotationPolygone
Alea2iep.prototype.symetrieAxialePolygone = symetrieAxialePolygone
Alea2iep.prototype.translationPolygone = translationPolygone
Alea2iep.prototype.demiTourPolygone = demiTourPolygone
Alea2iep.prototype.homothetiePolygone = homothetiePolygone
