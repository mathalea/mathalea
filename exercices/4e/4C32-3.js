import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint, calcul, choice, tex_nombre} from "/modules/outils.js"
/**
 * Problèmes avec des multiplications ou des divisions avec des puissances de 10 et des conversions
 * @Auteur Rémi Angot
 * Référence 4C32-3
 * 2021-02-05
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes avec des puissances de 10 et des conversions";
  this.consigne = "";
  this.nb_questions = 4;
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  //this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  //this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  sortie_html? this.spacing_corr = 2 : this.spacing_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['info','info2','electricite','lumiere']
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr,a, a1, b, b1, c, c1, u, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'info': 
            a = randint(3,7)
            a1 = randint(3,7,a)*100
            a *= 100
            b = randint(11,40)
            b1 = choice([650,700,750])
            c = randint(3,20)
            c1 = calcul(randint(11,49)/10)
          texte = `Sur mon disque dur, j'ai ${a} photos de ${a1} ko, ${b} films de ${b1} Mo et ${c} films HD de ${tex_nombre(c1)} Go.<br>`;
          texte += `Combien de place vont occuper tous ces fichiers ? Donner le résultat en mega-octets et en giga-octets.`
          texte_corr = `Taille des photos : $${a}\\times${a1}~\\text{ko}=${tex_nombre(a*a1)}~\\text{ko}=${tex_nombre(calcul(a*a1/1000))}~\\text{Mo}$<br>`;
          texte_corr += `Taille des films : $${b}\\times${b1}~\\text{Mo}=${tex_nombre(b*b1)}~\\text{Mo}$<br>`;
          texte_corr += `Taille des films HD : $${c}\\times${tex_nombre(c1)}~\\text{Go}=${tex_nombre(c*c1)}~\\text{Go}=${tex_nombre(c*c1*1000)}~\\text{Mo}$<br>`;
          texte_corr += `Taille totale : $${tex_nombre(calcul(a*a1/1000))}~\\text{Mo}+${tex_nombre(b*b1)}~\\text{Mo}+${tex_nombre(c*c1*1000)}~\\text{Mo}=${tex_nombre(calcul(a*a1/1000+b*b1+c*c1*1000))}~\\text{Mo}=${tex_nombre(calcul((a*a1/1000+b*b1+c*c1*1000)/1000))}~\\text{Go}$`;
          break;
        case 'info2': 
            a = calcul(randint(11,49,[20,30,40])/10)
            a1 = randint(4,10)
            b = randint(11,40)
          texte = `Un serveur héberge $${tex_nombre(a)}\\times10^{${a1}}$ fichiers de $${b}$ Mo.<br>`;
          texte += `Combien de place occupent tous ces fichiers ? Donner le résultat en tera-octets.`
          texte_corr = `$${tex_nombre(a)}\\times10^{${a1}}\\times${b}~\\text{Mo}=${tex_nombre(calcul(a*b))}\\times10^{${a1}}~\\text{Mo}$<br>`;
          texte_corr += `Or $1~\\text{To}=1~000~\\text{Go}=1~000~000~\\text{Mo}$, il faut donc diviser par un million ou multiplier par $10^{-6}$ pour convertir les méga-octets en tera-octets.<br>`  
          texte_corr += `$${tex_nombre(calcul(a*b))}\\times10^{${a1}}~\\text{Mo}=${tex_nombre(calcul(a*b))}\\times10^{${a1-6}}~\\text{To}$`
          break;
        case 'electricite': 
            a = choice([30,35,40,45])
            b = calcul(randint(11,49,[20,30,40])/10)
          texte = `On estime qu'un foyer consomme ${a} kWh par jour. Si une centrale électrique produit ${tex_nombre(b)} TWh par an, combien de foyers pourra-t-elle alimenter ?<br>`;
          texte_corr = `Consommation annuelle d'un foyer français : $365\\times${tex_nombre(a)}~\\text{kWh} = ${tex_nombre(a*365)}~\\text{kWh}$<br>`;
          texte_corr += `Nombre de foyers pouvant être alimentés par cette centrale : $\\dfrac{${tex_nombre(b)}~\\text{TWh}}{${tex_nombre(a*365)}~\\text{kWh}}=\\dfrac{${tex_nombre(b)}\\times10^{12}~\\text{Wh}}{${tex_nombre(a*365)}\\times10^3~\\text{Wh}}\\approx${tex_nombre(calcul((b*10**12)/(a*365*10**3),1))}$`
          break;
        case 'lumiere': 
            a = randint(2,22)
            u = choice(['j','h'])
            texte = `On admet que la vitesse de la lumière dans le vide est de $3\\times10^8~\\text{m/s}$. Quelle est la distance parcourue par la lumière en ${a} `
            if (u=='j'){
                texte += `jours ? Donner le résultat en kilomètres.`;
                texte_corr = `Dans une journée, il y a $24$ heures et dans chaque heure $3~600$ secondes, la distance parcourue est donc : <br>`
                texte_corr += `$${a}\\times24\\times3~600~\\text{s}\\times3\\times10^8~\\text{m/s}=${tex_nombre(a*24*3600*3)}\\times10^8~\\text{m}=${tex_nombre(calcul(a*24*3600*3)/1000)}\\times10^8~\\text{km}$`
            } else {
                texte += `heures ? Donner le résultat en kilomètres.<br>`;
                texte_corr = `Dans une heure, il y a $3~600$ secondes, la distance parcourue est donc : <br>`
                texte_corr += `$${a}\\times3~600~\\text{s}\\times3\\times10^8~\\text{m/s}=${tex_nombre(a*3600*3)}\\times10^8~\\text{m}=${tex_nombre(calcul(a*3600*3)/1000)}\\times10^8~\\text{km}$`
            
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
}


