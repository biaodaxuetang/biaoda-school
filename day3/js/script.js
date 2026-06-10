const courses = [
  {
    title: "说服高手实战营",
    text: "提升沟通效率，化解冲突，建立良好人际关系。",
    image: "images/shuofu-detail.jpg",
    buy: "https://s.bluedothub.cn/VM5bxbV"
  },
  {
    title: "表达高手实战营",
    text: "克服紧张，自信开口，掌握演讲逻辑与感染力，让你的汇报更有价值。",
    image: "images/biaoda-detail.jpg",
    buy: "https://s.bluedothub.cn/Vd4vapV"
  },
  {
    title: "黄执中说服表达系列课",
    text: "结构化汇报，突出重点，让你的表达更有说服力。",
    image: "images/huang-detail.jpg",
    buy: "https://example.com/buy-report"
  }
];

function openCourse(index) {
  const course = courses[index];

  document.getElementById("modalImage").src = course.image;
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalText").textContent = course.text;
  document.getElementById("modalBuy").href = course.buy;

  document.getElementById("courseModal").style.display = "flex";
}

function closeCourse() {
  document.getElementById("courseModal").style.display = "none";
}

document.getElementById("courseModal").addEventListener("click", function(event) {
  if (event.target.id === "courseModal") {
    closeCourse();
  }
});
