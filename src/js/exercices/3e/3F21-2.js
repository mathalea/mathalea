import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { repere, courbe, tracePoint, point } from '../../modules/2d.js'
import { calcule } from '../../modules/fonctionsMaths.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Déterminer une fonction affine par la donnée des images de deux nombres'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Déterminer la forme algébrique à partir de la donnée de 2 nombres et de leurs images
 * cas 0 : fonction constante
 * cas 1 : f(0) et f(x2) donnés
 * cas 2 : f(x1) et f(x1+1) donnés
 * cas 3 : f(x1) et f(x2) donnés a et b entiers
 * cas 4 : f(x1) et f(x2) donnés a et b rationnels
 * x1, x2, f(x1) et f(x2) sont toujours entiers relatifs
 * @author Jean-Claude Lhote
 * Référence 3F21-2
*/
export const uuid = 'b8b33'
export const ref = '3F21-2'
export default function DeterminerFonctionAffine () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.sup = 1
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.titre = titre

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    let typeDeQuestionsDisponibles
    if (parseInt(this.sup) === 1) {
      typeDeQuestionsDisponibles = [0, 1]
    } else if (parseInt(this.sup) === 2) {
      typeDeQuestionsDisponibles = [1, 2, 3]
    } else {
      typeDeQuestionsDisponibles = [3, 4]
    }
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, x1, x2, y1, y2, a, b, tA, tB, r, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.

      switch (listeTypeDeQuestions[i]) {
        case 0: // fonction constante
          a = 0
          b = randint(-10, 10, 0)
          x1 = randint(-5, -1)
          x2 = randint(1, 5)
          y1 = b
          y2 = b
          texteCorr = `On remarque que $f(${x1})=f(${x2})=${b}$ donc la droite représentant la fonction $f$ passe par deux points distincts ayant la même ordonnée.<br>`
          texteCorr += `Elle est donc parallèle à l'axe des abscisses. La fonction $f$ est une fonction constante et $f(x)=${b}$.`
          setReponse(this, i, `f(x)=${b}`)
          if (this.correctionDetaillee) {
            tA = tracePoint(point(x1, y1), 'red')
            tB = tracePoint(point(x2, y2), 'red')

            r = repere({ xMin: -5, yMin: Math.min(-1, b - 1), xMax: 5, yMax: Math.max(b + 1, 2) })
            texteCorr += `<br><br>${mathalea2d({ xmin: -5, ymin: Math.min(-1, b - 1), xmax: 5, ymax: Math.max(b + 1, 2), pixelsParCm: 20, scale: 0.7 }, r, courbe(x => a * x + b, { repere: r, color: 'blue' }), tA, tB)}`
          }
          break

        case 1: // f(0)=y1 f(x2)= y2 a et b entiers relatifs.
          a = randint(-2, 2, 0)
          b = randint(-5, 5, 0)
          x1 = 0
          y1 = b
          x2 = randint(-5, 5, 0)
          y2 = calcule(b + a * x2)
          texteCorr = `Soit $f(x)=ax+b$. Nous savons que $f(0)=${y1}=b$.<br>`
          texteCorr += `Donc $f(x)=ax${ecritureAlgebrique(y1)}$. En utilisant la donnée $f(${x2})=${y2}$ on obtient : $a \\times ${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(b)}=${y2}$ d'où $a \\times ${ecritureParentheseSiNegatif(x2)}=${y2}${ecritureAlgebrique(-b)}=${y2 - b}$ donc $a=\\dfrac{${y2 - b}}{${x2}}=${a}$.<br>`
          texteCorr += `Donc $f(x)=${a}x${ecritureAlgebrique(b)}$.`
          setReponse(this, i, `f(x)=${a}x${ecritureAlgebrique(b)}`)
          if (this.correctionDetaillee) {
            tA = tracePoint(point(x1, y1), 'red')
            tB = tracePoint(point(x2, y2), 'red')

            r = repere({ xMin: -5, yMin: Math.min(-5 * a + b, 5 * a + b), xMax: 5, yMax: Math.max(-5 * a + b, 5 * a + b) })
            texteCorr += `<br><br>${mathalea2d({ xmin: -5, ymin: Math.min(-5 * a + b, 5 * a + b), xmax: 5, ymax: Math.max(-5 * a + b, 5 * a + b), pixelsParCm: 20, scale: 0.7 }, r, courbe(x => a * x + b, { repere: r, color: 'blue' }), tA, tB)}`
          }
          break

        case 2: // f(x1)=y1 et f(x1+1)=y2
          a = randint(-5, 5, 0)
          b = randint(-5, 5, 0)
          x1 = randint(-5, 5, [-1, 0])
          y1 = calcule(a * x1 + b)
          x2 = x1 + 1
          y2 = calcule(b + a * x2)
          texteCorr = `Soit $f(x)=ax+b$. On passe de $${x1}$ à $${x2}$ en ajoutant 1, donc la pente $a$ de la droite correspond à $f(${x2})-f(${x1})=${y2}-${ecritureParentheseSiNegatif(y1)}=`
          if (y1 < 0) texteCorr += `${y2}${ecritureAlgebrique(-y1)}=${a}$.<br>`
          else texteCorr += `${a}$.<br>`
          texteCorr += `Donc $f(x)=${a}x+b$.<br>En utilisant la donnée $f(${x2})=${y2}$ on obtient : $${a} \\times ${ecritureParentheseSiNegatif(x2)}+b=${y2}$ d'où $${a * x2}+b=${y2}$ donc $b=${y2}${ecritureAlgebrique(-a * x2)}=${b}$.<br>`
          texteCorr += `Donc $f(x)=${a}x${ecritureAlgebrique(b)}$.`
          setReponse(this, i, `f(x)=${a}x${ecritureAlgebrique(b)}`)
          if (this.correctionDetaillee) {
            tA = tracePoint(point(x1, y1), 'red')
            tB = tracePoint(point(x2, y2), 'red')

            r = repere({ xMin: -5, yMin: Math.min(-5 * a + b, 5 * a + b), xMax: 5, yMax: Math.max(-5 * a + b, 5 * a + b) })
            texteCorr += `<br><br>${mathalea2d({ xmin: -5, ymin: Math.min(-5 * a + b, 5 * a + b), xmax: 5, ymax: Math.max(-5 * a + b, 5 * a + b), pixelsParCm: 20, scale: 0.7 }, r, courbe(x => a * x + b, { repere: r, color: 'blue' }), tA, tB)}`
          }
          break

        case 3: // f(x1)=y1 f(x2)=y2 a et b entiers
          a = randint(-5, 5, 0)
          b = randint(-5, 5, 0)
          x1 = randint(-5, 5, 0)
          y1 = calcule(a * x1 + b)
          x2 = randint(-5, 5, [0, x1])
          y2 = calcule(b + a * x2)
          texteCorr = `Soit $f(x)=ax+b$. En utilisant les données de l'énoncé, on obtient : $f(${x1})=${y1}=a \\times ${ecritureParentheseSiNegatif(x1)}+b$ et $f(${x2})=${y2}=a \\times ${ecritureParentheseSiNegatif(x2)}+b$<br>`
          texteCorr += `Donc d'une part : $b=${y1}+a\\times ${ecritureParentheseSiNegatif(-x1)}$ et d'autre part : $b=${y2}+a\\times ${ecritureParentheseSiNegatif(-x2)}$.<br>`
          texteCorr += `Par identification, on obtient : $${y1}+a\\times ${ecritureParentheseSiNegatif(-x1)}=${y2}+a\\times ${ecritureParentheseSiNegatif(-x2)}$.<br>`
          texteCorr += `On en déduit que $${y1}${ecritureAlgebrique(-y2)}=a(${x1}${ecritureAlgebrique(-x2)})$ soit $${y1 - y2}=${x1 - x2}a$.<br>`
          texteCorr += `Donc $a=\\dfrac{${y1 - y2}}{${x1 - x2}}=${a}$.<br>`
          texteCorr += `Donc $b=${y1}${ecritureAlgebrique(a)}\\times ${ecritureParentheseSiNegatif(-x1)}=${y1}${ecritureAlgebrique(-a * x1)}=${b}$.<br>`
          texteCorr += `Donc $f(x)=${a}x${ecritureAlgebrique(b)}$.`
          setReponse(this, i, `f(x)=${a}x${ecritureAlgebrique(b)}`)
          if (this.correctionDetaillee) {
            tA = tracePoint(point(x1, y1), 'red')
            tB = tracePoint(point(x2, y2), 'red')

            r = repere({ xMin: -5, yMin: Math.min(-5 * a + b, 5 * a + b), xMax: 5, yMax: Math.max(-5 * a + b, 5 * a + b) })
            texteCorr += `<br><br>${mathalea2d({ xmin: -5, ymin: Math.min(-5 * a + b, 5 * a + b), xmax: 5, ymax: Math.max(-5 * a + b, 5 * a + b), pixelsParCm: 20, scale: 0.7 }, r, courbe(x => a * x + b, { repere: r, color: 'blue' }), tA, tB)}`
          }
          break

        case 4:
          x1 = randint(-5, 5, 0)
          x2 = randint(-5, 5, [0, x1])
          y1 = randint(-5, 5)
          y2 = randint(-5, 5)
          a = fraction(y2 - y1, x2 - x1)
          b = a.multiplieEntier(-x1).ajouteEntier(y1)
          texteCorr = `Soit $f(x)=ax+b$. En utilisant les données de l'énoncé, on obtient : $f(${x1})=${y1}=a \\times ${ecritureParentheseSiNegatif(x1)}+b$ et $f(${x2})=${y2}=a \\times ${ecritureParentheseSiNegatif(x2)}+b$<br>`
          texteCorr += `Donc d'une part : $b=${y1}+a\\times ${ecritureParentheseSiNegatif(-x1)}$ et d'autre part : $b=${y2}+a\\times ${ecritureParentheseSiNegatif(-x2)}$.<br>`
          texteCorr += `Par identification, on obtient : $${y1}+a\\times ${ecritureParentheseSiNegatif(-x1)}=${y2}+a\\times ${ecritureParentheseSiNegatif(-x2)}$.<br>`
          texteCorr += `On en déduit que $${y1}${ecritureAlgebrique(-y2)}=a(${x1}${ecritureAlgebrique(-x2)})$ soit $${y1 - y2}=${x1 - x2}a$.<br>`
          texteCorr += `Donc $a=\\dfrac{${y1 - y2}}{${x1 - x2}}=${a.texFractionSimplifiee}$.<br>`
          texteCorr += `Donc $b=${y1}+${a.texFractionSimplifiee}\\times ${ecritureParentheseSiNegatif(-x1)}=${fraction(y1 * a.denIrred, a.denIrred).texFraction}+${a.multiplieEntier(-x1).texFractionSimplifiee}=${b.texFractionSimplifiee}$.<br>`
          texteCorr += `Donc $f(x)=${a.texFractionSimplifiee}x${b.simplifie().texFractionSignee}$.`
          setReponse(this, i, `f(x)=${a.texFractionSimplifiee}x${b.simplifie().texFractionSignee}`)
          if (this.correctionDetaillee) {
            tA = tracePoint(point(x1, y1), 'red')
            tB = tracePoint(point(x2, y2), 'red')

            a = calcule(a.n / a.d)
            b = calcule(b.n / b.d)
            r = repere({ xMin: -5, yMin: Math.round(Math.min(-5 * a + b, 5 * a + b)), xMax: 5, yMax: Math.round(Math.max(-5 * a + b, 5 * a + b)) })
            texteCorr += `<br><br>${mathalea2d({ xmin: -5, ymin: Math.round(Math.min(-5 * a + b, 5 * a + b)), xmax: 5, ymax: Math.round(Math.max(-5 * a + b, 5 * a + b)), pixelsParCm: 20, scale: 0.7 }, r, courbe(x => a * x + b, { repere: r, color: 'blue' }), tA, tB)}`
          }
          break
      }
      texte = `La fonction $f$ est une fonction affine et on sait que $f(${x1})=${y1}$ et $f(${x2})=${y2}$.<br>`
      texte += 'Déterminer la forme algébrique de la fonction $f$.'
      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, x1, x2, y1, y2, a, b, listeTypeDeQuestions[i])) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Facile\n2 : Difficile\n3 : Très difficile']
}
