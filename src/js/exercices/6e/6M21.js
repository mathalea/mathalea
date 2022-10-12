import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, compteOccurences, rangeMinMax } from '../../modules/outils/arrays.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { droite, droiteParPointEtPente } from '../../modules/2d/droites.js'
import { numAlpha } from '../../modules/outils/contextSensitif.js'
import { arrondi } from '../../modules/outils/nombres.js'
import { homothetie, projectionOrtho, rotation, translation } from '../../modules/2d/transformations.js'
import { vecteur } from '../../modules/2d/vecteur.js'
import { min, max } from 'mathjs'
import { translationPuisRotationAnimees } from '../../modules/2dAnimation.js'
import { pointIntersectionDD, pointSurSegment } from '../../modules/2d/pointsur.js'
import { polygone } from '../../modules/2d/polygone.js'
import { longueur } from '../../modules/2d/calculs.js'
import { milieu } from '../../modules/2d/barycentre.js'
import { codageSegment } from '../../modules/2d/codages.js'
import { contraindreValeur, entreDeux } from '../../modules/outils/comparateurs.js'
import { arc } from '../../modules/2d/arc.js'
export const dateDePublication = '08/06/2022'
export const titre = 'Comparer périmètres et/ou aires de figures'
export const interactifReady = true
export const interactifType = 'qcm'

/**
 * Comparer aires et/ou périmètres de figures avec ceux d'un rectangle référence
 * Ref 6M21
 * @author Eric Elter
 * Publié le 08/06/2022
 */

export const uuid = '95313'
export const ref = '6M21'
export default function CompareAireEtPerimetreAvecRectangle () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 1
  this.sup = 13
  this.sup2 = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let typesDeProblemes = []
    const nbQuestionsDifferentes = 13
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est qu'il n'y a qu'un seul choix pour le nombre d'étapes
      typesDeProblemes[0] = contraindreValeur(1, nbQuestionsDifferentes, this.sup, nbQuestionsDifferentes)
    } else {
      typesDeProblemes = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < typesDeProblemes.length; i++) {
        typesDeProblemes[i] = contraindreValeur(1, nbQuestionsDifferentes, parseInt(typesDeProblemes[i]), nbQuestionsDifferentes)
      }
    }
    if (compteOccurences(typesDeProblemes, 13) > 0) typesDeProblemes = rangeMinMax(1, 12) // Teste si l'utilisateur a choisi tout

    typesDeProblemes = combinaisonListes(typesDeProblemes, this.nbQuestions)

    const color = combinaisonListes(['red', 'blue', 'green', 'gray', 'pink', '#f15929'], this.nbQuestions)

    let aireOuPerimetre = 'Les deux'
    if (this.sup2 === 1) aireOuPerimetre = 'Perimetre'
    else if (this.sup2 === 2) aireOuPerimetre = 'Aire'

    let compteurInteractif = 0
    for (let q = 0, cpt = 0, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T,
      rayonOuCote, pt1, pt2, figAire1, figAire2, figAireCorr, figAireCorr2, figAire2Corr, choixFig, choixFig2, choixFigAire2, angleCorr,
      aleaAngle, aleaLongueur, aleaRayon, aleaDemiDisque, aleaPente, aleaRapportHomothetie, d1, d2, d3, d4, poly, rect,
      objets, texte, texteCorr, paramsEnonce, monQcmPerimetre, monQcmAire, hauteur,
      reponsePerimetre1, reponsePerimetre2, reponsePerimetre3, reponseAire1, reponseAire2, reponseAire3;
      q < this.nbQuestions && cpt < 50;) {
      objets = []
      A = point(0, 0)
      B = point(randint(5, 10), 0)
      C = point(B.x, randint(5, 10, B.x))
      D = point(0, C.y)
      rect = polygone([A, B, C, D])
      rect.hachures = true
      rect.pointilles = 2
      reponsePerimetre1 = false
      reponsePerimetre2 = false
      reponsePerimetre3 = false
      reponseAire1 = false
      reponseAire2 = false
      reponseAire3 = false

      if (this.sup2 === 4) aireOuPerimetre = choice(['Aire', 'Perimetre'])

      switch (typesDeProblemes[q]) {
        case 1 : // Polygone inscrit dans rectangle
          E = A
          G = point(entreDeux((A.x + B.x) / 2, B.x), A.y)
          F = point(entreDeux(E.x, G.x), entreDeux(A.y, A.y + (D.y + A.y) / 2))
          H = point(entreDeux(G.x, B.x), entreDeux(A.y, A.y + (D.y + A.y) / 2))
          I = B
          J = point(entreDeux(H.x, B.x), entreDeux(H.y, C.y))
          K = point(B.x, entreDeux(J.y, C.y))
          L = point(entreDeux(A.x + (A.x + B.x) / 2, B.x), entreDeux(K.y, C.y))
          M = C
          N = point(entreDeux(A.x + (A.x + B.x) / 2, L.x), entreDeux(L.y, D.y))
          O = point(entreDeux(D.x, N.x), D.y)
          P = point(entreDeux(D.x, O.x), entreDeux(D.y, A.y + (D.y + A.y) / 2))
          Q = D
          R = point(entreDeux(A.x, P.x), entreDeux(P.y, A.y + (D.y + A.y) / 2))
          T = point(entreDeux(A.x, F.x), entreDeux(F.y, A.y + (D.y + A.y) / 2))
          S = point(A.x, entreDeux(R.y, T.y))

          poly = polygone(E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          // objets.push(rect)
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire1 = true
          }
          break
        case 2: // Rectangle inscrit dans polygone
          E = A
          G = point(entreDeux((A.x + B.x) / 2, B.x), A.y)
          F = point(entreDeux(E.x, G.x), entreDeux(A.y, A.y - (D.y + A.y) / 2))
          H = point(entreDeux(G.x, B.x), entreDeux(A.y, A.y - (D.y + A.y) / 2))
          I = B
          J = point(entreDeux(B.x, B.x + (A.x + B.x) / 2), entreDeux(I.y, (I.y + C.y) / 2))
          K = point(B.x, entreDeux(B.y, C.y))
          L = point(entreDeux(B.x, J.x), C.y)
          N = point(entreDeux(D.x, (C.x + D.x) / 2), C.y)
          M = point(entreDeux(N.x, L.x), entreDeux(D.y, D.y + (D.y + A.y) / 2))
          O = point(entreDeux(D.x, N.x), entreDeux(D.y, D.y + (D.y + A.y) / 2))
          P = point(entreDeux(A.x - (A.x + B.x) / 2, A.x), D.y)
          Q = point(A.x, entreDeux(A.y, D.y))
          R = point(entreDeux(A.x - (A.x + B.x) / 2, A.x), entreDeux(Q.y, A.y))
          poly = polygone(E, F, G, H, I, J, K, L, M, N, O, P, Q, R)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: min(P.x, R.x) - 0.5, ymin: min(F.y, H.y) - 0.5, xmax: max(J.x, L.x) + 0.5, ymax: max(M.y, O.y) + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire2 = true
          }
          break
        case 3: // Deux demi-disques alternés qui s'emboîtent
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = arrondi((min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L))) / 2)
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote
              break
          }

          figAire1 = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          if (choixFig2 === 1) paramsEnonce.xmax = rayonOuCote + B.x + 0.5
          if (choixFig2 === 3) paramsEnonce.xmin = -0.5 - rayonOuCote

          figAire2 = arc(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -180, false, 'white', 'black', 1.1)
          M = rotation(pt2, pt1, 60)
          N = segment(M, pt1, 'black')
          N.epaisseur = 2
          O = rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -60)
          P = segment(O, choixFigAire2[choixFig2][1], 'black')
          P.epaisseur = 2
          objets.push(figAire1, figAire2, N, codageSegment(M, pt1, '|||'), P, codageSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre autant de surface que la figure coloriée. Donc, la figure coloriée a une aire égale à celle du rectangle hachuré.' : ''
          if ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre')) {
            objets = []
            figAire1 = arc(pt2, pt1, 180, false, 'white', 'black', 1.1)
            figAireCorr = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
            angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
            angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
            figAireCorr2 = arc(rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], angleCorr), choixFigAire2[choixFig2][1], -180, false, color[q], 'black', 0.5)
            objets.push(poly, figAire1, figAire2, N, codageSegment(M, pt1, '|||'), P, codageSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
            objets.push(translationPuisRotationAnimees(q, figAireCorr, vecteur(pt1, choixFigAire2[choixFig2][1]), figAireCorr2, choixFigAire2[choixFig2][1], -angleCorr))
            paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
            paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
            texteCorr += mathalea2d(paramsEnonce, objets)
            if (context.isHtml) {
              texteCorr += `<br><button class="btn ui labeled icon button"  style="margin:10px" onclick="document.getElementById('${figAireCorr.id}').style.visibility = 'visible',document.getElementById('${figAireCorr2.id}').style.visibility = 'hidden',
              setTimeout(function() {document.getElementById('${figAireCorr.id}').style.visibility = 'hidden'}, 5000),
              setTimeout(function() {document.getElementById('${figAireCorr2.id}').style.visibility = 'visible'}, 5000),document.getElementById('translat${q}').beginElement()"><i class="redo circle icon"></i>Relancer l'animation de la comparaison d'aires </button>`
            }
          }
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire3 = true
          }
          break
        case 4: // Deux demi-disques alternés qui ne s'emboîtent pas
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          aleaDemiDisque = choice([true, false])
          aleaRayon = randint(2, 3)
          rayonOuCote = arrondi((min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L))) / 2)
          rayonOuCote = aleaDemiDisque ? rayonOuCote : rayonOuCote / aleaRayon
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote
              break
          }
          figAire1 = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          paramsEnonce.xmax = choixFig2 === 1 ? rayonOuCote + B.x + 0.5 : paramsEnonce.xmax
          paramsEnonce.xmin = choixFig2 === 3 ? -0.5 - rayonOuCote : paramsEnonce.xmin
          figAire2 = arc(aleaDemiDisque ? homothetie(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 1 / aleaRayon) : choixFigAire2[choixFig2][0], aleaDemiDisque ? choixFigAire2[choixFig2][1] : homothetie(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], aleaRayon), -180, false, 'white', 'black', 1.1)
          objets.push(figAire1, figAire2, rect)
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += aleaDemiDisque
            ? ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : '')
            : ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : '')
          if ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre')) {
            objets = []
            figAire1 = arc(pt2, pt1, 180, false, 'white', 'black', 1.1)
            figAireCorr = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
            angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
            angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
            figAireCorr2 = arc(rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], angleCorr), choixFigAire2[choixFig2][1], -180, false, color[q], 'black', 0.5)
            objets.push(poly, figAire1, figAire2, rect)
            objets.push(translationPuisRotationAnimees(q, figAireCorr, vecteur(pt1, choixFigAire2[choixFig2][1]), figAireCorr2, choixFigAire2[choixFig2][1], -angleCorr))
            paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
            paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
            texteCorr += mathalea2d(paramsEnonce, objets)
            if (context.isHtml) {
              texteCorr += `<br><button class="btn ui labeled icon button"  style="margin:10px" onclick="document.getElementById('${figAireCorr.id}').style.visibility = 'visible',document.getElementById('${figAireCorr2.id}').style.visibility = 'hidden',
              setTimeout(function() {document.getElementById('${figAireCorr.id}').style.visibility = 'hidden'}, 5000),
              setTimeout(function() {document.getElementById('${figAireCorr2.id}').style.visibility = 'visible'}, 5000),document.getElementById('translat${q}').beginElement()"><i class="redo circle icon"></i>Relancer l'animation de la comparaison d'aires </button>`
            }
          }
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire1 = !aleaDemiDisque
            reponseAire2 = aleaDemiDisque
          }
          break
        case 5: // Deux demi-disques en plus
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = arrondi((min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L))) / 2)
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote
              break
          }
          figAire1 = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
          paramsEnonce.xmax = choixFig2 === 1 ? rayonOuCote + B.x + 0.5 : paramsEnonce.xmax
          paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
          paramsEnonce.xmin = choixFig2 === 3 ? -0.5 - rayonOuCote : paramsEnonce.xmin

          figAire2 = arc(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], 180, false, color[q], 'black', 0.5)
          M = rotation(pt2, pt1, 60)
          N = segment(M, pt1, 'black')
          N.epaisseur = 2
          O = rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], 60)
          P = segment(O, choixFigAire2[choixFig2][1], 'black')
          P.epaisseur = 2
          objets.push(figAire1, figAire2, N, codageSegment(M, pt1, '|||'), P, codageSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire2 = true
          }
          break
        case 6: // Deux demi-disques en moins
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = arrondi((min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L))) / 2)
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote
              break
          }
          figAire1 = arc(pt2, pt1, -180, false, 'white', 'black', 1.1)
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
          paramsEnonce.xmax = choixFig2 === 1 ? rayonOuCote + B.x + 0.5 : paramsEnonce.xmax
          paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
          paramsEnonce.xmin = choixFig2 === 3 ? -0.5 - rayonOuCote : paramsEnonce.xmin

          figAire2 = arc(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -180, false, 'white', 'black', 1.1)
          M = rotation(pt2, pt1, -60)
          N = segment(M, pt1, 'black')
          N.epaisseur = 2
          O = rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -60)
          P = segment(O, choixFigAire2[choixFig2][1], 'black')
          P.epaisseur = 2
          objets.push(figAire1, figAire2, N, codageSegment(M, pt1, '|||'), P, codageSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire1 = true
          }
          break
        case 7: // Un quadrilatère inscrit dans le rectangle
          E = point(entreDeux(A.x, B.x), A.y)
          F = point(B.x, entreDeux(B.y, C.y))
          G = point(entreDeux(A.x, B.x), C.y)
          H = point(A.x, entreDeux(B.y, C.y))
          poly = polygone(E, F, G, H)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir moins de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, le rectangle hachuré a un périmètre plus grand que celui de la figure coloriée.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre1 = true
            reponseAire1 = true
          }
          break
        case 8: // Le rectangle inscrit dans un quadrilatère
          aleaPente = choice([0, 0.5])
          d1 = droiteParPointEtPente(A, -(aleaPente + randint(10, 50) / 100))
          d2 = droiteParPointEtPente(B, -(aleaPente - randint(50, 90) / 100))
          d3 = droiteParPointEtPente(C, -(aleaPente + randint(10, 50) / 100))
          d4 = droiteParPointEtPente(D, -(aleaPente - randint(50, 90) / 100))
          E = pointIntersectionDD(d1, d2)
          F = pointIntersectionDD(d2, d3)
          G = pointIntersectionDD(d3, d4)
          H = pointIntersectionDD(d4, d1)
          poly = polygone(E, F, G, H)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: H.x - 0.5, ymin: E.y - 0.5, xmax: F.x + 0.5, ymax: G.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire2 = true
          }
          break
        case 9: // Deux triangles alternés qui s'emboîtent
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = (min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L)))
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          aleaLongueur = choice([-1, 1])
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote - aleaLongueur
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + aleaLongueur + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + aleaLongueur + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote - aleaLongueur
              break
          }
          aleaAngle = choice([40, 50, 70, 80])
          Q = pointSurSegment(pt2, pt1, rayonOuCote + aleaLongueur)
          R = rotation(Q, pt2, -aleaAngle)
          figAire1 = polygone(pt2, pt1, R)
          figAire1.color = 'none'
          figAire1.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          figAire1.opaciteDeRemplissage = 0.5
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          paramsEnonce.xmax = choixFig2 === 1 ? rayonOuCote + B.x + 0.5 : paramsEnonce.xmax
          paramsEnonce.xmin = choixFig2 === 3 ? -0.5 - rayonOuCote : paramsEnonce.xmin
          S = pointSurSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], rayonOuCote + aleaLongueur)
          T = rotation(S, choixFigAire2[choixFig2][1], -aleaAngle)
          figAire2 = polygone(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], T)
          figAire2.color = 'none'
          figAire2.couleurDeRemplissage = colorToLatexOrHTML('white')
          figAire2.opaciteDeRemplissage = 1.1
          objets.push(figAire1, figAire2, segment(pt2, R), segment(pt1, R), codageSegment(pt2, R, '|||'), codageSegment(pt2, pt1, 'OO'), codageSegment(pt1, R, 'XX'), rect)
          objets.push(segment(choixFigAire2[choixFig2][0], T), segment(choixFigAire2[choixFig2][1], T), codageSegment(choixFigAire2[choixFig2][1], T, '|||'), codageSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 'OO'), codageSegment(choixFigAire2[choixFig2][0], T, 'XX'))
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre autant de surface que la figure coloriée. Donc, la figure coloriée a une aire égale à celle du rectangle hachuré.' : ''
          objets = []
          if ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre')) {
            figAire1 = polygone(pt2, pt1, R)
            figAire1.color = 'none'
            figAire1.couleurDeRemplissage = colorToLatexOrHTML('white')
            figAire1.opaciteDeRemplissage = 1.1
            figAireCorr = polygone(pt2, pt1, R)
            figAireCorr.couleurDeRemplissage = colorToLatexOrHTML(color[q])
            figAireCorr.opaciteDeRemplissage = 0.5
            angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
            angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
            figAireCorr2 = rotation(figAire2, choixFigAire2[choixFig2][0], angleCorr)
            figAireCorr2.couleurDeRemplissage = colorToLatexOrHTML(color[q])
            figAireCorr2.opaciteDeRemplissage = 0.5
            objets.push(poly, figAire1, figAire2, segment(pt2, R), segment(pt1, R), codageSegment(pt2, R, '|||'), codageSegment(pt2, pt1, 'OO'), codageSegment(pt1, R, 'XX'), rect)
            objets.push(segment(choixFigAire2[choixFig2][0], T), segment(choixFigAire2[choixFig2][1], T), codageSegment(choixFigAire2[choixFig2][1], T, '|||'), codageSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 'OO'), codageSegment(choixFigAire2[choixFig2][0], T, 'XX'))
            objets.push(translationPuisRotationAnimees(q, figAireCorr, vecteur(pt1, choixFigAire2[choixFig2][0]), figAireCorr2, choixFigAire2[choixFig2][0], -angleCorr))
            paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
            paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
            texteCorr += mathalea2d(paramsEnonce, objets)
            if (context.isHtml) {
              texteCorr += `<br><button class="btn ui labeled icon button"  style="margin:10px" onclick="document.getElementById('${figAireCorr.id}').style.visibility = 'visible',document.getElementById('${figAireCorr2.id}').style.visibility = 'hidden',
              setTimeout(function() {document.getElementById('${figAireCorr.id}').style.visibility = 'hidden'}, 5000),
              setTimeout(function() {document.getElementById('${figAireCorr2.id}').style.visibility = 'visible'}, 5000),document.getElementById('translat${q}').beginElement()"><i class="redo circle icon"></i>Relancer l'animation de la comparaison d'aires </button>`
            }
          }
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire3 = true
          }
          break
        case 10: // Deux triangles alternés qui ne s'emboîtent pas
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = (min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L)))
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          aleaLongueur = choice([-1, 1])
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote - aleaLongueur
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + aleaLongueur + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + aleaLongueur + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote - aleaLongueur
              break
          }
          aleaAngle = choice([40, 50, 70, 80])
          Q = pointSurSegment(pt2, pt1, rayonOuCote + aleaLongueur)
          R = rotation(Q, pt2, -aleaAngle)
          figAire1 = polygone(pt2, pt1, R)
          figAire1.color = 'none'
          figAire1.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          figAire1.opaciteDeRemplissage = 0.5
          choixFig2 = randint(0, 3, [choixFig])
          hauteur = longueur(R, projectionOrtho(R, droite(pt1, pt2))) // Longueur de la hauteur issue de R dans figAire1
          choixFigAire2 = [
            [E, M, arrondi(min(hauteur / longueur(B, C), longueur(E, B) / longueur(E, M)))], // Le dernier nombre est le rapport homothétique maximal pour ne pas que le triangle sorte du triangle.
            [G, N, arrondi(min(hauteur / longueur(A, B), longueur(G, C) / longueur(G, N)))],
            [I, O, arrondi(min(hauteur / longueur(B, C), longueur(I, D) / longueur(I, O)))],
            [K, P, arrondi(min(hauteur / longueur(A, B), longueur(K, A) / longueur(K, P)))]
          ]
          if (choixFig2 === 1) paramsEnonce.xmax = rayonOuCote + B.x + 0.5
          if (choixFig2 === 3) paramsEnonce.xmin = -0.5 - rayonOuCote
          S = pointSurSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], rayonOuCote + aleaLongueur)
          T = rotation(S, choixFigAire2[choixFig2][1], -aleaAngle)
          figAire2 = polygone(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], T)
          aleaRapportHomothetie = choice([0.7, 0.8, arrondi(min(1.2, choixFigAire2[choixFig2][2] - 0.01)), min(1.3, arrondi(choixFigAire2[choixFig2][2] - 0.01))])
          figAire2 = homothetie(figAire2, choixFigAire2[choixFig2][0], aleaRapportHomothetie)
          figAire2.color = 'none'
          figAire2.couleurDeRemplissage = colorToLatexOrHTML('white')
          figAire2.opaciteDeRemplissage = 1.1
          objets.push(figAire1, figAire2, segment(pt2, R), segment(pt1, R), rect)
          objets.push(homothetie(segment(choixFigAire2[choixFig2][0], T), choixFigAire2[choixFig2][0], aleaRapportHomothetie), homothetie(segment(choixFigAire2[choixFig2][1], T), choixFigAire2[choixFig2][0], aleaRapportHomothetie))
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += aleaRapportHomothetie < 1
            ? ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : '')
            : ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : '')
          if ((this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre')) {
            objets = []
            figAire1 = polygone(pt2, pt1, R)
            figAire1.color = 'none'
            figAire1.couleurDeRemplissage = colorToLatexOrHTML('white')
            figAire1.opaciteDeRemplissage = 1.1
            figAireCorr = polygone(pt2, pt1, R)
            figAireCorr.couleurDeRemplissage = colorToLatexOrHTML(color[q])
            figAireCorr.opaciteDeRemplissage = 0.5
            figAire2Corr = homothetie(figAire2, choixFigAire2[choixFig2][0], 1 / aleaRapportHomothetie)
            angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
            angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
            figAireCorr2 = rotation(figAire2Corr, choixFigAire2[choixFig2][0], angleCorr)
            figAireCorr2.couleurDeRemplissage = colorToLatexOrHTML(color[q])
            figAireCorr2.opaciteDeRemplissage = 0.5
            objets.push(poly, figAire1, figAire2, segment(pt2, R), segment(pt1, R), rect)
            objets.push(homothetie(segment(choixFigAire2[choixFig2][0], T), choixFigAire2[choixFig2][0], aleaRapportHomothetie), homothetie(segment(choixFigAire2[choixFig2][1], T), choixFigAire2[choixFig2][0], aleaRapportHomothetie))
            objets.push(translationPuisRotationAnimees(q, figAireCorr, vecteur(pt1, choixFigAire2[choixFig2][0]), figAireCorr2, choixFigAire2[choixFig2][0], -angleCorr))
            paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
            paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
            texteCorr += mathalea2d(paramsEnonce, objets)
            if (context.isHtml) {
              texteCorr += `<br><button class="btn ui labeled icon button"  style="margin:10px" onclick="document.getElementById('${figAireCorr.id}').style.visibility = 'visible',document.getElementById('${figAireCorr2.id}').style.visibility = 'hidden',
              setTimeout(function() {document.getElementById('${figAireCorr.id}').style.visibility = 'hidden'}, 5000),
              setTimeout(function() {document.getElementById('${figAireCorr2.id}').style.visibility = 'visible'}, 5000),document.getElementById('translat${q}').beginElement()"><i class="redo circle icon"></i>Relancer l'animation de la comparaison d'aires </button>`
            }
          }
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire1 = !(aleaRapportHomothetie < 1)
            reponseAire2 = aleaRapportHomothetie < 1
          }
          break
        case 11: // Deux triangles en plus
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 0.5
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = (min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L)))
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          aleaLongueur = choice([-1, 1])
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              paramsEnonce.ymin = -0.5 - rayonOuCote - aleaLongueur
              break
            case 1:
              pt1 = N
              pt2 = G
              paramsEnonce.xmax = rayonOuCote + aleaLongueur + B.x + 0.5
              break
            case 2:
              pt1 = O
              pt2 = I
              paramsEnonce.ymax = rayonOuCote + aleaLongueur + C.y + 0.5
              break
            case 3:
              pt1 = P
              pt2 = K
              paramsEnonce.xmin = -0.5 - rayonOuCote - aleaLongueur
              break
          }
          aleaAngle = choice([40, 50, 70, 80, 100, 110])
          Q = pointSurSegment(pt2, pt1, rayonOuCote + aleaLongueur)
          R = rotation(Q, pt2, -aleaAngle)
          switch (choixFig) {
            case 0:
            case 2:
              paramsEnonce.xmin = -0.5 + min(A.x, R.x)
              paramsEnonce.xmax = 0.5 + max(B.x, R.x)
              break
            case 1 :
            case 3 :
              paramsEnonce.ymin = -0.5 + min(A.y, R.y)
              paramsEnonce.ymax = 0.5 + max(D.y, R.y)
              break
          }
          figAire1 = polygone(pt2, pt1, R)
          figAire1.color = 'none'
          figAire1.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          figAire1.opaciteDeRemplissage = 0.5
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          S = pointSurSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], rayonOuCote + aleaLongueur)
          T = rotation(S, choixFigAire2[choixFig2][1], aleaAngle)
          switch (choixFig2) {
            case 0 :
              paramsEnonce.xmin = -0.5 + min(A.x, T.x, R.x)
              paramsEnonce.xmax = 0.5 + max(B.x, T.x, R.x)
              paramsEnonce.ymin = -0.5 - rayonOuCote - aleaLongueur
              break
            case 1 :
              paramsEnonce.ymin = -0.5 + min(A.y, T.y, R.y)
              paramsEnonce.ymax = 0.5 + max(D.y, T.y, R.y)
              paramsEnonce.xmax = rayonOuCote + aleaLongueur + B.x + 0.5
              break
            case 2 :
              paramsEnonce.xmin = -0.5 + min(A.x, T.x, R.x)
              paramsEnonce.xmax = 0.5 + max(B.x, T.x, R.x)
              paramsEnonce.ymax = rayonOuCote + aleaLongueur + C.y + 0.5
              break
            case 3 :
              paramsEnonce.ymin = -0.5 + min(A.y, T.y, R.y)
              paramsEnonce.ymax = 0.5 + max(D.y, T.y, R.y)
              paramsEnonce.xmin = -0.5 - rayonOuCote - aleaLongueur
              break
          }
          figAire2 = polygone(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], T)
          figAire2.color = 'none'
          figAire2.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          figAire2.opaciteDeRemplissage = 0.5
          objets.push(figAire1, figAire2, segment(pt2, R), segment(pt1, R), codageSegment(pt2, R, '|||'), codageSegment(pt2, pt1, 'OO'), codageSegment(pt1, R, 'XX'), rect)
          objets.push(segment(choixFigAire2[choixFig2][0], T), segment(choixFigAire2[choixFig2][1], T), codageSegment(choixFigAire2[choixFig2][1], T, '|||'), codageSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 'OO'), codageSegment(choixFigAire2[choixFig2][0], T, 'XX'))
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire2 = true
          }
          break
        case 12: // Deux triangles en moins
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = colorToLatexOrHTML(color[q])
          poly.opaciteDeRemplissage = 1.1
          poly.color = 'none'
          objets.push(poly)
          rayonOuCote = (min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L)))
          M = translation(E, vecteur(rayonOuCote, 0))
          N = translation(G, vecteur(0, rayonOuCote))
          O = translation(I, vecteur(-rayonOuCote, 0))
          P = translation(K, vecteur(0, -rayonOuCote))
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          aleaLongueur = -1
          choixFig = randint(0, 3)
          switch (choixFig) {
            case 0:
              pt1 = M
              pt2 = E
              break
            case 1:
              pt1 = N
              pt2 = G
              break
            case 2:
              pt1 = O
              pt2 = I
              break
            case 3:
              pt1 = P
              pt2 = K
              break
          }
          aleaAngle = choice([40, 50, 70, 80, 100, 110])
          Q = pointSurSegment(pt2, pt1, rayonOuCote + aleaLongueur)
          R = rotation(Q, pt2, aleaAngle)
          if (!R.estDansQuadrilatere(A, B, C, D)) {
            aleaAngle = 180 - aleaAngle
            R = rotation(Q, pt2, aleaAngle)
          }
          figAire1 = polygone(pt2, pt1, R)
          figAire1.color = 'none'
          figAire1.couleurDeRemplissage = colorToLatexOrHTML('white')
          figAire1.opaciteDeRemplissage = 1.1
          choixFig2 = randint(0, 3, [choixFig])
          choixFigAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          S = pointSurSegment(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], rayonOuCote + aleaLongueur)
          T = rotation(S, choixFigAire2[choixFig2][0], aleaAngle)
          if (!T.estDansQuadrilatere(A, B, C, D) || T.estDansTriangle(pt2, pt1, R) || R.estDansTriangle(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], T)) {
            // Si les triangles se croisent, on crée le symétrique du premier par rapport au centre du rectangle.
            S = milieu(A, C)
            choixFigAire2[choixFig2][1] = homothetie(pt1, S, -1)
            choixFigAire2[choixFig2][0] = homothetie(pt2, S, -1)
            T = homothetie(R, S, -1)
          }
          figAire2 = polygone(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], T)
          figAire2.color = 'none'
          figAire2.couleurDeRemplissage = colorToLatexOrHTML('white')
          figAire2.opaciteDeRemplissage = 1.1
          objets.push(figAire1, figAire2, segment(pt2, R), segment(pt1, R), codageSegment(pt2, R, '|||'), codageSegment(pt2, pt1, 'OO'), codageSegment(pt1, R, 'XX'), rect)
          objets.push(segment(choixFigAire2[choixFig2][0], T), segment(choixFigAire2[choixFig2][1], T), codageSegment(choixFigAire2[choixFig2][1], T, 'XX'), codageSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 'OO'), codageSegment(choixFigAire2[choixFig2][0], T, '|||'))
          texte = mathalea2d(paramsEnonce, objets)
          // Correction
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
          // QCM interactif
          if (this.interactif) {
            reponsePerimetre2 = true
            reponseAire1 = true
          }
          break
      }
      // Gestion des QCM interactifs
      if (this.interactif) {
        if (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') {
          this.autoCorrection[compteurInteractif] = {
            enonce: 'Peu importe',
            propositions: [
              {
                texte: 'Le rectangle hachuré',
                statut: reponsePerimetre1, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: ''
              },
              {
                texte: 'La figure coloriée',
                statut: reponsePerimetre2, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: ''
              },
              {
                texte: 'Autant l\'un que l\'autre',
                statut: reponsePerimetre3, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: ''
              }
            ]
          }
          monQcmPerimetre = propositionsQcm(this, compteurInteractif)
          compteurInteractif++
        }
        if (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') {
          this.autoCorrection[compteurInteractif] = {
            enonce: 'Peu importe',
            propositions: [
              {
                texte: 'Le rectangle hachuré',
                statut: reponseAire1, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: ''
              },
              {
                texte: 'La figure coloriée',
                statut: reponseAire2, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: ''
              },
              {
                texte: 'Autant l\'un que l\'autre',
                statut: reponseAire3, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: ''
              }
            ]
          }
          monQcmAire = propositionsQcm(this, compteurInteractif)
          compteurInteractif++
        }
      }
      // Gestion des énoncés
      if (this.sup2 === 3) texte += numAlpha(0)
      if (this.sup2 === 1 || this.sup2 === 3 || aireOuPerimetre !== 'Aire') {
        texte += 'Entre le rectangle hachuré et la figure coloriée, lequel a le plus grand périmètre ?'
        if (this.interactif) {
          texte += monQcmPerimetre.texte
        }
      }
      if (this.sup2 === 3) texte += '<br>' + numAlpha(1)
      if (this.sup2 === 2 || this.sup2 === 3 || aireOuPerimetre !== 'Perimetre') {
        texte += 'Entre le rectangle hachuré et la figure coloriée, lequel a la plus grande aire ?'
        if (this.interactif) {
          texte += monQcmAire.texte
        }
      }
      if (this.questionJamaisPosee(q, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }

  this.besoinFormulaireTexte = ['Type de figures',
  `Nombres séparés par des tirets :
  1 : Polygone inscrit dans un rectangle
  2 : Rectangle inscrit dans un polygone
  3 : Rectangle avec deux demi-disques alternés qui s'emboitent
  4 : Rectangle avec deux demi-disques alternés qui ne s'emboitent pas
  5 : Rectangle avec deux demi-disques en plus
  6 : Rectangle avec deux demi-disques en moins
  7 : Quadrilatère inscrit dans un rectangle
  8 : Rectangle inscrit dans un quadrilatère
  9 : Rectangle avec deux triangles alternés qui s'emboîtent
  10 : Rectangle avec deux triangles alternés qui ne s'emboîtent pas
  11 : Rectangle avec deux triangles en plus
  12 : Rectangle avec deux triangles en moins
  13 : Mélange `]
  this.besoinFormulaire2Numerique = ['Périmètres et/ou aires', 4, '1 : Que des périmètres\n2 : Que des aires\n3 : Les deux\n4 : L\'un ou l\'autre au hasard des questions']
}
