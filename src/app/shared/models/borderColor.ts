export function getBorderColor(vote: number): string {
  if (vote >= 7) {
    return '#29b474';
  } else if (vote >= 5.5) {
    return '#FFC107';
  } else {
    return '#F44336';
  }
}
