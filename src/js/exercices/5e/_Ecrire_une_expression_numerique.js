import Exercice from '../Exercice.js'
import choisirExpressionNumerique from './_choisirExpressionNumerique.js'
import ChoisirExpressionLitterale from './_Choisir_expression_litterale.js'
import { listeQuestionsToContenu, randint, combinaisonListes, lettreDepuisChiffre, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpenNum'
/**
* Fonction noyau pour 6 fonctions qui utilisent les mêmes variables et la fonction choisirExpressionNumerique
* @author Jean-Claude Lhote
* Référence 5C11, 5C11-1, 5C11-2, 5C12, 5C12-1, 5L13
*/
export default function EcrireUneExpressionNumerique (calculMental) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup2 = false // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
  this.sup = false
  this.sup3 = true
  this.version = 1 // 1 pour ecrire une expression, 2 pour écrire la phrase, 3 pour écrire l'expression et la calculer, 4 pour calculer une expression numérique

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let reponse
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (this.sup4 === 1) {
      this.sup = '1-1-2-2-3'
    } else if (this.sup4 === 2) {
      this.sup = '1-2-2-3-3'
    } else if (this.sup4 === 3) {
      this.sup = '2-2-3-3-4'
    } else if (this.sup4 === 4) {
      this.sup = '2-3-4-5'
    }
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]
    } else {
      if (typeof this.sup === 'number') { // Si c'est un nombre c'est qu'il y a qu'une expression
        typesDeQuestionsDisponibles = [this.sup % 6]
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) {
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 5, parseInt(typesDeQuestionsDisponibles[i]), randint(1, 5))
        }
      }
    }
    let expf; let expn; let expc; let decimal; let nbval; let nbOperations; let resultats
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    if (!calculMental) {
      decimal = 10
    } else {
      decimal = 1
    }
    // pour 5C12-1
    if (this.sup2) {
      decimal = 10
    } else {
      decimal = 1
    }
    for (let i = 0, texte, texteCorr, val1, val2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      nbOperations = parseInt(listeTypeDeQuestions[i] % 6)
      val1 = randint(2, 5)
      val2 = randint(6, 9)
      if (this.version > 2 && nbOperations === 1 && !this.litteral) nbOperations++
      if (!this.litteral) { resultats = choisirExpressionNumerique(nbOperations, decimal, this.sup3, calculMental) } else { resultats = ChoisirExpressionLitterale(nbOperations, decimal, val1, val2, this.sup3, calculMental) }
      expf = resultats[0]
      expn = resultats[1].split('=')[0]
      expn += expn[expn.length - 1] !== '$' ? '$' : ''
      expc = resultats[2]
      nbval = resultats[3]
      switch (this.version) {
        case 1:
          this.consigne = 'Traduire la phrase par un calcul (il nest pas demandé deffectuer ce calcul).'
          texte = `${expf}.`
          texteCorr = `${expf} s'écrit<br>${expn}.`
          break
        case 2:
          if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
          this.consigne = 'Traduire le calcul par une phrase en français.'
          texte = `${expn}`
          expf = 'l' + expf.substring(1)
          texteCorr = `${expn} est ${expf}.`
          break
        case 3:
          // this.consigne = 'Traduire la phrase par un calcul et effectuer ce calcul en respectant les priorités opératoires.'
          if (this.interactif) {
            this.consigne = 'Traduire la phrase par un calcul et effectuer ce calcul au brouillon en respectant les priorités opératoires.<br> Saisir uniquement le résultat.'
          } else {
            this.consigne = 'Traduire la phrase par un calcul et effectuer ce calcul en respectant les priorités opératoires.'
          }
          if (!this.litteral) texte = `${expf}.`
          else if (nbval === 2) texte = `${expf} puis calculer pour $x=${val1}$ et $y=${val2}$.` // nbval contient le nombre de valeurs en cas de calcul littéral
          else texte = `${expf} puis calculer pour $x=${val1}$.`
          texteCorr = `${expf} s'écrit ${expn}.<br>`

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
          } else if (nbval === 2) texteCorr += `Pour $x=${val1}$ et $y=${val2}$ :<br> ${expc}.`
          else texteCorr += `Pour $x=${val1}$ :<br>${expc}.`
          // reponse = parseInt(expc.split('=')[expc.split('=').length - 1])
          reponse = expc.split('=')[expc.split('=').length - 1].replace('$', '')
          break
        case 4:
          if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
          this.consigne = 'Calculer en respectant les priorités opératoires.'
          if (!this.litteral) texte = `${expn}`
          else if (nbval === 2) texte = `Pour $x=${val1}$ et $y=${val2}$, calculer ${expn}.`
          else texte = `Pour $x=${val1}$, calculer ${expn}.`
          if (!this.litteral) texteCorr = `${expc}`
          else if (nbval === 2) texteCorr = `Pour $x=${val1}$ et $y=${val2}$ :<br>${expc}.`
          else texteCorr = `Pour $x=${val1}$ :<br>${expc}.`
          reponse = parseInt(expc.split('=')[expc.split('=').length - 1])
          break
      }
      if ((this.questionJamaisPosee(i, nbOperations, nbval, this.version) && !this.litteral) || (this.litteral && this.questionJamaisPosee(i, nbOperations, nbval, this.version, resultats[4]))) { // Si la question n'a jamais été posée, on en créé une autre
        if (this.version > 2) {
          if (!context.isAmc) {
            texte += '<br>' + ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: ' Résultat : ' })
          } else {
            texte += '<br>Détailler les calculs dans le cadre et coder le résultat.<br>'
          }
          setReponse(this, i, reponse)
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
