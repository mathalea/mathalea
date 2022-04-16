import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, shuffle } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Valeurs remarquables du cosinus et sinus'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * donner les valeurs remarquables du cosinus et du sinus avec trois niveaux :
 * 1 : quart de cercle trigo, 2 : avec les angles associés, 3 : avec les angles modulo 2kpi.
 * @author Stéphane Guyon - Jean Claude Lhote - Loïc Geeraerts
 * Référence 1G10
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
    const mesAnglesNiv1 = mesAngles.slice()
    const nombreAnglesDeBase = mesAngles.length

    // ici on complète la liste avec tous les angles associés en faisant attention de ne pas ajouter deux fois les mêmes.
    for (let i = 0; i < nombreAnglesDeBase; i++) {
      if (!mesAngles.find(element => angleOppose(mesAngles[i]).radian === element.radian)) mesAngles.push(angleOppose(mesAngles[i]))
      if (!mesAngles.find(element => angleComplementaire(mesAngles[i]).radian === element.radian)) mesAngles.push(angleComplementaire(mesAngles[i]))
      if (!mesAngles.find(element => angleSupplementaire(mesAngles[i]).radian === element.radian)) mesAngles.push(angleSupplementaire(mesAngles[i]))
    }
    const mesAnglesNiv2 = mesAngles.slice()
    for (let i = 0; i < nombreAnglesDeBase; i++) {
      for (let k = -5; k < 6; k++) {
        if (k !== 0) mesAngles.push(angleModulo(mesAngles[i % nombreAnglesDeBase], k))
      }
    }
    const mesAnglesNiv3 = mesAngles.slice()

    if (this.nbQuestions > 10 && this.sup === 1) this.nbQuestions = 10 // on bride car il n'y a que 10 question différentes au niveau 1
    else if (this.nbQuestions > 26 && this.sup === 2) this.nbQuestions = 26 // Le bridage est un peu plus large pour le niveau 2
    else if (this.nbQuestions > 126) this.nbQuestions = 126 // là c'est carrément l'opulence avec le niveau 3 !
    if (this.sup === 1) {
      mesAnglesAleatoires = shuffle(mesAnglesNiv1)
    }
    if (this.sup === 2) {
      mesAnglesAleatoires = shuffle(mesAnglesNiv2)
    }
    if (this.sup === 3) {
      mesAnglesAleatoires = shuffle(mesAnglesNiv3)
    }

    const typeQuestionsDisponibles = []
    for (let i = 0; i < mesAnglesAleatoires.length; i++) {
      typeQuestionsDisponibles.push(['cos', mesAnglesAleatoires[i]])
      typeQuestionsDisponibles.push(['sin', mesAnglesAleatoires[i]])
    }

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 127;) {
      const monAngle = listeTypeQuestions[i][1]

      texte = `$\\${listeTypeQuestions[i][0]}\\big(${monAngle.radian}\\big)$`
      texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: ' = ' })
      texteCorr = `$\\${listeTypeQuestions[i][0]}\\big(${monAngle.radian}\\big)`
      let valeurFonction = ''

      // listeTypeQuestions[i][0] contient 'cos' ou 'sin', donc on s'en sert pour uniformiser le code et on n'a plus besoin de switch.
      // monAngle[listeTypeQuestions[i][0]] fait référence à monAngle.cos ou à monAngle.sin selon la valeur de listeTypeQuestions[i][0].

      setReponse(this, i, monAngle[listeTypeQuestions[i][0]], { formatInteractif: 'calcul' })
      valeurFonction = Array.isArray(monAngle[listeTypeQuestions[i][0]]) ? monAngle[listeTypeQuestions[i][0]][0] : monAngle[listeTypeQuestions[i][0]]
      texteCorr += `=${valeurFonction}$`

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, listeTypeQuestions[i][0][0], listeTypeQuestions[i][1].radian)) { // On regarde l'angle en radian et le type de fonction
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}

function angleOppose (angle) { // retourne un objet angle contenant l'angle opposé
  if (angle.degres === '0') return angle
  else { return { degres: '-' + angle.degres, cos: angle.cos, sin: angle.sin === '0' ? angle.sin : '-' + angle.sin, radian: '-' + angle.radian } }
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
function angleComplementaire (angle) { // retourne un objet angle contenant l'angle complémentaire
  return { degres: (90 - parseInt(angle.degres)).toString(), cos: angle.sin, sin: angle.cos, radian: complementaireRad(angle.radian) }
}
function angleSupplementaire (angle) { // retourne un objet angle contenant l'angle supplémentaire
  return { degres: (180 - parseInt(angle.degres)).toString(), cos: angle.cos === '0' ? '0' : '-' + angle.cos, sin: angle.sin, radian: supplementaireRad(angle.radian) }
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
