import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,calcul,tex_nombrec,prenomF,prenomM,texte_en_couleur,tex_prix} from "/modules/outils.js"
/**
 * On donne une relation de proportionnalité du type n objets coûtent x€ et on demande le prix de y objets
 * et le nombre d'objets qu'on peut acheter avec z€.
 * @Auteur Jean-Claude Lhote
 * référence 6P11
*/
export default function Proportionnalite_par_linearite() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Résoudre des problèmes de proportionnalité en utilisant la linéarité simple";
  this.consigne = "Répondre aux questions posées en justifiant";
  sortie_html ? (this.spacing = 2) : (this.spacing = 1);
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1);
  this.nb_questions = 5;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_index_disponibles = [0, 1, 2, 3, 4];
    let liste_index = combinaison_listes(
      liste_index_disponibles,
      this.nb_questions
    );
    let liste_de_lieux = [
      "dans un magasin de bricolage",
      "dans une animalerie",
      "au supermarché local",
      "à l'épicerie",
      "dans la boutique du musée",
    ];
    let liste_de_choses = [[]];
    let liste_de_prix_unit = [[]];
    liste_de_choses[0] = [
      "articles",
      "outils",
      "accessoires",
      "pièces d'outillage",
      "pinceaux",
      "ampoules",
      "tournevis",
      "spatules",
      "raccords de tuyaux",
    ];
    liste_de_choses[1] = [
      "poissons rouges",
      "cannetons",
      "perruches",
      "phasmes",
      "colliers anti-puces",
      "souris",
      "lapereaux",
      "paquets de graines",
    ];
    liste_de_choses[2] = [
      "sets de tables",
      "verres",
      "assiettes",
      "os à macher",
      "dosettes de café",
      "packs de lait",
      "paquets de pâtes",
    ];
    liste_de_choses[3] = [
      "mangues",
      "ananas",
      "fruits de la passion",
      "melons",
      "paquets de madeleines de Commercy",
      "bergamottes",
      "bredeles",
      "pots de cancoillotte",
    ];
    liste_de_choses[4] = [
      "cartes",
      "livres",
      "gravures",
      "puzzles",
      "maquettes",
      "roches",
      "jeux de société",
    ];
    liste_de_prix_unit[0] = [5, 4, 1.25, 3, 0.5, 1.5, 2, 6, 4.5];
    liste_de_prix_unit[1] = [1.5, 7, 20, 2.5, 25, 2, 15, 8];
    liste_de_prix_unit[2] = [1.25, 1.5, 2, 0.5, 5, 4.5, 3];
    liste_de_prix_unit[3] = [2, 2.5, 1.25, 1.5, 4, 7, 12, 3];
    liste_de_prix_unit[4] = [0.5, 5, 7, 13.5, 10, 15, 20];
    for (
      let i = 0,
      x,
      y,
      z,
      pu,
      n,
      p,
      somme,
      prenoms,
      index1,
      index2,
      objet,
      met,
      texte,
      texte_corr,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      index1 = liste_index[i];
      prenoms = [prenomF(), prenomM()];
      index2 = randint(0, liste_de_choses[index1].length - 1);
      objet = liste_de_choses[index1][index2];
      pu =
        liste_de_prix_unit[index1][index2] *
        (1 + randint(1, 2) * 0.2 * randint(-1, 1));
      n = randint(3, 6);
      y = n * randint(2, 5);
      x = calcul(n * pu, 2);
      somme = calcul(y * pu, 2);
      met = false;
      while (met == false) {
        p = n * randint(2, 5);
        if (p != y) met = true;
      }
      z = calcul(p * pu, 2);

      texte = `${prenoms[0]} a repéré ${liste_de_lieux[index1]} des ${objet} qui l\'intéressent.<br> `;
      texte += `Elle lit que ${n} ${objet} coûtent ${tex_prix(x)} €. `;
      texte += `Elle veut en acheter ${y}.<br> Combien va-t-elle dépenser ?<br>`;
      texte_corr = `${y} ${objet}, c'est ${texte_en_couleur(
        tex_nombrec(y / n)
      )} fois ${texte_en_couleur(
        n,
        "blue"
      )} ${objet}.<br> Si ${texte_en_couleur(
        n,
        "blue"
      )} ${objet} coûtent ${tex_prix(x)} €, alors ${texte_en_couleur(
        tex_nombrec(y / n)
      )} fois ${texte_en_couleur(
        n,
        "blue"
      )} ${objet} coutent ${texte_en_couleur(
        tex_nombrec(y / n)
      )} fois ${tex_prix(x)} €.<br>`;
      texte_corr += `Donc ${prenoms[0]} dépensera ${texte_en_couleur(
        tex_nombrec(y / n)
      )} $\\times$ ${tex_prix(x)} € = ${tex_prix(somme)} €.<br>`;
      texte += `${prenoms[1]
        } veut lui aussi acheter ces ${objet}. Il dispose de ${tex_prix(
          z
        )} €.<br> Combien peut-il en acheter ?<br>`;
      texte_corr += `${tex_prix(z)} €, c'est ${texte_en_couleur(
        tex_nombrec(z / x)
      )} fois ${tex_prix(x)} €.<br> Si avec ${tex_prix(
        x
      )} € on peut acheter ${texte_en_couleur(
        n,
        "blue"
      )} ${objet}, alors avec ${texte_en_couleur(
        tex_nombrec(z / x)
      )} fois ${tex_prix(x)} €, on peut acheter ${texte_en_couleur(
        tex_nombrec(z / x)
      )} fois ${texte_en_couleur(n, "blue")} ${objet}.<br>`;
      texte_corr += `Donc ${prenoms[1]} pourra acheter ${texte_en_couleur(
        tex_nombrec(z / x)
      )} $\\times$ ${texte_en_couleur(n, "blue")} = ${p} ${objet}.<br>`;
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
}

