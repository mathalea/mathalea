# Scan le répertoire /exercices puis ecris le fichier /module/liste_des_exercices.json
#

import os       # Gestion des fichiers
import re       # Gestion des expressions régulières
import json     # Gestion du json

'''
    Remplace le contenu du fichier 'modules/liste_des_exercices.json' par l'objet data au format json
'''
def write_json(data, filename='modules/liste_des_exercices.json'):
    with open(filename, 'w', encoding="utf8") as f:
        json.dump(data, f, sort_keys=True, indent=4, ensure_ascii=False)





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
                        # Espaces du début
                        line = re.sub('^\s*', '', line)
                        # Gestion des \\  
                        line = line.replace('\\\\','\\')
                        dictionnaireDesRef[os.path.splitext(file)[0]] = {
                                                            "url": dirpath.replace('./', '/')+'/'+file, "titre": line}


write_json(dictionnaireDesRef)

        


