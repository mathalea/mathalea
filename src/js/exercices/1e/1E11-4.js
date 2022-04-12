import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureAlgebriqueSauf1, extraireRacineCarree, pgcd, calcul, egal } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { fraction } from '../../modules/fractions.js'
import { choisiDelta } from '../../modules/fonctionsMaths.js'
export const interactifReady = false
// export const interactifType = 'mathLive'
export const titre = 'Résoudre une équation du second degré à partir de la forme canonique'

/**
 * Calcul de discriminant pour identifier la forme graphique associée (0 solution dans IR, 1 ou 2)
 * @author Stéphane Guyon
 * Référence 1E11
*/
export default function Resolutionavecformecanonique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Utiliser la forme canonique pour résoudre une équation du second degré : '
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (this.interactif) {
      this.consigne += '<br> '
    }
    const listeTypeDeQuestions = combinaisonListes([true, true, false], this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, p, b1, b2, c1, x1String, x2String, stringX1, stringX2, x1, x2, c, delta, alpha, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      [a, b, c] = choisiDelta(listeTypeDeQuestions[i])
      c1 = fraction(c, a)
      b1 = fraction(b, a)
      alpha = fraction(b, 2 * a)
      delta = b * b - 4 * a * c
      b2 = fraction(delta, 4 * a * a).simplifie() // terme b² dans l'expression a²-b²
      texte = `Résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0$ sans utiliser le discriminant,`
      texte += ' mais en utilisant la forme canonique du polynôme.'
      texteCorr = `On veut résoudre dans $\\mathbb{R}$ l'équation $${rienSi1(a)}x^2${ecritureAlgebriqueSauf1(b)}x${ecritureAlgebrique(c)}=0\\quad(1)$.`
      texteCorr += '<br>On reconnaît une équation du second degré sous la forme $ax^2+bx+c = 0$.'
      texteCorr += '<br>La consigne nous amène à commencer par écrire le polynôme du second degré sous forme canonique, <br>c\'est à dire sous la forme :  $a(x-\\alpha)^2+\\beta$,'

      // On simplifie par a si a !==1
      if (a !== 1) {
        texteCorr += `<br>On commence par diviser les deux membres de l'égalité par le coefficient $a$ qui vaut ici $${a}$.`
        texteCorr += `<br>$(1)\\iff\\quad x^2 ${b1.valeurDecimale === 1 ? '+ ' : b1.valeurDecimale === -1 ? '- ' : b1.simplifie().ecritureAlgebrique} x ${c1.simplifie().ecritureAlgebrique}=0$`

        // fin du test si a<>1
      }
      // ******************************************************************************************************************
      // ******************      Reconnaissance de l'identité remarquable :    ********************************************
      // ******************************************************************************************************************
      texteCorr += '<br>On reconnaît le début d\'une identité remarquable :'
      texteCorr += `<br>$\\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2`
      // texteCorr += `${alpha.s === 1 ? '+' : '-'}2\\times ${alpha.valeurAbsolue().simplifie().texFraction}\\times x +${alpha.simplifie().d === 1 ? alpha.simplifie().valeurAbsolue().texFraction : '\\left(' + alpha.simplifie().valeurAbsolue().texFraction + '\\right)'}^2$`
      // 2èmeligne correction On développe IR
      texteCorr += `=x^2 ${alpha.s === 1 ? '+' : '-'}${Math.abs(alpha.n * 2) === Math.abs(alpha.d) ? '' : alpha.multiplieEntier(2).valeurAbsolue().simplifie().texFraction}x+${alpha.produitFraction(alpha).simplifie().texFraction} $`
      // 3èmeligne correction On réécrrit l'expression en fct de l'IR
      texteCorr += '<br>On en déduit que :  '
      texteCorr += `$x^2 ${alpha.s === 1 ? '+' : '-'}${Math.abs(alpha.n * 2) === Math.abs(alpha.d) ? '' : alpha.multiplieEntier(2).valeurAbsolue().simplifie().texFraction}x= \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2    ${alpha.produitFraction(alpha).oppose().simplifie().ecritureAlgebrique} $`
      // 3èmeligne correction On transforme l'équation avec l'IR
      texteCorr += '<br>Il vient alors :'
      texteCorr += `<br>$\\phantom{\\iff}\\quad x^2 ${b1.valeurDecimale === 1 ? '+ ' : b1.valeurDecimale === -1 ? '- ' : b1.simplifie().ecritureAlgebrique} x ${c1.simplifie().ecritureAlgebrique}=0$`
      texteCorr += `<br>$\\iff\\quad  \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2    ${alpha.produitFraction(alpha).oppose().simplifie().ecritureAlgebrique}${c1.simplifie().ecritureAlgebrique}=0$`
      // 4èmeligne correction : On factorise pour obtenir équation produit-nul
      texteCorr += `<br>$\\iff\\quad  \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)^2    ${b2.simplifie().oppose().ecritureAlgebrique}=0$`
      // test des solutions
      if (delta < 0) {
        texteCorr += '<br>L\'équation revient à ajouter deux nombres positifs, dont un non-nul. Cette somme ne peut pas être égale à zéro.'
        texteCorr += '<br>On en déduit que $S=\\emptyset$'
      } else if (delta > 0) { // Cas des deux solutions :
        texteCorr += '<br>On reconnaît l\'identité remarquable $a^2-b^2$ :'
        texteCorr += `<br>avec  $a= \\left(x ${alpha.simplifie().ecritureAlgebrique}\\right)$ `
        texteCorr += `et $b =${b2.texRacineCarree(true)}$`// = ${b3.simplifie().texFraction} why ?
        texteCorr += '<br>L\'équation à résoudre est équivalente à :'
        texteCorr += `<br> $\\left(x ${alpha.simplifie().ecritureAlgebrique}-${b2.texRacineCarree()}\\right)\\left(x ${alpha.simplifie().ecritureAlgebrique}+${b2.texRacineCarree()}\\right)=0$`
        if (pgcd(Math.abs(b), Math.abs(calcul(2 * a))) === pgcd(extraireRacineCarree(delta)[0], Math.abs(calcul(2 * a)))) {
          p = pgcd(Math.abs(b), Math.abs(calcul(2 * a)))
        } else {
          p = 1
        }
        if (b2.estParfaite) { // pas de radical, calcul rationnel
          x1 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie().oppose()).simplifie()
          x2 = alpha.simplifie().sommeFraction(b2.racineCarree().simplifie()).simplifie()
          if (a < 0) {
            x1String = x1.ecritureAlgebrique
            stringX1 = x1.oppose().texFraction
            x2String = x2.ecritureAlgebrique
            stringX2 = x2.oppose().texFraction
          } else {
            x1String = x1.ecritureAlgebrique
            stringX1 = x1.oppose().texFraction
            x2String = x2.ecritureAlgebrique
            stringX2 = x2.oppose().texFraction
          }
        } else { // présence d'un radical x1String contient ce qui est après x dans le facteur 1 stringX1 contient son opposé (transposé dans l'autre membre) Idem pour x2String et stringX2
          if (a < 0) {
            if (b < 0) { // a et b négatifs
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x1String = `+\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX1 = `\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${calcul(-b / p)}}{${Math.abs(calcul(2 * a / p))}}`
                x2String = `+\\dfrac{${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX2 = `\\dfrac{${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              } else { // absence de trait de fraction
                x1String = `+${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${calcul(-b / p)}`
                x2String = `+${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            } else { // a négatif, b positif
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x2String = `-\\dfrac{${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX2 = `\\dfrac{${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                x1String = `-\\dfrac{${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX1 = `\\dfrac{${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              } else { // absence de trait de fraction
                x2String = `-${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                x1String = `-${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            }
          } else {
            if (b < 0) { // a positif b négatif
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x1String = `-\\dfrac{${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX1 = `\\dfrac{${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                x2String = `-\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX2 = `\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              } else { // absence de trait de fraction
                x2String = `-${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                x1String = `-${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${calcul(-b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            } else { // a et b positifs
              if (!egal(Math.abs(2 * a) / p, 1)) { // présence d'un dénominateur
                x1String = `-\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${calcul(b / p)}}{${Math.abs(calcul(2 * a / p))}}`
                stringX1 = `\\dfrac{${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${calcul(b / p)}}{${Math.abs(calcul(2 * a / p))}}`
                x2String = `+\\dfrac{${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
                stringX2 = `\\dfrac{${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}}{${Math.abs(calcul(2 * a / p))}}`
              } else { // absence de trait de fraction
                x1String = `+${calcul(b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX1 = `${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}-${calcul(b / p)}`
                x2String = `+${calcul(b / p)}+${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
                stringX2 = `${calcul(-b / p)}-${rienSi1(calcul(extraireRacineCarree(delta)[0]) / p)}\\sqrt{${extraireRacineCarree(delta)[1]}}`
              }
            }
          }
        }
        if (!egal(Math.abs(2 * a) / p, 1)) { // présence de traits de fraction donc réécriture du produit nul
          texteCorr += `<br> $\\left(x ${x1String}\\right)\\left(x ${x2String}\\right)=0$`
        }
        texteCorr += '<br> On applique la propriété du produit nul :' // fin de la rédaction
        texteCorr += `<br> Soit $x ${x1String}=0$ , soit $x ${x2String}=0$` // on isole les facteurs nuls
        texteCorr += `<br> Soit $x = ${stringX1}$ , soit $x = ${stringX2}$`// on écrit les solutions
        texteCorr += `<br> $S =\\left\\{${stringX2};${stringX1}\\right\\}$` // Solution
      } else { // cas de delta  = 0
        // pour l'instant pas de delta nul avec choisiDelta
      }

      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
