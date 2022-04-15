import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Valeurs remarquables du cosinus et sinus'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '14/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function CosetSin () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Donner la valeur exacte de :'
  this.nbQuestions = 1 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url

  function angleOppose (angle) { // ça c'est facile à comprendre
    return { degres: '-' + angle.degres, cos: angle.cos, sin: '-' + angle.sin, radian: '-' + angle.radian }
  }
  function complementaire (angleEnRadian) { // fonction utilitaire pour passer d'un angle en radian à son complémentaire
    switch (angleEnRadian) {
      case '\\dfrac{\\pi}{4}':
        return angleEnRadian
      case '\\dfrac{\\pi}{6}':
        return '\\dfrac{\\pi}{3}'
      case '\\dfrac{\\pi}{3}':
        return '\\dfrac{\\pi}{6}'
      case '90' :
        return '0'
      case '0' :
        return '90'
    }
  }
  function supplementaire (angleEnRadian) { // fonction utilitaire pour passer d'un angle en radian à son supplémentaire
    switch (angleEnRadian) {
      case '\\dfrac{\\pi}{4}':
        return '\\dfrac{3\\pi}{4}'
      case '\\dfrac{\\pi}{6}':
        return '\\dfrac{5\\pi}{6}'
      case '\\dfrac{\\pi}{3}':
        return '\\dfrac{2\\pi}{3}'
      case '90' :
        return '90'
      case '0' :
        return '180'
    }
  }
  function angleComplementaire (angle) { // idem angleOppose (facile à compredre)
    return { degres: (90 - parseInt(angle.degres)).toString(), cos: angle.sin, sin: angle.cos, radian: complementaire(angle.radian) }
  }
  function angleSupplementaire (angle) { // idem angleOppose (facile à compredre)
    return { degres: (180 - parseInt(angle.degres)).toString(), cos: '-' + angle.cos, sin: angle.sin, radian: supplementaire(angle.radian) }
  }
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['cos', 'sin'] // On créé 3 types de questions
    // Mettre dans cette liste, les angles du premier quart de cercle.
    const mesAngles = [
      { degres: '90', cos: '0', sin: '1', radian: '\\dfrac{\\pi}{2}' },
      { degres: '45', cos: '\\dfrac{\\sqrt{2}}{2}', sin: '\\dfrac{\\sqrt{2}}{2}', radian: '\\dfrac{\\pi}{4}' }
    ]
    const nombreAnglesDeBase = mesAngles.length
    // ici on complète la liste avec tous les angles associés (donc on multiplie par 4 la taille de la liste)
    for (let i = 0; i < nombreAnglesDeBase; i++) {
      mesAngles.push(angleOppose(mesAngles[i]), angleComplementaire(mesAngles[i]), angleSupplementaire(mesAngles[i]))
    }
    console.log(mesAngles) // voici le résultat

    const mesAnglesAleatoires = combinaisonListes(mesAngles, this.nbQuestions)
    // On mélange

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const monAngle = mesAnglesAleatoires[i]
      /* const degres = monAngle.degres
      const radian = monAngle.radian
      const cos = monAngle.cos
      */
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'cos':
          texte = `Déterminer la valeur exacte de $\\cos\\big(${monAngle.radian}\\big)$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: ' = ' })
          texteCorr = `$\\cos\\big(${monAngle.radian}\\big)=${monAngle.cos}$`
          setReponse(this, i, `${monAngle.cos}`, { formatInteractif: 'calcul' })
          break
        case 'sin':
          texte = `Déterminer la valeur exacte de $\\sin\\big(${monAngle.radian}\\big)$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: ' = ' })
          texteCorr = `$\\sin\\big(${monAngle.radian}\\big)=${monAngle.sin}$`
          setReponse(this, i, `${monAngle.sin}`, { formatInteractif: 'calcul' })
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
