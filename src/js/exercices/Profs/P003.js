import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { droiteGraduee2 } from '../../modules/2d.js'

export const titre = 'Tracer des droites graduées'

/**
 * Pour imprimer des repères vierges pour les élèves.
 * @author Jean-Claude Lhote
 * référence : P003
 * publié le ?/2/2020
 * Réécrit le 14/08/2021 avec mathalea2d
 */
export default function feuilleDAxesGradues () {
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
    const pas = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    for (let i = 0, texte; i < 14; i++) {
      texte = mathalea2d({ xmin: -0.5, ymin: -1, xmax: 20, ymax: 1 }, droiteGraduee2({
        Unite: 4,
        Min: 0,
        Max: 4.7,
        x: 0,
        y: 0,
        thickSecDist: 1 / pas,
        thickSec: true,
        labelsPrincipaux: false,
        thickDistance: 1
      }))
      this.listeQuestions.push(texte)
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Nombres de parts', 10, '']
}
