// cf https://docs.bugsnag.com/platforms/javascript/
import Bugsnag from '@bugsnag/js'

// ces constantes seront mise par webpack lorsqu'il va générer _private/bugsnag.js
const apiKey = ''
const appVersion = ''
const releaseStage = ''

/**
 * Appelé avant d'envoyer le rapport, pour filtrer
 * @param event
 * @return {boolean}
 */
function onError (event) {
  // cf https://docs.bugsnag.com/platforms/browsers/js/customizing-error-reports/
  if (/^file:\/\//.test(event.request.url)) return false
  // on étudie la 1re erreur de cet event
  const { errorClass, /* errorMessage, */ stacktrace } = event.errors[0]
  // on ignore tous les plantages qui concernent une extension firefox
  if (stacktrace.some(stackFrame => /^moz-extension:\/\//.test(stackFrame.file))) return false
  // ou un pb réseau
  if (stacktrace.some(stackFrame => /NS_ERROR_FAILURE/.test(stackFrame.errorClass))) return false

  if (/ChunkLoadError/.test(errorClass)) {
    alert('Il y a un problème de chargement de l’application, vous devriez essayer de vider le cache de votre navigateur pour le resoudre (ctrl+maj+suppr en général, puis cocher « fichier en cache »).')
    return false
  }
}

// cf https://docs.bugsnag.com/platforms/javascript/configuration-options/
Bugsnag.start({
  apiKey,
  onError,
  appVersion,
  releaseStage
  // on pourrait virer l'ip avant envoi à bugsnag, mais faudrait ajouter un fingerprint pour différencier les clients
  // (sinon bugsnag ne voit qu'un seul user, cf https://docs.bugsnag.com/platforms/javascript/customizing-error-reports/#preventing-ip-address-collection)
  // collectUserIp: false
})

// et on l'exporte en global au cas où du code voudrait s'en servir, avec par ex
// if (window.Bugsnag) {
//   Bugsnag.addMetadata('foo', unObjetDeContexte) // => ça crée un onglet foo dans le rapport bugsnag avec l'objet passé en argument
//   window.Bugsnag.notify(Error('y’a eu tel pb'))
// }
window.Bugsnag = Bugsnag
