import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Multiplication de deux entiers relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Effectuer une multiplication entre 2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @author Rémi Angot
* 4C10-3
*/
export const uuid = '153b9'
export const ref = '4C10-3'
export default function ExerciceMultiplicationsRelatifs (max = 10) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max
  this.sup2 = false // écriture simplifiée
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Calculer.'
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(1, this.sup)
      b = randint(1, this.sup)
      k = choice([[-1, -1], [-1, 1], [1, -1]]) // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
      a = a * k[0]
      b = b * k[1]
      if (a === 1) {
        a = -1
      }
      if (b === 1) {
        b = -1
      }
      if (this.sup2) {
        texte = '$ ' + a + ' \\times  ' + ecritureParentheseSiNegatif(b) + ' =$'
        texteCorr = '$ ' + a + ' \\times  ' + ecritureParentheseSiNegatif(b) + ' = ' + (a * b) + ' $'
      } else {
        texte = '$ ' + ecritureNombreRelatif(a) + ' \\times  ' + ecritureNombreRelatif(b) + ' =$'
        texteCorr = '$ ' + ecritureNombreRelatifc(a) + ' \\times  ' + ecritureNombreRelatifc(b) + ' = ' + ecritureNombreRelatifc(a * b) + ' $'
      }
      setReponse(this, i, a * b)
      texte += ajouteChampTexteMathLive(this, i)

      if (this.questionJamaisPosee(i, a, b, k)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
  this.besoinFormulaire2CaseACocher = ['Avec des écritures simplifiées']
}
