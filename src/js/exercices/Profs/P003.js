import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { SvgReperageSurUnAxe, LatexReperageSurUnAxe } from '../../modules/macroSvgJs.js'
export const titre = 'Tracer des droites graduées'

/**
 * Pour imprimer des repères vierges pour les élèves.
 * @author Jean-Claude Lhote
 * référence : P003
 * publié le ?/2/2020
 */
export default function feuille_d_axes_gradues () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 3
  this.sup = 10
  this.consigneModifiable = false
  this.nbQuestionsModifiable = false
  this.nbColsModifiable = false
  this.nbColsCorrModifiable = false
  this.spacingModifiable = false
  this.spacingCorrModifiable = false
  this.listePackages = ['tkz-euclide']

  this.nouvelleVersion = function (numeroExercice) {
    let pas
    this.listeQuestions = []
    this.listeCorrections = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    pas = parseInt(this.sup)
    for (let i = 0, id_unique, texte; i < 14; i++) {
      if (context.isHtml) {
        id_unique = `${i}_${Date.now()}`
        this.contenu += `<div id="div_svg${numeroExercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
        SvgReperageSurUnAxe(
          `div_svg${numeroExercice}${id_unique}`,
          '',
          6,
          1,
          pas,
          [],
          [],
          false
        )
      } else {
        // sortie Latex
        texte = LatexReperageSurUnAxe(2, 0, 1, pas, [], [], false)
      }
      this.listeQuestions.push(texte)
    }
    if (!context.isHtml) { listeQuestionsToContenu(this) }
  }
  this.besoinFormulaireNumerique = ['Nombres de parts', 10, '']
}
