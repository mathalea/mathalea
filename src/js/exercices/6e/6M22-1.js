import { pointAdistance, point, segment, rotation, cercle, tracePoint, mathalea2d, afficheLongueurSegment, latexParPoint } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, arrondi, texNombre, contraindreValeur, randint, interactivite, texNombrec } from '../../modules/outils.js'

export const titre = 'Calculer périmètre et aire de disques'

/**
 * 4 cercles sont tracés, 2 dont on connait le rayon et 2 dont on connait le diamètre.
 * * 1 : Calculer le périmètre de cercles
 * * 2 : Calculer l'aire de disques
 * * 3 : Calculer le périmètre et l'aire de disques
 *
 * Pas de version LaTeX
 * @author Rémi Angot
 * Référence 6M22-1
 */
export default function PerimetreAireDisques (pa = 3) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.sup = pa // 1 : périmètre, 2 : aire, 3 : périmètres et aires
  this.sup2 = true // rayon ou périmètre entier
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 4
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function (numeroExercice) {
    this.sup = contraindreValeur(1, 3, this.sup, 3)
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, r, type, A, C, M, B, S, texte, texteCorr, reponseL1, reponseL2, reponseA1, reponseA2; i < this.nbQuestions && cpt < 50;) {
      if (this.sup2) r = randint(2, 9)
      else r = arrondi(randint(2, 8) + randint(1, 9) / 10, 1)
      A = point(r + 0.5, r + 0.5)
      C = cercle(A, r)
      M = pointAdistance(A, r)
      B = rotation(M, A, 180)
      if (i % 2 === 0) {
        S = segment(A, M)
      } else {
        S = segment(M, B)
      }
      S.pointilles = 2
      texte = mathalea2d({ xmin: 0, ymin: 0, xmax: 2 * r + 1, ymax: 2 * r + 1, pixelsParCm: arrondi(50 / r), mainlevee: true, amplitude: 0.3, scale: 0.5 }, C, tracePoint(A), S, afficheLongueurSegment(S.extremite1, S.extremite2), latexParPoint('\\mathcal{C}_1', pointAdistance(A, 1.25 * r, 130), 'black', 20, 0, ''))

      if (this.sup === 1) {
        this.consigne = this.nbQuestions > 1 ? 'Calculer le périmètre des cercles suivants.' : 'Calculer le périmètre du cercle suivant.'
      }
      if (this.sup === 2) {
        this.consigne = this.nbQuestions > 1 ? "Calculer l'aire des disques suivants." : "Calculer l'aire du disque suivant."
      }
      if (this.sup === 3) {
        this.consigne = this.nbQuestions > 1 ? "Calculer le périmètre et l'aire des disques suivants." : "Calculer le périmètre et l'aire du disque suivant."
      }
      switch (interactivite(this)) {
        case 'AMC' :
          this.consigne += '<br>Donner la valeur exacte et une valeur approchée au dixième près.'
          break
        default : this.consigne += '<br>Donner la valeur exacte et une valeur approchée au dixième près.'
      }
      if (this.sup === 1) {
      // si on ne demande pas les aires
        if (i % 2 === 0) {
          texteCorr = `$\\mathcal{P}_1=2\\times${texNombre(r)}\\times \\pi=${texNombrec(2 * r)
        }\\pi\\approx${texNombre(
          arrondi(2 * r * Math.PI, 1)
        )}$ cm<br>`
        } else {
          texteCorr = `$\\mathcal{P}_1=${texNombrec(2 * r)}\\times \\pi=${texNombrec(2 * r)
        }\\pi\\approx${texNombre(
          arrondi(2 * r * Math.PI, 1)
        )}$ cm<br>`
        }
        reponseL1 = arrondi(2 * r, 2)
        reponseL2 = arrondi(2 * r * Math.PI, 1)
        reponseA1 = false
        reponseA2 = false
      }
      if (this.sup === 2) {
        if (i % 2 === 0) {
          texteCorr = `$\\mathcal{A}_1=${texNombre(r)}\\times ${texNombre(r)}\\times\\pi=${texNombrec(r * r)
        }\\pi\\approx${texNombre(
          arrondi(r * r * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
        } else {
          texteCorr = `$\\mathcal{A}_1=\\dfrac{${texNombrec(2 * r)}}{2}\\times \\dfrac{${texNombrec(2 * r)}}{2}\\times\\pi=${texNombrec(r * r)
          }\\pi\\approx${texNombre(
            arrondi(r * r * Math.PI, 1)
          )}~\\text{cm}^2$<br>`
        }
        reponseA1 = arrondi(r * r, 2)
        reponseA2 = arrondi(r * r * Math.PI, 1)
        reponseL1 = false
        reponseL2 = false
      }
      if (this.sup === 3) {
        if (i % 2 === 0) {
          texteCorr = `$\\mathcal{P}_1=2\\times${texNombre(r)}\\times \\pi=${texNombrec(2 * r)
        }\\pi\\approx${texNombre(
          arrondi(2 * r * Math.PI, 1)
        )}$ cm<br>`
          texteCorr += '<br>'
          texteCorr += `$\\mathcal{A}_1=${texNombre(r)}\\times ${texNombre(r)}\\times \\pi=${texNombrec(r * r)
        }\\pi\\approx${texNombre(
          arrondi(r * r * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
        } else {
          texteCorr = `$\\mathcal{P}_1=${texNombrec(2 * r)}\\times \\pi=${texNombrec(2 * r)
          }\\pi\\approx${texNombre(
            arrondi(2 * r * Math.PI, 1)
          )}$ cm<br>`
          texteCorr += '<br>'
          texteCorr += `$\\mathcal{A}_1=\\dfrac{${texNombrec(2 * r)}}{2}\\times \\dfrac{${texNombrec(2 * r)}}{2}\\times\\pi=${texNombrec(r * r)
          }\\pi\\approx${texNombre(
            arrondi(r * r * Math.PI, 1)
          )}~\\text{cm}^2$<br>`
        }

        reponseL1 = arrondi(2 * r, 2)
        reponseL2 = arrondi(2 * r * Math.PI, 1)
        reponseA1 = arrondi(r * r, 2)
        reponseA2 = arrondi(r * r * Math.PI, 1)
      }
      if (this.questionJamaisPosee(i, r, type)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Périmètres\n2 : Aires\n3 : Périmètres et aires']
  this.besoinFormulaire2CaseACocher = ['Rayon et diamètre entier', true]
}
