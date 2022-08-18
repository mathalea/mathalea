import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, contraindreValeur, randint, choice, shuffle } from '../../modules/outils.js'
import { labelPoint, longueur, mathalea2d, papierPointe, point, rotation, tracePoint } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
export const titre = 'Compléter un nuage de points symétriques'
export const dateDePublication = '18/12/2021'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpenNum'

/**
 * Symétrie centrale sur papier pointé
 * Ref 5G11-6
 * @author Jean-Claude Lhote
 * Publié le 18/12/2021
 */
export default function CompleterParSymetrie5e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup2 = 1
  this.nouvelleVersion = function () {
    if (this.interactif) this.consigne = 'Placer les points en cliquant, puis vérifier la réponse.'
    this.sup2 = contraindreValeur(1, 4, this.sup2, 1)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const couples = []
    const pointsCliquables = [[]]
    let pointsPossibles
    const pointsChoisis = []
    const pointsAffiches = []
    const pointsEnPlusCorr = []
    const pointsNonSolution = []
    const pointsSolution = []
    const typeDePapier = ['quad', 'quad', 'hexa', 'equi'] // l'élément 0 sera changé aléatoirement pour correspondre au type mélange (this.sup2 % 4)
    for (let i = 0, cpt = 0, papier, image, d, O, j, trouve, texte, texteCorr, objetsEnonce, nbCouplesComplets, objetsCorrection; i < this.nbQuestions && cpt < 50;) {
      typeDePapier[0] = typeDePapier[1 + i % 3]
      // on remet à vide tous les tableaux utilisés pour la question suivante
      objetsEnonce = []
      objetsCorrection = []
      pointsChoisis.length = 0
      pointsAffiches.length = 0
      pointsEnPlusCorr.length = 0
      pointsNonSolution[i] = []
      pointsSolution[i] = []
      pointsCliquables[i] = []
      couples.length = 0

      papier = papierPointe({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, type: typeDePapier[this.sup2 === 4 ? 0 : this.sup2] })

      objetsEnonce.push(papier)

      if (typeDePapier[(this.sup2 === 4 ? 0 : this.sup2)] === 'quad') {
        O = point(5, 5, 'O')
      } else {
        O = point(4.33, 4.5, 'O')
      }
      d = tracePoint(O, context.isHtml ? 'blue' : 'black')
      d.epaisseur = 2
      d.style = '+'
      objetsEnonce.push(d)
      pointsPossibles = papier.listeCoords.slice()
      // on prépare les points cliquables pour la version interactive
      if (this.interactif && context.isHtml) {
        for (let p = 0; p < papier.listeCoords.length; p++) {
          pointsCliquables[i].push(pointCliquable(papier.listeCoords[p][0], papier.listeCoords[p][1], { radius: 0.2, color: 'red', width: 2, opacite: 0.7 }))
        }
      }
      while (pointsPossibles.length > 1) { // si il n'en reste qu'un, on ne peut pas trouver de symétrique
        image = rotation(point(pointsPossibles[0][0], pointsPossibles[0][1]), O, 180)
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
      const nbCouplesChoisis = randint(8, 12)
      const couplesChoisis = shuffle(couples).splice(0, nbCouplesChoisis)
      for (let p = 0; p < couplesChoisis.length; p++) {
        pointsChoisis.push(couplesChoisis[p][0], couplesChoisis[p][1])
      }
      nbCouplesComplets = randint(2, 5)
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
      for (let p = 0; p < pointsCliquables[i].length; p++) {
        trouve = false
        let q = 0
        while (q < pointsEnPlusCorr.length && !trouve) {
          if (longueur(pointsEnPlusCorr[q], pointsCliquables[i][p].point) < 0.1) {
            trouve = true
            pointsSolution[i].push(pointsCliquables[i][p])
          } else {
            q++
          }
        }
        if (!trouve) {
          pointsNonSolution[i].push(pointsCliquables[i][p])
        }
      }
      texte = context.isAmc
        ? 'Voici une grille contenant des points et un centre de symétrie.<br>Ajouter un minimum de points afin que chacun des points ait son symétrique par rapport à O.<br>Écrire le nombre de points ajoutés dans le cadre. Coder ensuite ce nombre de points.<br>'
        : 'Voici une grille contenant des points et un centre de symétrie.<br>Ajouter un minimum de points afin que chacun des points ait son symétrique par rapport à O.<br>'
      texteCorr = ''
      // On prépare la figure...
      texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 11, scale: 0.7 }, ...objetsEnonce, ...pointsCliquables[i], labelPoint(O))
      if (this.interactif && context.isHtml) {
        texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
      }
      texteCorr += mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 11, scale: 0.5 }, ...objetsEnonce, ...objetsCorrection, labelPoint(O))
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [
            {
              texte: texteCorr,
              statut: 1,
              feedback: '',
              sanscadre: false
            }
          ],
          reponse: {
            valeur: [pointsEnPlusCorr.length],
            param: {
              digits: 2,
              signe: false,
              decimals: 0,
              vertical: true
            }
          }
        }
      }
      if (this.questionJamaisPosee(i, nbCouplesChoisis, nbCouplesComplets, pointsChoisis[0][0], pointsChoisis[0][1])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    this.correctionInteractive = (i) => {
      let resultat
      let aucunMauvaisPointsCliques = true
      for (const monPoint of pointsNonSolution[i]) {
        if (monPoint.etat) aucunMauvaisPointsCliques = false
        monPoint.stopCliquable()
      }
      for (const monPoint of pointsSolution[i]) {
        if (!monPoint.etat) aucunMauvaisPointsCliques = false
        monPoint.stopCliquable()
      }
      const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${i}`)
      for (let j = 0; j < pointsSolution[i].length; j++) {
        pointsSolution[i][j].stopCliquable()
      }
      let etat = true
      for (let k = 0; k < pointsSolution[i].length; k++) {
        etat = etat && pointsSolution[i][k]
      }
      if (aucunMauvaisPointsCliques && etat) {
        divFeedback.innerHTML = '😎'
        resultat = 'OK'
      } else {
        divFeedback.innerHTML = '☹️'
        resultat = 'KO'
      }
      return resultat
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaire2Numerique = ['Type de papier pointé', 4, '1 : Carrés\n2 : Hexagones\n3 : Triangles équilatéraux\n4 : Mélange']
}
