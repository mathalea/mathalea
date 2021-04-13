import Exercice from '../ClasseExercice.js';
import {export_QCM_AMC,liste_de_question_to_contenu,randint,combinaison_listes,texte_en_couleur_et_gras} from "/modules/outils.js"
import {mathalea2d,labyrinthe} from "/modules/2d.js"
/**
 * @Auteur Jean-Claude Lhote
 * Publié le 6/12/2020
 * Ref : c3C10-2 et 6C10-5
 * Parcourir un labyrinthe de nombres en passant par les multiples du nombre choisi.
 */

export default function Exercice_labyrinthe_multiples() {
  "use strict"
  Exercice.call(this)
  this.titre = "Labyrinthe de multiples";
  this.consigne=""
  this.niveau = '6e'
  this.nb_questions = 1;
  this.nb_questions_modifiable = false
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.pas_de_version_LaTeX = false
  this.pas_de_version_HMTL = false
  this.tailleDiaporama = 100;
this.sup3 = 3
  this.sup = 9;
  if (this.niveau = 'CM') {
    this.sup2 = 10;
    this.sup3 = 3;
  }
  else {
    this.sup2 = 13;
    this.sup3 = 4;
  }
  this.nouvelle_version = function () {
    this.liste_corrections=[]
    this.liste_questions=[]
    /*********************************************************/
// On ajoute cette ligne pour AMC
this.QCM=['6C10-5',[],'Labyrinthe de multiples',3,{}]
/**********************************************************/

    let params, texte, texte_corr, trouve
    let laby = labyrinthe()
    laby.niveau = parseInt(this.sup3) // Le niveau (de 1 à 6=mélange) définit le nombre d'étapes
    laby.chemin = laby.choisitChemin(laby.niveau) // On choisi un chemin
    laby.murs2d = laby.construitMurs(laby.chemin) // On construit le labyrinthe
    laby.chemin2d = laby.traceChemin(laby.chemin) // On trace le chemin solution
    let monchemin = laby.chemin
    let table = parseInt(this.sup)
    let maximum = parseInt(this.sup2)
 //   this.consigne=`Trouve la sortie en ne passant que par les cases contenant un multiple de $${table}$.`
    texte = `${texte_en_couleur_et_gras("Trouve la sortie en ne passant que par les cases contenant un multiple de ","black")}$${table}$.<br>`
    texte_corr = `${texte_en_couleur_et_gras(`Voici le chemin en marron et la sortie était la numéro $${2 - monchemin[monchemin.length - 1][1] + 1}$.`, "black")}<br>`
    // Zone de construction du tableau de nombres : Si ils sont sur monchemin et seulement si, ils doivent vérifier la consigne
    let listeMultiples = [], index = 0
    for (let i = 2; i <= maximum; i++){
      listeMultiples.push(table * i)
    }
    listeMultiples = combinaison_listes(listeMultiples, 12)
    for (let a=1;a<7;a++) {
      laby.nombres.push([0,0,0])
    }
    for (let a = 1; a < 7; a++) {
      for (let b = 0; b < 3; b++) {
        trouve = false
        for (let k = 0; k < monchemin.length; k++) {
          if (monchemin[k][0] == a && monchemin[k][1] == b) trouve = true
        }
        if (!trouve) {
          laby.nombres[a - 1][b] = randint(2, maximum) * table + randint(1, table - 1)
        }
        else {
          laby.nombres[a - 1][b] = listeMultiples[index]
          index++
        }
      }
    } // Le tableau de nombre étant fait, on place les objets nombres.
    laby.nombres2d = laby.placeNombres(laby.nombres,1.5)
    params = { xmin: -4, ymin: 0, xmax: 22, ymax: 11, pixelsParCm: 20, scale: 0.7 }
    texte += mathalea2d(params, laby.murs2d, laby.nombres2d)
    texte_corr += mathalea2d(params, laby.murs2d, laby.nombres2d, laby.chemin2d)

    /************************ AMC Open *****************************/
    this.QCM[1][0]=[texte,[texte_corr],[3]]      // [question,[reponse],[nb_lignes_cadre]]
    /****************************************************/

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this)
   }
  this.besoin_formulaire_numerique = ["Table "]
  this.besoin_formulaire2_numerique = ["Facteur maximum "];
  this.besoin_formulaire3_numerique = ['Niveau de rapidité', 6, '1 : Guépard\n 2 : Antilope\n 3 : Lièvre\n 4 : Tortue\n 5 : Escargot\n 6 : Au hasard']
} // Fin de l'exercice.

