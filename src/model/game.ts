import { MAX_CARDS_PER_PLAYER, type Player } from './player';
import { Deck } from './deck';
import { type Card } from './card';
import { Board } from './board';

export interface CardAndPlayer {
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
  private readonly _seed: number;
  private _turnCallback: any = undefined;

  constructor(_seed?: number) {
    this._isStarted = false;
    this._deck = new Deck();
    this._board = new Board();
    this._currentPlayer = 0;
    this._seed = _seed != null ? _seed : Math.random();
  }

  public set turnCallback(turnCallback: any) {
    this._turnCallback = turnCallback;
  }

  public get seed(): number {
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

  private readonly onPlayCard = (player: Player, playedCard: Card): void => {
    if (player !== this.currentPlayer) {
      throw new Error('Not current player');
    }

    const hasABiggerCard = player.hand.find((card) => !this.board.cardIsSmallerThanAll(card));

    if (this.board.cardIsSmallerThanAll(playedCard) && hasABiggerCard != null) {
      throw new Error('You need to play a higher card if you have one');
    }
    this._currentPlayer++;

    this._trick.push({ card: playedCard, player });

    // Tour completed
    if (this._currentPlayer >= this.players.length) {
      this._currentPlayer = 0;

      for (const cardAndPlayer of this.trick) {
        this.playCardsPriv(cardAndPlayer.card, cardAndPlayer.player);
      }
      this._trick = [];

      if (player.hand.length === 0) {
        this.start();
      }

      if (this._turnCallback !== undefined) {
        this._turnCallback();
      }
    }
  };

  private playCardsPriv(card: Card, player: Player): void {
    console.log('Board:\n', this.board.print());

    const result = this.board.addCard(card);

    if (result != null) {
      player.winPoints(result);

      if (player.points >= 66) {
        this._ended = true;
      }
    }
  }

  public addPlayer(newPlayer: Player): void {
    if (this._players.find((p) => p.name === newPlayer.name) != null) {
      throw new Error(`Player ${newPlayer.name} already exists`);
    }
    this._players.push(newPlayer);

    newPlayer.onPlayCard = this.onPlayCard;
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

    const returnedCards = this._players
      .map((p) => p.returnCards())
      .reduce((prev, currentValue) => {
        prev.push(...currentValue);
        return prev;
      });
    this._deck.cards.push(...returnedCards);
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
      for (let i = 0; i < MAX_CARDS_PER_PLAYER; i++) {
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
