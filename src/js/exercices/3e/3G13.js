import Exercice from '../Exercice.js'
import { point, segmentAvecExtremites, labelPoint, arcPointPointAngle, mathalea2d, fixeBordures } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { choice, randint, listeQuestionsToContenu, choisitLettresDifferentes, texNum, combinaisonListes, arrondi } from '../../modules/outils.js'
import { fraction, abs, multiply, evaluate, divide } from 'mathjs'
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
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 0 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 50 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 1.5)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.sup = 1
  this.sup2 = 1 // 1 : Homothéties de rapport positif, 2: de rapport négatif 3 : mélange
  this.sup3 = false // true pour l'utilisation d'une fraction pour le rapport (en projet)
  this.sup4 = false // Valeurs entières pour un calcul mental (en projet)
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
  this.besoinFormulaire3CaseACocher = ['Utilisation d\'une fraction pour le rapport', false]
  this.besoinFormulaire4CaseACocher = ['Utilisation de valeurs entières pour les longueurs', false]
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
        k = this.sup3 ? multiply(fraction(randint(1, 9), randint(1, 9)), ks) : multiply(choice([randint(15, 40) / 10, randint(1, 9) / 10]), ks)
      }
      let absk = abs(k)
      const agrandissement = evaluate(absk > 1)
      const kpositif = evaluate(k > 0)
      const longueurEntiere = this.sup4 ? fraction(randint(1, 19)) : fraction(randint(11, 99))
      let OA = multiply(agrandissement ? divide(longueurEntiere, 10) : longueurEntiere, 10 ** (this.sup4) * absk.d ** (this.sup3))
      let OhA = multiply(absk, OA)
      let OB = multiply(divide(randint(10, 99, [parseInt(longueurEntiere.toString())]), 10), 10 ** (this.sup4) * absk.d ** (this.sup3))
      let OhB = multiply(absk, OB)
      let kAire = choice([randint(1, 4) + 0.5 + choice([0, 0.5]), randint(1, 9) / 10])
      let Aire = randint(10, 99) // Avec ce choix il n'y a plus d'arrondi à faire
      let hAire = kAire ** 2 * Aire
      let hAireArrondie = arrondi(kAire ** 2 * Aire)
      const plusgrandque = agrandissement ? '>' : '<'
      const unAgrandissement = agrandissement ? 'un agrandissement' : 'une réduction'
      const intervallek = agrandissement ? (kpositif ? '$k > 1$' : '$k < -1$') : (kpositif ? '$0 < k < 1$' : '$-1 < k < 0$')
      const positif = kpositif ? 'positif' : 'négatif'
      const signek = kpositif ? '' : '-'
      const lopposede = kpositif ? '' : 'l\'opposé de '
      const lopposedu = kpositif ? 'le' : 'l\'opposé du '
      OhA = texNum(OhA).replace(',', '{,}').replace('{{,}}', '{,}')
      OhB = texNum(OhB).replace(',', '{,}').replace('{{,}}', '{,}')
      hAire = texNum(hAire).replace(',', '{,}').replace('{{,}}', '{,}')
      hAireArrondie = texNum(hAireArrondie).replace(',', '{,}').replace('{{,}}', '{,}')
      k = texNum(k, this.sup3).replace(',', '{,}').replace('{{,}}', '{,}')
      absk = texNum(absk, this.sup3).replace(',', '{,}').replace('{{,}}', '{,}')
      kAire = texNum(kAire).replace(',', '{,}').replace('{{,}}', '{,}')
      OA = texNum(OA).replace(',', '{,}').replace('{{,}}', '{,}')
      OB = texNum(OB).replace(',', '{,}').replace('{{,}}', '{,}')
      Aire = texNum(Aire).replace(',', '{,}').replace('{{,}}', '{,}')
      const fO = point(0, 0, `$${O}$`)
      const fA = point(agrandissement ? 4 : 7, 0, `$${A}$`, 'below')
      const fB = point(agrandissement ? 4 : 7, 3, `$${B}$`)
      const fhA = point((signek + 1) * (agrandissement ? 7 : 4), 0, `$${hA}$`, kpositif ? 'below' : 'above')
      const fhB = point((signek + 1) * (agrandissement ? 7 : 4), (signek + 1) * (agrandissement ? 3 * 7 / 4 : 3 * 4 / 7), `$${hB}$`, kpositif ? 'above' : 'below')
      const fs1 = segmentAvecExtremites(fO, fA)
      const fs2 = segmentAvecExtremites(fA, fhA)
      const fs3 = segmentAvecExtremites(fO, fB)
      const fs4 = segmentAvecExtremites(fB, fhB)
      const fc1 = arcPointPointAngle(fhA, fO, 60, false)
      fc1.pointilles = true
      const fc2 = arcPointPointAngle(fO, fA, 60, false)
      fc2.pointilles = true
      // const fc3 = arcPointPointAngle(fhB, fO, 60, false)
      // const fc4 = arcPointPointAngle(fO, fB, 60, false)
      const fOA = point(agrandissement ? 2 : 3.5, agrandissement ? -0.5 : -1, `$${OA}~\\text{cm}$`, 'below')
      const fOB = point(agrandissement ? 2 : 3.5, agrandissement ? -0.5 : -1, `$${OB}~\\text{cm}$`, 'below')
      const fOhA = point((signek + 1) * (agrandissement ? 3.5 : 2), (signek + 1) * (agrandissement ? 1 : 0.5), `$${OhA}~\\text{cm}$`, kpositif ? 'above' : 'below')
      const fOhB = point(agrandissement ? 3.5 : 2, agrandissement ? 1 : 0.5, `$${OhB}~\\text{cm}$`, 'above')
      const fOAi = point(agrandissement ? 2 : 3.5, agrandissement ? -0.5 : -1, '$\\text{?}$', 'below')
      // const fOBi = point(agrandissement ? 2 : 3.5, agrandissement ? -0.5 : -1, '$\\text{?}$', 'below')
      const fOhAi = point((signek + 1) * (agrandissement ? 3.5 : 2), (signek + 1) * (agrandissement ? 1 : 0.5), '$\\text{?}$', kpositif ? 'above' : 'below')
      // const fOhBi = point(agrandissement ? 3.5 : 2, agrandissement ? 1 : 0.5, '$\\text{?}$', 'above')
      const fscale = kpositif ? 1 : 0.7
      // const figureSimple = mathalea2d(Object.assign({}, fixeBordures([fA, fO, fhA, fOA, fOhA]), { style: 'inline', scale: fscale }), fs1, fs2, labelPoint(fO, fA, fhA))
      const flabelsRapport = labelPoint(fO, fA, fhA, fOhA, fOA)
      const frapport = mathalea2d(Object.assign({}, fixeBordures([fA, fO, fhA, fOA, fOhA]), { style: 'inline', scale: fscale }), fs1, fs2, fc1, fc2, flabelsRapport)
      const flabelsImage = labelPoint(fO, fA, fhA, fOhAi, fOA)
      const fImage = mathalea2d(Object.assign({}, fixeBordures([fA, fO, fhA, fOA, fOhA]), { style: 'inline', scale: fscale }), fs1, fs2, fc1, fc2, flabelsImage)
      const flabelsAntecedent = labelPoint(fO, fA, fhA, fOhA, fOAi)
      const fAntecedent = mathalea2d(Object.assign({}, fixeBordures([fA, fO, fhA, fOA, fOhA]), { style: 'inline', scale: fscale }), fs1, fs2, fc1, fc2, flabelsAntecedent)
      const flabelsImage2etapes = labelPoint(fO, fA, fhA, fB, fhB)
      const fImage2etapes = mathalea2d(Object.assign({}, fixeBordures([fA, fO, fhA, fOA, fOhA, fB, fhB, fOB, fOhB]), { style: 'inline', scale: fscale }), fs1, fs2, fs3, fs4, flabelsImage2etapes)
      const flabelsAntecedent2etapes = labelPoint(fO, fA, fhA, fB, fhB)
      const fAntecedent2etapes = mathalea2d(Object.assign({}, fixeBordures([fA, fO, fhA, fOA, fOhA, fB, fhB, fOB, fOhB]), { style: 'inline', scale: fscale }), fs1, fs2, fs3, fs4, flabelsAntecedent2etapes)
      switch (listeTypeQuestions[i]) {
        case 'rapport':
          donnees = [String.raw`${O}${hA}=${OhA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`
                    $${hA}$ est l'image de $${A}$
                    par une homothétie de rapport ${positif}
                    et de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
                    <br>
                    Calculer le rapport $k$ de cette homothétie.
                    <br>
                    `
          // texte += figureSimple
          texteCorr = String.raw`
                $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                  $[${O}${hA}]$ est l'image de $[${O}${A}]$
                  et $${O} ${hA} ${plusgrandque} ${O} ${A}$
                  donc c'est ${unAgrandissement} et on a ${intervallek}.
                  <br>
                  `
            texteCorr += frapport
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
                $${hA}$ est l'image de $${A}$ par une homothétie de centre $${O}$ et de rapport $${k}$ tel que $ {${O}${A}=${OA}\text{ cm}}$.
                <br>
                Calculer $${O}${hA}$.
                `
          texteCorr = String.raw`
                $${O}${hA}= ${absk} \times ${OA} =  ${OhA}~\text{cm}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                ${intervallek} donc $[${O}${hA}]$ est ${unAgrandissement} de $[${O}${A}]$.
                <br>
                `
            texteCorr += fImage
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
                $${hA}$ est l'image de $${A}$ par une homothétie de centre $${O}$ et de rapport $${k}$ tel que $ {${O}${hA}=${OhA}\text{ cm}}$.
                <br>
                Calculer $${O}${A}$.
                `
          texteCorr = String.raw`
                $${O}${A}=\dfrac{${O}${hA}}{${absk}}=\dfrac{${OhA}}{${absk}} = ${OA}~\text{cm}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                ${intervallek} donc $[${O}${hA}]$ est ${unAgrandissement} de $[${O}${A}]$.
                <br>
                `
            texteCorr += fAntecedent
            texteCorr += String.raw`
            <br>
            Une homothétie de rapport ${positif} est
            une transformation qui multiplie
            toutes les longueurs par ${lopposede} son rapport.
            <br>
            Soit $${O}${hA}=${absk} \times ${O}${A}$.
            <br>
            Donc $${O}${A}=\dfrac{${O}${hA}}{${absk}}=\dfrac{${OhA}}{${absk}} = ${OA}~\text{cm}$.
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
                    de $${A}$ et $${B}$ par une homothétie de centre $${O}$
                    et de rapport ${positif} tel que
                    $ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
                    <br>
                    Calculer $${O}${hB}$.
                    `
          texteCorr = String.raw`
                    $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$ et $${O}${hB}= ${absk} \times ${OB} = ${OhB}~\text{cm}$.
                    `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                    $[${O}${hA}]$ est l'image de $[${O}${A}]$
                    et $${O} ${hA} ${plusgrandque} ${O} ${A}$
                    donc c'est ${unAgrandissement} et on a ${intervallek}.
                    <br>
                    `
            texteCorr += fImage2etapes
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
                      de $${A}$ et $${B}$ par une homothétie de centre $${O}$
                      et de rapport ${positif} tel que
                      $ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
                      <br>
                      Calculer $${O}${B}$.
                      `
          texteCorr = String.raw`
                      $k=${signek}\dfrac{${O}${hA}}{${O}${A}}=${signek}\dfrac{${OhA}}{${OA}}=${k}$ et $${O}${B}=\dfrac{${O}${hB}}{${absk}}=\dfrac{${OhB}}{${absk}} = ${OB}~\text{cm}$.
                      `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                    $[${O}${hA}]$ est l'image de $[${O}${A}]$
                    et $${O} ${hA} ${plusgrandque} ${O} ${A}$
                    donc c'est ${unAgrandissement} et on a ${intervallek}.
                    <br>
                    `
            texteCorr += fAntecedent2etapes
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
                      Donc $${O}${B}=\dfrac{${O}${hB}}{${absk}}=\dfrac{${OhB}}{${absk}} = ${OB}~\text{cm}$.
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
                $ {${kAire}^2 \times ${Aire} ${approx} ${hAireArrondie}~\text{cm}^2}$
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
                <br>
                $${kAire}^2 \times ${Aire} = ${hAire}$
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
                  $ {\dfrac{${hAire}}{${kAire}^2} = ${Aire}~\text{cm}^2}$
                  `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                  Une homothétie de rapport ${positif} est une transformation qui multiplie toutes les aires par le carré de son rapport.
                  <br>
                  Notons $\mathscr{A}$ l'aire de la figure de départ.
                  <br>
                  D'où $${kAire}^2 \times \mathscr{A} = ${hAire}$.
                  <br>
                  Puis $\mathscr{A}=\dfrac{${hAire}}{${kAire}^2}=${Aire}$.
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
