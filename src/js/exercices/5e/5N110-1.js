import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, calcul, texPrix, texFraction } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Variation en pourcentages'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
* Calculer +/- 20, 30, 40 ou 60 %
* @author Rémi Angot
* Rendre l'exercice interactif Laurence Candille
* Date août 2021
* 5N110
*/
export default function VariationEnPourcentages () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer le nouveau prix, écrire la valeur décimale.'
  this.nbQuestions = 5
  this.spacing = 1
  this.spacingCorr = 2
  this.nbColsCorr = 1
  this.nbCols = 1
  this.interactif = true
  this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, prix, taux, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      prix = choice([randint(2, 9), randint(1, 9) * 10, randint(1, 9) * 100, calcul(randint(11, 99) / 10)])
      // X | X0 | X00 | X,X0
      taux = choice([20, 30, 40, 60])
      if (choice([true, false])) {
        if (context.isHtml) {
          texte = `Un article coûtait ${texPrix(prix)} € et son prix diminue de ${taux}\%.<br><br>`
          if (this.interactif) {
            texte += '&ensp;&ensp;&ensp;&ensp;Le nouveau prix est :'
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
            setReponse(this, i, calcul(prix - prix * taux / 100))
          }
        } else {
          texte = `Un article coûtait ${texPrix(prix)} € et son prix diminue de ${taux}\%.<br><br>`
          if (this.interactif) {
            texte += '&ensp;&ensp;&ensp;&ensp;Le nouveau prix est :'
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
            setReponse(this, i, calcul(prix - prix * taux / 100))
          }
        }

        texteCorr = `$\\text{Diminution : }${texFraction(taux, 100)}\\times  ${texPrix(prix)} = ${texPrix(calcul(prix * taux))}\\div 100=${texPrix(calcul(prix * taux / 100))}$ €`
        texteCorr += '<br>'
        texteCorr += `$\\text{Nouveau prix : }${texPrix(prix)}-${texPrix(calcul(prix * taux / 100))}=${texPrix(calcul(prix - prix * taux / 100))}$ €`
      } else {
        if (context.isHtml) {
          texte = `Un article coûtait ${texPrix(prix)} € et son prix augmente de ${taux}\%.<br><br>`
          if (this.interactif) {
            texte += '&ensp;&ensp;&ensp;&ensp;Le nouveau prix est :'
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
            setReponse(this, i, calcul(prix + prix * taux / 100))
          }
        } else {
          texte = `Un article coûtait ${texPrix(prix)} € et son prix augmente de ${taux}\%.<br><br>`
          if (this.interactif) {
            texte += '&ensp;&ensp;&ensp;&ensp;Le nouveau prix est :'
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br>'
            setReponse(this, i, calcul(prix + prix * taux / 100))
          }
        }
        texteCorr = `$\\text{Augmentation : }${texFraction(taux, 100)}\\times  ${texPrix(prix)}= ${texPrix(calcul(prix * taux))}\\div 100=${texPrix(calcul(prix * taux / 100))}$ €`
        texteCorr += '<br>'
        texteCorr += `$\\text{Nouveau prix : }${texPrix(prix)}+${texPrix(calcul(prix * taux / 100))}=${texPrix(calcul(prix * (1 + taux / 100)))}$ €`
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
