import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,tex_nombre,texte_gras,texte_en_couleur_et_gras} from "../../modules/outils.js"
/**
 * Détermination du reste et quotient à partir de l'égalité découlant de la division euclidienne
 *
 * @Auteur Cédric GROLLEAU
 * Référence 6C11-1
 */
export default function Divisions_euclidiennes_egalite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Divisions euclidiennes : déterminer reste et quotient à partir d'une égalité";
  this.consigne =
    "Répondre aux questions suivantes sans poser la division.";
  this.consigne_correction = texte_gras("Pour la division euclidienne de a par b, on cherche les nombres q et r tels que  a = b × q + r avec r < b");
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon opidiv n'est pas joli
  this.nb_questions = 4;
  this.sup = 1;
  this.QCM=['6C11-1',[],'Divisions euclidiennes : déterminer reste et quotient à partir d\'une égalité',3,{}]
  this.nouvelle_version = function () {
    this.liste_questions = [] // Liste de questions
    this.liste_corrections = [] // Liste de questions corrigées
    let type_de_questions_disponibles, type_de_questions
    if (this.sup == 1) {
		type_de_questions_disponibles = [1, 2, 2]
	} else if (this.sup == 2) {
		type_de_questions_disponibles = [1, 2, 3, 4]
	}
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, q, r;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      q = randint(7, 75)
	  b = randint(3, 25)
	  r = type_de_questions===1 ? 0 : randint(1, b-1)
	  a = b * q + r
	  texte = `Utilise l'égalité suivante pour donner le quotient et le reste de la division euclidienne de $ ${tex_nombre(a)} $ par $ ${b} $<br>`
	  switch (type_de_questions) {
        case 1: //égalité "directe"
		  texte += `$ ${tex_nombre(a)} = ${b} \\times ${q} $<br>`;
		  texte_corr = `L'égalité $ ${tex_nombre(a)} = ${b} \\times ${q} $ correspond bien à l'expression de la division euclidienne de $ ${tex_nombre(a)} $ par $ ${b} $. <br> Le quotient est ${texte_en_couleur_et_gras(q)} et le reste est ${texte_en_couleur_et_gras(0)}.`;
          break;
		case 2: //égalité "directe"
		  texte += `$ ${tex_nombre(a)} = ${b} \\times ${q} + ${r} $<br>`;
		  texte_corr = `${r} est inférieur à ${b}, l'égalité $ ${tex_nombre(a)} = ${b} \\times ${q} + ${r} $ correspond bien à l'expression de la division euclidienne de $ ${tex_nombre(a)} $ par ${b}. <br> On a donc : ${texte_en_couleur_et_gras(q)} le quotient et ${texte_en_couleur_et_gras(r)} le reste.`;
          break;
        case 3: 
          texte += `$ ${tex_nombre(a)} = ${b} \\times ${q-1} + ${r+b} $<br>`;
		  texte_corr = `${r+b} est supérieur à ${b}. ${r+b} n'est donc pas le reste. <br> L'égalité $ ${tex_nombre(a)} = ${b} \\times ${q-1} + ${r+b} $ ne traduit pas directement la division euclidienne de $ ${tex_nombre(a)} $ par ${b}. <br>
		  Transformons cette égalité en utilisant le fait que $ ${r+b} = ${r} + ${b} $<br>
		  $ ${tex_nombre(a)} = ${b} \\times ${q-1} + ${r+b} = ${b} \\times ${q-1} + ${b} + ${r} = ${b} \\times ${q} + ${r} $ <br>
		  Ainsi, $ ${tex_nombre(a)} = ${b} \\times ${q} + ${r} $
		  <br> On a donc : ${texte_en_couleur_et_gras(q)} le quotient et ${texte_en_couleur_et_gras(r)} le reste.`;
          break;
        case 4: 
          texte += `$ ${tex_nombre(a)} = ${b} \\times ${q+1} - ${b-r} $<br>`;
		  texte_corr = `L'égalité $ ${tex_nombre(a)} = ${b} \\times ${q+1} - ${b-r} $ ne traduit pas directement la division euclidienne de $ ${tex_nombre(a)} $ par ${b}.  <br>
		  Transformons cette égalité : <br>
		  Dans cette égalité on a pris ${q+1} fois ${b} et on dépasse $ ${tex_nombre(a)} $. Cela veut dire qu'on a pris ${b} trop de fois.<br>
		  Prenons le une fois de moins, on va donc avoir ${q} fois ${b} : <br> 
		  $ ${tex_nombre(a)} = ${b} \\times ${q+1} - ${b-r} = ${b} \\times ${q} + ${b} - ${b-r} = ${b} \\times ${q} + ${r} $ <br>
		  Ainsi, $ ${tex_nombre(a)} = ${b} \\times ${q} + ${r} $
		  <br> On a donc : ${texte_en_couleur_et_gras(q)} le quotient et ${texte_en_couleur_et_gras(r)} le reste.`;
          break;
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        /***************** AMC Open ************************/
        this.QCM[1].push([texte,[texte_corr],[4]])    // [question,[reponse],[nb_lignes_cadre]]
        /*********************************************/
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    2,
    "1 : L\'égalité correspond à la division euclidienne\n2: L'égalité ne correspond pas nécessairement à la division euclidienne",
  ];
}