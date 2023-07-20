import { Deck } from '../src/model/deck';
import { type Card } from '../src/model/card';

describe('Deck', () => {
  it('Has 104 cards', () => {
    const deck = new Deck();
    expect(deck.cards).toHaveLength(104);
  });

  it('Can draw the top card', () => {
    const deck = new Deck();
    const card: Card | undefined = deck.drawCard();

    expect(card).not.toBeUndefined();
    expect(card?.number).toBe(1);
  });

  it('Is reduced by one when drawing a card', () => {
    const deck = new Deck();
    deck.drawCard();

    expect(deck.cards).toHaveLength(103);
  });

  it('Can be shuffled', () => {
    const deck = new Deck();
    deck.shuffle(999);

    const card1: Card | undefined = deck.drawCard();
    const card2: Card | undefined = deck.drawCard();

    expect(card1?.number).toBe(44);
    expect(card2?.number).toBe(48);
  });

  it('Does not get shuffled if seed is -1', () => {
    const deck = new Deck();
    deck.shuffle(-1);

    const card1: Card | undefined = deck.drawCard();
    const card2: Card | undefined = deck.drawCard();
    const card3: Card | undefined = deck.drawCard();
    const card4: Card | undefined = deck.drawCard();

    expect(card1?.number).toBe(1);
    expect(card2?.number).toBe(2);
    expect(card3?.number).toBe(3);
    expect(card4?.number).toBe(4);
  });
});
