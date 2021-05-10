import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,shuffle,combinaisonListesSansChangerOrdre,texNombre,miseEnEvidence} from '../../modules/outils.js'
export const titre = 'Chiffre des ... Nombre de ...'

/** 
 * * Donner le chiffre des ... le nombre de ...
 * * 6N10-3
 * @author Sébastien Lozano
 */

export default function chiffre_nombre_de() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  this.sup = 1;
  if (this.beta) {
    this.nbQuestions = 6;
  } else {
    this.nbQuestions = 6;
  };

  this.titre = titre;
  this.consigne = ``;

  this.nbCols = 1;
  this.nbColsCorr = 1;
  //this.nbQuestionsModifiable = false;
  sortieHtml ? this.spacing = 3 : this.spacing = 2;
  sortieHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelleVersion = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1, 2, 3, 4, 5];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);      			
      type_de_questions_disponibles = shuffle([0, 1, 2, 3, 4, 5]);

    };

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    //let listeTypeDeQuestions  = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let u, d, c, mu, md, mc, mmu, mmd, mmc;
      mmc = randint(0, 9, [0]);
      mmd = randint(0, 9, [mmc]);
      mmu = randint(0, 9, [mmc, mmd]);
      mc = randint(0, 9, [mmu, mmd, mmc]);
      md = randint(0, 9, [mmu, mmd, mmc, mc]);
      mu = randint(0, 9, [mmu, mmd, mmc, mc, md]);
      c = randint(0, 9, [mmu, mmd, mmc, mu, md, mc]);
      d = randint(0, 9, [mmu, mmd, mmc, mu, md, mc, c]);
      u = randint(0, 9, [mmu, mmd, mmc, mu, md, mc, c, d]);
      //let nb = randint(100000000,999999999);
      //let nb_str = nb.toString();
      let nb_str = mmc.toString() + mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString();
      let nb = Number(nb_str);
      let cdu = ['unites', 'dizaines', 'centaines'];
      let chiffre_nombre = {
        chiffre: {
          unites: {
            unites: { determinant: `des`, cdu: ['unités', ''], rangs: [8] },
            dizaines: { determinant: `des`, cdu: ['dizaines', ''], rangs: [7] },
            centaines: { determinant: `des`, cdu: ['centaines', ''], rangs: [6] },
          },
          milliers: {
            unites: { determinant: `des`, cdu: ['unités de milliers', ''], rangs: [5] },
            dizaines: { determinant: `des`, cdu: ['dizaines de milliers', ''], rangs: [4] },
            centaines: { determinant: `des`, cdu: ['centaines de milliers', ''], rangs: [3] },
          },
          millions: {
            unites: { determinant: `des`, cdu: ['unités de millions', ''], rangs: [2] },
            dizaines: { determinant: `des`, cdu: ['dizaines de millions', ''], rangs: [1] },
            centaines: { determinant: `des`, cdu: ['centaines de millions', ''], rangs: [0] },
          },
        },
        nombre: {
          unites: {
            unites: { determinant: `d'`, cdu: ['unités', 1], rangs: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            dizaines: { determinant: `de`, cdu: ['dizaines', 10], rangs: [0, 1, 2, 3, 4, 5, 6, 7] },
            centaines: { determinant: `de`, cdu: ['centaines', 100], rangs: [0, 1, 2, 3, 4, 5, 6] },
          },
          milliers: {
            unites: { determinant: `d'`, cdu: ['unités de milliers', 1000], rangs: [0, 1, 2, 3, 4, 5] },
            dizaines: { determinant: `de`, cdu: ['dizaines de milliers', 10000], rangs: [0, 1, 2, 3, 4] },
            centaines: { determinant: `de`, cdu: ['centaines de milliers', 100000], rangs: [0, 1, 2, 3] },
          },
          millions: {
            unites: { determinant: `d'`, cdu: ['unités de millions', 1000000], rangs: [0, 1, 2] },
            dizaines: { determinant: `de`, cdu: ['dizaines de millions', 10000000], rangs: [0, 1] },
            centaines: { determinant: `de`, cdu: ['centaines de millions', 100000000], rangs: [0] },
          },
        },
      };

      // pour les situations, autant de situations que de cas dans le switch !
      let situations = [
        {//case 0 --> chiffre des
          type: 'chiffre',
          tranche: 'unites',
          cdu: choice(cdu),
        },
        {//case 1 --> chiffre des
          type: 'chiffre',
          tranche: 'milliers',
          cdu: choice(cdu),
        },
        {//case 2 --> chiffre des
          type: 'chiffre',
          tranche: 'millions',
          cdu: choice(cdu),
        },
        {//case 3 --> nombre de
          type: 'nombre',
          tranche: 'unites',
          cdu: choice(cdu),
        },
        {//case 4 --> nombre de
          type: 'nombre',
          tranche: 'milliers',
          cdu: choice(cdu),
        },
        {//case 5 --> nombre de
          type: 'nombre',
          tranche: 'millions',
          cdu: choice(cdu),
        },
      ];

      //une fonction pour la correction selon le type de question
      function chiffre_nombre_corr(type, str, rang) {
        let sortie;
        if (type == 'chiffre') {
          sortie = str.split('')[rang[0]];
        };
        if (type == 'nombre') {
          sortie = str.split('')[rang[0]];
          for (let k = 1; k < rang.length; k++) {
            sortie += str.split('')[rang[k]]
          };
        };
        return sortie;
      };

      // une fonction pour la justification supplémentaire dans le cas nombre de ...
      function nombre_de_justif(type, str, rang, cdu_num) {
        let sortie;
        if (type == 'chiffre') {
          sortie = '';
        };
        if (type == 'nombre') {
          let nb_de = str.split('')[rang[0]];
          for (let k = 1; k < rang.length; k++) {
            nb_de += str.split('')[rang[k]]
          };
          let j = rang[rang.length - 1];
          j++;
          let nb_de_reste = '';
          while (j != 9) {
            nb_de_reste += str.split('')[j];
            j++;
          };
          sortie = `comme $${texNombre(str)} = ${texNombre(nb_de)}\\times ${texNombre(cdu_num)}+${texNombre(nb_de_reste)}$ alors `;
        };
        return sortie;
      };

      let enonces = [];
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          Dans $${texNombre(nb)}$, quel est le ${situations[k].type} ${chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].determinant} ${chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[0]} ?					
					`,
          question: ``,
          correction: `
          Dans $${texNombre(nb)}$,           
          ${nombre_de_justif(situations[k].type, nb_str, chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs, chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[1])}          
          le ${situations[k].type} ${chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].determinant}  ${chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[0]} est 
          $${miseEnEvidence(texNombre(chiffre_nombre_corr(situations[k].type, nb_str, chiffre_nombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs)))}$					
					`
        });
      };

      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `             `
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[0].correction}`;
          };
          break;
        case 1:
          texte = `${enonces[1].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[1].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[2].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[2].correction}`;
          };
          break;
        case 3:
          texte = `${enonces[3].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[3].correction}`;
          };
          break;
        case 4:
          texte = `${enonces[4].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[4].correction}`;
          };
          break;
        case 5:
          texte = `${enonces[5].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[5].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[5].correction}`;
          };
          break;
      };

      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);

  }
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];	
};

