import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,pgcd,calcul,tex_nombrec,tex_nombre,tex_fraction} from "/modules/outils.js"
import {mathalea2d} from "/modules/2d.js"
import{fraction} from "/modules/Fractions.js"
/**
 * Calculer la fracton d'une quantité avec ou sans dessin.
 * @Auteur Jean-Claude Lhote
 * référence 6N33-0
 */
export default function Fraction_d_une_quantite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer la fraction d'une quantité";
  this.nb_questions = 5;
  this.consigne = "Calculer";
  sortie_html ? (this.spacing_corr = 3.5) : (this.spacing_corr = 2);
  sortie_html ? (this.spacing = 2) : (this.spacing = 2);
  this.sup = 1;
  this.sup2 = true
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles
    let liste_type_de_questions = []
    let choixdenh=combinaison_listes([3,4,5,10,12,20,30],this.nb_questions)
    let choixdent=combinaison_listes([20,24,30],this.nb_questions)
    let choixdenb=combinaison_listes([4,5,10,12],this.nb_questions)
     
    if (this.sup < 5)
      type_de_questions_disponibles = [parseInt(this.sup)]
    else
      type_de_questions_disponibles = [1, 2, 3, 4]
    liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    for (
      let i = 0, den, num, choix, longueur, numIrred, denIrred, k, masse, frac,frac2, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;
    ) {
      switch (liste_type_de_questions[i]) {
        case 1:
          den = choixdenh[i]
          num = randint(1, den-1)
          frac = fraction(num, den)
          texte = `À combien de minutes correspondent $${frac.texFraction}$ d\'heure ?<br>`
          if (this.sup2) {
            texte += `cette fraction est représentée ci dessous :<br>`
            texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 15, ymax: 5 }, frac.representation(2.5, 2.5, 2, 0, 'gateau', 'blue'))
          }
          texte_corr = `Comme l\'heure est partagée en ${den} parts égales, chaque part représente $${tex_fraction(1, den)}$ d\'heure, soit $${calcul(60 / den)}$ minutes.<br>`
          texte_corr += `Ici, il y a $${tex_fraction(num, den)}$ d\'heure, ce qui représente $${num}$ fois plus, soit $${num}\\times${calcul(60 / den)}=${calcul(num * 60 / den)}$.<br>`
          texte_corr += `$${frac.texFraction}$ d\'heure correspond donc à $${calcul(num * 60 / den)}$ minutes.`
          break
        case 2:
          den = choixdenh[i]
          num = randint(1, 3 * den, den)
          frac = fraction(num, den)
          texte = `À combien de minutes correspondent $${frac.texFraction}$ d\'heure ?<br>`
          if (this.sup2) {
            texte += `Cette fraction est représentée ci dessous :<br>`
            texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 15, ymax: 5 }, frac.representation(2.5, 2.5, 2, 0, 'gateau', 'blue'))
          }
          texte_corr = `Comme l\'heure est partagée en ${den} parts égales, chaque part représente $${tex_fraction(1, den)}$ d\'heure, soit $${calcul(60 / den)}$ minutes.<br>`
          texte_corr += `Ici, il y a $${tex_fraction(num, den)}$ d\'heure, ce qui représente $${num}$ fois plus, soit $${num}\\times${calcul(60 / den)}=${calcul(num * 60 / den)}$.<br>`
          texte_corr += `$${frac.texFraction}$ d\'heure correspond donc à $${calcul(num * 60 / den)}$ minutes.`
          break
        case 3:
          masse = choice([120, 180, 240, 300])
          denIrred = choixdent[i]
          numIrred = (i*randint(1, denIrred - 1))%denIrred
          while (pgcd(denIrred, numIrred) != 1 || calcul(denIrred / numIrred) == 2) {
            denIrred = choixdent[i]
            numIrred = randint(1, denIrred - 1)
          }
          frac = fraction(numIrred, denIrred)
          frac2 = frac.entierMoinsFraction(1)
          texte = `Voici une tablette de chocolat dont la masse totale est de $${masse}$ grammes. Quelqu'un en a déjà consommé les $${frac.texFractionSimplifiee}$.<br>`
          choix = randint(1, 2)
          if (choix == 1) {
            texte += `Quelle masse de chocoloat a-t-elle été consommée ?<br>`
            texte_corr = `Comme la tablette a une masse de $${masse}$ grammes, $${tex_fraction(1, denIrred)}$ de la tablette représente une masse de $${calcul(masse / denIrred)}$ grammes.<br>`
            texte_corr += `Ici, il y a $${frac.texFractionSimplifiee}$ de la tablette qui a été consommé, ce qui représente $${numIrred}$ fois plus, soit $${numIrred}\\times${calcul(masse / denIrred)}=${calcul(numIrred * masse / denIrred)}$.<br>`
            texte_corr += `La masse de chocolat consommée est $${calcul(numIrred * masse / denIrred)}$ grammes.`
          }
          else {
            texte += `Quelle masse de chocolat reste-t-il ?<br>`
            texte_corr = `Comme la tablette a une masse de $${masse}$ grammes, $${tex_fraction(1, denIrred)}$ de la tablette représente une masse de $${calcul(masse / denIrred)}$ grammes.<br>`
            texte_corr += `Ici, il y a $${frac.texFractionSimplifiee}$ de la tablette qui a été consommé, ce qui représente $${numIrred}$ fois plus, soit $${numIrred}\\times${calcul(masse / denIrred)}=${calcul(numIrred * masse / denIrred)}$.<br>`
            texte_corr += `La masse de chocolat consommée est $${calcul(numIrred * masse / denIrred)}$ grammes.<br>`
            texte_corr += `Il reste donc : $${masse}-${calcul(numIrred * masse / denIrred)}=${calcul(masse - numIrred * masse / denIrred)}$ grammes de chocolat.<br>`
            texte_corr += `une autre façon de faire est d'utiliser la fraction restante : $${tex_fraction(denIrred, denIrred)}-${frac.texFractionSimplifiee}=${tex_fraction(denIrred - numIrred, denIrred)}$.<br>`
            texte_corr += `$${tex_fraction(denIrred - numIrred, denIrred)}$ de $${masse}$ grammes c\'est $${denIrred - numIrred}$ fois $${calcul(masse / denIrred)}$ grammes.<br>`
            texte_corr += `Il reste donc : $${denIrred - numIrred}\\times${calcul(masse / denIrred)}=${(denIrred - numIrred) * masse / denIrred}$ grammes de chocolat.`

          }
          if (this.sup2) {
            texte += `La tablette de chocolat est représentée ci dessous :<br>`
            texte += mathalea2d({ xmin: -0.5, ymin: -0.5, xmax: 5, ymax: 7 }, frac2.representationIrred(0, 0, 4, 0, 'baton', 'brown'))
          }
          break
        case 4:
          num = randint(1, den - 1)
          longueur = choice([120, 180, 240, 300])
          denIrred = choixdenb[i]
          numIrred = randint(1, denIrred - 1)
          while (pgcd(denIrred, numIrred) != 1 || calcul(denIrred / numIrred) == 2) {
            denIrred = choice([2, 3, 4, 5, 10])
            numIrred = randint(1, denIrred - 1)
          }
          k = calcul(300 / denIrred)
          den = calcul(denIrred * k)
          num = calcul(numIrred * k)
          frac = fraction(num, den)
          texte = `Un bâton de $${tex_nombrec(longueur / 100)}$ mètre`
          if (longueur >= 200) texte += `s`
          texte += ` de longueur est coupé à $${frac.texFractionSimplifiee}$ de sa longueur.<br>`
          texte += `Calculer la longueur de chacun des morceaux en mètres.<br>`
          if (this.sup2) {
            texte += `Ce bâton est représenté ci dessous :<br>`
            texte += mathalea2d({ xmin: -0.5, ymin: 0, xmax: 10, ymax: 2 }, frac.representationIrred(0, 1, 8, 0, 'segment', 'blue', "0", `${tex_nombre(calcul(longueur / 100))}`))
          }
          texte_corr = `$${tex_fraction(1, denIrred)}$ de $${tex_nombrec(longueur / 100)}$ représente $${tex_nombrec(longueur / 100)} \\div ${denIrred} = ${tex_nombrec(longueur / 100 / denIrred)}$.<br>`
          texte_corr += `Le premier morceau du bâton correspondant à $${frac.texFractionSimplifiee}$ du bâton mesure : $${numIrred} \\times ${tex_nombrec(longueur / 100 / denIrred)}=${tex_nombrec(numIrred * longueur / 100 / denIrred)}$ m.<br>`
          texte_corr += `Le deuxième morceau mesure donc : $${tex_nombrec(longueur / 100)}-${tex_nombrec(numIrred * longueur / 100 / denIrred)}=${tex_nombrec(longueur / 100 - numIrred * longueur / 100 / denIrred)}$ m.`

          break
      }



      if (this.liste_corrections.indexOf(texte_corr) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Type d\'exercices", 5, "1 : Heures & minutes (inférieur à 1h)\n2 : Heures & minutes (jusqu\'à 3h)\n3 : tablettes de chocolat\n4 : Bâton cassé\n5 : Mélange"];
  this.besoin_formulaire2_case_a_cocher = ["Avec dessin", true];
}
