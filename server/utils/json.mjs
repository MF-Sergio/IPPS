export function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}
