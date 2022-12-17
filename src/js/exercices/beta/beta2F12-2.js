import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'

import { mathalea2d } from '../../modules/2dGeneralites.js'

import { repere, texteParPosition, point, courbeInterpolee, antecedentParDichotomie, segment, courbe } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, arrondi, stringNombre, prenom, prenomM, texPrix, texteGras, choice, sp, texNombre, randint, numAlpha } from '../../modules/outils.js'
import { exp } from 'mathjs'
export const titre = 'Résoudre graphiquement $f(x)>k$ ou $f(x)<k$ avec $f$ fonction de référence'

/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ResoudreGraphFonctionRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  // this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE1']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE1']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      const nomF = [
        ['f'], ['g'], ['h'], ['u'],
        ['v'], ['w']
      ]
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':// salle de sport deux formules
          {
            const a = randint(1, 30)
            const choix = choice([true, false])
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const A = point(1.73, 3)
            const Ax = point(A.x, 0)
            const sAAx = segment(A, Ax)
            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            const B = point(-1.73, 3)
            const Bx = point(B.x, 0)
            const sBBx = segment(B, Bx)
            sBBx.epaisseur = 2
            sBBx.pointilles = 5
            const sAxBx = segment(Ax, Bx, 'red')
            sAxBx.epaisseur = 4
            const Texte1 = texteParPosition(`$y=${a}$`, 5, 2.3, 'milieu', 'red', 1.5)
            const Texte2 = texteParPosition('$y=x^2$', 3.5, 4.5, 'milieu', 'blue', 2)
            const Texte3 = texteParPosition(`$-\\sqrt{${a}}$`, -1.73, -1.5, 'milieu', 'red', 1.5)
            const Texte4 = texteParPosition(`$\\sqrt{${a}}$`, 1.73, -1.5, 'milieu', 'red', 1.5)
            const crochet1O = texteParPosition(']', -1.73, 0, 'milieu', 'red', 3)
            const crochet2O = texteParPosition('[', 1.73, 0, 'milieu', 'red', 3)
            const crochet1F = texteParPosition('[', -1.73, 0, 'milieu', 'red', 3)
            const crochet2F = texteParPosition(']', 1.73, 0, 'milieu', 'red', 3)
            const r1 = repere({
              xMin: -6,
              yMin: -1,
              yMax: 5,
              xMax: 6,
              xUnite: 1,
              yUnite: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleX: false,
              grilleY: false,
              xThickMax: -6,
              yThickMax: -1

            })
            const f = x => x ** 2
            const g = x => 3
            const graphique = mathalea2d({
              xmin: -6,
              xmax: 6,
              ymin: -1,
              ymax: 5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, r1, o)
            const graphiqueCO = mathalea2d({
              xmin: -6,
              xmax: 6,
              ymin: -2,
              ymax: 5.5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }),
            courbe(g, {
              repere: r1,
              color: 'red',
              epaisseur: 2
            })
            , r1, o, sAAx, sBBx, sAxBx, crochet1O, crochet2O, Texte1, Texte2, Texte3, Texte4)
            const graphiqueCF = mathalea2d({
              xmin: -6,
              xmax: 6,
              ymin: -2,
              ymax: 5.5,
              pixelsParCm: 30,
              scale: 1,
              style: 'margin: auto'
            }, courbe(f, {
              repere: r1,
              color: 'blue',
              epaisseur: 2
            }), courbe(g, {
              repere: r1,
              color: 'red',
              epaisseur: 2
            })
            , r1, o, sAAx, sBBx, sAxBx, crochet1F, crochet2F, Texte1, Texte2, Texte3, Texte4)
            texte = `Résoudre dans $\\mathbb{R}$ l'inéquation : $x^2${choix ? '<' : ' \\leqslant '}${a}$.<br>
            On pourra utiliser le repère suivant.<br>`
            texte += `    ${graphique}`
            texteCorr = `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la parabole d'équation $y=x^2$ ; <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${a}$ ; <br>
            $\\bullet$    Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${choix ? 'strictement en dessous de' : ' sur ou sous '} la droite.<br>`
            if (choix === true) { texteCorr += `${graphiqueCO}<br>` } else { texteCorr += `    ${graphiqueCF}<br>` }

            if (a === 1 || a === 4 || a === 9 || a === 16 || a === 25) { texteCorr += `Comme $\\sqrt{${a}}=${arrondi(Math.sqrt(a), 0)}$, l'ensemble des solutions de l'inéquation $x^2${choix ? '<' : ' \\leqslant '}${a}$ est :
            ${choix ? `$S=]-${arrondi(Math.sqrt(a), 0)}\\,;\\,${arrondi(Math.sqrt(a), 0)}[$.` : `$S=[-${arrondi(Math.sqrt(a), 0)}\\,;\\,${arrondi(Math.sqrt(a), 0)}]$.`} ` } else { texteCorr += `    L'ensemble des solutions de l'inéquation $x^2${choix ? '<' : ' \\leqslant '}${a}$ est : ${choix ? `$S=]-\\sqrt{${a}}\\,;\\,\\sqrt{${a}}[$`: `$S=[-\\sqrt{${a}}\\,;\\,\\sqrt{${a}}]$`}.`}
          }
          break
      }
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
  this.besoinFormulaireNumerique = ['Choix des questions', 3, '1 : Avec des fonctions affines\n2 : Avec des fonctions polynômes du second degré\n3 : Avec un graphique']
}
