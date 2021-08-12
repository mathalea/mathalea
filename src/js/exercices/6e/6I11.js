/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, texteGras, modalUrl, modalPdf } from '../../modules/outils.js'
import { attendre, angleScratchTo2d, clone, orienter, mathalea2d, scratchblock, fondEcran, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA, point } from '../../modules/2d.js'
export const titre = 'Note la couleur (scratch)'

/**
 * Note_la_couleur() Exercice inspiré de l'activité débranchée de Jean-Yves Labouche Note La Couleur
 * https://www.monclasseurdemaths.fr/profs/algorithmique-scratch/note-la-couleur/
 * Ref : 6Algo11
 * Publié le 11/04/2021
 * @author Jean-Claude Lhote
 * A faire : ajouter d'autres niveaux avec des boucles, des instructions conditionnelles, des blocs définis...
 * Ajouter un pion et la correction animée.
 */

/**
 * Classe NoteLaCouleur (objet Pion)
 * this.plateau est le tableau des couleurs de cases.
 * this.currentPos est {x,y} les coordonnées courantes du pion
 * this.currentOrientation est l'orientation courante du pion
 * this.codeScratch est le programme en code Latex du pion.
 * this.currentIndex est l'index qui parcourt le codeScratch...
 * this.nlc() retourne la couleur de la case sur laquelle est le pion
 * this.tesCoords(x,y) est une méthode qui dit si le point de coordonnées (x,y) est bien dans le plateau de jeu.
 * this.testInstruction(code) est une méthode qui dit si une instruction est valide (ne sort pas) et retourne un tableau
 * this.testSequence([...code]) est une méthode qui retourne true si la séquence d'instructions est valide.
 */
class NoteLaCouleur {
  constructor (x = 15, y = 15, orientation = 90) {
    this.plateau = [['Noir', 'Jaune', 'Bleu', 'Vert', 'Orange', 'Rouge', 'Orange', 'Noir', 'Jaune', 'Gris', 'Vert', 'Rose', 'Noir', 'Jaune'],
      ['Rouge', 'Bleu', 'Orange', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Bleu', 'Rouge', 'Gris', 'Rouge'],
      ['Rose', 'Vert', 'Gris', 'Rouge', 'Noir', 'Bleu', 'Vert', 'Noir', 'Vert', 'Bleu', 'Rose', 'Gris', 'Vert', 'Orange'],
      ['Vert', 'Bleu', 'Rose', 'Vert', 'Bleu', 'Orange', 'Gris', 'Rouge', 'Orange', 'Jaune', 'Gris', 'Rouge', 'Rose', 'Bleu'],
      ['Noir', 'Orange', 'Rouge', 'Orange', 'Jaune', 'Rouge', 'Blanc', 'Blanc', 'Noir', 'Gris', 'Orange', 'Noir', 'Jaune', 'Rose'],
      ['Rose', 'Gris', 'Noir', 'Bleu', 'Vert', 'Bleu', 'Blanc', 'Blanc', 'Rouge', 'Bleu', 'Gris', 'Vert', 'Rouge', 'Noir'],
      ['Noir', 'Rouge', 'Rose', 'Vert', 'Orange', 'Rose', 'Noir', 'Orange', 'Vert', 'Jaune', 'Rose', 'Noir', 'Rose', 'Vert'],
      ['Orange', 'Gris', 'Rouge', 'Jaune', 'Noir', 'Vert', 'Rouge', 'Rose', 'Noir', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Gris'],
      ['Bleu', 'Jaune', 'Orange', 'Vert', 'Gris', 'Jaune', 'Gris', 'Orange', 'Gris', 'Rose', 'Bleu', 'Rouge', 'Bleu', 'Orange'],
      ['Rose', 'Bleu', 'Jaune', 'Rose', 'Orange', 'Rouge', 'Bleu', 'Noir', 'Jaune', 'Gris', 'Vert', 'Jaune', 'Noir', 'Rouge']]
    this.currentPos = { x: x, y: y }
    this.currentOrientation = orientation
    this.codeScratch = ''
    this.currentIndex = 0
    this.nlc = function () {
      return this.plateau[Math.ceil((135 - this.currentPos.y) / 30)][Math.ceil((195 + this.currentPos.x) / 30)]
    }
    this.testCoords = function (x, y) {
      if ((x < -195) || (x > 195) || (y < -135) || (y > 135)) return false
      return true
    }
    /**
       * méthode pour tester une instruction : retourne un tableau dont le premier élément indique si l'instruction est valide.
       * c'est à dire qu'elle n'entraine pas une sortie de plateau.
       * true -> l'instruction maintient le lutin sur le plateau
       * false -> l'instruction le fait sortir du plateau
       * Les autres éléments du tableau sont dans cet ordre :
       * - les positions x et y du pion après l'instruction
       * - son orientation après l'instruction
       * - le code Latex de l'instruction
       */
    this.testInstruction = function (code, lutin) {
      const avancepion = function (d, x, y, s) {
        switch (s) {
          case 0:
          case 360:
            y += d
            break
          case 90:
          case -270:
            x += d
            break
          case 180:
          case -180:
            y -= d
            break
          case 270:
          case -90:
            x -= d
            break
        }
        return [x, y]
      }
      let x = this.currentPos.x
      let y = this.currentPos.y
      let orientation = this.currentOrientation
      let latex
      switch (code) {
        case 'AV30':
          [x, y] = avancepion(30, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{30} pas}'
          if (lutin !== undefined) {
            avance(30, lutin)
          }
          break
        case 'AV60':
          [x, y] = avancepion(60, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{60} pas}'
          if (lutin !== undefined) {
            avance(60, lutin)
          }
          break
        case 'AV90':
          [x, y] = avancepion(90, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{90} pas}'
          if (lutin !== undefined) {
            avance(90, lutin)
          }
          break
        case 'AV120':
          [x, y] = avancepion(120, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{120} pas}'
          if (lutin !== undefined) {
            avance(120, lutin)
          }
          break

        case 'TD90':
          if (orientation === 180) orientation = -90
          else orientation += 90
          latex = '\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}'
          if (lutin !== undefined) {
            tournerD(90, lutin)
          }
          break
        case 'TG90':
          if (orientation === -90) orientation = 180
          else orientation -= 90
          latex = '\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}'
          if (lutin !== undefined) {
            tournerG(90, lutin)
          }
          break
        case 'TD180':
        case 'TG180':
          if (orientation === 0) orientation = 180
          else if (orientation === -90) orientation = 90
          else if (orientation === 90) orientation = -90
          else orientation = 0
          latex = '\\blockmove{tourner \\turnright{} de \\ovalnum{180} degrés}'
          if (lutin !== undefined) {
            tournerD(180, lutin)
          }
          break
        case 'NLC':
          latex = '\\blocklist{Note la couleur}'
          break
      }
      if (this.testCoords(x, y)) {
        return [true, x, y, orientation, latex, lutin]
      } else return [false, this.currentPos.x, this.currentPos.y, this.currentOrientation, latex, lutin]
    }

    /**
        * méthode pour tester une séquence : retourne
        *
        * [true,x,y,orientation] si la séquence reste dans le jeu
        * [false,x,y,orientation] en cas de sortie de plateau.
        */
    this.testSequence = function (codes) {
      let sorti = false
      let test
      const pionfantome = new NoteLaCouleur()
      pionfantome.currentPos.x = this.currentPos.x
      pionfantome.currentPos.y = this.currentPos.y
      pionfantome.currentOrientation = this.currentOrientation
      for (let i = 0; i < codes.length; i++) {
        test = pionfantome.testInstruction(codes[i])
        if (!test[0]) { // si le lutin est sorti du plateau pendant l'instruction
          sorti = true
          break
        } else {
          pionfantome.currentPos.x = test[1]
          pionfantome.currentPos.y = test[2]
          pionfantome.currentOrientation = test[3]
        }
      }
      // si il est sorti, alors la séquence est false, sinon, elle est true.
      return [!sorti, pionfantome.currentPos.x, pionfantome.currentPos.y, pionfantome.currentOrientation]
    }
    /**
     *
     * @param {number} repetitions
     * @param {string[]} codes la séquence d'instructions à répéter
     * @returns {boolean} true si la boucle n'a à aucun moment fait sortir le lutin du plateau, false sinon
     */
    this.testBoucle = function (repetitions, codes) {
      let sortiboucle = false
      let test
      const pionfantome = new NoteLaCouleur()
      pionfantome.currentPos.x = this.currentPos.x
      pionfantome.currentPos.y = this.currentPos.y
      pionfantome.currentOrientation = this.currentOrientation
      for (let i = 0; i < repetitions; i++) {
        test = pionfantome.testSequence(codes)
        if (!test[0]) { // si le lutin est sorti pendant la séquence alors la boucle n'est pas valide.
          sortiboucle = true
          break
        } else { // il n'est pas sorti, on continue le test à partir de la nouvelle position
          pionfantome.currentPos.x = test[1]
          pionfantome.currentPos.y = test[2]
          pionfantome.currentOrientation = test[3]
        }
      }
      // Si il est sorti, alors on retourne false en premier argument, sinon, on retourne true.
      return [!sortiboucle, pionfantome.currentPos.x, pionfantome.currentPos.y, pionfantome.currentOrientation]
    }
  }
}
/**
 * Fonction exercice.
 */
export default function Note_la_couleur () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.typeExercice = 'Scratch'
  this.listePackages = 'scratch3'
  this.sup = true
  this.sup2 = 1
  this.sup3 = 4

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    let j, test
    let objetsEnonce, objetsCorrection
    const paramsCorrection = { xmin: -22.5, ymin: -17.25, xmax: 22.5, ymax: 17.25, pixelsParCm: 20, scale: 1 }

    let commandes_disponibles; const sequences_disponibles = []; let sequence; let result; let nb_couleurs; let instruction; let couleurs; let liste_instructions

    let lutin, lutindepart
    let angledepart
    let xdepart
    let ydepart
    context.unitesLutinParCm = 20 * 30 / 52
    context.pixelsParCm = 20
    let pion
    if (this.sup) {
      objetsCorrection = [fondEcran('assets/images/nlc_an.png', -450, -345, 900, 690)]
      objetsEnonce = [fondEcran('assets/images/nlc_an.png', -450, -345, 900, 690)]
    } else {
      objetsCorrection = [fondEcran('assets/images/nlc_sn.png', -450, -345, 900, 690)]
      objetsEnonce = [fondEcran('assets/images/nlc_sn.png', -450, -345, 900, 690)]
    }
    let texte = ''
    let texteCorr = ''
    let compteur = 0
    let retour_a_la_case_depart
    let compteur_essais_boucle
    let compteur_essais_sequence
    switch (parseInt(this.sup2)) {
      case 1: {
        commandes_disponibles = [['AV30', 'AV30', 'AV60', 'AV60', 'AV90', 'AV120'], ['TD90', 'TD90', 'TG90', 'TG90', 'TD90', 'TG90', 'TG180']]
        for (let m = 0, ins1; m < 6; m++) {
          for (let n = 0, ins2; n < 7; n++) {
            ins1 = commandes_disponibles[0][m]
            ins2 = commandes_disponibles[1][n]
            sequences_disponibles.push([ins1, ins2, 'NLC'], [ins2, ins1, 'NLC'])
          }
        }
        retour_a_la_case_depart = true
        while (retour_a_la_case_depart) {
          objetsEnonce.length = 1
          lutin = creerLutin()
          angledepart = choice([90, 0, -90, 180])
          xdepart = -195 + randint(4, 9) * 30
          ydepart = -135 + randint(3, 6) * 30
          pion = new NoteLaCouleur(xdepart, ydepart, angledepart)
          lutin.color = 'green'
          lutin.epaisseur = 3
          lutin.pointilles = 2
          allerA(xdepart, ydepart, lutin)
          orienter(angleScratchTo2d(angledepart), lutin)
          lutindepart = clone(lutin)
          baisseCrayon(lutindepart)
          allerA(xdepart, ydepart, lutindepart)
          objetsEnonce.push(lutindepart)
          baisseCrayon(lutin)
          compteur++
          if (compteur > 5) break
          pion.codeScratch = ''
          couleurs = []
          nb_couleurs = parseInt(this.sup3)
          liste_instructions = []
          j = 0
          compteur_essais_sequence = 0
          pion.codeScratch = '\\begin{scratch}[print,fill,blocks]\n \\blockinit{quand \\greenflag est cliqué}\n '
          pion.codeScratch += `\\blockmove{aller à x: \\ovalnum{${xdepart}} y: \\ovalnum{${ydepart}}}\n \\blockmove{s'orienter à \\ovalnum{${angledepart}}}\n`
          pion.currentIndex += pion.codeScratch.length
          while (nb_couleurs > j && compteur_essais_sequence < 10) {
            compteur_essais_sequence = 0
            sequence = choice(sequences_disponibles)
            test = pion.testSequence(sequence)
            while (!test[0] && compteur_essais_sequence < 10) {
              compteur_essais_sequence++
              sequence = choice(sequences_disponibles)
              test = pion.testSequence(sequence)
            }
            if (compteur_essais_sequence < 10) {
              retour_a_la_case_depart = false
              for (let i = 0; i < sequence.length; i++) {
                instruction = sequence[i]
                result = pion.testInstruction(instruction, lutin)
                if (instruction === 'NLC') {
                  liste_instructions.push(instruction)
                  couleurs.push(pion.nlc())
                  j++
                  pion.codeScratch += result[4] + '\n'
                  pion.currentIndex += result[4].length + 1
                  lutin = result[5]
                  attendre(5, lutin)
                } else {
                  liste_instructions.push(instruction)
                  pion.currentPos.x = result[1]
                  pion.currentPos.y = result[2]
                  pion.currentOrientation = result[3]
                  pion.codeScratch += result[4] + '\n'
                  pion.currentIndex += result[4].length + 1
                  lutin = result[5]
                }
              }
            } else {
              angledepart = choice([90, 0, -90, 180])
              xdepart = -195 + randint(4, 9) * 30
              ydepart = -135 + randint(3, 6) * 30
            }
          }
        }

        break
      }
      case 2: { // programmes à boucles
        commandes_disponibles = [['AV30', 'AV60', 'AV90'], ['TD90', 'TG90', 'TD90', 'TG180']]
        for (let m = 0, ins1; m < 3; m++) {
          for (let n = 0, ins2; n < 4; n++) {
            for (let p = 0, ins3; p < 3; p++) {
              for (let q = 0, ins4; q < 4; q++) {
                ins1 = commandes_disponibles[0][m]
                ins2 = commandes_disponibles[1][n]
                ins3 = commandes_disponibles[0][p]
                ins4 = commandes_disponibles[1][q]
                sequences_disponibles.push([ins1, ins2, 'NLC', ins3, ins4], [ins2, ins1, 'NLC', ins3, ins4], [ins1, ins2, 'NLC', ins4, ins3], [ins2, ins1, 'NLC', ins4, ins3],
                  [ins1, ins2, ins3, 'NLC', ins4], [ins2, ins1, ins4, ins3, 'NLC'], [ins1, 'NLC', ins2, ins3, ins4], [ins2, 'NLC', ins1, ins4, ins3])
              }
            }
          }
        }

        retour_a_la_case_depart = true
        couleurs = []
        nb_couleurs = parseInt(this.sup3)
        liste_instructions = []
        const repetitions = nb_couleurs - 1
        while (retour_a_la_case_depart) {
          objetsEnonce.length = 1
          lutin = creerLutin()
          angledepart = choice([90, 0, -90, 180])
          xdepart = -195 + randint(4, 9) * 30
          ydepart = -135 + randint(3, 6) * 30
          pion = new NoteLaCouleur(xdepart, ydepart, angledepart)
          pion.codeScratch = ''
          lutin.color = 'green'
          lutin.epaisseur = 3
          lutin.pointilles = 2
          allerA(xdepart, ydepart, lutin)
          orienter(angleScratchTo2d(angledepart), lutin)
          lutindepart = clone(lutin)
          objetsEnonce.push(lutindepart)
          baisseCrayon(lutin)
          compteur++
          if (compteur > 5) break // 5 tentatives infructueuses -> On sort de la boucle.
          compteur_essais_boucle = 0
          pion.codeScratch = '\\begin{scratch}[print,fill,blocks]\n \\blockinit{quand \\greenflag est cliqué}\n '
          pion.codeScratch += `\\blockmove{aller à x: \\ovalnum{${xdepart}} y: \\ovalnum{${ydepart}}}\n \\blockmove{s'orienter à \\ovalnum{${angledepart}}}\n`
          pion.currentIndex += pion.codeScratch.length
          // On choisit le code à l'intérieur de la boucle
          sequence = choice(sequences_disponibles)
          test = pion.testBoucle(repetitions, sequence)
          while (!test[0] && compteur_essais_boucle < 5) { // On tente 5 boucles à cette position, après on change de position.
            compteur_essais_boucle++
            sequence = choice(sequences_disponibles)
            test = pion.testBoucle(repetitions, sequence)
          }
          if (compteur_essais_boucle < 5) {
            retour_a_la_case_depart = false
            pion.codeScratch += `\\blockrepeat{répéter \\ovalnum{${repetitions}} fois}{\n`
            liste_instructions.push('début de boucle')
            for (let i = 0; i < sequence.length; i++) {
              instruction = sequence[i]
              result = pion.testInstruction(instruction, lutin)
              if (instruction === 'NLC') {
                liste_instructions.push(instruction)
                couleurs.push(pion.nlc())
                pion.codeScratch += result[4] + '\n'
                pion.currentIndex += result[4].length + 1
                lutin = result[5]
                attendre(5, lutin)
              } else {
                liste_instructions.push(instruction)
                pion.currentPos.x = result[1]
                pion.currentPos.y = result[2]
                pion.currentOrientation = result[3]
                pion.codeScratch += result[4] + '\n'
                pion.currentIndex += result[4].length + 1
                lutin = result[5]
              }
            }
            liste_instructions.push('fin de boucle')
            pion.codeScratch += '} \n'
            // on recommence n-1 fois pour faire avancer le pion et le lutin
            for (let j = 1; j < repetitions; j++) {
              for (let i = 0; i < sequence.length; i++) {
                instruction = sequence[i]
                result = pion.testInstruction(instruction, lutin)
                if (instruction === 'NLC') {
                  couleurs.push(pion.nlc())
                  lutin = result[5]
                  attendre(5, lutin)
                } else {
                  pion.currentPos.x = result[1]
                  pion.currentPos.y = result[2]
                  pion.currentOrientation = result[3]
                  lutin = result[5]
                }
              }
            }
            sequence = choice(sequences_disponibles)
            test = pion.testSequence(sequence)
            while (!test[0]) {
              sequence = choice(sequences_disponibles)
              test = pion.testSequence(sequence)
            }
            for (let i = 0; i < sequence.length; i++) {
              instruction = sequence[i]
              result = pion.testInstruction(instruction, lutin)
              if (instruction === 'NLC') {
                liste_instructions.push(instruction)

                couleurs.push(pion.nlc())
                pion.codeScratch += result[4] + '\n'
                pion.currentIndex += result[4].length + 1
                lutin = result[5]
                attendre(5, lutin)
              } else {
                liste_instructions.push(instruction)
                pion.currentPos.x = result[1]
                pion.currentPos.y = result[2]
                pion.currentOrientation = result[3]
                pion.codeScratch += result[4] + '\n'
                pion.currentIndex += result[4].length + 1
                lutin = result[5]
              }
            }
          } else {
            angledepart = choice([90, 0, -90, 180])
            xdepart = -195 + randint(4, 9) * 30
            ydepart = -135 + randint(3, 6) * 30
          }
        }
        break
      }
      case 3:

        break

      case 4:

        break
    }
    //  objetsEnonce.push ();
    // objetsCorrection.push();

    //      paramsEnonce = { xmin:-10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false};
    //    texte += mathalea2d(paramsEnonce, objetsEnonce);
    //  texteCorr += mathalea2d(paramsCorrection, objetsCorrection);
    pion.codeScratch += '\\end{scratch}'
    texte = `Cet exercice est tiré de l'excellente activité débranchée ${modalUrl(numeroExercice, 'https://www.monclasseurdemaths.fr/profs/algorithmique-scratch/note-la-couleur/', 'Note la couleur', 'info circle')} de Jean-Yves Labouche.<br>`
    texte += 'Il a été conçu pour étendre les possibilités de fiches proposées.<br>'
    texte += `N'hésitez pas à vous rendre sur le site ${modalUrl(numeroExercice + 1, 'https://www.monclasseurdemaths.fr', 'Mon classeur de Maths.fr', 'info circle')} de Jean-Yves pour y découvrir la multitude de ressources qu'il propose.<br>`
    texte += `Pour jouer, regarder les règles du jeu${modalPdf(numeroExercice + 2, '../../pdf/reglesnlc.pdf', 'Règles du jeu', 'Règles - PDF', 'file pdf')} .<br>`
    texte += 'Exécuter le programme et trouver la succession de couleur.<br>'
    texte += '<table><tr><td>' +
      scratchblock(pion.codeScratch) +
      '</td><td>' +
      mathalea2d(paramsCorrection, objetsEnonce) +
      '</td></tr></table>'
    texteCorr = 'On obtient la série de couleurs suivante :<br> '
    texteCorr += `${texteGras(couleurs[0])} `
    for (let i = 1; i < couleurs.length; i++) {
      texteCorr += `- ${texteGras(couleurs[i])} `
    }
    lutin.animation = `<radialGradient id="Ball" cx="29.7275" cy="-13.1396" r="38.5299" gradientUnits="userSpaceOnUse">
    <stop offset="0" style="stop-color:#FFFF99"/>
    <stop offset="1" style="stop-color:#FF9400"/>
  </radialGradient> <circle fill="url(#Ball)"  r="22.5" stroke-width="1"
   x="${lutin.listeTraces[0][0] * context.pixelsParCm}"
    y="${-lutin.listeTraces[0][1] * context.pixelsParCm}">\n
    <animateMotion path="M ${lutin.listeTraces[0][0] * context.pixelsParCm} ${-lutin.listeTraces[0][1] * context.pixelsParCm} L`

    for (let i = 0; i < lutin.listeTraces.length; i++) {
      const B = point(lutin.listeTraces[i][2], lutin.listeTraces[i][3])
      lutin.animation += ` ${B.xSVG(context.pixelsParCm)} ${B.ySVG(context.pixelsParCm)} `
    }
    lutin.animation += '" begin="10s" dur="10s" repeatCount="indefinite" />; </circle>'
    texteCorr += '<br><br>' + mathalea2d(paramsCorrection, objetsCorrection, lutin)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireCaseACocher = ['Plateau avec numéros', true]
  this.besoinFormulaire2Numerique = ['Type de programme', 2, '1 : Avancer et tourner\n2 : Boucles']
  this.besoinFormulaire3Numerique = ['Nombre de couleurs (Maximmum 6)', 6]
}
