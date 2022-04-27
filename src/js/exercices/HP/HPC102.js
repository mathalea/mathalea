import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, texNombre } from '../../modules/outils.js'
import { aleaVariables } from '../../modules/outilsMathjs.js'
import { create, all, sqrt } from 'mathjs'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
// import { calcule } from '../../modules/fonctionsMaths.js'

// const math = { simplify: simplify, parse: parse, derivative: derivative }
export const titre = 'Calculs de probabilité avec la loi normale'
const math = create(all)
/**
 * Calculs de probas
 * @author Maxime Nguyen
 * Référence HPC102
*/

export default function CalculsLoiNormale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calcul de probabilités pour une loi normale. Les évaluations numériques peuvent se faire à l\'aide d\'une table de valeur de la loi normale centrée réduite.'
  this.nbQuestions = 4
  this.nbCols = 1 // Nombre de colonnes pour la sortie LaTeX
  this.nbColsCorr = 1 // Nombre de colonnes dans la correction pour la sortie LaTeX
  this.sup = 1
  this.spacing = 1
  this.spacingCorr = 1.5
  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) {
      listeTypeDeQuestionsDisponibles = ['N01']
    } else if (this.sup === 2) {
      listeTypeDeQuestionsDisponibles = ['Nmusigma', 'Nmusigmaintervallecentre']
    } else {
      listeTypeDeQuestionsDisponibles = ['N01']
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, variables, expression, resultat, resultat_a, resultat_b, bornea, oppbornea, borneb, oppborneb, mu, sigma, bornec, borned, calculstep, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'N01':
          variables = aleaVariables(
            {
              a: 'pickRandom([-1,1])*round(random(0.1,3),2)',
              b: 'pickRandom([-1,1])*round(random(0.1,3),2)',
              test: 'a<b'
            }
          )
          bornea = texNombre(variables.a)
          oppbornea = texNombre(-variables.a)
          borneb = texNombre(variables.b)
          oppborneb = texNombre(-variables.b)
          bornec = bornea
          borned = borneb
          resultat = 0.5 * math.erf(variables.b / sqrt(2)) - 0.5 * math.erf(variables.a / sqrt(2))
          expression = `$\\mathrm{P}(${bornea} < X < ${borneb})$`
          calculstep = []
          texte = 'Soit $X$ une variable aléatoire réelle suivant une loi normale $\\mathcal{N}(0,1)$. <br> Calculer à $10^{-2}$ près la probabilité : ' + expression
          texteCorr = 'On décompose pour exprimer la probabilité avec la fonction de répartition $t \\mapsto \\mathrm{P}(X \\leq t)$ en utilisant la tabulation de ses valeurs pour $t \\geq 0$ : <br>'
          calculstep.push(`\\mathrm{P}(${bornea} < X < ${borneb}) &=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X \\leq ${bornea}) &&`)
          if (variables.b < 0) {
            resultat_b = texNombre(0.5 + 0.5 * math.erf(-variables.b / sqrt(2)), 3)
            if (variables.a < 0) {
              resultat_a = texNombre(0.5 + 0.5 * math.erf(-variables.a / sqrt(2)), 3)
              calculstep.push(` &=  \\mathrm{P}(X > ${(oppborneb)}) - \\mathrm{P}(X \\geq ${oppbornea}) && (\\text{par symétrie de la loi normale})`)
              calculstep.push(` &=  1 - \\mathrm{P}(X \\leq ${(oppborneb)}) - (1-\\mathrm{P}(X < ${oppbornea})) && (\\text{par passage au complémentaire})`)
              calculstep.push(` &=  \\mathrm{P}(X < ${oppbornea}) - \\mathrm{P}(X \\leq ${(oppborneb)}) &&`)
              calculstep.push(` &\\approx ${resultat_a} - ${resultat_b} &&`)
            } else {
              resultat_a = texNombre(0.5 + 0.5 * math.erf(variables.a / sqrt(2)), 3)
              calculstep.push(` &=  \\mathrm{P}(X > ${(oppborneb)}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par symétrie de la loi normale})`)
              calculstep.push(` &=  1 - \\mathrm{P}(X \\leq ${(oppborneb)}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par passage au complémentaire})`)
              calculstep.push(` &\\approx 1 - ${resultat_b} - ${resultat_a} &&`)
            }
          } else if (variables.a < 0) {
            resultat_a = texNombre(0.5 + 0.5 * math.erf(-variables.a / sqrt(2)), 3)
            resultat_b = texNombre(0.5 + 0.5 * math.erf(variables.b / sqrt(2)), 3)
            calculstep.push(` &=  \\mathrm{P}(X < ${(borneb)}) - \\mathrm{P}(X > ${oppbornea}) && (\\text{par symétrie de la loi normale})`)
            calculstep.push(` &=  \\mathrm{P}(X < ${(borneb)}) - (1 - \\mathrm{P}(X \\leq ${oppbornea})) && (\\text{par passage au complémentaire})`)
            calculstep.push(` &\\approx  ${resultat_b} - (1 - ${resultat_a}) &&`)
          } else {
            resultat_a = texNombre(0.5 + 0.5 * math.erf(variables.a / sqrt(2)), 3)
            resultat_b = texNombre(0.5 + 0.5 * math.erf(variables.b / sqrt(2)), 3)
            calculstep.push(`&\\approx  ${resultat_b} - ${resultat_a} &&`)
          }
          setReponse(this, i, resultat.toFixed(2))
          break
        case 'Nmusigma':
          variables = aleaVariables(
            {
              a: 'pickRandom([-1,1])*round(random(0.1,3),1)',
              b: 'pickRandom([-1,1])*round(random(0.1,3),1)',
              mu: 'randomInt(-30, 30)',
              sigma: 'round(random(0.1,4),1)',
              test: 'a<b'
            }
          )
          bornec = texNombre(variables.a * variables.sigma + variables.mu)
          borned = texNombre(variables.b * variables.sigma + variables.mu)
          bornea = texNombre(variables.a)
          oppbornea = texNombre(-variables.a)
          borneb = texNombre(variables.b)
          oppborneb = texNombre(-variables.b)
          mu = texNombre(variables.mu)
          sigma = texNombre(variables.sigma)
          resultat = 0.5 * math.erf(variables.b / sqrt(2)) - 0.5 * math.erf(variables.a / sqrt(2))
          expression = `$\\mathrm{P}(${bornec} < X < ${borned})$`
          calculstep = []
          texte = `Soit $X$ une variable aléatoire réelle suivant une loi normale $\\mathcal{N}(\\mu=${mu},\\sigma=${sigma})$. <br> Calculer à $10^{-2}$ près la probabilité : ` + expression
          if (variables.mu < 0) {
            texteCorr = `On pose $Z = \\frac{X + ${texNombre(-variables.mu)}}{${sigma}}$ `
            calculstep.push(`\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} + ${texNombre(-variables.mu)}}{${sigma}}   < \\frac{X + ${texNombre(-variables.mu)}}{${sigma}} < \\frac{${borned} + ${texNombre(-variables.mu)}}{${sigma}}  \\right) &&`)
          } else {
            texteCorr = `On pose $Z = \\frac{X - ${mu}}{${sigma}}$ `
            calculstep.push(`\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} - ${mu}}{${sigma}}   < \\frac{X - ${mu}}{${sigma}} < \\frac{${borned} - ${mu}}{${sigma}}  \\right) &&`)
          }
          texteCorr += ' de telle sorte que $Z$ suive une loi $\\mathcal{N}(0,1)$. <br><br>'
          calculstep.push(`&= \\mathrm{P}\\left( ${bornea}   < Z < ${borneb}  \\right)`)
          calculstep.push(`&=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X \\leq ${bornea}) &&`)
          if (variables.b < 0) {
            resultat_b = texNombre(0.5 + 0.5 * math.erf(-variables.b / sqrt(2)), 3)
            if (variables.a < 0) {
              resultat_a = texNombre(0.5 + 0.5 * math.erf(-variables.a / sqrt(2)), 3)
              calculstep.push(` &=  \\mathrm{P}(X > ${(oppborneb)}) - \\mathrm{P}(X \\geq ${oppbornea}) && (\\text{par symétrie de la loi normale})`)
              calculstep.push(` &=  1 - \\mathrm{P}(X \\leq ${(oppborneb)}) - (1-\\mathrm{P}(X < ${oppbornea})) && (\\text{par passage au complémentaire})`)
              calculstep.push(` &=  \\mathrm{P}(X < ${oppbornea}) - \\mathrm{P}(X \\leq ${(oppborneb)}) &&`)
              calculstep.push(` &\\approx ${resultat_a} - ${resultat_b} &&`)
            } else {
              resultat_a = texNombre(0.5 + 0.5 * math.erf(variables.a / sqrt(2)), 3)
              calculstep.push(` &=  \\mathrm{P}(X > ${(oppborneb)}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par symétrie de la loi normale})`)
              calculstep.push(` &=  1 - \\mathrm{P}(X \\leq ${(oppborneb)}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par passage au complémentaire})`)
              calculstep.push(` &\\approx 1 - ${resultat_b} - ${resultat_a} &&`)
            }
          } else if (variables.a < 0) {
            resultat_a = texNombre(0.5 + 0.5 * math.erf(-variables.a / sqrt(2)), 3)
            resultat_b = texNombre(0.5 + 0.5 * math.erf(variables.b / sqrt(2)), 3)
            calculstep.push(` &=  \\mathrm{P}(X < ${(borneb)}) - \\mathrm{P}(X > ${oppbornea}) && (\\text{par symétrie de la loi normale})`)
            calculstep.push(` &=  \\mathrm{P}(X < ${(borneb)}) - (1 - \\mathrm{P}(X \\leq ${oppbornea})) && (\\text{par passage au complémentaire})`)
            calculstep.push(` &\\approx  ${resultat_b} - (1 - ${resultat_a}) &&`)
          } else {
            resultat_a = texNombre(0.5 + 0.5 * math.erf(variables.a / sqrt(2)), 3)
            resultat_b = texNombre(0.5 + 0.5 * math.erf(variables.b / sqrt(2)), 3)
            calculstep.push(`&\\approx  ${resultat_b} - ${resultat_a} &&`)
          }
          setReponse(this, i, resultat.toFixed(2))
          break
        case 'Nmusigmaintervallecentre':
          variables = aleaVariables(
            {
              a: 'round(random(0.1,3),1)',
              mu: 'randomInt(-30, 30)',
              sigma: 'round(random(0.1,4),1)'
            }
          )
          bornec = texNombre(-variables.a * variables.sigma + variables.mu)
          borned = texNombre(variables.a * variables.sigma + variables.mu)
          bornea = texNombre(-variables.a)
          borneb = texNombre(variables.a)
          mu = texNombre(variables.mu)
          sigma = texNombre(variables.sigma)
          resultat = 0.5 * math.erf(variables.a / sqrt(2)) - 0.5 * math.erf(-variables.a / sqrt(2))
          expression = `$\\mathrm{P}(${bornec} < X < ${borned})$`
          calculstep = []
          texte = `Soit $X$  une variable aléatoire réelle suivant une loi normale $\\mathcal{N}(\\mu=${mu},\\sigma=${sigma})$. <br> Calculer à $10^{-2}$ près la probabilité : ` + expression
          if (variables.mu < 0) {
            texteCorr = `On pose $Z = \\frac{X + ${texNombre(-variables.mu)}}{${sigma}}$ `
            calculstep.push(`\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} + ${texNombre(-variables.mu)}}{${sigma}}   < \\frac{X + ${texNombre(-variables.mu)}}{${sigma}} < \\frac{${borned} + ${texNombre(-variables.mu)}}{${sigma}}  \\right) &&`)
          } else {
            texteCorr = `On pose $Z = \\frac{X - ${mu}}{${sigma}}$ `
            calculstep.push(`\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} - ${mu}}{${sigma}}   < \\frac{X - ${mu}}{${sigma}} < \\frac{${borned} - ${mu}}{${sigma}}  \\right) &&`)
          }
          texteCorr += ' de telle sorte que $Z$ suive une loi $\\mathcal{N}(0,1)$. <br><br>'
          calculstep.push(`&= \\mathrm{P}\\left( ${bornea}   < Z < ${borneb}  \\right)`)
          calculstep.push(`&=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X \\leq ${bornea}) &&`)
          resultat_a = texNombre(0.5 + 0.5 * math.erf(variables.a / sqrt(2)), 3)
          calculstep.push(` &=  2\\times\\mathrm{P}(X < ${(borneb)}) - 1 && (\\text{par symétrie de la loi normale})`)
          calculstep.push(` &\\approx  2\\times ${resultat_a} - 1 &&`)
          setReponse(this, i, resultat.toFixed(2))
          break
      }
      calculstep.push(`&\\approx  ${texNombre(resultat, 2)} &&`)
      texteCorr += String.raw`
      $\begin{aligned}
      ${calculstep.join('\\\\')}
      \end{aligned}$ <br>`
      texteCorr += `La probabilité est : $\\mathrm{P}(${bornec} < X < ${borned}) \\approx ${texNombre(resultat, 2)}$` //  ${resultat}$`

      // texte = texte.replaceAll('frac', 'dfrac')
      texteCorr = texteCorr.replaceAll('frac', 'dfrac')
      if (this.interactif) {
        texte += '<br><br>' + ajouteChampTexteMathLive(this, i, 'inline largeur25', { texte: `La probabilité est : $\\mathrm{P}(${bornec} < X < ${borned}) \\approx $` })
      }
      if (this.liste_valeurs.indexOf(expression) === -1) {
        this.liste_valeurs.push(expression)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Loi normale centrée réduite \n2 : Loi normale quelconque']
}