import { type Card } from './card';

type OnPlayCardCallback = (player: Player, card: Card) => void;

export class Player {
  private _hand: Card[] = [];
  private readonly _name: string;
  private _onPlayCard: OnPlayCardCallback | undefined;
  private readonly _wonCards: Card[] = [];

  constructor(name: string) {
    this._name = name;
  }

  public get wonCards(): Card[] {
    return this._wonCards;
  }

  public winPoints(cards: Card[]): void {
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
    if (this._hand.length === 10) {
      throw new Error('Player cannot hold more than 10 cards');
    }
    this._hand.push(card);
  }

  playCard(number: number | undefined): void {
    const card = this.hand.find((c) => c.number === number);
    if (card == null) {
      throw new Error('Invalid card to play');
    }

    if (this._onPlayCard == null) {
      throw new Error('Player is not registered for game');
    }

    this._hand.splice(this.hand.indexOf(card), 1);

    this._onPlayCard(this, card);
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
    return this._wonCards.map((c) => c.points).reduce((prev, current) => prev + current, 0);
  }
}
