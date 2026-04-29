import axios from 'axios'
import dayjs from 'dayjs'

// youbike 復興南路上，可借車數 >= 5 的站名

// 可租借數量：available_rent_bikes
// 地址：ar
// 站名：sna

const api =
  'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'

// try {
//   const resp = await fetch(api)
//   const stations = await resp.json()
//   stations
//     .filter((station) => {
//       return (
//         station.ar.includes('復興南路') && station.available_rent_bikes >= 5
//       )
//     })
//     .forEach((station) => {
//       console.log(station.sna)
//     })
// } catch (err) {
//   console.log(err)
// }

//=================================
// axios 寫法
//=================================

axios.get(api).then((resp) => {
  const stations = resp.data
  stations
    .filter((station) => {
      return (
        station.ar.includes('復興南路') && station.available_rent_bikes >= 5
      )
    })
    .forEach((station) => {
      console.log(station.sna.replace('YouBike2.0_', ''))
    })
})

// try {
//   const resp = await axios.get(api)
//   const stations = resp.data
//   stations
//     .filter((station) => {
//       return (
//         station.ar.includes('復興南路') && station.available_rent_bikes >= 5
//       )
//     })
//     .forEach((station) => {
//       console.log(station.sna)
//     })
// } catch (err) {
//   console.log(err)
// }

//=================================
// then 寫法
//=================================

// const result = fetch(api)

// result
//   .then((resp) => {
//     return resp.json()
//   })
//   .then((stations) => {
//     stations
//       .filter((station) => {
//         return (
//           station.ar.includes('復興南路') && station.available_rent_bikes >= 5
//         )
//       })
//       .forEach((station) => {
//         console.log(station.sna)
//       })
//   })

const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const dateNow = document.querySelector('#dateNow')

let thisMonth = dayjs() // now
dateNow.value = thisMonth.format('YYYY/M')

prev.addEventListener('click', () => {
  thisMonth = thisMonth.subtract(1, 'month')
  dateNow.value = thisMonth.format('YYYY/M')
})

next.addEventListener('click', () => {
  thisMonth = thisMonth.add(1, 'month')
  dateNow.value = thisMonth.format('YYYY/M')
})

// scope = 去哪裡找東西。var 找不到就找外層有沒有定義

// block scope {} <-- const, let
// function scope <-- var
// lexical scope

var a = 1
function first() {
  var a = 2
  second()
}
function second() {
  console.log(a)
}
console.log(a) // 1

// 閉包 closure

function hello() {
  let a = 1 // scope 自由變數，被 hey() 帶走
  function hey() {
    console.log(a)
  }
  return hey
}

const result = hello()
result() //1

// i 永久存在, setTimeout 無須帶走 i
for (var i = 0; i < 3; i++) {
  ;(function (n) {
    setTimeout(() => {
      console.log(n)
    }, 1000)
  })(i) // --> step1: n = i -> step2: i = 0, n = 0、i = 1, n = 1、i = 2, n = 2
  //   setTimeout(() => {
  //     console.log(i)
  //   }, 1000) // 3,3,3
}

// i 僅存在 {}, 每圈跑完即消失，setTimeout 必須帶走 i => 閉包
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
} // 0,1,2

// 立即啟動呼叫函數 IIFE
;(function (x) {
  console.log(x)
})(123) // x = 123
