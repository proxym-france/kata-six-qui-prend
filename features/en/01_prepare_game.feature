Feature: Prepare a Game
  As a game master
  I want to define the number of players
  So that everyone around the table can play

  Rule: The number of players is between 2 and 10
    Example: Minimum number of players
      Given the game master selects 2 players
      When we start the game
      Then the game starts

    Example: Too few players
      Given the game master selects only 1 player
      When we start the game
      Then the game does not start

  @only
  Rule: Each player is assigned a color
    For each game, the mapping is fixed, as follows:
    1 = Blue
    2 = Red
    3 = Yellow
    4 = Green
    5 = Orange
    6 = Purple
    7 = Pink
    8 = Brown
    9 = Gray
    Scenario Outline:
      Given I am player number <num>
      When we start the game
      Then I have the following color <color>
      Examples:
        | num | color  |
        | 2   | red   |
        | 5   | orange |
        | 8   | brown  |
