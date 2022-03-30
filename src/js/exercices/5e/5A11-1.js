import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras, contraindreValeur, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
import { mathalea2d, labyrinthe } from '../../modules/2d.js'
export const dateDeModifImportante = '14/11/2021'

export const titre = 'Labyrinthe de multiples basé sur les critères de divisibilité'

/**
 * @author Jean-Claude Lhote
 * Publié le 7/12/2020
 * Ref 5A11-1
 * Sortir du labyrinthe en utilisant les critères de divisibilité.
 */
export default function ExerciceLabyrintheDivisibilite () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.niveau = '6e'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup3 = 3
  this.sup = '2-5-10'
  if (this.niveau === 'CM') {
    this.sup2 = 1
    this.sup3 = 3
  } else {
    this.sup2 = 2
    this.sup3 = 4
  }
  // this.consigne=`Trouve la sortie en ne passant que par les cases contenant un nombre divisible par $${parseInt(this.sup)}$.`
  this.nouvelleVersion = function () {
    this.sup2 = Number(this.sup2)
    this.sup3 = Number(this.sup3)
    const tailleChiffre = 0.8

    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    let tablesDisponibles
    let texte, texteCorr, trouve
    let laby
    let monChemin
    if (!this.sup) { // Si aucune liste n'est saisie
      tablesDisponibles = [2, 5, 10]
    } else {
      if (typeof this.sup === 'number') { // Si c'est un nombre c'est qu'il y a qu'un problème
        tablesDisponibles = [Number(this.sup)]
      } else {
        tablesDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        // this.nbQuestions = tablesDisponibles.length
        for (let i = 0; i < tablesDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          tablesDisponibles[i] = contraindreValeur(2, 20, parseInt(tablesDisponibles[i], 5)) // parseInt en fait un tableau d'entiers
        }
      }
    }
    const tables = combinaisonListesSansChangerOrdre(tablesDisponibles, this.nbQuestions)

    for (let i = 0; i < this.nbQuestions; i++) {
      tables[i] = contraindreValeur(2, 50, parseInt(tables[i]), 5)
    }
    for (let q = 0; q < this.nbQuestions;) {
      laby = labyrinthe({ taille: tailleChiffre })
      laby.niveau = this.sup3 // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
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
  this.besoinFormulaireTexte = ['Critère de divisibilité séparés par des tirets (exemple : 3-5-10) ', '2-5-10']
  this.besoinFormulaire3Numerique = ['Niveau de rapidité', 6, '1 : Escargot\n2 : Tortue\n3 : Lièvre\n4 : Antilope\n5 : Guépard\n6 : Au hasard']
} // Fin de l'exercice.
