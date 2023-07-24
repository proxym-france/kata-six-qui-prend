import { type WebDriver } from 'selenium-webdriver';
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

export const takeScreenshot = async (world: GameWorld, driver: WebDriver): Promise<void> => {
  const screenshot = await driver.takeScreenshot();

  world.attach(screenshot, 'image/png');
  fs.writeFileSync('./report/game_started.png', screenshot, 'base64');
};
