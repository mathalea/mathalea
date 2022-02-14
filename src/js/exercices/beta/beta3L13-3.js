import { combinaisonListes, listeQuestionsToContenu, randint } from '../../modules/outils'
import { resoudreEquation } from '../../modules/outilsMathjs'
import Exercice from '../Exercice'
export const titre = 'Problèmes à mettre en équation et à résoudre'
export default class ProblemesEnEquation extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 3
  }

  nouvelleVersion () {
    const listeTypeDeProblemes = ['basket']
    const listeDeProblemes = combinaisonListes(listeTypeDeProblemes, this.nbQuestions)
    for (let i = 0, cpt = 0, texte, x, a, b, d, equation, resolution, texteCorr; i < this.nbQuestions && cpt < 50;) {
      switch (listeDeProblemes[i]) {
        case 'basket':
          x = randint(5, 15) // nombre de paniers à trois points
          a = randint(5, 12) // nombres de paniers à deux points de plus que x
          b = randint(15, 30) // nombre de points marqués au lancer franc
          d = b + (a + x) * 2 + x * 3 // nombre de points de la partie
          equation = `3*x+2*(${a}+x)+${b}=${d}`
          resolution = resoudreEquation(equation)
          texte = `Une équipe de basket a marqué ${d} points lors d'un match. Au cours de ce match, elle a marqué ${b} points sur lancers francs.<br>`
          texte += `L'équipe a marqué ${a} paniers à deux points de plus que de paniers à trois points. Combien a-t-elle marqué de panier à trois points ?`
          texteCorr = `Posons $x$ le nombre de paniers à trois points. Le nombre de paniers à deux points est donc $${a}+x$. Le score de l'équipe fournit donc l'équation :<br>`
          texteCorr += `$${resolution.equation}$`
          texteCorr += '<br>Résolvons l\'équation :<br>'
          texteCorr += resolution.texteCorr
          texteCorr += `<br>L'équipe a donc marqué ${x} paniers à trois points.`
          break
        case 'achats':

          break
        case 'polygone':

          break
      }
      if (this.questionJamaisPosee(i, x, a, b, d)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
