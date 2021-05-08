import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenuSansNumero, randint, choice, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureAlgebrique, ecritureAlgebriquec, signe, texNombreCoul, sommeDesTermesParSigne, triePositifsNegatifs, lettreDepuisChiffre } from '../../modules/outils.js'

export const titre = 'Additions et soustractions de nombres relatifs'

/**
* Effectuer la somme ou la différence de deux nombres relatifs
*
* * On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* * On peut utiliser des écritures simplifiées (ce qui n'est pas le cas par défaut)
* @Auteur Rémi Angot modifications par Jean-Claude Lhote
* Référence 5R22
*/
export default function ExerciceAdditionsSoustractionRelatifsV2 (max = 20) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max
  this.sup2 = false // écriture simplifiée
  this.titre = titre
  this.consigne = 'Calculer'
  this.spacing = 2
  this.spacingCorr = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestions = 5

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let relatifs
    let sommesSignees
    for (let i = 0, a, b, c, d, e, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      relatifs = []
      sommesSignees = []
      a = -1
      b = choice([-1, 1])
      if (a === -1 & b === -1) { c = 1 } // On s'assure que les 3 premières termes n'ont pas le même signe
      else { c = choice([-1, 1]) }
      a = randint(1, this.sup) * a
      b = randint(1, this.sup) * b
      c = randint(1, this.sup) * c
      d = randint(1, this.sup) * choice([-1, 1])
      e = randint(1, this.sup) * choice([-1, 1])
      const s1 = choice([-1, 1])
      const s2 = choice([-1, 1])
      let s3, s4
      if (s1 == 1 & s2 == 1) { // On s'assure que les 3 premières opérations ne sont pas identiques
        s3 = -1
      } else if (s1 == -1 & s2 == -1) {
        s3 = 1
      } else {
        s3 = choice([-1, 1])
      }
      s4 = choice([-1, 1])
      if (this.sup2) {
        texte = `$ ${lettreDepuisChiffre(i + 1)} = ${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}${ecritureAlgebrique(d)}${ecritureAlgebrique(e)} = \\dotfill $`
        if (!sortieHtml) {
          texte += `<br>$ ${lettreDepuisChiffre(i + 1)} = \\dotfill $`
        }
        relatifs = triePositifsNegatifs([a, b, c, d, e])
        texteCorr = `$ ${lettreDepuisChiffre(i + 1)}\\textbf{=}~${texNombreCoul(a)}${ecritureAlgebriquec(b)}${ecritureAlgebriquec(c)}${ecritureAlgebriquec(d)}${ecritureAlgebriquec(e)}\\\\\\phantom{A }\\textbf{=}~`
        if (sommeDesTermesParSigne([a, b, c, d, e])[0] != 0 && sommeDesTermesParSigne([a, b, c, d, e])[1] != 0) {
          texteCorr += `${texNombreCoul(relatifs[0])}${ecritureAlgebriquec(relatifs[1])}${ecritureAlgebriquec(relatifs[2])}${ecritureAlgebriquec(relatifs[3])}${ecritureAlgebriquec(relatifs[4])}\\\\\\phantom{A }\\textbf{=}~`
          texteCorr += `${texNombreCoul(sommeDesTermesParSigne([a, b, c, d, e])[0])}${ecritureAlgebriquec(sommeDesTermesParSigne([a, b, c, d, e])[1])}\\\\\\phantom{A }\\textbf{=}~`
          texteCorr += `${texNombreCoul(a + b + c + d + e)} $`
        } else if (sommeDesTermesParSigne([a, b, c, d, e])[0] != 0) { texteCorr += `${texNombreCoul(sommeDesTermesParSigne([a, b, c, d, e])[0])}$` } else { texteCorr += `${ecritureAlgebriquec(sommeDesTermesParSigne([a, b, c, d, e])[1])}$` }
      } else {
        texte = `$ ${lettreDepuisChiffre(i + 1)} =  ${ecritureNombreRelatif(a)}${signe(s1)}${ecritureNombreRelatif(b)}${signe(s2)}${ecritureNombreRelatif(c)}${signe(s3)}${ecritureNombreRelatif(d)}${signe(s4)}${ecritureNombreRelatif(e)} = \\dotfill $`
        if (!sortieHtml) {
          texte += `<br>$ ${lettreDepuisChiffre(i + 1)} = \\dotfill $`
        }
        texteCorr = `$ ${lettreDepuisChiffre(i + 1)} =  ${a}${signe(s1)}${ecritureNombreRelatif(b)}${signe(s2)}${ecritureNombreRelatif(c)}${signe(s3)}${ecritureNombreRelatif(d)}${signe(s4)}${ecritureNombreRelatif(e)}$`
        texteCorr += `<br>$ \\phantom{A}= ${ecritureNombreRelatifc(a)}+${ecritureNombreRelatifc(s1 * b)}+${ecritureNombreRelatifc(s2 * c)}+${ecritureNombreRelatifc(s3 * d)}+${ecritureNombreRelatifc(s4 * e)} $`

        relatifs = triePositifsNegatifs([a, s1 * b, s2 * c, s3 * d, s4 * e])

        if (relatifs[0] > 0 & relatifs[4] < 0) {
          texteCorr += `<br>$ \\phantom{A}= ${ecritureNombreRelatifc(relatifs[0])}+${ecritureNombreRelatifc(relatifs[1])}+${ecritureNombreRelatifc(relatifs[2])}+${ecritureNombreRelatifc(relatifs[3])}+${ecritureNombreRelatifc(relatifs[4])} $`
        }
        sommesSignees = sommeDesTermesParSigne([relatifs[0], relatifs[1], relatifs[2], relatifs[3], relatifs[4]])
        if (sommesSignees[0] != 0 && sommesSignees[1] != 0) {
          texteCorr += `<br>$ \\phantom{A}= ${ecritureNombreRelatifc(sommesSignees[0])}+${ecritureNombreRelatifc(sommesSignees[1])} $`
          texteCorr += `<br>$ \\phantom{A}= ${ecritureAlgebriquec(a + s1 * b + s2 * c + s3 * d + s4 * e)} $<br>`
        } else if (sommesSignees[0] != 0) { texteCorr += `<br>$ \\phantom{A}=${ecritureAlgebriquec(sommesSignees[0])}$` } else { texteCorr += `<br>$ \\phantom{A}=${ecritureAlgebriquec(sommesSignees[1])}$<br>` }
      }

      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
  this.besoinFormulaire2CaseACocher = ['Avec des écritures simplifiées']
}
