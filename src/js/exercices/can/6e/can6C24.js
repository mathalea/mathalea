import { calcul, choice, randint, texNombre, texteEnCouleur, premiereLettreEnMajuscule } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Multiplier ou diviser par 0,1 ou 0,01 ou 0,001'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '19/02/2023'

/*!
 * @author Jean-Claude Lhote
 * Publié le 15/09/2021
 * Référence can6C24
 * Ajout de la division par Guillaume Valmont le 19/02/2023
 */
export const uuid = '53034'
export const ref = 'can6C24'
export default function MultiplierParPuissanceDixNeg () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.besoinFormulaireNumerique = ['Multiplier ou diviser', 3, '1 : Multiplier\n2 : Diviser\n3 : Mélange']
  this.sup = 1
  this.nouvelleVersion = function () {
    const a = randint(1, 9)
    const b = randint(1, 9, a)
    const c = randint(1, 9, b)
    const facteur = calcul(a * 100 + b * 10 + c)

    let typeQuestionsDisponibles = ['multiplier', 'diviser']
    if (this.sup === 1) typeQuestionsDisponibles = ['multiplier']
    else if (this.sup === 2) typeQuestionsDisponibles = ['diviser']
    const typeQuestion = choice(typeQuestionsDisponibles)
    const d = choice([0.1, 0.01, 0.001])
    this.reponse = calcul(facteur * d)
    let operateurLaTeX = '\\times'
    let operateurLateXContraire = '\\div'
    let verbeOperation = 'multipli'
    let verbeOperationContraire = 'divis'
    let participePresentOperation = 'multipliant'
    let petitOuGrand = 'petit'
    if (typeQuestion === 'diviser') {
      this.reponse = calcul(facteur / d)
      operateurLaTeX = '\\div'
      verbeOperation = 'divis'
      verbeOperationContraire = 'multipli'
      participePresentOperation = 'divisant'
      operateurLateXContraire = '\\times'
      petitOuGrand = 'grand'
    }

    if (d === 0.1) {
      this.question = `Calculer $${facteur}${operateurLaTeX} ${texNombre(d)}$.`
      this.correction = `$${facteur}${operateurLaTeX} ${texNombre(d)}=${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  ${premiereLettreEnMajuscule(verbeOperation)}er par $0,1$ revient à ${verbeOperationContraire}er par $10$. <br>
  Quand on ${verbeOperationContraire}e par $10$, le chiffre des unités (chiffre souligné) dans le nombre  $${a}${b}\\underline{${c}}$ 
  devient le chiffre des ${typeQuestion === 'multiplier' ? 'dixièmes' : 'dizaines'}. On obtient alors :<br>
  $${facteur}${operateurLaTeX} ${texNombre(d)}=${facteur}${operateurLateXContraire} 10=${typeQuestion === 'multiplier' ? `${a}${b},\\underline{${c}}` : `${a}\\,${b}\\underline{${c}}0`}$.<br>
  Remarque : En ${participePresentOperation} un nombre par $0,1$, le résultat doit être plus ${petitOuGrand} que le nombre ${verbeOperation}é.
     `)
    }
    if (d === 0.01) {
      this.question = `Calculer $${facteur}${operateurLaTeX} ${texNombre(d)}$.`
      this.correction = `$${facteur}${operateurLaTeX} ${texNombre(d)}=${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  ${premiereLettreEnMajuscule(verbeOperation)}er par $0,01$ revient à ${verbeOperationContraire}er par $100$. <br>
  Quand on ${verbeOperationContraire}e par $100$, le chiffre des unités (chiffre souligné) dans le nombre  $${a}${b}\\underline{${c}}$  
  devient le chiffre des ${typeQuestion === 'multiplier' ? 'centièmes' : 'centaines'}. On obtient alors :<br>
  $${facteur}${operateurLaTeX} ${texNombre(d)}=${facteur}${operateurLateXContraire} 100=${typeQuestion === 'multiplier' ? `${a},${b}\\underline{${c}}` : `${a}${b}\\,\\underline{${c}}00`}$.<br>
  Remarque : En ${participePresentOperation} un nombre par $0,01$, le résultat doit être plus ${petitOuGrand} que le nombre ${verbeOperation}é.
     `)
    }
    if (d === 0.001) {
      this.question = `Calculer $${facteur}${operateurLaTeX} ${texNombre(d)}$.`
      this.correction = `$${facteur}${operateurLaTeX} ${texNombre(d)}=${texNombre(this.reponse)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
  ${premiereLettreEnMajuscule(verbeOperation)}er par $0,001$ revient à ${verbeOperationContraire}er par $1000$. <br>
  Quand on ${verbeOperationContraire}e par $1000$, le chiffre des unités (chiffre souligné) dans le nombre  $${a}${b}\\underline{${c}}$ 
  devient le chiffre des ${typeQuestion === 'multiplier' ? 'millièmes' : 'unités de mille'}. On obtient alors :<br>
  $${facteur}${operateurLaTeX} ${texNombre(d)}=${facteur}${operateurLateXContraire} 1000=${typeQuestion === 'multiplier' ? `0,${a}${b}\\underline{${c}}` : `${a}${b}\\underline{${c}}\\,000`}$.<br>
  Remarque : En ${participePresentOperation} un nombre par $0,001$, le résultat doit être plus ${petitOuGrand} que le nombre ${verbeOperation}é.
     `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
