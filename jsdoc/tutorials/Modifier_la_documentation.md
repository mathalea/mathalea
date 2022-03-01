## <a id="1" href="#1">#</a> Généralités
La documentation est générée à l'aide de [jsdoc](https://jsdoc.app/index.html) en utilisant le thème [docdash](https://github.com/clenemt/docdash).

Pour générer la documentation, il suffit de lancer `pnpm run build:doc` dans un terminal.

**Remarque :**

Sous **Windows**, le `pnpm run build:doc` ne fonctionne pas actuellement. En attendant que ce soit réparé, vous pouvez build la doc en lançant `C:\\Chemin\\Vers\\"mon dossier"\\mathalea\\node_modules\\.bin\\jsdoc -c C:\\Chemin\\Vers\\"mon dossier"\\mathalea\\jsdoc\\base.json` en remplaçant le `\\Chemin\\Vers\\"mon dossier"\\mathalea` par le chemin vers votre dossier mathalea.

Et pour la visualiser, il suffit de lancer `pnpm run doc:show` dans un terminal.

Vous pouvez faire les deux actions en une ligne en lançant `pnpm run doc show` (sans les deux points).

## <a id="2" href="#2">#</a> Arborescence : où sont les fichiers ?
La page d'accueil de la documentation est générée à partir du fichier `src/demarrage.md`.

Les différents tutoriels sont dans le dossier `jsdoc/tutorials/`.

Pour créer un nouveau tutoriel, il suffit de créer un fichier MarkDown (.md) dans le dossier `jsdoc/tutorials/`. ([Lien vers une "anti-sèche" MarkDown](https://www.markdownguide.org/cheat-sheet) en anglais).

Les fichiers et dossiers à l'intérieur de `jsdoc/static/` sont copiés tels quels à la racine du dossier de documentation lorsque celle-ci est générée. Cela permet d'avoir des fichiers et des adresses statiques qui ne passent pas à la moulinette comme le reste. L'intérêt principal étant de disposer d'un dossier d'images utilisables par la documentation.

## <a id="3" href="#3">#</a> Créer un lien interne à la documentation

Pour créer un lien interne à la documentation, on distingue deux cas :
* Si on veut créer un lien vers un tutoriel présent dans le dossier `jsdoc/tutorials`, le lien est `https://coopmaths.fr/documentation/tutorial-Nom_du_fichier_MarkDown.html`. Notez bien que le `.md` présent dans les sources est remplacé par un `.html`
* Le dossier `jsdoc/static/` correspond au dossier racine de la doc générée et l'intérieur de ce dossier est recopié tel quel donc pour créer un lien vers `jsdoc/static/img/image.png`, le lien à utiliser est tout simplement `img/image.png`.

## <a id="4" href="#4">#</a> Bonus : comment est générée le reste de la documentation ?

Lorsqu'on lance `pnpm run buid:doc`, les fichiers `base.json`, `mathalea2d.json`, `mathaleaInstrumEnPoche.json` et `tout.json` du dossier `jsdoc/` sont lus.
* `base.json` va générer une documentation dans le dossier `documentation/`
    * dont la page d'accueil sera une version html de `src/demarrage.md` ;
    * qui contiendra des versions html des .md de `jsdoc/tutorials/` ;
    * qui recopiera le contenu de `jsdoc/static/` à la racine du dossier `documentation/` ;
    * qui créera des pages html à partir des commentaires trouvés dans les fichiers `src/js/modules/outils.js`,`src/js/modules/fractions.js`,`src/js/modules/Fraction.js` et `src/js/modules/ListeFraction.js` encore une fois dans le dossier `documentation`.
* `mathalea2d.json` va générer une documentation dans le dossier `documentation/2d/` à partir des commentaires du fichier `src/js/modules/2d.js` et dont la page d'accueil sera créée à partir de `jsdoc/2d.md`.
* `mathaleaInstrumEnPoche.json` va générer une documentation dans le dossier `documentation/instrumenpoche/` à partir des commentaires du fichier `src/js/modules/Alea2iep.js` et dont la page d'accueil sera créée à partir de `jsdoc/iep.md`.
* `tout.json` va générer une documentation dans le dossier `documentation/tout` à partir des commentaires de tous les fichiers du dossier `src/js/`.

Lorsqu'on lance `pnpm run doc:show` on atterrit sur la page d'accueil du `base.json` qui contient en début de page des liens vers les trois autre documentations.