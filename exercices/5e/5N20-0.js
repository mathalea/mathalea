import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, randint, shuffle, combinaison_listes_sans_changer_ordre, calcul, texte_en_couleur, texte_gras, num_alpha } from '/modules/outils.js'
import { point, labelPoint, segment, cercleCentrePoint, rotation, codageAngleDroit, codeAngle, mathalea2d } from '/modules/2d.js'
/**
 * * résoudre un problème additif de fractions niv 5e
 * * 5N20-0
 * @author Sébastien Lozano
 */
export default function Problemes_additifs_fractions_5e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1
  this.nb_questions=1

  this.titre = 'Résoudre un problème en utilisant des fractions';
  this.consigne = 'Calculatrice autorisée.';

  this.nb_cols = 1
  this.nb_cols_corr = 1
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 1 : this.spacing = 1
  sortie_html ? this.spacing_corr = 1 : this.spacing_corr = 1

  let type_de_questions_disponibles

  this.nouvelle_version = function () {
    if (this.debug) {
      type_de_questions_disponibles = [0]
    } else {
      // type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      type_de_questions_disponibles = [0]
    };

    this.liste_questions = [] // Liste de questions
    this.liste_corrections = [] // Liste de questions corrigées		

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // on définit les fractions pour les vols et les arguments pour le graphique
      let frac_vols = [
        [1, 12, [1.8, ' ', 'black', 2, 1, 'red', 0.4]],
        [1, 12, [1.8, ' ', 'black', 2, 1, 'red', 0.4]],
        [1, 12, [1.8, ' ', 'black', 2, 1, 'red', 0.4]],
        [1, 4, [1.8, ' ', 'black', 2, 1, 'blue', 0.4]],
        [1, 2, [1.8, ' ', 'black', 2, 1, 'green', 0.4]]
      ]
      // on mélange pour l'aléatoire tant que les deux premieres fractions sont égales
      do {
        frac_vols = shuffle(frac_vols)
      } while (frac_vols[0][1] == frac_vols[1][1])


      // let q1a = randint(1,5); // indice pour faire varier la 1ere question sur la destination
      // let q1b = randint(1,5,[q1a]); // indice pour faire varier la 2eme question sur la destination
      let nb_vols_total
      let destinations_vols = [['l\'', 'Afrique'], ['l\'', 'Asie'], ['l\'', 'Amerique'], ['l\'', 'Europe'], ['la', ' France']]
      destinations_vols = shuffle(destinations_vols)
      do {
        nb_vols_total = randint(200, 600)
      } while (nb_vols_total % 2 != 0 || nb_vols_total % 3 != 0 || nb_vols_total % 4 != 0)

      // pour les situations
      const situations = [
        { // case 0 --> vols
          fin_enonce_situation: 'vols d\'une compagnie aérienne selon la destination',
          nom_enonce: 'vols',
          last_question: ['cette compagnie a affrété', 'vols', 'le nombre de vols', 'Le nombre de vols'],
          cat1: {
            destination: destinations_vols[0][0] + destinations_vols[0][1],
            article: destinations_vols[0][0],
            nom: destinations_vols[0][1],
            frac: frac_vols[0],
            angle: calcul(360 / frac_vols[0][1]),
            arg_graph: frac_vols[0][2]
          },
          cat2: {
            destination: destinations_vols[1][0] + destinations_vols[1][1],
            article: destinations_vols[1][0],
            nom: destinations_vols[1][1],
            frac: frac_vols[1],
            angle: calcul(360 / frac_vols[1][1]),
            arg_graph: frac_vols[1][2]
          },
          cat3: {
            destination: destinations_vols[2][0] + destinations_vols[2][1],
            article: destinations_vols[2][0],
            nom: destinations_vols[2][1],
            frac: frac_vols[2],
            angle: calcul(360 / frac_vols[2][1]),
            arg_graph: frac_vols[2][2]
          },
          cat4: {
            destination: destinations_vols[3][0] + destinations_vols[3][1],
            article: destinations_vols[3][0],
            nom: destinations_vols[3][1],
            frac: frac_vols[3],
            angle: calcul(360 / frac_vols[3][1]),
            arg_graph: frac_vols[3][2]
          },
          cat5: {
            destination: destinations_vols[4][0] + destinations_vols[4][1],
            article: destinations_vols[4][0],
            nom: destinations_vols[4][1],
            frac: frac_vols[4],
            angle: calcul(360 / frac_vols[4][1]),
            arg_graph: frac_vols[4][2]
          },
          // q1a:q1a,
          // q1b:q1b,
          nb_total: nb_vols_total,
          fig: ''
        },
        {// case 1 --> courses
        },
        {// case 2 --> activités sportives
        },
        {// case 3 -->
        },
        {// case 4 -->
        }
      ]
      // une fonction pour gérer le codage des angles
      function myCodageAngle (A, O, B, angle, [...args]) {
        if (angle == 90) {
          return codageAngleDroit(A, O, B)
        } else {
          return codeAngle(A, O, angle, ...args)
        };
      };

      // une fonction pour gérer l'affichage correct de la légende
      // param est l'ordonnée du point qui sert à la mediatrice !
      ;

      // une fonction pour positionner le label
      // y est l'ordonnée du point
      function myLabelPosition (y) {
        if (y < 0) {
          return 'below'
        } else {
          return 'above'
        };
      };

      // une fonction pour gérer le texte en fonction de l'angle
      function myTexte_vols_corr (angle) {
        switch (angle) {
          case 90:
            return `du secteur est un angle droit, il mesure $${angle}\\degree$ sur les $360\\degree$ d'un tour complet, donc il représente $\\dfrac{${angle}}{360}$ du disque soit $\\dfrac{1}{4}$.`
          case 30:
            return `rouge apparaît 3 fois, l'angle vert vaut $180\\degree$ et il y a un angle droit.<br>
							L'angle pour un tour complet vaut $360\\degree$, donc l'angle rouge vaut $(360-180-90)\\div 3 = ${angle}\\degree$.<br>
							L'angle rouge mesure $${angle}\\degree$ sur les $360\\degree$ d'un tour complet, donc il représente $\\dfrac{${angle}}{360}$ du disque soit $\\dfrac{1}{12}$.
							`
          case 180:
            return `du secteur est un angle plat, il mesure $${angle}\\degree$ sur les $360\\degree$ d'un tour complet, donc il représente $\\dfrac{${angle}}{360}$ du disque soit $\\dfrac{1}{2}$.`

        }
      };

      // on prépare la fenetre mathalea2d
      const fenetreMathalea2D = { xmin: -10, ymin: -8, xmax: 10, ymax: 8, pixelsParCm: 20, scale: 0.5 }
      const O_vols = point(0, 0)
      let A_vols = point(fenetreMathalea2D.xmin + 6, 0)
      let c_vols = cercleCentrePoint(O_vols, A_vols, 'blue')
      c_vols.epaisseur = 2
      // on trace les quartiers
      //cat1
      let B_vols = rotation(A_vols, O_vols, situations[0].cat1.angle)
      let s_OA_vols = segment(O_vols, A_vols)
      let s_OB_vols = segment(O_vols, B_vols)
      let codage_AOB = myCodageAngle(A_vols, O_vols, B_vols, situations[0].cat1.angle, situations[0].cat1.arg_graph)
      // cat2
      const C_vols = rotation(B_vols, O_vols, situations[0].cat2.angle)
      let s_OC_vols = segment(O_vols, C_vols)
      let codage_BOC = myCodageAngle(B_vols, O_vols, C_vols, situations[0].cat2.angle, situations[0].cat2.arg_graph)
      // cat3
      const D_vols = rotation(C_vols, O_vols, situations[0].cat3.angle)
      let s_OD_vols = segment(O_vols, D_vols)
      let codage_COD = myCodageAngle(C_vols, O_vols, D_vols, situations[0].cat3.angle, situations[0].cat3.arg_graph)
      // cat4
      const E_vols = rotation(D_vols, O_vols, situations[0].cat4.angle)
      let s_OE_vols = segment(O_vols, E_vols)
      let codage_DOE = myCodageAngle(D_vols, O_vols, E_vols, situations[0].cat4.angle, situations[0].cat4.arg_graph)
      // cat5
      const F_vols = rotation(E_vols, O_vols, situations[0].cat5.angle)
      let s_OF_vols = segment(O_vols, F_vols)
      let codage_EOF = myCodageAngle(E_vols, O_vols, F_vols, situations[0].cat5.angle, situations[0].cat5.arg_graph)

      // légende
      const A_legende = point(fenetreMathalea2D.xmin + 4, 0)
      let L_vols_cat1 = rotation(A_legende, O_vols, situations[0].cat1.angle / 2, situations[0].cat1.nom)
      L_vols_cat1.positionLabel = myLabelPosition(L_vols_cat1.y)
      let LL_vols_cat1 = rotation(A_vols, O_vols, situations[0].cat1.angle / 2, situations[0].cat1.nom)
      let s_legende_cat1 = segment(L_vols_cat1, LL_vols_cat1)
      s_legende_cat1.styleExtremites = '->'
      s_legende_cat1.pointilles = true

      let L_vols_cat2 = rotation(L_vols_cat1, O_vols, situations[0].cat1.angle / 2 + situations[0].cat2.angle / 2, situations[0].cat2.nom)
      L_vols_cat2.positionLabel = myLabelPosition(L_vols_cat2.y)
      let LL_vols_cat2 = rotation(B_vols, O_vols, situations[0].cat2.angle / 2, situations[0].cat2.nom)
      let s_legende_cat2 = segment(L_vols_cat2, LL_vols_cat2)
      s_legende_cat2.styleExtremites = '->'
      s_legende_cat2.pointilles = true

      let L_vols_cat3 = rotation(L_vols_cat2, O_vols, situations[0].cat2.angle / 2 + situations[0].cat3.angle / 2, situations[0].cat3.nom)
      L_vols_cat3.positionLabel = myLabelPosition(L_vols_cat3.y)
      let LL_vols_cat3 = rotation(C_vols, O_vols, situations[0].cat3.angle / 2, situations[0].cat3.nom)
      let s_legende_cat3 = segment(L_vols_cat3, LL_vols_cat3)
      s_legende_cat3.styleExtremites = '->'
      s_legende_cat3.pointilles = true

      let L_vols_cat4 = rotation(L_vols_cat3, O_vols, situations[0].cat3.angle / 2 + situations[0].cat4.angle / 2, situations[0].cat4.nom)
      L_vols_cat4.positionLabel = myLabelPosition(L_vols_cat4.y)
      let LL_vols_cat4 = rotation(D_vols, O_vols, situations[0].cat4.angle / 2, situations[0].cat4.nom)
      let s_legende_cat4 = segment(L_vols_cat4, LL_vols_cat4)
      s_legende_cat4.styleExtremites = '->'
      s_legende_cat4.pointilles = true

      let L_vols_cat5 = rotation(L_vols_cat4, O_vols, situations[0].cat4.angle / 2 + situations[0].cat5.angle / 2, situations[0].cat5.nom)
      L_vols_cat5.positionLabel = myLabelPosition(L_vols_cat5.y)
      let LL_vols_cat5 = rotation(E_vols, O_vols, situations[0].cat5.angle / 2, situations[0].cat5.nom)
      let s_legende_cat5 = segment(L_vols_cat5, LL_vols_cat5)
      s_legende_cat5.styleExtremites = '->'
      s_legende_cat5.pointilles = true


      let mesAppels = [
        c_vols,
        s_OA_vols,
        s_OB_vols,
        s_OC_vols,
        s_OD_vols,
        s_OE_vols,
        s_OF_vols,
        codage_AOB,
        codage_BOC,
        codage_COD,
        codage_DOE,
        codage_EOF,
        labelPoint(L_vols_cat1),
        labelPoint(L_vols_cat2),
        labelPoint(L_vols_cat3),
        labelPoint(L_vols_cat4),
        labelPoint(L_vols_cat5),
        s_legende_cat1,
        s_legende_cat2,
        s_legende_cat3,
        s_legende_cat4,
        s_legende_cat5
      ]
      let fig_vols = mathalea2d(
        fenetreMathalea2D,
        mesAppels
      )
      situations[0].fig = fig_vols

      let enonces = []
      let i_sous_question = 0
      let i_sous_question_corr = 0

      for (let k = 0; k < 1; k++) {
        enonces.push({
          enonce: `
					On a représenté sur le diagramme circulaire ci-contre la répartition des ${situations[k].fin_enonce_situation}.<br>
					${texte_gras('Les angles de même couleur ont la même mesure.')}<br>
					${texte_gras('L\'angle vert est un angle plat.')}<br>
					${situations[k].fig}<br>
					${num_alpha(i_sous_question++)} Quelle fraction représente les ${situations[k].nom_enonce} vers ${situations[k].cat1.destination} ?<br>
					${num_alpha(i_sous_question++)} Quelle fraction représente les ${situations[k].nom_enonce} vers ${situations[k].cat2.destination} ?<br>
					${num_alpha(i_sous_question++)} Sachant que ${situations[k].last_question[0]} ${situations[k].nb_total} ${situations[k].last_question[1]}
					et que les ${situations[k].nom_enonce} vers ${situations[k].cat3.destination} représentent $\\dfrac{${situations[k].cat3.frac[0]}}{${situations[k].cat3.frac[1]}}$ de ce total,
					caluler ${situations[k].last_question[2]} vers ${situations[k].cat3.destination}?
												
					`,
          correction: `
					${num_alpha(i_sous_question_corr++)} Pour ${situations[k].cat1.destination} l'angle ${myTexte_vols_corr(situations[k].cat1.angle)}<br>					
					${texte_en_couleur(`La fraction qui représente les ${situations[k].nom_enonce} vers ${situations[k].cat1.destination} vaut donc $\\dfrac{${situations[k].cat1.frac[0]}}{${situations[k].cat1.frac[1]}}$`)}.<br>
					
					${num_alpha(i_sous_question_corr++)} Pour ${situations[k].cat2.destination} l'angle ${myTexte_vols_corr(situations[k].cat2.angle)}<br>				
					${texte_en_couleur(`La fraction qui représente les ${situations[k].nom_enonce} vers ${situations[k].cat2.destination} vaut donc $\\dfrac{${situations[k].cat2.frac[0]}}{${situations[k].cat2.frac[1]}}$`)}<br>

					${num_alpha(i_sous_question_corr++)} Calculons $\\dfrac{${situations[k].cat3.frac[0]}}{${situations[k].cat3.frac[1]}}$ de ${situations[k].nb_total} :<br> 
					$\\dfrac{${situations[k].cat3.frac[0]}}{${situations[k].cat3.frac[1]}}\\times ${situations[k].nb_total} = \\dfrac{${situations[k].cat3.frac[0]}\\times ${situations[k].nb_total}}{${situations[k].cat3.frac[1]}} = \\dfrac{${situations[k].cat3.frac[0]}\\times ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}\\times ${situations[k].cat3.frac[1]}}{${situations[k].cat3.frac[1]}} = \\dfrac{${situations[k].cat3.frac[0]}\\times ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}\\times \\cancel{${situations[k].cat3.frac[1]}}}{\\cancel{${situations[k].cat3.frac[1]}}} = ${situations[k].cat3.frac[0]}\\times ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])} = ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}$<br>
					${texte_en_couleur(`${situations[k].last_question[3]} vers ${situations[k].cat3.destination} vaut donc ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}.`)}
					`
        })
      };

      switch (liste_type_de_questions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>';
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texte_corr = '';
          } else {
            texte_corr = `${enonces[0].correction}`
          };
          break
      }

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte)
        this.liste_corrections.push(texte_corr)
        i++
      }
      cpt++
    }
    liste_de_question_to_contenu(this)

  }
  // this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];
};
