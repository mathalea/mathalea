import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { number } from 'mathjs'
import { boite, fixeBordures, mathalea2d } from '../../modules/2d.js'
export const titre = 'Compléter des patrons de solides'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Pour l'instant on va faire les cubes et les parallélépipèdes rectangles
 * @author Jean-Claude Lhote
 * Référence
*/
type Cellule = { bordG: number, bordH: number }
type Ligne = Cellule[]
type Patron = Ligne[]

class ModelePatrons {
    patrons: Patron[]
    constructor(a: number, b: number, c: number) {
        this.patrons = [
            [
                [
                    { bordG: a, bordH: b }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: c, bordH: b }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: c, bordH: b }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: c, bordH: b }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: c, bordH: b }, { bordG: c, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }, { bordG: c, bordH: b }, { bordG: c, bordH: a }
                ]
            ],
            [
                [
                    { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: c, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    { bordG: null, bordH: null }, { bordG: a, bordH: c }, { bordG: null, bordH: null }, { bordG: null, bordH: null }, { bordG: null, bordH: null }
                ]
            ]
        ]
    }
}

export default class PatronsSolides extends Exercice {
    sup: string
    besoinFormulaireTexte: string[]
    constructor() {
        super()
        this.sup = '1-2-3' // Cette ligne est très importante pour faire faire un exercice simple !
        this.nbQuestions = 1
        this.besoinFormulaireTexte = ['Trois dimensions du parallélépipède rectangle séparés par des tirets']

    }

    nouvelleVersion() {
        this.listeQuestions = []
        this.listeCorrections = []
        function formateGrille(modele: Patron) {
            const largeurs: number[] = []
            for (let x = 0, xMax: number; x < 5; x++) {
                xMax = 0
                for (let y = 0; y < 3; y++) {
                    xMax = Math.max(xMax, modele[y][x].bordH || 0)
                }
                largeurs[x] = xMax
            }
            const hauteurs: number[] = []
            for (let y = 0, yMax: number; y < 3; y++) {
                yMax = 0
                for (let x = 0; x < 5; x++) {
                    yMax = Math.max(yMax, modele[y][x].bordG || 0)
                }
                hauteurs[y] = yMax
            }
            return [largeurs, hauteurs]
        }
        function dessinePatron(modele: Patron) {
            const forme: object[] = []
            const [largeurs, hauteurs] = formateGrille(modele)
            for (let x = 0, xOffset = 0; x < 5; x++) {
                if (largeurs[x] !== 0) {
                    for (let y = 0, yOffset = 0; y < 3; y++) {
                        if (hauteurs[y] !== 0) {
                            if (modele[y][x].bordG) forme.push(boite({ Xmin: xOffset, Ymin: yOffset, Xmax: xOffset + largeurs[x], Ymax: yOffset + hauteurs[y] }))
                            yOffset += hauteurs[y]
                        }
                    }
                    xOffset += largeurs[x]
                }
            }
            return forme
        }
        const dimensions = this.sup.split('-')
        const [a, b, c] = [parseInt(dimensions[0]), parseInt(dimensions[1]), parseInt(dimensions[2])]
        const mesModeles = new ModelePatrons(a, b, c)
        for (let numero = 0; numero < 11; numero++) {
            const monPatron = dessinePatron(mesModeles.patrons[numero])
            const texte = mathalea2d(fixeBordures(monPatron), monPatron)
            this.listeQuestions.push(texte)
            this.listeCorrections.push('')
        }
        listeQuestionsToContenu(this)
    }
}
