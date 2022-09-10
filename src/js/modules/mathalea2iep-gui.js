/* globals $ cmResize */
import iepLoadPromise from 'instrumenpoche'
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
import initialiseEditeur from './initialiseEditeur.js'
import '../../css/style_mathalea.css'
import { telechargeFichier } from './outils.js'
import { context } from './context.js'

// Pour le menu du haut
document.addEventListener('DOMContentLoaded', (event) => {
  $('.ui.dropdown').dropdown()
})

const buttonSubmit = document.getElementById('submit')
const buttonTelecharger = document.getElementById('telecharger')
const buttonURL = document.getElementById('url')

const container = document.getElementById('containerIep')
let xml = `
<?xml version="1.0" encoding="UTF-8"?>
<INSTRUMENPOCHE version="2">
</INSTRUMENPOCHE>
`

// Editeur de texte
const editeur = document.getElementById('editeur')
const myCodeMirror = CodeMirror(editeur, {
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
myCodeMirror.setSize(500, 550)
cmResize(myCodeMirror) // Pour ajouter une poignet qui permet à l'utilisateur de changer la taille de l'éditeur
document.getElementById('xmlSrc').style.width = '500px'
document.getElementById('xmlSrc').style.height = '500px'

const url = new URL(window.location.href)
if (url.searchParams.get('url')) { // Si on spécifie une url
  fetch(`/assets/iep/${url.searchParams.get('url')}.iep`)
    .then(function (response) {
      if (response.ok) {
        return response.text()
      } else {
        return `//Fichier /fichiers/iep/${url.searchParams.get('url')}.iep non trouvé`
      }
    })
    .then((text) => {
      myCodeMirror.setValue(text)
      scriptJsToAnimEtSvg()
    })
} else if (url.searchParams.get('script')) { // Si un script est présent dans l'URL
  myCodeMirror.setValue(decodeURIComponent(url.searchParams.get('script')))
  scriptJsToAnimEtSvg()
} else { // Récupère le dernier script validé
  if (window.localStorage.getItem('Script Mathalea 2D IEP')) {
    myCodeMirror.setValue(window.localStorage.getItem('Script Mathalea 2D IEP'))
    buttonSubmit.click()
  }
}
// Autocomplétion
myCodeMirror.on('inputRead', function onChange (editor, input) {
  if (input.text[0] === ';' || input.text[0] === ' ') {
    return
  }
  CodeMirror.commands.autocomplete(editor, null, { completeSingle: false })
})

buttonSubmit.addEventListener('click', scriptJsToAnimEtSvg)
// Bouton Valider
function scriptJsToAnimEtSvg () {
  // On sauvegarde dans le navigateur le code du script
  window.localStorage.setItem('Script Mathalea 2D IEP', myCodeMirror.getValue())
  // On affiche les boutons
  if (buttonTelecharger) {
    buttonTelecharger.style.visibility = 'visible'
  }
  if (buttonURL) {
    buttonURL.style.visibility = 'visible'
  }

  if (buttonTelecharger) {
    buttonTelecharger.style.visibility = 'visible'
  }
  if (buttonURL) {
    buttonURL.style.visibility = 'visible'
  }
  // Les variables globales utiles pour l'autocomplétion
  // Charge en mémoire les fonctions utiles de 2d.js et de outils.js
  const interpreter = initialiseEditeur()
  interpreter.run(myCodeMirror.getValue())
  // On exporte l'animation et le code SVG
  interpreter.run('exports.anim = anim')
  const codeSvgFigure = window.codeSvg(context.fenetreMathalea2d, context.pixelsParCm, context.mainlevee, context.objets2D)
  xml = window.anim.script()
  document.getElementById('svg').innerHTML = codeSvgFigure
  document.getElementById('xmlSrc').value = xml
  iepLoadPromise(container, xml, { autostart: true }).then(iepApp => {
    // la figure est chargée
    document.querySelectorAll('svg.svgIep').forEach(svg => {
      // const iepDoc = svg.iepDoc
      // Décaler de 1 cm à droite
      // iepDoc.setViewBox({ x: 30, y: 0, width: 800, height: 600 })
    })
  }).catch(error => {
    // il y a eu un pb
    console.log(error)
  })
  if (document.getElementById('telecharger')) {
    buttonTelecharger.onclick = function () {
      telechargeFichier(myCodeMirror.getValue(), 'mathalea2d.iep')
      // download(myCodeMirror.getValue(), "mathalea2d.iep", "text/plain; charset=utf-8");
    }
  }
  if (document.getElementById('url')) {
    buttonURL.onclick = function () {
      const script = encodeURIComponent(myCodeMirror.getValue())
      window.open(`/iep.html?script=${script}`)
    }
  }
}

// Gestion du champ de texte du script XML

function display (event) {
  try {
    event.preventDefault()
    event.stopPropagation()
    const divXmlIep = document.getElementById('xmlSrc')
    // iepLoad('display', divXmlIep.value)
    iepLoadPromise(container, divXmlIep.value, { autostart: true }).then(iepApp => {
      // la figure est chargée
      document.querySelectorAll('svg.svgIep').forEach(svg => {
      // const iepDoc = svg.iepDoc
      // Décaler de 1 cm à droite
      // iepDoc.setViewBox({ x: 30, y: 0, width: 800, height: 600 })
      })
    }).catch(error => {
      // il y a eu un pb
      console.log(error)
    })
  } catch (error) {
    console.log("Plantage à l'affichage, xml probablement malformé")
    console.error(error)
  }
}

function dropHandler (event) {
  event.stopPropagation()
  event.preventDefault()
  try {
    const files = event.dataTransfer.files // FileList object.
    if (files && files[0]) {
      const file = files[0]
      console.log('On récupère le fichier ', file.name)
      if (file.name.substr(-4) === '.xml') {
        const reader = new FileReader()
        reader.onload = function (event) {
          document.getElementById('xmlSrc').value = event.target.result
          display(event)
        }
        reader.readAsText(file)
      } else {
        console.log('On ne gère que les fichiers xml')
      }
    }
  } catch (error) {
    console.log('Plantage à la récupération du fichier')
    console.log(error)
  }
}

function dragOverHandler (event) {
  event.stopPropagation()
  event.preventDefault()
  // faut préciser ça explicitement
  event.dataTransfer.dropEffect = 'copy'
}

// et on ajoute les listener
const previewBtn = document.getElementById('previewBtn')
previewBtn.addEventListener('click', display, false)
const textarea = document.getElementById('xmlSrc')
textarea.addEventListener('dragover', dragOverHandler, false)
textarea.addEventListener('drop', dropHandler, false)
