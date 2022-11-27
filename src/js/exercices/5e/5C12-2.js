import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lettreDepuisChiffre, texNombre, miseEnEvidence } from '../../modules/outils.js'

export const titre = 'Distributivité numérique'

export const dateDePublication = '26/11/2022'

/**
 * Distribultivité numérique
 * @author Sébastien LOZANO
*/

export default class DistributiviteNumerique extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 6 // Ici le nombre de questions
    this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
    // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

    //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
    //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
    //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
    this.consigne = 'Calculer les expressions suivantes de deux manières différentes.'
  }

  // c'est ici que commence le code de l'exercice cette méthode crée une copie de l'exercice
  nouvelleVersion () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    // Quelques fonctions pour factoriser le code
    function avecLesPriorites (i, k, b, c, formeInitiale, operation) {
      let sortie = 'bug'
      if (formeInitiale === 'factorisee') {
        sortie = `
        $\\textbf{Méthode 1 : avec les priorités.}$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times (${texNombre(b)} ${operation === 1 ? `+ ${texNombre(c)}` : `- ${texNombre(c)}`})$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times ${operation === 1 ? texNombre(b + c) : texNombre(b - c)}$<br>
        $${lettreDepuisChiffre(i + 1)}=${operation === 1 ? texNombre(k * (b + c)) : texNombre(k * (b - c))}$<br>
        `
        sortie += `<br>
        $\\textbf{Méthode 2 : en distribuant d'abord.}$<br>
        $${lettreDepuisChiffre(i + 1)}=${miseEnEvidence(k)}\\times (${texNombre(b)} ${operation === 1 ? `+ ${texNombre(c)}` : `- ${texNombre(c)}`})$<br>
        $${lettreDepuisChiffre(i + 1)}=${miseEnEvidence(k)}\\times ${texNombre(b)} ${operation === 1 ? '+' : '-'} ${miseEnEvidence(k)}\\times ${c}$<br>
        $${lettreDepuisChiffre(i + 1)}=${texNombre(k * b)} ${operation === 1 ? '+' : '-'} ${texNombre(k * c)}$<br>
        $${lettreDepuisChiffre(i + 1)}=${operation === 1 ? texNombre(k * b + k * c) : texNombre(k * b - k * c)}$<br>
        `
      }
      if (formeInitiale === 'developpee') {
        sortie = `
        $\\textbf{Méthode 1 : avec les priorités.}$<br>
        $${lettreDepuisChiffre(i + 1)}=${k}\\times ${texNombre(b)} ${operation === 1 ? '+' : '-'} ${k}\\times ${texNombre(c)}$<br>
        $${lettreDepuisChiffre(i + 1)}=${texNombre(k * b)} ${operation === 1 ? '+' : '-'} ${texNombre(k * c)}$<br>
        $${lettreDepuisChiffre(i + 1)}=${operation === 1 ? texNombre(k * b + k * c) : texNombre(k * b - k * c)}$<br>
        `
        sortie += `<br>
        $\\textbf{Méthode 2 : en factorisant d'abord.}$<br>
        $${lettreDepuisChiffre(i + 1)}=${miseEnEvidence(k)}\\times ${texNombre(b)} ${operation === 1 ? '+' : '-'} ${miseEnEvidence(k)}\\times ${texNombre(c)}$<br>
        $${lettreDepuisChiffre(i + 1)}=${miseEnEvidence(k)}\\times (${texNombre(b)} ${operation === 1 ? `+ ${texNombre(c)}` : `- ${texNombre(c)}`})$<br>
        $${lettreDepuisChiffre(i + 1)}=${miseEnEvidence(k)}\\times ${operation === 1 ? texNombre(b + c) : texNombre(b - c)}$<br>
        $${lettreDepuisChiffre(i + 1)}=${operation === 1 ? texNombre(k * (b + c)) : texNombre(k * (b - c))}$<br>
        `
      }
      return sortie
    }

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      // Choix des paramètres aléatoires
      // Pour la gestion de la soustraction, on ne veut pas que b-c soit négatif
      let k = randint(2, 9)
      let b = randint(1, 9, [k])
      let c = randint(1, 9, [k, b])
      let temp
      if (b < c) {
        temp = b
        b = c
        c = temp
      }
      // Pour éviter la contre-productivité tendant à montrer que distribuer allonge le travail
      // On ajoute le cas classique d'application au calcul mental
      const puissance = [100, 1000]
      const ajoutRetrait = randint(1, 9)
      texte = ''
      texteCorr = ''
      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 6 cas sont prévus...
        case 1: // k(a+b)
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times (${texNombre(b)} + ${texNombre(c)})$`
          texteCorr += avecLesPriorites(i, k, b, c, 'factorisee', 1)
          break
        case 2: // ka+kb
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${texNombre(b)} + ${k}\\times ${texNombre(c)}$`
          texteCorr += avecLesPriorites(i, k, b, c, 'developpee', 1)
          break
        case 3: // k(a-b)
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times (${texNombre(b)} - ${texNombre(c)})$`
          texteCorr += avecLesPriorites(i, k, b, c, 'factorisee', -1)
          break
        case 4: // ka-kb
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${texNombre(b)} - ${k}\\times ${texNombre(c)}$`
          texteCorr += avecLesPriorites(i, k, b, c, 'developpee', -1)
          break
        case 5: { // Calcul mental addition
          k = randint(47, 83)
          const choixIndicePuissance = randint(0, 1)
          c = ajoutRetrait
          b = puissance[choixIndicePuissance] - c
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${texNombre(b)} + ${k}\\times ${c}$`
          texteCorr += avecLesPriorites(i, k, b, c, 'developpee', 1)
          break
        }
        case 6: { // Calcul mental soustraction
          k = randint(47, 83)
          const choixIndicePuissance = randint(0, 1)
          c = ajoutRetrait
          b = puissance[choixIndicePuissance] + c
          texte += `$${lettreDepuisChiffre(i + 1)}=${k}\\times ${texNombre(b)} - ${k}\\times ${c}$`
          texteCorr += avecLesPriorites(i, k, b, c, 'developpee', -1)
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
