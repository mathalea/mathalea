import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,premiere_lettre_en_majuscule,num_alpha} from "/modules/outils.js"
import {repere2,traceBarre,mathalea2d} from "/modules/2d.js"
/**
 * Lire un diagramme en barre
 * @Auteur Erwan Duplessy
 * Référence 6S10
 */

export default function Lecture_diagramme_barre() {

  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Lire un diagramme en barre";
  this.consigne = "Répondre aux questions à l'aide du graphique.";
  this.nb_questions = 3;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.sup2 = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // vide la liste de questions
    this.liste_corrections = []; // vide la liste de questions corrigées   

    let lstAnimaux = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères'];
    let nbAnimaux = 4; // nombre d'animaux différents dans l'énoncé
    switch (parseInt(this.sup)) {
      case 1: nbAnimaux = 4; break;
      case 2: nbAnimaux = 5; break;
      case 3: nbAnimaux = 6; break;
      default: nbAnimaux = 4;
    }
    let lstAnimauxExo = []; //liste des animaux uniquement cités dans l'exercice
    let lstNombresAnimaux = []; // liste des effectifs de chaque animal
    let lstVal = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // liste des valeurs à éviter pour les effectifs
    let N = 0,nom,texte,texte_corr,reponseinf,reponsesup;

    switch (parseInt(this.sup2)) {
      case 1:
        for (let i = 0; i < nbAnimaux; i++) {
          N = randint(2, 100, lstVal); // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
          lstNombresAnimaux.push(N);
          lstVal = lstVal.concat([N - 1, N, N + 1]); // valeurs à supprimer pour éviter des valeurs proches
        }
        break;
      case 2:
        for (let i = 0; i < nbAnimaux; i++) {
          N = randint(2, 100, lstVal); // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
          lstNombresAnimaux.push(10 * N);
          lstVal = lstVal.concat([N - 1, N, N + 1]); // valeurs à supprimer pour éviter des valeurs proches
        }
        break;
    }

    for (let i = 0; i < nbAnimaux; i++) {
      nom = choice(lstAnimaux, lstAnimauxExo); // choisit un animal au hasard sauf parmi ceux déjà utilisés
      lstAnimauxExo.push(nom);
    }

    let nMin = Math.min(...lstNombresAnimaux);
    let nMax = Math.max(...lstNombresAnimaux);

    let lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan',
      'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane'];

    texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d’animaux. Voici un diagramme en bâtons qui donne le nombre d’individus pour chaque espèce.<br>';
    texte += num_alpha(0) + ` Quels sont les animaux les plus nombreux ?<br>`;
    texte += num_alpha(1) + ` Quels sont les animaux les moins nombreux ?<br>`;

    let numAnimal = randint(0, nbAnimaux - 1);
    switch (parseInt(this.sup2)) {
      case 1: texte += num_alpha(2) + ` Donner un encadrement à la dizaine du nombre de ` + lstAnimauxExo[numAnimal] + ' ?<br>';
        break;
      case 2: texte += num_alpha(2) + ` Donner un encadrement à la centaine du nombre de ` + lstAnimauxExo[numAnimal] + ' ?<br>';
        break;
    }
    texte += '<br>'

    // coefficient pour gérer les deux types d'exercices (entre 1 et 100) ou (entre 10 et 1000)
    let coef = 1;
    switch (parseInt(this.sup2)) {
      case 1:
        coef = 1;
        break;
      case 2:
        coef = 10;
        break;
    }

    let r = repere2({
      grilleX: false,
      grilleY: 'pointilles',
      xThickListe: [],
      xLabelListe: [],
      yUnite: .1 / coef,
      yThickDistance: 10 * coef,
      yMax: 110 * coef,
      xMin: 0,
      xMax: 10,
      yMin: 0,
      axeXStyle: '',
      yLegende: "Nombre d'individus"
    });

    let lstElementGraph = []
    for (let i = 0; i < nbAnimaux; i++) {
      lstElementGraph.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiere_lettre_en_majuscule(lstAnimauxExo[i]), { unite: .1 / coef }))
    }

    texte += mathalea2d({ xmin: -5, xmax: 11, ymin: -4, ymax: 11, pixelsParCm: 30, scale: .5 }, r, lstElementGraph)
    // debut de la correction
    // question 1
    texte_corr = num_alpha(0) + ` Les animaux les plus nombreux sont les ` + lstAnimauxExo[lstNombresAnimaux.indexOf(nMax)] + '.<br>';
    // question 2
    texte_corr += num_alpha(1) + ` Les animaux les moins nombreux sont les ` + lstAnimauxExo[lstNombresAnimaux.indexOf(nMin)] + '.<br>';
    // question 3
    let reponse = lstNombresAnimaux[lstAnimauxExo.indexOf(lstAnimauxExo[numAnimal])];
    reponseinf = 10 * coef * Math.floor(reponse / (10 * coef))
    reponsesup = reponseinf + 10 * coef
    texte_corr += num_alpha(2) + ' Il y a entre ' + reponseinf + ' et ' + reponsesup + ' ' + lstAnimauxExo[numAnimal] + '.<br>';

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this);
  }
  this.besoin_formulaire_numerique = [`Nombre d'espèces différentes`, 3, ` choix 1 : 4 espèces\n choix 2 : 5 espèces\n choix 3 : 6 espèces`];
  this.besoin_formulaire2_numerique = [`Valeurs numériques`, 2, ` choix 1 : entre 1 et 100\n choix 2 : entre 100 et 1 000`];
}


