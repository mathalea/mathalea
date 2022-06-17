import Exercice from '../Exercice.js'
import { listeQuestionsToContenuSansNumero, randint, combinaisonListes, numAlpha, rangeMinMax, contraindreValeur, compteOccurences } from '../../modules/outils.js'
import choisirExpressionNumerique from '../5e/_choisirExpressionNumerique.js'
export const titre = 'Traduire des phrases en calculs et réciproquement'

/**
 * Mettre en relation un calcul, une traduction en français, une expression, un résultat, pour les décliner dans différents exercices.
 * Exercice sur le vocabulaire : somme,différence, produit, quotient...
 * @author Jean-Claude Lhote
 * Référence 6C13
 * Relecture : Novembre 2021 par EE
 */
export default function VocabulaireEtOperations () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 4
  this.sup2 = false
  this.spacing = 2

  this.nouvelleVersion = function () {
    let decimal
    let expf, expn, expc, resultats
    let typesDeQuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = rangeMinMax(1, 3)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre, c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, 4, this.sup, 4)
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '5', '2','toto','45']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 4, parseInt(typesDeQuestionsDisponibles[i]), 4) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, 4) > 0) typesDeQuestionsDisponibles = rangeMinMax(1, 3) // Teste si l'utilisateur a choisi tout

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (this.sup2) decimal = 10 ** randint(1, 2)
    else decimal = 1

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      resultats = choisirExpressionNumerique(1, decimal)
      expf = resultats[0]
      expn = resultats[1]
      expc = resultats[2]
      texte = ''
      texteCorr = ''
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte +=
            numAlpha(i) +
            'Traduire la phrase par un calcul (il n\'est pas demandé d\'effectuer ce calcul) : '
          expf = 'l' + expf.substring(1)
          texte += `${expf}.`
          expf = 'L' + expf.substring(1)
          texteCorr += numAlpha(i) + `${expf} s'écrit ${expn}.`
          break
        case 2:
          if (expn.indexOf('ou') > 0) { expn = expn.substring(0, expn.indexOf('ou')) } // on supprime la deuxième expression fractionnaire
          texte +=
            numAlpha(i) + 'Traduire le calcul par une phrase en français : '
          texte += `${expn}.`
          expf = 'l' + expf.substring(1)
          texteCorr += numAlpha(i) + `${expn} est ${expf}.`
          break
        case 3:
          texte +=
            numAlpha(i) +
            'Traduire la phrase par un calcul et effectuer ce calcul : '
          expf = 'l' + expf.substring(1)
          texte += `${expf}.`
          expf = 'L' + expf.substring(1)
          texteCorr += numAlpha(i) + `${expf} s'écrit ${expn}.<br>`
          texteCorr += `${expc}`
          break
      }
      texte += this.nbQuestions - 1 === i ? '<br>' : ''
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = [
    'Type de questions',
    4,
    ' 1 : Phrase -> Calcul\n 2 : Calcul -> Phrase\n 3 : Phrase -> Calcul + résultat\n 4 : Mélange'
  ]
  this.besoinFormulaire2CaseACocher = ['Décimaux', false]
}
