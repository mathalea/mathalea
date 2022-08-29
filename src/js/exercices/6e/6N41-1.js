import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, pgcd, texFractionReduite, calcul, texteEnCouleurEtGras } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'

export const titre = 'Parcourir un labyrinthe de fractions égales'

/**
 * @author Jean-Claude Lhote
 * Publié le 11/12/2020
 * Ref : 6N41-1
 * Parcourir un labyrinthe de fractions en passant par des fractions égales.
 */
export const uuid = 'f8a4d'
export const ref = '6N41-1'
export default function ExerciceLabyrintheFractionsEgales () {
  Exercice.call(this)
  this.consigne = ''
  this.niveau = '6e'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup2 = 3
  this.sup = 10
  if (this.niveau === 'CM') {
    this.sup = 10
    this.sup2 = 3
  } else {
    this.sup = 13
    this.sup2 = 4
  }
  const tailleChiffre = 0.7
  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    const mesfractions = []
    let texte, texteCorr, trouve
    const laby = labyrinthe({ taille: tailleChiffre })
    laby.niveau = parseInt(this.sup2) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
    laby.chemin = laby.choisitChemin(laby.niveau) // On choisi un chemin
    laby.murs2d = laby.construitMurs(laby.chemin) // On construit le labyrinthe
    laby.chemin2d = laby.traceChemin(laby.chemin) // On trace le chemin solution
    const monchemin = laby.chemin
    const table = randint(1, 7) + 1
    let num = randint(1, 2 * table - 1)
    while (pgcd(num, table) !== 1) {
      num = randint(2, 2 * table - 1)
    }
    const maximum = parseInt(this.sup)
    //   this.consigne=`Trouve la sortie en ne passant que par les cases contenant un multiple de $${table}$.`
    texte = `${texteEnCouleurEtGras('Trouve la sortie en ne passant que par les cases contenant des fractions égales à ', 'black')}$${texFractionReduite(num, table)}$.<br>`
    texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en marron et la sortie était la numéro $${2 - monchemin[monchemin.length - 1][1] + 1}$.`, 'black')}<br>`
    // Zone de construction du tableau de nombres : Si ils sont sur monchemin et seulement si, ils doivent vérifier la consigne
    let listeMultiples = []; let index = 0

    for (let i = 2; i <= maximum; i++) {
      listeMultiples.push(table * i)
    }
    listeMultiples = combinaisonListes(listeMultiples, 12)
    for (let i = 0; i < 12; i++) {
      mesfractions.push(fraction(calcul(num * listeMultiples[i] / table), listeMultiples[i]))
    }
    for (let i = 0; i < 12; i++) {
      switch (randint(1, 3)) {
        case 1: mesfractions.push(fraction(listeMultiples[i], num * listeMultiples[i] / table))
          break
        case 2: mesfractions.push(fraction(calcul(num * listeMultiples[i] / table), listeMultiples[i] - table))
          break
        case 3: mesfractions.push(fraction(calcul(num * listeMultiples[i] / table), listeMultiples[i] - table))
          break
      }
    }
    for (let a = 1; a < 7; a++) {
      laby.nombres.push([fraction(1, 1), fraction(1, 1), fraction(1, 1)])
    }

    for (let a = 1; a < 7; a++) {
      for (let b = 0; b < 3; b++) {
        trouve = false
        for (let k = 0; k < monchemin.length; k++) {
          if (monchemin[k][0] === a && monchemin[k][1] === b) trouve = true
        }
        if (!trouve) {
          laby.nombres[a - 1][b] = mesfractions[index + 12]
        } else {
          laby.nombres[a - 1][b] = mesfractions[index]
          index++
        }
      }
    } // Le tableau de nombre étant fait, on place les objets nombres.
    laby.nombres2d = laby.placeNombres(laby.nombres, tailleChiffre)
    const params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.7 }
    texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
    texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ["Table "]
  this.besoinFormulaireNumerique = ['Facteur maximum']
  this.besoinFormulaire2Numerique = ['Niveau de rapidité', 6, ' 1 : Guépard\n 2 : Antilope\n 3 : Lièvre\n 4 : Tortue\n 5 : Escargot\n 6 : Au hasard']
} // Fin de l'exercice.
