import { codageAngleDroit, codageSegments, pointAdistance, polygoneAvecNom, point, translation, vecteur, rotation, similitude, afficheLongueurSegment } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, texNombre, creerNomDePolygone, calcul, texteExposant } from '../../modules/outils.js'
import Grandeur from '../../modules/Grandeur.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Calculer périmètre et aire de carrés, rectangles et triangles rectangles'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * Un carré, un rectangle et un triangle rectangle sont tracés.
 *
 * Il faut calculer les aires
 *
 * Pas de version LaTeX
 * @author Rémi Angot
 * Référence 6M11
 */
export default function PerimetreOuAireDeCarresRectanglesTriangles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = "Calculer l'aire des 3 figures suivantes."
  this.spacing = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nouvelleVersion = function (numeroExercice) {
    let texte = ''; let texteCorr = ''
    const nom = creerNomDePolygone(11, 'QD')
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const c = randint(2, 6)
    const L = randint(2, 5)
    const l = randint(2, 5, L)
    const a = randint(2, 5)
    const b = randint(2, 5)
    const c2 = Math.sqrt(a * a + b * b)
    const pIJK = calcul(a + b + c2, 1)
    const A = point(0, 0, nom[0])
    const B = rotation(point(c, 0), A, randint(-15, 15), nom[1])
    const C = rotation(A, B, -90, nom[2])
    const D = rotation(B, A, 90, nom[3])
    const carre = polygoneAvecNom(A, B, C, D)
    const E = point(8, 0, nom[4])
    const F = pointAdistance(E, L, randint(-15, 15), nom[5])
    const G = similitude(E, F, -90, l / L, nom[6])
    const H = translation(G, vecteur(F, E), nom[7])
    const rectangle = polygoneAvecNom(E, F, G, H)
    const I = point(15, 0, nom[8])
    const J = pointAdistance(I, a, randint(-25, 25), nom[9])
    const K = similitude(I, J, -90, b / a, nom[10])
    const triangle = polygoneAvecNom(I, J, K)
    this.introduction = mathalea2d({ xmin: -2, xmax: 22, ymin: -3, ymax: 7, pixelsParCm: 20, scale: 0.75, mainlevee: false },
      carre, codageAngleDroit(A, B, C), codageAngleDroit(A, D, C), codageAngleDroit(D, C, B), codageAngleDroit(B, A, D), codageSegments('//', 'blue', [A, B, C, D, A]), afficheLongueurSegment(B, A),
      rectangle, codageAngleDroit(E, F, G), codageAngleDroit(F, G, H), codageAngleDroit(G, H, E), codageAngleDroit(H, E, F), codageSegments('/', 'red', E, F, G, H), codageSegments('||', 'blue', F, G, H, E), afficheLongueurSegment(F, E), afficheLongueurSegment(G, F),
      triangle, codageAngleDroit(I, J, K), afficheLongueurSegment(J, I), afficheLongueurSegment(K, J), afficheLongueurSegment(I, K)
    )
    for (let i = 0; i < 6; i++) {
      texte = ''
      texteCorr = ''
      switch (i) {
        case 0 :
          texte = 'Calculer le périmètre du carré en cm.'
          texteCorr += `$\\mathcal{P}_{${nom[0] + nom[1] + nom[2] + nom[3]}}=${c}~\\text{cm}+${c}~\\text{cm}+${c}~\\text{cm}+${c}~\\text{cm}=${4 * c
          }~\\text{cm}$`
          setReponse(this, i, new Grandeur(c * 4, 'cm'), { formatInteractif: 'unites' })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer le périmètre en cm d'un carré de côté ${c}cm.`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Périmètre en cm',
                valeur: c * 4,
                param: { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
              }
            }
          }
          break

        case 1 :
          texte = `Calculer l'aire du carré en cm${texteExposant(2)}.`

          texteCorr += `<br>$\\mathcal{A}_{${nom[0] + nom[1] + nom[2] + nom[3]}}=${c}~\\text{cm}\\times${c}~\\text{cm}=${c * c}~\\text{cm}^2$`
          setReponse(this, i, new Grandeur(c * c, 'cm^2'), { formatInteractif: 'unites' })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer l'aire en cm${texteExposant(2)} du carré de côté ${c}cm`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Aire en cm\\up{2}',
                valeur: c * c,
                param: { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
              }
            }
          }
          break
        case 2 :
          texte = 'Calculer le périmètre du rectangle en cm.'
          texteCorr += `<br>$\\mathcal{P}_{${nom[4] + nom[5] + nom[6] + nom[7]}}=${L}~\\text{cm}+${l}~\\text{cm}+${L}~\\text{cm}+${l}~\\text{cm}=${2 * L + 2 * l
            }~\\text{cm}$`
          setReponse(this, i, new Grandeur((L + l) * 2, 'cm'), { formatInteractif: 'unites' })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer le périmètre en cm du rectangle de longueur ${L}cm et de largeur ${l}cm`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Périmètre en cm',
                valeur: (L + l) * 2,
                param: { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
              }
            }
          }
          break
        case 3 :
          texte = `Calculer l'aire du rectangle en cm${texteExposant(2)}.`
          texteCorr += `<br>$\\mathcal{A}_{${nom[4] + nom[5] + nom[6] + nom[7]}}=${L}~\\text{cm}\\times${l}~\\text{cm}=${L * l
          }~\\text{cm}^2$`
          setReponse(this, i, new Grandeur(L * l, 'cm^2'), { formatInteractif: 'unites' })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer l'aire en cm${texteExposant(2)} du rectangle de longueur ${L}cm et de largeur ${l}cm`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Aire en cm\\up{2}',
                valeur: L * l,
                param: { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
              }
            }
          }
          break
        case 4 :
          texte = 'Calculer le périmètre du triangle rectangle en cm.'
          texteCorr += `<br>$\\mathcal{P}_{${nom[8] + nom[9] + nom[10]}}=${a}~\\text{cm}+${b}~\\text{cm}+${texNombre(c2.toFixed(1))}~\\text{cm}=${pIJK}~\\text{cm}$`
          setReponse(this, i, new Grandeur(pIJK, 'cm'), { formatInteractif: 'unites' })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer le périmètre en cm du triangle rectangle dont les côtés mesurent ${a}cm, ${b}cm et $${texNombre(c2.toFixed(1))}$m`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Périmètre en cm',
                valeur: pIJK,
                param: { digits: 3, decimals: 1, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
              }
            }
          }
          break
        case 5 :
          texte = `Calculer l'aire du triangle rectangle en cm${texteExposant(2)}.`
          texteCorr += `<br>$\\mathcal{A}_{${nom[8] + nom[9] + nom[10]}}=${a}~\\text{cm}\\times${b}~\\text{cm}\\div2=${texNombre(calcul((a * b) / 2))}~\\text{cm}^2$`
          setReponse(this, i, new Grandeur(calcul((a * b) / 2), 'cm^2'), { formatInteractif: 'unites' })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer l'aire en cm${texteExposant(2)} du triangle rectangle dont les côtés de l'angle droit mesurent ${a}cm et ${b}cm`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Aire en cm\\up{2}',
                valeur: calcul((a * b) / 2),
                param: { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
              }
            }
          }
          break
      }
      texte += ajouteChampTexteMathLive(this, i, 'unites[longueurs,aires]')
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }

  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
  // 2 : Aires\n3 : Périmètres et aires"];
}
