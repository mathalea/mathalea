import { fraction, max } from 'mathjs'
import { colorToLatexOrHTML, ObjetMathalea2D, vide2d } from '../2dGeneralites'
import { combinaisonListes, numberFormat, texcolors, texNombre } from '../outils'
import { arc } from './arc'
import { cercle } from './cercle'
import { motifs } from './motif'
import { point } from './point'
import { carre, polygone } from './polygone'
import { polyline } from './polyline'
import { axeY, labelY, pointDansRepere } from './reperes'
import { segment } from './segment'
import { latexParPoint, texteParPoint, texteParPosition } from './textes'
import { tracePoint } from './tracepoint'
import { rotation, similitude, translation } from './transformations'
import { vecteur } from './vecteur'

/**
 * Trace un graphique cartésien dans un repère
 *
 *
 * @param {array} data
 * @param {object} repere
 * @author Rémi Angot
 */
function TraceGraphiqueCartesien (data, repere = {}, {
  couleurDesPoints = 'red',
  couleurDuTrait = 'blue',
  styleDuTrait = '', // plein par défaut
  epaisseurDuTrait = 2,
  styleDesPoints = 'x', // croix par défaut
  tailleDesPoints = 3

} = {}) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const listePoints = []
  for (const [x, y] of data) {
    const M = pointDansRepere(x, y, repere)
    listePoints.push(M)
    const t = tracePoint(M, couleurDesPoints)
    t.style = styleDesPoints
    t.taille = tailleDesPoints
    t.isVisible = false
    M.isVisible = false
    objets.push(t)
  }
  const l = polyline(...listePoints)
  l.isVisible = false
  l.epaisseur = epaisseurDuTrait
  l.color = colorToLatexOrHTML(couleurDuTrait)
  if (styleDuTrait === 'pointilles') {
    l.pointilles = 5
  }
  objets.push(l)

  // LES SORTIES TiKZ et SVG
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
  this.svgml = function (coeff, amp) {
    let code = ''
    for (const objet of objets) {
      if (typeof (objet.svgml) === 'undefined') code += '\n\t' + objet.svg(coeff)
      else code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }
  this.tikzml = function (amp) {
    let code = ''
    for (const objet of objets) {
      if (typeof (objet.tikzml) === 'undefined') code += '\n\t' + objet.tikz()
      else code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}

export function traceGraphiqueCartesien (...args) {
  return new TraceGraphiqueCartesien(...args)
}

/**
 * Trace une barre pour un histogramme
 *
 * @param {integer} x
 * @param {integer} hauteur
 * @param {string} legende
 * @param {integer} epaisseur
 * @param {string} couleur
 * @param {integer} opaciteDeRemplissage
 * @param {integer} angle
 * @author Rémi Angot
 */
function TraceBarre (x, hauteur, legende = '', { epaisseur = 0.6, couleurDeRemplissage = 'blue', color = 'black', opaciteDeRemplissage = 0.3, angle = 66, unite = 1, hachures = false } = {}) {
  ObjetMathalea2D.call(this, { })
  const p = hauteur === 0 ? vide2d(x, 0) : polygone([point(x - epaisseur / 2, 0), point(x - epaisseur / 2, hauteur * unite), point(x + epaisseur / 2, hauteur * unite), point(x + epaisseur / 2, 0)])
  p.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = colorToLatexOrHTML(color)
  if (hachures) {
    p.hachures = hachures
  }
  const texte = texteParPosition(legende, x, -0.2, angle, 'black', 1, 'gauche')
  this.bordures = [Math.min(p.bordures[0], texte.bordures[0]), Math.min(p.bordures[1], texte.bordures[1]), Math.max(p.bordures[2], texte.bordures[2]), Math.max(p.bordures[3], texte.bordures[3])]
  this.tikz = function () {
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff) {
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

export function traceBarre (...args) {
  return new TraceBarre(...args)
}

/**
   * Trace une barre horizontale pour un histogramme
   *
   * @param {integer} longueur
   * @param {integer} y
   * @param {string} legende
   * @param {integer} epaisseur
   * @param {string} couleur
   * @param {integer} opaciteDeRemplissage
   * @param {integer} angle
   * @author Rémi Angot
   */
function TraceBarreHorizontale (longueur, y, legende = '', { epaisseur = 0.6, couleurDeRemplissage = 'blue', color = 'black', opaciteDeRemplissage = 0.3, unite = 1, angle = 'gauche', hachures = false } = {}) {
  ObjetMathalea2D.call(this, { })
  const p = longueur === 0 ? vide2d(0, y) : polygone([point(0, y - epaisseur / 2), point(0, y + epaisseur / 2), point(unite * longueur, y + epaisseur / 2), point(unite * longueur, y - epaisseur / 2)])
  p.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = colorToLatexOrHTML(color)
  if (hachures) {
    p.hachures = hachures
  }
  const texte = texteParPosition(legende, -0.2, y, angle, 'black', 1, 'gauche')

  this.tikz = function () {
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff) {
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

export function traceBarreHorizontale (...args) {
  return new TraceBarreHorizontale(...args)
}

/** Trace un diagramme en barres
   * @param {number[]} hauteursBarres Tableau des effectifs
   * @param {string[]} etiquettes Tableau des labels pour chaque effectif
   * @param {Object} parametres À saisir entre accolades
   * @param {boolean} [parametres.reperageTraitPointille = false] Présence (ou non) du trait en pointillés, reliant le haut de chaque barre à l'axe des ordonnées
   * @param {string} [parametres.couleurDeRemplissage = 'blue'] Couleur de remplissage de toutes les barres : du type 'blue' ou du type '#f15929'.
   * @param {number} [parametres.titreAxeVertical = ''] Titre de l'axe des ordonnées
   * @param {boolean} [parametres.titre = ''] Titre du diagramme
   * @param {boolean} [parametres.hauteurDiagramme = 5] Hauteur du diagramme
   * @param {string[]} [parametres.coeff = 2] Largeur entre deux barres
   * @param {string} [parametres.axeVertical = true] Présence (ou non) de l'axe vertical
   * @param {boolean[]} [parametres.etiquetteValeur = true] Présence (ou non) de l'effectif sur chaque barre
   * @param {boolean[]} [parametres.labelAxeVert = true] Présence (ou non) des labels numériques sur l'axe vertical
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
   * @class
   */
function DiagrammeBarres (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 5, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  ObjetMathalea2D.call(this, { })
  const diagramme = []
  for (let j = 0; j < hauteursBarres.length; j++) {
    const abscisseBarre = j * coeff
    const hauteurBarre = hauteursBarres[j] * hauteurDiagramme / max(hauteursBarres)
    diagramme.push(traceBarre(abscisseBarre, hauteurBarre, etiquettes[j], { couleurDeRemplissage: couleurDeRemplissage }))
    if (reperageTraitPointille) {
      const ligne = segment(-1, hauteurBarre, abscisseBarre, hauteurBarre)
      ligne.pointilles = 5
      ligne.epaisseur = 0.2
      diagramme.push(ligne)
    }
    if (etiquetteValeur) {
      if (hauteursBarres[j] !== 0) {
        diagramme.push(texteParPoint(numberFormat(hauteursBarres[j]), point(abscisseBarre, hauteurBarre + 0.3))) // On écrit la valeur au dessus de la barre sauf pour une hauteur de 0
      }
    }
    // Calculs permettant de graduer l'axe vertical et de placer des valeurs
    const steps = [1, 2, 5, 10, 20]
    const yticks = [1, 2, 5, 5, 5]
    let istep = 1
    let step = 1
    let ytick = 1
    while (max(hauteursBarres) / step > 5 && istep < 5) {
      istep += 1
      step = steps[istep - 1]
      ytick = yticks[istep - 1]
    }
    if (istep === 5) istep = 2
    while (max(hauteursBarres) / step > 5) {
      istep = istep + 1
      step = istep * 10
      ytick = 5
    }

    if (labelAxeVert) diagramme.push(labelY(0, max(hauteursBarres), (fraction(hauteurDiagramme, max(hauteursBarres))).mul(step), 'black', -3, max(hauteursBarres) / hauteurDiagramme))
    if (axeVertical) diagramme.push(axeY(0, hauteurDiagramme + 1, 0.2, (fraction(hauteurDiagramme, max(hauteursBarres))).mul(step), 0.2, 'black', ytick, titreAxeVertical))
  }
  if (titre !== '') diagramme.push(texteParPoint(titre, point((hauteursBarres.length - 1) * coeff / 2, hauteurDiagramme + 1)))
  this.bordures = [1000, 1000, -1000, -1000]
  for (const objet of diagramme) {
    if (objet.bordures !== undefined) { this.bordures = [Math.min(this.bordures[0], objet.bordures[0]), Math.min(this.bordures[1], objet.bordures[1]), Math.max(this.bordures[2], objet.bordures[2]), Math.max(this.bordures[3], objet.bordures[3])] }
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of diagramme) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function (coeff) {
    let code = ''
    for (const objet of diagramme) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}
/** Trace un diagramme en barres
   * @param {number[]} hauteursBarres Tableau des effectifs
   * @param {string[]} etiquettes Tableau des labels pour chaque effectif
   * @param {Object} parametres À saisir entre accolades
   * @param {boolean} [parametres.reperageTraitPointille = false] Présence (ou non) du trait en pointillés, reliant le haut de chaque barre à l'axe des ordonnées
   * @param {string} [parametres.couleurDeRemplissage = 'blue'] Couleur de remplissage de toutes les barres : du type 'blue' ou du type '#f15929'.
   * @param {number} [parametres.titreAxeVertical = ''] Titre de l'axe des ordonnées
   * @param {boolean} [parametres.titre = ''] Titre du diagramme
   * @param {boolean} [parametres.hauteurDiagramme = 5] Hauteur du diagramme
   * @param {string[]} [parametres.coeff = 2] Largeur entre deux barres
   * @param {string} [parametres.axeVertical = true] Présence (ou non) de l'axe vertical
   * @param {boolean[]} [parametres.etiquetteValeur = true] Présence (ou non) de l'effectif sur chaque barre
   * @param {boolean[]} [parametres.labelAxeVert = true] Présence (ou non) des labels numériques sur l'axe vertical
   * @example diagrammeBarres([15, 25, 30, 10, 20], ['Compas', 'Rapporteur', 'Règle', 'Crayon', 'Gomme'])
   * // Trace un diagramme en barres avec les options par défaut
   * @example diagrammeBarres([15, 25, 30, 10, 20], ['Compas', 'Rapporteur', 'Règle', 'Crayon', 'Gomme'],{
   * reperageTraitPointille: true, couleurDeRemplissage: 'red', titreAxeVertical: 'Nombre de réponses',
   * titre = 'Matériel mathématique dans sa trousse', * hauteurDiagramme: 10, coeff: 3, etiquetteValeur: false }})
   * // Trace un diagramme en barres avec modification de quelques options par défaut
   * @return {DiagrammeBarres}
   */
export function diagrammeBarres (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 5, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  return new DiagrammeBarres(hauteursBarres, etiquettes, { reperageTraitPointille: reperageTraitPointille, couleurDeRemplissage: couleurDeRemplissage, titreAxeVertical: titreAxeVertical, titre: titre, hauteurDiagramme: hauteurDiagramme, coeff: coeff, axeVertical: axeVertical, etiquetteValeur: etiquetteValeur, labelAxeVert: labelAxeVert })
}

/** Trace un diagramme circulaire
   * @param {Object} parametres À saisir entre accolades
   * @param {number[]} parametres.effectifs Liste des effectifs à donner impérativement
   * @param {number} [parametres.x = 0] Abscisse du point en bas à gauche
   * @param {number} [parametres.y = 0] Ordonnée du point en bas à gauche
   * @param {number} [parametres.rayon = 4] Rayon du diagramme circulaire
   * @param {boolean} [parametres.semi = false] True pour un semi-circulaire, false pour un circulaire
   * @param {boolean} [parametres.legendeAffichage = true] Présence (ou non) de la légende (ensemble des labels)
   * @param {string[]} [parametres.labels = []] Labels associés aux effectifs respectifs. Tableau de même taille que effectifs.
   * @param {string} [parametres.legendePosition = 'droite'] Position de la légende à choisir parmi : 'droite', 'dessus' ou 'dessous'
   * @param {boolean[]} [parametres.mesures = []] Présence (ou non) de la mesure de chaque secteur. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.visibles = []] Découpe (ou non) du secteur (pour créer des diagrammes à compléter). Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.pourcents = []] Présence (ou non) du pourcentage de l'effectif total associé au secteur. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.valeurs = []] Présence (ou non) de des valeurs de l'effectif. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.hachures = []] Présence (ou non) de hachures dans le secteur associé. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.remplissage = []] Présence (ou non) d'une couleur de remplissage dans le secteur associé. Tableau de même taille que effectifs.
   * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
   * @property {number} x Abscisse du point en bas à gauche
   * @property {number} y Ordonnée du point en bas à gauche
   * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
   * @class
   */
function DiagrammeCirculaire ({ effectifs, x = 0, y = 0, rayon = 4, labels = [], semi = false, legendeAffichage = true, legendePosition = 'droite', mesures = [], visibles = [], pourcents = [], valeurs = [], hachures = [], remplissage = [] } = {}) {
  ObjetMathalea2D.call(this, { })
  const objets = []
  const listeHachuresDisponibles = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10]
  const listeMotifs = combinaisonListes(listeHachuresDisponibles, effectifs.length)
  this.bordures = [1000, 1000, -1000, -1000]
  this.x = x
  this.y = y
  const centre = point(this.x + rayon, this.y + (semi ? 0 : rayon))
  const depart = point(this.x + 2 * rayon, (semi ? this.y : this.y + rayon))
  const contour = semi ? arc(translation(centre, vecteur(rayon, 0)), centre, 180, true, 'white', 'black') : cercle(centre, rayon, 'black')
  let positionLegende // On prévoit l'emplacement de la légende si celle-ci est demandée
  switch (legendePosition) {
    case 'droite':
      positionLegende = { x: this.x + 2 * rayon + 1, y: this.y }
      break
    case 'dessus':
      positionLegende = { x: this.x, y: this.y + semi ? rayon + 1 : 2 * rayon + 1 }
      break
    case 'dessous':
      positionLegende = { x: this.x, y: this.y - 1.5 }
      break
  }
  let T = point(positionLegende.x, positionLegende.y)
  const angleTotal = semi ? 180 : 360
  const effectifTotal = effectifs.reduce((somme, valeur) => somme + valeur)
  const secteurs = []
  const legendes = []
  const etiquettes = []
  const etiquettes2 = []
  const etiquettes3 = []
  let alpha = 0 // alpha est l'angle à partir duquel démarre le secteur
  let legendeMax = 0
  for (let i = 0, a, angle, legende, textelegende, hachure; i < effectifs.length; i++) {
    // on crée les secteurs
    angle = angleTotal * effectifs[i] / effectifTotal
    a = arc(rotation(depart, centre, alpha), centre, angle, true)
    if (hachures[i]) {
      hachure = motifs(listeMotifs[i])
      a.hachures = hachure
      a.couleurDesHachures = colorToLatexOrHTML(texcolors(i + 1))
      a.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i + 2))
    } else {
      hachure = ''
      a.hachures = ''
    }
    a.opaciteDeRemplissage = 0.7
    if (remplissage[i]) a.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i + 1))
    if (visibles[i]) secteurs.push(a)
    if (valeurs[i]) {
      etiquettes.push(latexParPoint(texNombre(effectifs[i]), similitude(depart, centre, alpha + angle * 3 / 4, 0.8), 'black', 20, 12, 'yellow', 8))
    }
    if (pourcents[i]) {
      etiquettes2.push(latexParPoint(texNombre(100 * effectifs[i] / effectifTotal, 0) + '\\%', similitude(depart, centre, alpha + angle / 4, 0.8), 'black', 20, 12, 'yellow', 8))
    }
    if (mesures[i]) {
      etiquettes3.push(latexParPoint(texNombre(angle, 0) + '\\degree', similitude(depart, centre, alpha + angle / 2, 0.6), 'black', 20, 12, 'yellow', 8))
    }
    alpha += angle

    // on crée les légendes
    switch (legendePosition) {
      case 'droite':
        legende = carre(translation(T, vecteur(0, 1.5 * i)), translation(T, vecteur(1, 1.5 * i)), 'black')
        textelegende = texteParPoint(labels[i], translation(T, vecteur(1.2, i * 1.5 + 0.5)), 0, 'black', 1.5, 'gauche', false)
        legendeMax = Math.max(legendeMax, labels[i].length * 0.6)
        break
      default:
        legende = carre(T, translation(T, vecteur(1, 0)), 'black')
        textelegende = texteParPoint(labels[i], translation(T, vecteur(1.2, 0.5)), 0, 'black', 1.5, 'gauche', false)
        T = translation(T, vecteur(labels[i].length * 0.6 + 1, 0))
        legendeMax = legendeMax + labels[i].length * 0.6 + 2.2
        break
    }

    legende.couleurDeRemplissage = a.couleurDeRemplissage
    legende.couleurDesHachures = a.couleurDesHachures
    legende.hachures = hachure
    legende.opaciteDeRemplissage = 0.7
    legendes.push(legende, textelegende)
  }
  objets.push(contour)
  objets.push(...secteurs)
  if (legendeAffichage) objets.push(...legendes)
  objets.push(...etiquettes, ...etiquettes2, ...etiquettes3)
  // calcul des bordures
  this.bordures[0] = this.x - 0.5
  this.bordures[1] = this.y - 0.5 - (legendeAffichage ? (legendePosition === 'dessous' ? 2 : 0) : 0)
  this.bordures[2] = this.x + rayon * 2 + 1 + (legendeAffichage ? (legendePosition === 'droite' ? legendeMax : (Math.max(legendeMax, this.x + rayon * 2 + 1) - (this.x + rayon * 2 + 1))) : 0)
  this.bordures[3] = this.y + (semi ? rayon : rayon * 2) + (legendeAffichage ? (legendePosition === 'dessus' ? 2 : (legendePosition === 'droite' ? Math.max(this.y + (semi ? rayon : rayon * 2), effectifs.length * 1.5) - (this.y + (semi ? rayon : rayon * 2)) : 0)) : 0)
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
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

/** Trace un diagramme circulaire
   * @param {Object} parametres À saisir entre accolades
   * @param {number[]} parametres.effectifs Liste des effectifs à donner impérativement
   * @param {number} [parametres.x = 0] Abscisse du point en bas à gauche
   * @param {number} [parametres.y = 0] Ordonnée du point en bas à gauche
   * @param {number} [parametres.rayon = 4] Rayon du diagramme circulaire
   * @param {boolean} [parametres.semi = false] True pour un semi-circulaire, false pour un circulaire
   * @param {boolean} [parametres.legendeAffichage = true] Présence (ou non) de la légende (ensemble des labels)
   * @param {string[]} [parametres.labels = []] Labels associés aux effectifs respectifs. Tableau de même taille que effectifs.
   * @param {string} [parametres.legendePosition = 'droite'] Position de la légende à choisir parmi : 'droite', 'dessus' ou 'dessous'
   * @param {boolean[]} [parametres.mesures = []] Présence (ou non) de la mesure de chaque secteur. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.visibles = []] Découpe (ou non) du secteur (pour créer des diagrammes à compléter). Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.pourcents = []] Présence (ou non) du pourcentage de l'effectif total associé au secteur. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.valeurs = []] Présence (ou non) de des valeurs de l'effectif. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.hachures = []] Présence (ou non) de hachures dans le secteur associé. Tableau de même taille que effectifs.
   * @param {boolean[]} [parametres.remplissage = []] Présence (ou non) d'une couleur de remplissage dans le secteur associé. Tableau de même taille que effectifs.
   * @example diagrammeCirculaire({ rayon: 7, semi: false, legendePosition: 'dessous',
   * effectifs: [15, 25, 30, 10, 20],
   * labels: ['Compas', 'Rapporteur', 'Règle', 'Crayon', 'Gomme'],
   * mesures: [true, true, true, false, true],
   * visibles: [true, false, true, true, true],
   * pourcents: [true, true, true, false, true],
   * valeurs: [true, false, true, true, false],
   * hachures: [true, true, true, false, true],
   * remplissage: [false, true, true, true, true] })
   * // Trace un diagramme semi-circulaire de rayon 7 avec différentes options
   * @return {DiagrammeCirculaire}
   */
export function diagrammeCirculaire ({ effectifs, x = 0, y = 0, rayon = 4, labels = [], semi = false, legendeAffichage = true, legendePosition = 'droite', mesures = [], visibles = [], pourcents = [], valeurs = [], hachures = [], remplissage = [] } = {}) {
  return new DiagrammeCirculaire({ effectifs: effectifs, x: x, y: y, rayon: rayon, labels: labels, semi: semi, legendeAffichage: legendeAffichage, legendePosition: legendePosition, mesures: mesures, visibles: visibles, pourcents: pourcents, valeurs: valeurs, hachures: hachures, remplissage: remplissage })
}
