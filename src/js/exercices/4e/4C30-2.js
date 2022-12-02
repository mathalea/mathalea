import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, puissanceEnProduit, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { Decimal } from 'decimal.js/decimal.mjs'
export const titre = 'Écriture décimale d\'une puissance de 10'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Donner l'écriture décimale d'une puissance de 10
 * @author Rémi Angot
* Référence 4C30-2
 */
export const uuid = '93df9'
export const ref = '4C30-2'
export default function EcritureDecimalePuissanceDe10 () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Donner l'écriture décimale des nombres suivants."
  this.nbQuestions = 8
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 3 // exposants positifs et négatifs par défaut

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let listeTypeDeQuestions
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(['+'], this.nbQuestions)
    }
    if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes(['-'], this.nbQuestions)
    }
    if (this.sup === 3) {
      listeTypeDeQuestions = combinaisonListes(['+', '-'], this.nbQuestions)
    }
    for (let i = 0, texte, texteCorr, n, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case '+':
          n = randint(0, 10)
          texte = this.interactif
            ? `$10^{${n}}${sp()}=$` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
            : `$10^{${n}}${sp()}=${sp()}\\dots$`
          setReponse(this, i, Decimal.pow(10, n))
          if (n < 2) {
            texteCorr = `$10^${n}=${10 ** n}$`
          } else {
            if (context.isHtml) {
              texteCorr = `$10^{${n}}=${puissanceEnProduit(10, n)}=${texNombre(10 ** n, 0)}$`
            } else {
              texteCorr = `$10^{${n}}=${texNombre(10 ** n, 0)}$`
            }
          }
          break
        case '-':
          n = randint(1, 10)
          texte = this.interactif
            ? `$10^{${-n}}${sp()}=$` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
            : `$10^{${-n}}${sp()}=${sp()}\\dots$`
          setReponse(this, i, Decimal.pow(10, -n))
          if (context.isHtml) {
            texteCorr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${puissanceEnProduit(10, n)}}=\\dfrac{1}{${texNombre(10 ** n, 0)}}=${texNombre(1 / 10 ** n, n)}$`
          } else {
            texteCorr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${texNombre(10 ** n, 0)}}=${texNombre(1 / 10 ** n, n)}$`
          }
          break
      }

      if (this.questionJamaisPosee(i, n, listeTypeDeQuestions[i])) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Mélange']
}
