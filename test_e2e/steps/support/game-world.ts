import { type IWorldOptions, World } from '@cucumber/cucumber';
import { type WebDriver, type WebElement } from 'selenium-webdriver';

export class GameWorld extends World {
  public driver!: WebDriver;
  public handElement!: WebElement;
  public hand!: WebElement[];
  public firstPlayerCards!: number[];
  public playedCards: number[];
  public playerNumber: number = -1;

  constructor(props: IWorldOptions) {
    super(props);
    this.playedCards = [];
  }
}
