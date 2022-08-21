/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { scratchblock, point, texteParPositionEchelle } from '../../modules/2d.js'
import { allerA, angleScratchTo2d, attendre, baisseCrayon, creerLutin, orienter } from '../../modules/2dLutin.js'
import { noteLaCouleur, plateau2dNLC } from '../../modules/noteLaCouleur.js'
import { choice, combinaisonListes, contraindreValeur, listeQuestionsToContenu, modalPdf, modalUrl, randint, stringNombre, texteGras } from '../../modules/outils.js'
import { clone } from 'mathjs'
export const titre = 'Note la couleur (scratch)'

/**
 * Note_la_couleur() Exercice inspiré de l'activité débranchée de Jean-Yves Labouche Note La Couleur
 * https://www.monclasseurdemaths.fr/profs/algorithmique-scratch/note-la-couleur/
 * Ref : 6I11
 * Publié le 11/04/2021
 * @author Jean-Claude Lhote
 * A faire : ajouter d'autres niveaux avec des instructions conditionnelles, des blocs définis...
 */
/**
 * Fonction exercice.
 */
export default function NoteLaCouleur6e () {
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
  this.sup2 = 1
  this.sup3 = 4
  this.sup4 = false
  this.relatif = false
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true

  this.nouvelleVersion = function (numeroExercice) {
    const damier = [
      ['Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc'],
      ['Blanc', 'Noir', 'Jaune', 'Bleu', 'Vert', 'Orange', 'Rouge', 'Orange', 'Noir', 'Jaune', 'Gris', 'Vert', 'Rose', 'Noir', 'Jaune', 'Blanc'],
      ['Blanc', 'Rouge', 'Bleu', 'Orange', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Bleu', 'Rouge', 'Gris', 'Rouge', 'Blanc'],
      ['Blanc', 'Rose', 'Vert', 'Gris', 'Rouge', 'Noir', 'Bleu', 'Vert', 'Noir', 'Vert', 'Bleu', 'Rose', 'Gris', 'Vert', 'Orange', 'Blanc'],
      ['Blanc', 'Vert', 'Bleu', 'Rose', 'Vert', 'Bleu', 'Orange', 'Gris', 'Rouge', 'Orange', 'Jaune', 'Gris', 'Rouge', 'Rose', 'Bleu', 'Blanc'],
      ['Blanc', 'Noir', 'Orange', 'Rouge', 'Orange', 'Jaune', 'Rouge', 'Blanc', 'Blanc', 'Noir', 'Gris', 'Orange', 'Noir', 'Jaune', 'Rose', 'Blanc'],
      ['Blanc', 'Rose', 'Gris', 'Noir', 'Bleu', 'Vert', 'Bleu', 'Blanc', 'Blanc', 'Rouge', 'Bleu', 'Gris', 'Vert', 'Rouge', 'Noir', 'Blanc'],
      ['Blanc', 'Noir', 'Rouge', 'Rose', 'Vert', 'Orange', 'Rose', 'Noir', 'Orange', 'Vert', 'Jaune', 'Rose', 'Noir', 'Rose', 'Vert', 'Blanc'],
      ['Blanc', 'Orange', 'Gris', 'Rouge', 'Jaune', 'Noir', 'Vert', 'Rouge', 'Rose', 'Noir', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Gris', 'Blanc'],
      ['Blanc', 'Bleu', 'Jaune', 'Orange', 'Vert', 'Gris', 'Jaune', 'Gris', 'Orange', 'Gris', 'Rose', 'Bleu', 'Rouge', 'Bleu', 'Orange', 'Blanc'],
      ['Blanc', 'Rose', 'Bleu', 'Jaune', 'Rose', 'Orange', 'Rouge', 'Bleu', 'Noir', 'Jaune', 'Gris', 'Vert', 'Jaune', 'Noir', 'Rouge', 'Blanc'],
      ['Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc']
    ]
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    const echelleDessin = 0.5
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let j, test
    let objetsEnonce = []; let objetsCorrection = []
    const paramsCorrection = this.relatif
      ? { xmin: -13, ymin: -10, xmax: 13, ymax: 10, pixelsParCm: 20, scale: echelleDessin }
      : { xmin: -1, ymin: -1, xmax: 25, ymax: 19, pixelsParCm: 20, scale: echelleDessin }
    let commandes_disponibles; const sequences_disponibles = []; let sequence; let result; let nb_couleurs; let instruction; let couleurs; let liste_instructions

    let lutin, lutindepart
    let angledepart
    let xdepart
    let ydepart
    context.unitesLutinParCm = 20
    context.pixelsParCm = 20
    let pion
    const typeDeQuestion = Number(this.sup2) === 1 ? combinaisonListes([1], this.nbQuestions) : Number(this.sup2) === 2 ? combinaisonListes([2], this.nbQuestions) : combinaisonListes([1, 2], this.nbQuestions)
    const lePlateau = plateau2dNLC({ type: this.sup, melange: this.sup4, scale: echelleDessin, relatif: this.relatif, nx: 16, ny: 12, pas: 30, plateau: damier })
    for (let q = 0; q < this.nbQuestions;) {
      objetsCorrection = []
      objetsEnonce = []
      objetsEnonce.push(lePlateau)
      objetsCorrection.push(lePlateau)
      let texte = ''
      let texteCorr = ''
      let compteur = 0
      let retour_a_la_case_depart
      let compteur_essais_boucle
      let compteur_essais_sequence
      switch (typeDeQuestion[q]) {
        case 1: {
          commandes_disponibles = [['AV30', 'AV60', 'AV90', 'AV120', 'AV150'], ['TD90', 'TG90', 'TG90', 'TG180']]
          for (let m = 0, ins1; m < 5; m++) {
            for (let n = 0, ins2; n < 4; n++) {
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
            xdepart = -225 + randint(4, 11) * 30 + (this.relatif ? 0 : 240)
            ydepart = -165 + randint(3, 8) * 30 + (this.relatif ? 0 : 180)

            pion = noteLaCouleur({ x: xdepart, y: ydepart, orientation: angledepart, plateau: lePlateau.plateauNLC, relatif: this.relatif })
            lutin.color = context.isHtml ? colorToLatexOrHTML('green') : colorToLatexOrHTML('black')
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
                xdepart = -225 + randint(4, 11) * 30 + (this.relatif ? 0 : 240)
                ydepart = -165 + randint(3, 8) * 30 + (this.relatif ? 0 : 180)
              }
            }
          }

          break
        }
        case 2: { // programmes à boucles
          commandes_disponibles = [['AV30', 'AV60', 'AV90', 'AV120'], ['TD90', 'TG90', 'TD90', 'TG180']]
          for (let m = 0, ins1; m < 3; m++) {
            for (let n = 0, ins2; n < 3; n++) {
              for (let p = 0, ins3; p < 3; p++) {
                for (let q = 0, ins4; q < 3; q++) {
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
            xdepart = -225 + randint(4, 11) * 30 + (this.relatif ? 0 : 240)
            ydepart = -165 + randint(3, 8) * 30 + (this.relatif ? 0 : 180)

            pion = noteLaCouleur({ x: xdepart, y: ydepart, orientation: angledepart, plateau: lePlateau.plateauNLC, relatif: this.relatif })
            pion.codeScratch = ''
            lutin.color = context.isHtml ? colorToLatexOrHTML('green') : colorToLatexOrHTML('black')
            lutin.epaisseur = 2
            lutin.pointilles = 2
            allerA(xdepart, ydepart, lutin)
            orienter(angleScratchTo2d(angledepart), lutin)
            lutindepart = clone(lutin)
            objetsEnonce.push(lutindepart)
            baisseCrayon(lutin)
            compteur++
            if (compteur > 5) break // 5 tentatives infructueuses -> On sort de la boucle.
            compteur_essais_boucle = 0
            pion.codeScratch = '\\begin{scratch}[print,fill,blocks,scale=0.7]\n \\blockinit{quand \\greenflag est cliqué}\n '
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
              xdepart = -225 + randint(4, 11) * 30 + (this.relatif ? 0 : 240)
              ydepart = -165 + randint(3, 8) * 30 + (this.relatif ? 0 : 180)
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
      if (context.isHtml) {
        texte = `Cet exercice est tiré de l'excellente activité débranchée ${modalUrl(numeroExercice, 'https://www.monclasseurdemaths.fr/profs/algorithmique-scratch/note-la-couleur/', 'Note la couleur', 'info circle')} de Jean-Yves Labouche.<br>`
        texte += 'Il a été conçu pour étendre les possibilités de fiches proposées.<br>'
        texte += `N'hésitez pas à vous rendre sur le site ${modalUrl(numeroExercice + 1, 'https://www.monclasseurdemaths.fr', 'Mon classeur de Maths.fr', 'info circle')} de Jean-Yves pour y découvrir la multitude de ressources qu'il propose.<br>`
        texte += `Pour jouer, regarder les règles du jeu${modalPdf(numeroExercice + 2, '../../pdf/reglesnlc.pdf', 'Règles du jeu', 'Règles - PDF', 'file pdf')} .<br>`
      } else { texte = '' }
      texte += 'Exécuter le programme et trouver la succession de couleurs.<br><br>'
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
        for (let i = 1; i < 16; i++) {
          if (this.relatif) {
            if (i < 7 || i > 9) {
              objetsCorrection.push(texteParPositionEchelle(stringNombre(-240 + 30 * i), -12.1 + 1.5 * i, -0.3, 'milieu', 'black', 1.2, 'middle', true, echelleDessin))
            }
          } else {
            if (i !== 1) {
              objetsCorrection.push(texteParPositionEchelle(stringNombre(30 * i), 1.5 * i, -0.3, 'milieu', 'black', 1.2, 'middle', true, echelleDessin))
            }
          }
        }
        for (let i = 1; i < 12; i++) {
          if (this.relatif) {
            if (i < 5 || i > 7) {
              objetsCorrection.push(texteParPositionEchelle(stringNombre(-180 + 30 * i), -0.5, -9 + 1.5 * i, 'milieu', 'black', 1.2, 'middle', true, echelleDessin))
            }
          } else {
            if (i !== 1) {
              objetsCorrection.push(texteParPositionEchelle(stringNombre(30 * i), -0.5, 1.5 * i, 'milieu', 'black', 1.2, 'middle', true, echelleDessin))
            }
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
  this.besoinFormulaire2Numerique = ['Type de programme', 3, '1 : Avancer et tourner\n2 : Boucles\n3 : Mélange']
  this.besoinFormulaire3Numerique = ['Nombre de couleurs (Maximum 6)', 6]
  this.besoinFormulaire4CaseACocher = ['Plateau de jeu original', false]
}
