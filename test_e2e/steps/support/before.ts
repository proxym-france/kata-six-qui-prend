import { After, AfterStep, Before } from '@cucumber/cucumber';
import { Builder, until } from 'selenium-webdriver';
import { type GameWorld } from './game-world';

Before(async function (this: GameWorld) {
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().setTimeouts({ implicit: 10_000 });

  this.driver = driver;

  try {
    await driver.get('http://localhost:3000');
    await driver.wait(until.titleIs('React App'));
    console.log('done');
  } catch (error: any) {
    console.log('Error opening browser', error);
    await this.driver.quit();
  }
});

After(async function (this: GameWorld) {
  try {
    if (this.driver != null) {
      await this.driver.quit();
    }
  } catch (e) {
    console.error('Error closing driver', e);
  }
});

AfterStep(async function (this: GameWorld): Promise<void> {
  await this.driver.sleep(0);
});
