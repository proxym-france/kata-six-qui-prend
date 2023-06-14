import { type Card } from './card';
import { Column } from './column';

export enum BoardColumn {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
  FOURTH = 3
}

export class Board {
  private readonly _columns: Column[] = [new Column(), new Column(), new Column(), new Column()];

  public get cards(): Card[] {
    return this._columns.map((col) => col.cards).flatMap(cards => cards);
  }

  public addCard(card: Card | undefined): Card[] | undefined {
    if (card == null) {
      throw new Error('Unable to add an undefined card to the board');
    }

    let cardPlaced = false;
    let previousDiff = 105;
    let columnToPlace = 0;
    let result;

    // check if card is smaller than all last cards
    if (this.cardIsSmallerThanAll(card)) {
      const columnWithLeastPoints = this.columnWithLeastPoints();
      columnWithLeastPoints.addCard(card);
      return columnWithLeastPoints.pickUp();
    } else {
      for (const col of this._columns) {
        const lastCardInColumn = col.lastCard;

        if (lastCardInColumn == null) {
          result = col.addCard(card);
          cardPlaced = true;
          break;
        }

        if (card.number - lastCardInColumn.number < 0) {
          continue;
        }

        if (card.number - lastCardInColumn.number < previousDiff) {
          previousDiff = card.number - lastCardInColumn.number
          columnToPlace = this._columns.indexOf(col);
        }
      }

      if (!cardPlaced) {
        result = this._columns[columnToPlace].addCard(card);
      }
    }

    return result;
  }

  private columnWithLeastPoints(): Column {
    let column: Column = this._columns[0];
    let leastPoints = column.points;

    for (const col of this._columns) {
      if (col.points < leastPoints) {
        leastPoints = col.points;
        column = col;
      }
    }

    return column;
  }

  public cardIsSmallerThanAll(card: Card): boolean {
    let isSmaller = true;

    for (const col of this._columns) {
      if (col.lastCard == null) {
        return false;
      }
      isSmaller = isSmaller && card.number < col.lastCard?.number
    }

    return isSmaller;
  }

  public getColumn(number: BoardColumn): Column {
    return this._columns[number];
  }
}
