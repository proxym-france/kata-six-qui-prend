# language: fr
Fonctionnalité: Encaissement des points
  En tant que joueur
  Je souhaite que le jeux calcul les points encaisser par tout le monde
  Pour savoir qui gagne

  Les cartes du jeu ont une valeur différente en fonction de leur numéro, tel que :
  1 tête de boeuf : Celles qui ne sont pas citées ci dessous entre 1 et 104
  2 têtes de boeuf : 5; 15; 25; 35; 45; 65; 75; 85; 95
  3 têtes de boeuf : 10; 20; 30; 40; 50; 60; 70; 80; 90; 100
  5 têtes de boeuf : 11; 22; 33; 44; 55; 66; 77; 88; 99
  7 têtes de boeuf : 55

  Règle: En ramassant une colonne le joueur encaisse la somme des poins des cartes ramassées
    Exemple: Placing the 7th card on a column
      Etant donné une colonne de 6 cartes
      Lorsque je pose la 7ème carte sur la colonne
      Alors Je ramasse toutes les cartes de la colonne sauf la mienne (qui devient la nouvelle 1ère carte)
      Et J'encaisse la somme des points des cartes que j'ai ramassé
