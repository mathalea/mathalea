import Exercice from '../Exercice.js'
import { point, segmentAvecExtremites, labelPoint, arcPointPointAngle, mathalea2d, fixeBordures, texteSurSegment, texteSurArc } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { choice, randint, listeQuestionsToContenu, choisitLettresDifferentes, texNum, combinaisonListes } from '../../modules/outils.js'
import { fraction, abs, multiply, evaluate, divide, isInteger, pow, round } from 'mathjs'
export const titre = 'Homothétie (calculs)'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '28/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculs dans une homothétie : longueurs, aires.
 * @author Frédéric PIOU
 * Référence
*/
export default function calculsHomothetie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 8 // Nombre de questions par défaut
  this.nbCols = 0 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 1 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 1.5)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.sup = 0 // Type d'exercice
  this.sup2 = 3 // 1 : Homothéties de rapport positif, 2: de rapport négatif 3 : mélange
  this.sup3 = 1 // Choix des valeurs
  this.sup4 = true // Affichage des figures facultatives dans l'énoncé (en projet)
  // this.sup3 = false // true pour l'utilisation d'une fraction pour le rapport (en projet)
  // this.sup4 = false // Valeurs entières pour un calcul mental (en projet)
  this.besoinFormulaireNumerique = [
    'Type de question', 9, [
      '0 : Mélange des types de questions',
      '1 : Calculer le rapport',
      '2 : Calculer une longueur image',
      '3 : Calculer une longueur antécédent',
      '4 : Calculer une longueur image (deux étapes)',
      '5 : Calculer une longueur antécédent (deux étapes)',
      '6 : Calculer une aire image',
      '7 : Calculer une aire antécédent',
      '8 : Calculer le rapport à partir des aires'
    ].join('\n')
  ]
  this.besoinFormulaire2Numerique = [
    'Signe du rapport',
    3,
    '1 : positif\n2 : négatif\n3 : mélange'
  ]
  this.besoinFormulaire3Numerique = [
    'Choix des valeurs',
    3,
    '1 : k est décimal (0.1 < k < 4) \n2 : k est une fraction k = a/b avec (a,b) in [1;9]\n3 : k est une fraction et les mesures sont des entiers'
  ]
  this.besoinFormulaire4CaseACocher = ['Figure dans l`énoncé (1-6)', false]
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeQuestionsDisponibles = []
    if (this.sup === 0) {
      typeQuestionsDisponibles = ['rapport', 'image', 'antécédent', 'image2etapes', 'antecendent2etapes', 'aireImage', 'aireAntécédent', 'aireRapport']
    } else {
      typeQuestionsDisponibles = [['rapport', 'image', 'antécédent', 'image2etapes', 'antecendent2etapes', 'aireImage', 'aireAntécédent', 'aireRapport'][this.sup - 1]]
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    const kEstEntier = this.sup3 > 1
    const valeursSimples = this.sup3 === 3
    for (let i = 0, approx, environ, melange, donnee1, donnee2, donnee3, donnees, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const lettres = choisitLettresDifferentes(5, ['P', 'Q', 'U', 'V', 'W', 'X', 'Y', 'Z'])
      const A = lettres[0]
      const hA = lettres[1]
      const O = lettres[2]
      const B = lettres[3]
      const hB = lettres[4]
      const ks = fraction(choice([[1], [-1], [-1, 1]][this.sup2 - 1]))
      let k = fraction(1, 1)
      while (abs(k).toString() === '1') {
        k = kEstEntier ? multiply(fraction(randint(1, 9), randint(1, 9)), ks) : multiply(fraction(choice([randint(15, 40) / 10, randint(1, 9) / 10])), ks)
      }
      let absk = abs(k)
      const agrandissement = evaluate(absk > 1)
      const kpositif = evaluate(k > 0)
      const longueurEntiere = valeursSimples ? fraction(randint(1, 19)) : fraction(randint(11, 99))
      let OA = multiply(agrandissement ? divide(longueurEntiere, 10) : longueurEntiere, 10 ** (valeursSimples) * absk.d ** (kEstEntier))
      let OhA = multiply(absk, OA)
      let OB = multiply(divide(randint(10, 99, [parseInt(longueurEntiere.toString())]), fraction(10)), 10 ** (valeursSimples) * absk.d ** (kEstEntier))
      let OhB = multiply(absk, OB)
      let kAire = fraction(choice([randint(1, 4) + 0.5 + choice([0, 0.5]), randint(1, 9) / 10]))
      let Aire = valeursSimples ? fraction(randint(10, 99)) : fraction(randint(100, 999) / 10)
      let hAire = multiply(pow(kAire, 2), Aire)
      let hAireArrondie = round(hAire, 2)
      const plusgrandque = agrandissement ? '>' : '<'
      const unAgrandissement = agrandissement ? 'un agrandissement' : 'une réduction'
      const intervallek = agrandissement ? (kpositif ? '$k > 1$' : '$k < -1$') : (kpositif ? '$0 < k < 1$' : '$-1 < k < 0$')
      const positif = kpositif ? 'positif' : 'négatif'
      const signek = kpositif ? '' : '-'
      const lopposede = kpositif ? '' : 'l\'opposé de '
      const lopposedu = kpositif ? 'le' : 'l\'opposé du '
      const derapportpositifet = this.sup4 ? '' : `de rapport ${positif} et `
      let kinverse = abs(divide(1, k))
      const OhAdivkInversed = texNum(divide(OhA, kinverse.d))
      const OhBdivkInversed = texNum(divide(OhB, kinverse.d))
      kinverse = { tex: texNum(kinverse, kEstEntier), n: kinverse.n, d: kinverse.d }
      OhA = texNum(OhA)
      const OhAtimeskinverse = (valeursSimples && !isInteger(absk)) ? `=${OhA}\\times ${kinverse.tex}` + (kinverse.d !== 1 ? `=\\dfrac{${OhA}}{${kinverse.d}}\\times ${kinverse.n}=${OhAdivkInversed}\\times ${kinverse.n}` : '') : ''
      OhB = texNum(OhB)
      const OhBtimeskinverse = (valeursSimples && !isInteger(absk)) ? `=${OhB}\\times ${kinverse.tex}` + (kinverse.d !== 1 ? `=\\dfrac{${OhB}}{${kinverse.d}}\\times ${kinverse.n}=${OhBdivkInversed}\\times ${kinverse.n}` : '') : ''
      hAire = texNum(hAire)
      hAireArrondie = texNum(hAireArrondie)
      k = texNum(k, kEstEntier)
      absk = texNum(absk, kEstEntier)
      kAire = texNum(kAire, kEstEntier)
      const parentheseskAire = kEstEntier ? String.raw`\left(${kAire}\right)` : kAire
      OA = texNum(OA)
      OB = texNum(OB)
      Aire = texNum(Aire)
      let figure = {
        O: point(0, 0, `${O}`),
        A: point(agrandissement ? 4 : 7, 0, `${A}`, 'below'),
        B: point(agrandissement ? 4 : 7, 3, `${B}`),
        hA: point((signek + 1) * (agrandissement ? 7 : 4), 0, `${hA}`, kpositif ? 'below' : 'above'),
        hB: point((signek + 1) * (agrandissement ? 7 : 4), (signek + 1) * (agrandissement ? 3 * 7 / 4 : 3 * 4 / 7), `${hB}`, kpositif ? 'above' : 'below')
      }
      figure = Object.assign({}, figure, {
        segmentOA: segmentAvecExtremites(figure.O, figure.A),
        segmentOhA: segmentAvecExtremites(figure.O, figure.hA),
        segmentOB: segmentAvecExtremites(figure.O, figure.B),
        segmentOhB: segmentAvecExtremites(figure.O, figure.hB)
      })
      figure = Object.assign({}, figure, {
        arcOA: agrandissement || !kpositif ? figure.A : arcPointPointAngle(figure.O, figure.A, 60, false),
        arcOhA: !agrandissement || !kpositif ? figure.hA : arcPointPointAngle(figure.O, figure.hA, 60, false),
        arcOB: agrandissement || !kpositif ? figure.B : arcPointPointAngle(figure.B, figure.O, 60, false),
        arcOhB: !agrandissement || !kpositif ? figure.hB : arcPointPointAngle(figure.hB, figure.O, 60, false),
        legendeOA: agrandissement || !kpositif ? texteSurSegment(`${OA.replace('{,}', ',')} cm`, figure.A, figure.O, 'black', 0.30) : texteSurArc(`${OA.replace('{,}', ',')} cm`, figure.O, figure.A, 60, 'black', 0.30),
        legendeOhA: !agrandissement || !kpositif ? texteSurSegment(`${OhA.replace('{,}', ',')} cm`, figure.hA, figure.O, 'black', 0.30) : texteSurArc(`${OhA.replace('{,}', ',')} cm`, figure.O, figure.hA, 60, 'black', 0.30),
        legendeOB: agrandissement || !kpositif ? texteSurSegment(`${OB.replace('{,}', ',')} cm`, figure.O, figure.B, 'black', 0.30) : texteSurArc(`${OB.replace('{,}', ',')} cm`, figure.B, figure.O, 60, 'black', 0.30),
        legendeOhB: !agrandissement || !kpositif ? texteSurSegment(`${OhB.replace('{,}', ',')} cm`, figure.O, figure.hB, 'black', 0.30) : texteSurArc(`${OhB.replace('{,}', ',')} cm`, figure.hB, figure.O, 60, 'black', 0.30)
      })
      figure = Object.assign({}, figure, {
        legendeOAi: agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.A, 'black', 0.30) : texteSurArc('?', figure.O, figure.A, 60, 'black', 0.30),
        legendeOhAi: !agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.hA, 'black', 0.30) : texteSurArc('?', figure.O, figure.hA, 60, 'black', 0.30),
        legendeOBi: agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.B, 'black', 0.30) : texteSurArc('?', figure.B, figure.O, 60, 'black', 0.30),
        legendeOhBi: !agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.hB, 'black', 0.30) : texteSurArc('?', figure.hB, figure.O, 60, 'black', 0.30)
      })
      figure.arcOA.pointilles = true
      figure.arcOhA.pointilles = true
      figure.arcOB.pointilles = true
      figure.arcOhB.pointilles = true
      // const fOB = point(agrandissement ? 2 : 3.5, agrandissement ? -0.5 : -1, `${OB.replace('{,}', ',')} cm`, 'below')
      // const fOhA = point((signek + 1) * (agrandissement ? 3.5 : 2), (signek + 1) * (agrandissement ? 1 : 0.5), `${OhA.replace('{,}', ',')} cm`, kpositif ? 'above' : 'below')
      // const fOhB = point(agrandissement ? 3.5 : 2, agrandissement ? 1 : 0.5, `${OhB.replace('{,}', ',')} cm`, 'above')
      // const fOAi = point(agrandissement ? 2 : 3.5, agrandissement ? -0.5 : -1, '?', 'below')
      // const fOhAi = point((signek + 1) * (agrandissement ? 3.5 : 2), (signek + 1) * (agrandissement ? 1 : 0.5), '?', kpositif ? 'above' : 'below')
      const fscale = kpositif ? 1 : 0.7
      const flabelsRapport = labelPoint(figure.O, figure.A, figure.hA)
      let frapport = mathalea2d(Object.assign({}, fixeBordures([figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhA]), { style: 'inline', scale: fscale }), figure.segmentOA, figure.segmentOhA, figure.arcOA, figure.arcOhA, figure.legendeOA, figure.legendeOhA, flabelsRapport)
      frapport = { enonce: (this.sup4 ? '<br>' + frapport : ''), solution: frapport }
      const flabelsImage = labelPoint(figure.O, figure.A, figure.hA)
      let fImage = mathalea2d(Object.assign({}, fixeBordures([figure.A, figure.O, figure.hA, figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhA]), { style: 'inline', scale: fscale }), figure.segmentOA, figure.segmentOhA, figure.arcOA, figure.arcOhA, figure.legendeOA, figure.legendeOhAi, flabelsImage)
      fImage = { enonce: (this.sup4 ? fImage : ''), solution: fImage }
      const flabelsAntecedent = labelPoint(figure.O, figure.A, figure.hA)
      let fAntecedent = mathalea2d(Object.assign({}, fixeBordures([figure.A, figure.O, figure.hA, figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhA]), { style: 'inline', scale: fscale }), figure.segmentOA, figure.segmentOhA, figure.arcOA, figure.arcOhA, figure.legendeOAi, figure.legendeOhA, flabelsAntecedent)
      fAntecedent = { enonce: (this.sup4 ? fAntecedent : ''), solution: fAntecedent }
      const flabelsImage2etapes = labelPoint(figure.O, figure.A, figure.hA, figure.B, figure.hB)
      let fImage2etapes = mathalea2d(Object.assign({}, fixeBordures([figure.A, figure.O, figure.hA, figure.segmentOA, figure.segmentOhA, figure.B, figure.hB, figure.segmentOB, figure.segmentOhB, figure.legendeOA, figure.legendeOhA, figure.legendeOB, figure.legendeOhB]), { style: 'inline', scale: fscale }), figure.segmentOA, figure.segmentOhA, figure.segmentOB, figure.segmentOhB, figure.legendeOB, figure.arcOB, figure.legendeOhBi, figure.arcOhB, figure.legendeOA, figure.arcOA, figure.legendeOhA, figure.arcOhA, flabelsImage2etapes)
      fImage2etapes = { enonce: (this.sup4 ? fImage2etapes : ''), solution: fImage2etapes }
      const flabelsAntecedent2etapes = labelPoint(figure.O, figure.A, figure.hA, figure.B, figure.hB)
      let fAntecedent2etapes = mathalea2d(Object.assign({}, fixeBordures([figure.A, figure.O, figure.hA, figure.segmentOA, figure.segmentOhA, figure.B, figure.hB, figure.segmentOB, figure.segmentOhB, figure.legendeOA, figure.legendeOhA, figure.legendeOB, figure.legendeOhB]), { style: 'inline', scale: fscale }), figure.segmentOA, figure.segmentOhA, figure.segmentOB, figure.segmentOhB, figure.legendeOBi, figure.arcOB, figure.legendeOhB, figure.arcOhB, figure.legendeOA, figure.arcOA, figure.legendeOhA, figure.arcOhA, flabelsAntecedent2etapes)
      fAntecedent2etapes = { enonce: (this.sup4 ? fAntecedent2etapes : ''), solution: fAntecedent2etapes }
      switch (listeTypeQuestions[i]) {
        case 'rapport':
          donnees = [String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`
                    $${hA}$ est l'image de $${A}$
                    par une homothétie ${derapportpositifet}
                    de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
                    <br>
                    Calculer le rapport $k$ de cette homothétie.
                    ${frapport.enonce}
                    `
          texteCorr = String.raw`
                $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                  $[${O}${hA}]$ est l'image de $[${O}${A}]$
                  et $${O} ${hA} ${plusgrandque} ${O} ${A}$
                  donc c'est ${unAgrandissement} et on a ${intervallek}.
                  <br> ${frapport.solution}
                  `
            texteCorr += String.raw`
                  <br>
                  Le rapport de cette homothétie est ${lopposedu} quotient
                  de la longueur d'un segment "à l'arrivée"
                  par sa longueur "au départ".
                  <br>
                  Soit $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                  `
          }
          break
        case 'image':
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une homothétie
                de centre $${O}$ et de rapport $k=${k}$
                tel que $ {${O}${A}=${OA}\text{ cm}}$.
                <br>
                Calculer $${O}${hA}$.
                <br>${fImage.enonce}
                `
          texteCorr = String.raw`
                $${O}${hA}= ${absk} \times ${OA} =  ${OhA}~\text{cm}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                ${intervallek} donc $[${O}${hA}]$ est ${unAgrandissement} de $[${O}${A}]$.
                <br>${fImage.solution}
                `
            texteCorr += String.raw`
                <br>
                Une homothétie de rapport ${positif} est
                une transformation qui multiplie
                toutes les longueurs par ${lopposede} son rapport.
                <br>
                Soit $${O}${hA}=${absk} \times ${O}${A}$.
                <br>
                Donc $${O}${hA}= ${absk} \times ${OA} =  ${OhA}~\text{cm}$.
                `
          }
          break
        case 'antécédent':
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une
                homothétie de centre $${O}$ et de rapport
                $k=${k}$ tel que $ {${O}${hA}=${OhA}\text{ cm}}$.
                <br>
                Calculer $${O}${A}$.
                <br>${fAntecedent.enonce}
                `
          texteCorr = String.raw`
                $${O}${A}=\dfrac{${O}${hA}}{${absk}}=\dfrac{${OhA}}{${absk}} = ${OA}~\text{cm}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                ${intervallek} donc $[${O}${hA}]$ est ${unAgrandissement} de $[${O}${A}]$.
                <br>${fAntecedent.solution}
                `
            texteCorr += String.raw`
              <br>
              Une homothétie de rapport ${positif} est
              une transformation qui multiplie
              toutes les longueurs par ${lopposede} son rapport.
              <br>
              Soit $${O}${hA}=${absk} \times ${O}${A}$.
              <br>
              Donc $${O}${A}=\dfrac{${O}${hA}}{${absk}}=\dfrac{${OhA}}{${absk}} ${OhAtimeskinverse} = ${OA}~\text{cm}$.
              `
          }
          break
        case 'image2etapes':
          donnees = [String.raw`${O}${B}=${OB}\text{ cm}`, String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1, 2])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          donnee3 = donnees[melange[2]]
          texte = String.raw`
                    $${hA}$ et $${hB}$ sont les images respectives
                    de $${A}$ et $${B}$ par une homothétie
                    ${derapportpositifet} de centre $${O}$ tel que
                    $ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
                    <br>
                    Calculer $${O}${hB}$.
                    <br>${fImage2etapes.enonce}
                    `
          texteCorr = String.raw`
                    $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$ et $${O}${hB}= ${absk} \times ${OB} = ${OhB}~\text{cm}$.
                    `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                    $[${O}${hA}]$ est l'image de $[${O}${A}]$
                    et $${O} ${hA} ${plusgrandque} ${O} ${A}$
                    donc c'est ${unAgrandissement} et on a ${intervallek}.
                    <br>${fImage2etapes.solution}
                    `
            texteCorr += String.raw`
                    <br>        
                    Le rapport de cette homothétie est
                    ${lopposedu} quotient de la longueur d'un segment
                    "à l'arrivée" par sa longueur "au départ".
                    <br>
                    Soit $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                    <br>
                    $[${O}${hB}]$ est l'image de $[${O}${B}]$.
                    <br>
                    Or une homothétie de rapport ${positif}
                    est une transformation qui multiplie
                    toutes les longueurs par ${lopposede} son rapport.
                    <br>
                    Soit $${O}${hB}= ${absk} \times ${OB} = ${OhB}~\text{cm}$.
                    `
          }
          break
        case 'antecendent2etapes':
          donnees = [String.raw`${O}${hB}=${OhB}\text{ cm}`, String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1, 2])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          donnee3 = donnees[melange[2]]
          texte = String.raw`
                      $${hA}$ et $${hB}$ sont les images respectives
                      de $${A}$ et $${B}$ par une homothétie ${derapportpositifet}
                      de centre $${O}$ tel que
                      $ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
                      <br>
                      Calculer $${O}${B}$.
                      <br>${fAntecedent2etapes.enonce}
                      `
          texteCorr = String.raw`
                      $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$ et $${O}${B}=\dfrac{${O}${hB}}{${absk}}=\dfrac{${OhB}}{${absk}} = ${OB}~\text{cm}$.
                      `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                    $[${O}${hA}]$ est l'image de $[${O}${A}]$
                    et $${O} ${hA} ${plusgrandque} ${O} ${A}$
                    donc c'est ${unAgrandissement} et on a ${intervallek}.
                    <br>${fAntecedent2etapes.solution}
                    `
            texteCorr += String.raw`
                      <br>
                      Le rapport d'une homothétie est ${lopposedu} quotient
                      de la longueur d'un segment "à l'arrivée" par sa longueur "au départ".
                      <br>
                      Soit $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                      <br>
                      $[${O}${hB}]$ est l'image de $[${O}${B}]$.
                      <br>
                      Or une homothétie de rapport ${positif} est
                      une transformation qui multiplie
                      toutes les longueurs par ${lopposede} son rapport.
                      <br>
                      Soit $${O}${hB}=${absk} \times ${O}${B}$.
                      <br>
                      Donc $${O}${B}=\dfrac{${O}${hB}}{${absk}}=\dfrac{${OhB}}{${absk}} ${OhBtimeskinverse} = ${OB}~\text{cm}$.
                      `
          }
          break
        case 'aireImage':
          environ = (hAire === hAireArrondie) ? '' : 'environ'
          approx = (environ === 'environ') ? '\\approx' : '='
          texte = String.raw`
                Une figure a pour aire $ {${Aire}\text{ cm}^2}$.
                <br>
                Calculer l'aire de son image par une homothétie de rapport $${kAire}$ (arrondir au $ {\text{mm}^2}$ près si besoin).
                `
          texteCorr = String.raw`
                $ {${parentheseskAire}^2 \times ${Aire} ${approx} ${hAireArrondie}~\text{cm}^2}$
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
                <br>
                $${parentheseskAire}^2 \times ${Aire} = ${hAire}$
                <br>
                Donc l'aire de l'image de cette figure est ${environ} $ {${hAireArrondie}~\text{cm}^2}$.
                `
          }
          break
        case 'aireAntécédent':
          texte = String.raw`
                  L'image d'une figure par une homothétie de rapport $${kAire}$ a pour aire $ {${hAire}\text{ cm}^2}$.
                  <br>
                  Calculer l'aire de la figure de départ.
                  `
          texteCorr = String.raw`
                  $ {\dfrac{${hAire}}{${parentheseskAire}^2} = ${Aire}~\text{cm}^2}$
                  `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                  Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
                  <br>
                  Notons $\mathscr{A}$ l'aire de la figure de départ.
                  <br>
                  D'où $${parentheseskAire}^2 \times \mathscr{A} = ${hAire}$.
                  <br>
                  Puis $\mathscr{A}=\dfrac{${hAire}}{${parentheseskAire}^2}=${Aire}$.
                  <br>
                  Donc l'aire de la figure de départ est $ {${Aire}~\text{cm}^2}$.
                  `
          }
          break
        case 'aireRapport':
          texte = String.raw`
                    Une figure et son image par une homothétie de rapport ${positif} ont respectivement pour aires $ {${Aire}\text{ cm}^2}$ et $ {${hAire}\text{ cm}^2}$.
                    <br>
                    Calculer le rapport de l'homothétie.
                    `
          texteCorr = String.raw`
                    $ {k=${signek}\sqrt{\dfrac{${hAire}}{${Aire}}} = ${signek}${kAire}}$
                    `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                    Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
                    <br>
                    Notons $k$ le rapport de cette homothétie.
                    On a donc $k^2 \times ${Aire} = ${hAire}$,
                    ou encore $k^2=\dfrac{${hAire}}{${Aire}}$.
                    <br>
                    D'où $ {k=${signek}\sqrt{\dfrac{${hAire}}{${Aire}}} = ${signek}${kAire}}$.
                    `
          }
          break
      }
      if (this.questionJamaisPosee(i, k, OA, kAire, signek)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
