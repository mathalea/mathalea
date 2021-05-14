import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureAlgebrique, shuffle2tableaux } from '../../modules/outils.js'
import { propositionsQcm, elimineDoublons } from '../../modules/gestionQcm.js'
export const amcReady = true
export const amcType = 1
export const titre = 'Addition à trou de deux entiers relatifs'

/**
* Compléter une addition à trou entre 2 nombres relatifs.
*
* * On peut paramétrer la distance à zéro maximale des deux termes (par défaut égale à 20)
* * On peut choisir d'avoir une écriture simplifiée  (par défaut ce n'est pas le cas)
* @Auteur Rémi Angot
* 5R20-2
*/
export default function Exercice_additions_relatifs_a_trou (max = 20) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max
  this.sup2 = false // écriture simplifiée
  this.titre = titre
  this.consigne = 'Compléter'
  this.spacing = 2
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function (numeroExercice) {
    this.numeroExercice = numeroExercice
    this.qcm = ['5R20-2', [], 'Additions à trou de nombres relatifs', amcType]
    let tabrep, tabicone
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(1, this.sup)
      b = randint(1, this.sup)
      k = choice([[-1, -1], [-1, 1], [1, -1]]) // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
      a = a * k[0]
      b = b * k[1]
      if (this.sup2) {
        texte = '$ ' + a + ' + ' + '\\ldots\\ldots\\ldots' + ' = ' + (a + b) + ' $'
        texteCorr = '$ ' + a + ecritureAlgebrique(b) + ' = ' + (a + b) + ' $'
      } else {
        texte = '$ ' + ecritureNombreRelatif(a) + ' + ' + '\\ldots\\ldots\\ldots' + ' = ' + ecritureNombreRelatif(a + b) + ' $'
        texteCorr = '$ ' + ecritureNombreRelatifc(a) + ' + ' + ecritureNombreRelatifc(b) + ' = ' + ecritureNombreRelatifc(a + b) + ' $'
      }
      tabrep = [`$${b}$`, `$${a + b + a}$`, `$${-2 * a - b}$`, `$${-b}$`]
      tabicone = [1, 0, 0, 0];
      [tabrep, tabicone] = elimineDoublons(tabrep, tabicone)
      shuffle2tableaux(tabrep, tabicone)
      if (this.modeQcm && !context.isAmc) {
			  this.tableauSolutionsDuQcm[i] = tabicone
			  texte += propositionsQcm(numeroExercice, i, tabrep, tabicone).texte
			  texteCorr += propositionsQcm(numeroExercice, i, tabrep, tabicone).texteCorr
      }
      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        this.qcm[1].push([`${texte}\n`,
          tabrep,
          tabicone])
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
    
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
  this.besoinFormulaire2CaseACocher = ['Avec des écritures simplifiées']
}
