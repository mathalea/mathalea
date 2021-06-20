/* eslint-disable camelcase */
/* globals mathalea */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, texteGras, modalUrl, modalPdf } from '../../modules/outils.js'
import { attendre, angleScratchTo2d, clone, orienter, mathalea2d, scratchblock, fond_ecran, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA } from '../../modules/2d.js'
export const titre = 'AlgoTortue'

/**
 * Ref : 
 * Publié le 
 * @author Jean-Claude Lhote
 * 
 */

export default function AlgoTortue () {
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
    texteCorr += '<br><br>' + mathalea2d(paramsCorrection, objetsCorrection, lutin)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireCaseACocher = ['Plateau avec numéros', true]
  this.besoinFormulaire2Numerique = ['Type de programme', 2, '1 : Avancer et tourner\n2 : Boucles']
  this.besoinFormulaire3Numerique = ['Nombre de couleurs (Maximmum 6)', 6]
}
