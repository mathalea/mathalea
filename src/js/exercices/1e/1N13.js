import Exercice from '../Exercice.js'
import { arrondi, choice, randint, texNombre } from '../../modules/outils.js'
export const titre = 'Somme des termes d\'une suite géométrique'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '28/12/2022'

/**
 *
 * @author Rémi Angot
 * Référence 1N13
*/
export const ref = '1N13'
export default class SommeSuiteArithmetique extends Exercice {
  constructor () {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 2
    this.spacingCorr = 2
    this.consigneCorrection = 'Rappel : La somme $S$ de plusieurs termes consécutifs d\'une suite géométrique est telle que : '
    this.consigneCorrection += '<br>$S=(1^\\text{er)\\text{ terme}\\times \\dfrac{1-q^{\\text{nombre de termes}}}{1-q}$'
  }

  nouvelleVersion () {
    const u0 = randint(2, 10)
    const q = arrondi(randint(2, 19, 10) / 10, 1)
    const n = choice([10, 12, 15])
    const u = choice(['u', 'v', 'w'])
    const besoinDArrondi = arrondi(u0 * (1 - q ** (n + 1)) / (1 - q), 7) !== arrondi(u0 * (1 - q ** (n + 1)) / (1 - q), 3)
    this.question = `Soit $${u}$ la suite géométrique de premier terme $${u}_0 = ${u0}$ et de raison $${texNombre(q)}$.`
    this.question += `<br>Calculer $\\displaystyle S = ${u}_0 + ${u}_1 + ... + ${u}_{${n}} =\\sum_{k=0}^{k=${n}}${u}_k$`
    this.question += besoinDArrondi ? ' et donner un arrondi au millième près' : '.'
    this.reponse = arrondi(u0 * (1 - q ** (n + 1)) / (1 - q), 3)
    this.correction = `$S = ${u0} + (${u0} \\times ${texNombre(q)}) + (${u0} + \\times${texNombre(q)}^2) + ... + (${u0} \\times ${texNombre(q)}^{${n}})$`
    this.correction += `<br>$S = ${u0} \\times \\dfrac{1-${texNombre(q)}^{${n + 1}}}{1-${texNombre(q)}}$`
    this.correction += `<br>$S = ${texNombre(this.reponse)}$`
  }
}
