import Exercice from '../Exercice.js'
import { fraction, obtenirListeFractionsIrreductibles, obtenirListeFractionsIrreductiblesFaciles } from '../../modules/fractions'
import {
  listeQuestionsToContenu, reduireAxPlusB, simplificationDeFractionAvecEtapes, reduirePolynomeDegre3, rienSi1, randint, texteCentre, combinaisonListes, ecritureAlgebrique, choice,
  ecritureParentheseSiNegatif, pgcd
} from '../../modules/outils.js'
export const titre = 'Montrer qu’un point appartient ou non à une courbe'

/**
* Répondre à des questions sur les fonctions.
* Aout 2021
* @author Gilles Mora
* 3F10-1
*/
export default function PointSurCourbe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.sup2 = 1
  this.consigne = ''
  this.correctionDetailleeDisponible = false
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
    console.log(listeTypeDeQuestions)
    let sousChoix
    if (parseInt(this.sup2) === 1) {
      sousChoix = combinaisonListes([0], this.nbQuestions) // pour choisir aléatoirement des questions dans chaque catégorie
    } else if (parseInt(this.sup2) === 2) {
      sousChoix = combinaisonListes([1], this.nbQuestions)
    } else {
      sousChoix = combinaisonListes([0, 1], this.nbQuestions)
    }
    for (let i = 0, texte, texteCorr, x, y, a, b, c, abs, f, ord, fc, f1, f2, fa, fb, fractionb, fractionb2, fractionc, enonce, correction, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on ne choisit que des nombres compris entre 1 et 20
      x = randint(-9, 9, [0, 1, -1])
      y = randint(-9, 9, [x, 0])

      switch (listeTypeDeQuestions[i]) {
        case 'affine':
          switch (sousChoix[i]) { //
            case 0:
              a = randint(-9, 9, [0, 1])
              b = randint(-9, 9, 0)
              abs = randint(-9, 9)
              ord = choice([a * abs + b, a * (abs + 1) + b])
              enonce = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$f(x)=${reduireAxPlusB(a, b)}$`)}  
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A(${abs}; ${ord})$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`
              correction = `Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
               `
              if (ord === a * abs + b) {
                correction += `$${abs}$ est bien dans l'ensemble de définition de $f$ et :<br> $f(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(b)}=${ord}=y_A$.<br>
                L'image de $${abs}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
              } else {
                correction += `$${abs}$ est bien dans l'ensemble de définition de $f$ et :<br> $f(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(b)}=${a * abs + b}\\neq${ord}$.<br>
                L'image de $${abs}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$.`
              }

              break
            case 1:
              a = randint(-9, 9, [0, 1])
              b = randint(-9, 9, 0)
              f = choice(obtenirListeFractionsIrreductibles())
              f1 = fraction(a * f.num + b * f.den, f.den)// ordonnée de A
              f2 = fraction(a * f.num + b * f.den + 1, f.den)// une autre ordonnée
              fc = choice([f1, f2])
              fractionb = fraction(b * f1.den, f1.den)
              enonce = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$f(x)=${reduireAxPlusB(a, b)}$`)}  
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${f.texFraction}; ${fc.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`
              correction = `Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
               `
              if (fc === f1) {
                correction += `$${f.texFraction}$ est bien dans l'ensemble de définition de $f$ et  : <br>
                $f\\left(${f.texFraction}\\right)=$`
                if (a === -1) {
                  correction += `$${rienSi1(a)}${f.texFraction}${ecritureAlgebrique(b)}=

                  ${rienSi1(a)}${f.texFraction}${fractionb.ecritureAlgebrique} =

                  \\dfrac{${rienSi1(a)}${f.num}${ecritureAlgebrique(b * f.den)}}{${f.den}}=
               ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.num + b * f.den, f.den)}=y_A$.<br>
               L'image de $${f.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
                } else {
                  correction += `$${a}\\times ${f.texFraction}${ecritureAlgebrique(b)}=

                  ${a}\\times${f.texFraction}${fractionb.ecritureAlgebrique} =


                  \\dfrac{${a}\\times${f.num}${ecritureAlgebrique(b * f.den)}}{${f.den}}=
               ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.num + b * f.den, f.den)}=y_A$.<br>
               L'image de $${f.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
                }
              } else {
                correction += `$${f.texFraction}$ est bien dans l'ensemble de définition de $f$ et  : <br>
              $f\\left(${f.texFraction}\\right)=$`
                if (a === -1) {
                  correction += `$${rienSi1(a)}${f.texFraction}${ecritureAlgebrique(b)}=

                ${rienSi1(a)}${f.texFraction}${fractionb.ecritureAlgebrique} =


                \\dfrac{${rienSi1(a)}${f.num}${ecritureAlgebrique(b * f.den)}}{${f.den}}=
             ${f.texFraction}${simplificationDeFractionAvecEtapes(a * f.num + b * f.den, f.den)}\\neq${f2.texFractionSimplifiee}$.<br>
             L'image de $${f.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$.`
                } else {
                  correction += `$${a}\\times ${f.texFraction}${ecritureAlgebrique(b)}=

                ${a}\\times${f.texFraction}${fractionb.ecritureAlgebrique} =


                \\dfrac{${a}\\times${f.num}${ecritureAlgebrique(b * f1.den)}}{${f1.den}}=
             ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.num + b * f.den, f.den)}\\neq${f2.texFractionSimplifiee}$.<br>
             L'image de $${f.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$.`
                }
              }
              break
          }
          break
        case 'polynôme':
          switch (sousChoix[i]) { //
            case 0:
              a = randint(-9, 9, 0)
              b = randint(-9, 9, 0)
              c = randint(-9, 9)
              abs = randint(-9, 9)
              ord = choice([a * abs ** 2 + b * abs + c, a * abs ** 2 + b * abs + c - 1])
              enonce = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$f(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}  
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A(${abs}; ${ord})$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`
              correction = `Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
               `
              if (ord === a * abs ** 2 + b * abs + c) {
                correction += `$${abs}$ est bien dans l'ensemble de définition de $f$ et :<br> `
                if (a !== 1) {
                  correction += `$f(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(c)} 
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${ecritureAlgebrique(c)}=${ord}=y_A$.<br>
                L'image de $${abs}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
                } else {
                  correction += `$f(${abs})= ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(c)} 
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${ecritureAlgebrique(c)}=${ord}=y_A$.<br>
                L'image de $${abs}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
                }
              } else {
                correction += `$${abs}$ est bien dans l'ensemble de définition de $f$ et :<br> `
                if (a !== 1) {
                  correction += ` 
                $f(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(c)} 
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${ecritureAlgebrique(c)}=${a * abs ** 2 + b * abs + c}\\neq${ord}$.<br>
                L'image de $${abs}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`
                } else {
                  correction += ` $f(${abs})= ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(c)} 
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${ecritureAlgebrique(c)}=${a * abs ** 2 + b * abs + c}\\neq${ord}$.<br>
                L'image de $${abs}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`
                }
              }
              break

            case 1:// ax^2+bx+c
              a = randint(-2, 2, 0)
              b = randint(-4, 4)
              c = randint(-4, 4, 0)
              f = choice(obtenirListeFractionsIrreductiblesFaciles())
              f1 = fraction(a * f.num ** 2 + b * f.num * f.den + c * f.den ** 2, f.den ** 2)// ordonnée de A
              f2 = fraction(a * f.num ** 2 + b * f.num * f.den + c * f.den ** 2 - 1, f.den ** 2)
              fc = choice([f1, f2])
              fractionb = fraction(b * f.num, f.den)
              fractionb2 = fraction(b * f.num * f.den, f.den ** 2)
              fractionc = fraction(c * f.den ** 2, f.den ** 2)
              enonce = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$f(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}  
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${f.texFraction}; ${fc.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`
              correction = `Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
              $${f.texFraction}$ est bien dans l'ensemble de définition de $f$ et :<br> 
              $f\\left(${f.texFraction}\\right)=$`
              if (a !== 1) {
                correction += `$${a}\\times \\left(${f.texFraction}\\right)^2$`
                if (b === 0) {
                  correction += `$${ecritureAlgebrique(c)} 
                =\\dfrac{${a}\\times ${f.num ** 2}}{${f.den ** 2}}${ecritureAlgebrique(c)}
                =\\dfrac{${a * f.num ** 2}}{${f.den ** 2}}${fractionc.ecritureAlgebrique}=\\dfrac{${a * f.num ** 2 + fractionc.num}}{${f.den ** 2}}
                ${simplificationDeFractionAvecEtapes(a * f.num ** 2 + fractionb2.num + fractionc.num, f.den ** 2)}$`
                } else {
                  correction += `$${ecritureAlgebrique(b)}\\times${f.texFraction}${ecritureAlgebrique(c)} 
                  =\\dfrac{${a}\\times ${f.num ** 2}}{${f.den ** 2}}${fractionb.ecritureAlgebrique}${ecritureAlgebrique(c)}
                  =\\dfrac{${a * f.num ** 2}}{${f.den ** 2}}${fractionb2.ecritureAlgebrique}${fractionc.ecritureAlgebrique}=\\dfrac{${a * f.num ** 2 + fractionb2.num + fractionc.num}}{${f.den ** 2}}
                ${simplificationDeFractionAvecEtapes(a * f.num ** 2 + fractionb2.num + fractionc.num, f.den ** 2)}$`
                }
                if (fc === f1) {
                  correction += `$=y_A$.<br>
                  L'image de $${f.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
                } else {
                  correction += `$\\neq${fc.texFractionSimplifiee}$.<br>
                                 L'image de $${f.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`
                }
              } else {
                correction += `$ \\left(${f.texFraction}\\right)^2$`
                if (b === 0) {
                  correction += `$${ecritureAlgebrique(c)} 
                =\\dfrac{${f.num ** 2}}{${f.den ** 2}}${ecritureAlgebrique(c)}
                =\\dfrac{${f.num ** 2}}{${f.den ** 2}}${fractionc.ecritureAlgebrique}=\\dfrac{${a * f.num ** 2 + fractionc.num}}{${f.den ** 2}}
                ${simplificationDeFractionAvecEtapes(a * f.num ** 2 + fractionb2.num + fractionc.num, f.den ** 2)}$`
                } else {
                  correction += `           
               $ ${ecritureAlgebrique(b)}\\times${f.texFraction}${ecritureAlgebrique(c)}
                =\\dfrac{ ${f.num ** 2}}{${f.den ** 2}}${fractionb.ecritureAlgebrique}${ecritureAlgebrique(c)}
                =\\dfrac{${a * f.num ** 2}}{${f.den ** 2}}${fractionb2.ecritureAlgebrique}${fractionc.ecritureAlgebrique}
                =\\dfrac{${a * f.num ** 2 + fractionb2.num + fractionc.num}}{${f.den ** 2}}
                ${simplificationDeFractionAvecEtapes(a * f.num ** 2 + fractionb2.num + fractionc.num, f.den ** 2)}$.<br>
                  `
                }
                if (fc === f1) {
                  correction += `$=y_A$.<br>
                  L'image de $${f.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
                } else {
                  correction += `$\\neq${fc.texFractionSimplifiee}$.<br>
                                 L'image de $${f.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`
                }
              }

              break
          }
          break
        case 'a/x+b':

          switch (sousChoix[i]) { // sousChoix[i] = randint(0, 5)
            case 0:
              a = randint(-9, 9, 0)
              b = randint(-9, 9, 0)
              abs = randint(-9, 9, [0, 1, -1])
              while (pgcd(a, abs) !== 1) { a = randint(-9, 9, 0) }
              f1 = fraction(a + b * abs, abs)// ordonnée de A
              f2 = fraction(a + b * abs + 1, abs)
              fa = fraction(a, abs)
              fb = fraction(b * abs, abs)
              fc = choice([f1, f2])

              enonce = `Soit $f$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${texteCentre(`$f(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}  
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${abs}; ${fc.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`
              correction = `Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
              $${abs}$ est bien dans l'ensemble de définition de $f$ et : <br> $f(${abs})=\\dfrac{${a}}{${abs}}${ecritureAlgebrique(b)}$`

              correction += `$=${fa.texFractionSimplifiee}${ecritureAlgebrique(b)}
              =${fa.texFractionSimplifiee}${fb.ecritureAlgebrique}=${f1.texFractionSimplifiee}
              $`
              if (fc === f1) {
                correction += `$=y_A$.<br>
                L'image de $${abs}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
              } else {
                correction += `$\\neq${fc.texFractionSimplifiee}$.<br>
                               L'image de $${abs}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`
              }

              break

            case 1:
              a = randint(-9, 9, 0)
              b = randint(-9, 9, 0)
              abs = choice(obtenirListeFractionsIrreductiblesFaciles())

              f1 = fraction(a * abs.den + b * abs.num, abs.num)// ordonnée de A
              f2 = fraction(a * abs.den + b * abs.num - 1, abs.num)
              fa = fraction(a * abs.den, abs.num)
              fb = fraction(b * abs.num, abs.num)
              fc = choice([f1, f2])

              enonce = `Soit $f$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${texteCentre(`$f(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}  
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${abs.texFractionSimplifiee}; ${fc.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`
              correction = `Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
              $${abs.texFractionSimplifiee}$ est bien dans l'ensemble de définition de $f$ et :<br> $f\\left(${abs.texFractionSimplifiee}\\right)
              =\\dfrac{${a}}{${abs.texFractionSimplifiee}}${ecritureAlgebrique(b)}$`

              correction += `$=${a}\\times \\dfrac{${abs.den}}{${abs.num}}${ecritureAlgebrique(b)}=
              ${fa.texFractionSimplifiee}${ecritureAlgebrique(b)}
              =${f1.texFractionSimplifiee}
              $`
              if (fc === f1) {
                correction += `$=y_A$.<br>
                L'image de $${abs.texFractionSimplifiee}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`
              } else {
                correction += `$\\neq${fc.texFractionSimplifiee}$.<br>
                               L'image de $${abs.texFractionSimplifiee}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`
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
  this.besoinFormulaire2Numerique = ['Choix des questions', 2, '1 : Abscisse du point A entière\n2 : Abscisse du point A fractionnaire\n3 : Mélange']
}
