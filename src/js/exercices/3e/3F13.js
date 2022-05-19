/* eslint-disable no-sequences */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, calcul, resolutionSystemeLineaire2x2 } from '../../modules/outils.js'
import { courbe2, mathalea2d, repere2 } from '../../modules/2d.js'
export const titre = 'Lire les antécédents d\'un nombre à partir d\'un graphique'

/**
* Un graphique étant tracé, déterminer les antécédents de nombres donnés.
* La fonction est un polynôme de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @author Rémi Angot
* 3F13
*/
export default function AntecedentGraphique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.sup = 2
  this.spacing = 1
  context.isHtml ? this.spacingCorr = 3 : this.spacingCorr = 1
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    let a, b, c, x1, x2, x3, fx1, fx2, fx3, numa, dena, numb, denb, texte, texteCorr, f
    this.sup = Number(this.sup)

    function initialiseVariables () {
      if (context.isHtml) { // repère -10 || 10
        x1 = randint(-6, -3)
        x2 = randint(x1 + 3, 2)
        x3 = randint(1, 8)
        fx1 = randint(-5, 5)
        fx2 = randint(-6, 6, fx1)
        fx3 = randint(-5, 5)
        c = randint(-5, 5)
      } else { // repère -5 || 5
        x1 = randint(-4, -2)
        x2 = randint(-1, 2, [0])
        x3 = randint(1, 4)
        fx1 = randint(-4, 4)
        fx2 = randint(-4, 4, fx1)
        fx3 = randint(-4, 4)
        c = randint(-3, 3)
      }
    };

    initialiseVariables()

    texte = 'On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>'

    if (this.sup === 1) {
      a = calcul((fx2 - fx1) / (x2 - x1))
      b = calcul(fx1 - a * x1)
      f = x => a * x + b
      if (fx2 !== fx1) {
        texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ et de $${fx2}$ par cette fonction $f$.<br><br>`
        texteCorr = `L'antécédent de $${fx1}$ est $${x1}$, on note $f(${x1})=${fx1}$.<br>`
        texteCorr += `L'antécédent de $${fx2}$ est $${x2}$, on note $f(${x2})=${fx2}$.`
      } else {
        texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ par cette fonction $f$.<br><br>`
        texteCorr = `$${fx1}$ possède une infinité d'antécédents : on note $f(x)=${fx1}$ quel que soit $x$.<br>`
      }
    }

    if (this.sup === 2) {
      if (randint(1, 4) < 2) { // une fois sur 4 il n'y a qu'un seul antécédent
        const x0 = randint(-2, 2)
        let fx0 = randint(-4, 4)
        if (!context.isHtml) {
          fx0 = randint(-2, 2)
        }
        a = randint(-3, 3, 0)
        texte += `Déterminer par lecture graphique le (ou les) antécédent(s) de $${fx0}$ par cette fonction $f$.<br><br>`
        texteCorr = `$${fx0}$ a un unique antécédent $${x0}$, on note $f(${x0})=${fx0}$.<br>`
        f = x => a * (x - x0) ** 2 + fx0
      } else {
        fx3 = fx1;
        [[numa, dena], [numb, denb]] = resolutionSystemeLineaire2x2(x1, x3, fx1, fx3, c)
        while (dena === 0 || denb === 0 || numa === 0) {
          x1 = randint(-4, -1)
          x3 = randint(1, 4)
          fx1 = randint(-7, 7)
          fx3 = fx1
          c = randint(-6, 6);
          [[numa, dena], [numb, denb]] = resolutionSystemeLineaire2x2(x1, x3, fx1, fx3, c)
        }
        a = numa / dena
        b = numb / denb
        x2 = 0
        fx2 = c
        f = x => a * x ** 2 + b * x + c
        texte += `Déterminer par lecture graphique le (ou les) antécédent(s) de $${fx1}$ par cette fonction $f$.<br><br>`
        texteCorr = `$${fx1}$ a deux antécédents $${x1}$ et $${x3}$, on note $f(${x1})=f(${x3})=${fx1}$.<br>`
      }
    }
    const r = repere2({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 })
    const Cf = courbe2(f, { repere: r, step: 0.2, color: 'purple' })
    texte += mathalea2d({ xmin: -10, xmax: 10, ymin: -10, ymax: 10, scale: 0.5 }, r, Cf)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }

  this.besoinFormulaireNumerique = ['Type de fonctions', 2, '1 : Affine\n2 : Polynôme du 2nd degré']
}
