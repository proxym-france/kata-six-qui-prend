# language: fr

Fonctionnalité: Distribution des cartes
  En tant que joueur
  Je souhaite que les cartes soit distribuées automatiquement
  Pour que je puisse commencer à jouer plus vite

  Au total, il y a 104 cartes dans le jeu, numérottées de 1 à 104
  Les cartes du jeu ont une valeur différente en fonction de leur numéro, tel que :
  1 tête de boeuf : Celles qui ne sont pas citées ci dessous entre 1 et 104
  2 têtes de boeuf : 5; 15; 25; 35; 45; 65; 75; 85; 95
  3 têtes de boeuf : 10; 20; 30; 40; 50; 60; 70; 80; 90; 100
  5 têtes de boeuf : 11; 22; 33; 44; 55; 66; 77; 88; 99
  7 têtes de boeuf : 55

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



