import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListesSansChangerOrdre, texNombre, numAlpha, tableauColonneLigne } from '../../modules/outils.js'
import { point, polygone, mathalea2d } from '../../modules/2d.js'
export const titre = 'Produire une formule à partir d\'un tableau'

/**
 * * Traduire la dépendance entre deux grandeurs par un tableau de valeurs et produire une formule.
 * * 5L10-4
 * @author Sébastien Lozano
 */

export default function TableauxEtFonction () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1
  if (this.debug) {
    this.nbQuestions = 1
  } else {
    this.nbQuestions = 1
  };

  this.titre = titre
  this.consigne = ''

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [0]
    } else {
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = [0]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const L1 = randint(3, 7)
      const L2 = L1 + 1
      const L3 = L2 * 2
      const L4 = L2 * 3
      this.sup = parseInt(this.sup)

      const coteInconnu = choice(['L'])
      let coteInconnuCorr
      let coteInconnuCorrNum
      const coteConnu = randint(3, 7)

      let unites
      let grandL
      let grandLNum
      let petitL
      let petitLNum
      let unitegrandL
      let unitepetitL
      let txtCorr
      if (this.sup === 1) { // même unités
        unites = choice([['cm', 'cm'], ['m', 'm']])
        grandL = [`${L1}`, `${L2}`, `${L3}`, `${L4}`]
        grandLNum = [`${L1}`, `${L2}`, `${L3}`, `${L4}`]
        petitL = [`${coteConnu}`, '', '', '']
        petitLNum = [`${coteConnu}`, '', '', '']
        unitegrandL = unites[0]
        unitepetitL = unites[1]
        coteInconnuCorr = coteInconnu
        coteInconnuCorrNum = '2' + coteInconnu
        txtCorr = 'Les unités sont les mêmes il n\'est donc pas necessaire de convertir.'
      };
      if (this.sup === 2) { // unités différentes
        unites = choice([['cm', 'm'], ['m', 'cm']])
        if (unites[0] === 'cm') {
          grandL = [`${L1}`, `${L2}`, `${L3}`, `${L4}`]
          grandLNum = [`${L1}`, `${L2}`, `${L3}`, `${L4}`]
          petitL = [`${coteConnu}\\times 100`, '', '', '']
          petitLNum = [`${100 * coteConnu}`, '', '', '']
          unitegrandL = unites[0]
          unitepetitL = unites[0]
          coteInconnuCorr = coteInconnu
          coteInconnuCorrNum = '2' + coteInconnu
          txtCorr = 'Les unités sont différentes, pour plus de confort, nous pouvons les convertir dans la même unité, ici en cm.'
        };
        if (unites[0] === 'm') {
          grandL = [`${L1}\\times 100`, `${L2}\\times 100`, `${L3}\\times 100`, `${L4}\\times 100`]
          grandLNum = [`${100 * L1}`, `${100 * L2}`, `${100 * L3}`, `${100 * L4}`]
          petitL = [`${coteConnu}`, '', '', '']
          petitLNum = [`${coteConnu}`, '', '', '']
          unitegrandL = unites[1]
          unitepetitL = unites[1]
          coteInconnuCorr = coteInconnu + '\\times 100'
          coteInconnuCorrNum = '200' + coteInconnu

          txtCorr = 'Les unités sont différentes, pour plus de confort, nous pouvons les convertir dans la même unité, ici en cm.'
        };
      };

      // on prépare la fenetre mathalea2d
      const fenetreMathalea2D = { xmin: -5, ymin: -3, xmax: 5, ymax: 3, pixelsParCm: 20, scale: 0.5 }
      const A = point(-4, 2)
      const B = point(-4, -2)
      const C = point(4, -2)
      const D = point(4, 2)
      const mesAppels = [
        polygone(A, B, C, D)
      ]
      const figure = mathalea2d(
        fenetreMathalea2D,
        mesAppels
      )

      // une fonction pour moduler l'affichage d'une étape dans la correction
      function etapeCorrective (str, sup) {
        let sortie
        if (sup === 1) {
          sortie = ''
        };
        if (sup === 2) {
          sortie = str
        };
        return sortie
      };

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // case 0 -->
          unites: unites,
          coteConnu: coteConnu,
          coteInconnu: coteInconnu,
          tableau: tableauColonneLigne([`\\text{Longueur $${coteInconnu}$ du côté (en ${unites[0]})}`, `\\phantom{000}${L1}\\phantom{000}`, `\\phantom{000}${L2}\\phantom{000}`, `\\phantom{000}${L3}\\phantom{000}`, `\\phantom{000}${L4}\\phantom{000}`], [`\\text{Périmètre du rectangle (en $${unites[1]}$)}`],
            ['', '', '', '']
          ),
          calculL1: `Pour ${L1} ${unites[0]} : $2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L1} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[0])} \\; \\text{${unitegrandL}}}`, this.sup)} \\color{black}{ \\;= ${texNombre(2 * petitLNum[0] + 2 * grandLNum[0])} \\; \\text{${unitegrandL}}}$.`,
          calculL2: `Pour ${L2} ${unites[0]} : $2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L2} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[1])} \\; \\text{${unitegrandL}}}`, this.sup)} \\color{black}{ \\;= ${texNombre(2 * petitLNum[0] + 2 * grandLNum[1])} \\; \\text{${unitegrandL}}}$.`,
          calculL3: `Pour ${L3} ${unites[0]} : $2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L3} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[2])} \\; \\text{${unitegrandL}}}`, this.sup)} \\color{black}{ \\;= ${texNombre(2 * petitLNum[0] + 2 * grandLNum[2])} \\; \\text{${unitegrandL}}}$.`,
          calculL4: `Pour ${L4} ${unites[0]} : $2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[3])} \\; \\text{${unitegrandL}}}`, this.sup)} \\color{black}{ \\;= ${texNombre(2 * petitLNum[0] + 2 * grandLNum[3])} \\; \\text{${unitegrandL}}}$.`,
          tableau_corr: tableauColonneLigne([`\\text{Longueur $${coteInconnuCorr}$ du côté (en ${unitegrandL})}`, `\\phantom{0}${grandL[0]}\\phantom{0}`, `\\phantom{0}${grandL[1]}\\phantom{0}`, `\\phantom{0}${grandL[2]}\\phantom{0}`, `\\phantom{0}${grandL[3]}\\phantom{0}`],
            [`\\text{Périmètre du rectangle (en ${unitepetitL})}`],
            [
`${texNombre(2 * petitLNum[0] + 2 * grandLNum[0])} \\; \\text{${unitegrandL}}`,
`${texNombre(2 * petitLNum[0] + 2 * grandLNum[1])} \\; \\text{${unitegrandL}}`,
`${texNombre(2 * petitLNum[0] + 2 * grandLNum[2])} \\; \\text{${unitegrandL}}`,
`${texNombre(2 * petitLNum[0] + 2 * grandLNum[3])} \\; \\text{${unitegrandL}}`
            ]
          ),
          tableau_corr_p1: tableauColonneLigne([`\\text{Longueur $${coteInconnuCorr}$ du côté (en $${unitegrandL}$)}`, `\\phantom{000}${grandL[0]}\\phantom{000}`, `\\phantom{000}${grandL[1]}\\phantom{000}`], //, `\\phantom{000}${grandL[2]}\\phantom{000}`,`\\phantom{000}${grandL[3]}\\phantom{000}`],
            [`\\text{Périmètre du rectangle (en ${unitepetitL})}`],
            [
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L1} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[0])} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[0])} \\; \\text{${unitegrandL}}}`,
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L2} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[1])} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[1])} \\; \\text{${unitegrandL}}}`,
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L3} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${grandLNum[2]} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[2])} \\; \\text{${unitegrandL}}}`,
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${grandLNum[3]} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[3])} \\; \\text{${unitegrandL}}}`,`2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} \\color{black}{ = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${grandLNum[3]} \\; \\text{${unitegrandL}} = \\color{black}{${texNombre(2*petitLNum[0]+2*grandLNum[3])} \\; \\text{${unitegrandL}}}}`,
            ]
          ),
          tableau_corr_p2: tableauColonneLigne([`\\text{Longueur $${coteInconnuCorr}$ du côté (en $${unitegrandL}$)}`, `\\phantom{000}${grandL[2]}\\phantom{000}`, `\\phantom{000}${grandL[3]}\\phantom{000}`], //, `\\phantom{000}${grandL[2]}\\phantom{000}`,`\\phantom{000}${grandL[3]}\\phantom{000}`],
            [`\\text{Périmètre du rectangle (en $${unitepetitL}$)}`],
            [
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L1} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${grandLNum[0]} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[0])} \\; \\text{${unitegrandL}}}`,
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L2} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${grandLNum[1]} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[1])} \\; \\text{${unitegrandL}}}`,
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L3} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[2])} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[2])} \\; \\text{${unitegrandL}}}`,
              // `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${L4} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${texNombre(grandLNum[3])} \\; \\text{${unitegrandL}}}`,this.sup)} \\color{black}{ \\;= ${texNombre(2*petitLNum[0]+2*grandLNum[3])} \\; \\text{${unitegrandL}}}`,
            ]
          ),
          secondeQ: `2\\times \\color{blue}{${coteConnu} \\; \\text{${unites[1]}}} \\color{black}{+2\\times} \\color{red}{${coteInconnu} \\; \\text{${unites[0]}}} ${etapeCorrective(`\\color{black}{\\; = 2\\times} \\color{blue}{${petitLNum[0]} \\; \\text{${unitepetitL}}} \\color{black}{+2\\times} \\color{red}{${coteInconnuCorr} \\; \\text{${unitegrandL}}}`, this.sup)} \\color{black}{ \\;= ${texNombre(2 * petitLNum[0])} + ${coteInconnuCorrNum} \\; \\text{exprimé en ${unitegrandL}}}`,
          intro: txtCorr,
          fig: figure
        }
      ]

      const enonces = []
      let indexSousQuestion = 0
      let indexSousQuestionCorr = 0

      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
On considère le rectangle ci-dessous dont l'un des côtés mesure $${situations[k].coteConnu}$ $${unites[1]}$ et l'autre mesure $${situations[k].coteInconnu}$ $${unites[0]}$.<br>
${situations[k].fig}<br>
${numAlpha(indexSousQuestion++)} Compléter le tableau suivant :<br><br>
${situations[k].tableau}<br><br>
${numAlpha(indexSousQuestion++)} Quelle formule permet de calculer le périmètre de ce rectangle en fonction de $${situations[k].coteInconnu}$ ?
`,
          question: '',
          correction: `
${numAlpha(indexSousQuestionCorr++)} ${situations[k].intro}<br>
Il y a plusieurs façons de calculer le périmètre d'un rectangle, par exemple : <br> $2\\times largeur + 2\\times Longueur$.<br>
Ici l'un des côtés mesure toujours $\\textcolor{blue}{${petitL[0]}}$ $${unitepetitL}$<br>
Calculons les périmètres pour chacune des valeurs données :<br>
${situations[k].calculL1}<br>
${situations[k].calculL2}<br>
${situations[k].calculL3}<br>
${situations[k].calculL4}<br>
Nous pouvons alors remplir le tableau<br>
${situations[k].tableau_corr}<br><br>
${numAlpha(indexSousQuestionCorr++)} On peut généraliser le raisonnement des calculs du périmètre, et ainsi obtenir une formule.<br>
$${situations[k].secondeQ}$

`
        })
      };

      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Les mêmes unités\n2 : Unités différentes']
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
};
