import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { abs, choice, contraindreValeur, lettreDepuisChiffre, listeQuestionsToContenu, numAlpha, randint, texteEnCouleurEtGras, texteGras } from '../../modules/outils.js'
import { point, segment, rapporteur, rotation, pointSurSegment, labelPoint, tracePoint, angleModulo } from '../../modules/2d.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { min, max } from 'mathjs'
import { context } from '../../modules/context.js'
export const titre = 'Mesurer un angle avec rapporteur intégré'
export const interactifType = 'mathLive'
export const interactifReady = true
export const amcReady = true // pour définir que l'exercice est exportable AMC
export const amcType = 'AMCHybride'
export const dateDePublication = '26/04/2022'

/**
 * Mesurer un angle avec rapporteur déjà en place
 * Ref 6G23-4
 * @author Eric Elter
 * Publié le 27/04/2022
 */
export const uuid = 'ff2cc'
export const ref = '6G23-4'
export default function MesurerUnAngleAvecRapporteur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.sup = 1
  this.sup2 = 7
  this.sup3 = 4
  this.sup4 = false
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let figureExo

    for (let i = 0, texteAMC, posA, sudOuest, nordOuest, sudEst, nordEst, texte, texteCorr, paramsEnonce; i < this.nbQuestions; i++) {
      const propositionsAMC = []
      // On prépare la figure...
      const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      const objetsCorrection = [] // Idem pour la correction
      const tailleRapporteur = contraindreValeur(7, 12, this.sup2, 12)
      // Mise en place des points encadrant l'espace pour le rapporteur. Utiles pour paramsEnonce car le rapporteur peut tourner et optimisons l'espace pour ce rapporteur.
      sudOuest = point(-(tailleRapporteur + 3), 0)
      nordOuest = point(-(tailleRapporteur + 3), tailleRapporteur + 3)
      sudEst = point(tailleRapporteur + 3, 0)
      nordEst = point(tailleRapporteur + 3, tailleRapporteur + 3)

      // Le centre du rapporteur est A.
      // Le point sur la ligne 0 est B. En fait, on construit B1 et B est entre A et B1 (afin que B ne soit pas toujours à X cm de A car cette distance n'a pas à être fixe pour un élève)
      // Les autres points seront dans l'ordre C, D, E et F. Avec la construction préalable de C1, D1... dans les mêmes conditions que précédemment.

      const nbAngles = contraindreValeur(1, 4, this.sup3, 1)
      const sensRot = choice([-1, 1]) // Ce sens de rotation indique si on part du 0 de gauche ou du O de droite.
      const sensRot2 = choice([-1, 1]) // Ce sens de rotation indique si on fait une rotation de B dans le sens trigo ou l'autre sens.
      const numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
      const numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
      const numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
      /* A décommenter pour débugguer (et commenter les 6 lignes du dessus)
      numA = 1
      numB = 2
      numC = 3
      */
      const angB = this.sup === 1 ? 90 + sensRot * 90 : (this.sup === 2 ? sensRot * 90 : randint(0, 360) - 180)

      // posA (et posB, pos C...) permet de choisir une position du point pour ne pas que celui-ci soit illisible (géné par le rapporteur ou l'orientation d'une demi-droite)
      if (sensRot2 * sensRot === 1) {
        posA = angB > 135 ? 'above' : (angB > 45 ? 'right' : (angB > -45 ? 'below' : (angB > -135 ? 'left' : 'above')))
      } else {
        posA = angB > 135 ? 'below' : (angB > 45 ? 'left' : (angB > -45 ? 'above' : (angB > -135 ? 'right' : 'below')))
      }
      const A = point(0, 0, lettreDepuisChiffre(numA), posA)
      const B1 = rotation(point(tailleRapporteur + 3, 0), A, angB)

      const posB = angB > 135 ? 'above' : (angB > 45 ? 'right' : (angB > -45 ? 'below' : (angB > -135 ? 'left' : 'above')))
      const B = pointSurSegment(A, B1, tailleRapporteur + randint(10, 25) / 10, lettreDepuisChiffre(numB), posB)
      const angC = sensRot * sensRot2 * randint(10, 170 - 20 * (nbAngles - 1), [90])
      const posC = angleModulo(angB + angC) > 135 ? 'above' : (angleModulo(angB + angC) > 45 ? 'right' : (angleModulo(angB + angC) > -45 ? 'below' : (angleModulo(angB + angC) > -135 ? 'left' : 'above')))

      const C1 = rotation(B1, A, angC)
      const C = pointSurSegment(A, C1, tailleRapporteur + randint(10, 25) / 10, lettreDepuisChiffre(numC), posC)
      const AB = segment(A, B1)
      const AC = segment(A, C1)
      const ACCorr = segment(A, C1, 'red')
      ACCorr.epaisseur = 2
      const R = rapporteur({ x: 0, y: 0, taille: tailleRapporteur, depart: angC < 0 ? angB + 180 : angB, semi: true, avecNombre: 'deuxSens' })
      sudEst = rotation(sudEst, A, angC < 0 ? angB + 180 : angB)
      nordEst = rotation(nordEst, A, angC < 0 ? angB + 180 : angB)
      sudOuest = rotation(sudOuest, A, angC < 0 ? angB + 180 : angB)
      nordOuest = rotation(nordOuest, A, angC < 0 ? angB + 180 : angB)
      objetsEnonce.push(R, AB, AC, labelPoint(A, B, C), tracePoint(B, C)) // On remplit les tableaux d'objets Mathalea2d
      objetsCorrection.push(R, AB, ACCorr, labelPoint(A, B, C), tracePoint(B, C)) // On remplit les tableaux d'objets Mathalea2d
      texteAMC = nbAngles > 1 ? `${numAlpha(0)} ` : ''
      texteCorr = texteAMC
      texteAMC += `Quelle est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre(numB) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ ?`

      texte = nbAngles > 1 ? '<br>' + texteAMC : texteAMC
      texteCorr += `Comme la demi-droite (${lettreDepuisChiffre(numB) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteGras(0)} du rapporteur et que la demi-droite (${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC), 'red')} du rapporteur, on lit que l'angle $\\widehat{${lettreDepuisChiffre(numB) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numC)}}$ mesure ${texteEnCouleurEtGras(abs(angC) + '°')}.<br>`
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i * nbAngles, 'inline', { tailleExtensible: true })
      }
      setReponse(this, i * nbAngles, abs(angC))
      if (context.isAmc) {
        propositionsAMC[0] = {
          type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
          propositions: [ // une ou plusieurs (Qcms) 'propositions'
            {
              texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
              reponse: { // utilisé si type = 'AMCNum'
                texte: texteAMC, // facultatif
                valeur: abs(angC), // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                param: {
                  digits: 3, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                  signe: false, // obligatoire pour AMC (présence d'une case + ou -)
                  approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                }
              },
              options: { ordered: false, lastChoice: false } // options pour Qcms
            }
          ]
        }
      }
      // Ci-dessus, concerne la partie obligatoire avec au moins un angle.
      // Ci-dessous, on rajoute des points en fonction du nombre d'angles demandé.

      if (nbAngles > 1) {
        const angD = (this.sup4 & nbAngles === 2) ? angleModulo(180 - angC) : sensRot * sensRot2 * randint(10, 170 - 20 * (nbAngles - 2) - abs(angC))
        const D1 = rotation(B1, A, angC + angD)
        const numD = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
        const posD = angleModulo(angB + angC + angD) > 135 ? 'above' : (angleModulo(angB + angC + angD) > 45 ? 'right' : (angleModulo(angB + angC + angD) > -45 ? 'below' : (angleModulo(angB + angC + angD) > -135 ? 'left' : 'above')))
        const D = pointSurSegment(A, D1, tailleRapporteur + randint(10, 25) / 10, lettreDepuisChiffre(numD), posD)
        const AD = segment(A, D1)
        const ADCorr = segment(A, D1, 'blue')
        ADCorr.epaisseur = 2
        texteAMC = `${numAlpha(1)} Quelle est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ ?`

        texte += '<br>' + texteAMC
        texteCorr += `<br>${numAlpha(1)} La demi-droite (${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC), 'red')} du rapporteur. `
        texteCorr += `La demi-droite (${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC + angD), 'blue')} du rapporteur. `
        texteCorr += `Et ${abs(angC + angD)}-${abs(angC)}=${texteGras(abs(angD))}.<br>Donc on en déduit que l'angle $\\widehat{${lettreDepuisChiffre(numC) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numD)}}$ mesure ${texteEnCouleurEtGras(abs(angD) + '°')}.<br>`
        if (this.interactif) {
          texte += ajouteChampTexteMathLive(this, i * nbAngles + 1, 'inline', { tailleExtensible: true })
        }
        setReponse(this, i * nbAngles + 1, abs(angD))
        if (context.isAmc) {
          propositionsAMC[1] = {
            type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
            propositions: [ // une ou plusieurs (Qcms) 'propositions'
              {
                texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
                reponse: { // utilisé si type = 'AMCNum'
                  texte: texteAMC, // facultatif
                  valeur: abs(angD), // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                  alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                  param: {
                    digits: 3, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                    decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                    signe: false, // obligatoire pour AMC (présence d'une case + ou -)
                    approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                  }
                },
                options: { ordered: false, lastChoice: false } // options pour Qcms
              }
            ]
          }
        }
        objetsEnonce.push(AD, labelPoint(D), tracePoint(D)) // On remplit les tableaux d'objets Mathalea2d
        objetsCorrection.push(ADCorr, labelPoint(D), tracePoint(D)) // On remplit les tableaux d'objets Mathalea2d
        if (nbAngles > 2) {
          const angE = (this.sup4 & nbAngles === 3) ? angleModulo(180 - angC - angD) : sensRot * sensRot2 * randint(10, 170 - 20 * (nbAngles - 3) - abs(angC + angD))
          const E1 = rotation(B1, A, angC + angD + angE)
          const numE = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC, numD])
          const posE = angleModulo(angB + angC + angD + angE) > 135 ? 'above' : (angleModulo(angB + angC + angD + angE) > 45 ? 'right' : (angleModulo(angB + angC + angD + angE) > -45 ? 'below' : (angleModulo(angB + angC + angD + angE) > -135 ? 'left' : 'above')))
          const E = pointSurSegment(A, E1, tailleRapporteur + randint(10, 25) / 10, lettreDepuisChiffre(numE), posE)
          const AE = segment(A, E1)
          const AECorr = segment(A, E1, 'hotpink')
          AECorr.epaisseur = 2
          texteAMC = `${numAlpha(2)} Quelle est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numE)}}$ ?`

          texte += '<br>' + texteAMC
          texteCorr += `<br>${numAlpha(2)} La demi-droite (${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC + angD), 'blue')} du rapporteur. `
          texteCorr += `La demi-droite (${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC + angD + angE), 'hotpink')} du rapporteur. `
          texteCorr += `Et ${abs(angC + angD + angE)}-${abs(angC + angD)}=${texteGras(abs(angE))}.<br>Donc on en déduit que l'angle $\\widehat{${lettreDepuisChiffre(numD) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numE)}}$ mesure ${texteEnCouleurEtGras(abs(angE) + '°')}.<br>`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i * nbAngles + 2, 'inline', { tailleExtensible: true })
          }
          setReponse(this, i * nbAngles + 2, abs(angE))
          if (context.isAmc) {
            propositionsAMC[2] = {
              type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
              propositions: [ // une ou plusieurs (Qcms) 'propositions'
                {
                  texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
                  reponse: { // utilisé si type = 'AMCNum'
                    texte: texteAMC, // facultatif
                    valeur: abs(angE), // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                    alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                    param: {
                      digits: 3, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                      decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                      signe: false, // obligatoire pour AMC (présence d'une case + ou -)
                      approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                    }
                  },
                  options: { ordered: false, lastChoice: false } // options pour Qcms
                }
              ]
            }
          }
          objetsEnonce.push(AE, labelPoint(E), tracePoint(E)) // On remplit les tableaux d'objets Mathalea2d
          objetsCorrection.push(AECorr, labelPoint(E), tracePoint(E)) // On remplit les tableaux d'objets Mathalea2d
          if (nbAngles > 3) {
            const angF = (this.sup4) ? angleModulo(180 - angC - angD - angE) : sensRot * sensRot2 * randint(10, 170 - abs(angC + angD + angE))
            const F1 = rotation(B1, A, angC + angD + angE + angF)
            const numF = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC, numD, numE])
            const posF = angleModulo(angB + angC + angD + angE + angF) > 135 ? 'above' : (angleModulo(angB + angC + angD + angE + angF) > 45 ? 'right' : (angleModulo(angB + angC + angD + angE + angF) > -45 ? 'below' : (angleModulo(angB + angC + angD + angE + angF) > -135 ? 'left' : 'above')))
            const F = pointSurSegment(A, F1, tailleRapporteur + randint(10, 25) / 10, lettreDepuisChiffre(numF), posF)
            const AF = segment(A, F1)
            const AFCorr = segment(A, F1, 'green')
            AFCorr.epaisseur = 2
            texteAMC = `${numAlpha(3)} Quelle est la mesure, en degrés, de l'angle $\\widehat{${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numF)}}$ ?`

            texte += '<br>' + texteAMC
            texteCorr += `<br>${numAlpha(3)} La demi-droite (${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC + angD + angE), 'hotpink')} du rapporteur. `
            texteCorr += `La demi-droite (${lettreDepuisChiffre(numF) + lettreDepuisChiffre(numA)}] passe par la graduation ${texteEnCouleurEtGras(abs(angC + angD + angE + angF), 'green')} du rapporteur. `
            texteCorr += `Et ${abs(angC + angD + angE + angF)}-${abs(angC + angD + angE)}=${texteGras(abs(angF))}.<br>Donc on en déduit que l'angle $\\widehat{${lettreDepuisChiffre(numE) + lettreDepuisChiffre(numA) + lettreDepuisChiffre(numF)}}$ mesure ${texteEnCouleurEtGras(abs(angF) + '°')}.<br>`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i * nbAngles + 3, 'inline', { tailleExtensible: true })
            }
            setReponse(this, i * nbAngles + 3, abs(angF))
            if (context.isAmc) {
              propositionsAMC[3] = {
                type: 'AMCNum', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
                propositions: [ // une ou plusieurs (Qcms) 'propositions'
                  {
                    texte: '', // Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm
                    reponse: { // utilisé si type = 'AMCNum'
                      texte: texteAMC, // facultatif
                      valeur: abs(angF), // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
                      alignement: 'center', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
                      param: {
                        digits: 3, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                        decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
                        signe: false, // obligatoire pour AMC (présence d'une case + ou -)
                        approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
                      }
                    },
                    options: { ordered: false, lastChoice: false } // options pour Qcms
                  }
                ]
              }
            }
            objetsEnonce.push(AF, labelPoint(F), tracePoint(F)) // On remplit les tableaux d'objets Mathalea2d
            objetsCorrection.push(AFCorr, labelPoint(F), tracePoint(F)) // On remplit les tableaux d'objets Mathalea2d
          }
        }
      }
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: min(nordEst.x, nordOuest.x, sudEst.x, sudOuest.x), ymin: -1 + min(nordEst.y, nordOuest.y, sudEst.y, sudOuest.y), xmax: max(nordEst.x, nordOuest.x, sudEst.x, sudOuest.x), ymax: 1 + max(nordEst.y, nordOuest.y, sudEst.y, sudOuest.y), pixelsParCm: 20, scale: 1, mainlevee: false }
      figureExo = mathalea2d(paramsEnonce, objetsEnonce)
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: figureExo,
          enonceAvant: true, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          // enonceAvantUneFois: true, // EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
          enonceCentre: true, // EE : ce champ est facultatif et permet (si true) de centrer le champ 'enonce' ci-dessus.
          melange: false, // EE : ce champ est facultatif et permet (si false) de ne pas provoquer le mélange des questions.
          options: { multicols: true, barreseparation: true, multicolsAll: false, avecSymboleMult: false }, // facultatif. Par défaut, multicols est à false. Ce paramètre provoque un multicolonnage (sur 2 colonnes par défaut) des propositions : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
          // barreseparation (par défaut à false) permet de mettre une barre de séparation entre les deux colonnes.
          // multicolsAll (par défaut à false) permet le multicolonnage sur 2 colonnes en incluant l'énoncé. multicolsAll annule multicols.
          // avecSymboleMult (par défaut à false) permet en cas de QCMMult d'avoir un numéro de question ET le symbole indiquant un choix multiple possible et non unique.
          propositions: propositionsAMC
        }
      }

      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += '<br>' + figureExo
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsEnonce, objetsCorrection)
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
    }
  }
  this.besoinFormulaireNumerique = ['Position du rapporteur', 3, '1 : Horizontal\n2 : Vertical\n3 : Peu importe']
  this.besoinFormulaire2Numerique = ['Taille du rapporteur', 12, 'Entre 7 et 12']
  this.besoinFormulaire3Numerique = ['Nombre d\'angles à mesurer', 4, 'Entre 1 et 4']
  this.besoinFormulaire4CaseACocher = ['Avec deux points symétriquement opposés']
}
