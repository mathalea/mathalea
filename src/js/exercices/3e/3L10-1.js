import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'Additionner ou soustraire une expression entre parenthèses'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Développer et réduire des expressions avec des parenthèses précédées d'un signe + ou -
 *
 *
 * @author Rémi Angot
 * 3L10-1
 */
export const uuid = '815eb'
export const ref = '3L10-1'
export default function ParenthesesPrecedesDeMoinsOuPlus () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Réduire les expressions suivantes.'
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = ['a-()', 'a+()']
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, a, b, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      k = randint(-11, 11, 0)
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      switch (listeTypeDeQuestions[i]) {
        case 'a-()':
          // k-(ax+b)
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}-(${printlatex(
            `${a}x+(${b})`
          )})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}-(${printlatex(
            `${a}x+(${b})`
          )})$`
          if (k - b !== 0) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
              i + 1
            )}}=${printlatex(`${k}+(${-a}*x)+(${-b})`)}=${printlatex(
              `${-a}*x+(${k - b})`
            )}$`
          } else {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
              i + 1
            )}}=${printlatex(`${k}+(${-a}*x)+(${-b})`)}=${printlatex(
              `${-a}*x`
            )}$`
          }
          break
        case 'a+()':
          // k+(ax+b)
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}+(${printlatex(
            `${a}x+(${b})`
          )})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}+(${printlatex(
            `${a}x+(${b})`
          )})$`
          if (k + b !== 0) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
              i + 1
            )}}=${printlatex(`${k}+(${a}*x)+(${b})`)}=${printlatex(
              `${a}*x+(${k + b})`
            )}$`
          } else {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(
              i + 1
            )}}=${printlatex(`${k}+(${a}*x)+(${b})`)}=${printlatex(
              `${a}*x`
            )}$`
          }
          break
      }
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'inline largeur 75 nospacebefore', { texte: `$${sp(3)} =$` })
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        const reponse = texteCorr.match(/=([^=$]+)\$$/)[1]
        setReponse(this, i, reponse)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif']
}
