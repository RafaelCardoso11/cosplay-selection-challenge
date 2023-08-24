export function generateArrayFromIndex(index: number) {
  const arrayLength = index + 1;
  const generatedArray = Array.from({ length: arrayLength }, (_, i) => i);
  return generatedArray;
}
