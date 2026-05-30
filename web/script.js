const GOOGLE_SCRIPT_URL = "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE";

const form = document.querySelector("#consultForm");
const result = document.querySelector("#result");
const submitButton = form.querySelector('button[type="submit"]');

function getCheckedValues(name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function markInvalid() {
  form.querySelectorAll(".invalid").forEach((node) => node.classList.remove("invalid"));

  const requiredFields = Array.from(form.querySelectorAll("[required]"));
  requiredFields.forEach((field) => {
    if (!field.checkValidity()) {
      field.closest(".field, .consent")?.classList.add("invalid");
    }
  });

  if (getCheckedValues("subjects").length === 0) {
    form.querySelector(".choice-group").classList.add("invalid");
  }
}

function buildPayload() {
  const data = new FormData(form);
  return {
    submittedAt: new Date().toISOString(),
    studentName: data.get("studentName") || "",
    phone: data.get("phone") || "",
    identity: data.get("identity") || "",
    grade: data.get("grade") || "",
    subjects: getCheckedValues("subjects").join("、"),
    callTime: data.get("callTime") || "",
    need: data.get("need") || "",
    source: "HongdaMarketing GitHub Pages",
  };
}

async function submitToSheet(payload) {
  if (GOOGLE_SCRIPT_URL.includes("PASTE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
    throw new Error("尚未設定 Google Apps Script Web App URL。");
  }

  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(payload),
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  markInvalid();

  if (!form.checkValidity() || getCheckedValues("subjects").length === 0) {
    result.hidden = false;
    result.textContent = "請先補齊必填欄位，並至少選擇一項想了解的課程或科目。";
    return;
  }

  const payload = buildPayload();
  submitButton.disabled = true;
  submitButton.textContent = "送出中...";
  result.hidden = false;
  result.textContent = "資料送出中，請稍候。";

  try {
    await submitToSheet(payload);
    result.textContent = [
      "已送出諮詢資料，請留意後續電話聯絡。",
      "",
      `學生姓名：${payload.studentName}`,
      `聯絡電話：${payload.phone}`,
      `目前年級：${payload.grade}`,
      `想了解：${payload.subjects}`,
      `方便聯絡：${payload.callTime}`,
    ].join("\n");
    form.reset();
  } catch (error) {
    result.textContent = `送出失敗：${error.message}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "送出諮詢資料";
  }
});
