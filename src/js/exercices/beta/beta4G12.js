import Exercice from '../Exercice.js'
import { choice, lettreDepuisChiffre, listeQuestionsToContenu } from '../../modules/outils.js'
import { grille, labelPoint, mathalea2d, point, segment, tracePoint, homothetie, polygone, symetrieAxiale, translation, droite, vecteur, rotation, milieu, barycentre, texteParPointEchelle, texteParPoint } from '../../modules/2d.js'

export const titre = 'Exo zéro Mathalea2d'

export default function SuperExoMathalea2d () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  const A = point(0, 0)
  const typeDeTransfos = ['symax', 'trans', 'rot90', 'rot180']
  const motifs = [
    polygone([point(1, 1), point(2, 1), point(2, 4), point(6, 4), point(6, 5), point(3, 5), point(3, 6), point(1, 6)]),
    polygone([point(1, 1), point(3, 1), point(3, 4), point(6, 4), point(6, 6), point(3, 6), point(3, 5), point(1, 5)])
  ]
  const noeuds = []
  const maGrille = []
  const labels = []
  maGrille.push(grille(0, 0, 16, 16, 'gray', 0.4, 0.4))
  for (let i = 0; i < 6; i++) {
    maGrille.push(segment(i * 3.2, 0, i * 3.2, 16))
    maGrille.push(segment(0, i * 3.2, 16, i * 3.2))
    for (let j = 0; j < 6; j++) {
      labels[i * 6 + j] = i * 6 + j < 26 ? lettreDepuisChiffre(i * 6 + j + 1) : lettreDepuisChiffre((i * 6 + j) % 26 + 1) + "'"
      noeuds[i * 6 + j] = point(i * 3.2, j * 3.2, labels[i * 6 + j], 'above right')
      maGrille.push(tracePoint(noeuds[i * 6 + j]))
    }
  }
  const parcours = [ // différents parcours pour aller de la figure de départ à celle d'arrivée.
    [0, 1, 2, 3, 4, 10, 16, 22, 28],
    [0, 1, 2, 3, 9, 10, 16, 22, 28],
    [0, 1, 2, 3, 9, 15, 16, 22, 28],
    [0, 1, 2, 3, 9, 15, 21, 22, 28],
    [0, 1, 2, 3, 9, 15, 21, 27, 28],
    [0, 1, 2, 8, 9, 10, 16, 22, 28],
    [0, 1, 2, 8, 9, 15, 16, 22, 28],
    [0, 1, 2, 8, 9, 15, 21, 22, 28],
    [0, 1, 2, 8, 9, 15, 21, 27, 28],
    [0, 1, 2, 8, 14, 15, 16, 22, 28],
    [0, 1, 2, 8, 14, 15, 21, 22, 28],
    [0, 1, 2, 8, 14, 15, 21, 27, 28],
    [0, 1, 2, 8, 14, 20, 21, 22, 28],
    [0, 1, 2, 8, 14, 20, 21, 27, 28],
    [0, 1, 2, 8, 14, 20, 26, 27, 28],
    [0, 1, 7, 8, 9, 10, 16, 22, 28],
    [0, 1, 7, 8, 9, 15, 16, 22, 28],
    [0, 1, 7, 8, 9, 15, 21, 22, 28],
    [0, 1, 7, 8, 9, 15, 21, 27, 28],
    [0, 1, 7, 8, 14, 15, 16, 22, 28],
    [0, 1, 7, 8, 14, 15, 21, 22, 28],
    [0, 1, 7, 8, 14, 15, 21, 27, 28],
    [0, 1, 7, 8, 14, 20, 21, 22, 28],
    [0, 1, 7, 8, 14, 20, 21, 27, 28],
    [0, 1, 7, 8, 14, 20, 26, 27, 28],
    [0, 1, 7, 13, 14, 15, 16, 22, 28],
    [0, 1, 7, 13, 14, 15, 21, 22, 28],
    [0, 1, 7, 13, 14, 15, 21, 27, 28],
    [0, 1, 7, 13, 14, 20, 21, 22, 28],
    [0, 1, 7, 13, 14, 20, 21, 22, 28],
    [0, 1, 7, 13, 14, 20, 21, 27, 28],
    [0, 1, 7, 13, 14, 20, 26, 27, 28],
    [0, 1, 7, 13, 19, 20, 21, 22, 28],
    [0, 1, 7, 13, 19, 20, 21, 27, 28],
    [0, 1, 7, 13, 19, 20, 26, 27, 28],
    [0, 1, 7, 13, 19, 25, 26, 27, 28],
    [0, 6, 7, 8, 9, 10, 16, 22, 28],
    [0, 6, 7, 8, 9, 15, 16, 22, 28],
    [0, 6, 7, 8, 9, 15, 21, 22, 28],
    [0, 6, 7, 8, 9, 15, 21, 27, 28],
    [0, 6, 7, 8, 14, 15, 16, 22, 28],
    [0, 6, 7, 8, 14, 15, 21, 22, 28],
    [0, 6, 7, 8, 14, 15, 21, 27, 28],
    [0, 6, 7, 8, 14, 20, 21, 22, 28],
    [0, 6, 7, 8, 14, 20, 21, 27, 28],
    [0, 6, 7, 8, 14, 20, 26, 27, 28],
    [0, 6, 7, 13, 14, 15, 16, 22, 28],
    [0, 6, 7, 13, 14, 15, 21, 22, 28],
    [0, 6, 7, 13, 14, 15, 21, 27, 28],
    [0, 6, 7, 13, 14, 20, 21, 22, 28],
    [0, 6, 7, 13, 14, 20, 21, 22, 28],
    [0, 6, 7, 13, 14, 20, 21, 27, 28],
    [0, 6, 7, 13, 14, 20, 26, 27, 28],
    [0, 6, 7, 13, 19, 20, 21, 22, 28],
    [0, 6, 7, 13, 19, 20, 21, 27, 28],
    [0, 6, 7, 13, 19, 20, 26, 27, 28],
    [0, 6, 7, 13, 19, 25, 26, 27, 28],
    [0, 6, 12, 13, 14, 15, 16, 22, 28],
    [0, 6, 12, 13, 14, 15, 21, 22, 28],
    [0, 6, 12, 13, 14, 15, 21, 27, 28],
    [0, 6, 12, 13, 14, 20, 21, 22, 28],
    [0, 6, 12, 13, 14, 20, 21, 22, 28],
    [0, 6, 12, 13, 14, 20, 21, 27, 28],
    [0, 6, 12, 13, 14, 20, 26, 27, 28],
    [0, 6, 12, 13, 19, 20, 21, 22, 28],
    [0, 6, 12, 13, 19, 20, 21, 27, 28],
    [0, 6, 12, 13, 19, 20, 26, 27, 28],
    [0, 6, 12, 13, 19, 25, 26, 27, 28],
    [0, 6, 12, 18, 19, 20, 21, 22, 28],
    [0, 6, 12, 18, 19, 20, 21, 27, 28],
    [0, 6, 12, 18, 19, 20, 26, 27, 28],
    [0, 6, 12, 18, 19, 25, 26, 27, 28],
    [0, 6, 12, 18, 24, 25, 26, 27, 28]
  ]
  function transfoPoly (pol, { type = 'symax', centre, axe, vecteur, angle = 90, sens = true }) {
    switch (type) { // type est l'une des chaine suivante 'symax', 'trans', 'rot90', 'rot180'
      case 'symax':
        return symetrieAxiale(pol, axe)
      case 'trans':
        return translation(pol, vecteur)
      case 'rot90':
        return rotation(pol, centre, sens ? angle : -angle)
      case 'rot180':
        return rotation(pol, centre, 180)
      default:
        return pol
    }
  }
  function definitElements (type, depart, arrivee, leSens = true) {
    const Est = (arrivee - depart === 6) // si on va vers la droite il y a 6 numéros d'écart entre arrivée et départ sinon, c'est 1 (vers le haut)
    switch (type) {
      case 'symax': // vers l'est la droite est définie par arrivee et arrivee+1 sinon c'est arrivee et arrivee+6
        return { type: type, axe: Est ? droite(noeuds[arrivee], noeuds[arrivee + 1]) : droite(noeuds[arrivee], noeuds[arrivee + 6]) }
      case 'trans': // facile pour la translation : depart->arrivee
        return { type: type, vecteur: vecteur(noeuds[depart], noeuds[arrivee]) }
      case 'rot90': // la position du centre dépend du sens de rotation et de départ et arrivee.
        return { type: type, centre: Est ? (leSens ? noeuds[arrivee + 1] : noeuds[arrivee]) : (leSens ? noeuds[arrivee] : noeuds[arrivee + 6]), sens: leSens }
      case 'rot180': // pas besoin du sens, mais le milieu choisit dépend de depart et arrivee
        return { type: type, centre: milieu(noeuds[arrivee], Est ? noeuds[arrivee + 1] : noeuds[arrivee + 6]) }
    }
  }
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    for (let i = 0, texte, texteCorr, chemin, objetsEnonce, objetsCorrection, polys, transfos, leurre0; i < this.nbQuestions; i++) {
      polys = []
      transfos = []
      polys[0] = homothetie(choice(motifs), A, 0.4)
      leurre0 = translation(polys[0], vecteur(...choice([[0.4, 0], [0, 0.4], [0.4, 0.4]]))) // on translate aléatoirement le motif de départ pour faire le leurre
      for (let x = 0; x < 5; x++) {
        for (let y = 0, dalle, transfoAlea, elements; y < 5; y++) {
          if (x + y > 0) {
            dalle = x * 6 + y
            transfoAlea = choice(typeDeTransfos)
            if (y > 0) {
              elements = definitElements(transfoAlea, dalle - 1, dalle, choice([true, false]))
              polys[dalle] = transfoPoly(dalle === 1 ? leurre0 : polys[dalle - 1], elements)
            } else {
              elements = definitElements(transfoAlea, dalle - 6, dalle, choice([true, false]))
              polys[dalle] = transfoPoly(dalle === 6 ? leurre0 : polys[dalle - 6], elements)
            }
          }
        }
      }

      chemin = choice(parcours)
      for (let k = 0; k < 8; k++) {
        transfos[k] = definitElements(choice(typeDeTransfos), chemin[k], chemin[k + 1], choice([true, false]))
        polys[chemin[k + 1]] = transfoPoly(polys[chemin[k]], transfos[k])
      }
      objetsEnonce = []
      objetsCorrection = []
      texte = ''
      texteCorr = ''

      for (let x = 0; x < 5; x++) {
        for (let y = 0, numero; y < 5; y++) {
          numero = texteParPoint(Number(x * 6 + y).toString(), point(x * 3.2 + 1.6, y * 3.2 + 1.6), 'milieu', 'yellow', 1.2, 'middle', true)
          numero.contour = true
          numero.couleurDeRemplissage = 'black'
          numero.opacite = 0.5
          numero.opaciteDeRemplissage = 1
          maGrille.push(numero)
          polys[x * 6 + y].opacite = 0.4
          polys[x * 6 + y].color = 'blue'
        }
      }

      polys[0].opaciteDeRemplissage = 0.5
      polys[0].color = 'blue'
      polys[0].couleurDeRemplissage = 'blue'
      polys[28].opaciteDeRemplissage = 0.5
      polys[28].color = 'red'
      polys[28].couleurDeRemplissage = 'red'
      objetsEnonce.push(...maGrille)
      objetsCorrection.push(...maGrille)

      objetsEnonce.push(...polys)
      for (let x = 0; x < 6; x++) {
        for (let y = 0, label; y < 6; y++) {
          label = texteParPoint(noeuds[x * 6 + y].nom, translation(noeuds[x * 6 + y], vecteur(0.3, 0.3)), 'milieu', 'red', 1.2, 'middle', true)
          label.contour = true
          label.couleurDeRemplissage = 'black'
          label.opacite = 0.8
          label.opaciteDeRemplissage = 1
          objetsEnonce.push(label)
        }
      }
      const paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: 18, ymax: 18, pixelsParCm: 20, scale: 1, mainlevee: false }

      const paramsCorrection = { xmin: -0.5, ymin: -0.5, xmax: 18, ymax: 18, pixelsParCm: 20, scale: 1 }

      texte += mathalea2d(paramsEnonce, objetsEnonce)

      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
}
