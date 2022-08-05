import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { context } from '../../modules/context.js'
import { homothetie, codageAngle, longueur, barycentre, milieu, latexParPoint, mathalea2d, point, polygone, rotation, codageAngleDroit, nommePolygone, segment } from '../../modules/2d.js'
import { texFraction, quatriemeProportionnelle, texNombre, texteEnCouleurEtGras, listeQuestionsToContenu, randint, creerNomDePolygone, combinaisonListes } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpenNum' // type de question AMC
export const dateDeModifImportante = '21/03/2022'

export const titre = 'Calculer une longueur dans un triangle rectangle en utilisant la trigonométrie'

/**
 * @author Jean-Claude Lhote à partir de 3G30-1 de Rémi Angot
 * 3G30 Exercice remplaçant l'exercice initial utilisant MG32
 * Calculer une longueur en utilisant l'un des trois rapport trigonométrique.
 * * Si this.level=4 alors seul le cosinus sera utilisé.
 * Mars 2021
 * combinaisonListes des questions par Guillaume Valmont le 23/05/2022
 */
export default function CalculDeLongueur () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = false
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.interactif = false
  if (context.isHtml) {
    this.spacing = 0
    this.spacingCorr = 0
  } else {
    this.spacing = 2
    this.spacingCorr = 2
  }

  this.nouvelleVersion = function () {
    this.consigne = 'Donner le résultat arrondi à 0,1 en précisant l\'unité'
    this.autoCorrection = []
    this.listeQuestions = []
    this.listeCorrections = []
    let reponse
    let listeDeNomsDePolygones
    let typeQuestionsDisponibles = ['cosinus', 'sinus', 'tangente', 'invCosinus', 'invSinus', 'invTangente']
    if (this.level === 4) typeQuestionsDisponibles = ['cosinus', 'invCosinus']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0; i < this.nbQuestions; i++) {
      if (i % 3 === 0) listeDeNomsDePolygones = ['QD']
      const nom = creerNomDePolygone(3, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nom)
      let texte = ''; let texteCorr = ''; const objetsEnonce = []; const objetsCorrection = []
      let ab, bc, ac

      const angleABC = randint(35, 55)
      const angleABCr = Decimal.acos(-1).div(180).mul(angleABC)
      if (!context.isHtml && this.sup) {
        texte += '\\begin{minipage}{.7\\linewidth}\n'
      }
      switch (listeTypeQuestions[i]) {
        case 'cosinus': // AB=BCxcos(B)
          bc = new Decimal(randint(10, 15))
          ab = Decimal.cos(angleABCr).mul(bc)
          ac = Decimal.sin(angleABCr).mul(bc)
          texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[1] + nom[2]}=${bc}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
          texte += `Calculer $${nom[0] + nom[1]}$ à $0,1$ cm près.`
          break
        case 'sinus':
          bc = new Decimal(randint(10, 15))
          ab = Decimal.cos(angleABCr).mul(bc)
          ac = Decimal.sin(angleABCr).mul(bc)
          texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[1] + nom[2]}=${bc}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
          texte += `Calculer $${nom[0] + nom[2]}$ à $0,1$ cm près.`
          break
        case 'tangente':
          ab = new Decimal(randint(7, 10))
          ac = Decimal.tan(angleABCr).mul(ab)
          bc = new Decimal(ab).div(Decimal.cos(angleABCr))
          texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[1]}=${ab}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
          texte += `Calculer $${nom[0] + nom[2]}$ à $0,1$ cm près.`
          break
        case 'invCosinus':
          ab = new Decimal(randint(7, 10))
          bc = new Decimal(ab).div(Decimal.cos(angleABCr))
          ac = Decimal.sin(angleABCr).mul(bc)
          texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[1]}=${ab}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
          texte += `Calculer $${nom[1] + nom[2]}$ à $0,1$ cm près.`
          break
        case 'invSinus':
          ac = new Decimal(randint(7, 10))
          bc = new Decimal(ac).div(Decimal.sin(angleABCr))
          ab = Decimal.cos(angleABCr).mul(bc)
          texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[2]}=${ac}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
          texte += `Calculer $${nom[1] + nom[2]}$ à $0,1$ cm près.`
          break
        case 'invTangente':
          ac = new Decimal(randint(7, 10))
          bc = new Decimal(ac).div(Decimal.sin(angleABCr))
          ab = Decimal.cos(angleABCr).mul(bc)
          texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[2]}=${ac}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
          texte += `Calculer $${nom[0] + nom[1]}$ à $0,1$ cm près.`
          break
      }

      if (!context.isHtml && this.sup) {
        texte += '\n\\end{minipage}\n'
      }
      const a = point(0, 0)
      const b = point(ab, 0)
      const c = point(0, ac)
      const p1 = polygone(a, b, c)
      // p1.isVisible = false
      const p2 = rotation(p1, a, randint(0, 360))
      const A = p2.listePoints[0]
      const B = p2.listePoints[1]
      const C = p2.listePoints[2]
      const codage = codageAngleDroit(B, A, C)
      A.nom = nom[0]
      B.nom = nom[1]
      C.nom = nom[2]
      const nomme = nommePolygone(p2, nom)
      const hypo = segment(C, B)
      hypo.epaisseur = 2
      hypo.color = 'blue'
      //   codageAngle.epaisseur = 3
      //  codageAngle2.epaisseur = 3
      const codageDeAngle = codageAngle(A, B, C, 2)
      const M1 = milieu(A, B)
      const M2 = milieu(A, C)
      const M3 = milieu(B, C)
      const G = barycentre(p2)
      const m3 = homothetie(M3, G, 1 + 1.5 / longueur(G, M3), 'm3', 'center')
      const m1 = homothetie(M1, M3, 1 + 1.5 / longueur(M3, M1), 'm1', 'center')
      const m2 = homothetie(M2, M3, 1 + 1.5 / longueur(M3, M2), 'm2', 'center')
      let m4
      let t1, t2, t3
      switch (listeTypeQuestions[i]) {
        case 'cosinus': // AB=BCxcos(B)
          t3 = latexParPoint(`${bc} \\text{ cm}`, m3, 'black', 120, 12, '')
          t2 = latexParPoint('?', m1, 'black', 120, 12, '')
          m4 = homothetie(G, B, 2.7 / longueur(B, G), 'B2', 'center')
          t1 = latexParPoint(`${angleABC}\\degree`, m4, 'black', 20, 12, '')
          break
        case 'sinus':
          t3 = latexParPoint(`${bc} \\text{ cm}`, m3, 'black', 120, 12, '')
          t2 = latexParPoint('?', m2, 'black', 120, 12, '')
          m4 = homothetie(G, B, 2.7 / longueur(B, G), 'B2', 'center')
          t1 = latexParPoint(`${angleABC}\\degree`, m4, 'black', 100, 12, '')
          break
        case 'tangente':
          t1 = latexParPoint(`${ab} \\text{ cm}`, m1, 'black', 120, 12, '')
          t2 = latexParPoint('?', m2, 'black', 120, 12, '')
          m4 = homothetie(G, B, 2.7 / longueur(B, G), 'B2', 'center')
          t3 = latexParPoint(`${angleABC}\\degree`, m4, 'black', 100, 12, '')
          break
        case 'invCosinus':
          t1 = latexParPoint(`${ab} \\text{ cm}`, m1, 'black', 120, 12, '')
          t3 = latexParPoint('?', m3, 'black', 120, 12, '')
          m4 = homothetie(G, B, 2.7 / longueur(B, G), 'B2', 'center')
          t2 = latexParPoint(`${angleABC}\\degree`, m4, 'black', 100, 12, '')
          break
        case 'invSinus':
          t2 = latexParPoint(`${ac} \\text{ cm}`, m2, 'black', 120, 12, '')
          t3 = latexParPoint('?', m3, 'black', 120, 12, '')
          m4 = homothetie(G, B, 2.7 / longueur(B, G), 'B2', 'center')
          t1 = latexParPoint(`${angleABC}\\degree`, m4, 'black', 100, 12, '')
          break
        case 'invTangente':
          t2 = latexParPoint(`${ac} \\text{ cm}`, m2, 'black', 120, 12, '')
          t1 = latexParPoint('?', m1, 'black', 120, 12, '')
          m4 = homothetie(G, B, 2.7 / longueur(B, G), 'B2', 'center')
          t3 = latexParPoint(`${angleABC}\\degree`, m4, 'black', 100, 12, '')
          break
      }
      objetsEnonce.push(p2, codage, nomme, t1, t2, t3, codageDeAngle)
      objetsCorrection.push(p2, codage, nomme, t1, t2, t3, hypo, codageDeAngle)

      const paramsEnonce = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 2, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: 0.37, mainlevee: true, amplitude: 0.4 }
      const paramsCorrection = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 2, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: 0.35, mainlevee: false }
      if (!context.isHtml && this.sup) {
        texte += '\\begin{minipage}{.3\\linewidth}\n'
      }
      if (this.sup) {
        texte += mathalea2d(paramsEnonce, objetsEnonce) + '<br>'
      }
      if (!context.isHtml && this.correctionDetaillee) {
        texteCorr += '\\begin{minipage}{.4\\linewidth}\n' + mathalea2d(paramsCorrection, objetsCorrection) + '\n\\end{minipage}\n' + '\\begin{minipage}{.7\\linewidth}\n'
      }
      if (!context.isHtml && this.sup) {
        texte += '\n\\end{minipage}\n'
      }
      switch (listeTypeQuestions[i]) {
        case 'cosinus': // AB=BCxcos(B)
          texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
          texteCorr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
          texteCorr += 'Avec les données numériques :<br>'
          texteCorr += `$\\dfrac{\\cos\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${texFraction(nom[0] + nom[1], bc)}$<br>`
          texteCorr += `${texteEnCouleurEtGras('Les produits en croix sont égaux, donc ', 'red')}<br>`
          texteCorr += `$${nom[0] + nom[1]}=${quatriemeProportionnelle('\\color{red}{1}', bc, `\\cos\\left(${angleABC}\\degree\\right)`)}$`
          texteCorr += `soit $${nom[0] + nom[1]}\\approx${texNombre(ab, 1)}$ cm.`
          reponse = ab.toDP(1)
          break
        case 'sinus':
          texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
          texteCorr += `$\\sin \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`
          texteCorr += 'Avec les données numériques :<br>'
          texteCorr += `$\\dfrac{\\sin\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${texFraction(nom[0] + nom[2], bc)}$<br>`
          texteCorr += `${texteEnCouleurEtGras('Les produits en croix sont égaux, donc ', 'red')}<br>`
          texteCorr += `$${nom[0] + nom[2]}=${quatriemeProportionnelle('\\color{red}{1}', bc, `\\sin\\left(${angleABC}\\degree\\right)`)}$`
          texteCorr += `soit $${nom[0] + nom[2]}\\approx${texNombre(ac, 1)}$ cm.`
          reponse = ac.toDP(1)
          break
        case 'tangente':
          texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`
          texteCorr += `$\\tan \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`
          texteCorr += 'Avec les données numériques :<br>'
          texteCorr += `$\\dfrac{\\tan\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${texFraction(nom[0] + nom[2], ab)}$<br>`
          texteCorr += `${texteEnCouleurEtGras('Les produits en croix sont égaux, donc ', 'red')}<br>`
          texteCorr += `$${nom[0] + nom[2]}=${quatriemeProportionnelle('\\color{red}{1}', ab, `\\tan\\left(${angleABC}\\degree\\right)`)}$`
          texteCorr += `soit $${nom[0] + nom[2]}\\approx${texNombre(ac, 1)}$ cm.`
          reponse = ac.toDP(1)
          break
        case 'invCosinus':
          texteCorr = `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
          texteCorr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
          texteCorr += 'Avec les données numériques :<br>'
          texteCorr += `$\\dfrac{\\cos\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${texFraction(ab, nom[1] + nom[2])}$<br>`
          texteCorr += `${texteEnCouleurEtGras('Les produits en croix sont égaux, donc ', 'red')}<br>`
          texteCorr += `$${nom[1] + nom[2]}=${quatriemeProportionnelle(`\\cos\\left(${angleABC}\\degree\\right)`, ab, '\\color{red}{1}')}$`
          texteCorr += `soit $${nom[1] + nom[2]}\\approx${texNombre(bc, 1)}$ cm.`
          reponse = bc.toDP(1)
          break
        case 'invSinus':
          texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
          texteCorr += `$\\sin \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`
          texteCorr += 'Avec les données numériques :<br>'
          texteCorr += `$\\dfrac{\\sin\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${texFraction(ac, nom[1] + nom[2])}$<br>`
          texteCorr += `${texteEnCouleurEtGras('Les produits en croix sont égaux, donc ', 'red')}<br>`
          texteCorr += `$${nom[1] + nom[2]}=${quatriemeProportionnelle(`\\sin\\left(${angleABC}\\degree\\right)`, ac, '\\color{red}{1}')}$`
          texteCorr += `soit $${nom[1] + nom[2]}\\approx${texNombre(bc, 1)}$ cm.`
          reponse = bc.toDP(1)
          break
        case 'invTangente':
          texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`
          texteCorr += `$\\tan \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`
          texteCorr += 'Avec les données numériques :<br>'
          texteCorr += `$\\dfrac{\\tan\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${texFraction(ac, nom[0] + nom[1])}$<br>`
          texteCorr += `${texteEnCouleurEtGras('Les produits en croix sont égaux, donc ', 'red')}<br>`
          texteCorr += `$${nom[0] + nom[1]}=${quatriemeProportionnelle(`\\tan\\left(${angleABC}\\degree\\right)`, ac, '\\color{red}{1}')}$`
          texteCorr += `soit $${nom[0] + nom[1]}\\approx${texNombre(ab, 1)}$ cm.`
          reponse = ab.toDP(1)
          break
      }
      if (!context.isHtml && this.correctionDetaillee) {
        texteCorr += '\n\\end{minipage}\n'
      }
      /*****************************************************/
      // Pour AMC
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [
            {
              texte: texteCorr,
              statut: 4,
              feedback: ''
            }
          ],
          reponse: {
            texte: 'résultat',
            valeur: [ab.toDP(1)],
            param: {
              digits: 3,
              decimals: 1,
              signe: false,
              exposantNbChiffres: 0,
              exposantSigne: false,
              approx: 1
            }
          }
        }
      }
      if (context.isHtml) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline longueur')
        setReponse(this, i, new Grandeur(reponse, 'cm'), { formatInteractif: 'unites' })
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }

  this.besoinFormulaireCaseACocher = ['Figure à main levée', false]
}
