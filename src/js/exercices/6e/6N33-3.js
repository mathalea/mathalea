import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,calcul,texNombre,tex_prix,tex_fraction} from '../../modules/outils.js'
const Algebrite = require('algebrite')

export const titre = 'Problèmes avec des calculs de pourcentages'

/**
 * Calculer le montant d'une réduction donnée en pourcentage d'un prix initial
 * @Auteur Jean-Claude Lhote
 * Référence 6N33-3
 */
export default function Appliquer_un_pourcentage() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.nbQuestions = 1;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbCols = 1;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 2]
    let choix = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
    let liste_pourcentages = [10, 20, 30, 40, 50];
    let article = [[`Un pull`, 20, 40], [`Une chemise`, 15, 35], [`Un pantalon`, 30, 60], [`Un T-shirt`, 15, 25], [`Une jupe`, 20, 40]]
    let legume = [[`Une aubergine`, 100, 200], [`Un melon`, 200, 300], [`Une tomate`, 50, 100], [`Une betterave`, 75, 100], [`Une carotte`, 30, 50]]
    let liste_index = [0, 1, 2, 3, 4]
    let prix = [], pourcent = [], masse = []
    let index = combinaisonListes(liste_index, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      pourcent[i] = choice(liste_pourcentages)
      switch (choix[i]) {
        case 1:
          prix[i] = randint(article[index[i]][1], article[index[i]][2])
          texte = `${article[index[i]][0]} coûtant $${prix[i]}$€ bénéficie d'une réduction de $${pourcent[i]} \\%$.<br>`
          texte += `Quel est le montant en euro de cette réduction ?`
          texteCorr = `On doit calculer $${pourcent[i]}\\%$ de $${prix[i]}$€ :<br>`
          texteCorr += `$${pourcent[i]}\\%\\text{ de }${prix[i]}=${tex_fraction(pourcent[i], 100)}\\times${prix[i]}=(${pourcent[i]}\\times${prix[i]})\\div100=${texNombre(pourcent[i] * prix[i])}\\div100=${texNombre(Algebrite.eval((pourcent[i] * prix[i]) / 100))}$<br>`;
          texteCorr += `Le montant de la réduction est de ${tex_prix(calcul(prix[i] * pourcent[i] / 100))}€`
          break;
        case 2:
          masse[i] = randint(legume[index[i]][1], article[index[i]][2])
          texte = `${legume[index[i]][0]} pesant $${masse[i]}$ grammes a eu une croissance de $${pourcent[i]} \\%$.<br>`
          texte += `Quelle est la masse supplémentaire en grammes correspondant à cette croissance ?`
          texteCorr = `On doit calculer $${pourcent[i]}\\%$ de $${masse[i]}$ grammes :<br>`
          texteCorr += `$${pourcent[i]}\\%\\text{ de }${masse[i]}=${tex_fraction(pourcent[i], 100)}\\times${masse[i]}=(${pourcent[i]}\\times${masse[i]})\\div100=${texNombre(pourcent[i] * masse[i])}\\div100=${texNombre(Algebrite.eval((pourcent[i] * masse[i]) / 100))}$<br>`;
          texteCorr += `La masse a augmenté de $${texNombre(calcul(masse[i] * pourcent[i] / 100))}$ g.`

          break;
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
}

