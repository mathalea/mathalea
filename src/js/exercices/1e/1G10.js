import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, shuffle, contraindreValeur } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
import { valeursTrigo } from '../../modules/fonctionsMaths.js'
import { cercleTrigo } from '../../modules/2d.js'
export const titre = 'Valeurs remarquables du cosinus et sinus'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/** import { valeursTrigo } from './../../modules/fonctionsMaths';
import { rangeMinMax } from './../../../../build/modules/outils';
import { contraindreValeur } from './../../../../www/build/modules/outils';

 * donner les valeurs remarquables du cosinus et du sinus avec trois niveaux :
 * 1 : quart de cercle trigo, 2 : avec les angles associés, 3 : avec les angles modulo 2kpi.
 * @author Stéphane Guyon - Jean Claude Lhote - Loïc Geeraerts
 * Référence 1G10
*/

export const uuid = '4e684'
export const ref = '1G10'
export default class CosEtsin extends Exercice { // Héritage de la classe Exercice()
  constructor () {
    super()
    this.consigne = 'Déterminer la valeur exacte de :'
    this.nbQuestions = 3 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
    this.sup = 1 // difficulté par défaut
    this.sup2 = '-1,1'
    this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Quart de cercle trigo\n2 : Avec les angles associés \n3 : Avec en plus des angles modulo k × 360']
    this.besoinFormulaire2Texte = ['Valeurs de k', 'Valeurs entières non nulles séparées par des virgules']
    // TODO: ajouter tangente avec paramètre caché
    // TODO: ajouter cercle trigonométrique
    // TODO: solutionnaire détaillé
    // TODO: Peut-être mettre en paramètre l'étendue des modulos pour avoir un contrôle sur le niveau de difficulté
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let mesAnglesAleatoires = []
    this.sup = contraindreValeur(1, 3, this.sup, 1)
    let listeK = [-1, 1]
    if (this.sup === 3) {
      listeK = this.sup2.split(',')
      for (let k = 0; k < listeK.length; k++) {
        const n = parseInt(listeK[k])
        if (n !== 0 && listeK.indexOf(n) === -1) {
          listeK[k] = n
        }
      }
    }
    const mesAngles = valeursTrigo({ associes: true, modulos: listeK })
    if (this.nbQuestions > 10 && this.sup === 1) this.nbQuestions = 10 // on bride car il n'y a que 10 question différentes au niveau 1
    else if (this.nbQuestions > 26 && this.sup === 2) this.nbQuestions = 26 // Le bridage est un peu plus large pour le niveau 2
    else if (this.nbQuestions > 126) this.nbQuestions = 126 // là c'est carrément l'opulence avec le niveau 3 !
    if (this.sup === 1) {
      mesAnglesAleatoires = shuffle(mesAngles.liste1)
    }
    if (this.sup === 2) {
      mesAnglesAleatoires = shuffle(mesAngles.liste2)
    }
    if (this.sup === 3) {
      mesAnglesAleatoires = shuffle(mesAngles.liste3)
    }

    const typeQuestionsDisponibles = []
    for (let i = 0; i < mesAnglesAleatoires.length; i++) {
      typeQuestionsDisponibles.push(['cos', mesAnglesAleatoires[i]])
      typeQuestionsDisponibles.push(['sin', mesAnglesAleatoires[i]])
    }

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 127;) {
      const monAngle = listeTypeQuestions[i][1]

      texte = `$\\${listeTypeQuestions[i][0]}\\left(${monAngle.radians}\\right)$`
      texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: ' = ' })
      texteCorr = `$\\${listeTypeQuestions[i][0]}\\left(${monAngle.radians}\\right)`
      let valeurFonction = ''
      // listeTypeQuestions[i][0] contient 'cos' ou 'sin', donc ça permet d'atteindre la propriété souhaitée dans l'objet Angle.
      // monAngle[listeTypeQuestions[i][0]] fait référence à monAngle.cos ou à monAngle.sin selon la valeur de listeTypeQuestions[i][0].

      setReponse(this, i, monAngle[listeTypeQuestions[i][0]], { formatInteractif: 'calcul' })
      // dans quelques cas, les valeurs de cos et sin sont multiples et contenues dans une liste avec en premier '1/2', en deuxième la valeur décimale '0.5'
      valeurFonction = Array.isArray(monAngle[listeTypeQuestions[i][0]]) ? monAngle[listeTypeQuestions[i][0]][0] : monAngle[listeTypeQuestions[i][0]]
      texteCorr += `=${valeurFonction}$`

      texteCorr += '<br><br>'
      texteCorr += cercleTrigo(monAngle, listeTypeQuestions[i][0])

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, listeTypeQuestions[i][0][0], listeTypeQuestions[i][1].radians)) { // On regarde l'angle en radian et le type de fonction
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)

        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
    if (!context.isHtml) {
      this.canEnonce = 'Donner la valeur exacte de ' + this.listeQuestions[0] + '.'
      this.correction = this.listeCorrections[0]
      this.canReponseACompleter = ''
    }
  }
}
