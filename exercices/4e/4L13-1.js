import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,prenom,texte_en_couleur} from "/modules/outils.js"
/**
 * Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue
 * * 4L13-1
 * @author Sébastien Lozano
 */
export default function Forme_litterale_introduire_une_lettre() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 3;
  } else {
    this.nb_questions = 2;
  };

  this.titre = "Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue";
  this.consigne = "Exprimer le prix total de l'achat, en fonction des lettres introduites dans l'énoncé.";

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  //sortie_html? this.spacing = 3 : this.spacing = 2; 
  //sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.debug) {
      type_de_questions_disponibles = [1];
    } else {
      type_de_questions_disponibles = [1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    type_de_questions_disponibles = [1];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    //let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

      // une fonction pour gérer le pluriel 
      function pluriel(n, obj) {
        if (n > 1) {
          return obj.plur
        } else {
          return obj.sing
        };
      };

      // une fonction pour gérer la chaine de sortie et supprimer le coeff 1 !
      function sliceUn(n) {
        if (n == 1) {
          return ``;
        } else {
          return `${n}`;
        };
      };

      // on definit un tableau de couples possibles			
      let situations = [
        { prenom: prenom(), elt1: { lettre: 'c', article: 'un', sing: 'crayon', plur: 'crayons' }, elt2: { lettre: 'g', article: 'une', sing: 'gomme', plur: 'gommes' } },
        { prenom: prenom(), elt1: { lettre: 'r', article: 'une', sing: 'règle', plur: 'règles' }, elt2: { lettre: 'e', article: 'une', sing: 'équerre', plur: 'équerres' } },
        { prenom: prenom(), elt1: { lettre: 'p', article: 'une', sing: 'poire', plur: 'poires' }, elt2: { lettre: 'b', article: 'une', sing: 'banane', plur: 'bananes' } },
        { prenom: prenom(), elt1: { lettre: 'c', article: 'un', sing: 'couteau', plur: 'couteaux' }, elt2: { lettre: 'f', article: 'une', sing: 'fourchette', plur: 'fourchettes' } },
        { prenom: prenom(), elt1: { lettre: 'm', article: 'un', sing: 'marteau', plur: 'marteaux' }, elt2: { lettre: 'e', article: 'une', sing: 'enclume', plur: 'enclumes' } },
      ]
      let enonces = [];
      let n = randint(1, 6);
      let p = randint(1, 6);
      let situation = situations[randint(0, situations.length - 1)];
      enonces.push({
        enonce: `${situation.prenom} veut acheter ${n} ${pluriel(n, situation.elt1)} et ${p} ${pluriel(p, situation.elt2)}.
				<br>On note $${situation.elt1.lettre}$	le prix d'${situation.elt1.article} ${situation.elt1.sing} et $${situation.elt2.lettre}$	le prix d'${situation.elt2.article} ${situation.elt2.sing}.`,
        question: ``,
        correction: `
        ${situation.prenom} va payer $${n}$ fois le prix d'${situation.elt1.article} ${situation.elt1.sing} et $${p}$ fois le prix d'${situation.elt2.article} ${situation.elt2.sing}.
        <br> C'est à dire $${n}\\times ${situation.elt1.lettre} + ${p}\\times ${situation.elt2.lettre} = ${sliceUn(n)}${situation.elt1.lettre} + ${sliceUn(p)}${situation.elt2.lettre}$.
        <br>${texte_en_couleur(`Donc le prix total de l'achat est  $${sliceUn(n)}${situation.elt1.lettre} + ${sliceUn(p)}${situation.elt2.lettre}$.`)}
        `
      })
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
}

