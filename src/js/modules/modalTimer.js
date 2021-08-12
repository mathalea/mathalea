/* global $ */
import { context } from './context'
import { addFetchHtmlToParent } from './dom'
import { getDureeFromUrl, setUrl } from './gestionUrl'

export const modalTimer = async () => {
  if (document.getElementById('modalTimer') === null) {
    await addFetchHtmlToParent('templates/modalTimer.html', document.body)
  }
  $('#modalTimer').modal('show')
  document.getElementById('inputTimer').focus()
  document.getElementById('inputTimer').value = context.duree || getDureeFromUrl() || 60

  if (!context.enterHasListenner) {
    document.getElementById('modalTimer').addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        $('#modalTimer').modal('hide')
        context.duree = document.getElementById('inputTimer').value
        setUrl()
      }
    })
    context.enterHasListenner = true
  }

  document.getElementById('submitTimer').addEventListener('click', () => {
    $('#modalTimer').modal('hide')
    context.duree = document.getElementById('inputTimer').value
    setUrl()
  })
}
