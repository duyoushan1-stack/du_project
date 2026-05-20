import { f2c, c2f } from '../lib/temperature'

test('溫度轉換公式(華氏轉攝氏)', () => {
  expect(f2c(150)).toBe(65.6)
  expect(f2c(178)).toBe(81.1)
})
test('溫度轉換公式(攝氏轉華氏)', () => {
  expect(c2f(38)).toBe(100.4)
  expect(c2f(40)).toBe(104)
})
