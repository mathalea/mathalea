# Guide pour l'autoCorrection et pour l'export AMC

Plusieurs attributs de la classe Exercice() sont nécessaires pour activer la possibilité d'avoir un mode interactif

## Tout d'abord les 'marqueurs' :
  
  this.interactif = true définit le mode dans lequel l'exercice va s'afficher
  this.interactifReady = interactifReady définit si l'exercice peut s'afficher en mode interactif
  this.amcType = amcType définit le type d'exercice interactif

  interactifReady est une constante qui est à exporter pour établir la liste des exercices interactifs et utiliser le filtre
  amcType est une constante à exporter pour compléter cette liste avec une information sur le type.

  amcType peut prendre les valeurs suivantes :

  1 : qcm avec une seule bonne réponse (évolution vers le bouton radio ?)
  2 : qcm avec possibilité de plusieures bonnes réponses
  3 : question ouverte -> il n'y a pas d'interactivité l'affichage est classique par contre on peut l'exporter vers AMC en question ouverte
  4 : réponse numérique à entrer dans un formulaire texte. AmcNumeriqueChoice (voire attribut reponse)
  5 : réponse identique au type 4 mais AMC ajoute une zone pour une réponse ouverte
  6 : plusieures réponses numériques (plusieurs attributs reponse, reponse2,...)

  ### La variable this.autoCorrection

  this.autoCorrection doit contenir un tableau d'objets avec autant d'éléments qu'il y a de répétitions de l'énoncé (this.nbQuestions).
  this.autoCorrection[0] définit la première question, this.autoCorrection[1] la deuxième et ainsi de suite.

  selon les types, l'objet s'adapte :

  type 1 :
  this.autoCorrection[i] = {
      enonce: 'la question est posée ici',
      propositions: [
          {
              texte: 'ce qui est écrit à droite de la case à cocher',
              statut: true ou false pour indiquer si c'est une bonne réponse (true),
              feedback: 'le message à écrire en cas d'erreur'
          },
          {
              texte: 'deuxième proposition',
              statut: true ou false,
              feedback: '...'
          },
          {

          } .... autant de fois qu'il y a de propositions dans le qcm
      ],
      options: {
          ordered: true (si les réponses doivent rester dans l'ordre ci-dessus, false si il faut le mélanger),
          lastChoice: index (en cas de mélange, l'index à partir duquel les propositions restent à leur place, souvent le dernier choix par défaut)
      }
  }

type 2 : il est identique au type 1, à la différence près qu'il y aura peut-être plusieurs statut à true

type 3 : (uniquement pour AMC) ici un exemple pour une exercice ne produisant qu'une question (il y aura autant d'objet que this.nbQuestion>1)
  this.autoCorrection = [
      { 
          enonce: 'ici la question est posée'
          propositions: [
              { 
                  texte: 'Ce qui apparaitra sur le corrigé',
                  statut: 3 (ici c'est le nombre de ligne du cadre pour la réponse de l'élève sur AMC),
                  feedback: ''
             }
           ]
       }
    ]
 
type 4 : Voici un élément type (la différence se situe dans l'attribut reponse)
this.autoCorrection[i] = {
        enonce: 'ici la question est posée',
        propositions: [
          {
            texte: 'ce qui est affiché dans le corrigé AMC,
            statut: (pour l'instant il n'a pas d'utilité),
            feedback: ''
          }
        ],
        reponse: {
          texte: 'le texte affiché au dessus du formulaire numerique dans AMC',
          valeur: nombre (la réponse numérique à comparer à celle de l'élève),
          param: {
            digits: 3 (le nombre de chiffres pour AMC, si digits=0, alors il sera déterminé pour coller au nombre décimal demandé),
            decimals: 0 (le nombre de chiffres après la virgule pour AMC),
            signe: false (présence d'une case + ou - pour AMC),
            exposantNbChiffres: 0 (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant),
            exposantSigne: false (présence d'une case + ou - pour l'exposant précédent),
            approx: 0 (0 = valeur exacte attendue, sinon valeur de tolérance... voire AMC)
          }
        }
type 5 : idem type 3 avec présence comme pour le type 4 d'un attribut reponse.

type 6 : idem type 4 avec présence d'autres attributs réponse...
