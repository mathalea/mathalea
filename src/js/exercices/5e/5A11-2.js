import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras, shuffle, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { max } from 'mathjs'
export const dateDePublication = '16/11/2021'
export const dateDeModifImportante = '05/10/2022' // Le nb de lignes et celui de colonnes du labyrinthe sont paramétrables.
export const titre = 'Labyrinthe de multiples avec critères choisis équilibrés '

/**
 * @author Jean-Claude Lhote (remaniée par EE pour la prise en compte du nb de lignes et de colonnes du labyrinthe)
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
  this.sup3 = 1
  this.sup4 = 1

  // this.consigne=`Trouve la sortie en ne passant que par les cases contenant un nombre divisible par $${parseInt(this.sup)}$.`
  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    const tailleChiffre = 0.8
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []

    let texte; let texteCorr; let laby; let monChemin = [[]]
    const listeCouples = shuffle([[2, 3], [2, 9], [5, 3], [5, 9], [10, 3], [10, 9]])
    let tables = []
    for (const couple of listeCouples) {
      tables.push(couple[0], couple[1])
    }
    tables = combinaisonListesSansChangerOrdre(tables, this.nbQuestions)
    for (let q = 0; q < this.nbQuestions;) {
      const nbL = this.sup3 === 1 ? randint(2, 8) : max(2, this.sup3)
      const nbC = this.sup4 === 1 ? randint(3, 11 - nbL) : max(3, this.sup4)
      laby = labyrinthe({ nbLignes: nbL, nbColonnes: nbC })
      laby.niveau = this.sup // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
      monChemin = laby.choisitChemin(laby.niveau) // On choisit un chemin
      laby.murs2d = laby.construitMurs(monChemin, tailleChiffre) // On construit le labyrinthe
      laby.chemin2d = laby.traceChemin(monChemin) // On trace le chemin solution
      texte = `${texteEnCouleurEtGras('Trouve la sortie en ne passant que par les cases contenant un nombre divisible par ', 'black')}$${tables[q]}$.<br>`
      texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en couleur et la sortie était le numéro $${2 - monChemin[monChemin.length - 1][1] + 1}$.`, 'black')}<br>`
      // Zone de construction du tableau de nombres : S'ils sont sur monChemin et seulement si, ils doivent vérifier la consigne
      let listeMultiples = []
      const listeNonMultiples = []
      for (let i = 200; i <= 12000; i += randint(1, 100)) {
        listeMultiples.push(tables[q] * i)
      }
      for (let i = 1; i <= nbC * nbL; i++) {
        listeNonMultiples.push(randint(200, 5000) * tables[q] + randint(1, tables[q] - 1))
      }
      listeMultiples = combinaisonListes(listeMultiples, 12)

      // On place les objets nombres.
      laby.nombres2d = laby.placeNombres(monChemin, listeMultiples, listeNonMultiples, tailleChiffre)
      const params = { xmin: -4, ymin: 0, xmax: 5 + 3 * nbC, ymax: 2 + 3 * nbL, pixelsParCm: 20, scale: 0.7 }
      texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
      texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
      if (this.questionJamaisPosee(q, listeMultiples[0], listeNonMultiples[0])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de rapidité', 6, '1 : Escargot\n2 : Tortue\n3 : Lièvre\n4 : Antilope\n5 : Guépard\n6 : Au hasard']
  this.besoinFormulaire3Numerique = ['Nombre de lignes du labyrinthe', 8, 'Entre 2 et 8\n1 si vous laissez le hasard décider']
  this.besoinFormulaire4Numerique = ['Nombre de colonnes du labyrinthe', 8, 'Entre 3 et 8\n1 si vous laissez le hasard décider']
}
