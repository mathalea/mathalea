import Exercice from '../../Exercice.js'
import { choice, randint } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Résoudre un problème de proportionnalité*'
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
export const uuid = 'afbda'
export const ref = 'can5P07'
export default function Proportionnalite2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'

  this.nouvelleVersion = function () {
    let a, b, fruits, fruits2, poids1, frac, choix
    const listefruits1 = [
      ['abricot'], ['melon'], ['tomate'], ['pomme'],
      ['fraise'], ['citron'], ['banane']
    ]
    const listefruits2 = [
      ['pastèques', 'pastèque'], ['melons', 'melon'], ['potimarrons', 'potimarron'], ['citrouilles', 'citrouille']
    ]
    switch (choice([1, 2])) { //
      case 1:// proportionnalité avec fruits
        choix = choice(['a', 'b', 'c'])
        if (choix === 'a') {
          a = randint(4, 7)// kg pour 9 €
          b = a - 1
          fruits = choice(listefruits1)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(9 * b, a)
          this.reponse = frac
          if (choice([true, false])) {
            this.question = `On paie  $9$ € pour $${a}$ kg de ${fruits[0]}s.<br> 
       Quel est le prix de $${b}$ kg de ${fruits[0]}s ?<br>
        Donner la valeur exacte de ce prix.`
          } else {
            this.question = ` $${a}$ kg de ${fruits[0]}s coûtent 9 €.<br> 
        Quel est le prix de $${b}$ kg de ${fruits[0]}s ?<br>
         Donner la valeur exacte de ce prix.`
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
          this.correction = `Un kg de ${fruits[0]} coûte $\\dfrac{9}{${a}}$ €.<br>
          On en déduit que $${b}$ kg de ${fruits[0]}s coûtent $\\dfrac{9\\times${b}}{${a}}=\\dfrac{${9 * b}}{${a}}${frac.texSimplificationAvecEtapes()}$ €.
       
        `
        }
        if (choix === 'b') {
          a = randint(3, 5)// kg pour 7 €
          b = a - 1
          fruits = choice(listefruits1)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(7 * b, a)
          this.reponse = frac
          if (choice([true, false])) {
            this.question = `On paie  $7$ € pour $${a}$ kg de ${fruits[0]}s.<br>

          Quel est le prix de $${b}$ kg de ${fruits[0]}s ?<br>

           Donner la valeur exacte de ce prix.`
          } else {
            this.question = ` $${a}$ kg de ${fruits[0]}s coûtent $7$ €.<br> 

           Quel est le prix de $${b}$ kg de ${fruits[0]}s ?<br>

            Donner la valeur exacte de ce prix.`
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
          this.correction = `Un kg de ${fruits[0]} coûte $\\dfrac{7}{${a}}$ €.<br>
             On en déduit que $${b}$ kg de ${fruits[0]}s coûtent $\\dfrac{7\\times${b}}{${a}}=\\dfrac{${7 * b}}{${a}}${frac.texSimplificationAvecEtapes()}$ €.
          
           `
        }

        if (choix === 'c') {
          a = randint(5, 8)// kg pour 11 €
          b = a - randint(1, 2)
          fruits = choice(listefruits1)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(11 * b, a)
          this.reponse = frac
          if (choice([true, false])) {
            this.question = `On paie  $11$ € pour $${a}$ kg de ${fruits[0]}s.<br> 

          Quel est le prix de $${b}$ kg de ${fruits[0]}s ?<br>

           Donner la valeur exacte de ce prix.`
          } else {
            this.question = ` $${a}$ kg de ${fruits[0]}s coûtent $11$ €.<br> 

           Quel est le prix de $${b}$ kg de ${fruits[0]}s ?<br>

            Donner la valeur exacte de ce prix.`
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
          this.correction = `Un kg de ${fruits[0]} coûte $\\dfrac{11}{${a}}$ €.<br>
             On en déduit que $${b}$ kg de ${fruits[0]}s coûtent $\\dfrac{11\\times${b}}{${a}}=\\dfrac{${11 * b}}{${a}}${frac.texSimplificationAvecEtapes()}$ €.
          
           `
        }
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = '$\\ldots$ €'
        break
      case 2:// proportionnalité avec nombre de pastèques / melons
        choix = choice(['a', 'b'])//, 'b', 'c'
        if (choix === 'a') {
          poids1 = randint(5, 10, [6, 9])// masse de 3 fruits
          a = randint(4, 10)// 2ième nombre de fruits
          fruits2 = choice(listefruits2)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(a * poids1, 3)
          this.reponse = frac
          this.question = `$3$ ${fruits2[0]} (identiques) ont une masse $${poids1}$ kg.<br>

      Quelle est la masse de  $${a}$  de ces mêmes ${fruits2[0]} ? <br>

      Donner la valeur exacte de ce nombre.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: '  kg' } }
          this.correction = `La masse de $1$ ${fruits2[1]} est : $\\dfrac{${poids1}}{3}$ kg.<br>
          On en déduit que $${a}$ ${fruits2[0]} ont une masse de $\\dfrac{${a}\\times${poids1}}{3}=\\dfrac{${a * poids1}}{3}${frac.texSimplificationAvecEtapes()}$ kg.
      `
        }
        if (choix === 'b') {
          poids1 = randint(5, 11, [6, 8, 10])// masse de 4 fruits
          a = randint(5, 11, 8)// 2ième nombre de fruits
          fruits2 = choice(listefruits2)
          this.formatInteractif = 'fractionEgale'
          frac = new FractionX(a * poids1, 4)
          this.reponse = frac
          this.question = `$4$ ${fruits2[0]} (identiques) ont une masse $${poids1}$ kg.<br>

    Quelle est la masse de  $${a}$  de ces mêmes ${fruits2[0]} ? <br>
    
    Donner la valeur exacte de ce nombre.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: '  kg' } }
          this.correction = `La masse de $1$ ${fruits2[1]} est : $\\dfrac{${poids1}}{4}$ kg.<br>
        On en déduit que $${a}$ ${fruits2[0]} ont une masse de $\\dfrac{${a}\\times${poids1}}{4}=\\dfrac{${a * poids1}}{4}${frac.texSimplificationAvecEtapes()}$ kg.
    `
        }
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = '$\\ldots$ kg'
        break
    }
  }
}
