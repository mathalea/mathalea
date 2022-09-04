import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { point, labelPoint, segment, segmentAvecExtremites, texteParPosition } from '../../modules/2d.js'

/* auteur Stéphane Guyon */
export const titre = 'Résoudre une équation avec des valeurs absolues'

/**
 * 2N15-2, ex 2N23
 * @author Stéphane Guyon
 */
export const uuid = 'e471c'
export const ref = '2N15-2'
export default function ValeurAbsolueEtEquation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre dans $\\mathbb{R}$ les équations suivantes.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //
  this.correction_detaille_disponible = true
  context.isHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 2, 2, 2, 2]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, c, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:

          a = randint(1, 15) * choice([-1, 1])
          b = randint(1, 15) * (-1)

          texte = `$\\vert x ${ecritureAlgebrique(a)}\\vert =${b}$`
          texteCorr = ` ${b} étant négatif, il n'existe pas de solution à cette équation. $S=\\emptyset$`

          break
        case 2:

          a = randint(1, 15) * choice([-1, 1])
          b = randint(1, 15)
          c = -a
          texte = `$\\vert x ${ecritureAlgebrique(a)}\\vert =${b}$`

          texteCorr = `Résoudre cette équation est équivalent à résoudre ces deux équations :<br>
                    $x ${ecritureAlgebrique(a)} =${b}$ et    $x ${ecritureAlgebrique(a)} =${-b}$<br>
                    Il existe donc deux solutions à cette équation :<br>
                    $x_1=${c} ${ecritureAlgebrique(b)}$ et $x_2=${c} -${ecritureParentheseSiNegatif(b)}$<br>
                    $S=\\{${c - b};${c + b}\\}$`
          if (this.correctionDetaillee) {
            const s = segment(point(0, 0), point(12, 0))
            s.styleExtremites = '->'
            const x0 = point(3, 0)
            x0.nom = c - b
            x0.positionLabel = 'below'
            const A = point(6, 0, c)
            A.nom = c
            A.positionLabel = 'below'
            const x1 = point(9, 0, c + b, 'below')
            x1.nom = c + b
            x1.positionLabel = 'below'
            const s1 = segmentAvecExtremites(x0, x1, 'blue')
            s1.epaisseur = 2
            const s2 = segmentAvecExtremites(x0, A)
            const l = labelPoint(A, x0, x1)
            const cote = segment(point(3, 1), point(5.95, 1))
            cote.styleExtremites = '<->'
            const texteCote = texteParPosition(b, 4.5, 1.6)
            const cote2 = segment(point(6.05, 1), point(9, 1))
            cote2.styleExtremites = '<->'
            const texteCote2 = texteParPosition(b, 7.5, 1.6)
            texteCorr += mathalea2d({ xmin: -1, xmax: 13, ymin: -2, ymax: 2.5 },
              s, s1, s2, l, cote, texteCote, cote2, texteCote2)
          }
          break
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
