import barba from "@barba/core";
import barbaCss from "@barba/css";
// import { gsap } from "gsap";

const clearMenuActive = () => {
  document.querySelectorAll(".active").forEach((item) => {
    item.classList.remove("active");
  });
};
const setNewMenuItem = (targetItem) => {
  document.querySelectorAll(".sidebar-nav-link-section a").forEach((item) => {
    if (item.getAttribute("href") === targetItem) {
      item.classList.add("active");
    }
  });
  console.log(item);
};
barba.use(barbaCss);
barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains("barba-prevent"),
  transitions: [
    {
      name: "fade",
      leave() {},
      enter() {},
    },
  ],
});
barba.hooks.before((data) => {
  clearMenuActive();
  setNewMenuItem(data.next.url.path);
});
barba.hooks.after((data) => {});
barba.hooks.beforeEnter(() => {
  window.scrollTo(0, 0);
});

document.querySelector("#btn-show-work").addEventListener("click", (e) => {
  e.preventDefault();
  const newPath = document
    .querySelector("#btn-show-work")
    .getAttribute("href")
    .slice(1);
  history.replaceState(null, "", newPath);
  gsap.to(".splash-section", {
    opacity: 0,
    translateY: -50,
    onComplete: () => {
      document.querySelector(".splash-section").remove();
    },
  });
});
