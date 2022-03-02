import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { toString, aleaVariables, assignVariables, calculer, toTex, resoudre } from '../../modules/outilsMathjs.js'
import { GraphicView } from '../../modules/aleaFigure/GraphicView.js'
import { create, all } from 'mathjs'

export const math = create(all)
math.config({
  number: 'number',
  randomSeed: context.graine
})

export const titre = 'Périmètre, aire, équation'
export const dateDePublication = '01/03/2022'
/**
 * @author Frédéric PIOU
 * Problème à partir de https://twitter.com/blatherwick_sam/status/1497292774621822979
 */
export default class problemes extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 2
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = false
    this.besoinFormulaire2Numerique = ['Types de valeurs dans l\'équation', 2, '1 - Entiers positifs\n 2 - Entiers relatifs']
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    for (let i = 0, cpt = 0, exercice = {}; i < this.nbQuestions && cpt < 50;) {
      const numeroquestion = this.nbQuestions % 2 === 0 ? i % 2 + 1 : Math.floor(Math.random() * 2) + 1
      switch (numeroquestion) {
        case 1: {
          const graphic = new GraphicView(0, 0, 7, 5)
          let ABCD
          do {
            if (ABCD !== undefined) {
              graphic.geometric.pop()
              graphic.geometric.pop()
              graphic.geometric.pop()
              graphic.geometric.pop()
            }
            ABCD = graphic.addRectangle()
          } while (ABCD.ratio > 1.7 || ABCD.ratio < 0.6 || (ABCD.ratio > 0.8 && ABCD.ration < 1.2))
          const [A, B, C, D] = ABCD.vertices
          const angles = graphic.addAnglesPolygon(A, B, C, D)
          const AB = graphic.addSegment(A, B)
          AB.direct = graphic.addAngle(A, B, C).direct
          const BC = graphic.addSegment(B, C)
          BC.direct = AB.direct
          const CD = graphic.addSegment(C, D)
          const DA = graphic.addSegment(D, A)
          const variables = aleaVariables({
            a: this.sup2 !== 1,
            c: this.sup2 !== 1,
            x: this.sup2 !== 1,
            AB: (10 * graphic.distance(A, B)).toFixed(0),
            BC: (10 * graphic.distance(B, C)).toFixed(0),
            b: 'AB-a*x',
            d: 'BC-c*x',
            p: '2*(a*x+b+c*x+d)',
            test: 'a*x+b>0 and c*x+d>0'
          })
          delete variables.x
          const exprAB = toString(assignVariables('a*x+b', variables))
          const exprBC = toString(assignVariables('c*x+d', variables))
          AB.text = context.isHtml ? `${exprAB}`.replaceAll('*', '') : `$${exprAB}$`.replaceAll('*', '')
          BC.text = context.isHtml ? `${exprBC}`.replaceAll('*', '') : `$${exprBC}$`.replaceAll('*', '')
          const p = variables.p
          const graph = graphic.getFigure(ABCD, AB, BC, ...angles.map(x => { x.right = true; return x }))
          const resolution = resoudre(`${p}=2*(${exprAB}) + 2*(${exprBC})`, { suppr1: false, substeps: this.correctionDetaillee })
          const calculAB = calculer('a*(x)+b'.replace('x', resolution.solution.exact), { name: AB.name, suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          const calculBC = calculer('c*(x)+d'.replace('x', resolution.solution.exact), { name: BC.name, suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          const calculAire = calculer(`${calculAB.result}*${calculBC.result}`, { name: '\\mathcal{A}', suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          let solutionDecimale = math.fraction(calculAire.result.replaceAll(' ', '')).valueOf()
          const environ = solutionDecimale === math.round(solutionDecimale, 2) ? '' : 'environ'
          solutionDecimale = math.round(solutionDecimale, 2).toString()
          exercice.texte = `$${ABCD.name}$ est un rectangle.

$x$ est un nombre tel que $ {${AB.name}=${toTex(exprAB)}}$ et $ {${BC.name}=${toTex(exprBC)}}$ en $cm$.

Le périmètre de $${ABCD.name}$ mesure $${p}~cm$.

Déterminer son aire en $cm^2$.

${graph}`
          exercice.texteCorr = String.raw`$${ABCD.name}$ est un rectangle donc ses côtés opposés sont de la même longueur.

D'où $${AB.name}=${CD.name}$ et $${BC.name}=${DA.name}$.

Ainsi, $${toTex(`${p} = 2*${AB.name} + 2*${BC.name}`)}$.

Ou encore $${toTex(`${p} = 2*(${exprAB}) + 2*(${exprBC})`)}$.

$\textbf{Résolvons cette équation d'inconnue $x$}$.

${resolution.texteCorr}

$\textbf{Calculons $${AB.name}$ en cm.}$

${calculAB.texteCorr}

$\textbf{Calculons $${BC.name}$ en cm.}$

${calculBC.texteCorr}

$\textbf{Calculons l'aire $\mathcal{A}$ de $${ABCD.name}$ en $cm^2$.}$

${calculAire.texteCorr}

Donc l'aire du rectangle $${ABCD.name}$ est ${environ} $${toTex(solutionDecimale)}~cm^2$.`
          break
        }
        case 2: {
          const graphic = new GraphicView(0, 0, 7, 5)
          let ABCD
          do {
            if (ABCD !== undefined) {
              graphic.geometric.pop()
              graphic.geometric.pop()
              graphic.geometric.pop()
              graphic.geometric.pop()
            }
            ABCD = graphic.addRectangle()
          } while (ABCD.ratio > 1.7 || ABCD.ratio < 0.6 || (ABCD.ratio > 0.8 && ABCD.ration < 1.2))
          const [A, B, C, D] = ABCD.vertices
          const angles = graphic.addAnglesPolygon(A, B, C, D)
          const AB = graphic.addSegment(A, B)
          AB.direct = graphic.addAngle(A, B, C).direct
          const BC = graphic.addSegment(B, C)
          const CD = graphic.addSegment(C, D)
          CD.direct = AB.direct
          const DA = graphic.addSegment(D, A)
          const variables = aleaVariables({
            c: this.sup2 !== 1,
            x: this.sup2 !== 1,
            a: this.sup2 !== 1,
            AB: (10 * graphic.distance(A, B)).toFixed(0),
            BC: (10 * graphic.distance(B, C)).toFixed(0),
            b: 'AB-a*x',
            d: 'AB-c*x',
            p: '2*(AB+BC)',
            test: 'a!=c and a*x+b>0'
          })
          delete variables.x
          const exprAB = toString(assignVariables('a*x+b', variables))
          const exprCD = toString(assignVariables('c*x+d', variables))
          AB.text = context.isHtml ? `${exprAB}`.replaceAll('*', '') : `$${exprAB}$`.replaceAll('*', '')
          CD.text = context.isHtml ? `${exprCD}`.replaceAll('*', '') : `$${exprCD}$`.replaceAll('*', '')
          const p = variables.p
          const graph = graphic.getFigure(ABCD, AB, CD, ...angles.map(x => { x.right = true; return x }))
          const resolution = resoudre(`${exprAB}=${exprCD}`, { suppr1: false, substeps: this.correctionDetaillee })
          const calculAB = calculer('a*(x)+b'.replace('x', resolution.solution.exact), { name: AB.name, suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          const resolution2 = resoudre(`${p} = 2*${calculAB.result} + 2*${BC.name}`, { suppr1: false, substeps: this.correctionDetaillee })
          const calculAire = calculer(`${calculAB.result}*${resolution2.solution.exact}`, { name: '\\mathcal{A}', suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          let solutionDecimale = math.fraction(calculAire.result.replaceAll(' ', '')).valueOf()
          const environ = solutionDecimale === math.round(solutionDecimale, 2) ? '' : 'environ'
          solutionDecimale = math.round(solutionDecimale, 2).toString()
          exercice.texte = `$${ABCD.name}$ est un rectangle.

$x$ est un nombre tel que $ {${AB.name}=${toTex(exprAB)}}$ et $ {${CD.name}=${toTex(exprCD)}}$ en $cm$.

Le périmètre de $${ABCD.name}$ mesure $${p}~cm$.

Déterminer son aire en $cm^2$.

${graph}`
          exercice.texteCorr = String.raw`$${ABCD.name}$ est un rectangle donc ses côtés opposés sont de la même longueur.

D'où $${AB.name}=${CD.name}$ et $${BC.name}=${DA.name}$.

Ainsi $${toTex(`${exprAB}=${exprCD}`)}$.

$\textbf{Résolvons l'équation.}$

${resolution.texteCorr}

$\textbf{Calculons $${AB.name}$ en cm}.$

${calculAB.texteCorr}

Ainsi, $${toTex(`${p} = 2* (${calculAB.result}) + 2* ${BC.name}`)}$.

$\textbf{Résolvons cette équation d'inconnue $${BC.name}$}$.

${resolution2.texteCorr}

$\textbf{Calculons l'aire $\mathcal{A}$ de $${ABCD.name}$ en $cm^2$.}$

${calculAire.texteCorr}

Donc l'aire du rectangle $${ABCD.name}$ est ${environ} $${toTex(solutionDecimale)}~cm^2$.`
          break
        }
      }
      if (this.questionJamaisPosee(i, i)) {
        this.listeQuestions.push(exercice.texte.replaceAll('\n\n', '<br>'))
        this.listeCorrections.push(exercice.texteCorr.replaceAll('\n\n', '<br>'))
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
