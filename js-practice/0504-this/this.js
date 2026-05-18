/**
 * this
 * 1. 誰呼叫？誰就是 this; 沒前綴 ??.??() 呼叫, this = 全域變數(window)
 * 2. 是否有使用 new
 * 3. 是否有使用箭頭函數 () => {}
 * 4. 是否有使用 apply / call / bind
 * 5. 是否有使用「嚴格模式」
 */

/* ======================== */
/*    1. 誰是 this / 全域    */
/* ======================== */

function noOne() {
  console.log(this)
}

noOne() // output: window

const sweet = {
  name: 'bagel',
  price: 35,
  menu: function () {
    console.log(this)
  },
}
// sweet 呼叫 menu <-- this = sweet
sweet.menu()
// 無前綴, this = window
const a = sweet.menu // this = function{console.log(this)}
a() // window

/* =================== */
/*    2. new option    */
/* =================== */

function s1() {
  console.log(this)
}

const h1 = new s1() // this -> {} , output: s1 {}
const h2 = s1() // window

/* ======================== */
/*    3. arrow fn option    */
/* ======================== */

const arrowFn = (...a) => {
  console.log(this)
  // 沒有 this, arguments
}
arrowFn() // window

/* ===================================================== */
/*    4. apply / call: 直接執行 ; bind:  回傳 Function    */
/* ===================================================== */

const sweet = {
  name: 'bagel',
  price: 35,
  menu: function (a, b) {
    console.log(this, a, b)
  },
}

const arr = [20, 21, 22]
// this = arr
sweet.menu.call(arr, 'banana', 'apple') // [20, 21, 22], banana, apple
sweet.menu.apply(arr, ['banana', 'apple']) // [20, 21, 22], banana, apple
const newV = sweet.menu.bind(arr, 'banana', 'apple') // 此處 newV 是 fn(a,b)
newV() // [20, 21, 22], banana, apple

/* =================== */
/*    5. strict mode   */
/* =================== */

function strict() {
  'use strict'
  console.log(this)
}
strict() // undefined
