import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texNombre, texteGras } from '../../modules/outils.js'
import { min } from 'mathjs'
export const titre = 'Union et Intersection de proportions'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '26/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export const uuid = '1aad3'
export const ref = 'techno1P8'
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = ''
    this.nbQuestions = 1 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, effectif, belote, tarot, inter, union, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          effectif = randint(22, 80)
          belote = randint(10, effectif - 10)
          tarot = randint(10, effectif - 10)
          inter = randint(3, min(belote, tarot) - 1)
          union = belote + tarot - inter
          texte = `Dans un club du 3ème age comprenant $${effectif}$ personnes, $${belote}$ jouent à la belote régulièrement,
          $${tarot}$ jouent au tarot et $${inter}$ d'entre eux pratiquent chacun des
          deux jeux de cartes. <br>
         Quelle est la proportion de personnes du club qui jouent  au tarot ${texteGras('ou')} à la belote?` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `On note :<br>
          $\\quad\\bullet\\quad p_T$ la proportion de personnes du club qui jouent au tarot.<br>
          $\\quad\\bullet\\quad p_B$ la proportion de personnes du club qui jouent à la belote.<br>
          $\\quad\\bullet\\quad p_{T\\cup B}$ la proportion de personnes du club qui jouent au tarot ${texteGras('ou')} à la belote.<br>
          $\\quad\\bullet\\quad p_{T\\cap B}$ la proportion de personnes du club qui jouent au tarot ${texteGras('et')} à la belote.<br>
        La population de référence est l'ensemble des membres du club, son effectif est $${effectif}$.<br>
        <br>D'après le cours, pour calculer la proportion d'une sous-population dans une population, on calcule :<br>
        <br>$p=\\dfrac{\\text{effectif de la sous-population}}{\\text{effectif de la population de référence}}$<br>
        <br>On a donc :  $p_T=\\dfrac{${tarot}}{${effectif}}\\quad;\\quad p_B=\\dfrac{${belote}}{${effectif}} \\quad;\\quad p_{T\\cap B}=\\dfrac{${inter}}{${effectif}}$<br>
          On sait que  $p_{T\\cup B} = p_T + p_B -  p_{T\\cap B}$.<br>
         Ce qui revient, en appliquant les données de l'énoncé, à écrire :<br>
         $p_{T\\cup B} = \\dfrac{${tarot}}{${effectif}} +\\dfrac{${belote}}{${effectif}}-\\dfrac{${inter}}{${effectif}}=\\dfrac{${union}}{${effectif}} \\approx ${texNombre(union / effectif, 2)}$<br>
         Il y a donc environ $${texNombre(100 * union / effectif, 0)}\\%$ de personnes du club qui jouent à la belote et au tarot dans ce club.<br>
         `
          break
        case 'type2':
          effectif = randint(22, 80)
          belote = randint(10, effectif - 10)
          tarot = randint(10, effectif - 10)
          inter = randint(3, min(belote, tarot) - 1)
          union = belote + tarot - inter
          texte = `Dans un club du 3ème age comprenant $${effectif}$ personnes, $${belote}$ jouent à la belote régulièrement,
          $${tarot}$ jouent au tarot et $${union}$ d'entre eux pratiquent au moins un des
          deux jeux de cartes. <br>
         Quelle est la proportion de personnes du club qui jouent au tarot ${texteGras('et')} à la belote ?` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `On note :<br>
          $\\quad\\bullet\\quad p_T$ la proportion de personnes du club qui jouent au tarot.<br>
          $\\quad\\bullet\\quad p_B$ la proportion de personnes du club qui jouent à la belote.<br>
          $\\quad\\bullet\\quad p_{T\\cup B}$ la proportion de personnes du club qui jouent au tarot ${texteGras('ou')} à la belote.<br>
          $\\quad\\bullet\\quad p_{T\\cap B}$ la proportion de personnes du club qui jouent au tarot ${texteGras('et')} à la belote.<br>
        La population de référence est l'ensemble des membres du club, son effectif est $${effectif}$.<br>
       <br>
        D'après le cours, pour calculer la proportion d'une sous-population dans une population, on calcule :<br>
        <br>$p=\\dfrac{\\text{effectif de la sous-population}}{\\text{effectif de la population de référence}}$<br>
        <br>On a donc :  $p_T=\\dfrac{${tarot}}{${effectif}}\\quad ; \\quad p_B=\\dfrac{${belote}}{${effectif}}\\quad ; \\quad p_{T\\cup B}=\\dfrac{${union}}{${effectif}}$<br>
         On note 
         On sait que  $p_{T\\cup B} = p_T + p_B -  p_{T\\cap B}$.<br>
         Ce qui revient, en appliquant les données de l'énoncé, à écrire :
         $ \\dfrac{${union}}{${effectif}}= \\dfrac{${tarot}}{${effectif}} +\\dfrac{${belote}}{${effectif}} - p_{T\\cap B}$<br>
         $p_{T\\cap B}=\\dfrac{${tarot}}{${effectif}} +\\dfrac{${belote}}{${effectif}}-\\dfrac{${union}}{${effectif}} =\\dfrac{${inter}}{${effectif}} \\approx ${texNombre(inter / effectif, 2)}$<br>
         Il y a donc environ $${texNombre(100 * inter / effectif, 0)}\\%$ de personnes du club qui jouent à la belote et au tarot dans ce club.<br>
         `
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
