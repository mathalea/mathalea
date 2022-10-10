/**
 * Retourne la quatrième proportionnelle de 3 nombres en fonction d'une précision demandée
 * Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
 * @author Jean-Claude Lhote
 */

export function quatriemeProportionnelle (a, b, c, precision) { // calcul de b*c/a
  let result = ''
  if ((typeof a) === 'number' && (typeof b) === 'number' && (typeof c) === 'number') {
    if (a === 0) {
      result = '=erreur : division par zéro'
      return result
    }
    const p4 = new Decimal(b).mul(c).div(a)
    result += `\\dfrac{${texNombrec(b)}\\times${texNombrec(c)}}{${texNombrec(a)}}`
    if (p4.eq(p4.toDP(precision))) result += '='
    else result += '\\approx'
    result += `${texNombre(p4, precision)}`
    return result
  } else {
    return `\\dfrac{${b} \\times${c}}{${a}}`
  }
}
