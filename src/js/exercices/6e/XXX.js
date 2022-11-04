import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, texFraction, rangeMinMax, contraindreValeur, compteOccurences, choisitLettresDifferentes, choice, calcul, arrondi, miseEnEvidence, texteEnCouleurEtGras, sp } from '../../modules/outils.js'
import Grandeur from '../../modules/Grandeur.js'
import { CodageAngleDroit3D, cube3d, pave3d, point3d } from '../../modules/3d.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { segment } from '../../modules/2d.js'

export const titre = 'Déterminer des longueurs'
export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
/**
 * Calcul de volumes.
 * @author Jean-Claude Lhote (AMC par EE) // modifié par Mireille Gain pour y ajouter les décimaux
 * référence 6M30
 */

export const uuid = '04b0d'
export const ref = '6M30'
export default function CalculDeVolumes () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.classe = 6
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup3 = 2
  this.sup4 = 8
  this.nouvelleVersion = function (numeroExercice) {
    // this.consigne = this.interactif ? '' : "Calculer, en détaillant, le volume des solides donnés. Arrondir à l'unité."
    this.interactifType = this.sup3 === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let thissup4Max
    switch (this.classe) {
      case 6 : thissup4Max = 2
        break
      case 5 : thissup4Max = 4
        break
      case 4 : thissup4Max = 6
        break
      case 3 : thissup4Max = 7
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
    let partieDecimale1, partieDecimale2, partieDecimale3
    if (this.sup2) {
      partieDecimale1 = new Decimal(randint(1, 9)).div(10).mul(randint(0, 1))
      partieDecimale2 = new Decimal(randint(1, 9)).div(10).mul(randint(0, 1))
      partieDecimale3 = new Decimal(randint(1, 9)).div(10).mul(randint(0, 1))
    } else {
      partieDecimale1 = new Decimal(0)
      partieDecimale2 = new Decimal(0)
      partieDecimale3 = new Decimal(0)
    }
    for (let i = 0, texte, texteCorr, reponse, objetsEnonce, A, B, C, D, E, BC, DC, segmentATrouver, segmentAnnexe, solideDessine, longueurATrouver, nomSolide, segmentChoisi, choixSegments = [],
      L, l, p, J, K, JK, I, choixProfondeur, h, c, r, j, resultat, resultat2, resultat3, resultat4, volume, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      // listeTypeDeQuestions[i] = choice([1, 3, 2])
      listeTypeDeQuestions[i] = 1
      context.anglePerspective = choice([-30, -60, 30, 60])
      // context.anglePerspective = choice([-30, -40])

      // PRECISER DANS UNE DOC QUE XXX EST UN BON EXERCICE POUR LA DISPOSITION DU PAVE
      switch (listeTypeDeQuestions[i]) {
        case 1: // Diagonale de la face d'un cube

          j = randint(0, 3)
          // Propre à ce cube
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
          texte += `Sachant que le cube ${nomSolide} possède des arêtes de ${c} ${listeUnites[j]}, calculer, arrondie au dixième de ${listeUnites[j]}, la longueur ${longueurATrouver}.<br>`
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
          resultat = 12
          break
        case 2: // Diagonale d'un cube
          j = randint(0, 3)
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
          texte = `Sachant que le cube ${nomSolide} possède des arêtes de ${c} ${listeUnites[j]}, calculer, arrondie au dixième de ${listeUnites[j]}, la longueur ${longueurATrouver}.<br>`
          solideDessine = cube3d(1, 1, 1, c, 'blue', '', '', '', false, true, nomSolide)
          segmentATrouver = segment(solideDessine.sommets[parseInt(segmentChoisi[0][0])].c2d, solideDessine.sommets[parseInt(segmentChoisi[0][1])].c2d, '#f15929')
          segmentATrouver.epaisseur = 2
          segmentATrouver.pointilles = 3
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
          texteCorr += `<br> On ne peut pas continuer si on ne connaît pas valeur de $${A + C}$. Trouvons-la.`
          texteCorr += `<br> ${sp(10)}Le triangle ${C + A + D} est rectangle en ${D}  donc d'après le théorème de Pythagore, on a : `
          texteCorr += `$${A + C}^2=${A + D}^2+${D + C}^2$.`

          DC = texNombre(calcul(Math.sqrt(c ** 2 + c ** 2), 1))
          BC = texNombre(calcul(Math.sqrt(c ** 2 + c ** 2 + c ** 2), 1))
          reponse = arrondi(Math.sqrt(c ** 2 + c ** 2 + c ** 2), 1)
          texteCorr += `<br> ${sp(10)}$${A + C}^2=${texNombre(c)}^2+${texNombre(c)}^2$`
          texteCorr += `<br> ${sp(10)}$${miseEnEvidence(A + C, 'green')}^2=${miseEnEvidence(texNombre(c ** 2 + c ** 2), 'green')}$`
          texteCorr += `<br> ${sp(10)}$${A + C}=\\sqrt{${texNombre(c ** 2 + c ** 2)}}$`
          texteCorr += `<br> ${sp(10)}$${A + C}\\approx${DC}$ ${listeUnites[j]}`
          texteCorr += `<br> Revenons à $${longueurATrouver}^2=${A + B}^2+${A + C}^2$.`
          texteCorr += `<br> $${longueurATrouver}^2=${texNombre(c)}^2+${miseEnEvidence(texNombre(c ** 2 + c ** 2), 'green')}=${texNombre(c ** 2 + c ** 2 + c ** 2)}$`
          texteCorr += `<br> $${longueurATrouver}=\\sqrt{${texNombre(c ** 2 + c ** 2 + c ** 2)}}$`
          texteCorr += `<br> $${longueurATrouver}\\approx${miseEnEvidence(BC)}$ ${texteEnCouleurEtGras(listeUnites[j])}`
          setReponse(this, i, new Grandeur(reponse, listeUnites[j]), { formatInteractif: 'unites' })
          if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')

          resultat = 12
          break
        case 3: // Diagonale de la face d'un pavé droit
          j = randint(0, 3)
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
          texte += `Sachant que le cube ${nomSolide} possède des arêtes de ${c} ${listeUnites[j]}, calculer, arrondie au dixième de ${listeUnites[j]}, la longueur ${longueurATrouver}.<br>`
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
          resultat = 12
          break
        case 21: // pavé droit
          if (this.sup === 1) { // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            l = partieDecimale1.plus(randint(2, 5))
            h = partieDecimale2.plus(randint(3, 6))
            L = partieDecimale3.plus(randint(6, 10))
            volume = l.mul(L).mul(h)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += this.sup2 ? ', arrondi à l\'unité,' : ''
            texte += ` d'un pavé droit de $${texNombre(l, 1)}${listeUnites[j][0]}$ de largeur, de $${texNombre(L, 1)}${listeUnites[j][0]}$ de longueur et de $${texNombre(h)}${listeUnites[j][0]}$ de hauteur.`
            texteCorr = `$\\mathcal{V}= l \\times L \\times h = ${texNombre(l, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${texNombre(L, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${texNombre(h)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texNombre(volume)}${listeUnites[j][1]}`
            if (!volume.eq(volume.round())) {
              texteCorr += `\\approx ${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
            resultat = volume.round()
            resultat2 = l.plus(L).plus(h).mul(6).round()
            if (resultat2.eq(resultat)) resultat2 = resultat2.div(2).round()
            resultat3 = l.mul(2).mul(L).plus(L.mul(h).mul(2)).plus(l.mul(h).mul(2)).round()
            resultat4 = l.plus(L).plus(h).mul(2).round()
          } else {
            // avec conversion
            j = randint(1, 2) // pour le choix de l'unité  centrale
            l = partieDecimale1.plus(randint(2, 5))
            h = partieDecimale2.plus(randint(3, 6)).mul(10)
            L = new Decimal(randint(6, 10)).div(10)
            volume = l.mul(L).mul(h)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += `, arrondi à l'unité, d'un pavé droit de $${texNombre(l, 1)}${listeUnites[j][0]}$ de largeur, de $${texNombre(L, 1)}${listeUnites[j - 1][0]}$ de longueur et de $${texNombre(h)}${listeUnites[j + 1][0]}$ de hauteur.`
            texteCorr = `$\\mathcal{V}= l \\times L \\times h = ${texNombre(l, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${texNombre(L, 1)}${listeUnites[j - 1][0]}\\times${texNombre(h, 0)}${listeUnites[j + 1][0]}=${texNombre(l, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${texNombre(L * 10)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${texNombre(h.div(10), 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texNombre(volume)}${listeUnites[j][1]}`
            if (!volume.eq(volume.round())) {
              texteCorr += `\\approx ${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
            resultat = volume.round()
            resultat2 = l.plus(L).plus(h).mul(6).round()
            resultat3 = l.mul(2).mul(L).plus(L.mul(h).mul(2)).plus(l.mul(h).mul(2)).round()
            resultat4 = l.plus(L).plus(h).mul(2).round()
          }
          break
        case 32: // Cylindre
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            r = new Decimal(randint(2, 10))
            h = new Decimal(randint(2, 15))
            volume = r.pow(2).mul(h).mul(Decimal.acos(-1))
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += `, arrondi à l'unité, d'un cylindre de $${r}${listeUnites[j][0]}$ de rayon et de $${texNombre(h, 0)}${listeUnites[j][0]}$ de hauteur.`
            texteCorr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${texNombre(h, 0)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texNombre(
              r.pow(2).mul(h), 0
            )}\\pi${listeUnites[j][1]}\\approx${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
          } else {
            j = randint(2, 3) // pour le choix de l'unité
            r = new Decimal(randint(2, 10))
            h = new Decimal(randint(20, 150))
            volume = r.pow(2).mul(h).mul(Decimal.acos(-1))
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += `, arrondi à l'unité, d'un cylindre de $${r}${listeUnites[j][0]}$ de rayon et de $${texNombre(h.div(10), 1)}${listeUnites[j - 1][0]}$ de hauteur.`
            texteCorr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${texNombre(r, 0)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${texNombre(h.div(10), 1)}${listeUnites[j - 1][0]}=\\pi\\times${texNombre(r.mul(r), 0)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}^2\\times${texNombre(h, 0)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texNombre(r.pow(2).mul(h), 0)}\\pi${listeUnites[j][1]}\\approx${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
          }
          resultat = volume.round()
          resultat2 = volume.mul(4).round()
          resultat3 = volume.div(2).round()
          resultat4 = volume.mul(2).round()
          break
        case 4: // prisme droit
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            c = partieDecimale3.plus(randint(2, 10))
            h = randint(2, 5)
            l = randint(6, 10)
            volume = c.mul(h * l).div(2)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += this.sup2 ? ', arrondi à l\'unité,' : ''
            texte += ` d'un prisme droit de hauteur $${l}${listeUnites[j][0]}$ et dont les bases sont des triangles de base $${texNombre(c, 1)}${listeUnites[j][0]}$ et de hauteur correspondante $${h}${listeUnites[j][0]}$.`
            texteCorr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${texNombre(c, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${h}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}}{2}\\times${l}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texNombre(volume, 2)}${listeUnites[j][1]}`
            if (!volume.eq(volume.round())) {
              texteCorr += `\\approx ${volume.round()}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
          } else {
            j = randint(1, 2) // pour le choix de l'unité
            c = partieDecimale3.plus(randint(2, 10))
            h = new Decimal(randint(30, 50))
            l = new Decimal(randint(5, 15)).div(10)
            volume = volume = c.mul(h).mul(l).div(2)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += `, arrondi à l'unité, d'un prisme droit de hauteur $${texNombre(l, 1)}${listeUnites[j - 1][0]}$ et dont les bases sont des triangles de base $${texNombre(c, 1)}${listeUnites[j][0]}$ et de hauteur correspondante $${h}${listeUnites[j + 1][0]}$.`
            texteCorr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${texNombre(c, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${h}${listeUnites[j + 1][0]}}{2}\\times${texNombre(l, 1)}${listeUnites[j - 1][0]}=\\dfrac{${texNombre(c, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\times${texNombre(h.div(10), 1)
            }${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}}{2}\\times${texNombre(l.mul(10), 0)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texNombre(volume, 2)}${listeUnites[j][1]}`
            if (!volume.eq(volume.round())) {
              texteCorr += `\\approx ${volume.round()}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
          }
          resultat = volume.round()
          resultat2 = volume.mul(4).round()
          resultat3 = c.plus(h).mul(l).round()
          resultat4 = volume.mul(2).round()
          break
        case 5: // cone
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            r = randint(2, 10)
            h = randint(2, 15)
            volume = new Decimal(r * r * h).mul(Decimal.acos(-1)).div(3)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += ', arrondi à l\'unité, ' // Il faut toujours arrondir à cause de la présence de Pi
            texte += `d'un cône de $${r}${listeUnites[j][0]}$ de rayon et de $${h}${listeUnites[j][0]}$ de hauteur.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${h}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texFraction(
              r * r * h,
              3
            )}\\pi${listeUnites[j][1]}\\approx${texNombre(volume.round())}${listeUnites[j][1]}$`
          } else {
            j = randint(2, 3) // pour le choix de l'unité
            r = randint(2, 10)
            h = randint(20, 150)
            volume = new Decimal(r * r * h).mul(Decimal.acos(-1)).div(3)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += `, arrondi à l'unité, d'un cône de $${r}${listeUnites[j][0]}$ de rayon et de $${texNombre(h / 10, 1)}${listeUnites[j - 1][0]}$ de hauteur.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${texNombre(h / 10, 1)}${listeUnites[j - 1][0]}=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${texNombre(h)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}=${texFraction(r * r * h, 3)}\\pi\\approx${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
          }
          resultat = volume.round()
          resultat2 = volume.mul(4).round()
          resultat3 = volume.div(2).round()
          resultat4 = volume.mul(2).round()
          break
        case 6: // pyramide
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            c = partieDecimale2.plus(randint(2, 10))
            h = randint(2, 5)
            l = randint(6, 10)
            volume = c.mul(c).mul(h).div(3)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += this.sup2 ? ', arrondi à l\'unité,' : ''
            texte += ` d'une pyramide de hauteur $${h}${listeUnites[j][0]}$ et dont la base  est un carré de $${texNombre(c, 1)}${listeUnites[j][0]}$ de côté.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${texNombre(c, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${h}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}`
            if (volume.eq(volume.round())) {
              texteCorr += `=${texNombre(volume, 0)}${listeUnites[j][1]}$`
            } else {
              texteCorr += `\\approx${texNombre(volume.round(0))}${listeUnites[j][1]}$`
            }
          } else {
            j = randint(1, 2) // pour le choix de l'unité
            c = partieDecimale2.plus(randint(2, 10))
            h = randint(30, 50)
            l = new Decimal(randint(5, 15)).div(10)
            volume = c.mul(c).mul(h).div(3)
            texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
            texte += `, arrondi à l'unité, d'une pyramide de hauteur $${texNombre(h / 10, 1)}${listeUnites[j - 1][0]}$ et dont la base  est un carré de $${texNombre(c, 1)}${listeUnites[j][0]}$  de côté.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${texNombre(c, 1)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^2\\times${texNombre(h / 10, 1)}${listeUnites[j - 1][0]}=\\dfrac{1}{3}\\times${texNombre(c.mul(c), 2)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}^2\\times${texNombre(h)}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}`
            if (volume.eq(volume.round())) {
              texteCorr += `=${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
            } else {
              texteCorr += `\\approx${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
            }
          }
          resultat = volume.round()
          resultat2 = volume.mul(3).round()
          resultat3 = volume.mul(3).div(4).round()
          resultat4 = volume.div(2).round()
          break
        case 7: // boule
          j = randint(0, 3) // pour le choix de l'unité
          r = randint(2, 10)
          volume = new Decimal(r).pow(3).mul(4).mul(Decimal.acos(-1)).div(3)
          texte += context.isAmc ? ` en$${listeUnites[j][1]}$` : ''
          texte += `, arrondi à l'unité, d'une boule de $${r}${listeUnites[j][0]}$ de rayon.`
          texteCorr = `$\\mathcal{V}=\\dfrac{4}{3} \\times \\pi \\times R^3=\\dfrac{4}{3}\\times\\pi\\times\\left(${r}${context.isAmc ? listeUnites[j][3] : listeUnites[j][0]}\\right)^3=${texFraction(4 * r * r * r, 3)}\\pi${listeUnites[j][1]}\\approx${texNombre(volume.round(), 0)}${listeUnites[j][1]}$`
          resultat = volume.round()
          resultat2 = volume.mul(3).round()
          resultat3 = volume.mul(3).div(4).round()
          resultat4 = volume.div(2).round()
          break
      }

      if (this.questionJamaisPosee(i, resultat.toString())) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    '1 : Sans conversion\n2 : Avec des conversions'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des décimaux', false]
  this.besoinFormulaire3Numerique = ['Exercice interactif ou AMC', 2, '1 : QCM\n2 : Numérique'] // Texte, tooltip
  this.besoinFormulaire4Texte = ['Type de solides', 'Nombres séparés par des tirets\n1 : Cubes\n2 : Pavés droits\n 3 : Mélange']
}
