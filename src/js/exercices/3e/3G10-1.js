import { codageAngleDroit, droiteParPointEtPente, droiteVerticaleParPoint, point, segment, milieu, pointSurDroite, tracePoint, codageSegments, repere, labelPoint, droiteHorizontaleParPoint, afficheMesureAngle, vecteur } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint, choice, combinaisonListes, imagePointParTransformation, texFractionReduite, texNombre, contraindreValeur, numAlpha, listeQuestionsToContenu, miseEnCouleur, miseEnEvidence } from '../../modules/outils.js'
import { calcule } from '../../modules/fonctionsMaths.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Trouver les coordonnées de l\'image d\'un point par une rotation et une homothétie'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '15/01/2023' //  Par EE

/**
 * Trouver les coordonnées d'un punto transformé d'un autre par une des transformations du plan
 * @author Jean-Claude Lhote (Modif des paramètres, nbQuestions modifiables par Eric Elter)
 * 3G10-1
 */
export const uuid = 'd4088'
export const ref = '3G10-1'
export default function TransformationsDuPlanEtCoordonnees () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  context.fenetreMathalea2d = [-9, -9, 9, 9]
  this.sup = '4-5-6'

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.listeCorrections = [] // Liste de questions corrigées
    const k = []
    let A, B, C, Aprime, Bprime, Cprime
    const xP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // ces nombres sont juste là pour compter combien il y en a... ils seront remplacés plus tard par les coordonnées utiles ou pas.
    const yP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // comme pour t, je n'utiliserai pas le premier élément pour coller aux index.
    const t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // il y a 14 transformations mais je n'utilise pas t[0] pour coller avec les index.
    const lettre1 = ['A', 'B', 'C']; const lettre2 = ['O\'', 'A', 'B'] // si t[i]=0 alors la transformation concernée n'existe pas, si t[i]=1, on la dessine.
    const punto = [[]]
    const couleurs = ['brown', 'green', 'blue']
    const listeTypeDeQuestions = [[1, 2, 3, 4], [7], [8], [5, 6], [9], [10]]
    let typesDeQuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = [0]
    } else {
      if (typeof (this.sup) === 'number') {
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, 6, this.sup, 1) - 1
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 6, typesDeQuestionsDisponibles[i], 1) - 1
        }
      }
    }
    typesDeQuestionsDisponibles = combinaisonListes(typesDeQuestionsDisponibles, 3)

    for (let ee = 0, texte, texteCorr, xA, yA, xB, yB, xC, yC, objetsEnonce, objetsCorrection, cpt = 0; ee < this.nbQuestions && cpt < 50;) {
      let enonceAmc = ''
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      objetsCorrection = []
      const choixTransformation = []
      for (let j = 0; j < 3; j++) choixTransformation.push(choice(listeTypeDeQuestions[typesDeQuestionsDisponibles[j]]))
      for (let j = 0; j < 3; j++) {
        if (choixTransformation[j] === 10) {
          k[j] = choice([2, 2, 2, 2, 4, 4, 4, 4, 5, 10]) * randint(-1, 1, [0]) // rapport d'homothétie < 1 (plus ou moins  0.5, 0.25, 0.2 ou 0,1 ) avec une fréquence divisée par 4 pour 0.2 et 0.1
        } else { k[j] = choice([1, 2, 2, 3, 3, 2.5]) * randint(-1, 1, [0]) }
      } // rapport d'homothétie >=1 (plus ou - 1,2,2.5, 3 avec des fréquences divisées par 2 pour 1 et 2.5)

      const xO = randint(-3, 3, [0, -1]) // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et punto d'intersection des axes))
      const yO = randint(-3, 3, [0, -1])
      const pointO = point(0, 0, 'O', 'above right')

      const O = point(xO, yO, "O'", 'above left') // on crée le point O'
      let droited1, droited2, droited, droitedprime
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
          case 1: // symétrie axiale
            droited1 = droiteParPointEtPente(O, 1, '$(d_1)$', context.isHtml ? couleurs[i] : 'black')
            droited1.color = colorToLatexOrHTML(context.isHtml ? couleurs[i] : 'black')
            droited1.isVisible = true
            droited1.epaisseur = 2
            droited1.opacite = 0.5
            t[1] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A), labelPoint(A))
              objetsCorrection.push(tracePoint(A), labelPoint(A), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'), segment(A, Aprime, couleurs[i]), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droited1, -15), couleurs[i]), codageSegments('//', couleurs[i], A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
              xP[1] = xA
              yP[1] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B), labelPoint(B))
              objetsCorrection.push(tracePoint(B), labelPoint(B), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'), segment(B, Bprime, couleurs[i]), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droited1, -15), couleurs[i]), codageSegments('O', couleurs[i], B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
              xP[1] = xB
              yP[1] = yB
            } else {
              objetsEnonce.push(tracePoint(C), labelPoint(C))
              objetsCorrection.push(tracePoint(C), labelPoint(C), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'), segment(C, Cprime, couleurs[i]), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droited1, -15), couleurs[i]), codageSegments('|||', couleurs[i], C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
              xP[1] = xC
              yP[1] = yC
            }
            objetsEnonce.push(droited1)
            objetsCorrection.push(droited1)

            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d_1)', droited1.color)}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d_1)', droited1.color)}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, le symétrique de $${lettre1[i]}$ par rapport à $(d_1)$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 2: // symétrie axiale
            droited2 = droiteParPointEtPente(O, -1, '$(d_2)$', context.isHtml ? couleurs[i] : 'black')
            droited2.color = colorToLatexOrHTML(context.isHtml ? couleurs[i] : 'black')
            droited2.isVisible = true
            droited2.epaisseur = 2
            droited2.opacite = 0.5
            t[2] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A), labelPoint(A))
              objetsCorrection.push(tracePoint(A), labelPoint(A), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'), segment(A, Aprime, couleurs[i]), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droited2, -15), couleurs[i]), codageSegments('//', couleurs[i], A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
              xP[2] = xA
              yP[2] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B), labelPoint(B))
              objetsCorrection.push(tracePoint(B), labelPoint(B), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'), segment(B, Bprime, couleurs[i]), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droited2, -15), couleurs[i]), codageSegments('O', couleurs[i], B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
              xP[2] = xB
              yP[2] = yB
            } else {
              objetsEnonce.push(tracePoint(C), labelPoint(C))
              objetsCorrection.push(tracePoint(C), labelPoint(C), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'), segment(C, Cprime, couleurs[i]), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droited2, -15), couleurs[i]), codageSegments('|||', couleurs[i], C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
              xP[2] = xC
              yP[2] = yC
            }
            objetsEnonce.push(droited2)
            objetsCorrection.push(droited2)
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d_2)', droited2.color)}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d_2)', droited2.color)}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, le symétrique de $${lettre1[i]}$ par rapport à $(d_2)$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 3: // symétrie axiale
            droited = droiteHorizontaleParPoint(O, '$(d)$', context.isHtml ? couleurs[i] : 'black')
            droited.color = colorToLatexOrHTML(context.isHtml ? couleurs[i] : 'black')
            droited.isVisible = true
            droited.epaisseur = 2
            droited.opacite = 0.5
            t[3] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A), labelPoint(A))
              objetsCorrection.push(tracePoint(A), labelPoint(A), tracePoint(Aprime, couleurs[i]), labelPoint(Aprime, '#f15929'), segment(A, Aprime, '#f15929'), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droited, -15), couleurs[i]), codageSegments('//', couleurs[i], A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
              xP[3] = xA
              yP[3] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B), labelPoint(B))
              objetsCorrection.push(tracePoint(B), labelPoint(B), tracePoint(Bprime, couleurs[i]), labelPoint(Bprime, '#f15929'), segment(B, Bprime, '#f15929'), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droited, -15), couleurs[i]), codageSegments('O', couleurs[i], B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
              xP[3] = xB
              yP[3] = yB
            } else {
              objetsEnonce.push(tracePoint(C), labelPoint(C))
              objetsCorrection.push(tracePoint(C), labelPoint(C), tracePoint(Cprime, couleurs[i]), labelPoint(Cprime, '#f15929'), segment(C, Cprime, '#f15929'), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droited, -15), couleurs[i]), codageSegments('|||', couleurs[i], C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
              xP[3] = xC
              yP[3] = yC
            }
            objetsEnonce.push(droited)
            objetsCorrection.push(droited)
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d)', droited.color)}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d)', droited.color)}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, le symétrique de $${lettre1[i]}$ par rapport à $(d)$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 4: // symétrie axiale
            droitedprime = droiteVerticaleParPoint(O, "$(d')$", context.isHtml ? couleurs[i] : 'black')
            droitedprime.color = colorToLatexOrHTML(context.isHtml ? couleurs[i] : 'black')
            droitedprime.isVisible = true
            droitedprime.epaisseur = 2
            droitedprime.opacite = 0.5
            t[4] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A), labelPoint(A))
              objetsCorrection.push(tracePoint(A), labelPoint(A), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'), segment(A, Aprime, couleurs[i]), codageAngleDroit(A, milieu(A, Aprime), pointSurDroite(droitedprime, -15), couleurs[i]), codageSegments('//', couleurs[i], A, milieu(A, Aprime), milieu(A, Aprime), Aprime))
              xP[4] = xA
              yP[4] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B), labelPoint(B))
              objetsCorrection.push(tracePoint(B), labelPoint(B), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'), segment(B, Bprime, couleurs[i]), codageAngleDroit(B, milieu(B, Bprime), pointSurDroite(droitedprime, -15), couleurs[i]), codageSegments('O', couleurs[i], B, milieu(B, Bprime), milieu(B, Bprime), Bprime))
              xP[4] = xB
              yP[4] = yB
            } else {
              objetsEnonce.push(tracePoint(C), labelPoint(C))
              objetsCorrection.push(tracePoint(C), labelPoint(C), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'), segment(C, Cprime, couleurs[i]), codageAngleDroit(C, milieu(C, Cprime), pointSurDroite(droitedprime, -15), couleurs[i]), codageSegments('|||', couleurs[i], C, milieu(C, Cprime), milieu(C, Cprime), Cprime))
              xP[4] = xC
              yP[4] = yC
            }
            objetsEnonce.push(droitedprime)
            objetsCorrection.push(droitedprime)
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d\')', droitedprime.color)}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $${miseEnCouleur('(d\')', droitedprime.color)}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, le symétrique de $${lettre1[i]}$ par rapport à $(d')$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 5: // rotation de 90°

            t[5] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, O), labelPoint(A, O), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'), codageAngleDroit(A, O, Aprime, couleurs[i]),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), afficheMesureAngle(A, O, Aprime), codageSegments('//', couleurs[i], O, A, O, Aprime)
              )
              xP[5] = xA
              yP[5] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, A), labelPoint(B, A), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'), codageAngleDroit(B, O, Bprime, couleurs[i]),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), afficheMesureAngle(B, A, Bprime), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[5] = xB
              yP[5] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, B), labelPoint(C, B), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'), codageAngleDroit(C, O, Cprime, couleurs[i]),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), afficheMesureAngle(C, B, Cprime), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[5] = xC
              yP[5] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 6: // rotation de 90°

            t[6] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, O), labelPoint(A, O), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'), codageAngleDroit(A, O, Aprime, couleurs[i]),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), afficheMesureAngle(A, O, Aprime), codageSegments('//', couleurs[i], O, A, O, Aprime))
              xP[6] = xA
              yP[6] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, A), labelPoint(B, A), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'), codageAngleDroit(B, A, Bprime, couleurs[i]),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), afficheMesureAngle(B, A, Bprime), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[6] = xB
              yP[6] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, B), labelPoint(C, B), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'), codageAngleDroit(C, B, Cprime, couleurs[i]),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), afficheMesureAngle(C, B, Cprime), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[6] = xC
              yP[6] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 7: // symétrie centrale

            t[7] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, O), labelPoint(A, O), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), codageSegments('//', couleurs[i], O, A, O, Aprime))
              xP[7] = xA
              yP[7] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, A), labelPoint(B, A), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[7] = xB
              yP[7] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, B), labelPoint(C, B), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[7] = xC
              yP[7] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break
          case 8: // translation

            t[8] = 1
            O.positionLabel = 'right'
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O, pointO), labelPoint(A, O, pointO), vecteur(pointO, O).representant(pointO))
              objetsCorrection.push(tracePoint(A, O, pointO), labelPoint(A, O, pointO), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'),
                vecteur(pointO, O).representant(A, couleurs[i]), vecteur(pointO, O).representant(pointO, couleurs[i]))
              xP[8] = xA
              yP[8] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A, pointO), labelPoint(B, A, pointO), vecteur(pointO, A).representant(pointO))
              objetsCorrection.push(tracePoint(B, A, pointO), labelPoint(B, A, pointO), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'),
                vecteur(pointO, A).representant(B, couleurs[i]), vecteur(pointO, A).representant(pointO, couleurs[i]))
              xP[8] = xB
              yP[8] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B, pointO), labelPoint(C, B, pointO), vecteur(pointO, B).representant(pointO))
              objetsCorrection.push(tracePoint(C, B, pointO), labelPoint(C, B, pointO), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'),
                vecteur(pointO, B).representant(C, couleurs[i]), vecteur(pointO, B).representant(pointO, couleurs[i]))
              xP[8] = xC
              yP[8] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la translation qui transforme $O$ en $${lettre2[i]}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la translation qui transforme $O$ en $${lettre2[i]}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la translation qui transforme $O$ en $${lettre2[i]}$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 9: // homothétie de rapport entier

            t[9] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, O), labelPoint(A, O), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]))
              xP[9] = xA
              yP[9] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, A), labelPoint(B, A), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]))

              xP[9] = xB
              yP[9] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, B), labelPoint(C, B), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]))

              xP[9] = xC
              yP[9] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texNombre(k[i])}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texNombre(k[i])}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texNombre(k[i])}$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 10: // homothétie de rapport fractionnaire

            t[10] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, O), labelPoint(A, O), tracePoint(Aprime, '#f15929'), labelPoint(Aprime, '#f15929'),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]))
              xP[10] = xA
              yP[10] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, A), labelPoint(B, A), tracePoint(Bprime, '#f15929'), labelPoint(Bprime, '#f15929'),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]))
              xP[10] = xB
              yP[10] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, B), labelPoint(C, B), tracePoint(Cprime, '#f15929'), labelPoint(Cprime, '#f15929'),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]))
              xP[10] = xC
              yP[10] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texFractionReduite(1, k[i])}$.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texFractionReduite(1, k[i])}$.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${texFractionReduite(1, k[i])}$ a pour coordonnées ($${miseEnEvidence(texNombre(punto[i][0]))};${miseEnEvidence(texNombre(punto[i][1]))}$).<br>`
            break

          case 11: // rotation de 60°

            t[11] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), afficheMesureAngle(A, O, Aprime), codageSegments('//', couleurs[i], O, A, O, Aprime))
              xP[11] = xA
              yP[11] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), afficheMesureAngle(B, A, Bprime), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[11] = xB
              yP[11] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), afficheMesureAngle(C, B, Cprime), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[11] = xC
              yP[11] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
            break
          case 12: // rotation de 60°

            t[12] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), afficheMesureAngle(A, O, Aprime), codageSegments('//', couleurs[i], O, A, O, Aprime))
              xP[12] = xA
              yP[12] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), afficheMesureAngle(B, A, Bprime), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[12] = xB
              yP[12] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), afficheMesureAngle(C, B, Cprime), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[12] = xC
              yP[12] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
            break

          case 13: // rotation de 120°

            t[13] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), afficheMesureAngle(A, O, Aprime), codageSegments('//', couleurs[i], O, A, O, Aprime))
              xP[13] = xA
              yP[13] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), afficheMesureAngle(B, A, Bprime), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[13] = xB
              yP[13] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), afficheMesureAngle(C, B, Cprime), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[13] = xC
              yP[13] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
            break

          case 14: // rotation de 120°

            t[14] = 1
            if (i === 0) {
              objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
              objetsCorrection.push(tracePoint(A, Aprime, O), labelPoint(A, Aprime, O),
                segment(O, A, couleurs[i]), segment(O, Aprime, couleurs[i]), afficheMesureAngle(A, O, Aprime), codageSegments('//', couleurs[i], O, A, O, Aprime))
              xP[14] = xA
              yP[14] = yA
            } else if (i === 1) {
              objetsEnonce.push(tracePoint(B, A), labelPoint(B, A))
              objetsCorrection.push(tracePoint(B, Bprime, A), labelPoint(B, Bprime, A),
                segment(A, B, couleurs[i]), segment(A, Bprime, couleurs[i]), afficheMesureAngle(B, A, Bprime), codageSegments('O', couleurs[i], A, B, A, Bprime))
              xP[14] = xB
              yP[14] = yB
            } else {
              objetsEnonce.push(tracePoint(C, B), labelPoint(C, B))
              objetsCorrection.push(tracePoint(C, Cprime, B), labelPoint(C, Cprime, B),
                segment(B, C, couleurs[i]), segment(B, Cprime, couleurs[i]), afficheMesureAngle(C, B, Cprime), codageSegments('|||', couleurs[i], B, C, B, Cprime))
              xP[14] = xC
              yP[14] = yC
            }
            texte += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire.`
            if (context.isAmc) {
              enonceAmc += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire.`
            }
            texteCorr += (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) + ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire a pour coordonnées ($${texNombre(calcule(punto[i][0], 2))};${texNombre(calcule(punto[i][1], 2))}$).<br>`
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
      objetsEnonce.push(repere({ xMin: -10, yMin: -10, xMax: 10, yMax: 10, grilleOpacite: 0.2 }))
      objetsCorrection.push(repere({ xMin: -10, yMin: -10, xMax: 10, yMax: 10, grilleOpacite: 0.2 }))
      if (context.isAmc) {
        this.autoCorrection.push({
          enonce: '\\begin{center}' + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.5, mainlevee: false }, objetsEnonce) + '\\\\' + '\\end{center}' + enonceAmc,
          enonceAvant: false,
          enonceApresNumQuestion: true,
          options: { barreseparation: false },
          propositions: [
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                multicolsBegin: true,
                reponse: {
                  texte: numAlpha(0) + ' Abscisse de A',
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
                multicolsEnd: true,
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
                multicolsBegin: true,
                reponse: {
                  texte: numAlpha(1) + ' Abscisse de B',
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
                multicolsEnd: true,
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
                multicolsBegin: true,
                reponse: {
                  texte: numAlpha(2) + ' Abscisse de C',
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
                multicolsEnd: true,
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
        )
      }
      if (this.questionJamaisPosee(ee, xA, yA, xB, yB, xC, yC)) {
        this.listeQuestions.push(texte + '<br>' + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.4, mainlevee: false }, objetsEnonce))
        this.listeCorrections.push(texteCorr + '<br>' + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.4, mainlevee: false }, objetsCorrection))
        ee++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Choix des transformations ', 'Nombres séparés par des tirets (3 maximum) \n1 : Symétrie axiale\n 2 : Symétrie centrale\n 3 : Translation\n 4 : Rotation\n 5 : Homothétie de rapport entier\n 6 : Homothétie de rapport fractionnaire']
}
