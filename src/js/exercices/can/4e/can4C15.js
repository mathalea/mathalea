
import { choice, randint, texNombre, arrondi, miseEnEvidence } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js'
export const titre = 'Calculer une fraction de dénominateur $0,25$ ou $0,1$ ...'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '30/03/2023'

/*!
 * @author Gilles Mora
 *
 */

export const uuid = 'adbf6'
export const ref = 'can4C15'
export default function CalculFractionDecimal () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatInteractif = 'calcul'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let d, reponse
    const n = randint(1, 9)

    switch (choice([1, 2, 3, 4, 5])) {
      case 1:
        d = new Decimal('0.25')
        reponse = n / d
        this.reponse = arrondi(reponse, 0)
        this.question = `Écrire  $\\dfrac{${n}}{${texNombre(d, 2)}}$ sous la forme d'un nombre entier.`
        this.correction = `$0,25=\\dfrac{1}{4}$. <br>
    Diviser par $0,25$ revient à diviser par $\\dfrac{1}{4}$, ce qui revient donc à multiplier par $4$. <br>
    Ainsi,  $\\dfrac{${n}}{${texNombre(d, 2)}}=${n}\\times 4=${miseEnEvidence(texNombre(reponse, 0))}$.`
        break
      case 2:
        d = new Decimal('0.5')
        reponse = n / d
        this.reponse = arrondi(reponse, 0)
        this.question = `Écrire  $\\dfrac{${n}}{${texNombre(d, 2)}}$ sous la forme d'un nombre entier.`
        this.correction = `$0,5=\\dfrac{1}{2}$. <br>
        Diviser par $0,5$ revient à diviser par $\\dfrac{1}{2}$, ce qui revient donc à multiplier par $2$. <br>
        Ainsi,  $\\dfrac{${n}}{${texNombre(d, 2)}}=${n}\\times 2=${miseEnEvidence(texNombre(reponse, 0))}$.`
        break
      case 3:
        d = new Decimal('0.1')
        reponse = n / d
        this.reponse = arrondi(reponse, 0)
        this.question = `Écrire  $\\dfrac{${n}}{${texNombre(d, 2)}}$ sous la forme d'un nombre entier.`
        this.correction = `$0,1=\\dfrac{1}{10}$. <br>
        Diviser par $0,1$ revient à diviser par $\\dfrac{1}{10}$, ce qui revient donc à multiplier par $10$. <br>
        Ainsi,  $\\dfrac{${n}}{${texNombre(d, 2)}}=${n}\\times 10=${miseEnEvidence(texNombre(reponse, 0))}$.
            `
        break
      case 4:
        d = new Decimal('0.01')
        reponse = n / d
        this.reponse = arrondi(reponse, 0)
        this.question = `Écrire  $\\dfrac{${n}}{${texNombre(d, 2)}}$ sous la forme d'un nombre entier.`
        this.correction = `$0,01=\\dfrac{1}{100}$. <br>
        Diviser par $0,01$ revient à diviser par $\\dfrac{1}{100}$, ce qui revient donc à multiplier par $100$. <br>
        Ainsi,  $\\dfrac{${n}}{${texNombre(d, 2)}}=${n}\\times 100=${miseEnEvidence(texNombre(reponse, 0))}$.`

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
