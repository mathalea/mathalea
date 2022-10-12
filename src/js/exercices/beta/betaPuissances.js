import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { ecritureParentheseSiNegatif } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenuSansNumero } from '../../modules/outils/miseEnForme.js'
import { texFractionReduite } from '../../modules/outils/arrayFractions.js'
import { texNombrec } from '../../modules/outils/texNombres.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
export const titre = 'Exercice exemple'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.spacing = 4
  this.spacingCorr = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = ['type1']// , 'type2', 'type3']; // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let a, b, c, c1, c2, e1, e2, e3, e4, e5
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          c1 = choice([2, 3, 5, 7, 11])
          c2 = choice([2, 3, 5, 7, 11], c1)
          c = c1 * c2
          a = c1 * randint(1, 4)
          b = c2 * randint(1, 4)
          e1 = randint(-3, -1)
          e2 = randint(-11, 11, [-1, 0, 1])
          e3 = randint(-11, 11, [-1, 0, 1])
          e4 = randint(-3, -1, e1)
          e5 = randint(-11, 11, [-1, 0, 1])
          if (parseInt(this.sup) === 1) {
            e1 = randint(-3, -1)
            e2 = randint(-4, 4, [-1, 0, 1])
            e3 = randint(-4, 4, [-1, 0, 1])
            e4 = randint(-3, -1, e1)
            e5 = randint(-4, 4, [-1, 0, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} =  \\dfrac{ ${texNombrec(a * 10 ** e1)}  \\times 10^{${e2}} \\times ${b} \\times 10^{${e3}} }{ ${c} \\times 10^{${e4}} \\times 10^{${e5}} }$`
          texteCorr = texte
          texteCorr += '<br>'
          texteCorr += `$${lettreDepuisChiffre(i + 1)} =  \\dfrac{ ${a} \\times 10^{${e1}} \\times 10^{${e2}} \\times ${b} \\times 10^{${e3}} }{ ${c} \\times 10^{${e4}} \\times 10^{${e5}} }$`
          texteCorr += '<br>'
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = \\dfrac{ ${a} \\times ${b} }{ ${c} } \\times \\dfrac{  10^{${e1}} \\times 10^{${e2}} \\times 10^{${e3}} }{ 10^{${e4}} \\times 10^{${e5}} }$`
          texteCorr += '<br>'
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFractionReduite(a * b, c)} \\times \\dfrac{  10^{${e1}+${ecritureParentheseSiNegatif(e2)}+${ecritureParentheseSiNegatif(e3)}} }{ 10^{${e4}+${ecritureParentheseSiNegatif(e5)}} }$`
          texteCorr += '<br>'
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFractionReduite(a * b, c)} \\times \\dfrac{  10^{${e1 + e2 + e3}} }{ 10^{${e4 + e5}} }$`
          texteCorr += '<br>'
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFractionReduite(a * b, c)} \\times 10^{ ${e1 + e2 + e3}-${ecritureParentheseSiNegatif(e4 + e5)} }$`
          texteCorr += '<br>'
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFractionReduite(a * b, c)} \\times 10^{ ${e1 + e2 + e3 - (e4 + e5)} }$`
          break
        case 'type2':
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3': // Table de 200
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Facile\n2 : Difficile']
}
