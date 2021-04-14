import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombre,tex_prix,tex_fraction} from "/modules/outils.js"
/**
 * Calculer le montant d'une réduction donnée en pourcentage d'un prix initial
 * @Auteur Jean-Claude Lhote
 * Référence 6N33-3
 */
export default function Appliquer_un_pourcentage() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes avec des calculs de pourcentages";
  this.nb_questions = 1;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 2]
    let choix = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    let liste_pourcentages = [10, 20, 30, 40, 50];
    let article = [[`Un pull`, 20, 40], [`Une chemise`, 15, 35], [`Un pantalon`, 30, 60], [`Un T-shirt`, 15, 25], [`Une jupe`, 20, 40]]
    let legume = [[`Une aubergine`, 100, 200], [`Un melon`, 200, 300], [`Une tomate`, 50, 100], [`Une betterave`, 75, 100], [`Une carotte`, 30, 50]]
    let liste_index = [0, 1, 2, 3, 4]
    let prix = [], pourcent = [], masse = []
    let index = combinaison_listes(liste_index, this.nb_questions)
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      pourcent[i] = choice(liste_pourcentages)
      switch (choix[i]) {
        case 1:
          prix[i] = randint(article[index[i]][1], article[index[i]][2])
          texte = `${article[index[i]][0]} coûtant $${prix[i]}$€ bénéficie d'une réduction de $${pourcent[i]} \\%$.<br>`
          texte += `Quel est le montant en euro de cette réduction ?`
          texte_corr = `On doit calculer $${pourcent[i]}\\%$ de $${prix[i]}$€ :<br>`
          texte_corr += `$${pourcent[i]}\\%\\text{ de }${prix[i]}=${tex_fraction(pourcent[i], 100)}\\times${prix[i]}=(${pourcent[i]}\\times${prix[i]})\\div100=${tex_nombre(pourcent[i] * prix[i])}\\div100=${tex_nombre(Algebrite.eval((pourcent[i] * prix[i]) / 100))}$<br>`;
          texte_corr += `Le montant de la réduction est de ${tex_prix(calcul(prix[i] * pourcent[i] / 100))}€`
          break;
        case 2:
          masse[i] = randint(legume[index[i]][1], article[index[i]][2])
          texte = `${legume[index[i]][0]} pesant $${masse[i]}$ grammes a eu une croissance de $${pourcent[i]} \\%$.<br>`
          texte += `Quelle est la masse supplémentaire en grammes correspondant à cette croissance ?`
          texte_corr = `On doit calculer $${pourcent[i]}\\%$ de $${masse[i]}$ grammes :<br>`
          texte_corr += `$${pourcent[i]}\\%\\text{ de }${masse[i]}=${tex_fraction(pourcent[i], 100)}\\times${masse[i]}=(${pourcent[i]}\\times${masse[i]})\\div100=${tex_nombre(pourcent[i] * masse[i])}\\div100=${tex_nombre(Algebrite.eval((pourcent[i] * masse[i]) / 100))}$<br>`;
          texte_corr += `La masse a augmenté de $${tex_nombre(calcul(masse[i] * pourcent[i] / 100))}$ g.`

          break;
      }
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

