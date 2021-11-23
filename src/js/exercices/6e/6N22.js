import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, quotientier, rangeMinMax } from '../../modules/outils.js'
import Fraction from '../../modules/Fraction.js'
import { mathalea2d } from '../../modules/2d.js'
import { fractionCliquable } from '../../modules/2dinteractif.js'
import { context } from '../../modules/context.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Effectuer des calculs simples avec des fractions'
export const dateDePublication = '20/11/21'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Calculs avec des fractions que l'on peut faire à partir de schémas
 * @author Rémi Angot
 * Référence 6N22
*/
export default function FractionsCalculsSimples () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer.'
  this.sup = context.isHtml
  this.nbQuestions = 6 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 4 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetaillee = true
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function (numeroExercice) {
    if (this.correctionDetaillee) this.nbColsCorr = 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['a/b+c/b', 'n+a/b', 'n+a/b', 'n*a/b', 'n-a/b']//, 'a/b+c/nb']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, schema, schemaCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      let c, n, f1, f2, f3
      const b = choice([2, 3, 4, 5])
      const a = randint(1, b - 1)
      const xmax = 19.2
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'a/b+c/b':
          c = randint(1, b + 4, [b, 2 * b, 3 * b, 4 * b])
          f1 = new Fraction(a, b)
          f2 = new Fraction(c, b)
          f3 = new Fraction(a + c, b)
          texte = `$${f1.texFraction} + ${f2.texFraction}$`
          texteCorr = `$${f1.texFraction} + ${f2.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          schema = fractionCliquable(0, 0, 4, b)
          if (this.sup && context.isHtml) texte += '<br`>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schema)
          schemaCorr = fractionCliquable(0, 0, quotientier(a + c, b) + 1, b, { cliquable: false, liste1: rangeMinMax(1, a), liste2: rangeMinMax(a + 1, a + c) })
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schemaCorr)
          setReponse(this, i, new Fraction(a + c, b), { formatInteractif: 'fractionEgale' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'n+a/b':
          n = randint(1, 3)
          f1 = new Fraction(a, b)
          f2 = new Fraction(n * b, b)
          f3 = new Fraction(n * b + a, b)
          texte = `$${n} + ${f1.texFraction}$`
          texteCorr = `$${n} + ${f1.texFraction} = ${f2.texFraction} + ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          schema = fractionCliquable(0, 0, 4, b)
          schemaCorr = fractionCliquable(0, 0, quotientier(n * b + a, b) + 1, b, { cliquable: false, liste1: rangeMinMax(1, n * b), liste2: rangeMinMax(n * b + 1, n * b + a) })
          if (this.sup && context.isHtml) texte += '<br`>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schema)
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schemaCorr)
          setReponse(this, i, new Fraction(n * b + a, b), { formatInteractif: 'fractionEgale' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'n*a/b':
          n = randint(2, 5, b)
          f1 = new Fraction(a, b)
          f3 = new Fraction(n * a, b)
          texte = `$${n} \\times ${f1.texFraction}$`
          texteCorr = `$${n} \\times ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          texteCorr += '<br>'
          if (this.correctionDetaillee) {
            // Liste pour alterner les couleurs
            const liste1 = []
            const liste2 = []
            for (let k = 0; k < n; k++) {
              if (k % 2 === 0) liste1.push(...rangeMinMax(k * a + 1, (k + 1) * a))
              else liste2.push(...rangeMinMax(k * a + 1, (k + 1) * a))
            }
            schemaCorr = fractionCliquable(0, 0, quotientier(n * a, b) + 1, b, { cliquable: false, liste1, liste2 })
            texteCorr += mathalea2d({ scale: 0.5, xmin: -0.2, xmax: (quotientier(n * a, b) + 1) * 5, ymin: -1, ymax: 2, style: 'display: inline' }, schemaCorr)
          }
          schema = fractionCliquable(0, 0, 4, b)
          if (this.sup && context.isHtml) texte += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2, style: 'display: inline' }, schema)
          setReponse(this, i, new Fraction(n * a, b), { formatInteractif: 'fractionEgale' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'n-a/b':
          n = randint(1, 3)
          f1 = new Fraction(a, b)
          f2 = new Fraction(n * b, b)
          f3 = new Fraction(n * b - a, b)
          texte = `$${n} - ${f1.texFraction}$`
          texteCorr = `$${n} - ${f1.texFraction} = ${f2.texFraction} - ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere()) ? `=${f3.texFractionSimplifiee}` : ''}$`
          schemaCorr = fractionCliquable(0, 0, quotientier(n * b + a, b) + 1, b, { cliquable: false, liste2: rangeMinMax(1, n * b), hachures1: true, liste1: rangeMinMax(n * b - a + 1, n * b), couleur2: context.isHtml ? '#f15929' : 'gray' })
          schema = fractionCliquable(0, 0, 4, b)
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schemaCorr)
          if (this.sup && context.isHtml) texte += '<br>' + mathalea2d({ scale: 0.5, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schema)
          setReponse(this, i, new Fraction(n * b - a, b), { formatInteractif: 'fractionEgale' })
          texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaireCaseACocher = ['Avec un schéma interactif']
}
