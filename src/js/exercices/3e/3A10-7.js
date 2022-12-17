import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleurEtGras, choice } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
export const dateDePublication = '12/10/2022'
export const titre = 'Explorer un labyrinthe de nombres premiers'

/** Explorer un labyrinthe de nombres premiers
 * @author Eric Elter // Sur la base d'autres labyrinthes déjà créés
 */
export const uuid = '9552d'
export const ref = '3A10-7'
export default function ExerciceLabyrinthePremiers3e () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup = 3
  this.sup2 = 6
  this.sup3 = 1
  this.sup4 = 1

  this.nouvelleVersion = function () {
    const tailleChiffre = 1.5
    let nbPremiers = []
    let nbMax
    switch (this.sup) {
      case 3 :
        nbPremiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199]
        nbMax = 199
        break
      case 2 :
        nbPremiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
        nbMax = 99
        break
      case 1 :
        nbPremiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        nbMax = 29
        break
    }
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    let texte, texteCorr
    let laby = []
    let monChemin

    for (let q = 0; q < this.nbQuestions;) {
      const nbL = this.sup3 === 1 ? randint(2, 8) : Math.max(2, this.sup3)
      const nbC = this.sup4 === 1 ? randint(3, 11 - nbL) : Math.max(3, this.sup4)
      laby = labyrinthe({ nbLignes: nbL, nbColonnes: nbC })
      laby.niveau = this.sup2
      monChemin = laby.choisitChemin(laby.niveau) // On choisit un chemin
      laby.murs2d = laby.construitMurs(monChemin) // On construit le labyrinthe
      laby.chemin2d = laby.traceChemin(monChemin, choice(['blue', 'green', 'red'])) // On trace le chemin solution

      texte = `${texteEnCouleurEtGras('Trouver la sortie en ne passant que par les cases contenant un nombre premier.', 'black')}<br>`
      texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en couleur et la sortie est le numéro $${nbL - 1 - monChemin[monChemin.length - 1][1] + 1}$.`, 'black')}<br>`
      // Zone de construction du tableau de nombres : S'ils sont sur monChemin et seulement si, ils doivent vérifier la consigne
      let mauvaisesReponses = []
      const bonnesReponses = combinaisonListes(nbPremiers, nbC * nbL)
      for (let i = 0; i <= nbMax - nbPremiers.length - 2; i++) {
        mauvaisesReponses.push(randint(2, nbMax, nbPremiers.concat(mauvaisesReponses)))
      }
      mauvaisesReponses = combinaisonListes(mauvaisesReponses, nbC * nbL)
      // Le tableau de nombre étant fait, on place les objets nombres.
      laby.nombres2d = laby.placeNombres(monChemin, bonnesReponses, mauvaisesReponses, tailleChiffre)
      const params = { xmin: -4, ymin: 0, xmax: 5 + 3 * nbC, ymax: 2 + 3 * nbL, pixelsParCm: 20, scale: 0.7 }
      texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
      texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
      if (this.questionJamaisPosee(q, bonnesReponses[0], mauvaisesReponses[0])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Liste des nombres premiers ', 3, '1 : Inférieurs à 30\n2 : Inférieurs à 100\n3 : Inférieurs à 200']
  this.besoinFormulaire2Numerique = ['Niveau de rapidité', 6, '1 : Escargot\n2 : Tortue\n3 : Lièvre\n4 : Antilope\n5 : Guépard\n6 : Au hasard']
  this.besoinFormulaire3Numerique = ['Nombre de lignes du labyrinthe', 8, 'Entre 2 et 8\n1 si vous laissez le hasard décider']
  this.besoinFormulaire4Numerique = ['Nombre de colonnes du labyrinthe', 8, 'Entre 3 et 8\n1 si vous laissez le hasard décider']
} // Fin de l'exercice.
