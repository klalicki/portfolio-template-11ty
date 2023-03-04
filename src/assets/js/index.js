import barba from "@barba/core";
import { gsap } from "gsap";

barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains("barba-prevent"),
  transitions: [
    {
      name: "opacity-transition",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          y: -10,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          y: 10,
        });
      },
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
  gsap.to(".splash-section", { opacity: 0, translateY: -50 });
});
