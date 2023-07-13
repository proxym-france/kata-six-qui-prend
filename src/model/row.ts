import { type Card } from './card';

export class Row {
  private _cards: Card[] = [];

  public get lastCard(): Card | undefined {
    if (this.length === 0) {
      return undefined;
    }

    return this._cards[this.length - 1];
  }

  public get cards(): Card[] {
    return this._cards;
  }

  public addCard(card: Card): Card[] | undefined {
    if (this.cards.find((c) => c.number === card.number) != null) {
      throw new Error('Duplicate cards not allowed');
    }

    this._cards.push(card);

    if (this._cards.length === 6) {
      return this.pickUp();
    }
    return undefined;
  }

  public pickUp(): Card[] {
    const slicedCards = this._cards.slice(0, this.length - 1);

    if (this.lastCard == null) {
      throw new Error('There is no card left after picking up');
    }
    this._cards = [this.lastCard];

    return slicedCards;
  }

  public get length(): number {
    return this._cards.length;
  }

  public get points(): number {
    return this._cards
      .map((c) => c.points)
      .reduce((prev, current) => prev + current);
  }
}
