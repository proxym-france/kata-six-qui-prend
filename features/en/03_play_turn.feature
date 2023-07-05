Feature: Take a Turn
  As a player
  I want to take my turn
  To try to win the game

  The player should be able to see:
  Their player number
  Their color
  The game board
  Only their own cards

  Rule: The player can only see their own cards
    Example: First player cannot see the cards of the second player
      Given the game has two players
      When it's the first player's turn to play
      Then they cannot see the cards of the second player

  Rule: Players all select a card to play
    Example: Play a card
      Given it's my turn to play
      When I select a card from my hand
      Then the card is "played"

    Example: Change card
      Given it's my turn to play
      And I have already played a card
      When I select another card from my hand
      Then the new card replaces the previous one

  Rule: Players take turns playing
    Example: Next player
      Given it's my turn to play
      And I am player number 1
      When I finish my turn
      Then it's the next player's turn to play

  Rule: Once all players have taken their turns, the round is finished
    Example: End of round
      Given I am the last player
      And it's my turn to play
      When I finish my turn
      Then the round of the game is finished
      And it's the first player's turn to start the next round
