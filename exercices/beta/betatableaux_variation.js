import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
import { tableau_de_variation,mathalea2d } from '/modules/2d.js';
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function variation_polynome_degre3() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "étude de fonction de degré 3";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.liste_packages='tkz-tab'

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

      //un tableau pour rire

      /*  let t=tableau_de_variation({escpl:5,tabInit:[[['$x$',1,10] ,['$f(x)=ax+b$',1,200],["$f '(x)=a$",1,200],['$a<0$',2,40],['$a>0$',2,40]],
        ['$-\\infty$',30,'$-\\dfrac{b}{a}$',40,'$+\\infty$',30]],
        tabLines:
        [['Line',200,'',0,'$\\text{signe de } -a$',220,'z',10,'$\\text{signe de } a$',200,'',0],
        ['Line',160,'',0,'',0,'$\\text{signe de } a$',200,'',0,'',0],
        ['Var',30,'-/$-\\infty$',30,'+C/$5$',10,'R\\',0,'-/$12$',20,'+/$+\\infty$',30],
        ['Ima',30,'1',10,'3',10,'2',10,'O',10],
        ['Var',30,'+/$10$',30,'-V-/$5$/$1$',10,'+D+/$3$/$1$',10,'R\\',0,'-/$-\\infty$',30],
        ['Ima',30,'1',10,'3',10,'2',10,'O',10]]})
        */

      // un tableau correct en exemple 

        // escpl=taille en cm entre deux antécédents, deltacl=distance entre la bordure et les premiers et derniers antécédents
        // lgt = taille de la première colonne tout est en cm
        // tabInit contient 2 tableaux
        // le premier contient des triplets [chaine d'entête,hauteur de ligne,nombre de pixels de largeur estimée du texte pour le centrage]
        // le deuxième contient une succession de chaines et de largeurs en pixels : ce sont les antécédent de la ligne d'entête
        // tabLines contient des tableaux de la forme ['type',...] 
        // type est 'Line' pour une ligne de signes et valeurs. Les valeurs sont données avec à la suite leur largeur estimée en pixels.
        // type est 'Var' pour une ligne de variations. Les variations sont des chaines respectant une syntaxe particulière.
        // On intercale une largeur estimée pour le texte éventuel
        // type est 'Ima' il faut 4 paramètres numériques : le 1er et le 2e sont les N° des antécédents entre lesquels on veut placer l'image
        // le 3e est la valeur de l'image et le 4e est la largeur estimée en pixels 
        // type est 'Val' il faut 5 paramètres : Idem Ima pour les deux premiers, le 3e est l'antécédent à ajouter, le 4e son image et le 5e sa taille
        // Pour plus d'info sur le codage des variations, voir ce tuto : https://zestedesavoir.com/tutoriels/439/des-tableaux-de-variations-et-de-signes-avec-latex/
       // reste à faire les types 'Ima', 'Val' et 'Slope"

        let t=tableau_de_variation({escpl:5,delatcl:0.8,lgt:3.5, 
        tabInit:[[['$x$',1,10],["$f'(x)$",1,30],["$f(x)$",2,25]],
       ['$-\\infty$',18,'$\\sqrt{2}$',15,'$3$',10,'$4$',10]],
        tabLines:
        [['Line',30,'',0,'-',6,'z',10,'+',8,'d',6,'+',8,'d',6],
        ['Var',10,'-/$-\\infty$',18,'-CH/$3$',0,'+D-/$+\\infty$/$\\dfrac{3}{2}$',18,'+D/$+\\infty$',18],
        ['Val',3,4,0.25,'$\\sqrt{10}$','$7$',20]
      ]
      })

      // Attention : pixelsParCm n'influe pas sur le latexParCoordonnees, il faudra laisser 30 !
      // Sinon, le tableau sera réduit mais pas le texte à l'intérieur.

        texte = mathalea2d({xmin:0,ymin:-15,xmax:21,ymax:1,pixelsParCm:30},t);
          texte_corr = ``;
       

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
  this.besoin_formulaire_texte = ['coefficients de $ax^3+bx^2+cx+d$ séparés par des tirets'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

