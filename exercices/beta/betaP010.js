import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,ecriture_parenthese_si_negatif,printlatex,ecriture_algebrique,arrondi_virgule,ecriture_algebrique_sauf1,ecriture_nombre_relatif} from "/modules/outils.js"
import { tableau_de_variation,mathalea2d } from '/modules/2d.js';
import {fraction} from "/modules/Fractions.js"
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
  this.sup = "1/-2/3/-5" ; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.liste_packages='tkz-tab'

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

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
        // Pour plus d'info sur le codage des variations, voir ce tuto : https://zestedesavoir.com/tutoriels/439/des-tableaux-de-variations-et-de-signes-avec-latex/
       // reste à faire les types 'Ima', 'Val' et 'Slope"
    let texte='',texte_corr=''
       let coef_f=this.sup.split('/')
    let a,b,c,d,a1,b1,c1,a2,b2,xx,rac=[],t
    [a,b,c,d]=coef_f
    a1=3*a
    b1=2*b
    c1=c
    a2=6*a
    b2=2*b
    let x2=fraction(b,3*a)
    let trouver_les_racines=function(a,b,c){

    let delta=b*b-4*a*c // on calcule les racines de f'
    if (delta<0) return []
    else if (delta==0) return [-b/2/a]
    let x1=(-b+Math.sqrt(delta))/2/a
    let x3=(-b-Math.sqrt(delta))/2/a
    if (x3<x1) { // on ordonne les racines de f'
      xx=x3
      x3=x1
      x1=xx
    }
      return [x1,x3]    

  }
    let f=function(x){
      return a*x**3+b*x**2+c*x+d
    }
    let f1=function(x){
      return a1*x**2+b1*x+c1
    }
    let f2=function(x){
      return a2*x+b2
    }
    if (a<0){
        if (f1(x2.num/x2.den)>0 ){ // la dérivée croit jusqu'à un maximum >0 , il y a deux zéros donc négatif-positif-négatif
          rac=trouver_les_racines(a1,b1,c1)
          t=tableau_de_variation({escpl:5,delatcl:0.8,lgt:3.5, 
            tabInit:[[['$x$',1,10],["$f'(x)$",1,30],["$f(x)$",2,25]],
           ['$-\\infty$',18,`$${arrondi_virgule(rac[0])}$`,15,`$${arrondi_virgule(rac[1])}$`,15,'$+\\infty$',18]],
            tabLines:
            [['Line',30,'',0,'-',6,'z',0,'+',6,'z',0,'-',6],
            ['Var',10,'+/$+\\infty$',18,`-/$${arrondi_virgule(f(rac[0]))}$`,15,`+/$${arrondi_virgule(f(rac[0]))}$`,15,'-/$-\\infty$',18]
          ]
          })
        }
        else { //  la dérivée croit jusqu'à un maximum <0 , il n'y a pas de zéro donc négatif sur tout l'interval
        t=tableau_de_variation({escpl:5,delatcl:0.8,lgt:3.5, 
          tabInit:[[['$x$',1,10],["$f'(x)$",1,30],["$f(x)$",2,25]],
         ['$-\\infty$',18,'$+\\infty$',18]],
          tabLines:
          [['Line',30,'-',6],
          ['Var',10,'+/$+\\infty$',18,'-/$-\\infty$',18]
        ]
        })

        }

    }
    else {
      if (f1(x2.num/x2.den)>0 ) {//  la dérivée décroit jusqu'à un minimum >0 , il n'y a pas de zéro donc positif sur tout l'interval
          t=tableau_de_variation({escpl:5,delatcl:0.8,lgt:3.5, 
        tabInit:[[['$x$',1,10],["$f'(x)$",1,30],["$f(x)$",2,25]],
       ['$-\\infty$',18,'$+\\infty$',18]],
        tabLines:
        [['Line',30,'+',6],
        ['Var',10,'-/$-\\infty$',18,'+/$+\\infty$',18]
      ]
      })


      }
      else {// la dérivée décroit jusqu'à un minimum <0 , il y a deux zéros donc positif-négatif-positif
      rac=trouver_les_racines(a1,b1,c1)
      t=tableau_de_variation({escpl:5,delatcl:0.8,lgt:3.5, 
        tabInit:[[['$x$',1,10],["$f'(x)$",1,30],["$f(x)$",2,25]],
       ['$-\\infty$',18,`$${arrondi_virgule(rac[0])}$`,15,`$${arrondi_virgule(rac[1])}$`,15,'$+\\infty$',18]],
        tabLines:
        [['Line',30,'',0,'+',6,'z',0,'-',6,'z',0,'+',6],
        ['Var',10,'-/$-\\infty$',18,`+/$${arrondi_virgule(f(rac[0]))}$`,15,`-/$${arrondi_virgule(f(rac[1]))}$`,15,'+/$+\\infty$',18]
      ]
      })

      }


    }

      // Attention : pixelsParCm n'influe pas sur le latexParCoordonnees, il faudra laisser 30 !
      // Sinon, le tableau sera réduit mais pas le texte à l'intérieur.
    texte=`Tableau de variation de la fonction : $f(x)=$`
    let fx=`${ecriture_nombre_relatif(a)}*x^3+(${ecriture_nombre_relatif(b)})*x^2+(${ecriture_nombre_relatif(c)})*x+(${ecriture_nombre_relatif(d)})`
    console.log(fx)
      texte+=`$${printlatex(fx)}$.<br>`
        texte += mathalea2d({xmin:0,ymin:-6,xmax:21,ymax:1,pixelsParCm:30},t);
          texte_corr = ``;

        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);

    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_texte = ['coefficients de $ax^3+bx^2+cx+d$ séparés par des /'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

