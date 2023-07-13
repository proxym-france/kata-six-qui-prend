import { type Player } from './player';
import { Deck } from './deck';
import { type Card } from './card';
import { Board } from './board';

interface CardAndPlayer {
  card: Card;
  player: Player;
}

export class Game {
  private readonly _players: Player[] = [];
  private _isStarted: boolean;
  private readonly _deck: Deck;
  private _currentPlayer = 0;
  private readonly _board: Board;
  private _ended = false;
  private _trick: CardAndPlayer[] = [];
  private _manche: number = 1;
  private readonly _seed: string;

  constructor(_seed?: string) {
    this._isStarted = false;
    this._deck = new Deck();
    this._board = new Board();
    this._currentPlayer = 0;
    this._seed = _seed != null ? _seed : Math.random().toString();
  }

  public get seed(): string {
    return this._seed;
  }

  public get deck(): Deck {
    return this._deck;
  }

  public get manche(): number {
    return this._manche;
  }

  public get ended(): boolean {
    return this._ended;
  }

  public get trick(): CardAndPlayer[] {
    return this._trick;
  }

  public get board(): Board {
    return this._board;
  }

  private readonly onPlayCard = (player: Player, card: Card): void => {
    if (player !== this.currentPlayer) {
      throw new Error('Not current player');
    }
    if (
      this.board.cardIsSmallerThanAll(card) &&
      player.hand.find((c) => c.number > card.number) != null
    ) {
      throw new Error('You need to play a higher card if you have one');
    }
    if (player.hand.length === 0) {
      this.start();
    }

    this._currentPlayer++;

    this._trick.push({ card, player });
    console.log('Player played', player);

    // Tour completed
    if (this._currentPlayer >= this.players.length) {
      this._currentPlayer = 0;
      for (const cardAndPlayer of this.trick) {
        this.playCardsPriv(cardAndPlayer.card, cardAndPlayer.player);
      }
      this._trick = [];
    }
  };

  private playCardsPriv(card: Card, player: Player): void {
    const result = this.board.addCard(card);

    if (result != null) {
      player.winPoints(result);

      if (player.points >= 66) {
        this._ended = true;
      }
    }
  }

  public addPlayer(player: Player): void {
    this._players.push(player);

    player.onPlayCard = this.onPlayCard;
  }

  public get isStarted(): boolean {
    return this._isStarted;
  }

  public get players(): Player[] {
    return this._players;
  }

  public get currentPlayer(): Player | undefined {
    return this._players[this._currentPlayer];
  }

  public start(): void {
    if (this._players.length < 2) {
      throw new Error('Need at least two players');
    }

    // TODO this seed should change for each "manche"
    this._deck.shuffle(this.seed);

    if (!this._isStarted) {
      for (let i = 0; i < 4; i++) {
        const drawCard = this._deck.drawCard();
        if (drawCard == null) {
          throw new Error('No cards in beginning of game');
        }
        this._board.addCard(drawCard);
      }

      this._isStarted = true;
      this._manche++;
    }

    for (const player of this._players) {
      for (let i = 0; i < 10; i++) {
        const card = this._deck.drawCard();

        if (card === undefined) {
          throw new Error('No more cards in deck');
        }
        player.receiveCard(card);
      }
    }

    this._ended = false;
  }
}
