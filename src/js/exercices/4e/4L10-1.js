import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureParentheseSiMoins, lettreDepuisChiffre } from '../../modules/outils.js'
export const titre = 'Réduire, si possible, une expression littérale simple'

/**
 * Réduire, si possible, une expression littérale simple
 *
 * * ax+b
 * * a+bx
 * * ax-a
 * * ax+bx
 * * ax+x
 * * ax×b
 * * a×bx
 * * ax×bx
 * * ax+0
 * * ax×0
 * * ax^2×x
 * * ax^2-a
 * * ax^2-ax
 *
 *
 * @author Rémi Angot
 * 4L10-1
 */
export const uuid = 'cc129'
export const ref = '4L10-1'
export default function ReductionsPiegesClassiques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Réduire, si possible, les expressions suivantes'
  this.spacing = 1
  this.nbQuestions = 10
  this.sup = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = [
      'ax+b',
      'a+bx',
      'ax-a',
      'ax+bx',
      'ax+x',
      'ax×b',
      'a×bx',
      'ax×bx',
      'ax+0',
      'ax×0',
      'ax^2×x',
      'ax^2-a',
      'ax^2-ax^2'
    ]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions); let typesDeQuestions // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(2, 11)
      b = randint(2, 11)
      if (this.sup) {
        a *= choice([-1, 1])
        b *= choice([-1, 1])
      }
      switch (typesDeQuestions) {
        case 'ax+b':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x${ecritureAlgebrique(b)}$`
          texteCorr = texte
          break
        case 'a+bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}${ecritureAlgebrique(b)}x$`
          texteCorr = texte
          break
        case 'ax-a':
          texte = `$${lettreDepuisChiffre(i + 1)}=${Math.abs(a)}x-${Math.abs(a)}$`
          texteCorr = texte
          break
        case 'ax+bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x${ecritureAlgebrique(b)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}x${ecritureAlgebrique(b)}x=${a + b}x$`
          break
        case 'ax+x':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x+x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}x+x=${a + 1}x$`
          break
        case 'ax×b':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x\\times${ecritureParentheseSiNegatif(b)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}x\\times${ecritureParentheseSiNegatif(b)}=${a * b}x$`
          break
        case 'a×bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}\\times${ecritureParentheseSiMoins(b + 'x')}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}\\times${ecritureParentheseSiMoins(b + 'x')}=${a * b}x$`
          break
        case 'ax×bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${ecritureParentheseSiMoins(a + 'x')}\\times${ecritureParentheseSiMoins(b + 'x')}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${ecritureParentheseSiMoins(a + 'x')}\\times${ecritureParentheseSiMoins(b + 'x')}=${a * b}x^2$`
          break
        case 'ax+0':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x+0$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}x+0=${a}x$`
          break
        case 'ax×0':
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x\\times 0$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}x\\times 0=0$`
          break
        case 'ax^2×x':
          texte = `$${lettreDepuisChiffre(i + 1)}=${ecritureParentheseSiMoins(a + 'x^2')}\\times x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${ecritureParentheseSiMoins(a + 'x^2')}\\times x=${ecritureParentheseSiMoins(a + 'x^3')}$`
          break
        case 'ax^2-a':
          a = Math.abs(a)
          texte = `$${lettreDepuisChiffre(i + 1)}=${ecritureParentheseSiMoins(a + 'x^2')}-${a}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${ecritureParentheseSiMoins(a + 'x^2')}-${a}$`
          break
        case 'ax^2-ax^2':
          a = Math.abs(a)
          texte = `$${lettreDepuisChiffre(i + 1)}=${a}x^2-${a}x^2$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${a}x^2-${a}x^2=0$`
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']
}
