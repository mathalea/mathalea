/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { choice, listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { fixeBordures, mathalea2d, point, rotation, similitude, texteParPoint, longueur, segment, homothetie, polygoneRegulierParCentreEtRayon, colorToLatexOrHTML, vide2d } from '../../modules/2d.js'
import { create, all } from 'mathjs'
import { calculer } from '../../modules/outilsMathjs.js'
export const titre = 'Rose multiplicative'
const math = create(all)
/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */
export class Rose {
  // operation = 'addition' | 'multiplication
  // type = 'résultats' | 'valeurs' | 'can1' | 'can2' | 'solutions'
  constructor ({ values = [], nombreDeValeurs, rayon = 2, operation = 'addition', type = 'résultats', typeDonnees = 'entiers', cellulesPreremplies = Array.from('abcdefghi'), valeurMax = 10 }) {
    this.type = type
    this.operation = operation
    this.typeDonnees = typeDonnees
    this.nombreDeValeurs = nombreDeValeurs
    this.cellulesPreremplies = cellulesPreremplies
    this.rayon = rayon
    this.resultats = []
    this.valeurMax = valeurMax
    if (values === undefined || values.length === 0) {
      const den = randint(2, this.valeurMax)
      for (let i = 0; i < this.nombreDeValeurs ** 2; i++) {
        switch (this.typeDonnees) {
          case 'entiers' :
            values.push(randint(1, this.valeurMax))
            break
          case 'entiers relatifs' :
            values.push(randint(-this.valeurMax, this.valeurMax, 0))
            break
          case 'littéraux' :
            values.push(calculer(`${randint(1, this.valeurMax)}x + ${randint(1, this.valeurMax)}`).printResult)
            break
          case 'fractions dénominateurs multiples':
            values.push(math.fraction(randint(1, this.valeurMax), den))
            break
          case 'fractions positives dénominateurs premiers':
            values.push(math.fraction(randint(1, this.valeurMax), choice([2, 3, 5, 7])))
            break

          case 'fractions positives' :
            values.push(math.fraction(randint(1, this.valeurMax), randint(2, this.valeurMax)))
            break
          case 'fractions relatives' :
            values.push(math.fraction(randint(-this.valeurMax, this.valeurMax, 0), randint(2, this.valeurMax)))
            break
        }
      }
    } else { // si elles sont définies, on complète éventuellement la grille aléatoirement.
      for (let i = this.values.length; i < this.nombreDeValeurs ** 2; i++) {
        switch (this.typeDonnees) {
          case 'entiers' :
            values.push(randint(1, this.valeurMax))
            break
          case 'entiers relatifs' :
            values.push(randint(-this.valeurMax, this.valeurMax, 0))
            break
          case 'littéraux' :
            values.push(calculer(`${randint(1, this.valeurMax)}x + ${randint(1, this.valeurMax)}`).printResult)
            break
          case 'fractions dénominateurs multiples':
            values.push(math.fraction(randint(1, this.valeurMax), values[i - 1].d))
            break
          case 'fractions positives dénominateurs premiers':
            values.push(math.fraction(randint(1, this.valeurMax), choice([2, 3, 5, 7])))
            break
          case 'fractions positives' :
            values.push(math.fraction(randint(1, this.valeurMax), randint(2, this.valeurMax)))
            break
          case 'fractions relatives' :
            values.push(math.fraction(randint(-this.valeurMax, this.valeurMax, 0), randint(2, this.valeurMax)))
            break
        }
      }
    }
    this.values = values
    console.log(this.values)
    this.calculeResultats()
    if (this.type === 'can1' || this.type === 'can2') {
      this.indexInconnue = randint(0, this.nombreDeValeurs - 1)
    } else {
      this.indexInconnue = 999
    }
  }

  // méthode qui calcule les résultats si on le veut (sinon on peut les renseigner dans this.resultats manuellement)
  calculeResultats () {
    for (let i = 0; i < this.nombreDeValeurs; i++) {
      this.resultats[i] = this.operate(this.values[i], this.values[(i + 1) % this.nombreDeValeurs])
    }
  }

  // fonction utilisée par calculeResultats
  operate (a, b) {
    switch (this.operation) {
      case 'addition':
        if (this.typeDonnees !== 'littéraux') {
          if (this.typeDonnees.substring(0, 4) === 'frac') {
            return math.fraction(math.add(a, b))
          } else {
            return math.add(a, b)
          }
        } else {
          return calculer(`${a.toString()}+${b.toString()}`).printResult
        }
      case 'multiplication':
        if (this.typeDonnees !== 'littéraux') {
          if (this.typeDonnees.substring(0, 4) === 'frac') {
            return math.fraction(math.multiply(a, b))
          } else {
            return math.multiply(a, b)
          }
        } else {
          return calculer(`(${a.toString()})*(${b.toString()})`).printResult
        }
    }
  }

  representation () {
    const objets = []
    const O = point(0, 0)
    const A = rotation(point(this.rayon, 0), O, 180 / this.nombreDeValeurs - 90)
    for (let i = 0, bulle1, bulle2; i < this.nombreDeValeurs; i++) {
      const M = rotation(A, O, 360 * i / this.nombreDeValeurs)
      const B = similitude(M, O, 180 / this.nombreDeValeurs, 1.3)
      const D = similitude(M, O, -180 / this.nombreDeValeurs, 1.3)
      const C = homothetie(M, O, 1.6)
      const N = rotation(C, O, 360 / this.nombreDeValeurs)
      const P = similitude(M, O, 180 / this.nombreDeValeurs, 2.5)
      const s = segment(O, B, 'black')
      const t = segment(B, C, 'black')
      const u = segment(C, D, 'black')
      const s1 = homothetie(segment(C, P), C, (longueur(C, P) - 0.8) / longueur(C, P))
      s1.styleExtremites = '->'
      s1.tailleExtremites = 2
      s1.pointilles = 2
      const s2 = homothetie(segment(N, P), N, (longueur(N, P) - 0.8) / longueur(N, P))
      s2.styleExtremites = '->'
      s2.tailleExtremites = 2
      s2.pointilles = 2
      if (this.type === 'can1') {
        bulle1 = vide2d() // rotation(boite({??????}), M, 180 / this.nombreDeValeurs - 90)
      } else {
        bulle1 = vide2d()
      }
      objets.push(bulle1)
      objets.push(s, t, u, s1, s2)
      bulle2 = rotation(polygoneRegulierParCentreEtRayon(P, 0.8, this.nombreDeValeurs), P, 360 / this.nombreDeValeurs - 90)
      if (this.type === 'résultats' || this.type === 'solutions' || this.type === 'can1' || this.type === 'can2') {
        if (!(this.type === 'can1' && (this.indexInconnue === i || i === (this.indexInconnue - 1) % this.nombreDeValeurs || i === (this.indexInconnue + 1) % this.nombreDeValeurs))) {
          if (!(this.type === 'can2' && (this.indexInconnue === i || i === (this.indexInconnue + 1) % this.nombreDeValeurs))) {
            objets.push(texteParPoint(this.values[i].toString(), M))
          }
        }
        if (this.type === 'can1' && this.indexInconnue === i) bulle1.color = colorToLatexOrHTML('red')
        else {
          bulle1.color = colorToLatexOrHTML('black')
        }
      }
      if (this.type === 'solutions' || this.type === 'facteur' || this.type === 'can1' || this.type === 'can2') { // on ajoute les produits
        if (!(this.type === 'can2' && this.indexInconnue === i)) {
          objets.push(texteParPoint((this.values[i] * this.values[(i + 1) % this.nombreDeValeurs]).toString(), P))
        }
        if (this.type === 'can2' && this.indexInconnue === i) bulle2.color = colorToLatexOrHTML('red')
        else bulle2.color = colorToLatexOrHTML('black')
      } else {
        objets.push(texteParPoint(this.cellulesPreremplies[i], P))
      }

      objets.push(bulle2)
    }
    return objets
  }
}

export default function RoseMultiplicative () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.spacing = 2
  this.tailleDiaporama = 3
  this.nbQuestions = 1
  this.sup = 10
  this.sup2 = 5
  this.sup3 = 1
  this.operation = 'multiplication'
  this.type = 'résultats'
  this.typeDonnees = 'entiers'
  this.nombreDeValeurs = 5
  this.valeurMax = 10
  this.values = []
  this.introduction = 'Les nombres situés à l\'extrémité des flèches sont les produits des nombres dont les flèches sont issues.'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    switch (this.type) {
      case 'résultats':
        if (this.operation === 'multiplication') {
          this.consigne = 'Calculer les produits à l\'extrémité des flèches'
        } else {
          this.consigne = 'Calculer les sommes à l\'extrémité des flèches'
        }
        break
      case 'valeurs':
        if (this.operation === 'multiplication') {
          this.consigne = 'Retrouver les facteurs à l\'origine des flèches'
        } else {
          this.consigne = 'Retrouver les termes à l\'origine des flèches'
        }
        break
      case 'can1':
        if (this.typeDonnees === 'nombres') {
          this.consigne = 'Trouver le nombre de la case rouge'
        } else {
          this.consigne = 'Trouver l\'expression de la case rouge'
        }
        break
      case 'can2':
        if (this.typeDonnees === 'nombres') {
          this.consigne = 'Trouver le nombre de la case rouge'
        } else {
          this.consigne = 'Trouver l\'expression de la case rouge'
        }
        break
    }

    for (
      let i = 0, objets, objetsCorr, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const rose = new Rose({ values: this.values, nombreDeValeurs: this.nombreDeValeurs, type: this.type, operation: this.operation, valeurMax: this.valeurMax, typeDonnees: this.typeDonnees })
      objets = rose.representation()
      rose.type = 'solutions'
      objetsCorr = rose.representation()
      texte = mathalea2d(Object.assign({}, fixeBordures(objets)), objets)
      texteCorr = mathalea2d(Object.assign({}, fixeBordures(objetsCorr)), objetsCorr)
      if (this.questionJamaisPosee(i, ...rose.values)) {
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
  this.besoinFormulaire3Numerique = ['Type de question', 4, '1 : Calculer les produits\n2 : Calculer les facteurs\n3 : this.Type course aux nombres 1\n4 : this.Type course aux nombres 2']
}
