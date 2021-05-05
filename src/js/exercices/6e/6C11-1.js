import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, texte_gras, texte_en_couleur_et_gras } from '../../modules/outils.js'
export const titre = "Divisions euclidiennes : déterminer reste et quotient à partir d'une égalité"
/**
 * Détermination du reste et quotient à partir de l'égalité découlant de la division euclidienne
 *
 * @Auteur Cédric GROLLEAU
 * Référence 6C11-1
 */
export default function Divisions_euclidiennes_egalite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne =
    'Répondre aux questions suivantes sans poser la division.'
  this.consigneCorrection = texte_gras('Pour la division euclidienne de a par b, on cherche les nombres q et r tels que  a = b × q + r avec r < b')
  this.spacing = 2
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon opidiv n'est pas joli
  this.nbQuestions = 4
  this.sup = 1
  this.qcm = ['6C11-1', [], 'Divisions euclidiennes : déterminer reste et quotient à partir d\'une égalité', 3, {}]
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let type_de_questions_disponibles, type_de_questions
    if (this.sup == 1) {
      type_de_questions_disponibles = [1, 2, 2]
    } else if (this.sup == 2) {
      type_de_questions_disponibles = [1, 2, 3, 4]
    }
    const listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, q, r;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = listeTypeDeQuestions[i]
      q = randint(7, 75)
	  b = randint(3, 25)
	  r = type_de_questions === 1 ? 0 : randint(1, b - 1)
	  a = b * q + r
	  texte = `Utilise l'égalité suivante pour donner le quotient et le reste de la division euclidienne de $ ${texNombre(a)} $ par $ ${b} $<br>`
	  switch (type_de_questions) {
        case 1: // égalité "directe"
		  texte += `$ ${texNombre(a)} = ${b} \\times ${q} $<br>`
		  texteCorr = `L'égalité $ ${texNombre(a)} = ${b} \\times ${q} $ correspond bien à l'expression de la division euclidienne de $ ${texNombre(a)} $ par $ ${b} $. <br> Le quotient est ${texte_en_couleur_et_gras(q)} et le reste est ${texte_en_couleur_et_gras(0)}.`
          break
        case 2: // égalité "directe"
		  texte += `$ ${texNombre(a)} = ${b} \\times ${q} + ${r} $<br>`
		  texteCorr = `${r} est inférieur à ${b}, l'égalité $ ${texNombre(a)} = ${b} \\times ${q} + ${r} $ correspond bien à l'expression de la division euclidienne de $ ${texNombre(a)} $ par ${b}. <br> On a donc : ${texte_en_couleur_et_gras(q)} le quotient et ${texte_en_couleur_et_gras(r)} le reste.`
          break
        case 3:
          texte += `$ ${texNombre(a)} = ${b} \\times ${q - 1} + ${r + b} $<br>`
		  texteCorr = `${r + b} est supérieur à ${b}. ${r + b} n'est donc pas le reste. <br> L'égalité $ ${texNombre(a)} = ${b} \\times ${q - 1} + ${r + b} $ ne traduit pas directement la division euclidienne de $ ${texNombre(a)} $ par ${b}. <br>
		  Transformons cette égalité en utilisant le fait que $ ${r + b} = ${r} + ${b} $<br>
		  $ ${texNombre(a)} = ${b} \\times ${q - 1} + ${r + b} = ${b} \\times ${q - 1} + ${b} + ${r} = ${b} \\times ${q} + ${r} $ <br>
		  Ainsi, $ ${texNombre(a)} = ${b} \\times ${q} + ${r} $
		  <br> On a donc : ${texte_en_couleur_et_gras(q)} le quotient et ${texte_en_couleur_et_gras(r)} le reste.`
          break
        case 4:
          texte += `$ ${texNombre(a)} = ${b} \\times ${q + 1} - ${b - r} $<br>`
		  texteCorr = `L'égalité $ ${texNombre(a)} = ${b} \\times ${q + 1} - ${b - r} $ ne traduit pas directement la division euclidienne de $ ${texNombre(a)} $ par ${b}.  <br>
		  Transformons cette égalité : <br>
		  Dans cette égalité on a pris ${q + 1} fois ${b} et on dépasse $ ${texNombre(a)} $. Cela veut dire qu'on a pris ${b} trop de fois.<br>
		  Prenons le une fois de moins, on va donc avoir ${q} fois ${b} : <br> 
		  $ ${texNombre(a)} = ${b} \\times ${q + 1} - ${b - r} = ${b} \\times ${q} + ${b} - ${b - r} = ${b} \\times ${q} + ${r} $ <br>
		  Ainsi, $ ${texNombre(a)} = ${b} \\times ${q} + ${r} $
		  <br> On a donc : ${texte_en_couleur_et_gras(q)} le quotient et ${texte_en_couleur_et_gras(r)} le reste.`
          break
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        /** *************** AMC Open ************************/
        this.qcm[1].push([texte, [texteCorr], [4]]) // [question,[reponse],[nb_lignes_cadre]]
        /*********************************************/
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    "1 : L\'égalité correspond à la division euclidienne\n2: L'égalité ne correspond pas nécessairement à la division euclidienne"
  ]
}
