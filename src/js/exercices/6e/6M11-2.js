import Exercice from '../Exercice.js'
import { listeQuestionsToContenuSansNumero, randint, arrondi, calcul, texNombrec, texNombre, texTexte } from '../../modules/outils.js'
import { afficheLongueurSegment, codageAngleDroit, codeSegments, fixeBordures, mathalea2d, point, polygoneAvecNom, segment } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
export const titre = 'Calculer périmètre et aire de figures composées'
export const interactifReady = true
export const interactifType = 'mathLive'

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
export default function PerimetreOuAireDeFiguresComposees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.pasDeVersionLatex = true
  this.titre = titre
  this.consigne = "Calculer le périmètre et l'aire des 2 figures suivantes."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const L1 = randint(4, 7)
    let l1 = randint(2, 4)
    const L2 = randint(2, 4)
    if (L1 === l1) {
      l1--
    } // pour que le rectangle ne soit pas un carré
    const A = point(0, 0)
    const B = point(0, l1)
    const C = point(L1, l1)
    const D = point(L1 + L2, l1)
    const E = point(L1, 0)
    const p1 = polygoneAvecNom(A, B, C, D, E)
    const angles1 = [codageAngleDroit(A, B, C), codageAngleDroit(B, C, E), codageAngleDroit(C, E, A), codageAngleDroit(E, A, B)]
    const CE = segment(C, E)
    CE.pointilles = true
    const objets1 = []
    objets1.push(p1[0], p1[1], CE, ...angles1, afficheLongueurSegment(D, E), afficheLongueurSegment(A, B), afficheLongueurSegment(E, A), afficheLongueurSegment(B, D))
    const c = randint(4, 7)
    const h = randint(2, c - 1)
    const M = point(0, 0)
    const N = point(0, c)
    const O = point(c, c)
    const P = point(c, 0)
    const H = point(2, c)
    const S = point(2, c - h)
    const p2 = polygoneAvecNom(M, N, S, O, P)
    const HS = segment(H, S)
    HS.pointilles = true
    const NO = segment(N, O)
    NO.pointilles = true
    const angles2 = [codageAngleDroit(M, N, O), codageAngleDroit(N, O, P), codageAngleDroit(N, H, S), codageAngleDroit(O, P, M), codageAngleDroit(P, M, N)]
    const objets2 = []
    objets2.push(p2[0], p2[1], HS, NO, ...angles2, afficheLongueurSegment(P, M), afficheLongueurSegment(S, N), afficheLongueurSegment(O, S), afficheLongueurSegment(H, S), codeSegments('//', 'black', M, N, M, P, O, P))
    console.log(p1[1].bordures)
    const DA = arrondi(Math.sqrt(L2 ** 2 + l1 ** 2), 1)
    const t1 = arrondi(Math.sqrt(4 + h ** 2), 1) // longueur d'un côté du triangle
    const t2 = arrondi(Math.sqrt((c - 2) ** 2 + h ** 2), 1) // longueur de l'autre côté d'un triangle
    let texte = mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 2 }, fixeBordures(objets1)), ...objets1)
    texte += ajouteChampTexteMathLive(this, 0, 'longueur', { texte: 'Périmètre : ' })
    texte += ajouteChampTexteMathLive(this, 1, 'longueur', { texte: '  Aire : ' })
    texte += mathalea2d(Object.assign({ scale: 0.7, pixelsParCm: 20, zoom: 2 }, fixeBordures(objets2)), ...objets2)
    texte += ajouteChampTexteMathLive(this, 2, 'longueur', { texte: 'Périmètre : ' })
    texte += ajouteChampTexteMathLive(this, 3, 'longueur', { texte: '  Aire : ' })
    console.log(fixeBordures(objets1))
    let texteCorr = `La première figure est composée d'un rectangle de ${L1} cm par ${l1} cm`
    texteCorr += ` et d'un triangle rectangle dont les côtés de l'angle droit mesurent ${L2} cm et ${l1} cm.<br>`
    texteCorr += `$\\mathcal{P}_{1}=${L1 + L2}+${texNombre(
      DA
    )}+${L1}+${l1}=${texNombrec(L1 + L2 + DA + L1 + l1)}$ cm.<br>`
    texteCorr += `$\\mathcal{A}_{1}=${L1}\\times${l1}+${L2}\\times${l1}\\div2=${L1 * l1
      }+${calcul((L2 * l1) / 2)}=${calcul(L1 * l1 + (L2 * l1) / 2)}~${texTexte(
        ' cm'
      )}^2$.`
    texteCorr += '<br><br>'
    texteCorr += `La deuxième figure est un carré de côté ${c} cm auquel il faut enlever un triangle de ${c} cm de base et ${h} cm de hauteur.<br>`
    texteCorr += `$\\mathcal{P}_{2}=${c}+${c}+${c}+${texNombre(
      t1
    )}+${texNombre(t2)}=${texNombrec(3 * c + t1 + t2)}$ cm<br>`
    texteCorr += `$\\mathcal{A}_{2}=${c}\\times${c}-${c}\\times${h}\\div2=${c * c
      }-${texNombrec((c * h) / 2)}=${texNombrec(c ** 2 - (c * h) / 2)}~${texTexte(
        ' cm'
      )}^2$.`
    if (context.isAmc) {
      // a faire
    } else {
      setReponse(this, 0, new Grandeur(L1 + L2 + DA + L1 + l1, 'cm'), { formatInteractif: 'longueur' })
      setReponse(this, 1, new Grandeur(L1 * l1 + (L2 * l1) / 2, 'cm^2'), { formatInteractif: 'longueur' })
      setReponse(this, 2, new Grandeur(3 * c + t1 + t2, 'cm'), { formatInteractif: 'longueur' })
      setReponse(this, 3, new Grandeur(c ** 2 - (c * h) / 2, 'cm^2'), { formatInteractif: 'longueur' })
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
