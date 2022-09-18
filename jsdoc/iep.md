# Intégrer une animation dans un exercice

Pour intégrer Instrumenpoche dans un exercice, il faut créer une instance de l'objet `Alea2Iep`

```js
import Alea2iep from "../../modules/Alea2iep.js";
const anim = new Alea2iep()
```

Si on veut utiliser une animation qui ne dépend pas des valeurs de l'énoncé, il suffit de récupérer un fichier Instrumenpoche au format XML.

```js
anim.xml = `
   <xml version="1.0" encoding="UTF-8" ?>
   <INSTRUMENPOCHE version="2" licence="CC-BY-SA" >
   <action sens="5" angle="17.18" mouvement="rotation" objet="regle" />
   <action abscisse="346" ordonnee="381" epaisseur="0" couleur="noir" id="1" mouvement="creer" objet="point" />
   <action ordonnee="-30" abscisse="-10" couleur="noir" nom="A" id="1" mouvement="nommer" objet="point" />
   </INSTRUMENPOCHE>
`

texteCorr += anim.html(numeroExercice, i)
```
**Remarques :**
- On peut remplacer `anim.html(numeroExercice, numeroQuestion)` par `anim.htmlBouton(numeroExercice, numeroQuestion)` et ainsi avoir un bouton pour afficher ou masquer l'animation (qui est masquée par défaut au chargement).
- Renseigner le numéro de l'exercice et celui de la question est très important car il permet de créer un identifiant unique pour chaque animation.

# Créer une animation

Après avoir créé l'instance de `Alea2iep`, on cite les commandes dans l'ordre chronologique, puis on génère le code HTML.

```js
const anim = new Alea2iep()

const A = point(4,5) // Fonction à importer depuis /modules/2d.js

anim.pointCreer(A, { dx: -0.5, dy: -0.5, label: 'A' }) // On déplace les labels des points avec dx et dy
anim.regleMontrer(A)
anim.segmentTracer(A,B)
anim.pointCreer(B, { dx: 0.2, dy: -0.5, label: 'B'})
anim.crayonMasquer()
anim.couleur = "forestgreen" // Cela change la couleur pour tous les futurs tracés
anim.epaisseur = 2 // Cela change l'épaisseur pour tous les futurs tracés
anim.compasMontrer(A)
anim.compasEcarterAvecRegle(AC)
anim.compasTracerArcCentrePoint(A,C,40)
anim.compasDeplacer(B)
anim.compasEcarterAvecRegle(BC)
anim.compasTracerArcCentrePoint(B,C)
anim.compasMasquer()

texteCorr += anim.htmlBouton()
```

# Recadrer une animation

La commande `anim.recadre(xMin, yMax)` doit apparaître avant toutes les autres animations pour être prise en compte et permet de déplacer le repère de l'animation.

```js
const xMin = Math.min(0, B.x, C.x, M.x, M.x + xU, N.x, N.x + xV) - 1
const yMax = Math.max(0, B.y, C.y, M.y, M.y + yU, N.y, N.y + yV) + 2
anim.recadre(xMin, yMax)
anim.crayonMontrer(M)
anim.tracer(translation(M, u), { vecteur: true, couleur: 'blue' })
...
```

Pour créer et tester ses animations, on peut utiliser [coopmaths.fr/mathalea2iep.html](https://coopmaths.fr/mathalea2iep.html).
