import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, shuffle } from '../../modules/outils.js'
import { choixDeroulant } from '../../modules/interactif/questionListeDeroulante.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Puissances de 10 et préfixes'
export const interactifReady = true
export const interactifType = 'listeDeroulante'
export const dateDePublication = '12/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Associer une puissance de 10 à un préfixe
 * @author Rémi Angot
 * Référence 4C30-4
*/
export const uuid = 'b0b3c'
export const ref = '4C30-4'
export default class PuissancesEtPrefixe extends Exercice {
  constructor () {
    super()
    this.consigne = 'Compléter avec le préfixe correspondant.'
    this.nbQuestions = 5
    this.nbCols = 2
    this.nbColsCorr = 1
    this.sup = 1
    this.besoinFormulaireNumerique = ['Type de question', 2, '1: On part de la puissance de 10\n2: On part du préfixe']
  }

  nouvelleVersion (numeroExercice) {
    this.interactifType = (this.sup === 1) ? 'listeDeroulante' : 'mathLive'
    this.consigne = (this.sup === 1) ? 'Compléter avec le préfixe correspondant.' : 'Compléter avec la puissance de 10 correspondant à ce préfixe.'
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const exposants = [[-9, 'nano', 'un milliardième'], [-6, 'micro', 'un millionième'], [-3, 'milli', 'un millième'], [-2, 'centi', 'un centième'], [-1, 'déci', 'un dixième'], [1, 'déca', 'dix'], [2, 'hecto', 'cent'], [3, 'kilo', 'mille'], [6, 'Mega', 'un million'], [9, 'Giga', 'un milliard'], [12, 'Tera', 'mille-milliards']]
    const listeExposants = combinaisonListes(exposants, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const exposant = listeExposants[i][0]
      const prefixe = listeExposants[i][1]
      const description = listeExposants[i][2]
      if (this.sup === 1) {
        texte = `$10^{${exposant}}$` + choixDeroulant(this, i, 0, shuffle(['nano', 'micro', 'milli', 'centi', 'déci', 'déca', 'hecto', 'kilo', 'Mega', 'Giga', 'Tera']), false)
        setReponse(this, i, prefixe)
        texteCorr = `$10^{${exposant}}$ c'est ${description} donc : ${prefixe}.`
      } else {
        texte = `${prefixe}` + ajouteChampTexteMathLive(this, i, 'texte')
        if (exposant !== 1) setReponse(this, i, `10^{${exposant}}`)
        else setReponse(this, i, ['10^{1}', '10'])

        texteCorr = `${prefixe}, c'est ${description} soit $10^{${exposant}}$.`
      }
      if (this.questionJamaisPosee(i, exposant)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
