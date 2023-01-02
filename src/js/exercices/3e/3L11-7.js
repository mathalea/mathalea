import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero, rienSi1, reduirePolynomeDegre3, choice } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Développer des carrés avec la double distributivité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCHybride'
export const amcReady = true
export const dateDePublication = '12/12/2021'

/**
* Utiliser la double distributivité pour développer (a+b)² ou (a-b)²
*
* @author Rémi Angot (AMC par Eric Elter)
* 3L11-7
*/
export const uuid = '7cf81'
export const ref = '3L11-7'
export default function CarreDoubleDistributivite () {
  Exercice.call(this)
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.sup = true
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions > 1 ? 'Développer et réduire les expressions suivantes.' : 'Développer et réduire l\'expression suivante.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['(ax+b)2', '(b+ax)2', '(ax-b)2', '(b-ax)2']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const lettresPossibles = ['a', 'b', 'c', 'x', 'y', 'z']
    for (let i = 0, texte, texteCorr, reponse, reponse1, reponse2, reponse3, choixLettre, a, b, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(1, 11, 0)
      b = randint(1, 11, 0)
      choixLettre = choice(lettresPossibles)
      switch (listeTypeDeQuestions[i]) {
        case '(ax+b)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}${choixLettre}+${b})^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}${choixLettre}+${b})^2`)}$`
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}${choixLettre}+${b})*(${a}${choixLettre}+${b})`)}$`
          if (this.sup) {
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${rienSi1(a)}${choixLettre} \\times ${rienSi1(a)}${choixLettre} + ${rienSi1(a)}${choixLettre} \\times ${b} + ${b} \\times ${rienSi1(a)}${choixLettre}  + ${b} \\times ${b}$`
          }
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a * a}${choixLettre}^2 + ${a * b}${choixLettre} + ${a * b}${choixLettre} + ${b * b}`)}$`
          reponse1 = a * a
          reponse2 = 2 * a * b
          reponse3 = b * b
          break
        case '(b+ax)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}+${a}${choixLettre})^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}+${a}${choixLettre})^2`)}$`
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}+${a}${choixLettre})*(${b}+${a}${choixLettre})`)}$`
          if (this.sup) {
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${b} \\times ${b} +  ${b} \\times ${rienSi1(a)}${choixLettre} +  ${rienSi1(a)}${choixLettre} \\times ${b}  + ${rienSi1(a)}${choixLettre} \\times ${rienSi1(a)}${choixLettre} $`
          }
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${b * b} + ${a * b}${choixLettre} + ${a * b}${choixLettre} + ${a * a}${choixLettre}^2`)}$`
          reponse1 = a * a
          reponse2 = 2 * a * b
          reponse3 = b * b
          break
        case '(ax-b)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}${choixLettre}-${b})^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}${choixLettre}-${b})^2`)}$`
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}${choixLettre}-${b})*(${a}${choixLettre}-${b})`)}$`
          if (this.sup) {
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${rienSi1(a)}${choixLettre} \\times ${rienSi1(a)}${choixLettre} + ${rienSi1(a)}${choixLettre} \\times (${-b}) + (${-b}) \\times ${rienSi1(a)}${choixLettre}  + (${-b}) \\times (${-b})$`
          }
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a * a}${choixLettre}^2 - ${a * b}${choixLettre} - ${a * b}${choixLettre} + ${b * b}`)}$`
          reponse1 = a * a
          reponse2 = -2 * a * b
          reponse3 = b * b

          break
        case '(b-ax)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}-${a}${choixLettre})^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}-${a}${choixLettre})^2`)}$`
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}-${a}${choixLettre})*(${b}-${a}${choixLettre})`)}$`
          if (this.sup) {
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${b} \\times ${b} +  ${b} \\times (-${rienSi1(a)}${choixLettre}) +  (-${rienSi1(a)}${choixLettre}) \\times ${b}  + (-${rienSi1(a)}${choixLettre}) \\times (-${rienSi1(a)}${choixLettre}) $`
          }
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${b * b} - ${a * b}${choixLettre} - ${a * b}${choixLettre} + ${a * a}${choixLettre}^2`)}$`
          reponse1 = a * a
          reponse2 = -2 * a * b
          reponse3 = b * b
          break
      }
      reponse = reduirePolynomeDegre3(0, reponse1, reponse2, reponse3, choixLettre)
      texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${reponse}$`

      if (!context.isAmc) {
        setReponse(this, i, reponse)
        texte += this.interactif ? (`<br>$${lettreDepuisChiffre(i + 1)} = $` + ajouteChampTexteMathLive(this, i, 'largeur75 inline nospacebefore')) : ''
      } else {
        this.autoCorrection[i] = {
          enonce: '',
          enonceAvant: false,
          options: { multicols: true, barreseparation: true },
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [{
                texte: texteCorr,
                enonce: texte + '<br>',
                statut: 4
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'valeur de $a$ dans $ax^2+bx+c$',
                  valeur: reponse1,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'valeur de $b$ dans $ax^2+bx+c$',
                  valeur: reponse2,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'valeur de $c$ dans $ax^2+bx+c$',
                  valeur: reponse3,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            }
          ]
        }
      }

      if (this.questionJamaisPosee(a, b, listeTypeDeQuestions[i])) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireCaseACocher = ['Écrire toutes les multiplications dans la correction']
}
