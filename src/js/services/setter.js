import { newChats, renderUsersList, setupUserSearch } from "../component/main/newChats";
import { main } from "../component/main/listdispaly";
import { clearCurrentInterval, renderDiscussionContacts } from "../component/main/lister";
import { setSelected } from "../component/side-bar/actionsSideBar";
import { discusionVider } from "./discussion";
import { renderSidebar, showChats } from "./sideBar";
import { newTeam } from "../component/main/newTeam";

function cleanMain(){
    main.innerHTML = "";
}

function chatsToNewChat() {
  cleanMain();
  discusionVider();
  renderUsersList(); 
  setupUserSearch(); 
  main.appendChild(newChats);
}


function newChatToChats(){
    setSelected(0);
    clearCurrentInterval();
    renderDiscussionContacts();
    discusionVider();
    renderSidebar();
    showChats();
}

function toNTeam(){
    cleanMain();
    main.appendChild(newTeam);
}

export { newChatToChats, chatsToNewChat, toNTeam};