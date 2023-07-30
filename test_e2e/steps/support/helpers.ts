import { By, until, type WebDriver, type WebElement } from 'selenium-webdriver';
import fs from 'fs';
import { type GameWorld } from './game-world';

export const waitForNetworkIdle = async (driver: WebDriver): Promise<void> => {
  return await driver.executeScript(async () => {
    const promise = new Promise((resolve) => {
      requestIdleCallback(() => {
        resolve('');
      });
    });

    return await promise;
  });
};

export const getNumeral = async (card: WebElement): Promise<number> => {
  return parseInt(await card.findElement(By.className('numeral')).getText());
};

export const selectPlayers = async (world: GameWorld, players: number): Promise<void> => {
  const driver = world.driver;

  const webElement = await driver.wait(until.elementLocated(By.id('add-player')));

  for (let i = 0; i < players; i++) {
    await webElement.click();
  }
};

export const takeScreenshot = async (world: GameWorld, driver: WebDriver): Promise<void> => {
  const screenshot = await driver.takeScreenshot();

  world.attach(screenshot, 'image/png');
  fs.writeFileSync('./report/game_started.png', screenshot, 'base64');
};
