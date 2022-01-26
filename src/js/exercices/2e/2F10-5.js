import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, choice, texFractionReduite, ecritureAlgebrique } from '../../modules/outils.js'
import { resoudre } from '../../modules/outilsMathjs.js'
import { tableauDeVariation, mathalea2d, texteParPosition, repere, labelPoint, point, tracePoint, courbe2, repere2 } from '../../modules/2d.js'

export const titre = 'Déterminer le signe d’une fonction affine'

/**
* @author Stéphane Guyon
* 2F10-3
*/
export default function signefonctionaffine () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3 // On complète le nb de questions
  this.nbCols = 1
  this.nbColsCorr = 1
  this.video = ''
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1
  this.sup2 = false

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    // const o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)

    for (let i = 0, a, b, tA, lA, monRepere, maCourbe, ligne1, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      // typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) {
        a = randint(1, 4) * choice([-1, 1])// coefficient a de la fonction affine
        b = randint(0, 4) * choice([-1, 1])// coefficient b de la fonction affine

        if (a === 0 && b === 0) { // On évite la fonction nulle
          a = 1
        }

        texte = `Déterminer le signe de la fonction $f$ définie sur $\\mathbb R$ par $f(x)=${reduireAxPlusB(a, b)}$ <br>`

        if (this.sup2) {
          texteCorr = 'On résout l\'inéquation $f(x)>0$<br>'
          const inequation = resoudre(`${a}*x+${b}>0+0`)
          const inequation2 = resoudre(`${a}*x+${b}<0+0`)
          const equation = resoudre(`${a}*x+${b}=0+0`)
          // texteCorr += `${inequation.texteCorr}<br>`
          texteCorr += '$f(x)>0$<br>'
          texteCorr += `$${a}x${ecritureAlgebrique(b)}>0$<br>`
          texteCorr += `$${a}x${ecritureAlgebrique(b)}${ecritureAlgebrique(-b)}>0${ecritureAlgebrique(-b)}$<br>`
          texteCorr += `$${a}x>${-b}$<br>`
          texteCorr += `$\\dfrac{${a}x}{${a}}${a>0?'>':'<'}\\dfrac{${ecritureAlgebrique(-b)}}{${a}}$<br>`
          if(a !== 3) {
            texteCorr += `$x${a>0?'>':'<'}${parseFloat(-b/a)}$<br>`
          } else {
            texteCorr += `$x${a>0?'>':'<'}\\dfrac{${ecritureAlgebrique(-b)}}{${a}}$<br>`
          }
          texteCorr += `On montre de même que l'inéquation $f(x) < 0$ a pour solution $${inequation2.solution}$ et que l'équation $f(x)=0$ a pour solution $${equation.solution}$. <br>`
          ligne1 = a > 0 ? ['Line', 30, '', 0, '-', 20, 'z', 20, '+'] : ['Line', 30, '', 0, '+', 20, 'z', 20, '-']
        } else {
          texteCorr = 'On reconnaît que $f$ est une fonction affine, de la forme $f(x)=ax+b$.<br>'
          texteCorr += `Son coefficient $a$ vaut : $~a=${a}~$ et son coefficient $b$ vaut : $~b=${b}$. <br>`
          // texteCorr += `Selon les notations, on peut aussi appeler $f$ sous la forme $f(x)=mx+p$ avec : $m=${a}$ et $p=${b}$. <br>`
          texteCorr += 'On sait qu\'une fonction affine non constante admet une unique racine, $~x_0$.<br> '
          texteCorr += '$f(x)$ est du signe de $~a~$ pour les valeurs supérieures à $~x_0$,<br>'
          texteCorr += 'et du signe de l\'opposé de $~a~$ pour les valeurs inférieures à $~x_0$.<br>'
          texteCorr += 'On cherche donc la valeur de $~x_0~$, '
          texteCorr += `qui est la solution de l'équation : $${reduireAxPlusB(a, b)}=0$.<br>`
          texteCorr += `On obtient alors : $~x_0=${texFractionReduite(-b, a)} $<br>`
          texteCorr += `Comme  $~a=~${a}`
          if (a > 0) {
            texteCorr += `>0~$, $~f(x)$ est positive pour $~x>${texFractionReduite(-b, a)} ~$ et négative pour $~x<${texFractionReduite(-b, a)} $<br>`
            ligne1 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+']
          } else {
            texteCorr += `<0$,  $f(x)~$ est négative pour $~x>${texFractionReduite(-b, a)} ~$ et positive pour $~x<${texFractionReduite(-b, a)} $<br>`
            ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-']
          }
        }

        texteCorr += 'On peut synthétiser cela dans un tableau de signes :'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$f(x)=${reduireAxPlusB(a, b)}$`, 2, 50]
            ],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, `$x_0=${texFractionReduite(-b, a)}$`, 20, '$+\\infty$', 30]
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          tabLines: [ligne1],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [15, 15]
        }))

        texteCorr += 'Pour illustrer la situation, on peut représenter graphiquement la fonction :<br>'
        const f = x => a * x + b
        monRepere = repere2()
        maCourbe = courbe2(f, { repere: monRepere })
        const A = point(-b / a, 0, '$x_0$')
        lA = labelPoint(A, 'red')
        tA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
        texteCorr += mathalea2d({
          xmin: -5,
          ymin: -5,
          xmax: 6,
          ymax: 6
        }, monRepere, maCourbe, tA, lA)
      }

      if (this.questionJamaisPosee(i, this.sup, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Types de question ', 2, '1 : Valeurs entières\n2 : Valeurs fractionnaires.']
  this.besoinFormulaire2CaseACocher = ['Correction alternative']
}
