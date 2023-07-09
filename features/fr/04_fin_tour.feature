# language: fr
Fonctionnalité: Fin de Tour
  La partie se joue en tours
  A la fin de chaque tour les cartes sont automatiquement placées au bon endroit
  Les points sont calculés

  Une fois le tour des joueurs terminé
  Les cartes sont automatiquement placées sur le plateau
  En suivant les règles du jeu

  Règle: A la fin du tour les cartes jouées par tout le monde sont affichées
    Exemple: Fin de tour
      Etant donné 2 joueurs dans la partie
      Et les 2 joueurs ont joué une carte
      Lorsque le tour se termine
      Alors les cartes des 2 joueurs sont affichées

  Règle: A la fin du tour les cartes jouées sont placées sur plateau
    Exemple: Valeurs croissantes
      Etant donné j'ai une carte plus grande que les cartes sur les suites du plateau
      Lorsque c'est à moi de jouer
      Alors je suis obligé de jouer la carte qui est plus grande

  Règle: La plus petite différence
    Exemple: Plus petite différence
      Et j'ai joué une carte qui est plus grande que les cartes sur le plateau
      Lorsque le tour se termine
      Alors ma carte est placée sur la suite avec la plus petite différence

  Règle: Série terminée
    Exemple: Un joueur pose la 6ème carte
      Etant donné ma carte s'ajoutera en tant que 6ème carte sur une suite
      Lorsque le tour se termine
      Alors la suite est ramassée par moi
      Et ma carte devient la nouvelle première carte de la suite ramassée

  Règle: Impossible de jouer une carte plus grande
  Il est possible de jouer une carte plus petite si on n'a pas le choix

    Exemple Jouer une carte plus petite
      Etant donné que je n'ai pas de carte dans ma main qui est plus grande que les 4 suites
      Lorsque je joue une carte plus petite
      Alors je ramasse la suite de mon choix
      Et ma carte devient la nouvelle première carte de la suite ramassée
