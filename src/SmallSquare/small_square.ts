// TODO: Make better file management, part of functions move to another files; example eliminators
// TODO: Write tests for rest of functions
import { INITIAL_POSSIBLE_NUMBERS, ROWS_SIZE, COLUMNS_SIZE } from '../constants';
import { arraysDiff, drawRandomElementFromArray } from '../utils';

export interface SmallSquare {
  key: string;
  possibleNumbers: number[];
  choosenNumber: number;
}

export type SmallSquaresMap = Map<string, SmallSquare>;

export interface Coords {
  row: number;
  col: number;
}

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

export function createCoordsKey({ col, row }: Coords) {
  return `${row}:${col}`;
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

export function findSquares(squaresMap: SmallSquaresMap, coordinates: string[]) {
  const result: SmallSquare[] = [];
  for (const key of coordinates) {
    result.push(squaresMap.get(key) as SmallSquare);
  }
  return result;
}

export function findCoordinatesForBigSquare({ col, row }: Coords) {
  const colMin = col * 3;
  const colMax = colMin + 2;
  const rowMin = row * 3;
  const rowMax = rowMin + 2;
  const result: string[] = [];
  for (let r = rowMin; r < rowMax; r++) {
    for (let c = colMin; c < colMax; c++) {
      result.push(createCoordsKey({ col: c, row: r }));
    }
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

// elimination functions
export type NumberEliminator = (squares: SmallSquaresMap, choosenNumber: number, squareKey: string) => SmallSquaresMap;
export const eliminateNumberFromRow: NumberEliminator = (
  squares: SmallSquaresMap,
  choosenNumber: number,
  squareKey: string,
): SmallSquaresMap => {
  const currentSquare = squares.get(squareKey) as SmallSquare;
  const row = getRow(currentSquare);
  const updatedSquares = findSquares(squares, findCoordinatesForRow(row)).map((square) =>
    removeNumbersFromPossibilites(square, [choosenNumber]),
  );
  return updateSquares(squares, updatedSquares);
};

// eliminator For Columns
export const eliminateNumbersFromCol: NumberEliminator = (
  squares: SmallSquaresMap,
  choosenNumber: number,
  squareKey: string,
) => {
  const currentSquare = squares.get(squareKey) as SmallSquare;
  const col = getCol(currentSquare);
  const updatedSquares = findSquares(squares, findCoordinatesForCol(col)).map((square) =>
    removeNumbersFromPossibilites(square, [choosenNumber]),
  );
  return updateSquares(squares, updatedSquares);
};

// eliminate numbers For largeSquare 3*3

export const eliminateNumbersForLargeSquare: NumberEliminator = (
  squares: SmallSquaresMap,
  choosenNumber: number,
  squareKey: string,
) => {
  const currentSquare = squares.get(squareKey) as SmallSquare;
  const coords = readCoords(currentSquare);
  const updatedSquares = findSquares(squares, findCoordinatesForBigSquare(coords)).map((square) =>
    removeNumbersFromPossibilites(square, [choosenNumber]),
  );
  return updateSquares(squares, updatedSquares);
};

// TODO: Make complex eliminators for context of bigRows and Columns;

export const Eliminators = [eliminateNumberFromRow, eliminateNumbersForLargeSquare, eliminateNumbersFromCol] as const;
