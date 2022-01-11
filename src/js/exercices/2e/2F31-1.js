import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, calcul, texNombrec, miseEnEvidence, texFraction } from '../../modules/outils.js'
export const titre = 'Utiliser les variations des fonctions de référence pour comparer des images'
export const dateDePublication = '07/01/2022'
/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
function ecritureParentheseSiNegatif (a, maximumFractionDigits = 15) {
  const result = Intl.NumberFormat('fr-FR', { maximumFractionDigits: maximumFractionDigits }).format(a).replace(',', '{,}')
  return a < 0 ? `(${result})` : result
}
export default function ComparerAvecFctRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  // this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1
  this.spacingCorr = 2
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['carré']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['inverse']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['cube']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['racine carrée']
    } else if (this.sup === 5) {
      typeDeQuestionsDisponibles = ['carré', 'carré', 'inverse', 'cube', 'racine carrée']
    }
    const listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
      [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
      [2, 9], [5, 9], [8, 9], [1, 11], [3, 11], [5, 11], [7, 11], [9, 11], [10, 11], [3, 13], [7, 13]]
    const listeFractions2 = [[1, 3], [1, 4], [1, 5], [3, 5],
      [1, 6], [1, 7], [3, 7], [5, 7], [1, 8], [5, 8],
      [1, 9], [4, 9], [7, 9], [2, 11], [4, 11], [6, 11], [8, 11], [9, 11], [1, 13], [5, 13]]
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, N, texte, texteCorr, fraction1 = [], fraction2 = [], n1, d1, n2, d2, d3, n3, n4, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'carré':
          N = randint(1, 3)
          if (N === 1) {
            a = calcul(randint(0, 5) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000)
            b = calcul(a + (2 * randint(1, 9) / 1000) * choice([1, -1]))
            texte = `En utilisant le sens de variation d'une fonction de référence, comparer $${texNombrec(a)}^2$ et $${texNombrec(b)}^2$.`
            texteCorr = `On doit comparer les carrés de deux nombres. On utilise donc la fonction carré.<br>
            La fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre. Cela signifie que deux nombres positifs sont rangés dans le même ordre que leurs carrés.   <br>
            Autrement dit, si $a$ et $b$ sont deux nombres  positifs et si $a < b$, alors $a^2 < b^2$.`

            if (a < b) {
              texteCorr += `<br>Comme $${texNombrec(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(b)}$, 
          alors  $${texNombrec(a)}^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(b)}^2$.`
            } else {
              texteCorr += `<br>Comme $${texNombrec(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(a)}$, 
          alors  $${texNombrec(b)}^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(a)}^2$.`
            }
          }
          if (N === 2) {
            fraction1 = choice(listeFractions1)
            fraction2 = choice(listeFractions2)
            n1 = fraction1[0]
            d1 = fraction1[1]
            n2 = fraction2[0]
            d2 = fraction2[1]
            d3 = calcul(d1 * d2)
            n3 = calcul(n1 * d2)
            n4 = calcul(n2 * d1)
            texte = `En utilisant le sens de variation d'une fonction de référence, comparer $\\left(${texFraction(n1, d1)}\\right)^2$ et $\\left(${texFraction(n2, d2)}\\right)^2$.`
            texteCorr = `On doit comparer les carrés de deux nombres. On utilise donc la fonction carré.<br>
            La fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre. Cela signifie que deux nombres positifs sont rangés dans le même ordre que leurs carrés.<br>
            Autrement dit, si $a$ et $b$ sont deux nombres  positifs et si $a < b$, alors $a^2 < b^2$.`
            if (n1 === n2) {
              texteCorr += `<br>On commence par comparer les fractions $${texFraction(n1, d1)}$ et $${texFraction(n2, d2)}$. <br>
            Les fractions ont le même numérateur. La plus grande est celle qui a le plus petit dénominateur. <br>
            `
              if (d1 < d2) {
                texteCorr += `On a $${d1}<${d2}$, donc $${texFraction(n2, d2)}<${texFraction(n1, d1)}$.<br>
                <br>Comme $${texFraction(n2, d2)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texFraction(n1, d1)}$, alors $\\left(${texFraction(n2, d2)}\\right)^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\left(${texFraction(n1, d1)}\\right)^2$`
              } else {
                texteCorr += `On a $${d2}<${d1}$, donc $${texFraction(n1, d1)}<${texFraction(n2, d2)}$.<br>
                <br> Comme,  $${texFraction(n1, d1)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texFraction(n2, d2)}$, alors $\\left(${texFraction(n1, d1)}\\right)^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\left(${texFraction(n2, d2)}\\right)^2$`
              }
            }
            if (d1 === d2) {
              texteCorr += `<br>On commence par comparer les fractions $${texFraction(n1, d1)}$ et $${texFraction(n2, d2)}$. <br>
            Les fractions ont le même dénomérateur. La plus grande est celle qui a le plus grand numérateur. <br>
            `
              if (n2 < n1) {
                texteCorr += `On a $${n2}<${n1}$, donc $${texFraction(n2, d2)}<${texFraction(n1, d1)}$.<br>
                <br>Comme $${texFraction(n2, d2)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texFraction(n1, d1)}$, alors $\\left(${texFraction(n2, d2)}\\right)^2${miseEnEvidence('<', 'blue')}\\left(${texFraction(n1, d1)}\\right)^2$`
              } else {
                texteCorr += `On a $${n1}<${n2}$, donc $${texFraction(n1, d1)}<${texFraction(n2, d2)}$.<br>
                <br>Comme,  $${texFraction(n1, d1)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texFraction(n2, d2)}$, alors $\\left(${texFraction(n1, d1)}\\right)^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\left(${texFraction(n2, d2)}\\right)^2$`
              }
            }
            if (n1 !== n2 && d1 !== d2) {
              texteCorr += `<br>On commence par comparer les fractions $${texFraction(n1, d1)}$ et $${texFraction(n2, d2)}$. <br>
          Pour cela on les met au même dénominateur : $${texFraction(n1, d1)}= ${texFraction(n3, d3)}$ et $${texFraction(n2, d2)}= ${texFraction(n4, d3)}$<br>
          `
              if (n3 < n4) {
                texteCorr += `On a $${n3}<${n4}$, donc $${texFraction(n3, d3)}<${texFraction(n4, d3)}$, soit $${texFraction(n1, d1)}<${texFraction(n2, d2)}$.<br>
                <br>Comme $${texFraction(n1, d1)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texFraction(n2, d2)}$, alors $\\left(${texFraction(n1, d1)}\\right)^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\left(${texFraction(n2, d2)}\\right)^2$`
              } else {
                texteCorr += `On a $${n4}<${n3}$, donc $${texFraction(n4, d3)}<${texFraction(n3, d3)}$ , soit $${texFraction(n2, d2)}<${texFraction(n1, d1)}$.<br>
                <br>Comme,  $${texFraction(n2, d2)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texFraction(n1, d1)}$, alors $\\left(${texFraction(n2, d2)}\\right)^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\left(${texFraction(n1, d1)}\\right)^2$`
              }
            }
          }

          if (N === 3) {
            a = calcul((randint(0, 5) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000) * (-1))
            b = calcul(a + (2 * randint(1, 9) / 1000) * choice([1, -1]))
            texte = `En utilisant le sens de variation d'une fonction de référence, comparer $(${texNombrec(a)})^2$ et $(${texNombrec(b)})^2$.`
            texteCorr = `On doit comparer les carrés de deux nombres. On utilise donc la fonction carré.<br>
            La fonction carré étant strictement décroissante sur $]-\\infty;0]$, elle change l'ordre. <br>
            Cela signifie que deux nombres négatifs sont rangés dans l'ordre inverse de leurs carrés.<br>
            Autrement dit, si $a$ et $b$ sont deux nombres  négatifs et si $a < b$, alors $a^2 > b^2$.`

            if (a < b) { texteCorr += `<br>Comme $${texNombrec(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(b)}$, alors  $(${texNombrec(a)})^2${miseEnEvidence('\\boldsymbol{>}', 'blue')}(${texNombrec(b)})^2$` } else { texteCorr += `<br>Comme $${texNombrec(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(a)}$, alors  $(${texNombrec(b)})^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}(${texNombrec(a)})^2$` }
          }
          break
        case 'inverse':
          N = randint(1, 2)
          if (N === 1) {
            a = calcul(randint(1, 9) + randint(5, 9) / 10)
            b = calcul(a + (randint(1, 9) / 10) * choice([1, -1]))
            texte = `En utilisant le sens de variation d'une fonction de référence, comparer $\\dfrac{1}{${texNombrec(a)}}$ et $\\dfrac{1}{${texNombrec(b)}}$.`
            texteCorr = `On doit comparer les inverses de deux nombres. On utilise donc la fonction inverse.<br>
              La fonction inverse étant strictement décroissante sur $]0;+\\infty[$, elle change l'ordre. 
              Cela signifie que deux nombres strictement positifs  sont rangés dans l'ordre inverse de leurs inverses.<br>
              Autrement dit, si $a$ et $b$ sont deux nombres strictement positifs et si $a < b$, alors $\\dfrac{1}{a} > \\dfrac{1}{b}$.<br>`

            if (a < b) {
              texteCorr += `Comme $${texNombrec(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(b)}$, alors  $\\dfrac{1}{${texNombrec(a)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{${texNombrec(b)}}$`
            } else { texteCorr += `Comme $${texNombrec(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(a)}$, alors  $\\dfrac{1}{${texNombrec(b)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{${texNombrec(a)}}$` }
          }
          if (N === 2) {
            a = calcul(randint(1, 9) + randint(5, 9) / 10)
            b = calcul(a + (randint(1, 9) / 10) * choice([1, -1]))
            texte = `En utilisant le sens de variation d'une fonction de référence, comparer $-\\dfrac{1}{${texNombrec(a)}}$ et $-\\dfrac{1}{${texNombrec(b)}}$.`
            texteCorr = `On doit comparer $-\\dfrac{1}{${texNombrec(a)}}$ et $-\\dfrac{1}{${texNombrec(b)}}$ soit $\\dfrac{1}{-${texNombrec(a)}}$ et $\\dfrac{1}{-${texNombrec(b)}}$, c'est-à-dire 
                les inverses de deux nombres (négatifs). On utilise donc la fonction inverse.<br>
                La fonction inverse étant strictement décroissante sur $]-\\infty;0[$, elle change l'ordre. 
                Cela signifie que deux nombres strictement négatifs  sont rangés dans l'ordre inverse de leurs inverses.<br>
                Autrement dit, si $a$ et $b$ sont deux nombres strictement négatifs et si $a < b$, alors $\\dfrac{1}{a} > \\dfrac{1}{b}$.<br>`

            if (a > b) {
              texteCorr += ` Comme $-${texNombrec(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}-${texNombrec(b)}$, alors  $\\dfrac{1}{-${texNombrec(a)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{-${texNombrec(b)}}$`
            } else { texteCorr += `Comme $-${texNombrec(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}-${texNombrec(a)}$, alors  $\\dfrac{1}{-${texNombrec(b)}}${miseEnEvidence('\\boldsymbol{>}', 'blue')}\\dfrac{1}{-${texNombrec(a)}}$` }
          }
          break

        case 'cube':
          a = calcul(randint(-10, 10) + (randint(-9, 9, 0) / 10) * choice([-1, 1]))
          b = calcul((a + randint(1, 9) / 10) * choice([-1, 1]))
          texte = `En utilisant le sens de variation d'une fonction de référence, comparer $${ecritureParentheseSiNegatif(a)}^3$ 
          et $${ecritureParentheseSiNegatif(b)}^3$.`
          texteCorr = `On doit comparer les cubes de deux nombres. On utilise donc la fonction cube.<br>
          La fonction cube étant strictement croissante sur $\\mathbb{R}$, elle conserve l'ordre. 
          Cela signifie que deux nombres réels  sont rangés dans le même ordre que leurs cubes.<br>
          Autrement dit, si $a$ et $b$ sont deux nombres réels et si $a < b$, alors $a^3 < b^3$.<br>`
          if (a < b) { texteCorr += `Comme $${texNombrec(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(b)}$, alors $${ecritureParentheseSiNegatif(a)}^3${miseEnEvidence('\\boldsymbol{<}', 'blue')}${ecritureParentheseSiNegatif(b)}^3$.` } else { texteCorr += `Comme $${texNombrec(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(a)}$, alors $${ecritureParentheseSiNegatif(b)}^3${miseEnEvidence('\\boldsymbol{<}', 'blue')}${ecritureParentheseSiNegatif(a)}^3$.` }
          break
        case 'racine carrée':
          a = calcul(randint(0, 10) + (randint(6, 9) / 10))
          b = calcul((a + (randint(1, 5, 0) / 10) * choice([-1, 1])))
          texte = `En utilisant le sens de variation d'une fonction de référence, comparer $\\sqrt{${texNombrec(a)}}$  et $\\sqrt{${texNombrec(b)}}$.`
          texteCorr = `On doit comparer les racines carrées de deux nombres. On utilise donc la fonction racine carrée.<br>
          La fonction racine carrée étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre. 
          Cela signifie que deux nombres réels positifs sont rangés dans le même ordre que leurs racines carrées.<br>
          Autrement dit, si $a$ et $b$ sont deux nombres réels positifs et si $a < b$, alors $\\sqrt{a} < \\sqrt{b}$.<br>`
          if (a < b) {
            texteCorr += ` Comme $${texNombrec(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(b)}$, alors 
          $\\sqrt{${texNombrec(a)}}${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\sqrt{${texNombrec(b)}}$.`
          } else {
            texteCorr += ` Comme $${texNombrec(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombrec(a)}$, 
          alors $\\sqrt{${texNombrec(b)}}${miseEnEvidence('\\boldsymbol{<}', 'blue')}\\sqrt{${texNombrec(a)}}$.`
          }

          break
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
  this.besoinFormulaireNumerique = ['Choix des questions', 3, '1 : carré\n2 : inverse\n3 : cube\n4 : racine carrée\n5 : mélange']
}
