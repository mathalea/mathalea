import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, tableauColonneLigne, sp } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
import Decimal from 'decimal.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Compléter le tableau d’une loi de probabilité d’une variable aléatoire'
export const dateDePublication = '08/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

*/
export const uuid = '0f776'
export const ref = 'can1P08'
export default function ProbaLoiVA () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeFractions = [[1, 5, 1, 3], [1, 5, 2, 3], [1, 5, 1, 4], [1, 5, 3, 4], [1, 5, 1, 2], [2, 5, 1, 2], [1, 6, 1, 2],
      [1, 3, 1, 2], [1, 3, 1, 5], [1, 10, 1, 5], [3, 10, 1, 5], [3, 10, 1, 6], [7, 10, 1, 5], [1, 9, 1, 2], [2, 9, 1, 5], [3, 7, 1, 5],
      [2, 9, 1, 4], [1, 4, 1, 6], [1, 4, 1, 3], [1, 8, 1, 2], [3, 8, 1, 4], [5, 8, 1, 5], [3, 7, 1, 4]]
    for (let i = 0, cpt = 0, fraction = [], f1, f2, f3, reponse, tableau1, tableau2, tableau3, tableau, a, b, c, p1, p2, p3, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2])) { //
        case 1:// val décimale
          a = randint(-3, 2)
          b = randint(3, 6)
          c = randint(7, 10)
          p1 = (new Decimal(randint(1, 30))).div(100)
          p2 = (new Decimal(randint(31, 60))).div(100)
          p3 = (new Decimal(p1).plus(p2).mul(-1).plus(1))
          tableau1 = tableauColonneLigne(['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${texNombre(p1, 2)}`, `${texNombre(p2, 2)}`, 'a'])
          tableau2 = tableauColonneLigne(['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${texNombre(p1, 2)}`, 'a', `${texNombre(p2, 2)}`])
          tableau3 = tableauColonneLigne(['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            ['a', `${texNombre(p2, 2)}`, `${texNombre(p1, 2)}`])

          tableau = choice([tableau1, tableau2, tableau3])
          texte = ` Ce tableau  donne la loi de probabilité d’une variable aléatoire $X$ :<br>
          
          `
          texte += `${tableau}`

          if (this.interactif) {
            texte += `${sp(4)}$a= $ `
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else {
            texte += `
          
          Quelle est la valeur de $a$ ?`
          }

          texteCorr = ` La somme des probabilités est égale à $1$.<br>
          Ainsi, $a=1-${texNombre(p1, 2)}-${texNombre(p2, 2)}=${texNombre(p3, 2)}$.
      `
          reponse = p3
          setReponse(this, i, reponse)
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 2:// fraction
          a = randint(-3, 2)
          b = randint(3, 6)
          c = randint(7, 10)

          fraction = choice(listeFractions)
          f1 = new FractionX(fraction[0], fraction[1])
          f2 = new FractionX(fraction[2], fraction[3])
          f3 = new FractionX(fraction[1] * fraction[3] - fraction[0] * fraction[3] - fraction[2] * fraction[1], fraction[1] * fraction[3])
          p1 = (new Decimal(randint(1, 30))).div(100)
          p2 = (new Decimal(randint(31, 60))).div(100)
          p3 = (new Decimal(1 - p1 - p2))
          tableau1 = tableauColonneLigne(['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${f1.texFraction}`, `${f2.texFraction}`, 'a'])
          tableau2 = tableauColonneLigne(['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${f1.texFraction}`, 'a', `${f2.texFraction}`])
          tableau3 = tableauColonneLigne(['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            ['a', `${f1.texFraction}`, `${f2.texFraction}`])

          tableau = choice([tableau1, tableau2, tableau3])//, tableau2, tableau3
          texte = `Ce tableau donne la loi de probabilité d’une variable aléatoire $X$<br>
          
          `
          texte += `${tableau}`

          if (this.interactif) {
            texte += `${sp(4)}$a=$`
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else {
            texte += `
          
          Quelle est la valeur de $a$ ?`
          }

          texteCorr = ` La somme des probabilités est égale à $1$.<br>
          Ainsi, $a=1-${f1.texFraction}-${f2.texFraction}=\\dfrac{${fraction[1] * fraction[3]}}{${fraction[1] * fraction[3]}}-\\dfrac{${fraction[0] * fraction[3]}}{${fraction[1] * fraction[3]}}-\\dfrac{${fraction[2] * fraction[1]}}{${fraction[1] * fraction[3]}}=${f3.texFraction}${f3.texSimplificationAvecEtapes()}$.
      `
          reponse = f3
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break
      }
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
