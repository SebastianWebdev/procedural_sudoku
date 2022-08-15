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
