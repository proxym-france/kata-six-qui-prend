import { World } from '@cucumber/cucumber';
import { type WebDriver } from 'selenium-webdriver';
import fs from 'fs';

export class GameWorld extends World {
  public driver!: WebDriver;
}
