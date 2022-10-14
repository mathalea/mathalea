# import re
# 
# fichier=open('./modules/2d/','r')
#  
# mesFonctions = ""
# for line in fichier:
#     fn= re.findall("export function\s([a-zA-Z0-9\_]*)",line)
#     #On recherche tout ce qui commence par `function (`
#     for fns in fn:
#         if len(fns) >1:
#             mesFonctions += fns +','
# print(mesFonctions)