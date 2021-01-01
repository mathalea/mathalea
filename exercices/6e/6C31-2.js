import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,tex_nombre,num_alpha} from "/modules/outils.js"
/**
 * Donner des valeurs approchées d'un quotient décimale.
 *
 * 
 * @Auteur Rémi Angot
 * Référence 6C31-2
 * 2020-12-07
 */
export default function Valeur_approchee_division_decimale() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Donner des valeurs approchées d'un quotient décimal";
  this.consigne = "Compléter les phrases suivantes.";
  this.nb_questions = 1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;)
     {
      // Une fraction irréductible avec un dénominateur qui comporte un facteur différent de 2 ou de 5
      // aura une écriture décimale périodique infinie
      let k1 = choice([3,7,11,13]);
      let k2 = choice([3,7,11,13],k1);
      let a = choice([3,5,7,11,13],[k1,k2])*choice([3,5,7,11,13],[k1,k2])
      let b = k1*k2
      let q = math.round(a/b,6)
      texte = `On sait que $${a}\\div${b}\\approx${tex_nombre(q)}$.`;
      let liste_de_questions1 = [
        [`La valeur approchée par défaut de $${a}\\div${b}$ au dixième près est : `, math.floor(a/b,1)], 
        [`La valeur approchée par excès de $${a}\\div${b}$ au dixième près est : `, math.ceil(a/b,1)], 
        [`La valeur approchée par défaut de $${a}\\div${b}$ au centième près est : `, math.floor(a/b,2)],
        [`La troncature de $${a}\\div${b}$ au centième près est : `, math.floor(a/b,2)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au centième près est : `, math.ceil(a/b,2)],
        [`La valeur approchée par défaut de $${a}\\div${b}$ au millième près est : `, math.floor(a/b,3)],
        [`La troncature de $${a}\\div${b}$ au millième près est : `, math.floor(a/b,3)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au millième près est : `, math.ceil(a/b,3)],
      ]
      let liste_de_questions2 = [
        [`La valeur approchée de $${a}\\div${b}$ au dixième près est : `, math.round(a/b,1)],
        [`La valeur approchée de $${a}\\div${b}$ au centième près est : `, math.round(a/b,2)],
        [`La valeur approchée de $${a}\\div${b}$ au millième près est : `, math.round(a/b,3)],
      ]

      texte_corr = `On sait que $${a}\\div${b}\\approx${tex_nombre(q)}$.`;
      // Questions peuvent être défaut, excès ou excès, défaut ou troncature, excès ou excès, troncature
      let choix = randint(1,4);
      switch (choix) {
        case 1:
          texte+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[0][0]}\\ldots`
          texte+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[4][0]}\\ldots`
          texte_corr+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[0][0]} $ ${tex_nombre(liste_de_questions1[0][1])}$`
          texte_corr+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[4][0]} $ ${tex_nombre(liste_de_questions1[4][1])}$`
          break;
        case 2:
          texte+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[1][0]}\\ldots`
          texte+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[5][0]}\\ldots`
          texte_corr+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[1][0]} $ ${tex_nombre(liste_de_questions1[1][1])}$`
          texte_corr+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[5][0]} $ ${tex_nombre(liste_de_questions1[5][1])}$`
          break;
        case 3:
          texte+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[3][0]}\\ldots`
          texte+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[7][0]}\\ldots`
          texte_corr+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[3][0]} $ ${tex_nombre(liste_de_questions1[3][1])}$`
          texte_corr+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[7][0]} $ ${tex_nombre(liste_de_questions1[7][1])}$`
          break;
        case 4:
          texte+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[4][0]}\\ldots`
          texte+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[7][0]}\\ldots`
          texte_corr+= `<br><br> ${num_alpha(0)} ${liste_de_questions1[4][0]} $ ${tex_nombre(liste_de_questions1[4][1])}$`
          texte_corr+= `<br><br> ${num_alpha(1)} ${liste_de_questions1[7][0]} $ ${tex_nombre(liste_de_questions1[7][1])}$`
          break;
      }
      shuffle(liste_de_questions2)
      
      texte+= `<br><br> ${num_alpha(2)} ${liste_de_questions2[0][0]}\\ldots`
      texte+= `<br><br> ${num_alpha(3)} ${liste_de_questions2[1][0]}\\ldots`
      
      
      texte_corr+= `<br><br> ${num_alpha(2)} ${liste_de_questions2[0][0]} $ ${tex_nombre(liste_de_questions2[0][1])}$`
      texte_corr+= `<br><br> ${num_alpha(3)} ${liste_de_questions2[1][0]} $ ${tex_nombre(liste_de_questions2[1][1])}$`

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
}

