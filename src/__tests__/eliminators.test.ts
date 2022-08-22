import { eliminateNumbersFromCol } from '../Board/eliminators';
import { createSquaresMap, findSquares } from '../SmallSquare';
import { findCoordinatesForRow, findCoordinatesForCol } from '../Coordinates';
import { SmallSquare } from '../types';

describe('Eliminators', () => {
  const choosenNumber = 2;
  const initBoard = createSquaresMap();
  describe('eliminateNumberFromRow()', () => {
    it('Eliminates choosen number from all squares in givin row', () => {
      const eliminated = eliminateNumbersFromCol(initBoard, choosenNumber, '0:0');
      const coordinatesForColumn = findCoordinatesForCol(0);
      const squares = findSquares(eliminated, coordinatesForColumn);
      const predicate = (square: SmallSquare) => square.possibleNumbers.filter((n) => n === choosenNumber).length !== 0;
      const squaresContainingChoosenNumber = squares.filter(predicate);
      expect(squaresContainingChoosenNumber.length).toEqual(0);
    });
  });
});
