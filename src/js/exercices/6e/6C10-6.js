/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import Rose from './_Roses.js'
import { contraindreValeur, listeQuestionsToContenu } from '../../modules/outils.js'
import { fixeBordures, mathalea2d } from '../../modules/2d.js'
export const titre = 'Rose multiplicative'
export const interactifReady = true
export const interactifType = 'custom'
/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */

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
    this.values = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.valeurMax = contraindreValeur(10, 30, this.sup, 10)
    this.nombreDeValeurs = contraindreValeur(3, 9, this.sup2, 5)
    this.sup3 = contraindreValeur(1, 4, this.sup3, 1)
    switch (this.sup3) {
      case 1:
        this.type = 'résultats'
        break
      case 2:
        this.type = 'valeurs'
        break
      case 3:
        this.type = 'can1'
        break
      case 4:
        this.type = 'can2'
        break
    }
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
