import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,arrondi,texNombre,tex_texte} from '../../modules/outils.js'
const Algebrite = require('algebrite')

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

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
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
    let liste_unite1 = combinaisonListes([0, 1, 2, 3, 4, 5, 6], this.nbQuestions);
    let liste_de_k = combinaisonListes([0, 1, 2], this.nbQuestions);
    for (let i = 0,
      a,
      k,
      div,
      resultat,
      texte,
      texteCorr,
      cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
          texNombre(a) +
          tex_texte(prefixe_multi[k][0] + unite) +
          " = \\dotfill " +
          tex_texte(unite) +
          "$";

        texteCorr =
          "$ " +
          texNombre(a) +
          tex_texte(prefixe_multi[k][0] + unite) +
          " =  " +
          texNombre(a) +
          "\\times" +
          texNombre(prefixe_multi[k][1]) +
          tex_texte(unite) +
          " = " +
          texNombre(resultat) +
          tex_texte(unite) +
          "$";
      } else if (div && type_de_questions < 4) {
        resultat = Algebrite.eval(a / prefixe_div[k][1]).toString(); // Attention aux notations scientifiques pour 10e-8
        texte =
          "$ " +
          texNombre(a) +
          tex_texte(prefixe_div[k][0] + unite) +
          " = \\dotfill " +
          tex_texte(unite) +
          "$";
        texteCorr =
          "$ " +
          texNombre(a) +
          tex_texte(prefixe_div[k][0] + unite) +
          " =  " +
          texNombre(a) +
          "\\div" +
          texNombre(prefixe_div[k][1]) +
          tex_texte(unite) +
          " = " +
          texNombre(resultat) +
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
            texNombre(a) +
            tex_texte(liste_unite[unite2]) +
            " = \\dotfill " +
            tex_texte(liste_unite[unite1]) +
            "$";
          texteCorr =
            "$ " +
            texNombre(a) +
            tex_texte(liste_unite[unite2]) +
            " =  " +
            texNombre(a) +
            "\\times" +
            texNombre(Math.pow(10, ecart)) +
            tex_texte(liste_unite[unite1]) +
            " = " +
            texNombre(resultat) +
            tex_texte(liste_unite[unite1]) +
            "$";
        } else {
          resultat = Algebrite.eval(a / Math.pow(10, ecart));
          texte =
            "$ " +
            texNombre(a) +
            tex_texte(liste_unite[unite1]) +
            " = \\dotfill " +
            tex_texte(liste_unite[unite2]) +
            "$";
          texteCorr =
            "$ " +
            texNombre(a) +
            tex_texte(liste_unite[unite1]) +
            " =  " +
            texNombre(a) +
            "\\div" +
            texNombre(Math.pow(10, ecart)) +
            tex_texte(liste_unite[unite2]) +
            " = " +
            texNombre(resultat) +
            tex_texte(liste_unite[unite2]) +
            "$";
        }
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (est_diaporama) {
          texte = texte.replace("= \\dotfill", "\\text{ en }");
        }
        if (sortieHtml) {
          texte = texte.replace(
            "\\dotfill",
            "................................................"
          );
        }
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    4,
    "1 : De dam, hm, km vers m\n\
2 : De dm, cm, mm vers m\n3 : Conversions en mètres\n4 : Toutes les conversions de longueurs",
  ];
  this.besoinFormulaire2CaseACocher = ["Avec des nombres décimaux"];
}
