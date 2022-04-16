import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, shuffle } from '../../modules/outils.js'
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
 * @author Stéphane Guyon - Jean Claude Lhote
 * Référence
*/

export default class CosEtsin extends Exercice { // Héritage de la classe Exercice()
  constructor () {
    super()
    this.consigne = 'Déterminer la valeur exacte de :'
    this.nbQuestions = 3 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
    this.sup = 1 // difficulté par défaut
    this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Quart de cercle trigo\n2 : Avec les angles associés \n3 : Angle quelconque']
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let mesAnglesAleatoires = []
    // Mettre dans cette liste, les angles du premier quart de cercle.
    const mesAngles = [
      { degres: '90', cos: '0', sin: '1', radian: '\\dfrac{\\pi}{2}' },
      { degres: '45', cos: '\\dfrac{\\sqrt{2}}{2}', sin: '\\dfrac{\\sqrt{2}}{2}', radian: '\\dfrac{\\pi}{4}' },
      { degres: '60', cos: ['\\dfrac{1}{2}', '0.5'], sin: '\\dfrac{\\sqrt{3}}{2}', radian: '\\dfrac{\\pi}{3}' },
      { degres: '30', sin: ['\\dfrac{1}{2}', '0.5'], cos: '\\dfrac{\\sqrt{3}}{2}', radian: '\\dfrac{\\pi}{6}' },
      { degres: '0', cos: '1', sin: '0', radian: '0' }
    ]
    const nombreAnglesDeBase = mesAngles.length

    // ici on complète la liste avec tous les angles associés (donc on multiplie par 4 la taille de la liste)
    for (let i = 0; i < nombreAnglesDeBase; i++) {
      mesAngles.push(angleOppose(mesAngles[i]), angleComplementaire(mesAngles[i]), angleSupplementaire(mesAngles[i]))
    }
    if (this.nbQuestions > 10 && this.sup === 1) this.nbQuestions = 10 // on bride car il n'y a que 10 question différentes au niveau 1

    if (this.sup === 1) {
      const mesAnglesNiv1 = mesAngles.slice(0, nombreAnglesDeBase)
      mesAnglesAleatoires = shuffle(mesAnglesNiv1)
    }
    if (this.sup === 2) {
      const mesAnglesNiv2 = mesAngles.slice(nombreAnglesDeBase, 4 * nombreAnglesDeBase)
      mesAnglesAleatoires = shuffle(mesAnglesNiv2)
    }
    if (this.sup === 3) {
      for (let i = 0; i < nombreAnglesDeBase; i++) {
        for (let k = -5; k < 6; k++) {
          if (k !== 0) mesAngles.push(angleModulo(mesAngles[i % nombreAnglesDeBase], k))
        }
      }
      const mesAnglesNiv3 = mesAngles.slice(4 * nombreAnglesDeBase)
      mesAnglesAleatoires = shuffle(mesAnglesNiv3)
    }

    const typeQuestionsDisponibles = []
    for (let i = 0; i < mesAnglesAleatoires.length; i++) {
      typeQuestionsDisponibles.push(['cos', mesAnglesAleatoires[i]])
      typeQuestionsDisponibles.push(['sin', mesAnglesAleatoires[i]])
    }

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 500;) { // Boucle principale où i+1 correspond au numéro de la question
      const monAngle = listeTypeQuestions[i][1]

      texte = `$\\${listeTypeQuestions[i][0]}\\big(${monAngle.radian}\\big)$`
      texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: ' = ' })
      texteCorr = `$\\${listeTypeQuestions[i][0]}\\big(${monAngle.radian}\\big)`
      let valeurFonction = ''
      switch (listeTypeQuestions[i][0]) { // Suivant le type de question, le contenu sera différent
        case 'cos':
          setReponse(this, i, monAngle.cos, { formatInteractif: 'calcul' })
          valeurFonction = Array.isArray(monAngle.cos) ? monAngle.cos[0] : monAngle.cos
          break
        case 'sin':
          setReponse(this, i, monAngle.sin, { formatInteractif: 'calcul' })
          valeurFonction = Array.isArray(monAngle.sin) ? monAngle.sin[0] : monAngle.sin
          break
      }
      texteCorr += `=${valeurFonction}$`

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, listeTypeQuestions[i][0][0], monAngle.degres)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}

function angleOppose (angle) { // ça c'est facile à comprendre
  if (angle.degres === '0') return angle
  else { return { degres: '-' + angle.degres, cos: angle.cos, sin: '-' + angle.sin, radian: '-' + angle.radian } }
}
function complementaireRad (angleEnRadian) { // fonction utilitaire pour passer d'un angle en radian à son complémentaire
  switch (angleEnRadian) {
    case '\\dfrac{\\pi}{4}':
      return angleEnRadian
    case '\\dfrac{\\pi}{6}':
      return '\\dfrac{\\pi}{3}'
    case '\\dfrac{\\pi}{3}':
      return '\\dfrac{\\pi}{6}'
    case '\\dfrac{\\pi}{2}' :
      return '0'
    case '0' :
      return '\\dfrac{\\pi}{2}'
  }
}
function supplementaireRad (angleEnRadian) { // fonction utilitaire pour passer d'un angle en radian à son supplémentaire
  switch (angleEnRadian) {
    case '\\dfrac{\\pi}{4}':
      return '\\dfrac{3\\pi}{4}'
    case '\\dfrac{\\pi}{6}':
      return '\\dfrac{5\\pi}{6}'
    case '\\dfrac{\\pi}{3}':
      return '\\dfrac{2\\pi}{3}'
    case '\\dfrac{\\pi}{2}' :
      return '\\dfrac{\\pi}{2}'
    case '0' :
      return '\\pi'
  }
}
function angleComplementaire (angle) { // idem angleOppose (facile à comprendre)
  return { degres: (90 - parseInt(angle.degres)).toString(), cos: angle.sin, sin: angle.cos, radian: complementaireRad(angle.radian) }
}
function angleSupplementaire (angle) { // idem angleOppose (facile à comprendre)
  return { degres: (180 - parseInt(angle.degres)).toString(), cos: '-' + angle.cos, sin: angle.sin, radian: supplementaireRad(angle.radian) }
}
function moduloRad (angleEnRadian, k) {
  switch (angleEnRadian) {
    case '\\dfrac{\\pi}{4}':
      return `\\dfrac{${8 * k + 1}\\pi}{4}`
    case '\\dfrac{\\pi}{6}':
      return `\\dfrac{${12 * k + 1}\\pi}{6}`
    case '\\dfrac{\\pi}{3}':
      return `\\dfrac{${6 * k + 1}\\pi}{3}`
    case '\\dfrac{\\pi}{2}' :
      return `\\dfrac{${4 * k + 1}\\pi}{2}`
    case '0' :
      return `${2 * k}\\pi`
  }
}
function angleModulo (angle, k) {
  return { degres: angle.degres, cos: angle.cos, sin: angle.sin, radian: moduloRad(angle.radian, k) }
}
