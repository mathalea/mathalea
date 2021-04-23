const prefs = require('prefs')

/**
 * Teste l'exo 6C31
 * @param {Page} page
 * @return {Promise<boolean>}
 */
async function test (page) {
  await page.goto(`${prefs.baseUrl}exercice.html?ex=4C32-1`)
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
  if (await page.$('#form_sup0') && await page.$('#form_sup20')) {
    const type = await page.getAttribute('input#form_sup0', 'type')
    const type2 = await page.getAttribute('input#form_sup20', 'type')
    if (type === 'number' && type2 === 'number') {
      const min = await page.getAttribute('input#form_sup0', 'min')
      const max = await page.getAttribute('input#form_sup0', 'max')
      const min2 = await page.getAttribute('input#form_sup20', 'min')
      const max2 = await page.getAttribute('input#form_sup20', 'max')
      for (let i = min; i <= max; i++) {
        await page.fill('#form_sup0', i.toString())
        for (let j = min2; j <= max2; j++) {
          await page.fill('#form_sup20', j.toString())
          await page.click('text=Nouvelles données')
          await page.click('text=Nouvelles données')
          await page.click('text=Nouvelles données')
          await page.click('text=Nouvelles données')
          await page.click('text=Nouvelles données')
        }
      }
    }
  } else if (await page.$('#form_sup0')) {
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
  }
  return true
}

module.exports = test
