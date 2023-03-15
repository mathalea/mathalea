import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import Decimal from 'decimal.js'
import { getDigitFromNumber } from './_ExerciceConversionsLongueurs.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombre, texTexte, deuxColonnesResp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

/**
 * Conversions d'aires en utilisant le préfixe pour déterminer la multiplication ou division à faire.
 *
 * Dans la correction, on montre que l'on multiplie ou divisie à 2 reprises par le coefficient donné par le préfixe
 *
 * * 1 : De dam², hm², km² vers m²
 * * 2 : De dm², cm², mm² vers m²
 * * 3 : Conversions en mètres-carrés
 * * 4 : Conversions avec des multiplications ou des divisions
 * * 5 : Conversions avec des ares, des centiares et des hectares
 * * 6 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 * Référence 6M23
 */
export default function ExerciceConversionsAires (niveau = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = niveau // Niveau de difficulté de l'exercice
  this.sup2 = false // Avec des nombres décimaux ou pas
  this.sup3 = 1 // interactifType Qcm
  this.sup4 = false // tableau
  this.titre = "Conversions d'aires"
  this.consigne = 'Compléter :'
  this.spacing = 2
  this.nbColsCorr = 1
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady

  this.nouvelleVersion = function (numeroExercice) {
    this.interactifType = parseInt(this.sup3) === 2 ? 'mathLive' : 'qcm'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    Decimal.toExpNeg = -15
    let prefixeMulti = [
      [' da', '\\times10\\times10', 100],
      [' h', '\\times100\\times100', 10000],
      [' k', '\\times1~000\\times1~000', 1000000]
    ]
    let prefixeDiv = [
      [' d', '\\div10\\div10', 100],
      [' c', '\\div100\\div100', 10000],
      [' m', '\\div1~000\\div1~000', 1000000]
    ]
    const unite = 'm'
    const listeUnite = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
    const listeDeK = combinaisonListes([0, 1, 2], this.nbQuestions)
    for (let i = 0,
      a,
      k,
      div,
      prefixe,
      resultat,
      resultat2,
      resultat3,
      resultat4,
      resultat5,
      typesDeQuestions,
      texte,
      texteCorr,
      cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (this.sup < 6) {
        typesDeQuestions = this.sup
      } else {
        typesDeQuestions = randint(1, 5)
      }
      // k = randint(0,2); // Choix du préfixe
      k = listeDeK[i]
      if (typesDeQuestions === 1) {
        // niveau 1
        div = false // Il n'y aura pas de division
      } else if (typesDeQuestions === 2) {
        // niveau 2
        div = true // Avec des divisions
      } else if (typesDeQuestions === 3) {
        div = choice([true, false]) // Avec des multiplications ou des divisions
      } else if (typesDeQuestions === 4) {
        div = choice([true, false]) // Avec des multiplications ou des divisions sans toujours revenir au m^2
      }

      if (this.sup2) {
        // Si la case pour les nombres décimaux est cochée
        a = choice([new Decimal(randint(1, 9)).div(10).plus(randint(1, 99)),
          new Decimal(randint(1, 9)).div(10),
          new Decimal(randint(1, 9)).div(100),
          new Decimal(randint(1, 9) + randint(1, 9) * 10 + randint(1, 9) * 1000).div(100)
        ])
        // XX,X 0,X 0,0X X,XX
      } else {
        a = choice([
          randint(1, 9),
          randint(1, 9) * 10,
          randint(1, 9) * 100,
          randint(1, 9) * 10 + randint(1, 9)
        ])
        a = new Decimal(a)
        // X, X0, X00, XX
      }

      if (!div && typesDeQuestions < 4) {
        // Si il faut multiplier pour convertir
        prefixeMulti = [
          [' da', '\\times10\\times10', 100],
          [' h', '\\times100\\times100', 10000],
          [' k', '\\times1~000\\times1~000', 1000000]
        ] // On réinitialise cette liste qui a pu être modifiée dans le cas des ares
        resultat = a.mul(prefixeMulti[k][2]) // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        resultat2 = resultat.div(10)
        resultat3 = resultat.mul(10)
        resultat4 = resultat.mul(100)
        resultat5 = resultat.div(100)
        texte =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^2' +
          ' = \\dotfills ' +
          texTexte(unite) +
          '^2' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^2' +
          ' =  ' +
          texNombre(a, 2) +
          prefixeMulti[k][1] +
          texTexte(unite) +
          '^2' +
          ' = ' +
          texNombre(resultat, 0) +
          texTexte(unite) +
          '^2' +
          '$'
        prefixe = prefixeMulti[k][2]
        texteCorr += '<br>' + buildTab(a, prefixeMulti[k][0] + 'm', resultat, unite)
      } else if (div && typesDeQuestions < 4) {
        prefixeDiv = [
          [' d', '\\div10\\div10', 100],
          [' c', '\\div100\\div100', 10000],
          [' m', '\\div1~000\\div1~000', 1000000]
        ]
        k = randint(0, 1) // Pas de conversions de mm^2 en m^2 avec des nombres décimaux car résultat inférieur à 10e-8
        resultat = a.div(prefixeDiv[k][2]) // Attention aux notations scientifiques pour 10e-8
        resultat2 = resultat.div(10)
        resultat3 = resultat.mul(10)
        resultat4 = resultat.mul(100)
        resultat5 = resultat.div(100)
        texte =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^2' +
          ' = \\dotfills ' +
          texTexte(unite) +
          '^2' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^2' +
          ' =  ' +
          texNombre(a, 2) +
          prefixeDiv[k][1] +
          texTexte(unite) +
          '^2' +
          ' = ' +
          texNombre(resultat, 10) +
          texTexte(unite) +
          '^2' +
          '$'
        prefixe = prefixeDiv[k][2]
        texteCorr += '<br>' + buildTab(a, prefixeDiv[k][0] + 'm', resultat, unite)
      } else if (typesDeQuestions === 4) {
        const unite1 = randint(0, 3)
        let ecart = randint(1, 2) // nombre de multiplication par 10 pour passer de l'un à l'autre
        if (ecart > 4 - unite1) {
          ecart = 4 - unite1
        }
        const unite2 = unite1 + ecart
        if (randint(0, 1) > 0) {
          resultat = a.mul(Math.pow(10, 2 * ecart))
          resultat2 = resultat.div(10)
          resultat3 = resultat.mul(10)
          resultat4 = resultat.mul(100)
          resultat5 = resultat.div(100)
          texte =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            ' = \\dotfills ' +
            texTexte(listeUnite[unite1]) +
            '^2' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            ' =  ' +
            texNombre(a, 2) +
            '\\times' +
            texNombre(Math.pow(10, 2 * ecart)) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            ' = ' +
            texNombre(resultat, 0) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            '$'
          prefixe = Math.pow(10, 2 * ecart)
          texteCorr += '<br>' + buildTab(a, listeUnite[unite2], resultat, listeUnite[unite1])
        } else {
          resultat = a.div(Math.pow(10, 2 * ecart))
          resultat2 = resultat.div(10)
          resultat3 = resultat.div(100)
          resultat4 = resultat.mul(10)
          resultat5 = resultat.mul(100)
          texte =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            ' = \\dotfills ' +
            texTexte(listeUnite[unite2]) +
            '^2' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            ' =  ' +
            texNombre(a, 2) +
            '\\div' +
            texNombre(Math.pow(10, 2 * ecart)) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            ' = ' +
            texNombre(resultat, 10) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            '$'
          prefixe = Math.pow(10, 2 * ecart)
          texteCorr += '<br>' + buildTab(a, listeUnite[unite1], resultat, listeUnite[unite2])
        }
      } else if (typesDeQuestions === 5) {
        // Pour typesDeQuestions==5
        prefixeMulti = [
          ['ha', '\\times100\\times100', 10000],
          ['a', '\\times10\\times10', 100]
        ]
        k = randint(0, 1)
        resultat = a.mul(prefixeMulti[k][2]) // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        resultat2 = resultat.div(10)
        resultat3 = resultat.mul(10)
        resultat4 = resultat.mul(100)
        resultat5 = resultat.div(100)
        texte =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0]) +
          ' = \\dotfills ' +
          texTexte(unite) +
          '^2' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0]) +
          ' =  ' +
          texNombre(a, 2) +
          prefixeMulti[k][1] +
          texTexte(unite) +
          '^2' +
          ' = ' +
          texNombre(resultat, 10) +
          texTexte(unite) +
          '^2' +
          '$'
        prefixe = prefixeMulti[k][2]
        texteCorr += '<br>' + buildTab(a, prefixeMulti[k][0], resultat, unite)
      }
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [{
        texte: `$${texNombre(resultat, 10)}$`,
        statut: true
      },
      {
        texte: `$${texNombre(resultat2, 10)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat3, 10)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat4, 10)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat5, 10)}$`,
        statut: false
      }
      ]
      if (this.interactif && this.interactifType === 'qcm') {
        texte += propositionsQcm(this, i).texte
      } else {
        texte += ajouteChampTexteMathLive(this, i)
        setReponse(this, i, parseFloat(resultat))
      }

      if (this.questionJamaisPosee(i, a, prefixe, div)) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.vue === 'diap') {
          texte = texte.replace('= \\dotfills', '\\text{ en }')
        }
        if (context.isHtml) {
          texte = texte.replace(
            '\\dotfills',
            '................................................'
          )
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    if (context.vue === 'latex') this.listePackages = ['arydshln'] // pour les lignes en pointillés
    listeQuestionsToContenu(this)

    if (context.vue === 'latex' && this.sup4) {
      this.contenu += '\n\n' + buildTab(0, '', 0, '', Math.min(10, this.nbQuestions), true)
    } else if (context.vue !== 'diap' && context.isHtml && this.sup4) {
      const options = { eleId: numeroExercice, widthmincol1: '300px', widthmincol2: '200px' }
      this.contenu = deuxColonnesResp(this.contenu, buildTab(0, '', 0, '', Math.min(10, this.nbQuestions), true), options)
    }
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    6,
    "1 : Conversions en m² avec des multiplications\n2 : Conversions en m² avec des divisions\n3 : Conversions en m² avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions\n5 : Conversions d'hectares et ares en m² \n6 : Mélange"
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
  if (context.isHtml && !(context.vue === 'diap')) this.besoinFormulaire3Numerique = ['Exercice interactif', 2, '1 : QCM\n2 : Numérique'] // Texte, tooltip
  this.besoinFormulaire4CaseACocher = ['Avec tableau']
}

function buildTab (a, uniteA, r, uniteR, ligne = 2, force = false) {
  const tabRep = function (nbre, uniteNbre) {
    const res = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    switch (uniteNbre.replaceAll(' ', '')) {
      case 'km':
        for (let i = 0; i <= 21; i++) {
          res[i] = (5 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 5 - i)) + (5 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
      case 'hm':
      case 'ha':
        for (let i = 0; i <= 21; i++) {
          res[i] = (7 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 7 - i)) + (7 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
      case 'dam':
      case 'a':
        for (let i = 0; i <= 21; i++) {
          res[i] = (9 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 9 - i)) + (9 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
      case 'm':
        for (let i = 0; i <= 21; i++) {
          res[i] = (11 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 11 - i)) + (11 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
      case 'dm':
        for (let i = 0; i <= 21; i++) {
          res[i] = (13 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 13 - i)) + (13 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
      case 'cm':
        for (let i = 0; i <= 21; i++) {
          res[i] = (15 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 15 - i)) + (15 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
      case 'mm':
        for (let i = 0; i <= 21; i++) {
          res[i] = (17 - i === 0 ? '\\color{red}{' : '') + getDigitFromNumber(nbre, Decimal.pow(10, 17 - i)) + (17 - i === 0 ? (new Decimal(nbre).decimalPlaces() === 0 ? '}' : ',}') : '')
        }
        break
    }
    return res
  }
  const createTab = function (aT, rT, first, end) {
    let texte = '$\\def\\arraystretch{1.5}\\begin{array}{'
    for (let i = first; i <= end; i++) {
      const col = (context.vue === 'latex' ? '>{\\centering\\arraybackslash}m{0.45cm}' : 'c')
      if (i % 2 === 0) { texte += `|${col}` + (i === end ? ':}' : '') } else { texte += `:${col}` + (i === end ? '|}' : '') }
    }
    const headers = ['\\hspace*{0.4cm}', '\\hspace*{0.4cm}', '\\hspace*{0.4cm}', '\\hspace*{0.4cm}', '\\hspace*{0.4cm}', 'km^2', '\\hspace*{0.4cm}', 'hm^2', '\\hspace*{0.4cm}', 'dam^2', '\\hspace*{0.4cm}', 'm^2', '\\hspace*{0.6cm}', 'dm^2', '\\hspace*{0.4cm}', 'cm^2', '\\hspace*{0.4cm}', 'mm^2', '\\hspace*{0.4cm}', '\\hspace*{0.4cm}', '\\hspace*{0.4cm}', '\\hspace*{0.4cm}']
    texte += '\\hline '
    for (let i = first; i <= end; i++) {
      if (context.vue === 'latex') {
        if (i % 2 === 0 && i === first) texte += `\\multicolumn{2}{|c|}{${headers[i + 1]}} & `
        if (i % 2 === 0 && i > first && i + 1 < end) texte += `\\multicolumn{2}{c|}{${headers[i + 1]}} & `
        if (i % 2 === 0 && i + 1 === end) texte += `\\multicolumn{2}{c|}{${headers[i + 1]}} \\\\`
      } else {
        texte += `${headers[i]} ${i < end ? ' &' : ' \\\\'}`
      }
    }
    texte += '\\hline '
    for (let i = first; i <= end; i++) {
      texte += `${aT[i]} ${i < end ? ' &' : ' \\\\'}`
    }
    texte += '\\hline '
    for (let i = first; i <= end; i++) {
      texte += `${rT[i]} ${i < end ? ' &' : ' \\\\'}`
    }
    for (let k = 3; k <= ligne; k++) {
      texte += '\\hline '
      for (let i = first; i <= end; i++) {
        texte += `${i < end ? ' &' : ' \\\\'}`
      }
    }
    texte += '\\hline \\end{array}$'
    return texte
  }
  const aTab = tabRep(a, uniteA)
  const rTab = tabRep(r, uniteR)
  const minTab1 = aTab[0] !== '' || aTab[1] !== '' ? 0 : aTab[2] !== '' || aTab[3] !== '' || force ? 2 : 4
  const minTab2 = rTab[0] !== '' || rTab[1] !== '' ? 0 : rTab[2] !== '' || rTab[3] !== '' || force ? 2 : 4
  const maxTab1 = aTab[21] !== '' || aTab[20] !== '' ? 21 : aTab[19] !== '' || aTab[18] !== '' || force ? 19 : 17
  const maxTab2 = rTab[21] !== '' || rTab[20] !== '' ? 21 : rTab[19] !== '' || rTab[18] !== '' || force ? 19 : 17
  const texte = createTab(aTab, rTab, Math.min(minTab1, minTab2), Math.max(maxTab1, maxTab2), ligne)
  return texte
}
