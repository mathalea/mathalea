/**
* Renvoie un nombre dans le format français (séparateur de classes)
* Fonctionne sans le mode maths contrairement à texNombre()
* insereEspaceDansNombre fonctionne peut-être mieux
* @author Rémi Angot
*/
export function nombreAvecEspace (nb) {
  if (isNaN(nb)) {
    window.notify('nombreAvecEspace : argument NaN ou undefined', { nb })
    return 'NaN'
  }
  // Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
  if (context.isHtml) {
    return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, ' ')
  } else {
    let result
    if (nb > 999 || nombreDeChiffresDansLaPartieDecimale(nb) > 3) {
      result = '\\numprint{' + nb.toString().replace('.', ',') + '}'
    } else {
      result = Number(nb).toString().replace('.', '{,}')
    }
    return result
  }
}
/**
 *
 * @param {string |number} nb
 * @returns {string}
 */
export const insereEspaceDansNombre = nb => {
  if (!Number.isNaN(nb)) {
    nb = nb.toString().replace('.', ',')
  } else {
    window.notify('insereEspaceDansNombre : l\'argument n\'est pas un nombre', nb)
    return nb
  }
  let indiceVirgule = nb.indexOf(',')
  const indiceMax = nb.length - 1
  const tableauIndicesEspaces = []
  if (indiceVirgule < 0) {
    // S'il n'y a pas de virgule c'est qu'elle est après le dernier chiffre
    indiceVirgule = nb.length
  }
  for (let i = 0; i < indiceMax; i++) {
    if ((i - indiceVirgule) % 3 === 0 && (i - indiceVirgule) !== 0) {
      if (i < indiceVirgule) {
        tableauIndicesEspaces.push(i - 1) // Partie entière espace à gauche
      } else {
        tableauIndicesEspaces.push(i) // Partie décimale espace à droite
      }
    }
  }
  for (let i = tableauIndicesEspaces.length - 1; i >= 0; i--) {
    const indice = tableauIndicesEspaces[i] + 1
    if (indice !== 0)nb = insertCharInString(nb, indice, ' \\thickspace ')
  }
  return nb
}

export const insertCharInString = (string, index, char) => string.substring(0, index) + char + string.substring(index, string.length)

/**
   * Destinée à être utilisée hors des $ $
   * Signale une erreur en console s'il y a plus de 15 chiffres significatifs (et donc qu'il y a un risque d'erreur d'approximation)
   * Sinon, renvoie le nombre à afficher dans le format français (avec virgule et des espaces pour séparer les classes dans la partie entière et la partie décimale)
   * @author Jean-Claude Lhote
   * @author Guillaume Valmont
   * @param {number} nb nombre à afficher
   * @param {number} precision nombre de décimales demandé
   * @param {boolean} force true pour forcer à precision chiffres (ajout de zéros éventuels). false par défaut pour supprimer les zéros non significatifs.
   * @returns string avec le nombre dans le format français à placer hors des $ $
   */
export function stringNombre (nb, precision = 8, force = false) {
  return afficherNombre(nb, precision, 'stringNombre', force)
}
/**
   * Fonction auxiliaire aux fonctions stringNombre et texNombre
   * Vérifie le nombre de chiffres significatifs en fonction du nombre de chiffres de la partie entière de nb et du nombre de décimales demandées par le paramètre precision
   * S'il y a plus de 15 chiffres significatifs, envoie un message à bugsnag et renvoie un nombre avec 15 chiffres significatifs
   * Sinon, renvoie un nombre avec le nombre de décimales demandé
   * @author Guillaume Valmont
   * @param {number} nb nombre qu'on veut afficher
   * @param {number} precision nombre de décimales demandé
   * @param {string} fonction nom de la fonction qui appelle afficherNombre (texNombre ou stringNombre) -> sert pour le message envoyé à bugsnag
   */
function afficherNombre (nb, precision, fonction, force = false) {
  /**
     * Fonction auxiliaire de stringNombre pour une meilleure lisibilité
     * Elle renvoie un nombre dans le format français (avec virgule et des espaces pour séparer les classes dans la partie entière et la partie décimale)
     * @author Rémi Angot
     * @author Guillaume Valmont
     * @param {number} nb nombre à afficher
     * @param {number} precision nombre de décimales demandé
     * @returns string avec le nombre dans le format français
     */
  function insereEspacesNombre (nb, nbChiffresPartieEntiere, precision, fonction) {
    let signe
    let nombre
    const maximumSignificantDigits = nbChiffresPartieEntiere + precision
    if (nb instanceof Decimal) {
      signe = nb.isNeg()
      if (nb.abs().gte(1)) {
        if (force) {
          nombre = nb.toFixed(precision).replace('.', ',')
        } else {
          nombre = nb.toDP(precision).toString().replace('.', ',')
        }
      } else {
        if (force) {
          nombre = nb.toFixed(precision).replace('.', ',')
        } else {
          nombre = nb.toDP(precision).toString().replace('.', ',')
        }
      }
    } else {
      signe = nb < 0
      // let nombre = math.format(nb, { notation: 'fixed', lowerExp: -precision, upperExp: precision, precision: precision }).replace('.', ',')
      if (Math.abs(nb) < 1) {
        if (force) {
          nombre = Intl.NumberFormat('fr-FR', { maximumFractionDigits: precision, minimumFractionDigits: precision }).format(nb)
        } else {
          nombre = Intl.NumberFormat('fr-FR', { maximumFractionDigits: precision }).format(nb)
        }
      } else {
        if (force) {
          nombre = Intl.NumberFormat('fr-FR', { maximumSignificantDigits, minimumSignificantDigits: maximumSignificantDigits }).format(nb)
        } else {
          nombre = Intl.NumberFormat('fr-FR', { maximumSignificantDigits }).format(nb)
        }
      }
    }
    const rangVirgule = nombre.indexOf(',')
    let partieEntiere = ''
    if (rangVirgule !== -1) {
      partieEntiere = nombre.substring(0, rangVirgule)
    } else {
      partieEntiere = nombre
    }
    let partieDecimale = ''
    if (rangVirgule !== -1) {
      partieDecimale = nombre.substring(rangVirgule + 1)
    }
    // La partie entière est déjà formatée par le Intl.NumberFormat('fr-FR', { maximumSignificantDigits }).format(nb)
    // Dans le cas d'un Number, mais pas d'un Decimal
    if (nb instanceof Decimal) {
      if (signe) partieEntiere = partieEntiere.substring(1)
      for (let i = partieEntiere.length - 3; i > 0; i -= 3) {
        partieEntiere = partieEntiere.substring(0, i) + ' ' + partieEntiere.substring(i)
      }
      if (signe) partieEntiere = '-' + partieEntiere
    }
    for (let i = 3; i < partieDecimale.length; i += (fonction === 'texNombre' ? 5 : 4)) { // des paquets de 3 nombres + 1 espace
      partieDecimale = partieDecimale.substring(0, i) + (fonction === 'texNombre' ? '\\,' : ' ') + partieDecimale.substring(i)
    }
    if (partieDecimale === '') {
      nombre = partieEntiere
    } else {
      nombre = partieEntiere + ',' + partieDecimale
    }
    return nombre
  } // fin insereEspacesNombre()

  // si nb n'est pas un nombre, on le retourne tel quel, on ne fait rien.
  if (isNaN(nb) && !(nb instanceof Decimal)) {
    window.notify("AfficherNombre : Le nombre n'en est pas un", { nb, precision, fonction })
    return ''
  }
  if (nb instanceof Decimal) {
    if (nb.isZero()) return '0'
  } else if (Number(nb) === 0) return '0'
  let nbChiffresPartieEntiere
  if (nb instanceof Decimal) {
    if (nb.abs().lt(1)) {
      nbChiffresPartieEntiere = 0
    } else {
      nbChiffresPartieEntiere = nb.abs().toFixed(0).length
    }
    if (nb.isInteger()) precision = 0
    else {
      if (typeof precision !== 'number') { // Si precision n'est pas un nombre, on le remplace par la valeur max acceptable
        precision = 15 - nbChiffresPartieEntiere
      } else if (precision < 0) {
        precision = 0
      }
    }
  } else {
    if (Math.abs(nb) < 1) {
      nbChiffresPartieEntiere = 0
    } else {
      // attention 9.7 donner 10 avec Math.abs(9.7).toFixed(0)
      nbChiffresPartieEntiere = Math.floor(Math.abs(nb)).toFixed(0).length
    }
    if (Number.isInteger(nb) && !force) {
      precision = 0
    } else {
      if (typeof precision !== 'number') { // Si precision n'est pas un nombre, on le remplace par la valeur max acceptable
        precision = 15 - nbChiffresPartieEntiere
      } else if (precision < 0) {
        precision = 0
      }
    }
  }

  const maximumSignificantDigits = nbChiffresPartieEntiere + precision
  if ((maximumSignificantDigits > 15) && (!(nb instanceof Decimal))) { // au delà de 15 chiffres significatifs, on risque des erreurs d'arrondi
    window.notify(fonction + ' : Trop de chiffres', { nb, precision })
    return insereEspacesNombre(nb, nbChiffresPartieEntiere, precision, fonction)
  } else {
    return insereEspacesNombre(nb, nbChiffresPartieEntiere, precision, fonction)
  }
}
