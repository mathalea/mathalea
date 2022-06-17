import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre } from '../../modules/outils.js'

export const titre = 'Déterminer la parité d\'une expression'

/**
 * 2N21
 * @author Stéphane Guyon
 */
export default function parite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Soit $n$ un entier naturel.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:

          a = randint(2, 6)
          b = randint(2, 11, [4, 8, 9])

          texte = `Que peut-on dire de la parité de ${a}$n$ ?`
          if (a % 2 === 0 && a !== 2) {
            texteCorr = `${a}$n=2\\times ${texNombre(a / 2)}n$<br>
                        Comme $${texNombre(a / 2)}n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`
          }
          if (a === 2) {
            texteCorr = `${a}$n=2\\times n$<br>
                        Comme $n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`
          }

          if (a === 3) {
            texteCorr = `${a}$n=2n+n$<br>
                            Comme $n$ est un entier naturel, $2 n$ est un nombre pair.<br>
                            Si $n$ est pair, $2n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`
          }
          if (a % 2 !== 0 && a !== 3) {
            texteCorr = `${a}$n=2\\times ${texNombre((a - 1) / 2)}n+n$<br>
                            Comme $${texNombre((a - 1) / 2)}n$ est un entier naturel, $2\\times ${texNombre((a - 1) / 2)}n$ est un nombre pair.<br>
                            Si $n$ est pair, $2\\times${texNombre((a - 1) / 2)}n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2\\times${texNombre((a - 1) / 2)}n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`
          }

          break
        case 2:
          a = randint(2, 6)
          b = randint(2, 11)

          texte = `Que peut-on dire de la parité de $${a}n+${b}$ ?`

          if (a % 2 === 0 && b % 2 === 0 && a !== 2) {
            texteCorr = `$${a}n+${b}=2\\times ${texNombre(a / 2)}n+${b}$<br>
                        Comme $${texNombre(a / 2)}n$ est un entier naturel, $2\\times ${texNombre(a / 2)}n$ est donc un nombre pair<br>
                        ${b} est aussi un nombre pair.
                        $${a}n+${b}$ est donc la somme de deux nombres pairs, il est donc pair`
          }
          if (a % 2 === 0 && b % 2 !== 0 && a !== 2) {
            texteCorr = `$${a}n+${b}=2\\times ${texNombre(a / 2)}n+${b}$<br>
                        Comme $${texNombre(a / 2)}n$ est un entier naturel, $2\\times ${texNombre(a / 2)}n$ est donc un nombre pair<br>
                        ${b} est un nombre impair.
                        $${a}n+${b}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`
          }

          if (a === 2 && b % 2 === 0) {
            texteCorr = `Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${b} est aussi un nombre pair.
                        $${a}n+${b}$ est donc la somme de deux nombres pairs, il est donc pair`
          }

          if (a === 2 && b % 2 !== 0) {
            texteCorr = `
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${b} est un nombre impair.<br>
                        $2n+${b}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`
          }
          if (a === 3 && b % 2 === 0) {
            texteCorr = `$${a}n+${b}=2n+n+${b}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${b} est un nombre pair. <br>
                        $2n + ${b}$ est donc un nombre pair. <br>
                        $${a}n+${b}=2n+${b}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`
          }
          if (a === 3 && b % 2 !== 0) {
            texteCorr = `$${a}n+${b}=2n+n+${b}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${b} est un nombre impair. <br>
                        $2n + ${b}$ est donc un nombre impair. <br>
                        $${a}n+${b}=2n+${b}+n$ est donc la somme d'un nombre impair et de $n$, il a donc la parité contraire de $n$.`
          }
          if (a % 2 !== 0 && b % 2 === 0 && a !== 3) {
            texteCorr = `${a}$n=2\\times ${texNombre((a - 1) / 2)}n+n+${b}$<br>
                        Comme $${texNombre((a - 1) / 2)}n$ est un entier naturel, $2 ${texNombre((a - 1) / 2)}n$ est donc un nombre pair<br>
                        ${b} est aussi un nombre pair.<br>
                        $${texNombre((a - 1) / 2)}n +${b}$ est donc un nombre pair.<br>
                        $${a}n+${b}=2\\times${texNombre((a - 1) / 2)}n+${b}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`
          }
          if (a % 2 !== 0 && b % 2 !== 0 && a !== 3) {
            texteCorr = `$${a}n+${b}=2\\times ${texNombre((a - 1) / 2)}n+n+${b}$<br>
                        Comme $${texNombre((a - 1) / 2)}n$ est un entier naturel, $2 \\times ${texNombre((a - 1) / 2)}n$ est donc un nombre pair<br>
                        ${b} est un nombre impair.<br>
                        $2\\times${texNombre((a - 1) / 2)}n +${b}$ est une somme d'un nombre pair et d'un nombre impair, c'est donc un nombre impair.<br>
                        $${a}n+${b}=2\\times${texNombre((a - 1) / 2)}n+${b}+n$ est donc la somme d'un nombre impair et de $n$,  il a donc la parité contraire de $n$.`
          }

          break

        case 3:
          a = randint(2, 6)
          b = randint(2, 11)

          texte = `Que peut-on dire de la parité de $${a}n^{2}$ ?`

          if (a === 2) {
            texteCorr = `
                        Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `
          }

          if (a % 2 === 0 && a !== 2) {
            texteCorr = `$${a}n^{2}=2\\times ${texNombre(a / 2)}n^{2}$<br>
                        Comme $${texNombre(a / 2)}n^{2}$ est un entier naturel, $2\\times ${texNombre(a / 2)}n^{2}$ est donc un nombre pair<br>
                        `
          }
          if (a % 2 === 2) {
            texteCorr = `Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `
          }
          if (a % 2 !== 0 && a !== 3) {
            texteCorr = `$${a}n^{2}=2\\times ${texNombre((a - 1) / 2)}n^{2}+n^{2}$<br>
                        Comme $${texNombre((a - 1) / 2)}n^{2}$ est un entier naturel, $2\\times ${texNombre((a - 1) / 2)}n^{2}$ est donc un nombre pair<br>
                        $${a}n^{2}$ est donc la somme d'un nombre pair et de $n^{2}$. Il a donc la même parité que $n^{2}$<br>
                        Or, on sait d'après le cours (démonstration fondamentale) que $n^{2}$ et $n$ ont la même parité.<br>
                        Donc $${a}n^{2}$ a la même parité que $n$`
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
