const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      entries[0].target.style.top = "0px";
      entries[0].target.style.opacity = "1";

      observer.unobserve(entries[0].target);
    }
  },
  {
    rootMargin: "10px",
  }
);

observer.observe(document.querySelector("footer"));

const close = document.querySelector(".drawer .close");
const drawer = document.querySelector(".drawer");
const open = document.querySelector("nav  .open");

close.addEventListener("click", () => {
  drawer.style.transform = "translateX(100%)";
});

open.addEventListener("click", () => {
  drawer.style.transform = "translateX(0%)";
});

// 导航栏移动
window.addEventListener("scroll", () => {
  if (window.scrollY != 0) {
    document.querySelector("nav").style.setProperty("--t", "0%");
  } else {
    document.querySelector("nav").style.setProperty("--t", "-100%");
  }
});

// 移动
function tabMove(
  doctorsStartX,
  isDragging,
  doctorsTranslateX,
  doctorsHide,
  global,
  globalItem
) {
  doctorsHide.addEventListener("mousedown", (e) => {
    doctorsStartX = e.clientX;
    isDragging = true;

    let style = window.getComputedStyle(global);
    const matrix = new DOMMatrix(style.transform);
    doctorsTranslateX = matrix.m41;

    document.addEventListener("mousemove", doctorsMove);
    document.addEventListener("mouseup", doctorsStop);
  });

  function doctorsMove(e) {
    if (!isDragging) return;
    // console.log(doctorsStartX - e.clientX);

    doctorsTranslateX;

    let deltaX = e.clientX - doctorsStartX;
    let newX = doctorsTranslateX + deltaX;

    // console.log(newX);

    if (newX > 10) {
      return;
    }

    global.style.transform = `translateX(${newX}px)`;
  }

  function doctorsStop(e) {
    isDragging = false;
    document.removeEventListener("mousemove", doctorsMove);
    document.removeEventListener("mouseup", doctorsStop);
  }
}

function elementMove(x, y, dom) {
  const move = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.style.transform = `translate(${x}%, ${y}%)`;
        entries[0].target.style.opacity = "1";
        move.unobserve(entries[0].target);
      }
    },
    {
      rootMargin: "50px",
      threshold: 0.5,
    }
  );

  move.observe(dom);
}

document.querySelectorAll(".global-item").forEach((item) => {
  elementMove(0, 0, item);
});

document.querySelectorAll(".news .news-item").forEach((item) => {
  elementMove(0, 0, item);
});

document.querySelectorAll(".title").forEach((item) => {
  elementMove(0, 0, item);
});

document.querySelectorAll(".subtitle").forEach((item) => {
  elementMove(0, 0, item);
});

document.querySelectorAll("header p").forEach((item) => {
  elementMove(0, 0, item);
});
