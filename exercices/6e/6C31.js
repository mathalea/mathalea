import Exercice from '../ClasseExercice.js';
import Operation from '/modules/operations.js'
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombre} from "/modules/outils.js"
/**
 * Effectuer les divisions décimales suivantes et donner la valeur exacte de leur quotient.
 *
 * Niveau de difficulté 1 :
 * * entier divisé par 4 quotient : xx,25 ou xx,75
 * * entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
 * * entier divisé par 6 quotient : xxx,5
 * * quotient xx,xx division par 2, 3 , 4 ou 5
 * * quotient x,xxx division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 : division par 3, 7 ou 9
 * @Auteur Rémi Angot
 * Référence 6C31
 */
export default function Division_decimale() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Divisions décimales";
  this.consigne ="Effectuer les divisions décimales suivantes et donner la valeur exacte de leur quotient.";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon opdiv n'est pas joli
  this.nb_questions = 4;
  this.sup = 1;
  this.liste_packages = "xlop";

  this.nouvelle_version = function () {
    this.QCM=['6C31',[],'Divisions décimales',4]
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles

    this.sup == 1
      ? (type_de_questions_disponibles = [choice([1, 2, 3]), 4, 5, 6])
      : (type_de_questions_disponibles = [7, 8, 9]);
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let type_de_questions
    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, q;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // entier divisé par 4 quotient : xx,25 ou xx,75
          b = 4;
          a = (randint(2, 9) * 10 + randint(2, 9)) * 4 + choice([1, 3]);
          q = calcul(a / b);
          break;
        case 2: // entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
          b = 8;
          a = randint(2, 9) * 8 + choice([1, 3, 5, 7]);
          q = calcul(a / b);
          break;
        case 3: // entier divisé par 6 quotient : xxx,5
          b = 6;
          q = calcul(
            randint(2, 9) * 100 + randint(2, 9) * 10 + randint(2, 9) + 0.5
          );
          a = q * 6;
          break;
        case 4: // quotient xx,xx division par 2, 3 , 4 ou 5
          q = calcul(
            randint(2, 5) * 10 +
            randint(2, 5) +
            randint(2, 5) / 10 +
            randint(2, 5) / 100
          );
          b = randint(2, 5);
          a = calcul(b * q);
          break;
        case 5: // quotient x,xxx division par 6 à 9
          q = calcul(
            randint(6, 9) +
            randint(5, 9) / 10 +
            randint(6, 9) / 100 +
            randint(6, 9) / 1000
          );
          b = randint(6, 9);
          a = calcul(b * q);
          console.log(a,' = ',b, ' x ', q)
          break;
        case 6: // un 0 dans le quotient
          if (randint(1, 2) == 1) {
            //x0x,x
            q = calcul(
              randint(2, 9) * 100 + randint(2, 9) + randint(2, 9) / 10
            );
          } else {
            //xx0,x
            q = calcul(
              randint(2, 9) * 100 + randint(2, 9) * 10 + randint(2, 9) / 10
            );
          }
          b = randint(7, 9);
          a = calcul(b * q);
          break;
        case 7: // division par 7
          a = randint(2, 9) * 7 + randint(1, 6);
          b = 7;
          q = Algebrite.eval(Math.floor(Algebrite.eval((a / b) * 1000)) / 1000);
          break;
        case 8: // division par 9
          a = calcul((randint(11, 19) * 9) / 10 + randint(1, 8) / 10);
          b = 9;
          q = Algebrite.eval(Math.floor(Algebrite.eval((a / b) * 1000)) / 1000);
          break;
        case 9: //division par 3
          a = calcul((randint(11, 99) * 3) / 100 + randint(1, 2) / 100);
          b = 3;
          q = Algebrite.eval(Math.floor(Algebrite.eval((a / b) * 1000)) / 1000);
      }
      if (this.sup == 2) {
        this.consigne =
          "Effectuer les divisions décimales suivantes et donner une valeur approchée de leur quotient au millième près.";
      }
      texte = `$${tex_nombre(a)}\\div${b}$`;
      if (this.sup == 1) {
        texte_corr=Operation({operande1:a,operande2:b,type:'division',precision:3})
        texte_corr +=`<br>$${tex_nombre(a)}\\div${b}=${tex_nombre(q)}$`
      } else {
        texte_corr=Operation({operande1:a,operande2:b,type:'division',precision:3})
        texte_corr+=`<br>$${tex_nombre(a)}\\div${b}\\approx${tex_nombre(q)}$`
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        this.QCM[1].push([texte, [texte_corr,q], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Type de questions",
    2,
    "1 : Déterminer le quotient exact\n2: Déterminer un quotient approché au millième près",
  ];
}
