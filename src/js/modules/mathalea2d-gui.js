/* globals mathalea cmResize $ */
/* eslint-disable camelcase */

import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/stex/stex.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/edit/closebrackets.js'

import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'
import '../../css/style_mathalea.css'
import initialiseEditeur from './initialiseEditeur.js'
import { telechargeFichier } from './outils.js'
import { context } from './context.js'

// Les variables globales utiles pour l'autocomplétion
initialiseEditeur()

// Liste utilisée quand il n'y a qu'une seule construction sur la page web
window.notify = function (error, metadatas) { // On écrit la fonction window.notify ici pour éviter les signalements bugsnag... on ne charge plus firstload pour cet éditeur
  console.log(error instanceof Error ? error.message : error, ' avec les métadatas : ', metadatas)
}
mathalea.lutin = window.creerLutin()

window.numId = 0 // Créer un identifiant numérique unique par objet SVG
window.addEventListener('load', function () {
  $('.ui.dropdown').dropdown() // Pour les menus
  const divEditeur = document.getElementById('editeur')
  const divSvg = document.getElementById('svg')
  const divSortieSvg = document.getElementById('sortieSvg')
  const divSortieTikz = document.getElementById('sortieTikz')
  const buttonSubmit = document.getElementById('submit')
  let buttonTelecharger
  let buttonURL

  if (document.getElementById('telecharger')) {
    buttonTelecharger = document.getElementById('telecharger')
    buttonTelecharger.onclick = function () {
      telechargeFichier(myCodeMirrorSvg.getValue(), 'mathalea2d.svg')
    }
  }
  if (document.getElementById('url')) {
    buttonURL = document.getElementById('url')
    buttonURL.onclick = function () {
      const script = encodeURIComponent(myCodeMirror.getValue())
      window.open(`/mathalea2dsvg.html?script=${script}`)
    }
  }

  const myCodeMirror = CodeMirror(divEditeur, {
    value: '',
    mode: 'javascript',
    lineNumbers: true,
    autofocus: true,
    theme: 'monokai',
    autoCloseBrackets: true,
    showHint: true,
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    matchBrackets: true,
    lineWrapping: true
  })
  cmResize(myCodeMirror) // Pour ajouter une poignet qui permet à l'utilisateur de changer la taille de l'éditeur

  const myCodeMirrorSvg = CodeMirror(divSortieSvg, {
    value: '',
    mode: 'htmlmixed',
    readOnly: true,
    lineNumbers: true
  })
  const myCodeMirrorTikz = CodeMirror(divSortieTikz, {
    value: '',
    mode: 'stex',
    readOnly: true,
    lineNumbers: true
  })

  const url = new URL(window.location.href)
  if (url.searchParams.get('url')) { // Si on spécifie une url
    window.fetch(`/assets/m2d/${url.searchParams.get('url')}.m2d`)
      .then(function (response) {
        if (response.ok) {
          return response.text()
        } else {
          return `//Fichier /assets/m2d/${url.searchParams.get('url')}.m2d non trouvé`
        }
      })
      .then((text) => myCodeMirror.setValue(text))
      .then(() => buttonSubmit.click())
  } else if (url.searchParams.get('script')) { // Si un script est présent dans l'URL
    myCodeMirror.setValue(decodeURIComponent(url.searchParams.get('script')))
  } else { // Récupère le dernier script validé
    if (window.localStorage.getItem('Script Mathalea 2D')) {
      myCodeMirror.setValue(window.localStorage.getItem('Script Mathalea 2D'))
    }
  }

  // Autocomplétion
  myCodeMirror.on('inputRead', function onChange (editor, input) {
    if (input.text[0] === ';' || input.text[0] === ' ') {
      return
    }
    CodeMirror.commands.autocomplete(editor, null, { completeSingle: false })
  })
  if (buttonSubmit) {
    buttonSubmit.onclick = function () {
      // To Fix
      // AfficherTempo() créé trop d'interval
      // On cherche l'id le plus grand en pensant que les id sont des int données par ordre croissant
      const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER)
      // On efface tous les intervalles
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i)
      }
      window.numId = 0
      window.localStorage.setItem('Script Mathalea 2D', myCodeMirror.getValue()) // On sauvegarde dans le navigateur le code du script
      if (buttonTelecharger) {
        buttonTelecharger.style.visibility = 'visible'
      }
      if (buttonURL) {
        buttonURL.style.visibility = 'visible'
      }
      executeCode(myCodeMirror.getValue())
      const mesObjetsCopie = context.objets2D.slice() // codeSVG va ajouter des objets supplémentaires donc on en garde une copie
      const codeSvgcomplet = window.codeSvg(context.fenetreMathalea2d, context.pixelsParCm, context.mainlevee, context.objets2D)
      divSvg.innerHTML = codeSvgcomplet
      const exercicesAffiches = new window.Event('exercicesAffiches', { bubbles: true })
      document.dispatchEvent(exercicesAffiches)
      dragNReplace()
      myCodeMirrorSvg.setValue(codeSvgcomplet)
      context.objets2D = mesObjetsCopie.slice() // on réinitialise mesObjets à l'état où il était avant que codeSvg n'ajoute des objets
      myCodeMirrorTikz.setValue(window.codeTikz(context.fenetreMathalea2d, context.scale, context.mainlevee, context.objets2D))

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

      function dragNReplace () {
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
        const fenetrexmin = context.fenetreMathalea2d[0]
        const fenetreymin = context.fenetreMathalea2d[1]
        const fenetrexmax = context.fenetreMathalea2d[2]
        const fenetreymax = context.fenetreMathalea2d[3]
        const viewBox = {
          x: fenetrexmin * context.pixelsParCm,
          y: fenetreymin * context.pixelsParCm,
          width: (fenetrexmax - fenetrexmin) * context.pixelsParCm,
          height: (fenetreymax - fenetreymin) * context.pixelsParCm
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
          myCodeMirrorSvg.setValue(divSvg.innerHTML)
          const xmin = window.calcul(newViewBox.x / context.pixelsParCm, 1)
          const xmax = window.calcul(xmin + viewBox.width / context.pixelsParCm, 1)
          const ymax = window.calcul(newViewBox.y / context.pixelsParCm * (-1), 1)
          const ymin = window.calcul(ymax - viewBox.height / context.pixelsParCm, 1)
          if (myCodeMirror.getValue().indexOf('fenetreMathalea2d') > -1) {
            myCodeMirror.setValue(myCodeMirror.getValue().replace(/fenetreMathalea2d.*/, `fenetreMathalea2d = [${xmin},${ymin},${xmax},${ymax}]`))
          } else {
            myCodeMirror.setValue(`fenetreMathalea2d = [${xmin},${ymin},${xmax},${ymax}]\n` + myCodeMirror.getValue())
          }
          myCodeMirrorTikz.setValue(myCodeMirrorTikz.getValue().replace(/\\clip.*/, `\\clip (${xmin},${ymin}) rectangle (${xmax},${ymax});`))

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
    }
  }

  buttonSubmit.click() // Simule un appui sur le bouton valider au chargement de la page
})

function executeCode (txt) {
  // Les variables globales utiles pour l'autocomplétion
  // Charge en mémoire les fonctions utiles de 2d.js et de outils.js
  const interpreter = initialiseEditeur()
  let code = txt
  code += '\n exports.fenetreMathalea2d = fenetreMathalea2d'
  code += '\n exports.pixelsParCm = pixelsParCm'
  interpreter.run(code)
  context.fenetreMathalea2d = interpreter.exports.fenetreMathalea2d
  context.pixelsParCm = interpreter.exports.pixelsParCm
}
