import Exercice from '../Exercice.js'
import { egal, randint, combinaisonListes, printlatex, listeQuestionsToContenuSansNumero, lettreDepuisChiffre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Utiliser la double distributivité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpenNum✖︎3'

/**
 * Développer des expressions de la forme(ax+ou-b)(cx+ou-d)
* @author Jean-Claude Lhote
* 3L11-1
*/
export const uuid = '4197c'
export const ref = '3L11-1'
export default function DoubleDistributivite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcReady = amcReady
  this.amcType = amcType
  this.consigne = 'Développer et réduire les expressions suivantes.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.nbQuestions = 5
  this.sup = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = [1, 2]
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [3, 4]
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4]
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, reponse, reponse1, reponse2, reponse3, cpt = 0, a, b, c, d, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(2, 9)
      b = randint(2, 9)
      c = randint(2, 9, [a])
      d = randint(2, 9, [b])
      switch (typesDeQuestions) {
        case 1: // (x+b)(x+d)
          b = randint(2, 10)
          d = randint(2, 12)
          texte = `$${lettreDepuisChiffre(i + 1)} = (x+${b})(x+${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (x+${b})(x+${d})=x^2+${b}x+${d}x+${b * d}=x^2+${b + d}x+${b * d}$`
          reponse = `x^2+${b + d}x+${b * d}`
          reponse1 = 1
          reponse2 = b + d
          reponse3 = b * d
          break
        case 2: // (ax+b)(cx+d)
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}x+${b})(${c}x+${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x+${b})(${c}x+${d})=${a * c}x^2+${a * d}x+${b * c}x+${b * d}=${a * c}x^2+${a * d + b * c}x+${b * d}$`
          reponse = `${a * c}x^2+${a * d + b * c}x+${b * d}`
          reponse1 = a * c
          reponse2 = a * d + b * c
          reponse3 = b * d
          break
        case 3: // (ax-b)(cx+d)
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x+${d})$`
          if (egal(a * d - b * c, 0)) {
            texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x+${d})=${a * c}x^2+${d * a}x-${b * c}x-${b * d}=${printlatex(`${a * c}*x^2-${b * d}`)}$`
            reponse = printlatex(`${a * c}*x^2-${b * d}`)
            reponse1 = a * c
            reponse2 = 0
            reponse3 = -b * d
          } else {
            texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x+${d})=${a * c}x^2+${d * a}x-${b * c}x-${b * d}=${printlatex(`${a * c}*x^2+(${d * a - b * c})*x-${b * d}`)}$`
            reponse = printlatex(`${a * c}*x^2+(${d * a - b * c})*x-${b * d}`)
            reponse1 = a * c
            reponse2 = a * d - b * c
            reponse3 = -b * d
          }
          break
        case 4: // (ax-b)(cx-d)
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x-${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x-${d})=${a * c}x^2-${a * d}x-${b * c}x+${b * d}=${a * c}x^2-${a * d + b * c}x+${b * d}$`
          reponse = `${a * c}x^2-${a * d + b * c}x+${b * d}`
          reponse1 = a * c
          reponse2 = -a * d - b * c
          reponse3 = b * d
          break
      }
      texte += ajouteChampTexteMathLive(this, i)
      setReponse(this, i, reponse)
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: 4 }]
        this.autoCorrection[i].reponse = { texte: '$x^2 $ ', textePosition: 'right', valeur: [reponse1], param: { digits: 2, decimals: 0, approx: 0, signe: false, exposantNbChiffres: 0, vertical: true } }
        this.autoCorrection[i].reponse2 = { texte: '$x $ ', textePosition: 'right', valeur: [reponse2], param: { digits: 3, decimals: 0, approx: 0, signe: true, exposantNbChiffres: 0, vertical: true } }
        this.autoCorrection[i].reponse3 = { texte: '', textePosition: 'right', valeur: [reponse3], param: { digits: 2, decimals: 0, approx: 0, signe: true, exposantNbChiffres: 0, vertical: true } }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, ' 1 : (x+a)(x+b) et (ax+b)(cx+d)\n 2 : (ax-b)(cx+d) et (ax-b)(cx-d)\n 3 : Mélange']
}
