#!/usr/bin/python3
#-*- coding: utf8 -*-

# @author : Sébastien LOZANO

# Source pour l'écriture d'un REAMDE en mardown : https://www.makeareadme.com/ 
# Génère la page d'accueil de la documentation pdoc3

"""
# BAC DNB E3C
## GÉNÉRER/SYNCHRONISER LES DICTIONNAIRES 

<!-- ABOUT THE PROJECT -->
## About The Project
L'objectif est d'avoir un script python qui synchronise les dictionnaires pour les exercices DNB, BAC et E3C récupérés sur le site de l'APMEP 
et découpés avec ma moulinette maison.

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

None

### Installation

Pour générer la documentation il faut installer le paquet python [pdoc3](https://pdoc3.github.io/pdoc/)

```shell
pip3 install pdoc
```

Les fichiers de la documentation sont générés dans le dossier **./documentation/dicosDnbBacE3c**

<!-- USAGE -->
## Usage

À la racine du projet, lancer le script python **dicosManage.py**

```shell
python3 dicosManage.py
```

- Choisir le type de dico à traiter
- Le dico est synchronisé automatiquement avec les fichiers se trouvant dans le dossier ad hoc à la racine du projet mathalea :
    - **dnb/**,
    - **bac/** 
    - **e3c/** 
- Reste à renseigner les tags, directement dans le dictionnaire concerné

<!-- LICENSE -->
## License

[MIT](https://choosealicense.com/licenses/mit/)

"""
pass