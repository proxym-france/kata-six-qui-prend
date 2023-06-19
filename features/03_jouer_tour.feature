# language: fr

Fonctionnalité: Jouer son tour
  En tant que joueur
  Je souhaite jouer mon tour
  Pour essayer de gagner la partie

  Le joueur doit être en mesure de voir :
  Son numéro de joueur
  Sa couleur
  Le plateau
  Uniquement ses cartes

  Règle: Le joueur ne voit que leurs cartes
    Exemple: Premieur joueur ne voit pas les cartes du 2eme
      Etant donné la partie a deux joueurs
      Lorsque c'est au premier joueur de jouer
      Alors il ne voit pas les cartes du deuxième joueur

  Règle: Les joueurs sélectionnent tous une carte à jouer
    Exemple: Jouer une carte
      Etant donné c'est à moi de jouer
      Lorsque je sélectionne une carte de ma main
      Alors la carte est "jouée"

    Exemple: Changer de carte
      Etant donné c'est à moi de jouer
      Et j'ai déjà joué une carte
      Lorsque je sélectionne une autre carte dans ma main
      Alors la nouvelle carte remplace la précédente

  Règle: Les joueurs jouent à tour de rôle
    Exemple: Joueur suivant
      Etant donné c'est à moi de jouer
      Et je suis joueur numéro 1
      Lorsque je termine mon tour
      Alors c'est au joueur suivant de jouer

  Règle: Une fois tous les joueur ont joué le tour est fini
    Exemple: Fin de tour
      Etant donné Je suis le dernier joueur
      Et c'est à moi de jouer
      Lorsque je termine mon tour
      Alors le tour de la partie est fini
      Et c'est au premier joueur de commencer le prochain tour
