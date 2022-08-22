import {
  findCoordinatesForBigSquare,
  findCoordinatesForCol,
  findCoordinatesForRow,
  createCoordsKey,
} from '../Coordinates';
import { areArrayEquals } from '../utils';

describe('Coordinates', () => {
  const rowCoords = ['0:0', '0:1', '0:2', '0:3', '0:4', '0:5', '0:6', '0:7', '0:8'];
  const columCoords = ['0:0', '1:0', '2:0', '3:0', '4:0', '5:0', '6:0', '7:0', '8:0'];
  const bigSquareCoords = ['0:0', '0:1', '0:2', '1:0', '1:1', '1:2', '2:0', '2:1', '2:2'];
  describe('createCoordsKey', () => {
    it('creates valid key for given row and col', () => {
      expect(createCoordsKey({ col: 0, row: 0 })).toEqual('0:0');
    });
  });
  describe('findCoordinatesForRow', () => {
    it('find correct coordinates for row', () => {
      expect(areArrayEquals(findCoordinatesForRow(0), rowCoords)).toBe(true);
      expect(areArrayEquals(findCoordinatesForRow(1), rowCoords)).toBe(false);
    });
  });
  describe('findCoordinatesForCol', () => {
    it('find correct coordinates for given column', () => {
      expect(areArrayEquals(findCoordinatesForCol(0), columCoords)).toBe(true);
      expect(areArrayEquals(findCoordinatesForCol(1), columCoords)).toBe(false);
    });
  });
  describe('findCoordinatesForBigSquare', () => {
    it(' find coordinates for given big Square', () => {
      console.log(findCoordinatesForBigSquare({ col: 0, row: 0 }), 'findCoordinatesForBigSquare({ col: 0, row: 0 })');

      expect(areArrayEquals(findCoordinatesForBigSquare({ col: 0, row: 0 }), bigSquareCoords, { noOrder: true })).toBe(
        true,
      );
      expect(areArrayEquals(findCoordinatesForBigSquare({ col: 3, row: 0 }), bigSquareCoords, { noOrder: true })).toBe(
        false,
      );
    });
  });
});
