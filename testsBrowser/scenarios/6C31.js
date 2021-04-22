const prefs = require('prefs')

/**
 * Teste l'exo 6C31
 * @param {Page} page
 * @return {Promise<boolean>}
 */
async function test (page) {
  await page.goto(`${prefs.baseUrl}exercice.html?ex=6C31`)
  /*
  - si form_sup0 existe
    - si input form_sup0 est de type number, tester toutes les valeur jusqu'à max
    - si input form_sup0 est de type checkbox, tester true et false
      - si form_sup20 existe
        - si input form_sup20 est de type number, tester toutes les valeur jusqu'à max
        - si input form_sup20 est de type checkbox, tester true et false
        - si form_sup30 existe
          - si input form_sup30 est de type number, tester toutes les valeur jusqu'à max
          - si input form_sup30 est de type checkbox, tester true et false
  */
  // c'est un https://playwright.dev/docs/api/class-elementhandle
  const formSup0 = await page.$('#form_sup0')
  // si on est là c'est qu'il existe (sinon ça plante avec un timeout), on cherche un input dedans
  const input = await formSup0.$('input')
  const inputType = await input.getAttribute('type')
  const expectedTypes = ['checkbox', 'text']
  if (!expectedTypes.includes(inputType)) throw Error(`input de #form_sup0 n’est pas du type attendu ${inputType} n’est pas dans [${expectedTypes.join(', ')}]`)
  // tester true et false, ça veut dire quoi ?
  // pour cocher le checkbox ce serait (cf https://playwright.dev/docs/api/class-elementhandle#elementhandlecheckoptions)
  await input.check()
  // ensuite ?
  return true
}

module.exports = test
