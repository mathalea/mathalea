import Exercice from '../Exercice.js'
import { texcolors, choice, lettreDepuisChiffre, listeQuestionsToContenu, texteEnCouleurEtGras, sp, deuxColonnes, centrage, texteEnCouleur } from '../../modules/outils.js'
import { grille, mathalea2d, point, segment, tracePoint, homothetie, polygone, symetrieAxiale, translation, droite, vecteur, rotation, milieu, texteParPointEchelle } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const dateDePublication = '3/12/2021'
export const titre = 'Séries de transformations'

export default function SerieDeTransformations () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.spacing = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  const A = point(0, 0)
  const typeDeTransfos = ['symax', 'trans', 'rot90', 'rot180']
  const motifs = [
    polygone([point(1, 1), point(2, 1), point(2, 4), point(6, 4), point(6, 5), point(3, 5), point(3, 6), point(1, 6)]),
    polygone([point(1, 1), point(3, 1), point(3, 4), point(6, 4), point(6, 6), point(3, 6), point(3, 5), point(1, 5)]),
    polygone([point(2, 1), point(3, 1), point(3, 3), point(4, 3), point(4, 4), point(3, 4), point(3, 5), point(5, 5), point(5, 6), point(2, 6), point(2, 4), point(1, 4), point(1, 3), point(2, 3)]),
    polygone([point(1, 1), point(4, 1), point(4, 2), point(5, 2), point(5, 4), point(4, 4), point(4, 5), point(3, 5), point(3, 6), point(2, 6), point(2, 2), point(1, 2)]),
    polygone([point(2, 1), point(5, 1), point(5, 3), point(6, 3), point(6, 4), point(4, 4), point(4, 3), point(3, 3), point(3, 5), point(5, 5), point(5, 6), point(2, 6)]),
    polygone([point(1, 1), point(5, 1), point(5, 2), point(2, 2), point(2, 3), point(3, 3), point(3, 4), point(2, 4), point(2, 5), point(4, 5), point(4, 6), point(1, 6)]),
    polygone([point(2, 6), point(2, 1), point(5, 1), point(5, 2), point(3, 2), point(3, 6)]),
    polygone([point(2, 6), point(5, 6), point(5, 5), point(4, 5), point(4, 1), point(1, 1), point(1, 2), point(3, 2), point(3, 5), point(2, 5)]),
    polygone([point(2, 1), point(3, 1), point(6, 1), point(6, 2), point(3, 2), point(3, 3), point(5, 3), point(5, 5), point(3, 5), point(3, 6), point(2, 6)]),
    polygone([point(2, 1), point(3, 1), point(3, 3), point(5, 3), point(5, 6), point(2, 6)]),
    polygone([point(2, 1), point(2, 6), point(5, 6), point(5, 3), point(3, 3), point(5, 1), point(4, 1), point(3, 2), point(3, 1)]),
    polygone([point(2, 1), point(6, 1), point(6, 4), point(3, 4), point(3, 5), point(5, 5), point(5, 6), point(2, 6), point(2, 3), point(5, 3), point(5, 2), point(2, 2)]),
    polygone([point(2, 1), point(4, 1), point(5, 2), point(5, 1), point(6, 1), point(6, 6), point(5, 6), point(5, 3), point(4, 2), point(3, 2), point(3, 6), point(2, 6)]),
    polygone([point(1, 6), point(2, 6), point(4, 3), point(5, 5), point(6, 5), point(4, 1), point(3, 1)]),
    polygone([point(2, 6), point(3, 6), point(4, 4), point(5, 6), point(6, 6), point(3, 1), point(2, 1), point(3, 3)]),
    polygone([point(1, 1), point(6, 1), point(6, 2), point(3, 5), point(5, 5), point(5, 6), point(1, 6), point(5, 2), point(1, 2)]),
    polygone([point(3, 6), point(3, 5), point(2, 5), point(2, 4), point(3, 4), point(3, 3), point(1, 3), point(1, 2), point(3, 2), point(3, 1), point(4, 1), point(4, 2), point(5, 2), point(5, 3), point(4, 3), point(4, 4), point(6, 4), point(6, 5), point(4, 5), point(4, 6)]),
    polygone([point(2, 1), point(3, 3), point(2, 3), point(2, 4), point(6, 4), point(6, 3), point(5, 3), point(5, 1), point(4, 1), point(4, 3), point(3, 1)]),
    polygone([point(2, 2), point(3, 3), point(3, 2), point(4, 3), point(4, 2), point(5, 3), point(5, 2), point(6, 3), point(6, 5), point(2, 5)]),
    polygone([point(1, 1), point(3, 1), point(3, 5), point(5, 5), point(5, 6), point(2, 6), point(2, 2), point(1, 2)]),
    polygone([point(1, 1), point(6, 1), point(6, 2), point(4, 2), point(4, 4), point(5, 4), point(5, 5), point(1, 5), point(1, 4), point(3, 4), point(3, 2), point(1, 2)]),
    polygone([point(2, 1), point(2, 3), point(4, 3), point(4, 4), point(3, 4), point(3, 6), point(6, 6), point(6, 4), point(5, 4), point(5, 3), point(6, 3), point(6, 1), point(5, 1), point(5, 2), point(4, 2), point(4, 1)]),
    polygone([point(2, 6), point(2, 4), point(1, 4), point(1, 2), point(2, 2), point(2, 1), point(3, 1), point(3, 3), point(5, 3), point(5, 4), point(4, 4), point(4, 5), point(3, 5), point(3, 6)]),
    polygone([point(1, 3), point(1, 1), point(3, 1), point(3, 2), point(6, 2), point(6, 5), point(3, 5), point(3, 3)]),
    polygone([point(2, 1), point(2, 2), point(1, 2), point(1, 4), point(2, 4), point(2, 3), point(3, 3), point(3, 2), point(4, 2), point(4, 4), point(3, 4), point(3, 6), point(6, 6), point(6, 4), point(5, 4), point(5, 3), point(6, 3), point(6, 1)]),
    polygone([point(3, 1), point(3, 2), point(1, 2), point(1, 3), point(2, 3), point(2, 4), point(3, 4), point(3, 5), point(5, 5), point(5, 4), point(6, 4), point(6, 3), point(5, 3), point(5, 2), point(4, 2), point(4, 1)])
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
  function definitElements (type, depart, arrivee, leSens = true, num = 0) {
    let texte, texteCorr
    const Est = (arrivee - depart === 6) // si on va vers la droite il y a 6 numéros d'écart entre arrivée et départ sinon, c'est 1 (vers le haut)
    switch (type) {
      case 'symax': // vers l'est la droite est définie par arrivee et arrivee+1 sinon c'est arrivee et arrivee+6
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la symétrie d'axe $(${noeuds[arrivee].nom}${Est ? noeuds[arrivee + 1].nom : noeuds[arrivee + 6].nom})$.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la symétrie d'axe $(${sp(1)}\\ldots${sp(1)})$.`
        return { texte: texte, texteCorr: texteCorr, type: type, axe: Est ? droite(noeuds[arrivee], noeuds[arrivee + 1]) : droite(noeuds[arrivee], noeuds[arrivee + 6]) }
      case 'trans': // facile pour la translation : depart->arrivee
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la translation transformant $${noeuds[depart].nom}$ en $${noeuds[arrivee].nom}$.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la translation transformant ${sp(1)}\\ldots${sp(1)} en ${sp(1)}\\ldots${sp(1)}.`
        return { texte: texte, texteCorr: texteCorr, type: type, vecteur: vecteur(noeuds[depart], noeuds[arrivee]) }
      case 'rot90': // la position du centre dépend du sens de rotation et de départ et arrivee.
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la rotation de centre $${Est ? (leSens ? noeuds[arrivee + 1].nom : noeuds[arrivee].nom) : (leSens ? noeuds[arrivee].nom : noeuds[arrivee + 6].nom)}$ d'angle $90\\degree$ dans le sens ${leSens ? "contraire des aiguilles d'une montre" : "des aiguilles d'une montre"}.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la rotation de centre ${sp(1)}\\ldots${sp(1)} d'angle $90\\degree$ dans le sens  ${leSens ? "contraire des aiguilles d'une montre" : "des aiguilles d'une montre"}.`
        return { texte: texte, texteCorr: texteCorr, type: type, centre: Est ? (leSens ? noeuds[arrivee + 1] : noeuds[arrivee]) : (leSens ? noeuds[arrivee] : noeuds[arrivee + 6]), sens: leSens }
      case 'rot180': // pas besoin du sens, mais le milieu choisit dépend de depart et arrivee
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la symétrie de centre le milieu du segment $[${noeuds[arrivee].nom}${Est ? noeuds[arrivee + 1].nom : noeuds[arrivee + 6].nom}]$.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la symétrie de centre le milieu du segment $[${sp(1)}\\ldots${sp(1)}]$.`
        return { texte: texte, texteCorr: texteCorr, type: type, centre: milieu(noeuds[arrivee], Est ? noeuds[arrivee + 1] : noeuds[arrivee + 6]) }
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
        transfos[k] = definitElements(choice(typeDeTransfos), chemin[k], chemin[k + 1], choice([true, false]), k)
        polys[chemin[k + 1]] = transfoPoly(polys[chemin[k]], transfos[k])
      }
      objetsEnonce = []
      objetsCorrection = []
      texte = "On passe de la figure $0$ à la figure $28$ en passant par des cases adjacentes. Retrouver les transformations successives qui sont listées dans l'ordre.<br>"
      texteCorr = ''

      for (let x = 0; x < 5; x++) {
        for (let y = 0, numero; y < 5; y++) {
          numero = texteParPointEchelle(Number(x * 6 + y).toString(), point(x * 3.2 + 1.6, y * 3.2 + 1.6), 'milieu', context.isHtml ? 'yellow' : 'black', 1.2, 'middle', true, 0.4)
          numero.contour = context.isHtml
          numero.couleurDeRemplissage = 'black'
          numero.opacite = context.isHtml ? 0.5 : 1
          numero.opaciteDeRemplissage = 1
          maGrille.push(numero)
          polys[x * 6 + y].opacite = 0.4
          polys[x * 6 + y].color = 'blue'
        }
      }

      polys[0].opaciteDeRemplissage = 0.7
      polys[0].color = texcolors(8)
      polys[0].couleurDeRemplissage = texcolors(8)
      polys[28].opaciteDeRemplissage = 0.7
      polys[28].color = texcolors(16)
      polys[28].couleurDeRemplissage = texcolors(16)
      objetsEnonce.push(...polys)
      objetsEnonce.push(...maGrille)

      for (let x = 0; x < 6; x++) {
        for (let y = 0, label; y < 6; y++) {
          label = texteParPointEchelle(noeuds[x * 6 + y].nom, translation(noeuds[x * 6 + y], vecteur(0.3, 0.3)), 'milieu', context.isHtml ? 'red' : 'black', 1.2, 'middle', true, 0.4)
          label.contour = context.isHtml
          label.couleurDeRemplissage = 'black'
          label.opacite = context.isHtml ? 0.8 : 1
          label.opaciteDeRemplissage = 1
          objetsEnonce.push(label)
        }
      }
      const paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: 0.7 }
      const paramsCorrection = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: 0.6 }
      for (let k = 1, figure; k < 8; k++) {
        figure = translation(polys[chemin[k]], vecteur(0, 0))
        figure.color = texcolors(k + 8)
        figure.couleurDeRemplissage = texcolors(k + 8)
        figure.opaciteDeRemplissage = 0.6
        objetsCorrection.push(figure)
      }
      objetsCorrection.push(...objetsEnonce)
      for (let etape = 0; etape < 8; etape++) {
        texte += texteEnCouleur(transfos[etape].texte, etape % 2 === 0 ? 'black' : 'brown') + '<br>'
        texteCorr += transfos[etape].texteCorr + '<br>'
      }
      if (context.isHtml) {
        texte = deuxColonnes(texte, mathalea2d(paramsEnonce, objetsEnonce), 50)
        texteCorr = deuxColonnes(texteCorr, mathalea2d(paramsCorrection, objetsCorrection), 50)
      } else {
        texte += '\n' + centrage(mathalea2d(paramsEnonce, objetsEnonce))
        texteCorr += '\n' + centrage(mathalea2d(paramsCorrection, objetsCorrection))
      }
      texte += context.isHtml ? '<br>' : '\n\\newpage'
      texteCorr += context.isHtml ? '<br>' : '\n\\newpage'
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
}
