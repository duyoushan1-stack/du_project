/**
 * 物件導向設計 - object oriented programming
 */

// ======================================================================
// 原本物件方式
// ======================================================================

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

// ======================================================================
// Object.create()
//  所有物件(廣義，包含 function(), {}, [])都有 __proto__ 屬性
//  ex: const a = {}
//      a.hello                                  <-- x
//      (背景執行)找第一鍊：a.__proto__            <-- x
//      (背景執行)找第二鍊：a.__ptoto__.__proto__  <-- null = undefined
//  所有函數(也是物件)都有 prototype 屬性
//  ---
//  ES6 prototype chain 語法糖：class
// ======================================================================

// 1. 定義共同動作
const actions = {
  attack: function () {
    console.log('ATTACK!')
  },
  eat: function () {
    console.log('不知道吃什麼')
  },
}
// 2-1. 建立函式，打造原型
function heroCreator(name, age) {
  const h = Object.create(actions) // 以...為原型打造，塞到 h 的 __proto__ 鍊
  h.name = name // 不用","
  h.age = age
  return h
}
const h1 = heroCreator('小名', 20)
h1.eat()

// 2-2-1. 建立函式，使用 this
function heroCreatorV2(name, age) {
  // step 1. this = {...}
  // step 2. return this
  this.name = name
  this.age = age
}

// 2-2-2. new 執行
// 執行過程：建立 prototype -> 1. this = {...} 並 return 2. 實體(h2) 的 __proto__ = 生成這個 fn 的 prototype
// h2.__proto__ == heroCreatorV2.prototype -> true
const h2 = new heroCreatorV2('uasgi', 3) // 沒有 new 的話，h2 就會是 undefined，因為 this 是 undefined

// 2-2-3. 指向共同動作
// 將 {} 的 prototype 指向 actions
heroCreatorV2.prototype = actions

// 為類別 (string, Array) 新增方法屬性 - ex：為所有字串新增 addNum() 方法
const sth = '456'
String.prototype.addNum = function () {
  console.log('123')
}
sth.addNum() // 123

// 3. class 寫法
class heroCreatorV3 {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayMyName() {
    console.log(`Hi, ${this.name}.`)
  }
  attack() {
    console.log('ATTACK!')
  }
  eat() {
    console.log('不知道吃什麼')
  }
}
// 建立 instance: h3
const h3 = new heroCreatorV3('Sandy', 25)

// ⚠️ 注意：this 無須加入 return，否則 return{...} 就會覆蓋掉 this 的物件
// 例如：
// function heroCreatorV4(name, age) {
//   this.name = name
//   this.age = age
//   return { name: 'aaa', age: 999 }
// }
// const h4 = new heroCreatorV4('bbb', 888)
// console.log(h4) // { name: 'aaa', age: 999 }
