import barba from "@barba/core";
import barbaCss from "@barba/css";
// import { gsap } from "gsap";
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
