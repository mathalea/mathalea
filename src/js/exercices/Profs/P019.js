import { contraindreValeur, listeQuestionsToContenu } from '../../modules/outils.js'
import Shikaku from '../6e/_Shikaku.js'
import Exercice from '../Exercice.js'
export const titre = 'Générateur de Shikaku'
export default function GenerateurShikaku () {
  Exercice.call(this)
  this.consigne = `Paver la grille à l'aide de rectangles.<br>
  Chaque rectangle doit contenir un nombre et un seul.<br>
  Le nombre contenu dans un rectangle indique combien de cases le constituent.`
  this.besoinFormulaireNumerique = ['Largeur', 30]
  this.besoinFormulaire2Numerique = ['Hauteur', 30]
  this.sup = 12
  this.sup2 = 5
  this.nbQuestions = 3
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const largeur = contraindreValeur(4, 30, this.sup, 12)
    const hauteur = contraindreValeur(4, 30, this.sup2, 5)
    for (let i = 0, shikaku, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      shikaku = new Shikaku(largeur, hauteur)
      texte = `${shikaku.represente('')}`
      texteCorr = shikaku.represente('solution')
      if (this.questionJamaisPosee(i, shikaku.pavage.rectangles)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
