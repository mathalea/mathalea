import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, contraindreValeur, combinaisonListes, arrondi, numAlpha, choice } from '../../modules/outils.js'
import { afficherTempo, arc, cacherTempo, codeSegment, droiteParPointEtPente, homothetie, longueur, mathalea2d, point, pointIntersectionDD, pointSurSegment, polygone, rotation, rotationAnimee, segment, translation, translationAnimee, triangle2points1angle1longueur, vecteur } from '../../modules/2d.js'
import { min, max } from 'mathjs'
// import Grandeur from '../../modules/Grandeur.js'
// import { setReponse } from '../../modules/gestionInteractif.js'
// import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
// export const dateDePublication = '09/04/2022'
export const titre = 'Comparer aires et/ou périmètres de figures'
// export const interactifReady = true
// export const interactifType = 'mathLive'

export default function eeeee () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 1
  this.sup = 3
  this.sup2 = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    this.sup2 = contraindreValeur(1, 3, this.sup2, 3)
    function entreDeux (a, b) { // Trouve un nombre décimal entre a et b, sans être trop près de a et de b
      if (a < b) return arrondi(a + (b - a) * randint(10, 90) / 100, 2)
      else return arrondi(b + (a - b) * randint(10, 90) / 100, 2)
    }

    let typesDeProblemes = []
    const nbQuestionsDifferentes = 9
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est qu'il n'y a qu'un seul choix pour le nombre d'étapes
      typesDeProblemes[0] = contraindreValeur(1, nbQuestionsDifferentes, this.sup, nbQuestionsDifferentes)
    } else {
      typesDeProblemes = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < typesDeProblemes.length; i++) {
        typesDeProblemes[i] = contraindreValeur(1, nbQuestionsDifferentes, parseInt(typesDeProblemes[i]), nbQuestionsDifferentes)
      }
    }
    typesDeProblemes = combinaisonListes(typesDeProblemes, this.nbQuestions)

    // typesDeProblemes = combinaisonListes([4, 5], this.nbQuestions)
    const color = combinaisonListes(['red', 'blue', 'green', 'gray', 'pink', 'orange'], this.nbQuestions)

    for (let q = 0, cpt = 0, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, s1, s2,
      rayonOuCote, pt1, pt2, figAire1, figAire2, figAireCorr, figAireCorr2, choixFig, choixFig2, choixFigAire2, angleCorr,
      aleaAngle, aleaLongueur, aleaRayon, aleaDemiDisque, aleaPente, d1, d2, d3, d4, poly, rect,
      objets, texte, texteCorr, paramsEnonce; q < this.nbQuestions && cpt < 50;) {
      objets = []
      A = point(0, 0)
      B = point(randint(5, 10), 0)
      C = point(B.x, randint(5, 10, B.x))
      D = point(0, C.y)
      rect = polygone(A, B, C, D)
      rect.hachures = true
      rect.pointilles = 2

      switch (typesDeProblemes[q]) {
        case 1 : // Polygone inscrit dans rectangle
          E = point(entreDeux(A.x, (A.x + B.x) / 2), A.y)
          G = point(entreDeux((A.x + B.x) / 2, B.x), A.y)
          F = point(entreDeux(E.x, G.x), entreDeux(A.y, (D.y + A.y) / 2))
          H = point(entreDeux(G.x, B.x), entreDeux(A.y, (D.y + A.y) / 2))
          I = point(B.x, entreDeux(B.y, (B.y + C.y) / 2))
          J = point(entreDeux(H.x, C.x), entreDeux(I.y, C.y))
          K = point(B.x, entreDeux(I.y, C.y))
          L = point(entreDeux(J.x, C.x), C.y)
          N = point(entreDeux(D.x, (C.x + D.x) / 2), C.y)
          M = point(entreDeux(N.x, J.x), entreDeux(J.y, D.y))
          O = point(entreDeux(D.x, N.x), entreDeux((D.y + J.y) / 2, D.y))
          P = point(A.x, entreDeux((B.y + C.y) / 2, C.y))
          Q = point(entreDeux(A.x, O.x), entreDeux(A.y, P.y))
          R = point(A.x, entreDeux(A.y, Q.y))
          poly = polygone(E, F, G, H, I, J, K, L, M, N, O, P, Q, R)
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: min(P.x, R.x) - 0.5, ymin: min(F.y, H.y) - 0.5, xmax: max(J.x, L.x) + 0.5, ymax: max(M.y, O.y) + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          poly.color = ''
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
          paramsEnonce.xmax = choixFig2 === 1 ? rayonOuCote + B.x + 0.5 : paramsEnonce.xmax
          paramsEnonce.xmin = choixFig2 === 3 ? -0.5 - rayonOuCote : paramsEnonce.xmin

          angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
          angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
          figAire2 = arc(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -180, false, 'white', 'black', 1.1)
          M = rotation(pt2, pt1, 60)
          N = segment(M, pt1, 'black')
          N.epaisseur = 2
          O = rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -60)
          P = segment(O, choixFigAire2[choixFig2][1], 'black')
          P.epaisseur = 2
          objets.push(figAire1, figAire2, N, codeSegment(M, pt1, '|||'), P, codeSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre autant de surface que la figure coloriée. Donc, la figure coloriée a une aire égale à celle du rectangle hachuré.' : ''
          objets = []
          figAire1 = arc(pt2, pt1, 180, false, 'white', 'black', 1.1)
          figAireCorr = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
          figAireCorr2 = arc(rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], angleCorr), choixFigAire2[choixFig2][1], -180, false, color[q], 'black', 0.5)
          objets.push(poly, figAire1, figAire2, N, codeSegment(M, pt1, '|||'), P, codeSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          objets.push(translationAnimee([figAireCorr], vecteur(pt1, choixFigAire2[choixFig2][1]), 'begin="2s" dur="5s" "end=7s" repeatCount="1" fill="freeze" id="trans"'))
          cacherTempo(figAireCorr, 7, 0, 1)
          afficherTempo(figAireCorr2, 7, 10, 1)
          objets.push(rotationAnimee([figAireCorr2], choixFigAire2[choixFig2][1], -angleCorr, 'begin="trans.end" dur="5s" repeatCount="1" fill="freeze" id="titi" visibility="hidden"'))
          paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
          paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
          texteCorr += mathalea2d(paramsEnonce, objets)
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          poly.color = ''
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
          angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
          angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
          figAire2 = arc(aleaDemiDisque ? homothetie(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 1 / aleaRayon) : choixFigAire2[choixFig2][0], aleaDemiDisque ? choixFigAire2[choixFig2][1] : homothetie(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], aleaRayon), -180, false, 'white', 'black', 1.1)
          objets.push(figAire1, figAire2, rect)
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += aleaDemiDisque
            ? ((this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : '')
            : ((this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : '')
          objets = []
          figAire1 = arc(pt2, pt1, 180, false, 'white', 'black', 1.1)
          figAireCorr = arc(pt2, pt1, 180, false, color[q], 'black', 0.5)
          figAireCorr2 = arc(rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], angleCorr), choixFigAire2[choixFig2][1], -180, false, color[q], 'black', 0.5)
          objets.push(poly, figAire1, figAire2, rect)
          objets.push(translationAnimee([figAireCorr], vecteur(pt1, choixFigAire2[choixFig2][1]), 'begin="2s" dur="5s" "end=7s" repeatCount="1" fill="freeze" id="trans"'))
          cacherTempo(figAireCorr, 7, 0, 1)
          afficherTempo(figAireCorr2, 7, 10, 1)
          objets.push(rotationAnimee([figAireCorr2], choixFigAire2[choixFig2][1], -angleCorr, 'begin="trans.end" dur="5s" repeatCount="1" fill="freeze" id="titi" visibility="hidden"'))
          paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
          paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + C.y + 0.5 : paramsEnonce.ymax
          texteCorr += mathalea2d(paramsEnonce, objets)
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          poly.color = ''
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
          objets.push(figAire1, figAire2, N, codeSegment(M, pt1, '|||'), P, codeSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          poly.color = ''
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
          objets.push(figAire1, figAire2, N, codeSegment(M, pt1, '|||'), P, codeSegment(O, choixFigAire2[choixFig2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
          break
        case 7: // Un quadrilatère inscrit dans le rectangle
          E = point(entreDeux(A.x, B.x), A.y)
          F = point(B.x, entreDeux(B.y, C.y))
          G = point(entreDeux(A.x, B.x), C.y)
          H = point(A.x, entreDeux(B.y, C.y))
          poly = polygone(E, F, G, H)
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir moins de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, le rectangle hachuré a un périmètre plus grand que celui de la figure coloriée.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.' : ''
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly, rect)
          paramsEnonce = { xmin: H.x - 0.5, ymin: E.y - 0.5, xmax: F.x + 0.5, ymax: G.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.' : ''
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
          poly.couleurDeRemplissage = color[q]
          poly.opaciteDeRemplissage = 0.5
          poly.color = ''
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
          figAire1 = polygone(pt2, pt1, R)
          figAire1.color = ''
          figAire1.couleurDeRemplissage = color[q]
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
          angleCorr = choixFig2 - choixFig < 0 ? choixFig2 - choixFig + 4 : choixFig2 - choixFig
          angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
          S = pointSurSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], rayonOuCote + aleaLongueur)
          T = rotation(S, choixFigAire2[choixFig2][1], -aleaAngle)
          figAire2 = polygone(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], T)
          figAire2.color = ''
          figAire2.couleurDeRemplissage = 'white'
          figAire2.opaciteDeRemplissage = 1.1
          M = rotation(pt2, pt1, 60)
          N = segment(M, pt1, 'black')
          N.epaisseur = 2
          O = rotation(choixFigAire2[choixFig2][0], choixFigAire2[choixFig2][1], -60)
          P = segment(O, choixFigAire2[choixFig2][1], 'black')
          P.epaisseur = 2
          objets.push(figAire1, figAire2, segment(pt2, R), segment(pt1, R), codeSegment(pt2, R, '|||'), codeSegment(pt2, pt1, 'OO'), codeSegment(pt1, R, 'XX'), rect)
          objets.push(segment(choixFigAire2[choixFig2][0], T), segment(choixFigAire2[choixFig2][1], T), codeSegment(choixFigAire2[choixFig2][1], T, '|||'), codeSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 'OO'), codeSegment(choixFigAire2[choixFig2][0], T, 'XX'))
          texte = mathalea2d(paramsEnonce, objets)
          texteCorr = (this.sup2 === 3) ? numAlpha(0) : ''
          texteCorr += (this.sup2 === 1 || this.sup2 === 3) ? 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.' : ''
          texteCorr += (this.sup2 === 3) ? '<br>' + numAlpha(1) : ''
          texteCorr += (this.sup2 === 2 || this.sup2 === 3) ? 'Le rectangle hachuré couvre autant de surface que la figure coloriée. Donc, la figure coloriée a une aire égale à celle du rectangle hachuré.' : ''
          objets = []
          figAire1 = polygone(pt2, pt1, R)
          figAire1.color = ''
          figAire1.couleurDeRemplissage = 'white'
          figAire1.opaciteDeRemplissage = 1.1
          figAireCorr = polygone(pt2, pt1, R)
          figAireCorr.couleurDeRemplissage = color[q]
          figAireCorr.opaciteDeRemplissage = 0.5
          figAireCorr2 = rotation(figAire2, choixFigAire2[choixFig2][0], angleCorr)
          figAireCorr2.couleurDeRemplissage = color[q]
          figAireCorr2.opaciteDeRemplissage = 0.5
          objets.push(poly, figAire1, figAire2, segment(pt2, R), segment(pt1, R), codeSegment(pt2, R, '|||'), codeSegment(pt2, pt1, 'OO'), codeSegment(pt1, R, 'XX'), rect)
          objets.push(segment(choixFigAire2[choixFig2][0], T), segment(choixFigAire2[choixFig2][1], T), codeSegment(choixFigAire2[choixFig2][1], T, '|||'), codeSegment(choixFigAire2[choixFig2][1], choixFigAire2[choixFig2][0], 'OO'), codeSegment(choixFigAire2[choixFig2][0], T, 'XX'))
          objets.push(translationAnimee([figAireCorr], vecteur(pt1, choixFigAire2[choixFig2][0]), 'begin="2s" dur="5s" "end=7s" repeatCount="1" fill="freeze" id="trans"'))
          cacherTempo(figAireCorr, 7, 0, 1)
          afficherTempo(figAireCorr2, 7, 10, 1)
          objets.push(rotationAnimee([figAireCorr2], choixFigAire2[choixFig2][0], -angleCorr, 'begin="trans.end" dur="5s" repeatCount="1" fill="freeze" id="titi" visibility="hidden"'))
          paramsEnonce.ymin = choixFig2 === 0 ? -0.5 - rayonOuCote : paramsEnonce.ymin
          paramsEnonce.ymax = choixFig2 === 2 ? rayonOuCote + 2 + C.y + 0.5 : paramsEnonce.ymax
          texteCorr += mathalea2d(paramsEnonce, objets)
          break
      }
      texte += (this.sup2 === 3) ? numAlpha(0) : ''
      texte += (this.sup2 === 1 || this.sup2 === 3) ? 'Entre le rectangle hachuré et la figure coloriée, lequel a le plus grand périmètre ?' : ''
      texte += this.sup2 === 3 ? '<br>' + numAlpha(1) : ''
      texte += (this.sup2 === 2 || this.sup2 === 3) ? 'Entre le rectangle hachuré et la figure coloriée, lequel a la plus grande aire ?' : ''

      if (this.questionJamaisPosee(q, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }

  this.besoinFormulaireTexte = ['Type d\'exo', 'Nombres séparés par des tirets\n1\n2\n3']
  this.besoinFormulaire2Numerique = ['Périmètres et/ou aires', 3, '1 : Que des périmètres\n2 : Que des aires\n3 : Les deux']
  /*
  this.besoinFormulaire3CaseACocher = ['Longueurs entières', true]
  this.besoinFormulaire4Texte = ['Choix des problèmes séparés par des tirets (1=longueur finale, 2=aire intermédiaire)']
*/
}
