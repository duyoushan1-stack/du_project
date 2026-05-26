// 存錢功能
//  - 可以存錢
//  - 不可以存 0 元或是小於 0 元的金額（越存錢越少！）
// 領錢功能
//  - 可以領錢
//  - 不能領 0 元或是小於 0 元的金額（越領錢越多！）
//  - 不能領超過本身餘額

import BankAccount from '../lib/atm'

describe('存錢功能', () => {
  let account

  beforeEach(() => {
    account = new BankAccount(15) // Arrange
  })

  test('可以存錢', () => {
    // 3 A 原則
    account.deposit(10) // Act
    expect(account.balance()).toBe(25) // Assert
  })

  test('不可以存 0 元金額', () => {
    expect(() => account.deposit(0)).toThrow('不可以存 0 元或是小於 0 元的金額')
  })

  test('不可以存小於 0 元的金額', () => {
    expect(() => account.deposit(-10)).toThrow(
      '不可以存 0 元或是小於 0 元的金額'
    )
  })
})

describe('領錢功能', () => {
  let account

  beforeEach(() => {
    account = new BankAccount(15)
  })

  test('可以領錢', () => {
    account.withdraw(10)
    expect(account.balance()).toBe(5)
  })

  test('不能領 0 元', () => {
    expect(() => account.withdraw(0)).toThrow(
      '不可以領 0 元或是小於 0 元的金額，或是超過本身餘額的金額'
    )
    expect(account.balance()).toBe(15)
  })

  test('不能領小於 0 元的金額', () => {
    expect(() => account.withdraw(-10)).toThrow(
      '不可以領 0 元或是小於 0 元的金額，或是超過本身餘額的金額'
    )
    expect(account.balance()).toBe(15)
  })

  test('不能領超過本身餘額的金額', () => {
    expect(() => account.withdraw(20)).toThrow(
      '不可以領 0 元或是小於 0 元的金額，或是超過本身餘額的金額'
    )
    expect(account.balance()).toBe(15)
  })
})
