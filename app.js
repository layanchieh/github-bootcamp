// 待辦清單的儲存鍵值，避免與其他本地資料衝突
const TODO_STORAGE_KEY = 'todo-list-demo';
const THEME_STORAGE_KEY = 'todo-theme';

// 目前的篩選條件，預設為全部
let currentFilter = 'all';

// 取得目前待辦項目，若本地資料不存在則回傳空陣列
function getTodos() {
  const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!storedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(storedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    console.error('解析本地待辦資料失敗:', error);
    return [];
  }
}

// 儲存待辦項目到 localStorage
function saveTodos(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// 產生唯一的待辦 ID，利用時間戳與隨機數避免重複
function createTodoId() {
  return Date.now() + Math.random();
}

// 取得畫面上的元素
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const todoCount = document.getElementById('todo-count');
const clearCompletedButton = document.getElementById('clear-completed');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const filterButtons = document.querySelectorAll('.filter-btn');

// 目前狀態，從 localStorage 讀取
let todos = getTodos();
let editingTodoId = null;

// 依目前篩選條件回傳可顯示的待辦事項
function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.done);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.done);
  }

  return todos;
}

// 依篩選條件回傳適合的空狀態文字
function getEmptyMessage() {
  if (todos.length === 0) {
    return '還沒有任何待辦事項,新增一個吧!';
  }

  if (currentFilter === 'active') {
    return '太棒了,沒有未完成的事項!';
  }

  if (currentFilter === 'completed') {
    return '還沒有已完成的事項。';
  }

  return '還沒有任何待辦事項,新增一個吧!';
}

// 套用深色模式，並同步按鈕文字與 aria 狀態
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

// 在裝載頁面時決定初始主題：若使用者曾手動設定則優先使用；否則跟隨作業系統偏好
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

// 重新渲染清單與底部狀態
function renderTodos() {
  const visibleTodos = getVisibleTodos();
  todoList.innerHTML = '';

  visibleTodos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    if (todo.done) {
      listItem.classList.add('is-done');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.done;
    checkbox.setAttribute('aria-label', `完成待辦: ${todo.text}`);
    checkbox.dataset.id = String(todo.id);

    // 如果目前這一筆正處於編輯狀態,顯示輸入框與儲存/取消按鈕
    if (editingTodoId === todo.id) {
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'todo-edit-input';
      editInput.value = todo.text;
      editInput.dataset.id = String(todo.id);
      editInput.setAttribute('aria-label', `編輯待辦: ${todo.text}`);

      const saveButton = document.createElement('button');
      saveButton.type = 'button';
      saveButton.className = 'todo-save';
      saveButton.textContent = '儲存';
      saveButton.dataset.id = String(todo.id);

      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.className = 'todo-cancel';
      cancelButton.textContent = '取消';
      cancelButton.dataset.id = String(todo.id);

      listItem.appendChild(checkbox);
      listItem.appendChild(editInput);
      listItem.appendChild(saveButton);
      listItem.appendChild(cancelButton);
      todoList.appendChild(listItem);

      requestAnimationFrame(() => {
        const activeInput = todoList.querySelector('.todo-edit-input');
        if (activeInput) {
          activeInput.focus();
          activeInput.select();
        }
      });

      return;
    }

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'todo-edit';
    editButton.textContent = '編輯';
    editButton.dataset.id = String(todo.id);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'todo-delete';
    deleteButton.textContent = '刪除';
    deleteButton.dataset.id = String(todo.id);

    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });

  const remainingCount = todos.filter((todo) => !todo.done).length;
  todoCount.textContent = `未完成: ${remainingCount} 項`;

  emptyState.textContent = getEmptyMessage();
  emptyState.hidden = visibleTodos.length > 0;

  const hasCompleted = todos.some((todo) => todo.done);
  clearCompletedButton.hidden = !hasCompleted;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

// 新增待辦事項
function addTodo(event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: createTodoId(),
    text,
    done: false,
  });

  saveTodos(todos);
  todoInput.value = '';
  todoInput.focus();
  renderTodos();
}

// 切換待辦完成狀態
function toggleTodo(todoId) {
  todos = todos.map((todo) => {
    if (todo.id === Number(todoId)) {
      return { ...todo, done: !todo.done };
    }

    return todo;
  });

  saveTodos(todos);
  renderTodos();
}

// 刪除指定待辦事項
function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== Number(todoId));
  saveTodos(todos);
  renderTodos();
}

// 啟動指定待辦的編輯狀態
function startEditTodo(todoId) {
  editingTodoId = Number(todoId);
  renderTodos();
}

// 儲存編輯後的待辦內容，空白內容不會被接受
function saveEditedTodo(todoId) {
  const editInput = todoList.querySelector('.todo-edit-input');
  const updatedText = (editInput ? editInput.value : '').trim();

  if (!updatedText) {
    if (editInput) {
      editInput.focus();
      editInput.select();
    }
    return;
  }

  todos = todos.map((todo) => {
    if (todo.id === Number(todoId)) {
      return { ...todo, text: updatedText };
    }

    return todo;
  });

  saveTodos(todos);
  editingTodoId = null;
  renderTodos();
}

// 取消編輯，回到正常顯示
function cancelEditTodo() {
  editingTodoId = null;
  renderTodos();
}

// 清除所有已完成事項，刪除前會先確認
function clearCompletedTodos() {
  const completedCount = todos.filter((todo) => todo.done).length;

  if (completedCount === 0) {
    return;
  }

  const confirmed = window.confirm(`確定要刪除 ${completedCount} 個已完成事項嗎？`);

  if (!confirmed) {
    return;
  }

  todos = todos.filter((todo) => !todo.done);
  saveTodos(todos);
  renderTodos();
}

// 切換目前篩選條件
function setFilter(filter) {
  currentFilter = filter;
  renderTodos();
}

// 表單提交事件：新增待辦
 todoForm.addEventListener('submit', addTodo);

// 事件代理：處理勾選、刪除、編輯與儲存行為
 todoList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.todo-delete');
  const editButton = event.target.closest('.todo-edit');
  const saveButton = event.target.closest('.todo-save');
  const cancelButton = event.target.closest('.todo-cancel');

  if (deleteButton) {
    deleteTodo(deleteButton.dataset.id);
    return;
  }

  if (editButton) {
    startEditTodo(editButton.dataset.id);
    return;
  }

  if (saveButton) {
    saveEditedTodo(saveButton.dataset.id);
    return;
  }

  if (cancelButton) {
    cancelEditTodo();
  }
 });

 todoList.addEventListener('change', (event) => {
  const checkbox = event.target.closest('.todo-checkbox');

  if (checkbox) {
    toggleTodo(checkbox.dataset.id);
  }
 });

 todoList.addEventListener('keydown', (event) => {
  const editInput = event.target.closest('.todo-edit-input');

  if (!editInput) {
    return;
  }

  if (event.key === 'Enter') {
    saveEditedTodo(editInput.dataset.id);
  }

  if (event.key === 'Escape') {
    cancelEditTodo();
  }
 });

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setFilter(button.dataset.filter);
  });
});

clearCompletedButton.addEventListener('click', clearCompletedTodos);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

// 頁面初始化：先套用主題並渲染目前資料
initTheme();
renderTodos();
