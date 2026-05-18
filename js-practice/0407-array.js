/* 索引值從 0 開始的由來 => 類似燈塔距離概念 
[1,2,3,4]
1---2---3---4
| n | n | n |
0n  1n  2n  3n
*/

// let sweets = [
//   'Tiramisu',
//   'Crème Brûlée',
//   'Cheesecake',
//   'Macarons',
//   'Chocolate Lava Cake',
// ]

// const newSweets = sweets.map((s) => s + ` 好吃`)
// console.log(newSweets)

// function showSweets() {
//   sweets.forEach((s) => {
//     console.log(s)
//   })
// }
// // haha 是高階函數 Higher-Order Function, HOF
// function haha(a) {
//   a()
// }
// haha(showSweets)

// let result = [1, 2, 3, 4, 5]
// const sumOfNum = result.reduce((acc, cv) => {
//   return acc + cv
// }, 0)

// console.log(sumOfNum)

/*
 * 找資料: indexOf(在索引哪裡), includes(有沒有), find(找到就停止)
 */
// const nums = ['x', 'y', 'z', 't', 'u', 'v']

// console.log(
//   // nums.find((n) => {
//   //   return n.length == 2
//   // })
//   nums.forEach((n) => {
//     return n
//   })
// )
// console.log(nums.includes('x'))
// console.log(nums.indexOf('x'))

/*
 * 印出 1 ~ 10 之間 奇數 的 平方和
 */
// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const odds = nums.filter((n) => n % 2 != 0)
// const oddsSum = odds.reduce((acc, crv) => acc + crv * crv)

// console.log(oddsSum)

// const result1 = [] // 一定要建立一個新空陣列，因為 forEach 不像 map, filter 會自己建立
// nums.forEach((a) => {
//   if (a % 2 == 0) {
//     result1.push(a)
//   }
// })
// console.log(result1)

// const result = nums.filter((b) => {
//   return b % 2 == 0 //return true
// })
// console.log(result)
// --> 由於回傳值只有一行程式碼，箭頭函數可以簡化為:
// const result = nums.filter((b) => return b % 2 == 0)
// --> 如果參數只有一個值，甚至可更精簡為：
// const result = nums.filter(b => return b % 2 == 0)

// const result2 = nums.map((el) => {
//   if (el % 2 == 0) {
//     return el * 2
//   } // 不符合的就沒有回傳值，因此是 undefined
// })
// console.log(result2)

// const addResult = nums.unshift(0)
// console.log(nums)
