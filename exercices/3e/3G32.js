import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, num_alpha,arrondi, calcul, tex_nombre, tex_nombrec, arrondi_virgule } from "/modules/outils.js"
import { texteSurSegment, tracePoint,labelPoint,projectionOrtho, pointAdistance,droite, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from '../../modules/2d.js';
import {point3d,vecteur3d,sphere3d,arete3d,rotationV3d,demicercle3d,homothetie3d} from "/modules/3d.js"
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function Calculs_trigonometriques() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes utilisant la trigonométrie";
  this.consigne = "";
  this.nb_questions = 10;
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.sup2 = true;
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.nb_questions = 1
  this.spacing_corr=2
  this.spacing=2

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let objet = [['arbre', 'un', ''], ['immeuble', 'un', ''], ['éolienne', 'une', 'te'], ['coline', 'une', 'te']]
    let distance, hauteur, beta, alpha, teta, taille, index, A, B, O, H, S, C,M,R,R2,Axe,normalV,normalH,P,HP,Sph,OP,PoleNord,PoleSud, objets = [], p
    let type_de_questions_disponibles
    if (this.sup==1) {
    type_de_questions_disponibles=['type4','type5']; // parallèle terrestre et largeur de rivière
    }
    else if (this.sup==2){
      type_de_questions_disponibles=['type1','type2','type3']; // hauteur d'arbre et plus, hauteur de montage, hauteur de falaise
    }
    else {
      type_de_questions_disponibles=['type1','type2','type3','type4','type5']; // tous
    }
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr,j, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': // Mesurer un arbre, un immeuble, une éolienne ou une coline
        objets=[]
          distance = randint(5, 300)
          hauteur = calcul(randint(150, 190) / 100)
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
          objets.push(afficheMesureAngle(B, O, S, 'black', 3, 'α'), afficheMesureAngle(A, B, O, 'black', 2, 'β'), afficheMesureAngle(B, O, H, 'black', 2, 'β'))
          objets.push(texteSurSegment(`${tex_nombre(hauteur)} m`, O, A, 'black', -0.5), texteSurSegment(`${tex_nombre(distance)} m`, O, H))
          texte = `Un observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`;
          texte += `Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${tex_nombre(distance)}$ m de l'observateur.<br>`
          texte += `l'oeil de l'observateur est situé à $${tex_nombre(hauteur)}$ m du sol.<br>`
          if (this.sup2) {

            texte += `$O$ représente l'oeil de l'observateur, $[BS]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

            texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 1 }, objets);
            texte += `<br>Calculer d'abord l'angle $β$.<br>`
            texte += `En déduire la mesure de l'angle $\\widehat{HOS}$.<br>`
            texte += `Calculer alors la longueur $HS$.<br>`
          }
          texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près.<br>`

          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 1 }, objets)
          texte_corr += `<br>Dans le triangle $OHB$ rectangle en $H$, $tan(β)=\\dfrac{HB}{OH}$.<br>D'où $β=Atan(\\dfrac{${tex_nombre(hauteur)}}{${tex_nombre(distance)}})\\approx ${arrondi_virgule(beta)}\\degree$.<br>`
          texte_corr += `$\\widehat{HOS}=α-β\\approx ${arrondi_virgule(alpha - beta)}$.<br>`
          texte_corr += `$HS=OH\\times tan(\\widehat{HOS})\\approx ${distance}\\times tan(${arrondi_virgule(alpha - beta)})\\approx ${tex_nombrec(taille - hauteur)}$ m.<br>`
          texte_corr += `$BS=BH+HS=${tex_nombre(hauteur)}+${tex_nombrec(taille - hauteur)}=${tex_nombre(taille)}$ m.<br>`
          texte_corr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${tex_nombre(Math.round(taille))}$ m de hauteur.`;
          break;
        case 'type2': //mesurer une falaise depuis un bateau
        objets=[]
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
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, 'α'), afficheMesureAngle(H, B, S, 'black', 2, 'β'))
          objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`h`, milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, "middle", true))

          texte = `Un observateur sur un bateau s'approche d'une falaise dont il veut mesurer la hauteur.<br>`;
          texte += `Il jette l'ancre puis constate qu'il voit la falaise sous un angle de $${alpha}\\degree$.<br>`
          texte += `Il se rapproche ensuite de la falaise jusqu'à la voir sous un angle de $${alpha + 5}\\degree$.<br>`
          texte += `Il constate qu'entre ses deux mesures, il s'est rapproché de la falaise de $${distance}$ m.<br>`
          if (this.sup2) {
            texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets);
            texte += `<br>Exprimer $h$ en fonction de $BH$ et $α$ puis en fonction de $AH$ et $β$.<br>`
            texte += `En déduire $BH$ en fonction de $AB$, $α$ et $β$.<br>`
            texte += `Exprimer $HS$ en fonction de $AB$, $α$ et $β$.<br>`
          }
          texte += `Quelle est la hauteur de la falaise ?<br>`
          texte += `A quelle distance du pied de la falaise se trouve l'observateur lors du deuxième relevé ?<br>`
          texte += `Arrondir les résultats au mètre près. (On supposera le point d'observation au niveau de l'eau)`
          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)
          texte_corr += `<br>Dans le triangle $BHS$ rectangle en $H$, $tan(β)=\\dfrac{h}{BH}$.<br>D'où $h=BH\\times tan(β)$.<br>`
          texte_corr += `<br>Dans le triangle $AHS$ rectangle en $H$, $tan(α)=\\dfrac{h}{AH}$.<br>D'où $h=AH\\times tan(α)$.<br>`
          texte_corr += `Or $AH=AB+BH$ donc $h=(AB+BH)\\times tan(α)$.<br>`
          texte_corr += `On en déduit que $BH\\times tan(β)=(AB+BH)\\times tan(α)$ soit $BH\\times tan(β)=AB\\times tan(α)+BH\\times tan(α)$.<br>`
          texte_corr += `D'où $AB\\times tan(α)=BH\\times tan(β)-BH\\times tan(α)=BH\\times (tan(β)-tan(α))$.<br>`
          texte_corr += `Et $BH=\\dfrac{AB\\times tan(α)}{tan(β)-tan(α)}$.<br>`
          texte_corr += `Ainsi $h=BH\\times tan(β)=\\dfrac{AB\\times tan(α)\\times tan(β)}{tan(β)-tan(α)}$.<br>`
          texte_corr += `Application numérique : <br>`
          texte_corr += `$h=\\dfrac{${distance}\\times tan(${alpha})\\times tan(${alpha + 5})}{tan(${alpha + 5})-tan(${alpha})}\\approx ${Math.round(taille)}$ m.<br>`
          texte_corr += `$BH=\\dfrac{${distance}\\times tan(${alpha})}{tan(${alpha + 5})-tan(${alpha})}\\approx ${tex_nombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m.<br>`
          texte_corr += `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${tex_nombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de celle-ci lors du deuxième relevé.<br>`;
          break;
        case 'type3': // Mesurer une montagne à grande distance
        objets=[]
          alpha = randint(25, 45)
          j=0
          beta = alpha+randint(1,3)
          taille = randint(20,50)*100
          distance = Math.round(taille*Math.sin((beta-alpha)*Math.PI/180)/Math.sin(alpha*Math.PI/180)/Math.sin(beta*Math.PI/180))
          taille=Math.round(distance*Math.sin(alpha*Math.PI/180)*Math.sin(beta*Math.PI/180)/Math.sin((beta-alpha)*Math.PI/180))
          A = point(0, 0, 'A')
          B = pointAdistance(A, 5, 0, 'B')
          H = pointAdistance(A, 12, 0, 'H')
          S = pointAdistance(H, 7, 90, 'S')
          C = projectionOrtho(B, droite(A, S), 'C')
          p = polygoneAvecNom(A, B, H, S, C)
          objets.push(p[1], p[0], segment(C, B), segment(S, B), codageAngleDroit(A, H, S),codageAngleDroit(B,C,S))
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, `α`), afficheMesureAngle(H, B, S, 'black', 2, `β`))
          objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`h`, milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, "middle", true))

          texte = `Un voyageur approche d'une montagne. Il aimerait en calculer la hauteur.<br>`;
          texte += `Pour cela, il utilise un théodolite en un point $A$ qui lui permet de mesurer l'angle $α$ vertical formé par le sommet $S$ de la montagne, le point $A$ et la base de la montagne $H$.<br>`
          texte += `Il parcourt ensuite $${distance}$ m en direction de la montagne et effectue une nouvelle mesure de l'angle $β$ en un point $B$.<br>`
          texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>On donne : $α=${alpha}\\degree$, $β=${beta}\\degree$ et $AB=${distance}$ m.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)+'<br>';

          if (this.sup2) {
            texte += `${num_alpha(j)}Exprimer la mesure de l'angle $\\widehat{BSH}$ en fonction de $β$.<br>`
            texte += `${num_alpha(j+1)}Exprimer la mesure de l'angle $\\widehat{ASH}$ en fonction de $α$.<br>`
            j+=2
          }
          texte+=`${num_alpha(j)}Montrer que $\\widehat{BSC}=β-α$.<br>`
          j++
          if (this.sup2) {
            texte+=`${num_alpha(j)}Dans le triangle $BCS$ exprimer $BS$ en fonction de $BC$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}Exprimer $BS$ en fonction de $BC$.<br>`
          }
          j++
          if (this.sup2) {
            texte+=`${num_alpha(j)}Dans le triangle $ABC$, exprimer $BC$ en fonction de $AB$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}Exprimer $BC$ en fonction de $AB$.<br>`
          }
          j++
          if (this.sup2){
            texte+=`${num_alpha(j)}En déduire $h$ en fonction de $BS$ puis en fonction de $BC$ enfin en fonction de $AB$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}En déduire $h$ en fonction de $AB$.<br>`
          }
          j++
          texte += `${num_alpha(j)}Quelle est la hauteur de la montagne (arrondir au mètre près) ?<br>`
          texte += `On supposera le point d'observation au niveau du sol.`
          j=0
          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)+'<br>'
          if (this.sup2) {
            texte_corr += `${num_alpha(j)}Dans le triangle $BHS$ rectangle en $H$, les angles aigus sont complémentaires donc $\\widehat{BSH}=90-β$.<br>`
            texte_corr += `${num_alpha(j+1)}Dans le triangle $AHS$ rectangle en $H$, pour la même raison $\\widehat{ASH}=90-α$.<br>`
            j+=2
          }
          texte_corr+=`${num_alpha(j)}On sait que $\\widehat{BSH}=90-β$ et $\\widehat{ASH}=90-α$.<br>Donc $\\widehat{BSC}=\\widehat{ASH}-\\widehat{BSH}=90-α-(90-β)=\\cancel{90}-α-\\cancel{90}+β=β-α$.<br>`
          j++
            texte_corr+=`${num_alpha(j)}Dans le triangle $BCS$ rectangle en $C$, $sin(\\widehat{BSC})=\\dfrac{BC}{BS}$ d'où $BS=\\dfrac{BC}{sin(\\widehat{BSC})}=\\dfrac{BC}{sin(β-α)}$.<br>`
          j++
            texte_corr+=`${num_alpha(j)}Dans le triangle $ABC$ rectangle en $C$, $sin(\\widehat{BAC})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times sin(\\widehat{BAC})=AB\\times sin(α)$.<br>`
          j++

            texte_corr+=`${num_alpha(j)}Dans le triangle $BHS$ rectangle en $H$, $h=BS\\times sin(β)=\\dfrac{BC}{sin(β-α)}\\times sin(β)=\\dfrac{AB\\times sin(α)}{sin(β-α)}\\times sin(β)$<br>`

          j++
          texte_corr += `${num_alpha(j)}Application numérique : $h=\\dfrac{${distance}\\times sin(${alpha})}{sin(${beta}-${alpha})}\\times sin(${beta})$`
          texte_corr  +=`$=\\dfrac{${distance}\\times sin(${alpha})\\times sin(${beta})}{sin(${beta-alpha})}\\approx ${Math.round(taille)}$ m.<br>`
          break;
          case 'type4': // mesurer un parallèle terrestre.
          objets=[]
          alpha=randint(30,60)
          O=point3d(0,0,0,false,'O')
          M=point3d(5,0,0,true,'M')
          PoleNord=point3d(0,0,5,false,'N')
          PoleSud=point3d(0,0,-5,false,'S')
          R=vecteur3d(O,M)
          Axe=arete3d(PoleSud,PoleNord)
          normalV=vecteur3d(0,0,1)
          M=rotationV3d(M,normalV,mathalea.anglePerspective)
          M.p2d.nom='M'
          normalH=rotationV3d(R,normalV,90)
          P=rotationV3d(M,normalH,-alpha)
          P.p2d.nom='P'
          H=point3d(0,0,P.z3d,false)
          R2=vecteur3d(H,P)
          H.p2d.nom='H'
          Sph=sphere3d(O,5,1,3)
          HP=arete3d(H,P)
          OP=arete3d(O,P)
          objets.push(Sph,Axe.p2d,HP.p2d,OP.p2d,codageAngleDroit(P.p2d,H.p2d,O.p2d),tracePoint(H.p2d,P.p2d,O.p2d,M.p2d),labelPoint(H.p2d,P.p2d,O.p2d,M.p2d))
          objets.push(demicercle3d(H,normalV,R2,'caché','red',0),demicercle3d(H,normalV,R2,'visible','red',0))
          objets.push(arete3d(O,M).p2d)
          objets.push(afficheMesureAngle(M.p2d,O.p2d,P.p2d,'black',1.5,`${alpha}`))
          texte=mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 1 }, objets)+'<br>'
          texte+=`Quelle est la longueur du $${alpha}$ième parallèle Nord ?`
          texte_corr=mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 1 }, objets)+'<br>'
          texte_corr+=`Considérons que le $${alpha}$ième parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la terre.<br>`
          texte_corr+=`Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>`
          texte_corr+=`Dans le triangle $OPH$ rectangle en $H$, $cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d'où $HP=OP\\times cos(\\widehat{OPH})$.<br>`
          texte_corr+=`Le rayon de la terre étant approximativement de $6400$ km, nous pouvons calculer $HP$ :<br>`
          texte_corr+=`$HP=6400\\times cos(${alpha})\\approx ${tex_nombrec(6400*Math.cos(alpha*Math.PI/180))}$ km.<br>`
          texte_corr+=`Calculons maintenant la longueur $L$ du $${alpha}$ième parallèle : $L\\approx 2\\times \\Pi\\times ${tex_nombrec(6400*Math.cos(alpha*Math.PI/180))}\\approx ${tex_nombrec(2*Math.PI*6400*Math.cos(alpha*Math.PI/180))}$ km.<br>`
          break;
          case 'type5': // Mesurer la largeur d'une rivière
          objets=[]
            alpha = randint(25, 65)
            j=0
            beta = alpha+randint(2,5)
            distance=randint(7,15)*10
            taille=Math.round(distance*(Math.tan(beta*Math.PI/180)-Math.tan(alpha*Math.PI/180)))
            A = point(0, 7, 'A')
            B = point(0, 0, 'B')
            C = point(7, 0, 'C')
            S = point(12,0, 'S')
            p = polygoneAvecNom(A, B, C,S)
            R = polygoneAvecNom(point(7,-1),point(12,-1),point(12,8),point(7,8))
            R[0].color='blue'
            R[0].couleurDeRemplissage='blue'
            R[0].opaciteDeRemplissage=0.5
            R[0].opacite=0.5
            objets.push(p[1], p[0],R[0], segment(A, C),  codageAngleDroit(A, B, C))
            objets.push(afficheMesureAngle(B,A,C, 'black', 1, `α`), afficheMesureAngle(B,A,S, 'black', 2, `β`))
            objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`l`, milieu(C, S).x, milieu(C, S).y+0.5, 0, 'black', 2, "middle", true))
  
            texte = `Un géomètre veut mesurer la largeur d'une rivière.<br>`
            texte+=`Pour cela, il remarque une souche notée $S$ sur la rive opposée.<br>`;
            texte += `Il a placé un cône sur sa rive en face de la souche, son emplacement est noté $C$.<br>`
            texte+=`Ensuite il s'est éloigné de la berge en restant aligné avec la souche $S$ et le cône $C$ jusqu'à un endroit où il place un bâton noté $B$.<br>`
            texte+=`Du bâton, il effectue un quart de tour et s'éloigne d'une distance de $${distance}$ m jusqu'à son appareil de mesure noté $A$.<br>`
            texte+=`A l'aide de son appareil, il mesure l'angle $\\widehat{BAC}$ noté $α$  et l'angle $\\widehat{BAS}$ noté $β$.<br>`
            if (this.sup2) {
              texte+=`${num_alpha(j)}Exprimer $BC$ en fonction de $AB$ et de $α$.<br>`
              j++
              texte+=`${num_alpha(j)}Exprimer $BS$ en fonction de $AB$ et de $β$.<br>`
              j++
            }
            texte+=`${num_alpha(j)}Exprimer $CS$ en fonction de $AB$, de $α$ et de $β$.<br>`
            j++
            texte+=`${num_alpha(j)}Calculer la largeur de la rivière au mètre près sachant que $α=${alpha}\\degree$ et $β=${beta}\\degree$.<br>`
            texte+=mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)+'<br>';
            j=0
            texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)+'<br>'
            if (this.sup2) {
              texte_corr+=`${num_alpha(j)}Dans le triangle $ABC$ rectangle en $B$ on a : $tan(α)=\\dfrac{BC}{AB}$ d'où $BC=AB\\times tan(α)$.<br>`
              j++
              texte_corr+=`${num_alpha(j)}Dans le triangle $ABS$ rectangle en $B$ on a : $tan(β)=\\dfrac{BS}{AB}$ d'où $BS=AB\\times tan(β)$.<br>`
              j++
            }
            texte_corr+=`${num_alpha(j)}Comme $BS=AB\\times tan(β)$ et $BC=AB\\times tan(α)$, alors $CS=AB\\times (tan(β)-tan(α))$.<br>`
            j++
            texte_corr+=`${num_alpha(j)}Donc $CS=${distance}\\times (tan(${beta})-tan(${alpha}))\\approx ${taille}$ m.<br>`

            break;
           
        }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3,'1 : Problèmes faciles\n 2 : Problèmes difficiles\n 3 : Au hasard'];
  this.besoin_formulaire2_case_a_cocher = ['Afficher un schéma et des questions intermédiaires'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

