import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,creerNomDePolygone} from "/modules/outils.js"
import {point,barycentre,vecteur,polygone,carre,nommePolygone,translation,rotation,homothetie,similitude,codageAngleDroit,codeSegments,codeAngle,grille,seyes,mathalea2d} from "/modules/2d.js"
/**
 * @Auteur Jean-Claude Lhote
 * Placer les sommets et les égalités de longueur...
 * Référence 6G20
 */
export default function Nommer_et_coder_des_polygones() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Nommer et coder des polygones";
  this.consigne = "Nommer les figures en fonction de l'énoncé puis ajouter le codage.";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 3;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, ppc, sc, g, carreaux
    ppc = 40
    if (sortie_html) {
      sc = 0.5
    } else {
      sc = 0.4
    }

    let params

    let liste = combinaison_listes([1, 2, 3, 4, 5, 6, 7, 8], this.nb_questions);

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      mathalea.pixelsParCm = 40;
      let pol, polcode, polsom, polnom
      function choisir_polygone(n) { // n compris entre 1 et 8 (1 à 4 pour un triangle, 5 à 8 pour une quadrilatère)
        let A, B, C, D
        let nom = creerNomDePolygone(4, "PQ"), pnom, q, p, pcode, enonce
        switch (n) {
          case 1: // triangle isocèle
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(0, 10) / 10, nom[1])
            C = rotation(B, A, randint(25, 80), nom[2])
            q = polygone(A, B, C)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2])
            pcode = [codeSegments('||', 'blue', A, B, A, C), codeAngle(B, C, A, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2), codeAngle(C, B, A, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2)]
            enonce = `le triangle $${nom[0] + nom[1] + nom[2]}$ est isocèle en $${nom[0]}$.<br>`
            break
          case 2: // triangle équilatéral
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(0, 10) / 10, nom[1])
            C = rotation(B, A, 60, nom[2])
            q = polygone(A, B, C)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2])
            pcode = [codeSegments('||', 'blue', A, B, A, C, B, C), codeAngle(B, C, A, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2), codeAngle(C, B, A, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2), codeAngle(C, A, B, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2)]
            enonce = `le triangle $${nom[0] + nom[1] + nom[2]}$ est équilatéral.<br>$\\phantom{et sa longueur est AB}$`
            break
          case 3: // triangle rectangle
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(0, 10) / 10, nom[1])
            C = similitude(B, A, 90, randint(30, 100) / 100, nom[2])
            q = polygone(A, B, C)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2])
            pcode = codageAngleDroit(B, A, C)
            enonce = `le triangle $${nom[0] + nom[1] + nom[2]}$ est rectangle en $${nom[0]}$.<br>$\\phantom{et sa longueur est AB}$`
            break
          case 4: // triangle rectangle isocèle
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(0, 10) / 10, nom[1])
            C = rotation(B, A, 90, nom[2])
            q = polygone(A, B, C)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2])
            pcode = [codeSegments('||', 'blue', A, B, A, C), codageAngleDroit(B, A, C), codeAngle(B, C, A, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2), codeAngle(C, B, A, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2)]
            enonce = `le triangle $${nom[0] + nom[1] + nom[2]}$ est rectangle et isocèle en $${nom[0]}$.`
            break
          //on choisit un quadrilatère 
          case 5: // carré
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(10, 30) / 10, nom[1])
            q = carre(A, B)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            D = p.listePoints[3]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2] + nom[3])
            pcode = [codeSegments('||', 'blue', A, B, B, C, C, D, D, A), codageAngleDroit(B, A, D), codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(A, D, C)]
            enonce = `le quadrilatère $${nom[0] + nom[1] + nom[2] + nom[3]}$ est un carré.<br>$\\phantom{et sa longueur est AB}$`
            break
          case 6: // rectangle
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(10, 30) / 10, nom[1])
            C = similitude(A, B, -90, randint(30, 80) / 100, nom[2])
            D = translation(C, vecteur(B, A), nom[3])
            q = polygone(A, B, C, D)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            D = p.listePoints[3]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2] + nom[3])
            pcode = [codeSegments('||', 'blue', A, B, C, D), codeSegments('|', 'red', C, B, A, D), codageAngleDroit(B, A, C), codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(A, D, C)]
            enonce = `le quadrilatère $${nom[0] + nom[1] + nom[2] + nom[3]}$ est un rectangle et $${nom[0] + nom[1]}$ est sa longueur.`
            break
          case 7: // losange
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(10, 30) / 10, nom[1])
            C = rotation(A, B, randint(100, 150), nom[2])
            D = translation(C, vecteur(B, A), nom[3])
            q = polygone(A, B, C, D)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            D = p.listePoints[3]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2] + nom[3])
            pcode = [codeSegments('O', 'blue', A, B, B, C, C, D, D, A), codeAngle(C, D, A, 0.8, '||', 'red', 2, 0.8, 'red', 0.2), codeAngle(C, B, A, 0.8, '||', 'red', 2, 0.8, 'red', 0.2), codeAngle(B, C, D, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2), codeAngle(D, A, B, 0.8, '|', 'blue', 2, 0.8, 'blue', 0.2)]
            enonce = `le quadrilatère $${nom[0] + nom[1] + nom[2] + nom[3]}$ est un losange et [$${nom[0] + nom[2]}$] est sa plus grande diagonale.`
            break
          case 8: // trapèze rectangle
            A = point(3, randint(0, 20) / 10, nom[0])
            B = point(randint(7, 8), randint(10, 30) / 10, nom[1])
            D = similitude(B, A, 90, randint(30, 80) / 100, nom[3])
            C = translation(D, homothetie(vecteur(A, B), A, randint(30, 80) / 100), nom[2])
            q = polygone(A, B, C, D)
            p = rotation(q, barycentre(q), randint(0, 360))
            A = p.listePoints[0]
            B = p.listePoints[1]
            C = p.listePoints[2]
            D = p.listePoints[3]
            pnom = nommePolygone(p, nom[0] + nom[1] + nom[2] + nom[3])
            pcode = [codageAngleDroit(B, A, D), codageAngleDroit(C, D, A)]
            enonce = `le quadrilatère $${nom[0] + nom[1] + nom[2] + nom[3]}$ est un trapèze rectangle de grande base $${nom[0] + nom[1]}$ de hauteur $${nom[0] + nom[3]}$.`
            break
        }
        return [p, nom, pcode, pnom, enonce]
      }
      [pol, polnom, polcode, polsom, texte] = choisir_polygone(liste[i]);
      if (pol.listePoints.length == 4) {
        Xmin = Math.floor(Math.min(pol.listePoints[0].x, pol.listePoints[1].x, pol.listePoints[2].x, pol.listePoints[3].x) - 1)
        Ymin = Math.floor(Math.min(pol.listePoints[0].y, pol.listePoints[1].y, pol.listePoints[2].y, pol.listePoints[3].y) - 1)
        Xmax = Math.ceil(Math.max(pol.listePoints[0].x, pol.listePoints[1].x, pol.listePoints[2].x, pol.listePoints[3].x) + 1)
        Ymax = Math.ceil(Math.max(pol.listePoints[0].y, pol.listePoints[1].y, pol.listePoints[2].y, pol.listePoints[3].y) + 1)
      }
      else {
        Xmin = Math.floor(Math.min(pol.listePoints[0].x, pol.listePoints[1].x, pol.listePoints[2].x) - 1)
        Ymin = Math.floor(Math.min(pol.listePoints[0].y, pol.listePoints[1].y, pol.listePoints[2].y) - 1)
        Xmax = Math.ceil(Math.max(pol.listePoints[0].x, pol.listePoints[1].x, pol.listePoints[2].x) + 1)
        Ymax = Math.ceil(Math.max(pol.listePoints[0].y, pol.listePoints[1].y, pol.listePoints[2].y) + 1)

      }
      params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: ppc,
        scale: sc,
      }
      if (this.sup < 3) g = grille(Xmin, Ymin, Xmax, Ymax, "gray", 0.7);
      else g = ''
      if (this.sup == 2) {
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax);
      } else {
        carreaux = "";
      }

      pol.epaisseur = 2
      texte += `<br>` + mathalea2d(params, pol, polnom, g, carreaux)
      texte_corr = mathalea2d(params, pol, polnom, polcode, polsom, g, carreaux)
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
    mathalea.pixelsParCm = 20
  };
  this.besoin_formulaire_numerique = [
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];
}

