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
5. Programmation Orientée Objet
   C'est un paradigme basé sur l'encapsulation et la factorisation du code.
   La factorisation du code consiste à regrouper (c'est l'inverse du copié-collé), dans la mesure du possible, toutes les parties de code identiques ou qui font la même chose en un seul exemplaire afin d'être en mesure le plus facilement possible de :
   * corriger les bugs
   * ajouter ne nouvelles fonctionnalités
  

   * Programmation par classes
   Les membres de classe et d'instance
```java sript
// Déclaration et définition de la classe
class Objet4 {
  b = 2 // Variable d'instance
    static c = 3 // Variable de class

    // Déclaration et définition d'une méthode d'instance
  constructor (param) {
        this.a = param // Variable d'instance
  }
// Déclaration et définition d'une méthode d'instance
  methode () { // Méthode d'instance
    return "Je suis la methode d'instance définie dans la class"
  }
// Déclaration et définition d'une méthode de classe
  static methodeStatic () {// Méthode de class
    return 'Je suis la methode (static) définie dans la class'
  }
}

Objet4.prototype.autreMethodeDinstance = function () {
    return 'Je suis une autre méthode d\'instance définie à l\'extérieur de la class grâce au prototype'
}

Objet4.autreMethodeStatic = function () {
    return 'Je suis une autre méthode statique définie à l\'extérieur de la class directement sur l\'objet'
}

const monInstance2 = new Objet4(1)
console.log(`monInstance2 : ${monInstance2}`)
console.log(`monInstance2.a : ${monInstance2.a}`)
console.log(`monInstance2.b : ${monInstance2.b}`)
console.log(`monInstance2.c : ${monInstance2.c}`) // -> undefined
console.log(`monInstance2.methode() : ${monInstance2.methode()}`)
console.log(`monInstance2.autreMethodeDinstance() : ${monInstance2.autreMethodeDinstance()}`)
// console.log(`monInstance2.methodeStatic() : ${monInstance2.methodeStatic()}`) // Uncaught TypeError: monInstance2.methodeStatic is not a function
// console.log(`monInstance2.autreMethodeStatic() : ${monInstance2.autreMethodeStatic()}`) // -> Uncaught TypeError: monInstance2.autreMethodeStatic is not a function


1. Retour sur le moteur JavaScript
