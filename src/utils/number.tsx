export function getDigit(num: number, length: number, index: number): number {
  // 把num变成长度为length的字符串，不足位数在前面补0
  const str = num.toString().padStart(length, "0");
  // 获取指定位置的数字
  return parseInt(str[index]);
}
