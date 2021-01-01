import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,ecriture_nombre_relatif,texte_en_couleur_et_gras,Relatif} from "/modules/outils.js"

/**
 * Signe d'un produit ou d'on quotient de relatifs
 * Plusieurs niveaux 2, 3 ou 4 factieurs, un quotient de 2 nombres, 1  nombre sur un produit de deux nombres, un prooduit de 2 nombres sur un nombre, un quotient de produit de 2 nombres
 * 4C10-0 exercice parent de 4C10-1 et 4C10-2
 * 4C10-0 contient tous les cas
 * Dans ces exercices je me servais de this.beta pour faire passer l'exo de beta.html à mathalea.html
 * this.beta pouvait prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug

 * @author Sébastien Lozano
 */
export default function Signe_produit_quotient_relatifs() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = `Signe d'un produit ou d'un quotient de nombres relatifs`;
  this.consigne = `Donner le signe des expressions numériques.`;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions_modifiable = false;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
    if (this.exo == this.beta + "4C10-1") {
      // signe d'un produit
      switch (this.sup) {
        case 1: // 2 facteurs
          type_de_questions_disponibles = [1, 1, 1];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 2: // 3 facteurs
          type_de_questions_disponibles = [2, 2, 2];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 3: // 4 facteurs
          type_de_questions_disponibles = [3, 3, 3];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 4: // Mélange
          type_de_questions_disponibles = [1, 2, 3];
          this.nb_questions = type_de_questions_disponibles.length;
          break;
      }
    } else if (this.exo == this.beta + "4C10-2") {
      // signe d'un quotient
      switch (this.sup) {
        case 1: // quotient de 2 nombres
          type_de_questions_disponibles = [4, 4, 4];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 2: // quotient d'1 nombre sur un produit de 2 nombres
          type_de_questions_disponibles = [5, 5, 5];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 3: // quotient d'1 produit de 2 nombres sur 1 nombre
          type_de_questions_disponibles = [6, 6, 6];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 4: // quotient de 2 produits de 2 nombres
          type_de_questions_disponibles = [7, 7, 7];
          //this.nb_questions = type_de_questions_disponibles.length;
          this.nb_questions = 3;
          break;
        case 5: // Mélange
          type_de_questions_disponibles = [4, 5, 6, 7];
          this.nb_questions = type_de_questions_disponibles.length;
          break;
      }
    } else {
      // signe d'un produit et/ou d'un quotient
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7];
      this.nb_questions = type_de_questions_disponibles.length;
    }

    //let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = type_de_questions_disponibles; // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // on ne choisit que des nombres compris entre 1 et 20
      let nb_max = 20;
      // Le tableau des relatifs necessaires, il m'en faut max 4 !
      let num = new Relatif(
        randint(-1, 1, [0]) * randint(1, nb_max),
        randint(-1, 1, [0]) * randint(1, nb_max),
        randint(-1, 1, [0]) * randint(1, nb_max),
        randint(-1, 1, [0]) * randint(1, nb_max)
      );

      switch (liste_type_de_questions[i]) {
        case 1: // 2 facteurs
          texte = `$ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[1])} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]} et $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}.`;
          texte_corr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1]
          )}`;
          texte_corr += `<br>Donc $ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(num.relatifs[0], num.relatifs[1])
          )}.`;
          break;
        case 2: // 3 facteurs
          texte = `$ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[2])} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}`;
          texte_corr += ` et $ ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`;
          texte_corr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`;
          texte_corr += `<br>Donc $ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`;
          break;
        case 3: // 4 facteurs
          texte = `$ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[3])} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}, `;
          texte_corr += `$ ${ecriture_nombre_relatif(num.relatifs[2])} $ est ${num.getSigneString()[2]} et $ ${ecriture_nombre_relatif(num.relatifs[3])} $ est ${num.getSigneString()[3]}.`;
          texte_corr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2],
            num.relatifs[3]
          )}`;
          texte_corr += `<br>Donc $ ${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[3]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2],
              num.relatifs[3]
            )
          )}.`;
          break;
        case 4: // quotient de 2 nombres
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(num.relatifs[1])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]} et $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[1]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(num.relatifs[0], num.relatifs[1])
          )}.`;
          break;
        case 5: // quotient d'1 nombre sur un produit de 2 nombres
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[2])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}`;
          texte_corr += ` et $ ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[1]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[2]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`;
          break;
        case 6: // quotient d'1 produit de 2 nombres sur 1 nombre
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(num.relatifs[2])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}`;
          texte_corr += ` et $ ${ecriture_nombre_relatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[2]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`;
          break;
        case 7: // quotient de 2 produits de 2 nombres
          texte = `$ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(num.relatifs[3])}} $`;
          texte_corr = `$ ${ecriture_nombre_relatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecriture_nombre_relatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}, `;
          texte_corr += `$ ${ecriture_nombre_relatif(num.relatifs[2])} $ est ${num.getSigneString()[2]} et $ ${ecriture_nombre_relatif(num.relatifs[3])} $ est ${num.getSigneString()[3]}.`;
          texte_corr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2],
            num.relatifs[3]
          )}`;
          texte_corr += `<br>Donc $ \\dfrac{${ecriture_nombre_relatif(
            num.relatifs[0]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[1]
          )}}{${ecriture_nombre_relatif(
            num.relatifs[2]
          )} \\times ${ecriture_nombre_relatif(
            num.relatifs[3]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2],
              num.relatifs[3]
            )
          )}.`;
          break;
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}
