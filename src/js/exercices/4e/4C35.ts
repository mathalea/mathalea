import Exercice from '../ExerciceTs'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, puissanceEnProduit } from '../../modules/outils.js'
export const titre = 'Écriture fractionnaire ou décimale d\'une fraction'

export const dateDePublication = '13/06/2022'

/**
 * @author Rémi Angot
 * Référence 4C35
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Donner l\'écriture décimale ou fractionnaire des nombres suivants'
    this.nbQuestions = 6 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['puissancePos', 'puissanceNeg', 'negPuissancePaire', 'negPuissanceImpaire', 'negParenthesePuissancePaire', 'negParenthesePuissanceImpaire', 'puissance0', 'puissance1', 'negParenthesePuissancePaireNeg', 'negParenthesePuissanceImpaireNeg'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    let texte: string, texteCorr : string
    let a: number, n : number
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeQuestions[i]) {
        case 'puissancePos':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? randint(2, 8) : (a < 4) ? randint(2, 3) : 2
          texte = `$${a}^{${n}} = $`
          texteCorr = `$${a}^{${n}} = ${puissanceEnProduit(a, n)} = ${a ** n}$`
          break
        case 'puissanceNeg':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? randint(2, 8) : (a < 4) ? randint(2, 3) : 2
          texte = `$${a}^{${-n}} = $`
          texteCorr = `$${a}^{${-n}} =  \\dfrac{1}{${a}^{${n}}} = ${puissanceEnProduit(a, -n)} = \\dfrac{1}{${a ** n}}$`
          break
        case 'negPuissancePaire':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? choice([2, 4, 6, 8]) : 2
          texte = `$${-a}^{${n}} = $`
          texteCorr = `$${-a}^{${n}} = - (${puissanceEnProduit(a, n)}) = - ${a ** n}$`
          break
        case 'negPuissanceImpaire':
          a = 2
          n = choice([3, 5, 7])
          texte = `$${-a}^{${n}} = $`
          texteCorr = `$${-a}^{${n}} = -(${puissanceEnProduit(a, n)}) = - ${a ** n}$`
          break
        case 'negParenthesePuissancePaire':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? choice([2, 4, 6, 8]) : 2
          texte = `$(${-a})^{${n}} = $`
          texteCorr = `$(${-a})^{${n}} = ${puissanceEnProduit(-a, n)} = ${a ** n}$`
          break
        case 'negParenthesePuissanceImpaire':
          a = choice([2, 3, randint(4, 5)])
          n = (a === 2) ? choice([3, 5, 7, 9]) : 3
          texte = `$(${-a})^{${n}} = $`
          texteCorr = `$(${-a})^{${n}} = ${puissanceEnProduit(-a, n)} = -${a ** n}$`
          break
        case 'puissance0':
          a = randint(11, 40) * choice([-1, 1])
          n = 0
          texte = `$${a}^{${n}} = $`
          texteCorr = `$${a}^{${n}} = 1$`
          break
        case 'puissance1':
          a = randint(11, 40) * choice([-1, 1])
          n = 1
          texte = `$${a}^{${n}} = $`
          texteCorr = `$${a}^{${n}} = ${a}$`
          break
        case 'negParenthesePuissancePaireNeg':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? choice([2, 4, 6, 8]) : 2
          texte = `$(${-a})^{${-n}} = $`
          texteCorr = `$(${-a})^{${-n}} = ${puissanceEnProduit(-a, -n)} = \\dfrac{1}{${a ** n}}$`
          break
        case 'negParenthesePuissanceImpaireNeg':
          a = choice([2, 3, randint(4, 5)])
          n = (a === 2) ? choice([3, 5, 7, 9]) : 3
          texte = `$(${-a})^{${-n}} = $`
          texteCorr = `$(${-a})^{${-n}} = ${puissanceEnProduit(-a, -n)} = \\dfrac{-1}{${a ** n}}$`
          break
        default :
          texte = 'Cas non traité'
          texteCorr = 'Cas non traité'
      }
      //   if (this.questionJamaisPosee(i)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
      //    }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
