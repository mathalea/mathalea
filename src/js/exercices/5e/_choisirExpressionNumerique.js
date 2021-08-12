import { randint, arrondi, calcul, texNombrec, texNombre, nombreAvecEspace } from '../../modules/outils.js'

/**
 * Chosis aléatoirement une expressions numérique parmi de nombreuses variantes.
 * @param {number} nbOperations fixe la complexité de l'expression à retourner
 * @param {number} decimal 1 si on veut des entiers, 10, 100, 1000 selon le nombre de chiffres après la virgule qu'on veut
 * retourne
 * * l'expression en français commençant par une majuscule sans point final
 * * l'expression en mode maths LaTex
 * * Le détaillé du calcul en mode maths LaTex
 * @author Jean-Claude Lhote
 * Fonction utilisée dans plusieurs exercices.
 */
export default function choisirExpressionNumerique (nbOperations, decimal, timesOn = true) {
  let expf; let expn; let expc; const arrondir = Math.log10(decimal)
  let a = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
  let b = arrondi(randint(2 * decimal, 10 * decimal, [a * decimal]) / decimal, arrondir)
  let c = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
  const d = arrondi(randint(2 * decimal, 10 * decimal, [c * decimal]) / decimal, arrondir)
  const e = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
  let souscas
  let signex = ''
  if (timesOn) { signex = ' \\times' }
  switch (nbOperations) {
    case 1: // expressions de base (1 opération)
      souscas = randint(0, 3)
      switch (souscas) {
        case 0: // somme de deux nombres
          expf = `La somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)}`
          expn = `$${texNombre(a)}+${texNombre(b)}$`
          expc = `$${texNombre(a)}+${texNombre(b)} = ${texNombre(a + b)}$`
          break
        case 1: // différence de deux nombres
          if (a < b) { a = a + b }
          expf = `La différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)}`
          expn = `$${texNombre(a)}-${texNombre(b)}$`
          expc = `$${texNombre(a)}-${texNombre(b)} = ${texNombre(a - b)}$`
          break
        case 2: // produit de deux nombres
          expf = `Le produit de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)}`
          expn = `$${texNombre(a)} \\times ${texNombre(b)}$`
          expc = `$${texNombre(a)} \\times ${texNombre(b)} = ${texNombrec(a * b)}$`
          break
        case 3: // quotient de deux nombres
          a = calcul(Math.round(a) * b)
          expf = `Le quotient de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)}`
          expn = `$${texNombre(a)} \\div ${texNombre(b)}$`
          expc = `$${texNombre(a)} \\div ${texNombre(b)} = ${texNombrec(a / b)}$`
          break
      }
      break
    case 2: // expressions de niveau 1 (2 opérations)
      souscas = randint(0, 9)
      switch (souscas) {
        case 0: // a(b+c)
          expf = `Le produit de ${nombreAvecEspace(a)} par la somme de ${nombreAvecEspace(b)} et ${nombreAvecEspace(c)}`
          expn = `$${texNombre(a)}${signex}(${texNombre(b)}+${texNombre(c)})$`
          expc = `$${texNombre(a)}${signex}(${texNombre(b)}+${texNombre(c)}) = ${texNombre(a)} \\times ${texNombrec(b + c)}=${texNombrec(a * (b + c))}$`
          break
        case 1: // a(b-c)
          if (b <= c) { b = calcul(b + c) } // b-c positif
          expf = `Le produit de ${nombreAvecEspace(a)} par la différence de ${nombreAvecEspace(b)} et ${nombreAvecEspace(c)}`
          expn = `$${texNombre(a)}${signex}(${texNombre(b)}-${texNombre(c)})$`
          expc = `$${texNombre(a)}${signex}(${texNombre(b)}-${texNombre(c)}) = ${texNombre(a)} \\times ${texNombrec(b - c)}=${texNombrec(a * (b - c))}$`
          break
        case 2: // a/(b+c)
          a = calcul(a * (b + c)) // on s'assure que le quotient tombe juste...
          expf = `Le quotient de ${nombreAvecEspace(a)} par la somme de ${nombreAvecEspace(b)} et ${nombreAvecEspace(c)}`
          expn = `$${texNombre(a)} \\div (${texNombre(b)}+${texNombre(c)})$ ou $\\dfrac{${texNombre(a)}}{${texNombre(b)}+${texNombre(c)}}$`
          expc = `$${texNombre(a)} \\div (${texNombre(b)}+${texNombre(c)}) = ${texNombre(a)} \\div ${texNombrec(b + c)}=${texNombrec(a / (b + c))}$`
          break
        case 3: // a/(b-c)
          if (b <= c) { b = calcul(b + c) } // b-c positif
          a = calcul(a * (b - c)) // on s'assure que le quotient tombe juste
          expf = `Le quotient de ${nombreAvecEspace(a)} par la différence de ${nombreAvecEspace(b)} et ${nombreAvecEspace(c)}`
          expn = `$${texNombre(a)} \\div (${b}-${texNombre(c)})$ ou $\\dfrac{${texNombre(a)}}{${texNombre(b)}-${texNombre(c)}}$`
          expc = `$${texNombre(a)} \\div (${b}-${texNombre(c)}) = ${texNombre(a)} \\div ${texNombrec(b - c)}=${texNombrec(a / (b - c))}$`
          break
        case 4: // (a+b)/c
          a = calcul(a * c)
          b = calcul(b * c) // on s'assure que le quotient tombe juste
          expf = `Le quotient de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par ${nombreAvecEspace(c)}`
          expn = `$(${texNombre(a)}+${texNombre(b)}) \\div ${texNombre(c)}$ ou $\\dfrac{${texNombre(a)}+${texNombre(b)}}{${texNombre(c)}}$`
          expc = `$(${texNombre(a)}+${texNombre(b)}) \\div ${texNombre(c)} = ${texNombrec(a + b)} \\div ${texNombre(c)}=${texNombrec((a + b) / c)}$`
          break
        case 5: // (a-b)/c
          if (a <= b) { a = calcul(a + b) } // a-b positif
          a = calcul(a * c)
          b = calcul(b * c) // on s'assure que le quotient tombe juste
          expf = `Le quotient de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par ${nombreAvecEspace(c)}`
          expn = `$(${texNombre(a)}-${texNombre(b)}) \\div ${texNombre(c)}$ ou $\\dfrac{${texNombre(a)}-${texNombre(b)}}{${texNombre(c)}}$`
          expc = `$(${texNombre(a)}-${texNombre(b)}) \\div ${texNombre(c)} = ${texNombrec(a - b)} \\div ${texNombre(c)}=${texNombrec((a - b) / c)}$`
          break
        case 6: // a + bc
          expf = `La somme de ${nombreAvecEspace(a)} et du produit de ${nombreAvecEspace(b)} et $${nombreAvecEspace(c)}$`
          expn = `$${texNombre(a)}+${texNombre(b)} \\times ${texNombre(c)}$`
          expc = `$${texNombre(a)}+${texNombre(b)} \\times ${texNombre(c)}=${texNombre(a)}+${texNombre(b * c)} = ${texNombre(a + (b * c))}$`
          break
        case 7: // a - bc
          a = calcul(a + b * c)
          expf = `La différence entre ${nombreAvecEspace(a)} et le produit de ${nombreAvecEspace(b)} et $${texNombre(c)}$`
          expn = `$${texNombre(a)}-${texNombre(b)} \\times ${texNombre(c)}$`
          expc = `$${texNombre(a)}-${texNombre(b)} \\times ${c}=${texNombre(a)}-${texNombre(b * c)} = ${texNombre(a - (b * c))}$`
          break
        case 8: // a + b/c
          b = calcul(b * c)
          expf = `La somme de ${nombreAvecEspace(a)} et du quotient de ${nombreAvecEspace(b)} par $${texNombre(c)}$`
          expn = `$${texNombre(a)}+${texNombre(b)} \\div ${texNombre(c)}$ ou $${texNombre(a)}+\\dfrac{${texNombre(b)}}{${texNombre(c)}}$`
          expc = `$${texNombre(a)}+${texNombre(b)} \\div ${c}=${texNombre(a)}+${texNombre(b / c)} = ${texNombre(a + (b / c))}$`
          break
        case 9: // a - b/c
          a = calcul(a + b)
          b = calcul(b * c)
          expf = `La différence entre ${nombreAvecEspace(a)} et le quotient de ${nombreAvecEspace(b)} par $${texNombre(c)}$`
          expn = `$${texNombre(a)}-${texNombre(b)} \\div ${texNombre(c)}$ ou $${texNombre(a)}-\\dfrac{${texNombre(b)}}{${texNombre(c)}}$`
          expc = `$${texNombre(a)}-${texNombre(b)} \\div ${texNombre(c)}=${texNombre(a)}-${texNombre(b / c)} = ${texNombre(a - (b / c))}$`
          break
      }
      break
    case 3: // expressions de niveau 2 (3 opérations)
      souscas = randint(0, 13)
      switch (souscas) {
        case 0: // (a+b)(c+d)
          expf = `Le produit de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}+${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)})$`
          expc = `$(${texNombre(a)}+${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)}) = ${texNombrec(a + b)} \\times ${texNombrec(c + d)} = ${texNombrec((a + b) * (c + d))}$`
          break
        case 1: // (a+b)(c-d)
          if (c <= d) { c = calcul(c + d) }
          expf = `Le produit de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la différence de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}+${texNombre(b)})${signex}(${texNombre(c)}-${texNombre(d)})$`
          expc = `$(${texNombre(a)}+${texNombre(b)})${signex}(${texNombre(c)}-${texNombre(d)}) = ${texNombrec(a + b)} \\times ${texNombrec(c - d)} = ${texNombrec((a + b) * (c - d))}$`
          break
        case 2: // (a-b)(c+d)
          if (a <= b) { a = calcul(a + b) }
          expf = `Le produit de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)})$`
          expc = `$(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)}) = ${texNombrec(a - b)} \\times ${texNombrec(c + d)} = ${texNombrec((a - b) * (c + d))}$`
          break
        case 3: // (a-b)(c-d)
          if (a <= b) { a = calcul(a + b) }
          if (c <= d) { c = calcul(c + d) }
          expf = `Le produit de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la différence de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}-${texNombre(d)})$`
          expc = `$(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}-${texNombre(d)}) = ${texNombrec(a - b)} \\times ${texNombrec(c - d)} = ${texNombrec((a - b) * (c - d))}$`
          break
        case 4: // (a+b)/(c+d)
          a = calcul(a * (c + d))
          b = calcul(b * (c + d))
          expf = `Le quotient de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}+${texNombre(b)}) \\div (${texNombre(c)}+${texNombre(d)})$ ou $\\dfrac{${texNombre(a)}+${texNombre(b)}}{${texNombre(c)}+${texNombre(d)}}$`
          expc = `$(${texNombre(a)}+${texNombre(b)}) \\div (${texNombre(c)}+${texNombre(d)}) = ${texNombrec(a + b)} \\div ${texNombrec(c + d)} = ${texNombrec((a + b) / (c + d))}$`
          break
        case 5: // (a-b)/(c+d)
          a = calcul(a * (c + d))
          b = calcul(b * (c + d))
          if (a <= b) { a = calcul(a + b) }
          expf = `Le quotient de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}-${texNombre(b)}) \\div (${texNombre(c)}+${texNombre(d)})$ ou $\\dfrac{${texNombre(a)}-${texNombre(b)}}{${texNombre(c)}+${texNombre(d)}}$`
          expc = `$(${texNombre(a)}-${texNombre(b)}) \\div (${texNombre(c)}+${texNombre(d)}) = ${texNombrec(a - b)} \\div ${texNombrec(c + d)} = ${texNombrec((a - b) / (c + d))}$`
          break
        case 6: // (a+b)/(c-d)
          if (c <= d) { c = calcul(c + d) }
          a = calcul(a * (c - d))
          b = calcul(b * (c - d))
          expf = `Le quotient de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la différence de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}+${texNombre(b)}) \\div (${texNombre(c)}-${texNombre(d)})$ ou $\\dfrac{${texNombre(a)}+${texNombre(b)}}{${texNombre(c)}-${texNombre(d)}}$`
          expc = `$(${texNombre(a)}+${texNombre(b)}) \\div (${texNombre(c)}-${texNombre(d)}) = ${texNombrec(a + b)} \\div ${texNombrec(c - d)} = ${texNombrec((a + b) / (c - d))}$`
          break
        case 7: // (a-b)/(c-d)
          if (c <= d) { c = calcul(c + d) }
          if (a <= b) { a = calcul(a + b) }
          a = calcul(a * (c - d))
          b = calcul(b * (c - d))
          expf = `Le quotient de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la différence de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$(${texNombre(a)}-${texNombre(b)}) \\div (${texNombre(c)}-${texNombre(d)})$ ou $\\dfrac{${texNombre(a)}-${texNombre(b)}}{${texNombre(c)}-${texNombre(d)}}$`
          expc = `$(${texNombre(a)}-${texNombre(b)}) \\div (${texNombre(c)}-${texNombre(d)}) = ${texNombrec(a - b)} \\div ${texNombrec(c - d)} = ${texNombrec((a - b) / (c - d))}$`
          break
        case 8: // ab+cd
          expf = `La somme du produit de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du produit de ${nombreAvecEspace(c)} par ${nombreAvecEspace(d)}`
          expn = `$${texNombre(a)} \\times ${texNombre(b)}+${texNombre(c)} \\times ${texNombre(d)}$`
          expc = `$${texNombre(a)} \\times ${texNombre(b)}+${texNombre(c)} \\times ${texNombre(d)} = ${texNombrec(a * b)}+${texNombrec(c * d)} = ${texNombrec(a * b + c * d)}$`
          break
        case 9: // ab-cd
          if (a * b < d * c) { a = calcul(a + c) }
          if (a * b < d * c) { b = calcul(b + d) }
          expf = `La différence du produit de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du produit de ${nombreAvecEspace(c)} par ${nombreAvecEspace(d)}`
          expn = `$${texNombre(a)} \\times ${texNombre(b)}-${texNombre(c)} \\times ${texNombre(d)}$`
          expc = `$${texNombre(a)} \\times ${texNombre(b)}-${texNombre(c)} \\times ${texNombre(d)} = ${texNombrec(a * b)}-${texNombrec(c * d)} = ${texNombrec(a * b - c * d)}$`
          break
        case 10: // ab+c/d
          c = calcul(c * d)
          expf = `La somme du produit de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du quotient de ${nombreAvecEspace(c)} par ${nombreAvecEspace(d)}`
          expn = `$${texNombre(a)} \\times ${texNombre(b)}+${texNombre(c)} \\div ${texNombre(d)}$ ou $${texNombre(a)} \\times ${texNombre(b)}+\\dfrac{${texNombre(c)}}{${texNombre(d)}}$`
          expc = `$${texNombre(a)} \\times ${texNombre(b)}+${texNombre(c)} \\div ${texNombre(d)} = ${texNombrec(a * b)}+${texNombrec(c / d)} = ${texNombrec(a * b + c / d)}$`
          break
        case 11: // ab-c/d
          c = c * d
          if (a * b < c / d) { a = calcul(a * c) }
          if (a * b < c / d) { b = calcul(b * c) }
          expf = `La différence du produit de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du quotient de ${nombreAvecEspace(c)} par ${nombreAvecEspace(d)}`
          expn = `$${texNombre(a)} \\times ${texNombre(b)}-${texNombre(c)} \\div ${texNombre(d)}$ ou $${texNombre(a)} \\times ${texNombre(b)}-\\dfrac{${texNombre(c)}}{${texNombre(d)}}$`
          expc = `$${texNombre(a)} \\times ${texNombre(b)}-${texNombre(c)} \\div ${texNombre(d)} = ${texNombrec(a * b)}-${texNombrec(c / d)} = ${texNombrec(a * b - c / d)}$`
          break
        case 12: // a/b+c/d
          a = calcul(a * b)
          c = calcul(c * d)
          expf = `La somme du quotient de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du quotient de ${nombreAvecEspace(c)} par ${nombreAvecEspace(d)}`
          expn = `$${texNombre(a)} \\div ${texNombre(b)}+${texNombre(c)} \\div ${texNombre(d)}$ ou $\\dfrac{${texNombre(a)}}{${texNombre(b)}}+\\dfrac{${texNombre(c)}}{${texNombre(d)}}$`
          expc = `$${texNombre(a)} \\div ${texNombre(b)}+${texNombre(c)} \\div ${texNombre(d)} = ${texNombrec(a / b)}+${texNombrec(c / d)} = ${texNombrec(a / b + c / d)}$`
          break
        case 13: // a/b-c/d
          a = calcul(a * b)
          c = calcul(c * d)
          if (a / b < c / d) { a = calcul(a * c) }
          if (a / c < c / d) { a = calcul(a * d) }
          expf = `La différence du quotient de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du quotient de ${nombreAvecEspace(c)} par ${nombreAvecEspace(d)}`
          expn = `$${texNombre(a)} \\div ${texNombre(b)}-${texNombre(c)} \\div ${texNombre(d)}$ ou $\\dfrac{${texNombre(a)}}{${texNombre(b)}}-\\dfrac{${texNombre(c)}}{${texNombre(d)}}$`
          expc = `$${texNombre(a)} \\div ${texNombre(b)}-${texNombre(c)} \\div ${texNombre(d)} = ${texNombrec(a / b)}-${texNombrec(c / d)} = ${texNombrec(a / b - c / d)}$`
          break
      }
      break
    case 5: // expressions complexes
      souscas = randint(0, 5)
      switch (souscas) {
        case 0: // 2(a+bc)
          expf = `Le double de la somme de ${nombreAvecEspace(a)} et du produit de ${nombreAvecEspace(b)} par ${nombreAvecEspace(c)}`
          expn = `$2${signex}(${texNombre(a)}+${texNombre(b)} \\times ${texNombre(c)})$`
          expc = `$2${signex}(${texNombre(a)}+${texNombre(b)} \\times ${texNombre(c)}) = 2${signex}(${texNombre(a)}+${texNombrec(b * c)}) = 2 \\times  ${texNombrec(a + b * c)}$`
          break
        case 1: // 3(a+b)/c
          a = calcul(a * c)
          b = calcul(b * c)
          expf = `Le triple du quotient de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par ${nombreAvecEspace(c)}`
          expn = `$3${signex}(${texNombre(a)}+${texNombre(b)}) \\div ${texNombre(c)}$ ou $3 \\times \\dfrac{${texNombre(a)}+${texNombre(b)}}{${texNombre(c)}}$`
          expc = `$3${signex}(${texNombre(a)}+${texNombre(b)}) \\div ${texNombre(c)} = 3 \\times  ${texNombre(a + b)} \\div ${texNombre(c)} = ${texNombrec(3 * (a + b))} \\div ${texNombre(c)} = ${texNombrec(3 * (a + b) / c)}$`
          break
        case 2: // (a-b)/3
          if (a <= b) { a = calcul(a + b) }
          a = calcul(3 * a)
          b = calcul(3 * b)
          expf = `Le tiers de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)}`
          expn = `$(${texNombre(a)}-${texNombre(b)}) \\div  3$ ou $\\dfrac{${texNombre(a)}-${texNombre(b)}}{3}$`
          expc = `$(${texNombre(a)}-${texNombre(b)}) \\div  3 = ${texNombrec(a - b)} \\div  3 = ${texNombrec((a - b) / 3)}$`
          break
        case 3: // (a-b)/3*2(c+d)
          if (a <= b) { a = calcul(a + b) }
          a = calcul(3 * a)
          b = calcul(3 * b)
          expf = `Le produit du tiers de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par le double de la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$\\left((${texNombre(a)}-${texNombre(b)}) \\div  3\\right) \\times  2${signex}(${texNombre(c)}+${texNombre(d)})$`
          expc = `$\\left((${texNombre(a)}-${texNombre(b)}) \\div  3\\right) \\times  2${signex}(${texNombre(c)}+${texNombre(d)}) = ${texNombrec(a - b)} \\div  3  \\times  2  \\times ${texNombrec(c + d)} = ${texNombrec((a - b) / 3)}  \\times  2  \\times  ${texNombrec(c + d)} =  ${texNombrec(2 * (a - b) / 3)}  \\times  ${texNombrec(c + d)} = ${texNombrec(2 * (c + d) * (a - b) / 3)}$`
          break
        case 4: // 3(a+b)-2(c+d)
          if (3 * (a + b) < 2 * (c + d)) { a = calcul(a + c + d) }
          expf = `La différence du triple de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} et du double de la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$3${signex}(${texNombre(a)}+${texNombre(b)})-2${signex}(${texNombre(c)}+${texNombre(d)})$`
          expc = `$3${signex}(${texNombre(a)}+${texNombre(b)})-2${signex}(${texNombre(c)}+${texNombre(d)}) = 3  \\times  ${texNombrec(a + b)} - 2  \\times  ${texNombrec(c + d)} = ${texNombrec(3 * (a + b))} - ${texNombrec(2 * (c + d))} = ${texNombrec(3 * (a + b) - 2 * (c + d))}$`
          break
        case 5: // 2(a-b)+3(c+d)
          if (a <= b) { a = calcul(a + b) }
          expf = `La somme du double de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} et du triple de la somme de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)}`
          expn = `$2${signex}(${texNombre(a)}-${texNombre(b)})+3${signex}(${texNombre(c)}+${texNombre(d)})$`
          expc = `$2${signex}(${texNombre(a)}-${texNombre(b)})+3${signex}(${texNombre(c)}+${texNombre(d)}) = 2  \\times  ${texNombrec(a - b)} + 3  \\times  ${texNombrec(c + d)} = ${texNombrec(2 * (a - b))} + ${texNombrec(3 * (c + d))} = ${texNombrec(2 * (a - b) + 3 * (c + d))}$`
          break
      }
      break
    case 4: // 4 opérations
      souscas = randint(1, 3)
      switch (souscas) {
        case 1: // (a+b)/(c(d+e))
          a = calcul(a * c * (d + e))
          b = calcul(b * c * (d + e))
          expf = `Le quotient de la somme de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par le produit de ${nombreAvecEspace(c)} par la somme de ${nombreAvecEspace(d)} et ${nombreAvecEspace(e)}`
          expn = `$(${texNombre(a)}+${texNombre(b)}) \\div (${texNombre(c)}${signex}(${texNombre(d)}+${texNombre(e)}))$ ou $\\dfrac{${texNombre(a)}+${texNombre(b)}}{${texNombre(c)}${signex}(${texNombre(d)}+${texNombre(e)})}$`
          expc = `$(${texNombre(a)}+${texNombre(b)}) \\div (${texNombre(c)}${signex}(${texNombre(d)}+${texNombre(e)})) = ${texNombrec(a + b)}  \\div  (${texNombre(c)}  \\times  ${texNombrec(d + e)}) = ${texNombrec(a + b)}  \\div  ${texNombre(c * (d + e))} = ${texNombrec((a + b) / (c * (d + e)))}$`
          break
        case 2: // (a-b)*(c+de)
          if (a <= b) { a = calcul(a + b) }
          expf = `Le produit de la différence de ${nombreAvecEspace(a)} et ${nombreAvecEspace(b)} par la somme de ${nombreAvecEspace(c)} et du produit de ${nombreAvecEspace(d)} par ${nombreAvecEspace(e)}`
          expn = `$(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)} \\times ${texNombre(e)})$`
          expc = `$(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)} \\times ${texNombre(e)}) = ${texNombrec(a - b)}${signex}(${texNombre(c)}+${texNombrec(d * e)}) = ${texNombrec(a - b)}  \\times  ${texNombre(c + d * e)} = ${texNombrec((a - b) * (c + d * e))}$`
          break
        case 3: // ab+cd/e
          c = calcul(c * e)
          expf = `La somme du produit de ${nombreAvecEspace(a)} par ${nombreAvecEspace(b)} et du quotient du produit de ${nombreAvecEspace(c)} et ${nombreAvecEspace(d)} par ${nombreAvecEspace(e)}`
          expn = `$${texNombre(a)} \\times ${texNombre(b)}+${texNombre(c)} \\times ${texNombre(d)} \\div ${texNombre(e)}$ ou $${texNombre(a)} \\times ${texNombre(b)}+\\dfrac{${texNombre(c)} \\times ${texNombre(d)}}{${texNombre(e)}}$`
          expc = `$${texNombre(a)} \\times ${texNombre(b)}+${texNombre(c)} \\times ${texNombre(d)} \\div ${texNombre(e)} = ${texNombrec(a * b)} + ${texNombrec(c * d)}  \\div  ${texNombre(e)} = ${texNombrec(a * b)} + ${texNombrec(c * d / e)} = ${texNombrec(a * b + c * d / e)}$`
          break
      }
      break
  }
  return [expf, expn, expc, souscas]
}
