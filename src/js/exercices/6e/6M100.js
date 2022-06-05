import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, contraindreValeur, combinaisonListes, arrondi, numAlpha } from '../../modules/outils.js'
import { afficherTempo, arc, cacherTempo, codeSegment, longueur, mathalea2d, point, polygone, rotation, rotationAnimee, segment, translation, translationAnimee, vecteur } from '../../modules/2d.js'
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

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []

    function entreDeux (a, b) { // Trouve un nombre décimal entre a et b, sans être trop près de a et de b
      if (a < b) return arrondi(a + (b - a) * randint(10, 90) / 100, 2)
      else return arrondi(b + (a - b) * randint(10, 90) / 100, 2)
    }

    /* if (typeof this.sup === 'number') {
    // Si c'est un nombre c'est qu'il n'y a qu'un seul choix pour le nombre d'étapes
      nombreTotalEtapes[0] = contraindreValeur(1, 7, this.sup, 5)
    } else {
      nombreTotalEtapes = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < nombreTotalEtapes.length; i++) {
        nombreTotalEtapes[i] = contraindreValeur(1, 7, parseInt(nombreTotalEtapes[i]), 5)
      }
    }
    nombreTotalEtapes = combinaisonListes(nombreTotalEtapes, this.nbQuestions)
    */
    let typesDeProblemes = []
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est qu'il n'y a qu'un seul choix pour le nombre d'étapes
      typesDeProblemes[0] = contraindreValeur(1, 3, this.sup, 1)
    } else {
      typesDeProblemes = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < typesDeProblemes.length; i++) {
        typesDeProblemes[i] = contraindreValeur(1, 3, parseInt(typesDeProblemes[i]), 1)
      }
    }
    typesDeProblemes = combinaisonListes(typesDeProblemes, this.nbQuestions)

    // typesDeProblemes = combinaisonListes([1, 2, 3], this.nbQuestions)

    for (let q = 0, cpt = 0, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, rayon, centreArc, extremiteArc, arcAire1, arcAire2, arcAireCorr, arcAireCorr2, choixArc, choixArc2, choixArcAire2, angleCorr, poly, rect, objets, texte, texteCorr, paramsEnonce; q < this.nbQuestions && cpt < 50;) {
      objets = []
      A = point(0, 0)
      switch (typesDeProblemes[q]) {
        case 1 :
          B = point(randint(5, 10), 0)
          C = point(B.x, randint(5, 10, B.x))
          D = point(0, C.y)
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
          poly.couleurDeRemplissage = 'blue'
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly)
          rect = polygone(A, B, C, D)
          rect.hachures = true
          rect.pointilles = 2
          objets.push(rect)
          paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          texte += numAlpha(0) + 'Entre le rectangle hachuré et la figure coloriée, lequel a le plus grand périmètre ?<br>'
          texte += numAlpha(1) + 'Entre le rectangle hachuré et la figure coloriée, lequel a la plus grande aire ?'
          texteCorr = numAlpha(0) + 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.'
          texteCorr += numAlpha(1) + 'Le rectangle hachuré couvre plus de surface que la figure coloriée. Donc, le rectangle hachuré a une aire plus grande que celle de la figure coloriée.'
          break
        case 2:
          B = point(randint(5, 10), 0)
          C = point(B.x, randint(5, 10, B.x))
          D = point(0, C.y)
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
          poly.couleurDeRemplissage = 'blue'
          poly.opaciteDeRemplissage = 0.5
          objets.push(poly)
          rect = polygone(A, B, C, D)
          rect.hachures = true
          rect.pointilles = 2
          objets.push(rect)
          paramsEnonce = { xmin: min(P.x, R.x) - 0.5, ymin: min(F.y, H.y) - 0.5, xmax: max(J.x, L.x) + 0.5, ymax: max(M.y, O.y) + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          texte = mathalea2d(paramsEnonce, objets)
          texte += numAlpha(0) + 'Entre le rectangle hachuré et la figure coloriée, lequel a le plus grand périmètre ?<br>'
          texte += numAlpha(1) + 'Entre le rectangle hachuré et la figure coloriée, lequel a la plus grande aire ?'
          texteCorr = numAlpha(0) + 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.<br>'
          texteCorr += numAlpha(1) + 'Le rectangle hachuré couvre moins de surface que la figure coloriée. Donc, la figure coloriée a une aire plus grande que celle du rectangle hachuré.'
          break
        case 3:
          B = point(randint(5, 10), 0)
          C = point(B.x, randint(5, 10, B.x))
          D = point(0, C.y)
          E = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), A.y)
          F = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), A.y)
          G = point(B.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          H = point(B.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          I = point(entreDeux(B.x, A.x + 2 * (B.x - A.x) / 3), D.y)
          J = point(entreDeux(A.x, A.x + (B.x - A.x) / 3), D.y)
          K = point(A.x, entreDeux(C.y, B.y + 2 * (C.y - B.y) / 3))
          L = point(A.x, entreDeux(B.y, B.y + (C.y - B.y) / 3))
          poly = polygone(A, B, C, D)
          poly.couleurDeRemplissage = 'red'
          poly.opaciteDeRemplissage = 0.5
          poly.color = ''
          objets.push(poly)
          rayon = arrondi((min(longueur(E, F), longueur(G, H), longueur(I, J), longueur(K, L))) / 2)
          M = translation(E, vecteur(rayon, 0))
          N = translation(G, vecteur(0, rayon))
          O = translation(I, vecteur(-rayon, 0))
          P = translation(K, vecteur(0, -rayon))
          paramsEnonce = { xmin: -0.5 - rayon, ymin: -0.5, xmax: B.x + 0.5, ymax: C.y + 0.5, pixelsParCm: 30, scale: 0.7, mainlevee: false }
          choixArc = randint(0, 3)
          switch (choixArc) {
            case 0:
              centreArc = M
              extremiteArc = E
              paramsEnonce.ymin = -0.5 - rayon
              break
            case 1:
              centreArc = N
              extremiteArc = G
              paramsEnonce.xmax = rayon + B.x + 0.5
              break
            case 2:
              centreArc = O
              extremiteArc = I
              paramsEnonce.ymax = rayon + C.y + 0.5
              break
            case 3:
              centreArc = P
              extremiteArc = K
              paramsEnonce.xmin = -0.5 - rayon
              break
          }

          arcAire1 = arc(extremiteArc, centreArc, 180, false, 'red', 'black', 0.5)
          choixArc2 = randint(0, 3, [choixArc])
          choixArcAire2 = [
            [E, M],
            [G, N],
            [I, O],
            [K, P]
          ]
          paramsEnonce.xmax = choixArc2 === 1 ? rayon + B.x + 0.5 : paramsEnonce.xmax
          paramsEnonce.xmin = choixArc2 === 3 ? -0.5 - rayon : paramsEnonce.xmin

          angleCorr = choixArc2 - choixArc < 0 ? choixArc2 - choixArc + 4 : choixArc2 - choixArc
          angleCorr = angleCorr === 1 ? 90 : angleCorr === 2 ? 0 : -90
          arcAire2 = arc(choixArcAire2[choixArc2][0], choixArcAire2[choixArc2][1], -180, false, 'white', 'black', 1.1)
          M = rotation(extremiteArc, centreArc, 60)
          N = segment(M, centreArc, 'black')
          N.epaisseur = 2
          O = rotation(choixArcAire2[choixArc2][0], choixArcAire2[choixArc2][1], -60)
          P = segment(O, choixArcAire2[choixArc2][1], 'black')
          P.epaisseur = 2
          rect = polygone(A, B, C, D)
          rect.hachures = true
          rect.pointilles = 2
          objets.push(arcAire1, arcAire2, N, codeSegment(M, centreArc, '|||'), P, codeSegment(O, choixArcAire2[choixArc2][1], '|||'), rect)
          texte = mathalea2d(paramsEnonce, objets)
          texte += numAlpha(0) + 'Entre le rectangle hachuré et la figure coloriée, lequel a le plus grand périmètre ?<br>'
          texte += numAlpha(1) + 'Entre le rectangle hachuré et la figure coloriée, lequel a la plus grande aire ?'
          texteCorr = numAlpha(0) + 'Il faut parcourir plus de chemin pour effectuer le tour de la figure coloriée que le tour du rectangle hachuré. Donc, la figure coloriée a un périmètre plus grand que celui du rectangle hachuré.<br>'
          texteCorr += numAlpha(1) + 'Le rectangle hachuré couvre autant de surface que la figure coloriée. Donc, la figure coloriée a une aire égale à celle du rectangle hachuré.'
          objets = []
          arcAire1 = arc(extremiteArc, centreArc, 180, false, 'white', 'black', 1.1)
          arcAireCorr = arc(extremiteArc, centreArc, 180, false, 'red', 'black', 0.5)
          arcAireCorr2 = arc(rotation(choixArcAire2[choixArc2][0], choixArcAire2[choixArc2][1], angleCorr), choixArcAire2[choixArc2][1], -180, false, 'red', 'black', 0.5)
          objets.push(poly, arcAire1, arcAire2, N, codeSegment(M, centreArc, '|||'), P, codeSegment(O, choixArcAire2[choixArc2][1], '|||'), rect)
          objets.push(translationAnimee([arcAireCorr], vecteur(centreArc, choixArcAire2[choixArc2][1]), 'begin="2s" dur="5s" "end=7s" repeatCount="1" fill="freeze" id="toto"'))
          cacherTempo(arcAireCorr, 7, 0, 1)
          afficherTempo(arcAireCorr2, 7, 10, 1)
          objets.push(rotationAnimee([arcAireCorr2], choixArcAire2[choixArc2][1], -angleCorr, 'begin="toto.end" dur="5s" repeatCount="1" fill="freeze" id="titi" visibility="hidden"'))
          paramsEnonce.ymin = choixArc2 === 0 ? -0.5 - rayon : paramsEnonce.ymin
          paramsEnonce.ymax = choixArc2 === 1 ? rayon + C.y + 0.5 : paramsEnonce.ymax
          texteCorr += mathalea2d(paramsEnonce, objets)
          break
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

  this.besoinFormulaireTexte = ['Type d\'exo', 'Nombres séparés par des tirets\n1\n2\n3']
  /*
  this.besoinFormulaire2Numerique = ['Difficulté', 2, '1 : facile\n2 : difficile']
  this.besoinFormulaire3CaseACocher = ['Longueurs entières', true]
  this.besoinFormulaire4Texte = ['Choix des problèmes séparés par des tirets (1=longueur finale, 2=aire intermédiaire)']
*/
}
