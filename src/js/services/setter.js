import { newChats } from "../component/main/newChats";
import { chats } from "../component/main/chats";
import { main } from "../component/main/listdispaly";
import { clearCurrentInterval, renderDiscussionContacts } from "../component/main/lister";
import { setSelected } from "../component/side-bar/actionsSideBar";
import { discusionVider } from "./discussion";
import { renderSidebar, showChats } from "./sideBar";


function chatsToNewChat(){
    main.innerHTML = "";
    discusionVider();
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

export { newChatToChats, chatsToNewChat};