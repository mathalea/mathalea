import Exercice from '../../Exercice.js'
import { randint, choice, texFractionReduite, texNombrec, texFraction, simplificationDeFractionAvecEtapes } from '../../../modules/outils.js'
export const titre = 'Calculer une probabilités*'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function CalculsProbabilite2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b
    const choix = choice([true, false])
    switch (choice(['a', 'a', 'b'])) { //, 'a', 'b'
      case 'a':
        a = randint(2, 9)
        b = randint(5, 15)

        this.question = `Dans une urne, il y a $${a}$ boules noires et $${b}$ boules blanches.<br>
              On tire une boule de manière équiprobable. <br>
              La probabilité d'obtenir une boule ${choix ? 'noire' : 'blanche'}  est : <br>
             (donner le résultat sous la forme d'une fraction irréductible)`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Dans une situation d'équiprobabilité, 
        on calcule la probabilité d'un événement par le quotient : 
        $\\dfrac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issue}}$. <br>
        La probabilité est donc donnée par : <br>
        $\\dfrac{\\text{Nombre de boules ${choix ? 'noire' : 'blanche'}s}}{\\text{Nombre total de boules}}
             =${choix ? texFraction(a, a + b) : texFraction(b, a + b)}  ${choix ? simplificationDeFractionAvecEtapes(a, a + b) : simplificationDeFractionAvecEtapes(b, a + b)}$
        `
        this.reponse = choix ? texFractionReduite(a, a + b) : texFractionReduite(b, a + b)
        break
      case 'b':
        if (choice([true, false])) {
          a = randint(2, 9)
          b = 10 - a
          this.question = `Une urne contient $${a}$ boules bleues et $${b}$ boules rouges. <br>
        On tire une boule au hasard.<br>
        Quelle est la probabilité de tirer une boule ${choix ? 'bleue' : 'rouge'} ?<br>
        On donnera le résultat sous forme décimale.`
          this.optionsChampTexte = { texteApres: '' }
          this.correction = `Dans une situation d'équiprobabilité, 
          on calcule la probabilité d'un événement par le quotient : 
          $\\dfrac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issue}}$. <br>
          La probabilité est donc donnée par : <br>
          $\\dfrac{\\text{Nombre de boules ${choix ? 'bleue' : 'rouge'}s}}{\\text{Nombre total de boules}}
               =${choix ? texFraction(a, a + b) : texFraction(b, a + b)} =${choix ? texNombrec(a / 10) : texNombrec(b / 10)}$
          `
          this.reponse = choix ? a / 10 : b / 10
        } else {
          a = randint(10, 80)
          b = 100 - a
          this.question = `Une urne contient $${a}$ boules bleues et $${b}$ boules rouges. <br>
            On tire une boule au hasard.<br>
            Quelle est la probabilité de tirer une boule ${choix ? 'bleue' : 'rouge'} ?<br>
            On donnera le résultat sous forme décimale.`
          this.optionsChampTexte = { texteApres: '' }
          this.correction = `Dans une situation d'équiprobabilité, 
          on calcule la probabilité d'un événement par le quotient : 
          $\\dfrac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issue}}$. <br>
          La probabilité est donc donnée par : <br>
          $\\dfrac{\\text{Nombre de boules ${choix ? 'bleue' : 'rouge'}s}}{\\text{Nombre total de boules}}
               =${choix ? texFraction(a, a + b) : texFraction(b, a + b)} =${choix ? texNombrec(a / 100) : texNombrec(b / 100)}$
          `
          this.reponse = choix ? a / 100 : b / 100
        }
        break
    }
  }
}
