import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,num_alpha, calcul, randint} from "/modules/outils.js"
import {mathalea2d, droite, tracePointSurDroite, labelPoint, tracePoint, rotation, translation2Points, homothetie, symetrieAxiale, point} from "/modules/2d.js"
import Alea2iep from '../../modules/Alea2iep.js';

export default function Exercice_zero_mathalea2d() {
    Exercice.call(this)
    this.titre = "Utiliser toutes les transformations";
    this.nb_questions = 1; // Ici le nombre de questions
    this.nb_questions_modifiable = false // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.consigne = 'Construire les points suivants.'
    this.video = 'hFoN9sMWnac'
    this.type_exercice = "IEP";

    this.nouvelle_version = function (numeroExercice) {
      const anim = new Alea2iep()
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
  
      let objets_enonce,objets_enonceml,objets_correction,params_enonce,params_correction
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        texte = `${num_alpha(0)} $M_1$ symétrique de $M$ par rapport à $(AB)$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte+= '<br><br>'
        texte += `${num_alpha(1)} $M_2$ symétrique de $M$ par rapport à $O$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte+= '<br><br>'
        texte += `${num_alpha(2)} $M_3$ image de $M$ dans la translation qui transforme $A$ en $B$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte+= '<br><br>'
        texte += `${num_alpha(3)} $M_4$ image de $M$ dans la rotation de centre $O$ et de $60$° dans le sens anti-horaire.` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte+= '<br><br>'
        texte += `${num_alpha(4)} $M_5$ image de $M$ dans l'homothétie de centre $A$ et de rapport $3$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte+= '<br><br>'
        texte += `${num_alpha(5)} $M_6$ image de $M$ dans l'homothétie de centre $A$ et de rapport $-2$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.
        
        let A = point(0,2,'A','right')
        let B = point(calcul(randint(20,30)/10),calcul(randint(60,80)/10),'B','right')
        let d = droite(A,B)
        let tA = tracePointSurDroite(A,d)
        let tB = tracePointSurDroite(B,d)
        let M = point(calcul(randint(20,40)/10)*(-1),0,'M')
        let O = point(randint(4,7)*(-1),randint(2,4),'O')
        let M1 = symetrieAxiale(M,d,'M1')
        let M2 = rotation(M,O,180,'M2')
        let M3 = translation2Points(M,A,B,'M3')
        let M4 = rotation(M,O,-60,'M4')
        let M5 = homothetie(M,A,3,'M5')
        let M6 = homothetie(M,A,-2,'M6')
        let tenonce = tracePoint(M,O)
        let tcorr = tracePoint(M1,M2,M3,M4,M5,M6)
        let lenonce = labelPoint(A,B,M,O)
        let lcorr = labelPoint(M1,M2,M3,M4,M5,M6)

        objets_enonce = [d,tA,tB,lenonce,tenonce] // on initialise le tableau des objets Mathalea2d de l'enoncé
        objets_correction = [...objets_enonce, lcorr,tcorr] // Idem pour la correction

//mathalea.fenetreMathalea2d = [Math.min(M1.x-1,M2.x-1,M3.x-1,M4.x-1,M5.x-1,M6.x-1),Math.min(M1.y-1,M2.y-1,M3.y-1,M4.y-1,M5.y-1,M6.y-1),Math.max(M1.x+1,M2.x+1,M3.x+1,M4.x+1,M5.x+1,M6.x+1),Math.max(M1.y+1,M2.y+1,M3.y+1,M4.y+1,M5.y+1,M6.y+1,B.y+1)]

        anim.recadre(Math.min(M1.x-1,M2.x-1,M3.x-1,M4.x-1,M5.x-1,M6.x-1),Math.max(M1.y+1,M2.y+1,M3.y+1,M4.y+1,M5.y+1,M6.y+1,B.y+1))
        anim.vitesse=1000
        anim.tempo=0
        anim.pointsCreer(A,B,M,O)
        anim.regleDroite(A,B)
        anim.vitesse=10
        anim.tempo=1
        anim.symetrieAxialePoint(M,d,'M1',{couleur:'blue',couleurCodage:'lightblue',codage:'//'})
        anim.rotationPoint(M,O,-60,'M4',{couleur:'green',couleurCodage:'lightgreen'})
        anim.translationPoint(M,A,B,'M3',{couleur:'red',couleurCodage:'pink',codage:'O'})
        anim.homothetiePoint(M,A,3,'M5',{couleur:'purple',couleurCodage:'magenta'})
        anim.homothetiePoint(M,A,-2,'M6',{couleur:'black',couleurCodage:'grey'})
 
        params_enonce = { xmin: Math.min(M1.x-1,M2.x-1,M3.x-1,M4.x-1,M5.x-1,M6.x-1), ymin: Math.min(M1.y-1,M2.y-1,M3.y-1,M4.y-1,M5.y-1,M6.y-1), xmax: Math.max(M1.x+1,M2.x+1,M3.x+1,M4.x+1,M5.x+1,M6.x+1), ymax: Math.max(M1.y+1,M2.y+1,M3.y+1,M4.y+1,M5.y+1,M6.y+1,B.y+1), pixelsParCm: 20, scale: 1, mainlevee: false }
  //paramètres de la fenêtre Mathalea2d pour la correction
        params_correction = { xmin: Math.min(M1.x-1,M2.x-1,M3.x-1,M4.x-1,M5.x-1,M6.x-1), ymin: Math.min(M1.y-1,M2.y-1,M3.y-1,M4.y-1,M5.y-1,M6.y-1), xmax: Math.max(M1.x+1,M2.x+1,M3.x+1,M4.x+1,M5.x+1,M6.x+1), ymax: Math.max(M1.y+1,M2.y+1,M3.y+1,M4.y+1,M5.y+1,M6.y+1,B.y+1), pixelsParCm: 20, scale: 1, mainlevee: false }
        
  // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
        texte+= '<br><br>'
        texte += mathalea2d(params_enonce, objets_enonce)
  // On ajoute au texte de la correction, la figure de la correction
        texte_corr += mathalea2d(params_correction, objets_correction)
        texte_corr +='<br>'+ anim.html(numeroExercice)
        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
 
  
  } 
  