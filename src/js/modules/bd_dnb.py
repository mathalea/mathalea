# Scan le répertoire /exercices puis ecris le fichier /module/liste_des_exercices.json
#

import os       # Gestion des fichiers
import re       # Gestion des expressions régulières
import json     # Gestion du json
from pathlib import Path


'''
    Scanne le répertoire /tex et créé une entrée dans dnb.json pour chaque exercice
'''
def write_json(data, filename='./modules/dictionnaireDNBsansTags.js'):
    with open(filename, 'w+', encoding="utf8") as f:
        json.dump(data, f, sort_keys=True, indent=4, ensure_ascii=False)

'''
    Ajoute une première ligne au fichier
'''
def prepend_line(line, filename ='./modules/dictionnaireDNBsansTags.js'):
    """ Insert given string as a new line at the beginning of a file """
    # define name of temporary dummy file
    dummy_file = filename + '.bak'
    # open original file in read mode and dummy file in write mode
    with open(filename, 'r') as read_obj, open(dummy_file, 'w') as write_obj:
        # Write given line to the dummy file
        write_obj.write(line + '\n')
        # Read lines from original file one by one and append them to the dummy file
        for line in read_obj:
            write_obj.write(line)
    # remove original file
    os.remove(filename)
    # Rename dummy file as the original file
    os.rename(dummy_file, filename)



def nomDeLieu(text):
    if text == 'metropole' :
        return 'Métropole'
    elif text == 'pondichery' :
        return 'Pondichéry'
    elif text == 'ameriquenord' :
        return 'Amérique du Nord'
    elif text == 'asie' :
        return 'Asie'
    elif text == 'etranger' or text == 'etrangers' :
        return 'Centres étrangers'
    elif text == 'wallis' or text == 'wallisfutuna' :
        return 'Wallis et Futuna'
    elif text == 'polynesie' :
        return 'Polynésie'
    elif text == 'ameriquesud' :
        return 'Amérique du sud'
    elif text == 'caledonie' :
        return 'Nouvelle Calédonie'
    elif text == 'grece' :
        return 'Grèce'
    elif text == 'antillesguyanne' :
        return 'Antilles - Guyanne'
    else :
        return text

mois = ['','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']




listeDNB = {}

for (dirpath, dirnames, filenames) in os.walk('./tex/'):
    # Parcourt tout le répertoire /exercices
    for file in filenames:
        nomFichier = os.path.splitext(file)[0]
        if nomFichier[-4:] != '_cor' and os.path.splitext(file)[1] == ".tex" :
            listeDNB[nomFichier] = {}
            listeDNB[nomFichier]["url"] = f"/tex/{nomFichier}.tex"
            listeDNB[nomFichier]["png"] = f"/tex/png/{nomFichier}.png"
            listeDNB[nomFichier]["urlcor"] = f"/tex/{nomFichier}_cor.tex"
            listeDNB[nomFichier]["pngcor"] = f"/tex/png/{nomFichier}_cor.png"
            listeDNB[nomFichier]["type_exercice"] = "dnb"
            listeDNB[nomFichier]["annee"] = nomFichier[4:8]
            listeDNB[nomFichier]["mois"] = mois[int(nomFichier[9:11])]
            listeDNB[nomFichier]["lieu"] = nomDeLieu(nomFichier.split('_')[3])
            listeDNB[nomFichier]["numeroExercice"] = nomFichier.split('_')[4]
write_json(listeDNB)
prepend_line("export let dictionnaireDNB = ")

                        

        


