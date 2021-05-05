import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,combinaisonListes, randint, texNombre, choice, calcul} from '../../modules/outils.js'
export const titre = 'Écrire une fraction sur 100 puis sous la forme d’un pourcentage'

/**
 * Une fraction étant donnée, il faut l'écrire avec 100 au dénominateur puis donner son écriture sous forme de pourcentage.
 * @Auteur Rémi Angot
 * Référence 5N11-3
 * 2021-02-06
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Compléter";
  this.nbQuestions = 6;
  this.nbCols = 2; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_denominateurs = [10,20,50,1000,2,4,5,200]; // On créé 3 types de questions
    let listeTypeDeQuestions = combinaisonListes(type_de_denominateurs,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, den, num, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        den = listeTypeDeQuestions[i]
        if (den == 2) {
            num = choice([1,3,5])
        } else if (den == 1000){
            num = 10 * randint(1,99)
        } else if (den == 200){
            num = 2 * randint(1,99)
        } else {
            num = randint(1,den-1)
        }
        texte = `$\\dfrac{${num}}{${texNombre(den)}}=\\dfrac{\\phantom{XXXXXX}}{}=\\dfrac{}{100}=\\ldots\\ldots\\%$`
        if (den<100){
            texteCorr = `$\\dfrac{${num}}{${texNombre(den)}}=\\dfrac{${num}{\\color{blue}\\times${calcul(100/den)}}}{${den}{\\color{blue}\\times${calcul(100/den)}}}=\\dfrac{${calcul(num*100/den)}}{100}=${calcul(num*100/den)}~\\%$`
        } else {
            texteCorr = `$\\dfrac{${num}}{${texNombre(den)}}=\\dfrac{${num}{\\color{blue}\\div${calcul(den/100)}}}{${den}{\\color{blue}\\div${calcul(den/100)}}}=\\dfrac{${calcul(num*100/den)}}{100}=${calcul(num*100/den)}~\\%$`
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


