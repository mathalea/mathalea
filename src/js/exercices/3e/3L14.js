import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { fraction } from '../../modules/fractions.js'
import {
  listeQuestionsToContenu,
  randint,
  combinaisonListes,
  texFractionReduite,
  texFraction, choice, texteEnCouleurEtGras, contraindreValeur
} from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Résoudre une équation produit nul'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCHybride'
export const amcReady = true

export const dateDeModifImportante = '09/03/2023'

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
    switch (contraindreValeur(1, 8, this.sup, 1)) {
      case 1: listeTypeDeQuestions = combinaisonListes([1, 2], this.nbQuestions) // coefficients à 1
        break
      case 2: listeTypeDeQuestions = combinaisonListes([13, 42], this.nbQuestions) // 1 coef 1 et pas l'autre
        break
      case 3: listeTypeDeQuestions = combinaisonListes([3, 4], this.nbQuestions) // coefficients > 1 solutions entières
        break
      case 4: listeTypeDeQuestions = combinaisonListes([5, 6], this.nbQuestions) // coefficients > 1 solutions rationnelles (simplifiables ou pas)
        break
      case 5: listeTypeDeQuestions = combinaisonListes([1, 2, 13, 42], this.nbQuestions) // Mélange cas 1 et 2
        break
      case 6: listeTypeDeQuestions = combinaisonListes([13, 42, 3, 4], this.nbQuestions) // Mélange cas 2 et 3
        break
      case 7: listeTypeDeQuestions = combinaisonListes([3, 4, 5, 6], this.nbQuestions) // Mélange cas 3 et 4
        break
      case 8: listeTypeDeQuestions = combinaisonListes([1, 2, 3, 4, 5, 6, 13, 42], this.nbQuestions)
        break
    }
    for (let i = 0, a, b, c, d, solution1, solution2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // (x+a)(x+b)=0 avec a et b entiers
          b = randint(1, context.isAmc ? 9 : 20)
          d = randint(1, context.isAmc ? 9 : 20, [b])
          texte = `$(x+${b})(x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(x+${b})(x+${d})=0$`
          texteCorr += '<br> Soit ' + `$x+${b}=0$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$x+${d}=0$`
          texteCorr += '<br> Donc ' + `$x=${0 - b}$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$x=${0 - d}$`
          setReponse(this, i, [`${-b};${-d}`, `${-d};${-b}`])
          solution1 = Math.min(-b, -d)
          solution2 = Math.max(-b, -d)
          break
        case 2: // (x-b)(x+d)=0  ou (x+d)(x-b)=0 avec b et d entiers
        {
          b = randint(1, context.isAmc ? 9 : 20)
          d = randint(1, context.isAmc ? 9 : 20, [b])
          const choix = choice([0, 1])
          texte = [`$(x-${b})(x+${d})=0$`, `$(x+${d})(x-${b})=0$`][choix]
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + (choix === 0 ? `$x-${b}=0$` : `$x+${d}=0$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x+${d}=0$` : `$x-${b}=0$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${b}$` : `$x=${-d}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=${-d}$` : `$x=${b}$`)
          setReponse(this, i, [`${b};${-d}`, `${-d};${b}`])
          solution1 = Math.min(b, -d)
          solution2 = Math.max(b, -d)
          break
        }
        case 13: // (x+b)(cx+d)=0  avec b/a et d/c entiers.
        {
          a = randint(2, 6)
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          const choix = choice([0, 1])
          texte = [`$(x+${b})(${c}x+${d})=0$`, `$(${c}x+${d})(x+${b})=0$`][choix]
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + (choix === 0 ? `$x+${b}=0$` : `$${c}x+${d}=0$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x+${d}=0$` : `$x+${b}=0$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${-b}$` : `$${c}x=${-d}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x=${-d}$` : `$x=${-b}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${-b}$` : `$x=-${texFraction(d, c)}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=-${texFraction(d, c)}$` : `$x=${-b}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${-b}$` : `$x=${-d / c}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=${-d / c}$` : `$x=${-b}$`)
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
        }
        case 42: // (x-b)(cx+d)=0  ou (cx+d)(x-b)=0 avec d/c entiers.
        {
          b = Math.round(randint(1, context.isAmc ? 9 : 20))
          c = randint(2, 8, [b])
          d = Math.round(randint(1, 6) * c)
          const choix = choice([0, 1])
          texte = [`$(x-${b})(${c}x+${d})=0$`, `$(${c}x+${d})(x-${b})=0$`][choix]
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + (choix === 0 ? `$x-${b}=0$` : `$${c}x+${d}=0$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x+${d}=0$` : `$x-${b}=0$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${b}$` : `$${c}x=${-d}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x=${-d}$` : `$x=${b}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${b}$` : `$x=-${texFraction(d, c)}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=-${texFraction(d, c)}$` : `$x=${b}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${b}$` : `$x=${-d / c}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=${-d / c}$` : `$x=${b}$`)
          // il ne peut y avoir de solution double, il y a un positif et un négatif
          setReponse(this, i, [`${b};${-d / c}`, `${-d / c};${b}`])
          solution1 = -d / c // la négative en premier
          solution2 = b
          break
        }
        case 3: // (ax+b)(cx+d)=0  avec b/a et d/c entiers.
          a = randint(2, 6)
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          texte = `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${-b}$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$${c}x=${-d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$x=-${texFraction(d, c)}$`
          texteCorr += '<br> Donc ' + `$x=${-b / a}$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$x=${-d / c}$`
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
        case 4: // (ax+b)(cx-d)=0  avec b/a et d/c entiers.
        {
          a = randint(2, 6)
          b = Math.round(randint(1, 5) * a)
          c = randint(2, 6, [a])
          d = Math.round(randint(1, 5) * c)
          const choix = choice([0, 1])
          texte = [`$(${a}x+${b})(${c}x-${d})=0$`, `$(${c}x-${d})(${a}x+${b})=0$`][choix]
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + (choix === 0 ? `$${a}x+${b}=0$` : `$${c}x-${d}=0$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x-${d}=0$` : `$${a}x+${b}=0$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$${a}x=${-b}$` : `$${c}x=${d}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x=${d}$` : `$${a}x=${-b}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=-${texFraction(b, a)}$` : `$x=${texFraction(d, c)}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=${texFraction(d, c)}$` : `$x=-${texFraction(b, a)}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=${-b / a}$` : `$x=${d / c}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=${d / c}$` : `$x=${-b / a}$`)
          // il ne peut y avoir de solution double, il y a un positif et un négatif
          setReponse(this, i, [`${-b / a};${d / c}`, `${d / c};${-b / a}`])
          solution1 = -b / a // la négative en premier
          solution2 = d / c
          break
        }
        case 5:
          a = randint(2, 9) // (ax+b)(cx+d)=0 avec b/a et d/c quelconques.
          b = randint(1, context.isAmc ? 9 : 20, [a])
          c = randint(2, 9, [a])
          d = randint(1, context.isAmc ? 9 : 20, [b, c])
          texte = `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
          texteCorr += '<br> Soit ' + `$${a}x+${b}=0$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$${c}x+${d}=0$`
          texteCorr += '<br> Donc ' + `$${a}x=${0 - b}$` + ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$${c}x=${0 - d}$`
          texteCorr += '<br> Donc ' + `$x=-${texFraction(b, a)}$`
          if (texFraction(b, a) !== texFractionReduite(b, a)) { texteCorr += `$=-${texFractionReduite(b, a)}$` }
          texteCorr += ` ${texteEnCouleurEtGras('ou', 'black')} ` + `$x=-${texFraction(d, c)}$`
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
        case 6: {
          a = randint(2, 9) // (ax+b)(cx-d)=0 avec b/a et d/c quelconques.
          b = randint(1, context.isAmc ? 9 : 20, [a])
          c = randint(2, 9, [a])
          d = randint(1, context.isAmc ? 9 : 20, [b, c])
          const choix = choice([0, 1])
          texte = [`$(${a}x+${b})(${c}x-${d})=0$`, `$(${c}x-${d})(${a}x+${b})=0$`][choix]
          texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
          texteCorr += '<br>' + texte
          texteCorr += '<br> Soit ' + (choix === 0 ? `$${a}x+${b}=0$` : `$${c}x-${d}=0$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x-${d}=0$` : `$${a}x+${b}=0$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$${a}x=${0 - b}$` : `$${c}x=${d}$`) + ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$${c}x=${d}$` : `$${a}x=${0 - b}$`)
          texteCorr += '<br> Donc ' + (choix === 0 ? `$x=-${texFraction(b, a)}$` : `$x=${texFraction(d, c)}$`)
          if (choix === 0) {
            if (texFraction(b, a) !== texFractionReduite(b, a)) {
              texteCorr += `$=-${texFractionReduite(b, a)}$`
            }
          } else {
            if (texFraction(d, c) !== texFractionReduite(d, c)) {
              texteCorr += `$=${texFractionReduite(d, c)}$`
            }
          }
          texteCorr += ` ${texteEnCouleurEtGras('ou', 'black')} ` + (choix === 0 ? `$x=${texFraction(d, c)}$` : `$x=-${texFraction(b, a)}$`)
          if (choix === 1) {
            if (texFraction(b, a) !== texFractionReduite(b, a)) {
              texteCorr += `$=-${texFractionReduite(b, a)}$`
            }
          } else {
            if (texFraction(d, c) !== texFractionReduite(d, c)) {
              texteCorr += `$=${texFractionReduite(d, c)}$`
            }
          }

          // il ne peut y avoir de solution double, il y a un positif et un négatif
          setReponse(this, i, FractionX.texArrayReponsesCoupleDeFractionsEgalesEtSimplifiees(-b, a, d, c))
          solution1 = fraction(-b, a).simplifie() // la négative en premier
          solution2 = fraction(d, c).simplifie()
          break
        }
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
            enonce: 'Résoudre l\'équation : ' + texte + '\\\\\nSi il n\'y a qu\'une solution double, il faut la coder dans solution1 et solution2.\\\\\nLes fractions doivent être simplifiées au maximum.',
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 8, '1 : Coefficients de x = 1\n2 : Un coefficient de x >1 et l\'autre =1\n3 : Coefficient de x>1 et solutions entières\n4 : Solutions rationnelles\n5 : Mélange 1 et 2\n6 : Mélange 2 et 3\n7 : Mélange 3 et 4\n8 : Mélange de tout']
}
