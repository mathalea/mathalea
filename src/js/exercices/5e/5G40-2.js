import { point, polygone, segment, milieu, nommePolygone, codeSegment, codeAngle, mathalea2d, latexParPoint } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { creerNomDePolygone, listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Reconnaitre un parallélogramme à partir du codage d’une figure'

/**
 * On doit justifier qu'un quadrilatère est un parallélogramme en citant la bonne propriété
 * @author Rémi Angot
 * Référence 5G40-2
 * Publié le 5/4/2021
*/
export default function ParallelogrammeAPartirDUneFigure () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Pour chacune des figures suivantes, tracées à main levée, préciser s'il s'agit d'un parallélogramme."
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    // this.introduction = ''

    const A = point(0, 0)
    const B = point(5, 0)
    const C = point(6.5, -3)
    const D = point(1.5, -3)
    const O = milieu(A, C)
    O.nom = 'O'
    const p = polygone(A, B, C, D)
    const sAC = segment(A, C)
    sAC.pointilles = true
    const sBD = segment(B, D)
    sBD.pointilles = true
    const sABcodage = codeSegment(A, B, 'X', 'blue')
    const sCDcodage = codeSegment(C, D, 'X', 'blue')
    const sADcodage = codeSegment(A, D, '▼', 'blue')
    const sBCcodage = codeSegment(B, C, '▼', 'blue')
    const sAOcodage = codeSegment(A, O, '|', 'blue')
    const sCOcodage = codeSegment(O, C, '|', 'blue')
    const sBOcodage = codeSegment(B, O, '||', 'blue')
    const sDOcodage = codeSegment(O, D, '||', 'blue')
    const aDABcodage = codeAngle(D, A, B, 0.8, '|', 'black', 1, 1, 'blue')
    const aBCDcodage = codeAngle(B, C, D, 0.8, '|', 'black', 1, 1, 'blue')
    const aABCcodage = codeAngle(A, B, C, 0.8, '|||', 'black', 1, 1, 'orange')
    const aCDAcodage = codeAngle(C, D, A, 0.8, '|||', 'black', 1, 1, 'orange')
    const sAB = segment(A, B)
    const sBC = segment(B, C)
    const sCD = segment(C, D)
    const sAD = segment(A, D)
    sAB.epaisseur = 2
    sAB.color = 'blue'
    sCD.epaisseur = 2
    sCD.color = 'blue'
    sBC.epaisseur = 2
    sBC.color = 'green'
    sAD.epaisseur = 2
    sAD.color = 'green'

    // Cerf-volant
    const M1 = point(0, 0)
    const N1 = point(-1, -2)
    const O1 = point(0, -6)
    const P1 = point(1, -2)
    const p1 = polygone(M1, N1, O1, P1)

    const codecerf1 = codeSegment(M1, N1, 'X', 'blue')
    const codecerf2 = codeSegment(M1, P1, 'X', 'blue')
    const codecerf3 = codeSegment(O1, P1, '▼', 'blue')
    const codecerf4 = codeSegment(O1, N1, '▼', 'blue')

    const paramsEnonce = { xmin: -1, ymin: -4, xmax: 7.5, ymax: 0.8, pixelsParCm: 20, scale: 0.5, mainlevee: true, amplitude: 0.5 }

    const nomsDejaUtilises = ['O']
    let nom
    function gestionNom () {
      nom = creerNomDePolygone(4, nomsDejaUtilises)
      nomsDejaUtilises.push(nom)
      A.nom = nom[0]
      B.nom = nom[1]
      C.nom = nom[2]
      D.nom = nom[3]
    }

    const typeQuestionsDisponibles = ['cotesOpposesMemeLongueur', 'cotesConsecutifsMemeLongueur', 'diagonalesMemeLongueur', '2cotesOpposesMemeLongueur', '2cotesOpposesMemeLongueurv2', '2cotesOpposesMemeLongueurEtParallele', '2cotesOpposesMemeLongueurEtParallelev2', '2cotesOpposesEtParalleles', 'anglesOpposesEgaux'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'cotesOpposesMemeLongueur':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sABcodage, sBCcodage, sCDcodage, sADcodage, nommePolygone(p, nom)])
          texteCorr = `On sait que $${A.nom + B.nom} = ${C.nom + D.nom}$ et $${B.nom + C.nom} = ${D.nom + A.nom}$.`
          texteCorr += '<br>Or « Si un quadrilatère a ses côtés opposés de même longueur alors c\'est un parallélogramme ».'
          texteCorr += `<br>Donc $${nom}$ est un parallélogramme.`
          break
        case 'cotesConsecutifsMemeLongueur':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, codeSegment(A, B, 'X', 'blue'), codeSegment(B, C, 'X', 'blue'), codeSegment(C, D, '||', 'blue'), codeSegment(D, A, '||', 'blue'), nommePolygone(p, nom)])

          texteCorr = `Les côtés consécutifs de $${nom}$ sont de même longueur, ce n'est pas forcément un parallélogramme comme le montre le contre-exemple suivant. (Il s'agit d'un cerf-volant).`

          texteCorr += '<br>' + mathalea2d({ xmin: -1.5, ymin: -6.5, xmax: 1.5, ymax: 0.5, pixelsParCm: 20, scale: 1 }, [p1, codecerf1, codecerf2, codecerf3, codecerf4])
          break
        case 'diagonalesMemeLongueur':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sAOcodage, sBOcodage, sCOcodage, sDOcodage, sAC, sBD, nommePolygone(p, nom), latexParPoint('O', O, 'black', 200, 12, '')])
          texteCorr = `On sait que $${A.nom + 'O'} = ${'O' + C.nom}$ et $${B.nom + 'O'} = ${'O' + D.nom}$.`
          texteCorr += '<br>Or « Si un quadrilatère a ses diagonales qui se coupent en leur milieu alors c\'est un parallélogramme ».'
          texteCorr += `<br>Donc $${nom}$ est un parallélogramme.`
          break
        case '2cotesOpposesMemeLongueur':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sABcodage, sCDcodage, nommePolygone(p, nom)])
          texteCorr = `Seulement deux côtés opposés sont de même longueur, ce n'est pas suffisant pour que $${nom}$ soit un parallélogramme.`
          break
        case '2cotesOpposesMemeLongueurv2':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sBCcodage, sADcodage, nommePolygone(p, nom)])
          texteCorr = `Seulement deux côtés opposés sont de même longueur, ce n'est pas suffisant pour que $${nom}$ soit un parallélogramme.`
          break
        case '2cotesOpposesMemeLongueurEtParallele':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sAB, sCD, sABcodage, sCDcodage, nommePolygone(p, nom)]) + `$(${A.nom + B.nom}) // (${C.nom + D.nom})$`
          texteCorr = `On sait que $${A.nom + B.nom} = ${C.nom + D.nom}$ et $(${A.nom + B.nom}) // (${C.nom + D.nom})$.`
          texteCorr += '<br>Or « Si un quadrilatère a deux côtés opposés parallèles et de même longueur alors c\'est un parallélogramme ».'
          texteCorr += `<br>Donc $${nom}$ est un parallélogramme.`
          break
        case '2cotesOpposesMemeLongueurEtParallelev2':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sBC, sAD, sBCcodage, sADcodage, nommePolygone(p, nom)]) + `$(${B.nom + C.nom}) // (${A.nom + D.nom})$`
          texteCorr = `On sait que $${B.nom + C.nom} = ${A.nom + D.nom}$ et $(${B.nom + C.nom}) // (${A.nom + D.nom})$.`
          texteCorr += '<br>Or « Si un quadrilatère a deux côtés opposés parallèles et de même longueur alors c\'est un parallélogramme ».'
          texteCorr += `<br>Donc $${nom}$ est un parallélogramme.`
          break
        case '2cotesOpposesEtParalleles':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, sAB, sCD, nommePolygone(p, nom)]) + `$(${A.nom + B.nom}) // (${C.nom + D.nom})$`
          texteCorr = `$${nom}$ a deux côtés opposés parallèles, c'est donc un trapèze et pas forcément un parallélogramme.`
          break
        case 'anglesOpposesEgaux':
          gestionNom()
          texte = mathalea2d(paramsEnonce, [p, nommePolygone(p, nom), aABCcodage, aBCDcodage, aCDAcodage, aDABcodage])
          texteCorr = `On sait que $\\widehat{${A.nom + B.nom + C.nom}} = \\widehat{${C.nom + D.nom + A.nom}}$ et $\\widehat{${B.nom + C.nom + D.nom}} = \\widehat{${D.nom + A.nom + B.nom}}$.`
          texteCorr += '<br>Or « Si un quadrilatère a ses angles opposés égaux alors c\'est un parallélogramme ».'
          texteCorr += `<br>Donc $${nom}$ est un parallélogramme.`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
