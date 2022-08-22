import { Coords } from './types';

export interface Range {
  min: number;
  max: number;
}
export const randomRange = ({ min, max }: Range): number => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin)) + ceilMin;
};
export function drawRandomElementFromArray<T>(elements: T[]): T | undefined {
  if (elements.length === 0) {
    return;
  }
  const index = randomRange({ min: 0, max: elements.length - 1 });
  return elements[index];
}

export function arraysDiff<T>(arrayA: T[], arrayB: T[]): T[] {
  return arrayA.filter((elA) => !arrayB.some((elB) => elA === elB));
}
interface areArrayEqualsOptions {
  noOrder: boolean;
}

export const areArrayEquals = (
  arr1: Array<number | string>,
  arr2: Array<number | string>,
  options?: areArrayEqualsOptions,
): boolean => {
  if (arr1.length !== arr2.length) return false;
  if (options?.noOrder) {
    return arr1.every((el) => arr2.some((el2) => el2 === el));
  }
  let index = 0;
  for (const el of arr1) {
    if (arr2[index] !== el) {
      return false;
    }
    index++;
  }
  return true;
};
