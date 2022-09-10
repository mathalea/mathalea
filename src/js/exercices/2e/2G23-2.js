import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../modules/outils.js'
import { repere, point, vecteur, nomVecteurParPosition, texteParPosition, longueur, homothetie, latexParPoint } from '../../modules/2d.js'

export const titre = 'Coordonnées de vecteurs et translations'

/**
 * Calculer les coordonnées d'un point image ou antécédent d'un autre par une translation
 * @author Stéphane Guyon légèrement modifié par Jean-Claude Lhote
 * Référence 2G23-2
 */
export const uuid = 'fa7b9'
export const ref = '2G23-2'
export default function TranslationEtCoordonnes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, r, A, B, O, I, J, j, k, s, o, ux, uy, vi, vj, xA, yA, xB, yB, posLabelA, labelA, posLabelB, labelB, nomi, nomj, nomAB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      xA = randint(2, 8) * choice([-1, 1])
      yA = randint(2, 8) * choice([-1, 1])
      ux = randint(2, 8) * choice([-1, 1])
      uy = randint(2, 8) * choice([-1, 1])
      xB = xA + ux
      yB = yA + uy
      while (Math.abs(xB) < 2 || Math.abs(xB) > 8) { // On s'assure de choisir des points bien placés dans le repère.
        xA = randint(2, 8) * choice([-1, 1])
        ux = randint(2, 8) * choice([-1, 1])
        xB = xA + ux
      }
      while (Math.abs(yB) < 2 || Math.abs(yB) > 8) { // Idem pour les ordonnées
        yA = randint(2, 8) * choice([-1, 1])
        uy = randint(2, 8) * choice([-1, 1])
        yB = yA + uy
      }

      r = repere()// On définit le repère
      A = point(xA, yA) // On définit et on trace le point A
      B = point(xB, yB) // On définit et on trace le point B
      posLabelA = homothetie(B, A, -0.7 / longueur(A, B), '', 'center') // pour positionner les noms des points aux extrémités proprement
      posLabelB = homothetie(A, B, -0.7 / longueur(A, B), '', 'center')
      labelA = latexParPoint('A', posLabelA, 'red', 10, 12, '')
      labelB = latexParPoint("A'", posLabelB, 'red', 10, 12, '')

      // t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
      s = vecteur(A, B).representant(A) // On trace en rouge [AB]
      O = point(0, 0)// On définit et on trace le point O
      o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)
      I = point(1, 0)// On définit sans tracer le point I
      J = point(0, 1)// On définit sans tracer le point J
      vi = vecteur(O, I) // Variable qui définit vecteur OI
      vj = vecteur(O, J)// Variable qui définit vecteur OJ
      k = vi.representant(O) // Variable qui trace [OI]
      j = vj.representant(O)// Variable qui trace [OJ]
      s.epaisseur = 2// Variable qui grossit le tracé du vecteur AB
      s.color = colorToLatexOrHTML('red')
      k.epaisseur = 2// Variable qui grossit le tracé du vecteur OI
      j.epaisseur = 2// Variable qui grossit le tracé du vecteur OJ
      nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
      nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
      nomAB = vecteur(A, B).representantNomme(A, "AA'", 1.5, 'red')

      if (parseInt(this.sup) === 1) {
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
      } else if (parseInt(this.sup) === 2) {
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
        texteCorr += "On sait d'après l'énoncé que : $\\vec{u}=\\overrightarrow{AA'}~$, "
        texteCorr += `cela équivaut à résoudre : $\\begin{cases}${xB}-x =${ux}\\\\ ${yB}-y=${uy}\\end{cases}$`
        texteCorr += `<br>ou encore : $\\begin{cases}x  =${xB}${ecritureAlgebrique(-ux)}\\\\ y=${yB}${ecritureAlgebrique(-uy)}\\end{cases}$`
        texteCorr += `<br>Ce qui donne au final : $\\begin{cases}x  =${xA}\\\\ y=${yA}\\end{cases}$`
        texteCorr += `<br>On a donc: $A(${xA};${yA})$.`
      }
      texteCorr += mathalea2d({
        xmin: -9,
        ymin: -9,
        xmax: 9,
        ymax: 9
      }, r, k, j, s, o, nomi, nomj, nomAB, labelA, labelB)// On trace le graphique
      if (this.questionJamaisPosee(i, xA, yA, xB, yB)) { // Si la question n'a jamais été posée, on en créé une autre
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
