const SPREADSHEET_ID = "1SULESv7GMOlczvDRPJhSTkQrJAoqPUWw84lYEAdRUxg";
const SHEET_NAME = "表單回覆";

const HEADERS = [
  "送出時間",
  "學生姓名",
  "聯絡電話",
  "填寫身分",
  "目前年級",
  "想了解的課程或科目",
  "方便電話聯絡時段",
  "目前想解決的學習問題",
  "來源",
];

function doPost(e) {
  const params = e.parameter || {};
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(spreadsheet);

  sheet.appendRow([
    new Date(),
    params.studentName || "",
    params.phone || "",
    params.identity || "",
    params.grade || "",
    params.subjects || "",
    params.callTime || "",
    params.need || "",
    params.source || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput("Hongda form endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function setup() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  getOrCreateSheet_(spreadsheet);
}

function getOrCreateSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}
