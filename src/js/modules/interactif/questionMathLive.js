import { ComputeEngine, parse } from '@cortex-js/math-json'
import FractionEtendue from '../FractionEtendue.js'
import { number } from 'mathjs'
import Grandeur from '../Grandeur.js'
import { context } from '../context.js'
import { afficheScore } from '../gestionInteractif.js'
import { gestionCan } from './gestionCan.js'
import { sp } from '../outils.js'

export function verifQuestionMathLive (exercice, i) {
  const engine = new ComputeEngine()
  let saisieParsee, signeF, num, den, fSaisie
  const formatInteractif = exercice.autoCorrection[i].reponse.param.formatInteractif
  const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
  let reponse, champTexte, champTexteNum, champTexteDen, saisie, nombreSaisi, grandeurSaisie, mantisseSaisie, expoSaisi, nombreAttendu, mantisseReponse, expoReponse
  let reponses = []
  if (!Array.isArray(exercice.autoCorrection[i].reponse.valeur)) {
    reponses = [exercice.autoCorrection[i].reponse.valeur]
  } else {
    reponses = exercice.autoCorrection[i].reponse.valeur
  }
  let resultat = 'KO'
  let ii = 0
  while ((resultat === 'KO') & (ii < reponses.length)) {
    reponse = reponses[ii]
    switch (formatInteractif) {
      case 'Num':
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        if (champTexte !== undefined) num = parseInt(champTexte.value)
        if (isNaN(num) || num === undefined) num = 9999
        den = reponse.den
        fSaisie = new FractionEtendue(num, den)
        if (fSaisie.isEqual(reponse)) {
          resultat = 'OK'
        }
        break
      case 'Den':
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        if (champTexte !== undefined) den = parseInt(champTexte.value)
        if (isNaN(den) || den === undefined) den = 9999
        num = reponse.num
        fSaisie = new FractionEtendue(num, den)
        if (fSaisie.isEqual(reponse)) {
          resultat = 'OK'
        }
        break
      case 'calcul':
        // Le format par défaut
      // Pour le calcul littéral on remplace dfrac en frac
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
        if (typeof reponse === 'string') {
          reponse = reponse.replaceAll('dfrac', 'frac')
        // A réfléchir, est-ce qu'on considère que le début est du brouillon ?
        // saisie = neTientCompteQueDuDernierMembre(saisie)
        }
        // Pour le calcul numérique, on transforme la saisie en nombre décimal
        if (typeof reponse === 'number' || typeof reponse === 'string') {
          saisie = saisie.toString().replace(',', '.')
          reponse = reponse.toString().replace(',', '.')
          saisie = saisie.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
        }
        if (engine.same(engine.canonical(parse(saisie)), engine.canonical(parse(reponse)))) {
          resultat = 'OK'
        }
        break
      case 'ecritureScientifique': // Le résultat, pour être considéré correct, devra être saisi en écriture scientifique
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
        if (typeof reponse === 'string') {
          saisie = saisie.toString().replace(',', '.')
          reponse = reponse.replace(',', '.').replace('{.}', '.')
        }
        if (engine.same(engine.canonical(parse(saisie)), engine.canonical(parse(reponse)))) {
          saisie = saisie.split('\\times')
          if (number(saisie[0]) >= 1 & number(saisie[0]) < 10) { resultat = 'OK' }
        }
        break

      case 'texte':
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
        if (saisie === reponse) {
          resultat = 'OK'
        }
        break

      case 'ignorerCasse':
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
        if (saisie.toLowerCase() === reponse.toLowerCase()) {
          resultat = 'OK'
        // Pour les exercices de simplifications de fraction
        }
        break
      case 'fractionPlusSimple':
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
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
            // fSaisie = new FractionEtendue(parseInt(saisieParsee[1].num), parseInt(saisieParsee[2].num))
            fSaisie = parseInt(saisieParsee[2].num) === 1 ? new FractionEtendue(signeF * parseFloat(saisieParsee[1].num)) : new FractionEtendue(signeF * parseFloat(saisieParsee[1].num), parseInt(saisieParsee[2].num))
            if (fSaisie.estUneSimplification(reponse)) resultat = 'OK'
          }
        }
        break
      case 'fractionEgale': // Pour les exercices de calcul où on attend une fraction peu importe son écriture (3/4 ou 300/400 ou 30 000/40 000...)
        // Si l'utilisateur entre un nombre décimal n, on transforme en n/1
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
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
            fSaisie = parseInt(saisieParsee[2].num) === 1 ? new FractionEtendue(signeF * parseFloat(saisieParsee[1].num)) : new FractionEtendue(signeF * parseFloat(saisieParsee[1].num), parseInt(saisieParsee[2].num))
            // fSaisie = new FractionEtendue(signeF * parseFloat(saisieParsee[1].num), parseInt(saisieParsee[2].num))
            if (fSaisie.isEqual(reponse)) resultat = 'OK'
          } else {
            window.notify('QuestionMathLive fractionEgale : problème avec la sortie de parse()', { saisie, saisieParsee })
          }
        }
        break
      case 'fraction': // Pour les exercices où l'on attend un écriture donnée d'une fraction
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
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
            // fSaisie = new FractionEtendue(signeF * parseInt(saisieParsee[1].num), parseInt(saisieParsee[2].num))
            fSaisie = parseInt(saisieParsee[2].num) === 1 ? new FractionEtendue(signeF * parseFloat(saisieParsee[1].num)) : new FractionEtendue(signeF * parseFloat(saisieParsee[1].num), parseInt(saisieParsee[2].num))
            if (fSaisie.texFSD === reponse.texFSD) resultat = 'OK'
          }
        }
        break
      case 'longueur': // Pour les exercices où l'on attend une mesure avec une unité au choix
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
        grandeurSaisie = saisieToGrandeur(saisie)
        if (grandeurSaisie) {
          if (grandeurSaisie.estEgal(reponse)) resultat = 'OK'
        } else {
          resultat = 'essaieEncoreLongueur'
        }
        break
      case 'intervalleStrict':// Pour les exercice où la saisie doit être dans un intervalle
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''

        nombreSaisi = Number(saisie.replace(',', '.'))
        if (saisie !== '' && nombreSaisi > exercice.autoCorrection[i].reponse.valeur[0] && nombreSaisi < exercice.autoCorrection[i].reponse.valeur[1]) resultat = 'OK'
        break
      case 'intervalle' :
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''
        nombreSaisi = Number(saisie.replace(',', '.'))
        if (saisie !== '' && nombreSaisi >= exercice.autoCorrection[i].reponse.valeur[0] && nombreSaisi <= exercice.autoCorrection[i].reponse.valeur[1]) resultat = 'OK'
        break
      case 'puissance' :
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
        saisie = champTexte !== undefined ? champTexte.value : ''

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
  if (resultat === 'OK') {
    spanReponseLigne.innerHTML = '😎'
    spanReponseLigne.style.fontSize = 'large'
    if (champTexte !== undefined) champTexte.readOnly = true
    if (champTexteNum !== undefined) champTexteNum.readOnly = true
    if (champTexteDen !== undefined) champTexteDen.readOnly = true
  } else if (resultat === 'essaieEncoreLongueur') {
    spanReponseLigne.innerHTML = '<em>Il faut saisir une valeur numérique et une unité (cm ou cm² par exemple).</em>'
    spanReponseLigne.style.color = '#f15929'
    spanReponseLigne.style.fontWeight = 'bold'
  } else if (resultat === 'essaieEncorePuissance') {
    spanReponseLigne.innerHTML = '<br><em>Attention, la réponse est mathématiquement correcte mais n\'a pas le format demandé.</em>'
    spanReponseLigne.style.color = '#f15929'
    spanReponseLigne.style.fontWeight = 'bold'
  } else {
    spanReponseLigne.innerHTML = '☹️'
    spanReponseLigne.style.fontSize = 'large'
    if (champTexte !== undefined) champTexte.readOnly = true
    if (champTexteNum !== undefined) champTexteNum.readOnly = true
    if (champTexteDen !== undefined) champTexteDen.readOnly = true
  }
  return resultat
}

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
 * Si les deux champs sont à saisir, on utilise deux réponse de formatInteractif 'calcul'.
 */
export function ajouteChampFractionMathLive (exercice, i, numerateur = false, denominateur = 100, style = '', { texte = '', texteApres = '' } = {}) {
  let code = ''
  if (context.isHtml && exercice.interactif) {
    code += `<label>${texte}</label><table style="border-collapse:collapse;text-align:center;font-size: small;font-family:Arial,Times,serif;display:inline;"><tr><td style="padding:0px 0px 5px;margin:0px;border-bottom:1px solid #000;">`
    if (!numerateur) {
      code += `<math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field></td><td><span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
      i++
    } else {
      code += `${numerateur} `
    }
    code += '</td></tr><tr><td width=50px style="padding:0px;margin:0px;">'
    if (!denominateur) {
      code += `<math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field></td><td><span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
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
    }
  })
}
