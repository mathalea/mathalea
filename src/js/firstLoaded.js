// fonction globale pour notifier des erreurs potentielles dans le code.
import Bugsnag from '@bugsnag/js'
import { tropDeChiffres } from './modules/outils'
// @todo regarder pourquoi window.Bugsnag n'est pas défini et donc les signalements sont balancés dans la console alors qu'on est en ligne !
window.notify = function notify (error, metadatas) {
  if (typeof error === 'string') {
    if (error.includes(tropDeChiffres) && !window.Bugsnag) {
      console.error(error + '\nIl y a un risque d\'erreur d\'approximation (la limite est de 15 chiffres significatifs)\nnb : ' + metadatas.nb + '\nprecision (= nombre de décimales demandé) : ' + metadatas.precision)
    }
    error = Error(error)
  }
  if (window.Bugsnag) {
    if (metadatas) Bugsnag.addMetadata('ajouts', metadatas)
    Bugsnag.notify(error)
  } else {
    console.error('message qui aurait été envoyé à bugsnag s\'il avait été configuré', error)
    if (metadatas) console.log('avec les metadatas', metadatas)
  }
}
