import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, egal, randint, shuffle, nombreAvecEspace, texteEnCouleur, miseEnEvidence, numAlpha } from '../../modules/outils.js'
import { tracePoint, mediatrice, codageMediatrice, segment, symetrieAxiale, texteParPosition, pointIntersectionDD, droiteHorizontaleParPoint, point, droiteVerticaleParPoint, latexParCoordonnees } from '../../modules/2d.js'
import { symetrieAnimee } from '../../modules/2dAnimation.js'
import { pavage } from '../../modules/Pavage.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Trouver l\'image d\'une figure par une symétrie axiale dans un pavage'
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '14/12/2020'

/**
 * Trouver une figure symétrique dans un pavage. Symétrie axiale. 6 pavages différents.
 * @author Jean-Claude Lhote
 * Réf : 6G25-3
 * Relecture : Novembre 2021 par EE
 */
export const uuid = '328b1'
export const ref = '6G25-3'
export default function PavageEtReflexion2d () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true
  this.correctionDetaillee = true
  this.correctionDetailleeDisponible = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1 // 1 pour des pavages modestes, 2 pour des plus grands.
  this.sup2 = false // On cache les centres par défaut.
  this.sup3 = 7
  // context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.nouvelleVersion = function () {
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
    /*     let associesommets=function(poly1,poly2,d){ //Pour chercher les indices des symétriques dans leur polygone respectif
        let binomes=[],P,M
        for (let k=0;k<poly1.listePoints.length;k++) { // afin éventuellement de faire clignoter ces paires de points lors de la correction
          P=symetrieAxiale(poly1.listePoints[k],d)
          for (let l=0;l<poly2.listePoints.length;l++) {
            M=poly2.listePoints[l]
            if (compare2sommets(M,P)) {
              binomes.push([k,l])
              break
            }
          }
        }
        return binomes
      }
  */
    const refleccion = function (pavage, d, numero) { // retourne le numero du polygone symétrique ou -1 si il n'existe pas
      const poly = pavage.polygones[numero - 1]; let pol
      const result = -1
      const sympoly = symetrieAxiale(poly, d)
      for (let k = 0; k < pavage.polygones.length; k++) {
        pol = pavage.polygones[k]
        if (compare2polys(sympoly, pol)) {
          return k + 1
        }
      }
      return result
    }

    const objets = []; const objetsCorrection = []; let P1; let P2; let P3; let t
    const codes = ['/', '//', '///', 'o', 'w', 'X', 'U', '*']
    let taillePavage = parseInt(this.sup)
    if (taillePavage < 1 || taillePavage > 2) {
      taillePavage = 1
    }
    if (this.nbQuestions > 5) {
      taillePavage = 2
    }
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    let Nx; let Ny; let index1; let index2; let A; let B; let d; let image; let couples = []; let tailles = []; let monpavage; let fenetre
    let texte = ''; let texteCorr = ''; let typeDePavage = parseInt(this.sup)
    let nombreTentatives; let nombrePavageTestes = 1
    if (this.sup3 === 8) {
      typeDePavage = randint(1, 7)
    } else {
      typeDePavage = parseInt(this.sup3)
    }
    while (couples.length < this.nbQuestions && nombrePavageTestes < 7) {
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
        index1 = randint(Math.floor(monpavage.nb_polygones / 3), Math.ceil(monpavage.nb_polygones * 2 / 3)) // On choisit 2 points dans 2 polygones distincts.
        index2 = randint(Math.floor(monpavage.nb_polygones / 3), Math.ceil(monpavage.nb_polygones * 2 / 3), index1)
        A = monpavage.polygones[index1].listePoints[randint(0, 2)] // On les choisit dans les trois premiers
        B = monpavage.polygones[index2].listePoints[randint(0, 2)] // points pour éviter un point qui n'éxiste pas
        while (compare2sommets(A, B)) { // On vérifie qu'ils sont bien distincts sinon, on change.
          index1 = randint(0, monpavage.nb_polygones - 1)
          index2 = randint(0, monpavage.nb_polygones - 1, index1)
          A = monpavage.polygones[index1].listePoints[randint(0, 2)] // idem ci-dessus
          B = monpavage.polygones[index2].listePoints[randint(0, 2)] // mais à la sortie du While A!=B
        }
        d = mediatrice(A, B, '', 'red') // l'axe sera la droite passant par ces deux points si ça fonctionne
        d.epaisseur = 3
        for (let i = 1; i <= monpavage.nb_polygones; i++) { // on crée une liste des couples (antécédents, images)
          image = refleccion(monpavage, d, i)
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

    objets.push(d) // la droite d est trouvée
    let pt1, pt2
    if (d.pente < 0 && d.pente > -10) {
      pt1 = pointIntersectionDD(d, droiteHorizontaleParPoint(point(context.fenetreMathalea2d[2], context.fenetreMathalea2d[3])))
      pt2 = pointIntersectionDD(d, droiteVerticaleParPoint(point(context.fenetreMathalea2d[0], context.fenetreMathalea2d[1])))
      if (pt1.x > pt2.x) {
        objets.push(latexParCoordonnees('(d)', pt1.x, pt1.y - 2.5, 'red', 20, 10, '', 12))
      } else {
        if (pt2.x < context.fenetreMathalea2d[2] + 0.5) objets.push(latexParCoordonnees('(d)', pt2.x + 0.75 * context.zoom, pt2.y - 0.8 * context.zoom, 'red', 20, 10, '', 12))
        else objets.push(latexParCoordonnees('(d)', pt2.x + 0.75 * context.zoom, pt2.y + 0.15 * context.zoom, 'red', 20, 10, '', 12))
      }
    } else if (d.pente >= 0 && d.pente < 10) {
      pt1 = pointIntersectionDD(d, droiteHorizontaleParPoint(point(context.fenetreMathalea2d[2], context.fenetreMathalea2d[3])))
      pt2 = pointIntersectionDD(d, droiteVerticaleParPoint(point(context.fenetreMathalea2d[2], context.fenetreMathalea2d[3])))
      if (pt1.x < pt2.x) {
        objets.push(latexParCoordonnees('(d)', pt1.x - 0.75 * context.zoom, pt1.y - 2.5, 'red', 20, 10, '', 12))
      } else {
        objets.push(latexParCoordonnees('(d)', pt2.x - 0.75 * context.zoom, pt2.y + 0.5 * context.zoom, 'red', 20, 10, '', 12))
      }
    } else { // d est verticale
      pt1 = pointIntersectionDD(d, droiteHorizontaleParPoint(point(context.fenetreMathalea2d[2], context.fenetreMathalea2d[3])))
      objets.push(latexParCoordonnees('(d)', pt1.x - 1, pt1.y - 1.5, 'red', 20, 10, '', 12))
    }

    couples = shuffle(couples) // on mélange les couples
    const texteNoir = []
    const texteGris = []
    for (let i = 0; i < monpavage.nb_polygones; i++) {
      texteNoir.push(texteParPosition(nombreAvecEspace(i + 1), monpavage.barycentres[i].x, monpavage.barycentres[i].y + 0.5, 'milieu', 'black', 1, 0, true))
      texteGris.push(texteParPosition(nombreAvecEspace(i + 1), monpavage.barycentres[i].x, monpavage.barycentres[i].y + 0.5, 'milieu', 'gray', 1, 0, true))
    }
    if (this.sup2) { // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i])
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) { // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i])
    }

    texte = mathalea2d(fenetre, objets, texteNoir) // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4
    texte += '<br>'
    const couleurs = ['green', 'red', 'blue']
    for (let i = 0; i < this.nbQuestions; i++) {
      setReponse(this, i, couples[i][1])
      texte += numAlpha(i) + `Quelle est l'image de la figure $${couples[i][0]}$ dans la symétrie d'axe $(d)$ ?` + ajouteChampTexteMathLive(this, i, 'largeur25 inline') + '<br>'
      texteCorr += numAlpha(i) + `L'image de ${texteEnCouleur('la figure', couleurs[i])} $${miseEnEvidence(couples[i][0], couleurs[i])}$ dans la symétrie d'axe $(d)$ est la figure $${miseEnEvidence(couples[i][1])}$.<br>`
      if (this.correctionDetaillee) {
        t = this.nbQuestions * 3
        A = monpavage.barycentres[couples[i][0] - 1]
        B = monpavage.barycentres[couples[i][1] - 1]
        P1 = monpavage.polygones[couples[i][0] - 1]
        P1.color = colorToLatexOrHTML(couleurs[i])
        P1.couleurDeRemplissage = colorToLatexOrHTML(couleurs[i])
        P1.opaciteDeRemplissage = 0.5
        P1.epaisseur = 2
        P2 = monpavage.polygones[couples[i][1] - 1]
        P2.color = colorToLatexOrHTML(couleurs[i])
        P2.couleurDeRemplissage = colorToLatexOrHTML(couleurs[i])
        P2.opaciteDeRemplissage = 0.5
        P2.epaisseur = 2
        P3 = symetrieAnimee(P1, d, `begin="${i * 3}s;${i * 3 + t}s;${i * 3 + t * 2}s" end="${i * 3 + 2}s;${i * 3 + t + 2}s;${i * 3 + t * 2 + 2}s" dur="2s" repeatCount="indefinite" repeatDur="${9 * this.nbQuestions}s" id="poly-${i}-anim"`)
        P3.color = colorToLatexOrHTML(couleurs[i])
        P3.epaisseur = 2
        objetsCorrection.push(tracePoint(A, B), segment(A, B, couleurs[i]), P1, P2, P3)
        if (A !== B) objetsCorrection.push(codageMediatrice(A, B, couleurs[i], codes[i]))
      }
    }
    if (this.correctionDetaillee) {
      texteCorr += mathalea2d(fenetre, objets, objetsCorrection, texteGris)
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Taille du pavage (la grande est automatique au-delà de 5 questions)', 2, ' 1 : Taille modeste\n 2 : Grande taille']
  this.besoinFormulaire2CaseACocher = ['Montrer les centres']
  this.besoinFormulaire3Numerique = ['Choix du pavage', 8, '1 : Triangles équilatéraux\n2 : Carrés\n3 : Hexagones réguliers\n4 : Carrés et triangles équilatéraux\n5 : Octogones et carrés\n 6 : Losanges (pavage hexagonal d\'écolier)\n7 : Hexagones et triangles équilatéraux\n8 : Un des sept pavages au hasard']
}
