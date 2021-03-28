import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu_sans_numero, combinaison_listes, randint, tex_nombre, tex_nombrec, lettre_depuis_chiffre, tex_fraction_reduite, ecriture_parenthese_si_negatif, choice } from "/modules/outils.js"

/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Exercice exemple";
  this.consigne = "";
  this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.spacing = 4;
  this.spacing_corr = 4;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1']// , 'type2', 'type3']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let a, b, c, c1, c2, e1, e2, e3, e4, e5;
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          c1 = choice([2,3,5,7,11])
          c2 = choice([2,3,5,7,11],c1)
          c = c1 * c2
          a = c1 * randint(1,4)
          b = c2 * randint(1,4)
          e1 = randint(-3,-1)
          e2 = randint(-11,11,[-1,0,1])
          e3 = randint(-11,11,[-1,0,1])
          e4 = randint(-3,-1,e1)
          e5 = randint(-11,11,[-1,0,1])
          if (this.sup == 1) {
            e1 = randint(-3,-1)
            e2 = randint(-4,4,[-1,0,1])
            e3 = randint(-4,4,[-1,0,1])
            e4 = randint(-3,-1,e1)
            e5 = randint(-4,4,[-1,0,1])
          }
          texte = `$${lettre_depuis_chiffre(i+1)} =  \\dfrac{ ${tex_nombrec(a*10**e1)}  \\times 10^{${e2}} \\times ${b} \\times 10^{${e3}} }{ ${c} \\times 10^{${e4}} \\times 10^{${e5}} }$`;
          texte_corr = texte;
          texte_corr += '<br>'
          texte_corr += `$${lettre_depuis_chiffre(i+1)} =  \\dfrac{ ${a} \\times 10^{${e1}} \\times 10^{${e2}} \\times ${b} \\times 10^{${e3}} }{ ${c} \\times 10^{${e4}} \\times 10^{${e5}} }$`;
          texte_corr += `<br>`
          texte_corr += `$${lettre_depuis_chiffre(i+1)} = \\dfrac{ ${a} \\times ${b} }{ ${c} } \\times \\dfrac{  10^{${e1}} \\times 10^{${e2}} \\times 10^{${e3}} }{ 10^{${e4}} \\times 10^{${e5}} }$`;
          texte_corr += `<br>`
          texte_corr += `$${lettre_depuis_chiffre(i+1)} = ${tex_fraction_reduite(a*b,c)} \\times \\dfrac{  10^{${e1}+${ecriture_parenthese_si_negatif(e2)}+${ecriture_parenthese_si_negatif(e3)}} }{ 10^{${e4}+${ecriture_parenthese_si_negatif(e5)}} }$`;
          texte_corr += `<br>`
          texte_corr += `$${lettre_depuis_chiffre(i+1)} = ${tex_fraction_reduite(a*b,c)} \\times \\dfrac{  10^{${e1+e2+e3}} }{ 10^{${e4+e5}} }$`;
          texte_corr += `<br>`
          texte_corr += `$${lettre_depuis_chiffre(i+1)} = ${tex_fraction_reduite(a*b,c)} \\times 10^{ ${e1+e2+e3}-${ecriture_parenthese_si_negatif(e4+e5)} }$`;
          texte_corr += `<br>`
          texte_corr += `$${lettre_depuis_chiffre(i+1)} = ${tex_fraction_reduite(a*b,c)} \\times 10^{ ${e1+e2+e3-(e4+e5)} }$`;
          break;
        case 'type2':
          texte = `Question ${i + 1} de type 2`;
          texte_corr = `Correction ${i + 1} de type 2`;
          break;
        case 'type3': // Table de 200
          texte = `Question ${i + 1} de type 2`;
          texte_corr = `Correction ${i + 1} de type 2`;
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
    liste_de_question_to_contenu_sans_numero(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

