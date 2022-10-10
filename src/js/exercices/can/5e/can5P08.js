import Exercice from '../../Exercice.js'
import { choice, randint, texPrix } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Résoudre un problème de proportionnalité**'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '19/07/2022'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can5P08
 * Date de publication
*/
export const uuid = 'c3a01'
export const ref = 'can5P08'
export default function Proportionnalite3 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'

  this.nouvelleVersion = function () {
    let prix1, prix2, fruits, fruits2, poids1, poids2, frac, choix
    const listefruits1 = [
      ['abricots'], ['melons'], ['tomates'], ['pommes'],
      ['framboises'], ['fraises'], ['citrons'], ['bananes']
    ]
    const listefruits2 = [
      ['pastèques', 'pastèque'], ['melons', 'melon'], ['potimarrons', 'potimarron'], ['citrouilles', 'citrouille']
    ]
    switch (choice([1, 2])) { //
      case 1:// proportionnalité avec fruits
        choix = choice(['a', 'b'])
        if (choix === 'a') {
          prix1 = randint(7, 14, 10)// prix de 5 kg
          prix2 = prix1 - randint(1, 3)// prix pour masse cherchée
          fruits = choice(listefruits1)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(5 * prix2, prix1)
          this.reponse = frac
          this.question = `$5$ kg de ${fruits[0]} coûtent $${texPrix(prix1)}$ €.<br> 

        Quelle masse de ${fruits[0]} faut-il acheter pour payer $${texPrix(prix2)}$ € ?<br>
        
        Donner la valeur exacte de cette masse.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' kg' } }
          this.correction = `La masse que l'on peut acheter avec $1$ € est $\\dfrac{5}{${prix1}}$ kg. <br>
        Ainsi, pour payer $${texPrix(prix2)}$ €, il faut acheter $\\dfrac{5\\times ${prix2}}{${prix1}}=\\dfrac{ ${5 * prix2}}{${prix1}}${frac.texSimplificationAvecEtapes()}$ kg.
       
        `
        }
        if (choix === 'b') {
          prix1 = randint(5, 14, [6, 9, 12])// prix de 3 kg
          prix2 = prix1 - randint(1, 3)// prix pour masse cherchée
          fruits = choice(listefruits1)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(3 * prix2, prix1)
          this.reponse = frac
          this.question = `$3$ ${fruits[0]} coûtent $${texPrix(prix1)}$ €.<br>

        Quelle masse de ${fruits[0]} faut-il acheter pour payer $${texPrix(prix2)}$ € ?<br>

        Donner la valeur exacte de cette masse.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: 'kg' } }
          this.correction = `La masse que l'on peut acheter avec $1$ € est $\\dfrac{3}{${prix1}}$ kg. <br>
        Ainsi, pour payer $${texPrix(prix2)}$ €, il faut acheter $\\dfrac{3\\times ${prix2}}{${prix1}}=\\dfrac{ ${3 * prix2}}{${prix1}}${frac.texSimplificationAvecEtapes()}$ kg.
       
        `
        }
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = '$\\ldots$ kg'
        break
      case 2:// proportionnalité avec nombre de pastèques / melons
        choix = choice(['a', 'b', 'c'])//, 'b', 'c'
        if (choix === 'a') {
          poids1 = randint(5, 14, [6, 9, 12])// masse de 3 fruits
          poids2 = poids1 - randint(1, 2)// 2ième masse
          fruits2 = choice(listefruits2)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(3 * poids2, poids1)
          this.reponse = frac
          this.question = `$3$ ${fruits2[0]} (identiques) ont une masse $${poids1}$ kg.<br>

      Combien faut-il acheter de  ces mêmes ${fruits2[0]} pour totaliser une masse de $${poids2}$ kg ? <br>

      Donner la valeur exacte de ce nombre.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: `  de ${fruits2[0]}.` } }
          this.correction = `La quantité de ${fruits2[0]} par kg est $\\dfrac{3}{${poids1}}$ de ${fruits2[1]}. <br>
      Ainsi, pour obtenir une masse de $${texPrix(poids2)}$ kg, il faut acheter $\\dfrac{3\\times ${poids2}}{${poids1}}=\\dfrac{ ${3 * poids2}}{${poids1}}${frac.texSimplificationAvecEtapes()}$ de ${fruits2[0]}.
      `
        }
        if (choix === 'b') {
          poids1 = randint(3, 7)// masse de 2 fruits
          poids2 = poids1 - 1// 2ième masse
          fruits2 = choice(listefruits2)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(2 * poids2, poids1)
          this.reponse = frac
          this.question = `$2$ ${fruits2[0]} (identiques) ont une masse $${poids1}$ kg.<br>
        Combien faut-il acheter  de ces mêmes ${fruits2[0]} pour totaliser une masse de $${poids2}$ kg ? <br>
        Donner la valeur exacte de ce nombre.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: `  de ${fruits2[0]}.` } }
          this.correction = `La quantité de ${fruits2[0]} par kg est $\\dfrac{2}{${poids1}}$ de ${fruits2[1]}. <br>
        Ainsi, pour obtenir une masse de $${texPrix(poids2)}$ kg, il faut acheter $\\dfrac{2\\times ${poids2}}{${poids1}}=\\dfrac{ ${2 * poids2}}{${poids1}}${frac.texSimplificationAvecEtapes()}$ de ${fruits2[0]}.
        `
        }
        if (choix === 'c') {
          poids1 = randint(9, 14, 10)// masse de 5 fruit
          poids2 = poids1 - randint(1, 4)// 2ième masse
          fruits2 = choice(listefruits2)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(5 * poids2, poids1)
          this.reponse = frac
          this.question = `$5$ ${fruits2[0]} (identiques) ont une masse $${poids1}$ kg.<br>
            Combien faut-il acheter de  ces mêmes ${fruits2[0]} pour totaliser une masse de $${poids2}$ kg ? <br>
            Donner la valeur exacte de ce nombre.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: `  de ${fruits2[0]}.` } }
          this.correction = `La quantité de ${fruits2[0]} par kg est $\\dfrac{5}{${poids1}}$ de ${fruits2[1]}. <br>
            Ainsi, pour obtenir une masse de $${texPrix(poids2)}$ kg, il faut acheter $\\dfrac{2\\times ${poids2}}{${poids1}}=\\dfrac{ ${5 * poids2}}{${poids1}}${frac.texSimplificationAvecEtapes()}$ de ${fruits2[0]}.
            `
        }
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = `$\\ldots$ de ${fruits2[0]}`
        break
    }
  }
}
