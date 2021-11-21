import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint } from '../../modules/outils.js'
import Fraction from '../../modules/Fraction.js'
import { mathalea2d } from '../../modules/2d.js'
export const titre = 'Effectuer des calculs simples avec des fractions'
export const dateDePublication = '20/11/21'

/**
 * Calculs avec des fractions que l'on peut faire à partir de schémas
 * @author Rémi Angot
 * Référence 6N22
*/
export default function FractionsCalculsSimples () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer.'
  this.nbQuestions = 6 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 4 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetaillee = true
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['a/b+c/b', 'n+a/b', 'n+a/b', 'n*a/b', 'n-a/b']//, 'a/b+c/nb']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      let c, n, f1, f2, f3
      const b = choice([2, 3, 4, 5])
      const a = randint(1, b - 1)
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'a/b+c/b':
          c = randint(1, b + 4, [b, 2 * b, 3 * b, 4 * b])
          f1 = new Fraction(a, b)
          f2 = new Fraction(c, b)
          f3 = new Fraction(a + c, b)
          texte = `$${f1.texFraction} + ${f2.texFraction}$`
          texteCorr = `$${f1.texFraction} + ${f2.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ xmin: 0, xmax: 15, ymin: -1, ymax: 2 }, f3.representation(0, 0, 3, 0, 'barre', 'white', 0, 1, 1, '', [1, a], [a + 1, a + c], '#f15929', '#1DA962'))
          break
        case 'n+a/b':
          n = randint(1, 3)
          f1 = new Fraction(a, b)
          f2 = new Fraction(n * b, b)
          f3 = new Fraction(n * b + a, b)
          texte = `$${n} + ${f1.texFraction}$`
          texteCorr = `$${n} + ${f1.texFraction} = ${f2.texFraction} + ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ xmin: 0, xmax: 15, ymin: -1, ymax: 2 }, f3.representation(0, 0, 3, 0, 'barre', 'white', 0, 1, 1, '', [1, n * b], [n * b + 1, n * b + a], '#f15929', '#1DA962'))
          break
        case 'n*a/b':
          n = randint(2, 5, b)
          f1 = new Fraction(a, b)
          f3 = new Fraction(n * a, b)
          texte = `$${n} \\times ${f1.texFraction}$`
          texteCorr = `$${n} \\times ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          texteCorr += '<br>'
          if (this.correctionDetaillee) {
            for (let f = 0; f < n; f++) {
              const xmin = (f === 0) ? 0 : -1
              texteCorr += mathalea2d({ xmin, xmax: 3, ymin: -1, ymax: 2, style: 'display: inline' }, f1.representation(0, 0, 3, 0, 'barre', '#f15929'))
            }
          }
          break
        case 'n-a/b':
          n = randint(1, 3)
          f1 = new Fraction(a, b)
          f2 = new Fraction(n * b, b)
          f3 = new Fraction(n * b - a, b)
          texte = `$${n} - ${f1.texFraction}$`
          texteCorr = `$${n} - ${f1.texFraction} = ${f2.texFraction} - ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ xmin: 0, xmax: 15, ymin: -1, ymax: 2 }, f2.representation(0, 0, 3, 0, 'barre', 'white', 0, 1, 1, '', [1, n * b - a], [n * b - a + 1, n * b], '#f15929', '#1DA962'))
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a, b, listeTypeQuestions[i])) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
