import Exercice from '../Exercice.js'
import { texcolors, choice, lettreDepuisChiffre, listeQuestionsToContenu, texteEnCouleurEtGras, sp, deuxColonnes, centrage, texteEnCouleur, contraindreValeur, enleveElement, compteOccurences, miseEnEvidence, calcul } from '../../modules/outils.js'
import { grille, mathalea2d, point, segment, tracePoint, homothetie, polygone, symetrieAxiale, translation, droite, vecteur, rotation, milieu, texteParPointEchelle, colorToLatexOrHTML } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { mod } from 'mathjs'

export const titre = 'Trouver une série de transformations'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

export const dateDePublication = '3/12/2021'

/**
 * A partir de la figure 0, l'idée est de trouver un chemin qui mène à la figure 28 par une série
 * de transformations entre deux figures strictement voisines.
 * Ref 4G12
 * @author : Jean-Claude Lhote (et modifié par Eric Elter)
 * publié le 03/12/2021
 */

export default function SerieDeTransformations () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.spacing = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  const A = point(0, 0)
  let typeDeTransfos
  this.sup = 4
  this.sup2 = 6
  this.sup3 = false
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
  maGrille.push(grille(0, 0, 16, 16, 'black', 0.2, 0.4))
  for (let i = 0; i < 6; i++) {
    maGrille.push(segment(i * 3.2, 0, i * 3.2, 16))
    maGrille.push(segment(0, i * 3.2, 16, i * 3.2))
    for (let j = 0; j < 6; j++) {
      labels[i * 6 + j] = i * 6 + j < 26 ? lettreDepuisChiffre(i * 6 + j + 1) : lettreDepuisChiffre((i * 6 + j) % 26 + 1) + "'"
      noeuds[i * 6 + j] = point(i * 3.2, j * 3.2, labels[i * 6 + j], 'above right')
      maGrille.push(tracePoint(noeuds[i * 6 + j]))
    }
  }

  function transfoPoly (pol, { type = 'symax', centre, axe, vecteur, angle = 90, sens = true }) {
    switch (type) { // type est l'une des chaines suivantes 'symax', 'trans', 'rot90', 'rot180'
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
    let texte, texteCorr, texteInteractif, axeSymetrie, nomDroite, nomCentreRotation, centreRotation, centreSymetrie, nomSegment
    const sensProgression = (arrivee - depart === 6) ? 'Est' : (arrivee - depart === -6) ? 'Ouest' : (arrivee - depart === 1) ? 'Nord' : 'Sud'
    switch (type) {
      case 'symax': // vers l'est la droite est définie par arrivee et arrivee+1 sinon c'est arrivee et arrivee+6
        switch (sensProgression) {
          case 'Est' :
            axeSymetrie = droite(noeuds[arrivee], noeuds[arrivee + 1])
            nomDroite = '(' + noeuds[arrivee].nom + noeuds[arrivee + 1].nom + ')'
            break
          case 'Ouest' :
            axeSymetrie = droite(noeuds[depart], noeuds[depart + 1])
            nomDroite = '(' + noeuds[depart].nom + noeuds[depart + 1].nom + ')'
            break
          case 'Nord' :
            axeSymetrie = droite(noeuds[arrivee], noeuds[arrivee + 6])
            nomDroite = '(' + noeuds[arrivee].nom + noeuds[arrivee + 6].nom + ')'
            break
          case 'Sud' :
            axeSymetrie = droite(noeuds[depart], noeuds[depart + 6])
            nomDroite = '(' + noeuds[depart].nom + noeuds[depart + 6].nom + ')'
            break
        }
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 11))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 12))} par la symétrie d'axe $${nomDroite}$.`
        texte = `La figure${sp(1)}...${sp(1)}a pour image la figure${sp(1)}\\ldots${sp(1)}par la symétrie d'axe $(${sp(1)}\\ldots${sp(1)})$`
        texteInteractif = "Une symétrie axiale dont l'axe passe par deux points du quadrillage."
        return { texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, axe: axeSymetrie }
      case 'trans': // facile pour la translation : depart->arrivee
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 11))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 12))} par la translation transformant $${noeuds[depart].nom}$ en $${noeuds[arrivee].nom}$.`
        texte = `La figure${sp(1)}...${sp(1)}a pour image la figure${sp(1)}\\ldots${sp(1)}par la translation transformant ${sp(1)}\\ldots${sp(1)} en ${sp(1)}\\ldots${sp(1)}`
        texteInteractif = 'Une translation définie par deux points du quadrillage.'
        return { texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, vecteur: vecteur(noeuds[depart], noeuds[arrivee]) }
      case 'rot90': // la position du centre dépend du sens de rotation et de départ et arrivee.
        switch (sensProgression) {
          case 'Est' :
            centreRotation = leSens ? noeuds[arrivee + 1] : noeuds[arrivee]
            nomCentreRotation = leSens ? noeuds[arrivee + 1].nom : noeuds[arrivee].nom
            break
          case 'Ouest' :
            centreRotation = leSens ? noeuds[depart] : noeuds[depart + 1]
            nomCentreRotation = leSens ? noeuds[depart].nom : noeuds[depart + 1].nom
            break
          case 'Nord' :
            centreRotation = leSens ? noeuds[arrivee] : noeuds[arrivee + 6]
            nomCentreRotation = leSens ? noeuds[arrivee].nom : noeuds[arrivee + 6].nom
            break
          case 'Sud' :
            centreRotation = leSens ? noeuds[depart + 6] : noeuds[depart]
            nomCentreRotation = leSens ? noeuds[depart + 6].nom : noeuds[depart].nom
            break
        }
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 11))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 12))} par la rotation de centre $${nomCentreRotation}$ d'angle $90\\degree$ dans le sens ${leSens ? "contraire des aiguilles d'une montre" : "des aiguilles d'une montre"}.`
        texte = `La figure${sp(1)}...${sp(1)}a pour image la figure${sp(1)}\\ldots${sp(1)}par la rotation de centre ${sp(1)}\\ldots${sp(1)} d'angle $90\\degree$ dans le sens  ${leSens ? "contraire des aiguilles d'une montre" : "des aiguilles d'une montre"}`
        texteInteractif = "Une rotation d'angle 90° et dont le centre est un point du quadrillage."
        return { texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, centre: centreRotation, sens: leSens }
      case 'rot180': // pas besoin du sens, mais le milieu choisit dépend de depart et arrivee
        switch (sensProgression) {
          case 'Est' :
            centreSymetrie = milieu(noeuds[arrivee], noeuds[arrivee + 1])
            nomSegment = '[' + noeuds[arrivee + 1].nom + noeuds[arrivee].nom + ']'
            break
          case 'Ouest' :
            centreSymetrie = milieu(noeuds[depart], noeuds[depart + 1])
            nomSegment = '[' + noeuds[depart + 1].nom + noeuds[depart].nom + ']'
            break
          case 'Nord' :
            centreSymetrie = milieu(noeuds[arrivee], noeuds[arrivee + 6])
            nomSegment = '[' + noeuds[arrivee + 6].nom + noeuds[arrivee].nom + ']'
            break
          case 'Sud' :
            centreSymetrie = milieu(noeuds[depart], noeuds[depart + 6])
            nomSegment = '[' + noeuds[depart + 6].nom + noeuds[depart].nom + ']'
            break
        }
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 11))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 12))} par la symétrie dont le centre est le milieu de $${nomSegment}$.`
        texte = `La figure${sp(1)}...${sp(1)}a pour image la figure${sp(1)}\\ldots${sp(1)}par la symétrie dont le centre est le milieu de $[${sp(1)}\\ldots${sp(1)}]$`
        texteInteractif = "Une symétrie centrale dont le centre est un milieu d'un côté de case."
        return { texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, centre: centreSymetrie }
    }
  }
  this.nouvelleVersion = function () {
    if (this.version === 1) {
      this.sup = 1
    } else if (this.version === 2) {
      this.sup = 2
    } else if (this.version === 3) {
      this.sup = 3
    } else this.sup = 4
    this.autoCorrection = []
    this.sup = contraindreValeur(1, 4, this.sup, 4)
    if (this.sup === 1) typeDeTransfos = ['symax']
    else if (this.sup === 2) typeDeTransfos = ['symax', 'rot180']
    else if (this.sup === 3) typeDeTransfos = ['symax', 'trans', 'rot180']
    else typeDeTransfos = ['symax', 'trans', 'rot90', 'rot180']
    this.listeQuestions = []
    this.listeCorrections = []
    for (let i = 0, texte, texteCorr, paramsCorrection, paramsEnonce, nbTransfMin, nbTransfMax, nbVoisins, futursVoisinsPossibles, parcoursPossible, numeroFigure, chemin, objetsEnonce, objetsCorrection, polys, transfos, leurre0; i < this.nbQuestions; i++) {
      this.autoCorrection[i] = {}
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

      // Construction d'un chemin pour aller de la figure de départ à celle d'arrivée
      chemin = []
      this.sup2 = parseInt(this.sup2)
      switch (this.sup2) {
        case 1 :
          nbTransfMin = 8
          nbTransfMax = 10
          break
        case 2 :
          nbTransfMin = 10
          nbTransfMax = 12
          break
        case 3 :
          nbTransfMin = 12
          nbTransfMax = 14
          break
        case 4 :
          nbTransfMin = 14
          nbTransfMax = 16
          break
        case 5 :
          nbTransfMin = 16
          nbTransfMax = 18
          break
        default :
          nbTransfMin = 8
          nbTransfMax = 18
          break
      }
      while (chemin.length < nbTransfMin || chemin.length > nbTransfMax) {
        chemin = [0]
        numeroFigure = 0
        parcoursPossible = [numeroFigure - 6, numeroFigure - 1, numeroFigure + 1, numeroFigure + 6]

        while (numeroFigure !== 28) {
          parcoursPossible = [numeroFigure - 6, numeroFigure - 1, numeroFigure + 1, numeroFigure + 6]
          if (mod(numeroFigure, 6) === 0) { // bord bas de la figure
            enleveElement(parcoursPossible, numeroFigure - 6)
            enleveElement(parcoursPossible, numeroFigure - 1)
          } else if (mod(numeroFigure, 6) === 4) { // bord haut de la figure
            enleveElement(parcoursPossible, numeroFigure - 6)
            enleveElement(parcoursPossible, numeroFigure + 1)
          } else if (mod(numeroFigure, 6) === 3) { // Avant-dernière ligne de la figure
            enleveElement(parcoursPossible, numeroFigure - 6) // Interdiction d'aller à gauche sous peine de retour impossible
          }
          if (numeroFigure >= 24) { // bord droit de la figure
            enleveElement(parcoursPossible, numeroFigure + 6)
            enleveElement(parcoursPossible, numeroFigure - 1)
          } else if (numeroFigure <= 4) { // bord gauche de la figure
            enleveElement(parcoursPossible, numeroFigure - 6)
            enleveElement(parcoursPossible, numeroFigure - 1)
          } else if (numeroFigure <= 22 && numeroFigure >= 18) { // Avant-dernière colonne de la figure
            enleveElement(parcoursPossible, numeroFigure - 1)// Interdiction d'aller en bas sous peine de retour impossible
          }
          numeroFigure = choice(parcoursPossible)
          futursVoisinsPossibles = [numeroFigure - 6, numeroFigure - 1, numeroFigure + 1, numeroFigure + 6]
          nbVoisins = 0
          for (let kk = 0; kk < 4; kk++) {
            nbVoisins = nbVoisins + compteOccurences(chemin, futursVoisinsPossibles[kk])
          }
          while (compteOccurences(chemin, numeroFigure) !== 0 || nbVoisins > 1) { // Il ne faut pas choisir une case qui soit voisine avec une case déjà choisie car sinon on pourrait avoir des raccourcis non désirés.
            enleveElement(parcoursPossible, numeroFigure)
            numeroFigure = choice(parcoursPossible)
            futursVoisinsPossibles = [numeroFigure - 6, numeroFigure - 1, numeroFigure + 1, numeroFigure + 6]
            nbVoisins = 0
            for (let kk = 0; kk < 4; kk++) {
              nbVoisins = nbVoisins + compteOccurences(chemin, futursVoisinsPossibles[kk])
            }
          }
          chemin.push(numeroFigure)
        }
      }
      for (let k = 0; k < chemin.length - 1; k++) {
        transfos[k] = definitElements(choice(typeDeTransfos), chemin[k], chemin[k + 1], choice([true, false]), k)
        polys[chemin[k + 1]] = transfoPoly(polys[chemin[k]], transfos[k])
      }
      objetsEnonce = []
      objetsCorrection = []
      texte = this.interactif
        ? this.sup === 1
          ? 'Compléter la liste des figures successives obtenues avec une suite de symétries axiales.<br>La liste commence par 0, finit par 28 et les numéros sont à séparer par des virgules.<br><br>'
          : 'Compléter la liste des figures successives obtenues avec cette suite de transformations.<br>La liste commence par 0, finit par 28 et les numéros sont à séparer par des virgules.<br><br>'
        : 'On passe de la figure $0$ à la figure $28$ en passant par des cases adjacentes, en suivant les transformations listées dans l\'ordre précis des phrases ci-dessous qu\'il faut compléter.<br><br>'
      texteCorr = ''

      for (let x = 0; x < 5; x++) {
        for (let y = 0, numero; y < 5; y++) {
          numero = texteParPointEchelle(Number(x * 6 + y).toString(), point(x * 3.2 + 1.6, y * 3.2 + 1.6), 'milieu', context.isHtml ? 'yellow' : 'black', 1.2, 'middle', true, 0.4)
          numero.contour = context.isHtml
          numero.couleurDeRemplissage = colorToLatexOrHTML('black')
          numero.opacite = context.isHtml ? 0.5 : 1
          numero.opaciteDeRemplissage = 1
          maGrille.push(numero)
          polys[x * 6 + y].opacite = 0.7
          polys[x * 6 + y].color = colorToLatexOrHTML('blue')
        }
      }

      polys[0].opaciteDeRemplissage = 0.7
      polys[0].couleurDeRemplissage = colorToLatexOrHTML(texcolors(11))
      polys[28].opaciteDeRemplissage = 0.7
      polys[28].couleurDeRemplissage = colorToLatexOrHTML(texcolors(11 + (chemin.length - 1)))
      objetsEnonce.push(...polys)
      objetsEnonce.push(...maGrille)

      for (let x = 0; x < 6; x++) {
        for (let y = 0, label; y < 6; y++) {
          label = texteParPointEchelle(noeuds[x * 6 + y].nom, translation(noeuds[x * 6 + y], vecteur(0.3, 0.3)), 'milieu', context.isHtml ? 'red' : 'black', 1.2, 'middle', true, 0.4)
          label.contour = context.isHtml
          label.couleurDeRemplissage = colorToLatexOrHTML('black')
          label.opacite = context.isHtml ? 0.8 : 1
          label.opaciteDeRemplissage = 1
          objetsEnonce.push(label)
        }
      }
      if (this.sup === 1) { // cas des symétries axiales seules (une seule ligne par étape) plus de place pour la figure qui rétrécit en F° du nombre d'étapes.
        paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: calcul(1.1 - chemin.length * 0.03125) }
        paramsCorrection = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: calcul(1 - chemin.length * 0.03125) }
      } else { // à partir de la symétrie centrale, il peut y avoir 2 lignes par étapes, donc on rétrécit davantage la figure.
        paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: calcul(1.2 - chemin.length * 0.05) }
        paramsCorrection = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: calcul(1.1 - chemin.length * 0.05) }
      }
      for (let k = 1, figure; k < chemin.length - 1; k++) {
        figure = translation(polys[chemin[k]], vecteur(0, 0))
        figure.color = colorToLatexOrHTML(texcolors(k + 11))
        figure.couleurDeRemplissage = colorToLatexOrHTML(texcolors(k + 11))
        figure.opaciteDeRemplissage = 0.6
        objetsCorrection.push(figure)
      }
      objetsCorrection.push(...objetsEnonce)
      for (let etape = 0; etape < chemin.length - 1; etape++) {
        texte += (this.interactif && context.isHtml)
          ? this.sup === 1
            ? ''
            : `$${miseEnEvidence(etape + 1 + ')' + sp(1))}$` + texteEnCouleur(transfos[etape].texteInteractif, etape % 2 === 0
            ? 'black'
            : 'brown') + '<br>'
          : (etape === 0)
              ? `$${miseEnEvidence(etape + 1 + ')' + sp(1))}$` + texteEnCouleur(transfos[0].texte + (this.sup3 ? ',' : '.') + '<br>', 'black')
              : this.sup3
                ? `$${miseEnEvidence(etape + 1 + ')' + sp(1))}$` + texteEnCouleur('qui' + transfos[etape].texte.substr(context.isHtml ? 17 : 13) + (etape === chemin.length - 2 ? '.' : ','), etape % 2 === 0 ? 'black' : 'brown') + '<br>'
                : `$${miseEnEvidence(etape + 1 + ')' + sp(1))}$` + texteEnCouleur(transfos[etape].texte + '.', etape % 2 === 0 ? 'black' : 'brown') + '<br>'
        texteCorr += transfos[etape].texteCorr + '<br>'
      }
      if (context.isHtml) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur75 inline')
        texte = deuxColonnes(texte, mathalea2d(paramsEnonce, objetsEnonce), 50)
        texteCorr = deuxColonnes(texteCorr, mathalea2d(paramsCorrection, objetsCorrection), 50)
      } else {
        texte += '\n' + centrage(mathalea2d(paramsEnonce, objetsEnonce))
        texteCorr += '\n' + centrage(mathalea2d(paramsCorrection, objetsCorrection))
      }
      if (context.isAmc) {
        this.autoCorrection = [
          {
            enonce: texte,
            propositions: [
              {
                texte: texteCorr,
                statut: 3,
                feedback: '',
                sanscadre: true
              }
            ]
          }
        ]
      } else {
        setReponse(this, i, chemin.toString(), { formatInteractif: 'texte' })
      }
      texte += context.isHtml ? '<br>' : '\n\\newpage'
      texteCorr += context.isHtml ? '<br>' : '\n\\newpage'

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Types de transformations possibles', 4, '1 : Symétries axiales seulement\n2 : Symétries axiales et centrales\n3 : Symétries et translations\n4 : Symétries, translations et quarts de tour']
  this.besoinFormulaire2Numerique = ['Nombre de transformations entre le départ et l\'arrivée', 6, '1 : 8\n2 : 10\n3 : 12\n4 : 14\n5 : 16\n6 : Entre 8 et 16']
  this.besoinFormulaire3CaseACocher = ['Énoncés raccourcis', false]
}
