import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
import { choice, calcul, randint, tex_nombre, modal_texte_court } from '../../modules/outils.js';
/**
 * Utiliser les puissances de 10 et les préfixes kilo, Méga, Giga, Téra
 * @Auteur Rémi Angot
 * Référence 4C32-2
 * 2021-02-05
*/
export default function ConversionsPuissancesDe10(numero_de_l_exercice) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Puissances de 10 et préfixes kilo, méga, giga, téra";
  this.consigne = "Compléter";
  this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  //this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  //this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.correction_detaille_disponible = true;
  this.correction_detaillee = sortie_html ?  true : false;

  this.bouton_aide = modal_texte_court(numero_de_l_exercice,
    `Téra : mille-milliards $\\times10^{12}$<br>
Giga : milliard $\\times10^9$<br>
Méga : millions $\\times10^6$<br>
kilo : mille $\\times10^{3}$<br>
milli : millième $\\times10^{-3}$<br>
micro : millionième $\\times10^{-6}$<br>
nano : milliardième $\\times10^{-9}$<br>
`, 'Signification des préfixes'
  );
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['m>km','u>M','u>G','g>t','M>G','M>T','G>T','m>mm','m>um','m>nm']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let liste_de_sens = combinaison_listes(['div','fois'],this.nb_questions)
    for (let i = 0, a, n, unite, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        a = choice([calcul(randint(1,9)+randint(1,9)/10),calcul(randint(11,99)+randint(1,9)/10+randint(1,9)/100),calcul(randint(11,999)+randint(1,9)/10)],calcul(randint(10000,99999)/100))
        texte = '';
        texte_corr = '';
        switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'm>km': 
            n = randint(6,12)
            if (liste_de_sens[i]=='div') {
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{km}$`;
                if (this.correction_detaillee){
                    texte_corr += "Il faut $1~000$ m pour 1 km, on va donc diviser par $1~000$, c'est à dire multiplier par $10^{-3}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}\\times10^{${n-3}}~\\text{km}$`;
            }
            if (liste_de_sens[i]=='fois') {
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{km} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{m}$`;
                if (this.correction_detaillee){
                    texte_corr += "$1~\\text{km}=1~000~\\text{km}$, on va donc multiplier par $1~000$, c'est à dire multiplier par $10^{3}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{km} = ${tex_nombre(a)}\\times10^{${n+3}}~\\text{m}$`;
            }
          break;
        case 'u>M': 
            n = randint(11,20)
            unite = choice([['W','watts'],['Wh','watts-heure']])
            if (liste_de_sens[i]=='div') {
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{M${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Il faut 1 million de ${unite[1]} pour 1 M${unite[0]}, on va donc diviser par 1 million, c'est à dire multiplier par $10^{-6}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${tex_nombre(a)}\\times10^{${n-6}}~\\text{M${unite[0]}}$`;
            }
            if (liste_de_sens[i]=='fois') {
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `1 M${unite[0]} c'est un million de ${unite[1]}, on va donc multiplier par 1 million, c'est à dire multiplier par $10^{6}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${tex_nombre(a)}\\times10^{${n+6}}~\\text{${unite[0]}}$`;
            }
          break;
        case 'u>G': 
            unite = choice([['W','watts'],['Wh','watts-heure']])
            if (liste_de_sens[i]=='div') {
                n = randint(13,20)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{G${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Il faut 1 milliard de ${unite[1]} pour 1 G${unite[0]}, on va donc diviser par 1 milliard, c'est à dire multiplier par $10^{-9}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${tex_nombre(a)}\\times10^{${n-9}}~\\text{G${unite[0]}}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(4,10)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `1 G${unite[0]} c'est un milliard de ${unite[1]}, on va donc multiplier par 1 milliard, c'est à dire multiplier par $10^{9}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${tex_nombre(a)}\\times10^{${n+9}}~\\text{${unite[0]}}$`;
            }
          break;
        case 'g>t': 
            if (liste_de_sens[i]=='div') {
                n = randint(13,20)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{g} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{t}$`;
                if (this.correction_detaillee){
                    texte_corr += `Il faut 1 million de grammes pour 1 tonne, on va donc diviser par 1 million, c'est à dire multiplier par $10^{-6}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{g} = ${tex_nombre(a)}\\times10^{${n-6}}~\\text{t}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(4,10)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{t} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{g}$`;
                if (this.correction_detaillee){
                    texte_corr += `Une tonne c'est un million de grammes, on va donc multiplier par 1 million, c'est à dire multiplier par $10^{6}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{t} = ${tex_nombre(a)}\\times10^{${n+6}}~\\text{g}$`;
            }
          break;
          case 'M>G': 
            unite = choice([['W','watts'],['Wh','watts-heure']])
            if (liste_de_sens[i]=='div') {
                n = randint(8,12)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{G${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Il faut mille-millions de ${unite[1]} pour faire 1 milliard de ${unite[1]}, on va donc diviser par mille, c'est à dire multiplier par $10^{-3}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${tex_nombre(a)}\\times10^{${n-3}}~\\text{G${unite[0]}}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(4,10)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{M${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Un milliard de ${unite[1]} c'est mille-millions de ${unite[1]}, on va donc multiplier par mille, c'est à dire multiplier par $10^{3}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${tex_nombre(a)}\\times10^{${n+3}}~\\text{M${unite[0]}}$`;
            }
          break;
          case 'M>T': 
            unite = choice([['W','watts'],['Wh','watts-heure']])
            if (liste_de_sens[i]=='div') {
                n = randint(9,15)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{T${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Il faut mille  méga-${unite[1]} pour faire un giga-${unite[1]} et mille giga-${unite[1]} pour faire un téra-${unite[1]}, on va donc diviser par un million, c'est à dire multiplier par $10^{-6}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${tex_nombre(a)}\\times10^{${n-6}}~\\text{T${unite[0]}}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(4,10)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{M${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Un téra-${unite[1]} c'est mille giga-${unite[1]} donc un million de méga-${unite[1]}, on va donc multiplier par un million, c'est à dire multiplier par $10^{6}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${tex_nombre(a)}\\times10^{${n+6}}~\\text{M${unite[0]}}$`;
            }
          break;
          case 'G>T': 
            unite = choice([['W','watts'],['Wh','watts-heure']])
            if (liste_de_sens[i]=='div') {
                n = randint(8,12)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{T${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Il faut mille-milliards de ${unite[1]} pour faire 1 T${unite[0]}, on va donc diviser par mille, c'est à dire multiplier par $10^{-3}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${tex_nombre(a)}\\times10^{${n-3}}~\\text{T${unite[0]}}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(4,10)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{G${unite[0]}}$`;
                if (this.correction_detaillee){
                    texte_corr += `Un téra-${unite[1]} c'est mille-milliards de ${unite[1]}, on va donc multiplier par mille, c'est à dire multiplier par $10^{3}$.<br>`
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${tex_nombre(a)}\\times10^{${n+3}}~\\text{G${unite[0]}}$`;
            }
          break;
          case 'm>mm': 
            n = randint(6,12)
            if (liste_de_sens[i]=='div') {
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{mm} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{m}$`;
                if (this.correction_detaillee){
                    texte_corr += "Il faut $1~000$ mm pour 1 m, on va donc diviser par $1~000$, c'est à dire multiplier par $10^{-3}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{mm} = ${tex_nombre(a)}\\times10^{${n-3}}~\\text{m}$`;
            }
            if (liste_de_sens[i]=='fois') {
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{mm}$`;
                if (this.correction_detaillee){
                    texte_corr += "$1~\\text{m}=1~000~\\text{mm}$, on va donc multiplier par $1~000$, c'est à dire multiplier par $10^{3}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}\\times10^{${n+3}}~\\text{mm}$`;
            }
          break;
          case 'm>um': 
            if (liste_de_sens[i]=='div') {
                n = randint(3,10)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\mu\\text{m} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{m}$`;
                if (this.correction_detaillee){
                    texte_corr += "Il faut un million de $\\mu\\text{m}$ pour 1 m, on va donc diviser par un million, c'est à dire multiplier par $10^{-6}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\mu\\text{m} = ${tex_nombre(a)}\\times10^{${n-6}}~\\text{m}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(3,10,[6])*(-1)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}~\\ldots\\ldots~\\mu\\text{m}$`;
                if (this.correction_detaillee){
                    texte_corr += "Un mètre équivaut à un million de micro-mètres, on va donc multiplier par un million, c'est à dire multiplier par $10^{6}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}\\times10^{${n+6}}~\\mu\\text{m}$`;
            }
          break;
          case 'm>nm': 
            if (liste_de_sens[i]=='div') {
                n = randint(3,8)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{nm} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{m}$`;
                if (this.correction_detaillee){
                    texte_corr += "Il faut un milliard de nano-mètres pour 1 m, on va donc diviser par un milliard, c'est à dire multiplier par $10^{-9}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{nm} = ${tex_nombre(a)}\\times10^{${n-9}}~\\text{m}$`;
            }
            if (liste_de_sens[i]=='fois') {
                n = randint(3,12,[9,11])*(-1)
                texte = `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}~\\ldots\\ldots~\\text{nm}$`;
                if (this.correction_detaillee){
                    texte_corr += "Un mètre équivaut à un milliard de nano-mètres, on va donc multiplier par un milliard, c'est à dire multiplier par $10^{9}$.<br>"
                }
                texte_corr += `$${tex_nombre(a)}\\times10^{${n}}~\\text{m} = ${tex_nombre(a)}\\times10^{${n+9}}~\\text{nm}$`;
            }
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


