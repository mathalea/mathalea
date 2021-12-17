import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, contraindreValeur, randint } from '../../modules/outils.js'
import { droite, mathalea2d, papierPointe, point } from '../../modules/2d.js'
export const titre = 'Compléter un nuage de points symétriques'
export const dateDePublication = '18/12/2021'

/**
 * Symétrie axiale sur papier pointé
 * Ref 6G24-4
 * @author Jean-Claude Lhote
 * Publié le 18/12/2021
 */
export default function CompleterParSymetrie6e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.nouvelleVersion = function () {
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    this.sup2 = contraindreValeur(1, 4, this.sup2, 1)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const pointsCliquables = []
    const pointsPossibles = []
    const pointsChoisis = []
    const typeDePapier = ['quad', 'quad', 'hexa', 'equi'] // l'élément 0 sera changé aléatoirement pour correspondre au type mélange (this.sup2 % 4)
    for (let i = 0, cpt = 0, texte, texteCorr, objetsEnonce, objetsCorrection; i < this.nbQuestions && cpt < 50;) {
      typeDePapier[0] = typeDePapier[1 + i % 3]
      objetsEnonce = []
      objetsCorrection = []
      pointsChoisis.length = 0
      objetsEnonce.push(papierPointe({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, type: typeDePapier[this.sup2 === 4 ? 0 : this.sup2] }))
      switch (this.sup === 4 ? randint(1, 3) : this.sup) {
        case 1:
          if (typeDePapier[(this.sup2 === 4 ? 0 : this.sup2)] === 'quad') {
            objetsEnonce.push(droite(point(5, 0), point(5, 10)))
          } else {
            objetsEnonce.push(droite(point(5.196, 0), point(5.196, 10)))
          }
          break
        case 2:
          objetsEnonce.push(droite(point(0, 4), point(10, 4)))
          break
        case 3:
          if (typeDePapier[(this.sup2 === 4 ? 0 : this.sup2)] === 'quad') {
            objetsEnonce.push(droite(point(0, 0), point(10, 10)))
          } else {
            objetsEnonce.push(droite(point(0, 2), point(8.66, 7)))
          }
          break
      }
      texte = 'Voici une grille contenant des points et une droite.<br>Compléter avec un minimum de points afin que la droite soit un axe de symétrie de la figure.<br>'
      texteCorr = ''
      // On prépare la figure...
      texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 10, ymax: 10 }, objetsEnonce)
      if (this.questionJamaisPosee(i, this.sup, this.sup2)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type d\'axes', 4, '1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique\n4 : Mélange']
  this.besoinFormulaire2Numerique = ['Type de papier pointé', 4, '1 : Carrés\n2 : Hexagones\n3 : Triangles équilatéraux\n4 : Mélange']
}
