import { createElement } from "../components";
import { sideBar } from "../side-bar/side-bar";
import { main } from "./listdispaly";
import { discussion } from "./discussionChamp";

export const space = createElement(
  "div",
  {
    class: [
      "w-full",
      "h-screen",
      "flex",
      "bg-[#222e35]",
    ],
    vShow: true,
  },
  [
    sideBar,
    main,
    discussion,
  ]
);
