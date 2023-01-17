import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, miseEnEvidence } from '../../modules/outils.js'

export const titre = 'Calculer un carré'
export const dateDePublication = '17/01/2023'

/**
* Calculer de carré d'un nombre
*
* * Entier relatif
* * Décimal relatif
* * Fractionnaire relatif
* @author Sébastien LOZANO
* Référence 4G20-3
*/

export default class calculsDeCarre extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.sup = 1
    this.nbQuestions = 1
    context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1.5
    context.isHtml ? this.spacing = 2 : this.spacing = 2
    this.consigneModifiable = false
    this.correctionDetailleeDisponible = false
    this.besoinFormulaireNumerique = ['Type de nombre', 4, ' 1 : Entier relatif\n 2 : Décimal relatif \n 3 : Fractionnaire relatif \n 4 : Mélange']
  }

  nouvelleVersion (numeroExercice) {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1: // entier relatif
        typesDeQuestionsDisponibles = [1]
        break
      case 2: // décimal relatif
        typesDeQuestionsDisponibles = [2]
        break
      case 3: // fractionnaire relatif
        typesDeQuestionsDisponibles = [3]
        break
      case 4:
        typesDeQuestionsDisponibles = [1, 2, 3]
        break
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    this.nbQuestions === 1 ? this.consigne = 'Calculer le carré du nombre suivant.' : this.consigne = 'Calculer les carrés des nombres suivants.'

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const entier = randint(1, 15)
      const signe = randint(-1, 1, [0])
      switch (listeTypeDeQuestions[i]) {
        case 1: // entier relatif
          texte = `${signe * entier}`
          texteCorr = signe === -1 ? `$(${signe * entier})^2 = ${miseEnEvidence(signe * entier * signe * entier)}$` : `$${signe * entier}^2 = ${miseEnEvidence(signe * entier * signe * entier)}$`
          break
        case 2: // décimal relatif
          texte = `Décimal relatif ${entier}`
          texteCorr = `$ ${miseEnEvidence('Correction décimal relatif')}$`
          break
        case 3: // fractionnaire relatif
          texte = `Fractionnaire relatif ${entier}`
          texteCorr = `$ ${miseEnEvidence('Correction fractionnaire relatif')}$`
          break
      }

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
