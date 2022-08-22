import { SmallSquare, SmallSquaresMap } from '../types';
import { getCol, getRow, findSquares, removeNumbersFromPossibilites, updateSquares, readCoords } from '../SmallSquare';
import { findCoordinatesForBigSquare, findCoordinatesForCol, findCoordinatesForRow } from '../Coordinates';

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
