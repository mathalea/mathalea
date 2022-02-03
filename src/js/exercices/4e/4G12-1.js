import Exercice from '../Exercice.js'
import { texcolors, choice, lettreDepuisChiffre, listeQuestionsToContenu, texteEnCouleurEtGras, sp, randint, deuxColonnes, contraindreValeur } from '../../modules/outils.js'
import { grille, mathalea2d, point, segment, tracePoint, homothetie, polygone, symetrieAxiale, translation, droite, vecteur, rotation, milieu, texteParPointEchelle, symetrieAnimee, translationAnimee, rotationAnimee } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { choixDeroulant } from '../../modules/interactif/questionListeDeroulante.js'
export const dateDePublication = '3/12/2021'
export const titre = 'Trouver la transformation'
export const interactifReady = true // Pour l'instant le listeDeroulante n'est pas au point avec les chaines ???
export const interactifType = 'listeDeroulante'

export default function TrouverLaTransformations () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.spacing = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  const A = point(0, 0)
  let typeDeTransfos
  this.sup = 3
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
  // type est le type de transformation (voir ci-dessus)
  // depart est le N° de la figure de dépar, arrivee celui de la figure d'arrivée
  // leSens = true pour rotation de sens direct
  // num est un nombre pour définir la couleur de l'élément de départ et celui d'arrivée.
  // poly1 est le polygone de départ (utilisé pour réaliser l'animation)
  function definitElements (type, depart, arrivee, leSens = true, num = 0, poly1) {
    let texte, texteCorr, texteInteractif, animation, axe, centre, vector
    const Est = (arrivee - depart === 6) // si on va vers la droite il y a 6 numéros d'écart entre arrivée et départ sinon, c'est 1 (vers le haut)
    switch (type) {
      case 'symax': // vers l'est la droite est définie par arrivee et arrivee+1 sinon c'est arrivee et arrivee+6
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la symétrie d'axe $(${noeuds[arrivee].nom}${Est ? noeuds[arrivee + 1].nom : noeuds[arrivee + 6].nom})$.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la symétrie d'axe $(${sp(1)}\\ldots${sp(1)})$.`
        texteInteractif = `la symétrie d'axe (${noeuds[arrivee].nom}${Est ? noeuds[arrivee + 1].nom : noeuds[arrivee + 6].nom})`
        axe = Est ? droite(noeuds[arrivee], noeuds[arrivee + 1]) : droite(noeuds[arrivee], noeuds[arrivee + 6])
        animation = symetrieAnimee(poly1, axe, 'begin="0s" dur="5s" repeatCount="indefinite"')
        return { animation: animation, depart: depart, arrivee: arrivee, texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, axe: axe }
      case 'trans': // facile pour la translation : depart->arrivee
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la translation transformant $${noeuds[depart].nom}$ en $${noeuds[arrivee].nom}$.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la translation transformant ${sp(1)}\\ldots${sp(1)} en ${sp(1)}\\ldots${sp(1)}.`
        texteInteractif = `la translation transformant ${noeuds[depart].nom} en ${noeuds[arrivee].nom}`
        vector = vecteur(noeuds[depart], noeuds[arrivee])
        animation = translationAnimee(poly1, vector, 'begin="0s" dur="5s" repeatCount="indefinite"')
        return { animation: animation, depart: depart, arrivee: arrivee, texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, vecteur: vecteur(noeuds[depart], noeuds[arrivee]) }
      case 'rot90': // la position du centre dépend du sens de rotation et de départ et arrivee.
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la rotation de centre $${Est ? (leSens ? noeuds[arrivee + 1].nom : noeuds[arrivee].nom) : (leSens ? noeuds[arrivee].nom : noeuds[arrivee + 6].nom)}$ d'angle $90\\degree$ dans le sens ${leSens ? 'direct' : 'indirect'}.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la rotation de centre ${sp(1)}\\ldots${sp(1)} d'angle $90\\degree$ dans le sens  ${leSens ? 'direct' : 'indirect'}.`
        texteInteractif = `la rotation de centre ${Est ? (leSens ? noeuds[arrivee + 1].nom : noeuds[arrivee].nom) : (leSens ? noeuds[arrivee].nom : noeuds[arrivee + 6].nom)} d'angle 90° dans le sens ${leSens ? 'direct' : 'indirect'}`
        centre = Est ? (leSens ? noeuds[arrivee + 1] : noeuds[arrivee]) : (leSens ? noeuds[arrivee] : noeuds[arrivee + 6])
        animation = rotationAnimee(poly1, centre, leSens ? 90 : -90, 'begin="0s" dur="5s" repeatCount="indefinite"')
        return { animation: animation, depart: depart, arrivee: arrivee, texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, centre: centre, sens: leSens }
      case 'rot180': // pas besoin du sens, mais le milieu choisit dépend de depart et arrivee
        texteCorr = `La figure ${texteEnCouleurEtGras(depart, texcolors(num + 8))} a pour image la figure ${texteEnCouleurEtGras(arrivee, texcolors(num + 9))} par la symétrie de centre le milieu de $[${noeuds[arrivee].nom}${Est ? noeuds[arrivee + 1].nom : noeuds[arrivee + 6].nom}]$.`
        texte = `La figure ${sp(1)}\\ldots${sp(1)} a pour image la figure ${sp(1)}\\ldots${sp(1)} par la symétrie de centre le milieu de $[${sp(1)}\\ldots${sp(1)}]$.`
        texteInteractif = `la symétrie de centre le milieu de [${noeuds[arrivee].nom}${Est ? noeuds[arrivee + 1].nom : noeuds[arrivee + 6].nom}]`
        centre = milieu(noeuds[arrivee], Est ? noeuds[arrivee + 1] : noeuds[arrivee + 6])
        animation = rotationAnimee(poly1, centre, 180, 'begin="0s" dur="5s" repeatCount="indefinite"')
        return { animation: animation, depart: depart, arrivee: arrivee, texte: texte, texteCorr: texteCorr, texteInteractif: texteInteractif, type: type, centre: centre }
    }
  }
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.sup = contraindreValeur(1, 3, this.sup, 3)
    if (this.sup === 1) typeDeTransfos = ['symax', 'rot180']
    else if (this.sup === 2) typeDeTransfos = ['symax', 'trans', 'rot180']
    else typeDeTransfos = ['symax', 'trans', 'rot90', 'rot180']
    this.listeQuestions = []
    this.listeCorrections = []
    const objetsEnonce = []
    const objetsCorrection = []
    const polys = []
    const transfos = []
    polys[0] = homothetie(choice(motifs), A, 0.4)
    for (let x = 0; x < 5; x++) {
      for (let y = 0, dalle, transfoAlea, elements; y < 5; y++) {
        if (x + y > 0) {
          dalle = x * 6 + y
          transfoAlea = choice(typeDeTransfos)
          if (y > 0) {
            elements = definitElements(transfoAlea, dalle - 1, dalle, choice([true, false]))
            polys[dalle] = transfoPoly(polys[dalle - 1], elements)
          } else {
            elements = definitElements(transfoAlea, dalle - 6, dalle, choice([true, false]))
            polys[dalle] = transfoPoly(polys[dalle - 6], elements)
          }
        }
      }
    }

    for (let i = 0, depart = [], arrivee = []; i < this.nbQuestions;) {
      depart[i] = randint(0, 3) * 6 + randint(0, 3)
      arrivee[i] = depart[i] + (choice([true, false]) ? 1 : 6)
      transfos[i] = definitElements(choice(typeDeTransfos), depart[i], arrivee[i], choice([true, false]), 12, polys[depart[i]])
      if (depart.indexOf(arrivee[i]) === -1 && arrivee.indexOf(depart[i]) === -1 && this.questionJamaisPosee(i, depart[i], arrivee[i])) {
        polys[arrivee[i]] = transfoPoly(polys[depart[i]], transfos[i])
        i++
      }
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0, numero; y < 5; y++) {
        numero = texteParPointEchelle(Number(x * 6 + y).toString(), point(x * 3.2 + 1.6, y * 3.2 + 1.6), 'milieu', context.isHtml ? 'yellow' : 'black', 1.2, 'middle', true, 0.4)
        numero.contour = context.isHtml
        numero.couleurDeRemplissage = 'black'
        numero.opacite = context.isHtml ? 0.5 : 1
        numero.opaciteDeRemplissage = 1
        maGrille.push(numero)
        polys[x * 6 + y].opacite = 0.7
        polys[x * 6 + y].color = 'blue'
      }
    }
    objetsEnonce.push(...polys)
    objetsCorrection.push(...polys)
    objetsCorrection.push(...maGrille)
    objetsEnonce.push(...maGrille)
    for (let x = 0; x < 6; x++) {
      for (let y = 0, label; y < 6; y++) {
        label = texteParPointEchelle(noeuds[x * 6 + y].nom, translation(noeuds[x * 6 + y], vecteur(0.3, 0.3)), 'milieu', context.isHtml ? 'red' : 'black', 1.2, 'middle', true, 0.4)
        label.contour = context.isHtml
        label.couleurDeRemplissage = 'black'
        label.opacite = context.isHtml ? 0.8 : 1
        label.opaciteDeRemplissage = 1
        objetsEnonce.push(label)
        objetsCorrection.push(label)
      }
    }
    for (let i = 0; i < this.nbQuestions; i++) {
      objetsCorrection.push(transfos[i].animation)
    }

    const paramsEnonce = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: 0.7 }
    const paramsCorrection = { xmin: -0.5, ymin: -0.5, xmax: 17, ymax: 16.5, pixelsParCm: 20, scale: 0.6 }
    for (let i = 0, texte, texteCorr, propositions, trans; i < this.nbQuestions; i++) {
      propositions = []
      // On va mettre dans les propositions toutes les transformations possibles pour passer de transfo|i].depart à transfo[i].arrivee
      for (const transforme of typeDeTransfos) {
        switch (transforme) {
          case 'rot90':
            trans = definitElements('rot90', transfos[i].depart, transfos[i].arrivee, true, 12, polys[transfos[i].depart])
            propositions.push(
              `la rotation de centre ${trans.centre.nom}, d'angle 90° dans le sens direct`
            )
            trans = definitElements('rot90', transfos[i].depart, transfos[i].arrivee, false, 12, polys[transfos[i].depart])
            propositions.push(
              `la rotation de centre ${trans.centre.nom}, d'angle 90° dans le sens indirect`
            )
            break
          case 'trans':
            //    trans = definitElements('trans', transfos[i].depart, transfos[i].arrivee, true, 12, polys[transfos[i].depart])
            propositions.push(
                  `la translation transformant ${noeuds[transfos[i].depart].nom} en ${noeuds[transfos[i].arrivee].nom}`
            )
            break
          case 'rot180':
            //    trans = definitElements('rot180', transfos[i].depart, transfos[i].arrivee, true, 12, polys[transfos[i].depart])
            propositions.push(
                  `la symétrie de centre le milieu de [${noeuds[transfos[i].arrivee].nom}${(transfos[i].arrivee - transfos[i].depart === 6) ? noeuds[transfos[i].arrivee + 1].nom : noeuds[transfos[i].arrivee + 6].nom}]`
            )
            break

          case 'symax':
            //    trans = definitElements('symax', transfos[i].depart, transfos[i].arrivee, true, 12, polys[transfos[i].depart])
            propositions.push(
                `la symétrie d'axe (${noeuds[transfos[i].arrivee].nom}${(transfos[i].arrivee - transfos[i].depart === 6) ? noeuds[transfos[i].arrivee + 1].nom : noeuds[transfos[i].arrivee + 6].nom})`
            )
            break
        }
      }
      texte = this.interactif
        ? `Quelle transformation permet de passer de la figure ${transfos[i].depart} à la figure ${transfos[i].arrivee} ? ` + choixDeroulant(this, i, 0, propositions, 'texte')
        : `Quelle transformation permet de passer de la figure ${transfos[i].depart} à la figure ${transfos[i].arrivee} ?`
      texteCorr = transfos[i].texteCorr
      setReponse(this, i, [transfos[i].texteInteractif], { formatInteractif: 'texte' })
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
    this.contenu = deuxColonnes(this.contenu, mathalea2d(paramsEnonce, objetsEnonce), 50)
    this.contenuCorrection = deuxColonnes(this.contenuCorrection, mathalea2d(paramsCorrection, objetsCorrection), 50)
  }
  this.besoinFormulaireNumerique = ['Types de transformations possibles', 3, '1 : Symétries axiales et centrales\n2 : Symétries et translations\n3 : Symétries, translations et quarts de tour']
}
