import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, choice, ecritureAlgebrique, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'
import { tableauDeVariation, courbe, repere } from '../../modules/2d.js'

export const titre = 'Déterminer le sens de variation d\'une fonction affine'

/**
* @author Stéphane Guyon
* 2F10-3
*/
export default function variationsfonctionaffine () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2 // On complète le nb de questions
  this.nbCols = 1
  this.nbColsCorr = 1
  this.video = ''
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, a, b, t, monRepere, maCourbe, ligne1, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      // typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) {
        a = randint(1, 4) * choice([-1, 1])// coefficient a de la fonction affine
        b = randint(0, 4) * choice([-1, 1])// coefficient b de la fonction affine

        if (a === 0 && b === 0) { // On évite la fonction nulle
          a = 1
        }

        texte = 'Déterminer le sens de variation de la fonction $f$ définie sur $\\mathbb R$ par'
        if (b < 0) {
          t = randint(1, 3)
          if (t > 1 && a !== 1) { texte += `$f(x)=${b} ${ecritureAlgebrique(a)}x$. <br>` }
          if (t > 1 && a === 1) { texte += `$f(x)=${b}${ecritureAlgebriqueSauf1(a)}x$.<br>` }
          if (t > 1) {
            texteCorr = 'On reconnaît que $f$ est une fonction affine, de la forme $f(x)=ax+b$, '
            texteCorr += `avec $a=${a}~$ et $b=${b}$. <br>`
            texteCorr += `On a donc : $f(x)=${reduireAxPlusB(a, b)}$ .<br>`
          }
          if (t === 1) { texte += `$f(x)=${reduireAxPlusB(a, b)}$ .<br>` }
        } else {
          texte += `$f(x)=${reduireAxPlusB(a, b)}$ .<br>`
          texteCorr = 'On reconnaît que $f$ est une fonction affine, de la forme $f(x)=ax+b$, '
          texteCorr += `avec $a=${a}~$ et $b=${b}$. <br>`
        }

        // texteCorr += `Selon les notations, on peut aussi appeler $f$ sous la forme $f(x)=mx+p$ avec : $m=${a}$ et $p=${b}$. <br>`
        texteCorr += 'On sait qu\'une fonction affine est monotone sur $\\mathbb{R}$.<br> '
        texteCorr += 'Son sens de variation dépend du signe de $a$.<br>'
        if (a > 0) {
          texteCorr += `Comme $~a~=${a}>0$ , la fonction $f$ est strictement croissante sur $\\mathbb{R}$.<br>`
        } else {
          texteCorr += `Comme $~a~=${a}<0$ , la fonction $f$ est strictement décroissante sur $\\mathbb{R}$.<br>`

          ligne1 = ['Var', 10, '+/', 30, '-/', 30]
        }
        texteCorr += 'On peut synthétiser cela dans un tableau de variations :<br><br>'
        texteCorr += mathalea2d({ xmin: -2, ymin: -6.1, xmax: 15, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$f(x)=${reduireAxPlusB(a, b)}$`, 2, 100]
            ],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, '$+\\infty$', 30]
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          tabLines: [ligne1],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [15, 25]
        }))

        texteCorr += 'Pour illustrer la situation, on peut représenter graphiquement la fonction :<br><br>'
        const f = x => a * x + b
        monRepere = repere({ xMin: -5, grilleXMin: -5 })
        maCourbe = courbe(f, { repere: monRepere })
        // this.spacing = (context.isHtml) ? 2 : 1
        texteCorr += mathalea2d({
          xmin: -7,
          ymin: -5,
          xmax: 6,
          ymax: 6
        }, monRepere, maCourbe)
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
}
