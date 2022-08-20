import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, arrondi, choice, lettreDepuisChiffre, rangeMinMax, contraindreValeur, compteOccurences, miseEnEvidence, sp, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { codageAngleDroit, point, pointAdistance, polygone, nommePolygone, codageSegments, afficheLongueurSegment, rotation, triangle2points2longueurs, angleOriente } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { min, max } from 'mathjs'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = "Agrandir ou réduire des figures, d'après une situation de proportionnalité"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '13/03/2022'

/**
 * Trouver comment agrandir ou réduire des longueurs d'une figure et construire la figure demandée
 * @author Eric Elter
 * Référence 6P14
*/
export default function agrandirReduireFigure () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.besoinFormulaireTexte = [
    'Type de figures',
    `Nombres séparés par des tirets : 
    1 : Triangle équilatéral
    2 : Carré
    3 : Triangle avec coefficient de réduction ou d'agrandissement
    4 : Triangle avec longueur initiale et longueur finale
    5 : Rectangle avec coefficient de réduction ou d'agrandissement
    6 : Rectangle avec longueur initiale et longueur finale
    7 : Mélange`
  ]
  this.sup = 7
  this.nbQuestions = 4
  this.spacingCorr = 1
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeQuestions = []
    if (!this.sup) { // Si aucune liste n'est saisie
      listeTypeQuestions = rangeMinMax(1, 6)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeTypeQuestions[0] = contraindreValeur(1, 7, this.sup, 7)
      } else {
        listeTypeQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeTypeQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeTypeQuestions[i] = contraindreValeur(1, 7, parseInt(listeTypeQuestions[i]), 7) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeTypeQuestions, 7) > 0) listeTypeQuestions = rangeMinMax(1, 6) // Teste si l'utilisateur a choisi tout
    listeTypeQuestions = combinaisonListes(listeTypeQuestions, this.nbQuestions)
    const texteAgrandissementOuReduction = [[' agrandissement', 'e réduction'], ['l\'agrandissement demandé', 'la réduction demandée']] // Ne pas supprimer le 'e'
    let ii = 0 // Cet indice permet de gérer les numéros de champs interactifs car ces champs ne sont pas de nombre égal selon les listeTypeQuestions[i].
    let iiAMC // Cet indice permet de gérer les numéros de champs AMC car ces champs ne sont pas de nombre égal selon les listeTypeQuestions[i].
    for (let i = 0, texte, A, B, C, D, BCorr, CCorr, DCorr, polygoneInit, polygoneCorr, choixOrientation, coefAgrandissement, coefReduction, choixAgrandissementOuReduction, sensRotation, nom, nomCorr, absD, absC, absB, alpha, alphaCorr, objets, numA, numACorr, numB, numC, numD, numBCorr, numCCorr, numDCorr, propositionsAMC, enonceAMC, enonceInit, texteCorr, reponse, reponse1, reponse2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      propositionsAMC = []
      iiAMC = 0
      objets = []
      coefAgrandissement = [1.5, 2, 3, 5, 0.5, 0.25, 0.75]
      coefReduction = [new FractionX(1, 2), new FractionX(1, 4), new FractionX(3, 4)]
      choixAgrandissementOuReduction = randint(0, 6)
      A = point(0, 0)
      absB = choixAgrandissementOuReduction < 5 ? randint(5, 11, [6, 9]) : 2 * randint(4, 7)
      switch (listeTypeQuestions[i]) {
        case 1:
          reponse = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absB, 1)
          alpha = randint(10, 170)
          alphaCorr = randint(10, 170, [alpha])
          sensRotation = choice([-1, 1])
          B = pointAdistance(A, absB, sensRotation * alpha)
          BCorr = pointAdistance(A, reponse, sensRotation * alphaCorr)
          C = pointAdistance(A, absB, sensRotation * (alpha + 60))
          CCorr = pointAdistance(A, reponse, sensRotation * (alphaCorr + 60))
          polygoneInit = polygone(A, B, C)
          polygoneCorr = polygone(A, BCorr, CCorr)
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          nom = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC)
          numACorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          numBCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr])
          numCCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr])
          nomCorr = lettreDepuisChiffre(numACorr) + lettreDepuisChiffre(numBCorr) + lettreDepuisChiffre(numCCorr)
          objets.push(polygoneInit, codageSegments('||', 'red', polygoneInit.listePoints), afficheLongueurSegment(sensRotation < 0 ? A : B, sensRotation < 0 ? B : A, 'blue', 0.5, '', true), nommePolygone(polygoneInit, nom))
          enonceInit = `On décide d'effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du triangle équilatéral ${nom}. Quelle sera la longueur du côté du triangle à construire ?`
          texte = enonceInit
          enonceAMC = '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x) - 1, ymin: min(A.y, B.y, C.y) - 1, xmax: max(A.x, B.x, C.x) + 1, ymax: max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          texte += enonceAMC
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, reponse)
          } else if (!context.isAmc) {
            texte = `Trace un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du triangle ${nom}.`
            texte += '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x) - 1, ymin: min(A.y, B.y, C.y) - 1, xmax: max(A.x, B.x, C.x) + 1, ymax: max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          } else {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 1,
                    sanscadre: true,
                    enonce: enonceAMC + `<br>Trace, sur une feuille blanche, ${texteAgrandissementOuReduction[1][choixAgrandissementOuReduction < 4 ? 0 : 1]}.`,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceInit,
                  valeur: [reponse],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(reponse),
                    decimals: nombreDeChiffresDansLaPartieDecimale(reponse),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          texteCorr = `Effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ implique de multiplier toutes les longueurs par ce coefficient`
          if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien, comme $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}=${coefReduction[choixAgrandissementOuReduction - 4].texFraction}$, cela revient à diviser toutes les longueurs par $${coefReduction[choixAgrandissementOuReduction - 4].den}$`
            texteCorr += choixAgrandissementOuReduction === 6 ? ' puis multiplier chacun de ces résultats par 3' : ''
          }
          texteCorr += '.<br>'
          texteCorr += `$${absB} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse)}$`
          if (choixAgrandissementOuReduction === 6) {
            texteCorr += ` ou bien $(${absB} \\div 4) \\times 3=${texNombre(arrondi(absB / 4, 1))} \\times 3=${texNombre(reponse)}$`
          } else if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien $${absB} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse)}$`
          }
          texteCorr += `<br>Le triangle équilatéral issu d'un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du triangle ${nom} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ possède donc des côtés de longueur $${miseEnEvidence(texNombre(reponse))}$.`
          texteCorr += '<br>En voici, une réalisation ci-dessous.'
          objets = []
          objets.push(polygoneCorr, codageSegments('|||', 'blue', polygoneCorr.listePoints), afficheLongueurSegment(sensRotation < 0 ? A : BCorr, sensRotation < 0 ? BCorr : A, 'red', 0.5, '', true), nommePolygone(polygoneCorr, nomCorr))
          texteCorr += '<br>' + mathalea2d({ xmin: min(A.x, BCorr.x, CCorr.x) - 1, ymin: min(A.y, BCorr.y, CCorr.y) - 1, xmax: max(A.x, BCorr.x, CCorr.x) + 1, ymax: max(A.y, BCorr.y, CCorr.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          break
        case 2:
          reponse = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absB, 1)
          alpha = randint(10, 170)
          alphaCorr = randint(10, 170, [alpha])
          sensRotation = choice([-1, 1])
          B = pointAdistance(A, absB, sensRotation * alpha)
          BCorr = pointAdistance(A, reponse, sensRotation * alphaCorr)
          C = rotation(A, B, 90)
          D = rotation(B, A, -90)
          CCorr = rotation(A, BCorr, 90)
          DCorr = rotation(BCorr, A, -90)
          polygoneInit = polygone(A, B, C, D)
          polygoneCorr = polygone(A, BCorr, CCorr, DCorr)
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          numD = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          nom = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC) + lettreDepuisChiffre(numD)
          numACorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          numBCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr])
          numCCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr])
          numDCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr, numCCorr])
          nomCorr = lettreDepuisChiffre(numACorr) + lettreDepuisChiffre(numBCorr) + lettreDepuisChiffre(numCCorr) + lettreDepuisChiffre(numDCorr)
          objets.push(polygoneInit, codageSegments('||', 'red', polygoneInit.listePoints), afficheLongueurSegment(A, B, 'blue', 0.5, '', true), nommePolygone(polygoneInit, nom))
          objets.push(codageAngleDroit(A, B, C), codageAngleDroit(D, C, B), codageAngleDroit(A, D, C), codageAngleDroit(B, A, D))
          enonceInit = `On décide d'effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$, du carré ${nom}. Quelle sera la longueur du côté du carré à construire ?`
          texte = enonceInit
          enonceAMC = '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x, D.x) - 1, ymin: min(A.y, B.y, C.y, D.y) - 1, xmax: max(A.x, B.x, C.x, D.x) + 1, ymax: max(A.y, B.y, C.y, D.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          texte += enonceAMC
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, reponse)
          } else if (!context.isAmc) {
            texte = `Trace un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du carré ${nom}.`
            texte += '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x, D.x) - 1, ymin: min(A.y, B.y, C.y, D.y) - 1, xmax: max(A.x, B.x, C.x, D.x) + 1, ymax: max(A.y, B.y, C.y, D.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          } else {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 1,
                    sanscadre: true,
                    enonce: enonceAMC + `<br>Trace, sur une feuille blanche, ${texteAgrandissementOuReduction[1][choixAgrandissementOuReduction < 4 ? 0 : 1]}.`,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceInit,
                  valeur: [reponse],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(reponse),
                    decimals: nombreDeChiffresDansLaPartieDecimale(reponse),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          texteCorr = `Effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ implique de multiplier toutes les longueurs par ce coefficient`
          if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien, comme $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}=${coefReduction[choixAgrandissementOuReduction - 4].texFraction}$, cela revient à diviser toutes les longueurs par $${coefReduction[choixAgrandissementOuReduction - 4].den}$`
            texteCorr += choixAgrandissementOuReduction === 6 ? ' puis multiplier chacun de ces résultats par 3' : ''
          }
          texteCorr += '.<br>'
          texteCorr += `$${absB} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse)}$`
          if (choixAgrandissementOuReduction === 6) {
            texteCorr += ` ou bien $(${absB} \\div 4) \\times 3=${texNombre(arrondi(absB / 4, 1))} \\times 3=${texNombre(reponse)}$`
          } else if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien $${absB} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse)}$`
          }
          texteCorr += `<br>Le carré issu d'un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du carré ${nom} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ possède donc des côtés de longueur $${miseEnEvidence(texNombre(reponse))}$.`
          texteCorr += '<br>En voici, une réalisation ci-dessous.'
          objets = []
          objets.push(polygoneCorr, codageSegments('|||', 'blue', polygoneCorr.listePoints), afficheLongueurSegment(A, BCorr, 'red', 0.5, '', true), nommePolygone(polygoneCorr, nomCorr))
          objets.push(codageAngleDroit(A, BCorr, CCorr), codageAngleDroit(DCorr, CCorr, BCorr), codageAngleDroit(A, DCorr, CCorr), codageAngleDroit(BCorr, A, DCorr))
          texteCorr += '<br>' + mathalea2d({ xmin: min(A.x, BCorr.x, CCorr.x, DCorr.x) - 1, ymin: min(A.y, BCorr.y, CCorr.y, DCorr.y) - 1, xmax: max(A.x, BCorr.x, CCorr.x, DCorr.x) + 1, ymax: max(A.y, BCorr.y, CCorr.y, DCorr.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          break
        case 3:
          absC = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB]) : 2 * randint(4, 7, [arrondi(absB / 2, 0)])
          absD = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB, absC]) : 2 * randint(4, 7, [arrondi(absB / 2, 0), arrondi(absC / 2, 0)])
          reponse = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absB, 1)
          reponse1 = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absC, 1)
          reponse2 = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absD, 1)
          alpha = randint(10, 170)
          alphaCorr = randint(10, 170, [alpha])
          sensRotation = choice([-1, 1])
          B = pointAdistance(A, absB, sensRotation * alpha)
          BCorr = pointAdistance(A, reponse, sensRotation * alphaCorr)
          choixOrientation = randint(1, 2)
          polygoneInit = triangle2points2longueurs(A, B, absC, absD, choixOrientation)
          C = polygoneInit.listePoints[2]
          polygoneCorr = triangle2points2longueurs(A, BCorr, reponse1, reponse2, choixOrientation)
          CCorr = polygoneCorr.listePoints[2]
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          nom = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC)
          numACorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          numBCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr])
          numCCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr])
          nomCorr = lettreDepuisChiffre(numACorr) + lettreDepuisChiffre(numBCorr) + lettreDepuisChiffre(numCCorr)
          objets.push(polygoneInit, nommePolygone(polygoneInit, nom))
          objets.push(afficheLongueurSegment(angleOriente(C, A, B) > 0 ? A : B, angleOriente(C, A, B) > 0 ? B : A, 'blue', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(A, B, C) > 0 ? B : C, angleOriente(A, B, C) > 0 ? C : B, 'blue', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(B, C, A) > 0 ? C : A, angleOriente(B, C, A) > 0 ? A : C, 'blue', 0.5, '', true))
          enonceInit = `On décide d'effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du triangle ${nom}. Quelles seront les longueurs respectives de chaque côté du triangle à construire ?`
          enonceAMC = '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x) - 1, ymin: min(A.y, B.y, C.y) - 1, xmax: max(A.x, B.x, C.x) + 1, ymax: max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          if (this.interactif) {
            texte = enonceInit
            texte += enonceAMC
            texte += '<br> Dans le nouveau triangle, la plus petite longueur sera :' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, min(reponse, reponse1, reponse2))
            ii++
            texte += '<br> Dans le nouveau triangle, la plus grande longueur sera :' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, max(reponse, reponse1, reponse2))
            ii++
            texte += '<br> Dans le nouveau triangle, la dernière longueur sera :' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, choice([reponse, reponse1, reponse2], [min(reponse, reponse1, reponse2), max(reponse, reponse1, reponse2)]))
          } else if (!context.isAmc) {
            texte = `Trace un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du triangle ${nom}.`
            texte += '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x) - 1, ymin: min(A.y, B.y, C.y) - 1, xmax: max(A.x, B.x, C.x) + 1, ymax: max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          } else {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 1,
                    sanscadre: true,
                    enonce: enonceAMC + `<br>Trace, sur une feuille blanche, ${texteAgrandissementOuReduction[1][choixAgrandissementOuReduction < 4 ? 0 : 1]}.`,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceInit + '<br> <br>Dans le nouveau triangle, la plus petite longueur sera :',
                  valeur: [min(reponse, reponse1, reponse2)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(min(reponse, reponse1, reponse2)),
                    decimals: nombreDeChiffresDansLaPartieDecimale(min(reponse, reponse1, reponse2)),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Dans le nouveau triangle, la plus grande longueur sera :',
                  valeur: [max(reponse, reponse1, reponse2)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(max(reponse, reponse1, reponse2)),
                    decimals: nombreDeChiffresDansLaPartieDecimale(max(reponse, reponse1, reponse2)),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Dans le nouveau triangle, la dernière longueur sera :',
                  valeur: [choice([reponse, reponse1, reponse2], [min(reponse, reponse1, reponse2), max(reponse, reponse1, reponse2)])],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(choice([reponse, reponse1, reponse2], [min(reponse, reponse1, reponse2), max(reponse, reponse1, reponse2)])),
                    decimals: nombreDeChiffresDansLaPartieDecimale(choice([reponse, reponse1, reponse2], [min(reponse, reponse1, reponse2), max(reponse, reponse1, reponse2)])),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          texteCorr = `Effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ implique de multiplier toutes les longueurs par ce coefficient`
          if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien, comme $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}=${coefReduction[choixAgrandissementOuReduction - 4].texFraction}$, cela revient à diviser toutes les longueurs par $${coefReduction[choixAgrandissementOuReduction - 4].den}$`
            texteCorr += choixAgrandissementOuReduction === 6 ? ' puis multiplier chacun de ces résultats par 3' : ''
          }
          texteCorr += '.<br>'
          texteCorr += `$${absB} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse)}${sp(10)}$`
          texteCorr += `$${absC} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse1)}${sp(10)}$`
          texteCorr += `$${absD} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse2)}$`
          if (choixAgrandissementOuReduction === 6) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$(${absB} \\div 4) \\times 3=${texNombre(arrondi(absB / 4, 1))} \\times 3=${texNombre(reponse)}$`
            texteCorr += `${sp(10)}$(${absC} \\div 4) \\times 3=${texNombre(arrondi(absC / 4, 1))} \\times 3=${texNombre(reponse1)}$`
            texteCorr += `${sp(10)}$(${absD} \\div 4) \\times 3=${texNombre(arrondi(absD / 4, 1))} \\times 3=${texNombre(reponse2)}$`
          } else if (choixAgrandissementOuReduction >= 4) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$${absB} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse)}$`
            texteCorr += `${sp(10)}$${absC} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse1)}$`
            texteCorr += `${sp(10)}$${absD} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse2)}$`
          }
          texteCorr += `<br>Le triangle issu d'un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du triangle ${nom} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ possède donc des côtés de longueur respective $${miseEnEvidence(texNombre(reponse))}$ ; $${miseEnEvidence(texNombre(reponse1))}$ et $${miseEnEvidence(texNombre(reponse2))}$.`
          texteCorr += '<br>En voici, une réalisation ci-dessous.'
          objets = []
          objets.push(polygoneCorr, nommePolygone(polygoneCorr, nomCorr))
          objets.push(afficheLongueurSegment(angleOriente(CCorr, A, BCorr) > 0 ? A : BCorr, angleOriente(CCorr, A, BCorr) > 0 ? BCorr : A, 'red', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(A, BCorr, CCorr) > 0 ? BCorr : CCorr, angleOriente(A, BCorr, CCorr) > 0 ? CCorr : BCorr, 'red', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(BCorr, CCorr, A) > 0 ? CCorr : A, angleOriente(BCorr, CCorr, A) > 0 ? A : CCorr, 'red', 0.5, '', true))
          texteCorr += '<br>' + mathalea2d({ xmin: min(A.x, BCorr.x, CCorr.x) - 1, ymin: min(A.y, BCorr.y, CCorr.y) - 1, xmax: max(A.x, BCorr.x, CCorr.x) + 1, ymax: max(A.y, BCorr.y, CCorr.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          break
        case 4:
          absC = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB]) : 2 * randint(4, 7, [arrondi(absB / 2, 0)])
          absD = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB, absC]) : 2 * randint(4, 7, [arrondi(absB / 2, 0), arrondi(absC / 2, 0)])
          reponse = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absB, 1)
          reponse1 = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absC, 1)
          reponse2 = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absD, 1)
          alpha = randint(10, 170)
          alphaCorr = randint(10, 170, [alpha])
          sensRotation = choice([-1, 1])
          B = pointAdistance(A, absB, sensRotation * alpha)
          BCorr = pointAdistance(A, reponse, sensRotation * alphaCorr)
          choixOrientation = randint(1, 2)
          polygoneInit = triangle2points2longueurs(A, B, absC, absD, choixOrientation)
          C = polygoneInit.listePoints[2]
          polygoneCorr = triangle2points2longueurs(A, BCorr, reponse1, reponse2, choixOrientation)
          CCorr = polygoneCorr.listePoints[2]
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          nom = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC)
          numACorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          numBCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr])
          numCCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr])
          nomCorr = lettreDepuisChiffre(numACorr) + lettreDepuisChiffre(numBCorr) + lettreDepuisChiffre(numCCorr)
          objets.push(polygoneInit, nommePolygone(polygoneInit, nom))
          objets.push(afficheLongueurSegment(angleOriente(C, A, B) > 0 ? A : B, angleOriente(C, A, B) > 0 ? B : A, 'blue', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(A, B, C) > 0 ? B : C, angleOriente(A, B, C) > 0 ? C : B, 'blue', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(B, C, A) > 0 ? C : A, angleOriente(B, C, A) > 0 ? A : C, 'blue', 0.5, '', true))
          enonceInit = `On décide d'effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du triangle ${nom}, de telle sorte que la longueur du côté associé à [${lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC)}] mesurera $${texNombre(reponse2)}$.<br>Quelles seront les longueurs respectives des deux autres côtés du triangle à construire ?`
          enonceAMC = '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x) - 1, ymin: min(A.y, B.y, C.y) - 1, xmax: max(A.x, B.x, C.x) + 1, ymax: max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          if (this.interactif) {
            texte = enonceInit
            texte += enonceAMC
            texte += '<br> Dans le nouveau triangle, la plus petite longueur à trouver sera :' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, min(reponse, reponse1))
            ii++
            texte += '<br> Dans le nouveau triangle, la plus grande longueur à trouver sera :' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, max(reponse, reponse1))
          } else if (!context.isAmc) {
            texte = `Trace un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du triangle ${nom} de telle sorte que la longueur du côté associé à [${lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC)}] mesurera $${texNombre(reponse2)}$.`
            texte += '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x) - 1, ymin: min(A.y, B.y, C.y) - 1, xmax: max(A.x, B.x, C.x) + 1, ymax: max(A.y, B.y, C.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          } else {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 1,
                    sanscadre: true,
                    enonce: enonceAMC + `<br>Trace, sur une feuille blanche, ${texteAgrandissementOuReduction[1][choixAgrandissementOuReduction < 4 ? 0 : 1]}.`,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceInit + '<br> <br>Dans le nouveau triangle, la plus petite longueur à trouver sera :',
                  valeur: [min(reponse, reponse1)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(min(reponse, reponse1)),
                    decimals: nombreDeChiffresDansLaPartieDecimale(min(reponse, reponse1)),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Dans le nouveau triangle, la plus grande longueur à trouver sera :',
                  valeur: [max(reponse, reponse1)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(max(reponse, reponse1)),
                    decimals: nombreDeChiffresDansLaPartieDecimale(max(reponse, reponse1)),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          texteCorr = `Effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} implique de multiplier toutes les longueurs par un coefficient de proportionnalité. Trouvons ce coefficient.<br>`
          texteCorr += `Pour trouver ce coefficient, divisons la longueur connue du futur triangle par sa longueur associée dans le triangle actuel : $${texNombre(reponse2)} \\div ${absD} = ${coefAgrandissement[choixAgrandissementOuReduction]}$. Le coefficient de proportionnalité est donc $${coefAgrandissement[choixAgrandissementOuReduction]}$.<br>`
          texteCorr += `Multiplions toutes les longueurs connues du triangle actuel par $${coefAgrandissement[choixAgrandissementOuReduction]}$`

          if (choixAgrandissementOuReduction >= 4) {
            texteCorr += `, ou bien, comme $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}=${coefReduction[choixAgrandissementOuReduction - 4].texFraction}$, cela revient à diviser toutes les longueurs par $${coefReduction[choixAgrandissementOuReduction - 4].den}$`
            texteCorr += choixAgrandissementOuReduction === 6 ? ' puis multiplier chacun de ces résultats par 3' : ''
          }
          texteCorr += `.<br>$${absB} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse)}${sp(10)}$`
          texteCorr += `$${absC} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse1)}$`
          if (choixAgrandissementOuReduction === 6) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$(${absB} \\div 4) \\times 3=${texNombre(arrondi(absB / 4, 1))} \\times 3=${texNombre(reponse)}$`
            texteCorr += `${sp(10)}$(${absC} \\div 4) \\times 3=${texNombre(arrondi(absC / 4, 1))} \\times 3=${texNombre(reponse1)}$`
          } else if (choixAgrandissementOuReduction >= 4) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$${absB} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse)}$`
            texteCorr += `${sp(10)}$${absC} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse1)}$`
          }
          texteCorr += `<br>Le triangle issu d'un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du triangle ${nom} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ possède donc des côtés de longueur respective $${texNombre(reponse2)}$ ; $${miseEnEvidence(texNombre(reponse1))}$ et $${miseEnEvidence(texNombre(reponse))}$.`
          texteCorr += '<br>En voici, une réalisation ci-dessous.'
          objets = []
          objets.push(polygoneCorr, nommePolygone(polygoneCorr, nomCorr))
          objets.push(afficheLongueurSegment(angleOriente(CCorr, A, BCorr) > 0 ? A : BCorr, angleOriente(CCorr, A, BCorr) > 0 ? BCorr : A, 'red', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(A, BCorr, CCorr) > 0 ? BCorr : CCorr, angleOriente(A, BCorr, CCorr) > 0 ? CCorr : BCorr, 'red', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(BCorr, CCorr, A) > 0 ? CCorr : A, angleOriente(BCorr, CCorr, A) > 0 ? A : CCorr, 'red', 0.5, '', true))
          texteCorr += '<br>' + mathalea2d({ xmin: min(A.x, BCorr.x, CCorr.x) - 1, ymin: min(A.y, BCorr.y, CCorr.y) - 1, xmax: max(A.x, BCorr.x, CCorr.x) + 1, ymax: max(A.y, BCorr.y, CCorr.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          break
        case 5:
          absC = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB]) : 2 * randint(4, 7, [arrondi(absB / 2, 0)])
          absD = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB, absC]) : 2 * randint(4, 7, [arrondi(absB / 2, 0), arrondi(absC / 2, 0)])
          reponse = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absB, 1)
          reponse1 = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absC, 1)
          alpha = randint(10, 170)
          alphaCorr = randint(10, 170, [alpha])
          sensRotation = choice([-1, 1])
          B = pointAdistance(A, absB, sensRotation * alpha)
          BCorr = pointAdistance(A, reponse, sensRotation * alphaCorr)
          C = rotation(pointAdistance(B, absC, 180 + sensRotation * alpha), B, -90)
          CCorr = rotation(pointAdistance(BCorr, reponse1, 180 + sensRotation * alphaCorr), BCorr, -90)
          D = rotation(pointAdistance(A, absC, sensRotation * alpha), A, 90)
          DCorr = rotation(pointAdistance(A, reponse1, sensRotation * alphaCorr), A, 90)
          polygoneInit = polygone(A, B, C, D)
          polygoneCorr = polygone(A, BCorr, CCorr, DCorr)
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          numD = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          nom = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC) + lettreDepuisChiffre(numD)
          numACorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          numBCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr])
          numCCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr])
          numDCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr, numCCorr])
          nomCorr = lettreDepuisChiffre(numACorr) + lettreDepuisChiffre(numBCorr) + lettreDepuisChiffre(numCCorr) + lettreDepuisChiffre(numDCorr)
          objets.push(polygoneInit, nommePolygone(polygoneInit, nom))
          objets.push(codageSegments('||', 'red', A, B, C, D))
          objets.push(codageSegments('X', 'red', B, C, D, A))
          objets.push(afficheLongueurSegment(angleOriente(B, C, D) > 0 ? C : D, angleOriente(B, C, D) > 0 ? D : C, 'blue', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(C, D, A) > 0 ? D : A, angleOriente(C, D, A) > 0 ? A : D, 'blue', 0.5, '', true))
          objets.push(codageAngleDroit(A, B, C), codageAngleDroit(D, C, B), codageAngleDroit(A, D, C), codageAngleDroit(B, A, D))
          enonceInit = `On décide d'effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du rectangle ${nom}. Quelles seront les longueurs respectives de chaque côté du rectangle à construire ?`
          enonceAMC = '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x, D.x) - 1, ymin: min(A.y, B.y, C.y, D.y) - 1, xmax: max(A.x, B.x, C.x, D.x) + 1, ymax: max(A.y, B.y, C.y, D.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          if (this.interactif) {
            texte = enonceInit
            texte += enonceAMC
            texte += '<br> Dans le nouveau rectangle, le côté le moins long aura pour longueur : ' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, min(reponse, reponse1))
            ii++
            texte += '<br> Dans le nouveau rectangle, le côté le plus long aura pour longueur : ' + ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            setReponse(this, i + ii, max(reponse, reponse1))
          } else if (!context.isAmc) {
            texte = `Trace un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ du rectangle ${nom}.`
            texte += '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x, D.x) - 1, ymin: min(A.y, B.y, C.y, D.y) - 1, xmax: max(A.x, B.x, C.x, D.x) + 1, ymax: max(A.y, B.y, C.y, D.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          } else {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 1,
                    sanscadre: true,
                    enonce: enonceAMC + `<br>Trace, sur une feuille blanche, ${texteAgrandissementOuReduction[1][choixAgrandissementOuReduction < 4 ? 0 : 1]}.`,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceInit + '<br> <br>Dans le nouveau rectangle, le côté le moins long aura pour longueur :',
                  valeur: [min(reponse, reponse1)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(min(reponse, reponse1)),
                    decimals: nombreDeChiffresDansLaPartieDecimale(min(reponse, reponse1)),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Dans le nouveau rectangle, le côté le plus long aura pour longueur :',
                  valeur: [max(reponse, reponse1)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(max(reponse, reponse1)),
                    decimals: nombreDeChiffresDansLaPartieDecimale(max(reponse, reponse1)),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          texteCorr = `Effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ implique de multiplier toutes les longueurs par ce coefficient`
          if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien, comme $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}=${coefReduction[choixAgrandissementOuReduction - 4].texFraction}$, cela revient à diviser toutes les longueurs par $${coefReduction[choixAgrandissementOuReduction - 4].den}$`
            texteCorr += choixAgrandissementOuReduction === 6 ? ' puis multiplier chacun de ces résultats par 3' : ''
          }
          texteCorr += '.<br>'
          texteCorr += `$${absB} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse)}${sp(10)}$`
          texteCorr += `$${absC} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse1)}$`
          if (choixAgrandissementOuReduction === 6) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$(${absB} \\div 4) \\times 3=${texNombre(arrondi(absB / 4, 1))} \\times 3=${texNombre(reponse)}$`
            texteCorr += `${sp(10)}$(${absC} \\div 4) \\times 3=${texNombre(arrondi(absC / 4, 1))} \\times 3=${texNombre(reponse1)}$`
          } else if (choixAgrandissementOuReduction >= 4) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$${absB} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse)}$`
            texteCorr += `${sp(10)}$${absC} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse1)}$`
          }
          texteCorr += `<br>Le rectangle issu d'un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du rectangle ${nom} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ possède donc des côtés de longueur respective $${miseEnEvidence(texNombre(reponse))}$ et $${miseEnEvidence(texNombre(reponse1))}$.`
          texteCorr += '<br>En voici, une réalisation ci-dessous.'
          objets = []
          objets.push(polygoneCorr, nommePolygone(polygoneCorr, nomCorr))
          objets.push(codageSegments('|||', 'blue', A, BCorr, CCorr, DCorr))
          objets.push(codageSegments('XX', 'blue', BCorr, CCorr, DCorr, A))
          objets.push(afficheLongueurSegment(angleOriente(CCorr, A, BCorr) > 0 ? A : BCorr, angleOriente(CCorr, A, BCorr) > 0 ? BCorr : A, 'red', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(A, BCorr, CCorr) > 0 ? BCorr : CCorr, angleOriente(A, BCorr, CCorr) > 0 ? CCorr : BCorr, 'red', 0.5, '', true))
          objets.push(codageAngleDroit(A, BCorr, CCorr), codageAngleDroit(DCorr, CCorr, BCorr), codageAngleDroit(A, DCorr, CCorr), codageAngleDroit(BCorr, A, DCorr))
          texteCorr += '<br>' + mathalea2d({ xmin: min(A.x, BCorr.x, CCorr.x, DCorr.x) - 1, ymin: min(A.y, BCorr.y, CCorr.y, DCorr.y) - 1, xmax: max(A.x, BCorr.x, CCorr.x, DCorr.x) + 1, ymax: max(A.y, BCorr.y, CCorr.y, DCorr.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          break
        case 6:
          absC = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB]) : 2 * randint(4, 7, [arrondi(absB / 2, 0)])
          absD = choixAgrandissementOuReduction < 4 ? randint(5, 11, [6, 9, absB, absC]) : 2 * randint(4, 7, [arrondi(absB / 2, 0), arrondi(absC / 2, 0)])
          reponse = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absB, 1)
          reponse1 = arrondi(coefAgrandissement[choixAgrandissementOuReduction] * absC, 1)
          alpha = randint(10, 170)
          alphaCorr = randint(10, 170, [alpha])
          sensRotation = choice([-1, 1])
          B = pointAdistance(A, absB, sensRotation * alpha)
          BCorr = pointAdistance(A, reponse, sensRotation * alphaCorr)
          C = rotation(pointAdistance(B, absC, 180 + sensRotation * alpha), B, -90)
          CCorr = rotation(pointAdistance(BCorr, reponse1, 180 + sensRotation * alphaCorr), BCorr, -90)
          D = rotation(pointAdistance(A, absC, sensRotation * alpha), A, 90)
          DCorr = rotation(pointAdistance(A, reponse1, sensRotation * alphaCorr), A, 90)
          polygoneInit = polygone(A, B, C, D)
          polygoneCorr = polygone(A, BCorr, CCorr, DCorr)
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          numD = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          nom = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC) + lettreDepuisChiffre(numD)
          numACorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          numBCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr])
          numCCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr])
          numDCorr = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numACorr, numBCorr, numCCorr])
          nomCorr = lettreDepuisChiffre(numACorr) + lettreDepuisChiffre(numBCorr) + lettreDepuisChiffre(numCCorr) + lettreDepuisChiffre(numDCorr)
          objets.push(polygoneInit, nommePolygone(polygoneInit, nom))
          objets.push(codageSegments('||', 'red', A, B, C, D))
          objets.push(codageSegments('X', 'red', B, C, D, A))
          objets.push(afficheLongueurSegment(angleOriente(B, C, D) > 0 ? C : D, angleOriente(B, C, D) > 0 ? D : C, 'blue', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(C, D, A) > 0 ? D : A, angleOriente(C, D, A) > 0 ? A : D, 'blue', 0.5, '', true))
          objets.push(codageAngleDroit(A, B, C), codageAngleDroit(D, C, B), codageAngleDroit(A, D, C), codageAngleDroit(B, A, D))
          enonceInit = `On décide d'effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du rectangle ${nom}, de telle sorte que la longueur du côté associé à [${lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}] mesurera $${texNombre(reponse)}$. Quelle sera l'autre dimension du rectangle à construire ?`
          enonceAMC = '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x, D.x) - 1, ymin: min(A.y, B.y, C.y, D.y) - 1, xmax: max(A.x, B.x, C.x, D.x) + 1, ymax: max(A.y, B.y, C.y, D.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          if (this.interactif) {
            texte = enonceInit
            texte += ajouteChampTexteMathLive(this, i + ii, 'inline', { tailleExtensible: true })
            texte += enonceAMC
            setReponse(this, i + ii, reponse1)
          } else if (!context.isAmc) {
            texte = `Trace un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du rectangle ${nom} de telle sorte que la longueur du côté associé à [${lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)}] mesurera $${texNombre(reponse)}$.`
            texte += '<br>' + mathalea2d({ xmin: min(A.x, B.x, C.x, D.x) - 1, ymin: min(A.y, B.y, C.y, D.y) - 1, xmax: max(A.x, B.x, C.x, D.x) + 1, ymax: max(A.y, B.y, C.y, D.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          } else {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 1,
                    sanscadre: true,
                    enonce: enonceAMC + `<br>Trace, sur une feuille blanche, ${texteAgrandissementOuReduction[1][choixAgrandissementOuReduction < 4 ? 0 : 1]}.`,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceInit + '<br> <br>Dans le nouveau rectangle, la deuxième longueur sera :',
                  valeur: [reponse1],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(reponse1),
                    decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          texteCorr = `Effectuer un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} implique de multiplier toutes les longueurs par un coefficient de proportionnalité. Trouvons ce coefficient.<br>`
          texteCorr += `Pour trouver ce coefficient, divisons la longueur connue du futur rectangle par sa longueur associée dans le rectangle actuel : $${texNombre(reponse)} \\div ${absB} = ${coefAgrandissement[choixAgrandissementOuReduction]}$. Le coefficient de proportionnalité est donc $${coefAgrandissement[choixAgrandissementOuReduction]}$.<br>`
          texteCorr += `Multiplions toutes les longueurs connues du triangle actuel par $${coefAgrandissement[choixAgrandissementOuReduction]}$`

          if (choixAgrandissementOuReduction >= 4) {
            texteCorr += ` ou bien, comme $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}=${coefReduction[choixAgrandissementOuReduction - 4].texFraction}$, cela revient à diviser toutes les longueurs par $${coefReduction[choixAgrandissementOuReduction - 4].den}$`
            texteCorr += choixAgrandissementOuReduction === 6 ? ' puis multiplier chacun de ces résultats par 3' : ''
          }
          texteCorr += '.<br>'
          texteCorr += `$${absC} \\times ${coefAgrandissement[choixAgrandissementOuReduction]}=${texNombre(reponse1)}$`
          if (choixAgrandissementOuReduction === 6) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$(${absC} \\div 4) \\times 3=${texNombre(arrondi(absC / 4, 1))} \\times 3=${texNombre(reponse1)}$`
          } else if (choixAgrandissementOuReduction >= 4) {
            texteCorr += `${sp(10)} ou bien ${sp(10)}$${absC} \\div ${coefReduction[choixAgrandissementOuReduction - 4].den}=${texNombre(reponse1)}$`
          }
          texteCorr += `<br>Le rectangle issu d'un${texteAgrandissementOuReduction[0][choixAgrandissementOuReduction < 4 ? 0 : 1]} du rectangle ${nom} de coefficient $${texNombre(coefAgrandissement[choixAgrandissementOuReduction])}$ possède donc des côtés de longueur respective $${miseEnEvidence(texNombre(reponse))}$ et $${miseEnEvidence(texNombre(reponse1))}$.`
          texteCorr += '<br>En voici, une réalisation ci-dessous.'
          objets = []
          objets.push(polygoneCorr, nommePolygone(polygoneCorr, nomCorr))
          objets.push(codageSegments('|||', 'blue', A, BCorr, CCorr, DCorr))
          objets.push(codageSegments('XX', 'blue', BCorr, CCorr, DCorr, A))
          objets.push(afficheLongueurSegment(angleOriente(CCorr, A, BCorr) > 0 ? A : BCorr, angleOriente(CCorr, A, BCorr) > 0 ? BCorr : A, 'red', 0.5, '', true))
          objets.push(afficheLongueurSegment(angleOriente(A, BCorr, CCorr) > 0 ? BCorr : CCorr, angleOriente(A, BCorr, CCorr) > 0 ? CCorr : BCorr, 'red', 0.5, '', true))
          objets.push(codageAngleDroit(A, BCorr, CCorr), codageAngleDroit(DCorr, CCorr, BCorr), codageAngleDroit(A, DCorr, CCorr), codageAngleDroit(BCorr, A, DCorr))
          texteCorr += '<br>' + mathalea2d({ xmin: min(A.x, BCorr.x, CCorr.x, DCorr.x) - 1, ymin: min(A.y, BCorr.y, CCorr.y, DCorr.y) - 1, xmax: max(A.x, BCorr.x, CCorr.x, DCorr.x) + 1, ymax: max(A.y, BCorr.y, CCorr.y, DCorr.y) + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          break
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: '',
          options: { multicols: true, barreseparation: false },
          enonceCentre: true,
          enonceAvant: true, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          propositions: propositionsAMC
        }
      }
      if (this.questionJamaisPosee(i, texte, absB, choixAgrandissementOuReduction)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
