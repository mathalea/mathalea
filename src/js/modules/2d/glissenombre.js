import { apparitionAnimee, translationAnimee } from '../2dAnimation'
import { ObjetMathalea2D } from '../2dGeneralites'
import { point } from './point'
import { segment } from './segment'
import { texteParPosition } from './textes'
import { vecteur } from './vecteur'

export function GlisseNombre (nombre = '', decalage = 0) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const chiffresADecaler = []
  const largeurColonne = 2
  const hauteurLigne = 1.5
  const hauteurPremiereLigne = 5.5
  const nbLignes = 3
  const nbColonnes = 12
  const A = point(3, 5)
  for (let i = 0; i < nbColonnes + 1; i++) {
    const trait = segment(point(A.x + i * largeurColonne, A.y), point(A.x + i * largeurColonne, A.y - (nbLignes - 1) * hauteurLigne - hauteurPremiereLigne))
    trait.isVisible = false
    objets.push(trait)
  }
  const traitDuHaut = segment(A, point(A.x + nbColonnes * largeurColonne, A.y))
  traitDuHaut.isVisible = false
  objets.push(traitDuHaut)
  for (let i = 1; i < nbLignes + 1; i++) {
    const trait = segment(point(A.x, A.y - (i - 1) * hauteurLigne - hauteurPremiereLigne), point(A.x + nbColonnes * largeurColonne, A.y - (i - 1) * hauteurLigne - hauteurPremiereLigne))
    trait.isVisible = false
    objets.push(trait)
  }

  const placeDansTableau = (texte, colonne, ligne, vertical = false, couleur = 'black') => {
    let textePlaceDansTableau = ''
    if (vertical) {
      textePlaceDansTableau = texteParPosition(texte, A.x + (colonne + 0.5) * largeurColonne, A.y - 0.9 * hauteurPremiereLigne, -90, couleur, 1, 'start')
    } else {
      textePlaceDansTableau = texteParPosition(texte, A.x + (colonne + 0.5) * largeurColonne, A.y - (ligne - 0.5) * hauteurLigne - hauteurPremiereLigne, 0, couleur)
    }
    textePlaceDansTableau.isVisible = false
    return textePlaceDansTableau
  }
  const labels = ['Millions', 'Centaines de milliers', 'Dizaines de milliers', 'Milliers', 'Centaines', 'Dizaines', 'Unités', 'Dixièmes', 'Centièmes', 'Millièmes', 'Dix-millièmes', 'Cent-Millièmes']
  for (let i = 0; i < nbColonnes; i++) {
    const couleur = (i === 6 || i === 6 - decalage) ? '#f15929' : 'black'
    const textePlaceDansTableau = placeDansTableau(labels[i], i, 0, true, couleur)
    textePlaceDansTableau.isVisible = false
    if (i === 6 || i === 6 - decalage) textePlaceDansTableau.gras = true
    objets.push(textePlaceDansTableau)
  }
  nombre = nombre.toString()
  const partieEntiere = nombre.split('.')[0]
  const partieDecimale = nombre.split('.')[1]
  const chiffreDesUnites = placeDansTableau(partieEntiere[partieEntiere.length - 1], 6, 1, false, '#f15929')
  const chiffreDesUnites2 = placeDansTableau(partieEntiere[partieEntiere.length - 1], 6, 2, false, '#f15929')
  chiffreDesUnites.isVisible = false
  chiffreDesUnites2.isVisible = false
  chiffreDesUnites.gras = true
  chiffreDesUnites2.gras = true
  objets.push(chiffreDesUnites)
  chiffresADecaler.push(chiffreDesUnites2)

  for (let i = 1; i < partieEntiere.length; i++) {
    const chiffre = placeDansTableau(partieEntiere[partieEntiere.length - 1 - i], 6 - i, 1)
    const chiffre2 = placeDansTableau(partieEntiere[partieEntiere.length - 1 - i], 6 - i, 2)
    chiffre.isVisible = false
    chiffre2.isVisible = false
    objets.push(chiffre)
    chiffresADecaler.push(chiffre2)
  }
  if (partieDecimale) {
    for (let i = 0; i < partieDecimale.length; i++) {
      const chiffre = placeDansTableau(partieDecimale[i], 7 + i, 1)
      const chiffre2 = placeDansTableau(partieDecimale[i], 7 + i, 2)
      chiffre.isVisible = false
      chiffre2.isVisible = false
      objets.push(chiffre)
      chiffresADecaler.push(chiffre2)
    }
    const texte1 = texteParPosition(',', A.x + 6.9 * largeurColonne, A.y - 0.3 * hauteurLigne - hauteurPremiereLigne, 'milieu', '#f15929', 3)
    const texte2 = texteParPosition(',', A.x + 6.9 * largeurColonne, A.y - 1.3 * hauteurLigne - hauteurPremiereLigne, 'milieu', '#f15929', 3)
    texte1.isVisible = false
    texte2.isVisible = false
    texte1.gras = true
    texte2.gras = true
    objets.push(texte1)
    objets.push(texte2)
  } else if (decalage < 0) { // pas de partie décimale mais une division alors virgule pour le 2e nombre
    const texte2 = texteParPosition(',', A.x + 6.9 * largeurColonne, A.y - 1.3 * hauteurLigne - hauteurPremiereLigne, 'milieu', '#f15929', 3)
    texte2.isVisible = false
    texte2.gras = true
    objets.push(apparitionAnimee(texte2, 6, 0.2))
  }
  const chiffresQuiGlissent = translationAnimee(chiffresADecaler, vecteur(-decalage * largeurColonne, 0), 'id="op" dur="1s" begin="0s;op.end+5s" fill="freeze"')
  chiffresQuiGlissent.isVisible = false
  objets.push(chiffresQuiGlissent)
  const nombreDeZeroPartieEntiere = partieDecimale ? decalage - partieDecimale.length : decalage
  const nombreDeZeroPartieDecimale = -partieEntiere.length - decalage + 1
  const zerosAAjouter = []
  for (let i = 0; i < nombreDeZeroPartieEntiere; i++) {
    const zero = placeDansTableau('0', 6 - i, 2, false, '#32CD32')// Lime Green
    zero.isVisible = false
    zero.gras = true
    zerosAAjouter.push(zero)
  }
  for (let i = 0; i < nombreDeZeroPartieDecimale; i++) {
    const zero = placeDansTableau('0', 6 + i, 2, false, '#32CD32')
    zero.isVisible = false
    zero.gras = true
    zerosAAjouter.push(zero)
  }
  objets.push(apparitionAnimee(zerosAAjouter, 6, 0.2))
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}
export function glisseNombre (...args) {
  return new GlisseNombre(...args)
}
