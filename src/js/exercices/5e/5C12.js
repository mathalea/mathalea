import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { combinaisonListes, listeQuestionsToContenu, randint, lettreDepuisChiffre, contraindreValeur } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import choisirExpressionNumerique from './_choisirExpressionNumerique.js'
import ChoisirExpressionLitterale from './_Choisir_expression_litterale.js'
export { interactifReady, interactifType, amcType, amcReady } from './_Ecrire_une_expression_numerique.js'
export const titre = 'Calculer une expression numérique en détaillant les calculs'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12
 */
export const uuid = 'e61fc'
export const ref = '5C12'
export default function CalculerUneExpressionNumerique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = false
  this.sup2 = false // si false alors utilisation de nombres entiers (calcul mental), si true alors utilisation de nombres à un chiffre après la virgule.
  this.sup3 = true
  this.sup4 = false
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let reponse
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = [2, 3, 4, 5]
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est qu'il y a qu'une expression
        typesDeQuestionsDisponibles[0] = this.sup % 6
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      }
    }
    let expf; let expn; let expc; let decimal; let nbval; let nbOperations; let resultats
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    if (this.sup2) {
      decimal = 10
    } else {
      decimal = 1
    }

    for (let i = 0, texte, texteCorr, val1, val2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      nbOperations = contraindreValeur(1, 5, parseInt(listeTypeDeQuestions[i]), 2)
      val1 = randint(2, 5)
      val2 = randint(6, 9)
      if (this.version > 2 && nbOperations === 1 && !this.litteral) nbOperations++
      if (!this.litteral) { resultats = choisirExpressionNumerique(nbOperations, decimal, this.sup3, !this.sup2) } else { resultats = ChoisirExpressionLitterale(nbOperations, decimal, val1, val2, this.sup3, !this.sup2) }
      expf = resultats[0]
      expn = resultats[1]
      expc = resultats[2]
      nbval = resultats[3]
      if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
      this.consigne = 'Calculer en respectant les priorités opératoires.'
      if (!this.litteral) {
        if (!this.sup4) {
          texte = `${expn}`
        } else {
          texte = `${lettreDepuisChiffre(i + 1)} = ${expn}`
        }
      } else if (nbval === 2) {
        texte = `Pour $x=${val1}$ et $y=${val2}$, calculer ${expn}.`
      } else {
        texte = `Pour $x=${val1}$, calculer ${expn}.`
      }

      if (!this.litteral) {
        if (!this.sup4) {
          texteCorr = `${expc}`
        } else {
          texteCorr = ''
          // On découpe
          const etapes = expc.split('=')
          etapes.forEach(function (etape) {
            etape = etape.replace('$', '')
            if (context.isHtml) {
              texteCorr += '<br>'
            }
            texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etape}$ <br>`
          })
        }
      } else if (nbval === 2) {
        texteCorr = `Pour $x=${val1}$ et $y=${val2}$ :<br>${expc}.`
      } else {
        texteCorr = `Pour $x=${val1}$ :<br>${expc}.`
      }

      reponse = this.litteral ? parseInt(expc.split('=')[expc.split('=').length - 1]) : resultats[4]
      if (this.questionJamaisPosee(i, expn, expf)) { // Si la question n'a jamais été posée, on en créé une autre
        if (this.interactif) {
          texte += '<br>' + ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: ' Résultat : ' })
        } else if (context.isAmc) {
          texte += '<br>Détailler les calculs dans le cadre et coder le résultat.<br>'
        }
        setReponse(this, i, reponse)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Choix des expressions', 'Nombres séparés par des tirets\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip - il faut au moins deux opérations
  this.besoinFormulaire2CaseACocher = ['Utilisation de décimaux (pas de calcul mental)', false]
  this.besoinFormulaire3CaseACocher = ['Avec le signe × devant les parenthèses', true]
  this.besoinFormulaire4CaseACocher = ['Présentation des corrections en colonnes', false]
}
