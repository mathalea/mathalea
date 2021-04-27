# -*- coding: utf-8 -*-
# Scan le répertoire /exercices puis ecris le fichier /module/dictionnaireDesExercicesAleatoires
#

import os       # Gestion des fichiers
import re       # Gestion des expressions régulières
import json     # Gestion du json

'''
    Remplace le contenu du fichier './modules/dictionnaireDesExercicesAleatoires.js' par l'objet data au format json
'''
def write_json(data, filename ='./modules/dictionnaireDesExercicesAleatoires.js'):
    with open(filename, 'w+', encoding="utf8") as f:
        json.dump(data, f, sort_keys=True, indent=4, ensure_ascii=False)

'''
    Ajoute une première ligne au fichier
'''
def prepend_line(line, filename ='./modules/dictionnaireDesExercicesAleatoires.js'):
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





dictionnaireDesRef = {}

for (dirpath, dirnames, filenames) in os.walk('./exercices/'):
    # Parcourt tout le répertoire /exercices
    for file in filenames:
        if os.path.splitext(file)[1] == '.js' and os.path.splitext(file)[0] != 'ClasseExercice' and os.path.splitext(file)[0][0] != '_':
        # On ouvre tous les fichiers js sauf ClasseExercice et ceux qui commencent par _
            with open(dirpath+'/'+file, encoding="utf8", errors='ignore') as searchfile:
                for line in searchfile:
                    if 'this.titre=' in line or 'this.titre =' in line:
                        # Enlève this.titre
                        line = re.sub(
                            'this.titre\s*=\s*(\"|\'|`)\s*', '', line)
                        # Guillemets et ; de la fin
                        line = re.sub('\s*(\"|\'|`)\s*\;\s*$', '', line)
                        # Guillemets de la fin s'il n'y a pas de ;
                        line = re.sub('\s*(\"|\'|`)\s*$', '', line)
                        # Espaces du début
                        line = re.sub('^\s*', '', line)
                        # Gestion des \\  
                        line = line.replace('\\\\','\\')
                        dictionnaireDesRef[os.path.splitext(file)[0]] = {
                                                            "url": dirpath.replace('./', '/')+'/'+file, "titre": line}


write_json(dictionnaireDesRef)
prepend_line("export let dictionnaireDesExercicesAleatoires = ")

        


