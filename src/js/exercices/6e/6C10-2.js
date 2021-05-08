/* global mathalea */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, creerCouples, randint, choice, texNombre, texNombre2, calcul, shuffle2tableaux } from '../../modules/outils.js'
import { gestionQcmInteractif, propositionsQcm } from '../../modules/gestionQcm.js'
export const amcReady = true
export const amcType = 1 // type de question AMC


export const titre = 'Tables de multiplications et multiples de 10'

/**
 * Les 2 facteurs peuvent terminer par aucun, 1, 2 ou 3 zéros
 * @Auteur Rémi Angot
* Référence 6C10-2
 */
export default function ExerciceTablesMultiplicationsEtMultiplesDe10 (
  tablesParDefaut = '2-3-4-5-6-7-8-9'
) {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = tablesParDefaut
  this.titre = titre
  this.consigne = 'Calculer'
  this.spacing = 2
  this.tailleDiaporama = 100
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function (numeroExercice) {
    this.numeroExercice = numeroExercice
    this.qcm = ['6C10-2', [], 'tables et multiples de 10,100 et 1000', 1]    
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (!this.sup) {
      // Si aucune table n'est saisie
      this.sup = '2-3-4-5-6-7-8-9'
    }
    let tables = []; let tabrep; let tabicone
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est qu'il y a qu'une seule table
      tables[0] = this.sup
    } else {
      tables = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des ;
    }
    const couples = creerCouples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nbQuestions
    ) // Liste tous les couples possibles (2,3)≠(3,2)
    for (
      let i = 0, a, b, k1, k2, texte, texteCorr, melange;
      i < this.nbQuestions;
      i++
    ) {
      a = couples[i][0]
      b = couples[i][1]
      if (a > 1) {
        k1 = choice([1, 10, 100, 1000])
      } else {
        k1 = choice([10, 100, 1000])
      }
      k2 = choice([1, 10, 100, 1000])
      a = k1 * a
      b = k2 * b
      melange = randint(0, 1)
      if (melange === 1) {
        // échange a et b pour que les multiplications ne soient pas toujours dans le même ordre (surtout lorsque tables n'a qu'un seul élément)
        const c = a
        a = b
        b = c
      }
      tabrep = [`$${texNombre2(a * b)}$`, `$${texNombre2(calcul(a * b / 10))}$`, `$${texNombre2(calcul(a * b * 10))}$`, `$${texNombre2(calcul(a * b / 100))}$`, `$${texNombre2(calcul(a * b * 100))}$`]
      tabicone = [1, 0, 0, 0, 0]
      texte =
        '$ ' + texNombre(a) + ' \\times ' + texNombre(b) + ' = \\dotfill $'
      texteCorr =
        '$ ' +
        texNombre(a) +
        ' \\times ' +
        texNombre(b) +
        ' = ' +
        texNombre(a * b) +
        ' $'
      this.qcm[1].push([`${texte}\n`,
        tabrep,
        tabicone])

      shuffle2tableaux(tabrep, tabicone)
      if (this.modeQcm && !mathalea.sortieAMC) {
        this.tableauSolutionsDuQcm[i] = tabicone
        texte += propositionsQcm(numeroExercice, i, tabrep, tabicone).texte
        texteCorr += propositionsQcm(numeroExercice, i, tabrep, tabicone).texteCorr
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  gestionQcmInteractif(this)
  this.besoinFormulaireTexte = [
    'Choix des tables',
    'Nombres séparés par des tirets'
  ] // Texte, tooltip
}
