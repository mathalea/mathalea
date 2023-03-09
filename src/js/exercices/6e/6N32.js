import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes } from '../../modules/outils.js'
import { grille, seyes } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Représenter une fraction de l\'unité'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Tracer un segment de longueur une fraction de l'unité.
 * @author Jean-Claude Lhote
 * 6N32
 */

export const uuid = 'c28e5'
export const ref = '6N32'
export default function FractionsDunite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.consigne = 'Colorier en bleu un segment de longueur ...'
  context.isHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 2)
  context.isHtml ? (this.spacing = 2) : (this.spacing = 2)
  this.sup = 1
  this.sup2 = 1
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles, g, carreaux, sc, unit
    let listeTypeDeQuestions = []
    if (this.sup < 5) { typesDeQuestionsDisponibles = [parseInt(this.sup)] } else { typesDeQuestionsDisponibles = [1, 2, 3, 4] }
    listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (
      let i = 0, den, num, frac, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          den = choice([4, 5, 6, 10])
          num = randint(1, den - 1)
          break
        case 2:
          den = choice([2, 3, 4])
          if (den === 3) num = randint(3, 2 * den - 1, den)
          else num = randint(3, 2 * den - 1, den)
          break
        case 3:
          den = choice([4, 5, 6, 10])
          if (den === 4) num = randint(5, 3 * den - 1, den)
          else num = randint(5, 2 * den - 1, den)
          break
        case 4:
          den = choice([2, 3, 4, 5, 6, 10])
          if (den === 2 || den === 4) num = randint(den + 1, 3 * den - 1, den)
          else num = randint(den + 1, 2 * den - 1, den)
          break
      }
      if (den % 3 === 0) unit = 12
      else if (den % 5 === 0) unit = 10
      else unit = 8
      frac = fraction(num, den)
      texte = `$${frac.texFraction}$ unité en prenant ${unit} carreaux (ou ${unit} cm) pour une unité.`
      if (this.sup2 < 3) g = grille(0, 0, 26, 2, 'gray', 0.7)
      else g = ''
      if (parseInt(this.sup2) === 2) {
        sc = 0.6
        carreaux = seyes(0, 0, 26, 2)
      } else {
        sc = 0.5
        carreaux = ''
      }

      texteCorr = mathalea2d({ xmin: 0, ymin: 0, xmax: 26, ymax: 2, pixelsParCm: 20, scale: sc }, frac.representation(1, 1, unit, 0, 'segment', 'blue', 0, 1), g, carreaux)
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: 'ici la (ou les) question(s) est(sont) posée(s)',
          enonceAvant: false, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          enonceAvantUneFois: false, // EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
          propositions: [
            {
              type: 'AMCOpen', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
              propositions: [
                {
                  texte: texteCorr,
                  statut: 2, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  enonce: this.consigne.split('.')[0] + ' ' + texte,
                  pointilles: false,
                  sanscadre: false // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
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
  this.besoinFormulaireNumerique = ["Type d'exercices", 4, '1 : Fraction inférieure à 1\n2 : Demis, tiers et quarts\n3 : Quarts, cinquièmes, sixièmes et dixièmes\n4 : Toutes les fractions précédentes entre 1 et 2']
  this.besoinFormulaire2Numerique = ['Type de cahier', 2, '1 : Cahier à petits carreaux\n2 : Cahier à gros carreaux (Seyes)']
}
