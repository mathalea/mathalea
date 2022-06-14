import Exercice from '../ExerciceTs'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, puissanceEnProduit } from '../../modules/outils.js'
import FractionX from '../../modules/FractionEtendue.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Puissances : écriture décimale ou fractionnaire'

export const dateDePublication = '14/06/2022'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * @author Rémi Angot
 * Référence 4C35
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Calculer de tête l\'écriture décimale ou fractionnaire des nombres suivants'
    this.nbQuestions = 8
    this.nbCols = 2
    this.nbColsCorr = 2
    this.video = ''
    this.sup = false
    this.besoinFormulaireCaseACocher = ['Avec des nombres négatifs']
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['puissancePos', 'puissanceNeg', 'negPuissancePaire', 'negPuissanceImpaire', 'negParenthesePuissancePaire', 'negParenthesePuissanceImpaire', 'puissance0', 'puissance1', 'negParenthesePuissancePaireNeg', 'negParenthesePuissanceImpaireNeg'] // On créé 3 types de questions
    const typesDeQuestions = (this.sup) ? typeQuestionsDisponibles : ['puissance0', 'puissance1', 'puissancePos', 'puissanceNeg', 'puissancePos', 'puissanceNeg', 'puissancePos', 'puissanceNeg', 'puissancePos', 'puissanceNeg']
    const listeTypeQuestions = combinaisonListes(typesDeQuestions, this.nbQuestions)
    let texte: string, texteCorr : string
    let a: number, n : number, reponse: FractionX
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeQuestions[i]) {
        case 'puissancePos':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? randint(2, 8) : (a < 4) ? randint(2, 3) : 2
          texte = `$${a}^{${n}} = $`
          texteCorr = `$${a}^{${n}} = ${puissanceEnProduit(a, n)} = ${a ** n}$`
          reponse = new FractionX(a ** n)
          break
        case 'puissanceNeg':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? randint(2, 8) : (a < 4) ? randint(2, 3) : 2
          texte = `$${a}^{${-n}} = $`
          texteCorr = `$${a}^{${-n}} =  \\dfrac{1}{${a}^{${n}}} = ${puissanceEnProduit(a, -n)} = \\dfrac{1}{${a ** n}}$`
          reponse = new FractionX(1, a ** n)
          break
        case 'negPuissancePaire':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? choice([2, 4, 6, 8]) : 2
          texte = `$${-a}^{${n}} = $`
          texteCorr = `$${-a}^{${n}} = - (${puissanceEnProduit(a, n)}) = - ${a ** n}$`
          reponse = new FractionX(-(a ** n))
          break
        case 'negPuissanceImpaire':
          a = 2
          n = choice([3, 5, 7])
          texte = `$${-a}^{${n}} = $`
          texteCorr = `$${-a}^{${n}} = -(${puissanceEnProduit(a, n)}) = - ${a ** n}$`
          reponse = new FractionX(-(a ** n))
          break
        case 'negParenthesePuissancePaire':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? choice([2, 4, 6, 8]) : 2
          texte = `$(${-a})^{${n}} = $`
          texteCorr = `$(${-a})^{${n}} = ${puissanceEnProduit(-a, n)} = ${a ** n}$`
          reponse = new FractionX(a ** n)
          break
        case 'negParenthesePuissanceImpaire':
          a = choice([2, 3, randint(4, 5)])
          n = (a === 2) ? choice([3, 5, 7, 9]) : 3
          texte = `$(${-a})^{${n}} = $`
          texteCorr = `$(${-a})^{${n}} = ${puissanceEnProduit(-a, n)} = -${a ** n}$`
          reponse = new FractionX(-(a ** n))
          break
        case 'puissance0':
          a = randint(11, 40)
          if (this.sup) a *= choice([-1, 1])
          n = 0
          texte = `$${a}^{${n}} = $`
          texteCorr = `$${a}^{${n}} = 1$`
          reponse = new FractionX(1)
          break
        case 'puissance1':
          a = randint(11, 40)
          if (this.sup) a *= choice([-1, 1])
          n = 1
          texte = `$${a}^{${n}} = $`
          texteCorr = `$${a}^{${n}} = ${a}$`
          reponse = new FractionX(a)
          break
        case 'negParenthesePuissancePaireNeg':
          a = choice([2, 3, randint(4, 9)])
          n = (a === 2) ? choice([2, 4, 6, 8]) : 2
          texte = `$(${-a})^{${-n}} = $`
          texteCorr = `$(${-a})^{${-n}} = ${puissanceEnProduit(-a, -n)} = \\dfrac{1}{${a ** n}}$`
          reponse = new FractionX(1, a ** n)
          break
        case 'negParenthesePuissanceImpaireNeg':
          a = choice([2, 3, randint(4, 5)])
          n = (a === 2) ? choice([3, 5, 7, 9]) : 3
          texte = `$(${-a})^{${-n}} = $`
          texteCorr = `$(${-a})^{${-n}} = ${puissanceEnProduit(-a, -n)} = \\dfrac{-1}{${a ** n}}$`
          reponse = new FractionX(-1, a ** n)
          break
        default :
          texte = 'Cas non traité'
          texteCorr = 'Cas non traité'
      }
      setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, a, n, listeTypeQuestions[i])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
