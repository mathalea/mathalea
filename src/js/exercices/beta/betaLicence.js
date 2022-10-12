import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { texteParPosition } from '../../modules/2d/textes.js'
import { rotation } from '../../modules/2d/transformations.js'
import { polygone } from '../../modules/2d/polygone.js'
import { codageAngleDroit, codageSegments } from '../../modules/2d/codages.js'
import { grille } from '../../modules/2d/grilles.js'
export const titre = 'QCM de positionnement'
export const interactifReady = true
export const interactifType = 'qcm'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot (questions de Martine Loubet)
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbQuestions = 19 // Pour la boucle des feedbacks
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.spacing = 3

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let question0 = '15 centaines + 32 dizaines'
    this.autoCorrection[0] = {}
    this.autoCorrection[0].options = { ordered: true, vertical: true }
    this.autoCorrection[0].propositions = [
      {
        texte: '$1532$',
        statut: false
      },
      {
        texte: '$182$',
        statut: false
      },
      {
        texte: '$1500320$',
        statut: false
      },
      {
        texte: '$1820$',
        statut: true
      }
    ]
    question0 += propositionsQcm(this, 0).texte
    const correction0 = ''

    let question1 = '$7 + 2 \\times 6$'
    this.autoCorrection[1] = {}
    this.autoCorrection[1].options = { ordered: true, vertical: true }
    this.autoCorrection[1].propositions = [
      {
        texte: '$54$',
        statut: false
      },
      {
        texte: '$19$',
        statut: true
      },
      {
        texte: '$48$',
        statut: false
      },
      {
        texte: 'Aucune des solutions',
        statut: false
      }
    ]
    question1 += propositionsQcm(this, 1).texte
    const correction1 = ''

    let question2 = '$2,501 - 0,04$'
    this.autoCorrection[2] = {}
    this.autoCorrection[2].options = { ordered: true, vertical: true }
    this.autoCorrection[2].propositions = [
      {
        texte: '$2,497$',
        statut: false
      },
      {
        texte: '$2,101$',
        statut: false
      },
      {
        texte: '$2,471$',
        statut: false
      },
      {
        texte: 'Aucune des solutions',
        statut: true
      }
    ]
    question2 += propositionsQcm(this, 2).texte
    const correction2 = ''

    let question3 = '$\\dfrac{1}{2}+\\dfrac{1}{5}$'
    this.autoCorrection[3] = {}
    this.autoCorrection[3].options = { ordered: true, vertical: true }
    this.autoCorrection[3].propositions = [
      {
        texte: '$\\dfrac{1}{7}$',
        statut: false
      },
      {
        texte: '$\\dfrac{2}{7}$',
        statut: false
      },
      {
        texte: '$\\dfrac{1}{10}$',
        statut: false
      },
      {
        texte: '$\\dfrac{7}{10}$',
        statut: true
      }
    ]
    question3 += propositionsQcm(this, 3).texte
    const correction3 = ''

    let question4 = '$\\dfrac{1}{2}\\times\\dfrac{1}{5}$'
    this.autoCorrection[4] = {}
    this.autoCorrection[4].options = { ordered: true, vertical: true }
    this.autoCorrection[4].propositions = [
      {
        texte: '$\\dfrac{1}{7}$',
        statut: false
      },
      {
        texte: '$\\dfrac{1}{10}$',
        statut: true
      },
      {
        texte: '$\\dfrac{2}{10}$',
        statut: false
      },
      {
        texte: 'Aucune des solutions',
        statut: false
      }
    ]
    question4 += propositionsQcm(this, 4).texte
    const correction4 = ''

    let question5 = 'Si $x=3$ alors $2x^2+4=\\ldots$'
    this.autoCorrection[5] = {}
    this.autoCorrection[5].options = { ordered: true, vertical: true }
    this.autoCorrection[5].propositions = [
      {
        texte: '40',
        statut: false
      },
      {
        texte: '$16$',
        statut: false
      },
      {
        texte: '$22$',
        statut: true
      },
      {
        texte: 'Aucune des solutions',
        statut: false
      }
    ]
    question5 += propositionsQcm(this, 5).texte
    const correction5 = ''

    let question6 = 'L\'équation $7x+1=5x-3$ admet pour solution'
    this.autoCorrection[6] = {}
    this.autoCorrection[6].options = { ordered: true, vertical: true }
    this.autoCorrection[6].propositions = [
      {
        texte: '$x=-2$',
        statut: true
      },
      {
        texte: '$x=2$',
        statut: false
      },
      {
        texte: '$x=0$',
        statut: false
      },
      {
        texte: 'Aucune des solutions',
        statut: false
      }
    ]
    question6 += propositionsQcm(this, 6).texte
    const correction6 = ''

    let question7 = figure7()
    this.autoCorrection[7] = {}
    this.autoCorrection[7].options = { ordered: true, vertical: true }
    this.autoCorrection[7].propositions = [
      {
        texte: '$1700$',
        statut: false
      },
      {
        texte: '$1520$',
        statut: false
      },
      {
        texte: '$1650$',
        statut: false
      },
      {
        texte: 'Aucune de ces solutions',
        statut: true
      }
    ]
    question7 += propositionsQcm(this, 7).texte
    const correction7 = ''

    let question8 = 'Dans un triangle équilatéral'
    this.autoCorrection[8] = {}
    this.autoCorrection[8].options = { ordered: true, vertical: true }
    this.autoCorrection[8].propositions = [
      {
        texte: 'Les 3 angles mesurent 50°.',
        statut: false
      },
      {
        texte: 'Les 3 angles mesurent 60°.',
        statut: true
      },
      {
        texte: 'Les 3 angles mesurent 70°.',
        statut: false
      },
      {
        texte: 'Cela dépend des longueurs des côtés.',
        statut: false
      }
    ]
    question8 += propositionsQcm(this, 8).texte
    const correction8 = ''

    let question9 = '$31 \\text{cm} + 12,5 \\text{m} + 15 \\text{mm} = $'
    this.autoCorrection[9] = {}
    this.autoCorrection[9].options = { ordered: true, vertical: true }
    this.autoCorrection[9].propositions = [
      {
        texte: '$128,25 \\text{dm}$',
        statut: false
      },
      {
        texte: '$157,5 \\text{dm}$',
        statut: false
      },
      {
        texte: '$1282,5 \\text{mm}$',
        statut: true
      },
      {
        texte: 'Aucun de ces trois résultats.',
        statut: false
      }
    ]
    question9 += propositionsQcm(this, 9).texte
    const correction9 = ''

    let question10 = 'Pour tout nombre réel $x$, l\'expression $(2x+1)^2-4$ est égale à '
    this.autoCorrection[10] = {}
    this.autoCorrection[10].options = { ordered: true, vertical: true }
    this.autoCorrection[10].propositions = [
      {
        texte: '$(2x+3)(2x-1)$',
        statut: true
      },
      {
        texte: '$4x^2-3$',
        statut: false
      },
      {
        texte: '$2x^2-3$',
        statut: false
      },
      {
        texte: 'Aucun de ces trois résultats.',
        statut: false
      }
    ]
    question10 += propositionsQcm(this, 10).texte
    const correction10 = ''

    let question11 = 'Un pantalon coûte 58 €. Son prix en euros après une réduction de 20 % est '
    this.autoCorrection[11] = {}
    this.autoCorrection[11].options = { ordered: true, vertical: true }
    this.autoCorrection[11].propositions = [
      {
        texte: '$38$',
        statut: false
      },
      {
        texte: '$46,40$',
        statut: true
      },
      {
        texte: '$57,80$',
        statut: false
      },
      {
        texte: 'Aucun de ces trois résultats.',
        statut: false
      }
    ]
    question11 += propositionsQcm(this, 11).texte
    const correction11 = ''

    let question12 = 'Dans laquelle de ces 3 situations le pourcentage de remise est-il le plus élevé ?'
    question12 += '<br>Situation 1 : Article à 120 € soldé à 105 €.'
    question12 += '<br>Situation 2 : Article à 45 euros soldé à $-30$ %.'
    question12 += '<br>Situation 3 : Article à 25 euros avec une réduction de 12,50 €.'
    this.autoCorrection[12] = {}
    this.autoCorrection[12].options = { ordered: true, vertical: true }
    this.autoCorrection[12].propositions = [
      {
        texte: '1',
        statut: false
      },
      {
        texte: '2',
        statut: false
      },
      {
        texte: '3',
        statut: true
      },
      {
        texte: 'On ne peut pas comparer.',
        statut: false
      }
    ]
    question12 += propositionsQcm(this, 12).texte
    const correction12 = ''

    let question13 = figure13()
    this.autoCorrection[13] = {}
    this.autoCorrection[13].options = { ordered: true, vertical: true }
    this.autoCorrection[13].propositions = [
      {
        texte: 'Il existe des valeurs de $x$ pour lesquelles le périmètre du triangle est plus grand que celui du rectangle.',
        statut: false
      },
      {
        texte: 'Il existe des valeurs de $x$ pour lesquelles le périmètre du rectangle est plus grand que celui du triangle.',
        statut: false
      },
      {
        texte: 'Ces deux figures n\'ont jamais le même périmètre',
        statut: false
      },
      {
        texte: 'Aucune de ces affirmations n\'est vraie',
        statut: true
      }
    ]
    question13 += propositionsQcm(this, 13).texte
    const correction13 = ''

    let question14 = 'Le nombre $(-2)^4$ est égal à'
    this.autoCorrection[14] = {}
    this.autoCorrection[14].options = { ordered: true, vertical: true }
    this.autoCorrection[14].propositions = [
      {
        texte: '$16$',
        statut: true
      },
      {
        texte: '$-8$',
        statut: false
      },
      {
        texte: '$20 000$',
        statut: false
      },
      {
        texte: 'Aucun de ces trois résultats',
        statut: false
      }
    ]
    question14 += propositionsQcm(this, 14).texte
    const correction14 = ''

    let question15 = 'Si on multiplie par 3 toutes les dimensions d\'un rectangle, son aire est multipliée par'
    this.autoCorrection[15] = {}
    this.autoCorrection[15].options = { ordered: true, vertical: true }
    this.autoCorrection[15].propositions = [
      {
        texte: '$3$',
        statut: false
      },
      {
        texte: '$6$',
        statut: false
      },
      {
        texte: '$9$',
        statut: true
      },
      {
        texte: 'Aucune des propositions',
        statut: false
      }
    ]
    question15 += propositionsQcm(this, 15).texte
    const correction15 = ''

    let question16 = figure16()
    question16 += '<br> Quelle figure a la plus grande aire ? (Les longueurs sont données en cm.)'
    this.autoCorrection[16] = {}
    this.autoCorrection[16].options = { ordered: true, vertical: true }
    this.autoCorrection[16].propositions = [
      {
        texte: 'Le triangle',
        statut: false
      },
      {
        texte: 'Le carré',
        statut: true
      },
      {
        texte: 'Le rectangle',
        statut: false
      },
      {
        texte: 'Aucune des propositions',
        statut: false
      }
    ]
    question16 += propositionsQcm(this, 16).texte
    const correction16 = ''

    let question17 = '$1^2+2^2+3^2$'
    this.autoCorrection[17] = {}
    this.autoCorrection[17].options = { ordered: true, vertical: true }
    this.autoCorrection[17].propositions = [
      {
        texte: '$6^6$',
        statut: false
      },
      {
        texte: '$32$',
        statut: false
      },
      {
        texte: '$14$',
        statut: true
      },
      {
        texte: 'Aucune de ces résultats',
        statut: false
      }
    ]
    question17 += propositionsQcm(this, 17).texte
    const correction17 = ''

    let question18 = 'Un coureur qui parcourt 100 mètres en 10 secondes a une vitesse égale à'
    this.autoCorrection[18] = {}
    this.autoCorrection[18].options = { ordered: true, vertical: true }
    this.autoCorrection[18].propositions = [
      {
        texte: '6 km/min',
        statut: false
      },
      {
        texte: '10 km/h',
        statut: false
      },
      {
        texte: '36 km/h',
        statut: true
      },
      {
        texte: 'Aucune de ces 3 propositions.',
        statut: false
      }
    ]
    question18 += propositionsQcm(this, 18).texte
    const correction18 = ''

    this.listeQuestions.push(question0, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question17, question18)
    this.listeCorrections.push(correction0, correction1, correction2, correction3, correction4, correction5, correction6, correction7, correction8, correction9, correction10, correction11, correction12, correction13, correction14, correction15, correction16, correction17, correction18)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}

function figure13 () {
  // const ecart = 2
  const L = 5
  const l = 3
  const A = point(0, 0)
  const B = point(4, 0)
  const C = rotation(B, A, 60)
  const t = polygone(A, B, C)
  const M = point(B.x + 2, 0)
  const N = point(M.x + L, 0)
  const O = point(N.x, l)
  const P = point(M.x, l)
  const r = polygone(M, N, O, P)
  const monCodage = codageSegments('X', 'blue', A, B, B, C, C, A)
  const texte1 = texteParPosition('4x+1', 2, -1, 'milieu', 'black', 1, 'middle', true)
  const texte2 = texteParPosition('4x+1,5', 8.5, -1, 'milieu', 'black', 1, 'middle', true)
  const texte3 = texteParPosition('2x', 12, 1.5, 'milieu', 'black', 1, 'middle', true)
  const c1 = codageAngleDroit(M, N, O)
  const c2 = codageAngleDroit(N, O, P)
  const c3 = codageAngleDroit(O, P, M)
  const c4 = codageAngleDroit(P, M, N)
  return mathalea2d({ xmin: -0.5, xmax: 13, ymin: -2, ymax: 4 }, t, r, monCodage, texte1, texte2, texte3, c1, c2, c3, c4)
}

function figure7 () {
  const g1 = grille(0, -2, 20, 2, 'blue', 0.4, 1) // Rectangle de carreaux avec xmin = ymin = 0, xmax = 10, ymax = 4, couleur bleu, opacité à 40% et 0,5 cm de côté par carreau
  const g2 = grille(0, -2, 20, 2, 'blue', 0.1, 0.1)
  const s = segment(point(0, 0), point(20, 0))
  s.epaisseur = 3
  const s2 = segment(point(2, -0.2), point(2, 0.2))
  s2.epaisseur = 3
  const s3 = segment(point(18, -0.2), point(18, 0.2))
  s3.epaisseur = 3
  const s4 = segment(point(6, -0.2), point(6, 0.2))
  s4.epaisseur = 3
  const t1 = texteParPosition('M', 6, 0.5)
  const t2 = texteParPosition('1500', 2, -0.6)
  const t3 = texteParPosition('2000', 18, -0.6)
  t1.taille = 20
  t2.taille = 20
  t3.taille = 20
  return mathalea2d({ xmin: -0.5, xmax: 20.5, ymin: -2.1, ymax: 2.1, pixelsParCm: 30 }, g1, g2, s, s2, s3, s4, t1, t2, t3)
}

function figure16 () {
  const L = 4
  const l = 4
  const A = point(0, 0)
  const B = point(4, 0)
  const C = point(0, 7 / 6 * 4)
  const c5 = codageAngleDroit(B, A, C)
  const t = polygone(A, B, C)
  const M = point(B.x + 2, 0)
  const N = point(M.x + L, 0)
  const O = point(N.x, l)
  const P = point(M.x, l)
  const c = polygone(M, N, O, P)
  const monCodage = codageSegments('X', 'blue', [M, N, O, P])
  const c1 = codageAngleDroit(M, N, O)
  const c2 = codageAngleDroit(N, O, P)
  const c3 = codageAngleDroit(O, P, M)
  const c4 = codageAngleDroit(P, M, N)
  const E = point(12, 0)
  const F = point(19, 0)
  const G = point(19, 3)
  const H = point(12, 3)
  const c6 = codageAngleDroit(E, F, G)
  const c7 = codageAngleDroit(F, G, H)
  const c8 = codageAngleDroit(G, H, E)
  const c9 = codageAngleDroit(H, E, F)
  const r = polygone(E, F, G, H)
  const t1 = texteParPosition('7', 2, -0.5, 'milieu', 'black', 1, 'middle', true)
  const t2 = texteParPosition('6', -0.5, 7 / 6 * 2, 'milieu', 'black', 1, 'middle', true)
  const t3 = texteParPosition('5', 8, -0.5, 'milieu', 'black', 1, 'middle', true)
  const t4 = texteParPosition('7', 15.5, -0.5, 'milieu', 'black', 1, 'middle', true)
  const t5 = texteParPosition('3', 11.5, 1.5, 'milieu', 'black', 1, 'middle', true)
  return mathalea2d({ xmin: -1.5, xmax: 20.5, ymin: -1.5, ymax: 6, pixelsParCm: 30 }, t, r, c, c1, c2, c3, c4, c5, c6, c7, c8, c9, t1, t2, t3, t4, t5, monCodage)
}
