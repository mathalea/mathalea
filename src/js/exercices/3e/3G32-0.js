import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, numAlpha, stringNombre, contraindreValeur, combinaisonListes, texNombrec, texNombre, arrondi, arrondiVirgule, texFractionReduite, creerNomDePolygone, choice } from '../../modules/outils.js'
import { texteSurSegment, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d, tracePoint, labelPoint, pointAdistance, projectionOrtho, droite, longueur, angle, droiteVerticaleParPoint, cercle, pointIntersectionLC, polygone } from '../../modules/2d.js'
import { arete3d, demicercle3d, point3d, rotationV3d, sphere3d, vecteur3d } from '../../modules/3d.js'
export const titre = 'Problèmes nécessitant un calcul de longueur à l\'aide de la trigonométrie'

/**
 * Calculer la largeur d’une rivière @author Jean-Claude Lhote
 * Calcul d’un parallèle terrestre @author Jean-Claude Lhote
 * Calculer la hauteur d’un objet vu sous un angle donné @author Jean-Claude Lhote
 * Calculer la hauteur d’une falaise @author Jean-Claude Lhote
 * Calculer la hauteur d’une montagne @author Jean-Claude Lhote
 * Triangle rectangle inscrit dans un triangle rectangle @author Rémi Angot
 * Fusion des exercices @author Guillaume Valmont
 * Interactivité des exercices @author Eric Elter
 * Référence 3G32-0
*/
export default function problemesTrigoLongueur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.besoinFormulaireCaseACocher = ['Afficher un schéma et des questions intermédiaires']
  this.sup = true
  this.besoinFormulaire2Numerique = [
    'Type d\'exercice',
    7,
    `Cet exercice regroupe les exercices 3G32, 3G32-1, 3G32-2, 3G32-3, 3G32-4 et 3G32-5
    1 : Calculer la largeur d'une rivière
    2 : Calcul d'un parallèle terrestre
    3 : Calculer la hauteur d’un objet vu sous un angle donné
    4 : Calculer la hauteur d’une falaise
    5 : Calculer la hauteur d’une montagne
    6 : Triangle rectangle inscrit dans un triangle rectangle
    7 : Mélange`
  ]
  this.sup2 = 1
  this.nbQuestions = 1
  this.spacingCorr = 2
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const objet = [['arbre', 'un', ''], ['immeuble', 'un', ''], ['éolienne', 'une', 'te'], ['coline', 'une', 'te']]
    let distance, alfa; let baita; let beta; let alpha; let taille; let A; let B; let S; let C; let R; let objets = []; let p
    let O; let H; let M; let R2; let Axe; let normalV; let normalH; let P; let HP; let Sph; let OP; let PoleNord; let PoleSud
    let hauteur; let teta; let index
    if (context.isHtml) {
      alfa = 'α'
      baita = 'β'
    } else {
      alfa = '\\alpha'
      baita = '\\beta'
    }
    let typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6]
    this.sup2 = contraindreValeur(1, 7, this.sup2, 1)
    if (this.sup2 === 7) typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6]
    else typesDeQuestionsDisponibles = [this.sup2]

    const listeTypeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, reponse, j, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeQuestions[i]) {
        case 1:
          objets = []
          alpha = randint(25, 65)
          j = 0
          beta = alpha + randint(2, 5)
          distance = randint(7, 15) * 10
          taille = Math.round(distance * (Math.tan(beta * Math.PI / 180) - Math.tan(alpha * Math.PI / 180)))
          A = point(0, 7, 'A')
          B = point(0, 0, 'B')
          C = point(7, 0, 'C')
          S = point(12, 0, 'S')
          p = polygoneAvecNom(A, B, C, S)
          R = polygoneAvecNom(point(7, -1), point(12, -1), point(12, 8), point(7, 8))
          R[0].color = 'blue'
          R[0].couleurDeRemplissage = 'blue'
          R[0].opaciteDeRemplissage = 0.5
          R[0].opacite = 0.5
          objets.push(p[1], p[0], R[0], segment(A, C), codageAngleDroit(A, B, C))
          objets.push(afficheMesureAngle(B, A, C, 'black', 1, `${alfa}`), afficheMesureAngle(B, A, S, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(distance)} m`, A, B, 'black', -0.5), texteParPosition('l', milieu(C, S).x, milieu(C, S).y + 0.5, 0, 'black', 2, 'middle', true))

          texte = 'Un géomètre veut mesurer la largeur d\'une rivière.<br>'
          texte += 'Pour cela, il remarque une souche notée $S$ sur la rive opposée.<br>'
          texte += 'Il a placé un cône sur sa rive en face de la souche, son emplacement est noté $C$.<br>'
          texte += 'Ensuite il s\'est éloigné de la berge en restant aligné avec la souche $S$ et le cône $C$ jusqu\'à un endroit où il place un bâton noté $B$.<br>'
          texte += `Du bâton, il effectue un quart de tour et s'éloigne d'une distance de $${distance}$ m jusqu'à son appareil de mesure noté $A$.<br>`
          texte += `À l'aide de son appareil, il mesure l'angle $\\widehat{BAC}$ noté $${alfa}$  et l'angle $\\widehat{BAS}$ noté $${baita}$.<br>`
          if (this.sup) {
            texte += `${numAlpha(j)}Exprimer $BC$ en fonction de $AB$ et de $${alfa}$.<br>`
            j++
            texte += `${numAlpha(j)}Exprimer $BS$ en fonction de $AB$ et de $${baita}$.<br>`
            j++
          }
          texte += `${numAlpha(j)}Exprimer $CS$ en fonction de $AB$, de $${alfa}$ et de $${baita}$.<br>`
          j++
          texte += `${numAlpha(j)}Calculer la largeur de la rivière au mètre près sachant que $${alfa}=${alpha}\\degree$ et $${baita}=${beta}\\degree$.<br>`
          texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          j = 0
          texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          if (this.sup) {
            texteCorr += `${numAlpha(j)}Dans le triangle $ABC$ rectangle en $B$ on a : $\\tan(${alfa})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times \\tan(${alfa})$.<br>`
            j++
            texteCorr += `${numAlpha(j)}Dans le triangle $ABS$ rectangle en $B$ on a : $\\tan(${baita})=\\dfrac{BS}{AB}$ d'où $BS=AB\\times \\tan(${baita})$.<br>`
            j++
          }
          texteCorr += `${numAlpha(j)}Comme $BS=AB\\times \\tan(${baita})$ et $BC=AB\\times \\tan(${alfa})$, alors $CS=AB\\times (\\tan(${baita})-\\tan(${alfa}))$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Donc $CS=${distance}\\times (\\tan(${beta})-\\tan(${alpha}))\\approx ${taille}$ m.<br>`

          break
        case 2:
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
          normalH = rotationV3d(R, normalV, 90)
          P = rotationV3d(M, normalH, -alpha)
          P.c2d.nom = 'P'
          H = point3d(0, 0, P.z, false)
          R2 = vecteur3d(H, P)
          H.c2d.nom = 'H'
          Sph = sphere3d(O, 5, 1, 3)
          HP = arete3d(H, P)
          OP = arete3d(O, P)
          objets.push(...Sph.c2d, Axe.c2d, HP.c2d, OP.c2d, codageAngleDroit(P.c2d, H.c2d, O.c2d), tracePoint(H.c2d, P.c2d, O.c2d, M.c2d), labelPoint(H.c2d, P.c2d, O.c2d, M.c2d))
          objets.push(demicercle3d(H, normalV, R2, 'caché', 'red', 0), demicercle3d(H, normalV, R2, 'visible', 'red', 0))
          objets.push(arete3d(O, M).c2d)
          objets.push(afficheMesureAngle(M.c2d, O.c2d, P.c2d, 'black', 1.5, `${alpha}`))
          texte = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texte += `Quelle est la longueur du $${alpha}$e parallèle Nord au kilomètre près ?`
          texteCorr = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          texteCorr += `Considérons que le $${alpha}$e parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la terre.<br>`
          texteCorr += 'Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>'
          texteCorr += 'Dans le triangle $OPH$ rectangle en $H$, $\\cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d\'où $HP=OP\\times \\cos(\\widehat{OPH})$.<br>'
          texteCorr += 'Le rayon de la terre étant approximativement de $6400$ km, nous pouvons calculer $HP$ :<br>'
          texteCorr += `$HP=6400\\times \\cos(${alpha})\\approx ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}$ km.<br>`
          reponse = Math.round(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180))
          texteCorr += `Calculons maintenant la longueur $L$ du $${alpha}$e parallèle : $L\\approx 2\\times \\pi\\times ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}\\approx ${texNombre(reponse)}$ km.<br>`
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
          A = point(0, 0, 'A')
          B = pointAdistance(A, 12, 0, 'B')
          O = pointAdistance(A, 3, 90, 'O')
          H = pointAdistance(B, 3, 90, 'H')
          S = pointAdistance(B, 9, 90, 'S')
          p = polygoneAvecNom(A, B, H, S, O)
          objets.push(p[1], p[0], segment(O, B), segment(O, H), codageAngleDroit(O, A, B), codageAngleDroit(A, B, H), codageAngleDroit(O, H, S))
          objets.push(afficheMesureAngle(B, O, S, 'black', 3, `${alfa}`), afficheMesureAngle(A, B, O, 'black', 2, `${baita}`), afficheMesureAngle(B, O, H, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(hauteur)} m`, O, A, 'black', -0.5), texteSurSegment(`${stringNombre(distance)} m`, O, H))
          texte = `Un observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`
          texte += `Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${texNombre(distance)}$ m de l'observateur.<br>`
          texte += `l'oeil de l'observateur est situé à $${texNombre(hauteur)}$ m du sol.<br>`
          if (this.sup) {
            texte += `$O$ représente l'oeil de l'observateur, $[BS]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

            texte += 'Le schéma ci-dessous n\'est pas en vraie grandeur.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 0.5 }, objets)
            texte += `<br>Calculer d'abord l'angle $${baita}$.<br>`
            texte += 'En déduire la mesure de l\'angle $\\widehat{HOS}$.<br>'
            texte += 'Calculer alors la longueur $HS$.<br>'
          }
          texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près.<br>`

          texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 0.5 }, objets)
          texteCorr += `<br>Dans le triangle $OHB$ rectangle en $H$, $\\tan(${baita})=\\dfrac{HB}{OH}$.<br>D'où $${baita}=\\arctan(\\dfrac{${texNombre(hauteur)}}{${texNombre(distance)}})\\approx ${arrondiVirgule(beta)}\\degree$.<br>`
          texteCorr += `$\\widehat{HOS}=${alfa}-${baita}\\approx ${arrondiVirgule(alpha - beta)}$.<br>`
          texteCorr += `$HS=OH\\times \\tan(\\widehat{HOS})\\approx ${distance}\\times \\tan(${arrondiVirgule(alpha - beta)})\\approx ${texNombrec(taille - hauteur)}$ m.<br>`
          texteCorr += `$BS=BH+HS=${texNombre(hauteur)}+${texNombrec(taille - hauteur)}=${texNombre(taille)}$ m.<br>`
          texteCorr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${texNombre(Math.round(taille))}$ m de hauteur.`
          break
        case 4:
          objets = []
          alpha = randint(25, 45)
          beta = Math.tan(alpha * Math.PI / 180) * Math.tan((alpha + 1) * Math.PI / 180) / (Math.tan((alpha + 1) * Math.PI / 180) - Math.tan(alpha * Math.PI / 180))
          distance = randint(5, 10)
          taille = beta * distance
          A = point(0, 0, 'A')
          B = pointAdistance(A, 5, 0, 'B')
          H = pointAdistance(A, 12, 0, 'H')
          S = pointAdistance(H, 7, 90, 'S')
          p = polygoneAvecNom(A, B, H, S)
          objets.push(p[1], p[0], segment(S, B), codageAngleDroit(A, H, S))
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, `${alfa}`), afficheMesureAngle(H, B, S, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${stringNombre(distance)} m`, A, B, 'black', -0.5), texteParPosition('h', milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, 'middle', true))

          texte = 'Un observateur sur un bateau s\'approche d\'une falaise dont il veut mesurer la hauteur.<br>'
          texte += `Il jette l'ancre puis constate qu'il voit la falaise sous un angle de $${alpha}\\degree$.<br>`
          texte += `Il se rapproche ensuite de la falaise jusqu'à la voir sous un angle de $${alpha + 5}\\degree$.<br>`
          texte += `Il constate qu'entre ses deux mesures, il s'est rapproché de la falaise de $${distance}$ m.<br>`
          if (this.sup) {
            texte += 'Le schéma ci-dessous n\'est pas en vraie grandeur.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets)
            texte += `<br>Exprimer $h$ en fonction de $BH$ et $${alfa}$ puis en fonction de $AH$ et $${baita}$.<br>`
            texte += `En déduire $BH$ en fonction de $AB$, $${alfa}$ et $${baita}$.<br>`
            texte += `Exprimer $HS$ en fonction de $AB$, $${alfa}$ et $${baita}$.<br>`
          }
          texte += 'Quelle est la hauteur de la falaise ?<br>'
          texte += 'À quelle distance du pied de la falaise se trouve l\'observateur lors du deuxième relevé ?<br>'
          texte += 'Arrondir les résultats au mètre près. (On supposera le point d\'observation au niveau de l\'eau)'
          texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets)
          texteCorr += `<br>Dans le triangle $BHS$ rectangle en $H$, $\\tan(${baita})=\\dfrac{h}{BH}$.<br>D'où $h=BH\\times \\tan(${baita})$.<br>`
          texteCorr += `<br>Dans le triangle $AHS$ rectangle en $H$, $\\tan(${alfa})=\\dfrac{h}{AH}$.<br>D'où $h=AH\\times \\tan(${alfa})$.<br>`
          texteCorr += `Or $AH=AB+BH$ donc $h=(AB+BH)\\times \\tan(${alfa})$.<br>`
          texteCorr += `On en déduit que $BH\\times \\tan(${baita})=(AB+BH)\\times \\tan(${alfa})$ soit $BH\\times \\tan(${baita})=AB\\times \\tan(${alfa})+BH\\times \\tan(${alfa})$.<br>`
          texteCorr += `D'où $AB\\times \\tan(${alfa})=BH\\times \\tan(${baita})-BH\\times \\tan(${alfa})=BH\\times (\\tan(${baita})-\\tan(${alfa}))$.<br>`
          texteCorr += `Et $BH=\\dfrac{AB\\times \\tan(${alfa})}{\\tan(${baita})-\\tan(${alfa})}$.<br>`
          texteCorr += `Ainsi $h=BH\\times \\tan(${baita})=\\dfrac{AB\\times \\tan(${alfa})\\times \\tan(${baita})}{\\tan(${baita})-\\tan(${alfa})}$.<br>`
          texteCorr += 'Application numérique : <br>'
          texteCorr += `$h=\\dfrac{${distance}\\times \\tan(${alpha})\\times \\tan(${alpha + 5})}{\\tan(${alpha + 5})-\\tan(${alpha})}\\approx ${Math.round(taille)}$ m.<br>`
          texteCorr += `$BH=\\dfrac{${distance}\\times \\tan(${alpha})}{\\tan(${alpha + 5})-\\tan(${alpha})}\\approx ${texNombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m.<br>`
          texteCorr += `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${texNombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de celle-ci lors du deuxième relevé.<br>`
          break
        case 5:
          objets = []
          alpha = randint(25, 45)
          j = 0
          beta = alpha + randint(1, 3)
          taille = randint(20, 50) * 100
          distance = Math.round(taille * Math.sin((beta - alpha) * Math.PI / 180) / Math.sin(alpha * Math.PI / 180) / Math.sin(beta * Math.PI / 180))
          taille = Math.round(distance * Math.sin(alpha * Math.PI / 180) * Math.sin(beta * Math.PI / 180) / Math.sin((beta - alpha) * Math.PI / 180))
          A = point(0, 0, 'A')
          B = pointAdistance(A, 5, 0, 'B')
          H = pointAdistance(A, 12, 0, 'H')
          S = pointAdistance(H, 7, 90, 'S')
          C = projectionOrtho(B, droite(A, S), 'C')
          p = polygoneAvecNom(A, B, H, S, C)
          objets.push(p[1], p[0], segment(C, B), segment(S, B), codageAngleDroit(A, H, S), codageAngleDroit(B, C, S))
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, `${alfa}`), afficheMesureAngle(H, B, S, 'black', 2, `${baita}`))

          objets.push(texteSurSegment(`${stringNombre(distance)} m`, A, B, 'black', -0.5), texteParPosition('h', milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, 'middle', true))

          texte = 'Un voyageur approche d\'une montagne. Il aimerait en calculer la hauteur.<br>'
          texte += `Pour cela, il utilise un théodolite en un point $A$ qui lui permet de mesurer l'angle $${alfa}$ vertical formé par le sommet $S$ de la montagne, le point $A$ et la base de la montagne $H$.<br>`
          texte += `Il parcourt ensuite $${distance}$ m en direction de la montagne et effectue une nouvelle mesure de l'angle $${baita}$ en un point $B$.<br>`
          texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>On donne : $${alfa}=${alpha}\\degree$, $${baita}=${beta}\\degree$ et $AB=${distance}$ m.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'

          if (this.sup) {
            texte += `${numAlpha(j)}Exprimer la mesure de l'angle $\\widehat{BSH}$ en fonction de $${baita}$.<br>`
            texte += `${numAlpha(j + 1)}Exprimer la mesure de l'angle $\\widehat{ASH}$ en fonction de $${alfa}$.<br>`
            j += 2
          }
          texte += `${numAlpha(j)}Montrer que $\\widehat{BSC}=${baita}-${alfa}$.<br>`
          j++
          if (this.sup) {
            texte += `${numAlpha(j)}Dans le triangle $BCS$ exprimer $BS$ en fonction de $BC$.<br>`
          } else {
            texte += `${numAlpha(j)}Exprimer $BS$ en fonction de $BC$.<br>`
          }
          j++
          if (this.sup) {
            texte += `${numAlpha(j)}Dans le triangle $ABC$, exprimer $BC$ en fonction de $AB$.<br>`
          } else {
            texte += `${numAlpha(j)}Exprimer $BC$ en fonction de $AB$.<br>`
          }
          j++
          if (this.sup) {
            texte += `${numAlpha(j)}En déduire $h$ en fonction de $BS$ puis en fonction de $BC$ enfin en fonction de $AB$.<br>`
          } else {
            texte += `${numAlpha(j)}En déduire $h$ en fonction de $AB$.<br>`
          }
          j++
          texte += `${numAlpha(j)}Quelle est la hauteur de la montagne (arrondir au mètre près) ?<br>`
          texte += 'On supposera le point d\'observation au niveau du sol.'
          j = 0
          texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
          if (this.sup) {
            texteCorr += `${numAlpha(j)}Dans le triangle $BHS$ rectangle en $H$, les angles aigus sont complémentaires donc $\\widehat{BSH}=90-${baita}$.<br>`
            texteCorr += `${numAlpha(j + 1)}Dans le triangle $AHS$ rectangle en $H$, pour la même raison $\\widehat{ASH}=90-${alfa}$.<br>`
            j += 2
          }
          texteCorr += `${numAlpha(j)}On sait que $\\widehat{BSH}=90-${baita}$ et $\\widehat{ASH}=90-${alfa}$.<br>Donc $\\widehat{BSC}=\\widehat{ASH}-\\widehat{BSH}=90-${alfa}-(90-${baita})=\\cancel{90}-${alfa}-\\cancel{90}+${baita}=${baita}-${alfa}$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Dans le triangle $BCS$ rectangle en $C$, $\\sin(\\widehat{BSC})=\\dfrac{BC}{BS}$ d'où $BS=\\dfrac{BC}{\\sin(\\widehat{BSC})}=\\dfrac{BC}{\\sin(${baita}-${alfa})}$.<br>`
          j++
          texteCorr += `${numAlpha(j)}Dans le triangle $ABC$ rectangle en $C$, $\\sin(\\widehat{BAC})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times \\sin(\\widehat{BAC})=AB\\times \\sin(${alfa})$.<br>`
          j++

          texteCorr += `${numAlpha(j)}Dans le triangle $BHS$ rectangle en $H$, $h=BS\\times \\sin(${baita})=\\dfrac{BC}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})=\\dfrac{AB\\times \\sin(${alfa})}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})$<br>`

          j++
          texteCorr += `${numAlpha(j)}Application numérique : $h=\\dfrac{${distance}\\times \\sin(${alpha})}{\\sin(${beta}-${alpha})}\\times \\sin(${beta})$`
          texteCorr += `$=\\dfrac{${distance}\\times \\sin(${alpha})\\times \\sin(${beta})}{\\sin(${beta - alpha})}\\approx ${Math.round(taille)}$ m.<br>`
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
            texte = mathalea2d(paramsEnonce, objetsEnonce)
            texte += `<br><br> $${A.nom + E.nom} = ${AE}~\\text{cm}$, $${A.nom + D.nom} = ${AD}~\\text{cm}$ et $${A.nom + C.nom} = ${AC}~\\text{cm}$.`
            texte += `<br> Calculer la longueur $${A.nom + B.nom}$ et donner une valeur approchée au millimètre près.`
            texteCorr = `Dans le triangle $${A.nom + D.nom + E.nom}$ rectangle en $${D.nom}$ : `
            texteCorr += `<br>$\\cos(\\widehat{${D.nom + A.nom + E.nom}})=\\dfrac{${A.nom + D.nom}}{${A.nom + E.nom}}\\quad$ soit $\\quad\\cos(\\widehat{${D.nom + A.nom + E.nom}})=\\dfrac{${AD}}{${AE}}$,`
            texteCorr += `<br> d'où $\\widehat{${D.nom + A.nom + E.nom}}=\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\approx${texNombre(arrondi(angle(D, A, E), 1))}\\degree$.`

            texteCorr += `<br><br>Dans le triangle $${A.nom + B.nom + C.nom}$ rectangle en $${B.nom}$ : `
            texteCorr += `<br>$\\cos(\\widehat{${B.nom + A.nom + C.nom}})=\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}\\quad$ soit $\\quad\\cos(${texNombre(arrondi(angle(D, A, E), 1))}\\degree)\\approx\\dfrac{${A.nom + B.nom}}{${AC}}$,`
            texteCorr += `<br> d'où $${A.nom + B.nom} \\approx ${AC} \\times \\cos(${texNombre(arrondi(angle(D, A, E), 1))}\\degree)\\approx${texNombre(arrondi(longueur(A, B), 1))}~\\text{cm}$.`

            texteCorr += `<br><br>On pouvait aussi écrire : $${A.nom + B.nom} = ${AC} \\times \\cos\\left(\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\right)=${AC}\\times\\dfrac{${AD}}{${AE}}=${texFractionReduite(AC * AD, AE)}$.`
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
