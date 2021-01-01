import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,signe,tex_nombre,mise_en_evidence,arcenciel} from "/modules/outils.js"

/**
 * 1N11
 * @Auteur Gaelle Morvan
 */
export default function Terme_d_une_suite_definie_par_recurrence() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Déterminer les termes d'une suite définie par récurrence";
  this.consigne = "Une suite étant donnée, calculer le terme demandé.";
  this.nb_questions = 4;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Vide la liste de questions
    this.liste_corrections = []; // Vide la liste de questions corrigées

    let type_de_questions_disponibles = [1, 2, 3, 4];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texte_corr, cpt = 0, u, a, b, k; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case 1: //suite arithmétique
          a = randint(1, 10) * choice([-1, 1]);
          u = randint(0, 10) * choice([-1, 1]);
          k = randint(2, 10);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = u_n ${ecriture_algebrique(a)}$.`;

          texte += `<br>Calculer $u_{${k}}$.`;

          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_{${k}}$ :`;
          for (let indice = 0; indice < k; indice++) {
            texte_corr += `<br> $u_{${indice + 1}} = ${mise_en_evidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecriture_algebrique(a)} = 
              ${mise_en_evidence(u, arcenciel(indice, true))} + ${a} = ${mise_en_evidence(u + a, arcenciel(indice + 1, true))}$`;
            u = u + a;
          }
          break;

        case 2: //suite géométrique
          a = randint(2, 5) * choice([-1, 1]);
          u = randint(1, 9) * choice([-1, 1]);
          k = randint(2, 6);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = u_n \\times ${ecriture_parenthese_si_negatif(a)}$.`;

          texte += `<br>Calculer $u_{${k}}$.`;

          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`;
          for (let indice = 0; indice < k; indice++) {
            texte_corr += `<br> $u_{${indice + 1}} = ${mise_en_evidence('u_{' + indice + '}', arcenciel(indice, true))} \\times ${ecriture_parenthese_si_negatif(a)} = 
              ${mise_en_evidence(u, arcenciel(indice, true))} \\times ${ecriture_parenthese_si_negatif(a)} = ${mise_en_evidence(u * a, arcenciel(indice + 1, true))}$`;
            u = u * a;
          }
          break;

        case 3: //suite arithmético-géométrique
          a = randint(2, 5) * choice([-1, 1]);
          b = randint(1, 5) * choice([-1, 1]);
          u = randint(1, 5) * choice([-1, 1]);
          k = randint(2, 6);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} u_n ${ecriture_algebrique(b)}$.`;

          texte += `<br>Calculer $u_{${k}}$.`;

          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`;
          for (let indice = 0; indice < k; indice++) {
            texte_corr += `<br> $u_{${indice + 1}} = ${a}\\times ${mise_en_evidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecriture_algebrique(b)}=`;
            texte_corr += `${a} \\times ${ecriture_parenthese_si_negatif(mise_en_evidence(u, arcenciel(indice, true)))} ${ecriture_algebrique(b)} = 
            ${mise_en_evidence(a * u + b, arcenciel(indice + 1, true))}$`;
            u = u * a + b;
          }
          break;

        case 4: // suite de la forme u(n+1) = a +- u(n)^2
          a = randint(1, 5) * choice([-1, 1]);
          b = choice([-1, 1]);
          u = randint(1, 5) * choice([-1, 1]);
          k = randint(2, 3);

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} ${signe(b)} u_n^2$.`;

          texte += `<br>Calculer $u_{${k}}$.`;

          texte_corr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`;
          for (let indice = 0; indice < k; indice++) {
            texte_corr += `<br> $u_{${indice + 1}} = ${a} ${signe(b)} (${mise_en_evidence('u_{' + indice + '}', arcenciel(indice, true))})^2=`;
            texte_corr += `${a} ${signe(b)} ${ecriture_parenthese_si_negatif(mise_en_evidence(u, arcenciel(indice, true)))}^2 = 
              ${mise_en_evidence(tex_nombre(a + b * u * u), arcenciel(indice + 1, true))}$`;
            u = a + b * u * u;
          }
          break;
      }


      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte); // Sinon on enregistre la question dans liste_questions
        this.liste_corrections.push(texte_corr); // On fait pareil pour la correction
        i++; // On passe à la question suivante
      }
      cpt++; // Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
    }
    liste_de_question_to_contenu(this); // La liste de question et la liste de la correction
  };
}
