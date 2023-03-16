const menuButtonSelector = ".btn-toggle-menu";
const menuPanelSelector = ".main-nav";
const classToToggle = "main-nav-hidden";

const toggleHandler = () => {
  document.querySelector(menuPanelSelector).classList.toggle("main-nav-hidden");
};
document
  .querySelector(menuButtonSelector)
  .addEventListener("click", toggleHandler);
