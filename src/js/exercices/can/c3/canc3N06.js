import { context } from '../../../modules/context.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import { choice, listeQuestionsToContenu, texNombre } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Comparer deux nombres sur une droite graduée (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'
export const dateDePublication = '17/11/2022'

/*!
 * @author Gilles Mora
 * Référence canc3N06
 */

export const uuid = 'a8597'
export const ref = 'canc3N06'
export default function ComparerDroiteGrad () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const listeFractions1 = [[1, 2], [1, 3], [2, 3], [3, 2], [1, 4], [3, 4], [4, 3], [1, 5], [2, 5], [3, 5], [5, 3], [4, 5], [5, 4],
      [1, 6], [5, 6], [6, 5], [1, 7], [2, 7], [3, 7], [7, 3], [4, 7], [7, 4], [5, 7], [6, 7], [7, 6], [1, 8], [3, 8], [8, 3], [5, 8], [8, 5], [7, 8], [8, 7],
      [1, 9], [2, 9], [9, 2], [4, 9], [5, 9], [9, 5], [7, 9], [9, 7], [8, 9], [9, 8], [1, 10], [3, 10], [10, 3], [10, 7], [7, 10], [9, 10], [10, 9]]
    const listeFractions2 = [[3, 7], [4, 7], [2, 7], [5, 7], [3, 8], [5, 8], [7, 8], [4, 9], [5, 9], [7, 9], [4, 11], [6, 11], [7, 11], [3, 11],
      [7, 12], [5, 12], [6, 13], [7, 12], [5, 13], [7, 13], [4, 13], [8, 13], [2, 5], [3, 5]]
    for (let i = 0, frac, f, texte, texteCorr, fdec, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2])) {
        case 1:

          f = choice(listeFractions1)
          frac = new FractionX(f[0], f[1])
          fdec = f[0] / f[1]
          texte = `Sur une droite graduée, la fraction $${frac.texFraction}$ est-elle placée avant ou après $1$ ?`
          this.canEnonce = texte
          if (fdec < 1) {
            texteCorr = `Une fraction est inférieure à $1$ lorsque son numérateur est plus petit que son dénominateur. <br>
       Ici, $${f[0]} < ${f[1]}$, donc la fraction $${frac.texFraction}$ est inférieure à $1$ et par suite elle est placée avant $1$ sur une droite graduée.  `
          } else {
            texteCorr = `Une fraction est supérieure à $1$ lorsque son numérateur est plus grand que son dénominateur. <br>
       Ici, $${f[0]} > ${f[1]}$, donc la fraction $${frac.texFraction}$ est supérieure à $1$ et par suite elle est placée après $1$ sur une droite graduée.  `
          }
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Avant',
                statut: fdec < 1
              },
              {
                texte: 'Après',
                statut: fdec > 1
              }
            ]
          }
          break
        case 2:

          f = choice(listeFractions2)
          frac = new FractionX(f[0], f[1])
          fdec = f[0] / f[1]
          texte = `Sur une droite graduée, la fraction $${frac.texFraction}$ est-elle placée avant ou après $\\dfrac{1}{2}$ ?`
          this.canEnonce = texte
          if (fdec < 0.5) {
            texteCorr = `Une fraction est inférieure à $\\dfrac{1}{2}$ lorsque son numérateur est plus petit que la moitié de son dénominateur. <br>
       Ici, $${f[1]}\\div 2=${texNombre(f[1] / 2, 1)}$ et $${f[0]} < ${texNombre(f[1] / 2, 1)}$ donc la fraction $${frac.texFraction}$ est inférieure à $\\dfrac{1}{2}$ et par suite elle est placée avant $\\dfrac{1}{2}$ sur une droite graduée.  `
          } else {
            texteCorr = `Une fraction est supérieure à $\\dfrac{1}{2}$ lorsque son numérateur est plus grand que la moitié de son dénominateur. <br>
          Ici, $${f[1]}\\div 2=${texNombre(f[1] / 2, 1)}$ et $${f[0]} > ${texNombre(f[1] / 2, 1)}$ donc la fraction $${frac.texFraction}$ est supérieure à $\\dfrac{1}{2}$ et par suite elle est placée après $\\dfrac{1}{2}$ sur une droite graduée.  `
          }
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: 'Avant',
                statut: fdec < 0.5
              },
              {
                texte: 'Après',
                statut: fdec > 0.5
              }
            ]
          }
          break
      }

      const monQcm = propositionsQcm(this, i)
      if (!context.isAmc) {
        texte += monQcm.texte
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (i === 0) this.canReponseACompleter = monQcm.texte // FIXME Dans un exercice permettant plusieurs questions il n'y a qu'un this.canReponseACompleter ???
        i++
      }
      cpt++
      this.canReponseACompleter = monQcm.texte
    }
    listeQuestionsToContenu(this)
  }
}
