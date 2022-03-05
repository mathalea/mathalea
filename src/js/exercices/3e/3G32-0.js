import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, numAlpha, stringNombre, combinaisonListes, texNombrec, texNombre, arrondi, arrondiVirgule, texFractionReduite, creerNomDePolygone, choice, sp, lettreDepuisChiffre, rangeMinMax, contraindreValeur, compteOccurences } from '../../modules/outils.js'
import { texteSurSegment, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d, tracePoint, labelPoint, pointAdistance, projectionOrtho, droite, longueur, angle, droiteVerticaleParPoint, cercle, pointIntersectionLC, polygone } from '../../modules/2d.js'
import { arete3d, demicercle3d, point3d, rotationV3d, sphere3d, vecteur3d } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
import { min, max } from 'mathjs'
export const titre = 'Problèmes nécessitant un calcul de longueur à l\'aide de la trigonométrie'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '05/03/2022'

/**
 * Calculer la largeur d’une rivière @author Jean-Claude Lhote
 * Calcul d’un parallèle terrestre @author Jean-Claude Lhote
 * Calculer la hauteur d’un objet vu sous un angle donné @author Jean-Claude Lhote
 * Calculer la hauteur d’une falaise @author Jean-Claude Lhote
 * Calculer la hauteur d’une montagne @author Jean-Claude Lhote
 * Triangle rectangle inscrit dans un triangle rectangle @author Rémi Angot
 * Fusion des exercices @author Guillaume Valmont
 * Interactivité des exercices, aléatoirisation des figures et des points dans les exos @author Eric Elter
 * Référence 3G32-0
*/
export default function problemesTrigoLongueur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.besoinFormulaireCaseACocher = ['Afficher des questions intermédiaires et éventuellement un schéma']
  this.sup = true
  this.besoinFormulaire2Texte = [
    'Type d\'exercice',
    `Cet exercice regroupe les exercices 3G32, 3G32-1, 3G32-2, 3G32-3, 3G32-4 et 3G32-5
    Nombres séparés par des tirets :
    1 : Calculer la largeur d'une rivière
    2 : Calcul d'un parallèle terrestre
    3 : Calculer la hauteur d’un objet vu sous un angle donné
    4 : Calculer la hauteur d’une falaise
    5 : Calculer la hauteur d’une montagne
    6 : Triangle rectangle inscrit dans un triangle rectangle
    7 : Mélange`
  ]
  this.sup2 = 7
  this.nbQuestions = 2
  this.spacingCorr = 3
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const objet = [['arbre', 'un', '', 'situé'], ['immeuble', 'un', '', 'situé'], ['éolienne', 'une', 'te', 'située'], ['colline', 'une', 'te', 'située']]
    let distance; let beta; let alpha; let taille; let A; let B; let S; let C; let R; let objets = []; let p
    let O; let H; let M; let R2; let Axe; let normalV; let normalH; let P; let HP; let Sph; let OP; let PoleNord; let PoleSud
    let hauteur; let teta; let index
    // let M1, MInit, normalH1, R21, P1
    const lettresGrecques = [['α', '\\alpha'], ['β', '\\beta'], ['δ', '\\delta'], ['γ', '\\gamma'], ['ω', '\\omega'], ['ε', '\\epsilon'], ['θ', '\\theta'], ['λ', '\\lambda']]
    let listeTypeQuestions = []

    if (!this.sup2) { // Si aucune liste n'est saisie
      listeTypeQuestions = rangeMinMax(1, 6)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeTypeQuestions[0] = contraindreValeur(1, 7, this.sup2, 7)
      } else {
        listeTypeQuestions = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeTypeQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeTypeQuestions[i] = contraindreValeur(1, 7, parseInt(listeTypeQuestions[i]), 7) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeTypeQuestions, 7) > 0) listeTypeQuestions = rangeMinMax(1, 6) // Teste si l'utilisateur a choisi tout
    listeTypeQuestions = combinaisonListes(listeTypeQuestions, this.nbQuestions)

    let ii = 0 // Cet indice permet de gérer les numéros de champs interactifs car ces champs ne sont pas de nombre égal selon les listeTypeQuestions[i].
    for (let i = 0, texte, numA, ordA, numB, numC, numR, absC, numS, absS, AB, BA, texteCorr, reponse, j, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const choixAlpha = randint(0, 7)
      const alfa = context.isHtml ? lettresGrecques[choixAlpha][0] : lettresGrecques[choixAlpha][1]
      const alfaInteractif = lettresGrecques[choixAlpha][1]
      const choixBeta = randint(0, 7, [choixAlpha])
      const baita = context.isHtml ? lettresGrecques[choixBeta][0] : lettresGrecques[choixBeta][1]
      const baitaInteractif = lettresGrecques[choixBeta][1]
      const sensV = choice([-1, 1])
      const sensH = choice([-1, 1])
      switch (listeTypeQuestions[i]) {
        case 1:
          objets = []
          alpha = randint(25, 65)
          j = 0
          beta = alpha + randint(2, 5)
          distance = randint(7, 15) * 10
          taille = arrondi(Math.round(distance * (Math.tan(beta * Math.PI / 180) - Math.tan(alpha * Math.PI / 180))))
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          ordA = sensV * randint(5, 9)
          A = point(0, ordA, lettreDepuisChiffre(numA))
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          B = point(0, 0, lettreDepuisChiffre(numB))
          AB = lettreDepuisChiffre(numA) + lettreDepuisChiffre(numB)
          BA = lettreDepuisChiffre(numB) + lettreDepuisChiffre(numA)
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          absC = sensH * randint(5, 9)
          C = point(absC, 0, lettreDepuisChiffre(numC), sensH > 0 ? sensV > 0 ? 'below left' : 'above left' : sensV > 0 ? 'below right' : 'above right')
          numS = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          absS = randint(3, 7)
          S = point(absC + sensH * absS, 0, lettreDepuisChiffre(numS))
          p = polygoneAvecNom(A, B, S)
          R = polygoneAvecNom(point(absC, -1 * sensV), point(absC + sensH * absS, -1 * sensV), point(absC + sensH * absS, ordA + sensV), point(absC, ordA + sensV))
          R[0].color = 'blue'
          R[0].couleurDeRemplissage = 'blue'
          R[0].opaciteDeRemplissage = 0.5
          R[0].opacite = 0.5
          objets.push(p[1], p[0], R[0], segment(A, C), codageAngleDroit(A, B, C), labelPoint(C))
          objets.push(afficheMesureAngle(B, A, C, 'black', 1, `${alfa}`), afficheMesureAngle(B, A, S, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(distance)} m`, sensH * sensV < 0 ? B : A, sensH * sensV < 0 ? A : B, 'black', -0.5))

          texte = 'Un géomètre veut mesurer la largeur d\'une rivière, représentée en bleu dans le schéma ci-dessous.<br>'
          texte += `Pour cela, il remarque une souche notée $${lettreDepuisChiffre(numS)}$ sur la rive opposée.<br>`
          texte += `Il a placé un cône sur sa rive en face de la souche, son emplacement est noté $${lettreDepuisChiffre(numC)}$.<br>`
          texte += `Ensuite, il s'est éloigné de la berge en restant aligné avec la souche $${lettreDepuisChiffre(numS)}$ et le cône $${lettreDepuisChiffre(numC)}$ jusqu'à un endroit où il place un bâton noté $${lettreDepuisChiffre(numB)}$.<br>`
          texte += `Du bâton, il effectue un quart de tour et s'éloigne d'une distance de $${distance}$ m jusqu'à son appareil de mesure noté $${lettreDepuisChiffre(numA)}$.<br>`
          texte += `À l'aide de son appareil, il mesure l'angle $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numC)}}$ noté $${alfa}$  et l'angle $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}$ noté $${baita}$.`
          if (this.sup) {
            texte += `<br>${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$ en fonction de $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}$ et de $${alfa}$.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=$` })
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `${AB}\\times tan(${alfaInteractif})`,
                `${BA}\\times tan(${alfaInteractif})`,
                `${AB}tan(${alfaInteractif})`,
                `${BA}tan(${alfaInteractif})`,
                `tan(${alfaInteractif})\\times ${AB}`,
                `tan(${alfaInteractif})\\times ${BA}`,
                `tan(${alfaInteractif})${AB}`,
                `tan(${alfaInteractif})${BA}`],
              { formatInteractif: 'texte' })
              ii++
            }
            j++
            texte += `<br>${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$ en fonction de $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}$ et de $${baita}$.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=$` })
              setReponse(this, i + ii, [
                `${AB}\\times tan(${baitaInteractif})`,
                `${BA}\\times tan(${baitaInteractif})`,
                `${AB}tan(${baitaInteractif})`,
                `${BA}tan(${baitaInteractif})`,
                `tan(${baitaInteractif})\\times ${AB}`,
                `tan(${baitaInteractif})\\times ${BA}`,
                `tan(${baitaInteractif})${AB}`,
                `tan(${baitaInteractif})${BA}`],
              { formatInteractif: 'texte' })
              ii++
            }
            j++
          }
          texte += `<br>${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}$ en fonction de $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}$, de $${alfa}$ et de $${baita}$.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}=$` })
            setReponse(this, i + ii, [ // La liste n'est pas exhaustive et ne remplace, hélas, pas du calcul formel.
              `${AB}\\times(tan(${baitaInteractif})-tan(${alfaInteractif}))`,
              `${BA}\\times(tan(${baitaInteractif})-tan(${alfaInteractif}))`,
              `${AB}(tan(${baitaInteractif})-tan(${alfaInteractif}))`,
              `${BA}(tan(${baitaInteractif})-tan(${alfaInteractif}))`,
              `(tan(${baitaInteractif})-tan(${alfaInteractif}))\\times ${AB}`,
              `(tan(${baitaInteractif})-tan(${alfaInteractif}))\\times ${BA}`,
              `(tan(${baitaInteractif})-tan(${alfaInteractif}))${AB}`,
              `(tan(${baitaInteractif})-tan(${alfaInteractif}))${BA}`,
              `${AB}\\times tan(${baitaInteractif})-${AB}\\times tan(${alfaInteractif})`,
              `${BA}\\times tan(${baitaInteractif})-${BA}\\times tan(${alfaInteractif})`,
              `${AB}tan(${baitaInteractif})-${AB}tan(${alfaInteractif})`,
              `${BA}tan(${baitaInteractif})-${BA}tan(${alfaInteractif})`,
              `tan(${baitaInteractif})\\times ${AB}-tan(${alfaInteractif})\\times ${AB}`,
              `tan(${baitaInteractif})\\times ${BA}-tan(${alfaInteractif})\\times ${BA}`,
              `tan(${baitaInteractif})${AB}-tan(${alfaInteractif})${AB}`,
              `tan(${baitaInteractif})${BA}-tan(${alfaInteractif})${BA}`,
              `${AB}\\times tan(${baitaInteractif})-${BA}\\times tan(${alfaInteractif})`,
              `${BA}\\times tan(${baitaInteractif})-${AB}\\times tan(${alfaInteractif})`,
              `${AB}tan(${baitaInteractif})-${BA}tan(${alfaInteractif})`,
              `${BA}tan(${baitaInteractif})-${AB}tan(${alfaInteractif})`,
              `tan(${baitaInteractif})\\times ${AB}-tan(${alfaInteractif})\\times ${BA}`,
              `tan(${baitaInteractif})\\times ${BA}-tan(${alfaInteractif})\\times ${AB}`,
              `tan(${baitaInteractif})${AB}-tan(${alfaInteractif})${BA}`,
              `tan(${baitaInteractif})${BA}-tan(${alfaInteractif})${AB}`],
            { formatInteractif: 'texte' })
            ii++
          }
          j++
          texte += `<br>${numAlpha(j)}Calculer la largeur de la rivière au mètre près sachant que $${alfa}=${alpha}\\degree$ et $${baita}=${beta}\\degree$.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
            context.isAmc ? setReponse(this, i + ii, taille) : setReponse(this, i + ii, new Grandeur(taille, 'm'), { formatInteractif: 'longueur' })
            ii++
          }
          texte += '<br>(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)'
          texte += '<br>' + mathalea2d({ xmin: min(-sensH, absC + sensH * (absS + 1)), ymin: min(-sensV, ordA + sensV), xmax: max(-sensH, absC + sensH * (absS + 1)), ymax: max(-sensV, ordA + sensV), pixelsParCm: 20, scale: 0.5 }, objets) + '<br>' //  1O est le max de ordA+1 : ainsi le cadre a toujours proportionnellement la même hauteur, bien que la figure change de hauteur.
          j = 0
          texteCorr = mathalea2d({ xmin: min(-sensH, absC + sensH * (absS + 1)), ymin: min(-sensV, ordA + sensV), xmax: max(-sensH, absC + sensH * (absS + 1)), ymax: max(-sensV, ordA + sensV), pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          if (this.sup) {
            texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$ rectangle en $${lettreDepuisChiffre(numB)}$ on a : $\\tan(${alfa})=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}}{${AB}}$ d'où $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=${AB}\\times \\tan(${alfa})$.<br>`
            j++
            texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$ rectangle en $${lettreDepuisChiffre(numB)}$ on a : $\\tan(${baita})=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}}{${AB}}$ d'où $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=${AB}\\times \\tan(${baita})$.<br>`
            j++
          }
          texteCorr += `${numAlpha(j)}Comme $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=${AB}\\times \\tan(${baita})$ et $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=${AB}\\times \\tan(${alfa})$, alors $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}=${AB}\\times(\\tan(${baita})-\\tan(${alfa}))$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Donc $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}=${distance}${sp()} m\\times(\\tan(${beta}\\degree)-\\tan(${alpha}\\degree))\\approx ${taille}${sp()}m$.<br>`

          break
        case 2:
          objets = []
          alpha = randint(30, 60)
          O = point3d(0, 0, 0, false, 'O')
          // MInit = point3d(5, 0, 0, true, 'M') // M initial
          M = point3d(5, 0, 0, true, 'M') // M initial
          PoleNord = point3d(0, 0, 5, false, 'N')
          PoleSud = point3d(0, 0, -5, false, 'S')
          // R = vecteur3d(O, MInit)
          R = vecteur3d(O, M)
          Axe = arete3d(PoleSud, PoleNord)
          normalV = vecteur3d(0, 0, 1)
          // M1 = rotationV3d(MInit, normalV, context.anglePerspective) // M1 obtenu depuis M initial
          // M = rotationV3d(MInit, normalV, context.anglePerspective - 50)
          M = rotationV3d(M, normalV, context.anglePerspective)
          M.c2d.nom = 'M'
          // M1.c2d.nom = 'M1' // Rajout du nom puis rajouté plus bas dans tracePoint() et labelPoint()
          normalH = rotationV3d(R, normalV, 90)
          // normalH1 = rotationV3d(R, normalV, 90)
          P = rotationV3d(M, normalH, -alpha)
          // P1 = rotationV3d(M1, normalH1, alpha) // P1 obtenu depuis M1
          P.c2d.nom = 'P'
          // P1.c2d.nom = 'P1' // Rajout du nom puis rajouté plus bas dans tracePoint() et labelPoint()
          H = point3d(0, 0, P.z, false)
          R2 = vecteur3d(H, P) // Rayon obtenu depuis P
          // R21 = vecteur3d(H, P1) // Rayon obtenu depuis P
          H.c2d.nom = 'H'
          Sph = sphere3d(O, 5, 1, 3)
          HP = arete3d(H, P)
          OP = arete3d(O, P)
          objets.push(...Sph.c2d, Axe.c2d, HP.c2d, OP.c2d, codageAngleDroit(P.c2d, H.c2d, O.c2d), tracePoint(H.c2d, P.c2d, O.c2d, M.c2d), labelPoint(H.c2d, P.c2d, O.c2d, M.c2d))
          // objets.push(...Sph.c2d, Axe.c2d, HP.c2d, OP.c2d, codageAngleDroit(P.c2d, H.c2d, O.c2d), tracePoint(H.c2d, P.c2d, O.c2d, M.c2d, M1.c2d, P1.c2d), labelPoint(H.c2d, P.c2d, O.c2d, M.c2d, M1.c2d, P1.c2d))
          objets.push(demicercle3d(H, normalV, R2, 'caché', 'red', 0), demicercle3d(H, normalV, R2, 'visible', 'red', 0))
          // objets.push(demicercle3d(H, normalV, R21, 'caché', 'red', 0), demicercle3d(H, normalV, R21, 'visible', 'red', 0))
          objets.push(arete3d(O, M).c2d)
          objets.push(afficheMesureAngle(M.c2d, O.c2d, P.c2d, 'black', 1.5, `${alpha}`))
          texte = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texte += `Quelle est la longueur du $${alpha}$e parallèle Nord au kilomètre près ?`
          texteCorr = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texteCorr += `Considérons que le $${alpha}$e parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la Terre.<br>`
          texteCorr += 'Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>'
          texteCorr += 'Dans le triangle $OPH$ rectangle en $H$, $\\cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d\'où $HP=OP\\times \\cos(\\widehat{OPH})$.<br>'
          texteCorr += 'Le rayon de la terre étant approximativement de $6400$ km, nous pouvons calculer $HP$. '
          texteCorr += `$HP\\approx${texNombrec(6400)}${sp()}km\\times \\cos(${alpha}\\degree)\\approx ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}${sp()}km$<br>`
          reponse = Math.round(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180))
          texteCorr += `Calculons maintenant la longueur $L$ du $${alpha}$e parallèle : $L\\approx 2\\times \\pi\\times ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}${sp()}km\\approx ${texNombre(reponse)}${sp()}km$.<br>`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
            context.isAmc ? setReponse(this, i + ii, reponse) : setReponse(this, i + ii, new Grandeur(reponse, 'km'), { formatInteractif: 'longueur' })
          }
          break
        case 3:
          objets = []
          distance = randint(5, 300)
          hauteur = randint(150, 190) / 100
          beta = Math.atan(hauteur / distance)
          alpha = randint(10, 50)
          teta = alpha * Math.PI / 180 - beta
          taille = arrondi(hauteur + distance * Math.tan(teta), 1)
          if (taille < 20) index = 0
          else if (taille < 50) index = 1
          else if (taille < 100) index = 2
          else index = 3
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          A = point(0, 0, lettreDepuisChiffre(numA))
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          ordA = sensH * (randint(10, 14))
          B = pointAdistance(A, ordA, 0, lettreDepuisChiffre(numB))
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          absC = choice([2.5, 3, 3.5])
          C = pointAdistance(A, absC, 90, lettreDepuisChiffre(numC))
          numR = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC])
          R = pointAdistance(B, absC, 90, lettreDepuisChiffre(numR))
          numS = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC, numS])
          absS = randint(7, 11)
          S = pointAdistance(B, absS, 90, lettreDepuisChiffre(numS))
          p = polygoneAvecNom(A, B, R, S, C)
          objets.push(p[1], p[0], segment(C, B), segment(C, R), codageAngleDroit(C, A, B), codageAngleDroit(A, B, R), codageAngleDroit(C, R, S))
          objets.push(afficheMesureAngle(B, C, S, 'black', 3, `${alfa}`), afficheMesureAngle(A, B, C, 'black', 2, `${baita}`), afficheMesureAngle(B, C, R, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(hauteur)} m`, sensH < 0 ? A : C, sensH < 0 ? C : A, 'black', -0.5), texteSurSegment(`${stringNombre(distance)} m`, C, R))
          texte = `Un observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`
          texte += `Cet${objet[index][2]} ${objet[index][0]} est ${objet[index][3]} à une distance de $${texNombre(distance)}$ m de l'observateur.<br>`
          texte += `L'œil de l'observateur est situé à $${texNombre(hauteur)}$ m du sol.`
          j = 0
          if (this.sup) {
            texte += `<br>$${lettreDepuisChiffre(numC)}$ représente l'œil de l'observateur, $[${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

            texte += 'Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.<br>'
            texte += mathalea2d({ xmin: min(-sensH, ordA + sensH), ymin: -1, xmax: max(-sensH, ordA + sensH), ymax: absS + 1, pixelsParCm: 20, scale: 0.5 }, objets)
            texte += `<br>${numAlpha(j)}Calculer d'abord la mesure de l'angle $${baita}$, arrondie au centième près.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texteApres: '$\\degree$' })
              setReponse(this, i + ii, arrondi(beta))
              ii++
            }
            j++
            texte += `<br>${numAlpha(j)}En déduire la mesure de l'angle $\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}}$, arrondie au centième près.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texteApres: '$\\degree$' })
              setReponse(this, i + ii, arrondi(alpha - beta))
              ii++
            }
            j++
            texte += `<br>${numAlpha(j)}Calculer alors la longueur $${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}$, arrondie au cm près.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline longueur')
              context.isAmc ? setReponse(this, i + ii, arrondi(taille - hauteur)) : setReponse(this, i + ii, new Grandeur(arrondi(taille - hauteur), 'm'), { formatInteractif: 'longueur' })
              ii++
            }
            j++
          }
          texte += this.sup ? `<br>${numAlpha(j)}` : '<br>'
          texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]}, arrondie au mètre près.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
            context.isAmc ? setReponse(this, i + ii, arrondi(taille, 0)) : setReponse(this, i + ii, new Grandeur(arrondi(taille, 0), 'm'), { formatInteractif: 'longueur' })
            ii++
          }
          j = 0
          texteCorr = mathalea2d({ xmin: min(-sensH, ordA + sensH), ymin: -1, xmax: max(-sensH, ordA + sensH), ymax: absS + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          texteCorr += this.sup ? `<br>${numAlpha(j)}` : '<br>'
          texteCorr += `Dans le triangle $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numB)}$ rectangle en $${lettreDepuisChiffre(numR)}$, $\\tan(${baita})=\\dfrac{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numB)}}{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}}$.<br>D'où $${baita}=\\arctan(\\dfrac{${texNombre(hauteur)}}{${texNombre(distance)}})\\approx ${arrondiVirgule(beta)}\\degree$.<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}}=${alfa}-${baita}\\approx ${arrondiVirgule(alpha - beta)}\\degree$<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}=${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}\\times \\tan(\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}})\\approx ${distance}${sp()}m\\times \\tan(${arrondiVirgule(alpha - beta)}\\degree)\\approx ${texNombrec(taille - hauteur)}${sp()}m$<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numR)}+${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}=${texNombre(hauteur)}${sp()}m+${texNombrec(taille - hauteur)}${sp()}m=${texNombre(taille)}${sp()}m\\approx${texNombre(Math.round(taille))}${sp()}m$<br>`
          texteCorr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${texNombre(Math.round(taille))}$ m de hauteur.`
          break
        case 4:
          objets = []
          alpha = randint(25, 45)
          beta = Math.tan(alpha * Math.PI / 180) * Math.tan((alpha + 1) * Math.PI / 180) / (Math.tan((alpha + 1) * Math.PI / 180) - Math.tan(alpha * Math.PI / 180))
          distance = randint(5, 10)
          taille = beta * distance
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25])
          B = point(0, 0, lettreDepuisChiffre(numB))
          numS = randint(1, 26, [4, 5, 15, 23, 24, 25, numB])
          absS = sensH * (randint(4, 6))
          S = pointAdistance(B, absS, 0, lettreDepuisChiffre(numS))
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numS])
          absC = sensH * (randint(10, 14))
          C = pointAdistance(B, absC, 0, lettreDepuisChiffre(numC))
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numS, numC])
          ordA = (randint(10, 14))
          A = pointAdistance(C, ordA, 90, lettreDepuisChiffre(numA))
          p = polygoneAvecNom(B, S, C, A)
          objets.push(p[1], p[0], segment(A, S), codageAngleDroit(B, C, A))
          objets.push(afficheMesureAngle(C, B, A, 'black', 2, `${alfa}`), afficheMesureAngle(C, S, A, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(distance)} m`, B, S, 'black', -sensH * 0.5), texteParPosition('h', milieu(C, A).x + sensH * 0.5, milieu(C, A).y, 0, 'black', 2, 'middle', true))
          j = 0
          texte = 'Un observateur sur un bateau s\'approche d\'une falaise dont il veut mesurer la hauteur'
          texte += this.sup ? ' $h$.<br>' : '.<br>'
          texte += `Il jette l'ancre puis constate qu'il voit la falaise sous un angle de $${alpha}\\degree$.<br>`
          texte += `Il se rapproche ensuite de la falaise jusqu'à la voir sous un angle de $${alpha + 5}\\degree$.<br>`

          texte += `Il constate qu'entre ses deux mesures, il s'est rapproché de la falaise de $${distance}$ m.<br>`
          if (this.sup) {
            texte += '(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)<br>'
            texte += mathalea2d({ xmin: min(-sensH, absC + sensH), ymin: -1, xmax: max(-sensH, absC + sensH), ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }, objets)
            texte += `<br>${numAlpha(j)}Exprimer $h$ en fonction de $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}$ et $${baita}$ puis en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$ et $${alfa}$.`
            if (this.interactif) {
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}h=$` })
              AB = lettreDepuisChiffre(numS) + lettreDepuisChiffre(numC)
              BA = lettreDepuisChiffre(numC) + lettreDepuisChiffre(numS)
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `${AB}\\times tan(${baitaInteractif})`,
                `${BA}\\times tan(${baitaInteractif})`,
                `${AB}tan(${baitaInteractif})`,
                `${BA}tan(${baitaInteractif})`,
                `tan(${baitaInteractif})\\times ${AB}`,
                `tan(${baitaInteractif})\\times ${BA}`,
                `tan(${baitaInteractif})${AB}`,
                `tan(${baitaInteractif})${BA}`],
              { formatInteractif: 'texte' })
              ii++
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}h=$` })
              AB = lettreDepuisChiffre(numB) + lettreDepuisChiffre(numC)
              BA = lettreDepuisChiffre(numC) + lettreDepuisChiffre(numB)
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `${AB}\\times tan(${alfaInteractif})`,
                `${BA}\\times tan(${alfaInteractif})`,
                `${AB}tan(${alfaInteractif})`,
                `${BA}tan(${alfaInteractif})`,
                `tan(${alfaInteractif})\\times ${AB}`,
                `tan(${alfaInteractif})\\times ${BA}`,
                `tan(${alfaInteractif})${AB}`,
                `tan(${alfaInteractif})${BA}`],
              { formatInteractif: 'texte' })
              ii++
            }
            j++
            texte += `<br>${numAlpha(j)}En déduire $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$, $${alfa}$ et $${baita}$.`
            if (this.interactif) {
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}=$` })
              AB = lettreDepuisChiffre(numS) + lettreDepuisChiffre(numB)
              BA = lettreDepuisChiffre(numB) + lettreDepuisChiffre(numS)
              setReponse(this, i + ii, [ // Aucune exhaustivité hélas
              `\\frac{${AB}\\times tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `\\frac{${BA}\\times tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${AB}\\times \\frac{tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${BA}\\times \\frac{tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})\\times \\frac{${AB}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})\\times \\frac{${BA}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `\\frac{${AB}tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `\\frac{${BA}tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${AB}\\frac{tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${BA}\\frac{tan(${alfaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})\\frac{${AB}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})\\frac{${BA}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`],
              { formatInteractif: 'texte' })
              ii++
            }
            j++
            texte += `<br>${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$, $${alfa}$ et $${baita}$.`
            if (this.interactif) {
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}=$` })
              setReponse(this, i + ii, [ // Aucune exhaustivité hélas
              `\\frac{${AB}\\times tan(${alfaInteractif})\\times tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `\\frac{${BA}\\times tan(${alfaInteractif})\\times tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${AB}\\times \\frac{tan(${alfaInteractif})\\times tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${BA}\\times \\frac{tan(${alfaInteractif})\\times tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})\\times tan(${baitaInteractif})\\times \\frac{${AB}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})\\times tan(${baitaInteractif})\\times \\frac{${BA}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `\\frac{${AB}tan(${alfaInteractif})tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `\\frac{${BA}tan(${alfaInteractif})tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${AB}\\frac{tan(${alfaInteractif})tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `${BA}\\frac{tan(${alfaInteractif})tan(${baitaInteractif})}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})tan(${baitaInteractif})\\frac{${AB}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`,
              `tan(${alfaInteractif})tan(${baitaInteractif})\\frac{${BA}}{tan(${baitaInteractif})-tan(${alfaInteractif})}`],
              { formatInteractif: 'texte' })
              ii++
            }
            j++
          }
          texte += this.sup ? `<br>${numAlpha(j)}` : '<br>'
          texte += 'Quelle est la hauteur de la falaise ?'
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
            context.isAmc ? setReponse(this, i + ii, arrondi(taille, 0)) : setReponse(this, i + ii, new Grandeur(arrondi(taille, 0), 'm'), { formatInteractif: 'longueur' })
            ii++
          }
          j++
          texte += this.sup ? `<br>${numAlpha(j)}` : '<br>'
          texte += 'À quelle distance du pied de la falaise se trouve l\'observateur lors du deuxième relevé ?'
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
            context.isAmc ? setReponse(this, i + ii, arrondi(taille / Math.tan((alpha + 5) * Math.PI / 180), 0)) : setReponse(this, i + ii, new Grandeur(arrondi(taille / Math.tan((alpha + 5) * Math.PI / 180), 0), 'm'), { formatInteractif: 'longueur' })
            ii++
          }
          texte += '<br>Arrondir les résultats au mètre près. (On supposera le point d\'observation au niveau de l\'eau)'
          texteCorr = mathalea2d({ xmin: min(-sensH, absC + sensH), ymin: -1, xmax: max(-sensH, absC + sensH), ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          j = 0
          texteCorr += this.sup ? `<br>${numAlpha(j)}` : '<br>'
          texteCorr += `Dans le triangle $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}$ rectangle en $${lettreDepuisChiffre(numC)}$, $\\tan(${baita})=\\dfrac{h}{${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}}$.<br>D'où $h=${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${baita})$.<br>`
          texteCorr += `Dans le triangle $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}$ rectangle en $${lettreDepuisChiffre(numC)}$, $\\tan(${alfa})=\\dfrac{h}{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}}$.<br>D'où $h=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times \\tan(${alfa})$.<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `Or $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}+${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}$ donc $h=(${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}+${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)})\\times \\tan(${alfa})$.<br>`
          texteCorr += `On en déduit que $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${baita})=(${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}+${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)})\\times \\tan(${alfa})$ soit $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${baita})=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}\\times \\tan(${alfa})+${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${alfa})$.<br>`
          texteCorr += `D'où $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}\\times \\tan(${alfa})=${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${baita})-${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${alfa})=${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times(\\tan(${baita})-\\tan(${alfa}))$.<br>`
          texteCorr += `Et $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}\\times \\tan(${alfa})}{\\tan(${baita})-\\tan(${alfa})}$.<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `Ainsi $h=${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}\\times \\tan(${baita})=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}\\times \\tan(${alfa})\\times \\tan(${baita})}{\\tan(${baita})-\\tan(${alfa})}$.<br>`
          texteCorr += this.sup ? '' : 'Application numérique : <br>'
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$h=\\dfrac{${distance}${sp()}m\\times \\tan(${alpha}\\degree)\\times \\tan(${alpha + 5}\\degree)}{\\tan(${alpha + 5}\\degree)-\\tan(${alpha}\\degree)}\\approx ${Math.round(taille)}${sp()}m$.<br>`
          texteCorr += this.sup ? `La hauteur de la falaise est de $${Math.round(taille)}${sp()}m$.<br>` : ''
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}=\\dfrac{${distance}${sp()}m\\times \\tan(${alpha}\\degree)}{\\tan(${alpha + 5}\\degree)-\\tan(${alpha}\\degree)}\\approx ${texNombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}${sp()}m$.<br>`
          texteCorr += this.sup ? `L'observateur se trouve à $${texNombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de la falaise lors du deuxième relevé.<br>` : ''
          texteCorr += this.sup ? '' : `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${texNombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de celle-ci lors du deuxième relevé.<br>`
          break
        case 5:
          objets = []
          alpha = randint(25, 45)
          j = 0
          beta = alpha + randint(1, 3)
          taille = randint(20, 50) * 100
          distance = Math.round(taille * Math.sin((beta - alpha) * Math.PI / 180) / Math.sin(alpha * Math.PI / 180) / Math.sin(beta * Math.PI / 180))
          taille = Math.round(distance * Math.sin(alpha * Math.PI / 180) * Math.sin(beta * Math.PI / 180) / Math.sin((beta - alpha) * Math.PI / 180))
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25])
          B = point(0, 0, lettreDepuisChiffre(numB))
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numB])
          absC = sensH * randint(4, 6)
          C = pointAdistance(B, absC, 0, lettreDepuisChiffre(numC))
          numS = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numC])
          absS = sensH * randint(10, 14)
          S = pointAdistance(B, absS, 0, lettreDepuisChiffre(numS))
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numC, numS])
          ordA = randint(5, 9)
          A = pointAdistance(S, ordA, 90, lettreDepuisChiffre(numA))
          H = projectionOrtho(C, droite(B, A), lettreDepuisChiffre(randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numC, numS, numA])), sensH > 0 ? 'above left' : 'above right')
          p = polygoneAvecNom(B, C, S, A)
          objets.push(p[1], p[0], segment(H, C), segment(A, C), codageAngleDroit(B, S, A), codageAngleDroit(C, H, A))
          objets.push(afficheMesureAngle(S, B, A, 'black', 2, `${alfa}`), afficheMesureAngle(S, C, A, 'black', 2, `${baita}`))

          objets.push(texteSurSegment(`${stringNombre(distance)} m`, B, C, 'black', -sensH * 0.5), labelPoint(H), texteParPosition('h', milieu(S, A).x + sensH * 0.5, milieu(S, A).y, 0, 'black', 2, 'middle', true))

          texte = 'Un voyageur approche d\'une montagne. Il aimerait en calculer la hauteur.<br>'
          texte += `Pour cela, il utilise un théodolite en un point $B$ qui lui permet de mesurer l'angle $${alfa}$ vertical formé par le sommet $A$ de la montagne, le point $B$ et la base de la montagne $S$.<br>`
          texte += `Il parcourt ensuite $${distance}$ m en direction de la montagne et effectue une nouvelle mesure de l'angle $${baita}$ en un point $C$.<br>`
          texte += '(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)<br>'
          texte += `  On donne : $${alfa}=${alpha}\\degree$, $${baita}=${beta}\\degree$ et $BC=${distance}$ m.<br>`
          texte += mathalea2d({ xmin: min(-sensH, absS + sensH), ymin: -1, xmax: max(-sensH, absS + sensH), ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }, objets)

          if (this.sup) {
            texte += `<br>${numAlpha(j)}Exprimer la mesure de l'angle $\\widehat{CAS}$ en fonction de $${baita}$.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}\\widehat{CAS}=$` })
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `90-${baitaInteractif}`],
              { formatInteractif: 'texte' })
              ii++
            }
            texte += `<br>${numAlpha(j + 1)}Exprimer la mesure de l'angle $\\widehat{BAS}$ en fonction de $${alfa}$.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}\\widehat{BAS}=$` })
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `90-${alfaInteractif}`],
              { formatInteractif: 'texte' })
              ii++
            }
            j += 2
          }
          texte += `<br>${numAlpha(j)}Montrer que $\\widehat{CAH}=${baita}-${alfa}$.`
          j++
          if (this.sup) {
            texte += `<br>${numAlpha(j)}Dans le triangle $CHA$, exprimer $CA$ en fonction de $CH$.`
          } else {
            texte += `<br>${numAlpha(j)}Exprimer $CA$ en fonction de $CH$.`
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}CA=$` })
            setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
            `\\frac{CH}{sin(${baitaInteractif}-${alfaInteractif})}`,
            `\\frac{HC}{sin(${baitaInteractif}-${alfaInteractif})}`],
            { formatInteractif: 'texte' })
            ii++
          }
          j++
          if (this.sup) {
            texte += `<br>${numAlpha(j)}Dans le triangle $BCH$, exprimer $CH$ en fonction de $BC$.`
          } else {
            texte += `<br>${numAlpha(j)}Exprimer $CH$ en fonction de $BC$.`
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}CH=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `BC\\times sin(${alfaInteractif})`,
            `sin(${alfaInteractif})\\times BC`,
            `CB\\times sin(${alfaInteractif})`,
            `sin(${alfaInteractif})\\times CB`],
            { formatInteractif: 'texte' })
            ii++
          }
          j++
          if (this.sup) {
            texte += `<br>${numAlpha(j)}En déduire $h$ en fonction de $CA$ puis en fonction de $CH$ enfin en fonction de $BC$.`
          } else {
            texte += `<br>${numAlpha(j)}En déduire $h$ en fonction de $BC$.`
          }
          if (this.interactif) {
            texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}h=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `AC\\times sin(${baitaInteractif})`,
            `sin(${baitaInteractif})\\times AC`,
            `CA\\times sin(${baitaInteractif})`,
            `sin(${baitaInteractif})\\times CA`],
            { formatInteractif: 'texte' })
            ii++
            texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}h=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `\\frac{CH\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{HC\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${baitaInteractif}\\times CH sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${baitaInteractif}\\times HC sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`],
            { formatInteractif: 'texte' })
            ii++
            texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline grecTrigo', { texte: `$${sp(20)}h=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `\\frac{BC\\times sin(${alfaInteractif})\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${alfaInteractif})\\times BC\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{CB\\times sin(${alfaInteractif})\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${alfaInteractif})\\times CB\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`],
            { formatInteractif: 'texte' })
            ii++
          }
          j++
          texte += `<br>${numAlpha(j)}Quelle est la hauteur de la montagne ? (arrondir au mètre près)`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
            context.isAmc ? setReponse(this, i + ii, arrondi(taille, 0)) : setReponse(this, i + ii, new Grandeur(arrondi(taille, 0), 'm'), { formatInteractif: 'longueur' })
            ii++
          }
          texte += '<br>On supposera le point d\'observation au niveau du sol.'
          j = 0
          texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParHm: 20, scale: 0.5 }, objets) + '<br>'
          if (this.sup) {
            texteCorr += `${numAlpha(j)}Dans le triangle $CSA$ rectangle en $S$, les angles aigus sont complémentaires donc $\\widehat{CAS}=90-${baita}$.<br>`
            texteCorr += `${numAlpha(j + 1)}Dans le triangle $BSA$ rectangle en $S$, pour la même raison $\\widehat{BAS}=90-${alfa}$.<br>`
            j += 2
          }
          texteCorr += `${numAlpha(j)}On sait que $\\widehat{CAS}=90-${baita}$ et $\\widehat{BAS}=90-${alfa}$.<br>Donc $\\widehat{CAH}=\\widehat{BAS}-\\widehat{CAS}=90-${alfa}-(90-${baita})=\\cancel{90}-${alfa}-\\cancel{90}+${baita}=${baita}-${alfa}$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Dans le triangle $CHA$ rectangle en $H$, $\\sin(\\widehat{CAH})=\\dfrac{CH}{CA}$ d'où $CA=\\dfrac{CH}{\\sin(\\widehat{CAH})}=\\dfrac{CH}{\\sin(${baita}-${alfa})}$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Dans le triangle $BCH$ rectangle en $H$, $\\sin(\\widehat{CBH})=\\dfrac{CH}{BC}$ d'où $CH=BC\\times \\sin(\\widehat{CBH})=BC\\times \\sin(${alfa})$.<br>`
          j++

          texteCorr += `${numAlpha(j)}Dans le triangle $CSA$ rectangle en $S$, $h=CA\\times \\sin(${baita})=\\dfrac{CH}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})=\\dfrac{BC\\times \\sin(${alfa})}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})$<br>`

          j++
          texteCorr += `${numAlpha(j)}Application numérique : $h=\\dfrac{${distance}${sp()}m\\times \\sin(${alpha}\\degree)}{\\sin(${beta}\\degree-${alpha}\\degree)}\\times \\sin(${beta}\\degree)$`
          texteCorr += `$=\\dfrac{${distance}${sp()}m\\times \\sin(${alpha}\\degree)\\times \\sin(${beta}\\degree)}{\\sin(${beta - alpha}\\degree)}\\approx ${texNombre(Math.round(taille))}${sp()}m$.<br>`
          break
        case 6:
          {
            let objetsEnonce = []; let paramsEnonce = {}
            const AD = randint(5, 9)
            const AE = randint(AD + 1, AD + 4)
            const AC = randint(3, AD - 1)
            const A = point(0, 0, 'A', 'below left')
            const C = point(AC, 0, 'C', 'below')
            const D = point(AD, 0, 'D', 'below right')
            const dDE = droiteVerticaleParPoint(D)
            const cAE = cercle(A, AE)
            const E = pointIntersectionLC(dDE, cAE, 'E')
            E.positionLabel = 'right'
            const p = polygone(A, D, E)
            const dAE = droite(A, E)
            const B = projectionOrtho(C, dAE, 'B', 'above left')
            const codage1 = codageAngleDroit(A, B, C)
            const codage2 = codageAngleDroit(A, D, E)
            const labels = labelPoint(A, B, C, D, E)
            const nomDesSommets = creerNomDePolygone(5)
            A.nom = nomDesSommets[0]
            B.nom = nomDesSommets[1]
            C.nom = nomDesSommets[2]
            D.nom = nomDesSommets[3]
            E.nom = nomDesSommets[4]
            const mirroir = choice([true, false])
            if (mirroir) {
              B.x *= -1
              C.x *= -1
              D.x *= -1
              E.x *= -1
              A.positionLabel = 'below'
              B.positionLabel = 'above'
              C.positionLabel = 'below'
              D.positionLabel = 'below'
              E.positionLabel = 'above'
            }
            const sBC = segment(B, C)

            objetsEnonce = [p, sBC, codage1, codage2, labels]
            paramsEnonce = { xmin: -10, ymin: -1, xmax: 10, ymax: E.y + 1.5, pixelsParCm: 20, scale: 1, mainlevee: false }
            texte = `$${A.nom + E.nom} = ${AE}~\\text{cm}$, $${A.nom + D.nom} = ${AD}~\\text{cm}$ et $${A.nom + C.nom} = ${AC}~\\text{cm}$.`
            texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
            texte += `<br>Calculer la longueur $${A.nom + B.nom}$ et donner une valeur approchée au millimètre près.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline longueur')
              context.isAmc ? setReponse(this, i + ii, arrondi(longueur(A, B), 1)) : setReponse(this, i + ii, new Grandeur(arrondi(longueur(A, B), 1), 'cm'), { formatInteractif: 'longueur' })
              ii++
            }
            texteCorr = `Dans le triangle $${A.nom + D.nom + E.nom}$ rectangle en $${D.nom}$ : `
            texteCorr += `<br>$\\cos(\\widehat{${D.nom + A.nom + E.nom}})=\\dfrac{${A.nom + D.nom}}{${A.nom + E.nom}}\\quad$ soit $\\quad\\cos(\\widehat{${D.nom + A.nom + E.nom}})=\\dfrac{${AD}}{${AE}}$,`
            texteCorr += `<br> d'où $\\widehat{${D.nom + A.nom + E.nom}}=\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\approx${texNombre(arrondi(angle(D, A, E), 1))}\\degree$.`

            texteCorr += `<br><br>Dans le triangle $${A.nom + B.nom + C.nom}$ rectangle en $${B.nom}$ : `
            texteCorr += `<br>$\\cos(\\widehat{${B.nom + A.nom + C.nom}})=\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}\\quad$ soit $\\quad\\cos(${texNombre(arrondi(angle(D, A, E), 1))}\\degree)\\approx\\dfrac{${A.nom + B.nom}}{${AC}}$,`
            texteCorr += `<br> d'où $${A.nom + B.nom} \\approx ${AC}${sp()}cm\\times \\cos(${texNombre(arrondi(angle(D, A, E), 1))}\\degree)\\approx${texNombre(arrondi(longueur(A, B), 1))}${sp()}cm$.`

            texteCorr += `<br><br>On pouvait aussi écrire : $${A.nom + B.nom} = ${AC}\\times \\cos\\left(\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\right)=${AC}\\times \\dfrac{${AD}}{${AE}}=${texFractionReduite(AC * AD, AE)}$.`
          }
          break
      }
      if (this.questionJamaisPosee(i, texte, distance, alfa, baita, beta, alpha, taille, A, B, S, C, R, p, O, H, M, R2, Axe, normalV, normalH, P, HP, Sph, OP, PoleNord, PoleSud, hauteur, teta, index)) {
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

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
