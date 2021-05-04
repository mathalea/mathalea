import Exercice from '../ClasseExercice.js'
import { mathalea2d } from '../../modules/2d.js'
import { fraction } from '../../modules/Fractions'

export const titre = 'Faire des camenberts pour travailler les fractions'

/**
 * Fonction permettant aux enseignants de proposer rapidement un axe avec zooms pour placer un décimal
 * ref P012
 * @Auteur Jean-Claude Lhote
 */
export default function Camemberts () {
  Exercice.call(this)
  this.nb_cols = 1
  this.nb_questions = 10
  this.nb_questions_modifiable = false
  this.sup = 6 // nombre de parts
  this.sup2 = 5 // nombre de disques par ligne
  this.sup3 = 1 // type 1: camembert, 2: rectangle, 3: segment
  this.titre = titre

  this.nouvelle_version = function () {
    this.contenu = ''
    let f
    const fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 7.5, pixelsParCm: 20, scale: 0.5 }
    for (let i = 0; i < this.nb_questions; i++) {
      switch (parseInt(this.sup3)) {
        case 1:
          f = fraction(parseInt(this.sup) * parseInt(this.sup2), parseInt(this.sup)).representation(0, 0, 2, 0, 'gateau', 'white')

          break
        case 2:
          f = fraction(parseInt(this.sup) * parseInt(this.sup2), parseInt(this.sup)).representation(0, 0, 2, 0, 'barre', 'white')

          break
        case 3:
          f = fraction(parseInt(this.sup) * parseInt(this.sup2), parseInt(this.sup)).representation(0, 0, 2, 0, 'segment', 'white')

          break
      }
      this.contenu += mathalea2d(fenetre, f)
      if (sortie_html) {
        this.contenu += '<br>'
      } else {
        this.contenu += '\\\\'
      }
    }

    this.besoin_formulaire_numerique = ['Nombre de parts', 20]
    this.besoin_formulaire2_numerique = ['Nombre de disques par ligne', 10]
    this.besoin_formulaire3_numerique = ['Type de représentation', 3, '1: Camembert\n2: Rectangle\n3: Segment']
  }
}
