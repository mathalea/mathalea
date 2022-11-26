import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lettreDepuisChiffre } from '../../modules/outils.js'

export const titre = 'Distributivité et calcul mental'

export const dateDePublication = '26/11/2022'

/**
 * Distribultivité numérique
 * @author Sébastien LOZANO
*/

export default class DistributiviteNumerique extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 4 // Ici le nombre de questions
    this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
    // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

    //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
    //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
    //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
    this.consigne = 'Utiliser la distributivité pour calculer de façon astucieuse les expressions suivantes.'
  }

  // c'est ici que commence le code de l'exercice cette méthode crée une copie de l'exercice
  nouvelleVersion () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    // Quelques fonctions pour factoriser le code
    function avecLesPriorites (i, k, b, c, formeInitiale, operation) {
      let sortie = 'bug'
      if (formeInitiale === 'factorisee') {
        sortie = `
        $\\textbf{Ici, il est plus judicieux de distribuer d'abord :}$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times ${operation === 1 ? b + c : b - c}$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times (${b} ${operation === 1 ? `+ ${c}` : `- ${c}`})$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times ${b} ${operation === 1 ? '+' : '-'} ${k}\\times ${c}$<br>          
        $${lettreDepuisChiffre(i + 1)}=${k * b} ${operation === 1 ? '+' : '-'} ${k * c}$<br>
        $${lettreDepuisChiffre(i + 1)}=${operation === 1 ? k * b + k * c : k * b - k * c}$<br>
        `
      }
      if (formeInitiale === 'developpee') {
        sortie = `
        $\\textbf{Ici, il est plus judicieux de factoriser d'abord :}$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times ${b} ${operation === 1 ? '+' : '-'} ${k}\\times ${c}$<br>          
        $${lettreDepuisChiffre(i + 1)}=${k}\\times (${b} ${operation === 1 ? `+ ${c}` : `- ${c}`})$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times ${operation === 1 ? b + c : b - c}$<br>
        $${lettreDepuisChiffre(i + 1)}=${operation === 1 ? k * (b + c) : k * (b - c)}$<br>
        `
      }
      return sortie
    }

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      // Choix des paramètres aléatoires
      let k, b, c
      const puissance = [100, 1000]
      const ajoutRetrait = randint(1, 3)
      texte = ''
      texteCorr = ''
      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1: { // Calcul mental addition developpée initialement
          k = randint(47, 83)
          const choixIndicePuissance = randint(0, 1)
          c = ajoutRetrait
          b = puissance[choixIndicePuissance] - c
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${b} + ${k}\\times ${c}$`
          texteCorr += avecLesPriorites(i, k, b, c, 'developpee', 1)
          break
        }
        case 2: { // Calcul mental soustraction  developpée initialement
          k = randint(47, 83)
          const choixIndicePuissance = randint(0, 1)
          c = ajoutRetrait
          b = puissance[choixIndicePuissance] + c
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${b} - ${k}\\times ${c}$`
          texteCorr += avecLesPriorites(i, k, b, c, 'developpee', -1)
          break
        }
        case 3: { // Calcul mental addition factorisée initialement
          k = randint(47, 83)
          const choixIndicePuissance = randint(0, 1)
          c = ajoutRetrait
          b = puissance[choixIndicePuissance] - c
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${b + 2 * c}$`
          texteCorr += avecLesPriorites(i, k, b + c, c, 'factorisee', 1)
          break
        }
        case 4: { // Calcul mental soustraction factorisée initialement
          k = randint(47, 83)
          const choixIndicePuissance = randint(0, 1)
          c = ajoutRetrait
          b = puissance[choixIndicePuissance] + c
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${b - 2 * c}$`
          texteCorr += avecLesPriorites(i, k, b - c, c, 'factorisee', -1)
          break
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
