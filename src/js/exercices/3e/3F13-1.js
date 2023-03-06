import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { deuxColonnes, randint, texConsigne, numAlpha } from '../../modules/outils.js'
import { repere, graphiqueInterpole } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Lire graphiquement images et antécédents'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Lecture d'images et antécédents sur un graphe sinusoidale
 * @author Rémi Angot
 * Référence 3F13-1
*/
export const uuid = '4b121'
export const ref = '3F13-1'
export default function AntecedentEtImageGraphique () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  if (context.isHtml) { this.spacingCorr = 2 }

  this.nouvelleVersion = function () {
    const r = repere({
      xMin: -5,
      xMax: 5,
      yMin: -4,
      yMax: 4
    })
    let a = randint(1, 3)
    let b = a - 4
    let c = a - 2
    let x0 = randint(-4, -2)
    while ((x0 === a) || (x0 + 4 === b) || (x0 + 6 === c)) { // Pour éviter d'avoir une image égale à un antécédent
      a = randint(1, 3)
      b = a - 4
      c = a - 2
      x0 = randint(-4, -2)
    }
    let gr = graphiqueInterpole([[randint(-8, -5), a - 1], [x0, a], [x0 + 4, b], [x0 + 6, c], [randint(6, 10), c - 1]] // Coordonnées des "sommets"
      ,
      { repere: r, color: 'blue', step: 0.15, epaisseur: 2 })

    if (randint(false, true)) {
      a *= -1
      b *= -1
      c *= -1
      gr = graphiqueInterpole([[randint(-8, -5), a + 1], [x0, a], [x0 + 4, b], [x0 + 6, c], [randint(6, 10), c + 1]] // Coordonnées des "sommets"
        ,
        { repere: r, color: 'blue', step: 0.15, epaisseur: 2 })
    }
    this.contenu = 'Ci-dessous, on a tracé la courbe représentative de la fonction $f$.'
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: this.contenu + '<br>' + mathalea2d({ xmin: -7, ymin: -4.5, xmax: 7, ymax: 4.5, pixelsParCm: 30 }, r, gr),
        enonceAvant: false, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
        enonceAvantUneFois: true, // EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
        enonceCentre: true, // EE : ce champ est facultatif et permet (si true) de centrer le champ 'enonce' ci-dessus.}
        options: { multicols: true, barreseparation: true, numerotationEnonce: true },
        propositions: []
      }
    }

    if (context.isHtml && this.interactif) {
      this.contenu += '<br><em>S\'il y a plusieurs réponses, les séparer les réponses avec un point-virgule.</em>'
    }
    this.contenu += '<br><br>'
    let cont1 = `${numAlpha(0)} Quelle est l'image de $${x0}$ ?`
    cont1 += ajouteChampTexteMathLive(this, 0)
    if (context.isAmc) {
      this.autoCorrection[0].propositions.push(
        {
          type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
          propositions: [ // une ou plusieurs (Qcms) 'propositions'
            {
              texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
              reponse: { // utilisé si type = 'AMCNum'
                texte: cont1, // facultatif
                valeur: a, // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                param: {
                  digits: 1, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  signe: true, // obligatoire pour AMC (présence d'une case + ou -)
                  approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                }
              }
            }
          ]
        }
      )
    }
    const enonceAMC = `${numAlpha(1)} Quelle est l'image de $${x0 + 5}$ ?`
    cont1 += '<br>' + enonceAMC
    cont1 += ajouteChampTexteMathLive(this, 1)
    if (context.isAmc) {
      this.autoCorrection[0].propositions.push(
        {
          type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
          propositions: [ // une ou plusieurs (Qcms) 'propositions'
            {
              texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
              reponse: { // utilisé si type = 'AMCNum'
                texte: enonceAMC, // facultatif
                valeur: (b + c) / 2, // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                param: {
                  digits: 1, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  signe: true, // obligatoire pour AMC (présence d'une case + ou -)
                  approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                }
              }
            }
          ]
        }
      )
    }
    const ordre = randint(1, 2)
    let cont2
    if (ordre === 1) {
      cont2 = `${numAlpha(2)} Déterminer le (ou les) antécédent(s) de $${b}$.`
      cont2 += ajouteChampTexteMathLive(this, 2)
      cont2 += `<br>${numAlpha(3)} Déterminer le (ou les) antécédent(s) de $${c}$.`
      cont2 += ajouteChampTexteMathLive(this, 3)
    } else {
      cont2 = `${numAlpha(2)} Déterminer le (ou les) antécédent(s) de $${c}$.`
      cont2 += ajouteChampTexteMathLive(this, 2)
      cont2 += `<br>${numAlpha(3)} Déterminer le (ou les) antécédent(s) de $${b}$.`
      cont2 += ajouteChampTexteMathLive(this, 3)
    }
    if (context.isAmc) {
      this.autoCorrection[0].propositions.push(
        {
          type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
          propositions: [ // une ou plusieurs (Qcms) 'propositions'
            {
              texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
              reponse: { // utilisé si type = 'AMCNum'
                texte: `${numAlpha(2)} Déterminer un antécédent de $${b}$.`, // facultatif
                valeur: x0 + 4, // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                param: {
                  digits: 1, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  signe: true, // obligatoire pour AMC (présence d'une case + ou -)
                  approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                }
              }
            }
          ]
        }
      )
      this.autoCorrection[0].propositions.push(
        {
          type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
          propositions: [ // une ou plusieurs (Qcms) 'propositions'
            {
              texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
              reponse: { // utilisé si type = 'AMCNum'
                texte: `${numAlpha(2)} Déterminer un antécédent de $${c}$.`, // facultatif
                valeur: x0 + 2, // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                param: {
                  aussiCorrect: x0 + 6,
                  digits: 1, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  signe: true, // obligatoire pour AMC (présence d'une case + ou -)
                  approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                }
              }
            }
          ]
        }
      )
    }

    this.contenu += deuxColonnes(cont1, cont2)
    this.contenu += mathalea2d({ xmin: -7, ymin: -4.5, xmax: 7, ymax: 4.5, pixelsParCm: 30 }, r, gr)
    this.contenuCorrection = (context.isHtml) ? '' : '\n\\exo{}\n\n'
    this.contenuCorrection += `${numAlpha(0)} L'image de $${x0}$ est $${a}$, on note $f(${x0})=${a}$.`
    setReponse(this, 0, a)

    this.contenuCorrection += `<br>${numAlpha(1)} L'image de $${x0 + 5}$ est $${(b + c) / 2}$, on note $f(${x0 + 5})=${(b + c) / 2}$.`
    setReponse(this, 1, (b + c) / 2)
    if (ordre === 1) {
      this.contenuCorrection += `<br>${numAlpha(2)} $${b}$ a pour unique antécédent $${x0 + 4}$, on note $f(${x0 + 4})=${b}$.`
      setReponse(this, 2, x0 + 4)
      this.contenuCorrection += `<br>${numAlpha(3)} $${c}$ a deux antécédents $${x0 + 2}$ et $${x0 + 6}$, on note $f(${x0 + 2})=f(${x0 + 6})=${c}$.`
      setReponse(this, 3, [`${x0 + 2};${x0 + 6}`, `${x0 + 6};${x0 + 2}`])
    } else {
      this.contenuCorrection += `<br>${numAlpha(2)} $${c}$ a deux antécédents $${x0 + 2}$ et $${x0 + 6}$, on note $f(${x0 + 2})=f(${x0 + 6})=${c}$.`
      setReponse(this, 2, [`${x0 + 2};${x0 + 6}`, `${x0 + 6};${x0 + 2}`])
      this.contenuCorrection += `<br>${numAlpha(3)} $${b}$ a pour unique antécédent $${x0 + 4}$, on note $f(${x0 + 4})=${b}$.`
      setReponse(this, 3, x0 + 4)
    }
    if (this.interactif && context.isHtml) {
      this.contenu += `<br><button class="ui button checkReponses" type="submit" style="margin-bottom: 20px" id="btnValidationEx${this.numeroExercice}-${this.id}">Vérifier les réponses</button>`
    }
    if (!context.isHtml) {
      this.contenu = texConsigne('') + this.contenu.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n')
      this.contenuCorrection = this.contenuCorrection.replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n')
    } else {
      this.contenuCorrection = `<div style="line-height: ${this.spacingCorr};">\n${this.contenuCorrection}\n</div>`
    }
  }
}
