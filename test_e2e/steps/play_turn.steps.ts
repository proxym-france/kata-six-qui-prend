import { Given, Then, When } from '@cucumber/cucumber';
import { type GameWorld } from './support/game-world';
import { By, until, type WebDriver, type WebElement } from 'selenium-webdriver';
import expect from 'expect';
import {
  findTrickCard,
  getBoardCards,
  getCurrentPlayer,
  getPlayerCards,
  getPlayerCardsRaw,
  getPreviousPlayerCards,
  playCard,
  playHighestCard
} from './support/helpers';
import { MAX_CARDS_PER_PLAYER } from '../../src/model/player';

Given(/^the game has two players$/, async function (this: GameWorld) {
  const players = await this.driver.findElements(By.className('player'));
  expect(players.length).toBe(2);
});

When(/^it's the first player's turn to play$/, async function (this: GameWorld) {
  const players = await this.driver.findElements(By.className('player'));
  const className = await players[0].getAttribute('class');

  expect(className).toBe('player current');
});

Then(/^they cannot see the cards of the second player$/, async function (this: GameWorld) {
  const handElements = await this.driver.findElements(By.className('hand'));
  const allVisibleCards = await this.driver.findElements(By.css('.card.visible'));
  expect(handElements).toHaveLength(1);
  expect(allVisibleCards).toHaveLength(MAX_CARDS_PER_PLAYER + 4);
});

When(/^it's the second player's turn to play$/, async function (this: GameWorld) {
  this.firstPlayerCards = await getPlayerCards(this.driver);

  await playHighestCard(this.driver, true);
  const players = await this.driver.findElements(By.className('player'));
  const className = await players[1].getAttribute('class');

  expect(className).toBe('player current');
});

Then(/^they cannot see the cards of the first player$/, async function (this: GameWorld) {
  const currentPlayerCards = await getPlayerCards(this.driver);

  expect(currentPlayerCards).not.toEqual(this.firstPlayerCards);
});

Given(/^it's my turn to play$/, function () {
  // NOOP
});

When(/^I (?:select|have selected) a card from my hand$/, async function (this: GameWorld) {
  const highestCard = await playHighestCard(this.driver);
  this.playedCards = [];
  this.playedCards.push(highestCard);
});

When(/^I select another card from my hand$/, async function () {
  const playedCard = await playCard(this.driver, 0);
  this.playedCards.push(playedCard);
});

Then(/^the card is played in the trick$/, async function (this: GameWorld) {
  const trickElement = await this.driver.wait(until.elementLocated(By.id('trick')));
  const card = trickElement.findElement(By.className('card'));
  const attribute = await card.getAttribute('data-number');

  expect(attribute).toEqual(this.playedCards[0].toString());
});

Then(/^the new card replaces the previous one$/, async function (this: GameWorld) {
  const trickCards = await findTrickCard(this.driver);
  const trickCardNumber = parseInt(await trickCards[0].getAttribute('data-number'));

  expect(this.playedCards[this.playedCards.length - 1]).toEqual(trickCardNumber);
});

Then(/^the card is removed from my hand$/, async function (this: GameWorld) {
  await this.driver.findElement(By.id('done')).click();
  await this.driver.findElement(By.id('next')).click();

  const cards = await getPreviousPlayerCards(this.driver);

  expect(cards.length).toEqual(MAX_CARDS_PER_PLAYER - 1);
});

When(/^I finish my turn$/, async function (this: GameWorld) {
  await playHighestCard(this.driver, true);
});

When(/^I have played a card$/, async function (this: GameWorld) {
  await playHighestCard(this.driver);
  await this.driver.findElement(By.id('done')).click();
});

Then(/^my cards are hidden, both in hand and in trick$/, async function (this: GameWorld) {
  const trickCards = await findTrickCard(this.driver);

  const classes = await trickCards[0].getAttribute('class');

  expect(classes).toEqual('card hidden');
  const visibleCards = await getPlayerCardsRaw(this.driver, true);

  expect(visibleCards).toHaveLength(MAX_CARDS_PER_PLAYER);
});

Then(/^it's the next player's turn to play$/, async function (this: GameWorld) {
  const text = await getCurrentPlayer(this.driver);
  expect(text).toEqual('Player 1');
});

Given(/^A player has payed before me$/, async function (this: GameWorld) {
  await playHighestCard(this.driver);
  await this.driver.findElement(By.id('done')).click();
});

When(/^I press next$/, async function (this: GameWorld) {
  await this.driver.findElement(By.id('next')).click();
});

When(/^then my cards in my hand are shown$/, async function (this: GameWorld) {
  const visibleCards = await getPlayerCardsRaw(this.driver);
  expect(visibleCards).toHaveLength(MAX_CARDS_PER_PLAYER);
});

When(/^the card the previous player played is hidden$/, async function (this: GameWorld) {
  const trickCards = await findTrickCard(this.driver);
  const elementCss = await trickCards[0].getAttribute('class');
  expect(elementCss).toEqual('card hidden');
});

Then(/^it's the first player's turn to start the next round$/, async function (this: GameWorld) {
  const currentPlayer = await getCurrentPlayer(this.driver);
  expect(currentPlayer).toEqual('Player 0');
});

Given(/^I am the last player$/, async function (this: GameWorld) {
  await playHighestCard(this.driver, true);
});

Then(/^the round of the game is finished$/, async function (this: GameWorld) {
  const boardCards = await getBoardCards(this.driver);

  // 4 initial cards + 2 after tour ended
  expect(boardCards).toHaveLength(6);
});
