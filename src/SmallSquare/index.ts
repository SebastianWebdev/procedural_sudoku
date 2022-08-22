// TODO: Make better file management, part of functions move to another files; example eliminators
// TODO: Write tests for rest of functions
import { INITIAL_POSSIBLE_NUMBERS, ROWS_SIZE, COLUMNS_SIZE } from '../constants';
import { arraysDiff, drawRandomElementFromArray } from '../utils';
import { SmallSquare, Coords, SmallSquaresMap } from '../types';
import { createCoordsKey } from '../Coordinates';

export function createSquare(key: string): SmallSquare {
  return {
    key,
    possibleNumbers: INITIAL_POSSIBLE_NUMBERS,
    choosenNumber: 0,
  };
}

export function readCoords(square: SmallSquare): Coords {
  const { key } = square;
  const arr = key.split(':');
  if (arr.length !== 2) {
    throw new Error('Key for coords have to be composed of a number:number string example: 1:2');
  }
  const maped = arr.map((s) => parseInt(s, 10));
  return { row: maped[0], col: maped[1] };
}

export function createSquaresMap() {
  const arr = new Array(81).fill(0);
  const maped = arr.map((_el, i) => {
    const col = i % 9;
    const row = Math.ceil(i / 9);
    const key = createCoordsKey({ row, col });
    return [key, createSquare(key)] as const;
  });
  const map = new Map<string, SmallSquare>(maped);
  return map;
}

export function getRow(square: SmallSquare): number {
  return readCoords(square).row;
}

export function getCol(square: SmallSquare): number {
  return readCoords(square).col;
}

export function findSquares(squaresMap: SmallSquaresMap, coordinates: string[]) {
  const result: SmallSquare[] = [];
  for (const key of coordinates) {
    result.push(squaresMap.get(key) as SmallSquare);
  }
  return result;
}

export function removeNumbersFromPossibilites(square: SmallSquare, numbersToEliminate: number[]): SmallSquare {
  const { possibleNumbers, choosenNumber, key } = square;
  return { key, choosenNumber, possibleNumbers: arraysDiff(possibleNumbers, numbersToEliminate) };
}

export function drawNumberForSmallSquare(smallSquare: SmallSquare): SmallSquare {
  const { possibleNumbers, choosenNumber } = smallSquare;
  const draw = drawRandomElementFromArray(possibleNumbers);
  return { ...smallSquare, choosenNumber: draw || choosenNumber };
}

export function updateSquares(squares: SmallSquaresMap, update: SmallSquare[]) {
  const copy = new Map(squares);
  for (const square of update) {
    copy.set(square.key, square);
  }
  return copy;
}
