import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras } from '../../modules/outils.js'
import ChoisirUneExpressionLitterale from './_Choisir_expression_litterale.js'

export const titre = 'Déterminer la dernière opération à effectuer dans une expression numérique'

/**
 * Référence 5L14-6
 * Déterminer la dernière opération à effectuer dans une expression numérique
 * @author Sébastien Lozano
 */
export const uuid = 'd1a2c'
export const ref = '5L14-6'
export default function DeterminerDerniereOperationExpNum () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = true
  this.sup2 = false // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
  this.titre = titre

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typesDeQuestionsDisponibles = [5] // expressions complexes
    let expn; let expc; let decimal = 1; let nbOperations; let resultats; let lastOp
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    if (this.sup2) decimal = 10
    for (let i = 0, texte, texteCorr, val1, val2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      nbOperations = parseInt(listeTypeDeQuestions[i])
      val1 = randint(2, 5)
      val2 = randint(6, 9)
      resultats = ChoisirUneExpressionLitterale(nbOperations, decimal, val1, val2, this.sup)
      expn = resultats[1]
      expc = resultats[2]
      lastOp = resultats[4]
      const str = expc.split('=')

      if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
      this.consigne = 'Déterminer la dernière opération à effectuer.'
      texte = `$${str[1]}$`

      texteCorr = '$'
      for (let l = 1; l < str.length - 1; l++) {
        texteCorr += `${str[l]}=`
      };
      texteCorr += `${str[str.length - 1]}`
      texteCorr += `<br>La dernière opération dans $${str[1]}$ est donc une ${texteEnCouleurEtGras(lastOp)}.`

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaire2CaseACocher = ['Avec décimaux.', false]
  this.besoinFormulaireCaseACocher = ['Avec le signe × devant les parenthèses', true]
}
