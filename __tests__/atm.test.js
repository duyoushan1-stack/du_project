import BankAccount from '../lib/atm'

test('可以存錢', () => {
  // 3 A 原則
  const account = new BankAccount(5) // Arrange
  account.deposit(10) // Act
  expect(account.balance()).toBe(15) // Assert
})

test('可以領錢', () => {
  const account = new BankAccount(15)
  account.withdraw(15)
  expect(account.balance()).toBe(0)
})
