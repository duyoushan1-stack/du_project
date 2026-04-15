// document.addEventListener('DOMContentLoaded', () => {
//   const btn = document.querySelector('button')

//   btn.addEventListener('click', () => {
//     console.log(123)
//     alert('別點我了')
//   })
// })

// on 系列會被後者覆蓋
// btn.onclick = () => {
//   console.log(123)
// }
// btn.onclick = () => {
//   console.log(456)
// }

const minus = document.querySelector('#minus')
const counter = document.querySelector('#counter')
const plus = document.querySelector('#plus')

minus.addEventListener('click', () => {
  // 兩數取最大數，main -> 不小於 0
  // counter.value = Math.max(0, Number(counter.value) - 1)
  counter.value > 0
    ? (counter.value = Number(counter.value) - 1)
    : (counter.value = 0)
})
plus.addEventListener('click', () => {
  // 兩數取最小數，min -> 不大於 5
  // counter.value = Math.min(5, Number(counter.value) + 1)
  counter.value >= 5
    ? (counter.value = 5)
    : (counter.value = Number(counter.value) + 1)
})

function calcBMI(height, weight) {
  const h = height / 100
  const w = weight
  const bmi = w / h ** 2
  return bmi.toFixed(2)
}

const height = document.querySelector('#bodyHeight')
const weight = document.querySelector('#bodyWeight')
const calc = document.querySelector('#calc')
const result = document.querySelector('#result')

calc.addEventListener('click', () => {
  const h = Number(height.value)
  const w = Number(weight.value)
  result.textContent = calcBMI(h, w)
})

const a = {
  name: 'aa',
  age: 23,
  color: 'red',
}
const { name, age } = a
console.log(name, age)

const ad = document.querySelector('#ad')
const close = document.querySelector('#close')

close.addEventListener('click', (e) => {})
