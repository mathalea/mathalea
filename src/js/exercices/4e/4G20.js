import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,calcul,texNombrec,creerNomDePolygone,texNombre} from '../../modules/outils.js'
import {point,polygone,nommePolygone,rotation,similitude,codageAngleDroit,afficheLongueurSegment,longueur,mathalea2d} from '../../modules/2d.js'
export const titre = 'Calculer une longueur avec le théorème de Pythagore'

/**
 * Exercices sur le théorème de Pythagore avec MathALEA2D
 * @Auteur Rémi Angot
 * 4G20
 */
export default function Pythagore2D() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.nbQuestions = 3;
  this.nbCols = 3;
  this.nbColsCorr = 1;
  this.typeExercice = 'Calculer';
  this.video = 'M9sceJ8gzNc';

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_type_de_questions = [];
    let liste_de_noms_de_polygones = [];
    if (this.sup == 1) {
      this.consigne = "Dans chaque cas, donner l'égalité de Pythagore."
    } else if (this.sup == 2) {
      this.consigne = "Dans chaque cas, compléter l'égalité en utilisant le théorème de Pythagore."
    } else {
      this.consigne = "Dans chaque cas, calculer la longueur manquante."
    }
    if (this.sup == 2 || this.typeExercice == 'Calculer') {
      liste_type_de_questions = combinaisonListes(['AB', 'BC', 'AC'], this.nbQuestions)
    }
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '';
      texteCorr = '';
      let A1 = point(0, 0)
      let B1 = point(calcul(randint(22, 50) / 10), 0)
      let C1 = similitude(B1, A1, 90, calcul(randint(22, 50) / 10) / longueur(A1, B1))
      let p1 = polygone(A1, B1, C1)
      p1.isVisible = false
      let p2 = rotation(p1, A1, randint(0, 360))
      let A = p2.listePoints[0]
      let B = p2.listePoints[1]
      let C = p2.listePoints[2]
      let codage = codageAngleDroit(B, A, C)
      let xmin = Math.min(A.x, B.x, C.x) - 1
      let ymin = Math.min(A.y, B.y, C.y) - 1
      let xmax = Math.max(A.x, B.x, C.x) + 1
      let ymax = Math.max(A.y, B.y, C.y) + 1
      let nomDuPolygone = creerNomDePolygone(3, liste_de_noms_de_polygones);
      liste_de_noms_de_polygones.push(nomDuPolygone)
      let nomme = nommePolygone(p2, nomDuPolygone)
      let affAB = afficheLongueurSegment(B, A)
      let affAC = afficheLongueurSegment(A, C)
      let affBC = afficheLongueurSegment(C, B)
      let longueurAB = longueur(A, B, 1)
      let longueurAC = longueur(A, C, 1)
      let longueurBC = longueur(B, C, 1)
      let mesObjetsATracer = [codage, p2, nomme]

      if (this.typeExercice == 'Calculer' && liste_type_de_questions[i] == 'AB') {
        mesObjetsATracer.push(affAC, affBC)
      }
      if (this.typeExercice == 'Calculer' && liste_type_de_questions[i] == 'BC') {
        mesObjetsATracer.push(affAC, affAB)
      }
      if (this.typeExercice == 'Calculer' && liste_type_de_questions[i] == 'AC') {
        mesObjetsATracer.push(affAB, affBC)
      }

      if (!sortieHtml) { texte = '~\\\\' }
      texte += mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, scale: .6 }, mesObjetsATracer);
      if (this.sup == 2) {
        if (liste_type_de_questions[i] == 'AB') {
          texte += `<br>$${A.nom + B.nom}^2=\\ldots$`
        }
        if (liste_type_de_questions[i] == 'BC') {
          texte += `<br>$${B.nom + C.nom}^2=\\ldots$`
        }
        if (liste_type_de_questions[i] == 'AC') {
          texte += `<br>$${A.nom + C.nom}^2=\\ldots$`
        }
      }
      if (!sortieHtml && i != this.nbQuestions - 1) { texte += '\\columnbreak' } //pour la sortie LaTeX sauf la dernière question

      texteCorr = `Le triangle $${nomDuPolygone}$ est rectangle en $${A.nom}$ donc d'après le théorème de Pythagore, on a : `;
      texteCorr += `$${B.nom + C.nom}^2=${A.nom + B.nom}^2+${A.nom + C.nom}^2$`
      if (this.sup == 2) {
        if (liste_type_de_questions[i] == 'AB') {
          texteCorr += ` d'où $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$.`
        }
        if (liste_type_de_questions[i] == 'BC') {
          texteCorr += `.`
        }
        if (liste_type_de_questions[i] == 'AC') {
          texteCorr += ` d'où $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$.`
        }
      }
      if (this.typeExercice == "Calculer") {
        if (liste_type_de_questions[i] == 'AB') {
          texteCorr += ` donc $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$`
          texteCorr += `<br> $${A.nom + B.nom}^2=${texNombre(longueurBC)}^2-${texNombre(longueurAC)}^2=${texNombrec(longueurBC ** 2 - longueurAC ** 2)}$`
          texteCorr += `<br> $${A.nom + B.nom}=\\sqrt{${texNombrec(longueurBC ** 2 - longueurAC ** 2)}}$`
          if (calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1) == calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 5)) {
            texteCorr += `<br> $${A.nom + B.nom}=${texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1))}$ cm.`
          } else {
            texteCorr += `<br> $${A.nom + B.nom}\\approx${texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1))}$ cm.`
          }
        }
        if (liste_type_de_questions[i] == 'BC') {
          texteCorr += `<br> $${B.nom + C.nom}^2=${texNombre(longueurAB)}^2+${texNombre(longueurAC)}^2=${texNombrec(longueurAB ** 2 + longueurAC ** 2)}$`
          texteCorr += `<br> $${B.nom + C.nom}=\\sqrt{${texNombrec(longueurAB ** 2 + longueurAC ** 2)}}$`
          if (calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1) == calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 5)) {
            texteCorr += `<br> $${B.nom + C.nom}=${texNombre(calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1))}$ cm.`
          } else {
            texteCorr += `<br> $${B.nom + C.nom}\\approx${texNombre(calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1))}$ cm.`
          }
        }
        if (liste_type_de_questions[i] == 'AC') {
          texteCorr += ` donc $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$`
          texteCorr += `<br> $${A.nom + C.nom}^2=${texNombre(longueurBC)}^2-${texNombre(longueurAB)}^2=${texNombrec(longueurBC ** 2 - longueurAB ** 2)}$`
          texteCorr += `<br> $${A.nom + C.nom}=\\sqrt{${texNombrec(longueurBC ** 2 - longueurAB ** 2)}}$`
          if (calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1) == calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 5)) {
            texteCorr += `<br> $${A.nom + C.nom}=${texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1))}$ cm.`
          } else {
            texteCorr += `<br> $${A.nom + C.nom}\\approx${texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1))}$ cm.`
          }
        }
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
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3,"1 : Donner l'égalité de Pythagore\n2 : Compléter l'égalité de Pythagore\n3 : Calculer une longueur manquante"];
}
// 4G20-1

