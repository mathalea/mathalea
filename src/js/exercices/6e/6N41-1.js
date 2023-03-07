import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, pgcd, texFractionReduite, calcul, texteEnCouleurEtGras } from '../../modules/outils.js'
import { labyrinthe } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
import { context } from '../../modules/context.js'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '05/10/2022' // Le nb de lignes et celui de colonnes du labyrinthe sont paramétrables.

export const titre = 'Parcourir un labyrinthe de fractions égales'

/**
 * @author Jean-Claude Lhote (remaniée par EE pour la prise en compte du nb de lignes et de colonnes du labyrinthe)
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
  // this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup2 = 3
  this.sup = 10
  this.sup3 = 1
  this.sup4 = 1

  if (this.niveau === 'CM') {
    this.sup = 10
    this.sup2 = 3
  } else {
    this.sup = 13
    this.sup2 = 4
  }
  const tailleChiffre = context.isAmc ? 1.1 : 0.7
  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []
    this.autoCorrection = []
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const mesfractions = []
      const nbL = this.sup3 === 1 ? randint(2, 8) : Math.max(2, this.sup3)
      const nbC = this.sup4 === 1 ? randint(3, 11 - nbL) : Math.max(3, this.sup4)
      const laby = labyrinthe({ nbLignes: nbL, nbColonnes: nbC })
      laby.niveau = parseInt(this.sup2) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
      const monchemin = laby.choisitChemin(laby.niveau) // On choisi un chemin
      laby.murs2d = laby.construitMurs(monchemin) // On construit le labyrinthe
      laby.chemin2d = laby.traceChemin(monchemin) // On trace le chemin solution
      const table = randint(1, 7) + 1
      let num = randint(1, 2 * table - 1)
      while (pgcd(num, table) !== 1) {
        num = randint(2, 2 * table - 1)
      }
      const maximum = parseInt(this.sup)
      texte = `Trouver la sortie en ne passant que par les cases contenant des fractions égales à $${texFractionReduite(num, table)}$.`
      texteCorr = `${texteEnCouleurEtGras(`Voici le chemin en couleur et la sortie était le numéro $${nbL - monchemin[monchemin.length - 1][1]}$.`, 'black')}<br>`
      // Zone de construction du tableau de nombres : S'ils sont sur monchemin et seulement si, ils doivent vérifier la consigne
      let listeMultiples = []

      for (let i = 2; i <= maximum; i++) {
        listeMultiples.push(table * i)
      }
      listeMultiples = combinaisonListes(listeMultiples, nbC * nbL)
      for (let i = 0; i < nbC * nbL; i++) {
        mesfractions.push(fraction(calcul(num * listeMultiples[i] / table), listeMultiples[i]))
      }
      for (let i = 0; i < nbC * nbL; i++) {
        switch (randint(1, 3)) {
          case 1: mesfractions.push(fraction(listeMultiples[i], num * listeMultiples[i] / table))
            break
          case 2: mesfractions.push(fraction(calcul(num * listeMultiples[i] / table), listeMultiples[i] - table))
            break
          case 3: mesfractions.push(fraction(calcul(num * listeMultiples[i] / table), listeMultiples[i] - table))
            break
        }
      }

      // Le tableau de nombre étant fait, on place les objets nombres.
      laby.nombres2d = laby.placeNombres(monchemin, mesfractions.slice(0, nbC * nbL - 1), mesfractions.slice(nbC * nbL), tailleChiffre)
      const params = { xmin: -4, ymin: 0, xmax: 5 + 3 * nbC, ymax: 2 + 3 * nbL, pixelsParCm: 20, scale: 0.7 }
      if (context.isAmc) texte += ' Laisser dans le labyrinthe les traces du chemin parcouru.'
      texte += '<br>' + mathalea2d(params, laby.murs2d, laby.nombres2d)
      texteCorr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)
      if (context.isAmc) {
        this.autoCorrection[0] = {
          enonce: 'ici la (ou les) question(s) est(sont) posée(s)',
          enonceAvant: false, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          enonceAvantUneFois: false, // EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
          propositions: [
            {
              type: 'AMCOpen', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
              propositions: [
                {
                  texte: texteCorr,
                  statut: 3, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  enonce: texte,
                  sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                }
              ]
            }
          ]
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Facteur maximum']
  this.besoinFormulaire2Numerique = ['Niveau de rapidité', 6, '1 : Escargot\n2 : Tortue\n3 : Lièvre\n4 : Antilope\n5 : Guépard\n6 : Au hasard']
  this.besoinFormulaire3Numerique = ['Nombre de lignes du labyrinthe', 8, 'Entre 2 et 8\n1 si vous laissez le hasard décider']
  this.besoinFormulaire4Numerique = ['Nombre de colonnes du labyrinthe', 8, 'Entre 3 et 8\n1 si vous laissez le hasard décider']
}
