import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListesSansChangerOrdre, calcul, texNombrec, texNombre, miseEnEvidence, texPrix, tableauColonneLigne } from '../../modules/outils.js'

/**
 * * Tableaux et pourcentages
 * * 5N11-pere de 5N11-1 et 5N11-2
 * * publication initiale le 08/2020
 * * modification le 25/11/2020 pour ajouter des paramétrages
 * * modification le 27/11/2020 ajout de la modulation de la demande
 * @author Sébastien Lozano
 */
export default function TableauxEtPourcentages () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1 // nature du coefficient entre les pourcentages, entier/decimal
  this.sup2 = 1 // nombre de colonnes
  if (this.debug) {
    this.nbQuestions = 1
  } else {
    this.nbQuestions = 1
  };
  if (this.exo === '5N11-1') { // prix constant
    this.titre = 'Tableaux et pourcentages - prix constant'
    this.consigne = 'Compléter le tableau suivant. Le prix est fixe.'
  } else if (this.exo === '5N11-2') { // pourcentage constant
    this.titre = 'Tableaux et pourcentages - pourcentage constant'
    this.consigne = 'Compléter le tableau suivant. Le pourcentage est fixe.'
  } else {
    this.titre = 'Tableaux et pourcentages'
    this.consigne = 'Compléter le tableau suivant.'
  };

  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  // context.isHtml? this.spacing = 3 : this.spacing = 2;
  // context.isHtml? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;
  this.correctionDetailleeDisponible = true

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      if (this.sup2 === 1) {
        typesDeQuestionsDisponibles = [0]
      };
      if (this.sup2 === 2) {
        typesDeQuestionsDisponibles = [1]
      };
      if (this.sup2 === 3) {
        typesDeQuestionsDisponibles = [2]
      };
      if (this.sup2 === 4) {
        typesDeQuestionsDisponibles = [3]
      };
      if (this.sup3) {
        typesDeQuestionsDisponibles = [4]
      };
    } else {
      if (this.sup2 === 1) {
        typesDeQuestionsDisponibles = [0]
      };
      if (this.sup2 === 2) {
        typesDeQuestionsDisponibles = [1]
      };
      if (this.sup2 === 3) {
        typesDeQuestionsDisponibles = [2]
      };
      if (this.sup2 === 4) {
        typesDeQuestionsDisponibles = [3]
      };
      if (this.sup3) {
        typesDeQuestionsDisponibles = [4]
      };
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour les textes de correction
      /**
* @param {string} type // ce qui est donné, remise en pourcentage; Montant de la remise ou Nouveau prix
* @param {object} remiseInit //remise initiale deux propriétés nb sous forme numerique et str sous forme de chaine
* @param {object} remise //remise effective deux propriétés nb sous forme numerique et str sous forme de codageHauteurTriangle
* @param {number} prix
*/
      function justifCorrType (type, remiseInit, remise, prix) {
        let sortie = ''
        switch (type) {
          case 'pourcentage':
            sortie = `-- L'énoncé indique le montant pour une remise de $${remiseInit.str}$ du prix initial or $${texNombre(remise.nb / remiseInit.nb)} \\times ${remiseInit.str} = ${remise.str}$.<br>
Donc pour une remise de $${remise.str}$ du prix initial, le montant de la remise sera $${texNombre(remise.nb / remiseInit.nb)}$ fois celui de la remise de $${remiseInit.str}$ du prix initial,<br>
d'où le calul pour le montant de la remise : $${miseEnEvidence(`${texPrix(prix * remiseInit.nb / 100)} \\times ${texNombre(remise.nb / remiseInit.nb)} = ${texPrix(prix * remise.nb / 100)}`)}$.<br>
Et celui pour le nouveau prix : $${miseEnEvidence(`${texPrix(prix)}-${texPrix(prix * remise.nb / 100)} = ${texPrix(prix - prix * remise.nb / 100)}`)}$.<br><br>
Mais on peut aussi calculer directement le prix réduit en faisant :<br>
$${miseEnEvidence(`${texPrix(prix)} \\times (100\\% - ${remise.str}) = ${texPrix(prix)} \\times ${100 - remise.nb}\\% = ${texPrix(prix)} \\times ${texNombre(calcul(1 - remise.nb / 100))} = ${texPrix(prix * calcul(1 - remise.nb / 100))}`)}$
`
            break
          case 'remise':
            sortie = `-- L'énoncé indique $${texPrix(prix * remise.nb / 100)}$ € de remise pour un montant de $${texPrix(prix)}$ €<br>
d'où le calcul pour le pourcentage de remise : $${miseEnEvidence(`${texPrix(prix * remise.nb / 100)} \\div ${texPrix(prix)} = ${texNombrec(remise.nb / 100)} = ${remise.str}`)}$.<br>
Et celui pour le nouveau prix : $${miseEnEvidence(`${texPrix(prix)}-${texPrix(prix * remise.nb / 100)} = ${texPrix(prix - prix * remise.nb / 100)}`)}$.`

            break
          case 'nouveau_prix':
            sortie = `-- L'énoncé indique un nouveau prix de $${texPrix(prix - prix * remise.nb / 100)}$ € pour un montant de $${texPrix(prix)}$ €<br>
d'où le calcul pour le nouveau prix : $${miseEnEvidence(`${texPrix(prix)} - ${texPrix(prix - prix * remise.nb / 100)} = ${texPrix(prix * remise.nb / 100)}`)}$.<br>
Et celui pour le pourcentage de remise : $${miseEnEvidence(`${texPrix(prix * remise.nb / 100)} \\div ${texPrix(prix)} = ${texNombrec(remise.nb / 100)} = ${remise.str}`)}$.`
            break
          case 'pourcentage_constant':
            sortie = `-- L'énoncé indique un prix de $${texPrix(prix)}$ € et une remise de $${remise.str}$ du prix initial<br>
d'où le calul pour le montant de la remise : $${miseEnEvidence(`${texPrix(prix)} \\times ${remise.str} = ${texPrix(prix)} \\times ${texNombre(remise.nb / 100)} = ${texPrix(prix * remise.nb / 100)}`)}$.<br>
Et celui pour le nouveau prix : $${miseEnEvidence(`${texPrix(prix)}-${texPrix(prix * remise.nb / 100)} = ${texPrix(prix - prix * remise.nb / 100)}`)}$.<br><br>
Mais on peut aussi calculer directement le prix réduit en faisant :<br>
$${miseEnEvidence(`${texPrix(prix)} \\times (100\\% - ${remise.str}) = ${texPrix(prix)} \\times ${100 - remise.nb}\\% = ${texPrix(prix)} \\times ${texNombre(calcul(1 - remise.nb / 100))} = ${texPrix(prix * calcul(1 - remise.nb / 100))}`)}$
`
            break
        };
        return sortie
      };

      let choixPrix, prix1, prix2, prix3, prix4, prix5, prix, remises
      do {
        choixPrix = randint(150, 300)
      } while (choixPrix % 5 !== 0)

      if (this.exo === '5N11-1') { // prix constant
        prix = [choixPrix, choixPrix, choixPrix, choixPrix, choixPrix]
      } else if (this.exo === '5N11-2') {
        prix1 = randint(150, 300)
        prix2 = randint(150, 300, [prix1])
        prix3 = randint(150, 300, [prix1, prix2])
        prix4 = randint(150, 300, [prix1, prix2, prix3])
        prix5 = randint(150, 300, [prix1, prix2, prix3, prix4])
        prix = [prix1, prix2, prix3, prix4, prix5]
      }

      if (this.sup === 1) { // coeff entier
        if (this.exo === '5N11-1') { // prix constant
          remises = choice([
            [{ str: '5\\%', nb: 5 }, { str: '10\\%', nb: 10 }, { str: '15\\%', nb: 15 }, { str: '20\\%', nb: 20 }, { str: '25\\%', nb: 25 }, { str: '30\\%', nb: 30 }],
            [{ str: '5\\%', nb: 5 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }, { str: '55\\%', nb: 55 }, { str: '65\\%', nb: 65 }, { str: '75\\%', nb: 75 }],
            [{ str: '5\\%', nb: 5 }, { str: '15\\%', nb: 15 }, { str: '25\\%', nb: 25 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }, { str: '55\\%', nb: 55 }],
            [{ str: '5\\%', nb: 5 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }, { str: '70\\%', nb: 70 }],
            [{ str: '5\\%', nb: 5 }, { str: '25\\%', nb: 25 }, { str: '40\\%', nb: 40 }, { str: '45\\%', nb: 45 }, { str: '50\\%', nb: 50 }, { str: '55\\%', nb: 55 }],
            [{ str: '5\\%', nb: 5 }, { str: '45\\%', nb: 45 }, { str: '50\\%', nb: 50 }, { str: '55\\%', nb: 55 }, { str: '60\\%', nb: 60 }, { str: '65\\%', nb: 65 }],
            [{ str: '5\\%', nb: 5 }, { str: '50\\%', nb: 50 }, { str: '55\\%', nb: 55 }, { str: '60\\%', nb: 60 }, { str: '65\\%', nb: 65 }, { str: '70\\%', nb: 70 }],
            [{ str: '10\\%', nb: 10 }, { str: '20\\%', nb: 20 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }],
            [{ str: '10\\%', nb: 10 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }, { str: '70\\%', nb: 70 }],
            [{ str: '10\\%', nb: 10 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }, { str: '70\\%', nb: 70 }, { str: '80\\%', nb: 80 }]
          ])
        } else if (this.exo === '5N11-2') { // pourcentage constant
          remises = choice([
            [{ str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }],
            [{ str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }],
            [{ str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }],
            [{ str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }],
            [{ str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }],
            [{ str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }],
            [{ str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }],
            [{ str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }],
            [{ str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }],
            [{ str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }],
            [{ str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }],
            [{ str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }],
            [{ str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }],
            [{ str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }],
            [{ str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }],
            [{ str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }]
          ])
        };
      };
      if (this.sup === 2) { // coeff décimal
        if (this.exo === '5N11-1') { // prix constant
          remises = choice([
            [{ str: '10\\%', nb: 10 }, { str: '5\\%', nb: 5 }, { str: '15\\%', nb: 15 }, { str: '25\\%', nb: 25 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }],
            [{ str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }, { str: '10\\%', nb: 10 }, { str: '20\\%', nb: 20 }, { str: '40\\%', nb: 40 }, { str: '60\\%', nb: 60 }],
            [{ str: '20\\%', nb: 20 }, { str: '10\\%', nb: 10 }, { str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '60\\%', nb: 60 }],
            [{ str: '40\\%', nb: 40 }, { str: '10\\%', nb: 10 }, { str: '5\\%', nb: 5 }, { str: '20\\%', nb: 20 }, { str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }],
            [{ str: '80\\%', nb: 80 }, { str: '10\\%', nb: 10 }, { str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '20\\%', nb: 20 }],
            [{ str: '10\\%', nb: 10 }, { str: '15\\%', nb: 15 }, { str: '25\\%', nb: 25 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }, { str: '55\\%', nb: 55 }],
            [{ str: '50\\%', nb: 50 }, { str: '35\\%', nb: 35 }, { str: '10\\%', nb: 10 }, { str: '25\\%', nb: 25 }, { str: '40\\%', nb: 40 }, { str: '65\\%', nb: 65 }],
            [{ str: '20\\%', nb: 20 }, { str: '5\\%', nb: 5 }, { str: '50\\%', nb: 50 }, { str: '35\\%', nb: 35 }, { str: '40\\%', nb: 40 }, { str: '55\\%', nb: 55 }],
            [{ str: '40\\%', nb: 40 }, { str: '15\\%', nb: 15 }, { str: '5\\%', nb: 5 }, { str: '20\\%', nb: 20 }, { str: '30\\%', nb: 30 }, { str: '25\\%', nb: 25 }],
            [{ str: '80\\%', nb: 80 }, { str: '20\\%', nb: 20 }, { str: '55\\%', nb: 55 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '20\\%', nb: 20 }]
          ])
        } else if (this.exo === '5N11-2') { // pourcentage constant
          // remises = choice([
          // [{str:'10\\%',nb:10},{str:'5\\%',nb:5},{str:'15\\%',nb:15},{str:'25\\%',nb:25},{str:'35\\%',nb:35},{str:'45\\%',nb:45}],
          // [{str:'50\\%',nb:50},{str:'30\\%',nb:30},{str:'10\\%',nb:10},{str:'20\\%',nb:20},{str:'40\\%',nb:40},{str:'60\\%',nb:60}],
          // [{str:'20\\%',nb:20},{str:'10\\%',nb:10},{str:'50\\%',nb:50},{str:'30\\%',nb:30},{str:'40\\%',nb:40},{str:'60\\%',nb:60}],
          // [{str:'40\\%',nb:40},{str:'10\\%',nb:10},{str:'5\\%',nb:5},{str:'20\\%',nb:20},{str:'50\\%',nb:50},{str:'30\\%',nb:30}],
          // [{str:'80\\%',nb:80},{str:'10\\%',nb:10},{str:'50\\%',nb:50},{str:'30\\%',nb:30},{str:'40\\%',nb:40},{str:'20\\%',nb:20}],
          // [{str:'10\\%',nb:10},{str:'15\\%',nb:15},{str:'25\\%',nb:25},{str:'35\\%',nb:35},{str:'45\\%',nb:45},{str:'55\\%',nb:55}],
          // [{str:'50\\%',nb:50},{str:'35\\%',nb:35},{str:'10\\%',nb:10},{str:'25\\%',nb:25},{str:'40\\%',nb:40},{str:'65\\%',nb:65}],
          // [{str:'20\\%',nb:20},{str:'5\\%',nb:5},{str:'50\\%',nb:50},{str:'35\\%',nb:35},{str:'40\\%',nb:40},{str:'55\\%',nb:55}],
          // [{str:'40\\%',nb:40},{str:'15\\%',nb:15},{str:'5\\%',nb:5},{str:'20\\%',nb:20},{str:'30\\%',nb:30},{str:'25\\%',nb:25}],
          // [{str:'80\\%',nb:80},{str:'20\\%',nb:20},{str:'55\\%',nb:55},{str:'30\\%',nb:30},{str:'40\\%',nb:40},{str:'20\\%',nb:20}],
          // ]);
        };
      };

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        {
          tableau: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str,
            texPrix(prix[0] * remises[0].nb / 100), '',
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), ''
          ]),
          tableau_corr: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str,
            texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] * remises[1].nb / 100)}`),
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] - prix[1] * remises[1].nb / 100)}`)
          ])
        },
        {
          tableau: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1]), texPrix(prix[2])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str, remises[2].str,
            texPrix(prix[0] * remises[0].nb / 100), '', '',
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', ''
          ]),
          tableau_corr: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1]), texPrix(prix[2])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str, remises[2].str,
            texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[2] * remises[2].nb / 100)}`),
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] - prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[2] - prix[2] * remises[2].nb / 100)}`)
          ])
        },
        {
          tableau: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1]), texPrix(prix[2]), texPrix(prix[3])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str, remises[2].str, remises[3].str,
            texPrix(prix[0] * remises[0].nb / 100), '', '', '',
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', '', ''
          ]),
          tableau_corr: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1]), texPrix(prix[2]), texPrix(prix[3])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str, remises[2].str, remises[3].str,
            texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[3] * remises[3].nb / 100)}`),
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] - prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[2] - prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[3] - prix[3] * remises[3].nb / 100)}`)
          ])
        },
        {
          tableau: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1]), texPrix(prix[2]), texPrix(prix[3]), texPrix(prix[4])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str, remises[2].str, remises[3].str, remises[4].str,
            texPrix(prix[0] * remises[0].nb / 100), '', '', '', '',
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', '', '', ''
          ]),
          tableau_corr: tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[1]), texPrix(prix[2]), texPrix(prix[3]), texPrix(prix[4])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'], [
            remises[0].str, remises[1].str, remises[2].str, remises[3].str, remises[4].str,
            texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[3] * remises[3].nb / 100)}`), miseEnEvidence(`${texPrix(prix[4] * remises[4].nb / 100)}`),
            texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[1] - prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[2] - prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[3] - prix[3] * remises[3].nb / 100)}`), miseEnEvidence(`${texPrix(prix[4] - prix[4] * remises[4].nb / 100)}`)
          ])
        },
        {
          tableau: [],
          tableau_corr: []
        }
      ]

      let corrections
      if (this.sup3) {
        const interieurTableauTableauCorr = choice([
          {
            tableauCase4: [remises[0].str, remises[1].str, '', '',
              texPrix(prix[0] * remises[0].nb / 100), '', `${texPrix(prix[0] * remises[2].nb / 100)}`, '',
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', '', `${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`],
            tableauCase4Corr: [remises[0].str, remises[1].str, miseEnEvidence(remises[2].str), miseEnEvidence(remises[3].str),
              texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] * remises[1].nb / 100)}`), `${texPrix(prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] * remises[3].nb / 100)}`),
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`), `${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`],
            corrections: `${justifCorrType('pourcentage', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[3], prix[0])}`
          },
          {
            tableauCase4: [remises[0].str, remises[1].str, '', '',
              texPrix(prix[0] * remises[0].nb / 100), '', '', `${texPrix(prix[0] * remises[3].nb / 100)}`,
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', `${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`, ''],
            tableauCase4Corr: [remises[0].str, remises[1].str, miseEnEvidence(remises[2].str), miseEnEvidence(remises[3].str),
              texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] * remises[2].nb / 100)}`), `${texPrix(prix[0] * remises[3].nb / 100)}`,
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`), `${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
            corrections: `${justifCorrType('pourcentage', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[3], prix[0])}`
          },
          {
            tableauCase4: [remises[0].str, '', remises[2].str, '',
              texPrix(prix[0] * remises[0].nb / 100), `${texPrix(prix[0] * remises[1].nb / 100)}`, '', '',
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', '', `${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`],
            tableauCase4Corr: [remises[0].str, miseEnEvidence(remises[1].str), remises[2].str, miseEnEvidence(remises[3].str),
              texPrix(prix[0] * remises[0].nb / 100), `${texPrix(prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] * remises[3].nb / 100)}`),
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`), `${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`],
            corrections: `${justifCorrType('remise', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[3], prix[0])}`
          },
          {
            tableauCase4: [remises[0].str, '', '', remises[3].str,
              texPrix(prix[0] * remises[0].nb / 100), `${texPrix(prix[0] * remises[1].nb / 100)}`, '', '',
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), '', `${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`, ''],
            tableauCase4Corr: [remises[0].str, miseEnEvidence(remises[1].str), miseEnEvidence(remises[2].str), remises[3].str,
              texPrix(prix[0] * remises[0].nb / 100), `${texPrix(prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] * remises[3].nb / 100)}`),
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`), `${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
            corrections: `${justifCorrType('remise', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[3], prix[0])}`
          },
          {
            tableauCase4: [remises[0].str, '', remises[2].str, '',
              texPrix(prix[0] * remises[0].nb / 100), '', '', `${texPrix(prix[0] * remises[3].nb / 100)}`,
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), `${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`, '', ''],
            tableauCase4Corr: [remises[0].str, miseEnEvidence(remises[1].str), remises[2].str, miseEnEvidence(remises[3].str),
              texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] * remises[2].nb / 100)}`), `${texPrix(prix[0] * remises[3].nb / 100)}`,
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), `${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
            corrections: `${justifCorrType('nouveau_prix', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[3], prix[0])}`
          },
          {
            tableauCase4: [remises[0].str, '', '', remises[3].str,
              texPrix(prix[0] * remises[0].nb / 100), '', `${texPrix(prix[0] * remises[2].nb / 100)}`, '',
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), `${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`, '', ''],
            tableauCase4Corr: [remises[0].str, miseEnEvidence(remises[1].str), miseEnEvidence(remises[2].str), remises[3].str,
              texPrix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${texPrix(prix[0] * remises[1].nb / 100)}`), `${texPrix(prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] * remises[3].nb / 100)}`),
              texPrix(prix[0] - prix[0] * remises[0].nb / 100), `${texPrix(prix[0] - prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${texPrix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
            corrections: `${justifCorrType('nouveau_prix', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[3], prix[0])}`
          }
        ])

        const tableauCase4 = tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[0]), texPrix(prix[0]), texPrix(prix[0])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'],
          interieurTableauTableauCorr.tableauCase4
        )
        const tableauCase4Corr = tableauColonneLigne(['\\text{Prix en €}', texPrix(prix[0]), texPrix(prix[0]), texPrix(prix[0]), texPrix(prix[0])], ['\\text{Remise en pourcentage}', '\\text{Montant de la remise en €}', '\\text{Nouveau prix en €}'],
          interieurTableauTableauCorr.tableauCase4Corr
        )
        if (this.correctionDetaillee) {
          corrections = interieurTableauTableauCorr.corrections
          corrections += '<br><br>D\'où le tableau complété :<br><br>'
        } else {
          corrections = ''
        };
        situations[4].tableau = tableauCase4
        situations[4].tableau_corr = tableauCase4Corr
      } else {
        let typeCorr
        if (this.exo === '5N11-1') {
          typeCorr = 'pourcentage'
        };
        if (this.exo === '5N11-2') {
          typeCorr = 'pourcentage_constant'
        };
        if (this.sup2 === 1 && this.correctionDetaillee) {
          corrections = `${justifCorrType(typeCorr, remises[0], remises[1], prix[1])}`
          corrections += '<br><br>D\'où le tableau complété :<br><br>'
        } else if (this.sup2 === 2 && this.correctionDetaillee) {
          corrections = `${justifCorrType(typeCorr, remises[0], remises[1], prix[1])}<br><br>${justifCorrType(typeCorr, remises[0], remises[2], prix[2])}`
          corrections += '<br><br>D\'où le tableau complété :<br><br>'
        } else if (this.sup2 === 3 && this.correctionDetaillee) {
          corrections = `${justifCorrType(typeCorr, remises[0], remises[1], prix[1])}<br><br>${justifCorrType(typeCorr, remises[0], remises[2], prix[2])}<br><br>${justifCorrType(typeCorr, remises[0], remises[3], prix[3])}`
          corrections += '<br><br>D\'où le tableau complété :<br><br>'
        } else if (this.sup2 === 4 && this.correctionDetaillee) {
          corrections = `${justifCorrType(typeCorr, remises[0], remises[1], prix[1])}<br><br>${justifCorrType(typeCorr, remises[0], remises[2], prix[2])}<br><br>${justifCorrType(typeCorr, remises[0], remises[3], prix[3])}<br><br>${justifCorrType(typeCorr, remises[0], remises[4], prix[4])}`
          corrections += '<br><br>D\'où le tableau complété :<br><br>'
        } else {
          corrections = ''
        };
      };

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
${situations[k].tableau}
`,
          question: '',
          correction: `
${corrections}
${situations[k].tableau_corr}
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
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 3:
          texte = `${enonces[3].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
        case 4:
          texte = `${enonces[4].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[4].correction}`
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
  if (this.exo === '5N11-1') { // prix constant
    this.besoinFormulaireNumerique = ['Le coefficient entre les pourcentages', 2, '1 : est entier.\n2 : est décimal.']
    this.besoinFormulaire3CaseACocher = ['Modulation de ce qui est demandé']
    this.besoinFormulaire2Numerique = ['Nombre de colonnes à remplir (fixé à 3 lorsque la case ci-dessous est cochée)', 4, '1 : Une colonne\n2 : Deux colonnes\n3 : Trois colonnes\n4 : Quatre colonnes']
  };
  if (this.exo === '5N11-2') { // pourcentage
    this.besoinFormulaire2Numerique = ['Nombre de colonnes à remplir', 4, '1 : Une colonne\n2 : Deux colonnes\n3 : Trois colonnes\n4 : Quatre colonnes']
  };
}
;
