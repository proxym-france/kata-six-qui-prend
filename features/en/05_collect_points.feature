Feature: Points Collection
  As a player
  I want the game to calculate the points collected by everyone
  To determine the winner.

  The game cards have different values based on their number, as follows:
  1 cow head: Those not mentioned below between 1 and 104
  2 cow heads: 5, 15, 25, 35, 45, 65, 75, 85, 95
  3 cow heads: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  5 cow heads: 11, 22, 33, 44, 55, 66, 77, 88, 99
  7 cow heads: 55

  Rule: By picking up a column, the player collects the sum of the points of the collected cards.
    Example: Placing the 7th card on a column
      Given A column of cards with 6 cards
      When I place the 7th card on that colmun
      Then I take all the cards except the one I placed (it becomes the new first card)
      And I collect the sum of all the points of the cards I picked up
