// var person = {
//   name: 'cc',
//   sayHi: function () {
//     console.log('我是' + this.name) // this 是 person，OK

//     // var that = this
//     setTimeout(
//       function () {
//         console.log('我是' + this.name) // this 變成 window
//       }.bind(this),
//       0
//     )
//   },
// }

// person.sayHi()

var person = {
  name: 'cc',
  sayHi: function () {
    console.log('我是' + this.name) // this 是 person，OK
    setTimeout(() => {
      console.log('我是' + this.name) // this 變成 person
    }, 0)
  },
}

person.sayHi()
