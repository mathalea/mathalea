import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../modules/outils.js'
import { repere2, mathalea2d, point, vecteur, tracePoint, labelPoint, segment, nomVecteurParPosition } from '../../modules/2d.js'

export const titre = 'Coordonnées de vecteurs et translations.'

/**
 * @author Stéphane Guyon
 */
export default function translationetcoordonnes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, r, A, B, O, I, J, j, t, k, l, s, o, ux, uy, vi, vj, xA, yA, xB, yB, nomi, nomj, nomAB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) {
        xA = randint(1, 4) * choice([-1, 1])
        yA = randint(1, 4) * choice([-1, 1])
        ux = randint(1, 4) * choice([-1, 1])
        uy = randint(1, 4) * choice([-1, 1])
        xB = xA + ux

        yB = yA + uy

        texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, déterminer les coordonnées du point $A\'$, \'image du point '
        texte += ` $A\\left(${xA};${yA}\\right)$ par la translation de vecteur $\\vec{u}\\left(${ux};${uy}\\right)$`

        texteCorr = '<br>On sait d\'après le cours, que si $A\'$ est l\'image de $A$ par la translation de vecteur $\\vec {u}$'
        texteCorr += '<br>alors on a l\'égalité : $\\overrightarrow{AA\'}=\\vec{u}$.'
        texteCorr += ' <br>On connaît les coordonnées de $\\vec {u}$ avec l\'énoncé.'
        texteCorr += ' <br>On calcule donc celles de $\\overrightarrow{AA\'}$.'
        texteCorr += ' <br> Soit  $A\'(x;y)$ les coordonnées du point $A\'$.'
        texteCorr += '<br> On sait, d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
        texteCorr += ' <br>alors on a  $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AA'}\\begin{pmatrix} x-${ecritureParentheseSiNegatif(xA)}  \\\\y-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$<br>`
        if (xA < 0 | yA < 0) {
          texteCorr += ` ou encore : $\\overrightarrow{AA'}\\begin{pmatrix} x${ecritureAlgebrique(-xA)}  \\\\y${ecritureAlgebrique(-yA)}\\end{pmatrix}$<br>`
        }
        texteCorr += 'Dire que $\\vec{u}=\\overrightarrow{AA\'}~$, '
        texteCorr += `équivaut à résoudre : $\\begin{cases}x ${ecritureAlgebrique(-xA)} =${ux}\\\\ y${ecritureAlgebrique(-yA)}=${uy}\\end{cases}$`
        texteCorr += `<br>ou encore : $\\begin{cases}x  =${ux}${ecritureAlgebrique(xA)}\\\\ y=${uy}${ecritureAlgebrique(yA)}\\end{cases}$`
        texteCorr += `<br>Ce qui donne au final : $\\begin{cases}x  =${xB}\\\\ y=${yB}\\end{cases}$`
        texteCorr += `<br>On a donc: $A'(${xB};${yB})$.`
        r = repere2()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB, 'A\'') // On définit et on trace le point B
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
        vi = vecteur(O, I) // Variable qui définit vecteur OI
        vj = vecteur(O, J)// Variable qui définit vecteur OJ
        nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
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

        texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, déterminer les coordonnées du point $A$, dont l\'image par la translation de vecteur '
        texte += ` $\\vec{u}\\left(${ux};${uy}\\right)$ est le point $A'\\left(${xB};${yB}\\right)$ `

        texteCorr = '<br>On sait d\'après le cours, que si $A\'$ est l\'image de $A$ par la translation de vecteur $\\vec {u}$'
        texteCorr += '<br>alors on a l\'égalité : $\\overrightarrow{AA\'}=\\vec{u}$.'
        texteCorr += ' <br>On connaît les coordonnées de $\\vec {u}$ avec l\'énoncé.'
        texteCorr += ' <br>On calcule donc celles de $\\overrightarrow{AA\'}$.'
        texteCorr += ' <br> Soit  $A(x;y)$ les coordonnées du point $A$.'
        texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
        texteCorr += ' <br>alors on a  $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AA'}\\begin{pmatrix} ${xB}-x  \\\\${yB}-y\\end{pmatrix}$<br>`
        texteCorr += 'On sait d\'après l\'énoncé que : $\\vec{u}=\\overrightarrow{AB}~$, '
        texteCorr += `cela équivaut à résoudre : $\\begin{cases}${xB}-x =${ux}\\\\ ${yB}-y=${uy}\\end{cases}$`
        texteCorr += `<br>ou encore : $\\begin{cases}x  =${xB}${ecritureAlgebrique(-ux)}\\\\ y=${yB}${ecritureAlgebrique(-uy)}\\end{cases}$`
        texteCorr += `<br>Ce qui donne au final : $\\begin{cases}x  =${xA}\\\\ y=${yA}\\end{cases}$`
        texteCorr += `<br>On a donc: $A(${xA};${yA})$.`
        r = repere2()// On définit le repère
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
        vi = vecteur(O, I) // Variable qui définit vecteur OI
        vj = vecteur(O, J)// Variable qui définit vecteur OJ
        nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
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
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Situations différentes ', 2, '1 :Calculer les coordonnées de l\'image d\'un point. \n 2 :Calculer les coordonnées de l\'antécédent d\'un point.']
}
