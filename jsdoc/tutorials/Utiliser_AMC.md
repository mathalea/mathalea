AMC, ou [Auto Multiple Choice](https://www.auto-multiple-choice.net/exemples.fr) permet de corriger automatiquement des copies scannées d'élèves.

Vous pouvez voir l'étendue des possibilités sur [ce sujet 0](doc/Sujet0.tex) dont le but est d'apprendre aux élèves à correctement coder leurs réponses en vue d'une correction automatisée.

Depuis début 2021, MAthalea propose pour certains exercices, une version exportable pour AMC. 
Une interface a été faite pour permettre de sélectionner les exercices mathalea disponibles et créer automatiquement le fichier pour AMC.
Après avoir séléctionné les exercices souhaités, on peut récupérer directement le code latex affiché dans la fenêtre Latex afin de le coller dans votre éditeur de texte favori et le sauvegarder afin de l'utiliser pour votre sujet AMC.

Le bouton télécharger permet de récupérer une archive projet.zip qui contient le fichier mathalea.tex correspondant au contenu latex auquel est ajouté le package automultiplechoice.sty, lequel est nécessaire si vous voulez compiler le fichier avec overleaf qui ne connaît pas le package automultiplechoice.

Attention, pour corriger des copies, vous aurez besoin du logiciel automultiplechoice. Alors autant lancer la compilation dans AMC. Overleaf ne doit être utilisé que pour avoir un aperçu et détécter d'éventuels problèmes de compilation.

Dans l'interface du générateur AMC de Mathalea, des cases à cocher permettent de configurer le sujet en amont d'AMC :
- on peut choisir l'entête (pré-remplie nécessite un fichier liste.csv conforme au modèle préremplie d'AMC, avec le type AmcCodeGrid, une grille pour coder le nom de l'élève sera produite)
- on peut choisir le format A4 portrait ou A3 paysage avec 2 colonnes.
- on peut choisir combien de questions seront restituées pour chaque groupe de questions.
