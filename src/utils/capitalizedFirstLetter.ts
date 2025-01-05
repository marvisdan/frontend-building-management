export function capitalizedFirstLetter(text: string): string {
  if (!text || text.length === 0) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
