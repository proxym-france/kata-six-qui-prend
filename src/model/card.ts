export class Card {
  private readonly _number: number;

  constructor(number: number) {
    if (number < 1 || number > 104) {
      throw new Error('Invalid card number');
    }
    this._number = number;
  }

  public get number(): number {
    return this._number;
  }

  public get points(): number {
    let points = 0;
    const ending5 = this._number % 5 === 0 && this._number % 10 !== 0;
    const ending10 = this._number % 10 === 0;
    const twoSameDigits = this._number % 10 === Math.floor(this._number / 10);

    if (ending5) {
      points += 2;
    }
    if (ending10) {
      points += 3;
    }
    if (twoSameDigits) {
      points += 5;
    }
    if (!ending5 && !ending10 && !twoSameDigits) {
      points += 1;
    }

    return points;
  }
}
