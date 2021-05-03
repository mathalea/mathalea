import { pointAdistance, point, segment, rotation, cercle, tracePoint, mathalea2d, afficheLongueurSegment, latexParPoint } from '../../modules/2d.js'
import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, shuffle, arrondi, tex_nombre } from '../../modules/outils.js'

export const titre = 'Périmètres et aires de disques'

/**
 * 4 cercles sont tracés, 2 dont on connait le rayon et 2 dont on connait le diamètre.
 * * 1 : Calculer le périmètre de cercles
 * * 2 : Calculer l'aire de disques
 * * 3 : Calculer le périmètre et l'aire de disques
 *
 * Pas de version LaTeX
 * @Auteur Rémi Angot
 * Référence 6M22-1
 */
export default function Perimetre_aire_disques (pa = 3) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.pas_de_version_LaTeX = true
  this.titre = titre
  this.sup = pa // 1 : périmètre, 2 : aire, 3 : périmètres et aires
  this.spacing = 2
  this.spacing_corr = 2
  this.nb_questions = 1
  this.nb_questions_modifiable = false

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []
    this.liste_corrections = [] // Liste de questions corrigées
    const tableau_des_rayons = shuffle([2, 3, 4, 5, 6, 7, 8]) // pour s'assurer que les 4 rayons sont différents
    const r1 = tableau_des_rayons[0]
    const r2 = tableau_des_rayons[1]
    const r3 = tableau_des_rayons[2]
    const r4 = tableau_des_rayons[3]
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

    let texte_corr = ''
    if (this.sup === 1 || this.sup === '1') {
      // si on ne demande pas les aires
      texte_corr = `$\\mathcal{P}_1=2\\times${r1}\\times\\pi=${2 * r1
        }\\pi\\approx${tex_nombre(
          arrondi(2 * r1 * Math.PI, 1)
        )}$ cm<br>`
      texte_corr += `$\\mathcal{P}_2=${2 * r2}\\times\\pi\\approx${tex_nombre(
        arrondi(2 * r2 * Math.PI, 1)
      )}$ cm<br>`
      texte_corr += `$\\mathcal{P}_3=${2 * r3}\\times\\pi\\approx${tex_nombre(
        arrondi(2 * r3 * Math.PI, 1)
      )}$ cm<br>`
      texte_corr += `$\\mathcal{P}_4=2\\times${r4}\\times\\pi=${2 * r4
        }\\pi\\approx${tex_nombre(
          arrondi(2 * r4 * Math.PI, 1)
        )}$ cm<br>`
    }

    if (this.sup === 2 || this.sup === '2') {
      texte_corr += `$\\mathcal{A}_1=${r1}\\times${r1}\\times\\pi=${r1 * r1
        }\\pi\\approx${tex_nombre(
          arrondi(r1 * r1 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texte_corr += `Le diamètre de $\\mathcal{C}_2$ est ${2 * r2
        } cm donc son rayon est ${r2} cm.<br>`
      texte_corr += `$\\mathcal{A}_2=${r2}\\times${r2}\\times\\pi=${r2 * r2
        }\\pi\\approx${tex_nombre(
          arrondi(r2 * r2 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texte_corr += `Le diamètre de $\\mathcal{C}_3$ est ${2 * r3
        } cm donc son rayon est ${r3} cm.<br>`
      texte_corr += `$\\mathcal{A}_3=${r3}\\times${r3}\\times\\pi=${r3 * r3
        }\\pi\\approx${tex_nombre(
          arrondi(r3 * r3 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texte_corr += `$\\mathcal{A}_4=${r4}\\times${r4}\\times\\pi=${r4 * r4
        }\\pi\\approx${tex_nombre(
          arrondi(r4 * r4 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
    }

    if (this.sup === 3 || this.sup === '3') {
      texte_corr = `$\\mathcal{P}_1=2\\times${r1}\\times\\pi=${2 * r1
        }\\pi\\approx${tex_nombre(
          arrondi(2 * r1 * Math.PI, 1)
        )}$ cm<br>`
      texte_corr += `$\\mathcal{P}_2=${2 * r2}\\times\\pi\\approx${tex_nombre(
        arrondi(2 * r2 * Math.PI, 1)
      )}$ cm<br>`
      texte_corr += `$\\mathcal{P}_3=${2 * r3}\\times\\pi\\approx${tex_nombre(
        arrondi(2 * r3 * Math.PI, 1)
      )}$ cm<br>`
      texte_corr += `$\\mathcal{P}_4=2\\times${r4}\\times\\pi=${2 * r4
        }\\pi\\approx${tex_nombre(
          arrondi(2 * r4 * Math.PI, 1)
        )}$ cm<br>`

      texte_corr += '<br>'

      texte_corr += `$\\mathcal{A}_1=${r1}\\times${r1}\\times\\pi=${r1 * r1
        }\\pi\\approx${tex_nombre(
          arrondi(r1 * r1 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texte_corr += `Le diamètre de $\\mathcal{C}_2$ est ${2 * r2
        } cm donc son rayon est ${r2} cm.<br>`
      texte_corr += `$\\mathcal{A}_2=${r2}\\times${r2}\\times\\pi=${r2 * r2
        }\\pi\\approx${tex_nombre(
          arrondi(r2 * r2 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texte_corr += `Le diamètre de $\\mathcal{C}_3$ est ${2 * r3
        } cm donc son rayon est ${r3} cm.<br>`
      texte_corr += `$\\mathcal{A}_3=${r3}\\times${r3}\\times\\pi=${r3 * r3
        }\\pi\\approx${tex_nombre(
          arrondi(r3 * r3 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
      texte_corr += `$\\mathcal{A}_4=${r4}\\times${r4}\\times\\pi=${r4 * r4
        }\\pi\\approx${tex_nombre(
          arrondi(r4 * r4 * Math.PI, 1)
        )}~\\text{cm}^2$<br>`
    }

    this.liste_questions.push(texte)
    this.liste_corrections.push(texte_corr)
    liste_de_question_to_contenu(this)
  }

  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Périmètres\n2 : Aires\n3 : Périmètres et aires']
}
