import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils.js'
import { number } from 'mathjs'
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
type Cellule = { bordG: number, bordD: number } | {}
type Ligne = Cellule[]
type Patron = Ligne[]

class ModelePatrons {
    modeles: Patron[]
    constructor(a: number, b: number, c: number) {
        this.modeles = [
            [
                [
                    { bordG: a, bordH: b }, { bordG: a, bordH: c }, {}, {}, {}
                ],
                [
                    {}, { bordG: b, bordH: c }, { bordG: b, bordH: a }, {}, {}
                ],
                [
                    {}, {}, { bordG: c, bordH: a }, { bordG: c, bordH: b }, {}
                ]
            ],
            [
                [
                    {}, {}, { bordG: c, bordH: a }, {}, {}
                ],
                [
                    { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, {}
                ],
                [
                    {}, { bordG: a, bordH: c }, {}, {}, {}
                ]
            ],
            [
                [
                    {}, {}, { bordG: c, bordH: a }, {}, {}
                ],
                [
                    {}, {}, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, { bordG: c, bordH: b }, { bordG: c, bordH: a }, {}, {}
                ]
            ],
            [
                [
                    {}, { bordG: c, bordH: b }, { bordG: c, bordH: a }, {}, {}
                ],
                [
                    {}, {}, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, {}, {}, { bordG: a, bordH: c }, {}
                ]
            ],
            [
                [
                    {}, {}, { bordG: c, bordH: a }, {}, {}
                ],
                [
                    {}, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, {}, { bordG: c, bordH: a }, {}, {}
                ]
            ],
            [
                [
                    {}, { bordG: a, bordH: c }, {}, {}, {}
                ],
                [
                    {}, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, { bordG: a, bordH: c }, {}, {}, {}
                ]
            ],
            [
                [
                    {}, { bordG: a, bordH: c }, {}, {}, {}
                ],
                [
                    {}, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, {}, { bordG: c, bordH: a }, {}, {}
                ]
            ],
            [
                [
                    {}, {}, {}, { bordG: a, bordH: c }, {}
                ],
                [
                    {}, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, { bordG: a, bordH: c }, {}, {}, {}
                ]
            ],
            [
                [
                    {}, { bordG: c, bordH: b }, { bordG: c, bordH: a }, {}, {}
                ],
                [
                    {}, {}, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, {}, {}, {}, { bordG: c, bordH: a }
                ]
            ],
            [
                [
                    {}, {}, {}, {}, {}
                ],
                [
                    { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }, {}, {}
                ],
                [
                    {}, {}, { bordG: c, bordH: a }, { bordG: c, bordH: b }, { bordG: c, bordH: a }
                ]
            ],
            [
                [
                    {}, {}, {}, {}, { bordG: c, bordH: a }
                ],
                [
                    {}, { bordG: b, bordH: c }, { bordG: b, bordH: a }, { bordG: b, bordH: c }, { bordG: b, bordH: a }
                ],
                [
                    {}, { bordG: a, bordH: c }, {}, {}, {}
                ]
            ]
        ]
    }
}

export default class PatronsSolides extends Exercice {
    sup: number
    constructor() {
        super()
        this.sup = 1 // Cette ligne est très importante pour faire faire un exercice simple !
        this.nbQuestions = 1
    }

    nouvelleVersion() {
        const a = randint(1, 5)
        const b = randint(1, 5, a)
        const c = randint(1, 5, [a, b])
        const mesModeles = new ModelePatrons(a, b, c)
        console.log(mesModeles)
    }
}
