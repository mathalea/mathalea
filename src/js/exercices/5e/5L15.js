import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureParentheseSiNegatif } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { calcul } from '../../modules/outils/texNombres.js'

export const titre = 'Tester une égalité'

/**
* Tester une égalité pour 2 valeurs données (une vraie et une fausse)
*
* * 3x-a=2x+b
* * 3x+a=5x-b
* * ax+b=(a+1)x-c
* * a-2x=b+2x
* @author Rémi Angot
* 5L15
*/
export const uuid = 'd88d6'
export const ref = '5L15'
export default function TesterUneEgalite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = false

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles // = range1(5)

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    if (this.sup2 === false) { typesDeQuestionsDisponibles = [1, 2, 3, 4, 5] } else { typesDeQuestionsDisponibles = [6, 7, 3] }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let a, b, c, d, x1, x2, x3
      switch (listeTypeDeQuestions[i]) {
        case 1: // 3x-a=2x+b   x=a+b
          if (this.sup === 1) {
            a = randint(1, 6)
            b = randint(1, 6, [a])
            x2 = a + b
            x1 = randint(2, 10, [x2])
          } else {
            a = randint(-6, 6, [0])
            b = randint(-6, 6, [a, 0])
            x2 = a + b
            x1 = randint(-10, 10, [0, x2])
          }

          texte = `Tester l'égalité $3x-${ecritureParentheseSiNegatif(a)}=2x+${ecritureParentheseSiNegatif(b)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$3x-${ecritureParentheseSiNegatif(a)}=3\\times ${ecritureParentheseSiNegatif(x1)}-${ecritureParentheseSiNegatif(a)}=${3 * x1 - a}$ <br> $2x+${ecritureParentheseSiNegatif(b)}=2\\times ${ecritureParentheseSiNegatif(x1)}+${ecritureParentheseSiNegatif(b)}=${2 * x1 + b}$<br>`
          texteCorr += `$${3 * x1 - a}\\not=${2 * x1 + b}$ donc l'égalité n'est pas vraie.<br><br>`
          texteCorr += `Pour $x=${ecritureParentheseSiNegatif(x2)}$ : <br>`
          texteCorr += `$3x-${ecritureParentheseSiNegatif(a)}=3\\times ${ecritureParentheseSiNegatif(x2)}-${ecritureParentheseSiNegatif(a)}=${3 * x2 - a}$ <br> $2x+${ecritureParentheseSiNegatif(b)}=2\\times ${ecritureParentheseSiNegatif(x2)}+${ecritureParentheseSiNegatif(b)}=${2 * x2 + b}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.'
          break
        case 2: // 3x+a=5x-b   x=(a+b)/2 donc a et b impairs pour une solution entière
          if (this.sup === 1) {
            a = randint(1, 9)
            b = randint(0, 4) * 2 + a % 2
            x1 = parseInt(calcul((a + b) / 2))
            x2 = randint(1, 9, x1)
          } else {
            a = randint(-9, 9, [0])
            b = randint(-4, 4, [a, 0]) * 2 + a % 2
            x1 = parseInt(calcul((a + b) / 2))
            x2 = randint(-9, 9, [0, x1])
          }

          texte = `Tester l'égalité $3x+${ecritureParentheseSiNegatif(a)}=5x-${ecritureParentheseSiNegatif(b)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$3x+${ecritureParentheseSiNegatif(a)}=3\\times ${ecritureParentheseSiNegatif(x1)}+${ecritureParentheseSiNegatif(a)}=${3 * x1 + a}$ <br> $5x-${ecritureParentheseSiNegatif(b)}=5\\times ${ecritureParentheseSiNegatif(x1)}-${ecritureParentheseSiNegatif(b)}=${5 * x1 - b}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          texteCorr += `Pour $x=${x2}$ : <br>`
          texteCorr += `$3x+${ecritureParentheseSiNegatif(a)}=3\\times ${ecritureParentheseSiNegatif(x2)}+${ecritureParentheseSiNegatif(a)}=${3 * x2 + a}$ <br> $5x-${ecritureParentheseSiNegatif(b)}=5\\times ${ecritureParentheseSiNegatif(x2)}-${ecritureParentheseSiNegatif(b)}=${5 * x2 - b}$<br>`
          texteCorr += `$${3 * x2 + a}\\not=${5 * x2 - b}$ donc l'égalité n'est pas vraie.`
          break
        case 3: // 10(x-a)=4(2x+b) x=(10a+4b)/2
          if (this.sup === 1) {
            a = randint(1, 3)
            b = randint(1, 3)
            x2 = parseInt(calcul((10 * a + 4 * b) / 2))
            x1 = randint(1, 9, x2)
          } else {
            a = randint(-3, 3, [0])
            b = randint(-3, 3, [0])
            x2 = parseInt(calcul((10 * a + 4 * b) / 2))
            x1 = randint(-9, 9, [0, x2])
          }

          texte = `Tester l'égalité $10(x-${ecritureParentheseSiNegatif(a)})=4(2x+${ecritureParentheseSiNegatif(b)})~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$10(x-${ecritureParentheseSiNegatif(a)})=10\\times (${ecritureParentheseSiNegatif(x1)}-${ecritureParentheseSiNegatif(a)})=10\\times ${x1 - a}=${10 * (x1 - a)}$ <br> $4(2x+${ecritureParentheseSiNegatif(b)})=4\\times (2\\times ${ecritureParentheseSiNegatif(x1)}+${ecritureParentheseSiNegatif(b)})=4\\times ${2 * x1 + b}=${4 * (2 * x1 + b)}$<br>`
          texteCorr += `$${10 * (x1 - a)}\\not=${4 * (2 * x1 + b)}$ donc l'égalité n'est pas vraie.<br><br>`
          texteCorr += `Pour $x=${x2}$ : <br>`
          texteCorr += `$10(x-${ecritureParentheseSiNegatif(a)})=10\\times (${ecritureParentheseSiNegatif(x2)}-${ecritureParentheseSiNegatif(a)})=10\\times ${x2 - a}=${10 * (x2 - a)}$ <br> $4(2x+${ecritureParentheseSiNegatif(b)})=4\\times (2\\times ${ecritureParentheseSiNegatif(x2)}+${ecritureParentheseSiNegatif(b)})=4\\times ${2 * x2 + b}=${4 * (2 * x2 + b)}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.'
          break
        case 4: // ax+b=(a+1)x-c x=b+c
          if (this.sup === 1) {
            a = randint(2, 9)
            b = randint(2, 9)
            c = randint(1, 3)
            x1 = b + c
            x2 = randint(2, 10, x1)
          } else {
            a = randint(2, 9)
            b = randint(2, 9) * randint(-1, 1, 0)
            c = randint(1, 3) * randint(-1, 1, 0)
            x1 = b + c
            x2 = randint(2, 10, x1) * randint(-1, 1, 0)
          }

          texte = `Tester l'égalité $${ecritureParentheseSiNegatif(a)}x+${ecritureParentheseSiNegatif(b)}=${a + 1}x-${ecritureParentheseSiNegatif(c)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$${a}x+${ecritureParentheseSiNegatif(b)}=${ecritureParentheseSiNegatif(a)}\\times ${ecritureParentheseSiNegatif(x1)}+${ecritureParentheseSiNegatif(b)}=${a * x1 + b}$ <br> $${a + 1}x-${ecritureParentheseSiNegatif(c)}=${a + 1}\\times ${ecritureParentheseSiNegatif(x1)}-${ecritureParentheseSiNegatif(c)}=${(a + 1) * x1 - c}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          texteCorr += `Pour $x=${x2}$ : <br>`
          texteCorr += `$${a}x+${ecritureParentheseSiNegatif(b)}=${ecritureParentheseSiNegatif(a)}\\times ${ecritureParentheseSiNegatif(x2)}+${ecritureParentheseSiNegatif(b)}=${a * x2 + b}$ <br> $${a + 1}x-${ecritureParentheseSiNegatif(c)}=${a + 1}\\times ${ecritureParentheseSiNegatif(x2)}-${ecritureParentheseSiNegatif(c)}=${(a + 1) * x2 - c}$<br>`
          texteCorr += `$${a * x2 + b}\\not=${(a + 1) * x2 - c}$ donc l'égalité n'est pas vraie.`
          break
        case 5: // a-2x=b+2x x=(a-b)/4
          if (this.sup === 1) {
            x1 = randint(1, 9)
            b = randint(1, 9)
            a = b + 4 * x1
            x2 = randint(1, 11, x1)
          } else {
            x1 = randint(-9, 9)
            b = randint(-9, 9, 0)
            a = b + 4 * x1
            x2 = randint(1, 11, x1)
          }

          texte = `Tester l'égalité $${a}-2x=${b}+2x~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$${a}-2x=${a}-2\\times ${ecritureParentheseSiNegatif(x1)}=${a - 2 * x1}$ <br> $${b}+2x=${b}+2\\times ${ecritureParentheseSiNegatif(x1)}=${b + 2 * x1}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          texteCorr += `Pour $x=${x2}$ : <br>`
          texteCorr += `$${a}-2x=${a}-2\\times ${ecritureParentheseSiNegatif(x2)}=${a - 2 * x2}$ <br> $${b}+2x=${b}+2\\times ${ecritureParentheseSiNegatif(x2)}=${b + 2 * x2}$<br>`
          texteCorr += `$${a - 2 * x2}\\not=${b + 2 * x2}$ donc l'égalité n'est pas vraie.`
          break
        case 6: // ax-ab=x²-bx (a-x)(x-b)=0 solutions a et b.
          if (this.sup === 1) {
            b = randint(2, 9)
            a = randint(2, 9)
            x3 = b
            x1 = a
            x2 = randint(1, 9, [x1, x3])
          } else {
            a = randint(-9, 9, [0, 1])
            b = randint(-9, 9, [0, a])
            x1 = a
            x3 = b
            x2 = randint(-9, 9, [x1, x3])
          }
          texte = `Tester l'égalité $${a}x-${ecritureParentheseSiNegatif(a * b)}=x^2-${ecritureParentheseSiNegatif(b)}x~$ pour $~x=${x1}~$ , pour $~x=${x2}~$ puis pour $~x=${x3}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$${a}x-${ecritureParentheseSiNegatif(a * b)}=${a}\\times ${ecritureParentheseSiNegatif(x1)}-${ecritureParentheseSiNegatif(a * b)}=${a * x1 - a * b}$ <br> $x^2-${b}\\times  x=${ecritureParentheseSiNegatif(x1)}^2-${ecritureParentheseSiNegatif(b)}\\times ${ecritureParentheseSiNegatif(x1)}=${x1 * x1}-${ecritureParentheseSiNegatif(b * x1)}=${x1 * x1 - b * x1}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          texteCorr += `Pour $x=${x2}$ : <br>`
          texteCorr += `$${a}x-${ecritureParentheseSiNegatif(a * b)}=${a}\\times ${ecritureParentheseSiNegatif(x2)}-${ecritureParentheseSiNegatif(a * b)}=${a * x2 - a * b}$ <br> $x^2-${b}\\times  x=${ecritureParentheseSiNegatif(x2)}^2-${ecritureParentheseSiNegatif(b)}\\times ${ecritureParentheseSiNegatif(x2)}=${x2 * x2}-${ecritureParentheseSiNegatif(b * x2)}=${x2 * x2 - b * x2}$<br>`
          texteCorr += `$${a * x2 - a * b}\\not=${x2 * x2 - b * x2}$ donc l'égalité n'est pas vraie.<br><br>`
          texteCorr += `Pour $x=${x3}$ : <br>`
          texteCorr += `$${a}x-${ecritureParentheseSiNegatif(a * b)}=${a}\\times ${ecritureParentheseSiNegatif(x3)}-${ecritureParentheseSiNegatif(a * b)}=${a * x3 - a * b}$ <br> $x^2-${b}\\times  x=${ecritureParentheseSiNegatif(x3)}^2-${ecritureParentheseSiNegatif(b)}\\times ${ecritureParentheseSiNegatif(x3)}=${x3 * x3}-${ecritureParentheseSiNegatif(b * x3)}=${x3 * x3 - b * x3}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          break
        case 7: // adx-bd=acx²-bcx  --- (ax-b)(d-cx)=0 solutions b/a et d/c.
          if (this.sup === 1) {
            c = randint(2, 5)
            a = randint(2, 5)
            x2 = randint(2, 6)
            x3 = randint(2, 6, x2)
            x1 = randint(1, 7, [x2, x3])
            b = a * x2
            d = c * x3
          } else {
            c = randint(2, 5) * randint(-1, 1, 0)
            a = randint(2, 5) * randint(-1, 1, 0)
            x2 = randint(1, 6) * randint(-1, 1, 0)
            x3 = randint(1, 6, x2) * randint(-1, 1, 0)
            x1 = randint(1, 7, [x2, x3]) * randint(-1, 1, 0)
            b = a * x2
            d = c * x3
          }
          texte = `Tester l'égalité $${a * d}x-${ecritureParentheseSiNegatif(b * d)}=${a * c}x^2-${ecritureParentheseSiNegatif(b * c)}x~$ pour $~x=${x1}~$, pour $~x=${x2}~$ puis pour $~x=${x3}$`
          texteCorr = `Pour $x=${x1}$ : <br>`
          texteCorr += `$${a * d}x-${ecritureParentheseSiNegatif(b * d)}=${a * d}\\times ${ecritureParentheseSiNegatif(x1)}-${ecritureParentheseSiNegatif(b * d)}=${a * d * x1 - d * b}$ <br> $${a * c}x^2-${ecritureParentheseSiNegatif(b * c)}x=${a * c}\\times ${ecritureParentheseSiNegatif(x1)}^2-${ecritureParentheseSiNegatif(b * c)}\\times ${ecritureParentheseSiNegatif(x1)}=${a * c * x1 * x1}-${ecritureParentheseSiNegatif(b * c * x1)}=${a * c * x1 * x1 - b * c * x1}$<br>`
          texteCorr += `$${a * d * x1 - d * b}\\not=${a * c * x1 * x1 - b * c * x1}$ donc l'égalité n'est pas vraie.<br><br>`
          texteCorr += `Pour $x=${x2}$ : <br>`
          texteCorr += `$${a * d}x-${ecritureParentheseSiNegatif(b * d)}=${a * d}\\times ${ecritureParentheseSiNegatif(x2)}-${ecritureParentheseSiNegatif(b * d)}=${a * d * x2 - d * b}$ <br> $${a * c}x^2-${ecritureParentheseSiNegatif(b * c)}x=${a * c}\\times ${ecritureParentheseSiNegatif(x2)}^2-${ecritureParentheseSiNegatif(b * c)}\\times ${ecritureParentheseSiNegatif(x2)}=${a * c * x2 * x2}-${ecritureParentheseSiNegatif(b * c * x2)}=${a * c * x2 * x2 - b * c * x2}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          texteCorr += `Pour $x=${x3}$ : <br>`
          texteCorr += `$${a * d}x-${ecritureParentheseSiNegatif(b * d)}=${a * d}\\times ${ecritureParentheseSiNegatif(x3)}-${ecritureParentheseSiNegatif(b * d)}=${a * d * x3 - d * b}$ <br> $${a * c}x^2-${ecritureParentheseSiNegatif(b * c)}x=${a * c}\\times ${ecritureParentheseSiNegatif(x3)}^2-${ecritureParentheseSiNegatif(b * c)}\\times ${ecritureParentheseSiNegatif(x3)}=${a * c * x3 * x3}-${ecritureParentheseSiNegatif(b * c * x3)}=${a * c * x3 * x3 - b * c * x3}$<br>`
          texteCorr += 'On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l\'égalité est vraie.<br><br>'
          break
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Entiers naturels\n2 : Entiers relatifs']
  this.besoinFormulaire2CaseACocher = ['Avec des équations du second degré']
}
