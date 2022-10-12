import { mathalea2d, fixeBordures } from '../../modules/2dGeneralites.js'
import { randint } from '../../modules/outils/entiers.js'
import { shuffle } from '../../modules/outils/arrays.js'
import { point } from '../../modules/2d/point.js'
import { texteParPosition } from '../../modules/2d/textes.js'
import { boite, nommePolygone, polygone } from '../../modules/2d/polygone.js'
import { grille } from '../../modules/2d/grilles.js'

/**
 * Cette fonction permet de créer un polygone rapidement à partir d'une liste des coordonnées de ses sommets et éventuellement de leur noms
 * @param {array} flat
 * @param {string} noms
 * @return {Polygone}
 * @author Jean-Claude Lhote
 */
export function flatArrayToPolygone (flat, noms) {
  const sommets = []
  for (let i = 0; i < flat.length; i += 2) {
    sommets.push(point(flat[i], flat[i + 1]))
  }
  const pol = polygone(...sommets)
  if (typeof noms === 'string') {
    if (noms.length >= sommets.length) {
      nommePolygone(pol, noms)
    }
  }
  return pol
}

/**
 * Générateur aléatoire de Shikaku : il suffit de donner la largeur et la hauteur globale, le générateur fait le reste
 * pour créer un Shikaku de largeur 12 et de hauteur 6, on utilise : const myShikaku = new Shikaku(12,6)
 */
export default class Shikaku {
  /**
   *
   * @param {number} largeur
   * @param {number} hauteur
   */
  constructor (largeur, hauteur) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.aireTotale = largeur * hauteur
    this.marqueurs = [] // Un tableau qui me sert à marquer les cases 'déjà occupées'
    for (let i = 0; i < largeur; i++) {
      this.marqueurs[i] = []
      for (let j = 0; j < hauteur; j++) {
        this.marqueurs[i][j] = false
      }
    }
    this.dimMax = { // une propriété qui permet de limiter la largeur max et la hauteur max d'un rectangle en fonction de celles de la grille
      xMax: Math.min(largeur, Math.ceil(Math.sqrt(this.aireTotale))),
      yMax: Math.min(hauteur, Math.ceil(Math.sqrt(this.aireTotale)))
    }
    // this.pavage.aireTotale contient l'aire recalculée à chaque ajout de rectangle
    // this.pavage.rectangles est un tableau des objets 'rectangle' ajoutés
    this.pavage = { aireTotale: 0, rectangles: [] } // La propriété vide au départ qui contient la description du pavage au fur et à mesure de sa construction
    this.dimPossibles = [] // un tableau qui va contenir les différents modèles [largeur,hauteur] possibles pour le choix des rectangles (dépend de dimMax)
    const aireMax = Math.ceil(2 * Math.sqrt(this.aireTotale)) // Une propriété qui limite l'aire max des rectangles
    // on initialise les dimensions possibles
    for (let i = 1; i <= this.dimMax.xMax; i++) {
      for (let j = 1; j <= this.dimMax.yMax; j++) {
        if (i * j < aireMax) this.dimPossibles.push([i, j])
      }
    }
    // la méthode récursive du Shikaku qui va progressivement remplir les trous laissés jusqu'à ce que l'aire du pavage soit égale à celle de la grille
    this.paver = function () {
      if (this.pavage.aireTotale < this.aireTotale) { // Le pavage est incomplet
        this.ajouteUnRectangle()
        this.paver()
      }
    }
    // la méthode qui fournit (en Html ou en Latex) la représentation graphique du Shikaku
    // si type === 'solution', alors les rectangles sont tracés.
    this.represente = function (type) {
      const objets = []
      objets.push(grille(0, 0, this.largeur, this.hauteur))
      for (let i = 0; i < this.pavage.rectangles.length; i++) {
        const rectangle = this.pavage.rectangles[i]
        objets.push(texteParPosition(rectangle.aire, rectangle.placeNom.x + rectangle.x + 0.5, rectangle.placeNom.y + rectangle.y + 0.5))
        if (type === 'solution') {
          const box = boite({ Xmin: rectangle.x, Ymin: rectangle.y, Xmax: rectangle.x + rectangle.largeur, Ymax: rectangle.y + rectangle.hauteur, color: 'blue' })
          objets.push(box)
        }
      }
      const cadre = flatArrayToPolygone([0, 0, this.largeur, 0, this.largeur, this.hauteur, 0, this.hauteur])
      objets.push(cadre)
      return mathalea2d(Object.assign({}, fixeBordures(objets), { scale: 0.75 }), objets)
    }
    // la méthode appelée par Shikaku.paver() pour ajouter un rectangle au pavage
    this.ajouteUnRectangle = function () {
      this.dimPossibles = shuffle(this.dimPossibles) // On brasse les dimensions possibles et on les teste du premier au dernier afin de ne pas toujours avoir des rectangles 1x1
      let trouvé = false
      let choix = 0
      do {
        const largeur = this.dimPossibles[choix][0]
        const hauteur = this.dimPossibles[choix][1]
        trouvé = this.trouvePlace(largeur, hauteur)
        choix++
      } while (!trouvé && choix < this.dimPossibles.length)
      this.pavage.rectangles.push(trouvé)
      for (let i = 0; i < trouvé.largeur; i++) {
        for (let j = 0; j < trouvé.hauteur; j++) {
          this.marqueurs[trouvé.x + i][trouvé.y + j] = true
        }
      }
      this.pavage.aireTotale += trouvé.aire
    }
    // la méthode qui essaye de trouver une place au rectangle choisi (ce n'est pas parce que la différence d'aire le permet, que ça rentre dans un trou restant !)
    // C'est sans doute la partie du code la plus compliquée !
    this.trouvePlace = function (largeur, hauteur) {
      let x = 0
      let y
      let empiete

      do {
        if (x + largeur <= this.largeur) {
          y = 0
          do {
            if (y + hauteur <= this.hauteur) {
              if (!this.marqueurs[x][y]) {
                empiete = false
                for (let i = 0; i < largeur; i++) {
                  for (let j = 0; j < hauteur; j++) {
                    if (this.marqueurs[x + i][y + j] || x + i >= this.largeur || y + j >= this.hauteur) empiete = true
                  }
                }
                if (!empiete) { // C'est bon ! ça rentre dans un trou, on retourne l'objet rectangle.
                  const placeNom = choisitPlaceNom(largeur, hauteur)
                  return { x, y, largeur, hauteur, aire: largeur * hauteur, placeNom }
                }
              }
              y++
            } else y++
          } while (y < this.hauteur)
          x++
        } else x++
      } while (x < this.largeur)
      return false // on n'a pas trouvé de place pour un tel rectangle, dans ce cas, on essayera les dimensions suivantes
    }
    // une fonction qui choisit aléatoirement la position du nombre dans le rectangle pour ne pas qu'il soit systématiquement en bas à droite.
    function choisitPlaceNom (largeur, hauteur) {
      if (largeur < 1 || hauteur < 1) window.notify('erreur de largeur ou de hauteur dans choisitPlaceNom(Shikaku)', { largeur, hauteur })
      const x = largeur <= 1 ? 0 : randint(0, largeur - 1)
      const y = hauteur <= 1 ? 0 : randint(0, hauteur - 1)
      return { x, y }
    }
    this.paver()
  }
}
