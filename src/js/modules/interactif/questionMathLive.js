
import FractionX from '../FractionEtendue.js'
import { number } from 'mathjs'
import { context } from '../context.js'
import { gestionCan } from './gestionCan.js'
import { texteExposant } from '../../modules/outils/ecritures.js'
import { afficheScore } from '../../modules/gestionInteractif.js'
import { sp } from '../../modules/outils/contextSensitif.js'
import Grandeur from '../../modules/Grandeur.js'
import * as pkg from '@cortex-js/compute-engine'
const { ComputeEngine } = pkg
export function verifQuestionMathLive (exercice, i, writeResult = true) {
  const engine = new ComputeEngine()
  let saisieParsee, num, den, fSaisie, fReponse
  const formatInteractif = exercice.autoCorrection[i].reponse.param.formatInteractif
  const precision = exercice.autoCorrection[i].reponse.param.precision
  const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
  let reponse, saisie, nombreSaisi, grandeurSaisie, mantisseSaisie, expoSaisi, nombreAttendu, mantisseReponse, expoReponse
  let reponses = []
  let champTexte
  if (!Array.isArray(exercice.autoCorrection[i].reponse.valeur)) {
    reponses = [exercice.autoCorrection[i].reponse.valeur]
  } else {
    reponses = exercice.autoCorrection[i].reponse.valeur
  }
  try {
    // Ici on va s'occuper de ce champTexte qui pose tant de problèmes
    champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
    if (champTexte === {} || champTexte === undefined) champTexte = { value: '' }
    let resultat = 'KO'
    let statut = 'OK'
    let feedbackSaisie
    let feedbackCorrection
    let ii = 0
    while ((resultat === 'KO') && (ii < reponses.length)) {
      reponse = reponses[ii]
      switch (formatInteractif) {
        case 'Num':
          num = parseInt(champTexte.value.replace(',', '.'))
          if (isNaN(num) || num === undefined) num = 9999
          den = reponse.den
          fSaisie = new FractionX(num, den)
          if (fSaisie.isEqual(reponse)) {
            resultat = 'OK'
          }
          break
        case 'Den':
          den = parseInt(champTexte.value.replace(',', '.'))
          if (isNaN(den) || den === undefined) den = 9999
          num = reponse.num
          fSaisie = new FractionX(num, den)
          if (fSaisie.isEqual(reponse)) {
            resultat = 'OK'
          }
          break
        case 'calcul':
        // Le format par défaut
          saisie = champTexte.value.replaceAll(',', '.') // EE : Le All est nécessaire pour l'usage du clavier spécial 6ème
          // La réponse est transformée en chaine compatible avec engine.parse()
          reponse = reponse.toString().replaceAll(',', '.').replaceAll('dfrac', 'frac')
          saisie = saisie.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
          // console.log('saisie : ', saisie) // EE : NE PAS SUPPRIMER CAR UTILE POUR LE DEBUGGAGE
          // console.log('reponse : ', reponse) // EE : NE PAS SUPPRIMER CAR UTILE POUR LE DEBUGGAGE
          if (engine.parse(reponse).canonical.isSame(engine.parse(saisie).canonical)) {
            resultat = 'OK'
          }
          break
        case 'nombreDecimal':
          saisie = champTexte.value.replace(',', '.')
          // La réponse est ici arrondie en fonction de reponse.param.decimals
          reponse = Number(reponse.toString().replaceAll(',', '.')).toFixed(exercice.autoCorrection[i].reponse.param.decimals)
          saisie = saisie.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
          if (engine.parse(reponse).isSame(engine.parse(saisie))) {
            resultat = 'OK'
          }
          break
        case 'ecritureScientifique': // Le résultat, pour être considéré correct, devra être saisi en écriture scientifique
          saisie = champTexte.value.replace(',', '.')
          if (typeof reponse === 'string') {
            reponse = reponse.replace(',', '.').replace('{.}', '.')
          }
          if (engine.parse(reponse).canonical.isSame(engine.parse(saisie).canonical)) {
            saisie = saisie.split('\\times')
            if (number(saisie[0]) >= 1 && number(saisie[0]) < 10) { resultat = 'OK' }
          }
          break
        case 'texte':

          if (champTexte !== undefined) saisie = champTexte.value
          else saisie = ''
          // console.log({ saisie, reponse}) // EE : NE PAS SUPPRIMER CAR UTILE POUR LE DEBUGGAGE
          if (saisie === reponse) {
            resultat = 'OK'
          } else if (saisie.replaceAll('\\,', '') === reponse.replaceAll('\\,', '')) {
            feedbackCorrection = 'Attention aux espaces !'
          }
          break

        case 'ignorerCasse':
          saisie = champTexte.value
          if (saisie.toLowerCase() === reponse.toLowerCase()) {
            resultat = 'OK'
            // Pour les exercices de simplifications de fraction
          }
          break
        case 'fractionPlusSimple':
          saisie = champTexte.value.replace(',', '.')
          if (!isNaN(parseFloat(saisie))) {
            saisieParsee = engine.parse(`\\frac{${saisie}}{1}`).canonical
          } else {
            saisieParsee = engine.parse(saisie)
          }
          fReponse = engine.parse(reponse.texFSD.replace('dfrac', 'frac'))
          if (saisieParsee.isEqual(fReponse) && saisieParsee.json[1] < fReponse.json[1]) resultat = 'OK'
          break
        case 'fractionEgale': // Pour les exercices de calcul où on attend une fraction peu importe son écriture (3/4 ou 300/400 ou 30 000/40 000...)
        // Si l'utilisateur entre un nombre décimal n, on transforme en n/1
          saisie = champTexte.value.replace(',', '.') // On remplace la virgule éventuelle par un point.
          if (!isNaN(parseFloat(saisie))) {
            const newFraction = new FractionX(parseFloat(saisie))
            saisieParsee = engine.parse(`${newFraction.toLatex().replace('dfrac', 'frac')}`).canonical
          } else {
            saisieParsee = engine.parse(saisie).canonical
          }
          fReponse = engine.parse(reponse.texFSD.replace('dfrac', 'frac')).canonical
          if (saisieParsee) {
            if (saisieParsee.isEqual(fReponse)) resultat = 'OK'
          }
          break
        case 'fraction': // Pour les exercices où l'on attend un écriture donnée d'une fraction
          saisie = champTexte.value.replace(',', '.')
          if (!isNaN(parseFloat(saisie))) {
            saisieParsee = engine.parse(new FractionX(saisie, 1).texFSD)
          } else {
            saisieParsee = engine.parse(saisie.replace('frac', 'dfrac').replace('ddfrac', 'dfrac'))
          }
          fReponse = engine.parse(reponse.texFSD)
          if (saisieParsee.isEqual(fReponse)) resultat = 'OK'
          break
        case 'unites': // Pour les exercices où l'on attend une mesure avec une unité au choix
          saisie = champTexte.value.replace('²', '^2').replace('³', '^3')
          grandeurSaisie = saisieToGrandeur(saisie)
          if (grandeurSaisie) {
            if (grandeurSaisie.estEgal(reponse)) resultat = 'OK'
            else if (precision && grandeurSaisie.estUneApproximation(reponse, precision)) feedbackCorrection = 'Erreur d\'arrondi.'
          } else {
            if ((saisie === '') || isNaN(parseFloat(saisie.replace(',', '.')))) {
              resultat = 'KO'
            } else {
              resultat = 'essaieEncoreAvecUneSeuleUnite'
            }
          }
          break
        case 'intervalleStrict':// Pour les exercice où la saisie doit être dans un intervalle
          saisie = champTexte.value.replace(',', '.')
          nombreSaisi = Number(saisie)
          if (saisie !== '' && nombreSaisi > exercice.autoCorrection[i].reponse.valeur[0] && nombreSaisi < exercice.autoCorrection[i].reponse.valeur[1]) resultat = 'OK'
          break
        case 'intervalle' :
          saisie = champTexte.value.replace(',', '.')
          nombreSaisi = Number(saisie)
          if (saisie !== '' && nombreSaisi >= exercice.autoCorrection[i].reponse.valeur[0] && nombreSaisi <= exercice.autoCorrection[i].reponse.valeur[1]) resultat = 'OK'
          break
        case 'puissance' :
          saisie = champTexte.value.replace(',', '.')
          // formatOK et formatKO sont deux variables globales,
          // sinon dans le cas où reponses est un tableau, la valeur n'est pas conservée d'un tour de boucle sur l'autre
          // eslint-disable-next-line no-var
          var formatOK, formatKO
          if (saisie.indexOf('^') !== -1) {
            nombreSaisi = saisie.split('^')
            mantisseSaisie = nombreSaisi[0]
            expoSaisi = nombreSaisi[1] ? nombreSaisi[1].replace(/[{}]/g, '') : ''
            nombreAttendu = reponse.split('^')
            mantisseReponse = nombreAttendu[0]
            expoReponse = nombreAttendu[1] ? nombreAttendu[1].replace(/[{}]/g, '') : ''
            if (mantisseReponse === mantisseSaisie && expoReponse === expoSaisi) {
              formatOK = true
            }
            // gérer le cas mantisse négative a et exposant impair e, -a^e est correct mais pas du format attendu
            // si la mantisse attendue est négative on nettoie la chaine des parenthèses
            if (parseInt(mantisseReponse.replace(/[()]/g, '')) < 0 && expoReponse % 2 === 1) {
              if ((saisie === `${mantisseReponse.replace(/[()]/g, '')}^{${expoReponse}}`) || (saisie === `${mantisseReponse.replace(/[()]/g, '')}^${expoReponse}`)) {
                formatKO = true
              }
            }
            // si l'exposant est négatif, il se peut qu'on ait une puissance au dénominateur
            if (parseInt(expoReponse) < 0) {
              // Si la mantisse est positive
              if ((saisie === `\\frac{1}{${parseInt(mantisseReponse)}^{${-expoReponse}}`) || (saisie === `\\frac{1}{${parseInt(mantisseReponse)}^${-expoReponse}}`)) {
                formatKO = true
              }
            }
          } else {
          // Dans tous ces cas on est sûr que le format n'est pas bon
          // Toutefois la valeur peut l'être donc on vérifie
            nombreSaisi = saisie
            nombreAttendu = reponse.split('^')
            mantisseReponse = nombreAttendu[0]
            expoReponse = nombreAttendu[1] ? nombreAttendu[1].replace(/[{}]/g, '') : ''
            if (parseInt(expoReponse) < 0) {
              // Si la mantisse est positive
              if (nombreSaisi === `\\frac{1}{${mantisseReponse ** (-expoReponse)}}`) {
                formatKO = true
              }
              // Si elle est négative, le signe - peut être devant la fraction ou au numérateur  ou au dénominateur
              if (parseInt(mantisseReponse.replace(/[()]/g, '')) < 0 && ((-expoReponse) % 2 === 1)) {
                if ((nombreSaisi === `-\\frac{1}{${((-1) * parseInt(mantisseReponse.replace(/[()]/g, ''))) ** (-expoReponse)}}`) || (nombreSaisi === `\\frac{-1}{${((-1) * parseInt(mantisseReponse.replace(/[()]/g, ''))) ** (-expoReponse)}}`) || (nombreSaisi === `\\frac{1}{-${((-1) * parseInt(mantisseReponse.replace(/[()]/g, ''))) ** (-expoReponse)}}`)) {
                  formatKO = true
                }
              }
            }
            if (parseInt(expoReponse) > 0) {
              if (nombreSaisi === `${mantisseReponse ** (expoReponse)}`) {
                formatKO = true
              }
            }
            if (parseInt(expoReponse) === 0) {
              if (nombreSaisi === '1') {
                formatKO = true
              }
            }
          }
          if (formatOK) {
            resultat = 'OK'
          }
          if (formatKO) {
            resultat = 'essaieEncorePuissance'
          }
          // if (mantisseReponse === mantisseSaisie && expoReponse === expoSaisi) {
          //   resultat = 'OK'
          // } else {
          //   resultat = 'KO'
          // }

          break
      }
      ii++
    }
    spanReponseLigne.innerHTML = ''
    if (resultat === 'OK' && writeResult) {
      spanReponseLigne.innerHTML = '😎'
      spanReponseLigne.style.fontSize = 'large'
      if (champTexte !== undefined) champTexte.readOnly = true
    } else if (resultat === 'essaieEncoreAvecUneSeuleUnite') {
      spanReponseLigne.innerHTML = '<em>Il faut saisir une valeur numérique et une seule unité (' +
    (reponse.uniteDeReference.indexOf('^') > 0
      ? reponse.uniteDeReference.split('^')[0] + texteExposant(reponse.uniteDeReference.split('^')[1])
      : reponse.uniteDeReference) +
    ' par exemple).</em>'
      spanReponseLigne.style.color = '#f15929'
      spanReponseLigne.style.fontWeight = 'bold'
      statut = 'wait'
    } else if (resultat === 'essaieEncorePuissance') {
      spanReponseLigne.innerHTML = '<br><em>Attention, la réponse est mathématiquement correcte mais n\'a pas le format demandé.</em>'
      spanReponseLigne.style.color = '#f15929'
      spanReponseLigne.style.fontWeight = 'bold'
    } else if (writeResult) {
      spanReponseLigne.innerHTML = '☹️'
      spanReponseLigne.style.fontSize = 'large'
      if (champTexte !== undefined) champTexte.readOnly = true
    }
    if (feedbackSaisie) spanReponseLigne.innerHTML += `<span style="margin-left: 10px">${feedbackSaisie}</span>`
    if (feedbackCorrection && writeResult) spanReponseLigne.innerHTML += `<span style="margin-left: 10px">${feedbackCorrection}</span>`
    return { resultat, statut }
  } catch (error) {
    window.notify(`Erreur dans verif QuestionMathLive : ${error} <br> Avec les métadonnées : `, { champTexteValue: champTexte._slotValue, exercice: exercice.id, i, autoCorrection: exercice.autoCorrection[i], formatInteractif, spanReponseLigne })
  }
}

function saisieToGrandeur (saisie) {
  if (saisie.indexOf('°') > 0) {
    const split = saisie.split('°')
    return new Grandeur(parseFloat(split[0].replace(',', '.')), '°')
  }
  if (saisie.split('operatorname').length !== 2) { return false } else {
    const split = saisie.split('\\operatorname{')
    const mesure = parseFloat(split[0].replace(',', '.'))
    if (split[1]) {
      const split2 = split[1].split('}')
      const unite = split2[0] + split2[1]
      return new Grandeur(mesure, unite)
    } else {
      return false
    }
  }
}

export function ajouteChampTexteMathLive (exercice, i, style = '', { texteApres = '', texte = '', tailleExtensible = false } = {}) {
  if (context.isHtml && exercice.interactif) {
    if (style === '') {
      return `<label>${texte}</label><math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>${texteApres ? '<span>' + texteApres + '</span>' : ''}<span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
    } else if (tailleExtensible) {
      return `<label>${sp()}${texte}${sp()}</label><table style="text-align:center;font-size: small;font-family:Arial,Times,serif;display:inline;height:1px;"><tr><td style="position: relative; top: 27px; left: 0px;padding:0px 0px 5px;margin:0px"><math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>${texteApres ? '<span>' + texteApres + '</span>' : ''} </td></tr></table><span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
    } else return `<label>${texte}</label><math-field virtual-keyboard-mode=manual class="${style}" id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>${texteApres ? '<span>' + texteApres + '</span>' : ''} <span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
  } else {
    return ''
  }
}

/** Crée une fraction avec 1 ou 2 champs de réponse et autant de feedbacks.
 * Si seul le numérateur ou le dénominateur sont utilisés pour la fraction, l'autre est précisé.
 * numerateur = false signifie qu'il y a un champ de saisie pour le numérateur.
 * denominateur = 100 signifie que le dénominateur est déjà renseigné à 100.
 * Dans ce cas, on utilise le format Interactif correspondant : 'Num' ou 'Den'
 * Si les deux champs sont à saisir, on utilise deux réponses de formatInteractif 'calcul'.
 */
export function ajouteChampFractionMathLive (exercice, i, numerateur = false, denominateur = 100, style = '', { texte = '', texteApres = '' } = {}) {
  let code = ''
  if (context.isHtml && exercice.interactif) {
    code += `<label>${texte}</label>
             <table style="border-collapse:collapse;text-align:center;font-size: small;font-family:Arial,Times,serif;display:inline;"><tr>
             <td style="${!numerateur ? style : ''} ;padding:0px 0px 5px;margin:0px;border-bottom:1px solid #000;">`
    if (!numerateur) {
      code += `<math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>
              </td><td><span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
      i++
    } else {
      code += `${numerateur} `
    }
    code += `</td></tr><tr>
             <td width=50px style="padding:0px;margin:0px;">`
    if (!denominateur) {
      code += `<math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field>
              </td><td><span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
    } else {
      code += `${denominateur}`
    }
    code += `</td></tr></table> ${texteApres ? '<span>' + texteApres + '</span>' : ''}`
    return code
  } else {
    return ''
  }
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses saisies dans les math-field
 * @param {object} exercice
 */
export function exerciceMathLive (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On vérifie le type si jamais il a été changé après la création du listenner (voir 5R20)
    if (exercice.interactifType === 'mathLive') {
      if (context.vue === 'can') {
        gestionCan(exercice)
      }
      const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
      if (button) {
        if (!button.hasMathaleaListener) {
          button.addEventListener('click', event => {
            let nbBonnesReponses = 0
            let nbMauvaisesReponses = 0
            let besoinDe2eEssai = false
            let resultat
            let wait = false
            for (const i in exercice.autoCorrection) {
              if (verifQuestionMathLive(exercice, i, false).statut === 'wait') wait = true
            }
            if (!wait) {
              for (const i in exercice.autoCorrection) {
                if (verifQuestionMathLive(exercice, i).statut) { resultat = verifQuestionMathLive(exercice, i).resultat }
                if (resultat === 'OK') {
                  nbBonnesReponses++
                } else if (resultat === 'wait') {
                  besoinDe2eEssai = true
                } else {
                  nbMauvaisesReponses++ // Il reste à gérer le 2e essai
                }
              }
              if (!besoinDe2eEssai) {
                button.classList.add('disabled')
                afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
              }
            }
          })
          button.hasMathaleaListener = true
        }
      }
    }
  })
}
