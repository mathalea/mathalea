import { codageAngleDroit, droiteParPointEtPente, droiteVerticaleParPoint, mathalea2d, point, segment, milieu, pointSurDroite, tracePoint, codeSegments, repere2, labelPoint, droiteHorizontaleParPoint, afficheMesureAngle, vecteur } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListes, imagePointParTransformation, texFractionReduite, texNombrec, texNombre } from '../../modules/outils.js'
import { calcule } from '../../modules/fonctionsMaths.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Trouver les coordonnées de l’image d’un point par une transformation du plan'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Trouver les coordonnées d'un punto transformé d'un autre par une des transformations du plan
 * @author Jean-Claude Lhote
 * 3G10-1
 */
export default function TransformationsDuPlanEtCoordonnees () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  context.fenetreMathalea2d = [-9, -9, 9, 9]
  this.sup = 1 // Symétrie axiale seules
  this.sup2 = false // on mélange les transformation par défaut

  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5
  this.nouvelleVersion = function (numeroExercice) {
    const objetsEnonce = []
    const objetsCorrection = []
    let enonceAmc = ''
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.sup = parseInt(this.sup)
    this.listeCorrections = [] // Liste de questions corrigées
    let xA; let yA; let xB; let yB; let xC; let yC; const k = []
    let A, B, C, Aprime, Bprime, Cprime
    const xP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // ces nombres sont juste là pour compter combien il y en a... ils seront remplacés plus tard par les coordonnées utiles ou pas.
    const yP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // comme pour t, je n'utiliserai pas le premier élément pour coller aux index.
    const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // il y a 14 transformations mais je n'utilise pas t[0] pour coller avec les index.
    let texte = ''; let texteCorr = ''; const lettre1 = ['A', 'B', 'C']; const lettre2 = ['O\'', 'A', 'B'] // si t[i]=0 alors la transformation concernée n'existe pas, si t[i]=1, on la dessine.
    const punto = [[]]
    const transformation = parseInt(this.sup) - 1
    let listeTypeDeQuestions
    if (this.sup2) {
      listeTypeDeQuestions = [[1, 2, 3, 4], [7], [8], [5, 6, 9, 10]]
    } else {
      listeTypeDeQuestions = [[1, 2, 3, 4], [3, 4, 7, 7], [1, 3, 7, 8, 7, 8], [1, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]]
    }
    const choixTransformation = combinaisonListes(listeTypeDeQuestions[transformation], 3)
    for (let j = 0; j < 3; j++) {
      if (choixTransformation[j] === 10) {
        k[j] = choice([2, 2, 2, 2, 4, 4, 4, 4, 5, 10]) * randint(-1, 1, [0]) // rapport d'homothétie < 1 (plus ou moins  0.5, 0.25, 0.2 ou 0,1 ) avec une fréquence divisée par 4 pour 0.2 et 0.1
      } else { k[j] = choice([1, 2, 2, 3, 3, 2.5]) * randint(-1, 1, [0]) }
    } // rapport d'homothétie >=1 (plus ou - 1,2,2.5, 3 avec des fréquences divisées par 2 pour 1 et 2.5)

    const xO = randint(-3, 3, [0, -1]) // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et punto d'intersection des axes))
    const yO = randint(-3, 3, [0, -1])
    const pointO = point(0, 0, 'O', 'above right')
    const O = point(xO, yO, "O'", 'above left') // on crée le point O'
    const droited1 = droiteParPointEtPente(O, 1, '(d_1)') // et les trois axes passant par O'
    const droited = droiteHorizontaleParPoint(O, '(d)')
    const droited2 = droiteParPointEtPente(O, -1, '(d_2)')
    const droitedprime = droiteVerticaleParPoint(O, "(d')")
    droited1.isVisible = true
    droited2.isVisible = true
    droited.isVisible = true
    droitedprime.isVisible = true
    droited1.epaisseur = 2
    droited2.epaisseur = 2
    droited.epaisseur = 2
    droitedprime.epaisseur = 2
    droited1.color = 'green'
    droited2.color = 'green'
    droited.color = 'green'
    droitedprime.color = 'green'
    droited1.opacite = 0.5
    droited1.nom = '(d_1)'
    droited2.opacite = 0.5
    droited.opacite = 0.5
    droitedprime.opacite = 0.5
    let trouve = false
    let compteur = 0
    while (trouve === false) {
      xA = randint(-7, 7, 0) // Point A
      yA = randint(-7, 7, -1)
      xB = randint(-7, 7, [xA, 0]) // Point B
      yB = randint(-7, 7, -1)
      xC = randint(-7, 7, 0) // Point C
      yC = randint(-7, 7, [yA, yB, -1])

      punto[0] = imagePointParTransformation(choixTransformation[0], [xA, yA], [xO, yO], [xO, yO], k[0])
      while ((punto[0][0] < -9 || punto[0][0] > 9 || punto[0][1] < -9 || punto[0][1] > 9) && compteur < 20) { // on teste si A est dans la fenêtre sinon on en choisit un autre
        xA = randint(-7, 7) // Point A
        yA = randint(-7, 7, -1)
        punto[0] = imagePointParTransformation(choixTransformation[0], [xA, yA], [xO, yO], [xO, yO], k[0])
        compteur++
      }
      if (compteur < 20) {
        compteur = 0
      } else {
        compteur = 100
      }
      A = point(xA, yA, 'A')
      Aprime = point(punto[0][0], punto[0][1], "A'")
      if (choixTransformation[1] > 4) { punto[1] = imagePointParTransformation(choixTransformation[1], [xB, yB], [xA, yA], [xA, yA], k[1]) } else { punto[1] = imagePointParTransformation(choixTransformation[1], [xB, yB], [xO, yO]) } // si c'est une symétrie, l'axe passe par O'
      while ((punto[1][0] < -9 || punto[1][0] > 9 || punto[1][1] < -9 || punto[1][1] > 9) && compteur < 20) { // on teste si on est dans les clous, sinon on choisit un autre punto B
        xB = randint(-7, 7, [xA]) // Point B
        yB = randint(-7, 7, -1)
        if (choixTransformation[1] > 4) { punto[1] = imagePointParTransformation(choixTransformation[1], [xB, yB], [xA, yA], [xA, yA], k[1]) } else { punto[1] = imagePointParTransformation(choixTransformation[1], [xB, yB], [xO, yO]) } // si c'est une symétrie, l'axe passe par O'
        compteur++
      }
      if (compteur < 20) {
        compteur = 0
      } else {
        compteur = 100
      }

      B = point(xB, yB, 'B')
      Bprime = point(punto[1][0], punto[1][1], "B'")

      if (choixTransformation[2] > 4) { punto[2] = imagePointParTransformation(choixTransformation[2], [xC, yC], [xB, yB], [xB, yB], k[2]) } else { punto[2] = imagePointParTransformation(choixTransformation[2], [xC, yC], [xO, yO]) } // si c'est une symétrie, l'axe passe par O'
      while ((punto[2][0] < -9 || punto[2][0] > 9 || punto[2][1] < -9 || punto[2][1] > 9) && compteur < 20) { // on vérifie que C est dans le repère sinon on change le punto C.
        xC = randint(-7, 7) // Point C
        yC = randint(-7, 7, [yA, yB, -1])
        if (choixTransformation[2] > 4) { punto[2] = imagePointParTransformation(choixTransformation[2], [xC, yC], [xB, yB], [xB, yB], k[2]) } else { punto[2] = imagePointParTransformation(choixTransformation[2], [xC, yC], [xO, yO]) } // si c'est une symétrie, l'axe passe par O'
        compteur++
      }
      if (compteur < 20) {
        trouve = true
      }
      C = point(xC, yC, 'C')
      Cprime = point(punto[2][0], punto[2][1], "C'")
    }
    // les puntos sont choisis, on écrit l'énoncé
    for (let i = 0; i < 3; i++) {
      switch (choixTransformation[i]) {
        case 1:
          t[1] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A), labelPoint(A))
            objetsCorrection.push(tracePoint(A, Aprime), labelPoint(A, Aprime), segment(A, Aprime, 'blue'), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droited1, -15)), codeSegments('||', 'red', A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
            xP[1] = xA
            yP[1] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B), labelPoint(B))
            objetsCorrection.push(tracePoint(B, Bprime), labelPoint(B, Bprime), segment(B, Bprime, 'blue'), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droited1, -15)), codeSegments('O', 'red', B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
            xP[1] = xB
            yP[1] = yB
          } else {
            objetsEnonce.push(tracePoint(C), labelPoint(C))
            objetsCorrection.push(tracePoint(C, Cprime), labelPoint(C, Cprime), segment(C, Cprime, 'blue'), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droited1, -15)), codeSegments('X', 'red', C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
            xP[1] = xC
            yP[1] = yC
          }
          objetsEnonce.push(droited1)
          objetsCorrection.push(droited1)

          texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_1)$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_1)$.`
          }
          texteCorr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d_1)$ a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 2:
          t[2] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A), labelPoint(A))
            objetsCorrection.push(tracePoint(A, Aprime), labelPoint(A, Aprime), segment(A, Aprime, 'blue'), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droited2, -15)), codeSegments('||', 'red', A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
            xP[2] = xA
            yP[2] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B), labelPoint(B))
            objetsCorrection.push(tracePoint(B, Bprime), labelPoint(B, Bprime), segment(B, Bprime, 'blue'), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droited2, -15)), codeSegments('O', 'red', B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
            xP[2] = xB
            yP[2] = yB
          } else {
            objetsEnonce.push(tracePoint(C), labelPoint(C))
            objetsCorrection.push(tracePoint(C, Cprime), labelPoint(C, Cprime), segment(C, Cprime, 'blue'), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droited2, -15)), codeSegments('X', 'red', C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
            xP[2] = xC
            yP[2] = yC
          }
          objetsEnonce.push(droited2)
          objetsCorrection.push(droited2)
          texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_2)$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_2)$.`
          }
          texteCorr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d_2)$ a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 3:
          t[3] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A), labelPoint(A))
            objetsCorrection.push(tracePoint(A, Aprime), labelPoint(A, Aprime), segment(A, Aprime, 'blue'), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droited, -15)), codeSegments('||', 'red', A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
            xP[3] = xA
            yP[3] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B), labelPoint(B))
            objetsCorrection.push(tracePoint(B, Bprime), labelPoint(B, Bprime), segment(B, Bprime, 'blue'), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droited, -15)), codeSegments('O', 'red', B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
            xP[3] = xB
            yP[3] = yB
          } else {
            objetsEnonce.push(tracePoint(C), labelPoint(C))
            objetsCorrection.push(tracePoint(C, Cprime), labelPoint(C, Cprime), segment(C, Cprime, 'blue'), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droited, -15)), codeSegments('X', 'red', C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
            xP[3] = xC
            yP[3] = yC
          }
          objetsEnonce.push(droited)
          objetsCorrection.push(droited)
          texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d)$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d)$.`
          }
          texteCorr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d)$ a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 4:
          t[4] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A), labelPoint(A))
            objetsCorrection.push(tracePoint(A, Aprime), labelPoint(A, Aprime), segment(A, Aprime, 'blue'), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droitedprime, -15)), codeSegments('||', 'red', A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
            xP[4] = xA
            yP[4] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B), labelPoint(B))
            objetsCorrection.push(tracePoint(B, Bprime), labelPoint(B, Bprime), segment(B, Bprime, 'blue'), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droitedprime, -15)), codeSegments('O', 'red', B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
            xP[4] = xB
            yP[4] = yB
          } else {
            objetsEnonce.push(tracePoint(C), labelPoint(C))
            objetsCorrection.push(tracePoint(C, Cprime), labelPoint(C, Cprime), segment(C, Cprime, 'blue'), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droitedprime, -15)), codeSegments('X', 'red', C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
            xP[4] = xC
            yP[4] = yC
          }
          objetsEnonce.push(droitedprime)
          objetsCorrection.push(droitedprime)
          texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d')$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d')$.`
          }
          texteCorr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d')$ a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 5:

          t[5] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), afficheMesureAngle(A, O, Aprime), codeSegments('//', 'red', O, A, O, Aprime)
            )
            xP[5] = xA
            yP[5] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), afficheMesureAngle(B, A, Bprime), codeSegments('O', 'red', A, B, A, Bprime))
            xP[5] = xB
            yP[5] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), afficheMesureAngle(C, B, Cprime), codeSegments('X', 'red', B, C, B, Cprime))
            xP[5] = xC
            yP[5] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 6:

          t[6] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), afficheMesureAngle(A, O, Aprime), codeSegments('//', 'red', O, A, O, Aprime))
            xP[6] = xA
            yP[6] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, A), labelPoint(B, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), afficheMesureAngle(B, A, Bprime), codeSegments('O', 'red', A, B, A, Bprime))
            xP[6] = xB
            yP[6] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), afficheMesureAngle(C, B, Cprime), codeSegments('X', 'red', B, C, B, Cprime))
            xP[6] = xC
            yP[6] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 7:

          t[7] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), codeSegments('//', 'red', O, A, O, Aprime))
            xP[7] = xA
            yP[7] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), codeSegments('O', 'red', A, B, A, Bprime))
            xP[7] = xB
            yP[7] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), codeSegments('X', 'red', B, C, B, Cprime))
            xP[7] = xC
            yP[7] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$ a pour coordonnées ($${texNombrec(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 11:

          t[11] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), afficheMesureAngle(A, O, Aprime), codeSegments('//', 'red', O, A, O, Aprime))
            xP[11] = xA
            yP[11] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), afficheMesureAngle(B, A, Bprime), codeSegments('O', 'red', A, B, A, Bprime))
            xP[11] = xB
            yP[11] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), afficheMesureAngle(C, B, Cprime), codeSegments('X', 'red', B, C, B, Cprime))
            xP[11] = xC
            yP[11] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
          break
        case 12:

          t[12] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), afficheMesureAngle(A, O, Aprime), codeSegments('//', 'red', O, A, O, Aprime))
            xP[12] = xA
            yP[12] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), afficheMesureAngle(B, A, Bprime), codeSegments('O', 'red', A, B, A, Bprime))
            xP[12] = xB
            yP[12] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), afficheMesureAngle(C, B, Cprime), codeSegments('X', 'red', B, C, B, Cprime))
            xP[12] = xC
            yP[12] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
          break

        case 13:

          t[13] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), afficheMesureAngle(A, O, Aprime), codeSegments('//', 'red', O, A, O, Aprime))
            xP[13] = xA
            yP[13] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), afficheMesureAngle(B, A, Bprime), codeSegments('O', 'red', A, B, A, Bprime))
            xP[13] = xB
            yP[13] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), afficheMesureAngle(C, B, Cprime), codeSegments('X', 'red', B, C, B, Cprime))
            xP[13] = xC
            yP[13] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
          break

        case 14:

          t[14] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'blue'), afficheMesureAngle(A, O, Aprime), codeSegments('//', 'red', O, A, O, Aprime))
            xP[14] = xA
            yP[14] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'blue'), afficheMesureAngle(B, A, Bprime), codeSegments('O', 'red', A, B, A, Bprime))
            xP[14] = xB
            yP[14] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'blue'), afficheMesureAngle(C, B, Cprime), codeSegments('X', 'red', B, C, B, Cprime))
            xP[14] = xC
            yP[14] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
          break

        case 8:

          t[8] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O, pointO), labelPoint(A, O, pointO), vecteur(pointO, O).representant(pointO))
            objetsCorrection.push(tracePoint(A, Aprime, O, pointO), labelPoint(A, Aprime, O, pointO),
              vecteur(pointO, O).representant(A), vecteur(pointO, O).representant(pointO))
            xP[8] = xA
            yP[8] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A, pointO), labelPoint(B, A, pointO), vecteur(pointO, A).representant(pointO))
            objetsCorrection.push(tracePoint(B, Bprime, A, pointO), labelPoint(B, Bprime, A, pointO),
              vecteur(pointO, A).representant(B), vecteur(pointO, A).representant(pointO))
            xP[8] = xB
            yP[8] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B, pointO), labelPoint(C, B, pointO), vecteur(pointO, B).representant(pointO))
            objetsCorrection.push(tracePoint(C, Cprime, B, pointO), labelPoint(C, Cprime, B, pointO),
              vecteur(pointO, B).representant(C), vecteur(pointO, B).representant(pointO))
            xP[8] = xC
            yP[8] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]}.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]}.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]} a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 9:

          t[9] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'orange'))
            xP[9] = xA
            yP[9] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(O, B, 'blue'), segment(O, Bprime, 'orange'))

            xP[9] = xB
            yP[9] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(O, C, 'blue'), segment(O, Cprime, 'orange'))

            xP[9] = xC
            yP[9] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texNombre(k[i])}$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texNombre(k[i])}$.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texNombre(k[i])}$ a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break

        case 10:

          t[10] = 1
          if (i === 0) {
            objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
            objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
              segment(O, A, 'blue'), segment(O, Aprime, 'orange'))
            xP[10] = xA
            yP[10] = yA
          } else if (i === 1) {
            objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
            objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
              segment(A, B, 'blue'), segment(A, Bprime, 'orange'))
            xP[10] = xB
            yP[10] = yB
          } else {
            objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
            objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
              segment(B, C, 'blue'), segment(B, Cprime, 'orange'))
            xP[10] = xC
            yP[10] = yC
          }
          texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texFractionReduite(1, k[i])}$.`
          if (context.isAmc) {
            enonceAmc += `${i + 1}) ` + `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texFractionReduite(1, k[i])}$.`
          }
          texteCorr += `L'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texFractionReduite(1, k[i])}$ a pour coordonnées ($${texNombre(punto[i][0])};${texNombre(punto[i][1])}$).<br>`
          break
      }
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
      }
      texte += '<br>'
      setReponse(this, i, [`${punto[i][0]};${punto[i][1]}`, `(${punto[i][0]};${punto[i][1]})`])
      if (context.isAmc) {
        enonceAmc += '<br>'
      }
    }
    objetsEnonce.push(repere2({ xMin: -10, yMin: -10, xMax: 10, yMax: 10, grilleOpacite: 0.2 }))
    objetsCorrection.push(repere2({ xMin: -10, yMin: -10, xMax: 10, yMax: 10, grilleOpacite: 0.2 }))
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: enonceAmc + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.5, mainlevee: false }, objetsEnonce) + '\\\\',
        options: { multicols: true },
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: '',
              statut: '',
              reponse: {
                texte: 'Abscisse de A',
                valeur: punto[0][0],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: `A(${punto[0][0]};${punto[0][1]})`,
              statut: '',
              reponse: {
                texte: 'Ordonnée de A',
                valeur: punto[0][1],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: '',
              statut: '',
              reponse: {
                texte: 'Abscisse de B',
                valeur: punto[1][0],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: `B(${punto[1][0]};${punto[1][1]})`,
              statut: '',
              reponse: {
                texte: 'Ordonnée de B',
                valeur: punto[1][1],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: '',
              statut: '',
              reponse: {
                texte: 'Abscisse de C',
                valeur: punto[2][0],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: `C(${punto[2][0]};${punto[2][1]})`,
              statut: '',
              reponse: {
                texte: 'Ordonnée de C',
                valeur: punto[2][1],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          }]
      }
    }

    this.listeQuestions.push(texte + '<br>' + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.4, mainlevee: false }, objetsEnonce))
    this.listeCorrections.push(texteCorr + '<br>' + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.4, mainlevee: false }, objetsCorrection))
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Transformations', 4, ' 1 : Symétrie axiale\n 2 : On ajoute la symétrie centrale\n 3 : On ajoute la translation\n 4 : On ajoute la rotation et l\'homothétie']
  this.besoinFormulaire2CaseACocher = ['Transofrmations du niveau seulement', false]
}
