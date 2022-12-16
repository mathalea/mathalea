import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras, choice, contraindreValeur, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const interactifReady = false
export const titre = 'Parcourir un labyrinthe de multiples'
export const dateDeModifImportante = '05/10/2022' // Le nb de lignes et celui de colonnes du labyrinthe sont paramétrables.

/**
 * @author Jean-Claude Lhote (remaniée par EE pour la prise en compte du nb de lignes et de colonnes du labyrinthe)
 * Publié le 6/12/2020
 * Ref : c3C10-2 et 6C10-5
 * Parcourir un labyrinthe de nombres en passant par les multiples du nombre choisi.
 * Relecture : Janvier 2022 par EE
 */

export const uuid = 'fd4d8'
export const ref = '6C10-5'
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
  this.sup = 4
  const maximum = this.niveau === 'CM' ? 10 : 13
  this.sup2 = this.niveau === 'CM' ? 3 : 4
  this.sup3 = 1
  this.sup4 = 1

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

    for (let q = 0, texte, texteCorr, monChemin, laby, listeMultiples; q < this.nbQuestions;) {
      const nbL = this.sup3 === 1 ? randint(2, 8) : Math.max(2, this.sup3)
      const nbC = this.sup4 === 1 ? randint(3, 11 - nbL) : Math.max(3, this.sup4)
      laby = labyrinthe({ nbLignes: nbL, nbColonnes: nbC, scaleFigure: 0.7 })
      laby.niveau = parseInt(this.sup2) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
      monChemin = laby.choisitChemin(laby.niveau) // On choisit un chemin
      laby.murs2d = laby.construitMurs(monChemin) // On construit le labyrinthe
      laby.chemin2d = laby.traceChemin(monChemin) // On trace le chemin solution

      texte = `${texteEnCouleurEtGras('Trouve la sortie en ne passant que par les cases contenant un multiple de ', 'black')}$${table[q]}$.<br>`
      texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en couleur et la sortie était le numéro $${2 - monChemin[monChemin.length - 1][1] + 1}$.`, 'black')}<br>`
      // Zone de construction des tableaux de nombres
      listeMultiples = []
      const listeNonMultiples = []
      for (let i = 2; i <= maximum; i++) {
        listeMultiples.push(table[q] * i)
      }
      for (let i = 1; i <= nbC * nbL; i++) {
        listeNonMultiples.push(randint(2, maximum) * table[q] + randint(1, table[q] - 1))
      }

      listeMultiples = combinaisonListes(listeMultiples, nbC * nbL)

      // Le tableau de nombre étant fait, on place les objets nombres.
      laby.nombres2d = laby.placeNombres(monChemin, listeMultiples, listeNonMultiples, tailleChiffre)
      const params = { xmin: -4, ymin: 0, xmax: 5 + 3 * nbC, ymax: 2 + 3 * nbL, pixelsParCm: 20, scale: 0.7 }
      texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
      if ((1 + q) % 3 === 0 && !context.isHtml && !context.isAmc && this.nbQuestions > 3) { // en contexte Latex, on évite que la consigne soit sur un page différente du labyrinthe
        texte += '\\newpage'
      }
      texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)

      /** ********************** AMC Open *****************************/
      this.autoCorrection = [{ enonce: texte, propositions: [{ texte: texteCorr, statut: 3, feedback: '' }] }]
      /****************************************************/
      if (this.questionJamaisPosee(q, listeMultiples[0], listeNonMultiples[0])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      listeQuestionsToContenu(this)
    }
  }
  this.besoinFormulaireNumerique = ['Tables', 4, '1 : Tables de 2,5 et 10\n2 : Tables de 3 et 9\n3 : Tables de 4,6,7 et 8\n4 : Mélange']
  this.besoinFormulaire2Numerique = ['Niveau de rapidité', 6, '1 : Escargot\n2 : Tortue\n3 : Lièvre\n4 : Antilope\n5 : Guépard\n6 : Au hasard']
  this.besoinFormulaire3Numerique = ['Nombre de lignes du labyrinthe', 8, 'Entre 2 et 8\n1 si vous laissez le hasard décider']
  this.besoinFormulaire4Numerique = ['Nombre de colonnes du labyrinthe', 8, 'Entre 3 et 8\n1 si vous laissez le hasard décider']
}
