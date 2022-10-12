import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { calcul, texNombre } from '../../modules/outils/texNombres.js'
import Operation from '../../modules/operations.js'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Poser des multiplications de nombres décimaux (Version 2)'

export const dateDePublication = '08/06/2022'

/**
 * Multiplication de deux nombres décimaux avec des paramètres sur le nombre de chiffres et de décimales dans chaque facteur
 * Ref 6C30
 * @author Eric Elter (sur la base de 6C30)
 * Publié le 08/06/2022
 */
export const uuid = 'f6413'
export const ref = '6C30-0'
export default function MultiplierDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Poser et effectuer les calculs suivants.'
  this.spacing = 2
  this.spacingCorr = 1 // Important sinon le calcul posé ne fonctionne pas avec opmul et spacing
  this.nbQuestions = 4
  this.listePackages = 'xlop'
  this.sup = 3
  this.sup2 = 3
  this.sup3 = 1
  this.sup4 = 2
  this.besoinFormulaireNumerique = ['Choix du nombre de chiffres significatifs dans le premier facteur', 4,
    '1 : Un chiffre\n2 : Deux chiffres\n3 : Trois chiffres\n4 : Quatre chiffres']
  this.besoinFormulaire2Numerique = ['Choix du nombre de chiffres significatifs dans le second facteur', 4,
    '1 : Un chiffre\n2 : Deux chiffres\n3 : Trois chiffres\n4 : Quatre chiffres']
  this.besoinFormulaire3Numerique = ['Choix du nombre de décimales significatives dans le premier facteur', 3,
    '1 : Une décimale\n2 : Deux décimales\n3 : Trois décimales']
  this.besoinFormulaire4Numerique = ['Choix du nombre de décimales significatives dans le second facteur', 3,
    '1 : Une décimale\n2 : Deux décimales\n3 : Trois décimales']

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let reponse
    const nbChiffresa = parseInt(this.sup)
    const nbChiffresb = parseInt(this.sup2)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b; i < this.nbQuestions && cpt < 50;) {
      a = this.sup === 1 ? randint(2, 9) : 10 * randint(Math.pow(10, nbChiffresa - 2) + 1, Math.pow(10, nbChiffresa - 1) - 1) + randint(1, 9)
      a = a / Math.pow(10, parseInt(this.sup3))
      b = this.sup2 === 1 ? randint(2, 9) : 10 * randint(Math.pow(10, nbChiffresb - 2) + 1, Math.pow(10, nbChiffresb - 1) - 1) + randint(1, 9)
      b = b / Math.pow(10, parseInt(this.sup4))
      texte = `$${texNombre(a)}\\times${texNombre(b)}$`
      reponse = calcul(a * b)
      texteCorr = Operation({ operande1: a, operande2: b, type: 'multiplication', style: 'display: inline' })
      texteCorr += Operation({ operande1: b, operande2: a, type: 'multiplication', style: 'display: inline' })
      if (context.isHtml && this.interactif) texte += '$~=$' + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      setReponse(this, i, reponse)
      this.autoCorrection[i].options = { digits: 0, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
