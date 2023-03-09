import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListesSansChangerOrdre, miseEnEvidence } from '../../modules/outils.js'

import { fraction } from '../../modules/fractions.js'
export const titre = 'Exprimer le rapport de deux longueurs sur un segment'

/**
 * * Exprimer un rapport de longueurs sur un segment
 * * 6N22-1
 * @author Sébastien Lozano
 */

export const uuid = '7781a'
export const ref = '6N22-1'
export default function RapportsSurUnSegment () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  if (this.beta) {
    this.nbQuestions = 2
  } else {
    this.nbQuestions = 2
  };

  this.consigne = 'Sur tous les axes, les graduations sont régulières.'

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.beta) {
      typesDeQuestionsDisponibles = [0, 1]
    } else {
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = [0, 1]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci-dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour le singulier pluriel
      function singPlur (nombre, singulier, pluriel) {
        if (nombre > 1) {
          return pluriel
        } else {
          return singulier
        };
      };

      // Une fonction pour l'étape de simplification si rapport différent de 1
      function etapeSimp (n, m) {
        let sortie
        const rapport = fraction(n, m).n / fraction(n, m).numIrred
        if (rapport !== 1) {
          sortie = `\\dfrac{${fraction(n, m).numIrred} ${miseEnEvidence(`\\times ${fraction(n, m).n / fraction(n, m).numIrred}`)}}{${fraction(n, m).denIrred}${miseEnEvidence(`\\times ${fraction(n, m).n / fraction(n, m).numIrred}`)}}\\mathbf{=}${fraction(n, m).texFractionSimplifiee}`
        } else {
          sortie = `${fraction(n, m).texFractionSimplifiee}`
        }
        return sortie
      }

      function Remarque (rapAlph, rapAlphI, n, m) {
        let sortie
        const rapport = fraction(n, m).n / fraction(n, m).numIrred
        if (rapport !== 1) {
          sortie = `Remarque : Nous verrons plus tard que $${rapAlph}=${etapeSimp(fraction(n, m).n, fraction(n, m).d)}$ et que $${rapAlphI}=${etapeSimp(fraction(m, n).n, fraction(m, n).d)}$<br>`
        } else {
          sortie = ''
        }
        return sortie
      }

      // on choisit deux entiers pour former les fractions
      const entierMax = 9
      const m = randint(1, entierMax)
      const n = randint(1, entierMax, m) // on évite l'autre pour éviter la fraction 1
      const params = {
        xmin: -0.4,
        ymin: -2,
        xmax: 15 * entierMax, // pour éviter un cadrage trop large
        ymax: 1,
        pixelsParCm: 20,
        scale: 1
      }
      // on colle la figure à l'énoncé
      const yEnonce = -1.2

      // on a parfois des figure trop petites ou trop grandes
      //
      const rayon = 5
      // if (m<n) {
      //   rayon = 15
      // } else {
      //   rayon = 15/Math.ceil(m/n)
      // };

      // on choisit de façon aléatoire un triplet de noms pour les points
      const nomsChoix = [['A', 'B', 'C'], ['D', 'E', 'F'], ['I', 'J', 'K'], ['L', 'M', 'N']]
      const noms = nomsChoix[randint(0, nomsChoix.length - 1)]

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // case 0 --> m < n
          m: Math.min(m, n),
          n: Math.max(m, n),
          rapport: `\\dfrac{${noms[0] + noms[1]}}{${noms[0] + noms[2]}}`,
          rapport_inverse: `\\dfrac{${noms[0] + noms[2]}}{${noms[0] + noms[1]}}`,
          fig: mathalea2d(
            params,
            fraction(Math.min(m, n), Math.max(m, n)).representation(0, 0, rayon, 0, 'segment', '', noms[0], noms[1], 1, noms[2])
          ),
          segment_corr1: `\\textcolor{red}{[${noms[0] + noms[2]}]}`,
          longueur_corr1: `\\textcolor{red}{${noms[0] + noms[2]}}`,
          m_color_corr: `\\textcolor{red}{${Math.min(m, n)}}`,
          n_color_corr: `\\textcolor{blue}{${Math.max(m, n)}}`,
          fig_corr1: mathalea2d(
            params,
            fraction(Math.min(m, n), Math.max(m, n)).representation(0, yEnonce, rayon, 0, 'segment', 'red', noms[0], noms[1], 1, noms[2])
          ),
          segment_corr2: `\\textcolor{blue}{[${noms[0] + noms[1]}]}`,
          longueur_corr2: `\\textcolor{blue}{${noms[0] + noms[1]}}`,
          fig_corr2: mathalea2d(
            params,
            fraction(Math.max(m, n), Math.min(m, n)).representation(0, yEnonce, (Math.min(m, n) / Math.max(m, n)) * rayon, 0, 'segment', 'blue', noms[0], noms[2], 1, noms[1])
          )
        },
        { // case 1 --> m > n
          m: Math.max(m, n),
          n: Math.min(m, n),
          rapport: `\\dfrac{${noms[0] + noms[1]}}{${noms[0] + noms[2]}}`,
          rapport_inverse: `\\dfrac{${noms[0] + noms[2]}}{${noms[0] + noms[1]}}`,
          fig: mathalea2d(
            params,
            fraction(Math.max(m, n), Math.min(m, n)).representation(0, 0, 5, 0, 'segment', '', noms[0], noms[1], 1, noms[2])
          ),
          segment_corr1: `\\textcolor{red}{[${noms[0] + noms[2]}]}`,
          longueur_corr1: `\\textcolor{red}{${noms[0] + noms[2]}}`,
          m_color_corr: `\\textcolor{red}{${Math.max(m, n)}}`,
          n_color_corr: `\\textcolor{blue}{${Math.min(m, n)}}`,
          fig_corr1: mathalea2d(
            params,
            fraction(Math.max(m, n), Math.min(m, n)).representation(0, yEnonce, 5, 0, 'segment', 'red', noms[0], noms[1], 1, noms[2])
          ),
          segment_corr2: `\\textcolor{blue}{[${noms[0] + noms[1]}]}`,
          longueur_corr2: `\\textcolor{blue}{${noms[0] + noms[1]}}`,
          fig_corr2: mathalea2d(
            params,
            fraction(Math.min(m, n), Math.max(m, n)).representation(0, yEnonce, (Math.max(m, n) / Math.min(m, n)) * 5, 0, 'segment', 'blue', noms[0], noms[2], 1, noms[1])
          )
        }

      ]

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          Exprimer les rapports suivants $${situations[k].rapport}$ et $${situations[k].rapport_inverse}$.
          <br>
          ${situations[k].fig}     
`,
          question: '',
          correction: `
          Les graduations étant régulières, comptons le nombre d'espaces entre deux graduations pour chaque segment :<br>
          ${situations[k].fig_corr1}<br>
          Le segment $${situations[k].segment_corr1}$ compte $${situations[k].m_color_corr}$ ${singPlur(situations[k].m, 'espace', 'espaces')}.<br>
          ${situations[k].fig_corr2}<br>
          Le segment $${situations[k].segment_corr2}$ compte $${situations[k].n_color_corr}$ ${singPlur(situations[k].n, 'espace', 'espaces')}.<br><br>
          $\\textbf{Donc}$ $\\mathbf{\\dfrac{${situations[k].longueur_corr2}}{${situations[k].longueur_corr1}}=\\dfrac{${situations[k].n_color_corr}}{${situations[k].m_color_corr}}}$
          $\\textbf{et}$ $\\mathbf{\\dfrac{${situations[k].longueur_corr1}}{${situations[k].longueur_corr2}}=\\dfrac{${situations[k].m_color_corr}}{${situations[k].n_color_corr}}}$<br><br>      
          ${Remarque(situations[k].rapport, situations[k].rapport_inverse, situations[k].n, situations[k].m)}
`
        })
      };

      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 3:
          texte = `${enonces[3].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
        case 4:
          texte = `${enonces[4].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[4].correction}`
          };
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
};
