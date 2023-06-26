# language: fr

Fonctionnalité: Distribution des cartes
  En tant que joueur
  Je souhaite que les cartes soit distribuées automatiquement
  Pour que je puisse commencer à jouer plus vite

  Au total, il y a 104 cartes dans le jeu, numérottées de 1 à 104
  Chaque carte a un numéro attribué de 1 à 104


  Règle: Chaque joueur reçoi 10 cartes aléatoires au début de la partie
    Exemple: 10 cartes aléatoires
      Etant donné je suis un joueur
      Lorsque je reçois mes cartes au début de la partie
      Alors les cartes sont aléatoires
      Et j'ai dix cartes dans ma main

  Règle: Les cartes du joueur sont triées par ordre croissant
    Exemple: Ordre croissant
      Etant donné je suis un joueur
      Lorsque je reçois mes cartes au début de la partie
      Alors mes cartes sont triés par ordre croissant


  Règle: 4 cartes sont placées sur le plateau au début de la partie
    Exemple: Cartes sur le plateau
      Lorsque la partie démarre
      Alors 4 cartes aléatoires sont placées sur le plateau

  Règle: Le jeu démarre avec 4 cartes parmi les 104 cartes n’ayant pas été distribuées aux joueurs
    Exemple: 4 cartes parmi les 104
      Etant donné 4 joueurs qui jouent
      Lorsque la partie démarre
      Alors les cartes restante dans le jeu de cartes sont 60



