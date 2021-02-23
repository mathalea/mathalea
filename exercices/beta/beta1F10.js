import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,ecriture_algebrique,ecriture_algebrique_sauf1,lettre_minuscule_depuis_chiffre,xcas} from "/modules/outils.js"

/**
 * Calculs de dérivés
 * @Auteur Rémi Angot
 * Référence 1F10
*/
export default function CalculsDeDerives() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculs de dérivés";
  this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée.";
  this.nb_questions = 6;
  this.nb_cols = 2; // Nombre de colonnes pour la sortie LaTeX
  this.nb_cols_corr = 2; // Nombre de colonnes dans la correction pour la sortie LaTeX
  this.sup = 1;
  this.type_exercice = 'XCas'
  // On modifie les règles de simplifications par défaut de math.js pour éviter 10x+10 = 10(x+1) et -4x=(-4x)
  let reglesDeSimplifications = math.simplify.rules.slice();
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l == "n1*n2 + n2"), 1);
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l == "n1*n3 + n2*n3"), 1);
  //    reglesDeSimplifications.push({l:"-(n1*v^2)",r:"-n1*v^2"})     
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    this.liste_valeurs = []; // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    let liste_type_de_questions_disponibles;
    if (this.sup == 1) {
      liste_type_de_questions_disponibles = ['ax+b', 'a', 'ax2+bx+c', 'xn', 'xn+xm', '1/x', 'xn+1/x', '1/xn', 'xn+1/xm', 'racine(x)'];
    }
    if (this.sup == 2) {
      liste_type_de_questions_disponibles = ['ax+b', 'axn', 'a/x', 'a/xn', 'racine(ax)'];
    }
    if (this.sup == 3) {
      liste_type_de_questions_disponibles = ['ax+b', 'axn', 'a/x', 'a/xn', 'racine(ax)'];
    }
    let liste_type_de_questions = combinaison_listes(liste_type_de_questions_disponibles, this.nb_questions);


    for (let i = 0, texte, texte_corr, a, b, c, n, m, expression, ensembleDerivation, cpt = 0; i < this.nb_questions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case 'a':
          a = randint(-10, 10, 0);
          expression = `${a}`;
          ensembleDerivation = `\\mathbb{R}`;
          break;
        case 'ax+b':
          a = randint(-10, 10, 0);
          b = randint(-10, 10, 0);
          expression = `${a}x+${b}`;
          ensembleDerivation = `\\mathbb{R}`;
          break;
        case 'ax2+bx+c':
          a = randint(-10, 10, 0);
          b = randint(-10, 10, 0);
          c = randint(-10, 10, 0);
          expression = `${a}*x^2+${b}x+${c}`;
          ensembleDerivation = `\\mathbb{R}`;
          break;
        case 'xn':
          n = randint(2, 10);
          expression = `x^${n}`;
          ensembleDerivation = `\\mathbb{R}`;
          break;
        case 'xn+1/x':
          n = randint(2, 10);
          expression = `x^${n}+1/x`;
          ensembleDerivation = `\\mathbb{R}^{\\text{*}}`;
          break;
        case 'xn+1/xm':
          n = randint(2, 10);
          m = randint(2, 10, m);
          expression = `x^${n}+1/x^${m}`;
          ensembleDerivation = `\\mathbb{R}^{\\text{*}}`;
          break;
        case 'xn+xm':
          n = randint(2, 10);
          m = randint(2, 10, m);
          expression = `x^${n}+x^${m}`;
          ensembleDerivation = `\\mathbb{R}`;
          break;
        case 'axn':
          a = randint(-10, 10, [0, 1, -1]);
          n = randint(2, 10);
          expression = `${a}x^${n}`;
          ensembleDerivation = `\\mathbb{R}`;
          break;
        case '1/x':
          expression = `1/x`;
          ensembleDerivation = `\\mathbb{R}^{\\text{*}}`;
          break;
        case 'a/x':
          a = randint(-10, 10, [0, 1]);
          expression = `${a}/x`;
          ensembleDerivation = `\\mathbb{R}^{\\text{*}}`;
          break;
        case '1/xn':
          n = randint(2, 10);
          expression = `${1}/x^${n}`;
          ensembleDerivation = `\\mathbb{R}^{\\text{*}}`;
          break;
        case 'a/xn':
          a = randint(-10, 10, [1, 0]);
          n = randint(2, 10);
          expression = `${a}/x^${n}`;
          ensembleDerivation = `\\mathbb{R}^{\\text{*}}`;
          break;
        case 'racine(x)':
          expression = `sqrt(x)`;
          ensembleDerivation = `[0,+\\infin[`;
          break;
        case 'racine(ax)':
          a = randint(2, 10, [4, 9]);
          expression = `sqrt(${a}x)`;
          ensembleDerivation = `[0,+\\infin[`;
          break;

      }

      texte = `$${lettre_minuscule_depuis_chiffre(i + 6)}:x\\longmapsto ${xcas(expression)}$`;
      texte_corr = `$${lettre_minuscule_depuis_chiffre(i + 6)}$ est dérivable sur $${ensembleDerivation}$ et $ ${lettre_minuscule_depuis_chiffre(i + 6)}':x\\longmapsto ${xcas(`simplifier(deriver(${expression}))`)}$`;

      


      if (this.liste_valeurs.indexOf(expression) == -1) {
        this.liste_valeurs.push(expression);
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Fonctions de base \n2 : ku']; //\n3 : u/v, uv'];
}
