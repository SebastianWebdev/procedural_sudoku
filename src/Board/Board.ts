import { Square, Coords } from '../SmallSquare/small_square';
import { ROWS_SIZE, COLUMNS_SIZE } from '../constants';

export class Board {
  private rects: Map<string, Square> = new Map();
  constructor() {
    this.initBoard();
  }
  private initBoard() {
    for (let col = 0; col < COLUMNS_SIZE; col++) {
      // First loop id for columns
      for (let row = 0; row < ROWS_SIZE; row++) {
        const coords: Coords = { row, col };
        this.rects.set(this.createCoordsKey(coords), new Square(coords.row, coords.col));
      }
    }
  }

  private createCoordsKey({ col, row }: Coords) {
    return `${row}:${col}`;
  }

  private parseCoordKeyToCoords(key: string): Coords {
    const arr = key.split(':');
    if (arr.length !== 2) {
      throw new Error('Key for coords have to be composed of a number:number string example: 1:2');
    }
    const maped = arr.map((s) => parseInt(s, 10));
    return { row: maped[0], col: maped[1] };
  }

  private findCoordinatesForColumn(col: number): string[] {
    const result: string[] = [];
    for (let row = 0; row < ROWS_SIZE; row++) {
      result.push(this.createCoordsKey({ col, row }));
    }
    return result;
  }

  private findCoordinatesForRow(row: number): string[] {
    const result: string[] = [];
    for (let col = 0; col < COLUMNS_SIZE; col++) {
      result.push(this.createCoordsKey({ col, row }));
    }
    return result;
  }

  private findCoordinatesForBigSquare({ col, row }: Coords): string[] {
    const colMin = col * 3;
    const colMax = colMin + 2;
    const rowMin = row * 3;
    const rowMax = rowMin + 2;
    const result: string[] = [];
    for (let r = rowMin; r < rowMax; r++) {
      for (let c = colMin; c < colMax; c++) {
        result.push(this.createCoordsKey({ col: c, row: r }));
      }
    }
    return result;
  }

  private mapCoordsKeysToSquares(keys: string[]): Square[] {
    return keys.map((key) => this.rects.get(key)) as Square[];
  }

  getColumnSquares(column: number) {
    return this.mapCoordsKeysToSquares(this.findCoordinatesForColumn(column));
  }

  getRowSquares(row: number) {
    return this.mapCoordsKeysToSquares(this.findCoordinatesForRow(row));
  }
  getBigSquare(coords: Coords) {
    return this.mapCoordsKeysToSquares(this.findCoordinatesForBigSquare(coords));
  }
}
