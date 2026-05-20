/**
 * 非同步函式差異
 * .then() / .catch(): 每次等待動作都要使用 .then(), fetch()寫在外層
 * try/ catch / await: 等待動作直接寫在 try/catch 裡面, 包含 fetch()
 */

const api =
  'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
// const result = fetch(api)

const stationList = document.querySelector('#station-list')
const okResponse = document.querySelector('#okResponse')
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')

// 所有在網路傳輸的資料都是文字
// JSON() -> 文字 -> 該語言可用的物件

try {
  const result = await fetch(api)
  const stations = await result.json()
  okResponse.textContent = result.statusText //  資料抓取狀態輸出

  searchBtn.addEventListener('click', () => {
    stationList.innerHTML = '' // 每次搜尋都要清空
    const keyword = searchInput.value.trim()

    if (keyword !== '') {
      stations
        .filter((station) => station.ar.includes(keyword))
        .forEach((station) => {
          const liItem = `<li id="station">地址：${station.ar} <span id="avaliable-num">| 可租借：${station.available_rent_bikes}</span></li>`
          stationList.insertAdjacentHTML('afterbegin', liItem)
        })
    }
  })
} catch (err) {
  okResponse.textContent = err
  okResponse.style.color = 'red'
}

// result
//   .then((resp) => {
//     return resp.json() //<-- json() 也是 Promise object
//   })
//   .then((stations) => {
//     console.log(stations.length)
//     stations
//       // 過濾中山北路 並且 可租借大於等於 10 台
//       .filter(
//         (station) =>
//           station.ar.includes('中山北路') && station.available_rent_bikes >= 15
//       )
//       .forEach((station) => {
//         const liItem = `<li id="station">地址：${station.ar} <span id="avaliable-num">| 可租借：${station.available_rent_bikes}</span></li>`
//         stationList.insertAdjacentHTML('beforebegin', liItem)
//       })
//   })
//   .catch((err) => {
//     console.log(err)
//   })
