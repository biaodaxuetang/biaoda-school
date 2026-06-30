const courses = [
  {
    title: "说服高手实战营",
    text: "提升沟通效率，化解冲突，建立良好人际关系。",
    image: "images/shuofu-detail.webp",
    buy: "https://s.bluedothub.cn/VM5bxbV"
  },
  {
    title: "表达高手实战营",
    text: "克服紧张，自信开口，掌握演讲逻辑与感染力，让你的汇报更有价值。",
    image: "images/biaoda-detail.webp",
    buy: "https://s.bluedothub.cn/Vd4vapV"
  },
  {
    title: "黄执中说服表达系列课",
    text: "结构化汇报，突出重点，让你的表达更有说服力。",
    image: "images/huang-detail.webp",
    buy: "https://example.com/buy-report"
  }
];

/* =========================
   统一配置
========================= */
const REMINDER_API_URL = "https://你的云函数地址";
const DEFAULT_SALES_ID = "wang";

/* =========================
   初始化 sid
========================= */
(function () {
  const sid = new URLSearchParams(location.search).get("sid");
  if (sid) localStorage.setItem("sales_id", sid);
  if (!localStorage.getItem("sales_id")) {
    localStorage.setItem("sales_id", DEFAULT_SALES_ID);
  }
})();

/* =========================
   只发“行为数据”（关键修复）
========================= */
function sendReminder(action) {

  const payload = {
    sid: localStorage.getItem("sales_id"),
    action: action,
    page: location.href,
    title: document.title
  };

  fetch(REMINDER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

/* =========================
   打开课程
========================= */
function openCourse(index) {

  const course = courses[index];

  document.getElementById("modalImage").src = course.image;
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalText").textContent = course.text;
  document.getElementById("modalBuy").href = course.buy;

  document.getElementById("courseModal").style.display = "flex";

  sendReminder("查看课程：" + course.title);
}

function closeCourse() {
  document.getElementById("courseModal").style.display = "none";
}
