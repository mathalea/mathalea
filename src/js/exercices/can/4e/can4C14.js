
import { choice, randint, texNombre, arrondi, miseEnEvidence } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
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
    switch (choice([1, 2, 3, 4])) {
      case 1 :// tiers
        {
          const n = randint(1, 25)

          if (choice([true, false])) {
            const reponse = 4 * n
            this.reponse = reponse
            this.question = `$${3 * n}$ augmenté de son tiers est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le tiers de $${3 * n}$ est $${3 * n}\\div 3 = ${n}$.<br>
            Ainsi, $${3 * n}$ augmenté de son tiers est égal à : $${3 * n}+${n}=${miseEnEvidence(reponse)}$. 
          `
          } else {
            const reponse = 2 * n
            this.reponse = reponse

            this.question = `$${3 * n}$ diminué de son tiers est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le tiers de $${3 * n}$ est $${3 * n}\\div 3 = ${n}$.<br>
            Ainsi, $${3 * n}$ diminué de son tiers est égal à : $${3 * n}-${n}=${miseEnEvidence(reponse)}$. 
          `
          }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = this.question
        }
        break

      case 2 :// quart
        {
          const n = randint(1, 25)

          if (choice([true, false])) {
            const reponse = arrondi(2.5 * n, 1)
            this.reponse = reponse
            this.question = `$${2 * n}$ augmenté de son quart est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le quart de $${2 * n}$ est $${2 * n}\\div 4 = ${texNombre(n / 2, 1)}$.<br>
            Ainsi, $${2 * n}$ augmenté de son quart est égal à : $${2 * n}+${texNombre(0.5 * n, 1)}=${miseEnEvidence(texNombre(reponse))}$. 
          `
          } else {
            const reponse = arrondi(1.5 * n, 1)
            this.reponse = reponse
            this.question = `$${2 * n}$ diminué de son quart est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le quart de $${2 * n}$ est $${2 * n}\\div 4 = ${texNombre(n / 2, 1)}$.<br>
            Ainsi, $${2 * n}$ diminué de son quart est égal à : $${2 * n}-${texNombre(0.5 * n, 1)}=${miseEnEvidence(texNombre(reponse))}$. 
          `
          }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = this.question
        }
        break

      case 3 :// cinquième
        {
          const n = randint(1, 16)

          if (choice([true, false])) {
            const reponse = 6 * n
            this.reponse = reponse
            this.question = `$${5 * n}$ augmenté de son cinquième est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le cinquième de $${5 * n}$ est $${5 * n}\\div 5 = ${n}$.<br>
            Ainsi, $${5 * n}$ augmenté de son cinquième est égal à : $${5 * n}+${n}=${miseEnEvidence(texNombre(reponse))}$. 
          `
          } else {
            const reponse = 4 * n
            this.reponse = reponse
            this.question = `$${5 * n}$ diminué de son cinquième est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le quart de $${5 * n}$ est $${5 * n}\\div 5 = ${n}$.<br>
            Ainsi, $${5 * n}$ diminué de son cinquième est égal à : $${5 * n}-${n}=${miseEnEvidence(texNombre(reponse))}$. 
          `
          }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = this.question
        }
        break

      case 4 :// dixième
        {
          const n = randint(1, 100)

          if (choice([true, false])) {
            const reponse = arrondi(1.1 * n, 1)
            this.reponse = reponse
            this.question = `$${n}$ augmenté de son dixième est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le dixième de $${n}$ est $${n}\\div 10 = ${texNombre(n / 10, 1)}$.<br>
            Ainsi, $${n}$ augmenté de son dixième est égal à : $${n}+${texNombre(0.1 * n, 1)}=${miseEnEvidence(texNombre(reponse, 1))}$. 
          `
          } else {
            const reponse = arrondi(0.9 * n, 1)
            this.reponse = reponse
            this.question = `$${n}$ diminué de son dixième est égal à : `

            if (this.interactif) { this.question += '' } else { this.question += '$\\ldots$' }

            this.correction = ` Le dixième de $${n}$ est $${n}\\div 10 = ${texNombre(n / 10, 1)}$.<br>
            Ainsi, $${n}$ diminué de son dixième est égal à : $${n}-${texNombre(0.1 * n, 1)}=${miseEnEvidence(texNombre(reponse, 1))}$. 
          `
          }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = this.question
        }
        break
    }
  }
}
