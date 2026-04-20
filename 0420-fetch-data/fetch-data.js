/**
 * Promise
 * - 起始 pending
 * - 成功 fulfilled
 * - 失敗 rejected
 */

// new: 創建
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
    reject('error')
  }, 2000)
})
console.log(p1) // 不會顯示 Promise 結果, 因為 console.log 早於 resolve 回傳值執行(result: pending promise)
// p1.then((x) => {
//   console.log(x)
// }).catch((err) => {
//   console.log(err)
// })

/**
 * async & await
 * 非同步執行: 等待此行執行完畢後執行下一行
 */
// const result = await p1
// console.log(result) // ok 先顯示
// console.log(123)

const okResponse = document.querySelector('#okResponse')

try {
  const result = await p1
  okResponse.textContent = result
} catch (err) {
  okResponse.textContent = err
  okResponse.style.color = 'red'
}
