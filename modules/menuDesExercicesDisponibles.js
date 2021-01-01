import { tridictionnaire, filtreDictionnaire }  from "./outils.js" ;
export let dictionnaireDesExercices = {"4G53":{"url":"/exercices/4e/4G53.js","titre":"Calculs de volumes"},"4C30":{"url":"/exercices/4e/4C30.js","titre":"Puissances de 10 : Le sens des règles de calculs"},"4C10-2":{"url":"/exercices/4e/4C10-2.js","titre":"Signe d'un quotient de nombres relatifs"},"4P10-1":{"url":"/exercices/4e/4P10-1.js","titre":"Résoudre un problème de proportionnalité à l'aide d'un graphique"},"4G11":{"url":"/exercices/4e/4G11.js","titre":"Trouver l\'image d'une figure par une translation dans un pavage"},"4C33-3":{"url":"/exercices/4e/4C33-3.js","titre":"Puissances : Calculs automatisés et règles de calculs"},"4C33-1":{"url":"/exercices/4e/4C33-1.js","titre":"Puissances : Le sens des règles de calculs"},"4L14-2":{"url":"/exercices/4e/4L14-2.js","titre":"Tester si un nombre est solution d'une équation du second degré"},"4L10-1":{"url":"/exercices/4e/4L10-1.js","titre":"Réduire, si possible, une expression littérale simple"},"4L20":{"url":"/exercices/4e/4L20.js","titre":"Équation du premier degré"},"4C25-0":{"url":"/exercices/4e/4C25-0.js","titre":"Problèmes additifs et de comparaison sur les rationnels"},"4G31":{"url":"/exercices/4e/4G31.js","titre":"Contrôler si deux droites sont parallèles"},"4C11":{"url":"/exercices/4e/4C11.js","titre":"Calculs utilisant les priorités opératoires"},"4G40":{"url":"/exercices/4e/4G40.js","titre":"Utiliser le cosinus pour calculer une longueur dans un triangle rectangle"},"4C22-1":{"url":"/exercices/4e/4C22-1.js","titre":"Trouver l'inverse d'un nombre"},"4C32-1":{"url":"/exercices/4e/4C32-1.js","titre":"Calcul avec les puissances de dix"},"4G30-1":{"url":"/exercices/4e/4G30-1.js","titre":"Calculer des longueurs avec la propriété de Thalès (MG32)"},"4F12":{"url":"/exercices/4e/4F12.js","titre":"Problème s'appuyant sur la lecture d'une représentation graphique"},"4P10-2":{"url":"/exercices/4e/4P10-2.js","titre":"Déterminer une quatrième proportionnelle dans un tableau"},"4G22":{"url":"/exercices/4e/4G22.js","titre":"Problèmes utilisant le théorème de Pythagore"},"4C23":{"url":"/exercices/4e/4C23.js","titre":"Fractions et priorités opératoires"},"4C32":{"url":"/exercices/4e/4C32.js","titre":"Notation scientifique"},"4L10":{"url":"/exercices/4e/4L10.js","titre":"Utiliser la simple distributivité"},"4C30-3":{"url":"/exercices/4e/4C30-3.js","titre":"Écriture décimale d'une puissance"},"4L14-0":{"url":"/exercices/4e/4L14-0.js","titre":"Tester si un nombre est solution d'une équation"},"4L13-0":{"url":"/exercices/4e/4L13-0.js","titre":"Mettre en équation un problème sans objectif de résolution"},"4C30-1":{"url":"/exercices/4e/4C30-1.js","titre":"Encadrer avec des puissances de 10"},"4G10":{"url":"/exercices/4e/4G10.js","titre":"Trouver l'image d'un point par une symétrie axiale ou centrale ou par une translation"},"4G20-2":{"url":"/exercices/4e/4G20-2.js","titre":"Racine carré d'un carré parfait (calcul mental)"},"4G21":{"url":"/exercices/4e/4G21.js","titre":"Déterminer si un triangle est rectangle ou pas."},"4C21":{"url":"/exercices/4e/4C21.js","titre":"Additionner ou soustraire deux fractions"},"4C30-2":{"url":"/exercices/4e/4C30-2.js","titre":"Écriture décimale d'une puissance de 10"},"4L14-1":{"url":"/exercices/4e/4L14-1.js","titre":"Tester si un nombre est solution d'une équation du premier degré"},"4C10-1":{"url":"/exercices/4e/4C10-1.js","titre":"Signe d'un produit de nombres relatifs"},"4G30":{"url":"/exercices/4e/4G30.js","titre":"Calculer des longueurs avec la propriété de Thalès"},"4G20MG32":{"url":"/exercices/4e/4G20MG32.js","titre":"Calculer une longueur avec l'égalité de Pythagore (MG32)"},"4C10-5":{"url":"/exercices/4e/4C10-5.js","titre":"Multiplications de deux entiers relatifs dans un tableau à double entrée"},"4G20-1":{"url":"/exercices/4e/4G20-1.js","titre":"Donner ou compléter une égalité de Pythagore"},"4C10-3":{"url":"/exercices/4e/4C10-3.js","titre":"Multiplication de deux entiers relatifs"},"4G11-1":{"url":"/exercices/4e/4G11-1.js","titre":"Trouver l'image d'une figure par une translation dans un pavage (sortie Latex impossible)"},"4C21-1":{"url":"/exercices/4e/4C21-1.js","titre":"Additionner deux fractions"},"4C22":{"url":"/exercices/4e/4C22.js","titre":"Mutliplier des fractions"},"4G20":{"url":"/exercices/4e/4G20.js","titre":"Calculer une longueur avec le théorème de Pythagore"},"4G41":{"url":"/exercices/4e/4G41.js","titre":"Utiliser le cosinus pour calculer la mesure d'un angle dans un triangle rectangle"},"4G51":{"url":"/exercices/4e/4G51.js","titre":"Représenter un solide"},"4C22-2":{"url":"/exercices/4e/4C22-2.js","titre":"Diviser des fractions"},"4C10-0":{"url":"/exercices/4e/4C10-0.js","titre":"Signe d'un produit ou d'un quotient de nombres relatifs"},"4L13-1":{"url":"/exercices/4e/4L13-1.js","titre":"Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue"},"4Algo1-0":{"url":"/exercices/4e/4Algo1-0.js","titre":"Dessiner avec scratch"},"4C10-4":{"url":"/exercices/4e/4C10-4.js","titre":"Quotient de deux entiers relatifs"},"4L15-1":{"url":"/exercices/4e/4L15-1.js","titre":"Equations du type $\\dfrac{x}{a}=\\dfrac{b}{c}$"},"4P10":{"url":"/exercices/4e/4P10.js","titre":"Résoudre des problèmes de grandeurs composées et de conversion d'unités complexes"},"4L15-0":{"url":"/exercices/4e/4L15-0.js","titre":"Trouver l'erreur dans une résolution d'équation du premier degré"},"1E10":{"url":"/exercices/1e/1E10.js","titre":"Calcul du discriminant d'une équation du second degré"},"1E12":{"url":"/exercices/1e/1E12.js","titre":"Trouver l'équation d'une parabole"},"1E11":{"url":"/exercices/1e/1E11.js","titre":"Résoudre une équation du second degré"},"1N11":{"url":"/exercices/1e/1N11.js","titre":"Déterminer les termes d'une suite définie par récurrence"},"1N10":{"url":"/exercices/1e/1N10.js","titre":"Déterminer les termes d'une suite définie de façon explicite"},"1F10":{"url":"/exercices/1e/1F10.js","titre":"Calculs de dérivés"},"PEA11-1":{"url":"/exercices/PE/PEA11-1.js","titre":"Passer de la base 12 ou 16 à la base 10 et inversement"},"PEA11":{"url":"/exercices/PE/PEA11.js","titre":"Passer de la base 10 à une autre base et inversement"},"CM012":{"url":"/exercices/CM/CM012.js","titre":"Complément à 100"},"CM000":{"url":"/exercices/CM/CM000.js","titre":"Additions et de soustractions"},"CM013":{"url":"/exercices/CM/CM013.js","titre":"Complément à une dizaine"},"CM003":{"url":"/exercices/CM/CM003.js","titre":"Tables de multiplications et de divisions"},"CM019":{"url":"/exercices/CM/CM019.js","titre":"Générateur de compte est bon"},"CM005":{"url":"/exercices/CM/CM005.js","titre":"Ajouter 9"},"CM002":{"url":"/exercices/CM/CM002.js","titre":"Tables de divisions"},"CM016":{"url":"/exercices/CM/CM016.js","titre":"Diviser un entier par 10, 100 ou 1000"},"CM014":{"url":"/exercices/CM/CM014.js","titre":"Double, moitié, tiers, triple"},"CM018":{"url":"/exercices/CM/CM018.js","titre":"Somme de deux nombres mariés et un entier"},"CM011":{"url":"/exercices/CM/CM011.js","titre":"Quart"},"CM015":{"url":"/exercices/CM/CM015.js","titre":"Somme de deux nombres mariés"},"CM006":{"url":"/exercices/CM/CM006.js","titre":"Soustraire 9"},"CM017":{"url":"/exercices/CM/CM017.js","titre":"Diviser un nombre décimal par 10, 100 ou 1000"},"CM010":{"url":"/exercices/CM/CM010.js","titre":"Tiers"},"CM004":{"url":"/exercices/CM/CM004.js","titre":"Les quatre opérations"},"CM009":{"url":"/exercices/CM/CM009.js","titre":"Moitié"},"CM001":{"url":"/exercices/CM/CM001.js","titre":"Tables de multiplication"},"CM020":{"url":"/exercices/CM/CM020.js","titre":"Générateur de compte est bon version semi-aléatoire"},"CM021":{"url":"/exercices/CM/CM021.js","titre":"Le compte est bon original"},"CM008":{"url":"/exercices/CM/CM008.js","titre":"Soustraire 11"},"CM007":{"url":"/exercices/CM/CM007.js","titre":"Ajouter 11"},"c3N22":{"url":"/exercices/c3/c3N22.js","titre":"Lire abscisse décimale sous trois formes"},"c3C10-2":{"url":"/exercices/c3/c3C10-2.js","titre":"Labyrinthe de multiples"},"c3N23":{"url":"/exercices/c3/c3N23.js","titre":"Lire abscisse décimale avec zoom"},"c3C11":{"url":"/exercices/c3/c3C11.js","titre":"Divisions euclidiennes"},"c3N10":{"url":"/exercices/c3/c3N10.js","titre":"Écrire un nombre en chiffres ou en lettres"},"c3C10-4":{"url":"/exercices/c3/c3C10-4.js","titre":"Tables d'addition"},"c3C10-1":{"url":"/exercices/c3/c3C10-1.js","titre":"Tables de multiplications"},"P004":{"url":"/exercices/Profs/P004.js","titre":"Droites graduées avec zoom"},"P007":{"url":"/exercices/Profs/P007.js","titre":"Fabriquer des pavages pour travailler les transformations"},"P003":{"url":"/exercices/Profs/P003.js","titre":"Tracer des droites graduées"},"P005":{"url":"/exercices/Profs/P005.js","titre":"Grilles décimales"},"P006":{"url":"/exercices/Profs/P006.js","titre":"Placer un nombre décimal avec des zooms successifs"},"moule_a_exo_mathalea2d":{"url":"/exercices/beta/moule_a_exo_mathalea2d.js","titre":"Mettre ici le titre écrit dans le menu Mathalea"},"beta4C31":{"url":"/exercices/beta/beta4C31.js","titre":"Puissances de 10"},"betaExercice_constructions_basiques":{"url":"/exercices/beta/betaExercice_constructions_basiques.js","titre":"Programmes de constructions (en chantier)"},"beta2G13":{"url":"/exercices/beta/beta2G13.js","titre":"Déterminer les coordonnées d'un vecteur."},"beta6test2":{"url":"/exercices/beta/beta6test2.js","titre":"Mon test"},"beta4N10":{"url":"/exercices/beta/beta4N10.js","titre":"Arrondir une valeur numérique"},"6C23":{"url":"/exercices/6e/6C23.js","titre":"Reconnaitre un quadrilatère particulier à partir de ses propriétés"},"6N10":{"url":"/exercices/6e/6N10.js","titre":"Écrire un nombre en chiffres ou en lettres"},"6N23-1":{"url":"/exercices/6e/6N23-1.js","titre":"Différentes écritures des nombres décimaux"},"6N20-1":{"url":"/exercices/6e/6N20-1.js","titre":"Encadrer une fraction entre deux nombres entiers"},"6N11":{"url":"/exercices/6e/6N11.js","titre":"Lire l'abscisse entière d'un point (grands nombres)"},"6D101":{"url":"/exercices/6e/6D101.js","titre":"Utiliser les heures décimales"},"6N33-0":{"url":"/exercices/6e/6N33-0.js","titre":"Calculer la fraction d'une quantité"},"6M31":{"url":"/exercices/6e/6M31.js","titre":"Conversions de volume"},"6M22-2":{"url":"/exercices/6e/6M22-2.js","titre":"Périmètres et aires de portions de cercles"},"6M10":{"url":"/exercices/6e/6M10.js","titre":"Calculer des périmètres et des aires de figures usuelles"},"6N41-1":{"url":"/exercices/6e/6N41-1.js","titre":"Labyrinthe de fractions égales"},"6N30-1":{"url":"/exercices/6e/6N30-1.js","titre":"Lire l'abscisse décimale d'un point repéré par une fraction"},"6N23":{"url":"/exercices/6e/6N23.js","titre":"Donner l'écriture décimale d'une fraction décimale"},"6N31":{"url":"/exercices/6e/6N31.js","titre":"Comparer des nombres décimaux"},"6G25-3":{"url":"/exercices/6e/6G25-3.js","titre":"Trouver l'image d'une figure par une symétrie axiale dans un pavage"},"6M30":{"url":"/exercices/6e/6M30.js","titre":"Calculs de volumes"},"6N10-1":{"url":"/exercices/6e/6N10-1.js","titre":"Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers..."},"6G24-3":{"url":"/exercices/6e/6G24-3.js","titre":"Construire le symétrique d'un point avec cible auto-corrective"},"6G42":{"url":"/exercices/6e/6G42.js","titre":"Connaître les propriétés du cube et du pavé droit"},"6N34":{"url":"/exercices/6e/6N34.js","titre":"Conversions avec tous les préfixes de milli à tera."},"6N10-5":{"url":"/exercices/6e/6N10-5.js","titre":"Labyrinthe de numération décimale"},"6G23-2":{"url":"/exercices/6e/6G23-2.js","titre":"Tracer un triangle dont on connait une longueur et 2 angles"},"6C11":{"url":"/exercices/6e/6C11.js","titre":"Divisions euclidiennes"},"6N24":{"url":"/exercices/6e/6N24.js","titre":"Utiliser les préfixes multiplicateurs et diviseurs (milli à kilo)"},"6C21":{"url":"/exercices/6e/6C21.js","titre":"Divisions euclidiennes - Niveau 2"},"6N11-2":{"url":"/exercices/6e/6N11-2.js","titre":"Placer un point d'abscisse entière (grands nombres)"},"6D11":{"url":"/exercices/6e/6D11.js","titre":"Additionner des durées"},"6N30":{"url":"/exercices/6e/6N30.js","titre":"Lire l'abscisse décimale d'un point"},"6N33-2":{"url":"/exercices/6e/6N33-2.js","titre":"Problèmes de calcul de pourcentage par complément à 100%"},"6G25":{"url":"/exercices/6e/6G25.js","titre":"Construire des médiatrices avec cible auto-corrective"},"6N31-4":{"url":"/exercices/6e/6N31-4.js","titre":"Intercaler un nombre décimal entre deux nombres décimaux"},"6G33":{"url":"/exercices/6e/6G33.js","titre":"Reconnaitre un quadrilatère particulier à partir de ses propriétés"},"6G21-1":{"url":"/exercices/6e/6G21-1.js","titre":"Construire un triangle avec cible"},"6Algo10":{"url":"/exercices/6e/6Algo10.js","titre":"Programmer des déplacements"},"6N21":{"url":"/exercices/6e/6N21.js","titre":"Lire l'abscisse fractionnaire d'un point"},"6C10-1":{"url":"/exercices/6e/6C10-1.js","titre":"Tables de multiplication"},"6P11":{"url":"/exercices/6e/6P11.js","titre":"Résoudre des problèmes de proportionnalité en utilisant la linéarité simple"},"6N14":{"url":"/exercices/6e/6N14.js","titre":"Représenter des fractions"},"6G10":{"url":"/exercices/6e/6G10.js","titre":"Notation des droites, segments et demi-droites"},"6M20":{"url":"/exercices/6e/6M20.js","titre":"Aires de triangles"},"6G10-1":{"url":"/exercices/6e/6G10-1.js","titre":"Description et notation des droites, segments et demi-droites"},"6N33-3":{"url":"/exercices/6e/6N33-3.js","titre":"Problèmes avec des calculs de pourcentages"},"6N20-2":{"url":"/exercices/6e/6N20-2.js","titre":"Décomposer une fraction (partie entière + fraction inférieure à 1) puis donner l'écriture décimale."},"6C10-4":{"url":"/exercices/6e/6C10-4.js","titre":"Addition de deux entiers"},"6N10-4":{"url":"/exercices/6e/6N10-4.js","titre":"Écrire correctement les grands nombres entiers."},"6N43":{"url":"/exercices/6e/6N43.js","titre":"Critères de divisibilité"},"6G32-1":{"url":"/exercices/6e/6G32-1.js","titre":"Propriétés de conservation de la symétrie axiale"},"6N43-2":{"url":"/exercices/6e/6N43-2.js","titre":"Critères de divisibilité (plusieurs possibles)"},"6G10-2":{"url":"/exercices/6e/6G10-2.js","titre":"Utiliser le codage pour décrire une figure"},"6N10-2":{"url":"/exercices/6e/6N10-2.js","titre":"Décomposer un nombre décimal (nombre de..., chiffre de...)"},"6C13":{"url":"/exercices/6e/6C13.js","titre":"Traduire des phrases en calculs et réciproquement"},"6N12":{"url":"/exercices/6e/6N12.js","titre":"Multiplier un entier par 10, 100, 1 000..."},"6G43":{"url":"/exercices/6e/6G43.js","titre":"Connaître les propriétés du cube et du pavé droit"},"6N10-3":{"url":"/exercices/6e/6N10-3.js","titre":"Chiffre des ... Nombre de ..."},"6C30":{"url":"/exercices/6e/6C30.js","titre":"Multiplications posées de nombres décimaux"},"6N32":{"url":"/exercices/6e/6N32.js","titre":"Représenter une fraction de l'unité"},"6P11-1":{"url":"/exercices/6e/6P11-1.js","titre":"Résoudre un problème relevant de la proportionnalité avec les propriétés de linéarité."},"6C10-2":{"url":"/exercices/6e/6C10-2.js","titre":"Tables de multiplications et multiples de 10"},"6C10":{"url":"/exercices/6e/6C10.js","titre":"Additions, soustractions et multiplications posées de nombres entiers"},"6G11":{"url":"/exercices/6e/6G11.js","titre":"Tracer des perpendiculaires"},"6C31-2":{"url":"/exercices/6e/6C31-2.js","titre":"Donner des valeurs approchées d'un quotient décimal"},"6N23-2":{"url":"/exercices/6e/6N23-2.js","titre":"Lire des abscisses décimales sous trois formes"},"6N22-1":{"url":"/exercices/6e/6N22-1.js","titre":"Rapport de deux longueurs sur un segment"},"6C10bis":{"url":"/exercices/6e/6C10bis.js","titre":"Additions, soustractions, multiplications et divisions posées de nombres entiers"},"6N31-2":{"url":"/exercices/6e/6N31-2.js","titre":"Ordre de grandeur et opérations sur les décimaux"},"6N11-3":{"url":"/exercices/6e/6N11-3.js","titre":"Encadrer un entier entre deux entiers consécutifs"},"6N20":{"url":"/exercices/6e/6N20.js","titre":"Décomposer une fraction (partie entière + fraction inférieure à 1)."},"6M25":{"url":"/exercices/6e/6M25.js","titre":"Connaitre le cours sur le périmètre et l'aire"},"6N41":{"url":"/exercices/6e/6N41.js","titre":"Égalités entre fractions simples"},"6G41":{"url":"/exercices/6e/6G41.js","titre":"Compléter une représentation en perspective cavalière"},"6C10-5":{"url":"/exercices/6e/6C10-5.js","titre":"Labyrinthe de multiples"},"6G20-2":{"url":"/exercices/6e/6G20-2.js","titre":"Vocabulaire des triangles"},"6C32":{"url":"/exercices/6e/6C32.js","titre":"Problème - Les courses"},"6G24":{"url":"/exercices/6e/6G24.js","titre":"Trouver l'image d'un point par une symétrie axiale"},"6N24-1":{"url":"/exercices/6e/6N24-1.js","titre":"Multiplier ou diviser un nombre entier par 10, 100 ou 1 000"},"6G12-1":{"url":"/exercices/6e/6G12-1.js","titre":"Tracer des parallèles et des perpendiculaires"},"6N31-1":{"url":"/exercices/6e/6N31-1.js","titre":"Encadrer un décimal par deux entiers consécutifs"},"6N31-3":{"url":"/exercices/6e/6N31-3.js","titre":"Arrondir une valeur"},"6N23-3":{"url":"/exercices/6e/6N23-3.js","titre":"Lire une abscisse décimale grâce à des zooms successifs"},"6G25-1":{"url":"/exercices/6e/6G25-1.js","titre":"Trouver l'image d'une figure par une symétrie axiale dans un pavage triangulaire (sortie Latex Impossible)"},"6M12":{"url":"/exercices/6e/6M12.js","titre":"Conversions de longueurs"},"6G24-2":{"url":"/exercices/6e/6G24-2.js","titre":"Construire le symétrique d'une figure par rapport à une droite (cas simples)"},"6S10":{"url":"/exercices/6e/6S10.js","titre":"Lire un diagramme en barre"},"6N11-4":{"url":"/exercices/6e/6N11-4.js","titre":"Ranger une liste de nombres entiers dans l'ordre croissant ou décroissant"},"6C10-3":{"url":"/exercices/6e/6C10-3.js","titre":"Tables de multiplications et nombres décimaux"},"6M11-1":{"url":"/exercices/6e/6M11-1.js","titre":"Périmètres et aires carrés, rectangles et triangles rectangles"},"6N23-4":{"url":"/exercices/6e/6N23-4.js","titre":"Donner l'écriture décimale d'un nombre à partir de différents textes"},"6C33":{"url":"/exercices/6e/6C33.js","titre":"Calculer en utilisant les priorités opératoires"},"6M11-2":{"url":"/exercices/6e/6M11-2.js","titre":"Périmètres et aires de figures composées"},"6C31":{"url":"/exercices/6e/6C31.js","titre":"Divisions décimales"},"6D12":{"url":"/exercices/6e/6D12.js","titre":"Calculer des durées ou déterminer un horaire"},"6M23":{"url":"/exercices/6e/6M23.js","titre":"Conversions d'aires"},"6G24-1":{"url":"/exercices/6e/6G24-1.js","titre":"Construire le symétrique d'un point par rapport à une droite (cas simples)"},"6D10":{"url":"/exercices/6e/6D10.js","titre":"Convertir des durées"},"6N33":{"url":"/exercices/6e/6N33.js","titre":"Calculer la fraction d'un nombre"},"6S11":{"url":"/exercices/6e/6S11.js","titre":"Organiser des données dans un tableau"},"6G25-2":{"url":"/exercices/6e/6G25-2.js","titre":"Trouver l'image d'une figure par une symétrie axiale dans un pavage carré (sortie Latex Impossible)"},"6G14":{"url":"/exercices/6e/6G14.js","titre":"Utiliser les propriétés des droites perpendiculaires"},"6M22":{"url":"/exercices/6e/6M22.js","titre":"Périmètres et aires de disques (à partir d'un texte)."},"6C30-1":{"url":"/exercices/6e/6C30-1.js","titre":"Multiplications d'un nombre décimal par 10, 100 ou 1 000."},"6G20":{"url":"/exercices/6e/6G20.js","titre":"Nommer et coder des polygones"},"6G21":{"url":"/exercices/6e/6G21.js","titre":"Construire un triangle aux instruments"},"6C20":{"url":"/exercices/6e/6C20.js","titre":"Additions et soustractions de nombres décimaux"},"6N23-0":{"url":"/exercices/6e/6N23-0.js","titre":"Écrire un nombre décimal en chiffres ou en lettres"},"6G12":{"url":"/exercices/6e/6G12.js","titre":"Tracer des parallèles"},"6N13":{"url":"/exercices/6e/6N13.js","titre":"Conversions de longueurs, masses, contenance, prix ou unités informatiques"},"6P10":{"url":"/exercices/6e/6P10.js","titre":"Reconnaître une situation de proportionnalité"},"6M22-1":{"url":"/exercices/6e/6M22-1.js","titre":"Périmètres et aires de disques"},"6C30-2":{"url":"/exercices/6e/6C30-2.js","titre":"Calculer le produit de deux décimaux connaissant le produit de deux entiers"},"6N30-2":{"url":"/exercices/6e/6N30-2.js","titre":"Placer un point d'abscisse décimale"},"6M31-2":{"url":"/exercices/6e/6M31-2.js","titre":"Conversions avec des unités de volumes ou de capacités"},"6N22-2":{"url":"/exercices/6e/6N22-2.js","titre":"Mettre bout à bout des segments"},"6N33-1":{"url":"/exercices/6e/6N33-1.js","titre":"Calculer le pourcentage d'un nombre de tête"},"5C11":{"url":"/exercices/5e/5C11.js","titre":"Traduire une phrase par une expression"},"5R22":{"url":"/exercices/5e/5R22.js","titre":"Additions et soustractions de nombres relatifs"},"5R10-0":{"url":"/exercices/5e/5R10-0.js","titre":"Trouver l'opposé d'un nombre relatif"},"5R20-3":{"url":"/exercices/5e/5R20-3.js","titre":"Additions de 5 nombres relatifs"},"5C12":{"url":"/exercices/5e/5C12.js","titre":"Calculer une expression numérique en détaillant les calculs"},"5G11-1":{"url":"/exercices/5e/5G11-1.js","titre":"Construire le symétrique d'un point par symétrie centrale"},"5L15":{"url":"/exercices/5e/5L15.js","titre":"Tester une égalité"},"5G10":{"url":"/exercices/5e/5G10.js","titre":"Trouver l'image d'un point par une symétrie axiale"},"5R11-2":{"url":"/exercices/5e/5R11-2.js","titre":"Placer un point d'abscisse un nombre relatif"},"5L14-6":{"url":"/exercices/5e/5L14-6.js","titre":"Déterminer la dernière opération à effectuer dans une expression numérique"},"5C12-1":{"url":"/exercices/5e/5C12-1.js","titre":"Traduire une phrase par une expression et la calculer"},"5S14":{"url":"/exercices/5e/5S14.js","titre":"Calculer des moyennes"},"5M10":{"url":"/exercices/5e/5M10.js","titre":"Aire du parallélogramme"},"5N14":{"url":"/exercices/5e/5N14.js","titre":"Comparer des fractions (dénominateurs multiples)"},"5G30":{"url":"/exercices/5e/5G30.js","titre":"Utiliser le codage pour décrire une figure"},"5L14-5":{"url":"/exercices/5e/5L14-5.js","titre":"Calculer la valeur d'une expression littérale de degré 1 à 1 inconnue"},"5L14-3":{"url":"/exercices/5e/5L14-3.js","titre":"Traduire une phrase par une expression et la calculer"},"5L10-3":{"url":"/exercices/5e/5L10-3.js","titre":"Traduire une expression par une phrase"},"5N20":{"url":"/exercices/5e/5N20.js","titre":"Additionner ou soustraire deux fractions (dénominateurs multiples)"},"5G11-2":{"url":"/exercices/5e/5G11-2.js","titre":"Construire l'image d'une figure par symétrie centrale"},"5A11-1":{"url":"/exercices/5e/5A11-1.js","titre":"Labyrinthe de multiples basé sur les critères de divisibilité"},"5L12":{"url":"/exercices/5e/5L12.js","titre":"Réduire une expression littérale"},"5A11":{"url":"/exercices/5e/5A11.js","titre":"Critères de divisibilité"},"5G10-2":{"url":"/exercices/5e/5G10-2.js","titre":"Construire le symétrique d'une figure par rapport à une droite"},"5L14-4":{"url":"/exercices/5e/5L14-4.js","titre":"Déterminer la dernière opération à effectuer dans une expression littérale"},"5L12-1":{"url":"/exercices/5e/5L12-1.js","titre":"Réduire un produit et une somme à partir des mêmes éléments algébriques pour distinguer la différence"},"5N14-2":{"url":"/exercices/5e/5N14-2.js","titre":"Comparer quatre fractions (dénominateurs multiples) et un nombre entier"},"5R12-2":{"url":"/exercices/5e/5R12-2.js","titre":"Déterminer les coordonnées (relatives) d'un point"},"5R10":{"url":"/exercices/5e/5R10.js","titre":"Trouver le terme manquant d'une somme de nombres relatifs"},"5L10-4":{"url":"/exercices/5e/5L10-4.js","titre":"Produire une formule à partir d'un tableau"},"5G11-3":{"url":"/exercices/5e/5G11-3.js","titre":"Construire le symétrique d'un point avec cible auto-corrective"},"5A10":{"url":"/exercices/5e/5A10.js","titre":"Écrire la liste de tous les diviseurs d'un entier."},"5A12-1":{"url":"/exercices/5e/5A12-1.js","titre":"Primalité ou pas"},"5S13":{"url":"/exercices/5e/5S13.js","titre":"Calculer des fréquences"},"5M20":{"url":"/exercices/5e/5M20.js","titre":"Calculs de volumes"},"5G11":{"url":"/exercices/5e/5G11.js","titre":"Trouver l'image d'un point par une symétrie axiale ou centrale"},"5N11-1":{"url":"/exercices/5e/5N11-1.js","titre":"Tableaux et pourcentages - prix constant"},"5G12-1":{"url":"/exercices/5e/5G12-1.js","titre":"Symétrique d'une figure dans un pavage avec correction animée (sortie Latex Impossible)"},"5L14-1":{"url":"/exercices/5e/5L14-1.js","titre":"Calculer une expression littérale pour les valeurs données en détaillant les calculs"},"5P10":{"url":"/exercices/5e/5P10.js","titre":"Tableaux et proportionnalité."},"5G20":{"url":"/exercices/5e/5G20.js","titre":"Construire un triangle avec cible auto-corrective"},"5G20-1":{"url":"/exercices/5e/5G20-1.js","titre":"Vocabulaire des triangles"},"5G51":{"url":"/exercices/5e/5G51.js","titre":"Compléter une représentation en perspective cavalière"},"5G21-1":{"url":"/exercices/5e/5G21-1.js","titre":"Constructibilité des triangles via les longueurs"},"5L10":{"url":"/exercices/5e/5L10.js","titre":"Écrire une expression littérale"},"5N13":{"url":"/exercices/5e/5N13.js","titre":"Simplification de fractions"},"5L10-2":{"url":"/exercices/5e/5L10-2.js","titre":"Traduire un programme de calcul par une expression littérale"},"5R11":{"url":"/exercices/5e/5R11.js","titre":"Lire l'abscisse relative d'un point"},"5R20-4":{"url":"/exercices/5e/5R20-4.js","titre":"Résoudre un problème en utilisant une somme algébrique de relatifs."},"5G10-1":{"url":"/exercices/5e/5G10-1.js","titre":"Construire le symétrique d'un point par rapport à une droite"},"5R20-5":{"url":"/exercices/5e/5R20-5.js","titre":"Additions de deux entiers relatifs dans un tableau à double entrée"},"5R20":{"url":"/exercices/5e/5R20.js","titre":"Addition de deux entiers relatifs"},"5L10-1":{"url":"/exercices/5e/5L10-1.js","titre":"Traduire une phrase par une expression"},"5R12":{"url":"/exercices/5e/5R12.js","titre":"Déterminer les coordonnées (positives) d'un point"},"5S20":{"url":"/exercices/5e/5S20.js","titre":"Placer un événement sur une échelle de probabilités"},"5A13":{"url":"/exercices/5e/5A13.js","titre":"Décomposition en facteurs premiers"},"5G12":{"url":"/exercices/5e/5G12.js","titre":"Trouver l'image d'une figure par symétrie centrale dans un pavage"},"5G31-1":{"url":"/exercices/5e/5G31-1.js","titre":"Constructibilité des triangles via les angles"},"5N110":{"url":"/exercices/5e/5N110.js","titre":"Variation en pourcentages"},"5L14":{"url":"/exercices/5e/5L14.js","titre":"Calculer la valeur d'une expression littérale"},"5L14-2":{"url":"/exercices/5e/5L14-2.js","titre":"Substitution"},"5L13":{"url":"/exercices/5e/5L13.js","titre":"Réduire une expression de la forme $ax+bx$"},"5S21":{"url":"/exercices/5e/5S21.js","titre":"Calculer des probabilités dans une expérience aléatoire à une épreuve"},"5R22-2":{"url":"/exercices/5e/5R22-2.js","titre":"Simplifier l'écriture d'une somme de 2 relatifs et calculer"},"5N11-2":{"url":"/exercices/5e/5N11-2.js","titre":"Tableaux et pourcentages - pourcentage constant"},"5R21":{"url":"/exercices/5e/5R21.js","titre":"Soustraction de deux entiers relatifs"},"5G22":{"url":"/exercices/5e/5G22.js","titre":"Déterminer la nature d'une droite remarquable"},"5C11-2":{"url":"/exercices/5e/5C11-2.js","titre":"Traduire une succession des opérations par une expression"},"5R20-2":{"url":"/exercices/5e/5R20-2.js","titre":"Addition à trou de deux entiers relatifs"},"5N20-0":{"url":"/exercices/5e/5N20-0.js","titre":"Résoudre un problème en utilisant des fractions"},"5G31":{"url":"/exercices/5e/5G31.js","titre":"Somme des angles dans un triangle"},"5G30-1":{"url":"/exercices/5e/5G30-1.js","titre":"Déterminer des angles en utilisant les cas d'égalité"},"5N13-2":{"url":"/exercices/5e/5N13-2.js","titre":"Égalités entre fractions simples"},"5C11-1":{"url":"/exercices/5e/5C11-1.js","titre":"Traduire une expression par une phrase"},"3F12-2":{"url":"/exercices/3e/3F12-2.js","titre":"Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique"},"3A13":{"url":"/exercices/3e/3A13.js","titre":"Engrenages"},"3G10-1":{"url":"/exercices/3e/3G10-1.js","titre":"Trouver les coordonnées de l'image d'un point par une transformation du plan"},"3F21-1":{"url":"/exercices/3e/3F21-1.js","titre":"Déterminer une fonction affine"},"3A11-1":{"url":"/exercices/3e/3A11-1.js","titre":"Primalité ou pas - Variante avec les critères de divisibilité par 7 et par 11"},"3P10-1":{"url":"/exercices/3e/3P10-1.js","titre":"Coefficient multiplicateur d'une variation en pourcentage"},"3G12-1":{"url":"/exercices/3e/3G12-1.js","titre":"Trouver l'image d'une figure par une rotation de 90 degrés dans un pavage (sortie Latex Impossible)"},"3A10":{"url":"/exercices/3e/3A10.js","titre":"Division Euclidienne - Diviseurs - Multiples"},"3A12":{"url":"/exercices/3e/3A12.js","titre":"Fractions irréductibles"},"3L14":{"url":"/exercices/3e/3L14.js","titre":"Résoudre une équation produit nul"},"3L13-2":{"url":"/exercices/3e/3L13-2.js","titre":"Equations résolvantes pour le théorème de Thalès"},"3G22":{"url":"/exercices/3e/3G22.js","titre":"Connaître les effets des agrandissements/réductions sur les aires et les volumes"},"3F12":{"url":"/exercices/3e/3F12.js","titre":"Fonctions : Calculs d'images"},"3G23":{"url":"/exercices/3e/3G23.js","titre":"Reconnaître des triangles semblables dans différentes configurations"},"3G30":{"url":"/exercices/3e/3G30.js","titre":"Déterminer une longueur grâce à la trigonométrie"},"3G10-2":{"url":"/exercices/3e/3G10-2.js","titre":"Trouver l'image d'un point par une transformation choisie aléatoirement"},"3G21":{"url":"/exercices/3e/3G21.js","titre":"Contrôler si deux droites sont parallèles"},"3Algo1":{"url":"/exercices/3e/3Algo1.js","titre":"Instruction conditionelle"},"3G10-3":{"url":"/exercices/3e/3G10-3.js","titre":"Construire l'image d'un point par une rotation avec cible auto-corrective"},"3S20":{"url":"/exercices/3e/3S20.js","titre":"Calculer des probabilités dans une expérience aléatoire à deux épreuves"},"3G20":{"url":"/exercices/3e/3G20.js","titre":"Calculer des longueurs avec la propriété de Thalès"},"3S15":{"url":"/exercices/3e/3S15.js","titre":"Calculer des étendues"},"3A11-2":{"url":"/exercices/3e/3A11-2.js","titre":"Décomposition en facteurs premiers d'un entier"},"3L11-1":{"url":"/exercices/3e/3L11-1.js","titre":"Utiliser la double distributivité"},"3F13-1":{"url":"/exercices/3e/3F13-1.js","titre":"Lecture graphique d'images et d'antécédents."},"3L12":{"url":"/exercices/3e/3L12.js","titre":"Factoriser a²-b²"},"3L10-1":{"url":"/exercices/3e/3L10-1.js","titre":"Additionner ou soustraire une expression entre parenthèses"},"3F10":{"url":"/exercices/3e/3F10.js","titre":"Lectures d'images et d'antécédents depuis un tableau de valeurs"},"3L13-1":{"url":"/exercices/3e/3L13-1.js","titre":"Équation du premier degré (utilisant la distributivité)"},"3L11":{"url":"/exercices/3e/3L11.js","titre":"Utiliser la simple distributivité"},"3G11":{"url":"/exercices/3e/3G11.js","titre":"Construire l'image d'un point par une homothetie avec cible auto-corrective"},"3G43":{"url":"/exercices/3e/3G43.js","titre":"Calculs de volumes"},"3F12-3":{"url":"/exercices/3e/3F12-3.js","titre":"Compléter un tableau de valeurs"},"3A11":{"url":"/exercices/3e/3A11.js","titre":"Primalité ou pas"},"3P10":{"url":"/exercices/3e/3P10.js","titre":"Variations en pourcentage"},"3G12":{"url":"/exercices/3e/3G12.js","titre":"Trouver l'image d'une figure par une rotation dans un pavage"},"3L11-4":{"url":"/exercices/3e/3L11-4.js","titre":"Factoriser une expression"},"3L15":{"url":"/exercices/3e/3L15.js","titre":"Résoudre une équation du second degré"},"3F1-act":{"url":"/exercices/3e/3F1-act.js","titre":"Fonctions : Notion et vocabulaire"},"3L10":{"url":"/exercices/3e/3L10.js","titre":"Donner l'opposé d'une expression"},"3F12-4":{"url":"/exercices/3e/3F12-4.js","titre":"Lire l'image d'un nombre à partir d'un graphique"},"3F13-2":{"url":"/exercices/3e/3F13-2.js","titre":"Spécial escape game"},"3L12-1":{"url":"/exercices/3e/3L12-1.js","titre":"Développer (a-b)(a+b)"},"3L11-3":{"url":"/exercices/3e/3L11-3.js","titre":"Utiliser la distributivité (simple ou double) et réduire"},"3A11-3":{"url":"/exercices/3e/3A11-3.js","titre":"Compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers."},"3G20-1":{"url":"/exercices/3e/3G20-1.js","titre":"Problèmes avec le théorème de Thalès"},"3G31":{"url":"/exercices/3e/3G31.js","titre":"Déterminer un angle grâce à la trigonométrie"},"3L11-5":{"url":"/exercices/3e/3L11-5.js","titre":"Calcul mental et calcul littéral"},"3L14-1":{"url":"/exercices/3e/3L14-1.js","titre":"Résoudre une équation produit nul (niveau 2)"},"3G20-2":{"url":"/exercices/3e/3G20-2.js","titre":"Déterminer une longueur avec la propriété de Thales (MG32)"},"3L13":{"url":"/exercices/3e/3L13.js","titre":"Équation du premier degré"},"3F13":{"url":"/exercices/3e/3F13.js","titre":"Lire les antécédents d'un nombre à partir d'un graphique"},"3L11-2":{"url":"/exercices/3e/3L11-2.js","titre":"Réduire une expression"},"3F21":{"url":"/exercices/3e/3F21.js","titre":"Déterminer une fonction linéaire"},"2L11":{"url":"/exercices/2e/2L11.js","titre":"Factoriser avec les identités remarquables"},"2N20":{"url":"/exercices/2e/2N20.js","titre":"Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient"},"2G10":{"url":"/exercices/2e/2G10.js","titre":"Utiliser la distance entre deux points dans un repère orthonormé"},"2N10":{"url":"/exercices/2e/2N10.js","titre":"Existence d'une racine carrée"},"2N12":{"url":"/exercices/2e/2N12.js","titre":"Appliquer la double distributivité avec les racines carrées"},"2N21":{"url":"/exercices/2e/2N21.js","titre":"Déterminer la parité d'une expression"},"2N24":{"url":"/exercices/2e/2N24.js","titre":"Associer un intervalle de  $\\mathbb{R}$ à une inéquation et son schéma sur une droite graduée"},"2N25":{"url":"/exercices/2e/2N25.js","titre":"Utiliser et comprendre les symboles $\\cup $ et $\\cap $ avec les intervalles de $\\mathbb{R}$"},"2N12-1":{"url":"/exercices/2e/2N12-1.js","titre":"Développer les identités remarquables avec des racines carrées"},"2N11-1":{"url":"/exercices/2e/2N11-1.js","titre":"Simplifier une somme de racines carrées"},"2N22":{"url":"/exercices/2e/2N22.js","titre":"Utiliser la notion de valeur absolue d'une quantité"},"2N11":{"url":"/exercices/2e/2N11.js","titre":"Ecrire le nombre proposé sous la forme $a\\sqrt{b}$"},"2L10":{"url":"/exercices/2e/2L10.js","titre":"Développer avec les identités remarquables"},"2N10-1":{"url":"/exercices/2e/2N10-1.js","titre":"Connaître les propriétés calculatoires des racines carrées"},"2G11":{"url":"/exercices/2e/2G11.js","titre":"Déterminer les coordonnées milieu d’un segment dans un repère"},"2G12":{"url":"/exercices/2e/2G12.js","titre":"Déterminer la nature d'un polygone."},"2N23":{"url":"/exercices/2e/2N23.js","titre":"Résoudre une équation avec des valeurs absolues"},};

let liste_des_exercices_disponibles = tridictionnaire(dictionnaireDesExercices);


export function liste_html_des_exercices_d_un_theme(theme){
  let liste = '';
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    liste +=
      `<span class="id_exercice">${id}</span> - <a class="lien_id_exercice" numero="${id}">${dictionnaire[id].titre}</a></br>\n`;
  }
  return liste;
}

export function liste_html_des_exercices_d_un_niveau(liste_de_themes){ // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  let liste = '';
  for (let theme of liste_de_themes){
    liste += `<h3>${theme[1]}</h3>`;
    liste += liste_html_des_exercices_d_un_theme(theme[0]);
  }
  return liste;
}


export function menuDesExercicesDisponibles(){

// Détermine le nombre d'exercices par niveaux
    let nombre_d_exercices_disponibles_c3 = 0;
    let nombre_d_exercices_disponibles_6 = 0;
    let nombre_d_exercices_disponibles_5 = 0;
    let nombre_d_exercices_disponibles_4 = 0;
    let nombre_d_exercices_disponibles_3 = 0;
    let nombre_d_exercices_disponibles_2 = 0;
    let nombre_d_exercices_disponibles_1 = 0;
    let nombre_d_exercices_disponibles_T = 0;
    let nombre_d_exercices_disponibles_CM = 0;
    let nombre_d_exercices_disponibles_prof = 0;
    let nombre_d_exercices_disponibles_PE = 0;
    let nombre_d_exercices_disponibles_beta = 0;
    for (let id in liste_des_exercices_disponibles) {
      if (id[0] == "c" && id[1] == "3") {
        nombre_d_exercices_disponibles_c3 += 1;
      }
      if (id[0] == 6) {
        nombre_d_exercices_disponibles_6 += 1;
      }
      if (id[0] == 5) {
        nombre_d_exercices_disponibles_5 += 1;
      }
      if (id[0] == 4) {
        nombre_d_exercices_disponibles_4 += 1;
      }
      if (id[0] == 3) {
        nombre_d_exercices_disponibles_3 += 1;
      }
      if (id[0] == 2) {
        nombre_d_exercices_disponibles_2 += 1;
      }
      if (id[0] == 1) {
        nombre_d_exercices_disponibles_1 += 1;
      }
      if (id[0] == "T") {
        nombre_d_exercices_disponibles_T += 1;
      }
      if (id[0] == "C") {
        nombre_d_exercices_disponibles_CM += 1;
      }
      if (id[0] == "P" && id[1] == "0") {
        nombre_d_exercices_disponibles_prof += 1;
      }
      if (id[0] == "P" && id[1] == "E") {
        nombre_d_exercices_disponibles_PE += 1;
      }
      if (id[0] == "b" && id[1] == "e") {
        nombre_d_exercices_disponibles_beta += 1;
      }
    }

    //
    let liste_html_des_exercices_c3 =[];
    let liste_html_des_exercices_6 = [];
    let liste_html_des_exercices_5 = [];
    let liste_html_des_exercices_4 = [];
    let liste_html_des_exercices_3 = [];
    let liste_html_des_exercices_2 = [];
    let liste_html_des_exercices_1 = [];
    let liste_html_des_exercices_T = [];
    let liste_html_des_exercices_CM = [];
    let liste_html_des_exercices_prof = [];
    let liste_html_des_exercices_PE = [];
    let liste_html_des_exercices_beta = [];

    // Affiche de la liste des exercices disponibles
    let liste_html_des_exercices ='<h3 class="ui block header">Exercices disponibles</h3>\n\n';

    

    liste_html_des_exercices_c3 = liste_html_des_exercices_d_un_niveau([
      ['c3C1','c3C1 - Calculs niveau 1'],['c3N1','c3N1 - Numération Niveau 1'],['c3N2','c3N2 - Numération Niveau 2']])
    
    liste_html_des_exercices_6 = liste_html_des_exercices_d_un_niveau([
      ['6C1','6C1 - Calculs niveau 1'],['6C2','6C2 - Calculs niveau 2'],['6C3','6C3 - Calculs niveau 3'],
      ['6D1','6D1 - Les durées'],
      ['6G1','6G1 - Géométrie niveau 1'],['6G2','6G2 - Géométrie niveau 2'],['6G3','6G3 - Géométrie niveau 3'],['6G4','6G4 - Géométrie niveau 4'],
      ['6M1','6M1 - Grandeurs et mesures niveau 1'],['6M2','6M2 - Grandeurs et mesures niveau 2'],['6M3', '6M3 - Volumes'],
      ['6N1','6N1 - Numération et fractions niveau 1'],['6N2','6N2 - Numération et fractions niveau 2'],['6N3','6N3 - Numération et fractions niveau 3'],['6N4','6N4 - Numération et fractions niveau 4'],
      ['6P1','6P1 - Proportionnalité'],['6S1','6S1 - Statistiques'],
      ['6Algo1','6A - Algorithmique']
    ])
      liste_html_des_exercices_5 = liste_html_des_exercices_d_un_niveau([
        ['5A1','5A1 - Arithmetique'],['5C1','5C1 - Calculs'],
        ['5G1','5G1 - Symétries'],['5G2','5G2 - Triangles'],['5G3','5G3 - Angles'],['5G4','5G4 - Parallélogrammes'],['5G5','5G5 - Espace'],
        ['5L1','5L1 - Calcul littéral'],
        ['5M1','5M1 - Périmètres et aires'],['5M2','5M2 - Volumes'],['5M3','5M3 - Durées'],
        ['5N1','5N1 - Numération et fractions niveau 1'],['5N2','5N2 - Calculs avec les fractions'],
        ['5P1','5P1 - Proportionnalité'],['5R1','5R1 - Relatifs niveau 1'],['5R2','5R2 - Relatifs niveau 2'],
        ['5S1','5S1 - Statistiques'],['5S2','5S2 - Probabilités']
      ])
      liste_html_des_exercices_4 = liste_html_des_exercices_d_un_niveau([
        ['4C1','4C1 - Relatifs'],['4C2','4C2 - Fractions'],['4C3','4C3 - Puissances'],
        ['4F1','4F1 - Notion de fonction'],
        ['4G1','4G1 - Translation et rotation'],['4G2','4G2 - Théorème de Pythagore'],['4G3','4G3 - Théorème de Thalès'],['4G4',"4G4 - Cosinus d'un angle"],['4G5',"4G5 - Espace"],
        ['4L1','4L1 - Calcul littéral'],['4L2','4L2 - Équation'],['4P1','4P1 - Proportionnalité'],['4S1','4S1 - Statistiques'],['4S2','4S2 - Probabilités'],
        ['4Algo1','4A1 - Algorithmique']]);
      liste_html_des_exercices_3 = liste_html_des_exercices_d_un_niveau([
        ['3A1','3A1 - Arithmetique'],
        ['3F1','3F1 - Généralités sur les fonctions'],['3F2','3F2 - Fonctions affines et linéaires'],
        ['3G1','3G1 - Homothétie et rotation'],['3G2','3G2 - Théorème de Thalès'],['3G3','3G3 - Trigonométrie'],['3G4',"3G4 - Espace"],
        ['3L1','3L1 - Calcul littéral'],['3P1','3P1 - Proportionnalité'],['3S1','3S1 - Statistiques'],['3S2','3S2 - Probabilités'],
        ['3Algo1','3Algo1 - Algorithmique premier niveau']
      ])
 /*    liste_html_des_exercices_1 = liste_html_des_exercices_d_un_niveau([
        ['1E1','1E1 -  Équations'],
        ['1N1','1N1 -  Nombres et calculs'],
        ['1F1','1F1 -  Fonctions'],
      ])
        liste_html_des_exercices_2 = liste_html_des_exercices_d_un_niveau([
          ['2G1','2G1 -  Géométrie'],
          ['2N1','2N1 -  Nombres et calculs'],
          ['1L1','1L1 -  Calcul littéral'],
        ])
  */    
    for (let id in liste_des_exercices_disponibles) {
      let exercice_tmp = id;
      
      if (id[0] == '1') {
        liste_html_des_exercices_1 +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == '2') {
        liste_html_des_exercices_2 +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }   
      if (id[0] == 'T') {
        liste_html_des_exercices_T +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "P" && id[1] == "E") {
        liste_html_des_exercices_PE +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "C") {
        liste_html_des_exercices_CM +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "P" && id[1] == "0") {
        liste_html_des_exercices_prof +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "b" && id[1] == "e") {
        liste_html_des_exercices_beta +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
    }

    // Change l'ordre des exercices suivant l'URL
    if (window.location.href.indexOf("beta") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Beta (${nombre_d_exercices_disponibles_beta})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_beta;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("cm.html") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_CM;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cours Moyen(${nombre_d_exercices_disponibles_c3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_c3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_6;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_5;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_4;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_2;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Première (${nombre_d_exercices_disponibles_1})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_1;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Terminale (${nombre_d_exercices_disponibles_T})</div><div class="content">`;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CRPE (${nombre_d_exercices_disponibles_PE})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_PE;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("outils") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_prof;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    }
    else {
      liste_html_des_exercices += `<div class="ui accordion"><div class="title"><i class="dropdown icon"></i>Cours Moyen (${nombre_d_exercices_disponibles_c3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_c3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_6;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_5;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_4;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_2;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Première (${nombre_d_exercices_disponibles_1})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_1;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Terminale (${nombre_d_exercices_disponibles_T})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_T;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CRPE (${nombre_d_exercices_disponibles_PE})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_PE;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_CM;
      liste_html_des_exercices += `</div>`;
      // Ajoute les outils prof sur mathalealatex
      if (window.location.href.indexOf("mathalealatex.html") > 0) {
        liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="content">`;
        liste_html_des_exercices += liste_html_des_exercices_prof;
        liste_html_des_exercices += `</div>`;
      }
      liste_html_des_exercices += `</div>`;
    }

    $("#liste_des_exercices").html(liste_html_des_exercices);
    renderMathInElement(document.body, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: true,
      errorColor: "#CC0000",
      strict: "warn",
      trust: false,
      });

    // Gère le clic sur un exercice de la liste
    $(".lien_id_exercice").click(function () {
      let numero = $(this).attr("numero");
      if ($("#choix_des_exercices").val() == "") {
        $("#choix_des_exercices").val($("#choix_des_exercices").val() + numero);
      } else {
        $("#choix_des_exercices").val(
          $("#choix_des_exercices").val() + "," + numero
        );
      }
      // liste_des_exercices = $("#choix_des_exercices")
      //   .val()
      //   .replace(/\s/g, "")
      //   .replace(";", ",")
      //   .split(",");

      // Créé un évènement de changement de la valeur du champ pour déclencher la mise à jour
      let event = new Event('change');
      document.getElementById('choix_des_exercices').dispatchEvent(event);
      
      // Actualise KaTeX pour les titres d'exercices utilisant LaTeX
      renderMathInElement(document.body, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: true,
        errorColor: "#CC0000",
        strict: "warn",
        trust: false,
      });
    });
}


export function menuTheme(theme) {
  let codeHTML = '<h2 class="ui horizontal divider header">Exercices en ligne à données aléatoires</h2>'
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  codeHTML += '\n</div>'
  return codeHTML
  
}


export function listeTheme(theme) {
  let codeHTML = ''
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  return codeHTML
  
}