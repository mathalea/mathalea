import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, premiereLettreEnMajuscule, numAlpha, calcul, sp } from '../../modules/outils.js'
import { repere, traceBarre } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Lire un diagramme en barres'
export const amcReady = true
export const amcType = 'AMCHybride'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Lire un diagramme en barres
 * @author Erwan Duplessy
 * Conversion Amc et interactif par Jean-Claude Lhote
 * Référence 6S10
 */

export const uuid = '17bce'
export const ref = '6S10'
export default function LectureDiagrammeBarre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Répondre aux questions à l'aide du graphique."
  this.nbQuestions = 3
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.spacing = 2
  this.spacingCorr = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // vide la liste de questions
    this.listeCorrections = [] // vide la liste de questions corrigées
    this.autoCorrection = []
    const bornesinf = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
    const lstAnimaux = ['Girafes', 'Zèbres', 'Gnous', 'Buffles', 'Gazelles', 'Crocodiles', 'Rhinocéros', 'Léopards', 'Guépards', 'Hyènes', 'Lycaons', 'Servals', 'Phacochères']
    let nbAnimaux = 4 // nombre d'animaux différents dans l'énoncé
    switch (parseInt(this.sup)) {
      case 1: nbAnimaux = 4; break
      case 2: nbAnimaux = 5; break
      case 3: nbAnimaux = 6; break
      default: nbAnimaux = 4
    }
    const propa = []
    const propb = []
    const propc = []
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

    texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d\'animaux.<br>Voici un diagramme en bâtons qui donne le nombre d\'individus pour chaque espèce.<br>'
    if (!context.isAmc) {
      texte += numAlpha(0) + ' Quels sont les animaux les plus nombreux ?' + ajouteChampTexte(this, 0, { texte: sp(5) + 'les' })
      texte += '<br>' + numAlpha(1) + ' Quels sont les animaux les moins nombreux ?' + ajouteChampTexte(this, 1, { texte: sp(5) + 'les' }) + '<br>'
      setReponse(this, 0, lstAnimauxExo[lstNombresAnimaux.indexOf(nMax)])
      setReponse(this, 1, lstAnimauxExo[lstNombresAnimaux.indexOf(nMin)])
    } else {
      texte += '1) Quels sont les animaux les plus nombreux ?<br>'
      texte += '2) Quels sont les animaux les moins nombreux ?<br>'
    }
    const numAnimal = randint(0, nbAnimaux - 1)
    switch (parseInt(this.sup2)) {
      case 1:
        if (!context.isAmc) {
          texte += numAlpha(2) + ' Donner un encadrement, à la dizaine, du nombre de ' + lstAnimauxExo[numAnimal] + ' ?<br>'
          if (this.interactif) texte += ajouteChampTexteMathLive(this, 2, 'largeur10 inline', { texte: sp(5) }) + sp(10) + `< nombre de ${lstAnimauxExo[numAnimal]} < `
          texte += ajouteChampTexteMathLive(this, 3, 'largeur10 inline', { texte: sp(5) })
        } else {
          texte += '3) Donner un encadrement, à la dizaine, du nombre de ' + lstAnimauxExo[numAnimal] + ' ?<br>'
        }
        break
      case 2:
        if (!context.isAmc) {
          texte += numAlpha(2) + ' Donner un encadrement, à la centaine, du nombre de ' + lstAnimauxExo[numAnimal] + ' ?<br>'
          if (this.interactif) texte += ajouteChampTexteMathLive(this, 2, 'largeur10 inline', { texte: sp(5) }) + sp(10) + `< nombre de ${lstAnimauxExo[numAnimal]} < `
          texte += ajouteChampTexteMathLive(this, 3, 'largeur10 inline', { texte: sp(5) })
        } else {
          texte += '3)  Donner un encadrement, à la centaine, du nombre de ' + lstAnimauxExo[numAnimal] + ' ?<br>'
        }
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

    const r = repere({
      grilleX: false,
      grilleY: 'pointilles',
      xThickListe: [],
      xLabelListe: [],
      yUnite: 0.1 / coef,
      yThickDistance: 10 * coef,
      yMax: 100 * coef,
      xMin: 0,
      xMax: 10,
      yMin: 0,
      axeXStyle: '',
      yLegende: "Nombre d'individus"
    })

    const lstElementGraph = []
    const bornesAEviter = [calcul(10 * coef * Math.floor(lstNombresAnimaux[lstAnimauxExo.indexOf(lstAnimauxExo[numAnimal])] / (10 * coef)))]
    for (let i = 0, borne, reponsea, reponseb, reponsec; i < nbAnimaux; i++) {
      lstElementGraph.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiereLettreEnMajuscule(lstAnimauxExo[i]), { unite: 0.1 / coef }))
      if (context.isAmc) {
        reponsea = i === 0 ? { texte: '1) Animaux les plus nombreux :' } : {}
        if (i === lstNombresAnimaux.indexOf(nMax)) {
          propa.push({ texte: premiereLettreEnMajuscule(lstAnimauxExo[i]), statut: true, reponse: reponsea })
        } else {
          propa.push({ texte: premiereLettreEnMajuscule(lstAnimauxExo[i]), statut: false, reponse: reponsea })
        }
        reponseb = i === 0 ? { texte: '2) Animaux les moins nombreux :' } : {}
        if (i === lstNombresAnimaux.indexOf(nMin)) {
          propb.push({ texte: premiereLettreEnMajuscule(lstAnimauxExo[i]), statut: true, reponse: reponseb })
        } else {
          propb.push({ texte: premiereLettreEnMajuscule(lstAnimauxExo[i]), statut: false, reponse: reponseb })
        }
        reponsec = i === 0 ? { texte: `3) encadrement du nombre de ${lstAnimauxExo[numAnimal]} :` } : {}
        if (i === numAnimal) {
          propc.push({ texte: `entre ${bornesAEviter[0]} et ${bornesAEviter[0] + 10 * coef}`, statut: true, reponse: reponsec })
        } else {
          borne = choice(bornesinf, bornesAEviter)
          bornesAEviter.push(borne)
          propc.push({ texte: `entre ${borne} et ${borne + 10 * coef}`, statut: false, reponse: reponsec })
        }
      }
    }
    texte += mathalea2d({ xmin: -5, xmax: 11, ymin: -4, ymax: 11, pixelsParCm: 30, scale: 0.5 }, r, lstElementGraph)
    // debut de la correction
    // question 1
    if (!context.isAmc) {
      texteCorr = numAlpha(0) + ' Les animaux les plus nombreux sont les ' + lstAnimauxExo[lstNombresAnimaux.indexOf(nMax)] + '.<br>'
    } else {
      texte += '<br>'
      texteCorr = '1) Les animaux les plus nombreux sont les ' + lstAnimauxExo[lstNombresAnimaux.indexOf(nMax)] + '.<br>'
    }
    // question 2
    if (!context.isAmc) {
      texteCorr += numAlpha(1) + ' Les animaux les moins nombreux sont les ' + lstAnimauxExo[lstNombresAnimaux.indexOf(nMin)] + '.<br>'
    } else {
      texteCorr += '2) Les animaux les moins nombreux sont les ' + lstAnimauxExo[lstNombresAnimaux.indexOf(nMin)] + '.<br>'
    }

    // question 3
    const reponse = lstNombresAnimaux[lstAnimauxExo.indexOf(lstAnimauxExo[numAnimal])]
    const reponseinf = 10 * coef * Math.floor(reponse / (10 * coef))
    const reponsesup = reponseinf + 10 * coef
    if (!context.isAmc) {
      setReponse(this, 2, reponseinf)
      setReponse(this, 3, reponsesup)
      texteCorr += numAlpha(2) + ' Il y a entre ' + reponseinf + ' et ' + reponsesup + ' ' + lstAnimauxExo[numAnimal] + '.<br>'
    } else {
      texteCorr += '3) Il y a entre ' + reponseinf + ' et ' + reponsesup + ' ' + lstAnimauxExo[numAnimal] + '.<br>'
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: texte,
        propositions: [
          {
            type: 'qcmMono',
            propositions: propa,
            options: { ordered: false }
          },
          {
            type: 'qcmMono',
            options: { ordered: false },
            propositions: propb
          },
          {
            type: 'qcmMono',
            options: { ordered: false },
            propositions: propc
          }
        ]
      }
    }
  }
  this.besoinFormulaireNumerique = ['Nombre d\'espèces différentes', 3, '1 : 4 espèces\n2 : 5 espèces\n3 : 6 espèces']
  this.besoinFormulaire2Numerique = ['Valeurs numériques', 2, '1 : Entre 1 et 100\n2 : Entre 100 et 1 000']
}
