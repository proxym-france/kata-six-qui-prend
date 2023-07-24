import { Given, Then, When } from '@cucumber/cucumber';
import { By, until } from 'selenium-webdriver';
import { type GameWorld } from './support/game-world';
import * as fs from 'fs';
import { takeScreenshot, waitForNetworkIdle } from './support/helpers';

Given('the game master selects 2 players', async function (this: GameWorld) {
  const driver = this.driver;

  const webElement = await driver.wait(until.elementLocated(By.id('add-player')));

  await webElement.click();
  await webElement.click();
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
