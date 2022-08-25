import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, miseEnEvidence, texteEnCouleurEtGras, calcul, choice } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const titre = 'Parcourir un labyrinthe de numération décimale'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDePublication = '9/12/2020'
export const dateDeModifImportante = '13/01/2022' // Labyrinthe moins évident + ajout d'un paramètre
/**
 * @author Jean-Claude Lhote
 * Publié le 9/12/2020
 * Ref 6N10-5
 * Sortir du labyrinthe en utilisant la numération décimale.
 * Ajout AMC et remaniement du code pour moins d'évidence dans la solution : Janvier 2022 par EE
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
  this.sup3 = 3
  this.sup2 = 3
  this.sup = true

  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    const tailleChiffre = 0.7
    let texte, texteCorr
    const laby = labyrinthe({ taille: tailleChiffre })
    laby.niveau = parseInt(this.sup2) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
    laby.chemin = laby.choisitChemin(laby.niveau) // On choisit un chemin
    laby.murs2d = laby.construitMurs(laby.chemin) // On construit le labyrinthe
    laby.chemin2d = laby.traceChemin(laby.chemin) // On trace le chemin solution
    const monchemin = laby.chemin
    const positions = this.sup ? ['dix-millièmes', 'millièmes', 'centièmes', 'dixièmes', 'unités', 'dizaines', 'centaines', 'unités de mille', 'dizaines de mille'] : ['millièmes', 'centièmes', 'dixièmes', 'unités', 'dizaines', 'centaines', 'unités de mille']
    let rangMax; let rang; let rangbis; let nombretemp

    if (this.niveau === 'CM') {
      rangMax = 5
    } else {
      if (this.sup) {
        rangMax = 8
      } else {
        rangMax = 6
      }
    }
    const inversePosition = this.sup ? [8, 7, 6, 5, 4, 3, 2, 1, 0] : [6, 5, 4, 3, 2, 1, 0]

    this.sup3 = parseInt(this.sup3)
    if (this.sup3 === 3) {
      rang = randint(0, rangMax)
      rangbis = randint(0, rangMax, [rang, inversePosition[rang]])
    } else if (this.sup3 === 2) {
      rang = this.sup ? randint(0, 3) : randint(0, 2)
      rangbis = this.sup ? randint(0, 3, [rang]) : randint(0, 2, [rang])
    } else {
      rang = this.sup ? randint(4, rangMax) : randint(3, rangMax)
      rangbis = this.sup ? randint(4, rangMax, [rang]) : randint(3, rangMax, [rang])
    }

    const chiffre = randint(0, 9)
    texte = `Trouver la sortie en ne passant que par les cases contenant un nombre dont le chiffre des ${positions[rang]} est un $${miseEnEvidence(chiffre, 'black')}$.<br>`
    texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en marron et la sortie était la numéro $${2 - monchemin[monchemin.length - 1][1] + 1}$.`, 'black')}<br>`

    const nombreLaby = []
    const rangs = [inversePosition[rang], inversePosition[rangbis], rangbis]
    for (let a = 1; a < 7; a++) {
      laby.nombres.push([0, 0, 0])
    }

    // Initialisation de TOUS les nombres du labyrinthe avec présence du chiffre plus ou moins bien placé.
    for (let a = 1; a < 7; a++) {
      for (let b = 0; b < 3; b++) {
        for (let k = 0; k <= rangMax; k++) {
          nombreLaby[k] = randint(0, 9)
        }
        nombreLaby[choice(rangs)] = chiffre
        nombretemp = 0
        for (let k = 0; k <= rangMax; k++) {
          nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
        }
        laby.nombres[a - 1][b] = nombretemp
      }
    }

    // Premier nombre correct du labyrinthe
    for (let k = 0; k <= rangMax; k++) {
      nombreLaby[k] = randint(0, 9)
    }

    nombreLaby[rang] = chiffre
    nombreLaby[inversePosition[rang]] = chiffre // Pour que, par exemple, si le rang est dixième, on met le même chiffre à dizaine.

    nombreLaby[rangbis] = chiffre // Pour brouiller les cartes
    nombreLaby[inversePosition[rangbis]] = chiffre
    nombretemp = 0
    for (let k = 0; k <= rangMax; k++) {
      nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
    }
    laby.nombres[0][monchemin[0][1]] = nombretemp
    // Mauvais voisins du premier nombre
    const voisinsPremier = []
    if (monchemin[0][1] === 0) {
      if (monchemin[1][1] === 0) {
        voisinsPremier.push([0, 1])
      } else {
        voisinsPremier.push([1, 0])
      }
    } else if (monchemin[0][1] === 2) {
      if (monchemin[1][1] === 2) {
        voisinsPremier.push([0, 1])
      } else {
        voisinsPremier.push([2, 0])
      }
    } else {
      voisinsPremier.push([0, 0])
      voisinsPremier.push([1, 1])
      voisinsPremier.push([0, 2])
    }

    for (let i = 0; i < voisinsPremier.length; i++) {
      for (let k = 0; k <= rangMax; k++) {
        nombreLaby[k] = randint(0, 9)
      }
      nombreLaby[inversePosition[rang]] = chiffre
      nombreLaby[choice(rangs)] = chiffre
      nombretemp = 0
      for (let k = 0; k <= rangMax; k++) {
        nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
      }
      laby.nombres[voisinsPremier[i][0]][voisinsPremier[i][1]] = nombretemp
    }

    // Deuxième nombre correct du labyrinthe
    for (let k = 0; k <= rangMax; k++) {
      nombreLaby[k] = randint(0, 9)
    }

    nombreLaby[rang] = chiffre
    nombreLaby[inversePosition[rang]] = chiffre // Pour que, par exemple, si le rang est dixième, on met le même chiffre à dizaine.

    nombretemp = 0
    for (let k = 0; k <= rangMax; k++) {
      nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
    }
    laby.nombres[monchemin[1][0] - 1][monchemin[1][1]] = nombretemp

    // Les autres nombres corrects du labyrinthe
    for (let i = 2; i < monchemin.length; i++) {
      for (let k = 0; k <= rangMax; k++) {
        nombreLaby[k] = randint(0, 9)
      }

      nombreLaby[rang] = chiffre
      nombreLaby[inversePosition[rang]] = chiffre // Pour que, par exemple, si le rang est dixième, on met le même chiffre à dizaine.

      nombretemp = 0
      for (let k = 0; k <= rangMax; k++) {
        nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
      }
      laby.nombres[monchemin[i][0] - 1][monchemin[i][1]] = nombretemp
    }

    for (let a = 1; a < 7; a++) {
      laby.nombres.push([0, 0, 0])
    }
    // Le tableau de nombre étant fait, on place les objets nombres.
    laby.nombres2d = laby.placeNombres(laby.nombres, tailleChiffre)
    const params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.7 }
    texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
    texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
    if (context.isAmc) {
      this.autoCorrection = [
        {
          enonce: texte,
          propositions: [
            {
              statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève

            }
          ]
        }
      ]
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec des dizaines de mille et des dix-millièmes']
  this.besoinFormulaire2Numerique = ['Niveau de rapidité', 6, ' 1 : Escargot\n 2 : Tortue\n 3 : Lièvre\n 4 : Antilope\n 5 : Guépard\n 6 : Au hasard']
  this.besoinFormulaire3Numerique = ['Quel chiffre recherché ?', 6, ' 1 : Unité ou au-dessus\n 2 : En dessous de l\'unité\n 3 : Peu importe']
} // Fin de l'exercice.
