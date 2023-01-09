import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, pgcd, texFractionReduite, lettreMinusculeDepuisChiffre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Compléter un tableau de valeurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
* Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique
*
* * Niveau 1 : Fonctions affines
* * Niveau 2 : Polynôme du second degré
* * Niveau 3 : Quotients de fonctions affines
* * Niveau 4 : (ax+b)(cx+d)
* * Niveau 5 : Mélange
* @author Rémi Angot
* 3F12-3
*/
export const uuid = 'afb2f'
export const ref = '3F12-3'
export default function TableauDeValeurs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 5 // niveau de difficulté
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function () {
    this.spacing = this.interactif ? 2 : 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.sup = parseInt(this.sup)
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['ax+b', 'ax']
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['ax2+bx+c', 'ax2+c', 'ax2+bx']
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = ['a/cx+d', 'ax+b/cx+d']
    }
    if (this.sup === 4) {
      typesDeQuestionsDisponibles = ['(ax+b)(cx+d)', '(ax+b)2']
    }
    if (this.sup === 5) {
      typesDeQuestionsDisponibles = ['ax+b', 'ax', 'ax2+bx+c', 'ax2+c', 'ax2+bx', 'a/cx+d', 'ax+b/cx+d', '(ax+b)(cx+d)', '(ax+b)2']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeDeX = combinaisonListes([[-3, 0, 3], [-2, 0, 2], [1, 2, 5], [-3, 6, 9]], this.nbQuestions)
    for (let i = 0, texte, texteCorr, reponse = [], a, b, c, d, f, x1, x2, x3, expression, nomdef, ligne2, calculs = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      nomdef = lettreMinusculeDepuisChiffre(6 + i) // on commence par f puis on continue dans l'ordre alphabétique
      x1 = listeDeX[i][0]
      x2 = listeDeX[i][1]
      x3 = listeDeX[i][2]
      switch (listeTypeDeQuestions[i]) {
        case 'ax+b':
          a = randint(-10, 10, [0, -1, 1])
          b = randint(-10, 10, [0])
          expression = `${a}x${ecritureAlgebrique(b)}`
          f = x => a * x + b
          ligne2 = `${nomdef}(x) & ${a * listeDeX[i][0] + b} & ${a * listeDeX[i][1] + b} & ${a * listeDeX[i][2] + b} \\\\\n`
          calculs = `$${nomdef}(${x1})=${a}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(b)}=${a * x1}${ecritureAlgebrique(b)}=${a * x1 + b}$<br>`
          calculs += `$${nomdef}(${x2})=${a}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(b)}=${a * x2}${ecritureAlgebrique(b)}=${a * x2 + b}$<br>`
          calculs += `$${nomdef}(${x3})=${a}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(b)}=${a * x3}${ecritureAlgebrique(b)}=${a * x3 + b}$<br>`
          reponse = [f(x1), f(x2), f(x3)]
          break
        case 'ax':
          a = randint(-10, 10, [0, -1, 1])
          expression = `${a}x`
          ligne2 = `${nomdef}(x) & ${a * listeDeX[i][0]} & ${a * listeDeX[i][1]} & ${a * listeDeX[i][2]} \\\\\n`
          calculs = `$${nomdef}(${x1})=${a}\\times${ecritureParentheseSiNegatif(x1)}=${a * x1}$<br>`
          calculs += `$${nomdef}(${x2})=${a}\\times${ecritureParentheseSiNegatif(x2)}=${a * x2}$<br>`
          calculs += `$${nomdef}(${x3})=${a}\\times${ecritureParentheseSiNegatif(x3)}=${a * x3}$<br>`
          f = x => a * x
          reponse = [f(x1), f(x2), f(x3)]
          break
        case 'ax2+bx+c':
          a = randint(-3, 3, [0, -1, 1])
          b = randint(-5, 5, [0, -1, 1])
          c = randint(-10, 10, [0])
          expression = `${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}`
          ligne2 = `${nomdef}(x) & ${a * listeDeX[i][0] ** 2 + b * listeDeX[i][0] + c} & ${a * listeDeX[i][1] ** 2 + b * listeDeX[i][1] + c} & ${a * listeDeX[i][2] ** 2 + b * listeDeX[i][2] + c} \\\\\n`
          calculs = `$${nomdef}(${x1})=${a}\\times${ecritureParentheseSiNegatif(x1)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(c)}=${a}\\times${x1 ** 2}${ecritureAlgebrique(b * x1)}${ecritureAlgebrique(c)}=${a * x1 ** 2 + b * x1 + c}$<br>`
          calculs += `$${nomdef}(${x2})=${a}\\times${ecritureParentheseSiNegatif(x2)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(c)}=${a}\\times${x2 ** 2}${ecritureAlgebrique(b * x2)}${ecritureAlgebrique(c)}=${a * x2 ** 2 + b * x2 + c}$<br>`
          calculs += `$${nomdef}(${x3})=${a}\\times${ecritureParentheseSiNegatif(x3)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(c)}=${a}\\times${x3 ** 2}${ecritureAlgebrique(b * x3)}${ecritureAlgebrique(c)}=${a * x3 ** 2 + b * x3 + c}$<br>`
          f = x => a * x ** 2 + b * x + c
          reponse = [f(x1), f(x2), f(x3)]
          break
        case 'ax2+c':
          a = randint(-4, 4, [0, -1, 1])
          c = randint(-10, 10, [0])
          expression = `${a}x^2${ecritureAlgebrique(c)}`
          ligne2 = `${nomdef}(x) & ${a * listeDeX[i][0] ** 2 + c} & ${a * listeDeX[i][1] ** 2 + c} & ${a * listeDeX[i][2] ** 2 + c} \\\\\n`
          calculs = `$${nomdef}(${x1})=${a}\\times${ecritureParentheseSiNegatif(x1)}^2${ecritureAlgebrique(c)}=${a}\\times${x1 ** 2}${ecritureAlgebrique(c)}=${a * x1 ** 2 + c}$<br>`
          calculs += `$${nomdef}(${x2})=${a}\\times${ecritureParentheseSiNegatif(x2)}^2${ecritureAlgebrique(c)}=${a}\\times${x2 ** 2}${ecritureAlgebrique(c)}=${a * x2 ** 2 + c}$<br>`
          calculs += `$${nomdef}(${x3})=${a}\\times${ecritureParentheseSiNegatif(x3)}^2${ecritureAlgebrique(c)}=${a}\\times${x3 ** 2}${ecritureAlgebrique(c)}=${a * x3 ** 2 + c}$<br>`
          f = x => a * x ** 2 + c
          reponse = [f(x1), f(x2), f(x3)]
          break
        case 'ax2+bx':
          a = randint(-3, 3, [0, -1, 1])
          b = randint(-5, 5, [0, -1, 1])
          c = randint(-10, 10, [0])
          expression = `${a}x^2${ecritureAlgebrique(b)}x`
          ligne2 = `${nomdef}(x) & ${a * listeDeX[i][0] ** 2 + b * listeDeX[i][0]} & ${a * listeDeX[i][1] ** 2 + b * listeDeX[i][1]} & ${a * listeDeX[i][2] ** 2 + b * listeDeX[i][2]} \\\\\n`
          calculs = `$${nomdef}(${x1})=${a}\\times${ecritureParentheseSiNegatif(x1)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(x1)}=${a}\\times${x1 ** 2}${ecritureAlgebrique(b * x1)}=${a * x1 ** 2 + b * x1}$<br>`
          calculs += `$${nomdef}(${x2})=${a}\\times${ecritureParentheseSiNegatif(x2)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(x2)}=${a}\\times${x2 ** 2}${ecritureAlgebrique(b * x2)}=${a * x2 ** 2 + b * x2}$<br>`
          calculs += `$${nomdef}(${x3})=${a}\\times${ecritureParentheseSiNegatif(x3)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(x3)}=${a}\\times${x3 ** 2}${ecritureAlgebrique(b * x3)}=${a * x3 ** 2 + b * x3}$<br>`
          f = x => a * x ** 2 + b * x
          reponse = [f(x1), f(x2), f(x3)]
          break
        case 'a/cx+d':
          this.spacingCorr = 3
          a = randint(-10, 10, [0])
          c = randint(-10, 10, [0, -1, 1])
          d = randint(-10, 10, [0])
          while (c * x1 + d === 0 || c * x2 + d === 0 || c * x3 + d === 0) {
            c = randint(-10, 10, [0, -1, 1])
          }
          expression = `\\dfrac{${a}}{${c}x${ecritureAlgebrique(d)}}`
          ligne2 = `${nomdef}(x) & ${texFractionReduite(a, c * listeDeX[i][0] + d)} & ${texFractionReduite(a, c * listeDeX[i][1] + d)} & ${texFractionReduite(a, c * listeDeX[i][2] + d)} \\\\\n`
          calculs = `$${nomdef}(${x1})=\\dfrac{${a}}{${c}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(d)}}=\\dfrac{${a}}{${c * x1}${ecritureAlgebrique(d)}}=${fraction(a, c * x1 + d).texFSD}`
          if (pgcd(a, c * x1 + d) === 1) {
            calculs += '$<br>'
          } else {
            calculs += '=' + texFractionReduite(a, c * x1 + d) + '$<br>'
          }
          calculs += `$${nomdef}(${x2})=\\dfrac{${a}}{${c}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(d)}}=\\dfrac{${a}}{${c * x2}${ecritureAlgebrique(d)}}=${fraction(a, c * x2 + d).texFSD}`
          if (pgcd(a, c * x2 + d) === 1) {
            calculs += '$<br>'
          } else {
            calculs += '=' + texFractionReduite(a, c * x2 + d) + '$<br>'
          }
          calculs += `$${nomdef}(${x3})=\\dfrac{${a}}{${c}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(d)}}=\\dfrac{${a}}{${c * x3}${ecritureAlgebrique(d)}}=${fraction(a, c * x3 + d).texFSD}`
          if (pgcd(a, c * x3 + d) === 1) {
            calculs += '$<br>'
          } else {
            calculs += '=' + texFractionReduite(a, c * x3 + d) + '$<br>'
          }
          f = x => a / (c * x + d)
          reponse = [fraction(a, c * x1 + d).simplifie(), fraction(a, c * x2 + d).simplifie(), fraction(a, c * x3 + d).simplifie()]
          break
        case 'ax+b/cx+d':
          this.spacingCorr = 3
          a = randint(-10, 10, [0, 1, -1])
          b = randint(-10, 10, [0])
          c = randint(-10, 10, [0, -1, 1])
          d = randint(-10, 10, [0])
          while (c * x1 + d === 0 || c * x2 + d === 0 || c * x3 + d === 0) {
            c = randint(-10, 10, [0, -1, 1])
          }
          expression = `\\dfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}}`
          ligne2 = `${nomdef}(x) & ${texFractionReduite(a * listeDeX[i][0] + b, c * listeDeX[i][0] + d)} & ${texFractionReduite(a * listeDeX[i][1] + b, c * listeDeX[i][1] + d)} & ${texFractionReduite(a * listeDeX[i][2] + b, c * listeDeX[i][2] + d)} \\\\\n`
          calculs = `$${nomdef}(${x1})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(b)}}{${c}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(d)}}=\\dfrac{${a * x1}${ecritureAlgebrique(b)}}{${c * x1}${ecritureAlgebrique(d)}}=\\dfrac{${a * x1 + b}}{${c * x1 + d}}`
          if (pgcd(a * x1 + b, c * x1 + d) === 1) {
            calculs += '$<br>'
          } else {
            calculs += '=' + texFractionReduite(a * x1 + b, c * x1 + d) + '$<br>'
          }
          calculs += `$${nomdef}(${x2})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(b)}}{${c}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(d)}}=\\dfrac{${a * x2}${ecritureAlgebrique(b)}}{${c * x2}${ecritureAlgebrique(d)}}=\\dfrac{${a * x2 + b}}{${c * x2 + d}}`
          if (pgcd(a * x2 + b, c * x2 + d) === 1) {
            calculs += '$<br>'
          } else {
            calculs += '=' + texFractionReduite(a * x2 + b, c * x2 + d) + '$<br>'
          }
          calculs += `$${nomdef}(${x3})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(b)}}{${c}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(d)}}=\\dfrac{${a * x3}${ecritureAlgebrique(b)}}{${c * x3}${ecritureAlgebrique(d)}}=\\dfrac{${a * x3 + b}}{${c * x3 + d}}`
          if (pgcd(a * x3 + b, c * x3 + d) === 1) {
            calculs += '$<br>'
          } else {
            calculs += '=' + texFractionReduite(a * x3 + b, c * x3 + d) + '$<br>'
          }
          f = x => (a * x + b) / (c * x + d)
          reponse = [fraction(a * x1 + b, c * x1 + d).simplifie(), fraction(a * x2 + b, c * x2 + d).simplifie(), fraction(a * x3 + b, c * x3 + d).simplifie()]
          break
        case '(ax+b)(cx+d)':
          a = randint(-5, 5, [0, 1, -1])
          b = randint(-5, 5, [0])
          c = randint(-3, 3, [0, -1, 1])
          d = randint(-3, 3, [0])
          if (a < 0 && b < 0 && c < 0 && d < 0) {
            d = randint(1, 3)
          }
          expression = `(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})`
          ligne2 = `${nomdef}(x) & ${(a * listeDeX[i][0] + b) * (c * listeDeX[i][0] + d)} & ${(a * listeDeX[i][1] + b) * (c * listeDeX[i][1] + d)} & ${(a * listeDeX[i][2] + b) * (c * listeDeX[i][2] + d)} \\\\\n`
          calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(b)}\\right)\\left(${c}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(d)}\\right)=(${a * x1}${ecritureAlgebrique(b)})(${c * x1}${ecritureAlgebrique(d)})=${a * x1 + b}\\times ${ecritureParentheseSiNegatif(c * x1 + d)}=${(a * x1 + b) * (c * x1 + d)}$<br>`
          calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(b)}\\right)\\left(${c}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(d)}\\right)=(${a * x2}${ecritureAlgebrique(b)})(${c * x2}${ecritureAlgebrique(d)})=${a * x2 + b}\\times ${ecritureParentheseSiNegatif(c * x2 + d)}=${(a * x2 + b) * (c * x2 + d)}$<br>`
          calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(b)}\\right)\\left(${c}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(d)}\\right)=(${a * x3}${ecritureAlgebrique(b)})(${c * x3}${ecritureAlgebrique(d)})=${a * x3 + b}\\times ${ecritureParentheseSiNegatif(c * x3 + d)}=${(a * x3 + b) * (c * x3 + d)}$<br>`
          f = x => (a * x + b) * (c * x + d)
          reponse = [f(x1), f(x2), f(x3)]
          break
        case '(ax+b)2':
          a = randint(-3, 3, [0, 1, -1])
          b = randint(-3, 3, [0])
          expression = `(${a}x${ecritureAlgebrique(b)})^2`
          ligne2 = `${nomdef}(x) & ${(a * listeDeX[i][0] + b) ** 2} & ${(a * listeDeX[i][1] + b) ** 2} & ${(a * listeDeX[i][2] + b) ** 2} \\\\\n`
          calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(b)}\\right)^2=(${a * x1}${ecritureAlgebrique(b)})^2=${ecritureParentheseSiNegatif(a * x1 + b)}^2=${(a * x1 + b) ** 2}$<br>`
          calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(b)}\\right)^2=(${a * x2}${ecritureAlgebrique(b)})^2=${ecritureParentheseSiNegatif(a * x2 + b)}^2=${(a * x2 + b) ** 2}$<br>`
          calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecritureParentheseSiNegatif(x3)}${ecritureAlgebrique(b)}\\right)^2=(${a * x3}${ecritureAlgebrique(b)})^2=${ecritureParentheseSiNegatif(a * x3 + b)}^2=${(a * x3 + b) ** 2}$<br>`
          f = x => (a * x + b) ** 2
          reponse = [f(x1), f(x2), f(x3)]
          break
      }

      texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$. ${this.interactif ? '<br>Calculer les images par $f$ suivantes.' : '<br>Compléter le tableau de valeurs suivant.<br><br>'}`
      texteCorr = ''
      // texte += '<br>'
      if (context.isHtml) {
        if (!this.interactif) texte += '$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|}\n'
      } else {
        texte += '$\\begin{array}{|l|c|c|c|}\n'
      }
      if (!this.interactif || !context.isHtml) {
        texte += '\\hline\n'
        texte += `x & ${listeDeX[i][0]} & ${listeDeX[i][1]} & ${listeDeX[i][2]} \\\\\n`
        texte += '\\hline\n'
        texte += `${nomdef}(x) & \\phantom{-10} & \\phantom{-10} & \\phantom{-10} \\\\\n`
        texte += '\\hline\n'
        texte += '\\end{array}\n$'
      }
      if (context.isHtml) {
        if (!this.interactif) texteCorr = '$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|}\n'
      } else {
        texteCorr = '$\\begin{array}{|l|c|c|c|}\n'
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$.\\\\ \n
          Calculer :\\\\ \na) $f(${listeDeX[i][0]})$\\\\ \nb) $f(${listeDeX[i][1]})$\\\\ \nc) $f(${listeDeX[i][2]})$\\\\ \n
          Utiliser le cadre pour les calculs si besoin puis coder les réponses.\\\\`,
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [{
                texte: '',
                statut: 4
              }
              ]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: calculs.split('<br>')[0],
                statut: '',
                reponse: {
                  texte: `a) $f(${listeDeX[i][0]})$`,
                  valeur: [reponse[0].type !== 'Fraction' ? reponse[0] : reponse[0].d === 1 ? reponse[0].num : reponse[0]],
                  param: {
                    signe: true,
                    approx: 0,
                    decimals: 1,
                    digits: 2,
                    formatInteractif: reponse[0].type !== 'Fraction' ? 'calcul' : reponse[0].d === 1 ? 'calcul' : 'fractionEgale'
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: calculs.split('<br>')[1],
                statut: '',
                reponse: {
                  texte: `b) $f(${listeDeX[i][1]})$`,
                  valeur: [reponse[1].type !== 'Fraction' ? reponse[1] : reponse[1].d === 1 ? reponse[1].num : reponse[1]],
                  param: {
                    signe: true,
                    approx: 0,
                    decimals: 1,
                    digits: 2,
                    formatInteractif: reponse[1].type !== 'Fraction' ? 'calcul' : reponse[1].d === 1 ? 'calcul' : 'fractionEgale'
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: calculs.split('<br>')[2],
                statut: '',
                reponse: {
                  texte: `c) $f(${listeDeX[i][2]})$`,
                  valeur: [reponse[2].type !== 'Fraction' ? reponse[2] : reponse[2].d === 1 ? reponse[2].num : reponse[2]],
                  param: {
                    signe: true,
                    approx: 0,
                    decimals: 1,
                    digits: 2,
                    formatInteractif: reponse[2].type !== 'Fraction' ? 'calcul' : reponse[2].d === 1 ? 'calcul' : 'fractionEgale'
                  }
                }
              }]
            }
          ]
        }
        if (reponse[0].type === 'Fraction') {
          if (reponse[0].den === 1) setReponse(this, i * 3, reponse[0].num, { formatInteractif: 'calcul' })
          else setReponse(this, i * 3, reponse[0], { formatInteractif: 'fractionEgale' })
        } else setReponse(this, i * 3, reponse[0], { formatInteractif: 'calcul' })
        if (reponse[1].type === 'Fraction') {
          if (reponse[1].den === 1) setReponse(this, i * 3 + 1, reponse[1].num, { formatInteractif: 'calcul' })
          else setReponse(this, i * 3 + 1, reponse[1], { formatInteractif: 'fractionEgale' })
        } else setReponse(this, i * 3 + 1, reponse[1], { formatInteractif: 'calcul' })
        if (reponse[2].type === 'Fraction') {
          if (reponse[2].den === 1) setReponse(this, i * 3 + 2, reponse[2].num, { formatInteractif: 'calcul' })
          else setReponse(this, i * 3 + 2, reponse[2], { formatInteractif: 'fractionEgale' })
        } else setReponse(this, i * 3 + 2, reponse[2], { formatInteractif: 'calcul' })
      } else if (this.interactif) {
        texte += `<br><br>$f(${listeDeX[i][0]}) = $` + ajouteChampTexteMathLive(this, i * 3, 'largeur25 inline')
        texte += `<br><br>$f(${listeDeX[i][1]}) = $` + ajouteChampTexteMathLive(this, i * 3 + 1, 'largeur25 inline')
        texte += `<br><br>$f(${listeDeX[i][2]}) = $` + ajouteChampTexteMathLive(this, i * 3 + 2, 'largeur25 inline')
        if (reponse[0].type === 'Fraction') {
          if (reponse[0].den === 1) setReponse(this, i * 3, reponse[0].num, { formatInteractif: 'calcul' })
          else setReponse(this, i * 3, reponse[0], { formatInteractif: 'fractionEgale' })
        } else setReponse(this, i * 3, reponse[0], { formatInteractif: 'calcul' })
        if (reponse[1].type === 'Fraction') {
          if (reponse[1].den === 1) setReponse(this, i * 3 + 1, reponse[1].num, { formatInteractif: 'calcul' })
          else setReponse(this, i * 3 + 1, reponse[1], { formatInteractif: 'fractionEgale' })
        } else setReponse(this, i * 3 + 1, reponse[1], { formatInteractif: 'calcul' })
        if (reponse[2].type === 'Fraction') {
          if (reponse[2].den === 1) setReponse(this, i * 3 + 2, reponse[2].num, { formatInteractif: 'calcul' })
          else setReponse(this, i * 3 + 2, reponse[2], { formatInteractif: 'fractionEgale' })
        } else setReponse(this, i * 3 + 2, reponse[2], { formatInteractif: 'calcul' })
      }

      texteCorr += '\\hline\n'
      texteCorr += `x & ${listeDeX[i][0]} & ${listeDeX[i][1]} & ${listeDeX[i][2]} \\\\\n`
      texteCorr += '\\hline\n'
      texteCorr += ligne2
      texteCorr += '\\hline\n'
      texteCorr += '\\end{array}\n$'
      if (this.correctionDetaillee) {
        texteCorr += '<br><br>'
        texteCorr += calculs
      }

      if (this.questionJamaisPosee(i, a, b, c, d, f, listeTypeDeQuestions[i])) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 5, '1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange']
}
