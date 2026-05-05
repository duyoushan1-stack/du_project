const enterBtn = document.querySelector('#enterBtn')
const inputArea = document.querySelector('#inputArea')
const todoList = document.querySelector('.todo-list')
const taskForm = document.querySelector('.task-form')

/**
 * CRUD
 * C: Create
 * R: Read
 * U: Updata
 * D: Delete
 */

// create

function renderTask(text) {
  const taskItem = `<li class="todo-item">
    <p>${text}</p>
    <button>X</button>
</li>`
  todoList.insertAdjacentHTML('afterbegin', taskItem)
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let inputText = inputArea.value
  if (inputText !== null) {
    renderTask(inputText)
    saveTask()
  }
})

// storage：載入->儲存

function loadTask() {
  let tasks = localStorage.getItem('tasks') // 1. 建立一個名為 tasks 的物件陣列
  if (tasks == null) {
    tasks = [] // 預設空陣列
  } else {
    tasks = JSON.parse(tasks)
  }
  return tasks
}

function saveTask(tasks) {
  loadTask()
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// read

// update

// delete
