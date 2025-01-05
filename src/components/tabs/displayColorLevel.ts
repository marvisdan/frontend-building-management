export default function displayColorLevel(level: number): string {
  switch (level) {
    case 0:
      return "greydegraded.lighter";
    case 1:
      return "greydegraded.light";
    case 2:
      return "greydegraded.lightshadow";
    case 3:
      return "greydegraded.main";
    case 4:
      return "greydegraded.shadow";
    default:
      return "greydegraded.lighter";
  }
}
