import Exercice from '../ClasseExercice.js';
import {calcul,listeQuestionsToContenuSansNumero,lettreDepuisChiffre,randint,sp,choice,range1,combinaisonListes,ecritureAlgebrique,ecritureParentheseSiNegatif,miseEnEvidence,liste_des_diviseurs} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Calculs utilisant les priorités opératoires et les puissances'

/**
 * Plusieurs type de calcul avec priorités opératoires/ relatifs/ puissances
 *
 * Sans parenthèses :
 * * a²+b*c
 * * a+b²*c
 * * a²+b+c*d
 *
 * * a²*b+c
 * * a*b²+c
 * * a²+b+c
 * * a+b²+c
 * * a+b+c²
 * * a+b²+c*d
 * * a+b+c²*d
 * * a+b+c*d²
 * * a²*b+c*d
 * * a*b+c*d²
 *
 * Avec parenthèses :
 * * a²*(b+c)
 * * a*(b²+c*d)
 * * (a+b+c²)*d
 * * d²(a+b+c)
 *
 * * a*(b²+c)
 * * a*(b+c²)
 * * (a²+b)*c
 * * (a+b²)*c
 * * (a+b)*c²
 * * a²*(b+c)*d
 * * a*(b²+c)*d
 * * a*(b+c²)*d
 * * a*(b+c)*d²
 * * a²*b*(c+d)
 * * a*b²*(c+d)
 * * a*b*(c²+d)
 * * a*b*(c+d²)
 * * a²*(b+c*d)
 * * a*(b+c²*d)
 * * a*(b+c*d²)
 * * a²+(b+c)
 * * a+(b²+c)
 * * a+(b+c²)
 * * (a²+b+c)*d
 * * (a+b²+c)*d
 * @Auteur Mireille Gain
 * Référence 4C34
 * Date 2021-01-23
 */
export default function Priorites_et_relatifs_et_puissances() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer :";
  this.nbQuestions = 5;
  this.nbCols = 2;
  this.nbColsCorr = 1;
  this.tailleDiaporama = 100;
  this.video = "https://youtu.be/0G9xWLl-0zg" // Id YouTube ou url
  this.spacing = sortieHtml ? 3 : 1;
  this.spacingCorr = sortieHtml ? 3 : 1;

  this.nouvelleVersion = function () {
    this.qcm=['4C34',[],'Calculs utilisant les priorités opératoires et les puissances',5,{}]

    let reponse;
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let listeQuestions_disponibles = range1(7);

    let listeTypeDeQuestions = combinaisonListes(
      listeQuestions_disponibles,
      this.nbQuestions
    );
    for (
      let i = 0, texte, texteCorr, a, b, c, d,m, n, p, cpt = 0;
      i < this.nbQuestions && cpt < 50;)
    {
      a = randint(1, 7) * choice([-1, 1]);
      b = randint(1, 7) * choice([-1, 1]);
      c = randint(1, 7) * choice([-1, 1]);
      d = randint(1, 7) * choice([-1, 1]);
      m = randint(1, 5) * choice([-1, 1]);
      n = randint(1, 3) * (-1);
      p = randint(1, 3) ;
      switch (listeTypeDeQuestions[i]) {
        case 1: //a² + b*c
        texte = `$${lettreDepuisChiffre(i+1)} = ${ecritureParentheseSiNegatif(a)}^2 +  ${ecritureParentheseSiNegatif(b)} \\times ${ecritureParentheseSiNegatif(c)}$`;
        texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
        =${miseEnEvidence(ecritureParentheseSiNegatif(a)+'^2','blue')}  +  ${ecritureParentheseSiNegatif(b)} \\times ${ecritureParentheseSiNegatif(c)}
        \\\\&=${a*a} + ${miseEnEvidence((ecritureParentheseSiNegatif(b) + "\\times" + ecritureParentheseSiNegatif(c)),'blue')}
        \\\\&=${a*a} ${ecritureAlgebrique(b*c)}\\end{aligned}
        \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + ( a*a + b*c))}\\\\$`;
        reponse=calcul( a*a + b*c)
          break;

        case 2: //a + b²*c
          texte = `$${lettreDepuisChiffre(i+1)} = ${a} + ${ecritureParentheseSiNegatif(p)}^2 \\times ${ecritureParentheseSiNegatif(c)}$`;
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
          =${a} + ${miseEnEvidence(ecritureParentheseSiNegatif(p) + '^2', 'blue')} \\times ${ecritureParentheseSiNegatif(c)}
          \\\\&=${a} + ${miseEnEvidence(ecritureParentheseSiNegatif(p*p) + '\\times' + ecritureParentheseSiNegatif(c), 'blue')}
          \\\\&=${a + ecritureAlgebrique(p*p*c)}\\end{aligned}
          \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + (a + p*p*c))}\\\\$`;
          reponse=calcul(a + p*p*c)
            break;

        case 3: //a²+b+c*d
        texte = `$${lettreDepuisChiffre(i+1)} = ${ecritureParentheseSiNegatif(a)}^2   ${ecritureAlgebrique(b)} ${ecritureAlgebrique(c)} \\times ${ecritureParentheseSiNegatif(d)}$`;
        texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
        =${miseEnEvidence(ecritureParentheseSiNegatif(a) + '^2','blue')} ${ecritureAlgebrique(b)}  ${ecritureAlgebrique(c)} \\times ${ecritureParentheseSiNegatif(d)}
        \\\\&=${a*a} ${ecritureAlgebrique(b)} +  ${miseEnEvidence((ecritureParentheseSiNegatif(c) + "\\times" + ecritureParentheseSiNegatif(d)),'blue') }
        \\\\&=${a*a + ecritureAlgebrique(b)+ecritureAlgebrique(c*d)}\\end{aligned}
        \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + (a*a + b + c * d))}\\\\$`;
        reponse=calcul(a*a + b + c * d)
          break;

        case 4: //a²*(b+c)
          texte = `$${lettreDepuisChiffre(i+1)} = ${ecritureParentheseSiNegatif(n)}^2 \\times ( ${b + ecritureAlgebrique(c)})$`;
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
          =${miseEnEvidence(ecritureParentheseSiNegatif(n) + '^2','blue')}  \\times ( ${b+ecritureAlgebrique(c)})
          \\\\&=${n*n} \\times ( ${miseEnEvidence(b + ecritureAlgebrique(c), 'blue')})
          \\\\&=${n*n} \\times ${ecritureParentheseSiNegatif(b+c)}\\end{aligned}
          \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + (n*n*(b+c)))}\\\\$`;
          reponse=calcul(n*n*(b+c))
            break;

        case 5: //m*(n²+p*n)
            texte = `$${lettreDepuisChiffre(i+1)} = ${m} \\times ( ${ecritureParentheseSiNegatif(n)}^2${ecritureAlgebrique(p)}\\times${ecritureParentheseSiNegatif(n)})$`;
            texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
            =${m} \\times ( ${miseEnEvidence(ecritureParentheseSiNegatif(n)+'^2','blue')} ${ecritureAlgebrique(p)}\\times${ecritureParentheseSiNegatif(n)})
            \\\\&=${m} \\times ( ${n*n} + ${miseEnEvidence(ecritureParentheseSiNegatif(p) + "\\times" + ecritureParentheseSiNegatif(n),'blue') })
            \\\\&=${m}\\times ( ${miseEnEvidence((n*n + ecritureAlgebrique(p*n)),'blue') })
            \\\\&=${m}\\times ${ecritureParentheseSiNegatif( n*n + p*n)}\\end{aligned}
            \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + (m*(n*n+p*n)))}\\\\$`;
            reponse=calcul(m*(n*n+p*n))
              break;

        case 6: //(a+b+n²)*d
              texte = `$${lettreDepuisChiffre(i+1)} = (${a} ${ecritureAlgebrique(b)} + ${ecritureParentheseSiNegatif(n)}^2 ) \\times ${ecritureParentheseSiNegatif(d)}$`;
              texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
              =(${a} + ${ecritureParentheseSiNegatif(b)} + ${miseEnEvidence(ecritureParentheseSiNegatif(n) +'^2','blue')}  ) \\times ${ecritureParentheseSiNegatif(d)}
              \\\\&=(${miseEnEvidence((a + ecritureAlgebrique(b) + ecritureAlgebrique(n*n)),'blue') }) \\times ${ecritureParentheseSiNegatif(d)}
              \\\\&=${a + b + n*n} \\times ${ecritureParentheseSiNegatif(d)}\\end{aligned}
              \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + ((a+b+n*n)*d))}\\\\$`;
              reponse=calcul((a+b+n*n)*d)
                break;

        case 7: //n²*(a+b+c)
                texte = `$${lettreDepuisChiffre(i+1)} = ${ecritureParentheseSiNegatif(n)}^2 \\times ( ${a+ecritureAlgebrique(b)+ecritureAlgebrique(c)})$`;
                texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i+1)}&
                =${miseEnEvidence(ecritureParentheseSiNegatif(n) +'^2','blue') } \\times ( ${a} ${ecritureAlgebrique(b)} ${ecritureAlgebrique(c)})
                \\\\&=${n*n} \\times ( ${miseEnEvidence(a + ecritureAlgebrique(b) + ecritureAlgebrique(c),'blue')})
                \\\\&=${n*n} \\times ${ecritureParentheseSiNegatif(a+b+c)}\\end{aligned}
                \\\\${miseEnEvidence(lettreDepuisChiffre(i+1) + '=' + (n*n*(a+b+c)))}\\\\$`;
                reponse=calcul(n*n*(a+b+c))
                  break;

      }
       if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        this.qcm[1].push([texte, [texteCorr,reponse,3], {digits:3,decimals:0,signe:true,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenuSansNumero(this);
  };
}
// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
