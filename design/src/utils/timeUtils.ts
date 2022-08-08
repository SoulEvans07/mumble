const secondInMillis = 1000;
const minuteInMillis = 60 * 1000;

export function millisToMin(millisec: number): string {
  const min = Math.floor(millisec / minuteInMillis);
  const sec = Math.floor((millisec % minuteInMillis) / secondInMillis);
  return `${min}:${sec}`;
}
