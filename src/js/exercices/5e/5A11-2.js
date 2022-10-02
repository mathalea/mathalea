import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras, shuffle, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
export const dateDePublication = '16/11/2021'
export const titre = 'Labyrinthe de multiples avec critères choisis équilibrés '

/**
 * @author Jean-Claude Lhote
 * Publié le 16/11/2021
 * Ref 5A11-2 (clône de 5A11-1 qui datait du 7/12/2020)
 * Sortir du labyrinthe en utilisant les critères de divisibilité.
 */
export const uuid = '5618d'
export const ref = '5A11-2'
export default function ExerciceLabyrintheDivisibilite2 () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.niveau = '6e'
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup = 6

  // this.consigne=`Trouve la sortie en ne passant que par les cases contenant un nombre divisible par $${parseInt(this.sup)}$.`
  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    const tailleChiffre = 0.8
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []

    let texte, texteCorr, trouve, laby, monChemin
    const listeCouples = shuffle([[2, 3], [2, 9], [5, 3], [5, 9], [10, 3], [10, 9]])
    let tables = []
    for (const couple of listeCouples) {
      tables.push(couple[0], couple[1])
    }
    tables = combinaisonListesSansChangerOrdre(tables, this.nbQuestions)
    for (let q = 0; q < this.nbQuestions;) {
      laby = labyrinthe({ taille: tailleChiffre })
      laby.niveau = this.sup // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
      laby.chemin = laby.choisitChemin(laby.niveau) // On choisi un chemin
      laby.murs2d = laby.construitMurs(laby.chemin) // On construit le labyrinthe
      laby.chemin2d = laby.traceChemin(laby.chemin) // On trace le chemin solution
      monChemin = laby.chemin
      texte = `${texteEnCouleurEtGras('Trouve la sortie en ne passant que par les cases contenant un nombre divisible par ', 'black')}$${tables[q]}$.<br>`
      texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en marron et la sortie était la numéro $${2 - monChemin[monChemin.length - 1][1] + 1}$.`, 'black')}<br>`
      // Zone de construction du tableau de nombres : Si ils sont sur monChemin et seulement si, ils doivent vérifier la consigne
      let listeMultiples = []; let index = 0
      for (let i = 200; i <= 12000; i += randint(1, 100)) {
        listeMultiples.push(tables[q] * i)
      }
      listeMultiples = combinaisonListes(listeMultiples, 12)
      for (let a = 1; a < 7; a++) {
        laby.nombres.push([0, 0, 0])
      }
      for (let a = 1; a < 7; a++) {
        for (let b = 0; b < 3; b++) {
          trouve = false
          for (let k = 0; k < monChemin.length; k++) {
            if (monChemin[k][0] === a && monChemin[k][1] === b) { trouve = true }
          }
          if (!trouve) {
            laby.nombres[a - 1][b] = randint(200, 5000) * tables[q] + randint(1, tables[q] - 1)
          } else {
            laby.nombres[a - 1][b] = listeMultiples[index]
            index++
          }
        }
      } // Le tableau de nombre étant fait, on place les objets nombres.
      laby.nombres2d = laby.placeNombres(laby.nombres, tailleChiffre)
      const params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.7 }
      texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
      texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
      if (this.questionJamaisPosee(q, laby.nombres[0], laby.nombres[1])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de rapidité', 6, '1 : Escargot\n2 : Tortue\n3 : Lièvre\n4 : Antilope\n5 : Guépard\n6 : Au hasard']
} // Fin de l'exercice.
