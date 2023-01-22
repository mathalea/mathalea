import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, arrondi, texNombrec, stringNombre, choice, texNombre, calcul, combinaisonListesSansChangerOrdre, troncature, contraindreValeur, texTexte, rangeMinMax } from '../../modules/outils.js'
import { texteSurSegment, cercle, codageAngleDroit, droite, labelPoint, codageSegments, point, polygoneAvecNom, segment, codageSegment, pointIntersectionCC, pointIntersectionDD, droiteParPointEtPerpendiculaire, arc, pointSurCercle } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
export const titre = 'Calculer périmètre et aire de figures composées'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Deux figures composés de rectangles et de triangles sont tracés.
 *
 * Il faut calculer le périmètre et l'aire par addition ou soustraction d'aires
 *
 * Pas de version LaTeX
 *
 * Un seul type de figure pour l'instant.
 * @author Rémi Angot
 * Référence 6M11-2
 */
export const uuid = '5999f'
export const ref = '6M11-2'
export default function PerimetreOuAireDeFiguresComposees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Calculer le périmètre et l'aire des figures suivantes."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const tripletsPythagoriciens = [
      [3, 4, 5],
      [6, 8, 10],
      [8, 15, 17],
      [10, 24, 26],
      [5, 12, 13],
      [12, 16, 20],
      [20, 21, 29],
      [48, 55, 73],
      [28, 45, 53],
      [36, 77, 85],
      [39, 80, 89]
    ]

    const typesDeQuestionsDisponibles = [
      'rectangle_triangle', // 1
      'rectangle_moins_triangle', // 2
      'rectangle_moins_deux_triangles', // 3
      'rectangle_demi_cercle', // 4
      'rectangle_cercle', // 5
      'rectangle_triangle_demi_cercle' // 6
    ]

    let questionsDisponibles
    if (!this.sup) { // Si aucune liste n'est saisie
      questionsDisponibles = rangeMinMax(1, 6)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        questionsDisponibles = [contraindreValeur(1, 6, this.sup, 2)]
      } else {
        questionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < questionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          questionsDisponibles[i] = contraindreValeur(1, 6, parseInt(questionsDisponibles[i]), 2) // parseInt en fait un tableau d'entiers
        }
      }
    }
    const typesDeQuestions = combinaisonListesSansChangerOrdre(questionsDisponibles, this.nbQuestions)

    const texteSurSeg = function (A, B, texte) {
      const segT = texteSurSegment(texte, A, B, 'black', 0.5)
      segT.mathOn = false
      segT.scale = 1
      return segT
    }

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      let texte, texteCorr, perimetre, aire
      switch (typesDeQuestionsDisponibles[typesDeQuestions[i] - 1]) {
        case 'rectangle_triangle': {
          const triplet = choice(tripletsPythagoriciens)
          const adjust = (triplet[2] > 50 ? 0.1 : randint(2, 3) / 10)
          const partieDecimale1 = adjust - 1
          const l1 = calcul(triplet[0] * (1 + partieDecimale1))
          const L2 = calcul(triplet[1] * (1 + partieDecimale1))
          const hyp = calcul(triplet[2] * (1 + partieDecimale1))
          const L1 = calcul(randint(Math.ceil(l1) + 1, Math.ceil(l1) + 4) + randint(1, 9) / 10)
          const zoom = randint(10, 14) / (L1 + L2)
          const A = point(0, 0, 'A')
          const B = point(0, l1 * zoom, 'B')
          const C = point(L1 * zoom, l1 * zoom, 'C')
          const D = point((L1 + L2) * zoom, l1 * zoom, 'D')
          const E = point(L1 * zoom, 0, 'E')
          const p1 = polygoneAvecNom(A, B, C, D, E)
          const angles1 = [codageAngleDroit(A, B, C), codageAngleDroit(B, C, E), codageAngleDroit(C, E, A), codageAngleDroit(E, A, B), codageSegment(A, B, '/', 'black'), codageSegment(C, E, '/', 'black'), codageSegment(B, C, '//', 'black'), codageSegment(A, E, '//', 'black')]
          const CE = segment(C, E)
          CE.pointilles = 5
          const objets1 = []
          objets1.push(p1[0], /* labelPoint(A, B, C, D, E), */ CE, ...angles1, texteSurSeg(D, E, stringNombre(hyp) + 'cm'), texteSurSeg(A, B, stringNombre(l1) + 'cm'), texteSurSeg(E, A, stringNombre(L1) + 'cm'), texteSurSeg(C, D, stringNombre(L2) + 'cm'))
          texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 1 }, fixeBordures([A, B, C, D, E, point(C.x, C.y + 0.2)], { rxmin: -1, rymin: -1 })), ...objets1)
          texte += ajouteChampTexteMathLive(this, i * 4, 'unites[longueurs]', { texte: 'Périmètre : ' })
          texte += ajouteChampTexteMathLive(this, i * 4 + 1, 'unites[aires]', { texte: '  Aire : ' })
          texteCorr = `La figure est composée d'un rectangle de ${stringNombre(L1)} cm par ${stringNombre(l1)} cm`
          texteCorr += ` et d'un triangle rectangle dont les côtés de l'angle droit mesurent ${stringNombre(L2)} cm et ${stringNombre(l1)} cm.<br>`
          texteCorr += `$\\mathcal{P}_{1}=${texNombre(L1 + L2)}+${texNombre(hyp)}+${texNombre(L1)}+${texNombre(l1)}=${texNombrec(L1 + L2 + hyp + L1 + l1)}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}=${texNombre(L1)}\\times${texNombre(l1)}+${texNombre(L2)}\\times${texNombre(l1)}\\div2=${texNombre(L1 * l1)}+${texNombrec((L2 * l1) / 2)}=${texNombrec(L1 * l1 + (L2 * l1) / 2)}~${texTexte('cm')}^2$.`
          texteCorr += '<br>'
          perimetre = L1 + L2 + hyp + L1 + l1
          aire = L1 * l1 + (L2 * l1) / 2
          break
        }
        case 'rectangle_moins_triangle': {
          const triplet = choice(tripletsPythagoriciens)
          const adjust = (triplet[2] > 50 ? 0.1 : randint(2, 3) / 10)
          const c1 = calcul(triplet[0] * (adjust))
          const c2 = calcul(triplet[1] * (adjust))
          const c = calcul(triplet[2] * (adjust))
          const zoom = randint(8, 12) / c
          // const h = c1 * c2 / c
          const M = point(0, 0, 'M')
          const N = point(0, c * zoom, 'N')
          const O = point(c * zoom, c * zoom, 'O')
          const P = point(c * zoom, 0, 'P')
          const S = pointIntersectionCC(cercle(N, c1 * zoom), cercle(O, c2 * zoom), 'S', 2)
          // const H = pointIntersectionDD(droite(N, O), droiteParPointEtPerpendiculaire(S, droite(N, O)))
          const p2 = polygoneAvecNom(M, N, S, O, P)
          const NO = segment(N, O)
          NO.pointilles = 5
          const angles2 = [codageAngleDroit(M, N, O), codageAngleDroit(N, O, P), codageAngleDroit(N, S, O), codageAngleDroit(O, P, M), codageAngleDroit(P, M, N)]
          const objets2 = []
          objets2.push(p2[0] /* labelPoint(M, N, S, O, P, H) */, NO, ...angles2, texteSurSeg(P, M, stringNombre(c) + 'cm'), texteSurSeg(S, N, stringNombre(c1) + 'cm'), texteSurSeg(O, S, stringNombre(c2) + 'cm'), codageSegments('//', 'black', M, N, M, P, O, P))
          texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 1 }, fixeBordures([M, N, S, O, P, point(N.x, N.y + 0.5)], { rxmin: -1, rymin: -1 })), ...objets2)
          texte += ajouteChampTexteMathLive(this, i * 4, 'unites[longueurs]', { texte: 'Périmètre : ' })
          texte += ajouteChampTexteMathLive(this, i * 4 + 1, 'unites[aires]', { texte: '  Aire : ' })
          texteCorr = `La figure est un carré de côté ${stringNombre(c)} cm auquel il faut enlever un triangle rectangle dont les côtés de l'angle droit mesurent ${stringNombre(c1)} cm et ${stringNombre(c2)} cm.<br>`
          texteCorr += `$\\mathcal{P}_{2}=${texNombre(c)}+${texNombre(c)}+${texNombre(c)}+${texNombre(c1)}+${texNombre(c2)}=${texNombrec(3 * c + c1 + c2)}~${texTexte('cm')}$<br>`
          texteCorr += `$\\mathcal{A}_{2}=${texNombre(c)}\\times${texNombre(c)}-${texNombre(c1)}\\times${texNombre(c2)}\\div2=${texNombrec(c ** 2 - (c1 * c2) / 2)}~${texTexte('cm')}^2$.`
          texteCorr += '<br>'
          perimetre = 3 * c + c1 + c2
          aire = c ** 2 - (c1 * c2) / 2
          break
        }
        case 'rectangle_moins_deux_triangles': {
          const deuxtripletsPythagoriciens = [
            [[8, 6, 10], [8, 15, 17]],
            [[20, 48, 52], [20, 21, 29]],
            [[12, 5, 13], [12, 16, 20]],
            [[20, 21, 29], [5 * 4, 12 * 4, 13 * 4]],
            [[20, 21, 29], [3 * 7, 4 * 7, 5 * 7]],
            [[48, 55, 73], [4 * 12, 3 * 12, 5 * 12]],
            [[28, 45, 53], [4 * 7, 3 * 7, 5 * 7]],
            [[36, 77, 85], [4 * 9, 3 * 9, 5 * 9]],
            [[39, 80, 89], [3 * 13, 4 * 13, 5 * 13]]
          ]
          const [triplet1, triplet2] = choice(deuxtripletsPythagoriciens)
          const adjust = (triplet1[1] + triplet2[1] > 50 ? 0.1 : randint(3, 4) / 10)
          const com1 = calcul(triplet1[0] * (adjust))
          const c1 = calcul(triplet1[1] * (adjust))
          const h1 = calcul(triplet1[2] * (adjust))
          // const com1 = calcul(triplet1[0] * (1 + partieDecimale1))
          const c2 = calcul(triplet2[1] * (adjust))
          const h2 = calcul(triplet2[2] * (adjust))
          const zoom = randint(8, 12) / (c1 + c2)
          const h = com1
          const c = c1 + c2
          const M = point(0, 0, 'M')
          const N = point(0, c * zoom, 'N')
          const O = point(c * zoom, c * zoom, 'O')
          const P = point(c * zoom, 0, 'P')
          const S = pointIntersectionCC(cercle(N, h1 * zoom), cercle(O, h2 * zoom), 'S', 2)
          const H = pointIntersectionDD(droite(N, O), droiteParPointEtPerpendiculaire(S, droite(N, O)))
          const p2 = polygoneAvecNom(M, N, S, O, P)
          const HS = segment(H, S)
          HS.pointilles = 5
          const NO = segment(N, O)
          NO.pointilles = 5
          const angles2 = [codageAngleDroit(M, N, O), codageAngleDroit(N, O, P), codageAngleDroit(N, H, S), codageAngleDroit(O, P, M), codageAngleDroit(P, M, N)]
          const objets2 = []
          objets2.push(p2[0]/*, labelPoint(M, N, S, O, P, H) */, HS, NO, ...angles2, texteSurSeg(P, M, stringNombre(c) + 'cm'), texteSurSeg(S, N, stringNombre(h1) + 'cm'), texteSurSeg(O, S, stringNombre(h2) + 'cm'), texteSurSeg(H, S, stringNombre(com1) + 'cm'), codageSegments('//', 'black', M, N, M, P, O, P))
          texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 1 }, fixeBordures([M, N, S, O, P, point(N.x, N.y + 0.5)], { rxmin: -1, rymin: -1 })), ...objets2)
          texte += ajouteChampTexteMathLive(this, i * 4, 'unites[longueurs]', { texte: 'Périmètre : ' })
          texte += ajouteChampTexteMathLive(this, i * 4 + 1, 'unites[aires]', { texte: '  Aire : ' })
          texteCorr = `La figure est un carré de côté ${stringNombre(c)} cm auquel il faut enlever un triangle de ${stringNombre(c)} cm de base et ${stringNombre(h)} cm de hauteur.<br>`
          texteCorr += `$\\mathcal{P}_{2}=${texNombre(c)}+${texNombre(c)}+${texNombre(c)}+${texNombre(c1)}+${texNombre(c2)}=${texNombrec(3 * c + c1 + c2)}~${texTexte('cm')}$<br>`
          texteCorr += `$\\mathcal{A}_{2}=${texNombre(c)}\\times${texNombre(c)}-${texNombre(c)}\\times${h}\\div2=${texNombre(c * c)}-${texNombrec((c * h) / 2)}=${texNombrec(c ** 2 - (c * h) / 2)}~${texTexte('cm')}^2$.`
          texteCorr += '<br>'
          perimetre = 3 * c + c1 + c2
          aire = c ** 2 - (c * h) / 2
          break
        }
        case 'rectangle_demi_cercle': {
          const partieDecimale1 = calcul(randint(1, 9) / 10)
          let L1 = randint(4, 8)
          let L2 = randint(3, L1 - 1)
          L1 = calcul(L1 * (1 + partieDecimale1))
          L2 = calcul(L2 * (1 + partieDecimale1))
          const zoom = randint(10, 14) / (L1 + L2 / 2)
          const A = point(0, 0, 'A')
          const B = point(0, L2 * zoom, 'B')
          const C = point(L1 * zoom, L2 * zoom, 'C')
          const D = point(L1 * zoom, 0, 'D')
          const E = point(L1 * zoom, L2 * zoom * 0.5, 'E')
          const R = pointSurCercle(cercle(E, zoom * L2 / 2), -5, 'R')
          const demicercle = arc(D, E, 180, false, 'none')
          const angles1 = [codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(D, A, B), codageAngleDroit(A, D, C), codageSegment(E, R, '//', 'black'), codageSegment(E, D, '//', 'black'), codageSegment(E, C, '//', 'black'), codageSegment(A, D, '/', 'black'), codageSegment(C, B, '/', 'black')]
          const CD = segment(C, D)
          CD.pointilles = 5
          const ER = segment(E, R)
          ER.pointilles = 5
          const objets1 = []
          objets1.push(segment(A, B), segment(B, C), segment(A, D), demicercle, /* labelPoint(A, B, C, D, E), */ CD, ER, ...angles1, texteSurSeg(A, B, stringNombre(L2) + 'cm'), texteSurSeg(A, D, stringNombre(L1) + 'cm'), texteSurSeg(E, R, stringNombre(L2 / 2) + 'cm'))
          texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 1 }, fixeBordures([A, B, C, D, E, demicercle, point(C.x, C.y + 0.2)], { rxmin: -1, rymin: -1 })), ...objets1)
          texte += ajouteChampTexteMathLive(this, i * 4, 'unites[longueurs]', { texte: 'Périmètre : ' })
          texte += ajouteChampTexteMathLive(this, i * 4 + 1, 'unites[aires]', { texte: '  Aire : ' })
          texteCorr = `La figure est composée d'un rectangle de ${stringNombre(L1)} cm par ${stringNombre(L2)} cm`
          texteCorr += ` et d'un demi cercle de rayon ${stringNombre(L2 / 2)} cm.<br>`
          texteCorr += `$\\mathcal{P}_{1}=${texNombre(L1)}+${texNombre(L2)}+${texNombre(L1)}+${texNombre(L2)}\\times \\pi \\div 2 \\approx ${texNombre(troncature(L1 + L2 + L1 + L2 * Math.PI / 2, 3), 3)}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}=${texNombre(L1)}\\times${texNombre(L2)}+${texNombre(L2 / 2)}\\times${texNombre(L2 / 2)}\\times\\pi \\div 2 \\approx ${texNombre(troncature(L1 * L2 + (L2 / 2) * (L2 / 2) * Math.PI / 2, 3), 3)}~${texTexte('cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}_{1}\\approx ${texNombrec(troncature(L1 + L2 + L1 + L2 * Math.PI / 2, 1))}~${texTexte('cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}_{1}\\approx ${texNombre(troncature(L1 * L2 + (L2 / 2) * (L2 / 2) * Math.PI / 2, 1))}~${texTexte('cm')}^2$.<br>`
          texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}_{1}\\approx ${texNombre(L1)}+${texNombre(L2)}+${texNombre(L2)}+${texNombre(L2)}\\times 3,14 \\div 2 \\approx ${texNombre(troncature(L1 + L2 + L1 + L2 * 3.14 / 2, 3), 3)}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}\\approx ${texNombre(L1)}\\times${texNombre(L2)}+${texNombre(L2 / 2)}\\times${texNombre(L2 / 2)}\\times 3,14 \\div 2 \\approx ${texNombre(troncature(L1 * L2 + (L2 / 2) * (L2 / 2) * 3.14 / 2, 3), 3)}~${texTexte('cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}_{1}\\approx ${texNombrec(troncature(L1 + L2 + L1 + L2 * 3.14 / 2, 1))}~${texTexte('cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}_{1}\\approx ${texNombre(troncature(L1 * L2 + (L2 / 2) * (L2 / 2) * 3.14 / 2, 1))}~${texTexte('cm')}^2$.<br>`
          texteCorr += '<br>'
          perimetre = L1 + L2 + L1 + L2 * Math.PI / 2
          aire = L1 * L2 + (L2 / 2) * (L2 / 2) * Math.PI / 2
          break
        }
        case 'rectangle_cercle': {
          const partieDecimale1 = calcul(randint(1, 9, [1, 3, 5, 7, 9]) / 10)
          let L1 = randint(4, 8)
          let L2 = randint(3, L1 - 1)
          L1 = calcul(L1 * (1 + partieDecimale1))
          L2 = calcul(L2 * (1 + partieDecimale1))
          const zoom = randint(12, 16) / (L1 + L2)
          const A = point(0, 0, 'A')
          const B = point(0, L2 * zoom, 'B')
          const C = point(L1 * zoom, L2 * zoom, 'C')
          const D = point(L1 * zoom, 0, 'D')
          const E = point(L1 * zoom, L2 * zoom * 0.5, 'E')
          const F = point(0, L2 * zoom * 0.5, 'F')
          const R = pointSurCercle(cercle(E, zoom * L2 / 2), -5, 'R')
          const S = pointSurCercle(cercle(F, zoom * L2 / 2), -185, 'R')
          const demicercle = arc(D, E, 180, false, 'none')
          const demicercle2 = arc(B, F, 180, false, 'none')
          const angles1 = [codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(D, A, B), codageAngleDroit(A, D, C), codageSegment(E, R, '//', 'black'), codageSegment(E, D, '//', 'black'), codageSegment(E, C, '//', 'black'), codageSegment(F, S, '//', 'black'), codageSegment(F, B, '//', 'black'), codageSegment(F, A, '//', 'black'), codageSegment(A, D, '/', 'black'), codageSegment(C, B, '/', 'black')]
          const CD = segment(C, D)
          CD.pointilles = 5
          const AB = segment(A, B)
          AB.pointilles = 5
          const ER = segment(E, R)
          ER.pointilles = 5
          const FS = segment(F, S)
          FS.pointilles = 5
          const objets1 = []
          objets1.push(AB, segment(B, C), segment(A, D), demicercle, demicercle2, /* labelPoint(A, B, C, D, E), */ CD, ER, FS, ...angles1, texteSurSeg(E, R, stringNombre(L2 / 2) + 'cm'), texteSurSeg(A, D, stringNombre(L1) + 'cm'))
          texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 1 }, fixeBordures([A, B, C, D, E, demicercle, demicercle2, point(C.x, C.y + 0.2)], { rxmin: -1, rymin: -1 })), ...objets1)
          texte += ajouteChampTexteMathLive(this, i * 4, 'unites[longueurs]', { texte: 'Périmètre : ' })
          texte += ajouteChampTexteMathLive(this, i * 4 + 1, 'unites[aires]', { texte: '  Aire : ' })
          texteCorr = `La figure est composée d'un rectangle de ${stringNombre(L1)} cm par ${stringNombre(L2)} cm`
          texteCorr += ` et de deux demi-cercles de rayon ${stringNombre(L2 / 2)} cm.<br>`
          texteCorr += `$\\mathcal{P}_{1}=${texNombre(L1)}+${texNombre(L1)}+${texNombre(L2)}\\times \\pi \\approx ${texNombrec(L1 + L1 + L2 * Math.PI, 3)}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}=${texNombre(L1)}\\times${texNombre(L2)}+${texNombre(L2 / 2)}\\times${texNombre(L2 / 2)}\\times\\pi\\approx ${texNombre(L1 * L2 + (L2 / 2) * (L2 / 2) * Math.PI, 3)}~${texTexte('cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}_{1}\\approx ${texNombrec(troncature(L1 + L1 + L2 * Math.PI, 1))}~${texTexte('cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}_{1}\\approx ${texNombre(troncature(L1 * L2 + (L2 / 2) * (L2 / 2) * Math.PI, 1))}~${texTexte('cm')}^2$.<br>`
          texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}_{1}\\approx ${texNombre(L1)}+${texNombre(L1)}+${texNombre(L2)}\\times 3,14 \\approx ${texNombrec(L1 + L1 + L2 * 3.14, 3)}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}\\approx ${texNombre(L1)}\\times${texNombre(L2)}+${texNombre(L2 / 2)}\\times${texNombre(L2 / 2)}\\times 3,14\\approx ${texNombre(L1 * L2 + (L2 / 2) * (L2 / 2) * 3.14, 3)}~${texTexte('cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}_{1}\\approx ${texNombrec(troncature(L1 + L1 + L2 * 3.14, 1))}~${texTexte('cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}_{1}\\approx ${texNombre(troncature(L1 * L2 + (L2 / 2) * (L2 / 2) * 3.14, 1))}~${texTexte('cm')}^2$.<br>`
          texteCorr += '<br>'
          perimetre = L1 + L2 + L1 + L2 * Math.PI
          aire = L1 * L2 + (L2 / 2) * (L2 / 2) * Math.PI
          break
        }
        case 'rectangle_triangle_demi_cercle': {
          const triplet = choice(tripletsPythagoriciens)
          const adjust = (triplet[2] > 50 ? randint(1, 3) / 10 : randint(6, 8) / 10)
          const l1 = calcul(triplet[0] * (adjust))
          const L2 = calcul(triplet[1] * (adjust))
          const hyp = calcul(triplet[2] * (adjust))
          const L1 = calcul(randint(Math.ceil(l1) + 1, Math.ceil(l1) + 4) + randint(1, 9) / 10)
          const zoom = randint(14, 16) / (L1 + L2)
          const A = point(0, 0, 'A')
          const B = point(0, l1 * zoom, 'B')
          const C = point(L1 * zoom, l1 * zoom, 'C')
          const D = point((L1 + L2) * zoom, l1 * zoom, 'D')
          const E = point(L1 * zoom, 0, 'E')
          const F = point(0, l1 * zoom * 0.5, 'E')
          const R = pointSurCercle(cercle(F, zoom * l1 / 2), 185, 'R')
          const demicercle = arc(B, F, 180, false, 'none')
          const angles1 = [codageAngleDroit(A, B, C), codageAngleDroit(B, C, E), codageAngleDroit(C, E, A), codageAngleDroit(E, A, B), texteSurSeg(F, R, stringNombre(l1 / 2) + 'cm'), codageSegment(F, R, '//', 'black'), codageSegment(F, A, '//', 'black'), codageSegment(F, B, '//', 'black'), codageSegment(A, E, '/', 'black'), codageSegment(C, B, '/', 'black')]
          const FR = segment(F, R)
          FR.pointilles = 5
          const AB = segment(A, B)
          AB.pointilles = 5
          const CE = segment(C, E)
          CE.pointilles = 5
          const objets1 = []
          objets1.push(demicercle, segment(A, E), segment(D, E), segment(B, D), /* labelPoint(A, B, C, D, E), */ FR, AB, CE, ...angles1, texteSurSeg(D, E, stringNombre(hyp) + 'cm'), texteSurSeg(E, C, stringNombre(l1) + 'cm'), texteSurSeg(E, A, stringNombre(L1) + 'cm'), texteSurSeg(C, D, stringNombre(L2) + 'cm'))
          texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 1 }, fixeBordures([demicercle, A, B, C, D, E, point(C.x, C.y + 0.2)], { rxmin: -1, rymin: -1 })), ...objets1)
          texte += ajouteChampTexteMathLive(this, i * 4, 'unites[longueurs]', { texte: 'Périmètre : ' })
          texte += ajouteChampTexteMathLive(this, i * 4 + 1, 'unites[aires]', { texte: '  Aire : ' })
          texteCorr = `La figure est composée d'un rectangle de ${stringNombre(L1)} cm par ${stringNombre(l1)} cm, `
          texteCorr += `d'un triangle rectangle dont les côtés de l'angle droit mesurent ${stringNombre(L2)} cm et ${stringNombre(l1)} cm `
          texteCorr += `et d'un demi-cercle de rayon ${stringNombre(l1 / 2)}cm.<br>`
          texteCorr += `$\\mathcal{P}_{1}=${texNombre(L1)}+${texNombre(L1 + L2)}+${texNombre(l1)}\\times \\pi \\div 2+${texNombre(hyp)}\\approx${texNombrec(troncature(L1 + L1 + hyp + L2 + l1 * Math.PI / 2, 3))}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}=${texNombre(L1)}\\times${texNombre(l1)}+${texNombre(L2)}\\times${texNombre(l1)} \\div 2 + \\pi \\times${texNombre(l1)} \\div 2\\approx${texNombrec(troncature(L1 * l1 + (L2 * l1) / 2 + (l1 / 2) * (l1 / 2) * Math.PI / 2, 3))}~${texTexte('cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}_{1}\\approx ${texNombrec(troncature(L1 + L2 + hyp + L1 + l1 * Math.PI / 2, 1))}~${texTexte('cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}_{1}\\approx ${texNombre(troncature(L1 * l1 + (l1 / 2) * (l1 / 2) * Math.PI / 2 + L2 * l1 / 2, 1))}~${texTexte('cm')}^2$.<br>`
          texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}_{1}\\approx ${texNombre(L1)}+${texNombre(L1 + L2)}+${texNombre(l1)}\\times 3,14 \\div 2+${texNombre(hyp)}\\approx${texNombrec(troncature(L1 + L1 + hyp + L2 + l1 * 3.14 / 2, 3))}~${texTexte('cm')}$.<br>`
          texteCorr += `$\\mathcal{A}_{1}\\approx ${texNombre(L1)}\\times${texNombre(l1)}+${texNombre(L2)}\\times${texNombre(l1)} \\div 2 + 3,14 \\times${texNombre(l1)} \\div 2\\approx${texNombrec(troncature(L1 * l1 + (L2 * l1) / 2 + (l1 / 2) * (l1 / 2) * 3.14 / 2, 3))}~${texTexte('cm')}^2$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{P}_{1}\\approx ${texNombrec(troncature(L1 + L1 + L2 + hyp + l1 * 3.14 / 2, 1))}~${texTexte('cm')}$.`
          texteCorr += `<br>Une valeur approchée au dixième est donc $\\mathcal{A}_{1}\\approx ${texNombre(troncature(L1 * l1 + (l1 / 2) * (l1 / 2) * 3.14 / 2 + L2 * l1 / 2, 1))}~${texTexte('cm')}^2$.<br>`
          texteCorr += '<br>'
          texteCorr += '<br>'
          perimetre = L1 + L2 + hyp + L1 + l1 * Math.PI / 2
          aire = L1 * l1 + (L2 * l1) / 2 + (l1 / 2) * (l1 / 2) * Math.PI / 2
          break
        }
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: 'Calculer le périmètre et l\'aire des figures suivantes\\\\' + texte,
          options: { multicols: true },
          propositions: [
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: texteCorr,
                  reponse: {
                    valeur: [arrondi(perimetre, 1)],
                    texte: '$\\mathcal{P}$ encm',
                    param: {
                      digits: 3,
                      decimals: 1,
                      signe: false
                    }
                  }
                }
              ]
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: '',
                  reponse: {
                    valeur: [arrondi(aire, 1)],
                    texte: '$\\mathcal{A}$ encm²',
                    param: {
                      digits: 3,
                      decimals: 1,
                      signe: false
                    }
                  }
                }
              ]
            }
          ]
        }
      } else {
        setReponse(this, i * 4, new Grandeur(perimetre, 'cm'), { formatInteractif: 'unites' })
        setReponse(this, i * 4 + 1, new Grandeur(aire, 'cm^2'), { formatInteractif: 'unites' })
      }
      if (this.questionJamaisPosee(i, perimetre, aire)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Types de figures (nombres séparés par des tirets)',
    '1 : Rectangle & triangle\n2 : Rectangle moins triangle\n3 :Rectangle moins deux triangles\n4 : Rectangle & demi-cercle\n5 : Rectangle & cercle \n6 : Rectangle & demi-cercle & triangle'
  ]
}
