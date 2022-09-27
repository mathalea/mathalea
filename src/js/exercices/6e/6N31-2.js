import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, shuffle, combinaisonListesSansChangerOrdre, texNombre, miseEnEvidence, tableauColonneLigne } from '../../modules/outils.js'
export const titre = 'Trouver ordre de grandeur d\'opérations sur les décimaux'

/**
 * * Ordre de grandeur d'une opération entre décimaux
 * * 6N31-2
 * @author Sébastien Lozano
 */

export const uuid = '843e5'
export const ref = '6N31-2'
export default function OrdreDeGrandeurOperationsDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  if (this.beta) {
    this.nbQuestions = 1
  } else {
    this.nbQuestions = 1
  };

  this.consigne = 'Pour chaque opération proposée dans la première colonne, cocher la case correspondant à l\'ordre de grandeur du résultat.'

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.beta) {
      typesDeQuestionsDisponibles = [0]
    } else {
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = shuffle([0])
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const ligneEntete = ['\\text{Opération}', '\\phantom{000}' + texNombre('1') + '\\phantom{000}', '\\phantom{00}' + texNombre('10') + '\\phantom{00}', '\\phantom{00}' + texNombre('100') + '\\phantom{00}', '\\phantom{0}' + texNombre('1000') + '\\phantom{0}', texNombre('10000'), texNombre('100000')]
      const ligneEnteteCorr = ['\\text{Opération}', '\\phantom{000}' + texNombre('1') + '\\phantom{000}', '\\phantom{00}' + texNombre('10') + '\\phantom{00}', '\\phantom{00}' + texNombre('100') + '\\phantom{00}', '\\phantom{0}' + texNombre('1000') + '\\phantom{0}', texNombre('10000'), texNombre('100000')]

      const m = randint(1, 9, [4, 5, 6])
      const c1 = randint(1, 9)
      const c2 = randint(1, 9)
      const c3 = randint(1, 9, [4, 5, 6])
      const c4 = randint(1, 4)
      const d = randint(1, 9)
      const d1 = randint(1, 9)
      const d2 = randint(1, 9)
      const d3 = randint(1, 9)
      const u = randint(1, 9)
      const u1 = randint(1, 9)
      const u2 = randint(1, 9)
      const u3 = randint(1, 9)

      let cbis, d1bis
      do {
        cbis = randint(2, 9)
        d1bis = randint(2, 9)
      } while (cbis * d1bis > 3 && cbis * d1bis < 7)

      const divAleatoireOpe3 = choice([10, 100])
      const divAleatoireOpe5 = choice([1, 10, 100, 1000])
      const multAleatoireOpe4 = choice([0.1, 0.01, 0.001])

      // une fonction pour ordre de grandeur en fonction de ... opération 1
      function myOrdreOpe1 (c, d) {
        if (c * d >= 60) {
          return ['', '', '', '', '', miseEnEvidence('X')]
        } else {
          return ['', '', '', '', miseEnEvidence('X'), '']
        };
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 2
      function myOrdreOpe2 (c1, c2) {
        if (c1 + c2 / 10 >= 600) {
          return ['', '', '', miseEnEvidence('X'), '', '']
        } else {
          return ['', '', miseEnEvidence('X'), '', '', '']
        };
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 3
      function myOrdreOpe3 (n) {
        if (n >= 7) {
          return ['', '', '', miseEnEvidence('X'), '', '']
        } else {
          return ['', '', miseEnEvidence('X'), '', '', '']
        };
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 4
      function myOrdreOpe4 (d, n) {
        let sortie
        switch (d) {
          case 0.1:
            if (n >= 7) {
              sortie = ['', '', '', miseEnEvidence('X'), '', '']
            } else {
              sortie = ['', '', miseEnEvidence('X'), '', '', '']
            };
            break
          case 0.01:
            if (n >= 7) {
              sortie = ['', '', miseEnEvidence('X'), '', '', '']
            } else {
              sortie = ['', miseEnEvidence('X'), '', '', '', '']
            };
            break
          case 0.001:
            if (n >= 7) {
              sortie = ['', miseEnEvidence('X'), '', '', '', '']
            } else {
              sortie = [miseEnEvidence('X'), '', '', '', '', '']
            };
            break
        }
        return sortie
      };

      // une fonction pour ordre de grandeur en fonction de ... opération 5
      function myOrdreOpe5 (mult) {
        let sortie
        switch (mult) {
          case 1:
            return ['', '', '', miseEnEvidence('X'), '', '']
          case 10:
            return ['', '', miseEnEvidence('X'), '', '', '']
          case 100:
            return ['', miseEnEvidence('X'), '', '', '', '']
          case 1000:
            return [miseEnEvidence('X'), '', '', '', '', '']
        };
        return sortie
      };

      let situations = [
        {
          operation: `${cbis * 100 + d * 10 + u * 1}\\times ${d1bis * 10 + u1 * 1}`,
          operation_corr: `${cbis * 100 + d * 10 + u * 1}\\times ${d1bis * 10 + u1 * 1} \\simeq  ${(cbis * 100)}\\times ${(d1bis * 10)} \\text{ soit } ${texNombre((cbis * 100) * (d1bis * 10))}`,
          operation_coche: myOrdreOpe1(cbis, d1bis)
        },
        {
          operation: `${texNombre((c2 * 100 + d2 * 10 + u1 * 1) / 10)}+${c1 * 100 + d1 * 10 + u1 * 1}`,
          operation_corr: `${texNombre((c2 * 100 + d2 * 10 + u1 * 1) / 10)}+${c1 * 100 + d1 * 10 + u1 * 1} \\simeq ${c2 * 100 / 10}+${c1 * 100} \\text{ soit } ${c2 * 100 / 10 + c1 * 100}`,
          operation_coche: myOrdreOpe2(c1 * 100, c2 * 100)
        },
        {
          operation: `${c3 * 100 + d3 * 10 + u3 * 1}-${texNombre((c2 * 100 + d2 * 10 + u2 * 1) / divAleatoireOpe3)}`,
          operation_corr: `${c3 * 100 + d3 * 10 + u3 * 1}-${texNombre((c2 * 100 + d2 * 10 + u2 * 1) / divAleatoireOpe3)} \\simeq ${c3 * 100 + d3 * 10}-${texNombre((c2 * 100) / divAleatoireOpe3)} \\text{ soit } ${c3 * 100 + d3 * 10 - (c2 * 100) / divAleatoireOpe3}`,
          operation_coche: myOrdreOpe3(c3)
        },
        {
          operation: `${texNombre(m * 1000 + c3 * 100 + d2 * 10 + u1 * 1)}\\times ${texNombre(multAleatoireOpe4)}`,
          operation_corr: `${texNombre(m * 1000 + c3 * 100 + d2 * 10 + u1 * 1)}\\times ${texNombre(multAleatoireOpe4)} \\simeq ${texNombre(m * 1000)}\\times ${texNombre(multAleatoireOpe4)} \\text{ soit } ${texNombre(m * 1000 * multAleatoireOpe4)}`,
          operation_coche: myOrdreOpe4(multAleatoireOpe4, m)
        },
        {
          operation: `${texNombre((m * 1000 + c4 * 100 + d3 * 10 + u * 1) / divAleatoireOpe5)}\\div ${m}`,
          operation_corr: `${texNombre((m * 1000 + c4 * 100 + d3 * 10 + u * 1) / divAleatoireOpe5)}\\div ${m} \\simeq ${texNombre((m * 1000) / divAleatoireOpe5)}\\div ${m} \\text{ soit } ${texNombre((m * 1000) / divAleatoireOpe5 / m)}`,
          operation_coche: myOrdreOpe5(divAleatoireOpe5)
        }

      ]

      situations = shuffle(situations)

      const enonces = []
      for (let k = 0; k < 1; k++) {
        enonces.push({
          enonce: `
          ${tableauColonneLigne(ligneEntete, [situations[0].operation, situations[1].operation, situations[2].operation, situations[3].operation, situations[4].operation],
            [
              '', '', '', '', '', '',
              '', '', '', '', '', '',
              '', '', '', '', '', '',
              '', '', '', '', '', '',
              '', '', '', '', '', ''
            ]
          )}
          `,
          question: '',
          correction: `
          Commençons par calculer un ordre de grandeur du résultat de chaque opération dans la première colonne du tableau.
          <br>
          ${tableauColonneLigne(ligneEnteteCorr, [situations[0].operation_corr, situations[1].operation_corr, situations[2].operation_corr, situations[3].operation_corr, situations[4].operation_corr],
            [
              situations[0].operation_coche[0], situations[0].operation_coche[1], situations[0].operation_coche[2], situations[0].operation_coche[3], situations[0].operation_coche[4], situations[0].operation_coche[5],
              situations[1].operation_coche[0], situations[1].operation_coche[1], situations[1].operation_coche[2], situations[1].operation_coche[3], situations[1].operation_coche[4], situations[1].operation_coche[5],
              situations[2].operation_coche[0], situations[2].operation_coche[1], situations[2].operation_coche[2], situations[2].operation_coche[3], situations[2].operation_coche[4], situations[2].operation_coche[5],
              situations[3].operation_coche[0], situations[3].operation_coche[1], situations[3].operation_coche[2], situations[3].operation_coche[3], situations[3].operation_coche[4], situations[3].operation_coche[5],
              situations[4].operation_coche[0], situations[4].operation_coche[1], situations[4].operation_coche[2], situations[4].operation_coche[3], situations[4].operation_coche[4], situations[4].operation_coche[5]
            ]
          )}`
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
};
