import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { fraction } from '../../modules/fractions'
import {
  listeQuestionsToContenu,
  randint,
  combinaisonListes,
  texFractionReduite,
  texFraction, choice
} from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Résoudre une équation produit nul'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCHybride'
export const amcReady = true

export const dateDeModifImportante = '18/03/2022'

/**
 * Résolution d'équations de type (ax+b)(cx+d)=0
 * @author Jean-Claude Lhote
 * Tout est dans le nom de la fonction.
 * Référence 3L14
 * Rendu interactif par Guillaume Valmont le 18/03/2022
 */
export const uuid = 'ecf62'
export const ref = '3L14'
export default function ResoudreUneEquationProduitNul () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1.5
  this.spacing = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.consigne = 'Résoudre ' + (this.nbQuestions !== 1 ? 'les équations suivantes' : 'l\'équation suivante') + '.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeTypeDeQuestions = []
    switch (parseInt(this.sup)) {
      case 1: listeTypeDeQuestions = combinaisonListes([1, 2], this.nbQuestions)
        break
      case 2: listeTypeDeQuestions = combinaisonListes([3, 13, 4, 42], this.nbQuestions)
        break
      case 3: listeTypeDeQuestions = combinaisonListes([5, 6], this.nbQuestions)
        break
      case 4: listeTypeDeQuestions = combinaisonListes([1, 2, 13, 3, 42, 4, 5, 6], this.nbQuestions)
    }
    for (let i = 0, a, b, c, d, solution1, solution2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: b = randint(1, 9) // (x+a)(x+b)=0 avec a et b entiers
          d = randint(1, 9, [b])
          texte = `$(x+${b})(x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(x+${b})(x+${d})=0$`
          texteCorr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`
          setReponse(this, i, [`${-b};${-d}`, `${-d};${-b}`])
          solution1 = Math.min(-b, -d)
          solution2 = Math.max(-b, -d)
          break
        case 2: b = randint(1, 9) // (x-a)(x+b)=0 avec a et b entiers
          d = randint(1, 9, [b])
          texte = `$(x-${b})(x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(x-${b})(x+${d})=0$`
          texteCorr += '<br> Soit ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${-d}$`
          setReponse(this, i, [`${b};${-d}`, `${-d};${b}`])
          solution1 = Math.min(b, -d)
          solution2 = Math.max(b, -d)
          break
        case 13: a = randint(2, 6) // (x+b)(cx+d)=0  avec b/a et d/c entiers.
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          texte = choice([`$(x+${b})(${c}x+${d})=0$`, `$(${c}x+${d})(x+${b})=0$`])
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${-b}$` + ' ou ' + `$${c}x=${-d}$`
          texteCorr += '<br> Donc ' + `$x=${-b}$` + ' ou ' + `$x=-${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${-b}$` + ' ou ' + `$x=${-d / c}$`
          if (-b * c === -d) {
            setReponse(this, i, `${-b}`)
            solution1 = -b
            solution2 = -b
          } else {
            setReponse(this, i, [`${-b};${-d / c}`, `${-d / c};${-b}`])
            solution1 = Math.min(-b, -d / c)
            solution2 = Math.max(-b, -d / c)
          }
          break
        case 42: // (x-b)(cx+d)=0  avec b/a et d/c entiers.
          b = Math.round(randint(1, 9))
          c = randint(2, 8, [b])
          d = Math.round(randint(1, 6) * c)
          texte = choice([`$(x-${b})(${c}x+${d})=0$`, `$(${c}x+${d})(x-${b})=0$`])
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + `$x-${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$${c}x=${-d}$`
          texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=-${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${-d / c}$`
          // il ne peut y avoir de solution double, il y a un positif et un négatif
          setReponse(this, i, [`${b};${-d / c}`, `${-d / c};${b}`])
          solution1 = -d / c // la négative en premier
          solution2 = b
          break
        case 3: a = randint(2, 6) // (ax+b)(cx+d)=0  avec b/a et d/c entiers.
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          texte = `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${-b}$` + ' ou ' + `$${c}x=${-d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$` + ' ou ' + `$x=-${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${-b / a}$` + ' ou ' + `$x=${-d / c}$`
          if (-b * c === -d * a) {
            setReponse(this, i, `${-b / a}`)
            solution1 = -b / a
            solution2 = -b / a
          } else {
            setReponse(this, i, [`${-b / a};${-d / c}`, `${-d / c};${-b / a}`])
            solution1 = Math.min(-b / a, -d / c)
            solution2 = Math.max(-b / a, -d / c)
          }
          break
        case 4: a = randint(2, 6) // (ax+b)(cx-d)=0  avec b/a et d/c entiers.
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          texte = choice([`$(${a}x+${b})(${c}x-${d})=0$`, `$(${c}x-${d})(${a}x+${b})=0$`])
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${-b}$` + ' ou ' + `$${c}x=${d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$` + ' ou ' + `$x=${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${-b / a}$` + ' ou ' + `$x=${d / c}$`
          // il ne peut y avoir de solution double, il y a un positif et un négatif
          setReponse(this, i, [`${-b / a};${d / c}`, `${d / c};${-b / a}`])
          solution1 = -b / a // la négative en premier
          solution2 = d / c
          break
        case 5:
          a = randint(2, 9) // (ax+b)(cx+d)=0 avec b/a et d/c quelconques.
          b = randint(1, 9, [a])
          c = randint(2, 9, [a])
          d = randint(1, 9, [b, c])
          texte = `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$`
          if (texFraction(b, a) !== texFractionReduite(b, a)) { texteCorr += `$=-${texFractionReduite(b, a)}$` }
          texteCorr += ' ou ' + `$x=-${texFraction(d, c)}$`
          if (texFraction(d, c) !== texFractionReduite(d, c)) { texteCorr += `$=-${texFractionReduite(d, c)}$` }
          if (b * c === d * a) {
            setReponse(this, i, `$=-${texFractionReduite(d, c)}$`)
            solution1 = fraction(-d, c).simplifie()
            solution2 = fraction(-d, c).simplifie()
          } else {
            setReponse(this, i, FractionX.texArrayReponsesCoupleDeFractionsEgalesEtSimplifiees(-b, a, -d, c))
            if (-b / a < -d / c) {
              solution1 = fraction(-b, a).simplifie()
              solution2 = fraction(-d, c).simplifie()
            } else {
              solution2 = fraction(-b, a).simplifie()
              solution1 = fraction(-d, c).simplifie()
            }
          }
          break
        case 6:
          a = randint(2, 9) // (ax+b)(cx-d)=0 avec b/a et d/c quelconques.
          b = randint(1, 9, [a])
          c = randint(2, 9, [a])
          d = randint(1, 9, [b, c])
          texte = choice([`$(${a}x+${b})(${c}x-${d})=0$`, `$(${c}x-${d})(${a}x+${b})=0$`])
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$`
          if (texFraction(b, a) !== texFractionReduite(b, a)) { texteCorr += `$=-${texFractionReduite(b, a)}$` }
          texteCorr += ' ou ' + `$x=${texFraction(d, c)}$`
          if (texFraction(d, c) !== texFractionReduite(d, c)) { texteCorr += `$=${texFractionReduite(d, c)}$` }
          // il ne peut y avoir de solution double, il y a un positif et un négatif

          setReponse(this, i, FractionX.texArrayReponsesCoupleDeFractionsEgalesEtSimplifiees(-b, a, d, c))
          solution1 = fraction(-b, a).simplifie() // la négative en premier
          solution2 = fraction(d, c).simplifie()

          break
      }
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'inline largeur25')
      }
      this.introduction = (this.interactif && context.isHtml) ? "<em>S'il y a plusieurs réponses, les séparer par un point-virgule. Si c'est une fraction, elle doit être irréductible.</em>" : ''
      if (this.questionJamaisPosee(i, a, b, c, d)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: 'Résoudre l\'équation : ' + texte,
            enonceAvant: true, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
            enonceAvantUneFois: true, // EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
            enonceCentre: false, // EE : ce champ est facultatif et permet (si true) de centrer le champ 'enonce' ci-dessus.
            enonceApresNumQuestion: false, // New (12/2022) EE : ce champ est facultatif et permet (si true) de mettre le champ 'enonce' à côté du numéro de question (et non avant par défaut). Ne fonctionne (pour l'instant) que si la première question est AMCNum (pas de besoin autre pour l'instant).
            melange: false, // EE : ce champ est facultatif et permet (si false) de ne pas provoquer le mélange des questions.
            options: { multicols: true, barreseparation: false, multicolsAll: false, avecSymboleMult: false, numerotationEnonce: false }, // facultatif.
            // multicols (par défaut à false) provoque un multicolonnage (sur 2 colonnes par défaut) des propositions : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
            // barreseparation (par défaut à false) permet de mettre une barre de séparation entre les deux colonnes.
            // multicolsAll (par défaut à false) permet le multicolonnage sur 2 colonnes en incluant l'énoncé. multicolsAll annule multicols.
            // avecSymboleMult (par défaut à false) permet en cas de QCMMult d'avoir un numéro de question ET le symbole indiquant un choix multiple possible et non unique.
            // numerotationEnonce (par défaut à false) permet de mettre un numéro devant l'énoncé (s'il devait en manquer un).
            propositions: [
              {
                type: 'AMCOpen', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
                propositions: [ // une ou plusieurs (Qcms) 'propositions'
                  {
                    texte: texteCorr,
                    statut: 5,
                    feedback: '',
                    enonce: '',
                    sanscadre: false,
                    pointilles: true,
                    sanslignes: true // facultatif. Permet d'enlever les lignes dans AMCOpen.
                  }]
              },
              {
                type: 'AMCNum', // on donne le type de la deuxième question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
                propositions: [ // une ou plusieurs (Qcms) 'propositions'
                  {
                    texte: '',
                    reponse: { // utilisé si type = 'AMCNum'
                      texte: 'solution 1',
                      valeur: solution1,
                      alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                      param: {
                        digits: 0, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                        decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                        signe: true, // obligatoire pour AMC (présence d'une case + ou -)
                        approx: 0, // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                        vertical: false, // facultatif. Si true, les cases à cocher seront positionnées verticalement
                        aussiCorrect: solution2
                      }
                    }
                  }
                ]
              },
              {
                type: 'AMCNum', // on donne le type de la deuxième question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
                propositions: [ // une ou plusieurs (Qcms) 'propositions'
                  {
                    texte: '',
                    reponse: { // utilisé si type = 'AMCNum'
                      texte: 'solution 2',
                      valeur: solution2,
                      alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                      param: {
                        digits: 0, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                        decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                        signe: true, // obligatoire pour AMC (présence d'une case + ou -)
                        approx: 0, // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                        vertical: false, // facultatif. Si true, les cases à cocher seront positionnées verticalement
                        aussiCorrect: solution1
                      }
                    }
                  }
                ]
              }
            ]
          }
        }

        // alert(this.listeQuestions)
        // alert(this.listeCorrections)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, ' 1 : Coefficient de x = 1\n 2 : Coefficient de x>=1 et solutions entières\n 3 : Solutions rationnelles\n 4 : Mélange']
}
