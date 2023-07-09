# language: fr
Fonctionnalité: Encaissement des points
  En tant que joueur
  Je souhaite que le jeux calcul les points encaisser par tout le monde
  Pour savoir qui gagne

  Règle: En ramassant une suite le joueur encaisse la somme des poins des cartes ramassées
    Exemple: Placing the 6th card on a row
      Etant donné une suite de 5 cartes
      Lorsque je pose la 6ème carte sur la suite
      Alors Je ramasse toutes les cartes de la suite sauf la mienne (qui devient la nouvelle 1ère carte)
      Et J'encaisse la somme des points des cartes que j'ai ramassé
