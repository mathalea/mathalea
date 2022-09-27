import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, egal, randint, choice, shuffle, nombreAvecEspace, texcolors } from '../../modules/outils.js'
import { tracePoint, labelPoint, codageMilieu, segment, rotation, texteParPosition, pavage } from '../../modules/2d.js'
import { rotationAnimee } from '../../modules/2dAnimation.js'

export const titre = 'Trouver l\'image d\'une figure par symétrie centrale dans un pavage'

/**
 * Publié le 14/12/2020
 * Trouver l'image par symétrie centrale d'une figure dans un pavage
 * Version Latex & Html grâce à Mathalea2d
 * @author Jean-Claude Lhote
 * Ref 5G12
 */
export const uuid = '76ea9'
export const ref = '5G12'
export default function PavageEtDemiTour2D () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1 // 1 pour des pavages modestes, 2 pour des plus grand.
  this.sup2 = false // On cache les barycentres par défaut.
  this.sup3 = 7
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.sup3 = Number(this.sup3)
    const videcouples = function (tableau) {
      for (let k = 0; k < tableau.length; k++) {
        for (let j = k + 1; j < tableau.length; j++) {
          if (tableau[k][1] === tableau[j][0]) {
            tableau.splice(j, 1)
          }
        }
      }
      return tableau
    }
    const compare2polys = function (poly1, poly2) {
      if (comparenbsommets(poly1, poly2)) {
        if (comparesommets(poly1, poly2)) { return true } else { return false }
      } else { return false }
    }
    const comparenbsommets = function (poly1, poly2) {
      if (poly1.listePoints.length === poly2.listePoints.length) {
        return true
      } else return false
    }

    const compare2sommets = function (sommet1, sommet2) {
      if (egal(sommet1.x, sommet2.x, 0.1) && egal(sommet1.y, sommet2.y, 0.1)) {
        return true
      } else return false
    }
    const comparesommets = function (poly1, poly2) {
      let trouve = false; let trouves = 0
      if (comparenbsommets(poly1, poly2)) {
        for (const P of poly1.listePoints) {
          for (const M of poly2.listePoints) {
            if (compare2sommets(M, P)) {
              trouve = true
            }
            if (trouve) break
          }
          if (trouve) {
            trouves++
            trouve = false
          } else {
            trouves -= 100
          }
          if (trouves < 0) { break }
        }
      }
      if (trouves === poly1.listePoints.length) { return true } else return false
    }

    const demitour = function (pavage, A, numero) { // retourne le numero du polygone symétrique ou -1 si il n'existe pas
      const poly = pavage.polygones[numero - 1]
      let pol
      const result = -1
      const sympoly = rotation(poly, A, 180)
      for (let k = 0; k < pavage.polygones.length; k++) {
        pol = pavage.polygones[k]
        if (compare2polys(sympoly, pol)) {
          return k + 1
        }
      }
      return result
    }

    const objets = []; const objetsCorrection = []; let P1; let P2; let P3; let G1; let G2; let t
    const codes = ['/', '//', '///', 'o', 'w', 'X', 'U', '*']
    let taillePavage = this.sup
    if (taillePavage < 1 || taillePavage > 2) {
      taillePavage = 1
    }
    if (this.nbQuestions > 5) {
      taillePavage = 2
    }
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    let Nx; let Ny; let index1; let A; let B; let d; let image; let couples = []; let tailles = []; let monpavage; let fenetre
    let texte = ''; let texteCorr = ''; let typeDePavage = this.sup
    let nombreTentatives; let nombrePavageTestes = 1
    if (this.sup3 === 8) {
      typeDePavage = randint(1, 7)
    } else {
      typeDePavage = this.sup3
    }
    while (couples.length < this.nbQuestions && nombrePavageTestes < 6) {
      nombreTentatives = 0
      monpavage = pavage() // On crée l'objet Pavage qui va s'appeler monpavage
      tailles = [[[3, 2], [3, 2], [2, 2], [2, 2], [2, 2], [2, 2], [3, 2]], [[4, 3], [4, 3], [3, 3], [3, 3], [3, 3], [3, 2], [5, 3]]]
      Nx = tailles[taillePavage - 1][typeDePavage - 1][0]
      Ny = tailles[taillePavage - 1][typeDePavage - 1][1]
      monpavage.construit(typeDePavage, Nx, Ny, 3) // On initialise toutes les propriétés de l'objet.
      fenetre = monpavage.fenetre
      context.fenetreMathalea2d = [fenetre.xmin, fenetre.ymin, fenetre.xmax, fenetre.ymax]
      while (couples.length < this.nbQuestions + 2 && nombreTentatives < 3) { // On cherche d pour avoir suffisamment de couples
        couples = [] // On vide la liste des couples pour une nouvelle recherche

        index1 = randint(Math.floor(monpavage.nb_polygones / 3), Math.ceil(monpavage.nb_polygones * 2 / 3)) // On choisit 1 point dans un des polygones
        if (choice([true, false])) {
          A = monpavage.polygones[index1].listePoints[randint(0, monpavage.polygones[index1].listePoints.length - 1)] // On choisit un sommet
        } else {
          A = monpavage.barycentres[index1] // Ou on choisit un barycentre
        }
        while (A.x - 5 < fenetre.xmin || A.x + 5 > fenetre.xmax || A.y - 5 < fenetre.ymin || A.y + 5 > fenetre.ymax) {
          index1 = randint(Math.floor(monpavage.nb_polygones / 3), Math.ceil(monpavage.nb_polygones * 2 / 3)) // On choisit 1 point dans un des polygones
          if (choice([true, false])) {
            A = monpavage.polygones[index1].listePoints[randint(0, monpavage.polygones[index1].listePoints.length - 1)] // On choisit un sommet
          } else {
            A = monpavage.barycentres[index1] // Ou on choisit un barycentre
          }
        }
        A.nom = 'A'
        A.positionLabel = 'above left'
        d = tracePoint(A, 'red') // la trace du centre de symétrie sera rouge et grosse
        B = labelPoint(A)
        d.epaisseur = 3
        d.taille = 4
        for (let i = 1; i <= monpavage.nb_polygones; i++) { // on crée une liste des couples (antécédents, images)
          image = demitour(monpavage, A, i)
          if (image !== -1) { // si l'image du polygone i existe, on ajoute le couple à la liste
            couples.push([i, image])
          }
        }
        couples = videcouples(couples) // supprime tous les couples en double (x,y)=(y,x)
        nombreTentatives++
      }
      if (couples.length < this.nbQuestions) {
        if (this.sup3 === 7) {
          typeDePavage = (typeDePavage + 1) % 5 + 1
        }
        nombrePavageTestes++
      }
    }
    if (couples.length < this.nbQuestions) {
      console.log('trop de questions, augmentez la taille du pavage')
      return
    }

    objets.push(d) // le centre est OK on pousse sa trace
    objets.push(B) // et son label
    couples = shuffle(couples) // on mélange les couples
    for (let i = 0; i < monpavage.nb_polygones; i++) {
      objets.push(texteParPosition(nombreAvecEspace(i + 1), monpavage.barycentres[i].x + 0.5, monpavage.barycentres[i].y, 'milieu', 'gray', 1, 0, true))
    }
    if (this.sup2) { // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i])
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) { // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i])
    }
    texte = mathalea2d(fenetre, objets) // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4
    texte += '<br>'
    for (let i = 0; i < this.nbQuestions; i++) {
      texte += `Quelle est l'image de la figure $${couples[i][0]}$ dans la symétrie de centre $A$ ?<br>`
      texteCorr += `L'image de la figure $${couples[i][0]}$ dans la symétrie de centre $A$ est la figure ${couples[i][1]}<br>`
      if (this.correctionDetaillee) {
        t = this.nbQuestions * 3
        G1 = monpavage.barycentres[couples[i][0] - 1]
        G2 = monpavage.barycentres[couples[i][1] - 1]
        P1 = monpavage.polygones[couples[i][0] - 1]
        P1.color = colorToLatexOrHTML(texcolors(i))
        P1.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i))
        P1.opaciteDeRemplissage = 0.5
        P1.epaisseur = 2
        P2 = monpavage.polygones[couples[i][1] - 1]
        P2.color = colorToLatexOrHTML(texcolors(i))
        P2.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i))
        P2.opaciteDeRemplissage = 0.5
        P2.epaisseur = 2
        P3 = rotationAnimee(P1, A, 180, `begin="${i * 3}s;${i * 3 + t}s;${i * 3 + t * 2}s" end="${i * 3 + 2}s;${i * 3 + t + 2}s;${i * 3 + t * 2 + 2}s" dur="2s" repeatCount="indefinite" repeatDur="${9 * this.nbQuestions}s" id="poly-${i}-anim"`)
        P3.color = colorToLatexOrHTML(texcolors(i))
        P3.epaisseur = 2
        objetsCorrection.push(tracePoint(G1, G2), segment(G1, G2, texcolors(i)), codageMilieu(G1, G2, texcolors(i), codes[i], false), P1, P2, P3)
      }
    }
    if (this.correctionDetaillee) {
      texteCorr += mathalea2d(fenetre, objets, objetsCorrection)
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Taille du pavage (la grande est automatique au-delà de 5 questions)', 2, ' 1 : Taille modeste\n 2 : Grande taille']
  this.besoinFormulaire2CaseACocher = ['Montrer les centres']
  this.besoinFormulaire3Numerique = ['Choix du pavage', 8, '1 : Triangles équilatéraux\n2 : Carrés\n3 : Hexagones réguliers\n4 : Carrés et triangles équilatéraux\n5 : Octogones et carrés\n 6 : Losanges (pavage hexagonal d\'écolier)\n7 : Hexagones et triangles équilatéraux\n8 : Un des sept pavages au hasard']
}
