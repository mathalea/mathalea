import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // qcm
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Multiplication à trou de deux entiers relatifs'

export const dateDePublication = '26/08/2022'

/**
* Compléter une multiplication à trou entre 2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @author Sébastien LOZANO
* 4C10-10
*/
export const uuid = '857c1'
export const ref = '4C10-10'
export default function ExerciceMultiplicationsRelatifsATrou (max = 10) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max
  this.sup2 = false // écriture simplifiée
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Compléter :'
  this.spacing = 2

  this.nouvelleVersion = function (numeroExercice) {
    this.sup = parseInt(this.sup)
    this.numeroExercice = numeroExercice
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(1, this.sup)
      b = randint(1, this.sup)
      k = choice([[-1, -1], [-1, 1], [1, -1]]) // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
      a = a * k[0]
      b = b * k[1]
      let facteurs
      const rang1 = randint(0, 1)
      const rang2 = 1 - rang1
      if (this.sup2) {
        facteurs = [a, '\\ldots\\ldots\\ldots', a, b]
        const facteur2 = facteurs[rang2] === '\\ldots\\ldots\\ldots' ? facteurs[rang2] : ecritureParentheseSiNegatif(facteurs[rang2])
        texte = '$ ' + facteurs[rang1] + ' \\times ' + facteur2 + ' = ' + (a * b) + ' $'
        texteCorr = '$ ' + facteurs[rang1 + 2] + ' \\times ' + ecritureParentheseSiNegatif(facteurs[rang2 + 2]) + ' = ' + (a * b) + ' $'
      } else {
        facteurs = [ecritureNombreRelatif(a), '\\ldots\\ldots\\ldots', ecritureNombreRelatifc(a), ecritureNombreRelatifc(b)]
        texte = '$ ' + facteurs[rang1] + ' \\times ' + facteurs[rang2] + ' = ' + ecritureNombreRelatif(a * b) + ' $'
        texteCorr = '$ ' + facteurs[rang1 + 2] + ' \\times ' + facteurs[rang2 + 2] + ' = ' + ecritureNombreRelatifc(a * b) + ' $'
      }

      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${b}$`,
          statut: true
        },
        {
          texte: `$${a * b - a}$`,
          statut: false
        },
        {
          texte: `$${a - b * a}$`,
          statut: false
        },
        {
          texte: `$${-b}$`,
          statut: false
        }
      ]
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }
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
