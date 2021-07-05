

_Documentation issue du [wiki de Sésamath](https://wiki.sesamath.net/doku.php?id=public:dev:git:start)._

Git est un système de gestion de versions, comme [[..:svn]], mais il est décentralisé : tout le monde a un dépôt complet avec toutes ses branches et son historique.

On utilise en général un dépôt "central" qui sert de référence à tout le monde, mais rien n'y oblige, chacun pouvant lire ou écrire sur les dépôts locaux des autres (si ces autres lui ont donnés un accès avec des droits, par ex via ssh).

## Liens utiles 
  * L'indispensable mémo [http://ndpsoftware.com/git-cheatsheet.html](http://ndpsoftware.com/git-cheatsheet.html)
  * le git book en français (2ème édition 2014) [https://git-scm.com/book/fr/v2](http://ndpsoftware.com/git-cheatsheet.html)
  * un cours interactif en français [https://learngitbranching.js.org/](http://ndpsoftware.com/git-cheatsheet.html)
  * la référence (en anglais) [https://git-scm.com/docs](http://ndpsoftware.com/git-cheatsheet.html)
  * des cours en français : [https://delicious-insights.com/fr/articles/apprendre-git/](http://ndpsoftware.com/git-cheatsheet.html)
  * de bon tutoriaux en français [https://fr.atlassian.com/git/tutorials](http://ndpsoftware.com/git-cheatsheet.html)
  * Des articles de Christophe Porteneuve [généralités](https://delicious-insights.com/fr/articles/git-workflows-generality/), [git-log](https://delicious-insights.com/fr/articles/git-log/), [hooks](https://delicious-insights.com/fr/articles/git-hooks-commit/) [merge et rebase](https://delicious-insights.com/fr/articles/bien-utiliser-git-merge-et-rebase/)
  * qq recettes de cuisine pratiques [http://pioupioum.fr/developpement/git-10-commandes-utiles.html](http://pioupioum.fr/developpement/git-10-commandes-utiles.html)

## Installation 
  * sous windows, installer [https://gitforwindows.org/](https://gitforwindows.org/) (qui donne aussi les commandes bash classique en console, et permet de lancer les scripts bash présents dans la plupart des projets, pour compiler, générer la doc, etc.)
  * sous linux, c'est le paquet git
  * sous mac : [https://git-scm.com/download/mac](https://git-scm.com/download/mac)

La plupart des IDE ont un client git intégré.

## Configuration gitBash
C'est conseillé d'ajouter ./node_modules/.bin dans le PATH courant (la liste des dossiers dans lequel il va chercher une commande), pour éviter d'avoir à le préciser, et pouvoir taper par `%%eslint --fix%%` plutôt que `%%node_modules/.bin/estlint --fix%%`

```bash
echo 'PATH="$PATH:node_modules/.bin"' >> ~/.bashrc
```
Puis rouvrir une nouvelle console gitBash pour le tester.

## Initialisation ssh 
Lors du tout premier usage de git, vous aurez probablement besoin d'une paire de clés ssh :
  * `~/.ssh/id_rsa` : la clé privée qui permet de vous identifier (signer et chiffrer tout ce que vous envoyez), protégée par un mot de passe. Vous devez la garder au chaud et ne jamais la communiquer.
  * `~/.ssh/id_rsa.pub` : la clé publique que vous pouvez communiquer à tout le monde, elle permet de déchiffrer / vérifier votre signature (donc vérifier que c'est vous), mais pas d'usurper votre identité.

Pour générer ces clés, c'est en console `ssh-keygen` (laisser les noms proposés par défaut et entrez un mot de passe quand on vous le demande). Ça marche en natif sous macOs / linux / windows10 (pour les versions antérieures de windows il faut passer par une console ouverte avec gitBash).

Lors de chaque première connexion à un serveur ça vous demande `Are you sure you want to continue connecting` (pour vous permettre de vérifier le fingerprint si vous voulez être vraiment sûr que vous causez au bon serveur), et si vous répondez `yes` ça enregistre la réponse dans un fichier `~/.ssh/known_hosts` pour plus vous poser la question la prochaine fois (si vous répondez no ça fait rien et reposera la question).

Ensuite, pour pouvoir envoyer du code sur un dépôt il faudra communiquer votre clé publique au dépôt (et qu'un admin lui donne des droits sur le dépôt), par ex pour framagit il faut l'ajouter dans les paramètres de votre compte (et l'admin du dépôt donne des droits à votre compte).

Sous **windows** il sera probablement également utile d'ajouter dans ce fichier `~/.bashrc` les instructions détaillées sur cette [page github](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/working-with-ssh-key-passphrases#auto-launching-ssh-agent-on-git-for-windows) pour lancer **ssh-agent** à chaque ouverture de terminal, afin de n'avoir à saisir le mot de passe de sa clé ssh qu'une fois par session (et pas à chaque commande git).


## Utilisation 
Les commandes ressemblent à celles d'autres systèmes de gestion de version, avec quelques différences.

Git ajoute au classique dossier local / dépôt distant les notions :
  * dépôt local (important, c'est là qu'on commit), 
  * index (utilisé par git pour se positionner dans l'arbre des commits, pas besoin de s'en occuper pour un usage basique, ça stocke ce qui fera partie du prochain commit) 
  * remise (stash, vous pouvez l'oublier pour un usage basique mais c'est bien pratique pour mettre de coté des modifs en cours sans les committer, revenir ainsi à l'index courant pour faire une petite modif que l'on peut commit et push puis revenir à son état antérieur depuis la remise)

## Commandes usuelles

  * `git clone $depot` : récupérer un dépôt distant en local (la première fois) ($depot peut être du user@host:xxx pour récup via ssh ou bien https:… pour récup via http, mais si vous devez envoyer des modifs mieux vaut passer via ssh)
  * `git fetch` : récupérer tous les commit d'un dépôt distant, mais sans modifier vos branches locales (`git fetch -ap` pour effacer les refs locales aux branches distantes qui ont disparu depuis la dernière fois), ça met à jour la "branche" xxx/yyy où xxx est le remote concerné, en général "origin" et yyy la branche courante). Si vous êtes sur la branche main, un `git fetch` va récupérer tous les commits et mettre à jour la branche `origin/main`, mais votre branche main reste inchangée (un git status va vous dire si elle est en retard, un git pull va récupérer les commits de origin/main)
  * `git pull` : récupérer infos + contenus
  * `git commit` : enregistrer ses modifs dans la branche courante, `git commit -m "Un message" .` pour commiter toutes les modifs locales du dossier courant (".", sinon préciser la liste des dossiers / fichiers concernés). Si on ne précise pas de fichiers, ça commit ce qui est dans l'index (ajouté précédemment avec git add), éventuellement rien. En général on n'utilise pas tellement git add et on précise les fichiers sur la commande commit, ça fait add+commit en une commande.
  * `git push` : envoyer sur un dépôt distant les dernières modifs de son dépôt local (son état au dernier commit, mais pas les fichiers locaux qui ont pu changer depuis)
  * `git checkout <fichier>` : récupère la version distante et écrase les modifs éventuelles de fichier
  * `git checkout <commit>` : met le dossier de travail dans l'état de <commit>, en conservant les modif pas encore commitées, mais dans un état "spectateur" (sans modifier HEAD, en detached HEAD), si on veut faire des modifs en général on fera un checkout -b <nouvelleBranche>, des commit dedans puis ensuite éventuellement un retour au master et merge
  * `git checkout <branche|tag|commit>` : bascule sur la branche (ou un tag ou un commit)
  * `git checkout -b <branche>` : crée la branche et va dedans
  * `git add <fichier|dossier>` : passer un fichier sous git (il faut ensuite le commit)
  * `git status` : là où on en est (si des commits n'ont pas été envoyés, la liste des fichiers modifiés mais pas commités, la liste des fichiers non suivis, la liste des fichiers ajoutés qui seront dans le prochain commit)
  * `git merge <branche>` : appliquer toutes les modifs de la branche <branche> dans la branche courante (applique à la branche courante tous les commits de l'autre depuis qu'elle a divergée ou depuis le dernier merge).
  * `git rebase <branche>` : modifier l'arbre des commits de notre branche courante pour que la base de cette branche soit le commit actuel de <branche>. C'est utile lorsqu'on a créé une branche bugFix depuis main, que main a avancé depuis la création de bugFix, et que l'on voudrait que les commits qu'on s'apprête à pusher apparaissent comme dérivant du main actuel. À priori à ne pas faire sur des commits qui ont déjà été pushés (car d'autres les ont peut-être déjà récupérés, et ce rebase revient à les réécrire puisqu'ils n'ont plus les mêmes parents). Cf cet [article](https://delicious-insights.com/fr/articles/bien-utiliser-git-merge-et-rebase/) pour bien comprendre la différence entre merge et rebase.
  * `git log` : voir les derniers commits, par ex les 20 derniers sous forme d'arbre avec `%%git log --name-status --abbrev-commit --graph -n 20%%` (cf la doc pour le formatage de la sortie)
  * `git branch` pour lister les branches, `git branch -vva` pour voir toutes les branches (locales + distantes) avec leur liens (le tracking entre une branche locale et une distante)
  * `%%git config --global --list%%` pour voir toutes vos options de configuration globales (pour tous les dépôts git, retirer --global pour voir les options du dépôt courant, qui contient les globales mais aussi toutes les branches et le tracking)
  * pour virer les tags locaux qui n'existent plus sur le remote, on les vire tous et on récupère les actuels : `%%git tag -l | xargs git tag -d; git fetch --tags%%`


## Config
Cf [config (wiki Sésamath)](https://wiki.sesamath.net/doku.php?id=public:dev:git:config)

## Les branches

La branche par défaut s'appelle en général "main" ou "master", et on appelle en général le dépôt distant par défaut "origin". 

En usage courant on ne se préoccupe pas de ça, on fait toujours des `git push` et au 1er push sur une branche nouvellement créée git signale qu'il faut préciser où pousser par défaut en donnant l'option à ajouter. On le fait cette première fois et on s'en occupe plus ensuite (la branche distante par défaut est définie et on poussera toujours là-bas).

Sur les dépôt framagit (mais aussi sur la plupart des autres, notamment github, et sauf configuration particulière) les push sur master directement sont interdits, pour éviter de pousser par erreur une branche de dev dans origin/master (mais aussi pour inciter à isoler la modif dans une branche et la faire valider par qqun d'autre).

Si vous avez mis par erreur des commit dans votre branche main et que vous ne pouvez pas faire de push, voir le [scénario pour rectifier](https://wiki.sesamath.net/doku.php?id=public:dev:git:scenarios#j_ai_des_commits_sur_main_et_je_peux_pas_faire_de_push).

## Exemples

Cf une liste de [scénarios (wiki Sésamath)](https://wiki.sesamath.net/doku.php?id=public:dev:git:scenarios) assez classiques
