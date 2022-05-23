import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, contraindreValeur, compteOccurences, rangeMinMax, randint, texNombre } from '../../modules/outils.js'
import Decimal from 'decimal.js'
import { fraction } from '../../modules/fractions.js'
import { context } from '../../modules/context.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Convertir des grandeurs composées'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '23/05/2022'

/**
 * @author Guillaume Valmont
 * Référence 4P16
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : m/h\n2 : m³/h\n3 : L/h\n4 : L/m²\n5 : m²/h\n6 : Wh\n7 : VA\n8 : Mélange']
    this.sup = '8'
    this.titre = titre
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let listeDesProblemes = [1, 2, 3, 4, 5, 6, 7] // Paramétrage par défaut
    const valMaxParametre = 8
    if (this.sup) { // Si une liste est saisie
      if (this.sup.toString().indexOf('-') === -1) { // S'il n'y a pas de tiret ...
        listeDesProblemes = [contraindreValeur(1, valMaxParametre, parseInt(this.sup), 1)] // ... on crée un tableau avec une seule valeur
      } else {
        listeDesProblemes = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on parcourt notre tableau de strings : ['1', '1', '2'] ...
          listeDesProblemes[i] = contraindreValeur(1, valMaxParametre, parseInt(listeDesProblemes[i]), 1) // ... pour en faire un tableau d'entiers : [1, 1, 2]
        }
      }
    }
    // Attention ! Si la valeur max du paramètre n'est pas une option de type "mélange", supprimer la ligne ci-dessous !
    if (compteOccurences(listeDesProblemes, valMaxParametre) > 0) listeDesProblemes = rangeMinMax(1, valMaxParametre - 1) // Si l'utilisateur a choisi l'option "mélange", on fait une liste avec un de chaque

    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)

    const unitesLongueur = [
      {
        unite: 'mm',
        coef: 1
      },
      {
        unite: 'cm',
        coef: 10 ** 1
      },
      {
        unite: 'dm',
        coef: 10 ** 2
      },
      {
        unite: 'm',
        coef: 10 ** 3
      },
      {
        unite: 'dam',
        coef: 10 ** 4
      },
      {
        unite: 'hm',
        coef: 10 ** 5
      },
      {
        unite: 'km',
        coef: 10 ** 6
      }
    ]
    const unitesSurface = [
      {
        unite: 'mm²',
        coef: 1
      },
      {
        unite: 'cm²',
        coef: 10 ** 2
      },
      {
        unite: 'dm²',
        coef: 10 ** 4
      },
      {
        unite: 'm²',
        coef: 10 ** 6
      },
      {
        unite: 'dam²',
        coef: 10 ** 8
      },
      {
        unite: 'hm²',
        coef: 10 ** 10
      },
      {
        unite: 'km²',
        coef: 10 ** 12
      }
    ]
    const unitesVolume = [
      {
        unite: 'mm³',
        coef: 1
      },
      {
        unite: 'cm³',
        coef: 10 ** 3
      },
      {
        unite: 'dm³',
        coef: 10 ** 6
      },
      {
        unite: 'm³',
        coef: 10 ** 9
      }
    ]
    const unitesContenance = [
      {
        unite: 'mL',
        coef: 1
      },
      {
        unite: 'cL',
        coef: 10 ** 1
      },
      {
        unite: 'dL',
        coef: 10 ** 2
      },
      {
        unite: 'L',
        coef: 10 ** 3
      }
    ]
    const unitesTemps = [
      {
        unite: 's',
        coef: 1
      },
      {
        unite: 'min',
        coef: 60
      },
      {
        unite: 'h',
        coef: 3600
      }
    ]
    const unitesPuissance = [
      {
        unite: 'mW',
        coef: 1
      },
      {
        unite: 'W',
        coef: 10 ** 3
      },
      {
        unite: 'kW',
        coef: 10 ** 6
      }
    ]
    const unitesTension = [
      {
        unite: 'mV',
        coef: 1
      },
      {
        unite: 'V',
        coef: 10 ** 3
      },
      {
        unite: 'kV',
        coef: 10 ** 6
      }
    ]
    const unitesIntensite = [
      {
        unite: 'mA',
        coef: 1
      },
      {
        unite: 'A',
        coef: 10 ** 3
      }
    ]
    let unite1Depart, unite2Depart, unite1Arrivee, unite2Arrivee, valeurDepart, valeurArrivee
    function fixeUnites (unite1, unite2) {
      const index1Depart = randint(0, unite1.length - 1)
      const index2Depart = randint(0, unite2.length - 1)
      const index1Arrivee = randint(0, unite1.length - 1, [index1Depart])
      const index2Arrivee = randint(0, unite2.length - 1, [index2Depart])
      unite1Depart = unite1[index1Depart]
      unite2Depart = unite2[index2Depart]
      unite1Arrivee = unite1[index1Arrivee]
      unite2Arrivee = unite2[index2Arrivee]
    }
    for (let i = 0, texte, texteCorr, typeDeComposition, operateur, cfrac, times, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      valeurDepart = randint(1, 80) * 9 // Comme ça même si on doit diviser par 3600 le résultat restera décimal
      typeDeComposition = 'quotient'
      if (listeDesProblemes[i] === 1) { // Vitesse
        fixeUnites(unitesLongueur, unitesTemps)
      } else if (listeDesProblemes[i] === 2) { // Débit (m³)
        fixeUnites(unitesVolume, unitesTemps)
      } else if (listeDesProblemes[i] === 3) { // Débit (L)
        fixeUnites(unitesContenance, unitesTemps)
      } else if (listeDesProblemes[i] === 4) { // L/m²
        fixeUnites(unitesContenance, unitesSurface)
      } else if (listeDesProblemes[i] === 5) { // m²/h
        fixeUnites(unitesSurface, unitesTemps)
      } else if (listeDesProblemes[i] === 6) { // Wh
        typeDeComposition = 'produit'
        fixeUnites(unitesPuissance, unitesTemps)
      } else if (listeDesProblemes[i] === 7) { // VA
        typeDeComposition = 'produit'
        fixeUnites(unitesTension, unitesIntensite)
      } else {
        window.notify('listeDesProblemes[i] a une valeur inattendue.\nPeut-être que valMaxParametre est incorrect ?')
      }
      const coef1 = new Decimal(unite1Depart.coef).div(unite1Arrivee.coef)
      const coef2 = new Decimal(unite2Depart.coef).div(unite2Arrivee.coef)
      valeurArrivee = new Decimal(valeurDepart).times(coef1)
      if (typeDeComposition === 'quotient') {
        operateur = '/'
        cfrac = ' \\cfrac '
        times = ''
        valeurArrivee = valeurArrivee.div(coef2)
      } else {
        operateur = '.'
        cfrac = ''
        times = ' \\times '
        valeurArrivee = valeurArrivee.times(coef2)
      }
      texte = `Convertir $${valeurDepart}$ ${unite1Depart.unite}${operateur}${unite2Depart.unite} en ${unite1Arrivee.unite}${operateur}${unite2Arrivee.unite}.`
      texteCorr = `$${valeurDepart}\\text{ ${unite1Depart.unite}${operateur}${unite2Depart.unite}}
      = ${cfrac}{${valeurDepart}\\text{ ${unite1Depart.unite}}}${times}{1 \\text{ ${unite2Depart.unite}}}
      = ${cfrac}{${valeurDepart} \\times ${fraction(unite1Depart.coef, unite1Arrivee.coef).texFractionSimplifiee} \\text{ ${unite1Arrivee.unite}}}
      ${times}{${fraction(unite2Depart.coef, unite2Arrivee.coef).texFractionSimplifiee} \\text{ ${unite2Arrivee.unite}}}
      = ${texNombre(valeurArrivee)}\\text{ ${unite1Arrivee.unite}${operateur}${unite2Arrivee.unite}}$`
      if (this.interactif && context.isHtml) {
        setReponse(this, i, valeurArrivee)
        texte += `<br> $${valeurDepart}$ ${unite1Depart.unite}${operateur}${unite2Depart.unite} = `
        texte += ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true })
        texte += ` ${unite1Arrivee.unite}${operateur}${unite2Arrivee.unite}`
      }
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
