import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureAlgebrique, lettreDepuisChiffre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'

export const titre = 'Simplifier une somme de racines carrées'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * 2N32-4, ex 2N11-1
 * @author Stéphane Guyon
 */
export const uuid = '12b72'
export const ref = '2N32-4'
export default function SimplifierUneSommeDeRacinesCarrees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1
  this.spacingCorr = context.isHtml ? 2 : 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const e1 = randint(2, 8) * choice([-1, 1])
      const e2 = randint(2, 8) * choice([-1, 1])
      const e3 = randint(2, 8) * choice([-1, 1])
      const a1 = randint(2, 11)
      const a2 = randint(2, 11, [a1])
      const a3 = randint(2, 11, [a1, a2])
      const b1 = a1 * a1
      const b2 = a2 * a2
      const b3 = a3 * a3
      const c = randint(2, 11, [4, 8, 9])
      const d1 = c * b1
      const d2 = c * b2
      const d3 = c * b3
      const f1 = e1 * a1
      const f2 = e2 * a2
      const f3 = e3 * a3
      const f = f1 + f2 + f3

      texte = `Écrire $${lettreDepuisChiffre(i + 1)}=${e1}\\sqrt{${d1}} ${ecritureAlgebrique(e2)}\\sqrt{${d2}} ${ecritureAlgebrique(e3)}\\sqrt{${d3}}$`
      texte += this.sup === 1 ? ` sous la forme $a\\sqrt{${c}}$ où $a$ est un entier.` : ' sous la forme $a\\sqrt{b}$ où $a$ et $b$ sont des entiers et $b$ le plus petit possible.'
      texteCorr = `On cherche le plus grand carré parfait diviseur de ${d1}, ${d2} et ${d3}. <br>
                On trouve $${d1}=${b1} \\times ${c}~~$, $~~${d2}=${b2} \\times ${c}~~$ et $${d3}=${b3} \\times ${c}$<br>
                On a donc  : $\\sqrt{${d1}}=\\sqrt{${a1}^{2} \\times ${c} }=${a1}\\times \\sqrt{${c}}$,
                $~~\\sqrt{${d2}}=\\sqrt{${a2}^{2} \\times ${c} }=${a2}\\times \\sqrt{${c}}~$ et
                $~\\sqrt{${d3}}=\\sqrt{${a3}^{2} \\times ${c} }=${a3}\\times \\sqrt{${c}}$<br>
                On en déduit que : $${lettreDepuisChiffre(i + 1)}=${e1}\\times${a1}\\times \\sqrt{${c}} ${ecritureAlgebrique(e2)}\\times ${a2}\\times \\sqrt{${c}}${ecritureAlgebrique(e3)}\\times ${a3}\\times \\sqrt{${c}}$<br>
                $${lettreDepuisChiffre(i + 1)}=${f1}\\times \\sqrt{${c}} ${ecritureAlgebrique(f2)}\\times \\sqrt{${c}}${ecritureAlgebrique(f3)}\\times \\sqrt{${c}}$  <br>
                $${lettreDepuisChiffre(i + 1)}=(${f1}${ecritureAlgebrique(f2)}${ecritureAlgebrique(f3)})\\times \\sqrt{${c}} = ${f}\\sqrt{${c}}$`

      if (this.interactif) {
        texte += '<br><br>' + ajouteChampTexteMathLive(this, i, 'inline largeur50', { texte: `$${lettreDepuisChiffre(i + 1)}=$` })
        setReponse(this, i, `${f}\\sqrt{${c}}`)
      }

      if (this.questionJamaisPosee(i, e1, e2, e3, d1, d2, d3)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : En donnat la racine carrée unité\n2 : Sans indication']
}
