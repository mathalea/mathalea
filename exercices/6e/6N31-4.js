import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,calcul,tex_nombre,info_message} from "/modules/outils.js"
/**
 * Intercaler un nombre décimal entre deux décimaux
 * @Auteur Rémi Angot
 * Référence 6N31-4
*/
export default function Intercaler_decimal_entre_2_decimaux() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Intercaler un nombre décimal entre deux nombres décimaux";
    this.consigne = "Compléter avec un nombre décimal";
    this.nb_questions = 6;
    this.nb_cols = 2; // Nombre de colonnes pour la sortie LaTeX
    this.nb_cols_corr = 2; // Nombre de colonnes dans la correction pour la sortie LaTeX
  
    this.nouvelle_version = function () {
      this.liste_questions = []; // Liste de questions
      this.liste_corrections = []; // Liste de questions corrigées

      let liste_type_de_questions_disponibles = ["a,b1", "a,b2", "a,9", "a,bc", "a,b9", "a,99", "a,b0c", "a,1", "a,01", "a"];
      let liste_type_de_questions = combinaison_listes(liste_type_de_questions_disponibles, this.nb_questions);
      for (let i = 0, texte, texte_corr, a, b, r, u, d1, c1, c2, cpt = 0; i < this.nb_questions && cpt < 50; ) {
          switch (liste_type_de_questions[i]) {
              case "a,b1":
                  d1 = randint(1, 6);
                  u = randint(1, 39);
                  a = calcul(u + d1 / 10);
                  b = calcul(u + randint(d1 + 2, 9) / 10);
                  r = calcul(a + 1 / 10);
                  break;
              case "a,b2":
                  d1 = randint(1, 8);
                  u = randint(1, 39);
                  a = calcul(u + d1 / 10);
                  b = calcul(u + (d1 + 1) / 10);
                  r = calcul(a + 5 / 100);
                  break;
              case "a,9":
                  a = calcul(randint(1, 39) + 9 / 10);
                  b = calcul(a + 1 / 10);
                  r = calcul(a + 5 / 100);
                  break;
              case "a,bc":
                  u = randint(1, 39);
                  d1 = randint(1, 9);
                  c1 = randint(1, 8);
                  c2 = c1 + 1;
                  a = calcul(u + d1 / 10 + c1 / 100);
                  b = calcul(u + d1 / 10 + c2 / 100);
                  r = calcul(a + 5 / 1000);
                  break;
              case "a,b9":
                  u = randint(1, 39);
                  d1 = randint(1, 9);
                  c1 = 9;
                  a = calcul(u + d1 / 10 + c1 / 100);
                  b = calcul(u + (d1 + 1) / 10);
                  r = calcul(a + 5 / 1000);
                  break;
              case "a,99":
                  u = randint(1, 39);
                  a = calcul(u + 99 / 100);
                  b = u + 1;
                  r = calcul(a + 5 / 1000);
                  break;
              case "a,b0c":
                  u = randint(1, 39);
                  d1 = randint(1, 6);
                  c1 = randint(1, 8);
                  c2 = c1 + 1;
                  a = calcul(u + d1 / 10 + c1 / 1000);
                  b = calcul(u + randint(d1+1,9)/ 10);
                  if (calcul(b-a)>.1){
                    r = calcul(u + (d1+1)/10);
                  }else {
                    r = calcul(u + (d1)/10+1/100);
                  }
                  break;
              case "a,1":
                  u = randint(1, 39);
                  d1 = 1;
                  a = calcul(u);
                  b = calcul(u + d1 / 10);
                  r = calcul(u + 5 / 100);
                  break;

              case "a,01":
                  u = randint(1, 39);
                  c1 = 1;
                  a = calcul(u);
                  b = calcul(u + c1 / 100);
                  r = calcul(u + 5 / 1000);
                  break;

              case "a":
                  a = randint(1, 39);
                  b = a + 1;
                  r = calcul(a + 1 / 10);
                  break;
          }
          texte = `$${tex_nombre(a)}<\\ldots\\ldots<${tex_nombre(b)}$`;
          texte_corr = `$${tex_nombre(a)}<${tex_nombre(r)}<${tex_nombre(b)}$`;

          if (this.liste_questions.indexOf(texte) == -1) {
              // Si la question n'a jamais été posée, on en crée une autre
              this.liste_questions.push(texte);
              this.liste_corrections.push(texte_corr);
              i++;
          }
          cpt++;
      }
      liste_de_question_to_contenu(this);
      if (sortie_html){
        this.contenu_correction = info_message({ titre: "Remarque", texte: "Il y a une infinité de solutions. La correction ne montre qu'une possibilité.", couleur: "black" }) + this.contenu_correction;
      }
    };
  }


