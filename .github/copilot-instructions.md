# GitHub Copilot 協作規則

## 技術限制
- 這是純前端專案,只能使用 HTML、CSS 與原生 JavaScript。
- 禁止引入任何框架或套件,不要建立 package.json,也不要執行 npm install。
- 不要引用任何外部 CDN,確保專案可以離線運作。
- 檔案結構固定為專案根目錄的 index.html、styles.css、app.js。

## 程式風格
- 註解一律使用繁體中文。
- 變數與函式命名使用英文 camelCase。
- CSS 顏色一律透過 :root 定義的 CSS 變數使用,不要在各處寫死色碼。
- 使用 const / let,不要使用 var。
- 產生 DOM 內容時,優先使用 textContent 或 createElement,不要使用 innerHTML 組字串。

## 協作方式
- 動手修改之前,先條列說明打算改哪些檔案、要做什麼變動,等待確認後再開始實作。
- 一次只處理一件事,不要順手做未被要求的重構或額外功能。
- 修改完成後,說明如何在瀏覽器中驗證這些變更。
- 如果需求不明確,先確認再作業,不要擅自推測額外設計。
