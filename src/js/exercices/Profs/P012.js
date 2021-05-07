import Exercice from '../ClasseExercice.js'
import { mathalea2d } from '../../modules/2d.js'
import { fraction } from '../../modules/Fractions'
import { combinaisonListesSansChangerOrdre } from '../../modules/outils.js'

export const titre = 'Faire des camenberts pour travailler les fractions'

/**
 * Fonction permettant aux enseignants de proposer rapidement un axe avec zooms pour placer un décimal
 * ref P012
 * @Auteur Jean-Claude Lhote
 */
export default function Camemberts () {
  Exercice.call(this)
  this.nb_cols = 1
  this.nbQuestions = 3
  this.nb_questions_modifiable = false
  this.sup = '6' // nombre de parts
  this.sup2 = '5' // nombre de disques par ligne
  this.titre = titre

  this.nouvelleVersion = function () {
    this.contenu = ''
    const nbParts = this.sup.split('-')
    const secteurs = combinaisonListesSansChangerOrdre(nbParts, this.nbQuestions)
    const nbDisques = this.sup2.split('-')
    const unites = combinaisonListesSansChangerOrdre(nbDisques,this.nbQuestions)
    let f
    const fenetre = { xmin: -2.5, xmax: 35, ymin: -2.5, ymax: 2.5, pixelsParCm: 20, scale: 0.5 }
    for (let i = 0; i < this.nbQuestions; i++) {
      f = fraction(parseInt(secteurs[i]) * parseInt(unites[i]), parseInt(secteurs[i])).representation(0, 0, 2, 0, 'gateau', 'white')
      this.contenu += mathalea2d(fenetre, f)
      if (sortieHtml) {
        this.contenu += '<br>'
      } else {
        this.contenu += '\\\\'
      }
    }
  }
  this.besoinFormulaireTexte = ['Nombre de parts séparés par des tirets']
  this.besoinFormulaire2Texte = ['Nombre de disques par ligne séparés par des tirets']
}
