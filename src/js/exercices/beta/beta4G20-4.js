import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, troncature, calcul, texNombre, texPrix, carreParfait } from '../../modules/outils.js'
export const titre = 'Calculer la racine carrée de (x² +/- y²)'

/**
 * Description didactique de l'exercice : Calculer_une_expression_litterale_type_pythagore
 * @author Mireille Gain
 * Référence : 4G20-4
*/
export default function CalculerUneExpressionLitteralePythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Dans chaque cas, calculer a² + b² et a² - b²; puis donner la racine carrée de chaque résultat en valeur arrondie au centième.'
  this.nbQuestions = 2
  this.nbCols = 3
  this.nbColsCorr = 2
  this.video = ''

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let a, b, n, s, d, racs, racd, miracs, miracd
    const typesDeQuestionsDisponibles = ['type1', 'type2']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'type1':
          a = randint(3, 12)
          n = randint(5, 9)
          b = calcul(n * 0.1)
          break

        case 'type2':
          a = randint(3, 12)
          n = randint(1, 5)
          b = calcul(1 + n * 0.1)
          break
      }

      s = calcul(a * a + b * b)
      d = calcul(a * a - b * b)
      racs = Math.sqrt(s)
      racd = Math.sqrt(d)
      miracs = troncature(racs - troncature(racs, 2), 3)
      miracd = troncature(racd - troncature(racd, 2), 3)

      texte = `$\\phantom{12}a = ${a} \\phantom{12}et \\phantom{12}b = ${texNombre(b)}$`

      texteCorr = `$\\begin{aligned}a^2 + b^2&
   = ${texNombre(a)} \\times ${texNombre(a)} + ${texNombre(b)} \\times ${texNombre(b)} 
   \\\\&= ${texNombre(a * a)} + ${texNombre(b * b)} 
   \\\\&= ${texNombre((a * a + b * b))}\\end{aligned}$`
      texteCorr += `<br>$\\phantom{123456}\\sqrt{${texNombre(a * a + b * b)}}$`

      if (carreParfait(calcul(100 * s))) {
        texteCorr += `$\\phantom{1}=\\phantom{1}${texNombre(racs)}$  (qui est la valeur exacte de $\\sqrt{${texNombre(a * a + b * b)}}$)`
      } else {
        if (1000 * miracs < 5) {
          texteCorr += `$\\phantom{1}≈\\phantom{1}${texPrix(troncature(racs, 2))}$`
        } else {
          texteCorr += `$\\phantom{1}≈\\phantom{1}${texPrix(troncature(racs + 0.01, 2))}$`
        }
      }

      texteCorr += `<br><br>$\\begin{aligned}a^2 - b^2& 
  = ${texNombre(a)} \\times ${texNombre(a)} - ${texNombre(b)} \\times ${texNombre(b)} 
  \\\\&= ${texNombre(a * a)} - ${texNombre(b * b)} 
  \\\\&= ${texNombre(a * a - b * b)}\\end{aligned}$`
      texteCorr += `<br>$\\phantom{123456}\\sqrt{${texNombre(a * a - b * b)}}$`

      if (carreParfait(calcul(100 * d))) {
        texteCorr += `$\\phantom{1}=\\phantom{1}${texNombre(racd)}$  (qui est la valeur exacte de $\\sqrt{${texNombre(a * a - b * b)}}$)`
      } else {
        if (1000 * miracd < 5) {
          texteCorr += `$\\phantom{1}≈\\phantom{1}${texPrix(troncature(racd, 2))}$`
        } else {
          texteCorr += `$\\phantom{1}≈\\phantom{1}${texPrix(troncature((racd + 0.01), 2))}$`
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
}
