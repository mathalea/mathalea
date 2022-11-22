import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, listeQuestionsToContenu, choice, sp, texNombre } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { repere, courbe, texteParPosition } from '../../../modules/2d.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { calcule } from '../../../modules/fonctionsMaths.js'
import Decimal from 'decimal.js/decimal.mjs'
export const titre = 'Lire graphiquement les valeurs de $b$ et $c$ avec une parabole'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '08/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Gilles Mora
 * Référence can1L04
*/
export const uuid = '053d7'
export const ref = 'can1F05'
export default function LectureGraphiqueParabolebEtc () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur10 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let texte, texteCorr, x1, x2, r, F, o, f, absS
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1])) {
        case 1:// cas parabole a>0 et delta<0

          x1 = randint(-4, 4)
          x2 = randint(-2, 3, 0)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          absS = new Decimal(x1 + x2).div(2)// abscisse sommet
          f = function (x) {
            return calcule(x ** 2 - (x1 + x2) * x + x1 * x2)
          }
          r = repere({
            yUnite: 1,
            xMin: -5,
            yMin: Math.floor(f((x1 + x2) / 2)) - 1,
            yMax: Math.max(3, f(0) + 1),
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            xLabelMax: 4,
            yLabelMax: Math.max(3, f(0) + 1) - 1,
            yLabelMin: Math.floor(f((x1 + x2) / 2)) + 1,
            // yLabelMin: -9,
            // yLabelListe:[-8,-6,-4,-2,2,4,6,8],
            axeXStyle: '->',
            axeYStyle: '->'
          })

          F = x => (x - x1) * (x - x2)

          texte = `La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>
          
          `

          texte += 'Déterminer les valeurs de $b$ et $c$.<br>'
          texte += `
          
          ` +

          mathalea2d({ xmin: -5, xmax: 5, ymin: Math.floor(f((x1 + x2) / 2)) - 1.5, ymax: Math.max(3, f(0) + 1), pixelsParCm: 25, scale: 0.6, style: 'margin: auto' }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$b=$' })
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$c=$' })
            setReponse(this, 2 * i, -x1 - x2)
            setReponse(this, 2 * i + 1, x1 * x2)
          }

          texteCorr = `La fonction $f$ a deux racines $${x1}$ et $${x2}$.<br>
          L'abscisse du sommet de la parabole est la moyenne de ses racines, soit : $${texNombre(absS, 1)}$.<br>
          Comme l'abscisse du sommet est aussi donné par $-\\dfrac{b}{2a}$, alors $-\\dfrac{b}{2a}=${texNombre(absS, 1)}$.<br>
          L'énoncé indique que $a=1$, on en déduit $-\\dfrac{b}{2}=${texNombre(absS, 1)}$, soit $b=${texNombre(absS.mul(-2), 0)}$.<br>
          La valeur de $c$ est donnée par l'image de $0$ par $f$ soit ici $${x1 * x2}$.`
          break
      }

      if (this.questionJamaisPosee(i, x1, x2)) {
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
