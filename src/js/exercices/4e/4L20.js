import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { pgcd, randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureParentheseSiNegatif, rienSi1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction, texFractionReduite } from '../../modules/outils/arrayFractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { abs, signe } from '../../modules/outils/nombres.js'
import { fraction } from '../../modules/fractions.js'
import { lampeMessage } from '../../modules/outils/messages.js'
import { nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils/decimales.js'
export const titre = 'Équation du premier degré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
/**
 * Équation du premier degré
 * * Type 1 : x+a=b ou ax=b
 * * Type 2 : ax+b=c
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @author Rémi Angot
 * 4L20 et 3L13
 */
export const uuid = '799c4'
export const ref = '4L20'
export default function ExerciceEquation1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les équations suivantes.'
  this.spacing = 2
  this.interactifType = 'mathLive'
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.correctionDetailleeDisponible = true
  if (!context.isHtml) {
    this.correctionDetaillee = false
  } else {
    this.correctionDetaillee = true
  }
  this.sup = true // Avec des nombres relatifs
  this.sup2 = 4 // Choix du type d'équation
  this.nbQuestions = 6
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    if (this.interactif) {
      this.introduction = lampeMessage({
        titre: 'Calculatrice autorisée.',
        texte: `Résoudre les équations au brouillon et écrire les solutions dans les cases.<br> Pour une solution comme 0,333... seule une fraction (par ex : $${texFraction(1, 3)})$ est correcte`,
        couleur: 'nombres'
      })
    } else this.introduction = ''
    let listeTypeDeQuestions
    switch (this.sup2.toString()) {
      case '1':
        listeTypeDeQuestions = ['ax=b', 'x+b=c']
        break
      case '2':
        listeTypeDeQuestions = ['ax+b=c']
        break
      case '3':
        listeTypeDeQuestions = ['ax+b=cx+d']
        break
      default:
        listeTypeDeQuestions = [
          'ax+b=0',
          'ax+b=c',
          'ax=b',
          'x+b=c',
          'ax+b=cx+d'
        ]
        break
    }
    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions
    )
    for (let i = 0, a, b, c, d, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(2, 13)
      b = randint(1, 13)
      c = randint(1, 13)
      d = randint(1, 13)
      if (this.sup) {
        a *= choice([-1, 1])
        b *= choice([-1, 1])
        c *= choice([-1, 1])
        d *= choice([-1, 1])
      }
      if (listeTypeDeQuestions[i] === 'ax+b=0' ||
        listeTypeDeQuestions[i] === 'ax+b=c') {
        if (listeTypeDeQuestions[i] === 'ax+b=0') {
          c = 0
        }
        do {
          a = randint(2, 13)
        } while (Math.abs(c - b) % a === 0)
        if (this.sup) {
          a *= choice([-1, 1])
        }
        if (!this.sup && c < b) { // Si c-b < 0 et que l'on ne veut pas de relatif, on échange c et b.
          if (c === 0) { // si c=0, on change le signe de b, pour garder c=0
            b *= -1
          } else {
            d = b
            b = c
            c = d
          }
        }
        texte = `$${a}x${ecritureAlgebrique(b)}=${c}$`
        texteCorr = texte + '<br>'
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: '<br>$ x = $ ' })
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${a}x${ecritureAlgebrique(b)}${miseEnEvidence(
          ecritureAlgebrique(-1 * b)
        )}=${c}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$${a}x=${c - b}$<br>`
        if (this.correctionDetaillee) {
          texteCorr += `On divise les deux membres par $${a}$.<br>`
        }
        texteCorr += `$${a}x${miseEnEvidence(
          '\\div' + ecritureParentheseSiNegatif(a)
        )}=${c - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
        texteCorr += `$x=${texFraction(c - b, a)}$`
        if (pgcd(abs(a), abs(c - b)) > 1 || a < 0) {
          texteCorr += `<br>$x=${texFractionReduite(c - b, a)}$`
        }
        texteCorr += `<br> La solution est $${texFractionReduite(
          c - b,
          a
        )}$.`
        reponse = fraction(c - b, a).simplifie()
        if (!context.isAmc) {
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
        } else {
          this.autoCorrection[i] = {
            enonce: `Résoudre ${texte} et donner la solution sous la forme d'une fraction irréductible`,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Numérateur ',
                    valeur: [reponse.s * Math.abs(reponse.n)],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(Math.abs(reponse.n)),
                      decimals: 0,
                      signe: this.sup,
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
                    texte: 'Dénominateur',
                    valeur: [reponse.d],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(reponse.d),
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
      }
      if (listeTypeDeQuestions[i] === 'x+b=c') {
        if (!this.sup && c < b) {
          b = randint(-9, 9, [0]) // b peut être négatif, ça sera une équation du type x-b=c
          c = abs(randint(b, 15)) // c sera plus grand que b pour que c-b>0
        }
        texte = `$x${ecritureAlgebrique(b)}=${c}$`
        texteCorr = texte + '<br>'
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: '<br>$ x = $ ' })
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$x${ecritureAlgebrique(b)}${miseEnEvidence(
          ecritureAlgebrique(-1 * b)
        )}=${c}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$x=${c - b}$`
        texteCorr += `<br> La solution est $${c - b}$.`
        reponse = c - b
        if (!context.isAmc) {
          setReponse(this, i, fraction(c - b, 1), { formatInteractif: 'fractionEgale' })
        } else {
          this.autoCorrection[i] = {
            enonce: `Résoudre ${texte} et coder la solution`,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Solution : ',
                    valeur: [reponse],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(reponse),
                      decimals: 0,
                      signe: this.sup,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
      }
      if (listeTypeDeQuestions[i] === 'ax=b') {
        do {
          a = randint(2, 13)
          b = randint(1, 13)
        } while (b % a === 0)
        if (this.sup) {
          a *= choice([-1, 1])
          b *= choice([-1, 1])
        }
        texte = `$${a}x=${b}$`
        texteCorr = texte + '<br>'
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: '<br>$ x = $ ' })
        if (this.correctionDetaillee) {
          texteCorr += `On divise les deux membres par $${a}$.<br>`
        }
        texteCorr += `$${a}x${miseEnEvidence(
          '\\div' + ecritureParentheseSiNegatif(a)
        )}=${b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
        texteCorr += `$x=${texFraction(b, a)}$`
        if (pgcd(abs(a), abs(b)) > 1 || a < 0) {
          texteCorr += `<br>$x=${texFractionReduite(b, a)}$`
        }
        texteCorr += `<br> La solution est $${texFractionReduite(b, a)}$.`
        reponse = fraction(b, a).simplifie()
        if (!context.isAmc) {
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
        } else {
          this.autoCorrection[i] = {
            enonce: `Résoudre ${texte} et donner la solution sous la forme d'une fraction irréductible`,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Numérateur ',
                    valeur: [reponse.s * Math.abs(reponse.n)],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(Math.abs(reponse.n)),
                      decimals: 0,
                      signe: this.sup,
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
                    texte: 'Dénominateur',
                    valeur: [reponse.d],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(reponse.d),
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
      }
      if (listeTypeDeQuestions[i] === 'ax+b=cx+d') {
        do {
          a = randint(2, 13)
          b = randint(1, 13)
          c = randint(1, 13)
          d = randint(1, 13)

          if (c === a) {
            c = randint(1, 13, [a])
          } // sinon on arrive à une division par 0
          if (!this.sup && a < c) {
            c = randint(1, 9)
            a = randint(c + 1, 15) // a sera plus grand que c pour que a-c>0
          }
          if (!this.sup && d < b) {
            b = randint(1, 9)
            d = randint(b + 1, 15) // d sera plus grand que b pour que d-b>0
          }
        } while ((d - b) % (a - c) === 0)
        texte = `$${rienSi1(a)}x${ecritureAlgebrique(b)}=${rienSi1(
          c
        )}x${ecritureAlgebrique(d)}$`
        texteCorr = texte + '<br>'
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: '<br>$ x = $ ' })
        if (this.correctionDetaillee) {
          if (c > 0) {
            texteCorr += `On soustrait $${rienSi1(
              c
            )}x$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${rienSi1(
              -1 * c
            )}x$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a)}x${ecritureAlgebrique(
          b
        )}${miseEnEvidence(
          signe(-1 * c) + rienSi1(abs(c)) + 'x'
        )}=${c}x${ecritureAlgebrique(d)}${miseEnEvidence(
          signe(-1 * c) + rienSi1(abs(c)) + 'x'
        )}$<br>`
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(
          b
        )}=${d}$<br>`
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(
          b
        )}${miseEnEvidence(
          ecritureAlgebrique(-1 * b)
        )}=${d}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$${rienSi1(a - c)}x=${d - b}$<br>`

        if (this.correctionDetaillee) {
          texteCorr += `On divise les deux membres par $${a - c}$.<br>`
        }
        texteCorr += `$${rienSi1(a - c)}x${miseEnEvidence(
          '\\div' + ecritureParentheseSiNegatif(a - c)
        )}=${d -
        b +
        miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}$<br>`
        texteCorr += `$x=${texFraction(d - b, a - c)}$`
        if (pgcd(abs(d - b), abs(a - c)) > 1 || a - c < 0) {
          texteCorr += `<br>$x=${texFractionReduite(d - b, a - c)}$`
        }
        texteCorr += `<br> La solution est $${texFractionReduite(
          d - b,
          a - c
        )}$.`
        reponse = fraction(d - b, a - c).simplifie()
        if (!context.isAmc) {
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
        } else {
          this.autoCorrection[i] = {
            enonce: `Résoudre ${texte} et donner la solution sous la forme d'une fraction irréductible`,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Numérateur ',
                    valeur: [reponse.s * Math.abs(reponse.n)],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(Math.abs(reponse.n)),
                      decimals: 0,
                      signe: this.sup,
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
                    texte: 'Dénominateur',
                    valeur: [reponse.d],
                    param: {
                      digits: nombreDeChiffresDansLaPartieEntiere(reponse.d),
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // replace(/1x/g,'x')); //remplace 1x par x
        this.listeCorrections.push(texteCorr) // .replace(/1x/g,'x')); //remplace 1x par x
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']
  this.besoinFormulaire2Numerique = [
    "Type d'équations",
    4,
    '1 : ax=b ou x+a=b ou x-a=b\n2 : ax+b=c\n3 : ax+b=cx+d\n4 : Les 2 types précédents'
  ]
}
