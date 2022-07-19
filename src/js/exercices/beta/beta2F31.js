import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint } from '../../modules/outils.js'
import { courbe, droite, mathalea2d, repere } from '../../modules/2d.js'
export const titre = 'Croissance de fonction ?'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function CroissanceDeFonction () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeFonctionsDisponibles = ['affine', 'carré', 'inverse', 'cube', 'racine carrée'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeFonctionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, x0, x1, coeff, f, r, graph, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      r = repere({ xMin: -10, yMin: -10, xMax: 10, yMax: 10 })
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'affine':
          a = randint(3, 12) / 4 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          if (a > 0) {
            x0 = Math.ceil((-8 - b) / a)
            x1 = Math.floor((8 - b) / a)
          } else {
            x1 = Math.ceil((-8 - b) / a)
            x0 = Math.floor((8 - b) / a)
          }
          texteCorr = 'La fonction représentée est une fonction affine. Toute fonction affine est monotone.'
          if (a < 0) {
            texteCorr += '<br>Nous pouvons voir sur le zoom ci dessous que le coefficient de cette fonction est négatif.<br>'
            texteCorr += `La fonction est donc décroissante sur  $\\mathbb{R}$ et donc en particulier sur $[${x0};${x1}]$.<br>`
          } else {
            texteCorr += '<br>Nous pouvons voir sur le zoom ci dessous que le coefficient de cette fonction est positif.<br>'
            texteCorr += `La fonction est donc croissante sur  $\\mathbb{R}$ et donc en particulier sur $[${x0};${x1}]$.<br>`
          }
          f = x => a * x + b
          graph = droite(a, -1, b)

          break
        case 'carré':
          a = randint(3, 12) / 4 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          if (choice([true, false])) {
            x0 = -3
            x1 = 0
          } else {
            x0 = 0
            x1 = 3
          }
          f = x => x ** 2
          graph = courbe(f, { repere: r, step: 0.2, xMin: -3.2, xMax: 3.3, yMin: -11, yMax: 11 })
          texteCorr = 'La fonction étudiée est la fonction carré. Nous savons que cette fonction est décroissante sur $\\mathbb{R^-}$ et croissante sur $\\mathbb{R^+}$'
          if (x0 === -3) {
            texteCorr += `la fonction est donc décroissante sur $[${x0};${x1}]$.`
          } else {
            texteCorr += `la fonction est donc croissante sur $[${x0};${x1}]$.`
          }
          break
        case 'inverse':
          a = randint(3, 12) / 4 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          if (choice([true, false])) {
            x0 = -8
            x1 = -1
          } else {
            x0 = 1
            x1 = 8
          }

          f = x => 1 / x
          graph = courbe(f, { repere: r, step: 0.1, xMin: -11, xMax: 11, yMin: -11, yMax: 11 })
          texteCorr = 'La fonction représentée est la fonction inverse. Cette fonction est décroissante sur $\\mathbb{R^-}$ et sur $\\mathbb{R^+}$.'
          texteCorr += `Elle est donc décroissante sur $[${x0};${x1}]$.`
          break

        case 'cube':
          a = randint(3, 12) / 8 * choice([-1, 1])
          b = randint(-9, 9, 0) / 4
          x0 = choice([-2, -1])
          x1 = choice([0, 1, 2])
          f = x => x ** 3
          graph = courbe(f, { repere: r, step: 0.2, xMin: -2.2, xMax: 2.2, yMin: -11, yMax: 11 })
          texteCorr = 'La fonction représentée est la fonction cube. Cette fonction est croissante sur $\\mathbb{R^-}$ et sur $\\mathbb{R^+}$.'
          texteCorr += `Elle est donc croissante sur $[${x0};${x1}]$.`

          break
        case 'racine carrée':
          a = randint(3, 12) / 8 * choice([-1, 1])
          b = randint(1, 9) / 4
          x0 = choice([0, 1, 2, 3])
          x1 = randint(x0 + 2, 9)
          f = x => Math.sqrt(x)
          graph = courbe(f, { repere: r, step: 0.2, xMin: 0, xMax: 11, yMin: -11, yMax: 11 })
          texteCorr = 'La fonction représentée est la fonction racine carrée. Cette fonction est croissante sur $\\mathbb{R^+}$.'
          texteCorr += `Elle est donc croissante sur $[${x0};${x1}]$.`
          break
      }
      graph.epaisseur = 2
      texte = `Déterminer la croissance de la fonction $f$ représentée ci-dessous sur l'intervalle $[${x0};${x1}]$.`
      texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }, r, graph)
      coeff = 20 / Math.max(Math.abs(f(x0) - f(x1)), Math.abs(x0 - x1))
      r = repere({ xUnite: coeff, yUnite: coeff, xMin: Math.min(0, x0 - 1), yMin: Math.min(0, Math.floor(f(x0)), Math.floor(f(x1))) - 1, xMax: Math.max(0, x1 + 1), yMax: Math.max(0, Math.ceil(f(x0)), Math.ceil(f(x1))) + 1 })
      graph = courbe(f, { repere: r, step: 0.3 / coeff, xMin: x0, xMax: x1, color: 'red' })
      texteCorr += mathalea2d({ xmin: Math.min(-1, x0 * coeff - 1), ymin: Math.min(-1, coeff * Math.min(Math.floor(f(x0)), Math.floor(f(x1))) - 1), xmax: Math.max(0, coeff * x1 + 1), ymax: Math.max(0, 1 + coeff * Math.max(Math.ceil(f(x0)), Math.ceil(f(x1)))) }, r, graph)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
