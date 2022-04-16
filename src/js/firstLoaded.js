// fonction globale pour notifier des erreurs potentielles dans le code.
import Bugsnag from '@bugsnag/js'
window.notify = function notify (error, metadatas) {
  if (typeof error === 'string') error = Error(error)
  if (window.Bugsnag) {
    if (metadatas) Bugsnag.addMetadata('ajouts', metadatas)
    Bugsnag.notify(error)
  } else {
    if (error.toString().indexOf('Trop de chiffres') !== -1) {
      alert(error + '\nIl y a un risque d\'erreur d\'approximation (la limite est de 15 chiffres significatifs)\nnb : ' + metadatas.nb + '\nprecision (= nombre de décimales demandé) : ' + metadatas.precision)
    } else {
      console.error('message qui aurait été envoyé à bugsnag s\'il avait été configuré', error)
      if (metadatas) console.log('avec les metadatas', metadatas)
    }
  }
}
