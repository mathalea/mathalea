import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, shuffle, combinaisonListesSansChangerOrdre, texNombre, texteGras, warnMessage } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Calcul mental et calcul littéral'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * * Calcul mental autour des identités remarquables
 * * numéro de l'exo ex : 3L11-5
 * * publié le  14/11/2020
 * * décliné en 2N40-6 => 07/10/2021
 * * décliné en can2C04 => 08/10/2021
 * * décliné en can2C05 => 10/10/2021
 * @author Sébastien Lozano
 */
export const uuid = 'edbd5'
export const ref = '3L11-5'
export default function IdentitesCalculs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false // pour avoir la correction et l'enoncé en même temps
  this.can = false // pour décliner en version CAN
  this.canVersion = '' // Pour distinguer les déclinaisons
  // 'v1' Pour une version simple type 29² 31² ou 29x31, seulement 1 d'écart par rapport à la dizaine ou à la centaine
  // 'v2' Pour une version type (30-2)² (30+2)² ou (30-2)x(30+2), écart par rapport à la dizaine ou à la centaine de 1 à 4
  this.sup = 1
  if (this.debug) {
    this.nbQuestions = 3
  } else {
    this.nbQuestions = 3
  };

  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Faire les calculs suivants sans calculatrice. Utiliser la double distributivité ou les identités remarquables.'

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 1 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 1 : this.spacingCorr = 1
  this.tailleDiaporama = 3

  this.listePackages = 'bclogo'

  let typesDeQuestionsDisponibles
  this.nouvelleVersion = function () {
    // une fonction pour gérer un \hfill dans la sortie LaTeX
    function myhfill () {
      if (context.isHtml) {
        return '<br><br>'
      } else {
        return '\\hfill'
      }
    };
    switch (Number(this.sup)) {
      case 1:
        typesDeQuestionsDisponibles = [0, 0, 0] // shuffle([choice([1,3]),choice([2,3]),0]);
        this.introduction = warnMessage('$(a+b)^2=a^2+2ab+b^2$', 'nombres', 'Coup de pouce')
        break
      case 2:
        typesDeQuestionsDisponibles = [1, 1, 1] // shuffle([choice([1,3]),choice([2,3]),0]);
        this.introduction = warnMessage('$(a-b)^2 = a^2-2ab+b^2$', 'nombres', 'Coup de pouce')
        break
      case 3:
        typesDeQuestionsDisponibles = [2, 2, 2] // shuffle([choice([1,3]),choice([2,3]),0]);
        this.introduction = warnMessage('$(a+b)(a-b)=a^2-b^2$', 'nombres', 'Coup de pouce')
        break
      case 4:
        typesDeQuestionsDisponibles = shuffle([0, 1, 2]) // shuffle([choice([1,3]),choice([2,3]),0]);
        this.introduction = warnMessage(`$(a+b)^2 = a^2 +2ab + b^2$ ${myhfill()} $(a-b)^2 = a^2-2ab+b^2$ ${myhfill()} $(a+b)(a-b)=a^2-b^2$`, 'nombres', 'Coup de pouce')
        break
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci-dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour gérer l'affichage sous forme de carré
      // a et b  sont les facteurs du produit, s'ils sont égaux on affiche sous forme de carré
      function ifIsCarreAfficheCarre (a, b, canV2 = false) {
        if (!canV2) {
          if (a === b) {
            return `${a}^2`
          } else {
            return `${a}\\times ${b}`
          }
        } else {
          if (a === b) {
            return `(${a})^2`
          } else {
            return `(${a})\\times (${b})`
          }
        }
      }

      // une fonction pour afficher le double terme rectangle ou pas
      function ifIsCarreAfficheDblProd (bool, dblTermeRect) {
        if (bool) {
          return dblTermeRect
        } else {
          return ''
        }
      };

      const a = randint(2, 9)
      let bSomme, bDifference, bSomDif
      if (!this.can) {
        bSomme = randint(1, 4)
        bDifference = randint(1, 4)
        bSomDif = randint(1, 9)
      } else {
        switch (this.canVersion) {
          case 'v1' :
            bSomme = 1
            bDifference = 1
            bSomDif = 1
            break
          case 'v2' :
            bSomme = randint(1, 4)
            bDifference = randint(1, 4)
            bSomDif = randint(1, 9)
            break
        }
      }
      const coeff = choice([10, 100])
      const coeffSomDif = 100
      const signesSomDif = choice([[{ str: '-', nb: -1 }, { str: '+', nb: 1 }], [{ str: '+', nb: 1 }, { str: '-', nb: -1 }]])
      const lettres = choice(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        {
          lettre: lettres,
          a,
          b: bSomme,
          coeff,
          a_coeff: a * coeff,
          operations: [{ str: '+', nb: 1 }, { str: '+', nb: 1 }],
          facteurs: [{ str: `${texNombre(a * coeff)}+${bSomme}`, nb: texNombre(a * coeff + bSomme) }, { str: `${texNombre(a * coeff)}+${bSomme}`, nb: texNombre(a * coeff + bSomme) }],
          carre_de_a_coeff: texNombre(coeff * coeff * a * a),
          // carre_de_coeff:coeff*coeff,
          carre_de_b: texNombre(bSomme * bSomme),
          termes_rectangles: [texNombre(coeff * a * bSomme), texNombre(coeff * a * bSomme)],
          somme_terme_rect: texNombre(2 * coeff * a * bSomme),
          signes_dbl_dist: ['+', '+', '+'],
          carre: true,
          resultat: texNombre(a * a * coeff * coeff + bSomme * bSomme + 2 * a * coeff * bSomme),
          resultatNumerique: a * a * coeff * coeff + bSomme * bSomme + 2 * a * coeff * bSomme
        },
        {
          lettre: lettres,
          a,
          b: bDifference,
          coeff,
          a_coeff: a * coeff,
          operations: [{ str: '-', nb: -1 }, { str: '-', nb: -1 }],
          facteurs: [{ str: `${texNombre(a * coeff)}-${bDifference}`, nb: texNombre(a * coeff - bDifference) }, { str: `${texNombre(a * coeff)}-${bDifference}`, nb: texNombre(a * coeff - bDifference) }],
          carre_de_a_coeff: texNombre(coeff * coeff * a * a),
          // carre_de_coeff:coeff*coeff,
          carre_de_b: texNombre(bDifference * bDifference),
          termes_rectangles: [texNombre(coeff * a * bDifference), texNombre(coeff * a * bDifference)],
          somme_terme_rect: texNombre(2 * coeff * a * bDifference),
          signes_dbl_dist: ['+', '-', '-'],
          carre: true,
          resultat: texNombre(a * a * coeff * coeff + bDifference * bDifference - 2 * a * coeff * bDifference),
          resultatNumerique: a * a * coeff * coeff + bDifference * bDifference - 2 * a * coeff * bDifference
        },
        {
          lettre: lettres,
          a,
          b: bSomDif,
          coeff: coeffSomDif,
          a_coeff: a * coeffSomDif,
          operations: signesSomDif,
          facteurs: [{ str: `${texNombre(a * coeffSomDif)} ${signesSomDif[0].str} ${bSomDif}`, nb: texNombre(a * coeffSomDif + signesSomDif[0].nb * bSomDif) }, { str: `${texNombre(a * coeffSomDif)} ${signesSomDif[1].str} ${bSomDif}`, nb: texNombre(a * coeffSomDif + signesSomDif[1].nb * bSomDif) }],
          carre_de_a_coeff: texNombre(coeffSomDif * coeffSomDif * a * a),
          // carre_de_coeff:coeff*coeff,
          carre_de_b: texNombre(bSomDif * bSomDif),
          termes_rectangles: [texNombre(coeffSomDif * a * bSomDif), texNombre(coeffSomDif * a * bSomDif)],
          somme_terme_rect: 0,
          signes_dbl_dist: ['-', '+', '-'],
          carre: false,
          resultat: texNombre(a * a * coeffSomDif * coeffSomDif - bSomDif * bSomDif),
          resultatNumerique: a * a * coeffSomDif * coeffSomDif - bSomDif * bSomDif
        }
      ]

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
                     $${situations[k].lettre}=${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$
                    `,
          question: '',
          correction1: `
                        ${texteGras('Avec la double distributivité')}<br>
                        $${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
                        $${situations[k].lettre} = (${situations[k].facteurs[0].str})\\times (${situations[k].facteurs[1].str})$<br>
                        $${situations[k].lettre} = ${situations[k].a_coeff}^2 ${situations[k].signes_dbl_dist[1]} ${situations[k].a_coeff}\\times ${situations[k].b} ${situations[k].signes_dbl_dist[2]} ${situations[k].b}\\times ${situations[k].a_coeff} ${situations[k].signes_dbl_dist[0]} ${situations[k].b}^2$<br>
                        $${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${situations[k].signes_dbl_dist[1]} ${situations[k].termes_rectangles[0]} ${situations[k].signes_dbl_dist[2]} ${situations[k].termes_rectangles[1]}   ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
                        $${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} ${situations[k].somme_terme_rect}`)} ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
                        $${situations[k].lettre} = ${situations[k].resultat}$
                    `,
          correction2: k !== situations.length - 1
            ? ` ${texteGras('Avec une identité')}<br>
                $${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
                $${situations[k].lettre} = ${ifIsCarreAfficheCarre(`(${situations[k].facteurs[0].str})`, `(${situations[k].facteurs[1].str})`)} $<br>
                $${situations[k].lettre} = ${situations[k].a_coeff}^2 ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].a_coeff} \\times ${situations[k].b}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].b}^2$<br>
                $${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].termes_rectangles[0]}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].carre_de_b}$<br>
                $${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} ${situations[k].somme_terme_rect}`)} ${situations[k].signes_dbl_dist[0]} ${situations[k].carre_de_b}$<br>
                $${situations[k].lettre} = ${situations[k].resultat}$`
            : ` ${texteGras('Avec une identité')}<br>
                $${situations[k].lettre} = ${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}$<br>
                $${situations[k].lettre} = ${ifIsCarreAfficheCarre(`(${situations[k].facteurs[0].str})`, `(${situations[k].facteurs[1].str})`)} $<br>
                $${situations[k].lettre} = ${situations[k].a_coeff}^2 ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].a_coeff} \\times ${situations[k].b}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].b}^2$<br>
                $${situations[k].lettre} = ${situations[k].carre_de_a_coeff} ${ifIsCarreAfficheDblProd(situations[k].carre, `${situations[k].signes_dbl_dist[1]} 2\\times ${situations[k].termes_rectangles[0]}`)} ${situations[k].signes_dbl_dist[0]}  ${situations[k].carre_de_b}$<br>                            
                $${situations[k].lettre} = ${situations[k].resultat}$`,
          enonceCanV1: `$${ifIsCarreAfficheCarre(situations[k].facteurs[0].nb, situations[k].facteurs[1].nb)}=$`,
          enonceCanV2: `$${ifIsCarreAfficheCarre(situations[k].facteurs[0].str, situations[k].facteurs[1].str, true)}=$`,
          resultatCan: `${situations[k].resultatNumerique}`

        })
      };

      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0: // carré d'une somme
          if (!this.can) {
            texte = `${enonces[0].enonce}`
            if (this.debug) {
              texte += '<br>'
              texte += `<br> =====CORRECTION======<br>${enonces[0].correction1}<br>${enonces[0].correction2}`
              texteCorr = ''
            } else {
              if (context.isHtml) {
                texteCorr = `${enonces[0].correction1}<br><br>${enonces[0].correction2}`
              } else {
                texteCorr = 'Détaillons deux méthodes : <br><br>'
                texteCorr += '\\begin{minipage}{8cm}'
                texteCorr += enonces[0].correction1
                texteCorr += '\\end{minipage}'
                texteCorr += '\\hfill \\vrule \\hfill'
                texteCorr += '\\begin{minipage}{8cm}'
                texteCorr += enonces[0].correction2
                texteCorr += '\\end{minipage}'
                texteCorr += '<br>'
              };
            };
            setReponse(this, i, situations[0].resultatNumerique)
          } else {
            switch (this.canVersion) {
              case 'v1' :
                this.question = `${enonces[0].enonceCanV1}`
                this.correction = `${enonces[0].correction1} <br><br> ${enonces[0].correction2}`
                this.reponse = `${enonces[0].resultatCan}`
                break
              case 'v2' :
                this.question = `${enonces[0].enonceCanV2}`
                this.correction = `${enonces[0].correction1} <br><br> ${enonces[0].correction2}`
                this.reponse = `${enonces[0].resultatCan}`
                break
            }
            this.canEnonce = this.question
            this.canReponseACompleter = ''
          }
          break
        case 1: // carré d'une différence
          if (!this.can) {
            texte = `${enonces[1].enonce}`
            if (this.debug) {
              texte += '<br>'
              texte += `<br> =====CORRECTION======<br>${enonces[1].correction1}<br>${enonces[1].correction2}`
              texteCorr = ''
            } else {
              if (context.isHtml) {
                texteCorr = `${enonces[1].correction1}<br><br>${enonces[1].correction2}`
              } else {
                texteCorr = 'Détaillons deux méthodes : <br><br>'
                texteCorr += '\\begin{minipage}{8cm}'
                texteCorr += enonces[1].correction1
                texteCorr += '\\end{minipage}'
                texteCorr += '\\hfill \\vrule \\hfill'
                texteCorr += '\\begin{minipage}{8cm}'
                texteCorr += enonces[1].correction2
                texteCorr += '\\end{minipage}'
                texteCorr += '<br>'
              };
            };
            setReponse(this, i, situations[1].resultatNumerique)
          } else {
            switch (this.canVersion) {
              case 'v1' :
                this.question = `${enonces[1].enonceCanV1}`
                this.correction = `${enonces[1].correction1} <br><br> ${enonces[1].correction2}`
                this.reponse = `${enonces[1].resultatCan}`
                break
              case 'v2' :
                this.question = `${enonces[1].enonceCanV2}`
                this.correction = `${enonces[1].correction1} <br><br> ${enonces[1].correction2}`
                this.reponse = `${enonces[1].resultatCan}`
                break
            }
            this.canEnonce = this.question
            this.canReponseACompleter = ''
          }
          break
        case 2: // Produit somme différence
          if (!this.can) {
            texte = `${enonces[2].enonce}`
            if (this.debug) {
              texte += '<br>'
              texte += `<br> =====CORRECTION======<br>${enonces[2].correction1}<br>${enonces[2].correction2}`
              texteCorr = ''
            } else {
              if (context.isHtml) {
                texteCorr = `${enonces[2].correction1}<br><br>${enonces[2].correction2}`
              } else {
                texteCorr = 'Détaillons deux méthodes : <br><br>'
                texteCorr += '\\begin{minipage}{8cm}'
                texteCorr += enonces[2].correction1
                texteCorr += '\\end{minipage}'
                texteCorr += '\\hfill \\vrule \\hfill'
                texteCorr += '\\begin{minipage}{8cm}'
                texteCorr += enonces[2].correction2
                texteCorr += '\\end{minipage}'
                texteCorr += '<br>'
              };
            };
            setReponse(this, i, situations[2].resultatNumerique)
          } else {
            switch (this.canVersion) {
              case 'v1' :
                this.question = `${enonces[2].enonceCanV1}`
                this.correction = `${enonces[2].correction1} <br><br> ${enonces[2].correction2}`
                this.reponse = `${enonces[2].resultatCan}`
                break
              case 'v2' :
                this.question = `${enonces[2].enonceCanV2}`
                this.correction = `${enonces[2].correction1} <br><br> ${enonces[2].correction2}`
                this.reponse = `${enonces[2].resultatCan}`
                break
            }
            this.canEnonce = this.question
            this.canReponseACompleter = ''
          }
          break
      };
      if (!this.can) {
        texte += ajouteChampTexteMathLive(this, i)
      } else {
        // comment
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        // ToDo traiter les éventuelles question interactives en double
        let mybool = false
        this.listeQuestions.forEach(elt => {
          if (texte.split('$')[1].substr(2).indexOf(elt.split('$')[1].substr(2)) !== -1) {
            mybool = true
          }
        })
        if (!mybool) {
          this.listeQuestions.push(texte)
          this.listeCorrections.push(texteCorr)
          i++
        }
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, "1 : Carré d'une somme\n2 : Carré d'une différence\n3 : Produit de la somme et de la différence\n4 : Mélange"]
}
