# Hongda Marketing

宏達補習班課程諮詢表單頁。

GitHub Pages 網址：

https://sam0404044.github.io/HongdaMarketing/

## Preview

![表單預覽](assets/preview.png)

主要檔案：

- `index.html`
- `styles.css`
- `script.js`
- `assets/study-hero.png`

## Google Sheet 串接

1. 開啟目標 Google Sheet。
2. 點選「擴充功能」>「Apps Script」。
3. 將 `apps-script/Code.gs` 的內容貼到 Apps Script 編輯器。
4. 點選「部署」>「新增部署作業」。
5. 類型選「網頁應用程式」。
6. 執行身分選「我」。
7. 存取權選「任何人」。
8. 部署後複製 Web App URL。
9. 將 `script.js` 與 `web/script.js` 裡的 `PASTE_APPS_SCRIPT_WEB_APP_URL_HERE` 換成 Web App URL，再 commit / push。
