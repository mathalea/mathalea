import { loadMG32 } from './loaders.js'

// la liste des exos mtg
let listeExos = []
const minSize = 100
const maxSize = 2000
// nb max de figures dans le dom
const maxFigs = 100

// l'appli mg32, si elle a été chargée
let mtgApp

function setList (exos) {
  if (!Array.isArray(exos)) return console.error(Error('Il faut passer une liste d’exercices'))
  // on vérifie que les exos sont correctement définis, on laisse des trous (avec null) pour conserver les n° d'index qu'on nous a filé
  listeExos = exos.map((exo, i) => {
    try {
      if (exo.typeExercice !== 'MG32') throw Error('pas un exercice MG32')
      if (!Array.isArray(exo.dimensionsDivMg32) || exo.dimensionsDivMg32.length !== 2) throw Error('propriété dimensionsDivMg32 invalide')
      exo.dimensionsDivMg32.forEach(dim => {
        if (typeof dim !== 'number' || dim < minSize || dim > maxSize) throw Error(`dimensionsDivMg32 doit contenir deux number entre ${minSize} et ${maxSize}`)
      })
      if (typeof exo.MG32codeBase64 !== 'string' || !exo.MG32codeBase64) throw Error('propriété MG32codeBase64 invalide')
      return exo
    } catch (error) {
      error.message = `Pb avec l’exercice d’index ${i} : ${error.message}`
      console.error(error, exo)
      return null
    }
  })
  // reset mtgApp s'il avait déjà été chargé
  if (mtgApp) {
    mtgApp.docs.forEach(({ idDoc }) => mtgApp.removeDoc(idDoc))
    // check à priori inutile, mais si ça déconne parce que la syntaxe a changé autant le savoir tout de suite
    if (mtgApp.docs.length) console.error(Error('Après purge des docs mathgraph il en reste encore'), mtgApp.docs)
  }
}

// on pourrait exporter cette fct, mais pour le moment on reste très lié à l'histoire d'index dans la liste,
// on la garde donc privée ici
async function mg32Display (container, exo) {
  const { dimensionsDivMg32: [width, height], MG32codeBase64, mg32Editable, MG32codeBase64corr } = exo
  // on cherche d'abord dans la notre liste
  let indexExo = listeExos.indexOf(exo)
  if (indexExo === -1) {
    console.warn('exo pas trouvé dans notre liste', exo, listeExos)
    // on essaie de le deduire de l'id du conteneur (qui n'en a pas forcément)
    const chunks = /^MG32div([0-9]+)$/.exec(container.id)
    if (chunks) {
      indexExo = Number(chunks[1])
    } else {
      // on cherche le premier dispo pour notre svg
      indexExo = listeExos.length
      while (document.getElementById(`MG32div${indexExo}`) && indexExo < maxFigs) indexExo++
      if (indexExo === maxFigs) throw Error(`Trop de figures mathgraph dans le dom, ${maxFigs} max`)
    }
  }
  const idDoc = `MG32svg${indexExo}`
  const svgOptions = {
    width,
    height,
    idSvg: idDoc
  }
  const mtgOptions = {
    fig: MG32codeBase64,
    isEditable: Boolean(mg32Editable)
  }
  const mtgApp = await loadMG32(container, svgOptions, mtgOptions)
  const idDocCorr = MG32codeBase64corr ? `MG32svgcorr${indexExo}` : ''
  if (idDocCorr) {
    container = document.getElementById(`MG32divcorr${indexExo}`)
    if (container) {
      svgOptions.idSvg = idDocCorr
      mtgOptions.fig = MG32codeBase64corr
      mtgOptions.isEditable = false
      await loadMG32(container, svgOptions, mtgOptions)
    } else {
      console.error(Error(`Pas trouvé d’élément #MG32divcorr${indexExo} dans le dom, abandon de l'affichage de la correction`))
    }
  }

  // et si y'a un modifier on l'exécute
  /* avant c'était une string a exécuter en global, avec mtgApp mis au préalable dans window.mtg32App

  let code_pour_modifier_la_figure = listeObjetsExercice[numero_figure].MG32code_pour_modifier_la_figure
  if (window.mtg32App.docs.length === 1) {
    code_pour_modifier_la_figure = code_pour_modifier_la_figure.replace('display', 'updateDisplay')
  }
  // eslint-disable-next-line no-new-func
  const modification = new Function('numero_figure', code_pour_modifier_la_figure)
  modification(numero_figure)
  */
  if (typeof exo.mg32init === 'function') exo.mg32init(mtgApp, idDoc, idDocCorr)
  return mtgApp
}

/**
 * Affiche toutes les figures
 */
export async function mg32DisplayAll (exos) {
  // on passe ça à setList, ça sert de contrôle d'intégrité, mais c'est pas vraiment nécessaire,
  // on pourrait directement appeler mg32Display avec le n° d'index
  setList(exos)
  return Promise.all(listeExos.map((exo, i) => {
    const elt = document.getElementById(`MG32div${i}`)
    return elt ? mg32Display(elt, exo) : null
  }))
}
