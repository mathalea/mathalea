import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,choice,arrondi_virgule,tex_nombre,tex_prix} from "/modules/outils.js"
/**
 * On achète 2 aliments dont on connait la masse (un en grammes et l'autre en kilogrammes) et le prix au kilogramme. Il faut calculer le prix total.
 * @Auteur Rémi Angot
 * Référence 6C32
 */
export default function Probleme_course() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problème - Les courses";
  this.consigne = "";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let prenom = choice([
      "Benjamin",
      "Léa",
      "Aude",
      "Julie",
      "Corinne",
      "Mehdi",
      "Joaquim",
    ]);
    let masse_en_kg_de_aliment1 = Algebrite.eval(
      randint(2, 5) + randint(1, 9) / 10
    );
    let prix_aliment1 = Algebrite.eval(randint(2, 4) + randint(1, 9) / 10);
    let aliment1 = choice(["courgettes", "carottes", "pommes"]);
    let masse_en_g_de_aliment2 = randint(21, 97) * 10;
    let prix_aliment2 = Algebrite.eval(randint(12, 23) + randint(1, 9) / 10);
    let aliment2 = choice(["boeuf", "veau", "poulet"]);

    let texte = `${prenom} achète ${tex_nombre(
      masse_en_kg_de_aliment1
    )} kg de ${aliment1} à ${tex_prix(prix_aliment1)} €/kg `;
    texte += `et ${masse_en_g_de_aliment2} g de ${aliment2} à ${tex_prix(
      prix_aliment2
    )} €/kg. Quel est le prix total à payer ?`;
    let texte_corr =
      `Prix des ${aliment1} : ${tex_nombre(
        masse_en_kg_de_aliment1
      )} kg × ${tex_prix(prix_aliment1)} €/kg = ${tex_prix(
        Algebrite.eval(masse_en_kg_de_aliment1 * prix_aliment1)
      )} €` + "<br>";
    texte_corr +=
      `Prix du ${aliment2} : ${tex_nombre(
        Algebrite.eval(masse_en_g_de_aliment2 / 1000)
      )} kg × ${tex_prix(prix_aliment2)} €/kg = ${tex_nombre(
        Algebrite.eval((masse_en_g_de_aliment2 * prix_aliment2) / 1000)
      )} € ` + "<br>";
    texte_corr += `Prix total à payer : ${tex_nombre(
      Algebrite.eval(masse_en_kg_de_aliment1 * prix_aliment1)
    )} € + ${tex_nombre(
      Algebrite.eval((masse_en_g_de_aliment2 * prix_aliment2) / 1000)
    )} € ≈ ${arrondi_virgule(
      Algebrite.eval(
        masse_en_kg_de_aliment1 * prix_aliment1 +
        (masse_en_g_de_aliment2 * prix_aliment2) / 1000
      )
    )} €<br>`;
    texte_corr += `<br><i>Le prix total aurait aussi pu être trouvé en un seul calcul</i> : ${tex_nombre(
      masse_en_kg_de_aliment1
    )} kg × ${tex_prix(prix_aliment1)} €/kg + ${tex_nombre(
      Algebrite.eval(masse_en_g_de_aliment2 / 1000)
    )} kg × ${tex_prix(prix_aliment2)} €/kg ≈ ${arrondi_virgule(
      Algebrite.eval(
        masse_en_kg_de_aliment1 * prix_aliment1 +
        (masse_en_g_de_aliment2 * prix_aliment2) / 1000
      )
    )} €.`;

    if (!sortie_html) {
      texte_corr =
        `Prix des ${aliment1} : $${tex_nombre(
          masse_en_kg_de_aliment1
        )}~\\text{kg}\\times${tex_prix(
          prix_aliment1
        )}~\\text{\\euro{}/kg} = ${tex_prix(
          Algebrite.eval(masse_en_kg_de_aliment1 * prix_aliment1)
        )}~\\text{\\euro}$` + "<br>";
      texte_corr +=
        `Prix du ${aliment2} : $${tex_nombre(
          Algebrite.eval(masse_en_g_de_aliment2 / 1000)
        )}~\\text{kg}\\times${tex_prix(
          prix_aliment2
        )}~\\text{\\euro{}/kg} = ${tex_nombre(
          Algebrite.eval((masse_en_g_de_aliment2 * prix_aliment2) / 1000)
        )}~\\text{\\euro}$` + "<br>";
      texte_corr += `Prix total à payer : $${tex_nombre(
        Algebrite.eval(masse_en_kg_de_aliment1 * prix_aliment1)
      )}~\\text{\\euro} + ${tex_nombre(
        Algebrite.eval((masse_en_g_de_aliment2 * prix_aliment2) / 1000)
      )}~\\text{\\euro} \\approx ${arrondi_virgule(
        Algebrite.eval(
          masse_en_kg_de_aliment1 * prix_aliment1 +
          (masse_en_g_de_aliment2 * prix_aliment2) / 1000
        )
      )}~\\text{\\euro}$<br>`;
    }

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);

    liste_de_question_to_contenu_sans_numero(this);
  };
}



