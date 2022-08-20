import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras, choice, contraindreValeur, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const interactifReady = false
export const titre = 'Parcourir un labyrinthe de multiples'

/**
 * @author Jean-Claude Lhote
 * Publié le 6/12/2020
 * Ref : c3C10-2 et 6C10-5
 * Parcourir un labyrinthe de nombres en passant par les multiples du nombre choisi.
 * Relecture : Janvier 2022 par EE
 */

export default function ExerciceLabyrintheMultiples () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.niveau = '6e'
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.tailleDiaporama = 2
  this.sup3 = 3
  this.sup = 4
  if (this.niveau === 'CM') {
    this.sup2 = 10
    this.sup3 = 3
  } else {
    this.sup2 = 13
    this.sup3 = 4
  }
  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    this.sup = contraindreValeur(1, 4, Number(this.sup), 4)
    let table
    if (this.sup === 1) {
      table = combinaisonListes([2, 5, 10], this.nbQuestions)
    } else if (this.sup === 2) {
      table = combinaisonListes([3, 9], this.nbQuestions)
    } else if (this.sup === 3) {
      table = combinaisonListes([4, 6, 8], this.nbQuestions)
    } else {
      table = combinaisonListesSansChangerOrdre([choice([2, 5, 10]), choice([3, 9]), choice([4, 6, 7, 8]), 2, 3, 4, 5, 6, 7, 8, 9])
    }
    const tailleChiffre = 1.5
    const maximum = parseInt(this.sup2)

    for (let q = 0, texte, params, texteCorr, monChemin, laby, trouve, listeMultiples, index; q < this.nbQuestions;) {
      laby = labyrinthe({ taille: tailleChiffre })
      laby.niveau = parseInt(this.sup3) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
      laby.chemin = laby.choisitChemin(laby.niveau) // On choisit un chemin
      laby.murs2d = laby.construitMurs(laby.chemin) // On construit le labyrinthe
      laby.chemin2d = laby.traceChemin(laby.chemin) // On trace le chemin solution
      monChemin = laby.chemin
      //   this.consigne=`Trouve la sortie en ne passant que par les cases contenant un multiple de $${table}$.`

      texte = `${texteEnCouleurEtGras('Trouve la sortie en ne passant que par les cases contenant un multiple de ', 'black')}$${table[q]}$.<br>`
      texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en marron et la sortie était la numéro $${2 - monChemin[monChemin.length - 1][1] + 1}$.`, 'black')}<br>`
      // Zone de construction du tableau de nombres : S'ils sont sur monchemin et seulement si, ils doivent vérifier la consigne
      listeMultiples = []
      index = 0
      for (let i = 2; i <= maximum; i++) {
        listeMultiples.push(table[q] * i)
      }
      listeMultiples = combinaisonListes(listeMultiples, 12)
      for (let a = 1; a < 7; a++) {
        laby.nombres.push([0, 0, 0])
      }
      for (let a = 1; a < 7; a++) {
        for (let b = 0; b < 3; b++) {
          trouve = false
          for (let k = 0; k < monChemin.length; k++) {
            if (monChemin[k][0] === a && monChemin[k][1] === b) trouve = true
          }
          if (!trouve) {
            laby.nombres[a - 1][b] = randint(2, maximum) * table[q] + randint(1, table[q] - 1)
          } else {
            laby.nombres[a - 1][b] = listeMultiples[index]
            index++
          }
        }
      } // Le tableau de nombre étant fait, on place les objets nombres.
      laby.nombres2d = laby.placeNombres(laby.nombres, tailleChiffre)
      params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.5 }
      texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
      if ((1 + q) % 3 === 0 && !context.isHtml && !context.isAmc && this.nbQuestions > 3) { // en contexte Latex, on évite que la consigne soit sur un page différente du labyrinthe
        texte += '\\newpage'
      }
      texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)

      /** ********************** AMC Open *****************************/
      this.autoCorrection = [{ enonce: texte, propositions: [{ texte: texteCorr, statut: 3, feedback: '' }] }]
      /****************************************************/
      if (this.questionJamaisPosee(q, ...laby.nombres)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      listeQuestionsToContenu(this)
    }
  }
  this.besoinFormulaireNumerique = ['Tables', 4, '1: tables de 2,5 et 10\n2: tables de 3 et 9\n3: tables de 4,6,7 et 8\n4: mélange']
  this.besoinFormulaire2Numerique = ['Facteur maximum']
  this.besoinFormulaire3Numerique = ['Niveau de rapidité', 6, ' 1 : Guépard\n 2 : Antilope\n 3 : Lièvre\n 4 : Tortue\n 5 : Escargot\n 6 : Au hasard']
} // Fin de l'exercice.
