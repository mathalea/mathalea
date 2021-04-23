const prefs = require('prefs')

/**
 * Teste l'exo 6C31
 * @param {Page} page
 * @return {Promise<boolean>}
 */
async function test (page) {
  await page.goto(`${prefs.baseUrl}exercice.html?ex=6C31`)
  // // Conserve toutes les erreurs
  // page.on('console', msg => {
  //   if (msg.type() === 'error') { console.log(`Error text: "${msg.text()}"`) }
  // })
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
  await page.click('text=Paramètres')
  // c'est un https://playwright.dev/docs/api/class-elementhandle
  const formSup0 = await page.$('#form_sup0')
  // si on est là c'est qu'il existe (sinon ça plante avec un timeout), on cherche un input dedans
  const type = await page.getAttribute('input#form_sup0', 'type')
  if (type === 'number') {
    const max = await page.getAttribute('input#form_sup0', 'max')
    const min = await page.getAttribute('input#form_sup0', 'min')
    for (let i = min; i <= max; i++) {
      await page.fill('#form_sup0', i.toString())
      await page.click('text=Nouvelles données')
      await page.click('text=Nouvelles données')
      await page.click('text=Nouvelles données')
      await page.click('text=Nouvelles données')
      await page.click('text=Nouvelles données')
    }
  }
  return true
}

module.exports = test
