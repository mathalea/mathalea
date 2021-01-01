import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_nombrec} from "/modules/outils.js"
/**
 * Des questions sur le nombre ou le chiffre de centaines, de dizaines, de dixièmes, de centièmes...
 * @Auteur Rémi Angot
 * Référence 6N10-2
 */
export default function Decomposition_nombre_decimal() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Décomposer un nombre décimal (nombre de..., chiffre de...)";
  this.consigne = "Compléter les phrases suivantes.";
  this.nb_questions = 5;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [
      1,
      2,
      choice([3, 4, 5]),
      choice([6, 7, 8]),
      choice([9, 10]),
      choice([11, 12]),
    ]; // sans chevauchement ou avec chevauchement
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let m = randint(1, 9); // le nombre sera le même pour tout l'exercice
    let c = randint(0, 9, [m]);
    let d = randint(0, 9, [m, c]);
    let u = randint(0, 9, [m, c, d]);
    let di = randint(0, 9, [m, c, d, u]);
    let ci = randint(0, 9, [m, c, d, u, di]);
    let mi = randint(1, 9, [m, c, d, u, di, ci]);
    let n =
      m.toString() +
      "" +
      c.toString() +
      d.toString() +
      u.toString() +
      "," +
      di.toString() +
      ci.toString() +
      mi;
    //calcul ne semble pas marcher avec 7 chiffres significatifs
    this.consigne = `On considère le nombre $${n}$. Compléter les phrases suivantes.`;
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = "La partie entière de ce nombre est : ";
          texte_corr =
            texte + `$${tex_nombrec(m * 1000 + c * 100 + d * 10 + u)}$`;
          break;
        case 2:
          texte = "La partie décimale de ce nombre est : ";
          texte_corr =
            texte + `$${tex_nombrec(di / 10 + ci / 100 + mi / 1000)}$`;
          break;
        case 3:
          texte = "Le chiffre des dizaines de ce nombre est : ";
          texte_corr = texte + `$${d}$`;
          break;
        case 4:
          texte = "Le chiffre des centaines de ce nombre est : ";
          texte_corr = texte + `$${c}$`;
          break;
        case 5:
          texte = "Le chiffre des miliers de ce nombre est : ";
          texte_corr = texte + `$${m}$`;
          break;
        case 6:
          texte = "Le chiffre des dixièmes de ce nombre est : ";
          texte_corr = texte + `$${di}$`;
          break;
        case 7:
          texte = "Le chiffre des centièmes de ce nombre est : ";
          texte_corr = texte + `$${ci}$`;
          break;
        case 8:
          texte = "Le chiffre des millièmes de ce nombre est : ";
          texte_corr = texte + `$${mi}$`;
          break;
        case 9:
          texte = "Le nombre de dizaines de ce nombre est : ";
          texte_corr = texte + `$${tex_nombrec(d + c * 10 + m * 100)}$`;
          break;
        case 10:
          texte = "Le nombre de centaines de ce nombre est : ";
          texte_corr = texte + `$${tex_nombrec(c + m * 10)}$`;
          break;
        case 11:
          texte = "Le nombre de dixièmes de ce nombre est : ";
          texte_corr =
            texte +
            `$${tex_nombrec(di + u * 10 + d * 100 + c * 1000 + m * 10000)}$`;
          break;
        case 12:
          texte = "Le nombre de centièmes de ce nombre est : ";
          texte_corr =
            texte +
            `$${tex_nombrec(
              ci + di * 10 + u * 100 + d * 1000 + c * 10000 + m * 100000
            )}$`;
          break;
      }

      texte_corr += ".";
      texte += "\\ldots";
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

