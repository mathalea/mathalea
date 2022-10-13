import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../../modules/outils/miseEnForme.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { sp } from '../../../modules/outils/contextSensitif.js'
import { texNombre } from '../../../modules/outils/texNombres.js'
import Decimal from 'decimal.js/decimal.mjs'
import FractionX from '../../../modules/FractionEtendue.js'
import { tableauColonneLigne } from '../../../modules/outils/tableauCL.js'
export const titre = 'Déterminer une probabilté dans un tableau de probabilités'
export const dateDePublication = '06/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

*/
export const uuid = '73673'
export const ref = 'can1P06'
export default function CalculProbaTableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, reponse, tableau, pAbarreinterBbarre, pA, pB, pAinterB, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      // On choisit les probas de l'arbre
      pA = (new Decimal(randint(27, 40))).div(100)
      pB = (new Decimal(randint(41, 70))).div(100)
      pAinterB = (new Decimal(randint(11, 25))).div(100)
      pAbarreinterBbarre = (new Decimal(1 - pA)).sub(pB).add(pAinterB)

      tableau = tableauColonneLigne(['', 'A', '\\overline{A}', '\\text{Total}'],
        ['B', '\\overline{B}', '\\text{Total}'],
        [`${texNombre(pAinterB, 2)}`, `${texNombre(pB - pAinterB, 2)}`, `${texNombre(pB, 2)}`, `${texNombre(pA - pAinterB, 2)}`, `${texNombre(pAbarreinterBbarre, 2)}`, `${texNombre(1 - pB, 2)}`, `${texNombre(pA, 2)}`, `${texNombre(1 - pA, 2)}`, '1'])
      texte = 'Le tableau ci-dessous est un tableau de probabilités avec deux événements $A$ et $B$  d’une expérience aléatoire.<br>  '
      switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        case 1:// p_A(B)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P_A(B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous la forme d’une fraction d’entiers)' })
          } else { texte += `${sp(5)}Déterminer $P_A(B)$. ` }
          texteCorr = ` $P_A(B)=\\dfrac{P(A\\cap B)}{P(A)}=\\dfrac{${texNombre(pAinterB, 2)}}{${texNombre(pA, 2)}}=\\dfrac{${texNombre(pAinterB * 100, 0)}}{${texNombre(pA * 100, 0)}}$ 
      `
          reponse = new FractionX(pAinterB, pA)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break
        case 2:// p(B)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P(B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous forme décimale)' })
          } else { texte += `${sp(5)}Déterminer $P_A(B)$. ` }
          texteCorr = ` $P(B)=${texNombre(pB, 2)}$ 
      `
          reponse = pB
          setReponse(this, i, reponse)
          break

        case 3:// p(Bbarre)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P(\\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous forme décimale)' })
          } else { texte += `${sp(5)}Déterminer $P(\\overline{B})$. ` }
          texteCorr = ` $P(\\overline{B})=${texNombre(1 - pB, 2)}$ 
      `
          reponse = (new Decimal(pB)).mul(-1).add(1)
          setReponse(this, i, reponse)
          break
        case 4:// p(AinterB)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P(A\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous forme décimale)' })
          } else { texte += `${sp(5)}Déterminer $P(A\\cap B)$. ` }
          texteCorr = ` $P(A\\cap B))=${texNombre(pAinterB, 2)}$ 
      `
          reponse = pAinterB
          setReponse(this, i, reponse)
          break

        case 5:// p(AinterBbarre)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P(A\\cap \\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous forme décimale)' })
          } else { texte += `${sp(5)}Déterminer $P(A\\cap \\overline{B})$. ` }
          texteCorr = ` $P(A\\cap \\overline{B})=${texNombre(pA - pAinterB, 2)}$ 
      `
          reponse = (new Decimal(pA)).sub(pAinterB)
          setReponse(this, i, reponse)
          break

        case 6:// p(AbarreinterBbarre)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P(\\overline{A}\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous forme décimale)' })
          } else { texte += `${sp(5)}Déterminer $P(\\overline{A}\\cap B)$. ` }
          texteCorr = ` $P(\\overline{A}\\cap B)=${texNombre(pB - pAinterB, 2)}$ 
      `
          reponse = (new Decimal(pB)).sub(pAinterB)
          setReponse(this, i, reponse)
          break

        case 7:// p_B(A)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P_B(A)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous la forme d’une fraction d’entiers)' })
          } else { texte += `${sp(5)}Déterminer $P_B(A)$. ` }
          texteCorr = ` $P_B(A)=\\dfrac{P(A\\cap B)}{P(B)}=\\dfrac{${texNombre(pAinterB, 2)}}{${texNombre(pB, 2)}}=\\dfrac{${texNombre(pAinterB * 100, 0)}}{${texNombre(pB * 100, 0)}}$ 
        `
          reponse = new FractionX(pAinterB, pB)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break
        case 8:// p_B(Abarre)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P_B(\\overline{A})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous la forme d’une fraction d’entiers)' })
          } else { texte += `${sp(5)}Déterminer $P_B(\\overline{A})$. ` }
          texteCorr = ` $P_B(\\overline{A})=\\dfrac{P(\\overline{A}\\cap B)}{P(B)}=\\dfrac{${texNombre(pB - pAinterB, 2)}}{${texNombre(pB, 2)}}=\\dfrac{${texNombre((pB - pAinterB) * 100, 0)}}{${texNombre(pB * 100, 0)}}$ 
          `
          reponse = new FractionX(pB - pAinterB, pB)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break

        case 9:// p_Bbare(Abarre)
          texte += `${tableau}`
          if (this.interactif) {
            texte += '<br> $P_{\\overline{B}}(\\overline{A})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee', { texteApres: '(Résultat sous la forme d’une fraction d’entiers)' })
          } else { texte += `${sp(5)}Déterminer $P_{\\overline{B}}(\\overline{A})$. ` }
          texteCorr = ` $P_{\\overline{B}}(\\overline{A})=\\dfrac{P(\\overline{A}\\cap \\overline{B})}{P(\\overline{B})}=\\dfrac{${texNombre(pAbarreinterBbarre, 2)}}{${texNombre(1 - pB, 2)}}=\\dfrac{${texNombre(pAbarreinterBbarre * 100, 0)}}{${texNombre((1 - pB) * 100, 0)}}$ 
          `
          reponse = new FractionX(pAbarreinterBbarre, 1 - pB)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break
      }
      if (this.questionJamaisPosee(i, pA, pB)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
