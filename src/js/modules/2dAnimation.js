/**
 * Rend visible un element d'après son id
 * @param {number} id id propre à un objet MathALEA2d
 * @example montrerParDiv(s2.id) // Affiche l'objet s2
 * @author Rémi Angot
 */
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
