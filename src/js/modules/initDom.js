/* global $ */
import { context, setOutputAmc, setOutputHtml, setOutputLatex, setOutputMoodle, setOutputAlc } from './context.js'
import { addElement, create, get, addFetchHtmlToParent, fetchHtmlToElement, setStyles } from './dom.js'
import { getDureeFromUrl, getLogFromUrl, getZoomFromUrl, getVueFromUrl, getUrlVars, goTabVue, replaceQueryParam } from './gestionUrl.js'
import { initialiseBoutonsConnexion, modalLog } from './modalLog.js'
import { modalTimer } from './modalTimer.js'
import { zoomAffichage } from './zoom.js'

const boutonMAJ = () => {
  const btn = create('button', { class: 'btn mini ui labeled icon button', id: 'btn_mise_a_jour_code' })
  btn.innerHTML = '<i class="redo icon"></i>Nouvelles données'
  return btn
}

const boutonVerifQuestion = (id) => {
  const btn = create('button', { class: 'btn ui icon button', id, style: 'display: block; marginTop:10px; marginBottom:10px' })
  btn.innerHTML = 'Valider'
  return btn
}
const affichageUniquementExercice = (i) => {
  const listeDivExercices = document.querySelectorAll('[id ^= "exercice"].titreExercice')
  const listeDivExercicesCorr = document.querySelectorAll('[id ^= "divexcorr"].titreExercice')
  for (const element of listeDivExercices) {
    element.style.display = 'none'
  }
  for (const element of listeDivExercicesCorr) {
    element.style.display = 'none'
  }
  if (i !== undefined) {
    listeDivExercices[i].style.display = 'block'
    if (document.getElementById(`score${i}`)) {
      listeDivExercicesCorr[i].style.display = 'block'
    }
  }
}
/**
 * Transforme les li de classe question en div avec le même contenu
 */
const liToDiv = () => {
  const questions = document.querySelectorAll('li.question, li.correction')
  for (const element of questions) {
    element.style.display = 'none'
    let div
    if (element.classList.contains('question')) {
      div = create('div', { style: 'display: none' })
    } else {
      div = create('div')
    }
    div.innerHTML = element.innerHTML
    div.classList = element.classList
    div.dataset.taille = element.dataset.taille || 1
    div.id = element.id
    element.replaceWith(div)
  }
}

/**
 * Affiche uniquement le ieme div de classe question et le div de l'exercice auquel il appartient
 * @param {int} i
 */
const affichageUniquementQuestion = (i) => {
  const texteExerciceTermine = document.getElementById('divExerciceTermine')
  if (texteExerciceTermine) texteExerciceTermine.remove()
  const listeBoutonsDuMenu = document.querySelectorAll('[id^=btnMenu]')
  // On gère l'affichage des numéros de questions circulaires pour ne pas en afficher plus d'une ligne
  for (const bouton of listeBoutonsDuMenu) {
    bouton.classList.remove('blue')
    if (parseInt(bouton.textContent) === i + 1) {
      bouton.classList.add('blue')
    }
    // Le nombre à gauche et à droite de la question courante dépend de la largeur de la fenêtre
    const demiNombreDeRonds = (window.innerWidth / 80 / 2)
    if (listeBoutonsDuMenu.length > 2 * demiNombreDeRonds) { // Ce nombre est-il trop grand ?
      if (i < demiNombreDeRonds && parseInt(bouton.textContent) < 2 * demiNombreDeRonds) { // Dans les 10 premières questions on garde l'affichage des 10 premiers boutons
        bouton.style.display = 'inline'
      } else if (Math.abs(parseInt(bouton.textContent) - i - 1) > demiNombreDeRonds) { // Questions à plus de 6 d'écart cachée
        bouton.style.display = 'none'
      } else {
        bouton.style.display = 'inline'
      }
    } else bouton.style.display = 'inline'
  }
  affichageUniquementExercice()
  const questions = document.querySelectorAll('div.question')
  // En l'absence de questions, on retourne sur la page d'accueil
  if (questions.length === 0) document.location.href = '/mathalea.html'
  const corrections = document.querySelectorAll('div.correction')
  for (const question of questions) {
    question.style.display = 'none'
  }
  for (const correction of corrections) {
    correction.style.display = 'none'
  }
  if (i !== undefined) {
    context.questionCanEnCours = i + 1
    if (questions[i] !== undefined) {
      questions[i].style.display = 'block'
      const exercice = questions[i].parentElement.parentElement
      exercice.style.display = 'block'
      if (document.getElementById('scoreTotal')) {
        if (corrections[i] !== undefined) {
          corrections[i].style.display = 'block'
          const correction = corrections[i].parentElement.parentElement
          correction.style.display = 'block'
        }
      }
    } else {
      window.notify('AffichageUniquementQuestion(i) : questions[i] n\'est pas défini', { i, questions })
    }
  }
  const inputs = document.querySelectorAll('input, math-field ')
  if (inputs[i]) {
    inputs[i].focus()
    if (inputs[i].tagName !== 'MATH-FIELD') {
      inputs[i].select()
    }
  }
  // Gestion du bouton 'Entrée' pour aller à l'exercice suivant
  if (!context.enterHasListenner) {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        if (context.vue === 'can') {
          const listeBoutonsValider = document.querySelectorAll('[id^=boutonVerif]')
          listeBoutonsValider[context.questionCanEnCours - 1].click()
        }
        if (context.vue === 'diap') {
          if (document.getElementById('btnReady')) {
            document.getElementById('btnReady').click()
          } else {
            questionSuivante()
          }
        }
      }
    })
    context.enterHasListenner = true
  }
}

const ajouteBoutonsVerifQuestions = () => {
  const questions = document.querySelectorAll('div.question')
  for (let i = 0; i < questions.length; i++) {
    questions[i].appendChild(boutonVerifQuestion('boutonVerif' + questions[i].id))
  }
}

const masqueEspaces = () => {
  const espaces = document.getElementsByClassName('ui hidden divider')
  for (const espace of espaces) {
    espace.style.display = 'none'
  }
}
const masqueTitreExerciceEtEspaces = () => {
  const titresExercice = document.getElementsByClassName('ui dividing header')
  for (const titre of titresExercice) {
    titre.style.display = 'none'
  }
  masqueEspaces()
}

const gestionTimer = () => {
  const divTimer = document.getElementById('timer')
  if (Number.isInteger(parseInt(context.duree)) && divTimer) {
    context.tempsRestant = context.duree
    divTimer.textContent = context.tempsRestant
    if (!divTimer.hasMathaleaTimer) {
      context.timer = setInterval(() => {
        context.tempsRestant--
        divTimer.textContent = context.tempsRestant
        if (parseInt(context.tempsRestant) === 0) {
          clearInterval(context.timer)
          divTimer.textContent = ''
          const listeBoutonsValider = document.querySelectorAll('[id^=boutonVerifex]:not(.disabled), [id^=btnValidationEx]:not(.disabled)')
          for (const bouton of listeBoutonsValider) {
            bouton.click()
          }
        }
      }, 1000)
      divTimer.hasMathaleaTimer = true
    }
  }
}
const gestionTimerDiap = (pause = false) => {
  const btnPause = document.getElementById('btnPause')
  const divTimer = document.getElementById('timer')
  if (Number.isInteger(parseInt(context.duree)) && divTimer) {
    btnPause.style.display = 'visible'
    if (!pause) context.tempsRestant = context.duree
    divTimer.textContent = context.tempsRestant
    if (!divTimer.hasMathaleaTimer) {
      context.timer = setInterval(() => {
        if (context.tempsRestant > 0) context.tempsRestant--
        divTimer.textContent = context.tempsRestant
        if (parseInt(context.tempsRestant) === 0) {
          clearInterval(context.timer)
          divTimer.textContent = ''
          const btn = document.querySelector(`button[data-num="${parseInt(context.questionCanEnCours) + 1}"]`)
          if (context.son === 1) {
            const son = new Audio('assets/sons/changediapo.mp3')
            son.addEventListener('canplaythrough', (event) => {
              son.play().catch(() => {

              })
            })
          }
          if (btn) {
            btn.click()
            divTimer.hasMathaleaTimer = false
            gestionTimerDiap()
          } else {
            document.getElementById('affichage_exercices').style.visibility = 'hidden'
            arreteLeTimer()
            document.querySelector(`button[data-num="${context.questionCanEnCours}"]`).classList.remove('blue')
            const menuEval = document.getElementById('menuEval')
            addElement(menuEval, 'h1', { id: 'divExerciceTermine', class: 'ui center aligned container', style: 'marginTop: 200px' }, 'Diaporama terminé')
            document.getElementById('btnCorrectionQuestion').classList.remove('blue')
          }
        }
      }, 1000)
      divTimer.hasMathaleaTimer = true
    }
  } else {
    btnPause.style.display = 'none'
  }
}

export async function initDom () {
  // Il FAUT TOUJOURS mettre await avant FetchHtmlToElement sinon la création des formulaires bug car les éléments n'existent pas encore
  const vue = getVueFromUrl()
  if (vue) {
    context.vue = vue
  }
  const zoom = getZoomFromUrl()
  if (zoom) {
    context.zoom = zoom
  }
  document.body.innerHTML = ''
  let section
  if (vue === 'recto' || vue === 'verso' || vue === 'exMoodle' || vue === 'correctionMoodle' || vue === 'diapCorr') {
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    if (vue === 'diapCorr') await addFetchHtmlToParent('templates/boutonsZoom.html', section)
    addElement(section, 'div', { id: 'containerErreur' })
    if (vue === 'exMoodle' && new URLSearchParams(window.location.search).get('moodleJson') === null) {
      const divMessage = addElement(section, 'div')
      divMessage.innerHTML = `<div class="ui icon message">
      <i class="exclamation triangle icon"></i>
      <div class="content">
        <div class="header">
          Cliquer sur « Vérifier les réponses » avant de terminer le test.
        </div>
        
      </div>
    </div>`
      divMessage.style.marginBottom = '30px'
      divMessage.style.marginTop = '30px'
    }
    if (vue === 'exMoodle' || vue === 'correctionMoodle') {
      document.body.classList.add('exMoodle')
    }
    await addFetchHtmlToParent('templates/mathaleaExercices.html', section)
    const accordions = document.getElementsByClassName('ui fluid accordion')
    for (const accordion of accordions) {
      accordion.style.visibility = 'hidden'
    }
    const divExercice = get('exercices', false)
    const divCorrection = get('corrections', false)
    divExercice.style.fontSize = '1.5em'
    divCorrection.style.fontSize = '1.5em'
    if (context.vue === 'verso' || vue === 'correctionMoodle' || vue === 'diapCorr') {
      divExercice.style.display = 'none'
      document.body.appendChild(divCorrection)
    }
    // Le titre de l'exercice ne peut être masqué qu'après l'affichage
    document.addEventListener('exercicesAffiches', masqueTitreExerciceEtEspaces)
    let hauteurIEP = 0
    let hauteurCorrection = 0
    document.addEventListener('IEPAffiche', () => {
      // Envoi des informations à Anki
      hauteurIEP = window.document.body.scrollHeight + window.document.body.scrollWidth * 0.75 + 60
      window.parent.postMessage({ hauteur: Math.max(hauteurCorrection, hauteurIEP), reponse: 'A_COMPLETER' }, '*')
    })
    document.addEventListener('exercicesAffiches', () => {
      // Récupère la précédente saisie pour exMoodle et désactive le bouton
      if (vue === 'exMoodle') {
        let reponses
        try { // JSON.parse(null) renvoie null
          reponses = JSON.parse(new URLSearchParams(window.location.search).get('moodleJson'))
        } catch (e) {}
        if (reponses) {
          for (let i = 0; i < context.listeObjetsExercice[0].autoCorrection.length; i++) {
            if (document.getElementById(`champTexteEx0Q${i}`) && reponses && typeof reponses[`reponse${i}`] !== 'undefined') {
              document.getElementById(`champTexteEx0Q${i}`).textContent = reponses[`reponse${i}`]
            }
            if (document.getElementById(`checkEx0Q${i}R0`) && reponses && typeof reponses[`reponse${i}R0`] !== 'undefined') {
              for (let j = 0; j < context.listeObjetsExercice[0].autoCorrection[i].propositions.length; j++) {
                if (document.getElementById(`checkEx0Q${i}R${j}`)) {
                  document.getElementById(`checkEx0Q${i}R${j}`).checked = reponses[`reponse${i}R${j}`]
                }
              }
            }
          }
        }
        let hauteurExercice = window.document.querySelector('section').scrollHeight
        window.parent.postMessage({ hauteurExercice, serie: context.graine }, '*')
        // Au bout de 1 seconde on retente un envoi (la taille peut avoir été modifiée par l'ajout de champ ou)
        setTimeout(() => {
          hauteurExercice = window.document.querySelector('section').scrollHeight
          window.parent.postMessage({ hauteurExercice, serie: context.graine }, '*')
        }, 1000)
        if (reponses) {
          const exercice = context.listeObjetsExercice[0]
          const bouton = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
          document.addEventListener('domExerciceInteractifReady', () => {
            bouton.click()
            bouton.classList.add('disabled')
          })
        }
      }
      hauteurCorrection = window.document.body.scrollHeight
      if (vue === 'correctionMoodle') {
        if (document.getElementById('corrections')) {
          const hauteurExerciceCorrection = window.document.body.scrollHeight + 20
          window.parent.postMessage({ hauteurExerciceCorrection, iMoodle: parseInt(new URLSearchParams(window.location.search).get('iMoodle')) }, '*')
        }
      }
      // Envoi des informations à Anki
      if (vue === 'verso') {
        if (document.getElementById('corrections')) {
          const hauteurExerciceCorrection = window.document.body.scrollHeight + 20
          window.parent.postMessage({ hauteurExerciceCorrection }, '*')
        }
      }
      let tableauReponseEx1Q1
      try {
        tableauReponseEx1Q1 = context.listeObjetsExercice[0].autoCorrection[0].reponse.valeur
      } catch (error) {
        tableauReponseEx1Q1 = undefined
      }
      window.parent.postMessage({ hauteur: Math.max(hauteurCorrection, hauteurIEP), reponse: tableauReponseEx1Q1 }, '*')
      // On fusionne toutes les listes pour que la numérotation des questions soit respectées.
      if (vue === 'diapCorr') {
        const listes = document.querySelectorAll('#corrections li')
        for (let i = 1; i < listes.length; i++) {
          listes[0].append(listes[i])
        }
      }
    })
  } else if (vue === 'eval') {
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/boutonsConnexion.html', section)
    // On ajoute temporairement le bouton "Nouvelles Données" à la vue eval en attendant la modale de paramétrage
    document.getElementById('boutonsConnexion').appendChild(boutonMAJ())
    const menuEval = addElement(section, 'div', { id: 'menuEval' })
    addElement(section, 'div', { id: 'containerErreur' })
    addElement(section, 'div', { id: 'timer' })
    await addFetchHtmlToParent('templates/eval.html', section)
    const accordions = document.getElementsByClassName('ui fluid accordion')
    for (const accordion of accordions) {
      accordion.style.visibility = 'hidden'
    }
    addElement(section, 'div', { id: 'corrections' })
    // Attend l'affichage de tous les exercices pour les cacher
    document.addEventListener('exercicesAffiches', () => {
      affichageUniquementExercice(0)
      gestionTimer()
      menuEval.innerHTML = ''
      const listeDivExercices = document.querySelectorAll('[id ^= "exercice"].titreExercice')
      for (let i = 0, element; i < listeDivExercices.length; i++) {
        element = addElement(menuEval, 'button', { id: `btnEx${i + 1}`, style: 'margin: 5px', class: 'circular ui button' })
        element.textContent = `Ex. ${i + 1}`
        if (!element.hasListenner) {
          element.addEventListener(
            'click',
            () => {
              affichageUniquementExercice(i)
            },
            false
          )
          element.hasListenner = true
        }
      }
    })
  } else if (vue === 'light' || vue === 'l') {
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/boutonsConnexion.html', section)
    document.getElementById('boutonsConnexion').appendChild(boutonMAJ())
    addElement(section, 'div', { id: 'containerErreur' })
    addElement(section, 'div', { id: 'timer' })
    await addFetchHtmlToParent('templates/mathaleaExercices.html', section)
  } else if (vue === 'embed' || vue === 'e') {
    if (context.zoom < 1.5) {
      context.zoom = 1.5
    }
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    addElement(section, 'div', { id: 'containerErreur' })
    addElement(section, 'div', { id: 'timer' })
    await addFetchHtmlToParent('templates/boutonsConnexion.html', section)
    document.getElementById('boutonsConnexion').appendChild(boutonMAJ())
    await addFetchHtmlToParent('templates/mathaleaExercices.html', section)
    document.addEventListener('exercicesAffiches', () => {
      gestionTimer()
      document.querySelector('#accordeon_parametres').style.display = 'none'
      const listeH3 = document.querySelectorAll('h3')
      if (listeH3.length === 2) {
        // Un seul exercice on cache son titre
        listeH3.forEach((e) => {
          e.style.display = 'none'
        })
      } else {
        for (const e of listeH3) {
          setStyles(e, 'color: white; backgroundColor: #f15929;  borderRadius: 5px; padding: 5px 10px;')
        }
      }
      const btnCorrection = document.querySelector('#btnCorrection')
      setStyles(btnCorrection, 'display: inline-block; cursor: pointer; padding: 12px; borderRadius: 5px; border: solid 2px black;')
      const ols = document.querySelectorAll('ol')
      for (const ol of ols) {
        setStyles(ol, 'padding:0;')
      }
    })
    // On récupère tous les paramètres de chaque exos dans un tableau d'objets
    const paramsAllExos = Object.entries(getUrlVars())
    // Un booléen pour recupérer le fait qu'il y a au moins un exo interactif dans la vue
    let isAnyExInteractif = false
    for (const obj of paramsAllExos) {
      for (const [key, value] of Object.entries(obj[1])) {
        if (key === 'i' && value === 1) {
          isAnyExInteractif = true
        }
      }
    }
    if (!isAnyExInteractif) {
      const divTop = document.querySelector('#boutonsConnexion')
      const divTopScoreLogIn = document.querySelector('#scoresLogIn')
      const divTopScoreLogOut = document.querySelector('#scoresLogOut')
      const divTopUserIdDisplay = document.querySelector('#userIdDisplay')
      divTop.removeChild(divTopScoreLogIn)
      divTop.removeChild(divTopScoreLogOut)
      divTop.removeChild(divTopUserIdDisplay)
      // document.querySelector('#scoresLogIn').style.display = 'none'
    }
  } else if (vue === 'multi') {
    setOutputHtml()
    section = addElement(document.body, 'section', { style: 'width: 100%' })
    await addFetchHtmlToParent('templates/boutonsConnexion.html', section)
    document.getElementById('boutonsConnexion').appendChild(boutonMAJ())
    addElement(section, 'div', { id: 'containerErreur' })
    addElement(section, 'div', { id: 'timer' })
    await addFetchHtmlToParent('templates/mathaleaBasique.html', section)
    const parentExercices = document.getElementById('exercices')
    const parentCorrections = document.getElementById('corrections')
    parentExercices.style.display = 'flex'
    parentExercices.style.flexWrap = 'wrap'
    parentExercices.style.justifyContent = 'center'
    parentCorrections.style.flexWrap = 'wrap'
    parentCorrections.style.justifyContent = 'center'
    document.addEventListener('exercicesAffiches', () => {
      parentCorrections.style.display = 'none'
      document.querySelectorAll('.titreExercice').forEach((ex) => {
        setStyles(ex, 'margin: 30px')
      })
      document.querySelectorAll('ol').forEach((ol) => {
        setStyles(ol, 'padding:0;')
      })
      gestionTimer()
    })
    const btnCorrection = document.getElementById('btnCorrection')
    btnCorrection.addEventListener('click', () => {
      if (parentCorrections.style.display === 'flex') {
        parentCorrections.style.display = 'none'
      } else {
        parentCorrections.style.display = 'flex'
      }
    })
  } else if (vue === 'can') {
    context.duree = parseInt(getDureeFromUrl())
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/boutonsConnexion.html', section)
    // On ajoute temporairement le bouton "Nouvelles Données" à la vue can en attendant la modale de paramétrage
    document.getElementById('boutonsConnexion').appendChild(boutonMAJ())
    const menuEval = addElement(section, 'div', { id: 'menuEval' })
    addElement(section, 'div', { id: 'containerErreur' })
    const divTimer = addElement(section, 'div', { id: 'timer' })
    await addFetchHtmlToParent('templates/mathaleaBasique.html', section)
    document.addEventListener('exercicesAffiches', () => {
      liToDiv()
      ajouteBoutonsVerifQuestions()
      document.querySelectorAll('h3').forEach((e) => {
        e.style.display = 'none'
      })
      document.querySelectorAll('[id^=btnValidationEx]').forEach((e) => {
        e.style.display = 'none'
      })
      document.getElementById('btnCorrection').style.display = 'none'
      affichageUniquementExercice()
      affichageUniquementQuestion(0)
      document.querySelectorAll('ol').forEach((ol) => {
        setStyles(ol, 'padding:0;')
      })
      menuEval.innerHTML = ''
      const questions = document.querySelectorAll('div.question')
      for (let i = 0, element; i < questions.length; i++) {
        element = addElement(menuEval, 'button', { id: 'btnMenu' + questions[i].id, style: 'margin: 5px', class: 'circular ui button' })
        element.textContent = `${i + 1}`
        element.dataset.num = i + 1
        if (!element.hasListenner) {
          element.addEventListener(
            'click',
            () => {
              affichageUniquementQuestion(i)
              element.classList.add('blue')
              context.questionCanEnCours = element.textContent
            },
            false
          )
          element.hasListenner = true
        }
        gestionTimer(divTimer)
      }
      document.querySelector('button[data-num="1"]').classList.add('blue')
      document.getElementById('corrections').style.display = 'none'
    })
    document.getElementById('btnCorrection').addEventListener('click', () => {
      document.getElementById('corrections').style.display = 'block'
    })
  } else if (vue === 'diap') {
    navigationAvecLesFleches()
    context.zoom = 2
    context.duree = parseInt(getDureeFromUrl())
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container', id: 'sectionPrincipale', style: 'display: none' })
    await addFetchHtmlToParent('templates/boutonsDiap.html', section)
    addElement(section, 'div', { class: 'ui hidden divider' })
    const menuEval = addElement(section, 'div', { id: 'menuEval' })
    addElement(section, 'div', { class: 'ui hidden divider' })
    addElement(section, 'div', { id: 'containerErreur' })
    addElement(section, 'div', { id: 'timer', style: 'position: absolute; top: 20px; right: 30px' })
    await addFetchHtmlToParent('templates/mathaleaBasique.html', section)
    const titreCorrections = document.getElementById('titreCorrections')
    titreCorrections.style.display = 'none'
    addElement(titreCorrections, 'div', { class: 'ui dividing header', style: 'fontSize: 18pt' }, 'Correction')
    const btnLienCorrection = document.getElementById('boutonLienCorrectionExterne')
    if (btnLienCorrection) {
      btnLienCorrection.addEventListener('click', () => {
        goTabVue('diapCorr')
      })
    }
    const btnPause = document.getElementById('btnPause')
    btnPause.addEventListener('click', () => {
      pauseLeTimer()
    })
    document.getElementById('btnNext').addEventListener('click', () => {
      questionSuivante()
    })
    document.getElementById('btnPrev').addEventListener('click', () => {
      questionPrecedente()
    })
    document.getElementById('btnDiapTimer').addEventListener('click', async () => {
      modalTimer()
      document.addEventListener('nouveauTimer', () => {
        gestionTimerDiap()
      })
    })
    document.addEventListener('exercicesAffiches', () => {
      liToDiv()
      document.querySelectorAll('h3').forEach((e) => {
        e.style.display = 'none'
      })
      document.querySelectorAll('[id^=btnValidationEx]').forEach((e) => {
        e.style.display = 'none'
      })
      document.getElementById('btnCorrection').style.display = 'none'
      affichageUniquementExercice()
      affichageUniquementQuestion(0)
      document.querySelectorAll('ol').forEach((ol) => {
        setStyles(ol, 'padding:0;')
      })
      menuEval.innerHTML = ''
      const questions = document.querySelectorAll('div.question')
      // Centre les questions (mais pas la consigne)
      for (const question of questions) {
        question.classList.add('ui', 'center', 'aligned', 'container')
      }
      for (let i = 0, element; i < questions.length; i++) {
        element = addElement(menuEval, 'button', { id: 'btnMenu' + questions[i].id, style: 'margin: 5px', class: 'circular ui button' })
        element.textContent = `${i + 1}`
        element.dataset.num = i + 1
        if (!element.hasListenner) {
          element.addEventListener(
            'click',
            () => {
              affichageUniquementQuestion(i)
              element.classList.add('blue')
              context.questionCanEnCours = element.textContent
              if (document.getElementById('affichage_exercices').style.visibility === 'hidden') {
                document.getElementById('affichage_exercices').style.visibility = 'visible'
              }
              context.tempsRestant = context.duree
              arreteLeTimer()
              if (document.getElementById('btnCorrectionQuestion').classList.contains('blue')) {
                affichageCorrection()
              }
            },
            false
          )
          element.hasListenner = true
        }
      }
      document.querySelector('button[data-num="1"]').classList.add('blue')
    })
    // Gestion du pré-show
    const sectionTemp = addElement(document.body, 'section', { class: 'ui center aligned container', id: 'sectionTemporaire', style: 'margin: 300px' })
    const btnReady = addElement(sectionTemp, 'button', { class: 'massive ui button', id: 'btnReady' }, 'Prêt ?')
    btnReady.addEventListener(
      'click',
      () => {
        sectionTemp.remove()
        setStyles(section, 'display: block')
        const exercicesDiap = new window.Event('exercicesDiap', { bubbles: true })
        document.dispatchEvent(exercicesDiap)
        gestionTimerDiap()
        affichageUniquementQuestion(0)
      },
      { once: true }
    )
    // Gestion du bouton nouvelles données
    document.getElementById('btnRedo').addEventListener('click', () => {
      window.history.replaceState('', '', window.location.protocol + '//' + window.location.host + window.location.pathname + replaceQueryParam('serie', ''))
      document.location.reload()
    })
    // Affichage de la correction
    document.getElementById('btnCorrectionQuestion').addEventListener('click', () => {
      if (document.getElementById('btnCorrectionQuestion').classList.contains('blue')) {
        masquerCorrection()
        document.getElementById('btnCorrectionQuestion').classList.remove('blue')
      } else {
        affichageCorrection()
        document.getElementById('btnCorrectionQuestion').classList.add('blue')
      }
    })
  } else if (vue === 'latex') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/mathaleaLatex.html', document.body)
    setOutputLatex()
  } else if (vue === 'moodle') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/mathaleaMoodle.html', document.body)
    setOutputMoodle()
  } else if (vue === 'amc') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/amc.html', document.body)
    setOutputAmc()
  } else if (vue === 'scores') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    section.append(espaceVertical())
    await addFetchHtmlToParent('templates/scores.html', document.body)
  } else if (vue === 'alc') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    section.append(espaceVertical())
    await addFetchHtmlToParent('templates/mathaleaEnteteChoixDesExercices.html', section, 'div', { id: 'choix_exercices_menu' })
    addElement(section, 'div', { id: 'containerErreur' })
    section.append(espaceVertical())
    const doubleColonne = addElement(section, 'div', { class: 'ui stackable two column grid', dir: 'ltr', id: 'mathaleaContainer' })
    const colonneGauche = addElement(doubleColonne, 'div', { id: 'left', class: 'column', style: 'height:80vh;' })
    const colonneDroite = addElement(doubleColonne, 'div', { id: 'right', class: 'column', style: 'height:80vh; overflowY: auto;' })
    await fetchHtmlToElement('templates/mathaleaGauche.html', colonneGauche)
    await fetchHtmlToElement('templates/alacarteDroite.html', colonneDroite)
    $('#reglages_sortie_LaTeX').hide()
    $('#choix_exercices_menu').hide()
    section.append(espaceVertical())
    section.append(espaceVertical())
    setOutputAlc()
  } else {
    // menuEtEx
    setOutputHtml()
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    section.append(espaceVertical())
    section.append(espaceVertical())
    addElement(section, 'div', { id: 'containerErreur' })
    addElement(section, 'div', { id: 'timer' })
    await addFetchHtmlToParent('templates/mathaleaEnteteChoixDesExercices.html', section, 'div', { id: 'choix_exercices_menu' })
    section.append(espaceVertical())
    const doubleColonne = addElement(section, 'div', { class: 'ui stackable two column grid', dir: 'ltr', id: 'mathaleaContainer' })
    const colonneGauche = addElement(doubleColonne, 'div', { id: 'left', class: 'column', style: 'height:75vh;' })
    const colonneDroite = addElement(doubleColonne, 'div', { id: 'right', class: 'column', style: 'height:75vh; overflowY: auto;' })
    await fetchHtmlToElement('templates/mathaleaGauche.html', colonneGauche)
    await fetchHtmlToElement('templates/mathaleaDroite.html', colonneDroite)
    section.append(espaceVertical())
    section.append(espaceVertical())
  }
  // Le footer
  if (vue === 'recto' || vue === 'verso' || vue === 'embed' || vue === 'e' || vue === 'can') {
    await addFetchHtmlToParent('templates/footer1logo.html', document.body, 'footer')
  } else if (vue !== 'exMoodle' && vue !== 'correctionMoodle' && vue !== 'diap') {
    await addFetchHtmlToParent('templates/footer.html', document.body, 'footer')
  } else if (vue === 'diap') {
    const footer = addElement(document.body, 'footer')
    footer.style.position = 'fixed'
    footer.style.bottom = '10px'
    footer.style.right = '10px'
    footer.innerHTML = `<a href="mailto:contact@coopmaths.fr" style="color: black; padding-right: 2em"><i class="mail icon"></i>contact@coopmaths.fr</a>
    <a href="/twitter" targer="_blank" style="color: black; padding-right: 2em"><i class="twitter icon"></i>@CoopMaths_fr</a>
    <img class="ui middle aligned image" height="25" src="assets/images/logo2.png" />`
  }

  // Pour toutes les vues
  initialiseBoutonsConnexion()
  if (getLogFromUrl()) {
    modalLog()
  }
  // Gestion de la taille de l'affichage
  if (context.vue !== 'latex') {
    document.addEventListener('exercicesAffiches', () => {
      zoomAffichage(context.zoom)
    })
  }
}

function espaceVertical () {
  const espace = create('div', { class: 'ui hidden divider' })
  return espace
}

function navigationAvecLesFleches () {
  window.addEventListener(
    'keydown',
    function (event) {
      switch (event.code) {
        case 'ArrowLeft':
          questionPrecedente()
          event.preventDefault()
          break
        case 'ArrowRight':
          questionSuivante()
          break
        case 'Space':
          pauseLeTimer()
          event.preventDefault()
          break
      }
    },
    true
  )
}

function arreteLeTimer () {
  document.getElementById('timer').innerHTML = ''
  clearInterval(context.timer)
  const divTimer = document.getElementById('timer')
  divTimer.hasMathaleaTimer = false
  const btnPause = document.getElementById('btnPause')
  btnPause.innerHTML = '<i class="play icon"></i>'
}

function pauseLeTimer () {
  const divTimer = document.getElementById('timer')
  const btnPause = document.getElementById('btnPause')
  if (divTimer.hasMathaleaTimer) {
    clearInterval(context.timer)
    divTimer.hasMathaleaTimer = false
    btnPause.innerHTML = '<i class="play icon"></i>'
  } else {
    gestionTimerDiap(true)
  }
}

function affichageCorrection () {
  masquerCorrection()
  if (document.getElementById('affichage_exercices').style.visibility === 'hidden') {
    document.getElementById('affichage_exercices').style.visibility = 'visible'
  }
  const texteExerciceTermine = document.getElementById('divExerciceTermine')
  if (texteExerciceTermine) texteExerciceTermine.remove()
  document.getElementById('titreCorrections').style.display = 'block'
  document.getElementById('corrections').style.display = 'block'
  const corrections = document.querySelectorAll('div.correction')
  const i = context.questionCanEnCours - 1
  if (corrections[i] !== undefined) {
    corrections[i].style.display = 'block'
    const correction = corrections[i].parentElement.parentElement
    correction.style.display = 'block'
  }
}

function masquerCorrection () {
  document.getElementById('titreCorrections').style.display = 'none'
  document.getElementById('corrections').style.display = 'none'
  const corrections = document.querySelectorAll('div.correction')
  for (const correction of corrections) {
    correction.style.display = 'none'
  }
}

function questionPrecedente () {
  const btn = document.querySelector(`button[data-num="${parseInt(context.questionCanEnCours) - 1}"]`)
  if (btn) btn.click()
  if (document.getElementById('affichage_exercices').style.visibility === 'hidden') {
    document.getElementById('affichage_exercices').style.visibility = 'visible'
  }
  context.tempsRestant = context.duree
  arreteLeTimer()
}

function questionSuivante () {
  const btn = document.querySelector(`button[data-num="${parseInt(context.questionCanEnCours) + 1}"]`)
  if (btn) btn.click()
  context.tempsRestant = context.duree
  arreteLeTimer()
}
