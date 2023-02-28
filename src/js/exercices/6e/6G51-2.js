import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choisitLettresDifferentes, shuffle } from '../../modules/outils.js'
import { point, pointAdistance, polygoneAvecNom, pointIntersectionDD, droite, segment, demiDroite } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const titre = 'Utiliser les symboles ∈ et ∉'

export const dateDePublication = '27/02/2023'

/**
 * Aléatoirisation de https://www.youtube.com/watch?v=s-KelQ875a8
 * @author Guillaume Valmont
 * Référence 6G51-2
*/
export default class UtilerAppartientA extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Compléter en utilisant les symboles $\\in$ et $\\notin$.'
    this.nbQuestions = 8
    this.nbCols = 4
    this.nbColsCorr = 4
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const objetsEnonce = []
    const lettres = choisitLettresDifferentes(6)
    let rayon = 3
    if (context.isHtml) rayon = 4
    const A = point(0, 0, lettres[0])
    const angle = randint(0, 359)
    const B = pointAdistance(A, rayon, angle, lettres[1])
    const D = pointAdistance(A, rayon, angle + 60, lettres[3])
    const CentreBD = randint(4, 6) / 10
    const C = point(B.x * CentreBD + D.x * (1 - CentreBD), B.y * CentreBD + D.y * (1 - CentreBD), lettres[2])
    const EentreAC = randint(4, 6) / 10
    const E = point(A.x * EentreAC + C.x * (1 - EentreAC), A.y * EentreAC + C.y * (1 - EentreAC), lettres[4])
    const F = pointIntersectionDD(droite(B, E), droite(A, D), lettres[5])
    const polyABE = polygoneAvecNom(A, B, E)
    const polyCFD = polygoneAvecNom(C, F, D)
    const segmentAB = segment(A, B)
    const segmentBC = segment(B, C)
    const segmentAC = segment(A, C)
    const demiDroiteBE = demiDroite(B, E)
    const demiDroiteAF = demiDroite(A, F)
    const demiDroiteBC = demiDroite(B, C)
    objetsEnonce.push(polyCFD[1], polyABE[1], segmentAB, segmentBC, segmentAC, demiDroiteBE, demiDroiteAF, demiDroiteBC)
    const lisdeDesPossibilites = [
      {
        point: E,
        extremite1: A,
        extremite2: C,
        borne1: '[',
        borne2: ']',
        reponse: '$\\in$'
      },
      {
        point: D,
        extremite1: A,
        extremite2: F,
        borne1: '[',
        borne2: ']',
        reponse: '$\\notin$'
      },
      {
        point: D,
        extremite1: A,
        extremite2: F,
        borne1: '[',
        borne2: ')',
        reponse: '$\\in$'
      },
      {
        point: F,
        extremite1: B,
        extremite2: E,
        borne1: '(',
        borne2: ')',
        reponse: '$\\in$'
      },
      {
        point: A,
        extremite1: F,
        extremite2: D,
        borne1: '[',
        borne2: ')',
        reponse: '$\\notin$'
      },
      {
        point: E,
        extremite1: E,
        extremite2: C,
        borne1: '[',
        borne2: ']',
        reponse: '$\\in$'
      },
      {
        point: D,
        extremite1: A,
        extremite2: C,
        borne1: '(',
        borne2: ')',
        reponse: '$\\notin$'
      },
      {
        point: E,
        extremite1: B,
        extremite2: F,
        borne1: '[',
        borne2: ']',
        reponse: '$\\in$'
      },
      {
        point: C,
        extremite1: D,
        extremite2: B,
        borne1: '[',
        borne2: ']',
        reponse: '$\\in$'
      },
      {
        point: A,
        extremite1: E,
        extremite2: C,
        borne1: '(',
        borne2: ')',
        reponse: '$\\in$'
      },
      {
        point: C,
        extremite1: F,
        extremite2: E,
        borne1: '(',
        borne2: ')',
        reponse: '$\\notin$'
      },
      {
        point: E,
        extremite1: F,
        extremite2: D,
        borne1: '[',
        borne2: ')',
        reponse: '$\\notin$'
      }
    ]
    const possibilites = shuffle(lisdeDesPossibilites)
    const xmin = Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 2
    const xmax = Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 2
    const ymin = Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 2
    const ymax = Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 2
    const paramsEnonce = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 1 }
    this.introduction = '' + mathalea2d(paramsEnonce, objetsEnonce)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (possibilites[i] === undefined) break
      texte = ''
      texteCorr = ''
      texte += `$${possibilites[i].point.nom}$ $\\ldots{}$ ${possibilites[i].borne1}$${possibilites[i].extremite1.nom + possibilites[i].extremite2.nom}$${possibilites[i].borne2}`
      texteCorr += `$${possibilites[i].point.nom}$ ${possibilites[i].reponse} ${possibilites[i].borne1}$${possibilites[i].extremite1.nom + possibilites[i].extremite2.nom}$${possibilites[i].borne2}`
      if (this.questionJamaisPosee(i, possibilites[i].point.nom, possibilites[i].extremite1.nom, possibilites[i].extremite2.nom, possibilites[i].borne1, possibilites[i].borne2)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
