import { createElement } from "../components";
import { sideBar } from "../side-bar/side-bar";
import { main } from "./listdispaly";
import { discussion } from "./discussionChamp";
import { getConversationsToServer, getUsersWithPrivateConversations } from "../../services/getters";
import { getIsConnected } from "../../services/connect";

export function getUserId(){
  return localStorage.getItem('userId') || null;
}

export function setUserId(id) {
  localStorage.setItem('userId', JSON.stringify(id));
}

export let userId = window.location.hostname === "localhost" ? 5 : getUserId();


export const space = createElement(
  "div",
  {
    class: [
      "w-full",
      "h-screen",
      "flex",
      "bg-[#222e35]",
    ],
    vShow: window.location.hostname === "localhost" || getIsConnected()
,
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

