import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombre, modalUrl } from '../../modules/outils.js'
export const titre = 'Multiplier ou diviser un entier par 10, 100, 1 000... (résultat entier)'

export const dateDeModifImportante = '09/08/2022'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot
 * Référence 6N12
 * Ajout de la division par Guillaume Valmont le 09/08/2022
 */
export const uuid = 'bb9d8'
export const ref = '6N12'
export default function MultiplierEntierPar101001000 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer :'
  this.nbQuestions = 8
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 2
  this.sup2 = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modalUrl(numeroExercice, 'https://mathix.org/glisse-nombre/index.html',
      'Glisse-nombre'
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, choice([5, 6]), 7, 8, 9]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeDeB = []
    if (parseInt(this.sup) === 2) {
      listeDeB = combinaisonListes([10, 100, 1000, 10000, 100000], this.nbQuestions)
    } else {
      listeDeB = combinaisonListes([10, 100, 1000], this.nbQuestions)
    }
    let typeQuestionsDisponibles = ['multiplication', 'division']
    if (this.sup2 === 1) typeQuestionsDisponibles = ['multiplication']
    else if (this.sup2 === 2) typeQuestionsDisponibles = ['division']
    else typeQuestionsDisponibles = ['multiplication', 'division']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          a = randint(1, 9)
          break
        case 2:
          a = randint(2, 9) * 10
          break
        case 3:
          a = randint(2, 9) * 100
          break
        case 4:
          a = randint(2, 9) * 1000
          break
        case 5:
          a = randint(1, 9) * 100 + randint(1, 9)
          break
        case 6:
          a = randint(1, 9) * 1000 + randint(1, 9)
          break
        case 7:
          a = randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
          break
        case 8:
          a = randint(1, 9) * 10000 + randint(1, 9) * 100
          break
        case 9:
          a = randint(1, 9) * 10 + randint(1, 9)
          break
      }

      b = listeDeB[i]
      switch (listeTypeQuestions[i]) {
        case 'multiplication':
          if (choice([true, false])) {
            const c = a
            a = b
            b = c
          }
          texte = `$${texNombre(a)}\\times${texNombre(b)}$`
          texteCorr = `$${texNombre(a)}\\times${texNombre(b)}=${texNombre(a * b)}$`
          break
        case 'division':
          texte = `$${texNombre(a * b)}\\div${texNombre(b)}$`
          texteCorr = `$${texNombre(a * b)}\\div${texNombre(b)}=${texNombre(a)}$`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Multiplication ou division par 10, 100 ou 1 000\n2 : Multiplication ou division par 10, 100, 1 000, 10 000 ou 100 000']
  this.besoinFormulaire2Numerique = ['Multiplication ou division', 3, '1 : Multiplication\n2 : Division\n3 : Mélange']
}
