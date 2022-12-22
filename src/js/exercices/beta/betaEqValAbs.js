import { xcas, listeQuestionsToContenu, randint, texMasse } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { tableauDeVariation } from '../../modules/TableauDeVariation.js'
export const titre = 'Equation avec une valeur absolue'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function EquationAvecUneValeurAbsolue () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre dans $\\mathbb{R}$ les équations :'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1.5)
  this.listePackages = 'tkz-tab' // Pour la compilation LateX des tableaux de signes

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, etape, texteCorr, a, b, pente, signe, entier, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      a = randint(-5, 5, 0) + '*x+' + randint(-20, 20)
      b = randint(-5, 5, 0) + '*x+' + randint(-20, 20)
      etape = [
            `a:=simplify(${a})`,
            'pente:=lcoeff(a)',
            `b:=simplify(${b})`,
            'x1:=solve(a)(1)'
      ].forEach(e => `${xcas(e)}`)
      pente = +`${xcas('pente')}` > 0 ? 'croissante' : 'décroissante'
      signe = +`${xcas('pente')}` > 0 ? '-+' : '+-'
      etape = [
            `cas1:=simplify(${signe[0]}a)`,
            `cas2:=simplify(${signe[1]}a)`,
            'scas1:=solve(cas1=b)',
            'xcas1:=piecewise(len(scas1)>0, scas1(1), i)',
            'scas2:=solve(cas2=b)',
            'xcas2:=piecewise(len(scas2)>0, scas2(1), i)'
      ].forEach(e => `${xcas(e)}`)

      // Enoncé
      texte = `$${xcas('abs(a)')}=${xcas('b')}$`
      // Corrigé
      texteCorr = 'Pour supprimer la valeur absolue, on cherche la valeur remarquable qui annule l\'expression entre les $\\mid.\\mid$'
      entier = (1e3 * +`${xcas('approx(x1,4)')}`) % 1 === 0 ? '' : `\\simeq${xcas('approx(x1,4)')}`
      texteCorr += `<br>On aura $${xcas('a')}=0$ lorsque $x=${xcas('x1')}${entier}$`
      texteCorr += `<br>De plus la droite $y=${xcas('a')}$ est ${pente}, ce qui permet d'obtenir le tableau des signes suivant :`

      texteCorr += mathalea2d({ xmin: -0.5, ymin: -8.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
        tabInit: [
          [
            // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
            ['$x$', 2.5, 10], [`$${xcas('a')}$`, 1.5, 50], [`$${xcas('abs(a)')}$`, 1.5, 50], ['', 1.2, 20]
          ],
          // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
          ['$-\\infty$', 20, `$${xcas('x1')}$`, 40, '$+\\infty$', 20]
        ],
        // Les autres lignes du tableau dont le fonctionnement est expliqué plus haut
        tabLines: [['Line', 20, '', 0, `$${signe[0]}$`, 50, 'z', 20, `$${signe[1]}$`, 50],
          ['Line', 20, '', 0, `$${xcas('cas1')}$`, 50, 'z', 20, `$${xcas('cas2')}$`, 50],
          ['Line', 20, '', 0, '$\\text{Cas 1}$', 50, 't', 20, '$\\text{Cas 2}$', 50]
        ],

        colorBackground: '',
        espcl: 3.5, // taille en cm entre deux antécédents
        deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
        lgt: 8, // taille de la première colonne en cm
        hauteurLignes: [15, 15, 15, 10]

      }))

      texteCorr += `<br>$\\underline{\\text{Cas 1}}$ : On cherche $x\\in ]-\\infty,${xcas('x1')}]$ tels que : $${xcas('cas1')}=${xcas('b')}$`
      texteCorr += `<br>Ce qui donne $${xcas('simplify(cas1-b)')}=0$ d'où `

      if (`${xcas('xcas1')}` === 'i') {
        texteCorr += 'une impossibilité.'
      } else {
        texteCorr += `$x=${xcas('xcas1')}$`
        // On teste si on doit afficher la valeur approchée du résultat
        entier = (1e3 * +`${xcas('approx(xcas1,4)')}`) % 1 === 0 ? '' : `\\simeq${texMasse(`${xcas('approx(xcas1,4)')}`)}`
        if (`${xcas('xcas1<=x1')}`.includes('true')) {
          texteCorr += `<br>Cette solution $\\textbf{convient}$ car $x=${xcas('xcas1')}${entier}\\in ]-\\infty,${xcas('x1')}]$`
        } else {
          texteCorr += `<br>Cette solution $\\underline{\\text{ne convient pas}}$ car $x=${xcas('xcas1')}${entier}\\notin ]-\\infty,${xcas('x1')}]$`
        }
      }
      texteCorr += `<br>$\\underline{\\text{Cas 2}}$ : On cherche $x\\in [${xcas('x1')},+\\infty[$ tels que : $${xcas('cas2')}=${xcas('b')}$`
      texteCorr += `<br>Ce qui donne $${xcas('simplify(cas2-b)')}=0$ d'où `

      if (`${xcas('xcas2')}` === 'i') {
        texteCorr += 'une impossibilité.'
      } else {
        texteCorr += `$x=${xcas('xcas2')}$`
        entier = (1e3 * +`${xcas('approx(xcas2,4)')}`) % 1 === 0 ? '' : `\\simeq${xcas('approx(xcas2,4)')}`
        if (`${xcas('xcas2>=x1')}`.includes('true')) {
          // eslint-disable-next-line no-unused-vars
          etape = `$x=${xcas('xcas2')}\\simeq${xcas('approx(xcas2,4)')}$`
          texteCorr += `<br>Cette solution $\\textbf{convient}$ car $x=${xcas('xcas2')}${entier}\\in [${xcas('x1')},+\\infty[$`
        } else {
          texteCorr += `<br>Cette solution $\\underline{\\text{ne convient pas}}$ car $x=${xcas('xcas2')}${entier}\\notin [${xcas('x1')},+\\infty[$`
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
