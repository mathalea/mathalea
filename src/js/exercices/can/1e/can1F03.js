import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, listeQuestionsToContenu, choice, sp } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { repere, courbe, texteParPosition } from '../../../modules/2d.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Lire graphiquement le signe de $a$ et de $\\Delta$'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '08/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Gilles Mora
 * Référence can1L04
*/
export const uuid = 'a8936'
export const ref = 'can1F03'
export default function LectureGraphiqueParabole () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur10 inline'
  this.tailleDiaporama = 1

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let texte, texteCorr, a, alpha, beta, r, F, o
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4, 5, 6])) {
        case 1:// cas parabole a>0 et delta<0

          a = randint(0, 1) + randint(5, 9) / 10
          alpha = randint(-2, 1) + randint(1, 9) / 10
          beta = randint(0, 2) + randint(4, 9) / 10
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte = 'On donne la courbe représentative d\'une fonction $f$ polynôme du second degré définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += `Donner le signe de $a$ et de $\\Delta$.
        `
          } else {
            texte += 'Donner le signe de $a$ et de $\\Delta$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a$' }) + '$0$'
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$\\Delta$' }) + '$0$'
            setReponse(this, 2 * i, '>', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, '<', { formatInteractif: 'texte' })
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -5,
            yMin: -1,
            yMax: 6,
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            xLabelMax: 4,
            yLabelMax: 5,
            axeXStyle: '->',
            axeYStyle: '->'
          })

          F = x => a * (x - alpha) ** 2 + beta
          texte += mathalea2d({ xmin: -5, xmax: 5, ymin: -1, ymax: 6, pixelsParCm: 35, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))

          texteCorr = `La parabole a "les bras" tournés vers le haut, on en déduit que $a>0$. <br>
      De plus, elle ne coupe pas l'axe des abscisses, donc $f$ n'a pas de racines et par suite $\\Delta<0$.`
          break

        case 2:// cas parabole a>0 et delta>0

          a = randint(0, 1) + randint(5, 9) / 10
          alpha = randint(-2, 1) + randint(1, 9) / 10
          beta = randint(-2, 0) - randint(4, 9) / 10
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte = 'On donne la courbe représentative d\'une fonction $f$ polynôme du second degré définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += `Donner le signe de $a$ et de $\\Delta$.
      `
          } else {
            texte += 'Donner le signe de $a$ et de $\\Delta$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a$' }) + '$0$'
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$\\Delta$' }) + '$0$'
            setReponse(this, 2 * i, '>', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, '>', { formatInteractif: 'texte' })
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$

          r = repere({
            xMin: -5,
            yMin: -4,
            yMax: 5,
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            xLabelMax: 4,
            yLabelMax: 4,
            yLabelMin: -3,
            axeXStyle: '->',
            axeYStyle: '->'
          })

          F = x => a * (x - alpha) ** 2 + beta
          texte += mathalea2d({ xmin: -5, xmax: 5, ymin: -4, ymax: 5, pixelsParCm: 35, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
          texteCorr = `La parabole a "les bras" tournés vers le haut, on en déduit que $a>0$. <br>
    De plus, elle  coupe  l'axe des abscisses en deux points, donc $f$ a deux racines et par suite $\\Delta>0$.`
          break

        case 3:// cas parabole a>0 et delta=0

          a = randint(0, 1) + randint(5, 9) / 10
          alpha = randint(-2, 1) + randint(1, 9) / 10
          beta = 0
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte = 'On donne la courbe représentative d\'une fonction $f$ polynôme du second degré définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += `Donner le signe de $a$ et de $\\Delta$.
   `
          } else {
            texte += 'Donner le signe de $a$ et de $\\Delta$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a$' }) + '$0$'
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$\\Delta$' }) + '$0$'
            setReponse(this, 2 * i, '>', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, '=', { formatInteractif: 'texte' })
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -5,
            yMin: -2,
            yMax: 5,
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            xLabelMax: 4,
            yLabelMax: 4,
            axeXStyle: '->',
            yLabelMin: -1,
            axeYStyle: '->'
          })

          F = x => a * (x - alpha) ** 2 + beta
          texte += mathalea2d({ xmin: -5, xmax: 5, ymin: -2, ymax: 5, pixelsParCm: 35, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))

          texteCorr = `La parabole a "les bras" tournés vers le haut, on en déduit que $a>0$. <br>
 De plus, elle  coupe  l'axe des abscisses en un point, donc $f$ a une seule racine et par suite $\\Delta=0$.`
          break

        case 4:// cas parabole a<0 et delta=0

          a = randint(-1, 0) - randint(5, 9) / 10
          alpha = randint(-2, 1) + randint(1, 9) / 10
          beta = 0
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte = 'On donne la courbe représentative d\'une fonction $f$ polynôme du second degré définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += `Donner le signe de $a$ et de $\\Delta$.
   `
          } else {
            texte += 'Donner le signe de $a$ et de $\\Delta$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a$' }) + '$0$'
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$\\Delta$' }) + '$0$'
            setReponse(this, 2 * i, '<', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, '=', { formatInteractif: 'texte' })
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$

          r = repere({
            xMin: -5,
            yMin: -5,
            yMax: 2,
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            xLabelMax: 4,
            yLabelMax: 1,
            axeXStyle: '->',
            yLabelMin: -4,
            axeYStyle: '->'
          })

          F = x => a * (x - alpha) ** 2 + beta
          texte += mathalea2d({ xmin: -5, xmax: 5, ymin: -5, ymax: 2, pixelsParCm: 35, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))

          texteCorr = `La parabole a "les bras" tournés vers le bas, on en déduit que $a<0$. <br>
 De plus, elle  coupe  l'axe des abscisses en un point, donc $f$ a une seule racine et par suite $\\Delta=0$.`
          break

        case 5:// cas parabole a<0 et delta>0

          a = randint(-1, 0) - randint(5, 9) / 10
          alpha = randint(-2, 1) + randint(1, 9) / 10
          beta = randint(1, 3) + randint(4, 9) / 10
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte = 'On donne la courbe représentative d\'une fonction $f$ polynôme du second degré définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += `Donner le signe de $a$ et de $\\Delta$.<br>
   `
          } else {
            texte += 'Donner le signe de $a$ et de $\\Delta$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a$' }) + '$0$'
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$\\Delta$' }) + '$0$'
            setReponse(this, 2 * i, '<', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, '>', { formatInteractif: 'texte' })
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$

          r = repere({
            xMin: -5,
            yMin: -2,
            yMax: 5,
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            yLabelMin: -1,
            xLabelMax: 3,
            yLabelMax: 4,
            axeXStyle: '->',
            axeYStyle: '->'
          })

          F = x => a * (x - alpha) ** 2 + beta
          texte += mathalea2d({ xmin: -5, xmax: 5, ymin: -2, ymax: 5, pixelsParCm: 35, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))

          texteCorr = `La parabole a "les bras" tournés vers le bas, on en déduit que $a<0$. <br>
 De plus, elle  coupe  l'axe des abscisses en deux points, donc $f$ a deux racines  et par suite $\\Delta>0$.`
          break

        case 6:// cas parabole a<0 et delta<0

          a = randint(-1, 0) - randint(3, 7) / 10
          alpha = randint(-2, 1) + randint(1, 9) / 10
          beta = randint(-1, 0) - randint(4, 9) / 10
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte = 'On donne la courbe représentative d\'une fonction $f$ polynôme du second degré définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += `Donner le signe de $a$ et de $\\Delta$.<br>
   `
          } else {
            texte += 'Donner le signe de $a$ et de $\\Delta$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: '$a$' }) + '$0$'
            texte += ` ${sp(2)} et ${sp(4)} `
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: '$\\Delta$' }) + '$0$'
            setReponse(this, 2 * i, '<', { formatInteractif: 'texte' })
            setReponse(this, 2 * i + 1, '<', { formatInteractif: 'texte' })
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$

          r = repere({
            xMin: -5,
            yMin: -5,
            yMax: 2,
            xMax: 5,
            thickHauteur: 0.1,
            xLabelMin: -4,
            yLabelMin: -4,
            xLabelMax: 4,
            yLabelMax: 1,
            axeXStyle: '->',
            axeYStyle: '->'
          })

          F = x => a * (x - alpha) ** 2 + beta
          texte += mathalea2d({ xmin: -5, xmax: 5, ymin: -5, ymax: 2, pixelsParCm: 35, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))

          texteCorr = `La parabole a "les bras" tournés vers le bas, on en déduit que $a<0$. <br>
 De plus, elle ne coupe pas l'axe des abscisses, donc $f$ n'a pas de racines et par suite $\\Delta<0$.`
          break
      }

      if (this.questionJamaisPosee(i, a, alpha, beta)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
