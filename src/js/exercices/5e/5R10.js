import Exercice from '../ClasseExercice.js';
import {calcul,listeQuestionsToContenu,randint,ecritureParentheseSiMoins,texNombrec,texNombre,arrondi,choice,combinaisonListes} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Trouver le terme manquant d’une somme de nombres relatifs'

/**
 * Additions à trou dans les relatifs
 *
 *  @Auteur Jean-Claude Lhote à partir de CM000 de Rémi Angot
 * Référence 5R10
 */
export default function Terme_inconnu_de_somme() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.nbQuestions=5;
  this.sup = 1;
  this.sup3 = 1;
  this.sup2 = 20; // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = titre;
  this.consigne = "Calcule le terme manquant";
  this.spacing = 2;

  this.nouvelleVersion = function () {
    this.qcm=['5R10',[],"Trouver le terme manquant d'une somme de nombres relatifs",4];

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles=[1,2,3,4]
    let liste_type_de_questions=combinaisonListes(type_de_questions_disponibles,this.nbQuestions)
    let decimal;
    let inconnue;
    if (this.sup==1) {
        decimal=1
    }
    else {
        decimal=10
    }
    for (let i = 0, a, b, texte, texteCorr,cpt=0; i < this.nbQuestions;) {
      if (!mathalea.sortieAMC){
      a = arrondi(randint(4*decimal, this.sup2*decimal)/decimal,1);
      b = arrondi(randint(2*decimal, this.sup2*decimal)/decimal,1);
      }
      else {
        a = arrondi(randint(4*decimal, 20*decimal)/decimal,1);
        b = arrondi(randint(2*decimal, 20*decimal)/decimal,1);

      }
      if (this.sup3==1) {
        inconnue=` \\ldots\\ldots `
      }
      else {
        inconnue=` ${choice(['x','y','z','a','t','n'])} `
      }
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `$${texNombre(a)} + ${inconnue} = ${texNombre(b)}$`;
          texteCorr = `$${texNombre(a)} + ${ecritureParentheseSiMoins(texNombrec( b-a))} = ${texNombre(b)}$`;
          texteCorr +=`. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec( b-a)}$`;

        break

        case 2:
          texte = `$${inconnue} + ${texNombre(a)}  = ${texNombre(b)}$`;
          texteCorr = `$${ecritureParentheseSiMoins(texNombrec( b-a))} + ${texNombre(a)} = ${texNombre(b)}$`;
          texteCorr +=`. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec( b-a)}$`
        break

        case 3:
          texte = `$${texNombre(b)} = ${inconnue} + ${texNombre(a)} $`;
          texteCorr = `$${texNombre(b)}=${ecritureParentheseSiMoins(texNombrec( b-a))} + ${texNombre(a)}$`;
          texteCorr +=`. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec( b-a)}$`
        break

        case 4:
        texte = `$${texNombre(b)} = ${texNombre(a)} + ${inconnue}$`;
        texteCorr = `$${texNombre(b)}=${texNombre(a)} + ${ecritureParentheseSiMoins(texNombrec( b-a))}$`;
        texteCorr +=`. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec( b-a)}$`
        break

      }

      if (est_diaporama) {
        texte = texte.replace("= \\dotfill", "");
      }
			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
        this.qcm[1].push([this.consigne+'\\\\'+texte, [texteCorr,calcul(b-a)], {digits:2+Math.log10(decimal),decimals:Math.log10(decimal),signe:true,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
				i++;
			}
			cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ["Niveau de difficulté",2,"1 : Nombres entiers\n2 : Nombres décimaux"];
  this.besoin_formulaire2_numerique = ["Valeur maximale", 9999]
  this.besoin_formulaire3_numerique = ["Type d'égalité",2,"1 : Égalité à trou\n2 : Équation"];
}
