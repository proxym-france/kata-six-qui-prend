import { type Card } from './card';
import { Row } from './row';

export enum BoardRow {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
  FOURTH = 3
}

export class Board {
  private readonly _rows: Row[] = [new Row(), new Row(), new Row(), new Row()];

  public get cards(): Card[] {
    return this._rows.map((col) => col.cards).flatMap(cards => cards);
  }

  public addCard(card: Card | undefined): Card[] | undefined {
    if (card == null) {
      throw new Error('Unable to add an undefined card to the board');
    }

    let cardPlaced = false;
    let previousDiff = 105;
    let rowToPlace = 0;
    let result;

    // check if card is smaller than all last cards
    if (this.cardIsSmallerThanAll(card)) {
      const rowWithLeastPoints = this.leastPoints();
      rowWithLeastPoints.addCard(card);
      return rowWithLeastPoints.pickUp();
    } else {
      for (const col of this._rows) {
        const lastCardInRow = col.lastCard;

        if (lastCardInRow == null) {
          result = col.addCard(card);
          cardPlaced = true;
          break;
        }

        if (card.number - lastCardInRow.number < 0) {
          continue;
        }

        if (card.number - lastCardInRow.number < previousDiff) {
          previousDiff = card.number - lastCardInRow.number
          rowToPlace = this._rows.indexOf(col);
        }
      }

      if (!cardPlaced) {
        result = this._rows[rowToPlace].addCard(card);
      }
    }

    return result;
  }

  private leastPoints(): Row {
    let row: Row = this._rows[0];
    let leastPoints = row.points;

    for (const col of this._rows) {
      if (col.points < leastPoints) {
        leastPoints = col.points;
        row = col;
      }
    }

    return row;
  }

  public cardIsSmallerThanAll(card: Card): boolean {
    let isSmaller = true;

    for (const col of this._rows) {
      if (col.lastCard == null) {
        return false;
      }
      isSmaller = isSmaller && card.number < col.lastCard?.number
    }

    return isSmaller;
  }

  public getRow(number: BoardRow): Row {
    return this._rows[number];
  }
}
