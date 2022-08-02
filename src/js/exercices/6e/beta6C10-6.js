/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, rangeMinMax, shuffle } from '../../modules/outils.js'
import { fixeBordures, mathalea2d, point, rotation, similitude, texteParPoint, longueur, milieu, segment, homothetie, polygoneRegulierParCentreEtRayon } from '../../modules/2d.js'
export const titre = 'Rose multiplicative'

/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */
export function rose ({ values = [3, 4, 5], type = 'produit' }) {
  const objets = []
  const n = values.length
  const O = point(0, 0)
  const A = rotation(point(4.5, 0), O, 180 / n - 90)
  for (let i = 0; i < n; i++) {
    const M = rotation(A, O, 360 * i / n)
    const N = rotation(M, O, 360 / n)
    const P = similitude(M, O, 180 / n, 1.6)
    const s = homothetie(segment(M, N), milieu(M, N), (longueur(M, N) - 2) / longueur(M, N))
    const s1 = homothetie(segment(M, P), milieu(M, P), (longueur(M, P) - 2.1) / longueur(M, P))
    s1.styleExtremites = '->'
    s1.pointilles = 2
    const s2 = homothetie(segment(N, P), milieu(N, P), (longueur(N, P) - 2.1) / longueur(N, P))
    s2.styleExtremites = '->'
    s2.pointilles = 2
    objets.push(rotation(polygoneRegulierParCentreEtRayon(M, 1, n), M, 180 / n - 90))
    objets.push(s, s1, s2)
    if (type === 'produit' || type === 'solution') {
      objets.push(texteParPoint(values[i].toString(), M))
      objets.push(rotation(polygoneRegulierParCentreEtRayon(P, 1, n), P, 360 / n - 90))
    }
    if (type === 'solution') {
      objets.push(texteParPoint((values[i] * values[(i + 1) % n]).toString(), P))
    }
  }
  console.log(objets)
  return objets
}
export default function RoseMultiplicative () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.spacing = 2
  this.tailleDiaporama = 3
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (
      let i = 0, values, objets, objetsCorr, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      values = shuffle(rangeMinMax(2, 10)).slice(0, randint(3, 9))
      console.log(values)
      objets = rose({ values, type: 'produit' })
      objetsCorr = rose({ values, type: 'solution' })
      texte = mathalea2d(Object.assign({}, fixeBordures(objets)), objets)
      texteCorr = mathalea2d(Object.assign({}, fixeBordures(objetsCorr)), objetsCorr)
      if (this.questionJamaisPosee(i, ...values)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
}
