import { Given, Then, When } from '@cucumber/cucumber';
import { selectPlayers, startGame } from './steps';
import { type GameWorld } from './support/game-world';
import { By, until } from 'selenium-webdriver';
import expect from 'expect';

Given(/^the game has started$/, async function (this: GameWorld) {
  await selectPlayers.call(this, 2);
  await startGame.call(this);
});

When(/^I receive my cards at the beginning of the game$/, async function (this: GameWorld) {
  const handElement = await this.driver.wait(until.elementLocated(By.className('hand')));
  this.handElement = handElement;

  expect(handElement).not.toBeUndefined();
});

Then(/^the cards are random$/, async function (this: GameWorld) {
  const cards = await this.handElement.findElements(By.className('card'));
  this.cards = cards;

  const unsortedCards = (
    await Promise.all(
      cards.map(async (card) => await card.findElement(By.className('numeral')).getText())
    )
  ).map((cardStr) => parseInt(cardStr));

  const sortedCards = [...unsortedCards].sort((a, b) => {
    return a - b;
  });

  expect(unsortedCards).not.toEqual(sortedCards);
});

Then(/^I have ten cards in my hand$/, async function (this: GameWorld) {
  expect(this.cards).toHaveLength(10);
});
