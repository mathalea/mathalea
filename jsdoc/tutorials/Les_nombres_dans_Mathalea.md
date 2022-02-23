1. L'objet Number
les nombres sont des primitives du langage javascript. Ils sont stockés en utilisant le format IEEE-754 qui code un nombre en binaire avec 64 bits.
Le format IEEE-754 permet de représenter des valeurs entre ±2^−1022 et ±2^+1023, ce qui correspond à des valeurs entre ±10^−308 et ±10^+308 avec une précision sur 53 bits.
Pour faire simple, un tel nombre permet de récupérer un nombre décimal avec 18 chiffres.
L'utilisation du binaire pour stocker les nombres conduit à des erreurs d'arrondi de conversion.
Le classique exemple est : 0.1 + 0.2 = 0.30000000000000004
C'est tout a fait normal compte tenu de la façon dont sont stockés les nombres. Si le sujet vous intéresse, il y a cette vidéo qui explique très bien pourquoi : https://youtu.be/CDYiwshriWw
Nous verrons dans la prochaine partie quelle stratégie nous utilisons dans Mathalea pour éviter ces problèmes.

Les nombres entiers compris sur l'intervalle ±2^53 − 1 peuvent être représentés exactement sans erreur.

L'objet Number ajoute aux nombres des propriétés et des méthodes bien utiles :
Ces méthodes renvoie des chaines de caractères :
- Number(nombre).toFixed(n) permet de convertir le nombre à virgule flottante en un nombre à décimale fixe avec n chiffres dans la partie décimale :
Number(1.234e-23).toFixed(30) // -> '0.000000000000000000000012340000'
- Number().toLocaleString() permet de formater le nombre en fonction de la syntaxe locale, donc avec le séparateur décimal et les séparateur de classe.
- Number().toString() fait la même chose mais au format US soit avec le . comme séparateur décimal.
- Number().toPrecision(n) produit une chaine de caractère représentant le nombre avec n chiffres significatifs.
Number(123.456).toPrecision(5) // '123.46'
Number(123.456).toPrecision(2) // '1.2e+2' ici 2 chiffres significatifs sont insuffisant pour aller jusqu'à la virgule, d'où la notation scientifique.
- Number().toExponential(n) retourne une chaine contenant le nombre en notation scientifique.

2. Produire des calculs exacts.
Comme nous l'avons vu, le format IEEE-754 possède des limitations pour le stockage des nombres réels.
Depuis le début de l'aventure mathalea, nous avons essayé de rectifier ça.
La fonction calcul() était censée demander à Algebrite (une librairie de calcul formel puissante) d'effectuer les calculs. Or pour cela, il aurait fallu comme c'était prévu au départ, passer ce calcul sous la forme d'une chaine de caractères afin que javascript ne l'évalue pas avant Algebrite.
Dans les faits, nous avons utilisé cette fonction avec des calculs effectués en javascript. Dés lors, l'usage d'Algebrite devenait complètement inutile.
En effet : calcul(1/10 + 2/10) est tout simplement un calcul(0.30000000000000004) déguisé !
Pire, on s'est aperçu qu'Algebrite arrondissait alors le nombre à 10^-6, ce qui dans ce cas est convenable, mais dans des cas où la précision était plus importante, c'était la catastrophe.
Depuis, la fonction calcul() est devenue tout simplement une fonction qui arrondit le nombre à la précision souhaitée, qui ne peut cependant pas dépasser 10^-13 sans voir apparaitre les erreurs d'arrondis de conversion.
Mais cette solution a un talon d'Achille, car elle retourne un nombre en virgule flottante, qu'il faut stocker, et donc qui possède toujours ces erreurs d'arrondis.
Par exemple : calcul(0.1+0.1) retourne 0.2 mais si on y regarde d'un peu plus près :
calcul(0.1+0.1).toFixed(18) // -> '0.200000000000000011'
Bien sûr, nous n'avons pas besoin de 18 chiffres après la virgule pour Mathalea, d'ailleurs, quand de tels nombres surgissent à l'affichage, notre première réaction est d'aller tout de suite ajouter un arrondi nécessaire et suffisant pour rectifier l'erreur visible.

Peu importe en fait que le nombre possède des décimales indésirables à partir de la 12e ou 13e décimale, si on n'en affiche que 2 !
La solution, ici, c'est de limiter l'affichage aux seuls chiffres significatifs du résultat, c'est à dire 1 seul pour notre exemple.
Et pour cela, il n'y a vraiment pas besoin de la fonction calcul :
Number(0.1+0.1).toFixed(1).toLocaleString() // -> '0,3'

Ainsi, pour la plupart des nombres à produire en sortie html ou Latex, une fonction limitant le nombre de chiffres significatifs est tout ce qu'il faut.

Pour des calculs nécessitant plus de 13 chiffres significatifs on aura un problème puisqu'on approche de la zone de turbulences de la conversion binaire/décimale.
Il faudra alors employer les grands moyens : on passera par l'usage de la librairie decimals.js qui permet de travailler avec un format de stockage des nombres décimaux sous la forme d'un tableau de chiffres, et qui permet de réaliser tous les calculs avec autant de chiffres significatifs que nécessaire et qui sera développée dans la partie 4.

3. Affichage.

texNombre(nombre,precision) est la fonction de Mathalea qui s'occupera de formater les nombres en chaine de caractères exploitable en LaTeX. A ce titre, elle contient souvent des commandes Latex comme \numprint ou \thickspace qui sont du plus mauvais effet en html si la sortie de texNombre() ne passe pas par le transpileur LaTeX/html qu'est Katex.render(). Pour ce faire, elle doit impérativement s'utiliser à l'intérieur des délimiteurs $  $ qui encadrent toute expression LaTex.
L'alternative en texte brut (non interprêté par Katex.render()) est la fonction stringNombre()

Au départ, texNombre(nb) s'occupait de remplacer le séparateur décimal . par la virgule, et d'ajouter des espaces (\thickspace) comme séparateur de classe.

Une évolution de texNombre va, en plus, permettre de limiter le nombre de chiffres significatifs à afficher.
Usage: texNombre(nombre, nombreDeChiffresAprèsLaVirgule)

texNombre(0.1+0.2, 1) // -> '0,3'
texNombre(Math.pi, 3) // -> '3,142'

Attention de garder à l'esprit que le nombre maximum de chiffres significatifs pour un flottant est de 18, auxquels il faut retirer 3 chiffres pour les arrondis de conversion, et auxquels il faut retirer les chiffres déjà présent dans la partie entière.

Donc, pour un nombre comme 324 586,138 ça passe : 6 chiffres dans la partie entière, vous pouvez demander à texNombre une precision de 9 chiffres après la virgule.

Mais si vous mulitpliez ce nombre par 9 234 576,7 : on grimpe à 13 chiffres dans la partie entière et 4 dans la partie décimale... donc 17 chiffres ! il y a fort à parier que le chiffre des dix-millièmes ne soit pas 6 comme prévu.
C'est bien sûr une situation peu fréquente.
Autre exemple :
texNombre(Math.PI*11**15, 6) // ->'13\\thickspace 123\\thickspace 212\\thickspace 161\\thickspace 257\\thickspace 620' 
Le résultat affiché est un nombre entier car il n'y a pas assez de chiffres significatifs pour avoir 6 chiffres après la virgule !

4. La classe Decimal : une alternative aux erreurs de conversion des flottants.

La librairie decimal.js fournit une classe Decimal avec ses propriétés et ses méthodes, et surtout un format de stockage plus adapté que le binaire qui permet de travailler avec une précsion paramètrable.
Decimal.precision = 30 // Les instances de la classe décimal stockeront une mantisse à 30 chiffres ! (on peut monter beaucoup plus haut, mais chaque calcul va solliciter fortement le processeur)
let pi = Decimal().acos(-1).valueOf() // -> '3.14159265358979323846264338328' joli, non ?

La classe Decimal pourra être utilisée dés que Number() ne sera pas assez performant en terme de précision.

attention ! Pour bénéficier des avantages d'utiliser des instances de Decimal, il faudra se passer des opérateurs javascripts conventionnels.
En effet, si on définit a et b comme instances de Decimal, a+b sera un Number ! javascript va convertir a et b en Number avant de calculer la somme.
Pour obtenir un décimal, on utilisera les méthodes de la classe dont héritent les instances :
let somme = a.add(b) // somme est un Décimal. ici, c'est la méthode add de l'objet a qui est utilisée.
Une autre syntaxe :
let somme = Decimal.add(a,b) // ici, c'est la méthode de classe qui est utilisée.
let produit = a.multiply(b) ou Decimal.multiply(a,b)

Il n'est pas question pour l'instant d'utiliser texNombre() avec des objets de la classe Decimal (c'est dans ma TodoList).
Pour afficher de tels objets, on passera par la méthode toString() de l'objet.
Mais cette méthode utilise le format anglais avec le point comme séparateur décimal donc elle n'est pas très utile pour Mathalea sauf à traiter ensuite la chaine obtenue à l'aide d'un formateur maison.
Il semble qu'une méthode toLocaleString() soit prévue... mais pour l'instant, elle ne fonctionne pas avec 'fr-FR'.

Pour tester les possibilités de la classe Decimal, j'ai trouvé ce site https://mikemcl.github.io/decimal.js/ qui vous permet d'utiliser la classe Decimal directement dans la console car la classe est définie dans le code de la page html.

Il faut savoir que decimal.js est inclus dans les dependences de mathjs.js en version 7.1.1 mais dans mathalea à priori en version 10.3.1

import { Decimal } from 'decimal' devrait vous donner accès à la classe. (non testé)

