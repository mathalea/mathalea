/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { contraindreValeur, listeQuestionsToContenu, randint, rangeMinMax, shuffle } from '../../modules/outils.js'
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
  let rayon
  switch (n) {
    case 3:
    case 4:
      rayon = 2
      break
    case 5:
    case 6:
      rayon = 3
      break
    default:
      rayon = 4
  }
  const O = point(0, 0)
  const A = rotation(point(rayon, 0), O, 180 / n - 90)
  let indexInconnue = 999 // une valeur ne pouvant pas être atteinte par i sauf pour les can
  if (type === 'can1' || type === 'can2') {
    indexInconnue = randint(0, n - 1)
  }
  for (let i = 0, bulle1, bulle2; i < n; i++) {
    const M = rotation(A, O, 360 * i / n)
    const N = rotation(M, O, 360 / n)
    const P = similitude(M, O, 180 / n, 1.6)
    const s = homothetie(segment(M, N), milieu(M, N), (longueur(M, N) - 1.6) / longueur(M, N))
    const s1 = homothetie(segment(M, P), milieu(M, P), (longueur(M, P) - 1.6) / longueur(M, P))
    s1.styleExtremites = '->'
    s1.tailleExtremites = 2
    s1.pointilles = 2
    const s2 = homothetie(segment(N, P), milieu(N, P), (longueur(N, P) - 1.6) / longueur(N, P))
    s2.styleExtremites = '->'
    s2.tailleExtremites = 2
    s2.pointilles = 2
    bulle1 = rotation(polygoneRegulierParCentreEtRayon(M, 0.8, n), M, 180 / n - 90)
    objets.push(bulle1)
    objets.push(s, s1, s2)
    bulle2 = rotation(polygoneRegulierParCentreEtRayon(P, 0.8, n), P, 360 / n - 90)
    if (type === 'produit' || type === 'solution' || type === 'can1' || type === 'can2') {
      if (!(type === 'can1' && (indexInconnue === i || i === (indexInconnue - 1) % n || i === (indexInconnue + 1) % n))) {
        if (!(type === 'can2' && (indexInconnue === i || i === (indexInconnue + 1) % n))) {
          objets.push(texteParPoint(values[i].toString(), M))
        }
      }
      if (type === 'can1' && indexInconnue === i) bulle1.color = 'red'
      else bulle1.color = 'black'
    }
    if (type === 'solution' || type === 'facteur' || type === 'can1' || type === 'can2') { // on ajoute les produits
      if (!(type === 'can2' && indexInconnue === i)) {
        objets.push(texteParPoint((values[i] * values[(i + 1) % n]).toString(), P))
      }
      if (type === 'can2' && indexInconnue === i) bulle2.color = 'red'
      else bulle2.color = 'black'
    }
    objets.push(bulle2)
  }
  return objets
}
export default function RoseMultiplicative () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.spacing = 2
  this.tailleDiaporama = 3
  this.nbQuestions = 1
  this.sup = 10
  this.sup2 = 5
  this.sup3 = 1
  this.introduction = 'Les nombres situés à l\'extrémité des flèches sont les produits des nombres dont les flèches sont issues.'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let type
    switch (contraindreValeur(1, 4, this.sup3, 1)) {
      case 1:
        type = 'produit'
        this.consigne = 'Calculer les produits à l\'extrémité des flèches'
        break
      case 2:
        type = 'facteur'
        this.consigne = 'Retrouver les facteurs à l\'origine des flèches'
        break
      case 3:
        type = 'can1'
        this.consigne = 'Trouver le nombre de la case rouge'
        break
      case 4:
        type = 'can2'
        this.consigne = 'Trouver le nombre de la case rouge'
        break
    }
    const nombreDeFacteurs = contraindreValeur(3, 9, this.sup2, 5)
    const facteurMax = contraindreValeur(10, 30, this.sup, 10)
    for (
      let i = 0, values, objets, objetsCorr, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      values = shuffle(rangeMinMax(2, facteurMax)).slice(0, nombreDeFacteurs)
      console.log(type)
      objets = rose({ values, type })
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
  this.besoinFormulaireNumerique = ['Valeur maximale (entre 10 et 30) des facteurs', 30]
  this.besoinFormulaire2Numerique = ['Nombre de facteur entre 3 et 9']
  this.besoinFormulaire3Numerique = ['Type de question', 4, '1 : Calculer les produits\n2 : Calculer les facteurs\n3 : Type course aux nombres 1\n4 : Type course aux nombres 2']
}
