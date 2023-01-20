import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, troncature, stringNombre, texTexte, combinaisonListesSansChangerOrdre, texNombre, calcul, texNombrec, creerNomDePolygone, arrondi, sp, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale, rangeMinMax, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { point, pointAdistance, polygoneRegulier, polygone, arc, pointSurCercle, texteSurSegment, segment, pointIntersectionLC, droite, cercle, droiteParPointEtPerpendiculaire, tracePoint, labelPoint, codageAngleDroit, codageSegments, afficheLongueurSegment, pointSurDroite, pointSurSegment, pointIntersectionCC } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import Grandeur from '../../modules/Grandeur.js'
import { triangle3longueurs } from '../../modules/iepMacros/triangles.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModificationImportante = '05/04/2022'

/**
 * Déterminer le périmètre et l'aire d'un carré, d'un rectangle, d'un triangle rectangle, d'un cercle
 *
 * * 1 : Carré, rectangle et triangle rectangle
 * * 2: Uniquement des cercles
 * * 3 : Les 4 sont demandés
 * @author Rémi Angot// modifié par Mireille Gain pour le support des décimaux
 * * Relecture EE : Décembre 2021
 */
export default function ExercicePerimetresEtAires (difficulte = '1-2') {
  // Calculer le périmètre et l'aire de figures
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = difficulte
  this.titre = "Calculs de périmètres et d'aires"
  this.consigne =
    'Pour chacune des figures, calculer son périmètre puis son aire (valeur exacte et si nécessaire, valeur approchée au dixième près).'
  this.spacing = 1
  this.nbQuestions = 4
  this.sup2 = false // décimaux ou pas
  this.sup3 = false // avec figure

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const reponses = []
    let resultat1, resultat2
    const tripletsPythagoriciens = [
      [3, 4, 5],
      [6, 8, 10],
      [15, 8, 17],
      [24, 10, 26],
      [5, 12, 13],
      [12, 16, 20],
      [21, 20, 29],
      [9, 40, 41]
    ]
    const typesDeQuestionsDisponibles = [
      'carre',
      'rectangle',
      'triangle_rectangle',
      'cercle',
      'demi-cercle'
    ]
    let QuestionsDisponibles
    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = rangeMinMax(1, 4)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        QuestionsDisponibles = [contraindreValeur(1, 5, this.sup, 2)]
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 5, parseInt(QuestionsDisponibles[i]), 2) // parseInt en fait un tableau d'entiers
        }
        this.nbQuestions = Math.max(this.nbQuestions, QuestionsDisponibles.length)
      }
    }
    const typesDeQuestions = combinaisonListesSansChangerOrdre(QuestionsDisponibles, this.nbQuestions)

    let listeDeNomsDePolygones
    for (let i = 0, texte, texteCorr, cote, nomCarre, L, l, nomRectangle, a, b, c, nomTriangle, triplet, R, donneLeDiametre, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (i % 4 === 0) listeDeNomsDePolygones = ['QD']
      let partieDecimale1, partieDecimale2
      if (this.sup2) {
        partieDecimale1 = randint(1, 9)
        partieDecimale2 = randint(1, 9, [partieDecimale1])
        partieDecimale1 = calcul(partieDecimale1 / 10)
        partieDecimale2 = calcul(partieDecimale2 / 10)
      } else {
        partieDecimale1 = 0
        partieDecimale2 = 0
      }
      switch (typesDeQuestionsDisponibles[typesDeQuestions[i] - 1]) {
        case 'carre':
          cote = calcul(randint(2, 8) + partieDecimale1)
          nomCarre = creerNomDePolygone(4, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomCarre)
          if (this.sup3) {
            texte = 'Calculer le périmètre et l\'aire de ce carré.'
            const A = point(0, 0, nomCarre.charAt(0), 'below left')
            const B = pointAdistance(A, cote, randint(-5, 5, [0]), nomCarre.charAt(1), 'below right')
            const figure = polygoneRegulier(A, B, 4)
            const C = point(figure.listePoints[2].x, figure.listePoints[2].y, nomCarre.charAt(2), 'above right')
            const D = point(figure.listePoints[3].x, figure.listePoints[3].y, nomCarre.charAt(3), 'above left')

            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
            const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
            const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
            const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 0.8 }
            // On ajoute au texte de la correction, la figure de la correction
            // const traces = tracePoint(A, B, C, D)
            const labels = labelPoint(A, B, C, D)
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, codageAngleDroit(A, B, C, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageAngleDroit(A, D, C, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageAngleDroit(D, C, B, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageAngleDroit(B, A, D, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageSegments('//', 'blue', [A, B, C, D]), afficheLongueurSegment(B, A), figure)
            texte += '<br>' + mathalea2d(params, objets)
          } else {
            if (choice([true, false])) {
              // 2 énoncés possibles équiprobables
              texte = `Un carré $${nomCarre}$ de $${texNombre(cote)}$ cm de côté .<br>` + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
            } else {
              texte = `Un carré $${nomCarre}$ tel que $${nomCarre[0] + nomCarre[1]} = ${texNombre(cote)}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
            }
          }
          texteCorr = `$\\mathcal{P}_{${nomCarre}}=4\\times${texNombre(cote)}~\\text{cm}=${texNombrec(4 * cote)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}_{${nomCarre}}=${texNombre(cote)}~\\text{cm}\\times${texNombre(cote)}~\\text{cm}=${texNombrec(cote * cote)}~\\text{cm}^2$`
          resultat1 = calcul(4 * cote)
          resultat2 = calcul(cote * cote)
          break
        case 'rectangle':
          L = randint(3, 11)
          l = randint(2, L - 1)
          L += partieDecimale1
          l += partieDecimale2
          nomRectangle = creerNomDePolygone(4, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomRectangle)
          if (this.sup3) {
            texte = 'Calculer le périmètre et l\'aire de ce rectangle.'
            const A = point(0, 0, nomRectangle.charAt(0), 'below left')
            const B = pointAdistance(A, L, randint(-5, 5, [0]), nomRectangle.charAt(1), 'below right')
            const C = pointIntersectionLC(droiteParPointEtPerpendiculaire(B, droite(A, B)), cercle(B, l), nomRectangle.charAt(2), 1)
            C.positionLabel = 'above right'
            const D = pointIntersectionLC(droiteParPointEtPerpendiculaire(A, droite(A, B)), cercle(A, l), nomRectangle.charAt(3), 1)
            D.positionLabel = 'above left'
            const figure = polygone(A, B, C, D)

            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
            const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
            const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
            const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 0.8 }
            // On ajoute au texte de la correction, la figure de la correction
            const labels = labelPoint(A, B, C, D)
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, codageAngleDroit(A, B, C, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageAngleDroit(A, D, C, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageAngleDroit(D, C, B, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageAngleDroit(B, A, D, 'blue', 0.8, 1, 0.5, 'blue', 0.5), codageSegments('//', 'blue', [A, B]), codageSegments('//', 'blue', [C, D]), codageSegments('/', 'red', [B, C]), codageSegments('/', 'red', [D, A]), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), figure)
            texte += '<br>' + mathalea2d(params, objets)
          } else {
            if (choice([true, false])) {
              // 2 énoncés possibles équiprobables
              texte = `Un rectangle $${nomRectangle}$ de $${texNombre(L)}$ cm de longueur et de $${l}$ cm de largeur.<br>` + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
            } else {
              texte = `Un rectangle $${nomRectangle}$ tel que $${nomRectangle[0] + nomRectangle[1] + ' = ' + texNombre(L)}$ cm et $${nomRectangle[1] + nomRectangle[2] + ' = ' + l}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
            }
          }
          texteCorr = `$\\mathcal{P}_{${nomRectangle}}=(${texNombre(L)}~\\text{cm}+${l}~\\text{cm})\\times2=${texNombrec((L + l) * 2)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}_{${nomRectangle}}=${texNombre(L)}~\\text{cm}\\times${l}~\\text{cm}=${texNombrec(L * l)}~\\text{cm}^2$`
          resultat1 = calcul(2 * L + 2 * l)
          resultat2 = calcul(L * l)
          break
        case 'triangle_rectangle': {
          triplet = choice(tripletsPythagoriciens)
          // enleveElement(tripletsPythagoriciens, triplet)
          const adjust = Math.floor(10 * (randint(6, 15) + randint(4, 8) * 0.1) / Math.max(...triplet)) * 0.1
          a = calcul(triplet[0] * (adjust))
          b = calcul(triplet[1] * (adjust))
          c = calcul(triplet[2] * (adjust))
          nomTriangle = creerNomDePolygone(3, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomTriangle)
          if (this.sup3) {
            texte = 'Calculer le périmètre et l\'aire de ce triangle rectangle.'
            const zoom = (randint(4, 8) + randint(4, 8) * 0.1) / Math.max(a, b, c)
            const A = point(0, 0, nomTriangle.charAt(0), 'below left')
            const B = pointAdistance(A, a * zoom, randint(-5, 5, [0]), nomTriangle.charAt(1), 'below right')
            // const B = point(a * zoom, 0, nomTriangle.charAt(1), 'below right')
            // const C = point(0, b * zoom, nomTriangle.charAt(2), 'above left')
            const C = pointIntersectionCC(cercle(A, b * zoom), cercle(B, c * zoom), nomTriangle.charAt(2))
            const figure = polygone(A, B, C)
            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x) - 2
            const xmax = Math.max(B.x) + 2
            const ymin = Math.min(A.y) - 2
            const ymax = Math.max(C.y) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 0.8, zoom: 1 }
            // On ajoute au texte de la correction, la figure de la correction
            const labels = labelPoint(A, B, C)
            const segT = [
              texteSurSegment(nomTriangle.charAt(1) + nomTriangle.charAt(2) + '=' + stringNombre(c) + ' cm', C, B, 'black', 1),
              texteSurSegment(nomTriangle.charAt(0) + nomTriangle.charAt(1) + '=' + stringNombre(a) + ' cm', B, A, 'black', 1),
              texteSurSegment(nomTriangle.charAt(2) + nomTriangle.charAt(0) + '=' + stringNombre(b) + ' cm', A, C, 'black', 1)]
            segT.forEach(element => {
              element.mathOn = false
              element.scale = 1
            })
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, codageAngleDroit(B, A, C, 'blue', 0.8, 1, 0.5, 'blue', 0.5), figure, ...segT)
            texte += '<br>' + mathalea2d(params, objets)
            texteCorr = ''
          } else {
            if (choice([true, false])) {
              texte = `Un triangle $${nomTriangle}$ rectangle en $${nomTriangle[1]}$ tel que $${nomTriangle[0] + nomTriangle[1] + ' = ' + texNombre(a)}$ cm, $${nomTriangle[1] + nomTriangle[2] + ' = ' + texNombre(b)}$ cm\
   et $${nomTriangle[0] + nomTriangle[2] + ' = ' + texNombre(c)}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
            } else {
              texte = `Un triangle rectangle $${nomTriangle}$ a pour côtés : $${texNombre(a)}$ cm, $${texNombre(c)}$ cm et $${texNombre(b)}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
            }
          }

          texteCorr = `$\\mathcal{P}_{${nomTriangle}}=${texNombre(a)}~\\text{cm}+${texNombre(b)}
          ~\\text{cm}+${texNombre(c)}~\\text{cm}=${texNombre(a + b + c)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}_{${nomTriangle}}=${texNombre(a)}~\\text{cm}\\times${texNombre(b)}~\\text{cm}\\div2=${texNombrec(a * b / 2)}~\\text{cm}^2$`
          resultat1 = calcul(a + b + c)
          resultat2 = calcul(a * b / 2)
          break
        }
        case 'cercle':
          R = calcul(randint(4, 5) + randint(1, 9) / 10)
          if (this.sup3) {
            texte = 'Calculer le périmètre et l\'aire de ce cercle. Donner une valeur approchée au dixième.'
            const nomCercle = creerNomDePolygone(4, listeDeNomsDePolygones)
            listeDeNomsDePolygones.push(nomCercle)
            const A = point(0, 0, nomCercle.charAt(0), 'below left')
            const Rd = randint(3, 6)
            const figure = cercle(A, Rd)
            const B = pointSurCercle(figure, 10, nomCercle.charAt(1), 'above right')
            const C = pointSurCercle(figure, 190, nomCercle.charAt(2), 'above left')
            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x - Rd) - 2
            const xmax = Math.max(A.x + Rd) + 2
            const ymin = Math.min(A.y - Rd) - 2
            const ymax = Math.max(A.y + Rd) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 0.8, zoom: 1 }
            // On ajoute au texte de la correction, la figure de la correction
            const traces = tracePoint(A, B, C)
            const labels = labelPoint(A, B, C)
            const segT = texteSurSegment(nomCercle.charAt(1) + nomCercle.charAt(2) + '=' + stringNombre(R * 2) + ' cm', C, B, 'red', 1)
            segT.mathOn = false
            segT.scale = 1.5
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, traces, figure, segment(B, C), segT)
            texte += '<br>' + mathalea2d(params, objets)
            texteCorr = ''
          } else {
            donneLeDiametre = choice([true, false])
            if (donneLeDiametre) {
              texte = `Un cercle de $${texNombre(2 * R)}$ cm de diamètre.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
              texteCorr = `Le diamètre est de $${texNombre(2 * R)}$ cm donc le rayon est de $${texNombre(R)}$ cm.<br>`
            } else {
              texte = `Un cercle de $${R}$ cm de rayon.` + sp(2) + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
              texteCorr = ''
            }
          }

          texteCorr += `$\\mathcal{P}=2\\times${texNombre(R)}\\times\\pi~\\text{cm}=${texNombre(2 * R)}\\pi~\\text{cm}\\approx${texNombre(
            2 * R * Math.PI, 3)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}=${texNombre(R)}\\times${texNombre(R)}\\times\\pi~\\text{cm}^2=${texNombre(R * R)}\\pi~\\text{cm}^2\\approx${texNombre(
            R * R * Math.PI, 3)}~\\text{cm}^2$`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}\\approx ${texNombrec(troncature(2 * R * Math.PI, 1))}~${texTexte(' cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}\\approx ${texNombre(troncature(R * R * Math.PI, 1))}~${texTexte(' cm')}^2$.<br>`
          texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}_{1}\\approx 2 \\times ${texNombre(R)} \\times 3,14 \\approx ${texNombrec(2 * R * 3.14, 3)}~${texTexte(' cm')}$.<br>`
          texteCorr += `$\\mathcal{A}\\approx ${texNombre(R)}\\times${texNombre(R)}\\times 3,14\\approx ${texNombre(R * R * 3.14, 3)}~${texTexte(' cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}\\approx ${texNombrec(troncature(2 * R * 3.14, 1))}~${texTexte(' cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}\\approx ${texNombre(troncature(R * R * 3.14, 1))}~${texTexte(' cm')}^2$.<br>`
          resultat1 = arrondi(2 * R * Math.PI, 1)
          resultat2 = arrondi(R * R * Math.PI, 1)
          break
        case 'demi-cercle':
          R = calcul(randint(4, 5) + randint(1, 9) / 10)
          if (this.sup3) {
            texte = 'Calculer le périmètre et l\'aire de ce demi-cercle. Donner une valeur approchée au dixième.'
            const nomCercle = creerNomDePolygone(4, listeDeNomsDePolygones)
            listeDeNomsDePolygones.push(nomCercle)
            const A = point(0, 0, nomCercle.charAt(0), 'below left')
            const Rd = randint(4, 6)
            const B = pointAdistance(A, Rd, randint(-5, 5, [0]), nomCercle.charAt(1), 'above right')
            const figure = arc(B, A, 180, true, 'white', 'black', 0.2)
            const C = pointSurSegment(A, B, -Rd, nomCercle.charAt(2), 'above left')
            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x - Rd) - 2
            const xmax = Math.max(A.x + Rd) + 2
            const ymin = -1
            const ymax = Math.max(A.y + Rd) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 0.8, zoom: 1 }
            // On ajoute au texte de la correction, la figure de la correction
            const traces = tracePoint(A, B, C)
            const labels = labelPoint(A, B, C)
            const segT = texteSurSegment(nomCercle.charAt(1) + nomCercle.charAt(2) + '=' + stringNombre(R * 2) + ' cm', C, B, 'red', 1)
            segT.mathOn = false
            segT.scale = 1.5
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, traces, figure, segment(B, C), segT)
            texte += '<br>' + mathalea2d(params, objets)
            texteCorr = ''
          } else {
            donneLeDiametre = choice([true, false])
            if (donneLeDiametre) {
              texte = `Un cercle de $${texNombre(2 * R)}$ cm de diamètre.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
              texteCorr = `Le diamètre est de $${texNombre(2 * R)}$ cm donc le rayon est de $${texNombre(R)}$ cm.<br>`
            } else {
              texte = `Un cercle de $${texNombre(R)}$ cm de rayon.` + sp(2) + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline unites[longueurs,aires]', { texte: '<br>' + sp(13) + 'Aire : ' })
              texteCorr = ''
            }
          }

          texteCorr += `$\\mathcal{P}=2\\times${texNombre(R)}\\times\\pi\\div 2 + 2\\times${texNombre(R)}~\\text{cm}\\approx${texNombre(2 * R * Math.PI / 2 + 2 * R, 3)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}=${texNombre(R)}\\times${texNombre(R)}\\times\\pi \\div 2~\\text{cm}^2\\approx${texNombre(R * R * Math.PI / 2, 3)}~\\text{cm}^2$`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}\\approx ${texNombrec(troncature(2 * R * Math.PI / 2 + 2 * R, 1))}~${texTexte(' cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}\\approx ${texNombre(troncature(R * R * Math.PI / 2, 1))}~${texTexte(' cm')}^2$.<br>`
          texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}_{1}\\approx 2 \\times ${texNombre(R)} \\times 3,14 \\div 2 + 2 \\times ${texNombre(R)} \\approx ${texNombrec(2 * R * 3.14 / 2 + 2 * R, 3)}~${texTexte(' cm')}$.<br>`
          texteCorr += `$\\mathcal{A}\\approx ${texNombre(R)}\\times${texNombre(R)}\\times 3,14 \\div 2\\approx ${texNombre(R * R * 3.14 / 2, 3)}~${texTexte(' cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}\\approx ${texNombrec(troncature(2 * R * 3.14 / 2 + 2 * R, 1))}~${texTexte(' cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}\\approx ${texNombre(troncature(R * R * 3.14 / 2, 1))}~${texTexte(' cm')}^2$.<br>`

          resultat1 = arrondi(2 * R * Math.PI / 2 + 2 * R, 1)
          resultat2 = arrondi(R * R * Math.PI / 2, 1)
          break
      }

      if (reponses.indexOf(resultat1 * resultat2) === -1) {
        reponses.push(resultat1 * resultat2)
        if (!context.isAmc) {
          setReponse(this, 2 * i, new Grandeur(resultat1, 'cm'), { formatInteractif: 'unites' })
          setReponse(this, 2 * i + 1, new Grandeur(resultat2, 'cm^2'), { formatInteractif: 'unites' })
        } else {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Périmètre',
                    valeur: resultat1,
                    param: {
                      digits: nombreDeChiffresDe(resultat1),
                      decimals: nombreDeChiffresDansLaPartieDecimale(resultat1),
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'Aire',
                    valeur: resultat2,
                    param: {
                      digits: nombreDeChiffresDe(resultat2),
                      decimals: nombreDeChiffresDansLaPartieDecimale(resultat2),
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }]
          }
        }
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Types de figures (nombres séparés par des tirets)',
    '1 : carré\n2 : rectangle\n3 : triangle rectangle\n4 : cercle\n5 : demi-cercle'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des décimaux', false]
  this.besoinFormulaire3CaseACocher = ['Avec figure']
}
