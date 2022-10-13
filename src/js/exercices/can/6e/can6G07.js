import { longueur } from '../../../modules/2d/calculs.js'
import { droite } from '../../../modules/2d/droites.js'
import { papierPointe } from '../../../modules/2d/grilles.js'
import { point } from '../../../modules/2d/point.js'
import { tracePoint } from '../../../modules/2d/tracePoint.js'
import { symetrieAxiale } from '../../../modules/2d/transformations.js'
import { colorToLatexOrHTML, mathalea2d } from '../../../modules/2dGeneralites.js'
import { context } from '../../../modules/context.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { choice, shuffle } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../../modules/outils/miseEnForme.js'
import Exercice from '../../Exercice.js'
export const titre = 'Compter les points symétriques manquant'
export const dateDePublication = '18/12/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Symétrie axiale sur papier pointé
 * Ref can6G07
 * @author Jean-Claude Lhote
 * Publié le 18/12/2021
 */
export const uuid = '85dfb'
export const ref = 'can6G07'
export default function CompleterParSymetrieCan () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.nouvelleVersion = function () {
    this.sup = randint(1, 2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const couples = []
    let pointsPossibles
    const pointsChoisis = []
    const pointsAffiches = []
    const pointsEnPlusCorr = []
    const typeDePapier = ['quad', 'quad', 'hexa', 'equi'] // l'élément 0 sera changé aléatoirement pour correspondre au type mélange (this.sup2 % 4)
    for (let i = 0, cpt = 0, papier, image, d, j, trouve, texte, texteCorr, objetsEnonce, nbCouplesComplets, objetsCorrection; i < this.nbQuestions && cpt < 50;) {
      typeDePapier[0] = typeDePapier[1 + i % 3]
      // on remet à vide tous les tableaux utilisés pour la question suivante
      objetsEnonce = []
      objetsCorrection = []
      pointsChoisis.length = 0
      pointsAffiches.length = 0
      pointsEnPlusCorr.length = 0
      couples.length = 0

      papier = papierPointe({ xmin: 0, ymin: 0, xmax: 6, ymax: 6, type: 'quad' })

      objetsEnonce.push(papier)

      switch (randint(1, 2)) {
        case 1:
          d = droite(point(3, 0), point(3, 6))
          break
        case 2:
          d = droite(point(0, 3), point(6, 3))
          break
      }
      d.epaisseur = 2
      d.color = context.isHtml ? colorToLatexOrHTML('blue') : colorToLatexOrHTML('black')
      objetsEnonce.push(d)
      pointsPossibles = papier.listeCoords.slice()
      // on prépare les points cliquables pour la version interactive
      while (pointsPossibles.length > 1) { // si il n'en reste qu'un, on ne peut pas trouver de symétrique
        image = symetrieAxiale(point(pointsPossibles[0][0], pointsPossibles[0][1]), d)
        j = 1
        trouve = false
        while (j < pointsPossibles.length && !trouve) {
          // si l'image est proche d'un point, c'est qu'on a deux symétriques donc un couple potentiel.
          if (longueur(image, point(pointsPossibles[j][0], pointsPossibles[j][1])) < 0.5) {
            trouve = true
          } else j++
        }
        if (trouve) {
          // on stocke le couple de symétrique en modifiant aléatoirement l'ordre.
          couples.push(choice([true, false]) ? [pointsPossibles[0], pointsPossibles[j]] : [pointsPossibles[j], pointsPossibles[0]])
          pointsPossibles.splice(j, 1) // on retire d'abord le points d'indice j
          pointsPossibles.splice(0, 1) // puis le point d'indice 0
        } else {
          pointsPossibles.splice(0, 1) // Le point d'indice 0 n'a pas de symétrique, on le retire
        }
      }
      // la liste des couples est prête, on va pouvoir choisir les points affichés et ceux qu'on n'affiche pas.
      const nbCouplesChoisis = randint(4, 7)
      const couplesChoisis = shuffle(couples).splice(0, nbCouplesChoisis)
      for (let p = 0; p < couplesChoisis.length; p++) {
        pointsChoisis.push(couplesChoisis[p][0], couplesChoisis[p][1])
      }
      nbCouplesComplets = randint(1, 3)
      for (let p = 0; p < pointsChoisis.length; p += 2) {
        if (p < nbCouplesComplets) { // On affiche un certains nombre de couples
          pointsAffiches.push(point(pointsChoisis[p][0], pointsChoisis[p][1]))
          pointsAffiches.push(point(pointsChoisis[p + 1][0], pointsChoisis[p + 1][1]))
        } else { // et on affiche un seul des points pour les couples restants
          pointsAffiches.push(point(pointsChoisis[p][0], pointsChoisis[p][1]))
          pointsEnPlusCorr.push(point(pointsChoisis[p + 1][0], pointsChoisis[p + 1][1]))
        }
      }
      for (let p = 0; p < pointsAffiches.length; p++) {
        objetsEnonce.push(tracePoint(pointsAffiches[p]))
      }
      for (let p = 0; p < pointsEnPlusCorr.length; p++) {
        objetsCorrection.push(tracePoint(pointsEnPlusCorr[p], 'red'))
      }
      texte = context.isAmc
        ? 'Voici une grille contenant des points et un axe de symétrie.<br>Quel nombre minimum de points faut-il ajouter pour que chacun ait son symétrique ?<br>Écrire le nombre de points ajoutés dans le cadre. Coder ensuite ce nombre de points.<br>'
        : 'Voici une grille contenant des points et un axe de symétrie.<br>Quel nombre minimum de points faut-il ajouter pour que chacun ait son symétrique ?<br>'
      texteCorr = ''
      // On prépare la figure...
      texte += mathalea2d({ xmin: -0.5, ymin: -0.5, xmax: 6.5, ymax: 6.5, scale: 0.7 }, ...objetsEnonce)
      if (this.interactif && context.isHtml) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline')
      }
      texteCorr += mathalea2d({ xmin: -0.5, ymin: -0.5, xmax: 6.5, ymax: 6.5, scale: 0.5 }, ...objetsEnonce, ...objetsCorrection)
      setReponse(this, i, pointsEnPlusCorr.length)
      if (this.questionJamaisPosee(i, nbCouplesChoisis, nbCouplesComplets, pointsChoisis[0][0], pointsChoisis[0][1])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Type d\'axes', 4, '1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique\n4 : Mélange']
  // this.besoinFormulaire2Numerique = ['Type de papier pointé', 4, '1 : Carrés\n2 : Hexagones\n3 : Triangles équilatéraux\n4 : Mélange']
}
