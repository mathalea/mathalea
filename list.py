import os
import re # Pour la gestion des expressions régulières
 
'''
    For the given path, get the List of all files in the directory tree 
'''
def getListOfFiles(dirName):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        else:
            allFiles.append(fullPath)
                
    return allFiles        
 
 
def main():
    
    dirName = './exercices';
    
    # Get the list of all files in directory tree at given path
    listOfFiles = getListOfFiles(dirName)
    
    
    # Get the list of all files in directory tree at given path
    listOfFiles = list()
    dictionnaireDesRef = '{'

    for (dirpath, dirnames, filenames) in os.walk(dirName):
        # listOfFiles += [[os.path.splitext(file)[0],dirpath+'/'+file] for file in filenames if os.path.splitext(file)[1]=='.js']
        # dictionnaireDesRef.update(dict((os.path.splitext(file)[0],dirpath+'/'+file) for file in filenames if os.path.splitext(file)[1]=='.js'))
        for file in filenames :
            if os.path.splitext(file)[1]=='.js' and os.path.splitext(file)[0]!='ClasseExercice' :
                with open(dirpath+'/'+file, encoding="utf8", errors='ignore') as searchfile:
                    for line in searchfile:
                        if 'this.titre' in line:
                            line = re.sub('this.titre\s*=\s*(\"|\')\s*','',line) # Enlève this.titre
                            line = re.sub('\s*(\"|\')\s*\;\s*$','',line) # Guillemets et ; de la fin
                            line = re.sub('^\s*','',line) # Espaces du début
                            dictionnaireDesRef += '"'+os.path.splitext(file)[0]+'":{"url":"'+dirpath+'/'+file+'","titre":"'+line+'"},'
            
    #print(listOfFiles)
    dictionnaireDesRef += '};'
    print(dictionnaireDesRef) 
        
if __name__ == '__main__':
    main()