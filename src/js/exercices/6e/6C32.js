import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenuSansNumero,randint,arrondi,calcul,choice,arrondiVirgule,texNombre,texNombre2,tex_prix} from '../../modules/outils.js'
const Algebrite = require('algebrite')

export const titre = 'Problème - Les courses'

/**
 * On achète 2 aliments dont on connait la masse (un en grammes et l'autre en kilogrammes) et le prix au kilogramme. Il faut calculer le prix total.
 * @Auteur Rémi Angot
 * Référence 6C32
 */
export default function Probleme_course() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.spacing = 2;
  this.spacingCorr = 2;
  this.nbQuestions = 1;
  this.nbQuestionsModifiable = false;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.sup=false

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let prenom = choice([
      "Benjamin",
      "Léa",
      "Aude",
      "Julie",
      "Corinne",
      "Mehdi",
      "Joaquim",
    ]);
    let masse_en_kg_de_aliment1
    if (this.sup) {
      masse_en_kg_de_aliment1=randint(2,5)
    }
    else { masse_en_kg_de_aliment1= calcul(
      randint(2, 5) + randint(1, 9) / 10
    );}
    let prix_aliment1 = calcul(randint(2, 4) + randint(1, 9) / 10);
    let aliment1 = choice(["courgettes", "carottes", "pommes"]);
    let masse_en_g_de_aliment2 
      
    let prix_aliment2
    if (this.sup){
      prix_aliment2=randint(15,25)
      masse_en_g_de_aliment2  = randint(2,7) * 500;
    } 
    else {
      prix_aliment2= calcul(randint(12, 23) + randint(1, 9) / 10);
      masse_en_g_de_aliment2  = randint(21, 97) * 10;
    }
    let aliment2 = choice(["boeuf", "veau", "poulet"]);

    let texte = `${prenom} achète ${texNombre(
      masse_en_kg_de_aliment1
    )} kg de ${aliment1} à ${tex_prix(prix_aliment1)} €/kg `;
    texte += `et ${masse_en_g_de_aliment2} g de ${aliment2} à ${tex_prix(
      prix_aliment2
    )} €/kg. Quel est le prix total à payer ?`;
    let texteCorr =
      `Prix des ${aliment1} : ${texNombre(
        masse_en_kg_de_aliment1
      )} kg × ${tex_prix(prix_aliment1)} €/kg = ${tex_prix(
        calcul(masse_en_kg_de_aliment1 * prix_aliment1)
      )} €` + "<br>";
    texteCorr +=
      `Prix du ${aliment2} : ${texNombre(calcul(masse_en_g_de_aliment2 / 1000))} kg × ${tex_prix(prix_aliment2)} €/kg = ${texNombre(calcul((masse_en_g_de_aliment2 * prix_aliment2) / 1000))} € ` + "<br>";
    texteCorr += `Prix total à payer : ${texNombre(calcul(masse_en_kg_de_aliment1 * prix_aliment1))} € + ${texNombre(calcul(masse_en_g_de_aliment2 * prix_aliment2 / 1000))} €`
    if (Number.isInteger(calcul((masse_en_kg_de_aliment1 * prix_aliment1 +(masse_en_g_de_aliment2 * prix_aliment2) / 1000))*100)) {
          texteCorr+=` = `
        }
        else {
          texteCorr+=` ≈ `
        }
    texteCorr+=`${arrondiVirgule(calcul(masse_en_kg_de_aliment1 * prix_aliment1 +(masse_en_g_de_aliment2 * prix_aliment2) / 1000))} €<br>`;
    texteCorr += `<br><i>Le prix total aurait aussi pu être trouvé en un seul calcul</i> : ${texNombre(masse_en_kg_de_aliment1)} kg × ${tex_prix(prix_aliment1)} €/kg + ${texNombre(calcul(masse_en_g_de_aliment2 / 1000))} kg × ${tex_prix(prix_aliment2)} €/kg `
    if (Number.isInteger(calcul((masse_en_kg_de_aliment1 * prix_aliment1 +(masse_en_g_de_aliment2 * prix_aliment2) / 1000))*100)) {
          texteCorr+=` = `
        }
        else {
          texteCorr+=` ≈ `
        }
    texteCorr+=`${arrondiVirgule(calcul(
        masse_en_kg_de_aliment1 * prix_aliment1 +
        (masse_en_g_de_aliment2 * prix_aliment2) / 1000
      )
    )} €<br>`;

    if (!sortieHtml) {
      texteCorr =
        `Prix des ${aliment1} : $${texNombre(
          masse_en_kg_de_aliment1
        )}~\\text{kg}\\times${tex_prix(
          prix_aliment1
        )}~\\text{\\euro{}/kg} = ${tex_prix(
          Algebrite.eval(masse_en_kg_de_aliment1 * prix_aliment1)
        )}~\\text{\\euro}$` + "<br>";
      texteCorr +=
        `Prix du ${aliment2} : $${texNombre(
          Algebrite.eval(masse_en_g_de_aliment2 / 1000)
        )}~\\text{kg}\\times${tex_prix(
          prix_aliment2
        )}~\\text{\\euro{}/kg} = ${texNombre(
          Algebrite.eval((masse_en_g_de_aliment2 * prix_aliment2) / 1000)
        )}~\\text{\\euro}$` + "<br>";
      texteCorr += `Prix total à payer : $${texNombre(
        Algebrite.eval(masse_en_kg_de_aliment1 * prix_aliment1)
      )}~\\text{\\euro} + ${texNombre(
        Algebrite.eval((masse_en_g_de_aliment2 * prix_aliment2) / 1000)
      )}~\\text{\\euro}`
      if (Number.isInteger(calcul((masse_en_kg_de_aliment1 * prix_aliment1 +(masse_en_g_de_aliment2 * prix_aliment2) / 1000))*100)) {
            texteCorr+=`=`
          }
          else {
            texteCorr+=`\\approx`
          }
      texteCorr+=` ${arrondiVirgule(
        Algebrite.eval(
          masse_en_kg_de_aliment1 * prix_aliment1 +
          (masse_en_g_de_aliment2 * prix_aliment2) / 1000
        )
      )}~\\text{\\euro}$<br>`;
    }

    this.listeQuestions.push(texte);
    this.listeCorrections.push(texteCorr);

    listeQuestionsToContenuSansNumero(this);
  };
  this.besoinFormulaireCaseACocher=["Calculs faciles"]
}



