import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { randint, listeQuestionsToContenu, choice, premiereLettreEnMajuscule, numAlpha, texFractionSigne, calcul, arrondi, texteGras, stringNombre } from '../../modules/outils.js'
import { repere, traceBarre } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Calculer des effectifs et des fréquences'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Calculer des effectifs et des fréquences.
* @author Erwan DUPLESSY
* 3S12
* 2021-02-07
*/

export const uuid = 'f4b95'
export const ref = '3S12'
export default function CalculEffectifFrequence () {
  Exercice.call(this)
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Répondre aux questions à l\'aide du graphique et de calculs.'
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.video = 'https://youtu.be/GWDDay-mdVA' // Id YouTube ou url
  this.correctionDetailleeDisponible = false
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  this.sup = 1 // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    // let listeTypeDeQuestions_disponibles= [];
    const lstQuadri = ['Girafes', 'Zèbres', 'Gnous', 'Buffles', 'Gazelles', 'Crocodiles', 'Rhinocéros', 'Léopards', 'Guépards', 'Hyènes', 'Lycaons', 'Servals', 'Phacochères']
    const lstOiseaux = ['hérons', 'marabouts', 'flamants roses', 'cigognes', 'grues', 'vautours']
    const nbAnimaux = 4 + parseInt(this.sup) // nombre d'animaux différents dans l'énoncé (entre 5 et 7)
    const nbQuadri = 3
    const lstAnimauxExo = [] // liste des animaux uniquement cités dans l'exercice
    const lstNombresAnimaux = [] // liste des effectifs de chaque animal
    let lstVal = [] // liste des valeurs à éviter pour les effectifs
    let N = 0; let nom = ''; let texte = ''; let texteCorr = ''

    for (let i = 0; i < nbAnimaux; i++) {
      N = randint(2, 10, lstVal) // choisit un nombre entre 2 et 10 sauf dans les valeurs à éviter
      lstNombresAnimaux.push(N)
      lstVal = lstVal.concat([N]) // valeurs à supprimer pour éviter des valeurs égales
      if (i < nbQuadri) {
        nom = choice(lstQuadri, lstAnimauxExo) // choisit un animal au hasard sauf parmi ceux déjà utilisés
      } else {
        nom = choice(lstOiseaux, lstAnimauxExo) // choisit un animal au hasard sauf parmi ceux déjà utilisés
      }
      lstAnimauxExo.push(nom)
    }

    const lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan', 'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane']

    texte += 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a des animaux. '
    texte += 'Certains sont des quadrupèdes ('
    for (let i = 0; i < nbQuadri; i++) {
      texte += lstAnimauxExo[i] + ', '
    }
    texte = texte.substring(0, texte.length - 2)
    texte += '), et d\'autres sont des oiseaux ('
    for (let i = nbQuadri; i < nbAnimaux; i++) {
      texte += lstAnimauxExo[i] + ', '
    }
    texte = texte.substring(0, texte.length - 2)
    texte += '). '

    texte += 'Voici un diagramme en barres qui donne le nombre d\'individus pour chaque espèce.<br>'
    texte += numAlpha(0) + ' Quel est l\'effectif des ' + lstAnimauxExo[0] + ' ?<br>'
    texte += ajouteChampTexteMathLive(this, 1)
    texte += numAlpha(1) + ' Calculer la fréquence des ' + lstAnimauxExo[1] + ' ? Donner le résultat sous la forme d\'un pourcentage.<br>'
    texte += ajouteChampTexteMathLive(this, 2)
    texte += numAlpha(2) + ' Calculer l\'effectif des quadrupèdes ? <br>'
    texte += ajouteChampTexteMathLive(this, 3)
    texte += numAlpha(3) + ' Calculer la fréquence des oiseaux ? Donner le résultat sous la forme d\'un pourcentage.<br>'
    texte += ajouteChampTexteMathLive(this, 4)

    texte += 'Les pourcentages seront éventuellement arrondis à 0,1% près. <br>'

    const coef = 1

    const r = repere({
      grilleX: false,
      grilleY: 'pointilles',
      xThickListe: [],
      xLabelListe: [],
      yUnite: 1 / coef,
      yThickDistance: 1 * coef,
      yMax: 11,
      xMin: 0,
      xMax: 10,
      yMin: 0,
      axeXStyle: '',
      yLegende: "Nombre d'individus"
    })

    const lstElementGraph = []
    for (let i = 0; i < nbAnimaux; i++) {
      lstElementGraph.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiereLettreEnMajuscule(lstAnimauxExo[i]), { unite: 1 / coef }))
    }
    texte += '<br>' + mathalea2d({ xmin: -5, xmax: 11, ymin: -4, ymax: 12, pixelsParCm: 30, scale: 1 }, r, lstElementGraph)

    // début de la correction
    // question 1
    texteCorr += numAlpha(0) + texteGras(' D\'après le graphique, il y a ' + lstNombresAnimaux[0] + ' ' + lstAnimauxExo[0] + '. <br>')
    setReponse(this, 1, lstNombresAnimaux[0])
    // question 2
    let Ntotal = lstNombresAnimaux[0]
    texteCorr += numAlpha(1) + ' L\'effectif total des animaux est : ' + lstNombresAnimaux[0]
    for (let i = 1; i < nbAnimaux; i++) {
      texteCorr += ' + ' + lstNombresAnimaux[i]
      Ntotal += lstNombresAnimaux[i]
    }

    texteCorr += ' = ' + Ntotal + '. '
    texteCorr += ' D\'après le graphique, il y a ' + lstNombresAnimaux[1] + ' ' + lstAnimauxExo[1] + '. <br>'
    texteCorr += ' La fréquence (ou la proportion) de  ' + lstAnimauxExo[1] + ' est : $ ' + texFractionSigne(lstNombresAnimaux[1], Ntotal) + '$ '
    // test de l'arrondi
    if (calcul(lstNombresAnimaux[1] / Ntotal, 4) === arrondi(lstNombresAnimaux[1] / Ntotal, 3)) {
      texteCorr += '= '
    } else {
      texteCorr += '$\\approx $ '
    }
    texteCorr += stringNombre(lstNombresAnimaux[1] / Ntotal, 3) + '. <br>'
    texteCorr += texteGras('La fréquence des ' + lstAnimauxExo[1] + ' est donc : ' + stringNombre(100 * lstNombresAnimaux[1] / Ntotal, 1) + '%. <br>')
    setReponse(this, 2, [calcul(100 * lstNombresAnimaux[1] / Ntotal, 1), `${calcul(100 * lstNombresAnimaux[1] / Ntotal, 1)}\\%`])
    // question 3
    texteCorr += numAlpha(2) + ' On fait la somme des effectifs de chaque espèce de quadrupèdes : '
    let NTotalQuadri = lstNombresAnimaux[0]
    texteCorr += lstNombresAnimaux[0]
    for (let i = 1; i < nbQuadri; i++) {
      texteCorr += ' + ' + lstNombresAnimaux[i]
      NTotalQuadri += lstNombresAnimaux[i]
    }
    texteCorr += '. <br>'
    texteCorr += texteGras('L\'effectif des quadrupèdes est donc : ' + NTotalQuadri + '.<br>')
    setReponse(this, 3, NTotalQuadri)
    // question 4
    let NTotalOiseaux = lstNombresAnimaux[3]
    texteCorr += numAlpha(3) + ' L\'effectif total des oiseaux est : ' + lstNombresAnimaux[3]
    for (let i = 4; i < nbAnimaux; i++) {
      texteCorr += ' + ' + lstNombresAnimaux[i]
      NTotalOiseaux += lstNombresAnimaux[i]
    }
    texteCorr += ' = ' + NTotalOiseaux + '. '
    texteCorr += ' L\'effectif total des animaux est : ' + Ntotal + '. <br>'
    texteCorr += ' La fréquence (ou la proportion) d\'oiseaux est : $ ' + texFractionSigne(NTotalOiseaux, Ntotal) + '$ '
    // test de l'arrondi
    if (calcul(NTotalOiseaux / Ntotal, 4) === arrondi(NTotalOiseaux / Ntotal, 3)) {
      texteCorr += '= '
    } else {
      texteCorr += '$\\approx $ '
    }
    texteCorr += stringNombre(NTotalOiseaux / Ntotal, 3) + '. <br>'
    texteCorr += texteGras('La fréquence des oiseaux est donc : ' + stringNombre(100 * NTotalOiseaux / Ntotal, 1) + '%. <br>')
    setReponse(this, 4, [calcul(100 * NTotalOiseaux / Ntotal, 1), calcul(100 * NTotalOiseaux / Ntotal, 1) + '\\%'])
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Nombre d\'espèces différentes', 3, ' choix 1 : 5 espèces\n choix 2 : 6 espèces\n choix 3 : 7 espèces']
} // Fin de l'exercice.
