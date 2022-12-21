import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, choice, shuffle, numAlpha, texNombre, sp } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
import Decimal from 'decimal.js'
export const titre = 'Produit et somme ou différence de décimaux'

export const dateDePublication = '20/12/2022'

/**
 * Exercice pour pour tenter d'en remettre une couche sur :
 * on pose pas les additions de décimaux et les multiplications de décimaux de la même manière (dans le premier cas, il est impératif d'aligner les chiffres des unités les uns en dessous des autres, dans le deuxième on aligne les chiffres à droite indépendamment de la virgule)
 $ quand on a effectué une multiplication de deux nombres, on n'a pas besoin de poser à nouveau la multiplication si les chiffres significatifs des deux nombres sont les mêmes mais que seule la virgule n'est pas au même endroit.
 * @author Guillaume Valmont
 * idée originale de Mireille Gain
 * Référence 6C30-9
*/
export default class ProduitEtSommeOuDifferenceDeDecimaux extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 4
    this.spacing = 2
    this.besoinFormulaireNumerique = ['Nombre de calculs par exercice', 16, 'Entre 1 et 16'] // le paramètre sera numérique de valeur max 3 (le 3 en vert)
    this.sup = 3
    this.besoinFormulaire2CaseACocher = ['Mélanger additions et soustractions']
    this.sup2 = false
    this.listePackages = 'xlop'
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const A = new Decimal(choice([randint(10, 99), randint(100, 999)]) * 10 + randint(1, 9))
      const B = new Decimal(choice([randint(1, 9), randint(10, 99)]) * 10 + randint(1, 9))
      const diviseursPossibles = [10, 100, 1000]
      const operandes1 = [A]
      const operandes2 = [B]
      for (const diviseurPossible of diviseursPossibles) {
        operandes1.push(A.div(diviseurPossible))
        operandes2.push(B.div(diviseurPossible))
      }
      const couplesPossibles = []
      for (const operande1 of operandes1) {
        for (const operande2 of operandes2) {
          couplesPossibles.push({ A: operande1, B: operande2 })
        }
      }
      const couples = shuffle(couplesPossibles).slice(0, this.sup)
      texte = 'Calculer'
      texteCorr = ''
      let indice = 0
      for (const couple of couples) {
        const addition = this.sup2 ? choice([true, false]) : true
        texte += `<br>${numAlpha(indice)}$${texNombre(couple.A)} ${addition ? '+' : '-'} ${texNombre(couple.B)}$ ${sp()} ${sp()} ${sp()} et ${sp()} ${sp()} ${sp()} $${texNombre(couple.A)} \\times ${texNombre(couple.B)}$`
        texteCorr += `<br>${numAlpha(indice)}`
        texteCorr += Operation({ operande1: couple.A, operande2: couple.B, type: addition ? 'addition' : 'soustraction', style: 'display: inline', methodeParCompensation: addition })
        texteCorr += ' et '
        texteCorr += Operation({ operande1: couple.A, operande2: couple.B, type: 'multiplication', style: 'display: inline' })
        texteCorr += '<br>'
        indice++
      }
      texteCorr = texteCorr.slice(0, texteCorr.length - 4).slice(4) // Retrait du premier et du dernier <br> pour éviter des erreurs en LaTeX
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
