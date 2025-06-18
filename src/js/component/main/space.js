import { createElement } from "../components";
import { sideBar } from "../side-bar/side-bar";
import { main } from "./listdispaly";
import { discussion } from "./discussionChamp";
import { getConversationsToServer, getUsersWithPrivateConversations } from "../../services/getters";
import { getIsConnected } from "../../services/connect";
import { statusTextInput } from "./status";

export function getUserId(){
  return localStorage.getItem('userId') || null;
}

export function setUserId(id) {
  localStorage.setItem('userId', JSON.stringify(id));
}

export let userId =  getUserId();


export const space = createElement(
  "div",
  {
    class: [
      "w-full",
      "h-screen",
      "flex",
      "bg-[#222e35]",
    ],
    vShow: false
,
  },
  [
    sideBar,
    main,
    discussion,
    statusTextInput
  ]
);


setInterval(() => {
  if(navigator.onLine && userId !== null) {
    getConversationsToServer(userId);
    getUsersWithPrivateConversations(userId);
  }
}, 5000);

