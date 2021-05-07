import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureAlgebrique,ecritureParentheseSiNegatif,ecritureParentheseSiMoins,signe,abs,lettreDepuisChiffre} from '../../modules/outils.js'

export const titre = 'Utiliser la simple distributivité'

/**
 * Développer en utilisant la distributivité simple
 *
 * * La lettre peut être x, y, z, t, a, b ou c
 * * 3 fois sur 6 c'est une distributivité simple :  k(ax+b)
 * * 1 fois sur 6 c'est une distributivité simple : (ax+b)×k
 * * 1 fois sur 6, la variable est en facteur : kx(ax+b)
 * * 1 fois sur 6 il faut ensuite réduire : k(ax+b)+c
 *
 * Niveau de difficulté :
 * * 1 : Multiplication par un facteur positif
 * * 2: Multiplication par un facteur relatif
 * @Auteur Rémi Angot
 * 4L10 et 3L11
 */
export default function Exercice_developper(difficulte = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = difficulte;
  this.titre = titre;
  this.consigne = "Développer.";
  this.spacing = 1;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let lettre = ["x", "y", "z", "t", "a", "b", "c"];
    let type_de_questions_disponibles = [
      "simple",
      "simple",
      "simple2",
      "x_en_facteur",
      "developper_et_reduire",
    ];
    let type_de_questions
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      type_de_questions = listeTypeDeQuestions[i];
      let k = randint(2, 11);
      if (this.sup > 1) {
        // si difficulté 2, k peut être négatif
        k = k * choice([-1, 1]);
      }
      let a = randint(1, 9);
      let b = randint(1, 9) * choice([-1, 1]);
      let inconnue = choice(lettre);
      switch (type_de_questions) {
        case "simple":
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(b)})$`;
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(b)})$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(b)})=${k}
						\\times ${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`;
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(b)})=${k}
						\\times ${a}${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`;
          }
          break;
        case "simple2":
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=(${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}$`;
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=(${a}${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=(${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}=${k}
						\\times ${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`;
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=(${a}${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}=${k}
						\\times ${a}${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`;
          }
          break;
        case "x_en_facteur":
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}${inconnue}(${inconnue}${ecritureAlgebrique(b)})$`;
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}${inconnue}(${inconnue}${ecritureAlgebrique(
              b
            )})=${k}${inconnue}\\times ${inconnue} ${signe(
              k * b
            )}${k}${inconnue}\\times ${abs(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`;
          } else {
            if (k > 0) {
              texteCorr = `$${lettreDepuisChiffre(
                i + 1
              )}=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                b
              )})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecritureParentheseSiNegatif(
                b
              )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                k * b
              )}${inconnue}$`;
            } else {
              texteCorr = `$${lettreDepuisChiffre(
                i + 1
              )}=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                b
              )})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecritureParentheseSiNegatif(
                b
              )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                k * b
              )}${inconnue}$`;
            }
          }
          break;
        case "developper_et_reduire":
          let c = randint(2, 9);
          if (a == 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(b)})+${c}$`;
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(b)})+${c}$`;
          }

          if (a == 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(
              b
            )})+${c}=${k}\\times ${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}+${c}
						=${k * a}${inconnue}${ecritureAlgebrique(k * b)}+${c}=${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}$`;
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(
              b
            )})+${c}=${k}\\times${ecritureParentheseSiMoins(
              a + inconnue
            )}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}+${c}
						=${k * a}${inconnue}${ecritureAlgebrique(k * b)}+${c}=${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}$`;
          }
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    2,
    "1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif",
  ];
}
