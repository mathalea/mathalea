// fonction globale pour notifier des erreurs potentielles dans le code.
import Bugsnag from '@bugsnag/js'
window.notify = function notify (error, metadatas) {
  if (typeof error === 'string') error = Error(error)
  if (window.Bugsnag) {
    if (metadatas) Bugsnag.addMetadata('ajouts', metadatas)
    Bugsnag.notify(error)
  } else {
    if (error.indexOf('Trop de chiffres') !== -1) {
      alert(error + '\n' + 'avec les metadatas' + metadatas)
    } else {
      console.error('message qui aurait été envoyé à bugsnag s\'il avait été configuré', error)
      if (metadatas) console.log('avec les metadatas', metadatas)
    }
  }
}
