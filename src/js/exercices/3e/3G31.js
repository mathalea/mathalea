import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction } from '../../modules/outils/arrayFractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { latexParPoint } from '../../modules/2d/textes.js'
import { arrondi } from '../../modules/outils/nombres.js'
import { homothetie, rotation } from '../../modules/2d/transformations.js'
import { texNombre2 } from '../../modules/outils/texNombres.js'
import { nommePolygone, polygone } from '../../modules/2d/polygone.js'
import { longueur } from '../../modules/2d/calculs.js'
import { barycentre, milieu } from '../../modules/2d/barycentre.js'
import { codageAngle, codageAngleDroit } from '../../modules/2d/codages.js'
import { creerNomDePolygone } from '../../modules/outils/strings.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpenNum'
export const titre = 'Calculer un angle dans un triangle rectangle en utilisant la trigonométrie'

/**
 * @author Jean-Claude Lhote à partir de 3G30-1 de Rémi Angot
 * 3G31 Exercice remplaçant l'exercice initial utilisant MG32
 * Calculer un angle en utilisant l'un des trois rapport trigonométrique.
 * * Si this.level=4 alors seul le cosinus sera utilisé.
 * Mars 2021
 */
export const uuid = '0ac11'
export const ref = '3G31'
export default function CalculDAngle () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = false
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false

  if (context.isHtml) {
    this.spacing = 0
    this.spacingCorr = 0
  } else {
    this.spacing = 2
    this.spacingCorr = 2
  }

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let mEp, mEp2
    if (this.sup) mEp = '<br>'
    else mEp = ''
    if (this.correctionDetaillee) mEp2 = '<br>'
    else mEp2 = ''
    const nom = creerNomDePolygone(3, 'QD')
    let texte = ''; let texteCorr = ''; const objetsEnonce = []; const objetsCorrection = []; let choixRapportTrigo
    let ab, bc, ac, angleABC
    if (this.level === 4) {
      choixRapportTrigo = choice(['Acos'])
    } else {
      choixRapportTrigo = choice(['Acos', 'Asin', 'Atan'])
    }
    angleABC = randint(35, 55)

    if (!context.isHtml && this.sup) {
      texte += '\\begin{minipage}{.6\\linewidth}\n'
    }
    switch (choixRapportTrigo) {
      case 'Acos': // AB=BCxcos(B)
        bc = arrondi(randint(100, 150) / 10, 1)
        ab = arrondi(randint(40, (bc - 2) * 10) / 10, 1)
        angleABC = Math.round(Math.acos(ab / bc) * 180 / Math.PI)
        ac = bc * Math.sin(Math.acos(ab / bc))
        texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,${mEp} $${nom[1] + nom[2]}=${texNombre2(bc)}$ cm et $${nom[0] + nom[1]}=${texNombre2(ab)}$ cm.<br>`
        texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.`
        break
      case 'Asin':
        bc = randint(100, 150) / 10
        ac = randint(40, (bc - 2) * 10) / 10
        angleABC = Math.round(Math.asin(ac / bc) * 180 / Math.PI)
        ab = bc * Math.cos(Math.asin(ac / bc))
        texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,${mEp} $${nom[1] + nom[2]}=${texNombre2(bc)}$ cm et $${nom[0] + nom[2]}=${texNombre2(ac)}$ cm.<br>`
        texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.`
        break
      case 'Atan':
        ab = randint(40, 100) / 10
        ac = randint(40, 100) / 10
        angleABC = Math.round(Math.atan(ac / ab) * 180 / Math.PI)
        bc = ab / Math.cos(Math.atan(ac / ab))
        texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,${mEp} $${nom[0] + nom[1]}=${texNombre2(ab)}$ cm et  $${nom[0] + nom[2]}=${texNombre2(ac)}$ cm.<br>`
        texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.`
        break
    }

    if (!context.isHtml && this.sup) {
      texte += '\n\\end{minipage}\n'
    }
    const ratioerreur = randint(80, 120, 100) / 100
    const a = point(0, 0)
    const b = point(ab * ratioerreur, 0)
    const bb = point(ab, 0)
    const c = point(0, ac / ratioerreur)
    const cb = point(0, ac)
    const p1 = polygone(a, b, c)
    const p3 = polygone(a, bb, cb)
    // p1.isVisible = false
    const alpha = randint(0, 360)
    const p2 = rotation(p1, a, alpha)
    const p4 = rotation(p3, a, alpha)
    const A = p2.listePoints[0]
    const B = p2.listePoints[1]
    const C = p2.listePoints[2]
    const Bb = p4.listePoints[1]
    const Cb = p4.listePoints[2]

    const codage = codageAngleDroit(B, A, C)
    const codageb = codageAngleDroit(Bb, A, Cb)
    A.nom = nom[0]
    B.nom = nom[1]
    C.nom = nom[2]
    const nomme = nommePolygone(p2, nom)
    const nommeb = nommePolygone(p4, nom)

    const hypo = segment(Cb, Bb, 'blue')
    hypo.epaisseur = 2
    const codageDeAngle = codageAngle(A, B, C, 2)
    const codageDeAngleB = codageAngle(A, Bb, Cb, 2)

    const M1 = milieu(A, B)
    const M2 = milieu(A, C)
    const M3 = milieu(B, C)
    const G = barycentre(p2)
    const M1b = milieu(A, Bb)
    const M2b = milieu(A, Cb)
    const M3b = milieu(Bb, Cb)
    const Gb = barycentre(p4)
    const m3 = homothetie(M3, G, 1 + 1.5 / longueur(G, M3))
    const m1 = homothetie(M1, M3, 1 + 1.5 / longueur(M3, M1))
    const m2 = homothetie(M2, M3, 1 + 1.5 / longueur(M3, M2))
    let m4
    m1.positionLabel = 'center'
    m2.positionLabel = 'center'
    m3.positionLabel = 'center'
    const m3b = homothetie(M3b, Gb, 1 + 1.5 / longueur(Gb, M3b))
    const m1b = homothetie(M1b, M3b, 1 + 1.5 / longueur(M3b, M1b))
    const m2b = homothetie(M2b, M3b, 1 + 1.5 / longueur(M3b, M2b))
    let m4b
    m1b.positionLabel = 'center'
    m2b.positionLabel = 'center'
    m3b.positionLabel = 'center'

    let t1, t2, t3, t1b, t2b, t3b
    switch (choixRapportTrigo) {
      case 'Acos': // AB=BCxcos(B)
        t3 = latexParPoint(`${texNombre2(bc)} \\text{ cm}`, m3, 'black', 120, 12, '')
        t2 = latexParPoint(`${texNombre2(ab)} \\text{ cm}`, m1, 'black', 120, 12, '')
        m4 = homothetie(G, B, 2.7 / longueur(B, G))
        m4.positionLabel = 'center'
        t1 = latexParPoint('?', m4, 'black', 50, 12, '')
        t3b = latexParPoint(`${texNombre2(bc)} \\text{ cm}`, m3b, 'black', 120, 12, '')
        t2b = latexParPoint(`${texNombre2(ab)} \\text{ cm}`, m1b, 'black', 120, 12, '')
        m4b = homothetie(Gb, Bb, 2.7 / longueur(Bb, Gb))
        m4b.positionLabel = 'center'
        t1b = latexParPoint('?', m4b, 'black', 50, 12, '')
        break
      case 'Asin':
        t3 = latexParPoint(`${texNombre2(bc)} \\text{ cm}`, m3, 'black', 120, 12, '')
        t2 = latexParPoint(`${texNombre2(ac)} \\text{ cm}`, m2, 'black', 120, 12, '')
        m4 = homothetie(G, B, 2.7 / longueur(B, G))
        m4.positionLabel = 'center'
        t1 = latexParPoint('?', m4, 'black', 100, 12, '')
        t3b = latexParPoint(`${texNombre2(bc)} \\text{ cm}`, m3b, 'black', 120, 12, '')
        t2b = latexParPoint(`${texNombre2(ac)} \\text{ cm}`, m2b, 'black', 120, 12, '')
        m4b = homothetie(Gb, Bb, 2.7 / longueur(Bb, Gb))
        m4b.positionLabel = 'center'
        t1b = latexParPoint('?', m4b, 'black', 100, 12, '')
        break
      case 'Atan':
        t1 = latexParPoint(`${texNombre2(ab)} \\text{ cm}`, m1, 'black', 120, 12, '')
        t2 = latexParPoint(`${texNombre2(ac)} \\text{ cm}`, m2, 'black', 120, 12, '')
        m4 = homothetie(G, B, 2.7 / longueur(B, G))
        m4.positionLabel = 'center'
        t3 = latexParPoint('?', m4, 'black', 100, 12, '')
        t1b = latexParPoint(`${texNombre2(ab)} \\text{ cm}`, m1b, 'black', 120, 12, '')
        t2b = latexParPoint(`${texNombre2(ac)} \\text{ cm}`, m2b, 'black', 120, 12, '')
        m4b = homothetie(Gb, Bb, 2.7 / longueur(Bb, Gb))
        m4b.positionLabel = ''
        t3b = latexParPoint('?', m4b, 'black', 100, 12, '')
        break
    }

    objetsEnonce.push(p2, codage, nomme, t1, t2, t3, codageDeAngle)
    objetsCorrection.push(p4, codageb, nommeb, t1b, t2b, t3b, hypo, codageDeAngleB)

    const paramsEnonce = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 3, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 17, scale: 0.37, mainlevee: true, amplitude: 0.4 }
    const paramsCorrection = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 3, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: 0.5, mainlevee: false }
    if (!context.isHtml && this.sup) {
      texte += '\\begin{minipage}{.4\\linewidth}\n'
    }
    if (this.sup) {
      texte += mathalea2d(paramsEnonce, objetsEnonce) + '<br>'
    }
    if (this.correctionDetaillee) {
      if (!context.isHtml) texteCorr += '\\begin{minipage}{.5\\linewidth}\n'
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'
      if (!context.isHtml) texteCorr += '\n\\end{minipage}\n'
    }
    if (!context.isHtml && this.sup) {
      texte += '\n\\end{minipage}\n'
    }
    if (this.correctionDetaillee && !context.isHtml) texteCorr += '\\begin{minipage}{.5\\linewidth}\n'
    switch (choixRapportTrigo) {
      case 'Acos': // AB=BCxcos(B)
        texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, ${mEp2}le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
        texteCorr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
        texteCorr += 'Avec les données numériques :<br>'
        texteCorr += `$\\cos\\left(\\widehat{${nom}}\\right)=${texFraction(texNombre2(ab), texNombre2(bc))}$<br>`
        texteCorr += `$\\widehat{${nom}}=\\arccos(${texFraction(texNombre2(ab), texNombre2(bc))})\\approx ${angleABC}\\degree$<br>`
        break
      case 'Asin':
        texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$ ${mEp2},le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
        texteCorr += `$\\sin \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`
        texteCorr += 'Avec les données numériques :<br>'
        texteCorr += `$\\sin\\left(\\widehat{${nom}}\\right)=${texFraction(texNombre2(ac), texNombre2(bc))}$<br>`
        texteCorr += `$\\widehat{${nom}}=\\arcsin(${texFraction(texNombre2(ac), texNombre2(bc))})\\approx ${angleABC}\\degree$<br>`

        break
      case 'Atan':
        texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, ${mEp2}la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`
        texteCorr += `$\\tan \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`
        texteCorr += 'Avec les données numériques :<br>'
        texteCorr += `$\\tan\\left(\\widehat{${nom}}\\right)=${texFraction(texNombre2(ac), texNombre2(ab))}$<br>`
        texteCorr += `$\\widehat{${nom}}=\\arctan\\left(${texFraction(texNombre2(ac), texNombre2(ab))}\\right) \\approx ${angleABC} \\degree $ <br>`
        break
    }
    if (this.correctionDetaillee && !context.isHtml) texteCorr += '\n\\end{minipage}\n'

    /*****************************************************/
    // Pour AMC
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: texte,
        propositions: [{ texte: texteCorr, statut: 4, feedback: '' }],
        reponse: { valeur: angleABC.toString(), param: { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0 } }
      }
    } else if (this.interactif && context.isHtml) {
      setReponse(this, 0, angleABC)
    }
    texte += ajouteChampTexteMathLive(this, 0, 'largeur25 inline', { texteApres: ' °' })
    /****************************************************/
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }

  this.besoinFormulaireCaseACocher = ['Figure à main levée', false]
}
