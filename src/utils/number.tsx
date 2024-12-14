export function getFirstDigit(num: number): number {
  if (num < 10) return 0;
  return Math.floor(
    Math.abs(num) / 10 ** Math.floor(Math.log10(Math.abs(num)))
  );
}

export function getSecondDigit(num: number): number {
  if (num < 10) return num;
  return (
    Math.floor(
      Math.abs(num) / 10 ** (Math.floor(Math.log10(Math.abs(num))) - 1)
    ) % 10
  );
}
