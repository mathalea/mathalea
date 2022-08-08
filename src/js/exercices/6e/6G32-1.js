import Exercice from '../Exercice.js'
import { listeQuestionsToContenuSansNumero, randint, shuffle, combinaisonListes, lettreDepuisChiffre, texcolors, texteGras, numAlpha } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, droite, segment, demiDroite, polygone, codageAngle, texteParPosition, mathalea2d } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const titre = 'Appliquer les propriétés de conservation de la symétrie axiale'

export const amcReady = true
export const amcType = 'AMCHybride'

// Gestion de la date de publication initiale
export const dateDePublication = '26/10/2020'

/**
 * Ref 6G32-1
 * Publié le 26/10/2020
 * @author Jean-Claude Lhote
 * Relecture : Novembre 2021 par EE
 */
export default function SymetrieAxialeConservation1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Dans la symétrie d\'axe (d), répondre aux questions suivantes.'
  this.spacing = 2
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    const typesDeQuestionsDisponibles = ['Segment', 'Droite', '1/2droite', 'Triangle', 'Angle']
    const points = []; const traces = []; const nom = []; let alternance
    for (let i = 0; i < 25; i++) nom.push(lettreDepuisChiffre(i + 1))
    const noms = shuffle(nom)

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.listeQuestions.push(' ')
    this.listeCorrections.push(`${texteGras('Dans la symétrie d\'axe (d), on observe les choses suivantes.')}`)
    // On prépare la figure...
    let axe = parseInt(this.sup)
    let d; let nonchoisi; const coords = []; let x; let y; const objetsEnonce = []; const objetsCorrection = []; let nomd; let labelPos
    if (axe === 5) axe = randint(1, 4) // choix de l'axe et des coordonnées
    switch (axe) {
      case 1: d = droite(1, 0, 0)
        nomd = texteParPosition('(d)', 0.3, 5.6)
        labelPos = 'above left'
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ?
            [x, y] = [randint(-5, 0), randint(-5, 5)]
            nonchoisi = true
            for (let j = 0; j < i; j++) { if (coords[j][0] === x && coords[j][1] === y) nonchoisi = false }
          }
          coords.push([x, y]) // on stocke les 12 points
        }
        for (let j = 0; j < 12; j++) coords.push([-coords[j][0], coords[j][1]]) // on stocke les 12 images
        break
      case 2: d = droite(0, 1, 0)
        labelPos = 'above'
        nomd = texteParPosition('(d)', 5.6, 0.3)
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ?
            [x, y] = [randint(-5, 5), randint(-5, 0)]
            nonchoisi = true
            for (let j = 0; j < i; j++) { if (coords[j][0] === x && coords[j][1] === y) nonchoisi = false }
          }
          coords.push([x, y]) // on stocke les 12 points
        }
        for (let j = 0; j < 12; j++) coords.push([coords[j][0], -coords[j][1]]) // on stocke les 12 images
        break
      case 3: d = droite(1, -1, 0)
        labelPos = 'above'
        nomd = texteParPosition('(d)', -5.8, -5.4)
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ?
            x = randint(-5, 5)
            y = randint(x, 5)
            nonchoisi = true
            for (let j = 0; j < i; j++) { if (coords[j][0] === x && coords[j][1] === y) nonchoisi = false }
          }
          coords.push([x, y]) // on stocke les 12 points
        }
        this.autoCorrection = []
        for (let j = 0; j < 12; j++) coords.push([coords[j][1], coords[j][0]]) // on stocke les 12 images
        break
      case 4: d = droite(1, 1, 0)
        labelPos = 'above'
        nomd = texteParPosition('(d)', -5.8, 5.4)
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ? Si oui, on recommence.
            x = randint(-5, 5)
            y = randint(-5, -x)
            nonchoisi = true
            for (let j = 0; j < i; j++) {
              if (coords[j][0] === x && coords[j][1] === y) { nonchoisi = false }
            }
          }
          coords.push([x, y]) // on stocke les 12 points
        }
        for (let j = 0; j < 12; j++) { coords.push([-coords[j][1], -coords[j][0]]) } // on stocke les 12 images
        break
    }
    for (let i = 0; i < 24; i++) {
      if (i < 12) points.push(point(coords[i][0], coords[i][1], noms[i], labelPos))
      else if (coords[i][0] === coords[i - 12][0] && coords[i][1] === coords[i - 12][1]) {
        points.push(point(coords[i][0], coords[i][1], noms[i - 12], labelPos))
        noms[i] = noms[i - 12]
      } else points.push(point(coords[i][0], coords[i][1], noms[i], labelPos))
      traces.push(tracePoint(points[i]))
    }
    // On rédige les questions et les réponses
    if (this.sup2 === true) alternance = 2
    else alternance = 1
    function index (i) {
      return (i + 12 * (i % alternance)) % 24
    }
    objetsEnonce.length = 0
    objetsCorrection.lenght = 0
    for (let i = 0, texte, texteCorr, s1, s2, choix, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'Segment':
          choix = randint(0, 10) + randint(0, 1) * 12
          texte = numAlpha(i) + `Quel est le symétrique du segment $[${noms[index(choix)]}${noms[index(choix + 1)]}]$ ?`
          texteCorr = numAlpha(i) + `Le symétrique du segment $[${noms[index(choix)]}${noms[index(choix + 1)]}]$ est le segment $[${noms[index(choix + 12)]}${noms[index(choix + 13)]}]$.`
          s1 = segment(points[index(choix)], points[index(choix + 1)], texcolors(i * 3 + 2))
          s2 = segment(points[index(choix + 12)], points[index(choix + 13)], texcolors(i * 3 + 2))
          s1.epaisseur = 2
          s2.epaisseur = 2
          objetsCorrection.push(s1, s2)
          break
        case 'Droite':
          choix = randint(0, 10) + randint(0, 1) * 12
          texte = numAlpha(i) + `Quel est le symétrique de la droite $(${noms[index(choix)]}${noms[index(choix + 1)]})$ ?`
          texteCorr = numAlpha(i) + `Le symétrique de la droite $(${noms[index(choix)]}${noms[index(choix + 1)]})$ est la droite $(${noms[index(choix + 12)]}${noms[index(choix + 13)]})$.`
          objetsCorrection.push(droite(points[index(choix)], points[index(choix + 1)], '', texcolors(i * 3 + 2)))
          objetsCorrection.push(droite(points[index(choix + 12)], points[index(choix + 13)], '', texcolors(i * 3 + 2)))
          break
        case '1/2droite':
          choix = randint(0, 10) + randint(0, 1) * 12
          texte = numAlpha(i) + `Quel est le symétrique de la demi-droite $[${noms[index(choix)]}${noms[index(choix + 1)]})$ ?`
          texteCorr = numAlpha(i) + `Le symétrique de la demi-droite $[${noms[index(choix)]}${noms[index(choix + 1)]})$ est la demi-droite $[${noms[index(choix + 12)]}${noms[index(choix + 13)]})$.`
          objetsCorrection.push(demiDroite(points[index(choix)], points[index(choix + 1)], texcolors(i * 3 + 2)))
          objetsCorrection.push(demiDroite(points[index(choix + 12)], points[index(choix + 13)], texcolors(i * 3 + 2)))
          break
        case 'Triangle':
          choix = randint(0, 9) + randint(0, 1) * 12
          while (points[index(choix)].estSur(droite(points[index(choix + 1)], points[index(choix + 2)]))) {
            choix = randint(0, 9) + randint(0, 1) * 12
          }
          texte = numAlpha(i) + `Quel est le symétrique du triangle $${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}$ ?`
          texteCorr = numAlpha(i) + `Le symétrique du triangle $${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}$ est le triangle $${noms[index(choix + 12)]}${noms[index(choix + 13)]}${noms[index(choix + 14)]}$.`
          objetsCorrection.push(polygone([points[index(choix)], points[index(choix + 1)], points[index(choix + 2)]], texcolors(i * 3 + 2)))
          objetsCorrection.push(polygone([points[index(choix + 12)], points[index(choix + 13)], points[index(choix + 14)]], texcolors(i * 3 + 2)))
          break
        case 'Angle':
          choix = randint(0, 9) + randint(0, 1) * 12
          while (points[index(choix)].estSur(droite(points[index(choix + 1)], points[index(choix + 2)]))) {
            choix = randint(0, 9) + randint(0, 1) * 12
          }
          texte = numAlpha(i) + `Quel est le symétrique de l'angle $\\widehat{${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}}$ ?`
          texteCorr = numAlpha(i) + `Le symétrique de l'angle $\\widehat{${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}}$ est l'angle $\\widehat{${noms[index(choix + 12)]}${noms[index(choix + 13)]}${noms[index(choix + 14)]}}$.`
          objetsCorrection.push(codageAngle(points[index(choix)], points[index(choix + 1)], points[index(choix + 2)], 2, '', texcolors(i * 3 + 2), 2, 0.5, texcolors(i * 3 + 2), 0.2))
          objetsCorrection.push(codageAngle(points[index(choix + 12)], points[index(choix + 13)], points[index(choix + 14)], 2, '', texcolors(i * 3 + 2), 2, 0.5, texcolors(i * 3 + 2), 0.2))
          objetsCorrection.push(segment(points[index(choix)], points[index(choix + 1)], texcolors(i * 3 + 2)))
          objetsCorrection.push(segment(points[index(choix + 1)], points[index(choix + 2)], texcolors(i * 3 + 2)))
          objetsCorrection.push(segment(points[index(choix + 12)], points[index(choix + 13)], texcolors(i * 3 + 2)))
          objetsCorrection.push(segment(points[index(choix + 13)], points[index(choix + 14)], texcolors(i * 3 + 2)))

          break
      }

      if (context.isAmc) {
        this.autoCorrection[i] =
          {
            enonce: 'Pour chaque question ci-dessous, placer sur la figure d\'en bas, l\'objet mathématique demandé puis tracer son symétrique. Répondre ensuite à la question.<br>',
            enonceAvant: false,
            enonceAvantUneFois: true,
            propositions: [
              {
                type: 'AMCOpen',
                propositions: [
                  {
                    texte: ' ',
                    statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                    feedback: '',
                    enonce: texte.substr(13), // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
                    sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                  }
                ]
              }
            ]
          }
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }

      cpt++
    }
    d.isVisible = true
    objetsEnonce.push(nomd, d)
    objetsCorrection.push(nomd, d)
    for (let i = 0; i < 24; i++) {
      objetsEnonce.push(labelPoint(points[i]), tracePoint(points[i], 'blue'))
      objetsCorrection.push(labelPoint(points[i]), tracePoint(points[i], 'blue'))
    }
    if (context.isAmc) {
      this.nbQuestions++
      this.autoCorrection[this.nbQuestions - 1] =
        {
          enonce: 'Peu importe',
          enonceAvant: false,
          melange: false,
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [
                {
                  texte: ' ',
                  numQuestionVisible: false,
                  statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  feedback: '',
                  enonce: mathalea2d({ xmin: -6, ymin: -6, xmax: 6, ymax: 6, pixelsParCm: 40, scale: 1, style: 'margin-top: 40px' }, objetsEnonce) + '<br>', // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
                  sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                }
              ]
            }
          ]
        }
    }
    this.listeQuestions.push('<br>' + mathalea2d({ xmin: -6, ymin: -6, xmax: 6, ymax: 6, pixelsParCm: 40, scale: 1, style: 'margin-top: 40px' }, objetsEnonce))
    this.listeCorrections.push(mathalea2d({ xmin: -6, ymin: -6, xmax: 6, ymax: 6, pixelsParCm: 40, scale: 1 }, objetsCorrection))
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Type d\'axe', 5, '1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique 1\n4 : Axe oblique 2\n5 : Axe aléatoire']
  this.besoinFormulaire2CaseACocher = ["Avec des points de part et d'autre"]
}
