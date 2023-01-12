
import { choice, randint, texNombre, arrondi } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js'
export const titre = 'Augmenter un nombre d\'une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '12/01/2023'

/*!
 * @author Gilles Mora
 *
 */

export default function AugmenterFraction () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatInteractif = 'calcul'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    switch (choice([2])) {
      case 1 ://tiers
        {
          const n = randint(1, 15)
         
        
         
         
          if (choice([true, false])) {
            const reponse = 4*n
            this.reponse = reponse
            this.question = `$${3*n}$ augmenté de son tiers est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le tiers de $${3*n}$ est $${3*n}\\div 3 = ${n}$.<br>
            Ainsi, $${3*n}$ augmenté de son tiers est égal à : $${3*n}+${n}=${reponse}$. 
          `
          } else {
            const reponse = 2*n
            this.reponse = reponse
            
            this.question = `$${3*n}$ diminué de son tiers est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le tiers de $${3*n}$ est $${3*n}\\div 3 = ${n}$.<br>
            Ainsi, $${3*n}$ diminué de son tiers est égal à : $${3*n}-${n}=${reponse}$. 
          `
                    }
                    this.canEnonce = 'Compléter.'
        this.canReponseACompleter = this.question
        }
        break

        case 2 ://quart
        {
          const n = randint(1, 15)
         
        
         
         
          if (choice([true, false])) {
            const reponse = arrondi(2*n,1)
            this.reponse = reponse
            this.question = `$${2*n}$ augmenté de son quart est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le quart de $${2*n}$ est $${2*n}\\div 4 = ${texNombre(n/4,0)}$.<br>
            Ainsi, $${3*n}$ augmenté de son tiers est égal à : $${3*n}+${n}=${reponse}$. 
          `
          } else {
            const reponse = 2*n
            this.reponse = reponse
            
            this.question = `$${3*n}$ diminué de son tiers est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le tiers de $${3*n}$ est $${3*n}\\div 3 = ${n}$.<br>
            Ainsi, $${3*n}$ diminué de son tiers est égal à : $${3*n}-${n}=${reponse}$. 
          `
                    }
                    this.canEnonce = 'Compléter.'
        this.canReponseACompleter = this.question
        }
        break


    }
   
  }
}
