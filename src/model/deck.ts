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

  public shuffle(seed?: string): void {
    if (seed != null) {
      const rng = seedrandom(seed);
      this._cards = this._cards.sort((a, b) => 0.5 - rng());
    } else {
      this._cards = this._cards.sort((a, b) => 0.5 - Math.random());
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
