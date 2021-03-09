import Operation from '/modules/operations.js';
import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, combinaison_listes, calcul, tex_nombrec, tex_nombre,export_QCM_AMC } from "/modules/outils.js"
/**
 * Additions et soustractions de nombres décimaux
 * * xxx-xx,x
 * * xxx-xx,xx
 * * xxx,x-xxx
 * * x0x-xx9,x
 * * xxx+xx,x
 * * xxx+xx,xx
 * * xxx,x+xxx
 * * x0x+xx9,x
 * @Auteur Rémi Angot
 * Référence 6C20
 */
export default function Additionner_soustraires_decimaux() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Additions et soustractions de nombres décimaux";
  this.consigne = "Poser et effectuer les calculs suivants.";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon les opérations posées ne sont pas jolies
  this.nb_questions = 4;
  this.sup = 3;
  this.tailleDiaporama = 100;
  this.QCM = ['6C20', [], 'Poser et effectuer les calculs suivants']
 
  this.nouvelle_version = function () {
    this.QCM[1]=[]
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions
    let liste_de_type_d_additions = combinaison_listes(
      [5, 6, 7, 8],
      this.nb_questions
    );
    let liste_de_type_de_soustractions = combinaison_listes(
      [1, 2, 3, 4],
      this.nb_questions
    );
    let liste_type_de_questions = [];
    if (this.sup == 1) {
      liste_type_de_questions = combinaison_listes([5, 6, 7, 8], this.nb_questions)
    } else if (this.sup == 2) {
      liste_type_de_questions = combinaison_listes([1, 2, 3, 4], this.nb_questions)
    } else {
      for (let i = 0; i < this.nb_questions; i++) {
        if (i + 1 <= this.nb_questions / 2) {
          // première moitié sont des additions mais si c'est impair on prendra plus de soustractions
          liste_type_de_questions.push(liste_de_type_d_additions[i]);
        } else {
          liste_type_de_questions.push(liste_de_type_de_soustractions[i]);
        }
      }
    }

    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // xxx-xx,x
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10);
          texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 2: // xxx-xx,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          );
          texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 3: // xxx,x-xxx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          );
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9);
          texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 4: // x0x-xx9,x
          a = calcul(randint(5, 9) * 100 + randint(1, 5));
          b = calcul(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10
          );
          texte = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 5: // xxx+xx,x
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10);
          texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
        case 6: // xxx+xx,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          );
          texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
        case 7: // xxx,x+xxx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          );
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9);
          texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
        case 8: // x0x+xx9,x
          a = calcul(randint(5, 9) * 100 + randint(1, 5));
          b = calcul(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10
          );
          texte = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
          texte_corr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        this.QCM[1].push([texte, [texte_corr], [4]])
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté", 3, "1 : Additions de décimaux\n2: Soustraction de décimaux\n3 : Additions et soustraction de décimaux"];
}

