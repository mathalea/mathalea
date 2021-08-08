import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../modules/outils.js'
import { repere2, mathalea2d, point, tracePoint, segment, nomVecteurParPosition, vecteur, texteParPosition, latexParPoint, homothetie, longueur } from '../../modules/2d.js'

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
    this.sup = parseInt(this.sup)
    for (let i = 0, r, A, B, AB, labelA, labelB, posLabelA, posLabelB, O, I, J, H, h1, h2, j, t, k, s, o, ux, uy, xA, yA, xB, yB, nomi, nomj, nomAB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      xA = randint(2, 8) * choice([-1, 1])
      yA = randint(2, 8) * choice([-1, 1])
      ux = randint(3, 8) * choice([-1, 1])
      uy = randint(3, 8) * choice([-1, 1])
      xB = xA + ux
      yB = yA + uy
      while (Math.abs(xB) < 2 || Math.abs(xB) > 8) { // On s'assure de choisir des points bien placés dans le repère.
        xA = randint(3, 8) * choice([-1, 1])
        ux = randint(3, 8) * choice([-1, 1])
        xB = xA + ux
      }
      while (Math.abs(yB) < 2 || Math.abs(yB) > 8) { // Idem pour les ordonnées
        yA = randint(3, 8) * choice([-1, 1])
        uy = randint(3, 8) * choice([-1, 1])
        yB = yA + uy
      }
      r = repere2()// On définit le repère
      A = point(xA, yA, 'A') // On définit et on trace le point A
      B = point(xB, yB, 'B') // On définit et on trace le point B
      AB = vecteur(A, B)
      H = point(xA + ux, yA)
      s = AB.representant(A) // On trace en rouge [AB]
      h1 = segment(A, H, 'blue')
      h2 = segment(B, H, 'green')
      posLabelA = homothetie(B, A, -0.7 / longueur(A, B), '', 'center') // pour positionner les noms des points aux extrémités proprement
      posLabelB = homothetie(A, B, -0.7 / longueur(A, B), '', 'center')
      labelA = latexParPoint('A', posLabelA, 'red', 10, 12, '')
      labelB = latexParPoint('B', posLabelB, 'red', 10, 12, '')

      t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
      s = segment(A, B, 'red') // On trace en rouge [AB]
      O = point(0, 0)// On définit et on trace le point O
      o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)
      I = point(1, 0)// On définit sans tracer le point I
      J = point(0, 1)// On définit sans tracer le point J
      k = vecteur(O, I).representant(O) // Variable qui trace [OI] en rouge
      j = vecteur(O, J).representant(O)// Variable qui trace [OJ] en rouge
      s.epaisseur = 2// Variable qui grossit le tracé du vecteur AB
      s.color = 'red'
      k.epaisseur = 2// Variable qui grossit le tracé du vecteur OI
      j.epaisseur = 2// Variable qui grossit le tracé du vecteur OJ
      h1.epaisseur = 2// Variable qui grossit le tracé bleu
      h2.epaisseur = 2// Variable qui grossit le tracé bleu
      nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
      nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
      if (this.sup > 1) {
        nomAB = AB.representantNomme(A, 'u', 2, 'red')
      } else {
        nomAB = AB.representantNomme(A, 'AB', 1.5, 'red')
      }
      if (this.sup === 1) {
        texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :'
        texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
        texte += '<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ '
        texteCorr = '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
        texteCorr += ' <br>alors on a  $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>'
        texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
        texteCorr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecritureParentheseSiNegatif(xA)}  \\\\${yB}-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$<br>`
        texteCorr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`
      }
      if (this.sup === 2) {
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
      }
      if (this.sup === 3) {
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
      }
      texteCorr += mathalea2d({
        xmin: -9,
        ymin: -9,
        xmax: 9,
        ymax: 9
      }, r, t, labelA, labelB, k, j, s, o, nomi, nomj, nomAB)// On trace le graphique
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
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
