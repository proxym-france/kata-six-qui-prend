import { Board, BoardColumn } from '../src/model/board';
import { Card } from '../src/model/card';

describe('Board', () => {
  it('Places the first 4 cards in each column', () => {
    const board = new Board();
    const { card1, card3, card2, card4 } = initCards(board);

    expect(board.getColumn(BoardColumn.FIRST).cards).toContain(card1);
    expect(board.getColumn(BoardColumn.SECOND).cards).toContain(card2);
    expect(board.getColumn(BoardColumn.THIRD).cards).toContain(card3);
    expect(board.getColumn(BoardColumn.FOURTH).cards).toContain(card4);
  })

  it('Playing a lower card will pick the column with smallest result', () => {
    const board = new Board();
    initCards(board);

    const card = new Card(1);
    const result = board.addCard(card);

    expect(board.getColumn(BoardColumn.FIRST).cards).toContain(card);
    expect(board.getColumn(BoardColumn.FIRST).cards).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ number: 8 })]));
  })

  it('Places new cards on the column with the closest possible value', () => {
    const board = new Board();
    initCards(board);

    const card: Card = new Card(28);
    board.addCard(card);

    expect(board.getColumn(BoardColumn.FOURTH).lastCard).toBe(card);
  })
})

const initCards = (board: Board): { card1: Card; card2: Card; card3: Card; card4: Card } => {
  const card1 = new Card(8);
  const card3 = new Card(16);
  const card2 = new Card(35);
  const card4 = new Card(27);

  board.addCard(card1)
  board.addCard(card2)
  board.addCard(card3)
  board.addCard(card4)
  return { card1, card3, card2, card4 };
}
