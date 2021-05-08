/* global mathalea */
import Exercice from '../ClasseExercice.js'
import { shuffle2tableaux, listeQuestionsToContenu, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureAlgebrique, texNombre } from '../../modules/outils.js'
import { gestionQcmInteractif, propositionsQcm } from '../../modules/gestionQcm.js'

export const amcReady = true

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
  this.consigne = 'Calculer'
  this.spacing = 2
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function (numeroExercice) {
    this.numeroExercice = numeroExercice
    this.qcm = ['5R20', [], 'tables et multiples de 10,100 et 1000', 1]
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
        texte = `$ ${texNombre(a)}${ecritureAlgebrique(b)} = \\dotfill $`
        texteCorr = `$ ${a}${ecritureAlgebrique(b)} = ${a + b} $`
      } else {
        texte = '$ ' + ecritureNombreRelatif(a) + ' + ' + ecritureNombreRelatif(b) + ' = \\dotfill $'
        texteCorr = '$ ' + ecritureNombreRelatifc(a) + ' + ' + ecritureNombreRelatifc(b) + ' = ' + ecritureNombreRelatifc(a + b) + ' $'
      }
      tabrep = [`$${a + b}$`, `$${a - b}$`, `$${-a + b}$`, `$${-a - b}$`]
      tabicone = [1, 0, 0, 0]
      shuffle2tableaux(tabrep, tabicone)
      if (this.modeQcm && !mathalea.sortieAMC) {
        this.tableauSolutionsDuQcm[i] = tabicone
        texte += propositionsQcm(numeroExercice, i, tabrep, tabicone).texte
        texteCorr += propositionsQcm(numeroExercice, i, tabrep, tabicone).texteCorr
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
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
    gestionQcmInteractif(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
  this.besoinFormulaire2CaseACocher = ['Avec des écritures simplifiées']
}
