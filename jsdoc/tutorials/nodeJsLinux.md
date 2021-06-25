
## Utilisation du dépôt NodeSource pour les distrib basée sur Debian (ubuntu, mint & co)
Pour les distribs basées sur rpm cf la [doc](https://github.com/nodesource/distributions#rpminstall) (remplacer apt-get par l'équivalent rpm dans les commandes suivantes, et remplacer deb par rpm dans les urls)

Au 19 mai 2021 :
- la version avec les dernières fonctionnalités est la 16.2.0
- la version LTS est la 14.17.0

Pour installer nodejs 14.x 
```shell
# Pour récupérer le script d'install il faut curl, et ensuite il aura besoin de lsb-release, et l'usage du dépôt en https demande apt-transport-https  
sudo apt-get install curl apt-transport-https lsb-release
# Recuperation et lancement de l'installateur (cf plus loin si vous n'êtes pas chaud pour lancer ça)
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
# Installation
sudo apt-get install -y nodejs
# Vérifier la version de nodejs installée
node --version
# Vérifier la version de npm installée
npm --version
# Installer pnpm
sudo npm install -g pnpm
# mettre à jour pnpm
pnpm -g i pnpm
```

Rmq: pour ceux qui ne veulent pas exécuter en root un script externe, vous pouvez simplement éditer manuellement le fichier :
```shell
sudo nano /etc/apt/sources.list.d/nodesource.list
```
et coller dedans
```txt
# Cf https://deb.nodesource.com/setup_14.x et https://deb.nodesource.com/setup_dev
# en préalable, faut avoir installé les paquets
# apin apt-transport-https lsb-release curl
# et la clé
# curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

# ici c'est pour un node v14 sur debian buster, à adapter à votre contexte
deb [arch=amd64] https://deb.nodesource.com/node_14.x buster main
```
(pour changer de version de node il suffira ensuite d'aller modifier le node_14.x et relancer un `apt upgrade nodejs`)

puis ajouter la clé du dépôt
```shell
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
```