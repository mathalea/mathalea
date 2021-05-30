import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,choice,combinaisonListes,reduireAxPlusB,texteEnCouleur, texFractionSigne,texFractionReduite, ecritureAlgebrique,ecritureAlgebriqueSauf1} from '../../modules/outils.js'

export const titre = 'Reconnaître une fonction affine.'

/**
 * Reconnaître une fonction affine
* @author Stéphane Guyon
* 2F20
*/
export default function Coefficient_directeur_équation_réduite() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;
    this.video = "";
    this.consigne = "Déterminer,s'il existe et en l'expliquant, le coefficient directeur de la droite $(AB)$ :";
    this.nbCols = 1;
    this.nbColsCorr = 1;
    this.spacing = 1;
    this.spacingCorr = 1;
    this.nbQuestions = 5;
    this.spacingCorr = 3

    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let typesDeQuestionsDisponibles = [];
       
        typesDeQuestionsDisponibles = [1,2]; 
        
        
        let listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions);
        for (let i = 0, texte, texteCorr, cpt = 0, xA,yA,xB,yB, fraction = [], ns, ds, typesDeQuestions; i < this.nbQuestions && cpt < 50;) 
        {
            typesDeQuestions = listeTypeDeQuestions[i];
          	xA = randint(-5, 5);
            yA = randint(-5, 5);
            xB = randint(-5, 5);
            yB = randint(-5, 5);
        
            switch (typesDeQuestions) {
                case 1:
                        texte = ` Avec $A(${xA};${yA})$`; 
                        if (xA=xB)
                            texteCorr = ` On observe que $x_A=x_B$, la droite $(AB) est donc verticale d'équation $x=${xA}$<br>`
                            texteCorr += `Il n'y a pas de coefficient directeur à une droite verticale.`
                        texteCorr +=`Ici, on a : $a=${a}$ et $b=${b}$<br>`
                        texteCorr +=`$f$ est donc bien une fonction affine.<br>`                                 
                 break;
                
            }
            if (this.listeQuestions.indexOf(texte) === -1) {
                // Si la question n'a jamais été posée, on en créé une autre
                this.listeQuestions.push(texte);
                this.listeCorrections.push(texteCorr);
                i++;
            }
            cpt++;
        }
        listeQuestionsToContenu(this);
    };
    
}
