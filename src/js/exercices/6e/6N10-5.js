import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, miseEnEvidence, texteEnCouleurEtGras, calcul, choice } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { max } from 'mathjs'
export const titre = 'Parcourir un labyrinthe de numération décimale'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDePublication = '9/12/2020'
export const dateDeModifImportante = '05/10/2022' // Le nb de lignes et celui de colonnes du labyrinthe sont paramétrables.
/**
 * @author Jean-Claude Lhote (remaniée par EE pour la prise en compte du nb de lignes et de colonnes du labyrinthe)
 * Publié le 9/12/2020
 * Ref 6N10-5
 * Sortir du labyrinthe en utilisant la numération décimale.
 * Ajout AMC et remaniement du code pour moins d'évidence dans la solution : Janvier 2022 par EE
 */
export const uuid = '80645'
export const ref = '6N10-5'
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
  this.sup2 = 1
  this.sup3 = 1
  this.sup4 = 1
  this.sup = true

  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    const tailleChiffre = 0.7
    let texte, texteCorr
    const nbL = this.sup3 === 1 ? randint(2, 8) : max(2, this.sup3)
    const nbC = this.sup4 === 1 ? randint(3, 11 - nbL) : max(3, this.sup4)
    const laby = labyrinthe({ nbLignes: nbL, nbColonnes: nbC })
    laby.niveau = randint(1, 6) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
    const monchemin = laby.choisitChemin(laby.niveau) // On choisit un chemin

    laby.murs2d = laby.construitMurs(monchemin) // On construit le labyrinthe
    laby.chemin2d = laby.traceChemin(monchemin) // On trace le chemin solution
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

    this.sup2 = parseInt(this.sup2)
    if (this.sup2 === 3) {
      rang = randint(0, rangMax)
      rangbis = randint(0, rangMax, [rang, inversePosition[rang]])
    } else if (this.sup2 === 2) {
      rang = this.sup ? randint(0, 3) : randint(0, 2)
      rangbis = this.sup ? randint(0, 3, [rang]) : randint(0, 2, [rang])
    } else {
      rang = this.sup ? randint(4, rangMax) : randint(3, rangMax)
      rangbis = this.sup ? randint(4, rangMax, [rang]) : randint(3, rangMax, [rang])
    }

    const chiffre = randint(1, 9)
    texte = `Trouver la sortie en ne passant que par les cases contenant un nombre dont le chiffre des ${positions[rang]} est un $${miseEnEvidence(chiffre, 'black')}$.<br>`
    texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en couleur et la sortie était le numéro $${2 - monchemin[monchemin.length - 1][1] + 1}$.`, 'black')}<br>`

    const nombreLaby = []
    const rangs = [inversePosition[rang], inversePosition[rangbis], rangbis]

    const reponsesOK = []
    for (let a = 1; a < nbC * nbL; a++) {
      for (let a = 1; a < nbC * nbL; a++) {
        for (let k = 0; k <= rangMax; k++) {
          nombreLaby[k] = randint(0, 9)
        }
        // nombreLaby[choice(rangs)] = chiffre
        nombreLaby[rang] = chiffre
        nombretemp = 0
        for (let k = 0; k <= rangMax; k++) {
          nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
        }
        reponsesOK.push(nombretemp)
      }
    }
    const reponsesPasOK = []
    for (let a = 1; a < nbC * nbL; a++) {
      for (let a = 1; a < nbC * nbL; a++) {
        for (let k = 0; k <= rangMax; k++) {
          nombreLaby[k] = randint(0, 9)
        }
        nombreLaby[choice(rangs)] = chiffre
        nombreLaby[rang] = randint(0, 9, [chiffre])
        nombretemp = 0
        for (let k = 0; k <= rangMax; k++) {
          nombretemp = this.sup ? calcul(nombretemp + Math.pow(10, k - 4) * nombreLaby[k]) : calcul(nombretemp + Math.pow(10, k - 3) * nombreLaby[k])
        }
        reponsesPasOK.push(nombretemp)
      }
    }
    // Le tableau de nombre étant fait, on place les objets nombres.
    laby.nombres2d = laby.placeNombres(monchemin, reponsesOK, reponsesPasOK, tailleChiffre)
    const params = { xmin: -4, ymin: 0, xmax: 5 + 3 * nbC, ymax: 2 + 3 * nbL, pixelsParCm: 20, scale: 0.7 }
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
  // this.besoinFormulaire2Numerique = ['Niveau de rapidité', 6, ' 1 : Escargot\n 2 : Tortue\n 3 : Lièvre\n 4 : Antilope\n 5 : Guépard\n 6 : Au hasard']
  this.besoinFormulaire2Numerique = ['Quel chiffre recherché ?', 3, ' 1 : Unité ou au-dessus\n 2 : En dessous de l\'unité\n 3 : Peu importe']
  this.besoinFormulaire3Numerique = ['Nombre de lignes du labyrinthe', 8, 'Entre 2 et 8\n1 si vous laissez le hasard décider']
  this.besoinFormulaire4Numerique = ['Nombre de colonnes du labyrinthe', 8, 'Entre 3 et 8\n1 si vous laissez le hasard décider']
} // Fin de l'exercice.
