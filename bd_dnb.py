#!/usr/bin/python3
#-*- coding: utf8 -*-
"""
    Génèrer la base de données des exercices de DNB
"""
__author__      = "Rémi Angot"

import json
    

with open('dnb.json','w+') as f:
  base_de_donnees = json.load(f)

continuer = True

while continuer : 
    sujet = {}
    annee = input("Année :  ")
    mois = input("Mois :  ")
    lieu = input("Lieu :  ")
    nb_exercices = int(input("Nombre d'exercices :  "))
    print(f"dnb_{annee}_{mois}_{lieu}_{nb_exercices}")
    for i in range(1,nb_exercices+1):
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"] = {}
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"]["themes"] = input(f"Mots clés de l'exercice {i} (séparés par des virgules)").split(",")
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"]["type_exercice"] = "dnb"
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"]["url"] = f"/tex/dnb_{annee}_{mois}_{lieu}_{i}.tex"
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"]["urlcor"] = f"/tex/dnb_{annee}_{mois}_{lieu}_{i}_cor.tex"
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"]["png"] = f"/tex/dnb_{annee}_{mois}_{lieu}_{i}.png"
        sujet[f"dnb_{annee}_{mois}_{lieu}_{i}"]["pngcor"] = f"/tex/dnb_{annee}_{mois}_{lieu}_{i}_cor.png"
    question_continuer = input("Voulez-vous renseigner un autre exercice ? (n pour arrêter, entrer pour continuer)  ")
    base_de_donnees = base_de_donnees | sujet
    if question_continuer == 'n':
        continuer = False


with open('modules/dnb.json', 'w+', encoding="utf8") as f:
        json.dump(base_de_donnees, f, sort_keys=True, indent=4, ensure_ascii=False)