import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,ecriture_parenthese_si_moins,lettre_depuis_chiffre} from "/modules/outils.js"
/**
 * Réduire, si possible, une expression littérale simple
 * 
 * * ax+b
 * * a+bx
 * * ax-a
 * * ax+bx
 * * ax+x
 * * ax×b
 * * a×bx
 * * ax×bx
 * * ax+0
 * * ax×0
 * * ax^2×x
 * * ax^2-a
 * * ax^2-ax
 * 
 * 
 * @Auteur Rémi Angot
 * 4L10-1
 */
export default function Reductions_pieges_classiques() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Réduire, si possible, une expression littérale simple";
  this.consigne = "Réduire, si possible, les expressions suivantes";
  this.spacing = 1;
  this.nb_questions = 10;
  this.sup = true;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [
      'ax+b',
      'a+bx',
      'ax-a',
      'ax+bx',
      'ax+x',
      'ax×b',
      'a×bx',
      'ax×bx',
      'ax+0',
      'ax×0',
      'ax^2×x',
      'ax^2-a',
      'ax^2-ax^2'
    ];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions),type_de_questions; // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, a, b, cpt = 0; i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];
      a = randint(2, 11)
      b = randint(2, 11)
      if (this.sup) {
        a *= choice([-1, 1])
        b *= choice([-1, 1])
      }
      switch (type_de_questions) {
        case "ax+b":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x${ecriture_algebrique(b)}$`
          texte_corr = texte
          break;
        case "a+bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}${ecriture_algebrique(b)}x$`
          texte_corr = texte
          break;
        case "ax-a":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${Math.abs(a)}x-${Math.abs(a)}$`
          texte_corr = texte
          break;
        case "ax+bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x${ecriture_algebrique(b)}x$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x${ecriture_algebrique(b)}x=${a + b}x$`
          break;
        case "ax+x":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x+x$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x+x=${a + 1}x$`
          break;
        case "ax×b":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times${ecriture_parenthese_si_negatif(b)}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times${ecriture_parenthese_si_negatif(b)}=${a * b}x$`
          break;
        case "a×bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}\\times${ecriture_parenthese_si_moins(b + 'x')}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}\\times${ecriture_parenthese_si_moins(b + 'x')}=${a * b}x$`
          break;
        case "ax×bx":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x')}\\times${ecriture_parenthese_si_moins(b + 'x')}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x')}\\times${ecriture_parenthese_si_moins(b + 'x')}=${a * b}x^2$`
          break;
        case "ax+0":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x+0$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x+0=${a}x$`
          break;
        case "ax×0":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times 0$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x\\times 0=0$`
          break;
        case "ax^2×x":
          texte = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}\\times x$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}\\times x=${ecriture_parenthese_si_moins(a + 'x^3')}$`
          break;
        case "ax^2-a":
          a = Math.abs(a)
          texte = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}-${a}$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${ecriture_parenthese_si_moins(a + 'x^2')}-${a}$`
          break;
        case "ax^2-ax^2":
          a = Math.abs(a)
          texte = `$${lettre_depuis_chiffre(i + 1)}=${a}x^2-${a}x^2$`
          texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${a}x^2-${a}x^2=0$`
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
  this.besoin_formulaire_case_a_cocher = ['Avec des nombres relatifs']
}

