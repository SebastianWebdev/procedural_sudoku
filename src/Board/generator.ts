import { createSquaresMap, drawNumberForSmallSquare } from '../SmallSquare';
import { SmallSquare, SmallSquaresMap } from '../types';
import { Eliminators } from './eliminators';

export function tick(board: SmallSquaresMap, key: string): SmallSquaresMap {
  const { choosenNumber } = drawNumberForSmallSquare(board.get(key) as SmallSquare);
  let result = new Map(board);
  for (const eliminator of Eliminators) {
    result = eliminator(result, choosenNumber, key);
  }
  return result;
}

export default function generate() {
  let board = createSquaresMap();
  const keys = board.keys();
  for (const key of keys) {
    board = tick(board, key);
  }
  return board;
}
