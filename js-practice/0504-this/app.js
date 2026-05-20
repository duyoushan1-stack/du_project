const enterBtn = document.querySelector('#enterBtn')
const inputArea = document.querySelector('#inputArea')
const todoList = document.querySelector('.todo-list')
const taskForm = document.querySelector('.task-form')

// 1. 載入任務
// JSON.parse()：將 JSON 字串轉換回 JavaScript 物件

function loadTask() {
  let items = localStorage.getItem('items')
  if (items == null) {
    items = []
  } else {
    items = JSON.parse(items)
  }
  return items
}

// 2. 載入並儲存任務：localStorage 只能儲存字串，所以要先轉為 JSON 字串化
// JSON.stringify()：將 JavaScript 物件轉換為 JSON 字串

function saveTask(text) {
  const items = loadTask()
  const itemObj = {
    id: crypto.randomUUID(),
    task: text,
  }
  items.push(itemObj)
  updateTask(items)
  return itemObj
}

function updateTask(items) {
  localStorage.setItem('items', JSON.stringify(items))
}

// 渲染顯示

function renderItem(text, id) {
  const todoItem = `<li class="todo-item">
    <p>${text}</p>
    <button data-id="${id}">X</button>
</li>`
  todoList.insertAdjacentHTML('afterbegin', todoItem)
  inputArea.value = ''
}

// 渲染+儲存

function addItem(text) {
  const itemObj = saveTask(text) // 建立變數接收 saveTask 回傳的物件，裡面包含 id 和 task
  renderItem(text, itemObj.id)
}

// 初始化

function init() {
  const tasks = loadTask()
  tasks.forEach((el) => {
    const { task, id } = el // 解構 el <-- 這是一個物件 = itemObj
    renderItem(task, id) // 只是顯示，沒有儲存
  })

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (inputArea.value !== null) {
      addItem(inputArea.value)
    }
    // 預設鍵盤 enter 就等同於按下 submit 按鈕
  })

  todoList.addEventListener('click', (e) => {
    const target = e.target // 解構：const {target} = e
    if (target.nodeName == 'BUTTON') {
      // 找到匹配 id 的任務索引
      const taskIndex = tasks.findIndex((el) => el.id === target.dataset.id)

      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1)
        target.closest('.todo-item').remove()
        // 更新
        updateTask(tasks)
      }
    }
  })
}
init()
