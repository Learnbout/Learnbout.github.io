// 主页轮播图

const imgList = document.querySelectorAll("header section div");

const background = document.querySelector("header .background");

const header = document.querySelector("header");

background.style.transform = `translateX(-${header.offsetWidth}px)`;

let imgCount = [0];
let imgBoolean = true;

imgList.forEach((item, index) => {
  item.addEventListener("click", function () {
    imgList.forEach((item) => item.classList.remove("active"));
    imgList[index].classList.add("active");

    if (imgCount[0] >= imgList.length / 2 && index == 0) {
      seamlessSwitchingOfCarouselImages(
        imgList.length + 1,
        1,
        background,
        header.offsetWidth
      );
    } else if (
      imgCount[0] < imgList.length / 2 &&
      index == imgList.length - 1
    ) {
      seamlessSwitchingOfCarouselImages(
        0,
        imgList.length,
        background,
        header.offsetWidth
      );
    } else {
      background.style.transform = `translateX(-${
        header.offsetWidth * (index + 1)
      }px)`;
    }
    imgCount[0] = index;
  });
});

function seamlessSwitchingOfCarouselImages(start, end, element, width) {
  element.style.transform = `translateX(-${width * start}px)`;

  setTimeout(() => {
    element.style.transition = "none";
    element.style.transform = `translateX(-${width * end}px)`;
    setTimeout(() => {
      element.style.transition = "all .3s ease-out";
    }, 10);
  }, 300);
}

// 悬浮停止轮播图自动移动
header.addEventListener("mouseover", () => (imgBoolean = false));
// 移出开启轮播图自动移动
header.addEventListener("mouseout", () => (imgBoolean = true));

// 主页特殊部门轮播图
const DepartmentsBoxLeft = document.querySelectorAll(
  ".departments .bottom .left .box .box-item .icon1"
);

const DepartmentsBoxRight = document.querySelectorAll(
  ".departments .bottom .left .box .box-item .icon2"
);

const DepartmentsBox = document.querySelector(
  ".departments .bottom .left .box"
);

const DepartmentsBoxItem = document.querySelectorAll(
  ".departments .bottom .left .box .box-item"
);

let departmestsCount = [0];

let departmentsBoolean = true;

// 初始化轮播图
DepartmentsBox.style.transform = `translateX(-${
  DepartmentsBoxItem[0].offsetWidth * (departmestsCount + 1)
}px)`;

// 左移按钮
DepartmentsBoxRight.forEach((item) => {
  item.addEventListener("click", function () {
    departmestsCount[0]++;
    carousel(
      DepartmentsBox,
      departmestsCount,
      DepartmentsBoxItem[0].offsetWidth,
      6
    );
  });
});

// 右移按钮
DepartmentsBoxLeft.forEach((item) => {
  item.addEventListener("click", function () {
    departmestsCount[0]--;
    carousel(
      DepartmentsBox,
      departmestsCount,
      DepartmentsBoxItem[0].offsetWidth,
      6
    );
  });
});

// 悬浮停止轮播图自动移动
DepartmentsBox.addEventListener(
  "mouseover",
  () => (departmentsBoolean = false)
);
// 移出开启轮播图自动移动
DepartmentsBox.addEventListener("mouseout", () => (departmentsBoolean = true));

setInterval(() => {
  // 首页轮播自动切换
  if (imgBoolean) {
    imgCount[0]++;

    carousel(background, imgCount, header.offsetWidth, imgList.length);

    imgList.forEach((item) => item.classList.remove("active"));
    imgList[imgCount[0]].classList.add("active");
  }
  if (departmentsBoolean) {
    departmestsCount[0]++;
    carousel(
      DepartmentsBox,
      departmestsCount,
      DepartmentsBoxItem[0].offsetWidth,
      6
    );
  }
}, 2000);

// 通用轮播图移动函数
function carousel(element, count, width, allCount) {
  if (count[0] == allCount) {
    seamlessSwitchingOfCarouselImages(allCount + 1, 1, element, width);
    count[0] = 0;
  } else if (count[0] < 0) {
    seamlessSwitchingOfCarouselImages(0, allCount, element, width);
    count[0] = allCount - 1;
  } else {
    element.style.transform = `translateX(-${width * (count[0] + 1)}px)`;
  }
}

//  特色医生滑动

const doctorsHide = document.querySelector(".doctors .hide");
const global = document.querySelector(".global-box");
const globalItem = document.querySelectorAll(".global-item")[0];

let doctorsStartX = 0;
let isDragging = true;
let doctorsTranslateX = 0;

tabMove(
  doctorsStartX,
  isDragging,
  doctorsTranslateX,
  doctorsHide,
  global,
  globalItem
);

elementMove(0, 0, document.querySelector(".departments .top"));
elementMove(0, 0, document.querySelector(".departments .bottom .left"));
elementMove(0, 0, document.querySelector(".departments .bottom .right"));

document.querySelectorAll(".badge").forEach((item) => {
  elementMove(0, 0, item);
});

elementMove(0, 0, document.querySelector(".doctors .content .top .text .left"));
elementMove(
  0,
  0,
  document.querySelector(".doctors .content .top .text .right")
);

elementMove(0, 0, document.querySelector(".doctors"));

document.querySelectorAll(".title").forEach((item) => {
  elementMove(0, 0, item);
});

document.querySelectorAll(".subtitle").forEach((item) => {
  elementMove(0, 0, item);
});

elementMove(0, 0, document.querySelector(".news .content"));
elementMove(0, 0, document.querySelector("header .text"));
elementMove(0, 0, document.querySelector("header section"));
