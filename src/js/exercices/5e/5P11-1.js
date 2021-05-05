import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,combinaisonListes, randint, choice, prenomF, prenomM, texNombre, nombre_avec_espace, calcul, minToHour} from '../../modules/outils.js'
export const titre = 'Problème de vitesse'

/**
 * Recherche de la vitesse, du temps ou de la distance en utilisant un tableau de proportionnalité et le produit en croix
 * @Auteur Rémi Angot
 * Référence 5P11-1
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 3;
  this.nbCols = 1; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.consigneCorrection = " À vitesse constante, la distance et le temps du trajet sont proportionnels. On peut donc utiliser la technique du produit en croix."

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['vitesse','temps','distance'];
    let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, d, v, t, pronomgenre, prenom, destination, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        v = randint(8,26,[12]) * 5; // On évite le 60 km/h trop trivial
        if (v%2==0){
            t = randint(5,39) * 3;
        } else {
            t = randint(2,19) * 6;
        } //On s'assure que le produit v*t est divisible par 6
        d = calcul(v * t /60);
        pronomgenre = choice(['il','elle'])
        if (pronomgenre=='il') {
            prenom = prenomM()
        } else {
            prenom = prenomF()
        }
        if (d < 60) {
            destination = choice(["à son travail","à l'école de ses enfants","au cinéma","au centre de loisirs"])
        } else {
            destination = choice(["jusqu'à sa location de vacances","dans la maison de ses parents","à une conférence"])
        }
        switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'vitesse': 
            texte = `${prenom} met ${minToHour(t)} pour aller ${destination} qui est à une distance de ${nombre_avec_espace(d)} km. Déterminer sa vitesse moyenne.`;
            if (sortieHtml) {
                texteCorr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|}\n`;
            } else {
                texteCorr = `$\\begin{array}{|l|c|c|}\n`;
             }
             texteCorr += `\\hline\n`
             texteCorr += `\\text{Distance (en km)} & ${texNombre(d)} & v\\\\ \n`
             texteCorr += `\\hline\n`
             texteCorr += `\\text{Temps (en min)} & ${t} & 60 \\\\ \n`
             texteCorr += `\\hline\n`
             texteCorr += `\\end{array}$`
             texteCorr += `<br><br>`
             texteCorr += `$v=\\dfrac{${texNombre(d)}\\times 60}{${t}}=${v}$ \n`
             texteCorr += `<br><br>`
             texteCorr += `Sa vitesse moyenne est de ${v} km/h.`
          break;
        case 'temps': 
            texte = `Si ${prenom} roule à ${v} km/h. Combien de temps lui faudra-t-il  pour aller ${destination} qui est à une distance de ${nombre_avec_espace(d)} km ?`;
            if (sortieHtml) {
                texteCorr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|}\n`;
            } else {
                texteCorr = `$\\begin{array}{|l|c|c|}\n`;
             }
             texteCorr += `\\hline\n`
             texteCorr += `\\text{Distance (en km)} & ${texNombre(d)} & ${v}\\\\ \n`
             texteCorr += `\\hline\n`
             texteCorr += `\\text{Temps (en min)} & t & 60 \\\\ \n`
             texteCorr += `\\hline\n`
             texteCorr += `\\end{array}$`
             texteCorr += `<br><br>`
             texteCorr += `$t=\\dfrac{${texNombre(d)}\\times 60}{${v}}=${t}$ \n`
             texteCorr += `<br><br>`
             texteCorr += `${pronomgenre.charAt(0).toUpperCase() + pronomgenre.slice(1)} mettra ${minToHour(t)} minutes pour aller ${destination}.`
          break;
          case 'distance': 
          texte = `${prenom} roule à ${v} km/h de moyenne pendant ${minToHour(t)}. Calculer la distance parcourue.`;
          if (sortieHtml) {
              texteCorr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|}\n`;
          } else {
              texteCorr = `$\\begin{array}{|l|c|c|}\n`;
           }
           texteCorr += `\\hline\n`
           texteCorr += `\\text{Distance (en km)} & d & ${v}\\\\ \n`
           texteCorr += `\\hline\n`
           texteCorr += `\\text{Temps (en min)} & ${t} & 60 \\\\ \n`
           texteCorr += `\\hline\n`
           texteCorr += `\\end{array}$`
           texteCorr += `<br><br>`
           texteCorr += `$d=\\dfrac{${texNombre(t)}\\times ${v}}{60}=${texNombre(d)}$ \n`
           texteCorr += `<br><br>`
           texteCorr += `${pronomgenre.charAt(0).toUpperCase() + pronomgenre.slice(1)} a donc parcouru ${texNombre(d)} km.`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

