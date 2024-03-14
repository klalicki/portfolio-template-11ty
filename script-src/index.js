import barba from "@barba/core";
import barbaCss from "@barba/css";

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
//sidebar-nav-link-section nav-link-section-hidden
const menuButtonSelector = ".btn-toggle-menu";
const menuPanelSelector = ".sidebar-nav-link-section";
const classToToggle = "nav-link-section-hidden";

const toggleHandler = () => {
  document.querySelector(menuPanelSelector).classList.toggle(classToToggle);
};
document
  .querySelector(menuButtonSelector)
  .addEventListener("click", toggleHandler);
const hideMenu = () => {
  document.querySelector(menuPanelSelector).classList.add(classToToggle);
};

barba.use(barbaCss);
barba.init({
  transitions: [
    {
      name: "fade",
      leave() {},
      enter() {},
    },
  ],
});

const hideItems = () => {
  const itemList = document.querySelectorAll(
    ".portfolio-intro, .text-page > *, .component-inline-nav, .portfolio > * > *"
  );
  // itemList.push(document.querySelectorAll(".component-inline-nav"));
  itemList.forEach((item) => {
    item.classList.add("transition-animation-base");
    item.classList.add("transition-hide-item");
  });
};
const showItems = () => {
  const totalTransitionTimeMax = 1000;
  const itemDelay = 50;
  const itemList = document.querySelectorAll(".transition-hide-item");

  itemList.forEach((item, index) => {
    const curTransitionDelay = Math.min(
      index * itemDelay,
      totalTransitionTimeMax
    );
    console.log(curTransitionDelay);
    setTimeout(() => {
      item.classList.remove("transition-hide-item");
    }, curTransitionDelay);
  });
};

window.hideItems = hideItems;
window.showItems = showItems;
console.log("registered functions");
barba.hooks.before((data) => {
  hideMenu();
  clearMenuActive();
  setNewMenuItem(data.next.url.path);
});
barba.hooks.after((data) => {});
barba.hooks.beforeEnter(() => {
  hideItems();
  window.scrollTo(0, 0);
});
barba.hooks.afterEnter(() => {
  showItems();
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
