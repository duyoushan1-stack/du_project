// hamburger 選單切換功能
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger')
  const aside = document.querySelector('aside')

  if (hamburger && aside) {
    hamburger.addEventListener('click', function () {
      aside.classList.toggle('show')
    })
  }
})
