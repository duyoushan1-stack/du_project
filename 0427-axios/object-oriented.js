/**
 * 物件導向設計 - object oriented programming
 */

// ======================================
// 原本物件方式
// ======================================

// function heroCreator(name, age) {
//   const hero = {
//     name,
//     age,
//     attack: function () {
//       console.log('ATTACK!')
//     },
//     eat: function () {
//       console.log('不知道吃什麼')
//     },
//   }
//   return hero
// }
// const h1 = heroCreator('小名', 20)
// console.log(h1.name)

// ======================================
// Object.create()
// ======================================

// 1. 定義共同動作
const actions = {
  attack: function () {
    console.log('ATTACK!')
  },
  eat: function () {
    console.log('不知道吃什麼')
  },
}
// 2. 建立函式，打造原型
function heroCreator(name, age) {
  const h = Object.create(actions) // 以...為原型打造
  h.name = name // 不用","
  h.age = age
  return h
}
const h1 = heroCreator('小名', 20)
h1.eat()
