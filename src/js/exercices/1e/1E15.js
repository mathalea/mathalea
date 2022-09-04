/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
import { xcas, listeQuestionsToContenu, randint, texteGras } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
export const titre = 'Equation du second degré avec paramètre'
export const dateDePublication = '30/10/2021'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence 1E15
*/
export const uuid = 'fe4df'
export const ref = '1E15'
export default function equationDuSecondDegreAvecUnParametre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = `Discuter, suivant la valeur du paramètre $m$, le ${texteGras('nombre de solutions')} de l'équation du second degré.`
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, etape, texteCorr, a, a2, b2, c2, f, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      a = randint(-5, 5, 0)
      etape = [
          `a:=${a}`,
          'b:=randint(-2,2)*m+randint(-3,3)',
          'c:=randint(-2,2)*m+randint(-3,3)',
          'P:= a*x^2+b*x+c',
          'D:=b^2-4*a*c',
          'a2:=coeff(D,m,2)',
          'b2:=coeff(D,m,1)',
          'c2:=coeff(D,m,0)',
          'd2:=simplify(b2^2-4*a2*c2)'
      ].forEach(e => `${xcas(e)}`)
      // Enoncé
      texte = `$${xcas('expand(P)')}=0$`
      // Corrigé
      texteCorr = 'Ecrivons l\'équation sous la forme $ax^2+bx+c=0$ :'
      texteCorr += `<br>$${xcas('P')}=0$`
      texteCorr += `<br>On a donc $a=${xcas('a')}$, $b=${xcas('b')}$ et $c=${xcas('c')}$`
      texteCorr += `<br>Le discriminant vaut $\\Delta=b^2-4\\times a\\times c = ${xcas('D')}$`
      texteCorr += `<br>Ou encore, sous forme développée : $\\Delta = ${xcas('simplify(D)')}$`
      a2 = +`${xcas('a2')}` // coefficient "a" dans l'écriture de Delta
      b2 = +`${xcas('b2')}` // coefficient "b" dans l'écriture de Delta
      if (a2 === 0) { // Eq du 1er degré
        etape = `${xcas('m1:=simplify(-c2/b2)')}`
        if (b2 > 0) { // Delta est une droite croissante
          texteCorr += `<br>Cherchons la valeur de $m$ qui annule cette expression du premier degré : $m=${xcas('m1')}$`
          texteCorr += `<br>$\\Delta$ est une droite croissante de coefficient directeur $${xcas('b2')}$.`
          texteCorr += '<br>$\\underline{\\text{Conclusion}}$ :'
          texteCorr += `<br>- Si $m < ${xcas('m1')}$, l'équation n'a pas de solution réelle;`
          texteCorr += `<br>- Si $m = ${xcas('m1')}$, l'équation a une unique solution réelle;`
          texteCorr += `<br>- Si $m > ${xcas('m1')}$, l'équation a 2 solutions réelles;`
        } else if (b2 < 0) { // Delta est une droite décroissante
          texteCorr += `<br>Cherchons la valeur de $m$ qui annule cette expression du premier degré : $m=${xcas('m1')}$`
          texteCorr += `<br>$\\Delta$ est une droite décroissante de coefficient directeur $${xcas('b2')}$.`
          texteCorr += '<br>$\\underline{\\text{Conclusion}}$ :'
          texteCorr += `<br>- Si $m < ${xcas('m1')}$, l'équation a 2 solutions réelles;`
          texteCorr += `<br>- Si $m = ${xcas('m1')}$, l'équation a une unique solution réelle;`
          texteCorr += `<br>- Si $m > ${xcas('m1')}$, l'équation n'a pas de solution réelle;`
        } else { // Delta est constant
          c2 = +`${xcas('c2')}` // coefficient "c" dans l'écriture de Delta
          if (c2 === 0) {
            texteCorr += '<br>Quelque soit $m$ réel, on a $\\Delta$ qui est nul. L\'équation du départ admet donc toujours une unique solution.'
          } else if (c2 > 0) {
            texteCorr += '<br>Quelque soit $m$ réel, on a $\\Delta$ qui est strictement positif. L\'équation du départ admet donc toujours 2 solutions.'
          } else {
            texteCorr += '<br>Quelque soit $m$ réel, on a $\\Delta$ qui est strictement négatif. L\'équation du départ admet jamais de solution réelle.'
          }
        }
      } else {
        texteCorr += '<br>Cherchons les valeurs de $m$ qui annulent cette expression du second degré :'
        texteCorr += `<br>Le discriminant $\\Delta^\\prime$ vaut : $\\Delta^\\prime =${xcas('d2')}$`
        a = +`${xcas('d2')}` // valeur de Delta'
        f = eval(`${xcas('ifactors(d2)')}`).some((v, i) => v > 1 && i % 2 === 1) // Y a-t-il des carrés dans Delta' ?
        if (f && a > 0) {
          texteCorr += ` (Remarquons que $\\sqrt{\\Delta^\\prime} =${xcas('simplify(sqrt(d2))')}$)`
        }
        if (a < 0) {
          texteCorr += '<br>Celui-ci étant strictement négatif, l\'équation n\'a pas de solution et $\\Delta$ ne change pas de signe.'
          if (a2 > 0) {
            texteCorr += '<br>Comme le coefficient devant $m^2$ est positif, $\\Delta > 0$.'
            texteCorr += '<br>$\\underline{\\text{Conclusion}}$ : L\'équation du départ admet toujours 2 solutions.'
          } else {
            texteCorr += '<br>Comme le coefficient devant $m^2$ est négatif, $\\Delta < 0$.'
            texteCorr += '<br>$\\underline{\\text{Conclusion}}$ : L\'équation du départ n\'a pas de solution réelle.'
          }
        } else if (a === 0) {
          etape = `${xcas('m1:=simplify(-b2/(2*a2))')}`
          texteCorr += `<br>Celui-ci étant nul, l'équation $\\Delta = 0$ a une unique solution $m=\\dfrac{-b}{2a}=${xcas('m1')}$.`
          if (a2 > 0) {
            texteCorr += `<br>De plus le coefficient $${xcas('a2')}$ devant $m^2$ étant positif, $\\Delta > 0$ si $m\\neq${xcas('m1')}$.`
            texteCorr += `<br>$\\underline{\\text{Conclusion}}$ : Si $m=${xcas('m1')}$ l'équation admet une unique solution, sinon l'équation admet 2 solutions.`
          } else {
            texteCorr += `<br>De plus le coefficient $${xcas('a2')}$ devant $m^2$ étant négatif, $\\Delta < 0$ si $m\\neq${xcas('m1')}$.`
            texteCorr += `<br>$\\underline{\\text{Conclusion}}$ : Si $m=${xcas('m1')}$ l'équation admet une unique solution, sinon l'équation n'admet pas de solution.`
          }
        } else {
          etape = `${xcas('m1:=min((-b2-sqrt(d2))/(2*a2),(-b2+sqrt(d2))/(2*a2))')}`
          etape = `${xcas('m2:=max((-b2-sqrt(d2))/(2*a2),(-b2+sqrt(d2))/(2*a2))')}`
          texteCorr += '<br>Celui-ci étant strictement positif, l\'équation $\\Delta = 0$ a 2 solutions :'
          texteCorr += `<br>$m_1=${xcas('m1')}\\simeq${xcas('approx(m1,4)')}$ et $m_2=${xcas('m2')}\\simeq${xcas('approx(m2,4)')}$`
          if (a2 > 0) {
            texteCorr += '<br>De plus le coefficient devant $m^2$ est positif, $\\Delta$ est donc une parabole avec ses branches dirigées vers le haut.'
            texteCorr += '<br>$\\Delta$ est donc positif à l\'extérieur des racines et négatif à l\'intérieur.'
            texteCorr += '<br>$\\underline{\\text{Conclusion}}$ :<br> - Si $m=m_1$ ou $m_2$, l\'équation admet une unique solution,'
            texteCorr += '<br>- Si $m\\in ]m_1,m_2[$, l\'équation n\'a pas de solution réelle,'
            texteCorr += '<br>- Si $m\\in ]-\\infty,m_1[\\cup]m_2,+\\infty[$, l\'équation admet 2 solutions réelles'
          } else {
            texteCorr += '<br>De plus le coefficient devant $m^2$ est négatif, $\\Delta$ est donc une parabole avec ses branches dirigées vers le bas.'
            texteCorr += '<br>$\\Delta$ est donc négatif à l\'extérieur des racines et positif à l\'intérieur.'
            texteCorr += '<br>$\\underline{\\text{Conclusion}}$ :<br> - Si $m=m_1$ ou $m_2$, l\'équation admet une unique solution,'
            texteCorr += '<br>- Si $m\\in ]m_1,m_2[$, l\'équation admet 2 solutions réelles,'
            texteCorr += '<br>- Si $m\\in ]-\\infty,m_1[\\cup]m_2,+\\infty[$, l\'équation admet n\'a pas de solution réelle'
          }
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
