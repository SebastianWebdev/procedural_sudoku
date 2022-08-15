import { Square } from '../SmallSquare/small_square';

const column = 0;
const row = 0;

describe('Square', () => {
  const square = new Square(row, column);
  it('Has correct properties', () => {
    expect(square.choosenNumber).toEqual(0);
    expect(square.row).toBe(0);
    expect(square.column).toBe(0);
  });
});
