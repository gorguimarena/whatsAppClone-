import { createElement } from "../components";
import { sideBar } from "../side-bar/side-bar";
import { main } from "./listdispaly";
import { discussion } from "./discussionChamp";
import { getConversationsToServer, getUsersWithPrivateConversations } from "../../services/getters";


export let userId = 5;

export function setUserId(id) {
  userId = id;
}

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


setInterval(() => {
  if(navigator.onLine && userId) {
    getConversationsToServer(userId);
    getUsersWithPrivateConversations(userId);
  }
}, 5000);

