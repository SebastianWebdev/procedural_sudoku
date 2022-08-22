import { randomRange, drawRandomElementFromArray, Range, arraysDiff, areArrayEquals } from '../utils';

describe('Utils', () => {
  const range: Range = { min: 1, max: 10 };
  const emptyArray: never[] = [];
  const numberedArray = [1, 2, 3, 4, 5];
  const isInNumberedArray = (n?: number) => numberedArray.some((it) => it === n);

  const stringsArray = ['A', 'B', 'C', 'D'];
  const isInStringArray = (s?: string) => stringsArray.some((it) => it === s);

  const arrayA = [1, 2, 3, 4];
  const arrayB = [5, 6, 7, 8];
  const arrayC = [2, 3, 4];
  const arrayD: number[] = [];
  const arrayA2: number[] = [];

  const isEqualtoA = (b: number[]) => areArrayEquals(arrayA, b);
  const isEqualToA2 = (b: number[]) => areArrayEquals(arrayA2, b);

  describe('RandomRange', () => {
    it('returns exact value id min and max is eqoaul', () => {
      expect(randomRange({ max: 1, min: 1 })).toEqual(1);
    });
    it('return random number between 1 and 10', () => {
      expect(randomRange(range)).toBeGreaterThanOrEqual(1);
      expect(randomRange(range)).toBeLessThanOrEqual(10);
    });
  });
  describe('drawRandomElementFromArray', () => {
    it('return undefined if pass an empty array', () => {
      expect(drawRandomElementFromArray(emptyArray)).toEqual(undefined);
    });
    it('returns a number from given array ', () => {
      expect(isInNumberedArray(drawRandomElementFromArray(numberedArray))).toBe(true);
    });
    it('return an string from a gicen array', () => {
      expect(isInStringArray(drawRandomElementFromArray(stringsArray))).toBe(true);
    });
  });
  describe('arraysDiff', () => {
    it(`returns a ${arrayA}, when diff ${arrayB}`, () => {
      expect(isEqualtoA(arraysDiff(arrayA, arrayB))).toBe(true);
    });
    it(`returns a [1] when pass a ${arrayC} `, () => {
      expect(arraysDiff(arrayA, arrayC)).toEqual([1]);
    });
    it(`returns ${arrayA} when diff ${arrayD}`, () => {
      expect(isEqualtoA(arraysDiff(arrayA, arrayD))).toBe(true);
    });
    it(`returns ${arrayA2}`, () => {
      expect(isEqualToA2(arraysDiff(arrayA2, arrayB))).toBe(true);
      expect(isEqualToA2(arraysDiff(arrayA2, arrayC))).toBe(true);
      expect(isEqualToA2(arraysDiff(arrayA2, arrayD))).toBe(true);
    });
  });
});
