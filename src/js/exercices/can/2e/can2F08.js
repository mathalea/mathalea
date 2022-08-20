import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { randint, listeQuestionsToContenuSansNumero, sp, choice } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { tableauDeVariation } from '../../../modules/2d.js'
export const titre = 'Encadrer en utilisant un tableau de variations'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '22/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function EncadrerTableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 1.3
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let question1, correction1, ligne1
    const x1 = randint(-20, 10)
    const x2 = randint(x1 + 1, 15)
    const x3 = randint(x2 + 1, 20)
    const x4 = randint(x3 + 1, 25)
    const y1 = randint(-10, 10)
    const y2 = randint(y1 - 10, y1 - 1)
    const y3 = randint(y2 + 1, y2 + 10, y1)
    const y4 = randint(y3 - 10, y3 - 1, y2)
    const M = Math.max(y1, y3)
    const m = Math.min(y2, y4)
    const choix = randint(1, 2)
    if (choix === 1) {
      ligne1 = ['Var', 10, `+/$${y1}$`, 10, `-/$${y2}$`, 10, `+/$${y3}$`, 10, `-/$${y4}$`, 10]
    } else {
      ligne1 = ['Var', 10, `-/$${-y1}$`, 10, `+/$${-y2}$`, 10, `-/$${-y3}$`, 10, `+/$${-y4}$`, 10]
    }
    // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
    question1 = `Voici le tableau de variations d'une fonction $f$ définie sur $[${x1};${x4}]$ :<br>`
    question1 += mathalea2d({ xmin: -0.5, ymin: -6.1, xmax: 30, ymax: 0.1, scale: 0.6 }, tableauDeVariation({
      tabInit: [
        [
          // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
          ['$x$', 2, 10], ['$f(x)$', 4, 30]
        ],
        // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
        [`$${x1}$`, 10, `$${x2}$`, 10, `$${x3}$`, 10, `$${x4}$`, 10]
      ],
      // tabLines ci-dessous contient les autres lignes du tableau.
      tabLines: [ligne1],
      colorBackground: '',
      espcl: 3, // taille en cm entre deux antécédents
      deltacl: 1, // distance entre la bordure et les premiers et derniers antécédents
      lgt: 3, // taille de la première colonne en cm
      hauteurLignes: [15, 15]
    }))
    if (choice([true, false])) {
      question1 += `  <br>Encadrer le plus précisément possible $f(x)$ (en déterminant les valeurs de $m$ et de $M$ telles que $m\\leqslant f(x)\\leqslant M$) lorsque 
      $x\\in[${x1};${x3}]$ :<br>$m=$ `
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ` ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur15 inline') + sp(0) : sp(0)} `
      question1 += '<br>$M=$ '
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ` ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur15 inline') + sp(0) : sp(0)}`

      if (choix === 1) {
        if (M === y1) {
          correction1 = `Sur $[${x1};${x3}]$, le minimum de $f$ est $${y2}$ et le maximum est
          $${y1}$. <br>
          Ainsi, pour $x\\in[${x1};${x3}]$, ${sp(3)} $${y2}\\leqslant f(x)\\leqslant ${y1}$.<br>`
          setReponse(this, 0, y2)
          setReponse(this, 1, y1)
        } else {
          correction1 = `Sur $[${x1};${x3}]$, le minimum de $f$ est $${y2}$ et le maximum est
          $${y3}$. <br>
          Ainsi, pour $x\\in[${x1};${x3}]$, ${sp(3)} $${y2}\\leqslant f(x)\\leqslant ${y3}$.<br>`
          setReponse(this, 0, y2)
          setReponse(this, 1, y3)
        }
      } else {
        if (M === y1) {
          correction1 = `Sur $[${x1};${x3}]$, le minimum de $f$ est $${-y1}$ et le maximum est
          $${-y2}$. <br>
          Ainsi, pour $x\\in[${x1};${x3}]$, ${sp(3)} $${-y1}\\leqslant f(x)\\leqslant ${-y2}$. `
          setReponse(this, 0, -y1)
          setReponse(this, 1, -y2)
        } else {
          correction1 = `Sur $[${x1};${x3}]$, le minimum de $f$ est $${-y3}$ et le maximum est
          $${-y2}$. <br>
          Ainsi, pour $x\\in[${x1};${x3}]$, ${sp(3)} $${-y3}\\leqslant f(x)\\leqslant ${-y2}$.  `
          setReponse(this, 0, -y3)
          setReponse(this, 1, -y2)
        }
      }
    } else {
      question1 += `  <br>Encadrer le plus précisément possible $f(x)$ (en déterminant les valeurs de $m$ et de $M$ telles que $m\\leqslant f(x)\\leqslant M$) lorsque 
        $x\\in[${x2};${x4}]$ :<br>$m=$ `
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ` ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur15 inline') + sp(0) : sp(0)} `
      question1 += '<br>$M=$ '
      if (!this.interactif) {
        question1 += '.... '
      }
      question1 += ` ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur15 inline') + sp(0) : sp(0)}`

      if (choix === 1) {
        if (m === y2) {
          correction1 = `<br>Sur $[${x2};${x4}]$, le minimum de $f$ est $${y2}$ et le maximum est
          $${y3}$. <br>
          Ainsi, pour $x\\in[${x2};${x4}]$, ${sp(3)} $${y2}\\leqslant f(x)\\leqslant ${y3}$.`
          setReponse(this, 0, y2)
          setReponse(this, 1, y3)
        } else {
          correction1 = `<br>Sur $[${x2};${x4}]$, le minimum de $f$ est $${y4}$ et le maximum est
          $${y3}$. <br>
          Ainsi, pour $x\\in[${x2};${x4}]$, ${sp(3)} $${y4}\\leqslant f(x)\\leqslant ${y3}$.  `
          setReponse(this, 0, y4)
          setReponse(this, 1, y3)
        }
      } else {
        if (m === y2) {
          correction1 = `Sur $[${x2};${x4}]$, le minimum de $f$ est $${-y3}$ et le maximum est
          $${-y2}$. <br>
          Ainsi, pour $x\\in[${x2};${x4}]$, ${sp(3)} $${-y3}\\leqslant f(x)\\leqslant ${-y2}$. `
          setReponse(this, 0, -y3)
          setReponse(this, 1, -y2)
        } else {
          correction1 = `<br>Sur $[${x2};${x4}]$, le minimum de $f$ est $${-y3}$ et le maximum est
          $${-y4}$. <br>
          Ainsi, pour $x\\in[${x2};${x4}]$, ${sp(3)} $${-y3}\\leqslant f(x)\\leqslant ${-y4}$.  `
          setReponse(this, 0, -y3)
          setReponse(this, 1, -y4)
        }
      }
    }
    this.listeQuestions.push(question1)
    this.listeCorrections.push(correction1)
    listeQuestionsToContenuSansNumero(this)
  }
}
