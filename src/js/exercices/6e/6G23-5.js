import Exercice from '../Exercice.js'
import { abs, arrondi, choice, combinaisonListes, compteOccurences, contraindreValeur, lettreDepuisChiffre, listeQuestionsToContenu, miseEnEvidence, randint, rangeMinMax, sp } from '../../modules/outils.js'
import { point, mathalea2d, segment, rotation, pointSurSegment, labelPoint, tracePoint, angleModulo, afficheMesureAngle, codageAngleDroit, codageAngle } from '../../modules/2d.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { min, max } from 'mathjs'
export const titre = 'Calculer un angle, déduit de figures simples'
export const amcReady = true // pour définir que l'exercice est exportable AMC
export const amcType = 'AMCNum'
export const interactifType = 'mathLive'
export const interactifReady = true

export const dateDePublication = '03/05/2022'

/**
 * Calculer un angle à partir de figures simples
 * Ref 6G23-5
 * @author Eric Elter
 * Publié le 03/05/2022
 */
export default function CalculerUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 5
  this.sup = 15
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let QuestionsDisponibles = []

    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = rangeMinMax(1, 15)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        QuestionsDisponibles[0] = contraindreValeur(1, 15, this.sup, 15)
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 15, parseInt(QuestionsDisponibles[i]), 15) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(QuestionsDisponibles, 15) > 0) QuestionsDisponibles = rangeMinMax(1, 14) // Teste si l'utilisateur a choisi tout
    QuestionsDisponibles = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    for (let i = 0, somAngle, choixAngD, choixAngC, numA, numB, numC, numD, numE, texte, texteCorr, tabAngle, partageAngle, pointsPartage, choixPartage, reponse, A, B, B1, C, C1, D, D1, E, AB, AC, AD, sensRot, posA, posB, posC, posD, angB, angC, angD, paramsEnonce; i < this.nbQuestions; i++) {
      texte = ''
      texteCorr = ''
      // On prépare la figure...
      const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      const objetsCorrection = [] // Idem pour la correction

      // Le sommet de tous les angles est A.
      // Le point B est le point de départ pour tous les angles. En fait, on construit d'abord B1 puis B construit est entre A et B1 (afin que B ne soit pas toujours à X cm de A car cette distance n'a pas à être fixe pour un élève)
      // Le point C est le point d'arrivée pour les angles de référence dans chaque cas (droit, plat, aigu, obtus)
      // Le point D est le point tel qu'on cherche à trouver l'angle CAD.
      // Le point E ne sert que pour les cas 13 et 14.
      // On construit préalablement C1 et D1... dans les mêmes conditions que pour B1.

      // Chaque numéro correspondra à une lettre différente pour chaque point.
      numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
      numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
      numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
      numD = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
      sensRot = choice([-1, 1]) // Ce sens de rotation indique si on tourne dans le sens trigo ou pas.
      angB = randint(0, 360) - 180 // Compris entre -180 et 180. Pour éviter d'avoir un segment forcément horizontal ou vertical.

      // Mise en place des angles BAC et BAD selon les cas
      choixPartage = 0
      switch (QuestionsDisponibles[i]) {
        case 1:
          angC = sensRot * 90
          break
        case 2:
          angC = 180
          break
        case 3:
          angC = 180
          break
        case 4:
          angC = sensRot * randint(51, 89)
          break
        case 5:
          angC = sensRot * randint(91, 179)
          break
        case 6:
          partageAngle = randint(2, 10, [4, 7, 8])
          choixPartage = 1
          angD = sensRot * (90 - choixPartage * arrondi(90 / partageAngle))
          angC = sensRot * 90
          break
        case 7:
          partageAngle = randint(3, 10, [4, 7, 8])
          choixPartage = randint(2, partageAngle - 1)
          angD = sensRot * (90 - choixPartage * arrondi(90 / partageAngle))
          angC = sensRot * 90
          break
        case 8:
          partageAngle = randint(2, 6, [4])
          choixPartage = partageAngle + randint(1, partageAngle - 1)
          angD = sensRot * choixPartage * arrondi(90 / partageAngle)
          angC = sensRot * 90
          break
        case 9:
          partageAngle = randint(3, 10, [7, 8])
          choixPartage = 1
          angD = sensRot * (180 - arrondi(choixPartage * 180 / partageAngle))
          angC = sensRot * 180
          break
        case 10:
          partageAngle = randint(3, 10, [7, 8])
          choixPartage = randint(2, partageAngle - 1)
          while (arrondi(choixPartage * 180 / partageAngle) === 90) { // Pour éviter d'avoir à trouver un angle droit
            choixPartage = randint(2, partageAngle - 1)
          }
          angD = sensRot * (180 - arrondi(choixPartage * 180 / partageAngle))
          angC = sensRot * 180
          break
        case 11:
          // On crée un tableau de 5 angles
          tabAngle = []
          somAngle = 0
          for (let ee = 0; ee <= 4; ee++) {
            tabAngle[ee] = (randint(25, 60))
            somAngle += tabAngle[ee]
          }
          // D est la rotation de B de la somme, au maximum, des 3 premiers angles du tableau. A minima, c'est le juste le premier angle.
          choixAngD = randint(0, 2)
          angD = tabAngle[0]
          for (let ee = 1; ee <= choixAngD; ee++) {
            angD += tabAngle[ee]
          }
          // C est la rotation de D de la somme des 2 ou 3 angles suivants dans la tableau.
          angC = angD
          choixAngC = min(choixAngD + randint(2, 3), 4) // Si angD est la somme des 3 premiers, alors angC est forcément la somme des deux suivants.
          for (let ee = choixAngD + 1; ee <= choixAngC; ee++) {
            angC += tabAngle[ee]
          }
          angD = sensRot * angD
          angC = sensRot * angC
          somAngle = sensRot * somAngle
          break
        case 12:
          angD = -sensRot * randint(25, 85)
          angC = sensRot * 90
          break
        case 13:
          partageAngle = randint(2, 5)
          choixAngD = randint(25, 36)
          angD = sensRot * (90 - choixAngD)
          angC = sensRot * 90
          numE = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC, numD])
          break
        case 14:
          partageAngle = randint(2, 5)
          choixAngD = randint(25, 36)
          angD = sensRot * (90 - choixAngD)
          angC = sensRot * 90
          numE = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC, numD])
          break
      }
      if (QuestionsDisponibles[i] < 6) angD = sensRot * randint(25, abs(angC) - 25, [90])

      /* Ne pas effacer ! Pratique à décommenter pour débugguer
      numA = 1
      numB = 2
      numC = 3
      numD = 4
      numE = 5
      */

      // Partie commune à tous les cas
      // posA (et posB, pos C...) permet de choisir une position du point pour ne pas que celui-ci soit illisible (géné par le rapporteur ou l'orientation d'une demi-droite)
      // Ce tableau comporte 12 entrées donc 4 identiques parce que selon que la rotation se fait dans le sens trigo ou pas, pour un angle donné, la position de A dans le tableau varie de 4.
      // La position de A pourrait peut-être aboutir à une fonction pour éviter qu'un point touche une droite.
      const tabPosition = ['above', 'above left', 'left', 'below left', 'below', 'below right', 'right', 'above right', 'above', 'above left', 'left', 'below left', 'left']
      if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].indexOf(QuestionsDisponibles[i]) !== -1) posA = tabPosition[sensRot === -1 ? Math.trunc((180 + angleModulo(angB + angC + 22.5)) / 45) : 4 + Math.trunc((180 + angleModulo(angB + angC + 22.5)) / 45)]
      else if (QuestionsDisponibles[i] === 11) posA = tabPosition[sensRot === -1 ? Math.trunc((180 + angleModulo(angB + somAngle + 22.5)) / 45) : 4 + Math.trunc((180 + angleModulo(angB + somAngle + 22.5)) / 45)]
      else if ([13, 14].indexOf(QuestionsDisponibles[i]) !== -1) posA = tabPosition[sensRot === -1 ? Math.trunc((180 + angleModulo(angB + angC + (partageAngle - 1) * choixAngD * sensRot + 22.5)) / 45) : 4 + Math.trunc((180 + angleModulo(angB + angC + (partageAngle - 1) * choixAngD * sensRot + 22.5)) / 45)]

      A = point(0, 0, lettreDepuisChiffre(numA), posA)
      B1 = rotation(point(6, 0), A, angB)
      posB = angB > 135 ? 'above' : (angB > 45 ? 'right' : (angB > -45 ? 'below' : (angB > -135 ? 'left' : 'above')))
      B = pointSurSegment(A, B1, randint(50, 60) / 10, lettreDepuisChiffre(numB), posB)
      posC = angleModulo(angB + angC) > 135 ? 'above' : (angleModulo(angB + angC) > 45 ? 'right' : (angleModulo(angB + angC) > -45 ? 'below' : (angleModulo(angB + angC) > -135 ? 'left' : 'above')))
      C1 = rotation(B1, A, angC)
      C = pointSurSegment(A, C1, choixPartage === 0 ? randint(40, 55) / 10 : 6, lettreDepuisChiffre(numC), posC)
      posD = angleModulo(angB + angD) > 135 ? 'above' : (angleModulo(angB + angD) > 45 ? 'right' : (angleModulo(angB + angD) > -45 ? 'below' : (angleModulo(angB + angD) > -135 ? 'left' : 'above')))
      D1 = rotation(B1, A, angD)
      D = pointSurSegment(A, D1, choixPartage === 0 ? randint(50, 60) / 10 : 6, lettreDepuisChiffre(numD), posD)
      AB = segment(A, B1)
      AC = segment(A, C1)
      AD = segment(A, D1)
      E = A // Utile pour les cas 13 et 14
      // Création dans les cas 6 à 10, des différents angles diviseurs de l'angle droit ou plat et les segments associés.
      if ([6, 7, 8, 9, 10].indexOf(QuestionsDisponibles[i]) !== -1) {
        pointsPartage = [B1]
        for (let ee = 1; ee <= max(partageAngle, choixPartage); ee++) {
          pointsPartage[ee] = rotation(B1, A, sensRot * ee * arrondi(abs(angC) / partageAngle))
          objetsEnonce.push(codageAngle(pointsPartage[ee - 1], A, sensRot * arrondi(abs(angC) / partageAngle), 3, 'X'))
          objetsCorrection.push(codageAngle(pointsPartage[ee - 1], A, sensRot * arrondi(abs(angC) / partageAngle), 3, 'X'))
          if (ee !== partageAngle - choixPartage || ee !== partageAngle) { // On ne crée pas les angles pour C et D (car créé dans la partie commune)
            objetsEnonce.push(segment(A, pointsPartage[ee]))
            objetsCorrection.push(segment(A, pointsPartage[ee]))
          }
        }
        // Création dans le cas 11 des différents angles et segments associés
      } else if (QuestionsDisponibles[i] === 11) {
        pointsPartage = [B1]
        for (let ee = 1; ee <= 5; ee++) {
          pointsPartage[ee] = rotation(pointsPartage[ee - 1], A, sensRot * tabAngle[ee - 1])
          objetsEnonce.push(afficheMesureAngle(pointsPartage[ee - 1], A, pointsPartage[ee]))
          objetsCorrection.push(afficheMesureAngle(pointsPartage[ee - 1], A, pointsPartage[ee]))
          if (ee !== choixAngD + 1 & ee !== choixAngC + 1) { // On ne crée pas les angles pour D (car créé dans la partie commune)
            objetsEnonce.push(segment(A, pointsPartage[ee]))
            objetsCorrection.push(segment(A, pointsPartage[ee]))
          }
        }
        // Création dans les cas 13 et 14 des différents angles et segments associés
      } else if ([13, 14].indexOf(QuestionsDisponibles[i]) !== -1) {
        pointsPartage = [D1]
        for (let ee = 1; ee <= partageAngle; ee++) {
          pointsPartage[ee] = rotation(pointsPartage[ee - 1], A, sensRot * choixAngD)
          objetsEnonce.push(codageAngle(pointsPartage[ee - 1], A, sensRot * choixAngD, 3, 'X'))
          objetsCorrection.push(codageAngle(pointsPartage[ee - 1], A, sensRot * choixAngD, 3, 'X'))
          if (ee !== 1) { // On ne crée pas les angles pour C (car créé dans la partie commune)
            objetsEnonce.push(segment(A, pointsPartage[ee]))
            objetsCorrection.push(segment(A, pointsPartage[ee]))
          }
        }
        E = pointSurSegment(A, pointsPartage[partageAngle], randint(50, 60) / 10, lettreDepuisChiffre(numE), posB)
        objetsEnonce.push(labelPoint(E), tracePoint(E))
        objetsCorrection.push(labelPoint(E), tracePoint(E))
      }

      // Partie commune à tous les cas
      objetsEnonce.push(AB, AC, AD, labelPoint(A, C, D), tracePoint(C, D))
      objetsCorrection.push(AB, AC, AD, labelPoint(A, B, C, D), tracePoint(B, C, D)) // On remplit les tableaux d'objets Mathalea2d

      // Commencent ici tous les cas particuliers

      // Angle orange de toutes les corrections  '#f15929'
      if ([8, 13].indexOf(QuestionsDisponibles[i]) !== -1) objetsCorrection.push(afficheMesureAngle(B, A, D, 'pink', 3, '', { ecart: 0.85, colorArc: 'pink', arcEpaisseur: 2, mesureEnGras: true })) // On remplit les tableaux d'objets Mathalea2d
      else if (QuestionsDisponibles[i] === 14) objetsCorrection.push(afficheMesureAngle(E, A, D, 'pink', 3, '', { ecart: 0.85, colorArc: 'pink', arcEpaisseur: 2, mesureEnGras: true })) // On remplit les tableaux d'objets Mathalea2d
      else objetsCorrection.push(afficheMesureAngle(C, A, D, 'pink', 3, '', { ecart: 0.85, colorArc: 'pink', arcEpaisseur: 2, mesureEnGras: true })) // On remplit les tableaux d'objets Mathalea2d

      // Point B
      if (QuestionsDisponibles[i] !== 11) {
        objetsEnonce.push(labelPoint(B), tracePoint(B))
      }

      // Affichage de l'angle connu
      if ([1, 2, 3, 4, 5, 12, 14].indexOf(QuestionsDisponibles[i]) !== -1) {
        objetsEnonce.push(afficheMesureAngle(B, A, D, 'black', 3, '', { ecart: 0.75 }))
      }
      if ([1, 2, 3, 4, 5].indexOf(QuestionsDisponibles[i]) !== -1) {
        objetsCorrection.push(afficheMesureAngle(B, A, D, 'black', 3, '', { ecart: 0.75 }))
      } else if (QuestionsDisponibles[i] === 12) { // Affichage de l'angle connu dans une taille plus petite
        objetsCorrection.push(afficheMesureAngle(B, A, D, 'black', 1.5, '', { ecart: 0.75 }))
      }

      reponse = QuestionsDisponibles[i] === 14 ? choixAngD * partageAngle : [8, 13].indexOf(QuestionsDisponibles[i]) !== -1 ? -abs(angD) : abs(angC - angD) // Correction issue du 6

      // Création de l'angle "multiple" dans les cas 6, 7, 9 et 10
      if ([6, 7, 9, 10].indexOf(QuestionsDisponibles[i]) !== -1) {
        objetsEnonce.push(codageAngle(D, A, sensRot * reponse, 3, '', 'pink', 0, 1, 'pink', 0.5))
      }

      // Création des angles droits et des angles plats
      if ([1, 6, 7, 8, 12, 13, 14].indexOf(QuestionsDisponibles[i]) !== -1) { // Affichage de l'angle droit dans les cas 1, 6, 7 et 8
        objetsEnonce.push(codageAngleDroit(B, A, C, 'blue', 0.8, 2))
        objetsCorrection.push(codageAngleDroit(B, A, C, 'blue', 0.8, 2))
      } else if ([2, 3, 9, 10].indexOf(QuestionsDisponibles[i]) !== -1) { // Affichage de l'angle plat dans les cas 2, 3, 9 et 10
        if (QuestionsDisponibles[i] !== 3) objetsEnonce.push(afficheMesureAngle(B, A, C, 'blue', 1.5, '', { ecart: 0.75, saillant: sensRot === -1, colorArc: 'blue', arcEpaisseur: 2 })) // On remplit les tableaux d'objets Mathalea2d
        objetsCorrection.push(afficheMesureAngle(B, A, C, 'blue', 1.5, '', { ecart: 0.75, saillant: sensRot === -1, colorArc: 'blue', arcEpaisseur: 2 })) // On remplit les tableaux d'objets Mathalea2d
      }

      // Début de la consigne selon les cas
      if ([1, 2, 11, 12].indexOf(QuestionsDisponibles[i]) !== -1) texte += 'Quelle'
      else if (QuestionsDisponibles[i] === 3) texte += `Sachant que les points $${lettreDepuisChiffre(numC)}$, $${lettreDepuisChiffre(numA)}$ et $${lettreDepuisChiffre(numB)}$ sont alignés, quelle`
      else if ([4, 5].indexOf(QuestionsDisponibles[i]) !== -1) texte += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ mesure ${abs(angC)}°, quelle`
      else if ([6, 7, 8, 9, 10].indexOf(QuestionsDisponibles[i]) !== -1) texte += `Sachant que l'angle ${QuestionsDisponibles[i] < 9 ? 'droit' : 'plat'} $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ est partagé en ${partageAngle} angles égaux, quelle`
      else if (QuestionsDisponibles[i] === 13) texte += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ mesure ${abs(choixAngD * partageAngle)}° et est partagé en ${partageAngle} angles égaux, quelle`
      else if (QuestionsDisponibles[i] === 14) texte += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ est partagé en ${partageAngle} angles égaux, quelle`

      if (QuestionsDisponibles[i] !== 14) texte += ` est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre([8, 13].indexOf(QuestionsDisponibles[i]) !== -1 ? numB : numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ ?`
      else texte += ` est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ ?`

      texte += ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true })
      setReponse(this, i, abs(reponse), { digits: 3, decimals: 0, signe: false }) // abs indispensable à cause du cas 8

      // Correction selon les cas
      // Les espaces (sp) sont nécessaires pour contrecarrer l'espace créé par les °.
      if (QuestionsDisponibles[i] < 6) texteCorr += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ mesure $${abs(angC)}°$, alors l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $${abs(angC)}\\degree-${sp()}${abs(angD)}°=${sp()}${miseEnEvidence(reponse + '°')}$.<br>`
      else if ([6, 7, 8, 9, 10].indexOf(QuestionsDisponibles[i]) !== -1) {
        texteCorr += `Sachant que l'angle ${QuestionsDisponibles[i] < 9 ? 'droit' : 'plat'} $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ est partagé en ${partageAngle} angles égaux, alors chacun de ces angles égaux mesure $${arrondi(abs(angC) / partageAngle)}°$ (car $${abs(angC)}°\\div${sp()}${partageAngle}=${sp()}${arrondi(abs(angC) / partageAngle)}°$).<br>`
        if ([6, 9].indexOf(QuestionsDisponibles[i]) !== -1) {
          texteCorr += `L'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $${miseEnEvidence(reponse + '°')}$.<br>`
        } else if ([7, 8, 10].indexOf(QuestionsDisponibles[i]) !== -1) {
          texteCorr += `L'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(QuestionsDisponibles[i] === 8 ? numB : numC)}}$ est composé de ${choixPartage} angles égaux de ${arrondi(abs(angC) / partageAngle)}° chacun et donc mesure : $${choixPartage}\\times${arrondi(abs(angC) / partageAngle)}°=${sp()}${miseEnEvidence(abs(reponse) + '°')}$.<br>`
        }
      } else if (QuestionsDisponibles[i] === 11) {
        texteCorr += `L'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $`
        for (let ee = choixAngD + 1; ee < choixAngC; ee++) {
          texteCorr += `${tabAngle[ee]}°+${sp()}`
        }
        texteCorr += `${tabAngle[choixAngC]}°`
        texteCorr += `=${sp()}${miseEnEvidence(abs(reponse) + '°')}$.<br>`
      } else if (QuestionsDisponibles[i] === 12) {
        texteCorr += `L'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $90°+${sp()}${abs(angD)}°=${sp()}${miseEnEvidence(abs(reponse) + '°')}$.<br>`
      } else if (QuestionsDisponibles[i] === 13) {
        texteCorr += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numE)}}$ est partagé en ${partageAngle} angles égaux, alors chacun de ces angles égaux mesure $${choixAngD}°$ (car $${arrondi(choixAngD * partageAngle)}°\\div${sp()}${partageAngle}=${sp()}${choixAngD}°$).<br>`
        texteCorr += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ mesure $${abs(angC)}°$, alors l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $${abs(angC)}°-${sp()}${abs(choixAngD)}°=${sp()}${miseEnEvidence(abs(reponse) + '°')}$.<br>`
      } else if (QuestionsDisponibles[i] === 14) {
        texteCorr += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}}$ mesure $${abs(angC)}°$, alors l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure : $${abs(angC)}°-${sp()}${abs(angD)}°=${sp()}${choixAngD}°$.<br>`
        texteCorr += `Sachant que l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numE)}}$ est partagé en ${partageAngle} angles égaux de $${choixAngD}°$ et donc mesure : $${partageAngle}\\times${sp()}${abs(choixAngD)}°=${sp()}${miseEnEvidence(abs(reponse) + '°')}$.<br>`
      }

      // paramètres de la fenêtre Mathalea2d pour l'énoncé
      paramsEnonce = { xmin: -3 + min(A.x, B1.x, C1.x, D1.x, E.x), ymin: -3 + min(A.y, B1.y, C1.y, D1.y, E.y), xmax: 3 + max(A.x, B1.x, C1.x, D1.x, E.x), ymax: 3 + max(A.y, B1.y, C1.y, D1.y, E.y), pixelsParCm: 20, scale: 1, mainlevee: false }

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
    7 : Multiple (inférieur à 90) d'un diviseur d'angle droit
    8 : Multiple (supérieur à 90) d'un diviseur d'angle droit
    9 : Diviseur d'un angle plat
    10 : Multiple d'un diviseur d'angle plat
    11 : Somme d'angles aigus (2 ou 3 selon le hasard)
    12 : Somme d'un angle droit et d'un angle aigu
    13 : Angle issu d'une division puis d'une différence
    14 : Angle issu d'une différence puis d'une multiplication
    15 : Mélange `
  ]
}
