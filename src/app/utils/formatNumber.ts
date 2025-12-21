/**
 * 숫자를 K, M 등의 단위를 붙여 포맷팅합니다.
 * @param num - 포맷팅할 숫자
 * @returns 포맷팅된 문자열 (예: "1.1K", "2.5M")
 */
export function formatNumberWithUnit(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    const k = num / 1000;
    // 소수점이 필요 없으면 정수로 표시
    if (k % 1 === 0) {
      return `${k}K`;
    }
    // 소수점 첫째 자리까지 표시
    return `${k.toFixed(1)}K`;
  }

  if (num < 1000000000) {
    const m = num / 1000000;
    if (m % 1 === 0) {
      return `${m}M`;
    }
    return `${m.toFixed(1)}M`;
  }

  const b = num / 1000000000;
  if (b % 1 === 0) {
    return `${b}B`;
  }
  return `${b.toFixed(1)}B`;
}
