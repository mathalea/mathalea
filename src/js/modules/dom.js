/**
 * Fonctions de gestion du dom
 * @module
 */
/**
 * Retourne true si l'objet à la propriété
 * @param {Object} object
 * @param {string} prop
 * @return {boolean}
 */
const hasProp = (object, prop) => typeof object === 'object' && Object.prototype.hasOwnProperty.call(object, prop)

/**
 * Affecte des styles à un élément html (on peut pas affecter elt.style directement car read only, faut faire du elt.style.foo = bar)
 * sans planter en cas de pb (on le signale juste en console)
 * @param {HTMLElement} elt
 * @param {string|object} styles
 */
function setStyles (elt, styles) {
  try {
    if (elt && elt.style) {
      if (typeof styles === 'string') {
        styles = styles.split(';')
        styles.forEach(function (paire) {
          paire = /([\w]+):(.+)/.exec(paire)
          if (paire) {
            const [, key, value] = paire
            elt.style[key] = value
          }
        })
      } else if (typeof styles === 'object') {
        for (const prop in styles) {
          if (hasProp(styles, prop)) {
            elt.style[prop] = styles[prop]
          }
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Ajoute du texte dans un élément
 * @param {HTMLElement} elt
 * @param {string} text
 */
export function addText (elt, text) {
  elt.appendChild(window.document.createTextNode(text))
}

/**
 * Retourne l'élément du dom
 * @param {string} id
 * @param {boolean} [strict=true] Passer false pour retourner null plutôt que throw une erreur si id n'existe pas
 * @return {HTMLElement}
 * @throws {TypeError} Si id n'est pas une string
 * @throws {Error} Si l'élément id n'existe pas
 */
export function get (id, strict = true) {
  if (typeof id !== 'string') throw TypeError('argument invalide')
  const elt = document.getElementById(id)
  if (!elt && strict) throw Error(`L’élément html ${id} n’existe pas`)
  return elt
}

/**
 * Retourne un élément html de type tag (non inséré dans le dom)
 * @param {string} tag
 * @param {Object} [attrs] Les attributs
 * @param {string} [txtContent] Contenu textuel éventuel
 */
export function create (tag, attrs, txtContent) {
  const elt = window.document.createElement(tag)
  let attr
  try {
    if (attrs) {
      for (attr in attrs) {
        if (hasProp(attrs, attr)) {
          if (attr === 'class') elt.className = attrs.class
          else if (attr === 'className') elt.className = attrs.className
          else if (attr === 'style') setStyles(elt, attrs.style)
          else elt.setAttribute(attr, attrs[attr])
        }
      }
    }
  } catch (error) {
    console.error(error)
  }

  if (txtContent) addText(elt, txtContent)

  return elt
}

/**
 * Ajoute un élément html de type tag à parent
 * @param {HTMLElement} parent
 * @param {string} tag
 * @param {Object=} attrs Les attributs
 * @param {string=} content
 * @returns {HTMLElement} L'élément ajouté
 */
export function addElement (parent, tag, attrs, content) {
  const elt = create(tag, attrs, content)
  parent.appendChild(elt)
  return elt
}
