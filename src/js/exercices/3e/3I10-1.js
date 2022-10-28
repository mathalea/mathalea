import Exercice from '../Exercice.js'
import { choice, combinaisonListes, contraindreValeur, deuxColonnes, lampeMessage, lettreMinusculeDepuisChiffre, listeQuestionsToContenu, randint, texteGras } from '../../modules/outils.js'
import { point, scratchblock } from '../../modules/2d.js'
import { noteLaCouleur, plateau2dNLC } from '../../modules/noteLaCouleur.js'
import { colorToLatexOrHTML, fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { ajouterAx, ajouterAy, allerA, angleScratchTo2d, attendre, baisseCrayon, creerLutin, leveCrayon, orienter } from '../../modules/2dLutin.js'
import { context } from '../../modules/context.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Analyser des scripts Scratch'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'AMCHybride'

export const dateDePublication = '27/09/2022'

/**
 * Analyser un programme scratch utilisant NoteLaCouleur
 * @author Jean-Claude Lhote
 */
export const uuid = '2ecd9'
export const ref = '3I10-1'
export default function ScratchMultiScript () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  function nombreDeNegatifs (arr) {
    const initialValue = 0
    return arr.reduce((previousValue, currentValue) => previousValue + (currentValue < 0 ? 1 : 0), initialValue)
  }
  this.spacing = 2
  this.nbQuestions = 1
  this.titre = titre
  this.typeExercice = 'Scratch'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = '1-2-3'
  this.correctionDetailleeDisponible = true
  this.correctionDetaille = false
  this.listePackages = ['scratch3', 'bclogo']
  this.nouvelleVersion = function () {
    this.introduction = lampeMessage({
      titre: scratchblock(`\\begin{scratch}[${context.issortieNB ? 'print,' : ''}fill,blocks,scale=0.5]\n\\blockmoreblocks{Note la couleur}\\end{scratch}`),
      texte: 'Cette brique donne la couleur de la case sur laquelle est positionné le lutin.',
      couleur: 'nombres'
    })
    const lePlateau = plateau2dNLC(1, false, 0.5, true)
    let listeQuestions = []
    const listeCouleurs = ['Blanc', 'Vert', 'Bleu', 'Rouge', 'Noir', 'Rose', 'Orange', 'Jaune', 'Gris']
    let choixQuestions = []
    this.consigne = 'Donner la série de couleurs affichées par ce' + (this.nbQuestions > 1 ? 's' : '') + ' programme' + (this.nbQuestions > 1 ? 's.' : '.')
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const mesQcm = []
    let indexReponse = 0
    if (!this.sup) { // Si aucune liste n'est saisie
      listeQuestions = [1, 2, 3]
    } else {
      if (Number(this.sup) > 1 && Number(this.sup) < 3) {
        this.sup = contraindreValeur(1, 3, Number(this.sup), 1)
        listeQuestions = new Array(this.nbQuestions).fill(this.sup)
      } else {
        const optionsQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeQuestions[i] = contraindreValeur(1, 3, Number(optionsQuestions[i]), 1)
        }
        if (listeQuestions.length === 0) {
          listeQuestions = [1, 2, 3]
        }
      }
    }
    choixQuestions = combinaisonListes(listeQuestions, this.nbQuestions)
    const noteLesCouleurs = []
    const lutins = []
    const couleurs = []
    context.unitesLutinParCm = 20 // avancer de 10 pour le lutin lui fait parcourir 1cm (en fait 0,5cm car j'ai ajouté un scale=0.5 pour la sortie latex)
    context.pixelsParCm = 20 // 20 pixels d'écran représentent 1cm (enfin ça dépend du zoom, donc c'est juste un réglage par défaut)

    // choixQuestions = shuffle(choixQuestions) // pour mélanger
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsCorrection = []
      couleurs[i] = []
      const x = []
      const y = []
      const touchePressee = lettreMinusculeDepuisChiffre(i + 1)
      const choixBriqueInitiale = [
        ['\\blockinit{quand \\greenflag est cliqué}\n', 'Quand le drapeau vert est cliqué'],
        ['\\blockinit{quand ce sprite est cliqué}\n', 'Quand ce sprite est cliqué'],
        [`\\blockinit{quand la touche \\selectmenu{${touchePressee}} est pressée}\n`, `Quand la touche ${touchePressee} est pressée`],
        ['\\blockinit{quand la touche \\selectmenu{n\'importe laquelle} est pressée}\n', "Quand n'importe quelle touche est pressée"]
      ]

      let texteScratch = `\\begin{scratch}[${context.issortieNB ? 'print,' : ''}fill,blocks,scale=0.8]\n`
      const rotations = ['\\turnright{}', '\\turnleft{}']
      const orientations = [0, 90, 180]
      texteScratch += choixBriqueInitiale[2][0]
      noteLesCouleurs[i] = noteLaCouleur({ x: 0, y: 0, plateau: lePlateau.plateauNLC, relatif: true })
      const pion = noteLesCouleurs[i]
      lutins[i] = creerLutin()
      lutins.color = colorToLatexOrHTML('green') // la couleur de la trace
      lutins.epaisseur = 3 // son epaisseur
      lutins.pointilles = false // le type de pointillés (on peut mettre false pour avoir un trait plein)
      allerA(0, 0, lutins[i]) // ça c'est pour faire bouger le lutin (écrire le programme ne le fait pas exécuter !)
      baisseCrayon(lutins[i]) // à partir de là, le lutin laissera une trace (ses positions successives sont enregistrées dans lutins[i].listeTraces)

      switch (choixQuestions[i]) {
        case 1:
          x[0] = 0
          y[0] = 0
          do {
            for (let j = 1; j <= 3; j++) {
              x[j] = randint(-6, 5, x)
              y[j] = randint(-4, 3, [...y, ...x])
            }
            for (let j = 1; j <= 3; j++) {
              x[j] = x[j] * 30 + 15
              y[j] = y[j] * 30 + 15
            }
          } while (nombreDeNegatifs([...x, ...y]) < 3)
          leveCrayon(lutins[i])
          texteScratch += '\\blockpen{effacer tout}\n'
          texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[0]}} y: \\ovalnum{${y[0]}}}\n`
          texteScratch += "\\blockmove{s'orienter à \\ovalnum{90}}\n"
          orienter(angleScratchTo2d(90), lutins[i])
          texteScratch += '\\blockpen{stylo en position d\'écriture}\n'
          baisseCrayon(lutins[i])
          for (let j = 1; j <= 3; j++) {
            texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[j]}} y: \\ovalnum{${y[j]}}}\n`
            allerA(x[j], y[j], lutins[i])
            pion.currentPos = { x: x[j], y: y[j] }
            texteScratch += '\\blockmoreblocks{Note la couleur}\n'
            couleurs[i].push(pion.nlc())
            attendre(5, lutins[i])
          }
          texteScratch += '\\blockpen{relever le stylo}\n'
          leveCrayon(lutins[i])
          texteScratch += '\\blockstop{stop \\selectmenu{tout}}'

          break

        case 2:
          x.push(randint(-5, 0) * 30 + 15)
          y.push(randint(0, 1) * 30 + 15)
          if (choice([true, false])) {
            x.push(60, 60, 60) // ça marche avec ces valeurs sans sortir du plateau...
            y.push(30, 30, 30) // on peut éventuellement changer à condition de vérifier si ça ne sort pas...
          } else {
            x.push(30, 30, 30) // ça marche avec ces valeurs sans sortir du plateau...
            y.push(60, 60, 60) // on peut éventuellement changer à condition de vérifier si ça ne sort pas...
          }
          leveCrayon(lutins[i])
          texteScratch += '\\blockpen{effacer tout}\n'
          texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[0]}} y: \\ovalnum{${y[0]}}}\n`
          texteScratch += `\\blockmove{s'orienter à \\ovalnum{${i % 3 < 2 ? 90 : 180}}}\n`
          pion.currentPos = { x: x[0], y: y[0] }
          allerA(x[0], y[0], lutins[i])
          pion.currentOrientation = i % 3 < 2 ? 90 : 180
          orienter(angleScratchTo2d(i % 3 < 2 ? 90 : 180), lutins[i])
          texteScratch += '\\blockpen{stylo en position d\'écriture}\n'
          baisseCrayon(lutins[i])
          texteScratch += `\\blockrepeat{répéter \\ovalnum{2} fois}{
\\blockrepeat{répéter \\ovalnum{2} fois}{
\\blockmove{avancer de \\ovalnum{${x[i % 3 + 1]}} pas}
\\blockmove{tourner ${rotations[i % 2]} de \\ovalnum{90} degrés}
\\blockmove{avancer de \\ovalnum{${y[i % 3 + 1]}} pas}
\\blockmove{tourner ${rotations[(i + 1) % 2]} de \\ovalnum{90} degrés}
\\blockmoreblocks{Note la couleur}
}
\\blockmove{tourner ${rotations[(i % 3 === 2 ? 1 : 0)]} de \\ovalnum{90} degrés}
}\n`
          for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
              const test = pion.testInstruction(`AV${x[i % 3 + 1]}`, lutins[i])
              if (test[0]) {
                pion.currentPos.x = test[1]
                pion.currentPos.y = test[2]
                pion.currentOrientation = test[3]
                lutins[i] = test[5]
              } else {
                //   throw Error('Le mouvement n\'est pas valide : sortie de plateau')
              }
              if (rotations[i % 2] === '\\turnright{}') {
                const test = pion.testInstruction('TD90', lutins[i])
                if (test[0]) {
                  pion.currentPos.x = test[1]
                  pion.currentPos.y = test[2]
                  pion.currentOrientation = test[3]
                  lutins[i] = test[5]
                } else {
                  //  throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              } else {
                const test = pion.testInstruction('TG90', lutins[i])
                if (test[0]) {
                  pion.currentPos.x = test[1]
                  pion.currentPos.y = test[2]
                  pion.currentOrientation = test[3]
                  lutins[i] = test[5]
                } else {
                //  throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              }
              const test2 = pion.testInstruction(`AV${y[i % 3 + 1]}`, lutins[i])
              if (test2[0]) {
                pion.currentPos.x = test2[1]
                pion.currentPos.y = test2[2]
                pion.currentOrientation = test2[3]
                lutins[i] = test2[5]
              } else {
              //  throw Error('Le mouvement n\'est pas valide : sortie de plateau')
              }
              if (rotations[(i + 1) % 2] === '\\turnright{}') {
                const test3 = pion.testInstruction('TD90', lutins[i])
                pion.currentPos.x = test3[1]
                pion.currentPos.y = test3[2]
                pion.currentOrientation = test3[3]
                lutins[i] = test3[5]
              } else {
                const test3 = pion.testInstruction('TG90', lutins[i])
                if (test3[0]) {
                  pion.currentPos.x = test3[1]
                  pion.currentPos.y = test3[2]
                  pion.currentOrientation = test3[3]
                  lutins[i] = test3[5]
                } else {
                //  throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              }
              attendre(5, lutins[i])
              couleurs[i].push(pion.nlc())
            }
            let test4
            if (rotations[(i % 3 === 2 ? 1 : 0)] === '\\turnright{}') {
              test4 = pion.testInstruction('TD90', lutins[i])
            } else {
              test4 = pion.testInstruction('TG90', lutins[i])
            }
            pion.currentPos.x = test4[1]
            pion.currentPos.y = test4[2]
            pion.currentOrientation = test4[3]
            lutins[i] = test4[5]
          }
          texteScratch += '\\blockpen{relever le stylo}\n'
          leveCrayon(lutins[i])
          texteScratch += '\\blockstop{stop \\selectmenu{tout}}\n'

          break

        case 3:
          x.push(randint(-4, 2) * 30 + 15)
          y.push(randint(-4, 2) * 30 + 15)
          x.push(-120, 30, 30, 60, 30, 30)
          y.push(30, -120, -30, 30, 60, 60)
          leveCrayon(lutins[i])
          texteScratch += '\\blockpen{effacer tout}\n'
          texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[0]}} y: \\ovalnum{${y[0]}}}\n`
          pion.currentPos = { x: x[0], y: y[0] }
          allerA(x[0], y[0], lutins[i])
          texteScratch += `\\blockmove{s'orienter à \\ovalnum{${orientations[i % 3]}}}\n`
          pion.currentOrientation = orientations[i % 3]
          orienter(angleScratchTo2d(orientations[i % 3]), lutins[i])
          texteScratch += '\\blockpen{stylo en position d\'écriture}\n'
          baisseCrayon(lutins[i])
          texteScratch += `\\blockrepeat{répéter \\ovalnum{4} fois}{
\\blockifelse{si \\booloperator{\\ovalmove{${i % 3 < 1 ? 'abscisse x' : 'ordonnée y'}} > \\ovalnum{${i % 3 < 1 ? 120 : 30}}} alors}
{\\blockmove{ajouter \\ovalnum{${x[i % 3 + 1]}} à x}\n\\blockmove{ajouter \\ovalnum{${y[i % 3 + 1]}} à y}\n}
{\\blockmove{ajouter \\ovalnum{${x[i % 3 + 4]}} à x}\n\\blockmove{ajouter \\ovalnum{${y[i % 3 + 4]}} à y}\n}
\\blockmoreblocks{Note la couleur}\n}\n`
          for (let k = 0; k < 4; k++) {
            if (i % 3 < 1) {
              if (lutins[i].x > (i % 3 < 1 ? 120 : 30) / context.unitesLutinParCm) {
                ajouterAx(x[i % 3 + 1], lutins[i])
                ajouterAy(y[i % 3 + 1], lutins[i])
                if (pion.testCoords(lutins[i].x * context.unitesLutinParCm, lutins[i].y * context.unitesLutinParCm)) {
                  pion.currentPos = { x: lutins[i].x * context.unitesLutinParCm, y: lutins[i].y * context.unitesLutinParCm }
                } else {
                //  throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              } else {
                ajouterAx(x[i % 3 + 4], lutins[i])
                ajouterAy(y[i % 3 + 4], lutins[i])
                if (pion.testCoords(lutins[i].x * context.unitesLutinParCm, lutins[i].y * context.unitesLutinParCm)) {
                  pion.currentPos = { x: lutins[i].x * context.unitesLutinParCm, y: lutins[i].y * context.unitesLutinParCm }
                } else {
                  //     throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              }
            } else {
              if (lutins[i].y > (i % 3 < 1 ? 120 : 30) / context.unitesLutinParCm) {
                ajouterAx(x[i % 3 + 1], lutins[i])
                ajouterAy(y[i % 3 + 1], lutins[i])
                if (pion.testCoords(lutins[i].x * context.unitesLutinParCm, lutins[i].y * context.unitesLutinParCm)) {
                  pion.currentPos = { x: lutins[i].x * context.unitesLutinParCm, y: lutins[i].y * context.unitesLutinParCm }
                } else {
                //  throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              } else {
                ajouterAx(x[i % 3 + 4], lutins[i])
                ajouterAy(y[i % 3 + 4], lutins[i])
                if (pion.testCoords(lutins[i].x * context.unitesLutinParCm, lutins[i].y * context.unitesLutinParCm)) {
                  pion.currentPos = { x: lutins[i].x * context.unitesLutinParCm, y: lutins[i].y * context.unitesLutinParCm }
                } else {
                  //   throw Error('Le mouvement n\'est pas valide : sortie de plateau')
                }
              }
            }
            attendre(5, lutins[i])
            couleurs[i].push(pion.nlc())
          }
          texteScratch += '\\blockpen{relever le stylo}\n'
          leveCrayon(lutins[i])
          texteScratch += '\\blockstop{stop \\selectmenu{tout}}'

          break
      }
      texteScratch += '\\end{scratch}'
      let texte = `${(this.interactif || context.isAmc) ? '' : 'Noter la séquence de couleurs produite.<br>'}`
      texte += deuxColonnes(scratchblock(texteScratch), mathalea2d(Object.assign({}, fixeBordures([lePlateau]), { scale: 0.4, style: 'display: inline' }), lePlateau), 35)

      let texteCorr = 'On obtient la série de couleurs suivante :<br> '
      texteCorr += `${texteGras(couleurs[i][0])} `
      for (let k = 1; k < couleurs[i].length; k++) {
        texteCorr += `- ${texteGras(couleurs[i][k])} `
      }
      texteCorr += '<br>'
      lutins[i].animation = `<radialGradient id="Ball" cx="8" cy="-3" r="20" gradientUnits="userSpaceOnUse">
    <stop offset="0" style="stop-color:#FFFF99"/>
    <stop offset="1" style="stop-color:#FF9400"/>
  </radialGradient> <circle fill="url(#Ball)"  r="12" stroke-width="1"
   x="${lutins[i].listeTraces[0][0] * context.pixelsParCm}"
    y="${-lutins[i].listeTraces[0][1] * context.pixelsParCm}">\n
    <animateMotion path="M ${lutins[i].listeTraces[0][0] * context.pixelsParCm} ${-lutins[i].listeTraces[0][1] * context.pixelsParCm} L`

      for (let k = 0; k < lutins[i].listeTraces.length; k++) {
        const B = point(lutins[i].listeTraces[k][2], lutins[i].listeTraces[k][3])
        lutins[i].animation += ` ${B.xSVG(context.pixelsParCm)} ${B.ySVG(context.pixelsParCm)} `
      }
      lutins[i].animation += '" begin="10s" dur="10s" repeatCount="indefinite" />; </circle>'

      objetsCorrection.push(lePlateau, lutins[i])
      texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsCorrection), { style: 'display: inline', scale: 0.4 }), objetsCorrection)
      if (!context.isAmc) { // on prépare les
        for (let k = 0; k < couleurs[i].length; k++) {
          this.autoCorrection[indexReponse + k] = {}
          this.autoCorrection[indexReponse + k].options = { ordered: true, vertical: false, nbCols: 9 }

          this.autoCorrection[indexReponse + k].propositions = []
          for (let j = 0; j < listeCouleurs.length; j++) {
            this.autoCorrection[indexReponse + k].propositions.push({
              texte: listeCouleurs[j],
              statut: couleurs[i][k] === listeCouleurs[j]
            })
          }
        }
      } else {
        this.autoCorrection[i] = {}
        this.autoCorrection[i].enonce = `${deuxColonnes(scratchblock(texteScratch), mathalea2d(Object.assign({}, fixeBordures([lePlateau]), { scale: 0.4, style: 'display: inline' }), lePlateau), 35)}`
        this.autoCorrection[i].propositions = []
        this.autoCorrection[i].propositions.push(
          {
            type: 'AMCOpen',
            propositions: [{
              enonce: 'Tracé',
              texte: texteCorr,
              statut: 0,
              sanscadre: true
            }]
          })
        for (let k = 0; k < couleurs[i].length; k++) {
          this.autoCorrection[i].propositions.push(
            {
              type: 'qcmMono',
              propositions: [],
              options: { ordered: true }
            })
        }
        for (let k = 0; k < couleurs[i].length; k++) {
          this.autoCorrection[i].propositions[k + 1].propositions = []
          for (let j = 0; j < listeCouleurs.length; j++) {
            this.autoCorrection[i].propositions[k + 1].propositions.push({
              texte: listeCouleurs[j],
              statut: listeCouleurs[j] === couleurs[i][k],
              reponse: j === 0 ? { texte: `couleur N° ${k + 1} : ` } : {}
            })
          }
        }
      }
      if (!context.isAmc && this.interactif) {
        for (let k = 0; k < couleurs[i].length; k++) {
          mesQcm[indexReponse + k] = propositionsQcm(this, indexReponse + k)
          texte += `Couleur N° ${k + 1} ? ` + mesQcm[indexReponse + k].texte
          texteCorr += `Couleur N° ${k + 1} : ` + mesQcm[indexReponse + k].texteCorr
        }
      }
      if (!context.isHtml && i !== this.nbQuestions - 1) {
        texte += '\\columnbreak'
        texteCorr += '\\columnbreak'
      }
      if (this.questionJamaisPosee(i, ...couleurs[i])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (!context.isAmc) {
          indexReponse += couleurs[i].length
        } else {
          indexReponse++
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Compétence évaluée',
    'Nombres séparés par des tirets\n1 : Repérage dans le plan\n2 : Boucles répéter n fois imbriquées\n3 : Conditionnelles'
  ]
}
