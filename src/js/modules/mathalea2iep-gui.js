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
import Alea2iep from './Alea2iep.js'
import Sval from 'sval'
import globals from './globals.js'
import '../../css/style_mathalea.css'
import { telechargeFichier } from './outils'

// Les variables globales utiles pour l'autocomplétion
// Charge en mémoire les fonctions utiles de 2d.js et de outils.js
globals()
window.anim = new Alea2iep()

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
  console.log('script détecté')
  myCodeMirror.setValue(decodeURIComponent(url.searchParams.get('script')))
  console.log(decodeURIComponent(url.searchParams.get('script')))
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
  // On réinitialise les variables
  window.anim = new Alea2iep()
  window.mathalea = { sortieNB: false, anglePerspective: 30, coeffPerspective: 0.5, pixelsParCm: 20, scale: 1, unitesLutinParCm: 50, mainlevee: false, amplitude: 1, fenetreMathalea2d: [-1, -10, 29, 10], objets2D: [] }
  window.sortie_html = true
  window.est_diaporama = false
  window.numId = 0

  const interpreter = new Sval({ ecmaVer: 10, sandBox: true }) // On créé une instance de l'interpréteur JS
  // On importe toutes les commandes que l'on souhaite avoir dans l'interpréteur
  // Ainsi que les variables globales anim et mathalea
  interpreter.import({
    anim: window.anim,
    mathalea: window.mathalea,
    angleScratchTo2d: window.angleScratchTo2d,
    appartientSegment: window.appartientSegment,
    appartientDroite: window.appartientDroite,
    appartientDemiDroite: window.appartientDemiDroite,
    scratchblock: window.scratchblock,
    motifs: window.motifs,
    // pattern: window.pattern,
    nomVecteurParPosition: window.nomVecteurParPosition,
    point: window.point,
    tracePoint: window.tracePoint,
    tracePointSurDroite: window.tracePointSurDroite,
    milieu: window.milieu,
    pointSurSegment: window.pointSurSegment,
    pointSurCercle: window.pointSurCercle,
    pointSurDroite: window.pointSurDroite,
    pointIntersectionDD: window.pointIntersectionDD,
    pointAdistance: window.pointAdistance,
    labelPoint: window.labelPoint,
    barycentre: window.barycentre,
    droite: window.droite,
    droiteParPointEtVecteur: window.droiteParPointEtVecteur,
    droiteParPointEtParallele: window.droiteParPointEtParallele,
    droiteParPointEtPerpendiculaire: window.droiteParPointEtPerpendiculaire,
    droiteHorizontaleParPoint: window.droiteHorizontaleParPoint,
    droiteVerticaleParPoint: window.droiteVerticaleParPoint,
    droiteParPointEtPente: window.droiteParPointEtPente,
    mediatrice: window.mediatrice,
    codageMediatrice: window.codageMediatrice,
    codageMilieu: window.codageMilieu,
    constructionMediatrice: window.constructionMediatrice,
    bissectrice: window.bissectrice,
    codageBissectrice: window.codageBissectrice,
    constructionBissectrice: window.constructionBissectrice,
    polyline: window.polyline,
    pave: window.pave,
    vecteur: window.vecteur,
    segment: window.segment,
    segmentAvecExtremites: window.segmentAvecExtremites,
    demiDroite: window.demiDroite,
    demiDroiteAvecExtremite: window.demiDroiteAvecExtremite,
    polygone: window.polygone,
    polygoneAvecNom: window.polygoneAvecNom,
    polygoneRegulier: window.polygoneRegulier,
    polygoneRegulierIndirect: window.polygoneRegulierIndirect,
    carre: window.carre,
    carreIndirect: window.carreIndirect,
    codageCarre: window.codageCarre,
    polygoneRegulierParCentreEtRayon: window.polygoneRegulierParCentreEtRayon,
    triangle2points2longueurs: window.triangle2points2longueurs,
    triangle2points2angles: window.triangle2points2angles,
    triangle2points1angle1longueur: window.triangle2points1angle1longueur,
    triangle2points1angle1longueurOppose: window.triangle2points1angle1longueurOppose,
    nommePolygone: window.nommePolygone,
    deplaceLabel: window.deplaceLabel,
    aireTriangle: window.aireTriangle,
    cercle: window.cercle,
    ellipse: window.ellipse,
    pointIntersectionLC: window.pointIntersectionLC,
    pointIntersectionCC: window.pointIntersectionCC,
    cercleCentrePoint: window.cercleCentrePoint,
    arc: window.arc,
    arcPointPointAngle: window.arcPointPointAngle,
    traceCompas: window.traceCompas,
    courbeDeBezier: window.courbeDeBezier,
    segmentMainLevee: window.segmentMainLevee,
    cercleMainLevee: window.cercleMainLevee,
    droiteMainLevee: window.droiteMainLevee,
    polygoneMainLevee: window.polygoneMainLevee,
    arcMainLevee: window.arcMainLevee,
    dansLaCibleCarree: window.dansLaCibleCarree,
    dansLaCibleRonde: window.dansLaCibleRonde,
    cibleCarree: window.cibleCarree,
    cibleRonde: window.cibleRonde,
    cibleCouronne: window.cibleCouronne,
    translation: window.translation,
    translation2Points: window.translation2Points,
    rotation: window.rotation,
    sens_de_rotation: window.sens_de_rotation,
    homothetie: window.homothetie,
    symetrieAxiale: window.symetrieAxiale,
    distancePointDroite: window.distancePointDroite,
    projectionOrtho: window.projectionOrtho,
    affiniteOrtho: window.affiniteOrtho,
    similitude: window.similitude,
    translationAnimee: window.translationAnimee,
    rotationAnimee: window.rotationAnimee,
    homothetieAnimee: window.homothetieAnimee,
    symetrieAnimee: window.symetrieAnimee,
    affiniteOrthoAnimee: window.affiniteOrthoAnimee,
    montrerParDiv: window.montrerParDiv,
    cacherParDiv: window.cacherParDiv,
    afficherTempo: window.afficherTempo,
    afficherTempoId: window.afficherTempoId,
    afficherUnParUn: window.afficherUnParUn,
    medianeTriangle: window.medianeTriangle,
    centreGraviteTriangle: window.centreGraviteTriangle,
    hauteurTriangle: window.hauteurTriangle,
    CodageHauteurTriangle: window.CodageHauteurTriangle,
    codageHauteurTriangle: window.codageHauteurTriangle,
    codageMedianeTriangle: window.codageMedianeTriangle,
    orthoCentre: window.orthoCentre,
    centreCercleCirconscrit: window.centreCercleCirconscrit,
    codageAngleDroit: window.codageAngleDroit,
    afficheLongueurSegment: window.afficheLongueurSegment,
    texteSurSegment: window.texteSurSegment,
    afficheMesureAngle: window.afficheMesureAngle,
    afficheCoteSegment: window.afficheCoteSegment,
    codeSegment: window.codeSegment,
    codeSegments: window.codeSegments,
    codeAngle: window.codeAngle,
    nomAngleSaillantParPosition: window.nomAngleSaillantParPosition,
    nomAngleRentrantParPosition: window.nomAngleRentrantParPosition,
    droiteGraduee: window.droiteGraduee,
    droiteGraduee2: window.droiteGraduee2,
    axes: window.axes,
    labelX: window.labelX,
    labelY: window.labelY,
    grille: window.grille,
    grilleHorizontale: window.grilleHorizontale,
    grilleVerticale: window.grilleVerticale,
    seyes: window.seyes,
    repere: window.repere,
    repere2: window.repere2,
    pointDansRepere: window.pointDansRepere,
    traceGraphiqueCartesien: window.traceGraphiqueCartesien,
    traceBarre: window.traceBarre,
    traceBarreHorizontale: window.traceBarreHorizontale,
    lectureImage: window.lectureImage,
    lectureAntecedent: window.lectureAntecedent,
    courbe: window.courbe,
    courbe2: window.courbe2,
    courbeInterpolee: window.courbeInterpolee,
    graphiqueInterpole: window.graphiqueInterpole,
    imageInterpolee: window.imageInterpolee,
    antecedentInterpole: window.antecedentInterpole,
    crochetD: window.crochetD,
    crochetG: window.crochetG,
    intervalle: window.intervalle,
    texteParPoint: window.texteParPoint,
    texteParPosition: window.texteParPosition,
    latexParPoint: window.latexParPoint,
    latexParCoordonnees: window.latexParCoordonnees,
    fractionParPosition: window.fractionParPosition,
    print2d: window.print2d,
    longueur: window.longueur,
    norme: window.norme,
    angle: window.angle,
    angleOriente: window.angleOriente,
    angleradian: window.angleradian,
    creerLutin: window.creerLutin,
    avance: window.avance,
    baisseCrayon: window.baisseCrayon,
    leveCrayon: window.leveCrayon,
    orienter: window.orienter,
    tournerG: window.tournerG,
    tournerD: window.tournerD,
    allerA: window.allerA,
    mettrexA: window.mettrexA,
    mettreyA: window.mettreyA,
    ajouterAx: window.ajouterAx,
    ajouterAy: window.ajouterAy,
    afficherCrayon: window.afficherCrayon,
    // deplaceInstrument: window.deplaceInstrument,
    codeSvg: window.codeSvg,
    codeTikz: window.codeTikz,
    mathalea2d: window.mathalea2d,
    labyrinthe: window.labyrinthe,
    pavage: window.pavage
  })

  if (buttonTelecharger) {
    buttonTelecharger.style.visibility = 'visible'
  }
  if (buttonURL) {
    buttonURL.style.visibility = 'visible'
  }
  window.mathalea.objets2D = []
  interpreter.run(myCodeMirror.getValue())
  // On exporte l'animation et le code SVG
  interpreter.run('exports.anim = anim')
  interpreter.run('exports.codeSvgFigure = codeSvg(mathalea.fenetreMathalea2d, mathalea.pixelsParCm, mathalea.mainlevee, mathalea.objets2D)')
  xml = window.anim.script()
  const codeSvgFigure = interpreter.exports.codeSvgFigure
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
