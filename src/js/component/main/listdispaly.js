import { createElement } from "../components";
import { profile } from "./profile";
import { setting } from "./setting";
import { chats } from "./chats";
import { status } from "./status";
import { channels } from "./channels";





export const main = createElement(
  "div",
  {
    class: ["h-screen", "flex-[2_6_7%]", "bg-[#0c1317]"],
    onsubmit: (e) => {
      e.preventDefault();
    },
  },
  chats
);
