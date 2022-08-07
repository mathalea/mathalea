import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, egal, randint, choice, shuffle, nombreAvecEspace, arcenciel, texcolors } from '../../modules/outils.js'
import { pavage, tracePoint, labelPoint, segment, rotation, rotationAnimee, codageAngle, texteParPosition, mathalea2d, colorToLatexOrHTML } from '../../modules/2d.js'
export const titre = 'Trouver l\'image d\'une figure par une rotation dans un pavage'

/**
 * Publié le 16/12/2020
 * @author Jean-Claude Lhote
 * Trouver l'image par sune rotation d'une figure dans un pavage
 * Ref 3G12
 */
export default function PavageEtRotation2D () {
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
        if (tableau[k][0] === tableau[k][1]) {
          tableau.splice(k, 1)
        }
        for (let j = k + 1; j < tableau.length; j++) {
          // eslint-disable-next-line no-empty
          if (tableau[k][1] === tableau[j][0]) {

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
      } else { return false }
    }

    const compare2sommets = function (sommet1, sommet2) {
      if (egal(sommet1.x, sommet2.x, 0.1) && egal(sommet1.y, sommet2.y, 0.1)) {
        return true
      } else { return false }
    }
    const comparesommets = function (poly1, poly2) {
      let trouve = false; let trouves = 0
      if (comparenbsommets(poly1, poly2)) {
        for (const P of poly1.listePoints) {
          for (const M of poly2.listePoints) {
            if (compare2sommets(M, P)) {
              trouve = true
            }
            if (trouve) { break }
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
      if (trouves === poly1.listePoints.length) { return true } else { return false }
    }

    const rotaccion = function (pavage, A, angle, numero) {
      const poly = pavage.polygones[numero - 1]
      let pol
      const result = -1
      const sympoly = rotation(poly, A, angle)
      for (let k = 0; k < pavage.polygones.length; k++) {
        pol = pavage.polygones[k]
        if (compare2polys(sympoly, pol)) {
          return k + 1
        }
      }
      return result
    }

    const objets = []; const objetsCorrection = []
    let taillePavage = parseInt(this.sup)
    if (taillePavage < 1 || taillePavage > 2) {
      taillePavage = 1
    }
    if (this.nbQuestions > 5) {
      taillePavage = 2
    }
    this.listeCorrections = []
    this.listeQuestions = []
    let Nx; let Ny; let index1; let A; let image; let couples = []; let tailles = []; let monpavage; let fenetre
    let texte = ''; let texteCorr = ''; let typeDePavage = parseInt(this.sup)
    let nombreTentatives; let nombrePavageTestes = 1
    let sensdirect, M, N, trace, label, P1, P2, P3, t
    const alphas = [[60, 120, 180], [90, 180], [60, 120, 180], [60, 120, 180, 90], [45, 90, 135, 180], [60, 120, 180], [60, 120, 180]]; let alpha
    if (this.sup3 === 8) {
      typeDePavage = randint(1, 7)
    } else {
      typeDePavage = parseInt(this.sup3)
    }
    while (couples.length < this.nbQuestions && nombrePavageTestes < 6) {
      nombreTentatives = 0
      monpavage = pavage() // On crée l'objet Pavage qui va s'appeler monpavage
      tailles = [[[3, 2], [3, 2], [2, 2], [2, 2], [2, 2], [2, 2], [3, 2]], [[4, 3], [4, 3], [3, 3], [3, 3], [3, 3], [3, 2], [5, 3]]]

      Nx = tailles[taillePavage - 1][typeDePavage - 1][0]
      Ny = tailles[taillePavage - 1][typeDePavage - 1][1]
      monpavage.construit(typeDePavage, Nx, Ny, 3) // On initialise toutes les propriétés de l'objet.
      fenetre = monpavage.fenetre
      // fenetreMathalea2d = [fenetre.xmin, fenetre.ymin, fenetre.xmax, fenetre.ymax];
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
        trace = tracePoint(A) // la trace du centre de symétrie sera rouge et grosse
        label = labelPoint(A)
        trace.epaisseur = 3
        trace.taille = 4
        trace.color = colorToLatexOrHTML('red')
        alpha = alphas[typeDePavage - 1][randint(0, alphas[typeDePavage - 1].length - 1)]
        sensdirect = choice([1, -1])
        for (let i = 1; i <= monpavage.nb_polygones; i++) { // on crée une liste des couples (antécédents, images)
          image = rotaccion(monpavage, A, alpha * sensdirect, i)
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
      console.log('Trop de questions, augmentez la taille du pavage !')
      return
    }

    objets.push(trace) // le centre est OK on pousse sa trace
    objets.push(label) // et son label
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
    texte += `<br>Soit la rotation de centre $A$ et d'angle ${alpha}° dans le sens `
    if (sensdirect === 1) {
      texte += 'inverse des aiguilles d\'une montre.<br>'
    } else {
      texte += 'des aiguilles d\'une montre.<br>'
    }
    texteCorr += `Soit la rotation de centre $A$ et d'angle ${alpha}° dans le sens `
    if (sensdirect === 1) {
      texteCorr += 'inverse des aiguilles d\'une montre. <br>'
    } else {
      texteCorr += 'des aiguilles d\'une montre. <br>'
    }
    for (let i = 0; i < this.nbQuestions; i++) {
      texte += `Quelle est l'image de la figure $${couples[i][0]}$ ?<br>`
      texteCorr += `L'image de la figure $${couples[i][0]}$ est la figure ${couples[i][1]}.<br>`

      if (this.correctionDetaillee) {
        t = this.nbQuestions * 3
        M = monpavage.barycentres[couples[i][0] - 1]
        N = monpavage.barycentres[couples[i][1] - 1]
        P1 = monpavage.polygones[couples[i][0] - 1]
        P1.color = texcolors(i)
        P1.couleurDeRemplissage = texcolors(i)
        P1.opaciteDeRemplissage = 0.5
        P1.epaisseur = 2
        P2 = monpavage.polygones[couples[i][1] - 1]
        P2.color = texcolors(i)
        P2.couleurDeRemplissage = texcolors(i)
        P2.opaciteDeRemplissage = 0.5
        P2.epaisseur = 2
        P3 = rotationAnimee(P1, A, alpha * sensdirect, `begin="${i * 3}s;${i * 3 + t}s;${i * 3 + t * 2}s" end="${i * 3 + 2}s;${i * 3 + t + 2}s;${i * 3 + t * 2 + 2}s" dur="2s" repeatCount="indefinite" repeatDur="${9 * this.nbQuestions}s" id="poly-${i}-anim"`)
        P3.color = texcolors(i)
        P3.epaisseur = 2
        objetsCorrection.push(tracePoint(M, N), segment(A, M, texcolors(i)), segment(A, N, arcenciel(i)), codageAngle(M, A, N, 0.8, '', arcenciel(i), 1, 1, 'blue', 0.2, true), P1, P2, P3)
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
