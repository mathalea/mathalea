import { context } from '../context'

export function dataTailleDiaporama (exercice) {
  if (context.vue !== 'diap') {
    return ''
  } else if (exercice.tailleDiaporama !== 1) {
    return `data-taille = "${exercice.tailleDiaporama}"`
  }
}
export function dataTaille (taille) {
  if (context.vue !== 'diap' || taille === 1) {
    return ''
  } else if (taille !== 1) {
    return `data-taille = "${taille}"`
  }
}
