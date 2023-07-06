Feature: Points Collection
  As a player
  I want the game to calculate the points collected by everyone
  To determine the winner.

  Rule: By picking up a column, the player collects the sum of the points of the collected cards.
    Example: Placing the 7th card on a column
      Given A column of cards with 6 cards
      When I place the 7th card on that colmun
      Then I take all the cards except the one I placed (it becomes the new first card)
      And I collect the sum of all the points of the cards I picked up
