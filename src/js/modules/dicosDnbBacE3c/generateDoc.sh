#!/bin/bash

# @author : Sébastien LOZANO

########################################################################################################################################
#==========> https://pdoc3.github.io/pdoc/
#
#  Script pour générer automatiquement la documentation du package du projet
#==========>  documentation est le dossier créé qui contiendra la doc HTML dans un sous-dossier du nom du module, ici dicosDnbBacE3c
#==========>  src/js/modules/dicosDnbBacE3c est le chemin vers le dossier contenant les modules du projet
#
########################################################################################################################################

pdoc --force --html -o jsdoc/static src/js/modules/dicosDnbBacE3c