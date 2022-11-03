import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, listeQuestionsToContenu, choice, sp, ecritureAlgebrique, rienSi1 } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { repere, courbe, texteParPosition } from '../../../modules/2d.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { calcule } from '../../../modules/fonctionsMaths.js'
export const titre = 'Lire graphiquement les valeurs de $a$ et $b$ dans $ax^2+b$'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '17/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Gilles Mora
 * Référence can1F06
*/
export const uuid = '26b38'
export const ref = 'can1F06'
export default function LectureGraphiqueParaboleaEtb () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur10 inline'
  this.tailleDiaporama = 1

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let texte, texteCorr, a, b, o, f, r
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2])) {
        case 1:// cas parabole a>0

          a = randint(1, 4)
          b = randint(-3, 3, 0)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

          f = function (x) {
            return calcule(a * x ** 2 + b)
          }
          if (b > 0) {
            r = repere({
              yUnite: 1,
              xUnite: 2,
              xMin: -3,
              yMin: -1,
              yMax: 8,
              xMax: 3,
              thickHauteur: 0.1,
              xLabelMin: -2,
              xLabelMax: 2,
              yLabelMax: 7,
              yLabelMin: 0,
              // yLabelMin: -9,
              // yLabelListe:[-8,-6,-4,-2,2,4,6,8],
              axeXStyle: '->',
              axeYStyle: '->'
            })

            f = x => a * x ** 2 + b

            texte = `On donne la courbe représentative d'une fonction $f$ définie par $f(x)=ax^2+b$.<br>
            
            `

            texte += `Déterminer les valeurs de $a$ et $b$.<br>
            
            ` + mathalea2d({ xmin: -6, xmax: 6, ymin: -1.5, ymax: 8, pixelsParCm: 18, scale: 0.6 }, r, o, courbe(f, { repere: r, color: 'blue', epaisseur: 2 }))
          } else {
            r = repere({
              yUnite: 1,
              xUnite: 2,
              xMin: -3,
              yMin: -4,
              yMax: 4,
              xMax: 3,
              thickHauteur: 0.1,
              xLabelMin: -2,
              xLabelMax: 2,
              yLabelMax: 3,
              yLabelMin: -3,
              // yLabelMin: -9,
              // yLabelListe:[-8,-6,-4,-2,2,4,6,8],
              axeXStyle: '->',
              axeYStyle: '->'
            })

            f = x => a * x ** 2 + b

            texte = `On donne la courbe représentative d'une fonction $f$ définie par $f(x)=ax^2+b$.<br>
            
            `

            texte += `Déterminer les valeurs de $a$ et $b$.<br>
            
            ` + mathalea2d({ xmin: -6, xmax: 6, ymin: -4.5, ymax: 4, pixelsParCm: 18, scale: 0.6 }, r, o, courbe(f, { repere: r, color: 'blue', epaisseur: 2 }))
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a=$' })
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$b=$' })
            setReponse(this, 2 * i, a)
            setReponse(this, 2 * i + 1, b)
          }

          texteCorr = `La valeur de $c$ est donnée par l'image de $0$ par la fonction $f$.<br>
          On lit $f(0)=${b}$. D'où, $b=${b}$. On otient alors $f(x)=ax^2${ecritureAlgebrique(b)}$.<br>
          La valeur de $a$ s'obtient grâce à l'imge de $1$ par la fonction $f$.<br>
          On lit $f(1)=${f(1)}$. D'où, $a\\times 1^2${ecritureAlgebrique(b)}=${f(1)}$, soit $a=${a}$.<br>
          Ainsi, $f(x)=${rienSi1(a)}x^2${ecritureAlgebrique(b)}$.`
          break

        case 2:// cas parabole a<0

          a = randint(-4, -1)
          b = randint(-3, 3, 0)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

          f = function (x) {
            return calcule(a * x ** 2 + b)
          }
          if (b > 0) {
            r = repere({
              yUnite: 1,
              xUnite: 2,
              xMin: -3,
              yMin: -4,
              yMax: 4,
              xMax: 3,
              thickHauteur: 0.1,
              xLabelMin: -2,
              xLabelMax: 2,
              yLabelMax: 3,
              yLabelMin: -3,
              // yLabelMin: -9,
              // yLabelListe:[-8,-6,-4,-2,2,4,6,8],
              axeXStyle: '->',
              axeYStyle: '->'
            })

            f = x => a * x ** 2 + b

            texte = `On donne la courbe représentative d'une fonction $f$ définie par $f(x)=ax^2+b$.<br>
            
            `
            texte += `Déterminer les valeurs de $a$ et $b$.<br>
            
            ` +
             mathalea2d({ xmin: -6, xmax: 6, ymin: -4.5, ymax: 4, pixelsParCm: 18, scale: 0.6 }, r, o, courbe(f, { repere: r, color: 'blue', epaisseur: 2 }))
          } else {
            r = repere({
              yUnite: 1,
              xUnite: 2,
              xMin: -3,
              yMin: -7,
              yMax: 1,
              xMax: 3,
              thickHauteur: 0.1,
              xLabelMin: -2,
              xLabelMax: 2,
              yLabelMax: 0,
              yLabelMin: -6,
              // yLabelMin: -9,
              // yLabelListe:[-8,-6,-4,-2,2,4,6,8],
              axeXStyle: '->',
              axeYStyle: '->'
            })

            f = x => a * x ** 2 + b

            texte = `On donne la courbe représentative d'une fonction $f$ définie par $f(x)=ax^2+b$.<br>
            
            `
            texte += `Déterminer les valeurs de $a$ et $b$.<br>
            
            ` + mathalea2d({ xmin: -6, xmax: 6, ymin: -7.5, ymax: 1, pixelsParCm: 18, scale: 0.6 }, r, o, courbe(f, { repere: r, color: 'blue', epaisseur: 2 }))
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a=$' })
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$b=$' })
            setReponse(this, 2 * i, a)
            setReponse(this, 2 * i + 1, b)
          }

          texteCorr = `La valeur de $c$ est donnée par l'image de $0$ par la fonction $f$.<br>
          On lit $f(0)=${b}$. D'où, $b=${b}$. On otient alors $f(x)=ax^2${ecritureAlgebrique(b)}$.<br>
          La valeur de $a$ s'obtient grâce à l'imge de $1$ par la fonction $f$.<br>
          On lit $f(1)=${f(1)}$. D'où, $a\\times 1^2${ecritureAlgebrique(b)}=${f(1)}$, soit $a=${a}$.<br>
          Ainsi, $f(x)=${rienSi1(a)}x^2${ecritureAlgebrique(b)}$.`
          break
      }

      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
    this.canEnonce = texte
    this.canReponseACompleter = ''
  }
}
