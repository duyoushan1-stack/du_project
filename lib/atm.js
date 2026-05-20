// 存錢功能
// 可以存錢
// 不可以存 0 元或是小於 0 元的金額（越存錢越少！）
// 領錢功能
// 可以領錢
// 不能領 0 元或是小於 0 元的金額（越領錢越多！）
// 不能領超過本身餘額

class BankAccount {
  constructor(amount) {
    this.amount = amount
  }
  deposit(n) {
    if (n > 0) {
      this.amount += n // 很常沒有更新到 this.amount -- this.amount + n ,導致測試失敗
    }
  }
  balance() {
    return this.amount
  }
  withdraw(n) {
    if (n > 0 && n <= this.amount) {
      this.amount -= n
    }
  }
}

export default BankAccount
