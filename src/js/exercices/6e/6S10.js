import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, premiereLettreEnMajuscule, numAlpha } from '../../modules/outils.js'
import { repere2, traceBarre, mathalea2d } from '../../modules/2d.js'
export const titre = 'Lire un diagramme en barre'

/**
 * Lire un diagramme en barre
 * @author Erwan Duplessy
 * Référence 6S10
 */

export default function LectureDiagrammeBarre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Répondre aux questions à l'aide du graphique."
  this.nbQuestions = 3
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // vide la liste de questions
    this.listeCorrections = [] // vide la liste de questions corrigées

    const lstAnimaux = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères']
    let nbAnimaux = 4 // nombre d'animaux différents dans l'énoncé
    switch (parseInt(this.sup)) {
      case 1: nbAnimaux = 4; break
      case 2: nbAnimaux = 5; break
      case 3: nbAnimaux = 6; break
      default: nbAnimaux = 4
    }
    const lstAnimauxExo = [] // liste des animaux uniquement cités dans l'exercice
    const lstNombresAnimaux = [] // liste des effectifs de chaque animal
    let lstVal = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] // liste des valeurs à éviter pour les effectifs
    let N = 0; let nom; let texte; let texteCorr

    switch (parseInt(this.sup2)) {
      case 1:
        for (let i = 0; i < nbAnimaux; i++) {
          N = randint(2, 100, lstVal) // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
          lstNombresAnimaux.push(N)
          lstVal = lstVal.concat([N - 1, N, N + 1]) // valeurs à supprimer pour éviter des valeurs proches
        }
        break
      case 2:
        for (let i = 0; i < nbAnimaux; i++) {
          N = randint(2, 100, lstVal) // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
          lstNombresAnimaux.push(10 * N)
          lstVal = lstVal.concat([N - 1, N, N + 1]) // valeurs à supprimer pour éviter des valeurs proches
        }
        break
    }

    for (let i = 0; i < nbAnimaux; i++) {
      nom = choice(lstAnimaux, lstAnimauxExo) // choisit un animal au hasard sauf parmi ceux déjà utilisés
      lstAnimauxExo.push(nom)
    }

    const nMin = Math.min(...lstNombresAnimaux)
    const nMax = Math.max(...lstNombresAnimaux)

    const lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan',
      'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane']

    texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d’animaux. Voici un diagramme en bâtons qui donne le nombre d’individus pour chaque espèce.<br>'
    texte += numAlpha(0) + ' Quels sont les animaux les plus nombreux ?<br>'
    texte += numAlpha(1) + ' Quels sont les animaux les moins nombreux ?<br>'

    const numAnimal = randint(0, nbAnimaux - 1)
    switch (parseInt(this.sup2)) {
      case 1: texte += numAlpha(2) + ' Donner un encadrement à la dizaine du nombre de ' + lstAnimauxExo[numAnimal] + ' ?<br>'
        break
      case 2: texte += numAlpha(2) + ' Donner un encadrement à la centaine du nombre de ' + lstAnimauxExo[numAnimal] + ' ?<br>'
        break
    }
    texte += '<br>'

    // coefficient pour gérer les deux types d'exercices (entre 1 et 100) ou (entre 10 et 1000)
    let coef = 1
    switch (parseInt(this.sup2)) {
      case 1:
        coef = 1
        break
      case 2:
        coef = 10
        break
    }

    const r = repere2({
      grilleX: false,
      grilleY: 'pointilles',
      xThickListe: [],
      xLabelListe: [],
      yUnite: 0.1 / coef,
      yThickDistance: 10 * coef,
      yMax: 110 * coef,
      xMin: 0,
      xMax: 10,
      yMin: 0,
      axeXStyle: '',
      yLegende: "Nombre d'individus"
    })

    const lstElementGraph = []
    for (let i = 0; i < nbAnimaux; i++) {
      lstElementGraph.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiereLettreEnMajuscule(lstAnimauxExo[i]), { unite: 0.1 / coef }))
    }

    texte += mathalea2d({ xmin: -5, xmax: 11, ymin: -4, ymax: 11, pixelsParCm: 30, scale: 0.5 }, r, lstElementGraph)
    // debut de la correction
    // question 1
    texteCorr = numAlpha(0) + ' Les animaux les plus nombreux sont les ' + lstAnimauxExo[lstNombresAnimaux.indexOf(nMax)] + '.<br>'
    // question 2
    texteCorr += numAlpha(1) + ' Les animaux les moins nombreux sont les ' + lstAnimauxExo[lstNombresAnimaux.indexOf(nMin)] + '.<br>'
    // question 3
    const reponse = lstNombresAnimaux[lstAnimauxExo.indexOf(lstAnimauxExo[numAnimal])]
    const reponseinf = 10 * coef * Math.floor(reponse / (10 * coef))
    const reponsesup = reponseinf + 10 * coef
    texteCorr += numAlpha(2) + ' Il y a entre ' + reponseinf + ' et ' + reponsesup + ' ' + lstAnimauxExo[numAnimal] + '.<br>'

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre d\'espèces différentes', 3, ' choix 1 : 4 espèces\n choix 2 : 5 espèces\n choix 3 : 6 espèces']
  this.besoinFormulaire2Numerique = ['Valeurs numériques', 2, ' choix 1 : entre 1 et 100\n choix 2 : entre 100 et 1 000']
}
