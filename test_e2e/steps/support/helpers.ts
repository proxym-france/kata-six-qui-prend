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

export const getPlayerCards = async (driver: WebDriver): Promise<number[]> => {
  const hand = await driver.wait(until.elementLocated(By.className('hand')));
  return await Promise.all((await hand.findElements(By.className('card'))).map(getNumeral));
};

export const getPreviousPlayerCards = async (driver: WebDriver): Promise<number[]> => {
  return await driver.executeScript(async () => {
    const promise = new Promise((resolve) => {
      requestIdleCallback(() => {
        resolve((document as any).game._players[0]._hand.map((card: any) => card._number));
      });
    });

    return await promise;
  });
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
  fs.writeFileSync('./report/game_started.png', screenshot, { encoding: 'base64' });

  world.attach(screenshot, {
    mediaType: 'base64:image/png',
    fileName: './report/game_started.png'
  });
};

export const playHighestCard = async (
  driver: WebDriver,
  done: boolean = false
): Promise<number> => {
  const numbers = await getPlayerCards(driver);
  const max = Math.max(...numbers);

  const highestCardElement = await driver.findElement(By.css(`.card[data-number = "${max}"]`));
  await driver.actions().doubleClick(highestCardElement).perform();

  if (done) {
    await driver.findElement(By.id('done')).click();
    await driver.findElement(By.id('next')).click();
  }

  return max;
};

export const playCard = async (
  driver: WebDriver,
  cardPosition: number,
  done: boolean = false
): Promise<number> => {
  const cards = await driver.findElements(By.css('.hand .card'));

  const nthCard = cards[cardPosition];
  await driver.actions().doubleClick(nthCard).perform();

  if (done) {
    await driver.findElement(By.id('done')).click();
    await driver.findElement(By.id('next')).click();
  }

  return parseInt(await nthCard.getAttribute('data-number'));
};
