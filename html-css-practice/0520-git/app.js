/**
 * app.js — Git 語法大全主要邏輯
 * 依賴：data.js（GIT_DATA）
 */

/* ── Constants ──────────────────────────────────────── */

const TABS = [
  { id: 'all', label: '全部' },
  { id: 'config', label: 'Config' },
  { id: 'branch', label: '分支' },
  { id: 'commit', label: 'Commit' },
  { id: 'restore', label: 'Restore' },
  { id: 'remote', label: 'Remote' },
  { id: 'log', label: 'Log / 美化' },
  { id: 'advanced', label: '進階' },
]

const TAG_ICONS = {
  tip: 'ti-sparkles',
  warn: 'ti-alert-triangle',
  pro: 'ti-stars',
}

const STORAGE_KEY = 'git-cheatsheet-theme'

/* ── State ──────────────────────────────────────────── */

let currentTab = 'all'
let searchQuery = ''
let toastTimer = null
let isDark = true // managed by initTheme()

/* ── DOM refs ───────────────────────────────────────── */

const tabBar = document.getElementById('tabBar')
const cardContainer = document.getElementById('cardContainer')
const emptyState = document.getElementById('emptyState')
const statsRow = document.getElementById('statsRow')
const searchInput = document.getElementById('searchInput')
const toast = document.getElementById('toast')
const themeToggle = document.getElementById('themeToggle')
const themeLabel = document.getElementById('themeLabel')
const footerTheme = document.getElementById('footerTheme')

// View switcher elements
const tabCheatsheet = document.getElementById('tabCheatsheet')
const tabPrWorkflow = document.getElementById('tabPrWorkflow')
const cheatsheetView = document.getElementById('cheatsheetView')
const prWorkflowView = document.getElementById('prWorkflowView')

/* ════════════════════════════════════════════════════
   THEME
   ════════════════════════════════════════════════════ */

function initTheme() {
  // Priority: localStorage → system preference → dark
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    isDark = stored === 'dark'
  } else {
    isDark = !window.matchMedia('(prefers-color-scheme: light)').matches
  }
  applyTheme(false) // no animation on first load
}

function applyTheme(animate = true) {
  const html = document.documentElement

  if (isDark) {
    html.classList.add('dark')
    html.classList.remove('light')
  } else {
    html.classList.add('light')
    html.classList.remove('dark')
  }

  // Update toggle label
  themeLabel.textContent = isDark ? '深色模式' : '淺色模式'
  if (footerTheme) footerTheme.textContent = isDark ? '🌙 dark' : '☀️ light'

  // Animate the icon on toggle
  if (animate) {
    const iconEls = themeToggle.querySelectorAll('.toggle-icon')
    iconEls.forEach((el) => {
      el.style.animation = 'none'
      // force reflow
      void el.offsetWidth
      el.style.animation = 'themePop .3s cubic-bezier(.34,1.56,.64,1) both'
    })
  }

  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
}

function toggleTheme() {
  isDark = !isDark
  applyTheme(true)
}

/* ════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════ */

function init() {
  initTheme()
  renderTabs()
  renderCards()

  themeToggle.addEventListener('click', toggleTheme)

  // View switcher listeners
  if (tabCheatsheet && tabPrWorkflow) {
    tabCheatsheet.addEventListener('click', () => switchView('cheatsheet'))
    tabPrWorkflow.addEventListener('click', () => switchView('prWorkflow'))
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim()
      renderCards()
    })
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // '/' → focus search
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault()
      searchInput.focus()
      searchInput.select()
    }
    // Escape → clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur()
      searchQuery = ''
      searchInput.value = ''
      renderCards()
    }
    // 'T' (shift+t) → toggle theme
    if (
      e.key === 'T' &&
      !e.ctrlKey &&
      !e.metaKey &&
      document.activeElement !== searchInput
    ) {
      toggleTheme()
    }
  })

  // System theme change listener
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        isDark = !e.matches
        applyTheme(true)
      }
    })
}

/* ════════════════════════════════════════════════════
   TABS
   ════════════════════════════════════════════════════ */

function renderTabs() {
  tabBar.innerHTML = TABS.map(({ id, label }) => {
    const count =
      id === 'all'
        ? GIT_DATA.length
        : GIT_DATA.filter((d) => d.cat === id).length

    return `
      <button
        class="tab-btn ${id === currentTab ? 'active' : ''}"
        data-tab="${id}"
        role="tab"
        aria-selected="${id === currentTab}"
        aria-controls="cardContainer"
      >
        ${label}
        <span class="inline-block ml-1 text-[10px] opacity-50">${count}</span>
      </button>
    `
  }).join('')

  tabBar.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab))
  })
}

function switchTab(tab) {
  currentTab = tab
  tabBar.querySelectorAll('.tab-btn').forEach((btn) => {
    const isActive = btn.dataset.tab === tab
    btn.classList.toggle('active', isActive)
    btn.setAttribute('aria-selected', isActive)
  })
  renderCards()
}

/* ════════════════════════════════════════════════════
   FILTER
   ════════════════════════════════════════════════════ */

function getFiltered() {
  return GIT_DATA.filter((d) => {
    const matchTab = currentTab === 'all' || d.cat === currentTab
    if (!searchQuery) return matchTab
    const haystack = [
      d.title,
      d.desc,
      d.tips ?? '',
      ...d.codes.map((c) => c.label + ' ' + c.code),
    ]
      .join(' ')
      .toLowerCase()
    return matchTab && haystack.includes(searchQuery)
  })
}

/* ════════════════════════════════════════════════════
   CARDS
   ════════════════════════════════════════════════════ */

function renderCards() {
  const filtered = getFiltered()

  // Stats
  const total = GIT_DATA.filter(
    (d) => currentTab === 'all' || d.cat === currentTab
  ).length
  statsRow.innerHTML = searchQuery
    ? `<i class="ti ti-filter"></i> 顯示 <span style="color:var(--text-primary)">${filtered.length}</span> / ${total} 個指令組`
    : `<i class="ti ti-layout-grid"></i> 共 <span style="color:var(--text-primary)">${total}</span> 個指令組`

  // Empty state
  const isEmpty = filtered.length === 0
  emptyState.classList.toggle('hidden', !isEmpty)
  emptyState.classList.toggle('flex', isEmpty)
  cardContainer.classList.toggle('hidden', isEmpty)

  if (isEmpty) {
    cardContainer.innerHTML = ''
    return
  }

  cardContainer.innerHTML = filtered.map((d, i) => buildCard(d, i)).join('')
  cardContainer.querySelectorAll('.cmd-card').forEach((el, i) => {
    el.style.animationDelay = `${i * 30}ms`
  })
}

function buildCard(d, index) {
  const tagHTML = d.tag
    ? `<span class="tag tag-${d.tag}">
         <i class="ti ${TAG_ICONS[d.tag] ?? ''}" aria-hidden="true"></i>${d.tagLabel}
       </span>`
    : ''

  const tipHTML = d.tips
    ? `<div class="tip-box">
         <i class="ti ti-bulb" aria-hidden="true"></i><span>${d.tips}</span>
       </div>`
    : ''

  const codesHTML = d.codes
    .map(
      (c, ci) => `
    <div class="code-block">
      <p class="code-label">${escHtml(c.label)}</p>
      <pre class="code-pre">${formatCode(c.code)}</pre>
      <button
        class="copy-btn"
        onclick="handleCopy(event, this, ${index}, ${ci})"
        aria-label="複製程式碼"
      >複製</button>
    </div>
  `
    )
    .join('')

  return `
    <div
      class="cmd-card"
      id="card-${index}"
      role="region"
      aria-label="${d.title}"
      onclick="toggleCard(${index})"
    >
      <div class="flex items-start gap-3">
        <div class="card-icon-wrap" aria-hidden="true">
          <i class="ti ${d.icon}"></i>
        </div>
        <div class="flex-1 min-w-0">
          ${tagHTML}
          <h2 class="card-title text-sm font-medium font-sans mb-1">${d.title}</h2>
          <p class="card-desc text-xs font-sans leading-relaxed">${d.desc}</p>
        </div>
        <i class="ti ti-chevron-down card-chevron" aria-hidden="true"></i>
      </div>
      <div class="card-body">
        ${tipHTML}
        ${codesHTML}
      </div>
    </div>
  `
}

/* ════════════════════════════════════════════════════
   CARD INTERACTION
   ════════════════════════════════════════════════════ */

function toggleCard(index) {
  const card = document.getElementById(`card-${index}`)
  if (!card) return
  card.classList.toggle('expanded')
}

/* ════════════════════════════════════════════════════
   COPY
   ════════════════════════════════════════════════════ */

function handleCopy(event, btn, cardIdx, codeIdx) {
  event.stopPropagation()

  const filtered = getFiltered()
  const d = filtered[cardIdx]
  if (!d || !d.codes[codeIdx]) return

  const text = d.codes[codeIdx].code

  const doSuccess = () => {
    btn.textContent = '✓ 已複製'
    btn.classList.add('copied')
    setTimeout(() => {
      btn.textContent = '複製'
      btn.classList.remove('copied')
    }, 1800)
    showToast('已複製到剪貼簿 ✓')
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(doSuccess)
      .catch(() => {
        fallbackCopy(text)
        doSuccess()
      })
  } else {
    fallbackCopy(text)
    doSuccess()
  }
}

function fallbackCopy(text) {
  const el = document.createElement('textarea')
  el.value = text
  el.style.cssText = 'position:fixed;top:-999px;left:-999px;opacity:0'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

/* ════════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════════ */

function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200)
}

/* ════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════ */

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatCode(code) {
  return escHtml(code)
    .split('\n')
    .map((line) =>
      line.trimStart().startsWith('#')
        ? `<span class="code-comment">${line}</span>`
        : line
    )
    .join('\n')
}

/* ════════════════════════════════════════════════════
   VIEW SWITCHER & PR COPY FUNCTIONS
   ════════════════════════════════════════════════════ */

function switchView(view) {
  if (!tabCheatsheet || !tabPrWorkflow || !cheatsheetView || !prWorkflowView) return
  
  if (view === 'cheatsheet') {
    tabCheatsheet.classList.add('active')
    tabPrWorkflow.classList.remove('active')
    cheatsheetView.classList.remove('hidden')
    prWorkflowView.classList.add('hidden')
  } else {
    tabCheatsheet.classList.remove('active')
    tabPrWorkflow.classList.add('active')
    cheatsheetView.classList.add('hidden')
    prWorkflowView.classList.remove('hidden')
  }
}

function handleDirectCopy(btn, text) {
  const doSuccess = () => {
    btn.textContent = '✓ 已複製'
    btn.classList.add('copied')
    setTimeout(() => {
      btn.textContent = '複製'
      btn.classList.remove('copied')
    }, 1800)
    showToast('已複製至剪貼簿 ✓')
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(doSuccess)
      .catch(() => {
        fallbackCopy(text)
        doSuccess()
      })
  } else {
    fallbackCopy(text)
    doSuccess()
  }
}

function copyTemplateText(btn) {
  const templateEl = document.getElementById('prMarkdownTemplate')
  if (!templateEl) return
  const text = templateEl.textContent

  const doSuccess = () => {
    btn.innerHTML = '<i class="ti ti-check mr-1"></i>已複製'
    btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700')
    btn.classList.remove('bg-brand-600', 'hover:bg-brand-700')
    setTimeout(() => {
      btn.innerHTML = '<i class="ti ti-copy mr-1"></i>複製範本'
      btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700')
      btn.classList.add('bg-brand-600', 'hover:bg-brand-700')
    }, 1800)
    showToast('PR 描述範本已複製 ✓')
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(doSuccess)
      .catch(() => {
        fallbackCopy(text)
        doSuccess()
      })
  } else {
    fallbackCopy(text)
    doSuccess()
  }
}

// Bind to window to allow HTML inline onclick access
window.handleDirectCopy = handleDirectCopy
window.copyTemplateText = copyTemplateText

/* ════════════════════════════════════════════════════
   BOOTSTRAP
   ════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', init)
