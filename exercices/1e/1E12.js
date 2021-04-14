import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,rien_si_1,ecriture_algebrique,ecriture_algebrique_sauf1,ecriture_parenthese_si_negatif,calcul,tex_nombrec,lettre_minuscule_depuis_chiffre,tex_nombre,mise_en_evidence} from "/modules/outils.js"
import {repere,courbe,mathalea2d,} from "/modules/2d.js"


/**
 * @Auteur Jean-Claude Lhote
 * Trois type de questions proposées :
 * 1) passant par trois dont deux d'abscisses opposées et le troisième d'abscisse 0 (pour simplifier la résolution du système)
 * 2) Passant par un point et dont on connait le sommet
 * 3) connaissant les deux racines et un autre point de passage à coordonnées entières
 * référence 1E12
 */
 export default function Trouver_equation_parabole() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Trouver l'équation d'une parabole";
    this.consigne = "Trouver l'expression de la fonction f.";
    this.nb_questions = 5;
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing_corr = 3;
    this.sup = 4;
    this.correction_detaillee_disponible=true
  
    this.nouvelle_version = function () {
      var pixelsParCm=20
      this.liste_questions = []; // Liste de questions
      this.liste_corrections = []; // Liste de questions corrigées
      let liste_type_de_questions,type_de_questions_disponibles;
      if (this.sup<4) type_de_questions_disponibles=[parseInt(this.sup)]
      else type_de_questions_disponibles=[1,2,2,3,3]
      let f_name=[],Ymin,Yscale,Ymax
      liste_type_de_questions=combinaison_listes(type_de_questions_disponibles,this.nb_questions)
      for (let i = 0, texte, texte_corr, a, b, c, x1, x2,x3,f,r,svgYmin,svgYmax,F, cpt = 0;i < this.nb_questions && cpt < 50;) {
        f_name.push(lettre_minuscule_depuis_chiffre(i+6))
        texte = `Quelle est l'expression de la fonction polynomiale $\\mathscr{${f_name[i]}}$ du second degré `
        texte_corr=``
        switch (liste_type_de_questions[i]) {
            case 1 : // passe par 3 points à coordonnées entières dont -x1, 0 et x1.
            a=randint(-4,4,0)
            b=randint(-6,6,0)
            c=randint(-10,10,0)
            x1=randint(1,5)
            x2=randint(-5,5,x1)
            x3=randint(-5,5,[x1,x2])
             f = function(x) {
              return calcul(a*x**2+b*x+c)
            }
            texte+=`qui passe par les points de coordonnées $(${-x1};${f(-x1)})$, $(0;${f(0)})$ et $(${x1};${f(x1)})$ ?<br>`
            texte_corr=`Soit $\\mathscr{${f_name[i]}}(x)=ax^2+bx+c$ , l'expression de la fonction cherchée, comme $\\mathscr{${f_name[i]}}(0)=${f(0)}$ nous en déduisons que $c=${mise_en_evidence(f(0),'red')}$.<br>`
            texte_corr+=`Donc $\\mathscr{${f_name[i]}}(x)=ax^2+bx${mise_en_evidence(ecriture_algebrique(f(0)),'red')}$.<br>`
            texte_corr+=`En substituant dans cette expression les valeurs de l'énoncé, nous obtenons :<br>`
            texte_corr+=`$\\begin{cases}
            ${f(x1)}=a\\times${x1}^2+b\\times${x1}${ecriture_algebrique(f(0))}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique_sauf1(x1)+'b'+ecriture_algebrique(f(0)))} \\\\
            ${f(-x1)}=a\\times(${-x1})^2+b\\times(${-x1})${ecriture_algebrique(f(0))}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique_sauf1(-x1)+'b'+ecriture_algebrique(f(0)))}
         \\end{cases}$<br>`
            if (this.correction_detaillee) {
              texte_corr+=`Ce qui équivaut à <br>$\\begin{cases}
                 ${f(x1)}${ecriture_algebrique(-f(0))}=${f(x1)-f(0)}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a' + ecriture_algebrique_sauf1(x1)+'b')} \\\\
                 ${f(-x1)}${ecriture_algebrique(-f(0))}=${f(-x1)-f(0)}=${Algebrite.eval(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique_sauf1(-x1)+'b')}
               \\end{cases}$<br>`
               texte_corr+=`En ajoutant et en soustrayant les équations membre à membre, on obtient :<br>
                $\\begin{cases}
                ${f(x1)+f(-x1)-2*f(0)}=${2*x1**2}a \\\\
                ${f(x1)-f(-x1)}=${2*x1}b
             \\end{cases}$<br>`
            }
         texte_corr+=`La résolution de ce système donne $a=${mise_en_evidence(tex_nombre(a),'blue')}$ et $b=${mise_en_evidence(tex_nombre(b),'green')}$.<br>`
         texte_corr+=`D'où $\\mathscr{${f_name[i]}}(x)=${mise_en_evidence(ecriture_algebrique_sauf1(a),'blue')}x^2 ${mise_en_evidence(ecriture_algebrique_sauf1(b),'green')}x  ${mise_en_evidence(ecriture_algebrique(c),'red')}$<br>`
   
            break;
          case 2 : // Passant par le sommet (x1,y1) et par le point (x2,y2)
          a=randint(-3,3,0)
          b=randint(-3,3,0)*2*a
          c=randint(-10,10)
          x1=calcul(-b/(2*a))
          x2=randint(-5,5,x1)
          x3=randint(-5,5,[x1,x2])
  
         f = function(x) {
          return calcul(a*x**2+b*x+c)
        }
            texte+=`dont la parabole a pour sommet le point de coordonnées $(${x1};${f(x1)})$ et passe par le point de coordonnées $(${x2};${f(x2)})$ ?<br>`;
            texte_corr=`D'après les coordonnées $(${x1};${f(x1)})$ du sommet, $\\mathscr{${f_name[i]}}$ a pour forme canonique : $\\mathscr{${f_name[i]}}(x)=a(x${ecriture_algebrique(-x1)})^2${ecriture_algebrique(f(x1))}$.<br>`
            texte_corr+=`De plus $\\mathscr{${f_name[i]}}(${x2})=${f(x2)}$`
            if (this.correction_detaillee) {
              texte_corr+=` donc $a(${x2}${ecriture_algebrique(-x1)})^2${ecriture_algebrique(f(x1))}=${f(x2)}$ `
              texte_corr+=`soit $${Algebrite.eval(x2**2+'a'+ecriture_algebrique(-2*x1*x2)+'a'+ecriture_algebrique(x1**2)+'a'+ecriture_algebrique(f(x1)))}=${f(x2)}$.<br>`
            if (x2**2-2*x1*x2+x1**2!=1)
              texte_corr+=`On en déduit que $a=\\dfrac{${f(x2)}${ecriture_algebrique(-f(x1))}}{${(x2**2-2*x1*x2+x1**2)}}=${a}$.<br>`
            else
              texte_corr+=`On en déduit que $a=${f(x2)}${ecriture_algebrique(-f(x1))}=${a}$.<br>`
            }
            else texte_corr+=` donc $a=${a}$.<br>`
            if (this.correction_detaillee) {
              texte_corr+=`Développons la forme canonique : $\\mathscr{${f_name[i]}}(x)=
              a(x${ecriture_algebrique(-x1)})^2${ecriture_algebrique(f(x1))}=
              a(x^2${mise_en_evidence(ecriture_algebrique(-2*x1),'green')}x+${mise_en_evidence(tex_nombrec(x1**2),'red')})${mise_en_evidence(ecriture_algebrique(f(x1)),'red')}
              =${mise_en_evidence('a','blue')}x^2${mise_en_evidence(ecriture_algebrique(-2*x1)+'a','green')}x${mise_en_evidence(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique(f(x1)),'red')}$.<br>`
            }
            texte_corr+=`En remplaçant $a$ par sa valeur $${a}$ dans l'expression canonique développée $${mise_en_evidence('a','blue')}x^2${mise_en_evidence(ecriture_algebrique(-2*x1)+'a','green')}x${mise_en_evidence(ecriture_algebrique_sauf1(x1**2)+'a'+ecriture_algebrique(f(x1)),'red')}$ on obtient :<br>`
            texte_corr+=`$\\mathscr{${f_name[i]}}(x)=${mise_en_evidence(rien_si_1(a),'blue')}x^2${mise_en_evidence(ecriture_algebrique_sauf1(b),'green')}x${mise_en_evidence(ecriture_algebrique(c),'red')}$`
             break;
          case 3: // on a deux racines x1 et x2 et un troisième point (x3;f(x3))
          x1=randint(-6,-1)
          x2=randint(1,6,-x1)
          x3=randint(-5,5,[x1,x2])
          a=randint(-4,4,0)
          b=calcul(-a*(x1+x2))
          c=a*x1*x2
          f = function(x) {
            return calcul(a*x**2+b*x+c)
          }
               texte+=`qui s'annule en $x=${x1}$ et en $x=${x2}$ et dont la parabole passe par le point de coordonnées $(${x3};${f(x3)})$ ?<br>`
            texte_corr+=`Comme $${x1}$ et $${x2}$ sont les deux solutions de l'équation $\\mathscr{${f_name[i]}}(x)=0$, on peut factoriser $\\mathscr{${f_name[i]}}(x)$ :<br>`
            texte_corr+=`$\\mathscr{${f_name[i]}}(x)=a(x${ecriture_algebrique(-x1)})(x${ecriture_algebrique(-x2)})$.<br>`
            texte_corr+=`Comme $\\mathscr{${f_name[i]}}(${x3})=${f(x3)}$, on en déduit que `
            if (this.correction_detaillee) {
              texte_corr+=`$${f(x3)}=a(${x3}${ecriture_algebrique(-x1)})(${x3}${ecriture_algebrique(-x2)})$ `
              texte_corr+=`d'où $a=${f(x3)}\\div ${ecriture_parenthese_si_negatif((x3-x1)*(x3-x2))}=${a}$.<br>`
            }
            else texte_corr+=`$a=${a}$.<br>`
            texte_corr+=`On obtient ainsi $\\mathscr{${f_name[i]}}(x)=${rien_si_1(a)}(x${ecriture_algebrique(-x1)})(x${ecriture_algebrique(-x2)})$ ou en développant $\\mathscr{${f_name[i]}}(x)=${Algebrite.eval(`${ecriture_algebrique_sauf1(a)}x^2 ${ecriture_algebrique_sauf1(b)}x  ${ecriture_algebrique(c)}`)}$`
            break;
  
        }
        if (a<0) {
          Ymax=Math.ceil(f(-b/(2*a))+2)
          Ymin=Math.min(f(x1),f(x2),f(x3),f(-x1),f(0),f(-6),f(6))
        }
        else {
          Ymin=Math.floor(f(-b/(2*a))-2)
          Ymax=Math.max(f(x1),f(x2),f(x3),f(-x1),f(0),f(-6),f(6))
        }
  
        if (Ymax-Ymin<10) Yscale=2
        else Yscale =Math.max(1,calcul(Math.round(Math.ceil((Ymax-Ymin)/10)/5)*5))*2
        r = repere({
          xmin: -10,
          ymin: Ymin-Yscale,
          ymax: Ymax+Yscale,
          xmax: 10,
          xscale: 1,
          yscale:Yscale,
          positionLabelY:-0.8
        })
  
        svgYmin=Math.min(calcul(Ymin/Yscale),-1)
        svgYmax=Math.max(calcul(Ymax/Yscale),1)
        F = x => a*x**2+b*x+c;
        texte+=mathalea2d({xmin:-10, xmax:11,ymin:svgYmin,ymax:svgYmax+2,pixelsParCm:pixelsParCm,scale:.6},courbe(F,-10,10,'blue',1.5,r),r)
        if (this.liste_questions.indexOf(texte) == -1) {
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this);
    };
   this.besoin_formulaire_numerique = ['Type de questions ',4,"1 : Passant par trois points à coordonnées entières 1\n2 : Connaissant le sommet et un point de passage\n3 : Connaissant les deux racines et un point de passage\n4 : Mélange des trois type de questions"];
  }