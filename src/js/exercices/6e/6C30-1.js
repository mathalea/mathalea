import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,calcul,texNombrec,texNombre,miseEnEvidence,tex_fraction} from '../../modules/outils.js'
export const amcReady = true

export const titre = 'Multiplications d’un nombre décimal par 10, 100 ou 1 000.'

/**
 * Multiplication d'un nombre décimal dans différentes écritures par 10, 100, 1000
 *
 *  * Type 1 : écriture décimale
 *  * Type 2 : écriture fractionnaire
 *  * Type 3 : écritures fractionnaires et décimales
 *
 *
 *  * Sup2 : avec ou sans calculs à trous
 * @Auteur Rémi Angot
* Référence 6C30-1
  *
 */
export default function Multiplier_decimaux_par_10_100_1000() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer.";
  this.sup = 3;
  this.sup2 = false;
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbQuestions = 8;

  this.nouvelleVersion = function () {
    this.qcm=['6C30-1',[],'Multiplications d\'un nombre décimal par 10, 100 ou 1 000.',4]
 
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [],type_de_questions;
    if (this.sup == 1 && !this.sup2) type_de_questions_disponibles = [1, 2];
    if (this.sup == 1 && this.sup2)
      type_de_questions_disponibles = [1, 2, 5, 6];
    if (this.sup == 2 && !this.sup2) type_de_questions_disponibles = [3, 4];
    if (this.sup == 2 && this.sup2)
      type_de_questions_disponibles = [3, 4, 3, 4, 7, 8, 9, 10];
    if (this.sup == 3 && !this.sup2)
      type_de_questions_disponibles = [1, 2, 3, 4];
    if (this.sup == 3 && this.sup2)
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (this.sup2) this.consigne = "Calculer et compléter.";
let reponse
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_de_facteurs = combinaisonListes(
      [10, 100, 1000],
      this.nbQuestions
    );

    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, den;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // a,abcd × 10
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$${texNombre(a)}\\times${texNombre(b)}$`;
          texteCorr = `$${texNombre(a)} \\times ${texNombre(
            b
          )} = ${texNombrec(a * b)}$`;
          reponse=calcul(a*b)
          break;
        case 2: // 10 × a,abcd
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$${texNombre(b)}\\times${texNombre(a)}$`;
          texteCorr = `$${texNombre(b)} \\times ${texNombre(
            a
          )} = ${texNombrec(a * b)}$`;
          reponse=calcul(a*b)
          break;
        case 3: // abcd/10 × 10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_fraction(a, den)}\\times${texNombre(b)}$`;
          texteCorr = `$${tex_fraction(a, den)} \\times ${texNombre(
            b
          )} = ${tex_fraction(a * b, den)} = ${texNombrec((a / den) * b)}$`;
          reponse=calcul(a*b/den)
          break;
        case 4: // 10 × abcd/10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${texNombre(b)}\\times${tex_fraction(a, den)}$`;
          texteCorr = `$${texNombre(b)} \\times ${tex_fraction(
            a,
            den
          )} = ${tex_fraction(a * b, den)} = ${texNombrec((a / den) * b)}$`;
          reponse=calcul(a*b/den)
          break;
        case 5: // .... × 10 = a,abcd
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$\\ldots \\times${texNombre(b)} = ${texNombrec(a * b)}$`;
          texteCorr = `$${miseEnEvidence(
            texNombre(a)
          )} \\times ${texNombre(b)} = ${texNombrec(a * b)}$`;
          reponse=calcul(a*b)
          break;
        case 6: // 10 × .... = a,abcd
          a = choice([randint(11, 99), randint(100, 999)]);
          a = calcul(a / choice([10, 100, 1000, 10000]));
          b = liste_de_facteurs[i];
          texte = `$${texNombre(b)} \\times \\ldots = ${texNombrec(a * b)}$`;
          texteCorr = `$${texNombre(b)} \\times ${miseEnEvidence(
            texNombre(a)
          )}  = ${texNombrec(a * b)}$`;
         reponse=a
          break;
        case 7: // case 3 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_fraction(a, den)}\\times \\ldots = ${texNombrec(
            (a / den) * b
          )}$`;
          texteCorr = `$${tex_fraction(a, den)} \\times ${miseEnEvidence(
            texNombre(b)
          )} = ${tex_fraction(a * b, den)} = ${texNombrec((a / den) * b)}$`;
          reponse=b
          break;
        case 8: // case 4 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$ \\ldots \\times${tex_fraction(a, den)}= ${texNombrec(
            (a / den) * b
          )}$`;
          texteCorr = `$${miseEnEvidence(
            texNombre(b)
          )} \\times ${tex_fraction(a, den)} = ${tex_fraction(
            a * b,
            den
          )} = ${texNombrec((a / den) * b)}$`;
          reponse=calcul(b)
          break;
        case 9: // case 3 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${tex_fraction(a, "\\ldots")}\\times${texNombre(
            b
          )} = ${texNombrec((a / den) * b)}$`;
          texteCorr = `$${tex_fraction(
            a,
            miseEnEvidence(texNombre(den))
          )} \\times ${texNombre(b)} = ${tex_fraction(
            a * b,
            den
          )} = ${texNombrec((a / den) * b)}$`;
          calcul(a*b/den)
          break;
        case 10: // case 4 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)]);
          den = choice([10, 100, 1000]);
          b = liste_de_facteurs[i];
          texte = `$${texNombre(b)}\\times${tex_fraction(
            a,
            "\\ldots"
          )} = ${texNombrec((a / den) * b)}$`;
          texteCorr = `$${texNombre(b)} \\times ${tex_fraction(
            a,
            miseEnEvidence(texNombre(den))
          )} = ${tex_fraction(a * b, den)} = ${texNombrec((a / den) * b)}$`;
          calcul(a*b/den)
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        this.qcm[1].push([texte, [texteCorr,reponse], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Types de calculs",
    3,
    "1 : Écriture décimale\n2 : Écriture fractionnaire\n3 : Écritures décimales et fractionnaires",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des calculs à trous"];
}

