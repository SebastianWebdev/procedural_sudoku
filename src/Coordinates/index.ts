import {} from '../utils';
import { ROWS_SIZE, COLUMNS_SIZE } from '../constants';
import { Coords } from '../types';

export function createCoordsKey({ col, row }: Coords) {
  return `${row}:${col}`;
}

export function findCoordinatesForCol(col: number): string[] {
  const result: string[] = [];
  for (let row = 0; row < ROWS_SIZE; row++) {
    result.push(createCoordsKey({ col, row }));
  }
  return result;
}

export function findCoordinatesForRow(row: number): string[] {
  const result: string[] = [];
  for (let col = 0; col < COLUMNS_SIZE; col++) {
    result.push(createCoordsKey({ col, row }));
  }
  return result;
}

export function findCoordinatesForBigSquare({ col, row }: Coords) {
  const colMin = Math.floor(col / 3) * 3;
  const colMax = colMin + 2;
  const rowMin = Math.floor(row / 3) * 3;
  const rowMax = rowMin + 2;
  const result: string[] = [];
  for (let r = rowMin; r <= rowMax; r++) {
    for (let c = colMin; c <= colMax; c++) {
      result.push(createCoordsKey({ col: c, row: r }));
    }
  }
  return result;
}
