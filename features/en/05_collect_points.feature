Feature: Points Collection
  As a player
  I want the game to calculate the points collected by everyone
  To determine the winner.

  Rule: By picking up a row, the player collects the sum of the points of the collected cards.
    Example: Placing the 6th card on a row
      Given A row of cards with 5 cards
      When I place the 6th card on that colmun
      Then I take all the cards except the one I placed (it becomes the new first card)
      And I collect the sum of all the points of the cards I picked up
