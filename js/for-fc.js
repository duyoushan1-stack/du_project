// ++i => 先加數字再印出 i
// i++ => 先印出 i 再加數字(下一步才加)

// for (let i = 5; i > 0; i = i - 2) {
//   console.log(`你好${i}`)
// }
// 99 乘法表
// for (let i = 1; i <= 9; i++) {
//   for (let j = 1; j <= 9; j++) {
//     console.log(`${i}x${j}=${i * j}`)
//   }
// }

// // 田 x 田
// for (let i = 0; i < 5; i = i + 1) {
//   console.log('田'.repeat(5))
// }
// // 等於下面公式
// for (let i = 0; i < 5; i++) {
//   let s = ''
//   for (let j = 0; j < 5; j++) {
//     s += '田'
//   }
//   console.log(s)
// }

// 聖誕樹
// for (let i = 1; i <= 5; i = i + 1) {
//   console.log('*'.repeat(i))
// }

// for (let i = 0; i < 5; i = i + 1) {
//   console.log(' '.repeat(4 - i) + '*'.repeat(i * 2 + 1))
// }

// let all = 0
// for (let i = 0; i <= 100; i++) {
//   if (i % 2 == 0) {
//     all += i
//   }
// }
// console.log(all)

// 計算 BMI

function calcBMI(height, weight) {
  const h = height / 100
  const doubleH = h ** 2
  return (weight / doubleH).toFixed(2)
}

function standard(calcBMI) {
  if (calcBMI >= 18.5 && calcBMI <= 24) {
    return '正常'
  } else if (calcBMI < 18.5) {
    return '過輕'
  } else if (calcBMI >= 24 && calcBMI < 27) {
    return '過重'
  } else {
    return '肥胖'
  }
}

let sandy = calcBMI(159, 45)

console.log(`sandy is ${sandy} ` + standard(sandy))

function add(a, b) {
  return a + b
}
const result = add(2, 3)
console.log(result)

// function year(y) {
//   if ((y % 4 == 0 && y % 100 !== 0) || y % 400 == 0) {
//     console.log('閏年')
//   } else {
//     console.log('平年')
//   }
// }
// year(1904)

// let i = 0

// for (;;) {
//   if (i == 3) {
//     break
//   }
//   console.log(i)
//   i += 1
// }
// while (i < 8) {
//   console.log(i)
//   i++
// }

// const s = '5'

// console.log(s.padStart(3, '0'))

// if (s < 10) {
//   console.log('0'.repeat(2) + s)
// } else if (s < 100) {
//   console.log('0' + s)
// } else {
//   console.log(s)
// }

function myRound(num, i = 0) {
  const dot = 10 ** i
  const result = console.log(Math.round(num * dot) / dot)
  return result
}

myRound(3.14159)
myRound(3.14159, 2) // 3.14
myRound(3.14159, 3) // 3.142
