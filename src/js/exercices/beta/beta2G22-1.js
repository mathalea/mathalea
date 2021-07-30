import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice } from '../../modules/outils.js'
import { repere2, mathalea2d, point, tracePoint, labelPoint, segment, nomVecteurParPosition } from '../../modules/2d.js'

export const titre = 'Représenter un vecteur dans un repère, à partir de ses coordonnées.'

/**
 * @author Stéphane Guyon
 */
export default function représenterunvecteur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, r, A, B, H, h1, h2, O, I, J, j, t, k, l, s, o, ux, uy, xA, yA, xB, yB, nomi, nomj, nomAB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      xA = randint(0, 4) * choice([-1, 1])
      yA = randint(0, 4) * choice([-1, 1])
      ux = randint(1, 4) * choice([-1, 1])
      uy = randint(1, 4) * choice([-1, 1])
      xB = xA + ux

      yB = yA + uy
      if (this.sup === 1) {
        texte = ` Dans un repère orthonormé $(O,\\vec i,\\vec j)$, représenter le vecteur $\\vec{u}\\begin{pmatrix}${ux} \\\\${uy}\\end{pmatrix}~$, `
        texte += `  ayant pour origine le point $A\\left(${xA};${yA}\\right)$`

        texteCorr = 'On sait qu\'un vecteur mesure un déplacement.'
        texteCorr += `<br> A partir du point $A$,  on trace donc le déplacement correspondant à $${ux}$ unités horizontalement puis $${uy}$ verticalement.`
        texteCorr += '<br> Voir le déplacement en bleu dans le repère et le tracé en rouge du vecteur $\\vec{u}$'
        r = repere2()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB) // On définit  le point B
        H = point(xA + ux, yA)
        t = tracePoint(A, 'red') // Variable qui trace les points avec une croix
        l = labelPoint(A, 'red')// Variable qui trace les nom s A et B
        s = segment(A, B, 'red') // On trace en rouge [AB]
        h1 = segment(A, H, 'blue')
        h2 = segment(B, H, 'blue')
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
        h1.epaisseur = 3// Variable qui grossit le tracé bleu
        h2.epaisseur = 3// Variable qui grossit le tracé bleu
        // vi = vecteur(O, I) // Variable qui définit vecteur OI
        // vj = vecteur(O, J)// Variable qui définit vecteur OJ
        // nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        // nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
        nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
        nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
        nomAB = nomVecteurParPosition('u', (xA + xB) / 2 + 1, (yA + yB) / 2 + 1, 1, 0)
        texteCorr += mathalea2d({
          xmin: -9,
          ymin: -9,
          xmax: 9,
          ymax: 9
        }, r, t, l, k, j, s, o, nomi, nomj, nomAB, h1, h2)// On trace le graphique
      }
      if (this.sup === 2) {
        texte = ` Dans un repère orthonormé $(O,\\vec i,\\vec j)$, représenter le vecteur $\\vec{u}\\begin{pmatrix}${ux} \\\\${uy}\\end{pmatrix}~$, `
        texte += `  ayant pour extrémité le point $B\\left(${xB};${yB}\\right)$`

        texteCorr = 'On sait qu\'un vecteur mesure un déplacement.'
        texteCorr += `<br> On cherche donc un point $A$,  à partir duquel en traçant le déplacement correspondant à $${ux}$ unités horizontalement puis $${uy}$ verticalement, on arrive au point $B$.`
        texteCorr += '<br> Voir le déplacement en bleu dans le repère et le tracé en rouge du vecteur $\\vec{u}$'
        r = repere2()// On définit le repère
        A = point(xA, yA, 'A') // On définit et on trace le point A
        B = point(xB, yB, 'B') // On définit  le point B
        H = point(xA + ux, yA)
        t = tracePoint(A, 'red') // Variable qui trace les points avec une croix
        l = labelPoint(A, B, 'red')// Variable qui trace les nom s A et B
        s = segment(A, B, 'red') // On trace en rouge [AB]
        h1 = segment(A, H, 'blue')
        h2 = segment(B, H, 'blue')
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
        h1.epaisseur = 3// Variable qui grossit le tracé bleu
        h2.epaisseur = 3// Variable qui grossit le tracé bleu
        // vi = vecteur(O, I) // Variable qui définit vecteur OI
        // vj = vecteur(O, J)// Variable qui définit vecteur OJ
        // nomi = vi.representantNomme(O, 'i', 2, 'red') // Variable qui trace le nom du représentant du vecteur OI en origine O
        // nomj = vj.representantNomme(O, 'j', 2, 'red')// Variable qui trace le nom du représentant du vecteur OI en origine O
        nomi = nomVecteurParPosition('i', 0.5, -0.7, 1.5, 0)
        nomj = nomVecteurParPosition('j', -0.7, 0.5, 1.5, 0)
        nomAB = nomVecteurParPosition('u', (xA + xB) / 2 + 1, (yA + yB) / 2 + 1, 1, 0)
        texteCorr += mathalea2d({
          xmin: -9,
          ymin: -9,
          xmax: 9,
          ymax: 9
        }, r, t, l, k, j, s, o, nomi, nomj, nomAB, h1, h2)// On trace le graphique
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
  this.besoinFormulaireNumerique = ['Situations différentes ', 2, '1 :Avec un point origine\n 2 : Avec un point extrémité']
}
