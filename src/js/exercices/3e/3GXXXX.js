import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, rangeMinMax, contraindreValeur, compteOccurences, choisitLettresDifferentes, choice, calcul, arrondi, miseEnEvidence, texteEnCouleurEtGras, sp, nombreDeChiffresDe, shuffle } from '../../modules/outils.js'
import Grandeur from '../../modules/Grandeur.js'
import { CodageAngleDroit3D, cone3dEE, cube3d, cylindre3d, droite3d, pave3d, point3d, polygone3d, prisme3dEE, pyramide3dEE, rotation3d, sphere3dEE, translation3d, vecteur3d } from '../../modules/3d.js'
import { assombrirOuEclaircir, fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { labelPoint, longueur, segment, tracePoint } from '../../modules/2d.js'

export const titre = 'Déterminer des longueurs avec Pythagore dans la géométrie dans l\'espace'
export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
/**
 * Calcul de longueurs avec Pythagore dans la géométrie dans l'espace
 * @author Eric Elter
 */

export default function CalculPythagoreEspace () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.sup = 1
  this.sup4 = 10

  this.nouvelleVersion = function (numeroExercice) {
    this.interactifType = this.sup3 === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let thissup4Max
    switch (this.classe) {
      case 4 : thissup4Max = 3
        break
      case 3 : thissup4Max = 3
        break
    }
    if (!this.sup4) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = rangeMinMax(1, thissup4Max)
    } else {
      if (typeof (this.sup4) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, thissup4Max + 1, this.sup4, thissup4Max + 1)
      } else {
        typesDeQuestionsDisponibles = this.sup4.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, thissup4Max + 1, parseInt(typesDeQuestionsDisponibles[i]), thissup4Max + 1) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, thissup4Max + 1) > 0) typesDeQuestionsDisponibles = rangeMinMax(1, thissup4Max) // Teste si l'utilisateur a choisi tout

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeUnites = [
      'km',
      'hm',
      'dam',
      'm',
      'dm',
      'cm',
      'mm'
    ]
    for (let i = 0, texte, texteCorr, reponse, objetsEnonce, A, B, B1, v1, C, D, E, BC, segmentATrouver, segmentAnnexe, solideDessine, longueurATrouver, nomSolide, segmentChoisi, choixSegments = [],
      L, p, J, K, M, JK, I, choixProfondeur, h, c, j, anglesPossibles, indiceAngleChoisi, ptBase, ptBase2, ptsBase, nbSommets, numeroSommet,
      r, v, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      // listeTypeDeQuestions[i] = 3
      context.anglePerspective = choice([-30, -60, 30, 60])
      // context.anglePerspective = choice([-30, -40])

      switch (listeTypeDeQuestions[i]) {
        case 1: // Diagonale de la face d'un cube

          j = randint(0, 6)
          c = randint(5, 10)
          A = point3d(0, 0, 0)
          B = point3d(c, 0, 0)
          D = point3d(0, 0, c)
          choixProfondeur = choice([c, -c])
          E = point3d(0, choixProfondeur, 0)

          nomSolide = choisitLettresDifferentes(8, 'OQWX').join('')
          solideDessine = pave3d(A, B, D, E, 'blue', true, nomSolide)

          choixSegments.push(['02', '1'], ['13', '2'])
          if (choixProfondeur > 0) {
            choixSegments.push(['16', '5'], ['25', '6']) // Ce sont les diagonales des faces visibles et le sommet qui forme un triangle rectangle
            if (context.anglePerspective > 0) choixSegments.push(['27', '3'], ['36', '2'])
            else choixSegments.push(['14', '5'], ['05', '1'])
          } else {
            choixSegments.push(['07', '3'], ['34', '0']) // Ce sont les diagonales des faces visibles et le sommet qui forme un triangle rectangle
            if (context.anglePerspective < 0) choixSegments.push(['27', '3'], ['36', '2'])
            else choixSegments.push(['14', '5'], ['05', '1'])
          }
          segmentChoisi = choice(choixSegments)
          J = nomSolide[parseInt(segmentChoisi[0][0])]
          K = nomSolide[parseInt(segmentChoisi[0][1])]
          I = nomSolide[parseInt(segmentChoisi[1])] // IJK est rectangle en I
          longueurATrouver = J + K
          texte += `Sachant que le cube ${nomSolide} possède des arêtes de ${c} ${listeUnites[j]}, calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
          segmentATrouver = segment(solideDessine.sommets[parseInt(segmentChoisi[0][0])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, '#f15929')
          segmentATrouver.epaisseur = 2
          objetsEnonce.push(...solideDessine.c2d, segmentATrouver)
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'
          objetsEnonce.push(new CodageAngleDroit3D(solideDessine.sommets[parseInt(segmentChoisi[0][0])], solideDessine.sommets[parseInt(segmentChoisi[1])], solideDessine.sommets[parseInt(segmentChoisi[0][1])], '#f15929', 2))
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'
          texteCorr += `Le triangle ${longueurATrouver + I} est rectangle en ${I}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${I + J}^2+${I + K}^2$.`

          JK = texNombre(calcul(Math.sqrt(c ** 2 + c ** 2), 1))
          reponse = arrondi(Math.sqrt(c ** 2 + c ** 2), 1)
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(c)}^2+${texNombre(c)}^2=${texNombre(c ** 2 + c ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(c ** 2 + c ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(JK)}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')

          break
        case 2: // Diagonale d'un cube
          j = randint(0, 6)
          // c = new Decimal(randint(2, 10)).plus(partieDecimale1)
          c = randint(5, 10)
          nomSolide = choisitLettresDifferentes(8, 'OQWX')
          nomSolide = nomSolide.join('')
          choixSegments = [['60', '5', '05', '1'], ['71', '4', '14', '0'], ['24', '1', '41', '0'], ['35', '0', '50', '1']] // Ce sont les diagonales du cubes, le sommet qui forme un triangle rectangle, la diagonale d'une face et le sommet qui forme un triangle rectangle avec cette dernière diagonale
          segmentChoisi = choice(choixSegments)
          B = nomSolide[parseInt(segmentChoisi[0][0])]
          C = nomSolide[parseInt(segmentChoisi[0][1])]
          A = nomSolide[parseInt(segmentChoisi[1])] // ABC est rectangle en A
          D = nomSolide[parseInt(segmentChoisi[3])] // ACD est rectangle en D

          longueurATrouver = B + C
          texte = `Sachant que le cube ${nomSolide} possède des arêtes de ${c} ${listeUnites[j]}, calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
          solideDessine = cube3d(1, 1, 1, c, 'blue', '', '', '', false, true, nomSolide)
          segmentATrouver = segment(solideDessine.sommets[parseInt(segmentChoisi[0][0])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, '#f15929')
          segmentATrouver.epaisseur = 2
          segmentATrouver.pointilles = 2
          objetsEnonce.push(...solideDessine.c2d, segmentATrouver)
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'
          objetsEnonce.push(new CodageAngleDroit3D(solideDessine.sommets[parseInt(segmentChoisi[0][0])], solideDessine.sommets[parseInt(segmentChoisi[1])], solideDessine.sommets[parseInt(segmentChoisi[0][1])], '#f15929', 2))
          segmentAnnexe = segment(solideDessine.sommets[parseInt(segmentChoisi[1])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, 'green')
          segmentAnnexe.epaisseur = 2
          segmentAnnexe.pointilles = 1
          objetsEnonce.push(segmentAnnexe)
          objetsEnonce.push(new CodageAngleDroit3D(solideDessine.sommets[parseInt(segmentChoisi[1])], solideDessine.sommets[parseInt(segmentChoisi[3])], solideDessine.sommets[parseInt(segmentChoisi[0][1])], 'green', 2))
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'
          texteCorr += `Le triangle ${longueurATrouver + A} est rectangle en ${A}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${A + B}^2+${A + C}^2$.`
          texteCorr += `<br> On ne peut pas continuer si on ne connaît pas la valeur de $${A + C}^2$. Trouvons-la.`
          texteCorr += `<br> ${sp(10)}Le triangle ${C + A + D} est rectangle en ${D}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${A + C}^2=${A + D}^2+${D + C}^2$.`

          BC = texNombre(calcul(Math.sqrt(c ** 2 + c ** 2 + c ** 2), 1))
          reponse = arrondi(Math.sqrt(c ** 2 + c ** 2 + c ** 2), 1)
          texteCorr += `<br> ${sp(10)}$${A + C}^2=${texNombre(c)}^2+${texNombre(c)}^2$`
          texteCorr += `<br> ${sp(10)}$${miseEnEvidence(A + C, 'green')}^2=${miseEnEvidence(texNombre(c ** 2 + c ** 2), 'green')}$`
          texteCorr += `<br> Revenons à $${longueurATrouver}^2=${A + B}^2+${A + C}^2$.`
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(c)}^2+${miseEnEvidence(texNombre(c ** 2 + c ** 2), 'green')}=${texNombre(c ** 2 + c ** 2 + c ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(c ** 2 + c ** 2 + c ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(BC)}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')

          break
        case 3: // Diagonale de la face d'un pavé droit
          j = randint(0, 6)
          // c = new Decimal(randint(2, 10)).plus(partieDecimale1)
          L = randint(5, 20)
          h = randint(5, 20, [L])
          p = randint(5, 20, [L, h])
          A = point3d(0, 0, 0)
          B = point3d(L, 0, 0)
          D = point3d(0, 0, h)
          choixProfondeur = choice([p, -p])
          E = point3d(0, choixProfondeur, 0)

          nomSolide = choisitLettresDifferentes(8, 'OQWX').join('')
          solideDessine = pave3d(A, B, D, E, 'blue', true, nomSolide)

          choixSegments.push(['02', '1', L, h], ['13', '2', h, L])
          if (choixProfondeur > 0) {
            choixSegments.push(['16', '5', p, h], ['25', '6', p, h]) // Ce sont les diagonales des faces visibles et le sommet qui forme un triangle rectangle
            if (context.anglePerspective > 0) choixSegments.push(['27', '3', L, p], ['36', '2', L, p])
            else choixSegments.push(['14', '5', p, L], ['05', '1', L, p])
          } else {
            choixSegments.push(['07', '3', h, p], ['34', '0', p, h]) // Ce sont les diagonales des faces visibles et le sommet qui forme un triangle rectangle
            if (context.anglePerspective < 0) choixSegments.push(['27', '3', L, p], ['36', '2', L, p])
            else choixSegments.push(['14', '5', p, L], ['05', '1', L, p])
          }

          segmentChoisi = choice(choixSegments)
          J = nomSolide[parseInt(segmentChoisi[0][0])]
          K = nomSolide[parseInt(segmentChoisi[0][1])]
          I = nomSolide[parseInt(segmentChoisi[1])] // IJK est rectangle en I

          longueurATrouver = J + K
          texte += `Sachant que dans le pavé droit ${nomSolide}, ${nomSolide[0]}${nomSolide[1]}=${L} ${listeUnites[j]}, ${nomSolide[0]}${nomSolide[3]}=${h} ${listeUnites[j]} et ${nomSolide[0]}${nomSolide[4]}=${p} ${listeUnites[j]},, calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
          segmentATrouver = segment(solideDessine.sommets[parseInt(segmentChoisi[0][0])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, '#f15929')
          segmentATrouver.epaisseur = 2
          objetsEnonce.push(...solideDessine.c2d, segmentATrouver)
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce) + '<br>'
          objetsEnonce.push(new CodageAngleDroit3D(solideDessine.sommets[parseInt(segmentChoisi[0][0])], solideDessine.sommets[parseInt(segmentChoisi[1])], solideDessine.sommets[parseInt(segmentChoisi[0][1])], '#f15929', 2))
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce) + '<br>'
          texteCorr += `Le triangle ${longueurATrouver + I} est rectangle en ${I}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${I + J}^2+${I + K}^2$.`

          JK = texNombre(calcul(Math.sqrt(segmentChoisi[2] ** 2 + segmentChoisi[3] ** 2), 1))
          reponse = arrondi(Math.sqrt(segmentChoisi[2] ** 2 + segmentChoisi[3] ** 2), 1)
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(segmentChoisi[2])}^2+${texNombre(segmentChoisi[3])}^2=${texNombre(segmentChoisi[2] ** 2 + segmentChoisi[3] ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(segmentChoisi[2] ** 2 + segmentChoisi[3] ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(JK)}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
          break
        case 4: // Diagonale d'un pavé droit
          j = randint(0, 6)
          L = randint(5, 20)
          h = randint(5, 20, [L])
          p = randint(5, 20, [L, h])
          A = point3d(0, 0, 0)
          B = point3d(L, 0, 0)
          D = point3d(0, 0, h)
          choixProfondeur = choice([p, -p])
          E = point3d(0, choixProfondeur, 0)

          nomSolide = choisitLettresDifferentes(8, 'OQWX').join('')
          solideDessine = pave3d(A, B, D, E, 'blue', true, nomSolide)
          choixSegments = [['60', '5', '05', '1', p, L, h], ['71', '4', '14', '0', p, L, h],
            ['24', '1', '41', '0', L, p, h], ['35', '0', '50', '1', L, p, h]] // Ce sont les diagonales du cubes, le sommet qui forme un triangle rectangle, la diagonale d'une face et le sommet qui forme un triangle rectangle avec cette dernière diagonale
          segmentChoisi = choice(choixSegments)
          J = nomSolide[parseInt(segmentChoisi[0][0])]
          K = nomSolide[parseInt(segmentChoisi[0][1])]
          I = nomSolide[parseInt(segmentChoisi[1])] // IJK est rectangle en I
          M = nomSolide[parseInt(segmentChoisi[3])] // ACD est rectangle en
          longueurATrouver = J + K
          texte += `Sachant que dans le pavé droit ${nomSolide}, ${nomSolide[0]}${nomSolide[1]}=${L} ${listeUnites[j]}, ${nomSolide[0]}${nomSolide[3]}=${h} ${listeUnites[j]} et ${nomSolide[0]}${nomSolide[4]}=${p} ${listeUnites[j]},, calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
          segmentATrouver = segment(solideDessine.sommets[parseInt(segmentChoisi[0][0])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, '#f15929')
          segmentATrouver.epaisseur = 2
          segmentATrouver.pointilles = 2
          objetsEnonce.push(...solideDessine.c2d, segmentATrouver)
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce) + '<br>'
          segmentAnnexe = segment(solideDessine.sommets[parseInt(segmentChoisi[1])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, 'green')
          segmentAnnexe.epaisseur = 2
          segmentAnnexe.pointilles = 1
          objetsEnonce.push(segmentAnnexe)
          objetsEnonce.push(new CodageAngleDroit3D(solideDessine.sommets[parseInt(segmentChoisi[1])], solideDessine.sommets[parseInt(segmentChoisi[3])], solideDessine.sommets[parseInt(segmentChoisi[0][1])], 'green', 2))
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'
          texteCorr += `Le triangle ${longueurATrouver + I} est rectangle en ${I}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${I + J}^2+${I + K}^2$.`
          texteCorr += `<br> On ne peut pas continuer si on ne connaît pas la valeur de $${I + K}^2$. Trouvons-la.`
          texteCorr += `<br> ${sp(10)}Le triangle ${K + I + M} est rectangle en ${M}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${I + K}^2=${I + M}^2+${M + K}^2$.`

          JK = texNombre(calcul(Math.sqrt(segmentChoisi[4] ** 2 + segmentChoisi[5] ** 2 + segmentChoisi[6] ** 2), 1))
          reponse = arrondi(Math.sqrt(segmentChoisi[4] ** 2 + segmentChoisi[5] ** 2 + segmentChoisi[6] ** 2), 1)
          texteCorr += `<br> ${sp(10)}$${I + K}^2=${texNombre(segmentChoisi[4])}^2+${texNombre(segmentChoisi[5])}^2$`
          texteCorr += `<br> ${sp(10)}$${miseEnEvidence(I + K, 'green')}^2=${miseEnEvidence(texNombre(segmentChoisi[4] ** 2 + segmentChoisi[5] ** 2), 'green')}$`
          texteCorr += `<br> Revenons à $${longueurATrouver}^2=${I + J}^2+${I + K}^2$.`
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(segmentChoisi[6])}^2+${miseEnEvidence(texNombre(segmentChoisi[4] ** 2 + segmentChoisi[5] ** 2), 'green')}=${texNombre(segmentChoisi[6] ** 2 + segmentChoisi[4] ** 2 + segmentChoisi[5] ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(segmentChoisi[6] ** 2 + segmentChoisi[4] ** 2 + segmentChoisi[5] ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(JK)}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
          break
        case 5: // Dans un cylindre
          j = randint(0, 6)
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0, true, choisitLettresDifferentes(1, 'OQWX'), 'left')
          if (choice([0, 1, 2]) === 0) {
            B = point3d(r, 0, 0)
            D = point3d(0, 0, h, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          } else if (choice([0, 1]) === 0) {
            B = point3d(0, r, 0)
            D = point3d(h, 0, 0, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          } else {
            B = point3d(0, 0, r)
            D = point3d(0, h, 0, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          }
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'blue', false, true, true, '#f15929')

          // Pour placer un point sur la base visible mais qui ne soit pas trop près de l'axe et des deux génératrices.
          anglesPossibles = shuffle(rangeMinMax(2, solideDessine.pointsBase2.length - 3, [16, 17, 18, 19, 20]))
          indiceAngleChoisi = 0
          while (longueur(D.c2d, solideDessine.pointsBase2[anglesPossibles[indiceAngleChoisi]]) < longueur(D.c2d, solideDessine.pointsBase2[0]) / 2) {
            indiceAngleChoisi++
          }

          ptBase2 = rotation3d(translation3d(D, v), droite3d(A, vecteur3d(A, D)), solideDessine.angleDepart + 10 * anglesPossibles[indiceAngleChoisi])
          ptBase2.c2d.nom = choisitLettresDifferentes(1, 'OQWX' + A.label + D.label)
          longueurATrouver = A.label + ptBase2.c2d.nom
          texte += `Dans ce cylindre de révolution, le rayon de ses bases (de centre respectif ${A.label} et ${D.label}) est de ${r} ${listeUnites[j]} et sa hauteur est de ${h} ${listeUnites[j]}. Sachant que le point ${ptBase2.c2d.nom} est sur la base de centre ${D.label}, calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), [...solideDessine.c2d, tracePoint(ptBase2), labelPoint(A, D, ptBase2.c2d)])

          segmentATrouver = segment(A.c2d, ptBase2.c2d, '#f15929')
          segmentATrouver.epaisseur = 2
          segmentATrouver.pointilles = 2

          objetsEnonce.push(...solideDessine.c2d, segmentATrouver, tracePoint(ptBase2), labelPoint(A, D, ptBase2.c2d))
          objetsEnonce.push(new CodageAngleDroit3D(A, D, ptBase2, 'green', 2))
          segmentAnnexe = segment(D.c2d, ptBase2.c2d, 'green')
          objetsEnonce.push(segmentAnnexe)
          segmentAnnexe = segment(D.c2d, A.c2d, 'green')
          objetsEnonce.push(segmentAnnexe)
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)

          texteCorr += `<br> Le triangle ${longueurATrouver + D.label} est rectangle en ${D.label}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${D.label + A.label}^2+${D.label + ptBase2.c2d.nom}^2$.`

          reponse = arrondi(Math.sqrt(h ** 2 + r ** 2), 1)
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(h)}^2+${texNombre(r)}^2=${texNombre(h ** 2 + r ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(h ** 2 + r ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(texNombre(reponse))}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
          break
        case 6: // Dans une pyramide à base régulière
          j = randint(0, 6)
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0, true, choisitLettresDifferentes(1, 'OQWX'), 'left')
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h * choice([1, -1]), true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          v = vecteur3d(A, B)
          ptsBase = [B]
          nbSommets = choice([3, 5, 6, 7])
          for (let ee = 1; ee < nbSommets; ee++) {
            // pyramide à base non régulière : ptsBase.push(rotation3d(B, droite3d(A, vecteur3d(D, A)), ee * 360 / (nbSommets) + choice([-10, 10]) * randint(0, 2)))
            ptsBase.push(rotation3d(B, droite3d(A, vecteur3d(D, A)), ee * 360 / (nbSommets)))
          }
          p = polygone3d(ptsBase, 'blue')
          solideDessine = pyramide3dEE(p, D, 'blue', A, true, 'red', true)
          numeroSommet = randint(0, Math.floor(nbSommets / 2))
          if (context.anglePerspective < 0) numeroSommet = (nbSommets - numeroSommet) % nbSommets
          segmentATrouver = segment(D.c2d, p.listePoints2d[numeroSommet], '#f15929')
          segmentATrouver.epaisseur = 2
          texte += `${solideDessine.nom} est une pyramide régulière. La distance entre ${A.label}, le centre de la base, et l'un des sommets de la base est de ${r} ${listeUnites[j]} et la hauteur de cette pyramide est de ${h} ${listeUnites[j]}. Calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), [...solideDessine.c2d, segmentATrouver])

          longueurATrouver = D.label + p.listePoints2d[numeroSommet].nom
          objetsEnonce.push(...solideDessine.c2d, segmentATrouver, new CodageAngleDroit3D(D, A, p.listePoints[numeroSommet], 'green', 2))
          segmentAnnexe = segment(A.c2d, p.listePoints2d[numeroSommet], 'green')
          objetsEnonce.push(segmentAnnexe)
          segmentAnnexe = segment(D.c2d, A.c2d, 'green')
          objetsEnonce.push(segmentAnnexe)
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)

          texteCorr += `<br> Le triangle ${longueurATrouver + A.label} est rectangle en ${A.label}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${D.label + A.label}^2+${A.label + p.listePoints2d[numeroSommet].nom}^2$.`

          reponse = arrondi(Math.sqrt(h ** 2 + r ** 2), 1)
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(h)}^2+${texNombre(r)}^2=${texNombre(h ** 2 + r ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(h ** 2 + r ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(texNombre(reponse))}$ ${texteEnCouleurEtGras(listeUnites[j])}`

          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
          break
        case 7: // Dans un cône
          j = randint(0, 6)
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0, true, choisitLettresDifferentes(1, 'OQWX'), 'left')
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          v = vecteur3d(A, B)
          ptsBase = [B]
          nbSommets = 36
          for (let ee = 1; ee < nbSommets; ee++) {
            ptsBase.push(rotation3d(B, droite3d(A, vecteur3d(D, A)), ee * 360 / (nbSommets)))
          }
          p = polygone3d(ptsBase, 'blue')
          solideDessine = cone3dEE(A, D, v, 'blue', true, 'red', assombrirOuEclaircir('gray', 100))
          numeroSommet = randint(1, Math.floor(nbSommets / 2) - 1)
          if (context.anglePerspective < 0) numeroSommet = (nbSommets - numeroSommet) % nbSommets
          segmentATrouver = segment(D.c2d, p.listePoints2d[numeroSommet], '#f15929')
          segmentATrouver.epaisseur = 2
          texte += `Dans ce cône de révolution, le rayon de sa base est de ${r} ${listeUnites[j]} et la hauteur de ce cône est de ${h} ${listeUnites[j]}. Calculer la longueur d'une génératrice de ce cône, arrondie au dixième de ${listeUnites[j]}.<br>`
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), [...solideDessine.c2d, segmentATrouver])

          ptBase = p.listePoints2d[numeroSommet]
          ptBase.nom = choisitLettresDifferentes(1, 'OQWX' + A.label + D.label)
          ptBase.positionLabel = 'below'
          longueurATrouver = D.label + ptBase.nom
          objetsEnonce.push(...solideDessine.c2d, segmentATrouver, new CodageAngleDroit3D(D, A, p.listePoints[numeroSommet], 'green', 2))
          segmentAnnexe = segment(A.c2d, p.listePoints2d[numeroSommet], 'green')
          objetsEnonce.push(segmentAnnexe)
          segmentAnnexe = segment(D.c2d, A.c2d, 'green')
          objetsEnonce.push(segmentAnnexe)
          objetsEnonce.push(labelPoint(ptBase, D.c2d))
          texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)

          texteCorr += `<br> Le triangle ${longueurATrouver + A.label} est rectangle en ${A.label}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${longueurATrouver}^2=${D.label + A.label}^2+${A.label + p.listePoints2d[numeroSommet].nom}^2$.`

          reponse = arrondi(Math.sqrt(h ** 2 + r ** 2), 1)
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(h)}^2+${texNombre(r)}^2=${texNombre(h ** 2 + r ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(h ** 2 + r ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(texNombre(reponse))}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          break
        case 8: // Dans une sphère
          j = randint(0, 6)
          r = randint(4, 10)
          // h = randint(5, 15, [r])
          A = point3d(0, 0, 0, true, choisitLettresDifferentes(1, 'OQWX'), 'left')
          // B = point3d(r, 0, 0)
          // D = point3d(0, 0, r, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          // E = point3d(0, 0, -r, true, choisitLettresDifferentes(1, 'OQWX' + A.label + D.label), 'left')
          // v = vecteur3d(A, B)
          // ptsBase = [B]
          /* objetsEnonce = sphere3dEE(A, r).c2d
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          objetsEnonce = sphere3dEE(A, r, 'blue', 'black', 0, 'gray', 0, 'gray', true, 'red').c2d
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          // context.anglePerspective = 50
          r = randint(4, 10)
          objetsEnonce = sphere3dEE(A, r, 'green', 'red', 36, 'gray', 0, 'gray', false).c2d
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)
          // objetsEnonce = sphere3dEE(A, r, 'green', 'red', 18, 'gray', 0, 'gray', false).c2d
          // texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          */context.anglePerspective = -40
          r = randint(4, 10)
          console.log(context.anglePerspective)
          objetsEnonce = sphere3dEE(A, r, 'blue', 'blue', 0, 'red', 18, 'gray', true).c2d
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)
          /* context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          objetsEnonce = sphere3dEE(A, r, 'blue', 'black', 12, 'gray', 18, 'gray', true, 'green').c2d
          texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce)
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          */break
        case 9: // Dans un prisme droit
          j = randint(0, 6)
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0, true, choisitLettresDifferentes(1, 'OQWX'), 'left')
          if (choice([0]) === 0) {
            B = point3d(r, 0, 0)
          } else if (choice([0, 1]) === 0) {
            B = point3d(0, r, 0)
            D = point3d(h, 0, 0, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          } else {
            B = point3d(0, 0, r)
            D = point3d(0, h, 0, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          }
          v = vecteur3d(A, B)
          D = point3d(0, 0, h, true, choisitLettresDifferentes(1, 'OQWX' + A.label), 'left')
          ptsBase = [B]
          nbSommets = choice([3, 5, 6, 7])
          for (let ee = 1; ee < nbSommets; ee++) {
            ptsBase.push(rotation3d(B, droite3d(A, vecteur3d(D, A)), ee * 360 / (nbSommets) + choice([-10, 10]) * randint(0, 2)))
          }
          C = rotation3d(B, droite3d(A, vecteur3d(D, A)), 70)
          E = rotation3d(B, droite3d(A, vecteur3d(D, A)), 200)
          p = polygone3d(ptsBase, 'blue')
          solideDessine = prisme3dEE(p, vecteur3d(A, D), 'blue', true)

          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), [...solideDessine.c2d])
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
          break
        case 10: // Pleins de cylindres
          j = randint(0, 6)
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          // solideDessine = cylindre3d(A, D,  v, v, 'blue', false, true, true, '#f15929')
          solideDessine = cylindre3d(A, D, v, v, 'blue')
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'green', false)
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'black', false, true)
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'red', false, true, true)
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'blue', false, true, true, '#f15929')
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'blue', false, true, true, '#f15929', true)
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, 0, h)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'blue', false, true, true, '#f15929', true, '#ffb6c1')
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(r, 0, 0)
          D = point3d(0, h, 0)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'red', false, true, true, 'blue', true, '#90ee90')
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          context.anglePerspective = randint(2, 6) * choice([10, -10])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(0, r, 0)
          D = point3d(h, 0, 0)
          v = vecteur3d(A, B)
          solideDessine = cylindre3d(A, D, v, v, 'green', true, true, true, 'red', true, '#add8e6')
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])
          r = randint(4, 10)
          h = randint(5, 15, [r])
          A = point3d(0, 0, 0)
          B = point3d(0, r, 0)
          D = point3d(h, 0, 0)
          v = vecteur3d(A, B)
          B1 = point3d(0, r / 2, 0)
          v1 = vecteur3d(A, B1)
          solideDessine = cylindre3d(A, D, v, v1, 'green', true, true, true, 'red', true, '#add8e6')
          texte += mathalea2d(Object.assign({}, fixeBordures([...solideDessine.c2d]), { scale: context.isHtml ? 0.7 : 0.3, style: 'inline' }), [...solideDessine.c2d])

          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
          break
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte,
          enonceAvant: this.sup === 2,
          options: {
            ordered: false
          }
        }
        this.autoCorrection[i].propositions = []
        if (this.sup === 1) {
          this.autoCorrection[i].propositions.push(
            {
              type: 'AMCNum',
              propositions: [
                {
                  reponse: { // utilisé si type = 'AMCNum'
                    texte: texte,
                    valeur: [reponse], // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                    alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                    param: {
                      digits: nombreDeChiffresDe(reponse), // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                      decimals: 1, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                      signe: false // obligatoire pour AMC (présence d'une case + ou -)
                    }
                  }
                }
              ]
            }
          )
        } else {
          this.autoCorrection[i].propositions.push(
            {
              type: 'AMCOpen',
              propositions: [
                {
                  texte: texteCorr,
                  statut: 4, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  enonce: texte,
                  sanscadre: false, // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                  pointilles: false // EE : ce champ est facultatif et permet (si false) d'enlever les pointillés sur chaque ligne.
                }
              ]
            }
          )
        }
      }

      if (this.questionJamaisPosee(i, nomSolide, r, h)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Exercice AMC', 2, '1 : Question ouverte\n2 : Réponse numérique']
  this.besoinFormulaire4Texte = ['Type de longueur à trouver', 'Nombres séparés par des tirets\n1 : Diagonale d\'une face d\'un cube\n2 : Diagonale d\'un cube\n3 : Diagonale d\'une face d\'un pavé droit\n4 : Diagonale d\'un pavé droit\n5 : Dans un cylindre\n6 : Dans une pyramide\n7 : Dans un cône']
}
