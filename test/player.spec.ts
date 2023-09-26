import { Player } from '../src/model/player';
import { Card } from '../src/model/card';
import { Game } from '../src/model/game';
import expect from 'expect';

const createPlayer = (): Player => {
  return new Player(1, 'p1');
};

describe('Player', () => {
  it('Can receive cards in their hand', () => {
    const player = createPlayer();

    const card = new Card(1);

    player.receiveCard(card);

    expect(player.hand).toHaveLength(1);
  });

  it('Cannot play if not part of a game', () => {
    const player = createPlayer();

    const card = new Card(1);

    player.receiveCard(card);

    expect(() => player.playCard(1)).toThrow();
  });

  it('Cannot play a card that is not in their hand', () => {
    const player = createPlayer();

    const card = new Card(1);

    player.receiveCard(card);

    expect(() => player.playCard(2)).toThrow();
  });

  it('When playing a card it is removed from their hand', () => {
    const player1 = createPlayer();
    const player2 = new Player(2, 'p2');

    const card1 = new Card(1);
    const card2 = new Card(2);

    player1.receiveCard(card1);
    player1.receiveCard(card2);
    const game = new Game();
    game.addPlayer(player1);
    game.addPlayer(player2);

    player1.playCard(1);

    expect(player1.hand).toHaveLength(1);
  });

  it('Has a score equal to the points of the cards they won', () => {
    const player = createPlayer();
    player.winPoints([new Card(55), new Card(1)]);
    expect(player.points).toBe(8);
  });

  it("Can play it's highest hard", () => {
    const player = createPlayer();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    player['_hand'] = [new Card(1), new Card(88), new Card(3)];

    expect(player.highestCard).toEqual(expect.objectContaining({ number: 88 }));
  });

  it('Cannot hold more than 10 cards', () => {
    const player = createPlayer();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    player['_hand'] = [
      new Card(1),
      new Card(2),
      new Card(3),
      new Card(4),
      new Card(5),
      new Card(6),
      new Card(7),
      new Card(8),
      new Card(9),
      new Card(10)
    ];

    expect(() => player.receiveCard(new Card(11))).toThrow();
  });

  it('Can return the cards they won', () => {
    const player = createPlayer();

    player.winPoints([new Card(1), new Card(2)]);

    const obj1 = expect.objectContaining({ number: 1 });
    const obj2 = expect.objectContaining({ number: 2 });

    expect(player.returnCards()).toEqual(expect.arrayContaining([obj1, obj2]));
    expect(player.wonCards).toHaveLength(0);
  });

  it('Hand is always ordered in ascending order', () => {
    const player = createPlayer();

    player.receiveCard(new Card(1));
    player.receiveCard(new Card(3));
    player.receiveCard(new Card(5));

    player.receiveCard(new Card(4));

    expect(player.hand[2]).toEqual(new Card(4));
  });

  it.each([
    { number: 1, color: 'blue' },
    { number: 2, color: 'red' },
    { number: 3, color: 'yellow' },
    { number: 4, color: 'green' },
    { number: 5, color: 'orange' },
    { number: 6, color: 'purple' },
    { number: 7, color: 'pink' },
    { number: 8, color: 'brown' },
    { number: 9, color: 'gray' }
  ])('has an associated color', (playerColor) => {
    const player = new Player(playerColor.number, 'Player 1');
    expect(player.color).toEqual(playerColor.color);
  });
});
