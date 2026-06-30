/*******************************
 * 1️⃣ 课程数据（保持不变）
 *******************************/
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

/*******************************
 * 2️⃣ 企业微信提醒配置（你必须填）
 *******************************/
const REMINDER_API_URL = "https://【你的云函数HTTP地址】";
const DEFAULT_SALES_ID = "wang";

/*******************************
 * 3️⃣ 初始化销售归属（修复“未知老师”）
 *******************************/
(function initSales() {
  const urlParams = new URLSearchParams(window.location.search);
  const sid = urlParams.get("sid");

  if (sid) {
    localStorage.setItem("sales_id", sid);
  }

  if (!localStorage.getItem("sales_id")) {
    localStorage.setItem("sales_id", DEFAULT_SALES_ID);
  }
})();

/*******************************
 * 4️⃣ 获取中国时间（核心修复）
 *******************************/
function getChinaTime() {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date());
}

/*******************************
 * 5️⃣ 核心上报函数
 *******************************/
function sendReminder(action) {

  if (!REMINDER_API_URL || REMINDER_API_URL.includes("【你的云函数")) {
    console.warn("❌ 请先配置 REMINDER_API_URL");
    return;
  }

  const sid = localStorage.getItem("sales_id") || DEFAULT_SALES_ID;

  const payload = {
    sid: sid,
    action: action,
    page: window.location.href,
    title: document.title,
    time: getChinaTime()
  };

  console.log("📡 上报数据：", payload);

  fetch(REMINDER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => {
    console.log("✅ 上报成功");
  })
  .catch(err => {
    console.error("❌ 上报失败", err);
  });
}

/*******************************
 * 6️⃣ 打开课程（已接入埋点）
 *******************************/
function openCourse(index) {

  const course = courses[index];

  document.getElementById("modalImage").src = course.image;
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalText").textContent = course.text;
  document.getElementById("modalBuy").href = course.buy;

  document.getElementById("courseModal").style.display = "flex";

  // 👉 埋点
  sendReminder("查看课程：" + course.title);
}

/*******************************
 * 7️⃣ 关闭弹窗
 *******************************/
function closeCourse() {
  document.getElementById("courseModal").style.display = "none";
}

/*******************************
 * 8️⃣ 点击蒙层关闭
 *******************************/
document.getElementById("courseModal").addEventListener("click", function(event) {
  if (event.target.id === "courseModal") {
    closeCourse();
  }
});

/*******************************
 * 9️⃣ （可选）如果你有购买按钮埋点
 *******************************/
document.addEventListener("DOMContentLoaded", function () {

  const buyBtn = document.getElementById("modalBuy");

  if (buyBtn) {
    buyBtn.addEventListener("click", function () {
      sendReminder("点击购买");
    });
  }
});
