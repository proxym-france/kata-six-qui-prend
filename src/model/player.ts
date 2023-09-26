import { type Card } from './card';

type OnPlayCardCallback = (player: Player, card: Card) => void;

export const MAX_CARDS_PER_PLAYER = 10;

export class Player {
  private _hand: Card[] = [];
  private readonly _name: string;
  private _onPlayCard: OnPlayCardCallback | undefined;
  private _points: number = 0;
  private _wonCards: Card[] = [];

  constructor(name: string, hand: Card[] = [], points = 0, wonCards: Card[] = []) {
    this._name = name;
    this._hand = hand;
    this._points = points;
    this._wonCards = wonCards;
  }

  public get wonCards(): Card[] {
    return this._wonCards;
  }

  public winPoints(cards: Card[]): void {
    this._points += cards.map((c) => c.points).reduce((prev, current) => prev + current, 0);
    this.wonCards.push(...cards);
  }

  public set onPlayCard(callback: OnPlayCardCallback) {
    this._onPlayCard = callback;
  }

  public get name(): string {
    return this._name;
  }

  public get hand(): Card[] {
    return this._hand;
  }

  public receiveCard(card: Card): void {
    if (this._hand.length === MAX_CARDS_PER_PLAYER) {
      throw new Error('Player cannot hold more than 10 cards');
    }

    this._hand.push(card);

    this._hand.sort((a: Card, b: Card): number => {
      return a.number - b.number;
    });
  }

  playCard(number: number | undefined): void {
    const card = this.hand.find((c) => c.number === number);
    if (card == null) {
      throw new Error('Invalid card to play');
    }

    if (this._onPlayCard == null) {
      throw new Error('Player is not registered for game');
    }

    try {
      this._hand.splice(this.hand.indexOf(card), 1);
      this._onPlayCard(this, card);
    } catch (e) {
      this._hand.push(card);
      console.error('Errr .. todo', e);
      throw e;
    }
  }

  public get highestCard(): Card | undefined {
    let highestCard = this._hand[0];

    for (const card of this._hand) {
      if (card.number > highestCard.number) {
        highestCard = card;
      }
    }
    return highestCard;
  }

  public get points(): number {
    return this._points;
  }

  public returnCards(): Card[] {
    const toReturn = this.wonCards;
    this._wonCards = [];
    return toReturn;
  }
}
