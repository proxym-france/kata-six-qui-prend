import { Game } from '../src/model/game';
import { Player } from '../src/model/player';
import { Card } from '../src/model/card';

const initGame = (seed?: string): { game: Game; player1: Player; player2: Player } => {
  const game = new Game(seed);
  const player1 = new Player('p1');
  const player2 = new Player('p2');

  game.addPlayer(player1);
  game.addPlayer(player2);
  return { game, player1, player2 };
};

describe('Game', () => {
  it('Has players', () => {
    const game = new Game();

    game.addPlayer(new Player('p1'));

    expect(game.players).toHaveLength(1);
  });

  it('Cannot be started with only one player', () => {
    const game = new Game();
    game.addPlayer(new Player('p1'));

    expect(() => game.start()).toThrow();
  });

  it('Can be started with two or more players', () => {
    const { game } = initGame();

    game.start();

    expect(game.isStarted).toBe(true);
  });

  it('Starts with a shuffled deck of cards', () => {
    const { game } = initGame();
    game.start();

    expect(game.deck.shuffled).toBe(true);
  });

  it('Distributes 10 cards to each player at the start', () => {
    const { game } = initGame();

    game.start();

    expect(game.players[0].hand).toHaveLength(10);
    expect(game.players[1].hand).toHaveLength(10);
    expect(game.deck.cards).toHaveLength(80);
  });

  it('First player plays first', () => {
    const { game } = initGame();

    game.start();

    expect(game.currentPlayer?.name).toBe('p1');
  });

  it('Alternates player turns after they play', () => {
    const { game, player1 } = initGame();

    game.start();

    player1.playCard(player1.highestCard?.number);

    expect(game.currentPlayer?.name).toBe('p2');
  });

  it('Goes back to the first player when all players have played', () => {
    const { game, player1, player2 } = initGame();

    game.start();

    player1.playCard(player1.highestCard?.number);
    player2.playCard(player2.highestCard?.number);

    expect(game.currentPlayer?.name).toBe('p1');
  });

  it('Initializes the board with 4 cards', () => {
    const { game } = initGame();

    game.start();

    expect(game.board.cards).toHaveLength(4);
    expect(game.deck.cards).toHaveLength(80);
  });

  it('Puts all cards on the board when all players have played', () => {
    const { game, player1, player2 } = initGame('123');

    game.start();

    player1.playCard(player1.hand[0].number);
    player2.playCard(player2.hand[0].number);

    expect(game.board.cards).toHaveLength(6);
  });

  it('Does not allow the same player to play twice', () => {
    const { game, player1 } = initGame();

    game.start();

    player1.playCard(player1.highestCard?.number);

    expect(() => player1.playCard(player1.hand[0].number)).toThrow();
  });

  it("Increases player's points when they pick up a row", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { game, player1, player2 } = initGame('123');

    const player3 = new Player('p3');
    const player4 = new Player('p4');

    game.addPlayer(player3);
    game.addPlayer(player4);

    game.start();

    do {
      player1.playCard(player1.highestCard?.number);
      player2.playCard(player2.highestCard?.number);
      player3.playCard(player3.highestCard?.number);
      player4.playCard(player4.highestCard?.number);
    } while (player1.wonCards.length === 0);

    expect(player3.wonCards).toHaveLength(5);
  });

  it.each([0, 2])(
    'Forces a player to play a higher card unless they do not have any',
    (cardNumber) => {
      const { game, player1 } = initGame('123');

      game.start();

      /* eslint-disable @typescript-eslint/dot-notation */
      game.board['_rows'][1]['_cards'][0] = new Card(99);
      game.board['_rows'][1]['_cards'][0] = new Card(98);
      game.board['_rows'][2]['_cards'][0] = new Card(97);
      game.board['_rows'][3]['_cards'][0] = new Card(96);

      player1['_hand'] = [new Card(1), new Card(100), new Card(4)];
      expect(() => player1.playCard(player1.hand[cardNumber].number)).toThrow();
      /* eslint-enable */
    }
  );

  it.each([0, 1, 2])(
    'Allows the player to play any lower card if they have no choice',
    (cardNumber) => {
      const { game, player1 } = initGame('123');

      game.start();

      /* eslint-disable @typescript-eslint/dot-notation */
      game.board['_rows'][1]['_cards'][0] = new Card(99);
      game.board['_rows'][1]['_cards'][0] = new Card(98);
      game.board['_rows'][2]['_cards'][0] = new Card(97);
      game.board['_rows'][3]['_cards'][0] = new Card(96);

      player1['_hand'] = [new Card(1), new Card(2), new Card(3)];
      expect(() => player1.playCard(player1.hand[cardNumber].number)).not.toThrow();
      /* eslint-enable */
    }
  );

  it('Starts at first manche', () => {
    const { game } = initGame('123');
    expect(game.manche).toBe(1);
  });

  it("Starts a new 'manche' when all cards are played", () => {
    const { game, player1, player2 } = initGame('123');
    game.start();

    do {
      player1.playCard(player1.highestCard?.number);
      player2.playCard(player2.highestCard?.number);
    } while (player1.hand.length === 0);

    expect(game.manche).toBe(2);
  });

  it('Ends when a player has 66 points', () => {
    const { game, player1, player2 } = initGame('123');
    game.start();

    do {
      player1.playCard(player1.highestCard?.number);
      player2.playCard(player2.highestCard?.number);
    } while (player1.points < 66);

    expect(game.ended).toBe(true);
  });

  it('Cards are not placed in rows before all players played', () => {
    const { game, player1 } = initGame('123');

    game.start();

    player1.playCard(player1.hand[0].number);
    expect(game.board.cards).toHaveLength(4);
    expect(game.trick).toHaveLength(1);
  });
});
