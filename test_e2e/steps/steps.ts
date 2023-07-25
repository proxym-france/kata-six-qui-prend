import { Given, Then, When } from '@cucumber/cucumber';
import { By, until } from 'selenium-webdriver';
import { type GameWorld } from './support/game-world';
import { takeScreenshot, waitForNetworkIdle } from './support/helpers';
import expect from 'expect';

async function selectPlayers(this: GameWorld, players: number): Promise<void> {
  const driver = this.driver;

  const webElement = await driver.wait(until.elementLocated(By.id('add-player')));

  for (let i = 0; i < players; i++) {
    await webElement.click();
  }
}

Given('the game master selects {int} players', async function (this: GameWorld, players: number) {
  await selectPlayers.call(this, players);
});

Given('the game master selects only 1 player', async function (this: GameWorld) {
  await selectPlayers.call(this, 1);
});

When('we try to start the game', async function (this: GameWorld) {
  const driver = this.driver;

  const locator = By.id('start-game');
  await driver.wait(until.elementLocated(locator));
  await driver.findElement(locator).click();
});

Then('the game starts', async function (this: GameWorld) {
  const driver = this.driver;
  await driver.wait(until.elementLocated(By.className('board')));

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
