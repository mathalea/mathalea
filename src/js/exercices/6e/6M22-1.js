import { pointAdistance, point, segment, rotation, cercle, tracePoint, mathalea2d, afficheLongueurSegment, latexParPoint } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, shuffle, arrondi, texNombre } from '../../modules/outils.js'

export const titre = 'Périmètres et aires de disques'

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
  this.pasDeVersionLatex = true
  this.titre = titre
  this.sup = pa // 1 : périmètre, 2 : aire, 3 : périmètres et aires
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    const tableauDesRayons = shuffle([2, 3, 4, 5, 6, 7, 8]) // pour s'assurer que les 4 rayons sont différents
    const r1 = tableauDesRayons[0]
    const r2 = tableauDesRayons[1]
    const r3 = tableauDesRayons[2]
    const r4 = tableauDesRayons[3]
    const A = point(8, 24)
    const B = point(24, 24)
    const C = point(8, 8)
    const D = point(24, 8)
    const C1 = cercle(A, r1)
    const C2 = cercle(B, r2)
    const C3 = cercle(C, r3)
    const C4 = cercle(D, r4)
    const M = pointAdistance(A, r1)
    const N = pointAdistance(B, r2)
    const O = pointAdistance(C, r3)
    const P = pointAdistance(D, r4)
    const R1 = segment(A, M)
    R1.pointilles = 2
    const D2 = segment(N, rotation(N, B, 180))
    D2.pointilles = 2
    const D3 = segment(O, rotation(O, C, 180))
    D3.pointilles = 2
    const R4 = segment(D, P)
    R4.pointilles = 2
    const texte = mathalea2d({ xmin: -1, ymin: -1, xmax: 33, ymax: 33, pixelsParCm: 15, scale: 0.5, mainlevee: false }, C1, C2, C3, C4, tracePoint(A, B, C, D), R1, R4, D2, D3,
      afficheLongueurSegment(R1.extremite1, R1.extremite2), afficheLongueurSegment(R4.extremite1, R4.extremite2),
      afficheLongueurSegment(D2.extremite1, D2.extremite2), afficheLongueurSegment(D3.extremite1, D3.extremite2),
      latexParPoint('\\mathcal{C}_1', pointAdistance(A, r1 + 0.7, 145), 'black', 20, 0, ''),
      latexParPoint('\\mathcal{C}_2', pointAdistance(B, r2 + 0.7, 145), 'black', 20, 0, ''),
      latexParPoint('\\mathcal{C}_3', pointAdistance(C, r3 + 0.7, 145), 'black', 20, 0, ''),
      latexParPoint('\\mathcal{C}_4', pointAdistance(D, r4 + 0.7, 145), 'black', 20, 0, '')
    )

    if (this.sup === 1 || this.sup === '1') {
      this.consigne = 'Calculer le périmètre des 4 cercles suivants.'
    }
    if (this.sup === 2 || this.sup === '2') {
      this.consigne = "Calculer l'aire des 4 disques suivants."
    }
    if (this.sup === 3 || this.sup === '3') {
      this.consigne = "Calculer le périmètre et l'aire des 4 disques suivants."
    }

    this.consigne +=
      '</br>Donner la valeur exacte et une valeur approchée au dixième près.'

    let texteCorr = ''
    if (this.sup === 1 || this.sup === '1') {
      // si on ne demande pas les aires
      texteCorr = `$\\mathcal{P}_1=2\\times${r1}\\times\\pi=${2 * r1
        }\\pi\\approx${texNombre(
          arrondi(2 * r1 * Math.PI, 1)
        )}$ cm<br>`
      texteCorr += `$\\mathcal{P}_2=${2 * r2}\\times\\pi\\approx${texNombre(
        arrondi(2 * r2 * Math.PI, 1)
      )}$ cm<br>`
      texteCorr += `$\\mathcal{P}_3=${2 * r3}\\times\\pi\\approx${texNombre(
        arrondi(2 * r3 * Math.PI, 1)
      )}$ cm<br>`
      texteCorr += `$\\mathcal{P}_4=2\\times${r4}\\times\\pi=${2 * r4
        }\\pi\\approx${texNombre(
          arrondi(2 * r4 * Math.PI, 1)
        )}$ cm<br>`
    }

    if (this.sup === 2 || this.sup === '2') {
      texteCorr += `$\\mathcal{A}_1=${r1}\\times${r1}\\times\\pi=${r1 * r1
        }\\pi\\approx${texNombre(
          arrondi(r1 * r1 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texteCorr += `Le diamètre de $\\mathcal{C}_2$ est ${2 * r2
        } cm donc son rayon est ${r2} cm.<br>`
      texteCorr += `$\\mathcal{A}_2=${r2}\\times${r2}\\times\\pi=${r2 * r2
        }\\pi\\approx${texNombre(
          arrondi(r2 * r2 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texteCorr += `Le diamètre de $\\mathcal{C}_3$ est ${2 * r3
        } cm donc son rayon est ${r3} cm.<br>`
      texteCorr += `$\\mathcal{A}_3=${r3}\\times${r3}\\times\\pi=${r3 * r3
        }\\pi\\approx${texNombre(
          arrondi(r3 * r3 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texteCorr += `$\\mathcal{A}_4=${r4}\\times${r4}\\times\\pi=${r4 * r4
        }\\pi\\approx${texNombre(
          arrondi(r4 * r4 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
    }

    if (this.sup === 3 || this.sup === '3') {
      texteCorr = `$\\mathcal{P}_1=2\\times${r1}\\times\\pi=${2 * r1
        }\\pi\\approx${texNombre(
          arrondi(2 * r1 * Math.PI, 1)
        )}$ cm<br>`
      texteCorr += `$\\mathcal{P}_2=${2 * r2}\\times\\pi\\approx${texNombre(
        arrondi(2 * r2 * Math.PI, 1)
      )}$ cm<br>`
      texteCorr += `$\\mathcal{P}_3=${2 * r3}\\times\\pi\\approx${texNombre(
        arrondi(2 * r3 * Math.PI, 1)
      )}$ cm<br>`
      texteCorr += `$\\mathcal{P}_4=2\\times${r4}\\times\\pi=${2 * r4
        }\\pi\\approx${texNombre(
          arrondi(2 * r4 * Math.PI, 1)
        )}$ cm<br>`

      texteCorr += '<br>'

      texteCorr += `$\\mathcal{A}_1=${r1}\\times${r1}\\times\\pi=${r1 * r1
        }\\pi\\approx${texNombre(
          arrondi(r1 * r1 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texteCorr += `Le diamètre de $\\mathcal{C}_2$ est ${2 * r2
        } cm donc son rayon est ${r2} cm.<br>`
      texteCorr += `$\\mathcal{A}_2=${r2}\\times${r2}\\times\\pi=${r2 * r2
        }\\pi\\approx${texNombre(
          arrondi(r2 * r2 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texteCorr += `Le diamètre de $\\mathcal{C}_3$ est ${2 * r3
        } cm donc son rayon est ${r3} cm.<br>`
      texteCorr += `$\\mathcal{A}_3=${r3}\\times${r3}\\times\\pi=${r3 * r3
        }\\pi\\approx${texNombre(
          arrondi(r3 * r3 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texteCorr += `$\\mathcal{A}_4=${r4}\\times${r4}\\times\\pi=${r4 * r4
        }\\pi\\approx${texNombre(
          arrondi(r4 * r4 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Périmètres\n2 : Aires\n3 : Périmètres et aires']
}
