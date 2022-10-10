/**
 *
 * @param {'string | array'} expression ou tableau d'expressions à évaluer avec XCas
 * @returns string
 * @author Rémi Angot
 */
export function xcas (expression) {
  const sortie = (txt) => UI.eval(`latex(${txt})`).replaceAll('\\cdot ', '~').replaceAll('\\frac', '\\dfrac').replaceAll('"', '')
  if (typeof expression === 'string') return sortie(expression)
  else {
    const result = []
    for (const txt of expression) {
      result.push(sortie(txt))
    }
    return result
  }
}
