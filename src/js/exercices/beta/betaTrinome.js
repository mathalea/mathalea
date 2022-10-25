import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils.js'
import Trinome from '../../modules/Trinome.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Tests sur les trinomes'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Rémi Angot
 * Référence
*/
export default class EtudeTrinome extends Exercice {
  constructor () {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 50
  }

  nouvelleVersion () {
    const a = new FractionX(randint(-3, 3, 0), 4)
    const b = new FractionX(randint(-3, 3), 5)
    const c = new FractionX(randint(-3, 3), 1)
    const p = new Trinome(a, b, c)
    this.question = `$${p.tex}$`
    this.question += `<br><br>$${p.texCalculDiscriminant}$`
    if (p.discriminant.s === 1) {
      this.question += `<br><br>$${p.texCalculRacine1}$`
      this.question += `<br><br>$${p.texCalculRacine2}$`
      this.question += `<br><br>$${p.texFormeFactorisee}$`
    }
    this.correction = this.question
    this.reponse = 4
  }
}
