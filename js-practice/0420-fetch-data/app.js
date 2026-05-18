import { hello, num as num2 } from './lib.js'
import greet from './lib.js' // 等同於 import greet, { hello, morning, num as num2 } from './lib.js'

hello()
// var num 轉為 const num
var num = 456
console.log(num) //456 覆蓋 num
console.log(num2)
console.log(greet)
