import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { listeQuestionsToContenu, combinaisonListes, miseEnEvidence, ecritureParentheseSiNegatif, choice, sp, texNombre, randint } from '../../modules/outils.js'
export const titre = 'Comparer deux images avec une fonction de référence'

/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ComparerAvecFonctionRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  // this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1
  this.sup2 = true
  this.sup2 = 1
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE2', 'typeE3']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE4', 'typeE5']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['typeE6']
    } else if (this.sup === 5) {
      typeDeQuestionsDisponibles = ['typeE7']
    } else if (this.sup === 6) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6', 'typeE7']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      const nomF = [
        ['f'], ['g'], ['h'], ['u'],
        ['v'], ['w']
      ]
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':// fct affine
          {
            const a = new Decimal(randint(11, 99, [20, 30, 40, 50, 60, 70, 80, 90])).div(100) * choice([1, -1])
            const a1 = Math.round(a * 100) / 100
            const b = new Decimal(randint(1, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90])).div(10)
            let x1 = new Decimal(randint(2, 29, [10, 20]) / 10) * choice([1, -1])
            const x2 = new Decimal(randint(2, 29, [10, 20]) / 10) * choice([1, -1])

            const x1B = Math.round(x1 * 10) / 10
            const x2B = Math.round(x2 * 10) / 10
            if (x1B === x2B) { x1 = new Decimal(x1).add(1) }
            const nom = choice(nomF)
            texte = ` Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par : $${nom}(x)=${texNombre(a, 2)}x+${texNombre(b, 1)}$.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 1)})$ et $${nom}(${texNombre(x2, 1)})$. `
            texteCorr = `La fonction $${nom}$ est une fonction de la forme $${nom}(x)=mx+p$ avec 
            `
            if (a1 > 0) {
              texteCorr += `$m=${texNombre(a, 2)} > 0$.<br>
               D'après le cours, $${nom}$ est une fonction affine croissante sur $\\mathbb{R}$.<br>
              On sait que si une fonction est croissante, les antécédents et les images sont rangés dans le même ordre.<br>
              Ainsi, si $a$ et $b$ sont deux réels tels que $a < b$, alors $${nom}(a) < ${nom}(b)$.<br>
              `
              if (x1B < x2B) { texteCorr += `Or $${texNombre(x1, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 1)}$, donc $${nom}(${texNombre(x1, 2)})${sp(1)} ${miseEnEvidence('\\boldsymbol{<}')} ${sp(1)}${nom}(${texNombre(x2, 1)})$.` } else { texteCorr += `Or $${texNombre(x2, 1)}${sp(1)} ${miseEnEvidence('\\boldsymbol{<}')} ${sp(1)}${texNombre(x1, 1)}$, donc $${nom}(${texNombre(x2, 2)})${sp(1)} ${miseEnEvidence('\\boldsymbol{<}')}${sp(1)} ${nom}(${texNombre(x1, 1)})$.` }
            } else {
              texteCorr += `$m=${texNombre(a, 2)} < 0$. <br>
              D'après le cours, $${nom}$ est une fonction affine décroissante sur $\\mathbb{R}$.<br>
              On sait que si une fonction est décroissante, les  antécédents et les images sont rangés dans l'ordre inverse.<br>
              Ainsi, si $a$ et $b$ sont deux réels tels que $a < b$, alors $${nom}(a) > ${nom}(b)$.<br>
              `
              if (x1B < x2B) { texteCorr += `Or $${texNombre(x1, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 1)}$, donc $${nom}(${texNombre(x1, 2)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x2, 1)})$.` } else { texteCorr += `Or $${texNombre(x2, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)} ${texNombre(x1, 1)}$, donc $${nom}(${texNombre(x2, 2)})${sp(1)} ${miseEnEvidence('\\boldsymbol{>}')}${sp(1)} ${nom}(${texNombre(x1, 1)})$.` }
            }
          }
          break

        case 'typeE2':// fct carré avec des nombres positifs
          {
            const x1 = new Decimal(randint(0, 5) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000)
            const x2 = new Decimal(x1).add((2 * randint(1, 9) / 1000) * choice([1, -1]))
            const x1B = Math.round(x1 * 1000) / 1000
            const x2B = Math.round(x2 * 1000) / 1000
            const nom = choice(nomF)
            if (this.sup2 === 1) {
              texte = ` Soit $${nom}$ la fonction carré.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 3)})$ et $${nom}(${texNombre(x2, 3)})$. `
            } else { texte = `Sans effectuer de calcul, comparer $${texNombre(x1, 3)}^2$ et $${texNombre(x2, 3)}^2$.` }

            texteCorr = `            La fonction carré étant strictement croissante sur $[0\\,;\\,+\\infty[$, elle conserve l'ordre. Cela signifie que les antécédents et les images sont rangés dans le même ordre.   <br>
            Ainsi, si $a$ et $b$ sont deux nombres réels positifs tels que $a < b$, alors $a^2 < b^2$.`

            if (x1B < x2B) {
              texteCorr += `<br>Or $${texNombre(x1, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 3)}$, 
          donc  $${texNombre(x1, 3)}^2${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 3)}^2$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x1, 3)})${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${nom}(${texNombre(x2, 3)})$.` } else { texteCorr += '.' }
            } else {
              texteCorr += `<br>Or $${texNombre(x2, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 3)}$, 
          donc $${texNombre(x2, 3)}^2${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 3)}^2$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x2, 3)})${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${nom}(${texNombre(x1, 3)})$.` } else { texteCorr += '.' }
            }
          }
          break

        case 'typeE3':// fct carré avec des nombres négatifs
          {
            const x1 = new Decimal(randint(0, 5) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000).mul(-1)
            const x2 = new Decimal(x1).add((2 * randint(1, 9) / 1000) * choice([1, -1]))
            const x1B = Math.round(x1 * 1000) / 1000
            const x2B = Math.round(x2 * 1000) / 1000
            const nom = choice(nomF)
            if (this.sup2 === 1) {
              texte = ` Soit $${nom}$ la fonction carré.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 3)})$ et $${nom}(${texNombre(x2, 3)})$. `
            } else { texte = `Sans effectuer de calcul, comparer $(${texNombre(x1, 3)})^2$ et $(${texNombre(x2, 3)})^2$.` }

            texteCorr = `            La fonction carré étant strictement décroissante sur $]-\\infty\\,;\\,0]$, elle change l'ordre. Cela signifie que les antécédents et les images sont rangés dans l'ordre inverse.   <br>
            Ainsi, si $a$ et $b$ sont deux nombres réels négatifs tels que $a < b$, alors $a^2 > b^2$.`

            if (x1B < x2B) {
              texteCorr += `<br>Or $${texNombre(x1, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 3)}$, 
          donc  $(${texNombre(x1, 3)})^2${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}(${texNombre(x2, 3)})^2$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x1, 3)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x2, 3)})$.` } else { texteCorr += '.' }
            } else {
              texteCorr += `<br>Or $${texNombre(x2, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 3)}$, 
          donc $(${texNombre(x2, 3)})^2${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}(${texNombre(x1, 3)})^2$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x2, 3)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x1, 3)})$.` } else { texteCorr += '.' }
            }
          }
          break

        case 'typeE4':// fct inverse avec des nombres positifs
          {
            const x1 = new Decimal(randint(1, 9) + randint(5, 9) / 10)
            const x2 = new Decimal(x1).add((randint(1, 9) / 10) * choice([1, -1]))
            const x1B = Math.round(x1 * 10) / 10
            const x2B = Math.round(x2 * 10) / 10

            const nom = choice(nomF)
            if (this.sup2 === 1) {
              texte = ` Soit $${nom}$ la fonction inverse.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 2)})$ et $${nom}(${texNombre(x2, 2)})$. `
            } else { texte = `Sans effectuer de calcul, comparer $\\dfrac{1}{${texNombre(x1, 2)}}$ et $\\dfrac{1}{${texNombre(x2, 2)}}$.` }

            texteCorr = `            La fonction inverse étant strictement décroissante sur $]0\\,;\\,+\\infty[$, elle change l'ordre. Cela signifie que les antécédents et les images sont rangés dans l'ordre inverse.   <br>
            Ainsi, si $a$ et $b$ sont deux nombres réels stritement positifs tels que $a < b$, alors $\\dfrac{1}{a} > \\dfrac{1}{b}$.`

            if (x1B < x2B) {
              texteCorr += `<br>Or $${texNombre(x1, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 1)}$, 
          donc  $\\dfrac{1}{${texNombre(x1, 1)}}${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}\\dfrac{1}{${texNombre(x2, 1)}}$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x1, 1)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x2, 1)})$.` } else { texteCorr += '.' }
            } else {
              texteCorr += `<br>Or $${texNombre(x2, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 3)}$, 
          donc $\\dfrac{1}{${texNombre(x2, 1)}}${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}\\dfrac{1}{${texNombre(x1, 1)}}$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x2, 1)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x1, 1)})$.` } else { texteCorr += '.' }
            }
          }
          break

        case 'typeE5':// fct inverse avec des nombres négatifs
          {
            const x1 = new Decimal(randint(1, 9) + randint(5, 9) / 10).mul(-1)
            const x2 = new Decimal(x1).add((randint(1, 9) / 10) * choice([1, -1]))
            const x1B = Math.round(x1 * 10) / 10
            const x2B = Math.round(x2 * 10) / 10

            const nom = choice(nomF)
            if (this.sup2 === 1) {
              texte = ` Soit $${nom}$ la fonction inverse.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 2)})$ et $${nom}(${texNombre(x2, 2)})$. `
            } else { texte = `Sans effectuer de calcul, comparer $\\dfrac{1}{${texNombre(x1, 2)}}$ et $\\dfrac{1}{${texNombre(x2, 2)}}$.` }

            texteCorr = `            La fonction inverse étant strictement décroissante sur $]-\\infty\\,;\\,0[$, elle change l'ordre. Cela signifie que les antécédents et les images sont rangés dans l'ordre inverse.   <br>
            Ainsi, si $a$ et $b$ sont deux nombres réels stritement négatifs tels que $a < b$, alors $\\dfrac{1}{a} > \\dfrac{1}{b}$.`

            if (x1B < x2B) {
              texteCorr += `<br>Or $${texNombre(x1, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 3)}$, 
          donc  $\\dfrac{1}{${texNombre(x1, 1)}}${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}\\dfrac{1}{${texNombre(x2, 1)}}$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x1, 1)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x2, 1)})$.` } else { texteCorr += '.' }
            } else {
              texteCorr += `<br>Or $${texNombre(x2, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 3)}$, 
          donc $\\dfrac{1}{${texNombre(x2, 1)}}${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}\\dfrac{1}{${texNombre(x1, 1)}}$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x2, 1)})${sp(1)}${miseEnEvidence('\\boldsymbol{>}')}${sp(1)}${nom}(${texNombre(x1, 1)})$.` } else { texteCorr += '.' }
            }
          }
          break

        case 'typeE6':// fct racine carrée
          {
            let x1 = new Decimal(randint(0, 10) + (randint(6, 9) / 10))
            const x2 = new Decimal(x1).add((randint(1, 5, 0) / 10) * choice([1, -1]))
            const x1B = Math.round(x1 * 10) / 10
            const x2B = Math.round(x2 * 10) / 10
            if (x1B === 1) { x1 = new Decimal(randint(0, 10) + (randint(6, 9) / 10)) }
            const nom = choice(nomF)
            if (this.sup2 === 1) {
              texte = ` Soit $${nom}$ la fonction racine carrée.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 1)})$ et $${nom}(${texNombre(x2, 1)})$. `
            } else { texte = `Sans effectuer de calcul, comparer $\\sqrt{${texNombre(x1, 1)}}$ et $\\sqrt{${texNombre(x2, 1)}}$.` }

            texteCorr = `            La fonction racine carrée étant strictement croissante sur $[0\\,;\\,+\\infty[$, elle conserve l'ordre. Cela signifie que les antécédents et les images sont rangés dans le même ordre.   <br>
            Ainsi, si $a$ et $b$ sont deux nombres réels positifs tels que $a < b$, alors $\\sqrt{a} < \\sqrt{b}$.`

            if (x1B < x2B) {
              texteCorr += `<br>Or $${texNombre(x1, 3)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 3)}$, 
          donc  $\\sqrt{${texNombre(x1, 1)}}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}\\sqrt{${sp(1)}${texNombre(x2, 1)}}$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x1, 1)})${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${nom}(${texNombre(x2, 1)})$.` } else { texteCorr += '.' }
            } else {
              texteCorr += `<br>Or $${texNombre(x2, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 1)}$, 
          donc $\\sqrt{${texNombre(x2, 3)}}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}\\sqrt{${texNombre(x1, 3)}}$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x2, 1)})${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${nom}(${texNombre(x1, 1)})$.` } else { texteCorr += '.' }
            }
          }
          break
        case 'typeE7':// fct cube
          {
            const x1 = new Decimal(randint(-10, 10) + (randint(-9, 9, 0) / 10) * choice([-1, 1]))
            const x2 = new Decimal(x1).add((randint(1, 9) / 10) * choice([1, -1]))
            const x1B = Math.round(x1 * 10) / 10
            const x2B = Math.round(x2 * 10) / 10
            const nom = choice(nomF)
            if (this.sup2 === 1) {
              texte = ` Soit $${nom}$ la fonction cube.<br>
            Sans effectuer de calcul, comparer $${nom}(${texNombre(x1, 1)})$ et $${nom}(${texNombre(x2, 1)})$. `
            } else { texte = `Sans effectuer de calcul, comparer $${ecritureParentheseSiNegatif(x1, 1)}^3$ et $${ecritureParentheseSiNegatif(x2, 1)}^3$.` }

            texteCorr = `            La fonction cube étant strictement croissante sur $\\mathbb{R}$, elle conserve l'ordre. Cela signifie que les antécédents et les images sont rangés dans le même ordre.   <br>
            Ainsi, si $a$ et $b$ sont deux nombres réels tels que $a < b$, alors $a^3 < b^3$.`

            if (x1B < x2B) {
              texteCorr += `<br>Or $${texNombre(x1, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x2, 1)}$, 
          donc  $${ecritureParentheseSiNegatif(x1, 1)}^3${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${ecritureParentheseSiNegatif(x2, 1)}^3$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x1, 3)})${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${nom}(${texNombre(x2, 3)})$.` } else { texteCorr += '.' }
            } else {
              texteCorr += `<br>Or $${texNombre(x2, 1)}${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${texNombre(x1, 1)}$, 
          donc $${ecritureParentheseSiNegatif(x2, 1)}^3${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${ecritureParentheseSiNegatif(x1, 1)}^3$`
              if (this.sup2 === 1) { texteCorr += `, soit $${nom}(${texNombre(x2, 3)})${sp(1)}${miseEnEvidence('\\boldsymbol{<}')}${sp(1)}${nom}(${texNombre(x1, 3)})$.` } else { texteCorr += '.' }
            }
          }
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
  this.besoinFormulaireNumerique = ['Choix des questions', 6, '1 : Avec une fonction affine\n2 : Avec la fonction carré\n3 : Avec la fonction inverse\n4 : Avec la fonction racine carrée\n5 : Avec la fonction cube\n6 : Mélange']
  this.besoinFormulaire2Numerique = ['Choix des énoncés', 2, '1 : Avec la fonction précisée\n2 : Sans la fonction précisée']
}
