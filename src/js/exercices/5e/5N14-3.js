import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { fraction } from '../../modules/fractions.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListesSansChangerOrdre, calcul, texNombre2, texteEnCouleur } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'

export const titre = 'Fractions égales et égalité des produits en croix'

export const amcReady = true
export const amcType = 'qcmMono'
export const interactifType = 'qcm'
export const interactifReady = true

export const description = 'Déterminer si une égalité de deux fractions est vraie en utilisant les produits en croix.<br> 4 niveaux : petits entiers, grands entiers, décimaux, mélange.'

/**
 * * Fractions et égalité des produits en croix
 * * 5N14-3
 * * publication initiale le 23/05/2021
 * * modification le jj/mm/aaaa pour ....
 * @author Sébastien Lozano
 */
export default function EqResolvantesThales () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  if (this.debug) {
    this.nbQuestions = 4
  } else {
    this.nbQuestions = 4
  };
  this.sup = 1 // Niveau de difficulté
  this.consigne = 'Les égalités suivantes sont-elles vraies ? Justifier.'

  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.niveau = '5e'

  this.nouvelleVersion = function () {
    let typesDeQuestionsDisponibles = []
    if (this.debug) {
      typesDeQuestionsDisponibles = [0, 1, 2, 3]
    } else {
      typesDeQuestionsDisponibles = [0, 1, 2, 3]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let numLowInt, fLowInt, fEqOrNotLowInt, denLowInt, numBigInt, denBigInt, fBigInt, fEqOrNotBigInt, numDec, denDec, fDec, masterChoice, fEqOrNotDec

    // const listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus
    // if (this.niveau === '5e') {
    //   this.introduction = infoMessage({
    //     titre: 'ATTENTION - Hors programme 5e',
    //     texte: 'Cet exercice ne correspond plus au programme de 5e, vous le retrouvez au niveau 4e <a href="https://coopmaths.fr/mathalea.html?ex=4C20-2"> en cliquant ici</a>.',
    //     couleur: 'nombres'
    //   })
    // }
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On a besoin d'un booléen pour que tout ne soit pas vrai ou faux
      let equalOrNot
      // On a besoin de variables opur les fractions
      let f, fEqOrNot
      // On a besoin d'un numerateur d'un dénominateur et d'un coefficient pour les fractions égales
      let num, den
      // On a besoin d'un string pour stocker l'égalité et un autre pour la justification
      let egalite, justification
      /**
      * Une fonction pour rendre deux fractions égales ou pas
      * @param {boolean} bool
      * @returns deux fractions egales ou non
      */
      function fracEqualOrNot (bool, n, d) {
        // On a besoin de deux fractions
        let f2
        const f1 = fraction(n, d)
        if (bool) {
          f2 = fraction(calcul(n * k), calcul(d * k))
        } else {
          f2 = fraction(calcul(n + k), calcul(d + k))
        }
        return { frac: f1, fracEqualOrNot: f2 }
      }
      /**
      * Une fonction pour afficher des fraction avec num et/ou den décimaux
      * @param num le numerateur de type number
      * @param den le dénominateur de type number
      */
      function showFracNumDenDec (num, den) {
        const f = fraction(num, den)
        return `\\dfrac{${texNombre2(f.num)}}{${texNombre2(f.den)}}`
      }

      /**
      * Une fonction pour la correction
      * @param bool le booléen pour savoir si il y a égalité ou pas
      * @param f une fraction
      * @param fEqOrNot l'autre fraction égale ou pas
      */
      function justifyEq (bool, f, fEqOrNot) {
        let strOut
        if (bool) {
          strOut = `D'une part, ${texNombre2(f.num)}$\\times$${texNombre2(fEqOrNot.den)} $=$ ${texteEnCouleur(texNombre2(f.num * fEqOrNot.den))}.<br>
          D'autre part, ${texNombre2(f.den)}$\\times$${texNombre2(fEqOrNot.num)} $=$ ${texteEnCouleur(texNombre2(f.den * fEqOrNot.num))}.<br>
          On constate que les produits en croix sont égaux.<br>
          `
          if (Number.isInteger(f.num)) {
            strOut += `Les fractions $${f.texFraction}$ et $${fEqOrNot.texFraction}$ sont donc égales.`
          } else {
            strOut += `Les fractions $${showFracNumDenDec(f.num, f.den)}$ et $${showFracNumDenDec(fEqOrNot.num, fEqOrNot.den)}$ sont donc égales.`
          }
        } else {
          strOut = `D'une part, ${texNombre2(f.num)}$\\times$${texNombre2(fEqOrNot.den)} $=$ ${texteEnCouleur(texNombre2(f.num * fEqOrNot.den))}.<br>
          D'autre part, ${texNombre2(f.den)}$\\times$${texNombre2(fEqOrNot.num)} $=$ ${texteEnCouleur(texNombre2(f.den * fEqOrNot.num))}.<br>
          On constate que les produits en croix ne sont pas égaux.<br>
          `
          if (Number.isInteger(f.num)) {
            strOut += `Les fractions $${f.texFraction}$ et $${fEqOrNot.texFraction}$ ne sont donc pas égales.`
          } else {
            strOut += `Les fractions $${showFracNumDenDec(f.num, f.den)}$ et $${showFracNumDenDec(fEqOrNot.num, fEqOrNot.den)}$ ne sont donc pas égales.`
          }
        }
        return strOut
      }
      const k = randint(2, 9)
      // On prépare tous les contenus selon le type de questions
      this.sup = Number(this.sup) // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
      switch (this.sup) {
        case 1: // petits entiers égalité
          equalOrNot = choice([true, false])
          num = randint(1, 9)
          den = randint(2, 9, num)
          egalite = `$${fracEqualOrNot(equalOrNot, num, den).frac.texFraction}\\overset{?}{=}${fracEqualOrNot(equalOrNot, num, den).fracEqualOrNot.texFraction}$`
          justification = justifyEq(equalOrNot, fracEqualOrNot(equalOrNot, num, den).frac, fracEqualOrNot(equalOrNot, num, den).fracEqualOrNot)
          break
        case 2: // grands entiers
          equalOrNot = choice([true, false])
          num = randint(11, 99)
          den = randint(11, 99, num)
          egalite = `$${fracEqualOrNot(equalOrNot, num, den).frac.texFraction}=${fracEqualOrNot(equalOrNot, num, den).fracEqualOrNot.texFraction}$`
          justification = justifyEq(equalOrNot, fracEqualOrNot(equalOrNot, num, den).frac, fracEqualOrNot(equalOrNot, num, den).fracEqualOrNot)
          break
        case 3: // décimaux
          equalOrNot = choice([true, false])
          num = calcul(randint(11, 99) * 0.1)
          den = calcul(randint(11, 99, num) * 0.1)
          f = fracEqualOrNot(equalOrNot, num, den).frac
          fEqOrNot = fracEqualOrNot(equalOrNot, num, den).fracEqualOrNot
          egalite = `$${showFracNumDenDec(f.num, f.den)}=${showFracNumDenDec(fEqOrNot.num, fEqOrNot.den)}$`
          justification = justifyEq(equalOrNot, fracEqualOrNot(equalOrNot, num, den).frac, fracEqualOrNot(equalOrNot, num, den).fracEqualOrNot)
          break
        case 4: // mélange
          equalOrNot = choice([true, false])
          numLowInt = randint(2, 9)
          denLowInt = randint(2, 9, numLowInt)
          fLowInt = fracEqualOrNot(equalOrNot, numLowInt, denLowInt).frac
          fEqOrNotLowInt = fracEqualOrNot(equalOrNot, numLowInt, denLowInt).fracEqualOrNot
          numBigInt = randint(11, 99)
          denBigInt = randint(11, 99, numBigInt)
          fBigInt = fracEqualOrNot(equalOrNot, numBigInt, denBigInt).frac
          fEqOrNotBigInt = fracEqualOrNot(equalOrNot, numBigInt, denBigInt).fracEqualOrNot
          numDec = calcul(randint(11, 99) * 0.1)
          denDec = calcul(randint(11, 99, numDec) * 0.1)
          fDec = fracEqualOrNot(equalOrNot, numDec, denDec).frac
          fEqOrNotDec = fracEqualOrNot(equalOrNot, numDec, denDec).fracEqualOrNot
          masterChoice = choice([
            { equalOrNot: equalOrNot, num: numLowInt, den: denLowInt, k: k, f: fLowInt, fEqOrNot: fEqOrNotLowInt },
            { equalOrNot: equalOrNot, num: numBigInt, den: denBigInt, k: k, f: fBigInt, fEqOrNot: fEqOrNotBigInt },
            { equalOrNot: equalOrNot, num: numDec, den: denDec, k: k, f: fDec, fEqOrNot: fEqOrNotDec }
          ])
          egalite = ''
          if (Number.isInteger(masterChoice.num)) {
            egalite += `$${masterChoice.f.texFraction}=${masterChoice.fEqOrNot.texFraction}$`
          } else {
            egalite += `$${showFracNumDenDec(masterChoice.f.num, masterChoice.f.den)}=${showFracNumDenDec(masterChoice.fEqOrNot.num, masterChoice.fEqOrNot.den)}$`
          }
          justification = justifyEq(equalOrNot, masterChoice.f, masterChoice.fEqOrNot)
          break
      };

      const enonces = []
      for (let k = 0; k < 4; k++) {
        enonces.push({
          enonce: egalite,
          question: '',
          correction: justification
        })
      };
      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 3:
          texte = `${enonces[3].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
      };
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: 'L\'égalité est vraie',
          statut: equalOrNot
        },
        {
          texte: 'L\'égalité est fausse',
          statut: !equalOrNot
        },
        {
          texte: 'Je ne sais pas',
          statut: false
        }
      ]
      this.autoCorrection[i].options = { ordered: true } // On ne mélange pas les propositions 'Oui', 'Non' et 'Je ne sais pas'
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de nombres', 4, '1 : Petits entiers\n2 : Grands entiers\n3 : Décimaux\n4 : Mélange']
}
