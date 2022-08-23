import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { texcolors, combinaisonListes, choice, randint, listeQuestionsToContenu, numAlpha, calcul } from '../../modules/outils.js'
import { traceGraphiqueCartesien, segment, arc, point, rotation, motifs, tracePoint, vecteur, translation, carre, texteParPosition, repere, traceBarre, cercleCentrePoint } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { context } from '../../modules/context.js'

export const titre = 'Représenter des données par un diagramme'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Lecture de diagrammes
 * @author Jean-Claude Lhote
 * Référence 6S10-1
 */
export default function LireUnDiagramme () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup = 3
  this.sup2 = 5

  //  this.sup2 = false;
  this.nouvelleVersion = function () {
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    if (this.sup2 < 5) {
      typesDeQuestionsDisponibles = [this.sup2]
    } else {
      typesDeQuestionsDisponibles = [1, 2, 3, 4]
    }
    const listeHachuresDisponibles = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10]
    const listeMotifs = combinaisonListes(listeHachuresDisponibles, 4)
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let N = 0
    let nom
    let nbAnimaux = 4 // nombre d'animaux différents dans l'énoncé
    let lstAnimauxExo // liste des animaux uniquement cités dans l'exercice
    let lstNombresAnimaux // liste des effectifs de chaque animal
    let lstVal = [] // liste des valeurs à éviter pour les effectifs

    let paramsEnonce, coef, r, lstElementGraph, g
    let reponse1, reponse2, nbMin, nbMax, monQcm1, monQcm2, monQcm3
    let objets
    const lstAnimaux = ['Girafes', 'Zèbres', 'Gnous', 'Buffles', 'Gazelles', 'Crocodiles', 'Rhinocéros', 'Léopards', 'Guépards', 'Hyènes', 'Lycaons', 'Servals', 'Phacochères']
    const lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan',
      'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane']
    let A, B, T, angle, a, legende, textelegende, hachures, a0, t, alpha
    for (let q = 0, texte, texteCorr; q < this.nbQuestions;) {
      objets = []
      lstVal = []
      lstAnimauxExo = []
      lstNombresAnimaux = []
      if (!context.isAmc) {
        this.autoCorrection[q * 3] = {}
        this.autoCorrection[q * 3 + 1] = {}
        this.autoCorrection[q * 3 + 2] = {}
      } else {
        this.autoCorrection[q] = {}
      }

      texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d\'animaux.<br> Voici un diagramme qui représente les effectifs de quelques espèces.<br><br>'
      texteCorr = ''
      switch (parseInt(this.sup)) {
        case 1: nbAnimaux = 2; break
        case 2: nbAnimaux = 3; break
        case 3: nbAnimaux = 4; break
        default: nbAnimaux = 4
      }
      for (let i = 0; i < nbAnimaux; i++) {
        N = randint(5, 40, lstVal) // choisit un nombre entre 5 et 40 sauf dans les valeurs à éviter
        lstNombresAnimaux.push(N)
        lstVal = lstVal.concat([N - 2, N - 1, N, N + 1, N + 2]) // valeurs à supprimer pour éviter des valeurs proches
      }
      let effectiftotal = 0
      for (let i = 0; i < nbAnimaux; i++) {
        effectiftotal += lstNombresAnimaux[i]
      }
      for (let i = 0; i < nbAnimaux; i++) {
        nom = choice(lstAnimaux, lstAnimauxExo) // choisit un animal au hasard sauf parmi ceux déjà utilisés
        lstAnimauxExo.push(nom)
      }
      switch (listeTypeDeQuestions[q]) {
        case 1:
          A = point(0, 0)
          B = point(6, 0)
          T = point(7, 0)
          a0 = cercleCentrePoint(A, B, 'black')
          objets.push(a0)
          alpha = 90

          t = tracePoint(A)
          t.style = '+'
          objets.push(t)

          for (let i = 0; i < nbAnimaux; i++) {
            angle = 360 * lstNombresAnimaux[i] / effectiftotal
            a = arc(rotation(B, A, alpha), A, angle, true, texcolors(i + 1), 'black', 0.7)
            hachures = motifs(listeMotifs[i])
            a.hachures = hachures
            a.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i + 1))
            a.couleurDesHachures = a.couleurDeRemplissage
            objets.push(a)
            alpha += angle
            legende = carre(translation(T, vecteur(0, 1.5 * i)), translation(T, vecteur(1, 1.5 * i)), 'black')
            legende.couleurDeRemplissage = a.couleurDeRemplissage
            legende.couleurDesHachures = a.couleurDesHachures
            legende.hachures = hachures
            legende.opaciteDeRemplissage = 0.7
            textelegende = texteParPosition(lstAnimauxExo[i], 8.5, i * 1.5 + 0.5, 0, 'black', 1.5, 'gauche', false)
            objets.push(legende, textelegende)
            paramsEnonce = { xmin: -6.5, ymin: -6.5, xmax: 20, ymax: 6.5, pixelsParCm: 20, scale: 0.5, mainlevee: false }
          }
          break
        case 2:
          A = point(0, 0)
          B = point(6, 0)
          T = point(7, 0)
          a0 = arc(B, A, 180, true, 'white', 'black')
          objets.push(a0)
          alpha = 0
          t = tracePoint(A)
          t.style = '+'
          objets.push(t)

          for (let i = 0; i < nbAnimaux; i++) {
            angle = 180 * lstNombresAnimaux[i] / effectiftotal
            a = arc(rotation(B, A, alpha), A, angle, true, texcolors(i + 1), 'black', 0.7)
            hachures = motifs(listeMotifs[i])
            a.hachures = hachures
            a.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i + 1))
            a.couleurDesHachures = a.couleurDeRemplissage
            objets.push(a)
            alpha += angle
            legende = carre(translation(T, vecteur(0, 1.5 * i)), translation(T, vecteur(1, 1.5 * i)), 'black')
            legende.couleurDeRemplissage = a.couleurDeRemplissage
            legende.couleurDesHachures = a.couleurDesHachures
            legende.hachures = hachures
            legende.opaciteDeRemplissage = 0.7
            textelegende = texteParPosition(lstAnimauxExo[i], 8.5, i * 1.5 + 0.5, 0, 'black', 1.5, 'gauche', false)
            objets.push(legende, textelegende)
            paramsEnonce = { xmin: -6.5, ymin: -0.2, xmax: 20, ymax: 6.5, pixelsParCm: 20, scale: 0.5, mainlevee: false }
          }
          break
        case 3:
          coef = 1
          switch (parseInt(this.sup2)) {
            case 1:
              coef = 1
              break
            case 2:
              coef = 10
              break
          }
          r = repere({
            grilleX: false,
            grilleY: 'pointilles',
            xThickListe: [],
            xLabelListe: [],
            yUnite: 0.1 / coef,
            yThickDistance: 10 * coef,
            yMax: 60 * coef,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: "Nombre d'individus"
          })

          lstElementGraph = []
          for (let i = 0; i < nbAnimaux; i++) {
            objets.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], lstAnimauxExo[i], { unite: 0.1 / coef, couleurDeRemplissage: texcolors(i + 1), hachures: 'north east lines' }))
          }
          objets.push(r)
          paramsEnonce = { xmin: -6.5, ymin: -3, xmax: 20, ymax: 7, pixelsParCm: 20, scale: 0.5, mainlevee: false }

          break

        case 4:
          coef = 1
          switch (parseInt(this.sup2)) {
            case 1:
              coef = 1
              break
            case 2:
              coef = 10
              break
          }
          r = repere({
            grilleX: false,
            grilleY: 'pointilles',
            xThickListe: [],
            xLabelListe: [],
            yUnite: 0.1 / coef,
            yThickDistance: 10 * coef,
            yMax: 60 * coef,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: "Nombre d'individus"
          })

          lstElementGraph = []
          for (let i = 0; i < nbAnimaux; i++) {
            lstElementGraph.push([(i + 1) * 2, lstNombresAnimaux[i]])
            objets.push(texteParPosition(lstAnimauxExo[i], (i + 1) * 2, -0.2, 66, 'black', 1, 'gauche'))
            objets.push(segment((i + 1) * 2, -0.1, (i + 1) * 2, 0.1))
          }
          g = traceGraphiqueCartesien(lstElementGraph, r, {
            couleurDesPoints: 'red',
            couleurDuTrait: 'lightgray',
            styleDuTrait: '', // plein par défaut
            epaisseurDuTrait: 1,
            styleDesPoints: 'o', // croix par défaut
            tailleDesPoints: 3
          })

          objets.push(r, g)

          paramsEnonce = { xmin: -6.5, ymin: -3, xmax: 20, ymax: 7, pixelsParCm: 20, scale: 0.5, mainlevee: false }

          break
      }
      nbMin = Math.min(...lstNombresAnimaux)
      nbMax = Math.max(...lstNombresAnimaux)
      reponse1 = lstAnimauxExo[lstNombresAnimaux.indexOf(nbMin)]
      reponse2 = lstAnimauxExo[lstNombresAnimaux.indexOf(nbMax)]
      texte += mathalea2d(paramsEnonce, objets)
      if (context.isAmc) {
        texte += `<br>${numAlpha(0)} Quelle est l'espèce la moins nombreuse ?`
        texte += `<br>${numAlpha(1)} Quelle est l'espèce la plus nombreuse ?`
        texte += `<br>${numAlpha(2)} L'espèce la plus nombreuse représente ?`
      }
      if (!context.isAmc) {
        this.autoCorrection[q * 3].propositions = []
        for (let i = 0; i < nbAnimaux; i++) {
          this.autoCorrection[q * 3].propositions.push({
            texte: `${lstAnimauxExo[i]}`,
            statut: reponse1 === lstAnimauxExo[i]
          })
        }
        this.autoCorrection[q * 3 + 1].propositions = []
        for (let i = 0; i < nbAnimaux; i++) {
          this.autoCorrection[q * 3 + 1].propositions.push({
            texte: `${lstAnimauxExo[i]}`,
            statut: reponse2 === lstAnimauxExo[i]
          })
        }
        this.autoCorrection[q * 3 + 2].propositions = []
        this.autoCorrection[q * 3 + 2].propositions.push({
          texte: 'Plus de la moitié des animaux',
          statut: nbMax > effectiftotal / 2
        },
        {
          texte: 'Moins de la moitié des animaux',
          statut: nbMax < effectiftotal / 2
        },
        {
          texte: 'La moitié des animaux',
          statut: nbMax === calcul(effectiftotal / 2)
        }
        )
        this.autoCorrection[q * 3].options = {}
        this.autoCorrection[q * 3 + 1].options = {}
        this.autoCorrection[q * 3 + 2].options = {}
      } else {
        this.autoCorrection[q].enonce = `${texte}\n`
        this.autoCorrection[q].propositions = [
          {
            type: 'qcmMono',
            propositions: [],
            options: {}
          },
          {
            type: 'qcmMono',
            propositions: [],
            options: {}
          },
          {
            type: 'qcmMono',
            propositions: [],
            options: {}
          }]
        for (let i = 0; i < nbAnimaux; i++) {
          this.autoCorrection[q].propositions[0].propositions.push({
            texte: `${lstAnimauxExo[i]}`,
            statut: reponse1 === lstAnimauxExo[i],
            reponse: i === 0 ? { texte: 'a) Les moins nombreux :' } : {}
          })
          this.autoCorrection[q].propositions[1].propositions.push({
            texte: `${lstAnimauxExo[i]}`,
            statut: reponse2 === lstAnimauxExo[i],
            reponse: i === 0 ? { texte: 'b) Les plus nombreux :' } : {}
          })
        }
        this.autoCorrection[q].propositions[2].propositions = [{
          texte: 'Plus de la moitié des animaux',
          statut: nbMax > effectiftotal / 2,
          reponse: { texte: 'c) Part de l\'espèce la plus nombreuse :' }
        },
        {
          texte: 'Moins de la moitié des animaux',
          statut: nbMax < effectiftotal / 2
        },
        {
          texte: 'La moitié des animaux',
          statut: nbMax === calcul(effectiftotal / 2)
        }
        ]
        this.autoCorrection[q].propositions[0].options = { ordered: true }
        this.autoCorrection[q].propositions[1].options = { ordered: false }
      }
      monQcm1 = propositionsQcm(this, q * 3)
      monQcm2 = propositionsQcm(this, q * 3 + 1)
      monQcm3 = propositionsQcm(this, q * 3 + 2)
      if (!context.isAmc) {
        texte += `<br>${numAlpha(0)} Quelle est l'espèce la moins nombreuse ?` + monQcm1.texte
        texte += `<br>${numAlpha(1)} Quelle est l'espèce la plus nombreuse ?` + monQcm2.texte
        texte += `<br>${numAlpha(2)} L'espèce la plus nombreuse représente ...` + monQcm3.texte
        texteCorr = `<br>${numAlpha(0)} L'animal le moins nombreux parmi ces espèces est : ` + monQcm1.texteCorr
        texteCorr += `<br>${numAlpha(1)} L'animal le plus nombreux parmi ces espèces est : ` + monQcm2.texteCorr
        texteCorr += `<br>${numAlpha(2)} L'animal le plus nombreux parmi ces espèces représente : ` + monQcm3.texteCorr
      }

      if (this.questionJamaisPosee(q, effectiftotal)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Nombre d\'espèces différentes', 3, '1 : Deux espèces\n2 : Trois espèces\n3 : Quatre espèces']
  this.besoinFormulaire2Numerique = ['Type de diagramme', 5, '1 : Diagramme circulaire\n2 : Diagramme semi-circulaire\n3 : Diagramme en barres\n4 : Diagramme cartésien\n5 : Au hasard']
}
