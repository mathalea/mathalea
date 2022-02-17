import Exercice from '../Exercice.js'
import {
    listeQuestionsToContenu,
    randint,
    texNombrec,
    texNombre,
    calcul,
    decimalToScientifique,
    combinaisonListes
} from '../../modules/outils.js'
import {
    setReponse
} from '../../modules/gestionInteractif.js'
import {
    ajouteChampTexteMathLive
} from '../../modules/interactif/questionMathLive.js'
import {
    context
} from '../../modules/context.js'
import {
    round
} from 'mathjs'
export const titre = 'Calculer avec des nombres en écriture scientifique'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Calculer avec des nombres en écriture scientifique
 * @author Matthieu Devillers
 * 2N31-5
 */
export default class CalculerAvecEcritureScientifique extends Exercice {
    'use strict'
    constructor() {
        super()
        this.titre = titre
        this.interactifReady = interactifReady
        this.interactifType = interactifType
        this.correctionDetailleeDisponible = true
        context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
        if (!context.isHtml) {
            this.correctionDetaillee = false
        }
        this.consigne = 'Calculer, en détaillant les étapes, puis exprimer le résultat sous forme scientifique. <br>'
        this.consigne += 'En cas de besoin, on arrondira la mantisse au centième près.'
        this.nbCols = 1
        this.nbColsCorr = 1
        this.spacing = 1
        this.spacingCorr = 1
        this.nbQuestions = 3
        this.sup = 1
        this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Produit\n 2 : Quotient\n 3 : Quotient de produits\n 4 : Mélange des cas précédents']
    }
    nouvelleVersion() {
        this.sup = parseInt(this.sup)
        this.listeQuestions = [] // Liste de questions
        this.listeCorrections = [] // Liste de questions corrigées
        let typesDeQuestionsDisponibles = []
        if (this.sup === 1) {
            typesDeQuestionsDisponibles = [1] // Produit
        } else if (this.sup === 2) {
            typesDeQuestionsDisponibles = [2] // Quotient
        } else if (this.sup === 3) {
            typesDeQuestionsDisponibles = [3] // Quotient de produits
        } else {
            typesDeQuestionsDisponibles = [1, 2, 3]
        } // Mélange des cas précédents
        const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
        for (let i = 0, texte, texteCorr, reponse, cpt = 0, a = [], b = [], c = [], n, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
            typesDeQuestions = listeTypeDeQuestions[i]
            n = 0
            while (n < 4) {
                c[n] = randint(-30, 30, [-1, 0, 1]) // initialise les exposants entiers relatifs
                b[n] = randint(11, 99)
                a[n] = randint(101, 999) // initialise les mantises avec chiffre des dixièmes non nul
                a[n] = calcul(a[n] / 100) // JC : n'assure pas d'avoir un nombre décimal si a[n]=200 par exemple.
                b[n] = calcul(b[n] / 10) // JC : si b[n]=20, alors on récupère un entier.
                // JC : a[n] = randint(1,9)+randint(1,9)/10 assure d'avoir deux chiffres non nuls.
                // JC : La division par 10 d'un flottant tombe juste en js, pas la division par 100. pour diviser par 100, faire a[n]/10/10 ... curieusement js fait ça mieux que a[n]/100.
                n++
            }
            texteCorr = '<br>'
            texte = ''
            switch (typesDeQuestions) {
                case 1:
                    texte = `$ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} $\n` // a.10^n x b.10^m = ?
                    if (this.correctionDetaillee) {
                        texteCorr += `$ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} = \\left ( ${texNombrec(a[0])} \\times   ${texNombrec(b[0])} \\right ) \\times \\left ( 10^{${texNombrec(c[1])}} \\times 10^{${texNombrec(c[0])}} \\right ) $ <br>`
                        texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } = ${texNombrec(calcul(a[0] * b[0]))} \\times 10^{${texNombrec(c[1] + c[0])}} $ <br>`
                        texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } = ${texNombre(decimalToScientifique(calcul(a[0] * b[0]))[0])} \\times 10^{${decimalToScientifique(calcul(a[0] * b[0]))[1]}} \\times 10^{${texNombrec(c[1] + c[0])}} $ <br>`
                        texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } = ${texNombre(decimalToScientifique(calcul(a[0] * b[0]))[0])} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])}} $ <br>`
                        texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } \\approx ${texNombrec(round(decimalToScientifique(calcul(a[0] * b[0]))[0], 2))} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])}} $  (avec la mantisse arrondie au centième) <br>`
                    } else {
                        texteCorr += `$ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} \\approx ${texNombrec(round(decimalToScientifique(calcul(a[0] * b[0]))[0], 2))} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])}} $  (avec la mantisse arrondie au centième) <br>`
                    }
                    reponse = ` ${round(decimalToScientifique(calcul(a[0] * b[0]))[0], 2)} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])}}`
                    // texNombrec(a[0]) effectue un texNombre(parseFloat(a[0].toFixed(15))), ce qui signifie que texNombrec(3.54) va d'abord transformer le nombre en '3.540000000000000' pour transformer cela en flottant puis appliquer texNombre.
                    // bientôt texNombre acceptera directement un deuxième argument pour fixer le nombre de décimale. il suffira de faire texNombre(a[0],2) ici.
                    // JC : texNombrec(round(decimalToScientifique(calcul(a[0] * b[0]))[0], 2))} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])
                    // JC : utiliser une constante : const produit = decimalToScientifique(a[0]*b[0])
                    // JC : puis utiliser produit plutôt que d'appeler plusieurs fois la fonction.
                    // JC : ${texNombre(produit[0],2)}\\times 10^${produit[1]+c[1]+c[0]} devrait faire le job quand la fonction texNombre() sera upgradée.

                    break
                case 2:
                    texte = `Texte2 ${a[0]}` // b>1
                    if (this.correctionDetaillee) {
                        texteCorr += 'Correction Détaillée 2'
                    } else {
                        texteCorr += 'CorrTest2'
                    }
                    reponse = 'Test 2'
                    break
                case 3:
                    texte = `Texte3 ${b[0]}` // b<-1
                    if (this.correctionDetaillee) {
                        texteCorr += 'Correction détaillée 3'
                    } else {
                        texteCorr = texte + 'CorrTest3'
                    }
                    reponse = 'test 3'
                    break
            }
            texte += ajouteChampTexteMathLive(this, i)
            setReponse(this, i, reponse)
            // JC : setReponse(this, i, reponse, {formatInteractif: 'ecritureScientifique'})
            // JC : Si on ne précise pas le formatInteractif, alors par défaut, c'est 'calcul', et alors, réponse doit contenir un nombre, pas une chaine de caractère.
            if (this.listeQuestions.indexOf(texte) === -1) {
                // Si la question n'a jamais été posée, on en créé une autre
                this.listeQuestions.push(texte)
                this.listeCorrections.push(texteCorr)
                i++
            }
            cpt++
        }
        listeQuestionsToContenu(this)
    }
}