import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'

import { fraction } from '../../modules/fractions.js'
import { combinaisonListesSansChangerOrdre, contraindreValeur } from '../../modules/outils.js'

export const titre = 'Faire des camemberts pour travailler les fractions'

/**
 * Fonction permettant aux enseignants de proposer rapidement des diques partagés en parts
 * ref P012
 * @author Jean-Claude Lhote
 */
export default function Camemberts () {
  Exercice.call(this)
  this.nb_cols = 1
  this.nbQuestions = 3
  this.nb_questions_modifiable = false
  this.sup = '2-3-4-5' // nombre de parts
  this.sup2 = '5' // nombre de disques par ligne
  this.titre = titre

  this.nouvelleVersion = function () {
    let nbParts, nbDisques
    if (this.sup === '') {
      this.sup = '2-3-4-5'
    }
    if (typeof this.sup === 'number') {
      nbParts = [contraindreValeur(2, 12, parseInt(this.sup), 6)]
    } else {
      nbParts = this.sup.split('-')
      for (let i = 0; i < nbParts.length; i++) {
        nbParts[i] = contraindreValeur(2, 12, parseInt(nbParts[i]), 6)
      }
    }
    if (typeof this.sup2 === 'number') {
      nbDisques = contraindreValeur(1, 5, parseInt(this.sup2), 2)
    } else {
      nbDisques = this.sup2.split('-')
      for (let i = 0; i < nbDisques.length; i++) {
        nbDisques[i] = contraindreValeur(1, 5, parseInt(nbDisques[i]), 2)
      }
    }
    this.contenu = ''

    const secteurs = combinaisonListesSansChangerOrdre(nbParts, this.nbQuestions)
    const unites = combinaisonListesSansChangerOrdre(nbDisques, this.nbQuestions)
    let f
    const fenetre = { xmin: -2.5, xmax: 35, ymin: -2.5, ymax: 2.5, pixelsParCm: 20, scale: 0.5 }
    for (let i = 0; i < this.nbQuestions; i++) {
      f = fraction(parseInt(secteurs[i]) * parseInt(unites[i]), parseInt(secteurs[i])).representation(0, 0, 2, 0, 'gateau', 'white')
      this.contenu += mathalea2d(fenetre, f)
      if (context.isHtml) {
        this.contenu += '<br>'
      } else {
        this.contenu += '\\\\'
      }
    }
  }
  this.besoinFormulaireTexte = ['Nombre de parts séparés par des tirets (maximum 12)']
  this.besoinFormulaire2Texte = ['Nombre de disques par ligne séparés par des tirets (maximum 5)']
}
