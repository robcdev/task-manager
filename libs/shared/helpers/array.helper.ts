/**
 * Finds an item in an array by matching a string value and returns its ID.
 * @param itemsArray - The array to search in
 * @param str - The string value to match
 * @param matchFn - Function that extracts the comparable string from each item
 * @returns The ID of the matched item, or empty string if not found
 */
export function findItemId<T extends { id: string }>(
  itemsArray: T[],
  str: string,
  matchFn: (item: T) => string
): string {
  return itemsArray.find((item) => matchFn(item) === str)?.id || '';
}
