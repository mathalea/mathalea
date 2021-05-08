import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenuSansNumero,randint,combinaisonListes,numAlpha} from '../../modules/outils.js'
import Choisir_expression_numerique from '../5e/_Choisir_expression_numerique.js'
export const titre = 'Traduire des phrases en calculs et réciproquement'

/**
 * Mettre en relation un calcul, une traduction en français, une expression, un résultat, pour les décliner dans différents exercices.
 * Exercice sur le vocabulaire : somme,différence, produit, quotient...
 * @Auteur Jean-Claude Lhote
 * Référence 6C13
 */
export default function Vocabulaire_et_operations() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 5;
  this.nbCols = 2;
  this.nbColsCorr = 2;
  this.sup = 4;
  this.sup2 = false;

  this.nouvelleVersion = function () {
    let decimal;
    let expf, expn, expc, resultats;
    let type_de_questions_disponibles;
    if (this.sup < 4) type_de_questions_disponibles = [parseInt(this.sup)];
    else type_de_questions_disponibles = [1, 2, 3];
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    );
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    if (this.sup2) decimal = 10 ** randint(1, 2);
    else decimal = 1;

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      resultats = Choisir_expression_numerique(1, decimal);
      expf = resultats[0];
      expn = resultats[1];
      expc = resultats[2];
      texte = ``;
      texteCorr = ``;
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte +=
            numAlpha(i) +
            `Traduire la phrase par un calcul (il n’est pas demandé d’effectuer ce calcul) : `;
          expf = `l` + expf.substring(1);
          texte += `${expf}.`;
          texteCorr += numAlpha(i) + `${expf} s'écrit ${expn}.`;
          break;
        case 2:
          if (expn.indexOf("ou") > 0)
            expn = expn.substring(0, expn.indexOf("ou")); // on supprime la deuxième expression fractionnaire
          texte +=
            numAlpha(i) + `Traduire le calcul par une phrase en français : `;
          texte += `${expn}`;
          expf = `l` + expf.substring(1);
          texteCorr += numAlpha(i) + `${expn} est ${expf}.`;
          break;
        case 3:
          texte +=
            numAlpha(i) +
            `Traduire la phrase par un calcul et effectuer ce calcul : `;
          expf = `l` + expf.substring(1);
          texte += `${expf}.`;
          expf = `L` + expf.substring(1);
          texteCorr += numAlpha(i) + `${expf} s'écrit ${expn}.<br>`;
          texteCorr += `${expc}.`;
          break;
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenuSansNumero(this);
  };
  this.besoinFormulaireNumerique = [
    "Type de questions",
    4,
    "1 : Phrase -> Calcul\n 2 : Calcul -> Phrase\n 3 : Phrase -> Calcul + résultat\n 4 : Mélange",
  ];
  this.besoinFormulaire2CaseACocher = ["Décimaux", false];
}

