import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, creerNomDePolygone, ecritureAlgebrique } from '../../modules/outils.js'
import { codageAngleDroit, codeSegments, mathalea2d, point, pointAdistance, polygone, rotation, segment, similitude, texteParPosition, translation, vecteur } from '../../modules/2d.js'
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

    // on choisit un nom pour les variables 1 et 2
    const variable1 = ['a', 'b', 'c', 'd', 'e', 'f']
    const inc1 = variable1[randint(0, variable1.length - 1)]
    const variable2 = ['t', 'u', 'v', 'w', 'y', 'z']
    const inc2 = variable2[randint(0, variable2.length - 1)]
    const l = randint(2, 4)
    const L = randint(5, 8)
    const schemas = []

    const typeQuestionsDisponibles = ['r1', 'r2', 'r3', 'c'] // On crée 4 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, A, B, C, D, a, E, F, G, H, I, J, quad, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      a = 8 * i
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'c':// Carré de côté une lettre
          A = point(a, 0, nom[0])
          B = pointAdistance(A, 4, 0, nom[1])
          C = rotation(A, B, -90, nom[2])
          D = rotation(B, A, 90, nom[3])
          quad = polygone(A, B, C, D)
          schemas[i] = mathalea2d({ xmin: -1, xmax: 8 * (i + 1), ymin: -1, ymax: 5, style: 'display: inline', pixelsParCm: 20, scale: 0.25 },
            quad, codageAngleDroit(A, B, C), codageAngleDroit(A, D, C), codageAngleDroit(D, C, B), codageAngleDroit(B, A, D), codeSegments('//', 'blue', [A, B, C, D, A]), texteParPosition(`${inc1}`, 2 + 8 * i, 4.7)
          )
          texteCorr = 'périmètre :'
          texteCorr += `<br>$p =${inc1}+${inc1}+${inc1}+${inc1}$`
          texteCorr += `<br>$p =4${inc1}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$A =${inc1}x${inc1}$`
          texteCorr += `<br>$A =${inc1}²$`
          break

        case 'r1': // Rectangle ayant une lettre pour Longueur et une autre lettre pour largeur
          E = point(a, 0, nom[4])
          F = pointAdistance(E, 6, 0, nom[5])
          G = similitude(E, F, -90, 2 / 3, nom[6])
          H = translation(G, vecteur(F, E), nom[7])
          quad = polygone(E, F, G, H)
          schemas[i] = mathalea2d({ xmin: -1, xmax: 8 * (i + 1), ymin: -1, ymax: 5, style: 'display: inline', pixelsParCm: 20, scale: 0.25 },
            quad, codageAngleDroit(E, F, G), codageAngleDroit(F, G, H), codageAngleDroit(G, H, E), codageAngleDroit(H, E, F), codeSegments('/', 'red', E, F, G, H), codeSegments('||', 'blue', F, G, H, E), texteParPosition(`${inc1}`, 3 + 8 * i, 4.7), texteParPosition(`${inc2}`, 8 * i - 0.7, 2)
          )
          texteCorr = 'périmètre :'
          texteCorr += `<br>$p =${inc1}+${inc2}+${inc1}+${inc2}$`
          texteCorr += `<br>$p =2${inc1}+2${inc2}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$A =${inc1}x${inc2}$`
          texteCorr += `<br>$A =${inc1}${inc2}$`
          break

        case 'r2': // Rectangle ayant une lettre pour Longueur et un nombre pour largeur, ou inversement
          E = point(a, 0, nom[4])
          F = pointAdistance(E, 6, 0, nom[5])
          G = similitude(E, F, -90, 2 / 3, nom[6])
          H = translation(G, vecteur(F, E), nom[7])
          quad = polygone(E, F, G, H)
          schemas[i] = mathalea2d({ xmin: -1, xmax: 8 * (i + 1), ymin: -1, ymax: 5, style: 'display: inline', pixelsParCm: 20, scale: 0.25 },
            quad, codageAngleDroit(E, F, G), codageAngleDroit(F, G, H), codageAngleDroit(G, H, E), codageAngleDroit(H, E, F), codeSegments('/', 'red', E, F, G, H), codeSegments('||', 'blue', F, G, H, E), texteParPosition(L, 3 + 8 * i, 4.7), texteParPosition(`${inc1}`, 8 * i - 0.7, 2)
          )
          texteCorr = 'périmètre :'
          texteCorr += `<br>$p =${L}+${inc1}+${L}+${inc1}$`
          texteCorr += `<br>$p =${2 * L}+2${inc1}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$A =Lx${inc1}$`
          texteCorr += `<br>$A =L${inc1}$`
          break
        case 'r3': // Rectangle ayant un nombre pour largeur et une somme de lettres pour Longueur
          E = point(a, 0, nom[4])
          F = pointAdistance(E, 6, 0, nom[5])
          G = similitude(E, F, -90, 2 / 3, nom[6])
          H = translation(G, vecteur(F, E), nom[7])
          I = point(8 * i + l, 3.7)
          J = point(8 * i + l, 4.3)
          quad = polygone(E, F, G, H)
          schemas[i] = mathalea2d({ xmin: -1, xmax: 8 * (i + 1), ymin: -1, ymax: 5, style: 'display: inline', pixelsParCm: 20, scale: 0.25 },
            quad, codageAngleDroit(E, F, G), codageAngleDroit(F, G, H), codageAngleDroit(G, H, E), codageAngleDroit(H, E, F), codeSegments('/', 'red', E, F, G, H), codeSegments('||', 'blue', F, G, H, E), segment(I, J), texteParPosition(`${inc1}`, 8 * i + l / 2, 4.7), texteParPosition(`${inc2}`, 6 + 8 * i - l / 4, 4.7), texteParPosition(l, 8 * i - 0.7, 2)
          )
          texteCorr = 'périmètre :'
          texteCorr += `<br>$p=${l} + ${inc1} + ${inc2} + ${l} + ${inc1} + ${inc2}$`
          texteCorr += `<br>$p =2\\times${l}+2\\times${inc1}+2\\times${inc2}$`
          texteCorr += `<br>$p =${2 * l}+2${inc1}+2${inc2}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$A =l'\\times'(${inc1}+${inc2})$`
          texteCorr += `<br>$A =l'\\times'${inc1}+l'\\times'${inc2}$`
          texteCorr += `<br>$A =l${inc1}+l${inc2}$`
          break
      }

      let texte = ''
      for (let j = 0; j < 4; j++) {
        texte += schemas[j]
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
