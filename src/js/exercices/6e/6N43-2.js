import Exercice from '../ClasseExercice.js';
import { shuffle2tableaux, listeQuestionsToContenuSansNumero, choice, combinaisonListes, texNombre2 } from '../../modules/outils.js'
export const amcReady = true

export const titre = 'Critères de divisibilité (plusieurs possibles)'

/**
 * Un nombre est-il divisible par 2, 3, 5, 9 ?
 *
 *
 * @Auteur Rémi Angot
 * 6N43-2
 */
export default function Tableau_criteres_de_divisibilite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;

  this.spacing = 1;
  this.spacingCorr = 1;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;
  this.nbCols = 1;
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function () {
    if (!this.modeQcm) {
      this.consigne =
        "Compléter le tableau en mettant oui ou non dans chaque case.";
    }
    else {
      this.consigne =
        "mettre une croix dans la ou les cases qui conviennent.";
    }
    this.qcm = ['6N43-2', [], "Critères de divisibilité", 2,{ordered:true,lastChoices:4}]
    let tabrep, tabicone
    let espace = ``;
    if (sortieHtml) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let liste_des_nombres_possibles = [
      "div2",
      "div3",
      "div39",
      "div5",
      "div25",
      "div23",
      "div239",
      "div35",
      "div2359",
      "divrien",
    ];
    // divisible par 2, divisible par 3, divisible par 3 et 9...

    let liste_des_types_de_nombres = combinaisonListes(
      liste_des_nombres_possibles,
      this.nbQuestions
    );
    let tableau_de_nombres = [], texte, texteCorr;
    let tableau_de_nombres_avec_correction = [];
    let liste_de_facteurs = [
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97,
      101,
      103,
      107,
      109,
      113,
      127,
      131,
      137,
      139,
      149,
      151,
      157,
      163,
      167,
      173,
      179,
      181,
      191,
      193,
      197,
      199,
      211,
      223,
      227,
      229,
      233,
      239,
      241,
      251,
      257,
      263,
      269,
      271,
      277,
      281,
      283,
      293,
    ];
    texteCorr ='' 
    texte = ''
    for (let i = 0; i < this.nbQuestions; i++) {
      switch (liste_des_types_de_nombres[i]) {
        case "div2":
          tableau_de_nombres[i] = 2 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [1, 0, 0, 0, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div3":
          tableau_de_nombres[i] = 3 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [0, 1, 0, 0, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div39":
          tableau_de_nombres[i] = 9 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [0, 1, 0, 1, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div5":
          tableau_de_nombres[i] = 5 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\text{non} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [0, 0, 1, 0, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div25":
          tableau_de_nombres[i] = 10 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [1, 0, 1, 0, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div23":
          tableau_de_nombres[i] = 6 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [1, 1, 0, 0, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div239":
          tableau_de_nombres[i] = 18 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [1, 1, 0, 1, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div35":
          tableau_de_nombres[i] = 15 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [0, 1, 1, 0, 0]
          this.qcm[1].push([`$${texNombre2(tableau_de_nombres[i])}$ est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "div2359":
          tableau_de_nombres[i] = 90 * choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\color{blue} \\text{oui} & \\text{oui} & \\text{oui} & \\text{oui} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [1, 1, 1, 1, 0]
          this.qcm[1].push([`${texNombre2(tableau_de_nombres[i])} est divisible \n `,
            tabrep,
            tabicone])
          break;
        case "divrien":
          tableau_de_nombres[i] = choice(liste_de_facteurs);
          tableau_de_nombres_avec_correction[i] = `${texNombre2(
            tableau_de_nombres[i]
          )} & \\text{non} & \\text{non} & \\text{non} & \\text{non} \\\\`;
          tabrep = [`par $2$`, `par $3$`, `par $5$`, `par $9$`, `par aucun`]
          tabicone = [0, 0, 0, 0, 1]
          this.qcm[1].push([`${texNombre2(tableau_de_nombres[i])} est divisible \n `,
            tabrep,
            tabicone])
          break;
      }
      if (!mathalea.sortieAMC) {
        if (this.modeQcm) {
          texte += `$${texNombre2(tableau_de_nombres[i])}$ est divisible ${espace}  `
          texteCorr += `$${texNombre2(tableau_de_nombres[i])}$ est divisible ${espace}  `
          for (let j = 0; j < tabrep.length; j++) {
            texte += `$\\square\\;$ ${tabrep[j]}` + espace;
            if (tabicone[j] == 1) {
              texteCorr += `$\\blacksquare\\;$ ${tabrep[j]}` + espace;
            } else {
              texteCorr += `$\\square\\;$ ${tabrep[j]}` + espace;
            }
          }
          texte += `<br>`
          texteCorr += `<br>`
        }
      }
    }
    if (sortieHtml&&!this.modeQcm) {
           texte = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n`;
      texteCorr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n`;
    }
    else
      if (!mathalea.sortieAMC&&!this.modeQcm) {
             texte = `$\\begin{array}{|l|c|c|c|c|}\n`;
        texteCorr = `$\\begin{array}{|l|c|c|c|c|}\n`;
      }
    if (!mathalea.sortieAMC&&!this.modeQcm) {
          texte += `\\hline\n`;
     texteCorr += `\\hline\n`;
          texte += `\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n`;
     texteCorr += `\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n`;
          texte += `\\hline\n`;
     texteCorr += `\\hline\n`;
      for (let k = 0; k < this.nbQuestions; k++) {
        texte += `${texNombre2(tableau_de_nombres[k])} & & & & \\\\\n`;
            texte += `\\hline\n`;
      }
      for (let l = 0; l < this.nbQuestions; l++) {
        texteCorr += tableau_de_nombres_avec_correction[l];
        texteCorr += `\\hline\n`;
      }
           texte += `\\end{array}\n$`;
      texteCorr += `\\end{array}$\n`;
     }
      this.listeQuestions.push(texte);
      this.listeCorrections.push(texteCorr);
      if (!mathalea.sortieAMC){
      listeQuestionsToContenuSansNumero(this);
      }
  }
}

