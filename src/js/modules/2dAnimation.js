/**
 * Rend visible un element d'après son id
 * @param {number} id id propre à un objet MathALEA2d
 * @example montrerParDiv(s2.id) // Affiche l'objet s2
 * @author Rémi Angot
 */

import { affiniteOrtho, homothetie, symetrieAxiale } from './2d.js'
import { ObjetMathalea2D } from './2dGeneralites.js'

// JSDOC Validee par EE Juin 2022
export function montrerParDiv (id) {
  if (document.getElementById(id)) {
    document.getElementById(id).style.visibility = 'visible'
  } else {
    console.log(id + ' n\'existe pas et ne peut pas être rendu visible.')
  }
}

/**
   * Rend invisible un element d'après son id
   * @param {number} id id propre à un objet MathALEA2d
   * @example cacherParDiv(s2.id) // Cache l'objet s2
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function cacherParDiv (id) {
  if (document.getElementById(id)) {
    document.getElementById(id).style.visibility = 'hidden'
  } else {
    console.log(id + ' n\'existe pas et ne peut pas être caché.')
  }
}

/**
   * Masque un objet pendant t0 secondes puis l'affiche pendant (t-t0) secondes avant de recommencer r fois ce cycle en tout
   * @param {ObjetMathalea2D} objet Objet MathALEA2d masqué puis affiché
   * @param {number} [t0=1] Temps en secondes avant l'apparition.
   * @param {number} [t=5] Temps à partir duquel l'animation recommence.
   * @param {string} [r='Infinity'] Nombre de répétitions (infini si ce n'est pas un nombre).
   * @example afficherTempo(ob1)
   * // Affiche ob1 au bout de 1 seconde, pendant 4 secondes puis le masque. Ce cycle est répété indéfiniment.
   * @example afficherTempo(ob1,2,9,10)
   * // Sur un cycle de 9 secondes, affiche ob1 au bout de 2 seconde puis le masque en fin de cycle. Ce cycle est répété 10 fois.
   */
// JSDOC Validee par EE Juin 2022
export function afficherTempo (objet, t0 = 1, t = 5, r = 'Infinity') {
  let compteur = 1 // Nombre d'animations
  const checkExist = setInterval(function () {
    if (document.getElementById(objet.id)) {
      clearInterval(checkExist)
      cacherParDiv(objet.id)
      if (r === 1) { // On le montre au bout de t0 et on ne le cache plus
        setTimeout(function () { montrerParDiv(objet.id) }, t0 * 1000)
      } else {
        const cacheRepete = setInterval(function () { cacherParDiv(objet.id) }, t * 1000) // On cache tous les t s
        setTimeout(function () {
          montrerParDiv(objet.id) // On attend t0 pour montrer
          const montreRepete = setInterval(function () {
            montrerParDiv(objet.id)
            compteur++
            if (typeof r === 'number') {
              if (compteur >= r) {
                clearInterval(cacheRepete)
                clearInterval(montreRepete)
              }
            }
          }, t * 1000) // On montre tous les t s (vu qu'on a décalé de t0)
        }, t0 * 1000) // Fin de l'animation en boucle
      }
    }
  }, 100) // vérifie toutes les  100ms que le div existe
}

/**
   * Affiche un objet pendant t0 secondes puis le cache pendant (t-t0) secondes avant de recommencer r fois ce cycle en tout
   * @param {ObjetMathalea2D} objet Objet MathALEA2d affiché puis masqué
   * @param {number} [t0=1] Temps en secondes avant l'apparition
   * @param {number} [t=5] Temps à partir duquel l'animation recommence
   * @param {string} [r='Infinity'] Nombre de répétitions (infini si ce n'est pas un nombre)
   * @example cacherTempo(figure1)
   * // Affiche figure1 pendant 1 seconde, puis le cache pendant 4 secondes et recommence ce cycle indéfiniment.
   * @example cacherTempo(figure1,2,8,3)
   * // Affiche figure1 pendant 2 secondes, puis le cache pendant 6 secondes et recommence ce cycle 3 fois en tout.
   * @author Eric Elter
   */
// JSDOC Validee par EE Juin 2022
export function cacherTempo (objet, t0 = 1, t = 5, r = 'Infinity') {
  let compteur = 1 // Nombre d'animations
  const checkExist = setInterval(function () {
    if (document.getElementById(objet.id)) {
      clearInterval(checkExist)
      montrerParDiv(objet.id)
      if (r === 1) { // On le cache au bout de t0 et on ne le montre plus
        setTimeout(function () { cacherParDiv(objet.id) }, t0 * 1000)
      } else {
        const montreRepete = setInterval(function () { montrerParDiv(objet.id) }, t * 1000) // On cache tous les t s
        setTimeout(function () {
          cacherParDiv(objet.id) // On attend t0 pour montrer
          const cacheRepete = setInterval(function () {
            cacherParDiv(objet.id)
            compteur++
            if (typeof r === 'number') {
              if (compteur >= r) {
                clearInterval(cacheRepete)
                clearInterval(montreRepete)
              }
            }
          }, t * 1000) // On montre tous les t s (vu qu'on a décalé de t0)
        }, t0 * 1000) // Fin de l'animation en boucle
      }
    }
  }, 100) // vérifie toutes les  100ms que le div existe
}

/**
   * Masque une suite d'objets puis les affiche un par un, de t secondes en t secondes avant de recommencer r fois, tApresDernier secondes après l'affichage de tous les objets
   * @param {ObjetMathalea2D[]} objets Liste d'objets MathALEA2d masqués puis affichés
   * @param {number} [t = 1] Temps en secondes entre l'apparition de chaque objet
   * @param {string} [r = 'Infinity'] Nombre de répétitions (infini si ce n'est pas un nombre).
   * @param {number} [tApresDernier = 5] Temps, après l'affichage du dernier objet, à partir duquel l'animation recommence.
   * @example afficherUnParUn([s1,s2])
   * // Affiche s1 au bout de 1 seconde, puis s2 après 1 nouvelle seconde, puis les masque après 5 secondes. Ce cycle est répété indéfiniment.
   * @example afficherUnParUn([s1,s2],2,9,10)
   * // Affiche s1 au bout de 2 secondes, puis s2 après 2 nouvelles secondes, puis les masque après 10 secondes. Ce cycle est répété en tout 9 fois.
   * @author Rémi Angot
   */
// JSDOC Validee par EE Juin 2022
export function afficherUnParUn (objets, t = 1, r = 'Infinity', tApresDernier = 5) {
  let t0 = t
  const tf = objets.length * t + tApresDernier
  for (const objet of objets) {
    afficherTempo(objet, t0, tf, r)
    t0 += t
  }
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%% LES TRANSFORMATIONS ANIMÉES %%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/**
 * Fait apparaître une liste d'objets de façon animée.
 * @param {ObjetMathalea2D[]} liste liste d'objets à faire apparaître
 * @param {number} [dur = 2] Durée de l'animation en secondes
 * @param {number} [pourcentage = 0.5] Pourcentage de la durée à partir de laquelle les objets sont visibles
 * @param {number|string} [repeat = 'indefinite'] Nombre de répétitions de l'animation, peut être un entier.
 * @author Rémi Angot
 */
// JSDOC Non Validee EE Juin 2022 (non testée)
function ApparitionAnimee (liste, dur = 2, pourcentage = 0.5, repeat = 'indefinite') {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    let code = '<g> '
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += '\n' + objet.svg(coeff)
      }
    } else {
      // si ce n'est pas une liste
      code += '\n' + liste.svg(coeff)
    }
    code += `<animate attributeType="CSS"
    attributeName="visibility"
    from="hidden" 
    to="hidden"
    values="hidden;visible;hidden"
    keyTimes="0; ${pourcentage}; 1"
    dur="${dur}"
    repeatCount="${repeat}"/>`
    code += '</g>'
    return code
  }
}
/**
 * Fait apparaître une liste d'objets de façon animée
 * @param {ObjetMathalea2D[]} liste liste d'objets à faire apparaître
 * @param {number} [dur = 2] Durée de l'animation en secondes
 * @param {number} [pourcentage = 0.5] Pourcentage de la durée à partir de laquelle les objets sont visibles
 * @param {number|string} [repeat = 'indefinite'] Nombre de répétitions de l'animation, peut être un entier
 * @return {ApparitionAnimee}
 * @example Fonction non utilisée donc pas d'exemple, fonction non testée, peut être bugguée
 * @author Rémi Angot
 */
// JSDOC Non Validee EE Juin 2022 (impossible à tester car non utilisée)
export function apparitionAnimee (liste, dur = 2, pourcentage = 0.5, repeat = 'indefinite') {
  return new ApparitionAnimee(liste, dur, pourcentage, repeat)
}
/**
 * translationAnimee(s,v) //Animation de la translation de vecteur v pour s
 * translationAnimee([a,b,c],v) //Animation de la translation de vecteur v pour les objets a, b et v
 *
 * @author Rémi Angot
 */
function TranslationAnimee (liste, v, animation = 'begin="0s" dur="2s" repeatCount="indefinite"') {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    let code = '<g> '
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += '\n' + objet.svg(coeff)
      }
    } else {
      // si ce n'est pas une liste
      code += '\n' + liste.svg(coeff)
    }
    if (Array.isArray(v)) {
      code += '<animateMotion path="M 0 0 l'
      for (const vecteur of v) {
        code += ` ${vecteur.xSVG(coeff)} ${vecteur.ySVG(coeff)} `
      }
      code += `${animation} />`
    } else {
      code += `<animateMotion path="M 0 0 l ${v.xSVG(coeff)} ${v.ySVG(coeff)} " ${animation} />`
    }
    code += '</g>'
    return code
  }
}
export function translationAnimee (...args) {
  return new TranslationAnimee(...args)
}

/**
 * rotationAnimee(s,O,a) //Animation de la rotation de centre O et d'angle a pour s
 * rotationAnimee([a,b,c],O,a) //Animation de la rotation de centre O et d'angle a pour les objets a, b et c
 *
 * @author Rémi Angot
 */
function RotationAnimee (
  liste,
  O,
  angle,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    let code = '<g> '
    if (Array.isArray(liste)) {
      for (const objet of liste) {
        code += '\n' + objet.svg(coeff)
      }
    } else {
      // si ce n'est pas une liste
      code += '\n' + liste.svg(coeff)
    }

    code += `<animateTransform
  attributeName="transform"
  type="rotate"
  from="0 ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
  to="${-angle} ${O.xSVG(coeff)} ${O.ySVG(coeff)}"
  ${animation}
  />`
    code += '</g>'
    return code
  }
}
export function rotationAnimee (...args) {
  return new RotationAnimee(...args)
}
/**
 * homothetieAnimee(s,O,k) //Animation de la homothetie de centre O et de rapport k pour s
 * homothetieAnimee([a,b,c],O,k) //Animation de la homothetie de centre O et de rapport k pour les objets a, b et v
 *
 * @author Rémi Angot
 */
function HomothetieAnimee (
  p,
  O,
  k,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    const binomesXY1 = p.binomesXY(coeff)
    const p2 = homothetie(p, O, k)
    p2.isVisible = false
    const binomesXY2 = p2.binomesXY(coeff)
    const code = `<polygon stroke="${p.color[0]}" stroke-width="${p.epaisseur}" fill="${p.couleurDeRemplissage[0]}" >
  <animate attributeName="points" ${animation}
  from="${binomesXY1}"
  to="${binomesXY2}"
  />
  </polygon>`
    return code
  }
}
export function homothetieAnimee (...args) {
  return new HomothetieAnimee(...args)
}

/**
 * symetrieAnimee(s,d) //Animation de la symetrie d'axe (d) pour s
 * symetrieAnimee([a,b,c],d) //Animation de la symetrie d'axe (d) pour les objets a, b et v
 *
 * @author Rémi Angot
 */
function SymetrieAnimee (
  p,
  d,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    const binomesXY1 = p.binomesXY(coeff)
    const p2 = symetrieAxiale(p, d)
    p2.isVisible = false
    const binomesXY2 = p2.binomesXY(coeff)
    const code = `<polygon stroke="${p.color[0]}" stroke-width="${p.epaisseur}" fill="${p.couleurDeRemplissage[0]}" >
    <animate attributeName="points" ${animation}
    from="${binomesXY1}"
    to="${binomesXY2}"
    />
    </polygon>`
    return code
  }
}
export function symetrieAnimee (...args) {
  return new SymetrieAnimee(...args)
}

function AffiniteOrthoAnimee (
  p,
  d,
  k,
  animation = 'begin="0s" dur="2s" repeatCount="indefinite"'
) {
  ObjetMathalea2D.call(this, { })
  this.svg = function (coeff) {
    const binomesXY1 = p.binomesXY(coeff)
    const p2 = affiniteOrtho(p, d, k)
    p2.isVisible = false
    const binomesXY2 = p2.binomesXY(coeff)
    const code = `<polygon stroke="${p.color[0]}" stroke-width="${p.epaisseur}" fill="${p.couleurDeRemplissage[0]}" >
    <animate attributeName="points" ${animation}
    from="${binomesXY1}"
    to="${binomesXY2}"
    />
    </polygon>`
    return code
  }
}
export function affiniteOrthoAnimee (...args) {
  return new AffiniteOrthoAnimee(...args)
}
