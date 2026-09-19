---
description: '依 issue 修正待辦清單 App,並準備修正說明與驗證步驟'
agent: 'agent'
---

請依照以下步驟修正這個待辦清單 App,並且只修改 `index.html`、`styles.css`、`app.js` 這三個檔案。

1. 先讀取目前問題的 issue 資訊,確認要修正什麼。
2. 先說明你打算修改哪些檔案與內容,等待我的確認後再開始實作。
3. 在確認後,直接修改 `index.html`、`styles.css`、`app.js`。
4. 修正完成後,請在回覆中提供一段簡短的修正說明,包含「修改內容」條列。
5. 最後請附上第 5 步的驗證步驟,說明如何在瀏覽器中確認修正是否成功。
6. 如果修正涉及使用者互動或資料持久化,請確保 localStorage 邏輯仍然正確。
7. 保持純 HTML / CSS / 原生 JavaScript,不要引入任何框架或套件。
8. 註解請使用繁體中文。
9. 修正說明裡必須包含 `Closes #${input:issueNumber}`。
10. 請在最後的文字中,明確說明要如何在瀏覽器中驗證這次修正。
---
agent: 'agent'
description: '依 GitHub issue 編號修正待辦清單 App,並自動開出 Pull Request'
argument-hint: 'issueNumber=3'
---

# 任務:修好一個 GitHub Issue 並開 PR

你要處理本 repo 的 issue **#${input:issueNumber:要修的 issue 編號}**。

請**嚴格依照下列順序**執行,不要跳步:

## 1. 讀取 issue

使用 GitHub MCP 工具讀取本 repo 的 issue #${input:issueNumber}。
用繁體中文摘要:這是 bug 還是新功能?使用者遇到什麼問題?預期改哪些檔案?

## 2. 提出計畫並等待確認

用條列式列出你打算做的修改,**然後停下來問我是否同意**。在我回覆「同意」之前不要動任何檔案。

## 3. 建立分支

```
git switch -c fix/issue-${input:issueNumber}
```

## 4. 進行修改

遵守 `.github/copilot-instructions.md` 的所有規則。只改必要的檔案。

## 5. 說明驗證方式

告訴我:在瀏覽器打開 index.html 後,要做哪些操作、看到什麼結果,才代表真的修好了。

## 6. 提交並推送

```
git add .
git commit -m "fix: <一句話描述> (#${input:issueNumber})"
git push -u origin fix/issue-${input:issueNumber}
```

## 7. 建立 Pull Request

使用 GitHub MCP 工具,以 `fix/issue-${input:issueNumber}` 為來源、`main` 為目標建立 PR。
內文必須包含 `Closes #${input:issueNumber}`、「修改內容」條列、以及第 5 步的驗證步驟。
最後把 PR 網址貼給我。