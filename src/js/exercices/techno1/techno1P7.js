import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, tableauColonneLigne, randint, texNombre } from '../../modules/outils.js'
import { min } from 'mathjs'
export const titre = 'Proportions dans tableau'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
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

    const typeQuestionsDisponibles = ['type1'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, O1, O2, A1, A2, C1, C2, O, A, C, H, F, T, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      O1 = randint(5, 30)// effectif ouv hommes
      O2 = randint(5, 30)// effectif ouv femmes
      A1 = randint(5, 10)// effectif admini hommes
      A2 = randint(5, 20)// effectif admini femmes
      C1 = randint(2, min(O1, O2, A1, A2))// effectif cadres hommes
      C2 = randint(2, min(O1, O2, A1, A2))// effectif cadres femmes
      C = C1 + C2// effectif cadres
      A = A1 + A2// effectif adm
      O = O1 + O2// effectif ouv
      T = O + A + C// effectif tot
      H = O1 + A1 + C1// effectif hommes
      F = O2 + A2 + C2// effectif femmes
      texte = 'Voici la répartition du personnel d\'une entreprise cévenole, par sexe et par catégorie :<br><br>'
      texte += tableauColonneLigne(['', '\\text{Ouvriers}', '\\text{Administratifs}', '\\text{Cadres}', '\\text{Total}'], ['\\text{Hommes}', '\\text{Femmes}', '\\text{Total}'], [O1, A1, C1, H, O2, A2, C2, F, O, A, C, T])

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          texte += '<br><br>1. Déterminer la proportion d\'ouvriers dans cette entreprise. '
          texte += '<br>2. Déterminer la proportion de cadres parmi les femmes de cette entreprise. '
          texte += '<br>3. Déterminer la proportion d\'hommes parmi les administratifs de cette entreprise. '
          texteCorr = `1. On cherche la proportion d\'ouvriers dans cette entreprise.
          <br>La population de référence est celle de l'entreprise.
          <br>On note $N=${T}$ cet effectif.
          <br>La sous-population étudiée est celle des ouvriers.
          <br>On note $n=${O}$ cet effectif.
          <br>On sait d'après le cours que la proportion d'ouvriers dans l'entreprise est alors égale à :
          <br> $p=\\dfrac{n}{N}=\\dfrac{${O}}{${T}}\\approx ${texNombre(O / T, 2)}$.
          <br> On peut conclure qu'il y a $${texNombre(O * 100 / T, 0)}\\%$ d'ouvriers dans cette entreprise.
          <br>2. On cherche maintenant la proportion de cadres parmi les femmes.
        <br> La population de référence est celle des femmes.
        <br>On note $N=${F}$ cet effectif.
        <br>La sous-population étudiée est celle des cadres femmes.
        <br>On note $n=${C2}$ cet effectif.
        <br>On sait d'après le cours que la proportion de cadres parmi les femmes de l'entreprise est alors égale à :
        <br> $p=\\dfrac{n}{N}=\\dfrac{${C2}}{${F}}\\approx ${texNombre(C2 / F, 2)}$.
        <br> On peut conclure qu'il y a $${texNombre(C2 * 100 / F, 0)}\\%$ cadres parmi les femmes de cette entreprise.
        <br><B>3.<\b> On cherche maintenant la proportion des hommes parmi les administratifs.
        <br> La population de référence est celle des administratifs.
        <br>On note $N=${F}$ cet effectif.
        <br>La sous-population étudiée est celle des hommes du secteur administratif.
        <br>On note $n=${C2}$ cet effectif.
        <br>On sait d'après le cours que la proportion des hommes parmi les administratifs de l'entreprise est alors égale à :
        <br> $p=\\dfrac{n}{N}=\\dfrac{${C2}}{${F}}\\approx ${texNombre(C2 / F, 2)}$.
        <br> On peut conclure qu'il y a $${texNombre(C2 * 100 / F, 0)}\\%$ d'hommes parmi les administratifs de cette entreprise.`
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
