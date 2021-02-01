#!/usr/bin/python3
#-*- coding: utf8 -*-

import os
import re # Pour la gestion des expressions régulières

# Récupèrer toutes les références des exos dans include/mathalea_exercices.js dans un tableau
def getAllRefsClean():
    # Ouvrir le fichier pour déterminer la ligne d'arrêt
    allRefs = open('./include/mathalea_exercices.js','r')
    partTemp = allRefs.readlines()[2:285]
    cpt=0
    for line in partTemp:
        cpt+=1
        if "TsvgjsKatex" in line:
            break 
    #Fermer le fichier
    allRefs.close()
    # Réouvrir le fichier pour garder ce qu'on veut
    allRefs = open('./include/mathalea_exercices.js','r')
    # Garder la partie du fichier avec les rérérences
    part = allRefs.readlines()[2:cpt]    
    # Tableau pour les références néttoyées
    allRefsClean = []    
    temp = []   
    # Suprimmer une partie des lignes
    for elt in part:        
        temp.append(elt.rstrip(',\n'))
    # Garder la référence qui se trouve entre les " "
    for elt in temp:
        if "\"" in elt:
            allRefsClean.append(re.search('(\".+\")',elt).group().strip('\"'))
    # Fermer le fichier        
    allRefs.close()   
    return allRefsClean

# Récupérer seulement certaines références dans un tableau
# On passe un tableau en entrée
# CM,c3,6, 5, 4, 3, 2, 1,PE, P0 
def getAllRefsCleanNiv(niveaux):
    sortie = []
    # toutes les ref
    allRefsClean = getAllRefsClean()
    for ref in allRefsClean:        
        for niv in niveaux:            
            if ref[0] == niv or (ref[0]==niv[0] and ref[1]==niv[1]):
                sortie.append(ref)
    return sortie

# Récupérer toutes les ref des exos déjà traités pour un niveau dans un tableau
# On passe une chaine 1e,2e,3e,4e,5e,6e,PE,Profs,...
def getAllRefsAlreadyClean(niveau):
    path = './exercices/'+niveau
    allRefsAlreadyClean = []
    # Récupérer les noms des fichiers déjà présents dans le dossier
    if os.path.exists(path):
        allRefsAlready = os.listdir(path)
        # Nettoyer les chaines de .js
        for elt in allRefsAlready:
            allRefsAlreadyClean.append(elt.replace(".js",""))
    return allRefsAlreadyClean

# Récupérer le code d'un exercice pour un niveau dans une chaine
# On passe le numero de la ligne du début du scan, le chemin vers le fichier,
# le niveau et le nom du dossier contenant déjà la fichiers traités
# On renvoie le code et le numero de la ligne avant le second /**
# et la ref de l'exo s'il na pas était traité sinon chaine vide
# Dans un tableau
def getCodeRefEx(debut_du_scan,path_to_file,niv,nivAlready):    
    file = open(path_to_file,"r")
    content = file.readlines()[debut_du_scan-1:]
    compteur = 0
    tab=[]
    for line in content:
        compteur+=1
        if (len(tab)==2):            
            break
        if "/**" in line:
            tab.append(compteur)    
    code = content[tab[0]-1:tab[1]-1]
    file.close()
    # On va récupérer la ref du code
    # on récupére toutes ref restant à traiter
    allRefsLeftClean = []
    allRefsAlreadyClean = getAllRefsAlreadyClean(nivAlready)
    allRefsCleanNiv = getAllRefsCleanNiv(niv)
    for ref in allRefsCleanNiv:
        if ref not in allRefsAlreadyClean:
            allRefsLeftClean.append(ref)
    # Initialiser reference à -1 pour pouvoir savoir si un exo est déjà traité ou non            
    reference = -1
    for elt in code:              
        for ref in allRefsLeftClean:            
            if elt.count(ref) == 1:
                reference = ref

    return [code,tab[1]-1,reference]

# Récupérer toutes les lignes sur lesquelles on a /**
# qui correspondent au début du code à récupérer
# dans un fichier donné
def getAllNbLineBeginCode(path_to_file):
    file = open(path_to_file,"r")
    content = file.readlines()
    compteur = 0
    tab=[]
    for line in content:
        compteur+=1
        if "/**" in line:
            tab.append(compteur)
    file.close()
    return tab

# Écrire le code dans un fichier si l'exo n'existe pas
# le nom du fichier, le tableau contenant le code à écrire, le niveau
def writeToFile(filename,code,niv):
    if not os.path.exists("./exercices_to_clean/"):
        os.mkdir("./exercices_to_clean/")
    path_to_write = "./exercices_to_clean/"+niv+"_to_clean/"
    if not os.path.exists(path_to_write):
        os.mkdir(path_to_write)
    file = open(path_to_write+filename+".js","w")
    entete = open("./exercices/entete.js","r")
    enteteContent = entete.readlines()
    file.writelines(enteteContent)
    file.writelines(code)
    file.close()
    entete.close()

# Remplacer la premier occurence de function
# le fichier existe puisqu'on l'a généré
def firstFunctionReplace(path_to_file):
    readFile = open(path_to_file,"r")
    fileContent = readFile.readlines()
    outFile = open(path_to_file,"w")    
    compteur=0
    ok = False
    for line in fileContent:
        if "function" in line and ok == False:            
            newLine = line.replace("function","export default function")
            outFile.write(newLine)            
            compteur+=1
            ok = True
        else:
            outFile.write(line)
    readFile.close()
    outFile.close()

# ajouter un /** */ sur la dernière ligne du fichier à traiter s'il n'y en a pas
def addEndSymb(path_to_file):
    readFile = open(path_to_file,"r")
    readFileLines = readFile.readlines()
    readFile.close()
    if readFileLines[len(readFileLines)-1] != "/** */":
        appendFile = open(path_to_file,"a")
        appendFile.write("/** */")
        appendFile.close()

if __name__ == '__main__':
############################################################################################
# Niveau 6eme et CM
############################################################################################
    # On récupère toutes les lignes avec /** au début dans le fichier    
    nbLine6 = getAllNbLineBeginCode("./include/mathalea_exercices.js")
    # On ajoute un /** et un */ à la fin du fichier car on a besoin de deux /** pour délimiter le code
    #addEndSymb("./include/mathalea_exercices.js")
    #print(nbLine6)
    tab_exo6 = []
    for nbl in nbLine6:
        # On traite tout sauf pour la dernière valeur du tableau ! Puisque c'est la dernière
        if nbl != nbLine6[len(nbLine6)-1]:
            #print("nbl : "+str(nbl))
            #print(getCodeRefEx(nbl,"./include/mathalea_exercices.js",['6'],'6e')[2])            
            if getCodeRefEx(nbl,"./include/mathalea_exercices.js",['6','CM'],'6e')[2] != -1:
                tab_exo6.append(getCodeRefEx(nbl,"./include/mathalea_exercices.js",['6','CM'],'6e'))
    #print(tab_exo6)
    # On ecrit maintenant tous les exos dans le dossier 6e_to_clean
    for exo in tab_exo6:
        writeToFile(exo[2],exo[0],'6e')
        firstFunctionReplace("./exercices_to_clean/6e_to_clean/"+exo[2]+".js")
############################################################################################
# Niveau 5eme
############################################################################################
    # On récupère toutes les lignes avec /** au début dans le fichier    
    nbLine5 = getAllNbLineBeginCode("./include/mathalea_exercices_5e.js")
    # On ajoute un /** et un */ à la fin du fichier car on a besoin de deux /** pour délimiter le code
    addEndSymb("./include/mathalea_exercices_5e.js")
    #print(nbLine5)
    tab_exo5 = []
    for nbl in nbLine5:
        # On traite tout sauf pour la dernière valeur du tableau ! Puisque c'est la dernière
        if nbl != nbLine5[len(nbLine5)-1]:
            if getCodeRefEx(nbl,"./include/mathalea_exercices_5e.js",['5'],'5e')[2] != -1:
                tab_exo5.append(getCodeRefEx(nbl,"./include/mathalea_exercices_5e.js",['5'],'5e'))
    #print(tab_exo5)
    # On ecrit maintenant tous les exos dans le dossier 5e_to_clean
    for exo in tab_exo5:
        writeToFile(exo[2],exo[0],'5e')
        firstFunctionReplace("./exercices_to_clean/5e_to_clean/"+exo[2]+".js")    
    #print(getCodeRefEx(8520,"./include/mathalea_exercices_5e.js",['5'],'5e')[2])
############################################################################################
# Niveau 4eme
############################################################################################    
    # On récupère toutes les lignes avec /** au début dans le fichier    
    nbLine4 = getAllNbLineBeginCode("./include/mathalea_exercices_4e.js")
    # On ajoute un /** et un */ à la fin du fichier car on a besoin de deux /** pour délimiter le code
    addEndSymb("./include/mathalea_exercices_4e.js")
    #print(nbLine4)
    tab_exo4 = []
    for nbl in nbLine4:
        # On traite tout sauf pour la dernière valeur du tableau ! Puisque c'est la dernière
        if nbl != nbLine4[len(nbLine4)-1]:
            if getCodeRefEx(nbl,"./include/mathalea_exercices_4e.js",['4'],'4e')[2] != -1:
                tab_exo4.append(getCodeRefEx(nbl,"./include/mathalea_exercices_4e.js",['4'],'4e'))
    #print(tab_exo4)
    # On ecrit maintenant tous les exos dans le dossier 4e_to_clean
    for exo in tab_exo4:
        writeToFile(exo[2],exo[0],'4e')
        firstFunctionReplace("./exercices_to_clean/4e_to_clean/"+exo[2]+".js")    
    #print(getCodeRefEx(12371,"./include/mathalea_exercices_4e.js",['4'],'4e')[2])
############################################################################################
# Niveau 3eme déjà fini
############################################################################################    
    # On récupère toutes les lignes avec /** au début dans le fichier    
    nbLine3 = getAllNbLineBeginCode("./include/mathalea_exercices_3e.js")
    # On ajoute un /** et un */ à la fin du fichier car on a besoin de deux /** pour délimiter le code
    addEndSymb("./include/mathalea_exercices_3e.js")
    #print(nbLine3)
    tab_exo3 = []
    for nbl in nbLine3:
        # On traite tout sauf pour la dernière valeur du tableau ! Puisque c'est la dernière
        if nbl != nbLine3[len(nbLine3)-1]:
            if getCodeRefEx(nbl,"./include/mathalea_exercices_3e.js",['3'],'3e')[2] != -1:
                tab_exo3.append(getCodeRefEx(nbl,"./include/mathalea_exercices_3e.js",['3'],'3e'))
    #print(tab_exo3)
    # On ecrit maintenant tous les exos dans le dossier 3e_to_clean
    for exo in tab_exo3:
        writeToFile(exo[2],exo[0],'3e')
        firstFunctionReplace("./exercices_to_clean/3e_to_clean/"+exo[2]+".js")    
    #print(getCodeRefEx(2,"./include/mathalea_exercices_3e.js",['3'],'3e')[2])
############################################################################################
# Niveau 2eme déjà fini
############################################################################################    

############################################################################################
# Niveau 1eme déjà fini
############################################################################################    

############################################################################################
# Niveau Profs déjà fini
############################################################################################    

############################################################################################
# Niveau PE déjà fini
############################################################################################    


    

    


    


    