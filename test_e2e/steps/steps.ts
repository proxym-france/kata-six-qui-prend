import { Given, Then, When } from '@cucumber/cucumber';
import { By, until } from 'selenium-webdriver';
import { type GameWorld } from './support/game-world';
import { selectPlayers, takeScreenshot, waitForNetworkIdle } from './support/helpers';
import expect from 'expect';

export const startGame = async (
  world: GameWorld,
  expectError: boolean | undefined
): Promise<void> => {
  const driver = world.driver;

  const locator = By.id('start-game');
  await driver.wait(until.elementLocated(locator));
  await driver.findElement(locator).click();

  if (expectError !== true) {
    world.handElement = await world.driver.wait(until.elementLocated(By.className('hand')));
    world.hand = await world.handElement.findElements(By.className('card'));
  }
};

Given('the game master selects {int} players', async function (this: GameWorld, players: number) {
  await selectPlayers(this, players);
});

Given('the game master selects only 1 player', async function (this: GameWorld) {
  await selectPlayers(this, 1);
});

When('we try to start the game', async function (this: GameWorld) {
  await startGame(this, true);
});

Then('the game starts', async function (this: GameWorld) {
  const driver = this.driver;
  await driver.wait(until.elementLocated(By.id('board')));

  await waitForNetworkIdle(driver);
  await takeScreenshot(this, driver);
});

Then('the game does not start', async function (this: GameWorld) {
  const driver = this.driver;
  await driver.wait(until.alertIsPresent(), 1000);

  const alert = await driver.switchTo().alert();
  const alertText = await alert.getText();

  expect(alertText).toBe('Need at least two players');
});
