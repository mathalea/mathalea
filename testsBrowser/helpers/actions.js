/**
 * Clique sur le bouton OK de la première boite de dialogue ouverte
 * @param page
 * @return {Promise<void>}
 */
async function clickFirstDialogOk (page) {
  const selector = '.ui-button-text:visible:text("OK")'
  const elts = await page.$$(selector)
  if (!elts.length) await page.waitForSelector(selector)
  await page.click(selector)
}

/**
 * Clique sur le bouton OK
 * @param page
 * @return {Promise<void>}
 */
async function clickOk (page) {
  await page.click('#Mepboutonvalider')
}

/**
 * Clique sur le bouton suite
 * @param {Page} page
 * @return {Promise<void>}
 */
async function clickSuite (page) {
  await page.click('#Mepboutoncontinuer')
}

module.exports = {
  clickFirstDialogOk,
  clickOk,
  clickSuite
}
