#!/usr/bin/python3
# -*- coding: utf8 -*-

# @author : Sébastien LOZANO

"""Permet de synchroniser/créer les différents dictionnaires utilisés par mathalea pour :

* le DNB,
* le BAC
* E3C
"""
pass

# On importe la librairie os pour gérer les fichiers
import os

# Pour mesurer le temps de traitement du script
from datetime import datetime 

def locationName(text:str)->str:
    """Renvoie un nom de lieu ad hoc

    **Paramètres**

        * text -- Un string avec le nom récupéré par découpage d'un nom de fichier
    
    **Sorties**

        * Un texte tout beau !    
    
    """
    pass
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

def monthName(mm:str)->str:
    """Une fonction pour transformer le numéro du mois en texte

    **Paramètres**

        * mm -- Un string avec les chiffres correspondant au mois récupéré par découpage d'un nom de fichier
    
    **Sorties**

        * Un nom de mois tout beau !    
    
    """
    pass
    month = ['','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
    return month[int(mm)]

def newEntry(file:str,dicoType:str)->list:
    """Une fonction pour créer une entrée dans un dico

    **Paramètres**

        * file -- Un string avec le nom du fichier à traiter
        * dicoType -- Un string avec dnb, bac ou e3c
    
    **Sorties**

        * Un tableau avec deux strings [un objet pour le dico, le nom du fichier traité]   
    
    """
    pass    
    # On récupère le nom du fichier sans l'extension
    filename = os.path.splitext(file)[0]    
    # On récupère l'extension
    extension = os.path.splitext(file)[1]
    # Pour les lignes à ajouter
    newLines = ''
    # On traite les fichiers tex qui ne sont pas les fichiers de correction 
    if filename[-4:] != '_cor' and  extension == ".tex" :
        newLines = f'''  {filename}: {{
    annee: '{filename[4:8]}',
    lieu: '{locationName(filename.split('_')[3])}',
    mois: '{monthName(filename[9:11])}',
    numeroInitial: '{filename.split('_')[4]}',
    png: '/{dicoType}/{filename[4:8]}/tex/png/{filename}.png',
    pngcor: '/{dicoType}/{filename[4:8]}/tex/png/{filename}_cor.png',
    typeExercice: '{dicoType}',
    url: '/{dicoType}/{filename[4:8]}/tex/{filename}.tex',
    urlcor: '/{dicoType}/{filename[4:8]}/tex/{filename}_cor.tex',
    tags: ['...tagsToChange']
  }},\n'''    
    
    return [newLines,filename]

def currentRef(dicoPath:str)->list:
    """Une fonction pour récupérer tous les fichiers déjà référencé dans le dico

    **Paramètres**

        * dicoPath -- Un string avec le chemin vers le dico
    
    **Sorties**

        * out -- Un tableau avec tous les noms des fichiers déjà dans le dico   
    
    """
    pass     
    # On ouvre le dico et on récupère les lignes
    content = open(dicoPath,'r')
    lines = content.readlines()
    content.close()
    # Un tableau pour récupérer les noms des fichiers déjà dans le dico
    out = []
    for line in lines:
        if ": {" in line:            
            out.append(line.replace(" ","")[:-3])
    return out
 
def insertNewEntries(pathName:str,dicoPath:str,dicoType:str):
    """Une procédure pour insérer les nouvelles entrées au dico

    **Paramètres**

        * pathName -- Un string avec le chemin du répertoire à scanner
        * dicoPath -- Un string avec le chemin vers le dico
        * dicoType -- Un string avec dnb, bac ou e3c        
    
    """
    pass
    # On lit les lignes du dico
    content = open(dicoPath,'r')
    lines = content.readlines()
    content.close()
    # On supprime l'avant dernière ligne qui contient }
    del lines[len(lines)-1]
    # On ouvre le fichier en écriture
    # On le réécrit complètement sans l'avant dernière ligne
    content = open(dicoPath,'w')
    content.writelines(lines)
    content.close()

    # On récupère les entrées actuelles du dico
    currentEntries = currentRef(dicoPath)

    # On ouvre le dico en ajout
    content = open(dicoPath, 'a')
    # On ajoute les nouvelles entrées
    for (dirpath, dirnames, filenames) in os.walk(pathName):
        # Parcourt tout le répertoire
        for file in sorted(filenames):
            new = newEntry(file,dicoType)
            # On ajoute l'entrée s'il elle n'existe pas déjà
            if (new[1] not in currentEntries):              
                content.writelines(new[0])    
    # On referme la dernière accolade
    lastAcc = '''
}\n'''
    content.writelines(lastAcc)
    content.close()

def manageDico(dicoPath:str,dicoType:str):
    """Une procedure pour la gestion du dico

    **Paramètres**

        * dicoPath -- Un string avec le chemin vers le dico
        * dicoType -- Un string avec dnb, bac ou e3c
    
    """
    pass
    # On crée le dico s'il n'existe pas
    fichier = open(dicoPath, "a+")
    fichier.close()

    # Si le dico est vide on ajoute les première lignes
    if (os.path.getsize(dicoPath) == 0):
        fichier = open(dicoPath, "w", encoding="utf8")
        firstLine = "/* eslint-disable no-multiple-empty-lines */\n"
        secondLine = "/* eslint-disable comma-dangle */\n"
        thirdLine = f'export const dictionnaire{dicoType.upper()} = {{\n'
        lastLine = "}"    
        fichier.writelines(firstLine)
        fichier.writelines(secondLine)
        fichier.writelines(thirdLine)
        fichier.writelines(lastLine)
        fichier.close()
    
    folderToScan = f'./{dicoType}/'
    # On crée le repertoire s'il n'existe pas
    if (not os.path.exists(folderToScan)):
        os.makedirs(folderToScan)    
    # On récupère et range toutes les années présente dans le repertoire à scanner
    getAllYears = sorted(os.listdir(folderToScan)) 
    
    # On traite toutes les années
    for year in getAllYears:
        insertNewEntries(f'./{dicoType}/{year}/tex/',dicoPath,dicoType)

# Script principal
def main():
    """Procédure principale"""
    # On récupère la date au début du traitement
    start_time = datetime.now()
      
    # On nettoie le terminal
    os.system("clear")

    # On génère la documentation
    print("=============================================================================")
    print("  Création de la documentation en cours ...  ")    
    print(" ")    
    os.system('sh ./src/js/modules/dicosDnbBacE3c/generateDoc.sh')
    print("=============================================================================")
    print("  Synchronisation/Génération du dictionnaire en cours ...  ")    
    print(" ")    

    # On choisit le type de dico à synchroniser/générer
    choiceDico = ''
    while choiceDico not in ['1','2','3']:
        choiceDico = input("""Quels dictionnaire faut-il synchronier/générer ?
        ---> 1 : DNB
        ---> 2 : BAC
        ---> 3 : E3C
Taper 1, 2 ou 3 pour lancer le script --> """)
    # Une variable pour le chemin vers le dico à synchroniser/générer        
    dicoPath = ''
    # Une variable pour le type de dico à synchroniser/générer        
    dicoType = ''

    if (choiceDico == '1'):
        dicoPath = './src/js/modules/dictionnaireDNB.js'
        dicoType = 'dnb'
    elif (choiceDico == '2'):
        dicoPath = './src/js/modules/dictionnaireBAC.js'
        dicoType = 'bac'
    elif (choiceDico == '3'):
        dicoPath = './src/js/modules/dictionnaireE3C.js'
        dicoType = 'e3c'

    manageDico(dicoPath,dicoType)

    if __name__ == "__main__":
        restart = ''
        while restart not in ['o','n']:
            print("=============================================================================")
            print("  Syncroniser/Générer un autre dictionnaire ? ")    
            print(" ")           
            restart = input("Taper o ou n pour relancer le script --> ")
            if restart == 'o':
                main()  

    # On évalue le temps de traitement
    end_time = datetime.now()
    print("=============================================================================")
    print("  Durée de traitement : ",end_time-start_time)        
    print("=============================================================================")
 
if __name__ == "__main__":
    main()

    ################## Pour mettre d'équerre le dico DNB ################################
    #####################################################################################
    # currentRefsdicoDnbTest = currentRef('./src/js/modules/dictionnaireDNBTest.js')
    # currentRefsdicoDnb = currentRef('./src/js/modules/dictionnaireDNB.js')
    # diff = []
    # for ref in currentRefsdicoDnb:
    #     if ref not in currentRefsdicoDnbTest:
    #         diff.append(ref)
    # print(diff)
    # diff = []
    # for ref in currentRefsdicoDnbTest:
    #     if ref not in currentRefsdicoDnb:
    #         diff.append(ref)
    # print(diff)
    ######################################################################################
