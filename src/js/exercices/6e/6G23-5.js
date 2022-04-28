import Exercice from '../Exercice.js'
import { abs, choice, combinaisonListes, compteOccurences, contraindreValeur, lettreDepuisChiffre, listeQuestionsToContenu, miseEnEvidence, randint, rangeMinMax } from '../../modules/outils.js'
import { point, mathalea2d, segment, rotation, pointSurSegment, labelPoint, tracePoint, angleModulo, afficheMesureAngle, codageAngleDroit } from '../../modules/2d.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { min, max } from 'mathjs'
export const titre = 'Calculer un angle, déduit de figures simples'
export const interactifType = 'mathLive'
export const interactifReady = true

export const dateDePublication = '26/04/2022'

/**
 * Calculer un angle à partir de figures simples
 * Ref 6G23-4
 * @author Eric Elter
 * Publié le 27/04/2022
 */
export default function MesurerUnAngleAvecRapporteur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.sup = 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let QuestionsDisponibles = []

    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = rangeMinMax(1, 8)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        QuestionsDisponibles[0] = contraindreValeur(1, 9, this.sup, 9)
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 9, parseInt(QuestionsDisponibles[i]), 9) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(QuestionsDisponibles, 9) > 0) QuestionsDisponibles = rangeMinMax(1, 8) // Teste si l'utilisateur a choisi tout
    QuestionsDisponibles = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, reponse, A, B, B1, C, C1, D, D1, AB, AC, AD, sensRot, posA, posB, posC, posD, angB, angC, angD, paramsEnonce; i < this.nbQuestions; i++) {
      texte = ''
      texteCorr = ''
      // On prépare la figure...
      const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      const objetsCorrection = [] // Idem pour la correction

      // Le sommet de tous les angles est A.
      // Le point sur la ligne 0 est B. En fait, on construit B1 et B est entre A et B1 (afin que B ne soit pas toujours à X cm de A car cette distance n'a pas à être fixe pour un élève)
      // Les autres points seront dans l'ordre C, D, E et F. Avec la construction préalable de C1, D1... dans les mêmes conditions que précédemment.

      const numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
      const numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
      const numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
      const numD = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
      sensRot = choice([-1, 1]) // Ce sens de rotation indique si on tourne dans le sens trigo ou pas.
      angB = randint(0, 360) - 180

      switch (QuestionsDisponibles[i]) {
        case 1:
          angC = sensRot * 90
          break
        case 2:
          angC = sensRot * 180
          break
        case 3:
          angC = sensRot * 180
          break
        case 4:
          angC = sensRot * randint(89, 51)
          break
        case 5:
          angC = sensRot * randint(179, 91)
          break
      }
      // posA (et posB, pos C...) permet de choisir une position du point pour ne pas que celui-ci soit illisible (géné par le rapporteur ou l'orientation d'une demi-droite)
      posA = angB + sensRot * 90 > 135 ? 'right' : (angB + sensRot * 90 > 45 ? 'below' : (angB + sensRot * 90 > -45 ? 'left' : (angB + sensRot * 90 > -135 ? 'above' : 'right')))
      A = point(0, 0, lettreDepuisChiffre(numA), posA)
      B1 = rotation(point(6, 0), A, angB)

      posB = angB > 135 ? 'above' : (angB > 45 ? 'right' : (angB > -45 ? 'below' : (angB > -135 ? 'left' : 'above')))
      B = pointSurSegment(A, B1, randint(40, 55) / 10, lettreDepuisChiffre(numB), posB)
      posC = angleModulo(angB + angC) > 135 ? 'above' : (angleModulo(angB + angC) > 45 ? 'right' : (angleModulo(angB + angC) > -45 ? 'below' : (angleModulo(angB + angC) > -135 ? 'left' : 'above')))
      C1 = rotation(B1, A, angC)
      C = pointSurSegment(A, C1, randint(40, 55) / 10, lettreDepuisChiffre(numC), posC)

      angD = sensRot * randint(25, abs(angC) - 25, [90])
      posD = angleModulo(angB + angD) > 135 ? 'above' : (angleModulo(angB + angD) > 45 ? 'right' : (angleModulo(angB + angD) > -45 ? 'below' : (angleModulo(angB + angD) > -135 ? 'left' : 'above')))
      D1 = rotation(B1, A, angD)
      D = pointSurSegment(A, D1, randint(40, 55) / 10, lettreDepuisChiffre(numD), posD)
      AB = segment(A, B1)
      AC = segment(A, C1)
      AD = segment(A, D1)

      objetsEnonce.push(AB, AC, AD, labelPoint(A, B, C, D), tracePoint(B, C, D), afficheMesureAngle(B, A, D)) // On remplit les tableaux d'objets Mathalea2d
      objetsCorrection.push(AB, AC, AD, labelPoint(A, B, C, D), tracePoint(B, C, D), afficheMesureAngle(B, A, D), afficheMesureAngle(C, A, D)) // On remplit les tableaux d'objets Mathalea2d

      if (QuestionsDisponibles[i] === 1) {
        objetsEnonce.push(codageAngleDroit(B, A, C, 'blue', 0.8, 2)) // On remplit les tableaux d'objets Mathalea2d
        objetsCorrection.push(codageAngleDroit(B, A, C, 'blue', 0.8, 2)) // On remplit les tableaux d'objets Mathalea2d
      } else if (QuestionsDisponibles[i] === 2 || QuestionsDisponibles[i] === 3) {
        if (QuestionsDisponibles[i] === 2) objetsEnonce.push(afficheMesureAngle(C, A, B)) // On remplit les tableaux d'objets Mathalea2d
        objetsCorrection.push(afficheMesureAngle(C, A, B)) // On remplit les tableaux d'objets Mathalea2d
      }

      if (QuestionsDisponibles[i] === 3) texte += `Sachant que les points ${lettreDepuisChiffre(numC)}, ${lettreDepuisChiffre(numA)} et ${lettreDepuisChiffre(numB)} sont alignés, quelle`
      else if (QuestionsDisponibles[i] > 3) texte += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ mesure ${abs(angC)}°, quelle`
      else texte += 'Quelle'
      texte += ` est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ ?`

      texteCorr += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ mesure $${abs(angC)}°$, alors l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $${abs(angC)}°-${abs(angD)}°=${miseEnEvidence(abs(angC) - abs(angD) + '°')}$.<br>`
      reponse = abs(angC) - abs(angD)
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true })
      }
      setReponse(this, i, reponse)

      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: -1 + min(A.x, B1.x, C1.x, D1.x), ymin: -1 + min(A.y, B1.y, C1.y, D1.y), xmax: 1 + max(A.x, B1.x, C1.x, D1.x), ymax: 1 + max(A.y, B1.y, C1.y, D1.y), pixelsParCm: 20, scale: 1, mainlevee: false }

      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsEnonce, objetsCorrection)

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
    }
  }
  this.besoinFormulaireTexte = [
    'Type d\'exercice',
    `Nombres séparés par des tirets :
    1 : Complément d'un angle droit
    2 : Complément d'un angle plat avec affichage angle plat
    3 : Complément d'un angle plat avec précision des points alignés
    4 : Complément d'un angle aigu
    5 : Complément d'un angle obtus
    6 : Diviseur d'un angle droit
    7 : Diviseur d'un angle plat`
  ]
}
