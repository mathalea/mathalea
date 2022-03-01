import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureAlgebrique, texNombre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { context } from '../../modules/context.js'

export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

export const titre = 'Addition de deux entiers relatifs'

/**
* Additionner deux relatifs inférieurs à la valeur maximale en paramètre qui est par défaut à 20.
*
* Paramètre supplémentaire ; utilisation des écritures simplifiées
* @author Rémi Angot
* 5R20
*/
export default function ExerciceAdditionsRelatifs (max = 20) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max
  this.sup2 = false // écriture simplifiée
  this.consigne = 'Calculer :'
  this.spacing = 2
  this.modeQcm = false
  this.sup3 = false

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.interactifType = this.sup3 ? 'qcm' : 'mathLive'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(1, this.sup)
      b = randint(1, this.sup)
      k = choice([[-1, -1], [-1, 1], [1, -1]]) // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
      a = a * k[0]
      b = b * k[1]
      if (this.sup2) {
        texte = `$ ${texNombre(a)}${ecritureAlgebrique(b)} =$`
        texteCorr = `$ ${a}${ecritureAlgebrique(b)} = ${a + b} $`
      } else {
        texte = '$ ' + ecritureNombreRelatif(a) + ' + ' + ecritureNombreRelatif(b) + ' =$'
        texteCorr = '$ ' + ecritureNombreRelatifc(a) + ' + ' + ecritureNombreRelatifc(b) + ' = ' + ecritureNombreRelatifc(a + b) + ' $'
      }
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${a + b}$`,
          statut: true
        },
        {
          texte: `$${a - b}$`,
          statut: false
        },
        {
          texte: `$${-a + b}$`,
          statut: false
        },
        {
          texte: `$${-a - b}$`,
          statut: false
        }
      ]
      if (this.sup3) {
        texte += propositionsQcm(this, i).texte
      } else {
        texte += ajouteChampTexteMathLive(this, i)
        setReponse(this, i, a + b)
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
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
  if (context.isHtml) this.besoinFormulaire3CaseACocher = ['QCM']
}
