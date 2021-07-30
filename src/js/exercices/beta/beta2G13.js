import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { repere2, mathalea2d, point, tracePoint, labelPoint, segment, vecteur, nomVecteurParPosition } from '../../modules/2d.js'

export const titre = 'Déterminer les coordonnées d’un vecteur.'

/**
 * @author Stéphane Guyon
 */
export default function calculercoordonneesvecteurs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, r, A, B, O, I, J, j, t, k, l, s, ux, uy, xA, yA, xB, yB, vi, vj, Vi, Vj, nomi, nomj, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) {
        xA = randint(0, 4) * choice([-1, 1])
        yA = randint(0, 4) * choice([-1, 1])
        ux = randint(1, 4) * choice([-1, 1])
        uy = randint(1, 4) * choice([-1, 1])
        xB = xA + ux

        yB = yA + uy

        texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :'
        texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
        texte += '<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ '

        texteCorr = '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
        texteCorr += ' <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecritureParentheseSiNegatif(xA)}  \\\\${yB}-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$<br>`
        texteCorr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`
        r = repere2()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB, 'B') // On définit et on trace le point B
        t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
        l = labelPoint(A, B, 'red')// Variable qui trace les nom s A et B
        s = segment(A, B, 'red') // On trace en rouge [AB]
        O = point(0, 0, 'O')// On définit et on trace le point O
        I = point(1, 0)// On définit sans tracer le point I
        J = point(0, 1)// On définit sans tracer le point J
        k = segment(O, I, 'red') // Variable qui trace [OI] en rouge
        j = segment(O, J, 'red')// Variable qui trace [OJ] en rouge
        s.styleExtremites = '->'// Variable qui transforme [AB] en vecteur
        k.styleExtremites = '->'// Variable qui transforme [OI] en vecteur
        j.styleExtremites = '->'// Variable qui transforme [OJ] en vecteur
        s.epaisseur = 3// Variable qui grossit le tracé du vecteur AB
        k.epaisseur = 3// Variable qui grossit le tracé du vecteur OI
        j.epaisseur = 3// Variable qui grossit le tracé du vecteur OJ
        vi = vecteur(O, I) // Variable qui définit vecteur OI
        vj = vecteur(O, J)// Variable qui définit vecteur OJ
        // nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        // nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
        nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
        nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
        texteCorr += mathalea2d({
          xmin: -9,
          ymin: -9,
          xmax: 9,
          ymax: 9
        }, r, t, l, k, j, s, nomi, nomj)// On trace le graphique
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
