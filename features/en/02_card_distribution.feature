Feature: Card Distribution
  As a player
  I want the cards to be distributed automatically
  So that I can start playing faster

  There are a total of 104 cards in the game, numbered from 1 to 104
  Each card is assigned a number from 1 to 104

  Rule: Each player receives 10 random cards at the beginning of the game
    Example: 10 random cards
      Given I am a player
      When I receive my cards at the beginning of the game
      Then the cards are random
      And I have ten cards in my hand

  Rule: The player's cards are sorted in ascending order
    Example: Ascending order
      Given I am a player
      When I receive my cards at the beginning of the game
      Then my cards are sorted in ascending order

  Rule: 4 cards are placed on the board at the beginning of the game
    Example: Cards on the board
      When the game starts
      Then 4 random cards are placed on the board

  Rule: The game starts with 4 cards out of the 104 cards that have not been distributed to the players
    Example: 4 cards out of 104
      Given there are 4 players playing
      When the game starts
      Then the remaining cards in the card deck are 60
