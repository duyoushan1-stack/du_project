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

/* ── State ──────────────────────────────────────────── */

let currentTab = 'all'
let searchQuery = ''
let toastTimer = null

/* ── DOM refs ───────────────────────────────────────── */

const tabBar = document.getElementById('tabBar')
const cardContainer = document.getElementById('cardContainer')
const emptyState = document.getElementById('emptyState')
const statsRow = document.getElementById('statsRow')
const searchInput = document.getElementById('searchInput')
const toast = document.getElementById('toast')

/* ── Init ───────────────────────────────────────────── */

function init() {
  renderTabs()
  renderCards()

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim()
    renderCards()
  })
}

/* ── Tab rendering ──────────────────────────────────── */

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

/* ── Filter logic ───────────────────────────────────── */

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

/* ── Card rendering ─────────────────────────────────── */

function renderCards() {
  const filtered = getFiltered()

  // Stats
  const total = GIT_DATA.filter(
    (d) => currentTab === 'all' || d.cat === currentTab
  ).length
  statsRow.innerHTML = searchQuery
    ? `<i class="ti ti-filter text-slate-600"></i> 顯示 <span class="text-slate-400">${filtered.length}</span> / ${total} 個指令組`
    : `<i class="ti ti-layout-grid text-slate-600"></i> 共 <span class="text-slate-400">${total}</span> 個指令組`

  // Empty state
  const isEmpty = filtered.length === 0
  emptyState.classList.toggle('hidden', !isEmpty)
  emptyState.classList.toggle('flex', isEmpty)
  cardContainer.classList.toggle('hidden', isEmpty)

  if (isEmpty) {
    cardContainer.innerHTML = ''
    return
  }

  // Cards — stagger animation via CSS animation-delay
  cardContainer.innerHTML = filtered.map((d, i) => buildCard(d, i)).join('')
  cardContainer.querySelectorAll('.cmd-card').forEach((el, i) => {
    el.style.animationDelay = `${i * 30}ms`
  })
}

function buildCard(d, index) {
  const tagHTML = d.tag
    ? `<span class="tag tag-${d.tag}"><i class="ti ${TAG_ICONS[d.tag] ?? ''}" aria-hidden="true"></i>${d.tagLabel}</span>`
    : ''

  const tipHTML = d.tips
    ? `<div class="tip-box"><i class="ti ti-bulb" aria-hidden="true"></i><span>${d.tips}</span></div>`
    : ''

  const codesHTML = d.codes
    .map(
      (c, ci) => `
    <div class="code-block" data-code-index="${ci}" data-card-index="${index}">
      <p class="code-label">${escHtml(c.label)}</p>
      <pre class="code-pre">${formatCode(c.code)}</pre>
      <button
        class="copy-btn"
        onclick="handleCopy(this, ${index}, ${ci})"
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
          <h2 class="text-sm font-medium text-slate-100 font-sans mb-1">${d.title}</h2>
          <p class="text-xs text-slate-500 font-sans leading-relaxed">${d.desc}</p>
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

/* ── Card interaction ───────────────────────────────── */

function toggleCard(index) {
  const card = document.getElementById(`card-${index}`)
  if (!card) return
  card.classList.toggle('expanded')
}

/* ── Copy ───────────────────────────────────────────── */

function handleCopy(btn, cardIdx, codeIdx) {
  // Prevent card toggle from firing
  event.stopPropagation()

  // Find original data (account for filtering)
  const filtered = getFiltered()
  const d = filtered[cardIdx]
  if (!d || !d.codes[codeIdx]) return

  const text = d.codes[codeIdx].code
  navigator.clipboard
    .writeText(text)
    .then(() => {
      btn.textContent = '✓ 已複製'
      btn.classList.add('copied')
      setTimeout(() => {
        btn.textContent = '複製'
        btn.classList.remove('copied')
      }, 1800)
      showToast('已複製到剪貼簿')
    })
    .catch(() => {
      // Fallback for older browsers
      fallbackCopy(text)
      showToast('已複製到剪貼簿')
    })
}

function fallbackCopy(text) {
  const el = document.createElement('textarea')
  el.value = text
  el.style.cssText = 'position:fixed;top:-999px;left:-999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

/* ── Toast ──────────────────────────────────────────── */

function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200)
}

/* ── Helpers ────────────────────────────────────────── */

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Highlight comment lines (starting with #) in a different colour.
 * Returns HTML string for use inside <pre>.
 */
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

/* ── Keyboard shortcut: / to focus search ──────────── */

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault()
    searchInput.focus()
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.blur()
    searchQuery = ''
    searchInput.value = ''
    renderCards()
  }
})

/* ── Bootstrap ──────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', init)
