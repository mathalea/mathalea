/* global fetch $ */
import { context } from './context.js'
import { shuffleJusqua } from './outils.js'
import { messageFeedback } from './messages.js'
import { addElement, get, setStyles } from './dom.js'
import { ComputeEngine, parse } from '@cortex-js/math-json'
import Fraction from './Fraction.js'
import Grandeur from './Grandeur.js'
import { getUserIdFromUrl, getVueFromUrl } from './gestionUrl.js'

export function exerciceInteractif (exercice) {
  // passage amsType num à string cf commit 385b5ea
  if (context.isAmc) {
    if (exercice.amcType === 'AMCNum' || exercice.amcType === 'AMCOpenNum') exerciceNumerique(exercice)
    if (exercice.amcType === 'qcmMono' || exercice.amcType === 'qcmMult') exerciceQcm(exercice)
  } else if (context.isHtml && !context.isDiaporama) {
    if (exercice.interactifType === 'qcm')exerciceQcm(exercice)
    if (exercice.interactifType === 'numerique')exerciceNumerique(exercice)
    if (exercice.interactifType === 'cliqueFigure')exerciceCliqueFigure(exercice)
    if (exercice.interactifType === 'custom') exerciceCustom(exercice)
    // Pour les exercices de type custom, on appelle la méthode correctionInteractive() définie dans l'exercice
    if (exercice.interactifType === 'mathLive') exerciceMathLive(exercice)
  }
}

function mouseOverSvgEffect () {
  this.style.border = '1px solid #1DA962'
}
function mouseOutSvgEffect () {
  this.style.border = 'none'
}
function mouseSvgClick () {
  if (this.etat) {
    // Déja choisi, donc on le réinitialise
    this.style.border = 'none'
    this.addEventListener('mouseover', mouseOverSvgEffect)
    this.addEventListener('mouseout', mouseOutSvgEffect)
    this.addEventListener('click', mouseSvgClick)
    this.etat = false
  } else {
    // Passe à l'état choisi donc on désactive les listenners pour over et pour out
    this.removeEventListener('mouseover', mouseOverSvgEffect)
    this.removeEventListener('mouseout', mouseOutSvgEffect)
    this.style.border = '3px solid #f15929'
    this.etat = true
  }
}

function verifQuestionCliqueFigure (exercice, i) {
  // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
  let eltFeedback = get(`resultatCheckEx${exercice.numeroExercice}Q${i}`, false)
  // On ajoute le div pour le feedback
  if (!eltFeedback) {
    const eltExercice = get(`exercice${exercice.numeroExercice}`)
    eltFeedback = addElement(eltExercice, 'div', { id: `resultatCheckEx${exercice.numeroExercice}Q${i}` })
  }
  setStyles(eltFeedback, 'marginBottom: 20px')
  if (eltFeedback) eltFeedback.innerHTML = ''
  const figures = []
  let erreur = false // Aucune erreur détectée
  let nbFiguresCliquees = 0
  for (const objetFigure of exercice.figures[i]) {
    const eltFigure = document.getElementById(objetFigure.id)
    figures.push(eltFigure)
    eltFigure.removeEventListener('mouseover', mouseOverSvgEffect)
    eltFigure.removeEventListener('mouseout', mouseOutSvgEffect)
    eltFigure.removeEventListener('click', mouseSvgClick)
    eltFigure.hasMathaleaListener = false
    if (eltFigure.etat) nbFiguresCliquees++
    if (eltFigure.etat !== objetFigure.solution) erreur = true
  }
  if (nbFiguresCliquees > 0 && !erreur) {
    eltFeedback.innerHTML = '😎'
    return 'OK'
  } else {
    eltFeedback.innerHTML = '☹️'
    return 'KO'
  }
}

function verifQuestionMathLive (exercice, i) {
  const engine = new ComputeEngine()
  let saisieParsee, signeF
  const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
  const champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
  let reponses = []
  if (!Array.isArray(exercice.autoCorrection[i].reponse.valeur)) {
    reponses = [exercice.autoCorrection[i].reponse.valeur]
  } else {
    reponses = exercice.autoCorrection[i].reponse.valeur
  }
  let resultat = 'KO'
  let saisie = champTexte.value
  for (let reponse of reponses) {
  // Pour le calcul littéral on remplace dfrac en frac
    if (exercice.autoCorrection[i].reponse.param.formatInteractif === 'calcul') { // Le format par défautt
      if (typeof reponse === 'string') {
        reponse = reponse.replaceAll('dfrac', 'frac')
      // A réfléchir, est-ce qu'on considère que le début est du brouillon ?
      // saisie = neTientCompteQueDuDernierMembre(saisie)
      }
      // Pour le calcul numérique, on transforme la saisie en nombre décimal
      if (typeof reponse === 'number') saisie = saisie.toString().replace(',', '.')
      if (engine.same(engine.canonical(parse(saisie)), engine.canonical(parse(reponse)))) {
        resultat = 'OK'
      }
      // Pour les exercices de simplifications de fraction
    } else if (exercice.autoCorrection[i].reponse.param.formatInteractif === 'fractionPlusSimple') {
      saisieParsee = parse(saisie)
      if (saisieParsee) {
        if (saisieParsee[0] === 'Negate') {
          signeF = -1
          saisieParsee = saisieParsee[1].slice()
        } else {
          signeF = 1
        }
        if (saisieParsee[1].num && saisieParsee[2].num) {
          const fSaisie = new Fraction(parseInt(saisieParsee[1].num), parseInt(saisieParsee[2].num))
          if (fSaisie.estUneSimplification(reponse)) resultat = 'OK'
        }
      }
      // Pour les exercices de calcul où on attend une fraction peu importe son écriture (3/4 ou 300/400 ou 30 000/40 000...)
    } else if (exercice.autoCorrection[i].reponse.param.formatInteractif === 'fractionEgale') {
      // Si l'utilisateur entre un entier n, on transforme en n/1
      if (!isNaN(parseFloat(saisie.replace(',', '.')))) {
        saisieParsee = parse(`\\frac{${saisie.replace(',', '.')}}{1}`)
      } else {
        saisieParsee = parse(saisie)
      }
      if (saisieParsee) {
        if (saisieParsee[0] === 'Negate') {
          signeF = -1
          saisieParsee = saisieParsee[1].slice()
        } else {
          signeF = 1
        }
        if (saisieParsee[1].num && saisieParsee[2].num) {
          const fSaisie = new Fraction(signeF * parseFloat(saisieParsee[1].num), parseInt(saisieParsee[2].num))
          if (fSaisie.egal(reponse)) resultat = 'OK'
        }
      }
      // Pour les exercices où l'on attend un écriture donnée d'une fraction
    } else if (exercice.autoCorrection[i].reponse.param.formatInteractif === 'fraction') {
      if (!isNaN(parseFloat(saisie.replace(',', '.')))) {
        saisieParsee = parse(`\\frac{${saisie.replace(',', '.')}}{1}`)
      } else {
        saisieParsee = parse(saisie)
      }
      if (saisieParsee) {
        if (saisieParsee[0] === 'Negate') {
          signeF = -1
          saisieParsee = saisieParsee[1].slice()
        } else {
          signeF = 1
        }
        if (saisieParsee[1].num && saisieParsee[2].num) {
          const fSaisie = new Fraction(signeF * parseInt(saisieParsee[1].num), parseInt(saisieParsee[2].num))
          if (fSaisie.texFraction === reponse.texFraction) resultat = 'OK'
        }
      }
      // Pour les exercices où l'on attend une mesure avec une unité au choix
    } else if (exercice.autoCorrection[i].reponse.param.formatInteractif === 'longueur') {
      const grandeurSaisie = saisieToGrandeur(saisie)
      if (grandeurSaisie) {
        if (grandeurSaisie.estEgal(reponse)) resultat = 'OK'
      } else {
        resultat = 'essaieEncore'
      }
      // Pour les exercice où la saisie doit correspondre exactement à la réponse
    } else { // Format texte
      if (saisie === reponse) {
        resultat = 'OK'
      }
    }
  }
  if (resultat === 'OK') {
    spanReponseLigne.innerHTML = '😎'
    spanReponseLigne.style.fontSize = 'large'
  } else if (resultat === 'essaieEncore') {
    spanReponseLigne.innerHTML = '<em>Il faut saisir une longueur et une unité (cm par exemple).</em>'
    spanReponseLigne.style.color = '#f15929'
    spanReponseLigne.style.fontWeight = 'bold'
  } else {
    spanReponseLigne.innerHTML = '☹️'
    spanReponseLigne.style.fontSize = 'large'
  }
  if (resultat !== 'essaieEncore') champTexte.readOnly = true
  return resultat
}

function verifQuestionQcm (exercice, i) {
  let resultat
  const monRouge = 'rgba(217, 30, 24, 0.5)'
  const monVert = 'rgba(123, 239, 178, 0.5)'
  // i est l'indice de la question
  let nbBonnesReponses = 0
  let nbMauvaisesReponses = 0
  let nbBonnesReponsesAttendues = 0
  let indiceFeedback
  // Compte le nombre de réponses justes attendues
  for (let k = 0; k < exercice.autoCorrection[i].propositions.length; k++) {
    if (exercice.autoCorrection[i].propositions[k].statut) nbBonnesReponsesAttendues++
  }
  const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  exercice.autoCorrection[i].propositions.forEach((proposition, indice) => {
    const label = document.querySelector(`#labelEx${exercice.numeroExercice}Q${i}R${indice}`)
    const check = document.querySelector(`#checkEx${exercice.numeroExercice}Q${i}R${indice}`)
    if (proposition.statut) {
      label.style.backgroundColor = monVert
      if (check.checked) {
        nbBonnesReponses++
        indiceFeedback = indice
      }
    } else if (check.checked === true) {
      label.style.backgroundColor = monRouge
      nbMauvaisesReponses++
      indiceFeedback = indice
    }
  })
  let typeFeedback = 'positive'
  if (nbMauvaisesReponses === 0 && nbBonnesReponses === nbBonnesReponsesAttendues) {
    spanReponseLigne.innerHTML = '😎'
    resultat = 'OK'
  } else {
    spanReponseLigne.innerHTML = '☹️'
    typeFeedback = 'error'
    resultat = 'KO'
  }
  spanReponseLigne.style.fontSize = 'large'
  if (indiceFeedback > -1 && exercice.autoCorrection[i].propositions[indiceFeedback].feedback) {
    const eltFeedback = get(`feedbackEx${exercice.numeroExercice}Q${i}`, false)
    if (eltFeedback) eltFeedback.innerHTML = ''
    messageFeedback({
      id: `feedbackEx${exercice.numeroExercice}Q${i}`,
      message: exercice.autoCorrection[i].propositions[indiceFeedback].feedback,
      type: typeFeedback
    })
  }
  return resultat
}

function verifQuestionNumerique (exercice, i) {
  let spanReponseLigne, resultat
  if (i < exercice.nbQuestions) {
    spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  }
  // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
  const champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
  if (parseFloat(champTexte.value.replace(/\s/g, '').replace(/,/g, '.')) === exercice.autoCorrection[i].reponse.valeur[0]) {
    spanReponseLigne.innerHTML = '😎'
    resultat = 'OK'
  } else {
    spanReponseLigne.innerHTML = '☹️'
    resultat = 'KO'
  }
  champTexte.readOnly = true
  spanReponseLigne.style.fontSize = 'large'
  return resultat
}

function gestionCan (exercice) {
  for (let i = 0; i < exercice.nbQuestions; i++) {
    const button1question = document.querySelector(`#boutonVerifexercice${exercice.numeroExercice}Q${i}`)
    if (button1question) {
      if (!button1question.hasMathaleaListener) {
        button1question.addEventListener('click', () => {
          let resultat
          if (exercice.interactifType === 'mathLive') {
            resultat = verifQuestionMathLive(exercice, i)
          }
          if (exercice.interactifType === 'numerique') {
            resultat = verifQuestionNumerique(exercice, i)
          }
          if (exercice.interactifType === 'qcm') {
            resultat = verifQuestionQcm(exercice, i)
          }
          if (exercice.interactifType === 'cliqueFigure') {
            resultat = verifQuestionCliqueFigure(exercice, i)
          }
          if (exercice.interactifType === 'custom') {
            resultat = exercice.correctionInteractive(i)
          }
          // Mise en couleur du numéro de la question dans le menu du haut
          if (resultat === 'OK') {
            document.getElementById(`btnMenuexercice${exercice.numeroExercice}Q${i}`).classList.add('green')
            context.nbBonnesReponses++
          }
          if (resultat === 'KO') {
            document.getElementById(`btnMenuexercice${exercice.numeroExercice}Q${i}`).classList.add('red')
            context.nbMauvaisesReponses++
          }
          if (resultat === 'OK' || resultat === 'KO') {
            button1question.classList.add('disabled')
            if (exercicesCanRestants().length) {
              exercicesCanDispoApres().click()
            } else {
              afficheScoreCan(exercice, context.nbBonnesReponses, context.nbMauvaisesReponses)
            }
          }
        })
        button1question.hasMathaleaListener = true
      }
    }
  }
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceQcm (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    $('.ui.checkbox').checkbox()
    // Couleur pour surligner les label avec une opacité de 50%
    if (getVueFromUrl() === 'can') {
      gestionCan(exercice)
    }
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbQuestionsValidees = 0
          let nbQuestionsNonValidees = 0
          for (let i = 0; i < exercice.nbQuestions; i++) {
            const resultat = verifQuestionQcm(exercice, i)
            resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
          }
          const uichecks = document.querySelectorAll(`.ui.checkbox.ex${exercice.numeroExercice}`)
          uichecks.forEach(function (uicheck) {
            uicheck.classList.add('read-only')
          })
          button.classList.add('disabled')
          afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees)
        })
        button.hasMathaleaListener = true
      }
    }
  })
}

/**
 * @param {exercice}
 * @param {i} i indice de la question
 * @returns {object} {texte, texteCorr} le texte à ajouter pour la question traitée
 */
export function propositionsQcm (exercice, i) {
  let texte = ''
  let texteCorr = ''
  let espace = ''
  if (context.isHtml) {
    if (!exercice.interactif) return { texte: '', texteCorr: '' }
  } else {
    if (context.isAmc) return { texte: '', texteCorr: '' }
  }
  if (context.isHtml) {
    espace = '&emsp;'
  } else {
    espace = '\\qquad'
  }
  // Mélange les propositions du QCM sauf celles à partir de lastchoice (inclus)
  if (exercice.autoCorrection[i].options !== undefined) {
    if (!exercice.autoCorrection[i].options.ordered) {
      exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions, exercice.autoCorrection[i].options.lastChoice)
    }
  } else { // Si les options ne sont pas définies, on mélange
    exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions)
  }
  if (elimineDoublons(exercice.autoCorrection[i].propositions)) {
    console.log('doublons trouvés')
  }
  if (!context.isAmc) {
    if (context.isHtml) {
      texte += `<br>  <form id="formEx${exercice.numeroExercice}Q${i}">`
    } else {
      texte += '<br>'
    }
    for (let rep = 0; rep < exercice.autoCorrection[i].propositions.length; rep++) {
      if (context.isHtml) {
        texte += `<div class="ui checkbox ex${exercice.numeroExercice} monQcm">
            <input type="checkbox" tabindex="0" class="hidden" id="checkEx${exercice.numeroExercice}Q${i}R${rep}">
            <label id="labelEx${exercice.numeroExercice}Q${i}R${rep}">${exercice.autoCorrection[i].propositions[rep].texte + espace}</label>
          </div>`
      } else {
        texte += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      }
      if (exercice.autoCorrection[i].propositions[rep].statut) {
        texteCorr += `$\\blacksquare\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      } else {
        texteCorr += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      }
      if (exercice.autoCorrection[i].options !== undefined) {
        if (exercice.autoCorrection[i].options.vertical) {
          texte += '<br>'
          texteCorr += '<br>'
        }
      }
    }
    if (context.isHtml) {
      texte += `<span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
      texte += `\n<div id="feedbackEx${exercice.numeroExercice}Q${i}"></div></form>`
    }
  }
  return { texte: texte, texteCorr: texteCorr }
}

/**
 * prend un tableau de propositions [{texte: 'prop1', statut: true, feedback: 'Correct !'}, {texte: 'prop2', statut: false, ....}
 * élimine en cas de doublon la proposition fausse ou la deuxième proposition si elle sont toutes les deux fausses.
 * @author Jean-Claude Lhote
 */
export function elimineDoublons (propositions) { // fonction qui va éliminer les doublons si il y en a
  let doublonsTrouves = false
  for (let i = 0; i < propositions.length - 1; i++) {
    for (let j = i + 1; j < propositions.length;) {
      if (propositions[i].texte === propositions[j].texte) {
        // les réponses i et j sont les mêmes
        doublonsTrouves = true
        if (propositions[i].statut) { // si la réponse i est bonne, on vire la j
          propositions.splice(j, 1)
        } else if (propositions[j].statut) { // si la réponse i est mauvaise et la réponse j bonne,
          // comme ce sont les mêmes réponses, on vire la j mais on met la i bonne
          propositions.splice(j, 1)
          propositions[i].statut = true
        } else { // Les deux réponses sont mauvaises
          propositions.splice(j, 1)
        }
      } else {
        j++
      }
    }
  }
  return doublonsTrouves
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceNumerique (exercice) {
  // console.log('Dans ExerciceNumerique : ', exercice.nbQuestions, exercice.titre, exercice.numeroExercice, exercice.id)
  document.addEventListener('exercicesAffiches', () => {
    if (getVueFromUrl() === 'can') {
      gestionCan(exercice)
    }
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          for (const i in exercice.autoCorrection) {
            verifQuestionNumerique(exercice, i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
          }
          button.classList.add('disabled')
          afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
        })
        button.hasMathaleaListener = true
      }
    }
  })
}

export function exerciceCliqueFigure (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    if (getVueFromUrl() === 'can') {
      gestionCan(exercice)
    }
    // Dès que l'exercice est affiché, on rajoute des listenners sur chaque éléments de this.figures.
    for (let i = 0; i < exercice.nbQuestions; i++) {
      for (const objetFigure of exercice.figures[i]) {
        const figSvg = document.getElementById(objetFigure.id)
        if (figSvg) {
          if (!figSvg.hasMathaleaListener) {
            figSvg.addEventListener('mouseover', mouseOverSvgEffect)
            figSvg.addEventListener('mouseout', mouseOutSvgEffect)
            figSvg.addEventListener('click', mouseSvgClick)
            figSvg.etat = false
            figSvg.style.margin = '10px'
            figSvg.hasMathaleaListener = true
            // On enregistre que l'élément a déjà un listenner pour ne pas lui remettre le même à l'appui sur "Nouvelles Données"
          }
        }
      }
    }
    // Gestion de la correction
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          for (let i = 0; i < exercice.nbQuestions; i++) {
            verifQuestionCliqueFigure(exercice, i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
          }
          afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
        })
        button.hasMathaleaListener = true
      }
    }
  })
}

/**
 *
 * @param {Exercice} exercice
 * @param {number} i
 * @param {*} param2
 * @returns {string} code HTML du champ texte avec identifiant champTexteEx__Q__ et le span pour le résultat de la question
 */
export function ajouteChampTexte (exercice, i, { texte = '', texteApres = '', inline = true, numeric = true, indice } = {}) {
  if (context.isHtml && exercice.interactif) {
    return `<div class="ui form ${inline ? 'inline' : ''}" >
      <div class="inline  field" >
      <label>${texte}</label>
        <input type="text" ${numeric ? 'type="number" min="0" inputmode="numeric" pattern="[0-9]*"' : ''}  id="champTexteEx${exercice.numeroExercice}Q${i}${indice || ''}" >
        <span>${texteApres}</span>
        <span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>
      </div>
      </div>`
  } else {
    return ''
  }
}
export function ajouteChampTexteMathLive (exercice, i, style = '', { texteApres = '', texte = '' } = {}) {
  if (context.isHtml && exercice.interactif) {
    if (style === '') {
      return `<label>${texte}</label><math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>${texteApres ? '<span>' + texteApres + '</span>' : ''}<span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
    } else return `<label>${texte}</label><math-field virtual-keyboard-mode=manual class="${style}" id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>${texteApres ? '<span>' + texteApres + '</span>' : ''} <span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
  } else {
    return ''
  }
}

/**
 * Précise la réponse attendue
 * @param {'objet exercice'} exercice
 * @param {'numero de la question'} i
 * @param {'array || number'} a
 */
export function setReponse (exercice, i, valeurs, { digits = 0, decimals = 0, signe = false, exposantNbChiffres = 0, exposantSigne = false, approx = 0, formatInteractif = 'calcul' } = {}) {
  let reponses = []
  if (!Array.isArray(valeurs)) {
    reponses = [valeurs]
  } else {
    reponses = valeurs
    signe = valeurs < 0
  }
  if (exercice.autoCorrection[i] === undefined) {
    exercice.autoCorrection[i] = {}
  }
  if (exercice.autoCorrection[i].reponse === undefined) {
    exercice.autoCorrection[i].reponse = {}
  }
  exercice.autoCorrection[i].reponse.param = { digits: digits, decimals: decimals, signe: signe, exposantNbChiffres: exposantNbChiffres, exposantSigne: exposantSigne, approx: approx, formatInteractif }
  exercice.autoCorrection[i].reponse.valeur = reponses
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceCustom (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    if (getVueFromUrl() === 'can') {
      gestionCan(exercice)
    }
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
          let eltFeedback = get(`feedbackEx${exercice.numeroExercice}`, false)
          // On ajoute le div pour le feedback
          if (!eltFeedback) {
            const eltExercice = get(`exercice${exercice.numeroExercice}`)
            eltFeedback = addElement(eltExercice, 'div', { id: `feedbackEx${exercice.numeroExercice}` })
          }
          setStyles(eltFeedback, 'marginBottom: 20px')
          if (eltFeedback) eltFeedback.innerHTML = ''
          // On utilise la correction définie dans l'exercice
          for (let i = 0; i < exercice.nbQuestions; i++) {
            exercice.correctionInteractive(i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
          }
          afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
          button.classList.add('disabled')
        })
        button.hasMathaleaListener = true
      }
    }
  })
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses saisies dans les math-field
 * @param {object} exercice
 */
export function exerciceMathLive (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    if (getVueFromUrl() === 'can') {
      gestionCan(exercice)
    }
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          const besoinDe2eEssai = false
          let resultat
          for (const i in exercice.autoCorrection) {
            resultat = verifQuestionMathLive(exercice, i)
            if (resultat === 'OK') {
              nbBonnesReponses++
            } else {
              nbMauvaisesReponses++ // Il reste à gérer le 2e essai
            }
          }
          if (!besoinDe2eEssai) {
            button.classList.add('disabled')
            afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
          }
        })
        button.hasMathaleaListener = true
      }
    }
  })
}

// function neTientCompteQueDuDernierMembre (texte) {
//   const i = texte.lastIndexOf('=')
//   if (i > -1) {
//     return texte.substring(i + 1)
//   } else {
//     return texte
//   }
// }

function saisieToGrandeur (saisie) {
  const split = saisie.split('\\operatorname{')
  const mesure = parseFloat(split[0].replace(',', '.'))
  if (split[1]) {
    // const unite = split[1].substring(0, split[1].length - 1)
    const split2 = split[1].split('}')
    const unite = split2[0] + split2[1]
    return new Grandeur(mesure, unite)
  } else {
    return false
  }
}

/**
 * @author Sébastien LOZANO
 * @param {object} exercice
 * @param {number} nbBonnesReponses
 * @param {number} nbMauvaisesReponses
 */

function isUserIdOk (exercice, nbBonnesReponses, nbMauvaisesReponses) {
  // TODO
  // => OK => vérifier si le paramètre existe dans l'url
  // il a pu être entré manuellement
  // agir en fonction pour les enregistrements
  const userId = getUserIdFromUrl() // ne renvoit pas ce que je veux, en fait si ??? bizarre
  // const str = window.location.href
  // const url = new URL(str)
  // const userId = url.searchParams.get('userId')
  async function myThirdScoresManageFetch () {
    const response = await fetch('scoresManage.php', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Booléen pour savoir si on crée un espace ou si on en crée un nouveau
        isSubmitUserId: false,
        isVerifResult: true,
        userId: userId,
        prof1: userId[0],
        prof2: userId[1],
        prof3: userId[2],
        classe1: userId[3],
        classe2: userId[4],
        eleve1: userId[5],
        eleve2: userId[6],
        // eslint-disable-next-line no-unneeded-ternary
        isCan: getVueFromUrl() === 'can' ? 'oui' : 'non',
        urlExos: document.location.href + '&serie=' + context.graine,
        exId: exercice.id,
        sup: exercice.sup,
        sup2: exercice.sup2,
        sup3: exercice.sup3,
        nbBonnesReponses: nbBonnesReponses,
        nbQuestions: nbBonnesReponses + nbMauvaisesReponses,
        score: nbBonnesReponses / (nbBonnesReponses + nbMauvaisesReponses) * 100
      })
    })
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`)
    }
  }
  // eslint-disable-next-line no-unused-expressions
  userId === null
    ? (
        console.log('userId KO : ' + userId)
      )
    : (
        console.log('userId OK : ' + userId),
        myThirdScoresManageFetch()
          .catch(e => {
            console.log('/!\\ thirdScoresManage.php /!\\ Pb avec l\'opération de récupération sûrement en dev local sans serveur PHP, message d\'erreur => ' + e.message)
          })
      )
}

export function afficheScore (exercice, nbBonnesReponses, nbMauvaisesReponses) {
  if (context.timer) {
    clearInterval(context.timer)
    // ToDo à sauvegarder dans les résultats
    // const tempsRestant = document.getElementById('timer').innerText
  }
  const divExercice = get(`exercice${exercice.numeroExercice}`)
  let divScore = get(`score${exercice.numeroExercice}`, false)
  // Appel Fecth via une fonction est-ce que c'est ça qui multiplie les appels ?
  isUserIdOk(exercice, nbBonnesReponses, nbMauvaisesReponses)
  if (!divScore) divScore = addElement(divExercice, 'div', { className: 'score', id: `score${exercice.numeroExercice}` })
  divScore.innerHTML = `${nbBonnesReponses} / ${nbBonnesReponses + nbMauvaisesReponses}`
  divScore.style.color = '#f15929'
  divScore.style.fontWeight = 'bold'
  divScore.style.fontSize = 'x-large'
  divScore.style.display = 'inline'
  if (context.vue === 'eval') {
    const divCorr = get(`divexcorr${exercice.numeroExercice}`)
    divCorr.style.display = 'block'
    const divBoutonExercice = get(`btnEx${exercice.numeroExercice + 1}`)
    divBoutonExercice.classList.add('green')
    const divExercice = get(`exercice${exercice.numeroExercice}`)
    if (exercicesEvalRestants()[0]) {
      const btnExerciceSuivant = addElement(divExercice, 'button', { id: 'btnSuivant', class: 'ui blue button', style: 'display: block' }, 'Exercice suivant')
      btnExerciceSuivant.focus()
      if (!btnExerciceSuivant.hasMathaleaListener) {
        btnExerciceSuivant.addEventListener('click', () => {
          exercicesEvalRestants()[0].click()
        })
        btnExerciceSuivant.hasMathaleaListener = true
      }
    }
  }
}
export function afficheScoreCan (exercice, nbBonnesReponses, nbMauvaisesReponses) {
  // const exercice = { id: 'can', sup: document.location.href + 'serie=' + context.graine }
  const divScore = addElement(document.querySelector('#menuEval'), 'div', { className: 'score', id: 'scoreTotal' })
  divScore.innerHTML = `Résultat : ${nbBonnesReponses} / ${nbBonnesReponses + nbMauvaisesReponses}`
  // Arrête le timer
  if (context.timer) {
    clearInterval(context.timer)
    // ToDo à sauvegarder dans les résultats
    // const tempsRestant = document.getElementById('timer').innerText
  }
  divScore.style.color = '#f15929'
  divScore.style.fontWeight = 'bold'
  divScore.style.fontSize = 'xx-large'
  divScore.style.marginTop = '20px'
  document.querySelectorAll('[id^=divexcorr]').forEach(e => {
    e.style.display = 'block'
  })
  const divCorr = get('corrections')
  divCorr.style.display = 'block'
  document.getElementById('btnMenuexercice0Q0').click()
  isUserIdOk(exercice, nbBonnesReponses, nbMauvaisesReponses)
}

const exercicesEvalRestants = () => document.querySelectorAll('[id ^= "btnEx"].circular.ui.button:not(.green):not(.red)')
const exercicesCanRestants = () => document.querySelectorAll('[id ^= "btnMenuexercice"].circular.ui.button:not(.green):not(.red)')
const exercicesCanDispoApres = () => {
  const liste = Array.from(document.querySelectorAll('[id^=btnMenu]'))
  for (let i = parseInt(context.questionCanEnCours); i < liste.length; i++) {
    if (!liste[i].classList.contains('red') && !liste[i].classList.contains('green')) {
      return liste[i]
    }
  }
  return exercicesCanRestants()[0]
}
