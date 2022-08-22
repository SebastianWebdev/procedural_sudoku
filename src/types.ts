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
