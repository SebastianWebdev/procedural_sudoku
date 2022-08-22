import { createSquare, createSquaresMap } from '../SmallSquare';
const key = '0:0';

describe('SmallSquare', () => {
  const square = createSquare(key);
  const map = createSquaresMap();
  describe('created square', () => {
    it('has correst properties', () => {
      expect(square.choosenNumber).toEqual(0);
      expect(square.key).toEqual(key);
      expect(square.possibleNumbers.length).toEqual(9);
    });
  });
  describe('createSquareMap', () => {
    it('return a correct Map', () => {
      expect(map.size).toEqual(9 * 9);
    });
  });
});
