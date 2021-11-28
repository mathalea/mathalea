import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { choice, randint, listeQuestionsToContenu, choisitLettresDifferentes, texNombrec, combinaisonListes, arrondi } from '../../modules/outils.js'
export const titre = 'Homothétie (calculs)'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '27/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculs dans une homothétie : longueurs, aires.
 * @author Frédéric PIOU
 * Référence
*/
export default function calculsHomothetie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 6 // Nombre de questions par défaut
  this.nbCols = 0 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 0 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 50 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 0)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 0)
  this.sup = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeQuestionsDisponibles = []
    if (this.sup === 8) {
      typeQuestionsDisponibles = ['rapport', 'image', 'antécédent', 'image2etapes', 'antecendent2etapes', 'aireImage', 'aireAntécédent']
    } else {
      typeQuestionsDisponibles = [['rapport', 'image', 'antécédent', 'image2etapes', 'antecendent2etapes', 'aireImage', 'aireAntécédent'][this.sup - 1]]
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, approx, environ, melange, donnee1, donnee2, donnee3, donnees, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const lettres = choisitLettresDifferentes(5, ['P', 'Q', 'U', 'V', 'W', 'X', 'Y', 'Z'])
      const A = lettres[0]
      const hA = lettres[1]
      const O = lettres[2]
      const B = lettres[3]
      const hB = lettres[4]
      let k = choice([randint(15, 40) / 10, randint(1, 9) / 10])
      const longueurEntiere = randint(1, 99)
      let OA = (k > 1) ? longueurEntiere / 10 : longueurEntiere
      let Aire = OA ** 2
      let OB = randint(1, 99, [longueurEntiere]) / 10
      const hOB = texNombrec(k * OB)
      const hOA = texNombrec(k * OA)
      const hAire = texNombrec(k ** 2 * Aire)
      const hAireArrondie = texNombrec(arrondi(k ** 2 * Aire))
      k = texNombrec(k)
      OA = texNombrec(OA)
      OB = texNombrec(OB)
      Aire = texNombrec(Aire)
      switch (listeTypeQuestions[i]) {
        case 'rapport':
          donnees = [String.raw`${O}${hA}=${hOA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une homothétie de rapport positif et de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
                <br>
                Calculer le rapport $k$ de cette homothétie.
                `
          texteCorr = String.raw`
                $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                  Le rapport d'une homothétie est le quotient de la longueur d'un segment "à l'arrivée" par sa longueur "au départ".
                  <br>
                  Soit $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$.
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
                $${O}${hA}= ${k} \times ${OA} =  ${hOA}~\text{cm}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                Une homothétie de rapport positif est une transformation qui multiplie toutes les longueurs par son rapport.
                <br>
                Soit $${O}${hA}=${k} \times ${O}${A}$
                <br>
                Donc $${O}${hA}= ${k} \times ${OA} =  ${hOA}~\text{cm}$.
                `
          }
          break
        case 'antécédent':
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une homothétie de centre $${O}$ et de rapport $${k}$ tel que $ {${O}${hA}=${hOA}\text{ cm}}$.
                <br>
                Calculer $${O}${A}$.
                `
          texteCorr = String.raw`
                $${O}${A}=\dfrac{${O}${hA}}{${k}}=\dfrac{${hOA}}{${k}} = ${OA}~\text{cm}$.
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
            Une homothétie de rapport positif est une transformation qui multiplie toutes les longueurs par son rapport.
            <br>
            Soit $${O}${hA}=${k} \times ${O}${A}$
            <br>
            Donc $${O}${A}=\dfrac{${O}${hA}}{${k}}=\dfrac{${hOA}}{${k}} = ${OA}~\text{cm}$.
            `
          }
          break
        case 'image2etapes':
          donnees = [String.raw`${O}${B}=${OB}\text{ cm}`, String.raw`${O}${hA}=${hOA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1, 2])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          donnee3 = donnees[melange[2]]
          texte = String.raw`
                    $${hA}$ et $${hB}$ sont les images respectives de $${A}$ et $${B}$ par une homothétie de centre $${O}$ tel que $ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
                    <br>
                    Calculer $${O}${hB}$.
                    `
          texteCorr = String.raw`
                    $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$ et $${O}${hB}= ${k} \times ${OB} = ${hOB}~\text{cm}$.
                    `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                    Le rapport d'une homothétie est le quotient de la longueur d'un segment "à l'arrivée" par sa longueur "au départ".
                    <br>
                    Soit $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$.
                    <br>
                    Une homothétie de rapport positif est une transformation qui multiplie toutes les longueurs par son rapport.
                    <br>
                    Soit $${O}${hB}= ${k} \times ${OB} = ${hOB}~\text{cm}$
                    `
          }
          break
        case 'antecendent2etapes':
          donnees = [String.raw`${O}${hB}=${hOB}\text{ cm}`, String.raw`${O}${hA}=${hOA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
          melange = combinaisonListes([0, 1, 2])
          donnee1 = donnees[melange[0]]
          donnee2 = donnees[melange[1]]
          donnee3 = donnees[melange[2]]
          texte = String.raw`
                      $${hA}$ et $${hB}$ sont les images respectives de $${A}$ et $${B}$ par une homothétie de centre $${O}$ tel que $ {${donnee1}}$, $ {${donnee2}}$ et $ {${donnee3}}$.
                      <br>
                      Calculer $${O}${B}$.
                      `
          texteCorr = String.raw`
                      $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$ et $${O}${B}=\dfrac{${O}${hB}}{${k}}=\dfrac{${hOB}}{${k}} = ${OB}~\text{cm}$.
                      `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                      Le rapport d'une homothétie est le quotient de la longueur d'un segment "à l'arrivée" par sa longueur "au départ".
                      <br>
                      Soit $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$.
                      <br>
                      Une homothétie de rapport positif est une transformation qui multiplie toutes les longueurs par son rapport.
                      <br>
                      Soit $${O}${hB}=${k} \times ${O}${B}$
                      <br>
                      Donc $${O}${B}=\dfrac{${O}${hB}}{${k}}=\dfrac{${hOB}}{${k}} = ${OB}~\text{cm}$.
                      `
          }
          break
        case 'aireImage':
          environ = (hAire === hAireArrondie) ? '' : 'environ'
          approx = (environ === 'environ') ? '\\approx' : '='
          texte = String.raw`
                Une figure a pour aire $ {${Aire}\text{ cm}^2}$.
                <br>
                Calculer l'aire de son image par une homothétie de rapport $${k}$ (arrondir au $ {\text{mm}^2}$ près si besoin).
                `
          texteCorr = String.raw`
                $ {${k}^2 \times ${Aire} ${approx} ${hAireArrondie}~\text{cm}^2}$
                `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                Une homothétie de rapport positif est une transformation qui multiplie toutes les aires par le carré de son rapport.
                <br>
                $${k}^2 \times ${Aire} = ${hAire}$
                <br>
                Donc l'aire de l'image de cette figure est ${environ} $ {${hAireArrondie}~\text{cm}^2}$.
                `
          }
          break
        case 'aireAntécédent':
          texte = String.raw`
                  L'image d'une figure par une homothétie de rapport $${k}$ a pour aire $ {${hAire}\text{ cm}^2}$.
                  <br>
                  Calculer l'aire de la figure de départ.
                  `
          texteCorr = String.raw`
                  $ {\dfrac{${hAire}}{${k}^2} = ${Aire}~\text{cm}^2}$
                  `
          if (this.correctionDetaillee) {
            texteCorr = String.raw`
                  Une homothétie de rapport positif est une transformation qui multiplie toutes les aires par le carré de son rapport.
                  <br>
                  Notons $\mathscr{A}$ l'aire de la figure de départ.<br>
                  D'où $${k}^2 \times \mathscr{A} = ${hAire}$
                  <br>
                  Puis $\mathscr{A}=\dfrac{${hAire}}{${k}^2}=${Aire}$ 
                  <br>
                  Donc l'aire de la figure de départ est $ {${Aire}~\text{cm}^2}$.
                  `
          }
          break
      }
      if (this.questionJamaisPosee(i, k, OA, melange)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = [
    'Type d\'exercice', 8, [
      '1 : Calculer le rapport',
      '2 : Calculer une longueur image',
      '3 : Calculer une longueur antécédent',
      '4 : Calculer une longueur image (deux étapes)',
      '5 : Calculer une longueur antécédent (deux étapes)',
      '6 : Calculer une aire image',
      '7 : Calculer une aire antécédent',
      '8 : Mélange des types de questions'
    ].join('\n')
  ]
}
