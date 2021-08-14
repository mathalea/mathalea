import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleur } from '../../modules/outils.js'
import ChoisirExpressionLitterale from './_Choisir_expression_litterale.js'
export const titre = 'Déterminer la dernière opération à effectuer dans une expression littérale'

/**
 * Référence 5L14-4
 * Déterminer la dernière opération à effectuer dans une expression littérale
 * @author Sébastien Lozano fork Jean-Claude Lhote
 */
export default function DeterminerDerniereOperationExpressionLitterale () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup2 = false // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [5] // expressions complexes
    let expn; let expc; let decimal = 1; let nbOperations; let resultats; let lastOp
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    if (this.sup2) decimal = 10
    for (let i = 0, texte, texteCorr, val1, val2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      nbOperations = parseInt(listeTypeDeQuestions[i])
      val1 = randint(2, 5)
      val2 = randint(6, 9)
      // resultats=Choisir_expression_litteraleBis(nbOperations,decimal,val1,val2)
      resultats = ChoisirExpressionLitterale(nbOperations, decimal, val1, val2, this.sup)
      // expf = resultats[0]
      expn = resultats[1]
      expc = resultats[2]
      // nbval = resultats[3]
      lastOp = resultats[4]

      switch (listeTypeDeQuestions[i]) {
        case 5:
          if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
          this.consigne = 'Déterminer la dernière opération à effectuer s\'il fallait faire le calcul pour des valeurs données de $x$ et de $y$.'
          texte = `${expn}.`
          if (this.debug) {
            texte += '<br><br>=====CORRECTION======<br>'
            texte += `Pour fixer les idées, choissions des valeurs pour $x$ et $y$, par exemple $x=${val1}$ et $y=${val2}$.`
            texte += `<br>Le calcul serait le suivant :<br> ${expc}.`
            texte += '<br>Pour n\'importe quelles valeurs de $x$ et de $y$ choisies, les étapes sont les mêmes, elles respectent les priorités opératoires.'
            texte += texteEnCouleur(`<br>La dernière opération dans ${expn} est donc une ${lastOp}.`)
            texteCorr = ''
          } else {
            texteCorr = `Pour fixer les idées, choissions des valeurs pour $x$ et $y$, par exemple $x=${val1}$ et $y=${val2}$.`
            texteCorr += `<br>Le calcul serait le suivant : ${expc}.`
            texteCorr += '<br>Pour n\'importe quelles valeurs de $x$ et de $y$ choisies, les étapes sont les mêmes, elles respectent les priorités opératoires.'
            texteCorr += texteEnCouleur(`<br>La dernière opération dans ${expn} est donc une ${lastOp}.`)
          };

          break
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
  this.besoinFormulaireCaseACocher = ['Avec signes × devant les parenthèses', true]
  this.besoinFormulaire2CaseACocher = ['Avec décimaux.', false]
}
