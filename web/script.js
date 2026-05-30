const form = document.querySelector("#consultForm");
const result = document.querySelector("#result");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  markInvalid();

  if (!form.checkValidity() || getCheckedValues("subjects").length === 0) {
    result.hidden = false;
    result.textContent = "請先補齊必填欄位，並至少選擇一項想了解的課程或科目。";
    return;
  }

  const data = new FormData(form);
  const subjects = getCheckedValues("subjects").join("、");
  const summary = [
    "已收到諮詢資料，以下是送出內容：",
    "",
    `學生姓名：${data.get("studentName")}`,
    `聯絡電話：${data.get("phone")}`,
    `填寫身分：${data.get("identity")}`,
    `目前年級：${data.get("grade")}`,
    `想了解：${subjects}`,
    `方便聯絡：${data.get("callTime")}`,
    `學習需求：${data.get("need") || "未填寫"}`,
    "",
    "請留意後續電話聯絡。"
  ].join("\n");

  result.hidden = false;
  result.textContent = summary;
  form.reset();
});
