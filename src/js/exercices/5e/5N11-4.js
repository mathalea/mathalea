import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,combinaisonListes, randint, calcul, texNombre, tex_prix, arrondi} from '../../modules/outils.js'
export const titre = 'Exprimer une fractions sous la forme d’une valeur approchée d’un pourcentage'

/**
 * Déterminer une valeur approchée d'un pourcentage à l'aide de la calculatrice
 * @Auteur Rémi Angot
 * Référence 5N11-4
 * 2021-02-06
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "À l'aide de la calculatrice, donner une valeur approchée au centième près du quotient puis l'écrire sous la forme d'un pourcentage à l'unité près.";
  this.nbQuestions = 6;
  this.nbCols = 2; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let denominateur_disponibles = [100,200,300,1000]; 
    let listeTypeDeQuestions = combinaisonListes(denominateur_disponibles,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    if (this.sup == 2) {
        this.consigne = "À l'aide de la calculatrice, donner une valeur approchée au millième près du quotient puis l'écrire sous la forme d'un pourcentage au dixième près.";
    }
    for (let i = 0, texte, texteCorr, num, den, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        den = randint(10,listeTypeDeQuestions[i])
        num = randint(1,den-8)
        while (calcul(num/den)==arrondi(num/den,4)) {
            den = randint(10,listeTypeDeQuestions[i])
            num = randint(1,den-8)
        }
        texte = `$\\dfrac{${num}}{${den}}\\approx \\ldots\\ldots\\ldots $ soit environ $\\ldots\\ldots\\ldots~\\%$`
        if (this.sup == 1) {
            texteCorr = `$\\dfrac{${num}}{${den}}\\approx ${tex_prix(calcul(num/den,2))} $ soit environ $${calcul(calcul(num/den,2)*100)}~\\%$ $\\left(\\text{car } ${tex_prix(calcul(num/den,2))}=\\dfrac{${calcul(calcul(num/den,2)*100)}}{100}\\right)$.`
        }
        if (this.sup == 2) {
            texteCorr = `$\\dfrac{${num}}{${den}}\\approx ${texNombre(calcul(num/den,3))} $ soit environ $${texNombre(calcul(num/den*100,1))}~\\%$ $\\left(\\text{car } ${texNombre(calcul(num/den,3))}=\\dfrac{${texNombre(calcul(num/den*100,1))}}{100}\\right)$.`
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
  this.besoinFormulaireNumerique = ['Niveau de précision',2,"1 : Donner un pourcentage à l'unité près\n2 : Donner un pourcentage au dixième près"];
}


