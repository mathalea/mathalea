import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import {point,pointSurSegment,rotation,codeAngle,texteParPoint,mathalea2d} from "/modules/2d.js"
/**
 * Déduire un pourcentage par complément à 100%
 * @Auteur Jean-Claude Lhote
 * Référence 6N33-2
 */
export default function Calculer_un_pourcentage() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes de calcul de pourcentage par complément à 100%";
  this.nb_questions = 1;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    let type_de_questions_disponibles = [1, 2, 3]
    let liste_choix = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_moyens = [`en bus`, `en deux-roues`, `à  pieds`, `en voiture`]
    let liste_sports = [`le foot`, `la natation`, `le basket`, `le ping-pong`, `le volley`, `la gym`]
    let liste_hobbies = [`la couture`, `le cinéma`, `la musique`, `le sport`, `la programmation`, `le jardinage`, `la cuisine`]
    let p1, p2, p3, moy1, moy2, moy3
    let objets, centre = point(5, 5), depart = point(10, 5)

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;
    ) {
      objets = []
      p1 = randint(6, 9) * 5
      p2 = randint(6, 9) * 5
      p3 = 100 - p1 - p2
      switch (liste_choix[i]) {
        case 1: // Les moyens de déplacement maison collège
          [moy1, moy2, moy3] = combinaison_listes(liste_moyens, 3)
          texte = `Dans un collège, $${p1}\\%$ des élèves se déplacent ${moy1}, $${p2}\\%$ ${moy2} et les autres ${moy3}.<br>`
          texte += `Quel est le pourcentage des élèves qui se déplacent ${moy3} ?`
          texte_corr = `Les élèves qui ${moy1} ou qui ${moy2} représentent $${p1}\\%$ + $${p2}\\% = ${p1 + p2}\\%$.<br>`
          texte_corr += `Donc on calcule : $100 - ${p1 + p2}\\% = ${p3}\\%$<br>`
          texte_corr += `$${p3}\\%$ des élèves ${moy3}.<br>`
          break;
        case 2: // Les sports pratiqués par les ados
          [moy1, moy2, moy3] = combinaison_listes(liste_sports, 3)
          texte = `Dans une association sportive, $${p1}\\%$ des ados pratiquent ${moy1}, $${p2}\\%$ ${moy2} et les autres ${moy3}.<br>`
          texte += `Quel est le pourcentage des ados qui pratiquent ${moy3} ?`
          texte_corr = `Les ados qui pratiquent ${moy1} ou ${moy2} représentent $${p1}\\% + ${p2}\\% = ${p1 + p2}\\%$.<br>`
          texte_corr += `Donc on calcule : $100\\% - ${p1 + p2}\\% = ${p3}\\%$<br>`
          texte_corr += `$${p3}\\%$ des ados de cette association sportive pratiquent ${moy3}.<br>`
          break;
        case 3: // Les sports pratiqués par les ados
          [moy1, moy2, moy3] = combinaison_listes(liste_hobbies, 3)
          texte = `Dans une association culturelle, $${p1}\\%$ des membres ont comme passe-temps favorit ${moy1}, pour $${p2}\\%$ c'est ${moy2} et pour les autres ${moy3}.<br>`
          texte += `Quel est le pourcentage des membres qui préfèrent ${moy3} ?`
          texte_corr = `Les membres qui préfère ${moy1} ou ${moy2} représentent $${p1}\\% + ${p2}\\% = ${p1 + p2}\\%$.<br>`
          texte_corr += `Donc on calcule : $100\\% - ${p1 + p2}\\% = ${p3}\\%$<br>`
          texte_corr += `$${p3}\\%$ des membres de cette association culturelle préfèrent ${moy3}.<br>`
          break;

      }
      objets.push(codeAngle(depart, centre, p1 * 3.6, 4.9, '', 'black', 2, 1, 'red', 0.4), texteParPoint(`${moy1.substring(3)}`, pointSurSegment(centre, rotation(depart, centre, p1 * 1.8), 3), 0))
      objets.push(codeAngle(rotation(depart, centre, p1 * 3.6), centre, p2 * 3.6, 4.9, '', 'black', 2, 1, 'blue', 0.4), texteParPoint(`${moy2.substring(3)}`, pointSurSegment(centre, rotation(depart, centre, p1 * 3.6 + p2 * 1.8), 3), 0))
      objets.push(codeAngle(depart, centre, -p3 * 3.6, 4.9, '', 'black', 2, 1, 'yellow', 0.4), texteParPoint(`${moy3.substring(3)}`, pointSurSegment(centre, rotation(depart, centre, -p3 * 1.8), 3), 0))
      texte_corr += mathalea2d({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.5, mainlevee: false, amplitude: 1 }, ...objets)

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}
