import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, base10VersBaseN, choice } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
export const titre = 'Additions et soustractions dans d\'autres bases'
export const dateDePublication = '31/10/2021'

/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
* référence PEA12
* * soustraction en base n
* *
* *
*
* @author Jean-Claude Lhote
*/
export default function AdditionSoustractionBaseN () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.pasDeVersionLatex = true
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, m, n, mb, nb, base, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (choice([true, false])) {
        m = randint(100, 500)
        n = randint(50, m)
        base = randint(2, 16, 10)
        mb = base10VersBaseN(m, base)
        nb = base10VersBaseN(n, base)
        texte = `effectuer la soustraction : $${mb}_{(${base})} - ${nb}_{(${base})}$`
        texteCorr = Operation({ operande1: m, operande2: n, type: 'soustraction', base: base })
      } else {
        m = randint(100, 5000)
        n = randint(100, m)
        base = randint(2, 16, 10)
        mb = base10VersBaseN(m, base)
        nb = base10VersBaseN(n, base)
        texte = `effectuer l'addition : $${mb}_{(${base})} + ${nb}_{(${base})}$`
        texteCorr = Operation({ operande1: m, operande2: n, type: 'addition', base: base })
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
}
