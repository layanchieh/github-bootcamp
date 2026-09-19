![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，目標是練習透過 AI 協作開發純前端應用程式，並整合 GitHub Copilot Agent Mode、MCP 與 agentic workflow 的實作方式。

## 線上展示

GitHub Pages：https://<你的帳號>.github.io/<你的repo名稱>/

> 這個網址先作為占位連結，之後可依實際帳號與 repository 名稱更新。

## 功能

- 新增待辦事項
- 刪除單一待辦事項
- 完成與未完成狀態切換
- 編輯已存在的待辦內容
- 依狀態篩選待辦：全部、未完成、已完成
- 清除所有已完成項目
- 深色模式切換
- 使用 localStorage 保存待辦資料與使用者偏好設定
- 重新整理後保留目前篩選狀態

## 技術

這個專案採用純 HTML、CSS 與原生 JavaScript 開發，沒有使用任何前端框架，也沒有額外套件依賴。資料儲存方式使用瀏覽器的 localStorage，讓待辦內容與偏好設定能在重新整理後保留。

- HTML：結構與內容
- CSS：版面設計、主題樣式與響應式調整
- JavaScript：狀態管理、事件處理、篩選邏輯、資料持久化
- 無框架、無套件、可離線運作

## 開發方式

這個專案是在 GitHub Copilot 實戰工作坊中，以 Agent Mode 的方式逐步開發完成。整體流程包含：

- 使用 GitHub Copilot 協助撰寫與調整前端程式碼
- 依需求逐步增加功能，並保持專案結構簡單且可維護
- 使用 MCP（Model Context Protocol）相關工具讀取 issue 與工作流程內容
- 依 GitHub issue 進行 bug 修正與驗證
- 透過 `.github/prompts` 中的 agentic workflow 指示，讓修正流程更有組織性與一致性

這種方式強調以 issue 為中心的開發流程，讓需求、實作與驗證能保持連貫，而不是僅用單一對話方式直接完成功能。

## 我學到什麼

- 如何用 AI 協助快速建立前端原型，並維持可控的開發節奏
- 如何把需求拆成小步驟，逐一修正與驗證，而不是一次做太多變更
- 在純前端專案中，資料持久化與狀態管理需要更小心處理，以避免 UI 行為與使用者預期不一致
- GitHub Copilot 不只是寫程式工具，也是協助理解 issue、規劃修正與驗證結果的工作夥伴
- 在有限架構中，良好的命名、簡潔邏輯與明確驗證步驟，能顯著提升專案維護性

---

這份作品集簡要記錄了這個待辦清單 App 的建置過程與學習重點，作為 GitHub Copilot 實戰工作坊成果的一部分。
