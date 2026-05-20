// 閉包：函式捕捉周圍「自由變數」的行為

function pickA() {
  let a = 1 // <-- 自由變數
  let b = 2
  function closure() {
    return a // 帶 a 活者離開 pickA()，b 死去
  }
  return closure
}

const a = pickA()
console.log(a() + 1) // 2

// CORS ERROR

const url = 'https://www.ntm.gov.tw/cp.aspx?n=5438'

const resp = await fetch(url)
const content = await resp.text()

// console.log(content)

// 解構

// 1. 物件解構

const obj = { name: 'John', age: 30, city: 'New York' }

const { name, age, city } = obj
console.log(name, age, city)

// 2. 陣列解構

const arr = [1, 2, 3, 4, 5]

const [x, y, z] = arr
console.log(x, y, z)