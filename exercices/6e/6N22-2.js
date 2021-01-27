import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import {mathalea2d} from "/modules/2d.js"
import{fraction} from "/modules/Fractions.js"
/**
 * Représenter une somme de fracions de même dénominateur sur un segment gradué de façon adaptée.
 * @Auteur Jean-Claude Lhote
 * 6N14-2
 */
export default function Ajouter_des_fractions_d_unite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Mettre bout à bout des segments";
  this.consigne = "";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 3;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let ppc, sc, objets;
    ppc = 20;
    if (sortie_html) {
      sc = 0.5;
    } else {
      sc = 0.3;
    }

    let params, den, num = [0, 0, 0, 0], f = [];

    let liste = combinaison_listes([5, 6, 7, 8], this.nb_questions);

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      objets = [];
      den = liste[i];
      num[0] = randint(1, den - 1);
      num[1] = randint(1, den - 1, num[0]);
      num[2] = randint(1, den - 1, num[1]);
      num[3] = randint(1, den - 1, [num[2], num[0]]);
      for (let j = 0; j < 4; j++)
        f[j] = fraction(num[j], den);


      texte = `On place bout à bout 4 segments de longueurs respectives$ ${f[0].texFraction}$, $${f[1].texFraction}$, $${f[2].texFraction}$ et $${f[3].texFraction}$.<br>`;
      texte += `Quelle est la longueur du segment obtenu ?`;
      texte_corr = `Voici sur ces dessins, coloriés en rouge, les différents segments :<br>`;
      for (let j = 0; j < 4; j++)
        objets.push(f[j].representation(0, 5 - j * 1.25, 5, 0, 'segment', 'red', 0, 1, 1));
      params = {
        xmin: -0.4,
        ymin: -1.5,
        xmax: 6,
        ymax: 6,
        pixelsParCm: ppc,
        scale: 0.5,
      };
      texte_corr += mathalea2d(params, ...objets);
      texte_corr += `<br>Ce qui donne en les mettant bout à bout :<br>`;
      params = {
        xmin: -0.4,
        ymin: -1.5,
        xmax: 20,
        ymax: 1,
        pixelsParCm: ppc,
        scale: sc,
      };
      texte_corr += mathalea2d(params, fraction(num[0] + num[1] + num[2] + num[3], den).representation(0, 0, 5, 0, 'segment', 'red', 0, 1, 0.6));
      texte_corr += `<br>La longueur du segment ainsi obtenu est : $${fraction(num[0] + num[1] + num[2] + num[3], den).texFraction}$`;
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
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];
}
