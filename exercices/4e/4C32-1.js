import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombrec,tex_nombre,mise_en_evidence} from "/modules/outils.js"
/**
 * type 1 : Un nombre est donné par le produit d'un décimal par une puissance de dix, il faut l'écrire en notation scientifique
 * type 2 : On donne la notation scientifique d'un nombre et on doit trouver l'exposant manquant de 10 dans le membre de gauche.
 * @Auteur Jean-Claude Lhote 
 * 4C32-1
 */
export default function Calculs_avec_puissances_de_dix() {
  "use strict"
  Exercice.call(this)
  this.sup = 1;
  this.sup2 = 1;
  this.titre = `Calcul avec les puissances de dix`;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions = 5

  this.nouvelle_version = function () {
    if (this.sup == 1) this.consigne = `Donner l\'écriture scientifique des nombres suivants.`;
    else this.consigne = `Compléter l'égalité des nombres suivants.`;
    let type_de_questions_disponibles;
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    if (this.sup2 == 1) type_de_questions_disponibles = [0, 0, 0, 1, 1];
    else if (this.sup2 == 2) type_de_questions_disponibles = [0, 1, 1, 2, 2];
    else type_de_questions_disponibles = [2, 2, 3, 3, 3];

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    for (let i = 0, texte, texte_corr, nombre, mantisse1, exp1, decalage, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nb_questions && cpt < 50;) {
      //        nombre=calcul(randint(1001,9999)/10**randint(1,6))
      //      mantisse=calcul(nombre/10**(Math.floor(Math.log10(nombre))))
      //        exp=Math.floor(Math.log10(nombre))
      switch (liste_type_de_questions[i]) {
        case 0:
          decalage = randint(-1, 1, 0)
          mantisse = randint(1, 9)
          exp = randint(1, 5)
          break
        case 1:
          decalage = randint(-2, 2, 0)
          mantisse = calcul(randint(11, 99) / 10)
          exp = randint(1, 5)
          break;
        case 2:
          decalage = randint(-3, 3, 0)
          if (randint(0, 1) == 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          exp = randint(1, 7) * choice([-1, 1])
          break;
        case 3:
          decalage = randint(-4, 4, 0)
          if (randint(0, 1) == 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          exp = randint(3, 7) * choice([-1, 1])
          break;
      }
      nombre = calcul(mantisse * 10 ** exp)
      mantisse1 = calcul(mantisse * 10 ** decalage)
      exp1 = exp - decalage

      decimalstring = `${tex_nombrec(mantisse1)} \\times 10^{${exp1}}`
      scientifiquestring = `${tex_nombre(mantisse)} \\times 10^{${exp}}`
      if (this.sup == 1) {
        texte = `$${decimalstring}$`
        texte_corr = `$${mise_en_evidence(`${tex_nombrec(mantisse1)}`, 'blue')}\\times ${mise_en_evidence(`10^{${exp1}}`)} = ${mise_en_evidence(`${tex_nombre(mantisse)}\\times 10^{${decalage}}`, 'blue')}\\times  ${mise_en_evidence(`10^{${exp1}}`)} = ${scientifiquestring}$`
      }
      else {
        texte_corr = `$${mise_en_evidence(tex_nombre(mantisse1), 'blue')}\\times  ${mise_en_evidence(`10^{${exp1}}`)}=${mise_en_evidence(tex_nombre(mantisse) + `\\times 10^{${decalage}}`, 'blue')}\\times  ${mise_en_evidence(`10^{${exp1}}`)} =${scientifiquestring}$`
        texte = `$${tex_nombre(mantisse1)}\\times 10^{${mise_en_evidence(`....`)}}=${scientifiquestring}$`

      }
      if (this.liste_questions.indexOf(texte) == -1) {
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Type d\'exercices", 2, "1 : Traduire en notation scientifique\n2 : Exercice à trou"];
  this.besoin_formulaire2_numerique = ["Niveaux de difficulté", 3, "1 : Facile\n2 : Moyen\n3 : Difficile"];
}

