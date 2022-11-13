import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, rangeMinMax, contraindreValeur, compteOccurences, choisitLettresDifferentes, choice, calcul, arrondi, miseEnEvidence, texteEnCouleurEtGras, sp, nombreDeChiffresDe } from '../../modules/outils.js'
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
 * @author Eric Elter
 */

export default function CalculDeVolumsdsdssdses () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.sup = 1

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
    for (let i = 0, texte, texteCorr, reponse, objetsEnonce, A, B, C, D, E, BC, DC, segmentATrouver, segmentAnnexe, solideDessine, longueurATrouver, nomSolide, segmentChoisi, choixSegments = [],
      L, p, J, K, JK, I, choixProfondeur, h, c, j, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      // listeTypeDeQuestions[i] = choice([1, 3, 2])
      listeTypeDeQuestions[i] = 2
      context.anglePerspective = choice([-30, -60, 30, 60])
      // context.anglePerspective = choice([-30, -40])

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
          texte = `Sachant que le cube ${nomSolide} possède des arêtes de ${c} ${listeUnites[j]}, calculer la longueur ${longueurATrouver}, arrondie au dixième de ${listeUnites[j]}.<br>`
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
          segmentChoisi = choixSegments[randint(0, 5)]
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

      if (this.questionJamaisPosee(i, nomSolide)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Exercice AMC', 2, '1 : Espace Libre\n2 : Numérique']
  this.besoinFormulaire4Texte = ['Type de solides', 'Nombres séparés par des tirets\n1 : Cubes\n2 : Pavés droits\n 3 : Mélange']
}
