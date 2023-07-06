import { Player } from '../src/model/player';
import { Card } from '../src/model/card';
import { Game } from '../src/model/game';

describe('Player', () => {
  it('Can receive cards in their hand', () => {
    const player = new Player('p1');

    const card = new Card(1);

    player.receiveCard(card);

    expect(player.hand).toHaveLength(1);
  })

  it('Cannot play if not part of a game', () => {
    const player = new Player('p1');

    const card = new Card(1);

    player.receiveCard(card);

    expect(() => player.playCard(1)).toThrow();
  })

  it('Cannot play a card that is not in their hand', () => {
    const player = new Player('p1');

    const card = new Card(1);

    player.receiveCard(card);

    expect(() => player.playCard(2)).toThrow();
  })

  it('When playing a card it is removed from their hand', () => {
    const player1 = new Player('p1');
    const player2 = new Player('p1');

    const card1 = new Card(1);
    const card2 = new Card(2);

    player1.receiveCard(card1);
    player1.receiveCard(card2);
    const game = new Game();
    game.addPlayer(player1);
    game.addPlayer(player2);

    player1.playCard(1);

    expect(player1.hand).toHaveLength(1);
  })

  it('Has a score equal to the points of the cards they won', () => {
    const player = new Player('p1');
    player.winPoints([new Card(55), new Card(1)]);
    expect(player.points).toBe(8);
  })

  it('Can play it\'s highest hard', () => {
    const player = new Player('p1');

    // eslint-disable-next-line @typescript-eslint/dot-notation
    player['_hand'] = [new Card(1), new Card(88), new Card(3)]

    expect(player.highestCard).toEqual(expect.objectContaining({ number: 88 }));
  })
})
