import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,arrondi,tex_nombre,tex_texte} from "/modules/outils.js"
/**
 * Conversions d'aires en utilisant le préfixe pour déterminer la multiplication ou division à faire.
 *
 * Dans la correction, on montre que l'on multiplie ou divisie à 2 reprises par le coefficient donné par le préfixe
 *
 * * 1 : De dam², hm², km² vers m²
 * * 2 : De dm², cm², mm² vers m²
 * * 3 : Conversions en mètres-carrés
 * * 4 : Conversions avec des multiplications ou des divisions
 * * 5 : Conversions avec des ares, des centiares et des hectares
 * * 6 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @Auteur Rémi Angot
 * Référence 6M23
 */
export default function Exercice_conversions_aires(niveau = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = niveau; // Niveau de difficulté de l'exercice
  this.sup2 = false; // Avec des nombres décimaux ou pas
  this.titre = "Conversions d'aires";
  this.consigne = "Compléter";
  this.spacing = 2;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let prefixe_multi = [
      [" da", "\\times10\\times10", 100],
      [" h", "\\times100\\times100", 10000],
      [" k", "\\times1~000\\times1~000", 1000000],
    ];
    let prefixe_div = [
      [" d", "\\div10\\div10", 100],
      [" c", "\\div100\\div100", 10000],
      [" m", "\\div1~000\\div1~000", 1000000],
    ];
    let unite = "m";
    let liste_unite = ["mm", "cm", "dm", "m", "dam", "hm", "km"];
    let liste_de_k = combinaison_listes([0, 1, 2], this.nb_questions);
    for (let i = 0,
      a,
      k,
      div,
      resultat,
      type_de_questions,
      texte,
      texte_corr,
      cpt = 0; i < this.nb_questions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (this.sup < 6) {
        type_de_questions = this.sup;
      } else {
        type_de_questions = randint(1, 5);
      }
      // k = randint(0,2); // Choix du préfixe
      k = liste_de_k[i];
      if (type_de_questions == 1) {
        // niveau 1
        div = false; // Il n'y aura pas de division
      } else if (type_de_questions == 2) {
        // niveau 2
        div = true; // Avec des divisions
      } else if (type_de_questions == 3) {
        div = choice([true, false]); // Avec des multiplications ou des divisions
      } else if (type_de_questions == 4) {
        div = choice([true, false]); // Avec des multiplications ou des divisions sans toujours revenir au m^2
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
        prefixe_multi = [
          [" da", "\\times10\\times10", 100],
          [" h", "\\times100\\times100", 10000],
          [" k", "\\times1~000\\times1~000", 1000000],
        ]; // On réinitialise cette liste qui a pu être modifiée dans le cas des ares
        resultat = Algebrite.eval(a * prefixe_multi[k][2]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        texte =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_multi[k][0] + unite) +
          "^2" +
          " = \\dotfill " +
          tex_texte(unite) +
          "^2" +
          "$";
        texte_corr =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_multi[k][0] + unite) +
          "^2" +
          " =  " +
          tex_nombre(a) +
          prefixe_multi[k][1] +
          tex_texte(unite) +
          "^2" +
          " = " +
          tex_nombre(resultat) +
          tex_texte(unite) +
          "^2" +
          "$";
      } else if (div && type_de_questions < 4) {
        prefixe_div = [
          [" d", "\\div10\\div10", 100],
          [" c", "\\div100\\div100", 10000],
          [" m", "\\div1~000\\div1~000", 1000000],
        ];
        k = randint(0, 1); // Pas de conversions de mm^2 en m^2 avec des nombres décimaux car résultat inférieur à 10e-8
        resultat = Algebrite.eval(a / prefixe_div[k][2]).toString(); // Attention aux notations scientifiques pour 10e-8
        texte =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_div[k][0] + unite) +
          "^2" +
          " = \\dotfill " +
          tex_texte(unite) +
          "^2" +
          "$";
        texte_corr =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_div[k][0] + unite) +
          "^2" +
          " =  " +
          tex_nombre(a) +
          prefixe_div[k][1] +
          tex_texte(unite) +
          "^2" +
          " = " +
          tex_nombre(resultat) +
          tex_texte(unite) +
          "^2" +
          "$";
      } else if (type_de_questions == 4) {
        let unite1 = randint(0, 3);
        let ecart = randint(1, 2); // nombre de multiplication par 10 pour passer de l'un à l'autre
        if (ecart > 4 - unite1) {
          ecart = 4 - unite1;
        }
        let unite2 = unite1 + ecart;
        if (randint(0, 1) > 0) {
          resultat = Algebrite.eval(a * Math.pow(10, 2 * ecart));
          texte =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite2]) +
            "^2" +
            " = \\dotfill " +
            tex_texte(liste_unite[unite1]) +
            "^2" +
            "$";
          texte_corr =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite2]) +
            "^2" +
            " =  " +
            tex_nombre(a) +
            "\\times" +
            tex_nombre(Math.pow(10, 2 * ecart)) +
            tex_texte(liste_unite[unite1]) +
            "^2" +
            " = " +
            tex_nombre(resultat) +
            tex_texte(liste_unite[unite1]) +
            "^2" +
            "$";
        } else {
          resultat = Algebrite.eval(a / Math.pow(10, 2 * ecart));
          texte =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite1]) +
            "^2" +
            " = \\dotfill " +
            tex_texte(liste_unite[unite2]) +
            "^2" +
            "$";
          texte_corr =
            "$ " +
            tex_nombre(a) +
            tex_texte(liste_unite[unite1]) +
            "^2" +
            " =  " +
            tex_nombre(a) +
            "\\div" +
            tex_nombre(Math.pow(10, 2 * ecart)) +
            tex_texte(liste_unite[unite2]) +
            "^2" +
            " = " +
            tex_nombre(resultat) +
            tex_texte(liste_unite[unite2]) +
            "^2" +
            "$";
        }
      } else if (type_de_questions == 5) {
        // Pour type_de_questions==5
        prefixe_multi = [
          ["ha", 10000],
          ["a", 100],
        ];
        k = randint(0, 1);
        resultat = Algebrite.eval(a * prefixe_multi[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        texte =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_multi[k][0]) +
          " = \\dotfill " +
          tex_texte(unite) +
          "^2" +
          "$";
        texte_corr =
          "$ " +
          tex_nombre(a) +
          tex_texte(prefixe_multi[k][0]) +
          " =  " +
          tex_nombre(a) +
          "\\times" +
          tex_nombre(prefixe_multi[k][1]) +
          tex_texte(unite) +
          "^2" +
          " = " +
          tex_nombre(resultat) +
          tex_texte(unite) +
          "^2" +
          "$";
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
    6,
    "1 : Conversions en m² avec des multiplications\n\
2 : Conversions en m² avec des divisions\n3 : Conversions en m² avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions\n\
5 : Conversions d'hectares et ares en m² \n6 : Toutes les conversions",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Avec des nombres décimaux"];
}
