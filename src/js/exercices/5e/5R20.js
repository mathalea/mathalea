import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureAlgebrique, texNombre } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'

export const amcReady = true
export const amcType = [1] // type de question AMC, tableau en prévision du plusieurs types
export const interactifReady = true

export const titre = 'Addition de deux entiers relatifs'

/**
* Additionner deux relatifs inférieurs à la valeur maximale en paramètre qui est par défaut à 20.
*
* Paramètre supplémentaire ; utilisation des écritures simplifiées
* @Auteur Rémi Angot
* 5R20
*/
export default function ExerciceAdditionsRelatifs (max = 20) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max
  this.sup2 = false // écriture simplifiée
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.consigne = 'Calculer'
  this.spacing = 2
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(1, this.sup)
      b = randint(1, this.sup)
      k = choice([[-1, -1], [-1, 1], [1, -1]]) // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
      a = a * k[0]
      b = b * k[1]
      if (this.sup2) {
        texte = `$ ${texNombre(a)}${ecritureAlgebrique(b)} = \\dotfill $`
        texteCorr = `$ ${a}${ecritureAlgebrique(b)} = ${a + b} $`
      } else {
        texte = '$ ' + ecritureNombreRelatif(a) + ' + ' + ecritureNombreRelatif(b) + ' = \\dotfill $'
        texteCorr = '$ ' + ecritureNombreRelatifc(a) + ' + ' + ecritureNombreRelatifc(b) + ' = ' + ecritureNombreRelatifc(a + b) + ' $'
      }
      this.autoCorrection[i] = {}
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
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
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
}
