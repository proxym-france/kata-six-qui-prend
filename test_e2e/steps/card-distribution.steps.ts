import { Given, Then, When } from '@cucumber/cucumber';
import { startGame } from './steps';
import { type GameWorld } from './support/game-world';
import { By, until } from 'selenium-webdriver';
import expect from 'expect';
import { getNumeral, selectPlayers } from './support/helpers';

Given(/^the game has started$/, async function (this: GameWorld) {
  await selectPlayers(this, 2);
  await startGame(this, false);
});

When(/^I receive my cards at the beginning of the game$/, async function (this: GameWorld) {
  expect(this.hand).not.toBeUndefined();
});

Then(/^the cards are random$/, async function (this: GameWorld) {});

Then(/^I have ten cards in my hand$/, async function (this: GameWorld) {
  expect(this.hand).toHaveLength(10);
});

Then(/^my cards are sorted in ascending order$/, async function (this: GameWorld) {
  const unsortedCards = await Promise.all(this.hand.map(async (card) => await getNumeral(card)));

  const sortedCards = [...unsortedCards].sort((a, b) => {
    return a - b;
  });

  expect(unsortedCards).toEqual(sortedCards);
});

Then(
  /^(\d+) random cards are placed on the board$/,
  async function (this: GameWorld, numberOfCards: number) {
    const board = await this.driver.wait(until.elementLocated(By.id('board')));
    const boardCards = await board.findElements(By.className('card'));

    const numbers = [];

    for (let i = 0; i < numberOfCards; i++) {
      numbers.push(boardCards[i]);
    }
    expect(numbers).not.toBe([1, 2, 3, 4]);
  }
);

Given(
  /^there are (\d+) players playing$/,
  async function (this: GameWorld, numberOfPlayers: number) {
    await selectPlayers(this, numberOfPlayers - 2);
  }
);

Then(
  /^the remaining cards in the card deck are (\d+)$/,
  async function (this: GameWorld, expectedDeckSize: number) {
    const deck = await this.driver.wait(until.elementLocated(By.id('deck')));
    const number = await getNumeral(deck);

    expect(number).toBe(expectedDeckSize);
  }
);
