import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique, ecritureParentheseSiNegatif, rienSi1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction } from '../../modules/outils/arrayFractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { miseEnEvidence, sp } from '../../modules/outils/contextSensitif.js'
import { abs, signe } from '../../modules/outils/nombres.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const titre = 'Équation du premier degré à solutions entières'

/**
 * Équation du premier degré
 * * Type 1 : x+a=b ou ax=b
 * * Type 2 : ax+b=c
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @author Rémi Angot
 * Modifications de 4L20 pour n'avoir que des solutions entières : Jean-Claude Lhote
 * 4L20-0
 */
export const uuid = '515b0'
export const ref = '4L20-0'
export default function ExerciceEquationASolutionEntiere () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les équations suivantes.'
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.correctionDetailleeDisponible = true
  if (!context.isHtml) {
    this.correctionDetaillee = false
  } else {
    this.correctionDetaillee = true
  }
  this.sup = true // Avec des nombres relatifs
  this.sup2 = 4 // Choix du type d'équation
  this.nbQuestions = 6

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeTypeDeQuestions
    switch (this.sup2.toString()) {
      case '1':
        listeTypeDeQuestions = ['ax=b', 'x+b=c']
        break
      case '2':
        listeTypeDeQuestions = ['ax+b=c']
        break
      case '3':
        listeTypeDeQuestions = ['ax+b=cx+d']
        break
      default:
        listeTypeDeQuestions = [
          'ax+b=0',
          'ax+b=c',
          'ax=b',
          'x+b=c',
          'ax+b=cx+d'
        ]
        break
    }
    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions
    )
    for (let i = 0, a, b, c, d, reponse, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      switch (listeTypeDeQuestions[i]) {
        case 'ax+b=0':
        case 'ax+b=c':
          if (listeTypeDeQuestions[i] === 'ax+b=0') {
            c = 0
          } else {
            c = randint(-9, 9, [0])
          }
          reponse = randint(-5, 5, [0, -1, 1])
          a = randint(-5, 5, [-1, 0, 1])
          if (!this.sup) {
            reponse = Math.abs(reponse)
            a = Math.abs(a)
            c = Math.abs(c)
          }
          b = c - a * reponse // b peut être négatif, ça sera une équation du type x-b=c
          texte = `$${a}x${ecritureAlgebrique(b)}=${c}$`
          texteCorr = texte + '<br>'
          if (this.correctionDetaillee) {
            if (b > 0) {
              texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${a}x${ecritureAlgebrique(b)}${miseEnEvidence(
          ecritureAlgebrique(-1 * b)
        )}=${c}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
          texteCorr += `$${a}x=${c - b}$<br>`
          if (this.correctionDetaillee) {
            texteCorr += `On divise les deux membres par $${a}$.<br>`
          }
          texteCorr += `$${a}x${miseEnEvidence(
          '\\div' + ecritureParentheseSiNegatif(a)
        )}=${c - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
          texteCorr += `$x=${texFraction(c - b, a)}=${reponse}$`
          texteCorr += `<br> La solution est $${reponse}$.`
          break
        case 'x+b=c':
          b = randint(-9, 9, [0]) // b peut être négatif, ça sera une équation du type x-b=c
          c = randint(-16, 15, 0)
          if (!this.sup) {
            c = Math.abs(c)
          }
          reponse = c - b
          texte = `$x${ecritureAlgebrique(b)}=${c}$`
          texteCorr = texte + '<br>'
          if (this.correctionDetaillee) {
            if (b > 0) {
              texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$x${ecritureAlgebrique(b)}${miseEnEvidence(
          ecritureAlgebrique(-1 * b)
        )}=${c}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
          texteCorr += `$x=${reponse}$`
          texteCorr += `<br> La solution est $${reponse}$.`
          break
        case 'ax=b':
          if (this.sup) {
            a = randint(-9, 9, [0, -1, 1]) // b peut être négatif, ça sera une équation du type x-b=c
            reponse = randint(-9, 9, [-1, 0, 1])
          } else {
            a = randint(2, 15)
            reponse = randint(2, 9)
          }
          b = a * reponse
          texte = `$${a}x=${b}$`
          texteCorr = texte + '<br>'
          if (this.correctionDetaillee) {
            texteCorr += `On divise les deux membres par $${a}$.<br>`
          }
          texteCorr += `$${a}x${miseEnEvidence(
          '\\div' + ecritureParentheseSiNegatif(a)
        )}=${b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
          texteCorr += `$x=${texFraction(b, a)}=${reponse}$`
          texteCorr += `<br> La solution est $${reponse}$.`
          break
        case 'ax+b=cx+d':
          reponse = randint(-9, 9, [0, -1, 1])
          d = randint(-15, 15, 0)
          c = randint(-5, 5, [-1, 0, 1])
          if (!this.sup) {
            reponse = Math.abs(reponse)
            c = Math.abs(c)
            a = randint(2, 5) + c
          } else {
            a = randint(-5, 5, [-c, -c + 1, -c - 1, 0]) + c
          }
          b = (c - a) * reponse + d
          texte = `$${rienSi1(a)}x${ecritureAlgebrique(b)}=${rienSi1(
          c
        )}x${ecritureAlgebrique(d)}$`
          texteCorr = texte + '<br>'
          if (this.correctionDetaillee) {
            if (c > 0) {
              texteCorr += `On soustrait $${rienSi1(
              c
            )}x$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${rienSi1(
              -1 * c
            )}x$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${rienSi1(a)}x${ecritureAlgebrique(
          b
        )}${miseEnEvidence(
          signe(-1 * c) + rienSi1(abs(c)) + 'x'
        )}=${c}x${ecritureAlgebrique(d)}${miseEnEvidence(
          signe(-1 * c) + rienSi1(abs(c)) + 'x'
        )}$<br>`
          texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(
          b
        )}=${d}$<br>`
          if (this.correctionDetaillee) {
            if (b > 0) {
              texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(
          b
        )}${miseEnEvidence(
          ecritureAlgebrique(-1 * b)
        )}=${d}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
          texteCorr += `$${rienSi1(a - c)}x=${d - b}$<br>`

          if (this.correctionDetaillee) {
            texteCorr += `On divise les deux membres par $${a - c}$.<br>`
          }
          texteCorr += `$${rienSi1(a - c)}x${miseEnEvidence(
          '\\div' + ecritureParentheseSiNegatif(a - c)
        )}=${d -
        b +
        miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}$<br>`
          texteCorr += `$x=${texFraction(d - b, a - c)}=${reponse}$`
          texteCorr += `<br> La solution est $${reponse}$.`
          break
      }
      texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texte: sp(10) + 'La solution est : $x=$' })
      this.sup ? setReponse(this, i, reponse, { signe: true }) : setReponse(this, i, reponse, { signe: false })
      if (this.questionJamaisPosee(i, a, b, c)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // replace(/1x/g,'x')); //remplace 1x par x
        this.listeCorrections.push(texteCorr) // .replace(/1x/g,'x')); //remplace 1x par x
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']
  this.besoinFormulaire2Numerique = [
    "Type d'équations",
    4,
    '1 : ax=b ou x+a=b ou x-a=b\n2: ax+b=c\n3: ax+b=cx+d\n4: Mélange'
  ]
}
