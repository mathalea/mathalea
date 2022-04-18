import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, shuffle, combinaisonListesSansChangerOrdre, calcul, texNombre, texteEnCouleurEtGras, tableauColonneLigne, warnMessage } from '../../modules/outils.js'
import FractionX from '../../modules/FractionEtendue.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'Equations résolvantes pour le théorème de Thalès'

export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModificationImportante = '04/04/2022'
/**
 * * Equations résolvantes pour le théorème de Thalès
 * * 3L13-2 enfants : 4P10-2 et 4L15-1
 * * modification le 11/01/2021
 * * correctif le 27/03/2022
 * @author Sébastien Lozano
 */
export default function EqResolvantesThales () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.debug = false
  if (this.debug) {
    this.nbQuestions = 4
  } else {
    this.nbQuestions = 2
  };
  this.sup = 1
  this.consigne = 'Résoudre les équations suivantes.'
  this.tailleDiaporama = 3

  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  this.listePackages = 'bclogo'

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    // une fonction pour dire que c'est trivial dans ce cas
    function trivial (bool, a, b, c, inc) {
      let sortie
      let texte = ''
      if (bool) {
        if (b === c) {
          texte = `Dans ce cas le recours au produit en croix est superflu.<br> Par identification, on a directement $${inc}=${a}$ !`
          sortie = warnMessage(texte, 'nombres', 'Keep Cool Guy !')
        }
        if (c === a) {
          texte = `Dans ce cas le recours au produit en croix est superflu.<br> Par identification, on a directement $${inc}=${b}$ !`
          sortie = warnMessage(texte, 'nombres', 'Keep Cool Guy !')
        }
      } else {
        sortie = ''
      }
      return sortie
    };

    // Un fonction pour afficher la simplification si c'est possible
    // eslint-disable-next-line no-unused-vars
    function simplificationSiPossible (bool, frac, inc) {
      let sortie
      if (!bool) {
        sortie = `
        ${texteEnCouleurEtGras('On simplifie la fraction.')}<br>
        $${inc}=${frac.texFractionSimplifiee}$<br></br>
        `
      } else {
        sortie = ''
      }
      return sortie
    }

    if (this.debug) {
      typesDeQuestionsDisponibles = [0, 1, 2, 3]
    } else {
      typesDeQuestionsDisponibles = shuffle([choice([0, 1]), choice([2, 3])])
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on a besoin d'un coeff pour le type de nombres
      let coeff, masterChoix
      let nbAlea = [1, 1, 1]
      // On génère un c pour s'assurer que le résultat soit décimal.
      // Au min 10, au max 100
      const exposantDeDeux = randint(1, 2)
      const exposantDeCinq = randint(1, 2)
      const cTempCase3 = 2 ** exposantDeDeux * 5 ** exposantDeCinq

      this.sup = Number(this.sup) // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
      switch (this.sup) {
        case 1: // entiers
          coeff = [1, 1, 1]
          nbAlea[0] = randint(2, 9)
          nbAlea[1] = randint(2, 9, nbAlea[0])
          nbAlea[2] = choice([2, 4, 5, 8], [nbAlea[0], nbAlea[1]])
          break
        case 2: // relatifs
          coeff = [choice([1, -1]), choice([1, -1]), choice([1, -1])]
          nbAlea[0] = randint(2, 9)
          nbAlea[1] = randint(2, 9, nbAlea[0])
          nbAlea[2] = choice([2, 4, 5, 8], [nbAlea[0], nbAlea[1]])
          break
        case 3: // décimaux
          coeff = [0.1, 0.1, 0.1]
          nbAlea[0] = randint(2, 9)
          nbAlea[1] = randint(2, 9, nbAlea[0])
          nbAlea[2] = cTempCase3
          break
        case 4: // mélange
          nbAlea[0] = randint(2, 9)
          nbAlea[1] = randint(2, 9, nbAlea[0])
          nbAlea[2] = choice([2, 4, 5, 8], [nbAlea[0], nbAlea[1]])
          masterChoix = choice([
            { c: [1, 1, 1], na: [nbAlea[0], nbAlea[1], nbAlea[2]] },
            { c: [choice([1, -1]), choice([1, -1]), choice([1, -1])], na: [nbAlea[0], nbAlea[1], nbAlea[2]] },
            { c: [0.1, 0.1, 0.1], na: [randint(11, 99), randint(11, 99), cTempCase3] }
          ])
          coeff = masterChoix.c
          nbAlea = masterChoix.na
      };

      let inc
      if (this.exo === '4L15-1') {
        inc = choice(['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
      } else if (this.exo === '4P10-2') {
        inc = ['?']
      } else {
        inc = choice(['x', 'y', 'GO', 'AB', 'z', 'GA', 'BU', 'ZO', 'ME'])
      };

      const params = {
        a: calcul(nbAlea[0] * coeff[0]),
        b: calcul(nbAlea[1] * coeff[1]),
        c: calcul(nbAlea[2] * coeff[2]),
        inc: inc,
        fraction: new FractionX(nbAlea[1] * nbAlea[0], nbAlea[2] / coeff[0] / coeff[1])
      }

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // x/b = a/c
          eq: `\\dfrac{${params.inc}}{${texNombre(params.b)}}=\\dfrac{${texNombre(params.a)}}{${texNombre(params.c)}}`,
          tab: tableauColonneLigne([params.inc, params.a], [params.b], [params.c]),
          a: params.a,
          b: params.b,
          c: params.c,
          inc: params.inc,
          fraction: params.fraction,
          trivial: (params.b === params.c) || (params.c === params.a)
        },
        { // a/c = x/b
          eq: `\\dfrac{${texNombre(params.a)}}{${texNombre(params.c)}}=\\dfrac{${params.inc}}{${texNombre(params.b)}}`,
          tab: tableauColonneLigne([params.a, params.inc], [params.c], [params.b]),
          a: params.a,
          b: params.b,
          c: params.c,
          inc: params.inc,
          fraction: params.fraction,
          trivial: (params.b === params.c) || (params.c === params.a)
        },
        { // b/x = c/a
          eq: `\\dfrac{${texNombre(params.b)}}{${params.inc}}=\\dfrac{${texNombre(params.c)}}{${texNombre(params.a)}}`,
          tab: tableauColonneLigne([params.b, params.c], [params.inc], [params.a]),
          a: params.a,
          b: params.b,
          c: params.c,
          inc: params.inc,
          fraction: params.fraction,
          trivial: (params.b === params.c) || (params.c === params.a)
        },
        { // c/a = b/x
          eq: `\\dfrac{${texNombre(params.c)}}{${texNombre(params.a)}}=\\dfrac{${texNombre(params.b)}}{${params.inc}}`,
          tab: tableauColonneLigne([params.c, params.b], [params.a], [params.inc]),
          a: params.a,
          b: params.b,
          c: params.c,
          inc: params.inc,
          fraction: params.fraction,
          trivial: (params.b === params.c) || (params.c === params.a)
        }
      ]

      let enoncePlus
      let corrPlusPremiereLigne
      let correctionInteractif

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        if (this.exo === '4P10-2') {
          enoncePlus = `${situations[k].tab}`
          corrPlusPremiereLigne = `${situations[k].tab} <br> Le tableau ci-dessus est un tableau de proportionnalité, pour déterminer la quatrième proportionnelle il suffit par exemple de résoudre l'équation suivante : <br>`
        } else {
          enoncePlus = `$${situations[k].eq}$`
          corrPlusPremiereLigne = ''
        };

        enonces.push({
          enonce: enoncePlus,
          question: '',
          correction: `${corrPlusPremiereLigne}
$${situations[k].eq}$<br>
${texteEnCouleurEtGras('Les produits en croix sont égaux.')}<br>
$${texNombre(situations[k].c)}\\times ${situations[k].inc} = ${texNombre(situations[k].a)}\\times ${texNombre(situations[k].b)}$<br>
${texteEnCouleurEtGras(`On divise les deux membres par ${texNombre(situations[k].c)}`)}.<br>
$\\dfrac{${texNombre(situations[k].c)}\\times ${situations[k].inc}}{${texNombre(situations[k].c)}}= \\dfrac{${texNombre(situations[k].a)}\\times ${texNombre(situations[k].b)}}{${texNombre(situations[k].c)}}$<br>
${texteEnCouleurEtGras('On simplifie et on calcule.')}<br>
$${situations[k].inc}=${texNombre(calcul(Number(situations[k].b) * Number(situations[k].a) / Number(situations[k].c)))}$
${trivial(situations[k].trivial, texNombre(situations[k].a), texNombre(situations[k].b), texNombre(situations[k].c), situations[k].inc)}`,
          correctionInteractif: [`${calcul(Number(situations[k].b) * Number(situations[k].a) / Number(situations[k].c))}`]
        })
      };

      // Autant de case que d'elements dans le tableau des situations
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
          correctionInteractif = enonces[0].correctionInteractif[0].replace('{', '').replace('}', '')
          break
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          correctionInteractif = enonces[1].correctionInteractif[0].replace('{', '').replace('}', '')
          break
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          correctionInteractif = enonces[2].correctionInteractif[0].replace('{', '').replace('}', '')
          break
        case 3:
          texte = `${enonces[3].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          correctionInteractif = enonces[3].correctionInteractif[0].replace('{', '').replace('}', '')
          break
      };
      if (this.interactif && !context.isAmc) {
        texte += ajouteChampTexteMathLive(this, i, 'inline largeur25', { texte: `<br> ${inc} = ` })
        setReponse(this, i, new FractionX(correctionInteractif), { formatInteractif: 'fractionEgale' })
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de nombres', 4, '1 : Entiers naturels\n2 : Entiers relatifs\n3 : Décimaux\n4 : Mélange']
}
