# language: fr
Fonctionnalité: Définir les joueurs
  En tant que game master
  Je souhaite définir le nombre de joueurs
  Pour que tout le monde autour de la table puisse jouer

  Règle: Le nombre de joueurs est de 2 à 10
    Exemple: Minimum de joueurs
      Etant donné le maître du jeu sélectionne 2 joueurs
      Lorsqu'on essaie de démarrer la partie
      Alors la partie démarre

    Exemple: Trop peu de joueurs
      Etant donné le maître du jeu sélectionne 1 seul joueur
      Lorsque on essaie de démarrer la partie
      Alors la partie ne démarre pas

  Règle: Chaque joueur est attribué une couleur
    Pour chaque partie, le mapping est fixe, tel que :
      2 = Bleu
      3 = Rouge
      4 = Jaune
      5 = Vert
      6 = Orange
      7 = Violet
      8 = Rose
      9 = Marron
      10 = Gris
    Plan du Scénario:
      Quand Je suis le joueur numéro <num>
      Lorsque La partie commence
      Alors J'ai la couloeur suivante <color>
      Exemples:
        | num | color  |
        | 2   | Bleu   |
        | 6   | Orange |
        | 9   | Marron |
