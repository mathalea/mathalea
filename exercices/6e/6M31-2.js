import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,calcul,tex_nombrec,tex_nombre} from "/modules/outils.js"
/**
 * Conversions d'unités de volumes vers les unités de capacité ou inversement.
 *
 * Dans la correction, on passe systématiquement par l'équivalence dm3 = L
 *
 * * 1 : De dam3, m3, dm3, cm3 ou mm3 vers L ou inversement
 * * 2 :
 * * 3 :
 * * 4 :
 * * 5 :
 * * 6 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @Auteur Rémi Angot
 * Référence 6M31-2
 */
export default function Unites_de_volumes_et_de_capacite(niveau = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = niveau; // Niveau de difficulté de l'exercice
  this.sup2 = false; // Avec des nombres décimaux ou pas
  this.titre = "Conversions avec des unités de volumes ou de capacités";
  this.consigne = "Compléter";
  this.spacing = 2;
  this.nb_questions = 8;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes(
        ["dam3toL", "m3toL", "dm3toL", "cm3toL"],
        this.nb_questions
      );
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes(
        ["Ltodm3", "Ltocm3", "Ltom3"],
        this.nb_questions
      );
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaison_listes(
        [
          "dam3toL",
          "m3toL",
          "dm3toL",
          "cm3toL",
          "mm3toL",
          "Ltodm3",
          "Ltocm3",
          "Ltom3",
        ],
        this.nb_questions
      );
    }
    let liste_de_n = [];
    if (this.sup2) {
      liste_de_n = combinaison_listes([1, 2, 3, 4], this.nb_questions);
    } else {
      liste_de_n = combinaison_listes([1, 2, 3, 4, 5, 6], this.nb_questions);
    }
    for (
      let i = 0, n, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      if (this.sup2) {
        switch (liste_de_n[i]) {
          case 1:
            n = calcul(randint(2, 9) / 10);
            break;
          case 2:
            n = calcul(randint(11, 99) / 100);
            break;
          case 3:
            n = calcul(randint(1, 9) * 10 + randint(1, 9) / 10);
            break;
          case 4:
            n = calcul(
              randint(11, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90]) / 100
            );
            break;
        }
      } else {
        switch (liste_de_n[i]) {
          case 1:
            n = randint(2, 9);
            break;
          case 2:
            n = randint(11, 99);
            break;
          case 3:
            n = randint(1, 9) * 10;
            break;
          case 4:
            n = randint(1, 9) * 100;
            break;
          case 5:
            n = randint(11, 99) * 100;
            break;
          case 6:
            n = randint(1, 9) * 1000;
            break;
        }
      }
      switch (liste_type_de_questions[i]) {
        case "dam3toL":
          texte = `$${tex_nombre(n)}~\\text{dam}^3=\\dotfill~\\text{L}$`;
          texte_corr = `$${tex_nombre(n)}~\\text{dam}^3=${tex_nombre(
            n
          )}\\times1~000\\times1~000~\\text{dm}^3=${tex_nombrec(
            n * 1000000
          )}~\\text{L}$`;
          break;
        case "m3toL":
          texte = `$${tex_nombre(n)}~\\text{m}^3=\\dotfill~\\text{L}$`;
          texte_corr = `$${tex_nombre(n)}~\\text{m}^3=${tex_nombre(
            n
          )}\\times1~000~\\text{dm}^3=${tex_nombrec(n * 1000)}~\\text{L}$`;
          break;
        case "dm3toL":
          texte = `$${tex_nombre(n)}~\\text{dm}^3=\\dotfill~\\text{L}$`;
          texte_corr = `$${tex_nombre(n)}~\\text{dm}^3=${tex_nombre(
            n
          )}~\\text{L}$`;
          break;
        case "cm3toL":
          texte = `$${tex_nombre(n)}~\\text{cm}^3=\\dotfill~\\text{L}$`;
          texte_corr = `$${tex_nombre(n)}~\\text{cm}^3=${tex_nombre(
            n
          )}\\div 1~000~\\text{dm}^3=${tex_nombrec(n / 1000)}~\\text{L}$`;
          break;
        case "mm3toL":
          texte = `$${tex_nombre(n)}~\\text{mm}^3=\\dotfill~\\text{L}$`;
          texte_corr = `$${tex_nombre(n)}~\\text{mm}^3=${tex_nombre(
            n
          )}\\div1~000\\div 1~000~\\text{dm}^3=${tex_nombrec(
            n / 1000000
          )}~\\text{L}$`;
          break;
        case "Ltodm3":
          texte = `$${tex_nombre(n)}~\\text{L}=\\dotfill~\\text{dm}^3$`;
          texte_corr = `$${tex_nombre(n)}~\\text{L}=${tex_nombre(
            n
          )}~\\text{dm}^3$`;
          break;
        case "Ltocm3":
          texte = `$${tex_nombre(n)}~\\text{L}=\\dotfill~\\text{cm}^3$`;
          texte_corr = `$${tex_nombre(n)}~\\text{L}=${tex_nombre(
            n
          )}~\\text{dm}^3=${tex_nombre(
            n
          )}\\times1~000~\\text{cm}^3=${tex_nombrec(n * 1000)}~\\text{cm}^3$`;
          break;
        case "Ltom3":
          texte = `$${tex_nombre(n)}~\\text{L}=\\dotfill~\\text{m}^3$`;
          texte_corr = `$${tex_nombre(n)}~\\text{L}=${tex_nombre(
            n
          )}~\\text{dm}^3=${tex_nombre(n)}\\div1~000~\\text{m}^3=${tex_nombrec(
            n / 1000
          )}~\\text{m}^3$`;
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    3,
    "1 : Unités de volume vers litre\n2 : Litre vers unités de volume\n3 : Unités de volumes vers litre ou inversement ",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des nombres décimaux"];
}

