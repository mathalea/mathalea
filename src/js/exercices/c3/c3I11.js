/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, choice, texteGras, modalUrl, modalPdf, contraindreValeur, listeQuestionsToContenu, texNombre } from '../../modules/outils.js'
import { attendre, angleScratchTo2d, clone, orienter, mathalea2d, scratchblock, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA, point, plateau2dNLC, texteParPositionEchelle } from '../../modules/2d.js'
export const titre = 'Note la couleur (scratch)'

/**
 * Note_la_couleur() Exercice inspiré de l'activité débranchée de Jean-Yves Labouche Note La Couleur
 * https://www.monclasseurdemaths.fr/profs/algorithmique-scratch/note-la-couleur/
 * Ref : c3I11 (variante de 6I11 avec des dalles de 20 x 20)
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
  constructor ({
    x = 10, y = 10, orientation = 90, plateau = [], relatif = true
  }) {
    this.plateauNLC = plateau
    this.currentPos = { x: x, y: y }
    this.currentOrientation = orientation
    this.codeScratch = ''
    this.currentIndex = 0
    this.relatif = relatif
    this.nlc = function () {
      return this.plateauNLC[Math.ceil((150 - this.currentPos.y) / 20)][Math.floor(this.currentPos.x / 20)]
    }
    this.testCoords = function (x, y) {
      if (x < 0 || x > 200 || y < 0 || y > 160) return false
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
        case 'AV20':
          [x, y] = avancepion(20, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{20} pas}'
          if (lutin !== undefined) {
            avance(20, lutin)
          }
          break
        case 'AV40':
          [x, y] = avancepion(40, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{40} pas}'
          if (lutin !== undefined) {
            avance(40, lutin)
          }
          break
        case 'AV60':
          [x, y] = avancepion(60, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{60} pas}'
          if (lutin !== undefined) {
            avance(60, lutin)
          }
          break
        case 'AV80':
          [x, y] = avancepion(80, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{80} pas}'
          if (lutin !== undefined) {
            avance(80, lutin)
          }
          break
        case 'AV100':
          [x, y] = avancepion(100, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{100} pas}'
          if (lutin !== undefined) {
            avance(100, lutin)
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
      const pionfantome = new NoteLaCouleur({ x: 10, y: 10, orientation: 0, plateau: this.plateauNLC, relatif: this.relatif })
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
      const pionfantome = new NoteLaCouleur({ x: 10, y: 10, orientation: 0, plateau: this.plateauNLC, relatif: this.relatif })
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
  this.sup = 1
  this.sup2 = true
  this.sup3 = 4
  this.sup4 = false
  this.relatif = false
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true

  this.nouvelleVersion = function (numeroExercice) {
    const plateau = [
      ['Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc'],
      ['Blanc', 'Noir', 'Orange', 'Rouge', 'Orange', 'Jaune', 'Rouge', 'Jaune', 'Rose', 'Blanc'],
      ['Blanc', 'Rose', 'Gris', 'Noir', 'Bleu', 'Vert', 'Bleu', 'Rouge', 'Orange', 'Blanc'],
      ['Blanc', 'Noir', 'Rouge', 'Rose', 'Vert', 'Orange', 'Rose', 'Noir', 'Orange', 'Blanc'],
      ['Blanc', 'Orange', 'Gris', 'Rouge', 'Jaune', 'Noir', 'Vert', 'Rouge', 'Rose', 'Blanc'],
      ['Blanc', 'Bleu', 'Jaune', 'Orange', 'Vert', 'Gris', 'Jaune', 'Gris', 'Orange', 'Blanc'],
      ['Blanc', 'Rose', 'Bleu', 'Jaune', 'Rose', 'Orange', 'Rouge', 'Bleu', 'Noir', 'Blanc'],
      ['Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc']
    ]
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    const echelleDessin = 0.75
    this.listeQuestions = []
    this.listeCorrections = []
    let j, test
    let objetsEnonce = []; let objetsCorrection = []
    const paramsCorrection = { xmin: -1, ymin: -1, xmax: 16, ymax: 13, pixelsParCm: 30, scale: echelleDessin }
    let commandes_disponibles; const sequences_disponibles = []; let sequence; let result; let nb_couleurs; let instruction; let couleurs; let liste_instructions

    let lutin, lutindepart
    let angledepart
    let xdepart
    let ydepart
    context.unitesLutinParCm = 13.33
    context.pixelsParCm = 30
    let pion
    const lePlateau = plateau2dNLC({ type: this.sup, melange: this.sup4, scale: echelleDessin, relatif: this.relatif, nx: 10, ny: 8, pas: 20, plateau: plateau })
    for (let q = 0; q < this.nbQuestions;) {
      objetsCorrection = []
      objetsEnonce = []
      objetsEnonce.push(lePlateau)
      objetsCorrection.push(lePlateau)
      let texte = ''
      let texteCorr = ''
      let compteur = 0
      let retour_a_la_case_depart
      let compteur_essais_sequence
      commandes_disponibles = [['AV20', 'AV40', 'AV60', 'AV80', 'AV100'], ['TD90', 'TG90', 'TG180']]
      for (let m = 0, ins1; m < 5; m++) {
        for (let n = 0, ins2; n < 3; n++) {
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
        xdepart = 10 + randint(1, 8) * 20
        ydepart = 10 + randint(1, 6) * 20

        pion = new NoteLaCouleur({ x: xdepart, y: ydepart, orientation: angledepart, plateau: lePlateau.plateauNLC, relatif: this.relatif })
        lutin.color = context.isHtml ? 'green' : 'black'
        lutin.epaisseur = 2
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
        pion.codeScratch = '\\begin{scratch}[print,fill,blocks,scale=0.7]\n \\blockinit{quand \\greenflag est cliqué}\n '
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
            xdepart = 10 + randint(1, 8) * 20
            ydepart = 10 + randint(1, 6) * 20
          }
        }
      }

      //  objetsEnonce.push ();
      // objetsCorrection.push();

      //      paramsEnonce = { xmin:-10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false};
      //    texte += mathalea2d(paramsEnonce, objetsEnonce);
      //  texteCorr += mathalea2d(paramsCorrection, objetsCorrection);
      pion.codeScratch += '\\end{scratch}'
      if (context.isHtml) {
        texte = `Cet exercice est tiré de l'excellente activité débranchée ${modalUrl(numeroExercice, 'https://www.monclasseurdemaths.fr/profs/algorithmique-scratch/note-la-couleur/', 'Note la couleur', 'info circle')} de Jean-Yves Labouche.<br>`
        texte += 'Il a été conçu pour étendre les possibilités de fiches proposées.<br>'
        texte += `N'hésitez pas à vous rendre sur le site ${modalUrl(numeroExercice + 1, 'https://www.monclasseurdemaths.fr', 'Mon classeur de Maths.fr', 'info circle')} de Jean-Yves pour y découvrir la multitude de ressources qu'il propose.<br>`
        texte += `Pour jouer, regarder les règles du jeu${modalPdf(numeroExercice + 2, '../../pdf/reglesnlc.pdf', 'Règles du jeu', 'Règles - PDF', 'file pdf')} .<br>`
      } else { texte = '' }
      texte += 'Exécuter le programme et trouver la succession de couleur.<br><br>'
      if (context.isHtml) {
        texte += '<table><tr><td>' +
      scratchblock(pion.codeScratch) +
      '</td><td>' + `${this.sup === 4 || this.sup === 2
        ? 'Correspondance chiffre-couleur : <br>0=Blanc ; 1=Noir ; 2=Rouge ; 3=Bleu ; 4=Orange ; 5=Rose ; 6=Jaune ; 7=Vert ; 8=Gris<br>'
        : ''}` +
      mathalea2d(paramsCorrection, objetsEnonce) +
      '</td></tr></table>'
      } else {
        texte += `\\begin{minipage}{.3 \\linewidth} \n\t ${scratchblock(pion.codeScratch)} \n \\end{minipage}
      \\begin{minipage}{.7 \\linewidth} \n\t ${this.sup === 4 || this.sup === 2
        ? 'Correspondance chiffre-couleur : \\\\\n0=Blanc, 1=Noir, 2=Rouge, 3=Bleu, 4=Orange, 5=Rose, 6=Jaune, 7=Vert, 8=Gris\\\\\n'
        : ''} ${mathalea2d(paramsCorrection, objetsEnonce)} \n\\end{minipage}`
        if (q < this.nbQuestions - 1 && !context.isHtml) {
          texte += '\n\\newpage'
        }
      }
      texteCorr = 'On obtient la série de couleurs suivante :<br> '
      texteCorr += `${texteGras(this.sup === 4 || this.sup === 2 ? '(' + lePlateau.traducNum(couleurs[0]) + ')' + couleurs[0] : couleurs[0])} `
      for (let i = 1; i < couleurs.length; i++) {
        texteCorr += `- ${texteGras(this.sup === 4 || this.sup === 2 ? '(' + lePlateau.traducNum(couleurs[i]) + ')' + couleurs[i] : couleurs[i])} `
      }
      lutin.animation = `<radialGradient id="Ball" cx="8" cy="-3" r="20" gradientUnits="userSpaceOnUse">
    <stop offset="0" style="stop-color:#FFFF99"/>
    <stop offset="1" style="stop-color:#FF9400"/>
  </radialGradient> <circle fill="url(#Ball)"  r="12" stroke-width="1"
   x="${lutin.listeTraces[0][0] * context.pixelsParCm}"
    y="${-lutin.listeTraces[0][1] * context.pixelsParCm}">\n
    <animateMotion path="M ${lutin.listeTraces[0][0] * context.pixelsParCm} ${-lutin.listeTraces[0][1] * context.pixelsParCm} L`

      for (let i = 0; i < lutin.listeTraces.length; i++) {
        const B = point(lutin.listeTraces[i][2], lutin.listeTraces[i][3])
        lutin.animation += ` ${B.xSVG(context.pixelsParCm)} ${B.ySVG(context.pixelsParCm)} `
      }
      lutin.animation += '" begin="10s" dur="10s" repeatCount="indefinite" />; </circle>'
      if (this.correctionDetaillee) {
        for (let i = 1; i < 10; i++) {
          if (i !== 1) {
            objetsCorrection.push(texteParPositionEchelle(texNombre(20 * i), 1.5 * i, -0.3, 'milieu', 'black', 1.2, 'middle', true, echelleDessin))
          }
        }
        for (let i = 1; i < 12; i++) {
          if (i !== 1) {
            objetsCorrection.push(texteParPositionEchelle(texNombre(20 * i), -0.5, 1.5 * i, 'milieu', 'black', 1.2, 'middle', true, echelleDessin))
          }
        }
      }
      texteCorr += '<br><br>' + mathalea2d(paramsCorrection, objetsCorrection, lutin)
      if (q < this.nbQuestions - 1 && !context.isHtml) {
        texteCorr += '\n\\newpage'
      }
      if (this.questionJamaisPosee(q, xdepart, ydepart, angledepart)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de plateau', 4, '1 : Plateau couleur sans numéro\n2 : Plateau couleur avec numéros\n3 : Plateau noir et blanc avec nom des couleurs\n4 : Plateau noir et blanc avec numéros']
  this.besoinFormulaire2CaseACocher = ['Graduations', true]
  this.besoinFormulaire3Numerique = ['Nombre de couleurs (Maximmum 6)', 6]
  this.besoinFormulaire4CaseACocher = ['Plateau de jeu original', false]
}
