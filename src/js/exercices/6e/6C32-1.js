import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texNombre, numAlpha, texteEnCouleurEtGras, texteGras, prenomF, rangeMinMax, contraindreValeur, combinaisonListes } from '../../modules/outils.js'

export const titre = 'Résoudre des problèmes (plus complexes)'

/**
 * Résoudre des problèmes (plus complexes)
 * @author Mikael Guironnet
* Référence 6C32-1
 */
export default function ExerciceProblemesComplexes () {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 0
  this.titre = titre
  this.spacing = 1.5
  this.nbQuestions = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let listeDesProblemes = []
    if (!this.sup) { // Si aucune liste n'est saisie
      listeDesProblemes = rangeMinMax(1, 10)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeDesProblemes[0] = contraindreValeur(1, 10, this.sup, 1)
      } else {
        listeDesProblemes = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeDesProblemes[i] = contraindreValeur(1, 10, parseInt(listeDesProblemes[i]), 2) // parseInt en fait un tableau d'entiers
        }
      }
    }
    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)

    for (let i = 0, cpt = 0, texte, texteCorr; i < this.nbQuestions && cpt < 50; cpt++) {
      texte = ''
      texteCorr = ''
      switch (listeDesProblemes[i]) {
        case 1 : {
          const calAgneau = 3 + randint(1, 3) * 0.1 // 3.3
          const calEpinards = 0.3 + randint(1, 3) * 0.01 // 0.32
          const calFro = 1 + randint(1, 3) * 0.1 // 1.2
          const calPom = 0.5 + randint(1, 3) * 0.01 // 0.52
          const quaAgneau = 120 + randint(1, 9) // 125
          const quaEpinards = 150 + randint(0, 5) // 150
          const quaFro = 40 + randint(0, 9) // 45
          const quaPom = 120 + randint(0, 5) // 120
          const prenomFP = prenomF()
          texte += `${prenomFP} suit un régime et ne doit pas absorber plus de 700 calories par repas.<br>
                   Aujourd'hui, elle a mangé le repas suivant :<br>
                   1 côtelette d'agneau de ${quaAgneau}g,<br> ${quaEpinards}g d'épinards,<br> ${quaFro}g de fromage blanc <br> et une pomme de ${quaPom}g. <br>
                   <br>On sait que 1g d'agneau fournit $${texNombre(calAgneau)}$ calories, <br> 1g d'épinards fournit $${texNombre(calEpinards)}$ calories, <br> 1g de fromage blanc fournit $${texNombre(calFro)}$ calories <br> et 1g de pomme $${texNombre(calPom)}$ calories.<br>
                   ${prenomFP} respecte-t-elle son régime ?`
          texteCorr += `Agneau : $${quaAgneau}\\times ${texNombre(calAgneau)} =   ${texNombre(calAgneau * quaAgneau)}$ calories <br>
                        Epinards : $${quaEpinards}\\times ${texNombre(calEpinards)} =   ${texNombre(calEpinards * quaEpinards)}$ calories <br>
                        Fromage blanc : $${quaFro}\\times ${texNombre(calFro)} =   ${texNombre(calFro * quaFro)}$ calories <br>
                        Pomme : $${quaPom}\\times ${texNombre(calPom)} =   ${texNombre(calPom * quaPom)}$ calories <br>
                        Cela fait un total de $${texNombre(calAgneau * quaAgneau)} + ${texNombre(calEpinards * quaEpinards)} + ${texNombre(calFro * quaFro)} + ${texNombre(calPom * quaPom)} =  ${texNombre(calAgneau * quaAgneau + calEpinards * quaEpinards + calFro * quaFro + calPom * quaPom)} $ calories.<br>
                        ${calAgneau * quaAgneau + calEpinards * quaEpinards + calFro * quaFro + calPom * quaPom < 700 ? 'Elle respecte son règime' : 'Elle ne respecte pas son règime'} 
                        car $${texNombre(calAgneau * quaAgneau + calEpinards * quaEpinards + calFro * quaFro + calPom * quaPom)} ${calAgneau * quaAgneau + calEpinards * quaEpinards + calFro * quaFro + calPom * quaPom < 700 ? '< 700' : '> 700'}$`
          break
        }
        case 2 : {
          const quaFro1 = 130 + randint(0, 9) // 133
          const masseFro1 = 2.3 + randint(0, 9) * 0.01 // 2,340
          const quaFro2 = 120 + randint(0, 9) // 122
          const masseFro2 = 3.1 + randint(0, 9) * 0.01 // 3,115
          const total = quaFro1 * masseFro1 + quaFro2 * masseFro2
          texte += `Le livreur d'une fromagerie charge ${quaFro1} fromages pesant chacun $${texNombre(masseFro1)}$ kg <br>
                                  et ${quaFro2} autres pesant chacun $${texNombre(masseFro2)} $ kg dans une voiture pouvant transporter 550kg.<br>
                                  Le véhicule est-il en surcharge ? Si oui, de combien ? Si non, combien reste-t-il ?`
          texteCorr += `Première sorte de fromage : $${quaFro1}\\times ${texNombre(masseFro1)} =   ${texNombre(quaFro1 * masseFro1)}$ kg <br>
                        Deuxième sorte de fromage : $${quaFro2}\\times ${texNombre(masseFro2)} =   ${texNombre(quaFro2 * masseFro2)}$ kg <br>
                        Cela fait un total de $${texNombre(quaFro1 * masseFro1)} + ${texNombre(quaFro2 * masseFro2)} = ${texNombre(quaFro1 * masseFro1 + quaFro2 * masseFro2)} $ kg.<br>
                        ${total > 550 ? `Elle est surcharge de $${texNombre(total)} - 550 = ${texNombre(total - 550)}$ kg` : `Elle n'est pas en surcharge et il reste $550 - ${texNombre(total)} = ${texNombre(550 - total)}$ kg`}`
          break
        }
        case 3 : {
          const k1 = randint(1, 8) * 0.1 // 0.4
          const k2 = randint(10, 30) // 25
          const n1 = randint(2, 9)
          const n2 = randint(2, 9, [n1])
          texte += `On considère le programme de calcul:<br>
                    • Choisir un nombre<br>
                    • Multiplier ce nombre par $${texNombre(k1)}$<br>
                    • Multiplier le résultat par $${texNombre(k2)}$.<br>
                  ${numAlpha(0)} Effectue ce programme avec $${n1}$ et  $${n2}$.<br>
                  ${numAlpha(1)} Remplace ce programme par un programme plus court. Explique.`
          texteCorr += `${numAlpha(0)} Si le nombre est $${n1}$<br>
                        • $${n1} \\times ${texNombre(k1)} = ${texNombre(n1 * k1)}$<br>
                        • $${texNombre(n1 * k1)} \\times ${texNombre(k2)} = ${texNombre(n1 * k1 * k2)}$<br>
                        Si le nombre est $${n2}$<br>
                        • $${n2} \\times ${texNombre(k1)} = ${texNombre(n2 * k1)}$<br>
                        • $${texNombre(n2 * k1)} \\times ${texNombre(k2)} = ${texNombre(n2 * k1 * k2)}$<br>
                        ${numAlpha(1)} Le programme de calcul se résume par cette expression :<br>
                        nombre de départ $\\times ${texNombre(k1)} \\times ${texNombre(k2)}$ <br>
                        C'est une expression avec uniquement des multiplications, il n'y a pas priorité, <br>
                        elle se résume par : nombre de départ $\\times ${texNombre(k1 * k2)}$ car $${texNombre(k1)}\\times${texNombre(k2)}=${texNombre(k1 * k2)}$<br>
                        Donc le programme peut être le suivant: <br>
                        • Choisir un nombre<br>
                        • Multiplier ce nombre par $${texNombre(k1 * k2)}$<br>`
          break
        }
        case 4 : {
          const range = randint(20, 40) // 35
          const fauteils = randint(10, 20) // 12
          const prix = randint(5, 12) + randint(5, 8) * 0.1
          const n1 = randint(10, 15)
          texte += `Dans une salle de cinéma, il y a ${range} rangées de ${fauteils} fauteuils.<br>
                    Le prix d'une place pour une séance est de $${texNombre(prix)}$ €<br>
                  ${numAlpha(0)} Si toutes les places sont occupées, quelle est la somme d'argent récoltée?<br>
                  ${numAlpha(1)} Pour une autre séance, ${n1} rangées sont pleines, le reste des
                  rangées étant vides. Quelle est la recette pour cette séance?`
          texteCorr += `${numAlpha(0)} $${range} \\times ${fauteils} =${fauteils * range}$<br>
                        Il y a $${fauteils * range}$ places dans la salle.<br>
                        $${fauteils * range} \\times ${texNombre(prix)} = ${texNombre(fauteils * range * prix)}$ €<br>
                        La somme d'argent perçue est $${texNombre(fauteils * range * prix)}$ €<br>
                        ${numAlpha(1)} $${n1} \\times ${fauteils} =${fauteils * n1}$<br>
                        Il y a $${fauteils * n1}$ places occupées dans la salle.<br>
                        $${fauteils * n1} \\times ${texNombre(prix)} = ${texNombre(fauteils * n1 * prix)}$ €<br>
                        La somme d'argent perçue est $${texNombre(fauteils * n1 * prix)}$ €<br>`
          break
        }
        case 5 : {
          const min = randint(1, 5) * 10 //  30
          const longueur = randint(2, 9) * 30 // 600m
          const nombreP = randint(3, 8)
          texte += `Avant l'arrivée du numérique, au cinéma, la pillule était utilisée pour projeter des films.<br>
                   Le format souvent utilisé était le format 35mm, pellicule de 35 mm de largeur.<br>
                   A 24 images par seconde, une pellicule de film de 30 mètres de long représente 1 minutes de projection.<br>
                   Pour projecter un film, plusieurs pellicules étaient nécessaires et le projectionniste avait pour rôle de les changer.<br>                                       
                   ${numAlpha(0)} Si le film a $${nombreP}$ pellicules de $600m$, quelle est la longueur totale en mètres du film?<br>
                   ${numAlpha(1)} Si le film a $${nombreP}$ pellicules de $600m$, quelle est la durée totale du film?<br>
                   ${numAlpha(2)} Si le film dure $1h${min}$, quelle est la longueur totale en mètres du film?<br>
                   ${numAlpha(3)} Si le film dure $1h${min}$, combien faut-il de pellicules de $600m$?<br>
                   ${numAlpha(4)} Si la pellicule mesure $${longueur}$m, quelle est la durée de la pellicule?<br>
                   ${numAlpha(5)} Si la pellicule mesure $${longueur}$m, combien d'images y a-t-il sur la pellicule?<br>   `

          texteCorr += `${numAlpha(0)} $${nombreP} \\text{ pellicules} \\times 600m =${texNombre(nombreP * 600)}m$<br>
                        La longueur totale du film est $${texNombre(nombreP * 600)}$ mètres.<br>
                        ${numAlpha(1)} $30m \\times 20 = 600m$ donc une pellicule de $600m$ représente $1min\\times 20 = 20 min$.<br>
                        $${nombreP} \\text{pellicules} \\times 20 min  =${texNombre(nombreP * 20)} min$.<br>
                        La durée totale du film est $${texNombre(nombreP * 20)}$ minutes.<br>
                        ${numAlpha(2)} $${60 + min}min \\times 30 \\text{ mètres}= ${texNombre((60 + min) * 30)}$ mètres.<br>
                        La longueur totale en mètres d'un film de $1h${min}$ est $${texNombre((60 + min) * 30)}$ mètres.<br>
                        ${numAlpha(3)} $${texNombre(Math.floor(((60 + min) * 30) / 600))} \\times 600 = ${texNombre(Math.floor(((60 + min) * 30) / 600) * 600)}$ mètres.<br>
                        Donc il faut $${texNombre(Math.floor(((60 + min) * 30) / 600))}$ bobines de 600 m et une bobine de  $${texNombre(((60 + min) * 30) - Math.floor(((60 + min) * 30) / 600) * 600)}$ mètres.<br>
                        ${numAlpha(4)} $${texNombre(Math.floor(longueur / 30))} \\times 30 = ${texNombre(longueur)}$ mètres.<br>
                        Donc la durée de la pellicule est $${texNombre(Math.floor(longueur / 30))}$ minutes.<br>
                        ${numAlpha(5)} $${texNombre(Math.floor(longueur / 30))} \\times 60 = ${texNombre(Math.floor(longueur / 30)) * 60}$ secondes.<br>
                        $${texNombre(Math.floor(longueur / 30)) * 60} \\text{ secondes} \\times 24 \\text{ images} = ${texNombre(Math.floor(longueur / 30)) * 60 * 24} \\text{ images}$.<br>
                        Il y a $${texNombre(Math.floor(longueur / 30)) * 60 * 24} \\text{ images}$ dans la pellicule`
          break
        }
        case 6 : {
          const nbBo = randint(2, 5)
          const prixBo = 1 + randint(1, 9) * 0.1 + randint(1, 9) * 0.01
          const nbSch = randint(2, 5, [nbBo])
          const prixSch = 3 + randint(1, 9) * 0.1 + randint(1, 9) * 0.01
          const prenomFe = prenomF()
          texte += `Dans une boulangerie, ${prenomFe} achète ${nbSch} sandwitchs à $${texNombre(prixSch)}$ € chacun<br>
                    et ${nbBo} boissons à $${texNombre(prixBo)}$ € chacune.<br>
                    ${prenomFe} a un billet de 50€, combien va lui rendre la vendeuse?<br>`
          texteCorr += `$${nbSch} \\times ${texNombre(prixSch)} =${texNombre(nbSch * prixSch)}$ €<br>
                        Le prix des sandwitchs est $${texNombre(nbSch * prixSch)}$ €.<br>
                        $${nbBo} \\times ${texNombre(prixBo)} =${texNombre(nbBo * prixBo)}$ €<br>
                        Le prix des boisons est $${texNombre(nbBo * prixBo)}$ €.<br>
                        $${texNombre(nbBo * prixBo)} + ${texNombre(nbSch * prixSch)} =${texNombre(nbBo * prixBo + nbSch * prixSch)}$ €<br>
                        Le prix total à payer est $${texNombre(nbBo * prixBo + nbSch * prixSch)}$ €.<br>
                        $50 -  (${texNombre(nbBo * prixBo)} + ${texNombre(nbSch * prixSch)}) = ${texNombre(50 - (nbBo * prixBo + nbSch * prixSch))}$ €<br>
                        La vendeuse va rendre la somme de $${texNombre(50 - (nbBo * prixBo + nbSch * prixSch))}$ €<br>`
          break
        }
        case 7 : {
          const nbCagettes = randint(2, 5)
          const kgOranges = 5 + randint(2, 5) * 0.1
          const prixOranges = 6 + randint(2, 9) * 0.1 + randint(2, 9) * 0.01
          const prixOrangesKg = 1 + randint(5, 9) * 0.1 + randint(2, 9) * 0.01
          texte += `Un commerçant achète ${nbCagettes} cagettes d'oranges. Chaque cagette contient <br>
                    $${texNombre(kgOranges)}$ kg d'oranges et coûte $${texNombre(prixOranges)}$ €.<br>
                    Le commerçant revend les oranges $${texNombre(prixOrangesKg)}$ le kilogramme.<br>
                    Quel est le bénéfice s'il réussit à tout vendre?<br>`
          texteCorr += `$${nbCagettes} \\times ${kgOranges} =${texNombre(nbCagettes * kgOranges)}$ kg<br>
                        Il y a $${texNombre(nbCagettes * kgOranges)}$ kg d'oranges.<br>
                        $${texNombre(nbCagettes)} \\times ${texNombre(prixOranges)} =${texNombre(nbCagettes * prixOranges)}$ €.<br>
                        Ce qui lui coûte $${texNombre(nbCagettes * prixOranges)}$ €.<br>
                        $${texNombre(nbCagettes * kgOranges)} \\times ${texNombre(prixOrangesKg)} =${texNombre(nbCagettes * kgOranges * prixOrangesKg)}$ €.<br>
                        S'il revend tout, il va gagner $${texNombre(nbCagettes * kgOranges * prixOrangesKg)}$ €.<br>
                        $${texNombre(nbCagettes * kgOranges * prixOrangesKg)} - ${texNombre(nbCagettes * prixOranges)} = ${texNombre(nbCagettes * kgOranges * prixOrangesKg - nbCagettes * prixOranges)}$ €.<br>
                        Le bénéfice sera alors de $${texNombre(nbCagettes * kgOranges * prixOrangesKg - nbCagettes * prixOranges)}$ €.<br>`
          break
        }
        case 8 : {
          const nbDix = randint(10, 20)
          const nbCinq = randint(10, 20, [nbDix])
          const prenomFe = prenomF()
          texte += `${prenomFe} a dans sa tirelire uniqument des billets de 5€ et 10€.<br>
                    Au total, elle a $${texNombre(nbDix + nbCinq)}$ billets qui représentent $${texNombre(nbDix * 10 + nbCinq * 5)}$ €.
                    Combien a-t-elle de billets de de 5€ et 10€.<br>`
          texteCorr += `$${nbDix} \\text{ billets de 10€} +  ${nbCinq} \\text{ billets de 5€} =${texNombre(nbDix + nbCinq)}$ billets<br>
                        $${nbDix} \\times 10  +  ${nbCinq} \\times 5 =${texNombre(nbDix * 10 + nbCinq * 5)}$ €<br>
                        Il y a $${nbDix}$ billets de 10€ et $${nbCinq}$ billets de 5€.<br>`
          break
        }
        case 9 : {
          const nbBarquettesFr = randint(20, 30)
          const gBarquettesFr = 250 * randint(2, 5)
          const prixFr = 7 + randint(2, 5) * 0.1 + randint(2, 9) * 0.01
          const nbBarquettesMy = randint(20, 30, [nbBarquettesFr])
          const gBarquettesMy = 250 * randint(2, 5)
          const prixMy = 8 + randint(2, 5) * 0.1 + randint(2, 9) * 0.01
          texte += `Un marchand de fruits vend $${nbBarquettesFr}$ barquettes de $${gBarquettesFr}$ g de fraises des bois à $${texNombre(prixFr)}$ € le kg<br>
                    et $${nbBarquettesMy}$ barquettes de $${gBarquettesMy}$ g de myrtilles des bois à $${texNombre(prixMy)}$ € le kg.<br>
                    Combien d'argent lui rapporte cette vente?<br>`
          texteCorr += `$${nbBarquettesFr} \\times ${texNombre(gBarquettesFr)} = ${texNombre(nbBarquettesFr * gBarquettesFr)}$ g de fraises.<br>
                        $${texNombre(nbBarquettesFr * gBarquettesFr)} \\times 0,001 = ${nbBarquettesFr * gBarquettesFr * 0.001} $ kg de fraises.<br>
                        $${nbBarquettesFr * gBarquettesFr * 0.001} \\times ${texNombre(prixFr)} =${texNombre(nbBarquettesFr * gBarquettesFr * 0.001 * prixFr)}$ € pour les fraises.<br>
                        $${nbBarquettesMy} \\times ${texNombre(gBarquettesMy)} = ${texNombre(nbBarquettesMy * gBarquettesMy)}$ g de myrtilles.<br>
                        $${texNombre(nbBarquettesMy * gBarquettesMy)} \\times 0,001 = ${nbBarquettesMy * gBarquettesMy * 0.001} $ kg de myrtilles.<br>
                        $${nbBarquettesMy * gBarquettesMy * 0.001} \\times ${texNombre(prixMy)} =${texNombre(nbBarquettesMy * gBarquettesMy * 0.001 * prixMy)}$ € pour les myrtilles.<br>
                        $${texNombre(nbBarquettesFr * gBarquettesFr * 0.001 * prixFr)} + ${texNombre(nbBarquettesMy * gBarquettesMy * 0.001 * prixMy)} = ${texNombre(nbBarquettesFr * gBarquettesFr * 0.001 * prixFr + nbBarquettesMy * gBarquettesMy * 0.001 * prixMy)}$ €.<br>
                        Cette vente va lui rapporter $${texNombre(nbBarquettesFr * gBarquettesFr * 0.001 * prixFr + nbBarquettesMy * gBarquettesMy * 0.001 * prixMy)}$ €.<br>`
          break
        }
        case 10 : {
          const nbP = randint(5, 10)
          const nbD = randint(2, nbP - 1)
          const opP = randint(1, 3)
          const opD = randint(1, 3, [opP])
          texte += `Devinette : je pense à deux nombres entiers.<br>
                    Si j'effectue ${opP === 1 ? 'la somme' : opP === 2 ? 'la différence' : 'le produit'} entre ses deux nombres,<br>
                    alors j'obtiens $${opP === 1 ? texNombre(nbP + nbD) : opP === 2 ? texNombre(nbP - nbD) : texNombre(nbP * nbD)}$.<br>
                    Si j'effectue ${opD === 1 ? 'la somme' : opD === 2 ? 'la différence' : 'le produit'} entre ses deux nombres,<br>
                    alors j'obtiens $${opD === 1 ? texNombre(nbP + nbD) : opD === 2 ? texNombre(nbP - nbD) : texNombre(nbP * nbD)}$.<br>
                    Quels sont ses deux nombres?<br>`
          texteCorr += `$${nbP} ${opP === 1 ? '+' : opP === 2 ? '-' : '\\times'} ${nbD} = $${opP === 1 ? texNombre(nbP + nbD) : opP === 2 ? texNombre(nbP - nbD) : texNombre(nbP * nbD)}.<br>
                        $${nbP} ${opD === 1 ? '+' : opD === 2 ? '-' : '\\times'} ${nbD} = $${opD === 1 ? texNombre(nbP + nbD) : opD === 2 ? texNombre(nbP - nbD) : texNombre(nbP * nbD)}.<br>
                        Les deux nombres sont ${nbP} et ${nbD}.<br>`
          break
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Type de question',
    `0 : Mélange
     1 : Régime alimentaire
     2 : Fromagerie
     3 : Programme de calcul
     4 : cinéma (siège)
     5 : cinéma (pellicule) 
     6 : boulangerie (sandwitchs)
     7 : cagettes
     8 : billets
     9 : fruits`
  ]
}
