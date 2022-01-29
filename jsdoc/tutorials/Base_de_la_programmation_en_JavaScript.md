1. Conventions
   * CamelCase
  Les identifiants doivent commencer par une lettre, un tiret bas "_" ou un symbole dollar "$"
  exemple : liste_type_de_questions ou bien listeTypeDeQuestions
   * Noms des variables et des fonctions explicites
 * listeQuestions, nouvelleVersion()
   * Initiale en majuscule pour les noms des classes
  

2. Éviter les copier-coller et factoriser son code
3. Les variables
   * Déclaration
  
        On donne pour le première fois le nom (identifiant) à une variable ou une fonction.

        ```java sript
        const listeTypeDeQuestions```
        Il est possible de faire plusieurs déclarations sur une même ligne :```java sript
        const listeTypeDeQuestions```     
        * Cela doit commencer par var, let ou const.
   * Affectation
  Ne pas confondre déclaration et appel
4. Les fonctions
   * Déclaration
  ```java scrit
  function Reglages6M23(){
	ExerciceConversionsAires.call(this);
	this.sup = 3;
	this.nbColsCorr = 1;
}
  ```
  ou bien
   ```java scrit
  const Reglages6M23 = function(){
	ExerciceConversionsAires.call(this);
	this.sup = 3;
	this.nbColsCorr = 1;
}
  ```
  ou bien
   ```java scrit
  const Reglages6M23 = ()=>{
	ExerciceConversionsAires.call(this);
	this.sup = 3;
	this.nbColsCorr = 1;
}
  ```

   * Appel
5. Programmation par classes
   * Les membres de classes
   * Les membres d'instances
6. Retour sur le moteur JavaScript
