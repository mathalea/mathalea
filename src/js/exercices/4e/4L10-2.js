import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, creerNomDePolygone } from '../../modules/outils.js'
import { afficheCoteSegment, codageAngleDroit, codeSegments, mathalea2d, point, pointAdistance, polygone, polygoneAvecNom, rotation, segment, similitude, translation, vecteur } from '../../modules/2d.js'
export const titre = 'Donner l\'expression littérale d\'un périmètre et d\'une aire de quadrilatère'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '08/03/2022'

/**
 * Description didactique de l'exercice : Faire le lien entre le calcul littéral et son expression visuelle
 * @author Mireille Gain
 * Référence 4L10-2
*/
export default function AirePerimetrePolygone () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Exprimer le périmètre et l\'aire des rectangles et carrés suivants par une expression littérale réduite.'
  this.nbQuestions = 4 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(16, 'Q')
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const c = randint(2, 6)
    const Lo = randint(5, 7)
    // on choisit un nom pour les variables 1 et 2
    const variables1 = ['t', 'u', 'v', 'w', 'y', 'z']
    const inc1 = variables1[randint(0, variables1.length - 1)]
    const variables2 = ['a', 'b', 'c', 'd', 'e', 'f']
    const inc2 = variables2[randint(0, variables2.length - 1)]
    const l = randint(2, 4)

    const M = point(0, 0, nom[12])
    const N = pointAdistance(M, Lo, 0, nom[13])
    const O = similitude(M, N, -90, l / Lo, nom[14])
    const P = translation(O, vecteur(N, M), nom[15])
    const rectangle0 = polygone(M, N, O, P)
    const L0 = segment(M, P)
    const l0 = segment(P, O)

    const A = point(8, 0, nom[0])
    const B = pointAdistance(A, c, 0, nom[1])
    const C = rotation(A, B, -90, nom[2])
    const D = rotation(B, A, 90, nom[3])
    const carre = polygone(A, B, C, D)
    const ca = segment(D, C)

    const E = point(15, 0, nom[4])
    const F = pointAdistance(E, Lo, 0, nom[5])
    const G = similitude(E, F, -90, l / Lo, nom[6])
    const H = translation(G, vecteur(F, E), nom[7])
    const rectangle1 = polygone(E, F, G, H)
    const L1 = segment(E, H)
    const l1 = segment(H, G)

    const I = point(24, 0, nom[8])
    const J = pointAdistance(I, Lo, 0, nom[9])
    const K = similitude(I, J, -90, l / Lo, nom[10])
    const L = translation(K, vecteur(J, I), nom[11])
    const rectangle2 = polygone(I, J, K, L)
    const L2 = segment(I, L)
    const l2 = segment(L, K)

    this.introduction = mathalea2d({ xmin: -4, xmax: 32, ymin: -3, ymax: 7, pixelsParCm: 20, scale: 0.75, mainlevee: false },
      rectangle0, codageAngleDroit(M, N, O), codageAngleDroit(N, O, P), codageAngleDroit(O, P, M), codageAngleDroit(P, M, N), codeSegments('/', 'red', M, N, O, P), codeSegments('||', 'blue', N, O, P, M), afficheCoteSegment(L0, `${inc1}`, 1, 'red', 2, 0.5, 'black'), afficheCoteSegment(l0, `${inc2}`, 1, 'red', 2, 0.5, 'black'),
      carre, codageAngleDroit(A, B, C), codageAngleDroit(A, D, C), codageAngleDroit(D, C, B), codageAngleDroit(B, A, D), codeSegments('//', 'blue', [A, B, C, D, A]), afficheCoteSegment(ca, `${inc1}`, 1, 'red', 2, 0.5, 'black'),
      rectangle1, codageAngleDroit(E, F, G), codageAngleDroit(F, G, H), codageAngleDroit(G, H, E), codageAngleDroit(H, E, F), codeSegments('/', 'red', E, F, G, H), codeSegments('||', 'blue', F, G, H, E), afficheCoteSegment(L1, Lo, 1, 'red', 2, 0.5, 'black'), afficheCoteSegment(l1, `${inc2}`, 1, 'red', 2, 0.5, 'black'),
      rectangle2, codageAngleDroit(I, J, K), codageAngleDroit(J, K, L), codageAngleDroit(K, L, I), codageAngleDroit(L, I, J), codeSegments('/', 'orange', I, J, K, L), codeSegments('||', 'blue', J, K, L, I), afficheCoteSegment(L2, l, 1, 'red', 2, 0.5, 'black'), afficheCoteSegment(l2, `${inc1} + ${inc2}`, 1, 'red', 2, 0.5, 'black')
    )

    const typeQuestionsDisponibles = ['r1', 'r2', 'r3', 'c'] // On crée 4 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      texte = ''
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'r1': // Rectangle ayant une lettre pour Longueur et une autre lettre pour largeur
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'r2': // Rectangle ayant une lettre pour Longueur et un nombre pour largeur, ou inversement
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'r3': // Rectangle ayant un nombre pour largeur et une somme de lettres pour Longueur
          texteCorr = `Correction ${i + 1} de type 3`
          break
        case 'c':// Carré de côté une lettre
          texteCorr = `Correction ${i + 1} de type 3`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
