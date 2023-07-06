# language: fr
Fonctionnalité: Encaissement des points
  En tant que joueur
  Je souhaite que le jeux calcul les points encaisser par tout le monde
  Pour savoir qui gagne

  Règle: En ramassant une colonne le joueur encaisse la somme des poins des cartes ramassées
    Exemple: Placing the 7th card on a column
      Etant donné une colonne de 6 cartes
      Lorsque je pose la 7ème carte sur la colonne
      Alors Je ramasse toutes les cartes de la colonne sauf la mienne (qui devient la nouvelle 1ère carte)
      Et J'encaisse la somme des points des cartes que j'ai ramassé
