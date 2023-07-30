@only
Feature: Prepare a Game
  As a game master
  I want to define the number of players
  So that everyone around the table can play

  Rule: The number of players is between 2 and 10
    Example: Minimum number of players
      Given the game master selects 2 players
      When we try to start the game
      Then the game starts

    Example: Too few players
      Given the game master selects only 1 player
      When we try to start the game
      Then the game does not start
  @not_developed
  Rule: Each player is assigned a color
    For each game, the mapping is fixed, as follows:
    2 = Blue
    3 = Red
    4 = Yellow
    5 = Green
    6 = Orange
    7 = Purple
    8 = Pink
    9 = Brown
    10 = Gray
    Scenario Outline:
      When I am player number <num>
      When the game starts
      Then I have the following color <color>
      Examples:
        | num | color  |
        | 2   | Blue   |
        | 6   | Orange |
        | 9   | Brown  |
