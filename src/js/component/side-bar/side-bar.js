import { createElement } from "../components";
import { chats, status, channels, communities, settings, avatar } from "./actionsSideBar";


export const sideBarTop = createElement("div", {
  class: [
    "w-full",
    "flex",
    "justify-center",
    "items-center",
    "py-2",
    "flex-col",
  ]
},
[
  chats,
  status,
  channels,
  communities
]

);

export const sideBarBottom = createElement(
  "div",
  {
    class: [
      "w-full",
      "flex",
      "justify-center",
      "items-center",
      "py-2",
      "flex-col",
    ],
  },
  [
    settings,
    avatar
  ]
);

export const sideBar = createElement(
  "div",
  {
    class: [
      "bg-[#222e35]",
      "w-24",
      "flex",
      "flex-col",
      "justify-between",
      "items-center",
      "p-2",
      "border-r-2",
      "border-gray-700",
    ],
  },
  [sideBarTop, sideBarBottom]
);
