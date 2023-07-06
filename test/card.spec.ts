import { Card } from '../src/model/card';

describe('Card', () => {
  it('Has a number', () => {
    const card = new Card(1);
    expect(card.number).toBe(1);
  })

  it('Cannot go over 104', () => {
    expect(() => new Card(105)).toThrow();
  })

  it('Cannot be less than 1', () => {
    expect(() => new Card(0)).toThrow();
    expect(() => new Card(-1)).toThrow();
  })

  describe('Cards carry negative points', () => {
    it('2 points for all cards ending in 5', () => {
      const card = new Card(5);
      expect(card.points).toBe(2);
    })

    it('3 points for all cards ending in 0', () => {
      const card = new Card(10);
      expect(card.points).toBe(3);
    })

    it.each([11, 22, 33, 44, 99])('5 points for cards with two same digits (%p)', (number: number) => {
      const card = new Card(number);
      expect(card.points).toBe(5);
    });

    it('7 points for the card 55', () => {
      const card = new Card(55);
      expect(card.points).toBe(7);
    })

    it('1 point for all other cards', () => {
      const card = new Card(16);
      expect(card.points).toBe(1);
    })
  })
});
