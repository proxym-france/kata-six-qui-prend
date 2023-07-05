Feature: End of Turn
  The game is played in turns.
  At the end of each turn, the cards are automatically placed in the right position.
  Points are calculated.

  Once the players' turn is finished,
  The cards are automatically placed on the board
  Following the game rules.

  Rule: At the end of the turn, the played cards by everyone are displayed.
    Example: End of turn
      Given there are 2 players in the game
      And both players have played a card
      When the turn ends
      Then the cards of the 2 players are displayed.

  Rule: At the end of the turn, the played cards are placed on the board.
    Example: Increasing values
      Given I have a card larger than the cards on the columns of the board
      When it's my turn to play
      Then I am obliged to play the larger card.

  Rule: Smallest difference
    Example: Smallest difference
      And I have played a card that is larger than the cards on the board
      When the turn ends
      Then my card is placed in the column with the smallest difference.

  Rule: Series ended
    Example: A player places the 6th card
      Given my card will be added as the 6th card on a column
      When the turn ends
      Then the column is picked up by me
      And my card becomes the new first card of the picked up column.

  Rule: Unable to play a larger card
    It is possible to play a smaller card if there is no choice.
    Example: Play a smaller card
      Given that I don't have a card in my hand that is larger than the 4 columns
      When I play a smaller card
      Then I pick up the column of my choice
      And my card becomes the new first card of the picked up column.