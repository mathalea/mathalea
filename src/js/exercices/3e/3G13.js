import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { point, segmentAvecExtremites, labelPoint, arcPointPointAngle, texteSurSegment, texteSurArc, rotation, homothetie } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { range, choice, randint, listeQuestionsToContenu, choisitLettresDifferentes, texNum, combinaisonListes, contraindreValeur, compteOccurences } from '../../modules/outils.js'
import { fraction, abs, multiply, evaluate, divide, isInteger, pow, round, subtract, max } from 'mathjs'
export const titre = 'Homothétie (calculs)'
// eslint-disable-next-line no-debugger
// debugger
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '28/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '29/01/2023' //  Par EE

/**
 * Calculs dans une homothétie : longueurs, aires.
 * @author Frédéric PIOU
 * Référence
*/
export const uuid = '6f383'
export const ref = '3G13'
export default function CalculsHomothetie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 4 // Nombre de questions par défaut
  this.nbCols = 0 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 0 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 1 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 1.5) : (this.spacing = 0)
  context.isHtml ? (this.spacingCorr = 1.5) : (this.spacingCorr = 0)
  this.sup = 10 // Type d'exercice
  this.sup2 = 3 // 1 : Homothéties de rapport positif, 2: de rapport négatif 3 : mélange
  this.sup3 = 1 // Choix des valeurs
  this.sup4 = true // Affichage des figures facultatives dans l'énoncé (en projet)

  this.besoinFormulaireTexte = [
    'Type de questions', [
      'Nombres séparés par des tirets',
      '1 : Calculer le rapport',
      '2 : Calculer une longueur image',
      '3 : Calculer une longueur antécédent',
      '4 : Calculer une longueur image (deux étapes)',
      '5 : Calculer une longueur antécédent (deux étapes)',
      '6 : Calculer une aire image',
      '7 : Calculer une aire antécédent',
      '8 : Calculer le rapport à partir des aires',
      '9 : Calculer le rapport connaissant OA et AA\'',
      '10: Encadrer le rapport k',
      '11: Encadrer le rapport k connaissant OA et AA\'',
      '12: Mélange'
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
  this.besoinFormulaire4CaseACocher = ['Figure dans l`énoncé (1-6,9-11)', false]
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['rapport', 'image', 'antécédent', 'image2etapes', 'antecendent2etapes', 'aireImage', 'aireAntécédent', 'aireRapport', 'rapport2', 'encadrerk', 'encadrerk2']
    let typesDeQuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = [12]
    } else {
      if (typeof (this.sup) === 'number') {
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, 12, this.sup, 12)
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 12, typesDeQuestionsDisponibles[i], 12)
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, 12) > 0) typesDeQuestionsDisponibles = combinaisonListes(range(11), this.nbQuestions)
    typesDeQuestionsDisponibles = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const listeTypeQuestions = []
    for (let ee = 0; ee < typesDeQuestionsDisponibles.length; ee++) { listeTypeQuestions.push(typeQuestionsDisponibles[typesDeQuestionsDisponibles[ee] - 1]) }
    const kEstEntier = this.sup3 > 1
    const valeursSimples = this.sup3 === 3
    for (let i = 0, approx, environ, melange, donnee1, donnee2, donnee3, donnees, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const lettres = choisitLettresDifferentes(5, ['P', 'Q', 'U', 'V', 'W', 'X', 'Y', 'Z'])
      const A = lettres[0]; const hA = lettres[1]; const O = lettres[2]; const B = lettres[3]; const hB = lettres[4]
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
      let OhA = multiply(k, OA)
      let OB = multiply(divide(randint(10, 99, [parseInt(longueurEntiere.toString())]), fraction(10)), 10 ** (valeursSimples) * absk.d ** (kEstEntier))
      let OhB = multiply(k, OB)
      let AhA = subtract(OhA, OA)
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
      const inNotin = kpositif ? '\\in' : '\\notin'
      const illustrerParUneFigureAMainLevee = this.sup4 ? '' : 'Illustrer la situation par une figure à main levée.<br>'
      let kinverse = abs(divide(1, k))
      const OhAdivkInversed = texNum(abs(divide(OhA, kinverse.d)))
      const OhBdivkInversed = texNum(abs(divide(OhB, kinverse.d)))
      const largeurFigure = divide(10, max(abs(OA), abs(OhA), abs(AhA)))
      let testFigureCorrigee = true
      let correctionOhA = OhA
      let correctionOA = OA
      if (evaluate(abs(k) < 0.3)) {
        correctionOhA = multiply(multiply(fraction(3, 10), OA), (-1) ** evaluate(k < 0))
      } else if (evaluate(abs(k) < 1 && abs(k) > 0.7)) {
        correctionOhA = multiply(multiply(fraction(7, 10), OA), (-1) ** evaluate(k < 0))
      } else if (evaluate(abs(k) > 1 && abs(k) < 1.3)) {
        correctionOhA = multiply(multiply(fraction(13, 10), OA), (-1) ** evaluate(k < 0))
      } else if (evaluate(abs(k) > 4)) {
        correctionOA = multiply(fraction(2, 1), OA)
      } else {
        testFigureCorrigee = false
      }
      const figurealechelle = !(testFigureCorrigee && this.sup4) || [4, 5, 6, 7, 8].includes(listeTypeQuestions[i]) ? '' : '(La figure n\'est pas à l\'échelle)'
      const figurealechelle2 = !(this.sup4) ? '' : '(La figure n\'est pas à l\'échelle)'
      let figure = {
        O: point(0, 0, `${O}`),
        A: point(multiply(correctionOA, largeurFigure).valueOf(), 0, `${A}`, 'below'),
        hA: point(multiply(correctionOhA, largeurFigure).valueOf(), 0, `${hA}`, kpositif ? 'below' : 'above')
      }
      figure = Object.assign({}, figure, {
        B: homothetie(rotation(figure.A, figure.O, 40), figure.O, 1.2, `${B}`),
        hB: homothetie(rotation(figure.hA, figure.O, 40), figure.O, 1.2, `${hB}`, kpositif ? 'above' : 'below')
      })
      kinverse = { tex: texNum(kinverse, kEstEntier), n: kinverse.n, d: kinverse.d }
      OhA = texNum(abs(OhA))
      const OhAtimeskinverse = (valeursSimples && !isInteger(absk)) ? `=${OhA}\\times ${kinverse.tex}` + (kinverse.d !== 1 ? `=\\dfrac{${OhA}}{${kinverse.d}}\\times ${kinverse.n}=${OhAdivkInversed}\\times ${kinverse.n}` : '') : ''
      OhB = texNum(abs(OhB))
      const OhBtimeskinverse = (valeursSimples && !isInteger(absk)) ? `=${OhB}\\times ${kinverse.tex}` + (kinverse.d !== 1 ? `=\\dfrac{${OhB}}{${kinverse.d}}\\times ${kinverse.n}=${OhBdivkInversed}\\times ${kinverse.n}` : '') : ''
      hAire = texNum(hAire)
      hAireArrondie = texNum(hAireArrondie)
      k = texNum(k, kEstEntier)
      kAire = texNum(kAire, kEstEntier)
      const parentheseskAire = (absk.d === 1 || this.sup3 === 1) && kpositif ? signek + kAire : String.raw`\left(${signek}${kAire}\right)`
      absk = texNum(absk, kEstEntier)
      OA = texNum(OA)
      AhA = texNum(abs(AhA))
      OB = texNum(OB)
      Aire = texNum(Aire)
      const calculsOhA = !kpositif ? `${hA}${A} - ${O}${A} = ${AhA} - ${OA}` : agrandissement ? `${O}${A} + ${A}${hA} = ${OA} + ${AhA} ` : `${O}${A} - ${A}${hA} = ${OA} - ${AhA}`
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
        arcAhA: kpositif ? figure.A : arcPointPointAngle(figure.hA, figure.A, 60, false),
        legendeOA: agrandissement || !kpositif ? texteSurSegment(`${OA.replace('{,}', ',')} cm`, figure.A, figure.O, 'black', 0.30) : texteSurArc(`${OA.replace('{,}', ',')} cm`, figure.O, figure.A, 60, 'black', 0.30),
        legendeOhA: !agrandissement || !kpositif ? texteSurSegment(`${OhA.replace('{,}', ',')} cm`, figure.hA, figure.O, 'black', 0.30) : texteSurArc(`${OhA.replace('{,}', ',')} cm`, figure.O, figure.hA, 60, 'black', 0.30),
        legendeOB: agrandissement || !kpositif ? texteSurSegment(`${OB.replace('{,}', ',')} cm`, figure.O, figure.B, 'black', 0.30) : texteSurArc(`${OB.replace('{,}', ',')} cm`, figure.B, figure.O, 60, 'black', 0.30),
        legendeOhB: !agrandissement || !kpositif ? texteSurSegment(`${OhB.replace('{,}', ',')} cm`, figure.O, figure.hB, 'black', 0.30) : texteSurArc(`${OhB.replace('{,}', ',')} cm`, figure.hB, figure.O, 60, 'black', 0.30),
        legendeAhA: kpositif ? texteSurSegment(`${AhA.replace('{,}', ',')} cm`, figure.hA, figure.A, 'black', 0.30) : texteSurArc(`${AhA.replace('{,}', ',')} cm`, figure.hA, figure.A, 60, 'black', 0.30)
      })
      figure = Object.assign({}, figure, {
        legendeOAi: agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.A, 'black', 0.30) : texteSurArc('?', figure.O, figure.A, 60, 'black', 0.30),
        legendeOhAi: !agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.hA, 'black', 0.30) : texteSurArc('?', figure.O, figure.hA, 60, 'black', 0.30),
        legendeOBi: agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.B, 'black', 0.30) : texteSurArc('?', figure.B, figure.O, 60, 'black', 0.30),
        legendeOhBi: !agrandissement || !kpositif ? texteSurSegment('?', figure.O, figure.hB, 'black', 0.30) : texteSurArc('?', figure.hB, figure.O, 60, 'black', 0.30)
      })
      figure.arcOA.pointilles = 5
      figure.arcOhA.pointilles = 5
      figure.arcOB.pointilles = 5
      figure.arcOhB.pointilles = 5
      figure.arcAhA.pointilles = 5
      // const fscale = context.isHtml ? kpositif ? 1 : 0.7 : kpositif ? 0.7 : 0.5
      let objetsEnonce = []
      const fscale = context.isHtml ? 1 : kpositif ? 0.7 : 0.6

      const flabelsRapport = labelPoint(figure.O, figure.A, figure.hA)
      objetsEnonce = [figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhA]
      if (figure.arcOA.typeObjet !== 'point') objetsEnonce.push(figure.arcOA)
      if (figure.arcOhA.typeObjet !== 'point') objetsEnonce.push(figure.arcOhA)
      let frapport = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { style: 'inline', scale: fscale }), objetsEnonce, flabelsRapport)
      frapport = { enonce: (this.sup4 ? '<br>' + frapport : ''), solution: frapport }

      const flabelsImage = labelPoint(figure.O, figure.A, figure.hA)
      objetsEnonce = [figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhAi]
      if (figure.arcOA.typeObjet !== 'point') objetsEnonce.push(figure.arcOA)
      if (figure.arcOhA.typeObjet !== 'point') objetsEnonce.push(figure.arcOhA)
      let fImage = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { style: 'inline', scale: fscale }), objetsEnonce, flabelsImage)
      fImage = { enonce: (this.sup4 ? fImage : ''), solution: fImage }

      const flabelsAntecedent = labelPoint(figure.O, figure.A, figure.hA)
      objetsEnonce = [figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhA]
      if (figure.A.typeObjet !== 'point') objetsEnonce.push(figure.A)
      if (figure.O.typeObjet !== 'point') objetsEnonce.push(figure.O)
      if (figure.hA.typeObjet !== 'point') objetsEnonce.push(figure.hA)
      let fAntecedent = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { style: 'inline', scale: fscale }), objetsEnonce, flabelsAntecedent)
      fAntecedent = { enonce: (this.sup4 ? fAntecedent : ''), solution: fAntecedent }

      const flabelsImage2etapes = labelPoint(figure.O, figure.A, figure.hA, figure.B, figure.hB)
      objetsEnonce = [figure.segmentOA, figure.segmentOhA, figure.segmentOB, figure.segmentOhB, figure.legendeOA, figure.legendeOhA, figure.legendeOB, figure.legendeOhB]
      if (figure.A.typeObjet !== 'point') objetsEnonce.push(figure.A)
      if (figure.O.typeObjet !== 'point') objetsEnonce.push(figure.O)
      if (figure.hA.typeObjet !== 'point') objetsEnonce.push(figure.hA)
      if (figure.B.typeObjet !== 'point') objetsEnonce.push(figure.B)
      if (figure.hB.typeObjet !== 'point') objetsEnonce.push(figure.hB)
      let fImage2etapes = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { style: 'inline', scale: fscale }), objetsEnonce, flabelsImage2etapes)
      fImage2etapes = { enonce: (this.sup4 ? fImage2etapes : ''), solution: fImage2etapes }

      const flabelsAntecedent2etapes = labelPoint(figure.O, figure.A, figure.hA, figure.B, figure.hB)
      objetsEnonce = [figure.segmentOA, figure.segmentOhA, figure.segmentOB, figure.segmentOhB, figure.legendeOBi, figure.arcOB, figure.legendeOhB, figure.arcOhB, figure.legendeOA, figure.arcOA, figure.legendeOhA, figure.arcOhA]
      if (figure.arcOA.typeObjet !== 'point') objetsEnonce.push(figure.arcOA)
      if (figure.arcOhA.typeObjet !== 'point') objetsEnonce.push(figure.arcOhA)
      if (figure.arcOB.typeObjet !== 'point') objetsEnonce.push(figure.arcOB)
      if (figure.arcOhB.typeObjet !== 'point') objetsEnonce.push(figure.arcOhB)
      let fAntecedent2etapes = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { style: 'inline', scale: fscale }), objetsEnonce, flabelsAntecedent2etapes)
      fAntecedent2etapes = { enonce: (this.sup4 ? fAntecedent2etapes : ''), solution: fAntecedent2etapes }

      objetsEnonce = [figure.segmentOA, figure.segmentOhA, figure.legendeOA, figure.legendeOhA, figure.legendeAhA]
      if (figure.arcOA.typeObjet !== 'point') objetsEnonce.push(figure.arcOA)
      if (figure.arcOhA.typeObjet !== 'point') objetsEnonce.push(figure.arcOhA)
      let frapport2 = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { style: 'inline', scale: fscale }), objetsEnonce, flabelsRapport)
      frapport2 = { enonce: (this.sup4 ? '<br>' + frapport2 : ''), solution: frapport2 }
      switch (listeTypeQuestions[i]) {
        case 'rapport':
          donnees = [String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`$${hA}$ est l'image de $${A}$
par une homothétie ${derapportpositifet}
de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
<br>
${illustrerParUneFigureAMainLevee}
Calculer le rapport $k$ de cette homothétie ${figurealechelle}.
${frapport.enonce}
`
          texteCorr = String.raw`
                $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`$[${O}${hA}]$ est l'image de $[${O}${A}]$
et $${O} ${hA} ${plusgrandque} ${O} ${A}$
donc c'est ${unAgrandissement} et on a ${intervallek}.
<br> ${frapport.solution}
`
            texteCorr += String.raw`<br>
Le rapport de cette homothétie est ${lopposedu} quotient
de la longueur d'un segment "à l'arrivée"
par sa longueur "au départ".
<br>
Soit $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
`
          }
          break
        case 'image':
          texte = String.raw`$${hA}$ est l'image de $${A}$ par une homothétie
de centre $${O}$ et de rapport $k=${k}$
tel que $ {${O}${A}=${OA}\text{ cm}}$.
<br>
${illustrerParUneFigureAMainLevee}
Calculer $${O}${hA}$  ${figurealechelle}.
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
            texteCorr += String.raw`<br>
Une homothétie de rapport ${positif} est
une transformation qui multiplie
toutes les longueurs par ${lopposede} son rapport.
<br>
Soit $${O}${hA}=${signek}k \times ${O}${A}$.
<br>
Donc $${O}${hA}= ${absk} \times ${OA} =  ${OhA}~\text{cm}$.
`
          }
          break
        case 'antécédent':
          texte = String.raw`$${hA}$ est l'image de $${A}$ par une
homothétie de centre $${O}$ et de rapport
$k=${k}$ tel que $ {${O}${hA}=${OhA}\text{ cm}}$.
<br>
${illustrerParUneFigureAMainLevee}
Calculer $${O}${A}$  ${figurealechelle}.
<br>${fAntecedent.enonce}
`
          texteCorr = String.raw`$${O}${A}=\dfrac{${O}${hA}}{${absk}}=\dfrac{${OhA}}{${absk}} = ${OA}~\text{cm}$.`
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                ${intervallek} donc $[${O}${hA}]$ est ${unAgrandissement} de $[${O}${A}]$.
                <br>${fAntecedent.solution}
                `
            texteCorr += String.raw`<br>
Une homothétie de rapport ${positif} est
une transformation qui multiplie
toutes les longueurs par ${lopposede} son rapport.
<br>
Soit $${O}${hA}=${signek}k \times  ${O}${A}$.
<br>
Donc $${O}${A}=\dfrac{${O}${hA}}{${signek}k}=\dfrac{${OhA}}{${absk}} ${OhAtimeskinverse} = ${OA}~\text{cm}$.
`
          }
          break
        case 'image2etapes':
          donnees = [String.raw`${O}${B}=${OB}\text{ cm}`, String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1, 2])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          donnee3 = donnees[melange[2]]
          texte = String.raw`$${hA}$ et $${hB}$ sont les images respectives
de $${A}$ et $${B}$ par une homothétie
${derapportpositifet} de centre $${O}$ tel que
$ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
<br>
${illustrerParUneFigureAMainLevee}
Calculer $${O}${hB}$ ${figurealechelle2}.
<br>${fImage2etapes.enonce}
`
          texteCorr = String.raw`
                    $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$ et $${O}${hB}= ${absk} \times ${OB} = ${OhB}~\text{cm}$.
                    `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`$[${O}${hA}]$ est l'image de $[${O}${A}]$
et $${O} ${hA} ${plusgrandque} ${O} ${A}$
donc c'est ${unAgrandissement} et on a ${intervallek}.
<br>${fImage2etapes.solution}
`
            texteCorr += String.raw`<br>        
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
Soit $${O}${hB}= ${signek}k \times ${O}${B}$.
<br>
Donc $${O}${hB}= ${absk} \times ${OB} = ${OhB}~\text{cm}$.
`
          }
          break
        case 'antecendent2etapes':
          donnees = [String.raw`${O}${hB}=${OhB}\text{ cm}`, String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1, 2])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          donnee3 = donnees[melange[2]]
          texte = String.raw`$${hA}$ et $${hB}$ sont les images respectives
de $${A}$ et $${B}$ par une homothétie ${derapportpositifet}
de centre $${O}$ tel que
$ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
<br>
${illustrerParUneFigureAMainLevee}
Calculer $${O}${B}$ ${figurealechelle2}.
<br>${fAntecedent2etapes.enonce}
`
          texteCorr = String.raw`$k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$
et $${O}${B}=\dfrac{${O}${hB}}{${absk}}=\dfrac{${OhB}}{${absk}} = ${OB}~\text{cm}$.`
          if (this.correctionDetaillee) {
            texteCorr = String.raw`$[${O}${hA}]$ est l'image de $[${O}${A}]$
et $${O} ${hA} ${plusgrandque} ${O} ${A}$
donc c'est ${unAgrandissement} et on a ${intervallek}.
<br>${fAntecedent2etapes.solution}
`
            texteCorr += String.raw`<br>
Le rapport de cette homothétie est ${lopposedu} quotient
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
Soit $${O}${hB}=${signek}k \times ${O}${B}$.
<br>
Donc $${O}${B}=\dfrac{${O}${hB}}{${signek}k}=\dfrac{${OhB}}{${absk}} ${OhBtimeskinverse} = ${OB}~\text{cm}$.
`
          }
          break
        case 'aireImage':
          environ = (hAire === hAireArrondie) ? '' : 'environ'
          approx = (environ === 'environ') ? '\\approx' : '='
          texte = String.raw`Une figure a pour aire $ {${Aire}\text{ cm}^2}$.
<br>
Calculer l'aire de son image par une homothétie de rapport $${signek}${kAire}$ (arrondir au $ {\text{mm}^2}$ près si besoin).
`
          texteCorr = String.raw`
                $ {${parentheseskAire}^2 \times ${Aire} ${approx} ${hAireArrondie}~\text{cm}^2}$
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
<br>
$${parentheseskAire}^2 \times ${Aire} = ${hAire}$
<br>
Donc l'aire de l'image de cette figure est ${environ} $ {${hAireArrondie}~\text{cm}^2}$.
`
          }
          break
        case 'aireAntécédent':
          texte = String.raw`L'image d'une figure par une homothétie de rapport $${signek}${kAire}$ a pour aire $ {${hAire}\text{ cm}^2}$.
<br>
Calculer l'aire de la figure de départ.
`
          texteCorr = String.raw`$ {\dfrac{${hAire}}{${parentheseskAire}^2} = ${Aire}~\text{cm}^2}$
`
          if (this.correctionDetaillee) {
            texteCorr = String.raw`Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
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
          texte = String.raw`Une figure et son image par une homothétie de rapport ${positif} ont respectivement pour aires $ {${Aire}\text{ cm}^2}$ et $ {${hAire}\text{ cm}^2}$.
<br>
Calculer le rapport de l'homothétie.
`
          texteCorr = String.raw`$ {k=${signek}\sqrt{\dfrac{${hAire}}{${Aire}}} = ${signek}${kAire}}$`
          if (this.correctionDetaillee) {
            texteCorr = String.raw`Une homothétie de rapport ${positif} est une transformation qui
multiplie toutes les aires par le carré de son rapport.
<br>
Notons $k$ le rapport de cette homothétie.
On a donc $k^2 \times ${Aire} = ${hAire}$,
ou encore $k^2=\dfrac{${hAire}}{${Aire}}$.
<br>
D'où $ {k=${signek}\sqrt{\dfrac{${hAire}}{${Aire}}} = ${signek}${kAire}}$.
`
          }
          break
        case 'rapport2':
          donnees = [String.raw`${A}${hA}=${AhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`$${hA}$ est l'image de $${A}$
par une homothétie ${derapportpositifet}
de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
<br>
${illustrerParUneFigureAMainLevee}
Calculer le rapport $k$ de cette homothétie ${figurealechelle}.
${frapport2.enonce}
`
          texteCorr = String.raw`
                $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`$${O}${hA} = ${calculsOhA} = ${OhA}\text{ cm}$
<br>
$[${O}${hA}]$ est l'image de $[${O}${A}]$
et $${O} ${hA} ${plusgrandque} ${O} ${A}$
donc c'est ${unAgrandissement} et on a ${intervallek}.
<br> ${frapport.solution}
`
            texteCorr += String.raw`<br>
Le rapport de cette homothétie est ${lopposedu} quotient
de la longueur d'un segment "à l'arrivée"
par sa longueur "au départ".
<br>
Soit $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
`
          }
          break
        case 'encadrerk':
          donnees = [String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`$${hA}$ est l'image de $${A}$
par une homothétie ${derapportpositifet}
de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
<br>
${illustrerParUneFigureAMainLevee}
Sans effectuer de calculs, que peut-on dire du rapport $k$ de cette homothétie ?
(choisir la bonne réponse)
<br>
$\square\hphantom{a} k<-1 \hspace{1cm} \square\hphantom{a} -1 < k < 0 \hspace{1cm} \square\hphantom{a} 0 < k < 1 \hspace{1cm} \square\hphantom{a} k > 1$.
<br>
${figurealechelle}.
${frapport.enonce}
`
          texteCorr = String.raw`
                $${intervallek}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`$[${O}${hA}]$ est l'image de $[${O}${A}]$
et $${O} ${hA} ${plusgrandque} ${O} ${A}$
donc c'est ${unAgrandissement}.
<br>
De plus $${hA}${inNotin}[${O};${A})$ donc ${intervallek}.
<br> ${frapport.solution}
`
          }
          break
        case 'encadrerk2':
          donnees = [String.raw`${A}${hA}=${AhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`$${hA}$ est l'image de $${A}$
par une homothétie ${derapportpositifet}
de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
<br>
${illustrerParUneFigureAMainLevee}
Sans effectuer de calculs, que peut-on dire du rapport $k$ de cette homothétie ?
(choisir la bonne réponse)
<br>
$\square\hphantom{a} k<-1 \hspace{1cm} \square\hphantom{a} -1 < k < 0 \hspace{1cm} \square\hphantom{a} 0 < k < 1 \hspace{1cm} \square\hphantom{a} k > 1$.
<br>
${figurealechelle}.
${frapport2.enonce}`
          texteCorr = String.raw`$${intervallek}$.`
          if (this.correctionDetaillee) {
            texteCorr = String.raw`$${O}${hA} = ${calculsOhA} = ${OhA}\text{ cm}$
<br>
$[${O}${hA}]$ est l'image de $[${O}${A}]$
et $${O} ${hA} ${plusgrandque} ${O} ${A}$
donc c'est ${unAgrandissement}.
<br>
De plus $${hA}${inNotin}[${O};${A})$ donc ${intervallek}.
<br> ${frapport.solution}`
          }
          break
      }
      if (this.questionJamaisPosee(i, k)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
