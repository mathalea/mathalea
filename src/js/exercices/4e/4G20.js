import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, creerNomDePolygone, arrondi, sp } from '../../modules/outils.js'
import { point, polygone, nommePolygone, rotation, similitude, codageAngleDroit, afficheLongueurSegment, longueur } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
import { RedactionPythagore } from './_pythagore.js'
export const titre = 'Calculer une longueur avec le théorème de Pythagore'
export const amcType = 'AMCOpenNum' // Question numérique
export const amcReady = true // Il reste à gérer les options numériques
export const interactifReady = true
export const interactifType = 'mathLive'

// Il existait une version MG32 cf le commit aba9446 https://github.com/mathalea/mathalea/commit/aba9446cb809c140f599c9a6ebd83dea0176da0f

/**
 * Exercices sur le théorème de Pythagore avec MathALEA2D
 * @author Rémi Angot (Factorisation de la rédaction de Pythagore par Eric Elter )
 * 4G20
 */
export const uuid = 'bd660'
export const ref = '4G20'
export default function Pythagore2D () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 3
  this.nbCols = 3
  this.nbColsCorr = 1
  this.sup = 3
  this.sup2 = 3
  this.typeDeQuestion = 'Calculer :'
  this.video = 'M9sceJ8gzNc'

  this.nouvelleVersion = function () {
    if (this.sup) {
      this.sup = parseInt(this.sup)
    }
    if (this.sup2) {
      this.sup2 = parseInt(this.sup2)
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeTypeDeQuestions = []
    if (this.sup2 === 1) {
      listeTypeDeQuestions = ['BC']
    } else if (this.sup2 === 2) {
      listeTypeDeQuestions = ['AB', 'AC']
    } else {
      listeTypeDeQuestions = ['AB', 'BC', 'AC']
    }
    let listeDeNomsDePolygones = []
    let reponse
    if (this.sup === 1) {
      this.consigne = ((context.vue !== 'diap' && this.nbQuestions > 1) ? 'Dans chaque cas, donner' : 'Donner') + " l'égalité de Pythagore."
    } else if (this.sup === 2) {
      this.consigne = ((context.vue !== 'diap' && this.nbQuestions > 1) ? 'Dans chaque cas, compléter' : 'Compléter') + " l'égalité en utilisant le théorème de Pythagore."
    } else {
      this.consigne = ((context.vue !== 'diap' && this.nbQuestions > 1) ? 'Dans chaque cas, calculer' : 'Calculer') + ' la longueur manquante (si nécessaire, l\'arrondir au millimètre près).'
    }
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (i % 5 === 0) listeDeNomsDePolygones = ['QD']
      texte = ''
      texteCorr = ''
      const A1 = point(0, 0)
      const B1 = point(calcul(randint(22, 50) / 10), 0)
      const C1 = similitude(B1, A1, 90, calcul(randint(22, 50) / 10) / longueur(A1, B1))
      const p1 = polygone(A1, B1, C1)
      p1.isVisible = false
      const p2 = rotation(p1, A1, randint(0, 360))
      const A = p2.listePoints[0]
      const B = p2.listePoints[1]
      const C = p2.listePoints[2]
      const codage = codageAngleDroit(B, A, C)
      const xmin = Math.min(A.x, B.x, C.x) - 1
      const ymin = Math.min(A.y, B.y, C.y) - 1
      const xmax = Math.max(A.x, B.x, C.x) + 1
      const ymax = Math.max(A.y, B.y, C.y) + 1
      const nomDuPolygone = creerNomDePolygone(3, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nomDuPolygone)
      const nomme = nommePolygone(p2, nomDuPolygone)
      const affAB = afficheLongueurSegment(B, A)
      const affAC = afficheLongueurSegment(A, C)
      const affBC = afficheLongueurSegment(C, B)
      const longueurAB = longueur(A, B, 1)
      const longueurAC = longueur(A, C, 1)
      const longueurBC = longueur(B, C, 1)
      const mesObjetsATracer = [codage, p2, nomme]

      if (this.typeDeQuestion === 'Calculer :' && listeTypeDeQuestions[i] === 'AB') {
        mesObjetsATracer.push(affAC, affBC)
      }
      if (this.typeDeQuestion === 'Calculer :' && listeTypeDeQuestions[i] === 'BC') {
        mesObjetsATracer.push(affAC, affAB)
      }
      if (this.typeDeQuestion === 'Calculer :' && listeTypeDeQuestions[i] === 'AC') {
        mesObjetsATracer.push(affAB, affBC)
      }

      if (!context.isHtml) { texte = '~\\\\' }
      texte += mathalea2d({ xmin, xmax, ymin, ymax, scale: 0.6, style: 'display: block' }, mesObjetsATracer)
      if (!context.isHtml && !context.isAmc && i !== this.nbQuestions - 1) { texte += '\\columnbreak' } // pour la sortie LaTeX sauf la dernière question

      let redaction
      if (this.typeDeQuestion === 'Calculer :') {
        if (listeTypeDeQuestions[i] === 'AB') {
          reponse = arrondi(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1)
          redaction = RedactionPythagore(A.nom, B.nom, C.nom, 2, reponse, longueurAC, longueurBC)
        } else if (listeTypeDeQuestions[i] === 'BC') {
          reponse = arrondi(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1)
          redaction = RedactionPythagore(A.nom, B.nom, C.nom, 1, longueurAB, longueurAC, reponse)
        } else { // listeTypeDeQuestions[i] === 'AC'
          reponse = arrondi(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1)
          redaction = RedactionPythagore(A.nom, C.nom, B.nom, 2, reponse, longueurAB, longueurBC)
        }
        texteCorr = redaction[0]
        texte += this.interactif ? (`$${A.nom + C.nom} ${redaction[1]}$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline nospacebefore unites[longueurs]')) : ''
        context.isAmc ? setReponse(this, i, reponse) : setReponse(this, i, new Grandeur(reponse, 'cm'), { formatInteractif: 'unites', precision: 0.001 })

        if (context.isAmc) {
          this.autoCorrection[i].propositions = [{ statut: 3, texte: texteCorr }]
          this.autoCorrection[i].enonce = 'Calculer la longueur manquante.\\\\' + texte
        }
      } else {
        const hypotenuse = [`${B.nom + C.nom}^2`, `${C.nom + B.nom}^2`]
        const cote1 = [`${B.nom + A.nom}^2`, `${A.nom + B.nom}^2`]
        const cote2 = [`${C.nom + A.nom}^2`, `${A.nom + C.nom}^2`]
        redaction = RedactionPythagore(A.nom, B.nom, C.nom, 0, longueurAB, longueurAC, reponse)
        texteCorr = redaction[0]
        if (this.sup === 1) {
          reponse = []
          for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
              for (let m = 0; m < 2; m++) {
                reponse.push(hypotenuse[j] + '=' + cote1[k] + '+' + cote2[m])
                reponse.push(hypotenuse[j] + '=' + cote2[m] + '+' + cote1[k])
                reponse.push(cote1[k] + '+' + cote2[m] + '=' + hypotenuse[j])
                reponse.push(cote2[m] + '+' + cote1[k] + '=' + hypotenuse[j])
              }
            }
          }
        } else {
          texteCorr += '<br>'
          reponse = []
          if (listeTypeDeQuestions[i] === 'AB') {
            texte += `<br>$${A.nom + B.nom}^2=$`
            texteCorr += ` d'où $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$.`
            for (let j = 0; j < 2; j++) {
              for (let k = 0; k < 2; k++) {
                reponse.push(hypotenuse[j] + '-' + cote2[k])
              }
            }
          } else if (listeTypeDeQuestions[i] === 'AC') {
            texte += `<br>$${A.nom + C.nom}^2=$`
            texteCorr += ` d'où $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$.`
            for (let j = 0; j < 2; j++) {
              for (let k = 0; k < 2; k++) {
                reponse.push(hypotenuse[j] + '-' + cote1[k])
              }
            }
          } else {
            texte += `<br>$${B.nom + C.nom}^2=$`
            for (let j = 0; j < 2; j++) {
              for (let k = 0; k < 2; k++) {
                reponse.push(cote2[j] + '+' + cote1[k])
                reponse.push(cote1[j] + '+' + cote2[k])
              }
            }
          }
          texte += this.interactif ? '' : `$${sp(2)}\\ldots$`
        }
        setReponse(this, i, reponse)
        texte += ajouteChampTexteMathLive(this, i, 'inline')
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaire2Numerique = ['Recherche de côtés ', 3, '1 : Hypoténuse\n2 : Côtés de l\'angle droit\n3: Peu importe']
}
