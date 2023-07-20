import { Card } from './card';
import seedrandom from 'seedrandom';

export class Deck {
  private _cards: Card[] = [];
  private _shuffled: boolean = false;

  constructor() {
    for (let i = 1; i < 105; i++) {
      this._cards.push(new Card(i));
    }
  }

  public get cards(): Card[] {
    return this._cards;
  }

  public shuffle(seed: number): void {
    if (seed !== -1) {
      const rng = seedrandom(seed.toString());
      this._cards = this._cards.sort((a, b) => 0.5 - rng());
    }

    this._shuffled = true;
  }

  public get shuffled(): boolean {
    return this._shuffled;
  }

  public drawCard(): Card | undefined {
    return this._cards.shift();
  }
}
