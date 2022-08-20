import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../modules/outils.js'
import { repere, point, tracePoint, labelPoint, segment, nomVecteurParPosition } from '../../modules/2d.js'

export const titre = 'Déterminer les coordonnées d\'un vecteur à partir des coordonnées de deux points'

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

    for (let i = 0, r, A, B, O, I, J, j, t, k, l, s, o, ux, uy, xA, yA, xB, yB, nomi, nomj, nomAB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
        texteCorr += ' <br>alors on a  $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecritureParentheseSiNegatif(xA)}  \\\\${yB}-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$<br>`
        texteCorr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`
        r = repere()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB, 'B') // On définit et on trace le point B
        t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
        l = labelPoint(A, B, 'red')// Variable qui trace les nom s A et B
        s = segment(A, B, 'red') // On trace en rouge [AB]
        O = point(0, 0, 'O')// On définit et on trace le point O
        o = labelPoint(O)
        I = point(1, 0)// On définit sans tracer le point I
        J = point(0, 1)// On définit sans tracer le point J
        k = segment(O, I) // Variable qui trace [OI] en rouge
        j = segment(O, J)// Variable qui trace [OJ] en rouge
        s.styleExtremites = '->'// Variable qui transforme [AB] en vecteur
        k.styleExtremites = '->'// Variable qui transforme [OI] en vecteur
        j.styleExtremites = '->'// Variable qui transforme [OJ] en vecteur
        s.epaisseur = 2// Variable qui grossit le tracé du vecteur AB
        k.epaisseur = 2// Variable qui grossit le tracé du vecteur OI
        j.epaisseur = 2// Variable qui grossit le tracé du vecteur OJ
        k.tailleExtremites = 3
        j.tailleExtremites = 3
        s.tailleExtremites = 3
        // vi = vecteur(O, I) // Variable qui définit vecteur OI
        // vj = vecteur(O, J)// Variable qui définit vecteur OJ
        // nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        // nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
        nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
        nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
        nomAB = nomVecteurParPosition('AB', (xA + xB) / 2 + 1, (yA + yB) / 2 + 1, 1, 0)
        texteCorr += mathalea2d({
          xmin: -9,
          ymin: -9,
          xmax: 9,
          ymax: 9
        }, r, t, l, k, j, s, o, nomi, nomj, nomAB)// On trace le graphique
      }
      if (this.sup === 3) {
        xA = randint(1, 4) * choice([-1, 1])
        yA = randint(1, 4) * choice([-1, 1])
        ux = randint(1, 4) * choice([-1, 1])
        uy = randint(1, 4) * choice([-1, 1])
        xB = xA + ux

        yB = yA + uy

        texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne le point  '
        texte += ` $A\\left(${xA};${yA}\\right)$ et le vecteur $\\vec{u}\\left(${ux};${uy}\\right)$`
        texte += '<br>Déterminer les coordonnées du point $B$ tel que  $\\vec{u}=\\overrightarrow{AB}$ '

        texteCorr = ' <br> Soit  $B(x_B;y_B)$ les coordonnées du point que nous cherchons à déterminer.'
        texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
        texteCorr += ' <br>alors on a  $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AB}\\begin{pmatrix} x_B-${ecritureParentheseSiNegatif(xA)}  \\\\y_B-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$<br>`
        if (xA < 0 | yA < 0) {
          texteCorr += ` ou encore : $\\overrightarrow{AB}\\begin{pmatrix} x_B${ecritureAlgebrique(-xA)}  \\\\y_B${ecritureAlgebrique(-yA)}\\end{pmatrix}$<br>`
        }
        texteCorr += 'On sait d\'après l\'énoncé que : $\\vec{u}=\\overrightarrow{AB}$, '
        texteCorr += `cela équivaut à résoudre : $\\begin{cases}x_B ${ecritureAlgebrique(-xA)} =${ux}\\\\ y_B${ecritureAlgebrique(-yA)}=${uy}\\end{cases}$`
        texteCorr += `<br>ou encore : $\\begin{cases}x_B  =${ux}${ecritureAlgebrique(xA)}\\\\ y_B=${uy}${ecritureAlgebrique(yA)}\\end{cases}$`
        texteCorr += `<br>Ce qui donne au final : $\\begin{cases}x_B  =${xB}\\\\ y_B=${yB}\\end{cases}$`
        texteCorr += `<br>On a donc: $B(${xB};${yB})$.`
        r = repere()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB, 'B') // On définit et on trace le point B
        t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
        l = labelPoint(A, B, 'red')// Variable qui trace les nom s A et B
        s = segment(A, B, 'red') // On trace en rouge [AB]
        O = point(0, 0, 'O')// On définit et on trace le point O
        o = labelPoint(O)
        I = point(1, 0)// On définit sans tracer le point I
        J = point(0, 1)// On définit sans tracer le point J
        k = segment(O, I) // Variable qui trace [OI] en rouge
        j = segment(O, J)// Variable qui trace [OJ] en rouge
        s.styleExtremites = '->'// Variable qui transforme [AB] en vecteur
        k.styleExtremites = '->'// Variable qui transforme [OI] en vecteur
        j.styleExtremites = '->'// Variable qui transforme [OJ] en vecteur
        s.epaisseur = 3// Variable qui grossit le tracé du vecteur AB
        k.epaisseur = 3// Variable qui grossit le tracé du vecteur OI
        j.epaisseur = 3// Variable qui grossit le tracé du vecteur OJ
        // vi = vecteur(O, I) // Variable qui définit vecteur OI
        // vj = vecteur(O, J)// Variable qui définit vecteur OJ
        // nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        // nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
        nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
        nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
        nomAB = nomVecteurParPosition('AB', (xA + xB) / 2 + 1, (yA + yB) / 2 + 1, 1, 0)
        texteCorr += mathalea2d({
          xmin: -9,
          ymin: -9,
          xmax: 9,
          ymax: 9
        }, r, t, l, k, j, s, o, nomi, nomj, nomAB)// On trace le graphique
      }
      if (this.sup === 2) {
        xA = randint(1, 4) * choice([-1, 1])
        yA = randint(1, 4) * choice([-1, 1])
        ux = randint(1, 4) * choice([-1, 1])
        uy = randint(1, 4) * choice([-1, 1])
        xB = xA + ux

        yB = yA + uy

        texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne le point  '
        texte += ` $B\\left(${xB};${yB}\\right)$ et le vecteur $\\vec{u}\\left(${ux};${uy}\\right)$`
        texte += '<br>Déterminer les coordonnées du point $A$ tel que  $\\vec{u}=\\overrightarrow{AB}$ '

        texteCorr = ' <br> Soit  $A(x_A;y_A)$ les coordonnées du point que nous cherchons à déterminer.'
        texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
        texteCorr += ' <br>alors on a  $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AB}\\begin{pmatrix} ${xB}-x_A  \\\\${yB}-y_A\\end{pmatrix}$<br>`
        texteCorr += 'On sait d\'après l\'énoncé que : $\\vec{u}=\\overrightarrow{AB}$, '
        texteCorr += `cela équivaut à résoudre : $\\begin{cases}${ecritureAlgebrique(xB)}-x_A =${ux}\\\\ ${ecritureAlgebrique(yB)}-y_A=${uy}\\end{cases}$`
        texteCorr += `<br>ou encore : $\\begin{cases}x_A  =${xB}${ecritureAlgebrique(-ux)}\\\\ y_A=${yB}${ecritureAlgebrique(-uy)}\\end{cases}$`
        texteCorr += `<br>Ce qui donne au final : $\\begin{cases}x_A  =${xA}\\\\ y_A=${yA}\\end{cases}$`
        texteCorr += `<br>On a donc: $A(${xA};${yA})$.`
        r = repere()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB, 'B') // On définit et on trace le point B
        t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
        l = labelPoint(A, B, 'red')// Variable qui trace les nom s A et B
        s = segment(A, B, 'red') // On trace en rouge [AB]
        O = point(0, 0, 'O')// On définit et on trace le point O
        o = labelPoint(O)
        I = point(1, 0)// On définit sans tracer le point I
        J = point(0, 1)// On définit sans tracer le point J
        k = segment(O, I) // Variable qui trace [OI] en rouge
        j = segment(O, J)// Variable qui trace [OJ] en rouge
        s.styleExtremites = '->'// Variable qui transforme [AB] en vecteur
        k.styleExtremites = '->'// Variable qui transforme [OI] en vecteur
        j.styleExtremites = '->'// Variable qui transforme [OJ] en vecteur
        s.epaisseur = 3// Variable qui grossit le tracé du vecteur AB
        k.epaisseur = 3// Variable qui grossit le tracé du vecteur OI
        j.epaisseur = 3// Variable qui grossit le tracé du vecteur OJ
        // vi = vecteur(O, I) // Variable qui définit vecteur OI
        // vj = vecteur(O, J)// Variable qui définit vecteur OJ
        // nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        // nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
        nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
        nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
        nomAB = nomVecteurParPosition('AB', (xA + xB) / 2 + 1, (yA + yB) / 2 + 1, 1, 0)
        texteCorr += mathalea2d({
          xmin: -9,
          ymin: -9,
          xmax: 9,
          ymax: 9
        }, r, t, l, k, j, s, o, nomi, nomj, nomAB)// On trace le graphique
      }
      if (this.questionJamaisPosee(i, xA, yA, xB, yB)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Situations différentes ', 3, '1 :Avec deux points\n 2 : Avec un point origine et un vecteur\n 3 :Avec un point extrémité et un vecteur']
}
