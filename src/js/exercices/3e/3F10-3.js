import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rangeMinMax } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { droiteParPointEtPente, point, repere, tracePoint } from '../../modules/2d.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMult'
export const titre = 'Vocabulaire et notations des fonctions'
export const dateDePublication = '29/09/2022'
/**
* Répndre à des questions sur les fonctions.
*
* @author Gilles Mora
* 3F10-1
*/

export default function VocabulaireNotationsFonctions2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.consigne = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.spacing = 2
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    // this.consigne = 'Cocher toutes les réponses correctes.'

    let typesDeQuestionsDisponibles
    const r = repere({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 })
    switch (this.sup) {
      case 1: // vocabulaire1
        typesDeQuestionsDisponibles = ['Traduire une égalité par une phrase']
        break
      case 2: // vocabulaire2
        typesDeQuestionsDisponibles = ['Traduire une phrase par une égalité']
        break
      case 3: // graphique
        typesDeQuestionsDisponibles = ['Interprétation graphique']
        break
      case 4: // avec x
        typesDeQuestionsDisponibles = ['Expression littérale']
        break
      case 5: // mélange
        typesDeQuestionsDisponibles = ['Traduire une égalité par une phrase', 'Traduire une phrase par une égalité', 'Interprétation graphique', 'Expression littérale']
        break
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const sousChoix = combinaisonListes(rangeMinMax(0, 4), this.nbQuestions) // pour choisir aléatoirement des questions dans chaque catégorie
    for (let i = 0, texte, texteCorr, x, y, m, d, A, enonce, reponses = [], monQcm, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}

      // on ne choisit que des nombres compris entre 1 et 20
      x = randint(-9, 9, [0, 1, -1])
      y = randint(-9, 9, x)
      switch (listeTypeDeQuestions[i]) {
        case 'Traduire une égalité par une phrase':
          switch (sousChoix[i]) {
            case 0:
              enonce = `Traduire l'égalité  $f(${x})=${y}$ par une phrase contenant le mot "image".`
              if (this.interactif) { reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]] }
              break
            case 1:
              enonce = `$f : ${x} \\longmapsto ${y}$, alors pour la fonction $f$ :`
              if (this.interactif) { reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]] }
              break
            case 2:
              enonce = `Pour $x=${x}$, $f(x)=${y}$, alors pour la fonction $f$ :`
              if (this.interactif) { reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]] }
              break
            case 3:
              A = point(x, y)
              d = droiteParPointEtPente(A, randint(-4, 4, 0) / 2, '', 'red')
              enonce = 'La fonction $f$ est représentée par la droite rouge ci-dessous.<br>'
              enonce += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 15, scale: 0.5 }, r, d, tracePoint(A)) + '<br>Alors pour la fonction $f$ :'
              if (this.interactif) { reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]] }
              break
            case 4:
              m = randint(-9, 9, [x, y])
              enonce = `On sait que $f(${x})=f(${y})=${m}$, alors pour la fonction $f$ :`
              if (this.interactif) { reponses[i] = [[`$${x}$ et $${y}$ sont des antécédents de $${m}$.`, true], [`$${m}$ est l'image de $${x}$ et de $${y}$.`, true], [`$${x}$ et $${y}$ sont des images de $${m}$.`, false], [`$${m}$ est un antécédent de $${x}$ et $${y}$.`, false]] }
              break
          }
          break

        case 'Traduire une phrase par une égalité':
          switch (sousChoix[i]) {
            case 0:
              enonce = `$f$ est la fonction qui à $${x}$ associe $${y}$, alors pour la fonction $f$ :`
              break
            case 1:
              enonce = `$${x}$ a pour image $${y}$ par la fonction $f$, alors pour la fonction $f$ :`
              break
            case 2:
              enonce = `$${y}$ a pour antécédent $${x}$ par la fonction $f$, alors pour la fonction $f$ :`
              break
            case 3:
              enonce = `L'image de $${x}$ par la fonction $f$ est $${y}$, alors pour la fonction $f$ :`
              break
            case 4:
              enonce = `$${y}$ est l'image de $${x}$ par la fonction $f$, alors pour la fonction $f$ :`
              break
          }
          break
        case 'Interprétation graphique':
          switch (sousChoix[i]) {
            case 0:
              enonce = `On sait que $f(${x})=${y}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 1:
              enonce = `$f : ${x} \\longmapsto ${y}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 2:
              enonce = `Pour $x=${x}$, $f(x)=${y}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 3:
              A = point(x, y)
              d = droiteParPointEtPente(A, randint(-4, 4, 0) / 2, '', 'red')
              enonce = 'La fonction $f$ est représentée par la droite rouge ci-dessous.<br>'
              enonce += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 15, scale: 0.5 }, r, d, tracePoint(A)) + '<br>Alors pour la fonction $f$ :'
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 4:
              m = randint(-9, 9, [x, y])
              enonce = `On sait que $f(${x})=f(${y})=${m}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ et $${y}$ sont des antécédents de $${m}$.`, true], [`$${m}$ est l'image de $${x}$ et de $${y}$.`, true], [`$${x}$ et $${y}$ sont des images de $${m}$.`, false], [`$${m}$ est un antécédent de $${x}$ et $${y}$.`, false]]
              break
          }
          break
        case 'Expression littérale':
          switch (sousChoix[i]) {
            case 0:
              enonce = `On sait que $f(${x})=${y}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 1:
              enonce = `$f : ${x} \\longmapsto ${y}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 2:
              enonce = `Pour $x=${x}$, $f(x)=${y}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 3:
              A = point(x, y)
              d = droiteParPointEtPente(A, randint(-4, 4, 0) / 2, '', 'red')
              enonce = 'La fonction $f$ est représentée par la droite rouge ci-dessous.<br>'
              enonce += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 15, scale: 0.5 }, r, d, tracePoint(A)) + '<br>Alors pour la fonction $f$ :'
              reponses[i] = [[`$${x}$ est un antécédent de $${y}$.`, true], [`$${x}$ est l'image de $${y}$.`, false], [`$${y}$ est un antécédent de $${x}$.`, false], [`$${y}$ est l'image de $${x}$.`, true]]
              break
            case 4:
              m = randint(-9, 9, [x, y])
              enonce = `On sait que $f(${x})=f(${y})=${m}$, alors pour la fonction $f$ :`
              reponses[i] = [[`$${x}$ et $${y}$ sont des antécédents de $${m}$.`, true], [`$${m}$ est l'image de $${x}$ et de $${y}$.`, true], [`$${x}$ et $${y}$ sont des images de $${m}$.`, false], [`$${m}$ est un antécédent de $${x}$ et $${y}$.`, false]]
              break
          }

          break
      }

      if (this.interactif) {
        this.autoCorrection[i] = {
          enonce: enonce,
          options: { ordered: false, vertical: true },
          propositions: []
        }
        for (let k = 0; k < reponses[i].length; k++) {
          this.autoCorrection[i].propositions.push({ texte: reponses[i][k][0], statut: reponses[i][k][1] })
        }
        monQcm = propositionsQcm(this, i)
      }
      if (!context.isAmc) {
        texte = enonce + monQcm.texte
        texteCorr = monQcm.texteCorr
      } else {
        texte = enonce
        texteCorr = ''
      }

      if (this.questionJamaisPosee(i, listeTypeDeQuestions[i], x, y, sousChoix[i])) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Choix des questions',
    5,
    '1 : Traduire une égalité par une phrase\n2 : Traduire une phrase par une égalité \n3 : interprétation graphique\n4 : expression littérale\n5 : mélange'
  ]
}
