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
4. 按儲存後，先選擇 `setup` 函式並按「執行」，依畫面完成授權。
5. 點選「部署」>「新增部署作業」。
6. 類型選「網頁應用程式」。
7. 執行身分選「我」。
8. 存取權選「任何人」。
9. 部署後複製 Web App URL。
10. 將 Web App URL 填入 `script.js` 的 `GOOGLE_SCRIPT_URL`。

如果是修改已部署過的 Apps Script，請到「管理部署作業」編輯該部署，版本選「新增版本」後重新部署；否則網頁仍會連到舊版程式碼。
