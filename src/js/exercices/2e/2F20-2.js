import Exercice from '../Exercice.js'
import FractionX from '../../modules/FractionEtendue.js'
import { fraction, obtenirListeFractionsIrreductibles, obtenirListeFractionsIrreductiblesFaciles } from '../../modules/fractions.js'
import {
  listeQuestionsToContenu, reduireAxPlusB, simplificationDeFractionAvecEtapes, miseEnEvidence, sp, reduirePolynomeDegre3, rienSi1, randint, texteCentre, combinaisonListes, ecritureAlgebrique, choice,
  ecritureParentheseSiNegatif, pgcd
} from '../../modules/outils.js'
export const titre = 'Calculer des coordonnées de points appartenant à une coube connaissant l\'abscisse ou l\'ordonnée'
export const dateDePublication = '24/09/2022'
/**
* Répondre à des questions sur les fonctions.
* 24/ 09/2022
* @author Gilles Mora
* 3F10-1
*/

export const uuid = 'ec059'
export const ref = '2F20-2'
export default function CalculPointSurCourbe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.sup2 = 1
  this.consigne = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.spacing = 1
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1:
        typesDeQuestionsDisponibles = ['affine']
        break
      case 2:
        typesDeQuestionsDisponibles = ['polynôme']
        break
      case 3:
        typesDeQuestionsDisponibles = ['a/x+b']
        break
      case 4:
        typesDeQuestionsDisponibles = ['affine', 'polynôme', 'a/x+b']
        break

       //
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let sousChoix
    if (parseInt(this.sup2) === 1) {
      sousChoix = combinaisonListes([0], this.nbQuestions) // pour choisir aléatoirement des questions dans chaque catégorie
    } else if (parseInt(this.sup2) === 2) {
      sousChoix = combinaisonListes([1], this.nbQuestions)
    } else {
      sousChoix = combinaisonListes([0, 1], this.nbQuestions)
    }
    const nomF = [
      ['f'], ['g'], ['h'], ['u'],
      ['v'], ['w']
    ]
    const pointM = [
      ['M'], ['N'], ['P'], ['R'],
      ['S'], ['T']
    ]
    for (let i = 0, texte, texteCorr, nom, point, x, y, a, b, c, abs, f, ord, f1, fa, fb, fractionA, fractionB, fractionC, fractionb, fractionb2, fractionc, enonce, correction, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on ne choisit que des nombres compris entre 1 et 20
      x = randint(-9, 9, [0, 1, -1])
      y = randint(-9, 9, [x, 0])

      switch (listeTypeDeQuestions[i]) {
        case 'affine':
          switch (sousChoix[i]) { // sousChoix[i]
            case 0:
              a = randint(-12, 12, [0, 1])
              b = randint(-12, 12, 0)
              abs = randint(-12, 12, 0)
              ord = a * abs + b
              nom = choice(nomF)
              point = choice(pointM)
              if (choice([true, false])) {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}  
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
             $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. Quelle est son ordonnée ?`
                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
              $${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(b)}=${ord}$.<br>
              L'ordonnée du point $${point}$ est $${ord}$.`
              } else {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}  
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
             $${point}$ est le point de $\\mathscr{C}$ d'ordonnée $${ord}$. Quelle est son abscisse ?`
                correction = `$${nom}$ est une fonction affine (non constante), donc il existe un unique point dont l'ordonnée est $${ord}$.<br>
                Puisque le point $${point}$ appartient à $\\mathscr{C}$, son abscisse est l'antécédent de son ordonnée.<br>
              On cherche donc $x$ tel que $${nom}(x)=${ord}$, c'est-à-dire $${reduireAxPlusB(a, b)}=${ord}$.<br>`
                if (b < 0) {
                  correction += `
              $\\begin{aligned}
              ${reduireAxPlusB(a, b)}&=${ord}\\\\
              ${reduireAxPlusB(a, b)}+${miseEnEvidence(-b)}&=${ord}+${miseEnEvidence(-b)}\\\\
              ${a}x&=${ord - b}   \\\\
              x&=\\dfrac{${ord - b}}{${a}}   \\\\
              x&=${abs}               
                                          \\end{aligned}$<br>`
                } else {
                  correction += `
                                          $\\begin{aligned}
                                          ${reduireAxPlusB(a, b)}&=${ord}\\\\
                                          ${reduireAxPlusB(a, b)}-${miseEnEvidence(b)}&=${ord}-${miseEnEvidence(b)}\\\\
                                          ${a}x&=${ord - b}   \\\\
                                          x&=\\dfrac{${ord - b}}{${a}}   \\\\
                                          x&=${abs}               
                                                                      \\end{aligned}$<br>`
                }
                correction += `L'abscisse du point $${point}$ est $${abs}$.`
              }

              break
            case 1:
              a = randint(-10, 10, [0, 1])
              b = randint(-10, 10, 0)
              f = choice(obtenirListeFractionsIrreductibles())
              f1 = new FractionX(a * f.n + b * f.d, f.d)// ordonnée du point
              fractionb = new FractionX(b * f1.d, f1.d)
              fractionA = new FractionX(f.n - b * f.d, f.d)
              fractionB = new FractionX(b * f.d, f.d)
              fractionC = new FractionX(f.n - b * f.d, a * f.d)// abscisse du point
              nom = choice(nomF)
              point = choice(pointM)
              if (choice([true, false])) {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}  
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
              $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${f.texFraction}$. Quelle est son ordonnée ?
              `
                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
                $${nom}\\left(${f.texFraction}\\right)=$`
                if (a === -1 || a === 1) {
                  correction += `$${rienSi1(a)}${f.texFraction}${ecritureAlgebrique(b)}=
                  ${rienSi1(a)}${f.texFraction}${fractionb.ecritureAlgebrique} =
                  \\dfrac{${rienSi1(a)}${f.n}${ecritureAlgebrique(b * f.d)}}{${f.d}}=
               ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.n + b * f.d, f.d)}$.<br>
               L'ordonnée du point $${point}$ est $${f1.texFractionSimplifiee}$.`
                } else {
                  correction += `$${a}\\times ${f.texFraction}${ecritureAlgebrique(b)}=
                  ${a}\\times${f.texFraction}${fractionb.ecritureAlgebrique} =
                  \\dfrac{${a}\\times${f.n}${ecritureAlgebrique(b * f.d)}}{${f.d}}=
               ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.n + b * f.d, f.d)}$.<br>
               L'ordonnée du point $${point}$ est $${f1.texFractionSimplifiee}$.`
                }
              } else {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
               ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}  
               On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
               $${point}$ est le point de $\\mathscr{C}$ d'ordonnée $${f.texFraction}$. Quelle est son abscisse ?
               `

                correction = `$${nom}$ est une fonction affine (non constante), donc il existe un unique point dont l'ordonnée est $${f.texFraction}$.<br>
                 Puisque le point $${point}$ appartient à $\\mathscr{C}$, son abscisse est l'antécédent de son ordonnée.<br>
               On cherche donc $x$ tel que $${nom}(x)=${f.texFraction}$, c'est-à-dire $${reduireAxPlusB(a, b)}=${f.texFraction}$.<br>
                `
                if (b < 0) {
                  correction += `
                    $\\begin{aligned}
                    ${reduireAxPlusB(a, b)}&=${f.texFraction}\\\\
                    ${reduireAxPlusB(a, b)}+${miseEnEvidence(-b)}&=${f.texFraction}+${miseEnEvidence(-b)}\\\\
                    ${a}x&=${f.texFraction}+${fractionB.oppose().texFraction}   \\\\
                    ${a}x&=${fractionA.texFraction}\\\\
                    ${a}x\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} &=${fractionA.texFraction}\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} \\\\
                    x&=${fractionC.texFraction}${fractionC.texSimplificationAvecEtapes()}       
                                                \\end{aligned}$<br>`
                } else {
                  correction += `
                    $\\begin{aligned}
                    ${reduireAxPlusB(a, b)}&=${f.texFraction}\\\\
                    ${reduireAxPlusB(a, b)}-${miseEnEvidence(b)}&=${f.texFraction}-${miseEnEvidence(b)}\\\\
                    ${a}x&=${f.texFraction}-${fractionB.texFraction}   \\\\
                    ${a}x&=${fractionA.texFraction}\\\\
                    ${a}x\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} &=${fractionA.texFraction}\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} \\\\
                    x&=${fractionC.texFraction}${fractionC.texSimplificationAvecEtapes()}       
                                                \\end{aligned}$<br>`
                }
                correction += `L'abscisse du point $${point}$ est $${fractionC.texFractionSimplifiee}$.`
              }

              break
          }

          break
        case 'polynôme':
          switch (sousChoix[1]) { // ax^2+bx+c
            case 0:
              if (choice([true, false])) {
                a = randint(-10, 10, 0)
                b = randint(-10, 10, 0)
                c = randint(-10, 10)
                abs = randint(-9, 9)
                ord = a * abs ** 2 + b * abs + c
                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}  
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
              $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. Quelle est son ordonnée ?`

                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br> `
                if (a !== 1) {
                  correction += `$${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>
                L'ordonnée du point $${point}$ est $${ord}$.`
                } else {
                  correction += `$${nom}(${abs})= ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>
                L'ordonnée du point $${point}$ est $${ord}$.`
                }
              } else {
                a = randint(-10, 10, 0)
                b = randint(-10, 10, 0)
                c = randint(-10, 10, 0)
                abs = randint(-9, 16)
                ord = a * abs + c
                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
                ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, 0, c)}$`)}  
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord}$ ? <br>
                Si oui, quelles sont les abscisses possibles de ces points ?`

                correction = ` Si un point de $\\mathscr{C}$ a pour ordonnée $${ord}$, son abscisse est un antécédent de $${ord}$.<br> `

                correction += ` On cherche donc $x$ tel que $${nom}(x)=${ord}$, c'est-à-dire $${reduirePolynomeDegre3(0, a, 0, c)}=${ord}$.<br> 
                  On résout cette équation en isolant le carré, c'est-à-dire en l'écrivant $x^2=${abs}$. <br>`
                if (abs === 0) {
                  correction += ` Cette équation n'a qu'une seule solution : $0$.<br>
 On en déduit qu'il existe un unique point de $\\mathscr{C}$ ayant pour ordonnée $${ord}$ : son abscisse est $0$. `
                }
                if (abs < 0) {
                  correction += ` Cette équation n'a pas de solution.<br>
 On en déduit qu'il n'existe pas de point de $\\mathscr{C}$ ayant pour ordonnée $${ord}$. `
                }
                if (abs > 0) {
                  if (abs === 1 || abs === 4 || abs === 9 || abs === 16) {
                    correction += ` Cette équation a deux solutions : $-\\sqrt{${abs}}=-${Math.sqrt(abs)}$ et $\\sqrt{${abs}}=${Math.sqrt(abs)}$.<br>
                On en déduit qu'il existe deux points de $\\mathscr{C}$ ayant pour ordonnée $${ord}$.<br>
                Les  abscisses de ces points sont : $-${Math.sqrt(abs)}$ et $${Math.sqrt(abs)}$. `
                  } else {
                    correction += ` Cette équation a deux solutions : $-\\sqrt{${abs}}$ et $\\sqrt{${abs}}$.<br>
On en déduit qu'il existe deux points de $\\mathscr{C}$ ayant pour ordonnée $${ord}$.<br>
Les  abscisses de ces points sont : $-\\sqrt{${abs}}$ et $\\sqrt{${abs}}$. `
                  }
                }
              }

              break

            case 1:// ax^2+bx+c
              a = randint(-2, 2, 0)
              b = randint(-3, 3)
              c = randint(-2, 2, 0)
              f = choice(obtenirListeFractionsIrreductiblesFaciles())
              f1 = fraction(a * f.n ** 2 + b * f.n * f.d + c * f.d ** 2, f.d ** 2)// ordonnée de A
              nom = choice(nomF)
              point = choice(pointM)
              fractionb = fraction(b * f.n, f.d)
              fractionb2 = fraction(b * f.n * f.d, f.d ** 2)
              fractionc = fraction(c * f.d ** 2, f.d ** 2)
              enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}  
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
              $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${f.texFraction}$. Quelle est son ordonnée ?`
              correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>`
              if (a !== 1) {
                if (b === 0) {
                  correction += `
                    $${nom}\\left(${f.texFraction}\\right)=${a}\\times \\left(${f.texFraction}\\right)^2${ecritureAlgebrique(c)} 
                =\\dfrac{${a}\\times ${f.n ** 2}}{${f.d ** 2}}${ecritureAlgebrique(c)}
                =\\dfrac{${a * f.n ** 2}}{${f.d ** 2}}${fractionc.ecritureAlgebrique}
                ${f1.texSimplificationAvecEtapes()}$`
                } else {
                  correction += `
                    $${nom}\\left(${f.texFraction}\\right)=${a}\\times \\left(${f.texFraction}\\right)^2${ecritureAlgebrique(b)}\\times${f.texFraction}${ecritureAlgebrique(c)} 
                  =\\dfrac{${a}\\times ${f.n ** 2}}{${f.d ** 2}}${fractionb.ecritureAlgebrique}${ecritureAlgebrique(c)}
                  =\\dfrac{${a * f.n ** 2}}{${f.d ** 2}}${fractionb2.ecritureAlgebrique}${fractionc.ecritureAlgebrique}
                  ${f1.texSimplificationAvecEtapes()}$`
                }
              } else {
                if (b === 0) {
                  correction += `$${nom}\\left(${f.texFraction}\\right)=\\left(${f.texFraction}\\right)^2${ecritureAlgebrique(c)} 
                =\\dfrac{${f.n ** 2}}{${f.d ** 2}}${ecritureAlgebrique(c)}
                =\\dfrac{${f.n ** 2}}{${f.d ** 2}}${fractionc.ecritureAlgebrique}
                ${f1.texSimplificationAvecEtapes()}$`
                } else {
                  correction += `$${nom}\\left(${f.texFraction}\\right)=\\left(${f.texFraction}\\right)^2${ecritureAlgebrique(b)}\\times${f.texFraction}${ecritureAlgebrique(c)}
                =\\dfrac{ ${f.n ** 2}}{${f.d ** 2}}${fractionb.ecritureAlgebrique}${ecritureAlgebrique(c)}
                =\\dfrac{${a * f.n ** 2}}{${f.d ** 2}}${fractionb2.ecritureAlgebrique}${fractionc.ecritureAlgebrique}
                ${f1.texSimplificationAvecEtapes()}$
                `
                }
              }
              correction += `<br> L'ordonnée du point $${point}$ est $${f1.texFractionSimplifiee}$.`

              break
          }

          break

        case 'a/x+b':

          switch (sousChoix[i]) { // sousChoix[i] = randint(0, 5)
            case 0:
              if (choice([true, false])) {
                a = randint(-9, 9, 0)
                b = randint(-9, 9, 0)
                abs = randint(-9, 9, [0, 1, -1])
                nom = choice(nomF)
                point = choice(pointM)
                while (pgcd(a, abs) !== 1) { a = randint(-9, 9, 0) }
                f1 = fraction(a + b * abs, abs)// ordonnée de A
                fa = fraction(a, abs)
                fb = fraction(b * abs, abs)

                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
                ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. Quelle est son ordonnée ?`

                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
                                $${nom}(${abs})=\\dfrac{${a}}{${abs}}${ecritureAlgebrique(b)}
                =${fa.texFractionSimplifiee}${ecritureAlgebrique(b)}
                =${fa.texFractionSimplifiee}${fb.ecritureAlgebrique}=${f1.texFractionSimplifiee}$<br>
  
                L'ordonnée du point $${point}$ est $${f1.texFractionSimplifiee}$.`
              } else {
                a = randint(-10, 10, 0)
                b = randint(-9, 9, 0)
                ord = randint(-9, 9, [0, 1, -1, b])
                nom = choice(nomF)
                point = choice(pointM)
                f1 = fraction(a, ord - b)

                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
                    ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}
                    On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                    Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord}$ ? <br>
                    Si oui, quelles sont les abscisses possibles de ces points ?`

                correction = ` Si un point de $\\mathscr{C}$ a pour ordonnée $${ord}$, son abscisse est un antécédent de $${ord}$.<br> `

                correction += ` On cherche donc $x$ tel que $${nom}(x)=${ord}$, c'est-à-dire $\\dfrac{${a}}{x}${ecritureAlgebrique(b)}=${ord}$.<br> `

                correction += `Pour $x\\neq 0$, <br>
                      $\\begin{aligned}
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}&=${ord}\\\\
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-b))}&=${ord}${miseEnEvidence(ecritureAlgebrique(-b))}\\\\
                      \\dfrac{${a}}{x}&=${ord - b}\\\\
                      x\\times${ecritureParentheseSiNegatif(ord - b)} &=${a} ${sp(4)}{\\text{(Produit en croix)}}\\\\
                      x&=${f1.texFraction}${f1.texSimplificationAvecEtapes()}\\\\
                                                \\end{aligned}$<br>
                                                Un seul point de $\\mathscr{C}$ a pour ordonnée  $${ord}$. Son abcsisse est $${f1.texFractionSimplifiee}$.`
              }

              break

            case 1:
              if (choice([true, false])) {
                a = randint(-9, 9, 0)
                b = randint(-9, 9, 0)
                abs = choice(obtenirListeFractionsIrreductiblesFaciles())

                f1 = fraction(a * abs.d + b * abs.n, abs.n)// ordonnée de A
                fa = fraction(a * abs.d, abs.n)
                fb = fraction(b * abs.n, abs.n)

                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}  
             On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs.texFraction}$. Quelle est son ordonnée ?`

                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
              $${nom}\\left(${abs.texFraction}\\right)
              =\\dfrac{${a}}{${abs.texFraction}}${ecritureAlgebrique(b)}
              =${a}\\times \\dfrac{${abs.d}}{${abs.n}}${ecritureAlgebrique(b)}=
              ${fa.texFractionSimplifiee}${ecritureAlgebrique(b)}
              =${f1.texFractionSimplifiee}
              $<br>
              L'ordonnée du point $${point}$ est $${f1.texFractionSimplifiee}$.`
              } else {
                a = randint(-9, 9, 0)
                b = randint(-9, 9, 0)
                ord = choice(obtenirListeFractionsIrreductiblesFaciles())
                fa = fraction(ord.n - b * ord.d, ord.d)
                f1 = fraction(a * ord.d, ord.n - b * ord.d)
                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
                ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}  
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord.texFraction}$ ? <br>
                Si oui, quelles sont les abscisses possibles de ces points ?`

                correction = ` Si un point de $\\mathscr{C}$ a pour ordonnée $${ord.texFraction}$, son abscisse est un antécédent de $${ord.texFraction}$.<br> `

                correction += ` On cherche donc $x$ tel que $${nom}(x)=${ord.texFraction}$, c'est-à-dire $\\dfrac{${a}}{x}${ecritureAlgebrique(b)}=${ord.texFraction}$.<br> `

                correction += `Pour $x\\neq 0$, <br>
                      $\\begin{aligned}
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}&=${ord.texFraction}\\\\
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-b))}&=${ord.texFraction}${miseEnEvidence(ecritureAlgebrique(-b))}\\\\
                      \\dfrac{${a}}{x}&=${fa.texFraction}\\\\
                      x\\times${ecritureParentheseSiNegatif(ord.n - b * ord.d)} &=${a}\\times ${ord.d} ${sp(4)}{\\text{(Produit en croix)}}\\\\
                      x&=${f1.texFraction}${f1.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>
                                                Un seul point de $\\mathscr{C}$ a pour ordonnée  $${ord.texFraction}$. Son abcsisse est $${f1.texFractionSimplifiee}$.`
              }

              break
          }
          break
      }

      texte = enonce
      texteCorr = correction

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
    4,
    '1 : Fonction affine\n2 : Polynome de degré 2 \n3 : Fonction a/x+b \n4 : Mélange'
  ]
  this.besoinFormulaire2Numerique = ['Choix des questions', 3, '1 : Valeurs entières\n2 : Valeurs fractionnaire\n3 : Mélange']
}
