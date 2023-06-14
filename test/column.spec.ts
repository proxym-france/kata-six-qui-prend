import { Column } from '../src/model/column';
import { Card } from '../src/model/card';

describe('Column', () => {
  it('Can be picked up when 6 cards placed', () => {
    const col = initColumn();

    const result = col.addCard(new Card(6));
    expect(result?.length).toBe(5);
  })

  it('After a column is picked up the last card becomes the first', () => {
    const col = initColumn();

    const card = new Card(55);
    col.addCard(card);

    expect(col.length).toBe(1);
    expect(col.lastCard).toBe(card);
  })

  it('Cannot have two times the same card', () => {
    const col = initColumn();

    const card = new Card(55);
    col.addCard(card);
    expect(() => col.addCard(card)).toThrow()
  })
})

const initColumn = (): Column => {
  const col = new Column();

  col.addCard(new Card(1));
  col.addCard(new Card(2));
  col.addCard(new Card(3));
  col.addCard(new Card(4));
  col.addCard(new Card(5));
  return col;
}
