import { Row } from '../src/model/row';
import { Card } from '../src/model/card';

describe('Row', () => {
  it('Can be picked up when 6 cards placed', () => {
    const col = initRows();

    const result = col.addCard(new Card(6));
    expect(result?.length).toBe(5);
  })

  it('After a row is picked up the last card becomes the first', () => {
    const col = initRows();

    const card = new Card(55);
    col.addCard(card);

    expect(col.length).toBe(1);
    expect(col.lastCard).toBe(card);
  })

  it('Cannot have two times the same card', () => {
    const col = initRows();

    const card = new Card(55);
    col.addCard(card);
    expect(() => col.addCard(card)).toThrow()
  })

  it('Cannot have 0 cards left', () => {
    const row = new Row();
    expect(() => row.pickUp()).toThrow();
  })
})

const initRows = (): Row => {
  const col = new Row();

  col.addCard(new Card(1));
  col.addCard(new Card(2));
  col.addCard(new Card(3));
  col.addCard(new Card(4));
  col.addCard(new Card(5));
  return col;
}
