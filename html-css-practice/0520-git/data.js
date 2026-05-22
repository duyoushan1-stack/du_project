/**
 * data.js — Git 指令資料庫
 * 每筆資料結構：{ cat, icon, title, desc, tag, tagLabel, codes: [{label, code}], tips? }
 */

const GIT_DATA = [
  /* ── Config ─────────────────────────────────────────── */
  {
    cat: 'config',
    icon: 'ti-settings',
    title: 'git config 身份設定',
    desc: '設定使用者名稱、Email，是所有操作的第一步',
    tag: 'tip',
    tagLabel: '必做',
    tips: '設定別名 lg 後，只需輸入 git lg 即可看到漂亮的分支圖。',
    codes: [
      {
        label: '全域設定名稱與 Email',
        code: `git config --global user.name "你的名稱"
git config --global user.email "you@example.com"`,
      },
      {
        label: '設定預設分支為 main',
        code: `git config --global init.defaultBranch main`,
      },
      {
        label: '設定美觀的 log 別名（推薦）',
        code: `git config --global alias.lg "log --oneline --graph --decorate --all"`,
      },
      {
        label: '設定 pull 預設用 rebase',
        code: `git config --global pull.rebase true`,
      },
      {
        label: '查看所有設定',
        code: `git config --list`,
      },
    ],
  },
  {
    cat: 'config',
    icon: 'ti-terminal-2',
    title: 'git config 編輯器 & 工具',
    desc: '設定預設編輯器、換行符號等環境參數',
    tag: '',
    tagLabel: '',
    codes: [
      {
        label: '設定 VSCode 為預設編輯器',
        code: `git config --global core.editor "code --wait"`,
      },
      {
        label: '設定大小寫不敏感（macOS/Windows）',
        code: `git config --global core.ignorecase true`,
      },
      {
        label: '自動轉換換行符號',
        code: `git config --global core.autocrlf input  # Mac/Linux
git config --global core.autocrlf true   # Windows`,
      },
      {
        label: '設定 push 預設只推當前分支',
        code: `git config --global push.default current`,
      },
    ],
  },

  /* ── Branch ─────────────────────────────────────────── */
  {
    cat: 'branch',
    icon: 'ti-git-branch',
    title: '分支建立 & 切換 & 強制移動',
    desc: '快速建立、切換、重命名分支，或強制調整分支指針位置',
    tag: 'tip',
    tagLabel: '常用',
    tips: '使用 feature/、fix/、chore/ 前綴讓分支一目了然。可以用 -f 強制分支對齊特定目標。',
    codes: [
      {
        label: '建立並切換分支（推薦 Git 2.23+）',
        code: `git switch -c feature/my-feature`,
      },
      {
        label: '舊語法：從既有分支建立並切換過去',
        code: `git checkout -b feature/my-feature`,
      },
      {
        label: '切換到已存在分支',
        code: `git switch main`,
      },
      {
        label: '重新命名當前分支',
        code: `git branch -m old-name new-name`,
      },
      {
        label:
          '將既有 branch 移動 to 別的 branch 的位置（強制覆蓋本地分支指針）',
        code: `git branch -f <想移動的分支名稱> <目的地分支名稱>\n# 範例：將本地的 river_branch 強制對齊到 master 的最新位置\ngit branch -f river_branch master`,
      },
      {
        label: '列出所有分支（含遠端）',
        code: `git branch -a`,
      },
    ],
  },
  {
    cat: 'branch',
    icon: 'ti-git-merge',
    title: '分支合併策略',
    desc: 'merge、rebase 與 squash 的選擇',
    tag: 'pro',
    tagLabel: '進階',
    tips: 'rebase 讓歷史保持線性；--no-ff 在 main 分支保留合併記錄，兩者各有適用場景。',
    codes: [
      {
        label: 'Fast-forward merge（乾淨線性）',
        code: `git merge feature/my-feature --ff-only`,
      },
      {
        label: '產生 merge commit（保留歷史脈絡）',
        code: `git merge feature/my-feature --no-ff -m "feat: merge my-feature"`,
      },
      {
        label: '互動式 rebase 整理最近 3 個 commit',
        code: `git rebase -i HEAD~3`,
      },
      {
        label: 'squash merge（把分支壓成一個 commit）',
        code: `git merge --squash feature/my-feature
git commit -m "feat: add my feature"`,
      },
    ],
  },
  {
    cat: 'branch',
    icon: 'ti-trash',
    title: '刪除分支',
    desc: '清理已合併的本地與遠端分支',
    tag: 'warn',
    tagLabel: '注意',
    codes: [
      {
        label: '刪除本地已合併分支',
        code: `git branch -d feature/my-feature`,
      },
      {
        label: '強制刪除（未合併亦可）',
        code: `git branch -D feature/my-feature`,
      },
      {
        label: '刪除遠端分支',
        code: `git push origin --delete feature/my-feature`,
      },
      {
        label: '批次清除已合併的本地分支',
        code: `git branch --merged main | grep -v "^\\* main$" | xargs git branch -d`,
      },
    ],
  },

  /* ── Commit ─────────────────────────────────────────── */
  {
    cat: 'commit',
    icon: 'ti-check',
    title: 'git commit 規範寫法',
    desc: '使用 Conventional Commits 讓歷史清晰易讀',
    tag: 'pro',
    tagLabel: '推薦',
    tips: '前綴類型：feat / fix / docs / style / refactor / test / chore / ci',
    codes: [
      {
        label: '基本 commit',
        code: `git commit -m "feat: add login page"`,
      },
      {
        label: '帶有範圍（scope）的 commit',
        code: `git commit -m "fix(auth): handle empty password case"`,
      },
      {
        label: '多行 commit（標題 + 說明）',
        code: `git commit -m "feat: add dark mode" \\
  -m "Supports system preference and manual toggle.\\nCloses #42"`,
      },
      {
        label: '修改最後一個 commit 訊息',
        code: `git commit --amend -m "feat: correct commit message"`,
      },
      {
        label: '加入遺漏的檔案，不改訊息',
        code: `git add forgotten-file.js
git commit --amend --no-edit`,
      },
    ],
  },
  {
    cat: 'commit',
    icon: 'ti-package',
    title: 'Staging 技巧',
    desc: '精確控制哪些變更進入 commit',
    tag: 'tip',
    tagLabel: '實用',
    codes: [
      {
        label: '暫存全部變更',
        code: `git add .`,
      },
      {
        label: '互動式選擇 hunk（部分暫存）',
        code: `git add -p`,
      },
      {
        label: '查看已暫存 vs 未暫存的差異',
        code: `git diff --staged   # 已暫存（與上次 commit 比較）
git diff            # 未暫存`,
      },
      {
        label: '取消暫存某個檔案',
        code: `git restore --staged <file>`,
      },
    ],
  },

  /* ── Restore ─────────────────────────────────────────── */
  {
    cat: 'restore',
    icon: 'ti-arrow-back-up',
    title: 'git restore 還原檔案',
    desc: '取消工作目錄或暫存區的變更（Git 2.23+）',
    tag: 'tip',
    tagLabel: '常用',
    tips: 'git restore 是取代舊版 git checkout 還原檔案的推薦寫法。',
    codes: [
      {
        label: '捨棄工作目錄的修改',
        code: `git restore <file>
git restore .       # 全部`,
      },
      {
        label: '將檔案從暫存區移回工作目錄',
        code: `git restore --staged <file>`,
      },
      {
        label: '從指定 commit 還原某檔案',
        code: `git restore --source=HEAD~2 src/main.js`,
      },
    ],
  },
  {
    cat: 'restore',
    icon: 'ti-history',
    title: 'git reset & revert',
    desc: '移動 HEAD 或安全還原已推送的 commit',
    tag: 'warn',
    tagLabel: '注意',
    tips: '已推送到遠端的 commit 請優先用 revert，不要用 reset。',
    codes: [
      {
        label: 'soft reset（保留變更至暫存區）',
        code: `git reset --soft HEAD~1`,
      },
      {
        label: 'mixed reset（還原最近一次 commit，變更保留至工作目錄）',
        code: `git reset HEAD~1\n# 亦可使用相對節點：git reset HEAD^`,
      },
      {
        label: 'hard reset（完全捨棄，不可逆）',
        code: `git reset --hard HEAD~1`,
      },
      {
        label: '安全還原，產生新 commit（推薦）',
        code: `git revert HEAD`,
      },
      {
        label: '還原特定 commit，不自動建立 commit',
        code: `git revert <commit-hash> --no-commit`,
      },
    ],
  },

  /* ── Remote ─────────────────────────────────────────── */
  {
    cat: 'remote',
    icon: 'ti-cloud',
    title: 'Remote 管理 & 共同開發',
    desc: '新增、修改、查看遠端倉庫連結與接手分支',
    tag: '',
    tagLabel: '',
    codes: [
      {
        label: '查看遠端（含名稱和 URL）',
        code: `git remote -v`,
      },
      {
        label: '新增遠端倉庫',
        code: `git remote add origin https://github.com/user/repo.git`,
      },
      {
        label: '修改遠端 URL（切換 HTTPS ↔ SSH）',
        code: `git remote set-url origin git@github.com:user/repo.git`,
      },
      {
        label: '推送並設定上游（第一次推送）',
        code: `git push -u origin main`,
      },
      {
        label: '接手/一同開發遠端既有分支',
        code: `git pull\ngit checkout <遠端分支名稱>`,
      },
      {
        label: '抓取遠端所有分支並清除已刪除的',
        code: `git fetch --all --prune`,
      },
    ],
  },
  {
    cat: 'remote',
    icon: 'ti-arrows-exchange',
    title: 'Push / Pull 多人協作衝突技巧',
    desc: '安全同步遠端變更，優雅處理團隊協作的 Commit 衝突',
    tag: 'tip',
    tagLabel: '核心常用',
    tips: '多人協作同 branch 時，絕不建議輕易使用 push -f 覆蓋，否則會覆蓋同事的程式碼。',
    codes: [
      {
        label: '推送當前分支',
        code: `git push`,
      },
      {
        label: '多人協作同 branch，Push 發現遠端已有新 Commit 時（推薦）',
        code: `git pull --rebase\n# 備註：若有 conflict (檔案衝突)，在本地解完衝突確認保留內容後，即可 git push`,
      },
      {
        label: '拉取並 rebase（保持線性歷史）',
        code: `git pull --rebase origin main`,
      },
      {
        label:
          '強制推送（整理後的 rebase，安全版，若遠端有他人新 commit 會拒推）',
        code: `git push --force-with-lease`,
      },
      {
        label: '危險操作：暴力強制覆蓋遠端分支',
        code: `git push -f\n# 注意：多人協作同 branch 時請勿使用，會覆蓋同事的代碼！`,
      },
      {
        label: '只抓取不合併',
        code: `git fetch origin`,
      },
    ],
  },

  /* ── Log ─────────────────────────────────────────── */
  {
    cat: 'log',
    icon: 'ti-sitemap',
    title: '美化 git log & 版本分析',
    desc: '讓分支歷史清晰直觀，一眼看懂走向與 PR 內容',
    tag: 'pro',
    tagLabel: '必會',
    tips: '設定 alias lg 後，git lg 就能一眼看清所有分支走向。',
    codes: [
      {
        label: '圖形化顯示所有分支（一行簡短模式）',
        code: `git log --oneline --graph --decorate --all`,
      },
      {
        label: '完整格式加作者與日期（彩色）',
        code: `git log --graph --pretty=format:'%C(yellow)%h%Creset %C(blue)%an%Creset %s %C(green)(%ar)%Creset' --all`,
      },
      {
        label: '查看兩個標籤（Tag）或 Commit 之間增加了哪些 PR/紀錄',
        code: `git log <old_tag_name>..<new_tag_name> --pretty='%s' --reverse\n# 範例：git log 20200909..20200913 --pretty='%s' --reverse`,
      },
      {
        label: '設定 alias lg（一次設定，永久使用）',
        code: `git config --global alias.lg "log --oneline --graph --decorate --all"`,
      },
      {
        label: '查看特定作者的 commit',
        code: `git log --author="名稱" --oneline`,
      },
      {
        label: '查看某個檔案的完整歷史',
        code: `git log --follow -p src/main.js`,
      },
    ],
  },
  {
    cat: 'log',
    icon: 'ti-search',
    title: 'git diff & blame 差異比對',
    desc: '找出誰、何時、改了什麼，精確比對代碼歷史',
    tag: '',
    tagLabel: '',
    codes: [
      {
        label: '查看兩個分支的差異',
        code: `git diff main..feature/my-feature`,
      },
      {
        label: '查看兩個 commit 之間所有檔案的差異',
        code: `git diff <commit1>..<commit2>\n# 範例：git diff 57cb9613c..77b628f47`,
      },
      {
        label: '查看某個 commit 的改動',
        code: `git show <commit-hash>`,
      },
      {
        label: '找出哪一行由誰改動',
        code: `git blame src/main.js`,
      },
      {
        label: '搜尋某字串出現在哪個 commit',
        code: `git log -S "function login" --oneline`,
      },
    ],
  },

  /* ── Advanced ─────────────────────────────────────────── */
  {
    cat: 'advanced',
    icon: 'ti-git-cherry-pick',
    title: 'git cherry-pick 撿特定提交',
    desc: '將特定 commit 複製到當前分支，不帶整個歷史',
    tag: 'pro',
    tagLabel: '進階',
    tips: 'cherry-pick 適合從 hotfix 分支把修復帶回 develop，避免整個分支合併。可以用 git cherry-pick -h 查詢更多參數。',
    codes: [
      {
        label: 'cherry-pick 單一 commit',
        code: `git cherry-pick <commit-hash>`,
      },
      {
        label: 'cherry-pick 一個範圍（不含起點，含終點）',
        code: `git cherry-pick A..B`,
      },
      {
        label: 'cherry-pick 但不自動 commit',
        code: `git cherry-pick <commit-hash> --no-commit`,
      },
      {
        label: '解完衝突後繼續',
        code: `# 解完衝突後：\ngit cherry-pick --continue`,
      },
      {
        label: '放棄 cherry-pick',
        code: `git cherry-pick --abort`,
      },
    ],
  },
  {
    cat: 'advanced',
    icon: 'ti-package-import',
    title: 'git stash 工作狀態暫存',
    desc: '臨時保存工作進度，隨時切換任務',
    tag: 'tip',
    tagLabel: '常用',
    tips: '當事情做到一半突然需要切換分支處理 Bug，stash 是最佳首選。',
    codes: [
      {
        label: '暫存目前所有變更（含訊息與未追蹤檔案，推薦寫法）',
        code: `git stash save -u "儲存的說明訊息"\n# 亦可使用新版：git stash push -m "wip: 說明"`,
      },
      {
        label: '查看 stash 列表',
        code: `git stash list`,
      },
      {
        label: '套用指定 stash 並保留紀錄',
        code: `git stash apply stash@{0}`,
      },
      {
        label: '套用指定 stash 並從列表中移除',
        code: `git stash pop stash@{0}`,
      },
      {
        label: '刪除特定 stash 紀錄',
        code: `git stash drop stash@{0}`,
      },
    ],
  },
  {
    cat: 'advanced',
    icon: 'ti-tag',
    title: 'git tag 版本標記',
    desc: '語意化版本標籤管理（SemVer）與遠端同步',
    tag: '',
    tagLabel: '',
    codes: [
      {
        label: '建立附註標籤（推薦）',
        code: `git tag -a v1.0.0 -m "Release v1.0.0"`,
      },
      {
        label: '建立輕量標籤（直接在當前節點標記日期或版本）',
        code: `git tag 20260520`,
      },
      {
        label: '推送所有本地標籤到遠端庫',
        code: `git push origin --tags`,
      },
      {
        label: '刪除本地與遠端標籤',
        code: `git tag -d v1.0.0\ngit push origin --delete v1.0.0`,
      },
    ],
  },
  {
    cat: 'advanced',
    icon: 'ti-tool',
    title: 'git reflog 安全救命藥',
    desc: '找回被刪除或重置的 commit，操作的終極後悔藥',
    tag: 'warn',
    tagLabel: '救命',
    tips: 'reflog 是本地記錄，預設保留 90 天。不論什麼操作（即使是毀滅性的 hard reset）都有機會還原。',
    codes: [
      {
        label: '查看所有歷史操作記錄',
        code: `git reflog`,
      },
      {
        label: '還原到某個操作之前的狀態',
        code: `git reset --hard HEAD@{3}`,
      },
      {
        label: '找回刪掉的分支',
        code: `# 從 reflog 找到 commit hash 後：\ngit checkout -b recovered-branch <hash>`,
      },
    ],
  },
]
