import barba from "@barba/core";
import { gsap } from "gsap";

barba.init({
  transitions: [
    {
      name: "opacity-transition",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          x: 10,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          x: 10,
        });
      },
    },
  ],
});
