# Scan le répertoire /exercices puis ecris le fichier /module/liste_des_exercices.json
#

import os       # Gestion des fichiers
import re       # Gestion des expressions régulières
import json     # Gestion du json

'''
    Scanne le répertoire /tex et créé une entrée dans liste_des_exercices.json pour chaque exercice
'''
def write_json(data, filename='modules/liste_des_exercices.json'):
    with open(filename, 'w', encoding="utf8") as f:
        json.dump(data, f, sort_keys=True, indent=4, ensure_ascii=False)





listeDNB = {}

for (dirpath, dirnames, filenames) in os.walk('./tex/'):
    # Parcourt tout le répertoire /exercices
    for file in filenames:
        if os.path.splitext(file)[0][-1] != 'r' and os.path.splitext(file)[1] == ".tex" :
            listeDNB[os.path.splitext(file)[0]] = {}
            listeDNB[os.path.splitext(file)[0]]["url"] = f"/tex/{os.path.splitext(file)[0]}.tex"
            listeDNB[os.path.splitext(file)[0]]["png"] = f"/tex/png/{os.path.splitext(file)[0]}.png"
            listeDNB[os.path.splitext(file)[0]]["urlcor"] = f"/tex/{os.path.splitext(file)[0]}_cor.tex"
            listeDNB[os.path.splitext(file)[0]]["pngcor"] = f"/tex/png/{os.path.splitext(file)[0]}_cor.png"
            listeDNB[os.path.splitext(file)[0]]["type_exercice"] = "dnb"

write_json(listeDNB)
                        

        


