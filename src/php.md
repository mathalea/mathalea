# Pour tester du php - Serveur PHP Local

## Table of Contents
1. [Linux](#linux-serveur-web-lamp)
2. [Mac](#mac)
3. [Windows](#windows)

## Linux Serveur Web LAMP
***
### Installation
LAMP est un acronyme pour **L**inux, **A**pache, **M**ySQL, **P**HP. C'est une pile logicielle comprenant le système d'exploitation, un serveur HTTP, un système de gestion de bases de données et un langage de programmation interprété, et qui permet de mettre en place un **serveur web**. 

- **Installer** les paquets necesssaires pour Apache, PHP et MySQL :
```shell
sudo apt install apache2 php libapache2-mod-php mysql-server php-mysql
```
> attention le paquet php installe directement la dernière version de php

- **Installer** quelques modules courants
```shell
sudo apt install php-curl php-gd php-intl php-json php-mbstring php-xml php-zip
```
> de base après une installation fraiche le service apache2 n'est pas lancé! il faut le lancer
```shell
sudo systemctl enable apache2
```
- **Vérifier** que le serveur est opérationnel à l'adresse http://127.0.0.1 ou http://localhost

### Créer un hôte dédié pour le projet mathalea

- **Créer** un répertoire de travail dans **/var/www** ou ailleurs
Par défaut le répertoire `/var/www` appartient à l'utilisateur **root** et les autres utilisateurs n'y ont pas accès en écriture. Il nous faut donc créer ce répertoire avec les permissions super utilisateur (sudo) :
```shell
sudo mkdir /var/www/mathalea
```

Apache doit pouvoir apporter des modifications au répertoire
```shell
sudo chown $USER:www-data /var/www/mathalea
chmod 750 /var/www/mathalea
```

Pour l'exemple nous allons y créer un fichier index.html contenant le minimum nécessaire à l'affichage d'un message d'accueil :

```shell
xed /var/www/mathalea/index.html
```

Ce qui ouvre l'éditeur xed dans lequel nous allons coller :

```
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Espace mathalea</title>
    </head>
    <body>
      <h1>Bienvenue sur la page test d'installation.</h1>
    </body>
    </html>
```

Puis Ctrl+S pour sauvegarder et Ctrl+Q pour quitter. 

- **Créer** l'hôte virtuel sur le port 80 par exemple, ici l'hôte est public, toute machine branchée sur le même réseau y aura accès

Nous allons configurer notre hôte virtuel dans un fichier dédié `/etc/apache2/sites-available/mathalea.conf` :

```shell
sudo xed /etc/apache2/sites-available/mathalea.conf
```

Ce qui ouvre l'éditeur xed dans lequel nous allons coller :

```
    <VirtualHost *:80>
    	DocumentRoot "/var/www/mathalea/build"
    	<Directory "/var/www/mathalea">
    		Options +FollowSymLinks
    		AllowOverride all
    		Require all granted
    	</Directory>
    	ErrorLog /var/log/apache2/error.mathalea.log
    	CustomLog /var/log/apache2/access.mathalea.log combined
    </VirtualHost>
```
> Le docRoot pointe sur le dossier build du projet afin de pouvoir tester les scripts php

Puis Ctrl+S pour sauvegarder et Ctrl+Q pour quitter.

Il faut ensuite activer cet hôte :

```shell
sudo a2ensite mathalea
```

Ce VirtualHost ne possède pas de directive ServerName ou ServerAlias. Il sera donc utilisé par défaut pour les requêtes sur le port 80 si aucun autre VirtualHost ne correspond exactement au nom de domaine appelé. Pour qu'il soit pris en compte il faut par contre désactiver l'hôte virtuel par défaut d'Apache, qui arrive en priorité en suivant l'alphabet :

```shell
sudo a2dissite 000-default
```

Puis nous pouvons redémarrer Apache afin qu'il prenne en compte notre nouvelle configuration :

```shell
sudo systemctl reload apache2
```

C'est prêt à l'adresse http://127.0.0.1

> Il est possible de modifier le fichier `/etc/hosts` pour taper http://mathalea.local plutôt que http://127.0.0.1 dans la barre d'adresse

> Il est aussi possible d'utiliser un autre port d'écoute que le port 80

Reste à **cloner** le [dépôt mathalea](https://github.com/mathalea/mathalea)

## Mac Serveur Web MAMP
***
À compléter par un utilisateur Mac

## Windows Serveur Web WAMP
***
À compléter par un utilisateur Windows