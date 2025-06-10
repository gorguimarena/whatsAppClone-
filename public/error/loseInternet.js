import { createElement } from "../../src/js/component/components";

export const loseInternet = createElement(
  "div",
  {
    class: [
      "h-screen",
      "bg-gray-100",
      "flex",
      "items-center",
      "justify-center",
    ],
    vShow: false
  },
  "You are lose your internet connexion !"
);

