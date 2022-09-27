import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, numAlpha, stringNombre, combinaisonListes, texNombre, arrondi, texFractionReduite, creerNomDePolygone, choice, sp, lettreDepuisChiffre, rangeMinMax, contraindreValeur, compteOccurences, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { texteSurSegment, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, tracePoint, labelPoint, pointAdistance, projectionOrtho, droite, longueur, angle, droiteVerticaleParPoint, cercle, pointIntersectionLC, polygone } from '../../modules/2d.js'
import { arete3d, CodageAngleDroit3D, demicercle3d, point3d, rotationV3d, sphere3d, vecteur3d } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
import { min, max } from 'mathjs'
export const titre = 'Problèmes nécessitant un calcul de longueur à l\'aide de la trigonométrie'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '05/03/2022'

/**
 * Calculer la largeur d\'une rivière @author Jean-Claude Lhote
 * Calcul d\'un parallèle terrestre @author Jean-Claude Lhote
 * Calculer la hauteur d\'un objet vu sous un angle donné @author Jean-Claude Lhote
 * Calculer la hauteur d\'une falaise @author Jean-Claude Lhote
 * Calculer la hauteur d\'une montagne @author Jean-Claude Lhote
 * Triangle rectangle inscrit dans un triangle rectangle @author Rémi Angot
 * Fusion des exercices @author Guillaume Valmont
 * Interactivité des exercices, aléatoirisation des figures et des points dans les exos, AMC-isation de tous les exos @author Eric Elter
 * Référence 3G32-0
*/
export const uuid = '2045e'
export const ref = '3G32-0'
export default function ProblemesTrigoLongueur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.besoinFormulaireCaseACocher = ['Afficher des questions intermédiaires et éventuellement un schéma']
  this.sup = true
  this.besoinFormulaire2Texte = [
    'Type d\'exercice',
    `Cet exercice regroupe les exercices 3G32 et 3G32-X (X : 1 à 5)
    Nombres séparés par des tirets :
    1 : Calculer la largeur d'une rivière
    2 : Calcul d'un parallèle terrestre
    3 : Calculer la hauteur d'un objet vu sous un angle donné
    4 : Calculer la hauteur d'une falaise
    5 : Calculer la hauteur d'une montagne
    6 : Calculer une longueur dans des triangles rectangles imbriqués
    7 : Mélange`
  ]
  this.sup2 = 7
  this.nbQuestions = 2
  this.spacingCorr = 3
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeDeNomsDePolygones
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
    let iiAMC // Cet indice permet de gérer les numéros de champs AMC car ces champs ne sont pas de nombre égal selon les listeTypeQuestions[i].
    for (let i = 0, texte, numA, ordA, numB, numC, numR, absC, numS, absS, numH, AB, BA, propositionsAMC, enonceAMC, enonceInit, texteCorr, reponse, j, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      propositionsAMC = []
      iiAMC = 0
      if (i % 3 === 0) listeDeNomsDePolygones = ['QD']
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
          R[0].color = colorToLatexOrHTML('blue')
          R[0].couleurDeRemplissage = colorToLatexOrHTML('blue')
          R[0].opaciteDeRemplissage = 0.5
          R[0].opacite = 0.5
          objets.push(p[1], p[0], R[0], segment(A, C), codageAngleDroit(A, B, C), labelPoint(C))
          objets.push(afficheMesureAngle(B, A, C, 'black', 1, `${alfa}`), afficheMesureAngle(B, A, S, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(distance)} m`, sensH * sensV < 0 ? B : A, sensH * sensV < 0 ? A : B, 'black', -0.5))

          texte = 'Un géomètre veut mesurer la largeur d\'une rivière, représentée par le rectangle, dans le schéma ci-dessous.<br>'
          texte += `Pour cela, il remarque une souche notée $${lettreDepuisChiffre(numS)}$ sur la rive opposée.<br>`
          texte += `Il a placé un cône sur sa rive en face de la souche, son emplacement est noté $${lettreDepuisChiffre(numC)}$.<br>`
          texte += `Ensuite, il s'est éloigné de la berge en restant aligné avec la souche $${lettreDepuisChiffre(numS)}$ et le cône $${lettreDepuisChiffre(numC)}$ jusqu'à un endroit où il place un bâton noté $${lettreDepuisChiffre(numB)}$.<br>`
          texte += `Du bâton, il effectue un quart de tour et s'éloigne d'une distance de $${distance}$ m jusqu'à son appareil de mesure noté $${lettreDepuisChiffre(numA)}$.<br>`
          texte += `À l'aide de son appareil, il mesure l'angle $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numC)}}$ noté $${alfa}$  et l'angle $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}$ noté $${baita}$.`
          texte += '<br>(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)'
          texte += '<br>' + mathalea2d({ xmin: min(-sensH, absC + sensH * (absS + 1)), ymin: min(-sensV, ordA + sensV), xmax: max(-sensH, absC + sensH * (absS + 1)), ymax: max(-sensV, ordA + sensV), pixelsParCm: 20, scale: 0.5 }, objets) //  1O est le max de ordA+1 : ainsi le cadre a toujours proportionnellement la même hauteur, bien que la figure change de hauteur.
          enonceInit = texte
          if (this.sup) {
            enonceAMC = `<br>${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$ en fonction de $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}$ et de $${alfa}$.`
            texte += enonceAMC
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=$` })
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
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                [
                  {
                    texte: '',
                    statut: 2,
                    enonce: enonceInit + enonceAMC,
                    sanslignes: true
                  }
                ]
              }
              iiAMC++
            }

            j++
            enonceAMC = `${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$ en fonction de $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}$ et de $${baita}$.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=$` })
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
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 2,
                      enonce: enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            j++
          }
          enonceAMC = `${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}$ en fonction de $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}$, de $${alfa}$ et de $${baita}$.`
          texte += '<br>' + enonceAMC
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}=$` })
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
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: this.sup ? 2 : 5,
                    enonce: this.sup ? enonceAMC : enonceInit + '<br>' + enonceAMC,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
          }
          j++
          enonceAMC = `${numAlpha(j)}Calculer la largeur de la rivière au mètre près sachant que $${alfa}=${alpha}\\degree$ et $${baita}=${beta}\\degree$.`
          texte += '<br>' + enonceAMC
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]', { texte: `$${sp(25)}$` })
            setReponse(this, i + ii, new Grandeur(taille, 'm'), { formatInteractif: 'unites' })
            ii++
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceAMC,
                  valeur: [taille],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(taille),
                    decimals: 0,
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          j = 0
          texteCorr = mathalea2d({ xmin: min(-sensH, absC + sensH * (absS + 1)), ymin: min(-sensV, ordA + sensV), xmax: max(-sensH, absC + sensH * (absS + 1)), ymax: max(-sensV, ordA + sensV), pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$ rectangle en $${lettreDepuisChiffre(numB)}$ on a : $\\tan(${alfa})=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}}{${AB}}$ d'où $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=${AB}\\times \\tan(${alfa})$.<br>`
          j++
          if (this.sup) {
            texteCorr += `${numAlpha(j)}`
            j++
          }
          texteCorr += `Dans le triangle $${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$ rectangle en $${lettreDepuisChiffre(numB)}$ on a : $\\tan(${baita})=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}}{${AB}}$ d'où $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=${AB}\\times \\tan(${baita})$.<br>`
          if (this.sup) {
            texteCorr += `${numAlpha(j)}`
            j++
          }
          texteCorr += `Comme $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=${AB}\\times \\tan(${baita})$ et $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=${AB}\\times \\tan(${alfa})$, alors $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}=${AB}\\times(\\tan(${baita})-\\tan(${alfa}))$.<br>`
          texteCorr += `${numAlpha(j)}Donc $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}=${distance}${sp()} m\\times(\\tan(${beta}\\degree)-\\tan(${alpha}\\degree))\\approx ${taille}${sp()}\\text{m}$.<br>`

          break
        case 2:
          context.anglePerspective = 20
          objets = []
          alpha = randint(30, 60)
          O = point3d(0, 0, 0, false, 'O')
          M = point3d(5, 0, 0, true, 'M')
          PoleNord = point3d(0, 0, 5, false, 'N')
          PoleSud = point3d(0, 0, -5, false, 'S')
          R = vecteur3d(O, M)
          Axe = arete3d(PoleSud, PoleNord)
          normalV = vecteur3d(0, 0, 1)
          M = rotationV3d(M, normalV, context.anglePerspective)
          M.c2d.nom = 'M'
          M.c2d.positionLabel = 'below'
          normalH = rotationV3d(R, normalV, 90)
          P = rotationV3d(M, normalH, -alpha)
          P.c2d.nom = 'P'
          P.c2d.positionLabel = 'above right'
          H = point3d(0, 0, P.z, false)
          R2 = rotationV3d(vecteur3d(H, P), normalV, context.anglePerspective) // Rayon obtenu depuis P
          H.c2d.nom = 'H'
          H.c2d.positionLabel = 'above right'
          Sph = sphere3d(O, 5, 2, 3)
          HP = arete3d(H, P)
          OP = arete3d(O, P)
          objets.push(...Sph.c2d, Axe.c2d, HP.c2d, OP.c2d, new CodageAngleDroit3D(P, H, O), tracePoint(H.c2d, P.c2d, O.c2d, M.c2d), labelPoint(H.c2d, P.c2d, O.c2d, M.c2d))
          objets.push(demicercle3d(H, normalV, R2, 'caché', 'red', 0), demicercle3d(H, normalV, R2, 'visible', 'red', 0))
          objets.push(arete3d(O, M).c2d)
          objets.push(afficheMesureAngle(M.c2d, O.c2d, P.c2d, 'black', 1.5, `${alpha}`))
          texte = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texte += `Quelle est la longueur du $${alpha}$e parallèle Nord au kilomètre près ?`
          enonceAMC = texte
          enonceAMC += ` On prendra $${texNombre(6400)}$${sp()}km comme rayon de la Terre.<br>`
          texteCorr = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texteCorr += `Considérons que le $${alpha}$e parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la Terre.<br>`
          texteCorr += 'Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>'
          texteCorr += 'Dans le triangle $OPH$ rectangle en $H$, $\\cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d\'où $HP=OP\\times \\cos(\\widehat{OPH})$.<br>'
          texteCorr += `Le rayon de la Terre étant approximativement de $${texNombre(6400)}$${sp()}km, nous pouvons calculer $HP$.<br>`
          texteCorr += `$HP\\approx${texNombre(6400)}${sp()}km\\times \\cos(${alpha}\\degree)\\approx ${texNombre(arrondi(6400 * Math.cos(alpha * Math.PI / 180)))}${sp()}km$<br>`
          reponse = Math.round(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180))
          texteCorr += `Calculons maintenant la longueur $L$ du $${alpha}$e parallèle : $L\\approx 2\\times \\pi\\times ${texNombre(arrondi(6400 * Math.cos(alpha * Math.PI / 180)))}${sp()}km\\approx ${texNombre(reponse)}${sp()}km$.<br>`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]')
            setReponse(this, i + ii, new Grandeur(reponse, 'km'), { formatInteractif: 'unites' })
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 5,
                    enonce: enonceAMC,
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
                  texte: `Longueur calculée, exprimée en km et arrondie à l'unité, du $${alpha}$e parallèle Nord : `,
                  valeur: [reponse],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(reponse),
                    decimals: 0,
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          break
        case 3:
          objets = []
          distance = randint(5, 300)
          hauteur = randint(150, 190) / 100
          beta = Math.atan(hauteur / distance) / Math.PI * 180
          alpha = randint(10, 50)
          teta = (alpha - beta) * Math.PI / 180
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
          numS = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB, numC, numR])
          absS = randint(7, 11)
          S = pointAdistance(B, absS, 90, lettreDepuisChiffre(numS))
          p = polygoneAvecNom(A, B, R, S, C)
          objets.push(p[1], p[0], segment(C, B), segment(C, R), codageAngleDroit(C, A, B), codageAngleDroit(A, B, R), codageAngleDroit(C, R, S))
          objets.push(afficheMesureAngle(B, C, S, 'black', 3, `${alfa}`), afficheMesureAngle(A, B, C, 'black', 2, `${baita}`), afficheMesureAngle(B, C, R, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(hauteur)} m`, sensH < 0 ? A : C, sensH < 0 ? C : A, 'black', -0.5), texteSurSegment(`${stringNombre(distance)} m`, C, R))
          texte = `Un observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`
          texte += `Cet${objet[index][2]} ${objet[index][0]} est ${objet[index][3]} à une distance de $${texNombre(distance)}$ m de l'observateur.<br>`
          texte += `L'œil de l'observateur est situé à $${texNombre(hauteur)}$ m du sol.`
          enonceInit = texte
          j = 0
          if (this.sup) {
            texte = `<br>$${lettreDepuisChiffre(numC)}$ représente l'œil de l'observateur, $[${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`
            texte += '(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)<br>'
            texte += mathalea2d({ xmin: min(-sensH, ordA + sensH), ymin: -1, xmax: max(-sensH, ordA + sensH), ymax: absS + 1, pixelsParCm: 20, scale: 0.5 }, objets)
            texte += `<br>${numAlpha(j)}Calculer d'abord $${baita}$, arrondie au centième près.`
            enonceAMC = texte
            texte = enonceInit + texte
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline nospacebefore', { texteApres: '$\\degree$' })
              setReponse(this, i + ii, arrondi(beta))
              ii++
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 2,
                      enonce: enonceInit + enonceAMC,
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
                    texte: `Valeur calculée, arrondie au centième, de $${baita}$ : `,
                    valeur: [arrondi(beta)],
                    alignement: 'center',
                    param: {
                      digits: nombreDeChiffresDe(arrondi(beta)),
                      decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(beta)),
                      signe: false
                    }
                  }
                }]
              }
              iiAMC++
            }
            j++
            enonceAMC = `${numAlpha(j)}En déduire la mesure de l'angle $\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}}$, arrondie au centième près.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline nospacebefore', { texteApres: '$\\degree$' })
              setReponse(this, i + ii, arrondi(alpha - beta))
              ii++
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: enonceAMC,
                    valeur: [arrondi(alpha - beta)],
                    alignement: 'center',
                    param: {
                      digits: nombreDeChiffresDe(arrondi(alpha - beta)),
                      decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(alpha - beta)),
                      signe: false
                    }
                  }
                }]
              }
              iiAMC++
            }
            j++
            enonceAMC = `${numAlpha(j)}Calculer alors la longueur $${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}$, arrondie au cm près.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline nospacebefore unites[longueurs]')
              setReponse(this, i + ii, new Grandeur(arrondi(taille - hauteur), 'm'), { formatInteractif: 'unites' })
              ii++
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 2,
                      enonce: enonceAMC,
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
                    texte: `Longueur en mètres, calculée au centième près, de $${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}$ : `,
                    valeur: [arrondi(taille - hauteur)],
                    alignement: 'center',
                    param: {
                      digits: nombreDeChiffresDe(arrondi(taille - hauteur)),
                      decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(taille - hauteur)),
                      signe: false
                    }
                  }
                }]
              }
              iiAMC++
            }
            j++
          }
          enonceAMC = this.sup ? `${numAlpha(j)}` : ''
          texte += '<br>' + enonceAMC
          enonceAMC += `Calculer la hauteur, en mètres, de cet${objet[index][2]} ${objet[index][0]}, arrondie au mètre près.`
          texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]}, arrondie au mètre près.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]')
            setReponse(this, i + ii, new Grandeur(arrondi(taille, 0), 'm'), { formatInteractif: 'unites' })
            ii++
          } else if (context.isAmc) {
            if (!this.sup) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 6,
                      enonce: enonceInit + '<br>' + enonceAMC + '<br>',
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: !this.sup ? `Hauteur, en mètres, de cet${objet[index][2]} ${objet[index][0]} :` : enonceAMC,
                  valeur: [arrondi(taille, 0)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(arrondi(taille, 0)),
                    decimals: 0,
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          j = 0
          texteCorr = mathalea2d({ xmin: min(-sensH, ordA + sensH), ymin: -1, xmax: max(-sensH, ordA + sensH), ymax: absS + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          texteCorr += this.sup ? `<br>${numAlpha(j)}` : '<br>'
          texteCorr += `Dans le triangle $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numB)}$ rectangle en $${lettreDepuisChiffre(numR)}$, $\\tan(${baita})=\\dfrac{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numB)}}{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}}$.<br>D'où $${baita}=\\arctan(\\dfrac{${texNombre(hauteur)}}{${texNombre(distance)}})\\approx ${texNombre(beta, 2)}\\degree$.<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}}=${alfa}-${baita}\\approx ${texNombre(alpha - beta, 2)}\\degree$<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `Dans le triangle $${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}$ rectangle en $${lettreDepuisChiffre(numC)}$, $\\tan(\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}})=\\dfrac{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}}{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}}$.<br>`
          texteCorr += `D'où $${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}=${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numR)}\\times \\tan(\\widehat{${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}})\\approx ${distance}${sp()}\\text{m}\\times \\tan(${texNombre(alpha - beta, 2)}\\degree)\\approx ${texNombre(taille - hauteur)}${sp()}\\text{m}$<br>`
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numR)}+${lettreDepuisChiffre(numR)}${lettreDepuisChiffre(numS)}\\approx${texNombre(hauteur)}${sp()}\\text{m}+${texNombre(taille - hauteur)}${sp()}\\text{m}=${texNombre(taille)}${sp()}\\text{m}\\approx${texNombre(Math.round(taille))}${sp()}\\text{m}$<br>`
          texteCorr += `Cet${objet[index][2]} ${objet[index][0]} mesure environ $${texNombre(Math.round(taille))}$ m de hauteur.`
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
          enonceInit = texte
          if (this.sup) {
            enonceAMC = '(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)<br>'
            enonceAMC += mathalea2d({ xmin: min(-sensH, absC + sensH), ymin: -1, xmax: max(-sensH, absC + sensH), ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }, objets)
            enonceAMC += `<br>${numAlpha(j)}Exprimer $h$ en fonction de $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}$ et $${baita}$ puis en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$ et $${alfa}$.`
            texte += enonceAMC
            if (this.interactif) {
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}h=$` })
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
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}h=$` })
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
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 3,
                      enonce: enonceInit + '<br>' + enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            j++
            enonceAMC = `${numAlpha(j)}En déduire $${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$, $${alfa}$ et $${baita}$.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}=$` })
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
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 3,
                      enonce: enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            j++
            enonceAMC = `${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}$, $${alfa}$ et $${baita}$.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}=$` })
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
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 2,
                      enonce: enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            j++
          }
          enonceAMC = this.sup ? `${numAlpha(j)}` : ''
          texte += '<br>' + enonceAMC
          enonceAMC += 'Quelle est la hauteur, en mètres, de la falaise ?'
          texte += 'Quelle est la hauteur de la falaise ?'
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]')
            setReponse(this, i + ii, new Grandeur(arrondi(taille, 0), 'm'), { formatInteractif: 'unites' })
            ii++
          } else if (context.isAmc) {
            if (!this.sup) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 6,
                      enonce: enonceInit + '<br>' + enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: !this.sup ? 'Hauteur, en mètres et arrondie au mètre près, de la falaise :' : enonceAMC,
                  valeur: [arrondi(taille, 0)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(arrondi(taille, 0)),
                    decimals: 0,
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          j++
          enonceAMC = this.sup ? `${numAlpha(j)}` : ''
          texte += '<br>' + enonceAMC
          enonceAMC += 'À quelle distance, en mètres et arrondie au mètre près, du pied de la falaise se trouve l\'observateur lors du deuxième relevé ?'
          texte += 'À quelle distance du pied de la falaise se trouve l\'observateur lors du deuxième relevé ?'
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]')
            context.isAmc ? setReponse(this, i + ii, arrondi(taille / Math.tan((alpha + 5) * Math.PI / 180), 0)) : setReponse(this, i + ii, new Grandeur(arrondi(taille / Math.tan((alpha + 5) * Math.PI / 180), 0), 'm'), { formatInteractif: 'unites' })
            ii++
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceAMC,
                  valeur: [arrondi(taille / Math.tan((alpha + 5) * Math.PI / 180), 0)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(arrondi(taille / Math.tan((alpha + 5) * Math.PI / 180), 0)),
                    decimals: 0,
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
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
          texteCorr += `$h=\\dfrac{${distance}${sp()}\\text{m}\\times \\tan(${alpha}\\degree)\\times \\tan(${alpha + 5}\\degree)}{\\tan(${alpha + 5}\\degree)-\\tan(${alpha}\\degree)}\\approx ${Math.round(taille)}${sp()}\\text{m}$.<br>`
          texteCorr += this.sup ? `La hauteur de la falaise est de $${Math.round(taille)}${sp()}\\text{m}$.<br>` : ''
          j++
          texteCorr += this.sup ? `${numAlpha(j)}` : ''
          texteCorr += `$${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numC)}=\\dfrac{${distance}${sp()}\\text{m}\\times \\tan(${alpha}\\degree)}{\\tan(${alpha + 5}\\degree)-\\tan(${alpha}\\degree)}\\approx ${texNombre(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}${sp()}\\text{m}$.<br>`
          texteCorr += this.sup ? `L'observateur se trouve à $${texNombre(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de la falaise lors du deuxième relevé.<br>` : ''
          texteCorr += this.sup ? '' : `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${texNombre(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de celle-ci lors du deuxième relevé.<br>`
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
          numH = lettreDepuisChiffre(randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numC, numS, numA]))
          H = projectionOrtho(C, droite(B, A), numH, sensH > 0 ? 'above left' : 'above right')
          p = polygoneAvecNom(B, C, S, A)
          objets.push(p[1], p[0], segment(H, C), segment(A, C), codageAngleDroit(B, S, A), codageAngleDroit(C, H, A))
          objets.push(afficheMesureAngle(S, B, A, 'black', 2, `${alfa}`), afficheMesureAngle(S, C, A, 'black', 2, `${baita}`))

          objets.push(texteSurSegment(`${stringNombre(distance)} m`, B, C, 'black', -sensH * 0.5), labelPoint(H), texteParPosition('h', milieu(S, A).x + sensH * 0.5, milieu(S, A).y, 0, 'black', 2, 'middle', true))

          texte = 'Un voyageur approche d\'une montagne. Il aimerait en calculer la hauteur.<br>'
          texte += `Pour cela, il utilise un théodolite en un point $${lettreDepuisChiffre(numB)}$ qui lui permet de mesurer l'angle $${alfa}$ vertical formé par le sommet $${lettreDepuisChiffre(numA)}$ de la montagne, le point $${lettreDepuisChiffre(numB)}$ et la base de la montagne $${lettreDepuisChiffre(numS)}$.<br>`
          texte += `Il parcourt ensuite $${distance}$ m en direction de la montagne et effectue une nouvelle mesure de l'angle $${baita}$ en un point $${lettreDepuisChiffre(numC)}$.<br>`
          texte += '(Le schéma ci-dessous n\'est pas en vraie grandeur et ne respecte pas les proportions.)<br>'
          texte += `  On donne : $${alfa}=${alpha}\\degree$, $${baita}=${beta}\\degree$ et $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}=${distance}$ m.<br>`
          texte += mathalea2d({ xmin: min(-sensH, absS + sensH), ymin: -1, xmax: max(-sensH, absS + sensH), ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          enonceInit = texte
          if (this.sup) {
            enonceAMC = `${numAlpha(j)}Exprimer la mesure de l'angle $\\widehat{CAS}$ en fonction de $${baita}$.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}\\widehat{CAS}=$` })
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `90-${baitaInteractif}`],
              { formatInteractif: 'texte' })
              ii++
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 2,
                      enonce: enonceInit + '<br>' + enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            enonceAMC = `${numAlpha(j + 1)}Exprimer la mesure de l'angle $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}$ en fonction de $${alfa}$.`
            texte += '<br>' + enonceAMC
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}=$` })
              setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
                `90-${alfaInteractif}`],
              { formatInteractif: 'texte' })
              ii++
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 2,
                      enonce: enonceAMC,
                      sanslignes: true
                    }
                  ]
              }
              iiAMC++
            }
            j += 2
          }
          enonceAMC = `${numAlpha(j)}Montrer que $\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numH)}}=${baita}-${alfa}$.`
          texte += '<br>' + enonceAMC
          if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
              [
                {
                  texte: '',
                  statut: this.sup ? 2 : 4,
                  enonce: this.sup ? enonceAMC : enonceInit + '<br>' + enonceAMC,
                  sanslignes: true
                }
              ]
            }
            iiAMC++
          }
          j++
          if (this.sup) {
            enonceAMC = `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}${lettreDepuisChiffre(numA)}$, exprimer $CA$ en fonction de $CH$.`
          } else {
            enonceAMC = `${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}$ en fonction de $${lettreDepuisChiffre(numH)}$.`
          }
          texte += '<br>' + enonceAMC
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}CA=$` })
            setReponse(this, i + ii, [ // Attention, l'emplacement des espaces est primordial
            `\\frac{CH}{sin(${baitaInteractif}-${alfaInteractif})}`,
            `\\frac{HC}{sin(${baitaInteractif}-${alfaInteractif})}`],
            { formatInteractif: 'texte' })
            ii++
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 2,
                    enonce: enonceAMC,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
          }
          j++
          if (this.sup) {
            enonceAMC = `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}$, exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$.`
          } else {
            enonceAMC = `${numAlpha(j)}Exprimer $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$.`
          }
          texte += '<br>' + enonceAMC
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times sin(${alfaInteractif})`,
            `sin(${alfaInteractif})\\times ${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}`,
            `${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numB)}\\times sin(${alfaInteractif})`,
            `sin(${alfaInteractif})\\times ${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numB)}`],
            { formatInteractif: 'texte' })
            ii++
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 2,
                    enonce: enonceAMC,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
          }
          j++
          if (this.sup) {
            enonceAMC = `${numAlpha(j)}En déduire $h$ en fonction de $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}$, puis en fonction de $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}$ et enfin en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$.`
          } else {
            enonceAMC = `${numAlpha(j)}En déduire $h$ en fonction de $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}$.`
          }
          texte += '<br>' + enonceAMC
          enonceAMC += this.sup ? '<br>' : ''
          if (this.interactif) {
            texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}h=$` })
            setReponse(this, i + ii, [ // Aucune exhaustivité hélas
            `${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numC)}\\times sin(${baitaInteractif})`,
            `sin(${baitaInteractif})\\times ${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numC)}`,
            `${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}\\times sin(${baitaInteractif})`,
            `sin(${baitaInteractif})\\times ${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}`],
            { formatInteractif: 'texte' })
            ii++
            texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}h=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `\\frac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{${lettreDepuisChiffre(numH)}${lettreDepuisChiffre(numC)}\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${baitaInteractif}\\times ${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)} sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${baitaInteractif}\\times ${lettreDepuisChiffre(numH)}${lettreDepuisChiffre(numC)} sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`],
            { formatInteractif: 'texte' })
            ii++
            texte += '<br>' + ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore grecTrigo', { texte: `$${sp(20)}h=$` })
            setReponse(this, i + ii, [ // Aucune exhasutivité hélas
            `\\frac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times sin(${alfaInteractif})\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${alfaInteractif})\\times ${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numB)}\\times sin(${alfaInteractif})\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`,
            `\\frac{sin(${alfaInteractif})\\times ${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numB)}\\times sin(${baitaInteractif})}{${baitaInteractif}-${alfaInteractif}}`],
            { formatInteractif: 'texte' })
            ii++
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCOpen',
              propositions:
                [
                  {
                    texte: '',
                    statut: 5,
                    enonce: enonceAMC,
                    sanslignes: true
                  }
                ]
            }
            iiAMC++
          }
          j++
          enonceAMC = `${numAlpha(j)}En supposant que le point d'observation est au niveau du sol, quelle est la hauteur de la montagne ? `
          texte += '<br>' + enonceAMC + '(arrondir au mètre près)'
          enonceAMC += '(exprimer en mètres et arrondir au mètre près)'

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]')
            setReponse(this, i + ii, new Grandeur(arrondi(taille, 0), 'm'), { formatInteractif: 'unites' })
            ii++
          } else if (context.isAmc) {
            propositionsAMC[iiAMC] = {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: enonceAMC,
                  valeur: [arrondi(taille, 0)],
                  alignement: 'center',
                  param: {
                    digits: nombreDeChiffresDe(arrondi(taille, 0)),
                    decimals: 0,
                    signe: false
                  }
                }
              }]
            }
            iiAMC++
          }
          j = 0
          texteCorr = mathalea2d({ xmin: min(-sensH, absS + sensH), ymin: -1, xmax: max(-sensH, absS + sensH), ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }, objets)
          if (this.sup) {
            texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numA)}$ rectangle en $${lettreDepuisChiffre(numS)}$, les angles aigus sont complémentaires donc $\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}=90-${baita}$.<br>`
            texteCorr += `${numAlpha(j + 1)}Dans le triangle $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numA)}$ rectangle en $${lettreDepuisChiffre(numS)}$, pour la même raison $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}=90-${alfa}$.<br>`
            j += 2
          }
          texteCorr += `${numAlpha(j)}On sait que $\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}=90-${baita}$ et $\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}=90-${alfa}$.<br>Donc $\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numH)}}=\\widehat{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}-\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numS)}}=90-${alfa}-(90-${baita})=\\cancel{90}-${alfa}-\\cancel{90}+${baita}=${baita}-${alfa}$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}${lettreDepuisChiffre(numA)}$ rectangle en $${lettreDepuisChiffre(numH)}$, $\\sin(\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numH)}})=\\dfrac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}}{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}}$ d'où $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}=\\dfrac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}}{\\sin(\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}${lettreDepuisChiffre(numH)}})}=\\dfrac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}}{\\sin(${baita}-${alfa})}$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}$ rectangle en $${lettreDepuisChiffre(numH)}$, $\\sin(\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numH)}})=\\dfrac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}}{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}}$ d'où $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times \\sin(\\widehat{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numH)}})=${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times \\sin(${alfa})$.<br>`
          j++

          texteCorr += `${numAlpha(j)}Dans le triangle $${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numS)}${lettreDepuisChiffre(numA)}$ rectangle en $${lettreDepuisChiffre(numS)}$, $h=${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numA)}\\times \\sin(${baita})=\\dfrac{${lettreDepuisChiffre(numC)}${lettreDepuisChiffre(numH)}}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})=\\dfrac{${lettreDepuisChiffre(numB)}${lettreDepuisChiffre(numC)}\\times \\sin(${alfa})}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})$<br>`

          j++
          texteCorr += `${numAlpha(j)}Application numérique : $h=\\dfrac{${distance}${sp()}\\text{m}\\times \\sin(${alpha}\\degree)}{\\sin(${beta}\\degree-${alpha}\\degree)}\\times \\sin(${beta}\\degree)$`
          texteCorr += `$=\\dfrac{${distance}${sp()}\\text{m}\\times \\sin(${alpha}\\degree)\\times \\sin(${beta}\\degree)}{\\sin(${beta - alpha}\\degree)}\\approx ${texNombre(Math.round(taille))}${sp()}\\text{m}$.<br>`
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
            const nomDesSommets = creerNomDePolygone(5, listeDeNomsDePolygones)
            listeDeNomsDePolygones.push(nomDesSommets)
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
            enonceAMC = texte + '<br>'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline nospacebefore unites[longueurs]')
              setReponse(this, i + ii, new Grandeur(arrondi(longueur(A, B), 1), 'cm'), { formatInteractif: 'unites' })
              ii++
            } else if (context.isAmc) {
              propositionsAMC[iiAMC] = {
                type: 'AMCOpen',
                propositions:
                  [
                    {
                      texte: '',
                      statut: 5,
                      enonce: enonceAMC,
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
                    texte: `Longueur calculée, exprimée en cm et arrondie au millième, du segment $[${A.nom + B.nom}]$ : `,
                    valeur: [arrondi(longueur(A, B), 1)],
                    alignement: 'center',
                    param: {
                      digits: 1 + nombreDeChiffresDe(arrondi(longueur(A, B), 1)),
                      decimals: 1,
                      signe: false
                    }
                  }
                }]
              }
              iiAMC++
            }
            texteCorr = `Dans le triangle $${A.nom + D.nom + E.nom}$ rectangle en $${D.nom}$ : `
            texteCorr += `<br>$\\cos(\\widehat{${D.nom + A.nom + E.nom}})=\\dfrac{${A.nom + D.nom}}{${A.nom + E.nom}}\\quad$ soit $\\quad\\cos(\\widehat{${D.nom + A.nom + E.nom}})=\\dfrac{${AD}}{${AE}}$,`
            texteCorr += `<br> d'où $\\widehat{${D.nom + A.nom + E.nom}}=\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\approx${texNombre(angle(D, A, E), 1)}\\degree$.`

            texteCorr += `<br><br>Dans le triangle $${A.nom + B.nom + C.nom}$ rectangle en $${B.nom}$ : `
            texteCorr += `<br>$\\cos(\\widehat{${B.nom + A.nom + C.nom}})=\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}\\quad$ soit $\\quad\\cos(${texNombre(arrondi(angle(D, A, E), 1))}\\degree)\\approx\\dfrac{${A.nom + B.nom}}{${AC}}$,`
            texteCorr += `<br> d'où $${A.nom + B.nom} \\approx ${AC}${sp()}\\text{cm}\\times \\cos(${texNombre(arrondi(angle(D, A, E), 1))}\\degree)\\approx${texNombre(longueur(A, B), 1)}$ cm.`

            texteCorr += `<br><br>On pouvait aussi écrire : $${A.nom + B.nom} = ${AC}\\times \\cos\\left(\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\right)=${AC}\\times \\dfrac{${AD}}{${AE}}=${texFractionReduite(AC * AD, AE)}$ cm qui est la valeur exacte.`
          }
          break
      }
      if (context.isAmc) {
        enonceAMC = this.nbQuestions > 1 ? '\\begin{Large}\\textbf{Problème n° ' + (i + 1) + '}\\end{Large}' : 'Peu importe'
        this.autoCorrection[i] = {
          enonce: enonceAMC,
          enonceCentre: true,
          enonceAvant: this.nbQuestions > 1, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          propositions: propositionsAMC
        }
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
