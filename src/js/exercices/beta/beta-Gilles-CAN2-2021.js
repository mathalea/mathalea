import Exercice from '../Exercice.js'
import { fraction, obtenirListeFractionsIrreductibles } from '../../modules/fractions.js'
import {
  mathalea2d, point, polygoneAvecNom, codageAngleDroit, labelPoint, segment, milieu, texteParPosition
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, combinaisonListesSansChangerOrdre, range1, randint, texNombre, texFractionReduite, tableauColonneLigne, combinaisonListes, texFraction, miseEnEvidence, shuffle, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import FractionEtendue from '../../modules/FractionEtendue.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN Seconde sujet 2021'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '31/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2021Seconde () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(1), this.nbQuestions)
    } else {
      if (typeof this.sup === 'number') {
        // Si c'est un nombre c'est qu'il y a qu'une seule question
        questions[0] = this.sup
        this.nbQuestions = 1
      } else {
        questions = this.sup.split('-') // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nbQuestions = questions.length
      }
    }
    for (let i = 0; i < questions.length; i++) {
      questions[i] = parseInt(questions[i]) - 1
    }
    const listeIndex = combinaisonListesSansChangerOrdre(questions, this.nbQuestions)
    const typeQuestionsDisponibles = [3]
    const listeFractions3 = [[1, 3, 1, 5], [1, 7, 1, 2], [1, 4, 1, 3], [1, 2, 1, 5], [1, 9, 1, 2], [1, 7, 1, 4],
      [1, 11, 1, 2], [1, 5, 1, 6], [1, 10, 1, 3], [1, 3, 1, 8], [1, 9, 1, 4], [1, 5, 1, 9], [1, 7, 1, 10], [1, 6, 1, 7]
    ]
    const listeFractions2 = [[2, 3], [4, 3], [5, 3], [7, 3], [8, 3],
      [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6]
    ]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction1 = [], fraction2 = [], triplet, propositions, prix, choix, truc, a, b, c, d, e, m, n, p, k, A, B, C, D, pol, L, l2, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
        case 1:
          a = randint(2, 9)

          texte = `$${a} \\times 99=$ `
          texteCorr = `$${a} \\times 99=${a}\\times 100-${a}=${a * 99}$`
          reponse = a * 99
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 2:

          a = randint(1, 9) * 10
          p = randint(2, 9, 5) * 10
          reponse = calcul(a * p / 100)
          texte = `$${p}\\%$ de $${a}= $`

          texteCorr = `          Prendre $${p}\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\%$  de $${a}$.<br>
            Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
            $${p}\\%$ de $${a}=${p / 10}\\times ${a / 10}=${reponse}$.
           `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 3:
          a = choice(listeFractions3)
          b = fraction(a[0], a[1])
          c = fraction(a[2], a[3])

          texte = `$${b.texFraction} + ${c.texFraction}=$
             `
          texteCorr = `Pour additionner des fractions, on les met au même dénominateur.<br>
  
             Ainsi, $${b.texFraction} + ${c.texFraction}
             =\\dfrac{${b.n}\\times${c.d}}{${b.d}\\times${c.d}}+ \\dfrac{${c.n}\\times${b.d}}{${b.d}\\times${c.d}}
             =\\dfrac{${b.n * c.d}+${c.n*b.d}}{${c.d*b.d}}=\\dfrac{${b.n * c.d + c.n * b.d}}{${b.d * c.d}}$.`

          reponse = fraction(b.n * c.d + c.n * b.d, b.d * c.d)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
