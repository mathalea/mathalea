import os
 
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
    
    dirName = 'items';
    
    # Get the list of all files in directory tree at given path
    listOfFiles = getListOfFiles(dirName)
    
    # Print the files
    # for elem in listOfFiles:
    #     if os.path.splitext(elem)[1]=='.tex' and os.path.splitext(elem)[0][-4:]!="-cor":
    #         print('"'+elem+'"',end=",")
    #         pass
 
    
    # Get the list of all files in directory tree at given path
    listOfFiles = list()
    for (dirpath, dirnames, filenames) in os.walk(dirName):
        listOfFiles += [[dirpath, file, os.path.splitext(file)[0]+'-cor.tex'] for file in filenames if os.path.splitext(file)[1]=='.tex' and os.path.splitext(file)[0][-4:]!="-cor"]
        
        
    # Print the files    
    print(listOfFiles)  
        
        
        
        
if __name__ == '__main__':
    main()