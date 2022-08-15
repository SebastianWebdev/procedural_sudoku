import { INITIAL_POSSIBLE_NUMBERS } from '../constants';
import { arraysDiff } from '../utils';

export interface Coords {
  row: number;
  col: number;
}

const INITIAL_COORDS: Coords = {
  row: 0,
  col: 0,
};

export class Square {
  private coords: Coords = INITIAL_COORDS;
  private possibleNumbers: number[] = INITIAL_POSSIBLE_NUMBERS;
  public choosenNumber: number = 0;

  constructor(row: number, col: number) {
    this.coords = { row, col };
  }

  removeNumbersFromPossibilites = (numbersToRemove: number[]) => {
    this.possibleNumbers = arraysDiff(this.possibleNumbers, numbersToRemove);
  };

  get PossibleNumbers() {
    return [...this.possibleNumbers];
  }

  get row(): Coords['row'] {
    return this.coords.row;
  }

  get column(): Coords['col'] {
    return this.coords.col;
  }

  get Coords(): Coords {
    return this.coords;
  }
}
