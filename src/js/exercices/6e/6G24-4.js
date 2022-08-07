import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, contraindreValeur, randint, choice, shuffle } from '../../modules/outils.js'
import { colorToLatexOrHTML, droite, longueur, mathalea2d, papierPointe, point, symetrieAxiale, tracePoint } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
export const titre = 'Compléter un nuage de points symétriques'
export const dateDePublication = '18/12/2021'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpenNum'

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
  this.sup3 = true
  this.nouvelleVersion = function () {
    this.sup = contraindreValeur(1, 5, this.sup, 1)
    this.sup2 = contraindreValeur(1, 4, this.sup2, 1)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const couples = []
    const pointsCliquables = [[]]
    let pointsPossibles
    const objetsEnonce = []
    const objetsCorrection = []
    const pointsChoisis = []
    const pointsAffiches = []
    const pointsEnPlusCorr = []
    const pointsNonSolution = []
    const pointsSolution = []
    const pointsCliques = []
    const changeAxe = []
    const typeDePapier = ['quad', 'quad', 'hexa', 'equi'] // l'élément 0 sera changé aléatoirement pour correspondre au type mélange (this.sup2 % 4)
    for (let i = 0, cpt = 0, papier, image, d, j, trouve, texte, texteCorr, nbCouplesComplets; i < this.nbQuestions && cpt < 50;) {
      typeDePapier[0] = typeDePapier[1 + i % 3]
      // on remet à vide tous les tableaux utilisés pour la question suivante
      objetsEnonce[i] = []
      objetsCorrection[i] = []
      pointsChoisis.length = 0
      pointsAffiches.length = 0
      pointsEnPlusCorr.length = 0
      pointsNonSolution[i] = []
      pointsSolution[i] = []
      pointsCliquables[i] = []
      pointsCliques[i] = []
      couples.length = 0
      changeAxe[i] = this.sup3 ? 0 : randint(-2, 2, 0)
      papier = papierPointe({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, type: typeDePapier[this.sup2 === 4 ? 0 : this.sup2] })

      objetsEnonce[i].push(papier)

      switch (this.sup === 5 ? randint(1, 4) : this.sup) {
        case 1:
          if (typeDePapier[(this.sup2 === 5 ? 0 : this.sup2)] === 'quad') {
            d = droite(point(5 + changeAxe[i] / 2, 0), point(5 + changeAxe[i] / 2, 10))
          } else {
            d = droite(point(4.33 + 0.866 * changeAxe[i], 0), point(4.33 + 0.866 * changeAxe[i], 10))
          }
          break
        case 2:
          if (typeDePapier[(this.sup2 === 4 ? 0 : this.sup2)] === 'quad') {
            d = droite(point(0, 5 + changeAxe[i] / 2), point(10, 5 + changeAxe[i] / 2))
          } else {
            d = droite(point(0, 5.5 + changeAxe[i] / 2), point(10, 5.5 + changeAxe[i] / 2))
          }
          break
        case 3:
          if (typeDePapier[(this.sup2 === 4 ? 0 : this.sup2)] === 'quad') {
            d = droite(point(0, 1 + changeAxe[i]), point(9 - changeAxe[i], 10))
          } else {
            d = droite(point(0, 3 + changeAxe[i]), point(8.66, 8 + changeAxe[i]))
          }
          break
        case 4:
          if (typeDePapier[(this.sup2 === 4 ? 0 : this.sup2)] === 'quad') {
            d = droite(point(0, 10 - changeAxe[i]), point(10 - changeAxe[i], 0))
          } else {
            d = droite(point(0, 8 + changeAxe[i]), point(8.66, 3 + changeAxe[i]))
          }
          break
      }
      d.epaisseur = 2
      d.color = context.isHtml ? colorToLatexOrHTML('blue') : colorToLatexOrHTML('black')
      objetsEnonce[i].push(d)
      pointsPossibles = papier.listeCoords.slice()
      // on prépare les points cliquables pour la version interactive
      // over, out et click sont des ojets pour le style css des évènements de la souris, radius, width, color, size, style sont les paramètres possibles pour la trace du point
      if (this.interactif && context.isHtml) {
        for (let p = 0; p < papier.listeCoords.length; p++) {
          pointsCliquables[i].push(pointCliquable(papier.listeCoords[p][0], papier.listeCoords[p][1], { radius: 0.2, color: 'red', width: 2, opacite: 0.7 }))
        }
      }
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
        objetsEnonce[i].push(tracePoint(pointsAffiches[p]))
      }
      for (let p = 0; p < pointsEnPlusCorr.length; p++) {
        objetsCorrection[i].push(tracePoint(pointsEnPlusCorr[p], 'red'))
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
        ? 'Voici une grille contenant des points et un axe de symétrie.<br>Ajouter un minimum de points afin que la figure soit symétrique par rapport à l\'axe.<br>Écrire le nombre de points ajoutés dans le cadre. Coder ensuite ce nombre de points.<br>'
        : 'Voici une grille contenant des points et un axe de symétrie.<br>Ajouter un minimum de points afin que la figure soit symétrique par rapport à l\'axe.<br>'
      // On prépare la figure...
      texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 11, scale: 0.7 }, ...objetsEnonce[i], ...pointsCliquables[i])
      if (this.interactif && context.isHtml) {
        texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
      }
      texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 11, scale: 0.5, style: 'inline' }, ...objetsEnonce, ...objetsCorrection[i])
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
        if (monPoint.etat) {
          aucunMauvaisPointsCliques = false
          pointsCliques[i].push(tracePoint(monPoint.point, 'red')) // ça c'est pour éventuellement modifier la correction avec les points cliqués par l'utilisateur.
        }
        monPoint.stopCliquable()
      }
      for (const monPoint of pointsSolution[i]) {
        if (!monPoint.etat) aucunMauvaisPointsCliques = false
        else pointsCliques[i].push(tracePoint(monPoint.point, 'red')) // ça c'est pour éventuellement modifier la correction avec les points cliqués par l'utilisateur.
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
      // this.listeCorrections[i] = mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 11, scale: 0.7, style: 'inline' }, ...objetsEnonce[i], ...pointsCliques[i]) + mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 11, scale: 0.5, style: 'inline' }, ...objetsEnonce, ...objetsCorrection[i])
      // le contenu est déjà prêt. Il faudra modifier les <svg> à postéreiori...
      return resultat
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type d\'axes', 5, '1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique /\n4 : Axe oblique \\\n5 : Mélange']
  this.besoinFormulaire2Numerique = ['Type de papier pointé', 4, '1 : Carrés\n2 : Hexagones\n3 : Triangles équilatéraux\n4 : Mélange']
  this.besoinFormulaire3CaseACocher = ['Axe centré', true]
}
