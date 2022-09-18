import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
export const titre = 'Instruction conditionnelle (scratch)'

/**
 * * Instructions conditionnelles
 * * numéro de l'exo ex : 3Algo1
 * * publié le  24/11/2020
 * @author Erwan Duplessy
 */
export const uuid = '8cbd6'
export const ref = '3I1'
export default function InstructionConditionnelle () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1
  this.nbQuestions = 2

  this.titre = titre
  this.consigne = 'Donner les coordonnées de la position finale du lutin.'
  this.typeExercice = 'Scratch'
  this.nbCols = 2
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  context.isHtml ? this.spacing = 1 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 1 : this.spacingCorr = 1
  this.listePackages = 'scratch3'
  // let typesDeQuestionsDisponibles;
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    function scratchblocksTikz (codeSvg, codeTikz) {
      if (context.isHtml) {
        return codeSvg
      } else {
        return codeTikz
      };
    };

    let texte = "La position initiale d'un lutin dans un repère est (0,0). Dans le programme, x désigne l'abscisse, et y désigne l'ordonnée d'un lutin. <br>" // texte de l'énoncé
    texte += 'Une variable a été créée, elle s\'appelle <code class="b">(var) :: ring</code>. <br>'
    let texteCorr = ' ' // texte du corrigé
    let codeTikz = '' // code pour dessiner les blocs en tikz
    let codeSvg = '' // code pour dessiner les blocs en svg
    let xLutin = 0
    let yLutin = 0

    codeTikz += '\\medskip \\\\ \\begin{scratch} <br>'
    codeSvg += '<pre class=\'blocks\'>'

    const n1 = randint(1, 10)
    const n2 = randint(1, 10)
    const n3 = randint(1, 10)
    const n4 = randint(1, 10)

    codeTikz += '\\blockmove{aller à x: \\ovalnum{0} y: \\ovalnum{0}}'
    codeSvg += 'quand le drapeau vert pressé <br>'
    codeSvg += 'Aller à x:(0) y:(0) <br>'
    codeSvg += `mettre (var) à (${n1}) <br>`
    codeSvg += ` si <(var) < [${n2}]> alors <br>`
    codeSvg += ' ajouter (100) à x <br>'
    if (this.sup > 1) {
      codeSvg += ` si <(var) > [${n3}]> alors <br>`
      codeSvg += ' ajouter (50) à x <br>'
      codeSvg += ' fin <br>'
    }
    codeSvg += ' sinon <br>'
    codeSvg += ' ajouter (70) à y <br>'
    if (this.sup > 2) {
      codeSvg += ` si <(var) > [${n4}]> alors <br>`
      codeSvg += ' ajouter (40) à y <br>'
      codeSvg += ' fin <br>'
    }
    codeSvg += ' fin <br>'

    codeSvg += '</pre>'
    codeTikz += '\\end{scratch}'

    texte += scratchblocksTikz(codeSvg, codeTikz)

    if (n1 < n2) {
      texteCorr += `Comme l'inégalité "${n1} < ${n2}" est vraie, alors on ajoute 100 à l'abscisse du lutin. <br>`
      xLutin += 100
      if (this.sup > 1) {
        if (n1 > n3) {
          texteCorr += `Comme l'inégalité "${n1} > ${n3}" est vraie, alors on ajoute 50 à l'abscisse du lutin. <br>`
          xLutin += 50
        } else {
          texteCorr += `Comme l'inégalité "${n1} > ${n3}" est fausse, alors on ne change pas l'abscisse du lutin. <br>`
        }
      }
    } else {
      texteCorr += `Comme l'inégalité "${n1} < ${n2}" est fausse, alors on ajoute 70 à l'ordonnée du lutin. <br>`
      yLutin += 70
      if (this.sup > 2) {
        if (n1 > n4) {
          texteCorr += `Comme l'inégalité "${n1} > ${n4}" est vraie, on ajoute 40 à l'ordonnée du lutin. <br>`
          yLutin += 40
        } else {
          texteCorr += `Comme l'inégalité "${n1} > ${n4}" est fausse, alors on ne change pas l'ordonnée du lutin. <br>`
        }
      }
    }
    texteCorr += ` La position finale est donc : (${xLutin} ; ${yLutin}).`

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Variante', 3, '1 : Sans condition imbriquée\n2 : Avec une condition imbriquée\n3 : Avec deux conditions imbriquées']
}
