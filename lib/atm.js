class BankAccount {
  constructor(amount) {
    this.amount = amount
  }
  deposit(amount) {
    if (amount <= 0) {
      throw '不可以存 0 元或是小於 0 元的金額'
    }
    this.amount += amount // 很常沒有更新到 this.amount -- this.amount + n ,導致測試失敗
  }
  balance() {
    return this.amount
  }
  withdraw(amount) {
    if (amount <= 0 || amount > this.amount) {
      throw '不可以領 0 元或是小於 0 元的金額，或是超過本身餘額的金額'
      return 0
    }
    this.amount -= amount
    return amount
  }
}

export default BankAccount
