import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,tex_nombrec,obtenir_liste_facteurs_premiers,choice,combinaison_listes} from "/modules/outils.js"

/**
 * Additions à trou dans les relatifs
 *
 *  @Auteur Jean-Claude Lhote à partir de CM000 de Rémi Angot
 * Référence 5R10
 */
export default function Deviner_nombre_relatif() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
   this.titre = "Deviner un nombre relatif";
  this.consigne = "Qui suis-je ?";
  this.spacing = 2;
  this.nb_questions=3;
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles=[1,2,3]
    let liste_type_de_questions=combinaison_listes(type_de_questions_disponibles,this.nb_questions)
    let dixieme,signe,centieme,unite,somme,produit,facteurs,type=['négatif','nul','positif'];
    for (let i = 0, texte, texte_corr,cpt=0; i < this.nb_questions;) {
        signe=choice([-1,1])
        switch (liste_type_de_questions[i]) {
        case 1:
            unite=randint(1,9)
            somme=randint(unite+1,unite+9)
            dixieme=somme-unite
            centieme=0
          texte = `Je suis un nombre ${type[signe+1]} dont la distance à zéro est comprise entre ${unite} et ${unite+1}.<br>`
          texte+=`On m'écrit avec deux chiffres dont la somme est ${somme}.<br>Qui suis-je ?`;
        break

        case 2:
            unite=randint(1,9)
            somme=randint(unite+1,unite+9)
            dixieme=somme-unite
            centieme=0
          texte = `Je suis un nombre dont l'opposé est compris entre `
          if (signe<0) {
              texte+=`$${unite}$ et $${unite+1}$.<br>`
          }
          else {
            texte+=`$${-unite-1}$ et $${-unite}$.<br>`
          } 
          texte+=`La somme de mes deux chiffres est $${somme}$.<br>Qui suis-je ?`;
        break

        case 3:
            produit=choice([6,10,15])
            facteurs=obtenir_liste_facteurs_premiers(produit)
            facteurs.push(1)
            facteurs=shuffle(facteurs)
            unite=facteurs[0]
            dixieme=facteurs[1]
            centieme=facteurs[2]
            texte = `Je suis un nombre ${type[signe+1]} dont la distance à zéro est comprise entre ${unite} et ${unite+1}.<br>`
            texte+=`Le produit de mes trois chiffres vaut ${produit}.<br>`
            if (dixieme<centieme) {
                texte+=`Mon chiffre des centièmes est supérieur à mon chiffre des dixièmes.`
            }
            else {
                texte+=`Mon chiffre des centièmes est inférieur à mon chiffre des dixièmes.`
            }
             texte+=` Qui suis-je ?`;
         break

        case 4: 
        break

      }
      texte_corr = `Je suis $${tex_nombrec(signe*(unite+dixieme/10+centieme/100))}$.`;

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
    }
    liste_de_question_to_contenu(this);
  };
//  this.besoin_formulaire_numerique = ["Niveau de difficulté",2,"1 : Nombres entiers\n2 : Nombres décimaux"]; 
//  this.besoin_formulaire2_numerique = ["Valeur maximale", 9999]
//  this.besoin_formulaire3_numerique = ["Type d'égalité",2,"1 : Égalité à trou\n2 : Équation"]; 
}