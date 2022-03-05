import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombrec, creerNomDePolygone, texNombre, arrondi } from '../../modules/outils.js'
import { point, polygone, nommePolygone, rotation, similitude, codageAngleDroit, afficheLongueurSegment, longueur, mathalea2d } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
export const titre = 'Calculer une longueur avec le théorème de Pythagore'
export const amcType = 'AMCOpenNum' // Question numérique
export const amcReady = true // Il reste à gérer les options numériques
export const interactifReady = true
export const interactifType = 'mathLive'

// Il existait une version MG32 cf le commit aba9446 https://github.com/mathalea/mathalea/commit/aba9446cb809c140f599c9a6ebd83dea0176da0f

/**
 * Exercices sur le théorème de Pythagore avec MathALEA2D
 * @author Rémi Angot
 * 4G20
 */
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
  this.sup2 = 3
  this.typeDeQuestion = 'Calculer :'
  this.video = 'M9sceJ8gzNc'
  this.besoinFormulaire2Numerique = ['Côté', 3, '1 : Hypoténuse\n2 : Côté de l\'angle droit\n3 : Mélange']

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
    const listeDeNomsDePolygones = []
    let reponse
    if (this.sup === 1) {
      this.consigne = "Dans chaque cas, donner l'égalité de Pythagore."
    } else if (this.sup === 2) {
      this.consigne = "Dans chaque cas, compléter l'égalité en utilisant le théorème de Pythagore."
    } else {
      this.consigne = 'Dans chaque cas, calculer la longueur manquante (si nécessaire, l\'arrondir au millimètre près).'
    }
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
      texte += mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, scale: 0.6, style: 'display: block' }, mesObjetsATracer)
      if (this.sup === 2) {
        if (listeTypeDeQuestions[i] === 'AB') {
          texte += `<br>$${A.nom + B.nom}^2=\\ldots$`
          setReponse(this, i, [
            `${B.nom + C.nom}^2-${A.nom + C.nom}^2`,
            `${C.nom + B.nom}^2-${A.nom + C.nom}^2`,
            `${B.nom + C.nom}^2-${C.nom + A.nom}^2`,
            `${C.nom + B.nom}^2-${C.nom + A.nom}^2`
          ], { formatInteractif: 'texte' })
        }
        if (listeTypeDeQuestions[i] === 'BC') {
          texte += `<br>$${B.nom + C.nom}^2=\\ldots$`
          setReponse(this, i, [
            `${A.nom + B.nom}^2+${A.nom + C.nom}^2`,
            `${B.nom + A.nom}^2+${A.nom + C.nom}^2`,
            `${A.nom + B.nom}^2+${C.nom + A.nom}^2`,
            `${B.nom + A.nom}^2+${C.nom + A.nom}^2`,
            //
            `${A.nom + C.nom}^2+${A.nom + B.nom}^2`,
            `${A.nom + C.nom}^2+${B.nom + A.nom}^2`,
            `${C.nom + A.nom}^2+${A.nom + B.nom}^2`,
            `${C.nom + A.nom}^2+${B.nom + A.nom}^2`
          ], { formatInteractif: 'texte' })
        }
        if (listeTypeDeQuestions[i] === 'AC') {
          setReponse(this, i, [
            `${B.nom + C.nom}^2-${A.nom + B.nom}^2`,
            `${C.nom + B.nom}^2-${A.nom + B.nom}^2`,
            `${B.nom + C.nom}^2-${B.nom + A.nom}^2`,
            `${C.nom + B.nom}^2-${B.nom + A.nom}^2`
          ], { formatInteractif: 'texte' })
          texte += `<br>$${A.nom + C.nom}^2=\\ldots$`
        }
      }
      if (!context.isHtml && !context.isAmc && i !== this.nbQuestions - 1) { texte += '\\columnbreak' } // pour la sortie LaTeX sauf la dernière question

      texteCorr = `Le triangle $${nomDuPolygone}$ est rectangle en $${A.nom}$ donc d'après le théorème de Pythagore, on a : `
      texteCorr += `$${B.nom + C.nom}^2=${A.nom + B.nom}^2+${A.nom + C.nom}^2$`
      if (this.typeDeQuestion === '' && this.sup === 1) {
        setReponse(this, i, [
        `${B.nom + C.nom}^2=${A.nom + B.nom}^2+${A.nom + C.nom}^2`,
        `${C.nom + B.nom}^2=${A.nom + B.nom}^2+${A.nom + C.nom}^2`,
        `${B.nom + C.nom}^2=${B.nom + A.nom}^2+${A.nom + C.nom}^2`,
        `${C.nom + B.nom}^2=${B.nom + A.nom}^2+${A.nom + C.nom}^2`,
        `${B.nom + C.nom}^2=${A.nom + B.nom}^2+${C.nom + A.nom}^2`,
        `${C.nom + B.nom}^2=${A.nom + B.nom}^2+${C.nom + A.nom}^2`,
        `${B.nom + C.nom}^2=${B.nom + A.nom}^2+${C.nom + A.nom}^2`,
        `${C.nom + B.nom}^2=${B.nom + A.nom}^2+${C.nom + A.nom}^2`,
        //
        `${B.nom + C.nom}^2=${A.nom + C.nom}^2+${A.nom + B.nom}^2`,
        `${C.nom + B.nom}^2=${A.nom + C.nom}^2+${A.nom + B.nom}^2`,
        `${B.nom + C.nom}^2=${A.nom + C.nom}^2+${B.nom + A.nom}^2`,
        `${C.nom + B.nom}^2=${A.nom + C.nom}^2+${B.nom + A.nom}^2`,
        `${B.nom + C.nom}^2=${C.nom + A.nom}^2+${A.nom + B.nom}^2`,
        `${C.nom + B.nom}^2=${C.nom + A.nom}^2+${A.nom + B.nom}^2`,
        `${B.nom + C.nom}^2=${C.nom + A.nom}^2+${B.nom + A.nom}^2`,
        `${C.nom + B.nom}^2=${C.nom + A.nom}^2+${B.nom + A.nom}^2`,
        // en commençant par la somme
        `${A.nom + B.nom}^2+${A.nom + C.nom}^2=${B.nom + C.nom}^2`,
        `${A.nom + B.nom}^2+${A.nom + C.nom}^2=${C.nom + B.nom}^2`,
        `${B.nom + A.nom}^2+${A.nom + C.nom}^2=${B.nom + C.nom}^2`,
        `${B.nom + A.nom}^2+${A.nom + C.nom}^2=${C.nom + B.nom}^2`,
        `${A.nom + B.nom}^2+${C.nom + A.nom}^2=${B.nom + C.nom}^2`,
        `${A.nom + B.nom}^2+${C.nom + A.nom}^2=${C.nom + B.nom}^2`,
        `${B.nom + A.nom}^2+${C.nom + A.nom}^2=${B.nom + C.nom}^2`,
        `${B.nom + A.nom}^2+${C.nom + A.nom}^2=${C.nom + B.nom}^2`,
        //
        `${A.nom + C.nom}^2+${A.nom + B.nom}^2=${B.nom + C.nom}^2`,
        `${A.nom + C.nom}^2+${A.nom + B.nom}^2=${C.nom + B.nom}^2`,
        `${A.nom + C.nom}^2+${B.nom + A.nom}^2=${B.nom + C.nom}^2`,
        `${A.nom + C.nom}^2+${B.nom + A.nom}^2=${C.nom + B.nom}^2`,
        `${C.nom + A.nom}^2+${A.nom + B.nom}^2=${B.nom + C.nom}^2`,
        `${C.nom + A.nom}^2+${A.nom + B.nom}^2=${C.nom + B.nom}^2`,
        `${C.nom + A.nom}^2+${B.nom + A.nom}^2=${B.nom + C.nom}^2`,
        `${C.nom + A.nom}^2+${B.nom + A.nom}^2=${C.nom + B.nom}^2`], { formatInteractif: 'texte' })
      }
      if (this.sup === 2) {
        if (listeTypeDeQuestions[i] === 'AB') {
          texteCorr += ` d'où $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$.`
        }
        if (listeTypeDeQuestions[i] === 'BC') {
          texteCorr += '.'
        }
        if (listeTypeDeQuestions[i] === 'AC') {
          texteCorr += ` d'où $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$.`
        }
      }
      if (this.typeDeQuestion === 'Calculer :') {
        if (listeTypeDeQuestions[i] === 'AB') {
          let AB
          texteCorr += ` donc $${A.nom + B.nom}^2=${B.nom + C.nom}^2-${A.nom + C.nom}^2$`
          texteCorr += `<br> $${A.nom + B.nom}^2=${texNombre(longueurBC)}^2-${texNombre(longueurAC)}^2=${texNombrec(longueurBC ** 2 - longueurAC ** 2)}$`
          texteCorr += `<br> $${A.nom + B.nom}=\\sqrt{${texNombrec(longueurBC ** 2 - longueurAC ** 2)}}$`
          if (calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1) === calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 5)) {
            AB = texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1))
            reponse = arrondi(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1)
            texteCorr += `<br> $${A.nom + B.nom}=${AB}$ cm.`
            if (this.interactif && context.isHtml) texte += `<br>$${A.nom + B.nom}=$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
          } else {
            AB = texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1))
            reponse = arrondi(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1)
            texteCorr += `<br> $${A.nom + B.nom}\\approx${AB}$ cm.`
            if (this.interactif && context.isHtml) texte += `<br>$${A.nom + B.nom}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
          }
          context.isAmc ? setReponse(this, i, reponse) : setReponse(this, i, new Grandeur(reponse, 'cm'), { formatInteractif: 'longueur' })
        }
        if (listeTypeDeQuestions[i] === 'BC') {
          const BC = texNombre(calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1))
          reponse = arrondi(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1)
          texteCorr += `<br> $${B.nom + C.nom}^2=${texNombre(longueurAB)}^2+${texNombre(longueurAC)}^2=${texNombrec(longueurAB ** 2 + longueurAC ** 2)}$`
          texteCorr += `<br> $${B.nom + C.nom}=\\sqrt{${texNombrec(longueurAB ** 2 + longueurAC ** 2)}}$`
          if (calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1) === calcul(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 5)) {
            texteCorr += `<br> $${B.nom + C.nom}=${BC}$ cm.`
            if (this.interactif && context.isHtml) texte += `<br>$${B.nom + C.nom}=$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
          } else {
            texteCorr += `<br> $${B.nom + C.nom}\\approx${BC}$ cm.`
            if (this.interactif && context.isHtml) texte += `<br>$${B.nom + C.nom}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
          }
          context.isAmc ? setReponse(this, i, reponse) : setReponse(this, i, new Grandeur(reponse, 'cm'), { formatInteractif: 'longueur' })
        }
        if (listeTypeDeQuestions[i] === 'AC') {
          const AC = texNombre(calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1))
          reponse = arrondi(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1)
          texteCorr += ` donc $${A.nom + C.nom}^2=${B.nom + C.nom}^2-${A.nom + B.nom}^2$`
          texteCorr += `<br> $${A.nom + C.nom}^2=${texNombre(longueurBC)}^2-${texNombre(longueurAB)}^2=${texNombrec(longueurBC ** 2 - longueurAB ** 2)}$`
          texteCorr += `<br> $${A.nom + C.nom}=\\sqrt{${texNombrec(longueurBC ** 2 - longueurAB ** 2)}}$`
          if (calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1) === calcul(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 5)) {
            texteCorr += `<br> $${A.nom + C.nom}=${AC}$ cm.`
            if (this.interactif && context.isHtml) texte += `<br>$${A.nom + C.nom}=$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
          } else {
            texteCorr += `<br> $${A.nom + C.nom}\\approx${AC}$ cm.`
            if (this.interactif && context.isHtml) texte += `<br>$${A.nom + C.nom}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
          }
          context.isAmc ? setReponse(this, i, reponse) : setReponse(this, i, new Grandeur(reponse, 'cm'), { formatInteractif: 'longueur' })
        }
      } else {
        texte += ajouteChampTexteMathLive(this, i)
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3,"1 : Donner l'égalité de Pythagore\n2 : Compléter l'égalité de Pythagore\n3 : Calculer une longueur manquante"];
}
// 4G20-1
