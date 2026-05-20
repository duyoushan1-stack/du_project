/**
 * 物件 Object
 * ex: 1, "a", [] ...
 */

const a = {
  //key: value
  name: 'Sandy',
  age: 22,
}

console.log(a.name) // =
console.log(a['name'])

var createHelloWorld = function () {
  return function () {
    return 'Hello World'
  }
}
const f = createHelloWorld()
f()
