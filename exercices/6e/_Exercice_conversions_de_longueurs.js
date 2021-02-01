import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,arrondi,tex_nombre,tex_texte} from "/modules/outils.js"
/**
 * Conversions de longueur en utilisant le préfixe pour déterminer la multiplication ou division à faire.
 *
 * * 1 : De dam, hm, km vers m
 * * 2 : De dm, cm, mm vers m
 * * 3 : Conversions en mètres
 * * 4 : Toutes les conversions de longueurs
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @Auteur Rémi Angot
 */
export default function Exercice_conversions_de_longueurs(niveau = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = niveau; // Niveau de difficulté de l'exercice
  this.sup2 = false; // Avec des nombres décimaux ou pas
  this.titre = "Conversions de longueurs";
  this.consigne = "Compléter";
  this.spacing = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let prefixe_multi = [
      [" da", 10],
      [" h", 100],
      [" k", 1000],
    ];
    let prefixe_div = [
      [" d", 10],
      [" c", 100],
      [" m", 1000],
    ];
    let unite = "m";
    let liste_unite = ["mm", "cm", "dm", "m", "dam", "hm", "km"];
    let liste_unite1 = combinaison_listes([0, 1, 2, 3, 4, 5, 6], this.nb_questions);
    let liste_de_k = combinaison_listes([0, 1, 2], this.nb_questions);
    for (let i = 0,
      a,
      k,
      div,
      resultat,
      texte,
      texte_corr,
      cpt = 0; i < this.nb_questions && cpt < 50;) {
      let type_de_questions;
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (this.sup < 5) {
        type_de_questions = this.sup;
      } else {
        type_de_questions = randint(1, 4);
      }
      // k = randint(0,2); // Choix du préfixe
      k = liste_de_k[i]; //Plutôt que de prendre un préfix au hasard, on alterne entre 10,100 et 1000
      if (type_de_questions == 1) {
        // niveau 1
        div = false; // Il n'y aura pas de division
      } else if (type_de_questions == 2) {
        // niveau 2
        div = true; // Avec des divisions
      } else {
        div = choice([true, false]); // Avec des multiplications ou des divisions
      }

      if (this.sup2) {
        // Si la case pour les nombres décimaux est cochée
        a = choice([
          arrondi(randint(1, 19) + randint(1, 9) / 10, 1),
          arrondi(randint(1, 9) / 10, 1),
          arrondi(randint(1, 9) / 100, 2),
          arrondi(randint(1, 9) + randint(1, 9) / 10 + randint(1, 9) / 100, 2),
        ]);
        // XX,X 0,X 0,0X X,XX
      } else {
        a = choice([
          randint(1, 9),
          randint(1, 9) * 10,
          randint(1, 9) * 100,
          randint(1, 9) * 10 + randint(1, 9),
        ]);
        // X, X0, X00, XX
      }

      if (!div && type_de_questions < 4) {
        // Si il faut multiplier pour convertir
        resultat = Algebrite.eval(a * prefixe_multi[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        texte =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_multi[k][0] + unite) +
          " = \\dotfill " +
          tex_texte(unite) +
          "$";

        texte_corr =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_multi[k][0] + unite) +
          " =  " +
          tex_nombre(a) +
          "\\times" +
          tex_nombre(prefixe_multi[k][1]) +
          tex_texte(unite) +
          " = " +
          tex_nombre(resultat) +
          tex_texte(unite) +
          "$";
      } else if (div && type_de_questions < 4) {
        resultat = Algebrite.eval(a / prefixe_div[k][1]).toString(); // Attention aux notations scientifiques pour 10e-8
        texte =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_div[k][0] + unite) +
          " = \\dotfill " +
          tex_texte(unite) +
          "$";
        texte_corr =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_div[k][0] + unite) +
          " =  " +
          tex_nombre(a) +
          "\\div" +
          tex_nombre(prefixe_div[k][1]) +
          tex_texte(unite) +
          " = " +
          tex_nombre(resultat) +
          tex_texte(unite) +
          "$";
      } else {
        // pour type de question = 4
        let unite1 = liste_unite1[i];
        let unite2 = randint(Math.max(0, unite1 - 3), Math.min(unite1 + 3, 6), unite1);
        if (unite1 > unite2) {
          [unite1, unite2] = [unite2, unite1];
        }
        let ecart = unite2 - unite1; // nombre de multiplication par 10 pour passer de l'un à l'autre
        if (randint(0, 1) > 0) {
          resultat = Algebrite.eval(a * Math.pow(10, ecart));
          texte =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite2]) +
            " = \\dotfill " +
            tex_texte(liste_unite[unite1]) +
            "$";
          texte_corr =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite2]) +
            " =  " +
            tex_nombre(a) +
            "\\times" +
            tex_nombre(Math.pow(10, ecart)) +
            tex_texte(liste_unite[unite1]) +
            " = " +
            tex_nombre(resultat) +
            tex_texte(liste_unite[unite1]) +
            "$";
        } else {
          resultat = Algebrite.eval(a / Math.pow(10, ecart));
          texte =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite1]) +
            " = \\dotfill " +
            tex_texte(liste_unite[unite2]) +
            "$";
          texte_corr =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite1]) +
            " =  " +
            tex_nombre(a) +
            "\\div" +
            tex_nombre(Math.pow(10, ecart)) +
            tex_texte(liste_unite[unite2]) +
            " = " +
            tex_nombre(resultat) +
            tex_texte(liste_unite[unite2]) +
            "$";
        }
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("= \\dotfill", "\\text{ en }");
        }
        if (sortie_html) {
          texte = texte.replace(
            "\\dotfill",
            "................................................"
          );
        }
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
    4,
    "1 : De dam, hm, km vers m\n\
2 : De dm, cm, mm vers m\n3 : Conversions en mètres\n4 : Toutes les conversions de longueurs",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des nombres décimaux"];
}
