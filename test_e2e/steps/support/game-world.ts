import { World } from '@cucumber/cucumber';
import { type WebDriver, type WebElement } from 'selenium-webdriver';

export class GameWorld extends World {
  public driver!: WebDriver;
  public handElement!: WebElement;
  public hand!: WebElement[];
}
