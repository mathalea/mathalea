import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texNombrec2, miseEnEvidence, texteEnCouleurEtGras } from '../../modules/outils.js'
import { mathalea2d, labyrinthe } from '../../modules/2d.js'
export const titre = 'Labyrinthe de numération décimale'

/**
 * @author Jean-Claude Lhote
 * Publié le 9/12/2020
 * Ref 6N10-5
 * Sortir du labyrinthe en utilisant la numération décimale.
 */
export default function ExerciceLabyrintheNumeration () {
  Exercice.call(this)
  this.consigne = ''
  this.niveau = '6e'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup = 3

  // this.consigne=`Trouve la sortie en ne passant que par les cases contenant un nombre divisible par $${parseInt(this.sup)}$.`

  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []

    let texte, texteCorr, trouve
    const laby = labyrinthe()
    laby.niveau = parseInt(this.sup) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
    laby.chemin = laby.choisitChemin(laby.niveau) // On choisi un chemin
    laby.murs2d = laby.construitMurs(laby.chemin) // On construit le labyrinthe
    laby.chemin2d = laby.traceChemin(laby.chemin) // On trace le chemin solution
    const monchemin = laby.chemin
    const positions = ['unités', 'dixièmes', 'centièmes', 'millièmes', 'dizaines', 'centaines', 'unités de mille', 'dix-millièmes', 'dizaines de mille']
    let hasard
    const listeNombresOK = []; let index = 0; let rangMax
    if (this.niveau === 'CM') {
      rangMax = 5
    } else {
      if (!this.sup) {
        rangMax = 6
      } else {
        rangMax = 8
      }
    }
    const rang = randint(0, rangMax)
    const chiffre = randint(0, 9)
    texte = `${texteEnCouleurEtGras(`Trouve la sortie en ne passant que par les cases contenant un nombre dont le chiffre des ${positions[rang]} est un `, 'black')}$${miseEnEvidence(chiffre, 'black')}$.<br>`
    texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en marron et la sortie était la numéro $${2 - monchemin[monchemin.length - 1][1] + 1}$.`, 'black')}<br>`
    // Zone de construction du tableau de nombres : Si ils sont sur monchemin et seulement si, ils doivent vérifier la consigne
    let Dm, Um, C, D, U, d, c, m, dm, nombretemp
    for (let i = 0; i <= 30; i++) {
      if (rangMax > 7) {
        if (positions[rang] !== 'dizaines de mille') {
          Dm = randint(0, 9, chiffre)
        } else {
          Dm = chiffre
        }
      } else {
        Dm = 0
      }
      if (positions[rang] !== 'unités de mille') {
        if (rangMax > 5) {
          Um = randint(0, 9, chiffre)
        } else {
          Um = chiffre
        }
      } else {
        Um = 0
      }

      if (positions[rang] !== 'centaines') {
        C = randint(0, 9, chiffre)
      } else {
        C = chiffre
      }
      if (positions[rang] !== 'dizaines') {
        D = randint(0, 9, chiffre)
      } else {
        D = chiffre
      }
      if (positions[rang] !== 'unités') {
        U = randint(0, 9, chiffre)
      } else {
        U = chiffre
      }
      if (positions[rang] !== 'dixièmes') {
        d = randint(0, 9, chiffre)
      } else {
        d = chiffre
      }
      if (positions[rang] !== 'centièmes') {
        c = randint(0, 9, chiffre)
      } else {
        c = chiffre
      }
      if (positions[rang] !== 'millièmes') {
        m = randint(0, 9, chiffre)
      } else {
        m = chiffre
      }
      if (rangMax > 6) {
        if (positions[rang] !== 'dix-millièmes') {
          dm = randint(0, 9, chiffre)
        } else {
          dm = chiffre
        }
      } else {
        dm = 0
      }
      if (i > 12) {
        hasard = randint(0, rangMax, rang) // on met le chiffre au hasard à un autre endroit du nombre
        switch (hasard) {
          case 8:
            if (rangMax > 7) { Dm = chiffre } else {
              Dm = 0
              if (rang !== 0) {
                U = chiffre
              } else {
                d = chiffre
              }
            }
            break
          case 6: Um = chiffre
            break
          case 5: C = chiffre
            break
          case 4: D = chiffre
            break
          case 0: U = chiffre
            break
          case 1: d = chiffre
            break
          case 2: c = chiffre
            break
          case 3: m = chiffre
            break
          case 7:
            if (rangMax > 6) { dm = chiffre } else {
              dm = 0
              if (rang !== 1) {
                d = chiffre
              } else {
                c = chiffre
              }
            }
            break
        }
        hasard = randint(0, 9, chiffre)
        switch (rang) { // On met autre chose au rang choisi
          case 8: Dm = hasard
            break
          case 6: Um = hasard
            break
          case 5: C = hasard
            break
          case 4: D = hasard
            break
          case 0: U = hasard
            break
          case 1: d = hasard
            break
          case 2: c = hasard
            break
          case 3: m = hasard
            break
          case 7: dm = hasard
            break
        }
      }
      nombretemp = texNombrec2(`${Dm}*10000+${Um}*1000+${C}*100+${D}*10+${U}+${d}*0.1+${c}*0.01+${m}*0.001+${dm}*0.0001`, 8)
      listeNombresOK.push(nombretemp)
    }
    for (let a = 1; a < 7; a++) {
      laby.nombres.push([0, 0, 0])
    }
    for (let a = 1; a < 7; a++) {
      for (let b = 0; b < 3; b++) {
        trouve = false
        for (let k = 0; k < monchemin.length; k++) {
          if (monchemin[k][0] === a && monchemin[k][1] === b) trouve = true
        }
        if (!trouve) {
          laby.nombres[a - 1][b] = listeNombresOK[index + 13]
        } else {
          laby.nombres[a - 1][b] = listeNombresOK[index]
          index++
        }
      }
    } // Le tableau de nombre étant fait, on place les objets nombres.
    laby.nombres2d = laby.placeNombres(laby.nombres, 0.7)
    const params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.7 }
    texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
    texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireCaseACocher = ["Avec des dizaines de mille et des dix-millièmes"]
  //  this.besoinFormulaire2Numerique = ["Critère de divisibilité supplémentaire ",6,'1 : Aucun\n2 : Par 2\n3 : Par 3\n4 : Par 4\n5 : Par 5\n6 : Par 9'];
  this.besoinFormulaireNumerique = ['Niveau de rapidité', 6, '1 : Escargot\n 2 : Tortue\n 3 : Lièvre\n 4 : Antilope\n 5 : Guépard\n 6 : Au hasard']
} // Fin de l'exercice.
