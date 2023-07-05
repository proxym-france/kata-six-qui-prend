# language: fr
Fonctionnalité: Encaissement des points
  En tant que joueur
  Je souhaite que le jeux calcul les points encaisser par tout le monde
  Pour savoir qui gagne

  Les cartes du jeu ont une valeur différente en fonction de leur numéro, tel que :
  Cartes qui finissent par 5 possèdent 2 TdB
  Cartes qui finissent par 0 possèdent 3 TdB
  Formant un doublet (11, 22, etc.) possèdent 5 TdB
  Le nombre 55 est à la fois un doublet et un nombre 5, cette carte contient donc 7 TdB !

  Règle: En ramassant une colonne le joueur encaisse la somme des poins des cartes ramassées
    Exemple: Placing the 7th card on a column
      Etant donné une colonne de 6 cartes
      Lorsque je pose la 7ème carte sur la colonne
      Alors Je ramasse toutes les cartes de la colonne sauf la mienne (qui devient la nouvelle 1ère carte)
      Et J'encaisse la somme des points des cartes que j'ai ramassé
