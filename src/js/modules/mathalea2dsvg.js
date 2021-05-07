import { codeSvg } from '../../modules/2d.js'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'

let divSvg = ''
let script = ''
const url = new URL(window.location.href)
window.addEventListener('load', function () {
  divSvg = document.getElementById('svg')
  if (url.searchParams.get('url')) { // Si on spécifie une url
    fetch(`/m2d/${url.searchParams.get('url')}.m2d`)
      .then(function (response) {
        if (response.ok) {
          return response.text()
        } else {
          return `//Fichier /m2d/${url.searchParams.get('url')}.m2d non trouvé`
        }
      })
      .then((text) => afficheSVG(text))
  } else if (url.searchParams.get('script')) { // Si un script est présent dans l'URL
    script = decodeURIComponent(url.searchParams.get('script'))
    afficheSVG(script)
  }
})

function executeCode (txt) {
  return eval(txt)
}

function editScript (txt) {
  window.open(window.location.href.replace('mathalea2dsvg.html', 'mathalea2d.html'))
}

function afficheSVG (text) {
  executeCode(
    `mathalea.objets2D = [] ; mathalea.lutin = creerLutin() ; ${text}`
  )
  divSvg.innerHTML = codeSvg(mathalea.fenetreMathalea2d, mathalea.pixelsParCm, mathalea.mainlevee, mathalea.objets2D)

  renderMathInElement(document.body, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: true,
    errorColor: '#CC0000',
    strict: 'warn',
    trust: false
  })

  /*
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%% DRAG & DEPLACE %%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

      @SOURCE https://css-tricks.com/creating-a-panning-effect-for-svg/

      */

  // We select the SVG into the page
  const svg = document.querySelector('svg')

  // If browser supports pointer events
  if (window.PointerEvent) {
    svg.addEventListener('pointerdown', onPointerDown) // Pointer is pressed
    svg.addEventListener('pointerup', onPointerUp) // Releasing the pointer
    svg.addEventListener('pointerleave', onPointerUp) // Pointer gets out of the SVG area
    svg.addEventListener('pointermove', onPointerMove) // Pointer is moving
  } else {
    // Add all mouse events listeners fallback
    svg.addEventListener('mousedown', onPointerDown) // Pressing the mouse
    svg.addEventListener('mouseup', onPointerUp) // Releasing the mouse
    svg.addEventListener('mouseleave', onPointerUp) // Mouse gets out of the SVG area
    svg.addEventListener('mousemove', onPointerMove) // Mouse is moving

    // Add all touch events listeners fallback
    svg.addEventListener('touchstart', onPointerDown) // Finger is touching the screen
    svg.addEventListener('touchend', onPointerUp) // Finger is no longer touching the screen
    svg.addEventListener('touchmove', onPointerMove) // Finger is moving
  }

  // This function returns an object with X & Y values from the pointer event
  function getPointFromEvent (event) {
    const point = { x: 0, y: 0 }
    // If even is triggered by a touch event, we get the position of the first finger
    if (event.targetTouches) {
      point.x = event.targetTouches[0].clientX
      point.y = event.targetTouches[0].clientY
    } else {
      point.x = event.clientX
      point.y = event.clientY
    }

    return point
  }

  // This letiable will be used later for move events to check if pointer is down or not
  let isPointerDown = false

  // This letiable will contain the original coordinates when the user start pressing the mouse or touching the screen
  const pointerOrigin = {
    x: 0,
    y: 0
  }

  // Function called by the event listeners when user start pressing/touching
  function onPointerDown (event) {
    isPointerDown = true // We set the pointer as down

    // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
    const pointerPosition = getPointFromEvent(event)
    pointerOrigin.x = pointerPosition.x
    pointerOrigin.y = pointerPosition.y
  }

  // We save the original values from the viewBox
  const fenetrexmin = mathalea.fenetreMathalea2d[0]
  const fenetreymin = mathalea.fenetreMathalea2d[3] * -(1)
  const fenetrexmax = mathalea.fenetreMathalea2d[2]
  const fenetreymax = mathalea.fenetreMathalea2d[1] * (-1)
  const viewBox = {
    x: fenetrexmin * mathalea.pixelsParCm,
    y: fenetreymin * mathalea.pixelsParCm,
    width: (fenetrexmax - fenetrexmin) * mathalea.pixelsParCm,
    height: (fenetreymax - fenetreymin) * mathalea.pixelsParCm
  }

  // The distances calculated from the pointer will be stored here
  const newViewBox = {
    x: 0,
    y: 0
  }

  // Calculate the ratio based on the viewBox width and the SVG width
  let ratio = viewBox.width / svg.getBoundingClientRect().width
  window.addEventListener('resize', function () {
    ratio = viewBox.width / svg.getBoundingClientRect().width
  })

  // Function called by the event listeners when user start moving/dragging
  function onPointerMove (event) {
    // Only run this function if the pointer is down
    if (!isPointerDown) {
      return
    }
    // This prevent user to do a selection on the page
    event.preventDefault()

    // Get the pointer position
    const pointerPosition = getPointFromEvent(event)

    // We calculate the distance between the pointer origin and the current position
    // The viewBox x & y values must be calculated from the original values and the distances
    newViewBox.x = viewBox.x - (pointerPosition.x - pointerOrigin.x) * ratio
    newViewBox.y = viewBox.y - (pointerPosition.y - pointerOrigin.y) * ratio

    // We create a string with the new viewBox values
    // The X & Y values are equal to the current viewBox minus the calculated distances
    const viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`
    // We apply the new viewBox values onto the SVG
    svg.setAttribute('viewBox', viewBoxString)

    // document.querySelector('.viewbox').innerHTML = viewBoxString;
  }

  function onPointerUp () {
    // The pointer is no longer considered as down
    isPointerDown = false

    // We save the viewBox coordinates based on the last pointer offsets
    viewBox.x = newViewBox.x
    viewBox.y = newViewBox.y
  }
}
