import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,combinaisonListes,miseEnEvidence,tex_fraction,shuffle2tableaux} from '../../modules/outils.js'
export const titre = 'Égalités entre fractions simples'

/**
 * Écrire une fraction avec un nouveau dénominateur qui est un multiple de son dénominateur (ce multiple est inférieur à une valeur maximale de 11 par défaut)
 * @Auteur Rémi Angot
 * @auteur Jean-claude Lhote (Mode QCM et alternance numérateur / dénominateur)
 * 5N13-2 et 6N41
 */
export default function Egalites_entre_fractions() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 11; // Correspond au facteur commun
  this.sup2=2 // alternace numérateur ou dénominateur imposé.
  this.titre = titre;
  this.consigne = "Compléter les égalités.";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.qcmDisponible=true
  this.modeQcm=false

  this.nouvelleVersion = function () {
    this.qcm=['6N41',[],"Egalités de fractions",1]
    let tabrep,tabicone
    let espace =``;
    if (sortieHtml) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_fractions = [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10],
    ]; // Couples de nombres premiers entre eux
    let listeTypeDeQuestions = combinaisonListes(
      [1, 1, 1, 1, 2],
      this.nbQuestions
    );
    for (
      let i = 0, fraction, a, b, c, d, k,choix, texte, texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      if (listeTypeDeQuestions[i] == 1) {
        // égalité entre 2 fractions
        fraction = choice(liste_fractions); //
        a = fraction[0];
        b = fraction[1];
        if (this.modeQcm){
          k = randint(3, Math.max(this.sup,4));
        }
        else {
        k = randint(2, Math.max(3,this.sup));
        }
        c = k * a;
        d = k * b;
        enleveElement(liste_fractions, fraction); // Il n'y aura pas 2 fois la même fraction de départ
        if (this.sup2==3) {
          choix=i%2
        }
        else {
          choix=this.sup2%2
        }
        switch (choix){
          case 0 :
        texte = `$${tex_fraction(a, b)} = ${tex_fraction(
          "\\phantom{00000000000000}",
          "\\phantom{00000000000000}"
        )} = ${tex_fraction("\\phantom{0000}", d)}$`;
        texteCorr = `$${tex_fraction(a, b)} = ${tex_fraction(
          a + miseEnEvidence("\\times" + k),
          b + miseEnEvidence("\\times" + k)
        )} = ${tex_fraction(c, d)}$`;
        tabrep=[`$${tex_fraction(c, d)}$`,`$${tex_fraction(a, d)}$`,`$${tex_fraction((k-1)*a, d)}$`,`$${tex_fraction((k+1)*a,d )}$`,`$${tex_fraction(Math.abs(d-a),d )}$`]
        tabicone=[1,0,0,0,0]
        this.qcm[1].push([`Complète l'égalité de fractions $${texte}$.\\\\ \n `,
        tabrep,
        tabicone]) 
        if (this.modeQcm&&!mathalea.sortieAMC) {
          texteCorr=''
          texte+=`<br><br>  Réponses possibles : ${espace}  `
          shuffle2tableaux(tabrep, tabicone);
          for (let i=0; i<tabrep.length; i++) {
            texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
           if (tabicone[i]==1) {
             texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
           } else {
             texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
           }
         }
        }
        break
        case 1 :
          texte = `$${tex_fraction(a, b)} = ${tex_fraction(
            "\\phantom{00000000000000}",
            "\\phantom{00000000000000}"
          )} = ${tex_fraction(c, "\\phantom{0000}")}$`;
          texteCorr = `$${tex_fraction(a, b)} = ${tex_fraction(
            a + miseEnEvidence("\\times" + k),
            b + miseEnEvidence("\\times" + k)
          )} = ${tex_fraction(c, d)}$`;
          tabrep=[`$${tex_fraction(c, d)}$`,`$${tex_fraction(c, b)}$`,`$\\dfrac{${c}}{${(k-1)*b}}$`,`$${tex_fraction(c, (k+1)*b)}$`,`$\\dfrac{${c}}{${Math.abs(c-b)}}$`]
          tabicone=[1,0,0,0,0]
          this.qcm[1].push([`Complète l'égalité de fractions $${texte}$.\\\\ \n `,
          tabrep,
          tabicone]) 
          if (this.modeQcm&&!mathalea.sortieAMC) {
            texteCorr=''
            texte+=`<br><br>  Réponses possibles : ${espace}  `
            shuffle2tableaux(tabrep, tabicone);
            for (let i=0; i<tabrep.length; i++) {
              texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
             if (tabicone[i]==1) {
               texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
             } else {
               texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
             }
           }
          }
       
        break
      }
      } else {
        //écrire un entier sous la forme d'une fraction
        a = randint(1, 9);
        if (this.modeQcm&&!mathalea.sortieAMC) {
          d=randint(3,9,[a,2*a])
        }
        else {
        d = randint(2, 9);
        }
        c = a * d;
        if (this.sup2==3) {
          choix=i%2
        }
        else {
          choix=this.sup2%2
        }
        switch (choix){
          case 0 :
        texte = `$${a} = ${tex_fraction(
          "\\phantom{00000000000000}",
          "\\phantom{00000000000000}"
        )} = ${tex_fraction("\\phantom{0000}", d)}$`;
        texteCorr = `$${a} = \\dfrac{${a}}{1} =${tex_fraction(
          a + miseEnEvidence("\\times" + d),
          "1" + miseEnEvidence("\\times" + d)
        )} = ${tex_fraction(c, d)}$`;
          tabrep=[`$${tex_fraction(c, d)}$`,`$${tex_fraction(a, d)}$`,`$${tex_fraction(d+a, d)}$`,`$${tex_fraction(Math.abs(d-a), d)}$`,`$${tex_fraction((a+1)*d, d)}$`]
        tabicone=[1,0,0,0,0]
        this.qcm[1].push([`Complète l'égalité de fractions $${texte}$.\\\\ \n `,
        tabrep,
        tabicone]) 
        if (this.modeQcm&&!mathalea.sortieAMC) {
          texteCorr=''
          texte+=`<br><br>  Réponses possibles : ${espace}  `
          shuffle2tableaux(tabrep, tabicone);
          for (let i=0; i<tabrep.length; i++) {
            texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
           if (tabicone[i]==1) {
             texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
           } else {
             texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
           }
         }
        }
        break
        case 1 :
          texte = `$${a} = ${tex_fraction(
            "\\phantom{00000000000000}",
            "\\phantom{00000000000000}"
          )} = ${tex_fraction(c, "\\phantom{0000}")}$`;
          texteCorr = `$${a} = \\dfrac{${a}}{1} =${tex_fraction(
            a + miseEnEvidence("\\times" + d),
            "1" + miseEnEvidence("\\times" + d)
          )} = ${tex_fraction(c, d)}$`;
            tabrep=[`$${tex_fraction(c, d)}$`,`$${tex_fraction(c, c-a)}$`,`$${tex_fraction(c, a)}$`,`$${tex_fraction(c, c+a)}$`,`$${tex_fraction(c,c*a)}$`]
          tabicone=[1,0,0,0,0]
          this.qcm[1].push([`Complète l'égalité de fractions $${texte}$.\\\\ \n `,
          tabrep,
          tabicone]) 
          if (this.modeQcm&&!mathalea.sortieAMC) {
            texteCorr=''
            texte+=`<br><br>  Réponses possibles : ${espace}  `
            shuffle2tableaux(tabrep, tabicone);
            for (let i=0; i<tabrep.length; i++) {
              texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
             if (tabicone[i]==1) {
               texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
             } else {
               texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
             }
           }
          }
         
        break
      }
      }

      this.listeQuestions.push(texte);
      this.listeCorrections.push(texteCorr);
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ["Valeur maximale du facteur commun", 99];
  this.besoin_formulaire2_numerique = ["Type de question",3,"1 : Numérateur imposé\n2 : Dénominateur imposé\n3 : Alternance"]
}

